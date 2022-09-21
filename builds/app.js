(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var matrixEngine = _interopRequireWildcard(require("./index.js"));

var _adding_color_cube = require("./apps/adding_color_cube");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var world;
var App = matrixEngine.App;

if ('serviceWorker' in navigator) {
  window.addEventListener('load', function (e) {
    // navigator.serviceWorker.register('worker.js');
    App.ready = true;
    matrixEngine.Engine.initApp(webGLStart);
  });
} else {
  console.warn('Matrix Engine: No support for web workers in this browser.');
}

window.webGLStart = () => {
  world = matrixEngine.matrixWorld.defineworld(canvas);
  world.callReDraw(); // Make it global for dev - for easy console/debugger access

  window.world = world;
  window.App = App;
  window.runThis = _adding_color_cube.runThis;
  matrixEngine.utility.E('debugBox').style.display = 'block'; // canvas.addEventListener('mousedown', (ev) => { raycaster.checkingProcedure(ev); });
  // If you need this , you can prolong loading time

  setTimeout(() => {
    (0, _adding_color_cube.runThis)(world);
  }, 250);
};

window.matrixEngine = matrixEngine;
var App = matrixEngine.App;
var _default = App;
exports.default = _default;

},{"./apps/adding_color_cube":2,"./index.js":3}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.runThis = void 0;

var _manifest = _interopRequireDefault(require("../program/manifest"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 *@Author Nikola Lukic
 *@Description Matrix Engine Api Example
 * Adding default color cube.
 */

/* globals world App */
var runThis = world => {
  world.Add("cube", 1, "MyColoredCube1");
  world.Add("cube", 1, "MyColoredCube2");
  world.Add("cube", 1, "MyColoredCube3");
  canvas.addEventListener('mousedown', ev => {
    matrixEngine.raycaster.checkingProcedure(ev);
  });
  addEventListener("ray.hit.event", function (e) {
    console.info(e.detail);
  });

  _manifest.default.scene.MyColoredCube1.position.SetX(0);

  _manifest.default.scene.MyColoredCube2.position.SetX(-2.5);

  _manifest.default.scene.MyColoredCube3.position.SetX(2.5);

  _manifest.default.scene.MyColoredCube1.rotation.rotationSpeed.x = 15;
  _manifest.default.scene.MyColoredCube2.rotation.rotationSpeed.y = 15;
  _manifest.default.scene.MyColoredCube3.rotation.rotationSpeed.z = 15;
};

exports.runThis = runThis;

},{"../program/manifest":25}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "App", {
  enumerable: true,
  get: function () {
    return _manifest.default;
  }
});
Object.defineProperty(exports, "operation", {
  enumerable: true,
  get: function () {
    return _matrixBuffers.default;
  }
});
Object.defineProperty(exports, "texTools", {
  enumerable: true,
  get: function () {
    return _matrixTextures.default;
  }
});
Object.defineProperty(exports, "MEBvhAnimation", {
  enumerable: true,
  get: function () {
    return _matrixBvh.default;
  }
});
exports.raycaster = exports.utility = exports.objLoader = exports.Events = exports.Engine = exports.matrixRender = exports.matrixGeometry = exports.matrixWorld = void 0;

var _manifest = _interopRequireDefault(require("./program/manifest"));

var matrixWorld = _interopRequireWildcard(require("./lib/matrix-world"));

exports.matrixWorld = matrixWorld;

var matrixGeometry = _interopRequireWildcard(require("./lib/matrix-geometry"));

exports.matrixGeometry = matrixGeometry;

var matrixRender = _interopRequireWildcard(require("./lib/matrix-render"));

exports.matrixRender = matrixRender;

var Engine = _interopRequireWildcard(require("./lib/engine"));

exports.Engine = Engine;

var Events = _interopRequireWildcard(require("./lib/events"));

exports.Events = Events;

var objLoader = _interopRequireWildcard(require("./lib/loader-obj"));

exports.objLoader = objLoader;

var _matrixBuffers = _interopRequireDefault(require("./lib/matrix-buffers"));

var _matrixTextures = _interopRequireDefault(require("./lib/matrix-textures"));

var utility = _interopRequireWildcard(require("./lib/utility"));

exports.utility = utility;

var raycaster = _interopRequireWildcard(require("./lib/raycast"));

exports.raycaster = raycaster;

var _matrixBvh = _interopRequireDefault(require("./lib/matrix-bvh"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

},{"./lib/engine":4,"./lib/events":5,"./lib/loader-obj":6,"./lib/matrix-buffers":7,"./lib/matrix-bvh":8,"./lib/matrix-geometry":10,"./lib/matrix-render":12,"./lib/matrix-textures":16,"./lib/matrix-world":17,"./lib/raycast":19,"./lib/utility":20,"./program/manifest":25}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.modifyLooper = modifyLooper;
exports.resizeView = resizeView;
exports.initApp = initApp;
exports.isReady = isReady;
exports.load_shaders = load_shaders;
exports.loadHtmlPowerAsset = loadHtmlPowerAsset;
exports.defineWebGLWorld = defineWebGLWorld;
exports.updateFPS = updateFPS;
exports.drawCanvas = drawCanvas;
exports.degToRad = degToRad;
exports.initiateFPS = initiateFPS;
exports.onExit = onExit;
exports.loadShaders = loadShaders;
exports.initShaders = initShaders;
exports.SET_STREAM = SET_STREAM;
exports.ACCESS_CAMERA = ACCESS_CAMERA;
exports.VIDEO_TEXTURE = VIDEO_TEXTURE;
exports.Vjs3 = Vjs3;
exports.anyCanvas = anyCanvas;
exports.webcamError = exports.RegenerateCustomShader = exports.RegenerateVShaderSimpleDirectionLight = exports.RegenerateShaderSimpleDirectionLight = exports.RegenerateShader = exports.looper = exports.EVENTS_INSTANCE = exports.updateFrames = exports.updateTime = exports.totalTime = exports.lastTime = exports.ht = exports.wd = void 0;

var _events = require("./events");

var _manifest = _interopRequireDefault(require("../program/manifest"));

var _utility = require("./utility");

var _webglUtils = require("./webgl-utils");

var _matrixRender = require("./matrix-render");

var _matrixWorld = require("./matrix-world");

var _matrixShaders = require("./matrix-shaders");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable no-undef */

/* eslint-disable no-unused-vars */
var wd = 0,
    ht = 0,
    lastTime = 0,
    totalTime = 0,
    updateTime = 0,
    updateFrames = 0;
exports.updateFrames = updateFrames;
exports.updateTime = updateTime;
exports.totalTime = totalTime;
exports.lastTime = lastTime;
exports.ht = ht;
exports.wd = wd;
let EVENTS_INSTANCE = null;
exports.EVENTS_INSTANCE = EVENTS_INSTANCE;
let looper = 0;
exports.looper = looper;

function modifyLooper(value) {
  exports.looper = looper = value;
}

function resizeView() {
  exports.wd = wd = document.body.clientWidth - 4;

  if (document.body.clientHeight > document.documentElement.clientHeight) {
    exports.ht = ht = document.body.clientHeight - 10;
  } else {
    exports.ht = ht = document.documentElement.clientHeight - 4;
  }
}

function initApp(callback) {
  /* Calculate Width and Height before rendering       */
  resizeView();
  drawCanvas();
  window.canvas = document.getElementById('canvas');

  if (_manifest.default.events == true && EVENTS_INSTANCE === null) {
    exports.EVENTS_INSTANCE = EVENTS_INSTANCE = new _events.EVENTS((0, _utility.E)('canvas'));
  }

  if (typeof callback !== 'undefined') {
    // E('canvas').webGLStartCallBack = callback;
    window.webGLStartCallBack = callback;
    callback();
  }
}

function isReady() {
  if (0 == world) {
    return false;
  } else {
    return true;
  }
}

async function load_shaders(href) {
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

function loadHtmlPowerAsset(href, callback) {
  function handler() {
    if (this.status == 200 && this.responseText != null) {
      // Success
      document.getElementById('media-holder').innerHTML = this.responseText;

      if (typeof callback !== 'undefined') {
        callback();
      }
    } else {// something went wrong
      // console.log("something went wrong on shaders load procces!");
    }
  }

  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onload = handler;
  xmlhttp.open('GET', href, true);
  xmlhttp.send();
} // WebGL start
// Base environment property for totality of WEBGL


function defineWebGLWorld(cavnas) {
  // console.log("      Define the WEBGL base pocket");
  var world = new Object();
  /* Constructor for a particular GL environment   */

  try {
    var gl = _webglUtils.WebGLUtils.setupWebGL(canvas);

    gl.viewportWidth = canvas.width;
    gl.viewportHeight = canvas.height;
    world.gl = gl; // console.log("      WEBGL base pocket: SUCCESS");
  } catch (e) {
    /* Exception: Could not initialise WebGL     */
    // console.log("      Exception in WEBGL base pocket: " + e);
  }
  /* Destructor                                    */


  world.destroy = function () {
    delete this.gl;
    delete this;
  };

  return world;
} // Update the frame rate FPS counter


function updateFPS(elements) {
  // // console.log("    Update FPS");
  var now = new Date().getTime();
  var delta = now - lastTime;
  exports.lastTime = lastTime = now;
  exports.totalTime = totalTime = totalTime + delta;
  exports.updateTime = updateTime = updateTime + delta; // eslint-disable-next-line no-global-assign

  (0, _matrixWorld.modifyFrames)(_matrixWorld.frames + 1);
  exports.updateFrames = updateFrames = updateFrames + 1;

  if (1000 < updateTime) {
    document.getElementById('fps').innerHTML = 'FPS AVG:' + Math.floor(1000 * _matrixWorld.frames / totalTime / elements) + ' CUR:' + Math.floor(1000 * updateFrames / updateTime / elements + ' matrixEngine');
    exports.updateTime = updateTime = 0;
    exports.updateFrames = updateFrames = 0;
  }
}

function drawCanvas() {
  // console.log("Init the canvas...");
  var canvas = document.createElement('canvas');
  canvas.id = 'canvas';

  if (_manifest.default.resize.canvas == "full-screen") {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    _events.SYS.DEBUG.LOG('SYS: fullscreen diametric resize is active. ');
  } else {
    canvas.width = window.innerHeight * _manifest.default.resize.aspectRatio;
    canvas.height = window.innerHeight;

    _events.SYS.DEBUG.LOG('SYS: aspect ration resize is active. ');
  }

  document.body.append(canvas);
}
/* Degree to Radian converter                        */


function degToRad(degrees) {
  return degrees * Math.PI / 180;
}
/* One time initiation of FPS to store initial time  */


function initiateFPS() {
  // console.log("    Initiate FPS");
  exports.lastTime = lastTime = new Date().getTime();
} // Help the browser Garbage collect


window.onbeforeunload = onExit; //$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
// Provides cancelRequestAnimFrame in a cross browser way.
//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$

window.cancelRequestAnimFrame = function () {
  return window.cancelAnimationFrame || window.webkitCancelRequestAnimationFrame || window.mozCancelRequestAnimationFrame || window.oCancelRequestAnimationFrame || window.msCancelRequestAnimationFrame || function (callback) {
    window.clearTimeout(callback);
  };
}(); //$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
// Dispose off the dangling objects
//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$


function onExit() {
  /* RIP Mouse object                              */
  //mouseLoc.destroy();

  /* RIP Objects                                   */
  exports.looper = looper = 0;

  while (looper <= _matrixWorld.objListToDispose.length - 1) {
    _matrixWorld.objListToDispose[looper].destroy();

    exports.looper = looper = looper + 1;
  }

  _matrixWorld.objListToDispose.length = 0;
}

_manifest.default.operation.destroyWorld = function () {
  // console.log("    Destroy at iteration:" + reDrawID);

  /* Stop the render                               */
  cancelRequestAnimFrame(_matrixRender.reDrawID);
  delete this.pMatrix;
  delete this.mvMatrixStack;
  exports.looper = looper = 0;

  while (looper <= this.contentList.length - 1) {
    // console.log("    Destroying: " + this.contentList[looper].type);
    delete this.contentList[looper].type;
    delete this.contentList[looper].size;
    delete this.contentList[looper].sides;
    /* Dispose the shaders                       */

    if (this.contentList[looper].shaderProgram.fragmentShader) {
      // console.log("      Dispose Fragment Shader");
      this.GL.gl.deleteShader(this.contentList[looper].shaderProgram.fragmentShader);
      delete this.contentList[looper].shaderProgram.fragmentShader;
    }

    if (this.contentList[looper].shaderProgram.vertexShader) {
      // console.log("      Dispose Vertex Shader");
      this.GL.gl.deleteShader(this.contentList[looper].shaderProgram.vertexShader);
      delete this.contentList[looper].shaderProgram.vertexShader;
    }
    /* Dispose the texture                       */


    if (this.contentList[looper].texture) {
      // console.log("      Dispose Texture");
      // must be improved Nikola Lukic
      try {
        this.GL.gl.deleteTexture(this.contentList[looper].texture);
      } catch (e) {
        _events.SYS.DEBUG.WARNING('Problem in destroying function : This is e log : ' + e);
      }

      delete this.contentList[looper].texture;
    }
    /* Dispose the program                       */


    if (this.contentList[looper].shaderProgram) {
      // console.log("      Dispose Shader program");
      this.GL.gl.deleteProgram(this.contentList[looper].shaderProgram);
      delete this.contentList[looper].shaderProgram;
    }
    /* Empty the buffers                         */
    // console.log("      Dispose buffers");


    if (this.contentList[looper].vertexPositionBuffer) {
      // console.log("        Dispose Vertex Position Buffer");
      this.GL.gl.deleteBuffer(this.contentList[looper].vertexPositionBuffer);
      delete this.contentList[looper].vertexPositionBuffer;
    }

    if (this.contentList[looper].vertexTexCoordBuffer) {
      // console.log("        Dispose Vertex Coordinate Buffer");
      this.GL.gl.deleteBuffer(this.contentList[looper].vertexTexCoordBuffer);
      delete this.contentList[looper].vertexTexCoordBuffer;
    }

    if (this.contentList[looper].vertexColorBuffer) {
      // console.log("        Dispose Vertex Color Buffer");
      this.GL.gl.deleteBuffer(this.contentList[looper].vertexColorBuffer);
      delete this.contentList[looper].vertexColorBuffer;
    }

    if (this.contentList[looper].vertexIndexBuffer) {
      // console.log("        Dispose Vertex Index Buffer");
      this.GL.gl.deleteBuffer(this.contentList[looper].vertexIndexBuffer);
      delete this.contentList[looper].vertexIndexBuffer;
    }

    delete this.contentList[looper].rotation;
    delete this.contentList[looper].color;
    delete this.contentList[looper].mvMatrix;
    exports.looper = looper = looper + 1;
  }

  this.contentList.length = 0;
  this.GL.destroy();

  _events.SYS.DEBUG.WARNING('exit');

  delete this;
}; //##################################
// LOAD SHADERS DYNAMIC
//##################################


function loadShaders(gl, id) {
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
      // console.log("            Creating fragment shader");
      shader = gl.createShader(gl.FRAGMENT_SHADER);
    } else if (shaderScript.type == 'x-shader/x-vertex') {
      // console.log("            Creating vertex shader");
      shader = gl.createShader(gl.VERTEX_SHADER);
    } else {
      return 0;
    }

    gl.shaderSource(shader, str);
    gl.compileShader(shader);

    if (gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      // console.log("            Shader Program compile success");
      return shader;
    } else {
      console.log("            Shader Program compile failed:" + gl.getShaderInfoLog(shader));
      return 0;
    }
  } else {
    console.log("            Shader Program creation failed");
    return 0;
  }
}

function initShaders(gl, fragment, vertex) {
  // console.log("      Initialize Shader");
  // console.log("        Fragment Shader:" + fragment);
  // console.log("        Vertex Shader:" + vertex);
  var fragmentShader = this.getShader(gl, fragment);
  var vertexShader = this.getShader(gl, vertex);

  if (0 == fragmentShader || 0 == vertexShader) {
    console.log("        Failed to Load shader");
    return 0;
  } else {
    var shaderProgram = gl.createProgram(); // console.log("        Creating Shader fragment");

    gl.attachShader(shaderProgram, vertexShader);
    gl.attachShader(shaderProgram, fragmentShader);
    gl.linkProgram(shaderProgram);

    if (gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
      // console.log("          Returning Shader fragment successfully");
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
      } // for 2d sprite test


      if (null !== gl.getUniformLocation(shaderProgram, 'layer')) {
        shaderProgram.layerLocation = gl.getUniformLocation(shaderProgram, 'layer');
      } // Test


      if (null !== gl.getUniformLocation(shaderProgram, 'numberOfsamplers')) {
        shaderProgram.numberOfsamplers = gl.getUniformLocation(shaderProgram, 'numberOfsamplers');
      } // Test


      if (null !== gl.getUniformLocation(shaderProgram, 'TimeFor')) {
        shaderProgram.uniformTime = gl.getUniformLocation(shaderProgram, 'TimeFor');
      } // multi samplers for textutes


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
        shaderProgram.samplerUniform3 = gl.getUniformLocation(shaderProgram, 'uSampler4');
      }

      if (null !== gl.getUniformLocation(shaderProgram, 'uSampler5')) {
        shaderProgram.samplerUniform3 = gl.getUniformLocation(shaderProgram, 'uSampler5');
      }

      if (null !== gl.getUniformLocation(shaderProgram, 'uSampler6')) {
        shaderProgram.samplerUniform3 = gl.getUniformLocation(shaderProgram, 'uSampler6');
      }

      if (null !== gl.getUniformLocation(shaderProgram, 'uSampler7')) {
        shaderProgram.samplerUniform3 = gl.getUniformLocation(shaderProgram, 'uSampler7');
      }

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
      } // Local SpotLight


      if (null !== gl.getUniformLocation(shaderProgram, "u_shininess")) {
        shaderProgram.shininessLocation = gl.getUniformLocation(shaderProgram, 'u_shininess');
      }

      if (null !== gl.getUniformLocation(shaderProgram, "u_lightDirection")) {
        shaderProgram.lightDirectionLocation = gl.getUniformLocation(shaderProgram, 'u_lightDirection');
      }

      if (null !== gl.getUniformLocation(shaderProgram, "u_innerLimit")) {
        shaderProgram.innerLimitLocation = gl.getUniformLocation(shaderProgram, 'u_innerLimit');
      }

      if (null !== gl.getUniformLocation(shaderProgram, "u_outerLimit")) {
        shaderProgram.outerLimitLocation = gl.getUniformLocation(shaderProgram, 'u_outerLimit');
      }

      if (null !== gl.getUniformLocation(shaderProgram, "u_lightWorldPosition")) {
        shaderProgram.lightWorldPositionLocation = gl.getUniformLocation(shaderProgram, 'u_lightWorldPosition');
      }

      shaderProgram.pMatrixUniform = gl.getUniformLocation(shaderProgram, 'uPMatrix');
      shaderProgram.mvMatrixUniform = gl.getUniformLocation(shaderProgram, 'uMVMatrix');
      /* For destroying properly            */

      shaderProgram.fragmentShader = fragmentShader;
      shaderProgram.vertexShader = vertexShader;
      return shaderProgram;
    } else {
      console.warn("          Returning Shader fragment failed");
      return 0;
    }
  }
} // END OF SHADERS DYNAMIC
// MATRIX OPETARION


_manifest.default.operation.PUSH_MATRIX = function (mvMatrix, mvMatrixStack) {
  var copy = mat4.create();
  mat4.copy(mvMatrix, copy);
  mvMatrixStack.push(copy);
};

_manifest.default.operation.POP_MATRIX = function (mvMatrix, mvMatrixStack) {
  if (mvMatrixStack.length == 0) {
    throw 'Invalid popMatrix!';
  }

  mvMatrix = mvMatrixStack.pop();
};

_manifest.default.operation.SET_MATRIX_UNIFORMS = function (object, pMatrix) {
  this.GL.gl.uniformMatrix4fv(object.shaderProgram.pMatrixUniform, false, pMatrix);
  this.GL.gl.uniformMatrix4fv(object.shaderProgram.mvMatrixUniform, false, object.mvMatrix);
}; // REGENERATORs SHADER


var RegenerateShader = function (id_elem, numOfSamplerInUse, mixOperand, spotLight) {
  var e = document.getElementById(id_elem);

  if (mixOperand == 'multiply') {
    mixOperand = 0;
  } else if (mixOperand == 'divide') {
    mixOperand = 1;
  }

  if (typeof spotLight !== 'undefined') {
    e.innerHTML = (0, _matrixShaders.generateShaderSrc)(numOfSamplerInUse, mixOperand, spotLight);
  } else {
    e.innerHTML = (0, _matrixShaders.generateShaderSrc)(numOfSamplerInUse, mixOperand);
  }
}; // Not active


exports.RegenerateShader = RegenerateShader;

var RegenerateShaderSimpleDirectionLight = function (id_elem) {
  var e = document.getElementById(id_elem);
  e.innerHTML = (0, _matrixShaders.generateShaderSimpleDirection)();
}; // Not active


exports.RegenerateShaderSimpleDirectionLight = RegenerateShaderSimpleDirectionLight;

var RegenerateVShaderSimpleDirectionLight = function (id_elem) {
  var e = document.getElementById(id_elem);
  e.innerHTML = (0, _matrixShaders.generateVShaderSimpleDirectionLight)();
};

exports.RegenerateVShaderSimpleDirectionLight = RegenerateVShaderSimpleDirectionLight;

var RegenerateCustomShader = function (id_elem, numOfSamplerInUse, mixOperand, code_) {
  var e = document.getElementById(id_elem);

  if (mixOperand == 'multiply') {
    mixOperand = 0;
  } else if (mixOperand == 'divide') {
    mixOperand = 1;
  }

  e.innerHTML = (0, _matrixShaders.generateCustomShaderSrc)(numOfSamplerInUse, mixOperand, code_);
};

exports.RegenerateCustomShader = RegenerateCustomShader;

var webcamError = function (e) {
  alert('Webcam error!' + e);
};

exports.webcamError = webcamError;

function SET_STREAM(video) {
  if (navigator.getUserMedia) {
    navigator.getUserMedia({
      audio: true,
      video: true
    }, function (stream) {
      try {
        video.srcObject = stream;
      } catch (error) {
        video.src = window.URL.createObjectURL(stream);
      }
    }, webcamError);
  } else if (navigator.webkitGetUserMedia) {
    navigator.webkitGetUserMedia({
      audio: true,
      video: true
    }, function (stream) {
      try {
        video.srcObject = stream;
      } catch (error) {
        video.src = window.URL.createObjectURL(stream);
      }
    }, webcamError);
  } else {
    alert('webcam broken.');
  }
}

function ACCESS_CAMERA(htmlElement) {
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
  ROOT.texture = _manifest.default.tools.loadVideoTexture('glVideoTexture', ROOT.videoImage);

  ROOT.UPDATE = function () {
    if (ROOT.video.readyState === ROOT.video.HAVE_ENOUGH_DATA) {
      ROOT.videoImageContext.drawImage(ROOT.video, 0, 0, ROOT.videoImage.width, ROOT.videoImage.height);
      ROOT.videoImageContext.font = '30px Georgia';
      ROOT.videoImageContext.fillStyle = 'black';
      ROOT.videoImageContext.fillText(' Visual-JS game engine -webGL 2 part', 0, 85);
      ROOT.videoImageContext.fillText('Video texture example ', 20, 50);
    }
  }; // console.log("Video 3d canvas texture created.");


  _manifest.default.updateBeforeDraw.push(ROOT); // Dispose for this needed!

}

function VIDEO_TEXTURE(path_) {
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
    ROOT.texture = _manifest.default.tools.loadVideoTexture('glVideoTexture', ROOT.videoImage);

    _manifest.default.updateBeforeDraw.push(ROOT); // console.info("Video 2dcanvas texture created.");

  };

  ROOT.video.addEventListener('loadeddata', ROOT.video.READY, false);
  ROOT.video.src = 'res/videos/' + path_;

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

function Vjs3(path_, nameOfCanvas) {
  var ROOT = this;
  ROOT.iframe = document.createElement('object');
  ROOT.iframe.id = nameOfCanvas;
  ROOT.iframe.setAttribute('style', 'width:512px;height:512px'); // ROOT.iframe.setAttribute('width', '512');
  // ROOT.iframe.setAttribute('height', '512');

  var DIV_CONTENT_STREAMS = document.getElementById('HOLDER_STREAMS');
  ROOT.iframe.data = path_;
  DIV_CONTENT_STREAMS.appendChild(ROOT.iframe);

  document.getElementById(ROOT.iframe.id).onload = function (event) {
    ROOT.videoImage = ROOT.iframe.contentDocument.getElementById(nameOfCanvas);
    ROOT.canvasTexture = ROOT.videoImage.getContext('2d');

    _manifest.default.scene.outsideBox.streamTextures.iframe.contentWindow.runTextureEditor(nameOfCanvas);

    (0, _utility.E)('HOLDER_STREAMS').style.display = 'block';
    ROOT.texture = _manifest.default.tools.loadVideoTexture('glVideoTexture', ROOT.videoImage);
  };

  ROOT.showTextureEditor = function () {
    var T = (0, _utility.E)('HOLDER_STREAMS').style;
    T.display = 'block';
    T.left = '0';
  };
}

function anyCanvas(path_, nameOfCanvas) {
  var ROOT = this;
  ROOT.iframe = document.createElement('object');
  ROOT.iframe.id = 'canvas2dTextureSurface' + document.getElementsByTagName('object').length; // ROOT.iframe.setAttribute('style', 'width:512px;height:512px');

  ROOT.iframe.setAttribute('width', '512');
  ROOT.iframe.setAttribute('height', '512');
  var DIV_CONTENT_STREAMS = document.getElementById('HOLDER_STREAMS');
  DIV_CONTENT_STREAMS.appendChild(ROOT.iframe);

  document.getElementById(ROOT.iframe.id).onload = event => {
    ROOT.videoImage = ROOT.iframe.contentDocument.getElementById(nameOfCanvas);

    if (typeof ROOT.iframe.contentWindow.runTextureEditor !== 'undefined') {
      _manifest.default.scene.outsideBox.streamTextures.iframe.contentWindow.runTextureEditor(nameOfCanvas);
    }

    ROOT.canvasTexture = ROOT.videoImage.getContext('2d'); // App.scene.outsideBox.streamTextures.iframe.contentWindow.runTextureEditor(nameOfCanvas);

    (0, _utility.E)('HOLDER_STREAMS').style.display = 'block';
    ROOT.texture = _manifest.default.tools.loadVideoTexture('glVideoTexture', ROOT.videoImage);
  };

  ROOT.showTextureEditor = function () {
    var T = (0, _utility.E)('HOLDER_STREAMS').style;
    T.display = 'block';
    T.left = '0';
  };

  ROOT.iframe.data = path_;
}

},{"../program/manifest":25,"./events":5,"./matrix-render":12,"./matrix-shaders":13,"./matrix-world":17,"./utility":20,"./webgl-utils":21}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EVENTS = EVENTS;
exports.defineKeyBoardObject = defineKeyBoardObject;
exports.keyboardPress = exports.camera = exports.SYS = void 0;

var _manifest = _interopRequireDefault(require("../program/manifest"));

var _matrixWorld = require("./matrix-world");

var _utility = require("./utility");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable no-unused-vars */

/* globals LOG App NOMOBILE keyboardPress printLog degToRad mat4 */
var SYS = {}; // export var keyboardPress = {};

exports.SYS = SYS;
SYS.MOUSE = {
  x: 0,
  y: 0,
  LAST_POSITION: {
    x: 0,
    y: 0
  },
  PRESS: false,
  BUTTON_PRESSED: '',
  ON_LEFT_BTN_PRESSED: function () {},
  ON_RIGHT_BTN_PRESSED: function () {},
  ON_MID_BTN_PRESSED: function () {},
  MOUSE_MOVING: false
};
SYS.DEBUG = new _utility.LOG();

function EVENTS(canvas) {
  var ROOT_EVENTS = this; //Mobile device

  if (NOMOBILE == 0) {
    canvas.addEventListener('touchstart', function (e) {
      e.preventDefault();
      var touchList = e.changedTouches;
      SYS.MOUSE.PRESS = true;
      SYS.MOUSE.x = touchList[0].pageX;
      SYS.MOUSE.y = touchList[0].pageY;
      ROOT_EVENTS.CALCULATE_TOUCH_OR_CLICK();
    }, {
      passive: false
    });
    canvas.addEventListener('touchend', function (e) {
      e.preventDefault();
      var touchList = e.changedTouches;
      SYS.MOUSE.PRESS = false;
      SYS.MOUSE.x = touchList[0].pageX;
      SYS.MOUSE.y = touchList[0].pageY;
      ROOT_EVENTS.CALCULATE_TOUCH_UP_OR_MOUSE_UP();
    }, {
      passive: false
    });
    canvas.addEventListener('touchcancel', function (e) {
      e.preventDefault();
      var touchList = e.changedTouches;
      SYS.MOUSE.PRESS = false;
      SYS.MOUSE.x = touchList[0].pageX;
      SYS.MOUSE.y = touchList[0].pageY;
      ROOT_EVENTS.CALCULATE_TOUCH_UP_OR_MOUSE_UP();
    }, {
      passive: false
    });
    canvas.addEventListener('touchmove', function (e) {
      e.preventDefault();
      var touchList = e.changedTouches; //SYS.MOUSE.MOUSE_MOVING = true;
      //SYS.MOUSE.PRESS = true;

      SYS.MOUSE.x = touchList[0].pageX;
      SYS.MOUSE.y = touchList[0].pageY;
      ROOT_EVENTS.CALCULATE_TOUCH_MOVE_OR_MOUSE_MOVE();
    }, {
      passive: false
    });
  } else {
    //Desktop device
    canvas.addEventListener('click', function (e) {
      //SYS.MOUSE.PRESS = true;
      SYS.MOUSE.x = e.layerX;
      SYS.MOUSE.y = e.layerY;
      ROOT_EVENTS.CALCULATE_TOUCH_OR_CLICK();
      SYS.DEBUG.LOG('SYS : CLICK EVENT ' + canvas);
    }, {
      passive: true
    });
    canvas.addEventListener('mouseup', function (e) {
      SYS.MOUSE.PRESS = false;
      SYS.MOUSE.BUTTON_PRESSED = null;
      SYS.MOUSE.x = e.layerX;
      SYS.MOUSE.y = e.layerY;
      ROOT_EVENTS.CALCULATE_TOUCH_UP_OR_MOUSE_UP();
    }, {
      passive: true
    });

    canvas.onmousemove = function (e) {
      SYS.MOUSE.MOUSE_MOVING = true;
      SYS.MOUSE.x = e.layerX;
      SYS.MOUSE.y = e.layerY;
      ROOT_EVENTS.CALCULATE_TOUCH_MOVE_OR_MOUSE_MOVE(e);
    };

    canvas.onmousedown = function (e) {
      SYS.MOUSE.PRESS = true;

      if (e.which == 3) {
        SYS.MOUSE.BUTTON_PRESSED = 'RIGHT';
        SYS.MOUSE.ON_RIGHT_BTN_PRESSED();
        SYS.DEBUG.LOG('Right button clicked');
      } else if (e.which == 2) {
        SYS.MOUSE.BUTTON_PRESSED = 'MID';
        SYS.MOUSE.ON_MID_BTN_PRESSED();
        SYS.DEBUG.LOG('Mid button clicked');
      } else if (e.which == 1) {
        SYS.MOUSE.BUTTON_PRESSED = 'LEFT';
        SYS.MOUSE.ON_LEFT_BTN_PRESSED();
        SYS.DEBUG.LOG('Left button clicked');
      }

      SYS.MOUSE.x = e.layerX;
      SYS.MOUSE.y = e.layerY;
      ROOT_EVENTS.CALCULATE_TOUCH_DOWN_OR_MOUSE_DOWN();
    }; //console.log("This is PC desktop device.");

  }

  window.addEventListener('resize', function (e) {
    if (_manifest.default.resize.canvas == "full-screen") {
      //canvas.width =  window.innerHeight * App.resize.aspectRatio;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      SYS.DEBUG.LOG('SYS: fullscreen diametric resize is active. ' + _matrixWorld.world);
    } else {
      canvas.width = window.innerHeight * _manifest.default.resize.aspectRatio;
      canvas.height = window.innerHeight;
      SYS.DEBUG.LOG('SYS: aspect ration resize is active. ' + _matrixWorld.world);
    }

    if (_manifest.default.resize.reloadWorldOnResize == true && window.resizeGlPort !== 'undefined') {
      window.resizeGlPort();
    }
  }, {
    passive: true
  }); //Calculate touch or click event

  this.CALCULATE_TOUCH_OR_CLICK = function () {
    SYS.DEBUG.LOG(' EVENT : MOUSE/TOUCH CLICK ');
  };

  this.virtualUpDownScene = 0;
  this.virtualLeftRightScene = 0; // CALCULATE MOUSE MOVE OR TOUCH MOVE

  this.CALCULATE_TOUCH_MOVE_OR_MOUSE_MOVE = function (e) {
    var center_x = window.innerWidth / 2;
    var center_y = window.innerHeight / 2;
    SYS.MOUSE.x = e.layerX - center_x;
    SYS.MOUSE.y = e.layerY - center_y; //check to make sure there is data to compare against

    if (typeof SYS.MOUSE.LAST_POSITION.x != 'undefined') {
      //get the change from last position to this position
      var deltaX = SYS.MOUSE.LAST_POSITION.x - SYS.MOUSE.x,
          deltaY = SYS.MOUSE.LAST_POSITION.y - SYS.MOUSE.y;
    }

    if (_manifest.default.camera.SceneController === true && keyboardPress.getKeyStatus(16) || _manifest.default.camera.FirstPersonController === true) {
      console.log('works for both now');
      camera.pitchRate += deltaY * 10;
      camera.yawRate += deltaX * 1;

      if (SYS.MOUSE.x < _manifest.default.camera.edgeMarginValue - center_x) {
        _manifest.default.camera.leftEdge = true; //SYS.DEBUG.LOG(" mouse on edge ! ");
      } else {
        _manifest.default.camera.leftEdge = false;
      }

      if (SYS.MOUSE.x > center_x - _manifest.default.camera.edgeMarginValue) {
        _manifest.default.camera.rightEdge = true; //SYS.DEBUG.LOG(" mouse on edge ! ");
      } else {
        _manifest.default.camera.rightEdge = false;
      }
    }

    if (_manifest.default.camera.SceneController === true && SYS.MOUSE.BUTTON_PRESSED == 'MID') {
      if (Math.abs(deltaX) > Math.abs(deltaY) && deltaX > 0) {
        //left
        if (SYS.MOUSE.LAST_POSITION.x < SYS.MOUSE.x) {
          this.virtualLeftRightScene -= _manifest.default.camera.sceneControllerDragAmp;
        } else if (SYS.MOUSE.LAST_POSITION.x > SYS.MOUSE.x) {
          this.virtualLeftRightScene += _manifest.default.camera.sceneControllerDragAmp;
        }
      } else if (Math.abs(deltaX) > Math.abs(deltaY) && deltaX < 0) {
        //right
        if (SYS.MOUSE.LAST_POSITION.x < SYS.MOUSE.x) {
          this.virtualLeftRightScene -= _manifest.default.camera.sceneControllerDragAmp;
        } else if (SYS.MOUSE.LAST_POSITION.x > SYS.MOUSE.x) {
          this.virtualLeftRightScene += _manifest.default.camera.sceneControllerDragAmp;
        }
      } else if (Math.abs(deltaY) > Math.abs(deltaX) && deltaY > 0) {
        //up
        if (SYS.MOUSE.LAST_POSITION.y < SYS.MOUSE.y) {
          this.virtualUpDownScene += _manifest.default.camera.sceneControllerDragAmp;
        } else if (SYS.MOUSE.LAST_POSITION.y > SYS.MOUSE.y) {
          this.virtualUpDownScene -= _manifest.default.camera.sceneControllerDragAmp;
        }
      } else if (Math.abs(deltaY) > Math.abs(deltaX) && deltaY < 0) {
        //down
        if (SYS.MOUSE.LAST_POSITION.y < SYS.MOUSE.y) {
          this.virtualUpDownScene += _manifest.default.camera.sceneControllerDragAmp;
        } else if (SYS.MOUSE.LAST_POSITION.y > SYS.MOUSE.y) {
          this.virtualUpDownScene -= _manifest.default.camera.sceneControllerDragAmp;
        }
      }

      camera.yPos = this.virtualUpDownScene;
      camera.xPos = this.virtualLeftRightScene;
    } // Set the new last position to the current for next time.


    SYS.MOUSE.LAST_POSITION.x = SYS.MOUSE.x, SYS.MOUSE.LAST_POSITION.y = SYS.MOUSE.y; //SYS.DEBUG.LOG(" EVENT : MOUSE/TOUCH MOVE ");
  }; // CALCULATE_TOUCH_UP_OR_MOUSE_UP


  this.CALCULATE_TOUCH_UP_OR_MOUSE_UP = function () {// SYS.DEBUG.LOG(' EVENT : MOUSE/TOUCH UP ');
  };

  this.CALCULATE_TOUCH_DOWN_OR_MOUSE_DOWN = function () {// SYS.DEBUG.LOG(' EVENT : MOUSE/TOUCH DOWN ');
  };
}

function defineKeyBoardObject() {
  var globKeyPressObj = new Object();
  /* Constructor for the global mouse location     */

  globKeyPressObj.keyArr = new Array();

  document.onkeydown = function (e) {
    globKeyPressObj.handleKeyDown(e);
  };

  document.onkeyup = function (e) {
    globKeyPressObj.handleKeyUp(e);
  };
  /* Getter for a key status                       */


  globKeyPressObj.getKeyStatus = function (keyCode) {
    return this.keyArr[keyCode];
  };
  /* Setter for a key status                       */


  globKeyPressObj.setKeyStatus = function (keyCode, status) {
    this.keyArr[keyCode] = status;
  };
  /* Key Down and Up handlers                      */


  globKeyPressObj.handleKeyDown = function (evt) {
    evt = evt ? evt : window.event ? window.event : '';
    console.log("'LOG KEY CODE ", evt.keyCode);
    this.setKeyStatus(evt.keyCode, true);
  };

  globKeyPressObj.handleKeyUp = function (evt) {
    evt = evt ? evt : window.event ? window.event : '';
    this.setKeyStatus(evt.keyCode, false);
  };
  /* Destructor                                    */


  globKeyPressObj.destroy = function () {
    printLog('Destroy Key Press object');
    document.onkeydown = null;
    document.onkeyup = null;
    delete this.keyArr;
    delete this;
  };

  return globKeyPressObj;
}

let wheelBLock = false;

window.onwheel = evt => {
  let scale = evt.deltaY * -0.01; // console.log(evt)
  // console.log(evt.wheelDelta)
  // console.log(evt.wheelDeltaX)
  // console.log(evt.wheelDeltaY)
  // console.log(evt.which)

  if (wheelBLock === false) {
    wheelBLock = true;
    if (evt.wheelDelta > 0) camera.speed = _manifest.default.camera.speedAmp * 0.1;
    if (evt.wheelDelta < 0) camera.speed = -_manifest.default.camera.speedAmp * 0.1;
    setTimeout(() => {
      wheelBLock = false;
      camera.speed = 0;
    }, 50);
  }
};

var camera = {};
/* Set defaults                                  */

exports.camera = camera;
camera.roll = 0;
camera.rollRate = 0;
camera.rallAmp = 0.05;
camera.pitch = 0;
camera.pitchRate = 0;
camera.yaw = 0;
camera.yawRate = 0;
camera.xPos = 0;
camera.yPos = 0;
camera.zPos = 0;
camera.speed = 0;
camera.yawAmp = 0.05;
camera.pitchAmp = 0.007; // eslint-disable-next-line no-global-assign

var keyboardPress = defineKeyBoardObject();
exports.keyboardPress = keyboardPress;

camera.setCamera = function (object) {
  /* Left Key  or A                            */
  if (keyboardPress.getKeyStatus(37) || keyboardPress.getKeyStatus(65) || _manifest.default.camera.leftEdge == true) {
    camera.yawRate = 20;
    if (_manifest.default.camera.leftEdge == true) camera.yawRate = 10;
  } else if (
  /* Right Key or D                            */
  keyboardPress.getKeyStatus(39) || keyboardPress.getKeyStatus(68) || _manifest.default.camera.rightEdge == true) {
    camera.yawRate = -20;
    if (_manifest.default.camera.rightEdge == true) camera.yawRate = -10;
  } else {// camera.yawRate = 0;
  }
  /* Up Key    or W                            */


  if (keyboardPress.getKeyStatus(38) || keyboardPress.getKeyStatus(87)) {
    camera.speed = _manifest.default.camera.speedAmp;
  } else if (keyboardPress.getKeyStatus(40) || keyboardPress.getKeyStatus(83)) {
    /* Down Key  or S                            */
    camera.speed = -_manifest.default.camera.speedAmp;
  } else {
    camera.speed = 0;
  }
  /*
  // PAGE UP
  if (keyboardPress.getKeyStatus(33)) {
    camera.pitchRate = 100;
  }
  // Page Down
  else if (keyboardPress.getKeyStatus(34)) {
    camera.pitchRate = -100;
  } else {
    camera.pitchRate = 0;
  } */

  /* Calculate yaw, pitch and roll(x,y,z) */


  if (camera.speed != 0) {
    camera.xPos -= Math.sin(degToRad(camera.yaw)) * camera.speed;
    camera.yPos = 0;
    camera.zPos -= Math.cos(degToRad(camera.yaw)) * camera.speed;
  }

  camera.yaw += camera.yawRate * camera.yawAmp;
  camera.pitch += camera.pitchRate * camera.pitchAmp;
  mat4.rotate(object.mvMatrix, object.mvMatrix, degToRad(-camera.pitch), [1, 0, 0]);
  mat4.rotate(object.mvMatrix, object.mvMatrix, degToRad(-camera.yaw), [0, 1, 0]); // mat4.translate(object.mvMatrix, object.mvMatrix, [camera.yaw, -camera.pitch, 0]);

  mat4.translate(object.mvMatrix, object.mvMatrix, [-camera.xPos, -camera.yPos, -camera.zPos]);
  camera.yawRate = 0;
  camera.pitchRate = 0;
};

camera.setSceneCamera = function (object) {
  /* Left Key  or A                            */
  if (keyboardPress.getKeyStatus(37) || keyboardPress.getKeyStatus(65) || _manifest.default.camera.leftEdge == true) {
    camera.yawRate = _manifest.default.camera.sceneControllerWASDKeysAmp;
    if (_manifest.default.camera.leftEdge == true) camera.yawRate = _manifest.default.camera.sceneControllerEdgeCameraYawRate;
  } else if (
  /* Right Key or D                            */
  keyboardPress.getKeyStatus(39) || keyboardPress.getKeyStatus(68) || _manifest.default.camera.rightEdge == true) {
    camera.yawRate = -_manifest.default.camera.sceneControllerWASDKeysAmp;
    if (_manifest.default.camera.rightEdge == true) camera.yawRate = -_manifest.default.camera.sceneControllerEdgeCameraYawRate;
  } else {// camera.yawRate = 0;
  }
  /* Up Key    or W                            */


  if (keyboardPress.getKeyStatus(38) || keyboardPress.getKeyStatus(87)) {
    camera.speed = _manifest.default.camera.speedAmp;
  } else if (keyboardPress.getKeyStatus(40) || keyboardPress.getKeyStatus(83)) {
    /* Down Key  or S                            */
    camera.speed = -_manifest.default.camera.speedAmp;
  } else {
    // diff
    if (!keyboardPress.getKeyStatus(16)) camera.speed = 0;
  }
  /* Calculate yaw, pitch and roll(x,y,z) */


  if (camera.speed != 0) {
    camera.xPos -= Math.sin(degToRad(camera.yaw)) * camera.speed; // ?

    camera.yPos += Math.sin(degToRad(camera.pitch)) * camera.speed;
    camera.zPos -= Math.cos(degToRad(camera.yaw)) * camera.speed;
  }

  camera.yaw += camera.yawRate * camera.yawAmp;
  camera.pitch += camera.pitchRate * camera.pitchAmp;
  mat4.rotate(object.mvMatrix, object.mvMatrix, degToRad(-camera.pitch), [1, 0, 0]);
  mat4.rotate(object.mvMatrix, object.mvMatrix, degToRad(-camera.yaw), [0, 1, 0]);
  mat4.translate(object.mvMatrix, object.mvMatrix, [-camera.xPos, -camera.yPos, -camera.zPos]);
  camera.yawRate = 0;
  camera.pitchRate = 0;
};

let addBtn = document.querySelector('.button1');
let regularBtn = document.querySelector('.button2');
regularBtn.addEventListener('click', () => {
  addBtn.style.display = 'none';
  regularBtn.style.display = 'none';
}); // Track web app install by user

document.addEventListener('appinstalled', event => {
  console.log('PWA app installed by user!!! Hurray');
});

if (_manifest.default.pwa.addToHomePage === true) {
  /**
   * @description
   * If we dont reach this scope then we have installed pwa.
   */
  let deferredPrompt;
  window.addEventListener('beforeinstallprompt', e => {
    // Prevent Chrome 67 and earlier from automatically showing the prompt
    e.preventDefault(); // Stash the event so it can be triggered later.

    deferredPrompt = e;
    addBtn.style.display = 'block';
    regularBtn.style.display = 'block';
    addBtn.addEventListener('click', () => {
      // hide our user interface that shows our A2HS button
      addBtn.style.display = 'none'; // Show the prompt

      deferredPrompt.prompt(); // Wait for the user to respond to the prompt

      deferredPrompt.userChoice.then(choiceResult => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted the A2HS prompt');
          addBtn.style.display = 'none';
          regularBtn.style.display = 'none';
        } else {
          console.log('User dismissed the A2HS prompt');
          addBtn.style.display = 'none';
        }

        deferredPrompt = null;
      });
    });
  });
} else {
  try {
    addBtn.style.display = 'none';
    regularBtn.style.display = 'none';
  } catch (err) {}
}

},{"../program/manifest":25,"./matrix-world":17,"./utility":20}],6:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deleteMeshBuffers = exports.initMeshBuffers = exports.downloadMeshes = exports.constructMesh = void 0;

var _matrixWorld = require("./matrix-world");

/**
 * The main Mesh class. The constructor will parse through the OBJ file data
 * and collect the vertex, vertex normal, texture, and face information. This
 * information can then be used later on when creating your VBOs. See
 * OBJ.initMeshBuffers for an example of how to use the newly created Mesh
 *
 * @class Mesh
 * @constructor
 *
 * @param {String} objectData a string representation of an OBJ file with newlines preserved.
 */
class constructMesh {
  constructor(objectData, inputArg) {
    this.inputArg = inputArg;
    this.objectData = objectData;
    this.create(objectData, inputArg);

    this.setScale = s => {
      this.inputArg.scale = s;
      initMeshBuffers(_matrixWorld.world.GL.gl, this.create(this.objectData, inputArg));
    };
  }

  create = (objectData, inputArg, callback) => {
    if (typeof callback === 'undefined') callback = function () {};
    let initOrientation = [0, 1, 2];
    /*
      The OBJ file format does a sort of compression when saving a model in a
      program like Blender. There are at least 3 sections (4 including textures)
      within the file. Each line in a section begins with the same string:
        * 'v': indicates vertex section
        * 'vn': indicates vertex normal section
        * 'f': indicates the faces section
        * 'vt': indicates vertex texture section (if textures were used on the model)
      Each of the above sections (except for the faces section) is a list/set of
      unique vertices.
      Each line of the faces section contains a list of
      (vertex, [texture], normal) groups
      Some examples:
          // the texture index is optional, both formats are possible for models
          // without a texture applied
          f 1/25 18/46 12/31
          f 1//25 18//46 12//31
          // A 3 vertex face with texture indices
          f 16/92/11 14/101/22 1/69/1
          // A 4 vertex face
          f 16/92/11 40/109/40 38/114/38 14/101/22
      The first two lines are examples of a 3 vertex face without a texture applied.
      The second is an example of a 3 vertex face with a texture applied.
      The third is an example of a 4 vertex face. Note: a face can contain N
      number of vertices.
      Each number that appears in one of the groups is a 1-based index
      corresponding to an item from the other sections (meaning that indexing
      starts at one and *not* zero).
      For example:
          `f 16/92/11` is saying to
            - take the 16th element from the [v] vertex array
            - take the 92nd element from the [vt] texture array
            - take the 11th element from the [vn] normal array
          and together they make a unique vertex.
      Using all 3+ unique Vertices from the face line will produce a polygon.
      Now, you could just go through the OBJ file and create a new vertex for
      each face line and WebGL will draw what appears to be the same model.
      However, vertices will be overlapped and duplicated all over the place.
      Consider a cube in 3D space centered about the origin and each side is
      2 units long. The front face (with the positive Z-axis pointing towards
      you) would have a Top Right vertex (looking orthogonal to its normal)
      mapped at (1,1,1) The right face would have a Top Left vertex (looking
      orthogonal to its normal) at (1,1,1) and the top face would have a Bottom
      Right vertex (looking orthogonal to its normal) at (1,1,1). Each face
      has a vertex at the same coordinates, however, three distinct vertices
      will be drawn at the same spot.
      To solve the issue of duplicate Vertices (the `(vertex, [texture], normal)`
      groups), while iterating through the face lines, when a group is encountered
      the whole group string ('16/92/11') is checked to see if it exists in the
      packed.hashindices object, and if it doesn't, the indices it specifies
      are used to look up each attribute in the corresponding attribute arrays
      already created. The values are then copied to the corresponding unpacked
      array (flattened to play nice with WebGL's ELEMENT_ARRAY_BUFFER indexing),
      the group string is added to the hashindices set and the current unpacked
      index is used as this hashindices value so that the group of elements can
      be reused. The unpacked index is incremented. If the group string already
      exists in the hashindices object, its corresponding value is the index of
      that group and is appended to the unpacked indices array.
      */

    var verts = [],
        vertNormals = [],
        textures = [],
        unpacked = {}; // unpacking stuff

    unpacked.verts = [];
    unpacked.norms = [];
    unpacked.textures = [];
    unpacked.hashindices = {};
    unpacked.indices = [];
    unpacked.index = 0; // array of lines separated by the newline

    var lines = objectData.split('\n'); // update swap orientation

    if (inputArg.swap[0] !== null) {
      swap(inputArg.swap[0], inputArg.swap[1], initOrientation);
    }

    var VERTEX_RE = /^v\s/;
    var NORMAL_RE = /^vn\s/;
    var TEXTURE_RE = /^vt\s/;
    var FACE_RE = /^f\s/;
    var WHITESPACE_RE = /\s+/;

    for (var i = 0; i < lines.length; i++) {
      var line = lines[i].trim();
      var elements = line.split(WHITESPACE_RE);
      elements.shift();

      if (VERTEX_RE.test(line)) {
        // if this is a vertex
        verts.push.apply(verts, elements);
      } else if (NORMAL_RE.test(line)) {
        // if this is a vertex normal
        vertNormals.push.apply(vertNormals, elements);
      } else if (TEXTURE_RE.test(line)) {
        // if this is a texture
        textures.push.apply(textures, elements);
      } else if (FACE_RE.test(line)) {
        // if this is a face

        /*
          split this face into an array of vertex groups
          for example:
            f 16/92/11 14/101/22 1/69/1
          becomes:
            ['16/92/11', '14/101/22', '1/69/1'];
          */
        var quad = false;

        for (var j = 0, eleLen = elements.length; j < eleLen; j++) {
          // Triangulating quads
          // quad: 'f v0/t0/vn0 v1/t1/vn1 v2/t2/vn2 v3/t3/vn3/'
          // corresponding triangles:
          //      'f v0/t0/vn0 v1/t1/vn1 v2/t2/vn2'
          //      'f v2/t2/vn2 v3/t3/vn3 v0/t0/vn0'
          if (j === 3 && !quad) {
            // add v2/t2/vn2 in again before continuing to 3
            j = 2;
            quad = true;
          }

          if (elements[j] in unpacked.hashindices) {
            unpacked.indices.push(unpacked.hashindices[elements[j]]);
          } else {
            /*
                  Each element of the face line array is a vertex which has its
                  attributes delimited by a forward slash. This will separate
                  each attribute into another array:
                      '19/92/11'
                  becomes:
                      vertex = ['19', '92', '11'];
                  where
                      vertex[0] is the vertex index
                      vertex[1] is the texture index
                      vertex[2] is the normal index
                  Think of faces having Vertices which are comprised of the
                  attributes location (v), texture (vt), and normal (vn).
                  */
            var vertex = elements[j].split('/');
            /*
                  The verts, textures, and vertNormals arrays each contain a
                  flattend array of coordinates.
                  Because it gets confusing by referring to vertex and then
                  vertex (both are different in my descriptions) I will explain
                  what's going on using the vertexNormals array:
                  vertex[2] will contain the one-based index of the vertexNormals
                  section (vn). One is subtracted from this index number to play
                  nice with javascript's zero-based array indexing.
                  Because vertexNormal is a flattened array of x, y, z values,
                  simple pointer arithmetic is used to skip to the start of the
                  vertexNormal, then the offset is added to get the correct
                  component: +0 is x, +1 is y, +2 is z.
                  This same process is repeated for verts and textures.
                  */
            // vertex position

            unpacked.verts.push(+verts[(vertex[0] - 1) * 3 + initOrientation[0]] * inputArg.scale);
            unpacked.verts.push(+verts[(vertex[0] - 1) * 3 + initOrientation[1]] * inputArg.scale);
            unpacked.verts.push(+verts[(vertex[0] - 1) * 3 + initOrientation[2]] * inputArg.scale); // vertex textures

            if (textures.length) {
              unpacked.textures.push(+textures[(vertex[1] - 1) * 2 + 0]);
              unpacked.textures.push(+textures[(vertex[1] - 1) * 2 + 1]);
            } // vertex normals


            unpacked.norms.push(+vertNormals[(vertex[2] - 1) * 3 + 0]);
            unpacked.norms.push(+vertNormals[(vertex[2] - 1) * 3 + 1]);
            unpacked.norms.push(+vertNormals[(vertex[2] - 1) * 3 + 2]); // add the newly created vertex to the list of indices

            unpacked.hashindices[elements[j]] = unpacked.index;
            unpacked.indices.push(unpacked.index); // increment the counter

            unpacked.index += 1;
          }

          if (j === 3 && quad) {
            // add v0/t0/vn0 onto the second triangle
            unpacked.indices.push(unpacked.hashindices[elements[0]]);
          }
        }
      }
    }

    this.vertices = unpacked.verts;
    this.vertexNormals = unpacked.norms;
    this.textures = unpacked.textures;
    this.indices = unpacked.indices;
    callback();
    return this;
  };
}

exports.constructMesh = constructMesh;

var Ajax = function () {
  // this is just a helper class to ease ajax calls
  var _this = this;

  this.xmlhttp = new XMLHttpRequest();

  this.get = function (url, callback) {
    _this.xmlhttp.onreadystatechange = function () {
      if (_this.xmlhttp.readyState === 4) {
        callback(_this.xmlhttp.responseText, _this.xmlhttp.status);
      }
    };

    _this.xmlhttp.open('GET', url, true);

    _this.xmlhttp.send();
  };
};
/**
 * Takes in an object of `mesh_name`, `'/url/to/OBJ/file'` pairs and a callback
 * function. Each OBJ file will be ajaxed in and automatically converted to
 * an OBJ.Mesh. When all files have successfully downloaded the callback
 * function provided will be called and passed in an object containing
 * the newly created meshes.
 *
 * **Note:** In order to use this function as a way to download meshes, a
 * webserver of some sort must be used.
 *
 * @param {Object} nameAndURLs an object where the key is the name of the mesh and the value is the url to that mesh's OBJ file
 *
 * @param {Function} completionCallback should contain a function that will take one parameter: an object array where the keys will be the unique object name and the value will be a Mesh object
 *
 * @param {Object} meshes In case other meshes are loaded separately or if a previously declared variable is desired to be used, pass in a (possibly empty) json object of the pattern: { '<mesh_name>': OBJ.Mesh }
 *
 */


var downloadMeshes = function (nameAndURLs, completionCallback, inputArg) {
  // the total number of meshes. this is used to implement "blocking"
  var semaphore = Object.keys(nameAndURLs).length; // if error is true, an alert will given

  var error = false; // this is used to check if all meshes have been downloaded
  // if meshes is supplied, then it will be populated, otherwise
  // a new object is created. this will be passed into the completionCallback

  if (typeof inputArg === 'undefined') {
    var inputArg = {
      scale: 1,
      swap: [null]
    };
  }

  if (typeof inputArg.scale === 'undefined') inputArg.scale = 1;
  if (typeof inputArg.swap === 'undefined') inputArg.swap = [null];
  var meshes = {}; // loop over the mesh_name,url key,value pairs

  for (var mesh_name in nameAndURLs) {
    if (nameAndURLs.hasOwnProperty(mesh_name)) {
      new Ajax().get(nameAndURLs[mesh_name], function (name) {
        return function (data, status) {
          if (status === 200) {
            meshes[name] = new constructMesh(data, inputArg);
          } else {
            error = true;
            console.error('An error has occurred and the mesh "' + name + '" could not be downloaded.');
          } // the request has finished, decrement the counter


          semaphore--;

          if (semaphore === 0) {
            if (error) {
              // if an error has occurred, the user is notified here and the
              // callback is not called
              console.error('An error has occurred and one or meshes has not been ' + 'downloaded. The execution of the script has terminated.');
              throw '';
            } // there haven't been any errors in retrieving the meshes
            // call the callback


            completionCallback(meshes);
          }
        };
      }(mesh_name));
    }
  }
};

exports.downloadMeshes = downloadMeshes;

var _buildBuffer = function (gl, type, data, itemSize) {
  var buffer = gl.createBuffer();
  var arrayView = type === gl.ARRAY_BUFFER ? Float32Array : Uint16Array;
  gl.bindBuffer(type, buffer);
  gl.bufferData(type, new arrayView(data), gl.STATIC_DRAW);
  buffer.itemSize = itemSize;
  buffer.numItems = data.length / itemSize;
  return buffer;
};
/**
 * Takes in the WebGL context and a Mesh, then creates and appends the buffers
 * to the mesh object as attributes.
 *
 * @param {WebGLRenderingContext} gl the `canvas.getContext('webgl')` context instance
 * @param {Mesh} mesh a single `OBJ.Mesh` instance
 *
 * The newly created mesh attributes are:
 *
 * Attrbute | Description
 * :--- | ---
 * **normalBuffer**       |contains the model&#39;s Vertex Normals
 * normalBuffer.itemSize  |set to 3 items
 * normalBuffer.numItems  |the total number of vertex normals
 * |
 * **textureBuffer**      |contains the model&#39;s Texture Coordinates
 * textureBuffer.itemSize |set to 2 items
 * textureBuffer.numItems |the number of texture coordinates
 * |
 * **vertexBuffer**       |contains the model&#39;s Vertex Position Coordinates (does not include w)
 * vertexBuffer.itemSize  |set to 3 items
 * vertexBuffer.numItems  |the total number of vertices
 * |
 * **indexBuffer**        |contains the indices of the faces
 * indexBuffer.itemSize   |is set to 1
 * indexBuffer.numItems   |the total number of indices
 *
 * A simple example (a lot of steps are missing, so don't copy and paste):
 *
 *     var gl   = canvas.getContext('webgl'),
 *         mesh = OBJ.Mesh(obj_file_data);
 *     // compile the shaders and create a shader program
 *     var shaderProgram = gl.createProgram();
 *     // compilation stuff here
 *     ...
 *     // make sure you have vertex, vertex normal, and texture coordinate
 *     // attributes located in your shaders and attach them to the shader program
 *     shaderProgram.vertexPositionAttribute = gl.getAttribLocation(shaderProgram, "aVertexPosition");
 *     gl.enableVertexAttribArray(shaderProgram.vertexPositionAttribute);
 *
 *     shaderProgram.vertexNormalAttribute = gl.getAttribLocation(shaderProgram, "aVertexNormal");
 *     gl.enableVertexAttribArray(shaderProgram.vertexNormalAttribute);
 *
 *     shaderProgram.textureCoordAttribute = gl.getAttribLocation(shaderProgram, "aTextureCoord");
 *     gl.enableVertexAttribArray(shaderProgram.textureCoordAttribute);
 *
 *     // create and initialize the vertex, vertex normal, and texture coordinate buffers
 *     // and save on to the mesh object
 *     OBJ.initMeshBuffers(gl, mesh);
 *
 *     // now to render the mesh
 *     gl.bindBuffer(gl.ARRAY_BUFFER, mesh.vertexBuffer);
 *     gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, mesh.vertexBuffer.itemSize, gl.FLOAT, false, 0, 0);
 *     // it's possible that the mesh doesn't contain
 *     // any texture coordinates (e.g. suzanne.obj in the development branch).
 *     // in this case, the texture vertexAttribArray will need to be disabled
 *     // before the call to drawElements
 *     if(!mesh.textures.length){
 *       gl.disableVertexAttribArray(shaderProgram.textureCoordAttribute);
 *     }
 *     else{
 *       // if the texture vertexAttribArray has been previously
 *       // disabled, then it needs to be re-enabled
 *       gl.enableVertexAttribArray(shaderProgram.textureCoordAttribute);
 *       gl.bindBuffer(gl.ARRAY_BUFFER, mesh.textureBuffer);
 *       gl.vertexAttribPointer(shaderProgram.textureCoordAttribute, mesh.textureBuffer.itemSize, gl.FLOAT, false, 0, 0);
 *     }
 *
 *     gl.bindBuffer(gl.ARRAY_BUFFER, mesh.normalBuffer);
 *     gl.vertexAttribPointer(shaderProgram.vertexNormalAttribute, mesh.normalBuffer.itemSize, gl.FLOAT, false, 0, 0);
 *
 *     gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, model.mesh.indexBuffer);
 *     gl.drawElements(gl.TRIANGLES, model.mesh.indexBuffer.numItems, gl.UNSIGNED_SHORT, 0);
 */


var initMeshBuffers = function (gl, mesh) {
  mesh.normalBuffer = _buildBuffer(gl, gl.ARRAY_BUFFER, mesh.vertexNormals, 3);
  mesh.textureBuffer = _buildBuffer(gl, gl.ARRAY_BUFFER, mesh.textures, 2);
  mesh.vertexBuffer = _buildBuffer(gl, gl.ARRAY_BUFFER, mesh.vertices, 3);
  mesh.indexBuffer = _buildBuffer(gl, gl.ELEMENT_ARRAY_BUFFER, mesh.indices, 1);
};

exports.initMeshBuffers = initMeshBuffers;

var deleteMeshBuffers = function (gl, mesh) {
  gl.deleteBuffer(mesh.normalBuffer);
  gl.deleteBuffer(mesh.textureBuffer);
  gl.deleteBuffer(mesh.vertexBuffer);
  gl.deleteBuffer(mesh.indexBuffer);
};

exports.deleteMeshBuffers = deleteMeshBuffers;

},{"./matrix-world":17}],7:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _manifest = _interopRequireDefault(require("../program/manifest"));

var _matrixWorld = require("./matrix-world");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_manifest.default.operation.cube_buffer_procedure = function (object) {
  /* Vertex */
  object.vertexPositionBuffer = _matrixWorld.world.GL.gl.createBuffer();

  _matrixWorld.world.GL.gl.bindBuffer(_matrixWorld.world.GL.gl.ARRAY_BUFFER, object.vertexPositionBuffer);

  _matrixWorld.world.GL.gl.bufferData(_matrixWorld.world.GL.gl.ARRAY_BUFFER, object.geometry.vertices, _matrixWorld.world.GL.gl.STATIC_DRAW);

  object.vertexPositionBuffer.itemSize = 3;
  object.vertexPositionBuffer.numItems = 24;
  /* Color */

  if (object.color && null !== object.shaderProgram.vertexColorAttribute) {
    object.vertexColorBuffer = _matrixWorld.world.GL.gl.createBuffer();

    _matrixWorld.world.GL.gl.bindBuffer(_matrixWorld.world.GL.gl.ARRAY_BUFFER, object.vertexColorBuffer);

    _matrixWorld.world.GL.gl.bufferData(_matrixWorld.world.GL.gl.ARRAY_BUFFER, object.geometry.color, _matrixWorld.world.GL.gl.STATIC_DRAW);

    object.vertexColorBuffer.itemSize = 4;
    object.vertexColorBuffer.numItems = 24;
  }
  /* Texture */


  if (object.texture) {
    object.vertexTexCoordBuffer = _matrixWorld.world.GL.gl.createBuffer();

    _matrixWorld.world.GL.gl.bindBuffer(_matrixWorld.world.GL.gl.ARRAY_BUFFER, object.vertexTexCoordBuffer);

    _matrixWorld.world.GL.gl.bufferData(_matrixWorld.world.GL.gl.ARRAY_BUFFER, object.geometry.texCoords, _matrixWorld.world.GL.gl.STATIC_DRAW);

    object.vertexTexCoordBuffer.itemSize = 2;
    object.vertexTexCoordBuffer.numItems = 24;
  }
  /* Normals */


  if (object.shaderProgram.useLightingUniform) {
    object.vertexNormalBuffer = _matrixWorld.world.GL.gl.createBuffer();

    _matrixWorld.world.GL.gl.bindBuffer(_matrixWorld.world.GL.gl.ARRAY_BUFFER, object.vertexNormalBuffer);

    _matrixWorld.world.GL.gl.bufferData(_matrixWorld.world.GL.gl.ARRAY_BUFFER, object.LightMap, _matrixWorld.world.GL.gl.STATIC_DRAW);

    object.vertexNormalBuffer.itemSize = 3;
    object.vertexNormalBuffer.numItems = 24;
  }
  /* Indices */


  object.vertexIndexBuffer = _matrixWorld.world.GL.gl.createBuffer();

  _matrixWorld.world.GL.gl.bindBuffer(_matrixWorld.world.GL.gl.ELEMENT_ARRAY_BUFFER, object.vertexIndexBuffer);

  _matrixWorld.world.GL.gl.bufferData(_matrixWorld.world.GL.gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(object.geometry.indices), _matrixWorld.world.GL.gl.STATIC_DRAW);

  object.vertexIndexBuffer.itemSize = 1;
  object.vertexIndexBuffer.numItems = 36;
};

_manifest.default.operation.piramide_buffer_procedure = function (object) {
  // Vertex
  // // console.log("        Buffer the " + object.type + "'s vertex");
  object.vertexPositionBuffer = _matrixWorld.world.GL.gl.createBuffer();

  _matrixWorld.world.GL.gl.bindBuffer(_matrixWorld.world.GL.gl.ARRAY_BUFFER, object.vertexPositionBuffer);

  _matrixWorld.world.GL.gl.bufferData(_matrixWorld.world.GL.gl.ARRAY_BUFFER, object.geometry.vertices, _matrixWorld.world.GL.gl.STATIC_DRAW);

  object.vertexPositionBuffer.itemSize = 3;
  object.vertexPositionBuffer.numItems = 18;
  /* Color                                         */
  //// console.log("        Buffer the " + object.type + "'s color");

  object.vertexColorBuffer = _matrixWorld.world.GL.gl.createBuffer();

  _matrixWorld.world.GL.gl.bindBuffer(_matrixWorld.world.GL.gl.ARRAY_BUFFER, object.vertexColorBuffer);

  _matrixWorld.world.GL.gl.bufferData(_matrixWorld.world.GL.gl.ARRAY_BUFFER, object.geometry.color, _matrixWorld.world.GL.gl.STATIC_DRAW);

  object.vertexColorBuffer.itemSize = 4;
  object.vertexColorBuffer.numItems = 18;
};

_manifest.default.operation.square_buffer_procedure = function (object) {
  /* Vertex */
  object.vertexPositionBuffer = _matrixWorld.world.GL.gl.createBuffer();

  _matrixWorld.world.GL.gl.bindBuffer(_matrixWorld.world.GL.gl.ARRAY_BUFFER, object.vertexPositionBuffer);

  _matrixWorld.world.GL.gl.bufferData(_matrixWorld.world.GL.gl.ARRAY_BUFFER, object.geometry.vertices, _matrixWorld.world.GL.gl.STATIC_DRAW);

  object.vertexPositionBuffer.itemSize = 3;
  object.vertexPositionBuffer.numItems = 4;
  /* Color */

  object.vertexColorBuffer = _matrixWorld.world.GL.gl.createBuffer();

  _matrixWorld.world.GL.gl.bindBuffer(_matrixWorld.world.GL.gl.ARRAY_BUFFER, object.vertexColorBuffer);

  _matrixWorld.world.GL.gl.bufferData(_matrixWorld.world.GL.gl.ARRAY_BUFFER, new Float32Array(object.geometry.color), _matrixWorld.world.GL.gl.STATIC_DRAW);

  object.vertexColorBuffer.itemSize = 4;
  object.vertexColorBuffer.numItems = object.geometry.colorData.color.length;
  /* Normals                                   */
};

_manifest.default.operation.triangle_buffer_procedure = function (object) {
  /* Vertex                                        */
  object.vertexPositionBuffer = _matrixWorld.world.GL.gl.createBuffer();

  _matrixWorld.world.GL.gl.bindBuffer(_matrixWorld.world.GL.gl.ARRAY_BUFFER, object.vertexPositionBuffer);

  _matrixWorld.world.GL.gl.bufferData(_matrixWorld.world.GL.gl.ARRAY_BUFFER, object.geometry.vertices, _matrixWorld.world.GL.gl.STATIC_DRAW);

  object.vertexPositionBuffer.itemSize = 3;
  object.vertexPositionBuffer.numItems = 3;
  /* Color                                         */

  object.vertexColorBuffer = _matrixWorld.world.GL.gl.createBuffer();

  _matrixWorld.world.GL.gl.bindBuffer(_matrixWorld.world.GL.gl.ARRAY_BUFFER, object.vertexColorBuffer);

  _matrixWorld.world.GL.gl.bufferData(_matrixWorld.world.GL.gl.ARRAY_BUFFER, new Float32Array(object.color), _matrixWorld.world.GL.gl.STATIC_DRAW);

  object.vertexColorBuffer.itemSize = 4;
  object.vertexColorBuffer.numItems = 3; // console.log("Buffer the " + object.type + "'s color loaded success.");
};

_manifest.default.operation.obj_buffer_procedure = function (object) {
  /* Vertex */
  if (object.color && null !== object.shaderProgram.vertexColorAttribute) {
    object.vertexColorBuffer = _matrixWorld.world.GL.gl.createBuffer();

    _matrixWorld.world.GL.gl.bindBuffer(_matrixWorld.world.GL.gl.ARRAY_BUFFER, object.vertexColorBuffer);

    var unpackedColors = [];

    for (var i in object.color) {
      var color = object.color[i];
      var looperLocal = 0;

      while (4 > looperLocal) {
        unpackedColors = unpackedColors.concat(color);
        looperLocal = looperLocal + 1;
      }
    }

    _matrixWorld.world.GL.gl.bufferData(_matrixWorld.world.GL.gl.ARRAY_BUFFER, new Float32Array(unpackedColors), _matrixWorld.world.GL.gl.STATIC_DRAW);

    object.vertexColorBuffer.itemSize = 4;
    object.vertexColorBuffer.numItems = 4;
  }
  /* Texture
    if (object.texture) {
      // console.log("        Buffer the " + object.type + "'s texture");
      object.vertexTexCoordBuffer = world.GL.gl.createBuffer();
      world.GL.gl.bindBuffer(world.GL.gl.ARRAY_BUFFER, object.vertexTexCoordBuffer);
      world.GL.gl.bufferData(world.GL.gl.ARRAY_BUFFER, object.geometry.texCoords , world.GL.gl.STATIC_DRAW);
      object.vertexTexCoordBuffer.itemSize = 2;
      object.vertexTexCoordBuffer.numItems = 24;
    }
  */

  /* Normals                                   */


  if (object.shaderProgram.useLightingUniform) {
    // console.log("        Buffer the " + object.type + "'s normals");
    // object.vertexNormalBuffer = world.GL.gl.createBuffer();
    // world.GL.gl.bindBuffer(world.GL.gl.ARRAY_BUFFER, );
    _matrixWorld.world.GL.gl.bufferData(_matrixWorld.world.GL.gl.ARRAY_BUFFER, object.mesh.normalBuffer, _matrixWorld.world.GL.gl.STATIC_DRAW); // object.mesh.normalBuffer.itemSize = 3;
    // object.mesh.normalBuffer.numItems = 24;

  }
  /* Indices
    // console.log("        Buffer the " + object.type + "'s indices");
    object.vertexIndexBuffer = world.GL.gl.createBuffer();
    world.GL.gl.bindBuffer(world.GL.gl.ELEMENT_ARRAY_BUFFER, object.vertexIndexBuffer);
    world.GL.gl.bufferData(world.GL.gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(object.geometry.indices), world.GL.gl.STATIC_DRAW);
    object.vertexIndexBuffer.itemSize = 1;
    object.vertexIndexBuffer.numItems = 36;
  */

};

_manifest.default.operation.squareTex_buffer_procedure = function (object) {
  /* Vertex */
  object.vertexPositionBuffer = _matrixWorld.world.GL.gl.createBuffer();

  _matrixWorld.world.GL.gl.bindBuffer(_matrixWorld.world.GL.gl.ARRAY_BUFFER, object.vertexPositionBuffer);

  _matrixWorld.world.GL.gl.bufferData(_matrixWorld.world.GL.gl.ARRAY_BUFFER, object.geometry.vertices, _matrixWorld.world.GL.gl.STATIC_DRAW);

  object.vertexPositionBuffer.itemSize = 3;
  object.vertexPositionBuffer.numItems = 4;
  /* Color */

  if (object.color && null !== object.shaderProgram.vertexColorAttribute) {
    object.vertexColorBuffer = _matrixWorld.world.GL.gl.createBuffer();

    _matrixWorld.world.GL.gl.bindBuffer(_matrixWorld.world.GL.gl.ARRAY_BUFFER, object.vertexColorBuffer);

    var unpackedColors = [];

    for (var i in object.color) {
      var color = object.color[i];
      var looperLocal = 0;

      while (4 > looperLocal) {
        unpackedColors = unpackedColors.concat(color);
        looperLocal = looperLocal + 1;
      }
    }

    _matrixWorld.world.GL.gl.bufferData(_matrixWorld.world.GL.gl.ARRAY_BUFFER, new Float32Array(unpackedColors), _matrixWorld.world.GL.gl.STATIC_DRAW);

    object.vertexColorBuffer.itemSize = 3;
    object.vertexColorBuffer.numItems = 4;
  }
  /* Texture */


  if (object.texture) {
    object.vertexTexCoordBuffer = _matrixWorld.world.GL.gl.createBuffer();

    _matrixWorld.world.GL.gl.bindBuffer(_matrixWorld.world.GL.gl.ARRAY_BUFFER, object.vertexTexCoordBuffer);

    _matrixWorld.world.GL.gl.bufferData(_matrixWorld.world.GL.gl.ARRAY_BUFFER, object.geometry.texCoords, _matrixWorld.world.GL.gl.STATIC_DRAW);

    object.vertexTexCoordBuffer.itemSize = 2;
    object.vertexTexCoordBuffer.numItems = 4;
  }
  /* Normals */


  if (object.shaderProgram.useLightingUniform) {
    object.vertexNormalBuffer = _matrixWorld.world.GL.gl.createBuffer();

    _matrixWorld.world.GL.gl.bindBuffer(_matrixWorld.world.GL.gl.ARRAY_BUFFER, object.vertexNormalBuffer);

    _matrixWorld.world.GL.gl.bufferData(_matrixWorld.world.GL.gl.ARRAY_BUFFER, object.LightMap, _matrixWorld.world.GL.gl.STATIC_DRAW);

    object.vertexNormalBuffer.itemSize = 4;
    object.vertexNormalBuffer.numItems = 4;
  }
  /* Indices */


  object.vertexIndexBuffer = _matrixWorld.world.GL.gl.createBuffer();

  _matrixWorld.world.GL.gl.bindBuffer(_matrixWorld.world.GL.gl.ELEMENT_ARRAY_BUFFER, object.vertexIndexBuffer);

  _matrixWorld.world.GL.gl.bufferData(_matrixWorld.world.GL.gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(object.geometry.indices), _matrixWorld.world.GL.gl.STATIC_DRAW);

  object.vertexIndexBuffer.itemSize = 1;
  object.vertexIndexBuffer.numItems = 6;
};

_manifest.default.operation.sphere_buffer_procedure = function (object) {
  /* Vertex */
  object.vertexPositionBuffer = _matrixWorld.world.GL.gl.createBuffer();

  _matrixWorld.world.GL.gl.bindBuffer(_matrixWorld.world.GL.gl.ARRAY_BUFFER, object.vertexPositionBuffer);

  _matrixWorld.world.GL.gl.bufferData(_matrixWorld.world.GL.gl.ARRAY_BUFFER, object.geometry.vertices, _matrixWorld.world.GL.gl.STATIC_DRAW);

  object.vertexPositionBuffer.itemSize = 3;
  object.vertexPositionBuffer.numItems = object.geometry.vertexPositionData.length / 3; // Color

  if (object.color && null !== object.shaderProgram.vertexColorAttribute) {
    //    // console.log("        Buffer the " + object.type + "'s color");
    object.vertexColorBuffer = _matrixWorld.world.GL.gl.createBuffer();

    _matrixWorld.world.GL.gl.bindBuffer(_matrixWorld.world.GL.gl.ARRAY_BUFFER, object.vertexColorBuffer);

    var unpackedColors = [];

    for (var i in object.color) {
      var color = object.color[i];
      var looperLocal = 0;

      while (4 > looperLocal) {
        unpackedColors = unpackedColors.concat(color);
        looperLocal = looperLocal + 1;
      }
    } // ??


    _matrixWorld.world.GL.gl.bufferData(_matrixWorld.world.GL.gl.ARRAY_BUFFER, new Float32Array(unpackedColors), _matrixWorld.world.GL.gl.STATIC_DRAW); // world.GL.gl.bufferData(world.GL.gl.ARRAY_BUFFER, new Float32Array(object.geometry.normals), world.GL.gl.STATIC_DRAW);


    object.vertexColorBuffer.itemSize = 3;
    object.vertexColorBuffer.numItems = object.geometry.normalData.length / 3;
  }
  /* Texture */


  if (object.texture) {
    object.vertexTexCoordBuffer = _matrixWorld.world.GL.gl.createBuffer();

    _matrixWorld.world.GL.gl.bindBuffer(_matrixWorld.world.GL.gl.ARRAY_BUFFER, object.vertexTexCoordBuffer);

    _matrixWorld.world.GL.gl.bufferData(_matrixWorld.world.GL.gl.ARRAY_BUFFER, object.geometry.texCoords, _matrixWorld.world.GL.gl.STATIC_DRAW);

    object.vertexTexCoordBuffer.itemSize = 2;
    object.vertexTexCoordBuffer.numItems = object.geometry.textureCoordData.length / 2;
  }
  /* Normals */


  if (object.shaderProgram.useLightingUniform) {
    object.vertexNormalBuffer = _matrixWorld.world.GL.gl.createBuffer();

    _matrixWorld.world.GL.gl.bindBuffer(_matrixWorld.world.GL.gl.ARRAY_BUFFER, object.vertexNormalBuffer);

    _matrixWorld.world.GL.gl.bufferData(_matrixWorld.world.GL.gl.ARRAY_BUFFER, object.geometry.normals, _matrixWorld.world.GL.gl.STATIC_DRAW);

    object.vertexNormalBuffer.itemSize = 3;
    object.vertexNormalBuffer.numItems = object.geometry.normalData.length / 3;
  }
  /* Indices*/


  object.vertexIndexBuffer = _matrixWorld.world.GL.gl.createBuffer();

  _matrixWorld.world.GL.gl.bindBuffer(_matrixWorld.world.GL.gl.ELEMENT_ARRAY_BUFFER, object.vertexIndexBuffer);

  _matrixWorld.world.GL.gl.bufferData(_matrixWorld.world.GL.gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(object.geometry.indices), _matrixWorld.world.GL.gl.STATIC_DRAW);

  object.vertexIndexBuffer.itemSize = 1;
  object.vertexIndexBuffer.numItems = object.geometry.indexData.length;
};

var _default = _manifest.default.operation;
exports.default = _default;

},{"../program/manifest":25,"./matrix-world":17}],8:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _bvhLoader = _interopRequireDefault(require("bvh-loader"));

var matrixWorld = _interopRequireWildcard(require("./matrix-world"));

var _utility = require("./utility");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @description MatrixEngine BVH animation loader.
 * MEBvh comes from `npm i bvh-loader`. Package 
 * `bvh-loader` is created for MatrixEngine but 
 * can be used for any other projects.
 * @name `MEBvhAnimation`
 * @author Nikola Lukic
 * @async YES
 */
// https://docs.w3cub.com/dom/webgl2renderingcontext/drawelementsinstanced
// HARDCODE DEV
// import MEBvh from '../node_modules/bvh-loader/index';
class MEBvhAnimation {
  constructor(path_, options) {
    if (typeof options === "undefined" || typeof options.world === 'undefined') {
      console.error("MEBvhAnimation class error: No second argument options || possible world is not passed.");
      return;
    }

    if (typeof options.skeletalBoneScale === 'undefined') {
      options.skeletalBoneScale = 0.3;
    }

    if (typeof options.loop === 'undefined') options.loop = true;
    if (typeof options.showOnLoad === 'undefined') options.showOnLoad = true;
    if (typeof options.type === 'undefined') options.type = "ME-SKELETAL_POINT_BASE";
    if (typeof options.autoPlay === 'undefined') options.autoPlay = true;
    if (typeof options.boneNameBasePrefix === 'undefined') options.boneNameBasePrefix = "MatrixSkeletalBone";
    if (typeof options.globalOffset === 'undefined') options.globalOffset = [0, 0, 0];
    if (typeof options.myFrameRate === 'undefined') options.myFrameRate = 125; // passed

    this.options = options;
    this.world = options.world;
    this.globalOffset = options.globalOffset;
    this.anim = new _bvhLoader.default();
    this.tPose = null;
    this.skeletalKeys = null;
    this.animation = null;
    this.animationTimer = null;
    this.actualFrame = 1;
    this.isConstructed = false;
    this.anim.parse_file(path_).then(() => {
      this.tPose = this.anim.frame_pose(0);
      this.tPosition = this.tPose[0];
      this.tRotation = this.tPose[1];
      this.skeletalKeys = this.anim.joint_names();
      this.animation = this.anim.all_frame_poses();
      this.sumOfFrames = this.animation[0].length - 1;
      this.loopInverse = new _utility.OSCILLATOR(1, this.sumOfFrames, 1);

      if (options.autoPlay == true) {
        switch (options.type) {
          case 'TPOSE':
            this.constructSkeletalTPose();
            break;

          case 'ANIMATION':
            this.playAnimation();
            break;

          default:
            this.playAnimation();
        }
      } else {
        if (options.showOnLoad == true) {
          switch (options.type) {
            case 'TPOSE':
              this.constructSkeletalTPose();
              break;

            case 'ANIMATION':
              // console.log("No autoPlay but preview first frame of animation")
              this.constructFirstFrame(this.options);
              break;

            default:
              this.constructFirstFrame(this.options);
          }
        }
      }
    });
  }

  constructSkeletalTPose() {
    if (this.isConstructed == false) this.constructSkeletal(this.options);

    for (var x = 0; x < this.tPosition.length; x++) {
      var b = this.options.boneNameBasePrefix + this.skeletalKeys[x];
      App.scene[b].position.SetX(this.tPosition[x][0] + this.globalOffset[0]);
      App.scene[b].position.SetY(this.tPosition[x][1] + this.globalOffset[1]);
      App.scene[b].position.SetZ(this.tPosition[x][2] + this.globalOffset[2]);
      App.scene[b].rotation.rotateX(this.tRotation[x][0]);
      App.scene[b].rotation.rotateY(this.tRotation[x][1]);
      App.scene[b].rotation.rotateZ(this.tRotation[x][2]);
    }
  }

  accessBonesObject() {
    let onlyMine = [];
    matrixWorld.objListToDispose[0].contentList.forEach(MEObject => {
      if (MEObject.name.indexOf(this.options.boneNameBasePrefix) != -1) {
        // console.log(MEObject)
        onlyMine.push(MEObject);
      }
    });
    return onlyMine;
  }

  constructSkeletal() {
    for (var x = 0; x < this.tPosition.length; x++) {
      var b = this.options.boneNameBasePrefix + this.skeletalKeys[x]; // boneTex

      if (typeof this.options.boneTex != 'undefined') {
        // cubeLightTex
        const detTypeOfMEObject = typeof this.options.drawTypeBone == 'undefined' ? 'cubeLightTex' : this.options.drawTypeBone;
        this.world.Add(detTypeOfMEObject, this.options.skeletalBoneScale, b, this.options.boneTex);
      } else {
        this.world.Add('cube', this.options.skeletalBoneScale, b);
      }
    }

    this.isConstructed = true;

    if (typeof this.options.skeletalBlend != 'undefined') {
      for (var x = 0; x < this.tPosition.length; x++) {
        var b = this.options.boneNameBasePrefix + this.skeletalKeys[x];
        App.scene[b].glBlend.blendEnabled = true;
        App.scene[b].glBlend.blendParamSrc = matrixEngine.utility.ENUMERATORS.glBlend.param[this.options.skeletalBlend.paramSrc];
        App.scene[b].glBlend.blendParamDest = matrixEngine.utility.ENUMERATORS.glBlend.param[this.options.skeletalBlend.paramDest];
      }
    }
  }

  constructFirstFrame() {
    if (this.isConstructed == false) this.constructSkeletal();

    for (var x = 0; x < this.tPosition.length; x++) {
      var b = this.options.boneNameBasePrefix + this.skeletalKeys[x];
      App.scene[b].position.SetX(this.animation[0][1][x][0] + this.globalOffset[0]);
      App.scene[b].position.SetY(this.animation[0][1][x][1] + this.globalOffset[1]);
      App.scene[b].position.SetZ(this.animation[0][1][x][2] + this.globalOffset[2]);
      App.scene[b].rotation.rotateX(this.animation[1][1][x][0]);
      App.scene[b].rotation.rotateY(this.animation[1][1][x][1]);
      App.scene[b].rotation.rotateZ(this.animation[1][1][x][2]);
    }
  }

  playAnimation() {
    if (this.isConstructed == false) this.constructFirstFrame(this.options);

    if (this.animationTimer == null) {
      this.animationTimer = setInterval(() => {
        for (var x = 0; x < this.tPosition.length; x++) {
          var b = this.options.boneNameBasePrefix + this.skeletalKeys[x];
          App.scene[b].position.SetX(this.animation[0][this.actualFrame][x][0] + this.globalOffset[0]);
          App.scene[b].position.SetY(this.animation[0][this.actualFrame][x][1] + this.globalOffset[1]);
          App.scene[b].position.SetZ(this.animation[0][this.actualFrame][x][2] + this.globalOffset[2]);
          App.scene[b].rotation.rotateX(this.animation[1][1][x][0]);
          App.scene[b].rotation.rotateY(this.animation[1][1][x][1]);
          App.scene[b].rotation.rotateZ(this.animation[1][1][x][2]);
        }

        if (this.options.loop == 'playInverse') {
          this.actualFrame = this.loopInverse.UPDATE();
        } else {
          this.actualFrame++;
        }

        if (this.actualFrame >= this.animation[0].length - 1) {
          if (this.options.loop == true) {
            this.actualFrame = 1;
          } else if (this.options.loop == 'stopOnEnd') {
            this.stopAnimation();
          } else if (this.options.loop == 'stopAndReset') {
            this.constructFirstFrame();
            this.actualFrame = 1;
            this.stopAnimation();
          }
        }
      }, this.options.myFrameRate);
    } else {
      console.warn("MEBvhAnimation: Animation already play.");
    }
  }

  stopAnimation() {
    clearInterval(this.animationTimer);
    this.animationTimer = null;
  }

}

exports.default = MEBvhAnimation;

},{"./matrix-world":17,"./utility":20,"bvh-loader":22}],9:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _manifest = _interopRequireDefault(require("../program/manifest"));

var _matrixWorld = require("./matrix-world");

var _events = require("./events");

var _utility = require("./utility");

var raycaster = _interopRequireWildcard(require("./raycast"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_manifest.default.operation.draws = new Object();

_manifest.default.operation.draws.cube = function (object) {
  var lighting = true;
  var localLooper = 0;
  mat4.identity(object.mvMatrix);
  this.mvPushMatrix(object.mvMatrix, this.mvMatrixStack);

  if (_manifest.default.camera.FirstPersonController == true) {
    _events.camera.setCamera(object);
  } else if (_manifest.default.camera.SceneController == true) {
    _events.camera.setSceneCamera(object);
  }

  mat4.translate(object.mvMatrix, object.mvMatrix, object.position.worldLocation);
  if (raycaster.checkingProcedureCalc) raycaster.checkingProcedureCalc(object);
  mat4.rotate(object.mvMatrix, object.mvMatrix, degToRad(object.rotation.rx), object.rotation.getRotDirX());
  mat4.rotate(object.mvMatrix, object.mvMatrix, degToRad(object.rotation.ry), object.rotation.getRotDirY());
  mat4.rotate(object.mvMatrix, object.mvMatrix, degToRad(object.rotation.rz), object.rotation.getRotDirZ()); // V

  if (object.vertexPositionBuffer) {
    _matrixWorld.world.GL.gl.bindBuffer(_matrixWorld.world.GL.gl.ARRAY_BUFFER, object.vertexPositionBuffer);

    if (object.geometry.dynamicBuffer == true) {
      _matrixWorld.world.GL.gl.bufferData(_matrixWorld.world.GL.gl.ARRAY_BUFFER, object.geometry.vertices, _matrixWorld.world.GL.gl.STATIC_DRAW);
    }

    _matrixWorld.world.GL.gl.vertexAttribPointer(object.shaderProgram.vertexPositionAttribute, object.vertexPositionBuffer.itemSize, _matrixWorld.world.GL.gl.FLOAT, false, 0, 0);

    _matrixWorld.world.GL.gl.enableVertexAttribArray(object.shaderProgram.vertexPositionAttribute);

    localLooper = localLooper + 1;
  } // C


  if (object.vertexColorBuffer) {
    _matrixWorld.world.GL.gl.bindBuffer(_matrixWorld.world.GL.gl.ARRAY_BUFFER, object.vertexColorBuffer);

    _matrixWorld.world.GL.gl.vertexAttribPointer(object.shaderProgram.vertexColorAttribute, object.vertexColorBuffer.itemSize, _matrixWorld.world.GL.gl.FLOAT, false, 0, 0);

    _matrixWorld.world.GL.gl.enableVertexAttribArray(object.shaderProgram.vertexColorAttribute);

    localLooper = localLooper + 1;
  } // L


  if (lighting && object.shaderProgram.useLightingUniform) {
    _matrixWorld.world.GL.gl.uniform1i(object.shaderProgram.useLightingUniform, lighting);
    /* Set the normals */


    if (object.vertexNormalBuffer) {
      _matrixWorld.world.GL.gl.bindBuffer(_matrixWorld.world.GL.gl.ARRAY_BUFFER, object.vertexNormalBuffer);

      _matrixWorld.world.GL.gl.vertexAttribPointer(object.shaderProgram.vertexNormalAttribute, object.vertexNormalBuffer.itemSize, _matrixWorld.world.GL.gl.FLOAT, false, 0, 0);

      _matrixWorld.world.GL.gl.enableVertexAttribArray(object.shaderProgram.vertexNormalAttribute);

      localLooper = localLooper + 1;
    }
    /* Set the ambient light */


    if (object.shaderProgram.ambientColorUniform) {
      if ((0, _utility.E)('ambLightR')) {
        _matrixWorld.world.GL.gl.uniform3f(object.shaderProgram.ambientColorUniform, parseFloat((0, _utility.E)('ambLightR').getAttribute('value')), parseFloat((0, _utility.E)('ambLightG').getAttribute('value')), parseFloat((0, _utility.E)('ambLightB').getAttribute('value'))); // console.log("LIGHTS UNIFORM AMB  B = ", parseFloat(E('ambLightB').value) )

      } else {
        // object.LightsData.ambientLight
        _matrixWorld.world.GL.gl.uniform3f(object.shaderProgram.ambientColorUniform, object.LightsData.ambientLight.r, object.LightsData.ambientLight.g, object.LightsData.ambientLight.b);
      }
    }
    /* Directional light */


    if (object.shaderProgram.directionalColorUniform) {
      if ((0, _utility.E)('dirLightR')) {
        _matrixWorld.world.GL.gl.uniform3f(object.shaderProgram.directionalColorUniform, parseFloat((0, _utility.E)('dirLightR').getAttribute('value')), parseFloat((0, _utility.E)('dirLightG').getAttribute('value')), parseFloat((0, _utility.E)('dirLightB').getAttribute('value')));
      } else {
        //console.log('TEST')
        _matrixWorld.world.GL.gl.uniform3f(object.shaderProgram.directionalColorUniform, object.LightsData.directionLight.R(), object.LightsData.directionLight.G(), object.LightsData.directionLight.B());
      }
    }
    /* Normalize the direction */


    var lightingDirection = null;

    if (object.shaderProgram.lightingDirectionUniform) {
      if ((0, _utility.E)('dirX') && (0, _utility.E)('dirY') && (0, _utility.E)('dirZ')) {
        // console.log("LIGHTS UNIFORM AMB  B = ",  E('dirZ').value )
        lightingDirection = [degToRad(parseFloat((0, _utility.E)('dirX').getAttribute('value'))), degToRad(parseFloat((0, _utility.E)('dirY').getAttribute('value'))), degToRad(parseFloat((0, _utility.E)('dirZ').getAttribute('value')))];
      } else {
        lightingDirection = [object.LightsData.lightingDirection.r, object.LightsData.lightingDirection.g, object.LightsData.lightingDirection.b];
      }

      var adjustedLD = vec3.create();
      vec3.normalize(adjustedLD, lightingDirection);
      vec3.scale(adjustedLD, adjustedLD, -1);

      _matrixWorld.world.GL.gl.uniform3fv(object.shaderProgram.lightingDirectionUniform, adjustedLD);
    }
  } else {
    if (object.shaderProgram.useLightingUniform) {
      if (object.shaderProgram.ambientColorUniform) {
        _matrixWorld.world.GL.gl.uniform3f(object.shaderProgram.ambientColorUniform, parseFloat(0.2), parseFloat(0.2), parseFloat(0.2));
      }

      if (object.shaderProgram.directionalColorUniform) {
        _matrixWorld.world.GL.gl.uniform3f(object.shaderProgram.directionalColorUniform, parseFloat(1), parseFloat(0), parseFloat(0));
      }
    }
  } // T


  if (object.vertexTexCoordBuffer) {
    _matrixWorld.world.GL.gl.bindBuffer(_matrixWorld.world.GL.gl.ARRAY_BUFFER, object.vertexTexCoordBuffer);

    if (object.geometry.dynamicBuffer == true) {
      _matrixWorld.world.GL.gl.bufferData(_matrixWorld.world.GL.gl.ARRAY_BUFFER, object.geometry.texCoords, _matrixWorld.world.GL.gl.STATIC_DRAW);
    }

    _matrixWorld.world.GL.gl.vertexAttribPointer(object.shaderProgram.textureCoordAttribute, object.vertexTexCoordBuffer.itemSize, _matrixWorld.world.GL.gl.FLOAT, false, 0, 0);

    _matrixWorld.world.GL.gl.enableVertexAttribArray(object.shaderProgram.textureCoordAttribute);

    if (object.streamTextures != null) {
      // video/webcam tex
      _manifest.default.tools.loadVideoTexture('glVideoTexture', object.streamTextures.videoImage);

      _matrixWorld.world.GL.gl.uniform1i(object.shaderProgram.samplerUniform, 0);
    } else {
      for (var t = 0; t < object.textures.length; t++) {
        if (object.custom.gl_texture == null) {
          _matrixWorld.world.GL.gl.activeTexture(_matrixWorld.world.GL.gl['TEXTURE' + t]);

          _matrixWorld.world.GL.gl.bindTexture(_matrixWorld.world.GL.gl.TEXTURE_2D, object.textures[t]);

          _matrixWorld.world.GL.gl.pixelStorei(_matrixWorld.world.GL.gl.UNPACK_FLIP_Y_WEBGL, false);

          _matrixWorld.world.GL.gl.texParameteri(_matrixWorld.world.GL.gl.TEXTURE_2D, _matrixWorld.world.GL.gl.TEXTURE_MAG_FILTER, _matrixWorld.world.GL.gl.NEAREST);

          _matrixWorld.world.GL.gl.texParameteri(_matrixWorld.world.GL.gl.TEXTURE_2D, _matrixWorld.world.GL.gl.TEXTURE_MIN_FILTER, _matrixWorld.world.GL.gl.NEAREST);

          _matrixWorld.world.GL.gl.texParameteri(_matrixWorld.world.GL.gl.TEXTURE_2D, _matrixWorld.world.GL.gl.TEXTURE_WRAP_S, _matrixWorld.world.GL.gl.CLAMP_TO_EDGE);

          _matrixWorld.world.GL.gl.texParameteri(_matrixWorld.world.GL.gl.TEXTURE_2D, _matrixWorld.world.GL.gl.TEXTURE_WRAP_T, _matrixWorld.world.GL.gl.CLAMP_TO_EDGE); // -- Allocate storage for the texture
          // world.GL.gl.texStorage2D(world.GL.gl.TEXTURE_2D, 1, world.GL.gl.RGB8, 512, 512);
          // world.GL.gl.texSubImage2D(world.GL.gl.TEXTURE_2D, 0, 0, 0, world.GL.gl.RGB, world.GL.gl.UNSIGNED_BYTE, image);
          // world.GL.gl.generateMipmap(world.GL.gl.TEXTURE_2D);


          _matrixWorld.world.GL.gl.uniform1i(object.shaderProgram.samplerUniform, t);
        } else {
          object.custom.gl_texture(object, t);
        }
      }
    }

    localLooper = localLooper + 1;
  } else {
    _matrixWorld.world.GL.gl.uniform1i(object.shaderProgram.samplerUniform, 0);
  }

  _matrixWorld.world.GL.gl.bindBuffer(_matrixWorld.world.GL.gl.ELEMENT_ARRAY_BUFFER, object.vertexIndexBuffer);

  _matrixWorld.world.setMatrixUniforms(object, this.pMatrix, object.mvMatrix); // shadows


  if (object.shadows) {
    // console.log(" SHADOWS -> " , object.shadows)
    // set the light position
    _matrixWorld.world.GL.gl.uniform3fv(object.shaderProgram.lightWorldPositionLocation, object.shadows.lightPosition); // set the camera/view position
    // gl.uniform3fv(object.shaderProgram.viewWorldPositionLocation, camera);
    // world.GL.gl.uniform3fv(object.shaderProgram.viewWorldPositionLocation, [matrixEngine.Events.camera.xPos, matrixEngine.Events.camera.yPos, matrixEngine.Events.camera.zPos]);


    _matrixWorld.world.GL.gl.uniform3fv(object.shaderProgram.viewWorldPositionLocation, object.shadows.lightPosition); // set the shininess


    _matrixWorld.world.GL.gl.uniform1f(object.shaderProgram.shininessLocation, object.shadows.shininess); // set the spotlight uniforms


    {
      var target = [0, 0, 0]; // object.position.worldLocation;

      var up = [0, 1, 0];
      var lmat = m4.lookAt(object.shadows.lightPosition, target, up); // var lmat = m4.lookAt(object.position.worldLocation, target, up);

      lmat = m4.multiply(m4.xRotation(object.shadows.lightRotationX), lmat);
      lmat = m4.multiply(m4.yRotation(object.shadows.lightRotationY), lmat); // get the zAxis from the matrix
      // negate it because lookAt looks down the -Z axis

      object.shadows.lightDirection = [-lmat[8], -lmat[9], -lmat[10]]; // object.shadows.lightDirection = [-0, -0, -1];
    }

    _matrixWorld.world.GL.gl.uniform3fv(object.shaderProgram.lightDirectionLocation, object.shadows.lightDirection);

    _matrixWorld.world.GL.gl.uniform1f(object.shaderProgram.innerLimitLocation, Math.cos(object.shadows.innerLimit));

    _matrixWorld.world.GL.gl.uniform1f(object.shaderProgram.outerLimitLocation, Math.cos(object.shadows.outerLimit));
  }

  if (object.vertexNormalBuffer && object.shaderProgram.nMatrixUniform) {
    var normalMatrix = mat3.create();
    mat3.normalFromMat4(normalMatrix, object.mvMatrix);
    mat3.transpose(normalMatrix, normalMatrix);

    _matrixWorld.world.GL.gl.uniformMatrix3fv(object.shaderProgram.nMatrixUniform, false, normalMatrix);
  }

  _matrixWorld.world.disableUnusedAttr(_matrixWorld.world.GL.gl, localLooper);

  if (object.glBlend.blendEnabled == true) {
    if (!_matrixWorld.world.GL.gl.isEnabled(_matrixWorld.world.GL.gl.BLEND)) {
      // world.GL.gl.disable(world.GL.gl.DEPTH_TEST);
      _matrixWorld.world.GL.gl.enable(_matrixWorld.world.GL.gl.BLEND);
    }

    _matrixWorld.world.GL.gl.blendFunc(_matrixWorld.world.GL.gl[object.glBlend.blendParamSrc], _matrixWorld.world.GL.gl[object.glBlend.blendParamDest]);
  } else {
    _matrixWorld.world.GL.gl.disable(_matrixWorld.world.GL.gl.BLEND);

    _matrixWorld.world.GL.gl.enable(_matrixWorld.world.GL.gl.DEPTH_TEST); // TEST
    // world.GL.gl.enable(world.GL.gl.CULL_FACE);

  }

  _matrixWorld.world.GL.gl.drawElements(_matrixWorld.world.GL.gl[object.glDrawElements.mode], object.glDrawElements.numberOfIndicesRender, _matrixWorld.world.GL.gl.UNSIGNED_SHORT, 0);

  object.instancedDraws.overrideDrawArraysInstance(object);
  this.mvPopMatrix(object.mvMatrix, this.mvMatrixStack);
};

_manifest.default.operation.draws.piramide = function (object) {
  mat4.identity(object.mvMatrix);

  _matrixWorld.world.mvPushMatrix(object.mvMatrix, this.mvMatrixStack);

  if (_manifest.default.camera.FirstPersonController == true) {
    _events.camera.setCamera(object);
  } else if (_manifest.default.camera.SceneController == true) {
    _events.camera.setSceneCamera(object);
  }

  mat4.translate(object.mvMatrix, object.mvMatrix, object.position.worldLocation);
  if (raycaster.checkingProcedureCalc) raycaster.checkingProcedureCalc(object);
  mat4.rotate(object.mvMatrix, object.mvMatrix, degToRad(object.rotation.rx), object.rotation.getRotDirX());
  mat4.rotate(object.mvMatrix, object.mvMatrix, degToRad(object.rotation.ry), object.rotation.getRotDirY());
  mat4.rotate(object.mvMatrix, object.mvMatrix, degToRad(object.rotation.rz), object.rotation.getRotDirZ());

  if (object.geometry.dynamicBuffer == true) {
    _matrixWorld.world.GL.gl.bindBuffer(_matrixWorld.world.GL.gl.ARRAY_BUFFER, object.vertexPositionBuffer);

    _matrixWorld.world.GL.gl.bufferData(_matrixWorld.world.GL.gl.ARRAY_BUFFER, object.geometry.vertices, _matrixWorld.world.GL.gl.STATIC_DRAW);
  } else {
    _matrixWorld.world.GL.gl.bindBuffer(_matrixWorld.world.GL.gl.ARRAY_BUFFER, object.vertexPositionBuffer);
  }

  _matrixWorld.world.GL.gl.vertexAttribPointer(object.shaderProgram.vertexPositionAttribute, object.vertexPositionBuffer.itemSize, _matrixWorld.world.GL.gl.FLOAT, false, 0, 0);

  if (object.vertexColorBuffer) {
    _matrixWorld.world.GL.gl.bindBuffer(_matrixWorld.world.GL.gl.ARRAY_BUFFER, object.vertexColorBuffer);

    _matrixWorld.world.GL.gl.vertexAttribPointer(object.shaderProgram.vertexColorAttribute, object.vertexColorBuffer.itemSize, _matrixWorld.world.GL.gl.FLOAT, false, 0, 0);
  }

  if (object.glBlend.blendEnabled == true) {
    if (!_matrixWorld.world.GL.gl.isEnabled(_matrixWorld.world.GL.gl.BLEND)) {
      // world.GL.gl.disable(world.GL.gl.DEPTH_TEST);
      _matrixWorld.world.GL.gl.enable(_matrixWorld.world.GL.gl.BLEND);
    } // world.GL.gl.blendColor ( 1,1,1,0.5)
    // world.GL.gl.blendColor( 1.0 , 1.0, 1.0, 0.3 );


    _matrixWorld.world.GL.gl.blendFunc(_matrixWorld.world.GL.gl[object.glBlend.blendParamSrc], _matrixWorld.world.GL.gl[object.glBlend.blendParamDest]);
  } else {
    _matrixWorld.world.GL.gl.disable(_matrixWorld.world.GL.gl.BLEND);

    _matrixWorld.world.GL.gl.enable(_matrixWorld.world.GL.gl.DEPTH_TEST);
  }

  _matrixWorld.world.setMatrixUniforms(object, this.pMatrix, object.mvMatrix);

  _matrixWorld.world.GL.gl.drawArrays(_matrixWorld.world.GL.gl[object.glDrawElements.mode], 0, object.vertexPositionBuffer.numItems);

  object.instancedDraws.overrideDrawArraysInstance(object);
  this.mvPopMatrix(object.mvMatrix, this.mvMatrixStack);
};

_manifest.default.operation.draws.square = function (object) {
  mat4.identity(object.mvMatrix);

  _matrixWorld.world.mvPushMatrix(object.mvMatrix, _matrixWorld.world.mvMatrixStack);

  if (_manifest.default.camera.FirstPersonController == true) {
    _events.camera.setCamera(object);
  } else if (_manifest.default.camera.SceneController == true) {
    _events.camera.setSceneCamera(object);
  }

  mat4.translate(object.mvMatrix, object.mvMatrix, object.position.worldLocation);
  if (raycaster.checkingProcedureCalc) raycaster.checkingProcedureCalc(object);
  mat4.rotate(object.mvMatrix, object.mvMatrix, degToRad(object.rotation.rx), object.rotation.getRotDirX());
  mat4.rotate(object.mvMatrix, object.mvMatrix, degToRad(object.rotation.ry), object.rotation.getRotDirY());
  mat4.rotate(object.mvMatrix, object.mvMatrix, degToRad(object.rotation.rz), object.rotation.getRotDirZ());

  if (object.geometry.dynamicBuffer == true) {
    _matrixWorld.world.GL.gl.bindBuffer(_matrixWorld.world.GL.gl.ARRAY_BUFFER, object.vertexPositionBuffer);

    _matrixWorld.world.GL.gl.bufferData(_matrixWorld.world.GL.gl.ARRAY_BUFFER, object.geometry.vertices, _matrixWorld.world.GL.gl.STATIC_DRAW);
  } else {
    _matrixWorld.world.GL.gl.bindBuffer(_matrixWorld.world.GL.gl.ARRAY_BUFFER, object.vertexPositionBuffer);
  }

  _matrixWorld.world.GL.gl.vertexAttribPointer(object.shaderProgram.vertexPositionAttribute, object.vertexPositionBuffer.itemSize, _matrixWorld.world.GL.gl.FLOAT, false, 0, 0);

  if (object.vertexColorBuffer) {
    _matrixWorld.world.GL.gl.bindBuffer(_matrixWorld.world.GL.gl.ARRAY_BUFFER, object.vertexColorBuffer);

    _matrixWorld.world.GL.gl.vertexAttribPointer(object.shaderProgram.vertexColorAttribute, object.vertexColorBuffer.itemSize, _matrixWorld.world.GL.gl.FLOAT, false, 0, 0);
  }

  if (object.glBlend.blendEnabled == true) {
    if (!_matrixWorld.world.GL.gl.isEnabled(_matrixWorld.world.GL.gl.BLEND)) {
      _matrixWorld.world.GL.gl.enable(_matrixWorld.world.GL.gl.BLEND);
    } // world.GL.gl.blendColor( 1.0 , 1.0, 1.0, 0.3 );


    _matrixWorld.world.GL.gl.blendFunc(_matrixWorld.world.GL.gl[object.glBlend.blendParamSrc], _matrixWorld.world.GL.gl[object.glBlend.blendParamDest]);
  } else {
    _matrixWorld.world.GL.gl.disable(_matrixWorld.world.GL.gl.BLEND);

    _matrixWorld.world.GL.gl.enable(_matrixWorld.world.GL.gl.DEPTH_TEST);
  }

  _matrixWorld.world.setMatrixUniforms(object, this.pMatrix, object.mvMatrix);

  _matrixWorld.world.GL.gl.drawArrays(_matrixWorld.world.GL.gl[object.glDrawElements.mode], 0, object.vertexPositionBuffer.numItems);

  object.instancedDraws.overrideDrawArraysInstance(object);
  this.mvPopMatrix(object.mvMatrix, this.mvMatrixStack);
};

_manifest.default.operation.draws.triangle = function (object) {
  mat4.identity(object.mvMatrix);

  _matrixWorld.world.mvPushMatrix(object.mvMatrix, this.mvMatrixStack);

  if (_manifest.default.camera.FirstPersonController == true) {
    _events.camera.setCamera(object);
  } else if (_manifest.default.camera.SceneController == true) {
    _events.camera.setSceneCamera(object);
  }

  mat4.translate(object.mvMatrix, object.mvMatrix, object.position.worldLocation);
  if (raycaster.checkingProcedureCalc) raycaster.checkingProcedureCalc(object);
  mat4.rotate(object.mvMatrix, object.mvMatrix, degToRad(object.rotation.rx), object.rotation.getRotDirX());
  mat4.rotate(object.mvMatrix, object.mvMatrix, degToRad(object.rotation.ry), object.rotation.getRotDirY());
  mat4.rotate(object.mvMatrix, object.mvMatrix, degToRad(object.rotation.rz), object.rotation.getRotDirZ());

  _matrixWorld.world.GL.gl.bindBuffer(_matrixWorld.world.GL.gl.ARRAY_BUFFER, object.vertexPositionBuffer);

  _matrixWorld.world.GL.gl.vertexAttribPointer(object.shaderProgram.vertexPositionAttribute, object.vertexPositionBuffer.itemSize, _matrixWorld.world.GL.gl.FLOAT, false, 0, 0);

  if (object.geometry.dynamicBuffer == true) {
    _matrixWorld.world.GL.gl.bufferData(_matrixWorld.world.GL.gl.ARRAY_BUFFER, object.geometry.vertices, _matrixWorld.world.GL.gl.STATIC_DRAW);
  }

  _matrixWorld.world.GL.gl.bindBuffer(_matrixWorld.world.GL.gl.ARRAY_BUFFER, object.vertexColorBuffer);

  _matrixWorld.world.GL.gl.vertexAttribPointer(object.shaderProgram.vertexColorAttribute, object.vertexColorBuffer.itemSize, _matrixWorld.world.GL.gl.FLOAT, false, 0, 0);

  if (object.glBlend.blendEnabled == true) {
    if (!_matrixWorld.world.GL.gl.isEnabled(_matrixWorld.world.GL.gl.BLEND)) {
      // world.GL.gl.disable(world.GL.gl.DEPTH_TEST);
      _matrixWorld.world.GL.gl.enable(_matrixWorld.world.GL.gl.BLEND);
    } // world.GL.gl.blendColor( 1.0 , 1.0, 1.0, 0.3 );


    _matrixWorld.world.GL.gl.blendFunc(_matrixWorld.world.GL.gl[object.glBlend.blendParamSrc], _matrixWorld.world.GL.gl[object.glBlend.blendParamDest]);
  } else {
    _matrixWorld.world.GL.gl.disable(_matrixWorld.world.GL.gl.BLEND);

    _matrixWorld.world.GL.gl.enable(_matrixWorld.world.GL.gl.DEPTH_TEST);
  }

  this.setMatrixUniforms(object, this.pMatrix, object.mvMatrix);

  _matrixWorld.world.GL.gl.drawArrays(_matrixWorld.world.GL.gl[object.glDrawElements.mode], 0, object.vertexPositionBuffer.numItems);

  object.instancedDraws.overrideDrawArraysInstance(object);
  this.mvPopMatrix(object.mvMatrix, this.mvMatrixStack);
};

_manifest.default.operation.draws.drawObj = function (object) {
  var lighting = 1; // eslint-disable-next-line no-unused-vars

  var localLooper = 0;
  lighting = true;
  mat4.identity(object.mvMatrix);

  _matrixWorld.world.mvPushMatrix(object.mvMatrix, this.mvMatrixStack);

  if (_manifest.default.camera.FirstPersonController == true) {
    _events.camera.setCamera(object);
  } else if (_manifest.default.camera.SceneController == true) {
    _events.camera.setSceneCamera(object);
  }

  mat4.translate(object.mvMatrix, object.mvMatrix, object.position.worldLocation);
  mat4.rotate(object.mvMatrix, object.mvMatrix, degToRad(object.rotation.rx), object.rotation.getRotDirX());
  mat4.rotate(object.mvMatrix, object.mvMatrix, degToRad(object.rotation.ry), object.rotation.getRotDirY());
  mat4.rotate(object.mvMatrix, object.mvMatrix, degToRad(object.rotation.rz), object.rotation.getRotDirZ());

  if (typeof object.mesh.vertexBuffer != 'undefined') {
    if (object.animation != null) {
      object.animation.currentDraws++;

      if (object.animation.currentDraws > object.animation.speed) {
        object.animation.currentAni++;
        object.animation.currentDraws = 0;

        if (object.animation.currentAni > object.animation.sumOfAniFrames) {
          object.animation.currentAni = 0;
        }
      }

      if (object.animation.currentAni == 0) {
        _matrixWorld.world.GL.gl.bindBuffer(_matrixWorld.world.GL.gl.ARRAY_BUFFER, object.mesh.vertexBuffer);

        _matrixWorld.world.GL.gl.vertexAttribPointer(object.shaderProgram.vertexPositionAttribute, object.mesh.vertexBuffer.itemSize, _matrixWorld.world.GL.gl.FLOAT, false, 0, 0);
      } else {
        _matrixWorld.world.GL.gl.bindBuffer(_matrixWorld.world.GL.gl.ARRAY_BUFFER, _manifest.default.meshes[object.animation.id + object.animation.currentAni].vertexBuffer);

        _matrixWorld.world.GL.gl.vertexAttribPointer(object.shaderProgram.vertexPositionAttribute, object.mesh.vertexBuffer.itemSize, _matrixWorld.world.GL.gl.FLOAT, false, 0, 0);
      }
    } else {
      // now to render the mesh test
      _matrixWorld.world.GL.gl.bindBuffer(_matrixWorld.world.GL.gl.ARRAY_BUFFER, object.mesh.vertexBuffer);

      _matrixWorld.world.GL.gl.bufferData(_matrixWorld.world.GL.gl.ARRAY_BUFFER, object.mesh.vertices, _matrixWorld.world.GL.gl.STATIC_DRAW);

      _matrixWorld.world.GL.gl.vertexAttribPointer(object.shaderProgram.vertexPositionAttribute, object.mesh.vertexBuffer.itemSize, _matrixWorld.world.GL.gl.FLOAT, false, 0, 0);
    }
  } // COLOR BUFFER

  /* if (object.vertexColorBuffer) {
      world.GL.gl.bindBuffer( world.GL.gl.ARRAY_BUFFER, object.vertexColorBuffer);
      world.GL.gl.vertexAttribPointer(object.shaderProgram.vertexColorAttribute, object.vertexColorBuffer.itemSize,  world.GL.gl.FLOAT, false, 0, 0);
      world.GL.gl.enableVertexAttribArray(object.shaderProgram.vertexColorAttribute);
      localLooper = localLooper + 1;
    }
  */
  //LIGHT STAFF


  if (lighting && object.shaderProgram.useLightingUniform) {
    _matrixWorld.world.GL.gl.uniform1i(object.shaderProgram.useLightingUniform, lighting);
    /* Set the normals */


    if (object.mesh.normalBuffer) {
      _matrixWorld.world.GL.gl.bindBuffer(_matrixWorld.world.GL.gl.ARRAY_BUFFER, object.mesh.normalBuffer);

      _matrixWorld.world.GL.gl.vertexAttribPointer(object.shaderProgram.vertexNormalAttribute, object.mesh.normalBuffer.itemSize, _matrixWorld.world.GL.gl.FLOAT, false, 0, 0);

      _matrixWorld.world.GL.gl.enableVertexAttribArray(object.shaderProgram.vertexNormalAttribute);

      localLooper = localLooper + 1;
    }
    /* Set the ambient light                 */


    if (object.shaderProgram.ambientColorUniform) {
      if ((0, _utility.E)('ambLight') && (0, _utility.E)('ambLight').color) {
        _matrixWorld.world.GL.gl.uniform3f(object.shaderProgram.ambientColorUniform, parseFloat((0, _utility.E)('ambLight').color.rgb[0]), parseFloat((0, _utility.E)('ambLight').color.rgb[1]), parseFloat((0, _utility.E)('ambLight').color.rgb[2]));
      } else {
        _matrixWorld.world.GL.gl.uniform3f(object.shaderProgram.ambientColorUniform, object.LightsData.ambientLight.R(), object.LightsData.ambientLight.G(), object.LightsData.ambientLight.B());
      }
    }
    /* Directional light */


    if (object.shaderProgram.directionalColorUniform) {
      if ((0, _utility.E)('dirLight') && (0, _utility.E)('dirLight').color) {
        _matrixWorld.world.GL.gl.uniform3f(object.shaderProgram.directionalColorUniform, parseFloat((0, _utility.E)('dirLight').color.rgb[0]), parseFloat((0, _utility.E)('dirLight').color.rgb[1]), parseFloat((0, _utility.E)('dirLight').color.rgb[2]));
      } else {
        _matrixWorld.world.GL.gl.uniform3f(object.shaderProgram.directionalColorUniform, object.LightsData.directionLight.R(), object.LightsData.directionLight.G(), object.LightsData.directionLight.B());
      }
    }
    /* Normalize the direction */


    var lightingDirection = null;

    if (object.shaderProgram.lightingDirectionUniform) {
      if ((0, _utility.E)('dirX') && (0, _utility.E)('dirY') && (0, _utility.E)('dirZ')) {
        lightingDirection = [parseFloat((0, _utility.E)('dirX').value), parseFloat((0, _utility.E)('dirY').value), parseFloat((0, _utility.E)('dirZ').value)];
      } else {
        lightingDirection = [object.LightsData.lightingDirection.r, object.LightsData.lightingDirection.g, object.LightsData.lightingDirection.b];
      }

      var adjustedLD = vec3.create();
      vec3.normalize(adjustedLD, lightingDirection);
      vec3.scale(adjustedLD, adjustedLD, -1);

      _matrixWorld.world.GL.gl.uniform3fv(object.shaderProgram.lightingDirectionUniform, adjustedLD);
    }
  } else {
    if (object.shaderProgram.useLightingUniform) {
      if (object.shaderProgram.ambientColorUniform) {
        _matrixWorld.world.GL.gl.uniform3f(object.shaderProgram.ambientColorUniform, parseFloat(1), parseFloat(2), parseFloat(0));
      }

      if (object.shaderProgram.directionalColorUniform) {
        _matrixWorld.world.GL.gl.uniform3f(object.shaderProgram.directionalColorUniform, parseFloat(1), parseFloat(1), parseFloat(0));
      }
    }
  } // it's possible that the mesh doesn't contain any texture coordinates
  // in this case, the texture vertexAttribArray will need to be disabled
  // before the call to drawElements


  if (!object.mesh.textures.length && !object.texture) {//  world.GL.gl.disableVertexAttribArray(object.shaderProgram.textureCoordAttribute);
  } else {
    // if the texture vertexAttribArray has been previously
    // disabled, then it needs to be re-enabled
    if (object.texture) {
      _matrixWorld.world.GL.gl.bindBuffer(_matrixWorld.world.GL.gl.ARRAY_BUFFER, object.mesh.textureBuffer);

      _matrixWorld.world.GL.gl.enableVertexAttribArray(object.shaderProgram.textureCoordAttribute);

      _matrixWorld.world.GL.gl.vertexAttribPointer(object.shaderProgram.textureCoordAttribute, object.mesh.textureBuffer.itemSize, _matrixWorld.world.GL.gl.FLOAT, false, 0, 0); //ori world.GL.gl.activeTexture(world.GL.gl.TEXTURE0);
      // ori world.GL.gl.bindTexture(world.GL.gl.TEXTURE_2D, object.texture);


      if (object.streamTextures != null) {
        // video webcam textures
        _manifest.default.tools.loadVideoTexture('glVideoTexture', object.streamTextures.videoImage);

        _matrixWorld.world.GL.gl.uniform1i(object.shaderProgram.samplerUniform, 0);
      } else {
        for (var t = 0; t < object.textures.length; t++) {
          _matrixWorld.world.GL.gl.activeTexture(_matrixWorld.world.GL.gl['TEXTURE' + t]);

          _matrixWorld.world.GL.gl.bindTexture(_matrixWorld.world.GL.gl.TEXTURE_2D, object.textures[t]);

          _matrixWorld.world.GL.gl.pixelStorei(_matrixWorld.world.GL.gl.UNPACK_FLIP_Y_WEBGL, false);

          _matrixWorld.world.GL.gl.texParameteri(_matrixWorld.world.GL.gl.TEXTURE_2D, _matrixWorld.world.GL.gl.TEXTURE_MAG_FILTER, _matrixWorld.world.GL.gl.NEAREST);

          _matrixWorld.world.GL.gl.texParameteri(_matrixWorld.world.GL.gl.TEXTURE_2D, _matrixWorld.world.GL.gl.TEXTURE_MIN_FILTER, _matrixWorld.world.GL.gl.NEAREST);

          _matrixWorld.world.GL.gl.texParameteri(_matrixWorld.world.GL.gl.TEXTURE_2D, _matrixWorld.world.GL.gl.TEXTURE_WRAP_S, _matrixWorld.world.GL.gl.CLAMP_TO_EDGE);

          _matrixWorld.world.GL.gl.texParameteri(_matrixWorld.world.GL.gl.TEXTURE_2D, _matrixWorld.world.GL.gl.TEXTURE_WRAP_T, _matrixWorld.world.GL.gl.CLAMP_TO_EDGE); // -- Allocate storage for the texture
          //world.GL.gl.texStorage2D(world.GL.gl.TEXTURE_2D, 1, world.GL.gl.RGB8, 512, 512);
          //world.GL.gl.texSubImage2D(world.GL.gl.TEXTURE_2D, 0, 0, 0, world.GL.gl.RGB, world.GL.gl.UNSIGNED_BYTE, image);
          //world.GL.gl.generateMipmap(world.GL.gl.TEXTURE_2D);


          _matrixWorld.world.GL.gl.uniform1i(object.shaderProgram.samplerUniform, t);
        }
      } // world.GL.gl.uniform1i(object.shaderProgram.samplerUniform, 0);


      localLooper = localLooper + 1;
    } else {// world.GL.gl.disableVertexAttribArray(object.shaderProgram.textureCoordAttribute);
    }
  } // Normals
  //  world.GL.gl.bindBuffer(world.GL.gl.ARRAY_BUFFER, object.mesh.normalBuffer);
  //  world.GL.gl.vertexAttribPointer(object.shaderProgram.vertexNormalAttribute, object.mesh.normalBuffer.itemSize, world.GL.gl.FLOAT, false, 0, 0);


  _matrixWorld.world.GL.gl.bindBuffer(_matrixWorld.world.GL.gl.ELEMENT_ARRAY_BUFFER, object.mesh.indexBuffer);

  if (object.glBlend.blendEnabled == true) {
    if (!_matrixWorld.world.GL.gl.isEnabled(_matrixWorld.world.GL.gl.BLEND)) {
      // world.GL.gl.disable(world.GL.gl.DEPTH_TEST);
      _matrixWorld.world.GL.gl.enable(_matrixWorld.world.GL.gl.BLEND);
    }

    _matrixWorld.world.GL.gl.blendFunc(_matrixWorld.world.GL.gl[object.glBlend.blendParamSrc], _matrixWorld.world.GL.gl[object.glBlend.blendParamDest]);
  } else {
    _matrixWorld.world.GL.gl.disable(_matrixWorld.world.GL.gl.BLEND);

    _matrixWorld.world.GL.gl.enable(_matrixWorld.world.GL.gl.DEPTH_TEST);
  }

  this.setMatrixUniforms(object, this.pMatrix, object.mvMatrix);

  _matrixWorld.world.disableUnusedAttr(_matrixWorld.world.GL.gl, 3);

  _matrixWorld.world.GL.gl.drawElements(_matrixWorld.world.GL.gl[object.glDrawElements.mode], object.glDrawElements.numberOfIndicesRender, _matrixWorld.world.GL.gl.UNSIGNED_SHORT, 0);

  this.mvPopMatrix(object.mvMatrix, this.mvMatrixStack);
};

_manifest.default.operation.draws.drawSquareTex = function (object) {
  var lighting = true; // eslint-disable-next-line no-unused-vars

  var localLooper = 0;
  mat4.identity(object.mvMatrix);
  this.mvPushMatrix(object.mvMatrix, this.mvMatrixStack);

  if (_manifest.default.camera.FirstPersonController == true) {
    _events.camera.setCamera(object);
  } else if (_manifest.default.camera.SceneController == true) {
    _events.camera.setSceneCamera(object);
  }

  mat4.translate(object.mvMatrix, object.mvMatrix, object.position.worldLocation);
  if (raycaster.checkingProcedureCalc) raycaster.checkingProcedureCalc(object);
  mat4.rotate(object.mvMatrix, object.mvMatrix, degToRad(object.rotation.rz), object.rotation.getRotDirZ());
  mat4.rotate(object.mvMatrix, object.mvMatrix, degToRad(object.rotation.rx), object.rotation.getRotDirX());
  mat4.rotate(object.mvMatrix, object.mvMatrix, degToRad(object.rotation.ry), object.rotation.getRotDirY()); // V

  if (object.vertexPositionBuffer) {
    _matrixWorld.world.GL.gl.bindBuffer(_matrixWorld.world.GL.gl.ARRAY_BUFFER, object.vertexPositionBuffer);

    if (object.geometry.dynamicBuffer == true) {
      _matrixWorld.world.GL.gl.bufferData(_matrixWorld.world.GL.gl.ARRAY_BUFFER, object.geometry.vertices, _matrixWorld.world.GL.gl.STATIC_DRAW);
    }

    _matrixWorld.world.GL.gl.vertexAttribPointer(object.shaderProgram.vertexPositionAttribute, object.vertexPositionBuffer.itemSize, _matrixWorld.world.GL.gl.FLOAT, false, 0, 0);

    _matrixWorld.world.GL.gl.enableVertexAttribArray(object.shaderProgram.vertexPositionAttribute);

    localLooper = localLooper + 1;
  } // C


  if (object.vertexColorBuffer) {
    _matrixWorld.world.GL.gl.bindBuffer(_matrixWorld.world.GL.gl.ARRAY_BUFFER, object.vertexColorBuffer);

    _matrixWorld.world.GL.gl.vertexAttribPointer(object.shaderProgram.vertexColorAttribute, object.vertexColorBuffer.itemSize, _matrixWorld.world.GL.gl.FLOAT, false, 0, 0);

    _matrixWorld.world.GL.gl.enableVertexAttribArray(object.shaderProgram.vertexColorAttribute);

    localLooper = localLooper + 1;
  } // L


  if (lighting && object.shaderProgram.useLightingUniform) {
    _matrixWorld.world.GL.gl.uniform1i(object.shaderProgram.useLightingUniform, lighting);
    /* Set the normals */


    if (object.vertexNormalBuffer) {
      _matrixWorld.world.GL.gl.bindBuffer(_matrixWorld.world.GL.gl.ARRAY_BUFFER, object.vertexNormalBuffer);

      _matrixWorld.world.GL.gl.vertexAttribPointer(object.shaderProgram.vertexNormalAttribute, object.vertexNormalBuffer.itemSize, _matrixWorld.world.GL.gl.FLOAT, false, 0, 0);

      _matrixWorld.world.GL.gl.enableVertexAttribArray(object.shaderProgram.vertexNormalAttribute);

      localLooper = localLooper + 1;
    }
    /* Ambient light - posible deplaced */


    if (object.shaderProgram.ambientColorUniform) {
      if ((0, _utility.E)('ambLight') && (0, _utility.E)('ambLight').color) {
        _matrixWorld.world.GL.gl.uniform3f(object.shaderProgram.ambientColorUniform, parseFloat((0, _utility.E)('ambLight').color.rgb[0]), parseFloat((0, _utility.E)('ambLight').color.rgb[1]), parseFloat((0, _utility.E)('ambLight').color.rgb[2]));
      } else {
        _matrixWorld.world.GL.gl.uniform3f(object.shaderProgram.ambientColorUniform, object.LightsData.ambientLight.r, object.LightsData.ambientLight.g, object.LightsData.ambientLight.b);
      }
    }
    /* Directional light */


    if (object.shaderProgram.directionalColorUniform) {
      if ((0, _utility.E)('dirLight') && (0, _utility.E)('dirLight').color) {
        _matrixWorld.world.GL.gl.uniform3f(object.shaderProgram.directionalColorUniform, parseFloat((0, _utility.E)('dirLight').color.rgb[0]), parseFloat((0, _utility.E)('dirLight').color.rgb[1]), parseFloat((0, _utility.E)('dirLight').color.rgb[2]));
      } else {
        _matrixWorld.world.GL.gl.uniform3f(object.shaderProgram.directionalColorUniform, object.LightsData.directionLight.R(), object.LightsData.directionLight.G(), object.LightsData.directionLight.B());
      }
    }
    /* Normalize the direction */


    var lightingDirection = null;

    if (object.shaderProgram.lightingDirectionUniform) {
      if ((0, _utility.E)('dirX') && (0, _utility.E)('dirY') && (0, _utility.E)('dirZ')) {
        lightingDirection = [parseFloat((0, _utility.E)('dirX').value), parseFloat((0, _utility.E)('dirY').value), parseFloat((0, _utility.E)('dirZ').value)];
      } else {
        lightingDirection = [object.LightsData.lightingDirection.r, object.LightsData.lightingDirection.g, object.LightsData.lightingDirection.b];
      }

      var adjustedLD = vec3.create();
      vec3.normalize(adjustedLD, lightingDirection);
      vec3.scale(adjustedLD, adjustedLD, -1);

      _matrixWorld.world.GL.gl.uniform3fv(object.shaderProgram.lightingDirectionUniform, adjustedLD);
    }
  } else {
    if (object.shaderProgram.useLightingUniform) {
      if (object.shaderProgram.ambientColorUniform) {
        _matrixWorld.world.GL.gl.uniform3f(object.shaderProgram.ambientColorUniform, parseFloat(1), parseFloat(2), parseFloat(0));
      }

      if (object.shaderProgram.directionalColorUniform) {
        _matrixWorld.world.GL.gl.uniform3f(object.shaderProgram.directionalColorUniform, parseFloat(1), parseFloat(0), parseFloat(0));
      }
    }
  } // T


  if (object.vertexTexCoordBuffer) {
    _matrixWorld.world.GL.gl.bindBuffer(_matrixWorld.world.GL.gl.ARRAY_BUFFER, object.vertexTexCoordBuffer);

    if (object.geometry.dynamicBuffer == true) {
      _matrixWorld.world.GL.gl.bufferData(_matrixWorld.world.GL.gl.ARRAY_BUFFER, object.geometry.texCoords, _matrixWorld.world.GL.gl.STATIC_DRAW);
    }

    _matrixWorld.world.GL.gl.vertexAttribPointer(object.shaderProgram.textureCoordAttribute, object.vertexTexCoordBuffer.itemSize, _matrixWorld.world.GL.gl.FLOAT, false, 0, 0);

    _matrixWorld.world.GL.gl.enableVertexAttribArray(object.shaderProgram.textureCoordAttribute);

    if (object.streamTextures != null) {
      // video/webcam tex
      _manifest.default.tools.loadVideoTexture('glVideoTexture', object.streamTextures.videoImage);

      _matrixWorld.world.GL.gl.uniform1i(object.shaderProgram.samplerUniform, 0);
    } else {
      for (var t = 0; t < object.textures.length; t++) {
        if (object.custom.gl_texture == null) {
          _matrixWorld.world.GL.gl.activeTexture(_matrixWorld.world.GL.gl['TEXTURE' + t]);

          _matrixWorld.world.GL.gl.bindTexture(_matrixWorld.world.GL.gl.TEXTURE_2D, object.textures[t]);

          _matrixWorld.world.GL.gl.pixelStorei(_matrixWorld.world.GL.gl.UNPACK_FLIP_Y_WEBGL, false);

          _matrixWorld.world.GL.gl.texParameteri(_matrixWorld.world.GL.gl.TEXTURE_2D, _matrixWorld.world.GL.gl.TEXTURE_MAG_FILTER, _matrixWorld.world.GL.gl.NEAREST);

          _matrixWorld.world.GL.gl.texParameteri(_matrixWorld.world.GL.gl.TEXTURE_2D, _matrixWorld.world.GL.gl.TEXTURE_MIN_FILTER, _matrixWorld.world.GL.gl.NEAREST);

          _matrixWorld.world.GL.gl.texParameteri(_matrixWorld.world.GL.gl.TEXTURE_2D, _matrixWorld.world.GL.gl.TEXTURE_WRAP_S, _matrixWorld.world.GL.gl.CLAMP_TO_EDGE);

          _matrixWorld.world.GL.gl.texParameteri(_matrixWorld.world.GL.gl.TEXTURE_2D, _matrixWorld.world.GL.gl.TEXTURE_WRAP_T, _matrixWorld.world.GL.gl.CLAMP_TO_EDGE); // -- Allocate storage for the texture
          //world.GL.gl.texStorage2D(world.GL.gl.TEXTURE_2D, 1, world.GL.gl.RGB8, 512, 512);
          //world.GL.gl.texSubImage2D(world.GL.gl.TEXTURE_2D, 0, 0, 0, world.GL.gl.RGB, world.GL.gl.UNSIGNED_BYTE, image);
          //world.GL.gl.generateMipmap(world.GL.gl.TEXTURE_2D);
          // ori world.GL.gl.uniform1i(object.shaderProgram.samplerUniform, t);


          var nothing = _matrixWorld.world.GL.gl.uniform1i(object.shaderProgram['samplerUniform' + t], t);
        } else {
          object.custom.gl_texture(object, t);
        }
      }
    }

    localLooper = localLooper + 1;
  }

  _matrixWorld.world.GL.gl.bindBuffer(_matrixWorld.world.GL.gl.ELEMENT_ARRAY_BUFFER, object.vertexIndexBuffer);

  _matrixWorld.world.setMatrixUniforms(object, this.pMatrix, object.mvMatrix);

  if (object.vertexNormalBuffer && object.shaderProgram.nMatrixUniform) {
    var normalMatrix = mat3.create();
    mat3.normalFromMat4(normalMatrix, object.mvMatrix);
    mat3.transpose(normalMatrix, normalMatrix);

    _matrixWorld.world.GL.gl.uniformMatrix3fv(object.shaderProgram.nMatrixUniform, false, normalMatrix);
  } // world.disableUnusedAttr( world.GL.gl, localLooper);


  _matrixWorld.world.disableUnusedAttr(_matrixWorld.world.GL.gl, 4);

  if (object.glBlend.blendEnabled == true) {
    if (!_matrixWorld.world.GL.gl.isEnabled(_matrixWorld.world.GL.gl.BLEND)) {
      // world.GL.gl.disable(world.GL.gl.DEPTH_TEST);
      _matrixWorld.world.GL.gl.enable(_matrixWorld.world.GL.gl.BLEND);
    }

    try {
      _matrixWorld.world.GL.gl.blendFunc(_matrixWorld.world.GL.gl[object.glBlend.blendParamSrc], _matrixWorld.world.GL.gl[object.glBlend.blendParamDest]);
    } catch (e) {
      console.log(e);
    }
  } else {
    _matrixWorld.world.GL.gl.disable(_matrixWorld.world.GL.gl.BLEND);

    _matrixWorld.world.GL.gl.enable(_matrixWorld.world.GL.gl.DEPTH_TEST);
  } // shadows


  if (object.shadows) {
    // console.log(" SHADOWS -> " , object.shadows)
    // Set the color to use
    // world.GL.gl.uniform4fv(object.shaderProgram.colorLocation, [0.2, 1, 0.2, 1]); // green
    // set the light position
    _matrixWorld.world.GL.gl.uniform3fv(object.shaderProgram.lightWorldPositionLocation, object.shadows.lightPosition); // set the camera/view position
    //gl.uniform3fv(object.shaderProgram.viewWorldPositionLocation, camera);
    // set the shininess


    _matrixWorld.world.GL.gl.uniform1f(object.shaderProgram.shininessLocation, object.shadows.shininess);

    var target = [0, 35, 0]; //object.position.worldLocation

    var up = [0, 1, 0]; // set the spotlight uniforms

    {
      var lmat = [0, 0, -1];
      lmat = mat4.lookAt(lmat, target, up, [0, 0, -1]);
      lmat = mat4.multiply(mat4.fromXRotation(object.shadows.lightRotationX), lmat);
      lmat = mat4.multiply(mat4.fromXRotation(object.shadows.lightRotationY), lmat); // get the zAxis from the matrix
      // negate it because lookAt looks down the -Z axis

      object.shadows.lightDirection = [-lmat[8], -lmat[9], -lmat[10]]; // object.shadows.lightDirection = [-0, -0, -1];
    }

    _matrixWorld.world.GL.gl.uniform3fv(object.shaderProgram.lightDirectionLocation, object.shadows.lightDirection);

    _matrixWorld.world.GL.gl.uniform1f(object.shaderProgram.innerLimitLocation, Math.cos(object.shadows.innerLimit));

    _matrixWorld.world.GL.gl.uniform1f(object.shaderProgram.outerLimitLocation, Math.cos(object.shadows.outerLimit));
  }

  _matrixWorld.world.GL.gl.drawElements(_matrixWorld.world.GL.gl[object.glDrawElements.mode], object.glDrawElements.numberOfIndicesRender, _matrixWorld.world.GL.gl.UNSIGNED_SHORT, 0);

  object.instancedDraws.overrideDrawArraysInstance(object);
  this.mvPopMatrix(object.mvMatrix, this.mvMatrixStack);
};

_manifest.default.operation.draws.sphere = function (object) {
  var lighting = true;
  var localLooper = 0;
  mat4.identity(object.mvMatrix);
  this.mvPushMatrix(object.mvMatrix, this.mvMatrixStack);

  if (_manifest.default.camera.FirstPersonController == true) {
    _events.camera.setCamera(object);
  } else if (_manifest.default.camera.SceneController == true) {
    _events.camera.setSceneCamera(object);
  }

  mat4.translate(object.mvMatrix, object.mvMatrix, object.position.worldLocation);
  mat4.rotate(object.mvMatrix, object.mvMatrix, degToRad(object.rotation.rx), object.rotation.getRotDirX());
  mat4.rotate(object.mvMatrix, object.mvMatrix, degToRad(object.rotation.ry), object.rotation.getRotDirY());
  mat4.rotate(object.mvMatrix, object.mvMatrix, degToRad(object.rotation.rz), object.rotation.getRotDirZ()); // V

  if (object.vertexPositionBuffer) {
    _matrixWorld.world.GL.gl.bindBuffer(_matrixWorld.world.GL.gl.ARRAY_BUFFER, object.vertexPositionBuffer);

    if (object.geometry.dynamicBuffer == true) {
      _matrixWorld.world.GL.gl.bufferData(_matrixWorld.world.GL.gl.ARRAY_BUFFER, object.geometry.vertices, _matrixWorld.world.GL.gl.STATIC_DRAW);
    }

    _matrixWorld.world.GL.gl.vertexAttribPointer(object.shaderProgram.vertexPositionAttribute, object.vertexPositionBuffer.itemSize, _matrixWorld.world.GL.gl.FLOAT, false, 0, 0);

    _matrixWorld.world.GL.gl.enableVertexAttribArray(object.shaderProgram.vertexPositionAttribute);

    localLooper = localLooper + 1;
  } // C


  if (object.vertexColorBuffer) {
    _matrixWorld.world.GL.gl.bindBuffer(_matrixWorld.world.GL.gl.ARRAY_BUFFER, object.vertexColorBuffer);

    _matrixWorld.world.GL.gl.vertexAttribPointer(object.shaderProgram.vertexColorAttribute, object.vertexColorBuffer.itemSize, _matrixWorld.world.GL.gl.FLOAT, false, 0, 0);

    _matrixWorld.world.GL.gl.enableVertexAttribArray(object.shaderProgram.vertexColorAttribute);

    localLooper = localLooper + 1;
  } // LIGHT


  if (lighting && object.shaderProgram.useLightingUniform) {
    _matrixWorld.world.GL.gl.uniform1i(object.shaderProgram.useLightingUniform, lighting);
    /* Set the normals */


    if (object.vertexNormalBuffer) {
      _matrixWorld.world.GL.gl.bindBuffer(_matrixWorld.world.GL.gl.ARRAY_BUFFER, object.vertexNormalBuffer);

      _matrixWorld.world.GL.gl.vertexAttribPointer(object.shaderProgram.vertexNormalAttribute, object.vertexNormalBuffer.itemSize, _matrixWorld.world.GL.gl.FLOAT, false, 0, 0);

      _matrixWorld.world.GL.gl.enableVertexAttribArray(object.shaderProgram.vertexNormalAttribute);

      localLooper = localLooper + 1;
    }
    /* Set the ambient light */


    if (object.shaderProgram.ambientColorUniform) {
      if ((0, _utility.E)('ambLight') && (0, _utility.E)('ambLight').color) {
        _matrixWorld.world.GL.gl.uniform3f(object.shaderProgram.ambientColorUniform, parseFloat((0, _utility.E)('ambLight').color.rgb[0]), parseFloat((0, _utility.E)('ambLight').color.rgb[1]), parseFloat((0, _utility.E)('ambLight').color.rgb[2]));
      } else {
        _matrixWorld.world.GL.gl.uniform3f(object.shaderProgram.ambientColorUniform, object.LightsData.ambientLight.r, object.LightsData.ambientLight.g, object.LightsData.ambientLight.b);
      }
    }
    /* Set the directional light */


    if (object.shaderProgram.directionalColorUniform) {
      if ((0, _utility.E)('dirLight') && (0, _utility.E)('dirLight').color) {
        _matrixWorld.world.GL.gl.uniform3f(object.shaderProgram.directionalColorUniform, parseFloat((0, _utility.E)('dirLight').color.rgb[0]), parseFloat((0, _utility.E)('dirLight').color.rgb[1]), parseFloat((0, _utility.E)('dirLight').color.rgb[2]));
      } else {
        _matrixWorld.world.GL.gl.uniform3f(object.shaderProgram.directionalColorUniform, object.LightsData.directionLight.R(), object.LightsData.directionLight.G(), object.LightsData.directionLight.B());
      }
    }
    /* Normalize the direction */


    var lightingDirection = null;

    if (object.shaderProgram.lightingDirectionUniform) {
      if ((0, _utility.E)('dirX') && (0, _utility.E)('dirY') && (0, _utility.E)('dirZ')) {
        lightingDirection = [parseFloat((0, _utility.E)('dirX').value), parseFloat((0, _utility.E)('dirY').value), parseFloat((0, _utility.E)('dirZ').value)];
      } else {
        lightingDirection = [object.LightsData.lightingDirection.r, object.LightsData.lightingDirection.g, object.LightsData.lightingDirection.b];
      }

      var adjustedLD = vec3.create();
      vec3.normalize(adjustedLD, lightingDirection);
      vec3.scale(adjustedLD, adjustedLD, -1);

      _matrixWorld.world.GL.gl.uniform3fv(object.shaderProgram.lightingDirectionUniform, adjustedLD);
    }
  } else {
    if (object.shaderProgram.useLightingUniform) {
      if (object.shaderProgram.ambientColorUniform) {
        _matrixWorld.world.GL.gl.uniform3f(object.shaderProgram.ambientColorUniform, parseFloat(0.2), parseFloat(0.2), parseFloat(0.2));
      }

      if (object.shaderProgram.directionalColorUniform) {
        _matrixWorld.world.GL.gl.uniform3f(object.shaderProgram.directionalColorUniform, parseFloat(1), parseFloat(0), parseFloat(0));
      }
    }
  } // T


  if (object.vertexTexCoordBuffer) {
    _matrixWorld.world.GL.gl.bindBuffer(_matrixWorld.world.GL.gl.ARRAY_BUFFER, object.vertexTexCoordBuffer);

    if (object.geometry.dynamicBuffer == true) {
      _matrixWorld.world.GL.gl.bufferData(_matrixWorld.world.GL.gl.ARRAY_BUFFER, object.geometry.texCoords, _matrixWorld.world.GL.gl.STATIC_DRAW);
    }

    _matrixWorld.world.GL.gl.vertexAttribPointer(object.shaderProgram.textureCoordAttribute, object.vertexTexCoordBuffer.itemSize, _matrixWorld.world.GL.gl.FLOAT, false, 0, 0);

    _matrixWorld.world.GL.gl.enableVertexAttribArray(object.shaderProgram.textureCoordAttribute);

    if (object.streamTextures != null) {
      _manifest.default.tools.loadVideoTexture('glVideoTexture', object.streamTextures.videoImage);

      _matrixWorld.world.GL.gl.uniform1i(object.shaderProgram.samplerUniform, 0);
    } else {
      for (var t = 0; t < object.textures.length; t++) {
        _matrixWorld.world.GL.gl.activeTexture(_matrixWorld.world.GL.gl['TEXTURE' + t]);

        _matrixWorld.world.GL.gl.bindTexture(_matrixWorld.world.GL.gl.TEXTURE_2D, object.textures[t]);

        _matrixWorld.world.GL.gl.pixelStorei(_matrixWorld.world.GL.gl.UNPACK_FLIP_Y_WEBGL, false);

        _matrixWorld.world.GL.gl.texParameteri(_matrixWorld.world.GL.gl.TEXTURE_2D, _matrixWorld.world.GL.gl.TEXTURE_MAG_FILTER, _matrixWorld.world.GL.gl.LINEAR);

        _matrixWorld.world.GL.gl.texParameteri(_matrixWorld.world.GL.gl.TEXTURE_2D, _matrixWorld.world.GL.gl.TEXTURE_MIN_FILTER, _matrixWorld.world.GL.gl.LINEAR);

        _matrixWorld.world.GL.gl.texParameteri(_matrixWorld.world.GL.gl.TEXTURE_2D, _matrixWorld.world.GL.gl.TEXTURE_WRAP_S, _matrixWorld.world.GL.gl.CLAMP_TO_EDGE);

        _matrixWorld.world.GL.gl.texParameteri(_matrixWorld.world.GL.gl.TEXTURE_2D, _matrixWorld.world.GL.gl.TEXTURE_WRAP_T, _matrixWorld.world.GL.gl.CLAMP_TO_EDGE);

        _matrixWorld.world.GL.gl.uniform1i(object.shaderProgram.samplerUniform, t);
      }
    }

    localLooper = localLooper + 1;
  }

  _matrixWorld.world.GL.gl.bindBuffer(_matrixWorld.world.GL.gl.ELEMENT_ARRAY_BUFFER, object.vertexIndexBuffer);

  if (object.vertexNormalBuffer && object.shaderProgram.nMatrixUniform) {
    var normalMatrix = mat3.create();
    mat3.normalFromMat4(normalMatrix, object.mvMatrix);
    mat3.transpose(normalMatrix, normalMatrix);

    _matrixWorld.world.GL.gl.uniformMatrix3fv(object.shaderProgram.nMatrixUniform, false, normalMatrix);
  }

  try {
    _matrixWorld.world.GL.gl.useProgram(object.shaderProgram);

    _matrixWorld.world.GL.gl.uniform1i(object.shaderProgram.uniformTime, 0.1);
  } catch (e) {
    console.warn('WTF - ERROR10001');
  }

  _matrixWorld.world.disableUnusedAttr(_matrixWorld.world.GL.gl, localLooper);

  if (object.glBlend.blendEnabled == true) {
    if (!_matrixWorld.world.GL.gl.isEnabled(_matrixWorld.world.GL.gl.BLEND)) {
      _matrixWorld.world.GL.gl.enable(_matrixWorld.world.GL.gl.BLEND);
    }

    _matrixWorld.world.GL.gl.blendFunc(_matrixWorld.world.GL.gl[object.glBlend.blendParamSrc], _matrixWorld.world.GL.gl[object.glBlend.blendParamDest]);
  } else {
    _matrixWorld.world.GL.gl.disable(_matrixWorld.world.GL.gl.BLEND);

    _matrixWorld.world.GL.gl.enable(_matrixWorld.world.GL.gl.DEPTH_TEST);
  }

  _matrixWorld.world.setMatrixUniforms(object, this.pMatrix, object.mvMatrix);

  _matrixWorld.world.GL.gl.drawElements(_matrixWorld.world.GL.gl[object.glDrawElements.mode], object.glDrawElements.numberOfIndicesRender, _matrixWorld.world.GL.gl.UNSIGNED_SHORT, 0);

  object.instancedDraws.overrideDrawArraysInstance(object);
  this.mvPopMatrix(object.mvMatrix, this.mvMatrixStack);
};

var drawsOperation = _manifest.default.operation.draws;
var _default = drawsOperation;
exports.default = _default;

},{"../program/manifest":25,"./events":5,"./matrix-world":17,"./raycast":19,"./utility":20}],10:[function(require,module,exports){
/* eslint-disable no-redeclare */

/* eslint-disable no-unused-vars */
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.COLOR = COLOR;
exports.COLOR_ALPHA = COLOR_ALPHA;
exports.ring = ring;
exports.customVertex_1 = exports.customVertex = exports.sphereVertex = exports.PiramideVertex = exports.GeoOfColor = exports.CubeVertex = exports.SquareVertex = exports.TriangleVertex = exports.Position = exports.RotationVector = exports.Point = exports.Scale = void 0;

var _manifest = _interopRequireDefault(require("../program/manifest"));

var _utility = require("./utility");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Scale {
  constructor() {
    this.x = 1;
    this.y = 1;
    this.z = 1;
  }

  LinearScale(scale_) {
    this.x = scale_;
    this.y = scale_;
    this.z = scale_;
  }

}

exports.Scale = Scale;

class Point {
  constructor(x, y, z) {
    if (typeof z == "undefined") {
      z = 0;
    }

    this.x = x;
    this.y = y;
    this.z = z;
    this.scale = new Scale();
  }

  get X() {
    return parseFloat(this.x * this.scale.x);
  }

  get Y() {
    return parseFloat(this.y * this.scale.y);
  }

  get Z() {
    return parseFloat(this.z * this.scale.z);
  }

}

exports.Point = Point;

class RotationVector {
  constructor(x, y, z, rotx, roty, rotz) {
    if (typeof x == "undefined") {
      x = 0;
    }

    if (typeof y == "undefined") {
      y = 0;
    }

    if (typeof z == "undefined") {
      z = 0;
    }

    if (typeof rotx == "undefined") {
      rotx = 0;
    }

    if (typeof roty == "undefined") {
      roty = 0;
    }

    if (typeof rotz == "undefined") {
      rotz = 0;
    }

    this.x = x;
    this.y = y;
    this.z = z;
    this.rotx = rotx;
    this.roty = roty;
    this.rotz = rotz;
    /**
     * Active rotation without writing code from
     * top level. Just sutup values > 0
     */

    this.rotationSpeed = {
      x: 0,
      y: 0,
      z: 0
    };
    return this;
  }

  get rotSpeedX() {
    return this.rotationSpeed.x;
  }

  get rotSpeedY() {
    return this.rotationSpeed.y;
  }

  get rotSpeedZ() {
    return this.rotationSpeed.z;
  }

  get X() {
    return this.x;
  }

  get Y() {
    return this.y;
  }

  get Z() {
    return this.z;
  }

  get RotationVector() {
    return [this.x, this.y, this.z];
  }

  SetDirection(x_, y_, z_) {
    this.x = x_;
    this.y = y_;
    this.z = z_;
    return [this.x, this.y, this.z];
  }

  getRotDirX() {
    return [1, 0, 0];
  }

  getRotDirY() {
    return [0, 1, 0];
  }

  getRotDirZ() {
    return [0, 0, 1];
  }

  SetDirectionX() {
    this.x = 1;
    this.y = 0;
    this.z = 0;
  }

  SetDirectionY() {
    this.x = 0;
    this.y = 1;
    this.z = 0;
  }

  SetDirectionZ() {
    this.x = 0;
    this.y = 0;
    this.z = 1;
  }

  SetDirectionXY() {
    this.x = 1;
    this.y = 1;
    this.z = 0;
  }

  SetDirectionXZ() {
    this.x = 1;
    this.y = 0;
    this.z = 1;
  }

  SetDirectionYZ() {
    this.x = 0;
    this.y = 1;
    this.z = 1;
  }

  rotateX(x) {
    this.rotx = x;
  }

  rotateY(y) {
    this.roty = y;
  }

  rotateZ(z) {
    this.rotz = z;
  }

  get rx() {
    return this.rotx;
  }

  get ry() {
    return this.roty;
  }

  get rz() {
    return this.rotz;
  }

}
/**
 * @description Base class
 */


exports.RotationVector = RotationVector;

class Position {
  constructor(x, y, z) {
    if (typeof x == 'undefined') {
      x = 0;
    }

    if (typeof y == 'undefined') {
      y = 0;
    }

    if (typeof z == 'undefined') {
      z = 0;
    }

    this.x = x;
    this.y = y;
    this.z = z;
    this.velY = 0;
    this.velX = 0;
    this.velZ = 0;
    this.inMove = false;
    this.targetX = x;
    this.targetY = y;
    this.targetZ = z;
    this.thrust = 0.01;
    return this;
  }

  setSpeed(n) {
    if (typeof n === 'number') {
      this.thrust = n;
    } else {
      SYS.DEBUG.WARNING('Description: arguments (w, h) must be type of number.');
    }
  }

  translateByX = function (x) {
    this.inMove = true;
    this.targetX = x;
  };

  translateByY(y) {
    this.inMove = true;
    this.targetY = y;
  }

  translateByZ(z) {
    this.inMove = true;
    this.targetZ = z;
  }

  translateByXY(x, y) {
    this.inMove = true;
    this.targetX = x;
    this.targetY = y;
  }

  translateByXZ(x, z) {
    this.inMove = true;
    this.targetX = x;
    this.targetZ = z;
  }

  translateByYZ(y, z) {
    this.inMove = true;
    this.targetY = y;
    this.targetZ = z;
  }

  onTargetPositionReach() {}

  update() {
    var tx = this.targetX - this.x,
        ty = this.targetY - this.y,
        tz = this.targetZ - this.z,
        dist = Math.sqrt(tx * tx + ty * ty + tz * tz); // rad = Math.atan2(ty, tx),
    // angle = (rad / Math.PI) * 180;

    this.velX = tx / dist * this.thrust;
    this.velY = ty / dist * this.thrust;
    this.velZ = tz / dist * this.thrust;

    if (this.inMove == true) {
      if (dist > this.thrust) {
        this.x += this.velX;
        this.y += this.velY;
        this.z += this.velZ;
      } else {
        this.x = this.targetX;
        this.y = this.targetY;
        this.z = this.targetZ;
        this.inMove = false;
        this.onTargetPositionReach();
      }
    }
  }

  get worldLocation() {
    return [this.x, this.y, this.z];
  }

  SetX(newx) {
    this.x = newx;
    this.targetX = newx;
    this.inMove = false;
  }

  SetY(newy) {
    this.y = newy;
    this.targetY = newy;
    this.inMove = false;
  }

  SetZ(newz) {
    this.z = newz;
    this.targetZ = newz;
    this.inMove = false;
  }

  setPosition(newx, newy, newz) {
    this.x = newx;
    this.y = newy;
    this.z = newz;
    this.targetX = newx;
    this.targetY = newy;
    this.targetZ = newz;
    this.inMove = false;
  }

}

exports.Position = Position;

class TriangleVertex {
  constructor(root) {
    this.root = root;
    this.size = root.size;
    this.dynamicBuffer = _manifest.default.dynamicBuffer;
    this.pointA = new Point(0.0, 1, 0.0);
    this.pointB = new Point(-1, -1, 0);
    this.pointC = new Point(1, -1, 0);
  }

  get vertices() {
    return new Float32Array([this.pointA.X, this.pointA.Y * this.root.size, this.pointA.Z, this.pointB.X * this.root.size, this.pointB.Y * this.root.size, this.pointB.Z, this.pointC.X * this.root.size, this.pointC.Y * this.root.size, this.pointC.Z]);
  }

  get indices() {
    return [0, 1, 2];
  }

  setScale(scale) {
    this.size = scale;
    if (this.dynamicBuffer == true) return;

    _manifest.default.operation.triangle_buffer_procedure(this.root);

    return "dynamicBuffer is false but i will update vertex array prototypical.";
  }

}

exports.TriangleVertex = TriangleVertex;

class SquareVertex {
  constructor(root) {
    this.root = root;
    this.size = root.size;
    this.pointA = new Point(1, 1, 0);
    this.pointB = new Point(-1, 1, 0);
    this.pointC = new Point(1, -1, 0);
    this.pointD = new Point(-1, -1, 0);
    this.dynamicBuffer = true;
    this.texCoordsPoints = {
      right_top: new Point(1.0, 1.0, 0),
      left_top: new Point(0.0, 1.0, 0),
      right_bottom: new Point(1.0, 0.0, 0),
      left_bottom: new Point(0.0, 0.0, 0)
    };
    this.colorData = {};
    this.colorData.parent = this.root; // default

    this.colorData.color = [new COLOR_ALPHA(1.0, 0.0, 0.0, 1.0), new COLOR_ALPHA(0.0, 1.0, 0.0, 1.0), new COLOR_ALPHA(0.5, 0.0, 1.0, 1.0), new COLOR_ALPHA(0.5, 0.5, 1.0, 1.0)];
  }

  get vertices() {
    return new Float32Array([this.pointA.X * this.size, this.pointA.Y * this.size, this.pointA.Z, this.pointB.X * this.size, this.pointB.Y * this.size, this.pointB.Z, this.pointC.X * this.size, this.pointC.Y * this.size, this.pointC.Z, this.pointD.X * this.size, this.pointD.Y * this.size, this.pointD.Z]);
  }

  get texCoords() {
    return new Float32Array([this.texCoordsPoints.right_top.X, this.texCoordsPoints.right_top.Y, this.texCoordsPoints.left_top.X, this.texCoordsPoints.left_top.Y, this.texCoordsPoints.right_bottom.X, this.texCoordsPoints.right_bottom.Y, this.texCoordsPoints.left_bottom.X, this.texCoordsPoints.left_bottom.Y]);
  }

  get indices() {
    return [0, 1, 2, 3, 2, 1 // F
    ];
  } // Setters


  setTexCoordScaleFactor(newScaleFactror) {
    this.texCoordsPoints.right_top.y = 1 + newScaleFactror;
    this.texCoordsPoints.right_top.x = 1 + newScaleFactror;
    this.texCoordsPoints.left_bottom.x = 0 - newScaleFactror;
    this.texCoordsPoints.left_bottom.y = 0 - newScaleFactror;
    this.texCoordsPoints.left_top.x = 0 - newScaleFactror;
    this.texCoordsPoints.left_top.y = 1 + newScaleFactror;
    this.texCoordsPoints.right_bottom.x = 1 + newScaleFactror;
    this.texCoordsPoints.right_bottom.y = 0 - newScaleFactror;
  }

  setScaleByX(scale) {
    this.pointA.x = scale;
    this.pointB.x = -scale;
    this.pointC.x = scale;
    this.pointD.x = -scale;
    if (this.dynamicBuffer == true) return;

    _manifest.default.operation.square_buffer_procedure(this.root);

    return 'dynamicBuffer is false but i will update vertex array prototypical.';
  }

  setScaleByY(scale) {
    this.pointA.y = scale;
    this.pointB.y = scale;
    this.pointC.y = -scale;
    this.pointD.y = -scale;
    if (this.dynamicBuffer == true) return;

    _manifest.default.operation.square_buffer_procedure(this.root);

    return 'dynamicBuffer is false but i will update vertex array prototypical.';
  }

  setScale(scale) {
    this.size = scale;
    if (this.dynamicBuffer == true) return;

    _manifest.default.operation.square_buffer_procedure(this.root);

    return 'DynamicBuffer is false but i will update vertex array prototypical.';
  }

  get color() {
    var local = [];
    this.colorData.color.forEach(point => {
      local.push(point.r);
      local.push(point.g);
      local.push(point.b);
      local.push(point.ALPHA());
    });
    return new Float32Array(local);
  }

  setColorSolid(red, green, blue, a) {
    if (typeof a === 'undefined') {
      var a = 1;
    }

    this.colorData.color.forEach((point, index, arr) => {
      arr[index].r = red;
      arr[index].g = green;
      arr[index].b = blue;
      arr[index].a = a;
    });

    _manifest.default.operation.square_buffer_procedure(this.root);
  }

  setColorComponentRed(red) {
    this.colorData.color.forEach((point, index, arr) => {
      arr[index].r = red;
    });

    _manifest.default.operation.square_buffer_procedure(this.root);
  }

  setColorComponentGreen(green) {
    this.colorData.color.forEach((point, index, arr) => {
      arr[index].g = green;
    });

    _manifest.default.operation.square_buffer_procedure(this.root);
  }

  setColorComponentBlue(blue) {
    this.colorData.color.forEach((point, index, arr) => {
      arr[index].b = blue;
    });

    _manifest.default.operation.square_buffer_procedure(this.root);
  }

}

exports.SquareVertex = SquareVertex;

class CubeVertex {
  constructor(root) {
    this.root = root;
    this.size = root.size;
    this.basePoint = 1.0 * this.size;
    this.basePointNeg = -1.0 * this.size;
    this.dynamicBuffer = true;
    this.osciTest = new _utility.OSCILLATOR(0, 2, 0.002);
    this.texCoordsPoints = {
      front: {
        right_top: new Point(0.0, 0.0, 0),
        left_top: new Point(0.0, 1.0, 0),
        right_bottom: new Point(1.0, 1.0, 0),
        left_bottom: new Point(1.0, 0.0, 0)
      },
      back: {
        right_top: new Point(1.0, 1.0, 0),
        left_top: new Point(1.0, 0.0, 0),
        right_bottom: new Point(0.0, 0.0, 0),
        left_bottom: new Point(0.0, 1.0, 0)
      },
      top: {
        right_top: new Point(1.0, 0.0, 0),
        left_top: new Point(0.0, 0.0, 0),
        right_bottom: new Point(0.0, 1.0, 0),
        left_bottom: new Point(1.0, 1.0, 0)
      },
      bottom: {
        right_top: new Point(0.0, 0.0, 0),
        left_top: new Point(0.0, 1.0, 0),
        right_bottom: new Point(1.0, 1.0, 0),
        left_bottom: new Point(1.0, 0.0, 0)
      },
      right: {
        right_top: new Point(0.0, 0.0, 0),
        left_top: new Point(0.0, 1.0, 0),
        right_bottom: new Point(1.0, 1.0, 0),
        left_bottom: new Point(1.0, 0.0, 0)
      },
      left: {
        right_top: new Point(0.0, 0.0, 0),
        left_top: new Point(0.0, 1.0, 0),
        right_bottom: new Point(1.0, 1.0, 0),
        left_bottom: new Point(1.0, 0.0, 0)
      }
    }; // for scale by ori

    this.Front = {
      pointA: new Point(0, 0, 0),
      pointB: new Point(0, 0, 0),
      pointC: new Point(0, 0, 0),
      pointD: new Point(0, 0, 0)
    };
    this.Back = {
      pointA: new Point(0, 0, 0),
      pointB: new Point(0, 0, 0),
      pointC: new Point(0, 0, 0),
      pointD: new Point(0, 0, 0)
    };
    this.Top = {
      pointA: new Point(0, 0, 0),
      pointB: new Point(0, 0, 0),
      pointC: new Point(0, 0, 0),
      pointD: new Point(0, 0, 0)
    };
    this.Bottom = {
      pointA: new Point(0, 0, 0),
      pointB: new Point(0, 0, 0),
      pointC: new Point(0, 0, 0),
      pointD: new Point(0, 0, 0)
    };
    this.Right = {
      pointA: new Point(0, 0, 0),
      pointB: new Point(0, 0, 0),
      pointC: new Point(0, 0, 0),
      pointD: new Point(0, 0, 0)
    };
    this.Left = {
      pointA: new Point(0, 0, 0),
      pointB: new Point(0, 0, 0),
      pointC: new Point(0, 0, 0),
      pointD: new Point(0, 0, 0)
    };
    this.colorData = {};
    this.colorData.parent = this.root;
    this.colorData.Front = {
      pointA: new COLOR_ALPHA(1.0, 0.0, 0.0, 1.0),
      pointB: new COLOR_ALPHA(0.0, 1.0, 0.0, 1.0),
      pointC: new COLOR_ALPHA(0.0, 0.0, 1.0, 1.0),
      pointD: new COLOR_ALPHA(0.0, 0.0, 1.0, 1.0)
    };
    this.colorData.Back = {
      pointA: new COLOR_ALPHA(1.0, 0.0, 0.0, 1.0),
      pointB: new COLOR_ALPHA(0.0, 1.0, 0.0, 1.0),
      pointC: new COLOR_ALPHA(0.0, 0.0, 1.0, 1.0),
      pointD: new COLOR_ALPHA(0.0, 0.0, 1.0, 1.0)
    };
    this.colorData.Top = {
      pointA: new COLOR_ALPHA(0.0, 1.0, 0.0, 1.0),
      pointB: new COLOR_ALPHA(0.0, 1.0, 0.0, 1.0),
      pointC: new COLOR_ALPHA(0.0, 0.0, 1.0, 1.0),
      pointD: new COLOR_ALPHA(0.0, 0.0, 1.0, 1.0)
    };
    this.colorData.Bottom = {
      pointA: new COLOR_ALPHA(0.0, 1.0, 0.0, 1.0),
      pointB: new COLOR_ALPHA(0.0, 0.0, 1.0, 1.0),
      pointC: new COLOR_ALPHA(0.0, 1.0, 0.0, 1.0),
      pointD: new COLOR_ALPHA(0.0, 0.0, 1.0, 1.0)
    };
    this.colorData.Right = {
      pointA: new COLOR_ALPHA(1.0, 0.0, 0.0, 1.0),
      pointB: new COLOR_ALPHA(0.0, 0.0, 1.0, 1.0),
      pointC: new COLOR_ALPHA(0.0, 1.0, 0.0, 1.0),
      pointD: new COLOR_ALPHA(0.0, 0.0, 1.0, 1.0)
    };
    this.colorData.Left = {
      pointA: new COLOR_ALPHA(1.0, 0.0, 0.0, 1.0),
      pointB: new COLOR_ALPHA(0.0, 0.0, 1.0, 1.0),
      pointC: new COLOR_ALPHA(0.0, 1.0, 0.0, 1.0),
      pointD: new COLOR_ALPHA(0.0, 0.0, 1.0, 1.0)
    };

    this.colorData.SetRedForAll = function (red_) {
      this.Front.pointA.r = red_;
      this.Front.pointB.r = red_;
      this.Front.pointC.r = red_;
      this.Front.pointD.r = red_;
      this.Right.pointA.r = red_;
      this.Right.pointB.r = red_;
      this.Right.pointC.r = red_;
      this.Right.pointD.r = red_;
      this.Back.pointA.r = red_;
      this.Back.pointB.r = red_;
      this.Back.pointC.r = red_;
      this.Back.pointD.r = red_;
      this.Left.pointA.r = red_;
      this.Left.pointB.r = red_;
      this.Left.pointC.r = red_;
      this.Left.pointD.r = red_;
      this.Bottom.pointA.r = red_;
      this.Bottom.pointB.r = red_;
      this.Bottom.pointC.r = red_;
      this.Bottom.pointD.r = red_;
      this.Top.pointA.r = red_;
      this.Top.pointB.r = red_;
      this.Top.pointC.r = red_;
      this.Top.pointD.r = red_;

      _manifest.default.operation.cube_buffer_procedure(this.parent);
    };

    this.colorData.SetGreenForAll = function (color_) {
      this.Front.pointA.g = color_;
      this.Front.pointB.g = color_;
      this.Front.pointC.g = color_;
      this.Front.pointD.g = color_;
      this.Right.pointA.g = color_;
      this.Right.pointB.g = color_;
      this.Right.pointC.g = color_;
      this.Right.pointD.g = color_;
      this.Back.pointA.g = color_;
      this.Back.pointB.g = color_;
      this.Back.pointC.g = color_;
      this.Back.pointD.g = color_;
      this.Left.pointA.g = color_;
      this.Left.pointB.g = color_;
      this.Left.pointC.g = color_;
      this.Left.pointD.g = color_;
      this.Bottom.pointA.g = color_;
      this.Bottom.pointB.g = color_;
      this.Bottom.pointC.g = color_;
      this.Bottom.pointD.g = color_;
      this.Top.pointA.g = color_;
      this.Top.pointB.g = color_;
      this.Top.pointC.g = color_;
      this.Top.pointD.g = color_;

      _manifest.default.operation.cube_buffer_procedure(this.parent);
    };

    this.colorData.SetBlueForAll = function (color_) {
      this.Front.pointA.b = color_;
      this.Front.pointB.b = color_;
      this.Front.pointC.b = color_;
      this.Front.pointD.b = color_;
      this.Right.pointA.b = color_;
      this.Right.pointB.b = color_;
      this.Right.pointC.b = color_;
      this.Right.pointD.b = color_;
      this.Back.pointA.b = color_;
      this.Back.pointB.b = color_;
      this.Back.pointC.b = color_;
      this.Back.pointD.b = color_;
      this.Left.pointA.b = color_;
      this.Left.pointB.b = color_;
      this.Left.pointC.b = color_;
      this.Left.pointD.b = color_;
      this.Bottom.pointA.b = color_;
      this.Bottom.pointB.b = color_;
      this.Bottom.pointC.b = color_;
      this.Bottom.pointD.b = color_;
      this.Top.pointA.b = color_;
      this.Top.pointB.b = color_;
      this.Top.pointC.b = color_;
      this.Top.pointD.b = color_;

      _manifest.default.operation.cube_buffer_procedure(this.parent);
    };

    this.colorData.SetFrontSolidColor = function (red, green, blue, a) {
      if (typeof a === 'undefined') {
        var a = 1;
      }

      this.Front.pointA.r = red;
      this.Front.pointA.g = green;
      this.Front.pointA.b = blue;
      this.Front.pointA.a = a;
      this.Front.pointB.r = red;
      this.Front.pointB.g = green;
      this.Front.pointB.b = blue;
      this.Front.pointB.a = a;
      this.Front.pointC.r = red;
      this.Front.pointC.g = green;
      this.Front.pointC.b = blue;
      this.Front.pointC.a = a;
      this.Front.pointD.r = red;
      this.Front.pointD.g = green;
      this.Front.pointD.b = blue;
      this.Front.pointD.a = a;

      _manifest.default.operation.cube_buffer_procedure(this.parent);
    };

    this.colorData.SetRightSolidColor = function (red, green, blue, a) {
      if (typeof a === 'undefined') {
        var a = 1;
      }

      this.Right.pointA.r = red;
      this.Right.pointA.g = green;
      this.Right.pointA.b = blue;
      this.Right.pointA.a = a;
      this.Right.pointB.r = red;
      this.Right.pointB.g = green;
      this.Right.pointB.b = blue;
      this.Right.pointB.a = a;
      this.Right.pointC.r = red;
      this.Right.pointC.g = green;
      this.Right.pointC.b = blue;
      this.Right.pointC.a = a;
      this.Right.pointD.r = red;
      this.Right.pointD.g = green;
      this.Right.pointD.b = blue;
      this.Right.pointD.a = a;

      _manifest.default.operation.cube_buffer_procedure(this.parent);
    };

    this.colorData.SetBackSolidColor = function (red, green, blue, a) {
      if (typeof a === 'undefined') {
        var a = 1;
      }

      this.Back.pointA.r = red;
      this.Back.pointA.g = green;
      this.Back.pointA.b = blue;
      this.Back.pointA.a = a;
      this.Back.pointB.r = red;
      this.Back.pointB.g = green;
      this.Back.pointB.b = blue;
      this.Back.pointB.a = a;
      this.Back.pointC.r = red;
      this.Back.pointC.g = green;
      this.Back.pointC.b = blue;
      this.Back.pointC.a = a;
      this.Back.pointD.r = red;
      this.Back.pointD.g = green;
      this.Back.pointD.b = blue;
      this.Back.pointD.a = a;

      _manifest.default.operation.cube_buffer_procedure(this.parent);
    };

    this.colorData.SetLeftSolidColor = function (red, green, blue, a) {
      if (typeof a === 'undefined') {
        var a = 1;
      }

      this.Left.pointA.r = red;
      this.Left.pointA.g = green;
      this.Left.pointA.b = blue;
      this.Left.pointA.a = a;
      this.Left.pointB.r = red;
      this.Left.pointB.g = green;
      this.Left.pointB.b = blue;
      this.Left.pointB.a = a;
      this.Left.pointC.r = red;
      this.Left.pointC.g = green;
      this.Left.pointC.b = blue;
      this.Left.pointC.a = a;
      this.Left.pointD.r = red;
      this.Left.pointD.g = green;
      this.Left.pointD.b = blue;
      this.Left.pointD.a = a;

      _manifest.default.operation.cube_buffer_procedure(this.parent);
    };

    this.colorData.SetBottomSolidColor = function (red, green, blue, a) {
      if (typeof a === 'undefined') {
        var a = 1;
      }

      this.Bottom.pointA.r = red;
      this.Bottom.pointA.g = green;
      this.Bottom.pointA.b = blue;
      this.Bottom.pointA.a = a;
      this.Bottom.pointB.r = red;
      this.Bottom.pointB.g = green;
      this.Bottom.pointB.b = blue;
      this.Bottom.pointB.a = a;
      this.Bottom.pointC.r = red;
      this.Bottom.pointC.g = green;
      this.Bottom.pointC.b = blue;
      this.Bottom.pointC.a = a;
      this.Bottom.pointD.r = red;
      this.Bottom.pointD.g = green;
      this.Bottom.pointD.b = blue;
      this.Bottom.pointD.a = a;

      _manifest.default.operation.cube_buffer_procedure(this.parent);
    };

    this.colorData.SetTopSolidColor = function (red, green, blue, a) {
      if (typeof a === 'undefined') {
        var a = 1;
      }

      this.Top.pointA.r = red;
      this.Top.pointA.g = green;
      this.Top.pointA.b = blue;
      this.Top.pointA.a = a;
      this.Top.pointB.r = red;
      this.Top.pointB.g = green;
      this.Top.pointB.b = blue;
      this.Top.pointB.a = a;
      this.Top.pointC.r = red;
      this.Top.pointC.g = green;
      this.Top.pointC.b = blue;
      this.Top.pointC.a = a;
      this.Top.pointD.r = red;
      this.Top.pointD.g = green;
      this.Top.pointD.b = blue;
      this.Top.pointD.a = a;

      _manifest.default.operation.cube_buffer_procedure(this.parent);
    };

    this.colorData.SetSolidColor = function (red, green, blue, a) {
      this.SetBottomSolidColor(red, green, blue, a);
      this.SetLeftSolidColor(red, green, blue, a);
      this.SetBackSolidColor(red, green, blue, a);
      this.SetRightSolidColor(red, green, blue, a);
      this.SetFrontSolidColor(red, green, blue, a);
      this.SetTopSolidColor(red, green, blue, a);
    };
  }

  setScaleByX(scale) {
    //for scale
    this.Left.pointA.x = -scale;
    this.Left.pointB.x = -scale;
    this.Left.pointC.x = -scale;
    this.Left.pointD.x = -scale;
    this.Right.pointA.x = scale;
    this.Right.pointB.x = scale;
    this.Right.pointC.x = scale;
    this.Right.pointD.x = scale;
    this.Top.pointA.x = -scale;
    this.Top.pointB.x = -scale;
    this.Top.pointC.x = scale;
    this.Top.pointD.x = scale;
    this.Bottom.pointA.x = -scale;
    this.Bottom.pointB.x = scale;
    this.Bottom.pointC.x = scale;
    this.Bottom.pointD.x = -scale;
    this.Front.pointA.x = -scale;
    this.Front.pointB.x = scale;
    this.Front.pointC.x = scale;
    this.Front.pointD.x = -scale;
    this.Back.pointA.x = -scale;
    this.Back.pointB.x = -scale;
    this.Back.pointC.x = scale;
    this.Back.pointD.x = scale;
    if (this.dynamicBuffer == true) return;

    _manifest.default.operation.cube_buffer_procedure(this.root);

    return "dynamicBuffer is false but i will update vertex array prototypical.";
  }

  setScaleByY(scale) {
    //for scale
    this.Left.pointA.y = -scale;
    this.Left.pointB.y = -scale;
    this.Left.pointC.y = scale;
    this.Left.pointD.y = scale;
    this.Right.pointA.y = -scale;
    this.Right.pointB.y = scale;
    this.Right.pointC.y = scale;
    this.Right.pointD.y = -scale;
    this.Top.pointA.y = scale;
    this.Top.pointB.y = scale;
    this.Top.pointC.y = scale;
    this.Top.pointD.y = scale;
    this.Bottom.pointA.y = -scale;
    this.Bottom.pointB.y = -scale;
    this.Bottom.pointC.y = -scale;
    this.Bottom.pointD.y = -scale;
    this.Front.pointA.y = -scale;
    this.Front.pointB.y = -scale;
    this.Front.pointC.y = scale;
    this.Front.pointD.y = scale;
    this.Back.pointA.y = -scale;
    this.Back.pointB.y = scale;
    this.Back.pointC.y = scale;
    this.Back.pointD.y = -scale;
    if (this.dynamicBuffer == true) return;

    _manifest.default.operation.cube_buffer_procedure(this.root);

    return "dynamicBuffer is false but i will update vertex array prototypical.";
  }

  setScaleByZ(scale) {
    this.Left.pointA.z = -scale;
    this.Left.pointB.z = scale;
    this.Left.pointC.z = scale;
    this.Left.pointD.z = -scale;
    this.Right.pointA.z = -scale;
    this.Right.pointB.z = -scale;
    this.Right.pointC.z = scale;
    this.Right.pointD.z = scale;
    this.Top.pointA.z = scale;
    this.Top.pointB.z = scale;
    this.Top.pointC.z = scale;
    this.Top.pointD.z = scale;
    this.Bottom.pointA.z = -scale;
    this.Bottom.pointB.z = -scale;
    this.Bottom.pointC.z = -scale;
    this.Bottom.pointD.z = -scale;
    this.Front.pointA.z = scale;
    this.Front.pointB.z = scale;
    this.Front.pointC.z = scale;
    this.Front.pointD.z = scale;
    this.Back.pointA.z = -scale;
    this.Back.pointB.z = -scale;
    this.Back.pointC.z = -scale;
    this.Back.pointD.z = -scale;
    if (this.dynamicBuffer == true) return;

    _manifest.default.operation.cube_buffer_procedure(this.root);

    return "dynamicBuffer is false but i will update vertex array prototypical.";
  }

  setScale(scale) {
    this.size = scale;
    this.basePoint = 1.0 * this.size;
    this.basePointNeg = -1.0 * this.size;
    if (this.dynamicBuffer == true) return;

    _manifest.default.operation.cube_buffer_procedure(this.root);

    return "dynamicBuffer is false but i will update vertex array prototypical.";
  } // Setters


  setTexCoordScaleFactor(newScaleFactror) {
    function calculate(checkValue) {
      if (checkValue <= 0) {
        return -1;
      } else {
        return 1;
      }
    }

    for (var key in this.texCoordsPoints) {
      this.texCoordsPoints[key].right_top.y = this.texCoordsPoints[key].right_top.y + newScaleFactror * calculate(this.texCoordsPoints[key].right_top.y);
      this.texCoordsPoints[key].right_top.x = this.texCoordsPoints[key].right_top.x + newScaleFactror * calculate(this.texCoordsPoints[key].right_top.x);
      this.texCoordsPoints[key].left_bottom.x = this.texCoordsPoints[key].left_bottom.x + newScaleFactror * calculate(this.texCoordsPoints[key].left_bottom.x);
      this.texCoordsPoints[key].left_bottom.y = this.texCoordsPoints[key].left_bottom.y + newScaleFactror * calculate(this.texCoordsPoints[key].left_bottom.y);
      this.texCoordsPoints[key].left_top.x = this.texCoordsPoints[key].left_top.x + newScaleFactror * calculate(this.texCoordsPoints[key].left_top.x);
      this.texCoordsPoints[key].left_top.y = this.texCoordsPoints[key].left_top.y + newScaleFactror * calculate(this.texCoordsPoints[key].left_top.y);
      this.texCoordsPoints[key].right_bottom.x = this.texCoordsPoints[key].right_bottom.x + newScaleFactror * calculate(this.texCoordsPoints[key].right_bottom.x);
      this.texCoordsPoints[key].right_bottom.y = this.texCoordsPoints[key].right_bottom.y + newScaleFactror * calculate(this.texCoordsPoints[key].right_bottom.y);
    }
  }

  get vertices() {
    return new Float32Array([// Front face
    this.basePointNeg + this.Front.pointA.X, this.basePointNeg + this.Front.pointA.Y, this.basePoint + this.Front.pointA.Z, this.basePoint + this.Front.pointB.X, this.basePointNeg + this.Front.pointB.Y, this.basePoint + this.Front.pointB.Z, this.basePoint + this.Front.pointC.X, this.basePoint + this.Front.pointC.Y, this.basePoint + this.Front.pointC.Z, this.basePointNeg + this.Front.pointD.X, this.basePoint + this.Front.pointD.Y, this.basePoint + this.Front.pointD.Z, // Back face
    this.basePointNeg + this.Back.pointA.X, this.basePointNeg + this.Back.pointA.Y, this.basePointNeg + this.Back.pointA.Z, this.basePointNeg + this.Back.pointB.X, this.basePoint + this.Back.pointB.Y, this.basePointNeg + this.Back.pointB.Z, this.basePoint + this.Back.pointC.X, this.basePoint + this.Back.pointC.Y, this.basePointNeg + this.Back.pointC.Z, this.basePoint + this.Back.pointD.X, this.basePointNeg + this.Back.pointD.Y, this.basePointNeg + this.Back.pointD.Z, // Top face
    this.basePointNeg + this.Top.pointA.X, this.basePoint + this.Top.pointA.Y, this.basePointNeg + this.Top.pointA.Z, this.basePointNeg + this.Top.pointB.X, this.basePoint + this.Top.pointB.Y, this.basePoint + this.Top.pointA.Z, this.basePoint + this.Top.pointC.X, this.basePoint + this.Top.pointC.Y, this.basePoint + this.Top.pointA.Z, this.basePoint + this.Top.pointD.X, this.basePoint + this.Top.pointD.Y, this.basePointNeg + this.Top.pointA.Z, // Bottom face
    this.basePointNeg + this.Bottom.pointA.X, this.basePointNeg + this.Bottom.pointA.Y, this.basePointNeg + this.Bottom.pointA.Z, this.basePoint + this.Bottom.pointB.X, this.basePointNeg + this.Bottom.pointB.Y, this.basePointNeg + this.Bottom.pointB.Z, this.basePoint + this.Bottom.pointC.X, this.basePointNeg + this.Bottom.pointC.Y, this.basePoint + this.Bottom.pointC.Z, this.basePointNeg + this.Bottom.pointD.X, this.basePointNeg + this.Bottom.pointD.Y, this.basePoint + this.Bottom.pointD.Z, // Right face
    this.basePoint + this.Right.pointA.X, this.basePointNeg + this.Right.pointA.Y, this.basePointNeg + this.Right.pointA.Z, this.basePoint + this.Right.pointB.X, this.basePoint + this.Right.pointB.Y, this.basePointNeg + this.Right.pointB.Z, this.basePoint + this.Right.pointC.X, this.basePoint + this.Right.pointC.Y, this.basePoint + this.Right.pointC.Z, this.basePoint + this.Right.pointD.X, this.basePointNeg + this.Right.pointD.Y, this.basePoint + this.Right.pointD.Z, // Left face
    this.basePointNeg + this.Left.pointA.X, this.basePointNeg + this.Left.pointA.Y, this.basePointNeg + this.Left.pointA.Z, this.basePointNeg + this.Left.pointB.X, this.basePointNeg + this.Left.pointB.Y, this.basePoint + this.Left.pointB.Z, this.basePointNeg + this.Left.pointC.X, this.basePoint + this.Left.pointC.Y, this.basePoint + this.Left.pointC.Z, this.basePointNeg + this.Left.pointD.X, this.basePoint + this.Left.pointD.Y, this.basePointNeg + this.Left.pointD.Z]);
  }

  get texCoords() {
    return new Float32Array([// Front face
    this.texCoordsPoints.front.right_top.X, this.texCoordsPoints.front.right_top.Y, this.texCoordsPoints.front.left_top.X, this.texCoordsPoints.front.left_top.Y, this.texCoordsPoints.front.right_bottom.X, this.texCoordsPoints.front.right_bottom.Y, this.texCoordsPoints.front.left_bottom.X, this.texCoordsPoints.front.left_bottom.Y, // Back face
    this.texCoordsPoints.back.right_top.X, this.texCoordsPoints.back.right_top.Y, this.texCoordsPoints.back.left_top.X, this.texCoordsPoints.back.left_top.Y, this.texCoordsPoints.back.right_bottom.X, this.texCoordsPoints.back.right_bottom.Y, this.texCoordsPoints.back.left_bottom.X, this.texCoordsPoints.back.left_bottom.Y, // Top face
    this.texCoordsPoints.top.right_top.X, this.texCoordsPoints.top.right_top.Y, this.texCoordsPoints.top.left_top.X, this.texCoordsPoints.top.left_top.Y, this.texCoordsPoints.top.right_bottom.X, this.texCoordsPoints.top.right_bottom.Y, this.texCoordsPoints.top.left_bottom.X, this.texCoordsPoints.top.left_bottom.Y, // Bottom face
    this.texCoordsPoints.bottom.right_top.X, this.texCoordsPoints.bottom.right_top.Y, this.texCoordsPoints.bottom.left_top.X, this.texCoordsPoints.bottom.left_top.Y, this.texCoordsPoints.bottom.right_bottom.X, this.texCoordsPoints.bottom.right_bottom.Y, this.texCoordsPoints.bottom.left_bottom.X, this.texCoordsPoints.bottom.left_bottom.Y, // Right face
    this.texCoordsPoints.right.right_top.X, this.texCoordsPoints.right.right_top.Y, this.texCoordsPoints.right.left_top.X, this.texCoordsPoints.right.left_top.Y, this.texCoordsPoints.right.right_bottom.X, this.texCoordsPoints.right.right_bottom.Y, this.texCoordsPoints.right.left_bottom.X, this.texCoordsPoints.right.left_bottom.Y, // Left face
    this.texCoordsPoints.left.right_top.X, this.texCoordsPoints.left.right_top.Y, this.texCoordsPoints.left.left_top.X, this.texCoordsPoints.left.left_top.Y, this.texCoordsPoints.left.right_bottom.X, this.texCoordsPoints.left.right_bottom.Y, this.texCoordsPoints.left.left_bottom.X, this.texCoordsPoints.left.left_bottom.Y]);
  }

  get indices() {
    return [0, 1, 2, 0, 2, 3, // front
    4, 5, 6, 4, 6, 7, // back
    8, 9, 10, 8, 10, 11, // top
    12, 13, 14, 12, 14, 15, // bottom
    16, 17, 18, 16, 18, 19, // right
    20, 21, 22, 20, 22, 23 // left
    ];
  }

  get color() {
    return new Float32Array([// Front face
    this.colorData.Front.pointA.r, this.colorData.Front.pointA.g, this.colorData.Front.pointA.b, this.colorData.Front.pointA.ALPHA(), this.colorData.Front.pointB.r, this.colorData.Front.pointB.g, this.colorData.Front.pointB.b, this.colorData.Front.pointB.ALPHA(), this.colorData.Front.pointC.r, this.colorData.Front.pointC.g, this.colorData.Front.pointC.b, this.colorData.Front.pointC.ALPHA(), this.colorData.Front.pointD.r, this.colorData.Front.pointD.g, this.colorData.Front.pointD.b, this.colorData.Front.pointD.ALPHA(), // Right face
    this.colorData.Right.pointA.r, this.colorData.Right.pointA.g, this.colorData.Right.pointA.b, this.colorData.Right.pointA.ALPHA(), this.colorData.Right.pointB.r, this.colorData.Right.pointB.g, this.colorData.Right.pointB.b, this.colorData.Right.pointB.ALPHA(), this.colorData.Right.pointC.r, this.colorData.Right.pointC.g, this.colorData.Right.pointC.b, this.colorData.Right.pointC.ALPHA(), this.colorData.Right.pointD.r, this.colorData.Right.pointD.g, this.colorData.Right.pointD.b, this.colorData.Right.pointD.ALPHA(), // Back face
    this.colorData.Back.pointA.r, this.colorData.Back.pointA.g, this.colorData.Back.pointA.b, this.colorData.Back.pointA.ALPHA(), this.colorData.Back.pointB.r, this.colorData.Back.pointB.g, this.colorData.Back.pointB.b, this.colorData.Back.pointB.ALPHA(), this.colorData.Back.pointC.r, this.colorData.Back.pointC.g, this.colorData.Back.pointC.b, this.colorData.Back.pointC.ALPHA(), this.colorData.Back.pointD.r, this.colorData.Back.pointD.g, this.colorData.Back.pointD.b, this.colorData.Back.pointD.ALPHA(), // Left face
    this.colorData.Left.pointA.r, this.colorData.Left.pointA.g, this.colorData.Left.pointA.b, this.colorData.Left.pointA.ALPHA(), this.colorData.Left.pointB.r, this.colorData.Left.pointB.g, this.colorData.Left.pointB.b, this.colorData.Left.pointB.ALPHA(), this.colorData.Left.pointC.r, this.colorData.Left.pointC.g, this.colorData.Left.pointC.b, this.colorData.Left.pointC.ALPHA(), this.colorData.Left.pointD.r, this.colorData.Left.pointD.g, this.colorData.Left.pointD.b, this.colorData.Left.pointD.ALPHA(), // Bottom left
    this.colorData.Bottom.pointA.r, this.colorData.Bottom.pointA.g, this.colorData.Bottom.pointA.b, this.colorData.Bottom.pointA.ALPHA(), this.colorData.Bottom.pointB.r, this.colorData.Bottom.pointB.g, this.colorData.Bottom.pointB.b, this.colorData.Bottom.pointB.ALPHA(), this.colorData.Bottom.pointC.r, this.colorData.Bottom.pointC.g, this.colorData.Bottom.pointC.b, this.colorData.Bottom.pointC.ALPHA(), this.colorData.Bottom.pointD.r, this.colorData.Bottom.pointD.g, this.colorData.Bottom.pointD.b, this.colorData.Bottom.pointD.ALPHA(), // Bottom right BottomRight
    this.colorData.Top.pointA.r, this.colorData.Top.pointA.g, this.colorData.Top.pointA.b, this.colorData.Top.pointA.ALPHA(), this.colorData.Top.pointB.r, this.colorData.Top.pointB.g, this.colorData.Top.pointB.b, this.colorData.Top.pointB.ALPHA(), this.colorData.Top.pointC.r, this.colorData.Top.pointC.g, this.colorData.Top.pointC.b, this.colorData.Top.pointC.ALPHA(), this.colorData.Top.pointD.r, this.colorData.Top.pointD.g, this.colorData.Top.pointD.b, this.colorData.Top.pointD.ALPHA()]);
  }

}

exports.CubeVertex = CubeVertex;

class GeoOfColor {
  constructor(type_) {
    if (typeof type_ != "undefined") {
      if (type_ == "4x4" || type_ == "square") {
        return new Float32Array([1.0, 0.0, 0.0, 1.0, //Top right
        0.0, 1.0, 0.0, 1.0, //Top left
        0.0, 0.0, 1.0, 1.0, //Bottom right
        0.5, 1.0, 0.5, 1.0 //Bottom left
        ]);
      } else if (type_ == "triangle") {
        return [1.0, 0.0, 0.0, 1.0, // Top
        0.0, 1.0, 0.0, 1.0, // Right
        0.0, 0.0, 1.0, 1.0 // Bottom
        ];
      } else if (type_ == "Piramide4") {
        this.front = "test";
        return new Float32Array([// Front face
        1.0, 0.0, 0.0, 1.0, 0.0, 1.0, 0.0, 1.0, 0.0, 0.0, 1.0, 1.0, // Right face
        1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 1.0, 0.0, 1.0, 0.0, 1.0, // Back face
        1.0, 0.0, 0.0, 1.0, 0.0, 1.0, 0.0, 1.0, 0.0, 0.0, 1.0, 1.0, // Left face
        1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 1.0, 0.0, 1.0, 0.0, 1.0, // Bottom left
        0.0, 1.0, 0.0, 1.0, 0.0, 0.0, 1.0, 1.0, 0.0, 1.0, 0.0, 1.0, // Bottom right
        0.0, 1.0, 0.0, 1.0, 0.0, 1.0, 0.0, 1.0, 0.0, 0.0, 1.0, 1.0]);
      } else if (type_ == "cube") {
        return [[1.0, 1.0, 1.0, 1.0], // Front
        [1.0, 1.0, 0.0, 1.0], // Back
        [0.0, 1.0, 0.0, 1.0], // Top
        [1.0, 0.5, 0.5, 1.0], // Bottom
        [1.0, 0.0, 1.0, 1.0], // Right
        [0.0, 0.0, 1.0, 1.0] // Left
        ];
      } else if (type_ == "cubelight" || type_ == "cube light") {
        return new Float32Array([// F
        0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, // B
        0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, // T
        0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, // Bo
        0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, // R
        1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, // L
        -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0]); // org
        // return new Float32Array( [
        //   // Front face
        //   0.0, 0.0, 1.0, 1, 0.0, 0.0, 1.0, 1, 0.0, 0.0, 1.0, 1, 0.0, 0.0, 1.0, 1,
        //   // Back face
        //   0.0, 0.0, -1.0, 1, 0.0, 0.0, -1.0, 1, 0.0, 0.0, -1.0, 1, 0.0, 0.0, -1.0, 1,
        //   // Top face
        //   0.0, 1.0, 0.0, 1, 0.0, 1.0, 0.0, 1, 0.0, 1.0, 0.0, 1, 0.0, 1.0, 0.0, 1,
        //   // Bottom face
        //   0.0, -1.0, 0.0, 1, 0.0, -1.0, 0.0, 1, 0.0, -1.0, 0.0, 1, 0.0, -1.0, 0.0, 1,
        //   // Right face
        //   1.0, 0.0, 0.0, 1, 1.0, 0.0, 0.0, 1, 1.0, 0.0, 0.0, 1, 1.0, 0.0, 0.0, 1,
        //   // Left face
        //   -1.0, 0.0, 0.0, 1, -1.0, 0.0, 0.0, 1, -1.0, 0.0, 0.0, 1, -1.0, 0.0, 0.0, 1
        // ]);
      }
    } else {
      return [1.0, 0.0, 0.0, 1.0, // Top right
      0.0, 1.0, 0.0, 1.0, // Top left
      0.0, 0.0, 1.0, 1.0, // Bottom right
      0.5, 1.0, 0.5, 1.0 // Bottom left
      ];
    }
  }

}

exports.GeoOfColor = GeoOfColor;

class PiramideVertex {
  constructor(root) {
    this.root = root;
    this.size = root.size;
    this.dynamicBuffer = true;
    this.spitz = 0;
    this.basePoint = 1.0 * this.size;
    this.basePointNeg = -1.0 * this.size;
    this.colorData = {};
    this.colorData.parent = this.root;
    this.colorData.Front = {
      pointA: new COLOR_ALPHA(1.0, 0.0, 0.0, 1.0),
      pointB: new COLOR_ALPHA(0.0, 1.0, 0.0, 1.0),
      pointC: new COLOR_ALPHA(0.0, 0.0, 1.0, 1.0)
    };
    this.colorData.Back = {
      pointA: new COLOR_ALPHA(1.0, 0.0, 0.0, 1.0),
      pointB: new COLOR_ALPHA(0.0, 1.0, 0.0, 1.0),
      pointC: new COLOR_ALPHA(0.0, 0.0, 1.0, 1.0)
    };
    this.colorData.BottomRight = {
      pointA: new COLOR_ALPHA(0.0, 1.0, 0.0, 1.0),
      pointB: new COLOR_ALPHA(0.0, 1.0, 0.0, 1.0),
      pointC: new COLOR_ALPHA(0.0, 0.0, 1.0, 1.0)
    };
    this.colorData.Bottom = {
      pointA: new COLOR_ALPHA(0.0, 1.0, 0.0, 1.0),
      pointB: new COLOR_ALPHA(0.0, 0.0, 1.0, 1.0),
      pointC: new COLOR_ALPHA(0.0, 1.0, 0.0, 1.0)
    };
    this.colorData.Right = {
      pointA: new COLOR_ALPHA(1.0, 0.0, 0.0, 1.0),
      pointB: new COLOR_ALPHA(0.0, 0.0, 1.0, 1.0),
      pointC: new COLOR_ALPHA(0.0, 1.0, 0.0, 1.0)
    };
    this.colorData.Left = {
      pointA: new COLOR_ALPHA(1.0, 0.0, 0.0, 1.0),
      pointB: new COLOR_ALPHA(0.0, 0.0, 1.0, 1.0),
      pointC: new COLOR_ALPHA(0.0, 1.0, 0.0, 1.0)
    };

    this.colorData.SetRedForAll = function (red_) {
      // Front
      this.Front.pointA.r = red_;
      this.Front.pointB.r = red_;
      this.Front.pointC.r = red_; // Right

      this.Right.pointA.r = red_;
      this.Right.pointB.r = red_;
      this.Right.pointC.r = red_; // Back

      this.Back.pointA.r = red_;
      this.Back.pointB.r = red_;
      this.Back.pointC.r = red_; // Left

      this.Left.pointA.r = red_;
      this.Left.pointB.r = red_;
      this.Left.pointC.r = red_; // Bottom left

      this.Bottom.pointA.r = red_;
      this.Bottom.pointB.r = red_;
      this.Bottom.pointC.r = red_; // Bottom right

      this.BottomRight.pointA.r = red_;
      this.BottomRight.pointB.r = red_;
      this.BottomRight.pointC.r = red_;

      _manifest.default.operation.piramide_buffer_procedure(this.parent);
    };

    this.colorData.SetGreenForAll = function (color_) {
      // Front face
      this.Front.pointA.g = color_;
      this.Front.pointB.g = color_;
      this.Front.pointC.g = color_; // Right face

      this.Right.pointA.g = color_;
      this.Right.pointB.g = color_;
      this.Right.pointC.g = color_; // Back face

      this.Back.pointA.g = color_;
      this.Back.pointB.g = color_;
      this.Back.pointC.g = color_; // Left face

      this.Left.pointA.g = color_;
      this.Left.pointB.g = color_;
      this.Left.pointC.g = color_; // Bottom left

      this.Bottom.pointA.g = color_;
      this.Bottom.pointB.g = color_;
      this.Bottom.pointC.g = color_; // Bottom right BottomRight

      this.BottomRight.pointA.g = color_;
      this.BottomRight.pointB.g = color_;
      this.BottomRight.pointC.g = color_;

      _manifest.default.operation.piramide_buffer_procedure(this.parent);
    };

    this.colorData.SetBlueForAll = function (color_) {
      // Front face
      this.Front.pointA.b = color_;
      this.Front.pointB.b = color_;
      this.Front.pointC.b = color_; // Right face

      this.Right.pointA.b = color_;
      this.Right.pointB.b = color_;
      this.Right.pointC.b = color_; // Back face

      this.Back.pointA.b = color_;
      this.Back.pointB.b = color_;
      this.Back.pointC.b = color_; // Left face

      this.Left.pointA.b = color_;
      this.Left.pointB.b = color_;
      this.Left.pointC.b = color_; // Bottom left

      this.Bottom.pointA.b = color_;
      this.Bottom.pointB.b = color_;
      this.Bottom.pointC.b = color_; // Bottom right BottomRight

      this.BottomRight.pointA.b = color_;
      this.BottomRight.pointB.b = color_;
      this.BottomRight.pointC.b = color_;

      _manifest.default.operation.piramide_buffer_procedure(this.parent);
    };
  }

  setScale(scale) {
    this.size = scale;
    this.basePoint = 1.0 * this.size;
    this.basePointNeg = -1.0 * this.size;
    if (this.dynamicBuffer == true) return;

    _manifest.default.operation.piramide_buffer_procedure(this.root);

    return "dynamicBuffer is false but i will update vertex array prototypical.";
  }

  setSpitz(newValueFloat) {
    this.spitz = newValueFloat;
    if (this.dynamicBuffer == true) return;

    _manifest.default.operation.piramide_buffer_procedure(this.root);
  } //from cube


  get verticesC() {
    return new Float32Array([// Front face
    -1.0, -1.0, 1.0, 1.0, -1.0, 1.0, 0.0, 15.0, 0.0, 0.0, 15.0, 0.0, // Back face
    -1.0, -1.0, -1.0, 0.0, 15.0, 0.0, 0.0, 15.0, 0.0, 1.0, -1.0, -1.0, // Top face
    0.0, 15.0, 0.0, 0.0, 15.0, 0.0, 0.0, 15.0, 0.0, 0.0, 15.0, 0.0, // Bottom face
    -1.0, -1.0, -1.0, 1.0, -1.0, -1.0, 1.0, -1.0, 1.0, -1.0, -1.0, 1.0, // Right face
    1.0, -1.0, -1.0, 0.0, 15.0, 0.0, 0.0, 15.0, 0.0, 1.0, -1.0, 1.0, // Left face
    -1.0, -1.0, -1.0, -1.0, -1.0, 1.0, 0.0, 15.0, 0.0, 0.0, 15.0, 0.0]);
  }

  get normals() {
    // from cube
    return new Float32Array([// Front face
    0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, // Back face
    0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0, // Top face
    0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, // Bottom face
    0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, // Right face
    1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, // Left face
    -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0]);
  } // from cube


  get texCoords() {
    return new Float32Array([// Front face
    0.0, 0.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0, // Back face
    1.0, 0.0, 1.0, 1.0, 0.0, 1.0, 0.0, 0.0, // Top face
    0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 1.0, 1.0, // Bottom face
    1.0, 1.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, // Right face
    1.0, 0.0, 1.0, 1.0, 0.0, 1.0, 0.0, 0.0, // Left face
    0.0, 0.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0]);
  }

  get indices() {
    return [0, 1, 2, 0, 2, 3, // Front face
    4, 5, 6, 4, 6, 7, // Back face
    8, 9, 10, 8, 10, 11, // Top face
    12, 13, 14, 12, 14, 15, // Bottom face
    16, 17, 18, 16, 18, 19, // Right face
    20, 21, 22, 20, 22, 23 // Left face
    ];
  }

  get color() {
    return new Float32Array([// Front face
    this.colorData.Front.pointA.r, this.colorData.Front.pointA.g, this.colorData.Front.pointA.b, this.colorData.Front.pointA.ALPHA(), this.colorData.Front.pointB.r, this.colorData.Front.pointB.g, this.colorData.Front.pointB.b, this.colorData.Front.pointB.ALPHA(), this.colorData.Front.pointC.r, this.colorData.Front.pointC.g, this.colorData.Front.pointC.b, this.colorData.Front.pointC.ALPHA(), // Right face
    this.colorData.Right.pointA.r, this.colorData.Right.pointA.g, this.colorData.Right.pointA.b, this.colorData.Right.pointA.ALPHA(), this.colorData.Right.pointB.r, this.colorData.Right.pointB.g, this.colorData.Right.pointB.b, this.colorData.Right.pointB.ALPHA(), this.colorData.Right.pointC.r, this.colorData.Right.pointC.g, this.colorData.Right.pointC.b, this.colorData.Right.pointC.ALPHA(), // Back face
    this.colorData.Back.pointA.r, this.colorData.Back.pointA.g, this.colorData.Back.pointA.b, this.colorData.Back.pointA.ALPHA(), this.colorData.Back.pointB.r, this.colorData.Back.pointB.g, this.colorData.Back.pointB.b, this.colorData.Back.pointB.ALPHA(), this.colorData.Back.pointC.r, this.colorData.Back.pointC.g, this.colorData.Back.pointC.b, this.colorData.Back.pointC.ALPHA(), // Left face
    this.colorData.Left.pointA.r, this.colorData.Left.pointA.g, this.colorData.Left.pointA.b, this.colorData.Left.pointA.ALPHA(), this.colorData.Left.pointB.r, this.colorData.Left.pointB.g, this.colorData.Left.pointB.b, this.colorData.Left.pointB.ALPHA(), this.colorData.Left.pointC.r, this.colorData.Left.pointC.g, this.colorData.Left.pointC.b, this.colorData.Left.pointC.ALPHA(), // Bottom left
    this.colorData.Bottom.pointA.r, this.colorData.Bottom.pointA.g, this.colorData.Bottom.pointA.b, this.colorData.Bottom.pointA.ALPHA(), this.colorData.Bottom.pointB.r, this.colorData.Bottom.pointB.g, this.colorData.Bottom.pointB.b, this.colorData.Bottom.pointB.ALPHA(), this.colorData.Bottom.pointC.r, this.colorData.Bottom.pointC.g, this.colorData.Bottom.pointC.b, this.colorData.Bottom.pointC.ALPHA(), // Bottom right
    this.colorData.BottomRight.pointA.r, this.colorData.BottomRight.pointA.g, this.colorData.BottomRight.pointA.b, this.colorData.BottomRight.pointA.ALPHA(), this.colorData.BottomRight.pointB.r, this.colorData.BottomRight.pointB.g, this.colorData.BottomRight.pointB.b, this.colorData.BottomRight.pointB.ALPHA(), this.colorData.BottomRight.pointC.r, this.colorData.BottomRight.pointC.g, this.colorData.BottomRight.pointC.b, this.colorData.BottomRight.pointC.ALPHA()]);
  }

  get vertices() {
    return new Float32Array([0.0, this.basePoint + this.spitz, 0.0, this.basePointNeg, this.basePointNeg, this.basePoint, this.basePoint, this.basePointNeg, this.basePoint, // Right face
    0.0, this.basePoint + this.spitz, 0.0, this.basePoint, this.basePointNeg, this.basePoint, this.basePoint, this.basePointNeg, this.basePointNeg, // Back face
    0.0, this.basePoint + this.spitz, 0.0, this.basePoint, this.basePointNeg, this.basePointNeg, this.basePointNeg, this.basePointNeg, this.basePointNeg, // Left face
    0.0, this.basePoint + this.spitz, 0.0, this.basePointNeg, this.basePointNeg, this.basePointNeg, this.basePointNeg, this.basePointNeg, this.basePoint, //Bottom left
    this.basePointNeg, this.basePointNeg, this.basePoint, this.basePoint, this.basePointNeg, this.basePoint, this.basePoint, this.basePointNeg, this.basePointNeg, //Bottom right
    this.basePointNeg, this.basePointNeg, this.basePoint, this.basePoint, this.basePointNeg, this.basePointNeg, this.basePointNeg, this.basePointNeg, this.basePointNeg]);
  }

}

exports.PiramideVertex = PiramideVertex;

class sphereVertex {
  createGeoData(root) {
    this.size = root.size;
    this.basePoint = 1.0 * this.size;
    this.basePointNeg = -1.0 * this.size;
    this.dynamicBuffer = true;
    this.latitudeBands = root.latitudeBands;
    this.longitudeBands = root.longitudeBands;
    this.radius = root.radius;
    this.vertexPositionData = [];
    this.normalData = [];
    this.textureCoordData = [];

    for (var latNumber = 0; latNumber <= this.latitudeBands; latNumber++) {
      var theta = latNumber * Math.PI / this.latitudeBands;
      var sinTheta = Math.sin(theta);
      var cosTheta = Math.cos(theta);

      for (var longNumber = 0; longNumber <= this.longitudeBands; longNumber++) {
        var phi = longNumber * 2 * Math.PI / this.longitudeBands;
        var sinPhi = Math.sin(phi);
        var cosPhi = Math.cos(phi);
        var x = cosPhi * sinTheta;
        var y = cosTheta;
        var z = sinPhi * sinTheta;
        var u = 1 - longNumber / this.longitudeBands;
        var v = 1 - latNumber / this.latitudeBands;
        this.normalData.push(x);
        this.normalData.push(y);
        this.normalData.push(z);
        this.textureCoordData.push(u);
        this.textureCoordData.push(v);
        this.vertexPositionData.push(this.radius * x);
        this.vertexPositionData.push(this.radius * y);
        this.vertexPositionData.push(this.radius * z);
      }
    }

    this.indexData = [];

    for (var latNumber = 0; latNumber < this.latitudeBands; latNumber++) {
      for (var longNumber = 0; longNumber < this.longitudeBands; longNumber++) {
        var first = latNumber * (this.longitudeBands + 1) + longNumber;
        var second = first + this.longitudeBands + 1;
        this.indexData.push(first);
        this.indexData.push(second);
        this.indexData.push(first + 1);
        this.indexData.push(second);
        this.indexData.push(second + 1);
        this.indexData.push(first + 1);
      }
    }
  }

  constructor(root) {
    this.root = root;
    this.createGeoData(this.root);
  }

  setRadius(scale) {
    this.radius = scale;
    this.root.radius = scale;

    if (this.dynamicBuffer == true) {
      this.createGeoData(this.root);

      _manifest.default.operation.sphere_buffer_procedure(this.root);

      return;
    } //App.operation.sphere_buffer_procedure(this.root)
    //return 'dynamicBuffer is false but i will update vertex array prototypical.';

  }

  get vertices() {
    return new Float32Array(this.vertexPositionData);
  }

  get texCoords() {
    return new Float32Array(this.textureCoordData);
  }

  get normals() {
    return new Float32Array(this.normalData);
  }

  get indices() {
    return this.indexData;
  }

}

exports.sphereVertex = sphereVertex;

class customVertex {
  createGeoData(root) {
    this.size = root.size;
    this.basePoint = 1.0 * this.size;
    this.basePointNeg = -1.0 * this.size;
    this.dynamicBuffer = true;
    this.latitudeBands = root.latitudeBands;
    this.longitudeBands = root.longitudeBands;
    this.radius = root.radius;
    this.vertexPositionData = [];
    this.normalData = [];
    this.textureCoordData = [];

    if (this.root.custom_type == "spiral") {
      for (var latNumber = 0; latNumber <= this.latitudeBands; latNumber++) {
        var theta = latNumber * Math.PI / this.latitudeBands;
        var sinTheta = Math.sin(theta);
        var cosTheta = Math.cos(theta);

        for (var longNumber = 0; longNumber <= this.longitudeBands; longNumber++) {
          var phi = longNumber * 2 * Math.PI / this.longitudeBands;
          var sinPhi = Math.sin(phi);
          var cosPhi = Math.cos(phi);
          var x = latNumber * cosPhi;
          var y = longNumber * sinPhi;
          var z = longNumber * cosPhi;
          var u = 1 - longNumber / this.longitudeBands;
          var v = 1 - latNumber / this.latitudeBands;
          this.normalData.push(x);
          this.normalData.push(y);
          this.normalData.push(z);
          this.textureCoordData.push(u);
          this.textureCoordData.push(v);
          this.vertexPositionData.push(this.radius * x);
          this.vertexPositionData.push(this.radius * y);
          this.vertexPositionData.push(this.radius * z);
        }
      }

      this.indexData = [];

      for (var latNumber = 0; latNumber < this.latitudeBands; latNumber++) {
        for (var longNumber = 0; longNumber < this.longitudeBands; longNumber++) {
          var first = latNumber * (this.longitudeBands + 1) + longNumber;
          var second = first + this.longitudeBands + 1;
          this.indexData.push(first);
          this.indexData.push(second);
          this.indexData.push(first + 1);
          this.indexData.push(second);
          this.indexData.push(second + 1);
          this.indexData.push(first + 1);
        }
      }
    } else if (this.root.custom_type == "cubic") {
      for (var j = 0; j < 8; j++) {
        var x = j + 1 * S1.GET();
        var y = 1;
        var z = j + 1;
        this.normalData.push(x);
        this.normalData.push(y);
        this.normalData.push(z);
        this.textureCoordData.push(u);
        this.textureCoordData.push(v);
        this.vertexPositionData.push(this.radius * x);
        this.vertexPositionData.push(this.radius * y);
        this.vertexPositionData.push(this.radius * z);
      }

      this.indexData = [];

      for (var j = 0; j < 8; j++) {
        var first = 4 * (2 + 1) + j;
        var second = first + 2 + 1;
        this.indexData.push(first);
        this.indexData.push(second);
        this.indexData.push(first + 1);
        this.indexData.push(second);
        this.indexData.push(second + 1);
        this.indexData.push(first + 1);
      }
    }
  }

  constructor(root) {
    this.root = root;
    this.createGeoData(this.root);
  }

  setRadius(scale) {
    this.radius = scale;
    this.root.radius = scale;

    if (this.dynamicBuffer == true) {
      this.createGeoData(this.root);

      _manifest.default.operation.sphere_buffer_procedure(this.root);

      this.root.glDrawElements.numberOfIndicesRender = this.indices.length;
      return;
    }

    _manifest.default.operation.sphere_buffer_procedure(this.root);

    this.root.glDrawElements.numberOfIndicesRender = this.indices.length;
    return "dynamicBuffer is false but i will update vertex array prototypical.";
  }

  get vertices() {
    return new Float32Array(this.vertexPositionData);
  }

  get texCoords() {
    return new Float32Array(this.textureCoordData);
  }

  get normals() {
    return new Float32Array(this.normalData);
  }

  get indices() {
    return this.indexData;
  }

}

exports.customVertex = customVertex;

function COLOR(r_, g_, b_) {
  var ROOT = this;
  ROOT.r = parseFloat(r_);
  ROOT.g = parseFloat(g_);
  ROOT.b = parseFloat(b_);

  ROOT.R = function () {
    return parseFloat(ROOT.r);
  };

  ROOT.G = function () {
    return parseFloat(ROOT.g);
  };

  ROOT.B = function () {
    return parseFloat(ROOT.b);
  };

  ROOT.set = function (r_, g_, b_) {
    ROOT.r = parseFloat(r_);
    ROOT.g = parseFloat(g_);
    ROOT.b = parseFloat(b_);
  };

  ROOT.print = function () {
    console.log("color data RGB format : R:" + ROOT.r + "  G:" + ROOT.g + "  B:" + ROOT.b);
  };
}

function COLOR_ALPHA(r_, g_, b_, a_) {
  var ROOT = this;
  ROOT.r = parseFloat(r_);
  ROOT.g = parseFloat(g_);
  ROOT.b = parseFloat(b_);

  if (typeof a_ == "undefined") {
    var a_ = 1.0;
  }

  ROOT.a = parseFloat(a_);

  ROOT.R = function () {
    return parseFloat(ROOT.r);
  };

  ROOT.G = function () {
    return parseFloat(ROOT.g);
  };

  ROOT.B = function () {
    return parseFloat(ROOT.b);
  };

  ROOT.ALPHA = function () {
    return parseFloat(ROOT.a);
  };

  ROOT.set = function (r_, g_, b_, a_) {
    ROOT.r = parseFloat(r_);
    ROOT.g = parseFloat(g_);
    ROOT.b = parseFloat(b_);
    ROOT.a = parseFloat(a_);
  };

  ROOT.print = function () {
    console.log("color data RGB format : R:" + ROOT.r + "  G:" + ROOT.g + "  B:" + ROOT.b + "  ALPHA:" + ROOT.ALPHA);
  };
}

class customVertex_1 {
  createGeoData(root) {
    if (arguments.length == 0) {// console.log( "test this ?? " );
    }

    var innerRadius = 0.25;
    var outerRadius = outerRadius || innerRadius * 2 || 0.5;
    var slices = slices || 32;
    var vertexCount, vertices, normals, texCoords, indices, i;
    vertexCount = innerRadius == 0 ? slices + 1 : slices * 2;
    vertices = new Float32Array(3 * vertexCount);
    normals = new Float32Array(3 * vertexCount);
    texCoords = new Float32Array(2 * vertexCount);
    indices = new Uint16Array(innerRadius == 0 ? 3 * slices : 3 * 2 * slices);
    var d = 2 * Math.PI / slices;
    var k = 0;
    var t = 0;
    var n = 0;

    if (innerRadius == 0) {
      for (i = 0; i < slices; i++) {
        var c = Math.cos(d * i);
        var s = Math.sin(d * i);
        vertices[k++] = c * outerRadius;
        vertices[k++] = s * outerRadius;
        vertices[k++] = 0;
        texCoords[t++] = 0.5 + 0.5 * c;
        texCoords[t++] = 0.5 + 0.5 * s;
        indices[n++] = slices;
        indices[n++] = i;
        indices[n++] = i == slices - 1 ? 0 : i + 1;
      }

      vertices[k++] = vertices[k++] = vertices[k++] = 0;
      texCoords[t++] = texCoords[t++] = 0;
    } else {
      var r = innerRadius / outerRadius;

      for (i = 0; i < slices; i++) {
        var c = Math.cos(d * i);
        var s = Math.sin(d * i);
        vertices[k++] = c * innerRadius;
        vertices[k++] = s * innerRadius;
        vertices[k++] = 0;
        texCoords[t++] = 0.5 + 0.5 * c * r;
        texCoords[t++] = 0.5 + 0.5 * s * r;
        vertices[k++] = c * outerRadius;
        vertices[k++] = s * outerRadius;
        vertices[k++] = 0;
        texCoords[t++] = 0.5 + 0.5 * c;
        texCoords[t++] = 0.5 + 0.5 * s;
      }

      for (i = 0; i < slices - 1; i++) {
        indices[n++] = 2 * i;
        indices[n++] = 2 * i + 1;
        indices[n++] = 2 * i + 3;
        indices[n++] = 2 * i;
        indices[n++] = 2 * i + 3;
        indices[n++] = 2 * i + 2;
      }

      indices[n++] = 2 * i;
      indices[n++] = 2 * i + 1;
      indices[n++] = 1;
      indices[n++] = 2 * i;
      indices[n++] = 1;
      indices[n++] = 0;
    }

    for (i = 0; i < vertexCount; i++) {
      normals[3 * i] = normals[3 * i + 1] = 0;
      normals[3 * i + 2] = 1;
    }
    /*
    return {
    vertexPositions: vertices,
    vertexNormals: normals,
    vertexTextureCoords: texCoords,
    indices: indices
    };
    */

  }

}

exports.customVertex_1 = customVertex_1;

function ring(innerRadius, outerRadius, slices) {}

},{"../program/manifest":25,"./utility":20}],11:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.loadShaders2 = loadShaders2;
exports.genInitFSTriangle = genInitFSTriangle;
exports.getInitVSTriangle = getInitVSTriangle;
exports.getInitFSCubeTexLight = getInitFSCubeTexLight;
exports.getInitVSCubeTexLight = getInitVSCubeTexLight;
exports.getInitFSSquare = getInitFSSquare;
exports.getInitVSSquare = getInitVSSquare;
exports.getInitFSCube = getInitFSCube;
exports.getInitVSCube = getInitVSCube;
exports.getInitFSCubeTex = getInitFSCubeTex;
exports.getInitVSCubeTex = getInitVSCubeTex;
exports.getInitFSObj = getInitFSObj;
exports.getInitVSObj = getInitVSObj;
exports.getInitFSPyramid = getInitFSPyramid;
exports.getInitVSPyramid = getInitVSPyramid;
exports.getInitFSSquareTex = getInitFSSquareTex;
exports.getInitVSSquareTex = getInitVSSquareTex;
exports.getInitFSSphereLightTex = getInitFSSphereLightTex;
exports.getInitVSSphereLightTex = getInitVSSphereLightTex;

var _utility = require("./utility");

/**
 * @description From 1.7.11
 * Initial Shaders coming from code.
 * loadShaders will be adapted for deplacement
 *
 * - Can be overrided
 * - For textures program use regenerate shader procedure.
 * - Can be selective for optimisation.
 */
function loadShaders2() {
  genInitFSTriangle();
  getInitVSTriangle();
  getInitVSCube();
  getInitFSCube();
  getInitFSCubeTex();
  getInitVSCubeTex();
  getInitFSCubeTexLight();
  getInitVSCubeTexLight();
  getInitFSSquare();
  getInitVSSquare();
  getInitFSSquareTex();
  getInitVSSquareTex();
  getInitFSObj();
  getInitVSObj();
  getInitFSPyramid();
  getInitVSPyramid();
  getInitFSSphereLightTex();
  getInitVSSphereLightTex();
  console.info("Shaders ready.");
}

function genInitFSTriangle() {
  const f = `
  precision mediump float;

  varying vec4 vColor;

  void main(void) {
    gl_FragColor = vColor;
  }
  `;

  _utility.scriptManager.LOAD(f, "triangle-shader-fs", "x-shader/x-fragment", "shaders");
}

function getInitVSTriangle() {
  const f = `
  attribute vec3 aVertexPosition;
  attribute vec4 aVertexColor;

  uniform mat4 uMVMatrix;
  uniform mat4 uPMatrix;

  varying vec4 vColor;

  void main(void) {
    gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);
    vColor      = aVertexColor;
  }
  `;

  _utility.scriptManager.LOAD(f, "triangle-shader-vs", "x-shader/x-vertex", "shaders");
}

function getInitFSCubeTexLight() {
  const f = `
  precision mediump float;

  varying vec2 vTextureCoord;
  varying vec3 vLightWeighting;

  uniform sampler2D uSampler;
  uniform sampler2D uSampler1;
  uniform sampler2D uSampler2;
  uniform sampler2D uSampler3;
  uniform sampler2D uSampler4;
  uniform sampler2D uSampler5;
  uniform float numberOfsamplers;

  // Spot
  // Passed in from the vertex shader.
  varying vec3 v_normal;
  varying vec3 v_surfaceToLight;
  varying vec3 v_surfaceToView;

  uniform vec4 u_color;
  uniform float u_shininess;
  uniform vec3 u_lightDirection;
  uniform float u_innerLimit;          // in dot space
  uniform float u_outerLimit;          // in dot space

  void main(void) {
    // because v_normal is a varying it's interpolated
    // so it will not be a unit vector. Normalizing it
    // will make it a unit vector again
    vec3 normal = normalize(v_normal);

    vec3 surfaceToLightDirection = normalize(v_surfaceToLight);
    vec3 surfaceToViewDirection = normalize(v_surfaceToView);
    vec3 halfVector = normalize(surfaceToLightDirection + surfaceToViewDirection);

    float dotFromDirection = dot(surfaceToLightDirection,
                                 -u_lightDirection);
    float limitRange = u_innerLimit - u_outerLimit;
    float inLight = clamp((dotFromDirection - u_outerLimit) / limitRange, 0.0, 1.0);
    float light = inLight * dot(normal, surfaceToLightDirection);
    float specular = inLight * pow(dot(normal, halfVector), u_shininess);

    // Directioin vs uAmbientColor
    vec4 textureColor = texture2D(uSampler, vec2(vTextureCoord.s, vTextureCoord.t));
    vec4 textureColor1 = texture2D(uSampler1, vec2(vTextureCoord.s, vTextureCoord.t));
    vec4 textureColor2 = texture2D(uSampler2, vec2(vTextureCoord.s, vTextureCoord.t));
    gl_FragColor      = vec4(textureColor.rgb * vLightWeighting, textureColor.a);

    // Lets multiply just the color portion (not the alpha)
    // by the light
    gl_FragColor.rgb *= light;
    // Just add in the specular
    gl_FragColor.rgb += specular;
  }
  `;

  _utility.scriptManager.LOAD(f, "cubeLightTex-shader-fs", "x-shader/x-fragment", "shaders");
}

function getInitVSCubeTexLight() {
  const f = `
  attribute vec3 aVertexPosition;
  attribute vec3 aVertexNormal;
  attribute vec2 aTextureCoord;

  uniform mat4 uMVMatrix;
  uniform mat4 uPMatrix;
  uniform mat3 uNMatrix;

  uniform vec3 uAmbientColor;

  uniform vec3 uLightingDirection;
  uniform vec3 uDirectionalColor;

  uniform bool uUseLighting;

  varying vec2 vTextureCoord;
  varying vec3 vLightWeighting;

  // Spot
  uniform vec3 u_lightWorldPosition;
  uniform vec3 u_viewWorldPosition;

  // uniform mat4 u_world;
  // uniform mat4 u_worldViewProjection;
  // uniform mat4 u_worldInverseTranspose;

  varying vec3 v_normal;

  varying vec3 v_surfaceToLight;
  varying vec3 v_surfaceToView;

  void main(void) {

    // orient the normals and pass to the fragment shader
    // v_normal = mat3(u_worldInverseTranspose) * aVertexNormal;
    v_normal = mat3(uMVMatrix) * aVertexNormal;
    // uniform mat4 uMVMatrix;
    // uniform mat4 uPMatrix;
    // uniform mat3 uNMatrix;

    // compute the world position of the surfoace
    vec3 surfaceWorldPosition = (uNMatrix * aVertexPosition).xyz;

    // compute the vector of the surface to the light
    // and pass it to the fragment shader
    v_surfaceToLight = u_lightWorldPosition - surfaceWorldPosition;

    // compute the vector of the surface to the view/camera
    // and pass it to the fragment shader
    // v_surfaceToView = u_viewWorldPosition - surfaceWorldPosition;
    v_surfaceToView = surfaceWorldPosition; 
    // aVertexPosition; //u_viewWorldPosition; //surfaceWorldPosition;

    gl_Position   = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);
    vTextureCoord = aTextureCoord;

    if (!uUseLighting) {
      vLightWeighting = vec3(1.0, 1.0, 1.0);
    }
    else {
      vec3 transformedNormal          = uNMatrix * aVertexNormal;
      float directionalLightWeighting = max(dot(transformedNormal, uLightingDirection), 0.0);
      vLightWeighting                 = uAmbientColor + uDirectionalColor * directionalLightWeighting;
    }
  } `;

  _utility.scriptManager.LOAD(f, "cubeLightTex-shader-vs", "x-shader/x-vertex", "shaders");
}

function getInitFSSquare() {
  const f = `
  precision mediump float;

  varying vec4 vColor;

  void main(void) {
    gl_FragColor = vColor;
  }
  `;

  _utility.scriptManager.LOAD(f, "square-shader-fs", "x-shader/x-fragment", "shaders");
}

function getInitVSSquare() {
  const f = `
  attribute vec3 aVertexPosition;
  attribute vec4 aVertexColor;

  uniform mat4 uMVMatrix;
  uniform mat4 uPMatrix;

  varying vec4 vColor;

  void main(void) {
    gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);
    vColor      = aVertexColor;
  }`;

  _utility.scriptManager.LOAD(f, "square-shader-vs", "x-shader/x-vertex", "shaders");
}

function getInitFSCube() {
  const f = `
  precision mediump float;

  varying vec4 vColor;

  void main(void) {
    gl_FragColor = vColor;
  }`;

  _utility.scriptManager.LOAD(f, "cube-shader-fs", "x-shader/x-fragment", "shaders");
}

function getInitVSCube() {
  const f = `
  attribute vec3 aVertexPosition;
  attribute vec4 aVertexColor;

  uniform mat4 uMVMatrix;
  uniform mat4 uPMatrix;

  varying vec4 vColor;

  void main(void) {
    gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);
    vColor      = aVertexColor;
  }`;

  _utility.scriptManager.LOAD(f, "cube-shader-vs", "x-shader/x-vertex", "shaders");
}

function getInitFSCubeTex() {
  const f = `
  precision mediump float;

  varying vec2 vTextureCoord;
  uniform sampler2D uSampler;

  void main(void) {
    gl_FragColor = texture2D(uSampler, vec2(vTextureCoord.s, vTextureCoord.t));
  }`;

  _utility.scriptManager.LOAD(f, "cubeTex-shader-fs", "x-shader/x-fragment", "shaders");
}

function getInitVSCubeTex() {
  const f = `
  #version 300 es
  #define POSITION_LOCATION 0

  attribute vec3 aVertexPosition;
  attribute vec2 aTextureCoord;

  uniform mat4 uMVMatrix;
  uniform mat4 uPMatrix;

  varying vec2 vTextureCoord;

  void main(void) {
    gl_Position   = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);
    vTextureCoord = aTextureCoord;
  }`;

  _utility.scriptManager.LOAD(f, "cubeTex-shader-vs", "x-shader/x-vertex", "shaders");
}

function getInitFSObj() {
  const f = `
  precision mediump float;

  varying vec2 vTextureCoord;
  varying vec3 vLightWeighting;

  uniform sampler2D uSampler;
  uniform sampler2D uSampler1;
  uniform sampler2D uSampler2;

  void main(void) {
    vec4 textureColor = texture2D(uSampler, vec2(vTextureCoord.s, vTextureCoord.t));
    gl_FragColor      = vec4(textureColor.rgb * vLightWeighting, textureColor.a);
  }`;

  _utility.scriptManager.LOAD(f, "obj-shader-fs", "x-shader/x-fragment", "shaders");
}

function getInitVSObj() {
  const f = `
  attribute vec3 aVertexPosition;
  attribute vec3 aVertexNormal;
  attribute vec2 aTextureCoord;

  uniform mat4 uMVMatrix;
  uniform mat4 uPMatrix;
  uniform mat3 uNMatrix;

  uniform vec3 uAmbientColor;

  uniform vec3 uLightingDirection;
  uniform vec3 uDirectionalColor;

  uniform bool uUseLighting;

  varying vec2 vTextureCoord;
  varying vec3 vLightWeighting;

  void main(void) {
    gl_Position   = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);
    vTextureCoord = aTextureCoord;

    if (!uUseLighting) {
      vLightWeighting = vec3( 1.0, 1.0, 1.0);
    }
    else {
      vec3 transformedNormal          = uNMatrix * aVertexNormal;
      float directionalLightWeighting = max(dot(transformedNormal, uLightingDirection), 0.0);
      vLightWeighting                 = uAmbientColor + uDirectionalColor * directionalLightWeighting;
    }
  }
`;

  _utility.scriptManager.LOAD(f, "obj-shader-vs", "x-shader/x-vertex", "shaders");
}

function getInitFSPyramid() {
  const f = `
  precision mediump float;
  varying vec4 vColor;

  void main(void) {
    gl_FragColor = vColor;
  }`;

  _utility.scriptManager.LOAD(f, "pyramid-shader-fs", "x-shader/x-fragment", "shaders");
}

function getInitVSPyramid() {
  const f = `
  attribute vec3 aVertexPosition;
  attribute vec4 aVertexColor;
  uniform mat4 uMVMatrix;
  uniform mat4 uPMatrix;
  varying vec4 vColor;

  void main(void) {
    // instance = gl_InstanceID;
    // gl_Position = vec4(aVertexPosition + vec2(float(gl_InstanceID) - 0.5, 0.0), 0.0, 1.0);
    gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);
    vColor      = aVertexColor;
  }
`;

  _utility.scriptManager.LOAD(f, "pyramid-shader-vs", "x-shader/x-vertex", "shaders");
}

function getInitFSSquareTex() {
  const f = `
  precision mediump float;

  varying vec2 vTextureCoord;
  varying vec3 vLightWeighting;

  uniform sampler2D uSampler;
  uniform sampler2D uSampler1;
  uniform sampler2D uSampler2;
  uniform sampler2D uSampler3;
  uniform sampler2D uSampler4;
  uniform sampler2D uSampler5;
  uniform float numberOfsamplers;

  // Spot
  // Passed in from the vertex shader.
  varying vec3 v_normal;
  varying vec3 v_surfaceToLight;
  varying vec3 v_surfaceToView;

  uniform vec4 u_color;
  uniform float u_shininess;
  uniform vec3 u_lightDirection;
  uniform float u_innerLimit;          // in dot space
  uniform float u_outerLimit;          // in dot space

  void main(void) {
    vec3 normal = normalize(v_normal);
    vec3 surfaceToLightDirection = normalize(v_surfaceToLight);
    vec3 surfaceToViewDirection = normalize(v_surfaceToView);
    vec3 halfVector = normalize(surfaceToLightDirection + surfaceToViewDirection);
    float dotFromDirection = dot(surfaceToLightDirection,
                                 -u_lightDirection);
    float limitRange = u_innerLimit - u_outerLimit;
    float inLight = clamp((dotFromDirection - u_outerLimit) / limitRange, 0.0, 1.0);
    float light = inLight * dot(normal, surfaceToLightDirection);
    float specular = inLight * pow(dot(normal, halfVector), u_shininess);
    vec4 textureColor  = texture2D(uSampler, vec2(vTextureCoord.s, vTextureCoord.t));
    vec4 textureColor1 = texture2D(uSampler1, vec2(vTextureCoord.s, vTextureCoord.t));
    vec4 textureColor2 = texture2D(uSampler2, vec2(vTextureCoord.s, vTextureCoord.t));
    gl_FragColor       = vec4(textureColor.rgb * vLightWeighting, textureColor.a);

    // gl_FragColor.rgb *= light;
    // gl_FragColor.rgb += specular;
  }
  `;

  _utility.scriptManager.LOAD(f, "squareTex-shader-fs", "x-shader/x-fragment", "shaders");
}

function getInitVSSquareTex() {
  const f = `
  attribute vec3 aVertexPosition;
  attribute vec3 aVertexNormal;
  attribute vec2 aTextureCoord;

  uniform mat4 uMVMatrix;
  uniform mat4 uPMatrix;
  uniform mat3 uNMatrix;

  uniform vec3 uAmbientColor;

  uniform vec3 uLightingDirection;
  uniform vec3 uDirectionalColor;

  uniform bool uUseLighting;

  varying vec2 vTextureCoord;
  varying vec3 vLightWeighting;

  // Spot
  uniform vec3 u_lightWorldPosition;
  uniform vec3 u_viewWorldPosition;

  // uniform mat4 u_world;
  // uniform mat4 u_worldViewProjection;
  // uniform mat4 u_worldInverseTranspose;

  varying vec3 v_normal;

  varying vec3 v_surfaceToLight;
  varying vec3 v_surfaceToView;

  void main(void) {
    // Spot
    v_normal = mat3(uPMatrix) * aVertexNormal;
    vec3 surfaceWorldPosition = (uNMatrix * aVertexPosition).xyz;
    v_surfaceToLight = u_lightWorldPosition - surfaceWorldPosition;
    v_surfaceToView = -surfaceWorldPosition;

    gl_Position   = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);
    vTextureCoord = aTextureCoord;

    if (!uUseLighting) {
      vLightWeighting = vec3(1.0, 1.0, 1.0);
    }
    else {
      vec3 transformedNormal          = uNMatrix * aVertexNormal;
      float directionalLightWeighting = max(dot(transformedNormal, uLightingDirection), 0.0);
      vLightWeighting                 = uAmbientColor + uDirectionalColor * directionalLightWeighting;
    }
  }
`;

  _utility.scriptManager.LOAD(f, "squareTex-shader-vs", "x-shader/x-vertex", "shaders");
}

function getInitFSSphereLightTex() {
  const f = `
  precision mediump float;

  varying vec2 vTextureCoord;
  varying vec3 vLightWeighting;

  uniform sampler2D uSampler;
  uniform sampler2D uSampler1;
  uniform sampler2D uSampler2;
  uniform sampler2D uSampler3;
  uniform sampler2D uSampler4;
  uniform sampler2D uSampler5;
  uniform float numberOfsamplers;

  void main(void) {

    vec4 textureColor = texture2D(uSampler, vec2(vTextureCoord.s, vTextureCoord.t));
    vec4 textureColor1 = texture2D(uSampler1, vec2(vTextureCoord.s, vTextureCoord.t));
    vec4 textureColor2 = texture2D(uSampler2, vec2(vTextureCoord.s, vTextureCoord.t));
    gl_FragColor      = vec4(textureColor.rgb * vLightWeighting, textureColor.a);

  }
  `;

  _utility.scriptManager.LOAD(f, "squareTex-shader-vs", "x-shader/x-vertex", "shaders");
}

function getInitVSSphereLightTex() {
  const f = `
  attribute vec3 aVertexPosition;
  attribute vec3 aVertexNormal;
  attribute vec2 aTextureCoord;

  uniform mat4 uMVMatrix;
  uniform mat4 uPMatrix;
  uniform mat3 uNMatrix;

  uniform vec3 uAmbientColor;

  uniform vec3 uLightingDirection;
  uniform vec3 uDirectionalColor;

  uniform bool uUseLighting;

  varying vec2 vTextureCoord;
  varying vec3 vLightWeighting;

  void main(void) {
    gl_Position   = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);
    vTextureCoord = aTextureCoord;

    if (!uUseLighting) {
      vLightWeighting = vec3(1.0, 1.0, 1.0);
    }
    else {
      vec3 transformedNormal          = uNMatrix * aVertexNormal;
      float directionalLightWeighting = max(dot(transformedNormal, uLightingDirection), 0.0);
      vLightWeighting                 = uAmbientColor + uDirectionalColor * directionalLightWeighting;
    }
  }
`;

  _utility.scriptManager.LOAD(f, "sphereLightTex-shader-vs", "x-shader/x-vertex", "shaders");
}

},{"./utility":20}],12:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.callReDraw_ = exports.reDrawID = exports.animate = void 0;

var _manifest = _interopRequireDefault(require("../program/manifest"));

var _matrixWorld = require("./matrix-world");

var _engine = require("./engine");

var raycaster = _interopRequireWildcard(require("./raycast"));

var _utility = require("./utility");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable no-undef */

/* eslint-disable no-unused-vars */
var animate = function (sceneObject) {
  var timeNow = new Date().getTime();

  if (_engine.lastTime != 0) {
    var elapsed = timeNow - _engine.lastTime;
    sceneObject.rotation.rotx += sceneObject.rotation.rotSpeedX * elapsed / 1000.0;
    sceneObject.rotation.roty += sceneObject.rotation.rotSpeedY * elapsed / 1000.0;
    sceneObject.rotation.rotz += sceneObject.rotation.rotSpeedZ * elapsed / 1000.0;
    sceneObject.position.update();
  }
};

exports.animate = animate;
var reDrawID = 0;
exports.reDrawID = reDrawID;
var secondPass = 0;
var physicsLooper = 0,
    lt = 0;

_manifest.default.operation.reDrawGlobal = function (time) {
  (0, _engine.modifyLooper)(0);
  exports.reDrawID = reDrawID = requestAnimationFrame(_matrixWorld.reDraw);

  _matrixWorld.world.renderPerspective();

  for (var t = 0; t < _manifest.default.updateBeforeDraw.length; t++) {
    _manifest.default.updateBeforeDraw[t].UPDATE();
  }

  if (_matrixWorld.world.physics !== null) {
    var dt = (time - lt) / 1000;

    _matrixWorld.world.physics.world.step(1.0 / 60.0, dt, 3);

    lt = time;

    while (physicsLooper <= _matrixWorld.world.contentList.length - 1) {
      if (_matrixWorld.world.contentList[physicsLooper].physics.enabled) {
        var local = _matrixWorld.world.contentList[physicsLooper];
        local.position.SetX(local.physics.currentBody.position.x);
        local.position.SetZ(local.physics.currentBody.position.y);
        local.position.SetY(local.physics.currentBody.position.z);
        _matrixWorld.world.contentList[physicsLooper].rotation.rotx = (0, _utility.radToDeg)(local.physics.currentBody.quaternion.toAxisAngle()[1]);
        _matrixWorld.world.contentList[physicsLooper].rotation.roty = (0, _utility.radToDeg)(local.physics.currentBody.quaternion.toAxisAngle()[1]);
        _matrixWorld.world.contentList[physicsLooper].rotation.rotz = (0, _utility.radToDeg)(local.physics.currentBody.quaternion.toAxisAngle()[1]);
        _matrixWorld.world.contentList[physicsLooper].rotation.x = local.physics.currentBody.quaternion.toAxisAngle()[0].x;
        _matrixWorld.world.contentList[physicsLooper].rotation.y = local.physics.currentBody.quaternion.toAxisAngle()[0].z;
        _matrixWorld.world.contentList[physicsLooper].rotation.z = local.physics.currentBody.quaternion.toAxisAngle()[0].y;
      }

      physicsLooper++;
    }
  }

  while (_engine.looper <= _matrixWorld.world.contentList.length - 1) {
    if ('triangle' == _matrixWorld.world.contentList[_engine.looper].type) {
      _matrixWorld.world.GL.gl.useProgram(_matrixWorld.world.contentList[_engine.looper].shaderProgram);

      _matrixWorld.world.drawTriangle(_matrixWorld.world.contentList[_engine.looper]);

      _matrixWorld.world.animate(_matrixWorld.world.contentList[_engine.looper]);
    } else if ('square' == _matrixWorld.world.contentList[_engine.looper].type) {
      _matrixWorld.world.GL.gl.useProgram(_matrixWorld.world.contentList[_engine.looper].shaderProgram);

      _matrixWorld.world.drawSquare(_matrixWorld.world.contentList[_engine.looper]);

      _matrixWorld.world.animate(_matrixWorld.world.contentList[_engine.looper]);
    } else if ('cube' == _matrixWorld.world.contentList[_engine.looper].type || 'cubeTex' == _matrixWorld.world.contentList[_engine.looper].type || 'cubeLightTex' == _matrixWorld.world.contentList[_engine.looper].type) {
      _matrixWorld.world.GL.gl.useProgram(_matrixWorld.world.contentList[_engine.looper].shaderProgram);

      _matrixWorld.world.drawCube(_matrixWorld.world.contentList[_engine.looper]);

      _matrixWorld.world.animate(_matrixWorld.world.contentList[_engine.looper]);
    } else if ('pyramid' == _matrixWorld.world.contentList[_engine.looper].type) {
      _matrixWorld.world.GL.gl.useProgram(_matrixWorld.world.contentList[_engine.looper].shaderProgram);

      _matrixWorld.world.drawPyramid(_matrixWorld.world.contentList[_engine.looper]);

      _matrixWorld.world.animate(_matrixWorld.world.contentList[_engine.looper]);
    } else if ('obj' == _matrixWorld.world.contentList[_engine.looper].type) {
      _matrixWorld.world.GL.gl.useProgram(_matrixWorld.world.contentList[_engine.looper].shaderProgram);

      _matrixWorld.world.drawObj(_matrixWorld.world.contentList[_engine.looper]);

      _matrixWorld.world.animate(_matrixWorld.world.contentList[_engine.looper]);
    } else if ('squareTex' == _matrixWorld.world.contentList[_engine.looper].type) {
      _matrixWorld.world.GL.gl.useProgram(_matrixWorld.world.contentList[_engine.looper].shaderProgram);

      _matrixWorld.world.drawSquareTex(_matrixWorld.world.contentList[_engine.looper]);

      _matrixWorld.world.animate(_matrixWorld.world.contentList[_engine.looper]);
    } else if ('sphereLightTex' == _matrixWorld.world.contentList[_engine.looper].type || 'sphere' == _matrixWorld.world.contentList[_engine.looper].type || 'generatorLightTex' == _matrixWorld.world.contentList[_engine.looper].type) {
      _matrixWorld.world.GL.gl.useProgram(_matrixWorld.world.contentList[_engine.looper].shaderProgram);

      _matrixWorld.world.drawSphere(_matrixWorld.world.contentList[_engine.looper]);

      _matrixWorld.world.animate(_matrixWorld.world.contentList[_engine.looper]);
    }

    (0, _engine.modifyLooper)(_engine.looper + 1);
  }

  if (_manifest.default.raycast) {
    if (secondPass <= 2) {
      raycaster.touchCoordinate.enabled = false;
      secondPass = 0;
    }
  }

  secondPass++;
  physicsLooper = 0;
  (0, _engine.updateFPS)(1);
};
/* Field of view, Width height ratio, min distance of viewpoint, max distance of viewpoint, */


_manifest.default.operation.CameraPerspective = function () {
  this.GL.gl.viewport(0, 0, canvas.width, canvas.height);
  this.GL.gl.clear(this.GL.gl.COLOR_BUFFER_BIT | this.GL.gl.DEPTH_BUFFER_BIT);
  mat4.perspective(this.pMatrix, degToRad(_manifest.default.camera.viewAngle), this.GL.gl.viewportWidth / this.GL.gl.viewportHeight, _manifest.default.camera.nearViewpoint, _manifest.default.camera.farViewpoint);
};

var callReDraw_ = function () {
  requestAnimationFrame(_matrixWorld.reDraw);
};

exports.callReDraw_ = callReDraw_;

},{"../program/manifest":25,"./engine":4,"./matrix-world":17,"./raycast":19,"./utility":20}],13:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.generateShaderSrc = generateShaderSrc;
exports.generateShaderSimpleDirection = generateShaderSimpleDirection;
exports.generateVShaderSimpleDirectionLight = generateVShaderSimpleDirectionLight;
exports.generateCustomShaderSrc = generateCustomShaderSrc;

function generateShaderSrc(numTextures, mixOperand, spotLight) {
  return `
    // shader for ${numTextures} textures
    precision mediump float;
    precision highp float;
    varying vec2 vTextureCoord;
    varying vec3 vLightWeighting;

    uniform float textureSamplerAmount[${numTextures}];
    int MixOperandString = ${mixOperand};

    uniform sampler2D uSampler;
    uniform sampler2D uSampler1;
    uniform sampler2D uSampler2;
    uniform sampler2D uSampler3;
    uniform sampler2D uSampler4;
    uniform sampler2D uSampler5;
    uniform sampler2D uSampler6;
    uniform sampler2D uSampler7;

    ` + (typeof spotLight !== 'undefined' ? generateSpotLightDefinitions() : ``) + `
    void main(void) {

        vec4 textureColor = texture2D(uSampler, vec2(vTextureCoord.s, vTextureCoord.t));
        vec4 textureColor1 = texture2D(uSampler1, vec2(vTextureCoord.s, vTextureCoord.t));
        vec4 textureColor2 = texture2D(uSampler2, vec2(vTextureCoord.s, vTextureCoord.t));
        vec4 textureColor3 = texture2D(uSampler3, vec2(vTextureCoord.s, vTextureCoord.t));
        vec4 textureColor4 = texture2D(uSampler4, vec2(vTextureCoord.s, vTextureCoord.t));
        vec4 textureColor5 = texture2D(uSampler5, vec2(vTextureCoord.s, vTextureCoord.t));
        vec4 textureColor6 = texture2D(uSampler6, vec2(vTextureCoord.s, vTextureCoord.t));
        vec4 textureColor7 = texture2D(uSampler7, vec2(vTextureCoord.s, vTextureCoord.t));

        if (${numTextures} == 1) {
          gl_FragColor      = vec4(textureColor.rgb * vLightWeighting, textureColor.a);
          //  gl_FragColor = vec4( smoothstep(textureColor.r, textureColor.b,textureColor.g ) , smoothstep(textureColor.r, textureColor.b,textureColor.g ) ,0 ,smoothstep(textureColor.r, textureColor.b,textureColor.g ) );
        } else if (${numTextures} == 2) {
          if ( ${mixOperand} == 0) {
            gl_FragColor      = vec4( (textureColor.rgb * textureColor1.rgb) * vLightWeighting, textureColor.a);
          } else if (${mixOperand} == 1) {
            gl_FragColor      = vec4( (textureColor.rgb / textureColor1.rgb) * vLightWeighting, textureColor.a);
          }
        } else if (${numTextures} == 3) {
          if (${mixOperand} == 0) {
            gl_FragColor =vec4( (textureColor.rgb * textureColor1.rgb * textureColor2.rgb ) * vLightWeighting, textureColor.a);
          }
          else if (${mixOperand} == 1) {
            gl_FragColor = vec4( (textureColor.rgb * textureColor1.rgb / textureColor2.rgb ) * vLightWeighting, textureColor.a);
          }
        } else if (${numTextures} == 4) {
            if (${mixOperand} == 0) {
              gl_FragColor = textureColor * textureColor1 * textureColor2 * textureColor3;
            }
            else if (${mixOperand} == 1) {
              gl_FragColor = textureColor / textureColor1 / textureColor2 /  textureColor3;
            }
        }

        ` + (typeof spotLight !== 'undefined' ? generateSpotLightMain() : ``) + `
    }
    // uniform sampler2D uSampler[${numTextures}];
    // uniform float uMixAmount[${numTextures}];
    /*
    void main() {
        vec4 color = vec4(0);
        for (int i = 0; i < ${numTextures}; ++i) {
            vec4 texColor = texture2D(uSampler[i], vTextureCoord);
            color = mix(color, texColor, uMixAmount[i]);
        }
        gl_FragColor = color;
    }
    */
    `;
}

function generateShaderSimpleDirection() {
  return `
  precision mediump float;
  precision highp float;

  varying vec4 vColor;
  varying vec3 vLightWeighting;

  void main(void) {

    // gl_FragColor      = vec4(vColor.rgb * vLightWeighting, vColor.a);
    gl_FragColor      = vec4(vColor.rgb * vLightWeighting, vColor.a);
    // gl_FragColor = vColor; // u_color;
  }
  `;
}

function generateVShaderSimpleDirectionLight() {
  return `
  attribute vec3 aVertexPosition;
  attribute vec4 aVertexColor;
  attribute vec3 aVertexNormal;
  
  uniform mat4 uMVMatrix;
  uniform mat4 uPMatrix;
  uniform mat3 uNMatrix;

  uniform vec3 uLightingDirection;
  uniform vec3 uDirectionalColor;
  uniform bool uUseLighting;
  varying vec3 vLightWeighting;

  varying vec4 vColor;

  void main(void) {
    gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);

    vec3 transformedNormal          = uNMatrix * aVertexNormal;
    float directionalLightWeighting = max(dot(transformedNormal, uLightingDirection), 0.0);
    vLightWeighting                 = uDirectionalColor * directionalLightWeighting;

    vColor      = aVertexColor;

    // vColor      = aVertexColor;

  }
  `;
}

function generateSpotLightDefinitions() {
  return `// Passed in from the vertex shader.
  varying vec3 v_normal;
  varying vec3 v_surfaceToLight;
  varying vec3 v_surfaceToView;

  uniform vec4 u_color;
  uniform float u_shininess;
  uniform vec3 u_lightDirection;
  uniform float u_innerLimit;          // in dot space
  uniform float u_outerLimit;          // in dot space
  //
  `;
}

function generateSpotLightMain() {
  return `
  //
  // because v_normal is a varying it's interpolated
  // so it will not be a unit vector. Normalizing it
  // will make it a unit vector again
  vec3 normal = normalize(v_normal);

  vec3 surfaceToLightDirection = normalize(v_surfaceToLight);
  vec3 surfaceToViewDirection = normalize(v_surfaceToView);
  vec3 halfVector = normalize(surfaceToLightDirection + surfaceToViewDirection);

  float dotFromDirection = dot(surfaceToLightDirection,
                               -u_lightDirection);
  float limitRange = u_innerLimit - u_outerLimit;
  float inLight = clamp((dotFromDirection - u_outerLimit) / limitRange, 0.0, 1.0);
  float light = inLight * dot(normal, surfaceToLightDirection);
  float specular = inLight * pow(dot(normal, halfVector), u_shininess);

  // Lets multiply just the color portion (not the alpha)
  // by the light
  gl_FragColor.rgb *= light;
  // Just add in the specular
  gl_FragColor.rgb += specular;
  //
  `;
} // make custom shader


function generateCustomShaderSrc(numTextures, mixOperand, code_) {
  return `

    // shader for ${numTextures} textures
    precision mediump float;
    precision highp float;

    varying vec2 vTextureCoord;
    varying vec3 vLightWeighting;

    uniform float textureSamplerAmount[${numTextures}];
    float TimeFor;

    int MixOperandString = ${mixOperand};
    int CODE = ${code_};

    uniform sampler2D uSampler;
    uniform sampler2D uSampler1;
    uniform sampler2D uSampler2;
    uniform sampler2D uSampler3;
    uniform sampler2D uSampler4;
    uniform sampler2D uSampler5;
    uniform sampler2D uSampler6;
    uniform sampler2D uSampler7;

    void main(void) {

        vec4 textureColor = texture2D(uSampler, vec2(vTextureCoord.s, vTextureCoord.t));
        vec4 textureColor1 = texture2D(uSampler1, vec2(vTextureCoord.s, vTextureCoord.t));
        vec4 textureColor2 = texture2D(uSampler2, vec2(vTextureCoord.s, vTextureCoord.t));
        vec4 textureColor3 = texture2D(uSampler3, vec2(vTextureCoord.s, vTextureCoord.t));
        vec4 textureColor4 = texture2D(uSampler4, vec2(vTextureCoord.s, vTextureCoord.t));
        vec4 textureColor5 = texture2D(uSampler5, vec2(vTextureCoord.s, vTextureCoord.t));
        vec4 textureColor6 = texture2D(uSampler6, vec2(vTextureCoord.s, vTextureCoord.t));
        vec4 textureColor7 = texture2D(uSampler7, vec2(vTextureCoord.s, vTextureCoord.t));

        // MixOperandString  make it with eval todo task

        if (  ${numTextures} == 1)
        {

            if  ( CODE == 0 ) {

                gl_FragColor      = vec4(textureColor.rgb * vLightWeighting, textureColor.a);

            }
            else if (CODE == 1){

                gl_FragColor = vec4( smoothstep(textureColor.r, textureColor.b,textureColor.g ) , smoothstep(textureColor.r, textureColor.b,textureColor.g ) , 0 , 1 );

            }
            else if (CODE == 2){

                gl_FragColor = vec4( smoothstep(textureColor.r, textureColor.b , textureColor.g ) , 1 , 0 , 1 );

            }
            else if (CODE == 3){

                gl_FragColor = vec4( smoothstep( textureColor.g , textureColor.b , 0.5 ) , 1 , 0 , 1 );

            }
            else if (CODE == 4){

                // textureColor
                vec2 position =  vTextureCoord;
                float color = 0.3;
                gl_FragColor = vec4( vec3( color , color * 0.5, sin( color + TimeFor / 3.0 ) * 0.75 ), 1.0 );

            }

        }
        else if (${numTextures} == 2)
        {
            if ( ${mixOperand} == 0){
                gl_FragColor      = vec4( (textureColor.rgb * textureColor1.rgb) * vLightWeighting, textureColor.a);
            }
            else if (${mixOperand} == 1){
                gl_FragColor      = vec4( (textureColor.rgb / textureColor1.rgb) * vLightWeighting, textureColor.a);
            }

        }
        else if (${numTextures} == 3)
        {
            if (MixOperandString == 0){
                gl_FragColor =vec4( (textureColor.rgb * textureColor1.rgb * textureColor2.rgb ) * vLightWeighting, textureColor.a);
            }
            else if (MixOperandString == 1){
                gl_FragColor = vec4( (textureColor.rgb * textureColor1.rgb / textureColor2.rgb ) * vLightWeighting, textureColor.a);
            }

        }
        else if (${numTextures} == 4)
        {
            if (MixOperandString == 0){
                gl_FragColor = textureColor * textureColor1 * textureColor2 * textureColor3;
            }
            else if (MixOperandString == 1){
                gl_FragColor = textureColor / textureColor1 / textureColor2 /  textureColor3;
            }

        }

    }

    // uniform sampler2D uSampler[${numTextures}];
    // uniform float uMixAmount[${numTextures}];

    /*
     void main() {
     vec4 color = vec4(0);

     for (int i = 0; i < ${numTextures}; ++i) {
     vec4 texColor = texture2D(uSampler[i], vTextureCoord);
     color = mix(color, texColor, uMixAmount[i]);
     }

     gl_FragColor = color;
     }
     */

    `;
}

},{}],14:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MatrixShadowSpot = void 0;

var _utility = require("./utility");

var _manifest = _interopRequireDefault(require("../program/manifest"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @description MatrixShadowSpot
 * Holder for locallight data
 * with basic animation values features.
 */
class MatrixShadowSpot {
  constructor() {
    this.lightPosition = [0, 0, 2];
    this.shininess = 150;
    this.lightRotationX = 0;
    this.lightRotationY = 0; // this is computed in updateScene

    this.lightDirection = [0, 0, -1];
    this.innerLimit = degToRad(0);
    this.outerLimit = degToRad(20);
    this.idUpdater = null;
    this.r = null;
    this.ir = null;
    this.p = null;
    this.posX = null;
    this.posY = null;
    this.posZ = null;
    this.o = null;
    this.flyArroundByIndexs = [1, 2];
    this.centerX = 0;
    this.centerY = 0;

    this.activeUpdate = () => {
      this.idUpdater = _manifest.default.updateBeforeDraw.length;

      _manifest.default.updateBeforeDraw.push(this);
    };

    this.deactivateUpdate = () => {
      _manifest.default.updateBeforeDraw.splice(this.idUpdater, 1);

      this.UPDATE = function () {};
    };

    this.UPDATE = function () {};

    this.animateRadius = function (option) {
      if (typeof option === 'undefined') var option = {
        from: 0,
        to: 120,
        step: 1
      };
      this.r = new _utility.OSCILLATOR(option.from, option.to, option.step);
      this.UPDATE = this.lightRadius;
    };

    this.animateInnerRadius = function (option) {
      if (typeof option === 'undefined') var option = {
        from: 0,
        to: 120,
        step: 1
      };
      this.ir = new _utility.OSCILLATOR(option.from, option.to, option.step);
      this.UPDATE = this.lightInnerRadius;
    };

    this.animatePositionX = function (option) {
      if (typeof option === 'undefined') var option = {
        from: -2,
        to: 2,
        step: 0.1
      };
      this.posX = new _utility.OSCILLATOR(option.from, option.to, option.step);
      this.UPDATE = this.positionXLight;
    };

    this.animatePositionY = function (option) {
      if (typeof option === 'undefined') var option = {
        from: -2,
        to: 2,
        step: 0.1
      };
      this.posY = new matrixEngine.utility.OSCILLATOR(option.from, option.to, option.step);
      this.UPDATE = this.positionYLight;
    };

    this.animatePositionZ = function (option) {
      if (typeof option === 'undefined') var option = {
        from: -2,
        to: 2,
        step: 0.1
      };
      this.posZ = new matrixEngine.utility.OSCILLATOR(option.from, option.to, option.step);
      this.UPDATE = this.positionZLight;
    };

    this.flyArround = function (option) {
      if (typeof option === 'undefined') {
        var option = {
          from: 0.1,
          to: 0.2,
          step: 0.01,
          centerX: 0,
          centerY: 0,
          flyArroundByIndexs: [1, 2]
        };
      }

      this.flyArroundByIndexs = option.flyArroundByIndexs;
      if (option.centerX) this.centerX = option.centerX;
      if (option.centerY) this.centerY = option.centerY;
      this.o = new _utility.OSCILLATOR(option.from, option.to, option.step);
      this.UPDATE = this.makeFlyArround;
    };
  }

  makeFlyArround() {
    // console.log("TETS")
    this.lightPosition = (0, _utility.ORBIT_FROM_ARRAY)(this.centerX, this.centerY, this.o.UPDATE(), this.lightPosition, this.flyArroundByIndexs);
  }

  lightRadius() {
    this.outerLimit = degToRad(this.r.UPDATE());
  }

  lightInnerRadius() {
    this.innerLimit = degToRad(this.ir.UPDATE());
  }

  positionXLight() {
    this.lightPosition[0] = this.posX.UPDATE();
  }

  positionYLight() {
    this.lightPosition[1] = this.posY.UPDATE();
  }

  positionZLight() {
    this.lightPosition[2] = this.posZ.UPDATE();
  }

}

exports.MatrixShadowSpot = MatrixShadowSpot;

},{"../program/manifest":25,"./utility":20}],15:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MatrixButton = exports.MatrixCameraController = exports.MatrixLightComponent = exports.MatrixInput = void 0;
const standardStyle = `
  width: 150px;
  font-size: 26px;
  background: black;
  color: #0080ff;
  font-family: stormfaze;
  border-style: solid;
  text-align: center;
  outline: none;
`;

class MatrixInput extends HTMLElement {
  constructor(...args) {
    super(...args);
    const shadowRoot = this.attachShadow({
      mode: 'open'
    });
    let inputElement = document.createElement('input');
    inputElement.setAttribute('id', this.getAttribute('id'));
    inputElement.setAttribute('type', this.getAttribute('type'));
    inputElement.setAttribute('value', this.getAttribute('value'));
    inputElement.setAttribute('max', this.getAttribute('max'));
    inputElement.setAttribute('min', this.getAttribute('min')); // need trick
    // inputElement.setAttribute('class', this.getAttribute('class'));
    // predefined

    inputElement.setAttribute('style', standardStyle);
    if (this.getAttribute('style') !== null) inputElement.setAttribute('style', this.getAttribute('style'));
    inputElement.addEventListener('focus', () => {// console.log('focus on spot input');
    });
    inputElement.addEventListener('change', e => {
      console.log('changed', e.path[0].value);
      this.setAttribute('value', e.path[0].value);
    });
    if (typeof args[0] === 'function') inputElement.addEventListener('change', args[0]);
    shadowRoot.appendChild(inputElement);
  }

}

exports.MatrixInput = MatrixInput;

class MatrixLightComponent extends MatrixInput {
  constructor(...args) {
    super(...args);
  }

}

exports.MatrixLightComponent = MatrixLightComponent;

class MatrixCameraController extends MatrixInput {
  constructor(...args) {
    super(...args, e => {
      this.setAttribute('value', e.path[0].value); // dispatchEvent()
    }); // console.log("TEST ARGS ", args)

    let reactOnChange = this.getAttribute('id');
  }

}

exports.MatrixCameraController = MatrixCameraController;

class MatrixButton extends HTMLButtonElement {
  constructor(...args) {
    super(...args); // Attaches a shadow root to your custom element.

    const shadowRoot = this.attachShadow({
      mode: 'open'
    }); // Defines the "real" input element.

    let inputElement = document.createElement('input');
    inputElement.setAttribute('type', this.getAttribute('type'));
    shadowRoot.appendChild(inputElement);
    this.addEventListener('focus', () => {
      console.log('Focus on matrix-engine-btn');
    });
  }

}

exports.MatrixButton = MatrixButton;

},{}],16:[function(require,module,exports){
/* globals App world */
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _manifest = _interopRequireDefault(require("../program/manifest"));

var _matrixWorld = require("./matrix-world");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @description
 * initTextures Load image file procedure.
 */
_manifest.default.tools.loadTextureImage = function (gl, src) {
  var texture = gl.createTexture();
  texture.image = new Image();
  texture.image.crossOrigin = 'anonymous';

  texture.image.onload = function () {
    _matrixWorld.world.handleLoadedTexture(texture, gl);
  };

  texture.image.src = src;
  return texture;
};
/**
 * @description
 * Basic image textures
 */


_manifest.default.tools.BasicTextures = function (texture, gl) {
  gl.bindTexture(gl.TEXTURE_2D, texture);
  gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, texture.image);
  gl.bindTexture(gl.TEXTURE_2D, null);
};

_manifest.default.tools.loadVideoTexture = function (name, image) {
  if (!image) return;
  if (image.width == 1) return;
  var name_ = name;
  var gl = _matrixWorld.world.GL.gl;

  if (typeof _manifest.default.textures[name_] === 'undefined') {
    _manifest.default.textures[name_] = gl.createTexture();
  }

  gl.activeTexture(gl.TEXTURE0);
  gl.bindTexture(gl.TEXTURE_2D, _manifest.default.textures[name_]);
  gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR); //gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
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

_manifest.default.tools.createPixelsTex = function (options) {
  if (typeof options === 'undefined') {
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
    var I = 0,
        localCounter = 0;

    for (var funny = 0; funny < options.squareShema[0] * options.squareShema[1] * 4; funny += 4) {
      localCounter++;

      if (I == options?.style.color1) {
        I = options?.style.color2;
      } else {
        I = options?.style.color1;
      } // if (parseInt(funny) % 32 == 0) { work also


      if (parseInt(localCounter - 1) % options.squareShema[0] == 0) {
        if (I == options?.style.color1) {
          I = options?.style.color2;
        } else {
          I = options?.style.color1;
        }
      }

      options.pixels[funny] = I;
      options.pixels[funny + 1] = I;
      options.pixels[funny + 2] = I;
      options.pixels[funny + 3] = 1;
    }
  }

  const texture = _matrixWorld.world.GL.gl.createTexture();

  _matrixWorld.world.GL.gl.bindTexture(_matrixWorld.world.GL.gl.TEXTURE_2D, texture);

  _matrixWorld.world.GL.gl.texParameteri(_matrixWorld.world.GL.gl.TEXTURE_2D, _matrixWorld.world.GL.gl.TEXTURE_MIN_FILTER, _matrixWorld.world.GL.gl.NEAREST);

  _matrixWorld.world.GL.gl.texParameteri(_matrixWorld.world.GL.gl.TEXTURE_2D, _matrixWorld.world.GL.gl.TEXTURE_MAG_FILTER, _matrixWorld.world.GL.gl.NEAREST);

  _matrixWorld.world.GL.gl.texImage2D(_matrixWorld.world.GL.gl.TEXTURE_2D, 0, _matrixWorld.world.GL.gl.RGBA, options.squareShema[0], options.squareShema[1], 0, _matrixWorld.world.GL.gl.RGBA, _matrixWorld.world.GL.gl.UNSIGNED_BYTE, options.pixels);

  return texture;
};

var _default = _manifest.default.textools;
exports.default = _default;

},{"../program/manifest":25,"./matrix-world":17}],17:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.modifyFrames = modifyFrames;
exports.defineworld = defineworld;
exports.reDraw = exports.objListToDispose = exports.world = exports.frames = void 0;

var _manifest = _interopRequireDefault(require("../program/manifest"));

var _engine = require("./engine");

var _matrixRender = require("./matrix-render");

var _matrixDraws = _interopRequireDefault(require("./matrix-draws"));

var _matrixTags = require("./matrix-tags");

var _utility = require("./utility");

var _matrixGeometry = require("./matrix-geometry");

var _physics = _interopRequireDefault(require("./physics"));

var _matrixShadows = require("./matrix-shadows");

var _matrixInitShaders = require("./matrix-init-shaders");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable no-unused-vars */
// define shaders from code
(0, _matrixInitShaders.loadShaders2)();
/* Width and Height variables of the browser screen  */

var frames = 0; // must be fixed

exports.frames = frames;

function modifyFrames(newFrames) {
  exports.frames = frames = newFrames;
}

var world = {};
exports.world = world;
var updateFrames = 0;
/* Because JavaScript is third class in mouse events */
// var mouseLoc = defineMouseLocationObject();

/* Common sense to object disposition                */

var objListToDispose = new Array();
/* Need to stop the redraw when disposing            */
// var reDrawID = 0;

exports.objListToDispose = objListToDispose;
var reDraw = null;
/**
 * @description
 * Define custom tags for new upgrade for light systems.
 */

exports.reDraw = reDraw;
window.customElements.define('matrix-camera', _matrixTags.MatrixCameraController); // window.customElements.define('matrix-light', MatrixLightComponent, {extends:'input'});

window.customElements.define('matrix-light', _matrixTags.MatrixLightComponent); // var X = Object.create(HTMLInputElement.prototype);
// window.customElements.define('matrix-light', X);

function defineworld(canvas) {
  // define shaders from code
  // console.log("  Define the world");
  exports.world = world = new Object();
  /*  Constructor for a world                       */

  world.GL = new _engine.defineWebGLWorld(canvas);
  /*  Exit if WEBGL could not initialize            */

  if ('undefined' == typeof world.GL.gl) {
    // console.log("  Exception in Base world creation");
    delete this.GL;
    delete this;
    return 0;
  } else {
    // console.log("  Setting WEBGL base attributes");
    world.GL.gl.clearColor(_manifest.default.glBackgroundColor.r, _manifest.default.glBackgroundColor.g, _manifest.default.glBackgroundColor.b, _manifest.default.glBackgroundColor.a);
    world.GL.gl.enable(world.GL.gl.DEPTH_TEST);
    (0, _engine.initiateFPS)();
  }
  /* Complete declarations if pending            */


  world.pMatrix = mat4.create();
  world.mvMatrixStack = new Array();
  /* Contents of the world                       */

  world.contentList = new Array();
  /* Assign to the garbage collector object      */

  objListToDispose[objListToDispose.length] = world; // get data about gl limitation
  // Must be improved

  _manifest.default.limitations.maxTexturesInFragmentShader = world.GL.gl.getParameter(world.GL.gl.MAX_TEXTURE_IMAGE_UNITS);
  _manifest.default.limitations.ALIASED_POINT_SIZE_RANGE = world.GL.gl.getParameter(world.GL.gl.ALIASED_POINT_SIZE_RANGE);
  _manifest.default.limitations.DEPTH_BITS = world.GL.gl.getParameter(world.GL.gl.DEPTH_BITS);
  _manifest.default.limitations.MAX_SAMPLES = world.GL.gl.getParameter(world.GL.gl.MAX_SAMPLES);
  _manifest.default.limitations.MAX_TEXTURE_SIZE = world.GL.gl.getParameter(world.GL.gl.MAX_TEXTURE_SIZE);
  _manifest.default.limitations.MAX_VERTEX_ATTRIBS = world.GL.gl.getParameter(world.GL.gl.MAX_VERTEX_ATTRIBS);
  _manifest.default.limitations.MAX_ELEMENTS_VERTICES = world.GL.gl.getParameter(world.GL.gl.MAX_ELEMENTS_VERTICES);
  /*****************************************************/

  /*       World base functions                        */

  /* Get the fragment or vertex shader                 */

  world.getShader = _engine.loadShaders;
  /* Initialize shader fragment                        */

  world.initShaders = _engine.initShaders;
  world.handleLoadedTexture = _manifest.default.tools.BasicTextures;
  world.initTexture = _manifest.default.tools.loadTextureImage;

  world.disableUnusedAttr = function (gl, vertLimit) {
    var Local_looper1 = vertLimit; // var Local_looper1 = 0;
    // position, color, texture and normals

    while (Local_looper1 < 4) {
      gl.disableVertexAttribArray(Local_looper1);
      Local_looper1 = Local_looper1 + 1;
    }
  };
  /*
    world.disableUnusedAttr = function(gl,vertLimit) {
    // var Local_looper1 = vertLimit;
    var Local_looper1 = 0;
    /// position, color, texture and normals
    while (Local_looper1 < vertLimit) {
    gl.disableVertexAttribArray(Local_looper1);
    Local_looper1 = Local_looper1 + 1;
    }
    }
  */
  // Bind base methods

  /* Push Matrix                              */


  world.mvPushMatrix = _manifest.default.operation.PUSH_MATRIX;
  /* Pop Matrix                               */

  world.mvPopMatrix = _manifest.default.operation.POP_MATRIX;
  /* Set uniform Matrix                       */

  world.setMatrixUniforms = _manifest.default.operation.SET_MATRIX_UNIFORMS;
  /* Draw Perspective                         */

  world.renderPerspective = _manifest.default.operation.CameraPerspective;
  /* Calculate rotatory speed                 */

  world.animate = _matrixRender.animate;
  /* Buffer Triangle                          */

  world.bufferTriangle = _manifest.default.operation.triangle_buffer_procedure;
  /* Draw Triangle                            */

  world.drawTriangle = _manifest.default.operation.draws.triangle;
  /* Buffer Square                            */

  world.bufferSquare = _manifest.default.operation.square_buffer_procedure;
  /* Draw Square                              */

  world.drawSquare = _manifest.default.operation.draws.square;
  world.bufferObj = _manifest.default.operation.obj_buffer_procedure;
  /* Buffer Cube                              */

  world.bufferCube = _manifest.default.operation.cube_buffer_procedure;
  /* Draw Cube                                */

  world.drawCube = _manifest.default.operation.draws.cube;
  /* Buffer Pyramid                           */

  world.bufferPyramid = _manifest.default.operation.piramide_buffer_procedure;
  /* Draw Pyramid                             */

  world.drawPyramid = _manifest.default.operation.draws.piramide;
  /* Draw Obj file                            */

  world.drawObj = _manifest.default.operation.draws.drawObj;
  world.bufferSquareTex = _manifest.default.operation.squareTex_buffer_procedure;
  world.drawSquareTex = _manifest.default.operation.draws.drawSquareTex;
  world.drawSprite2d = _manifest.default.operation.draws.sprite2d;
  world.bufferSprite2d = _manifest.default.operation.sprite2d_buffer_procedure;
  world.drawSphere = _manifest.default.operation.draws.sphere;
  world.bufferSphere = _manifest.default.operation.sphere_buffer_procedure;
  /* Repeated draw functionality            */
  // eslint-disable-next-line no-global-assign

  exports.reDraw = reDraw = _manifest.default.operation.reDrawGlobal;
  /**
   * @MatrixPhysics
   * Must be disabled on default run.
   * Return cannon world.
   */

  world.physics = null;

  world.loadPhysics = function (gravityVector = [0, 0, -9.82]) {
    world.physics = new _physics.default(gravityVector);
    return world.physics;
  };
  /* Fill world based on content           */


  world.Add = function (filler, size, nameUniq, texturesPaths, mesh_, animationConstruct_) {
    /*
      Common conventions to be followed across
      Contents can contain any type of objects. Each object can be a triangle, cube etc.
      object.type           =  Contains the type of object namely triangle, cube
      object.size           =  Contains the size of the object. 1 unit will be the same as how WEBGL assumes 1 as in an array
      object.sides          =  Contains the number of sides. This needs to be first declared.  (To be built and used)
      object.shaderProgram  =  Contains the fragment and vertex shader
      object.rotation       =  Rotator
      object.color          =  Will contain colors based on the sides clockwise. One vertice -> [R,G,B,alpha]
      object.texture        =  If texture is present then this will be used.           (To be built and used)
      object.vertexPositionBuffer =  allocated during buffering
      object.vertexColorBuffer    =  allocated during buffering
      object.vertexTexCoordBuffer =  allocated during buffering
      object.vertexIndexBuffer    =  allocated during buffering
    */
    // console.info("Fill world with:" + filler + " of size:" + size);
    if ('triangle' == filler) {
      var triangleObject = new Object();

      if (typeof nameUniq != 'undefined') {
        triangleObject.name = nameUniq;
      } else {
        triangleObject.name = 'triangle_instance_' + Math.floor(Math.random() * 100000 + 1);
      }

      triangleObject.streamTextures = null;
      triangleObject.type = filler;
      triangleObject.size = size;
      triangleObject.sides = 3;
      triangleObject.shaderProgram = this.initShaders(this.GL.gl, filler + '-shader-fs', filler + '-shader-vs');
      triangleObject.position = new _matrixGeometry.Position(0, 0, -5.0);
      triangleObject.rotation = new _matrixGeometry.RotationVector(1, 0, 0);
      triangleObject.color = new _matrixGeometry.GeoOfColor('triangle');
      triangleObject.mvMatrix = mat4.create();
      triangleObject.geometry = new _matrixGeometry.TriangleVertex(triangleObject);
      triangleObject.glBlend = new _utility._glBlend(); // Physics

      triangleObject.physics = {
        enabled: false
      };
      triangleObject.instancedDraws = {
        numberOfInstance: 10,
        array_of_local_offset: [12, 0, 0],
        overrideDrawArraysInstance: function (object_) {}
      };

      if (triangleObject.shaderProgram) {
        this.bufferTriangle(triangleObject);
        triangleObject.glDrawElements = new _utility._DrawElements(triangleObject.vertexColorBuffer.numItems);
        this.contentList[this.contentList.length] = triangleObject;
        _manifest.default.scene[triangleObject.name] = triangleObject; // console.log("Buffer the " + filler + ":Store at:" + this.contentList.length);
      } else {// console.log("Triangle shader failure...");
        }
    }

    if ('square' == filler) {
      var squareObject = new Object();

      if (typeof nameUniq != 'undefined') {
        squareObject.name = nameUniq;
      } else {
        squareObject.name = 'square_instance_' + Math.floor(Math.random() * 100000 + 1);
      }

      squareObject.streamTextures = null;
      squareObject.type = filler;
      squareObject.size = size;
      squareObject.sides = 4;
      squareObject.shaderProgram = this.initShaders(this.GL.gl, filler + '-shader-fs', filler + '-shader-vs');
      squareObject.position = new _matrixGeometry.Position(0, 0, -5.0);
      squareObject.rotation = new _matrixGeometry.RotationVector(1, 0, 0);
      squareObject.color = true;
      squareObject.mvMatrix = mat4.create();
      squareObject.geometry = new _matrixGeometry.SquareVertex(squareObject);
      squareObject.glBlend = new _utility._glBlend(); // Physics

      squareObject.physics = {
        enabled: false
      };
      squareObject.instancedDraws = {
        numberOfInstance: 10,
        array_of_local_offset: [12, 0, 0],
        overrideDrawArraysInstance: function (object_) {}
      };

      if (squareObject.shaderProgram) {
        // console.log("   Buffer the " + filler + ":Store at:" + this.contentList.length);
        this.bufferSquare(squareObject); // LOOK BETTER

        squareObject.glDrawElements = new _utility._DrawElements(squareObject.vertexColorBuffer.numItems);
        squareObject.glDrawElements.mode = 'TRIANGLE_STRIP';
        this.contentList[this.contentList.length] = squareObject;
        _manifest.default.scene[squareObject.name] = squareObject;
      } else {// console.log("Square shader failure...");
      }
    }

    if ('squareTex' == filler) {
      // eslint-disable-next-line no-redeclare
      var squareObject = new Object();

      if (typeof nameUniq != 'undefined') {
        squareObject.name = nameUniq;
      } else {
        squareObject.name = 'square_instance_' + Math.floor(Math.random() * 100000 + 1);
      }

      squareObject.streamTextures = null;
      squareObject.type = filler;
      squareObject.size = size;
      squareObject.sides = 4;
      squareObject.position = new _matrixGeometry.Position(0, 0, -5.0);
      squareObject.rotation = new _matrixGeometry.RotationVector(1, 0, 0); //squareObject.color     = new GeoOfColor("4x4");

      squareObject.mvMatrix = mat4.create();
      squareObject.geometry = new _matrixGeometry.SquareVertex(squareObject);
      squareObject.glBlend = new _utility._glBlend(); // Physics

      squareObject.physics = {
        enabled: false
      };
      squareObject.LightsData = {
        directionLight: new _matrixGeometry.COLOR(1, 1, 1),
        ambientLight: new _matrixGeometry.COLOR(1, 1, 1),
        lightingDirection: new _matrixGeometry.COLOR(1, 1, 0)
      };
      squareObject.useShadows = false;

      squareObject.activateShadows = function () {
        squareObject.useShadows = true;
        squareObject.shadows = new _matrixShadows.MatrixShadowSpot();
      };

      if (typeof texturesPaths !== 'undefined') {
        if (typeof texturesPaths == 'string') {
          // Single tex
          squareObject.texture = this.initTexture(this.GL.gl, texturesPaths);
          squareObject.textures = [];
          squareObject.textures[0] = squareObject.texture;
        } else if (typeof texturesPaths == 'object') {
          // console.info("texturesPaths is object...");
          squareObject.textures = [];
          squareObject.texture = true;
          (0, _engine.RegenerateShader)('' + filler + '-shader-fs', texturesPaths.source.length, texturesPaths.mix_operation);

          for (var t = 0; t < texturesPaths.source.length; ++t) {
            squareObject.textures.push(this.initTexture(this.GL.gl, texturesPaths.source[t]));
          }

          squareObject.shaderProgram = this.initShaders(this.GL.gl, filler + '-shader-fs', filler + '-shader-vs');
        } else {
          alert('Exec add obj : texturePaths : path is unknow typeof');
        }
      } else {
        // no textures , use default single textures
        squareObject.texture = this.initTexture(this.GL.gl, 'res/images/icon2.jpg');
        squareObject.textures[0] = squareObject.texture;
        squareObject.shaderProgram = this.initShaders(this.GL.gl, filler + '-shader-fs', filler + '-shader-vs');
      }

      squareObject.LightMap = new _matrixGeometry.GeoOfColor('square');
      squareObject.custom = new Object();
      squareObject.custom.gl_texture = null;
      squareObject.instancedDraws = {
        numberOfInstance: 10,
        array_of_local_offset: [12, 0, 0],
        overrideDrawArraysInstance: function (object_) {}
      };

      if (squareObject.shaderProgram) {
        // // console.info("   Buffer the " + filler + ":Store at:" + this.contentList.length);
        this.bufferSquareTex(squareObject); // using cubeTexLight

        squareObject.glDrawElements = new _utility._DrawElements(squareObject.vertexIndexBuffer.numItems);
        this.contentList[this.contentList.length] = squareObject;
        _manifest.default.scene[squareObject.name] = squareObject;
      } else {// console.warn("   Square shader failure");
      }
    }

    if ('cube' == filler) {
      var cubeObject = new Object();

      if (typeof nameUniq != 'undefined') {
        cubeObject.name = nameUniq;
      } else {
        cubeObject.name = 'cube_instance_' + Math.floor(Math.random() * 100000 + 1);
      }

      cubeObject.streamTextures = null;
      cubeObject.type = filler;
      cubeObject.size = size;
      cubeObject.sides = 12;
      cubeObject.shaderProgram = this.initShaders(this.GL.gl, filler + '-shader-fs', filler + '-shader-vs');
      cubeObject.position = new _matrixGeometry.Position(0, 0, -5.0);
      cubeObject.rotation = new _matrixGeometry.RotationVector(1, 0, 0);
      cubeObject.color = true;
      cubeObject.mvMatrix = mat4.create();
      cubeObject.geometry = new _matrixGeometry.CubeVertex(cubeObject);
      cubeObject.instancedDraws = {
        numberOfInstance: 10,
        array_of_local_offset: [12, 0, 0],
        overrideDrawArraysInstance: function (object_) {}
      };
      cubeObject.glBlend = new _utility._glBlend(); // ? NEXT
      // cubeObject.useDirectionLight = false;
      // cubeObject.activateDirLight = () => {
      //   RegenerateShaderSimpleDirectionLight(
      //     filler + '-shader-fs');
      //   RegenerateVShaderSimpleDirectionLight(
      //     filler + '-shader-vs');
      //   cubeObject.shaderProgram = this.initShaders(this.GL.gl, filler + '-shader-fs', filler + '-shader-vs');
      //   cubeObject.useDirectionLight = true;
      // };
      // Physics

      cubeObject.physics = {
        enabled: false
      };

      if (cubeObject.shaderProgram && cubeObject.geometry) {
        // console.log("   Buffer the " + filler + ":Store at:" + this.contentList.length);
        this.bufferCube(cubeObject);
        cubeObject.glDrawElements = new _utility._DrawElements(cubeObject.vertexIndexBuffer.numItems);
        this.contentList[this.contentList.length] = cubeObject;
        _manifest.default.scene[cubeObject.name] = cubeObject;
      } else {// console.warn("   Cube shader failure");
      }
    }

    if ('sphereTex' == filler || 'sphereLightTex' == filler) {
      var sphereObject = new Object();

      if (typeof nameUniq != 'undefined') {
        sphereObject.name = nameUniq;
      } else {
        sphereObject.name = 'sphereObject_instance_' + Math.floor(Math.random() * 100000 + 1);
      }

      sphereObject.streamTextures = null;
      sphereObject.type = filler;
      sphereObject.position = new _matrixGeometry.Position(0, 0, -5.0);
      sphereObject.size = size;
      sphereObject.sides = 12;
      sphereObject.rotation = new _matrixGeometry.RotationVector(0, 1, 0); //lights

      sphereObject.LightsData = {
        directionLight: new _matrixGeometry.COLOR(1, 1, 1),
        ambientLight: new _matrixGeometry.COLOR(1, 1, 1),
        lightingDirection: new _matrixGeometry.COLOR(1, 1, 0)
      }; // Physics

      sphereObject.physics = {
        enabled: false
      };
      sphereObject.textures = [];

      if (typeof texturesPaths !== 'undefined') {
        if (typeof texturesPaths == 'string') {
          //alert('path is string')
          sphereObject.texture = this.initTexture(this.GL.gl, texturesPaths);
          sphereObject.textures.push(cubeObject.texture);
        } else if (typeof texturesPaths == 'object') {
          // console.log("path is object");
          sphereObject.textures = [];
          sphereObject.texture = true; // cubeObject.shaderProgram = this.initShaders(this.GL.gl, filler+"-shader-fs", filler+"-shader-vs");

          (0, _engine.RegenerateShader)(filler + '-shader-fs', texturesPaths.source.length, texturesPaths.mix_operation); // eslint-disable-next-line no-redeclare

          for (var t = 0; t < texturesPaths.source.length; ++t) {
            sphereObject.textures.push(this.initTexture(this.GL.gl, texturesPaths.source[t]));
          }

          sphereObject.shaderProgram = this.initShaders(this.GL.gl, filler + '-shader-fs', filler + '-shader-vs');
        } else {
          alert('Exec add obj : texturePaths : path is unknow typeof');
        }
      } else {
        // no textures , use default single textures
        sphereObject.texture = this.initTexture(this.GL.gl, 'res/images/texture_spiral1.png');
        sphereObject.textures.push(sphereObject.texture);
        sphereObject.texture = true;
        sphereObject.shaderProgram = this.initShaders(this.GL.gl, filler + '-shader-fs', filler + '-shader-vs');
      }

      sphereObject.changeMaterial = function (texturesPaths) {
        (0, _engine.RegenerateShader)(this.type + '-shader-fs', texturesPaths.source.length, texturesPaths.mix_operation);

        for (var t = 0; t < texturesPaths.source.length; ++t) {
          this.textures.push(world.initTexture(world.GL.gl, texturesPaths.source[t]));
        }

        this.shaderProgram = world.initShaders(world.GL.gl, this.type + '-shader-fs', this.type + '-shader-vs');
      };

      sphereObject.changeShader = function (texturesPaths, custom_code) {
        RegenerateCustomShader(this.type + '-shader-fs', texturesPaths.source.length, texturesPaths.mix_operation, custom_code);

        for (var t = 0; t < texturesPaths.source.length; ++t) {
          this.textures.push(world.initTexture(world.GL.gl, texturesPaths.source[t]));
        }

        this.shaderProgram = world.initShaders(world.GL.gl, this.type + '-shader-fs', this.type + '-shader-vs');
      };

      sphereObject.mvMatrix = mat4.create(); //sphereObject.LightMap   = new GeoOfColor("cube light");

      sphereObject.LightMap = undefined;

      if (typeof mesh_ !== 'undefined') {
        sphereObject.latitudeBands = mesh_.latitudeBands;
        sphereObject.longitudeBands = mesh_.longitudeBands;
        sphereObject.radius = mesh_.radius * sphereObject.size;
      } else {
        sphereObject.latitudeBands = 30;
        sphereObject.longitudeBands = 30;
        sphereObject.radius = sphereObject.size;
      }

      sphereObject.geometry = new _matrixGeometry.sphereVertex(sphereObject);
      sphereObject.instancedDraws = {
        numberOfInstance: 10,
        array_of_local_offset: [12, 0, 0],
        overrideDrawArraysInstance: function (object_) {}
      }; //draws params

      sphereObject.glBlend = new _utility._glBlend();

      if (sphereObject.shaderProgram) {
        // console.log("   Buffer the " + filler + ":Store at:" + this.contentList.length);
        this.bufferSphere(sphereObject);
        sphereObject.glDrawElements = new _utility._DrawElements(sphereObject.vertexIndexBuffer.numItems);
        this.contentList[this.contentList.length] = sphereObject;
        _manifest.default.scene[sphereObject.name] = sphereObject;
      } else {// console.warn("   Cube shader failure");
      }
    }

    if ('pyramid' == filler) {
      var pyramidObject = new Object();

      if (typeof nameUniq != 'undefined') {
        pyramidObject.name = nameUniq;
      } else {
        pyramidObject.name = 'pyramid_instance_' + Math.floor(Math.random() * 100000 + 1);
      }

      pyramidObject.streamTextures = null;
      pyramidObject.type = filler;
      pyramidObject.size = size;
      pyramidObject.sides = 8;
      pyramidObject.shaderProgram = this.initShaders(this.GL.gl, filler + '-shader-fs', filler + '-shader-vs');
      pyramidObject.position = new _matrixGeometry.Position(0, 0, -5.0);
      pyramidObject.rotation = new _matrixGeometry.RotationVector(1, 0, 0); // pyramidObject.color     = new GeoOfColor ("Piramide4");

      pyramidObject.mvMatrix = mat4.create();
      pyramidObject.geometry = new _matrixGeometry.PiramideVertex(pyramidObject); // Physics

      pyramidObject.physics = {
        enabled: false
      };
      pyramidObject.instancedDraws = {
        numberOfInstance: 10,
        array_of_local_offset: [12, 0, 0],
        overrideDrawArraysInstance: function (object_) {}
      };
      pyramidObject.glBlend = new _utility._glBlend();

      if (pyramidObject.shaderProgram) {
        // console.log("   Buffer the " + filler + ":Store at:" + this.contentList.length);
        this.bufferPyramid(pyramidObject);
        pyramidObject.glDrawElements = new _utility._DrawElements(pyramidObject.vertexColorBuffer.numItems); // !!!!!!!!!

        this.contentList[this.contentList.length] = pyramidObject;
        _manifest.default.scene[pyramidObject.name] = pyramidObject;
      } else {// console.warn("   Pyramid shader failure");
      }
    } // no physics for now


    if ('obj' == filler) {
      var objObject = new Object();

      if (typeof nameUniq != 'undefined') {
        objObject.name = nameUniq;
      } else {
        objObject.name = 'obj_instance_' + Math.floor(Math.random() * 100000 + 1);
      }

      objObject.streamTextures = null;
      objObject.type = filler;
      objObject.size = size;
      objObject.sides = 8;
      objObject.shaderProgram = this.initShaders(this.GL.gl, filler + '-shader-fs', filler + '-shader-vs');
      objObject.position = new _matrixGeometry.Position(0, -5, -8.0);
      objObject.rotation = new _matrixGeometry.RotationVector(0, 1, 0);
      objObject.color = false; // new GeoOfColor('4x4');
      // custom textures

      objObject.custom = new Object();
      objObject.custom.gl_texture = null;
      objObject.glDrawElements = new _utility._DrawElements(mesh_.indexBuffer.numItems);
      objObject.glBlend = new _utility._glBlend();
      objObject.LightsData = {
        directionLight: new _matrixGeometry.COLOR(5, 5, 5),
        ambientLight: new _matrixGeometry.COLOR(1, 1, 1),
        lightingDirection: new _matrixGeometry.COLOR(0, 1, 0)
      };

      if (typeof texturesPaths !== 'undefined') {
        if (typeof texturesPaths == 'string') {
          objObject.texture = this.initTexture(this.GL.gl, texturesPaths);
          objObject.textures = [];
          objObject.textures_texParameteri = []; //new

          objObject.textures[0] = objObject.texture;
        } else if (typeof texturesPaths == 'object') {
          // console.info("path is object");
          objObject.textures = [];
          objObject.textures_texParameteri = []; //new

          objObject.texture = true;
          (0, _engine.RegenerateShader)(filler + '-shader-fs', texturesPaths.source.length, texturesPaths.mix_operation); // eslint-disable-next-line no-redeclare

          for (var t = 0; t < texturesPaths.source.length; ++t) {
            objObject.textures.push(this.initTexture(this.GL.gl, texturesPaths.source[t]));
            objObject.textures_texParameteri.push(new _utility._glTexParameteri('TEXTURE_2D', 'TEXTURE_MAG_FILTER', 'LINEAR'));
          }

          objObject.shaderProgram = this.initShaders(this.GL.gl, filler + '-shader-fs', filler + '-shader-vs');
        } else {// console.warn("Exec add obj : texturePaths : path is unknow typeof");
        }
      } else {
        // no textures , use default single textures
        //objObject.texture = undefined;
        objObject.texture = this.initTexture(this.GL.gl, 'res/images/texture_spiral1.png');
        objObject.textures = [];
        objObject.textures[0] = objObject.texture;
      }

      objObject.LightMap = new _matrixGeometry.GeoOfColor('square');

      objObject.changeMaterial = function (texturesPaths) {
        (0, _engine.RegenerateShader)(this.type + '-shader-fs', texturesPaths.source.length, texturesPaths.mix_operation);

        for (var t = 0; t < texturesPaths.source.length; ++t) {
          this.textures.push(world.initTexture(world.GL.gl, texturesPaths.source[t]));
        }

        this.shaderProgram = world.initShaders(world.GL.gl, this.type + '-shader-fs', this.type + '-shader-vs');
      };

      objObject.mvMatrix = mat4.create(); // eslint-disable-next-line valid-typeof

      if (typeof animationConstruct_ == 'undefined' || typeof animationConstruct_ == null) {
        objObject.animation = null;
      } else {
        objObject.animation = {
          id: animationConstruct_.id,
          sumOfAniFrames: animationConstruct_.sumOfAniFrames,
          currentAni: animationConstruct_.currentAni,
          speed: animationConstruct_.speed,
          currentDraws: 0
        };
      }

      objObject.mesh = mesh_;

      if (objObject.shaderProgram) {
        // console.log("   Buffer the " + filler + ":Store at:" + this.contentList.length);
        this.bufferObj(objObject);
        this.contentList[this.contentList.length] = objObject;
        _manifest.default.scene[objObject.name] = objObject;
      } else {// console.log("   obj file shader failure");
      }
    }

    if ('cubeTex' == filler || 'cubeLightTex' == filler) {
      // eslint-disable-next-line no-redeclare
      var cubeObject = new Object();

      if (typeof nameUniq != 'undefined') {
        cubeObject.name = nameUniq;
      } else {
        cubeObject.name = 'cube_instance_' + Math.floor(Math.random() * 1000 + 1);
      }

      cubeObject.streamTextures = null;
      cubeObject.type = filler;
      cubeObject.position = new _matrixGeometry.Position(0, 0, -5.0);
      cubeObject.size = size;
      cubeObject.sides = 12;
      cubeObject.rotation = new _matrixGeometry.RotationVector(0, 1, 0); //lights

      cubeObject.LightsData = {
        directionLight: new _matrixGeometry.COLOR(1, 1, 1),
        ambientLight: new _matrixGeometry.COLOR(1, 1, 1),
        lightingDirection: new _matrixGeometry.COLOR((0, _utility.radToDeg)(0.3), (0, _utility.radToDeg)(-0.3), (0, _utility.radToDeg)(-1))
      }; // Physics

      cubeObject.physics = {
        enabled: false
      }; // Update others start

      cubeObject.useShadows = false;

      cubeObject.activateShadows = () => {
        cubeObject.useShadows = true;
        cubeObject.shadows = new _matrixShadows.MatrixShadowSpot();
        (0, _engine.RegenerateShader)(filler + '-shader-fs', texturesPaths.source.length, texturesPaths.mix_operation, true);
        cubeObject.shaderProgram = this.initShaders(this.GL.gl, filler + '-shader-fs', filler + '-shader-vs');
      };

      cubeObject.deactivateTex = () => {
        cubeObject.vertexTexCoordBufferRefVar = cubeObject.vertexTexCoordBuffer;
        cubeObject.vertexTexCoordBuffer = false;
      };

      cubeObject.createPixelsTex = _manifest.default.tools.createPixelsTex;

      cubeObject.activateTex = () => {
        cubeObject.vertexTexCoordBuffer = cubeObject.vertexTexCoordBufferRefVar;
      }; // Update others end


      cubeObject.textures = [];
      cubeObject.custom = new Object();
      cubeObject.custom.gl_texture = null;

      if (typeof texturesPaths !== 'undefined') {
        if (typeof texturesPaths == 'string') {
          //alert('path is string')
          cubeObject.texture = this.initTexture(this.GL.gl, texturesPaths);
          cubeObject.textures.push(cubeObject.texture);
        } else if (typeof texturesPaths == 'object') {
          // console.log("path is object");
          cubeObject.textures = [];
          cubeObject.texture = true; // cubeObject.shaderProgram = this.initShaders(this.GL.gl, filler+"-shader-fs", filler+"-shader-vs");

          (0, _engine.RegenerateShader)(filler + '-shader-fs', texturesPaths.source.length, texturesPaths.mix_operation); // eslint-disable-next-line no-redeclare

          for (var t = 0; t < texturesPaths.source.length; ++t) {
            cubeObject.textures.push(this.initTexture(this.GL.gl, texturesPaths.source[t]));
          }

          cubeObject.shaderProgram = this.initShaders(this.GL.gl, filler + '-shader-fs', filler + '-shader-vs');
        } else {// console.warn("Exec add obj : texturePaths : path is unknow typeof");
        }
      } else {
        // no textures , use default single textures
        cubeObject.texture = this.initTexture(this.GL.gl, 'res/images/texture_spiral1.png');
        cubeObject.textures.push(cubeObject.texture);
        cubeObject.texture = true;
        cubeObject.shaderProgram = this.initShaders(this.GL.gl, filler + '-shader-fs', filler + '-shader-vs');
      }

      cubeObject.changeMaterial = function (texturesPaths) {
        (0, _engine.RegenerateShader)(this.type + '-shader-fs', texturesPaths.source.length, texturesPaths.mix_operation);

        for (var t = 0; t < texturesPaths.source.length; ++t) {
          this.textures.push(world.initTexture(world.GL.gl, texturesPaths.source[t]));
        }

        this.shaderProgram = world.initShaders(world.GL.gl, this.type + '-shader-fs', this.type + '-shader-vs');
      };

      cubeObject.mvMatrix = mat4.create();
      cubeObject.LightMap = new _matrixGeometry.GeoOfColor('cube light');
      cubeObject.geometry = new _matrixGeometry.CubeVertex(cubeObject);
      cubeObject.instancedDraws = {
        numberOfInstance: 10,
        array_of_local_offset: [12, 0, 0],
        overrideDrawArraysInstance: function (object_) {}
      }; //draws params

      cubeObject.glBlend = new _utility._glBlend();

      if (cubeObject.shaderProgram) {
        // console.log("   Buffer the " + filler + ":Store at:" + this.contentList.length);
        this.bufferCube(cubeObject);
        cubeObject.glDrawElements = new _utility._DrawElements(cubeObject.vertexIndexBuffer.numItems);
        this.contentList[this.contentList.length] = cubeObject;
        _manifest.default.scene[cubeObject.name] = cubeObject;
      } else {
        console.log("Cube shader failure");
      }
    } // no physics for now


    if ('generatorTex' == filler || 'generatorLightTex' == filler) {
      var customObject = new Object();

      if (typeof nameUniq != 'undefined') {
        customObject.name = nameUniq;
      } else {
        customObject.name = 'customObject_instance_' + Math.floor(Math.random() * 100000 + 1);
      }

      customObject.streamTextures = null;
      customObject.type = filler;
      customObject.position = new _matrixGeometry.Position(0, 0, -5.0);
      customObject.size = size;
      customObject.sides = 12;
      customObject.rotation = new _matrixGeometry.RotationVector(0, 1, 0); //lights

      customObject.LightsData = {
        directionLight: new _matrixGeometry.COLOR(1, 1, 1),
        ambientLight: new _matrixGeometry.COLOR(1, 1, 1),
        lightingDirection: new _matrixGeometry.COLOR(1, 1, 0)
      };
      customObject.textures = [];

      if (typeof texturesPaths !== 'undefined') {
        if (typeof texturesPaths == 'string') {
          //alert('path is string')
          customObject.texture = this.initTexture(this.GL.gl, texturesPaths);
          customObject.textures.push(customObject.texture);
        } else if (typeof texturesPaths == 'object') {
          // console.log("path is object");
          customObject.textures = [];
          customObject.texture = true; // cubeObject.shaderProgram = this.initShaders(this.GL.gl, filler+"-shader-fs", filler+"-shader-vs");

          (0, _engine.RegenerateShader)('sphereLightTex' + '-shader-fs', texturesPaths.source.length, texturesPaths.mix_operation); // eslint-disable-next-line no-redeclare

          for (var t = 0; t < texturesPaths.source.length; ++t) {
            customObject.textures.push(this.initTexture(this.GL.gl, texturesPaths.source[t]));
          }

          customObject.shaderProgram = this.initShaders(this.GL.gl, 'sphereLightTex' + '-shader-fs', 'sphereLightTex' + '-shader-vs'); //hard code
        } else {
          alert('Exec add obj : texturePaths : path is unknow typeof');
        }
      } else {
        // no textures , use default single textures
        customObject.texture = this.initTexture(this.GL.gl, 'res/images/texture_spiral1.png');
        customObject.textures.push(customObject.texture);
        customObject.texture = true;
        customObject.shaderProgram = this.initShaders(this.GL.gl, 'sphereLightTex' + '-shader-fs', 'sphereLightTex' + '-shader-vs');
      }

      customObject.changeMaterial = function (texturesPaths) {
        (0, _engine.RegenerateShader)('sphereLightTex' + '-shader-fs', texturesPaths.source.length, texturesPaths.mix_operation);

        for (var t = 0; t < texturesPaths.source.length; ++t) {
          this.textures.push(world.initTexture(world.GL.gl, texturesPaths.source[t]));
        } //this.shaderProgram = world.initShaders(world.GL.gl, this.type +"-shader-fs", this.type + "-shader-vs");


        this.shaderProgram = world.initShaders(world.GL.gl, 'sphereLightTex' + '-shader-fs', 'sphereLightTex' + '-shader-vs');
      };

      customObject.mvMatrix = mat4.create(); //sphereObject.LightMap   = new GeoOfColor("cube light");

      customObject.LightMap = undefined;

      if (typeof mesh_ !== 'undefined') {
        customObject.latitudeBands = mesh_.latitudeBands;
        customObject.longitudeBands = mesh_.longitudeBands;
        customObject.radius = mesh_.radius;
        customObject.custom_type = mesh_.custom_type;
      } else {
        customObject.latitudeBands = 30;
        customObject.longitudeBands = 30;
        customObject.radius = 2;
      }

      customObject.geometry = new _matrixGeometry.customVertex(customObject); //draws params

      customObject.glBlend = new _utility._glBlend();

      if (customObject.shaderProgram) {
        // console.log("   Buffer the " + filler + ":Store at:" + this.contentList.length);
        this.bufferSphere(customObject);
        customObject.glDrawElements = new _utility._DrawElements(customObject.vertexIndexBuffer.numItems);
        this.contentList[this.contentList.length] = customObject;
        _manifest.default.scene[customObject.name] = customObject;
      } else {// console.log("   customObject shader failure");
      }
    }
  };

  world.callReDraw = _matrixRender.callReDraw_;
  /* Destructor                    */

  world.destroy = _manifest.default.operation.destroyWorld;
  return world;
}

},{"../program/manifest":25,"./engine":4,"./matrix-draws":9,"./matrix-geometry":10,"./matrix-init-shaders":11,"./matrix-render":12,"./matrix-shadows":14,"./matrix-tags":15,"./physics":18,"./utility":20}],18:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var cannon = _interopRequireWildcard(require("cannon"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// DEV
// import * as cannon from '../node_modules/cannon/build/cannon';
// import * as CANNON from 'cannon';
// PRODC

/**
 * @MatrixPhysics
 * Used cannon.js version 0.6 library.
 * Source code at:
 * https://schteppe.github.io/cannon.js/
 */
class MatrixPhysics {
  constructor(gravityVector = [0, 0, -9.82]) {
    console.log("MatrixPhysics [cannon.js] running =>", CANNON); // Setup our world

    this.world = new CANNON.World();
    this.world.gravity.set(gravityVector[0], gravityVector[1], gravityVector[2]);

    this.toDeg = q1 => {
      var x, y, z;
      if (q1.w > 1) q1.normalise(); // if w>1 acos and sqrt will produce errors, this cant happen if quaternion is normalised

      var angle = 2 * Math.acos(q1.w); // assuming quaternion normalised then w is less than 1, so term always positive.

      var s = Math.sqrt(1 - q1.w * q1.w);

      if (s < 0.001) {
        // test to avoid divide by zero, s is always positive due to sqrt
        // if s close to zero then direction of axis not important
        // if it is important that axis is normalised then replace with x=1; y=z=0;
        x = q1.x;
        y = q1.y;
        z = q1.z;
      } else {
        x = q1.x / s; // normalise axis

        y = q1.y / s;
        z = q1.z / s;
      }

      return {
        x: x,
        y: y,
        z: z
      };
    };
  }

  addGround(App, world, tex) {
    // Create a ground
    var groundBody = new CANNON.Body({
      mass: 0,
      // mass == 0 makes the body static
      position: new CANNON.Vec3(0, -15, -2)
    });
    var groundShape = new CANNON.Plane();
    groundBody.addShape(groundShape);
    this.world.addBody(groundBody); // matrix engine visual

    world.Add("squareTex", 1, "FLOOR_STATIC", tex);
    App.scene.FLOOR_STATIC.geometry.setScaleByX(5);
    App.scene.FLOOR_STATIC.geometry.setScaleByY(5);
    App.scene.FLOOR_STATIC.position.SetY(-2);
    App.scene.FLOOR_STATIC.position.SetZ(-15);
    App.scene.FLOOR_STATIC.rotation.rotx = 90;
  }

}

exports.default = MatrixPhysics;

},{"cannon":24}],19:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.rayIntersectsTriangle = rayIntersectsTriangle;
exports.unproject = unproject;
exports.rotate2dPlot = rotate2dPlot;
exports.checkingProcedure = checkingProcedure;
exports.checkingProcedureCalc = checkingProcedureCalc;
exports.touchCoordinate = void 0;
let rayHitEvent;
let touchCoordinate = {
  enabled: false,
  x: 0,
  y: 0,
  stopOnFirstDetectedHit: false
};
/**
 * Ray triangle intersection algorithm
 * @param rayOrigin ray origin point
 * @param rayVector ray direction
 * @param triangle three points of triangle, should be ccw order
 * @param out the intersection point
 * @return intersects or not
 * Uses Möller–Trumbore intersection algorithm
 */

exports.touchCoordinate = touchCoordinate;

function rayIntersectsTriangle(rayOrigin, // :vec3,
rayVector, // :vec3,
triangle, // :vec3[],
out, // :vec3,
objPos) {
  if (matrixEngine.Events.camera.zPos < objPos.z) {
    rayOrigin[2] = matrixEngine.Events.camera.zPos - objPos.z;
  } else {
    rayOrigin[2] = matrixEngine.Events.camera.zPos + -objPos.z;
  }

  rayOrigin[0] = matrixEngine.Events.camera.xPos;
  rayOrigin[1] = matrixEngine.Events.camera.yPos;
  const EPSILON = 0.0000001;
  const [v0, v1, v2] = triangle;
  const edge1 = vec3.create();
  const edge2 = vec3.create();
  const h = vec3.create();
  vec3.sub(edge1, v1, v0);
  vec3.sub(edge2, v2, v0);
  vec3.cross(h, rayVector, edge2);
  const a = vec3.dot(edge1, h);

  if (a > -EPSILON && a < EPSILON) {
    return false;
  }

  const s = vec3.create();
  vec3.sub(s, rayOrigin, v0);
  const u = vec3.dot(s, h);

  if (u < 0 || u > a) {
    return false;
  }

  const q = vec3.create();
  vec3.cross(q, s, edge1);
  const v = vec3.dot(rayVector, q);

  if (v < 0 || u + v > a) {
    return false;
  }

  const t = vec3.dot(edge2, q) / a;

  if (t > EPSILON) {
    if (out) {
      vec3.add(out, rayOrigin, [rayVector[0] * t, rayVector[1] * t, rayVector[2] * t]);
    }

    return true;
  }

  return false;
}
/**
 * Unproject a 2D point into a 3D world.
 *
 * @param screenCoord [screenX, screenY]
 * @param viewport [left, top, width, height]
 * @param invProjection invert projection matrix
 * @param invView invert view matrix
 * @return 3D point position
 */


function unproject(screenCoord, // :[number, number],
viewport, // :[number, number, number, number],
invProjection, // :mat4,
invView // :mat4,
) {
  // : vec3
  const [left, top, width, height] = viewport;
  const [x, y] = screenCoord;
  const out = vec4.fromValues(2 * x / width - 1 - left, 2 * (height - y - 1) / height - 1, 1, 1);
  vec4.transformMat4(out, out, invProjection);
  out[3] = 0;
  vec4.transformMat4(out, out, invView);
  return vec3.normalize(vec3.create(), out);
}
/**
 * @description Fix local rotation raycast bug test.
 */


function rotate2dPlot(cx, cy, x, y, angle) {
  var radians = Math.PI / 180 * -angle,
      cos = Math.cos(radians),
      sin = Math.sin(radians),
      nx = cos * (x - cx) + sin * (y - cy) + cx,
      ny = cos * (y - cy) - sin * (x - cx) + cy;
  return [nx, ny];
}

function checkingProcedure(ev) {
  const {
    clientX,
    clientY,
    screenX,
    screenY
  } = ev;
  touchCoordinate.x = clientX;
  touchCoordinate.y = clientY;
  touchCoordinate.w = ev.target.width;
  touchCoordinate.h = ev.target.height;
  touchCoordinate.enabled = true;
}

function checkingProcedureCalc(object) {
  var world = matrixEngine.matrixWorld.world;
  if (touchCoordinate.enabled == false) return;
  let mvMatrix = [...object.mvMatrix];
  let ray; // console.info('Raycast hits after test... -> ', mvMatrix)

  let outp = mat4.create();
  let outv = mat4.create();
  let myRayOrigin = vec3.fromValues(matrixEngine.Events.camera.xPos, matrixEngine.Events.camera.yPos, matrixEngine.Events.camera.zPos);

  if (matrixEngine.Events.camera.zPos < object.position.z) {
    myRayOrigin = vec3.fromValues(matrixEngine.Events.camera.xPos, matrixEngine.Events.camera.yPos, -matrixEngine.Events.camera.zPos);
  }

  ray = unproject([touchCoordinate.x, touchCoordinate.y], [0, 0, touchCoordinate.w, touchCoordinate.h], mat4.invert(outp, world.pMatrix), mat4.invert(outv, mvMatrix));
  const intersectionPoint = vec3.create();
  object.raycastFace = [];

  for (var f = 0; f < object.geometry.indices.length; f = f + 3) {
    var a = object.geometry.indices[f];
    var b = object.geometry.indices[f + 1];
    var c = object.geometry.indices[f + 2];
    let triangle = null;
    const triangleInZero = [[object.geometry.vertices[0 + a * 3], object.geometry.vertices[1 + a * 3], object.geometry.vertices[2 + a * 3]], [object.geometry.vertices[0 + b * 3], object.geometry.vertices[1 + b * 3], object.geometry.vertices[2 + b * 3]], [object.geometry.vertices[0 + c * 3], object.geometry.vertices[1 + c * 3], object.geometry.vertices[2 + c * 3]]];
    var rez0, rez1, rez2;

    if (object.rotation.rx != 0) {
      rez0 = rotate2dPlot(0, 0, triangleInZero[0][1], triangleInZero[0][2], object.rotation.rx);
      rez1 = rotate2dPlot(0, 0, triangleInZero[1][1], triangleInZero[1][2], object.rotation.rx);
      rez2 = rotate2dPlot(0, 0, triangleInZero[2][1], triangleInZero[2][2], object.rotation.rx);
      triangle = [[triangleInZero[0][0] + object.position.worldLocation[0], rez0[0] + object.position.worldLocation[1], rez0[1]], [triangleInZero[1][0] + object.position.worldLocation[0], rez1[0] + object.position.worldLocation[1], rez1[1]], [triangleInZero[2][0] + object.position.worldLocation[0], rez2[0] + object.position.worldLocation[1], rez2[1]]]; // console.log("only x rot => ", triangle);
    } // y z changed - rez0[1] is z


    if (object.rotation.ry != 0) {
      if (object.rotation.rx != 0) {
        // Y i Z
        // get y
        rez0 = rotate2dPlot(0, 0, triangleInZero[0][1], triangleInZero[0][2], object.rotation.rx - 90);
        rez1 = rotate2dPlot(0, 0, triangleInZero[1][1], triangleInZero[1][2], object.rotation.rx - 90);
        rez2 = rotate2dPlot(0, 0, triangleInZero[2][1], triangleInZero[2][2], object.rotation.rx - 90);
        const detY0 = rez0[0];
        const detY1 = rez1[0];
        const detY2 = rez2[0];
        const detZ0 = rez0[1];
        const detZ1 = rez1[1];
        const detZ2 = rez2[1]; //                          X INITIAL             Z

        rez0 = rotate2dPlot(0, 0, triangleInZero[0][0], detZ0, object.rotation.ry - 90);
        rez1 = rotate2dPlot(0, 0, triangleInZero[1][0], detZ1, object.rotation.ry - 90);
        rez2 = rotate2dPlot(0, 0, triangleInZero[2][0], detZ2, object.rotation.ry - 90);
        const detZ00 = rez0[1];
        const detZ11 = rez1[1];
        const detZ22 = rez2[1];
        rez0 = rotate2dPlot(0, 0, rez0[0], detY0, object.rotation.rz - 90);
        rez1 = rotate2dPlot(0, 0, rez1[0], detY1, object.rotation.rz - 90);
        rez2 = rotate2dPlot(0, 0, rez2[0], detY2, object.rotation.rz - 90);
        triangle = [[rez0[0] + object.position.worldLocation[0], rez0[1] + object.position.worldLocation[1], detZ00], [rez1[0] + object.position.worldLocation[0], rez1[1] + object.position.worldLocation[1], detZ11], [rez2[0] + object.position.worldLocation[0], rez2[1] + object.position.worldLocation[1], detZ22]];
      } else if (object.rotation.rz == 0) {
        rez0 = rotate2dPlot(0, 0, triangleInZero[0][0], triangleInZero[0][2], -object.rotation.ry);
        rez1 = rotate2dPlot(0, 0, triangleInZero[1][0], triangleInZero[1][2], -object.rotation.ry);
        rez2 = rotate2dPlot(0, 0, triangleInZero[2][0], triangleInZero[2][2], -object.rotation.ry);
        triangle = [[rez0[0] + object.position.worldLocation[0], triangleInZero[0][1] + object.position.worldLocation[1], rez0[1]], [rez1[0] + object.position.worldLocation[0], triangleInZero[1][1] + object.position.worldLocation[1], rez1[1]], [rez2[0] + object.position.worldLocation[0], triangleInZero[2][1] + object.position.worldLocation[1], rez2[1]]];
      }
    }

    if (object.rotation.rz != 0) {
      if (object.rotation.ry != 0) {
        if (object.rotation.rx == 180) {
          rez0 = rotate2dPlot(0, 0, triangleInZero[0][0], triangleInZero[0][2], object.rotation.ry);
          rez1 = rotate2dPlot(0, 0, triangleInZero[1][0], triangleInZero[1][2], object.rotation.ry);
          rez2 = rotate2dPlot(0, 0, triangleInZero[2][0], triangleInZero[2][2], object.rotation.ry);
          let detZ00 = rez0[1];
          let detZ11 = rez1[1];
          let detZ22 = rez2[1];
          rez0 = rotate2dPlot(0, 0, rez0[0], triangleInZero[0][1], object.rotation.rz);
          rez1 = rotate2dPlot(0, 0, rez1[0], triangleInZero[1][1], object.rotation.rz);
          rez2 = rotate2dPlot(0, 0, rez2[0], triangleInZero[2][1], object.rotation.rz);
          const detZ0 = rez0[1];
          const detZ1 = rez1[1];
          const detZ2 = rez2[1]; // rez0 = rotate2dPlot(0, 0,rez0[0], detZ00, object.rotation.rx - 180);
          // rez1 = rotate2dPlot(0, 0,rez0[0], detZ11, object.rotation.rx - 180);
          // rez2 = rotate2dPlot(0, 0, rez0[0], detZ22, object.rotation.rx - 180);
          // detZ00 = rez0[1];
          // detZ11 = rez1[1];
          // detZ22 = rez2[1];

          triangle = [[rez0[0] + object.position.worldLocation[0], detZ0 + object.position.worldLocation[1], detZ00], [rez1[0] + object.position.worldLocation[0], detZ1 + object.position.worldLocation[1], detZ11], [rez2[0] + object.position.worldLocation[0], detZ2 + object.position.worldLocation[1], detZ22]];
        } else {// console.info('unhandled ray cast');
        }
      } else {
        if (object.rotation.rx == 0) {
          rez0 = rotate2dPlot(0, +0, triangleInZero[0][0], triangleInZero[0][1], object.rotation.rz);
          rez1 = rotate2dPlot(0, 0, triangleInZero[1][0], triangleInZero[1][1], object.rotation.rz);
          rez2 = rotate2dPlot(0, 0, triangleInZero[2][0], triangleInZero[2][1], object.rotation.rz);
          triangle = [[rez0[0] + object.position.worldLocation[0], rez0[1] + object.position.worldLocation[1], triangleInZero[0][2]], [rez1[0] + object.position.worldLocation[0], rez1[1] + object.position.worldLocation[1], triangleInZero[1][2]], [rez2[0] + object.position.worldLocation[0], rez2[1] + object.position.worldLocation[1], triangleInZero[2][2]]];
        } else {
          console.info('must be handled rz vs rx');
        }
      }
    } // no rot


    if (object.rotation.rx == 0 && object.rotation.ry == 0 && object.rotation.rz == 0) {
      triangle = [[triangleInZero[0][0] + object.position.worldLocation[0], triangleInZero[0][1] + object.position.worldLocation[1], triangleInZero[0][2]], [triangleInZero[1][0] + object.position.worldLocation[0], triangleInZero[1][1] + object.position.worldLocation[1], triangleInZero[1][2]], [triangleInZero[2][0] + object.position.worldLocation[0], triangleInZero[2][1] + object.position.worldLocation[1], triangleInZero[2][2]]];
    }

    object.raycastFace.push(triangle);

    if (rayIntersectsTriangle(myRayOrigin, ray, triangle, intersectionPoint, object.position)) {
      rayHitEvent = new CustomEvent('ray.hit.event', {
        detail: {
          touchCoordinate: {
            x: touchCoordinate.x,
            y: touchCoordinate.y
          },
          hitObject: object,
          intersectionPoint: intersectionPoint,
          ray: ray,
          rayOrigin: myRayOrigin
        }
      });
      dispatchEvent(rayHitEvent);

      if (touchCoordinate.enabled == true && touchCoordinate.stopOnFirstDetectedHit == true) {
        touchCoordinate.enabled = false;
      } // console.info('raycast hits for Object: ' + object.name + '  -> face[/3]  : ' + f + ' -> intersectionPoint: ' + intersectionPoint);

    }
  }
}

},{}],20:[function(require,module,exports){
/* eslint-disable no-unused-vars */

/* eslint-disable no-undef */
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.radToDeg = radToDeg;
exports.isMobile = isMobile;
exports.LOG = LOG;
exports.OSCILLATOR = OSCILLATOR;
exports.SWITCHER = SWITCHER;
exports.ORBIT = ORBIT;
exports.ORBIT_FROM_ARRAY = ORBIT_FROM_ARRAY;
exports.randomFloatFromTo = randomFloatFromTo;
exports.randomIntFromTo = randomIntFromTo;
exports._glBlend = _glBlend;
exports._DrawElements = _DrawElements;
exports._glTexParameteri = _glTexParameteri;
exports.BiquadFilterType = exports.ENUMERATORS = exports.QueryString = exports.byId = exports.E = exports.scriptManager = exports.loadImage = void 0;

var _manifest = _interopRequireDefault(require("../program/manifest"));

var _events = require("./events");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Array.prototype.swap = function (x,y) {
window.swap = function (x, y, myArray) {
  var b = myArray[x];
  myArray[x] = myArray[y];
  myArray[y] = b;
  return myArray;
};
/**
 * @description
 * Global modifier for:
 * degToRed, DETECTBROWSER, loadImage
 */


window.degToRad = function (degrees) {
  return degrees * Math.PI / 180;
};

function radToDeg(r) {
  var pi = Math.PI;
  return r * (180 / pi);
}

window.DETECTBROWSER = function () {
  var HREFF,
      HREFTXT = 'unknown';
  this.NAVIGATOR = navigator.userAgent;
  var NAV = navigator.userAgent;
  var navMacintosh, gecko, navIpad, operatablet, navIphone, navFirefox, navChrome, navOpera, navSafari, navandroid, mobile, navMozilla;
  gecko = NAV.match(/gecko/gi);
  navOpera = NAV.match(/Opera|OPR\//) ? true : false;
  operatablet = NAV.match(/Tablet/gi);
  navIpad = NAV.match(/ipad/gi);
  navIphone = NAV.match(/iphone/gi);
  navFirefox = NAV.match(/Firefox/gi);
  navMozilla = NAV.match(/mozilla/gi);
  navChrome = NAV.match(/Chrome/gi);
  navSafari = NAV.match(/safari/gi);
  navandroid = NAV.match(/android/gi); // mobile = NAV.match(/mobile/gi);

  navMacintosh = NAV.match(/Macintosh/gi); // eslint-disable-next-line no-undef

  var TYPEOFANDROID = 0;
  window['NOMOBILE'] = 0; // eslint-disable-next-line no-redeclare

  var mobile = /iphone|ipad|ipod|android|blackberry|mini|windows\sce|palm/i.test(navigator.userAgent.toLowerCase());

  if (mobile) {
    var userAgent = navigator.userAgent.toLowerCase();

    if (userAgent.search('android') > -1 && userAgent.search('mobile') > -1) {
      console.log('ANDROID MOBILE');
    } else if (userAgent.search('android') > -1 && !(userAgent.search('mobile') > -1)) {
      console.log(' ANDROID TABLET ');
      TYPEOFANDROID = 1;
    }
  } else {
    // eslint-disable-next-line no-undef
    NOMOBILE = 1;
  } // FIREFOX za android


  if (navFirefox && navandroid && TYPEOFANDROID == 0) {
    HREFF = '#';
    HREFTXT = 'mobile_firefox_android';
  } // FIREFOX za android T


  if (navFirefox && navandroid && TYPEOFANDROID == 1) {
    HREFF = '#';
    HREFTXT = 'mobile_firefox_android_tablet';
  } // OPERA ZA ANDROID


  if (navOpera && navandroid) {
    HREFF = '#';
    HREFTXT = 'opera_mobile_android';
  } // provera
  // OPERA ZA ANDROID TABLET


  if (navOpera && navandroid && operatablet) {
    HREFF = '#';
    HREFTXT = 'opera_mobile_android_tablet';
  } // provera
  // safari mobile za IPHONE - i safari mobile za IPAD i CHROME za IPAD


  if (navSafari) {
    var Iphonesafari = NAV.match(/iphone/gi);

    if (Iphonesafari) {
      HREFF = '#';
      HREFTXT = 'safari_mobile_iphone';
    } else if (navIpad) {
      HREFF = '#';
      HREFTXT = 'mobile_safari_chrome_ipad';
    } else if (navMacintosh) {
      HREFF = '#';
      HREFTXT = 'desktop_safari';
    } //Macintosh
    else if (navandroid) {
        HREFF = '#';
        HREFTXT = 'android_native';
      }
  } // TEST CHROME


  if (navChrome && navSafari && navMozilla && TYPEOFANDROID == 1) {
    HREFF = '#';
    HREFTXT = 'mobile_chrome_android_tablet';
  }

  if (navChrome && navSafari && navMozilla && TYPEOFANDROID == 0) {
    HREFF = '#';
    HREFTXT = 'mobile_chrome_android';
  }

  if (navChrome && TYPEOFANDROID == 0) {
    HREFF = '#';
    HREFTXT = 'chrome_browser';
  }

  if (navMozilla && NOMOBILE == 1 && gecko && navFirefox) {
    HREFF = '#';
    HREFTXT = 'firefox_desktop';
  }

  if (navOpera && TYPEOFANDROID == 0 && !mobile) {
    HREFF = '#';
    HREFTXT = 'opera_desktop';
  }

  this.NAME = HREFTXT;
  this.NOMOBILE = NOMOBILE;
};

function isMobile() {
  const toMatch = [/Android/i, /webOS/i, /iPhone/i, /iPad/i, /iPod/i, /BlackBerry/i, /Windows Phone/i];
  return toMatch.some(toMatchItem => {
    return navigator.userAgent.match(toMatchItem);
  });
}

;

const loadImage = function (url, onload) {
  var img = new Image();
  img.crossOrigin = 'anonymous';
  img.src = url;

  img.onload = function () {
    onload(img);
  };

  return img;
};

exports.loadImage = loadImage;
window.BROWSER = new window.DETECTBROWSER();
/**
 * @description LOGGER
 */

function LOG() {
  this.ENABLE = true;

  this.LOG = function (data) {
    if (this.ENABLE == true) {
      console.log('%c' + data, 'background: #333; color: lime');
    }
  };

  this.WARNING = function (data) {
    if (this.ENABLE == true) {
      console.log('%c Warning : ' + data, 'background: #333; color: yellow');
    }
  };

  this.CRITICAL = function (data) {
    if (this.ENABLE == true) {
      console.log('%c Critical : ' + data, 'background: #333; color: red');
    }
  };

  this.NETWORK_LOG = function (data) {
    if (this.ENABLE == true) {
      console.log('%c Network view : ' + data, 'background: #333; color: #a7afaf');
    }
  };
}
/**
 * @description
 * Load script in runtime.
 */


var scriptManager = {
  SCRIPT_ID: 0,
  // SINHRO_LOAD: {},
  LOAD: function addScript(src, id, type, parent) {
    var s = document.createElement('script');

    s.onload = function () {
      SCRIPT.SCRIPT_ID++;
      console.log('Script id loaded : ' + SCRIPT.SCRIPT_ID + ' with src: ' + this.src);
    };

    if (typeof type !== 'undefined') {
      s.setAttribute('type', type);
      s.innerHTML = src;
    } else {
      s.setAttribute('src', src);
    }

    if (typeof id !== 'undefined') {
      s.setAttribute('id', id);
    }

    if (typeof parent !== 'undefined') {
      document.getElementById(parent).appendChild(s);
    } else {
      document.body.appendChild(s);
    }
  },
  loadModule: function addScript(src, id, type, parent) {
    console.log('Script id load called ');
    var s = document.createElement('script');

    s.onload = function () {
      scriptManager.SCRIPT_ID++;
    };

    if (typeof type === 'undefined') {
      s.setAttribute('type', 'module');
      s.setAttribute('src', src);
    } else {
      s.setAttribute('type', type);
      s.innerHTML = src;
    }

    s.setAttribute('src', src);

    if (typeof id !== 'undefined') {
      s.setAttribute('id', id);
    }

    if (typeof parent !== 'undefined') {
      document.getElementById(parent).appendChild(s);
    } else {
      document.body.appendChild(s);
    }
  }
}; // GET PULSE VALUES IN REAL TIME

exports.scriptManager = scriptManager;

function OSCILLATOR(min, max, step) {
  if ((typeof min === 'string' || typeof min === 'number') && (typeof max === 'string' || typeof max === 'number') && (typeof step === 'string' || typeof step === 'number')) {
    var ROOT = this;
    this.min = parseFloat(min);
    this.max = parseFloat(max);
    this.step = parseFloat(step);
    this.value_ = parseFloat(min);
    this.status = 0;

    this.on_maximum_value = function () {};

    this.on_minimum_value = function () {};

    this.UPDATE = function (STATUS_) {
      if (STATUS_ === undefined) {
        if (this.status == 0 && this.value_ < this.max) {
          this.value_ = this.value_ + this.step;

          if (this.value_ >= this.max) {
            this.value_ = this.max;
            this.status = 1;
            ROOT.on_maximum_value();
          }

          return this.value_;
        } else if (this.status == 1 && this.value_ > this.min) {
          this.value_ = this.value_ - this.step;

          if (this.value_ <= this.min) {
            this.value_ = this.min;
            this.status = 0;
            ROOT.on_minimum_value();
          }

          return this.value_;
        }
      } else {
        return this.value_;
      }
    };
  } else {
    _events.SYS.DEBUG.WARNING("SYS : warning for procedure 'SYS.MATH.OSCILLATOR' Desciption : Replace object with string or number, min >> " + typeof min + ' and max >>' + typeof max + ' and step >>' + typeof step + ' << must be string or number.');
  }
}

function SWITCHER() {
  var ROOT = this;
  ROOT.VALUE = 1;

  ROOT.GET = function () {
    ROOT.VALUE = ROOT.VALUE * -1;
    return ROOT.VALUE;
  };
}

function ORBIT(cx, cy, angle, p) {
  var s = Math.sin(angle);
  var c = Math.cos(angle);
  p.x -= cx;
  p.y -= cy;
  var xnew = p.x * c - p.y * s;
  var ynew = p.x * s + p.y * c;
  p.x = xnew + cx;
  p.y = ynew + cy;
  return p;
}

function ORBIT_FROM_ARRAY(cx, cy, angle, p, byIndexs) {
  var s = Math.sin(angle);
  var c = Math.cos(angle);
  p[byIndexs[0]] -= cx;
  p[byIndexs[1]] -= cy;
  var xnew = p[byIndexs[0]] * c - p[byIndexs[1]] * s;
  var ynew = p[byIndexs[0]] * s + p[byIndexs[1]] * c;
  p[byIndexs[0]] = xnew + cx;
  p[byIndexs[1]] = ynew + cy;
  return p;
}

var E = function (id) {
  return document.getElementById(id);
};

exports.E = E;

var byId = function (id) {
  return document.getElementById(id);
};

exports.byId = byId;

function randomFloatFromTo(min, max) {
  return Math.random() * (max - min) + min;
} // RANDOM INT FROM-TO


function randomIntFromTo(min, max) {
  if (typeof min === 'object' || typeof max === 'object') {
    _events.SYS.DEBUG.WARNING("SYS : warning for procedure 'SYS.MATH.RANDOM_INT_FROM_TO' Desciption : Replace object with string , this >> " + typeof min + ' and ' + typeof min + ' << must be string or number.');
  } else if (typeof min === 'undefined' || typeof max === 'undefined') {
    _events.SYS.DEBUG.WARNING("SYS : warning for procedure 'SYS.MATH.RANDOM_INT_FROM_TO' Desciption : arguments (min, max) cant be undefined , this >> " + typeof min + ' and ' + typeof min + ' << must be string or number.');
  } else {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
}

var QueryString = function () {
  // This function is anonymous, is executed immediately and
  // the return value is assigned to QueryString!
  var query_string = {};
  var query = window.location.search.substring(1);
  var vars = query.split('&');

  for (var i = 0; i < vars.length; i++) {
    var pair = vars[i].split('='); // If first entry with this name

    if (typeof query_string[pair[0]] === 'undefined') {
      query_string[pair[0]] = decodeURIComponent(pair[1]); // If second entry with this name
    } else if (typeof query_string[pair[0]] === 'string') {
      var arr = [query_string[pair[0]], decodeURIComponent(pair[1])];
      query_string[pair[0]] = arr; // If third or later entry with this name
    } else {
      query_string[pair[0]].push(decodeURIComponent(pair[1]));
    }
  }

  return query_string;
}();

exports.QueryString = QueryString;
_manifest.default.audioSystem.Assets = {};

_manifest.default.audioSystem.createVideoAsset = function (name_, path_) {
  return new Promise((resolve, reject) => {
    var videoAudioAsset = {};
    videoAudioAsset.video = document.createElement('video'); // videoAudioAsset.video = document.getElementById("ultimateroulette");

    videoAudioAsset.video.controls = true;
    videoAudioAsset.video.autoplay = true; // videoAudioAsset.video.setAttribute("mute", true);
    // videoAudioAsset.video.load();

    E('HOLDER_STREAMS').appendChild(videoAudioAsset.video);
    videoAudioAsset.video.setAttribute('playsInline', true);
    videoAudioAsset.video.setAttribute('src', 'res/videos/' + path_);

    try {
      window.AudioContext = window.AudioContext || window.webkitAudioContext;
      videoAudioAsset.context = new AudioContext();
    } catch (e) {
      alert('Web Audio API is not supported in this browser');
    }

    videoAudioAsset.gainNode = videoAudioAsset.context.createGain();
    videoAudioAsset.gainNode.gain.value = 1; // Change Gain Value to test

    videoAudioAsset.filter = videoAudioAsset.context.createBiquadFilter(); // videoAudioAsset.filter.type = 2; // Change Filter type to test // ENUM from UTILITY

    videoAudioAsset.filter.frequency.value = 5040; // Change frequency to test

    if (typeof name_ !== 'undefined' && typeof name_ === 'string') {
      _manifest.default.audioSystem.Assets[name_] = videoAudioAsset;
    } else {
      console.warn('No name argument in createVideoAsset call.');
    }

    var promise = videoAudioAsset.video.play();

    if (promise !== undefined) {
      promise.then(_ => {
        console.info('intromotocooliano autoplay started');
        resolve(true);
      }).catch(error => {
        console.warn('No autoplay ', error);
        reject(); // Autoplay was prevented.
      });
    }
  });
};

_manifest.default.audioSystem.createMusicAsset = function (name_, path_) {
  return new Promise((resolve, reject) => {
    var videoAudioAsset = {};
    videoAudioAsset.video = document.createElement('audio');
    videoAudioAsset.video.controls = true;
    videoAudioAsset.video.autoplay = true; // videoAudioAsset.video.setAttribute("mute", true);
    // videoAudioAsset.video.load();

    E('HOLDER_STREAMS').appendChild(videoAudioAsset.video);
    videoAudioAsset.video.setAttribute('playsInline', true);
    videoAudioAsset.video.setAttribute('src', 'res/music/' + path_);

    try {
      window.AudioContext = window.AudioContext || window.webkitAudioContext;
      videoAudioAsset.context = new AudioContext();
    } catch (e) {
      alert('Web Audio API is not supported in this browser');
    }

    videoAudioAsset.gainNode = videoAudioAsset.context.createGain();
    videoAudioAsset.gainNode.gain.value = 1; // Change Gain Value to test

    videoAudioAsset.filter = videoAudioAsset.context.createBiquadFilter(); // videoAudioAsset.filter.type = 2; // Change Filter type to test // ENUM from UTILITY

    videoAudioAsset.filter.frequency.value = 5040; // Change frequency to test

    if (typeof name_ !== 'undefined' && typeof name_ === 'string') {
      _manifest.default.audioSystem.Assets[name_] = videoAudioAsset;
    } else {
      console.warn('No name argument in createVideoAsset call.');
    }

    var promise = videoAudioAsset.video.play();

    if (promise !== undefined) {
      promise.then(_ => {
        console.info('intromotocooliano autoplay started');
        resolve(true);
      }).catch(error => {
        console.warn('No autoplay ', error);
        reject(); // Autoplay was prevented.
      });
    }
  });
}; // Tradicional Class


function _glBlend() {
  var root_glblend = this;
  this.blendEnabled = false;
  this.blendParamSrc = 'ONE';
  this.blendParamDest = 'ONE';
  this.depthParam = 'NOTEQUAL';

  this.setBothBlendParam = function (param_) {
    root_glblend.blendParamSrc = param_;
    root_glblend.blendParamDest = param_;
  };
} // Tradicional Class


function _DrawElements(numberOfItemsIndices) {
  this.mode = 'TRIANGLES';
  this.modes = ['POINTS', 'LINE_STRIP', 'LINE_LOOP', 'LINES', 'TRIANGLE_STRIP', 'TRIANGLE_FAN', 'TRIANGLES'];
  this.type = ['UNSIGNED_BYTE', 'UNSIGNED_SHORT', 'UNSIGNED_INT'];
  this.indices = 'GL_ELEMENT_ARRAY_BUFFER';
  this.numberOfIndicesRender = numberOfItemsIndices; //mesh_.indexBuffer.numItems
}

function _glTexParameteri(_target, _pname, _param) {
  var ROOT = this;

  if (typeof _target == 'undefined') {
    this.target = 'TEXTURE_2D';
  } else {
    this.target = _target;
  }

  if (typeof _pname == 'undefined' || typeof _param == 'undefined') {
    this.pname = 'TEXTURE_MAG_FILTER';
    this.param = 'LINEAR';
  } else {
    this.pname = _pname;
    this.param = _param;
  }
}
/**
 * @description
 * ENUMERATORS FOR opegl es 2.0 and 3.0
 */


let ENUMERATORS = {
  glTexParameter: {
    target: {
      GL_TEXTURE_2D: 'GL_TEXTURE_2D',
      GL_TEXTURE_3D: 'GL_TEXTURE_3D',
      GL_TEXTURE_2D_ARRAY: 'GL_TEXTURE_2D_ARRAY',
      GL_TEXTURE_CUBE_MAP: 'GL_TEXTURE_CUBE_MAP'
    },
    pname: {
      GL_TEXTURE_BASE_LEVEL: 'TEXTURE_BASE_LEVEL',
      GL_TEXTURE_COMPARE_FUNC: 'TEXTURE_COMPARE_FUNC',
      GL_TEXTURE_COMPARE_MODE: 'TEXTURE_COMPARE_MODE',
      GL_TEXTURE_MIN_FILTER: 'TEXTURE_MIN_FILTER',
      GL_TEXTURE_MAG_FILTER: 'TEXTURE_MAG_FILTER',
      GL_TEXTURE_MIN_LOD: 'TEXTURE_MIN_LOD',
      GL_TEXTURE_MAX_LOD: 'TEXTURE_MAX_LOD',
      GL_TEXTURE_MAX_LEVEL: 'TEXTURE_MAX_LEVEL',
      GL_TEXTURE_SWIZZLE_R: 'TEXTURE_SWIZZLE_R',
      GL_TEXTURE_SWIZZLE_G: 'TEXTURE_SWIZZLE_G',
      GL_TEXTURE_SWIZZLE_B: 'TEXTURE_SWIZZLE_B',
      GL_TEXTURE_SWIZZLE_A: 'TEXTURE_SWIZZLE_A',
      GL_TEXTURE_WRAP_S: 'TEXTURE_WRAP_S',
      GL_TEXTURE_WRAP_T: 'TEXTURE_WRAP_T',
      GL_TEXTURE_WRAP_R: 'TEXTURE_WRAP_R'
    },
    param: {
      BASE_LEVEL: '',
      COMPARE_FUNC: '',
      COMPARE_MODE: '',
      MIN_FILTER: '',
      MAG_FILTER: {
        NEAREST: 'NEAREST',
        LINEAR: 'LINEAR'
      },
      MIN_LOD: '',
      MAX_LOD: '',
      MAX_LEVEL: '',
      SWIZZLE_R: {
        RED: 'RED',
        GREEN: 'GREEN',
        BLUE: 'BLUE',
        ALPHA: 'ALPHA',
        ZERO: 'ZERO',
        ONE: 'ONE'
      },
      SWIZZLE_G: {
        RED: 'RED',
        GREEN: 'GREEN',
        BLUE: 'BLUE',
        ALPHA: 'ALPHA',
        ZERO: 'ZERO',
        ONE: 'ONE'
      },
      SWIZZLE_B: {
        RED: 'RED',
        GREEN: 'GREEN',
        BLUE: 'BLUE',
        ALPHA: 'ALPHA',
        ZERO: 'ZERO',
        ONE: 'ONE'
      },
      SWIZZLE_A: {
        RED: 'RED',
        GREEN: 'GREEN',
        BLUE: 'BLUE',
        ALPHA: 'ALPHA',
        ZERO: 'ZERO',
        ONE: 'ONE'
      },
      WRAP_S: {
        CLAMP_TO_EDGE: 'CLAMP_TO_EDGE',
        MIRRORED_REPEAT: 'MIRRORED_REPEAT',
        GL_REPEAT: 'GL_REPEAT'
      },
      WRAP_T: {
        CLAMP_TO_EDGE: 'CLAMP_TO_EDGE',
        MIRRORED_REPEAT: 'MIRRORED_REPEAT',
        GL_REPEAT: 'GL_REPEAT'
      },
      WRAP_R: {
        CLAMP_TO_EDGE: 'CLAMP_TO_EDGE',
        MIRRORED_REPEAT: 'MIRRORED_REPEAT',
        GL_REPEAT: 'GL_REPEAT'
      }
    }
  },
  glDrawElements: {
    help: function () {
      _events.SYS.DEBUG.WARNING('C specification: void glDrawElements(  GLenum mode , GLsizei count , GLenum type , const GLvoid * indices ); ');

      _events.SYS.DEBUG.WARNING(">>>mode can be : 'POINTS' , 'LINE_STRIP', 'LINE_LOOP', 'LINES', 'TRIANGLE_STRIP', 'TRIANGLE_FAN' , 'TRIANGLES' ");

      _events.SYS.DEBUG.WARNING('>>>count    : Specifies the number of elements to be rendered.');

      _events.SYS.DEBUG.WARNING(">>>type    : 'UNSIGNED_BYTE' , 'UNSIGNED_SHORT' , 'UNSIGNED_INT' ");
    },
    mode: ['POINTS', 'LINE_STRIP', 'LINE_LOOP', 'LINES', 'TRIANGLE_STRIP', 'TRIANGLE_FAN', 'TRIANGLES'],
    type: ['UNSIGNED_BYTE', 'UNSIGNED_SHORT', 'UNSIGNED_INT'],
    indices: 'GL_ELEMENT_ARRAY_BUFFER'
  },
  glBlend: {
    param: ['ZERO', 'ONE', 'SRC_COLOR', 'DST_COLOR', 'ONE_MINUS_SRC_COLOR', 'ONE_MINUS_DST_COLOR', 'SRC_ALPHA', 'DST_ALPHA', 'ONE_MINUS_SRC_ALPHA', 'ONE_MINUS_DST_ALPHA', 'SRC_ALPHA_SATURATE']
  },
  glDepth: {
    param: ['NEVER', 'ALWAYS', 'LESS', 'GREATER', 'EQUAL', 'LEQUAL', 'NOTEQUAL', 'GEQUAL'],
    returnParam: {
      NEVER: function () {
        return 'NEVER';
      },
      ALWAYS: function () {
        return 'ALWAYS';
      },
      LESS: function () {
        return 'LESS';
      },
      GREATER: function () {
        return 'GREATER';
      },
      EQUAL: function () {
        return 'EQUAL';
      },
      LEQUAL: function () {
        return 'LEQUAL';
      },
      NOTEQUAL: function () {
        return 'NOTEQUAL';
      },
      GEQUAL: function () {
        return 'GEQUAL';
      }
    }
  },
  getTexParameter: function () {
    _events.SYS.DEBUG.LOG(' TEXTURE_IMMUTABLE_FORMAT VALUE : ' + world.GL.gl.getTexParameter(world.GL.gl.TEXTURE_2D, world.GL.gl.TEXTURE_IMMUTABLE_FORMAT));
  }
};
/**
 * @description
 * Audio API Helper
 */

exports.ENUMERATORS = ENUMERATORS;
const BiquadFilterType = {
  lowpass: 'lowpass',
  highpass: 'highpass',
  bandpass: 'bandpass',
  lowshelf: 'lowshelf',
  highshelf: 'highshelf',
  peaking: 'peaking',
  notch: 'notch',
  allpass: 'allpass'
};
exports.BiquadFilterType = BiquadFilterType;

},{"../program/manifest":25,"./events":5}],21:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WebGLUtils = void 0;

/*
 * Copyright 2010, Google Inc.
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are
 * met:
 *
 *     * Redistributions of source code must retain the above copyright
 * notice, this list of conditions and the following disclaimer.
 *     * Redistributions in binary form must reproduce the above
 * copyright notice, this list of conditions and the following disclaimer
 * in the documentation and/or other materials provided with the
 * distribution.
 *     * Neither the name of Google Inc. nor the names of its
 * contributors may be used to endorse or promote products derived from
 * this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
 * "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
 * LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
 * A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT
 * OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
 * SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
 * LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
 * DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY
 * THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

/**
 * @fileoverview This file contains functions every webgl program will need
 * a version of one way or another.
 *
 * Instead of setting up a context manually it is recommended to
 * use. This will check for success or failure. On failure it
 * will attempt to present an approriate message to the user.
 *
 *       gl = WebGLUtils.setupWebGL(canvas);
 *
 * For animated WebGL apps use of setTimeout or setInterval are
 * discouraged. It is recommended you structure your rendering
 * loop like this.
 *
 *       function render() {
 *         window.requestAnimationFrame(render, canvas);
 *
 *         // do rendering
 *         ...
 *       }
 *       render();
 *
 * This will call your rendering function up to the refresh rate
 * of your display but will stop rendering if your app is not
 * visible.
 */
var WebGLUtils = function () {
  /**
   * Creates the HTLM for a failure message
   * @param {string} canvasContainerId id of container of th
   *        canvas.
   * @return {string} The html.
   */
  var makeFailHTML = function (msg) {
    return '' + '<div style="margin: auto; width:500px;z-index:10000;margin-top:20em;text-align:center;">' + msg + '</div>';
    return '' + '<table style="background-color: #8CE; width: 100%; height: 100%;"><tr>' + '<td align="center">' + '<div style="display: table-cell; vertical-align: middle;">' + '<div style="">' + msg + '</div>' + '</div>' + '</td></tr></table>';
  };
  /**
   * Mesasge for getting a webgl browser
   * @type {string}
   */


  var GET_A_WEBGL_BROWSER = '' + 'This page requires a browser that supports WebGL.<br/>' + '<a href="http://get.webgl.org">Click here to upgrade your browser.</a>';
  /**
   * Mesasge for need better hardware
   * @type {string}
   */

  var OTHER_PROBLEM = '' + "It doesn't appear your computer can support WebGL.<br/>" + '<a href="http://get.webgl.org">Click here for more information.</a>';
  /**
   * Creates a webgl context. If creation fails it will
   * change the contents of the container of the <canvas>
   * tag to an error message with the correct links for WebGL.
   * @param {Element} canvas. The canvas element to create a
   *     context from.
   * @param {WebGLContextCreationAttirbutes} opt_attribs Any
   *     creation attributes you want to pass in.
   * @param {function:(msg)} opt_onError An function to call
   *     if there is an error during creation.
   * @return {WebGLRenderingContext} The created context.
   */

  var setupWebGL = function (canvas, opt_attribs, opt_onError) {
    function handleCreationError(msg) {
      var container = document.getElementsByTagName("body")[0]; //var container = canvas.parentNode;

      if (container) {
        var str = window.WebGLRenderingContext ? OTHER_PROBLEM : GET_A_WEBGL_BROWSER;

        if (msg) {
          str += "<br/><br/>Status: " + msg;
        }

        container.innerHTML = makeFailHTML(str);
      }
    }

    ;
    opt_onError = opt_onError || handleCreationError;

    if (canvas.addEventListener) {
      canvas.addEventListener("webglcontextcreationerror", function (event) {
        opt_onError(event.statusMessage);
      }, false);
    }

    var context = create3DContext(canvas, opt_attribs);

    if (!context) {
      if (!window.WebGLRenderingContext) {
        opt_onError("");
      } else {
        opt_onError("");
      }
    }

    return context;
  };
  /**
   * Creates a webgl context.
   * @param {!Canvas} canvas The canvas tag to get context
   *     from. If one is not passed in one will be created.
   * @return {!WebGLContext} The created context.
   */


  var create3DContext = function (canvas, opt_attribs) {
    //var names = [  "webgl" , "experimental-webgl", "webkit-3d", "moz-webgl"];
    var names = ["webgl2"];
    var context = null;

    for (var ii = 0; ii < names.length; ++ii) {
      try {
        context = canvas.getContext(names[ii], opt_attribs);
      } catch (e) {}

      if (context) {
        break;
      }
    }

    return context;
  };

  return {
    create3DContext: create3DContext,
    setupWebGL: setupWebGL
  };
}();
/**
 * Provides requestAnimationFrame in a cross browser
 * way.
 */


exports.WebGLUtils = WebGLUtils;

if (!window.requestAnimationFrame) {
  window.requestAnimationFrame = function () {
    return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (
    /* function FrameRequestCallback */
    callback,
    /* DOMElement Element */
    element) {
      window.setTimeout(callback, 1000 / 60);
    };
  }();
}

},{}],22:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _bvhLoader = require("./module/bvh-loader");

var _default = _bvhLoader.MEBvh;
exports.default = _default;

},{"./module/bvh-loader":23}],23:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.dot3vs1 = dot3vs1;
exports.multiply = multiply;
exports.euler2mat = euler2mat;
exports.mat2euler = mat2euler;
exports.MEBvh = exports.MEBvhJoint = void 0;

/**
 * @description Manual convert python script BVH
 * from https://github.com/dabeschte/npybvh to the JS.
 * @author Nikola Lukic
 * @license GPL-V3
 */
function arraySum3(a, b) {
  var rez1 = a[0] + b[0];
  var rez2 = a[1] + b[1];
  var rez3 = a[2] + b[2];
  return [rez1, rez2, rez3];
}

function deg2rad(degrees) {
  return degrees * (Math.PI / 180);
}

function npdeg2rad(degrees) {
  return [degrees[0] * (Math.PI / 180), degrees[1] * (Math.PI / 180), degrees[2] * (Math.PI / 180)];
}

function rad2deg(radians) {
  return radians * (180 / Math.PI);
}

function byId(id) {
  return document.getElementById(id);
} // fix for .dot N-dim vs 1D-dim Array


function dot3vs1(a, b) {
  var aNumRows = a.length,
      aNumCols = a[0].length,
      bNumRows = b.length;
  var REZ1 = 0,
      REZ2 = 0,
      REZ3 = 0;

  if (aNumRows == 3 && aNumCols == 3 && bNumRows == 3) {
    for (var j = 0; j < a.length; j++) {
      // First root of 3x3 a.
      REZ1 += a[0][j] * b[j];
      REZ2 += a[1][j] * b[j];
      REZ3 += a[2][j] * b[j];
    }

    var finalRez = [REZ1, REZ2, REZ3];
    return finalRez;
  } else {
    console.error("Bad arguments for dot3vs1");
  }
}

function multiply(a, b) {
  var aNumRows = a.length,
      aNumCols = a[0].length,
      bNumRows = b.length,
      bNumCols = b[0].length,
      m = new Array(aNumRows);

  for (var r = 0; r < aNumRows; ++r) {
    m[r] = new Array(bNumCols);

    for (var c = 0; c < bNumCols; ++c) {
      m[r][c] = 0;

      for (var i = 0; i < aNumCols; ++i) {
        m[r][c] += a[r][i] * b[i][c];
      }
    }
  }

  return m;
}
/**
 * @description
 * Euler's rotation theorem tells us that any rotation in 3D can be described by 3
 * angles.  Let's call the 3 angles the *Euler angle vector* and call the angles
 * in the vector :Math:`alpha`, :Math:`beta` and :Math:`gamma`.  The vector is [
 * :Math:`alpha`, :Math:`beta`. :Math:`gamma` ] and, in this description, the
 * order of the parameters specifies the order in which the rotations occur (so
 * the rotation corresponding to :Math:`alpha` is applied first).
 * @source https://github.com/matthew-brett/transforms3d/blob/master/transforms3d/euler.py
 */
// map axes strings to/from tuples of inner axis, parity, repetition, frame


var _AXES2TUPLE = {
  'sxyz': [0, 0, 0, 0],
  'sxyx': [0, 0, 1, 0],
  'sxzy': [0, 1, 0, 0],
  'sxzx': [0, 1, 1, 0],
  'syzx': [1, 0, 0, 0],
  'syzy': [1, 0, 1, 0],
  'syxz': [1, 1, 0, 0],
  'syxy': [1, 1, 1, 0],
  'szxy': [2, 0, 0, 0],
  'szxz': [2, 0, 1, 0],
  'szyx': [2, 1, 0, 0],
  'szyz': [2, 1, 1, 0],
  'rzyx': [0, 0, 0, 1],
  'rxyx': [0, 0, 1, 1],
  'ryzx': [0, 1, 0, 1],
  'rxzx': [0, 1, 1, 1],
  'rxzy': [1, 0, 0, 1],
  'ryzy': [1, 0, 1, 1],
  'rzxy': [1, 1, 0, 1],
  'ryxy': [1, 1, 1, 1],
  'ryxz': [2, 0, 0, 1],
  'rzxz': [2, 0, 1, 1],
  'rxyz': [2, 1, 0, 1],
  'rzyz': [2, 1, 1, 1]
}; // axis sequences for Euler angles

var _NEXT_AXIS = [1, 2, 0, 1];

function euler2mat(ai, aj, ak, axes) {
  if (typeof axes === 'undefined') var axes = 'sxyz'; // Return rotation matrix from Euler angles and axis sequence.
  // Parameters

  /*
  ai : float
      First rotation angle (according to `axes`).
  aj : float
      Second rotation angle (according to `axes`).
  ak : float
      Third rotation angle (according to `axes`).
  axes : str, optional
      Axis specification; one of 24 axis sequences as string or encoded
      tuple - e.g. ``sxyz`` (the default).
  Returns
  -------
  mat : array (3, 3)
      Rotation matrix or affine.
  Examples
  --------
  >>> R = euler2mat(1, 2, 3, 'syxz')
  >>> np.allclose(np.sum(R[0]), -1.34786452)
  True
  >>> R = euler2mat(1, 2, 3, (0, 1, 0, 1))
  >>> np.allclose(np.sum(R[0]), -0.383436184)
  True */

  try {
    var firstaxis = _AXES2TUPLE[axes][0],
        parity = _AXES2TUPLE[axes][1],
        repetition = _AXES2TUPLE[axes][2],
        frame = _AXES2TUPLE[axes][3];
  } catch (AttributeError) {
    // _TUPLE2AXES[axes]  # validation
    // firstaxis, parity, repetition, frame = axes
    console.error("AttributeError: ", AttributeError);
  }

  var i = firstaxis;
  var j = _NEXT_AXIS[i + parity];
  var k = _NEXT_AXIS[i - parity + 1];

  if (frame) {
    ai = ak;
    ak = ai;
  }

  if (parity) {
    ai = -ai;
    aj = -aj;
    ak = -ak;
  }

  var si = Math.sin(ai);
  var sj = Math.sin(aj);
  var sk = Math.sin(ak);
  var ci = Math.cos(ai);
  var cj = Math.cos(aj);
  var ck = Math.cos(ak);
  var cc = ci * ck;
  var cs = ci * sk;
  var sc = si * ck;
  var ss = si * sk; // M = np.eye(3)

  var M = [[1., 0., 0], [0., 1., 0], [0., 0., 1]];

  if (repetition) {
    M[i][i] = cj;
    M[i][j] = sj * si;
    M[i][k] = sj * ci;
    M[j][i] = sj * sk;
    M[j][j] = -cj * ss + cc;
    M[j][k] = -cj * cs - sc;
    M[k][i] = -sj * ck;
    M[k][j] = cj * sc + cs;
    M[k][k] = cj * cc - ss;
  } else {
    M[i][i] = cj * ck;
    M[i][j] = sj * sc - cs;
    M[i][k] = sj * cc + ss;
    M[j][i] = cj * sk;
    M[j][j] = sj * ss + cc;
    M[j][k] = sj * cs - sc;
    M[k][i] = -sj;
    M[k][j] = cj * si;
    M[k][k] = cj * ci;
  }

  return M;
}
/**
 * @description
 * How to calculate the angle from rotation matrix.
 */


function mat2euler(M, rad2deg_flag) {
  var pitch_1, pitch_2, roll_1, roll_2, yaw_1, yaw_2, pitch, roll, yaw;

  if (M[2][0] != 1 & M[2][0] != -1) {
    pitch_1 = -1 * Math.asin(M[2][0]);
    pitch_2 = Math.PI - pitch_1;
    roll_1 = Math.atan2(M[2][1] / Math.cos(pitch_1), M[2][2] / Math.cos(pitch_1));
    roll_2 = Math.atan2(M[2][1] / Math.cos(pitch_2), M[2][2] / Math.cos(pitch_2));
    yaw_1 = Math.atan2(M[1][0] / Math.cos(pitch_1), M[0][0] / Math.cos(pitch_1));
    yaw_2 = Math.atan2(M[1][0] / Math.cos(pitch_2), M[0][0] / Math.cos(pitch_2));
    pitch = pitch_1;
    roll = roll_1;
    yaw = yaw_1;
  } else {
    yaw = 0;

    if (M[2][0] == -1) {
      pitch = Math.PI / 2;
      roll = yaw + Math.atan2(M[0][1], M[0][2]);
    } else {
      pitch = -Math.PI / 2;
      roll = -1 * yaw + Math.atan2(-1 * M[0][1], -1 * M[0][2]);
    }
  }

  if (typeof rad2deg_flag !== "undefined") {
    // convert from radians to degrees
    roll = roll * 180 / Math.PI;
    pitch = pitch * 180 / Math.PI;
    yaw = yaw * 180 / Math.PI;
  }

  return [roll, pitch, yaw];
}

class MEBvhJoint {
  constructor(name, parent) {
    this.name = name;
    this.parent = parent;
    this.offset = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
    this.channels = [];
    this.children = [];
  }

  add_child(child) {
    this.children.push(child);
  }

  __repr__() {
    return this.name;
  }

  position_animated() {
    var detFlag = false;

    for (const item in this.channels) {
      if (this.channels[item].endsWith("position") == true) {
        detFlag = true;
      }
    }

    return detFlag;
  }

  rotation_animated() {
    var detFlag = false;

    for (const item in this.channels) {
      if (this.channels[item].endsWith("rotation") == true) {
        detFlag = true;
      }
    }

    return detFlag;
  }

}

exports.MEBvhJoint = MEBvhJoint;

class MEBvh {
  constructor() {
    this.joints = {};
    this.root = null;
    this.keyframes = null;
    this.frames = 0;
    this.fps = 0;
    this.myName = "MATRIX-ENGINE-BVH";
  }

  async parse_file(link) {
    return new Promise((resolve, reject) => {
      fetch(link).then(event => {
        event.text().then(text => {
          var hierarchy = text.split("MOTION")[0];
          var motion = text.split("MOTION")[1];
          var newLog = document.createElement("div");
          newLog.innerHTML += '<h2>Hierarchy</h2>';
          newLog.innerHTML += '<p>' + hierarchy + '</p>';
          var newLog2 = document.createElement("span");
          newLog2.innerHTML += '<h2>Motion</h2>';
          newLog2.innerHTML += '<p class="paragraf fixHeight" >' + motion + '</p>';

          if (byId && byId('log') !== null) {
            byId('log').appendChild(newLog2);
            byId('log').appendChild(newLog);
          }

          this._parse_hierarchy(hierarchy);

          this.parse_motion(motion);
          resolve();
        });
      });
    });
  }

  _parse_hierarchy(text) {
    var lines = text.split(/\s*\n+\s*/);
    var joint_stack = [];

    for (var key in lines) {
      var line = lines[key];
      var words = line.split(/\s+/);
      var instruction = words[0];
      var parent = null;

      if (instruction == "JOINT" || instruction == "ROOT") {
        if (instruction == "JOINT") {
          // -1 py -> last item
          parent = joint_stack[joint_stack.length - 1];
        } else {
          parent = null;
        }

        var joint = new MEBvhJoint(words[1], parent);
        this.joints[joint.name] = joint;

        if (parent != null) {
          parent.add_child(joint);
        }

        joint_stack.push(joint);

        if (instruction == "ROOT") {
          this.root = joint;
        }
      } else if (instruction == "CHANNELS") {
        for (var j = 2; j < words.length; j++) {
          joint_stack[joint_stack.length - 1].channels.push(words[j]);
        }
      } else if (instruction == "OFFSET") {
        for (var j = 1; j < words.length; j++) {
          joint_stack[joint_stack.length - 1].offset[j - 1] = parseFloat(words[j]);
        }
      } else if (instruction == "End") {
        var joint = new MEBvhJoint(joint_stack[joint_stack.length - 1].name + "_end", joint_stack[joint_stack.length - 1]);
        joint_stack[joint_stack.length - 1].add_child(joint);
        joint_stack.push(joint);
        this.joints[joint.name] = joint;
      } else if (instruction == "}") {
        joint_stack.pop();
      }
    }
  }

  _add_pose_recursive(joint, offset, poses) {
    var newLog1 = document.createElement("span");
    newLog1.innerHTML += '<h2>add_pose_recursive</h2>';
    newLog1.innerHTML += '<p class="paragraf" >Joint Name: ' + joint.name + '</p>';
    newLog1.innerHTML += '<p>joint.parent    : ' + (joint.parent != null ? joint.parent.name : 'null') + '</p>';
    newLog1.innerHTML += '<p>joint.offset    : ' + joint.offset + '</p>';
    newLog1.innerHTML += '<p>joint.children.length  : ' + joint.children.length + '</p>';
    joint.children.length != 0 ? newLog1.innerHTML += '<p> Childrens: ' : newLog1.innerHTML += 'No Childrens ';
    joint.children.forEach(iJoint => {
      newLog1.innerHTML += ' ' + iJoint['name'] + ' , ';
    });
    newLog1.innerHTML += '</p>';
    newLog1.innerHTML += '<p>Argument offset : ' + offset + '</p>';
    byId('log').appendChild(newLog1);
    var pose = arraySum3(joint.offset, offset);
    poses.push(pose);

    for (var c in joint.children) {
      this._add_pose_recursive(joint.children[c], pose, poses);
    }
  }

  plot_hierarchy() {
    // import matplotlib.pyplot as plt
    // from mpl_toolkits.mplot3d import axes3d, Axes3D
    var poses = [];

    this._add_pose_recursive(this.root, [0, 0, 0], poses); // pos = np.array(poses);

    /* Draw staff DISABLED
        fig = plt.figure()
        ax = fig.add_subplot(111, projection='3d')
        ax.scatter(pos[:, 0], pos[:, 2], pos[:, 1])
        ax.set_xlim(-30, 30)
        ax.set_ylim(-30, 30)
        ax.set_zlim(-30, 30)
        plt.show() */

  }

  parse_motion(text) {
    var lines = text.split(/\s*\n+\s*/);
    var frame = 0;

    for (var key in lines) {
      var line = lines[key];

      if (line == "") {
        continue;
      }

      var words = line.split(/\s+/);

      if (line.startsWith("Frame Time:")) {
        this.fps = Math.round(1 / parseFloat(words[2]));
        continue;
      }

      if (line.startsWith("Frames:")) {
        this.frames = parseInt(words[1]);
        continue;
      }

      if (this.keyframes == null) {
        // OK this is just costruction (define) with random values.
        var localArr = Array.from(Array(this.frames), () => new Array(words.length));
        this.keyframes = localArr;
      }

      for (var angle_index = 0; angle_index < words.length; angle_index++) {
        this.keyframes[frame][angle_index] = parseFloat(words[angle_index]);
      }

      frame += 1;
    }
  }

  _extract_rotation(frame_pose, index_offset, joint) {
    var local_rotation = [0, 0, 0],
        M_rotation;

    for (var key in joint.channels) {
      var channel = joint.channels[key];

      if (channel.endsWith("position")) {
        continue;
      }

      if (channel == "Xrotation") {
        local_rotation[0] = frame_pose[index_offset];
      } else if (channel == "Yrotation") {
        local_rotation[1] = frame_pose[index_offset];
      } else if (channel == "Zrotation") {
        local_rotation[2] = frame_pose[index_offset];
      } else {
        console.warn("Unknown channel {channel}"); // raise Exception(f"Unknown channel {channel}");
      }

      index_offset += 1;
    }

    local_rotation = npdeg2rad(local_rotation);
    M_rotation = [[1, 0, 0], [0, 1, 0], [0, 0, 1]];

    for (key in joint.channels) {
      var channel = joint.channels[key];

      if (channel.endsWith("position")) {
        continue;
      }

      var euler_rot;

      if (channel == "Xrotation") {
        // console.warn("local_rotation " + local_rotation);
        euler_rot = [local_rotation[0], 0., 0.];
      } else if (channel == "Yrotation") {
        euler_rot = [0., local_rotation[1], 0.];
      } else if (channel == "Zrotation") {
        euler_rot = [0., 0., local_rotation[2]];
      } else {
        console.warn("Unknown channel {channel}");
      }

      var M_channel = euler2mat(euler_rot[0], euler_rot[1], euler_rot[2], euler_rot[3]);
      var M_rotation = multiply(M_rotation, M_channel);
    }

    return [M_rotation, index_offset];
  }

  _extract_position(joint, frame_pose, index_offset) {
    var offset_position = [0, 0, 0];

    for (var key in joint.channels) {
      var channel = joint.channels[key];

      if (channel.endsWith("rotation")) {
        continue;
      }

      if (channel == "Xposition") {
        offset_position[0] = frame_pose[index_offset];
      } else if (channel == "Yposition") {
        offset_position[1] = frame_pose[index_offset];
      } else if (channel == "Zposition") {
        offset_position[2] = frame_pose[index_offset];
      } else {
        console.warn("Unknown channel {channel}"); // raise Exception(f"Unknown channel {channel}")
      }

      index_offset += 1;
    }

    return [offset_position, index_offset];
  }

  _recursive_apply_frame(joint, frame_pose, index_offset, p, r, M_parent, p_parent) {
    var joint_index;

    if (joint.position_animated()) {
      var local = this._extract_position(joint, frame_pose, index_offset);

      var offset_position = local[0],
          index_offset = local[1];
    } else {
      var offset_position = [0, 0, 0];
    }

    if (joint.channels.length == 0) {
      var local2 = 0;

      for (var item in this.joints) {
        if (joint.name == item) {
          joint_index = local2;
        }

        local2++;
      }

      p[joint_index] = arraySum3(p_parent, dot3vs1(M_parent, joint.offset));
      r[joint_index] = mat2euler(M_parent);
      return index_offset;
    }

    if (joint.rotation_animated()) {
      var local2 = this._extract_rotation(frame_pose, index_offset, joint);

      var M_rotation = local2[0];
      index_offset = local2[1];
    } else {
      var M_rotation = [[1, 0, 0], [0, 1, 0], [0, 0, 1]];
    }

    var M = multiply(M_parent, M_rotation); // https://www.khanacademy.org/math/precalculus/x9e81a4f98389efdf:matrices/x9e81a4f98389efdf:adding-and-subtracting-matrices/e/matrix_addition_and_subtraction

    var position = arraySum3(p_parent, dot3vs1(M_parent, joint.offset));
    position = arraySum3(position, offset_position);
    var rotation = mat2euler(M, "rad2deg"); // just find by id

    var local = 0;

    for (const item in this.joints) {
      if (joint.name == item) {
        joint_index = local;
      }

      local++;
    }

    p[joint_index] = position;
    r[joint_index] = rotation;

    for (var c in joint.children) {
      index_offset = this._recursive_apply_frame(joint.children[c], frame_pose, index_offset, p, r, M, position);
    }

    return index_offset;
  }

  frame_pose(frame) {
    var jointLength = 0;

    for (var x in this.joints) {
      jointLength++;
    }

    var p = Array.from(Array(jointLength), () => [0, 0, 0]);
    var r = Array.from(Array(jointLength), () => [0, 0, 0]);
    var frame_pose = this.keyframes[frame];
    var M_parent = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
    M_parent[0][0] = 1;
    M_parent[1][1] = 1;
    M_parent[2][2] = 1;

    this._recursive_apply_frame(this.root, frame_pose, 0, p, r, M_parent, [0, 0, 0]);

    return [p, r];
  }

  all_frame_poses() {
    var jointLength = 0;

    for (var x in this.joints) {
      jointLength++;
    }

    var p = Array.from({
      length: this.frames
    }, () => Array.from({
      length: jointLength
    }, () => [0, 0, 0]));
    var r = Array.from({
      length: this.frames
    }, () => Array.from({
      length: jointLength
    }, () => [0, 0, 0]));

    for (var frame = 0; frame < this.keyframes.length; frame++) {
      var local3 = this.frame_pose(frame);
      p[frame] = local3[0];
      r[frame] = local3[1];
    }

    return [p, r];
  }

  _plot_pose(p, r, fig, ax) {
    /* 
      _plot_pose(p, r, fig=None, ax=None) {
        import matplotlib.pyplot as plt
        from mpl_toolkits.mplot3d import axes3d, Axes3D
      if fig is None:
          fig = plt.figure()
      if ax is None:
          ax = fig.add_subplot(111, projection='3d')
      ax.cla()
      ax.scatter(p[:, 0], p[:, 2], p[:, 1])
      ax.set_xlim(-30, 30)
      ax.set_ylim(-30, 30)
      ax.set_zlim(-1, 59)
      plt.draw()
      plt.pause(0.001)
    */
  } // Meybe helps for draw
  // plot_frame(frame, fig=None, ax=None) {


  plot_frame(frame, fig, ax) {// ????
    // p, (r = this.frame_pose(frame));
    // this._plot_pose(p, r, fig, ax);
  }

  joint_names() {
    var keys = [];

    for (var key in this.joints) {
      keys.push(key);
    }

    return keys;
  }

  plot_all_frames() {
    /*
      import matplotlib.pyplot as plt
      from mpl_toolkits.mplot3d import axes3d, Axes3D
      fig = plt.figure()
      ax = fig.add_subplot(111, projection='3d')
      for i in range(self.frames) {
          self.plot_frame(i, fig, ax);
      } 
    */
  }

  __repr__() {
    return `BVH.JS ${this.joints.keys().length} joints, ${this.frames} frames`;
  }

}

exports.MEBvh = MEBvh;

},{}],24:[function(require,module,exports){
(function (global){(function (){
/*
 * Copyright (c) 2015 cannon.js Authors
 *
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without
 * restriction, including without limitation the rights to use, copy,
 * modify, merge, publish, distribute, sublicense, and/or sell copies
 * of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
 * LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
 * OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&false)define([],e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),f.CANNON=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){
module.exports={
  "name": "cannon",
  "version": "0.6.2",
  "description": "A lightweight 3D physics engine written in JavaScript.",
  "homepage": "https://github.com/schteppe/cannon.js",
  "author": "Stefan Hedman <schteppe@gmail.com> (http://steffe.se)",
  "keywords": [
    "cannon.js",
    "cannon",
    "physics",
    "engine",
    "3d"
  ],
  "main": "./build/cannon.js",
  "engines": {
    "node": "*"
  },
  "repository": {
    "type": "git",
    "url": "https://github.com/schteppe/cannon.js.git"
  },
  "bugs": {
    "url": "https://github.com/schteppe/cannon.js/issues"
  },
  "licenses": [
    {
      "type": "MIT"
    }
  ],
  "devDependencies": {
    "jshint": "latest",
    "uglify-js": "latest",
    "nodeunit": "^0.9.0",
    "grunt": "~0.4.0",
    "grunt-contrib-jshint": "~0.1.1",
    "grunt-contrib-nodeunit": "^0.4.1",
    "grunt-contrib-concat": "~0.1.3",
    "grunt-contrib-uglify": "^0.5.1",
    "grunt-browserify": "^2.1.4",
    "grunt-contrib-yuidoc": "^0.5.2",
    "browserify": "*"
  },
  "dependencies": {}
}

},{}],2:[function(_dereq_,module,exports){
// Export classes
module.exports = {
    version :                       _dereq_('../package.json').version,

    AABB :                          _dereq_('./collision/AABB'),
    ArrayCollisionMatrix :          _dereq_('./collision/ArrayCollisionMatrix'),
    Body :                          _dereq_('./objects/Body'),
    Box :                           _dereq_('./shapes/Box'),
    Broadphase :                    _dereq_('./collision/Broadphase'),
    Constraint :                    _dereq_('./constraints/Constraint'),
    ContactEquation :               _dereq_('./equations/ContactEquation'),
    Narrowphase :                   _dereq_('./world/Narrowphase'),
    ConeTwistConstraint :           _dereq_('./constraints/ConeTwistConstraint'),
    ContactMaterial :               _dereq_('./material/ContactMaterial'),
    ConvexPolyhedron :              _dereq_('./shapes/ConvexPolyhedron'),
    Cylinder :                      _dereq_('./shapes/Cylinder'),
    DistanceConstraint :            _dereq_('./constraints/DistanceConstraint'),
    Equation :                      _dereq_('./equations/Equation'),
    EventTarget :                   _dereq_('./utils/EventTarget'),
    FrictionEquation :              _dereq_('./equations/FrictionEquation'),
    GSSolver :                      _dereq_('./solver/GSSolver'),
    GridBroadphase :                _dereq_('./collision/GridBroadphase'),
    Heightfield :                   _dereq_('./shapes/Heightfield'),
    HingeConstraint :               _dereq_('./constraints/HingeConstraint'),
    LockConstraint :                _dereq_('./constraints/LockConstraint'),
    Mat3 :                          _dereq_('./math/Mat3'),
    Material :                      _dereq_('./material/Material'),
    NaiveBroadphase :               _dereq_('./collision/NaiveBroadphase'),
    ObjectCollisionMatrix :         _dereq_('./collision/ObjectCollisionMatrix'),
    Pool :                          _dereq_('./utils/Pool'),
    Particle :                      _dereq_('./shapes/Particle'),
    Plane :                         _dereq_('./shapes/Plane'),
    PointToPointConstraint :        _dereq_('./constraints/PointToPointConstraint'),
    Quaternion :                    _dereq_('./math/Quaternion'),
    Ray :                           _dereq_('./collision/Ray'),
    RaycastVehicle :                _dereq_('./objects/RaycastVehicle'),
    RaycastResult :                 _dereq_('./collision/RaycastResult'),
    RigidVehicle :                  _dereq_('./objects/RigidVehicle'),
    RotationalEquation :            _dereq_('./equations/RotationalEquation'),
    RotationalMotorEquation :       _dereq_('./equations/RotationalMotorEquation'),
    SAPBroadphase :                 _dereq_('./collision/SAPBroadphase'),
    SPHSystem :                     _dereq_('./objects/SPHSystem'),
    Shape :                         _dereq_('./shapes/Shape'),
    Solver :                        _dereq_('./solver/Solver'),
    Sphere :                        _dereq_('./shapes/Sphere'),
    SplitSolver :                   _dereq_('./solver/SplitSolver'),
    Spring :                        _dereq_('./objects/Spring'),
    Trimesh :                       _dereq_('./shapes/Trimesh'),
    Vec3 :                          _dereq_('./math/Vec3'),
    Vec3Pool :                      _dereq_('./utils/Vec3Pool'),
    World :                         _dereq_('./world/World'),
};

},{"../package.json":1,"./collision/AABB":3,"./collision/ArrayCollisionMatrix":4,"./collision/Broadphase":5,"./collision/GridBroadphase":6,"./collision/NaiveBroadphase":7,"./collision/ObjectCollisionMatrix":8,"./collision/Ray":9,"./collision/RaycastResult":10,"./collision/SAPBroadphase":11,"./constraints/ConeTwistConstraint":12,"./constraints/Constraint":13,"./constraints/DistanceConstraint":14,"./constraints/HingeConstraint":15,"./constraints/LockConstraint":16,"./constraints/PointToPointConstraint":17,"./equations/ContactEquation":19,"./equations/Equation":20,"./equations/FrictionEquation":21,"./equations/RotationalEquation":22,"./equations/RotationalMotorEquation":23,"./material/ContactMaterial":24,"./material/Material":25,"./math/Mat3":27,"./math/Quaternion":28,"./math/Vec3":30,"./objects/Body":31,"./objects/RaycastVehicle":32,"./objects/RigidVehicle":33,"./objects/SPHSystem":34,"./objects/Spring":35,"./shapes/Box":37,"./shapes/ConvexPolyhedron":38,"./shapes/Cylinder":39,"./shapes/Heightfield":40,"./shapes/Particle":41,"./shapes/Plane":42,"./shapes/Shape":43,"./shapes/Sphere":44,"./shapes/Trimesh":45,"./solver/GSSolver":46,"./solver/Solver":47,"./solver/SplitSolver":48,"./utils/EventTarget":49,"./utils/Pool":51,"./utils/Vec3Pool":54,"./world/Narrowphase":55,"./world/World":56}],3:[function(_dereq_,module,exports){
var Vec3 = _dereq_('../math/Vec3');
var Utils = _dereq_('../utils/Utils');

module.exports = AABB;

/**
 * Axis aligned bounding box class.
 * @class AABB
 * @constructor
 * @param {Object} [options]
 * @param {Vec3}   [options.upperBound]
 * @param {Vec3}   [options.lowerBound]
 */
function AABB(options){
    options = options || {};

    /**
     * The lower bound of the bounding box.
     * @property lowerBound
     * @type {Vec3}
     */
    this.lowerBound = new Vec3();
    if(options.lowerBound){
        this.lowerBound.copy(options.lowerBound);
    }

    /**
     * The upper bound of the bounding box.
     * @property upperBound
     * @type {Vec3}
     */
    this.upperBound = new Vec3();
    if(options.upperBound){
        this.upperBound.copy(options.upperBound);
    }
}

var tmp = new Vec3();

/**
 * Set the AABB bounds from a set of points.
 * @method setFromPoints
 * @param {Array} points An array of Vec3's.
 * @param {Vec3} position
 * @param {Quaternion} quaternion
 * @param {number} skinSize
 * @return {AABB} The self object
 */
AABB.prototype.setFromPoints = function(points, position, quaternion, skinSize){
    var l = this.lowerBound,
        u = this.upperBound,
        q = quaternion;

    // Set to the first point
    l.copy(points[0]);
    if(q){
        q.vmult(l, l);
    }
    u.copy(l);

    for(var i = 1; i<points.length; i++){
        var p = points[i];

        if(q){
            q.vmult(p, tmp);
            p = tmp;
        }

        if(p.x > u.x){ u.x = p.x; }
        if(p.x < l.x){ l.x = p.x; }
        if(p.y > u.y){ u.y = p.y; }
        if(p.y < l.y){ l.y = p.y; }
        if(p.z > u.z){ u.z = p.z; }
        if(p.z < l.z){ l.z = p.z; }
    }

    // Add offset
    if (position) {
        position.vadd(l, l);
        position.vadd(u, u);
    }

    if(skinSize){
        l.x -= skinSize;
        l.y -= skinSize;
        l.z -= skinSize;
        u.x += skinSize;
        u.y += skinSize;
        u.z += skinSize;
    }

    return this;
};

/**
 * Copy bounds from an AABB to this AABB
 * @method copy
 * @param  {AABB} aabb Source to copy from
 * @return {AABB} The this object, for chainability
 */
AABB.prototype.copy = function(aabb){
    this.lowerBound.copy(aabb.lowerBound);
    this.upperBound.copy(aabb.upperBound);
    return this;
};

/**
 * Clone an AABB
 * @method clone
 */
AABB.prototype.clone = function(){
    return new AABB().copy(this);
};

/**
 * Extend this AABB so that it covers the given AABB too.
 * @method extend
 * @param  {AABB} aabb
 */
AABB.prototype.extend = function(aabb){
    // Extend lower bound
    var l = aabb.lowerBound.x;
    if(this.lowerBound.x > l){
        this.lowerBound.x = l;
    }

    // Upper
    var u = aabb.upperBound.x;
    if(this.upperBound.x < u){
        this.upperBound.x = u;
    }

    // Extend lower bound
    var l = aabb.lowerBound.y;
    if(this.lowerBound.y > l){
        this.lowerBound.y = l;
    }

    // Upper
    var u = aabb.upperBound.y;
    if(this.upperBound.y < u){
        this.upperBound.y = u;
    }

    // Extend lower bound
    var l = aabb.lowerBound.z;
    if(this.lowerBound.z > l){
        this.lowerBound.z = l;
    }

    // Upper
    var u = aabb.upperBound.z;
    if(this.upperBound.z < u){
        this.upperBound.z = u;
    }
};

/**
 * Returns true if the given AABB overlaps this AABB.
 * @method overlaps
 * @param  {AABB} aabb
 * @return {Boolean}
 */
AABB.prototype.overlaps = function(aabb){
    var l1 = this.lowerBound,
        u1 = this.upperBound,
        l2 = aabb.lowerBound,
        u2 = aabb.upperBound;

    //      l2        u2
    //      |---------|
    // |--------|
    // l1       u1

    return ((l2.x <= u1.x && u1.x <= u2.x) || (l1.x <= u2.x && u2.x <= u1.x)) &&
           ((l2.y <= u1.y && u1.y <= u2.y) || (l1.y <= u2.y && u2.y <= u1.y)) &&
           ((l2.z <= u1.z && u1.z <= u2.z) || (l1.z <= u2.z && u2.z <= u1.z));
};

/**
 * Returns true if the given AABB is fully contained in this AABB.
 * @method contains
 * @param {AABB} aabb
 * @return {Boolean}
 */
AABB.prototype.contains = function(aabb){
    var l1 = this.lowerBound,
        u1 = this.upperBound,
        l2 = aabb.lowerBound,
        u2 = aabb.upperBound;

    //      l2        u2
    //      |---------|
    // |---------------|
    // l1              u1

    return (
        (l1.x <= l2.x && u1.x >= u2.x) &&
        (l1.y <= l2.y && u1.y >= u2.y) &&
        (l1.z <= l2.z && u1.z >= u2.z)
    );
};

/**
 * @method getCorners
 * @param {Vec3} a
 * @param {Vec3} b
 * @param {Vec3} c
 * @param {Vec3} d
 * @param {Vec3} e
 * @param {Vec3} f
 * @param {Vec3} g
 * @param {Vec3} h
 */
AABB.prototype.getCorners = function(a, b, c, d, e, f, g, h){
    var l = this.lowerBound,
        u = this.upperBound;

    a.copy(l);
    b.set( u.x, l.y, l.z );
    c.set( u.x, u.y, l.z );
    d.set( l.x, u.y, u.z );
    e.set( u.x, l.y, l.z );
    f.set( l.x, u.y, l.z );
    g.set( l.x, l.y, u.z );
    h.copy(u);
};

var transformIntoFrame_corners = [
    new Vec3(),
    new Vec3(),
    new Vec3(),
    new Vec3(),
    new Vec3(),
    new Vec3(),
    new Vec3(),
    new Vec3()
];

/**
 * Get the representation of an AABB in another frame.
 * @method toLocalFrame
 * @param  {Transform} frame
 * @param  {AABB} target
 * @return {AABB} The "target" AABB object.
 */
AABB.prototype.toLocalFrame = function(frame, target){

    var corners = transformIntoFrame_corners;
    var a = corners[0];
    var b = corners[1];
    var c = corners[2];
    var d = corners[3];
    var e = corners[4];
    var f = corners[5];
    var g = corners[6];
    var h = corners[7];

    // Get corners in current frame
    this.getCorners(a, b, c, d, e, f, g, h);

    // Transform them to new local frame
    for(var i=0; i !== 8; i++){
        var corner = corners[i];
        frame.pointToLocal(corner, corner);
    }

    return target.setFromPoints(corners);
};

/**
 * Get the representation of an AABB in the global frame.
 * @method toWorldFrame
 * @param  {Transform} frame
 * @param  {AABB} target
 * @return {AABB} The "target" AABB object.
 */
AABB.prototype.toWorldFrame = function(frame, target){

    var corners = transformIntoFrame_corners;
    var a = corners[0];
    var b = corners[1];
    var c = corners[2];
    var d = corners[3];
    var e = corners[4];
    var f = corners[5];
    var g = corners[6];
    var h = corners[7];

    // Get corners in current frame
    this.getCorners(a, b, c, d, e, f, g, h);

    // Transform them to new local frame
    for(var i=0; i !== 8; i++){
        var corner = corners[i];
        frame.pointToWorld(corner, corner);
    }

    return target.setFromPoints(corners);
};

},{"../math/Vec3":30,"../utils/Utils":53}],4:[function(_dereq_,module,exports){
module.exports = ArrayCollisionMatrix;

/**
 * Collision "matrix". It's actually a triangular-shaped array of whether two bodies are touching this step, for reference next step
 * @class ArrayCollisionMatrix
 * @constructor
 */
function ArrayCollisionMatrix() {

    /**
     * The matrix storage
     * @property matrix
     * @type {Array}
     */
	this.matrix = [];
}

/**
 * Get an element
 * @method get
 * @param  {Number} i
 * @param  {Number} j
 * @return {Number}
 */
ArrayCollisionMatrix.prototype.get = function(i, j) {
	i = i.index;
	j = j.index;
    if (j > i) {
        var temp = j;
        j = i;
        i = temp;
    }
	return this.matrix[(i*(i + 1)>>1) + j-1];
};

/**
 * Set an element
 * @method set
 * @param {Number} i
 * @param {Number} j
 * @param {Number} value
 */
ArrayCollisionMatrix.prototype.set = function(i, j, value) {
	i = i.index;
	j = j.index;
    if (j > i) {
        var temp = j;
        j = i;
        i = temp;
    }
	this.matrix[(i*(i + 1)>>1) + j-1] = value ? 1 : 0;
};

/**
 * Sets all elements to zero
 * @method reset
 */
ArrayCollisionMatrix.prototype.reset = function() {
	for (var i=0, l=this.matrix.length; i!==l; i++) {
		this.matrix[i]=0;
	}
};

/**
 * Sets the max number of objects
 * @method setNumObjects
 * @param {Number} n
 */
ArrayCollisionMatrix.prototype.setNumObjects = function(n) {
	this.matrix.length = n*(n-1)>>1;
};

},{}],5:[function(_dereq_,module,exports){
var Body = _dereq_('../objects/Body');
var Vec3 = _dereq_('../math/Vec3');
var Quaternion = _dereq_('../math/Quaternion');
var Shape = _dereq_('../shapes/Shape');
var Plane = _dereq_('../shapes/Plane');

module.exports = Broadphase;

/**
 * Base class for broadphase implementations
 * @class Broadphase
 * @constructor
 * @author schteppe
 */
function Broadphase(){
    /**
    * The world to search for collisions in.
    * @property world
    * @type {World}
    */
    this.world = null;

    /**
     * If set to true, the broadphase uses bounding boxes for intersection test, else it uses bounding spheres.
     * @property useBoundingBoxes
     * @type {Boolean}
     */
    this.useBoundingBoxes = false;

    /**
     * Set to true if the objects in the world moved.
     * @property {Boolean} dirty
     */
    this.dirty = true;
}

/**
 * Get the collision pairs from the world
 * @method collisionPairs
 * @param {World} world The world to search in
 * @param {Array} p1 Empty array to be filled with body objects
 * @param {Array} p2 Empty array to be filled with body objects
 */
Broadphase.prototype.collisionPairs = function(world,p1,p2){
    throw new Error("collisionPairs not implemented for this BroadPhase class!");
};

/**
 * Check if a body pair needs to be intersection tested at all.
 * @method needBroadphaseCollision
 * @param {Body} bodyA
 * @param {Body} bodyB
 * @return {bool}
 */
var Broadphase_needBroadphaseCollision_STATIC_OR_KINEMATIC = Body.STATIC | Body.KINEMATIC;
Broadphase.prototype.needBroadphaseCollision = function(bodyA,bodyB){

    // Check collision filter masks
    if( (bodyA.collisionFilterGroup & bodyB.collisionFilterMask)===0 || (bodyB.collisionFilterGroup & bodyA.collisionFilterMask)===0){
        return false;
    }

    // Check types
    if(((bodyA.type & Broadphase_needBroadphaseCollision_STATIC_OR_KINEMATIC)!==0 || bodyA.sleepState === Body.SLEEPING) &&
       ((bodyB.type & Broadphase_needBroadphaseCollision_STATIC_OR_KINEMATIC)!==0 || bodyB.sleepState === Body.SLEEPING)) {
        // Both bodies are static, kinematic or sleeping. Skip.
        return false;
    }

    return true;
};

/**
 * Check if the bounding volumes of two bodies intersect.
 * @method intersectionTest
 * @param {Body} bodyA
 * @param {Body} bodyB
 * @param {array} pairs1
 * @param {array} pairs2
  */
Broadphase.prototype.intersectionTest = function(bodyA, bodyB, pairs1, pairs2){
    if(this.useBoundingBoxes){
        this.doBoundingBoxBroadphase(bodyA,bodyB,pairs1,pairs2);
    } else {
        this.doBoundingSphereBroadphase(bodyA,bodyB,pairs1,pairs2);
    }
};

/**
 * Check if the bounding spheres of two bodies are intersecting.
 * @method doBoundingSphereBroadphase
 * @param {Body} bodyA
 * @param {Body} bodyB
 * @param {Array} pairs1 bodyA is appended to this array if intersection
 * @param {Array} pairs2 bodyB is appended to this array if intersection
 */
var Broadphase_collisionPairs_r = new Vec3(), // Temp objects
    Broadphase_collisionPairs_normal =  new Vec3(),
    Broadphase_collisionPairs_quat =  new Quaternion(),
    Broadphase_collisionPairs_relpos  =  new Vec3();
Broadphase.prototype.doBoundingSphereBroadphase = function(bodyA,bodyB,pairs1,pairs2){
    var r = Broadphase_collisionPairs_r;
    bodyB.position.vsub(bodyA.position,r);
    var boundingRadiusSum2 = Math.pow(bodyA.boundingRadius + bodyB.boundingRadius, 2);
    var norm2 = r.norm2();
    if(norm2 < boundingRadiusSum2){
        pairs1.push(bodyA);
        pairs2.push(bodyB);
    }
};

/**
 * Check if the bounding boxes of two bodies are intersecting.
 * @method doBoundingBoxBroadphase
 * @param {Body} bodyA
 * @param {Body} bodyB
 * @param {Array} pairs1
 * @param {Array} pairs2
 */
Broadphase.prototype.doBoundingBoxBroadphase = function(bodyA,bodyB,pairs1,pairs2){
    if(bodyA.aabbNeedsUpdate){
        bodyA.computeAABB();
    }
    if(bodyB.aabbNeedsUpdate){
        bodyB.computeAABB();
    }

    // Check AABB / AABB
    if(bodyA.aabb.overlaps(bodyB.aabb)){
        pairs1.push(bodyA);
        pairs2.push(bodyB);
    }
};

/**
 * Removes duplicate pairs from the pair arrays.
 * @method makePairsUnique
 * @param {Array} pairs1
 * @param {Array} pairs2
 */
var Broadphase_makePairsUnique_temp = { keys:[] },
    Broadphase_makePairsUnique_p1 = [],
    Broadphase_makePairsUnique_p2 = [];
Broadphase.prototype.makePairsUnique = function(pairs1,pairs2){
    var t = Broadphase_makePairsUnique_temp,
        p1 = Broadphase_makePairsUnique_p1,
        p2 = Broadphase_makePairsUnique_p2,
        N = pairs1.length;

    for(var i=0; i!==N; i++){
        p1[i] = pairs1[i];
        p2[i] = pairs2[i];
    }

    pairs1.length = 0;
    pairs2.length = 0;

    for(var i=0; i!==N; i++){
        var id1 = p1[i].id,
            id2 = p2[i].id;
        var key = id1 < id2 ? id1+","+id2 :  id2+","+id1;
        t[key] = i;
        t.keys.push(key);
    }

    for(var i=0; i!==t.keys.length; i++){
        var key = t.keys.pop(),
            pairIndex = t[key];
        pairs1.push(p1[pairIndex]);
        pairs2.push(p2[pairIndex]);
        delete t[key];
    }
};

/**
 * To be implemented by subcasses
 * @method setWorld
 * @param {World} world
 */
Broadphase.prototype.setWorld = function(world){
};

/**
 * Check if the bounding spheres of two bodies overlap.
 * @method boundingSphereCheck
 * @param {Body} bodyA
 * @param {Body} bodyB
 * @return {boolean}
 */
var bsc_dist = new Vec3();
Broadphase.boundingSphereCheck = function(bodyA,bodyB){
    var dist = bsc_dist;
    bodyA.position.vsub(bodyB.position,dist);
    return Math.pow(bodyA.shape.boundingSphereRadius + bodyB.shape.boundingSphereRadius,2) > dist.norm2();
};

/**
 * Returns all the bodies within the AABB.
 * @method aabbQuery
 * @param  {World} world
 * @param  {AABB} aabb
 * @param  {array} result An array to store resulting bodies in.
 * @return {array}
 */
Broadphase.prototype.aabbQuery = function(world, aabb, result){
    console.warn('.aabbQuery is not implemented in this Broadphase subclass.');
    return [];
};
},{"../math/Quaternion":28,"../math/Vec3":30,"../objects/Body":31,"../shapes/Plane":42,"../shapes/Shape":43}],6:[function(_dereq_,module,exports){
module.exports = GridBroadphase;

var Broadphase = _dereq_('./Broadphase');
var Vec3 = _dereq_('../math/Vec3');
var Shape = _dereq_('../shapes/Shape');

/**
 * Axis aligned uniform grid broadphase.
 * @class GridBroadphase
 * @constructor
 * @extends Broadphase
 * @todo Needs support for more than just planes and spheres.
 * @param {Vec3} aabbMin
 * @param {Vec3} aabbMax
 * @param {Number} nx Number of boxes along x
 * @param {Number} ny Number of boxes along y
 * @param {Number} nz Number of boxes along z
 */
function GridBroadphase(aabbMin,aabbMax,nx,ny,nz){
    Broadphase.apply(this);
    this.nx = nx || 10;
    this.ny = ny || 10;
    this.nz = nz || 10;
    this.aabbMin = aabbMin || new Vec3(100,100,100);
    this.aabbMax = aabbMax || new Vec3(-100,-100,-100);
	var nbins = this.nx * this.ny * this.nz;
	if (nbins <= 0) {
		throw "GridBroadphase: Each dimension's n must be >0";
	}
    this.bins = [];
	this.binLengths = []; //Rather than continually resizing arrays (thrashing the memory), just record length and allow them to grow
	this.bins.length = nbins;
	this.binLengths.length = nbins;
	for (var i=0;i<nbins;i++) {
		this.bins[i]=[];
		this.binLengths[i]=0;
	}
}
GridBroadphase.prototype = new Broadphase();
GridBroadphase.prototype.constructor = GridBroadphase;

/**
 * Get all the collision pairs in the physics world
 * @method collisionPairs
 * @param {World} world
 * @param {Array} pairs1
 * @param {Array} pairs2
 */
var GridBroadphase_collisionPairs_d = new Vec3();
var GridBroadphase_collisionPairs_binPos = new Vec3();
GridBroadphase.prototype.collisionPairs = function(world,pairs1,pairs2){
    var N = world.numObjects(),
        bodies = world.bodies;

    var max = this.aabbMax,
        min = this.aabbMin,
        nx = this.nx,
        ny = this.ny,
        nz = this.nz;

	var xstep = ny*nz;
	var ystep = nz;
	var zstep = 1;

    var xmax = max.x,
        ymax = max.y,
        zmax = max.z,
        xmin = min.x,
        ymin = min.y,
        zmin = min.z;

    var xmult = nx / (xmax-xmin),
        ymult = ny / (ymax-ymin),
        zmult = nz / (zmax-zmin);

    var binsizeX = (xmax - xmin) / nx,
        binsizeY = (ymax - ymin) / ny,
        binsizeZ = (zmax - zmin) / nz;

	var binRadius = Math.sqrt(binsizeX*binsizeX + binsizeY*binsizeY + binsizeZ*binsizeZ) * 0.5;

    var types = Shape.types;
    var SPHERE =            types.SPHERE,
        PLANE =             types.PLANE,
        BOX =               types.BOX,
        COMPOUND =          types.COMPOUND,
        CONVEXPOLYHEDRON =  types.CONVEXPOLYHEDRON;

    var bins=this.bins,
		binLengths=this.binLengths,
        Nbins=this.bins.length;

    // Reset bins
    for(var i=0; i!==Nbins; i++){
        binLengths[i] = 0;
    }

    var ceil = Math.ceil;
	var min = Math.min;
	var max = Math.max;

	function addBoxToBins(x0,y0,z0,x1,y1,z1,bi) {
		var xoff0 = ((x0 - xmin) * xmult)|0,
			yoff0 = ((y0 - ymin) * ymult)|0,
			zoff0 = ((z0 - zmin) * zmult)|0,
			xoff1 = ceil((x1 - xmin) * xmult),
			yoff1 = ceil((y1 - ymin) * ymult),
			zoff1 = ceil((z1 - zmin) * zmult);

		if (xoff0 < 0) { xoff0 = 0; } else if (xoff0 >= nx) { xoff0 = nx - 1; }
		if (yoff0 < 0) { yoff0 = 0; } else if (yoff0 >= ny) { yoff0 = ny - 1; }
		if (zoff0 < 0) { zoff0 = 0; } else if (zoff0 >= nz) { zoff0 = nz - 1; }
		if (xoff1 < 0) { xoff1 = 0; } else if (xoff1 >= nx) { xoff1 = nx - 1; }
		if (yoff1 < 0) { yoff1 = 0; } else if (yoff1 >= ny) { yoff1 = ny - 1; }
		if (zoff1 < 0) { zoff1 = 0; } else if (zoff1 >= nz) { zoff1 = nz - 1; }

		xoff0 *= xstep;
		yoff0 *= ystep;
		zoff0 *= zstep;
		xoff1 *= xstep;
		yoff1 *= ystep;
		zoff1 *= zstep;

		for (var xoff = xoff0; xoff <= xoff1; xoff += xstep) {
			for (var yoff = yoff0; yoff <= yoff1; yoff += ystep) {
				for (var zoff = zoff0; zoff <= zoff1; zoff += zstep) {
					var idx = xoff+yoff+zoff;
					bins[idx][binLengths[idx]++] = bi;
				}
			}
		}
	}

    // Put all bodies into the bins
    for(var i=0; i!==N; i++){
        var bi = bodies[i];
        var si = bi.shape;

        switch(si.type){
        case SPHERE:
            // Put in bin
            // check if overlap with other bins
            var x = bi.position.x,
                y = bi.position.y,
                z = bi.position.z;
            var r = si.radius;

			addBoxToBins(x-r, y-r, z-r, x+r, y+r, z+r, bi);
            break;

        case PLANE:
            if(si.worldNormalNeedsUpdate){
                si.computeWorldNormal(bi.quaternion);
            }
            var planeNormal = si.worldNormal;

			//Relative position from origin of plane object to the first bin
			//Incremented as we iterate through the bins
			var xreset = xmin + binsizeX*0.5 - bi.position.x,
				yreset = ymin + binsizeY*0.5 - bi.position.y,
				zreset = zmin + binsizeZ*0.5 - bi.position.z;

            var d = GridBroadphase_collisionPairs_d;
			d.set(xreset, yreset, zreset);

			for (var xi = 0, xoff = 0; xi !== nx; xi++, xoff += xstep, d.y = yreset, d.x += binsizeX) {
				for (var yi = 0, yoff = 0; yi !== ny; yi++, yoff += ystep, d.z = zreset, d.y += binsizeY) {
					for (var zi = 0, zoff = 0; zi !== nz; zi++, zoff += zstep, d.z += binsizeZ) {
						if (d.dot(planeNormal) < binRadius) {
							var idx = xoff + yoff + zoff;
							bins[idx][binLengths[idx]++] = bi;
						}
					}
				}
			}
            break;

        default:
			if (bi.aabbNeedsUpdate) {
				bi.computeAABB();
			}

			addBoxToBins(
				bi.aabb.lowerBound.x,
				bi.aabb.lowerBound.y,
				bi.aabb.lowerBound.z,
				bi.aabb.upperBound.x,
				bi.aabb.upperBound.y,
				bi.aabb.upperBound.z,
				bi);
            break;
        }
    }

    // Check each bin
    for(var i=0; i!==Nbins; i++){
		var binLength = binLengths[i];
		//Skip bins with no potential collisions
		if (binLength > 1) {
			var bin = bins[i];

			// Do N^2 broadphase inside
			for(var xi=0; xi!==binLength; xi++){
				var bi = bin[xi];
				for(var yi=0; yi!==xi; yi++){
					var bj = bin[yi];
					if(this.needBroadphaseCollision(bi,bj)){
						this.intersectionTest(bi,bj,pairs1,pairs2);
					}
				}
			}
		}
    }

//	for (var zi = 0, zoff=0; zi < nz; zi++, zoff+= zstep) {
//		console.log("layer "+zi);
//		for (var yi = 0, yoff=0; yi < ny; yi++, yoff += ystep) {
//			var row = '';
//			for (var xi = 0, xoff=0; xi < nx; xi++, xoff += xstep) {
//				var idx = xoff + yoff + zoff;
//				row += ' ' + binLengths[idx];
//			}
//			console.log(row);
//		}
//	}

    this.makePairsUnique(pairs1,pairs2);
};

},{"../math/Vec3":30,"../shapes/Shape":43,"./Broadphase":5}],7:[function(_dereq_,module,exports){
module.exports = NaiveBroadphase;

var Broadphase = _dereq_('./Broadphase');
var AABB = _dereq_('./AABB');

/**
 * Naive broadphase implementation, used in lack of better ones.
 * @class NaiveBroadphase
 * @constructor
 * @description The naive broadphase looks at all possible pairs without restriction, therefore it has complexity N^2 (which is bad)
 * @extends Broadphase
 */
function NaiveBroadphase(){
    Broadphase.apply(this);
}
NaiveBroadphase.prototype = new Broadphase();
NaiveBroadphase.prototype.constructor = NaiveBroadphase;

/**
 * Get all the collision pairs in the physics world
 * @method collisionPairs
 * @param {World} world
 * @param {Array} pairs1
 * @param {Array} pairs2
 */
NaiveBroadphase.prototype.collisionPairs = function(world,pairs1,pairs2){
    var bodies = world.bodies,
        n = bodies.length,
        i,j,bi,bj;

    // Naive N^2 ftw!
    for(i=0; i!==n; i++){
        for(j=0; j!==i; j++){

            bi = bodies[i];
            bj = bodies[j];

            if(!this.needBroadphaseCollision(bi,bj)){
                continue;
            }

            this.intersectionTest(bi,bj,pairs1,pairs2);
        }
    }
};

var tmpAABB = new AABB();

/**
 * Returns all the bodies within an AABB.
 * @method aabbQuery
 * @param  {World} world
 * @param  {AABB} aabb
 * @param {array} result An array to store resulting bodies in.
 * @return {array}
 */
NaiveBroadphase.prototype.aabbQuery = function(world, aabb, result){
    result = result || [];

    for(var i = 0; i < world.bodies.length; i++){
        var b = world.bodies[i];

        if(b.aabbNeedsUpdate){
            b.computeAABB();
        }

        // Ugly hack until Body gets aabb
        if(b.aabb.overlaps(aabb)){
            result.push(b);
        }
    }

    return result;
};
},{"./AABB":3,"./Broadphase":5}],8:[function(_dereq_,module,exports){
module.exports = ObjectCollisionMatrix;

/**
 * Records what objects are colliding with each other
 * @class ObjectCollisionMatrix
 * @constructor
 */
function ObjectCollisionMatrix() {

    /**
     * The matrix storage
     * @property matrix
     * @type {Object}
     */
	this.matrix = {};
}

/**
 * @method get
 * @param  {Number} i
 * @param  {Number} j
 * @return {Number}
 */
ObjectCollisionMatrix.prototype.get = function(i, j) {
	i = i.id;
	j = j.id;
    if (j > i) {
        var temp = j;
        j = i;
        i = temp;
    }
	return i+'-'+j in this.matrix;
};

/**
 * @method set
 * @param  {Number} i
 * @param  {Number} j
 * @param {Number} value
 */
ObjectCollisionMatrix.prototype.set = function(i, j, value) {
	i = i.id;
	j = j.id;
    if (j > i) {
        var temp = j;
        j = i;
        i = temp;
	}
	if (value) {
		this.matrix[i+'-'+j] = true;
	}
	else {
		delete this.matrix[i+'-'+j];
	}
};

/**
 * Empty the matrix
 * @method reset
 */
ObjectCollisionMatrix.prototype.reset = function() {
	this.matrix = {};
};

/**
 * Set max number of objects
 * @method setNumObjects
 * @param {Number} n
 */
ObjectCollisionMatrix.prototype.setNumObjects = function(n) {
};

},{}],9:[function(_dereq_,module,exports){
module.exports = Ray;

var Vec3 = _dereq_('../math/Vec3');
var Quaternion = _dereq_('../math/Quaternion');
var Transform = _dereq_('../math/Transform');
var ConvexPolyhedron = _dereq_('../shapes/ConvexPolyhedron');
var Box = _dereq_('../shapes/Box');
var RaycastResult = _dereq_('../collision/RaycastResult');
var Shape = _dereq_('../shapes/Shape');
var AABB = _dereq_('../collision/AABB');

/**
 * A line in 3D space that intersects bodies and return points.
 * @class Ray
 * @constructor
 * @param {Vec3} from
 * @param {Vec3} to
 */
function Ray(from, to){
    /**
     * @property {Vec3} from
     */
    this.from = from ? from.clone() : new Vec3();

    /**
     * @property {Vec3} to
     */
    this.to = to ? to.clone() : new Vec3();

    /**
     * @private
     * @property {Vec3} _direction
     */
    this._direction = new Vec3();

    /**
     * The precision of the ray. Used when checking parallelity etc.
     * @property {Number} precision
     */
    this.precision = 0.0001;

    /**
     * Set to true if you want the Ray to take .collisionResponse flags into account on bodies and shapes.
     * @property {Boolean} checkCollisionResponse
     */
    this.checkCollisionResponse = true;

    /**
     * If set to true, the ray skips any hits with normal.dot(rayDirection) < 0.
     * @property {Boolean} skipBackfaces
     */
    this.skipBackfaces = false;

    /**
     * @property {number} collisionFilterMask
     * @default -1
     */
    this.collisionFilterMask = -1;

    /**
     * @property {number} collisionFilterGroup
     * @default -1
     */
    this.collisionFilterGroup = -1;

    /**
     * The intersection mode. Should be Ray.ANY, Ray.ALL or Ray.CLOSEST.
     * @property {number} mode
     */
    this.mode = Ray.ANY;

    /**
     * Current result object.
     * @property {RaycastResult} result
     */
    this.result = new RaycastResult();

    /**
     * Will be set to true during intersectWorld() if the ray hit anything.
     * @property {Boolean} hasHit
     */
    this.hasHit = false;

    /**
     * Current, user-provided result callback. Will be used if mode is Ray.ALL.
     * @property {Function} callback
     */
    this.callback = function(result){};
}
Ray.prototype.constructor = Ray;

Ray.CLOSEST = 1;
Ray.ANY = 2;
Ray.ALL = 4;

var tmpAABB = new AABB();
var tmpArray = [];

/**
 * Do itersection against all bodies in the given World.
 * @method intersectWorld
 * @param  {World} world
 * @param  {object} options
 * @return {Boolean} True if the ray hit anything, otherwise false.
 */
Ray.prototype.intersectWorld = function (world, options) {
    this.mode = options.mode || Ray.ANY;
    this.result = options.result || new RaycastResult();
    this.skipBackfaces = !!options.skipBackfaces;
    this.collisionFilterMask = typeof(options.collisionFilterMask) !== 'undefined' ? options.collisionFilterMask : -1;
    this.collisionFilterGroup = typeof(options.collisionFilterGroup) !== 'undefined' ? options.collisionFilterGroup : -1;
    if(options.from){
        this.from.copy(options.from);
    }
    if(options.to){
        this.to.copy(options.to);
    }
    this.callback = options.callback || function(){};
    this.hasHit = false;

    this.result.reset();
    this._updateDirection();

    this.getAABB(tmpAABB);
    tmpArray.length = 0;
    world.broadphase.aabbQuery(world, tmpAABB, tmpArray);
    this.intersectBodies(tmpArray);

    return this.hasHit;
};

var v1 = new Vec3(),
    v2 = new Vec3();

/*
 * As per "Barycentric Technique" as named here http://www.blackpawn.com/texts/pointinpoly/default.html But without the division
 */
Ray.pointInTriangle = pointInTriangle;
function pointInTriangle(p, a, b, c) {
    c.vsub(a,v0);
    b.vsub(a,v1);
    p.vsub(a,v2);

    var dot00 = v0.dot( v0 );
    var dot01 = v0.dot( v1 );
    var dot02 = v0.dot( v2 );
    var dot11 = v1.dot( v1 );
    var dot12 = v1.dot( v2 );

    var u,v;

    return  ( (u = dot11 * dot02 - dot01 * dot12) >= 0 ) &&
            ( (v = dot00 * dot12 - dot01 * dot02) >= 0 ) &&
            ( u + v < ( dot00 * dot11 - dot01 * dot01 ) );
}

/**
 * Shoot a ray at a body, get back information about the hit.
 * @method intersectBody
 * @private
 * @param {Body} body
 * @param {RaycastResult} [result] Deprecated - set the result property of the Ray instead.
 */
var intersectBody_xi = new Vec3();
var intersectBody_qi = new Quaternion();
Ray.prototype.intersectBody = function (body, result) {
    if(result){
        this.result = result;
        this._updateDirection();
    }
    var checkCollisionResponse = this.checkCollisionResponse;

    if(checkCollisionResponse && !body.collisionResponse){
        return;
    }

    if((this.collisionFilterGroup & body.collisionFilterMask)===0 || (body.collisionFilterGroup & this.collisionFilterMask)===0){
        return;
    }

    var xi = intersectBody_xi;
    var qi = intersectBody_qi;

    for (var i = 0, N = body.shapes.length; i < N; i++) {
        var shape = body.shapes[i];

        if(checkCollisionResponse && !shape.collisionResponse){
            continue; // Skip
        }

        body.quaternion.mult(body.shapeOrientations[i], qi);
        body.quaternion.vmult(body.shapeOffsets[i], xi);
        xi.vadd(body.position, xi);

        this.intersectShape(
            shape,
            qi,
            xi,
            body
        );

        if(this.result._shouldStop){
            break;
        }
    }
};

/**
 * @method intersectBodies
 * @param {Array} bodies An array of Body objects.
 * @param {RaycastResult} [result] Deprecated
 */
Ray.prototype.intersectBodies = function (bodies, result) {
    if(result){
        this.result = result;
        this._updateDirection();
    }

    for ( var i = 0, l = bodies.length; !this.result._shouldStop && i < l; i ++ ) {
        this.intersectBody(bodies[i]);
    }
};

/**
 * Updates the _direction vector.
 * @private
 * @method _updateDirection
 */
Ray.prototype._updateDirection = function(){
    this.to.vsub(this.from, this._direction);
    this._direction.normalize();
};

/**
 * @method intersectShape
 * @private
 * @param {Shape} shape
 * @param {Quaternion} quat
 * @param {Vec3} position
 * @param {Body} body
 */
Ray.prototype.intersectShape = function(shape, quat, position, body){
    var from = this.from;


    // Checking boundingSphere
    var distance = distanceFromIntersection(from, this._direction, position);
    if ( distance > shape.boundingSphereRadius ) {
        return;
    }

    var intersectMethod = this[shape.type];
    if(intersectMethod){
        intersectMethod.call(this, shape, quat, position, body);
    }
};

var vector = new Vec3();
var normal = new Vec3();
var intersectPoint = new Vec3();

var a = new Vec3();
var b = new Vec3();
var c = new Vec3();
var d = new Vec3();

var tmpRaycastResult = new RaycastResult();

/**
 * @method intersectBox
 * @private
 * @param  {Shape} shape
 * @param  {Quaternion} quat
 * @param  {Vec3} position
 * @param  {Body} body
 */
Ray.prototype.intersectBox = function(shape, quat, position, body){
    return this.intersectConvex(shape.convexPolyhedronRepresentation, quat, position, body);
};
Ray.prototype[Shape.types.BOX] = Ray.prototype.intersectBox;

/**
 * @method intersectPlane
 * @private
 * @param  {Shape} shape
 * @param  {Quaternion} quat
 * @param  {Vec3} position
 * @param  {Body} body
 */
Ray.prototype.intersectPlane = function(shape, quat, position, body){
    var from = this.from;
    var to = this.to;
    var direction = this._direction;

    // Get plane normal
    var worldNormal = new Vec3(0, 0, 1);
    quat.vmult(worldNormal, worldNormal);

    var len = new Vec3();
    from.vsub(position, len);
    var planeToFrom = len.dot(worldNormal);
    to.vsub(position, len);
    var planeToTo = len.dot(worldNormal);

    if(planeToFrom * planeToTo > 0){
        // "from" and "to" are on the same side of the plane... bail out
        return;
    }

    if(from.distanceTo(to) < planeToFrom){
        return;
    }

    var n_dot_dir = worldNormal.dot(direction);

    if (Math.abs(n_dot_dir) < this.precision) {
        // No intersection
        return;
    }

    var planePointToFrom = new Vec3();
    var dir_scaled_with_t = new Vec3();
    var hitPointWorld = new Vec3();

    from.vsub(position, planePointToFrom);
    var t = -worldNormal.dot(planePointToFrom) / n_dot_dir;
    direction.scale(t, dir_scaled_with_t);
    from.vadd(dir_scaled_with_t, hitPointWorld);

    this.reportIntersection(worldNormal, hitPointWorld, shape, body, -1);
};
Ray.prototype[Shape.types.PLANE] = Ray.prototype.intersectPlane;

/**
 * Get the world AABB of the ray.
 * @method getAABB
 * @param  {AABB} aabb
 */
Ray.prototype.getAABB = function(result){
    var to = this.to;
    var from = this.from;
    result.lowerBound.x = Math.min(to.x, from.x);
    result.lowerBound.y = Math.min(to.y, from.y);
    result.lowerBound.z = Math.min(to.z, from.z);
    result.upperBound.x = Math.max(to.x, from.x);
    result.upperBound.y = Math.max(to.y, from.y);
    result.upperBound.z = Math.max(to.z, from.z);
};

var intersectConvexOptions = {
    faceList: [0]
};

/**
 * @method intersectHeightfield
 * @private
 * @param  {Shape} shape
 * @param  {Quaternion} quat
 * @param  {Vec3} position
 * @param  {Body} body
 */
Ray.prototype.intersectHeightfield = function(shape, quat, position, body){
    var data = shape.data,
        w = shape.elementSize,
        worldPillarOffset = new Vec3();

    // Convert the ray to local heightfield coordinates
    var localRay = new Ray(this.from, this.to);
    Transform.pointToLocalFrame(position, quat, localRay.from, localRay.from);
    Transform.pointToLocalFrame(position, quat, localRay.to, localRay.to);

    // Get the index of the data points to test against
    var index = [];
    var iMinX = null;
    var iMinY = null;
    var iMaxX = null;
    var iMaxY = null;

    var inside = shape.getIndexOfPosition(localRay.from.x, localRay.from.y, index, false);
    if(inside){
        iMinX = index[0];
        iMinY = index[1];
        iMaxX = index[0];
        iMaxY = index[1];
    }
    inside = shape.getIndexOfPosition(localRay.to.x, localRay.to.y, index, false);
    if(inside){
        if (iMinX === null || index[0] < iMinX) { iMinX = index[0]; }
        if (iMaxX === null || index[0] > iMaxX) { iMaxX = index[0]; }
        if (iMinY === null || index[1] < iMinY) { iMinY = index[1]; }
        if (iMaxY === null || index[1] > iMaxY) { iMaxY = index[1]; }
    }

    if(iMinX === null){
        return;
    }

    var minMax = [];
    shape.getRectMinMax(iMinX, iMinY, iMaxX, iMaxY, minMax);
    var min = minMax[0];
    var max = minMax[1];

    // // Bail out if the ray can't touch the bounding box
    // // TODO
    // var aabb = new AABB();
    // this.getAABB(aabb);
    // if(aabb.intersects()){
    //     return;
    // }

    for(var i = iMinX; i <= iMaxX; i++){
        for(var j = iMinY; j <= iMaxY; j++){

            if(this.result._shouldStop){
                return;
            }

            // Lower triangle
            shape.getConvexTrianglePillar(i, j, false);
            Transform.pointToWorldFrame(position, quat, shape.pillarOffset, worldPillarOffset);
            this.intersectConvex(shape.pillarConvex, quat, worldPillarOffset, body, intersectConvexOptions);

            if(this.result._shouldStop){
                return;
            }

            // Upper triangle
            shape.getConvexTrianglePillar(i, j, true);
            Transform.pointToWorldFrame(position, quat, shape.pillarOffset, worldPillarOffset);
            this.intersectConvex(shape.pillarConvex, quat, worldPillarOffset, body, intersectConvexOptions);
        }
    }
};
Ray.prototype[Shape.types.HEIGHTFIELD] = Ray.prototype.intersectHeightfield;

var Ray_intersectSphere_intersectionPoint = new Vec3();
var Ray_intersectSphere_normal = new Vec3();

/**
 * @method intersectSphere
 * @private
 * @param  {Shape} shape
 * @param  {Quaternion} quat
 * @param  {Vec3} position
 * @param  {Body} body
 */
Ray.prototype.intersectSphere = function(shape, quat, position, body){
    var from = this.from,
        to = this.to,
        r = shape.radius;

    var a = Math.pow(to.x - from.x, 2) + Math.pow(to.y - from.y, 2) + Math.pow(to.z - from.z, 2);
    var b = 2 * ((to.x - from.x) * (from.x - position.x) + (to.y - from.y) * (from.y - position.y) + (to.z - from.z) * (from.z - position.z));
    var c = Math.pow(from.x - position.x, 2) + Math.pow(from.y - position.y, 2) + Math.pow(from.z - position.z, 2) - Math.pow(r, 2);

    var delta = Math.pow(b, 2) - 4 * a * c;

    var intersectionPoint = Ray_intersectSphere_intersectionPoint;
    var normal = Ray_intersectSphere_normal;

    if(delta < 0){
        // No intersection
        return;

    } else if(delta === 0){
        // single intersection point
        from.lerp(to, delta, intersectionPoint);

        intersectionPoint.vsub(position, normal);
        normal.normalize();

        this.reportIntersection(normal, intersectionPoint, shape, body, -1);

    } else {
        var d1 = (- b - Math.sqrt(delta)) / (2 * a);
        var d2 = (- b + Math.sqrt(delta)) / (2 * a);

        if(d1 >= 0 && d1 <= 1){
            from.lerp(to, d1, intersectionPoint);
            intersectionPoint.vsub(position, normal);
            normal.normalize();
            this.reportIntersection(normal, intersectionPoint, shape, body, -1);
        }

        if(this.result._shouldStop){
            return;
        }

        if(d2 >= 0 && d2 <= 1){
            from.lerp(to, d2, intersectionPoint);
            intersectionPoint.vsub(position, normal);
            normal.normalize();
            this.reportIntersection(normal, intersectionPoint, shape, body, -1);
        }
    }
};
Ray.prototype[Shape.types.SPHERE] = Ray.prototype.intersectSphere;


var intersectConvex_normal = new Vec3();
var intersectConvex_minDistNormal = new Vec3();
var intersectConvex_minDistIntersect = new Vec3();
var intersectConvex_vector = new Vec3();

/**
 * @method intersectConvex
 * @private
 * @param  {Shape} shape
 * @param  {Quaternion} quat
 * @param  {Vec3} position
 * @param  {Body} body
 * @param {object} [options]
 * @param {array} [options.faceList]
 */
Ray.prototype.intersectConvex = function intersectConvex(
    shape,
    quat,
    position,
    body,
    options
){
    var minDistNormal = intersectConvex_minDistNormal;
    var normal = intersectConvex_normal;
    var vector = intersectConvex_vector;
    var minDistIntersect = intersectConvex_minDistIntersect;
    var faceList = (options && options.faceList) || null;

    // Checking faces
    var faces = shape.faces,
        vertices = shape.vertices,
        normals = shape.faceNormals;
    var direction = this._direction;

    var from = this.from;
    var to = this.to;
    var fromToDistance = from.distanceTo(to);

    var minDist = -1;
    var Nfaces = faceList ? faceList.length : faces.length;
    var result = this.result;

    for (var j = 0; !result._shouldStop && j < Nfaces; j++) {
        var fi = faceList ? faceList[j] : j;

        var face = faces[fi];
        var faceNormal = normals[fi];
        var q = quat;
        var x = position;

        // determine if ray intersects the plane of the face
        // note: this works regardless of the direction of the face normal

        // Get plane point in world coordinates...
        vector.copy(vertices[face[0]]);
        q.vmult(vector,vector);
        vector.vadd(x,vector);

        // ...but make it relative to the ray from. We'll fix this later.
        vector.vsub(from,vector);

        // Get plane normal
        q.vmult(faceNormal,normal);

        // If this dot product is negative, we have something interesting
        var dot = direction.dot(normal);

        // Bail out if ray and plane are parallel
        if ( Math.abs( dot ) < this.precision ){
            continue;
        }

        // calc distance to plane
        var scalar = normal.dot(vector) / dot;

        // if negative distance, then plane is behind ray
        if (scalar < 0){
            continue;
        }

        // if (dot < 0) {

        // Intersection point is from + direction * scalar
        direction.mult(scalar,intersectPoint);
        intersectPoint.vadd(from,intersectPoint);

        // a is the point we compare points b and c with.
        a.copy(vertices[face[0]]);
        q.vmult(a,a);
        x.vadd(a,a);

        for(var i = 1; !result._shouldStop && i < face.length - 1; i++){
            // Transform 3 vertices to world coords
            b.copy(vertices[face[i]]);
            c.copy(vertices[face[i+1]]);
            q.vmult(b,b);
            q.vmult(c,c);
            x.vadd(b,b);
            x.vadd(c,c);

            var distance = intersectPoint.distanceTo(from);

            if(!(pointInTriangle(intersectPoint, a, b, c) || pointInTriangle(intersectPoint, b, a, c)) || distance > fromToDistance){
                continue;
            }

            this.reportIntersection(normal, intersectPoint, shape, body, fi);
        }
        // }
    }
};
Ray.prototype[Shape.types.CONVEXPOLYHEDRON] = Ray.prototype.intersectConvex;

var intersectTrimesh_normal = new Vec3();
var intersectTrimesh_localDirection = new Vec3();
var intersectTrimesh_localFrom = new Vec3();
var intersectTrimesh_localTo = new Vec3();
var intersectTrimesh_worldNormal = new Vec3();
var intersectTrimesh_worldIntersectPoint = new Vec3();
var intersectTrimesh_localAABB = new AABB();
var intersectTrimesh_triangles = [];
var intersectTrimesh_treeTransform = new Transform();

/**
 * @method intersectTrimesh
 * @private
 * @param  {Shape} shape
 * @param  {Quaternion} quat
 * @param  {Vec3} position
 * @param  {Body} body
 * @param {object} [options]
 * @todo Optimize by transforming the world to local space first.
 * @todo Use Octree lookup
 */
Ray.prototype.intersectTrimesh = function intersectTrimesh(
    mesh,
    quat,
    position,
    body,
    options
){
    var normal = intersectTrimesh_normal;
    var triangles = intersectTrimesh_triangles;
    var treeTransform = intersectTrimesh_treeTransform;
    var minDistNormal = intersectConvex_minDistNormal;
    var vector = intersectConvex_vector;
    var minDistIntersect = intersectConvex_minDistIntersect;
    var localAABB = intersectTrimesh_localAABB;
    var localDirection = intersectTrimesh_localDirection;
    var localFrom = intersectTrimesh_localFrom;
    var localTo = intersectTrimesh_localTo;
    var worldIntersectPoint = intersectTrimesh_worldIntersectPoint;
    var worldNormal = intersectTrimesh_worldNormal;
    var faceList = (options && options.faceList) || null;

    // Checking faces
    var indices = mesh.indices,
        vertices = mesh.vertices,
        normals = mesh.faceNormals;

    var from = this.from;
    var to = this.to;
    var direction = this._direction;

    var minDist = -1;
    treeTransform.position.copy(position);
    treeTransform.quaternion.copy(quat);

    // Transform ray to local space!
    Transform.vectorToLocalFrame(position, quat, direction, localDirection);
    //body.vectorToLocalFrame(direction, localDirection);
    Transform.pointToLocalFrame(position, quat, from, localFrom);
    //body.pointToLocalFrame(from, localFrom);
    Transform.pointToLocalFrame(position, quat, to, localTo);
    //body.pointToLocalFrame(to, localTo);
    var fromToDistanceSquared = localFrom.distanceSquared(localTo);

    mesh.tree.rayQuery(this, treeTransform, triangles);

    for (var i = 0, N = triangles.length; !this.result._shouldStop && i !== N; i++) {
        var trianglesIndex = triangles[i];

        mesh.getNormal(trianglesIndex, normal);

        // determine if ray intersects the plane of the face
        // note: this works regardless of the direction of the face normal

        // Get plane point in world coordinates...
        mesh.getVertex(indices[trianglesIndex * 3], a);

        // ...but make it relative to the ray from. We'll fix this later.
        a.vsub(localFrom,vector);

        // Get plane normal
        // quat.vmult(normal, normal);

        // If this dot product is negative, we have something interesting
        var dot = localDirection.dot(normal);

        // Bail out if ray and plane are parallel
        // if (Math.abs( dot ) < this.precision){
        //     continue;
        // }

        // calc distance to plane
        var scalar = normal.dot(vector) / dot;

        // if negative distance, then plane is behind ray
        if (scalar < 0){
            continue;
        }

        // Intersection point is from + direction * scalar
        localDirection.scale(scalar,intersectPoint);
        intersectPoint.vadd(localFrom,intersectPoint);

        // Get triangle vertices
        mesh.getVertex(indices[trianglesIndex * 3 + 1], b);
        mesh.getVertex(indices[trianglesIndex * 3 + 2], c);

        var squaredDistance = intersectPoint.distanceSquared(localFrom);

        if(!(pointInTriangle(intersectPoint, b, a, c) || pointInTriangle(intersectPoint, a, b, c)) || squaredDistance > fromToDistanceSquared){
            continue;
        }

        // transform intersectpoint and normal to world
        Transform.vectorToWorldFrame(quat, normal, worldNormal);
        //body.vectorToWorldFrame(normal, worldNormal);
        Transform.pointToWorldFrame(position, quat, intersectPoint, worldIntersectPoint);
        //body.pointToWorldFrame(intersectPoint, worldIntersectPoint);
        this.reportIntersection(worldNormal, worldIntersectPoint, mesh, body, trianglesIndex);
    }
    triangles.length = 0;
};
Ray.prototype[Shape.types.TRIMESH] = Ray.prototype.intersectTrimesh;


/**
 * @method reportIntersection
 * @private
 * @param  {Vec3} normal
 * @param  {Vec3} hitPointWorld
 * @param  {Shape} shape
 * @param  {Body} body
 * @return {boolean} True if the intersections should continue
 */
Ray.prototype.reportIntersection = function(normal, hitPointWorld, shape, body, hitFaceIndex){
    var from = this.from;
    var to = this.to;
    var distance = from.distanceTo(hitPointWorld);
    var result = this.result;

    // Skip back faces?
    if(this.skipBackfaces && normal.dot(this._direction) > 0){
        return;
    }

    result.hitFaceIndex = typeof(hitFaceIndex) !== 'undefined' ? hitFaceIndex : -1;

    switch(this.mode){
    case Ray.ALL:
        this.hasHit = true;
        result.set(
            from,
            to,
            normal,
            hitPointWorld,
            shape,
            body,
            distance
        );
        result.hasHit = true;
        this.callback(result);
        break;

    case Ray.CLOSEST:

        // Store if closer than current closest
        if(distance < result.distance || !result.hasHit){
            this.hasHit = true;
            result.hasHit = true;
            result.set(
                from,
                to,
                normal,
                hitPointWorld,
                shape,
                body,
                distance
            );
        }
        break;

    case Ray.ANY:

        // Report and stop.
        this.hasHit = true;
        result.hasHit = true;
        result.set(
            from,
            to,
            normal,
            hitPointWorld,
            shape,
            body,
            distance
        );
        result._shouldStop = true;
        break;
    }
};

var v0 = new Vec3(),
    intersect = new Vec3();
function distanceFromIntersection(from, direction, position) {

    // v0 is vector from from to position
    position.vsub(from,v0);
    var dot = v0.dot(direction);

    // intersect = direction*dot + from
    direction.mult(dot,intersect);
    intersect.vadd(from,intersect);

    var distance = position.distanceTo(intersect);

    return distance;
}


},{"../collision/AABB":3,"../collision/RaycastResult":10,"../math/Quaternion":28,"../math/Transform":29,"../math/Vec3":30,"../shapes/Box":37,"../shapes/ConvexPolyhedron":38,"../shapes/Shape":43}],10:[function(_dereq_,module,exports){
var Vec3 = _dereq_('../math/Vec3');

module.exports = RaycastResult;

/**
 * Storage for Ray casting data.
 * @class RaycastResult
 * @constructor
 */
function RaycastResult(){

	/**
	 * @property {Vec3} rayFromWorld
	 */
	this.rayFromWorld = new Vec3();

	/**
	 * @property {Vec3} rayToWorld
	 */
	this.rayToWorld = new Vec3();

	/**
	 * @property {Vec3} hitNormalWorld
	 */
	this.hitNormalWorld = new Vec3();

	/**
	 * @property {Vec3} hitPointWorld
	 */
	this.hitPointWorld = new Vec3();

	/**
	 * @property {boolean} hasHit
	 */
	this.hasHit = false;

	/**
	 * The hit shape, or null.
	 * @property {Shape} shape
	 */
	this.shape = null;

	/**
	 * The hit body, or null.
	 * @property {Body} body
	 */
	this.body = null;

	/**
	 * The index of the hit triangle, if the hit shape was a trimesh.
	 * @property {number} hitFaceIndex
	 * @default -1
	 */
	this.hitFaceIndex = -1;

	/**
	 * Distance to the hit. Will be set to -1 if there was no hit.
	 * @property {number} distance
	 * @default -1
	 */
	this.distance = -1;

	/**
	 * If the ray should stop traversing the bodies.
	 * @private
	 * @property {Boolean} _shouldStop
	 * @default false
	 */
	this._shouldStop = false;
}

/**
 * Reset all result data.
 * @method reset
 */
RaycastResult.prototype.reset = function () {
	this.rayFromWorld.setZero();
	this.rayToWorld.setZero();
	this.hitNormalWorld.setZero();
	this.hitPointWorld.setZero();
	this.hasHit = false;
	this.shape = null;
	this.body = null;
	this.hitFaceIndex = -1;
	this.distance = -1;
	this._shouldStop = false;
};

/**
 * @method abort
 */
RaycastResult.prototype.abort = function(){
	this._shouldStop = true;
};

/**
 * @method set
 * @param {Vec3} rayFromWorld
 * @param {Vec3} rayToWorld
 * @param {Vec3} hitNormalWorld
 * @param {Vec3} hitPointWorld
 * @param {Shape} shape
 * @param {Body} body
 * @param {number} distance
 */
RaycastResult.prototype.set = function(
	rayFromWorld,
	rayToWorld,
	hitNormalWorld,
	hitPointWorld,
	shape,
	body,
	distance
){
	this.rayFromWorld.copy(rayFromWorld);
	this.rayToWorld.copy(rayToWorld);
	this.hitNormalWorld.copy(hitNormalWorld);
	this.hitPointWorld.copy(hitPointWorld);
	this.shape = shape;
	this.body = body;
	this.distance = distance;
};
},{"../math/Vec3":30}],11:[function(_dereq_,module,exports){
var Shape = _dereq_('../shapes/Shape');
var Broadphase = _dereq_('../collision/Broadphase');

module.exports = SAPBroadphase;

/**
 * Sweep and prune broadphase along one axis.
 *
 * @class SAPBroadphase
 * @constructor
 * @param {World} [world]
 * @extends Broadphase
 */
function SAPBroadphase(world){
    Broadphase.apply(this);

    /**
     * List of bodies currently in the broadphase.
     * @property axisList
     * @type {Array}
     */
    this.axisList = [];

    /**
     * The world to search in.
     * @property world
     * @type {World}
     */
    this.world = null;

    /**
     * Axis to sort the bodies along. Set to 0 for x axis, and 1 for y axis. For best performance, choose an axis that the bodies are spread out more on.
     * @property axisIndex
     * @type {Number}
     */
    this.axisIndex = 0;

    var axisList = this.axisList;

    this._addBodyHandler = function(e){
        axisList.push(e.body);
    };

    this._removeBodyHandler = function(e){
        var idx = axisList.indexOf(e.body);
        if(idx !== -1){
            axisList.splice(idx,1);
        }
    };

    if(world){
        this.setWorld(world);
    }
}
SAPBroadphase.prototype = new Broadphase();

/**
 * Change the world
 * @method setWorld
 * @param  {World} world
 */
SAPBroadphase.prototype.setWorld = function(world){
    // Clear the old axis array
    this.axisList.length = 0;

    // Add all bodies from the new world
    for(var i=0; i<world.bodies.length; i++){
        this.axisList.push(world.bodies[i]);
    }

    // Remove old handlers, if any
    world.removeEventListener("addBody", this._addBodyHandler);
    world.removeEventListener("removeBody", this._removeBodyHandler);

    // Add handlers to update the list of bodies.
    world.addEventListener("addBody", this._addBodyHandler);
    world.addEventListener("removeBody", this._removeBodyHandler);

    this.world = world;
    this.dirty = true;
};

/**
 * @static
 * @method insertionSortX
 * @param  {Array} a
 * @return {Array}
 */
SAPBroadphase.insertionSortX = function(a) {
    for(var i=1,l=a.length;i<l;i++) {
        var v = a[i];
        for(var j=i - 1;j>=0;j--) {
            if(a[j].aabb.lowerBound.x <= v.aabb.lowerBound.x){
                break;
            }
            a[j+1] = a[j];
        }
        a[j+1] = v;
    }
    return a;
};

/**
 * @static
 * @method insertionSortY
 * @param  {Array} a
 * @return {Array}
 */
SAPBroadphase.insertionSortY = function(a) {
    for(var i=1,l=a.length;i<l;i++) {
        var v = a[i];
        for(var j=i - 1;j>=0;j--) {
            if(a[j].aabb.lowerBound.y <= v.aabb.lowerBound.y){
                break;
            }
            a[j+1] = a[j];
        }
        a[j+1] = v;
    }
    return a;
};

/**
 * @static
 * @method insertionSortZ
 * @param  {Array} a
 * @return {Array}
 */
SAPBroadphase.insertionSortZ = function(a) {
    for(var i=1,l=a.length;i<l;i++) {
        var v = a[i];
        for(var j=i - 1;j>=0;j--) {
            if(a[j].aabb.lowerBound.z <= v.aabb.lowerBound.z){
                break;
            }
            a[j+1] = a[j];
        }
        a[j+1] = v;
    }
    return a;
};

/**
 * Collect all collision pairs
 * @method collisionPairs
 * @param  {World} world
 * @param  {Array} p1
 * @param  {Array} p2
 */
SAPBroadphase.prototype.collisionPairs = function(world,p1,p2){
    var bodies = this.axisList,
        N = bodies.length,
        axisIndex = this.axisIndex,
        i, j;

    if(this.dirty){
        this.sortList();
        this.dirty = false;
    }

    // Look through the list
    for(i=0; i !== N; i++){
        var bi = bodies[i];

        for(j=i+1; j < N; j++){
            var bj = bodies[j];

            if(!this.needBroadphaseCollision(bi,bj)){
                continue;
            }

            if(!SAPBroadphase.checkBounds(bi,bj,axisIndex)){
                break;
            }

            this.intersectionTest(bi,bj,p1,p2);
        }
    }
};

SAPBroadphase.prototype.sortList = function(){
    var axisList = this.axisList;
    var axisIndex = this.axisIndex;
    var N = axisList.length;

    // Update AABBs
    for(var i = 0; i!==N; i++){
        var bi = axisList[i];
        if(bi.aabbNeedsUpdate){
            bi.computeAABB();
        }
    }

    // Sort the list
    if(axisIndex === 0){
        SAPBroadphase.insertionSortX(axisList);
    } else if(axisIndex === 1){
        SAPBroadphase.insertionSortY(axisList);
    } else if(axisIndex === 2){
        SAPBroadphase.insertionSortZ(axisList);
    }
};

/**
 * Check if the bounds of two bodies overlap, along the given SAP axis.
 * @static
 * @method checkBounds
 * @param  {Body} bi
 * @param  {Body} bj
 * @param  {Number} axisIndex
 * @return {Boolean}
 */
SAPBroadphase.checkBounds = function(bi, bj, axisIndex){
    var biPos;
    var bjPos;

    if(axisIndex === 0){
        biPos = bi.position.x;
        bjPos = bj.position.x;
    } else if(axisIndex === 1){
        biPos = bi.position.y;
        bjPos = bj.position.y;
    } else if(axisIndex === 2){
        biPos = bi.position.z;
        bjPos = bj.position.z;
    }

    var ri = bi.boundingRadius,
        rj = bj.boundingRadius,
        boundA1 = biPos - ri,
        boundA2 = biPos + ri,
        boundB1 = bjPos - rj,
        boundB2 = bjPos + rj;

    return boundB1 < boundA2;
};

/**
 * Computes the variance of the body positions and estimates the best
 * axis to use. Will automatically set property .axisIndex.
 * @method autoDetectAxis
 */
SAPBroadphase.prototype.autoDetectAxis = function(){
    var sumX=0,
        sumX2=0,
        sumY=0,
        sumY2=0,
        sumZ=0,
        sumZ2=0,
        bodies = this.axisList,
        N = bodies.length,
        invN=1/N;

    for(var i=0; i!==N; i++){
        var b = bodies[i];

        var centerX = b.position.x;
        sumX += centerX;
        sumX2 += centerX*centerX;

        var centerY = b.position.y;
        sumY += centerY;
        sumY2 += centerY*centerY;

        var centerZ = b.position.z;
        sumZ += centerZ;
        sumZ2 += centerZ*centerZ;
    }

    var varianceX = sumX2 - sumX*sumX*invN,
        varianceY = sumY2 - sumY*sumY*invN,
        varianceZ = sumZ2 - sumZ*sumZ*invN;

    if(varianceX > varianceY){
        if(varianceX > varianceZ){
            this.axisIndex = 0;
        } else{
            this.axisIndex = 2;
        }
    } else if(varianceY > varianceZ){
        this.axisIndex = 1;
    } else{
        this.axisIndex = 2;
    }
};

/**
 * Returns all the bodies within an AABB.
 * @method aabbQuery
 * @param  {World} world
 * @param  {AABB} aabb
 * @param {array} result An array to store resulting bodies in.
 * @return {array}
 */
SAPBroadphase.prototype.aabbQuery = function(world, aabb, result){
    result = result || [];

    if(this.dirty){
        this.sortList();
        this.dirty = false;
    }

    var axisIndex = this.axisIndex, axis = 'x';
    if(axisIndex === 1){ axis = 'y'; }
    if(axisIndex === 2){ axis = 'z'; }

    var axisList = this.axisList;
    var lower = aabb.lowerBound[axis];
    var upper = aabb.upperBound[axis];
    for(var i = 0; i < axisList.length; i++){
        var b = axisList[i];

        if(b.aabbNeedsUpdate){
            b.computeAABB();
        }

        if(b.aabb.overlaps(aabb)){
            result.push(b);
        }
    }

    return result;
};
},{"../collision/Broadphase":5,"../shapes/Shape":43}],12:[function(_dereq_,module,exports){
module.exports = ConeTwistConstraint;

var Constraint = _dereq_('./Constraint');
var PointToPointConstraint = _dereq_('./PointToPointConstraint');
var ConeEquation = _dereq_('../equations/ConeEquation');
var RotationalEquation = _dereq_('../equations/RotationalEquation');
var ContactEquation = _dereq_('../equations/ContactEquation');
var Vec3 = _dereq_('../math/Vec3');

/**
 * @class ConeTwistConstraint
 * @constructor
 * @author schteppe
 * @param {Body} bodyA
 * @param {Body} bodyB
 * @param {object} [options]
 * @param {Vec3} [options.pivotA]
 * @param {Vec3} [options.pivotB]
 * @param {Vec3} [options.axisA]
 * @param {Vec3} [options.axisB]
 * @param {Number} [options.maxForce=1e6]
 * @extends PointToPointConstraint
 */
function ConeTwistConstraint(bodyA, bodyB, options){
    options = options || {};
    var maxForce = typeof(options.maxForce) !== 'undefined' ? options.maxForce : 1e6;

    // Set pivot point in between
    var pivotA = options.pivotA ? options.pivotA.clone() : new Vec3();
    var pivotB = options.pivotB ? options.pivotB.clone() : new Vec3();
    this.axisA = options.axisA ? options.axisA.clone() : new Vec3();
    this.axisB = options.axisB ? options.axisB.clone() : new Vec3();

    PointToPointConstraint.call(this, bodyA, pivotA, bodyB, pivotB, maxForce);

    this.collideConnected = !!options.collideConnected;

    this.angle = typeof(options.angle) !== 'undefined' ? options.angle : 0;

    /**
     * @property {ConeEquation} coneEquation
     */
    var c = this.coneEquation = new ConeEquation(bodyA,bodyB,options);

    /**
     * @property {RotationalEquation} twistEquation
     */
    var t = this.twistEquation = new RotationalEquation(bodyA,bodyB,options);
    this.twistAngle = typeof(options.twistAngle) !== 'undefined' ? options.twistAngle : 0;

    // Make the cone equation push the bodies toward the cone axis, not outward
    c.maxForce = 0;
    c.minForce = -maxForce;

    // Make the twist equation add torque toward the initial position
    t.maxForce = 0;
    t.minForce = -maxForce;

    this.equations.push(c, t);
}
ConeTwistConstraint.prototype = new PointToPointConstraint();
ConeTwistConstraint.constructor = ConeTwistConstraint;

var ConeTwistConstraint_update_tmpVec1 = new Vec3();
var ConeTwistConstraint_update_tmpVec2 = new Vec3();

ConeTwistConstraint.prototype.update = function(){
    var bodyA = this.bodyA,
        bodyB = this.bodyB,
        cone = this.coneEquation,
        twist = this.twistEquation;

    PointToPointConstraint.prototype.update.call(this);

    // Update the axes to the cone constraint
    bodyA.vectorToWorldFrame(this.axisA, cone.axisA);
    bodyB.vectorToWorldFrame(this.axisB, cone.axisB);

    // Update the world axes in the twist constraint
    this.axisA.tangents(twist.axisA, twist.axisA);
    bodyA.vectorToWorldFrame(twist.axisA, twist.axisA);

    this.axisB.tangents(twist.axisB, twist.axisB);
    bodyB.vectorToWorldFrame(twist.axisB, twist.axisB);

    cone.angle = this.angle;
    twist.maxAngle = this.twistAngle;
};


},{"../equations/ConeEquation":18,"../equations/ContactEquation":19,"../equations/RotationalEquation":22,"../math/Vec3":30,"./Constraint":13,"./PointToPointConstraint":17}],13:[function(_dereq_,module,exports){
module.exports = Constraint;

var Utils = _dereq_('../utils/Utils');

/**
 * Constraint base class
 * @class Constraint
 * @author schteppe
 * @constructor
 * @param {Body} bodyA
 * @param {Body} bodyB
 * @param {object} [options]
 * @param {boolean} [options.collideConnected=true]
 * @param {boolean} [options.wakeUpBodies=true]
 */
function Constraint(bodyA, bodyB, options){
    options = Utils.defaults(options,{
        collideConnected : true,
        wakeUpBodies : true,
    });

    /**
     * Equations to be solved in this constraint
     * @property equations
     * @type {Array}
     */
    this.equations = [];

    /**
     * @property {Body} bodyA
     */
    this.bodyA = bodyA;

    /**
     * @property {Body} bodyB
     */
    this.bodyB = bodyB;

    /**
     * @property {Number} id
     */
    this.id = Constraint.idCounter++;

    /**
     * Set to true if you want the bodies to collide when they are connected.
     * @property collideConnected
     * @type {boolean}
     */
    this.collideConnected = options.collideConnected;

    if(options.wakeUpBodies){
        if(bodyA){
            bodyA.wakeUp();
        }
        if(bodyB){
            bodyB.wakeUp();
        }
    }
}

/**
 * Update all the equations with data.
 * @method update
 */
Constraint.prototype.update = function(){
    throw new Error("method update() not implmemented in this Constraint subclass!");
};

/**
 * Enables all equations in the constraint.
 * @method enable
 */
Constraint.prototype.enable = function(){
    var eqs = this.equations;
    for(var i=0; i<eqs.length; i++){
        eqs[i].enabled = true;
    }
};

/**
 * Disables all equations in the constraint.
 * @method disable
 */
Constraint.prototype.disable = function(){
    var eqs = this.equations;
    for(var i=0; i<eqs.length; i++){
        eqs[i].enabled = false;
    }
};

Constraint.idCounter = 0;

},{"../utils/Utils":53}],14:[function(_dereq_,module,exports){
module.exports = DistanceConstraint;

var Constraint = _dereq_('./Constraint');
var ContactEquation = _dereq_('../equations/ContactEquation');

/**
 * Constrains two bodies to be at a constant distance from each others center of mass.
 * @class DistanceConstraint
 * @constructor
 * @author schteppe
 * @param {Body} bodyA
 * @param {Body} bodyB
 * @param {Number} [distance] The distance to keep. If undefined, it will be set to the current distance between bodyA and bodyB
 * @param {Number} [maxForce=1e6]
 * @extends Constraint
 */
function DistanceConstraint(bodyA,bodyB,distance,maxForce){
    Constraint.call(this,bodyA,bodyB);

    if(typeof(distance)==="undefined") {
        distance = bodyA.position.distanceTo(bodyB.position);
    }

    if(typeof(maxForce)==="undefined") {
        maxForce = 1e6;
    }

    /**
     * @property {number} distance
     */
    this.distance = distance;

    /**
     * @property {ContactEquation} distanceEquation
     */
    var eq = this.distanceEquation = new ContactEquation(bodyA, bodyB);
    this.equations.push(eq);

    // Make it bidirectional
    eq.minForce = -maxForce;
    eq.maxForce =  maxForce;
}
DistanceConstraint.prototype = new Constraint();

DistanceConstraint.prototype.update = function(){
    var bodyA = this.bodyA;
    var bodyB = this.bodyB;
    var eq = this.distanceEquation;
    var halfDist = this.distance * 0.5;
    var normal = eq.ni;

    bodyB.position.vsub(bodyA.position, normal);
    normal.normalize();
    normal.mult(halfDist, eq.ri);
    normal.mult(-halfDist, eq.rj);
};
},{"../equations/ContactEquation":19,"./Constraint":13}],15:[function(_dereq_,module,exports){
module.exports = HingeConstraint;

var Constraint = _dereq_('./Constraint');
var PointToPointConstraint = _dereq_('./PointToPointConstraint');
var RotationalEquation = _dereq_('../equations/RotationalEquation');
var RotationalMotorEquation = _dereq_('../equations/RotationalMotorEquation');
var ContactEquation = _dereq_('../equations/ContactEquation');
var Vec3 = _dereq_('../math/Vec3');

/**
 * Hinge constraint. Think of it as a door hinge. It tries to keep the door in the correct place and with the correct orientation.
 * @class HingeConstraint
 * @constructor
 * @author schteppe
 * @param {Body} bodyA
 * @param {Body} bodyB
 * @param {object} [options]
 * @param {Vec3} [options.pivotA] A point defined locally in bodyA. This defines the offset of axisA.
 * @param {Vec3} [options.axisA] An axis that bodyA can rotate around, defined locally in bodyA.
 * @param {Vec3} [options.pivotB]
 * @param {Vec3} [options.axisB]
 * @param {Number} [options.maxForce=1e6]
 * @extends PointToPointConstraint
 */
function HingeConstraint(bodyA, bodyB, options){
    options = options || {};
    var maxForce = typeof(options.maxForce) !== 'undefined' ? options.maxForce : 1e6;
    var pivotA = options.pivotA ? options.pivotA.clone() : new Vec3();
    var pivotB = options.pivotB ? options.pivotB.clone() : new Vec3();

    PointToPointConstraint.call(this, bodyA, pivotA, bodyB, pivotB, maxForce);

    /**
     * Rotation axis, defined locally in bodyA.
     * @property {Vec3} axisA
     */
    var axisA = this.axisA = options.axisA ? options.axisA.clone() : new Vec3(1,0,0);
    axisA.normalize();

    /**
     * Rotation axis, defined locally in bodyB.
     * @property {Vec3} axisB
     */
    var axisB = this.axisB = options.axisB ? options.axisB.clone() : new Vec3(1,0,0);
    axisB.normalize();

    /**
     * @property {RotationalEquation} rotationalEquation1
     */
    var r1 = this.rotationalEquation1 = new RotationalEquation(bodyA,bodyB,options);

    /**
     * @property {RotationalEquation} rotationalEquation2
     */
    var r2 = this.rotationalEquation2 = new RotationalEquation(bodyA,bodyB,options);

    /**
     * @property {RotationalMotorEquation} motorEquation
     */
    var motor = this.motorEquation = new RotationalMotorEquation(bodyA,bodyB,maxForce);
    motor.enabled = false; // Not enabled by default

    // Equations to be fed to the solver
    this.equations.push(
        r1, // rotational1
        r2, // rotational2
        motor
    );
}
HingeConstraint.prototype = new PointToPointConstraint();
HingeConstraint.constructor = HingeConstraint;

/**
 * @method enableMotor
 */
HingeConstraint.prototype.enableMotor = function(){
    this.motorEquation.enabled = true;
};

/**
 * @method disableMotor
 */
HingeConstraint.prototype.disableMotor = function(){
    this.motorEquation.enabled = false;
};

/**
 * @method setMotorSpeed
 * @param {number} speed
 */
HingeConstraint.prototype.setMotorSpeed = function(speed){
    this.motorEquation.targetVelocity = speed;
};

/**
 * @method setMotorMaxForce
 * @param {number} maxForce
 */
HingeConstraint.prototype.setMotorMaxForce = function(maxForce){
    this.motorEquation.maxForce = maxForce;
    this.motorEquation.minForce = -maxForce;
};

var HingeConstraint_update_tmpVec1 = new Vec3();
var HingeConstraint_update_tmpVec2 = new Vec3();

HingeConstraint.prototype.update = function(){
    var bodyA = this.bodyA,
        bodyB = this.bodyB,
        motor = this.motorEquation,
        r1 = this.rotationalEquation1,
        r2 = this.rotationalEquation2,
        worldAxisA = HingeConstraint_update_tmpVec1,
        worldAxisB = HingeConstraint_update_tmpVec2;

    var axisA = this.axisA;
    var axisB = this.axisB;

    PointToPointConstraint.prototype.update.call(this);

    // Get world axes
    bodyA.quaternion.vmult(axisA, worldAxisA);
    bodyB.quaternion.vmult(axisB, worldAxisB);

    worldAxisA.tangents(r1.axisA, r2.axisA);
    r1.axisB.copy(worldAxisB);
    r2.axisB.copy(worldAxisB);

    if(this.motorEquation.enabled){
        bodyA.quaternion.vmult(this.axisA, motor.axisA);
        bodyB.quaternion.vmult(this.axisB, motor.axisB);
    }
};


},{"../equations/ContactEquation":19,"../equations/RotationalEquation":22,"../equations/RotationalMotorEquation":23,"../math/Vec3":30,"./Constraint":13,"./PointToPointConstraint":17}],16:[function(_dereq_,module,exports){
module.exports = LockConstraint;

var Constraint = _dereq_('./Constraint');
var PointToPointConstraint = _dereq_('./PointToPointConstraint');
var RotationalEquation = _dereq_('../equations/RotationalEquation');
var RotationalMotorEquation = _dereq_('../equations/RotationalMotorEquation');
var ContactEquation = _dereq_('../equations/ContactEquation');
var Vec3 = _dereq_('../math/Vec3');

/**
 * Lock constraint. Will remove all degrees of freedom between the bodies.
 * @class LockConstraint
 * @constructor
 * @author schteppe
 * @param {Body} bodyA
 * @param {Body} bodyB
 * @param {object} [options]
 * @param {Number} [options.maxForce=1e6]
 * @extends PointToPointConstraint
 */
function LockConstraint(bodyA, bodyB, options){
    options = options || {};
    var maxForce = typeof(options.maxForce) !== 'undefined' ? options.maxForce : 1e6;

    // Set pivot point in between
    var pivotA = new Vec3();
    var pivotB = new Vec3();
    var halfWay = new Vec3();
    bodyA.position.vadd(bodyB.position, halfWay);
    halfWay.scale(0.5, halfWay);
    bodyB.pointToLocalFrame(halfWay, pivotB);
    bodyA.pointToLocalFrame(halfWay, pivotA);
    PointToPointConstraint.call(this, bodyA, pivotA, bodyB, pivotB, maxForce);

    /**
     * @property {RotationalEquation} rotationalEquation1
     */
    var r1 = this.rotationalEquation1 = new RotationalEquation(bodyA,bodyB,options);

    /**
     * @property {RotationalEquation} rotationalEquation2
     */
    var r2 = this.rotationalEquation2 = new RotationalEquation(bodyA,bodyB,options);

    /**
     * @property {RotationalEquation} rotationalEquation3
     */
    var r3 = this.rotationalEquation3 = new RotationalEquation(bodyA,bodyB,options);

    this.equations.push(r1, r2, r3);
}
LockConstraint.prototype = new PointToPointConstraint();
LockConstraint.constructor = LockConstraint;

var LockConstraint_update_tmpVec1 = new Vec3();
var LockConstraint_update_tmpVec2 = new Vec3();

LockConstraint.prototype.update = function(){
    var bodyA = this.bodyA,
        bodyB = this.bodyB,
        motor = this.motorEquation,
        r1 = this.rotationalEquation1,
        r2 = this.rotationalEquation2,
        r3 = this.rotationalEquation3,
        worldAxisA = LockConstraint_update_tmpVec1,
        worldAxisB = LockConstraint_update_tmpVec2;

    PointToPointConstraint.prototype.update.call(this);

    bodyA.vectorToWorldFrame(Vec3.UNIT_X, r1.axisA);
    bodyB.vectorToWorldFrame(Vec3.UNIT_Y, r1.axisB);

    bodyA.vectorToWorldFrame(Vec3.UNIT_Y, r2.axisA);
    bodyB.vectorToWorldFrame(Vec3.UNIT_Z, r2.axisB);

    bodyA.vectorToWorldFrame(Vec3.UNIT_Z, r3.axisA);
    bodyB.vectorToWorldFrame(Vec3.UNIT_X, r3.axisB);
};


},{"../equations/ContactEquation":19,"../equations/RotationalEquation":22,"../equations/RotationalMotorEquation":23,"../math/Vec3":30,"./Constraint":13,"./PointToPointConstraint":17}],17:[function(_dereq_,module,exports){
module.exports = PointToPointConstraint;

var Constraint = _dereq_('./Constraint');
var ContactEquation = _dereq_('../equations/ContactEquation');
var Vec3 = _dereq_('../math/Vec3');

/**
 * Connects two bodies at given offset points.
 * @class PointToPointConstraint
 * @extends Constraint
 * @constructor
 * @param {Body} bodyA
 * @param {Vec3} pivotA The point relative to the center of mass of bodyA which bodyA is constrained to.
 * @param {Body} bodyB Body that will be constrained in a similar way to the same point as bodyA. We will therefore get a link between bodyA and bodyB. If not specified, bodyA will be constrained to a static point.
 * @param {Vec3} pivotB See pivotA.
 * @param {Number} maxForce The maximum force that should be applied to constrain the bodies.
 *
 * @example
 *     var bodyA = new Body({ mass: 1 });
 *     var bodyB = new Body({ mass: 1 });
 *     bodyA.position.set(-1, 0, 0);
 *     bodyB.position.set(1, 0, 0);
 *     bodyA.addShape(shapeA);
 *     bodyB.addShape(shapeB);
 *     world.addBody(bodyA);
 *     world.addBody(bodyB);
 *     var localPivotA = new Vec3(1, 0, 0);
 *     var localPivotB = new Vec3(-1, 0, 0);
 *     var constraint = new PointToPointConstraint(bodyA, localPivotA, bodyB, localPivotB);
 *     world.addConstraint(constraint);
 */
function PointToPointConstraint(bodyA,pivotA,bodyB,pivotB,maxForce){
    Constraint.call(this,bodyA,bodyB);

    maxForce = typeof(maxForce) !== 'undefined' ? maxForce : 1e6;

    /**
     * Pivot, defined locally in bodyA.
     * @property {Vec3} pivotA
     */
    this.pivotA = pivotA ? pivotA.clone() : new Vec3();

    /**
     * Pivot, defined locally in bodyB.
     * @property {Vec3} pivotB
     */
    this.pivotB = pivotB ? pivotB.clone() : new Vec3();

    /**
     * @property {ContactEquation} equationX
     */
    var x = this.equationX = new ContactEquation(bodyA,bodyB);

    /**
     * @property {ContactEquation} equationY
     */
    var y = this.equationY = new ContactEquation(bodyA,bodyB);

    /**
     * @property {ContactEquation} equationZ
     */
    var z = this.equationZ = new ContactEquation(bodyA,bodyB);

    // Equations to be fed to the solver
    this.equations.push(x, y, z);

    // Make the equations bidirectional
    x.minForce = y.minForce = z.minForce = -maxForce;
    x.maxForce = y.maxForce = z.maxForce =  maxForce;

    x.ni.set(1, 0, 0);
    y.ni.set(0, 1, 0);
    z.ni.set(0, 0, 1);
}
PointToPointConstraint.prototype = new Constraint();

PointToPointConstraint.prototype.update = function(){
    var bodyA = this.bodyA;
    var bodyB = this.bodyB;
    var x = this.equationX;
    var y = this.equationY;
    var z = this.equationZ;

    // Rotate the pivots to world space
    bodyA.quaternion.vmult(this.pivotA,x.ri);
    bodyB.quaternion.vmult(this.pivotB,x.rj);

    y.ri.copy(x.ri);
    y.rj.copy(x.rj);
    z.ri.copy(x.ri);
    z.rj.copy(x.rj);
};
},{"../equations/ContactEquation":19,"../math/Vec3":30,"./Constraint":13}],18:[function(_dereq_,module,exports){
module.exports = ConeEquation;

var Vec3 = _dereq_('../math/Vec3');
var Mat3 = _dereq_('../math/Mat3');
var Equation = _dereq_('./Equation');

/**
 * Cone equation. Works to keep the given body world vectors aligned, or tilted within a given angle from each other.
 * @class ConeEquation
 * @constructor
 * @author schteppe
 * @param {Body} bodyA
 * @param {Body} bodyB
 * @param {Vec3} [options.axisA] Local axis in A
 * @param {Vec3} [options.axisB] Local axis in B
 * @param {Vec3} [options.angle] The "cone angle" to keep
 * @param {number} [options.maxForce=1e6]
 * @extends Equation
 */
function ConeEquation(bodyA, bodyB, options){
    options = options || {};
    var maxForce = typeof(options.maxForce) !== 'undefined' ? options.maxForce : 1e6;

    Equation.call(this,bodyA,bodyB,-maxForce, maxForce);

    this.axisA = options.axisA ? options.axisA.clone() : new Vec3(1, 0, 0);
    this.axisB = options.axisB ? options.axisB.clone() : new Vec3(0, 1, 0);

    /**
     * The cone angle to keep
     * @property {number} angle
     */
    this.angle = typeof(options.angle) !== 'undefined' ? options.angle : 0;
}

ConeEquation.prototype = new Equation();
ConeEquation.prototype.constructor = ConeEquation;

var tmpVec1 = new Vec3();
var tmpVec2 = new Vec3();

ConeEquation.prototype.computeB = function(h){
    var a = this.a,
        b = this.b,

        ni = this.axisA,
        nj = this.axisB,

        nixnj = tmpVec1,
        njxni = tmpVec2,

        GA = this.jacobianElementA,
        GB = this.jacobianElementB;

    // Caluclate cross products
    ni.cross(nj, nixnj);
    nj.cross(ni, njxni);

    // The angle between two vector is:
    // cos(theta) = a * b / (length(a) * length(b) = { len(a) = len(b) = 1 } = a * b

    // g = a * b
    // gdot = (b x a) * wi + (a x b) * wj
    // G = [0 bxa 0 axb]
    // W = [vi wi vj wj]
    GA.rotational.copy(njxni);
    GB.rotational.copy(nixnj);

    var g = Math.cos(this.angle) - ni.dot(nj),
        GW = this.computeGW(),
        GiMf = this.computeGiMf();

    var B = - g * a - GW * b - h * GiMf;

    return B;
};


},{"../math/Mat3":27,"../math/Vec3":30,"./Equation":20}],19:[function(_dereq_,module,exports){
module.exports = ContactEquation;

var Equation = _dereq_('./Equation');
var Vec3 = _dereq_('../math/Vec3');
var Mat3 = _dereq_('../math/Mat3');

/**
 * Contact/non-penetration constraint equation
 * @class ContactEquation
 * @constructor
 * @author schteppe
 * @param {Body} bodyA
 * @param {Body} bodyB
 * @extends Equation
 */
function ContactEquation(bodyA, bodyB, maxForce){
    maxForce = typeof(maxForce) !== 'undefined' ? maxForce : 1e6;
    Equation.call(this, bodyA, bodyB, 0, maxForce);

    /**
     * @property restitution
     * @type {Number}
     */
    this.restitution = 0.0; // "bounciness": u1 = -e*u0

    /**
     * World-oriented vector that goes from the center of bi to the contact point.
     * @property {Vec3} ri
     */
    this.ri = new Vec3();

    /**
     * World-oriented vector that starts in body j position and goes to the contact point.
     * @property {Vec3} rj
     */
    this.rj = new Vec3();

    /**
     * Contact normal, pointing out of body i.
     * @property {Vec3} ni
     */
    this.ni = new Vec3();
}

ContactEquation.prototype = new Equation();
ContactEquation.prototype.constructor = ContactEquation;

var ContactEquation_computeB_temp1 = new Vec3(); // Temp vectors
var ContactEquation_computeB_temp2 = new Vec3();
var ContactEquation_computeB_temp3 = new Vec3();
ContactEquation.prototype.computeB = function(h){
    var a = this.a,
        b = this.b,
        bi = this.bi,
        bj = this.bj,
        ri = this.ri,
        rj = this.rj,
        rixn = ContactEquation_computeB_temp1,
        rjxn = ContactEquation_computeB_temp2,

        vi = bi.velocity,
        wi = bi.angularVelocity,
        fi = bi.force,
        taui = bi.torque,

        vj = bj.velocity,
        wj = bj.angularVelocity,
        fj = bj.force,
        tauj = bj.torque,

        penetrationVec = ContactEquation_computeB_temp3,

        GA = this.jacobianElementA,
        GB = this.jacobianElementB,

        n = this.ni;

    // Caluclate cross products
    ri.cross(n,rixn);
    rj.cross(n,rjxn);

    // g = xj+rj -(xi+ri)
    // G = [ -ni  -rixn  ni  rjxn ]
    n.negate(GA.spatial);
    rixn.negate(GA.rotational);
    GB.spatial.copy(n);
    GB.rotational.copy(rjxn);

    // Calculate the penetration vector
    penetrationVec.copy(bj.position);
    penetrationVec.vadd(rj,penetrationVec);
    penetrationVec.vsub(bi.position,penetrationVec);
    penetrationVec.vsub(ri,penetrationVec);

    var g = n.dot(penetrationVec);

    // Compute iteration
    var ePlusOne = this.restitution + 1;
    var GW = ePlusOne * vj.dot(n) - ePlusOne * vi.dot(n) + wj.dot(rjxn) - wi.dot(rixn);
    var GiMf = this.computeGiMf();

    var B = - g * a - GW * b - h*GiMf;

    return B;
};

var ContactEquation_getImpactVelocityAlongNormal_vi = new Vec3();
var ContactEquation_getImpactVelocityAlongNormal_vj = new Vec3();
var ContactEquation_getImpactVelocityAlongNormal_xi = new Vec3();
var ContactEquation_getImpactVelocityAlongNormal_xj = new Vec3();
var ContactEquation_getImpactVelocityAlongNormal_relVel = new Vec3();

/**
 * Get the current relative velocity in the contact point.
 * @method getImpactVelocityAlongNormal
 * @return {number}
 */
ContactEquation.prototype.getImpactVelocityAlongNormal = function(){
    var vi = ContactEquation_getImpactVelocityAlongNormal_vi;
    var vj = ContactEquation_getImpactVelocityAlongNormal_vj;
    var xi = ContactEquation_getImpactVelocityAlongNormal_xi;
    var xj = ContactEquation_getImpactVelocityAlongNormal_xj;
    var relVel = ContactEquation_getImpactVelocityAlongNormal_relVel;

    this.bi.position.vadd(this.ri, xi);
    this.bj.position.vadd(this.rj, xj);

    this.bi.getVelocityAtWorldPoint(xi, vi);
    this.bj.getVelocityAtWorldPoint(xj, vj);

    vi.vsub(vj, relVel);

    return this.ni.dot(relVel);
};


},{"../math/Mat3":27,"../math/Vec3":30,"./Equation":20}],20:[function(_dereq_,module,exports){
module.exports = Equation;

var JacobianElement = _dereq_('../math/JacobianElement'),
    Vec3 = _dereq_('../math/Vec3');

/**
 * Equation base class
 * @class Equation
 * @constructor
 * @author schteppe
 * @param {Body} bi
 * @param {Body} bj
 * @param {Number} minForce Minimum (read: negative max) force to be applied by the constraint.
 * @param {Number} maxForce Maximum (read: positive max) force to be applied by the constraint.
 */
function Equation(bi,bj,minForce,maxForce){
    this.id = Equation.id++;

    /**
     * @property {number} minForce
     */
    this.minForce = typeof(minForce)==="undefined" ? -1e6 : minForce;

    /**
     * @property {number} maxForce
     */
    this.maxForce = typeof(maxForce)==="undefined" ? 1e6 : maxForce;

    /**
     * @property bi
     * @type {Body}
     */
    this.bi = bi;

    /**
     * @property bj
     * @type {Body}
     */
    this.bj = bj;

    /**
     * SPOOK parameter
     * @property {number} a
     */
    this.a = 0.0;

    /**
     * SPOOK parameter
     * @property {number} b
     */
    this.b = 0.0;

    /**
     * SPOOK parameter
     * @property {number} eps
     */
    this.eps = 0.0;

    /**
     * @property {JacobianElement} jacobianElementA
     */
    this.jacobianElementA = new JacobianElement();

    /**
     * @property {JacobianElement} jacobianElementB
     */
    this.jacobianElementB = new JacobianElement();

    /**
     * @property {boolean} enabled
     * @default true
     */
    this.enabled = true;

    // Set typical spook params
    this.setSpookParams(1e7,4,1/60);
}
Equation.prototype.constructor = Equation;

Equation.id = 0;

/**
 * Recalculates a,b,eps.
 * @method setSpookParams
 */
Equation.prototype.setSpookParams = function(stiffness,relaxation,timeStep){
    var d = relaxation,
        k = stiffness,
        h = timeStep;
    this.a = 4.0 / (h * (1 + 4 * d));
    this.b = (4.0 * d) / (1 + 4 * d);
    this.eps = 4.0 / (h * h * k * (1 + 4 * d));
};

/**
 * Computes the RHS of the SPOOK equation
 * @method computeB
 * @return {Number}
 */
Equation.prototype.computeB = function(a,b,h){
    var GW = this.computeGW(),
        Gq = this.computeGq(),
        GiMf = this.computeGiMf();
    return - Gq * a - GW * b - GiMf*h;
};

/**
 * Computes G*q, where q are the generalized body coordinates
 * @method computeGq
 * @return {Number}
 */
Equation.prototype.computeGq = function(){
    var GA = this.jacobianElementA,
        GB = this.jacobianElementB,
        bi = this.bi,
        bj = this.bj,
        xi = bi.position,
        xj = bj.position;
    return GA.spatial.dot(xi) + GB.spatial.dot(xj);
};

var zero = new Vec3();

/**
 * Computes G*W, where W are the body velocities
 * @method computeGW
 * @return {Number}
 */
Equation.prototype.computeGW = function(){
    var GA = this.jacobianElementA,
        GB = this.jacobianElementB,
        bi = this.bi,
        bj = this.bj,
        vi = bi.velocity,
        vj = bj.velocity,
        wi = bi.angularVelocity || zero,
        wj = bj.angularVelocity || zero;
    return GA.multiplyVectors(vi,wi) + GB.multiplyVectors(vj,wj);
};


/**
 * Computes G*Wlambda, where W are the body velocities
 * @method computeGWlambda
 * @return {Number}
 */
Equation.prototype.computeGWlambda = function(){
    var GA = this.jacobianElementA,
        GB = this.jacobianElementB,
        bi = this.bi,
        bj = this.bj,
        vi = bi.vlambda,
        vj = bj.vlambda,
        wi = bi.wlambda || zero,
        wj = bj.wlambda || zero;
    return GA.multiplyVectors(vi,wi) + GB.multiplyVectors(vj,wj);
};

/**
 * Computes G*inv(M)*f, where M is the mass matrix with diagonal blocks for each body, and f are the forces on the bodies.
 * @method computeGiMf
 * @return {Number}
 */
var iMfi = new Vec3(),
    iMfj = new Vec3(),
    invIi_vmult_taui = new Vec3(),
    invIj_vmult_tauj = new Vec3();
Equation.prototype.computeGiMf = function(){
    var GA = this.jacobianElementA,
        GB = this.jacobianElementB,
        bi = this.bi,
        bj = this.bj,
        fi = bi.force,
        ti = bi.torque,
        fj = bj.force,
        tj = bj.torque,
        invMassi = bi.invMassSolve,
        invMassj = bj.invMassSolve;

    if(bi.invInertiaWorldSolve){ bi.invInertiaWorldSolve.vmult(ti,invIi_vmult_taui); }
    else { invIi_vmult_taui.set(0,0,0); }
    if(bj.invInertiaWorldSolve){ bj.invInertiaWorldSolve.vmult(tj,invIj_vmult_tauj); }
    else { invIj_vmult_tauj.set(0,0,0); }

    fi.mult(invMassi,iMfi);
    fj.mult(invMassj,iMfj);

    return GA.multiplyVectors(iMfi,invIi_vmult_taui) + GB.multiplyVectors(iMfj,invIj_vmult_tauj);
};

/**
 * Computes G*inv(M)*G'
 * @method computeGiMGt
 * @return {Number}
 */
var tmp = new Vec3();
Equation.prototype.computeGiMGt = function(){
    var GA = this.jacobianElementA,
        GB = this.jacobianElementB,
        bi = this.bi,
        bj = this.bj,
        invMassi = bi.invMassSolve,
        invMassj = bj.invMassSolve,
        invIi = bi.invInertiaWorldSolve,
        invIj = bj.invInertiaWorldSolve,
        result = invMassi + invMassj;

    if(invIi){
        invIi.vmult(GA.rotational,tmp);
        result += tmp.dot(GA.rotational);
    }

    if(invIj){
        invIj.vmult(GB.rotational,tmp);
        result += tmp.dot(GB.rotational);
    }

    return  result;
};

var addToWlambda_temp = new Vec3(),
    addToWlambda_Gi = new Vec3(),
    addToWlambda_Gj = new Vec3(),
    addToWlambda_ri = new Vec3(),
    addToWlambda_rj = new Vec3(),
    addToWlambda_Mdiag = new Vec3();

/**
 * Add constraint velocity to the bodies.
 * @method addToWlambda
 * @param {Number} deltalambda
 */
Equation.prototype.addToWlambda = function(deltalambda){
    var GA = this.jacobianElementA,
        GB = this.jacobianElementB,
        bi = this.bi,
        bj = this.bj,
        temp = addToWlambda_temp;

    // Add to linear velocity
    // v_lambda += inv(M) * delta_lamba * G
    GA.spatial.mult(bi.invMassSolve * deltalambda,temp);
    bi.vlambda.vadd(temp, bi.vlambda);

    GB.spatial.mult(bj.invMassSolve * deltalambda,temp);
    bj.vlambda.vadd(temp, bj.vlambda);

    // Add to angular velocity
    if(bi.invInertiaWorldSolve){
        bi.invInertiaWorldSolve.vmult(GA.rotational,temp);
        temp.mult(deltalambda,temp);
        bi.wlambda.vadd(temp,bi.wlambda);
    }

    if(bj.invInertiaWorldSolve){
        bj.invInertiaWorldSolve.vmult(GB.rotational,temp);
        temp.mult(deltalambda,temp);
        bj.wlambda.vadd(temp,bj.wlambda);
    }
};

/**
 * Compute the denominator part of the SPOOK equation: C = G*inv(M)*G' + eps
 * @method computeInvC
 * @param  {Number} eps
 * @return {Number}
 */
Equation.prototype.computeC = function(){
    return this.computeGiMGt() + this.eps;
};

},{"../math/JacobianElement":26,"../math/Vec3":30}],21:[function(_dereq_,module,exports){
module.exports = FrictionEquation;

var Equation = _dereq_('./Equation');
var Vec3 = _dereq_('../math/Vec3');
var Mat3 = _dereq_('../math/Mat3');

/**
 * Constrains the slipping in a contact along a tangent
 * @class FrictionEquation
 * @constructor
 * @author schteppe
 * @param {Body} bodyA
 * @param {Body} bodyB
 * @param {Number} slipForce should be +-F_friction = +-mu * F_normal = +-mu * m * g
 * @extends Equation
 */
function FrictionEquation(bodyA, bodyB, slipForce){
    Equation.call(this,bodyA, bodyB, -slipForce, slipForce);
    this.ri = new Vec3();
    this.rj = new Vec3();
    this.t = new Vec3(); // tangent
}

FrictionEquation.prototype = new Equation();
FrictionEquation.prototype.constructor = FrictionEquation;

var FrictionEquation_computeB_temp1 = new Vec3();
var FrictionEquation_computeB_temp2 = new Vec3();
FrictionEquation.prototype.computeB = function(h){
    var a = this.a,
        b = this.b,
        bi = this.bi,
        bj = this.bj,
        ri = this.ri,
        rj = this.rj,
        rixt = FrictionEquation_computeB_temp1,
        rjxt = FrictionEquation_computeB_temp2,
        t = this.t;

    // Caluclate cross products
    ri.cross(t,rixt);
    rj.cross(t,rjxt);

    // G = [-t -rixt t rjxt]
    // And remember, this is a pure velocity constraint, g is always zero!
    var GA = this.jacobianElementA,
        GB = this.jacobianElementB;
    t.negate(GA.spatial);
    rixt.negate(GA.rotational);
    GB.spatial.copy(t);
    GB.rotational.copy(rjxt);

    var GW = this.computeGW();
    var GiMf = this.computeGiMf();

    var B = - GW * b - h * GiMf;

    return B;
};

},{"../math/Mat3":27,"../math/Vec3":30,"./Equation":20}],22:[function(_dereq_,module,exports){
module.exports = RotationalEquation;

var Vec3 = _dereq_('../math/Vec3');
var Mat3 = _dereq_('../math/Mat3');
var Equation = _dereq_('./Equation');

/**
 * Rotational constraint. Works to keep the local vectors orthogonal to each other in world space.
 * @class RotationalEquation
 * @constructor
 * @author schteppe
 * @param {Body} bodyA
 * @param {Body} bodyB
 * @param {Vec3} [options.axisA]
 * @param {Vec3} [options.axisB]
 * @param {number} [options.maxForce]
 * @extends Equation
 */
function RotationalEquation(bodyA, bodyB, options){
    options = options || {};
    var maxForce = typeof(options.maxForce) !== 'undefined' ? options.maxForce : 1e6;

    Equation.call(this,bodyA,bodyB,-maxForce, maxForce);

    this.axisA = options.axisA ? options.axisA.clone() : new Vec3(1, 0, 0);
    this.axisB = options.axisB ? options.axisB.clone() : new Vec3(0, 1, 0);

    this.maxAngle = Math.PI / 2;
}

RotationalEquation.prototype = new Equation();
RotationalEquation.prototype.constructor = RotationalEquation;

var tmpVec1 = new Vec3();
var tmpVec2 = new Vec3();

RotationalEquation.prototype.computeB = function(h){
    var a = this.a,
        b = this.b,

        ni = this.axisA,
        nj = this.axisB,

        nixnj = tmpVec1,
        njxni = tmpVec2,

        GA = this.jacobianElementA,
        GB = this.jacobianElementB;

    // Caluclate cross products
    ni.cross(nj, nixnj);
    nj.cross(ni, njxni);

    // g = ni * nj
    // gdot = (nj x ni) * wi + (ni x nj) * wj
    // G = [0 njxni 0 nixnj]
    // W = [vi wi vj wj]
    GA.rotational.copy(njxni);
    GB.rotational.copy(nixnj);

    var g = Math.cos(this.maxAngle) - ni.dot(nj),
        GW = this.computeGW(),
        GiMf = this.computeGiMf();

    var B = - g * a - GW * b - h * GiMf;

    return B;
};


},{"../math/Mat3":27,"../math/Vec3":30,"./Equation":20}],23:[function(_dereq_,module,exports){
module.exports = RotationalMotorEquation;

var Vec3 = _dereq_('../math/Vec3');
var Mat3 = _dereq_('../math/Mat3');
var Equation = _dereq_('./Equation');

/**
 * Rotational motor constraint. Tries to keep the relative angular velocity of the bodies to a given value.
 * @class RotationalMotorEquation
 * @constructor
 * @author schteppe
 * @param {Body} bodyA
 * @param {Body} bodyB
 * @param {Number} maxForce
 * @extends Equation
 */
function RotationalMotorEquation(bodyA, bodyB, maxForce){
    maxForce = typeof(maxForce)!=='undefined' ? maxForce : 1e6;
    Equation.call(this,bodyA,bodyB,-maxForce,maxForce);

    /**
     * World oriented rotational axis
     * @property {Vec3} axisA
     */
    this.axisA = new Vec3();

    /**
     * World oriented rotational axis
     * @property {Vec3} axisB
     */
    this.axisB = new Vec3(); // World oriented rotational axis

    /**
     * Motor velocity
     * @property {Number} targetVelocity
     */
    this.targetVelocity = 0;
}

RotationalMotorEquation.prototype = new Equation();
RotationalMotorEquation.prototype.constructor = RotationalMotorEquation;

RotationalMotorEquation.prototype.computeB = function(h){
    var a = this.a,
        b = this.b,
        bi = this.bi,
        bj = this.bj,

        axisA = this.axisA,
        axisB = this.axisB,

        GA = this.jacobianElementA,
        GB = this.jacobianElementB;

    // g = 0
    // gdot = axisA * wi - axisB * wj
    // gdot = G * W = G * [vi wi vj wj]
    // =>
    // G = [0 axisA 0 -axisB]

    GA.rotational.copy(axisA);
    axisB.negate(GB.rotational);

    var GW = this.computeGW() - this.targetVelocity,
        GiMf = this.computeGiMf();

    var B = - GW * b - h * GiMf;

    return B;
};

},{"../math/Mat3":27,"../math/Vec3":30,"./Equation":20}],24:[function(_dereq_,module,exports){
var Utils = _dereq_('../utils/Utils');

module.exports = ContactMaterial;

/**
 * Defines what happens when two materials meet.
 * @class ContactMaterial
 * @constructor
 * @param {Material} m1
 * @param {Material} m2
 * @param {object} [options]
 * @param {Number} [options.friction=0.3]
 * @param {Number} [options.restitution=0.3]
 * @param {number} [options.contactEquationStiffness=1e7]
 * @param {number} [options.contactEquationRelaxation=3]
 * @param {number} [options.frictionEquationStiffness=1e7]
 * @param {Number} [options.frictionEquationRelaxation=3]
 */
function ContactMaterial(m1, m2, options){
    options = Utils.defaults(options, {
        friction: 0.3,
        restitution: 0.3,
        contactEquationStiffness: 1e7,
        contactEquationRelaxation: 3,
        frictionEquationStiffness: 1e7,
        frictionEquationRelaxation: 3
    });

    /**
     * Identifier of this material
     * @property {Number} id
     */
    this.id = ContactMaterial.idCounter++;

    /**
     * Participating materials
     * @property {Array} materials
     * @todo  Should be .materialA and .materialB instead
     */
    this.materials = [m1, m2];

    /**
     * Friction coefficient
     * @property {Number} friction
     */
    this.friction = options.friction;

    /**
     * Restitution coefficient
     * @property {Number} restitution
     */
    this.restitution = options.restitution;

    /**
     * Stiffness of the produced contact equations
     * @property {Number} contactEquationStiffness
     */
    this.contactEquationStiffness = options.contactEquationStiffness;

    /**
     * Relaxation time of the produced contact equations
     * @property {Number} contactEquationRelaxation
     */
    this.contactEquationRelaxation = options.contactEquationRelaxation;

    /**
     * Stiffness of the produced friction equations
     * @property {Number} frictionEquationStiffness
     */
    this.frictionEquationStiffness = options.frictionEquationStiffness;

    /**
     * Relaxation time of the produced friction equations
     * @property {Number} frictionEquationRelaxation
     */
    this.frictionEquationRelaxation = options.frictionEquationRelaxation;
}

ContactMaterial.idCounter = 0;

},{"../utils/Utils":53}],25:[function(_dereq_,module,exports){
module.exports = Material;

/**
 * Defines a physics material.
 * @class Material
 * @constructor
 * @param {object} [options]
 * @author schteppe
 */
function Material(options){
    var name = '';
    options = options || {};

    // Backwards compatibility fix
    if(typeof(options) === 'string'){
        name = options;
        options = {};
    } else if(typeof(options) === 'object') {
        name = '';
    }

    /**
     * @property name
     * @type {String}
     */
    this.name = name;

    /**
     * material id.
     * @property id
     * @type {number}
     */
    this.id = Material.idCounter++;

    /**
     * Friction for this material. If non-negative, it will be used instead of the friction given by ContactMaterials. If there's no matching ContactMaterial, the value from .defaultContactMaterial in the World will be used.
     * @property {number} friction
     */
    this.friction = typeof(options.friction) !== 'undefined' ? options.friction : -1;

    /**
     * Restitution for this material. If non-negative, it will be used instead of the restitution given by ContactMaterials. If there's no matching ContactMaterial, the value from .defaultContactMaterial in the World will be used.
     * @property {number} restitution
     */
    this.restitution = typeof(options.restitution) !== 'undefined' ? options.restitution : -1;
}

Material.idCounter = 0;

},{}],26:[function(_dereq_,module,exports){
module.exports = JacobianElement;

var Vec3 = _dereq_('./Vec3');

/**
 * An element containing 6 entries, 3 spatial and 3 rotational degrees of freedom.
 * @class JacobianElement
 * @constructor
 */
function JacobianElement(){

    /**
     * @property {Vec3} spatial
     */
    this.spatial = new Vec3();

    /**
     * @property {Vec3} rotational
     */
    this.rotational = new Vec3();
}

/**
 * Multiply with other JacobianElement
 * @method multiplyElement
 * @param  {JacobianElement} element
 * @return {Number}
 */
JacobianElement.prototype.multiplyElement = function(element){
    return element.spatial.dot(this.spatial) + element.rotational.dot(this.rotational);
};

/**
 * Multiply with two vectors
 * @method multiplyVectors
 * @param  {Vec3} spatial
 * @param  {Vec3} rotational
 * @return {Number}
 */
JacobianElement.prototype.multiplyVectors = function(spatial,rotational){
    return spatial.dot(this.spatial) + rotational.dot(this.rotational);
};

},{"./Vec3":30}],27:[function(_dereq_,module,exports){
module.exports = Mat3;

var Vec3 = _dereq_('./Vec3');

/**
 * A 3x3 matrix.
 * @class Mat3
 * @constructor
 * @param array elements Array of nine elements. Optional.
 * @author schteppe / http://github.com/schteppe
 */
function Mat3(elements){
    /**
     * A vector of length 9, containing all matrix elements
     * @property {Array} elements
     */
    if(elements){
        this.elements = elements;
    } else {
        this.elements = [0,0,0,0,0,0,0,0,0];
    }
}

/**
 * Sets the matrix to identity
 * @method identity
 * @todo Should perhaps be renamed to setIdentity() to be more clear.
 * @todo Create another function that immediately creates an identity matrix eg. eye()
 */
Mat3.prototype.identity = function(){
    var e = this.elements;
    e[0] = 1;
    e[1] = 0;
    e[2] = 0;

    e[3] = 0;
    e[4] = 1;
    e[5] = 0;

    e[6] = 0;
    e[7] = 0;
    e[8] = 1;
};

/**
 * Set all elements to zero
 * @method setZero
 */
Mat3.prototype.setZero = function(){
    var e = this.elements;
    e[0] = 0;
    e[1] = 0;
    e[2] = 0;
    e[3] = 0;
    e[4] = 0;
    e[5] = 0;
    e[6] = 0;
    e[7] = 0;
    e[8] = 0;
};

/**
 * Sets the matrix diagonal elements from a Vec3
 * @method setTrace
 * @param {Vec3} vec3
 */
Mat3.prototype.setTrace = function(vec3){
    var e = this.elements;
    e[0] = vec3.x;
    e[4] = vec3.y;
    e[8] = vec3.z;
};

/**
 * Gets the matrix diagonal elements
 * @method getTrace
 * @return {Vec3}
 */
Mat3.prototype.getTrace = function(target){
    var target = target || new Vec3();
    var e = this.elements;
    target.x = e[0];
    target.y = e[4];
    target.z = e[8];
};

/**
 * Matrix-Vector multiplication
 * @method vmult
 * @param {Vec3} v The vector to multiply with
 * @param {Vec3} target Optional, target to save the result in.
 */
Mat3.prototype.vmult = function(v,target){
    target = target || new Vec3();

    var e = this.elements,
        x = v.x,
        y = v.y,
        z = v.z;
    target.x = e[0]*x + e[1]*y + e[2]*z;
    target.y = e[3]*x + e[4]*y + e[5]*z;
    target.z = e[6]*x + e[7]*y + e[8]*z;

    return target;
};

/**
 * Matrix-scalar multiplication
 * @method smult
 * @param {Number} s
 */
Mat3.prototype.smult = function(s){
    for(var i=0; i<this.elements.length; i++){
        this.elements[i] *= s;
    }
};

/**
 * Matrix multiplication
 * @method mmult
 * @param {Mat3} m Matrix to multiply with from left side.
 * @return {Mat3} The result.
 */
Mat3.prototype.mmult = function(m,target){
    var r = target || new Mat3();
    for(var i=0; i<3; i++){
        for(var j=0; j<3; j++){
            var sum = 0.0;
            for(var k=0; k<3; k++){
                sum += m.elements[i+k*3] * this.elements[k+j*3];
            }
            r.elements[i+j*3] = sum;
        }
    }
    return r;
};

/**
 * Scale each column of the matrix
 * @method scale
 * @param {Vec3} v
 * @return {Mat3} The result.
 */
Mat3.prototype.scale = function(v,target){
    target = target || new Mat3();
    var e = this.elements,
        t = target.elements;
    for(var i=0; i!==3; i++){
        t[3*i + 0] = v.x * e[3*i + 0];
        t[3*i + 1] = v.y * e[3*i + 1];
        t[3*i + 2] = v.z * e[3*i + 2];
    }
    return target;
};

/**
 * Solve Ax=b
 * @method solve
 * @param {Vec3} b The right hand side
 * @param {Vec3} target Optional. Target vector to save in.
 * @return {Vec3} The solution x
 * @todo should reuse arrays
 */
Mat3.prototype.solve = function(b,target){
    target = target || new Vec3();

    // Construct equations
    var nr = 3; // num rows
    var nc = 4; // num cols
    var eqns = [];
    for(var i=0; i<nr*nc; i++){
        eqns.push(0);
    }
    var i,j;
    for(i=0; i<3; i++){
        for(j=0; j<3; j++){
            eqns[i+nc*j] = this.elements[i+3*j];
        }
    }
    eqns[3+4*0] = b.x;
    eqns[3+4*1] = b.y;
    eqns[3+4*2] = b.z;

    // Compute right upper triangular version of the matrix - Gauss elimination
    var n = 3, k = n, np;
    var kp = 4; // num rows
    var p, els;
    do {
        i = k - n;
        if (eqns[i+nc*i] === 0) {
            // the pivot is null, swap lines
            for (j = i + 1; j < k; j++) {
                if (eqns[i+nc*j] !== 0) {
                    np = kp;
                    do {  // do ligne( i ) = ligne( i ) + ligne( k )
                        p = kp - np;
                        eqns[p+nc*i] += eqns[p+nc*j];
                    } while (--np);
                    break;
                }
            }
        }
        if (eqns[i+nc*i] !== 0) {
            for (j = i + 1; j < k; j++) {
                var multiplier = eqns[i+nc*j] / eqns[i+nc*i];
                np = kp;
                do {  // do ligne( k ) = ligne( k ) - multiplier * ligne( i )
                    p = kp - np;
                    eqns[p+nc*j] = p <= i ? 0 : eqns[p+nc*j] - eqns[p+nc*i] * multiplier ;
                } while (--np);
            }
        }
    } while (--n);

    // Get the solution
    target.z = eqns[2*nc+3] / eqns[2*nc+2];
    target.y = (eqns[1*nc+3] - eqns[1*nc+2]*target.z) / eqns[1*nc+1];
    target.x = (eqns[0*nc+3] - eqns[0*nc+2]*target.z - eqns[0*nc+1]*target.y) / eqns[0*nc+0];

    if(isNaN(target.x) || isNaN(target.y) || isNaN(target.z) || target.x===Infinity || target.y===Infinity || target.z===Infinity){
        throw "Could not solve equation! Got x=["+target.toString()+"], b=["+b.toString()+"], A=["+this.toString()+"]";
    }

    return target;
};

/**
 * Get an element in the matrix by index. Index starts at 0, not 1!!!
 * @method e
 * @param {Number} row
 * @param {Number} column
 * @param {Number} value Optional. If provided, the matrix element will be set to this value.
 * @return {Number}
 */
Mat3.prototype.e = function( row , column ,value){
    if(value===undefined){
        return this.elements[column+3*row];
    } else {
        // Set value
        this.elements[column+3*row] = value;
    }
};

/**
 * Copy another matrix into this matrix object.
 * @method copy
 * @param {Mat3} source
 * @return {Mat3} this
 */
Mat3.prototype.copy = function(source){
    for(var i=0; i < source.elements.length; i++){
        this.elements[i] = source.elements[i];
    }
    return this;
};

/**
 * Returns a string representation of the matrix.
 * @method toString
 * @return string
 */
Mat3.prototype.toString = function(){
    var r = "";
    var sep = ",";
    for(var i=0; i<9; i++){
        r += this.elements[i] + sep;
    }
    return r;
};

/**
 * reverse the matrix
 * @method reverse
 * @param {Mat3} target Optional. Target matrix to save in.
 * @return {Mat3} The solution x
 */
Mat3.prototype.reverse = function(target){

    target = target || new Mat3();

    // Construct equations
    var nr = 3; // num rows
    var nc = 6; // num cols
    var eqns = [];
    for(var i=0; i<nr*nc; i++){
        eqns.push(0);
    }
    var i,j;
    for(i=0; i<3; i++){
        for(j=0; j<3; j++){
            eqns[i+nc*j] = this.elements[i+3*j];
        }
    }
    eqns[3+6*0] = 1;
    eqns[3+6*1] = 0;
    eqns[3+6*2] = 0;
    eqns[4+6*0] = 0;
    eqns[4+6*1] = 1;
    eqns[4+6*2] = 0;
    eqns[5+6*0] = 0;
    eqns[5+6*1] = 0;
    eqns[5+6*2] = 1;

    // Compute right upper triangular version of the matrix - Gauss elimination
    var n = 3, k = n, np;
    var kp = nc; // num rows
    var p;
    do {
        i = k - n;
        if (eqns[i+nc*i] === 0) {
            // the pivot is null, swap lines
            for (j = i + 1; j < k; j++) {
                if (eqns[i+nc*j] !== 0) {
                    np = kp;
                    do { // do line( i ) = line( i ) + line( k )
                        p = kp - np;
                        eqns[p+nc*i] += eqns[p+nc*j];
                    } while (--np);
                    break;
                }
            }
        }
        if (eqns[i+nc*i] !== 0) {
            for (j = i + 1; j < k; j++) {
                var multiplier = eqns[i+nc*j] / eqns[i+nc*i];
                np = kp;
                do { // do line( k ) = line( k ) - multiplier * line( i )
                    p = kp - np;
                    eqns[p+nc*j] = p <= i ? 0 : eqns[p+nc*j] - eqns[p+nc*i] * multiplier ;
                } while (--np);
            }
        }
    } while (--n);

    // eliminate the upper left triangle of the matrix
    i = 2;
    do {
        j = i-1;
        do {
            var multiplier = eqns[i+nc*j] / eqns[i+nc*i];
            np = nc;
            do {
                p = nc - np;
                eqns[p+nc*j] =  eqns[p+nc*j] - eqns[p+nc*i] * multiplier ;
            } while (--np);
        } while (j--);
    } while (--i);

    // operations on the diagonal
    i = 2;
    do {
        var multiplier = 1 / eqns[i+nc*i];
        np = nc;
        do {
            p = nc - np;
            eqns[p+nc*i] = eqns[p+nc*i] * multiplier ;
        } while (--np);
    } while (i--);

    i = 2;
    do {
        j = 2;
        do {
            p = eqns[nr+j+nc*i];
            if( isNaN( p ) || p ===Infinity ){
                throw "Could not reverse! A=["+this.toString()+"]";
            }
            target.e( i , j , p );
        } while (j--);
    } while (i--);

    return target;
};

/**
 * Set the matrix from a quaterion
 * @method setRotationFromQuaternion
 * @param {Quaternion} q
 */
Mat3.prototype.setRotationFromQuaternion = function( q ) {
    var x = q.x, y = q.y, z = q.z, w = q.w,
        x2 = x + x, y2 = y + y, z2 = z + z,
        xx = x * x2, xy = x * y2, xz = x * z2,
        yy = y * y2, yz = y * z2, zz = z * z2,
        wx = w * x2, wy = w * y2, wz = w * z2,
        e = this.elements;

    e[3*0 + 0] = 1 - ( yy + zz );
    e[3*0 + 1] = xy - wz;
    e[3*0 + 2] = xz + wy;

    e[3*1 + 0] = xy + wz;
    e[3*1 + 1] = 1 - ( xx + zz );
    e[3*1 + 2] = yz - wx;

    e[3*2 + 0] = xz - wy;
    e[3*2 + 1] = yz + wx;
    e[3*2 + 2] = 1 - ( xx + yy );

    return this;
};

/**
 * Transpose the matrix
 * @method transpose
 * @param  {Mat3} target Where to store the result.
 * @return {Mat3} The target Mat3, or a new Mat3 if target was omitted.
 */
Mat3.prototype.transpose = function( target ) {
    target = target || new Mat3();

    var Mt = target.elements,
        M = this.elements;

    for(var i=0; i!==3; i++){
        for(var j=0; j!==3; j++){
            Mt[3*i + j] = M[3*j + i];
        }
    }

    return target;
};

},{"./Vec3":30}],28:[function(_dereq_,module,exports){
module.exports = Quaternion;

var Vec3 = _dereq_('./Vec3');

/**
 * A Quaternion describes a rotation in 3D space. The Quaternion is mathematically defined as Q = x*i + y*j + z*k + w, where (i,j,k) are imaginary basis vectors. (x,y,z) can be seen as a vector related to the axis of rotation, while the real multiplier, w, is related to the amount of rotation.
 * @class Quaternion
 * @constructor
 * @param {Number} x Multiplier of the imaginary basis vector i.
 * @param {Number} y Multiplier of the imaginary basis vector j.
 * @param {Number} z Multiplier of the imaginary basis vector k.
 * @param {Number} w Multiplier of the real part.
 * @see http://en.wikipedia.org/wiki/Quaternion
 */
function Quaternion(x,y,z,w){
    /**
     * @property {Number} x
     */
    this.x = x!==undefined ? x : 0;

    /**
     * @property {Number} y
     */
    this.y = y!==undefined ? y : 0;

    /**
     * @property {Number} z
     */
    this.z = z!==undefined ? z : 0;

    /**
     * The multiplier of the real quaternion basis vector.
     * @property {Number} w
     */
    this.w = w!==undefined ? w : 1;
}

/**
 * Set the value of the quaternion.
 * @method set
 * @param {Number} x
 * @param {Number} y
 * @param {Number} z
 * @param {Number} w
 */
Quaternion.prototype.set = function(x,y,z,w){
    this.x = x;
    this.y = y;
    this.z = z;
    this.w = w;
};

/**
 * Convert to a readable format
 * @method toString
 * @return string
 */
Quaternion.prototype.toString = function(){
    return this.x+","+this.y+","+this.z+","+this.w;
};

/**
 * Convert to an Array
 * @method toArray
 * @return Array
 */
Quaternion.prototype.toArray = function(){
    return [this.x, this.y, this.z, this.w];
};

/**
 * Set the quaternion components given an axis and an angle.
 * @method setFromAxisAngle
 * @param {Vec3} axis
 * @param {Number} angle in radians
 */
Quaternion.prototype.setFromAxisAngle = function(axis,angle){
    var s = Math.sin(angle*0.5);
    this.x = axis.x * s;
    this.y = axis.y * s;
    this.z = axis.z * s;
    this.w = Math.cos(angle*0.5);
};

/**
 * Converts the quaternion to axis/angle representation.
 * @method toAxisAngle
 * @param {Vec3} targetAxis Optional. A vector object to reuse for storing the axis.
 * @return Array An array, first elemnt is the axis and the second is the angle in radians.
 */
Quaternion.prototype.toAxisAngle = function(targetAxis){
    targetAxis = targetAxis || new Vec3();
    this.normalize(); // if w>1 acos and sqrt will produce errors, this cant happen if quaternion is normalised
    var angle = 2 * Math.acos(this.w);
    var s = Math.sqrt(1-this.w*this.w); // assuming quaternion normalised then w is less than 1, so term always positive.
    if (s < 0.001) { // test to avoid divide by zero, s is always positive due to sqrt
        // if s close to zero then direction of axis not important
        targetAxis.x = this.x; // if it is important that axis is normalised then replace with x=1; y=z=0;
        targetAxis.y = this.y;
        targetAxis.z = this.z;
    } else {
        targetAxis.x = this.x / s; // normalise axis
        targetAxis.y = this.y / s;
        targetAxis.z = this.z / s;
    }
    return [targetAxis,angle];
};

var sfv_t1 = new Vec3(),
    sfv_t2 = new Vec3();

/**
 * Set the quaternion value given two vectors. The resulting rotation will be the needed rotation to rotate u to v.
 * @method setFromVectors
 * @param {Vec3} u
 * @param {Vec3} v
 */
Quaternion.prototype.setFromVectors = function(u,v){
    if(u.isAntiparallelTo(v)){
        var t1 = sfv_t1;
        var t2 = sfv_t2;

        u.tangents(t1,t2);
        this.setFromAxisAngle(t1,Math.PI);
    } else {
        var a = u.cross(v);
        this.x = a.x;
        this.y = a.y;
        this.z = a.z;
        this.w = Math.sqrt(Math.pow(u.norm(),2) * Math.pow(v.norm(),2)) + u.dot(v);
        this.normalize();
    }
};

/**
 * Quaternion multiplication
 * @method mult
 * @param {Quaternion} q
 * @param {Quaternion} target Optional.
 * @return {Quaternion}
 */
var Quaternion_mult_va = new Vec3();
var Quaternion_mult_vb = new Vec3();
var Quaternion_mult_vaxvb = new Vec3();
Quaternion.prototype.mult = function(q,target){
    target = target || new Quaternion();
    var w = this.w,
        va = Quaternion_mult_va,
        vb = Quaternion_mult_vb,
        vaxvb = Quaternion_mult_vaxvb;

    va.set(this.x,this.y,this.z);
    vb.set(q.x,q.y,q.z);
    target.w = w*q.w - va.dot(vb);
    va.cross(vb,vaxvb);

    target.x = w * vb.x + q.w*va.x + vaxvb.x;
    target.y = w * vb.y + q.w*va.y + vaxvb.y;
    target.z = w * vb.z + q.w*va.z + vaxvb.z;

    return target;
};

/**
 * Get the inverse quaternion rotation.
 * @method inverse
 * @param {Quaternion} target
 * @return {Quaternion}
 */
Quaternion.prototype.inverse = function(target){
    var x = this.x, y = this.y, z = this.z, w = this.w;
    target = target || new Quaternion();

    this.conjugate(target);
    var inorm2 = 1/(x*x + y*y + z*z + w*w);
    target.x *= inorm2;
    target.y *= inorm2;
    target.z *= inorm2;
    target.w *= inorm2;

    return target;
};

/**
 * Get the quaternion conjugate
 * @method conjugate
 * @param {Quaternion} target
 * @return {Quaternion}
 */
Quaternion.prototype.conjugate = function(target){
    target = target || new Quaternion();

    target.x = -this.x;
    target.y = -this.y;
    target.z = -this.z;
    target.w = this.w;

    return target;
};

/**
 * Normalize the quaternion. Note that this changes the values of the quaternion.
 * @method normalize
 */
Quaternion.prototype.normalize = function(){
    var l = Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w);
    if ( l === 0 ) {
        this.x = 0;
        this.y = 0;
        this.z = 0;
        this.w = 0;
    } else {
        l = 1 / l;
        this.x *= l;
        this.y *= l;
        this.z *= l;
        this.w *= l;
    }
};

/**
 * Approximation of quaternion normalization. Works best when quat is already almost-normalized.
 * @method normalizeFast
 * @see http://jsperf.com/fast-quaternion-normalization
 * @author unphased, https://github.com/unphased
 */
Quaternion.prototype.normalizeFast = function () {
    var f = (3.0-(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w))/2.0;
    if ( f === 0 ) {
        this.x = 0;
        this.y = 0;
        this.z = 0;
        this.w = 0;
    } else {
        this.x *= f;
        this.y *= f;
        this.z *= f;
        this.w *= f;
    }
};

/**
 * Multiply the quaternion by a vector
 * @method vmult
 * @param {Vec3} v
 * @param {Vec3} target Optional
 * @return {Vec3}
 */
Quaternion.prototype.vmult = function(v,target){
    target = target || new Vec3();

    var x = v.x,
        y = v.y,
        z = v.z;

    var qx = this.x,
        qy = this.y,
        qz = this.z,
        qw = this.w;

    // q*v
    var ix =  qw * x + qy * z - qz * y,
    iy =  qw * y + qz * x - qx * z,
    iz =  qw * z + qx * y - qy * x,
    iw = -qx * x - qy * y - qz * z;

    target.x = ix * qw + iw * -qx + iy * -qz - iz * -qy;
    target.y = iy * qw + iw * -qy + iz * -qx - ix * -qz;
    target.z = iz * qw + iw * -qz + ix * -qy - iy * -qx;

    return target;
};

/**
 * Copies value of source to this quaternion.
 * @method copy
 * @param {Quaternion} source
 * @return {Quaternion} this
 */
Quaternion.prototype.copy = function(source){
    this.x = source.x;
    this.y = source.y;
    this.z = source.z;
    this.w = source.w;
    return this;
};

/**
 * Convert the quaternion to euler angle representation. Order: YZX, as this page describes: http://www.euclideanspace.com/maths/standards/index.htm
 * @method toEuler
 * @param {Vec3} target
 * @param string order Three-character string e.g. "YZX", which also is default.
 */
Quaternion.prototype.toEuler = function(target,order){
    order = order || "YZX";

    var heading, attitude, bank;
    var x = this.x, y = this.y, z = this.z, w = this.w;

    switch(order){
    case "YZX":
        var test = x*y + z*w;
        if (test > 0.499) { // singularity at north pole
            heading = 2 * Math.atan2(x,w);
            attitude = Math.PI/2;
            bank = 0;
        }
        if (test < -0.499) { // singularity at south pole
            heading = -2 * Math.atan2(x,w);
            attitude = - Math.PI/2;
            bank = 0;
        }
        if(isNaN(heading)){
            var sqx = x*x;
            var sqy = y*y;
            var sqz = z*z;
            heading = Math.atan2(2*y*w - 2*x*z , 1 - 2*sqy - 2*sqz); // Heading
            attitude = Math.asin(2*test); // attitude
            bank = Math.atan2(2*x*w - 2*y*z , 1 - 2*sqx - 2*sqz); // bank
        }
        break;
    default:
        throw new Error("Euler order "+order+" not supported yet.");
    }

    target.y = heading;
    target.z = attitude;
    target.x = bank;
};

/**
 * See http://www.mathworks.com/matlabcentral/fileexchange/20696-function-to-convert-between-dcm-euler-angles-quaternions-and-euler-vectors/content/SpinCalc.m
 * @method setFromEuler
 * @param {Number} x
 * @param {Number} y
 * @param {Number} z
 * @param {String} order The order to apply angles: 'XYZ' or 'YXZ' or any other combination
 */
Quaternion.prototype.setFromEuler = function ( x, y, z, order ) {
    order = order || "XYZ";

    var c1 = Math.cos( x / 2 );
    var c2 = Math.cos( y / 2 );
    var c3 = Math.cos( z / 2 );
    var s1 = Math.sin( x / 2 );
    var s2 = Math.sin( y / 2 );
    var s3 = Math.sin( z / 2 );

    if ( order === 'XYZ' ) {

        this.x = s1 * c2 * c3 + c1 * s2 * s3;
        this.y = c1 * s2 * c3 - s1 * c2 * s3;
        this.z = c1 * c2 * s3 + s1 * s2 * c3;
        this.w = c1 * c2 * c3 - s1 * s2 * s3;

    } else if ( order === 'YXZ' ) {

        this.x = s1 * c2 * c3 + c1 * s2 * s3;
        this.y = c1 * s2 * c3 - s1 * c2 * s3;
        this.z = c1 * c2 * s3 - s1 * s2 * c3;
        this.w = c1 * c2 * c3 + s1 * s2 * s3;

    } else if ( order === 'ZXY' ) {

        this.x = s1 * c2 * c3 - c1 * s2 * s3;
        this.y = c1 * s2 * c3 + s1 * c2 * s3;
        this.z = c1 * c2 * s3 + s1 * s2 * c3;
        this.w = c1 * c2 * c3 - s1 * s2 * s3;

    } else if ( order === 'ZYX' ) {

        this.x = s1 * c2 * c3 - c1 * s2 * s3;
        this.y = c1 * s2 * c3 + s1 * c2 * s3;
        this.z = c1 * c2 * s3 - s1 * s2 * c3;
        this.w = c1 * c2 * c3 + s1 * s2 * s3;

    } else if ( order === 'YZX' ) {

        this.x = s1 * c2 * c3 + c1 * s2 * s3;
        this.y = c1 * s2 * c3 + s1 * c2 * s3;
        this.z = c1 * c2 * s3 - s1 * s2 * c3;
        this.w = c1 * c2 * c3 - s1 * s2 * s3;

    } else if ( order === 'XZY' ) {

        this.x = s1 * c2 * c3 - c1 * s2 * s3;
        this.y = c1 * s2 * c3 - s1 * c2 * s3;
        this.z = c1 * c2 * s3 + s1 * s2 * c3;
        this.w = c1 * c2 * c3 + s1 * s2 * s3;

    }

    return this;

};

Quaternion.prototype.clone = function(){
    return new Quaternion(this.x, this.y, this.z, this.w);
};
},{"./Vec3":30}],29:[function(_dereq_,module,exports){
var Vec3 = _dereq_('./Vec3');
var Quaternion = _dereq_('./Quaternion');

module.exports = Transform;

/**
 * @class Transform
 * @constructor
 */
function Transform(options) {
    options = options || {};

	/**
	 * @property {Vec3} position
	 */
	this.position = new Vec3();
    if(options.position){
        this.position.copy(options.position);
    }

	/**
	 * @property {Quaternion} quaternion
	 */
	this.quaternion = new Quaternion();
    if(options.quaternion){
        this.quaternion.copy(options.quaternion);
    }
}

var tmpQuat = new Quaternion();

/**
 * @static
 * @method pointToLocaFrame
 * @param {Vec3} position
 * @param {Quaternion} quaternion
 * @param {Vec3} worldPoint
 * @param {Vec3} result
 */
Transform.pointToLocalFrame = function(position, quaternion, worldPoint, result){
    var result = result || new Vec3();
    worldPoint.vsub(position, result);
    quaternion.conjugate(tmpQuat);
    tmpQuat.vmult(result, result);
    return result;
};

/**
 * Get a global point in local transform coordinates.
 * @method pointToLocal
 * @param  {Vec3} point
 * @param  {Vec3} result
 * @return {Vec3} The "result" vector object
 */
Transform.prototype.pointToLocal = function(worldPoint, result){
    return Transform.pointToLocalFrame(this.position, this.quaternion, worldPoint, result);
};

/**
 * @static
 * @method pointToWorldFrame
 * @param {Vec3} position
 * @param {Vec3} quaternion
 * @param {Vec3} localPoint
 * @param {Vec3} result
 */
Transform.pointToWorldFrame = function(position, quaternion, localPoint, result){
    var result = result || new Vec3();
    quaternion.vmult(localPoint, result);
    result.vadd(position, result);
    return result;
};

/**
 * Get a local point in global transform coordinates.
 * @method pointToWorld
 * @param  {Vec3} point
 * @param  {Vec3} result
 * @return {Vec3} The "result" vector object
 */
Transform.prototype.pointToWorld = function(localPoint, result){
    return Transform.pointToWorldFrame(this.position, this.quaternion, localPoint, result);
};


Transform.prototype.vectorToWorldFrame = function(localVector, result){
    var result = result || new Vec3();
    this.quaternion.vmult(localVector, result);
    return result;
};

Transform.vectorToWorldFrame = function(quaternion, localVector, result){
    quaternion.vmult(localVector, result);
    return result;
};

Transform.vectorToLocalFrame = function(position, quaternion, worldVector, result){
    var result = result || new Vec3();
    quaternion.w *= -1;
    quaternion.vmult(worldVector, result);
    quaternion.w *= -1;
    return result;
};

},{"./Quaternion":28,"./Vec3":30}],30:[function(_dereq_,module,exports){
module.exports = Vec3;

var Mat3 = _dereq_('./Mat3');

/**
 * 3-dimensional vector
 * @class Vec3
 * @constructor
 * @param {Number} x
 * @param {Number} y
 * @param {Number} z
 * @author schteppe
 * @example
 *     var v = new Vec3(1, 2, 3);
 *     console.log('x=' + v.x); // x=1
 */
function Vec3(x,y,z){
    /**
     * @property x
     * @type {Number}
     */
    this.x = x||0.0;

    /**
     * @property y
     * @type {Number}
     */
    this.y = y||0.0;

    /**
     * @property z
     * @type {Number}
     */
    this.z = z||0.0;
}

/**
 * @static
 * @property {Vec3} ZERO
 */
Vec3.ZERO = new Vec3(0, 0, 0);

/**
 * @static
 * @property {Vec3} UNIT_X
 */
Vec3.UNIT_X = new Vec3(1, 0, 0);

/**
 * @static
 * @property {Vec3} UNIT_Y
 */
Vec3.UNIT_Y = new Vec3(0, 1, 0);

/**
 * @static
 * @property {Vec3} UNIT_Z
 */
Vec3.UNIT_Z = new Vec3(0, 0, 1);

/**
 * Vector cross product
 * @method cross
 * @param {Vec3} v
 * @param {Vec3} target Optional. Target to save in.
 * @return {Vec3}
 */
Vec3.prototype.cross = function(v,target){
    var vx=v.x, vy=v.y, vz=v.z, x=this.x, y=this.y, z=this.z;
    target = target || new Vec3();

    target.x = (y * vz) - (z * vy);
    target.y = (z * vx) - (x * vz);
    target.z = (x * vy) - (y * vx);

    return target;
};

/**
 * Set the vectors' 3 elements
 * @method set
 * @param {Number} x
 * @param {Number} y
 * @param {Number} z
 * @return Vec3
 */
Vec3.prototype.set = function(x,y,z){
    this.x = x;
    this.y = y;
    this.z = z;
    return this;
};

/**
 * Set all components of the vector to zero.
 * @method setZero
 */
Vec3.prototype.setZero = function(){
    this.x = this.y = this.z = 0;
};

/**
 * Vector addition
 * @method vadd
 * @param {Vec3} v
 * @param {Vec3} target Optional.
 * @return {Vec3}
 */
Vec3.prototype.vadd = function(v,target){
    if(target){
        target.x = v.x + this.x;
        target.y = v.y + this.y;
        target.z = v.z + this.z;
    } else {
        return new Vec3(this.x + v.x,
                               this.y + v.y,
                               this.z + v.z);
    }
};

/**
 * Vector subtraction
 * @method vsub
 * @param {Vec3} v
 * @param {Vec3} target Optional. Target to save in.
 * @return {Vec3}
 */
Vec3.prototype.vsub = function(v,target){
    if(target){
        target.x = this.x - v.x;
        target.y = this.y - v.y;
        target.z = this.z - v.z;
    } else {
        return new Vec3(this.x-v.x,
                               this.y-v.y,
                               this.z-v.z);
    }
};

/**
 * Get the cross product matrix a_cross from a vector, such that a x b = a_cross * b = c
 * @method crossmat
 * @see http://www8.cs.umu.se/kurser/TDBD24/VT06/lectures/Lecture6.pdf
 * @return {Mat3}
 */
Vec3.prototype.crossmat = function(){
    return new Mat3([     0,  -this.z,   this.y,
                            this.z,        0,  -this.x,
                           -this.y,   this.x,        0]);
};

/**
 * Normalize the vector. Note that this changes the values in the vector.
 * @method normalize
 * @return {Number} Returns the norm of the vector
 */
Vec3.prototype.normalize = function(){
    var x=this.x, y=this.y, z=this.z;
    var n = Math.sqrt(x*x + y*y + z*z);
    if(n>0.0){
        var invN = 1/n;
        this.x *= invN;
        this.y *= invN;
        this.z *= invN;
    } else {
        // Make something up
        this.x = 0;
        this.y = 0;
        this.z = 0;
    }
    return n;
};

/**
 * Get the version of this vector that is of length 1.
 * @method unit
 * @param {Vec3} target Optional target to save in
 * @return {Vec3} Returns the unit vector
 */
Vec3.prototype.unit = function(target){
    target = target || new Vec3();
    var x=this.x, y=this.y, z=this.z;
    var ninv = Math.sqrt(x*x + y*y + z*z);
    if(ninv>0.0){
        ninv = 1.0/ninv;
        target.x = x * ninv;
        target.y = y * ninv;
        target.z = z * ninv;
    } else {
        target.x = 1;
        target.y = 0;
        target.z = 0;
    }
    return target;
};

/**
 * Get the length of the vector
 * @method norm
 * @return {Number}
 * @deprecated Use .length() instead
 */
Vec3.prototype.norm = function(){
    var x=this.x, y=this.y, z=this.z;
    return Math.sqrt(x*x + y*y + z*z);
};

/**
 * Get the length of the vector
 * @method length
 * @return {Number}
 */
Vec3.prototype.length = Vec3.prototype.norm;

/**
 * Get the squared length of the vector
 * @method norm2
 * @return {Number}
 * @deprecated Use .lengthSquared() instead.
 */
Vec3.prototype.norm2 = function(){
    return this.dot(this);
};

/**
 * Get the squared length of the vector.
 * @method lengthSquared
 * @return {Number}
 */
Vec3.prototype.lengthSquared = Vec3.prototype.norm2;

/**
 * Get distance from this point to another point
 * @method distanceTo
 * @param  {Vec3} p
 * @return {Number}
 */
Vec3.prototype.distanceTo = function(p){
    var x=this.x, y=this.y, z=this.z;
    var px=p.x, py=p.y, pz=p.z;
    return Math.sqrt((px-x)*(px-x)+
                     (py-y)*(py-y)+
                     (pz-z)*(pz-z));
};

/**
 * Get squared distance from this point to another point
 * @method distanceSquared
 * @param  {Vec3} p
 * @return {Number}
 */
Vec3.prototype.distanceSquared = function(p){
    var x=this.x, y=this.y, z=this.z;
    var px=p.x, py=p.y, pz=p.z;
    return (px-x)*(px-x) + (py-y)*(py-y) + (pz-z)*(pz-z);
};

/**
 * Multiply all the components of the vector with a scalar.
 * @deprecated Use .scale instead
 * @method mult
 * @param {Number} scalar
 * @param {Vec3} target The vector to save the result in.
 * @return {Vec3}
 * @deprecated Use .scale() instead
 */
Vec3.prototype.mult = function(scalar,target){
    target = target || new Vec3();
    var x = this.x,
        y = this.y,
        z = this.z;
    target.x = scalar * x;
    target.y = scalar * y;
    target.z = scalar * z;
    return target;
};

/**
 * Multiply the vector with a scalar.
 * @method scale
 * @param {Number} scalar
 * @param {Vec3} target
 * @return {Vec3}
 */
Vec3.prototype.scale = Vec3.prototype.mult;

/**
 * Calculate dot product
 * @method dot
 * @param {Vec3} v
 * @return {Number}
 */
Vec3.prototype.dot = function(v){
    return this.x * v.x + this.y * v.y + this.z * v.z;
};

/**
 * @method isZero
 * @return bool
 */
Vec3.prototype.isZero = function(){
    return this.x===0 && this.y===0 && this.z===0;
};

/**
 * Make the vector point in the opposite direction.
 * @method negate
 * @param {Vec3} target Optional target to save in
 * @return {Vec3}
 */
Vec3.prototype.negate = function(target){
    target = target || new Vec3();
    target.x = -this.x;
    target.y = -this.y;
    target.z = -this.z;
    return target;
};

/**
 * Compute two artificial tangents to the vector
 * @method tangents
 * @param {Vec3} t1 Vector object to save the first tangent in
 * @param {Vec3} t2 Vector object to save the second tangent in
 */
var Vec3_tangents_n = new Vec3();
var Vec3_tangents_randVec = new Vec3();
Vec3.prototype.tangents = function(t1,t2){
    var norm = this.norm();
    if(norm>0.0){
        var n = Vec3_tangents_n;
        var inorm = 1/norm;
        n.set(this.x*inorm,this.y*inorm,this.z*inorm);
        var randVec = Vec3_tangents_randVec;
        if(Math.abs(n.x) < 0.9){
            randVec.set(1,0,0);
            n.cross(randVec,t1);
        } else {
            randVec.set(0,1,0);
            n.cross(randVec,t1);
        }
        n.cross(t1,t2);
    } else {
        // The normal length is zero, make something up
        t1.set(1, 0, 0);
        t2.set(0, 1, 0);
    }
};

/**
 * Converts to a more readable format
 * @method toString
 * @return string
 */
Vec3.prototype.toString = function(){
    return this.x+","+this.y+","+this.z;
};

/**
 * Converts to an array
 * @method toArray
 * @return Array
 */
Vec3.prototype.toArray = function(){
    return [this.x, this.y, this.z];
};

/**
 * Copies value of source to this vector.
 * @method copy
 * @param {Vec3} source
 * @return {Vec3} this
 */
Vec3.prototype.copy = function(source){
    this.x = source.x;
    this.y = source.y;
    this.z = source.z;
    return this;
};


/**
 * Do a linear interpolation between two vectors
 * @method lerp
 * @param {Vec3} v
 * @param {Number} t A number between 0 and 1. 0 will make this function return u, and 1 will make it return v. Numbers in between will generate a vector in between them.
 * @param {Vec3} target
 */
Vec3.prototype.lerp = function(v,t,target){
    var x=this.x, y=this.y, z=this.z;
    target.x = x + (v.x-x)*t;
    target.y = y + (v.y-y)*t;
    target.z = z + (v.z-z)*t;
};

/**
 * Check if a vector equals is almost equal to another one.
 * @method almostEquals
 * @param {Vec3} v
 * @param {Number} precision
 * @return bool
 */
Vec3.prototype.almostEquals = function(v,precision){
    if(precision===undefined){
        precision = 1e-6;
    }
    if( Math.abs(this.x-v.x)>precision ||
        Math.abs(this.y-v.y)>precision ||
        Math.abs(this.z-v.z)>precision){
        return false;
    }
    return true;
};

/**
 * Check if a vector is almost zero
 * @method almostZero
 * @param {Number} precision
 */
Vec3.prototype.almostZero = function(precision){
    if(precision===undefined){
        precision = 1e-6;
    }
    if( Math.abs(this.x)>precision ||
        Math.abs(this.y)>precision ||
        Math.abs(this.z)>precision){
        return false;
    }
    return true;
};

var antip_neg = new Vec3();

/**
 * Check if the vector is anti-parallel to another vector.
 * @method isAntiparallelTo
 * @param  {Vec3}  v
 * @param  {Number}  precision Set to zero for exact comparisons
 * @return {Boolean}
 */
Vec3.prototype.isAntiparallelTo = function(v,precision){
    this.negate(antip_neg);
    return antip_neg.almostEquals(v,precision);
};

/**
 * Clone the vector
 * @method clone
 * @return {Vec3}
 */
Vec3.prototype.clone = function(){
    return new Vec3(this.x, this.y, this.z);
};
},{"./Mat3":27}],31:[function(_dereq_,module,exports){
module.exports = Body;

var EventTarget = _dereq_('../utils/EventTarget');
var Shape = _dereq_('../shapes/Shape');
var Vec3 = _dereq_('../math/Vec3');
var Mat3 = _dereq_('../math/Mat3');
var Quaternion = _dereq_('../math/Quaternion');
var Material = _dereq_('../material/Material');
var AABB = _dereq_('../collision/AABB');
var Box = _dereq_('../shapes/Box');

/**
 * Base class for all body types.
 * @class Body
 * @constructor
 * @extends EventTarget
 * @param {object} [options]
 * @param {Vec3} [options.position]
 * @param {Vec3} [options.velocity]
 * @param {Vec3} [options.angularVelocity]
 * @param {Quaternion} [options.quaternion]
 * @param {number} [options.mass]
 * @param {Material} [options.material]
 * @param {number} [options.type]
 * @param {number} [options.linearDamping=0.01]
 * @param {number} [options.angularDamping=0.01]
 * @param {boolean} [options.allowSleep=true]
 * @param {number} [options.sleepSpeedLimit=0.1]
 * @param {number} [options.sleepTimeLimit=1]
 * @param {number} [options.collisionFilterGroup=1]
 * @param {number} [options.collisionFilterMask=1]
 * @param {boolean} [options.fixedRotation=false]
 * @param {Body} [options.shape]
 * @example
 *     var body = new Body({
 *         mass: 1
 *     });
 *     var shape = new Sphere(1);
 *     body.addShape(shape);
 *     world.add(body);
 */
function Body(options){
    options = options || {};

    EventTarget.apply(this);

    this.id = Body.idCounter++;

    /**
     * Reference to the world the body is living in
     * @property world
     * @type {World}
     */
    this.world = null;

    /**
     * Callback function that is used BEFORE stepping the system. Use it to apply forces, for example. Inside the function, "this" will refer to this Body object.
     * @property preStep
     * @type {Function}
     * @deprecated Use World events instead
     */
    this.preStep = null;

    /**
     * Callback function that is used AFTER stepping the system. Inside the function, "this" will refer to this Body object.
     * @property postStep
     * @type {Function}
     * @deprecated Use World events instead
     */
    this.postStep = null;

    this.vlambda = new Vec3();

    /**
     * @property {Number} collisionFilterGroup
     */
    this.collisionFilterGroup = typeof(options.collisionFilterGroup) === 'number' ? options.collisionFilterGroup : 1;

    /**
     * @property {Number} collisionFilterMask
     */
    this.collisionFilterMask = typeof(options.collisionFilterMask) === 'number' ? options.collisionFilterMask : 1;

    /**
     * Whether to produce contact forces when in contact with other bodies. Note that contacts will be generated, but they will be disabled.
     * @property {Number} collisionResponse
     */
	this.collisionResponse = true;

    /**
     * @property position
     * @type {Vec3}
     */
    this.position = new Vec3();

    if(options.position){
        this.position.copy(options.position);
    }

    /**
     * @property {Vec3} previousPosition
     */
    this.previousPosition = new Vec3();

    /**
     * Initial position of the body
     * @property initPosition
     * @type {Vec3}
     */
    this.initPosition = new Vec3();

    /**
     * @property velocity
     * @type {Vec3}
     */
    this.velocity = new Vec3();

    if(options.velocity){
        this.velocity.copy(options.velocity);
    }

    /**
     * @property initVelocity
     * @type {Vec3}
     */
    this.initVelocity = new Vec3();

    /**
     * Linear force on the body
     * @property force
     * @type {Vec3}
     */
    this.force = new Vec3();

    var mass = typeof(options.mass) === 'number' ? options.mass : 0;

    /**
     * @property mass
     * @type {Number}
     * @default 0
     */
    this.mass = mass;

    /**
     * @property invMass
     * @type {Number}
     */
    this.invMass = mass > 0 ? 1.0 / mass : 0;

    /**
     * @property material
     * @type {Material}
     */
    this.material = options.material || null;

    /**
     * @property linearDamping
     * @type {Number}
     */
    this.linearDamping = typeof(options.linearDamping) === 'number' ? options.linearDamping : 0.01;

    /**
     * One of: Body.DYNAMIC, Body.STATIC and Body.KINEMATIC.
     * @property type
     * @type {Number}
     */
    this.type = (mass <= 0.0 ? Body.STATIC : Body.DYNAMIC);
    if(typeof(options.type) === typeof(Body.STATIC)){
        this.type = options.type;
    }

    /**
     * If true, the body will automatically fall to sleep.
     * @property allowSleep
     * @type {Boolean}
     * @default true
     */
    this.allowSleep = typeof(options.allowSleep) !== 'undefined' ? options.allowSleep : true;

    /**
     * Current sleep state.
     * @property sleepState
     * @type {Number}
     */
    this.sleepState = 0;

    /**
     * If the speed (the norm of the velocity) is smaller than this value, the body is considered sleepy.
     * @property sleepSpeedLimit
     * @type {Number}
     * @default 0.1
     */
    this.sleepSpeedLimit = typeof(options.sleepSpeedLimit) !== 'undefined' ? options.sleepSpeedLimit : 0.1;

    /**
     * If the body has been sleepy for this sleepTimeLimit seconds, it is considered sleeping.
     * @property sleepTimeLimit
     * @type {Number}
     * @default 1
     */
    this.sleepTimeLimit = typeof(options.sleepTimeLimit) !== 'undefined' ? options.sleepTimeLimit : 1;

    this.timeLastSleepy = 0;

    this._wakeUpAfterNarrowphase = false;


    /**
     * Rotational force on the body, around center of mass
     * @property {Vec3} torque
     */
    this.torque = new Vec3();

    /**
     * Orientation of the body
     * @property quaternion
     * @type {Quaternion}
     */
    this.quaternion = new Quaternion();

    if(options.quaternion){
        this.quaternion.copy(options.quaternion);
    }

    /**
     * @property initQuaternion
     * @type {Quaternion}
     */
    this.initQuaternion = new Quaternion();

    /**
     * @property angularVelocity
     * @type {Vec3}
     */
    this.angularVelocity = new Vec3();

    if(options.angularVelocity){
        this.angularVelocity.copy(options.angularVelocity);
    }

    /**
     * @property initAngularVelocity
     * @type {Vec3}
     */
    this.initAngularVelocity = new Vec3();

    this.interpolatedPosition = new Vec3();
    this.interpolatedQuaternion = new Quaternion();

    /**
     * @property shapes
     * @type {array}
     */
    this.shapes = [];

    /**
     * @property shapeOffsets
     * @type {array}
     */
    this.shapeOffsets = [];

    /**
     * @property shapeOrientations
     * @type {array}
     */
    this.shapeOrientations = [];

    /**
     * @property inertia
     * @type {Vec3}
     */
    this.inertia = new Vec3();

    /**
     * @property {Vec3} invInertia
     */
    this.invInertia = new Vec3();

    /**
     * @property {Mat3} invInertiaWorld
     */
    this.invInertiaWorld = new Mat3();

    this.invMassSolve = 0;

    /**
     * @property {Vec3} invInertiaSolve
     */
    this.invInertiaSolve = new Vec3();

    /**
     * @property {Mat3} invInertiaWorldSolve
     */
    this.invInertiaWorldSolve = new Mat3();

    /**
     * Set to true if you don't want the body to rotate. Make sure to run .updateMassProperties() after changing this.
     * @property {Boolean} fixedRotation
     * @default false
     */
    this.fixedRotation = typeof(options.fixedRotation) !== "undefined" ? options.fixedRotation : false;

    /**
     * @property {Number} angularDamping
     */
    this.angularDamping = typeof(options.angularDamping) !== 'undefined' ? options.angularDamping : 0.01;

    /**
     * @property aabb
     * @type {AABB}
     */
    this.aabb = new AABB();

    /**
     * Indicates if the AABB needs to be updated before use.
     * @property aabbNeedsUpdate
     * @type {Boolean}
     */
    this.aabbNeedsUpdate = true;

    this.wlambda = new Vec3();

    if(options.shape){
        this.addShape(options.shape);
    }

    this.updateMassProperties();
}
Body.prototype = new EventTarget();
Body.prototype.constructor = Body;

/**
 * A dynamic body is fully simulated. Can be moved manually by the user, but normally they move according to forces. A dynamic body can collide with all body types. A dynamic body always has finite, non-zero mass.
 * @static
 * @property DYNAMIC
 * @type {Number}
 */
Body.DYNAMIC = 1;

/**
 * A static body does not move during simulation and behaves as if it has infinite mass. Static bodies can be moved manually by setting the position of the body. The velocity of a static body is always zero. Static bodies do not collide with other static or kinematic bodies.
 * @static
 * @property STATIC
 * @type {Number}
 */
Body.STATIC = 2;

/**
 * A kinematic body moves under simulation according to its velocity. They do not respond to forces. They can be moved manually, but normally a kinematic body is moved by setting its velocity. A kinematic body behaves as if it has infinite mass. Kinematic bodies do not collide with other static or kinematic bodies.
 * @static
 * @property KINEMATIC
 * @type {Number}
 */
Body.KINEMATIC = 4;



/**
 * @static
 * @property AWAKE
 * @type {number}
 */
Body.AWAKE = 0;

/**
 * @static
 * @property SLEEPY
 * @type {number}
 */
Body.SLEEPY = 1;

/**
 * @static
 * @property SLEEPING
 * @type {number}
 */
Body.SLEEPING = 2;

Body.idCounter = 0;

/**
 * Wake the body up.
 * @method wakeUp
 */
Body.prototype.wakeUp = function(){
    var s = this.sleepState;
    this.sleepState = 0;
    if(s === Body.SLEEPING){
        this.dispatchEvent({type:"wakeup"});
    }
};

/**
 * Force body sleep
 * @method sleep
 */
Body.prototype.sleep = function(){
    this.sleepState = Body.SLEEPING;
    this.velocity.set(0,0,0);
    this.angularVelocity.set(0,0,0);
};

Body.sleepyEvent = {
    type: "sleepy"
};

Body.sleepEvent = {
    type: "sleep"
};

/**
 * Called every timestep to update internal sleep timer and change sleep state if needed.
 * @method sleepTick
 * @param {Number} time The world time in seconds
 */
Body.prototype.sleepTick = function(time){
    if(this.allowSleep){
        var sleepState = this.sleepState;
        var speedSquared = this.velocity.norm2() + this.angularVelocity.norm2();
        var speedLimitSquared = Math.pow(this.sleepSpeedLimit,2);
        if(sleepState===Body.AWAKE && speedSquared < speedLimitSquared){
            this.sleepState = Body.SLEEPY; // Sleepy
            this.timeLastSleepy = time;
            this.dispatchEvent(Body.sleepyEvent);
        } else if(sleepState===Body.SLEEPY && speedSquared > speedLimitSquared){
            this.wakeUp(); // Wake up
        } else if(sleepState===Body.SLEEPY && (time - this.timeLastSleepy ) > this.sleepTimeLimit){
            this.sleep(); // Sleeping
            this.dispatchEvent(Body.sleepEvent);
        }
    }
};

/**
 * If the body is sleeping, it should be immovable / have infinite mass during solve. We solve it by having a separate "solve mass".
 * @method updateSolveMassProperties
 */
Body.prototype.updateSolveMassProperties = function(){
    if(this.sleepState === Body.SLEEPING || this.type === Body.KINEMATIC){
        this.invMassSolve = 0;
        this.invInertiaSolve.setZero();
        this.invInertiaWorldSolve.setZero();
    } else {
        this.invMassSolve = this.invMass;
        this.invInertiaSolve.copy(this.invInertia);
        this.invInertiaWorldSolve.copy(this.invInertiaWorld);
    }
};

/**
 * Convert a world point to local body frame.
 * @method pointToLocalFrame
 * @param  {Vec3} worldPoint
 * @param  {Vec3} result
 * @return {Vec3}
 */
Body.prototype.pointToLocalFrame = function(worldPoint,result){
    var result = result || new Vec3();
    worldPoint.vsub(this.position,result);
    this.quaternion.conjugate().vmult(result,result);
    return result;
};

/**
 * Convert a world vector to local body frame.
 * @method vectorToLocalFrame
 * @param  {Vec3} worldPoint
 * @param  {Vec3} result
 * @return {Vec3}
 */
Body.prototype.vectorToLocalFrame = function(worldVector, result){
    var result = result || new Vec3();
    this.quaternion.conjugate().vmult(worldVector,result);
    return result;
};

/**
 * Convert a local body point to world frame.
 * @method pointToWorldFrame
 * @param  {Vec3} localPoint
 * @param  {Vec3} result
 * @return {Vec3}
 */
Body.prototype.pointToWorldFrame = function(localPoint,result){
    var result = result || new Vec3();
    this.quaternion.vmult(localPoint,result);
    result.vadd(this.position,result);
    return result;
};

/**
 * Convert a local body point to world frame.
 * @method vectorToWorldFrame
 * @param  {Vec3} localVector
 * @param  {Vec3} result
 * @return {Vec3}
 */
Body.prototype.vectorToWorldFrame = function(localVector, result){
    var result = result || new Vec3();
    this.quaternion.vmult(localVector, result);
    return result;
};

var tmpVec = new Vec3();
var tmpQuat = new Quaternion();

/**
 * Add a shape to the body with a local offset and orientation.
 * @method addShape
 * @param {Shape} shape
 * @param {Vec3} offset
 * @param {Quaternion} quaternion
 * @return {Body} The body object, for chainability.
 */
Body.prototype.addShape = function(shape, _offset, _orientation){
    var offset = new Vec3();
    var orientation = new Quaternion();

    if(_offset){
        offset.copy(_offset);
    }
    if(_orientation){
        orientation.copy(_orientation);
    }

    this.shapes.push(shape);
    this.shapeOffsets.push(offset);
    this.shapeOrientations.push(orientation);
    this.updateMassProperties();
    this.updateBoundingRadius();

    this.aabbNeedsUpdate = true;

    return this;
};

/**
 * Update the bounding radius of the body. Should be done if any of the shapes are changed.
 * @method updateBoundingRadius
 */
Body.prototype.updateBoundingRadius = function(){
    var shapes = this.shapes,
        shapeOffsets = this.shapeOffsets,
        N = shapes.length,
        radius = 0;

    for(var i=0; i!==N; i++){
        var shape = shapes[i];
        shape.updateBoundingSphereRadius();
        var offset = shapeOffsets[i].norm(),
            r = shape.boundingSphereRadius;
        if(offset + r > radius){
            radius = offset + r;
        }
    }

    this.boundingRadius = radius;
};

var computeAABB_shapeAABB = new AABB();

/**
 * Updates the .aabb
 * @method computeAABB
 * @todo rename to updateAABB()
 */
Body.prototype.computeAABB = function(){
    var shapes = this.shapes,
        shapeOffsets = this.shapeOffsets,
        shapeOrientations = this.shapeOrientations,
        N = shapes.length,
        offset = tmpVec,
        orientation = tmpQuat,
        bodyQuat = this.quaternion,
        aabb = this.aabb,
        shapeAABB = computeAABB_shapeAABB;

    for(var i=0; i!==N; i++){
        var shape = shapes[i];

        // Get shape world quaternion
        shapeOrientations[i].mult(bodyQuat, orientation);

        // Get shape world position
        orientation.vmult(shapeOffsets[i], offset);
        offset.vadd(this.position, offset);

        // vec2.rotate(offset, shapeOffsets[i], bodyAngle);
        // vec2.add(offset, offset, this.position);

        // Get shape AABB
        shape.calculateWorldAABB(offset, orientation, shapeAABB.lowerBound, shapeAABB.upperBound);

        if(i === 0){
            aabb.copy(shapeAABB);
        } else {
            aabb.extend(shapeAABB);
        }
    }

    this.aabbNeedsUpdate = false;
};

var uiw_m1 = new Mat3(),
    uiw_m2 = new Mat3(),
    uiw_m3 = new Mat3();

/**
 * Update .inertiaWorld and .invInertiaWorld
 * @method updateInertiaWorld
 */
Body.prototype.updateInertiaWorld = function(force){
    var I = this.invInertia;
    if (I.x === I.y && I.y === I.z && !force) {
        // If inertia M = s*I, where I is identity and s a scalar, then
        //    R*M*R' = R*(s*I)*R' = s*R*I*R' = s*R*R' = s*I = M
        // where R is the rotation matrix.
        // In other words, we don't have to transform the inertia if all
        // inertia diagonal entries are equal.
    } else {
        var m1 = uiw_m1,
            m2 = uiw_m2,
            m3 = uiw_m3;
        m1.setRotationFromQuaternion(this.quaternion);
        m1.transpose(m2);
        m1.scale(I,m1);
        m1.mmult(m2,this.invInertiaWorld);
        //m3.getTrace(this.invInertiaWorld);
    }

    /*
    this.quaternion.vmult(this.inertia,this.inertiaWorld);
    this.quaternion.vmult(this.invInertia,this.invInertiaWorld);
    */
};

/**
 * Apply force to a world point. This could for example be a point on the Body surface. Applying force this way will add to Body.force and Body.torque.
 * @method applyForce
 * @param  {Vec3} force The amount of force to add.
 * @param  {Vec3} worldPoint A world point to apply the force on.
 */
var Body_applyForce_r = new Vec3();
var Body_applyForce_rotForce = new Vec3();
Body.prototype.applyForce = function(force,worldPoint){
    if(this.type !== Body.DYNAMIC){
        return;
    }

    // Compute point position relative to the body center
    var r = Body_applyForce_r;
    worldPoint.vsub(this.position,r);

    // Compute produced rotational force
    var rotForce = Body_applyForce_rotForce;
    r.cross(force,rotForce);

    // Add linear force
    this.force.vadd(force,this.force);

    // Add rotational force
    this.torque.vadd(rotForce,this.torque);
};

/**
 * Apply force to a local point in the body.
 * @method applyLocalForce
 * @param  {Vec3} force The force vector to apply, defined locally in the body frame.
 * @param  {Vec3} localPoint A local point in the body to apply the force on.
 */
var Body_applyLocalForce_worldForce = new Vec3();
var Body_applyLocalForce_worldPoint = new Vec3();
Body.prototype.applyLocalForce = function(localForce, localPoint){
    if(this.type !== Body.DYNAMIC){
        return;
    }

    var worldForce = Body_applyLocalForce_worldForce;
    var worldPoint = Body_applyLocalForce_worldPoint;

    // Transform the force vector to world space
    this.vectorToWorldFrame(localForce, worldForce);
    this.pointToWorldFrame(localPoint, worldPoint);

    this.applyForce(worldForce, worldPoint);
};

/**
 * Apply impulse to a world point. This could for example be a point on the Body surface. An impulse is a force added to a body during a short period of time (impulse = force * time). Impulses will be added to Body.velocity and Body.angularVelocity.
 * @method applyImpulse
 * @param  {Vec3} impulse The amount of impulse to add.
 * @param  {Vec3} worldPoint A world point to apply the force on.
 */
var Body_applyImpulse_r = new Vec3();
var Body_applyImpulse_velo = new Vec3();
var Body_applyImpulse_rotVelo = new Vec3();
Body.prototype.applyImpulse = function(impulse, worldPoint){
    if(this.type !== Body.DYNAMIC){
        return;
    }

    // Compute point position relative to the body center
    var r = Body_applyImpulse_r;
    worldPoint.vsub(this.position,r);

    // Compute produced central impulse velocity
    var velo = Body_applyImpulse_velo;
    velo.copy(impulse);
    velo.mult(this.invMass,velo);

    // Add linear impulse
    this.velocity.vadd(velo, this.velocity);

    // Compute produced rotational impulse velocity
    var rotVelo = Body_applyImpulse_rotVelo;
    r.cross(impulse,rotVelo);

    /*
    rotVelo.x *= this.invInertia.x;
    rotVelo.y *= this.invInertia.y;
    rotVelo.z *= this.invInertia.z;
    */
    this.invInertiaWorld.vmult(rotVelo,rotVelo);

    // Add rotational Impulse
    this.angularVelocity.vadd(rotVelo, this.angularVelocity);
};

/**
 * Apply locally-defined impulse to a local point in the body.
 * @method applyLocalImpulse
 * @param  {Vec3} force The force vector to apply, defined locally in the body frame.
 * @param  {Vec3} localPoint A local point in the body to apply the force on.
 */
var Body_applyLocalImpulse_worldImpulse = new Vec3();
var Body_applyLocalImpulse_worldPoint = new Vec3();
Body.prototype.applyLocalImpulse = function(localImpulse, localPoint){
    if(this.type !== Body.DYNAMIC){
        return;
    }

    var worldImpulse = Body_applyLocalImpulse_worldImpulse;
    var worldPoint = Body_applyLocalImpulse_worldPoint;

    // Transform the force vector to world space
    this.vectorToWorldFrame(localImpulse, worldImpulse);
    this.pointToWorldFrame(localPoint, worldPoint);

    this.applyImpulse(worldImpulse, worldPoint);
};

var Body_updateMassProperties_halfExtents = new Vec3();

/**
 * Should be called whenever you change the body shape or mass.
 * @method updateMassProperties
 */
Body.prototype.updateMassProperties = function(){
    var halfExtents = Body_updateMassProperties_halfExtents;

    this.invMass = this.mass > 0 ? 1.0 / this.mass : 0;
    var I = this.inertia;
    var fixed = this.fixedRotation;

    // Approximate with AABB box
    this.computeAABB();
    halfExtents.set(
        (this.aabb.upperBound.x-this.aabb.lowerBound.x) / 2,
        (this.aabb.upperBound.y-this.aabb.lowerBound.y) / 2,
        (this.aabb.upperBound.z-this.aabb.lowerBound.z) / 2
    );
    Box.calculateInertia(halfExtents, this.mass, I);

    this.invInertia.set(
        I.x > 0 && !fixed ? 1.0 / I.x : 0,
        I.y > 0 && !fixed ? 1.0 / I.y : 0,
        I.z > 0 && !fixed ? 1.0 / I.z : 0
    );
    this.updateInertiaWorld(true);
};

/**
 * Get world velocity of a point in the body.
 * @method getVelocityAtWorldPoint
 * @param  {Vec3} worldPoint
 * @param  {Vec3} result
 * @return {Vec3} The result vector.
 */
Body.prototype.getVelocityAtWorldPoint = function(worldPoint, result){
    var r = new Vec3();
    worldPoint.vsub(this.position, r);
    this.angularVelocity.cross(r, result);
    this.velocity.vadd(result, result);
    return result;
};

},{"../collision/AABB":3,"../material/Material":25,"../math/Mat3":27,"../math/Quaternion":28,"../math/Vec3":30,"../shapes/Box":37,"../shapes/Shape":43,"../utils/EventTarget":49}],32:[function(_dereq_,module,exports){
var Body = _dereq_('./Body');
var Vec3 = _dereq_('../math/Vec3');
var Quaternion = _dereq_('../math/Quaternion');
var RaycastResult = _dereq_('../collision/RaycastResult');
var Ray = _dereq_('../collision/Ray');
var WheelInfo = _dereq_('../objects/WheelInfo');

module.exports = RaycastVehicle;

/**
 * Vehicle helper class that casts rays from the wheel positions towards the ground and applies forces.
 * @class RaycastVehicle
 * @constructor
 * @param {object} [options]
 * @param {Body} [options.chassisBody] The car chassis body.
 * @param {integer} [options.indexRightAxis] Axis to use for right. x=0, y=1, z=2
 * @param {integer} [options.indexLeftAxis]
 * @param {integer} [options.indexUpAxis]
 */
function RaycastVehicle(options){

    /**
     * @property {Body} chassisBody
     */
    this.chassisBody = options.chassisBody;

    /**
     * An array of WheelInfo objects.
     * @property {array} wheelInfos
     */
    this.wheelInfos = [];

    /**
     * Will be set to true if the car is sliding.
     * @property {boolean} sliding
     */
    this.sliding = false;

    /**
     * @property {World} world
     */
    this.world = null;

    /**
     * Index of the right axis, 0=x, 1=y, 2=z
     * @property {integer} indexRightAxis
     * @default 1
     */
    this.indexRightAxis = typeof(options.indexRightAxis) !== 'undefined' ? options.indexRightAxis : 1;

    /**
     * Index of the forward axis, 0=x, 1=y, 2=z
     * @property {integer} indexForwardAxis
     * @default 0
     */
    this.indexForwardAxis = typeof(options.indexForwardAxis) !== 'undefined' ? options.indexForwardAxis : 0;

    /**
     * Index of the up axis, 0=x, 1=y, 2=z
     * @property {integer} indexUpAxis
     * @default 2
     */
    this.indexUpAxis = typeof(options.indexUpAxis) !== 'undefined' ? options.indexUpAxis : 2;
}

var tmpVec1 = new Vec3();
var tmpVec2 = new Vec3();
var tmpVec3 = new Vec3();
var tmpVec4 = new Vec3();
var tmpVec5 = new Vec3();
var tmpVec6 = new Vec3();
var tmpRay = new Ray();

/**
 * Add a wheel. For information about the options, see WheelInfo.
 * @method addWheel
 * @param {object} [options]
 */
RaycastVehicle.prototype.addWheel = function(options){
    options = options || {};

    var info = new WheelInfo(options);
    var index = this.wheelInfos.length;
    this.wheelInfos.push(info);

    return index;
};

/**
 * Set the steering value of a wheel.
 * @method setSteeringValue
 * @param {number} value
 * @param {integer} wheelIndex
 */
RaycastVehicle.prototype.setSteeringValue = function(value, wheelIndex){
    var wheel = this.wheelInfos[wheelIndex];
    wheel.steering = value;
};

var torque = new Vec3();

/**
 * Set the wheel force to apply on one of the wheels each time step
 * @method applyEngineForce
 * @param  {number} value
 * @param  {integer} wheelIndex
 */
RaycastVehicle.prototype.applyEngineForce = function(value, wheelIndex){
    this.wheelInfos[wheelIndex].engineForce = value;
};

/**
 * Set the braking force of a wheel
 * @method setBrake
 * @param {number} brake
 * @param {integer} wheelIndex
 */
RaycastVehicle.prototype.setBrake = function(brake, wheelIndex){
    this.wheelInfos[wheelIndex].brake = brake;
};

/**
 * Add the vehicle including its constraints to the world.
 * @method addToWorld
 * @param {World} world
 */
RaycastVehicle.prototype.addToWorld = function(world){
    var constraints = this.constraints;
    world.add(this.chassisBody);
    var that = this;
    this.preStepCallback = function(){
        that.updateVehicle(world.dt);
    };
    world.addEventListener('preStep', this.preStepCallback);
    this.world = world;
};

/**
 * Get one of the wheel axles, world-oriented.
 * @private
 * @method getVehicleAxisWorld
 * @param  {integer} axisIndex
 * @param  {Vec3} result
 */
RaycastVehicle.prototype.getVehicleAxisWorld = function(axisIndex, result){
    result.set(
        axisIndex === 0 ? 1 : 0,
        axisIndex === 1 ? 1 : 0,
        axisIndex === 2 ? 1 : 0
    );
    this.chassisBody.vectorToWorldFrame(result, result);
};

RaycastVehicle.prototype.updateVehicle = function(timeStep){
    var wheelInfos = this.wheelInfos;
    var numWheels = wheelInfos.length;
    var chassisBody = this.chassisBody;

    for (var i = 0; i < numWheels; i++) {
        this.updateWheelTransform(i);
    }

    this.currentVehicleSpeedKmHour = 3.6 * chassisBody.velocity.norm();

    var forwardWorld = new Vec3();
    this.getVehicleAxisWorld(this.indexForwardAxis, forwardWorld);

    if (forwardWorld.dot(chassisBody.velocity) < 0){
        this.currentVehicleSpeedKmHour *= -1;
    }

    // simulate suspension
    for (var i = 0; i < numWheels; i++) {
        this.castRay(wheelInfos[i]);
    }

    this.updateSuspension(timeStep);

    var impulse = new Vec3();
    var relpos = new Vec3();
    for (var i = 0; i < numWheels; i++) {
        //apply suspension force
        var wheel = wheelInfos[i];
        var suspensionForce = wheel.suspensionForce;
        if (suspensionForce > wheel.maxSuspensionForce) {
            suspensionForce = wheel.maxSuspensionForce;
        }
        wheel.raycastResult.hitNormalWorld.scale(suspensionForce * timeStep, impulse);

        wheel.raycastResult.hitPointWorld.vsub(chassisBody.position, relpos);
        chassisBody.applyImpulse(impulse, wheel.raycastResult.hitPointWorld/*relpos*/);
    }

    this.updateFriction(timeStep);

    var hitNormalWorldScaledWithProj = new Vec3();
    var fwd  = new Vec3();
    var vel = new Vec3();
    for (i = 0; i < numWheels; i++) {
        var wheel = wheelInfos[i];
        //var relpos = new Vec3();
        //wheel.chassisConnectionPointWorld.vsub(chassisBody.position, relpos);
        chassisBody.getVelocityAtWorldPoint(wheel.chassisConnectionPointWorld, vel);

        // Hack to get the rotation in the correct direction
        var m = 1;
        switch(this.indexUpAxis){
        case 1:
            m = -1;
            break;
        }

        if (wheel.isInContact) {

            this.getVehicleAxisWorld(this.indexForwardAxis, fwd);
            var proj = fwd.dot(wheel.raycastResult.hitNormalWorld);
            wheel.raycastResult.hitNormalWorld.scale(proj, hitNormalWorldScaledWithProj);

            fwd.vsub(hitNormalWorldScaledWithProj, fwd);

            var proj2 = fwd.dot(vel);
            wheel.deltaRotation = m * proj2 * timeStep / wheel.radius;
        }

        if((wheel.sliding || !wheel.isInContact) && wheel.engineForce !== 0 && wheel.useCustomSlidingRotationalSpeed){
            // Apply custom rotation when accelerating and sliding
            wheel.deltaRotation = (wheel.engineForce > 0 ? 1 : -1) * wheel.customSlidingRotationalSpeed * timeStep;
        }

        // Lock wheels
        if(Math.abs(wheel.brake) > Math.abs(wheel.engineForce)){
            wheel.deltaRotation = 0;
        }

        wheel.rotation += wheel.deltaRotation; // Use the old value
        wheel.deltaRotation *= 0.99; // damping of rotation when not in contact
    }
};

RaycastVehicle.prototype.updateSuspension = function(deltaTime) {
    var chassisBody = this.chassisBody;
    var chassisMass = chassisBody.mass;
    var wheelInfos = this.wheelInfos;
    var numWheels = wheelInfos.length;

    for (var w_it = 0; w_it < numWheels; w_it++){
        var wheel = wheelInfos[w_it];

        if (wheel.isInContact){
            var force;

            // Spring
            var susp_length = wheel.suspensionRestLength;
            var current_length = wheel.suspensionLength;
            var length_diff = (susp_length - current_length);

            force = wheel.suspensionStiffness * length_diff * wheel.clippedInvContactDotSuspension;

            // Damper
            var projected_rel_vel = wheel.suspensionRelativeVelocity;
            var susp_damping;
            if (projected_rel_vel < 0) {
                susp_damping = wheel.dampingCompression;
            } else {
                susp_damping = wheel.dampingRelaxation;
            }
            force -= susp_damping * projected_rel_vel;

            wheel.suspensionForce = force * chassisMass;
            if (wheel.suspensionForce < 0) {
                wheel.suspensionForce = 0;
            }
        } else {
            wheel.suspensionForce = 0;
        }
    }
};

/**
 * Remove the vehicle including its constraints from the world.
 * @method removeFromWorld
 * @param {World} world
 */
RaycastVehicle.prototype.removeFromWorld = function(world){
    var constraints = this.constraints;
    world.remove(this.chassisBody);
    world.removeEventListener('preStep', this.preStepCallback);
    this.world = null;
};

var castRay_rayvector = new Vec3();
var castRay_target = new Vec3();
RaycastVehicle.prototype.castRay = function(wheel) {
    var rayvector = castRay_rayvector;
    var target = castRay_target;

    this.updateWheelTransformWorld(wheel);
    var chassisBody = this.chassisBody;

    var depth = -1;

    var raylen = wheel.suspensionRestLength + wheel.radius;

    wheel.directionWorld.scale(raylen, rayvector);
    var source = wheel.chassisConnectionPointWorld;
    source.vadd(rayvector, target);
    var raycastResult = wheel.raycastResult;

    var param = 0;

    raycastResult.reset();
    // Turn off ray collision with the chassis temporarily
    var oldState = chassisBody.collisionResponse;
    chassisBody.collisionResponse = false;

    // Cast ray against world
    this.world.rayTest(source, target, raycastResult);
    chassisBody.collisionResponse = oldState;

    var object = raycastResult.body;

    wheel.raycastResult.groundObject = 0;

    if (object) {
        depth = raycastResult.distance;
        wheel.raycastResult.hitNormalWorld  = raycastResult.hitNormalWorld;
        wheel.isInContact = true;

        var hitDistance = raycastResult.distance;
        wheel.suspensionLength = hitDistance - wheel.radius;

        // clamp on max suspension travel
        var minSuspensionLength = wheel.suspensionRestLength - wheel.maxSuspensionTravel;
        var maxSuspensionLength = wheel.suspensionRestLength + wheel.maxSuspensionTravel;
        if (wheel.suspensionLength < minSuspensionLength) {
            wheel.suspensionLength = minSuspensionLength;
        }
        if (wheel.suspensionLength > maxSuspensionLength) {
            wheel.suspensionLength = maxSuspensionLength;
            wheel.raycastResult.reset();
        }

        var denominator = wheel.raycastResult.hitNormalWorld.dot(wheel.directionWorld);

        var chassis_velocity_at_contactPoint = new Vec3();
        chassisBody.getVelocityAtWorldPoint(wheel.raycastResult.hitPointWorld, chassis_velocity_at_contactPoint);

        var projVel = wheel.raycastResult.hitNormalWorld.dot( chassis_velocity_at_contactPoint );

        if (denominator >= -0.1) {
            wheel.suspensionRelativeVelocity = 0;
            wheel.clippedInvContactDotSuspension = 1 / 0.1;
        } else {
            var inv = -1 / denominator;
            wheel.suspensionRelativeVelocity = projVel * inv;
            wheel.clippedInvContactDotSuspension = inv;
        }

    } else {

        //put wheel info as in rest position
        wheel.suspensionLength = wheel.suspensionRestLength + 0 * wheel.maxSuspensionTravel;
        wheel.suspensionRelativeVelocity = 0.0;
        wheel.directionWorld.scale(-1, wheel.raycastResult.hitNormalWorld);
        wheel.clippedInvContactDotSuspension = 1.0;
    }

    return depth;
};

RaycastVehicle.prototype.updateWheelTransformWorld = function(wheel){
    wheel.isInContact = false;
    var chassisBody = this.chassisBody;
    chassisBody.pointToWorldFrame(wheel.chassisConnectionPointLocal, wheel.chassisConnectionPointWorld);
    chassisBody.vectorToWorldFrame(wheel.directionLocal, wheel.directionWorld);
    chassisBody.vectorToWorldFrame(wheel.axleLocal, wheel.axleWorld);
};


/**
 * Update one of the wheel transform.
 * Note when rendering wheels: during each step, wheel transforms are updated BEFORE the chassis; ie. their position becomes invalid after the step. Thus when you render wheels, you must update wheel transforms before rendering them. See raycastVehicle demo for an example.
 * @method updateWheelTransform
 * @param {integer} wheelIndex The wheel index to update.
 */
RaycastVehicle.prototype.updateWheelTransform = function(wheelIndex){
    var up = tmpVec4;
    var right = tmpVec5;
    var fwd = tmpVec6;

    var wheel = this.wheelInfos[wheelIndex];
    this.updateWheelTransformWorld(wheel);

    wheel.directionLocal.scale(-1, up);
    right.copy(wheel.axleLocal);
    up.cross(right, fwd);
    fwd.normalize();
    right.normalize();

    // Rotate around steering over the wheelAxle
    var steering = wheel.steering;
    var steeringOrn = new Quaternion();
    steeringOrn.setFromAxisAngle(up, steering);

    var rotatingOrn = new Quaternion();
    rotatingOrn.setFromAxisAngle(right, wheel.rotation);

    // World rotation of the wheel
    var q = wheel.worldTransform.quaternion;
    this.chassisBody.quaternion.mult(steeringOrn, q);
    q.mult(rotatingOrn, q);

    q.normalize();

    // world position of the wheel
    var p = wheel.worldTransform.position;
    p.copy(wheel.directionWorld);
    p.scale(wheel.suspensionLength, p);
    p.vadd(wheel.chassisConnectionPointWorld, p);
};

var directions = [
    new Vec3(1, 0, 0),
    new Vec3(0, 1, 0),
    new Vec3(0, 0, 1)
];

/**
 * Get the world transform of one of the wheels
 * @method getWheelTransformWorld
 * @param  {integer} wheelIndex
 * @return {Transform}
 */
RaycastVehicle.prototype.getWheelTransformWorld = function(wheelIndex) {
    return this.wheelInfos[wheelIndex].worldTransform;
};


var updateFriction_surfNormalWS_scaled_proj = new Vec3();
var updateFriction_axle = [];
var updateFriction_forwardWS = [];
var sideFrictionStiffness2 = 1;
RaycastVehicle.prototype.updateFriction = function(timeStep) {
    var surfNormalWS_scaled_proj = updateFriction_surfNormalWS_scaled_proj;

    //calculate the impulse, so that the wheels don't move sidewards
    var wheelInfos = this.wheelInfos;
    var numWheels = wheelInfos.length;
    var chassisBody = this.chassisBody;
    var forwardWS = updateFriction_forwardWS;
    var axle = updateFriction_axle;

    var numWheelsOnGround = 0;

    for (var i = 0; i < numWheels; i++) {
        var wheel = wheelInfos[i];

        var groundObject = wheel.raycastResult.body;
        if (groundObject){
            numWheelsOnGround++;
        }

        wheel.sideImpulse = 0;
        wheel.forwardImpulse = 0;
        if(!forwardWS[i]){
            forwardWS[i] = new Vec3();
        }
        if(!axle[i]){
            axle[i] = new Vec3();
        }
    }

    for (var i = 0; i < numWheels; i++){
        var wheel = wheelInfos[i];

        var groundObject = wheel.raycastResult.body;

        if (groundObject) {
            var axlei = axle[i];
            var wheelTrans = this.getWheelTransformWorld(i);

            // Get world axle
            wheelTrans.vectorToWorldFrame(directions[this.indexRightAxis], axlei);

            var surfNormalWS = wheel.raycastResult.hitNormalWorld;
            var proj = axlei.dot(surfNormalWS);
            surfNormalWS.scale(proj, surfNormalWS_scaled_proj);
            axlei.vsub(surfNormalWS_scaled_proj, axlei);
            axlei.normalize();

            surfNormalWS.cross(axlei, forwardWS[i]);
            forwardWS[i].normalize();

            wheel.sideImpulse = resolveSingleBilateral(
                chassisBody,
                wheel.raycastResult.hitPointWorld,
                groundObject,
                wheel.raycastResult.hitPointWorld,
                axlei
            );

            wheel.sideImpulse *= sideFrictionStiffness2;
        }
    }

    var sideFactor = 1;
    var fwdFactor = 0.5;

    this.sliding = false;
    for (var i = 0; i < numWheels; i++) {
        var wheel = wheelInfos[i];
        var groundObject = wheel.raycastResult.body;

        var rollingFriction = 0;

        wheel.slipInfo = 1;
        if (groundObject) {
            var defaultRollingFrictionImpulse = 0;
            var maxImpulse = wheel.brake ? wheel.brake : defaultRollingFrictionImpulse;

            // btWheelContactPoint contactPt(chassisBody,groundObject,wheelInfraycastInfo.hitPointWorld,forwardWS[wheel],maxImpulse);
            // rollingFriction = calcRollingFriction(contactPt);
            rollingFriction = calcRollingFriction(chassisBody, groundObject, wheel.raycastResult.hitPointWorld, forwardWS[i], maxImpulse);

            rollingFriction += wheel.engineForce * timeStep;

            // rollingFriction = 0;
            var factor = maxImpulse / rollingFriction;
            wheel.slipInfo *= factor;
        }

        //switch between active rolling (throttle), braking and non-active rolling friction (nthrottle/break)

        wheel.forwardImpulse = 0;
        wheel.skidInfo = 1;

        if (groundObject) {
            wheel.skidInfo = 1;

            var maximp = wheel.suspensionForce * timeStep * wheel.frictionSlip;
            var maximpSide = maximp;

            var maximpSquared = maximp * maximpSide;

            wheel.forwardImpulse = rollingFriction;//wheelInfo.engineForce* timeStep;

            var x = wheel.forwardImpulse * fwdFactor;
            var y = wheel.sideImpulse * sideFactor;

            var impulseSquared = x * x + y * y;

            wheel.sliding = false;
            if (impulseSquared > maximpSquared) {
                this.sliding = true;
                wheel.sliding = true;

                var factor = maximp / Math.sqrt(impulseSquared);

                wheel.skidInfo *= factor;
            }
        }
    }

    if (this.sliding) {
        for (var i = 0; i < numWheels; i++) {
            var wheel = wheelInfos[i];
            if (wheel.sideImpulse !== 0) {
                if (wheel.skidInfo < 1){
                    wheel.forwardImpulse *= wheel.skidInfo;
                    wheel.sideImpulse *= wheel.skidInfo;
                }
            }
        }
    }

    // apply the impulses
    for (var i = 0; i < numWheels; i++) {
        var wheel = wheelInfos[i];

        var rel_pos = new Vec3();
        //wheel.raycastResult.hitPointWorld.vsub(chassisBody.position, rel_pos);
        // cannons applyimpulse is using world coord for the position
        rel_pos.copy(wheel.raycastResult.hitPointWorld);

        if (wheel.forwardImpulse !== 0) {
            var impulse = new Vec3();
            forwardWS[i].scale(wheel.forwardImpulse, impulse);
            chassisBody.applyImpulse(impulse, rel_pos);
        }

        if (wheel.sideImpulse !== 0){
            var groundObject = wheel.raycastResult.body;

            var rel_pos2 = new Vec3();
            //wheel.raycastResult.hitPointWorld.vsub(groundObject.position, rel_pos2);
            rel_pos2.copy(wheel.raycastResult.hitPointWorld);
            var sideImp = new Vec3();
            axle[i].scale(wheel.sideImpulse, sideImp);

            // Scale the relative position in the up direction with rollInfluence.
            // If rollInfluence is 1, the impulse will be applied on the hitPoint (easy to roll over), if it is zero it will be applied in the same plane as the center of mass (not easy to roll over).
            chassisBody.pointToLocalFrame(rel_pos, rel_pos);
            rel_pos['xyz'[this.indexUpAxis]] *= wheel.rollInfluence;
            chassisBody.pointToWorldFrame(rel_pos, rel_pos);
            chassisBody.applyImpulse(sideImp, rel_pos);

            //apply friction impulse on the ground
            sideImp.scale(-1, sideImp);
            groundObject.applyImpulse(sideImp, rel_pos2);
        }
    }
};

var calcRollingFriction_vel1 = new Vec3();
var calcRollingFriction_vel2 = new Vec3();
var calcRollingFriction_vel = new Vec3();

function calcRollingFriction(body0, body1, frictionPosWorld, frictionDirectionWorld, maxImpulse) {
    var j1 = 0;
    var contactPosWorld = frictionPosWorld;

    // var rel_pos1 = new Vec3();
    // var rel_pos2 = new Vec3();
    var vel1 = calcRollingFriction_vel1;
    var vel2 = calcRollingFriction_vel2;
    var vel = calcRollingFriction_vel;
    // contactPosWorld.vsub(body0.position, rel_pos1);
    // contactPosWorld.vsub(body1.position, rel_pos2);

    body0.getVelocityAtWorldPoint(contactPosWorld, vel1);
    body1.getVelocityAtWorldPoint(contactPosWorld, vel2);
    vel1.vsub(vel2, vel);

    var vrel = frictionDirectionWorld.dot(vel);

    var denom0 = computeImpulseDenominator(body0, frictionPosWorld, frictionDirectionWorld);
    var denom1 = computeImpulseDenominator(body1, frictionPosWorld, frictionDirectionWorld);
    var relaxation = 1;
    var jacDiagABInv = relaxation / (denom0 + denom1);

    // calculate j that moves us to zero relative velocity
    j1 = -vrel * jacDiagABInv;

    if (maxImpulse < j1) {
        j1 = maxImpulse;
    }
    if (j1 < -maxImpulse) {
        j1 = -maxImpulse;
    }

    return j1;
}

var computeImpulseDenominator_r0 = new Vec3();
var computeImpulseDenominator_c0 = new Vec3();
var computeImpulseDenominator_vec = new Vec3();
var computeImpulseDenominator_m = new Vec3();
function computeImpulseDenominator(body, pos, normal) {
    var r0 = computeImpulseDenominator_r0;
    var c0 = computeImpulseDenominator_c0;
    var vec = computeImpulseDenominator_vec;
    var m = computeImpulseDenominator_m;

    pos.vsub(body.position, r0);
    r0.cross(normal, c0);
    body.invInertiaWorld.vmult(c0, m);
    m.cross(r0, vec);

    return body.invMass + normal.dot(vec);
}


var resolveSingleBilateral_vel1 = new Vec3();
var resolveSingleBilateral_vel2 = new Vec3();
var resolveSingleBilateral_vel = new Vec3();

//bilateral constraint between two dynamic objects
function resolveSingleBilateral(body1, pos1, body2, pos2, normal, impulse){
    var normalLenSqr = normal.norm2();
    if (normalLenSqr > 1.1){
        return 0; // no impulse
    }
    // var rel_pos1 = new Vec3();
    // var rel_pos2 = new Vec3();
    // pos1.vsub(body1.position, rel_pos1);
    // pos2.vsub(body2.position, rel_pos2);

    var vel1 = resolveSingleBilateral_vel1;
    var vel2 = resolveSingleBilateral_vel2;
    var vel = resolveSingleBilateral_vel;
    body1.getVelocityAtWorldPoint(pos1, vel1);
    body2.getVelocityAtWorldPoint(pos2, vel2);

    vel1.vsub(vel2, vel);

    var rel_vel = normal.dot(vel);

    var contactDamping = 0.2;
    var massTerm = 1 / (body1.invMass + body2.invMass);
    var impulse = - contactDamping * rel_vel * massTerm;

    return impulse;
}
},{"../collision/Ray":9,"../collision/RaycastResult":10,"../math/Quaternion":28,"../math/Vec3":30,"../objects/WheelInfo":36,"./Body":31}],33:[function(_dereq_,module,exports){
var Body = _dereq_('./Body');
var Sphere = _dereq_('../shapes/Sphere');
var Box = _dereq_('../shapes/Box');
var Vec3 = _dereq_('../math/Vec3');
var HingeConstraint = _dereq_('../constraints/HingeConstraint');

module.exports = RigidVehicle;

/**
 * Simple vehicle helper class with spherical rigid body wheels.
 * @class RigidVehicle
 * @constructor
 * @param {Body} [options.chassisBody]
 */
function RigidVehicle(options){
    this.wheelBodies = [];

    /**
     * @property coordinateSystem
     * @type {Vec3}
     */
    this.coordinateSystem = typeof(options.coordinateSystem)==='undefined' ? new Vec3(1, 2, 3) : options.coordinateSystem.clone();

    /**
     * @property {Body} chassisBody
     */
    this.chassisBody = options.chassisBody;

    if(!this.chassisBody){
        // No chassis body given. Create it!
        var chassisShape = new Box(new Vec3(5, 2, 0.5));
        this.chassisBody = new Body(1, chassisShape);
    }

    /**
     * @property constraints
     * @type {Array}
     */
    this.constraints = [];

    this.wheelAxes = [];
    this.wheelForces = [];
}

/**
 * Add a wheel
 * @method addWheel
 * @param {object} options
 * @param {boolean} [options.isFrontWheel]
 * @param {Vec3} [options.position] Position of the wheel, locally in the chassis body.
 * @param {Vec3} [options.direction] Slide direction of the wheel along the suspension.
 * @param {Vec3} [options.axis] Axis of rotation of the wheel, locally defined in the chassis.
 * @param {Body} [options.body] The wheel body.
 */
RigidVehicle.prototype.addWheel = function(options){
    options = options || {};
    var wheelBody = options.body;
    if(!wheelBody){
        wheelBody =  new Body(1, new Sphere(1.2));
    }
    this.wheelBodies.push(wheelBody);
    this.wheelForces.push(0);

    // Position constrain wheels
    var zero = new Vec3();
    var position = typeof(options.position) !== 'undefined' ? options.position.clone() : new Vec3();

    // Set position locally to the chassis
    var worldPosition = new Vec3();
    this.chassisBody.pointToWorldFrame(position, worldPosition);
    wheelBody.position.set(worldPosition.x, worldPosition.y, worldPosition.z);

    // Constrain wheel
    var axis = typeof(options.axis) !== 'undefined' ? options.axis.clone() : new Vec3(0, 1, 0);
    this.wheelAxes.push(axis);

    var hingeConstraint = new HingeConstraint(this.chassisBody, wheelBody, {
        pivotA: position,
        axisA: axis,
        pivotB: Vec3.ZERO,
        axisB: axis,
        collideConnected: false
    });
    this.constraints.push(hingeConstraint);

    return this.wheelBodies.length - 1;
};

/**
 * Set the steering value of a wheel.
 * @method setSteeringValue
 * @param {number} value
 * @param {integer} wheelIndex
 * @todo check coordinateSystem
 */
RigidVehicle.prototype.setSteeringValue = function(value, wheelIndex){
    // Set angle of the hinge axis
    var axis = this.wheelAxes[wheelIndex];

    var c = Math.cos(value),
        s = Math.sin(value),
        x = axis.x,
        y = axis.y;
    this.constraints[wheelIndex].axisA.set(
        c*x -s*y,
        s*x +c*y,
        0
    );
};

/**
 * Set the target rotational speed of the hinge constraint.
 * @method setMotorSpeed
 * @param {number} value
 * @param {integer} wheelIndex
 */
RigidVehicle.prototype.setMotorSpeed = function(value, wheelIndex){
    var hingeConstraint = this.constraints[wheelIndex];
    hingeConstraint.enableMotor();
    hingeConstraint.motorTargetVelocity = value;
};

/**
 * Set the target rotational speed of the hinge constraint.
 * @method disableMotor
 * @param {number} value
 * @param {integer} wheelIndex
 */
RigidVehicle.prototype.disableMotor = function(wheelIndex){
    var hingeConstraint = this.constraints[wheelIndex];
    hingeConstraint.disableMotor();
};

var torque = new Vec3();

/**
 * Set the wheel force to apply on one of the wheels each time step
 * @method setWheelForce
 * @param  {number} value
 * @param  {integer} wheelIndex
 */
RigidVehicle.prototype.setWheelForce = function(value, wheelIndex){
    this.wheelForces[wheelIndex] = value;
};

/**
 * Apply a torque on one of the wheels.
 * @method applyWheelForce
 * @param  {number} value
 * @param  {integer} wheelIndex
 */
RigidVehicle.prototype.applyWheelForce = function(value, wheelIndex){
    var axis = this.wheelAxes[wheelIndex];
    var wheelBody = this.wheelBodies[wheelIndex];
    var bodyTorque = wheelBody.torque;

    axis.scale(value, torque);
    wheelBody.vectorToWorldFrame(torque, torque);
    bodyTorque.vadd(torque, bodyTorque);
};

/**
 * Add the vehicle including its constraints to the world.
 * @method addToWorld
 * @param {World} world
 */
RigidVehicle.prototype.addToWorld = function(world){
    var constraints = this.constraints;
    var bodies = this.wheelBodies.concat([this.chassisBody]);

    for (var i = 0; i < bodies.length; i++) {
        world.add(bodies[i]);
    }

    for (var i = 0; i < constraints.length; i++) {
        world.addConstraint(constraints[i]);
    }

    world.addEventListener('preStep', this._update.bind(this));
};

RigidVehicle.prototype._update = function(){
    var wheelForces = this.wheelForces;
    for (var i = 0; i < wheelForces.length; i++) {
        this.applyWheelForce(wheelForces[i], i);
    }
};

/**
 * Remove the vehicle including its constraints from the world.
 * @method removeFromWorld
 * @param {World} world
 */
RigidVehicle.prototype.removeFromWorld = function(world){
    var constraints = this.constraints;
    var bodies = this.wheelBodies.concat([this.chassisBody]);

    for (var i = 0; i < bodies.length; i++) {
        world.remove(bodies[i]);
    }

    for (var i = 0; i < constraints.length; i++) {
        world.removeConstraint(constraints[i]);
    }
};

var worldAxis = new Vec3();

/**
 * Get current rotational velocity of a wheel
 * @method getWheelSpeed
 * @param {integer} wheelIndex
 */
RigidVehicle.prototype.getWheelSpeed = function(wheelIndex){
    var axis = this.wheelAxes[wheelIndex];
    var wheelBody = this.wheelBodies[wheelIndex];
    var w = wheelBody.angularVelocity;
    this.chassisBody.vectorToWorldFrame(axis, worldAxis);
    return w.dot(worldAxis);
};

},{"../constraints/HingeConstraint":15,"../math/Vec3":30,"../shapes/Box":37,"../shapes/Sphere":44,"./Body":31}],34:[function(_dereq_,module,exports){
module.exports = SPHSystem;

var Shape = _dereq_('../shapes/Shape');
var Vec3 = _dereq_('../math/Vec3');
var Quaternion = _dereq_('../math/Quaternion');
var Particle = _dereq_('../shapes/Particle');
var Body = _dereq_('../objects/Body');
var Material = _dereq_('../material/Material');

/**
 * Smoothed-particle hydrodynamics system
 * @class SPHSystem
 * @constructor
 */
function SPHSystem(){
    this.particles = [];
	
    /**
     * Density of the system (kg/m3).
     * @property {number} density
     */
    this.density = 1;
	
    /**
     * Distance below which two particles are considered to be neighbors.
     * It should be adjusted so there are about 15-20 neighbor particles within this radius.
     * @property {number} smoothingRadius
     */
    this.smoothingRadius = 1;
    this.speedOfSound = 1;
	
    /**
     * Viscosity of the system.
     * @property {number} viscosity
     */
    this.viscosity = 0.01;
    this.eps = 0.000001;

    // Stuff Computed per particle
    this.pressures = [];
    this.densities = [];
    this.neighbors = [];
}

/**
 * Add a particle to the system.
 * @method add
 * @param {Body} particle
 */
SPHSystem.prototype.add = function(particle){
    this.particles.push(particle);
    if(this.neighbors.length < this.particles.length){
        this.neighbors.push([]);
    }
};

/**
 * Remove a particle from the system.
 * @method remove
 * @param {Body} particle
 */
SPHSystem.prototype.remove = function(particle){
    var idx = this.particles.indexOf(particle);
    if(idx !== -1){
        this.particles.splice(idx,1);
        if(this.neighbors.length > this.particles.length){
            this.neighbors.pop();
        }
    }
};

/**
 * Get neighbors within smoothing volume, save in the array neighbors
 * @method getNeighbors
 * @param {Body} particle
 * @param {Array} neighbors
 */
var SPHSystem_getNeighbors_dist = new Vec3();
SPHSystem.prototype.getNeighbors = function(particle,neighbors){
    var N = this.particles.length,
        id = particle.id,
        R2 = this.smoothingRadius * this.smoothingRadius,
        dist = SPHSystem_getNeighbors_dist;
    for(var i=0; i!==N; i++){
        var p = this.particles[i];
        p.position.vsub(particle.position,dist);
        if(id!==p.id && dist.norm2() < R2){
            neighbors.push(p);
        }
    }
};

// Temp vectors for calculation
var SPHSystem_update_dist = new Vec3(),
    SPHSystem_update_a_pressure = new Vec3(),
    SPHSystem_update_a_visc = new Vec3(),
    SPHSystem_update_gradW = new Vec3(),
    SPHSystem_update_r_vec = new Vec3(),
    SPHSystem_update_u = new Vec3(); // Relative velocity
SPHSystem.prototype.update = function(){
    var N = this.particles.length,
        dist = SPHSystem_update_dist,
        cs = this.speedOfSound,
        eps = this.eps;

    for(var i=0; i!==N; i++){
        var p = this.particles[i]; // Current particle
        var neighbors = this.neighbors[i];

        // Get neighbors
        neighbors.length = 0;
        this.getNeighbors(p,neighbors);
        neighbors.push(this.particles[i]); // Add current too
        var numNeighbors = neighbors.length;

        // Accumulate density for the particle
        var sum = 0.0;
        for(var j=0; j!==numNeighbors; j++){

            //printf("Current particle has position %f %f %f\n",objects[id].pos.x(),objects[id].pos.y(),objects[id].pos.z());
            p.position.vsub(neighbors[j].position, dist);
            var len = dist.norm();

            var weight = this.w(len);
            sum += neighbors[j].mass * weight;
        }

        // Save
        this.densities[i] = sum;
        this.pressures[i] = cs * cs * (this.densities[i] - this.density);
    }

    // Add forces

    // Sum to these accelerations
    var a_pressure= SPHSystem_update_a_pressure;
    var a_visc =    SPHSystem_update_a_visc;
    var gradW =     SPHSystem_update_gradW;
    var r_vec =     SPHSystem_update_r_vec;
    var u =         SPHSystem_update_u;

    for(var i=0; i!==N; i++){

        var particle = this.particles[i];

        a_pressure.set(0,0,0);
        a_visc.set(0,0,0);

        // Init vars
        var Pij;
        var nabla;
        var Vij;

        // Sum up for all other neighbors
        var neighbors = this.neighbors[i];
        var numNeighbors = neighbors.length;

        //printf("Neighbors: ");
        for(var j=0; j!==numNeighbors; j++){

            var neighbor = neighbors[j];
            //printf("%d ",nj);

            // Get r once for all..
            particle.position.vsub(neighbor.position,r_vec);
            var r = r_vec.norm();

            // Pressure contribution
            Pij = -neighbor.mass * (this.pressures[i] / (this.densities[i]*this.densities[i] + eps) + this.pressures[j] / (this.densities[j]*this.densities[j] + eps));
            this.gradw(r_vec, gradW);
            // Add to pressure acceleration
            gradW.mult(Pij , gradW);
            a_pressure.vadd(gradW, a_pressure);

            // Viscosity contribution
            neighbor.velocity.vsub(particle.velocity, u);
            u.mult( 1.0 / (0.0001+this.densities[i] * this.densities[j]) * this.viscosity * neighbor.mass , u );
            nabla = this.nablaw(r);
            u.mult(nabla,u);
            // Add to viscosity acceleration
            a_visc.vadd( u, a_visc );
        }

        // Calculate force
        a_visc.mult(particle.mass, a_visc);
        a_pressure.mult(particle.mass, a_pressure);

        // Add force to particles
        particle.force.vadd(a_visc, particle.force);
        particle.force.vadd(a_pressure, particle.force);
    }
};

// Calculate the weight using the W(r) weightfunction
SPHSystem.prototype.w = function(r){
    // 315
    var h = this.smoothingRadius;
    return 315.0/(64.0*Math.PI*Math.pow(h,9)) * Math.pow(h*h-r*r,3);
};

// calculate gradient of the weight function
SPHSystem.prototype.gradw = function(rVec,resultVec){
    var r = rVec.norm(),
        h = this.smoothingRadius;
    rVec.mult(945.0/(32.0*Math.PI*Math.pow(h,9)) * Math.pow((h*h-r*r),2) , resultVec);
};

// Calculate nabla(W)
SPHSystem.prototype.nablaw = function(r){
    var h = this.smoothingRadius;
    var nabla = 945.0/(32.0*Math.PI*Math.pow(h,9)) * (h*h-r*r)*(7*r*r - 3*h*h);
    return nabla;
};

},{"../material/Material":25,"../math/Quaternion":28,"../math/Vec3":30,"../objects/Body":31,"../shapes/Particle":41,"../shapes/Shape":43}],35:[function(_dereq_,module,exports){
var Vec3 = _dereq_('../math/Vec3');

module.exports = Spring;

/**
 * A spring, connecting two bodies.
 *
 * @class Spring
 * @constructor
 * @param {Body} bodyA
 * @param {Body} bodyB
 * @param {Object} [options]
 * @param {number} [options.restLength]   A number > 0. Default: 1
 * @param {number} [options.stiffness]    A number >= 0. Default: 100
 * @param {number} [options.damping]      A number >= 0. Default: 1
 * @param {Vec3}  [options.worldAnchorA] Where to hook the spring to body A, in world coordinates.
 * @param {Vec3}  [options.worldAnchorB]
 * @param {Vec3}  [options.localAnchorA] Where to hook the spring to body A, in local body coordinates.
 * @param {Vec3}  [options.localAnchorB]
 */
function Spring(bodyA,bodyB,options){
    options = options || {};

    /**
     * Rest length of the spring.
     * @property restLength
     * @type {number}
     */
    this.restLength = typeof(options.restLength) === "number" ? options.restLength : 1;

    /**
     * Stiffness of the spring.
     * @property stiffness
     * @type {number}
     */
    this.stiffness = options.stiffness || 100;

    /**
     * Damping of the spring.
     * @property damping
     * @type {number}
     */
    this.damping = options.damping || 1;

    /**
     * First connected body.
     * @property bodyA
     * @type {Body}
     */
    this.bodyA = bodyA;

    /**
     * Second connected body.
     * @property bodyB
     * @type {Body}
     */
    this.bodyB = bodyB;

    /**
     * Anchor for bodyA in local bodyA coordinates.
     * @property localAnchorA
     * @type {Vec3}
     */
    this.localAnchorA = new Vec3();

    /**
     * Anchor for bodyB in local bodyB coordinates.
     * @property localAnchorB
     * @type {Vec3}
     */
    this.localAnchorB = new Vec3();

    if(options.localAnchorA){
        this.localAnchorA.copy(options.localAnchorA);
    }
    if(options.localAnchorB){
        this.localAnchorB.copy(options.localAnchorB);
    }
    if(options.worldAnchorA){
        this.setWorldAnchorA(options.worldAnchorA);
    }
    if(options.worldAnchorB){
        this.setWorldAnchorB(options.worldAnchorB);
    }
}

/**
 * Set the anchor point on body A, using world coordinates.
 * @method setWorldAnchorA
 * @param {Vec3} worldAnchorA
 */
Spring.prototype.setWorldAnchorA = function(worldAnchorA){
    this.bodyA.pointToLocalFrame(worldAnchorA,this.localAnchorA);
};

/**
 * Set the anchor point on body B, using world coordinates.
 * @method setWorldAnchorB
 * @param {Vec3} worldAnchorB
 */
Spring.prototype.setWorldAnchorB = function(worldAnchorB){
    this.bodyB.pointToLocalFrame(worldAnchorB,this.localAnchorB);
};

/**
 * Get the anchor point on body A, in world coordinates.
 * @method getWorldAnchorA
 * @param {Vec3} result The vector to store the result in.
 */
Spring.prototype.getWorldAnchorA = function(result){
    this.bodyA.pointToWorldFrame(this.localAnchorA,result);
};

/**
 * Get the anchor point on body B, in world coordinates.
 * @method getWorldAnchorB
 * @param {Vec3} result The vector to store the result in.
 */
Spring.prototype.getWorldAnchorB = function(result){
    this.bodyB.pointToWorldFrame(this.localAnchorB,result);
};

var applyForce_r =              new Vec3(),
    applyForce_r_unit =         new Vec3(),
    applyForce_u =              new Vec3(),
    applyForce_f =              new Vec3(),
    applyForce_worldAnchorA =   new Vec3(),
    applyForce_worldAnchorB =   new Vec3(),
    applyForce_ri =             new Vec3(),
    applyForce_rj =             new Vec3(),
    applyForce_ri_x_f =         new Vec3(),
    applyForce_rj_x_f =         new Vec3(),
    applyForce_tmp =            new Vec3();

/**
 * Apply the spring force to the connected bodies.
 * @method applyForce
 */
Spring.prototype.applyForce = function(){
    var k = this.stiffness,
        d = this.damping,
        l = this.restLength,
        bodyA = this.bodyA,
        bodyB = this.bodyB,
        r = applyForce_r,
        r_unit = applyForce_r_unit,
        u = applyForce_u,
        f = applyForce_f,
        tmp = applyForce_tmp;

    var worldAnchorA = applyForce_worldAnchorA,
        worldAnchorB = applyForce_worldAnchorB,
        ri = applyForce_ri,
        rj = applyForce_rj,
        ri_x_f = applyForce_ri_x_f,
        rj_x_f = applyForce_rj_x_f;

    // Get world anchors
    this.getWorldAnchorA(worldAnchorA);
    this.getWorldAnchorB(worldAnchorB);

    // Get offset points
    worldAnchorA.vsub(bodyA.position,ri);
    worldAnchorB.vsub(bodyB.position,rj);

    // Compute distance vector between world anchor points
    worldAnchorB.vsub(worldAnchorA,r);
    var rlen = r.norm();
    r_unit.copy(r);
    r_unit.normalize();

    // Compute relative velocity of the anchor points, u
    bodyB.velocity.vsub(bodyA.velocity,u);
    // Add rotational velocity

    bodyB.angularVelocity.cross(rj,tmp);
    u.vadd(tmp,u);
    bodyA.angularVelocity.cross(ri,tmp);
    u.vsub(tmp,u);

    // F = - k * ( x - L ) - D * ( u )
    r_unit.mult(-k*(rlen-l) - d*u.dot(r_unit), f);

    // Add forces to bodies
    bodyA.force.vsub(f,bodyA.force);
    bodyB.force.vadd(f,bodyB.force);

    // Angular force
    ri.cross(f,ri_x_f);
    rj.cross(f,rj_x_f);
    bodyA.torque.vsub(ri_x_f,bodyA.torque);
    bodyB.torque.vadd(rj_x_f,bodyB.torque);
};

},{"../math/Vec3":30}],36:[function(_dereq_,module,exports){
var Vec3 = _dereq_('../math/Vec3');
var Transform = _dereq_('../math/Transform');
var RaycastResult = _dereq_('../collision/RaycastResult');
var Utils = _dereq_('../utils/Utils');

module.exports = WheelInfo;

/**
 * @class WheelInfo
 * @constructor
 * @param {Object} [options]
 *
 * @param {Vec3} [options.chassisConnectionPointLocal]
 * @param {Vec3} [options.chassisConnectionPointWorld]
 * @param {Vec3} [options.directionLocal]
 * @param {Vec3} [options.directionWorld]
 * @param {Vec3} [options.axleLocal]
 * @param {Vec3} [options.axleWorld]
 * @param {number} [options.suspensionRestLength=1]
 * @param {number} [options.suspensionMaxLength=2]
 * @param {number} [options.radius=1]
 * @param {number} [options.suspensionStiffness=100]
 * @param {number} [options.dampingCompression=10]
 * @param {number} [options.dampingRelaxation=10]
 * @param {number} [options.frictionSlip=10000]
 * @param {number} [options.steering=0]
 * @param {number} [options.rotation=0]
 * @param {number} [options.deltaRotation=0]
 * @param {number} [options.rollInfluence=0.01]
 * @param {number} [options.maxSuspensionForce]
 * @param {boolean} [options.isFrontWheel=true]
 * @param {number} [options.clippedInvContactDotSuspension=1]
 * @param {number} [options.suspensionRelativeVelocity=0]
 * @param {number} [options.suspensionForce=0]
 * @param {number} [options.skidInfo=0]
 * @param {number} [options.suspensionLength=0]
 * @param {number} [options.maxSuspensionTravel=1]
 * @param {boolean} [options.useCustomSlidingRotationalSpeed=false]
 * @param {number} [options.customSlidingRotationalSpeed=-0.1]
 */
function WheelInfo(options){
    options = Utils.defaults(options, {
        chassisConnectionPointLocal: new Vec3(),
        chassisConnectionPointWorld: new Vec3(),
        directionLocal: new Vec3(),
        directionWorld: new Vec3(),
        axleLocal: new Vec3(),
        axleWorld: new Vec3(),
        suspensionRestLength: 1,
        suspensionMaxLength: 2,
        radius: 1,
        suspensionStiffness: 100,
        dampingCompression: 10,
        dampingRelaxation: 10,
        frictionSlip: 10000,
        steering: 0,
        rotation: 0,
        deltaRotation: 0,
        rollInfluence: 0.01,
        maxSuspensionForce: Number.MAX_VALUE,
        isFrontWheel: true,
        clippedInvContactDotSuspension: 1,
        suspensionRelativeVelocity: 0,
        suspensionForce: 0,
        skidInfo: 0,
        suspensionLength: 0,
        maxSuspensionTravel: 1,
        useCustomSlidingRotationalSpeed: false,
        customSlidingRotationalSpeed: -0.1
    });

    /**
     * Max travel distance of the suspension, in meters.
     * @property {number} maxSuspensionTravel
     */
    this.maxSuspensionTravel = options.maxSuspensionTravel;

    /**
     * Speed to apply to the wheel rotation when the wheel is sliding.
     * @property {number} customSlidingRotationalSpeed
     */
    this.customSlidingRotationalSpeed = options.customSlidingRotationalSpeed;

    /**
     * If the customSlidingRotationalSpeed should be used.
     * @property {Boolean} useCustomSlidingRotationalSpeed
     */
    this.useCustomSlidingRotationalSpeed = options.useCustomSlidingRotationalSpeed;

    /**
     * @property {Boolean} sliding
     */
    this.sliding = false;

    /**
     * Connection point, defined locally in the chassis body frame.
     * @property {Vec3} chassisConnectionPointLocal
     */
    this.chassisConnectionPointLocal = options.chassisConnectionPointLocal.clone();

    /**
     * @property {Vec3} chassisConnectionPointWorld
     */
    this.chassisConnectionPointWorld = options.chassisConnectionPointWorld.clone();

    /**
     * @property {Vec3} directionLocal
     */
    this.directionLocal = options.directionLocal.clone();

    /**
     * @property {Vec3} directionWorld
     */
    this.directionWorld = options.directionWorld.clone();

    /**
     * @property {Vec3} axleLocal
     */
    this.axleLocal = options.axleLocal.clone();

    /**
     * @property {Vec3} axleWorld
     */
    this.axleWorld = options.axleWorld.clone();

    /**
     * @property {number} suspensionRestLength
     */
    this.suspensionRestLength = options.suspensionRestLength;

    /**
     * @property {number} suspensionMaxLength
     */
    this.suspensionMaxLength = options.suspensionMaxLength;

    /**
     * @property {number} radius
     */
    this.radius = options.radius;

    /**
     * @property {number} suspensionStiffness
     */
    this.suspensionStiffness = options.suspensionStiffness;

    /**
     * @property {number} dampingCompression
     */
    this.dampingCompression = options.dampingCompression;

    /**
     * @property {number} dampingRelaxation
     */
    this.dampingRelaxation = options.dampingRelaxation;

    /**
     * @property {number} frictionSlip
     */
    this.frictionSlip = options.frictionSlip;

    /**
     * @property {number} steering
     */
    this.steering = 0;

    /**
     * Rotation value, in radians.
     * @property {number} rotation
     */
    this.rotation = 0;

    /**
     * @property {number} deltaRotation
     */
    this.deltaRotation = 0;

    /**
     * @property {number} rollInfluence
     */
    this.rollInfluence = options.rollInfluence;

    /**
     * @property {number} maxSuspensionForce
     */
    this.maxSuspensionForce = options.maxSuspensionForce;

    /**
     * @property {number} engineForce
     */
    this.engineForce = 0;

    /**
     * @property {number} brake
     */
    this.brake = 0;

    /**
     * @property {number} isFrontWheel
     */
    this.isFrontWheel = options.isFrontWheel;

    /**
     * @property {number} clippedInvContactDotSuspension
     */
    this.clippedInvContactDotSuspension = 1;

    /**
     * @property {number} suspensionRelativeVelocity
     */
    this.suspensionRelativeVelocity = 0;

    /**
     * @property {number} suspensionForce
     */
    this.suspensionForce = 0;

    /**
     * @property {number} skidInfo
     */
    this.skidInfo = 0;

    /**
     * @property {number} suspensionLength
     */
    this.suspensionLength = 0;

    /**
     * @property {number} sideImpulse
     */
    this.sideImpulse = 0;

    /**
     * @property {number} forwardImpulse
     */
    this.forwardImpulse = 0;

    /**
     * The result from raycasting
     * @property {RaycastResult} raycastResult
     */
    this.raycastResult = new RaycastResult();

    /**
     * Wheel world transform
     * @property {Transform} worldTransform
     */
    this.worldTransform = new Transform();

    /**
     * @property {boolean} isInContact
     */
    this.isInContact = false;
}

var chassis_velocity_at_contactPoint = new Vec3();
var relpos = new Vec3();
var chassis_velocity_at_contactPoint = new Vec3();
WheelInfo.prototype.updateWheel = function(chassis){
    var raycastResult = this.raycastResult;

    if (this.isInContact){
        var project= raycastResult.hitNormalWorld.dot(raycastResult.directionWorld);
        raycastResult.hitPointWorld.vsub(chassis.position, relpos);
        chassis.getVelocityAtWorldPoint(relpos, chassis_velocity_at_contactPoint);
        var projVel = raycastResult.hitNormalWorld.dot( chassis_velocity_at_contactPoint );
        if (project >= -0.1) {
            this.suspensionRelativeVelocity = 0.0;
            this.clippedInvContactDotSuspension = 1.0 / 0.1;
        } else {
            var inv = -1 / project;
            this.suspensionRelativeVelocity = projVel * inv;
            this.clippedInvContactDotSuspension = inv;
        }

    } else {
        // Not in contact : position wheel in a nice (rest length) position
        raycastResult.suspensionLength = this.suspensionRestLength;
        this.suspensionRelativeVelocity = 0.0;
        raycastResult.directionWorld.scale(-1, raycastResult.hitNormalWorld);
        this.clippedInvContactDotSuspension = 1.0;
    }
};
},{"../collision/RaycastResult":10,"../math/Transform":29,"../math/Vec3":30,"../utils/Utils":53}],37:[function(_dereq_,module,exports){
module.exports = Box;

var Shape = _dereq_('./Shape');
var Vec3 = _dereq_('../math/Vec3');
var ConvexPolyhedron = _dereq_('./ConvexPolyhedron');

/**
 * A 3d box shape.
 * @class Box
 * @constructor
 * @param {Vec3} halfExtents
 * @author schteppe
 * @extends Shape
 */
function Box(halfExtents){
    Shape.call(this);

    this.type = Shape.types.BOX;

    /**
     * @property halfExtents
     * @type {Vec3}
     */
    this.halfExtents = halfExtents;

    /**
     * Used by the contact generator to make contacts with other convex polyhedra for example
     * @property convexPolyhedronRepresentation
     * @type {ConvexPolyhedron}
     */
    this.convexPolyhedronRepresentation = null;

    this.updateConvexPolyhedronRepresentation();
    this.updateBoundingSphereRadius();
}
Box.prototype = new Shape();
Box.prototype.constructor = Box;

/**
 * Updates the local convex polyhedron representation used for some collisions.
 * @method updateConvexPolyhedronRepresentation
 */
Box.prototype.updateConvexPolyhedronRepresentation = function(){
    var sx = this.halfExtents.x;
    var sy = this.halfExtents.y;
    var sz = this.halfExtents.z;
    var V = Vec3;

    var vertices = [
        new V(-sx,-sy,-sz),
        new V( sx,-sy,-sz),
        new V( sx, sy,-sz),
        new V(-sx, sy,-sz),
        new V(-sx,-sy, sz),
        new V( sx,-sy, sz),
        new V( sx, sy, sz),
        new V(-sx, sy, sz)
    ];

    var indices = [
        [3,2,1,0], // -z
        [4,5,6,7], // +z
        [5,4,0,1], // -y
        [2,3,7,6], // +y
        [0,4,7,3], // -x
        [1,2,6,5], // +x
    ];

    var axes = [
        new V(0, 0, 1),
        new V(0, 1, 0),
        new V(1, 0, 0)
    ];

    var h = new ConvexPolyhedron(vertices, indices);
    this.convexPolyhedronRepresentation = h;
    h.material = this.material;
};

/**
 * @method calculateLocalInertia
 * @param  {Number} mass
 * @param  {Vec3} target
 * @return {Vec3}
 */
Box.prototype.calculateLocalInertia = function(mass,target){
    target = target || new Vec3();
    Box.calculateInertia(this.halfExtents, mass, target);
    return target;
};

Box.calculateInertia = function(halfExtents,mass,target){
    var e = halfExtents;
    target.x = 1.0 / 12.0 * mass * (   2*e.y*2*e.y + 2*e.z*2*e.z );
    target.y = 1.0 / 12.0 * mass * (   2*e.x*2*e.x + 2*e.z*2*e.z );
    target.z = 1.0 / 12.0 * mass * (   2*e.y*2*e.y + 2*e.x*2*e.x );
};

/**
 * Get the box 6 side normals
 * @method getSideNormals
 * @param {array}      sixTargetVectors An array of 6 vectors, to store the resulting side normals in.
 * @param {Quaternion} quat             Orientation to apply to the normal vectors. If not provided, the vectors will be in respect to the local frame.
 * @return {array}
 */
Box.prototype.getSideNormals = function(sixTargetVectors,quat){
    var sides = sixTargetVectors;
    var ex = this.halfExtents;
    sides[0].set(  ex.x,     0,     0);
    sides[1].set(     0,  ex.y,     0);
    sides[2].set(     0,     0,  ex.z);
    sides[3].set( -ex.x,     0,     0);
    sides[4].set(     0, -ex.y,     0);
    sides[5].set(     0,     0, -ex.z);

    if(quat!==undefined){
        for(var i=0; i!==sides.length; i++){
            quat.vmult(sides[i],sides[i]);
        }
    }

    return sides;
};

Box.prototype.volume = function(){
    return 8.0 * this.halfExtents.x * this.halfExtents.y * this.halfExtents.z;
};

Box.prototype.updateBoundingSphereRadius = function(){
    this.boundingSphereRadius = this.halfExtents.norm();
};

var worldCornerTempPos = new Vec3();
var worldCornerTempNeg = new Vec3();
Box.prototype.forEachWorldCorner = function(pos,quat,callback){

    var e = this.halfExtents;
    var corners = [[  e.x,  e.y,  e.z],
                   [ -e.x,  e.y,  e.z],
                   [ -e.x, -e.y,  e.z],
                   [ -e.x, -e.y, -e.z],
                   [  e.x, -e.y, -e.z],
                   [  e.x,  e.y, -e.z],
                   [ -e.x,  e.y, -e.z],
                   [  e.x, -e.y,  e.z]];
    for(var i=0; i<corners.length; i++){
        worldCornerTempPos.set(corners[i][0],corners[i][1],corners[i][2]);
        quat.vmult(worldCornerTempPos,worldCornerTempPos);
        pos.vadd(worldCornerTempPos,worldCornerTempPos);
        callback(worldCornerTempPos.x,
                 worldCornerTempPos.y,
                 worldCornerTempPos.z);
    }
};

var worldCornersTemp = [
    new Vec3(),
    new Vec3(),
    new Vec3(),
    new Vec3(),
    new Vec3(),
    new Vec3(),
    new Vec3(),
    new Vec3()
];
Box.prototype.calculateWorldAABB = function(pos,quat,min,max){

    var e = this.halfExtents;
    worldCornersTemp[0].set(e.x, e.y, e.z);
    worldCornersTemp[1].set(-e.x,  e.y, e.z);
    worldCornersTemp[2].set(-e.x, -e.y, e.z);
    worldCornersTemp[3].set(-e.x, -e.y, -e.z);
    worldCornersTemp[4].set(e.x, -e.y, -e.z);
    worldCornersTemp[5].set(e.x,  e.y, -e.z);
    worldCornersTemp[6].set(-e.x,  e.y, -e.z);
    worldCornersTemp[7].set(e.x, -e.y,  e.z);

    var wc = worldCornersTemp[0];
    quat.vmult(wc, wc);
    pos.vadd(wc, wc);
    max.copy(wc);
    min.copy(wc);
    for(var i=1; i<8; i++){
        var wc = worldCornersTemp[i];
        quat.vmult(wc, wc);
        pos.vadd(wc, wc);
        var x = wc.x;
        var y = wc.y;
        var z = wc.z;
        if(x > max.x){
            max.x = x;
        }
        if(y > max.y){
            max.y = y;
        }
        if(z > max.z){
            max.z = z;
        }

        if(x < min.x){
            min.x = x;
        }
        if(y < min.y){
            min.y = y;
        }
        if(z < min.z){
            min.z = z;
        }
    }

    // Get each axis max
    // min.set(Infinity,Infinity,Infinity);
    // max.set(-Infinity,-Infinity,-Infinity);
    // this.forEachWorldCorner(pos,quat,function(x,y,z){
    //     if(x > max.x){
    //         max.x = x;
    //     }
    //     if(y > max.y){
    //         max.y = y;
    //     }
    //     if(z > max.z){
    //         max.z = z;
    //     }

    //     if(x < min.x){
    //         min.x = x;
    //     }
    //     if(y < min.y){
    //         min.y = y;
    //     }
    //     if(z < min.z){
    //         min.z = z;
    //     }
    // });
};

},{"../math/Vec3":30,"./ConvexPolyhedron":38,"./Shape":43}],38:[function(_dereq_,module,exports){
module.exports = ConvexPolyhedron;

var Shape = _dereq_('./Shape');
var Vec3 = _dereq_('../math/Vec3');
var Quaternion = _dereq_('../math/Quaternion');
var Transform = _dereq_('../math/Transform');

/**
 * A set of polygons describing a convex shape.
 * @class ConvexPolyhedron
 * @constructor
 * @extends Shape
 * @description The shape MUST be convex for the code to work properly. No polygons may be coplanar (contained
 * in the same 3D plane), instead these should be merged into one polygon.
 *
 * @param {array} points An array of Vec3's
 * @param {array} faces Array of integer arrays, describing which vertices that is included in each face.
 *
 * @author qiao / https://github.com/qiao (original author, see https://github.com/qiao/three.js/commit/85026f0c769e4000148a67d45a9e9b9c5108836f)
 * @author schteppe / https://github.com/schteppe
 * @see http://www.altdevblogaday.com/2011/05/13/contact-generation-between-3d-convex-meshes/
 * @see http://bullet.googlecode.com/svn/trunk/src/BulletCollision/NarrowPhaseCollision/btPolyhedralContactClipping.cpp
 *
 * @todo Move the clipping functions to ContactGenerator?
 * @todo Automatically merge coplanar polygons in constructor.
 */
function ConvexPolyhedron(points, faces, uniqueAxes) {
    var that = this;
    Shape.call(this);
    this.type = Shape.types.CONVEXPOLYHEDRON;

    /**
     * Array of Vec3
     * @property vertices
     * @type {Array}
     */
    this.vertices = points||[];

    this.worldVertices = []; // World transformed version of .vertices
    this.worldVerticesNeedsUpdate = true;

    /**
     * Array of integer arrays, indicating which vertices each face consists of
     * @property faces
     * @type {Array}
     */
    this.faces = faces||[];

    /**
     * Array of Vec3
     * @property faceNormals
     * @type {Array}
     */
    this.faceNormals = [];
    this.computeNormals();

    this.worldFaceNormalsNeedsUpdate = true;
    this.worldFaceNormals = []; // World transformed version of .faceNormals

    /**
     * Array of Vec3
     * @property uniqueEdges
     * @type {Array}
     */
    this.uniqueEdges = [];

    /**
     * If given, these locally defined, normalized axes are the only ones being checked when doing separating axis check.
     * @property {Array} uniqueAxes
     */
    this.uniqueAxes = uniqueAxes ? uniqueAxes.slice() : null;

    this.computeEdges();
    this.updateBoundingSphereRadius();
}
ConvexPolyhedron.prototype = new Shape();
ConvexPolyhedron.prototype.constructor = ConvexPolyhedron;

var computeEdges_tmpEdge = new Vec3();
/**
 * Computes uniqueEdges
 * @method computeEdges
 */
ConvexPolyhedron.prototype.computeEdges = function(){
    var faces = this.faces;
    var vertices = this.vertices;
    var nv = vertices.length;
    var edges = this.uniqueEdges;

    edges.length = 0;

    var edge = computeEdges_tmpEdge;

    for(var i=0; i !== faces.length; i++){
        var face = faces[i];
        var numVertices = face.length;
        for(var j = 0; j !== numVertices; j++){
            var k = ( j+1 ) % numVertices;
            vertices[face[j]].vsub(vertices[face[k]], edge);
            edge.normalize();
            var found = false;
            for(var p=0; p !== edges.length; p++){
                if (edges[p].almostEquals(edge) || edges[p].almostEquals(edge)){
                    found = true;
                    break;
                }
            }

            if (!found){
                edges.push(edge.clone());
            }
        }
    }
};

/**
 * Compute the normals of the faces. Will reuse existing Vec3 objects in the .faceNormals array if they exist.
 * @method computeNormals
 */
ConvexPolyhedron.prototype.computeNormals = function(){
    this.faceNormals.length = this.faces.length;

    // Generate normals
    for(var i=0; i<this.faces.length; i++){

        // Check so all vertices exists for this face
        for(var j=0; j<this.faces[i].length; j++){
            if(!this.vertices[this.faces[i][j]]){
                throw new Error("Vertex "+this.faces[i][j]+" not found!");
            }
        }

        var n = this.faceNormals[i] || new Vec3();
        this.getFaceNormal(i,n);
        n.negate(n);
        this.faceNormals[i] = n;
        var vertex = this.vertices[this.faces[i][0]];
        if(n.dot(vertex) < 0){
            console.error(".faceNormals[" + i + "] = Vec3("+n.toString()+") looks like it points into the shape? The vertices follow. Make sure they are ordered CCW around the normal, using the right hand rule.");
            for(var j=0; j<this.faces[i].length; j++){
                console.warn(".vertices["+this.faces[i][j]+"] = Vec3("+this.vertices[this.faces[i][j]].toString()+")");
            }
        }
    }
};

/**
 * Get face normal given 3 vertices
 * @static
 * @method getFaceNormal
 * @param {Vec3} va
 * @param {Vec3} vb
 * @param {Vec3} vc
 * @param {Vec3} target
 */
var cb = new Vec3();
var ab = new Vec3();
ConvexPolyhedron.computeNormal = function ( va, vb, vc, target ) {
    vb.vsub(va,ab);
    vc.vsub(vb,cb);
    cb.cross(ab,target);
    if ( !target.isZero() ) {
        target.normalize();
    }
};

/**
 * Compute the normal of a face from its vertices
 * @method getFaceNormal
 * @param  {Number} i
 * @param  {Vec3} target
 */
ConvexPolyhedron.prototype.getFaceNormal = function(i,target){
    var f = this.faces[i];
    var va = this.vertices[f[0]];
    var vb = this.vertices[f[1]];
    var vc = this.vertices[f[2]];
    return ConvexPolyhedron.computeNormal(va,vb,vc,target);
};

/**
 * @method clipAgainstHull
 * @param {Vec3} posA
 * @param {Quaternion} quatA
 * @param {ConvexPolyhedron} hullB
 * @param {Vec3} posB
 * @param {Quaternion} quatB
 * @param {Vec3} separatingNormal
 * @param {Number} minDist Clamp distance
 * @param {Number} maxDist
 * @param {array} result The an array of contact point objects, see clipFaceAgainstHull
 * @see http://bullet.googlecode.com/svn/trunk/src/BulletCollision/NarrowPhaseCollision/btPolyhedralContactClipping.cpp
 */
var cah_WorldNormal = new Vec3();
ConvexPolyhedron.prototype.clipAgainstHull = function(posA,quatA,hullB,posB,quatB,separatingNormal,minDist,maxDist,result){
    var WorldNormal = cah_WorldNormal;
    var hullA = this;
    var curMaxDist = maxDist;
    var closestFaceB = -1;
    var dmax = -Number.MAX_VALUE;
    for(var face=0; face < hullB.faces.length; face++){
        WorldNormal.copy(hullB.faceNormals[face]);
        quatB.vmult(WorldNormal,WorldNormal);
        //posB.vadd(WorldNormal,WorldNormal);
        var d = WorldNormal.dot(separatingNormal);
        if (d > dmax){
            dmax = d;
            closestFaceB = face;
        }
    }
    var worldVertsB1 = [];
    var polyB = hullB.faces[closestFaceB];
    var numVertices = polyB.length;
    for(var e0=0; e0<numVertices; e0++){
        var b = hullB.vertices[polyB[e0]];
        var worldb = new Vec3();
        worldb.copy(b);
        quatB.vmult(worldb,worldb);
        posB.vadd(worldb,worldb);
        worldVertsB1.push(worldb);
    }

    if (closestFaceB>=0){
        this.clipFaceAgainstHull(separatingNormal,
                                 posA,
                                 quatA,
                                 worldVertsB1,
                                 minDist,
                                 maxDist,
                                 result);
    }
};

/**
 * Find the separating axis between this hull and another
 * @method findSeparatingAxis
 * @param {ConvexPolyhedron} hullB
 * @param {Vec3} posA
 * @param {Quaternion} quatA
 * @param {Vec3} posB
 * @param {Quaternion} quatB
 * @param {Vec3} target The target vector to save the axis in
 * @return {bool} Returns false if a separation is found, else true
 */
var fsa_faceANormalWS3 = new Vec3(),
    fsa_Worldnormal1 = new Vec3(),
    fsa_deltaC = new Vec3(),
    fsa_worldEdge0 = new Vec3(),
    fsa_worldEdge1 = new Vec3(),
    fsa_Cross = new Vec3();
ConvexPolyhedron.prototype.findSeparatingAxis = function(hullB,posA,quatA,posB,quatB,target, faceListA, faceListB){
    var faceANormalWS3 = fsa_faceANormalWS3,
        Worldnormal1 = fsa_Worldnormal1,
        deltaC = fsa_deltaC,
        worldEdge0 = fsa_worldEdge0,
        worldEdge1 = fsa_worldEdge1,
        Cross = fsa_Cross;

    var dmin = Number.MAX_VALUE;
    var hullA = this;
    var curPlaneTests=0;

    if(!hullA.uniqueAxes){

        var numFacesA = faceListA ? faceListA.length : hullA.faces.length;

        // Test face normals from hullA
        for(var i=0; i<numFacesA; i++){
            var fi = faceListA ? faceListA[i] : i;

            // Get world face normal
            faceANormalWS3.copy(hullA.faceNormals[fi]);
            quatA.vmult(faceANormalWS3,faceANormalWS3);

            var d = hullA.testSepAxis(faceANormalWS3, hullB, posA, quatA, posB, quatB);
            if(d===false){
                return false;
            }

            if(d<dmin){
                dmin = d;
                target.copy(faceANormalWS3);
            }
        }

    } else {

        // Test unique axes
        for(var i = 0; i !== hullA.uniqueAxes.length; i++){

            // Get world axis
            quatA.vmult(hullA.uniqueAxes[i],faceANormalWS3);

            var d = hullA.testSepAxis(faceANormalWS3, hullB, posA, quatA, posB, quatB);
            if(d===false){
                return false;
            }

            if(d<dmin){
                dmin = d;
                target.copy(faceANormalWS3);
            }
        }
    }

    if(!hullB.uniqueAxes){

        // Test face normals from hullB
        var numFacesB = faceListB ? faceListB.length : hullB.faces.length;
        for(var i=0;i<numFacesB;i++){

            var fi = faceListB ? faceListB[i] : i;

            Worldnormal1.copy(hullB.faceNormals[fi]);
            quatB.vmult(Worldnormal1,Worldnormal1);
            curPlaneTests++;
            var d = hullA.testSepAxis(Worldnormal1, hullB,posA,quatA,posB,quatB);
            if(d===false){
                return false;
            }

            if(d<dmin){
                dmin = d;
                target.copy(Worldnormal1);
            }
        }
    } else {

        // Test unique axes in B
        for(var i = 0; i !== hullB.uniqueAxes.length; i++){
            quatB.vmult(hullB.uniqueAxes[i],Worldnormal1);

            curPlaneTests++;
            var d = hullA.testSepAxis(Worldnormal1, hullB,posA,quatA,posB,quatB);
            if(d===false){
                return false;
            }

            if(d<dmin){
                dmin = d;
                target.copy(Worldnormal1);
            }
        }
    }

    // Test edges
    for(var e0=0; e0 !== hullA.uniqueEdges.length; e0++){

        // Get world edge
        quatA.vmult(hullA.uniqueEdges[e0],worldEdge0);

        for(var e1=0; e1 !== hullB.uniqueEdges.length; e1++){

            // Get world edge 2
            quatB.vmult(hullB.uniqueEdges[e1], worldEdge1);
            worldEdge0.cross(worldEdge1,Cross);

            if(!Cross.almostZero()){
                Cross.normalize();
                var dist = hullA.testSepAxis(Cross, hullB, posA, quatA, posB, quatB);
                if(dist === false){
                    return false;
                }
                if(dist < dmin){
                    dmin = dist;
                    target.copy(Cross);
                }
            }
        }
    }

    posB.vsub(posA,deltaC);
    if((deltaC.dot(target))>0.0){
        target.negate(target);
    }

    return true;
};

var maxminA=[], maxminB=[];

/**
 * Test separating axis against two hulls. Both hulls are projected onto the axis and the overlap size is returned if there is one.
 * @method testSepAxis
 * @param {Vec3} axis
 * @param {ConvexPolyhedron} hullB
 * @param {Vec3} posA
 * @param {Quaternion} quatA
 * @param {Vec3} posB
 * @param {Quaternion} quatB
 * @return {number} The overlap depth, or FALSE if no penetration.
 */
ConvexPolyhedron.prototype.testSepAxis = function(axis, hullB, posA, quatA, posB, quatB){
    var hullA=this;
    ConvexPolyhedron.project(hullA, axis, posA, quatA, maxminA);
    ConvexPolyhedron.project(hullB, axis, posB, quatB, maxminB);
    var maxA = maxminA[0];
    var minA = maxminA[1];
    var maxB = maxminB[0];
    var minB = maxminB[1];
    if(maxA<minB || maxB<minA){
        return false; // Separated
    }
    var d0 = maxA - minB;
    var d1 = maxB - minA;
    var depth = d0<d1 ? d0:d1;
    return depth;
};

var cli_aabbmin = new Vec3(),
    cli_aabbmax = new Vec3();

/**
 * @method calculateLocalInertia
 * @param  {Number} mass
 * @param  {Vec3} target
 */
ConvexPolyhedron.prototype.calculateLocalInertia = function(mass,target){
    // Approximate with box inertia
    // Exact inertia calculation is overkill, but see http://geometrictools.com/Documentation/PolyhedralMassProperties.pdf for the correct way to do it
    this.computeLocalAABB(cli_aabbmin,cli_aabbmax);
    var x = cli_aabbmax.x - cli_aabbmin.x,
        y = cli_aabbmax.y - cli_aabbmin.y,
        z = cli_aabbmax.z - cli_aabbmin.z;
    target.x = 1.0 / 12.0 * mass * ( 2*y*2*y + 2*z*2*z );
    target.y = 1.0 / 12.0 * mass * ( 2*x*2*x + 2*z*2*z );
    target.z = 1.0 / 12.0 * mass * ( 2*y*2*y + 2*x*2*x );
};

/**
 * @method getPlaneConstantOfFace
 * @param  {Number} face_i Index of the face
 * @return {Number}
 */
ConvexPolyhedron.prototype.getPlaneConstantOfFace = function(face_i){
    var f = this.faces[face_i];
    var n = this.faceNormals[face_i];
    var v = this.vertices[f[0]];
    var c = -n.dot(v);
    return c;
};

/**
 * Clip a face against a hull.
 * @method clipFaceAgainstHull
 * @param {Vec3} separatingNormal
 * @param {Vec3} posA
 * @param {Quaternion} quatA
 * @param {Array} worldVertsB1 An array of Vec3 with vertices in the world frame.
 * @param {Number} minDist Distance clamping
 * @param {Number} maxDist
 * @param Array result Array to store resulting contact points in. Will be objects with properties: point, depth, normal. These are represented in world coordinates.
 */
var cfah_faceANormalWS = new Vec3(),
    cfah_edge0 = new Vec3(),
    cfah_WorldEdge0 = new Vec3(),
    cfah_worldPlaneAnormal1 = new Vec3(),
    cfah_planeNormalWS1 = new Vec3(),
    cfah_worldA1 = new Vec3(),
    cfah_localPlaneNormal = new Vec3(),
    cfah_planeNormalWS = new Vec3();
ConvexPolyhedron.prototype.clipFaceAgainstHull = function(separatingNormal, posA, quatA, worldVertsB1, minDist, maxDist,result){
    var faceANormalWS = cfah_faceANormalWS,
        edge0 = cfah_edge0,
        WorldEdge0 = cfah_WorldEdge0,
        worldPlaneAnormal1 = cfah_worldPlaneAnormal1,
        planeNormalWS1 = cfah_planeNormalWS1,
        worldA1 = cfah_worldA1,
        localPlaneNormal = cfah_localPlaneNormal,
        planeNormalWS = cfah_planeNormalWS;

    var hullA = this;
    var worldVertsB2 = [];
    var pVtxIn = worldVertsB1;
    var pVtxOut = worldVertsB2;
    // Find the face with normal closest to the separating axis
    var closestFaceA = -1;
    var dmin = Number.MAX_VALUE;
    for(var face=0; face<hullA.faces.length; face++){
        faceANormalWS.copy(hullA.faceNormals[face]);
        quatA.vmult(faceANormalWS,faceANormalWS);
        //posA.vadd(faceANormalWS,faceANormalWS);
        var d = faceANormalWS.dot(separatingNormal);
        if (d < dmin){
            dmin = d;
            closestFaceA = face;
        }
    }
    if (closestFaceA < 0){
        // console.log("--- did not find any closest face... ---");
        return;
    }
    //console.log("closest A: ",closestFaceA);
    // Get the face and construct connected faces
    var polyA = hullA.faces[closestFaceA];
    polyA.connectedFaces = [];
    for(var i=0; i<hullA.faces.length; i++){
        for(var j=0; j<hullA.faces[i].length; j++){
            if(polyA.indexOf(hullA.faces[i][j])!==-1 /* Sharing a vertex*/ && i!==closestFaceA /* Not the one we are looking for connections from */ && polyA.connectedFaces.indexOf(i)===-1 /* Not already added */ ){
                polyA.connectedFaces.push(i);
            }
        }
    }
    // Clip the polygon to the back of the planes of all faces of hull A, that are adjacent to the witness face
    var numContacts = pVtxIn.length;
    var numVerticesA = polyA.length;
    var res = [];
    for(var e0=0; e0<numVerticesA; e0++){
        var a = hullA.vertices[polyA[e0]];
        var b = hullA.vertices[polyA[(e0+1)%numVerticesA]];
        a.vsub(b,edge0);
        WorldEdge0.copy(edge0);
        quatA.vmult(WorldEdge0,WorldEdge0);
        posA.vadd(WorldEdge0,WorldEdge0);
        worldPlaneAnormal1.copy(this.faceNormals[closestFaceA]);//transA.getBasis()* btVector3(polyA.m_plane[0],polyA.m_plane[1],polyA.m_plane[2]);
        quatA.vmult(worldPlaneAnormal1,worldPlaneAnormal1);
        posA.vadd(worldPlaneAnormal1,worldPlaneAnormal1);
        WorldEdge0.cross(worldPlaneAnormal1,planeNormalWS1);
        planeNormalWS1.negate(planeNormalWS1);
        worldA1.copy(a);
        quatA.vmult(worldA1,worldA1);
        posA.vadd(worldA1,worldA1);
        var planeEqWS1 = -worldA1.dot(planeNormalWS1);
        var planeEqWS;
        if(true){
            var otherFace = polyA.connectedFaces[e0];
            localPlaneNormal.copy(this.faceNormals[otherFace]);
            var localPlaneEq = this.getPlaneConstantOfFace(otherFace);

            planeNormalWS.copy(localPlaneNormal);
            quatA.vmult(planeNormalWS,planeNormalWS);
            //posA.vadd(planeNormalWS,planeNormalWS);
            var planeEqWS = localPlaneEq - planeNormalWS.dot(posA);
        } else  {
            planeNormalWS.copy(planeNormalWS1);
            planeEqWS = planeEqWS1;
        }

        // Clip face against our constructed plane
        this.clipFaceAgainstPlane(pVtxIn, pVtxOut, planeNormalWS, planeEqWS);

        // Throw away all clipped points, but save the reamining until next clip
        while(pVtxIn.length){
            pVtxIn.shift();
        }
        while(pVtxOut.length){
            pVtxIn.push(pVtxOut.shift());
        }
    }

    //console.log("Resulting points after clip:",pVtxIn);

    // only keep contact points that are behind the witness face
    localPlaneNormal.copy(this.faceNormals[closestFaceA]);

    var localPlaneEq = this.getPlaneConstantOfFace(closestFaceA);
    planeNormalWS.copy(localPlaneNormal);
    quatA.vmult(planeNormalWS,planeNormalWS);

    var planeEqWS = localPlaneEq - planeNormalWS.dot(posA);
    for (var i=0; i<pVtxIn.length; i++){
        var depth = planeNormalWS.dot(pVtxIn[i]) + planeEqWS; //???
        /*console.log("depth calc from normal=",planeNormalWS.toString()," and constant "+planeEqWS+" and vertex ",pVtxIn[i].toString()," gives "+depth);*/
        if (depth <=minDist){
            console.log("clamped: depth="+depth+" to minDist="+(minDist+""));
            depth = minDist;
        }

        if (depth <=maxDist){
            var point = pVtxIn[i];
            if(depth<=0){
                /*console.log("Got contact point ",point.toString(),
                  ", depth=",depth,
                  "contact normal=",separatingNormal.toString(),
                  "plane",planeNormalWS.toString(),
                  "planeConstant",planeEqWS);*/
                var p = {
                    point:point,
                    normal:planeNormalWS,
                    depth: depth,
                };
                result.push(p);
            }
        }
    }
};

/**
 * Clip a face in a hull against the back of a plane.
 * @method clipFaceAgainstPlane
 * @param {Array} inVertices
 * @param {Array} outVertices
 * @param {Vec3} planeNormal
 * @param {Number} planeConstant The constant in the mathematical plane equation
 */
ConvexPolyhedron.prototype.clipFaceAgainstPlane = function(inVertices,outVertices, planeNormal, planeConstant){
    var n_dot_first, n_dot_last;
    var numVerts = inVertices.length;

    if(numVerts < 2){
        return outVertices;
    }

    var firstVertex = inVertices[inVertices.length-1],
        lastVertex =   inVertices[0];

    n_dot_first = planeNormal.dot(firstVertex) + planeConstant;

    for(var vi = 0; vi < numVerts; vi++){
        lastVertex = inVertices[vi];
        n_dot_last = planeNormal.dot(lastVertex) + planeConstant;
        if(n_dot_first < 0){
            if(n_dot_last < 0){
                // Start < 0, end < 0, so output lastVertex
                var newv = new Vec3();
                newv.copy(lastVertex);
                outVertices.push(newv);
            } else {
                // Start < 0, end >= 0, so output intersection
                var newv = new Vec3();
                firstVertex.lerp(lastVertex,
                                 n_dot_first / (n_dot_first - n_dot_last),
                                 newv);
                outVertices.push(newv);
            }
        } else {
            if(n_dot_last<0){
                // Start >= 0, end < 0 so output intersection and end
                var newv = new Vec3();
                firstVertex.lerp(lastVertex,
                                 n_dot_first / (n_dot_first - n_dot_last),
                                 newv);
                outVertices.push(newv);
                outVertices.push(lastVertex);
            }
        }
        firstVertex = lastVertex;
        n_dot_first = n_dot_last;
    }
    return outVertices;
};

// Updates .worldVertices and sets .worldVerticesNeedsUpdate to false.
ConvexPolyhedron.prototype.computeWorldVertices = function(position,quat){
    var N = this.vertices.length;
    while(this.worldVertices.length < N){
        this.worldVertices.push( new Vec3() );
    }

    var verts = this.vertices,
        worldVerts = this.worldVertices;
    for(var i=0; i!==N; i++){
        quat.vmult( verts[i] , worldVerts[i] );
        position.vadd( worldVerts[i] , worldVerts[i] );
    }

    this.worldVerticesNeedsUpdate = false;
};

var computeLocalAABB_worldVert = new Vec3();
ConvexPolyhedron.prototype.computeLocalAABB = function(aabbmin,aabbmax){
    var n = this.vertices.length,
        vertices = this.vertices,
        worldVert = computeLocalAABB_worldVert;

    aabbmin.set(Number.MAX_VALUE, Number.MAX_VALUE, Number.MAX_VALUE);
    aabbmax.set(-Number.MAX_VALUE, -Number.MAX_VALUE, -Number.MAX_VALUE);

    for(var i=0; i<n; i++){
        var v = vertices[i];
        if     (v.x < aabbmin.x){
            aabbmin.x = v.x;
        } else if(v.x > aabbmax.x){
            aabbmax.x = v.x;
        }
        if     (v.y < aabbmin.y){
            aabbmin.y = v.y;
        } else if(v.y > aabbmax.y){
            aabbmax.y = v.y;
        }
        if     (v.z < aabbmin.z){
            aabbmin.z = v.z;
        } else if(v.z > aabbmax.z){
            aabbmax.z = v.z;
        }
    }
};

/**
 * Updates .worldVertices and sets .worldVerticesNeedsUpdate to false.
 * @method computeWorldFaceNormals
 * @param  {Quaternion} quat
 */
ConvexPolyhedron.prototype.computeWorldFaceNormals = function(quat){
    var N = this.faceNormals.length;
    while(this.worldFaceNormals.length < N){
        this.worldFaceNormals.push( new Vec3() );
    }

    var normals = this.faceNormals,
        worldNormals = this.worldFaceNormals;
    for(var i=0; i!==N; i++){
        quat.vmult( normals[i] , worldNormals[i] );
    }

    this.worldFaceNormalsNeedsUpdate = false;
};

/**
 * @method updateBoundingSphereRadius
 */
ConvexPolyhedron.prototype.updateBoundingSphereRadius = function(){
    // Assume points are distributed with local (0,0,0) as center
    var max2 = 0;
    var verts = this.vertices;
    for(var i=0, N=verts.length; i!==N; i++) {
        var norm2 = verts[i].norm2();
        if(norm2 > max2){
            max2 = norm2;
        }
    }
    this.boundingSphereRadius = Math.sqrt(max2);
};

var tempWorldVertex = new Vec3();

/**
 * @method calculateWorldAABB
 * @param {Vec3}        pos
 * @param {Quaternion}  quat
 * @param {Vec3}        min
 * @param {Vec3}        max
 */
ConvexPolyhedron.prototype.calculateWorldAABB = function(pos,quat,min,max){
    var n = this.vertices.length, verts = this.vertices;
    var minx,miny,minz,maxx,maxy,maxz;
    for(var i=0; i<n; i++){
        tempWorldVertex.copy(verts[i]);
        quat.vmult(tempWorldVertex,tempWorldVertex);
        pos.vadd(tempWorldVertex,tempWorldVertex);
        var v = tempWorldVertex;
        if     (v.x < minx || minx===undefined){
            minx = v.x;
        } else if(v.x > maxx || maxx===undefined){
            maxx = v.x;
        }

        if     (v.y < miny || miny===undefined){
            miny = v.y;
        } else if(v.y > maxy || maxy===undefined){
            maxy = v.y;
        }

        if     (v.z < minz || minz===undefined){
            minz = v.z;
        } else if(v.z > maxz || maxz===undefined){
            maxz = v.z;
        }
    }
    min.set(minx,miny,minz);
    max.set(maxx,maxy,maxz);
};

/**
 * Get approximate convex volume
 * @method volume
 * @return {Number}
 */
ConvexPolyhedron.prototype.volume = function(){
    return 4.0 * Math.PI * this.boundingSphereRadius / 3.0;
};

/**
 * Get an average of all the vertices positions
 * @method getAveragePointLocal
 * @param  {Vec3} target
 * @return {Vec3}
 */
ConvexPolyhedron.prototype.getAveragePointLocal = function(target){
    target = target || new Vec3();
    var n = this.vertices.length,
        verts = this.vertices;
    for(var i=0; i<n; i++){
        target.vadd(verts[i],target);
    }
    target.mult(1/n,target);
    return target;
};

/**
 * Transform all local points. Will change the .vertices
 * @method transformAllPoints
 * @param  {Vec3} offset
 * @param  {Quaternion} quat
 */
ConvexPolyhedron.prototype.transformAllPoints = function(offset,quat){
    var n = this.vertices.length,
        verts = this.vertices;

    // Apply rotation
    if(quat){
        // Rotate vertices
        for(var i=0; i<n; i++){
            var v = verts[i];
            quat.vmult(v,v);
        }
        // Rotate face normals
        for(var i=0; i<this.faceNormals.length; i++){
            var v = this.faceNormals[i];
            quat.vmult(v,v);
        }
        /*
        // Rotate edges
        for(var i=0; i<this.uniqueEdges.length; i++){
            var v = this.uniqueEdges[i];
            quat.vmult(v,v);
        }*/
    }

    // Apply offset
    if(offset){
        for(var i=0; i<n; i++){
            var v = verts[i];
            v.vadd(offset,v);
        }
    }
};

/**
 * Checks whether p is inside the polyhedra. Must be in local coords. The point lies outside of the convex hull of the other points if and only if the direction of all the vectors from it to those other points are on less than one half of a sphere around it.
 * @method pointIsInside
 * @param  {Vec3} p      A point given in local coordinates
 * @return {Boolean}
 */
var ConvexPolyhedron_pointIsInside = new Vec3();
var ConvexPolyhedron_vToP = new Vec3();
var ConvexPolyhedron_vToPointInside = new Vec3();
ConvexPolyhedron.prototype.pointIsInside = function(p){
    var n = this.vertices.length,
        verts = this.vertices,
        faces = this.faces,
        normals = this.faceNormals;
    var positiveResult = null;
    var N = this.faces.length;
    var pointInside = ConvexPolyhedron_pointIsInside;
    this.getAveragePointLocal(pointInside);
    for(var i=0; i<N; i++){
        var numVertices = this.faces[i].length;
        var n = normals[i];
        var v = verts[faces[i][0]]; // We only need one point in the face

        // This dot product determines which side of the edge the point is
        var vToP = ConvexPolyhedron_vToP;
        p.vsub(v,vToP);
        var r1 = n.dot(vToP);

        var vToPointInside = ConvexPolyhedron_vToPointInside;
        pointInside.vsub(v,vToPointInside);
        var r2 = n.dot(vToPointInside);

        if((r1<0 && r2>0) || (r1>0 && r2<0)){
            return false; // Encountered some other sign. Exit.
        } else {
        }
    }

    // If we got here, all dot products were of the same sign.
    return positiveResult ? 1 : -1;
};

/**
 * Get max and min dot product of a convex hull at position (pos,quat) projected onto an axis. Results are saved in the array maxmin.
 * @static
 * @method project
 * @param {ConvexPolyhedron} hull
 * @param {Vec3} axis
 * @param {Vec3} pos
 * @param {Quaternion} quat
 * @param {array} result result[0] and result[1] will be set to maximum and minimum, respectively.
 */
var project_worldVertex = new Vec3();
var project_localAxis = new Vec3();
var project_localOrigin = new Vec3();
ConvexPolyhedron.project = function(hull, axis, pos, quat, result){
    var n = hull.vertices.length,
        worldVertex = project_worldVertex,
        localAxis = project_localAxis,
        max = 0,
        min = 0,
        localOrigin = project_localOrigin,
        vs = hull.vertices;

    localOrigin.setZero();

    // Transform the axis to local
    Transform.vectorToLocalFrame(pos, quat, axis, localAxis);
    Transform.pointToLocalFrame(pos, quat, localOrigin, localOrigin);
    var add = localOrigin.dot(localAxis);

    min = max = vs[0].dot(localAxis);

    for(var i = 1; i < n; i++){
        var val = vs[i].dot(localAxis);

        if(val > max){
            max = val;
        }

        if(val < min){
            min = val;
        }
    }

    min -= add;
    max -= add;

    if(min > max){
        // Inconsistent - swap
        var temp = min;
        min = max;
        max = temp;
    }
    // Output
    result[0] = max;
    result[1] = min;
};

},{"../math/Quaternion":28,"../math/Transform":29,"../math/Vec3":30,"./Shape":43}],39:[function(_dereq_,module,exports){
module.exports = Cylinder;

var Shape = _dereq_('./Shape');
var Vec3 = _dereq_('../math/Vec3');
var Quaternion = _dereq_('../math/Quaternion');
var ConvexPolyhedron = _dereq_('./ConvexPolyhedron');

/**
 * @class Cylinder
 * @constructor
 * @extends ConvexPolyhedron
 * @author schteppe / https://github.com/schteppe
 * @param {Number} radiusTop
 * @param {Number} radiusBottom
 * @param {Number} height
 * @param {Number} numSegments The number of segments to build the cylinder out of
 */
function Cylinder( radiusTop, radiusBottom, height , numSegments ) {
    var N = numSegments,
        verts = [],
        axes = [],
        faces = [],
        bottomface = [],
        topface = [],
        cos = Math.cos,
        sin = Math.sin;

    // First bottom point
    verts.push(new Vec3(radiusBottom*cos(0),
                               radiusBottom*sin(0),
                               -height*0.5));
    bottomface.push(0);

    // First top point
    verts.push(new Vec3(radiusTop*cos(0),
                               radiusTop*sin(0),
                               height*0.5));
    topface.push(1);

    for(var i=0; i<N; i++){
        var theta = 2*Math.PI/N * (i+1);
        var thetaN = 2*Math.PI/N * (i+0.5);
        if(i<N-1){
            // Bottom
            verts.push(new Vec3(radiusBottom*cos(theta),
                                       radiusBottom*sin(theta),
                                       -height*0.5));
            bottomface.push(2*i+2);
            // Top
            verts.push(new Vec3(radiusTop*cos(theta),
                                       radiusTop*sin(theta),
                                       height*0.5));
            topface.push(2*i+3);

            // Face
            faces.push([2*i+2, 2*i+3, 2*i+1,2*i]);
        } else {
            faces.push([0,1, 2*i+1, 2*i]); // Connect
        }

        // Axis: we can cut off half of them if we have even number of segments
        if(N % 2 === 1 || i < N / 2){
            axes.push(new Vec3(cos(thetaN), sin(thetaN), 0));
        }
    }
    faces.push(topface);
    axes.push(new Vec3(0,0,1));

    // Reorder bottom face
    var temp = [];
    for(var i=0; i<bottomface.length; i++){
        temp.push(bottomface[bottomface.length - i - 1]);
    }
    faces.push(temp);

    this.type = Shape.types.CONVEXPOLYHEDRON;
    ConvexPolyhedron.call( this, verts, faces, axes );
}

Cylinder.prototype = new ConvexPolyhedron();

},{"../math/Quaternion":28,"../math/Vec3":30,"./ConvexPolyhedron":38,"./Shape":43}],40:[function(_dereq_,module,exports){
var Shape = _dereq_('./Shape');
var ConvexPolyhedron = _dereq_('./ConvexPolyhedron');
var Vec3 = _dereq_('../math/Vec3');
var Utils = _dereq_('../utils/Utils');

module.exports = Heightfield;

/**
 * Heightfield shape class. Height data is given as an array. These data points are spread out evenly with a given distance.
 * @class Heightfield
 * @extends Shape
 * @constructor
 * @param {Array} data An array of Y values that will be used to construct the terrain.
 * @param {object} options
 * @param {Number} [options.minValue] Minimum value of the data points in the data array. Will be computed automatically if not given.
 * @param {Number} [options.maxValue] Maximum value.
 * @param {Number} [options.elementSize=0.1] World spacing between the data points in X direction.
 * @todo Should be possible to use along all axes, not just y
 *
 * @example
 *     // Generate some height data (y-values).
 *     var data = [];
 *     for(var i = 0; i < 1000; i++){
 *         var y = 0.5 * Math.cos(0.2 * i);
 *         data.push(y);
 *     }
 *
 *     // Create the heightfield shape
 *     var heightfieldShape = new Heightfield(data, {
 *         elementSize: 1 // Distance between the data points in X and Y directions
 *     });
 *     var heightfieldBody = new Body();
 *     heightfieldBody.addShape(heightfieldShape);
 *     world.addBody(heightfieldBody);
 */
function Heightfield(data, options){
    options = Utils.defaults(options, {
        maxValue : null,
        minValue : null,
        elementSize : 1
    });

    /**
     * An array of numbers, or height values, that are spread out along the x axis.
     * @property {array} data
     */
    this.data = data;

    /**
     * Max value of the data
     * @property {number} maxValue
     */
    this.maxValue = options.maxValue;

    /**
     * Max value of the data
     * @property {number} minValue
     */
    this.minValue = options.minValue;

    /**
     * The width of each element
     * @property {number} elementSize
     * @todo elementSizeX and Y
     */
    this.elementSize = options.elementSize;

    if(options.minValue === null){
        this.updateMinValue();
    }
    if(options.maxValue === null){
        this.updateMaxValue();
    }

    this.cacheEnabled = true;

    Shape.call(this);

    this.pillarConvex = new ConvexPolyhedron();
    this.pillarOffset = new Vec3();

    this.type = Shape.types.HEIGHTFIELD;
    this.updateBoundingSphereRadius();

    // "i_j_isUpper" => { convex: ..., offset: ... }
    // for example:
    // _cachedPillars["0_2_1"]
    this._cachedPillars = {};
}
Heightfield.prototype = new Shape();

/**
 * Call whenever you change the data array.
 * @method update
 */
Heightfield.prototype.update = function(){
    this._cachedPillars = {};
};

/**
 * Update the .minValue property
 * @method updateMinValue
 */
Heightfield.prototype.updateMinValue = function(){
    var data = this.data;
    var minValue = data[0][0];
    for(var i=0; i !== data.length; i++){
        for(var j=0; j !== data[i].length; j++){
            var v = data[i][j];
            if(v < minValue){
                minValue = v;
            }
        }
    }
    this.minValue = minValue;
};

/**
 * Update the .maxValue property
 * @method updateMaxValue
 */
Heightfield.prototype.updateMaxValue = function(){
    var data = this.data;
    var maxValue = data[0][0];
    for(var i=0; i !== data.length; i++){
        for(var j=0; j !== data[i].length; j++){
            var v = data[i][j];
            if(v > maxValue){
                maxValue = v;
            }
        }
    }
    this.maxValue = maxValue;
};

/**
 * Set the height value at an index. Don't forget to update maxValue and minValue after you're done.
 * @method setHeightValueAtIndex
 * @param {integer} xi
 * @param {integer} yi
 * @param {number} value
 */
Heightfield.prototype.setHeightValueAtIndex = function(xi, yi, value){
    var data = this.data;
    data[xi][yi] = value;

    // Invalidate cache
    this.clearCachedConvexTrianglePillar(xi, yi, false);
    if(xi > 0){
        this.clearCachedConvexTrianglePillar(xi - 1, yi, true);
        this.clearCachedConvexTrianglePillar(xi - 1, yi, false);
    }
    if(yi > 0){
        this.clearCachedConvexTrianglePillar(xi, yi - 1, true);
        this.clearCachedConvexTrianglePillar(xi, yi - 1, false);
    }
    if(yi > 0 && xi > 0){
        this.clearCachedConvexTrianglePillar(xi - 1, yi - 1, true);
    }
};

/**
 * Get max/min in a rectangle in the matrix data
 * @method getRectMinMax
 * @param  {integer} iMinX
 * @param  {integer} iMinY
 * @param  {integer} iMaxX
 * @param  {integer} iMaxY
 * @param  {array} [result] An array to store the results in.
 * @return {array} The result array, if it was passed in. Minimum will be at position 0 and max at 1.
 */
Heightfield.prototype.getRectMinMax = function (iMinX, iMinY, iMaxX, iMaxY, result) {
    result = result || [];

    // Get max and min of the data
    var data = this.data,
        max = this.minValue; // Set first value
    for(var i = iMinX; i <= iMaxX; i++){
        for(var j = iMinY; j <= iMaxY; j++){
            var height = data[i][j];
            if(height > max){
                max = height;
            }
        }
    }

    result[0] = this.minValue;
    result[1] = max;
};

/**
 * Get the index of a local position on the heightfield. The indexes indicate the rectangles, so if your terrain is made of N x N height data points, you will have rectangle indexes ranging from 0 to N-1.
 * @method getIndexOfPosition
 * @param  {number} x
 * @param  {number} y
 * @param  {array} result Two-element array
 * @param  {boolean} clamp If the position should be clamped to the heightfield edge.
 * @return {boolean}
 */
Heightfield.prototype.getIndexOfPosition = function (x, y, result, clamp) {

    // Get the index of the data points to test against
    var w = this.elementSize;
    var data = this.data;
    var xi = Math.floor(x / w);
    var yi = Math.floor(y / w);

    result[0] = xi;
    result[1] = yi;

    if(clamp){
        // Clamp index to edges
        if(xi < 0){ xi = 0; }
        if(yi < 0){ yi = 0; }
        if(xi >= data.length - 1){ xi = data.length - 1; }
        if(yi >= data[0].length - 1){ yi = data[0].length - 1; }
    }

    // Bail out if we are out of the terrain
    if(xi < 0 || yi < 0 || xi >= data.length-1 || yi >= data[0].length-1){
        return false;
    }

    return true;
};

Heightfield.prototype.getHeightAt = function(x, y, edgeClamp){
    var idx = [];
    this.getIndexOfPosition(x, y, idx, edgeClamp);

    // TODO: get upper or lower triangle, then use barycentric interpolation to get the height in the triangle.
    var minmax = [];
    this.getRectMinMax(idx[0], idx[1] + 1, idx[0], idx[1] + 1, minmax);

    return (minmax[0] + minmax[1]) / 2; // average
};

Heightfield.prototype.getCacheConvexTrianglePillarKey = function(xi, yi, getUpperTriangle){
    return xi + '_' + yi + '_' + (getUpperTriangle ? 1 : 0);
};

Heightfield.prototype.getCachedConvexTrianglePillar = function(xi, yi, getUpperTriangle){
    return this._cachedPillars[this.getCacheConvexTrianglePillarKey(xi, yi, getUpperTriangle)];
};

Heightfield.prototype.setCachedConvexTrianglePillar = function(xi, yi, getUpperTriangle, convex, offset){
    this._cachedPillars[this.getCacheConvexTrianglePillarKey(xi, yi, getUpperTriangle)] = {
        convex: convex,
        offset: offset
    };
};

Heightfield.prototype.clearCachedConvexTrianglePillar = function(xi, yi, getUpperTriangle){
    delete this._cachedPillars[this.getCacheConvexTrianglePillarKey(xi, yi, getUpperTriangle)];
};

/**
 * Get a triangle in the terrain in the form of a triangular convex shape.
 * @method getConvexTrianglePillar
 * @param  {integer} i
 * @param  {integer} j
 * @param  {boolean} getUpperTriangle
 */
Heightfield.prototype.getConvexTrianglePillar = function(xi, yi, getUpperTriangle){
    var result = this.pillarConvex;
    var offsetResult = this.pillarOffset;

    if(this.cacheEnabled){
        var data = this.getCachedConvexTrianglePillar(xi, yi, getUpperTriangle);
        if(data){
            this.pillarConvex = data.convex;
            this.pillarOffset = data.offset;
            return;
        }

        result = new ConvexPolyhedron();
        offsetResult = new Vec3();

        this.pillarConvex = result;
        this.pillarOffset = offsetResult;
    }

    var data = this.data;
    var elementSize = this.elementSize;
    var faces = result.faces;

    // Reuse verts if possible
    result.vertices.length = 6;
    for (var i = 0; i < 6; i++) {
        if(!result.vertices[i]){
            result.vertices[i] = new Vec3();
        }
    }

    // Reuse faces if possible
    faces.length = 5;
    for (var i = 0; i < 5; i++) {
        if(!faces[i]){
            faces[i] = [];
        }
    }

    var verts = result.vertices;

    var h = (Math.min(
        data[xi][yi],
        data[xi+1][yi],
        data[xi][yi+1],
        data[xi+1][yi+1]
    ) - this.minValue ) / 2 + this.minValue;

    if (!getUpperTriangle) {

        // Center of the triangle pillar - all polygons are given relative to this one
        offsetResult.set(
            (xi + 0.25) * elementSize, // sort of center of a triangle
            (yi + 0.25) * elementSize,
            h // vertical center
        );

        // Top triangle verts
        verts[0].set(
            -0.25 * elementSize,
            -0.25 * elementSize,
            data[xi][yi] - h
        );
        verts[1].set(
            0.75 * elementSize,
            -0.25 * elementSize,
            data[xi + 1][yi] - h
        );
        verts[2].set(
            -0.25 * elementSize,
            0.75 * elementSize,
            data[xi][yi + 1] - h
        );

        // bottom triangle verts
        verts[3].set(
            -0.25 * elementSize,
            -0.25 * elementSize,
            -h-1
        );
        verts[4].set(
            0.75 * elementSize,
            -0.25 * elementSize,
            -h-1
        );
        verts[5].set(
            -0.25 * elementSize,
            0.75  * elementSize,
            -h-1
        );

        // top triangle
        faces[0][0] = 0;
        faces[0][1] = 1;
        faces[0][2] = 2;

        // bottom triangle
        faces[1][0] = 5;
        faces[1][1] = 4;
        faces[1][2] = 3;

        // -x facing quad
        faces[2][0] = 0;
        faces[2][1] = 2;
        faces[2][2] = 5;
        faces[2][3] = 3;

        // -y facing quad
        faces[3][0] = 1;
        faces[3][1] = 0;
        faces[3][2] = 3;
        faces[3][3] = 4;

        // +xy facing quad
        faces[4][0] = 4;
        faces[4][1] = 5;
        faces[4][2] = 2;
        faces[4][3] = 1;


    } else {

        // Center of the triangle pillar - all polygons are given relative to this one
        offsetResult.set(
            (xi + 0.75) * elementSize, // sort of center of a triangle
            (yi + 0.75) * elementSize,
            h // vertical center
        );

        // Top triangle verts
        verts[0].set(
            0.25 * elementSize,
            0.25 * elementSize,
            data[xi + 1][yi + 1] - h
        );
        verts[1].set(
            -0.75 * elementSize,
            0.25 * elementSize,
            data[xi][yi + 1] - h
        );
        verts[2].set(
            0.25 * elementSize,
            -0.75 * elementSize,
            data[xi + 1][yi] - h
        );

        // bottom triangle verts
        verts[3].set(
            0.25 * elementSize,
            0.25 * elementSize,
            - h-1
        );
        verts[4].set(
            -0.75 * elementSize,
            0.25 * elementSize,
            - h-1
        );
        verts[5].set(
            0.25 * elementSize,
            -0.75 * elementSize,
            - h-1
        );

        // Top triangle
        faces[0][0] = 0;
        faces[0][1] = 1;
        faces[0][2] = 2;

        // bottom triangle
        faces[1][0] = 5;
        faces[1][1] = 4;
        faces[1][2] = 3;

        // +x facing quad
        faces[2][0] = 2;
        faces[2][1] = 5;
        faces[2][2] = 3;
        faces[2][3] = 0;

        // +y facing quad
        faces[3][0] = 3;
        faces[3][1] = 4;
        faces[3][2] = 1;
        faces[3][3] = 0;

        // -xy facing quad
        faces[4][0] = 1;
        faces[4][1] = 4;
        faces[4][2] = 5;
        faces[4][3] = 2;
    }

    result.computeNormals();
    result.computeEdges();
    result.updateBoundingSphereRadius();

    this.setCachedConvexTrianglePillar(xi, yi, getUpperTriangle, result, offsetResult);
};

Heightfield.prototype.calculateLocalInertia = function(mass, target){
    target = target || new Vec3();
    target.set(0, 0, 0);
    return target;
};

Heightfield.prototype.volume = function(){
    return Number.MAX_VALUE; // The terrain is infinite
};

Heightfield.prototype.calculateWorldAABB = function(pos, quat, min, max){
    // TODO: do it properly
    min.set(-Number.MAX_VALUE, -Number.MAX_VALUE, -Number.MAX_VALUE);
    max.set(Number.MAX_VALUE, Number.MAX_VALUE, Number.MAX_VALUE);
};

Heightfield.prototype.updateBoundingSphereRadius = function(){
    // Use the bounding box of the min/max values
    var data = this.data,
        s = this.elementSize;
    this.boundingSphereRadius = new Vec3(data.length * s, data[0].length * s, Math.max(Math.abs(this.maxValue), Math.abs(this.minValue))).norm();
};

},{"../math/Vec3":30,"../utils/Utils":53,"./ConvexPolyhedron":38,"./Shape":43}],41:[function(_dereq_,module,exports){
module.exports = Particle;

var Shape = _dereq_('./Shape');
var Vec3 = _dereq_('../math/Vec3');

/**
 * Particle shape.
 * @class Particle
 * @constructor
 * @author schteppe
 * @extends Shape
 */
function Particle(){
    Shape.call(this);

    this.type = Shape.types.PARTICLE;
}
Particle.prototype = new Shape();
Particle.prototype.constructor = Particle;

/**
 * @method calculateLocalInertia
 * @param  {Number} mass
 * @param  {Vec3} target
 * @return {Vec3}
 */
Particle.prototype.calculateLocalInertia = function(mass,target){
    target = target || new Vec3();
    target.set(0, 0, 0);
    return target;
};

Particle.prototype.volume = function(){
    return 0;
};

Particle.prototype.updateBoundingSphereRadius = function(){
    this.boundingSphereRadius = 0;
};

Particle.prototype.calculateWorldAABB = function(pos,quat,min,max){
    // Get each axis max
    min.copy(pos);
    max.copy(pos);
};

},{"../math/Vec3":30,"./Shape":43}],42:[function(_dereq_,module,exports){
module.exports = Plane;

var Shape = _dereq_('./Shape');
var Vec3 = _dereq_('../math/Vec3');

/**
 * A plane, facing in the Z direction. The plane has its surface at z=0 and everything below z=0 is assumed to be solid plane. To make the plane face in some other direction than z, you must put it inside a RigidBody and rotate that body. See the demos.
 * @class Plane
 * @constructor
 * @extends Shape
 * @author schteppe
 */
function Plane(){
    Shape.call(this);
    this.type = Shape.types.PLANE;

    // World oriented normal
    this.worldNormal = new Vec3();
    this.worldNormalNeedsUpdate = true;

    this.boundingSphereRadius = Number.MAX_VALUE;
}
Plane.prototype = new Shape();
Plane.prototype.constructor = Plane;

Plane.prototype.computeWorldNormal = function(quat){
    var n = this.worldNormal;
    n.set(0,0,1);
    quat.vmult(n,n);
    this.worldNormalNeedsUpdate = false;
};

Plane.prototype.calculateLocalInertia = function(mass,target){
    target = target || new Vec3();
    return target;
};

Plane.prototype.volume = function(){
    return Number.MAX_VALUE; // The plane is infinite...
};

var tempNormal = new Vec3();
Plane.prototype.calculateWorldAABB = function(pos, quat, min, max){
    // The plane AABB is infinite, except if the normal is pointing along any axis
    tempNormal.set(0,0,1); // Default plane normal is z
    quat.vmult(tempNormal,tempNormal);
    var maxVal = Number.MAX_VALUE;
    min.set(-maxVal, -maxVal, -maxVal);
    max.set(maxVal, maxVal, maxVal);

    if(tempNormal.x === 1){ max.x = pos.x; }
    if(tempNormal.y === 1){ max.y = pos.y; }
    if(tempNormal.z === 1){ max.z = pos.z; }

    if(tempNormal.x === -1){ min.x = pos.x; }
    if(tempNormal.y === -1){ min.y = pos.y; }
    if(tempNormal.z === -1){ min.z = pos.z; }
};

Plane.prototype.updateBoundingSphereRadius = function(){
    this.boundingSphereRadius = Number.MAX_VALUE;
};
},{"../math/Vec3":30,"./Shape":43}],43:[function(_dereq_,module,exports){
module.exports = Shape;

var Shape = _dereq_('./Shape');
var Vec3 = _dereq_('../math/Vec3');
var Quaternion = _dereq_('../math/Quaternion');
var Material = _dereq_('../material/Material');

/**
 * Base class for shapes
 * @class Shape
 * @constructor
 * @author schteppe
 * @todo Should have a mechanism for caching bounding sphere radius instead of calculating it each time
 */
function Shape(){

    /**
     * Identifyer of the Shape.
     * @property {number} id
     */
    this.id = Shape.idCounter++;

    /**
     * The type of this shape. Must be set to an int > 0 by subclasses.
     * @property type
     * @type {Number}
     * @see Shape.types
     */
    this.type = 0;

    /**
     * The local bounding sphere radius of this shape.
     * @property {Number} boundingSphereRadius
     */
    this.boundingSphereRadius = 0;

    /**
     * Whether to produce contact forces when in contact with other bodies. Note that contacts will be generated, but they will be disabled.
     * @property {boolean} collisionResponse
     */
    this.collisionResponse = true;

    /**
     * @property {Material} material
     */
    this.material = null;
}
Shape.prototype.constructor = Shape;

/**
 * Computes the bounding sphere radius. The result is stored in the property .boundingSphereRadius
 * @method updateBoundingSphereRadius
 * @return {Number}
 */
Shape.prototype.updateBoundingSphereRadius = function(){
    throw "computeBoundingSphereRadius() not implemented for shape type "+this.type;
};

/**
 * Get the volume of this shape
 * @method volume
 * @return {Number}
 */
Shape.prototype.volume = function(){
    throw "volume() not implemented for shape type "+this.type;
};

/**
 * Calculates the inertia in the local frame for this shape.
 * @method calculateLocalInertia
 * @return {Vec3}
 * @see http://en.wikipedia.org/wiki/List_of_moments_of_inertia
 */
Shape.prototype.calculateLocalInertia = function(mass,target){
    throw "calculateLocalInertia() not implemented for shape type "+this.type;
};

Shape.idCounter = 0;

/**
 * The available shape types.
 * @static
 * @property types
 * @type {Object}
 */
Shape.types = {
    SPHERE:1,
    PLANE:2,
    BOX:4,
    COMPOUND:8,
    CONVEXPOLYHEDRON:16,
    HEIGHTFIELD:32,
    PARTICLE:64,
    CYLINDER:128,
    TRIMESH:256
};


},{"../material/Material":25,"../math/Quaternion":28,"../math/Vec3":30,"./Shape":43}],44:[function(_dereq_,module,exports){
module.exports = Sphere;

var Shape = _dereq_('./Shape');
var Vec3 = _dereq_('../math/Vec3');

/**
 * Spherical shape
 * @class Sphere
 * @constructor
 * @extends Shape
 * @param {Number} radius The radius of the sphere, a non-negative number.
 * @author schteppe / http://github.com/schteppe
 */
function Sphere(radius){
    Shape.call(this);

    /**
     * @property {Number} radius
     */
    this.radius = radius!==undefined ? Number(radius) : 1.0;
    this.type = Shape.types.SPHERE;

    if(this.radius < 0){
        throw new Error('The sphere radius cannot be negative.');
    }

    this.updateBoundingSphereRadius();
}
Sphere.prototype = new Shape();
Sphere.prototype.constructor = Sphere;

Sphere.prototype.calculateLocalInertia = function(mass,target){
    target = target || new Vec3();
    var I = 2.0*mass*this.radius*this.radius/5.0;
    target.x = I;
    target.y = I;
    target.z = I;
    return target;
};

Sphere.prototype.volume = function(){
    return 4.0 * Math.PI * this.radius / 3.0;
};

Sphere.prototype.updateBoundingSphereRadius = function(){
    this.boundingSphereRadius = this.radius;
};

Sphere.prototype.calculateWorldAABB = function(pos,quat,min,max){
    var r = this.radius;
    var axes = ['x','y','z'];
    for(var i=0; i<axes.length; i++){
        var ax = axes[i];
        min[ax] = pos[ax] - r;
        max[ax] = pos[ax] + r;
    }
};

},{"../math/Vec3":30,"./Shape":43}],45:[function(_dereq_,module,exports){
module.exports = Trimesh;

var Shape = _dereq_('./Shape');
var Vec3 = _dereq_('../math/Vec3');
var Quaternion = _dereq_('../math/Quaternion');
var Transform = _dereq_('../math/Transform');
var AABB = _dereq_('../collision/AABB');
var Octree = _dereq_('../utils/Octree');

/**
 * @class Trimesh
 * @constructor
 * @param {array} vertices
 * @param {array} indices
 * @extends Shape
 * @example
 *     // How to make a mesh with a single triangle
 *     var vertices = [
 *         0, 0, 0, // vertex 0
 *         1, 0, 0, // vertex 1
 *         0, 1, 0  // vertex 2
 *     ];
 *     var indices = [
 *         0, 1, 2  // triangle 0
 *     ];
 *     var trimeshShape = new Trimesh(vertices, indices);
 */
function Trimesh(vertices, indices) {
    Shape.call(this);
    this.type = Shape.types.TRIMESH;

    /**
     * @property vertices
     * @type {Array}
     */
    this.vertices = new Float32Array(vertices);

    /**
     * Array of integers, indicating which vertices each triangle consists of. The length of this array is thus 3 times the number of triangles.
     * @property indices
     * @type {Array}
     */
    this.indices = new Int16Array(indices);

    /**
     * The normals data.
     * @property normals
     * @type {Array}
     */
    this.normals = new Float32Array(indices.length);

    /**
     * The local AABB of the mesh.
     * @property aabb
     * @type {Array}
     */
    this.aabb = new AABB();

    /**
     * References to vertex pairs, making up all unique edges in the trimesh.
     * @property {array} edges
     */
    this.edges = null;

    /**
     * Local scaling of the mesh. Use .setScale() to set it.
     * @property {Vec3} scale
     */
    this.scale = new Vec3(1, 1, 1);

    /**
     * The indexed triangles. Use .updateTree() to update it.
     * @property {Octree} tree
     */
    this.tree = new Octree();

    this.updateEdges();
    this.updateNormals();
    this.updateAABB();
    this.updateBoundingSphereRadius();
    this.updateTree();
}
Trimesh.prototype = new Shape();
Trimesh.prototype.constructor = Trimesh;

var computeNormals_n = new Vec3();

/**
 * @method updateTree
 */
Trimesh.prototype.updateTree = function(){
    var tree = this.tree;

    tree.reset();
    tree.aabb.copy(this.aabb);
    var scale = this.scale; // The local mesh AABB is scaled, but the octree AABB should be unscaled
    tree.aabb.lowerBound.x *= 1 / scale.x;
    tree.aabb.lowerBound.y *= 1 / scale.y;
    tree.aabb.lowerBound.z *= 1 / scale.z;
    tree.aabb.upperBound.x *= 1 / scale.x;
    tree.aabb.upperBound.y *= 1 / scale.y;
    tree.aabb.upperBound.z *= 1 / scale.z;

    // Insert all triangles
    var triangleAABB = new AABB();
    var a = new Vec3();
    var b = new Vec3();
    var c = new Vec3();
    var points = [a, b, c];
    for (var i = 0; i < this.indices.length / 3; i++) {
        //this.getTriangleVertices(i, a, b, c);

        // Get unscaled triangle verts
        var i3 = i * 3;
        this._getUnscaledVertex(this.indices[i3], a);
        this._getUnscaledVertex(this.indices[i3 + 1], b);
        this._getUnscaledVertex(this.indices[i3 + 2], c);

        triangleAABB.setFromPoints(points);
        tree.insert(triangleAABB, i);
    }
    tree.removeEmptyNodes();
};

var unscaledAABB = new AABB();

/**
 * Get triangles in a local AABB from the trimesh.
 * @method getTrianglesInAABB
 * @param  {AABB} aabb
 * @param  {array} result An array of integers, referencing the queried triangles.
 */
Trimesh.prototype.getTrianglesInAABB = function(aabb, result){
    unscaledAABB.copy(aabb);

    // Scale it to local
    var scale = this.scale;
    var isx = scale.x;
    var isy = scale.y;
    var isz = scale.z;
    var l = unscaledAABB.lowerBound;
    var u = unscaledAABB.upperBound;
    l.x /= isx;
    l.y /= isy;
    l.z /= isz;
    u.x /= isx;
    u.y /= isy;
    u.z /= isz;

    return this.tree.aabbQuery(unscaledAABB, result);
};

/**
 * @method setScale
 * @param {Vec3} scale
 */
Trimesh.prototype.setScale = function(scale){
    var wasUniform = this.scale.x === this.scale.y === this.scale.z;
    var isUniform = scale.x === scale.y === scale.z;

    if(!(wasUniform && isUniform)){
        // Non-uniform scaling. Need to update normals.
        this.updateNormals();
    }
    this.scale.copy(scale);
    this.updateAABB();
    this.updateBoundingSphereRadius();
};

/**
 * Compute the normals of the faces. Will save in the .normals array.
 * @method updateNormals
 */
Trimesh.prototype.updateNormals = function(){
    var n = computeNormals_n;

    // Generate normals
    var normals = this.normals;
    for(var i=0; i < this.indices.length / 3; i++){
        var i3 = i * 3;

        var a = this.indices[i3],
            b = this.indices[i3 + 1],
            c = this.indices[i3 + 2];

        this.getVertex(a, va);
        this.getVertex(b, vb);
        this.getVertex(c, vc);

        Trimesh.computeNormal(vb, va, vc, n);

        normals[i3] = n.x;
        normals[i3 + 1] = n.y;
        normals[i3 + 2] = n.z;
    }
};

/**
 * Update the .edges property
 * @method updateEdges
 */
Trimesh.prototype.updateEdges = function(){
    var edges = {};
    var add = function(indexA, indexB){
        var key = a < b ? a + '_' + b : b + '_' + a;
        edges[key] = true;
    };
    for(var i=0; i < this.indices.length / 3; i++){
        var i3 = i * 3;
        var a = this.indices[i3],
            b = this.indices[i3 + 1],
            c = this.indices[i3 + 2];
        add(a,b);
        add(b,c);
        add(c,a);
    }
    var keys = Object.keys(edges);
    this.edges = new Int16Array(keys.length * 2);
    for (var i = 0; i < keys.length; i++) {
        var indices = keys[i].split('_');
        this.edges[2 * i] = parseInt(indices[0], 10);
        this.edges[2 * i + 1] = parseInt(indices[1], 10);
    }
};

/**
 * Get an edge vertex
 * @method getEdgeVertex
 * @param  {number} edgeIndex
 * @param  {number} firstOrSecond 0 or 1, depending on which one of the vertices you need.
 * @param  {Vec3} vertexStore Where to store the result
 */
Trimesh.prototype.getEdgeVertex = function(edgeIndex, firstOrSecond, vertexStore){
    var vertexIndex = this.edges[edgeIndex * 2 + (firstOrSecond ? 1 : 0)];
    this.getVertex(vertexIndex, vertexStore);
};

var getEdgeVector_va = new Vec3();
var getEdgeVector_vb = new Vec3();

/**
 * Get a vector along an edge.
 * @method getEdgeVector
 * @param  {number} edgeIndex
 * @param  {Vec3} vectorStore
 */
Trimesh.prototype.getEdgeVector = function(edgeIndex, vectorStore){
    var va = getEdgeVector_va;
    var vb = getEdgeVector_vb;
    this.getEdgeVertex(edgeIndex, 0, va);
    this.getEdgeVertex(edgeIndex, 1, vb);
    vb.vsub(va, vectorStore);
};

/**
 * Get face normal given 3 vertices
 * @static
 * @method computeNormal
 * @param {Vec3} va
 * @param {Vec3} vb
 * @param {Vec3} vc
 * @param {Vec3} target
 */
var cb = new Vec3();
var ab = new Vec3();
Trimesh.computeNormal = function ( va, vb, vc, target ) {
    vb.vsub(va,ab);
    vc.vsub(vb,cb);
    cb.cross(ab,target);
    if ( !target.isZero() ) {
        target.normalize();
    }
};

var va = new Vec3();
var vb = new Vec3();
var vc = new Vec3();

/**
 * Get vertex i.
 * @method getVertex
 * @param  {number} i
 * @param  {Vec3} out
 * @return {Vec3} The "out" vector object
 */
Trimesh.prototype.getVertex = function(i, out){
    var scale = this.scale;
    this._getUnscaledVertex(i, out);
    out.x *= scale.x;
    out.y *= scale.y;
    out.z *= scale.z;
    return out;
};

/**
 * Get raw vertex i
 * @private
 * @method _getUnscaledVertex
 * @param  {number} i
 * @param  {Vec3} out
 * @return {Vec3} The "out" vector object
 */
Trimesh.prototype._getUnscaledVertex = function(i, out){
    var i3 = i * 3;
    var vertices = this.vertices;
    return out.set(
        vertices[i3],
        vertices[i3 + 1],
        vertices[i3 + 2]
    );
};

/**
 * Get a vertex from the trimesh,transformed by the given position and quaternion.
 * @method getWorldVertex
 * @param  {number} i
 * @param  {Vec3} pos
 * @param  {Quaternion} quat
 * @param  {Vec3} out
 * @return {Vec3} The "out" vector object
 */
Trimesh.prototype.getWorldVertex = function(i, pos, quat, out){
    this.getVertex(i, out);
    Transform.pointToWorldFrame(pos, quat, out, out);
    return out;
};

/**
 * Get the three vertices for triangle i.
 * @method getTriangleVertices
 * @param  {number} i
 * @param  {Vec3} a
 * @param  {Vec3} b
 * @param  {Vec3} c
 */
Trimesh.prototype.getTriangleVertices = function(i, a, b, c){
    var i3 = i * 3;
    this.getVertex(this.indices[i3], a);
    this.getVertex(this.indices[i3 + 1], b);
    this.getVertex(this.indices[i3 + 2], c);
};

/**
 * Compute the normal of triangle i.
 * @method getNormal
 * @param  {Number} i
 * @param  {Vec3} target
 * @return {Vec3} The "target" vector object
 */
Trimesh.prototype.getNormal = function(i, target){
    var i3 = i * 3;
    return target.set(
        this.normals[i3],
        this.normals[i3 + 1],
        this.normals[i3 + 2]
    );
};

var cli_aabb = new AABB();

/**
 * @method calculateLocalInertia
 * @param  {Number} mass
 * @param  {Vec3} target
 * @return {Vec3} The "target" vector object
 */
Trimesh.prototype.calculateLocalInertia = function(mass,target){
    // Approximate with box inertia
    // Exact inertia calculation is overkill, but see http://geometrictools.com/Documentation/PolyhedralMassProperties.pdf for the correct way to do it
    this.computeLocalAABB(cli_aabb);
    var x = cli_aabb.upperBound.x - cli_aabb.lowerBound.x,
        y = cli_aabb.upperBound.y - cli_aabb.lowerBound.y,
        z = cli_aabb.upperBound.z - cli_aabb.lowerBound.z;
    return target.set(
        1.0 / 12.0 * mass * ( 2*y*2*y + 2*z*2*z ),
        1.0 / 12.0 * mass * ( 2*x*2*x + 2*z*2*z ),
        1.0 / 12.0 * mass * ( 2*y*2*y + 2*x*2*x )
    );
};

var computeLocalAABB_worldVert = new Vec3();

/**
 * Compute the local AABB for the trimesh
 * @method computeLocalAABB
 * @param  {AABB} aabb
 */
Trimesh.prototype.computeLocalAABB = function(aabb){
    var l = aabb.lowerBound,
        u = aabb.upperBound,
        n = this.vertices.length,
        vertices = this.vertices,
        v = computeLocalAABB_worldVert;

    this.getVertex(0, v);
    l.copy(v);
    u.copy(v);

    for(var i=0; i !== n; i++){
        this.getVertex(i, v);

        if(v.x < l.x){
            l.x = v.x;
        } else if(v.x > u.x){
            u.x = v.x;
        }

        if(v.y < l.y){
            l.y = v.y;
        } else if(v.y > u.y){
            u.y = v.y;
        }

        if(v.z < l.z){
            l.z = v.z;
        } else if(v.z > u.z){
            u.z = v.z;
        }
    }
};


/**
 * Update the .aabb property
 * @method updateAABB
 */
Trimesh.prototype.updateAABB = function(){
    this.computeLocalAABB(this.aabb);
};

/**
 * Will update the .boundingSphereRadius property
 * @method updateBoundingSphereRadius
 */
Trimesh.prototype.updateBoundingSphereRadius = function(){
    // Assume points are distributed with local (0,0,0) as center
    var max2 = 0;
    var vertices = this.vertices;
    var v = new Vec3();
    for(var i=0, N=vertices.length / 3; i !== N; i++) {
        this.getVertex(i, v);
        var norm2 = v.norm2();
        if(norm2 > max2){
            max2 = norm2;
        }
    }
    this.boundingSphereRadius = Math.sqrt(max2);
};

var tempWorldVertex = new Vec3();
var calculateWorldAABB_frame = new Transform();
var calculateWorldAABB_aabb = new AABB();

/**
 * @method calculateWorldAABB
 * @param {Vec3}        pos
 * @param {Quaternion}  quat
 * @param {Vec3}        min
 * @param {Vec3}        max
 */
Trimesh.prototype.calculateWorldAABB = function(pos,quat,min,max){
    /*
    var n = this.vertices.length / 3,
        verts = this.vertices;
    var minx,miny,minz,maxx,maxy,maxz;

    var v = tempWorldVertex;
    for(var i=0; i<n; i++){
        this.getVertex(i, v);
        quat.vmult(v, v);
        pos.vadd(v, v);
        if (v.x < minx || minx===undefined){
            minx = v.x;
        } else if(v.x > maxx || maxx===undefined){
            maxx = v.x;
        }

        if (v.y < miny || miny===undefined){
            miny = v.y;
        } else if(v.y > maxy || maxy===undefined){
            maxy = v.y;
        }

        if (v.z < minz || minz===undefined){
            minz = v.z;
        } else if(v.z > maxz || maxz===undefined){
            maxz = v.z;
        }
    }
    min.set(minx,miny,minz);
    max.set(maxx,maxy,maxz);
    */

    // Faster approximation using local AABB
    var frame = calculateWorldAABB_frame;
    var result = calculateWorldAABB_aabb;
    frame.position = pos;
    frame.quaternion = quat;
    this.aabb.toWorldFrame(frame, result);
    min.copy(result.lowerBound);
    max.copy(result.upperBound);
};

/**
 * Get approximate volume
 * @method volume
 * @return {Number}
 */
Trimesh.prototype.volume = function(){
    return 4.0 * Math.PI * this.boundingSphereRadius / 3.0;
};

/**
 * Create a Trimesh instance, shaped as a torus.
 * @static
 * @method createTorus
 * @param  {number} [radius=1]
 * @param  {number} [tube=0.5]
 * @param  {number} [radialSegments=8]
 * @param  {number} [tubularSegments=6]
 * @param  {number} [arc=6.283185307179586]
 * @return {Trimesh} A torus
 */
Trimesh.createTorus = function (radius, tube, radialSegments, tubularSegments, arc) {
    radius = radius || 1;
    tube = tube || 0.5;
    radialSegments = radialSegments || 8;
    tubularSegments = tubularSegments || 6;
    arc = arc || Math.PI * 2;

    var vertices = [];
    var indices = [];

    for ( var j = 0; j <= radialSegments; j ++ ) {
        for ( var i = 0; i <= tubularSegments; i ++ ) {
            var u = i / tubularSegments * arc;
            var v = j / radialSegments * Math.PI * 2;

            var x = ( radius + tube * Math.cos( v ) ) * Math.cos( u );
            var y = ( radius + tube * Math.cos( v ) ) * Math.sin( u );
            var z = tube * Math.sin( v );

            vertices.push( x, y, z );
        }
    }

    for ( var j = 1; j <= radialSegments; j ++ ) {
        for ( var i = 1; i <= tubularSegments; i ++ ) {
            var a = ( tubularSegments + 1 ) * j + i - 1;
            var b = ( tubularSegments + 1 ) * ( j - 1 ) + i - 1;
            var c = ( tubularSegments + 1 ) * ( j - 1 ) + i;
            var d = ( tubularSegments + 1 ) * j + i;

            indices.push(a, b, d);
            indices.push(b, c, d);
        }
    }

    return new Trimesh(vertices, indices);
};

},{"../collision/AABB":3,"../math/Quaternion":28,"../math/Transform":29,"../math/Vec3":30,"../utils/Octree":50,"./Shape":43}],46:[function(_dereq_,module,exports){
module.exports = GSSolver;

var Vec3 = _dereq_('../math/Vec3');
var Quaternion = _dereq_('../math/Quaternion');
var Solver = _dereq_('./Solver');

/**
 * Constraint equation Gauss-Seidel solver.
 * @class GSSolver
 * @constructor
 * @todo The spook parameters should be specified for each constraint, not globally.
 * @author schteppe / https://github.com/schteppe
 * @see https://www8.cs.umu.se/kurser/5DV058/VT09/lectures/spooknotes.pdf
 * @extends Solver
 */
function GSSolver(){
    Solver.call(this);

    /**
     * The number of solver iterations determines quality of the constraints in the world. The more iterations, the more correct simulation. More iterations need more computations though. If you have a large gravity force in your world, you will need more iterations.
     * @property iterations
     * @type {Number}
     * @todo write more about solver and iterations in the wiki
     */
    this.iterations = 10;

    /**
     * When tolerance is reached, the system is assumed to be converged.
     * @property tolerance
     * @type {Number}
     */
    this.tolerance = 1e-7;
}
GSSolver.prototype = new Solver();

var GSSolver_solve_lambda = []; // Just temporary number holders that we want to reuse each solve.
var GSSolver_solve_invCs = [];
var GSSolver_solve_Bs = [];
GSSolver.prototype.solve = function(dt,world){
    var iter = 0,
        maxIter = this.iterations,
        tolSquared = this.tolerance*this.tolerance,
        equations = this.equations,
        Neq = equations.length,
        bodies = world.bodies,
        Nbodies = bodies.length,
        h = dt,
        q, B, invC, deltalambda, deltalambdaTot, GWlambda, lambdaj;

    // Update solve mass
    if(Neq !== 0){
        for(var i=0; i!==Nbodies; i++){
            bodies[i].updateSolveMassProperties();
        }
    }

    // Things that does not change during iteration can be computed once
    var invCs = GSSolver_solve_invCs,
        Bs = GSSolver_solve_Bs,
        lambda = GSSolver_solve_lambda;
    invCs.length = Neq;
    Bs.length = Neq;
    lambda.length = Neq;
    for(var i=0; i!==Neq; i++){
        var c = equations[i];
        lambda[i] = 0.0;
        Bs[i] = c.computeB(h);
        invCs[i] = 1.0 / c.computeC();
    }

    if(Neq !== 0){

        // Reset vlambda
        for(var i=0; i!==Nbodies; i++){
            var b=bodies[i],
                vlambda=b.vlambda,
                wlambda=b.wlambda;
            vlambda.set(0,0,0);
            if(wlambda){
                wlambda.set(0,0,0);
            }
        }

        // Iterate over equations
        for(iter=0; iter!==maxIter; iter++){

            // Accumulate the total error for each iteration.
            deltalambdaTot = 0.0;

            for(var j=0; j!==Neq; j++){

                var c = equations[j];

                // Compute iteration
                B = Bs[j];
                invC = invCs[j];
                lambdaj = lambda[j];
                GWlambda = c.computeGWlambda();
                deltalambda = invC * ( B - GWlambda - c.eps * lambdaj );

                // Clamp if we are not within the min/max interval
                if(lambdaj + deltalambda < c.minForce){
                    deltalambda = c.minForce - lambdaj;
                } else if(lambdaj + deltalambda > c.maxForce){
                    deltalambda = c.maxForce - lambdaj;
                }
                lambda[j] += deltalambda;

                deltalambdaTot += deltalambda > 0.0 ? deltalambda : -deltalambda; // abs(deltalambda)

                c.addToWlambda(deltalambda);
            }

            // If the total error is small enough - stop iterate
            if(deltalambdaTot*deltalambdaTot < tolSquared){
                break;
            }
        }

        // Add result to velocity
        for(var i=0; i!==Nbodies; i++){
            var b=bodies[i],
                v=b.velocity,
                w=b.angularVelocity;
            v.vadd(b.vlambda, v);
            if(w){
                w.vadd(b.wlambda, w);
            }
        }
    }

    return iter;
};

},{"../math/Quaternion":28,"../math/Vec3":30,"./Solver":47}],47:[function(_dereq_,module,exports){
module.exports = Solver;

/**
 * Constraint equation solver base class.
 * @class Solver
 * @constructor
 * @author schteppe / https://github.com/schteppe
 */
function Solver(){
    /**
     * All equations to be solved
     * @property {Array} equations
     */
    this.equations = [];
}

/**
 * Should be implemented in subclasses!
 * @method solve
 * @param  {Number} dt
 * @param  {World} world
 */
Solver.prototype.solve = function(dt,world){
    // Should return the number of iterations done!
    return 0;
};

/**
 * Add an equation
 * @method addEquation
 * @param {Equation} eq
 */
Solver.prototype.addEquation = function(eq){
    if (eq.enabled) {
        this.equations.push(eq);
    }
};

/**
 * Remove an equation
 * @method removeEquation
 * @param {Equation} eq
 */
Solver.prototype.removeEquation = function(eq){
    var eqs = this.equations;
    var i = eqs.indexOf(eq);
    if(i !== -1){
        eqs.splice(i,1);
    }
};

/**
 * Add all equations
 * @method removeAllEquations
 */
Solver.prototype.removeAllEquations = function(){
    this.equations.length = 0;
};


},{}],48:[function(_dereq_,module,exports){
module.exports = SplitSolver;

var Vec3 = _dereq_('../math/Vec3');
var Quaternion = _dereq_('../math/Quaternion');
var Solver = _dereq_('./Solver');
var Body = _dereq_('../objects/Body');

/**
 * Splits the equations into islands and solves them independently. Can improve performance.
 * @class SplitSolver
 * @constructor
 * @extends Solver
 * @param {Solver} subsolver
 */
function SplitSolver(subsolver){
    Solver.call(this);
    this.iterations = 10;
    this.tolerance = 1e-7;
    this.subsolver = subsolver;
    this.nodes = [];
    this.nodePool = [];

    // Create needed nodes, reuse if possible
    while(this.nodePool.length < 128){
        this.nodePool.push(this.createNode());
    }
}
SplitSolver.prototype = new Solver();

// Returns the number of subsystems
var SplitSolver_solve_nodes = []; // All allocated node objects
var SplitSolver_solve_nodePool = []; // All allocated node objects
var SplitSolver_solve_eqs = [];   // Temp array
var SplitSolver_solve_bds = [];   // Temp array
var SplitSolver_solve_dummyWorld = {bodies:[]}; // Temp object

var STATIC = Body.STATIC;
function getUnvisitedNode(nodes){
    var Nnodes = nodes.length;
    for(var i=0; i!==Nnodes; i++){
        var node = nodes[i];
        if(!node.visited && !(node.body.type & STATIC)){
            return node;
        }
    }
    return false;
}

var queue = [];
function bfs(root,visitFunc,bds,eqs){
    queue.push(root);
    root.visited = true;
    visitFunc(root,bds,eqs);
    while(queue.length) {
        var node = queue.pop();
        // Loop over unvisited child nodes
        var child;
        while((child = getUnvisitedNode(node.children))) {
            child.visited = true;
            visitFunc(child,bds,eqs);
            queue.push(child);
        }
    }
}

function visitFunc(node,bds,eqs){
    bds.push(node.body);
    var Neqs = node.eqs.length;
    for(var i=0; i!==Neqs; i++){
        var eq = node.eqs[i];
        if(eqs.indexOf(eq) === -1){
            eqs.push(eq);
        }
    }
}

SplitSolver.prototype.createNode = function(){
    return { body:null, children:[], eqs:[], visited:false };
};

/**
 * Solve the subsystems
 * @method solve
 * @param  {Number} dt
 * @param  {World} world
 */
SplitSolver.prototype.solve = function(dt,world){
    var nodes=SplitSolver_solve_nodes,
        nodePool=this.nodePool,
        bodies=world.bodies,
        equations=this.equations,
        Neq=equations.length,
        Nbodies=bodies.length,
        subsolver=this.subsolver;

    // Create needed nodes, reuse if possible
    while(nodePool.length < Nbodies){
        nodePool.push(this.createNode());
    }
    nodes.length = Nbodies;
    for (var i = 0; i < Nbodies; i++) {
        nodes[i] = nodePool[i];
    }

    // Reset node values
    for(var i=0; i!==Nbodies; i++){
        var node = nodes[i];
        node.body = bodies[i];
        node.children.length = 0;
        node.eqs.length = 0;
        node.visited = false;
    }
    for(var k=0; k!==Neq; k++){
        var eq=equations[k],
            i=bodies.indexOf(eq.bi),
            j=bodies.indexOf(eq.bj),
            ni=nodes[i],
            nj=nodes[j];
        ni.children.push(nj);
        ni.eqs.push(eq);
        nj.children.push(ni);
        nj.eqs.push(eq);
    }

    var child, n=0, eqs=SplitSolver_solve_eqs;

    subsolver.tolerance = this.tolerance;
    subsolver.iterations = this.iterations;

    var dummyWorld = SplitSolver_solve_dummyWorld;
    while((child = getUnvisitedNode(nodes))){
        eqs.length = 0;
        dummyWorld.bodies.length = 0;
        bfs(child, visitFunc, dummyWorld.bodies, eqs);

        var Neqs = eqs.length;

        eqs = eqs.sort(sortById);

        for(var i=0; i!==Neqs; i++){
            subsolver.addEquation(eqs[i]);
        }

        var iter = subsolver.solve(dt,dummyWorld);
        subsolver.removeAllEquations();
        n++;
    }

    return n;
};

function sortById(a, b){
    return b.id - a.id;
}
},{"../math/Quaternion":28,"../math/Vec3":30,"../objects/Body":31,"./Solver":47}],49:[function(_dereq_,module,exports){
/**
 * Base class for objects that dispatches events.
 * @class EventTarget
 * @constructor
 */
var EventTarget = function () {

};

module.exports = EventTarget;

EventTarget.prototype = {
    constructor: EventTarget,

    /**
     * Add an event listener
     * @method addEventListener
     * @param  {String} type
     * @param  {Function} listener
     * @return {EventTarget} The self object, for chainability.
     */
    addEventListener: function ( type, listener ) {
        if ( this._listeners === undefined ){ this._listeners = {}; }
        var listeners = this._listeners;
        if ( listeners[ type ] === undefined ) {
            listeners[ type ] = [];
        }
        if ( listeners[ type ].indexOf( listener ) === - 1 ) {
            listeners[ type ].push( listener );
        }
        return this;
    },

    /**
     * Check if an event listener is added
     * @method hasEventListener
     * @param  {String} type
     * @param  {Function} listener
     * @return {Boolean}
     */
    hasEventListener: function ( type, listener ) {
        if ( this._listeners === undefined ){ return false; }
        var listeners = this._listeners;
        if ( listeners[ type ] !== undefined && listeners[ type ].indexOf( listener ) !== - 1 ) {
            return true;
        }
        return false;
    },

    /**
     * Remove an event listener
     * @method removeEventListener
     * @param  {String} type
     * @param  {Function} listener
     * @return {EventTarget} The self object, for chainability.
     */
    removeEventListener: function ( type, listener ) {
        if ( this._listeners === undefined ){ return this; }
        var listeners = this._listeners;
        if ( listeners[type] === undefined ){ return this; }
        var index = listeners[ type ].indexOf( listener );
        if ( index !== - 1 ) {
            listeners[ type ].splice( index, 1 );
        }
        return this;
    },

    /**
     * Emit an event.
     * @method dispatchEvent
     * @param  {Object} event
     * @param  {String} event.type
     * @return {EventTarget} The self object, for chainability.
     */
    dispatchEvent: function ( event ) {
        if ( this._listeners === undefined ){ return this; }
        var listeners = this._listeners;
        var listenerArray = listeners[ event.type ];
        if ( listenerArray !== undefined ) {
            event.target = this;
            for ( var i = 0, l = listenerArray.length; i < l; i ++ ) {
                listenerArray[ i ].call( this, event );
            }
        }
        return this;
    }
};

},{}],50:[function(_dereq_,module,exports){
var AABB = _dereq_('../collision/AABB');
var Vec3 = _dereq_('../math/Vec3');

module.exports = Octree;

/**
 * @class OctreeNode
 * @param {object} [options]
 * @param {Octree} [options.root]
 * @param {AABB} [options.aabb]
 */
function OctreeNode(options){
    options = options || {};

    /**
     * The root node
     * @property {OctreeNode} root
     */
    this.root = options.root || null;

    /**
     * Boundary of this node
     * @property {AABB} aabb
     */
    this.aabb = options.aabb ? options.aabb.clone() : new AABB();

    /**
     * Contained data at the current node level.
     * @property {Array} data
     */
    this.data = [];

    /**
     * Children to this node
     * @property {Array} children
     */
    this.children = [];
}

/**
 * @class Octree
 * @param {AABB} aabb The total AABB of the tree
 * @param {object} [options]
 * @param {number} [options.maxDepth=8]
 * @extends OctreeNode
 */
function Octree(aabb, options){
    options = options || {};
    options.root = null;
    options.aabb = aabb;
    OctreeNode.call(this, options);

    /**
     * Maximum subdivision depth
     * @property {number} maxDepth
     */
    this.maxDepth = typeof(options.maxDepth) !== 'undefined' ? options.maxDepth : 8;
}
Octree.prototype = new OctreeNode();

OctreeNode.prototype.reset = function(aabb, options){
    this.children.length = this.data.length = 0;
};

/**
 * Insert data into this node
 * @method insert
 * @param  {AABB} aabb
 * @param  {object} elementData
 * @return {boolean} True if successful, otherwise false
 */
OctreeNode.prototype.insert = function(aabb, elementData, level){
    var nodeData = this.data;
    level = level || 0;

    // Ignore objects that do not belong in this node
    if (!this.aabb.contains(aabb)){
        return false; // object cannot be added
    }

    var children = this.children;

    if(level < (this.maxDepth || this.root.maxDepth)){
        // Subdivide if there are no children yet
        var subdivided = false;
        if (!children.length){
            this.subdivide();
            subdivided = true;
        }

        // add to whichever node will accept it
        for (var i = 0; i !== 8; i++) {
            if (children[i].insert(aabb, elementData, level + 1)){
                return true;
            }
        }

        if(subdivided){
            // No children accepted! Might as well just remove em since they contain none
            children.length = 0;
        }
    }

    // Too deep, or children didnt want it. add it in current node
    nodeData.push(elementData);

    return true;
};

var halfDiagonal = new Vec3();

/**
 * Create 8 equally sized children nodes and put them in the .children array.
 * @method subdivide
 */
OctreeNode.prototype.subdivide = function() {
    var aabb = this.aabb;
    var l = aabb.lowerBound;
    var u = aabb.upperBound;

    var children = this.children;

    children.push(
        new OctreeNode({ aabb: new AABB({ lowerBound: new Vec3(0,0,0) }) }),
        new OctreeNode({ aabb: new AABB({ lowerBound: new Vec3(1,0,0) }) }),
        new OctreeNode({ aabb: new AABB({ lowerBound: new Vec3(1,1,0) }) }),
        new OctreeNode({ aabb: new AABB({ lowerBound: new Vec3(1,1,1) }) }),
        new OctreeNode({ aabb: new AABB({ lowerBound: new Vec3(0,1,1) }) }),
        new OctreeNode({ aabb: new AABB({ lowerBound: new Vec3(0,0,1) }) }),
        new OctreeNode({ aabb: new AABB({ lowerBound: new Vec3(1,0,1) }) }),
        new OctreeNode({ aabb: new AABB({ lowerBound: new Vec3(0,1,0) }) })
    );

    u.vsub(l, halfDiagonal);
    halfDiagonal.scale(0.5, halfDiagonal);

    var root = this.root || this;

    for (var i = 0; i !== 8; i++) {
        var child = children[i];

        // Set current node as root
        child.root = root;

        // Compute bounds
        var lowerBound = child.aabb.lowerBound;
        lowerBound.x *= halfDiagonal.x;
        lowerBound.y *= halfDiagonal.y;
        lowerBound.z *= halfDiagonal.z;

        lowerBound.vadd(l, lowerBound);

        // Upper bound is always lower bound + halfDiagonal
        lowerBound.vadd(halfDiagonal, child.aabb.upperBound);
    }
};

/**
 * Get all data, potentially within an AABB
 * @method aabbQuery
 * @param  {AABB} aabb
 * @param  {array} result
 * @return {array} The "result" object
 */
OctreeNode.prototype.aabbQuery = function(aabb, result) {

    var nodeData = this.data;

    // abort if the range does not intersect this node
    // if (!this.aabb.overlaps(aabb)){
    //     return result;
    // }

    // Add objects at this level
    // Array.prototype.push.apply(result, nodeData);

    // Add child data
    // @todo unwrap recursion into a queue / loop, that's faster in JS
    var children = this.children;


    // for (var i = 0, N = this.children.length; i !== N; i++) {
    //     children[i].aabbQuery(aabb, result);
    // }

    var queue = [this];
    while (queue.length) {
        var node = queue.pop();
        if (node.aabb.overlaps(aabb)){
            Array.prototype.push.apply(result, node.data);
        }
        Array.prototype.push.apply(queue, node.children);
    }

    return result;
};

var tmpAABB = new AABB();

/**
 * Get all data, potentially intersected by a ray.
 * @method rayQuery
 * @param  {Ray} ray
 * @param  {Transform} treeTransform
 * @param  {array} result
 * @return {array} The "result" object
 */
OctreeNode.prototype.rayQuery = function(ray, treeTransform, result) {

    // Use aabb query for now.
    // @todo implement real ray query which needs less lookups
    ray.getAABB(tmpAABB);
    tmpAABB.toLocalFrame(treeTransform, tmpAABB);
    this.aabbQuery(tmpAABB, result);

    return result;
};

/**
 * @method removeEmptyNodes
 */
OctreeNode.prototype.removeEmptyNodes = function() {
    var queue = [this];
    while (queue.length) {
        var node = queue.pop();
        for (var i = node.children.length - 1; i >= 0; i--) {
            if(!node.children[i].data.length){
                node.children.splice(i, 1);
            }
        }
        Array.prototype.push.apply(queue, node.children);
    }
};

},{"../collision/AABB":3,"../math/Vec3":30}],51:[function(_dereq_,module,exports){
module.exports = Pool;

/**
 * For pooling objects that can be reused.
 * @class Pool
 * @constructor
 */
function Pool(){
    /**
     * The pooled objects
     * @property {Array} objects
     */
    this.objects = [];

    /**
     * Constructor of the objects
     * @property {mixed} type
     */
    this.type = Object;
}

/**
 * Release an object after use
 * @method release
 * @param {Object} obj
 */
Pool.prototype.release = function(){
    var Nargs = arguments.length;
    for(var i=0; i!==Nargs; i++){
        this.objects.push(arguments[i]);
    }
};

/**
 * Get an object
 * @method get
 * @return {mixed}
 */
Pool.prototype.get = function(){
    if(this.objects.length===0){
        return this.constructObject();
    } else {
        return this.objects.pop();
    }
};

/**
 * Construct an object. Should be implmented in each subclass.
 * @method constructObject
 * @return {mixed}
 */
Pool.prototype.constructObject = function(){
    throw new Error("constructObject() not implemented in this Pool subclass yet!");
};

},{}],52:[function(_dereq_,module,exports){
module.exports = TupleDictionary;

/**
 * @class TupleDictionary
 * @constructor
 */
function TupleDictionary() {

    /**
     * The data storage
     * @property data
     * @type {Object}
     */
    this.data = { keys:[] };
}

/**
 * @method get
 * @param  {Number} i
 * @param  {Number} j
 * @return {Number}
 */
TupleDictionary.prototype.get = function(i, j) {
    if (i > j) {
        // swap
        var temp = j;
        j = i;
        i = temp;
    }
    return this.data[i+'-'+j];
};

/**
 * @method set
 * @param  {Number} i
 * @param  {Number} j
 * @param {Number} value
 */
TupleDictionary.prototype.set = function(i, j, value) {
    if (i > j) {
        var temp = j;
        j = i;
        i = temp;
    }
    var key = i+'-'+j;

    // Check if key already exists
    if(!this.get(i,j)){
        this.data.keys.push(key);
    }

    this.data[key] = value;
};

/**
 * @method reset
 */
TupleDictionary.prototype.reset = function() {
    var data = this.data,
        keys = data.keys;
    while(keys.length > 0){
        var key = keys.pop();
        delete data[key];
    }
};

},{}],53:[function(_dereq_,module,exports){
function Utils(){}

module.exports = Utils;

/**
 * Extend an options object with default values.
 * @static
 * @method defaults
 * @param  {object} options The options object. May be falsy: in this case, a new object is created and returned.
 * @param  {object} defaults An object containing default values.
 * @return {object} The modified options object.
 */
Utils.defaults = function(options, defaults){
    options = options || {};

    for(var key in defaults){
        if(!(key in options)){
            options[key] = defaults[key];
        }
    }

    return options;
};

},{}],54:[function(_dereq_,module,exports){
module.exports = Vec3Pool;

var Vec3 = _dereq_('../math/Vec3');
var Pool = _dereq_('./Pool');

/**
 * @class Vec3Pool
 * @constructor
 * @extends Pool
 */
function Vec3Pool(){
    Pool.call(this);
    this.type = Vec3;
}
Vec3Pool.prototype = new Pool();

/**
 * Construct a vector
 * @method constructObject
 * @return {Vec3}
 */
Vec3Pool.prototype.constructObject = function(){
    return new Vec3();
};

},{"../math/Vec3":30,"./Pool":51}],55:[function(_dereq_,module,exports){
module.exports = Narrowphase;

var AABB = _dereq_('../collision/AABB');
var Shape = _dereq_('../shapes/Shape');
var Ray = _dereq_('../collision/Ray');
var Vec3 = _dereq_('../math/Vec3');
var Transform = _dereq_('../math/Transform');
var ConvexPolyhedron = _dereq_('../shapes/ConvexPolyhedron');
var Quaternion = _dereq_('../math/Quaternion');
var Solver = _dereq_('../solver/Solver');
var Vec3Pool = _dereq_('../utils/Vec3Pool');
var ContactEquation = _dereq_('../equations/ContactEquation');
var FrictionEquation = _dereq_('../equations/FrictionEquation');

/**
 * Helper class for the World. Generates ContactEquations.
 * @class Narrowphase
 * @constructor
 * @todo Sphere-ConvexPolyhedron contacts
 * @todo Contact reduction
 * @todo  should move methods to prototype
 */
function Narrowphase(world){

    /**
     * Internal storage of pooled contact points.
     * @property {Array} contactPointPool
     */
    this.contactPointPool = [];

    this.frictionEquationPool = [];

    this.result = [];
    this.frictionResult = [];

    /**
     * Pooled vectors.
     * @property {Vec3Pool} v3pool
     */
    this.v3pool = new Vec3Pool();

    this.world = world;
    this.currentContactMaterial = null;

    /**
     * @property {Boolean} enableFrictionReduction
     */
    this.enableFrictionReduction = false;
}

/**
 * Make a contact object, by using the internal pool or creating a new one.
 * @method createContactEquation
 * @return {ContactEquation}
 */
Narrowphase.prototype.createContactEquation = function(bi, bj, si, sj, rsi, rsj){
    var c;
    if(this.contactPointPool.length){
        c = this.contactPointPool.pop();
        c.bi = bi;
        c.bj = bj;
    } else {
        c = new ContactEquation(bi, bj);
    }

    c.enabled = bi.collisionResponse && bj.collisionResponse && si.collisionResponse && sj.collisionResponse;

    var cm = this.currentContactMaterial;

    c.restitution = cm.restitution;

    c.setSpookParams(
        cm.contactEquationStiffness,
        cm.contactEquationRelaxation,
        this.world.dt
    );

    var matA = si.material || bi.material;
    var matB = sj.material || bj.material;
    if(matA && matB && matA.restitution >= 0 && matB.restitution >= 0){
        c.restitution = matA.restitution * matB.restitution;
    }

    c.si = rsi || si;
    c.sj = rsj || sj;

    return c;
};

Narrowphase.prototype.createFrictionEquationsFromContact = function(contactEquation, outArray){
    var bodyA = contactEquation.bi;
    var bodyB = contactEquation.bj;
    var shapeA = contactEquation.si;
    var shapeB = contactEquation.sj;

    var world = this.world;
    var cm = this.currentContactMaterial;

    // If friction or restitution were specified in the material, use them
    var friction = cm.friction;
    var matA = shapeA.material || bodyA.material;
    var matB = shapeB.material || bodyB.material;
    if(matA && matB && matA.friction >= 0 && matB.friction >= 0){
        friction = matA.friction * matB.friction;
    }

    if(friction > 0){

        // Create 2 tangent equations
        var mug = friction * world.gravity.length();
        var reducedMass = (bodyA.invMass + bodyB.invMass);
        if(reducedMass > 0){
            reducedMass = 1/reducedMass;
        }
        var pool = this.frictionEquationPool;
        var c1 = pool.length ? pool.pop() : new FrictionEquation(bodyA,bodyB,mug*reducedMass);
        var c2 = pool.length ? pool.pop() : new FrictionEquation(bodyA,bodyB,mug*reducedMass);

        c1.bi = c2.bi = bodyA;
        c1.bj = c2.bj = bodyB;
        c1.minForce = c2.minForce = -mug*reducedMass;
        c1.maxForce = c2.maxForce = mug*reducedMass;

        // Copy over the relative vectors
        c1.ri.copy(contactEquation.ri);
        c1.rj.copy(contactEquation.rj);
        c2.ri.copy(contactEquation.ri);
        c2.rj.copy(contactEquation.rj);

        // Construct tangents
        contactEquation.ni.tangents(c1.t, c2.t);

        // Set spook params
        c1.setSpookParams(cm.frictionEquationStiffness, cm.frictionEquationRelaxation, world.dt);
        c2.setSpookParams(cm.frictionEquationStiffness, cm.frictionEquationRelaxation, world.dt);

        c1.enabled = c2.enabled = contactEquation.enabled;

        outArray.push(c1, c2);

        return true;
    }

    return false;
};

var averageNormal = new Vec3();
var averageContactPointA = new Vec3();
var averageContactPointB = new Vec3();

// Take the average N latest contact point on the plane.
Narrowphase.prototype.createFrictionFromAverage = function(numContacts){
    // The last contactEquation
    var c = this.result[this.result.length - 1];

    // Create the result: two "average" friction equations
    if (!this.createFrictionEquationsFromContact(c, this.frictionResult) || numContacts === 1) {
        return;
    }

    var f1 = this.frictionResult[this.frictionResult.length - 2];
    var f2 = this.frictionResult[this.frictionResult.length - 1];

    averageNormal.setZero();
    averageContactPointA.setZero();
    averageContactPointB.setZero();

    var bodyA = c.bi;
    var bodyB = c.bj;
    for(var i=0; i!==numContacts; i++){
        c = this.result[this.result.length - 1 - i];
        if(c.bodyA !== bodyA){
            averageNormal.vadd(c.ni, averageNormal); // vec2.add(eq.t, eq.t, c.normalA);
            averageContactPointA.vadd(c.ri, averageContactPointA); // vec2.add(eq.contactPointA, eq.contactPointA, c.contactPointA);
            averageContactPointB.vadd(c.rj, averageContactPointB);
        } else {
            averageNormal.vsub(c.ni, averageNormal); // vec2.sub(eq.t, eq.t, c.normalA);
            averageContactPointA.vadd(c.rj, averageContactPointA); // vec2.add(eq.contactPointA, eq.contactPointA, c.contactPointA);
            averageContactPointB.vadd(c.ri, averageContactPointB);
        }
    }

    var invNumContacts = 1 / numContacts;
    averageContactPointA.scale(invNumContacts, f1.ri); // vec2.scale(eq.contactPointA, eq.contactPointA, invNumContacts);
    averageContactPointB.scale(invNumContacts, f1.rj); // vec2.scale(eq.contactPointB, eq.contactPointB, invNumContacts);
    f2.ri.copy(f1.ri); // Should be the same
    f2.rj.copy(f1.rj);
    averageNormal.normalize();
    averageNormal.tangents(f1.t, f2.t);
    // return eq;
};


var tmpVec1 = new Vec3();
var tmpVec2 = new Vec3();
var tmpQuat1 = new Quaternion();
var tmpQuat2 = new Quaternion();

/**
 * Generate all contacts between a list of body pairs
 * @method getContacts
 * @param {array} p1 Array of body indices
 * @param {array} p2 Array of body indices
 * @param {World} world
 * @param {array} result Array to store generated contacts
 * @param {array} oldcontacts Optional. Array of reusable contact objects
 */
Narrowphase.prototype.getContacts = function(p1, p2, world, result, oldcontacts, frictionResult, frictionPool){
    // Save old contact objects
    this.contactPointPool = oldcontacts;
    this.frictionEquationPool = frictionPool;
    this.result = result;
    this.frictionResult = frictionResult;

    var qi = tmpQuat1;
    var qj = tmpQuat2;
    var xi = tmpVec1;
    var xj = tmpVec2;

    for(var k=0, N=p1.length; k!==N; k++){

        // Get current collision bodies
        var bi = p1[k],
            bj = p2[k];

        // Get contact material
        var bodyContactMaterial = null;
        if(bi.material && bj.material){
            bodyContactMaterial = world.getContactMaterial(bi.material,bj.material) || null;
        }

        for (var i = 0; i < bi.shapes.length; i++) {
            bi.quaternion.mult(bi.shapeOrientations[i], qi);
            bi.quaternion.vmult(bi.shapeOffsets[i], xi);
            xi.vadd(bi.position, xi);
            var si = bi.shapes[i];

            for (var j = 0; j < bj.shapes.length; j++) {

                // Compute world transform of shapes
                bj.quaternion.mult(bj.shapeOrientations[j], qj);
                bj.quaternion.vmult(bj.shapeOffsets[j], xj);
                xj.vadd(bj.position, xj);
                var sj = bj.shapes[j];

                if(xi.distanceTo(xj) > si.boundingSphereRadius + sj.boundingSphereRadius){
                    continue;
                }

                // Get collision material
                var shapeContactMaterial = null;
                if(si.material && sj.material){
                    shapeContactMaterial = world.getContactMaterial(si.material,sj.material) || null;
                }

                this.currentContactMaterial = shapeContactMaterial || bodyContactMaterial || world.defaultContactMaterial;

                // Get contacts
                var resolver = this[si.type | sj.type];
                if(resolver){
                    if (si.type < sj.type) {
                        resolver.call(this, si, sj, xi, xj, qi, qj, bi, bj, si, sj);
                    } else {
                        resolver.call(this, sj, si, xj, xi, qj, qi, bj, bi, si, sj);
                    }
                }
            }
        }
    }
};

var numWarnings = 0;
var maxWarnings = 10;

function warn(msg){
    if(numWarnings > maxWarnings){
        return;
    }

    numWarnings++;

    console.warn(msg);
}

Narrowphase.prototype[Shape.types.BOX | Shape.types.BOX] =
Narrowphase.prototype.boxBox = function(si,sj,xi,xj,qi,qj,bi,bj){
    si.convexPolyhedronRepresentation.material = si.material;
    sj.convexPolyhedronRepresentation.material = sj.material;
    si.convexPolyhedronRepresentation.collisionResponse = si.collisionResponse;
    sj.convexPolyhedronRepresentation.collisionResponse = sj.collisionResponse;
    this.convexConvex(si.convexPolyhedronRepresentation,sj.convexPolyhedronRepresentation,xi,xj,qi,qj,bi,bj,si,sj);
};

Narrowphase.prototype[Shape.types.BOX | Shape.types.CONVEXPOLYHEDRON] =
Narrowphase.prototype.boxConvex = function(si,sj,xi,xj,qi,qj,bi,bj){
    si.convexPolyhedronRepresentation.material = si.material;
    si.convexPolyhedronRepresentation.collisionResponse = si.collisionResponse;
    this.convexConvex(si.convexPolyhedronRepresentation,sj,xi,xj,qi,qj,bi,bj,si,sj);
};

Narrowphase.prototype[Shape.types.BOX | Shape.types.PARTICLE] =
Narrowphase.prototype.boxParticle = function(si,sj,xi,xj,qi,qj,bi,bj){
    si.convexPolyhedronRepresentation.material = si.material;
    si.convexPolyhedronRepresentation.collisionResponse = si.collisionResponse;
    this.convexParticle(si.convexPolyhedronRepresentation,sj,xi,xj,qi,qj,bi,bj,si,sj);
};

/**
 * @method sphereSphere
 * @param  {Shape}      si
 * @param  {Shape}      sj
 * @param  {Vec3}       xi
 * @param  {Vec3}       xj
 * @param  {Quaternion} qi
 * @param  {Quaternion} qj
 * @param  {Body}       bi
 * @param  {Body}       bj
 */
Narrowphase.prototype[Shape.types.SPHERE] =
Narrowphase.prototype.sphereSphere = function(si,sj,xi,xj,qi,qj,bi,bj){
    // We will have only one contact in this case
    var r = this.createContactEquation(bi,bj,si,sj);

    // Contact normal
    xj.vsub(xi, r.ni);
    r.ni.normalize();

    // Contact point locations
    r.ri.copy(r.ni);
    r.rj.copy(r.ni);
    r.ri.mult(si.radius, r.ri);
    r.rj.mult(-sj.radius, r.rj);

    r.ri.vadd(xi, r.ri);
    r.ri.vsub(bi.position, r.ri);

    r.rj.vadd(xj, r.rj);
    r.rj.vsub(bj.position, r.rj);

    this.result.push(r);

    this.createFrictionEquationsFromContact(r, this.frictionResult);
};

/**
 * @method planeTrimesh
 * @param  {Shape}      si
 * @param  {Shape}      sj
 * @param  {Vec3}       xi
 * @param  {Vec3}       xj
 * @param  {Quaternion} qi
 * @param  {Quaternion} qj
 * @param  {Body}       bi
 * @param  {Body}       bj
 */
var planeTrimesh_normal = new Vec3();
var planeTrimesh_relpos = new Vec3();
var planeTrimesh_projected = new Vec3();
Narrowphase.prototype[Shape.types.PLANE | Shape.types.TRIMESH] =
Narrowphase.prototype.planeTrimesh = function(
    planeShape,
    trimeshShape,
    planePos,
    trimeshPos,
    planeQuat,
    trimeshQuat,
    planeBody,
    trimeshBody
){
    // Make contacts!
    var v = new Vec3();

    var normal = planeTrimesh_normal;
    normal.set(0,0,1);
    planeQuat.vmult(normal,normal); // Turn normal according to plane

    for(var i=0; i<trimeshShape.vertices.length / 3; i++){

        // Get world vertex from trimesh
        trimeshShape.getVertex(i, v);

        // Safe up
        var v2 = new Vec3();
        v2.copy(v);
        Transform.pointToWorldFrame(trimeshPos, trimeshQuat, v2, v);

        // Check plane side
        var relpos = planeTrimesh_relpos;
        v.vsub(planePos, relpos);
        var dot = normal.dot(relpos);

        if(dot <= 0.0){
            var r = this.createContactEquation(planeBody,trimeshBody,planeShape,trimeshShape);

            r.ni.copy(normal); // Contact normal is the plane normal

            // Get vertex position projected on plane
            var projected = planeTrimesh_projected;
            normal.scale(relpos.dot(normal), projected);
            v.vsub(projected,projected);

            // ri is the projected world position minus plane position
            r.ri.copy(projected);
            r.ri.vsub(planeBody.position, r.ri);

            r.rj.copy(v);
            r.rj.vsub(trimeshBody.position, r.rj);

            // Store result
            this.result.push(r);
            this.createFrictionEquationsFromContact(r, this.frictionResult);
        }
    }
};

/**
 * @method sphereTrimesh
 * @param  {Shape}      sphereShape
 * @param  {Shape}      trimeshShape
 * @param  {Vec3}       spherePos
 * @param  {Vec3}       trimeshPos
 * @param  {Quaternion} sphereQuat
 * @param  {Quaternion} trimeshQuat
 * @param  {Body}       sphereBody
 * @param  {Body}       trimeshBody
 */
var sphereTrimesh_normal = new Vec3();
var sphereTrimesh_relpos = new Vec3();
var sphereTrimesh_projected = new Vec3();
var sphereTrimesh_v = new Vec3();
var sphereTrimesh_v2 = new Vec3();
var sphereTrimesh_edgeVertexA = new Vec3();
var sphereTrimesh_edgeVertexB = new Vec3();
var sphereTrimesh_edgeVector = new Vec3();
var sphereTrimesh_edgeVectorUnit = new Vec3();
var sphereTrimesh_localSpherePos = new Vec3();
var sphereTrimesh_tmp = new Vec3();
var sphereTrimesh_va = new Vec3();
var sphereTrimesh_vb = new Vec3();
var sphereTrimesh_vc = new Vec3();
var sphereTrimesh_localSphereAABB = new AABB();
var sphereTrimesh_triangles = [];
Narrowphase.prototype[Shape.types.SPHERE | Shape.types.TRIMESH] =
Narrowphase.prototype.sphereTrimesh = function (
    sphereShape,
    trimeshShape,
    spherePos,
    trimeshPos,
    sphereQuat,
    trimeshQuat,
    sphereBody,
    trimeshBody
) {

    var edgeVertexA = sphereTrimesh_edgeVertexA;
    var edgeVertexB = sphereTrimesh_edgeVertexB;
    var edgeVector = sphereTrimesh_edgeVector;
    var edgeVectorUnit = sphereTrimesh_edgeVectorUnit;
    var localSpherePos = sphereTrimesh_localSpherePos;
    var tmp = sphereTrimesh_tmp;
    var localSphereAABB = sphereTrimesh_localSphereAABB;
    var v2 = sphereTrimesh_v2;
    var relpos = sphereTrimesh_relpos;
    var triangles = sphereTrimesh_triangles;

    // Convert sphere position to local in the trimesh
    Transform.pointToLocalFrame(trimeshPos, trimeshQuat, spherePos, localSpherePos);

    // Get the aabb of the sphere locally in the trimesh
    var sphereRadius = sphereShape.radius;
    localSphereAABB.lowerBound.set(
        localSpherePos.x - sphereRadius,
        localSpherePos.y - sphereRadius,
        localSpherePos.z - sphereRadius
    );
    localSphereAABB.upperBound.set(
        localSpherePos.x + sphereRadius,
        localSpherePos.y + sphereRadius,
        localSpherePos.z + sphereRadius
    );

    trimeshShape.getTrianglesInAABB(localSphereAABB, triangles);
    //for (var i = 0; i < trimeshShape.indices.length / 3; i++) triangles.push(i); // All

    // Vertices
    var v = sphereTrimesh_v;
    var radiusSquared = sphereShape.radius * sphereShape.radius;
    for(var i=0; i<triangles.length; i++){
        for (var j = 0; j < 3; j++) {

            trimeshShape.getVertex(trimeshShape.indices[triangles[i] * 3 + j], v);

            // Check vertex overlap in sphere
            v.vsub(localSpherePos, relpos);

            if(relpos.norm2() <= radiusSquared){

                // Safe up
                v2.copy(v);
                Transform.pointToWorldFrame(trimeshPos, trimeshQuat, v2, v);

                v.vsub(spherePos, relpos);

                var r = this.createContactEquation(sphereBody,trimeshBody,sphereShape,trimeshShape);
                r.ni.copy(relpos);
                r.ni.normalize();

                // ri is the vector from sphere center to the sphere surface
                r.ri.copy(r.ni);
                r.ri.scale(sphereShape.radius, r.ri);
                r.ri.vadd(spherePos, r.ri);
                r.ri.vsub(sphereBody.position, r.ri);

                r.rj.copy(v);
                r.rj.vsub(trimeshBody.position, r.rj);

                // Store result
                this.result.push(r);
                this.createFrictionEquationsFromContact(r, this.frictionResult);
            }
        }
    }

    // Check all edges
    for(var i=0; i<triangles.length; i++){
        for (var j = 0; j < 3; j++) {

            trimeshShape.getVertex(trimeshShape.indices[triangles[i] * 3 + j], edgeVertexA);
            trimeshShape.getVertex(trimeshShape.indices[triangles[i] * 3 + ((j+1)%3)], edgeVertexB);
            edgeVertexB.vsub(edgeVertexA, edgeVector);

            // Project sphere position to the edge
            localSpherePos.vsub(edgeVertexB, tmp);
            var positionAlongEdgeB = tmp.dot(edgeVector);

            localSpherePos.vsub(edgeVertexA, tmp);
            var positionAlongEdgeA = tmp.dot(edgeVector);

            if(positionAlongEdgeA > 0 && positionAlongEdgeB < 0){

                // Now check the orthogonal distance from edge to sphere center
                localSpherePos.vsub(edgeVertexA, tmp);

                edgeVectorUnit.copy(edgeVector);
                edgeVectorUnit.normalize();
                positionAlongEdgeA = tmp.dot(edgeVectorUnit);

                edgeVectorUnit.scale(positionAlongEdgeA, tmp);
                tmp.vadd(edgeVertexA, tmp);

                // tmp is now the sphere center position projected to the edge, defined locally in the trimesh frame
                var dist = tmp.distanceTo(localSpherePos);
                if(dist < sphereShape.radius){
                    var r = this.createContactEquation(sphereBody, trimeshBody, sphereShape, trimeshShape);

                    tmp.vsub(localSpherePos, r.ni);
                    r.ni.normalize();
                    r.ni.scale(sphereShape.radius, r.ri);

                    Transform.pointToWorldFrame(trimeshPos, trimeshQuat, tmp, tmp);
                    tmp.vsub(trimeshBody.position, r.rj);

                    Transform.vectorToWorldFrame(trimeshQuat, r.ni, r.ni);
                    Transform.vectorToWorldFrame(trimeshQuat, r.ri, r.ri);

                    this.result.push(r);
                    this.createFrictionEquationsFromContact(r, this.frictionResult);
                }
            }
        }
    }

    // Triangle faces
    var va = sphereTrimesh_va;
    var vb = sphereTrimesh_vb;
    var vc = sphereTrimesh_vc;
    var normal = sphereTrimesh_normal;
    for(var i=0, N = triangles.length; i !== N; i++){
        trimeshShape.getTriangleVertices(triangles[i], va, vb, vc);
        trimeshShape.getNormal(triangles[i], normal);
        localSpherePos.vsub(va, tmp);
        var dist = tmp.dot(normal);
        normal.scale(dist, tmp);
        localSpherePos.vsub(tmp, tmp);

        // tmp is now the sphere position projected to the triangle plane
        dist = tmp.distanceTo(localSpherePos);
        if(Ray.pointInTriangle(tmp, va, vb, vc) && dist < sphereShape.radius){
            var r = this.createContactEquation(sphereBody, trimeshBody, sphereShape, trimeshShape);

            tmp.vsub(localSpherePos, r.ni);
            r.ni.normalize();
            r.ni.scale(sphereShape.radius, r.ri);

            Transform.pointToWorldFrame(trimeshPos, trimeshQuat, tmp, tmp);
            tmp.vsub(trimeshBody.position, r.rj);

            Transform.vectorToWorldFrame(trimeshQuat, r.ni, r.ni);
            Transform.vectorToWorldFrame(trimeshQuat, r.ri, r.ri);

            this.result.push(r);
            this.createFrictionEquationsFromContact(r, this.frictionResult);
        }
    }

    triangles.length = 0;
};

var point_on_plane_to_sphere = new Vec3();
var plane_to_sphere_ortho = new Vec3();

/**
 * @method spherePlane
 * @param  {Shape}      si
 * @param  {Shape}      sj
 * @param  {Vec3}       xi
 * @param  {Vec3}       xj
 * @param  {Quaternion} qi
 * @param  {Quaternion} qj
 * @param  {Body}       bi
 * @param  {Body}       bj
 */
Narrowphase.prototype[Shape.types.SPHERE | Shape.types.PLANE] =
Narrowphase.prototype.spherePlane = function(si,sj,xi,xj,qi,qj,bi,bj){
    // We will have one contact in this case
    var r = this.createContactEquation(bi,bj,si,sj);

    // Contact normal
    r.ni.set(0,0,1);
    qj.vmult(r.ni, r.ni);
    r.ni.negate(r.ni); // body i is the sphere, flip normal
    r.ni.normalize(); // Needed?

    // Vector from sphere center to contact point
    r.ni.mult(si.radius, r.ri);

    // Project down sphere on plane
    xi.vsub(xj, point_on_plane_to_sphere);
    r.ni.mult(r.ni.dot(point_on_plane_to_sphere), plane_to_sphere_ortho);
    point_on_plane_to_sphere.vsub(plane_to_sphere_ortho,r.rj); // The sphere position projected to plane

    if(-point_on_plane_to_sphere.dot(r.ni) <= si.radius){

        // Make it relative to the body
        var ri = r.ri;
        var rj = r.rj;
        ri.vadd(xi, ri);
        ri.vsub(bi.position, ri);
        rj.vadd(xj, rj);
        rj.vsub(bj.position, rj);

        this.result.push(r);
        this.createFrictionEquationsFromContact(r, this.frictionResult);
    }
};

// See http://bulletphysics.com/Bullet/BulletFull/SphereTriangleDetector_8cpp_source.html
var pointInPolygon_edge = new Vec3();
var pointInPolygon_edge_x_normal = new Vec3();
var pointInPolygon_vtp = new Vec3();
function pointInPolygon(verts, normal, p){
    var positiveResult = null;
    var N = verts.length;
    for(var i=0; i!==N; i++){
        var v = verts[i];

        // Get edge to the next vertex
        var edge = pointInPolygon_edge;
        verts[(i+1) % (N)].vsub(v,edge);

        // Get cross product between polygon normal and the edge
        var edge_x_normal = pointInPolygon_edge_x_normal;
        //var edge_x_normal = new Vec3();
        edge.cross(normal,edge_x_normal);

        // Get vector between point and current vertex
        var vertex_to_p = pointInPolygon_vtp;
        p.vsub(v,vertex_to_p);

        // This dot product determines which side of the edge the point is
        var r = edge_x_normal.dot(vertex_to_p);

        // If all such dot products have same sign, we are inside the polygon.
        if(positiveResult===null || (r>0 && positiveResult===true) || (r<=0 && positiveResult===false)){
            if(positiveResult===null){
                positiveResult = r>0;
            }
            continue;
        } else {
            return false; // Encountered some other sign. Exit.
        }
    }

    // If we got here, all dot products were of the same sign.
    return true;
}

var box_to_sphere = new Vec3();
var sphereBox_ns = new Vec3();
var sphereBox_ns1 = new Vec3();
var sphereBox_ns2 = new Vec3();
var sphereBox_sides = [new Vec3(),new Vec3(),new Vec3(),new Vec3(),new Vec3(),new Vec3()];
var sphereBox_sphere_to_corner = new Vec3();
var sphereBox_side_ns = new Vec3();
var sphereBox_side_ns1 = new Vec3();
var sphereBox_side_ns2 = new Vec3();

/**
 * @method sphereBox
 * @param  {Shape}      si
 * @param  {Shape}      sj
 * @param  {Vec3}       xi
 * @param  {Vec3}       xj
 * @param  {Quaternion} qi
 * @param  {Quaternion} qj
 * @param  {Body}       bi
 * @param  {Body}       bj
 */
Narrowphase.prototype[Shape.types.SPHERE | Shape.types.BOX] =
Narrowphase.prototype.sphereBox = function(si,sj,xi,xj,qi,qj,bi,bj){
    var v3pool = this.v3pool;

    // we refer to the box as body j
    var sides = sphereBox_sides;
    xi.vsub(xj,box_to_sphere);
    sj.getSideNormals(sides,qj);
    var R =     si.radius;
    var penetrating_sides = [];

    // Check side (plane) intersections
    var found = false;

    // Store the resulting side penetration info
    var side_ns = sphereBox_side_ns;
    var side_ns1 = sphereBox_side_ns1;
    var side_ns2 = sphereBox_side_ns2;
    var side_h = null;
    var side_penetrations = 0;
    var side_dot1 = 0;
    var side_dot2 = 0;
    var side_distance = null;
    for(var idx=0,nsides=sides.length; idx!==nsides && found===false; idx++){
        // Get the plane side normal (ns)
        var ns = sphereBox_ns;
        ns.copy(sides[idx]);

        var h = ns.norm();
        ns.normalize();

        // The normal/distance dot product tells which side of the plane we are
        var dot = box_to_sphere.dot(ns);

        if(dot<h+R && dot>0){
            // Intersects plane. Now check the other two dimensions
            var ns1 = sphereBox_ns1;
            var ns2 = sphereBox_ns2;
            ns1.copy(sides[(idx+1)%3]);
            ns2.copy(sides[(idx+2)%3]);
            var h1 = ns1.norm();
            var h2 = ns2.norm();
            ns1.normalize();
            ns2.normalize();
            var dot1 = box_to_sphere.dot(ns1);
            var dot2 = box_to_sphere.dot(ns2);
            if(dot1<h1 && dot1>-h1 && dot2<h2 && dot2>-h2){
                var dist = Math.abs(dot-h-R);
                if(side_distance===null || dist < side_distance){
                    side_distance = dist;
                    side_dot1 = dot1;
                    side_dot2 = dot2;
                    side_h = h;
                    side_ns.copy(ns);
                    side_ns1.copy(ns1);
                    side_ns2.copy(ns2);
                    side_penetrations++;
                }
            }
        }
    }
    if(side_penetrations){
        found = true;
        var r = this.createContactEquation(bi,bj,si,sj);
        side_ns.mult(-R,r.ri); // Sphere r
        r.ni.copy(side_ns);
        r.ni.negate(r.ni); // Normal should be out of sphere
        side_ns.mult(side_h,side_ns);
        side_ns1.mult(side_dot1,side_ns1);
        side_ns.vadd(side_ns1,side_ns);
        side_ns2.mult(side_dot2,side_ns2);
        side_ns.vadd(side_ns2,r.rj);

        // Make relative to bodies
        r.ri.vadd(xi, r.ri);
        r.ri.vsub(bi.position, r.ri);
        r.rj.vadd(xj, r.rj);
        r.rj.vsub(bj.position, r.rj);

        this.result.push(r);
        this.createFrictionEquationsFromContact(r, this.frictionResult);
    }

    // Check corners
    var rj = v3pool.get();
    var sphere_to_corner = sphereBox_sphere_to_corner;
    for(var j=0; j!==2 && !found; j++){
        for(var k=0; k!==2 && !found; k++){
            for(var l=0; l!==2 && !found; l++){
                rj.set(0,0,0);
                if(j){
                    rj.vadd(sides[0],rj);
                } else {
                    rj.vsub(sides[0],rj);
                }
                if(k){
                    rj.vadd(sides[1],rj);
                } else {
                    rj.vsub(sides[1],rj);
                }
                if(l){
                    rj.vadd(sides[2],rj);
                } else {
                    rj.vsub(sides[2],rj);
                }

                // World position of corner
                xj.vadd(rj,sphere_to_corner);
                sphere_to_corner.vsub(xi,sphere_to_corner);

                if(sphere_to_corner.norm2() < R*R){
                    found = true;
                    var r = this.createContactEquation(bi,bj,si,sj);
                    r.ri.copy(sphere_to_corner);
                    r.ri.normalize();
                    r.ni.copy(r.ri);
                    r.ri.mult(R,r.ri);
                    r.rj.copy(rj);

                    // Make relative to bodies
                    r.ri.vadd(xi, r.ri);
                    r.ri.vsub(bi.position, r.ri);
                    r.rj.vadd(xj, r.rj);
                    r.rj.vsub(bj.position, r.rj);

                    this.result.push(r);
                    this.createFrictionEquationsFromContact(r, this.frictionResult);
                }
            }
        }
    }
    v3pool.release(rj);
    rj = null;

    // Check edges
    var edgeTangent = v3pool.get();
    var edgeCenter = v3pool.get();
    var r = v3pool.get(); // r = edge center to sphere center
    var orthogonal = v3pool.get();
    var dist = v3pool.get();
    var Nsides = sides.length;
    for(var j=0; j!==Nsides && !found; j++){
        for(var k=0; k!==Nsides && !found; k++){
            if(j%3 !== k%3){
                // Get edge tangent
                sides[k].cross(sides[j],edgeTangent);
                edgeTangent.normalize();
                sides[j].vadd(sides[k], edgeCenter);
                r.copy(xi);
                r.vsub(edgeCenter,r);
                r.vsub(xj,r);
                var orthonorm = r.dot(edgeTangent); // distance from edge center to sphere center in the tangent direction
                edgeTangent.mult(orthonorm,orthogonal); // Vector from edge center to sphere center in the tangent direction

                // Find the third side orthogonal to this one
                var l = 0;
                while(l===j%3 || l===k%3){
                    l++;
                }

                // vec from edge center to sphere projected to the plane orthogonal to the edge tangent
                dist.copy(xi);
                dist.vsub(orthogonal,dist);
                dist.vsub(edgeCenter,dist);
                dist.vsub(xj,dist);

                // Distances in tangent direction and distance in the plane orthogonal to it
                var tdist = Math.abs(orthonorm);
                var ndist = dist.norm();

                if(tdist < sides[l].norm() && ndist<R){
                    found = true;
                    var res = this.createContactEquation(bi,bj,si,sj);
                    edgeCenter.vadd(orthogonal,res.rj); // box rj
                    res.rj.copy(res.rj);
                    dist.negate(res.ni);
                    res.ni.normalize();

                    res.ri.copy(res.rj);
                    res.ri.vadd(xj,res.ri);
                    res.ri.vsub(xi,res.ri);
                    res.ri.normalize();
                    res.ri.mult(R,res.ri);

                    // Make relative to bodies
                    res.ri.vadd(xi, res.ri);
                    res.ri.vsub(bi.position, res.ri);
                    res.rj.vadd(xj, res.rj);
                    res.rj.vsub(bj.position, res.rj);

                    this.result.push(res);
                    this.createFrictionEquationsFromContact(res, this.frictionResult);
                }
            }
        }
    }
    v3pool.release(edgeTangent,edgeCenter,r,orthogonal,dist);
};

var convex_to_sphere = new Vec3();
var sphereConvex_edge = new Vec3();
var sphereConvex_edgeUnit = new Vec3();
var sphereConvex_sphereToCorner = new Vec3();
var sphereConvex_worldCorner = new Vec3();
var sphereConvex_worldNormal = new Vec3();
var sphereConvex_worldPoint = new Vec3();
var sphereConvex_worldSpherePointClosestToPlane = new Vec3();
var sphereConvex_penetrationVec = new Vec3();
var sphereConvex_sphereToWorldPoint = new Vec3();

/**
 * @method sphereConvex
 * @param  {Shape}      si
 * @param  {Shape}      sj
 * @param  {Vec3}       xi
 * @param  {Vec3}       xj
 * @param  {Quaternion} qi
 * @param  {Quaternion} qj
 * @param  {Body}       bi
 * @param  {Body}       bj
 */
Narrowphase.prototype[Shape.types.SPHERE | Shape.types.CONVEXPOLYHEDRON] =
Narrowphase.prototype.sphereConvex = function(si,sj,xi,xj,qi,qj,bi,bj){
    var v3pool = this.v3pool;
    xi.vsub(xj,convex_to_sphere);
    var normals = sj.faceNormals;
    var faces = sj.faces;
    var verts = sj.vertices;
    var R =     si.radius;
    var penetrating_sides = [];

    // if(convex_to_sphere.norm2() > si.boundingSphereRadius + sj.boundingSphereRadius){
    //     return;
    // }

    // Check corners
    for(var i=0; i!==verts.length; i++){
        var v = verts[i];

        // World position of corner
        var worldCorner = sphereConvex_worldCorner;
        qj.vmult(v,worldCorner);
        xj.vadd(worldCorner,worldCorner);
        var sphere_to_corner = sphereConvex_sphereToCorner;
        worldCorner.vsub(xi, sphere_to_corner);
        if(sphere_to_corner.norm2() < R * R){
            found = true;
            var r = this.createContactEquation(bi,bj,si,sj);
            r.ri.copy(sphere_to_corner);
            r.ri.normalize();
            r.ni.copy(r.ri);
            r.ri.mult(R,r.ri);
            worldCorner.vsub(xj,r.rj);

            // Should be relative to the body.
            r.ri.vadd(xi, r.ri);
            r.ri.vsub(bi.position, r.ri);

            // Should be relative to the body.
            r.rj.vadd(xj, r.rj);
            r.rj.vsub(bj.position, r.rj);

            this.result.push(r);
            this.createFrictionEquationsFromContact(r, this.frictionResult);
            return;
        }
    }

    // Check side (plane) intersections
    var found = false;
    for(var i=0, nfaces=faces.length; i!==nfaces && found===false; i++){
        var normal = normals[i];
        var face = faces[i];

        // Get world-transformed normal of the face
        var worldNormal = sphereConvex_worldNormal;
        qj.vmult(normal,worldNormal);

        // Get a world vertex from the face
        var worldPoint = sphereConvex_worldPoint;
        qj.vmult(verts[face[0]],worldPoint);
        worldPoint.vadd(xj,worldPoint);

        // Get a point on the sphere, closest to the face normal
        var worldSpherePointClosestToPlane = sphereConvex_worldSpherePointClosestToPlane;
        worldNormal.mult(-R, worldSpherePointClosestToPlane);
        xi.vadd(worldSpherePointClosestToPlane, worldSpherePointClosestToPlane);

        // Vector from a face point to the closest point on the sphere
        var penetrationVec = sphereConvex_penetrationVec;
        worldSpherePointClosestToPlane.vsub(worldPoint,penetrationVec);

        // The penetration. Negative value means overlap.
        var penetration = penetrationVec.dot(worldNormal);

        var worldPointToSphere = sphereConvex_sphereToWorldPoint;
        xi.vsub(worldPoint, worldPointToSphere);

        if(penetration < 0 && worldPointToSphere.dot(worldNormal)>0){
            // Intersects plane. Now check if the sphere is inside the face polygon
            var faceVerts = []; // Face vertices, in world coords
            for(var j=0, Nverts=face.length; j!==Nverts; j++){
                var worldVertex = v3pool.get();
                qj.vmult(verts[face[j]], worldVertex);
                xj.vadd(worldVertex,worldVertex);
                faceVerts.push(worldVertex);
            }

            if(pointInPolygon(faceVerts,worldNormal,xi)){ // Is the sphere center in the face polygon?
                found = true;
                var r = this.createContactEquation(bi,bj,si,sj);

                worldNormal.mult(-R, r.ri); // Contact offset, from sphere center to contact
                worldNormal.negate(r.ni); // Normal pointing out of sphere

                var penetrationVec2 = v3pool.get();
                worldNormal.mult(-penetration, penetrationVec2);
                var penetrationSpherePoint = v3pool.get();
                worldNormal.mult(-R, penetrationSpherePoint);

                //xi.vsub(xj).vadd(penetrationSpherePoint).vadd(penetrationVec2 , r.rj);
                xi.vsub(xj,r.rj);
                r.rj.vadd(penetrationSpherePoint,r.rj);
                r.rj.vadd(penetrationVec2 , r.rj);

                // Should be relative to the body.
                r.rj.vadd(xj, r.rj);
                r.rj.vsub(bj.position, r.rj);

                // Should be relative to the body.
                r.ri.vadd(xi, r.ri);
                r.ri.vsub(bi.position, r.ri);

                v3pool.release(penetrationVec2);
                v3pool.release(penetrationSpherePoint);

                this.result.push(r);
                this.createFrictionEquationsFromContact(r, this.frictionResult);

                // Release world vertices
                for(var j=0, Nfaceverts=faceVerts.length; j!==Nfaceverts; j++){
                    v3pool.release(faceVerts[j]);
                }

                return; // We only expect *one* face contact
            } else {
                // Edge?
                for(var j=0; j!==face.length; j++){

                    // Get two world transformed vertices
                    var v1 = v3pool.get();
                    var v2 = v3pool.get();
                    qj.vmult(verts[face[(j+1)%face.length]], v1);
                    qj.vmult(verts[face[(j+2)%face.length]], v2);
                    xj.vadd(v1, v1);
                    xj.vadd(v2, v2);

                    // Construct edge vector
                    var edge = sphereConvex_edge;
                    v2.vsub(v1,edge);

                    // Construct the same vector, but normalized
                    var edgeUnit = sphereConvex_edgeUnit;
                    edge.unit(edgeUnit);

                    // p is xi projected onto the edge
                    var p = v3pool.get();
                    var v1_to_xi = v3pool.get();
                    xi.vsub(v1, v1_to_xi);
                    var dot = v1_to_xi.dot(edgeUnit);
                    edgeUnit.mult(dot, p);
                    p.vadd(v1, p);

                    // Compute a vector from p to the center of the sphere
                    var xi_to_p = v3pool.get();
                    p.vsub(xi, xi_to_p);

                    // Collision if the edge-sphere distance is less than the radius
                    // AND if p is in between v1 and v2
                    if(dot > 0 && dot*dot<edge.norm2() && xi_to_p.norm2() < R*R){ // Collision if the edge-sphere distance is less than the radius
                        // Edge contact!
                        var r = this.createContactEquation(bi,bj,si,sj);
                        p.vsub(xj,r.rj);

                        p.vsub(xi,r.ni);
                        r.ni.normalize();

                        r.ni.mult(R,r.ri);

                        // Should be relative to the body.
                        r.rj.vadd(xj, r.rj);
                        r.rj.vsub(bj.position, r.rj);

                        // Should be relative to the body.
                        r.ri.vadd(xi, r.ri);
                        r.ri.vsub(bi.position, r.ri);

                        this.result.push(r);
                        this.createFrictionEquationsFromContact(r, this.frictionResult);

                        // Release world vertices
                        for(var j=0, Nfaceverts=faceVerts.length; j!==Nfaceverts; j++){
                            v3pool.release(faceVerts[j]);
                        }

                        v3pool.release(v1);
                        v3pool.release(v2);
                        v3pool.release(p);
                        v3pool.release(xi_to_p);
                        v3pool.release(v1_to_xi);

                        return;
                    }

                    v3pool.release(v1);
                    v3pool.release(v2);
                    v3pool.release(p);
                    v3pool.release(xi_to_p);
                    v3pool.release(v1_to_xi);
                }
            }

            // Release world vertices
            for(var j=0, Nfaceverts=faceVerts.length; j!==Nfaceverts; j++){
                v3pool.release(faceVerts[j]);
            }
        }
    }
};

var planeBox_normal = new Vec3();
var plane_to_corner = new Vec3();

/**
 * @method planeBox
 * @param  {Array}      result
 * @param  {Shape}      si
 * @param  {Shape}      sj
 * @param  {Vec3}       xi
 * @param  {Vec3}       xj
 * @param  {Quaternion} qi
 * @param  {Quaternion} qj
 * @param  {Body}       bi
 * @param  {Body}       bj
 */
Narrowphase.prototype[Shape.types.PLANE | Shape.types.BOX] =
Narrowphase.prototype.planeBox = function(si,sj,xi,xj,qi,qj,bi,bj){
    sj.convexPolyhedronRepresentation.material = sj.material;
    sj.convexPolyhedronRepresentation.collisionResponse = sj.collisionResponse;
    this.planeConvex(si,sj.convexPolyhedronRepresentation,xi,xj,qi,qj,bi,bj);
};

var planeConvex_v = new Vec3();
var planeConvex_normal = new Vec3();
var planeConvex_relpos = new Vec3();
var planeConvex_projected = new Vec3();

/**
 * @method planeConvex
 * @param  {Shape}      si
 * @param  {Shape}      sj
 * @param  {Vec3}       xi
 * @param  {Vec3}       xj
 * @param  {Quaternion} qi
 * @param  {Quaternion} qj
 * @param  {Body}       bi
 * @param  {Body}       bj
 */
Narrowphase.prototype[Shape.types.PLANE | Shape.types.CONVEXPOLYHEDRON] =
Narrowphase.prototype.planeConvex = function(
    planeShape,
    convexShape,
    planePosition,
    convexPosition,
    planeQuat,
    convexQuat,
    planeBody,
    convexBody
){
    // Simply return the points behind the plane.
    var worldVertex = planeConvex_v,
        worldNormal = planeConvex_normal;
    worldNormal.set(0,0,1);
    planeQuat.vmult(worldNormal,worldNormal); // Turn normal according to plane orientation

    var numContacts = 0;
    var relpos = planeConvex_relpos;
    for(var i = 0; i !== convexShape.vertices.length; i++){

        // Get world convex vertex
        worldVertex.copy(convexShape.vertices[i]);
        convexQuat.vmult(worldVertex, worldVertex);
        convexPosition.vadd(worldVertex, worldVertex);
        worldVertex.vsub(planePosition, relpos);

        var dot = worldNormal.dot(relpos);
        if(dot <= 0.0){

            var r = this.createContactEquation(planeBody, convexBody, planeShape, convexShape);

            // Get vertex position projected on plane
            var projected = planeConvex_projected;
            worldNormal.mult(worldNormal.dot(relpos),projected);
            worldVertex.vsub(projected, projected);
            projected.vsub(planePosition, r.ri); // From plane to vertex projected on plane

            r.ni.copy(worldNormal); // Contact normal is the plane normal out from plane

            // rj is now just the vector from the convex center to the vertex
            worldVertex.vsub(convexPosition, r.rj);

            // Make it relative to the body
            r.ri.vadd(planePosition, r.ri);
            r.ri.vsub(planeBody.position, r.ri);
            r.rj.vadd(convexPosition, r.rj);
            r.rj.vsub(convexBody.position, r.rj);

            this.result.push(r);
            numContacts++;
            if(!this.enableFrictionReduction){
                this.createFrictionEquationsFromContact(r, this.frictionResult);
            }
        }
    }

    if(this.enableFrictionReduction && numContacts){
        this.createFrictionFromAverage(numContacts);
    }
};

var convexConvex_sepAxis = new Vec3();
var convexConvex_q = new Vec3();

/**
 * @method convexConvex
 * @param  {Shape}      si
 * @param  {Shape}      sj
 * @param  {Vec3}       xi
 * @param  {Vec3}       xj
 * @param  {Quaternion} qi
 * @param  {Quaternion} qj
 * @param  {Body}       bi
 * @param  {Body}       bj
 */
Narrowphase.prototype[Shape.types.CONVEXPOLYHEDRON] =
Narrowphase.prototype.convexConvex = function(si,sj,xi,xj,qi,qj,bi,bj,rsi,rsj,faceListA,faceListB){
    var sepAxis = convexConvex_sepAxis;

    if(xi.distanceTo(xj) > si.boundingSphereRadius + sj.boundingSphereRadius){
        return;
    }

    if(si.findSeparatingAxis(sj,xi,qi,xj,qj,sepAxis,faceListA,faceListB)){
        var res = [];
        var q = convexConvex_q;
        si.clipAgainstHull(xi,qi,sj,xj,qj,sepAxis,-100,100,res);
        var numContacts = 0;
        for(var j = 0; j !== res.length; j++){
            var r = this.createContactEquation(bi,bj,si,sj,rsi,rsj),
                ri = r.ri,
                rj = r.rj;
            sepAxis.negate(r.ni);
            res[j].normal.negate(q);
            q.mult(res[j].depth, q);
            res[j].point.vadd(q, ri);
            rj.copy(res[j].point);

            // Contact points are in world coordinates. Transform back to relative
            ri.vsub(xi,ri);
            rj.vsub(xj,rj);

            // Make relative to bodies
            ri.vadd(xi, ri);
            ri.vsub(bi.position, ri);
            rj.vadd(xj, rj);
            rj.vsub(bj.position, rj);

            this.result.push(r);
            numContacts++;
            if(!this.enableFrictionReduction){
                this.createFrictionEquationsFromContact(r, this.frictionResult);
            }
        }
        if(this.enableFrictionReduction && numContacts){
            this.createFrictionFromAverage(numContacts);
        }
    }
};


/**
 * @method convexTrimesh
 * @param  {Array}      result
 * @param  {Shape}      si
 * @param  {Shape}      sj
 * @param  {Vec3}       xi
 * @param  {Vec3}       xj
 * @param  {Quaternion} qi
 * @param  {Quaternion} qj
 * @param  {Body}       bi
 * @param  {Body}       bj
 */
// Narrowphase.prototype[Shape.types.CONVEXPOLYHEDRON | Shape.types.TRIMESH] =
// Narrowphase.prototype.convexTrimesh = function(si,sj,xi,xj,qi,qj,bi,bj,rsi,rsj,faceListA,faceListB){
//     var sepAxis = convexConvex_sepAxis;

//     if(xi.distanceTo(xj) > si.boundingSphereRadius + sj.boundingSphereRadius){
//         return;
//     }

//     // Construct a temp hull for each triangle
//     var hullB = new ConvexPolyhedron();

//     hullB.faces = [[0,1,2]];
//     var va = new Vec3();
//     var vb = new Vec3();
//     var vc = new Vec3();
//     hullB.vertices = [
//         va,
//         vb,
//         vc
//     ];

//     for (var i = 0; i < sj.indices.length / 3; i++) {

//         var triangleNormal = new Vec3();
//         sj.getNormal(i, triangleNormal);
//         hullB.faceNormals = [triangleNormal];

//         sj.getTriangleVertices(i, va, vb, vc);

//         var d = si.testSepAxis(triangleNormal, hullB, xi, qi, xj, qj);
//         if(!d){
//             triangleNormal.scale(-1, triangleNormal);
//             d = si.testSepAxis(triangleNormal, hullB, xi, qi, xj, qj);

//             if(!d){
//                 continue;
//             }
//         }

//         var res = [];
//         var q = convexConvex_q;
//         si.clipAgainstHull(xi,qi,hullB,xj,qj,triangleNormal,-100,100,res);
//         for(var j = 0; j !== res.length; j++){
//             var r = this.createContactEquation(bi,bj,si,sj,rsi,rsj),
//                 ri = r.ri,
//                 rj = r.rj;
//             r.ni.copy(triangleNormal);
//             r.ni.negate(r.ni);
//             res[j].normal.negate(q);
//             q.mult(res[j].depth, q);
//             res[j].point.vadd(q, ri);
//             rj.copy(res[j].point);

//             // Contact points are in world coordinates. Transform back to relative
//             ri.vsub(xi,ri);
//             rj.vsub(xj,rj);

//             // Make relative to bodies
//             ri.vadd(xi, ri);
//             ri.vsub(bi.position, ri);
//             rj.vadd(xj, rj);
//             rj.vsub(bj.position, rj);

//             result.push(r);
//         }
//     }
// };

var particlePlane_normal = new Vec3();
var particlePlane_relpos = new Vec3();
var particlePlane_projected = new Vec3();

/**
 * @method particlePlane
 * @param  {Array}      result
 * @param  {Shape}      si
 * @param  {Shape}      sj
 * @param  {Vec3}       xi
 * @param  {Vec3}       xj
 * @param  {Quaternion} qi
 * @param  {Quaternion} qj
 * @param  {Body}       bi
 * @param  {Body}       bj
 */
Narrowphase.prototype[Shape.types.PLANE | Shape.types.PARTICLE] =
Narrowphase.prototype.planeParticle = function(sj,si,xj,xi,qj,qi,bj,bi){
    var normal = particlePlane_normal;
    normal.set(0,0,1);
    bj.quaternion.vmult(normal,normal); // Turn normal according to plane orientation
    var relpos = particlePlane_relpos;
    xi.vsub(bj.position,relpos);
    var dot = normal.dot(relpos);
    if(dot <= 0.0){
        var r = this.createContactEquation(bi,bj,si,sj);
        r.ni.copy(normal); // Contact normal is the plane normal
        r.ni.negate(r.ni);
        r.ri.set(0,0,0); // Center of particle

        // Get particle position projected on plane
        var projected = particlePlane_projected;
        normal.mult(normal.dot(xi),projected);
        xi.vsub(projected,projected);
        //projected.vadd(bj.position,projected);

        // rj is now the projected world position minus plane position
        r.rj.copy(projected);
        this.result.push(r);
        this.createFrictionEquationsFromContact(r, this.frictionResult);
    }
};

var particleSphere_normal = new Vec3();

/**
 * @method particleSphere
 * @param  {Array}      result
 * @param  {Shape}      si
 * @param  {Shape}      sj
 * @param  {Vec3}       xi
 * @param  {Vec3}       xj
 * @param  {Quaternion} qi
 * @param  {Quaternion} qj
 * @param  {Body}       bi
 * @param  {Body}       bj
 */
Narrowphase.prototype[Shape.types.PARTICLE | Shape.types.SPHERE] =
Narrowphase.prototype.sphereParticle = function(sj,si,xj,xi,qj,qi,bj,bi){
    // The normal is the unit vector from sphere center to particle center
    var normal = particleSphere_normal;
    normal.set(0,0,1);
    xi.vsub(xj,normal);
    var lengthSquared = normal.norm2();

    if(lengthSquared <= sj.radius * sj.radius){
        var r = this.createContactEquation(bi,bj,si,sj);
        normal.normalize();
        r.rj.copy(normal);
        r.rj.mult(sj.radius,r.rj);
        r.ni.copy(normal); // Contact normal
        r.ni.negate(r.ni);
        r.ri.set(0,0,0); // Center of particle
        this.result.push(r);
        this.createFrictionEquationsFromContact(r, this.frictionResult);
    }
};

// WIP
var cqj = new Quaternion();
var convexParticle_local = new Vec3();
var convexParticle_normal = new Vec3();
var convexParticle_penetratedFaceNormal = new Vec3();
var convexParticle_vertexToParticle = new Vec3();
var convexParticle_worldPenetrationVec = new Vec3();

/**
 * @method convexParticle
 * @param  {Array}      result
 * @param  {Shape}      si
 * @param  {Shape}      sj
 * @param  {Vec3}       xi
 * @param  {Vec3}       xj
 * @param  {Quaternion} qi
 * @param  {Quaternion} qj
 * @param  {Body}       bi
 * @param  {Body}       bj
 */
Narrowphase.prototype[Shape.types.PARTICLE | Shape.types.CONVEXPOLYHEDRON] =
Narrowphase.prototype.convexParticle = function(sj,si,xj,xi,qj,qi,bj,bi){
    var penetratedFaceIndex = -1;
    var penetratedFaceNormal = convexParticle_penetratedFaceNormal;
    var worldPenetrationVec = convexParticle_worldPenetrationVec;
    var minPenetration = null;
    var numDetectedFaces = 0;

    // Convert particle position xi to local coords in the convex
    var local = convexParticle_local;
    local.copy(xi);
    local.vsub(xj,local); // Convert position to relative the convex origin
    qj.conjugate(cqj);
    cqj.vmult(local,local);

    if(sj.pointIsInside(local)){

        if(sj.worldVerticesNeedsUpdate){
            sj.computeWorldVertices(xj,qj);
        }
        if(sj.worldFaceNormalsNeedsUpdate){
            sj.computeWorldFaceNormals(qj);
        }

        // For each world polygon in the polyhedra
        for(var i=0,nfaces=sj.faces.length; i!==nfaces; i++){

            // Construct world face vertices
            var verts = [ sj.worldVertices[ sj.faces[i][0] ] ];
            var normal = sj.worldFaceNormals[i];

            // Check how much the particle penetrates the polygon plane.
            xi.vsub(verts[0],convexParticle_vertexToParticle);
            var penetration = -normal.dot(convexParticle_vertexToParticle);
            if(minPenetration===null || Math.abs(penetration)<Math.abs(minPenetration)){
                minPenetration = penetration;
                penetratedFaceIndex = i;
                penetratedFaceNormal.copy(normal);
                numDetectedFaces++;
            }
        }

        if(penetratedFaceIndex!==-1){
            // Setup contact
            var r = this.createContactEquation(bi,bj,si,sj);
            penetratedFaceNormal.mult(minPenetration, worldPenetrationVec);

            // rj is the particle position projected to the face
            worldPenetrationVec.vadd(xi,worldPenetrationVec);
            worldPenetrationVec.vsub(xj,worldPenetrationVec);
            r.rj.copy(worldPenetrationVec);
            //var projectedToFace = xi.vsub(xj).vadd(worldPenetrationVec);
            //projectedToFace.copy(r.rj);

            //qj.vmult(r.rj,r.rj);
            penetratedFaceNormal.negate( r.ni ); // Contact normal
            r.ri.set(0,0,0); // Center of particle

            var ri = r.ri,
                rj = r.rj;

            // Make relative to bodies
            ri.vadd(xi, ri);
            ri.vsub(bi.position, ri);
            rj.vadd(xj, rj);
            rj.vsub(bj.position, rj);

            this.result.push(r);
            this.createFrictionEquationsFromContact(r, this.frictionResult);
        } else {
            console.warn("Point found inside convex, but did not find penetrating face!");
        }
    }
};

Narrowphase.prototype[Shape.types.BOX | Shape.types.HEIGHTFIELD] =
Narrowphase.prototype.boxHeightfield = function (si,sj,xi,xj,qi,qj,bi,bj){
    si.convexPolyhedronRepresentation.material = si.material;
    si.convexPolyhedronRepresentation.collisionResponse = si.collisionResponse;
    this.convexHeightfield(si.convexPolyhedronRepresentation,sj,xi,xj,qi,qj,bi,bj);
};

var convexHeightfield_tmp1 = new Vec3();
var convexHeightfield_tmp2 = new Vec3();
var convexHeightfield_faceList = [0];

/**
 * @method convexHeightfield
 */
Narrowphase.prototype[Shape.types.CONVEXPOLYHEDRON | Shape.types.HEIGHTFIELD] =
Narrowphase.prototype.convexHeightfield = function (
    convexShape,
    hfShape,
    convexPos,
    hfPos,
    convexQuat,
    hfQuat,
    convexBody,
    hfBody
){
    var data = hfShape.data,
        w = hfShape.elementSize,
        radius = convexShape.boundingSphereRadius,
        worldPillarOffset = convexHeightfield_tmp2,
        faceList = convexHeightfield_faceList;

    // Get sphere position to heightfield local!
    var localConvexPos = convexHeightfield_tmp1;
    Transform.pointToLocalFrame(hfPos, hfQuat, convexPos, localConvexPos);

    // Get the index of the data points to test against
    var iMinX = Math.floor((localConvexPos.x - radius) / w) - 1,
        iMaxX = Math.ceil((localConvexPos.x + radius) / w) + 1,
        iMinY = Math.floor((localConvexPos.y - radius) / w) - 1,
        iMaxY = Math.ceil((localConvexPos.y + radius) / w) + 1;

    // Bail out if we are out of the terrain
    if(iMaxX < 0 || iMaxY < 0 || iMinX > data.length || iMinY > data[0].length){
        return;
    }

    // Clamp index to edges
    if(iMinX < 0){ iMinX = 0; }
    if(iMaxX < 0){ iMaxX = 0; }
    if(iMinY < 0){ iMinY = 0; }
    if(iMaxY < 0){ iMaxY = 0; }
    if(iMinX >= data.length){ iMinX = data.length - 1; }
    if(iMaxX >= data.length){ iMaxX = data.length - 1; }
    if(iMaxY >= data[0].length){ iMaxY = data[0].length - 1; }
    if(iMinY >= data[0].length){ iMinY = data[0].length - 1; }

    var minMax = [];
    hfShape.getRectMinMax(iMinX, iMinY, iMaxX, iMaxY, minMax);
    var min = minMax[0];
    var max = minMax[1];

    // Bail out if we're cant touch the bounding height box
    if(localConvexPos.z - radius > max || localConvexPos.z + radius < min){
        return;
    }

    for(var i = iMinX; i < iMaxX; i++){
        for(var j = iMinY; j < iMaxY; j++){

            // Lower triangle
            hfShape.getConvexTrianglePillar(i, j, false);
            Transform.pointToWorldFrame(hfPos, hfQuat, hfShape.pillarOffset, worldPillarOffset);
            if (convexPos.distanceTo(worldPillarOffset) < hfShape.pillarConvex.boundingSphereRadius + convexShape.boundingSphereRadius) {
                this.convexConvex(convexShape, hfShape.pillarConvex, convexPos, worldPillarOffset, convexQuat, hfQuat, convexBody, hfBody, null, null, faceList, null);
            }

            // Upper triangle
            hfShape.getConvexTrianglePillar(i, j, true);
            Transform.pointToWorldFrame(hfPos, hfQuat, hfShape.pillarOffset, worldPillarOffset);
            if (convexPos.distanceTo(worldPillarOffset) < hfShape.pillarConvex.boundingSphereRadius + convexShape.boundingSphereRadius) {
                this.convexConvex(convexShape, hfShape.pillarConvex, convexPos, worldPillarOffset, convexQuat, hfQuat, convexBody, hfBody, null, null, faceList, null);
            }
        }
    }
};

var sphereHeightfield_tmp1 = new Vec3();
var sphereHeightfield_tmp2 = new Vec3();

/**
 * @method sphereHeightfield
 */
Narrowphase.prototype[Shape.types.SPHERE | Shape.types.HEIGHTFIELD] =
Narrowphase.prototype.sphereHeightfield = function (
    sphereShape,
    hfShape,
    spherePos,
    hfPos,
    sphereQuat,
    hfQuat,
    sphereBody,
    hfBody
){
    var data = hfShape.data,
        radius = sphereShape.radius,
        w = hfShape.elementSize,
        worldPillarOffset = sphereHeightfield_tmp2;

    // Get sphere position to heightfield local!
    var localSpherePos = sphereHeightfield_tmp1;
    Transform.pointToLocalFrame(hfPos, hfQuat, spherePos, localSpherePos);

    // Get the index of the data points to test against
    var iMinX = Math.floor((localSpherePos.x - radius) / w) - 1,
        iMaxX = Math.ceil((localSpherePos.x + radius) / w) + 1,
        iMinY = Math.floor((localSpherePos.y - radius) / w) - 1,
        iMaxY = Math.ceil((localSpherePos.y + radius) / w) + 1;

    // Bail out if we are out of the terrain
    if(iMaxX < 0 || iMaxY < 0 || iMinX > data.length || iMaxY > data[0].length){
        return;
    }

    // Clamp index to edges
    if(iMinX < 0){ iMinX = 0; }
    if(iMaxX < 0){ iMaxX = 0; }
    if(iMinY < 0){ iMinY = 0; }
    if(iMaxY < 0){ iMaxY = 0; }
    if(iMinX >= data.length){ iMinX = data.length - 1; }
    if(iMaxX >= data.length){ iMaxX = data.length - 1; }
    if(iMaxY >= data[0].length){ iMaxY = data[0].length - 1; }
    if(iMinY >= data[0].length){ iMinY = data[0].length - 1; }

    var minMax = [];
    hfShape.getRectMinMax(iMinX, iMinY, iMaxX, iMaxY, minMax);
    var min = minMax[0];
    var max = minMax[1];

    // Bail out if we're cant touch the bounding height box
    if(localSpherePos.z - radius > max || localSpherePos.z + radius < min){
        return;
    }

    var result = this.result;
    for(var i = iMinX; i < iMaxX; i++){
        for(var j = iMinY; j < iMaxY; j++){

            var numContactsBefore = result.length;

            // Lower triangle
            hfShape.getConvexTrianglePillar(i, j, false);
            Transform.pointToWorldFrame(hfPos, hfQuat, hfShape.pillarOffset, worldPillarOffset);
            if (spherePos.distanceTo(worldPillarOffset) < hfShape.pillarConvex.boundingSphereRadius + sphereShape.boundingSphereRadius) {
                this.sphereConvex(sphereShape, hfShape.pillarConvex, spherePos, worldPillarOffset, sphereQuat, hfQuat, sphereBody, hfBody);
            }

            // Upper triangle
            hfShape.getConvexTrianglePillar(i, j, true);
            Transform.pointToWorldFrame(hfPos, hfQuat, hfShape.pillarOffset, worldPillarOffset);
            if (spherePos.distanceTo(worldPillarOffset) < hfShape.pillarConvex.boundingSphereRadius + sphereShape.boundingSphereRadius) {
                this.sphereConvex(sphereShape, hfShape.pillarConvex, spherePos, worldPillarOffset, sphereQuat, hfQuat, sphereBody, hfBody);
            }

            var numContacts = result.length - numContactsBefore;

            if(numContacts > 2){
                return;
            }
            /*
            // Skip all but 1
            for (var k = 0; k < numContacts - 1; k++) {
                result.pop();
            }
            */
        }
    }
};

},{"../collision/AABB":3,"../collision/Ray":9,"../equations/ContactEquation":19,"../equations/FrictionEquation":21,"../math/Quaternion":28,"../math/Transform":29,"../math/Vec3":30,"../shapes/ConvexPolyhedron":38,"../shapes/Shape":43,"../solver/Solver":47,"../utils/Vec3Pool":54}],56:[function(_dereq_,module,exports){
/* global performance */

module.exports = World;

var Shape = _dereq_('../shapes/Shape');
var Vec3 = _dereq_('../math/Vec3');
var Quaternion = _dereq_('../math/Quaternion');
var GSSolver = _dereq_('../solver/GSSolver');
var Vec3Pool = _dereq_('../utils/Vec3Pool');
var ContactEquation = _dereq_('../equations/ContactEquation');
var FrictionEquation = _dereq_('../equations/FrictionEquation');
var Narrowphase = _dereq_('./Narrowphase');
var EventTarget = _dereq_('../utils/EventTarget');
var ArrayCollisionMatrix = _dereq_('../collision/ArrayCollisionMatrix');
var Material = _dereq_('../material/Material');
var ContactMaterial = _dereq_('../material/ContactMaterial');
var Body = _dereq_('../objects/Body');
var TupleDictionary = _dereq_('../utils/TupleDictionary');
var RaycastResult = _dereq_('../collision/RaycastResult');
var AABB = _dereq_('../collision/AABB');
var Ray = _dereq_('../collision/Ray');
var NaiveBroadphase = _dereq_('../collision/NaiveBroadphase');

/**
 * The physics world
 * @class World
 * @constructor
 * @extends EventTarget
 */
function World(){
    EventTarget.apply(this);

    /**
     * Currently / last used timestep. Is set to -1 if not available. This value is updated before each internal step, which means that it is "fresh" inside event callbacks.
     * @property {Number} dt
     */
    this.dt = -1;

    /**
     * Makes bodies go to sleep when they've been inactive
     * @property allowSleep
     * @type {Boolean}
     */
    this.allowSleep = false;

    /**
     * All the current contacts (instances of ContactEquation) in the world.
     * @property contacts
     * @type {Array}
     */
    this.contacts = [];
    this.frictionEquations = [];

    /**
     * How often to normalize quaternions. Set to 0 for every step, 1 for every second etc.. A larger value increases performance. If bodies tend to explode, set to a smaller value (zero to be sure nothing can go wrong).
     * @property quatNormalizeSkip
     * @type {Number}
     */
    this.quatNormalizeSkip = 0;

    /**
     * Set to true to use fast quaternion normalization. It is often enough accurate to use. If bodies tend to explode, set to false.
     * @property quatNormalizeFast
     * @type {Boolean}
     * @see Quaternion.normalizeFast
     * @see Quaternion.normalize
     */
    this.quatNormalizeFast = false;

    /**
     * The wall-clock time since simulation start
     * @property time
     * @type {Number}
     */
    this.time = 0.0;

    /**
     * Number of timesteps taken since start
     * @property stepnumber
     * @type {Number}
     */
    this.stepnumber = 0;

    /// Default and last timestep sizes
    this.default_dt = 1/60;

    this.nextId = 0;
    /**
     * @property gravity
     * @type {Vec3}
     */
    this.gravity = new Vec3();

    /**
     * @property broadphase
     * @type {Broadphase}
     */
    this.broadphase = new NaiveBroadphase();

    /**
     * @property bodies
     * @type {Array}
     */
    this.bodies = [];

    /**
     * @property solver
     * @type {Solver}
     */
    this.solver = new GSSolver();

    /**
     * @property constraints
     * @type {Array}
     */
    this.constraints = [];

    /**
     * @property narrowphase
     * @type {Narrowphase}
     */
    this.narrowphase = new Narrowphase(this);

    /**
     * @property {ArrayCollisionMatrix} collisionMatrix
	 * @type {ArrayCollisionMatrix}
	 */
	this.collisionMatrix = new ArrayCollisionMatrix();

    /**
     * CollisionMatrix from the previous step.
     * @property {ArrayCollisionMatrix} collisionMatrixPrevious
	 * @type {ArrayCollisionMatrix}
	 */
	this.collisionMatrixPrevious = new ArrayCollisionMatrix();

    /**
     * All added materials
     * @property materials
     * @type {Array}
     */
    this.materials = [];

    /**
     * @property contactmaterials
     * @type {Array}
     */
    this.contactmaterials = [];

    /**
     * Used to look up a ContactMaterial given two instances of Material.
     * @property {TupleDictionary} contactMaterialTable
     */
    this.contactMaterialTable = new TupleDictionary();

    this.defaultMaterial = new Material("default");

    /**
     * This contact material is used if no suitable contactmaterial is found for a contact.
     * @property defaultContactMaterial
     * @type {ContactMaterial}
     */
    this.defaultContactMaterial = new ContactMaterial(this.defaultMaterial, this.defaultMaterial, { friction: 0.3, restitution: 0.0 });

    /**
     * @property doProfiling
     * @type {Boolean}
     */
    this.doProfiling = false;

    /**
     * @property profile
     * @type {Object}
     */
    this.profile = {
        solve:0,
        makeContactConstraints:0,
        broadphase:0,
        integrate:0,
        narrowphase:0,
    };

    /**
     * @property subsystems
     * @type {Array}
     */
    this.subsystems = [];

    this.addBodyEvent = {
        type:"addBody",
        body : null,
    };

    this.removeBodyEvent = {
        type:"removeBody",
        body : null,
    };
}
World.prototype = new EventTarget();

// Temp stuff
var tmpAABB1 = new AABB();
var tmpArray1 = [];
var tmpRay = new Ray();

/**
 * Get the contact material between materials m1 and m2
 * @method getContactMaterial
 * @param {Material} m1
 * @param {Material} m2
 * @return {ContactMaterial} The contact material if it was found.
 */
World.prototype.getContactMaterial = function(m1,m2){
    return this.contactMaterialTable.get(m1.id,m2.id); //this.contactmaterials[this.mats2cmat[i+j*this.materials.length]];
};

/**
 * Get number of objects in the world.
 * @method numObjects
 * @return {Number}
 * @deprecated
 */
World.prototype.numObjects = function(){
    return this.bodies.length;
};

/**
 * Store old collision state info
 * @method collisionMatrixTick
 */
World.prototype.collisionMatrixTick = function(){
	var temp = this.collisionMatrixPrevious;
	this.collisionMatrixPrevious = this.collisionMatrix;
	this.collisionMatrix = temp;
	this.collisionMatrix.reset();
};

/**
 * Add a rigid body to the simulation.
 * @method add
 * @param {Body} body
 * @todo If the simulation has not yet started, why recrete and copy arrays for each body? Accumulate in dynamic arrays in this case.
 * @todo Adding an array of bodies should be possible. This would save some loops too
 * @deprecated Use .addBody instead
 */
World.prototype.add = World.prototype.addBody = function(body){
    if(this.bodies.indexOf(body) !== -1){
        return;
    }
    body.index = this.bodies.length;
    this.bodies.push(body);
    body.world = this;
    body.initPosition.copy(body.position);
    body.initVelocity.copy(body.velocity);
    body.timeLastSleepy = this.time;
    if(body instanceof Body){
        body.initAngularVelocity.copy(body.angularVelocity);
        body.initQuaternion.copy(body.quaternion);
    }
	this.collisionMatrix.setNumObjects(this.bodies.length);
    this.addBodyEvent.body = body;
    this.dispatchEvent(this.addBodyEvent);
};

/**
 * Add a constraint to the simulation.
 * @method addConstraint
 * @param {Constraint} c
 */
World.prototype.addConstraint = function(c){
    this.constraints.push(c);
};

/**
 * Removes a constraint
 * @method removeConstraint
 * @param {Constraint} c
 */
World.prototype.removeConstraint = function(c){
    var idx = this.constraints.indexOf(c);
    if(idx!==-1){
        this.constraints.splice(idx,1);
    }
};

/**
 * Raycast test
 * @method rayTest
 * @param {Vec3} from
 * @param {Vec3} to
 * @param {Function|RaycastResult} result
 * @deprecated Use .raycastAll, .raycastClosest or .raycastAny instead.
 */
World.prototype.rayTest = function(from, to, result){
    if(result instanceof RaycastResult){
        // Do raycastclosest
        this.raycastClosest(from, to, {
            skipBackfaces: true
        }, result);
    } else {
        // Do raycastAll
        this.raycastAll(from, to, {
            skipBackfaces: true
        }, result);
    }
};

/**
 * Ray cast against all bodies. The provided callback will be executed for each hit with a RaycastResult as single argument.
 * @method raycastAll
 * @param  {Vec3} from
 * @param  {Vec3} to
 * @param  {Object} options
 * @param  {number} [options.collisionFilterMask=-1]
 * @param  {number} [options.collisionFilterGroup=-1]
 * @param  {boolean} [options.skipBackfaces=false]
 * @param  {boolean} [options.checkCollisionResponse=true]
 * @param  {Function} callback
 * @return {boolean} True if any body was hit.
 */
World.prototype.raycastAll = function(from, to, options, callback){
    options.mode = Ray.ALL;
    options.from = from;
    options.to = to;
    options.callback = callback;
    return tmpRay.intersectWorld(this, options);
};

/**
 * Ray cast, and stop at the first result. Note that the order is random - but the method is fast.
 * @method raycastAny
 * @param  {Vec3} from
 * @param  {Vec3} to
 * @param  {Object} options
 * @param  {number} [options.collisionFilterMask=-1]
 * @param  {number} [options.collisionFilterGroup=-1]
 * @param  {boolean} [options.skipBackfaces=false]
 * @param  {boolean} [options.checkCollisionResponse=true]
 * @param  {RaycastResult} result
 * @return {boolean} True if any body was hit.
 */
World.prototype.raycastAny = function(from, to, options, result){
    options.mode = Ray.ANY;
    options.from = from;
    options.to = to;
    options.result = result;
    return tmpRay.intersectWorld(this, options);
};

/**
 * Ray cast, and return information of the closest hit.
 * @method raycastClosest
 * @param  {Vec3} from
 * @param  {Vec3} to
 * @param  {Object} options
 * @param  {number} [options.collisionFilterMask=-1]
 * @param  {number} [options.collisionFilterGroup=-1]
 * @param  {boolean} [options.skipBackfaces=false]
 * @param  {boolean} [options.checkCollisionResponse=true]
 * @param  {RaycastResult} result
 * @return {boolean} True if any body was hit.
 */
World.prototype.raycastClosest = function(from, to, options, result){
    options.mode = Ray.CLOSEST;
    options.from = from;
    options.to = to;
    options.result = result;
    return tmpRay.intersectWorld(this, options);
};

/**
 * Remove a rigid body from the simulation.
 * @method remove
 * @param {Body} body
 * @deprecated Use .removeBody instead
 */
World.prototype.remove = function(body){
    body.world = null;
    var n = this.bodies.length-1,
        bodies = this.bodies,
        idx = bodies.indexOf(body);
    if(idx !== -1){
        bodies.splice(idx, 1); // Todo: should use a garbage free method

        // Recompute index
        for(var i=0; i!==bodies.length; i++){
            bodies[i].index = i;
        }

        this.collisionMatrix.setNumObjects(n);
        this.removeBodyEvent.body = body;
        this.dispatchEvent(this.removeBodyEvent);
    }
};

/**
 * Remove a rigid body from the simulation.
 * @method removeBody
 * @param {Body} body
 */
World.prototype.removeBody = World.prototype.remove;

/**
 * Adds a material to the World.
 * @method addMaterial
 * @param {Material} m
 * @todo Necessary?
 */
World.prototype.addMaterial = function(m){
    this.materials.push(m);
};

/**
 * Adds a contact material to the World
 * @method addContactMaterial
 * @param {ContactMaterial} cmat
 */
World.prototype.addContactMaterial = function(cmat) {

    // Add contact material
    this.contactmaterials.push(cmat);

    // Add current contact material to the material table
    this.contactMaterialTable.set(cmat.materials[0].id,cmat.materials[1].id,cmat);
};

// performance.now()
if(typeof performance === 'undefined'){
    performance = {};
}
if(!performance.now){
    var nowOffset = Date.now();
    if (performance.timing && performance.timing.navigationStart){
        nowOffset = performance.timing.navigationStart;
    }
    performance.now = function(){
        return Date.now() - nowOffset;
    };
}

var step_tmp1 = new Vec3();

/**
 * Step the physics world forward in time.
 *
 * There are two modes. The simple mode is fixed timestepping without interpolation. In this case you only use the first argument. The second case uses interpolation. In that you also provide the time since the function was last used, as well as the maximum fixed timesteps to take.
 *
 * @method step
 * @param {Number} dt                       The fixed time step size to use.
 * @param {Number} [timeSinceLastCalled]    The time elapsed since the function was last called.
 * @param {Number} [maxSubSteps=10]         Maximum number of fixed steps to take per function call.
 *
 * @example
 *     // fixed timestepping without interpolation
 *     world.step(1/60);
 *
 * @see http://bulletphysics.org/mediawiki-1.5.8/index.php/Stepping_The_World
 */
World.prototype.step = function(dt, timeSinceLastCalled, maxSubSteps){
    maxSubSteps = maxSubSteps || 10;
    timeSinceLastCalled = timeSinceLastCalled || 0;

    if(timeSinceLastCalled === 0){ // Fixed, simple stepping

        this.internalStep(dt);

        // Increment time
        this.time += dt;

    } else {

        // Compute the number of fixed steps we should have taken since the last step
        var internalSteps = Math.floor((this.time + timeSinceLastCalled) / dt) - Math.floor(this.time / dt);
        internalSteps = Math.min(internalSteps,maxSubSteps);

        // Do some fixed steps to catch up
        var t0 = performance.now();
        for(var i=0; i!==internalSteps; i++){
            this.internalStep(dt);
            if(performance.now() - t0 > dt * 1000){
                // We are slower than real-time. Better bail out.
                break;
            }
        }

        // Increment internal clock
        this.time += timeSinceLastCalled;

        // Compute "Left over" time step
        var h = this.time % dt;
        var h_div_dt = h / dt;
        var interpvelo = step_tmp1;
        var bodies = this.bodies;

        for(var j=0; j !== bodies.length; j++){
            var b = bodies[j];
            if(b.type !== Body.STATIC && b.sleepState !== Body.SLEEPING){

                // Interpolate
                b.position.vsub(b.previousPosition, interpvelo);
                interpvelo.scale(h_div_dt, interpvelo);
                b.position.vadd(interpvelo, b.interpolatedPosition);

                // TODO: interpolate quaternion
                // b.interpolatedAngle = b.angle + (b.angle - b.previousAngle) * h_div_dt;

            } else {

                // For static bodies, just copy. Who else will do it?
                b.interpolatedPosition.copy(b.position);
                b.interpolatedQuaternion.copy(b.quaternion);
            }
        }
    }
};

/**
 * Step the simulation
 * @method step
 * @param {Number} dt
 */
var World_step_postStepEvent = {type:"postStep"}, // Reusable event objects to save memory
    World_step_preStepEvent = {type:"preStep"},
    World_step_collideEvent = {type:"collide", body:null, contact:null },
    World_step_oldContacts = [], // Pools for unused objects
    World_step_frictionEquationPool = [],
    World_step_p1 = [], // Reusable arrays for collision pairs
    World_step_p2 = [],
    World_step_gvec = new Vec3(), // Temporary vectors and quats
    World_step_vi = new Vec3(),
    World_step_vj = new Vec3(),
    World_step_wi = new Vec3(),
    World_step_wj = new Vec3(),
    World_step_t1 = new Vec3(),
    World_step_t2 = new Vec3(),
    World_step_rixn = new Vec3(),
    World_step_rjxn = new Vec3(),
    World_step_step_q = new Quaternion(),
    World_step_step_w = new Quaternion(),
    World_step_step_wq = new Quaternion(),
    invI_tau_dt = new Vec3();
World.prototype.internalStep = function(dt){
    this.dt = dt;

    var world = this,
        that = this,
        contacts = this.contacts,
        p1 = World_step_p1,
        p2 = World_step_p2,
        N = this.numObjects(),
        bodies = this.bodies,
        solver = this.solver,
        gravity = this.gravity,
        doProfiling = this.doProfiling,
        profile = this.profile,
        DYNAMIC = Body.DYNAMIC,
        profilingStart,
        constraints = this.constraints,
        frictionEquationPool = World_step_frictionEquationPool,
        gnorm = gravity.norm(),
        gx = gravity.x,
        gy = gravity.y,
        gz = gravity.z,
        i=0;

    if(doProfiling){
        profilingStart = performance.now();
    }

    // Add gravity to all objects
    for(i=0; i!==N; i++){
        var bi = bodies[i];
        if(bi.type & DYNAMIC){ // Only for dynamic bodies
            var f = bi.force, m = bi.mass;
            f.x += m*gx;
            f.y += m*gy;
            f.z += m*gz;
        }
    }

    // Update subsystems
    for(var i=0, Nsubsystems=this.subsystems.length; i!==Nsubsystems; i++){
        this.subsystems[i].update();
    }

    // Collision detection
    if(doProfiling){ profilingStart = performance.now(); }
    p1.length = 0; // Clean up pair arrays from last step
    p2.length = 0;
    this.broadphase.collisionPairs(this,p1,p2);
    if(doProfiling){ profile.broadphase = performance.now() - profilingStart; }

    // Remove constrained pairs with collideConnected == false
    var Nconstraints = constraints.length;
    for(i=0; i!==Nconstraints; i++){
        var c = constraints[i];
        if(!c.collideConnected){
            for(var j = p1.length-1; j>=0; j-=1){
                if( (c.bodyA === p1[j] && c.bodyB === p2[j]) ||
                    (c.bodyB === p1[j] && c.bodyA === p2[j])){
                    p1.splice(j, 1);
                    p2.splice(j, 1);
                }
            }
        }
    }

    this.collisionMatrixTick();

    // Generate contacts
    if(doProfiling){ profilingStart = performance.now(); }
    var oldcontacts = World_step_oldContacts;
    var NoldContacts = contacts.length;

    for(i=0; i!==NoldContacts; i++){
        oldcontacts.push(contacts[i]);
    }
    contacts.length = 0;

    // Transfer FrictionEquation from current list to the pool for reuse
    var NoldFrictionEquations = this.frictionEquations.length;
    for(i=0; i!==NoldFrictionEquations; i++){
        frictionEquationPool.push(this.frictionEquations[i]);
    }
    this.frictionEquations.length = 0;

    this.narrowphase.getContacts(
        p1,
        p2,
        this,
        contacts,
        oldcontacts, // To be reused
        this.frictionEquations,
        frictionEquationPool
    );

    if(doProfiling){
        profile.narrowphase = performance.now() - profilingStart;
    }

    // Loop over all collisions
    if(doProfiling){
        profilingStart = performance.now();
    }

    // Add all friction eqs
    for (var i = 0; i < this.frictionEquations.length; i++) {
        solver.addEquation(this.frictionEquations[i]);
    }

    var ncontacts = contacts.length;
    for(var k=0; k!==ncontacts; k++){

        // Current contact
        var c = contacts[k];

        // Get current collision indeces
        var bi = c.bi,
            bj = c.bj,
            si = c.si,
            sj = c.sj;

        // Get collision properties
        var cm;
        if(bi.material && bj.material){
            cm = this.getContactMaterial(bi.material,bj.material) || this.defaultContactMaterial;
        } else {
            cm = this.defaultContactMaterial;
        }

        // c.enabled = bi.collisionResponse && bj.collisionResponse && si.collisionResponse && sj.collisionResponse;

        var mu = cm.friction;
        // c.restitution = cm.restitution;

        // If friction or restitution were specified in the material, use them
        if(bi.material && bj.material){
            if(bi.material.friction >= 0 && bj.material.friction >= 0){
                mu = bi.material.friction * bj.material.friction;
            }

            if(bi.material.restitution >= 0 && bj.material.restitution >= 0){
                c.restitution = bi.material.restitution * bj.material.restitution;
            }
        }

		// c.setSpookParams(
  //           cm.contactEquationStiffness,
  //           cm.contactEquationRelaxation,
  //           dt
  //       );

		solver.addEquation(c);

		// // Add friction constraint equation
		// if(mu > 0){

		// 	// Create 2 tangent equations
		// 	var mug = mu * gnorm;
		// 	var reducedMass = (bi.invMass + bj.invMass);
		// 	if(reducedMass > 0){
		// 		reducedMass = 1/reducedMass;
		// 	}
		// 	var pool = frictionEquationPool;
		// 	var c1 = pool.length ? pool.pop() : new FrictionEquation(bi,bj,mug*reducedMass);
		// 	var c2 = pool.length ? pool.pop() : new FrictionEquation(bi,bj,mug*reducedMass);
		// 	this.frictionEquations.push(c1, c2);

		// 	c1.bi = c2.bi = bi;
		// 	c1.bj = c2.bj = bj;
		// 	c1.minForce = c2.minForce = -mug*reducedMass;
		// 	c1.maxForce = c2.maxForce = mug*reducedMass;

		// 	// Copy over the relative vectors
		// 	c1.ri.copy(c.ri);
		// 	c1.rj.copy(c.rj);
		// 	c2.ri.copy(c.ri);
		// 	c2.rj.copy(c.rj);

		// 	// Construct tangents
		// 	c.ni.tangents(c1.t, c2.t);

  //           // Set spook params
  //           c1.setSpookParams(cm.frictionEquationStiffness, cm.frictionEquationRelaxation, dt);
  //           c2.setSpookParams(cm.frictionEquationStiffness, cm.frictionEquationRelaxation, dt);

  //           c1.enabled = c2.enabled = c.enabled;

		// 	// Add equations to solver
		// 	solver.addEquation(c1);
		// 	solver.addEquation(c2);
		// }

        if( bi.allowSleep &&
            bi.type === Body.DYNAMIC &&
            bi.sleepState  === Body.SLEEPING &&
            bj.sleepState  === Body.AWAKE &&
            bj.type !== Body.STATIC
        ){
            var speedSquaredB = bj.velocity.norm2() + bj.angularVelocity.norm2();
            var speedLimitSquaredB = Math.pow(bj.sleepSpeedLimit,2);
            if(speedSquaredB >= speedLimitSquaredB*2){
                bi._wakeUpAfterNarrowphase = true;
            }
        }

        if( bj.allowSleep &&
            bj.type === Body.DYNAMIC &&
            bj.sleepState  === Body.SLEEPING &&
            bi.sleepState  === Body.AWAKE &&
            bi.type !== Body.STATIC
        ){
            var speedSquaredA = bi.velocity.norm2() + bi.angularVelocity.norm2();
            var speedLimitSquaredA = Math.pow(bi.sleepSpeedLimit,2);
            if(speedSquaredA >= speedLimitSquaredA*2){
                bj._wakeUpAfterNarrowphase = true;
            }
        }

        // Now we know that i and j are in contact. Set collision matrix state
		this.collisionMatrix.set(bi, bj, true);

        if (!this.collisionMatrixPrevious.get(bi, bj)) {
            // First contact!
            // We reuse the collideEvent object, otherwise we will end up creating new objects for each new contact, even if there's no event listener attached.
            World_step_collideEvent.body = bj;
            World_step_collideEvent.contact = c;
            bi.dispatchEvent(World_step_collideEvent);

            World_step_collideEvent.body = bi;
            bj.dispatchEvent(World_step_collideEvent);
        }
    }
    if(doProfiling){
        profile.makeContactConstraints = performance.now() - profilingStart;
        profilingStart = performance.now();
    }

    // Wake up bodies
    for(i=0; i!==N; i++){
        var bi = bodies[i];
        if(bi._wakeUpAfterNarrowphase){
            bi.wakeUp();
            bi._wakeUpAfterNarrowphase = false;
        }
    }

    // Add user-added constraints
    var Nconstraints = constraints.length;
    for(i=0; i!==Nconstraints; i++){
        var c = constraints[i];
        c.update();
        for(var j=0, Neq=c.equations.length; j!==Neq; j++){
            var eq = c.equations[j];
            solver.addEquation(eq);
        }
    }

    // Solve the constrained system
    solver.solve(dt,this);

    if(doProfiling){
        profile.solve = performance.now() - profilingStart;
    }

    // Remove all contacts from solver
    solver.removeAllEquations();

    // Apply damping, see http://code.google.com/p/bullet/issues/detail?id=74 for details
    var pow = Math.pow;
    for(i=0; i!==N; i++){
        var bi = bodies[i];
        if(bi.type & DYNAMIC){ // Only for dynamic bodies
            var ld = pow(1.0 - bi.linearDamping,dt);
            var v = bi.velocity;
            v.mult(ld,v);
            var av = bi.angularVelocity;
            if(av){
                var ad = pow(1.0 - bi.angularDamping,dt);
                av.mult(ad,av);
            }
        }
    }

    this.dispatchEvent(World_step_preStepEvent);

    // Invoke pre-step callbacks
    for(i=0; i!==N; i++){
        var bi = bodies[i];
        if(bi.preStep){
            bi.preStep.call(bi);
        }
    }

    // Leap frog
    // vnew = v + h*f/m
    // xnew = x + h*vnew
    if(doProfiling){
        profilingStart = performance.now();
    }
    var q = World_step_step_q;
    var w = World_step_step_w;
    var wq = World_step_step_wq;
    var stepnumber = this.stepnumber;
    var DYNAMIC_OR_KINEMATIC = Body.DYNAMIC | Body.KINEMATIC;
    var quatNormalize = stepnumber % (this.quatNormalizeSkip+1) === 0;
    var quatNormalizeFast = this.quatNormalizeFast;
    var half_dt = dt * 0.5;
    var PLANE = Shape.types.PLANE,
        CONVEX = Shape.types.CONVEXPOLYHEDRON;

    for(i=0; i!==N; i++){
        var b = bodies[i],
            force = b.force,
            tau = b.torque;
        if((b.type & DYNAMIC_OR_KINEMATIC) && b.sleepState !== Body.SLEEPING){ // Only for dynamic
            var velo = b.velocity,
                angularVelo = b.angularVelocity,
                pos = b.position,
                quat = b.quaternion,
                invMass = b.invMass,
                invInertia = b.invInertiaWorld;

            velo.x += force.x * invMass * dt;
            velo.y += force.y * invMass * dt;
            velo.z += force.z * invMass * dt;

            if(b.angularVelocity){
                invInertia.vmult(tau,invI_tau_dt);
                invI_tau_dt.mult(dt,invI_tau_dt);
                invI_tau_dt.vadd(angularVelo,angularVelo);
            }

            // Use new velocity  - leap frog
            pos.x += velo.x * dt;
            pos.y += velo.y * dt;
            pos.z += velo.z * dt;

            if(b.angularVelocity){
                w.set(angularVelo.x, angularVelo.y, angularVelo.z, 0);
                w.mult(quat,wq);
                quat.x += half_dt * wq.x;
                quat.y += half_dt * wq.y;
                quat.z += half_dt * wq.z;
                quat.w += half_dt * wq.w;
                if(quatNormalize){
                    if(quatNormalizeFast){
                        quat.normalizeFast();
                    } else {
                        quat.normalize();
                    }
                }
            }

            if(b.aabb){
                b.aabbNeedsUpdate = true;
            }

            // Update world inertia
            if(b.updateInertiaWorld){
                b.updateInertiaWorld();
            }
        }
    }
    this.clearForces();

    this.broadphase.dirty = true;

    if(doProfiling){
        profile.integrate = performance.now() - profilingStart;
    }

    // Update world time
    this.time += dt;
    this.stepnumber += 1;

    this.dispatchEvent(World_step_postStepEvent);

    // Invoke post-step callbacks
    for(i=0; i!==N; i++){
        var bi = bodies[i];
        var postStep = bi.postStep;
        if(postStep){
            postStep.call(bi);
        }
    }

    // Sleeping update
    if(this.allowSleep){
        for(i=0; i!==N; i++){
            bodies[i].sleepTick(this.time);
        }
    }
};

/**
 * Sets all body forces in the world to zero.
 * @method clearForces
 */
World.prototype.clearForces = function(){
    var bodies = this.bodies;
    var N = bodies.length;
    for(var i=0; i !== N; i++){
        var b = bodies[i],
            force = b.force,
            tau = b.torque;

        b.force.set(0,0,0);
        b.torque.set(0,0,0);
    }
};

},{"../collision/AABB":3,"../collision/ArrayCollisionMatrix":4,"../collision/NaiveBroadphase":7,"../collision/Ray":9,"../collision/RaycastResult":10,"../equations/ContactEquation":19,"../equations/FrictionEquation":21,"../material/ContactMaterial":24,"../material/Material":25,"../math/Quaternion":28,"../math/Vec3":30,"../objects/Body":31,"../shapes/Shape":43,"../solver/GSSolver":46,"../utils/EventTarget":49,"../utils/TupleDictionary":52,"../utils/Vec3Pool":54,"./Narrowphase":55}]},{},[2])
(2)
});
}).call(this)}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],25:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/* eslint-disable no-unused-vars */
var App = {
  name: "Matrix Engine Manifest",
  version: "1.0.6",
  events: true,
  logs: false,
  draw_interval: 10,
  antialias: false,
  camera: {
    viewAngle: 45,
    nearViewpoint: 0.1,
    farViewpoint: 1000,
    edgeMarginValue: 100,
    FirstPersonController: false,
    SceneController: false,
    sceneControllerDragAmp: 0.1,
    sceneControllerDragAmp: 0.1,
    speedAmp: 0.5,
    sceneControllerEdgeCameraYawRate: 3,
    sceneControllerWASDKeysAmp: 0.1
  },
  raycast: true,
  resize: {
    canvas: "full-screen",
    // Change to any to make
    aspectRatio: 1.8 // aspectRatio system active

  },
  glBackgroundColor: {
    r: 0.0,
    g: 0.0,
    b: 0.0,
    a: 1.0
  },
  textures: [],
  // readOnly in manifest
  tools: {},
  // readOnly in manifest
  operation: {},
  // readOnly in manifest
  commonObject: {},
  // readOnly in manifest
  dynamicBuffer: true,
  scene: {},
  // readOnly in manifest
  meshes: {},
  // readOnly in manifest
  limitations: {
    // readOnly in manifest
    maxTexturesInFragmentShader: null // readOnly in manifest

  },
  updateBeforeDraw: [],
  audioSystem: {},
  // readOnly in manifest
  pwa: {
    addToHomePage: true
  },
  ready: false,
  onload: function () {}
};
var _default = App;
exports.default = _default;

},{}]},{},[1]);
