/**
 * @Author Nikola Lukic
 * @Description Matrix Engine Api Example.
 * First time adding direct different FShader.
 * Also mix divine two shader variants...
 */
import App from "../program/manifest.js";
import * as matrixEngine from "../index.js";
import {toyShader, standardMatrixEngineShader, buildinShaders} from "../lib/optimizer/buildin-shaders.js";

const scriptManager = matrixEngine.utility.scriptManager;

export var runThis = world => {
  var textuteImageSamplers = {
    source: ["res/images/RustPaint.jpg"],
    mix_operation: "multiply",
  }
  // App.camera.FirstPersonController = true
  // sphereLightTex  cubeLightTex
  world.Add("cubeLightTex", 1.3, "ToyShader", textuteImageSamplers);

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
  
  scriptManager.LOAD(buildinShaders.shaderTest(), "custom-toy2-shader-fs", "x-shader/x-fragment", "shaders", () => {
    App.scene.ToyShader.shaderProgram = world.initShaders(world.GL.gl, 'custom-toy2' + '-shader-fs', 'cubeLightTex' + '-shader-vs');
  })

  // App.scene.ToyShader.rotation.rotationSpeed.y = 55
  App.scene.ToyShader.glBlend.blendEnabled = false

  App.scene.ToyShader.type = "custom-";
  var now = 1, time1 = 0, then1 = 0;

  App.scene.ToyShader.MY_RAD = 0.5;

  App.scene.ToyShader.addExtraDrawCode = function (world, object) {
    now = Date.now();
    now *= 0.00001;
    const elapsedTime = Math.min(now - then1, 0.1);
    time1 += elapsedTime;
    then1 = time1;
    world.GL.gl.uniform2f(object.shaderProgram.resolutionLocation, world.GL.gl.canvas.width, world.GL.gl.canvas.height);
    world.GL.gl.uniform1f(object.shaderProgram.TimeDelta, time1);
    world.GL.gl.uniform1f(object.shaderProgram.timeLocation, time1);
    // world.GL.gl.uniform1f(object.shaderProgram.timeLocation, time1);
    // world.GL.gl.uniform1f(object.shaderProgram.matrixSkyRad, App.scene.ToyShader.MY_RAD);
  }
  App.scene.ToyShader.drawCustom = function (o) {
    return standardMatrixEngineShader(o);
  }
}