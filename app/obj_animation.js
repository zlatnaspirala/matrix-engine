/*
  Nikola Lukic
  webGl2GLmatrix2 api example
  app/canvas2d/build.html is visual-js 2d part program instance
*/

/* globals world App OBJ */

// LOAD MESH FROM OBJ FILES...
// if you dont use obj or complex mesh you no need for this func

function onLoadObj(meshes){

  App.meshes = meshes;
  OBJ.initMeshBuffers(world.GL.gl, App.meshes.female);
  OBJ.initMeshBuffers(world.GL.gl, App.meshes.female1);
  OBJ.initMeshBuffers(world.GL.gl, App.meshes.female2);
  OBJ.initMeshBuffers(world.GL.gl, App.meshes.female3);
  OBJ.initMeshBuffers(world.GL.gl, App.meshes.female4);
  OBJ.initMeshBuffers(world.GL.gl, App.meshes.female5);
  OBJ.initMeshBuffers(world.GL.gl, App.meshes.female6);
  OBJ.initMeshBuffers(world.GL.gl, App.meshes.female7);
  OBJ.initMeshBuffers(world.GL.gl, App.meshes.female8);
  OBJ.initMeshBuffers(world.GL.gl, App.meshes.female9);
  OBJ.initMeshBuffers(world.GL.gl, App.meshes.female10);
  OBJ.initMeshBuffers(world.GL.gl, App.meshes.female11);
  OBJ.initMeshBuffers(world.GL.gl, App.meshes.female12);
  OBJ.initMeshBuffers(world.GL.gl, App.meshes.female13);
  OBJ.initMeshBuffers(world.GL.gl, App.meshes.female14);
  OBJ.initMeshBuffers(world.GL.gl, App.meshes.female15);
  OBJ.initMeshBuffers(world.GL.gl, App.meshes.female16);
  OBJ.initMeshBuffers(world.GL.gl, App.meshes.female17);
  OBJ.initMeshBuffers(world.GL.gl, App.meshes.female18);

  var textuteImageSamplers2 = {
    source : [    "res/images/RustPaint.jpg"        ] ,
    mix_operation : "multiply" , // ENUM : multiply , divide
  };

  setTimeout( function() {

    var animation_construct = {
      id : "female",
      sumOfAniFrames : 18 ,
      currentAni : 0 ,
      speed : 3,
    };

    world.Add("obj" , 1 ,"female" , textuteImageSamplers2 , App.meshes.female , animation_construct );

    App.scene.female.position.y = -3;
    App.scene.female.rotation.rotationSpeed.z = 20;
    App.scene.female.position.z = -13;

  },100);

}

OBJ.downloadMeshes({
  "female": "res/3d-objects/female/female_000001.obj",
  "female1": "res/3d-objects/female/female_000003.obj",
  "female2": "res/3d-objects/female/female_000005.obj",
  "female3": "res/3d-objects/female/female_000007.obj",
  "female4": "res/3d-objects/female/female_000009.obj",
  "female5": "res/3d-objects/female/female_000011.obj",
  "female6": "res/3d-objects/female/female_000013.obj",
  "female7": "res/3d-objects/female/female_000015.obj",
  "female8": "res/3d-objects/female/female_000017.obj",
  "female9": "res/3d-objects/female/female_000019.obj",
  "female10": "res/3d-objects/female/female_000021.obj",
  "female11": "res/3d-objects/female/female_000023.obj",
  "female12": "res/3d-objects/female/female_000025.obj",
  "female13": "res/3d-objects/female/female_000027.obj",
  "female14": "res/3d-objects/female/female_000029.obj",
  "female15": "res/3d-objects/female/female_000031.obj",
  "female16": "res/3d-objects/female/female_000033.obj",
  "female17": "res/3d-objects/female/female_000035.obj",
  "female18": "res/3d-objects/female/female_000037.obj",
} , onLoadObj  );

//delete images_local_var;

