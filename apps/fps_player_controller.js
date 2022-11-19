
/**
 * @description Usage of raycaster, ObjectLoader,
 * FirstPersonController...
 * @class First Person Shooter example
 * @arg filePath
 * @arg options
 */

import App from '../program/manifest';
import * as CANNON from 'cannon';

import {ORBIT_FROM_ARRAY, OSCILLATOR, randomFloatFromTo} from '../lib/utility';

export var runThis = (world) => {

  // Camera
  canvas.style.cursor = 'none'
  App.camera.FirstPersonController = true;
  App.camera.speedAmp = 0.01
  matrixEngine.Events.camera.yPos = 2;

  // from 1.8.13
  App.sounds.createAudio('shoot', 'res/music/single-gunshot.mp3', 5);

  window.addEventListener("contextmenu", (e) => {
    e.preventDefault();
  });

  App.events.CALCULATE_TOUCH_UP_OR_MOUSE_UP = () => {
    App.scene.FPSTarget.glBlend.blendParamSrc = matrixEngine.utility.ENUMERATORS.glBlend.param[4];
    App.scene.FPSTarget.glBlend.blendParamDest = matrixEngine.utility.ENUMERATORS.glBlend.param[4];
    App.scene.FPSTarget.geometry.setScale(0.1);
    App.scene.xrayTarget.visible = false;
  };

  matrixEngine.Events.SYS.MOUSE.ON_RIGHT_BTN_PRESSED = (e) => {
    App.scene.FPSTarget.geometry.setScale(0.6);
    App.scene.FPSTarget.glBlend.blendParamSrc = matrixEngine.utility.ENUMERATORS.glBlend.param[5];
    App.scene.FPSTarget.glBlend.blendParamDest = matrixEngine.utility.ENUMERATORS.glBlend.param[5];
    App.scene.xrayTarget.visible = true;
  };

  App.events.CALCULATE_TOUCH_DOWN_OR_MOUSE_DOWN = (ev, mouse) => {
    // From [1.8.12]
    // checkingProcedure gets secound optimal argument
    // for custom ray origin target.
    if(mouse.BUTTON_PRESSED == 'RIGHT') {
      // Zoom
    } else {
      // This call represent `SHOOT` Action.
      // And it is center of screen
      matrixEngine.raycaster.checkingProcedure(ev, {
        clientX: ev.target.width / 2,
        clientY: ev.target.height / 2
      });
      App.sounds.play('shoot');
    }
  };

  // BAD
  // canvas.addEventListener('mousedown', (ev) => {});

  window.addEventListener('ray.hit.event', (ev) => {
    console.log("You shoot the object! Nice!", ev)

    /**
     * Physics force apply also change ambienty light.
     */
    if(ev.detail.hitObject.physics.enabled == true) {
      ev.detail.hitObject.physics.currentBody.force.set(0, 0, 1000);
      if(ev.detail.hitObject.LightsData) ev.detail.hitObject.LightsData.ambientLight.set(
        randomFloatFromTo(0, 2), randomFloatFromTo(0, 2), randomFloatFromTo(0, 2));
    }
  });

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
          currentAni: 0,
          animations: {
            active: 'walk',
            walk: {
              from: 0,
              to: 20,
              speed: 3
            }
          }
        };
        world.Add("obj", 1, objName,
          textuteImageSamplers2,
          meshes[objName],
          animArg
        );

        // Fix object orientation - this can be fixed also in blender.
        matrixEngine.Events.camera.yaw = 0;

        // Add collision cube to the local player.
        world.Add("cube", 0.2, "playerCollisonBox");
        var collisionBox = new CANNON.Body({
          mass: 5,
          linearDamping: 0.01,
          position: new CANNON.Vec3(0, 0, 0),
          shape: new CANNON.Box(new CANNON.Vec3(3, 3, 3))
        });
        physics.world.addBody(collisionBox);
        App.scene.playerCollisonBox.physics.currentBody = collisionBox;
        App.scene.playerCollisonBox.physics.enabled = true;
        App.scene.playerCollisonBox.physics.currentBody.fixedRotation = true;
        App.scene.playerCollisonBox.geometry.setScale(0.02);
        //matrixEngine.Events.camera.yaw

        var playerUpdater = {
          UPDATE: () => {
            App.scene[objName].rotation.rotateY(
              matrixEngine.Events.camera.yaw + 180)

            var TEST;
            var limit = 2;
            if(matrixEngine.Events.camera.pitch < limit &&
              matrixEngine.Events.camera.pitch > -limit) {
              TEST = matrixEngine.Events.camera.pitch * 2;
            } else if(matrixEngine.Events.camera.pitch > limit) {
              TEST = limit * 2;
            } else if(matrixEngine.Events.camera.pitch < -(limit + 2)) {
              TEST = -(limit + 2) * 2;
            }

            App.scene[objName].rotation.rotateX(-TEST);
            var TEST2 = matrixEngine.Events.camera.pitch;
            if(TEST2 > 4) TEST2 = 4;
            App.scene[objName].position.setPosition(
              matrixEngine.Events.camera.xPos,
              matrixEngine.Events.camera.yPos - 0.3 + TEST2 / 50,
              matrixEngine.Events.camera.zPos,
            )

            App.scene.playerCollisonBox.
              physics.currentBody.position.set(
                matrixEngine.Events.camera.xPos,
                matrixEngine.Events.camera.zPos, // Switched  Z - Y
                matrixEngine.Events.camera.yPos  // + TEST2 / 50
              )
            App.scene.playerCollisonBox.
              physics.currentBody.velocity.set(0, 0, 0);
            App.scene.playerCollisonBox.
              physics.currentBody.angularVelocity.set(0, 0, 0);


          }
        };
        App.updateBeforeDraw.push(playerUpdater);

        for(let key in App.scene.player.meshList) {
          App.scene.player.meshList[key].setScale(1.85);
        }

        // Target scene object
        var texTarget = {
          source: [
            "res/bvh-skeletal-base/swat-guy/target.png"
          ],
          mix_operation: "multiply",
        };
        world.Add("squareTex", 0.25, 'FPSTarget', texTarget);
        App.scene.FPSTarget.position.setPosition(0, 0, -4);
        App.scene.FPSTarget.glBlend.blendEnabled = true;
        App.scene.FPSTarget.glBlend.blendParamSrc = matrixEngine.utility.ENUMERATORS.glBlend.param[4];
        App.scene.FPSTarget.glBlend.blendParamDest = matrixEngine.utility.ENUMERATORS.glBlend.param[4];
        App.scene.FPSTarget.isHUD = true;
        App.scene.FPSTarget.geometry.setScale(0.1);
        // swap(6,22, matrixEngine.matrixWorld.world.contentList)
      }, 1);
    }

    matrixEngine.objLoader.downloadMeshes(
      matrixEngine.objLoader.makeObjSeqArg(
        {
          id: objName,
          // path: "res/bvh-skeletal-base/swat-guy/anims/swat-multi",
          path: "res/bvh-skeletal-base/swat-guy/FPShooter-hands/FPShooter-hands",
          from: 1,
          to: 20
        }),
      onLoadObj
    );

  };

  let promiseAllGenerated = [];

  const objGenerator = (n) => {
    for(var j = 0;j < n;j++) {
      promiseAllGenerated.push(new Promise((resolve) => {
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
          resolve();
        }, 1000 * j);
      }));
    }
  }

  objGenerator(15);
  createObjSequence('player');

  Promise.all(promiseAllGenerated).then((what) => {
    console.info(`Runtime wait for some generetion of scene objects,
                  then swap scene array index for target -> 
                  must be manual setup for now!`, what);
    swap(5, 19, matrixEngine.matrixWorld.world.contentList);
  });

  // Add ground for physics bodies.
  var tex = {
    source: ["res/images/complex_texture_1/diffuse.png"],
    mix_operation: "multiply",
  };
  // Load Physics world.
  let gravityVector = [0, 0, -9.82];
  let physics = world.loadPhysics(gravityVector);
  // Add ground
  var groundBody = new CANNON.Body({
    mass: 0, // mass == 0 makes the body static
    position: new CANNON.Vec3(0, -15, -2)
  });
  var groundShape = new CANNON.Plane();
  groundBody.addShape(groundShape);
  physics.world.addBody(groundBody);
  // Matrix engine visual
  world.Add("squareTex", 1, "FLOOR_STATIC", tex);
  App.scene.FLOOR_STATIC.geometry.setScaleByX(20);
  App.scene.FLOOR_STATIC.geometry.setScaleByY(20);
  App.scene.FLOOR_STATIC.position.SetY(-2);
  App.scene.FLOOR_STATIC.position.SetZ(-15);
  App.scene.FLOOR_STATIC.rotation.rotx = 90;

  // Target x-ray
  // See through the objects
  var texTarget = {
    source: [
      "res/bvh-skeletal-base/swat-guy/target-night.png"
    ],
    mix_operation: "multiply",
  };
  world.Add("squareTex", 0.18, 'xrayTarget', texTarget);
  App.scene.xrayTarget.glBlend.blendEnabled = true;
  App.scene.xrayTarget.glBlend.blendParamSrc = matrixEngine.utility.ENUMERATORS.glBlend.param[5];
  App.scene.xrayTarget.glBlend.blendParamDest = matrixEngine.utility.ENUMERATORS.glBlend.param[5];
  App.scene.xrayTarget.isHUD = true;
  App.scene.xrayTarget.visible = false;
  App.scene.xrayTarget.position.setPosition(-0.3, 0.27, -4);

};
