/*
  Nikola Lukic
  webGl2GLmatrix2 api example
*/
/* globals App world VIDEO_TEXTURE ENUMERATORS */

/**
 * @Author Nikola Lukic
 * @Description Matrix Engine Api Example.
 */

/* globals world App world */
import App from "../program/manifest";
import * as matrixEngine from "../index.js";
let VT = matrixEngine.Engine.VT;

export var runThis = world => {
  // eslint-disable-next-line no-unused-vars

  App.camera.SceneController = true;

  let ENUMERATORS = matrixEngine.utility.ENUMERATORS;

  var tex = {
    source: ["res/images/complex_texture_1/diffuse.png"],
    mix_operation: "multiply", // ENUM : multiply , divide ,
  };

  world.Add("cubeLightTex", 2, "outsideBox", tex);
  // App.scene.outsideBox.geometry.setScaleByY(7)
  App.scene.outsideBox.position.x = -9;
  App.scene.outsideBox.position.z = -24;
  // App.scene.outsideBox.rotation.rotationSpeed.z = 50;
  App.scene.outsideBox.LightsData.ambientLight.set(0, 0, 0);
  App.scene.outsideBox.streamTextures = new VT(
    "res/video-texture/lava1.mkv"
  );

  world.Add("cubeLightTex", 2, "outsideBox", tex);
  // App.scene.outsideBox.geometry.setScaleByY(7)
  App.scene.outsideBox.position.x = 9;
  App.scene.outsideBox.position.z = -24;
  // App.scene.outsideBox.rotation.rotationSpeed.z = 50;
  App.scene.outsideBox.LightsData.ambientLight.set(1, 0, 0);
  App.scene.outsideBox.streamTextures = new VT(
    "res/video-texture/lava1.mkv"
  );


  world.Add("cubeLightTex", 5, "outsideBox2", tex);
  App.scene.outsideBox2.position.x = 0;
  App.scene.outsideBox2.position.z = -24;
  App.scene.outsideBox2.rotation.rotationSpeed.y = 10
  App.scene.outsideBox2.rotation.rotx = 45
  App.scene.outsideBox2.streamTextures = new VT(
    "res/video-texture/me.mkv"
  );
  
  App.scene.outsideBox2.glBlend.blendEnabled = true;
  App.scene.outsideBox2.blendParamSrc = matrixEngine.utility.ENUMERATORS.glBlend.param[6];
  App.scene.outsideBox2.blendParamDest = matrixEngine.utility.ENUMERATORS.glBlend.param[6];

  
  setInterval(function () {
    App.scene.outsideBox.geometry.texCoordsPoints.front.right_top.x += 0.01;
    App.scene.outsideBox.geometry.texCoordsPoints.front.left_bottom.x += 0.01;
    App.scene.outsideBox.geometry.texCoordsPoints.front.left_top.x += 0.01;
    App.scene.outsideBox.geometry.texCoordsPoints.front.right_bottom.x += 0.01;
  }, 20);

};
