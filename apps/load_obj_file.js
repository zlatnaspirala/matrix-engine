/* eslint-disable no-unused-vars */

/**
 * @Author Nikola Lukic
 * @Description Matrix Engine Api Example.
 */

import App from "../program/manifest";

export var runThis = world => {

  // if you dont use obj or complex mesh you no need for this func
  function onLoadObj(meshes) {
    App.meshes = meshes;
    matrixEngine.objLoader.initMeshBuffers(world.GL.gl, App.meshes.armor);
    matrixEngine.objLoader.initMeshBuffers(world.GL.gl, App.meshes.mac);

    var textuteImageSamplers2 = {
      source: ["res/images/armor.png", "res/images/armor.png"],
      mix_operation: "multiply",
    };

    var textuteImageSamplers = {
      source: ["res/images/dagger.png"],
      mix_operation: "multiply",
    };

    world.Add("obj", 1, "armor", textuteImageSamplers2, App.meshes.armor);
    App.scene.armor.position.y = 1;
    App.scene.armor.rotation.rotationSpeed.y = 20;
    App.scene.armor.LightsData.ambientLight.set(1, 1, 1);
    App.scene.armor.position.z = -6;
    // App.scene.armor.mesh.setScale(3)
    
    setTimeout( () => { 
      App.scene.armor.activateShadows('spot')
      App.scene.mac.activateShadows('spot')
      // App.scene.armor.shadows.activeUpdate();
      // App.scene.armor.shadows.animatePositionY();
    }, 2000)
    

    // world.Add("cubeLightTex", 1, "MyCubeTex", textuteImageSamplers2);
    // App.scene.MyCubeTex.activateShadows()
    // App.scene.MyCubeTex.position.y = -1;
    // App.scene.MyCubeTex.position.z = -16;

    world.Add("obj", 1, "mac", textuteImageSamplers, App.meshes.mac);
    App.scene.mac.position.y = 1;
    App.scene.mac.position.x = -2;
    App.scene.mac.rotation.rotationSpeed.y = 20;
    App.scene.mac.LightsData.ambientLight.set(1, 1, 1);
  }

  /**
   * @description
   * For swap (initial orientation for object) use combination of
   * swap[0,1]
   * swap[0,2]
   * swap[1,3]
   * to switch x,y,z verts.
   */
  matrixEngine.objLoader.downloadMeshes(
    {armor: "res/3d-objects/armor.obj", mac: "res/3d-objects/mac.obj"},
    onLoadObj,
    { swap: [0, 2] }
  );

  //delete images_local_var;
};
