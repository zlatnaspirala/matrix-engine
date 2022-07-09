/**
 * @Author Nikola Lukic
 * @Description Matrix Engine Api Example.
 */

/* globals world App world */
import App from "../program/manifest";
import * as matrixEngine from "../index.js";
let ENUMERATORS = matrixEngine.utility.ENUMERATORS;
let Vjs3 = matrixEngine.Engine.Vjs3;
let E = matrixEngine.utility.E;

export var runThis = world => {
  console.log("active editor")
  /* globals world App ENUMERATORS E Vjs3 */
  // eslint-disable-next-line no-unused-vars
  var textuteImageSamplers = {
    source: ["res/images/complex_texture_1/diffuse.png"],
    mix_operation: "multiply",
  };

  world.Add("cubeLightTex", 12, "outsideBox", textuteImageSamplers);
  App.scene.outsideBox.position.y = 0;
  App.scene.outsideBox.position.z = -55;
  // App.scene.outsideBox.rotation.rotationSpeed.z = 50;
  // App.scene.outsideBox.rotValue = 90;
  App.scene.outsideBox.LightsData.ambientLight.set(0, 0, 0);
  // App.scene.outsideBox.glBlend.blendEnabled = true;
  // App.scene.outsideBox.glBlend.blendParamSrc = ENUMERATORS.glBlend.param[4];
  // App.scene.outsideBox.glBlend.blendParamDest = ENUMERATORS.glBlend.param[4];
  App.scene.outsideBox.rotation.SetDirection(1, 1, 0.5);

  // CANVAS2D_SURFACE - IS TEXTURE EDITOR
  E("HOLDER_STREAMS").style.display = "block";

  App.scene.outsideBox.rotation.rotz = -90
  App.scene.outsideBox.streamTextures = new Vjs3(
    "./2DTextureEditor/actual.html",
    "actualTexture"
  );
  App.scene.outsideBox.streamTextures.showTextureEditor();
};
