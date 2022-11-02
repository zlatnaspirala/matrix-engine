/* globals App world */
'use strict';

import App from '../program/manifest';
import {world} from './matrix-world';
import {gen2DTextFace} from './utility';

/**
 * @description
 * initTextures Load image file procedure.
 */
App.tools.loadTextureImage = function(gl, src) {
  var texture = gl.createTexture();
  texture.image = new Image();
  texture.image.crossOrigin = 'anonymous';
  texture.image.onload = function() {
    world.handleLoadedTexture(texture, gl);
  };
  texture.image.src = src;
  return texture;
};

/**
 * @description
 * Basic image textures
 */
App.tools.BasicTextures = function(texture, gl) {
  gl.bindTexture(gl.TEXTURE_2D, texture);
  gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, texture.image);
  gl.bindTexture(gl.TEXTURE_2D, null);
};

/**
 * @description
 * Video/Webcam textures
 */
App.tools.loadVideoTexture = function(name, image) {
  if(!image) return;
  if(image.width == 1) return;

  var name_ = name;
  var gl = world.GL.gl;

  if(typeof App.textures[name_] === 'undefined') {
    App.textures[name_] = gl.createTexture();
  }

  gl.activeTexture(gl.TEXTURE0);
  gl.bindTexture(gl.TEXTURE_2D, App.textures[name_]);
  gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);

  //gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  //gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

  // world.GL.gl.texParameteri(eval("world.GL.gl." + object.glBlend.blendParamSrc ), eval("world.GL.gl." + object.glBlend.blendParamDest ) );
  // gl.texParameteri( gl.TEXTURE_2D , gl.TEXTURE_WRAP_T  , gl.CLAMP_TO_EDGE);

  // -- Allocate storage for the texture
  // gl.texStorage2D(gl.TEXTURE_2D, 1, gl.RGB8, 512, 512);
  // gl.texStorage2D(gl.TEXTURE_2D, 1, gl.RGB8, 512, 512);
  // gl.texSubImage2D(gl.TEXTURE_2D, 0, 0, 0, gl.RGB, gl.UNSIGNED_BYTE, image);

  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
  gl.generateMipmap(gl.TEXTURE_2D);
};

/**
 * @description
 * Pixel textures
 */
App.tools.createPixelsTex = function(options) {

  if(typeof options === 'undefined') {
    var options = {
      squareShema: [2, 2],
      pixels: {}
    };
    const pixels = new Uint8Array(options.squareShema[0] * options.squareShema[1] * 4);
    options.pixels = pixels;
    options.pixels.fill(100);
    var i = 0;
    options.pixels[0 + i] = 0;
    options.pixels[1 + i] = 64;
    options.pixels[2 + i] = 255;
    options.pixels[3 + i] = 0.2;

    options.pixels[4 + i] = 128;
    options.pixels[5 + i] = 255;
    options.pixels[6 + i] = 0;
    options.pixels[7 + i] = 0.2;

    options.pixels[8 + i] = 0;
    options.pixels[9 + i] = 255;
    options.pixels[10 + i] = 64;
    options.pixels[11 + i] = 1;

    options.pixels[12 + i] = 64;
    options.pixels[13 + i] = 64;
    options.pixels[14 + i] = 128;
    options.pixels[15 + i] = 1;

  }

  if (options?.style?.type == 'chessboard') {
    var I = 0, localCounter = 0;
    for (var funny = 0; funny < options.squareShema[0]*options.squareShema[1]*4; funny+=4) {
      localCounter++;
      if (I ==options?.style.color1) {I=options?.style.color2} else {I=options?.style.color1}
      // if (parseInt(funny) % 32 == 0) { work also
      if (parseInt(localCounter - 1) % options.squareShema[0] == 0) {
         if (I == options?.style.color1) {I=options?.style.color2} else {I=options?.style.color1}
      }
      options.pixels[funny] = I;
      options.pixels[funny + 1] = I;
      options.pixels[funny + 2] = I;
      options.pixels[funny + 3] = 1;
    }
  }

  const texture = world.GL.gl.createTexture()
  world.GL.gl.bindTexture(world.GL.gl.TEXTURE_2D, texture);
  world.GL.gl.texParameteri(world.GL.gl.TEXTURE_2D, world.GL.gl.TEXTURE_MIN_FILTER, world.GL.gl.NEAREST);
  world.GL.gl.texParameteri(world.GL.gl.TEXTURE_2D, world.GL.gl.TEXTURE_MAG_FILTER, world.GL.gl.NEAREST);
  world.GL.gl.texImage2D(
    world.GL.gl.TEXTURE_2D,
    0,
    world.GL.gl.RGBA,
    options.squareShema[0],
    options.squareShema[1],
    0,
    world.GL.gl.RGBA,
    world.GL.gl.UNSIGNED_BYTE,
    options.pixels);
  return texture;

};

/**
 * @description
 * CubeMap textures
 */
App.tools.cubeMapTextures = function(gl) {

  var tex = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_CUBE_MAP, tex);

  // gl.bindTexture(gl.TEXTURE_2D, texture);
  // gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
  // gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
  // gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
  // gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  // gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  // gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, texture.image);
  // gl.bindTexture(gl.TEXTURE_2D, null);

   // Get A 2D context
  /** @type {Canvas2DRenderingContext} */
  var T = document.createElement("canvas");
  document.body.append(T)
  const ctx = T.getContext("2d");

  ctx.canvas.width = 128;
  ctx.canvas.height = 128;

  const faceInfos = [
    { target: gl.TEXTURE_CUBE_MAP_POSITIVE_X, faceColor: '#F00', textColor: '#0FF', text: '+X' },
    { target: gl.TEXTURE_CUBE_MAP_NEGATIVE_X, faceColor: '#FF0', textColor: '#00F', text: '-X' },
    { target: gl.TEXTURE_CUBE_MAP_POSITIVE_Y, faceColor: '#0F0', textColor: '#F0F', text: '+Y' },
    { target: gl.TEXTURE_CUBE_MAP_NEGATIVE_Y, faceColor: '#0FF', textColor: '#F00', text: '-Y' },
    { target: gl.TEXTURE_CUBE_MAP_POSITIVE_Z, faceColor: '#00F', textColor: '#FF0', text: '+Z' },
    { target: gl.TEXTURE_CUBE_MAP_NEGATIVE_Z, faceColor: '#F0F', textColor: '#0F0', text: 'CUBEMAP' },
  ];
  faceInfos.forEach((faceInfo) => {
    const {target, faceColor, textColor, text} = faceInfo;
    gen2DTextFace(ctx, faceColor, textColor, text);

    // Upload the canvas to the cubemap face.
    const level = 0;
    const internalFormat = gl.RGBA;
    const format = gl.RGBA;
    const type = gl.UNSIGNED_BYTE;
    gl.texImage2D(target, level, internalFormat, format, type, ctx.canvas);
  });
  gl.generateMipmap(gl.TEXTURE_CUBE_MAP);
  gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);

  return tex;


};

export default App.textools;
