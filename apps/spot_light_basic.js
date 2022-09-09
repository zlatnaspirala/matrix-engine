/**
 *@Author Nikola Lukic
 *@Description Matrix Engine Api Example
 * From version [1.7.6]
 */

/* globals world App */
import App from "../program/manifest";

export var runThis = (world) => {

  // Camera
  App.camera.SceneController = true;

  // Image tex
  var textuteImageSamplers = {
    source: ["res/images/complex_texture_1/diffuse.png"],
    mix_operation: "multiply",
  };

  var textuteImageSamplersTest = {
    source: ["res/images/texture_spiral1.png", "res/images/complex_texture_1/diffuse.png"],
    mix_operation: "multiply",
  };

  console.log("NNNNN")

  // world.Add("cube", 1, "myCube1");
  world.Add("cubeLightTex", 1, "myCube1", textuteImageSamplers);
  App.scene.myCube1.activateShadows();
  world.Add("cubeLightTex", 1, "myCube2", textuteImageSamplers);
  App.scene.myCube2.activateShadows();
  world.Add("cubeLightTex", 1, "myCube3", textuteImageSamplers);
  App.scene.myCube3.activateShadows();
  world.Add("cubeLightTex", 1, "myCube11", textuteImageSamplers);
  App.scene.myCube11.activateShadows();

  //textuteImageSamplersTest
  world.Add("cubeLightTex", 1, "CubeVertexColor", textuteImageSamplersTest);
  App.scene.CubeVertexColor.position.SetZ(-11);

  // App.scene.CubeVertexColor.deactivateTex()
  // App.scene.CubeVertexColor.geometry.colorData.SetGreenForAll(0.5)
  // App.scene.CubeVertexColor.geometry.colorData.SetRedForAll(0.5)
  // App.scene.CubeVertexColor.geometry.colorData.SetBlueForAll(0.5)
  // App.scene.CubeVertexColor.geometry.colorData.SetTopSolidColor(0.5,0.5,0.5,1)
  // App.scene.CubeVertexColor.geometry.colorData.SetBackSolidColor(0.5,0.5,0.5,1)
  // App.scene.CubeVertexColor.geometry.colorData.SetBottomSolidColor(0.5,0.5,0.5,1)

  // App.scene.CubeVertexColor.activateShadows();
  // App.scene.CubeVertexColor.shadows.activeUpdate();
  // App.scene.CubeVertexColor.shadows.lightPosition = [0, 3, 3];

  App.scene.myCube11.position.SetY(3);
  App.scene.myCube11.position.SetZ(-11);
  App.scene.myCube11.shadows.activeUpdate();
  App.scene.myCube11.shadows.animatePositionY();
  App.scene.myCube11.position.SetX(0);


  // CLick event
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

  App.scene.myCube1.position.SetY(3);
  App.scene.myCube1.position.SetZ(-11);
  App.scene.myCube1.position.SetX(-3);
  App.scene.myCube1.shadows.activeUpdate();
  App.scene.myCube1.shadows.animatePositionX();



  App.scene.myCube2.shadows.lightPosition = [0, 0, 3];
  App.scene.myCube2.shadows.innerLimit = 0;
  App.scene.myCube2.position.SetX(-3);
  App.scene.myCube2.position.SetZ(-11);

  // Local Shadows cast must be activated!
  App.scene.myCube2.shadows.activeUpdate();
  App.scene.myCube2.shadows.animateRadius({from: 0 , to: 25, step : 0.5});

  App.scene.myCube3.shadows.innerLimit = 0;
  App.scene.myCube3.position.SetY(-3);
  App.scene.myCube3.position.SetZ(-11);
  App.scene.myCube3.position.SetX(-3);
  App.scene.myCube3.shadows.lightPosition = [0, 3, 3];

  // animate local spot
  var option = {
    from: 0.01, to: 0.02, step: 0.001,
    centerX: 0, centerY: 0,
    flyArroundByIndexs: [1, 2] // Means that Y,Z coords are orbiting
  };

  // Local Shadows cast must be activated!
  App.scene.myCube3.shadows.activeUpdate();
  App.scene.myCube3.shadows.flyArround(option);

};
