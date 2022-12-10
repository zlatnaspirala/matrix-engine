/**
 * @Author Nikola Lukic
 * @Description Matrix Engine Api Example.
 */

/* globals world App world */
import App from "../program/manifest";
import * as matrixEngine from "../index.js";
import {anyCanvas} from "../lib/engine";
let Vjs3 = matrixEngine.Engine.Vjs3;

export var runThis = world => {
  /* globals ENUMERATORS world App Vjs3 E */

  let ENUMERATORS = matrixEngine.utility.ENUMERATORS;
  let E = matrixEngine.utility.E;

  // eslint-disable-next-line no-unused-vars
  var tex = {
    source: ["res/images/complex_texture_1/diffuse.png"],
    mix_operation: "multiply", // ENUM : multiply , divide ,
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
  setTimeout(function () {
    App.scene.outsideBox.streamTextures = new anyCanvas(
      "../apps/funny-slot/",
      "HELLO_WORLD")
    App.scene.outsideBox.streamTextures.showTextureEditor();
  }, 500);
};
