/**
 * @Author Nikola Lukic
 * @Description Matrix Engine Api Example.
 */

import App from "../program/manifest";
import * as matrixEngine from "../index.js";
let VT = matrixEngine.Engine.VT;

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

  world.Add("generatorLightTex", 1, "outsideBox2", tex, {
      custom_type: 'torus',
      slices: 8,
      loops: 20,
      inner_rad: 1.5,
      outerRad: 2
  });
  App.scene.outsideBox2.position.x = 0;
  App.scene.outsideBox2.position.y = 2;
  App.scene.outsideBox2.position.z = -14;
  App.scene.outsideBox2.streamTextures = new VT(
    "res/video-texture/me.mkv", 'mytorusStreamTex'
  );
  // App.scene.outsideBox2.glBlend.blendEnabled = true;
  // App.scene.outsideBox2.glBlend.blendParamSrc = matrixEngine.utility.ENUMERATORS.glBlend.param[1];
  // App.scene.outsideBox2.glBlend.blendParamDest = matrixEngine.utility.ENUMERATORS.glBlend.param[1];

}