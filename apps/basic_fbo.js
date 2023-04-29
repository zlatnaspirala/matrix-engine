/**
 *@Author Nikola Lukic
 *@Description Matrix Engine Api Example
  @name basic_FBO
 */

import App from "../program/manifest";

export var runThis = (world) => {

  // Camera
  App.camera.SceneController = true;

  // Image texs
  var tex = {
    source: ["res/images/complex_texture_1/diffuse.png"],
    mix_operation: "multiply"
  };

  world.Add("cubeLightTex", 0.2, "myCube", tex);
  App.scene.myCube.position.SetZ(-11);
  App.scene.myCube.position.SetX(1);
  App.scene.myCube.position.SetY(0.6);
  // App.scene.myCube.activateShadows('spot');

  // Load obj seq animation
  const createObjSequence = (objName) => {

    function onLoadObj(meshes) {
      for(let key in meshes) {
        matrixEngine.objLoader.initMeshBuffers(world.GL.gl, meshes[key]);
      }
      var textuteImageSamplers2 = {
        source: ["res/bvh-skeletal-base/swat-guy/gun2.png"],
        mix_operation: "multiply"
      };
      // Hands - in future will be weapon
      // world.Add("obj", 1, objName, textuteImageSamplers2, meshes[objName], animArg);
      world.Add("obj", 1, objName, textuteImageSamplers2, meshes['player']);
      App.scene.player.position.setPosition(0.5, -0.7, -3);
      App.scene.player.isHUD = true;
      // Fix object orientation - this can be fixed also in blender.
      matrixEngine.Events.camera.yaw = 0;
      for(let key in App.scene.player.meshList) {
        App.scene.player.meshList[key].setScale(1.85);
      }
    }
    matrixEngine.objLoader.downloadMeshes({player: "res/bvh-skeletal-base/swat-guy/gun2.obj"}, onLoadObj);
  };

  createObjSequence('player');

  // FBO BASIC
  world.Add("squareTex", 5, "myCube5", tex);
  App.scene.myCube5.position.SetZ(-12);
  App.scene.myCube5.position.SetX(0);
  App.scene.myCube5.position.SetY(0);
  App.scene.myCube5.setFBO()
  // App.scene.myCube5.activateShadows('spot');
  
  // Click event
  canvas.addEventListener('mousedown', (ev) => {
    matrixEngine.raycaster.checkingProcedure(ev);
  });

  addEventListener("ray.hit.event", function(e) {
    e.detail.hitObject.LightsData.ambientLight.r =
      matrixEngine.utility.randomFloatFromTo(0, 10);
    e.detail.hitObject.LightsData.ambientLight.g =
      matrixEngine.utility.randomFloatFromTo(0, 10);
    e.detail.hitObject.LightsData.ambientLight.b =
      matrixEngine.utility.randomFloatFromTo(0, 10);
    console.info(e.detail);
  });

};
