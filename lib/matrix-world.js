import App from '../program/manifest';
import {
	defineWebGLWorld,
	initiateFPS,
	RegenerateCubeMapShader,
	loadShaders,
	initShaders,
	RegenerateShader,
	net
} from './engine';
import {animate} from './matrix-render';
import drawsOperation from './matrix-draws';
import {MatrixLightComponent, MatrixCameraController, MatrixButton} from './matrix-tags';
import {QueryString, _glBlend, _DrawElements, _glTexParameteri, radToDeg} from './utility';
import {Position, RotationVector, COLOR, GeoOfColor, SquareVertex, sphereVertex, PiramideVertex, TriangleVertex, customVertex, CubeVertex} from './matrix-geometry';
import MatrixPhysics from './physics';
import {
	MatrixShadowSpecular,
	MatrixShadowSpot,
	MatrixEffectLens,
	MatrixShadowSpotShadowTest
} from './matrix-shadows';
import {loadShaders300} from './matrix-init-shaders3';
import {loadShaders11} from './matrix-init-shaders1';
import {play} from './loader-obj';
import {cubeMapTextures, makeFBO} from './matrix-textures';
import {simplyRender} from './optimizer/override-matrix-render';

export var CS1 = "font-family: stormfaze;color: #001100; font-size:58px;text-shadow: 2px 2px 4px #fff554, 4px 4px 4px gray, 2px 2px 4px lime, 6px 2px 0px lime;background: gray;";
export var CS2 = "font-family: stormfaze;color: #fd1233; font-size:20px;text-shadow: 2px 2px 2px #5321f5, 4px 4px 4px #d6fa16, 3px 0px 3px #c160a6, 6px 6px 4px #9a0de3;background: black;";
export var CS3 = "font-family: stormfaze;color: #f1f033; font-size:14px;text-shadow: 2px 2px 4px #f335f4, 4px 4px 4px #d64444, 2px 2px 4px #c160a6, 6px 2px 0px #123de3;background: black;";
export var CS4 = "font-family: verdana;color: #lime; font-size:16px;text-shadow: 2px 2px 4px orangered;background: black;";

window.mat4 = glMatrix.mat4
window.mat2 = glMatrix.mat2
window.mat2d = glMatrix.mat2d
window.mat3 = glMatrix.mat3
window.mat4 = glMatrix.mat4
window.quat = glMatrix.quat
window.quat2 = glMatrix.quat2
window.vec2 = glMatrix.vec2
window.vec3 = glMatrix.vec3
window.vec4 = glMatrix.vec4

console.info(`%cMatrix-Engine %c 2.0.0 BETA 🛸`, CS1, CS1);

var lastChanges = `
[2.0.0] New networking based on kurento service and OpenVide web client
[1.9.40] First version with both support opengles11/2 and opengles300
 - Default : 1.3/opengles300
 - Switch with URL param 'app.html?GLSL=1.3' for opengle300 and '?GLSL=1.1' for opengles1.1/2
 - Implemented URL param for examples-build.html?GLSL=1.1 [Affect after first demo choose.
 - [1.9.58] Improved timeline/globalAnimation feature]
`;
console.info(`%c ${lastChanges} `, CS3);
console.info(`%c Render switch from 'requestAnimationFrame' to 'offScreen' with URLParams '?offScreen=true&offScreenSpeed=10'.
 For now physics stuff not affected. `, CS3);
console.info(`%c You can switch webGL ver 1/2 with ?GLSL=1.1 or ?GLSL=1.3 - EXPERIMENTAL`, CS3);
console.info(`%c Used GL_MATRIX 3.4 ${glMatrix}`, CS3);

// fbo
App.makeFBO = makeFBO;

// define shaders from code
if(QueryString.GLSL && QueryString.GLSL == 1.3) {
	// GLSL 1.30 -> opengles3
	console.info(`%cActive cook ⚗️: GLSL 1.3. for OPENGLES30 %c webGL2`, CS3, CS3);
	// console.log('Active: GLSL 1.3. for OPENGLES30')
	App.openglesShaderVersion = 1.3;
	loadShaders300();
} else if(QueryString.GLSL && (QueryString.GLSL == 1.1 || QueryString.GLSL == 1.2)) {
	// GLSL 1.10 -> opengles1.1 also 2
	App.openglesShaderVersion = 1.1;
	console.info(`%cActive cook ⚗️: GLSL 1.1.-1.2 for OPENGLES1.1/2 %c webGL1`, CS3, CS3);
	loadShaders11();
} else {
	// GLSL 1.30 -> opengles3
	App.openglesShaderVersion = 1.3;
	console.info(`%cActive: GLSL 1.3. for OPENGLES30 %c webGL2`, CS3, CS3);
	loadShaders300();
}

/* Width and Height variables of the browser screen  */
export var frames = 0;

// must be fixed
export function modifyFrames(newFrames) {
	frames = newFrames;
}

export var world = {};

var updateFrames = 0;
/* Because JavaScript is third class in mouse events */
// var mouseLoc = defineMouseLocationObject();
/* Common sense to object disposition                */
export var objListToDispose = new Array();
/* Need to stop the redraw when disposing            */

export var reDraw;

/**
 * @description
 * Define custom tags for new upgrade for light systems.
 */
window.customElements.define('matrix-camera', MatrixCameraController);
// window.customElements.define('matrix-light', MatrixLightComponent, {extends:'input'});
window.customElements.define('matrix-light', MatrixLightComponent);
// var X = Object.create(HTMLInputElement.prototype);
// window.customElements.define('matrix-light', X);

export function defineworld(canvas, renderType) {
	// define shaders from code
	// console.log("  Define the world");
	world = new Object();
	/*  Constructor for a world                       */
	world.GL = new defineWebGLWorld(canvas);
	/*  Exit if WEBGL could not initialize            */
	if('undefined' == typeof world.GL.gl) {
		// console.log("  Exception in Base world creation");
		delete this.GL;
		delete this;
		return 0;
	} else {
		// console.log("  Setting WEBGL base attributes");
		world.GL.gl.clearColor(App.glBackgroundColor.r, App.glBackgroundColor.g, App.glBackgroundColor.b, App.glBackgroundColor.a);
		world.GL.gl.enable(world.GL.gl.DEPTH_TEST);
		initiateFPS();
	}

	/* Complete declarations if pending            */
	world.pMatrix = mat4.create();
	world.mvMatrixStack = new Array();

	/* Contents of the world                       */
	world.contentList = new Array();

	/* Assign to the garbage collector object      */
	objListToDispose[objListToDispose.length] = world;

	// get data about gl limitation
	// Must be improved
	App.limitations.maxTexturesInFragmentShader = world.GL.gl.getParameter(world.GL.gl.MAX_TEXTURE_IMAGE_UNITS);
	App.limitations.ALIASED_POINT_SIZE_RANGE = world.GL.gl.getParameter(world.GL.gl.ALIASED_POINT_SIZE_RANGE);
	App.limitations.DEPTH_BITS = world.GL.gl.getParameter(world.GL.gl.DEPTH_BITS);
	App.limitations.MAX_SAMPLES = world.GL.gl.getParameter(world.GL.gl.MAX_SAMPLES);
	App.limitations.MAX_TEXTURE_SIZE = world.GL.gl.getParameter(world.GL.gl.MAX_TEXTURE_SIZE);
	App.limitations.MAX_VERTEX_ATTRIBS = world.GL.gl.getParameter(world.GL.gl.MAX_VERTEX_ATTRIBS);
	App.limitations.MAX_ELEMENTS_VERTICES = world.GL.gl.getParameter(world.GL.gl.MAX_ELEMENTS_VERTICES);

	/**
	 * World base functions
	 * Get the fragment or vertex shader
	 */
	world.getShader = loadShaders;
	/* Initialize shader fragment                        */
	world.initShaders = initShaders;
	world.handleLoadedTexture = App.tools.BasicTextures;
	world.initTexture = App.tools.loadTextureImage;

	world.disableUnusedAttr = function(gl, vertLimit) {
		var Local_looper1 = vertLimit;
		// var Local_looper1 = 0;
		// position, color, texture and normals
		while(Local_looper1 < 4) {
			gl.disableVertexAttribArray(Local_looper1);
			Local_looper1 = Local_looper1 + 1;
		}
	};

	// Bind base methods
	/* Push Matrix                              */
	world.mvPushMatrix = App.operation.PUSH_MATRIX;
	/* Pop Matrix                               */
	world.mvPopMatrix = App.operation.POP_MATRIX;
	/* Set uniform Matrix                       */
	world.setMatrixUniforms = App.operation.SET_MATRIX_UNIFORMS;
	/* Draw Perspective                         */
	world.renderPerspective = App.operation.CameraPerspective;
	/* Calculate rotatory speed                 */
	world.animate = animate;
	/* Buffer Triangle                          */
	world.bufferTriangle = App.operation.triangle_buffer_procedure;
	/* Draw Triangle                            */
	world.drawTriangle = App.operation.draws.triangle;
	/* Buffer Square                            */
	world.bufferSquare = App.operation.square_buffer_procedure;
	/* Draw Square                              */
	world.drawSquare = App.operation.draws.square;
	/* Buffer obj format                        */
	world.bufferObj = App.operation.obj_buffer_procedure;
	/* Buffer Cube                              */
	world.bufferCube = App.operation.cube_buffer_procedure;
	/* Buffer Cube                              */
	world.bufferCubeMap = App.operation.cubemap_buffer_procedure;
	world.cubeMapTextures = cubeMapTextures;
	/* Draw Cube                                */
	world.drawCube = App.operation.draws.cube;
	/* Buffer Pyramid                           */
	world.bufferPyramid = App.operation.piramide_buffer_procedure;
	/* Draw Pyramid                             */
	world.drawPyramid = App.operation.draws.piramide;
	/* Draw Obj file                            */
	world.drawObj = App.operation.draws.drawObj;

	world.bufferSquareTex = App.operation.squareTex_buffer_procedure;
	world.drawSquareTex = App.operation.draws.drawSquareTex;

	world.drawSprite2d = App.operation.draws.sprite2d;
	world.bufferSprite2d = App.operation.sprite2d_buffer_procedure;

	world.drawSphere = App.operation.draws.sphere;
	world.bufferSphere = App.operation.sphere_buffer_procedure;

	world.FBOS = [];

	/* Repeated draw functionality            */
	if(typeof renderType === 'undefined') {
		reDraw = App.operation.reDrawGlobal;
	} else if(renderType == 'simply') {
		reDraw = App.operation.simplyRender;
	}

	if(typeof QueryString.offScreenSpeed !== 'undefined') {
		console.log("URL param offScreenSpeed is active: ", QueryString.offScreenSpeed)
		App.redrawInterval = QueryString.offScreenSpeed;
	}

	/**
	 * @MatrixAnimationLine
	 * @globalAnimCounter Counter - READONLY
	 * @globalAnimSequenceSize = 5000
	 * After globalAnimCounter reach globalAnimSequenceSize value will
	 * reset to the zero.
	 */
	world.timeline = {};
	world.useAnimationLine = function(args) {
		world.animLine = true;
		world.globalAnimCounter = 0;
		world.globalAnimSequenceSize = args.sequenceSize;
		if(typeof args.totalSequence === 'undefined') args.totalSequence = 1;
		world.globalAnimTotalSequence = args.totalSequence;
		world.globalAnimCurSequence = 1;
		world.timeline.commands = [];
		document.getElementById('globalAnimCurSequence').innerText = world.globalAnimCurSequence;
		document.getElementById('globalAnimCounter').innerText = world.globalAnimCounter;
		document.getElementById('timeline').value = world.globalAnimCounter;
		document.getElementById('timeline').setAttribute('max', world.globalAnimSequenceSize);
		document.getElementById('globalAnimSize').innerText = world.globalAnimSequenceSize;
		document.getElementById('matrixTimeLine').style.display = 'flex';
	};

	world.addCommandAtSeqIndex = function(COMMAND, INDEX) {
		world.timeline.commands[INDEX] = COMMAND
	};

	world.addSubCommand = function(COMMAND, INDEX) {
		// WIP
		// world.timeline.subCommands[INDEX] = COMMAND
	};

	/**
	 * @MatrixPhysics
	 * Must be disabled on default run.
	 * Return cannon world.
	 */
	world.physics = null;
	world.loadPhysics = function(gravityVector = [0, 0, -9.82]) {
		world.physics = new MatrixPhysics(gravityVector);
		return world.physics;
	};

	/**
	 * @description
	 * TEST GLOBAL LIGHT PARAMS
	 * this.uLightPosition = new Float32Array([0.0,0.0,0.0]);
	 */
	world.uLightPosition = new Float32Array([0.0, 0.0, 0.0]);

	/* Fill world based on content           */
	world.Add = function(filler, size, nameUniq, texturesPaths, mesh_, animationConstruct_) {
		/*
			Common conventions to be followed across
			Contents can contain any type of objects. Each object can be a triangle, cube etc.
			object.visible        =  Avoid draw procedure
			object.type           =  Contains the type of object namely triangle, cube
			object.size           =  Contains the size of the object. 1 unit will be the same as how WEBGL assumes 1 as in an array
			object.sides          =  Contains the number of sides. This needs to be first declared.  (To be built and used)
			object.shaderProgram  =  Contains the fragment and vertex shader
			object.rotation       =  Rotator
			object.color          =  Will contain colors based on the sides clockwise. One vertice -> [R,G,B,alpha]
			object.texture        =  If texture is present then this will be used.           (To be built and used)
			object.mesh           =  For objs and custom geometry - geometry buffers container
			object.vertexPositionBuffer =  allocated during buffering
			object.vertexColorBuffer    =  allocated during buffering
			object.vertexTexCoordBuffer =  allocated during buffering
			object.vertexIndexBuffer    =  allocated during buffering
		*/
		// console.info("Fill world with:" + filler + " of size:" + size);
		if('triangle' == filler) {
			var triangleObject = new Object();
			triangleObject.visible = true;
			if(typeof nameUniq != 'undefined') {
				triangleObject.name = nameUniq;
			} else {
				triangleObject.name = 'triangle_instance_' + Math.floor(Math.random() * 100000 + 1);
			}
			triangleObject.streamTextures = null;
			triangleObject.type = filler;
			triangleObject.size = size;
			triangleObject.sides = 3;
			triangleObject.shaderProgram = this.initShaders(this.GL.gl, filler + '-shader-fs', filler + '-shader-vs');
			triangleObject.position = new Position(0, 0, -5.0);
			// update
			triangleObject.position.nameUniq = nameUniq;
			triangleObject.position.netObjId = nameUniq;
			triangleObject.rotation = new RotationVector(1, 0, 0);
			triangleObject.rotation.nameUniq = nameUniq;
			triangleObject.rotation.netObjId = nameUniq;
			triangleObject.color = new GeoOfColor('triangle');
			triangleObject.mvMatrix = mat4.create();
			triangleObject.geometry = new TriangleVertex(triangleObject);
			triangleObject.geometry.nameUniq = nameUniq;
			triangleObject.glBlend = new _glBlend();
			// destroy self
			triangleObject.selfDestroy = (after) => {
				if(after) {
					setTimeout(() => {
						// destroy me
						var TEST = world.contentList[world.contentList.indexOf(triangleObject)];
						if(typeof TEST != 'undefined' && typeof App.scene[TEST.name] != 'undefined' && App.scene[TEST.name] != null) {
							let objForDelete = world.contentList.splice(world.contentList.indexOf(triangleObject), 1)[0];
							App.scene[objForDelete.name] = null;
						}
					}, after);
				} else {
					let objForDelete = world.contentList.splice(world.contentList.indexOf(triangleObject), 1)[0];
					App.scene[objForDelete.name] = null;
				}
			};

			triangleObject.raycast = {
				enabled: true
			};

			// Physics
			triangleObject.physics = {
				enabled: false
			};

			triangleObject.net = {
				enabled: false,
				// Old net
				activate: () => {
					net.activateDataStream();
				}
			};

			triangleObject.instancedDraws = {
				numberOfInstance: 10,
				array_of_local_offset: [12, 0, 0],
				overrideDrawArraysInstance: function(object_) {}
			};

			if(triangleObject.shaderProgram) {
				this.bufferTriangle(triangleObject);
				triangleObject.glDrawElements = new _DrawElements(triangleObject.vertexColorBuffer.numItems);
				this.contentList[this.contentList.length] = triangleObject;
				App.scene[triangleObject.name] = triangleObject;
				// console.log("Buffer the " + filler + ":Store at:" + this.contentList.length);
			} else {
				console.warn("Triangle shader failure...");
			}
		}

		if('square' == filler) {
			var squareObject = new Object();
			squareObject.visible = true;
			if(typeof nameUniq != 'undefined') {
				squareObject.name = nameUniq;
			} else {
				squareObject.name = 'square_instance_' + Math.floor(Math.random() * 100000 + 1);
			}
			squareObject.streamTextures = null;
			squareObject.type = filler;
			squareObject.size = size;
			squareObject.sides = 4;
			squareObject.shaderProgram = this.initShaders(this.GL.gl, filler + '-shader-fs', filler + '-shader-vs');
			squareObject.position = new Position(0, 0, -5.0);
			squareObject.position.nameUniq = nameUniq;
			squareObject.position.netObjId = nameUniq;
			squareObject.rotation = new RotationVector(1, 0, 0);
			squareObject.rotation.nameUniq = nameUniq;
			squareObject.rotation.netObjId = nameUniq;
			squareObject.color = true;
			squareObject.mvMatrix = mat4.create();
			squareObject.geometry = new SquareVertex(squareObject);
			squareObject.geometry.nameUniq = nameUniq;
			squareObject.glBlend = new _glBlend();

			// destroy self
			squareObject.selfDestroy = (after) => {
				if(after) {
					setTimeout(() => {
						// destroy me
						var TEST = world.contentList[world.contentList.indexOf(squareObject)];
						if(typeof TEST != 'undefined' && typeof App.scene[TEST.name] != 'undefined' && App.scene[TEST.name] != null) {
							let objForDelete = world.contentList.splice(world.contentList.indexOf(squareObject), 1)[0];
							App.scene[objForDelete.name] = null;
						}
					}, after);
				} else {
					let objForDelete = world.contentList.splice(world.contentList.indexOf(squareObject), 1)[0];
					App.scene[objForDelete.name] = null;
				}
			};

			squareObject.raycast = {
				enabled: true
			};

			// Physics
			squareObject.physics = {
				enabled: false
			};

			squareObject.net = {
				enabled: false,
				activate: () => {
					net.activateDataStream();
				}
			};

			squareObject.instancedDraws = {
				numberOfInstance: 10,
				array_of_local_offset: [12, 0, 0],
				overrideDrawArraysInstance: function(object_) {}
			};

			if(squareObject.shaderProgram) {
				// console.log("   Buffer the " + filler + ":Store at:" + this.contentList.length);
				this.bufferSquare(squareObject);
				squareObject.glDrawElements = new _DrawElements(squareObject.vertexColorBuffer.numItems);
				squareObject.glDrawElements.mode = 'TRIANGLE_STRIP';
				this.contentList[this.contentList.length] = squareObject;
				App.scene[squareObject.name] = squareObject;
			} else {
				console.warn("Square shader failure...");
			}
		}

		if('squareTex' == filler) {
			// eslint-disable-next-line no-redeclare
			var squareObject = new Object();
			squareObject.visible = true;
			if(typeof nameUniq != 'undefined') {
				squareObject.name = nameUniq;
			} else {
				squareObject.name = 'square_instance_' + Math.floor(Math.random() * 100000 + 1);
			}
			squareObject.streamTextures = null;
			squareObject.type = filler;
			squareObject.size = size;
			squareObject.sides = 4;
			squareObject.position = new Position(0, 0, -5.0);
			squareObject.position.nameUniq = nameUniq;
			squareObject.position.netObjId = nameUniq;
			squareObject.rotation = new RotationVector(1, 0, 0);
			squareObject.rotation.nameUniq = nameUniq;
			squareObject.rotation.netObjId = nameUniq;
			squareObject.mvMatrix = mat4.create();
			squareObject.geometry = new SquareVertex(squareObject);
			squareObject.geometry.nameUniq = nameUniq;
			squareObject.glBlend = new _glBlend();

			squareObject.setFBO = function() {
				console.log('cubeObject set fbo ... ')
				squareObject.FBO = {
					name: squareObject.name,
					FB: makeFBO(world.GL.gl, {width: 512, height: 512}),
					settings: {
						cameraX: (typeof arg === 'undefined' || !arg.cameraX ? 6 : arg.cameraX),
						cameraY: (typeof arg === 'undefined' || !arg.cameraY ? 5 : arg.cameraY),
						cameraZ: (typeof arg === 'undefined' || !arg.cameraZ ? 5 : arg.cameraZ),
						pitch: (typeof arg === 'undefined' || !arg.pitch ? 2.5 : arg.pitch),
						yaw: (typeof arg === 'undefined' || !arg.yaw ? 4.8 : arg.yaw)
					}
				};
				// for now
				world.FBOS.push(squareObject.FBO)
			};

			// destroy self
			squareObject.selfDestroy = (after) => {
				if(after) {
					setTimeout(() => {
						// destroy me
						// destroy me
						var TEST = world.contentList[world.contentList.indexOf(squareObject)];
						if(typeof TEST != 'undefined' && typeof App.scene[TEST.name] != 'undefined' && App.scene[TEST.name] != null) {
							let objForDelete = world.contentList.splice(world.contentList.indexOf(squareObject), 1)[0];
							App.scene[objForDelete.name] = null;
						}
					}, after);
				} else {
					let objForDelete = world.contentList.splice(world.contentList.indexOf(squareObject), 1)[0];
					App.scene[objForDelete.name] = null;
				}
			};

			squareObject.raycast = {
				enabled: true
			};

			// Physics
			squareObject.physics = {
				enabled: false
			};

			squareObject.net = {
				enabled: false,
				activate: () => {
					net.activateDataStream();
				}
			};

			squareObject.LightsData = {
				directionLight: new COLOR(1, 1, 1),
				ambientLight: new COLOR(1, 1, 1),
				lightingDirection: new COLOR(1, 1, 0)
			};

			squareObject.useShadows = false;
			squareObject.activateShadows = (t) => {
				setTimeout(() => {
					if(typeof t === 'undefined' || t == 'spot') {
						t = 'spot';
						squareObject.useShadows = true;
						squareObject.shadows = new MatrixShadowSpot();
					} else if(t == 'specular') {
						squareObject.useShadows = true;
						squareObject.shadows = new MatrixShadowSpecular();
					} else if(t == 'lens') {
						squareObject.useShadows = true;
						squareObject.shadows = new MatrixEffectLens();
					} else if(t == 'spot-shadow') {
						squareObject.useShadows = true;
						squareObject.shadows = new MatrixShadowSpotShadowTest();
					}
					RegenerateShader(filler + '-shader-fs', texturesPaths.source.length, texturesPaths.mix_operation, t);
					squareObject.shaderProgram = this.initShaders(this.GL.gl, filler + '-shader-fs', filler + '-shader-vs');
				}, 10)
			};

			// gen tex
			squareObject.createPixelsTex = App.tools.createPixelsTex;
			if(typeof texturesPaths !== 'undefined') {
				if(typeof texturesPaths == 'string') {
					// Single tex
					squareObject.texture = this.initTexture(this.GL.gl, texturesPaths);
					squareObject.textures = [];
					squareObject.textures[0] = squareObject.texture;
				} else if(typeof texturesPaths == 'object') {
					// console.info("texturesPaths is object...");
					squareObject.textures = [];
					squareObject.texture = true;
					if(typeof texturesPaths.params === 'undefined') {
						squareObject.texParams = {
							TEXTURE_WRAP_S: this.GL.gl.REPEAT,
							TEXTURE_WRAP_T: this.GL.gl.REPEAT,
							TEXTURE_MAG_FILTER: this.GL.gl.LINEAR, // NEAREST
							TEXTURE_MIN_FILTER: this.GL.gl.LINEAR // 
						};
					} else {
						squareObject.texParams = texturesPaths.params;
					}

					RegenerateShader('' + filler + '-shader-fs', texturesPaths.source.length, texturesPaths.mix_operation, 'opengles');
					for(var t = 0;t < texturesPaths.source.length;++t) {
						squareObject.textures.push(this.initTexture(this.GL.gl, texturesPaths.source[t]));
					}
					squareObject.shaderProgram = this.initShaders(this.GL.gl, filler + '-shader-fs', filler + '-shader-vs');
				} else {
					alert('Exec add obj : texturePaths : path is unknow typeof');
				}
			} else {
				// no textures , use default single textures
				squareObject.texture = this.initTexture(this.GL.gl, 'res/images/icon2.jpg');
				squareObject.textures[0] = squareObject.texture;
				squareObject.shaderProgram = this.initShaders(this.GL.gl, filler + '-shader-fs', filler + '-shader-vs');
			}

			squareObject.LightMap = new GeoOfColor('square');
			squareObject.custom = new Object();
			squareObject.custom.gl_texture = null;

			squareObject.instancedDraws = {
				numberOfInstance: 10,
				array_of_local_offset: [12, 0, 0],
				overrideDrawArraysInstance: function(object_) {}
			};

			if(squareObject.shaderProgram) {
				// // console.info("   Buffer the " + filler + ":Store at:" + this.contentList.length);
				this.bufferSquareTex(squareObject);
				squareObject.glDrawElements = new _DrawElements(squareObject.vertexIndexBuffer.numItems);
				this.contentList[this.contentList.length] = squareObject;
				App.scene[squareObject.name] = squareObject;
			} else {
				console.warn("Square shader failure");
			}
		}

		if('cube' == filler) {
			var cubeObject = new Object();
			cubeObject.visible = true;
			if(typeof nameUniq != 'undefined') {
				cubeObject.name = nameUniq;
			} else {
				cubeObject.name = 'cube_instance_' + Math.floor(Math.random() * 100000 + 1);
			}
			cubeObject.streamTextures = null;
			cubeObject.type = filler;
			cubeObject.size = size;
			cubeObject.sides = 12;
			cubeObject.shaderProgram = this.initShaders(this.GL.gl, filler + '-shader-fs', filler + '-shader-vs');
			cubeObject.position = new Position(0, 0, -5.0);
			// update
			cubeObject.position.nameUniq = nameUniq;
			cubeObject.position.netObjId = nameUniq;
			cubeObject.rotation = new RotationVector(1, 0, 0);
			cubeObject.rotation.nameUniq = nameUniq;
			cubeObject.rotation.netObjId = nameUniq;
			cubeObject.color = true;
			cubeObject.mvMatrix = mat4.create();
			cubeObject.geometry = new CubeVertex(cubeObject);
			cubeObject.geometry.nameUniq = nameUniq;

			cubeObject.instancedDraws = {
				numberOfInstance: 10,
				array_of_local_offset: [12, 0, 0],
				overrideDrawArraysInstance: function(object_) {}
			};

			cubeObject.glBlend = new _glBlend();

			cubeObject.selfDestroy = (after) => {
				if(after) {
					setTimeout(() => {
						// destroy me
						var TEST = world.contentList[world.contentList.indexOf(cubeObject)];
						if(typeof TEST != 'undefined' && typeof App.scene[TEST.name] != 'undefined' && App.scene[TEST.name] != null) {
							let objForDelete = world.contentList.splice(world.contentList.indexOf(cubeObject), 1)[0];
							App.scene[objForDelete.name] = null;
						}
					}, after);
				} else {
					let objForDelete = world.contentList.splice(world.contentList.indexOf(cubeObject), 1)[0];
					App.scene[objForDelete.name] = null;
				}
			};

			cubeObject.raycast = {
				enabled: true
			};

			// Physics
			cubeObject.physics = {
				enabled: false
			};

			cubeObject.net = {
				enabled: false,
				activate: () => {
					net.activateDataStream();
				}
			};

			if(cubeObject.shaderProgram && cubeObject.geometry) {
				// console.log("   Buffer the " + filler + ":Store at:" + this.contentList.length);
				this.bufferCube(cubeObject);
				cubeObject.glDrawElements = new _DrawElements(cubeObject.vertexIndexBuffer.numItems);
				this.contentList[this.contentList.length] = cubeObject;
				App.scene[cubeObject.name] = cubeObject;
			} else {
				console.warn("Cube shader failure")
			}
		}

		if('sphereTex' == filler || 'sphereLightTex' == filler) {
			var sphereObject = new Object();
			sphereObject.visible = true;
			if(typeof nameUniq != 'undefined') {
				sphereObject.name = nameUniq;
			} else {
				sphereObject.name = 'sphereObject_instance_' + Math.floor(Math.random() * 100000 + 1);
			}
			sphereObject.streamTextures = null;
			sphereObject.type = filler;
			sphereObject.position = new Position(0, 0, -5.0);
			sphereObject.position.nameUniq = nameUniq;
			sphereObject.position.netObjId = nameUniq;
			sphereObject.size = size;
			sphereObject.sides = 12;
			sphereObject.rotation = new RotationVector(0, 1, 0);
			sphereObject.rotation.nameUniq = nameUniq;
			sphereObject.rotation.netObjId = nameUniq;

			//lights
			sphereObject.LightsData = {
				directionLight: new COLOR(1, 1, 1),
				ambientLight: new COLOR(1, 1, 1),
				lightingDirection: new COLOR(1, 1, 0)
			};

			// destroy self
			sphereObject.selfDestroy = (after) => {
				if(after) {
					setTimeout(() => {
						// destroy me
						var TEST = world.contentList[world.contentList.indexOf(sphereObject)];
						if(typeof TEST != 'undefined' && typeof App.scene[TEST.name] != 'undefined' && App.scene[TEST.name] != null) {
							let objForDelete = world.contentList.splice(world.contentList.indexOf(sphereObject), 1)[0];
							App.scene[objForDelete.name] = null;
						}
					}, after);
				} else {
					let objForDelete = world.contentList.splice(world.contentList.indexOf(sphereObject), 1)[0];
					App.scene[objForDelete.name] = null;
				}
			};

			sphereObject.raycast = {
				enabled: true
			};

			// Physics
			sphereObject.physics = {
				enabled: false
			};

			sphereObject.net = {
				enabled: false,
				activate: () => {
					net.activateDataStream();
				}
			};
			sphereObject.custom = new Object();
			sphereObject.custom.gl_texture = null;

			sphereObject.textures = [];
			if(typeof texturesPaths !== 'undefined') {
				if(typeof texturesPaths == 'string') {
					//alert('path is string')
					sphereObject.texture = this.initTexture(this.GL.gl, texturesPaths);

					sphereObject.textures.push(cubeObject.texture);
				} else if(typeof texturesPaths == 'object') {
					// console.log("path is object");
					sphereObject.textures = [];
					sphereObject.texture = true;

					if(typeof texturesPaths.params === 'undefined') {
						sphereObject.texParams = {
							TEXTURE_WRAP_S: this.GL.gl.REPEAT,
							TEXTURE_WRAP_T: this.GL.gl.REPEAT
						};
					} else {
						sphereObject.texParams = texturesPaths.params;
					}

					RegenerateShader(filler + '-shader-fs', texturesPaths.source.length, texturesPaths.mix_operation, 'opengles');
					// eslint-disable-next-line no-redeclare
					for(var t = 0;t < texturesPaths.source.length;++t) {
						sphereObject.textures.push(this.initTexture(this.GL.gl, texturesPaths.source[t]));
					}
					sphereObject.shaderProgram = this.initShaders(this.GL.gl, filler + '-shader-fs', filler + '-shader-vs');
				} else {
					alert('Exec add obj : texturePaths : path is unknow typeof');
				}
			} else {
				// no textures , use default single textures
				sphereObject.texture = this.initTexture(this.GL.gl, 'res/images/texture_spiral1.png');
				sphereObject.textures.push(sphereObject.texture);
				sphereObject.texture = true;
				sphereObject.shaderProgram = this.initShaders(this.GL.gl, filler + '-shader-fs', filler + '-shader-vs');
			}

			sphereObject.changeMaterial = function(texturesPaths) {
				RegenerateShader(this.type + '-shader-fs', texturesPaths.source.length, texturesPaths.mix_operation, 'opengles');

				for(var t = 0;t < texturesPaths.source.length;++t) {
					this.textures.push(world.initTexture(world.GL.gl, texturesPaths.source[t], texturesPaths.params));
				}

				this.shaderProgram = world.initShaders(world.GL.gl, this.type + '-shader-fs', this.type + '-shader-vs');
			};

			sphereObject.changeShader = function(texturesPaths, custom_code) {
				RegenerateCustomShader(this.type + '-shader-fs', texturesPaths.source.length, texturesPaths.mix_operation, custom_code);

				for(var t = 0;t < texturesPaths.source.length;++t) {
					this.textures.push(world.initTexture(world.GL.gl, texturesPaths.source[t], texturesPaths.params));
				}

				this.shaderProgram = world.initShaders(world.GL.gl, this.type + '-shader-fs', this.type + '-shader-vs');
			};

			sphereObject.mvMatrix = mat4.create();
			sphereObject.LightMap = undefined;

			if(typeof mesh_ !== 'undefined') {
				sphereObject.latitudeBands = mesh_.latitudeBands;
				sphereObject.longitudeBands = mesh_.longitudeBands;
				sphereObject.radius = mesh_.radius * sphereObject.size;
			} else {
				sphereObject.latitudeBands = 30;
				sphereObject.longitudeBands = 30;
				sphereObject.radius = sphereObject.size;
			}

			sphereObject.geometry = new sphereVertex(sphereObject);
			sphereObject.geometry.nameUniq = nameUniq;

			sphereObject.instancedDraws = {
				numberOfInstance: 10,
				array_of_local_offset: [12, 0, 0],
				overrideDrawArraysInstance: function(object_) {}
			};

			//draws params
			sphereObject.glBlend = new _glBlend();

			if(sphereObject.shaderProgram) {
				// console.log("   Buffer the " + filler + ":Store at:" + this.contentList.length);
				this.bufferSphere(sphereObject);
				sphereObject.glDrawElements = new _DrawElements(sphereObject.vertexIndexBuffer.numItems);
				this.contentList[this.contentList.length] = sphereObject;
				App.scene[sphereObject.name] = sphereObject;
			} else {
				console.warn("Cube shader failure");
			}
		}

		if('pyramid' == filler) {
			var pyramidObject = new Object();
			pyramidObject.visible = true;
			if(typeof nameUniq != 'undefined') {
				pyramidObject.name = nameUniq;
			} else {
				pyramidObject.name = 'pyramid_instance_' + Math.floor(Math.random() * 100000 + 1);
			}
			pyramidObject.streamTextures = null;
			pyramidObject.type = filler;
			pyramidObject.size = size;
			pyramidObject.sides = 8;
			pyramidObject.shaderProgram = this.initShaders(this.GL.gl, filler + '-shader-fs', filler + '-shader-vs');
			pyramidObject.position = new Position(0, 0, -5.0);
			pyramidObject.position.nameUniq = nameUniq;
			pyramidObject.position.netObjId = nameUniq;
			pyramidObject.rotation = new RotationVector(1, 0, 0);
			pyramidObject.rotation.nameUniq = nameUniq;
			pyramidObject.rotation.netObjId = nameUniq;
			pyramidObject.mvMatrix = mat4.create();
			pyramidObject.geometry = new PiramideVertex(pyramidObject);
			pyramidObject.geometry.nameUniq = nameUniq;

			// destroy self
			pyramidObject.selfDestroy = (after) => {
				if(after) {
					setTimeout(() => {
						// destroy me
						var TEST = world.contentList[world.contentList.indexOf(pyramidObject)];
						if(typeof TEST != 'undefined' && typeof App.scene[TEST.name] != 'undefined' && App.scene[TEST.name] != null) {
							let objForDelete = world.contentList.splice(world.contentList.indexOf(pyramidObject), 1)[0];
							App.scene[objForDelete.name] = null;
						}
					}, after);
				} else {
					let objForDelete = world.contentList.splice(world.contentList.indexOf(pyramidObject), 1)[0];
					App.scene[objForDelete.name] = null;
				}
			};

			pyramidObject.raycast = {
				enabled: true
			};

			// Physics
			pyramidObject.physics = {
				enabled: false
			};

			pyramidObject.net = {
				enabled: false,
				activate: () => {
					net.activateDataStream();
				}
			};

			pyramidObject.instancedDraws = {
				numberOfInstance: 10,
				array_of_local_offset: [12, 0, 0],
				overrideDrawArraysInstance: function(object_) {}
			};

			pyramidObject.glBlend = new _glBlend();

			if(pyramidObject.shaderProgram) {
				// console.log("   Buffer the " + filler + ":Store at:" + this.contentList.length);
				this.bufferPyramid(pyramidObject);
				pyramidObject.glDrawElements = new _DrawElements(pyramidObject.vertexColorBuffer.numItems); // !!!!!!!!!
				this.contentList[this.contentList.length] = pyramidObject;
				App.scene[pyramidObject.name] = pyramidObject;
			} else {
				console.warn("Pyramid shader failure");
			}
		}

		// no physics for now
		if('obj' == filler) {
			var objObject = new Object();
			objObject.visible = true;
			if(typeof nameUniq != 'undefined') {
				objObject.name = nameUniq;
			} else {
				objObject.name = 'obj_instance_' + Math.floor(Math.random() * 100000 + 1);
			}
			objObject.streamTextures = null;
			objObject.type = filler;
			objObject.size = size;
			objObject.sides = 8;
			objObject.shaderProgram = this.initShaders(this.GL.gl, filler + '-shader-fs', filler + '-shader-vs');
			objObject.position = new Position(0, -5, -8.0);
			objObject.position.nameUniq = nameUniq;
			objObject.position.netObjId = nameUniq;
			objObject.rotation = new RotationVector(0, 1, 0);
			objObject.rotation.nameUniq = nameUniq;
			objObject.rotation.netObjId = nameUniq;
			objObject.color = false; // new GeoOfColor('4x4');
			// custom textures
			objObject.custom = new Object();
			objObject.custom.gl_texture = null;
			objObject.glDrawElements = new _DrawElements(mesh_.indexBuffer.numItems);
			objObject.glBlend = new _glBlend();

			objObject.LightsData = {
				directionLight: new COLOR(5, 5, 5),
				ambientLight: new COLOR(1, 1, 1),
				lightingDirection: new COLOR(0, 1, 0)
			};

			// destroy self  MAy need more improve !!
			objObject.selfDestroy = (after) => {
				if(after) {
					setTimeout(() => {
						// destroy me
						var TEST = world.contentList[world.contentList.indexOf(objObject)];
						if(typeof TEST != 'undefined' && typeof App.scene[TEST.name] != 'undefined' && App.scene[TEST.name] != null) {
							let objForDelete = world.contentList.splice(world.contentList.indexOf(objObject), 1)[0];
							App.scene[objForDelete.name] = null;
						}
					}, after);
				} else {
					let objForDelete = world.contentList.splice(world.contentList.indexOf(objObject), 1)[0];
					App.scene[objForDelete.name] = null;
				}
			};

			objObject.raycast = {
				enabled: true
			};

			// Physics
			objObject.physics = {
				enabled: false
			};

			objObject.net = {
				enabled: false,
				activate: () => {
					net.activateDataStream();
				}
			};

			objObject.setFBO = function() {
				objObject.FBO = {};
			};

			// Update others start
			objObject.useShadows = false;
			objObject.activateShadows = (t) => {
				if(typeof t === 'undefined' || t == 'spot') {
					t = 'spot'
					objObject.useShadows = true;
					objObject.shadows = new MatrixShadowSpot();
				} else if(t == 'specular') {
					objObject.useShadows = true;
					objObject.shadows = new MatrixShadowSpecular();
				} else if(t == 'lens') {
					objObject.useShadows = true;
					objObject.shadows = new MatrixEffectLens();
				} else if(t == 'spot-shadow') {
					objObject.useShadows = true;
					objObject.shadows = new MatrixShadowSpotShadowTest();
				}

				RegenerateShader(filler + '-shader-fs', texturesPaths.source.length, texturesPaths.mix_operation, t);
				objObject.shaderProgram = this.initShaders(this.GL.gl, filler + '-shader-fs', filler + '-shader-vs');
			};

			if(typeof texturesPaths !== 'undefined') {
				if(typeof texturesPaths == 'string') {
					objObject.texture = this.initTexture(this.GL.gl, texturesPaths);
					objObject.textures = [];
					objObject.textures_texParameteri = []; //new , but not in use
					objObject.textures[0] = objObject.texture;
				} else if(typeof texturesPaths == 'object') {
					objObject.textures = [];
					objObject.textures_texParameteri = []; //new
					objObject.texture = true;
					if(typeof texturesPaths.params === 'undefined') {
						objObject.texParams = {
							MIPMAP: false, // custom
							ANISOTROPY: false, // custom
							TEXTURE_WRAP_S: this.GL.gl.REPEAT,
							TEXTURE_WRAP_T: this.GL.gl.REPEAT,
							TEXTURE_MAG_FILTER: this.GL.gl.LINEAR, // NEAREST
							TEXTURE_MIN_FILTER: this.GL.gl.LINEAR
						};
					} else {
						objObject.texParams = texturesPaths.params;
					}
					RegenerateShader(filler + '-shader-fs', texturesPaths.source.length, texturesPaths.mix_operation, 'opengles');
					// eslint-disable-next-line no-redeclare
					for(var t = 0;t < texturesPaths.source.length;++t) {
						objObject.textures.push(this.initTexture(this.GL.gl, texturesPaths.source[t], texturesPaths.params));
						objObject.textures_texParameteri.push(new _glTexParameteri('TEXTURE_2D', 'TEXTURE_MAG_FILTER', 'LINEAR'));
					}
					objObject.shaderProgram = this.initShaders(this.GL.gl, filler + '-shader-fs', filler + '-shader-vs');
				} else {
					// console.warn("Exec add obj : texturePaths : path is unknow typeof");
				}
			} else {
				// no textures , use default single textures
				//objObject.texture = undefined;
				objObject.texture = this.initTexture(this.GL.gl, 'res/images/texture_spiral1.png');
				objObject.textures = [];
				objObject.textures[0] = objObject.texture;
			}

			objObject.LightMap = new GeoOfColor('square');

			objObject.changeMaterial = function(texturesPaths) {
				RegenerateShader(this.type + '-shader-fs', texturesPaths.source.length, texturesPaths.mix_operation);
				for(var t = 0;t < texturesPaths.source.length;++t) {
					this.textures.push(world.initTexture(world.GL.gl, texturesPaths.source[t]));
				}
				this.shaderProgram = world.initShaders(world.GL.gl, this.type + '-shader-fs', this.type + '-shader-vs');
			};

			objObject.mvMatrix = mat4.create();
			// update
			objObject.meshList = {};

			if(typeof animationConstruct_ == 'undefined' || typeof animationConstruct_ == null) {
				objObject.animation = null;
			} else {
				objObject.animation = {
					id: animationConstruct_.id,
					sumOfAniFrames: animationConstruct_.sumOfAniFrames,
					currentAni: animationConstruct_.currentAni,
					speed: animationConstruct_.speed,
					currentDraws: 0
				};

				if(typeof animationConstruct_.animations !== 'undefined') {
					objObject.animation.anims = animationConstruct_.animations;
					objObject.play = play;
				}
				// no need for single test it in future
				objObject.meshList = animationConstruct_.meshList;
			}

			// Stay like root or t pose data holder
			objObject.mesh = mesh_;

			if(objObject.shaderProgram) {
				// console.log("   Buffer the " + filler + ":Store at:" + this.contentList.length);
				this.bufferObj(objObject);
				this.contentList[this.contentList.length] = objObject;
				App.scene[objObject.name] = objObject;
			} else {
				console.warn('obj file shader failure');
			}
		}

		if('cubeTex' == filler || 'cubeLightTex' == filler) {
			// eslint-disable-next-line no-redeclare
			var cubeObject = new Object();
			cubeObject.visible = true;
			if(typeof nameUniq != 'undefined') {
				cubeObject.name = nameUniq;
			} else {
				cubeObject.name = 'cube_instance_' + Math.floor(Math.random() * 1000 + 1);
			}
			cubeObject.streamTextures = null;
			cubeObject.type = filler;
			cubeObject.position = new Position(0, 0, -5.0);
			// update
			cubeObject.position.nameUniq = nameUniq;
			cubeObject.position.netObjId = nameUniq;
			cubeObject.size = size;
			cubeObject.sides = 12;
			cubeObject.rotation = new RotationVector(0, 1, 0);
			cubeObject.rotation.nameUniq = nameUniq;
			cubeObject.rotation.netObjId = nameUniq;

			//lights
			cubeObject.LightsData = {
				directionLight: new COLOR(1, 1, 1),
				ambientLight: new COLOR(1, 1, 1),
				lightingDirection: new COLOR(radToDeg(0.3), radToDeg(-0.3), radToDeg(-1))
			};

			cubeObject.setFBO = function(arg) {
				// cubeObject.FBO = {};
				// console.log('cubeObject set fbo ... ')
				cubeObject.FBO = {
					name: cubeObject.name,
					FB: makeFBO(world.GL.gl, {width: 512, height: 512}),
					settings: {
						cameraX: (typeof arg === 'undefined' || !arg.cameraX ? 0 : arg.cameraX),
						cameraY: (typeof arg === 'undefined' || !arg.cameraY ? 0 : arg.cameraY),
						cameraZ: (typeof arg === 'undefined' || !arg.cameraZ ? 0 : arg.cameraZ),
						pitch: (typeof arg === 'undefined' || !arg.pitch ? 2.5 : arg.pitch),
						yaw: (typeof arg === 'undefined' || !arg.yaw ? 4.8 : arg.yaw),
						// posZ: (typeof arg === 'undefined' || !arg.posZ? 4.3 : arg.posZ),
						// targetX: (typeof arg === 'undefined' || !arg.targetX? 2.5 : arg.targetX),
						// targetY: (typeof arg === 'undefined'|| !arg.targetY ? 0 : arg.targetY),
						// targetZ: (typeof arg === 'undefined' || !arg.targetZ? 3.5 : arg.targetZ),
						// projWidth: (typeof arg === 'undefined' || !arg.projWidth? 1 : arg.projWidth),
						// projHeight: (typeof arg === 'undefined'|| !arg.projHeight ? 1 : arg.projHeight),
						// perspective:  (typeof arg === 'undefined' || !arg.perspective? true : arg.perspective),
						// fieldOfView:  (typeof arg === 'undefined' || !arg.fieldOfView? 120 : arg.fieldOfView),
						// bias: (typeof arg === 'undefined' || !arg.bias ? -0.006 : arg.bias),
						// translate: (typeof arg === 'undefined' || !arg.translate ? [1.5, 1.5, 1.5] : [arg.translate[0], arg.translate[1], arg.translate[2]]),
						// scale  : (typeof arg === 'undefined' || !arg.scale ? [0.5 ,0.5 ,0.5] : [arg.scale[0],arg.scale[1] ,arg.scale[2] ])
					}
				};
				// for now
				// world.FBOS[0] = cubeObject.FBO;
				world.FBOS.push(cubeObject.FBO);
			};

			// destroy self  MAy need more improve
			cubeObject.selfDestroy = (after) => {
				if(after) {
					setTimeout(() => {
						// destroy me
						var TEST = world.contentList[world.contentList.indexOf(cubeObject)];
						if(typeof TEST != 'undefined' && typeof App.scene[TEST.name] != 'undefined' && App.scene[TEST.name] != null) {
							let objForDelete = world.contentList.splice(world.contentList.indexOf(cubeObject), 1)[0];
							App.scene[objForDelete.name] = null;
						}
					}, after);
				} else {
					let objForDelete = world.contentList.splice(world.contentList.indexOf(cubeObject), 1)[0];
					App.scene[objForDelete.name] = null;
				}
			};

			cubeObject.raycast = {
				enabled: true
			};

			// Physics
			cubeObject.physics = {
				enabled: false
			};

			cubeObject.net = {
				enabled: false,
				activate: () => {
					net.activateDataStream();
				}
			};

			// Update others start
			cubeObject.useShadows = false;
			cubeObject.activateShadows = (t) => {
				if(typeof t === 'undefined' || t == 'spot') {
					t = 'spot'
					cubeObject.useShadows = true;
					cubeObject.shadows = new MatrixShadowSpot();
				} else if(t == 'specular') {
					cubeObject.useShadows = true;
					cubeObject.shadows = new MatrixShadowSpecular();
				} else if(t == 'lens') {
					cubeObject.useShadows = true;
					cubeObject.shadows = new MatrixEffectLens();
				} else if(t == 'spot-shadow') {
					cubeObject.useShadows = true;
					cubeObject.shadows = new MatrixShadowSpotShadowTest();
				}

				RegenerateShader(filler + '-shader-fs', texturesPaths.source.length, texturesPaths.mix_operation, t);
				console.log('REGEN')
				cubeObject.shaderProgram = this.initShaders(this.GL.gl, filler + '-shader-fs', filler + '-shader-vs');
			};

			cubeObject.deactivateTex = () => {
				cubeObject.vertexTexCoordBufferRefVar = cubeObject.vertexTexCoordBuffer;
				cubeObject.vertexTexCoordBuffer = false;
			};

			cubeObject.createPixelsTex = App.tools.createPixelsTex;

			cubeObject.activateTex = () => {
				cubeObject.vertexTexCoordBuffer = cubeObject.vertexTexCoordBufferRefVar;
			};

			cubeObject.textures = [];
			cubeObject.custom = new Object();
			cubeObject.custom.gl_texture = null;

			if(typeof texturesPaths !== 'undefined') {
				if(typeof texturesPaths == 'string') {
					cubeObject.texture = this.initTexture(this.GL.gl, texturesPaths);
					cubeObject.textures.push(cubeObject.texture);
				} else if(typeof texturesPaths == 'object') {
					cubeObject.textures = [];
					cubeObject.texture = true;

					if(typeof texturesPaths.params === 'undefined') {
						cubeObject.texParams = {
							MIPMAP: false, // custom
							ANISOTROPY: false, // custom
							TEXTURE_WRAP_S: this.GL.gl.REPEAT,
							TEXTURE_WRAP_T: this.GL.gl.REPEAT,
							TEXTURE_MAG_FILTER: this.GL.gl.LINEAR, // NEAREST
							TEXTURE_MIN_FILTER: this.GL.gl.LINEAR
						};
					} else {
						cubeObject.texParams = texturesPaths.params;
					}
					RegenerateShader(filler + '-shader-fs', texturesPaths.source.length, texturesPaths.mix_operation, 'opengles');
					// eslint-disable-next-line no-redeclare
					for(var t = 0;t < texturesPaths.source.length;++t) {
						cubeObject.textures.push(this.initTexture(this.GL.gl, texturesPaths.source[t]));
					}
					cubeObject.shaderProgram = this.initShaders(this.GL.gl, filler + '-shader-fs', filler + '-shader-vs');
				} else {
					console.warn("Exec add obj : cubeObject wrong texturePaths!");
				}
			} else {
				// no textures , use default single textures
				cubeObject.texture = this.initTexture(this.GL.gl, 'res/images/texture_spiral1.png');
				cubeObject.textures.push(cubeObject.texture);
				cubeObject.texture = true;
				cubeObject.shaderProgram = this.initShaders(this.GL.gl, filler + '-shader-fs', filler + '-shader-vs');
			}

			cubeObject.changeMaterial = function(texturesPaths) {
				RegenerateShader(this.type + '-shader-fs', texturesPaths.source.length, texturesPaths.mix_operation, 'opengles');
				for(var t = 0;t < texturesPaths.source.length;++t) {
					this.textures.push(world.initTexture(world.GL.gl, texturesPaths.source[t]));
				}
				this.shaderProgram = world.initShaders(world.GL.gl, this.type + '-shader-fs', this.type + '-shader-vs');
			};
			cubeObject.mvMatrix = mat4.create();
			cubeObject.LightMap = new GeoOfColor('cube light');
			cubeObject.geometry = new CubeVertex(cubeObject);
			cubeObject.geometry.nameUniq = nameUniq;

			cubeObject.instancedDraws = {
				numberOfInstance: 10,
				array_of_local_offset: [12, 0, 0],
				overrideDrawArraysInstance: function(object_) {}
			};

			//draws params
			cubeObject.glBlend = new _glBlend();
			if(cubeObject.shaderProgram) {
				// console.log("   Buffer the " + filler + ":Store at:" + this.contentList.length);
				this.bufferCube(cubeObject);
				cubeObject.glDrawElements = new _DrawElements(cubeObject.vertexIndexBuffer.numItems);
				this.contentList[this.contentList.length] = cubeObject;
				App.scene[cubeObject.name] = cubeObject;
			} else {
				console.warn('Cube shader failure');
			}
		}

		if('cubeMap' == filler || 'cubeMapTex' == filler) {
			// eslint-disable-next-line no-redeclare
			var cubeObject = new Object();
			cubeObject.visible = true;
			if(typeof nameUniq != 'undefined') {
				cubeObject.name = nameUniq;
			} else {
				cubeObject.name = 'cube_instance_' + Math.floor(Math.random() * 1000 + 1);
			}
			cubeObject.streamTextures = null;
			cubeObject.type = filler;
			cubeObject.position = new Position(0, 0, -5.0);
			// update
			cubeObject.position.nameUniq = nameUniq;
			cubeObject.position.netObjId = nameUniq;
			cubeObject.size = size;
			cubeObject.sides = 12;
			cubeObject.rotation = new RotationVector(0, 1, 0);
			cubeObject.rotation.nameUniq = nameUniq;
			cubeObject.rotation.netObjId = nameUniq;

			//lights
			cubeObject.LightsData = {
				directionLight: new COLOR(1, 1, 1),
				ambientLight: new COLOR(1, 1, 1),
				lightingDirection: new COLOR(radToDeg(0.3), radToDeg(-0.3), radToDeg(-1))
			};

			// destroy self  MAy need more improve
			cubeObject.selfDestroy = (after) => {
				if(after) {
					setTimeout(() => {
						// destroy me
						var TEST = world.contentList[world.contentList.indexOf(cubeObject)];
						if(typeof TEST != 'undefined' && typeof App.scene[TEST.name] != 'undefined' && App.scene[TEST.name] != null) {
							let objForDelete = world.contentList.splice(world.contentList.indexOf(cubeObject), 1)[0];
							App.scene[objForDelete.name] = null;
						}
					}, after);
				} else {
					let objForDelete = world.contentList.splice(world.contentList.indexOf(cubeObject), 1)[0];
					App.scene[objForDelete.name] = null;
				}
			};

			cubeObject.raycast = {
				enabled: true
			};

			// Physics
			cubeObject.physics = {
				enabled: false
			};

			cubeObject.net = {
				enabled: false,
				activate: () => {
					net.activateDataStream();
				}
			};

			// Update others start NOT ACTIVE NOW
			// Calling with no error
			cubeObject.useShadows = false;
			cubeObject.activateShadows = (t) => {
				// Update others end
				if(typeof t === 'undefined' || t == 'spot') {
					t = 'spot';
					cubeObject.useShadows = true;
					cubeObject.shadows = new MatrixShadowSpot();
				} else if(t == 'specular') {
					cubeObject.useShadows = true;
					cubeObject.shadows = new MatrixShadowSpecular();
				} else if(t == 'lens') {
					cubeObject.useShadows = true;
					cubeObject.shadows = new MatrixEffectLens();
				} else if(t == 'spot-shadow') {
					cubeObject.useShadows = true;
					cubeObject.shadows = new MatrixShadowSpotShadowTest();
				}
				RegenerateCubeMapShader(filler + '-shader-fs', texturesPaths.source.length, texturesPaths.mix_operation, t);
				cubeObject.shaderProgram = this.initShaders(this.GL.gl, filler + '-shader-fs', filler + '-shader-vs');
			};

			cubeObject.deactivateTex = () => {
				cubeObject.vertexTexCoordBufferRefVar = cubeObject.vertexTexCoordBuffer;
				cubeObject.vertexTexCoordBuffer = false;
			};

			cubeObject.createPixelsTex = App.tools.createPixelsTex;

			cubeObject.activateTex = () => {
				cubeObject.vertexTexCoordBuffer = cubeObject.vertexTexCoordBufferRefVar;
			};
			cubeObject.textures = [];
			cubeObject.custom = new Object();
			cubeObject.custom.gl_texture = null;

			if(typeof texturesPaths !== 'undefined') {
				if(typeof texturesPaths == 'string') {
					console.log('tex path is string... use it...');
					cubeObject.texture = this.initTexture(this.GL.gl, texturesPaths);
					cubeObject.textures.push(cubeObject.texture);
				} else if(typeof texturesPaths == 'object') {
					cubeObject.textures = [];
					cubeObject.texture = true;
					if(App.openglesShaderVersion == 1.3) {
						RegenerateCubeMapShader(filler + '-shader-fs', texturesPaths.source.length, texturesPaths.mix_operation, 'spot');
					} else {
						RegenerateCubeMapShader(filler + '-shader-fs', texturesPaths.source.length, texturesPaths.mix_operation);
					}
					cubeObject.shaderProgram = this.initShaders(this.GL.gl, filler + '-shader-fs', filler + '-shader-vs');
				} else {
					// console.warn(" error in texturesPaths arg ...");
				}
			} else {
				// no textures , use default single textures
				console.warn('Filter type : cubeMap not loaded!  Default texture used!');
				cubeObject.texture = this.initTexture(this.GL.gl, 'res/images/texture_spiral1.png');
				cubeObject.textures.push(cubeObject.texture);
				cubeObject.texture = true;
				cubeObject.shaderProgram = this.initShaders(this.GL.gl, filler + '-shader-fs', filler + '-shader-vs');
			}

			cubeObject.changeMaterial = function(texturesPaths) {
				RegenerateShader(this.type + '-shader-fs', texturesPaths.source.length, texturesPaths.mix_operation);
				for(var t = 0;t < texturesPaths.source.length;++t) {
					this.textures.push(world.initTexture(world.GL.gl, texturesPaths.source[t]));
				}
				this.shaderProgram = world.initShaders(world.GL.gl, this.type + '-shader-fs', this.type + '-shader-vs');
			};
			cubeObject.mvMatrix = mat4.create();
			cubeObject.LightMap = new GeoOfColor('cube light');
			cubeObject.geometry = new CubeVertex(cubeObject);
			cubeObject.geometry.nameUniq = nameUniq;

			cubeObject.instancedDraws = {
				numberOfInstance: 10,
				array_of_local_offset: [12, 0, 0],
				overrideDrawArraysInstance: function(object_) {}
			};

			cubeObject.glBlend = new _glBlend();

			if(cubeObject.shaderProgram) {
				// Only cubeMap2dCanvasSet - Get A 2D context
				/** @type {Canvas2DRenderingContext} */
				var T = document.createElement('canvas');
				T.id = cubeObject.name + '_cubeMap';
				document.body.append(T);

				cubeObject.cubeMap = {};
				cubeObject.cubeMap.drawFunc = texturesPaths.cubeMap.drawFunc || null;
				cubeObject.cubeMap.cubeMap2dCtx = T.getContext('2d');
				cubeObject.cubeMap.cubeMap2dCtx.canvas.width = 512;
				cubeObject.cubeMap.cubeMap2dCtx.canvas.height = 512;

				if(texturesPaths.cubeMap) {
					cubeObject.cubeMap.type = texturesPaths.cubeMap.type;
					if(texturesPaths.cubeMap.type == '2dcanvas') {
						cubeObject.cubeMap.cubeMap2dCanvasSet = [
							{target: this.GL.gl.TEXTURE_CUBE_MAP_POSITIVE_X},
							{target: this.GL.gl.TEXTURE_CUBE_MAP_NEGATIVE_X},
							{target: this.GL.gl.TEXTURE_CUBE_MAP_POSITIVE_Y},
							{target: this.GL.gl.TEXTURE_CUBE_MAP_NEGATIVE_Y},
							{target: this.GL.gl.TEXTURE_CUBE_MAP_POSITIVE_Z},
							{target: this.GL.gl.TEXTURE_CUBE_MAP_NEGATIVE_Z}
						];
						texturesPaths.cubeMap.sides.forEach((side, index) => {
							for(let key in side) {
								cubeObject.cubeMap.cubeMap2dCanvasSet[index][key] = side[key];
							}
						});
						cubeObject.cubeMap.images = texturesPaths.source;
					} else if(texturesPaths.cubeMap.type == 'images') {
						cubeObject.cubeMap.cubeMap2dCanvasSet = [
							{target: this.GL.gl.TEXTURE_CUBE_MAP_POSITIVE_X},
							{target: this.GL.gl.TEXTURE_CUBE_MAP_NEGATIVE_X},
							{target: this.GL.gl.TEXTURE_CUBE_MAP_POSITIVE_Y},
							{target: this.GL.gl.TEXTURE_CUBE_MAP_NEGATIVE_Y},
							{target: this.GL.gl.TEXTURE_CUBE_MAP_POSITIVE_Z},
							{target: this.GL.gl.TEXTURE_CUBE_MAP_NEGATIVE_Z}
						];
						cubeObject.cubeMap.images = texturesPaths.source;
					}
				} else {
					// default
					cubeObject.cubeMap.cubeMap2dCanvasSet = [
						{target: this.GL.gl.TEXTURE_CUBE_MAP_POSITIVE_X, faceColor: '#F00', textColor: '#0FF', text: 'm'},
						{target: this.GL.gl.TEXTURE_CUBE_MAP_NEGATIVE_X, faceColor: '#FF0', textColor: '#00F', text: 'a'},
						{target: this.GL.gl.TEXTURE_CUBE_MAP_POSITIVE_Y, faceColor: '#0F0', textColor: '#F0F', text: 't'},
						{target: this.GL.gl.TEXTURE_CUBE_MAP_NEGATIVE_Y, faceColor: '#0FF', textColor: '#F00', text: 'r'},
						{target: this.GL.gl.TEXTURE_CUBE_MAP_POSITIVE_Z, faceColor: '#00F', textColor: '#FF0', text: 'i'},
						{target: this.GL.gl.TEXTURE_CUBE_MAP_NEGATIVE_Z, faceColor: '#F0F', textColor: '#0F0', text: 'x'}
					];
				}

				this.bufferCubeMap(cubeObject);

				cubeObject.glDrawElements = new _DrawElements(cubeObject.vertexIndexBuffer.numItems);
				this.contentList[this.contentList.length] = cubeObject;
				App.scene[cubeObject.name] = cubeObject;
			} else {
				console.warn('Cube shader failure!');
			}
		}

		// No physics for now - no networking for now!
		if('generatorTex' == filler || 'generatorLightTex' == filler) {
			var customObject = new Object();
			customObject.visible = true;
			if(typeof nameUniq != 'undefined') {
				customObject.name = nameUniq;
			} else {
				customObject.name = 'customObject_instance_' + Math.floor(Math.random() * 100000 + 1);
			}
			customObject.streamTextures = null;
			customObject.type = filler;
			customObject.position = new Position(0, 0, -5.0);
			customObject.position.nameUniq = nameUniq;
			customObject.position.netObjId = nameUniq;
			customObject.size = size;
			customObject.sides = 12;
			customObject.rotation = new RotationVector(0, 1, 0);
			customObject.rotation.nameUniq = nameUniq;
			customObject.rotation.netObjId = nameUniq;

			// destroy self  MAy need more improve
			customObject.selfDestroy = (after) => {
				if(after) {
					setTimeout(() => {
						// destroy me
						var TEST = world.contentList[world.contentList.indexOf(customObject)];
						if(typeof TEST != 'undefined' && typeof App.scene[TEST.name] != 'undefined' && App.scene[TEST.name] != null) {
							let objForDelete = world.contentList.splice(world.contentList.indexOf(customObject), 1)[0];
							App.scene[objForDelete.name] = null;
						}
					}, after);
				} else {
					let objForDelete = world.contentList.splice(world.contentList.indexOf(customObject), 1)[0];
					App.scene[objForDelete.name] = null;
				}
			};

			//lights
			customObject.LightsData = {
				directionLight: new COLOR(1, 1, 1),
				ambientLight: new COLOR(1, 1, 1),
				lightingDirection: new COLOR(1, 1, 0)
			};

			// Physics
			customObject.physics = {
				enabled: false
			};

			customObject.instancedDraws = {
				numberOfInstance: 10,
				array_of_local_offset: [12, 0, 0],
				overrideDrawArraysInstance: function(object_) {}
			};

			customObject.textures = [];
			if(typeof texturesPaths !== 'undefined') {
				if(typeof texturesPaths == 'string') {
					customObject.texture = this.initTexture(this.GL.gl, texturesPaths);
					customObject.textures.push(customObject.texture);
				} else if(typeof texturesPaths == 'object') {
					customObject.textures = [];
					customObject.texture = true;
					RegenerateShader('sphereLightTex' + '-shader-fs', texturesPaths.source.length, texturesPaths.mix_operation, 'opengles');
					for(var t = 0;t < texturesPaths.source.length;++t) {
						customObject.textures.push(this.initTexture(this.GL.gl, texturesPaths.source[t]));
					}
					customObject.shaderProgram = this.initShaders(this.GL.gl, 'sphereLightTex' + '-shader-fs', 'sphereLightTex' + '-shader-vs'); //hard code
				} else {
					alert('Exec add obj : texturePaths : path is unknow typeof');
				}
			} else {
				// no textures, use default single textures
				customObject.texture = this.initTexture(this.GL.gl, 'res/images/texture_spiral1.png');
				customObject.textures.push(customObject.texture);
				customObject.texture = true;
				customObject.shaderProgram = this.initShaders(this.GL.gl, 'sphereLightTex' + '-shader-fs', 'sphereLightTex' + '-shader-vs');
			}

			customObject.changeMaterial = function(texturesPaths) {
				RegenerateShader('sphereLightTex' + '-shader-fs', texturesPaths.source.length, texturesPaths.mix_operation);
				for(var t = 0;t < texturesPaths.source.length;++t) {
					this.textures.push(world.initTexture(world.GL.gl, texturesPaths.source[t]));
				}
				this.shaderProgram = world.initShaders(world.GL.gl, 'sphereLightTex' + '-shader-fs', 'sphereLightTex' + '-shader-vs');
			};

			customObject.mvMatrix = mat4.create();
			customObject.LightMap = undefined;
			if(typeof mesh_ !== 'undefined') {
				customObject.latitudeBands = mesh_.latitudeBands;
				customObject.longitudeBands = mesh_.longitudeBands;
				customObject.radius = mesh_.radius;
				customObject.custom_type = mesh_.custom_type;
				// torus
				if(mesh_.custom_type == 'torus') {
					customObject.slices = mesh_.slices;
					customObject.loops = mesh_.loops;
					customObject.inner_rad = mesh_.inner_rad;
					customObject.outerRad = mesh_.outerRad;
				}
			} else {
				customObject.latitudeBands = 30;
				customObject.longitudeBands = 30;
				customObject.radius = 2;
				customObject.custom_type = 'torus'
				// torus is default
				customObject.slices = 8;
				customObject.loops = 20;
				customObject.inner_rad = 0.5;
				customObject.outerRad = 2;
			}

			customObject.geometry = new customVertex(customObject);
			//draws params
			customObject.glBlend = new _glBlend();
			if(customObject.shaderProgram) {
				// console.log("Buffer the " + filler + ":Store at:" + this.contentList.length);
				this.bufferSphere(customObject);
				customObject.glDrawElements = new _DrawElements(customObject.vertexIndexBuffer.numItems);
				this.contentList[this.contentList.length] = customObject;
				App.scene[customObject.name] = customObject;
			} else {
				console.log("   customObject shader failure");
			}
		}
	};

	world.callReDraw = reDraw;
	world.destroy = App.operation.destroyWorld;
	return world;
}