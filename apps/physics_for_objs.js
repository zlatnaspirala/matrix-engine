/**
 *@Author Nikola Lukic zlatnaspirala@
 *@Description Matrix Engine Api Example
 * WORKSHOP SCRIPT
 * Current theme : SceneController and 
 * physics (cannon.js) implementation.
 */

import App from "../program/manifest";
import * as CANNON from 'cannon';
import {Point} from "../lib/matrix-geometry";

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
     if (ev.detail.hitObject.physics.enabled == true) {
      ev.detail.hitObject.physics.currentBody.force.set(-330,0,1000)
     }
  });

  var tex = {
    source: ["res/images/complex_texture_1/diffuse.png"],
    // source: [],
    mix_operation: "multiply",
  };

  // Load Physics world!
  let gravityVector = [0, 0, -9.82];
  let physics = world.loadPhysics(gravityVector);
  // Add ground
  var groundMaterial = new CANNON.Material();
  physics.addGround(App, world, tex, groundMaterial);

  physics.world.solver.iterations = 17;

  // physics.world.defaultContactMaterial.contactEquationStiffness = 1e6;
  // physics.world.defaultContactMaterial.contactEquationRelaxation = 3;

  var height = 5;
  var damping = 0.01;
  // world.Add("sphereLightTex", 1, "BALL", tex);
  // var mass = 1;
  // var sphereShape = new CANNON.Sphere(1);
  // var mat1 = new CANNON.Material();
  // var shapeBody1 = new CANNON.Body({
  //     mass: mass,
  //     material: mat1,
  //     position: new CANNON.Vec3(3*1, -7, height)
  // });
  // shapeBody1.addShape(sphereShape);
  // shapeBody1.linearDamping = damping;
  // physics.world.addBody(shapeBody1);
  // // Physics
  // App.scene.BALL.physics.currentBody = shapeBody1;
  // App.scene.BALL.physics.enabled = true;

  // var mm = new CANNON.ContactMaterial(groundMaterial, mat1, { friction: 0.01, restitution: 0.9 });
  // physics.world.addContactMaterial(mm);

  world.Add("cubeMap", 1, "CUBE", tex);
  var b = new CANNON.Body({
    mass: 5,
    position: new CANNON.Vec3(0, -4, 2),
    shape: new CANNON.Box(new CANNON.Vec3(1, 1, 1))
  });
  physics.world.addBody(b);
  // Physics
  App.scene.CUBE.physics.currentBody = b;
  App.scene.CUBE.physics.enabled = true;

};
