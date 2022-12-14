
/**
 * @description Usage of raycaster, ObjectLoader,
 * FirstPersonController.
 * This will be part of new lib file `lib/controllers/fps.js`
 * 
 * Axample API calls Usage:
 * 
 * - Deeply integrated to the top level scene object with name `player`.
 *   App.scene.player.updateEnergy(4);
 * Predefined from 0 to the 8 energy value.
 * 
 * @class First Person Shooter example
 */

import App from '../program/manifest';
import * as CANNON from 'cannon';
import {ENUMERATORS, ORBIT_FROM_ARRAY, OSCILLATOR, randomFloatFromTo} from '../lib/utility';

export var runThis = (world) => {

  // Camera
  canvas.style.cursor = 'none';
  App.camera.FirstPersonController = true;
  matrixEngine.Events.camera.fly = false;
  App.camera.speedAmp = 0.01;
  matrixEngine.Events.camera.yPos = 2;

  // Audio effects
  App.sounds.createAudio('shoot', 'res/music/single-gunshot.mp3', 5);

  // Prevent right click context menu
  window.addEventListener("contextmenu", (e) => {e.preventDefault()});

  // Override mouse up
  App.events.CALCULATE_TOUCH_UP_OR_MOUSE_UP = () => {
    App.scene.FPSTarget.glBlend.blendParamSrc = matrixEngine.utility.ENUMERATORS.glBlend.param[4];
    App.scene.FPSTarget.glBlend.blendParamDest = matrixEngine.utility.ENUMERATORS.glBlend.param[4];
    App.scene.FPSTarget.geometry.setScale(0.1);
    App.scene.xrayTarget.visible = false;
  };

  // Override right mouse down
  matrixEngine.Events.SYS.MOUSE.ON_RIGHT_BTN_PRESSED = (e) => {
    App.scene.FPSTarget.geometry.setScale(0.6);
    App.scene.FPSTarget.glBlend.blendParamSrc = matrixEngine.utility.ENUMERATORS.glBlend.param[5];
    App.scene.FPSTarget.glBlend.blendParamDest = matrixEngine.utility.ENUMERATORS.glBlend.param[5];
    App.scene.xrayTarget.visible = true;
  };

  // Override mouse down
  App.events.CALCULATE_TOUCH_DOWN_OR_MOUSE_DOWN = (ev, mouse) => {
    // `checkingProcedure` gets secound optimal argument
    // for custom ray origin target.
    if(mouse.BUTTON_PRESSED == 'RIGHT') {
      // Zoom
    } else {
      // This call represent `SHOOT` Action. And it is center of screen!
      matrixEngine.raycaster.checkingProcedure(ev, {
        clientX: ev.target.width / 2,
        clientY: ev.target.height / 2
      });
      App.sounds.play('shoot');
    }
  };

  window.addEventListener('ray.hit.event', (ev) => {
    console.log("You shoot the object! Nice!", ev);
    // Physics force apply also change ambienty light.
    if(ev.detail.hitObject.physics.enabled == true) {
      // Shoot the object - apply force
      ev.detail.hitObject.physics.currentBody.force.set(0, 0, 1000);
      // Apply random diff color
      if(ev.detail.hitObject.LightsData) ev.detail.hitObject.LightsData.ambientLight.set(
        randomFloatFromTo(0, 2), randomFloatFromTo(0, 2), randomFloatFromTo(0, 2));
    }
  });

  // Load obj seq animation
  const createObjSequence = (objName) => {

    function onLoadObj(meshes) {

      for(let key in meshes) {
        matrixEngine.objLoader.initMeshBuffers(world.GL.gl, meshes[key]);
      }

      var textuteImageSamplers2 = {
        source: [
          "res/bvh-skeletal-base/swat-guy/textures/Ch15_1001_Diffuse.png"
        ],
        mix_operation: "multiply"
      };

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

      // Hands - in future will be weapon
      world.Add("obj", 1, objName, textuteImageSamplers2, meshes[objName], animArg);

      // Fix object orientation - this can be fixed also in blender.
      matrixEngine.Events.camera.yaw = 0;

      // Not in use but can be used
      function bodiesAreInContact(bodyA, bodyB) {
        for(var i = 0;i < world.contacts.length;i++) {
          var c = world.contacts[i];
          if((c.bi === bodyA && c.bj === bodyB) || (c.bi === bodyB && c.bj === bodyA)) {
            return true;
          }
        }
        return false;
      }

      // Add collision cube to the local player.
      world.Add("cube", 0.2, "playerCollisonBox");
      var collisionBox = new CANNON.Body({
        mass: 10,
        linearDamping: 0.01,
        position: new CANNON.Vec3(0, 0, 0),
        shape: new CANNON.Box(new CANNON.Vec3(3, 3, 3))// new CANNON.Sphere(2)
      });

      collisionBox._name = 'collisionBox';
      physics.world.addBody(collisionBox);
      App.scene.playerCollisonBox.physics.currentBody = collisionBox;
      App.scene.playerCollisonBox.physics.enabled = true;
      App.scene.playerCollisonBox.physics.currentBody.fixedRotation = true;
      App.scene.playerCollisonBox.geometry.setScale(0.02);
      App.scene.playerCollisonBox.glBlend.blendEnabled = true;
      App.scene.playerCollisonBox.glBlend.blendParamSrc = ENUMERATORS.glBlend.param[0];
      App.scene.playerCollisonBox.glBlend.blendParamDest = ENUMERATORS.glBlend.param[0];
      App.scene.playerCollisonBox.visible = false;

      // Test custom flag for collide moment
      App.scene.playerCollisonBox.iamInCollideRegime = false;

      // simple logic but also not perfect
      App.scene.playerCollisonBox.pingpong = true;

      collisionBox.addEventListener("collide", function(e) {
        // const contactNormal = new CANNON.Vec3();
        // var relativeVelocity = e.contact.getImpactVelocityAlongNormal();
        console.log("playerCollisonBox collide with", e);

        if(e.contact.bj._name != 'floor' && e.contact.bi._name != 'floor') {
          // setTimeout(() => {App.scene.playerCollisonBox.iamInCollideRegime = true}, 100)
          // setTimeout(() => {App.scene.playerCollisonBox.iamInCollideRegime = false}, 1300);
        }

        // ?maybe
        preventDoubleJump = null;
        App.scene.playerCollisonBox.physics.currentBody.mass = 10;

        if(e.contact.bi._name == 'damage') {
          console.log("Trigger damage !!!");
          //. 4x fix 
          App.scene.player.energy.value -= 0.25;
          App.scene.player.updateEnergy(App.scene.player.energy.value);
        }

      });

      let preventDoubleJump = null;
      // Matrix-engine key event
      addEventListener('hit.keyDown', (e) => {
        // Jump
        if(e.detail.keyCode == 32) {
          if (preventDoubleJump == null) {
          
            preventDoubleJump = setTimeout(() => {
              console.log('JUMP >>>>>>>> ', e.detail.keyCode);
              App.scene.playerCollisonBox.physics.currentBody.mass = 1;
              // App.scene.playerCollisonBox.physics.currentBody.force.set(0, 0, 1500)
              App.scene.playerCollisonBox.physics.currentBody.velocity.set(0,0,20);
            }, 250);
          }
        }
        // else if (e.detail.keyCode == 87) { }
      });

      var handlerTimeout = null, handlerTimeout2 = null;

      var playerUpdater = {
        UPDATE: () => {
          App.scene[objName].rotation.rotateY(
            matrixEngine.Events.camera.yaw + 180)

          var detPitch;
          var limit = 2;
          if(matrixEngine.Events.camera.pitch < limit &&
            matrixEngine.Events.camera.pitch > -limit) {
            detPitch = matrixEngine.Events.camera.pitch * 2;
          } else if(matrixEngine.Events.camera.pitch > limit) {
            detPitch = limit * 2;
          } else if(matrixEngine.Events.camera.pitch < -(limit + 2)) {
            detPitch = -(limit + 2) * 2;
          }

          if(matrixEngine.Events.camera.virtualJumpActive == "DEPLACED_MAYBE") {
            // invert logic
            // Scene object set
            App.scene[objName].rotation.rotateX(-detPitch);
            var detPitchPos = matrixEngine.Events.camera.pitch;
            if(detPitchPos > 4) detPitchPos = 4;

            App.scene.playerCollisonBox.physics.currentBody.mass = 0.1;
            // App.scene.playerCollisonBox.physics.currentBody.force.set(0, 0, 100);

            App.scene[objName].position.setPosition(
              App.scene.playerCollisonBox.physics.currentBody.position.x,
              App.scene.playerCollisonBox.physics.currentBody.position.z,
              App.scene.playerCollisonBox.physics.currentBody.position.y);

            // Cannonjs object set / Switched  Z - Y
            matrixEngine.Events.camera.xPos = App.scene.playerCollisonBox.physics.currentBody.position.x;
            matrixEngine.Events.camera.zPos = App.scene.playerCollisonBox.physics.currentBody.position.y;
            matrixEngine.Events.camera.yPos = App.scene.playerCollisonBox.physics.currentBody.position.z;

            // App.scene.playerCollisonBox.physics.currentBody.angularVelocity.set(0, 0, 0);

            if(handlerTimeout == null) {
              handlerTimeout = setTimeout(() => {
                matrixEngine.Events.camera.virtualJumpActive = false;
                App.scene.playerCollisonBox.physics.currentBody.mass = 10;
              }, 1350);
            }

          } else {

            handlerTimeout = null;
            // Make more stable situation
            App.scene.playerCollisonBox.physics.currentBody.mass = 10;
            App.scene.playerCollisonBox.physics.currentBody.quaternion.setFromEuler(0, 0, 0);
            // Tamo tu iznad duge nebo zri...
            // Cannonjs object set
            // Switched  Z - Y
            matrixEngine.Events.camera.yPos = App.scene.playerCollisonBox.physics.currentBody.position.z;

            // if(App.scene.playerCollisonBox.iamInCollideRegime === true) {
            if(App.scene.playerCollisonBox.pingpong == true) {
              App.scene[objName].position.setPosition(
                App.scene.playerCollisonBox.physics.currentBody.position.x,
                App.scene.playerCollisonBox.physics.currentBody.position.z,
                App.scene.playerCollisonBox.physics.currentBody.position.y
              );
              // // Cannonjs object set / Switched  Z - Y
              matrixEngine.Events.camera.xPos = App.scene.playerCollisonBox.physics.currentBody.position.x;
              matrixEngine.Events.camera.zPos = App.scene.playerCollisonBox.physics.currentBody.position.y;
              matrixEngine.Events.camera.yPos = App.scene.playerCollisonBox.physics.currentBody.position.z;
              App.scene.playerCollisonBox.pingpong = false;
            } else {
              handlerTimeout2 = 0;
              // // Scene object set
              // App.scene[objName].rotation.rotateX(-detPitch);
              // var detPitchPos = matrixEngine.Events.camera.pitch;
              // if(detPitchPos > 4) detPitchPos = 4;
              App.scene[objName].position.setPosition(
                matrixEngine.Events.camera.xPos,
                matrixEngine.Events.camera.yPos,
                matrixEngine.Events.camera.zPos,
              )
              // Cannonjs object set - Switched  Z - Y
              App.scene.playerCollisonBox.
                physics.currentBody.position.set(
                  matrixEngine.Events.camera.xPos,
                  matrixEngine.Events.camera.zPos,
                  matrixEngine.Events.camera.yPos);
                  App.scene.playerCollisonBox.pingpong = true;
            }
          }
        }
      };
      App.updateBeforeDraw.push(playerUpdater);

      // Player Energy status
      App.scene.player.energy = {};

      for(let key in App.scene.player.meshList) {
        App.scene.player.meshList[key].setScale(1.85);
      }

      // Target scene object
      var texTarget = {
        source: [
          "res/bvh-skeletal-base/swat-guy/target.png",
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

      // Energy active bar
      // Custom generic textures. Micro Drawing.
      // Example for arg shema square for now only.
      var options = {
        squareShema: [8, 8],
        pixels: new Uint8Array(8 * 8 * 4)
      };
      // options.pixels.fill(0);
      App.scene.player.energy.value = 8;
      App.scene.player.updateEnergy = function(v) {
        this.energy.value = v;
        var t = App.scene.energyBar.preparePixelsTex(App.scene.energyBar.specialValue);
        App.scene.energyBar.textures.pop()
        App.scene.energyBar.textures.push(App.scene.energyBar.createPixelsTex(t));
      };

      function preparePixelsTex(options) {
        var I = 0, R = 0, G = 0, B = 0, localCounter = 0;
        for(var funny = 0;funny < 8 * 8 * 4;funny += 4) {
          if(localCounter > 7) {
            localCounter = 0;
          }
          if(localCounter < App.scene.player.energy.value) {
            I = 128;
            if(App.scene.player.energy.value < 3) {
              R = 255;
              G = 0;
              B = 0;
              I = 0;
            } else if(App.scene.player.energy.value > 2 && App.scene.player.energy.value < 5) {
              R = 255;
              G = 255;
              B = 0;
            } else {
              R = 0;
              G = 255;
              B = 0;
            }
          } else {
            I = 0;
            R = 0;
            G = 0;
            B = 0;
          }
          options.pixels[funny] = R;
          options.pixels[funny + 1] = G;
          options.pixels[funny + 2] = B;
          options.pixels[funny + 3] = 0;
          localCounter++;
        }
        return options;
      }

      var tex2 = {
        source: [
          "res/images/hud/energy-bar.png",
          "res/images/hud/energy-bar.png"
        ],
        mix_operation: "multiply",
      };

      world.Add("squareTex", 1, 'energyBar', tex2);
      App.scene.energyBar.glBlend.blendEnabled = true;
      App.scene.energyBar.glBlend.blendParamSrc = matrixEngine.utility.ENUMERATORS.glBlend.param[5];
      App.scene.energyBar.glBlend.blendParamDest = matrixEngine.utility.ENUMERATORS.glBlend.param[5];
      App.scene.energyBar.isHUD = true;
      // App.scene.energy.visible = false;
      App.scene.energyBar.position.setPosition(0, 1.1, -3);
      App.scene.energyBar.geometry.setScaleByX(1)
      App.scene.energyBar.geometry.setScaleByY(0.05)
      App.scene.energyBar.preparePixelsTex = preparePixelsTex;
      options = preparePixelsTex(options);
      App.scene.energyBar.textures.push(App.scene.energyBar.createPixelsTex(options));
      App.scene.energyBar.specialValue = options;
    }

    matrixEngine.objLoader.downloadMeshes(
      matrixEngine.objLoader.makeObjSeqArg(
        {
          id: objName,
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

  // objGenerator(15);

  createObjSequence('player');

  Promise.all(promiseAllGenerated).then((what) => {
    // console.info(`Waiting for runtime generation of scene objects,
    //               then swap scene array index for scene draw-index -> 
    //               must be manual setup for now!`, what);
    // swap(5, 19, matrixEngine.matrixWorld.world.contentList);
  });

  // Add ground for physics bodies.
  var tex = {
    source: ["res/images/complex_texture_1/diffuse.png"],
    mix_operation: "multiply",
  };

  // Load Physics world.
  // let gravityVector = [0, 0, -9.82];
  let gravityVector = [0, 0, -29.82];
  let physics = world.loadPhysics(gravityVector);

  // Add ground - mass == 0 makes the body static
  var groundBody = new CANNON.Body({
    mass: 0,
    position: new CANNON.Vec3(0, -15, -2)
  });
  var groundShape = new CANNON.Plane();
  groundBody.addShape(groundShape);
  groundBody._name = 'floor';
  physics.world.addBody(groundBody);
  // Matrix engine visual scene object
  world.Add("squareTex", 1, "FLOOR_STATIC", tex);
  App.scene.FLOOR_STATIC.geometry.setScaleByX(20);
  App.scene.FLOOR_STATIC.geometry.setScaleByY(20);
  App.scene.FLOOR_STATIC.position.SetY(-2);
  App.scene.FLOOR_STATIC.position.SetZ(-15);
  App.scene.FLOOR_STATIC.rotation.rotx = 90;

  // Target x-ray AIM
  // See through the objects.
  // In webGL context it is object how was drawn before others.
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

  // Energy
  var tex1 = {
    source: [
      "res/images/hud/energy.png"
    ],
    mix_operation: "multiply",
  };
  world.Add("squareTex", 0.5, 'energy', tex1);
  App.scene.energy.glBlend.blendEnabled = true;
  App.scene.energy.glBlend.blendParamSrc = matrixEngine.utility.ENUMERATORS.glBlend.param[5];
  App.scene.energy.glBlend.blendParamDest = matrixEngine.utility.ENUMERATORS.glBlend.param[5];
  App.scene.energy.isHUD = true;
  // App.scene.energy.visible = false;
  App.scene.energy.position.setPosition(-1, 1.15, -3);
  App.scene.energy.geometry.setScaleByX(0.35)
  App.scene.energy.geometry.setScaleByY(0.1)

  // good for fix rotation in future
  world.Add("cubeLightTex", 2, "FLOOR2", tex);
  var b2 = new CANNON.Body({
    mass: 0,
    linearDamping: 0.01,
    position: new CANNON.Vec3(0, -14.5, -2),
    shape: new CANNON.Box(new CANNON.Vec3(2, 2, 2))
  });
  physics.world.addBody(b2);
  App.scene['FLOOR2'].position.setPosition(0, -2, -14.5)
  // App.scene['FLOOR2'].geometry.setScaleByX(3);
  App.scene['FLOOR2'].physics.currentBody = b2;
  App.scene['FLOOR2'].physics.enabled = true;

  world.Add("cubeLightTex", 2, "FLOOR3", tex);
  var b3 = new CANNON.Body({
    mass: 0,
    linearDamping: 0.01,
    position: new CANNON.Vec3(0, -19, 0),
    shape: new CANNON.Box(new CANNON.Vec3(3, 3, 3))
  });
  physics.world.addBody(b3);
  App.scene['FLOOR3'].position.setPosition(0, 0, -19)
  App.scene['FLOOR3'].physics.currentBody = b3;
  App.scene['FLOOR3'].physics.enabled = true;

  // Big wall
  world.Add("cubeLightTex", 5, "WALL_BLOCK", tex);
  var b5 = new CANNON.Body({
    mass: 0,
    linearDamping: 0.01,
    position: new CANNON.Vec3(10, -19, 0),
    shape: new CANNON.Box(new CANNON.Vec3(5, 5, 5))
  });
  physics.world.addBody(b5);
  App.scene['WALL_BLOCK'].position.setPosition(10, 0, -19)
  App.scene['WALL_BLOCK'].physics.currentBody = b5;
  App.scene['WALL_BLOCK'].physics.enabled = true;

  // Damage object test
  world.Add("cubeLightTex", 1, "LAVA", tex);
  var b4 = new CANNON.Body({
    mass: 0,
    linearDamping: 0.01,
    position: new CANNON.Vec3(-6, -16.5, -1),
    shape: new CANNON.Box(new CANNON.Vec3(1, 1, 1))
  });
  b4._name = 'damage';
  physics.world.addBody(b4);
  App.scene.LAVA.position.setPosition(-6, -1, -16.5)
  // App.scene.LAVA.geometry.setScaleByX(1);
  App.scene.LAVA.physics.currentBody = b4;
  App.scene.LAVA.physics.enabled = true;
  App.scene.LAVA.LightsData.ambientLight.set(0, 0, 0);
  App.scene.LAVA.streamTextures = new matrixEngine.Engine.VT(
    "res/video-texture/lava1.mkv"
  );

};
