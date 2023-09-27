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
  const objGenerator = (meObj) => {
    var b2 = new CANNON.Body({
      mass: 1,
      linearDamping: 0.01,
      position: new CANNON.Vec3(0, -14.5, 15),
      shape: new CANNON.Box(new CANNON.Vec3(3, 3, 3))
    });
    physics.world.addBody(b2);
    meObj.physics.currentBody = b2;
    meObj.physics.enabled = true;
  }
  // objGenerator(1)

  matrixEngine.Engine.activateNet();
  // let ENUMERATORS = matrixEngine.utility.ENUMERATORS;
  addEventListener('stream-loaded', (e) => {
    var _ = document.querySelectorAll('.media-box')
    var name = "videochat-" + e.detail.data.userId;
    _.forEach((i) => {
      // App.network.connection.userid  REPRESENT LOCAL STREAM 
      if(e.detail.data.userId != App.network.connection.userid) {
        // This is video element!
        world.Add("cubeLightTex", 3, name, tex);
        App.scene[name].position.x = 0;
        App.scene[name].position.z = -20;
        // App.scene[name].rotx = 45
        // App.scene[name].rotation.rotz = -90
        App.scene[name].LightsData.ambientLight.set(1, 1, 1);
        App.scene[name].net.enable = true;
        App.scene[name].net.activate();
        App.scene[name].streamTextures = matrixEngine.Engine.DOM_VT(i.children[1])
        objGenerator(App.scene[name])

        App.CUSTOM_TIMER = setInterval(() => {
          try {
            if(typeof App.scene[name] !== 'undefined' && typeof App.scene[name].geometry !== 'undefined') {
              App.scene[name].geometry.texCoordsPoints.front.right_top.x += 0.001;
              App.scene[name].geometry.texCoordsPoints.front.left_bottom.x += 0.001;
              App.scene[name].geometry.texCoordsPoints.front.left_top.x += 0.001;
              App.scene[name].geometry.texCoordsPoints.front.right_bottom.x += 0.001;
            } else {
              clearInterval(App.CUSTOM_TIMER)
              App.CUSTOM_TIMER = null;
            }
          } catch(err) {
            clearInterval(App.CUSTOM_TIMER)
            App.CUSTOM_TIMER = null;
          }
        }, 1);

        addEventListener('net.remove-user', (event) => {
          var n = "videochat-" + event.detail.data.userid;
          if(typeof App.scene[n] !== 'undefinde' &&
            typeof App.scene[n].CUSTOM_FLAG_PREVENT_DBCALL === 'undefined') {
            App.scene[n].CUSTOM_FLAG_PREVENT_DBCALL = true;
            App.scene[n].selfDestroy(1)
          }
        })
      } else {
        // own stream 
        function onLoadObj(meshes) {
          App.meshes = meshes;
          matrixEngine.objLoader.initMeshBuffers(world.GL.gl, App.meshes.TV);
          setTimeout(function() {
            world.Add("obj", 1, "TV", tex, App.meshes.TV);
            App.scene.TV.position.setPosition(-9, 4, -15)
            App.scene.TV.rotation.rotateY(90);
            App.scene.TV.LightsData.ambientLight.set(1, 1, 1);
            App.scene.TV.streamTextures = new matrixEngine.Engine.DOM_VT(i.children[1]);
          }, 1000)
        }
        matrixEngine.objLoader.downloadMeshes({TV: "res/3d-objects/balltest2.obj"}, onLoadObj);
      }
    })
  })

  world.Add("cubeLightTex", 3, "outsideBox2", tex);
  
  App.scene.outsideBox2.position.x = 0;
  App.scene.outsideBox2.position.y = 2;
  App.scene.outsideBox2.position.z = -24;
  App.scene.outsideBox2.rotation.rotationSpeed.y = 20
  App.scene.outsideBox2.rotation.rotx = 45
  App.scene.outsideBox2.streamTextures = new VT(
    "res/video-texture/me.mkv"
  );

  App.scene.outsideBox2.glBlend.blendEnabled = true;
  App.scene.outsideBox2.blendParamSrc = matrixEngine.utility.ENUMERATORS.glBlend.param[6];
  App.scene.outsideBox2.blendParamDest = matrixEngine.utility.ENUMERATORS.glBlend.param[6];

}