/* eslint-disable no-unused-vars */

/**
 * Main program file
 * GL World
 */

/* globals
           App
           world
           defineWebGLWorld
           canvas
           loadShaders
           Position
           GeoOfColor
           mat4
           TriangleVertex
           sphereVertex
           PiramideVertex
          _glBlend
          _DrawElements
          initiateFPS
          initShaders
          SquareVertex
          RotationVector
          animate
          reDraw
          COLOR
          RegenerateShader
          RegenerateCustomShader
          customVertex
          CubeVertex
          _glTexParameteri
          SYS
          callReDraw_
*/

/* Width and Height variables of the browser screen  */
var wd, ht;
/* For Frame rate                                    */
var lastTime = 0;
var frames = 0;
var totalTime = 0;
var updateTime = 0;
var updateFrames = 0;
/* Because JavaScript is third class in mouse events */
// var mouseLoc   = defineMouseLocationObject();
/* Common sense to object disposition                */
var objListToDispose = new Array();
/* Need to stop the redraw when disposing            */
var reDrawID = 0;
/* Need an iterator in many places                   */
var looper = 0;

function defineworld(cavnas) {

  console.log("  Define the world");
  window.world = new Object();
  /*  Constructor for a world                       */
  world.GL = new defineWebGLWorld(canvas);

  /*  Exit if WEBGL could not initialize            */
  if ("undefined" == typeof world.GL.gl) {
    console.log("  Exception in Base world creation");
    delete this.GL;
    delete this;
    return 0;
  } else {
    console.log("  Setting WEBGL base attributes");
    world.GL.gl.clearColor(0.0, 0.0, 0.0, 1.0);
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

  //********************************
  // get data about gl limitation
  // Must be improved
  //********************************
  App.limitations.maxTexturesInFragmentShader = world.GL.gl.getParameter(world.GL.gl.MAX_TEXTURE_IMAGE_UNITS);
  App.limitations.ALIASED_POINT_SIZE_RANGE = world.GL.gl.getParameter(world.GL.gl.ALIASED_POINT_SIZE_RANGE);
  App.limitations.DEPTH_BITS = world.GL.gl.getParameter(world.GL.gl.DEPTH_BITS);
  App.limitations.MAX_SAMPLES = world.GL.gl.getParameter(world.GL.gl.MAX_SAMPLES);
  App.limitations.MAX_TEXTURE_SIZE = world.GL.gl.getParameter(world.GL.gl.MAX_TEXTURE_SIZE);
  App.limitations.MAX_VERTEX_ATTRIBS = world.GL.gl.getParameter(world.GL.gl.MAX_VERTEX_ATTRIBS);
  App.limitations.MAX_ELEMENTS_VERTICES = world.GL.gl.getParameter(world.GL.gl.MAX_ELEMENTS_VERTICES);

  /*****************************************************/
  /*       World base functions                        */
  /* Get the fragment or vertex shader                 */
  world.getShader = loadShaders;
  /* Initialize shader fragment                        */
  world.initShaders = initShaders;
  world.handleLoadedTexture = App.tools.BasicTextures;
  world.initTexture = App.tools.loadTextureImage;

  world.disableUnusedAttr = function (gl, vertLimit) {
    var Local_looper1 = vertLimit;
    // var Local_looper1 = 0;
    // position, color, texture and normals
    while (Local_looper1 < 4) {
      gl.disableVertexAttribArray(Local_looper1);
      Local_looper1 = Local_looper1 + 1;
    }
  };

  /*
    world.disableUnusedAttr = function(gl,vertLimit) {
    // var Local_looper1 = vertLimit;
    var Local_looper1 = 0;
    /// position, color, texture and normals
    while (Local_looper1 < vertLimit) {
    gl.disableVertexAttribArray(Local_looper1);
    Local_looper1 = Local_looper1 + 1;
    }
    }
  */

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

  world.bufferObj = App.operation.obj_buffer_procedure;
  /* Buffer Cube                              */
  world.bufferCube = App.operation.cube_buffer_procedure;
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

  /* Repeated draw functionality            */
  // eslint-disable-next-line no-global-assign
  reDraw = App.operation.reDrawGlobal;

  /* Fill world based on content           */
  world.Add = function (filler, size, nameUniq, texturesPaths, mesh_, animationConstruct_) {

    /*
      Common conventions to be followed across
      Contents can contain any type of objects. Each object can be a triangle, cube etc.
      object.type           =  Contains the type of object namely triangle, cube
      object.size           =  Contains the size of the object. 1 unit will be the same as how WEBGL assumes 1 as in an array
      object.sides          =  Contains the number of sides. This needs to be first declared.  (To be built and used)
      object.shaderProgram  =  Contains the fragment and vertex shader
      object.rotation       =  Rotator
      object.color          =  Will contain colors based on the sides clockwise. One vertice -> [R,G,B,alpha]
      object.texture        =  If texture is present then this will be used.           (To be built and used)
      object.vertexPositionBuffer =  allocated during buffering
      object.vertexColorBuffer    =  allocated during buffering
      object.vertexTexCoordBuffer =  allocated during buffering
      object.vertexIndexBuffer    =  allocated during buffering
    */

    console.info("Fill world with:" + filler + " of size:" + size);
    if ("triangle" == filler) {
      var triangleObject = new Object();
      if (typeof nameUniq != "undefined") {
        triangleObject.name = nameUniq;
      } else {
        triangleObject.name = "triangle_instance_" + Math.floor((Math.random() * 100000) + 1);
      }
      triangleObject.streamTextures = null;
      triangleObject.type = filler;
      triangleObject.size = size;
      triangleObject.sides = 3;
      triangleObject.shaderProgram = this.initShaders(this.GL.gl, filler + "-shader-fs", filler + "-shader-vs");
      triangleObject.position = new Position(0, 0, -5.0);
      triangleObject.rotation = new RotationVector(1, 0, 0);
      triangleObject.color = new GeoOfColor("triangle");
      triangleObject.mvMatrix = mat4.create();
      triangleObject.geometry = new TriangleVertex(triangleObject);
      triangleObject.glBlend = new _glBlend();
      if (triangleObject.shaderProgram) {
        this.bufferTriangle(triangleObject);
        triangleObject.glDrawElements = new _DrawElements(triangleObject.vertexColorBuffer.numItems); // NEED TO LOOK BETTER
        this.contentList[this.contentList.length] = triangleObject;
        App.scene[triangleObject.name] = triangleObject;
        console.log("Buffer the " + filler + ":Store at:" + this.contentList.length);
      } else {
        console.log("Triangle shader failure...");
      }
    }

    if ("square" == filler) {
      var squareObject = new Object();
      if (typeof nameUniq != "undefined") {
        squareObject.name = nameUniq;
      } else {
        squareObject.name = "square_instance_" + Math.floor((Math.random() * 100000) + 1);
      }
      squareObject.streamTextures = null;
      squareObject.type = filler;
      squareObject.size = size;
      squareObject.sides = 4;
      squareObject.shaderProgram = this.initShaders(this.GL.gl, filler + "-shader-fs", filler + "-shader-vs");
      squareObject.position = new Position(0, 0, -5.0);
      squareObject.rotation = new RotationVector(1, 0, 0);
      squareObject.color = new GeoOfColor("4x4");
      squareObject.mvMatrix = mat4.create();
      squareObject.geometry = new SquareVertex(squareObject);
      squareObject.glBlend = new _glBlend();

      if (squareObject.shaderProgram) {
        console.log("   Buffer the " + filler + ":Store at:" + this.contentList.length);
        this.bufferSquare(squareObject);
        squareObject.glDrawElements = new _DrawElements(squareObject.vertexColorBuffer.numItems); // NEED TO LOOK BETTER
        squareObject.glDrawElements.mode = "TRIANGLE_STRIP"; //ONLY FOR SQUARE
        this.contentList[this.contentList.length] = squareObject;
        App.scene[squareObject.name] = squareObject;
      } else {
        console.log("Square shader failure...");
      }
    }

    if ("squareTex" == filler) {

      // eslint-disable-next-line no-redeclare
      var squareObject = new Object();

      if (typeof nameUniq != "undefined") {
        squareObject.name = nameUniq;
      } else {
        squareObject.name = "square_instance_" + Math.floor((Math.random() * 100000) + 1);
      }
      squareObject.streamTextures = null;
      squareObject.type = filler;
      squareObject.size = size;
      squareObject.sides = 4;
      squareObject.position = new Position(0, 0, -5.0);
      squareObject.rotation = new RotationVector(1, 0, 0);
      //squareObject.color     = new GeoOfColor("4x4");
      squareObject.mvMatrix = mat4.create();
      squareObject.geometry = new SquareVertex(squareObject);

      squareObject.glBlend = new _glBlend();

      squareObject.LightsData = {

        directionLight: new COLOR(1, 1, 1),
        ambientLight: new COLOR(1, 1, 1),
        lightingDirection: new COLOR(1, 1, 0),

      };

      if (typeof texturesPaths !== "undefined") {
        if (typeof texturesPaths == "string") {
          //alert('path is string')
          squareObject.texture = this.initTexture(this.GL.gl, texturesPaths);
          squareObject.textures = [];
          squareObject.textures[0] = squareObject.texture;
        } else if (typeof texturesPaths == "object") {
          console.log("path is object");
          squareObject.textures = [];
          squareObject.texture = true;

          // cubeObject.shaderProgram = this.initShaders(this.GL.gl, filler+"-shader-fs", filler+"-shader-vs");
          RegenerateShader("" + filler + "-shader-fs", texturesPaths.source.length, texturesPaths.mix_operation);

          for (var t = 0; t < texturesPaths.source.length; ++t) {

            squareObject.textures.push(this.initTexture(this.GL.gl, texturesPaths.source[t]));

          }

          squareObject.shaderProgram = this.initShaders(this.GL.gl, filler + "-shader-fs", filler + "-shader-vs");

        } else {
          alert("Exec add obj : texturePaths : path is unknow typeof");
        }

      } else {
        // no textures , use default single textures
        squareObject.texture = this.initTexture(this.GL.gl, "res/images/icon2.jpg");
        squareObject.textures[0] = squareObject.texture;
        squareObject.shaderProgram = this.initShaders(this.GL.gl, filler + "-shader-fs", filler + "-shader-vs");
      }

      squareObject.LightMap = new GeoOfColor("square");
      squareObject.custom = new Object();
      squareObject.custom.gl_texture = null;

      if (squareObject.shaderProgram) {
        console.log("   Buffer the " + filler + ":Store at:" + this.contentList.length);
        this.bufferSquareTex(squareObject); // using cubeTexLight

        squareObject.glDrawElements = new _DrawElements(squareObject.vertexIndexBuffer.numItems);

        this.contentList[this.contentList.length] = squareObject;
        App.scene[squareObject.name] = squareObject;
      } else {
        console.log("   Square shader failure");
      }
    }

    if ("cube" == filler) {
      var cubeObject = new Object();
      if (typeof nameUniq != "undefined") {
        cubeObject.name = nameUniq;
      } else {
        cubeObject.name = "cube_instance_" + Math.floor((Math.random() * 100000) + 1);
      }
      cubeObject.streamTextures = null;
      cubeObject.type = filler;
      cubeObject.size = size;
      cubeObject.sides = 12;
      cubeObject.shaderProgram = this.initShaders(this.GL.gl, filler + "-shader-fs", filler + "-shader-vs");
      cubeObject.position = new Position(0, 0, -5.0);
      cubeObject.rotation = new RotationVector(1, 0, 0);
      cubeObject.color = true;
      cubeObject.mvMatrix = mat4.create();
      cubeObject.geometry = new CubeVertex(cubeObject);

      cubeObject.instancedDraws = {

        numberOfInstance: 10,
        array_of_local_offset: [12, 0, 0],
        overrideDrawArraysInstance: function (object_) {}

      };

      cubeObject.glBlend = new _glBlend();

      if (cubeObject.shaderProgram && cubeObject.geometry) {
        console.log("   Buffer the " + filler + ":Store at:" + this.contentList.length);
        this.bufferCube(cubeObject);

        cubeObject.glDrawElements = new _DrawElements(cubeObject.vertexIndexBuffer.numItems);
        this.contentList[this.contentList.length] = cubeObject;
        App.scene[cubeObject.name] = cubeObject;

      } else {
        console.log("   Cube shader failure");
      }
    }

    if ("sphereTex" == filler || "sphereLightTex" == filler) {
      var sphereObject = new Object();
      if (typeof nameUniq != "undefined") {
        sphereObject.name = nameUniq;
      } else {
        sphereObject.name = "sphereObject_instance_" + Math.floor((Math.random() * 100000) + 1);
      }
      sphereObject.streamTextures = null;
      sphereObject.type = filler;
      sphereObject.position = new Position(0, 0, -5.0);
      sphereObject.size = size;
      sphereObject.sides = 12;
      sphereObject.rotation = new RotationVector(0, 1, 0);

      //lights
      sphereObject.LightsData = {

        directionLight: new COLOR(1, 1, 1),
        ambientLight: new COLOR(1, 1, 1),
        lightingDirection: new COLOR(1, 1, 0),

      };

      sphereObject.textures = [];
      if (typeof texturesPaths !== "undefined") {
        if (typeof texturesPaths == "string") {
          //alert('path is string')
          sphereObject.texture = this.initTexture(this.GL.gl, texturesPaths);

          sphereObject.textures.push(cubeObject.texture);
        } else if (typeof texturesPaths == "object") {
          console.log("path is object");
          sphereObject.textures = [];
          sphereObject.texture = true;
          // cubeObject.shaderProgram = this.initShaders(this.GL.gl, filler+"-shader-fs", filler+"-shader-vs");
          RegenerateShader(filler + "-shader-fs", texturesPaths.source.length, texturesPaths.mix_operation);

          // eslint-disable-next-line no-redeclare
          for (var t = 0; t < texturesPaths.source.length; ++t) {

            sphereObject.textures.push(this.initTexture(this.GL.gl, texturesPaths.source[t]));

          }

          sphereObject.shaderProgram = this.initShaders(this.GL.gl, filler + "-shader-fs", filler + "-shader-vs");

        } else {
          alert("Exec add obj : texturePaths : path is unknow typeof");
        }

      } else {

        // no textures , use default single textures
        sphereObject.texture = this.initTexture(this.GL.gl, "res/images/texture_spiral1.png");
        sphereObject.textures.push(sphereObject.texture);
        sphereObject.texture = true;
        sphereObject.shaderProgram = this.initShaders(this.GL.gl, filler + "-shader-fs", filler + "-shader-vs");

      }

      sphereObject.changeMaterial = function (texturesPaths) {

        RegenerateShader(this.type + "-shader-fs", texturesPaths.source.length, texturesPaths.mix_operation);

        for (var t = 0; t < texturesPaths.source.length; ++t) {

          this.textures.push(world.initTexture(world.GL.gl, texturesPaths.source[t]));

        }

        this.shaderProgram = world.initShaders(world.GL.gl, this.type + "-shader-fs", this.type + "-shader-vs");

      };

      sphereObject.changeShader = function (texturesPaths, custom_code) {

        RegenerateCustomShader(this.type + "-shader-fs", texturesPaths.source.length, texturesPaths.mix_operation, custom_code);

        for (var t = 0; t < texturesPaths.source.length; ++t) {

          this.textures.push(world.initTexture(world.GL.gl, texturesPaths.source[t]));

        }

        this.shaderProgram = world.initShaders(world.GL.gl, this.type + "-shader-fs", this.type + "-shader-vs");

      };

      sphereObject.mvMatrix = mat4.create();
      //sphereObject.LightMap   = new GeoOfColor("cube light");
      sphereObject.LightMap = undefined;

      if (typeof mesh_ !== "undefined") {

        sphereObject.latitudeBands = mesh_.latitudeBands;
        sphereObject.longitudeBands = mesh_.longitudeBands;
        sphereObject.radius = mesh_.radius;

      } else {

        sphereObject.latitudeBands = 30;
        sphereObject.longitudeBands = 30;
        sphereObject.radius = 2;

      }

      sphereObject.geometry = new sphereVertex(sphereObject);

      //draws params
      sphereObject.glBlend = new _glBlend();

      if (sphereObject.shaderProgram) {
        console.log("   Buffer the " + filler + ":Store at:" + this.contentList.length);
        this.bufferSphere(sphereObject);

        sphereObject.glDrawElements = new _DrawElements(sphereObject.vertexIndexBuffer.numItems);

        this.contentList[this.contentList.length] = sphereObject;
        App.scene[sphereObject.name] = sphereObject;
      } else {
        console.log("   Cube shader failure");
      }
    }

    if ("pyramid" == filler) {
      var pyramidObject = new Object();
      if (typeof nameUniq != "undefined") {
        pyramidObject.name = nameUniq;
      } else {
        pyramidObject.name = "pyramid_instance_" + Math.floor((Math.random() * 100000) + 1);
      }
      pyramidObject.streamTextures = null;
      pyramidObject.type = filler;
      pyramidObject.size = size;
      pyramidObject.sides = 8;
      pyramidObject.shaderProgram = this.initShaders(this.GL.gl, filler + "-shader-fs", filler + "-shader-vs");
      pyramidObject.position = new Position(0, 0, -5.0);
      pyramidObject.rotation = new RotationVector(1, 0, 0);
      // pyramidObject.color     = new GeoOfColor ("Piramide4");
      pyramidObject.mvMatrix = mat4.create();
      pyramidObject.geometry = new PiramideVertex(pyramidObject);

      pyramidObject.instancedDraws = {

        numberOfInstance: 10,
        array_of_local_offset: [12, 0, 0],
        overrideDrawArraysInstance: function (object_) {}

      };

      pyramidObject.glBlend = new _glBlend();

      if (pyramidObject.shaderProgram) {
        console.log("   Buffer the " + filler + ":Store at:" + this.contentList.length);
        this.bufferPyramid(pyramidObject);
        pyramidObject.glDrawElements = new _DrawElements(pyramidObject.vertexColorBuffer.numItems); // !!!!!!!!!
        this.contentList[this.contentList.length] = pyramidObject;
        App.scene[pyramidObject.name] = pyramidObject;
      } else {
        console.log("   Pyramid shader failure");
      }
    }

    if ("obj" == filler) {
      var objObject = new Object();

      if (typeof nameUniq != "undefined") {
        objObject.name = nameUniq;
      } else {
        objObject.name = "obj_instance_" + Math.floor((Math.random() * 100000) + 1);
      }
      objObject.streamTextures = null;
      objObject.type = filler;
      objObject.size = size;
      objObject.sides = 8;
      objObject.shaderProgram = this.initShaders(this.GL.gl, filler + "-shader-fs", filler + "-shader-vs");
      objObject.position = new Position(0, -5, -8.0);
      objObject.rotation = new RotationVector(0, 1, 0);
      objObject.color = new GeoOfColor("4x4");

      //custom textures
      objObject.custom = new Object();
      objObject.custom.gl_texture = null;

      // SYS.DEBUG.WARNING(">>>count    : Specifies the number of elements to be rendered.");
      objObject.glDrawElements = new _DrawElements(mesh_.indexBuffer.numItems);
      objObject.glBlend = new _glBlend();

      objObject.LightsData = {

        directionLight: new COLOR(5, 5, 5),
        ambientLight: new COLOR(1, 1, 1),
        lightingDirection: new COLOR(0, 1, 0),

      };

      if (typeof texturesPaths !== "undefined") {
        if (typeof texturesPaths == "string") {
          //alert('path is string')
          objObject.texture = this.initTexture(this.GL.gl, texturesPaths);
          objObject.textures = [];
          objObject.textures_texParameteri = []; //new
          objObject.textures[0] = objObject.texture;
        } else if (typeof texturesPaths == "object") {
          console.log("path is object");
          objObject.textures = [];
          objObject.textures_texParameteri = []; //new
          objObject.texture = true;
          RegenerateShader(filler + "-shader-fs", texturesPaths.source.length, texturesPaths.mix_operation);

          // eslint-disable-next-line no-redeclare
          for (var t = 0; t < texturesPaths.source.length; ++t) {

            objObject.textures.push(this.initTexture(this.GL.gl, texturesPaths.source[t]));
            objObject.textures_texParameteri.push(new _glTexParameteri("TEXTURE_2D", "TEXTURE_MAG_FILTER", "LINEAR"));

          }

          objObject.shaderProgram = this.initShaders(this.GL.gl, filler + "-shader-fs", filler + "-shader-vs");

        } else {
          SYS.DEBUG.WARNING("Exec add obj : texturePaths : path is unknow typeof");
        }

      } else {
        // no textures , use default single textures
        //objObject.texture = undefined;
        objObject.texture = this.initTexture(this.GL.gl, "res/images/black_white.png");
        objObject.textures = [];
        objObject.textures[0] = objObject.texture;

      }

      objObject.LightMap = new GeoOfColor("square");

      objObject.changeMaterial = function (texturesPaths) {

        RegenerateShader(this.type + "-shader-fs", texturesPaths.source.length, texturesPaths.mix_operation);

        for (var t = 0; t < texturesPaths.source.length; ++t) {

          this.textures.push(world.initTexture(world.GL.gl, texturesPaths.source[t]));

        }

        this.shaderProgram = world.initShaders(world.GL.gl, this.type + "-shader-fs", this.type + "-shader-vs");

      };

      objObject.mvMatrix = mat4.create();
      /// objObject.mesh     = App.meshes.skeleton;

      // eslint-disable-next-line valid-typeof
      if (typeof animationConstruct_ == "undefined" || typeof animationConstruct_ == null) {

        objObject.animation = null;

      } else {

        objObject.animation = {

          id: animationConstruct_.id,
          sumOfAniFrames: animationConstruct_.sumOfAniFrames,
          currentAni: animationConstruct_.currentAni,

          speed: animationConstruct_.speed,
          currentDraws: 0

        };

      }

      objObject.mesh = mesh_;

      if (objObject.shaderProgram) {
        console.log("   Buffer the " + filler + ":Store at:" + this.contentList.length);
        this.bufferObj(objObject);
        this.contentList[this.contentList.length] = objObject;
        App.scene[objObject.name] = objObject;
      } else {
        console.log("   obj file shader failure");
      }
    }

    if ("cubeTex" == filler || "cubeLightTex" == filler) {

      // eslint-disable-next-line no-redeclare
      var cubeObject = new Object();
      if (typeof nameUniq != "undefined") {
        cubeObject.name = nameUniq;
      } else {
        cubeObject.name = "cube_instance_" + Math.floor((Math.random() * 100000) + 1);
      }
      cubeObject.streamTextures = null;
      cubeObject.type = filler;
      cubeObject.position = new Position(0, 0, -5.0);
      cubeObject.size = size;
      cubeObject.sides = 12;
      cubeObject.rotation = new RotationVector(0, 1, 0);

      //lights
      cubeObject.LightsData = {

        directionLight: new COLOR(1, 1, 1),
        ambientLight: new COLOR(1, 1, 1),
        lightingDirection: new COLOR(1, 1, 0),

      };

      cubeObject.textures = [];
      cubeObject.custom = new Object();
      cubeObject.custom.gl_texture = null;

      if (typeof texturesPaths !== "undefined") {
        if (typeof texturesPaths == "string") {
          //alert('path is string')
          cubeObject.texture = this.initTexture(this.GL.gl, texturesPaths);
          cubeObject.textures.push(cubeObject.texture);
        } else if (typeof texturesPaths == "object") {

          console.log("path is object");
          cubeObject.textures = [];
          cubeObject.texture = true;
          // cubeObject.shaderProgram = this.initShaders(this.GL.gl, filler+"-shader-fs", filler+"-shader-vs");
          RegenerateShader(filler + "-shader-fs", texturesPaths.source.length, texturesPaths.mix_operation);

          // eslint-disable-next-line no-redeclare
          for (var t = 0; t < texturesPaths.source.length; ++t) {

            cubeObject.textures.push(this.initTexture(this.GL.gl, texturesPaths.source[t]));

          }

          cubeObject.shaderProgram = this.initShaders(this.GL.gl, filler + "-shader-fs", filler + "-shader-vs");

        } else {
          alert("Exec add obj : texturePaths : path is unknow typeof");
        }

      } else {
        // no textures , use default single textures
        cubeObject.texture = this.initTexture(this.GL.gl, "res/images/texture_spiral1.png");
        cubeObject.textures.push(cubeObject.texture);
        cubeObject.texture = true;
        cubeObject.shaderProgram = this.initShaders(this.GL.gl, filler + "-shader-fs", filler + "-shader-vs");

      }

      cubeObject.changeMaterial = function (texturesPaths) {

        RegenerateShader(this.type + "-shader-fs", texturesPaths.source.length, texturesPaths.mix_operation);

        for (var t = 0; t < texturesPaths.source.length; ++t) {

          this.textures.push(world.initTexture(world.GL.gl, texturesPaths.source[t]));

        }

        this.shaderProgram = world.initShaders(world.GL.gl, this.type + "-shader-fs", this.type + "-shader-vs");

      };
      cubeObject.mvMatrix = mat4.create();
      cubeObject.LightMap = new GeoOfColor("cube light");
      cubeObject.geometry = new CubeVertex(cubeObject);

      cubeObject.instancedDraws = {

        numberOfInstance: 10,
        array_of_local_offset: [12, 0, 0],
        overrideDrawArraysInstance: function (object_) {}

      };

      //draws params
      cubeObject.glBlend = new _glBlend();

      if (cubeObject.shaderProgram) {

        console.log("   Buffer the " + filler + ":Store at:" + this.contentList.length);
        this.bufferCube(cubeObject);

        cubeObject.glDrawElements = new _DrawElements(cubeObject.vertexIndexBuffer.numItems);

        this.contentList[this.contentList.length] = cubeObject;
        App.scene[cubeObject.name] = cubeObject;

      } else {
        console.log("   Cube shader failure");
      }
    }

    if ("generatorTex" == filler || "generatorLightTex" == filler) {

      var customObject = new Object();
      if (typeof nameUniq != "undefined") {
        customObject.name = nameUniq;
      } else {
        customObject.name = "customObject_instance_" + Math.floor((Math.random() * 100000) + 1);
      }
      customObject.streamTextures = null;
      customObject.type = filler;
      customObject.position = new Position(0, 0, -5.0);
      customObject.size = size;
      customObject.sides = 12;
      customObject.rotation = new RotationVector(0, 1, 0);

      //lights
      customObject.LightsData = {
        directionLight: new COLOR(1, 1, 1),
        ambientLight: new COLOR(1, 1, 1),
        lightingDirection: new COLOR(1, 1, 0),
      };

      customObject.textures = [];

      if (typeof texturesPaths !== "undefined") {
        if (typeof texturesPaths == "string") {
          //alert('path is string')
          customObject.texture = this.initTexture(this.GL.gl, texturesPaths);

          customObject.textures.push(customObject.texture);
        } else if (typeof texturesPaths == "object") {
          console.log("path is object");
          customObject.textures = [];
          customObject.texture = true;

          // cubeObject.shaderProgram = this.initShaders(this.GL.gl, filler+"-shader-fs", filler+"-shader-vs");
          RegenerateShader("sphereLightTex" + "-shader-fs", texturesPaths.source.length, texturesPaths.mix_operation);

          // eslint-disable-next-line no-redeclare
          for (var t = 0; t < texturesPaths.source.length; ++t) {

            customObject.textures.push(this.initTexture(this.GL.gl, texturesPaths.source[t]));

          }

          customObject.shaderProgram = this.initShaders(this.GL.gl, "sphereLightTex" + "-shader-fs", "sphereLightTex" + "-shader-vs"); //hard code

        } else {
          alert("Exec add obj : texturePaths : path is unknow typeof");
        }

      } else {

        // no textures , use default single textures
        customObject.texture = this.initTexture(this.GL.gl, "res/images/texture_spiral1.png");
        customObject.textures.push(customObject.texture);
        customObject.texture = true;
        customObject.shaderProgram = this.initShaders(this.GL.gl, "sphereLightTex" + "-shader-fs", "sphereLightTex" + "-shader-vs");

      }

      customObject.changeMaterial = function (texturesPaths) {

        RegenerateShader("sphereLightTex" + "-shader-fs", texturesPaths.source.length, texturesPaths.mix_operation);

        for (var t = 0; t < texturesPaths.source.length; ++t) {

          this.textures.push(world.initTexture(world.GL.gl, texturesPaths.source[t]));

        }

        //this.shaderProgram = world.initShaders(world.GL.gl, this.type +"-shader-fs", this.type + "-shader-vs");
        this.shaderProgram = world.initShaders(world.GL.gl, "sphereLightTex" + "-shader-fs", "sphereLightTex" + "-shader-vs");

      };

      customObject.mvMatrix = mat4.create();

      //sphereObject.LightMap   = new GeoOfColor("cube light");
      customObject.LightMap = undefined;

      if (typeof mesh_ !== "undefined") {

        customObject.latitudeBands = mesh_.latitudeBands;
        customObject.longitudeBands = mesh_.longitudeBands;
        customObject.radius = mesh_.radius;
        customObject.custom_type = mesh_.custom_type;

      } else {

        customObject.latitudeBands = 30;
        customObject.longitudeBands = 30;
        customObject.radius = 2;

      }

      customObject.geometry = new customVertex(customObject);

      //draws params
      customObject.glBlend = new _glBlend();

      if (customObject.shaderProgram) {
        console.log("   Buffer the " + filler + ":Store at:" + this.contentList.length);
        this.bufferSphere(customObject);
        customObject.glDrawElements = new _DrawElements(customObject.vertexIndexBuffer.numItems);
        this.contentList[this.contentList.length] = customObject;
        App.scene[customObject.name] = customObject;
      } else {
        console.log("   customObject shader failure");
      }
    }
  };

  world.callReDraw = callReDraw_;

  /* Destructor                    */
  world.destroy = App.operation.destroyWorld;

  return world;
}
/* WebGL end of world                */
/*****************************************************/
