/**
 * @Author Nikola Lukic
 * @Description Matrix Engine Api Example.
 * First time adding direct different FShader.
 * Also mix divine two shader variants...
 */
import App from "../program/manifest.js";
import * as matrixEngine from "../index.js";
import {standardMEShaderDrawer, freeShadersToy} from "../lib/optimizer/buildin-shaders.js";
let OSCILLATOR = matrixEngine.utility.OSCILLATOR;
const scriptManager = matrixEngine.utility.scriptManager;
import {geometryLines} from "../public/res/matrix-shaders-params/geometry-lines.js";

export var runThis = world => {

  App.camera.SceneController = true

  setTimeout(() => document.querySelector('.button2').click(), 3000)

  var texImgs = {
    source: ["res/images/blue.png"],
    mix_operation: "multiply",
  }
  // sphereLightTex  squareTex
  world.Add("cubeLightTex", 1.5, "CubeShader", texImgs);
  world.Add("cubeLightTex", 1.5, "CubeShader2", texImgs);
  world.Add("cubeLightTex", 1.5, "CubeShader3", texImgs);
  world.Add("cubeLightTex", 1.5, "CubeShader4", texImgs);
  world.Add("cubeLightTex", 1.5, "CubeShader5", texImgs);
  world.Add("cubeLightTex", 1.5, "CubeShader6", texImgs);

  canvas.addEventListener('mousedown', (ev) => {
    matrixEngine.raycaster.checkingProcedure(ev);
  });

  addEventListener("ray.hit.event", function(e) {
    e.detail.hitObject.LightsData.ambientLight.r =
      matrixEngine.utility.randomFloatFromTo(0, 2);
    e.detail.hitObject.LightsData.ambientLight.g =
      matrixEngine.utility.randomFloatFromTo(0, 2);
    e.detail.hitObject.LightsData.ambientLight.b =
      matrixEngine.utility.randomFloatFromTo(0, 2);
    // console.info(e.detail);
  });

  // Load shader content direct from glsl file.
  if(location.hostname == "localhost") {
    console.log('DEV Paths')
    var promiseMyShader = scriptManager.loadGLSL('../public/res/shaders/lights/lights.glsl')
    var promiseMyShader2 = scriptManager.loadGLSL('../public/res/shaders/lights/lights2.glsl')
    var promiseMyShader3 = scriptManager.loadGLSL('../public/res/shaders/fractals/cube.glsl')
    var promiseMyShader4 = scriptManager.loadGLSL('../public/res/shaders/symbols/single-symbol.glsl')
    var promiseMyShader5 = scriptManager.loadGLSL('../public/res/shaders/tutorial-lines/colored-lines.glsl')
    var promiseMyShader6 = scriptManager.loadGLSL('../public/res/shaders/noise/volonoise.glsl')
  } else {
    console.log('PROD Paths')
    var promiseMyShader = scriptManager.loadGLSL('./res/shaders/lights/lights.glsl')
    var promiseMyShader2 = scriptManager.loadGLSL('./res/shaders/lights/lights2.glsl')
    var promiseMyShader3 = scriptManager.loadGLSL('./res/shaders/fractals/cube.glsl')
    var promiseMyShader4 = scriptManager.loadGLSL('./res/shaders/symbols/single-symbol.glsl')
    var promiseMyShader5 = scriptManager.loadGLSL('./res/shaders/tutorial-lines/colored-lines.glsl')
    var promiseMyShader6 = scriptManager.loadGLSL('./res/shaders/noise/volonoise.glsl')
  }

  geometryLines.charM.forEach((element, index, array) => {
    if(array[index] >= 0) array[index] += 0.4;
    if(array[index] < 0) array[index] -= 0.4;
  });

  var myshaderDrawData = geometryLines.charM;

  promiseMyShader.then((d) => {
    scriptManager.LOAD(d, "custom-light-shader-fs", "x-shader/x-fragment", "shaders", () => {
      App.scene.CubeShader.shaderProgram = world.initShaders(world.GL.gl, 'custom-light' + '-shader-fs', 'cubeLightTex' + '-shader-vs');
      // Now add extra custom shader uniforms.
      App.scene.CubeShader.shaderProgram.XXX = world.GL.gl.getUniformLocation(App.scene.CubeShader.shaderProgram, "iXXX");
      App.scene.CubeShader.shaderProgram.R = world.GL.gl.getUniformLocation(App.scene.CubeShader.shaderProgram, "iR");
      App.scene.CubeShader.shaderProgram.G = world.GL.gl.getUniformLocation(App.scene.CubeShader.shaderProgram, "iG");
      App.scene.CubeShader.shaderProgram.B = world.GL.gl.getUniformLocation(App.scene.CubeShader.shaderProgram, "iB");
      App.scene.CubeShader.shaderProgram.iAppStatus = world.GL.gl.getUniformLocation(App.scene.CubeShader.shaderProgram, "iAppStatus");
    })
  })
  promiseMyShader2.then((d) => {
    scriptManager.LOAD(d, "custom-light2-shader-fs", "x-shader/x-fragment", "shaders", () => {
      App.scene.CubeShader2.shaderProgram = world.initShaders(world.GL.gl, 'custom-light2' + '-shader-fs', 'cubeLightTex' + '-shader-vs');
      // Now add extra custom shader uniforms.
      App.scene.CubeShader2.shaderProgram.XXX = world.GL.gl.getUniformLocation(App.scene.CubeShader2.shaderProgram, "iXXX");
      App.scene.CubeShader2.shaderProgram.R = world.GL.gl.getUniformLocation(App.scene.CubeShader2.shaderProgram, "iR");
      App.scene.CubeShader2.shaderProgram.G = world.GL.gl.getUniformLocation(App.scene.CubeShader2.shaderProgram, "iG");
      App.scene.CubeShader2.shaderProgram.B = world.GL.gl.getUniformLocation(App.scene.CubeShader2.shaderProgram, "iB");
      App.scene.CubeShader2.shaderProgram.iAppStatus = world.GL.gl.getUniformLocation(App.scene.CubeShader2.shaderProgram, "iAppStatus");
    })
  })
  promiseMyShader3.then((d) => {
    scriptManager.LOAD(d, "custom-circle1-shader-fs", "x-shader/x-fragment", "shaders", () => {
      App.scene.CubeShader3.shaderProgram = world.initShaders(world.GL.gl, 'custom-circle1' + '-shader-fs', 'cubeLightTex' + '-shader-vs');
      // Now add extra custom shader uniforms.
      App.scene.CubeShader3.shaderProgram.XXX = world.GL.gl.getUniformLocation(App.scene.CubeShader3.shaderProgram, "iXXX");
      App.scene.CubeShader3.shaderProgram.R = world.GL.gl.getUniformLocation(App.scene.CubeShader3.shaderProgram, "iR");
      App.scene.CubeShader3.shaderProgram.G = world.GL.gl.getUniformLocation(App.scene.CubeShader3.shaderProgram, "iG");
      App.scene.CubeShader3.shaderProgram.B = world.GL.gl.getUniformLocation(App.scene.CubeShader3.shaderProgram, "iB");
      App.scene.CubeShader3.shaderProgram.iAppStatus = world.GL.gl.getUniformLocation(App.scene.CubeShader3.shaderProgram, "iAppStatus");
    })
  })

  promiseMyShader4.then((d) => {
    scriptManager.LOAD(d, "custom-circle2-shader-fs", "x-shader/x-fragment", "shaders", () => {
      App.scene.CubeShader4.shaderProgram = world.initShaders(world.GL.gl, 'custom-circle2' + '-shader-fs', 'cubeLightTex' + '-shader-vs');
      // Now add extra custom shader uniforms.
      App.scene.CubeShader4.shaderProgram.XXX = world.GL.gl.getUniformLocation(App.scene.CubeShader4.shaderProgram, "iXXX");
      App.scene.CubeShader4.shaderProgram.R = world.GL.gl.getUniformLocation(App.scene.CubeShader4.shaderProgram, "iR");
      App.scene.CubeShader4.shaderProgram.G = world.GL.gl.getUniformLocation(App.scene.CubeShader4.shaderProgram, "iG");
      App.scene.CubeShader4.shaderProgram.B = world.GL.gl.getUniformLocation(App.scene.CubeShader4.shaderProgram, "iB");
      App.scene.CubeShader4.shaderProgram.iAppStatus = world.GL.gl.getUniformLocation(App.scene.CubeShader4.shaderProgram, "iAppStatus");
      App.scene.CubeShader4.shaderProgram.myshaderDrawData = world.GL.gl.getUniformLocation(App.scene.CubeShader4.shaderProgram, "myshaderDrawData");
    })
  })

  promiseMyShader5.then((d) => {
    scriptManager.LOAD(d, "custom-circle-two-shader-fs", "x-shader/x-fragment", "shaders", () => {
      App.scene.CubeShader5.shaderProgram = world.initShaders(world.GL.gl, 'custom-circle-two' + '-shader-fs', 'cubeLightTex' + '-shader-vs');
      // Now add extra custom shader uniforms.
      App.scene.CubeShader5.shaderProgram.XXX = world.GL.gl.getUniformLocation(App.scene.CubeShader5.shaderProgram, "iXXX");
      App.scene.CubeShader5.shaderProgram.R = world.GL.gl.getUniformLocation(App.scene.CubeShader5.shaderProgram, "iR");
      App.scene.CubeShader5.shaderProgram.G = world.GL.gl.getUniformLocation(App.scene.CubeShader5.shaderProgram, "iG");
      App.scene.CubeShader5.shaderProgram.B = world.GL.gl.getUniformLocation(App.scene.CubeShader5.shaderProgram, "iB");
      App.scene.CubeShader5.shaderProgram.iAppStatus = world.GL.gl.getUniformLocation(App.scene.CubeShader5.shaderProgram, "iAppStatus");
    })
  })


  promiseMyShader6.then((d) => {
    scriptManager.LOAD(d, "custom-vol-shader-fs", "x-shader/x-fragment", "shaders", () => {
      App.scene.CubeShader6.shaderProgram = world.initShaders(world.GL.gl, 'custom-vol' + '-shader-fs', 'cubeLightTex' + '-shader-vs');
      // Now add extra custom shader uniforms.
      App.scene.CubeShader6.shaderProgram.XXX = world.GL.gl.getUniformLocation(App.scene.CubeShader6.shaderProgram, "iXXX");
      App.scene.CubeShader6.shaderProgram.R = world.GL.gl.getUniformLocation(App.scene.CubeShader6.shaderProgram, "iR");
      App.scene.CubeShader6.shaderProgram.G = world.GL.gl.getUniformLocation(App.scene.CubeShader6.shaderProgram, "iG");
      App.scene.CubeShader6.shaderProgram.B = world.GL.gl.getUniformLocation(App.scene.CubeShader6.shaderProgram, "iB");
      App.scene.CubeShader6.shaderProgram.iAppStatus = world.GL.gl.getUniformLocation(App.scene.CubeShader6.shaderProgram, "iAppStatus");
    })
  })

  App.scene.CubeShader.position.setPosition(-4, 2, -11)
  App.scene.CubeShader2.position.setPosition(0, 2, -11)
  App.scene.CubeShader3.position.setPosition(4, 2, -11)
  App.scene.CubeShader4.position.setPosition(-4, -2, -11)
  App.scene.CubeShader5.position.setPosition(0, -2, -11)
  App.scene.CubeShader6.position.setPosition(4, -2, -11)

  App.scene.CubeShader.rotation.rotationSpeed.y = 20;
  App.scene.CubeShader.glBlend.blendEnabled = true;

  App.scene.CubeShader.type = "custom-";
  App.scene.CubeShader2.type = "custom-";
  App.scene.CubeShader3.type = "custom-";
  App.scene.CubeShader4.type = "custom-";
  App.scene.CubeShader5.type = "custom-";
  App.scene.CubeShader6.type = "custom-";

  var now = 1, time1 = 0, then1 = 0;
  App.scene.CubeShader.SHADER_APP_STATUS = 0;
  var osc_r = new OSCILLATOR(0, 2, 0.001);
  var osc_g = new OSCILLATOR(0, 1, 0.001);
  var osc_b = new OSCILLATOR(0, 0.1, 0.01);
  var osc_variable = new OSCILLATOR(0, 150, 1);

  var osc_r2 = new OSCILLATOR(0, 2, 0.001);
  var osc_g2 = new OSCILLATOR(0, 1, 0.001);
  var osc_b2 = new OSCILLATOR(0, 0.1, 0.01);
  var osc_variable2 = new OSCILLATOR(0, 150, 1);

  var osc_variable3 = new OSCILLATOR(0, 50, 0.05);

  var osc_variable4 = new OSCILLATOR(0, 10, 0.02);

  App.scene.CubeShader.MY_RAD = 0.5;
  App.scene.CubeShader.addExtraDrawCode = function(world, object) {
    now = Date.now();
    now *= 0.000000001;
    const elapsedTime = Math.min(now - then1, 0.01);
    time1 += elapsedTime;
    then1 = time1;
    world.GL.gl.uniform2f(object.shaderProgram.resolutionLocation, world.GL.gl.canvas.width, world.GL.gl.canvas.height);
    world.GL.gl.uniform1f(object.shaderProgram.TimeDelta, time1);
    world.GL.gl.uniform1f(object.shaderProgram.timeLocation, time1);
    // world.GL.gl.uniform1f(object.shaderProgram.iMouse, App.sys.MOUSE.x, App.sys.MOUSE.y, );
    world.GL.gl.uniform3f(object.shaderProgram.iMouse, App.sys.MOUSE.x, App.sys.MOUSE.y, (App.sys.MOUSE.PRESS != false ? 1 : 0));

    world.GL.gl.uniform1f(object.shaderProgram.XXX, osc_variable.UPDATE())

    world.GL.gl.uniform1f(object.shaderProgram.R, osc_r.UPDATE())
    world.GL.gl.uniform1f(object.shaderProgram.G, osc_g.UPDATE())
    world.GL.gl.uniform1f(object.shaderProgram.B, osc_b.UPDATE())

    world.GL.gl.uniform1i(object.shaderProgram.iAppStatus, App.scene.CubeShader.SHADER_APP_STATUS)
  }

  App.scene.CubeShader.drawCustom = matrixEngine.standardMEShaderDrawer;

  App.scene.CubeShader2.addExtraDrawCode = function(world, object) {
    now = Date.now();
    now *= 0.000000001;
    const elapsedTime = Math.min(now - then1, 0.01);
    time1 += elapsedTime;
    then1 = time1;
    world.GL.gl.uniform2f(object.shaderProgram.resolutionLocation, world.GL.gl.canvas.width, world.GL.gl.canvas.height);
    world.GL.gl.uniform1f(object.shaderProgram.TimeDelta, time1);
    world.GL.gl.uniform1f(object.shaderProgram.timeLocation, time1);
    // world.GL.gl.uniform1f(object.shaderProgram.iMouse, App.sys.MOUSE.x, App.sys.MOUSE.y, );
    world.GL.gl.uniform3f(object.shaderProgram.iMouse, App.sys.MOUSE.x, App.sys.MOUSE.y, (App.sys.MOUSE.PRESS != false ? 1 : 0));

    world.GL.gl.uniform1f(object.shaderProgram.XXX, osc_variable2.UPDATE())

    world.GL.gl.uniform1f(object.shaderProgram.R, osc_r2.UPDATE())
    world.GL.gl.uniform1f(object.shaderProgram.G, osc_g2.UPDATE())
    world.GL.gl.uniform1f(object.shaderProgram.B, osc_b2.UPDATE())

    world.GL.gl.uniform1i(object.shaderProgram.iAppStatus, App.scene.CubeShader.SHADER_APP_STATUS)
  }
  App.scene.CubeShader2.drawCustom = matrixEngine.standardMEShaderDrawer;

  App.scene.CubeShader3.addExtraDrawCode = function(world, object) {
    now = Date.now();
    now *= 0.000000001;
    const elapsedTime = Math.min(now - then1, 0.01);
    time1 += elapsedTime;
    then1 = time1;
    world.GL.gl.uniform2f(object.shaderProgram.resolutionLocation, world.GL.gl.canvas.width, world.GL.gl.canvas.height);
    world.GL.gl.uniform1f(object.shaderProgram.TimeDelta, time1);
    world.GL.gl.uniform1f(object.shaderProgram.timeLocation, time1);
    // world.GL.gl.uniform1f(object.shaderProgram.iMouse, App.sys.MOUSE.x, App.sys.MOUSE.y, );
    world.GL.gl.uniform3f(object.shaderProgram.iMouse, App.sys.MOUSE.x, App.sys.MOUSE.y, (App.sys.MOUSE.PRESS != false ? 1 : 0));

    world.GL.gl.uniform1f(object.shaderProgram.XXX, osc_variable2.UPDATE())

    world.GL.gl.uniform1f(object.shaderProgram.R, osc_r2.UPDATE())
    world.GL.gl.uniform1f(object.shaderProgram.G, osc_g2.UPDATE())
    world.GL.gl.uniform1f(object.shaderProgram.B, osc_b2.UPDATE())

    world.GL.gl.uniform1i(object.shaderProgram.iAppStatus, App.scene.CubeShader.SHADER_APP_STATUS)
  }

  App.scene.CubeShader3.drawCustom = matrixEngine.standardMEShaderDrawer;

  App.scene.CubeShader4.addExtraDrawCode = function(world, object) {
    now = Date.now();
    now *= 0.000000001;
    const elapsedTime = Math.min(now - then1, 0.01);
    time1 += elapsedTime;
    then1 = time1;
    world.GL.gl.uniform2f(object.shaderProgram.resolutionLocation, world.GL.gl.canvas.width, world.GL.gl.canvas.height);
    world.GL.gl.uniform1f(object.shaderProgram.TimeDelta, time1);
    world.GL.gl.uniform1f(object.shaderProgram.timeLocation, time1);
    // world.GL.gl.uniform1f(object.shaderProgram.iMouse, App.sys.MOUSE.x, App.sys.MOUSE.y, );
    world.GL.gl.uniform3f(object.shaderProgram.iMouse, App.sys.MOUSE.x, App.sys.MOUSE.y, (App.sys.MOUSE.PRESS != false ? 1 : 0));

    world.GL.gl.uniform1f(object.shaderProgram.XXX, 1.0)

    world.GL.gl.uniform1f(object.shaderProgram.R, osc_variable3.UPDATE())
    world.GL.gl.uniform1f(object.shaderProgram.G, osc_variable3.UPDATE())
    world.GL.gl.uniform1f(object.shaderProgram.B, osc_variable3.UPDATE())

    world.GL.gl.uniform1i(object.shaderProgram.iAppStatus, App.scene.CubeShader4.SHADER_APP_STATUS)
    world.GL.gl.uniform1fv(object.shaderProgram.myshaderDrawData, myshaderDrawData, 0, 16)
  }
  App.scene.CubeShader4.drawCustom = matrixEngine.standardMEShaderDrawer;

  App.scene.CubeShader5.addExtraDrawCode = function(world, object) {
    now = Date.now();
    now *= 0.000000001;
    const elapsedTime = Math.min(now - then1, 0.01);
    time1 += elapsedTime;
    then1 = time1;
    world.GL.gl.uniform2f(object.shaderProgram.resolutionLocation, world.GL.gl.canvas.width, world.GL.gl.canvas.height);
    world.GL.gl.uniform1f(object.shaderProgram.TimeDelta, time1);
    world.GL.gl.uniform1f(object.shaderProgram.timeLocation, time1);
    // world.GL.gl.uniform1f(object.shaderProgram.iMouse, App.sys.MOUSE.x, App.sys.MOUSE.y, );
    world.GL.gl.uniform3f(object.shaderProgram.iMouse, App.sys.MOUSE.x, App.sys.MOUSE.y, (App.sys.MOUSE.PRESS != false ? 1 : 0));

    world.GL.gl.uniform1f(object.shaderProgram.XXX, 1.0)

    world.GL.gl.uniform1f(object.shaderProgram.R, osc_variable3.UPDATE())
    world.GL.gl.uniform1f(object.shaderProgram.G, osc_variable3.UPDATE())
    world.GL.gl.uniform1f(object.shaderProgram.B, osc_variable3.UPDATE())

    world.GL.gl.uniform1i(object.shaderProgram.iAppStatus, App.scene.CubeShader5.SHADER_APP_STATUS)
  }
  App.scene.CubeShader5.drawCustom = matrixEngine.standardMEShaderDrawer;

  App.scene.CubeShader6.addExtraDrawCode = function(world, object) {
    now = Date.now();
    now *= 0.000000001;
    const elapsedTime = Math.min(now - then1, 0.01);
    time1 += elapsedTime;
    then1 = time1;
    world.GL.gl.uniform2f(object.shaderProgram.resolutionLocation, world.GL.gl.canvas.width, world.GL.gl.canvas.height);
    world.GL.gl.uniform1f(object.shaderProgram.TimeDelta, time1);
    world.GL.gl.uniform1f(object.shaderProgram.timeLocation, time1);
    // world.GL.gl.uniform1f(object.shaderProgram.iMouse, App.sys.MOUSE.x, App.sys.MOUSE.y, );
    world.GL.gl.uniform3f(object.shaderProgram.iMouse, App.sys.MOUSE.x, App.sys.MOUSE.y, (App.sys.MOUSE.PRESS != false ? 1 : 0));

    world.GL.gl.uniform1f(object.shaderProgram.XXX, osc_variable4.UPDATE())

    world.GL.gl.uniform1f(object.shaderProgram.R, osc_variable4.UPDATE())
    world.GL.gl.uniform1f(object.shaderProgram.G, osc_variable4.UPDATE())
    world.GL.gl.uniform1f(object.shaderProgram.B, osc_variable4.UPDATE())

    world.GL.gl.uniform1i(object.shaderProgram.iAppStatus, App.scene.CubeShader6.SHADER_APP_STATUS)
  }
  App.scene.CubeShader6.drawCustom = matrixEngine.standardMEShaderDrawer;

}