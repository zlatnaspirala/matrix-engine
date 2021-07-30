/**
 *@Author Nikola Lukic
 *@Description Matrix Engine Api Example
 */

import App from "../program/manifest";

export var runThis = (world) => {

  world.Add("square", 1, "MyColoredSquareRayObject");
  App.scene.MyColoredSquareRayObject.position.SetX(0);

  canvas.addEventListener('mousedown', (ev) => {
    matrixEngine.raycaster.checkingProcedure(ev);
  });
  // App.scene.MyColoredSquare1.rotation.rotationSpeed.x = 15;

};
