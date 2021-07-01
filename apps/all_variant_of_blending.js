/**
 * @Author Nikola Lukic
 * @Description Matrix Engine Api Example.
 */

/* globals world App world */
import App from "../program/manifest";
import * as matrixEngine from "../index.js";

export var runThis = world => {
  /* globals world App ENUMERATORS SWITCHER OSCILLATOR OBJ ACCESS_CAMERA Galactic*/

  var textuteImageSamplers2 = {
    source: ["res/images/semi_pack/gradiend_half1.png"],
    mix_operation: "multiply",
  };

  var textuteImageSamplers = {
    source: ["res/images/semi_pack/gradiend_half2.png"],
    mix_operation: "multiply",
  };

  world.Add("cubeLightTex", 15, "cube", textuteImageSamplers2);
  App.scene.cube.position.z = -13;
  App.scene.cube.rotation.rotationSpeed.x = 10;

  App.scene.cube.glBlend.blendParamSrc = matrixEngine.utility.ENUMERATORS.glBlend.param[4];
  App.scene.cube.glBlend.blendParamDest = matrixEngine.utility.ENUMERATORS.glBlend.param[4];

  for (var f = 0; f < matrixEngine.utility.ENUMERATORS.glBlend.param.length; f++) {
    // for (var d=0;d < ENUMERATORS.glBlend.param.length-5  ; d++) {
    world.Add("cubeLightTex", 0.65, "test" + f, textuteImageSamplers);
    eval("App.scene.test" + f + ".glBlend.blendEnabled = true");
    eval("App.scene.test" + f + ".rotation.rotationSpeed.x = 20");
    eval("App.scene.test" + f + ".position.y =  f - 5.5 ");
    eval("App.scene.test" + f + ".position.z =  -13 ");
    eval("App.scene.test" + f + ".position.x =  f - 5 ");
    eval(
      "App.scene.test" +
        f +
        ".glBlend.blendParamSrc =  matrixEngine.utility.ENUMERATORS.glBlend.param[" +
        f +
        "] "
    );
    eval(
      "App.scene.test" +
        f +
        ".glBlend.blendParamDest =  matrixEngine.utility.ENUMERATORS.glBlend.param[" +
        4 +
        "] "
    );
    // }
  }
};
