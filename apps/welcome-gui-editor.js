/* eslint-disable no-unused-vars */

/**
 * @Author Nikola Lukic
 * @Description Matrix Engine Api Example.
 */

/* globals world App world */
import App from "../program/manifest.js";
import * as matrixEngine from "../index.js";
let OSCILLATOR = matrixEngine.utility.OSCILLATOR;

export var runThis = world => {
  /* globals world App ENUMERATORS SWITCHER OSCILLATOR */

  var textuteImageSamplers = {
    source: ["res/images/gui/welcome.png"],
    mix_operation: "multiply",
  };

  world.Add("cubeLightTex", -1, "MyCubeTex", textuteImageSamplers);

  var oscilltor_variable = new OSCILLATOR(0.1, 3, 0.004);
  App.scene.MyCubeTex.rotation.rotx = 90;
  App.scene.MyCubeTex.rotation.rotationSpeed.z = 5;
  App.scene.MyCubeTex.LightsData.ambientLight.set(0.1, 1, 0.1);

  App.scene.MyCubeTex.glBlend.blendEnabled = true
  App.scene.MyCubeTex.glBlend.blendParamSrc = matrixEngine.utility.ENUMERATORS.glBlend.param[5];
  App.scene.MyCubeTex.glBlend.blendParamDest = matrixEngine.utility.ENUMERATORS.glBlend.param[4];

  setInterval(function () {
    App.scene.MyCubeTex.LightsData.ambientLight.r = oscilltor_variable.UPDATE();
    App.scene.MyCubeTex.LightsData.ambientLight.b = oscilltor_variable.UPDATE();
  }, 10);
};
