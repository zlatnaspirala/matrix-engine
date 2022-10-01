/* eslint-disable no-unused-vars */

/**
 * @Author Nikola Lukic
 * @Description Matrix Engine Api Example.
 */

/* globals world App world */
import App from "../program/manifest";
import * as matrixEngine from "../index.js";
let OSCILLATOR = matrixEngine.utility.OSCILLATOR;

export var runThis = world => {
  /* globals world App ENUMERATORS SWITCHER OSCILLATOR */

  var textuteImageSamplers = {
    source: ["res/images/complex_texture_1/diffuse.png"],
    mix_operation: "multiply",
  };

  world.Add("pyramid", 1, "MyCubeTex");

  world.Add("square", 1, "MyColoredSquare1");

  // Must be activate
  matrixEngine.Engine.activateNet();


  // Must be activate for scene objects also.
  // This is only to force avoid unnecessary networking emit!
  App.scene.MyCubeTex.net.enable = true;
  App.scene.MyCubeTex.net.activate();
  
  App.scene.MyColoredSquare1.net.enable = true;
  App.scene.MyColoredSquare1.net.activate();

  App.scene.MyCubeTex.position.SetZ(-8)
  
  // var oscilltor_variable = new OSCILLATOR(0.1, 3, 0.004);
  // App.scene.MyCubeTex.rotation.rotationSpeed.z = 70;
  // App.scene.MyCubeTex.LightsData.ambientLight.set(0.1, 1, 0.1);
  // setInterval(function () {
  //   App.scene.MyCubeTex.LightsData.ambientLight.r = oscilltor_variable.UPDATE();
  //   App.scene.MyCubeTex.LightsData.ambientLight.b = oscilltor_variable.UPDATE();
  // }, 10);

};
