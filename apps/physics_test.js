/**
 *@Author Nikola Lukic zlatnaspirala
 *@Description Matrix Engine Api Example
 * WORKSHOP SCRIPT
 * Current theme : SceneController and 
 * physics (cannon.js) implementation.
 */

/* globals world App world */
import App from "../program/manifest";

export var runThis = (world) => {

  App.camera.SceneController = true;

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

  objGenerator(100)

};