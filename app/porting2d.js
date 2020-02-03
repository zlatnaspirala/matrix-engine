/*
  Nikola Lukic
  webGl2GLmatrix2 api example
  app/canvas2d/build.html is visual-js 2d part program instance
*/

/* globals ENUMERATORS world App CANVAS2d_SURFACE_TEXTURE E */

// eslint-disable-next-line no-unused-vars
var textuteImageSamplers = {
  source : [    "res/images/complex_texture_1/diffuse.png"   ] ,
  mix_operation : "multiply" , // ENUM : multiply , divide ,
};

world.Add("cubeLightTex" , 12  , "outsideBox"  );

App.scene.outsideBox.position.y = 0;
App.scene.outsideBox.position.z = -55;
App.scene.outsideBox.rotation.rotationSpeed.z = 50;
App.scene.outsideBox.rotValue = 90;
App.scene.outsideBox.LightsData.ambientLight.set(1,1,1);
App.scene.outsideBox.glBlend.blendEnabled = true;
App.scene.outsideBox.glBlend.blendParamSrc =  ENUMERATORS.glBlend.param[4];
App.scene.outsideBox.glBlend.blendParamDest =  ENUMERATORS.glBlend.param[4];
App.scene.outsideBox.rotation.SetDirection(1,1,0.5);

/////////////////////////////////////////
// CANVAS2D_SURFACE - IS TEXTURE EDITOR
/////////////////////////////////////////

E("HOLDER_STREAMS").style.display = "block";
App.scene.outsideBox.streamTextures = new CANVAS2d_SURFACE_TEXTURE( "app/canvas2d/build.html" , "starter/run.js" );

setTimeout( function(){
  App.scene.outsideBox.streamTextures.showTextureEditor();
},1000);

