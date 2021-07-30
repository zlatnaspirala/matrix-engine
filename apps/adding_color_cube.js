/**
 *@Author Nikola Lukic
 *@Description Matrix Engine Api Example
 * Adding default color cube.
 */

/* globals world App */
import App from "../program/manifest";

export var runThis = (world) => {

world.Add("cube", 1, "MyColoredCube1");
world.Add("cube", 1, "MyColoredCube2");
world.Add("cube", 1, "MyColoredCube3");

canvas.addEventListener('mousedown', (ev) => {
  matrixEngine.raycaster.checkingProcedure(ev);
});

// SET POSITION
App.scene.MyColoredCube1.position.SetX(0);
App.scene.MyColoredCube2.position.SetX(-2.5);
App.scene.MyColoredCube3.position.SetX(2.5);

App.scene.MyColoredCube1.rotation.rotationSpeed.x = 15;
App.scene.MyColoredCube2.rotation.rotationSpeed.y = 15;
App.scene.MyColoredCube3.rotation.rotationSpeed.z = 15;

};
