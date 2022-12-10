/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

import {Broadcaster} from './net';
import {EVENTS, SYS} from './events';
import App from '../program/manifest';
import {E, randomIntFromTo} from './utility';
import {WebGLUtils} from './webgl-utils';
import {reDrawID} from './matrix-render';
import {frames, modifyFrames, objListToDispose} from './matrix-world';
import {generateCubeMapShaderSrc, generateCustomShaderSrc, generateShaderSimpleDirection, generateShaderSrc, generateShaderSrc3, generateVShaderSimpleDirectionLight} from './matrix-shaders';
import ClientConfig from '../client-config';
import {MatrixSounds} from './sounds';

export var wd = 0,
  ht = 0,
  lastTime = 0,
  totalTime = 0,
  updateTime = 0,
  updateFrames = 0;

// export let EVENTS_INSTANCE = null;
export let looper = 0;

export function modifyLooper(value) {
  looper = value;
}

export function resizeView() {
  wd = document.body.clientWidth - 4;
  if (document.body.clientHeight > document.documentElement.clientHeight) {
    ht = document.body.clientHeight - 10;
  } else {
    ht = document.documentElement.clientHeight - 4;
  }
}

export let net = null;

export let activateNet = () => {
  if (typeof App.net !== 'undefinde' && App.net === true) {
    var t = new ClientConfig();
    net = new Broadcaster(t);
    console.info('Networking is active.', net);
  }
};

export function initApp(callback) {
  /* Calculate Width and Height before rendering */
  resizeView();
  drawCanvas();
  window.canvas = document.getElementById('canvas');

  if (App.events == true) {
    App.events = new EVENTS(E('canvas'));
  }

  if (App.sounds == true) {
    App.sounds = new MatrixSounds();
  }

  if (typeof callback !== 'undefined') {
    // E('canvas').webGLStartCallBack = callback;
    window.webGLStartCallBack = callback;
    callback();
  }
}

export function isReady() {
  if (0 == world) {
    return false;
  } else {
    return true;
  }
}

export async function load_shaders(href) {
  new Promise((resolve, reject) => {
    function handler() {
      if (this.status == 200 && this.responseText != null) {
        document.getElementById('shaders').innerHTML = this.responseText;
        resolve();
      } else {
        reject();
        console.warn('Something went wrong on shaders load procces!');
      }
    }
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onload = handler;
    xmlhttp.open('GET', href, true);
    xmlhttp.send();
  });
}

export function loadHtmlPowerAsset(href, callback) {
  function handler() {
    if (this.status == 200 && this.responseText != null) {
      // Success
      document.getElementById('media-holder').innerHTML = this.responseText;
      if (typeof callback !== 'undefined') {
        callback();
      }
    } else {
      // something went wrong
      // console.log("something went wrong on shaders load procces!");
    }
  }

  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onload = handler;
  xmlhttp.open('GET', href, true);
  xmlhttp.send();
}

/**
 * @description
 * WebGL start
 * Base environment property for totality of WEBGL 
 */
export function defineWebGLWorld(cavnas) {
  // console.log("Define the WEBGL base pocket");
  var world = new Object();
  /* Constructor for a particular GL environment */
  try {
    var gl = WebGLUtils.setupWebGL(canvas);
    gl.viewportWidth = canvas.width;
    gl.viewportHeight = canvas.height;
    world.gl = gl;

    const available_extensions = gl.getSupportedExtensions();

    const ext = gl.getExtension('WEBGL_depth_texture');
    if (!ext) {
      // console.warn('No support for WEBGL_depth_texture [opengles1.1] !', ext);
    }
    // console.info("WEBGL base pocket: SUCCESS", available_extensions);

  } catch (e) {
    /* Exception: Could not initialise WebGL     */
    console.error("Exception in WEBGL base pocket: " + e);
  }
  /* Destructor */
  world.destroy = function () {
    delete this.gl;
    delete this;
  };
  return world;
}

// Update the frame rate FPS counter
export function updateFPS(elements) {
  // console.log(" Update FPS");
  var now = new Date().getTime();

  var delta = now - lastTime;
  lastTime = now;

  totalTime = totalTime + delta;
  updateTime = updateTime + delta;

  // eslint-disable-next-line no-global-assign
  modifyFrames(frames + 1);
  updateFrames = updateFrames + 1;

  if (1000 < updateTime) {
    document.getElementById('fps').innerHTML = 
    `FPS AVG:` + Math.floor((1000 * frames) / totalTime / elements) +
    ` CUR:` + Math.floor((1000 * updateFrames) / updateTime / elements);
    updateTime = 0;
    updateFrames = 0;
  }
}

export function drawCanvas() {
  // console.log("Init the canvas...");
  var canvas = document.createElement('canvas');
  canvas.id = 'canvas';
  if (App.resize.canvas == 'full-screen') {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    SYS.DEBUG.LOG('SYS: fullscreen diametric resize is active. ');
  } else {
    canvas.width = window.innerHeight * App.resize.aspectRatio;
    canvas.height = window.innerHeight;
    SYS.DEBUG.LOG('SYS: aspect ration resize is active. ');
  }
  document.body.append(canvas);
}

/* Degree to Radian converter */
export function degToRad(degrees) {
  return (degrees * Math.PI) / 180;
}

/* One time initiation of FPS to store initial time */
export function initiateFPS() {
  // console.log("    Initiate FPS");
  lastTime = new Date().getTime();
}

// Help the browser Garbage collect
window.onbeforeunload = onExit;

// Provides cancelRequestAnimFrame in a cross browser way.
window.cancelRequestAnimFrame = (function () {
  return (
    window.cancelAnimationFrame ||
    window.webkitCancelRequestAnimationFrame ||
    window.mozCancelRequestAnimationFrame ||
    window.oCancelRequestAnimationFrame ||
    window.msCancelRequestAnimationFrame ||
    function (callback) {
      window.clearTimeout(callback);
    }
  );
})();

// Dispose off the dangling objects
export function onExit() {
  /* RIP Mouse object */
  // mouseLoc.destroy();
  /* RIP Objects */
  looper = 0;
  while (looper <= objListToDispose.length - 1) {
    objListToDispose[looper].destroy();
    looper = looper + 1;
  }
  objListToDispose.length = 0;
}

App.operation.destroyWorld = function () {
  // console.log("Destroy at iteration:" + reDrawID);
  /* Stop the render */
  cancelRequestAnimFrame(reDrawID);
  delete this.pMatrix;
  delete this.mvMatrixStack;
  looper = 0;
  while (looper <= this.contentList.length - 1) {
    // console.log("Destroying: " + this.contentList[looper].type);
    delete this.contentList[looper].type;
    delete this.contentList[looper].size;
    delete this.contentList[looper].sides;

    /* Dispose the shaders */
    if (this.contentList[looper].shaderProgram.fragmentShader) {
      // console.log("Dispose Fragment Shader");
      this.GL.gl.deleteShader(this.contentList[looper].shaderProgram.fragmentShader);
      delete this.contentList[looper].shaderProgram.fragmentShader;
    }

    if (this.contentList[looper].shaderProgram.vertexShader) {
      // console.log("Dispose Vertex Shader");
      this.GL.gl.deleteShader(this.contentList[looper].shaderProgram.vertexShader);
      delete this.contentList[looper].shaderProgram.vertexShader;
    }

    /* Dispose the texture */
    if (this.contentList[looper].texture) {
      // console.log("Dispose Texture");
      // must be improved Nikola Lukic
      try {
        this.GL.gl.deleteTexture(this.contentList[looper].texture);
      } catch (e) {
        SYS.DEBUG.WARNING('Problem in destroying function : This is e log : ' + e);
      }
      delete this.contentList[looper].texture;
    }

    /* Dispose the program */
    if (this.contentList[looper].shaderProgram) {
      // console.log("Dispose Shader program");
      this.GL.gl.deleteProgram(this.contentList[looper].shaderProgram);
      delete this.contentList[looper].shaderProgram;
    }

    /* Empty the buffers */
    // console.log(" Dispose buffers");
    if (this.contentList[looper].vertexPositionBuffer) {
      // console.log("Dispose Vertex Position Buffer");
      this.GL.gl.deleteBuffer(this.contentList[looper].vertexPositionBuffer);
      delete this.contentList[looper].vertexPositionBuffer;
    }
    if (this.contentList[looper].vertexTexCoordBuffer) {
      // console.log("Dispose Vertex Coordinate Buffer");
      this.GL.gl.deleteBuffer(this.contentList[looper].vertexTexCoordBuffer);
      delete this.contentList[looper].vertexTexCoordBuffer;
    }
    if (this.contentList[looper].vertexColorBuffer) {
      // console.log("Dispose Vertex Color Buffer");
      this.GL.gl.deleteBuffer(this.contentList[looper].vertexColorBuffer);
      delete this.contentList[looper].vertexColorBuffer;
    }
    if (this.contentList[looper].vertexIndexBuffer) {
      // console.log("Dispose Vertex Index Buffer");
      this.GL.gl.deleteBuffer(this.contentList[looper].vertexIndexBuffer);
      delete this.contentList[looper].vertexIndexBuffer;
    }

    delete this.contentList[looper].rotation;
    delete this.contentList[looper].color;
    delete this.contentList[looper].mvMatrix;

    looper = looper + 1;
  }
  this.contentList.length = 0;
  this.GL.destroy();
  SYS.DEBUG.WARNING('exit');
  delete this;
};

/**
 * @description
 * LOAD SHADERS DYNAMIC
 */
export function loadShaders(gl, id) {
  // console.log("          Get the Shader");
  // console.log("            Creating Shader:" + id);
  var shaderScript = document.getElementById(id);
  var shader;
  var str = '';

  if (shaderScript) {
    var k = shaderScript.firstChild;
    while (k) {
      if (k.nodeType == 3) {
        str += k.textContent;
      }
      k = k.nextSibling;
    }

    if (shaderScript.type == 'x-shader/x-fragment') {
      // console.log("Creating fragment shader");
      shader = gl.createShader(gl.FRAGMENT_SHADER);
    } else if (shaderScript.type == 'x-shader/x-vertex') {
      // console.log("Creating vertex shader");
      shader = gl.createShader(gl.VERTEX_SHADER);
    } else {
      return 0;
    }

    gl.shaderSource(shader, str);
    gl.compileShader(shader);

    if (gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      // console.log("Shader Program compile success");
      return shader;
    } else {
      console.warn('Shader Program compile failed:' + gl.getShaderInfoLog(shader));
      return 0;
    }
  } else {
    console.warn('Shader Program creation failed');
    return 0;
  }
}

export function initShaders(gl, fragment, vertex) {
  // console.log("Initialize Shader");
  var fragmentShader = this.getShader(gl, fragment);
  var vertexShader = this.getShader(gl, vertex);
  if (0 == fragmentShader || 0 == vertexShader) {
    console.warn('Failed to Load shader');
    return 0;
  } else {
    var shaderProgram = gl.createProgram();
    // console.log("Creating Shader fragment");
    gl.attachShader(shaderProgram, vertexShader);
    gl.attachShader(shaderProgram, fragmentShader);
    gl.linkProgram(shaderProgram);

    if (gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
      console.log("          Returning Shader fragment successfully");
      gl.useProgram(shaderProgram);

      shaderProgram.vertexPositionAttribute = gl.getAttribLocation(shaderProgram, 'aVertexPosition');
      gl.enableVertexAttribArray(shaderProgram.vertexPositionAttribute);

      if (gl.getAttribLocation(shaderProgram, 'aVertexColor') >= 0) {
        shaderProgram.vertexColorAttribute = gl.getAttribLocation(shaderProgram, 'aVertexColor');
        gl.enableVertexAttribArray(shaderProgram.vertexColorAttribute);
      }

      if (gl.getAttribLocation(shaderProgram, 'aTextureCoord') >= 0) {
        shaderProgram.textureCoordAttribute = gl.getAttribLocation(shaderProgram, 'aTextureCoord');
        gl.enableVertexAttribArray(shaderProgram.textureCoordAttribute);
        shaderProgram.samplerUniform = gl.getUniformLocation(shaderProgram, 'uSampler');
      }

      if (gl.getAttribLocation(shaderProgram, 'aVertexNormal') >= 0) {
        shaderProgram.vertexNormalAttribute = gl.getAttribLocation(shaderProgram, 'aVertexNormal');
        gl.enableVertexAttribArray(shaderProgram.vertexNormalAttribute);
      }

      if (null !== gl.getUniformLocation(shaderProgram, 'uNMatrix')) {
        shaderProgram.nMatrixUniform = gl.getUniformLocation(shaderProgram, 'uNMatrix');
      }

      // For 2d sprite test - not in use for now!
      if (null !== gl.getUniformLocation(shaderProgram, 'layer')) {
        shaderProgram.layerLocation = gl.getUniformLocation(shaderProgram, 'layer');
      }

      // Test
      if (null !== gl.getUniformLocation(shaderProgram, 'numberOfsamplers')) {
        shaderProgram.numberOfsamplers = gl.getUniformLocation(shaderProgram, 'numberOfsamplers');
      }
      // Test
      if (null !== gl.getUniformLocation(shaderProgram, 'TimeFor')) {
        shaderProgram.uniformTime = gl.getUniformLocation(shaderProgram, 'TimeFor');
      }

      // Multi samplers for textutes
      if (null !== gl.getUniformLocation(shaderProgram, 'uSampler')) {
        shaderProgram.samplerUniform = gl.getUniformLocation(shaderProgram, 'uSampler');
      }
      if (null !== gl.getUniformLocation(shaderProgram, 'uSampler1')) {
        shaderProgram.samplerUniform1 = gl.getUniformLocation(shaderProgram, 'uSampler1');
      }
      if (null !== gl.getUniformLocation(shaderProgram, 'uSampler2')) {
        shaderProgram.samplerUniform2 = gl.getUniformLocation(shaderProgram, 'uSampler2');
      }
      if (null !== gl.getUniformLocation(shaderProgram, 'uSampler3')) {
        shaderProgram.samplerUniform3 = gl.getUniformLocation(shaderProgram, 'uSampler3');
      }
      if (null !== gl.getUniformLocation(shaderProgram, 'uSampler4')) {
        shaderProgram.samplerUniform4 = gl.getUniformLocation(shaderProgram, 'uSampler4');
      }
      if (null !== gl.getUniformLocation(shaderProgram, 'uSampler5')) {
        shaderProgram.samplerUniform5 = gl.getUniformLocation(shaderProgram, 'uSampler5');
      }
      if (null !== gl.getUniformLocation(shaderProgram, 'uSampler6')) {
        shaderProgram.samplerUniform6 = gl.getUniformLocation(shaderProgram, 'uSampler6');
      }
      if (null !== gl.getUniformLocation(shaderProgram, 'uSampler7')) {
        shaderProgram.samplerUniform7 = gl.getUniformLocation(shaderProgram, 'uSampler7');
      } // maybe to the 16 ?
      if (null !== gl.getUniformLocation(shaderProgram, 'uUseLighting')) {
        shaderProgram.useLightingUniform = gl.getUniformLocation(shaderProgram, 'uUseLighting');
      }
      if (null !== gl.getUniformLocation(shaderProgram, 'uAmbientColor')) {
        shaderProgram.ambientColorUniform = gl.getUniformLocation(shaderProgram, 'uAmbientColor');
      }
      if (null !== gl.getUniformLocation(shaderProgram, 'uLightingDirection')) {
        shaderProgram.lightingDirectionUniform = gl.getUniformLocation(shaderProgram, 'uLightingDirection');
      }
      if (null !== gl.getUniformLocation(shaderProgram, 'uDirectionalColor')) {
        shaderProgram.directionalColorUniform = gl.getUniformLocation(shaderProgram, 'uDirectionalColor');
      }
      // Local SpotLight
      if (null !== gl.getUniformLocation(shaderProgram, 'u_shininess')) {
        shaderProgram.shininessLocation = gl.getUniformLocation(shaderProgram, 'u_shininess');
      }
      if (null !== gl.getUniformLocation(shaderProgram, 'u_lightDirection')) {
        shaderProgram.lightDirectionLocation = gl.getUniformLocation(shaderProgram, 'u_lightDirection');
      }
      if (null !== gl.getUniformLocation(shaderProgram, 'u_innerLimit')) {
        shaderProgram.innerLimitLocation = gl.getUniformLocation(shaderProgram, 'u_innerLimit');
      }
      if (null !== gl.getUniformLocation(shaderProgram, 'u_outerLimit')) {
        shaderProgram.outerLimitLocation = gl.getUniformLocation(shaderProgram, 'u_outerLimit');
      }
      if (null !== gl.getUniformLocation(shaderProgram, 'u_lightWorldPosition')) {
        shaderProgram.lightWorldPositionLocation = gl.getUniformLocation(shaderProgram, 'u_lightWorldPosition');
      }
      // test
      if (null !== gl.getUniformLocation(shaderProgram, 'u_textureMatrix')) {
        shaderProgram.u_textureMatrix = gl.getUniformLocation(shaderProgram, 'u_textureMatrix');
      }

      if (null !== gl.getUniformLocation(shaderProgram, 'u_projectedTexture')) {
        shaderProgram.u_projectedTexture = gl.getUniformLocation(shaderProgram, 'u_projectedTexture');
      }

      
      if (null !== gl.getUniformLocation(shaderProgram, 'u_bias')) {
        shaderProgram.u_bias = gl.getUniformLocation(shaderProgram, 'u_bias');
      }
    
     
      // 

      //

      // 1.8.4 cubeMap
      if (null !== gl.getUniformLocation(shaderProgram, 'u_texture')) {
        shaderProgram.uCubeMapSampler = gl.getUniformLocation(shaderProgram, 'u_texture');
      }
      // [1.8.8] global positon light test
      if (null !== gl.getUniformLocation(shaderProgram, 'specularColor')) {
        shaderProgram.specularColor = gl.getUniformLocation(shaderProgram, 'specularColor');
      }
      if (null !== gl.getUniformLocation(shaderProgram, 'uLightPosition')) {
        shaderProgram.uLightPosition = gl.getUniformLocation(shaderProgram, 'uLightPosition');
      }
      // [1.8.9] Lens effect
      if (null !== gl.getUniformLocation(shaderProgram, 'uResolution')) {
        shaderProgram.uResolution = gl.getUniformLocation(shaderProgram, 'uResolution');
      }
      if (null !== gl.getUniformLocation(shaderProgram, 'uControl')) {
        shaderProgram.uControl = gl.getUniformLocation(shaderProgram, 'uControl');
      }

      shaderProgram.pMatrixUniform = gl.getUniformLocation(shaderProgram, 'uPMatrix');
      shaderProgram.mvMatrixUniform = gl.getUniformLocation(shaderProgram, 'uMVMatrix');

      /* For destroying properly            */
      shaderProgram.fragmentShader = fragmentShader;
      shaderProgram.vertexShader = vertexShader;

      return shaderProgram;
    } else {
     
      console.warn('Returning Shader fragment failed!');
      return 0;
    }
  }
}
// END OF SHADERS DYNAMIC

// MATRIX OPETARION
App.operation.PUSH_MATRIX = function (mvMatrix, mvMatrixStack) {
  var copy = mat4.create();
  mat4.copy(mvMatrix, copy);
  mvMatrixStack.push(copy);
};

App.operation.POP_MATRIX = function (mvMatrix, mvMatrixStack) {
  if (mvMatrixStack.length == 0) {
    throw 'Invalid popMatrix!';
  }
  mvMatrix = mvMatrixStack.pop();
};

App.operation.SET_MATRIX_UNIFORMS = function (object, pMatrix) {
  this.GL.gl.uniformMatrix4fv(object.shaderProgram.pMatrixUniform, false, pMatrix);
  this.GL.gl.uniformMatrix4fv(object.shaderProgram.mvMatrixUniform, false, object.mvMatrix);
};

// Modify shaders in runtime.
export var RegenerateShader = function (id_elem, numOfSamplerInUse, mixOperand, lightType) {
  var e = document.getElementById(id_elem);
  if (mixOperand == 'multiply') {
    mixOperand = 0;
  } else if (mixOperand == 'divide') {
    mixOperand = 1;
  }

  if (typeof lightType !== 'undefined') {
    console.log('shader version: 300 ', lightType)
    e.innerHTML = generateShaderSrc3(numOfSamplerInUse, mixOperand, lightType);
  } else {
    console.log('shader version: 2 ', lightType)
    e.innerHTML = generateShaderSrc(numOfSamplerInUse, mixOperand);
  }
};

// Modify shaders in runtime.
export var RegenerateCubeMapShader = function (id_elem, numOfSamplerInUse, mixOperand, lightType) {
  var e = document.getElementById(id_elem);
  if (mixOperand == 'multiply') {
    mixOperand = 0;
  } else if (mixOperand == 'divide') {
    mixOperand = 1;
  }
  if (typeof lightType !== 'undefined') {
    e.innerHTML = generateCubeMapShaderSrc(numOfSamplerInUse, mixOperand, lightType);
  } else {
    e.innerHTML = generateCubeMapShaderSrc(numOfSamplerInUse, mixOperand);
  }
};

// Not active
// export var RegenerateShaderSimpleDirectionLight = function (id_elem) {
//   var e = document.getElementById(id_elem);
//   e.innerHTML = generateShaderSimpleDirection();
// };
// // Not active
// export var RegenerateVShaderSimpleDirectionLight = function (id_elem) {
//   var e = document.getElementById(id_elem);
//   e.innerHTML = generateVShaderSimpleDirectionLight();
// };

export var RegenerateCustomShader = function (id_elem, numOfSamplerInUse, mixOperand, code_) {
  var e = document.getElementById(id_elem);

  if (mixOperand == 'multiply') {
    mixOperand = 0;
  } else if (mixOperand == 'divide') {
    mixOperand = 1;
  }

  e.innerHTML = generateCustomShaderSrc(numOfSamplerInUse, mixOperand, code_);
};

export var webcamError = function (e) {
  alert('Webcam error!' + e);
};

export function SET_STREAM(video) {
  if (navigator.getUserMedia) {
    navigator.getUserMedia(
      {
        audio: true,
        video: true
      },
      function (stream) {
        try {
          video.srcObject = stream;
        } catch (error) {
          video.src = window.URL.createObjectURL(stream);
        }
      },
      webcamError
    );
  } else if (navigator.webkitGetUserMedia) {
    navigator.webkitGetUserMedia(
      {
        audio: true,
        video: true
      },
      function (stream) {
        try {
          video.srcObject = stream;
        } catch (error) {
          video.src = window.URL.createObjectURL(stream);
        }
      },
      webcamError
    );
  } else {
    alert('webcam broken.');
  }
}

export function ACCESS_CAMERA(htmlElement) {
  var ROOT = this;

  ROOT.video = document.getElementById(htmlElement);
  SET_STREAM(ROOT.video);

  var DIV_CONTENT_STREAMS = document.getElementById('HOLDER_STREAMS');

  ROOT.videoImage = document.createElement('canvas');
  ROOT.videoImage.id = htmlElement + 'IMAGE_';
  ROOT.videoImage.setAttribute('width', '512px');
  ROOT.videoImage.setAttribute('height', '512px');
  DIV_CONTENT_STREAMS.appendChild(ROOT.videoImage);

  ROOT.videoImageContext = ROOT.videoImage.getContext('2d');
  ROOT.videoImageContext.fillStyle = '#0000FF';
  ROOT.videoImageContext.fillRect(0, 0, ROOT.videoImage.width, ROOT.videoImage.height);

  ROOT.texture = App.tools.loadVideoTexture('glVideoTexture', ROOT.videoImage);

  ROOT.UPDATE = function () {
    if (ROOT.video.readyState === ROOT.video.HAVE_ENOUGH_DATA) {
      ROOT.videoImageContext.drawImage(ROOT.video, 0, 0, ROOT.videoImage.width, ROOT.videoImage.height);

      ROOT.videoImageContext.font = '30px Georgia';
      ROOT.videoImageContext.fillStyle = 'black';
      ROOT.videoImageContext.fillText(' Visual-JS game engine -webGL 2 part', 0, 85);
      ROOT.videoImageContext.fillText('Video texture example ', 20, 50);
    }
  };

  // console.log("Video 3d canvas texture created.");
  App.updateBeforeDraw.push(ROOT);
  // Dispose for this needed!
}

export function VIDEO_TEXTURE(p) {
  var ROOT = this,
    DIV_CONTENT_STREAMS = document.getElementById('HOLDER_STREAMS');

  ROOT.video = document.getElementById('webcam_beta');

  ROOT.video.READY = function (e) {
    ROOT.videoImage = document.createElement('canvas');
    ROOT.videoImage.id = 'webcam_beta' + 'IMAGE_';
    ROOT.videoImage.setAttribute('width', '512px');
    ROOT.videoImage.setAttribute('height', '512px');
    DIV_CONTENT_STREAMS.appendChild(ROOT.videoImage);

    ROOT.videoImageContext = ROOT.videoImage.getContext('2d');
    ROOT.videoImageContext.fillStyle = '#00003F';
    ROOT.videoImageContext.fillRect(0, 0, ROOT.videoImage.width, ROOT.videoImage.height);
    ROOT.texture = App.tools.loadVideoTexture('glVideoTexture', ROOT.videoImage);

    App.updateBeforeDraw.push(ROOT);
    // console.info("Video 2dcanvas texture created.");
  };

  ROOT.video.addEventListener('loadeddata', ROOT.video.READY, false);

  ROOT.video.src = 'res/videos/' + p;

  ROOT.UPDATE = function () {
    if (ROOT.video.readyState === ROOT.video.HAVE_ENOUGH_DATA) {
      ROOT.videoImageContext.drawImage(ROOT.video, 0, 0, ROOT.videoImage.width, ROOT.videoImage.height);

      ROOT.videoImageContext.font = '30px Georgia';
      ROOT.videoImageContext.fillStyle = 'black';
      ROOT.videoImageContext.fillText(' Visual-JS game engine -webGL 2 part', 0, 85);
      ROOT.videoImageContext.fillText('Video texture example ', 20, 50);
    }
  };
}

export function VT(p, name, options) {

  if (typeof name === 'undefined') name = 'vtex' + randomIntFromTo(1,999999);
  if (typeof options === 'undefined') {
    options = {
      mixWithCanvas2d: false,
    };
  }

  function fixAutoPlay() {
    console.log("Autoplay fixing...? ",  ROOT.video);
    window.addEventListener('click', FirstClickAutoPlay, {passive: false});
  }

  function FirstClickAutoPlay() {
    var t = ROOT.video.play();
    t.then(()=>{
      console.info("Autoplay fixed.");
      window.removeEventListener('click', FirstClickAutoPlay);
    }).catch(()=>{
      console.warn("Autoplay error.");
    });
  }

  var ROOT = this,
    DIV_CONTENT_STREAMS = document.getElementById('HOLDER_STREAMS');
  ROOT.video = document.createElement('video');
  DIV_CONTENT_STREAMS.appendChild(ROOT.video);
  // ROOT.name = 'vtex-' + name;

  ROOT.video.READY = function (e) {
    ROOT.videoImage = document.createElement('canvas');
    ROOT.videoImage.id = 'vtex-' + name;
    ROOT.videoImage.setAttribute('width', '512px');
    ROOT.videoImage.setAttribute('height', '512px');
    ROOT.video.mute = true;
    ROOT.video.autoplay = true;
    ROOT.video.loop = true;
    DIV_CONTENT_STREAMS.appendChild(ROOT.videoImage);

    ROOT.options = options;

    if (options.mixWithCanvas2d == true) {
      ROOT.videoImageContext = ROOT.videoImage.getContext('2d');
      ROOT.videoImageContext.fillStyle = '#00003F';
      ROOT.videoImageContext.fillRect(0, 0, ROOT.videoImage.width, ROOT.videoImage.height);
      ROOT.texture = App.tools.loadVideoTexture('glVideoTexture' + name, ROOT.videoImage);
    } else {
      ROOT.texture = App.tools.loadVideoTexture('glVideoTexture' + name, ROOT.video);
    }

    try {
      var testAutoplay = ROOT.video.play();
      testAutoplay.catch(()=> {
        fixAutoPlay();
      })
    } catch(err) { }

    App.updateBeforeDraw.push(ROOT);
    console.info("Video 2dcanvas texture created.", ROOT.video);
  };

  ROOT.video.addEventListener('loadeddata', ROOT.video.READY, false);

  ROOT.video.src = p;
  ROOT.video.load();

  ROOT.UPDATE = function () {
    if (ROOT.options.mixWithCanvas2d == false) return;

    if (ROOT.video.readyState === ROOT.video.HAVE_ENOUGH_DATA) {
      ROOT.videoImageContext.drawImage(ROOT.video, 0, 0, ROOT.videoImage.width, ROOT.videoImage.height);
      ROOT.videoImageContext.font = '30px Georgia';
      ROOT.videoImageContext.fillStyle = 'black';
      ROOT.videoImageContext.fillText('Matrix-Engine [1.8.10] ', 0, 85);
      ROOT.videoImageContext.fillText('Video texture', 20, 50);
    }
  };
}

export function Vjs3(path_, nameOfCanvas) {
  var ROOT = this;
  ROOT.iframe = document.createElement('iframe');
  ROOT.iframe.id = nameOfCanvas;
  // ROOT.iframe.setAttribute('style', 'width:512px;height:512px');
  ROOT.iframe.setAttribute('width', '512');
  ROOT.iframe.setAttribute('height', '512');

  var DIV_CONTENT_STREAMS = document.getElementById('HOLDER_STREAMS');
  ROOT.iframe.data = path_;
  ROOT.iframe.src = path_;
  DIV_CONTENT_STREAMS.appendChild(ROOT.iframe);

  document.getElementById(ROOT.iframe.id).onload = function (event) {
    ROOT.videoImage = ROOT.iframe.contentDocument.getElementById(nameOfCanvas);

    ROOT.canvasTexture = ROOT.videoImage.getContext('2d');
    App.scene.outsideBox.streamTextures.iframe.contentWindow.runTextureEditor(nameOfCanvas);
    // E('HOLDER_STREAMS').style.display = 'block';
    ROOT.texture = App.tools.loadVideoTexture('glVideoTexture', ROOT.videoImage);
  };

  ROOT.showTextureEditor = function () {
    var T = E('HOLDER_STREAMS').style;
    T.display = 'block';
    T.left = '0';
  };
}

export function anyCanvas(path_, nameOfCanvas) {
  var ROOT = this;
  ROOT.iframe = document.createElement('object');
  ROOT.iframe.id = 'canvas2dTextureSurface' + document.getElementsByTagName('object').length;
  // ROOT.iframe.setAttribute('style', 'width:512px;height:512px');

  ROOT.iframe.setAttribute('width', '512');
  ROOT.iframe.setAttribute('height', '512');

  var DIV_CONTENT_STREAMS = document.getElementById('HOLDER_STREAMS');
  DIV_CONTENT_STREAMS.appendChild(ROOT.iframe);

  document.getElementById(ROOT.iframe.id).onload = (event) => {
    ROOT.videoImage = ROOT.iframe.contentDocument.getElementById(nameOfCanvas);
    if (typeof ROOT.iframe.contentWindow.runTextureEditor !== 'undefined') {
      App.scene.outsideBox.streamTextures.iframe.contentWindow.runTextureEditor(nameOfCanvas);
    }
    ROOT.canvasTexture = ROOT.videoImage.getContext('2d');
    // App.scene.outsideBox.streamTextures.iframe.contentWindow.runTextureEditor(nameOfCanvas);
    E('HOLDER_STREAMS').style.display = 'block';
    ROOT.texture = App.tools.loadVideoTexture('glVideoTexture', ROOT.videoImage);
  };

  ROOT.showTextureEditor = function () {
    var T = E('HOLDER_STREAMS').style;
    T.display = 'block';
    T.left = '0';
  };

  ROOT.iframe.data = path_;
}
