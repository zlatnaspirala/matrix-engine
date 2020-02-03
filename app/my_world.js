
/* eslint-disable no-unused-vars */

/*
  Nikola Lukic
  webGl2GLmatrix2 api example
  app/canvas2d/build.html is visual-js 2d part program instance
*/

/* globals world App ENUMERATORS SWITCHER OSCILLATOR */

App.camera.FirstPersonController = true;

var textuteImageSamplers = {
  source : [    "res/images/sky/blue.jpg"   ] ,
  mix_operation : "multiply" , // ENUM : multiply , divide ,
};

var textuteImageSamplers1 = {
  source : [    "res/images/RustPaint.jpg"   ] ,
  mix_operation : "multiply" , // ENUM : multiply , divide ,
};

world.Add("sphereLightTex" , 1  , "TEST" , textuteImageSamplers );
App.scene.TEST.position.z = -20;

App.scene.TEST.geometry.setRadius(60);
App.scene.TEST.glBlend.blendParamSrc = ENUMERATORS.glBlend.param[4];

/*
// floor
var textuteImageSamplers2 = {
    source : [    "res/images/grass1.jpg"   ] ,
    mix_operation : "multiply" , // ENUM : multiply , divide ,
};

world.Add("squareTex", 60 , "floor" , textuteImageSamplers2);
App.scene.floor.rotation.rotationSpeed.z = 0;
App.scene.floor.position.y = -2
App.scene.floor.rotValue = 90;

App.scene.floor.glBlend.blendParamDest = ENUMERATORS.glBlend.param[0]

// FROM TEXTURE MANIPULATION EXAMPLE
var coeficientSizeOfTex = 1.9;
App.scene.floor.geometry.texCoordsPoints.right_top.y = 1 + coeficientSizeOfTex;
App.scene.floor.geometry.texCoordsPoints.right_top.x = 1  + coeficientSizeOfTex;
App.scene.floor.geometry.texCoordsPoints.left_bottom.x = 0 - coeficientSizeOfTex;
App.scene.floor.geometry.texCoordsPoints.left_bottom.y = 0 -   coeficientSizeOfTex;
App.scene.floor.geometry.texCoordsPoints.left_top.x = 0 - coeficientSizeOfTex;
App.scene.floor.geometry.texCoordsPoints.left_top.y = 1  + coeficientSizeOfTex;
App.scene.floor.geometry.texCoordsPoints.right_bottom.x =  1 + coeficientSizeOfTex;
App.scene.floor.geometry.texCoordsPoints.right_bottom.y = 0 - coeficientSizeOfTex;

App.scene.floor.custom.gl_texture = function ( object , t ) {

  world.GL.gl.bindTexture(world.GL.gl.TEXTURE_2D, object.textures[t] );
  world.GL.gl.texParameteri(world.GL.gl.TEXTURE_2D, world.GL.gl.TEXTURE_MAG_FILTER, world.GL.gl.LINEAR);
  world.GL.gl.texParameteri(world.GL.gl.TEXTURE_2D, world.GL.gl.TEXTURE_MIN_FILTER, world.GL.gl.LINEAR);

  world.GL.gl.texParameteri(world.GL.gl.TEXTURE_2D, world.GL.gl.TEXTURE_WRAP_S, world.GL.gl.REPEAT);
  world.GL.gl.texParameteri(world.GL.gl.TEXTURE_2D, world.GL.gl.TEXTURE_WRAP_T, world.GL.gl.REPEAT);

  world.GL.gl.texImage2D(
                          world.GL.gl.TEXTURE_2D,
                          0, // Level of details
                          world.GL.gl.RGBA, // Format
                          world.GL.gl.RGBA,
                          world.GL.gl.UNSIGNED_BYTE, // Size of each channel
                          object.textures[t].image
                          );

  world.GL.gl.generateMipmap(world.GL.gl.TEXTURE_2D);
}
*/

/*
/////////////////////////////
world.Add("cube", 1 , "tree1_");
App.scene.tree1_.position.SetX(50);
App.scene.tree1_.position.SetY(0);
App.scene.tree1_.position.SetZ(-50);
App.scene.tree1_.rotation.rotationSpeed.z = 0;
App.scene.tree1_.geometry.setScaleByY(2)
App.scene.tree1_.geometry.setScaleByX(0.1)
App.scene.tree1_.geometry.setScaleByZ(0.1)
App.scene.tree1_.geometry.colorData.SetRedForAll(0.8)
App.scene.tree1_.geometry.colorData.SetGreenForAll(0.4)
App.scene.tree1_.geometry.colorData.SetBlueForAll(0.1)
App.scene.tree1_.instancedDraws.array_of_local_offset = [0,0,10];
App.scene.tree1_.instancedDraws.overrideDrawArraysInstance = function( object ){

    for (var i=0;i<object.instancedDraws.numberOfInstance;i++) {

        mat4.translate(object.mvMatrix, object.mvMatrix, object.instancedDraws.array_of_local_offset );
        world.setMatrixUniforms(object,world.pMatrix,object.mvMatrix)
        world.GL.gl.drawElements(world.GL.gl.TRIANGLE_STRIP, object.glDrawElements.numberOfIndicesRender , world.GL.gl.UNSIGNED_SHORT, 0);

    }

    for (var i=0;i<object.instancedDraws.numberOfInstance;i++) {

        mat4.translate(object.mvMatrix, object.mvMatrix, [ -10,0,0 ] );
        world.setMatrixUniforms(object,world.pMatrix,object.mvMatrix)
        world.GL.gl.drawElements(world.GL.gl.TRIANGLE_STRIP, object.glDrawElements.numberOfIndicesRender , world.GL.gl.UNSIGNED_SHORT, 0);

    }

    for (var i=0;i<object.instancedDraws.numberOfInstance;i++) {

        mat4.translate(object.mvMatrix, object.mvMatrix, [ 0, 0 , -10 ] );
        world.setMatrixUniforms(object,world.pMatrix,object.mvMatrix)
        world.GL.gl.drawElements(world.GL.gl.TRIANGLE_STRIP, object.glDrawElements.numberOfIndicesRender , world.GL.gl.UNSIGNED_SHORT, 0);

    }

    for (var i=0;i<object.instancedDraws.numberOfInstance;i++) {

        mat4.translate(object.mvMatrix, object.mvMatrix, [ 0, 0 , 10 ] );
        world.setMatrixUniforms(object,world.pMatrix,object.mvMatrix)
        world.GL.gl.drawElements(world.GL.gl.TRIANGLE_STRIP, object.glDrawElements.numberOfIndicesRender , world.GL.gl.UNSIGNED_SHORT, 0);

    }
};

////////////////////////////////
world.Add("pyramid", 3 , "tree1");

App.scene.tree1.instancedDraws.array_of_local_offset = [0,0,10];

App.scene.tree1.instancedDraws.overrideDrawArraysInstance = function( object ){

    for (var i=0;i<object.instancedDraws.numberOfInstance;i++) {

        mat4.translate(object.mvMatrix, object.mvMatrix, object.instancedDraws.array_of_local_offset );
        world.setMatrixUniforms(object,world.pMatrix,object.mvMatrix)
        //world.GL.gl.drawElements(world.GL.gl.TRIANGLE_STRIP, object.glDrawElements.numberOfIndicesRender , world.GL.gl.UNSIGNED_SHORT, 0);
        world.GL.gl.drawArrays(world.GL.gl.TRIANGLE_STRIP, 0, object.glDrawElements.numberOfIndicesRender );

    }

    for (var i=0;i<object.instancedDraws.numberOfInstance;i++) {

        mat4.translate(object.mvMatrix, object.mvMatrix, [-10,0,0] );
        world.setMatrixUniforms(object,world.pMatrix,object.mvMatrix)
        //world.GL.gl.drawElements(world.GL.gl.TRIANGLE_STRIP, object.glDrawElements.numberOfIndicesRender , world.GL.gl.UNSIGNED_SHORT, 0);
        world.GL.gl.drawArrays(world.GL.gl.TRIANGLE_STRIP, 0, object.glDrawElements.numberOfIndicesRender );

    }

    for (var i=0;i<object.instancedDraws.numberOfInstance;i++) {

        mat4.translate(object.mvMatrix, object.mvMatrix, [0,0,-10] );
        world.setMatrixUniforms(object,world.pMatrix,object.mvMatrix)
        //world.GL.gl.drawElements(world.GL.gl.TRIANGLE_STRIP, object.glDrawElements.numberOfIndicesRender , world.GL.gl.UNSIGNED_SHORT, 0);
        world.GL.gl.drawArrays(world.GL.gl.TRIANGLE_STRIP, 0, object.glDrawElements.numberOfIndicesRender );

    }

    for (var i=0;i<object.instancedDraws.numberOfInstance;i++) {

        mat4.translate(object.mvMatrix, object.mvMatrix, [0,0,10] );
        world.setMatrixUniforms(object,world.pMatrix,object.mvMatrix)
        //world.GL.gl.drawElements(world.GL.gl.TRIANGLE_STRIP, object.glDrawElements.numberOfIndicesRender , world.GL.gl.UNSIGNED_SHORT, 0);
        world.GL.gl.drawArrays(world.GL.gl.TRIANGLE_STRIP, 0, object.glDrawElements.numberOfIndicesRender );

    }

};

App.scene.tree1.geometry.colorData.SetRedForAll(0.1)
App.scene.tree1.geometry.colorData.SetGreenForAll(0.6)

App.scene.tree1.geometry.setSpitz(3)

App.scene.tree1.position.y = 4.5;
App.scene.tree1.position.x = App.scene.tree1_.position.x
App.scene.tree1.position.z = App.scene.tree1_.position.z

*/

var data_for_custom = {

  latitudeBands : 1,
  longitudeBands : 1,
  radius : 1 ,
  custom_type : "spiral",
};
////////////////////////////////////////////////////////////////////

var S1 = new SWITCHER();
var O2 = new OSCILLATOR(2 , 6 , 0.000001);
var LONG = new OSCILLATOR(1 , 20 , 1);
var LANG = new OSCILLATOR(1 , 25 , 1);
world.Add("generatorLightTex" , 1  , "generator1" , textuteImageSamplers1 , data_for_custom);
App.scene.generator1.rotation.z = 1;
App.scene.generator1.position.y = 7 ;
App.scene.generator1.position.z = -10;
//App.scene.generator1.geometry.setRadius(2)
App.scene.generator1.glDrawElements.mode = ENUMERATORS.glDrawElements.mode[5];
App.scene.generator1.rotation.rotationSpeed.z = 0;
App.scene.TEST.glBlend.blendParamSrc = ENUMERATORS.glBlend.param[4];
App.scene.generator1.glBlend.blendParamSrc = ENUMERATORS.glBlend.param[3];
App.scene.TEST.glBlend.blendEnabled = true;
App.scene.generator1.glBlend.blendEnabled = true;

App.scene.generator1.rotValue = - 90;

world.Add("generatorLightTex" , 1  , "generator2" , textuteImageSamplers1 , data_for_custom);

App.scene.generator2.rotation.x = 0;

App.scene.generator2.rotation.y = 1;
App.scene.generator2.rotValue =- 90;
App.scene.generator2.position.y = 7 ;
App.scene.generator2.position.z = -10;
App.scene.generator2.glDrawElements.mode = ENUMERATORS.glDrawElements.mode[5];
App.scene.generator2.rotation.rotationSpeed.z = 0;
App.scene.generator2.glBlend.blendParamSrc = ENUMERATORS.glBlend.param[3];
App.scene.generator2.glBlend.blendEnabled = true;

App.scene.generator1.glBlend.blendParamDest = ENUMERATORS.glBlend.param[8];

App.audioSystem.createVideoAsset ("Galactic" , "Epiclogue.mp3");

var Galactic;

App.onload = function(e){

  Galactic = App.audioSystem.Assets.Galactic;

  var source =  Galactic.context.createMediaElementSource(Galactic.video);
  source.connect(Galactic.gainNode);
  Galactic.gainNode.connect(Galactic.filter);
  Galactic.filter.connect(Galactic.context.destination);

  Galactic.analyser = Galactic.context.createAnalyser();
  source.connect(Galactic.analyser);
  Galactic.frequencyData = new Uint8Array(Galactic.analyser.frequencyBinCount);

  Galactic.UPDATE = function () {

    Galactic.analyser.getByteFrequencyData(Galactic.frequencyData);
    var PARAMETER1 = 2;

    // for (var i=1,j=1;i<1024;i=i+70,j=j+35) {
    App.scene.generator1.longitudeBands = parseInt( Galactic.frequencyData[5]/PARAMETER1 );
    App.scene.generator2.longitudeBands = parseInt( Galactic.frequencyData[25]/PARAMETER1 );
    App.scene.generator1.geometry.setRadius(1);
    App.scene.generator2.geometry.setRadius(1);
    //console.log(frequencyData)

  };

  Galactic.video.play();
  App.updateBeforeDraw.push(Galactic);

};
