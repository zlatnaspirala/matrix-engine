import * as matrixEngine from '../index.js';
import App from "../program/manifest.js";
import {anyCanvas} from "../lib/engine.js";
let Vjs3 = matrixEngine.Engine.Vjs3;
var world;

if('serviceWorker' in navigator) {
  window.addEventListener('load', function(e) {
    // navigator.serviceWorker.register('worker.js');
    App.ready = true;
    matrixEngine.Engine.initApp(webGLStart);
  })
} else {
  console.warn('Matrix Engine: No support for web workers in this browser.');
}

var runThis = world => {
  let ENUMERATORS = matrixEngine.utility.ENUMERATORS;
  let E = matrixEngine.utility.E;
  var tex = {
    source: ["res/images/complex_texture_1/diffuse.png"],
    mix_operation: "multiply",
  };

  world.Add("cubeLightTex", 12, "outsideBox", tex);
  App.scene.outsideBox.position.y = 0;
  App.scene.outsideBox.position.z = -55;
  App.scene.outsideBox.rotation.rotationSpeed.x = 20;
  App.scene.outsideBox.rotation.rotationSpeed.y = 5;
  // App.scene.outsideBox.rotValue = 90;
  App.scene.outsideBox.LightsData.ambientLight.set(1, 1, 1);
  // App.scene.outsideBox.glBlend.blendEnabled = true;
  App.scene.outsideBox.glBlend.blendParamSrc = ENUMERATORS.glBlend.param[4];
  App.scene.outsideBox.glBlend.blendParamDest = ENUMERATORS.glBlend.param[4];
  App.scene.outsideBox.rotation.SetDirection(1, 1, 0.5);
  App.scene.outsideBox.rotation.rotz = -90

  /////////////////////////////////////////
  // CANVAS2D_SURFACE - IS TEXTURE EDITOR
  /////////////////////////////////////////
  E("HOLDER_STREAMS").style.display = "block";
  setTimeout(function() {
    App.scene.outsideBox.streamTextures = new anyCanvas(
      "../../2DTextureEditor/templates/slot/",
      "HELLO_WORLD")
    App.scene.outsideBox.streamTextures.showTextureEditor();
  }, 500);
};

window.webGLStart = () => {
  world = matrixEngine.matrixWorld.defineworld(canvas);
  world.callReDraw();
  // dev
  window.App = App;
  runThis(world)
};

window.matrixEngine = matrixEngine;