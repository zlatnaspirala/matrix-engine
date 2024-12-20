/**
 *@Author Nikola Lukic
 *@Description Matrix Engine Api Example
 */

/* globals world App world */
import App from "../program/manifest";

export var runThis = world => {
  world.Add("triangle", 1, "MyColoredTriangle1");
  world.Add("triangle", 1, "MyColoredTriangle2");
  world.Add("triangle", 1, "MyColoredTriangle3");

  canvas.addEventListener('mousedown', (ev) => {
    matrixEngine.raycaster.checkingProcedure(ev);
  });
  
  App.scene.MyColoredTriangle1.position.SetZ(-4);
  App.scene.MyColoredTriangle1.position.SetX(0);
  App.scene.MyColoredTriangle1.position.SetY(0);

  App.scene.MyColoredTriangle1.position.SetX(2.5);
  App.scene.MyColoredTriangle2.position.SetX(0);
  App.scene.MyColoredTriangle3.position.SetX(-2.5);

  App.scene.MyColoredTriangle1.rotation.rotationSpeed.z = -10;
  App.scene.MyColoredTriangle2.rotation.rotationSpeed.z = -10;
  App.scene.MyColoredTriangle3.rotation.rotationSpeed.z = -10;
};
