/**
 * @Author Nikola Lukic
 * @Description Matrix Engine Api Example.
 */

import * as matrixEngine from '../index.js';

export var runThis = (world) => {
  var App = matrixEngine.App;

  var textuteImageSamplers2 = {
    source: ['res/images/semi_pack/gradiend_half1.png'],
    mix_operation: 'multiply'
  };

  var textuteImageSamplers = {
    source: ['res/images/semi_pack/gradiend_half2.png'],
    mix_operation: 'multiply'
  };

  world.Add('cubeLightTex', 15, 'cube', textuteImageSamplers2);
  App.scene.cube.position.z = -13;
  App.scene.cube.rotation.rotationSpeed.x = 10;

  App.scene.cube.glBlend.blendParamSrc = matrixEngine.utility.ENUMERATORS.glBlend.param[4];
  App.scene.cube.glBlend.blendParamDest = matrixEngine.utility.ENUMERATORS.glBlend.param[4];

  for (var f = 0; f < matrixEngine.utility.ENUMERATORS.glBlend.param.length; f++) {
    world.Add('cubeLightTex', 0.65, 'test' + f, textuteImageSamplers);
    App.scene['test' + f].glBlend.blendEnabled = true;
    App.scene['test' + f].rotation.rotationSpeed.x = 20;
    App.scene['test' + f].position.y = f - 5.5;
    App.scene['test' + f].position.z = -13;
    App.scene['test' + f].position.x = f - 5;
    App.scene['test' + f].glBlend.blendParamSrc = matrixEngine.utility.ENUMERATORS.glBlend.param[f];
    App.scene['test' + f].glBlend.blendParamDest = matrixEngine.utility.ENUMERATORS.glBlend.param[4];
  }
};
