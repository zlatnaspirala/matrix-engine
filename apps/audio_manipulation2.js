/**
 * @Author Nikola Lukic
 * @Description Matrix Engine Api Example.
 */

import * as matrixEngine from '../index.js';
let ENUMERATORS = matrixEngine.utility.ENUMERATORS;

export var runThis = (world) => {
  // need to be removed from bvh-loader npm package!
  var logHTML = document.createElement('div');
  logHTML.id = 'log';
  // logHTML.style.position = 'absolute';
  document.body.appendChild(logHTML);

  var App = matrixEngine.App;

  var effectOsci = new matrixEngine.utility.OSCILLATOR(3, 10, 1);
  var effectOsci2 = new matrixEngine.utility.OSCILLATOR(3, 10, 1);

  effectOsci2.value_ = 6;

  ///////////////////////////////
  const options = {
    world: world, // [Required]
    autoPlay: true, // [Optimal]
    showOnLoad: false, // [Optimal] if autoPLay is true then showOnLoad is inactive.
    type: 'ANIMATION', // [Optimal] 'ANIMATION' | "TPOSE'
    loop: 'playInverse', // [Optimal] true | 'stopOnEnd' | 'playInverse' | 'stopAndReset'
    globalOffset: [-10, -14, -245], // [Optimal]
    skeletalBoneScale: 2, // [Optimal]
    skeletalBlend: {
      // [Optimal] remove arg for no blend
      paramDest: 3,
      paramSrc: 4
    },
    boneTex: {
      source: ['res/images/complex_texture_1/diffuse.png'],
      mix_operation: 'multiply'
    },
    drawTypeBone: 'sphereLightTex' // pyramid | triangle | cube | square | squareTex | cubeLightTex | sphereLightTex
  };

  const filePath = 'https://raw.githubusercontent.com/zlatnaspirala/Matrix-Engine-BVH-test/main/javascript-bvh/example.bvh';
  var myFirstBvhAnimation = new matrixEngine.MEBvhAnimation(filePath, options);

  // 2

  const options2 = {
    world: world,
    autoPlay: true,
    myFrameRate: 10,
    showOnLoad: false, // if autoPLay is true then showOnLoad is inactive.
    type: 'ANIMATION', // "TPOSE' | 'ANIMATION'
    loop: 'playInverse', // true | 'stopOnEnd' | 'playInverse' | 'stopAndReset'
    globalOffset: [40, -180, -155],
    skeletalBoneScale: 6,
    boneNameBasePrefix: 'backWalk',
    skeletalBlend: {paramDest: 7, paramSrc: 6}, // remove arg for no blend
    boneTex: {
      source: ['res/images/512.png'],
      mix_operation: 'multiply'
    },
    drawTypeBone: 'squareTex' // pyramid | triangle | cube | square | squareTex | cubeLightTex | sphereLightTex'
  };

  window.myFirstBvhAnimation = myFirstBvhAnimation;

  const filePath2 = 'res/bvh/Female1_B04_StandToWalkBack.bvh';
  var myBvhAnimation = new matrixEngine.MEBvhAnimation(filePath2, options2);

  // 3
  const options3 = {
    world: world,
    autoPlay: true,
    myFrameRate: 10,
    showOnLoad: false, // if autoPLay is true then showOnLoad is inactive.
    type: 'ANIMATION', // "TPOSE' | 'ANIMATION'
    loop: 'playInverse', // true | 'stopOnEnd' | 'playInverse' | 'stopAndReset'
    globalOffset: [-30, -180, -255],
    skeletalBoneScale: 6,
    boneNameBasePrefix: 'stand3',
    skeletalBlend: {paramDest: 7, paramSrc: 6}, // remove arg for no blend
    boneTex: {
      source: ['res/images/512.png'],
      mix_operation: 'multiply'
    },
    drawTypeBone: 'cubeLightTex' // pyramid | triangle | cube | square | squareTex | cubeLightTex | sphereLightTex'
  };

  const filePath3 = 'res/bvh/Female1_A01_Stand.bvh';
  var myBvhAnimation3 = new matrixEngine.MEBvhAnimation(filePath3, options3);
  window.myBvhAnimation3 = myBvhAnimation3;

   // 3
   const options4 = {
    world: world,
    autoPlay: true,
    myFrameRate: 10,
    showOnLoad: false, // if autoPLay is true then showOnLoad is inactive.
    type: 'ANIMATION', // "TPOSE' | 'ANIMATION'
    loop: 'playInverse', // true | 'stopOnEnd' | 'playInverse' | 'stopAndReset'
    globalOffset: [-170, -180, -295],
    skeletalBoneScale: 6,
    boneNameBasePrefix: 'standUraban',
    skeletalBlend: {paramDest: 7, paramSrc: 6}, // remove arg for no blend
    boneTex: {
      source: ['res/images/512.png'],
      mix_operation: 'multiply'
    },
    drawTypeBone: 'cubeLightTex' // pyramid | triangle | cube | square | squareTex | cubeLightTex | sphereLightTex'
  };

  const filePath4 = 'res/bvh/Female1_D1_Urban.bvh';
  var myBvhAnimation4 = new matrixEngine.MEBvhAnimation(filePath4, options4);

  var matrixIcon =  {
    source: ['res/images/512.png'],
    mix_operation: 'multiply'
  };

  var matrixIcon2 =  {
    source: ['res/images/semi_pack/gradiend_half1.png'],
    mix_operation: 'multiply'
  };

  for (var i = 1; i < 1024; i = i + 80) {
    world.Add('pyramid', 0.1 + i / 500, 'MyPyramid' + i);
    world.Add('cubeLightTex', 0.1 + i / 100, 'MyCube' + i, matrixIcon);
    world.Add('cubeLightTex', 0.1 + i / 100, 'MyCube2__' + i, matrixIcon2);
  }

  var myMarginY = -5;
  var mymarginYCube = -10;

  for (var i = 1; i < 1024; i = i + 80) {
    App.scene['MyPyramid' + i].position.SetY(myMarginY);
    App.scene['MyPyramid' + i].position.SetZ(-16);
    App.scene['MyPyramid' + i].rotation.rotationSpeed.y = 15;
    App.scene['MyPyramid' + i].glBlend.blendEnabled = true;
    App.scene['MyPyramid' + i].glBlend.blendParamSrc = ENUMERATORS.glBlend.param[6];
    App.scene['MyPyramid' + i].glBlend.blendParamDest = ENUMERATORS.glBlend.param[6];

    App.scene['MyCube' + i].glBlend.blendEnabled = true;
    App.scene['MyCube' + i].glBlend.blendParamSrc = ENUMERATORS.glBlend.param[4];
    App.scene['MyCube' + i].glBlend.blendParamDest = ENUMERATORS.glBlend.param[4];
    App.scene['MyCube' + i].position.SetZ(-70);
    App.scene['MyCube' + i].position.SetX(-32);

    App.scene['MyCube' + i].rotation.rotateY(45);

    App.scene['MyCube2__' + i].glBlend.blendEnabled = true;
    App.scene['MyCube2__' + i].glBlend.blendParamSrc = ENUMERATORS.glBlend.param[4];
    App.scene['MyCube2__' + i].glBlend.blendParamDest = ENUMERATORS.glBlend.param[6];
    App.scene['MyCube2__' + i].position.SetZ(-70);
    App.scene['MyCube2__' + i].position.SetX(27);
    // App.scene['MyCube2__' + i].position.SetY(mymarginYCube);
    App.scene['MyCube2__' + i].rotation.rotateY(-45);

    App.scene['MyCube2__' + i].rotation.rotationSpeed.y = 10;
    

  }

  matrixEngine.utility.byId('debugBox').style.display = 'block';
  matrixEngine.utility.byId('debugBox').style.width = '100%';
  matrixEngine.utility.byId('debugBox').style.height = '40px';
  matrixEngine.utility.byId('debugBox').innerHTML = `
  Music used: BLACK FLY by Audionautix | http://audionautix.com
  Music promoted by https://www.free-stock-music.com
  Creative Commons Attribution-ShareAlike 3.0 Unported
  https://creativecommons.org/licenses/by-sa/3.0/deed.en_US
  Mix of audio vs bvh operation. @zlatnaspirala
  `;

  App.onload = function (e) {
    var test = App.audioSystem.createMusicAsset('blackfly', 'audionautix-black-fly.mp3');
    test
      .then(() => {
        console.log('Audio context access successed!');
      })
      .catch(() => {
        console.log('Ok there is no auto play for audio context. User need to click any where .');
        function userRequest() {
          App.onload();
          removeEventListener('click', userRequest);
        }
        addEventListener('click', userRequest, false);
      });

    // Just for dev
    window.blackfly = App.audioSystem.Assets.blackfly;

    var source = blackfly.context.createMediaElementSource(blackfly.video);
    source.connect(blackfly.gainNode);
    blackfly.gainNode.connect(blackfly.filter);
    blackfly.filter.connect(blackfly.context.destination);

    blackfly.analyser = blackfly.context.createAnalyser();
    source.connect(blackfly.analyser);
    blackfly.frequencyData = new Uint8Array(blackfly.analyser.frequencyBinCount);

    var PARAMETER1 = 20;
    var PARAMETER2 = 6;
    var mymarginYCubeLeft = 35;

    blackfly.UPDATE = function () {
      blackfly.analyser.getByteFrequencyData(blackfly.frequencyData);
      for (var i = 1, j = 1; i < 1024; i = i + 80, j = j + 40) {
        App.scene['MyPyramid' + i].position.SetY(blackfly.frequencyData[i] / PARAMETER1 + myMarginY);
        App.scene['MyCube' + i].position.SetY(blackfly.frequencyData[i] / PARAMETER2 + mymarginYCube);
        App.scene['MyCube2__' + i].position.SetY(blackfly.frequencyData[i] / PARAMETER2 + mymarginYCube);

        App.scene['MyPyramid' + i].glBlend.blendParamSrc = matrixEngine.utility.ENUMERATORS.glBlend.param[effectOsci.value_-1];
        App.scene['MyPyramid' + i].glBlend.blendParamDest = matrixEngine.utility.ENUMERATORS.glBlend.param[effectOsci2.value_-1];

        App.scene['MyCube' + i].glBlend.blendParamSrc = matrixEngine.utility.ENUMERATORS.glBlend.param[effectOsci.value_];
        App.scene['MyCube' + i].glBlend.blendParamDest = matrixEngine.utility.ENUMERATORS.glBlend.param[effectOsci2.value_];

        App.scene['MyCube2__' + i].glBlend.blendParamSrc = matrixEngine.utility.ENUMERATORS.glBlend.param[effectOsci.value_];
        App.scene['MyCube2__' + i].glBlend.blendParamDest = matrixEngine.utility.ENUMERATORS.glBlend.param[effectOsci2.value_];
      }
    };

    setInterval(() => {
      effectOsci.UPDATE();
      effectOsci2.UPDATE();
    }, 1000);

    App.updateBeforeDraw.push(blackfly);
  };

  App.onload();
};
