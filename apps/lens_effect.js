/**
 *@Author Nikola Lukic
 *@Description Matrix Engine Api Example
 * From version [1.8.9]
 * Lens effect shader
 * - Lens effect
 */

/* globals world App */
import App from "../program/manifest";

export var runThis = (world) => {

  // Image texs
  var tex = {
    source: ["res/images/complex_texture_1/diffuse.png"],
    mix_operation: "multiply",
  };

  // Camera
  App.camera.SceneController = true;

  world.Add("cubeLightTex", 1, "myCube1", tex);
  App.scene.myCube1.activateShadows('lens');
  App.scene.myCube1.position.setPosition(0, 0, -7);
  App.scene.myCube1.rotation.rotationSpeed.x = 0;
  App.scene.myCube1.shadows.activeUpdate();
  App.scene.myCube1.shadows.animateCenterX({from: 0, to: 1125, step: 10});
  App.scene.myCube1.shadows.animateCenterY({from: 0, to: 1125, step: 10});

  App.scene.myCube1.LightsData.directionLight.set(0.5, 0.5, 0.5);

  // Click event
  canvas.addEventListener('mousedown', (ev) => {
    matrixEngine.raycaster.checkingProcedure(ev);
  });

  addEventListener("ray.hit.event", function(e) {
    e.detail.hitObject.LightsData.ambientLight.r =
      matrixEngine.utility.randomFloatFromTo(0, 2);
    e.detail.hitObject.LightsData.ambientLight.g =
      matrixEngine.utility.randomFloatFromTo(0, 2);
    e.detail.hitObject.LightsData.ambientLight.b =
      matrixEngine.utility.randomFloatFromTo(0, 2);
    console.info(e.detail);
  });

};
