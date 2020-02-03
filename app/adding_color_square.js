/**
 *@Author Nikola Lukic
 *@Description webGl2GLmatrix2 api example
 */
/* globals world App world */

world.Add("square", 1, "MyColoredSquare1");
world.Add("square", 1.1, "MyColoredSquare2");
world.Add("square", 1.2, "MyColoredSquare3");

App.scene.MyColoredSquare1.position.SetX(2.5);
App.scene.MyColoredSquare2.position.SetX(0);
App.scene.MyColoredSquare3.position.SetX(-2.5);

App.scene.MyColoredSquare1.rotation.rotationSpeed.x = 15;
App.scene.MyColoredSquare2.rotation.rotationSpeed.x = 15;
App.scene.MyColoredSquare3.rotation.rotationSpeed.x = 15;
