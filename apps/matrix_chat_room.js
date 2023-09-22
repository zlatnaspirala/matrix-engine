/**
 * @Author Nikola Lukic
 * @Description Matrix Engine Api Example.
 */

import App from "../program/manifest";
import * as matrixEngine from "../index.js";
let VT = matrixEngine.Engine.VT;

export var runThis = world => {
  App.camera.SceneController = true;
  // let ACCESS_CAMERA =  matrixEngine.Engine.ACCESS_CAMERA;
  // Must be activate
  matrixEngine.Engine.activateNet();
  // Must be activate for scene objects also.
  // This is only to force avoid unnecessary networking emit!
  // let ENUMERATORS = matrixEngine.utility.ENUMERATORS;
  var tex = {
    source: ["res/images/complex_texture_1/diffuse.png"],
    mix_operation: "multiply", // ENUM : multiply , divide ,
  };

  world.Add("cubeLightTex", 3, "outsideBox", tex);
  // App.scene.outsideBox.geometry.setScaleByY(7)
  App.scene.outsideBox.position.x = 0;
  App.scene.outsideBox.position.z = -17;
  // App.scene.outsideBox.rotation.rotationSpeed.z = 30;
  App.scene.outsideBox.LightsData.ambientLight.set(1, 1, 1);
  App.scene.outsideBox.net.enable = true;
  App.scene.outsideBox.net.activate();

  addEventListener('stream-loaded', (e) => {
    var _ = document.querySelectorAll('.media-box')
    _.forEach((i) => {
      if(e.detail.data.userId == i.children[0].innerHTML) {
        // This is video element!
        App.scene.outsideBox.streamTextures = matrixEngine.Engine.DOM_VT(i.children[1])
      }
    })
  })

  addEventListener('net-new-user', (e) => {})

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

  setInterval(function() {
    App.scene.outsideBox.geometry.texCoordsPoints.front.right_top.x += 0.01;
    App.scene.outsideBox.geometry.texCoordsPoints.front.left_bottom.x += 0.01;
    App.scene.outsideBox.geometry.texCoordsPoints.front.left_top.x += 0.01;
    App.scene.outsideBox.geometry.texCoordsPoints.front.right_bottom.x += 0.01;
  }, 20);

};
