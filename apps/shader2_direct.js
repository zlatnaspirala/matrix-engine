/**
 * @Author Nikola Lukic
 * @Description Matrix Engine Api Example.
 * First time adding direct different FShader.
 * Also mix divine two shader variants...
 */
import App from "../program/manifest.js";
import * as matrixEngine from "../index.js";
import {standardMEShaderDrawer, freeShadersToy} from "../lib/optimizer/buildin-shaders.js";

const scriptManager = matrixEngine.utility.scriptManager;

export var runThis = world => {
  var textuteImageSamplers = {
    source: ["res/images/blue.png"],
    mix_operation: "multiply",
  }
  // sphereLightTex
  world.Add("squareTex", 1, "ToyShader", textuteImageSamplers);

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
  var promiseMyShader = scriptManager.loadGLSL('../lib/optimizer/custom-shaders/circle.glsl')
  promiseMyShader.then((d) => {
    scriptManager.LOAD(d, "custom-toy1-shader-fs", "x-shader/x-fragment", "shaders", () => {
      App.scene.ToyShader.shaderProgram = world.initShaders(world.GL.gl, 'custom-toy1' + '-shader-fs', 'cubeLightTex' + '-shader-vs');
    })
  })

  App.scene.ToyShader.rotation.rotationSpeed.y = 55
  App.scene.ToyShader.glBlend.blendEnabled = false

  App.scene.ToyShader.type = "custom-";
  var now = 1, time1 = 0, then1 = 0;

  App.scene.ToyShader.MY_RAD = 0.5;

  App.scene.ToyShader.addExtraDrawCode = function(world, object) {
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

  }
  App.scene.ToyShader.drawCustom = function(o) {
    return matrixEngine.standardMEShaderDrawer(o);
  }
}