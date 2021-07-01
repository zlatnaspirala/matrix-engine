/* eslint-disable no-unused-vars */

/**
 * @Author Nikola Lukic
 * @Description Matrix Engine Api Example.
 */

/* globals world App world */
import App from "../program/manifest";
import * as matrixEngine from "../index.js";
let ENUMERATORS = matrixEngine.utility.ENUMERATORS;
let OSCILLATOR = matrixEngine.utility.OSCILLATOR;
let SWITCHER = matrixEngine.utility.SWITCHER;

export var runThis = world => {

  var S1 = new SWITCHER();
  var S2 = new SWITCHER();
  /*
    var S1 = new SWITCHER();
    var O2 = new OSCILLATOR(2, 6, 0.000001);
    var LONG = new OSCILLATOR(1, 20, 1);
    var LANG = new OSCILLATOR(1, 25, 1);
  */

  App.camera.FirstPersonController = true;
 

  var textuteImageSamplers1 = {
    source: ["res/images/bark.jpg"],
    mix_operation: "multiply", // ENUM : multiply , divide ,
  };

  // floor
  var textuteImageSamplers2 = {
    source: ["res/images/grass1.jpg"],
    mix_operation: "multiply", // ENUM : multiply , divide ,
  };

  world.Add("squareTex", 600, "floor", textuteImageSamplers2);
  App.scene.floor.rotation.rotationSpeed.z = 0;
  App.scene.floor.position.y = -12;
  App.scene.floor.rotation.rotx = 90;

  /*
  App.scene.floor.custom.gl_texture = function (object, t) {
    world.GL.gl.bindTexture(world.GL.gl.TEXTURE_2D, object.textures[t]);
    world.GL.gl.texParameteri(
      world.GL.gl.TEXTURE_2D,
      world.GL.gl.TEXTURE_MAG_FILTER,
      world.GL.gl.LINEAR
    );
    world.GL.gl.texParameteri(
      world.GL.gl.TEXTURE_2D,
      world.GL.gl.TEXTURE_MIN_FILTER,
      world.GL.gl.LINEAR
    );

    world.GL.gl.texParameteri(
      world.GL.gl.TEXTURE_2D,
      world.GL.gl.TEXTURE_WRAP_S,
      world.GL.gl.REPEAT
    );
    world.GL.gl.texParameteri(
      world.GL.gl.TEXTURE_2D,
      world.GL.gl.TEXTURE_WRAP_T,
      world.GL.gl.REPEAT
    );

    world.GL.gl.texImage2D(
      world.GL.gl.TEXTURE_2D,
      0, // Level of details
      world.GL.gl.RGBA, // Format
      world.GL.gl.RGBA,
      world.GL.gl.UNSIGNED_BYTE, // Size of each channel
      object.textures[t].image
    );

    world.GL.gl.generateMipmap(world.GL.gl.TEXTURE_2D);
  };
  */

  /////////////////////////////
  world.Add("cubeLightTex", 1, "tree1_", textuteImageSamplers2);
  // App.scene.tree1_.position.SetX(50);
  // App.scene.tree1_.position.SetY(-3);
  // App.scene.tree1_.position.SetZ(-50);

  // App.scene.tree1_.rotation.rotationSpeed.z = 0;
  //App.scene.tree1_.geometry.setScaleByY(4);
  //App.scene.tree1_.geometry.setScaleByX(0.5);
  //App.scene.tree1_.geometry.setScaleByZ(0.5);

  App.scene.tree1_.glDrawElements.mode = App.scene.tree1_.glDrawElements.modes[6]

  App.scene.tree1_.instancedDraws.array_of_local_offset = [0, 0, 0];
  App.scene.tree1_.instancedDraws.overrideDrawArraysInstance =  function(object) {

    for (var i = 0; i < object.instancedDraws.numberOfInstance; i++) {


      object.instancedDraws.array_of_local_offset = [0 , 0, 18];
      mat4.translate(
        object.mvMatrix,
        object.mvMatrix,
        object.instancedDraws.array_of_local_offset
      );
      world.setMatrixUniforms(object, world.pMatrix, object.mvMatrix);

      world.GL.gl.drawArrays(
        world.GL.gl.TRIANGLE, 0,
        object.glDrawElements.numberOfIndicesRender,
        // world.GL.gl.UNSIGNED_SHORT,
      );


     //  object.instancedDraws.array_of_local_offset = [18 * S2.GET() , 0, 0];

      for (var j = 0; j < object.instancedDraws.numberOfInstance; j++) {
/*
        mat4.translate(
          object.mvMatrix,
          object.mvMatrix,
          object.instancedDraws.array_of_local_offset
        );
        world.setMatrixUniforms(object, world.pMatrix, object.mvMatrix); */



      }
    }

  };




  world.Add("pyramid", 3, "tree1");
  App.scene.tree1.instancedDraws.array_of_local_offset = [0, 0, 0];
  App.scene.tree1.instancedDraws.overrideDrawArraysInstance = function(object) {

    for (var i = 0; i < object.instancedDraws.numberOfInstance; i++) {


      object.instancedDraws.array_of_local_offset = [0 , 0, 18];
      mat4.translate(
        object.mvMatrix,
        object.mvMatrix,
        object.instancedDraws.array_of_local_offset
      );
      world.setMatrixUniforms(object, world.pMatrix, object.mvMatrix);

      object.instancedDraws.array_of_local_offset = [18 * S1.GET() , 0, 0];
      
      for (var j = 0; j < object.instancedDraws.numberOfInstance; j++) {

        mat4.translate(
          object.mvMatrix,
          object.mvMatrix,
          object.instancedDraws.array_of_local_offset
        );
        world.setMatrixUniforms(object, world.pMatrix, object.mvMatrix);

        world.GL.gl.drawArrays(
          world.GL.gl.TRIANGLE_STRIP,
          0,
          object.glDrawElements.numberOfIndicesRender
        );
 

      }
    }

  };

  App.scene.tree1.geometry.colorData.SetRedForAll(0.1);
  App.scene.tree1.geometry.colorData.SetGreenForAll(0.6);

  App.scene.tree1.geometry.setSpitz(3);

  App.scene.tree1.position.y = 4.5;
 

 

};
