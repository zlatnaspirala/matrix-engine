/**
 * @Author Nikola Lukic
 * @Description Matrix Engine Api Example.
 * First time adding direct different FShader.
 * Also mix divine two shader variants...
 */
import App from "../program/manifest.js";
import * as matrixEngine from "../index.js";
import {standardMEShaderDrawer, freeShadersToy} from "../lib/optimizer/buildin-shaders.js";
import {OSCILLATOR} from "../lib/utility.js";

const scriptManager = matrixEngine.utility.scriptManager;

export var runThis = world => {
  var textuteImageSamplers = {
    source: ["res/images/blue.png"],
    mix_operation: "multiply",
  }
  // sphereLightTex
  world.Add("squareTex", 1, "CubeShader", textuteImageSamplers);

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
  var promiseMyShader = scriptManager.loadGLSL('./res/shaders/lights/lights2.glsl')
  promiseMyShader.then((d) => {
    scriptManager.LOAD(d, "custom-s-shader-fs", "x-shader/x-fragment", "shaders", () => {
      App.scene.CubeShader.shaderProgram = world.initShaders(world.GL.gl, 'custom-s' + '-shader-fs', 'cubeLightTex' + '-shader-vs');

      App.scene.CubeShader.shaderProgram.XXX = world.GL.gl.getUniformLocation(App.scene.CubeShader.shaderProgram, "iXXX");
      App.scene.CubeShader.shaderProgram.R = world.GL.gl.getUniformLocation(App.scene.CubeShader.shaderProgram, "iR");
      App.scene.CubeShader.shaderProgram.G = world.GL.gl.getUniformLocation(App.scene.CubeShader.shaderProgram, "iG");
      App.scene.CubeShader.shaderProgram.B = world.GL.gl.getUniformLocation(App.scene.CubeShader.shaderProgram, "iB");

      
    })
  })

  var osc_r = new OSCILLATOR(0, 2, 0.001);
  var osc_g = new OSCILLATOR(0, 1, 0.001);
  var osc_b = new OSCILLATOR(0, 0.1, 0.01);
  var osc_variable = new OSCILLATOR(0, 150, 1);

  App.scene.CubeShader.rotation.rotationSpeed.y = 55
  App.scene.CubeShader.glBlend.blendEnabled = false

  App.scene.CubeShader.type = "custom-";
  var now = 1, time1 = 0, then1 = 0;

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

    
    world.GL.gl.uniform1f(object.shaderProgram.XXX, 1.0)

    world.GL.gl.uniform1f(object.shaderProgram.R, osc_variable.UPDATE())
    world.GL.gl.uniform1f(object.shaderProgram.G, osc_variable.UPDATE())
    world.GL.gl.uniform1f(object.shaderProgram.B, osc_variable.UPDATE())

  }
  App.scene.CubeShader.drawCustom = function(o) {
    return matrixEngine.standardMEShaderDrawer(o);
  }
}