
/**
 * @description Usage of MEBvhAnimation with switch system.
 * Adding improved deleting procedure for scene object.
 * @class MEBvhAnimation
 * @arg filePath
 * @arg options
 */

import App from '../program/manifest';
import * as CANNON from 'cannon';

export var runThis = (world) => {

  // Camera
  // App.camera.SceneController = true;
  App.camera.FirstPersonController = true;
  App.camera.speedAmp = 0.01

  matrixEngine.Events.camera.yPos = 15;


  const createObjSequence = (objName) => {

    function onLoadObj(meshes) {

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
        var animArg = {
          id: objName,
          meshList: meshes,
          // sumOfAniFrames: 61, No need if `animations` exist!
          currentAni: 0,
          // speed: 3, No need if `animations` exist!
          // upgrade - optimal
          animations: {
            active: 'walkPistol',
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

        // App.scene[objName].position.y = -1;
        // App.scene[objName].position.z = -4;

        matrixEngine.Events.camera.yaw = 180

        var playerUpdater = {
          UPDATE: () => {
            App.scene[objName].position.setPosition(
              matrixEngine.Events.camera.xPos,
              matrixEngine.Events.camera.yPos - 1.3,
              matrixEngine.Events.camera.zPos
            )

            App.scene[objName].rotation.rotateY(
            matrixEngine.Events.camera.yaw + 180)

          }
        };
        App.updateBeforeDraw.push(playerUpdater);


        for ( let key in App.scene.player.meshList) {
          App.scene.player.meshList[key].setScale(0.7)
        }


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


  // Some scene env
  var tex = {
    source: ["res/images/complex_texture_1/diffuse.png"],
    mix_operation: "multiply",
  };

  // Load Physics world!
  let gravityVector = [0, 0, -9.82];
  let physics = world.loadPhysics(gravityVector);
  // Add ground
  // physics.addGround(App, world, tex);
  var groundBody = new CANNON.Body({
    mass: 0, // mass == 0 makes the body static
    position: new CANNON.Vec3(0, -15, -2)
  });
  var groundShape = new CANNON.Plane();
  groundBody.addShape(groundShape);
  physics.world.addBody(groundBody);
  // matrix engine visual
  world.Add("squareTex", 1, "FLOOR_STATIC", tex);
  App.scene.FLOOR_STATIC.geometry.setScaleByX(200);
  App.scene.FLOOR_STATIC.geometry.setScaleByY(200);
  App.scene.FLOOR_STATIC.position.SetY(-2);
  App.scene.FLOOR_STATIC.position.SetZ(-15);
  App.scene.FLOOR_STATIC.rotation.rotx = 90;

  // world.Add("cubeLightTex", 1, "CUBE", tex);
  // var b = new CANNON.Body({
  //   mass: 5,
  //   position: new CANNON.Vec3(0, -15, 2),
  //   shape: new CANNON.Box(new CANNON.Vec3(1, 1, 1))
  // });
  // physics.world.addBody(b);
  // // Physics
  // App.scene.CUBE.physics.currentBody = b;
  // App.scene.CUBE.physics.enabled = true;

  const objGenerator = (n) => {
    for(var j = 0;j < n;j++) {

      setTimeout(() => {
        world.Add("cubeLightTex", 1, "CUBE" + j, tex);
        var b2 = new CANNON.Body({
          mass: 1,
          linearDamping: 0.01,
          position: new CANNON.Vec3(1, -14.5, 15),
          shape: new CANNON.Box(new CANNON.Vec3(1, 1, 1))
        });

        physics.world.addBody(b2);
        App.scene['CUBE' + j].physics.currentBody = b2;
        App.scene['CUBE' + j].physics.enabled = true;
      }, 1000 * j)
    }
  }

  objGenerator(100);

};
