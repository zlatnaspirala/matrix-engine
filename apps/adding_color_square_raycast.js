/**
 *@Author Nikola Lukic
 *@Description Matrix Engine Api Example
 */

import App from "../program/manifest";

export var runThis = (world) => {

  var textuteImageSamplers = {
    source: ["res/images/complex_texture_1/diffuse.png"],
    mix_operation: "multiply",
  };

  world.Add("cubeLightTex", 1, "MyColoredSquareRayObject",textuteImageSamplers );
  App.scene.MyColoredSquareRayObject.position.SetX(0);

  canvas.addEventListener('mousedown', (ev) => {
    matrixEngine.raycaster.checkingProcedure(ev);
  });

  canvas.addEventListener('ray.hit.event', (ev) => {
    alert("You shoot the object! Nice")
  });

  // App.scene.MyColoredSquare1.rotation.rotationSpeed.x = 15;

};
