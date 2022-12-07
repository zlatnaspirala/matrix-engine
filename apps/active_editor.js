/**
 * @Author Nikola Lukic
 * @Description Matrix Engine Api Example.
 */

import App from "../program/manifest";
import * as matrixEngine from "../index.js";
let ENUMERATORS = matrixEngine.utility.ENUMERATORS;
let Vjs3 = matrixEngine.Engine.Vjs3;
let E = matrixEngine.utility.E;
import * as CANNON from 'cannon';

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
    /**
 * Physics force apply
 */
    if(ev.detail.hitObject.physics.enabled == true) {
      ev.detail.hitObject.physics.currentBody.force.set(0, 0, 1000)
    }
  });

  world.Add("cubeLightTex", 1, "outsideBox", tex);

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

 
  world.Add("squareTex", 1, "FLOOR_STATIC2", tex);
  App.scene.FLOOR_STATIC2.geometry.setScaleByX(15);
  App.scene.FLOOR_STATIC2.geometry.setScaleByY(15);
  App.scene.FLOOR_STATIC2.position.SetY(2);
  App.scene.FLOOR_STATIC2.position.SetZ(-15);
  App.scene.FLOOR_STATIC2.rotation.rotx = 90;

  // Load Physics world!
  let gravityVector = [0, 0, -9.82];
  let physics = world.loadPhysics(gravityVector);
  // Add ground
  physics.addGround(App, world, tex);

  var b = new CANNON.Body({
    mass: 5,
    position: new CANNON.Vec3(0, -5, 1),
    shape: new CANNON.Box(new CANNON.Vec3(1, 1, 1))
  });
  physics.world.addBody(b);
  // Physics
  App.scene.outsideBox.physics.currentBody = b;
  App.scene.outsideBox.physics.enabled = true;

  // setTimeout(function () {
  App.scene.outsideBox.streamTextures.showTextureEditor();
  // }, 100);
};
