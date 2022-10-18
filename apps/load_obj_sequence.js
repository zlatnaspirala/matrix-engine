
/**
 * @description Usage of MEBvhAnimation with switch system.
 * Adding improved deleting procedure for scene object.
 * @class MEBvhAnimation
 * @arg filePath
 * @arg options
 */

import App from '../program/manifest';

export var runThis = (world) => {

  // Camera
  App.camera.SceneController = true;

  const createObjSequence = () => {

    function onLoadObj(meshes) {
      App.meshes = meshes;

      for (let key in meshes) {
        matrixEngine.objLoader.initMeshBuffers(world.GL.gl, meshes[key]);
      }

      var textuteImageSamplers2 = {
        source: ["res/bvh-skeletal-base/test.png"],
        mix_operation: "multiply", // ENUM : multiply , divide
      };

      setTimeout(function () {
        var animation_construct = {
          id: "yBot",
          sumOfAniFrames: 27,
          currentAni: 0,
          speed: 3,
        };
        world.Add("obj", 1, "yBot",
          textuteImageSamplers2,
          App.meshes.yBot,
          animation_construct
        );
        App.scene.yBot.position.y = -1;
        App.scene.yBot.position.z = -4;
      }, 100);
    }

    matrixEngine.objLoader.downloadMeshes(
      matrixEngine.objLoader.makeObjSeqArg(
        { id: "yBot",
          path: "res/bvh-skeletal-base/y-bot/obj-seq/low/y-bot-origin",
          from : 1, to: 28 }),
      onLoadObj
    );

  };

  window.createObjSequence = createObjSequence;

  canvas.addEventListener('mousedown', (ev) => {
    matrixEngine.raycaster.checkingProcedure(ev);
  });

  addEventListener('ray.hit.event', function (e) {
    console.info(e.detail.hitObject);
    e.detail.hitObject.glBlend.blendParamSrc = matrixEngine.utility.ENUMERATORS.glBlend.param[2];
    e.detail.hitObject.glBlend.blendParamDest = matrixEngine.utility.ENUMERATORS.glBlend.param[7];
  });

  createObjSequence();

};
