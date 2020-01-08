/**
 *@Author Nikola Lukic
 *@Description webGl2 api example
 */

/* globals world App world */

world.Add("pyramid",1 , "MyPyramid1");
world.Add("pyramid",1 , "MyPyramid2");
world.Add("pyramid",1 , "MyPyramid3");

// SET POSITION
App.scene.MyPyramid1.position.SetX(2.5);
App.scene.MyPyramid2.position.SetX(0);
App.scene.MyPyramid3.position.SetX(-2.5);

// ROTATING
// Stop = 0
App.scene.MyPyramid1.rotationSpeed = 10;
App.scene.MyPyramid2.rotationSpeed = 30;
App.scene.MyPyramid3.rotationSpeed = 20;
// Rotate

// Direction of rotating
App.scene.MyPyramid1.rotDirection.SetDirectionZ();
App.scene.MyPyramid2.rotDirection.SetDirectionX();
App.scene.MyPyramid3.rotDirection.SetDirectionY();
