/**
 *@Author Nikola Lukic
 *@Description webGl2GLmatrix2 api example
 */

/* globals world App */

world.Add("cube", 1, "MyColoredCube1");
world.Add("cube", 1, "MyColoredCube2");
world.Add("cube", 1, "MyColoredCube3");

// SET POSITION
App.scene.MyColoredCube1.position.SetX(0);
App.scene.MyColoredCube2.position.SetX(-2.5);
App.scene.MyColoredCube3.position.SetX(2.5);

App.scene.MyColoredCube1.rotation.rotationSpeed.x = 15;
App.scene.MyColoredCube2.rotation.rotationSpeed.y = 15;
App.scene.MyColoredCube3.rotation.rotationSpeed.z = 15;
