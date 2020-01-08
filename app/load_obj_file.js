/* eslint-disable no-unused-vars */

/*
  Nikola Lukic
  webGl2 api example
  app/canvas2d/build.html is visual-js 2d part program instance
*/

/* globals world App ENUMERATORS SWITCHER OSCILLATOR OBJ */

// LOAD MESH FROM OBJ FILES...
// if you dont use obj or complex mesh you no need for this func

function onLoadObj(meshes){

  App.meshes = meshes;
  OBJ.initMeshBuffers(world.GL.gl, App.meshes.armor);
  OBJ.initMeshBuffers(world.GL.gl, App.meshes.mac);

  var textuteImageSamplers2 = {
    source : [    "res/images/armor.png"     ] ,
    mix_operation : "multiply" , // ENUM : multiply , divide ,
  };

  var textuteImageSamplers = {
    source : [    "res/images/dagger.png"     ] ,
    mix_operation : "multiply" , // ENUM : multiply , divide ,
  };

  world.Add("obj" , 1 ,"armor" , textuteImageSamplers2 , App.meshes.armor );

  App.scene.armor.position.y = 1;
  App.scene.armor.rotationSpeed = 20;
  App.scene.armor.LightsData.ambientLight.set(1,1,1);

  world.Add("obj" , 1 ,"mac" , textuteImageSamplers , App.meshes.mac );

  App.scene.mac.position.y = 1;
  App.scene.mac.position.x = -2;
  App.scene.mac.rotationSpeed = 20;
  App.scene.mac.LightsData.ambientLight.set(1,1,1);

}

OBJ.downloadMeshes({"armor": "res/3d-objects/armor.obj" , "mac" : "res/3d-objects/mac.obj"  } , onLoadObj  );

//delete images_local_var;
