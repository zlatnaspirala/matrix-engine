/**
 *@Author Nikola Lukic
 *@Description webGl2 api example
 */

/* globals world App */

var textuteImageSamplers = {
  source: ["res/images/complex_texture_1/diffuse.png", "res/images/texture_spiral1.png"],
  mix_operation: "multiply", // ENUM : multiply , divide ,
};

world.Add("cubeLightTex", 1, "MyCubeTex", textuteImageSamplers);

setTimeout(function () {

  var textuteImageSamplers = {
    source: ["res/images/complex_texture_1/diffuse.png", "res/images/texture_spiral1.png", "res/images/icon2.png"],
    mix_operation: "divide", // ENUM : multiply , divide
  };

  App.scene.MyCubeTex.changeMaterial(textuteImageSamplers);

}, 5000);

// SET POSITION
//App.scene.MyTriangle.position.SetX(2.5);
//App.scene.MySquare.position.SetX(-2.5);
//App.scene.MyCubeTex.position.SetY(1);
//App.scene.MyPyramid.position.SetY(-2.5);
