/**
 * @Author Nikola Lukic
 * @Description Matrix Engine Api Example.
 * Torus geometry with physics.
 */

import App from "../program/manifest";
import * as matrixEngine from "../index.js";
let VT = matrixEngine.Engine.VT;
import * as CANNON from 'cannon';

window.App = App
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
    source: ["res/images/complex_texture_1/diffuse.webp"],
    mix_operation: "multiply"
  };

  let gravityVector = [0, 0, -9.82];
  let physics = world.loadPhysics(gravityVector);
  // Add ground
  physics.addGround(App, world, tex);

  world.Add("generatorLightTex", 1, "outsideBox2", tex, {
      custom_type: 'torus',
      slices: 8,
      loops: 20,
      inner_rad: 1.5,
      outerRad: 2
  });
  // App.scene.outsideBox2.streamTextures = new VT(
  //   "res/video-texture/me.mkv", 'mytorusStreamTex'
  // );
  var wheelsPoly = 32;
  var wheelInput1 = 2;
  var wheelInput2 = 1;
  var bigWheel = new CANNON.Body({
    mass: 1,
    type: CANNON.Body.DYNAMIC,
    shape: CANNON.Trimesh.createTorus(wheelInput1, wheelInput2, wheelsPoly, wheelsPoly),
    position: new CANNON.Vec3(0, -10, 2)
  });

  // dev
  window.bigWheel = bigWheel;

  physics.world.addBody(bigWheel);
  App.scene.outsideBox2.physics.currentBody = bigWheel;
  App.scene.outsideBox2.physics.enabled = true;
}