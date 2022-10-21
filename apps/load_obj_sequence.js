
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

  const createObjSequence = (objName) => {

    function onLoadObj(meshes) {
      App.meshes = meshes;

      for(let key in meshes) {
        matrixEngine.objLoader.initMeshBuffers(world.GL.gl, meshes[key]);
      }

      var textuteImageSamplers2 = {
        source: [
          "res/bvh-skeletal-base/swat-guy/textures/Ch15_1001_Diffuse.png",
          "res/bvh-skeletal-base/swat-guy/textures/Ch15_1001_Diffuse.png"
        ],
        mix_operation: "multiply", // ENUM : multiply , divide
      };

      setTimeout(function() {
        var animation_construct = {
          // stay for now
          id: objName,
          meshList: meshes,
          sumOfAniFrames: 61,
          currentAni: 0,
          speed: 3,
          // upgrade - optimal
          animations: {
            active: 'walk',
            walk: {
              from: 0,
              to: 35,
              speed: 3
            },
            walkPistol: {
              from: 36,
              to: 60,
              speed: 3
            }
          }
        };
        world.Add("obj", 1, objName,
          textuteImageSamplers2,
          meshes[objName],
          animation_construct
        );
        App.scene[objName].position.y = -1;
        App.scene[objName].position.z = -4;
        App.scene[objName].rotation.rotationSpeed.y = 50;
      }, 50);
    }

    matrixEngine.objLoader.downloadMeshes(
      matrixEngine.objLoader.makeObjSeqArg(
        {
          id: objName,
          path: "res/bvh-skeletal-base/swat-guy/anims/swat-multi",
          from: 1,
          to: 61
        }),
      onLoadObj
    );

  };

  window.createObjSequence = createObjSequence;

  // canvas.addEventListener('mousedown', (ev) => {
  //   matrixEngine.raycaster.checkingProcedure(ev);
  // });

  // addEventListener('ray.hit.event', function(e) {
  //   // Still not work for obj...
  //   console.info(e.detail.hitObject);
  //   e.detail.hitObject.glBlend.blendParamSrc = matrixEngine.utility.ENUMERATORS.glBlend.param[2];
  //   e.detail.hitObject.glBlend.blendParamDest = matrixEngine.utility.ENUMERATORS.glBlend.param[7];
  // });

  createObjSequence('player');

};
