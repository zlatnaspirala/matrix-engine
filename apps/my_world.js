/* eslint-disable no-unused-vars */

/**
 * @Author Nikola Lukic
 * @Description Matrix Engine Api Example.
 */

/* globals world App world */
import App from '../program/manifest';
import * as matrixEngine from '../index.js';
//let ENUMERATORS = matrixEngine.utility.ENUMERATORS;
//let OSCILLATOR = matrixEngine.utility.OSCILLATOR;
let SWITCHER = matrixEngine.utility.SWITCHER;

export var runThis = (world) => {
  var S1 = new SWITCHER();
  App.camera.FirstPersonController = true;

  var textuteImageSamplers1 = {
    source: ['res/images/bark.webp'],
    mix_operation: 'multiply',
  };

  // Floor
  var textuteImageSamplers2 = {
    source: ['res/images/grass1.webp'],
    mix_operation: 'multiply',
  };

  world.Add('squareTex', 1, 'floor', textuteImageSamplers2);
  App.scene.floor.rotation.rotationSpeed.z = 0;
  App.scene.floor.position.y = -12;
  App.scene.floor.rotation.rotx = 90;
  App.scene.floor.geometry.setScale(213);

  App.scene.floor.custom.gl_texture = function (object, t) {
    var world = matrixEngine.matrixWorld.world;
    world.GL.gl.bindTexture(world.GL.gl.TEXTURE_2D, object.textures[t]);
    world.GL.gl.texParameteri(world.GL.gl.TEXTURE_2D, world.GL.gl.TEXTURE_MAG_FILTER, world.GL.gl.LINEAR);
    world.GL.gl.texParameteri(world.GL.gl.TEXTURE_2D, world.GL.gl.TEXTURE_MIN_FILTER, world.GL.gl.LINEAR);
    world.GL.gl.texParameteri(world.GL.gl.TEXTURE_2D, world.GL.gl.TEXTURE_WRAP_S, world.GL.gl.REPEAT);
    world.GL.gl.texParameteri(world.GL.gl.TEXTURE_2D, world.GL.gl.TEXTURE_WRAP_T, world.GL.gl.REPEAT);
    if (!object.textures[t].image.complete) return;
    world.GL.gl.texImage2D(world.GL.gl.TEXTURE_2D, 0, world.GL.gl.RGBA, world.GL.gl.RGBA, world.GL.gl.UNSIGNED_BYTE, object.textures[t].image);
    world.GL.gl.generateMipmap(world.GL.gl.TEXTURE_2D);
  };

  world.Add('cubeLightTex', 3, 'tree2_', textuteImageSamplers1);

  App.scene.tree2_.geometry.setScale(0.5);
  App.scene.tree2_.geometry.setScaleByZ(0.5);
  App.scene.tree2_.geometry.setScaleByX(0.5);
  App.scene.tree2_.geometry.setScaleByY(5);
  App.scene.tree2_.geometry.texCoordsPoints.front = App.scene.tree2_.geometry.texCoordsPoints.top;
  App.scene.tree2_.geometry.texCoordsPoints.left = App.scene.tree2_.geometry.texCoordsPoints.top;
  App.scene.tree2_.position.y = -4;

  App.scene.tree2_.instancedDraws.overrideDrawArraysInstance = function (object) {
    for (var i = 0; i < object.instancedDraws.numberOfInstance; i++) {
      object.instancedDraws.array_of_local_offset = [0, 0, 18];
      mat4.translate(object.mvMatrix, object.mvMatrix, object.instancedDraws.array_of_local_offset);
      world.setMatrixUniforms(object, world.pMatrix, object.mvMatrix);
      object.instancedDraws.array_of_local_offset = [18 * S1.GET(), 0, 0];
      for (var j = 0; j < object.instancedDraws.numberOfInstance; j++) {
        mat4.translate(object.mvMatrix, object.mvMatrix, object.instancedDraws.array_of_local_offset);
        world.setMatrixUniforms(object, world.pMatrix, object.mvMatrix);
        world.GL.gl.drawElements(world.GL.gl[object.glDrawElements.mode], object.glDrawElements.numberOfIndicesRender, world.GL.gl.UNSIGNED_SHORT, 0);
      }
    }
  };

  world.Add('pyramid', 3, 'tree1_', textuteImageSamplers2);

  App.scene.tree1_.geometry.colorData.SetRedForAll(0.2);
  App.scene.tree1_.geometry.colorData.SetGreenForAll(0.5);
  App.scene.tree1_.geometry.setSpitz(5);
  App.scene.tree1_.position.y = 3.5;
  App.scene.tree1_.instancedDraws.array_of_local_offset = [0, 0, 0];
  App.scene.tree1_.instancedDraws.overrideDrawArraysInstance = function (object) {
    for (var i = 0; i < object.instancedDraws.numberOfInstance; i++) {
      object.instancedDraws.array_of_local_offset = [0, 0, 18];
      mat4.translate(object.mvMatrix, object.mvMatrix, object.instancedDraws.array_of_local_offset);
      world.setMatrixUniforms(object, world.pMatrix, object.mvMatrix);
      object.instancedDraws.array_of_local_offset = [18 * S1.GET(), 0, 0];
      for (var j = 0; j < object.instancedDraws.numberOfInstance; j++) {
        mat4.translate(object.mvMatrix, object.mvMatrix, object.instancedDraws.array_of_local_offset);
        world.setMatrixUniforms(object, world.pMatrix, object.mvMatrix);
        world.GL.gl.drawArrays(world.GL.gl.TRIANGLE_STRIP, 0, object.glDrawElements.numberOfIndicesRender);
      }
    }
  };

  world.Add('pyramid', 3, 'tree1');
  App.scene.tree1.instancedDraws.array_of_local_offset = [0, 0, 0];
  App.scene.tree1.instancedDraws.overrideDrawArraysInstance = function (object) {
    for (var i = 0; i < object.instancedDraws.numberOfInstance; i++) {
      object.instancedDraws.array_of_local_offset = [0, 0, 18];
      mat4.translate(object.mvMatrix, object.mvMatrix, object.instancedDraws.array_of_local_offset);
      world.setMatrixUniforms(object, world.pMatrix, object.mvMatrix);
      object.instancedDraws.array_of_local_offset = [18 * S1.GET(), 0, 0];
      for (var j = 0; j < object.instancedDraws.numberOfInstance; j++) {
        mat4.translate(object.mvMatrix, object.mvMatrix, object.instancedDraws.array_of_local_offset);
        world.setMatrixUniforms(object, world.pMatrix, object.mvMatrix);
        world.GL.gl.drawArrays(world.GL.gl.TRIANGLE_STRIP, 0, object.glDrawElements.numberOfIndicesRender);
      }
    }
  };

  App.scene.tree1.geometry.colorData.SetRedForAll(0.1);
  App.scene.tree1.geometry.colorData.SetGreenForAll(0.6);
  App.scene.tree1.geometry.setSpitz(5);
  App.scene.tree1.position.y = 8.5;

  App.scene.tree1.instancedDraws.numberOfInstance = 20;
  App.scene.tree1_.instancedDraws.numberOfInstance = 20;
  App.scene.tree2_.instancedDraws.numberOfInstance = 20;

  App.scene.tree2_.position.x = 200;
  App.scene.tree2_.position.z = -200;

  App.scene.tree1.position.x = 200;
  App.scene.tree1.position.z = -200;

  App.scene.tree1_.position.x = 200;
  App.scene.tree1_.position.z = -200;
};
