/**
 * @Author Nikola Lukic
 * @Description Matrix Engine Api Example.
 */

 import App from "../program/manifest";
 import * as matrixEngine from "../index.js";
 let ENUMERATORS = matrixEngine.utility.ENUMERATORS;
 let Vjs3 = matrixEngine.Engine.Vjs3;
 let E = matrixEngine.utility.E;
 
 export var runThis = world => {

  // Matrix Engine

  App.camera.SceneController = true;
  
   // eslint-disable-next-line no-unused-vars
   var tex = {
     source: ["res/images/complex_texture_1/diffuse.png"],
     mix_operation: "multiply",
   };

   canvas.addEventListener('mousedown', (ev) => {
    matrixEngine.raycaster.checkingProcedure(ev);
  });

  window.addEventListener('ray.hit.event', (ev) => {
    console.log("You shoot the object! Nice!", ev)
  });

   world.Add("cubeLightTex", 12, "outsideBox", tex);
 
   App.scene.outsideBox.rotation.rotz = -90
   App.scene.outsideBox.position.y = 0;
   App.scene.outsideBox.position.z = -55;
   // App.scene.outsideBox.rotation.rotationSpeed.z = 50;
   // App.scene.outsideBox.rotValue = 90;
   App.scene.outsideBox.LightsData.ambientLight.set(1, 1, 1);
   App.scene.outsideBox.glBlend.blendEnabled = false;
   App.scene.outsideBox.glBlend.blendParamSrc = ENUMERATORS.glBlend.param[6];
   App.scene.outsideBox.glBlend.blendParamDest = ENUMERATORS.glBlend.param[7];
   App.scene.outsideBox.rotation.SetDirection(1, 1, 0.5);
 
   // CANVAS2D_SURFACE - IS TEXTURE EDITOR
   E("HOLDER_STREAMS").style.display = "block";
   E("webcam_beta").style.display = "none";
   App.scene.outsideBox.streamTextures = new Vjs3(
     "http://localhost/PRIVATE_SERVER/me/me/2DTextureEditor/actual.html",
     "actualTexture"
   );
 
 
   // setTimeout(function () {
     App.scene.outsideBox.streamTextures.showTextureEditor();
   // }, 100);
 };
 