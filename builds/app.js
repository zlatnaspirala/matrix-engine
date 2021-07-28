(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var matrixEngine = _interopRequireWildcard(require("./index.js"));

var _adding_color_triangle = require("./apps/adding_color_triangle");

var raycaster = _interopRequireWildcard(require("./lib/raycast"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var world;
var App = matrixEngine.App;
matrixEngine.Engine.load_shaders('shaders/shaders.html');

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
  window.runThis = _adding_color_triangle.runThis;
  matrixEngine.utility.E('debugBox').style.display = 'block';
  canvas.addEventListener('mousedown', ev => {
    raycaster.checkingProcedure(ev);
  }); // If you need this , you can prolong loading time

  setTimeout(() => {
    (0, _adding_color_triangle.runThis)(world);
  }, 250); // Run example
  // runThis(world);
};

window.matrixEngine = matrixEngine;
var App = matrixEngine.App;
var _default = App;
exports.default = _default;

},{"./apps/adding_color_triangle":2,"./index.js":3,"./lib/raycast":13}],2:[function(require,module,exports){
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
 */

/* globals world App world */
var runThis = world => {
  world.Add("triangle", 1, "MyColoredTriangle1"); // world.Add("triangle", 1, "MyColoredTriangle2");
  // world.Add("triangle", 1, "MyColoredTriangle3");

  _manifest.default.scene.MyColoredTriangle1.position.SetZ(-4);

  _manifest.default.scene.MyColoredTriangle1.position.SetX(0);

  _manifest.default.scene.MyColoredTriangle1.position.SetY(0); // App.scene.MyColoredTriangle1.position.SetX(2.5);
  // App.scene.MyColoredTriangle2.position.SetX(0);
  // App.scene.MyColoredTriangle3.position.SetX(-2.5);
  // App.scene.MyColoredTriangle1.rotation.rotationSpeed.z = -10;
  // App.scene.MyColoredTriangle2.rotation.rotationSpeed.z = -10;
  // App.scene.MyColoredTriangle3.rotation.rotationSpeed.z = -10;

};

exports.runThis = runThis;

},{"../program/manifest":16}],3:[function(require,module,exports){
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
Object.defineProperty(exports, "OBJ", {
  enumerable: true,
  get: function () {
    return _loaderObj.default;
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
exports.utility = exports.Events = exports.Engine = exports.matrixRender = exports.matrixGeometry = exports.matrixWorld = void 0;

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

var _loaderObj = _interopRequireDefault(require("./lib/loader-obj"));

var _matrixBuffers = _interopRequireDefault(require("./lib/matrix-buffers"));

var _matrixTextures = _interopRequireDefault(require("./lib/matrix-textures"));

var utility = _interopRequireWildcard(require("./lib/utility"));

exports.utility = utility;

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

},{"./lib/engine":4,"./lib/events":5,"./lib/loader-obj":6,"./lib/matrix-buffers":7,"./lib/matrix-geometry":9,"./lib/matrix-render":10,"./lib/matrix-textures":11,"./lib/matrix-world":12,"./lib/utility":14,"./program/manifest":16}],4:[function(require,module,exports){
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
exports.CANVAS2d_SURFACE_TEXTURE = CANVAS2d_SURFACE_TEXTURE;
exports.webcamError = exports.RegenerateShader = exports.looper = exports.EVENTS_INSTANCE = exports.updateFrames = exports.updateTime = exports.totalTime = exports.lastTime = exports.ht = exports.wd = void 0;

var _events = require("./events");

var _manifest = _interopRequireDefault(require("../program/manifest"));

var _utility = require("./utility");

var _webglUtils = require("./webgl-utils");

var _matrixRender = require("./matrix-render");

var _matrixWorld = require("./matrix-world");

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

function load_shaders(href) {
  function handler() {
    if (this.status == 200 && this.responseText != null) {
      // Success
      document.getElementById('shaders').innerHTML = this.responseText;
    } else {
      // something went wrong
      console.warn('Something went wrong on shaders load procces!');
    }
  }

  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onload = handler;
  xmlhttp.open('GET', href, true);
  xmlhttp.send();
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
      // console.log("            Shader Program compile failed:" + gl.getShaderInfoLog(shader));
      return 0;
    }
  } else {
    // console.log("            Shader Program creation failed");
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
    // console.log("        Failed to Load shader");
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
      }

      shaderProgram.pMatrixUniform = gl.getUniformLocation(shaderProgram, 'uPMatrix');
      shaderProgram.mvMatrixUniform = gl.getUniformLocation(shaderProgram, 'uMVMatrix');
      /* For destroying properly            */

      shaderProgram.fragmentShader = fragmentShader;
      shaderProgram.vertexShader = vertexShader;
      return shaderProgram;
    } else {
      // console.warn("          Returning Shader fragment failed");
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


var RegenerateShader = function (id_elem, numOfSamplerInUse, mixOperand) {
  var e = document.getElementById(id_elem);

  if (mixOperand == 'multiply') {
    mixOperand = 0;
  } else if (mixOperand == 'divide') {
    mixOperand = 1;
  }

  e.innerHTML = generateShaderSrc(numOfSamplerInUse, mixOperand);
};

exports.RegenerateShader = RegenerateShader;

var RegenerateCustomShader = function (id_elem, numOfSamplerInUse, mixOperand, code_) {
  var e = document.getElementById(id_elem);

  if (mixOperand == 'multiply') {
    mixOperand = 0;
  } else if (mixOperand == 'divide') {
    mixOperand = 1;
  }

  e.innerHTML = generateCustomShaderSrc(numOfSamplerInUse, mixOperand, code_);
};

function generateShaderSrc(numTextures, mixOperand) {
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

    void main(void) {

        vec4 textureColor = texture2D(uSampler, vec2(vTextureCoord.s, vTextureCoord.t));
        vec4 textureColor1 = texture2D(uSampler1, vec2(vTextureCoord.s, vTextureCoord.t));
        vec4 textureColor2 = texture2D(uSampler2, vec2(vTextureCoord.s, vTextureCoord.t));
        vec4 textureColor3 = texture2D(uSampler3, vec2(vTextureCoord.s, vTextureCoord.t));
        vec4 textureColor4 = texture2D(uSampler4, vec2(vTextureCoord.s, vTextureCoord.t));
        vec4 textureColor5 = texture2D(uSampler5, vec2(vTextureCoord.s, vTextureCoord.t));
        vec4 textureColor6 = texture2D(uSampler6, vec2(vTextureCoord.s, vTextureCoord.t));
        vec4 textureColor7 = texture2D(uSampler7, vec2(vTextureCoord.s, vTextureCoord.t));

        //MixOperandString  make it with eval todo task

        if (  ${numTextures} == 1)
            {

                  gl_FragColor      = vec4(textureColor.rgb * vLightWeighting, textureColor.a);

              //  gl_FragColor = vec4( smoothstep(textureColor.r, textureColor.b,textureColor.g ) , smoothstep(textureColor.r, textureColor.b,textureColor.g ) ,0 ,smoothstep(textureColor.r, textureColor.b,textureColor.g ) );

            }
        else if (${numTextures} == 2)
            {
                if ( ${mixOperand} == 0){
                 // gl_FragColor = textureColor * textureColor1;

                  gl_FragColor      = vec4( (textureColor.rgb * textureColor1.rgb) * vLightWeighting, textureColor.a);
                }
                else if (${mixOperand} == 1){

                //gl_FragColor = textureColor / textureColor1;
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

function CANVAS2d_SURFACE_TEXTURE(path_, path_to_run_script) {
  var ROOT = this;
  ROOT.iframe = document.createElement('iframe');
  ROOT.iframe.id = 'canvas2dTextureSurface';
  ROOT.iframe.setAttribute('width', '512');
  ROOT.iframe.setAttribute('height', '512');
  var DIV_CONTENT_STREAMS = document.getElementById('HOLDER_STREAMS');
  ROOT.iframe.src = path_;
  DIV_CONTENT_STREAMS.appendChild(ROOT.iframe);

  document.getElementById(ROOT.iframe.id).onload = function () {
    ROOT.videoImage = ROOT.iframe.contentDocument.getElementById('HELLO_WORLD');
    ROOT.canvasTexture = ROOT.videoImage.getContext('2d');

    _manifest.default.scene.outsideBox.streamTextures.iframe.contentWindow.SYS.SCRIPT.LOAD(path_to_run_script);

    (0, _utility.E)('HOLDER_STREAMS').style.display = 'none';
    ROOT.texture = _manifest.default.tools.loadVideoTexture('glVideoTexture', ROOT.videoImage); // console.log("REZULT TEST");
  };

  ROOT.showTextureEditor = function () {
    var T = (0, _utility.E)('HOLDER_STREAMS').style;
    T.display = 'block';
    T.left = '0';
  };
}

},{"../program/manifest":16,"./events":5,"./matrix-render":10,"./matrix-world":12,"./utility":14,"./webgl-utils":15}],5:[function(require,module,exports){
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
      passive: true
    });
    canvas.addEventListener('touchend', function (e) {
      e.preventDefault();
      var touchList = e.changedTouches;
      SYS.MOUSE.PRESS = false;
      SYS.MOUSE.x = touchList[0].pageX;
      SYS.MOUSE.y = touchList[0].pageY;
      ROOT_EVENTS.CALCULATE_TOUCH_UP_OR_MOUSE_UP();
    }, {
      passive: true
    });
    canvas.addEventListener('touchcancel', function (e) {
      e.preventDefault();
      var touchList = e.changedTouches;
      SYS.MOUSE.PRESS = false;
      SYS.MOUSE.x = touchList[0].pageX;
      SYS.MOUSE.y = touchList[0].pageY;
      ROOT_EVENTS.CALCULATE_TOUCH_UP_OR_MOUSE_UP();
    }, {
      passive: true
    });
    canvas.addEventListener('touchmove', function (e) {
      e.preventDefault();
      var touchList = e.changedTouches; //SYS.MOUSE.MOUSE_MOVING = true;
      //SYS.MOUSE.PRESS = true;

      SYS.MOUSE.x = touchList[0].pageX;
      SYS.MOUSE.y = touchList[0].pageY;
      ROOT_EVENTS.CALCULATE_TOUCH_MOVE_OR_MOUSE_MOVE();
    }, {
      passive: true
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
  }; // CALCULATE MOUSE MOVE OR TOUCH MOVE


  this.CALCULATE_TOUCH_MOVE_OR_MOUSE_MOVE = function (e) {
    var center_x = window.innerWidth / 2;
    var center_y = window.innerHeight / 2;
    SYS.MOUSE.x = e.layerX - center_x;
    SYS.MOUSE.y = e.layerY - center_y; //check to make sure there is data to compare against

    if (typeof SYS.MOUSE.LAST_POSITION.x != 'undefined') {
      //get the change from last position to this position
      var deltaX = SYS.MOUSE.LAST_POSITION.x - SYS.MOUSE.x,
          deltaY = SYS.MOUSE.LAST_POSITION.y - SYS.MOUSE.y; //check which direction had the highest amplitude and then figure out direction by checking if the value is greater or less than zero

      if (Math.abs(deltaX) > Math.abs(deltaY) && deltaX > 0) {//left
      } else if (Math.abs(deltaX) > Math.abs(deltaY) && deltaX < 0) {//right
      } else if (Math.abs(deltaY) > Math.abs(deltaX) && deltaY > 0) {//up
      } else if (Math.abs(deltaY) > Math.abs(deltaX) && deltaY < 0) {//down
      }
    }

    camera.pitchRate += deltaY * 10;
    camera.yawRate += deltaX * 1; //set the new last position to the current for next time

    SYS.MOUSE.LAST_POSITION.x = SYS.MOUSE.x, SYS.MOUSE.LAST_POSITION.y = SYS.MOUSE.y;

    if (SYS.MOUSE.x < _manifest.default.camera.edgeMarginValue - center_x) {
      _manifest.default.camera.leftEdge = true; //SYS.DEBUG.LOG(" mouse on edge ! ");
    } else {
      _manifest.default.camera.leftEdge = false;
    }

    if (SYS.MOUSE.x > center_x - _manifest.default.camera.edgeMarginValue) {
      _manifest.default.camera.rightEdge = true; //SYS.DEBUG.LOG(" mouse on edge ! ");
    } else {
      _manifest.default.camera.rightEdge = false;
    } //SYS.DEBUG.LOG(" EVENT : MOUSE/TOUCH MOVE ");

  }; // CALCULATE_TOUCH_UP_OR_MOUSE_UP


  this.CALCULATE_TOUCH_UP_OR_MOUSE_UP = function () {
    SYS.DEBUG.LOG(' EVENT : MOUSE/TOUCH UP ');
  };

  this.CALCULATE_TOUCH_DOWN_OR_MOUSE_DOWN = function () {
    SYS.DEBUG.LOG(' EVENT : MOUSE/TOUCH DOWN ');
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
    this.setKeyStatus(evt.keyCode, true);
  };

  globKeyPressObj.handleKeyUp = function (evt) {
    evt = evt ? evt : window.event ? window.event : '';
    this.setKeyStatus(evt.keyCode, false);
  };
  /* Destructor                                    */


  globKeyPressObj.destroy = function () {
    printLog('    Destroy Key Press object');
    document.onkeydown = null;
    document.onkeyup = null;
    delete this.keyArr;
    delete this;
  };

  return globKeyPressObj;
}

var camera = new Object();
/* Set defaults                                  */

exports.camera = camera;
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

},{"../program/manifest":16,"./matrix-world":12,"./utility":14}],6:[function(require,module,exports){
/* globals module */
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var OBJ = {}; // if (typeof module !== "undefined") {
// module.exports = OBJ;
// } else {

window.OBJ = OBJ; // }

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

OBJ.Mesh = function (objectData) {
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

  var lines = objectData.split('\n');
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

          unpacked.verts.push(+verts[(vertex[0] - 1) * 3 + 0]);
          unpacked.verts.push(+verts[(vertex[0] - 1) * 3 + 1]);
          unpacked.verts.push(+verts[(vertex[0] - 1) * 3 + 2]); // vertex textures

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
};

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


OBJ.downloadMeshes = function (nameAndURLs, completionCallback, meshes) {
  // the total number of meshes. this is used to implement "blocking"
  var semaphore = Object.keys(nameAndURLs).length; // if error is true, an alert will given

  var error = false; // this is used to check if all meshes have been downloaded
  // if meshes is supplied, then it will be populated, otherwise
  // a new object is created. this will be passed into the completionCallback

  if (meshes === undefined) meshes = {}; // loop over the mesh_name,url key,value pairs

  for (var mesh_name in nameAndURLs) {
    if (nameAndURLs.hasOwnProperty(mesh_name)) {
      new Ajax().get(nameAndURLs[mesh_name], function (name) {
        return function (data, status) {
          if (status === 200) {
            meshes[name] = new OBJ.Mesh(data);
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


OBJ.initMeshBuffers = function (gl, mesh) {
  mesh.normalBuffer = _buildBuffer(gl, gl.ARRAY_BUFFER, mesh.vertexNormals, 3);
  mesh.textureBuffer = _buildBuffer(gl, gl.ARRAY_BUFFER, mesh.textures, 2);
  mesh.vertexBuffer = _buildBuffer(gl, gl.ARRAY_BUFFER, mesh.vertices, 3);
  mesh.indexBuffer = _buildBuffer(gl, gl.ELEMENT_ARRAY_BUFFER, mesh.indices, 1);
};

OBJ.deleteMeshBuffers = function (gl, mesh) {
  gl.deleteBuffer(mesh.normalBuffer);
  gl.deleteBuffer(mesh.textureBuffer);
  gl.deleteBuffer(mesh.vertexBuffer);
  gl.deleteBuffer(mesh.indexBuffer);
};

var _default = OBJ;
exports.default = _default;

},{}],7:[function(require,module,exports){
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

},{"../program/manifest":16,"./matrix-world":12}],8:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _manifest = _interopRequireDefault(require("../program/manifest"));

var _matrixWorld = require("./matrix-world");

var _events = require("./events");

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
  }

  mat4.translate(object.mvMatrix, object.mvMatrix, object.position.worldLocation);
  mat4.rotate(object.mvMatrix, object.mvMatrix, degToRad(object.rotation.rx), object.rotation.getRotDirX());
  mat4.rotate(object.mvMatrix, object.mvMatrix, degToRad(object.rotation.ry), object.rotation.getRotDirY());
  mat4.rotate(object.mvMatrix, object.mvMatrix, degToRad(object.rotation.rz), object.rotation.getRotDirZ()); // VERTEX

  if (object.vertexPositionBuffer) {
    _matrixWorld.world.GL.gl.bindBuffer(_matrixWorld.world.GL.gl.ARRAY_BUFFER, object.vertexPositionBuffer);

    if (object.geometry.dynamicBuffer == true) {
      _matrixWorld.world.GL.gl.bufferData(_matrixWorld.world.GL.gl.ARRAY_BUFFER, object.geometry.vertices, _matrixWorld.world.GL.gl.STATIC_DRAW);
    }

    _matrixWorld.world.GL.gl.vertexAttribPointer(object.shaderProgram.vertexPositionAttribute, object.vertexPositionBuffer.itemSize, _matrixWorld.world.GL.gl.FLOAT, false, 0, 0);

    _matrixWorld.world.GL.gl.enableVertexAttribArray(object.shaderProgram.vertexPositionAttribute);

    localLooper = localLooper + 1;
  } // COLOR


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
      if (document.getElementById('ambLight') && document.getElementById('ambLight').color) {
        _matrixWorld.world.GL.gl.uniform3f(object.shaderProgram.ambientColorUniform, parseFloat(document.getElementById('ambLight').color.rgb[0]), parseFloat(document.getElementById('ambLight').color.rgb[1]), parseFloat(document.getElementById('ambLight').color.rgb[2]));
      } else {
        // object.LightsData.ambientLight
        _matrixWorld.world.GL.gl.uniform3f(object.shaderProgram.ambientColorUniform, object.LightsData.ambientLight.r, object.LightsData.ambientLight.g, object.LightsData.ambientLight.b);
      }
    }
    /* Directional light */


    if (object.shaderProgram.directionalColorUniform) {
      if (document.getElementById('dirLight') && document.getElementById('dirLight').color) {
        _matrixWorld.world.GL.gl.uniform3f(object.shaderProgram.directionalColorUniform, parseFloat(document.getElementById('dirLight').color.rgb[0]), parseFloat(document.getElementById('dirLight').color.rgb[1]), parseFloat(document.getElementById('dirLight').color.rgb[2]));
      } else {
        // object.LightsData.lightingDirection
        _matrixWorld.world.GL.gl.uniform3f(object.shaderProgram.directionalColorUniform, object.LightsData.directionLight.R(), object.LightsData.directionLight.G(), object.LightsData.directionLight.B());
      }
    }
    /* Normalize the direction */


    var lightingDirection = null;

    if (object.shaderProgram.lightingDirectionUniform) {
      if (document.getElementById('dirX') && document.getElementById('dirY') && document.getElementById('dirZ')) {
        lightingDirection = [parseFloat(document.getElementById('dirX').value), parseFloat(document.getElementById('dirY').value), parseFloat(document.getElementById('dirZ').value)];
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
  } // TEXTURES


  if (object.vertexTexCoordBuffer) {
    _matrixWorld.world.GL.gl.bindBuffer(_matrixWorld.world.GL.gl.ARRAY_BUFFER, object.vertexTexCoordBuffer);

    if (object.geometry.dynamicBuffer == true) {
      _matrixWorld.world.GL.gl.bufferData(_matrixWorld.world.GL.gl.ARRAY_BUFFER, object.geometry.texCoords, _matrixWorld.world.GL.gl.STATIC_DRAW);
    }

    _matrixWorld.world.GL.gl.vertexAttribPointer(object.shaderProgram.textureCoordAttribute, object.vertexTexCoordBuffer.itemSize, _matrixWorld.world.GL.gl.FLOAT, false, 0, 0);

    _matrixWorld.world.GL.gl.enableVertexAttribArray(object.shaderProgram.textureCoordAttribute);

    if (object.streamTextures != null) {
      // video/webcam textures
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
  }

  _matrixWorld.world.GL.gl.bindBuffer(_matrixWorld.world.GL.gl.ELEMENT_ARRAY_BUFFER, object.vertexIndexBuffer);

  _matrixWorld.world.setMatrixUniforms(object, this.pMatrix, object.mvMatrix);

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

    _matrixWorld.world.GL.gl.enable(_matrixWorld.world.GL.gl.DEPTH_TEST);
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
  }

  mat4.translate(object.mvMatrix, object.mvMatrix, object.position.worldLocation);
  mat4.rotate(object.mvMatrix, object.mvMatrix, degToRad(object.rotation.rx), object.rotation.getRotDirX());
  mat4.rotate(object.mvMatrix, object.mvMatrix, degToRad(object.rotation.ry), object.rotation.getRotDirY());
  mat4.rotate(object.mvMatrix, object.mvMatrix, degToRad(object.rotation.rz), object.rotation.getRotDirZ());

  if (object.geometry.dynamicBuffer == true) {
    _matrixWorld.world.GL.gl.bindBuffer(_matrixWorld.world.GL.gl.ARRAY_BUFFER, object.vertexPositionBuffer);

    _matrixWorld.world.GL.gl.bufferData(_matrixWorld.world.GL.gl.ARRAY_BUFFER, object.geometry.vertices, _matrixWorld.world.GL.gl.STATIC_DRAW);
  } else {
    _matrixWorld.world.GL.gl.bindBuffer(_matrixWorld.world.GL.gl.ARRAY_BUFFER, object.vertexPositionBuffer); //ori without if dynamicBuffer

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
  }

  mat4.translate(object.mvMatrix, object.mvMatrix, object.position.worldLocation);
  mat4.rotate(object.mvMatrix, object.mvMatrix, degToRad(object.rotation.rx), object.rotation.getRotDirX());
  mat4.rotate(object.mvMatrix, object.mvMatrix, degToRad(object.rotation.ry), object.rotation.getRotDirY());
  mat4.rotate(object.mvMatrix, object.mvMatrix, degToRad(object.rotation.rz), object.rotation.getRotDirZ());

  if (object.geometry.dynamicBuffer == true) {
    _matrixWorld.world.GL.gl.bindBuffer(_matrixWorld.world.GL.gl.ARRAY_BUFFER, object.vertexPositionBuffer);

    _matrixWorld.world.GL.gl.bufferData(_matrixWorld.world.GL.gl.ARRAY_BUFFER, object.geometry.vertices, _matrixWorld.world.GL.gl.STATIC_DRAW);
  } else {
    _matrixWorld.world.GL.gl.bindBuffer(_matrixWorld.world.GL.gl.ARRAY_BUFFER, object.vertexPositionBuffer); //ori without if dynamicBuffer

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
  }

  mat4.translate(object.mvMatrix, object.mvMatrix, object.position.worldLocation);
  mat4.rotate(object.mvMatrix, object.mvMatrix, degToRad(object.rotation.rx), object.rotation.getRotDirX());
  mat4.rotate(object.mvMatrix, object.mvMatrix, degToRad(object.rotation.ry), object.rotation.getRotDirY());
  mat4.rotate(object.mvMatrix, object.mvMatrix, degToRad(object.rotation.rz), object.rotation.getRotDirZ());
  if (raycaster.checkingProcedureCalc) raycaster.checkingProcedureCalc(object);

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
      if (document.getElementById('ambLight') && document.getElementById('ambLight').color) {
        _matrixWorld.world.GL.gl.uniform3f(object.shaderProgram.ambientColorUniform, parseFloat(document.getElementById('ambLight').color.rgb[0]), parseFloat(document.getElementById('ambLight').color.rgb[1]), parseFloat(document.getElementById('ambLight').color.rgb[2]));
      } else {
        _matrixWorld.world.GL.gl.uniform3f(object.shaderProgram.ambientColorUniform, object.LightsData.ambientLight.R(), object.LightsData.ambientLight.G(), object.LightsData.ambientLight.B());
      }
    }
    /* Directional light */


    if (object.shaderProgram.directionalColorUniform) {
      if (document.getElementById('dirLight') && document.getElementById('dirLight').color) {
        _matrixWorld.world.GL.gl.uniform3f(object.shaderProgram.directionalColorUniform, parseFloat(document.getElementById('dirLight').color.rgb[0]), parseFloat(document.getElementById('dirLight').color.rgb[1]), parseFloat(document.getElementById('dirLight').color.rgb[2]));
      } else {
        _matrixWorld.world.GL.gl.uniform3f(object.shaderProgram.directionalColorUniform, object.LightsData.directionLight.R(), object.LightsData.directionLight.G(), object.LightsData.directionLight.B());
      }
    }
    /* Normalize the direction */


    var lightingDirection = null;

    if (object.shaderProgram.lightingDirectionUniform) {
      if (document.getElementById('dirX') && document.getElementById('dirY') && document.getElementById('dirZ')) {
        lightingDirection = [parseFloat(document.getElementById('dirX').value), parseFloat(document.getElementById('dirY').value), parseFloat(document.getElementById('dirZ').value)];
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
  }

  mat4.translate(object.mvMatrix, object.mvMatrix, object.position.worldLocation);
  mat4.rotate(object.mvMatrix, object.mvMatrix, degToRad(object.rotation.rx), object.rotation.getRotDirX());
  mat4.rotate(object.mvMatrix, object.mvMatrix, degToRad(object.rotation.ry), object.rotation.getRotDirY());
  mat4.rotate(object.mvMatrix, object.mvMatrix, degToRad(object.rotation.rz), object.rotation.getRotDirZ()); // VERTEX

  if (object.vertexPositionBuffer) {
    _matrixWorld.world.GL.gl.bindBuffer(_matrixWorld.world.GL.gl.ARRAY_BUFFER, object.vertexPositionBuffer);

    if (object.geometry.dynamicBuffer == true) {
      _matrixWorld.world.GL.gl.bufferData(_matrixWorld.world.GL.gl.ARRAY_BUFFER, object.geometry.vertices, _matrixWorld.world.GL.gl.STATIC_DRAW);
    }

    _matrixWorld.world.GL.gl.vertexAttribPointer(object.shaderProgram.vertexPositionAttribute, object.vertexPositionBuffer.itemSize, _matrixWorld.world.GL.gl.FLOAT, false, 0, 0);

    _matrixWorld.world.GL.gl.enableVertexAttribArray(object.shaderProgram.vertexPositionAttribute);

    localLooper = localLooper + 1;
  } // COLOR


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
    /* Ambient light - posible deplaced */


    if (object.shaderProgram.ambientColorUniform) {
      if (document.getElementById('ambLight') && document.getElementById('ambLight').color) {
        _matrixWorld.world.GL.gl.uniform3f(object.shaderProgram.ambientColorUniform, parseFloat(document.getElementById('ambLight').color.rgb[0]), parseFloat(document.getElementById('ambLight').color.rgb[1]), parseFloat(document.getElementById('ambLight').color.rgb[2]));
      } else {
        _matrixWorld.world.GL.gl.uniform3f(object.shaderProgram.ambientColorUniform, object.LightsData.ambientLight.r, object.LightsData.ambientLight.g, object.LightsData.ambientLight.b);
      }
    }
    /* Directional light */


    if (object.shaderProgram.directionalColorUniform) {
      if (document.getElementById('dirLight') && document.getElementById('dirLight').color) {
        _matrixWorld.world.GL.gl.uniform3f(object.shaderProgram.directionalColorUniform, parseFloat(document.getElementById('dirLight').color.rgb[0]), parseFloat(document.getElementById('dirLight').color.rgb[1]), parseFloat(document.getElementById('dirLight').color.rgb[2]));
      } else {
        _matrixWorld.world.GL.gl.uniform3f(object.shaderProgram.directionalColorUniform, object.LightsData.directionLight.R(), object.LightsData.directionLight.G(), object.LightsData.directionLight.B());
      }
    }
    /* Normalize the direction */


    var lightingDirection = null;

    if (object.shaderProgram.lightingDirectionUniform) {
      if (document.getElementById('dirX') && document.getElementById('dirY') && document.getElementById('dirZ')) {
        lightingDirection = [parseFloat(document.getElementById('dirX').value), parseFloat(document.getElementById('dirY').value), parseFloat(document.getElementById('dirZ').value)];
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
  } // TEXTURE


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
  }

  mat4.translate(object.mvMatrix, object.mvMatrix, object.position.worldLocation);
  mat4.rotate(object.mvMatrix, object.mvMatrix, degToRad(object.rotation.rx), object.rotation.getRotDirX());
  mat4.rotate(object.mvMatrix, object.mvMatrix, degToRad(object.rotation.ry), object.rotation.getRotDirY());
  mat4.rotate(object.mvMatrix, object.mvMatrix, degToRad(object.rotation.rz), object.rotation.getRotDirZ()); // VERTEX

  if (object.vertexPositionBuffer) {
    _matrixWorld.world.GL.gl.bindBuffer(_matrixWorld.world.GL.gl.ARRAY_BUFFER, object.vertexPositionBuffer);

    if (object.geometry.dynamicBuffer == true) {
      _matrixWorld.world.GL.gl.bufferData(_matrixWorld.world.GL.gl.ARRAY_BUFFER, object.geometry.vertices, _matrixWorld.world.GL.gl.STATIC_DRAW);
    }

    _matrixWorld.world.GL.gl.vertexAttribPointer(object.shaderProgram.vertexPositionAttribute, object.vertexPositionBuffer.itemSize, _matrixWorld.world.GL.gl.FLOAT, false, 0, 0);

    _matrixWorld.world.GL.gl.enableVertexAttribArray(object.shaderProgram.vertexPositionAttribute);

    localLooper = localLooper + 1;
  } // COLOR


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
      if (document.getElementById('ambLight') && document.getElementById('ambLight').color) {
        _matrixWorld.world.GL.gl.uniform3f(object.shaderProgram.ambientColorUniform, parseFloat(document.getElementById('ambLight').color.rgb[0]), parseFloat(document.getElementById('ambLight').color.rgb[1]), parseFloat(document.getElementById('ambLight').color.rgb[2]));
      } else {
        //object.LightsData.ambientLight
        _matrixWorld.world.GL.gl.uniform3f(object.shaderProgram.ambientColorUniform, object.LightsData.ambientLight.r, object.LightsData.ambientLight.g, object.LightsData.ambientLight.b);
      }
    }
    /* Set the directional light */


    if (object.shaderProgram.directionalColorUniform) {
      if (document.getElementById('dirLight') && document.getElementById('dirLight').color) {
        _matrixWorld.world.GL.gl.uniform3f(object.shaderProgram.directionalColorUniform, parseFloat(document.getElementById('dirLight').color.rgb[0]), parseFloat(document.getElementById('dirLight').color.rgb[1]), parseFloat(document.getElementById('dirLight').color.rgb[2]));
      } else {
        //object.LightsData.lightingDirection
        _matrixWorld.world.GL.gl.uniform3f(object.shaderProgram.directionalColorUniform, object.LightsData.directionLight.R(), object.LightsData.directionLight.G(), object.LightsData.directionLight.B());
      }
    }
    /* Normalize the direction */


    var lightingDirection = null;

    if (object.shaderProgram.lightingDirectionUniform) {
      if (document.getElementById('dirX') && document.getElementById('dirY') && document.getElementById('dirZ')) {
        lightingDirection = [parseFloat(document.getElementById('dirX').value), parseFloat(document.getElementById('dirY').value), parseFloat(document.getElementById('dirZ').value)];
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
  } // TEXTURES


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

  _matrixWorld.world.GL.gl.bindBuffer(_matrixWorld.world.GL.gl.ELEMENT_ARRAY_BUFFER, object.vertexIndexBuffer); // world.setMatrixUniforms(object,this.pMatrix,object.mvMatrix);


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

  _matrixWorld.world.disableUnusedAttr(_matrixWorld.world.GL.gl, localLooper); // world.disableUnusedAttr( world.GL.gl, 3 );


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

  _matrixWorld.world.setMatrixUniforms(object, this.pMatrix, object.mvMatrix);

  _matrixWorld.world.GL.gl.drawElements(_matrixWorld.world.GL.gl[object.glDrawElements.mode], object.glDrawElements.numberOfIndicesRender, _matrixWorld.world.GL.gl.UNSIGNED_SHORT, 0);

  object.instancedDraws.overrideDrawArraysInstance(object);
  this.mvPopMatrix(object.mvMatrix, this.mvMatrixStack);
};

var drawsOperation = _manifest.default.operation.draws;
var _default = drawsOperation;
exports.default = _default;

},{"../program/manifest":16,"./events":5,"./matrix-world":12,"./raycast":13}],9:[function(require,module,exports){
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
        return new Float32Array([// Front face
        0.0, 0.0, 1.0, 1, 0.0, 0.0, 1.0, 1, 0.0, 0.0, 1.0, 1, 0.0, 0.0, 1.0, 1, // Back face
        0.0, 0.0, -1.0, 1, 0.0, 0.0, -1.0, 1, 0.0, 0.0, -1.0, 1, 0.0, 0.0, -1.0, 1, // Top face
        0.0, 1.0, 0.0, 1, 0.0, 1.0, 0.0, 1, 0.0, 1.0, 0.0, 1, 0.0, 1.0, 0.0, 1, // Bottom face
        0.0, -1.0, 0.0, 1, 0.0, -1.0, 0.0, 1, 0.0, -1.0, 0.0, 1, 0.0, -1.0, 0.0, 1, // Right face
        1.0, 0.0, 0.0, 1, 1.0, 0.0, 0.0, 1, 1.0, 0.0, 0.0, 1, 1.0, 0.0, 0.0, 1, // Left face
        -1.0, 0.0, 0.0, 1, -1.0, 0.0, 0.0, 1, -1.0, 0.0, 0.0, 1, -1.0, 0.0, 0.0, 1]);
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

},{"../program/manifest":16,"./utility":14}],10:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.callReDraw_ = exports.reDrawID = exports.animate = void 0;

var _manifest = _interopRequireDefault(require("../program/manifest"));

var _matrixWorld = require("./matrix-world");

var _engine = require("./engine");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable no-undef */

/* eslint-disable no-unused-vars */

/* global */
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

_manifest.default.operation.reDrawGlobal = function () {
  (0, _engine.modifyLooper)(0);
  exports.reDrawID = reDrawID = requestAnimationFrame(_matrixWorld.reDraw);

  _matrixWorld.world.renderPerspective();

  for (var t = 0; t < _manifest.default.updateBeforeDraw.length; t++) {
    _manifest.default.updateBeforeDraw[t].UPDATE();
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
  } // setTimeout(App.operation.reDrawGlobal , 20 )


  (0, _engine.updateFPS)(1);
};

_manifest.default.operation.CameraPerspective = function () {
  this.GL.gl.viewport(0, 0, canvas.width, canvas.height);
  this.GL.gl.clear(this.GL.gl.COLOR_BUFFER_BIT | this.GL.gl.DEPTH_BUFFER_BIT); // mat4.identity( world.mvMatrix )
  // mat4.translate(world.mvMatrix  , world.mvMatrix, [ 10 , 10 , 10] );

  /* Field of view, Width height ratio, min distance of viewpoint, max distance of viewpoint, */

  mat4.perspective(this.pMatrix, degToRad(_manifest.default.camera.viewAngle), this.GL.gl.viewportWidth / this.GL.gl.viewportHeight, _manifest.default.camera.nearViewpoint, _manifest.default.camera.farViewpoint);
};

var callReDraw_ = function () {
  requestAnimationFrame(_matrixWorld.reDraw);
};

exports.callReDraw_ = callReDraw_;

},{"../program/manifest":16,"./engine":4,"./matrix-world":12}],11:[function(require,module,exports){
/* globals App world */
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _manifest = _interopRequireDefault(require("../program/manifest"));

var _matrixWorld = require("./matrix-world");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// initTextures
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
/*
  App.tools.loadTextureBasic = function (imagePath , name ) {
  var name_ = name;
  loadImage(imagePath, function(image) {
  // -- Init 2D Texture

  App.textures[name_] =gl.createTexture();
  gl.activeTexture(gl.TEXTURE0);
  gl.bindTexture(gl.TEXTURE_2D, App.textures[name_]);
  //gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false);
  //gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
  //gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
  //gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  //gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

  // -- Allocate storage for the texture
  gl.texStorage2D(gl.TEXTURE_2D, 1, gl.RGB8, 512, 512);
  gl.texSubImage2D(gl.TEXTURE_2D, 0, 0, 0, gl.RGB, gl.UNSIGNED_BYTE, image);
  gl.generateMipmap(gl.TEXTURE_2D);
  });
  }
*/


var _default = _manifest.default.textools;
exports.default = _default;

},{"../program/manifest":16,"./matrix-world":12}],12:[function(require,module,exports){
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

var _utility = require("./utility");

var _matrixGeometry = require("./matrix-geometry");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable no-unused-vars */

/* Width and Height variables of the browser screen  */
var frames = 0;
exports.frames = frames;

function modifyFrames(newFrames) {
  exports.frames = frames = newFrames;
}

var world = {};
exports.world = world;
var updateFrames = 0;
/* Because JavaScript is third class in mouse events */
// var mouseLoc   = defineMouseLocationObject();

/* Common sense to object disposition                */

var objListToDispose = new Array();
/* Need to stop the redraw when disposing            */
// var reDrawID = 0;

exports.objListToDispose = objListToDispose;
var reDraw = null;
/* Need an iterator in many places                   */
// var looper = 0;

exports.reDraw = reDraw;

function defineworld(canvas) {
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
      triangleObject.glBlend = new _utility._glBlend();
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
      squareObject.glBlend = new _utility._glBlend();
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
      squareObject.glBlend = new _utility._glBlend();
      squareObject.LightsData = {
        directionLight: new _matrixGeometry.COLOR(1, 1, 1),
        ambientLight: new _matrixGeometry.COLOR(1, 1, 1),
        lightingDirection: new _matrixGeometry.COLOR(1, 1, 0)
      };

      if (typeof texturesPaths !== 'undefined') {
        if (typeof texturesPaths == 'string') {
          //alert('path is string')
          squareObject.texture = this.initTexture(this.GL.gl, texturesPaths);
          squareObject.textures = [];
          squareObject.textures[0] = squareObject.texture;
        } else if (typeof texturesPaths == 'object') {
          // console.info("texturesPaths is object...");
          squareObject.textures = [];
          squareObject.texture = true; // cubeObject.shaderProgram = this.initShaders(this.GL.gl, filler+"-shader-fs", filler+"-shader-vs");

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
      cubeObject.color = true; // cubeObject.color = new GeoOfColor("square");

      cubeObject.mvMatrix = mat4.create();
      cubeObject.geometry = new _matrixGeometry.CubeVertex(cubeObject);
      cubeObject.instancedDraws = {
        numberOfInstance: 10,
        array_of_local_offset: [12, 0, 0],
        overrideDrawArraysInstance: function (object_) {}
      };
      cubeObject.glBlend = new _utility._glBlend();

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
        sphereObject.radius = mesh_.radius;
      } else {
        sphereObject.latitudeBands = 30;
        sphereObject.longitudeBands = 30;
        sphereObject.radius = 2;
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
      pyramidObject.geometry = new _matrixGeometry.PiramideVertex(pyramidObject);
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
    }

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
        cubeObject.name = 'cube_instance_' + Math.floor(Math.random() * 100000 + 1);
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
        lightingDirection: new _matrixGeometry.COLOR(1, 1, 0)
      };
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
      } else {// console.log("   Cube shader failure");
      }
    }

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
/* WebGL end of world                */

/*****************************************************/

},{"../program/manifest":16,"./engine":4,"./matrix-draws":8,"./matrix-geometry":9,"./matrix-render":10,"./utility":14}],13:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.rayIntersectsTriangle = rayIntersectsTriangle;
exports.unproject = unproject;
exports.checkingProcedure = checkingProcedure;
exports.checkingProcedureCalc = checkingProcedureCalc;
exports.touchCoordinate = void 0;

/**
 * Ray triangle intersection algorithm
 * 
 * @param rayOrigin ray origin point
 * @param rayVector ray direction
 * @param triangle three points of triangle, should be ccw order
 * @param out the intersection point
 * @return intersects or not
 * 
 * Uses Möller–Trumbore intersection algorithm
 */
console.log("test vec3 ", window.vec3);
let touchCoordinate = {
  enabled: false,
  x: 0,
  y: 0
}; // export let rayVectorPassing = vec3.fromValues( 0, 0, -1)
// window.rayVectorPassing = rayVectorPassing

exports.touchCoordinate = touchCoordinate;

function rayIntersectsTriangle(rayOrigin, // rayOrigin, // :vec3,
rayVector, // :vec3,
triangle, // :vec3[],
out, //:vec3,
objPos) // : boolean
{
  // rayOrigin =  vec3.fromValues(0, 0, -objPos.z + matrixEngine.Events.camera.zPos);
  rayOrigin[0] = matrixEngine.Events.camera.xPos;
  rayOrigin[1] = matrixEngine.Events.camera.yPos;
  rayOrigin[2] = matrixEngine.Events.camera.zPos + -objPos.z; // rayOrigin =  vec3.fromValues(0, 0, -objPos.z + matrixEngine.Events.camera.zPos);
  // rayVector = vec3.fromValues(0, 1, -1);
  // rayVector = rayVectorPassing;

  console.log(rayOrigin);
  console.log(rayVector);
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
viewport, //:[number, number, number, number],
invProjection, // :mat4,
invView) //:mat4,
// : vec3 
{
  const [left, top, width, height] = viewport;
  const [x, y] = screenCoord;
  var x1 = x / width * 2 - 1;
  var y1 = y / height * 2 - 1; //rayVectorPassing[0] =  (2 * x) / width - 1 - left;
  //rayVectorPassing[1] =  (2 * (height - y - 1)) / height - 1;

  const out = vec4.fromValues(2 * x / width - 1 - left, 2 * (height - y - 1) / height - 1, 1, 1);
  vec4.transformMat4(out, out, invProjection);
  out[3] = 0;
  vec4.transformMat4(out, out, invView);
  return vec3.normalize(vec3.create(), out);
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
  var mvMatrix = object.mvMatrix;
  if (touchCoordinate.enabled == false) return;
  if (touchCoordinate.enabled == true) touchCoordinate.enabled = false;
  var outp = mat4.create();
  var outv = mat4.create();
  const ray = unproject([touchCoordinate.x, touchCoordinate.y], [0, 0, touchCoordinate.w, touchCoordinate.h], // world.pMatrix, // your invert projection matrix
  // mvMatrix // your invert view matrix
  mat4.invert(outp, world.pMatrix), // your invert projection matrix
  mat4.invert(outv, mvMatrix) //your invert view matrix
  );
  const intersectionPoint = vec3.create();
  /* const triangle = [ //example triangle
    vec3.fromValues(-1, -1, 0),
    vec3.fromValues(1, 1, 0),
    vec3.fromValues(-1, 1, 0),
  ]; */

  const triangle = [[App.scene.MyColoredTriangle1.geometry.vertices[0], App.scene.MyColoredTriangle1.geometry.vertices[1], App.scene.MyColoredTriangle1.geometry.vertices[2]], [App.scene.MyColoredTriangle1.geometry.vertices[3], App.scene.MyColoredTriangle1.geometry.vertices[4], App.scene.MyColoredTriangle1.geometry.vertices[5]], [App.scene.MyColoredTriangle1.geometry.vertices[6], App.scene.MyColoredTriangle1.geometry.vertices[7], App.scene.MyColoredTriangle1.geometry.vertices[8]]];

  if (rayIntersectsTriangle(vec3.fromValues(matrixEngine.Events.camera.xPos, matrixEngine.Events.camera.yPos, matrixEngine.Events.camera.zPos), // your camera position - rayOrigin
  ray, triangle, intersectionPoint, object.position)) {
    console.log('hits', intersectionPoint);
    matrixEngine.utility.E('debugBox').style.background = 'red';
  } else {
    matrixEngine.utility.E('debugBox').style.background = 'green';
  }
}

},{}],14:[function(require,module,exports){
/* eslint-disable no-unused-vars */

/* eslint-disable no-undef */
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LOG = LOG;
exports.OSCILLATOR = OSCILLATOR;
exports.SWITCHER = SWITCHER;
exports.RandomFloat = RandomFloat;
exports.randomIntFromTo = randomIntFromTo;
exports._glBlend = _glBlend;
exports._DrawElements = _DrawElements;
exports._glTexParameteri = _glTexParameteri;
exports.BiquadFilterType = exports.ENUMERATORS = exports.QueryString = exports.E = exports.scriptManager = exports.loadImage = void 0;

var _manifest = _interopRequireDefault(require("../program/manifest"));

var _events = require("./events");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @description
 * Global modifier for:
 * degToRed, DETECTBROWSER, loadImage
 */
window.degToRad = function (degrees) {
  return degrees * Math.PI / 180;
};

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
  SINHRO_LOAD: {},
  LOAD: function addScript(src) {
    var s = document.createElement('script');

    s.onload = function () {
      SCRIPT.SCRIPT_ID++;
      console.log('Script id loaded : ' + SCRIPT.SCRIPT_ID + ' with src: ' + this.src);
      var filename = this.src.substring(this.src.lastIndexOf('/') + 1, this.src.lastIndexOf('.'));
      filename = filename.replace('.', '_'); // eval("try{SCRIPT.SINHRO_LOAD._" + filename + "(s)}catch(e){}");
    };

    s.setAttribute('src', src);
    document.body.appendChild(s);
  },
  loadModule: function addScript(src) {
    console.log('Script id load called ');
    var s = document.createElement('script');

    s.onload = function () {
      scriptManager.SCRIPT_ID++;
    };

    s.setAttribute('type', 'module');
    s.setAttribute('src', src);
    document.body.appendChild(s);
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

var E = function (id) {
  return document.getElementById(id);
};

exports.E = E;

function RandomFloat(min, max) {
  highlightedNumber = Math.random() * (max - min) + min;
  return highlightedNumber;
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

},{"../program/manifest":16,"./events":5}],15:[function(require,module,exports){
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

},{}],16:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/* eslint-disable no-unused-vars */
var App = {
  name: "Matrix engine Manifest",
  version: "1.0.5",
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
    speedAmp: 0.5
  },
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
    maxTexturesInFragmentShader: null
  },
  updateBeforeDraw: [],
  audioSystem: {},
  pwa: {
    addToHomePage: true
  },
  ready: false,
  onload: function () {}
};
var _default = App;
exports.default = _default;

},{}]},{},[1]);
