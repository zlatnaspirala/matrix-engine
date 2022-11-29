/**
 *@Author Nikola Lukic
 *@Description Matrix Engine Api Example
 * From version [1.8.15]
 * Spot Light/Shadows shader
 */

/* globals world App */
import App from "../program/manifest";

export var runThis = (world) => {

  // Camera
  // App.camera.FirstPersonController = true;
  App.camera.SceneController = true;

  // Image texs
  var tex = {
    source: ["res/images/complex_texture_1/diffuse.png"],
    mix_operation: "multiply",
  };

  // world.Add("squareTex", 2, "myCube", tex);
  // App.scene.myCube.position.SetZ(-11);
  // App.scene.myCube.position.SetX(0);
  // App.scene.myCube.position.SetY(2);
  // // App.scene.myCube5.rotation.rotateX(90)
  // App.scene.myCube.activateShadows('spot-shadow');
  // App.scene.myCube.shadows.innerLimit = 0
  // App.scene.myCube.shadows.activeUpdate();
  // App.scene.myCube.rotation.rotx = -80;
  // App.scene.myCube.shadows.lightPosition = [0,-1,0]
 
  // Created with blanko texture or red, blue or green solid.
  // then add new tex sampler created generic square 2x2 by default.
  world.Add("squareTex", 4, "myCube5", tex);
  App.scene.myCube5.position.SetZ(-11);
  App.scene.myCube5.position.SetX(0);
  App.scene.myCube5.position.SetY(1);
  App.scene.myCube5.activateShadows('spot-shadow');
  App.scene.myCube5.shadows.innerLimit = 0
  App.scene.myCube5.shadows.activeUpdate();
  App.scene.myCube5.rotation.rotx = -80;
  App.scene.myCube5.shadows.lightPosition = [0,-1,0]
 
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
