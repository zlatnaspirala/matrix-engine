/**
 *@Author Nikola Lukic
 *@Description webGl2GLmatrix2 api example
 */

/* globals world App */

var textuteImageSamplers = {
  source: [
    "res/images/complex_texture_1/diffuse.png",
    "res/images/texture_spiral1.png"
  ],
  mix_operation: "multiply"
};

world.Add("cubeLightTex", 1, "MyCubeTex", textuteImageSamplers);

setTimeout(function () {

  var textuteImageSamplers = {
    source: [
      "res/images/complex_texture_1/diffuse.png",
      "res/images/texture_spiral1.png",
      "res/images/icon2.png"
    ],
    mix_operation: "divide",
  };

  App.scene.MyCubeTex.changeMaterial(textuteImageSamplers);

}, 5000);
