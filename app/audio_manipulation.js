/* eslint-disable no-unused-vars */

/**
 * @Author Nikola Lukic
 * @Description Matrix Engine Api Example.
 */

/* globals world App ENUMERATORS SWITCHER OSCILLATOR OBJ ACCESS_CAMERA Galactic*/
import App from "../program/manifest";
import * as matrixEngine from "../index.js";
let ENUMERATORS = matrixEngine.utility.ENUMERATORS;
let E = matrixEngine.utility.E;

export var runThis = world => {

  console.log("world", world)
  for (var i = 1; i < 1024; i = i + 70) {
    world.Add("pyramid", 0.1 + i / 1000, "MyPyramid" + i);
    // eval( "App.scene.MyPyramid"+i+".position.x = 5.5-i/100");
    console.log("App.scene", App.scene)
    
  }

  for (var i = 1; i < 1024; i = i + 70) {
    // world.Add("pyramid", 0.1 + i / 1000, "MyPyramid" + i);
    // eval( "App.scene.MyPyramid"+i+".position.x = 5.5-i/100");
    console.log("App.scene", App.scene)
    App.scene["MyPyramid" + i ].position.y = 0;
    App.scene["MyPyramid" + i ].rotation.rotationSpeed.y = 5;
    App.scene["MyPyramid" + i ].glBlend.blendEnabled = true;
    App.scene["MyPyramid" + i ].glBlend.blendParamSrc=ENUMERATORS.glBlend.param[7];
    App.scene["MyPyramid" + i ].glBlend.blendParamDest=ENUMERATORS.glBlend.param[2];
  }

  App.onload = function (e) {
    console.log(e)
    var test = App.audioSystem.createVideoAsset("Galactic", "Epiclogue.mp3");
    test.then(()=> {
      console.log(test + "<<<<GOOD<<<")
    }).catch(()=> {
      console.log(test + "BAD")
    })

    window.Galactic = App.audioSystem.Assets.Galactic;

    var source = Galactic.context.createMediaElementSource(Galactic.video);
    source.connect(Galactic.gainNode);
    Galactic.gainNode.connect(Galactic.filter);
    Galactic.filter.connect(Galactic.context.destination);

    Galactic.analyser = Galactic.context.createAnalyser();
    source.connect(Galactic.analyser);
    Galactic.frequencyData = new Uint8Array(
      Galactic.analyser.frequencyBinCount
    );

    Galactic.UPDATE = function () {
      Galactic.analyser.getByteFrequencyData(Galactic.frequencyData);
      var PARAMETER1 = 0.1;
      for (var i = 1, j = 1; i < 1024; i = i + 70, j = j + 35) {
        App.scene["MyPyramid" + i ].rotation.rotationSpeed.z = Galactic.frequencyData[i] / PARAMETER1;
      }
      // console.log(frequencyData)
    };

    App.updateBeforeDraw.push(Galactic);

  };

  App.onload();

};
