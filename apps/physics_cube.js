/**
 *@Author Nikola Lukic zlatnaspirala@
 *@Description Matrix Engine Api Example
 * WORKSHOP SCRIPT
 * Current theme : SceneController and 
 * physics (cannon.js) implementation.
 */

import App from "../program/manifest";
import * as CANNON from 'cannon';

export var runThis = (world) => {

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
    mix_operation: "multiply",
  };

  // Load Physics world!
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

  // test 
  let anyCanvas = matrixEngine.Engine.anyCanvas;

  // THIS IS BAD EVERY anCanvas make own canvas2d element
  // Asunc timers vs for loop !!
  // 
  const objGenerator = (n) => {
    for(var j = 0;j < n;j++) {
      var t = new Promise((resolve, reject) => {
        function callme(j) {
          setTimeout(() => {
            // console.log('J = ', j)
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

            // test 
            if(j == 0) {
              console.log('i = ', j)
              App.scene['CUBE' + j].streamTextures = new anyCanvas(
                "../2DTextureEditor/templates/slot/",
                "HELLO_WORLD")
              App.scene['CUBE' + j].streamTextures.showTextureEditor();
            } else {
              console.log(' - i = ', j)
              // i am not sure !!
              App.scene['CUBE' + j].streamTextures = App.scene['CUBE0'].streamTextures
            }
            resolve();
          }, 1000 * j)
        }
        callme(j)
      })
    }
  }

  // 100 gamepaly render views TEST STRES
  objGenerator(100)

};
