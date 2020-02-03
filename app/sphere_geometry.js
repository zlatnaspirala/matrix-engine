/*
  Nikola Lukic
  webGl2GLmatrix2 api example
*/

/* globals App world */
var textuteImageSamplers = {
  source : [    "res/images/complex_texture_1/diffuse.png"   ] ,
  mix_operation : "multiply" , // ENUM : multiply , divide
};

world.Add("sphereLightTex" , 2  , "MySphere" , textuteImageSamplers );

App.scene.MySphere.position.z = -10;
