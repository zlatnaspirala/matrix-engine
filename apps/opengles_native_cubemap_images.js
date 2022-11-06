/**
 *@Author Nikola Lukic zlatnaspirala@
 *@Description Matrix Engine Api Example
 * WORKSHOP SCRIPT
 * Current theme : SceneController and 
 * physics (cannon.js) implementation.
 */

import App from "../program/manifest";
import * as CANNON from 'cannon';

window.CANNON = CANNON;

export var runThis = (world) => {

  App.camera.SceneController = true;

  canvas.addEventListener('mousedown', (ev) => {
    matrixEngine.raycaster.checkingProcedure(ev);
  });

  window.addEventListener('ray.hit.event', (ev) => {
    console.log("You shoot the object! Nice!", ev.detail.hitObject.name)
    /**
     * Physics force apply
     */
    if(ev.detail.hitObject.physics.enabled == true) {
      ev.detail.hitObject.physics.currentBody.force.set(-330, 0, 1000);
    }
  });

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
      }
    };

    // Load Physics world !
    let gravityVector = [0, 0, -9.82];
    let physics = world.loadPhysics(gravityVector);

    // Add ground
    var groundTex = {
      source: ["res/images/complex_texture_1/diffuse.png"],
      mix_operation: "multiply",
    };
    var groundMaterial = new CANNON.Material();
    physics.addGround(App, world, groundTex, groundMaterial);
    // physics.world.solver.iterations = 17;
  
    world.Add("cubeMap", 1, "myCubeMapObj", tex);
    var b = new CANNON.Body({
      mass: 5,
      position: new CANNON.Vec3(0, -14, 3),
      shape: new CANNON.Box(new CANNON.Vec3(1, 1, 1))
    });
    physics.world.addBody(b);
    // Physics
    App.scene.myCubeMapObj.physics.currentBody = b;
    App.scene.myCubeMapObj.physics.enabled = true;

  });


};
