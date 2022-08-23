/**
 *@Author Nikola Lukic
 *@Description Matrix Engine Api Example
 * WORKSHOP SCRIPT
 */

/* globals world App world */
import App from "../program/manifest";

export var runThis = (world) => {

  // Load Physics world!
  let physics = world.loadPhysics();

  // Create a ground
  var groundBody = new CANNON.Body({
    mass: 0, // mass == 0 makes the body static
    position: new CANNON.Vec3(0, -6, -1)
  });
  var groundShape = new CANNON.Plane();
  groundBody.addShape(groundShape);
  physics.world.addBody(groundBody);
  console.log('ground=>', groundBody.position);
  // matrix engine visual
  world.Add("square", 1, "FLOOR_STATIC");
  App.scene.FLOOR_STATIC.geometry.setScaleByX(5);
  App.scene.FLOOR_STATIC.geometry.setScaleByY(5);
  App.scene.FLOOR_STATIC.position.SetY(-1);
  App.scene.FLOOR_STATIC.position.SetZ(-6);
  App.scene.FLOOR_STATIC.rotation.rotx = 90;

  // DYNAMIC OBJ
  var tex = {
    source: ["res/images/complex_texture_1/diffuse.png"],
    mix_operation: "multiply",
  };

  world.Add("cubeLightTex", 1, "CUBE", tex);
  // App.scene.CUBE.position.SetY(0);
  //
  var b = new CANNON.Body({
    mass: 1, // kg
    position: new CANNON.Vec3(0, -15, 2), // m
    shape: new CANNON.Box(new CANNON.Vec3(1, 1, 1))
  });
  physics.world.addBody(b);
  //physisc
  App.scene.CUBE.physics.currentBody = b;
  App.scene.CUBE.physics.enabled = true;


  world.Add("cubeLightTex", 1, "CUBE2", tex);
  // App.scene.CUBE2.position.SetY(-10);
  //
  var b2 = new CANNON.Body({
    mass: 1, // kg
    linearDamping: 0.01,
    position: new CANNON.Vec3(1, -13.5, 15), // m
    shape: new CANNON.Box(new CANNON.Vec3(1, 1, 1))
  });

  console.log("TETS LINEAR ", b2.linearDamping)

  physics.world.addBody(b2);
  //physisc
  App.scene.CUBE2.physics.currentBody = b2;
  App.scene.CUBE2.physics.enabled = true;

};
