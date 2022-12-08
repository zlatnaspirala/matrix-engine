/* globals App world */
'use strict';

import App from '../program/manifest';
import {world} from './matrix-world';
import {gen2DTextFace} from './utility';

/**
 * @description
 * initTextures Load image file procedure.
 */
App.tools.loadTextureImage = function(gl, src, params) {
  var texture = gl.createTexture();
  texture.image = new Image();
  texture.image.crossOrigin = 'anonymous';
  texture.image.onload = () => {
    console.log("params??? ", params)
    world.handleLoadedTexture(texture, gl, params);
  };
  texture.image.src = src;
  return texture;
};

/**
 * @description
 * Basic image textures
 */
App.tools.BasicTextures = function(texture, gl, params) {
  gl.bindTexture(gl.TEXTURE_2D, texture);
  gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, texture.image);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
  // gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false);
  // gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  // gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT);
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

  if(options?.style?.type == 'chessboard') {
    var I = 0, localCounter = 0;
    for(var funny = 0;funny < options.squareShema[0] * options.squareShema[1] * 4;funny += 4) {
      localCounter++;
      if(I == options?.style.color1) {I = options?.style.color2} else {I = options?.style.color1}
      // if (parseInt(funny) % 32 == 0) { work also
      if(parseInt(localCounter - 1) % options.squareShema[0] == 0) {
        if(I == options?.style.color1) {I = options?.style.color2} else {I = options?.style.color1}
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
export const cubeMapTextures = async function(sources, callback) {
  var cubeMapImgTex = [];
  var promiseMe = [];
  sources.forEach((src) => {
    promiseMe.push(new Promise((resolve) => {
      var image = new Image();
      image.addEventListener("load", () => {
        cubeMapImgTex.push(image);
        resolve(image);
      });
      image.src = src;
    })
    )
  });

  await Promise.all([...promiseMe]).then((values) => {
    // console.log(values + ' promise all !');
    callback(values);
  });

};

/**
 * @description
 * FBO textures
 */
export const makeFBO = (gl, object) => {
  // test
  // gl.activeTexture(gl.TEXTURE0);
  // const checkerboardTexture = gl.createTexture();
  // gl.bindTexture(gl.TEXTURE_2D, checkerboardTexture);
  // gl.texImage2D(
  //   gl.TEXTURE_2D,
  //   0,                // mip level
  //   gl.LUMINANCE,     // internal format
  //   8,                // width
  //   8,                // height
  //   0,                // border
  //   gl.LUMINANCE,     // format
  //   gl.UNSIGNED_BYTE, // type
  //   new Uint8Array([  // data
  //     0xFF, 0xCC, 0xFF, 0xCC, 0xFF, 0xCC, 0xFF, 0xCC,
  //     0xCC, 0xFF, 0xCC, 0xFF, 0xCC, 0xFF, 0xCC, 0xFF,
  //     0xFF, 0xCC, 0xFF, 0xCC, 0xFF, 0xCC, 0xFF, 0xCC,
  //     0xCC, 0xFF, 0xCC, 0xFF, 0xCC, 0xFF, 0xCC, 0xFF,
  //     0xFF, 0xCC, 0xFF, 0xCC, 0xFF, 0xCC, 0xFF, 0xCC,
  //     0xCC, 0xFF, 0xCC, 0xFF, 0xCC, 0xFF, 0xCC, 0xFF,
  //     0xFF, 0xCC, 0xFF, 0xCC, 0xFF, 0xCC, 0xFF, 0xCC,
  //     0xCC, 0xFF, 0xCC, 0xFF, 0xCC, 0xFF, 0xCC, 0xFF,
  //   ]));
  // gl.generateMipmap(gl.TEXTURE_2D);
  // gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);

  // // test depth

  // const depthTexture = gl.createTexture();
  // const depthTextureSize = 512;
  // gl.bindTexture(gl.TEXTURE_2D, depthTexture);

  // {
  //   // define size and format of level 0
  //   const level = 0;
  //   const internalFormat = gl.RGBA;
  //   const border = 0;
  //   const format = gl.RGBA;
  //   const type = gl.UNSIGNED_BYTE;
  //   const data = null;
  //   gl.texImage2D(gl.TEXTURE_2D, level, internalFormat,
  //                 512, 512, border,
  //                 format, type, data);

  //   // set the filtering so we don't need mips
  //   gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  //   gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  //   gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  // }

  // const depthFramebuffer = gl.createFramebuffer();
  // gl.bindFramebuffer(gl.FRAMEBUFFER, depthFramebuffer);
  // gl.framebufferTexture2D(
  //     gl.FRAMEBUFFER,       // target
  //     gl.COLOR_ATTACHMENT0, //  gl.DEPTH_ATTACHMENT,  // attachment point
  //     gl.TEXTURE_2D,        // texture target
  //     depthTexture,         // texture
  //     0);                   // mip level

  //////////////////////////////////////////////////////
  // TEST 2 Success for now just fbo
  //////////////////////////////////////////////////////
  var framebuffer, texture, depthBuffer;

  var error = function() {
    console.log('Error in creating FBO!');
    return null;
  }

  framebuffer = gl.createFramebuffer();
  if(!framebuffer) {
    console.log('Failed to create frame buffer object');
    return error();
  }

  texture = gl.createTexture();
  if(!texture) {
    console.log('Failed to create texture object');
    return error();
  }

  // local
  var OFFSCREEN_WIDTH = 512;
  var OFFSCREEN_HEIGHT = 512;

  gl.bindTexture(gl.TEXTURE_2D, texture);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, OFFSCREEN_WIDTH, OFFSCREEN_HEIGHT, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  framebuffer.texture = texture;

  depthBuffer = gl.createRenderbuffer();
  if(!depthBuffer) {
    console.log('Failed to create renderbuffer object');
    return error();
  }
  gl.bindRenderbuffer(gl.RENDERBUFFER, depthBuffer);
  gl.renderbufferStorage(gl.RENDERBUFFER, gl.DEPTH_COMPONENT16, OFFSCREEN_WIDTH, OFFSCREEN_HEIGHT);

  // Attach the texture and the renderbuffer object to the FBO
  gl.bindFramebuffer(gl.FRAMEBUFFER, framebuffer);
  gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0);
  gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.RENDERBUFFER, depthBuffer);

  // Check if FBO is configured correctly
  var e = gl.checkFramebufferStatus(gl.FRAMEBUFFER);
  if(gl.FRAMEBUFFER_COMPLETE !== e) {
    console.log('Frame buffer object is incomplete: ' + e.toString());
    return error();
  }

  // Unbind the buffer object
  gl.bindFramebuffer(gl.FRAMEBUFFER, null);
  gl.bindTexture(gl.TEXTURE_2D, null);
  gl.bindRenderbuffer(gl.RENDERBUFFER, null);

  return framebuffer;
  //////////////////////////////////////////////////////
}

export default App.tools;
