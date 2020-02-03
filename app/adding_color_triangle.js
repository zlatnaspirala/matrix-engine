/**
 *@Author Nikola Lukic
 *@Description webGl2GLmatrix2 api example
 */
/* globals world App world */

world.Add("triangle", 1, "MyColoredTriangle1");
world.Add("triangle", 1, "MyColoredTriangle2");
world.Add("triangle", 1, "MyColoredTriangle3");

App.scene.MyColoredTriangle1.position.SetX(2.5);
App.scene.MyColoredTriangle2.position.SetX(0);
App.scene.MyColoredTriangle3.position.SetX(-2.5);

App.scene.MyColoredTriangle1.rotation.rotationSpeed.z = -10;
App.scene.MyColoredTriangle2.rotation.rotationSpeed.z = -10;
App.scene.MyColoredTriangle3.rotation.rotationSpeed.z = -10;
