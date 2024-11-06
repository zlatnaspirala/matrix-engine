/**
 * @Author Nikola Lukic
 * @Description Matrix Engine Api Example.
 */
import App from "../program/manifest";
import * as matrixEngine from "../index.js";
let OSCILLATOR = matrixEngine.utility.OSCILLATOR;

export var runThis = world => {
  var textuteImageSamplers = {
    source: ["res/images/complex_texture_1/diffuse.webp"],
    mix_operation: "multiply",
  };

  world.Add("cubeLightTex", 1, "MyCubeTex", textuteImageSamplers);

  var oscilltor_variable = new OSCILLATOR(0.1, 3, 0.004);
  App.scene.MyCubeTex.rotation.rotationSpeed.z = 70;
  App.scene.MyCubeTex.LightsData.ambientLight.set(0.1, 1, 0.1);

  // GOOD
  App.updateBeforeDraw.push({
    UPDATE: () => {
      App.scene.MyCubeTex.LightsData.ambientLight.r = oscilltor_variable.UPDATE();
      App.scene.MyCubeTex.LightsData.ambientLight.b = oscilltor_variable.UPDATE();
    }
  });

  // BAD
  // setInterval(function () {
  // App.scene.MyCubeTex.LightsData.ambientLight.r = oscilltor_variable.UPDATE();
  // App.scene.MyCubeTex.LightsData.ambientLight.b = oscilltor_variable.UPDATE();
  // }, 10);
};
