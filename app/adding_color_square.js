/**
 *@Author Nikola Lukic
 *@Description webGl2 api example
 */

/* globals world App world */

world.Add("square", 1, "MyColoredSquare1");
world.Add("square", 1.1, "MyColoredSquare2");
world.Add("square", 1.2, "MyColoredSquare3");

// SET POSITION
App.scene.MyColoredSquare1.position.SetX(2.5);
App.scene.MyColoredSquare2.position.SetX(0);
App.scene.MyColoredSquare3.position.SetX(-2.5);

//App.scene.MySquare.position.SetX(-2.5);
//App.scene.MyCubeTex.position.SetY(1);
//App.scene.MyPyramid.position.SetY(-2.5);
//App.scene.objectFileChurch.position.SetX(-2.5);

// ROTATING
// Stop
//App.scene.MyCubeTex.rotationSpeed = 0;

// Rotate
//App.scene.MyCubeTex.rotationSpeed = 50;

// Direction of rotating
//App.scene.MyCubeTex.rotDirection.SetDirectionZ()
//App.scene.MyCubeTex.rotDirection.SetDirectionX()
//App.scene.MyCubeTex.rotDirection.SetDirectionY()
