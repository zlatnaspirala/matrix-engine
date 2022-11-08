/**
 *@Author Nikola Lukic
 *@Description Matrix Engine Api Example
 * From version [1.7.6]
 * Local Light/Shadows shader
 * - Spot ligth for now works perfect for fixed camera movement.
 * - Direction, ambient working fine also with spot light.
 */

/* globals world App */
import App from "../program/manifest";

export var runThis = (world) => {

  // Camera
  App.camera.SceneController = true;

  // Image texs
  var textuteImageSamplers = {
    source: ["res/images/complex_texture_1/diffuse.png"],
    mix_operation: "multiply",
  };

  world.Add("cubeLightTex", 1, "myCube1", textuteImageSamplers);
  App.scene.myCube1.activateShadows();
  App.scene.myCube1.position.setPosition(0,0,-4);
  // Local Shadows cast must be activated!

  App.scene.myCube1.shadows.innerLimit = 0;

  App.scene.myCube1.shadows.activeUpdate();
  App.scene.myCube1.shadows.animatePositionX();

  // Click event
  canvas.addEventListener('mousedown', (ev) => {
    matrixEngine.raycaster.checkingProcedure(ev);
  });

  addEventListener("ray.hit.event", function(e) {
    e.detail.hitObject.LightsData.ambientLight.r =
      matrixEngine.utility.randomFloatFromTo(0, 10);
    e.detail.hitObject.LightsData.ambientLight.g =
      matrixEngine.utility.randomFloatFromTo(0, 10);
    e.detail.hitObject.LightsData.ambientLight.b =
      matrixEngine.utility.randomFloatFromTo(0, 10);
    console.info(e.detail);
  });

};
