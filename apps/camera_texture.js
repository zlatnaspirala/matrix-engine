/* eslint-disable no-unused-vars */
/**
 * @Author Nikola Lukic
 * @Description Matrix Engine Api Example.
 */

/* globals world App world */
import App from "../program/manifest";
import * as matrixEngine from "../index.js";
import {byId, isMobile} from "../lib/utility.js";

let ACCESS_CAMERA = matrixEngine.Engine.ACCESS_CAMERA;

export var runThis = world => {
  /* globals world App ENUMERATORS SWITCHER OSCILLATOR OBJ ACCESS_CAMERA */

  var textuteImageSamplers = {
    source: ["res/images/complex_texture_1/diffuse.png"],
    mix_operation: "multiply",
  };

  /**
   * @description
   * @note ONLY ANDROID DEVICES
   * On simple CUBE works fine!
   * For some reason on android devices it is not possible to use OBJ for video textures.
   * Must be inspected - possible reasons:
   * - Theres some limitation about vertex buffer data!
   */
  if(isMobile() == true) {
    world.Add("cubeLightTex", 1, "TV", textuteImageSamplers);
    App.scene.TV.streamTextures = new ACCESS_CAMERA("webcam_beta");
    byId('webcam_beta').style.display = 'block';
    App.scene.TV.rotation.rotationSpeed.y = 20
    // Example who to switch between simple camera tex and cameraMixCanvas2d (videoImage)
    App.scene.TV.streamTextures.video = App.scene.TV.streamTextures.videoImage;
  } else {
    function onLoadObj(meshes) {
      App.meshes = meshes;
      matrixEngine.objLoader.initMeshBuffers(world.GL.gl, App.meshes.TV);
      world.Add("obj", 1, "TV", textuteImageSamplers, App.meshes.TV);
      setTimeout(function() {
        App.scene.TV.position.y = 0;
        App.scene.TV.position.z = -4;
        App.scene.TV.rotation.rotateY(90);
        App.scene.TV.LightsData.ambientLight.set(1, 1, 1);
        byId('webcam_beta').style.display = 'block';
        App.scene.TV.streamTextures = new ACCESS_CAMERA("webcam_beta");
      }, 1000);
    }
    matrixEngine.objLoader.downloadMeshes({TV: "res/3d-objects/balltest2.obj"}, onLoadObj);
  };
}