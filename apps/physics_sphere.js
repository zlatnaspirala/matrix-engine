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

  const objGenerator = (n) => {
    for(var j = 0;j < n;j++) {

      setTimeout(() => {
        world.Add("sphereLightTex", 1, "BALL" + j, tex);
        var b2 = new CANNON.Body({
          mass: 1,
          linearDamping: 0.005,
          angularDamping: 0.5,
          angularVelocity: new CANNON.Vec3(0.01, 0.01, 0),
          position: new CANNON.Vec3(1, -14.5, 15),
          shape: new CANNON.Sphere(1)
        });

        physics.world.addBody(b2);
        App.scene['BALL' + j].physics.currentBody = b2;
        App.scene['BALL' + j].physics.enabled = true;
      }, 1000 * j)
    }

  }

  objGenerator(10)

};
