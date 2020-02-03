/*
  Nikola Lukic
  webGl2GLmatrix2 api example
*/
/* globals App world VIDEO_TEXTURE ENUMERATORS */

// eslint-disable-next-line no-unused-vars
var textuteImageSamplers = {
  source : [    "res/images/complex_texture_1/diffuse.png"   ] ,
  mix_operation : "multiply" , // ENUM : multiply , divide ,
};

world.Add("cubeLightTex" , 12  , "outsideBox"  );

App.scene.outsideBox.position.y = 0;
App.scene.outsideBox.position.z = -4;
App.scene.outsideBox.rotation.rotationSpeed.z = 50;
App.scene.outsideBox.rotValue = 90;
App.scene.outsideBox.LightsData.ambientLight.set(1,1,1);
App.scene.outsideBox.streamTextures = new VIDEO_TEXTURE( "Electric_sheep_a_facinating_animated_flame_fractal.mp4" );
App.scene.outsideBox.glBlend.blendEnabled = true;
App.scene.outsideBox.glBlend.blendParamSrc =  ENUMERATORS.glBlend.param[4];
App.scene.outsideBox.glBlend.blendParamDest =  ENUMERATORS.glBlend.param[4];
App.scene.outsideBox.rotation.SetDirection(1,1,0.5);
