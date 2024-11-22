/**
 * @Author Nikola Lukic
 * @Description Matrix Engine Api Example.
 * Test new feature for objLoader
 * Detecting groups with special name COLLIDER
 */

import App from "../program/manifest";

export var runThis = world => {

  function onLoadObj(meshes) {
    for(let key in meshes) { matrixEngine.objLoader.initMeshBuffers(world.GL.gl, meshes[key]) }

    var textuteImageSamplers2 = {
      source: ["res/images/armor.webp"],
      mix_operation: "multiply",
    };

    world.Add("obj", 1, "armor", textuteImageSamplers2, meshes.armor);
    App.scene.armor.position.y = 1;
    App.scene.armor.LightsData.ambientLight.set(1, 1, 1);
    App.scene.armor.position.z = -20;

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
    {armor: "res/3d-objects/env/doors/door1.obj"},
    onLoadObj,
    { swap: [0, 2] }
  );
};
