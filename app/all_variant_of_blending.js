/* eslint-disable no-unused-vars */

/*
  Nikola Lukic
  webGl2 api example
*/

/* globals world App ENUMERATORS SWITCHER OSCILLATOR OBJ ACCESS_CAMERA Galactic*/

var textuteImageSamplers2 = {
  source: ["res/images/semi_pack/gradiend_half1.png"],
  mix_operation: "multiply" , // ENUM : multiply , divide ,
};

var textuteImageSamplers = {
  source: ["res/images/semi_pack/gradiend_half2.png"],
  mix_operation: "multiply", // ENUM : multiply , divide
};

world.Add("cubeLightTex" , 15 ,"cube" , textuteImageSamplers2  );

App.scene.cube.position.z = -13;
App.scene.cube.rotationSpeed = 10;

App.scene.cube.glBlend.blendParamSrc =  ENUMERATORS.glBlend.param[4];
App.scene.cube.glBlend.blendParamDest =  ENUMERATORS.glBlend.param[4];

for (var f=0;f < ENUMERATORS.glBlend.param.length  ; f++) {

  // for (var d=0;d < ENUMERATORS.glBlend.param.length-5  ; d++) {
  world.Add("cubeLightTex" , 0.65 ,"test" + f  , textuteImageSamplers   );
  // world.Add("squareTex" , 0.45 ,"test" + f  , textuteImageSamplers   );
  eval( "App.scene.test"+f+".glBlend.blendEnabled = true" );
  eval( "App.scene.test"+f+".rotationSpeed = 20" );
  eval( "App.scene.test"+f+".position.y =  f - 5.5 " );
  eval( "App.scene.test"+f+".position.z =  -13 " );
  eval( "App.scene.test"+f+".position.x =  f - 5 " );
  eval( "App.scene.test"+f+".glBlend.blendParamSrc =  ENUMERATORS.glBlend.param["+ f +"] " );
  eval( "App.scene.test"+f+".glBlend.blendParamDest =  ENUMERATORS.glBlend.param[" + 4 +"] " );
  // }

}
