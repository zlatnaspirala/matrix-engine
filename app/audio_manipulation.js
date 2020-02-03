/* eslint-disable no-unused-vars */

/*
  Nikola Lukic
  webGl2GLmatrix2 api example
*/

/* globals world App ENUMERATORS SWITCHER OSCILLATOR OBJ ACCESS_CAMERA Galactic*/

for (var i=1;i<1024;i=i+70) {

  world.Add("pyramid", 0.1 + i/1000 , "MyPyramid" + i );
  // eval( "App.scene.MyPyramid"+i+".position.x = 5.5-i/100");
  eval( "App.scene.MyPyramid"+i+".position.y = 0");
  eval( "App.scene.MyPyramid"+i+".rotation.rotationSpeed.y = 5");
  eval( "App.scene.MyPyramid"+i+".glBlend.blendEnabled = true");
  eval( "App.scene.MyPyramid"+i+".glBlend.blendParamSrc=ENUMERATORS.glBlend.param[7]");
  eval( "App.scene.MyPyramid"+i+".glBlend.blendParamDest=ENUMERATORS.glBlend.param[2]");   /// 5 4 ///
  // App.scene.MyPyramid1.glBlend.blendEnabled = true

}

var textuteImageSamplers = {
  source: ["res/images/complex_texture_1/diffuse.png"],
  mix_operation: "multiply"
};

App.audioSystem.createVideoAsset ("Galactic" , "Epiclogue.mp3");

App.onload = function(e){

  window.Galactic = App.audioSystem.Assets.Galactic;

  var source =  Galactic.context.createMediaElementSource(Galactic.video);
  source.connect(Galactic.gainNode);
  Galactic.gainNode.connect(Galactic.filter);
  Galactic.filter.connect(Galactic.context.destination);

  Galactic.analyser = Galactic.context.createAnalyser();
  source.connect(Galactic.analyser);
  Galactic.frequencyData = new Uint8Array(Galactic.analyser.frequencyBinCount);

  Galactic.UPDATE = function () {

    Galactic.analyser.getByteFrequencyData(Galactic.frequencyData);

    var PARAMETER1 = 0.1;

    for (var i=1,j=1;i<1024;i=i+70,j=j+35) {

      eval( "App.scene.MyPyramid"+i+".rotation.rotationSpeed.z =Galactic.frequencyData["+i+"]/PARAMETER1; ");
      /*
        eval ( " world.bufferPyramid( App.scene.MyPyramid"+i+" )");
        eval( "App.scene.MyPyramid"+i+".geometry.colorData.Front.pointA.set(Galactic.frequencyData["+i+"]/PARAMETER1,Galactic.frequencyData["+j+"]/PARAMETER1,Galactic.frequencyData["+i+"]/PARAMETER1, 0.7)");
        eval( "App.scene.MyPyramid"+i+".geometry.colorData.Back.pointA.set(Galactic.frequencyData["+i+"]/PARAMETER1,Galactic.frequencyData["+j+"]/PARAMETER1,Galactic.frequencyData["+i+"]/PARAMETER1, 1)");
        eval( "App.scene.MyPyramid"+i+".geometry.colorData.Left.pointA.set(Galactic.frequencyData["+i+"]/PARAMETER1,Galactic.frequencyData["+j+"]/PARAMETER1,Galactic.frequencyData["+i+"]/PARAMETER1, 1)");
        eval( "App.scene.MyPyramid"+i+".geometry.colorData.Right.pointA.set(Galactic.frequencyData["+i+"]/PARAMETER1,Galactic.frequencyData["+j+"]/PARAMETER1,Galactic.frequencyData["+i+"]/PARAMETER1, 1)");
      */

    }

    // console.log(frequencyData)

  };

  Galactic.video.play();
  App.updateBeforeDraw.push(Galactic);

};
