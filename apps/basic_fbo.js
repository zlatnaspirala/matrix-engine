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
    mix_operation: "multiply",
    params: {
      TEXTURE_MAG_FILTER: world.GL.gl.NEAREST,
      TEXTURE_MIN_FILTER: world.GL.gl.NEAREST
    }
  };

  world.Add("cubeLightTex", 0.2, "myCube", tex);
  App.scene.myCube.position.SetZ(-11);
  App.scene.myCube.position.SetX(1);
  App.scene.myCube.position.SetY(0.6);
  // App.scene.myCube.activateShadows('spot');

      var textuteImageSamplers2 = {
        source: [
          "res/bvh-skeletal-base/swat-guy/textures/Ch15_1001_Diffuse.png",
          "res/bvh-skeletal-base/swat-guy/textures/Ch15_1001_Diffuse.png"
        ],
        mix_operation: "multiply"
      };
  // Load obj seq animation
  const createObjSequence = (objName) => {

    function onLoadObj(meshes) {
      App.meshes = meshes;

      for(let key in meshes) {
        matrixEngine.objLoader.initMeshBuffers(world.GL.gl, meshes[key]);
      }

      var textuteImageSamplers2 = {
        source: [
          "res/bvh-skeletal-base/swat-guy/textures/Ch15_1001_Diffuse.png"
        ],
        mix_operation: "multiply", // ENUM : multiply , divide
        params: {
          TEXTURE_MAG_FILTER: world.GL.gl.NEAREST,
          TEXTURE_MIN_FILTER: world.GL.gl.NEAREST
        }
      };

      setTimeout(function() {
        var animArg = {
          id: objName,
          meshList: meshes,
          // sumOfAniFrames: 61, No need if `animations` exist!
          currentAni: 0,
          // speed: 3, No need if `animations` exist!
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
          animArg
        );
        App.scene[objName].position.y = -1;
        App.scene[objName].position.z = -2;
        App.scene[objName].rotation.rotationSpeed.y = 50;
      }, 1);
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

  createObjSequence('player');

  // FBO BASIC
  world.Add("squareTex", 3, "myMirror", tex);
  App.scene.myMirror.position.SetZ(-12);
  App.scene.myMirror.position.SetX(0);
  App.scene.myMirror.position.SetY(0);
  App.scene.myMirror.setFBO();

  world.Add("cubeLightTex", 0.5, "myMirrorBottom", tex);
  App.scene.myMirrorBottom.position.SetZ(-5);
  App.scene.myMirrorBottom.position.SetX(2);
  App.scene.myMirrorBottom.position.SetY(2);
  App.scene.myMirrorBottom.rotation.rotx = 20
  // App.scene.myMirrorBottom.setFBO();

  // App.scene.myMirror.rotation.rotationSpeed.z = 10;
  App.scene.myMirrorBottom.activateShadows();

  // TEST ALSO ANIMATIONLINE
  matrixEngine.matrixWorld.world.useAnimationLine({ sequenceSize: 500 });

  // Click event
  canvas.addEventListener('mousedown', (ev) => {
    matrixEngine.raycaster.checkingProcedure(ev);
  });

  addEventListener("ray.hit.event", function(e) {
    e.detail.hitObject.LightsData.ambientLight.r =
      matrixEngine.utility.randomFloatFromTo(0, 2);
    e.detail.hitObject.LightsData.ambientLight.g =
      matrixEngine.utility.randomFloatFromTo(0, 2);
    e.detail.hitObject.LightsData.ambientLight.b =
      matrixEngine.utility.randomFloatFromTo(0, 2);
    // console.info(e.detail);
  });

};
