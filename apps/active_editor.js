/**
 * @Author Nikola Lukic
 * @Description Matrix Engine Api Example.
 * How to use texture editor
 */
import App from "../program/manifest";
import * as matrixEngine from "../index.js";
let ENUMERATORS = matrixEngine.utility.ENUMERATORS;
let Vjs3 = matrixEngine.Engine.Vjs3;
let E = matrixEngine.utility.E;
import * as CANNON from 'cannon';

export var runThis = world => {
  App.camera.SceneController = true;
  // eslint-disable-next-line no-unused-vars
  var tex = {
    source: [
      "res/images/complex_texture_1/diffuse.png",
      "res/images/semi_pack/gradiend_half2.png"
    ],
    mix_operation: "multiply",
  };

  var texStone = {
    source: ["res/images/n-stone.png"],
    mix_operation: "multiply"
  };

  canvas.addEventListener('mousedown', (ev) => {
    matrixEngine.raycaster.checkingProcedure(ev);
  });

  window.addEventListener('ray.hit.event', (ev) => {
    console.log("You shoot the object! Nice!", ev)
    // Physics force apply
    if(ev.detail.hitObject.physics.enabled == true) {
      ev.detail.hitObject.physics.currentBody.force.set(0, 0, 1000);

      App.scene.outsideBox.playerHits++;
      var actualTexFrame = document.getElementById('actualTexture')
      actualTexFrame.contentWindow.title.TEXTBOX.TEXT = 'HITS:' + App.scene.outsideBox.playerHits;

      // double - this is deep from raycaster
      App.scene.outsideBox2.playerHits++;
      var tex1 = document.getElementById('tex1')
      tex1.contentWindow.hits.TEXTBOX.TEXT = 'HITS:' + App.scene.outsideBox2.playerHits;
    }
  });

  // Matrix Engine use visual-js game engine like texture editor.
  world.Add("cubeLightTex", 1, "outsideBox", tex);
  App.scene.outsideBox.playerHits = 0;
  App.scene.outsideBox.rotation.rotz = -90
  App.scene.outsideBox.position.y = 0;
  App.scene.outsideBox.position.z = -55;
  App.scene.outsideBox.LightsData.ambientLight.set(1, 1, 1);
  App.scene.outsideBox.glBlend.blendEnabled = true;
  App.scene.outsideBox.glBlend.blendParamSrc = ENUMERATORS.glBlend.param[5];
  App.scene.outsideBox.glBlend.blendParamDest = ENUMERATORS.glBlend.param[5];

  E("webcam_beta").style.display = "none";
  App.scene.outsideBox.streamTextures = new Vjs3(
    "http://localhost/PRIVATE_SERVER/me/me/2DTextureEditor/actual.html",
    "actualTexture"
  );

  App.scene.outsideBox.streamTextures.showTextureEditor();
  setTimeout(() => {E("HOLDER_STREAMS").style.display = 'none';}, 450)

  // Matrix Engine use visual-js game engine like texture editor in multiply times.
  world.Add("cubeLightTex", 1, "outsideBox2", tex);
  App.scene.outsideBox2.playerHits = 0;
  App.scene.outsideBox2.rotation.rotz = -90
  App.scene.outsideBox2.position.y = 0;
  App.scene.outsideBox2.position.z = -55;
  App.scene.outsideBox2.LightsData.ambientLight.set(1, 1, 1);
  App.scene.outsideBox2.glBlend.blendEnabled = true;
  App.scene.outsideBox2.glBlend.blendParamSrc = ENUMERATORS.glBlend.param[5];
  App.scene.outsideBox2.glBlend.blendParamDest = ENUMERATORS.glBlend.param[6];
  App.scene.outsideBox2.streamTextures = new Vjs3(
    "http://localhost/PRIVATE_SERVER/me/me/2DTextureEditor/tex1.html",
    "tex1"
  );

  // App.scene.outsideBox2.streamTextures.showTextureEditor();

  // Walls
  world.Add("cubeLightTex", 1, "WALLRIGHT", texStone);
  App.scene.WALLRIGHT.geometry.setScaleByX(0.5);
  App.scene.WALLRIGHT.geometry.setScaleByY(4);
  App.scene.WALLRIGHT.geometry.setScaleByZ(14);
  App.scene.WALLRIGHT.position.SetX(14);
  App.scene.WALLRIGHT.position.SetY(3);
  App.scene.WALLRIGHT.position.SetZ(-15);
  App.scene.WALLRIGHT.geometry.setTexCoordScaleXFactor(1);

  world.Add("cubeLightTex", 1, "WALLLEFT", texStone);
  App.scene.WALLLEFT.geometry.setScaleByX(0.5);
  App.scene.WALLLEFT.geometry.setScaleByY(4);
  App.scene.WALLLEFT.geometry.setScaleByZ(14);
  App.scene.WALLLEFT.position.SetX(-14);
  App.scene.WALLLEFT.position.SetY(3);
  App.scene.WALLLEFT.position.SetZ(-15);
  App.scene.WALLLEFT.geometry.setTexCoordScaleYFactor(1);

  world.Add("cubeLightTex", 1, "WALLFRONT", texStone);
  App.scene.WALLFRONT.geometry.setScaleByX(14);
  App.scene.WALLFRONT.geometry.setScaleByY(4);
  App.scene.WALLFRONT.geometry.setScaleByZ(0.5);
  App.scene.WALLFRONT.position.SetX(0);
  App.scene.WALLFRONT.position.SetY(3);
  App.scene.WALLFRONT.position.SetZ(-27);
  App.scene.WALLFRONT.geometry.setTexCoordScaleXFactor(1);

  // Load Physics world
  let gravityVector = [0, 0, -9.82];
  let physics = world.loadPhysics(gravityVector);
  // Add ground (this func create scene object FLOOR_STATIC)
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

  var b2 = new CANNON.Body({
    mass: 5,
    position: new CANNON.Vec3(0, -5, 1),
    shape: new CANNON.Box(new CANNON.Vec3(1, 1, 1))
  });
  physics.world.addBody(b2);
  // Physics
  App.scene.outsideBox2.physics.currentBody = b2;
  App.scene.outsideBox2.physics.enabled = true;

  App.scene.FLOOR_STATIC.geometry.setTexCoordScaleFactor(1);
};