/* eslint-disable no-unused-vars */

/*
  Nikola Lukic
  webGl2GLmatrix2 api example
*/

/* globals world App ENUMERATORS SWITCHER OSCILLATOR */

var textuteImageSamplers = {
  source: ["res/images/complex_texture_1/diffuse.png"],
  mix_operation: "multiply"
};

world.Add("cubeLightTex", 1, "MyCubeTex", textuteImageSamplers);
App.scene.MyCubeTex.rotation.rotationSpeed.z = 70;

var oscilltor_variable = new OSCILLATOR(0.05 , 2 , 0.01);

setInterval(function(){

  App.scene.MyCubeTex.geometry.setScale(oscilltor_variable.UPDATE());

} , 10);
