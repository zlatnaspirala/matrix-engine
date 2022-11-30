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

  world.Add("cubeLightTex", 0.2, "myCube", tex);
  App.scene.myCube.position.SetZ(-11);
  App.scene.myCube.position.SetX(1);
  App.scene.myCube.position.SetY(0.6);
  // App.scene.myCube.activateShadows('spot');

  world.Add("squareTex", 5, "myCube5", tex);
  App.scene.myCube5.position.SetZ(-12);
  App.scene.myCube5.position.SetX(0);
  App.scene.myCube5.position.SetY(0);
  App.scene.myCube5.activateShadows('lens');
 
  world.Add("squareTex", 3, "MyColoredCube1", tex);
  App.scene.MyColoredCube1.position.SetZ(-11);
  App.scene.MyColoredCube1.position.SetX(0);
  App.scene.MyColoredCube1.position.SetY(-2);
  //App.scene.MyColoredCube1.activateShadows('spot');
  // App.scene.MyColoredCube1.shadows.innerLimit = 0
  // App.scene.MyColoredCube1.shadows.activeUpdate();
  // App.scene.MyColoredCube1.rotation.rotx = -80;
  // App.scene.MyColoredCube1.shadows.lightPosition = [0, -5 ,0]

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
