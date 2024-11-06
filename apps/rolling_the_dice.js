/**
 *@Author Nikola Lukic zlatnaspirala@
 *@Description Matrix Engine Api Example
 * WORKSHOP SCRIPT
 * New example
 */
import App from "../program/manifest";
import * as CANNON from 'cannon';

export var runThis = (world) => {
  App.camera.SceneController = true;
  canvas.addEventListener('mousedown', (ev) => {matrixEngine.raycaster.checkingProcedure(ev)});
  window.addEventListener('ray.hit.event', (ev) => {
    console.log("You shoot the object! Nice!", ev)
    /**
     * Physics force apply
     */
    if(ev.detail.hitObject.physics.enabled == true) {
      ev.detail.hitObject.physics.currentBody.force.set(510, -1000, 1000)
    }
  });

  var tex = {
    source: ["res/images/complex_texture_1/diffuse.webp"],
    mix_operation: "multiply",
  };

  // Load Physics world!
  let gravityVector = [0, 0, -9.82];
  let physics = world.loadPhysics(gravityVector);
  // Add ground
  physics.addGround(App, world, tex);

  world.cubeMapTextures([
    'res/images/cube/1.png',
    'res/images/cube/2.png',
    'res/images/cube/3.png',
    'res/images/cube/4.png',
    'res/images/cube/5.png',
    'res/images/cube/6.png',
  ], (imgs) => {
    var tex = {
      source: [...imgs],
      mix_operation: "multiply",
      cubeMap: {
        type: 'images',
        source: [...imgs]
      }
    };
    world.Add("cubeMap", 1, "CUBE", tex);
    var b = new CANNON.Body({
      mass: 5,
      position: new CANNON.Vec3(0, -15, 2),
      shape: new CANNON.Box(new CANNON.Vec3(1, 1, 1))
    });
    physics.world.addBody(b);

    // Physics
    App.scene.CUBE.physics.currentBody = b;
    App.scene.CUBE.physics.enabled = true;
  })
};