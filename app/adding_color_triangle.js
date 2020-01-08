/**
 *@Author Nikola Lukic
 *@Description webGl2 api example
 */

/* globals world App world */

world.Add("triangle", 1, "MyColoredTriangle1");
world.Add("triangle", 1, "MyColoredTriangle2");
world.Add("triangle", 1, "MyColoredTriangle3");

// SET POSITION
App.scene.MyColoredTriangle1.position.SetX(2.5);
App.scene.MyColoredTriangle2.position.SetX(0);
App.scene.MyColoredTriangle3.position.SetX(-2.5);

// ROTATING
// Stop
App.scene.MyColoredTriangle2.rotationSpeed = -10;

// Rotate
// Direction of rotating
App.scene.MyColoredTriangle2.rotDirection.SetDirectionZ();
