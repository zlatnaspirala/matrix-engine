/* eslint-disable no-unused-vars */

/*
  Nikola Lukic
  webGl2GLmatrix2 api example
*/

/* globals world App ENUMERATORS SWITCHER OSCILLATOR OBJ ACCESS_CAMERA */

var textuteImageSamplers = {
  source: ["res/images/complex_texture_1/diffuse.png"],
  mix_operation: "multiply",
};

function onLoadObj(meshes){

  App.meshes = meshes;
  OBJ.initMeshBuffers(world.GL.gl, App.meshes.TV);

  setTimeout( function() {

    world.Add("obj" , 1 ,"TV" , textuteImageSamplers , App.meshes.TV );
    App.scene.TV.position.y = 0;
    App.scene.TV.position.z = -4;
    App.scene.TV.rotation.rotateY(90);
    App.scene.TV.LightsData.ambientLight.set(1,1,1);
    App.scene.TV.streamTextures = new ACCESS_CAMERA( "webcam_beta" );

  },1000);

}

OBJ.downloadMeshes({"TV": "res/3d-objects/balltest2.obj"}, onLoadObj);
