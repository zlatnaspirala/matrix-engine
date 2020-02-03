/* eslint-disable no-unused-vars */

/*
  Nikola Lukic
  webGl2GLmatrix2 api example
*/

/* globals world App ENUMERATORS SWITCHER OSCILLATOR */

var textuteImageSamplers = {
  source: ["res/images/complex_texture_1/diffuse.png"],
  mix_operation : "multiply"
};

world.Add("cubeLightTex", 1, "MyCubeTex", textuteImageSamplers);

var oscilltor_variable = new OSCILLATOR(0.1, 3, 0.004);
App.scene.MyCubeTex.rotation.rotationSpeed.z = 70;
App.scene.MyCubeTex.LightsData.ambientLight.set(0.1,1,0.1);

setInterval(function() {

  App.scene.MyCubeTex.LightsData.ambientLight.r = oscilltor_variable.UPDATE();
  App.scene.MyCubeTex.LightsData.ambientLight.b = oscilltor_variable.UPDATE();

}, 10);
