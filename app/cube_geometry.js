/* eslint-disable no-unused-vars */

/**
 * @Author Nikola Lukic
 * @Description Matrix Engine Api Example.
 */

/* globals world App world */
import App from "../program/manifest";

export var runThis = world => {
  /* globals world App ENUMERATORS SWITCHER OSCILLATOR */

  var textuteImageSamplers = {
    source: ["res/images/complex_texture_1/diffuse.png"],
    mix_operation: "multiply",
  };

  world.Add("cubeLightTex", 1, "MyCubeTex", textuteImageSamplers);
  App.scene.MyCubeTex.rotation.rotationSpeed.z = 70;

  var oscilltor_variable = new OSCILLATOR(0.05, 2, 0.01);

  setInterval(function () {
    App.scene.MyCubeTex.geometry.setScale(oscilltor_variable.UPDATE());
  }, 10);
};
