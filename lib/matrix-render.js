import App from '../program/manifest';
import {world} from './matrix-world';
import {looper, modifyLooper, updateFPS, lastTime, degToRad} from './engine';
import * as raycaster from './raycast';
import {E, radToDeg} from './utility';

export var animate = function(sceneObject) {
	var timeNow = new Date().getTime();
	if(lastTime != 0) {
		var elapsed = timeNow - lastTime;
		if(sceneObject.rotation.rotationSpeed.emit == false) {
			sceneObject.rotation.rotx += (sceneObject.rotation.rotSpeedX * elapsed) / 1000.0;
			sceneObject.rotation.roty += (sceneObject.rotation.rotSpeedY * elapsed) / 1000.0;
			sceneObject.rotation.rotz += (sceneObject.rotation.rotSpeedZ * elapsed) / 1000.0;
		} else {
			sceneObject.rotation.rotateX(sceneObject.rotation.rotx + sceneObject.rotation.rotSpeedX * elapsed / 1000.0);
			sceneObject.rotation.rotateY(sceneObject.rotation.roty + sceneObject.rotation.rotSpeedY * elapsed / 1000.0);
			sceneObject.rotation.rotateZ(sceneObject.rotation.rotz + sceneObject.rotation.rotSpeedZ * elapsed / 1000.0);
		}
		sceneObject.position.update();
	}
};

export var reDrawID = 0;
var secondPass = 0;
var physicsLooper = 0, lt = 0;

App.operation.reDrawGlobal = function(time) {
	modifyLooper(0);
	if(App.offScreenCanvas == false) reDrawID = requestAnimationFrame(App.operation.reDrawGlobal);

	world.renderPerspective();

	for(var t = 0;t < App.updateBeforeDraw.length;t++) {App.updateBeforeDraw[t].UPDATE()}

	// Physics [cannonjs-matrix engine implementation]
	if(world.physics !== null) {
		var dt = (time - lt) / 1000;
		world.physics.world.step((1.0 / 60.0), dt, 3);
		lt = time;
		while(physicsLooper <= world.contentList.length - 1) {
			if(world.contentList[physicsLooper].physics.enabled) {
				var local = world.contentList[physicsLooper];
				if(local.physics.currentBody.shapeOrientations.length == 1) {
					if(local.position.x.toFixed(2) == local.physics.currentBody.position.x.toFixed(2) &&
					   local.position.phySleepOn2digits == true) {
						// console.log(' TEST SLEEP RENDER local.position.x', local.position.x.toFixed(2), " VS ", local.physics.currentBody.position.x.toFixed(2))
					} else {
						local.position.SetX(local.physics.currentBody.position.x)
						local.position.SetZ(local.physics.currentBody.position.y)
						local.position.SetY(local.physics.currentBody.position.z)
					}

					if(world.contentList[physicsLooper].custom_type &&
						world.contentList[physicsLooper].custom_type == 'torus') {
						// [NOT PERFECT]
						world.contentList[physicsLooper].rotation.rotx = 90 + radToDeg(local.physics.currentBody.quaternion.toAxisAngle()[1]);
						world.contentList[physicsLooper].rotation.roty = radToDeg(local.physics.currentBody.quaternion.toAxisAngle()[1]);
						world.contentList[physicsLooper].rotation.rotz = radToDeg(local.physics.currentBody.quaternion.toAxisAngle()[1]);

						var axisAngle = local.physics.currentBody.quaternion.toAxisAngle()[1];
						world.contentList[physicsLooper].rotation.angle = axisAngle;
						world.contentList[physicsLooper].rotation.axisSystem = local.physics.currentBody.quaternion.toAxisAngle();
						world.contentList[physicsLooper].rotation.axis.x = parseFloat(local.physics.currentBody.quaternion.toAxisAngle()[0].x.toFixed(2));
						world.contentList[physicsLooper].rotation.axis.z = parseFloat(local.physics.currentBody.quaternion.toAxisAngle()[0].y.toFixed(2));
						world.contentList[physicsLooper].rotation.axis.y = parseFloat(local.physics.currentBody.quaternion.toAxisAngle()[0].z.toFixed(2));

					} else {
						var axisAngle = local.physics.currentBody.quaternion.toAxisAngle()[1];
						world.contentList[physicsLooper].rotation.angle = axisAngle;
						world.contentList[physicsLooper].rotation.axisSystem = local.physics.currentBody.quaternion.toAxisAngle();
						world.contentList[physicsLooper].rotation.axis.x = parseFloat(local.physics.currentBody.quaternion.toAxisAngle()[0].x.toFixed(2));
						world.contentList[physicsLooper].rotation.axis.y = parseFloat(local.physics.currentBody.quaternion.toAxisAngle()[0].y.toFixed(2));
						world.contentList[physicsLooper].rotation.axis.z = parseFloat(local.physics.currentBody.quaternion.toAxisAngle()[0].z.toFixed(2));
					}

				} else if(local.physics.currentBody.shapeOrientations.length > 1) {
					// subObjs
					if(local.subObjs) for(var x = 0;x < local.subObjs.length;x++) {
						local.subObjs[x].position.SetX(local.physics.currentBody.shapeOffsets[x].x)
						local.subObjs[x].position.SetZ(local.physics.currentBody.shapeOffsets[x].y)
						local.subObjs[x].position.SetY(local.physics.currentBody.shapeOffsets[x].z)
						if(local.physics.currentBody.quaternion.x != 0) local.subObjs[x].rotation.rotx = radToDeg(local.physics.currentBody.shapeOrientations[x].toAxisAngle()[1]);
						if(local.physics.currentBody.quaternion.y != 0) local.subObjs[x].rotation.roty = radToDeg(local.physics.currentBody.shapeOrientations[x].toAxisAngle()[1]);
						if(local.physics.currentBody.quaternion.z != 0) local.subObjs[x].rotation.rotz = radToDeg(local.physics.currentBody.shapeOrientations[x].toAxisAngle()[1]);
					}
				}
			}
			physicsLooper++;
		}
	}

	// reset to zero
	physicsLooper = 0;

	// Must be override for performance 
	// - non FBO and FBO option draw coroutine

	// hc 512x512
	// Important camera setup must be in the first place in exe order!
	// Before FB bind
	if(world.FBOS.length > 0) {
		matrixEngine.Events.camera.pitchMemo = matrixEngine.Events.camera.pitch;
		matrixEngine.Events.camera.yawMemo = matrixEngine.Events.camera.yaw;
		matrixEngine.Events.camera.xPosMemo = matrixEngine.Events.camera.xPos;
		matrixEngine.Events.camera.zPosMemo = matrixEngine.Events.camera.zPos;
		matrixEngine.Events.camera.yPosMemo = matrixEngine.Events.camera.yPos;
	}

	// Multi FB
	for(var fbindex = 0;fbindex < world.FBOS.length;fbindex++) {
		// save samera pos
		matrixEngine.Events.camera.xPos = world.FBOS[fbindex].settings.cameraX;
		matrixEngine.Events.camera.yPos = world.FBOS[fbindex].settings.cameraY;
		matrixEngine.Events.camera.zPos = world.FBOS[fbindex].settings.cameraZ;
		matrixEngine.Events.camera.pitch = world.FBOS[fbindex].settings.pitch;
		matrixEngine.Events.camera.yaw = world.FBOS[fbindex].settings.yaw;

		world.GL.gl.bindFramebuffer(world.GL.gl.FRAMEBUFFER, world.FBOS[fbindex].FB);

		world.GL.gl.viewport(0, 0, App.frameBufferViewPort[0], App.frameBufferViewPort[1]);
		world.GL.gl.clearColor(App.frameBufferBgColor.r, App.frameBufferBgColor.g, App.frameBufferBgColor.b,
			App.frameBufferBgColor.a);
		world.GL.gl.clear(world.GL.gl.COLOR_BUFFER_BIT | world.GL.gl.DEPTH_BUFFER_BIT);

		world.GL.gl.enable(world.GL.gl.DEPTH_TEST);
		// test
		world.GL.gl.enable(world.GL.gl.CULL_FACE);
		world.GL.gl.disable(world.GL.gl.BLEND);
		world.GL.gl.depthMask(true);

		// - draw all `non fbo` and `no blend`
		while(looper <= world.contentList.length - 1) {
			// console.log(world.FBOS[fbindex].name == world.contentList[looper].name)
			if(world.contentList[looper].visible === true &&
				!(world.FBOS[fbindex].name == world.contentList[looper].name) &&
				world.contentList[looper].glBlend.blendEnabled == false) {
				if('triangle' == world.contentList[looper].type) {
					world.GL.gl.useProgram(world.contentList[looper].shaderProgram);
					world.drawTriangle(world.contentList[looper], 'noray');
				} else if('square' == world.contentList[looper].type) {
					world.GL.gl.useProgram(world.contentList[looper].shaderProgram);
					world.drawSquare(world.contentList[looper], 'noray');
				} else if('cube' == world.contentList[looper].type ||
					'cubeTex' == world.contentList[looper].type ||
					'cubeLightTex' == world.contentList[looper].type ||
					'cubeMap' == world.contentList[looper].type) {
					world.GL.gl.useProgram(world.contentList[looper].shaderProgram);

					if(world.contentList[looper].shadows &&
						world.contentList[looper].shadows.type == "spot-shadow" &&
						world.FBOS[fbindex].name == world.contentList[looper].name) {
						console.log('PREVENT OVERRIDE FBO DRAWING....')
					} else {
						world.drawCube(world.contentList[looper], 'noray');
					}
				} else if(world.contentList[looper].type.indexOf("custom-") != -1) {
					// interest part - frst time draw func taken from object inself not from world.
					// Looks like better solution.
					world.GL.gl.useProgram(world.contentList[looper].shaderProgram);
					world.contentList[looper].drawCustom(world.contentList[looper]);
					world.animate(world.contentList[looper]);

					//
				} else if('pyramid' == world.contentList[looper].type) {
					world.GL.gl.useProgram(world.contentList[looper].shaderProgram);
					world.drawPyramid(world.contentList[looper], 'noray');
				} else if('obj' == world.contentList[looper].type) {
					world.GL.gl.useProgram(world.contentList[looper].shaderProgram);
					world.drawObj(world.contentList[looper], 'noray');
				} else if('squareTex' == world.contentList[looper].type) {
					world.GL.gl.useProgram(world.contentList[looper].shaderProgram);
					world.drawSquareTex(world.contentList[looper], 'noray');
				} else if('sphereLightTex' == world.contentList[looper].type || 'sphere' == world.contentList[looper].type || 'generatorLightTex' == world.contentList[looper].type) {
					world.GL.gl.useProgram(world.contentList[looper].shaderProgram);
					world.drawSphere(world.contentList[looper], 'noray');
				}
			}
			modifyLooper(looper + 1);
		}
		modifyLooper(0);

		// maybe no need here
		world.GL.gl.enable(world.GL.gl.BLEND);
		world.GL.gl.depthMask(false);

		// all non FBO but blended
		while(looper <= world.contentList.length - 1) {
			if(world.contentList[looper].visible === true &&
				!world.contentList[looper].FBO &&
				world.contentList[looper].glBlend.blendEnabled == true) {
				if('triangle' == world.contentList[looper].type) {
					world.GL.gl.useProgram(world.contentList[looper].shaderProgram);
					world.drawTriangle(world.contentList[looper], 'noray')
				} else if('square' == world.contentList[looper].type) {
					world.GL.gl.useProgram(world.contentList[looper].shaderProgram);
					world.drawSquare(world.contentList[looper], 'noray')
				} else if('cube' == world.contentList[looper].type ||
					'cubeTex' == world.contentList[looper].type ||
					'cubeLightTex' == world.contentList[looper].type ||
					'cubeMap' == world.contentList[looper].type) {
					world.GL.gl.useProgram(world.contentList[looper].shaderProgram);
					world.drawCube(world.contentList[looper], 'noray');
				} else if(world.contentList[looper].type.indexOf("custom-") != -1) {
					// interest part - frst time draw func taken from object inself not from world.
					// Looks like better solution.
					world.GL.gl.useProgram(world.contentList[looper].shaderProgram);
					world.contentList[looper].drawCustom(world.contentList[looper]);
					world.animate(world.contentList[looper]);
					//
				} else if('pyramid' == world.contentList[looper].type) {
					world.GL.gl.useProgram(world.contentList[looper].shaderProgram);
					world.drawPyramid(world.contentList[looper], 'noray')
				} else if('obj' == world.contentList[looper].type) {
					world.GL.gl.useProgram(world.contentList[looper].shaderProgram);
					world.drawObj(world.contentList[looper], 'noray')
				} else if('squareTex' == world.contentList[looper].type) {
					world.GL.gl.useProgram(world.contentList[looper].shaderProgram);
					world.drawSquareTex(world.contentList[looper]), 'noray';
				} else if('sphereLighstTex' == world.contentList[looper].type || 'sphere' == world.contentList[looper].type || 'generatorLightTex' == world.contentList[looper].type) {
					world.GL.gl.useProgram(world.contentList[looper].shaderProgram);
					world.drawSphere(world.contentList[looper], 'noray');
				}
			}
			modifyLooper(looper + 1);
		}

		modifyLooper(0);

		world.GL.gl.depthMask(true);

		// Back to drawing on the main color buffer!
		world.GL.gl.bindFramebuffer(world.GL.gl.FRAMEBUFFER, null);
		// Multi FBO camera view works but obj seq speed up - probably becouse OSC !! must be fixed

		// Reset camera
		if(typeof world.FBOS[fbindex] !== 'undefined') {
			matrixEngine.Events.camera.zPos = matrixEngine.Events.camera.zPosMemo;
			matrixEngine.Events.camera.xPos = matrixEngine.Events.camera.xPosMemo;
			matrixEngine.Events.camera.yPos = matrixEngine.Events.camera.yPosMemo;
			matrixEngine.Events.camera.pitch = matrixEngine.Events.camera.pitchMemo;
			matrixEngine.Events.camera.yaw = matrixEngine.Events.camera.yawMemo;
		}
	}

	world.GL.gl.viewport(0, 0, world.GL.gl.canvas.width, world.GL.gl.canvas.height);
	world.GL.gl.clearColor(0.0, 0.0, 0.0, 1.0);
	world.GL.gl.clear(world.GL.gl.COLOR_BUFFER_BIT | world.GL.gl.DEPTH_BUFFER_BIT);

	// Draw again all
	world.GL.gl.enable(world.GL.gl.DEPTH_TEST);
	world.GL.gl.disable(world.GL.gl.BLEND);
	world.GL.gl.disable(world.GL.gl.CULL_FACE);
	world.GL.gl.depthMask(true);

	// All but no blend
	while(looper <= world.contentList.length - 1) {
		if(world.contentList[looper].visible === true &&
			world.contentList[looper].glBlend.blendEnabled == false) {
			if('triangle' == world.contentList[looper].type) {
				world.GL.gl.useProgram(world.contentList[looper].shaderProgram);
				world.drawTriangle(world.contentList[looper]);
				world.animate(world.contentList[looper]);
			} else if('square' == world.contentList[looper].type) {
				world.GL.gl.useProgram(world.contentList[looper].shaderProgram);
				world.drawSquare(world.contentList[looper]);
				world.animate(world.contentList[looper]);
			} else if('cube' == world.contentList[looper].type ||
				'cubeTex' == world.contentList[looper].type ||
				'cubeLightTex' == world.contentList[looper].type ||
				'cubeMap' == world.contentList[looper].type) {
				world.GL.gl.useProgram(world.contentList[looper].shaderProgram);
				world.drawCube(world.contentList[looper]);
				world.animate(world.contentList[looper]);

			} else if(world.contentList[looper].type.indexOf("custom-") != -1) {
				// interest part - frst time draw func taken from object inself not from world.
				// Looks like better solution.
				world.GL.gl.useProgram(world.contentList[looper].shaderProgram);
				world.contentList[looper].drawCustom(world.contentList[looper]);
				world.animate(world.contentList[looper]);
				//
			} else if('pyramid' == world.contentList[looper].type) {
				world.GL.gl.useProgram(world.contentList[looper].shaderProgram);
				world.drawPyramid(world.contentList[looper]);
				world.animate(world.contentList[looper]);
			} else if('obj' == world.contentList[looper].type) {
				world.GL.gl.useProgram(world.contentList[looper].shaderProgram);
				world.drawObj(world.contentList[looper]);
				world.animate(world.contentList[looper]);
			} else if('squareTex' == world.contentList[looper].type) {
				world.GL.gl.useProgram(world.contentList[looper].shaderProgram);
				world.drawSquareTex(world.contentList[looper]);
				world.animate(world.contentList[looper]);
			} else if('sphereLightTex' == world.contentList[looper].type || 'sphere' == world.contentList[looper].type || 'generatorLightTex' == world.contentList[looper].type) {
				world.GL.gl.useProgram(world.contentList[looper].shaderProgram);
				world.drawSphere(world.contentList[looper]);
				world.animate(world.contentList[looper]);
			}
		}
		modifyLooper(looper + 1);
	}

	world.GL.gl.enable(world.GL.gl.BLEND);
	world.GL.gl.depthMask(false);
	modifyLooper(0);

	// all but blend
	while(looper <= world.contentList.length - 1) {
		if(world.contentList[looper].visible === true &&
			world.contentList[looper].glBlend.blendEnabled == true) {
			if('triangle' == world.contentList[looper].type) {
				world.GL.gl.useProgram(world.contentList[looper].shaderProgram);
				world.drawTriangle(world.contentList[looper]);
				world.animate(world.contentList[looper]);
			} else if('square' == world.contentList[looper].type) {
				world.GL.gl.useProgram(world.contentList[looper].shaderProgram);
				world.drawSquare(world.contentList[looper]);
				world.animate(world.contentList[looper]);
			} else if('cube' == world.contentList[looper].type ||
				'cubeTex' == world.contentList[looper].type ||
				'cubeLightTex' == world.contentList[looper].type ||
				'cubeMap' == world.contentList[looper].type) {
				world.GL.gl.useProgram(world.contentList[looper].shaderProgram);
				world.drawCube(world.contentList[looper]);
				world.animate(world.contentList[looper]);
			} else if(world.contentList[looper].type.indexOf("custom-") != -1) {
				// interest part - frst time draw func taken from object inself not from world.
				// Looks like better solution.
				world.GL.gl.useProgram(world.contentList[looper].shaderProgram);
				world.contentList[looper].drawCustom(world.contentList[looper]);
				world.animate(world.contentList[looper]);
				//
			} else if('pyramid' == world.contentList[looper].type) {
				world.GL.gl.useProgram(world.contentList[looper].shaderProgram);
				world.drawPyramid(world.contentList[looper]);
				world.animate(world.contentList[looper]);
			} else if('obj' == world.contentList[looper].type) {
				world.GL.gl.useProgram(world.contentList[looper].shaderProgram);
				world.drawObj(world.contentList[looper]);
				world.animate(world.contentList[looper]);
			} else if('squareTex' == world.contentList[looper].type) {
				world.GL.gl.useProgram(world.contentList[looper].shaderProgram);
				world.drawSquareTex(world.contentList[looper]);
				world.animate(world.contentList[looper]);
			} else if('sphereLightTex' == world.contentList[looper].type || 'sphere' == world.contentList[looper].type || 'generatorLightTex' == world.contentList[looper].type) {
				world.GL.gl.useProgram(world.contentList[looper].shaderProgram);
				world.drawSphere(world.contentList[looper]);
				world.animate(world.contentList[looper]);
			}
		}
		modifyLooper(looper + 1);
	}

	modifyLooper(0);
	world.GL.gl.depthMask(true);

	if(App.raycast) {
		if(secondPass <= 2) {
			raycaster.touchCoordinate.enabled = false;
			secondPass = 0;
		}
	}

	secondPass++;
	physicsLooper = 0;
	updateFPS(1);

	if(App.offScreenCanvas == true) reDrawID = setTimeout(() => App.operation.reDrawGlobal(), App.redrawInterval);
	if(world.animLine) {
		// animatinLine
		world.globalAnimCounter++;

		if(world.timeline.subCommands[world.globalAnimCounter]) {
			if(world.timeline.subCommands[world.globalAnimCounter].onlyForSeq == null ||
				world.timeline.subCommands[world.globalAnimCounter].onlyForSeq == world.globalAnimCurSequence
			) {
				console.log("[timeline]FRAMEID EXE");
				world.timeline.subCommands[world.globalAnimCounter].COMMAND();
			}
		}

		if(world.globalAnimCounter >= world.globalAnimSequenceSize) {
			world.globalAnimCounter = 0;
			console.log("world.timeline.commands ", world.timeline.commands);
			if(world.timeline.commands[world.globalAnimCurSequence]) {
				// auto call
				world.timeline.commands[world.globalAnimCurSequence]();
				console.log("TIMELINE SEQ START EXE");
			}
			// VALIDACIJA
			if(world.globalAnimCurSequence >= world.globalAnimTotalSequence) {
				// for now simple reset - we can add option for reverse playing ...
				world.globalAnimCurSequence = 0;
				console.log("TIMELINE TOTAL SEQ ");
				world.globalAnimPeriod++;
			}
			world.globalAnimCurSequence++;
			document.getElementById('globalAnimCurSequence').innerText = world.globalAnimCurSequence;
		}
		document.getElementById('globalAnimCounter').innerText = world.globalAnimCounter;
		document.getElementById('globalAnimPeriod').innerText = world.globalAnimPeriod;
		document.getElementById('timeline').value = world.globalAnimCounter;
	}

}

/* Field of view, Width height ratio, min distance of viewpoint, max distance of viewpoint, */
App.operation.CameraPerspective = function() {
	this.GL.gl.viewport(0, 0, canvas.width, canvas.height);
	this.GL.gl.clear(this.GL.gl.COLOR_BUFFER_BIT | this.GL.gl.DEPTH_BUFFER_BIT);
	mat4.perspective(this.pMatrix, degToRad(App.camera.viewAngle), this.GL.gl.viewportWidth / this.GL.gl.viewportHeight, App.camera.nearViewpoint, App.camera.farViewpoint);
}

App.operation.simplyRender = function(time) {
	modifyLooper(0);

	if(App.offScreenCanvas == false) reDrawID = requestAnimationFrame(App.operation.simplyRender);

	world.renderPerspective();

	for(var t = 0;t < App.updateBeforeDraw.length;t++) {
		App.updateBeforeDraw[t].UPDATE();
	}

	// Physics
	if(world.physics !== null) {
		var dt = (time - lt) / 1000;
		world.physics.world.step((1.0 / 60.0), dt, 3);
		lt = time;
		while(physicsLooper <= world.contentList.length - 1) {
			if(world.contentList[physicsLooper].physics.enabled) {
				var local = world.contentList[physicsLooper];

				local.position.SetX(local.physics.currentBody.position.x)
				local.position.SetZ(local.physics.currentBody.position.y)
				local.position.SetY(local.physics.currentBody.position.z)
				world.contentList[physicsLooper].rotation.rotx = radToDeg(local.physics.currentBody.quaternion.toAxisAngle()[1]);
				world.contentList[physicsLooper].rotation.roty = radToDeg(local.physics.currentBody.quaternion.toAxisAngle()[1]);
				world.contentList[physicsLooper].rotation.rotz = radToDeg(local.physics.currentBody.quaternion.toAxisAngle()[1]);
				// matrixEngine.matrixWorld.world.physics.toDeg
			}
			physicsLooper++;
		}
	}

	// reset to zero
	physicsLooper = 0;

	// Back to drawing on the main color buffer!
	// world.GL.gl.bindFramebuffer(world.GL.gl.FRAMEBUFFER, null);
	world.GL.gl.viewport(0, 0, world.GL.gl.canvas.width, world.GL.gl.canvas.height);
	// world.GL.gl.clearColor(0.0, 0.0, 0.0, 1.0);
	// world.GL.gl.clear(world.GL.gl.COLOR_BUFFER_BIT | world.GL.gl.DEPTH_BUFFER_BIT);

	// Draw again all
	world.GL.gl.enable(world.GL.gl.DEPTH_TEST);
	world.GL.gl.disable(world.GL.gl.BLEND);
	world.GL.gl.depthMask(true);

	while(looper <= world.contentList.length - 1) {
		if(world.contentList[looper].visible === true) {
			if('triangle' == world.contentList[looper].type) {
				world.GL.gl.useProgram(world.contentList[looper].shaderProgram);
				world.drawTriangle(world.contentList[looper]);
				world.animate(world.contentList[looper]);
			} else if('square' == world.contentList[looper].type) {
				world.GL.gl.useProgram(world.contentList[looper].shaderProgram);
				world.drawSquare(world.contentList[looper]);
				world.animate(world.contentList[looper]);
			} else if('cube' == world.contentList[looper].type ||
				'cubeTex' == world.contentList[looper].type ||
				'cubeLightTex' == world.contentList[looper].type ||
				'cubeMap' == world.contentList[looper].type) {
				world.GL.gl.useProgram(world.contentList[looper].shaderProgram);
				world.drawCube(world.contentList[looper]);
				world.animate(world.contentList[looper]);
			} else if('pyramid' == world.contentList[looper].type) {
				world.GL.gl.useProgram(world.contentList[looper].shaderProgram);
				world.drawPyramid(world.contentList[looper]);
				world.animate(world.contentList[looper]);
			} else if('obj' == world.contentList[looper].type) {
				world.GL.gl.useProgram(world.contentList[looper].shaderProgram);
				world.drawObj(world.contentList[looper]);
				world.animate(world.contentList[looper]);
			} else if('squareTex' == world.contentList[looper].type) {
				world.GL.gl.useProgram(world.contentList[looper].shaderProgram);
				world.drawSquareTex(world.contentList[looper]);
				world.animate(world.contentList[looper]);
			} else if('sphereLightTex' == world.contentList[looper].type || 'sphere' == world.contentList[looper].type || 'generatorLightTex' == world.contentList[looper].type) {
				world.GL.gl.useProgram(world.contentList[looper].shaderProgram);
				world.drawSphere(world.contentList[looper]);
				world.animate(world.contentList[looper]);
			}
		}
		modifyLooper(looper + 1);
	}

	world.GL.gl.enable(world.GL.gl.BLEND);
	world.GL.gl.depthMask(false);
	modifyLooper(0);

	world.GL.gl.depthMask(true);

	if(App.raycast) {
		if(secondPass <= 2) {
			raycaster.touchCoordinate.enabled = false;
			secondPass = 0;
		}
	}

	secondPass++;
	physicsLooper = 0;
	updateFPS(1);

	if(world.animLine) {
		// animatinLine
		world.globalAnimCounter++;
		if(world.globalAnimCounter >= world.globalAnimSequenceSize) {
			world.globalAnimCounter = 0;
			world.globalAnimCurSequence++;
			document.getElementById('globalAnimCurSequence').innerText = world.globalAnimCurSequence;
		}

		document.getElementById('globalAnimCounter').innerText = world.globalAnimCounter;
		document.getElementById('timeline').value = world.globalAnimCounter;
	}

	if(App.offScreenCanvas == true) reDrawID = setTimeout(() => App.operation.simplyRender(), App.redrawInterval);
}
