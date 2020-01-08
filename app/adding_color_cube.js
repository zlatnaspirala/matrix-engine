/**
 *@Author Nikola Lukic
 *@Description webGl2 api example
 */

/* globals world App */

world.Add("cube", 1, "MyColoredCube1");
world.Add("cube", 1, "MyColoredCube2");
world.Add("cube", 1, "MyColoredCube3");

// SET POSITION
App.scene.MyColoredCube1.position.SetX(0);
App.scene.MyColoredCube2.position.SetX(-2.5);
App.scene.MyColoredCube3.position.SetX(2.5);

// ROTATING
// Stop
//App.scene.MyCubeTex.rotationSpeed = 0;

// Rotate
//App.scene.MyCubeTex.rotationSpeed = 50;

// Direction of rotating
//App.scene.MyCubeTex.rotDirection.SetDirectionZ()
//App.scene.MyCubeTex.rotDirection.SetDirectionX()
//App.scene.MyCubeTex.rotDirection.SetDirectionY()
