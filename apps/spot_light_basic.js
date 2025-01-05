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
    source: ["res/images/complex_texture_1/diffuse.webp"],
    mix_operation: "multiply",
  };

  var textuteImageSamplersTest = {
    source: ["res/images/texture_spiral1.png", "res/images/complex_texture_1/diffuse.webp"],
    mix_operation: "multiply",
  };

  var textuteBlanko = {
    source: ["res/images/blankoB.png"],
    mix_operation: "multiply"
  };

  world.Add("cubeLightTex", 1, "myCube1", textuteImageSamplers);
  App.scene.myCube1.activateShadows();
  App.scene.myCube1.position.setPosition(-3,3,-11);
  // // Local Shadows cast must be activated!
  App.scene.myCube1.shadows.activeUpdate();
  App.scene.myCube1.shadows.animatePositionX();

	return;
  world.Add("cubeLightTex", 1, "myCube2", textuteImageSamplers);
  App.scene.myCube2.activateShadows();
  App.scene.myCube2.shadows.lightPosition = [0, 0, 3];
  App.scene.myCube2.shadows.innerLimit = 0;
  App.scene.myCube2.position.SetX(-3);
  App.scene.myCube2.position.SetZ(-11);
  App.scene.myCube2.shadows.activeUpdate();
  App.scene.myCube2.shadows.animateRadius({from: 0, to: 25, step: 0.5});

  world.Add("cubeLightTex", 1, "myCube3", textuteImageSamplers);
  App.scene.myCube3.activateShadows();
  App.scene.myCube3.shadows.innerLimit = 0;
  App.scene.myCube3.position.SetY(-3);
  App.scene.myCube3.position.SetZ(-11);
  App.scene.myCube3.position.SetX(-3);
  App.scene.myCube3.shadows.lightPosition = [0, 3, 3];
  // Animate local spot
  var option = {
    from: 0.01, to: 0.02, step: 0.001,
    centerX: 0, centerY: 0,
    flyArroundByIndexs: [1, 2] // Means that Y,Z coords are orbiting
  };
  App.scene.myCube3.shadows.activeUpdate();
  App.scene.myCube3.shadows.flyArround(option);

  // Animate by Y pos
  world.Add("cubeLightTex", 1, "myCube4", textuteImageSamplers);
  App.scene.myCube4.activateShadows();
  App.scene.myCube4.position.SetY(3);
  App.scene.myCube4.position.SetZ(-11);
  App.scene.myCube4.shadows.activeUpdate();
  App.scene.myCube4.shadows.animatePositionY();
  App.scene.myCube4.position.SetX(0);

  // Created with blanko texture or red, blue or green solid.
  // then add new tex sampler created generic square 2x2 by default.
  world.Add("cubeLightTex", 1, "myCube5", textuteBlanko);
  App.scene.myCube5.position.SetZ(-11);
  App.scene.myCube5.activateShadows();
  App.scene.myCube5.shadows.activeUpdate();
  App.scene.myCube5.shadows.animateRadius({from: 15, to: 45, step: 0.05});
  App.scene.myCube5.textures.push(App.scene.myCube5.createPixelsTex())

  // Created with blanko texture or red, blue or green solid.
  world.Add("cubeLightTex", 1, "myCube6", textuteImageSamplersTest);
  App.scene.myCube6.position.SetZ(-11);
  App.scene.myCube6.position.SetY(-3);
  App.scene.myCube6.activateShadows();
  // Animate local spot
  var option = {
    from: 0.01, to: 0.02, step: 0.001,
    centerX: 0, centerY: 0,
    flyArroundByIndexs: [0, 2] // Means that X,Z coords are orbiting
  };
  App.scene.myCube6.shadows.outerLimit = 2;
  // Local Shadows cast must be activated!
  App.scene.myCube6.shadows.activeUpdate();

  App.scene.myCube6.shadows.flyArround(option);
  App.scene.myCube6.textures.push(
    App.scene.myCube6.createPixelsTex()
  );

  // Simple direction light
  world.Add("cubeLightTex", 1, "myCube7", textuteImageSamplersTest);
  App.scene.myCube7.position.setPosition(3,3,-11);
  App.scene.myCube7.geometry.colorData.SetGreenForAll(0.5)
  App.scene.myCube7.geometry.colorData.SetRedForAll(0.5)
  App.scene.myCube7.geometry.colorData.SetBlueForAll(0.5)
  App.scene.myCube7.deactivateTex();

  world.Add("cubeLightTex", 1, "myCube8", textuteImageSamplersTest);
  App.scene.myCube8.position.setPosition(3,0,-11);

  // Custom generic textures. Micro Drawing.
  // Example for arg shema square for now only.
  var options = {
    squareShema: [8,8],
    pixels: new Uint8Array(8 * 8 * 4)
  };
  // options.pixels.fill(0);
  var I = 0, localCounter = 0;
  for (var funny = 0; funny < 8*8*4; funny+=4) {
    localCounter++;
    options.pixels[funny] = I + localCounter;
    options.pixels[funny + 1] = I + 1.5* localCounter;
    options.pixels[funny + 2] = I + 1.2* localCounter;
    options.pixels[funny + 3] = 1;
  }

  options.pixels[4 * 7] = 255;
  options.pixels[4 * 7 + 1] = 1;
  options.pixels[4 * 7 + 2] = 1;

  App.scene.myCube8.textures.push(
    App.scene.myCube8.createPixelsTex(options)
  );

  // Custom generic textures
  world.Add("cubeLightTex", 1, "myCube9", textuteImageSamplersTest);
  App.scene.myCube9.position.setPosition(3,-3,-11);

  // Custom generic textures. Micro Drawing.
  // Example for arg shema square for now only.
  var options = {
    squareShema: [4,4],
    pixels: new Uint8Array(4 * 4 * 4),
    style: {
      type: 'chessboard',
      color1: 0,
      color2: 255
    }
  };

  App.scene.myCube9.textures.push(
    App.scene.myCube9.createPixelsTex(options)
  );

  // App.scene.myCube9.activateShadows();
  // App.scene.myCube9.shadows.activeUpdate();
  // App.scene.myCube9.shadows.animateRadius({from: 15, to: 45, step: 0.05});

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
