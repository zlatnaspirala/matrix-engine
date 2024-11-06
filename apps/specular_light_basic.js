/**
 *@Author Nikola Lukic
 *@Description Matrix Engine Api Example
 * From version [1.7.6]
 * Local Light/Shadows shader
 * - Spot ligth for now works perfect for fixed camera movement.
 * - Direction, ambient working fine also with spot light.
 */

/* globals world App */
import App from "../program/manifest";
import * as CANNON from 'cannon';

export var runThis = (world) => {

  // Image texs
  var tex = {
    source: ["res/images/complex_texture_1/diffuse.webp"],
    mix_operation: "multiply",
  };

  // // Load Physics world!
  // let gravityVector = [0, 0, -9.82];
  // let physics = world.loadPhysics(gravityVector);
  // // Add ground
  // // Create a ground
  // var groundBody = new CANNON.Body({
  //   mass: 0, // mass == 0 makes the body static
  //   position: new CANNON.Vec3(0, -15, -2)
  // });
  // var groundShape = new CANNON.Plane();
  // groundBody.addShape(groundShape);
  // physics.world.addBody(groundBody);
  // // matrix engine visual
  // world.Add("cubeLightTex", 1, "FLOOR_STATIC", tex);
  // App.scene.FLOOR_STATIC.geometry.setScaleByX(15);
  // App.scene.FLOOR_STATIC.geometry.setScaleByY(15);
  // App.scene.FLOOR_STATIC.geometry.setScaleByZ(0.1);
  // App.scene.FLOOR_STATIC.position.SetY(-2);
  // App.scene.FLOOR_STATIC.position.SetZ(-15);
  // App.scene.FLOOR_STATIC.rotation.rotx = 90;
  // App.scene.FLOOR_STATIC.activateShadows('specular');

  // Camera
  App.camera.SceneController = true;

  world.Add("cubeLightTex", 1, "myCube1", tex);
  App.scene.myCube1.activateShadows('specular');
  App.scene.myCube1.position.setPosition(0, 0, -4);
  App.scene.myCube1.rotation.rotationSpeed.x = 100;
  App.scene.myCube1.shadows.activeUpdate();

  // Click event
  canvas.addEventListener('mousedown', (ev) => {
    matrixEngine.raycaster.checkingProcedure(ev);
  });

  addEventListener("ray.hit.event", function(e) {
    e.detail.hitObject.LightsData.ambientLight.r =
      matrixEngine.utility.randomFloatFromTo(0, 10);
    e.detail.hitObject.LightsData.ambientLight.g =
      matrixEngine.utility.randomFloatFromTo(0, 10);
    e.detail.hitObject.LightsData.ambientLight.b =
      matrixEngine.utility.randomFloatFromTo(0, 10);
    console.info(e.detail);
  });

  // const objGenerator = (n) => {
  //   for(var j = 0;j < n;j++) {

  //     setTimeout(() => {
  //       world.Add("cubeLightTex", 1, "CUBE" + j, tex);
  //       var b2 = new CANNON.Body({
  //         mass: 1,
  //         linearDamping: 0.01,
  //         position: new CANNON.Vec3(1, -14.5, 15),
  //         shape: new CANNON.Box(new CANNON.Vec3(1, 1, 1))
  //       });

  //       physics.world.addBody(b2);
  //       App.scene['CUBE' + j].physics.currentBody = b2;
  //       App.scene['CUBE' + j].physics.enabled = true;
  //       App.scene['CUBE' + j].activateShadows('specular');
  //     }, 1000 * j)
  //   }
  // }
  // objGenerator(100)
};
