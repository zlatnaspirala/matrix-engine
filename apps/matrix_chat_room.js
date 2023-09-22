/**
 * @Author Nikola Lukic
 * @Description Matrix Engine Api Example.
 */

import App from "../program/manifest";
import * as matrixEngine from "../index.js";
let VT = matrixEngine.Engine.VT;

export var runThis = world => {
  App.camera.SceneController = true;

  canvas.addEventListener('mousedown', (ev) => {
    matrixEngine.raycaster.checkingProcedure(ev);
  });

  window.addEventListener('ray.hit.event', (ev) => {
    console.log("You shoot the object! Nice!", ev)

    /**
     * Physics force apply
     */
    if(ev.detail.hitObject.physics.enabled == true) {
      ev.detail.hitObject.physics.currentBody.force.set(0, 0, 1000)
    }
  });

  var tex = {
    source: ["res/images/complex_texture_1/diffuse.png"],
    mix_operation: "multiply", // ENUM : multiply , divide ,
  };

  let gravityVector = [0, 0, -9.82];
  let physics = world.loadPhysics(gravityVector);
  // Add ground
  physics.addGround(App, world, tex);
  world.Add("cubeLightTex", 1, "CUBE", tex);
  var b = new CANNON.Body({
    mass: 5,
    position: new CANNON.Vec3(0, -15, 2),
    shape: new CANNON.Box(new CANNON.Vec3(1, 1, 1))
  });
  physics.world.addBody(b);
  // Physics
  App.scene.CUBE.physics.currentBody = b;
  App.scene.CUBE.physics.enabled = true;

  const objGenerator = (meObj) => {
    var b2 = new CANNON.Body({
      mass: 1,
      linearDamping: 0.01,
      position: new CANNON.Vec3(1, -14.5, 15),
      shape: new CANNON.Box(new CANNON.Vec3(1, 1, 1))
    });
    physics.world.addBody(b2);
    meObj.physics.currentBody = b2;
    meObj.physics.enabled = true;
  }
  // objGenerator(1)

  // Must be activate
  matrixEngine.Engine.activateNet();
  // Must be activate for scene objects also.
  // This is only to force avoid unnecessary networking emit!
  // let ENUMERATORS = matrixEngine.utility.ENUMERATORS;




  addEventListener('stream-loaded', (e) => {
    var _ = document.querySelectorAll('.media-box')

    var name= "videochat-" + e.detail.data.userId;
    world.Add("cubeLightTex", 3, name , tex);
    App.scene[name].position.x = 0;
    App.scene[name].position.z = -20;
    App.scene[name].rotx = 45
    App.scene[name].rotation.rotz = -90
    App.scene[name].LightsData.ambientLight.set(1, 1, 1);
    App.scene[name].net.enable = true;
    App.scene[name].net.activate();

    _.forEach((i) => {
      // App.network.connection.userid  REPRESENT LOCAL STREAM 
      if(e.detail.data.userId != App.network.connection.userid) {
        // This is video element!
        App.scene[name].streamTextures = matrixEngine.Engine.DOM_VT(i.children[1])
        objGenerator( App.scene[name])

        setInterval(function() {
          App.scene[name].geometry.texCoordsPoints.front.right_top.x += 0.01;
          App.scene[name].geometry.texCoordsPoints.front.left_bottom.x += 0.01;
          App.scene[name].geometry.texCoordsPoints.front.left_top.x += 0.01;
          App.scene[name].geometry.texCoordsPoints.front.right_bottom.x += 0.01;
        }, 20);

      }
    })
  })

  addEventListener('net-new-user', (e) => {})

  world.Add("cubeLightTex", 5, "outsideBox2", tex);
  App.scene.outsideBox2.position.x = 0;
  App.scene.outsideBox2.position.z = -24;
  App.scene.outsideBox2.rotation.rotationSpeed.y = 10
  App.scene.outsideBox2.rotation.rotx = 45
  App.scene.outsideBox2.streamTextures = new VT(
    "res/video-texture/me.mkv"
  );

  App.scene.outsideBox2.glBlend.blendEnabled = true;
  App.scene.outsideBox2.blendParamSrc = matrixEngine.utility.ENUMERATORS.glBlend.param[6];
  App.scene.outsideBox2.blendParamDest = matrixEngine.utility.ENUMERATORS.glBlend.param[6];



};
