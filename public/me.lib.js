(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/**
 * @description
 * ClientConfig is config file for client part of networking.
 */
class ClientConfig {
  // Not implemented yet
  // Free to define what ever -> injectCanvas
  recordCanvasOption = {
    injectCanvas: () => document.getElementsByTagName("canvas")[0],
    frameRequestRate: 30,
    videoDuration: 20,
    outputFilename: "record-gameplay.mp4",
    mineType: "video/mp4",
    resolutions: '800x600'
  };

  /**
   * @description
   * Default setup is `dev`.
   * recommendent to use for local propose LAN ip
   * like : 192.168.0.XXX if you wanna run ant test app with server.
   */
  domain = "maximumroulette.com";
  // domain = "localhost";

  /**
   * @description Important note for this property: if you
   * disable (false) you can't use Account system or any other
   * network. Use 'false' if you wanna make single player game.
   * In other way keep it 'true'.
   * 
   * @note [OLD]
   */
  showBroadcasterOnInt = false;

  /**
   * networkDeepLogs control of dev logs for webRTC context only.
   *  @note [OLD]
   */
  networkDeepLogs = false;

  /**
   * masterServerKey is channel access id used to connect
   * multimedia server channel/multiRTC3
   */
  masterServerKey = "maximumroulette.matrix-engine";

  /**
   * @description
   * runBroadcasterOnInt load broadcaster
   * 
   * 	 * @note [OLD]
   * 
   */
  runBroadcasterOnInt = false;
  broadcastAutoConnect = false;

  /**
   * @description
   * broadcasterPort Port used to connect multimedia server MultiRTC3.
   * I will use it for explicit video chat multiplatform support.
   * Default value is 999
   * 
   * @note [OLD]
   * 
   */
  broadcasterPort = 999;

  /**
   * @description
   * broadcaster rtc session init values.
   * Change it for production regime
   * 
   * @note [OLD]
   */
  broadcasterSessionDefaults = {
    sessionAudio: true,
    sessionVideo: false,
    sessionData: true,
    enableFileSharing: true
  };

  /**
   * @description
   * Optimal for dev stage.
   * read more about webRtc protocols.
   * Recommended: coturn open source project.
   * 
   * @note [OLD]
   * When you run your OV there is coturn already fixed.
   */
  stunList = ["stun:stun.l.google.com:19302", "stun:stun1.l.google.com:19302", "stun:stun.l.google.com:19302?transport=udp"];

  /**
   * New networking platform
   * Based on kurento/Ov media server
   */
  networking2 = {
    active: true,
    domain: 'maximumroulette.com',
    port: 2020
  };

  /**
   * @description
   * constructor will save interest data for game platform
   * For now it is just name of the game. I use it in
   * pre gameplay UI game selector.
   */
  constructor() {}
  getRecordCanvasOptions() {
    return this.recordCanvasOption;
  }
  getRunBroadcasterOnInt() {
    return this.runBroadcasterOnInt;
  }
  didAppUseBroadcast() {
    return this.appUseBroadcaster;
  }
  getStunList() {
    return this.stunList;
  }
  getBroadcastSockRoute() {
    return this.getProtocolFromAddressBar() + this.getDomain() + ":" + this.broadcasterPort + "/";
  }
  getDomain() {
    // localhost vs prodc domain not works CORS not equal!
    if (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1") {
      return window.location.hostname;
    }
    return this.domain;
  }
  getBroadcastAutoConnect() {
    return this.broadcastAutoConnect;
  }
  getShowBroadcasterOnInt() {
    return this.showBroadcasterOnInt;
  }
  getBroadcasterPort() {
    return this.broadcasterPort;
  }
  getBroadcasterSessionDefaults() {
    return this.broadcasterSessionDefaults;
  }
  getProtocolFromAddressBar() {
    return location.protocol === "https:" ? "https://" : "http://";
  }
  setNetworkDeepLog(newState) {
    this.networkDeepLogs = newState;
  }
  getNetworkDeepLog() {
    return this.networkDeepLogs;
  }

  // Used for both net variant
  getMasterServerKey() {
    return this.masterServerKey;
  }
}
var _default = exports.default = ClientConfig;

},{}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var matrixEngine = _interopRequireWildcard(require("./index.js"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
/**
 * Perfect for codepen and similar services.
 */

window.matrixEngine = matrixEngine;
var world;
var App = matrixEngine.App;
var _default = exports.default = matrixEngine;

},{"./index.js":3}],3:[function(require,module,exports){
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
exports.Events = exports.Engine = void 0;
Object.defineProperty(exports, "MEBvhAnimation", {
  enumerable: true,
  get: function () {
    return _matrixBvh.default;
  }
});
Object.defineProperty(exports, "defineShader", {
  enumerable: true,
  get: function () {
    return _buildinMyShaders.defineShader;
  }
});
Object.defineProperty(exports, "freeShadersToy", {
  enumerable: true,
  get: function () {
    return _buildinShaders.freeShadersToy;
  }
});
exports.objLoader = exports.matrixWorld = exports.matrixRender = exports.matrixGeometry = void 0;
Object.defineProperty(exports, "operation", {
  enumerable: true,
  get: function () {
    return _matrixBuffers.default;
  }
});
exports.raycaster = void 0;
Object.defineProperty(exports, "standardMEShaderDrawer", {
  enumerable: true,
  get: function () {
    return _buildinShaders.standardMEShaderDrawer;
  }
});
Object.defineProperty(exports, "texTools", {
  enumerable: true,
  get: function () {
    return _matrixTextures.default;
  }
});
Object.defineProperty(exports, "toyShaderHeader", {
  enumerable: true,
  get: function () {
    return _buildinShaders.toyShaderHeader;
  }
});
exports.utility = void 0;
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
var _buildinShaders = require("./lib/optimizer/buildin-shaders");
var _buildinMyShaders = require("./lib/optimizer/buildin-my-shaders");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }

},{"./lib/engine":4,"./lib/events":5,"./lib/loader-obj":6,"./lib/matrix-buffers":7,"./lib/matrix-bvh":8,"./lib/matrix-geometry":10,"./lib/matrix-render":13,"./lib/matrix-textures":18,"./lib/matrix-world":19,"./lib/optimizer/buildin-my-shaders":21,"./lib/optimizer/buildin-shaders":22,"./lib/raycast":25,"./lib/utility":31,"./program/manifest":42}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ACCESS_CAMERA = ACCESS_CAMERA;
exports.DOM_VT = DOM_VT;
exports.RegenerateShader = exports.RegenerateCustomShader = exports.RegenerateCubeMapShader = void 0;
exports.SET_STREAM = SET_STREAM;
exports.VIDEO_TEXTURE = VIDEO_TEXTURE;
exports.VT = VT;
exports.Vjs3 = Vjs3;
exports.activateNet2 = exports.activateNet = void 0;
exports.anyCanvas = anyCanvas;
exports.defineWebGLWorld = defineWebGLWorld;
exports.degToRad = degToRad;
exports.drawCanvas = drawCanvas;
exports.ht = void 0;
exports.initApp = initApp;
exports.initShaders = initShaders;
exports.initiateFPS = initiateFPS;
exports.isReady = isReady;
exports.lastTime = void 0;
exports.loadHtmlPowerAsset = loadHtmlPowerAsset;
exports.loadShaders = loadShaders;
exports.load_shaders = load_shaders;
exports.looper = void 0;
exports.modifyLooper = modifyLooper;
exports.net = void 0;
exports.onExit = onExit;
exports.resizeView = resizeView;
exports.totalTime = void 0;
exports.updateFPS = updateFPS;
exports.webcamError = exports.wd = exports.updateTime = exports.updateFrames = void 0;
var _net = require("./net");
var _events = require("./events");
var _manifest = _interopRequireDefault(require("../program/manifest"));
var _utility = require("./utility");
var _webglUtils = require("./webgl-utils");
var _matrixRender = require("./matrix-render");
var _matrixWorld = require("./matrix-world");
var _matrixShaders = require("./matrix-shaders3");
var _matrixShaders2 = require("./matrix-shaders1");
var _clientConfig = _interopRequireDefault(require("../client-config"));
var _sounds = require("./sounds");
var _app = require("../networking2/app");
var _matrixStream = require("../networking2/matrix-stream");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
if (_manifest.default.offScreenCanvas == true || _utility.QueryString.offScreen == 'true') {
  _manifest.default.offScreenCanvas = true;
  console.log('[matrix-engine] offScreenCanvas activated =>', _manifest.default.offScreenCanvas);
  _utility.scriptManager.LOAD('./hacker-timer/hack-timer.js');
} else {
  _manifest.default.offScreenCanvas = false;
}
var wd = exports.wd = 0,
  ht = exports.ht = 0,
  lastTime = exports.lastTime = 0,
  totalTime = exports.totalTime = 0,
  updateTime = exports.updateTime = 0,
  updateFrames = exports.updateFrames = 0;
let net = exports.net = null;
let looper = exports.looper = 0;
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
let activateNet = CustomConfig => {
  if (typeof _manifest.default.net !== 'undefined' && _manifest.default.net === true) {
    if (typeof CustomConfig !== 'undefined') {
      var t = new CustomConfig();
    } else {
      var t = new _clientConfig.default();
    }
    exports.net = net = new _net.Broadcaster(t);
    _manifest.default.network = net;
    console.info('Networking is active.', net);
  }
};
exports.activateNet = activateNet;
let activateNet2 = (CustomConfig, sessionOption) => {
  if (typeof _manifest.default.net !== 'undefined' && _manifest.default.net === true) {
    if (typeof CustomConfig !== 'undefined') {
      var t = new CustomConfig();
    } else {
      var t = new _clientConfig.default();
    }

    // -----------------------
    // Make run
    // -----------------------
    if (typeof sessionOption === 'undefined') {
      sessionOption.sessionName = 'matrix-engine-random';
      sessionOption.resolution = '160x240';
    }
    exports.net = net = new _app.MatrixStream({
      domain: t.networking2.domain,
      port: t.networking2.port,
      sessionName: sessionOption.sessionName,
      resolution: sessionOption.resolution
    });
    addEventListener(`onTitle`, e => {
      document.title = e.detail;
    });
    // remove at the end
    window.matrixStream = net;
    console.info(`%c Networking2 params: ${t.networking2}`, _matrixWorld.CS3);
  }
};
exports.activateNet2 = activateNet2;
function initApp(callback) {
  resizeView();
  drawCanvas();
  _manifest.default.canvas = document.getElementById('canvas');
  if (_manifest.default.events == true) {
    _manifest.default.events = new _events.EVENTS((0, _utility.E)('canvas'));
  }
  if (_manifest.default.sounds == true) {
    _manifest.default.sounds = new _sounds.MatrixSounds();
  }
  if (typeof callback !== 'undefined') {
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
        console.warn('Something went wrong on shaders load procces! => ', href);
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
      document.getElementById('media-holder').innerHTML = this.responseText;
      if (typeof callback !== 'undefined') {
        callback();
      }
    } else {
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
 * Base environment property for totality of WEBGL.
 */
function defineWebGLWorld(cavnas) {
  var world = new Object();
  try {
    var gl = _webglUtils.WebGLUtils.setupWebGL(canvas);
    gl.viewportWidth = canvas.width;
    gl.viewportHeight = canvas.height;
    world.gl = gl;
    const available_extensions = gl.getSupportedExtensions();
    const test_depth_texture = gl.getExtension('WEBGL_depth_texture');
    if (!test_depth_texture) {
      // console.warn('No support for WEBGL_depth_texture [opengles1.1] !', ext);
    }
    // console.info("WEBGL base pocket: SUCCESS , Lets see list of ext : ", available_extensions);

    const extTFAnisotropic = gl.getExtension('EXT_texture_filter_anisotropic') || gl.getExtension('MOZ_EXT_texture_filter_anisotropic') || gl.getExtension('WEBKIT_EXT_texture_filter_anisotropic');
    if (extTFAnisotropic) {
      const max = gl.getParameter(extTFAnisotropic.MAX_TEXTURE_MAX_ANISOTROPY_EXT);
      world.MAX_TEXTURE_MAX_ANISOTROPY_EXT = max;
      // gl.texParameterf(gl.TEXTURE_2D, extTFAnisotropic.TEXTURE_MAX_ANISOTROPY_EXT, world.MAX_TEXTURE_MAX_ANISOTROPY_EXT);
      world.extTFAnisotropic = extTFAnisotropic;
    }
  } catch (e) {
    console.error("Exception in WEBGL base pocket: " + e);
  }
  /* Destructor */
  world.destroy = function () {
    delete this.gl;
    delete this;
  };
  return world;
}
function updateFPS(elements) {
  // console.log(" Update FPS");
  var now = new Date().getTime();
  var delta = now - lastTime;
  exports.lastTime = lastTime = now;
  exports.totalTime = totalTime = totalTime + delta;
  exports.updateTime = updateTime = updateTime + delta;

  // eslint-disable-next-line no-global-assign
  (0, _matrixWorld.modifyFrames)(_matrixWorld.frames + 1);
  exports.updateFrames = updateFrames = updateFrames + 1;
  if (1000 < updateTime) {
    document.getElementById('fps').innerHTML = `FPS AVG:` + Math.floor(1000 * _matrixWorld.frames / totalTime / elements) + ` CUR:` + Math.floor(1000 * updateFrames / updateTime / elements);
    exports.updateTime = updateTime = 0;
    exports.updateFrames = updateFrames = 0;
  }
}
function drawCanvas() {
  // console.log("Init the canvas...");
  var canvas = document.createElement('canvas');
  canvas.id = 'canvas';
  if (_manifest.default.resize.canvas == 'full-screen') {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    // SYS.DEBUG.LOG('SYS: fullscreen diametric resize is active. ');
  } else {
    canvas.width = window.innerHeight * _manifest.default.resize.aspectRatio;
    canvas.height = window.innerHeight;
    _events.SYS.DEBUG.LOG('SYS: aspect ration resize is active. ');
  }
  document.body.append(canvas);
}

// Degree to Radian converter 
function degToRad(degrees) {
  return degrees * Math.PI / 180;
}
;

// One time initiation of FPS to store initial time 
function initiateFPS() {
  exports.lastTime = lastTime = new Date().getTime();
}

// Help the browser Garbage collect
window.onbeforeunload = onExit;

// Provides cancelRequestAnimFrame in a cross browser way.
window.cancelRequestAnimFrame = function () {
  return window.cancelAnimationFrame || window.webkitCancelRequestAnimationFrame || window.mozCancelRequestAnimationFrame || window.oCancelRequestAnimationFrame || window.msCancelRequestAnimationFrame || function (callback) {
    window.clearTimeout(callback);
  };
}();

// Dispose off the dangling objects
function onExit() {
  exports.looper = looper = 0;
  while (looper <= _matrixWorld.objListToDispose.length - 1) {
    _matrixWorld.objListToDispose[looper].destroy();
    exports.looper = looper = looper + 1;
  }
  _matrixWorld.objListToDispose.length = 0;
}
_manifest.default.operation.destroyWorld = function () {
  // console.log("Destroy at iteration:" + reDrawID);
  cancelRequestAnimFrame(_matrixRender.reDrawID);
  delete this.pMatrix;
  delete this.mvMatrixStack;
  exports.looper = looper = 0;
  while (looper <= this.contentList.length - 1) {
    // console.log("Destroying: " + this.contentList[looper].type);
    delete this.contentList[looper].type;
    delete this.contentList[looper].size;
    delete this.contentList[looper].sides;
    /* Dispose the shaders */
    if (this.contentList[looper].shaderProgram.fragmentShader) {
      this.GL.gl.deleteShader(this.contentList[looper].shaderProgram.fragmentShader);
      delete this.contentList[looper].shaderProgram.fragmentShader;
    }
    if (this.contentList[looper].shaderProgram.vertexShader) {
      this.GL.gl.deleteShader(this.contentList[looper].shaderProgram.vertexShader);
      delete this.contentList[looper].shaderProgram.vertexShader;
    }

    /* Dispose the texture */
    if (this.contentList[looper].texture) {
      try {
        this.GL.gl.deleteTexture(this.contentList[looper].texture);
      } catch (e) {
        console.warn('Problem in destroying function : This is e log : ' + e);
      }
      delete this.contentList[looper].texture;
    }

    /* Dispose the program */
    if (this.contentList[looper].shaderProgram) {
      this.GL.gl.deleteProgram(this.contentList[looper].shaderProgram);
      delete this.contentList[looper].shaderProgram;
    }
    /* Empty the buffers */
    if (this.contentList[looper].vertexPositionBuffer) {
      this.GL.gl.deleteBuffer(this.contentList[looper].vertexPositionBuffer);
      delete this.contentList[looper].vertexPositionBuffer;
    }
    if (this.contentList[looper].vertexTexCoordBuffer) {
      this.GL.gl.deleteBuffer(this.contentList[looper].vertexTexCoordBuffer);
      delete this.contentList[looper].vertexTexCoordBuffer;
    }
    if (this.contentList[looper].vertexColorBuffer) {
      this.GL.gl.deleteBuffer(this.contentList[looper].vertexColorBuffer);
      delete this.contentList[looper].vertexColorBuffer;
    }
    if (this.contentList[looper].vertexIndexBuffer) {
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
  delete this;
};
function loadShaders(gl, id) {
  // console.log("Creating Shader:" + id);
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
      return shader;
    } else {
      console.warn('Shader Program compile failed:' + gl.getShaderInfoLog(shader));
      console.warn('Shader Program name :' + id);
      return 0;
    }
  } else {
    console.warn('Shader Program creation failed', gl.getShaderInfoLog(shader));
    return 0;
  }
}
function initShaders(gl, fragment, vertex) {
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
      if (null !== gl.getUniformLocation(shaderProgram, 'iResolution')) {
        // toy adaptatino iResolution indicator
        shaderProgram.positionAttributeLocation = gl.getAttribLocation(shaderProgram, "a_position");
        shaderProgram.resolutionLocation = gl.getUniformLocation(shaderProgram, "iResolution");
        shaderProgram.mouseLocation = gl.getUniformLocation(shaderProgram, "iMouse");
        shaderProgram.timeLocation = gl.getUniformLocation(shaderProgram, "iTime");
      } else {
        // console.log('adaptation initshaders for toyshaders. UNDEFINED')
      }

      // matrixSkyRad
      if (null !== gl.getUniformLocation(shaderProgram, 'matrixSkyRad')) {
        shaderProgram.matrixSkyRad = gl.getUniformLocation(shaderProgram, "matrixSkyRad");
      }
      shaderProgram.pMatrixUniform = gl.getUniformLocation(shaderProgram, 'uPMatrix');
      shaderProgram.mvMatrixUniform = gl.getUniformLocation(shaderProgram, 'uMVMatrix');

      /* For destroying properly            */
      shaderProgram.fragmentShader = fragmentShader;
      shaderProgram.vertexShader = vertexShader;
      return shaderProgram;
    } else {
      console.warn('Returning Shader fragment failed! \n ', gl.getProgramInfoLog(shaderProgram));
      return 0;
    }
  }
}
// END OF SHADERS

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
};
var RegenerateShader = function (id_elem, numOfSamplerInUse, mixOperand, lightType) {
  var e = document.getElementById(id_elem);
  if (mixOperand == 'multiply') {
    mixOperand = 0;
  } else if (mixOperand == 'divide') {
    mixOperand = 1;
  }
  if (_manifest.default.openglesShaderVersion == 1.3) {
    // console.log('RegenerateShader 300 => ', lightType)
    e.innerHTML = (0, _matrixShaders.generateShaderSrc3)(numOfSamplerInUse, mixOperand, lightType);
  } else {
    // console.warn('RegenerateShader 2 => ', lightType)
    e.innerHTML = (0, _matrixShaders2.generateShaderSrc)(numOfSamplerInUse, mixOperand, lightType);
  }
};
exports.RegenerateShader = RegenerateShader;
var RegenerateCubeMapShader = function (id_elem, numOfSamplerInUse, mixOperand, lightType) {
  var e = document.getElementById(id_elem);
  if (mixOperand == 'multiply') {
    mixOperand = 0;
  } else if (mixOperand == 'divide') {
    mixOperand = 1;
  }
  if (_manifest.default.openglesShaderVersion == 1.3) {
    e.innerHTML = (0, _matrixShaders.generateCubeMapShaderSrc3)(numOfSamplerInUse, mixOperand, lightType);
  } else {
    e.innerHTML = (0, _matrixShaders2.generateCubeMapShaderSrc1)(numOfSamplerInUse, mixOperand);
  }
};
exports.RegenerateCubeMapShader = RegenerateCubeMapShader;
var RegenerateCustomShader = function (id_elem, numOfSamplerInUse, mixOperand, code_) {
  var e = document.getElementById(id_elem);
  if (mixOperand == 'multiply') {
    mixOperand = 0;
  } else if (mixOperand == 'divide') {
    mixOperand = 1;
  }
  e.innerHTML = (0, _matrixShaders.generateCustomShaderSrc)(numOfSamplerInUse, mixOperand, code_);
};

// Streams stuff
exports.RegenerateCustomShader = RegenerateCustomShader;
var webcamError = function (e) {
  alert('Webcam error!' + e);
};
exports.webcamError = webcamError;
function SET_STREAM(video) {
  var videoSrc = null;
  navigator.mediaDevices.enumerateDevices().then(getDevices).then(getStream).catch(() => {
    alert('ERR MEDIA');
  });
  function getDevices(deviceInfos) {
    for (var i = 0; i !== deviceInfos.length; ++i) {
      var deviceInfo = deviceInfos[i];
      if (deviceInfo.kind === 'videoinput') {
        videoSrc = deviceInfo.deviceId;
        break;
      }
    }
  }
  function getStream() {
    if (navigator.getUserMedia) {
      var VIDEO__;
      if (isMobile() == true) {
        VIDEO__ = {
          deviceId: {
            exact: videoSrc
          },
          facingMode: 'user'
        };
      } else {
        VIDEO__ = true;
      }
      navigator.getUserMedia({
        audio: true,
        video: VIDEO__
      }, function (stream) {
        try {
          console.log('stream1', stream);
          video.srcObject = stream;
          console.log('stream2', stream);
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
}
function ACCESS_CAMERA(htmlElement) {
  var ROOT = this;
  console.log('ACCESS_CAMERA');
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
  };

  // console.log("Video 3d canvas texture created.");
  _manifest.default.updateBeforeDraw.push(ROOT);
  // Dispose for this needed!
}
function VIDEO_TEXTURE(p) {
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
    _manifest.default.updateBeforeDraw.push(ROOT);
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
function VT(p, name, options) {
  if (typeof name === 'undefined') name = 'vtex' + (0, _utility.randomIntFromTo)(1, 999999);
  if (typeof options === 'undefined') {
    options = {
      mixWithCanvas2d: false
    };
  }
  function fixAutoPlay() {
    console.log("Autoplay fixing...? ", ROOT.video);
    window.addEventListener('click', FirstClickAutoPlay, {
      passive: false
    });
  }
  function FirstClickAutoPlay() {
    var t = ROOT.video.play();
    t.then(() => {
      console.info("Autoplay fixed.");
      window.removeEventListener('click', FirstClickAutoPlay);
    }).catch(() => {
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
      ROOT.texture = _manifest.default.tools.loadVideoTexture('glVideoTexture' + name, ROOT.videoImage);
    } else {
      ROOT.texture = _manifest.default.tools.loadVideoTexture('glVideoTexture' + name, ROOT.video);
    }
    try {
      var testAutoplay = ROOT.video.play();
      testAutoplay.catch(() => {
        fixAutoPlay();
      });
    } catch (err) {}
    _manifest.default.updateBeforeDraw.push(ROOT);
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
function Vjs3(path_, nameOfCanvas) {
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
    _manifest.default.scene.outsideBox.streamTextures.iframe.contentWindow.runTextureEditor(nameOfCanvas);
    // E('HOLDER_STREAMS').style.display = 'block';
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
  ROOT.iframe.id = 'canvas2dTextureSurface' + document.getElementsByTagName('object').length;
  // ROOT.iframe.setAttribute('style', 'width:512px;height:512px');

  ROOT.iframe.setAttribute('width', '512');
  ROOT.iframe.setAttribute('height', '512');
  var DIV_CONTENT_STREAMS = document.getElementById('HOLDER_STREAMS');
  DIV_CONTENT_STREAMS.appendChild(ROOT.iframe);
  document.getElementById(ROOT.iframe.id).onload = event => {
    ROOT.videoImage = ROOT.iframe.contentDocument.getElementById(nameOfCanvas);
    if (typeof ROOT.iframe.contentWindow.runTextureEditor !== 'undefined') {
      _manifest.default.scene.outsideBox.streamTextures.iframe.contentWindow.runTextureEditor(nameOfCanvas);
    }
    ROOT.canvasTexture = ROOT.videoImage.getContext('2d');
    // App.scene.outsideBox.streamTextures.iframe.contentWindow.runTextureEditor(nameOfCanvas);
    // E('HOLDER_STREAMS').style.display = 'block';
    ROOT.texture = _manifest.default.tools.loadVideoTexture('glVideoTexture', ROOT.videoImage);
  };
  ROOT.showTextureEditor = function () {
    var T = (0, _utility.E)('HOLDER_STREAMS').style;
    // fix for ios defoult screen
    (0, _utility.E)('webcam_beta').style.display = 'none';
    T.display = 'block';
    T.left = '0';
  };
  ROOT.iframe.data = path_;
}
function DOM_VT(video, name, options) {
  if (typeof name === 'undefined') name = 'vtex' + (0, _utility.randomIntFromTo)(1, 999999);
  if (typeof options === 'undefined') {
    options = {
      mixWithCanvas2d: false
    };
  }
  function fixAutoPlay() {
    console.log("Autoplay fixing...? ", ROOT.video);
    window.addEventListener('click', FirstClickAutoPlay, {
      passive: false
    });
  }
  function FirstClickAutoPlay() {
    var t = ROOT.video.play();
    t.then(() => {
      console.info("Autoplay fixed.");
      window.removeEventListener('click', FirstClickAutoPlay);
    }).catch(() => {
      console.warn("Autoplay error.");
    });
  }
  var ROOT = this;
  console.log("input ", video);
  ROOT.video = video;
  let READY = function (e) {
    ROOT.videoImage = document.createElement('canvas');
    ROOT.videoImage.id = 'vtex-' + name;
    ROOT.videoImage.setAttribute('width', '512px');
    ROOT.videoImage.setAttribute('height', '512px');
    ROOT.video.mute = true;
    ROOT.video.autoplay = true;
    ROOT.video.loop = true;
    // test maybe
    ROOT.video.crossOrigin = "anonymous";
    var DIV_CONTENT_STREAMS = document.getElementById('HOLDER_STREAMS');
    DIV_CONTENT_STREAMS.appendChild(ROOT.videoImage);
    ROOT.options = options;
    if (options.mixWithCanvas2d == true) {
      ROOT.videoImageContext = ROOT.videoImage.getContext('2d');
      ROOT.videoImageContext.fillStyle = '#00003F';
      ROOT.videoImageContext.fillRect(0, 0, ROOT.videoImage.width, ROOT.videoImage.height);
      console.log('CCCCCCCC   1');
      ROOT.texture = _manifest.default.tools.loadVideoTexture('glVideoTexture' + name, ROOT.videoImage);
    } else {
      console.log('CCCCCCCC   2');
      // must be fixed
      if (typeof ROOT.video.video !== 'undefined') {
        // new net2
        ROOT.texture = _manifest.default.tools.loadVideoTexture('glVideoTexture' + name, ROOT.video.video);
      } else {
        ROOT.texture = _manifest.default.tools.loadVideoTexture('glVideoTexture' + name, ROOT.video);
      }
    }
    try {
      var testAutoplay = ROOT.video.play();
      testAutoplay.catch(() => {
        fixAutoPlay();
      });
    } catch (err) {}
    _manifest.default.updateBeforeDraw.push(ROOT);
    console.info("Video 2dcanvas texture created!!!.", ROOT.video);
  };
  READY();
  if (ROOT.video.addEventListener) {
    ROOT.video.addEventListener('loadeddata', ROOT.video.READY, false);
    ROOT.video.load();
  } else {
    ROOT.video.video.addEventListener('loadeddata', ROOT.video.READY, false);
    ROOT.video.video.load();
  }
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
  return {
    video: video
  };
}

},{"../client-config":1,"../networking2/app":33,"../networking2/matrix-stream":34,"../program/manifest":42,"./events":5,"./matrix-render":13,"./matrix-shaders1":14,"./matrix-shaders3":15,"./matrix-world":19,"./net":20,"./sounds":30,"./utility":31,"./webgl-utils":32}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EVENTS = EVENTS;
exports.camera = exports.SYS = void 0;
exports.defineKeyBoardObject = defineKeyBoardObject;
exports.keyboardPress = void 0;
var _manifest = _interopRequireDefault(require("../program/manifest"));
var _matrixWorld = require("./matrix-world");
var _utility = require("./utility");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
var SYS = exports.SYS = {};
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
// from 1.9.44
_manifest.default.sys = SYS;
function EVENTS(canvas) {
  var ROOT_EVENTS = this;
  // Mobile device
  if ((0, _utility.isMobile)() == true) {
    canvas.addEventListener('touchstart', function (e) {
      e.preventDefault();
      var touchList = e.changedTouches;
      SYS.MOUSE.PRESS = true;
      SYS.MOUSE.x = touchList[0].pageX;
      SYS.MOUSE.y = touchList[0].pageY;
      ROOT_EVENTS.CALCULATE_TOUCH_OR_CLICK();
      ROOT_EVENTS.CALCULATE_TOUCH_DOWN_OR_MOUSE_DOWN(e, SYS.MOUSE);
      ROOT_EVENTS.multiTouch(e, touchList);
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
      var touchList = e.changedTouches;
      //SYS.MOUSE.MOUSE_MOVING = true;
      //SYS.MOUSE.PRESS = true;
      SYS.MOUSE.x = touchList[0].pageX;
      SYS.MOUSE.y = touchList[0].pageY;
      ROOT_EVENTS.CALCULATE_TOUCH_MOVE_OR_MOUSE_MOVE({
        x: touchList[0].pageX,
        y: touchList[0].pageY
      });
    }, {
      passive: false
    });
  } else {
    //D esktop device
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
      ROOT_EVENTS.CALCULATE_TOUCH_MOVE_OR_MOUSE_MOVE({
        x: e.layerX,
        y: e.layerY
      });
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
      ROOT_EVENTS.CALCULATE_TOUCH_DOWN_OR_MOUSE_DOWN(e, SYS.MOUSE);
    };

    //console.log("This is PC desktop device.");
  }
  window.addEventListener('resize', function (e) {
    if (_manifest.default.resize.canvas == "false" || _manifest.default.resize.canvas == false) {
      return;
    }
    if (_manifest.default.resize.canvas == "full-screen") {
      //canvas.width =  window.innerHeight * App.resize.aspectRatio;
      _manifest.default.canvas.width = window.innerWidth;
      _manifest.default.canvas.height = window.innerHeight;
      // SYS.DEBUG.LOG('SYS: fullscreen diametric resize is active. ' + world);
    } else {
      _manifest.default.canvas.width = window.innerHeight * _manifest.default.resize.aspectRatio;
      _manifest.default.canvas.height = window.innerHeight;
      SYS.DEBUG.LOG('SYS: aspect ration resize is active. ' + _matrixWorld.world);
    }
    if (_manifest.default.resize.reloadWorldOnResize == true && window.resizeGlPort !== 'undefined') {
      window.resizeGlPort();
    }
  }, {
    passive: true
  });

  // Calculate touch or click event
  this.CALCULATE_TOUCH_OR_CLICK = function () {
    // console.log('TEST EVENTS CALCULATE_TOUCH_OR_CLICK')
    // SYS.DEBUG.LOG('EVENT: MOUSE/TOUCH CLICK');
  };

  // Calculate touch or click event
  this.multiTouch = function (e) {
    SYS.DEBUG.LOG('EVENT: MOUSE/TOUCH CLICK', e);
  };
  this.virtualUpDownScene = 0;
  this.virtualLeftRightScene = 0;

  // CALCULATE MOUSE MOVE OR TOUCH MOVE
  this.CALCULATE_TOUCH_MOVE_OR_MOUSE_MOVE = function (e) {
    var center_x = window.innerWidth / 2;
    var center_y = window.innerHeight / 2;
    SYS.MOUSE.x = e.x - center_x;
    SYS.MOUSE.y = e.y - center_y;

    //check to make sure there is data to compare against
    if (typeof SYS.MOUSE.LAST_POSITION.x != 'undefined') {
      //get the change from last position to this position
      var deltaX = SYS.MOUSE.LAST_POSITION.x - SYS.MOUSE.x,
        deltaY = SYS.MOUSE.LAST_POSITION.y - SYS.MOUSE.y;
    }
    if (_manifest.default.camera.SceneController === true && keyboardPress.getKeyStatus(16) || _manifest.default.camera.FirstPersonController === true) {
      // console.log('works for both now')
      camera.pitchRate += deltaY * 10;
      camera.yawRate += deltaX * 1;
      if (SYS.MOUSE.x < _manifest.default.camera.edgeMarginValue - center_x) {
        _manifest.default.camera.leftEdge = true;
        SYS.DEBUG.LOG("Mouse on edge!");
      } else {
        _manifest.default.camera.leftEdge = false;
      }
      if (SYS.MOUSE.x > center_x - _manifest.default.camera.edgeMarginValue) {
        _manifest.default.camera.rightEdge = true;
        SYS.DEBUG.LOG("Mouse on edge!");
      } else {
        _manifest.default.camera.rightEdge = false;
      }
    }
    if (_manifest.default.camera.SceneController === true && SYS.MOUSE.BUTTON_PRESSED == 'MID') {
      if (Math.abs(deltaX) > Math.abs(deltaY) && deltaX > 0) {
        // left
        if (SYS.MOUSE.LAST_POSITION.x < SYS.MOUSE.x) {
          this.virtualLeftRightScene -= _manifest.default.camera.sceneControllerDragAmp;
        } else if (SYS.MOUSE.LAST_POSITION.x > SYS.MOUSE.x) {
          this.virtualLeftRightScene += _manifest.default.camera.sceneControllerDragAmp;
        }
      } else if (Math.abs(deltaX) > Math.abs(deltaY) && deltaX < 0) {
        // right
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
    }

    // Set the new last position to the current for next time.
    SYS.MOUSE.LAST_POSITION.x = SYS.MOUSE.x, SYS.MOUSE.LAST_POSITION.y = SYS.MOUSE.y;
    //SYS.DEBUG.LOG(" EVENT : MOUSE/TOUCH MOVE ");
  };

  // CALCULATE_TOUCH_UP_OR_MOUSE_UP
  this.CALCULATE_TOUCH_UP_OR_MOUSE_UP = function () {
    SYS.DEBUG.LOG(' EVENT : MOUSE/TOUCH UP ');
  };
  this.CALCULATE_TOUCH_DOWN_OR_MOUSE_DOWN = function (ev, m) {
    SYS.DEBUG.LOG(' EVENT : MOUSE/TOUCH DOWN ');
  };
}
function defineKeyBoardObject() {
  var globKeyPressObj = new Object();

  /* Constructor for the global mouse location     */
  globKeyPressObj.keyArr = new Array();
  document.onkeydown = function (e) {
    // console.log('......')
    globKeyPressObj.handleKeyDown(e);
  };
  document.onkeyup = function (e) {
    globKeyPressObj.handleKeyUp(e);
  };

  /**
   * @description
   * Getter for a key status.
   **/
  globKeyPressObj.getKeyStatus = function (keyCode) {
    return this.keyArr[keyCode];
  };

  /**
   * @description 
   * Setter for a key status.
   **/
  globKeyPressObj.setKeyStatus = function (keyCode, status) {
    // console.log("keycode", keyCode)
    this.keyArr[keyCode] = status;
  };

  /**
   * @description
   * Key Down and Up handlers.
   * Optimal dispatch event: 'hit.KeyDown'
   **/
  globKeyPressObj.handleKeyDown = function (evt) {
    evt = evt ? evt : window.event ? window.event : '';
    // console.log("'LOG KEY CODE ", evt.keyCode);
    let emitKeyDown = new CustomEvent('hit.keyDown', {
      detail: {
        keyCode: evt.keyCode,
        origin: evt
      }
    });
    dispatchEvent(emitKeyDown);
    this.setKeyStatus(evt.keyCode, true);
  };
  globKeyPressObj.handleKeyUp = function (evt) {
    evt = evt ? evt : window.event ? window.event : '';
    let emitKeyUp = new CustomEvent('hit.keyUp', {
      detail: {
        keyCode: evt.keyCode,
        origin: evt
      }
    });
    dispatchEvent(emitKeyUp);
    this.setKeyStatus(evt.keyCode, false);
  };

  /* Destructor */
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
  let scale = evt.deltaY * -0.01;
  // console.log(evt)
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
var camera = exports.camera = {};

/* Set defaults       */
camera.roll = 0;
camera.rollRate = 0;
camera.rallAmp = 0.05;
camera.fly = true;
camera.pitch = 0;
camera.pitchRate = 0;
camera.yaw = 0;
camera.yawRate = 0;
camera.xPos = 0;
camera.yPos = 0;
camera.zPos = 0;
camera.speed = 0;
camera.yawAmp = 0.077;
camera.pitchAmp = 0.017;
camera.virtualJumpY = 2;
camera.virtualJumpActive = false;
camera.preventSpeedZero = false;

// eslint-disable-next-line no-global-assign
var keyboardPress = exports.keyboardPress = defineKeyBoardObject();

// For FirstPersonController
camera.setCamera = function (object) {
  if (keyboardPress.getKeyStatus(37) || keyboardPress.getKeyStatus(65) || _manifest.default.camera.leftEdge == true) {
    /* Left Key  or A */
    camera.yawRate = _manifest.default.camera.yawRate;
    if (_manifest.default.camera.leftEdge == true) {
      camera.yawRate = _manifest.default.camera.yawRateOnEdge;
    }
  } else if (keyboardPress.getKeyStatus(39) || keyboardPress.getKeyStatus(68) || _manifest.default.camera.rightEdge == true) {
    /* Right Key or D */
    camera.yawRate = -_manifest.default.camera.yawRate;
    if (_manifest.default.camera.rightEdge == true) {
      camera.yawRate = -_manifest.default.camera.yawRateOnEdge;
    }
  } else if (keyboardPress.getKeyStatus(32)) {
    /* Right Key or SPACE */
    if (this.virtualJumpActive != true) {
      this.virtualJumpActive = true;
    }
  }
  /* Up Key or W */
  if (keyboardPress.getKeyStatus(38) || keyboardPress.getKeyStatus(87)) {
    camera.speed = _manifest.default.camera.speedAmp;
  } else if (keyboardPress.getKeyStatus(40) || keyboardPress.getKeyStatus(83)) {
    /* Down Key or S */
    camera.speed = -_manifest.default.camera.speedAmp;
  } else {
    if (camera.preventSpeedZero == false) camera.speed = 0;
  }

  /* Calculate yaw, pitch and roll(x,y,z) */
  if (camera.speed != 0) {
    camera.xPos -= Math.sin(degToRad(camera.yaw)) * camera.speed;
    if (camera.fly == true) {
      // Fly regime
      camera.yPos += Math.sin(degToRad(camera.pitch)) * camera.speed;
    } else {
      // usually for fpshooter regime
      // camera.yPos = this.virtualJumpY;
      // camera.yPos = 0;
      // leave it zero by default lets dirigent from top
    }
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

// For sceneController
camera.setSceneCamera = function (object) {
  /* Left Key  or A */
  if (keyboardPress.getKeyStatus(37) || keyboardPress.getKeyStatus(65) || _manifest.default.camera.leftEdge == true) {
    camera.yawRate = _manifest.default.camera.sceneControllerWASDKeysAmp;
    if (_manifest.default.camera.leftEdge == true) camera.yawRate = _manifest.default.camera.sceneControllerEdgeCameraYawRate;
  } else if (keyboardPress.getKeyStatus(39) || keyboardPress.getKeyStatus(68) || _manifest.default.camera.rightEdge == true) {
    camera.yawRate = -_manifest.default.camera.sceneControllerWASDKeysAmp;
    if (_manifest.default.camera.rightEdge == true) camera.yawRate = -_manifest.default.camera.sceneControllerEdgeCameraYawRate;
  } else {
    // camera.yawRate = 0;
  }

  /* Up Key or W */
  if (keyboardPress.getKeyStatus(38) || keyboardPress.getKeyStatus(87)) {
    camera.speed = _manifest.default.camera.speedAmp;
  } else if (keyboardPress.getKeyStatus(40) || keyboardPress.getKeyStatus(83)) {
    /* Down Key or S */
    camera.speed = -_manifest.default.camera.speedAmp;
  } else {
    // diff
    if (!keyboardPress.getKeyStatus(16)) camera.speed = 0;
  }

  /* Calculate yaw, pitch and roll(x,y,z) */
  if (camera.speed != 0) {
    camera.xPos -= Math.sin(degToRad(camera.yaw)) * camera.speed;
    // ?
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
  regularBtn.parentElement.classList.add('hideMe');
  setTimeout(() => {
    addBtn.style.display = 'none';
    regularBtn.style.display = 'none';
  }, 950);
});

// Track web app install by user
document.addEventListener('appinstalled', event => {
  console.log('PWA app installed by user! Hurray...');
});
if (_manifest.default.pwa.addToHomePage === true) {
  /**
   * @description
   * If we dont reach this scope then we have installed pwa.
   */
  let deferredPrompt;
  window.addEventListener('beforeinstallprompt', e => {
    // Prevent Chrome 67 and earlier from automatically showing the prompt
    e.preventDefault();
    // Stash the event so it can be triggered later.
    deferredPrompt = e;
    addBtn.style.display = 'block';
    regularBtn.style.display = 'block';
    addBtn.addEventListener('click', () => {
      // hide our user interface that shows our A2HS button
      addBtn.style.display = 'none';
      // Show the prompt
      deferredPrompt.prompt();
      // Wait for the user to respond to the prompt
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

},{"../program/manifest":42,"./matrix-world":19,"./utility":31}],6:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.makeObjSeqArg = exports.initMeshBuffers = exports.downloadMeshes = exports.deleteMeshBuffers = exports.constructMesh = void 0;
exports.play = play;
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
      initMeshBuffers(_matrixWorld.world.GL.gl, this.create(this.objectData, this.inputArg));
    };
    this.updateBuffers = () => {
      this.inputArg.scale = 1;
      initMeshBuffers(_matrixWorld.world.GL.gl, this.create(this.objectData, this.inputArg));
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
      unpacked = {};
    // unpacking stuff
    unpacked.verts = [];
    unpacked.norms = [];
    unpacked.textures = [];
    unpacked.hashindices = {};
    unpacked.indices = [];
    unpacked.index = 0;
    // array of lines separated by the newline
    var lines = objectData.split('\n');

    // update swap orientation
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
            unpacked.verts.push(+verts[(vertex[0] - 1) * 3 + initOrientation[2]] * inputArg.scale);

            // vertex textures
            if (textures.length) {
              unpacked.textures.push(+textures[(vertex[1] - 1) * 2 + 0]);
              unpacked.textures.push(+textures[(vertex[1] - 1) * 2 + 1]);
            }
            // vertex normals
            unpacked.norms.push(+vertNormals[(vertex[2] - 1) * 3 + 0]);
            unpacked.norms.push(+vertNormals[(vertex[2] - 1) * 3 + 1]);
            unpacked.norms.push(+vertNormals[(vertex[2] - 1) * 3 + 2]);
            // add the newly created vertex to the list of indices
            unpacked.hashindices[elements[j]] = unpacked.index;
            unpacked.indices.push(unpacked.index);
            // increment the counter
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
  var semaphore = Object.keys(nameAndURLs).length;
  // if error is true, an alert will given
  var error = false;
  // this is used to check if all meshes have been downloaded
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
  var meshes = {};

  // loop over the mesh_name,url key,value pairs
  for (var mesh_name in nameAndURLs) {
    if (nameAndURLs.hasOwnProperty(mesh_name)) {
      new Ajax().get(nameAndURLs[mesh_name], function (name) {
        return function (data, status) {
          if (status === 200) {
            meshes[name] = new constructMesh(data, inputArg);
          } else {
            error = true;
            console.error('An error has occurred and the mesh "' + name + '" could not be downloaded.');
          }
          // the request has finished, decrement the counter
          semaphore--;
          if (semaphore === 0) {
            if (error) {
              // if an error has occurred, the user is notified here and the
              // callback is not called
              console.error('An error has occurred and one or meshes has not been ' + 'downloaded. The execution of the script has terminated.');
              throw '';
            }
            // there haven't been any errors in retrieving the meshes
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

/**
 * @description
 * Construct sequence list argument for downloadMeshes.
 * This is adaptation for blender obj animation export.
 * For example:
 *    matrixEngine.objLoader.downloadMeshes(
      matrixEngine.objLoader.makeObjSeqArg(
        {
          id: objName,
          joinMultiPahts: [
            {
              path: "res/bvh-skeletal-base/swat-guy/seq-walk/low/swat",
              id: objName,
              from: 1, to: 34
            },
            {
              path: "res/bvh-skeletal-base/swat-guy/seq-walk-pistol/low/swat-walk-pistol",
              id: objName,
              from: 35, to: 54
            }
          ]
        }),
      onLoadObj
    );
 */
exports.deleteMeshBuffers = deleteMeshBuffers;
const makeObjSeqArg = arg => {
  // Adaptation for blender (animation) obj exporter.
  var local = {};
  function localCalc(arg, noInitial = false) {
    var zeros = '00000';
    var l = {};
    var helper = arg.from;
    for (let j = arg.from, z = 1; j <= arg.to; j++) {
      if (z > 9 && z < 99) {
        zeros = '0000';
      } else if (z > 99 && z < 999) {
        zeros = '000';
      } // no need more then 999

      if (helper == arg.from && noInitial === false) {
        l[arg.id] = arg.path + '_' + zeros + z + '.obj';
      } else {
        l[arg.id + (helper - 1)] = arg.path + '_' + zeros + z + '.obj';
      }
      helper++;
      z++;
    }
    return l;
  }
  if (typeof arg.path === 'string') {
    local = localCalc(arg);
  } else if (typeof arg.path === 'undefined') {
    if (typeof arg.joinMultiPahts !== 'undefined') {
      console.log("ITS joinMultiPahts!");
      var localFinal = {};
      arg.joinMultiPahts.forEach((arg, index) => {
        if (index === 0) {
          localFinal = Object.assign(local, localCalc(arg));
        } else {
          localFinal = Object.assign(local, localCalc(arg, true));
        }
      });
      console.log("joinMultiPahts LOCAL => ", localFinal);
      return localFinal;
    }
  }
  return local;
};

/**
 * @description
 * Switching obj seq animations frames range.
 */
exports.makeObjSeqArg = makeObjSeqArg;
function play(nameAni) {
  this.animation.anims.active = nameAni;
  this.animation.currentAni = this.animation.anims[this.animation.anims.active].from;
}

// TEST 
// add destroy animation meshs procedure

},{"./matrix-world":19}],7:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _manifest = _interopRequireDefault(require("../program/manifest"));
var _matrixWorld = require("./matrix-world");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
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
  object.vertexColorBuffer.numItems = 3;

  // console.log("Buffer the " + object.type + "'s color loaded success.");
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
    _matrixWorld.world.GL.gl.bufferData(_matrixWorld.world.GL.gl.ARRAY_BUFFER, object.mesh.normalBuffer, _matrixWorld.world.GL.gl.STATIC_DRAW);
    // object.mesh.normalBuffer.itemSize = 3;
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
  object.vertexPositionBuffer.numItems = object.geometry.vertexPositionData.length / 3;

  // Color
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
    }

    // ??
    _matrixWorld.world.GL.gl.bufferData(_matrixWorld.world.GL.gl.ARRAY_BUFFER, new Float32Array(unpackedColors), _matrixWorld.world.GL.gl.STATIC_DRAW);
    // world.GL.gl.bufferData(world.GL.gl.ARRAY_BUFFER, new Float32Array(object.geometry.normals), world.GL.gl.STATIC_DRAW);
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
_manifest.default.operation.cubemap_buffer_procedure = function (object) {
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
  // /* Texture */
  // if (object.texture) {
  //   object.vertexTexCoordBuffer = world.GL.gl.createBuffer();
  //   world.GL.gl.bindBuffer(world.GL.gl.ARRAY_BUFFER, object.vertexTexCoordBuffer);
  //   world.GL.gl.bufferData(world.GL.gl.ARRAY_BUFFER, object.geometry.texCoords, world.GL.gl.STATIC_DRAW);
  //   object.vertexTexCoordBuffer.itemSize = 2;
  //   object.vertexTexCoordBuffer.numItems = 24;
  // }

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
var _default = exports.default = _manifest.default.operation;

},{"../program/manifest":42,"./matrix-world":19}],8:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _bvhLoader = _interopRequireDefault(require("bvh-loader"));
var matrixWorld = _interopRequireWildcard(require("./matrix-world"));
var _utility = require("./utility");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
/**
 * @description MatrixEngine BVH animation loader.
 * MEBvh comes from `npm i bvh-loader`. Package
 * `bvh-loader` is created for MatrixEngine but
 * can be used for any other projects.
 * [Internal] More info:
 * https://docs.w3cub.com/dom/webgl2renderingcontext/drawelementsinstanced
 * @name `MEBvhAnimation`
 * @author Nikola Lukic
 * @async Yes
 */

class MEBvhAnimation {
  constructor(path_, options) {
    if (typeof options === 'undefined' || typeof options.world === 'undefined') {
      console.error('MEBvhAnimation class error: No second argument options || possible world is not passed.');
      return;
    }
    if (typeof options.skeletalBoneScale === 'undefined') {
      options.skeletalBoneScale = 0.3;
    }
    if (typeof options.loop === 'undefined') options.loop = true;
    if (typeof options.showOnLoad === 'undefined') options.showOnLoad = true;
    if (typeof options.type === 'undefined') options.type = 'ME-SKELETAL_POINT_BASE';
    if (typeof options.autoPlay === 'undefined') options.autoPlay = true;
    if (typeof options.boneNameBasePrefix === 'undefined') options.boneNameBasePrefix = 'MS';
    if (typeof options.globalOffset === 'undefined') options.globalOffset = [0, 0, 0];
    if (typeof options.globalRotation === 'undefined') options.globalRotation = [0, 0, 0];
    if (typeof options.myFrameRate === 'undefined') options.myFrameRate = 125;
    if (typeof options.speed === 'undefined') options.speed = 5;
    if (typeof options.matrixSkeletalObjScale === 'undefined') options.matrixSkeletalObjScale = 1;
    if (typeof options.ifNotExistDrawType === 'undefined') options.ifNotExistDrawType = 'cube';

    // passed
    this.options = options;
    this.world = options.world;
    this.globalOffset = options.globalOffset;
    this.globalRotation = options.globalRotation;
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
      this.loopInverse = new _utility.OSCILLATOR(1, this.sumOfFrames, options.speed);
      if (this.isConstructed == false) this.constructSkeletal(this.options);
    }).catch(err => {
      console.warn('Bvh-loader error: ', err);
    });
  }
  objectsReady(options) {
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
    if (typeof this.options.skeletalBlend != 'undefined') {
      for (var x = 0; x < this.tPosition.length; x++) {
        var b = this.options.boneNameBasePrefix + this.skeletalKeys[x];
        App.scene[b].glBlend.blendEnabled = true;
        App.scene[b].glBlend.blendParamSrc = matrixEngine.utility.ENUMERATORS.glBlend.param[this.options.skeletalBlend.paramSrc];
        App.scene[b].glBlend.blendParamDest = matrixEngine.utility.ENUMERATORS.glBlend.param[this.options.skeletalBlend.paramDest];
      }
    }
  }
  constructSkeletalTPose() {
    for (var x = 0; x < this.tPosition.length; x++) {
      var b = this.options.boneNameBasePrefix + this.skeletalKeys[x];
      // test check
      if (App.scene[b]) {
        App.scene[b].position.SetX(this.tPosition[x][0] + this.globalOffset[0]);
        App.scene[b].position.SetY(this.tPosition[x][1] + this.globalOffset[1]);
        App.scene[b].position.SetZ(this.tPosition[x][2] + this.globalOffset[2]);
        App.scene[b].rotation.rotateX(this.tRotation[x][0] + this.globalRotation[0]);
        App.scene[b].rotation.rotateY(this.tRotation[x][1] + this.globalRotation[1]);
        App.scene[b].rotation.rotateZ(this.tRotation[x][2] + this.globalRotation[2]);
      } else {
        console.log('TEST NON EXIST  T POSE', b);
      }
    }
  }

  // Must be improved not secure 100%.
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

  // cleanNames = (name) => {
  //   const arrondissements = ['mixamorig'];
  //   return arrondissements.reduce((acc, cur) => acc.replace(cur, ''), name);
  // };

  async constructSkeletal(options) {
    this.skeletalKeys = this.skeletalKeys.map(item => item.replace('mixamorig:', ''));
    const promises = [];
    for (var x = 0; x < this.tPosition.length; x++) {
      promises.push(new Promise(resolve => {
        // Blender adapt
        let filename = this.skeletalKeys[x];
        filename = filename.toLowerCase();
        var b = this.options.boneNameBasePrefix + this.skeletalKeys[x];
        // just handler
        var curName = {};
        curName[b] = this.options.matrixSkeletal + filename + '.obj';
        if (typeof this.options.boneTex != 'undefined') {
          // mixamorig:Head
          // console.log("filename = ", filename);
          const detTypeOfMEObject = typeof this.options.drawTypeBone == 'undefined' ? 'cubeLightTex' : this.options.drawTypeBone;
          // matrixSkeletal feature
          if (detTypeOfMEObject == 'matrixSkeletal') {
            if (this.options.objList.indexOf(filename) !== -1) {
              if (typeof this.options.ignoreList !== 'undefined' && this.options.ignoreList[0] == filename) {
                resolve('ignored' + filename);
              } else {
                console.info(this.skeletalKeys[x], ' >>> looking for obj part...');
                matrixEngine.objLoader.downloadMeshes(curName, meshes => {
                  for (let key in meshes) {
                    meshes[key].setScale(this.options.matrixSkeletalObjScale);
                    matrixEngine.objLoader.initMeshBuffers(this.world.GL.gl, meshes[key]);
                    this.world.Add('obj', this.options.matrixSkeletalObjScale, key, this.options.boneTex, meshes[key]);
                    resolve(key);
                  }
                });
              }
            } else {
              // Primitives mesh
              this.world.Add(this.options.ifNotExistDrawType, this.options.skeletalBoneScale, b, this.options.boneTex);
              resolve(b);
            }
          } else {
            // Primitives mesh
            this.world.Add(detTypeOfMEObject, this.options.skeletalBoneScale, b, this.options.boneTex);
            resolve(b);
          }
        } else {
          // Primitives mesh
          this.world.Add('cube', this.options.skeletalBoneScale, b);
          resolve(b);
        }
      }));
    }
    Promise.all(promises).then(what => {
      console.info('Promise all -> ', what);
      console.info('Promise all -> ', promises);
      this.isConstructed = true;
      this.objectsReady(options);
    });
  }
  constructFirstFrame() {
    for (var x = 0; x < this.tPosition.length; x++) {
      var b = this.options.boneNameBasePrefix + this.skeletalKeys[x];
      // test - import bvh from make human -> blender
      if (this.animation[0][1]) {
        App.scene[b].position.SetX(this.animation[0][1][x][0] + this.globalOffset[0]);
        App.scene[b].position.SetY(this.animation[0][1][x][1] + this.globalOffset[1]);
        App.scene[b].position.SetZ(this.animation[0][1][x][2] + this.globalOffset[2]);
        App.scene[b].rotation.rotateX(this.animation[1][1][x][0] + this.globalRotation[0]);
        App.scene[b].rotation.rotateY(this.animation[1][1][x][1] + this.globalRotation[1]);
        App.scene[b].rotation.rotateZ(this.animation[1][1][x][2] + this.globalRotation[2]);
      } else {
        // console.info("TESTED no t-pose case!")
        App.scene[b].position.SetX(this.animation[0][0][x][0] + this.globalOffset[0]);
        App.scene[b].position.SetY(this.animation[0][0][x][1] + this.globalOffset[1]);
        App.scene[b].position.SetZ(this.animation[0][0][x][2] + this.globalOffset[2]);
        App.scene[b].rotation.rotateX(this.animation[1][0][x][0] + this.globalRotation[0]);
        App.scene[b].rotation.rotateY(this.animation[1][0][x][1] + this.globalRotation[1]);
        App.scene[b].rotation.rotateZ(this.animation[1][0][x][2] + this.globalRotation[2]);
      }
    }
  }
  playAnimation() {
    if (this.animationTimer == null) {
      this.animationTimer = setInterval(() => {
        for (var x = 0; x < this.tPosition.length; x++) {
          var b = this.options.boneNameBasePrefix + this.skeletalKeys[x];
          // catch if not exist possible!
          if (App.scene[b]) {
            // 1.8.1
            if (App.scene[b] && this.animation[0][this.actualFrame]) {
              App.scene[b].position.SetX(this.animation[0][this.actualFrame][x][0] + this.globalOffset[0]);
              App.scene[b].position.SetY(this.animation[0][this.actualFrame][x][1] + this.globalOffset[1]);
              App.scene[b].position.SetZ(this.animation[0][this.actualFrame][x][2] + this.globalOffset[2]);
              App.scene[b].rotation.rotateX(this.animation[1][1][x][0] + this.globalRotation[0]);
              App.scene[b].rotation.rotateY(this.animation[1][1][x][1] + this.globalRotation[1]);
              App.scene[b].rotation.rotateZ(this.animation[1][1][x][2] + this.globalRotation[2]);
            } else {
              // for non t pose
              App.scene[b].position.SetX(this.animation[0][0][x][0] + this.globalOffset[0]);
              App.scene[b].position.SetY(this.animation[0][0][x][1] + this.globalOffset[1]);
              App.scene[b].position.SetZ(this.animation[0][0][x][2] + this.globalOffset[2]);
              App.scene[b].rotation.rotateX(this.animation[1][0][x][0] + this.globalRotation[0]);
              App.scene[b].rotation.rotateY(this.animation[1][0][x][1] + this.globalRotation[1]);
              App.scene[b].rotation.rotateZ(this.animation[1][0][x][2] + this.globalRotation[2]);
            }
          }
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
      console.warn('MEBvhAnimation: Animation already play.');
    }
  }
  stopAnimation() {
    clearInterval(this.animationTimer);
    this.animationTimer = null;
  }
}
exports.default = MEBvhAnimation;

},{"./matrix-world":19,"./utility":31,"bvh-loader":37}],9:[function(require,module,exports){
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
var _matrixShadows = require("./matrix-shadows");
var _matrixTextures = require("./matrix-textures");
var _engine = require("./engine");
var CANNON = _interopRequireWildcard(require("cannon"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
// import {vec2} from 'wgpu-matrix';

// test override 
CANNON.Quaternion.prototype.toAxisAngle = function (targetAxis) {
  targetAxis = targetAxis || new CANNON.Vec3();
  if (this.w > 1) this.normalize();
  // if w>1 acos and sqrt will produce errors, this cant happen if quaternion is normalised

  var angle = 2 * Math.acos(this.w);
  var s = Math.sqrt(1 - this.w * this.w); // assuming quaternion normalised then w is less than 1, so term always positive.
  if (s < 0.00000001) {
    // test to avoid divide by zero, s is always positive due to sqrt
    // if s close to zero then direction of axis not important
    // if it is important that axis is normalised then replace with x=1; y=z=0;
    // console.log('override works: x: ', this.x + " y: ", this.y, " z: ", this.z)
    // nikola lukic
    var max1 = [this.x, this.y, this.z];
    var getMaxValue = Math.max(...max1);
    var index = max1.indexOf(getMaxValue);
    targetAxis.x = 1;
    targetAxis.y = 0;
    targetAxis.z = 0;
  } else {
    targetAxis.x = this.x / s; // normalise axis
    targetAxis.y = this.y / s;
    targetAxis.z = this.z / s;
  }
  return [targetAxis, angle];
};
_manifest.default.operation.draws = new Object();
_manifest.default.operation.draws.cube = function (object, ray) {
  var lighting = true;
  var localLooper = 0;
  mat4.identity(object.mvMatrix);
  this.mvPushMatrix(object.mvMatrix, this.mvMatrixStack);
  if (object.physics.enabled == true) {
    if (_manifest.default.camera.FirstPersonController == true) {
      _events.camera.setCamera(object);
    } else if (_manifest.default.camera.SceneController == true) {
      _events.camera.setSceneCamera(object);
    }
    var QP = object.physics.currentBody.quaternion;
    QP.normalize();
    // mat4.translate(object.mvMatrix, object.mvMatrix, [0.0, 0.0, 0.0]);
    mat4.translate(object.mvMatrix, object.mvMatrix, object.position.worldLocation);
    if (raycaster.checkingProcedureCalc && typeof ray === 'undefined') raycaster.checkingProcedureCalc(object);
    var t = vec3.fromValues(object.rotation.axis.x, object.rotation.axis.z, object.rotation.axis.y);
    object.rotation.axisSystem[0].normalize();
    var AXIS = vec3.fromValues(object.rotation.axisSystem[0].x.toFixed(2), object.rotation.axisSystem[0].z.toFixed(2), object.rotation.axisSystem[0].y.toFixed(2));
    var MY_ANGLE = 2 * Math.acos(QP.w);
    // if(radToDeg(object.rotation.angle) > 90) console.log("aNGLE:" + radToDeg(object.rotation.angle) + " VS MY_ANGLE " + radToDeg(MY_ANGLE) + "  axis ++++ " + AXIS)
    // mat4.rotateX(object.mvMatrix, object.mvMatrix, (object.rotation.angle));
    // mat4.rotateY(object.mvMatrix, object.mvMatrix, (object.rotation.angle));
    // mat4.rotateZ(object.mvMatrix, object.mvMatrix, (-object.rotation.angle));
    mat4.rotate(object.mvMatrix, object.mvMatrix, MY_ANGLE, AXIS);
  } else if (object.isHUD === true) {
    mat4.translate(object.mvMatrix, object.mvMatrix, object.position.worldLocation);
    mat4.rotate(object.mvMatrix, object.mvMatrix, (0, _engine.degToRad)(object.rotation.rx), object.rotation.getRotDirX());
    mat4.rotate(object.mvMatrix, object.mvMatrix, (0, _engine.degToRad)(object.rotation.ry), object.rotation.getRotDirY());
    mat4.rotate(object.mvMatrix, object.mvMatrix, (0, _engine.degToRad)(object.rotation.rz), object.rotation.getRotDirZ());
    if (raycaster.checkingProcedureCalc) raycaster.checkingProcedureCalc(object);
  } else {
    if (_manifest.default.camera.FirstPersonController == true) {
      _events.camera.setCamera(object);
    } else if (_manifest.default.camera.SceneController == true) {
      _events.camera.setSceneCamera(object);
    }
    mat4.translate(object.mvMatrix, object.mvMatrix, object.position.worldLocation);
    if (raycaster.checkingProcedureCalc && typeof ray === 'undefined') raycaster.checkingProcedureCalc(object);
    mat4.rotate(object.mvMatrix, object.mvMatrix, (0, _engine.degToRad)(object.rotation.rx), object.rotation.getRotDirX());
    mat4.rotate(object.mvMatrix, object.mvMatrix, (0, _engine.degToRad)(object.rotation.ry), object.rotation.getRotDirY());
    mat4.rotate(object.mvMatrix, object.mvMatrix, (0, _engine.degToRad)(object.rotation.rz), object.rotation.getRotDirZ());
  }

  // V
  if (object.vertexPositionBuffer) {
    _matrixWorld.world.GL.gl.bindBuffer(_matrixWorld.world.GL.gl.ARRAY_BUFFER, object.vertexPositionBuffer);
    if (object.geometry.dynamicBuffer == true) {
      _matrixWorld.world.GL.gl.bufferData(_matrixWorld.world.GL.gl.ARRAY_BUFFER, object.geometry.vertices, _matrixWorld.world.GL.gl.STATIC_DRAW);
    }
    _matrixWorld.world.GL.gl.vertexAttribPointer(object.shaderProgram.vertexPositionAttribute, object.vertexPositionBuffer.itemSize, _matrixWorld.world.GL.gl.FLOAT, false, 0, 0);
    _matrixWorld.world.GL.gl.enableVertexAttribArray(object.shaderProgram.vertexPositionAttribute);
    localLooper = localLooper + 1;
  }

  // C
  if (object.vertexColorBuffer) {
    _matrixWorld.world.GL.gl.bindBuffer(_matrixWorld.world.GL.gl.ARRAY_BUFFER, object.vertexColorBuffer);
    _matrixWorld.world.GL.gl.vertexAttribPointer(object.shaderProgram.vertexColorAttribute, object.vertexColorBuffer.itemSize, _matrixWorld.world.GL.gl.FLOAT, false, 0, 0);
    _matrixWorld.world.GL.gl.enableVertexAttribArray(object.shaderProgram.vertexColorAttribute);
    localLooper = localLooper + 1;
  }

  // L
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
        _matrixWorld.world.GL.gl.uniform3f(object.shaderProgram.ambientColorUniform, parseFloat((0, _utility.E)('ambLightR').getAttribute('value')), parseFloat((0, _utility.E)('ambLightG').getAttribute('value')), parseFloat((0, _utility.E)('ambLightB').getAttribute('value')));
        // console.log("LIGHTS UNIFORM AMB  B = ", parseFloat(E('ambLightB').value) )
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
        lightingDirection = [(0, _engine.degToRad)(parseFloat((0, _utility.E)('dirX').getAttribute('value'))), (0, _engine.degToRad)(parseFloat((0, _utility.E)('dirY').getAttribute('value'))), (0, _engine.degToRad)(parseFloat((0, _utility.E)('dirZ').getAttribute('value')))];
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
  }

  // T
  if (object.vertexTexCoordBuffer) {
    _matrixWorld.world.GL.gl.bindBuffer(_matrixWorld.world.GL.gl.ARRAY_BUFFER, object.vertexTexCoordBuffer);
    if (object.geometry.dynamicBuffer == true) {
      _matrixWorld.world.GL.gl.bufferData(_matrixWorld.world.GL.gl.ARRAY_BUFFER, object.geometry.texCoords, _matrixWorld.world.GL.gl.STATIC_DRAW);
    }
    _matrixWorld.world.GL.gl.vertexAttribPointer(object.shaderProgram.textureCoordAttribute, object.vertexTexCoordBuffer.itemSize, _matrixWorld.world.GL.gl.FLOAT, false, 0, 0);
    _matrixWorld.world.GL.gl.enableVertexAttribArray(object.shaderProgram.textureCoordAttribute);
    if (object.streamTextures != null) {
      // video/webcam tex
      // App.tools.loadVideoTexture('glVideoTexture', object.streamTextures.videoImage);
      if (object.streamTextures.video) {
        _manifest.default.tools.loadVideoTexture('glVideoTexture', object.streamTextures.video);
      } else {
        _manifest.default.tools.loadVideoTexture('glVideoTexture', object.streamTextures.videoImage);
      }
      _matrixWorld.world.GL.gl.uniform1i(object.shaderProgram.samplerUniform, 0);
    } else if (object.FBO) {
      // test FBO
      // spot light test light
      // Fbo staff
      _matrixWorld.world.GL.gl.activeTexture(_matrixWorld.world.GL.gl.TEXTURE0);
      _matrixWorld.world.GL.gl.bindTexture(_matrixWorld.world.GL.gl.TEXTURE_2D, object.FBO.FB.texture);
      _matrixWorld.world.GL.gl.uniform1i(object.shaderProgram.samplerUniform, 0);

      // // shadow staff dev
      // var target = [0, 0, 0];
      // var up = [0, 1, 0];
      // // var lmat = m4.lookAt(object.shadows.lightPosition, target, up);
      // var lmat = m4.lookAt([0, 2, 0], target, up);

      // const viewMatrix = m4.inverse(lmat);
      // // first draw from the POV of the light
      // const lightWorldMatrix = m4.lookAt(
      //   [object.FBO.settings.posX, object.FBO.settings.posY, object.FBO.settings.posZ],          // position
      //   [object.FBO.settings.targetX, object.FBO.settings.targetY, object.FBO.settings.targetZ], // target
      //   [0, 1, 0],                                              // up
      // );
      // const lightProjectionMatrix = object.FBO.settings.perspective
      //   ? m4.perspective(
      //     degToRad(object.FBO.settings.fieldOfView),
      //     object.FBO.settings.projWidth / object.FBO.settings.projHeight,
      //     0.5,  // near
      //     10)   // far
      //   : m4.orthographic(
      //     -object.FBO.settings.projWidth / 2,   // left
      //     object.FBO.settings.projWidth / 2,   // right
      //     -object.FBO.settings.projHeight / 2,  // bottom
      //     object.FBO.settings.projHeight / 2,  // top
      //     0.5,                      // near
      //     10);                      // far

      // // draw to the depth texture
      // world.GL.gl.bindFramebuffer(world.GL.gl.FRAMEBUFFER, object.shadows.depthFramebuffer);
      // world.GL.gl.bindTexture(world.GL.gl.TEXTURE_2D, object.shadows.checkerboardTexture);
      // world.GL.gl.viewport(0, 0, 512, 512);
      // world.GL.gl.clear(world.GL.gl.COLOR_BUFFER_BIT | world.GL.gl.DEPTH_BUFFER_BIT);

      // draw 
      // let textureMatrix = m4.identity();
      // textureMatrix = m4.translate(textureMatrix, 0.5, 0.5, 0.5);
      // textureMatrix = m4.scale(textureMatrix, 0.5, 0.5, 0.5);
      // textureMatrix = m4.multiply(textureMatrix, lightProjectionMatrix);
      // textureMatrix = m4.multiply(
      //   textureMatrix,
      //   m4.inverse(lightWorldMatrix));

      // world.GL.gl.uniform4fv(object.shaderProgram.u_textureMatrix, textureMatrix);
      // world.GL.gl.uniform1f(object.shaderProgram.u_bias, object.FBO.settings.bias);
    } else {
      for (var t = 0; t < object.textures.length; t++) {
        if (object.custom.gl_texture == null) {
          _matrixWorld.world.GL.gl.activeTexture(_matrixWorld.world.GL.gl['TEXTURE' + t]);
          _matrixWorld.world.GL.gl.bindTexture(_matrixWorld.world.GL.gl.TEXTURE_2D, object.textures[t]);
          _matrixWorld.world.GL.gl.pixelStorei(_matrixWorld.world.GL.gl.UNPACK_FLIP_Y_WEBGL, false);
          if (object.texParams.MIPMAP == false) {
            _matrixWorld.world.GL.gl.texParameteri(_matrixWorld.world.GL.gl.TEXTURE_2D, _matrixWorld.world.GL.gl.TEXTURE_WRAP_S, object.texParams.TEXTURE_WRAP_S | _matrixWorld.world.GL.gl.REPEAT);
            _matrixWorld.world.GL.gl.texParameteri(_matrixWorld.world.GL.gl.TEXTURE_2D, _matrixWorld.world.GL.gl.TEXTURE_WRAP_T, object.texParams.TEXTURE_WRAP_T | _matrixWorld.world.GL.gl.REPEAT);
            // -- Allocate storage for the texture
            // world.GL.gl.texStorage2D(world.GL.gl.TEXTURE_2D, 1, world.GL.gl.RGB8, 512, 512);
            // world.GL.gl.texSubImage2D(world.GL.gl.TEXTURE_2D, 0, 0, 0,512, 512, world.GL.gl.RGB, world.GL.gl.UNSIGNED_BYTE, object.textures[t]);
          } else {
            _matrixWorld.world.GL.gl.texParameteri(_matrixWorld.world.GL.gl.TEXTURE_2D, _matrixWorld.world.GL.gl.TEXTURE_MAG_FILTER, object.texParams.TEXTURE_MAG_FILTER | _matrixWorld.world.GL.gl.LINEAR);
            _matrixWorld.world.GL.gl.texParameteri(_matrixWorld.world.GL.gl.TEXTURE_2D, _matrixWorld.world.GL.gl.TEXTURE_MIN_FILTER, object.texParams.TEXTURE_MIN_FILTER | _matrixWorld.world.GL.gl.LINEAR);
            _matrixWorld.world.GL.gl.generateMipmap(_matrixWorld.world.GL.gl.TEXTURE_2D);
          }
          if (_matrixWorld.world.GL.extTFAnisotropic && object.texParams.ANISOTROPIC == true) {
            _matrixWorld.world.GL.gl.texParameterf(_matrixWorld.world.GL.gl.TEXTURE_2D, _matrixWorld.world.GL.extTFAnisotropic.TEXTURE_MAX_ANISOTROPY_EXT, _matrixWorld.world.GL.MAX_TEXTURE_MAX_ANISOTROPY_EXT);
          }

          //console.log('TEST' , object.texParams)
          _matrixWorld.world.GL.gl.uniform1i(object.shaderProgram.samplerUniform, t);
        } else {
          object.custom.gl_texture(object, t);
        }
      }
    }
    localLooper = localLooper + 1;
  } else {
    if (object.shaderProgram.samplerUniform) {
      _matrixWorld.world.GL.gl.uniform1i(object.shaderProgram.samplerUniform, 0);
    } else if (object.shaderProgram.uCubeMapSampler) {
      // CUBE MAP
      _matrixWorld.world.GL.gl.activeTexture(_matrixWorld.world.GL.gl['TEXTURE0']);
      var gl = _matrixWorld.world.GL.gl;
      if (!object.tex) object.tex = gl.createTexture();
      gl.bindTexture(gl.TEXTURE_CUBE_MAP, object.tex);
      if (object.cubeMap.type == 'images') {
        object.cubeMap.cubeMap2dCanvasSet.forEach((faceInfo, index) => {
          const level = 0;
          const internalFormat = gl.RGBA;
          const format = gl.RGBA;
          const type = gl.UNSIGNED_BYTE;
          gl.texImage2D(faceInfo.target, level, internalFormat, format, type, object.cubeMap.images[index]);
          gl.pixelStorei(_matrixWorld.world.GL.gl.UNPACK_FLIP_Y_WEBGL, false);
        });
      } else {
        object.cubeMap.cubeMap2dCanvasSet.forEach((faceInfo, index) => {
          var args = [];
          for (var key in faceInfo) {
            if (key !== 'target') {
              args.push(faceInfo[key]);
            }
          }
          if (object.cubeMap.drawFunc) {
            object.cubeMap.drawFunc(args);
          } else {
            const {
              faceColor,
              textColor,
              text
            } = faceInfo;
            (0, _utility.gen2DTextFace)(object.cubeMap.cubeMap2dCtx, faceColor, textColor, text);
          }
          const level = 0;
          const internalFormat = gl.RGBA;
          const format = gl.RGBA;
          const type = gl.UNSIGNED_BYTE;
          gl.texImage2D(faceInfo.target, level, internalFormat, format, type, object.cubeMap.cubeMap2dCtx.canvas);
          gl.pixelStorei(_matrixWorld.world.GL.gl.UNPACK_FLIP_Y_WEBGL, false);
        });
      }
      gl.generateMipmap(gl.TEXTURE_CUBE_MAP);
      gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);
      _matrixWorld.world.GL.gl.uniform1i(object.shaderProgram.uCubeMapSampler, 0);
    }
  }
  _matrixWorld.world.GL.gl.bindBuffer(_matrixWorld.world.GL.gl.ELEMENT_ARRAY_BUFFER, object.vertexIndexBuffer);
  _matrixWorld.world.setMatrixUniforms(object, this.pMatrix, object.mvMatrix);

  // Shadows
  if (object.shadows && object.shadows.type == 'spot' || object.shadows && object.shadows.type == 'spot-shadow') {
    // set the light position
    _matrixWorld.world.GL.gl.uniform3fv(object.shaderProgram.lightWorldPositionLocation, object.shadows.lightPosition);
    _matrixWorld.world.GL.gl.uniform3fv(object.shaderProgram.viewWorldPositionLocation, object.shadows.lightPosition);
    _matrixWorld.world.GL.gl.uniform1f(object.shaderProgram.shininessLocation, object.shadows.shininess);
    // Set the spotlight uniforms
    {
      var target = [0, 0, 0]; // object.position.worldLocation;
      var up = [0, 1, 0];
      var lmat = m4.lookAt(object.shadows.lightPosition, target, up);
      // var lmat = m4.lookAt(object.position.worldLocation, target, up);
      lmat = m4.multiply(m4.xRotation(object.shadows.lightRotationX), lmat);
      lmat = m4.multiply(m4.yRotation(object.shadows.lightRotationY), lmat);
      // get the zAxis from the matrix
      // negate it because lookAt looks down the -Z axis
      object.shadows.lightDirection = [-lmat[8], -lmat[9], -lmat[10]];
      // object.shadows.lightDirection = [-0, -0, -1];
    }
    _matrixWorld.world.GL.gl.uniform3fv(object.shaderProgram.lightDirectionLocation, object.shadows.lightDirection);
    _matrixWorld.world.GL.gl.uniform1f(object.shaderProgram.innerLimitLocation, Math.cos(object.shadows.innerLimit));
    _matrixWorld.world.GL.gl.uniform1f(object.shaderProgram.outerLimitLocation, Math.cos(object.shadows.outerLimit));
  } else if (object.shadows && object.shadows.type == 'spec') {
    // global position
    _matrixWorld.world.GL.gl.uniform3fv(object.shaderProgram.specularColor, object.shadows.specularDATA);
    _matrixWorld.world.GL.gl.uniform3fv(object.shaderProgram.uLightPosition, _matrixWorld.world.uLightPosition);
  } else if (object.shadows && object.shadows.type == 'lens') {
    // Lens
    _matrixWorld.world.GL.gl.uniform3fv(object.shaderProgram.uLightPosition, _matrixWorld.world.uLightPosition);
    _matrixWorld.world.GL.gl.uniform3fv(object.shaderProgram.uControl, object.shadows.uControl);
    _matrixWorld.world.GL.gl.uniform3fv(object.shaderProgram.uResolution, object.shadows.uResolution);
  }
  if (object.vertexNormalBuffer && object.shaderProgram.nMatrixUniform) {
    var normalMatrix = mat3.create();
    mat3.normalFromMat4(normalMatrix, object.mvMatrix);
    mat3.transpose(normalMatrix, normalMatrix);
    _matrixWorld.world.GL.gl.uniformMatrix3fv(object.shaderProgram.nMatrixUniform, false, normalMatrix);
  }

  // world.disableUnusedAttr(world.GL.gl, localLooper);
  // FIX FOR MOBILE - from white cube to normal texture view , good
  _matrixWorld.world.disableUnusedAttr(_matrixWorld.world.GL.gl, 4);
  if (object.glBlend.blendEnabled == true) {
    if (!_matrixWorld.world.GL.gl.isEnabled(_matrixWorld.world.GL.gl.BLEND)) {
      _matrixWorld.world.GL.gl.enable(_matrixWorld.world.GL.gl.BLEND);
    }
    _matrixWorld.world.GL.gl.blendFunc(_matrixWorld.world.GL.gl[object.glBlend.blendParamSrc], _matrixWorld.world.GL.gl[object.glBlend.blendParamDest]);
  } else {
    _matrixWorld.world.GL.gl.disable(_matrixWorld.world.GL.gl.BLEND);
    _matrixWorld.world.GL.gl.enable(_matrixWorld.world.GL.gl.DEPTH_TEST);
    // TEST world.GL.gl.enable(world.GL.gl.CULL_FACE);
  }
  _matrixWorld.world.GL.gl.drawElements(_matrixWorld.world.GL.gl[object.glDrawElements.mode], object.glDrawElements.numberOfIndicesRender, _matrixWorld.world.GL.gl.UNSIGNED_SHORT, 0);
  object.instancedDraws.overrideDrawArraysInstance(object);
  this.mvPopMatrix(object.mvMatrix, this.mvMatrixStack);
};
_manifest.default.operation.draws.piramide = function (object, ray) {
  mat4.identity(object.mvMatrix);
  _matrixWorld.world.mvPushMatrix(object.mvMatrix, this.mvMatrixStack);
  if (_manifest.default.camera.FirstPersonController == true) {
    _events.camera.setCamera(object);
  } else if (_manifest.default.camera.SceneController == true) {
    _events.camera.setSceneCamera(object);
  }
  mat4.translate(object.mvMatrix, object.mvMatrix, object.position.worldLocation);
  if (raycaster.checkingProcedureCalc && typeof ray === 'undefined') raycaster.checkingProcedureCalc(object);
  mat4.rotate(object.mvMatrix, object.mvMatrix, (0, _engine.degToRad)(object.rotation.rx), object.rotation.getRotDirX());
  mat4.rotate(object.mvMatrix, object.mvMatrix, (0, _engine.degToRad)(object.rotation.ry), object.rotation.getRotDirY());
  mat4.rotate(object.mvMatrix, object.mvMatrix, (0, _engine.degToRad)(object.rotation.rz), object.rotation.getRotDirZ());
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
    }
    // world.GL.gl.blendColor ( 1,1,1,0.5)
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
_manifest.default.operation.draws.square = function (object, ray) {
  mat4.identity(object.mvMatrix);
  _matrixWorld.world.mvPushMatrix(object.mvMatrix, _matrixWorld.world.mvMatrixStack);
  if (_manifest.default.camera.FirstPersonController == true) {
    _events.camera.setCamera(object);
  } else if (_manifest.default.camera.SceneController == true) {
    _events.camera.setSceneCamera(object);
  }
  mat4.translate(object.mvMatrix, object.mvMatrix, object.position.worldLocation);
  if (raycaster.checkingProcedureCalc && typeof ray === 'undefined') raycaster.checkingProcedureCalc(object);
  mat4.rotate(object.mvMatrix, object.mvMatrix, (0, _engine.degToRad)(object.rotation.rx), object.rotation.getRotDirX());
  mat4.rotate(object.mvMatrix, object.mvMatrix, (0, _engine.degToRad)(object.rotation.ry), object.rotation.getRotDirY());
  mat4.rotate(object.mvMatrix, object.mvMatrix, (0, _engine.degToRad)(object.rotation.rz), object.rotation.getRotDirZ());
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
    }
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
_manifest.default.operation.draws.triangle = function (object, ray) {
  mat4.identity(object.mvMatrix);
  _matrixWorld.world.mvPushMatrix(object.mvMatrix, this.mvMatrixStack);
  if (_manifest.default.camera.FirstPersonController == true) {
    _events.camera.setCamera(object);
  } else if (_manifest.default.camera.SceneController == true) {
    _events.camera.setSceneCamera(object);
  }
  mat4.translate(object.mvMatrix, object.mvMatrix, object.position.worldLocation);
  if (raycaster.checkingProcedureCalc && typeof ray === 'undefined') raycaster.checkingProcedureCalc(object);
  mat4.rotate(object.mvMatrix, object.mvMatrix, (0, _engine.degToRad)(object.rotation.rx), object.rotation.getRotDirX());
  mat4.rotate(object.mvMatrix, object.mvMatrix, (0, _engine.degToRad)(object.rotation.ry), object.rotation.getRotDirY());
  mat4.rotate(object.mvMatrix, object.mvMatrix, (0, _engine.degToRad)(object.rotation.rz), object.rotation.getRotDirZ());
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
    }
    // world.GL.gl.blendColor( 1.0 , 1.0, 1.0, 0.3 );
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
_manifest.default.operation.draws.drawObj = function (object, ray) {
  var lighting = 1;
  var localLooper = 0;
  lighting = true;
  mat4.identity(object.mvMatrix);
  _matrixWorld.world.mvPushMatrix(object.mvMatrix, this.mvMatrixStack);
  if (object.isHUD === true) {
    mat4.translate(object.mvMatrix, object.mvMatrix, object.position.worldLocation);
    mat4.rotate(object.mvMatrix, object.mvMatrix, (0, _engine.degToRad)(object.rotation.rx), object.rotation.getRotDirX());
    mat4.rotate(object.mvMatrix, object.mvMatrix, (0, _engine.degToRad)(object.rotation.ry), object.rotation.getRotDirY());
    mat4.rotate(object.mvMatrix, object.mvMatrix, (0, _engine.degToRad)(object.rotation.rz), object.rotation.getRotDirZ());
    if (raycaster.checkingProcedureCalc && typeof ray === 'undefined') raycaster.checkingProcedureCalcObj(object);
  } else {
    if (_manifest.default.camera.FirstPersonController == true) {
      _events.camera.setCamera(object);
    } else if (_manifest.default.camera.SceneController == true) {
      _events.camera.setSceneCamera(object);
    }
    mat4.translate(object.mvMatrix, object.mvMatrix, object.position.worldLocation);
    if (raycaster.checkingProcedureCalc && typeof ray === 'undefined') raycaster.checkingProcedureCalcObj(object);
    mat4.rotate(object.mvMatrix, object.mvMatrix, (0, _engine.degToRad)(object.rotation.rx), object.rotation.getRotDirX());
    mat4.rotate(object.mvMatrix, object.mvMatrix, (0, _engine.degToRad)(object.rotation.ry), object.rotation.getRotDirY());
    mat4.rotate(object.mvMatrix, object.mvMatrix, (0, _engine.degToRad)(object.rotation.rz), object.rotation.getRotDirZ());
  }
  if (typeof object.mesh.vertexBuffer != 'undefined') {
    if (object.animation != null) {
      object.animation.currentDraws++;
      if (typeof object.animation.anims === 'undefined' && object.animation.currentDraws > object.animation.speed) {
        object.animation.currentAni++;
        object.animation.currentDraws = 0;
        if (object.animation.currentAni > object.animation.sumOfAniFrames) {
          object.animation.currentAni = 0;
        }
      }

      // Make animation sequences -> sub animation
      if (typeof object.animation.anims !== 'undefined') {
        if (object.animation.currentDraws > object.animation.anims[object.animation.anims.active].speed) {
          object.animation.currentAni++;
          object.animation.currentDraws = 0;
          if (object.animation.currentAni > object.animation.anims[object.animation.anims.active].to - 1) {
            object.animation.currentAni = object.animation.anims[object.animation.anims.active].from;
          }
        }
      }
      if (object.animation.currentAni == 0) {
        _matrixWorld.world.GL.gl.bindBuffer(_matrixWorld.world.GL.gl.ARRAY_BUFFER, object.meshList[object.animation.id].vertexBuffer);
        _matrixWorld.world.GL.gl.vertexAttribPointer(object.shaderProgram.vertexPositionAttribute, object.meshList[object.animation.id].vertexBuffer.itemSize, _matrixWorld.world.GL.gl.FLOAT, false, 0, 0);
      } else {
        _matrixWorld.world.GL.gl.bindBuffer(_matrixWorld.world.GL.gl.ARRAY_BUFFER, object.meshList[object.animation.id + object.animation.currentAni].vertexBuffer);
        _matrixWorld.world.GL.gl.vertexAttribPointer(object.shaderProgram.vertexPositionAttribute, object.meshList[object.animation.id + object.animation.currentAni].vertexBuffer.itemSize, _matrixWorld.world.GL.gl.FLOAT, false, 0, 0);
      }
    } else {
      // now to render the mesh test
      _matrixWorld.world.GL.gl.bindBuffer(_matrixWorld.world.GL.gl.ARRAY_BUFFER, object.mesh.vertexBuffer);
      _matrixWorld.world.GL.gl.bufferData(_matrixWorld.world.GL.gl.ARRAY_BUFFER, object.mesh.vertices, _matrixWorld.world.GL.gl.STATIC_DRAW);
      _matrixWorld.world.GL.gl.vertexAttribPointer(object.shaderProgram.vertexPositionAttribute, object.mesh.vertexBuffer.itemSize, _matrixWorld.world.GL.gl.FLOAT, false, 0, 0);
    }
  }

  // COLOR BUFFER
  // if (object.vertexColorBuffer) {
  //     world.GL.gl.bindBuffer( world.GL.gl.ARRAY_BUFFER, object.vertexColorBuffer);
  //     world.GL.gl.vertexAttribPointer(object.shaderProgram.vertexColorAttribute, object.vertexColorBuffer.itemSize,  world.GL.gl.FLOAT, false, 0, 0);
  //     world.GL.gl.enableVertexAttribArray(object.shaderProgram.vertexColorAttribute);
  //     localLooper = localLooper + 1;
  //   }

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
  }

  // it's possible that the mesh doesn't contain any texture coordinates
  // in this case, the texture vertexAttribArray will need to be disabled
  // before the call to drawElements
  if (!object.mesh.textures.length && !object.texture) {
    //  world.GL.gl.disableVertexAttribArray(object.shaderProgram.textureCoordAttribute);
  } else {
    // if the texture vertexAttribArray has been previously
    // disabled, then it needs to be re-enabled
    if (object.texture) {
      _matrixWorld.world.GL.gl.bindBuffer(_matrixWorld.world.GL.gl.ARRAY_BUFFER, object.mesh.textureBuffer);
      _matrixWorld.world.GL.gl.enableVertexAttribArray(object.shaderProgram.textureCoordAttribute);
      _matrixWorld.world.GL.gl.vertexAttribPointer(object.shaderProgram.textureCoordAttribute, object.mesh.textureBuffer.itemSize, _matrixWorld.world.GL.gl.FLOAT, false, 0, 0);
      //ori world.GL.gl.activeTexture(world.GL.gl.TEXTURE0);
      // ori world.GL.gl.bindTexture(world.GL.gl.TEXTURE_2D, object.texture);

      if (object.streamTextures != null) {
        // video/webcam tex
        if (object.streamTextures.video) {
          // App.tools.loadVideoTexture('glVideoTexture', object.streamTextures.videoImage);
          _manifest.default.tools.loadVideoTexture('glVideoTexture', object.streamTextures.video);
        } else {
          _manifest.default.tools.loadVideoTexture('glVideoTexture', object.streamTextures.videoImage);
        }
        _matrixWorld.world.GL.gl.uniform1i(object.shaderProgram.samplerUniform, 0);
      } else if (object.FBO) {
        // Fbo staff
        // if(!object.FBO.FB) {
        //   object.FBO = {
        //     name: object.name
        //   };
        //   object.FBO.FB = makeFBO(world.GL.gl, object);
        //   object.FBO.settings = {
        //     cameraX: 6,
        //     cameraY: 5,
        //     posX: 2.5,
        //     posY: 4.8,
        //     posZ: 4.3,
        //     targetX: 2.5,
        //     targetY: 0,
        //     targetZ: 3.5,
        //     projWidth: 1,
        //     projHeight: 1,
        //     perspective: true,
        //     fieldOfView: 120,
        //     bias: -0.006,
        //   };
        //   world.FBOS.push(object.FBO);
        // }
        _matrixWorld.world.GL.gl.activeTexture(_matrixWorld.world.GL.gl.TEXTURE0);
        _matrixWorld.world.GL.gl.bindTexture(_matrixWorld.world.GL.gl.TEXTURE_2D, object.FBO.FB.texture);
        _matrixWorld.world.GL.gl.uniform1i(object.shaderProgram.samplerUniform, 0);

        // shadow staff
        // var target = [0, 0, 0];
        // var up = [0, 1, 0];
        // var lmat = m4.lookAt([0, 1, 0], target, up);

        // const viewMatrix = m4.inverse(lmat);
        // // first draw from the POV of the light
        // const lightWorldMatrix = m4.lookAt(
        //   [object.FBO.settings.posX, object.FBO.settings.posY, object.FBO.settings.posZ],          // position
        //   [object.FBO.settings.targetX, object.FBO.settings.targetY, object.FBO.settings.targetZ], // target
        //   [0, 1, 0],                                              // up
        // );
        // const lightProjectionMatrix = object.FBO.settings.perspective
        //   ? m4.perspective(
        //     degToRad(object.FBO.settings.fieldOfView),
        //     object.FBO.settings.projWidth / object.FBO.settings.projHeight,
        //     0.5,  // near
        //     10)   // far
        //   : m4.orthographic(
        //     -object.FBO.settings.projWidth / 2,   // left
        //     object.FBO.settings.projWidth / 2,   // right
        //     -object.FBO.settings.projHeight / 2,  // bottom
        //     object.FBO.settings.projHeight / 2,  // top
        //     0.5,                      // near
        //     10);                      // far

        // // // draw to the depth texture
        // // world.GL.gl.bindFramebuffer(world.GL.gl.FRAMEBUFFER, object.shadows.depthFramebuffer);
        // // world.GL.gl.bindTexture(world.GL.gl.TEXTURE_2D, object.shadows.checkerboardTexture);
        // // world.GL.gl.viewport(0, 0, 512, 512);
        // // world.GL.gl.clear(world.GL.gl.COLOR_BUFFER_BIT | world.GL.gl.DEPTH_BUFFER_BIT);

        // // draw 
        // let textureMatrix = m4.identity();
        // textureMatrix = m4.translate(textureMatrix, 0.5, 0.5, 0.5);
        // textureMatrix = m4.scale(textureMatrix, 0.5, 0.5, 0.5);
        // textureMatrix = m4.multiply(textureMatrix, lightProjectionMatrix);
        // textureMatrix = m4.multiply(
        //   textureMatrix,
        //   m4.inverse(lightWorldMatrix));

        // world.GL.gl.uniform4fv(object.shaderProgram.u_textureMatrix, textureMatrix);
        // world.GL.gl.uniform1f(object.shaderProgram.u_bias, object.FBO.settings.bias);
      } else {
        for (var t = 0; t < object.textures.length; t++) {
          _matrixWorld.world.GL.gl.activeTexture(_matrixWorld.world.GL.gl['TEXTURE' + t]);
          _matrixWorld.world.GL.gl.bindTexture(_matrixWorld.world.GL.gl.TEXTURE_2D, object.textures[t]);
          _matrixWorld.world.GL.gl.pixelStorei(_matrixWorld.world.GL.gl.UNPACK_FLIP_Y_WEBGL, false);
          _matrixWorld.world.GL.gl.texParameteri(_matrixWorld.world.GL.gl.TEXTURE_2D, _matrixWorld.world.GL.gl.TEXTURE_MAG_FILTER, _matrixWorld.world.GL.gl.NEAREST);
          _matrixWorld.world.GL.gl.texParameteri(_matrixWorld.world.GL.gl.TEXTURE_2D, _matrixWorld.world.GL.gl.TEXTURE_MIN_FILTER, _matrixWorld.world.GL.gl.NEAREST);
          _matrixWorld.world.GL.gl.texParameteri(_matrixWorld.world.GL.gl.TEXTURE_2D, _matrixWorld.world.GL.gl.TEXTURE_WRAP_S, _matrixWorld.world.GL.gl.CLAMP_TO_EDGE);
          _matrixWorld.world.GL.gl.texParameteri(_matrixWorld.world.GL.gl.TEXTURE_2D, _matrixWorld.world.GL.gl.TEXTURE_WRAP_T, _matrixWorld.world.GL.gl.CLAMP_TO_EDGE);

          // -- Allocate storage for the texture
          //world.GL.gl.texStorage2D(world.GL.gl.TEXTURE_2D, 1, world.GL.gl.RGB8, 512, 512);
          //world.GL.gl.texSubImage2D(world.GL.gl.TEXTURE_2D, 0, 0, 0, world.GL.gl.RGB, world.GL.gl.UNSIGNED_BYTE, image);
          //world.GL.gl.generateMipmap(world.GL.gl.TEXTURE_2D);
          _matrixWorld.world.GL.gl.uniform1i(object.shaderProgram.samplerUniform, t);
        }
      }
      // world.GL.gl.uniform1i(object.shaderProgram.samplerUniform, 0);
      localLooper = localLooper + 1;
    } else {
      // world.GL.gl.disableVertexAttribArray(object.shaderProgram.textureCoordAttribute);
    }
  }

  // Normals normalBuffer
  //  world.GL.gl.bindBuffer(world.GL.gl.ARRAY_BUFFER, object.mesh.normalBuffer);
  //  world.GL.gl.vertexAttribPointer(object.shaderProgram.vertexNormalAttribute, object.mesh.normalBuffer.itemSize, world.GL.gl.FLOAT, false, 0, 0);

  if (object.mesh.normalBuffer && object.shaderProgram.nMatrixUniform) {
    var normalMatrix = mat3.create();
    mat3.normalFromMat4(normalMatrix, object.mvMatrix);
    mat3.transpose(normalMatrix, normalMatrix);
    _matrixWorld.world.GL.gl.uniformMatrix3fv(object.shaderProgram.nMatrixUniform, false, normalMatrix);
  }
  _matrixWorld.world.GL.gl.bindBuffer(_matrixWorld.world.GL.gl.ELEMENT_ARRAY_BUFFER, object.mesh.indexBuffer);
  this.setMatrixUniforms(object, this.pMatrix, object.mvMatrix);

  // Shadows
  if (object.shadows && object.shadows.type == 'spot' || object.shadows && object.shadows.type == 'spot-shadow') {
    // set the light position
    _matrixWorld.world.GL.gl.uniform3fv(object.shaderProgram.lightWorldPositionLocation, object.shadows.lightPosition);
    _matrixWorld.world.GL.gl.uniform3fv(object.shaderProgram.viewWorldPositionLocation, object.shadows.lightPosition);
    _matrixWorld.world.GL.gl.uniform1f(object.shaderProgram.shininessLocation, object.shadows.shininess);
    // Set the spotlight uniforms
    {
      var target = [0, 0, 0]; // object.position.worldLocation;
      var up = [0, 1, 0];
      var lmat = m4.lookAt(object.shadows.lightPosition, target, up);
      // var lmat = m4.lookAt(object.position.worldLocation, target, up);
      lmat = m4.multiply(m4.xRotation(object.shadows.lightRotationX), lmat);
      lmat = m4.multiply(m4.yRotation(object.shadows.lightRotationY), lmat);
      // get the zAxis from the matrix
      // negate it because lookAt looks down the -Z axis
      object.shadows.lightDirection = [-lmat[8], -lmat[9], -lmat[10]];
      // object.shadows.lightDirection = [-0, -0, -1];
    }
    _matrixWorld.world.GL.gl.uniform3fv(object.shaderProgram.lightDirectionLocation, object.shadows.lightDirection);
    _matrixWorld.world.GL.gl.uniform1f(object.shaderProgram.innerLimitLocation, Math.cos(object.shadows.innerLimit));
    _matrixWorld.world.GL.gl.uniform1f(object.shaderProgram.outerLimitLocation, Math.cos(object.shadows.outerLimit));
  } else if (object.shadows && object.shadows.type == 'spec') {
    // global position
    _matrixWorld.world.GL.gl.uniform3fv(object.shaderProgram.specularColor, object.shadows.specularDATA);
    _matrixWorld.world.GL.gl.uniform3fv(object.shaderProgram.uLightPosition, _matrixWorld.world.uLightPosition);
  } else if (object.shadows && object.shadows.type == 'lens') {
    // Lens
    _matrixWorld.world.GL.gl.uniform3fv(object.shaderProgram.uLightPosition, _matrixWorld.world.uLightPosition);
    _matrixWorld.world.GL.gl.uniform3fv(object.shaderProgram.uControl, object.shadows.uControl);
    _matrixWorld.world.GL.gl.uniform3fv(object.shaderProgram.uResolution, object.shadows.uResolution);
  }
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

  // ori this.setMatrixUniforms(object, this.pMatrix, object.mvMatrix);
  _matrixWorld.world.disableUnusedAttr(_matrixWorld.world.GL.gl, localLooper + 1);
  // world.GL.gl.drawElements(world.GL.gl[object.glDrawElements.mode], object.glDrawElements.numberOfIndicesRender, world.GL.gl.UNSIGNED_SHORT, 0);
  // update for anim
  _matrixWorld.world.GL.gl.drawElements(_matrixWorld.world.GL.gl[object.glDrawElements.mode], object.glDrawElements.numberOfIndicesRender, _matrixWorld.world.GL.gl.UNSIGNED_SHORT, 0);
  this.mvPopMatrix(object.mvMatrix, this.mvMatrixStack);
};
_manifest.default.operation.draws.drawSquareTex = function (object, ray) {
  var lighting = true;
  // eslint-disable-next-line no-unused-vars
  var localLooper = 0;
  mat4.identity(object.mvMatrix);
  this.mvPushMatrix(object.mvMatrix, this.mvMatrixStack);
  if (object.isHUD === true) {
    mat4.translate(object.mvMatrix, object.mvMatrix, object.position.worldLocation);
    mat4.rotate(object.mvMatrix, object.mvMatrix, (0, _engine.degToRad)(object.rotation.rx), object.rotation.getRotDirX());
    mat4.rotate(object.mvMatrix, object.mvMatrix, (0, _engine.degToRad)(object.rotation.ry), object.rotation.getRotDirY());
    mat4.rotate(object.mvMatrix, object.mvMatrix, (0, _engine.degToRad)(object.rotation.rz), object.rotation.getRotDirZ());
    if (raycaster.checkingProcedureCalc && typeof ray === 'undefined') raycaster.checkingProcedureCalc(object);
  } else {
    if (_manifest.default.camera.FirstPersonController == true) {
      _events.camera.setCamera(object);
    } else if (_manifest.default.camera.SceneController == true) {
      _events.camera.setSceneCamera(object);
    }
    mat4.translate(object.mvMatrix, object.mvMatrix, object.position.worldLocation);
    if (raycaster.checkingProcedureCalc) raycaster.checkingProcedureCalc(object);
    mat4.rotate(object.mvMatrix, object.mvMatrix, (0, _engine.degToRad)(object.rotation.rz), object.rotation.getRotDirZ());
    mat4.rotate(object.mvMatrix, object.mvMatrix, (0, _engine.degToRad)(object.rotation.rx), object.rotation.getRotDirX());
    mat4.rotate(object.mvMatrix, object.mvMatrix, (0, _engine.degToRad)(object.rotation.ry), object.rotation.getRotDirY());
  }

  // V
  if (object.vertexPositionBuffer) {
    _matrixWorld.world.GL.gl.bindBuffer(_matrixWorld.world.GL.gl.ARRAY_BUFFER, object.vertexPositionBuffer);
    if (object.geometry.dynamicBuffer == true) {
      _matrixWorld.world.GL.gl.bufferData(_matrixWorld.world.GL.gl.ARRAY_BUFFER, object.geometry.vertices, _matrixWorld.world.GL.gl.STATIC_DRAW);
    }
    _matrixWorld.world.GL.gl.vertexAttribPointer(object.shaderProgram.vertexPositionAttribute, object.vertexPositionBuffer.itemSize, _matrixWorld.world.GL.gl.FLOAT, false, 0, 0);
    _matrixWorld.world.GL.gl.enableVertexAttribArray(object.shaderProgram.vertexPositionAttribute);
    localLooper = localLooper + 1;
  }

  // C
  if (object.vertexColorBuffer) {
    _matrixWorld.world.GL.gl.bindBuffer(_matrixWorld.world.GL.gl.ARRAY_BUFFER, object.vertexColorBuffer);
    _matrixWorld.world.GL.gl.vertexAttribPointer(object.shaderProgram.vertexColorAttribute, object.vertexColorBuffer.itemSize, _matrixWorld.world.GL.gl.FLOAT, false, 0, 0);
    _matrixWorld.world.GL.gl.enableVertexAttribArray(object.shaderProgram.vertexColorAttribute);
    localLooper = localLooper + 1;
  }

  // L
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
  }

  // T
  if (object.vertexTexCoordBuffer) {
    _matrixWorld.world.GL.gl.bindBuffer(_matrixWorld.world.GL.gl.ARRAY_BUFFER, object.vertexTexCoordBuffer);
    if (object.geometry.dynamicBuffer == true) {
      _matrixWorld.world.GL.gl.bufferData(_matrixWorld.world.GL.gl.ARRAY_BUFFER, object.geometry.texCoords, _matrixWorld.world.GL.gl.STATIC_DRAW);
    }
    _matrixWorld.world.GL.gl.vertexAttribPointer(object.shaderProgram.textureCoordAttribute, object.vertexTexCoordBuffer.itemSize, _matrixWorld.world.GL.gl.FLOAT, false, 0, 0);
    _matrixWorld.world.GL.gl.enableVertexAttribArray(object.shaderProgram.textureCoordAttribute);
    if (object.streamTextures != null) {
      // video/webcam tex
      if (object.streamTextures.videoImage) {
        _manifest.default.tools.loadVideoTexture('glVideoTexture', object.streamTextures.videoImage);
      } else {
        _manifest.default.tools.loadVideoTexture('glVideoTexture', object.streamTextures.video);
      }
      _matrixWorld.world.GL.gl.uniform1i(object.shaderProgram.samplerUniform, 0);
    } else if (object.FBO) {
      // test FBO
      // Fbo staff
      // if(!object.FBO.FB) {

      //   object.FBO = {
      //     name: object.name
      //   };
      //   object.FBO.FB = makeFBO(world.GL.gl, object);

      //   world.FBOS.push(object.FBO);

      //   object.FBO.settings = {
      //     cameraX: 6,
      //     cameraY: 5,
      //     posX: 2.5,
      //     posY: 4.8,
      //     posZ: 4.3,
      //     targetX: 2.5,
      //     targetY: 0,
      //     targetZ: 3.5,
      //     projWidth: 1,
      //     projHeight: 1,
      //     perspective: true,
      //     fieldOfView: 120,
      //     bias: -0.006,
      //   };

      // }

      _matrixWorld.world.GL.gl.activeTexture(_matrixWorld.world.GL.gl.TEXTURE0);
      _matrixWorld.world.GL.gl.bindTexture(_matrixWorld.world.GL.gl.TEXTURE_2D, object.FBO.FB.texture);
      _matrixWorld.world.GL.gl.uniform1i(object.shaderProgram.samplerUniform, 0);

      // // shadow staff
      // var target = [0, 0, 0];
      // var up = [0, 1, 0];
      // // var lmat = m4.lookAt(object.shadows.lightPosition, target, up);
      // var lmat = m4.lookAt([0, 1, 0], target, up);

      // const viewMatrix = m4.inverse(lmat);
      // // first draw from the POV of the light
      // const lightWorldMatrix = m4.lookAt(
      //   [object.FBO.settings.posX, object.FBO.settings.posY, object.FBO.settings.posZ],          // position
      //   [object.FBO.settings.targetX, object.FBO.settings.targetY, object.FBO.settings.targetZ], // target
      //   [0, 1, 0],                                              // up
      // );
      // const lightProjectionMatrix = object.FBO.settings.perspective
      //   ? m4.perspective(
      //     degToRad(object.FBO.settings.fieldOfView),
      //     object.FBO.settings.projWidth / object.FBO.settings.projHeight,
      //     0.5,  // near
      //     10)   // far
      //   : m4.orthographic(
      //     -object.FBO.settings.projWidth / 2,   // left
      //     object.FBO.settings.projWidth / 2,   // right
      //     -object.FBO.settings.projHeight / 2,  // bottom
      //     object.FBO.settings.projHeight / 2,  // top
      //     0.5,                      // near
      //     10);                      // far

      // // // draw to the depth texture
      // // world.GL.gl.bindFramebuffer(world.GL.gl.FRAMEBUFFER, object.shadows.depthFramebuffer);
      // // world.GL.gl.bindTexture(world.GL.gl.TEXTURE_2D, object.shadows.checkerboardTexture);
      // // world.GL.gl.viewport(0, 0, 512, 512);
      // // world.GL.gl.clear(world.GL.gl.COLOR_BUFFER_BIT | world.GL.gl.DEPTH_BUFFER_BIT);

      // // draw 
      // let textureMatrix = m4.identity();
      // textureMatrix = m4.translate(textureMatrix, 0.5, 0.5, 0.5);
      // textureMatrix = m4.scale(textureMatrix, 0.5, 0.5, 0.5);
      // textureMatrix = m4.multiply(textureMatrix, lightProjectionMatrix);
      // textureMatrix = m4.multiply(
      //   textureMatrix,
      //   m4.inverse(lightWorldMatrix));

      // world.GL.gl.uniform4fv(object.shaderProgram.u_textureMatrix, textureMatrix);
      // world.GL.gl.uniform1f(object.shaderProgram.u_bias, object.FBO.settings.bias);
    } else {
      for (var t = 0; t < object.textures.length; t++) {
        if (object.custom.gl_texture == null) {
          _matrixWorld.world.GL.gl.activeTexture(_matrixWorld.world.GL.gl['TEXTURE' + t]);
          _matrixWorld.world.GL.gl.bindTexture(_matrixWorld.world.GL.gl.TEXTURE_2D, object.textures[t]);
          // world.GL.gl.pixelStorei(world.GL.gl.UNPACK_FLIP_Y_WEBGL, false);
          if (_matrixWorld.world.GL.extTFAnisotropic) {
            _matrixWorld.world.GL.gl.texParameterf(_matrixWorld.world.GL.gl.TEXTURE_2D, _matrixWorld.world.GL.extTFAnisotropic.TEXTURE_MAX_ANISOTROPY_EXT, _matrixWorld.world.GL.MAX_TEXTURE_MAX_ANISOTROPY_EXT);
          }
          _matrixWorld.world.GL.gl.texParameteri(_matrixWorld.world.GL.gl.TEXTURE_2D, _matrixWorld.world.GL.gl.TEXTURE_MAG_FILTER, object.texParams.TEXTURE_MAG_FILTER | _matrixWorld.world.GL.gl.LINEAR);
          _matrixWorld.world.GL.gl.texParameteri(_matrixWorld.world.GL.gl.TEXTURE_2D, _matrixWorld.world.GL.gl.TEXTURE_MIN_FILTER, object.texParams.TEXTURE_MIN_FILTER | _matrixWorld.world.GL.gl.LINEAR);
          // world.GL.gl.texParameteri(world.GL.gl.TEXTURE_2D, world.GL.gl.TEXTURE_WRAP_S, object.texParams.TEXTURE_WRAP_S | world.GL.gl.REPEAT);
          // world.GL.gl.texParameteri(world.GL.gl.TEXTURE_2D, world.GL.gl.TEXTURE_WRAP_T, object.texParams.TEXTURE_WRAP_T | world.GL.gl.REPEAT);

          // -- Allocate storage for the texture
          // world.GL.gl.texStorage2D(world.GL.gl.TEXTURE_2D, 1, world.GL.gl.RGB8, 512, 512);
          // world.GL.gl.texSubImage2D(world.GL.gl.TEXTURE_2D, 0, 0, 0, world.GL.gl.RGB, world.GL.gl.UNSIGNED_BYTE,  object.textures[t]);
          // world.GL.gl.texImage2D(
          //   world.GL.gl.TEXTURE_2D,
          //   0,
          //   world.GL.gl.RGBA,
          //   world.GL.gl.RGBA,
          //   world.GL.gl.UNSIGNED_BYTE,
          //   object.textures[t].image);

          // world.GL.gl.texImage2D(world.GL.gl.TEXTURE_2D, 0, world.GL.gl.RGBA, 512, 512, 0, world.GL.gl.RGBA, world.GL.gl.UNSIGNED_BYTE,  object.textures[t].image);
          _matrixWorld.world.GL.gl.pixelStorei(_matrixWorld.world.GL.gl.UNPACK_FLIP_Y_WEBGL, false);
          if (object.texParams.TEXTURE_MIN_FILTER) {
            _matrixWorld.world.GL.gl.generateMipmap(_matrixWorld.world.GL.gl.TEXTURE_2D);
          }
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

  // world.disableUnusedAttr( world.GL.gl, localLooper);
  _matrixWorld.world.disableUnusedAttr(_matrixWorld.world.GL.gl, 4); // ori

  if (object.glBlend.blendEnabled == true) {
    if (!_matrixWorld.world.GL.gl.isEnabled(_matrixWorld.world.GL.gl.BLEND)) {
      _matrixWorld.world.GL.gl.enable(_matrixWorld.world.GL.gl.BLEND);
    }
    _matrixWorld.world.GL.gl.blendFunc(_matrixWorld.world.GL.gl[object.glBlend.blendParamSrc], _matrixWorld.world.GL.gl[object.glBlend.blendParamDest]);
  } else {
    _matrixWorld.world.GL.gl.disable(_matrixWorld.world.GL.gl.BLEND);
    _matrixWorld.world.GL.gl.enable(_matrixWorld.world.GL.gl.DEPTH_TEST);
    // for non blend
    _matrixWorld.world.GL.gl.depthMask(true);
    // world.GL.gl.enable(world.GL.gl.CULL_FACE);
  }

  // shadows
  if (object.shadows && object.shadows.type == 'spot') {
    // console.log(" SHADOWS -> " , object.shadows)
    _matrixWorld.world.GL.gl.uniform3fv(object.shaderProgram.lightWorldPositionLocation, object.shadows.lightPosition);
    _matrixWorld.world.GL.gl.uniform3fv(object.shaderProgram.viewWorldPositionLocation, object.shadows.lightPosition);
    _matrixWorld.world.GL.gl.uniform1f(object.shaderProgram.shininessLocation, object.shadows.shininess);
    // Set the spotlight uniforms
    {
      var target = [0, 0, 0];
      var up = [0, 1, 0];
      var lmat = m4.lookAt(object.shadows.lightPosition, target, up);
      lmat = m4.multiply(m4.xRotation(object.shadows.lightRotationX), lmat);
      lmat = m4.multiply(m4.yRotation(object.shadows.lightRotationY), lmat);
      object.shadows.lightDirection = [-lmat[8], -lmat[9], -lmat[10]];
      // object.shadows.lightDirection = [-0, -0, -1];
    }
    _matrixWorld.world.GL.gl.uniform3fv(object.shaderProgram.lightDirectionLocation, object.shadows.lightDirection);
    _matrixWorld.world.GL.gl.uniform1f(object.shaderProgram.innerLimitLocation, Math.cos(object.shadows.innerLimit));
    _matrixWorld.world.GL.gl.uniform1f(object.shaderProgram.outerLimitLocation, Math.cos(object.shadows.outerLimit));
    // world.GL.gl.uniform1f(object.shaderProgram.u_projectedTexture, 1);
  } else if (object.shadows && object.shadows.type == 'spec') {
    // global position
    _matrixWorld.world.GL.gl.uniform3fv(object.shaderProgram.specularColor, object.shadows.specularDATA);
    _matrixWorld.world.GL.gl.uniform3fv(object.shaderProgram.uLightPosition, _matrixWorld.world.uLightPosition);
  } else if (object.shadows && object.shadows.type == 'lens') {
    // Lens
    _matrixWorld.world.GL.gl.uniform3fv(object.shaderProgram.uLightPosition, _matrixWorld.world.uLightPosition);
    _matrixWorld.world.GL.gl.uniform3fv(object.shaderProgram.uControl, object.shadows.uControl);
    _matrixWorld.world.GL.gl.uniform3fv(object.shaderProgram.uResolution, object.shadows.uResolution);
  }
  _matrixWorld.world.GL.gl.drawElements(_matrixWorld.world.GL.gl[object.glDrawElements.mode], object.glDrawElements.numberOfIndicesRender, _matrixWorld.world.GL.gl.UNSIGNED_SHORT, 0);
  object.instancedDraws.overrideDrawArraysInstance(object);
  this.mvPopMatrix(object.mvMatrix, this.mvMatrixStack);
};
_manifest.default.operation.draws.sphere = function (object, ray) {
  var lighting = true;
  var localLooper = 0;
  mat4.identity(object.mvMatrix);
  this.mvPushMatrix(object.mvMatrix, this.mvMatrixStack);
  if (_manifest.default.camera.FirstPersonController == true) {
    _events.camera.setCamera(object);
  } else if (_manifest.default.camera.SceneController == true) {
    _events.camera.setSceneCamera(object);
  }

  // no ray for now !!!
  mat4.translate(object.mvMatrix, object.mvMatrix, object.position.worldLocation);
  mat4.rotate(object.mvMatrix, object.mvMatrix, (0, _engine.degToRad)(object.rotation.rx), object.rotation.getRotDirX());
  mat4.rotate(object.mvMatrix, object.mvMatrix, (0, _engine.degToRad)(object.rotation.ry), object.rotation.getRotDirY());
  mat4.rotate(object.mvMatrix, object.mvMatrix, (0, _engine.degToRad)(object.rotation.rz), object.rotation.getRotDirZ());

  // V
  if (object.vertexPositionBuffer) {
    _matrixWorld.world.GL.gl.bindBuffer(_matrixWorld.world.GL.gl.ARRAY_BUFFER, object.vertexPositionBuffer);
    if (object.geometry.dynamicBuffer == true) {
      _matrixWorld.world.GL.gl.bufferData(_matrixWorld.world.GL.gl.ARRAY_BUFFER, object.geometry.vertices, _matrixWorld.world.GL.gl.STATIC_DRAW);
    }
    _matrixWorld.world.GL.gl.vertexAttribPointer(object.shaderProgram.vertexPositionAttribute, object.vertexPositionBuffer.itemSize, _matrixWorld.world.GL.gl.FLOAT, false, 0, 0);
    _matrixWorld.world.GL.gl.enableVertexAttribArray(object.shaderProgram.vertexPositionAttribute);
    localLooper = localLooper + 1;
  }

  // C
  if (object.vertexColorBuffer) {
    _matrixWorld.world.GL.gl.bindBuffer(_matrixWorld.world.GL.gl.ARRAY_BUFFER, object.vertexColorBuffer);
    _matrixWorld.world.GL.gl.vertexAttribPointer(object.shaderProgram.vertexColorAttribute, object.vertexColorBuffer.itemSize, _matrixWorld.world.GL.gl.FLOAT, false, 0, 0);
    _matrixWorld.world.GL.gl.enableVertexAttribArray(object.shaderProgram.vertexColorAttribute);
    localLooper = localLooper + 1;
  }

  // LIGHT
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
  }

  // T
  if (object.vertexTexCoordBuffer) {
    _matrixWorld.world.GL.gl.bindBuffer(_matrixWorld.world.GL.gl.ARRAY_BUFFER, object.vertexTexCoordBuffer);
    if (object.geometry.dynamicBuffer == true) {
      _matrixWorld.world.GL.gl.bufferData(_matrixWorld.world.GL.gl.ARRAY_BUFFER, object.geometry.texCoords, _matrixWorld.world.GL.gl.STATIC_DRAW);
    }
    _matrixWorld.world.GL.gl.vertexAttribPointer(object.shaderProgram.textureCoordAttribute, object.vertexTexCoordBuffer.itemSize, _matrixWorld.world.GL.gl.FLOAT, false, 0, 0);
    _matrixWorld.world.GL.gl.enableVertexAttribArray(object.shaderProgram.textureCoordAttribute);
    if (object.streamTextures != null) {
      if (object.streamTextures.video) {
        _manifest.default.tools.loadVideoTexture('glVideoTextureTorus', object.streamTextures.video);
      } else {
        _manifest.default.tools.loadVideoTexture('glVideoTextureTorus', object.streamTextures.videoImage);
      }
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

  // world.disableUnusedAttr(world.GL.gl, localLooper);
  _matrixWorld.world.disableUnusedAttr(_matrixWorld.world.GL.gl, 4);
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
var _default = exports.default = drawsOperation;

},{"../program/manifest":42,"./engine":4,"./events":5,"./matrix-shadows":16,"./matrix-textures":18,"./matrix-world":19,"./raycast":25,"./utility":31,"cannon":39}],10:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.COLOR = COLOR;
exports.COLOR_ALPHA = COLOR_ALPHA;
exports.sphereVertex = exports.customVertex_1 = exports.customVertex = exports.TriangleVertex = exports.SquareVertex = exports.Scale = exports.RotationVector = exports.Position = exports.Point = exports.PiramideVertex = exports.GeoOfColor = exports.CubeVertex = void 0;
var _manifest = _interopRequireDefault(require("../program/manifest"));
var _utility = require("./utility");
var _engine = require("./engine");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
/**
 * @description
 * Networking is deep integrated in me engine.
 * You can change network driver but this code still works (net interface).
 * Reccommended Net2 new version based on kurento/openvidu server.
 * @author Nikola Lukic
 * @date oct 2024
 */

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
    this.nameUniq = null;
    this.netObjId = null;
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
      emit: false,
      x: 0,
      y: 0,
      z: 0
    };
    this.angle = 0;
    this.axis = {
      x: 0,
      y: 0,
      z: 0
    };

    // this.adapt_quaternion = () => {
    //   this.getRotDirX = () => {
    //     return this.RotationVector;
    //   }

    //   this.getRotDirY = () => {
    //     return this.RotationVector;
    //   }

    //   this.getRotDirZ = () => {
    //     return this.RotationVector;
    //   }
    // }
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
  getDirection() {
    return [this.x, this.y, this.z];
  }
  getDirectionX() {
    return [this.x, 0, 0];
  }
  getDirectionY() {
    return [0, this.y, 0];
  }
  getDirectionZ() {
    return [0, 0, this.z];
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
  rotateX(x, em) {
    this.rotx = x;
    if (typeof em == 'undefined' && _manifest.default.scene[this.nameUniq].net.enable == true) _engine.net.connection.send({
      netRot: {
        x: this.rotx
      },
      netObjId: this.netObjId
    });
  }
  rotateY(y, em) {
    this.roty = y;
    if (typeof em == 'undefined' && _manifest.default.scene[this.nameUniq].net.enable == true) _engine.net.connection.send({
      netRot: {
        y: this.roty
      },
      netObjId: this.netObjId
    });
  }
  rotateZ(z, em) {
    this.rotz = z;
    if (typeof em == 'undefined' && _manifest.default.scene[this.nameUniq].net.enable == true) _engine.net.connection.send({
      netRot: {
        z: this.rotz
      },
      netObjId: this.netObjId
    });
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
 * Powered for multiplayer feature:
 * - position ref to x,y,z
 * New case if you wanna send for some other object from uniq local
 * See example from FPShooter. Explanation : In MultiPlayer mode 
 * local player dont have animation character only gun classic for FPShooters.
 * We project position values on remote computer for our character by different nameUniq (netObjId).
 * Setup of `nameUniq` props done in initial/loading stage.
 */
exports.RotationVector = RotationVector;
class Position {
  constructor(x, y, z) {
    this.nameUniq = null;
    this.netObjId = null;
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
    this.xNetOffset = 0;
    this.yNetOffset = 0;
    this.zNetOffset = 0;
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
      dist = Math.sqrt(tx * tx + ty * ty + tz * tz);
    this.velX = tx / dist * this.thrust;
    this.velY = ty / dist * this.thrust;
    this.velZ = tz / dist * this.thrust;
    if (this.inMove == true) {
      if (dist > this.thrust) {
        this.x += this.velX;
        this.y += this.velY;
        this.z += this.velZ;
        if (_manifest.default.scene[this.nameUniq].net.enable == true) _engine.net.connection.send({
          netPos: {
            x: this.x + this.xNetOffset,
            y: this.y + this.yNetOffset,
            z: this.z + this.zNetOffset
          },
          netObjId: this.netObjId
        });
      } else {
        this.x = this.targetX;
        this.y = this.targetY;
        this.z = this.targetZ;
        this.inMove = false;
        this.onTargetPositionReach();
        if (_manifest.default.scene[this.nameUniq].net.enable == true) _engine.net.connection.send({
          netPos: {
            x: this.x,
            y: this.y,
            z: this.z
          },
          netObjId: this.netObjId
        });
      }
    }
  }
  get worldLocation() {
    return [this.x, this.y, this.z];
  }
  SetX(newx, em) {
    this.x = newx;
    this.targetX = newx;
    this.inMove = false;
    // console.log('test setX net.connection ', net)
    if (typeof em == 'undefined' && _manifest.default.scene[this.nameUniq].net && _manifest.default.scene[this.nameUniq].net.enable == true) {
      _engine.net.connection.send({
        netPos: {
          x: this.x + this.xNetOffset,
          y: this.y + this.yNetOffset,
          z: this.z + this.zNetOffset
        },
        netObjId: this.netObjId
      });
    }
  }
  SetY(newy, em) {
    this.y = newy;
    this.targetY = newy;
    this.inMove = false;
    if (typeof em == 'undefined' && _manifest.default.scene[this.nameUniq].net.enable == true) _engine.net.connection.send({
      netPos: {
        x: this.x + this.xNetOffset,
        y: this.y + this.yNetOffset,
        z: this.z + this.zNetOffset
      },
      netObjId: this.netObjId
    });
  }
  SetZ(newz, em) {
    this.z = newz;
    this.targetZ = newz;
    this.inMove = false;
    if (typeof em == 'undefined' && _manifest.default.scene[this.nameUniq].net.enable == true) _engine.net.connection.send({
      netPos: {
        x: this.x + this.xNetOffset,
        y: this.y + this.yNetOffset,
        z: this.z + this.zNetOffset
      },
      netObjId: this.netObjId
    });
  }
  setPosition(newx, newy, newz) {
    this.x = newx;
    this.y = newy;
    this.z = newz;
    this.targetX = newx;
    this.targetY = newy;
    this.targetZ = newz;
    this.inMove = false;
    if (typeof em == 'undefined' && _manifest.default.scene[this.nameUniq].net && _manifest.default.scene[this.nameUniq].net.enable == true) _engine.net.connection.send({
      netPos: {
        x: this.x + this.xNetOffset,
        y: this.y + this.yNetOffset,
        z: this.z + this.zNetOffset
      },
      netObjId: this.netObjId
    });
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
    if (typeof em === 'undefined') _engine.net.connection.send({
      netScale: {
        scale: scale
      },
      netObjId: this.nameUniq
    });
    if (this.dynamicBuffer == true) return;
    _manifest.default.operation.triangle_buffer_procedure(this.root);
    return "update vertex array prototypical";
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
    this.basePoint = 1.0 * this.size;
    this.basePointNeg = -1.0 * this.size;
    this.dynamicBuffer = true;
    this.texCoordsPoints = {
      right_top: new Point(1.0, 1.0, 0),
      left_top: new Point(0.0, 1.0, 0),
      right_bottom: new Point(1.0, 0.0, 0),
      left_bottom: new Point(0.0, 0.0, 0)
    };
    this.colorData = {};
    this.colorData.parent = this.root;
    // default
    this.colorData.color = [new COLOR_ALPHA(1.0, 0.0, 0.0, 1.0), new COLOR_ALPHA(0.0, 1.0, 0.0, 1.0), new COLOR_ALPHA(0.5, 0.0, 1.0, 1.0), new COLOR_ALPHA(0.5, 0.5, 1.0, 1.0)];
  }
  get vertices() {
    return new Float32Array([this.pointA.X * this.size, this.pointA.Y * this.size, this.pointA.Z, this.pointB.X * this.size, this.pointB.Y * this.size, this.pointB.Z, this.pointC.X * this.size, this.pointC.Y * this.size, this.pointC.Z, this.pointD.X * this.size, this.pointD.Y * this.size, this.pointD.Z]);
  }
  get texCoords() {
    return new Float32Array([this.texCoordsPoints.right_top.X, this.texCoordsPoints.right_top.Y, this.texCoordsPoints.left_top.X, this.texCoordsPoints.left_top.Y, this.texCoordsPoints.right_bottom.X, this.texCoordsPoints.right_bottom.Y, this.texCoordsPoints.left_bottom.X, this.texCoordsPoints.left_bottom.Y]);
  }
  rawIndices = [0, 1, 2, 3, 2, 1];
  get indices() {
    return this.rawIndices;
  }

  // Setters
  setTexCoordScaleFactor(newScaleFactror, em) {
    this.texCoordsPoints.right_top.y = 1 + newScaleFactror;
    this.texCoordsPoints.right_top.x = 1 + newScaleFactror;
    this.texCoordsPoints.left_bottom.x = 0 - newScaleFactror;
    this.texCoordsPoints.left_bottom.y = 0 - newScaleFactror;
    this.texCoordsPoints.left_top.x = 0 - newScaleFactror;
    this.texCoordsPoints.left_top.y = 1 + newScaleFactror;
    this.texCoordsPoints.right_bottom.x = 1 + newScaleFactror;
    this.texCoordsPoints.right_bottom.y = 0 - newScaleFactror;
    if (typeof em == 'undefined' && _manifest.default.scene[this.nameUniq].net && _manifest.default.scene[this.nameUniq].net.enable == true) _engine.net.connection.send({
      texScaleFactor: {
        newScaleFactror: newScaleFactror
      },
      netObjId: this.nameUniq
    });
  }
  setTexCoordScaleXFactor(newScaleFactror, em) {
    this.texCoordsPoints.right_top.y = 1 + newScaleFactror;
    this.texCoordsPoints.left_bottom.y = 0 - newScaleFactror;
    this.texCoordsPoints.left_top.y = 1 + newScaleFactror;
    this.texCoordsPoints.right_bottom.y = 0 - newScaleFactror;
    // if( typeof em === 'undefined') net.connection.send({
    //   texScaleFactor: {newScaleFactror: newScaleFactror},
    //   netObjId: this.nameUniq,
    // });
  }
  setTexCoordScaleYFactor(newScaleFactror, em) {
    this.texCoordsPoints.right_top.x = 1 + newScaleFactror;
    this.texCoordsPoints.left_bottom.x = 0 - newScaleFactror;
    this.texCoordsPoints.left_top.x = 0 - newScaleFactror;
    this.texCoordsPoints.right_bottom.x = 1 + newScaleFactror;
    // if( typeof em === 'undefined') net.connection.send({
    //   texScaleFactor: {newScaleFactror: newScaleFactror},
    //   netObjId: this.nameUniq,
    // });
  }
  setScaleByX(scale, em) {
    this.pointA.x = scale;
    this.pointB.x = -scale;
    this.pointC.x = scale;
    this.pointD.x = -scale;
    if (_manifest.default.scene[this.nameUniq] && typeof em === 'undefined' && _manifest.default.scene[this.nameUniq].net.enable == true) _engine.net.connection.send({
      netScale: {
        x: scale
      },
      netObjId: this.nameUniq
    });
    if (this.dynamicBuffer == true) return;
    _manifest.default.operation.square_buffer_procedure(this.root);
    return 'update vertex array prototypical';
  }
  setScaleByY(scale, em) {
    this.pointA.y = scale;
    this.pointB.y = scale;
    this.pointC.y = -scale;
    this.pointD.y = -scale;
    if (_manifest.default.scene[this.nameUniq] && typeof em === 'undefined' && _manifest.default.scene[this.nameUniq].net.enable == true) _engine.net.connection.send({
      netScale: {
        y: scale
      },
      netObjId: this.nameUniq
    });
    if (this.dynamicBuffer == true) return;
    _manifest.default.operation.square_buffer_procedure(this.root);
    return 'update vertex array prototypical';
  }
  setScale(scale, em) {
    this.size = scale;
    if (typeof em === 'undefined' && _manifest.default.scene[this.nameUniq].net.enable == true) _engine.net.connection.send({
      netScale: {
        scale: scale
      },
      netObjId: this.nameUniq
    });
    if (this.dynamicBuffer == true) return;
    _manifest.default.operation.square_buffer_procedure(this.root);
    return 'update vertex array prototypical';
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
    this.nameUniq = null;
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
    };

    // for scale by ori
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
  setScaleByX(scale, em) {
    // for scale
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
    if (typeof em === 'undefined') _engine.net.connection.send({
      netScale: {
        x: scale
      },
      netObjId: this.nameUniq
    });
    if (this.dynamicBuffer == true) return;
    _manifest.default.operation.cube_buffer_procedure(this.root);
    return "update vertex array prototypical";
  }
  setScaleByY(scale, em) {
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
    if (typeof em === 'undefined') _engine.net.connection.send({
      netScale: {
        y: scale
      },
      netObjId: this.nameUniq
    });
    if (this.dynamicBuffer == true) return;
    _manifest.default.operation.cube_buffer_procedure(this.root);
    return "update vertex array prototypical";
  }
  setScaleByZ(scale, em) {
    this.Left.pointA.z = -scale;
    this.Left.pointB.z = scale;
    this.Left.pointC.z = scale;
    this.Left.pointD.z = -scale;
    this.Right.pointA.z = -scale;
    this.Right.pointB.z = -scale;
    this.Right.pointC.z = scale;
    this.Right.pointD.z = scale;
    this.Top.pointA.z = -scale;
    this.Top.pointB.z = scale;
    this.Top.pointC.z = scale;
    this.Top.pointD.z = -scale;
    this.Bottom.pointA.z = -scale;
    this.Bottom.pointB.z = -scale;
    this.Bottom.pointC.z = scale;
    this.Bottom.pointD.z = scale;
    this.Front.pointA.z = scale;
    this.Front.pointB.z = scale;
    this.Front.pointC.z = scale;
    this.Front.pointD.z = scale;
    this.Back.pointA.z = -scale;
    this.Back.pointB.z = -scale;
    this.Back.pointC.z = -scale;
    this.Back.pointD.z = -scale;
    if (typeof em === 'undefined') _engine.net.connection.send({
      netScale: {
        z: scale
      },
      netObjId: this.nameUniq
    });
    if (this.dynamicBuffer == true) return;
    _manifest.default.operation.cube_buffer_procedure(this.root);
    return "update vertex array prototypical";
  }
  setScale(scale, em) {
    this.size = scale;
    this.basePoint = 1.0 * this.size;
    this.basePointNeg = -1.0 * this.size;
    if (typeof em === 'undefined' && _manifest.default.scene[this.nameUniq].net.enable == true) _engine.net.connection.send({
      netScale: {
        scale: scale
      },
      netObjId: this.nameUniq
    });
    if (this.dynamicBuffer == true) return;
    _manifest.default.operation.cube_buffer_procedure(this.root);
    return "update vertex array prototypical";
  }
  setTexCoordScaleFactor(newScaleFactror, em) {
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
    if (typeof em == 'undefined' && _manifest.default.scene[this.nameUniq].net && _manifest.default.scene[this.nameUniq].net.enable == true) _engine.net.connection.send({
      texScaleFactor: {
        newScaleFactror: newScaleFactror
      },
      netObjId: this.nameUniq
    });
  }
  setTexCoordScaleYFactor(newScaleFactror, em) {
    function calculate(checkValue) {
      if (checkValue <= 0) {
        return -1;
      } else {
        return 1;
      }
    }
    for (var key in this.texCoordsPoints) {
      // this.texCoordsPoints[key].right_top.y =
      //   this.texCoordsPoints[key].right_top.y +
      //   newScaleFactror * calculate(this.texCoordsPoints[key].right_top.y);
      this.texCoordsPoints[key].right_top.x = this.texCoordsPoints[key].right_top.x + newScaleFactror * calculate(this.texCoordsPoints[key].right_top.x);
      this.texCoordsPoints[key].left_bottom.x = this.texCoordsPoints[key].left_bottom.x + newScaleFactror * calculate(this.texCoordsPoints[key].left_bottom.x);
      // this.texCoordsPoints[key].left_bottom.y =
      //   this.texCoordsPoints[key].left_bottom.y +
      //   newScaleFactror * calculate(this.texCoordsPoints[key].left_bottom.y);
      this.texCoordsPoints[key].left_top.x = this.texCoordsPoints[key].left_top.x + newScaleFactror * calculate(this.texCoordsPoints[key].left_top.x);
      // this.texCoordsPoints[key].left_top.y =
      //   this.texCoordsPoints[key].left_top.y +
      //   newScaleFactror * calculate(this.texCoordsPoints[key].left_top.y);
      this.texCoordsPoints[key].right_bottom.x = this.texCoordsPoints[key].right_bottom.x + newScaleFactror * calculate(this.texCoordsPoints[key].right_bottom.x);
      // this.texCoordsPoints[key].right_bottom.y =
      //   this.texCoordsPoints[key].right_bottom.y +
      //   newScaleFactror * calculate(this.texCoordsPoints[key].right_bottom.y);
    }

    // if( typeof em === 'undefined') net.connection.send({
    //   texScaleFactor: {newScaleFactror: newScaleFactror},
    //   netObjId: this.nameUniq,
    // });
  }
  setTexCoordScaleXFactor(newScaleFactror, em) {
    function calculate(checkValue) {
      if (checkValue <= 0) {
        return -1;
      } else {
        return 1;
      }
    }
    for (var key in this.texCoordsPoints) {
      this.texCoordsPoints[key].right_top.y = this.texCoordsPoints[key].right_top.y + newScaleFactror * calculate(this.texCoordsPoints[key].right_top.y);
      this.texCoordsPoints[key].left_bottom.y = this.texCoordsPoints[key].left_bottom.y + newScaleFactror * calculate(this.texCoordsPoints[key].left_bottom.y);
      this.texCoordsPoints[key].left_top.y = this.texCoordsPoints[key].left_top.y + newScaleFactror * calculate(this.texCoordsPoints[key].left_top.y);
      this.texCoordsPoints[key].right_bottom.y = this.texCoordsPoints[key].right_bottom.y + newScaleFactror * calculate(this.texCoordsPoints[key].right_bottom.y);
    }

    // if( typeof em === 'undefined') net.connection.send({
    //   texScaleFactor: {newScaleFactror: newScaleFactror},
    //   netObjId: this.nameUniq,
    // });
  }
  get vertices() {
    return new Float32Array([
    // Front face
    this.basePointNeg + this.Front.pointA.X, this.basePointNeg + this.Front.pointA.Y, this.basePoint + this.Front.pointA.Z, this.basePoint + this.Front.pointB.X, this.basePointNeg + this.Front.pointB.Y, this.basePoint + this.Front.pointB.Z, this.basePoint + this.Front.pointC.X, this.basePoint + this.Front.pointC.Y, this.basePoint + this.Front.pointC.Z, this.basePointNeg + this.Front.pointD.X, this.basePoint + this.Front.pointD.Y, this.basePoint + this.Front.pointD.Z,
    // Back face
    this.basePointNeg + this.Back.pointA.X, this.basePointNeg + this.Back.pointA.Y, this.basePointNeg + this.Back.pointA.Z, this.basePointNeg + this.Back.pointB.X, this.basePoint + this.Back.pointB.Y, this.basePointNeg + this.Back.pointB.Z, this.basePoint + this.Back.pointC.X, this.basePoint + this.Back.pointC.Y, this.basePointNeg + this.Back.pointC.Z, this.basePoint + this.Back.pointD.X, this.basePointNeg + this.Back.pointD.Y, this.basePointNeg + this.Back.pointD.Z,
    // Top face
    this.basePointNeg + this.Top.pointA.X, this.basePoint + this.Top.pointA.Y, this.basePointNeg + this.Top.pointA.Z, this.basePointNeg + this.Top.pointB.X, this.basePoint + this.Top.pointB.Y, this.basePoint + this.Top.pointB.Z, this.basePoint + this.Top.pointC.X, this.basePoint + this.Top.pointC.Y, this.basePoint + this.Top.pointC.Z, this.basePoint + this.Top.pointD.X, this.basePoint + this.Top.pointD.Y, this.basePointNeg + this.Top.pointD.Z,
    // Bottom face
    this.basePointNeg + this.Bottom.pointA.X, this.basePointNeg + this.Bottom.pointA.Y, this.basePointNeg + this.Bottom.pointA.Z, this.basePoint + this.Bottom.pointB.X, this.basePointNeg + this.Bottom.pointB.Y, this.basePointNeg + this.Bottom.pointB.Z, this.basePoint + this.Bottom.pointC.X, this.basePointNeg + this.Bottom.pointC.Y, this.basePoint + this.Bottom.pointC.Z, this.basePointNeg + this.Bottom.pointD.X, this.basePointNeg + this.Bottom.pointD.Y, this.basePoint + this.Bottom.pointD.Z,
    // Right face
    this.basePoint + this.Right.pointA.X, this.basePointNeg + this.Right.pointA.Y, this.basePointNeg + this.Right.pointA.Z, this.basePoint + this.Right.pointB.X, this.basePoint + this.Right.pointB.Y, this.basePointNeg + this.Right.pointB.Z, this.basePoint + this.Right.pointC.X, this.basePoint + this.Right.pointC.Y, this.basePoint + this.Right.pointC.Z, this.basePoint + this.Right.pointD.X, this.basePointNeg + this.Right.pointD.Y, this.basePoint + this.Right.pointD.Z,
    // Left face
    this.basePointNeg + this.Left.pointA.X, this.basePointNeg + this.Left.pointA.Y, this.basePointNeg + this.Left.pointA.Z, this.basePointNeg + this.Left.pointB.X, this.basePointNeg + this.Left.pointB.Y, this.basePoint + this.Left.pointB.Z, this.basePointNeg + this.Left.pointC.X, this.basePoint + this.Left.pointC.Y, this.basePoint + this.Left.pointC.Z, this.basePointNeg + this.Left.pointD.X, this.basePoint + this.Left.pointD.Y, this.basePointNeg + this.Left.pointD.Z]);
  }
  get texCoords() {
    return new Float32Array([
    // Front face
    this.texCoordsPoints.front.right_top.X, this.texCoordsPoints.front.right_top.Y, this.texCoordsPoints.front.left_top.X, this.texCoordsPoints.front.left_top.Y, this.texCoordsPoints.front.right_bottom.X, this.texCoordsPoints.front.right_bottom.Y, this.texCoordsPoints.front.left_bottom.X, this.texCoordsPoints.front.left_bottom.Y,
    // Back face
    this.texCoordsPoints.back.right_top.X, this.texCoordsPoints.back.right_top.Y, this.texCoordsPoints.back.left_top.X, this.texCoordsPoints.back.left_top.Y, this.texCoordsPoints.back.right_bottom.X, this.texCoordsPoints.back.right_bottom.Y, this.texCoordsPoints.back.left_bottom.X, this.texCoordsPoints.back.left_bottom.Y,
    // Top face
    this.texCoordsPoints.top.right_top.X, this.texCoordsPoints.top.right_top.Y, this.texCoordsPoints.top.left_top.X, this.texCoordsPoints.top.left_top.Y, this.texCoordsPoints.top.right_bottom.X, this.texCoordsPoints.top.right_bottom.Y, this.texCoordsPoints.top.left_bottom.X, this.texCoordsPoints.top.left_bottom.Y,
    // Bottom face
    this.texCoordsPoints.bottom.right_top.X, this.texCoordsPoints.bottom.right_top.Y, this.texCoordsPoints.bottom.left_top.X, this.texCoordsPoints.bottom.left_top.Y, this.texCoordsPoints.bottom.right_bottom.X, this.texCoordsPoints.bottom.right_bottom.Y, this.texCoordsPoints.bottom.left_bottom.X, this.texCoordsPoints.bottom.left_bottom.Y,
    // Right face
    this.texCoordsPoints.right.right_top.X, this.texCoordsPoints.right.right_top.Y, this.texCoordsPoints.right.left_top.X, this.texCoordsPoints.right.left_top.Y, this.texCoordsPoints.right.right_bottom.X, this.texCoordsPoints.right.right_bottom.Y, this.texCoordsPoints.right.left_bottom.X, this.texCoordsPoints.right.left_bottom.Y,
    // Left face
    this.texCoordsPoints.left.right_top.X, this.texCoordsPoints.left.right_top.Y, this.texCoordsPoints.left.left_top.X, this.texCoordsPoints.left.left_top.Y, this.texCoordsPoints.left.right_bottom.X, this.texCoordsPoints.left.right_bottom.Y, this.texCoordsPoints.left.left_bottom.X, this.texCoordsPoints.left.left_bottom.Y]);
  }
  get indices() {
    return [0, 1, 2, 0, 2, 3,
    // front
    4, 5, 6, 4, 6, 7,
    // back
    8, 9, 10, 8, 10, 11,
    // top
    12, 13, 14, 12, 14, 15,
    // bottom
    16, 17, 18, 16, 18, 19,
    // right
    20, 21, 22, 20, 22, 23 // left
    ];
  }
  get color() {
    return new Float32Array([
    // Front face
    this.colorData.Front.pointA.r, this.colorData.Front.pointA.g, this.colorData.Front.pointA.b, this.colorData.Front.pointA.ALPHA(), this.colorData.Front.pointB.r, this.colorData.Front.pointB.g, this.colorData.Front.pointB.b, this.colorData.Front.pointB.ALPHA(), this.colorData.Front.pointC.r, this.colorData.Front.pointC.g, this.colorData.Front.pointC.b, this.colorData.Front.pointC.ALPHA(), this.colorData.Front.pointD.r, this.colorData.Front.pointD.g, this.colorData.Front.pointD.b, this.colorData.Front.pointD.ALPHA(),
    // Right face
    this.colorData.Right.pointA.r, this.colorData.Right.pointA.g, this.colorData.Right.pointA.b, this.colorData.Right.pointA.ALPHA(), this.colorData.Right.pointB.r, this.colorData.Right.pointB.g, this.colorData.Right.pointB.b, this.colorData.Right.pointB.ALPHA(), this.colorData.Right.pointC.r, this.colorData.Right.pointC.g, this.colorData.Right.pointC.b, this.colorData.Right.pointC.ALPHA(), this.colorData.Right.pointD.r, this.colorData.Right.pointD.g, this.colorData.Right.pointD.b, this.colorData.Right.pointD.ALPHA(),
    // Back face
    this.colorData.Back.pointA.r, this.colorData.Back.pointA.g, this.colorData.Back.pointA.b, this.colorData.Back.pointA.ALPHA(), this.colorData.Back.pointB.r, this.colorData.Back.pointB.g, this.colorData.Back.pointB.b, this.colorData.Back.pointB.ALPHA(), this.colorData.Back.pointC.r, this.colorData.Back.pointC.g, this.colorData.Back.pointC.b, this.colorData.Back.pointC.ALPHA(), this.colorData.Back.pointD.r, this.colorData.Back.pointD.g, this.colorData.Back.pointD.b, this.colorData.Back.pointD.ALPHA(),
    // Left face
    this.colorData.Left.pointA.r, this.colorData.Left.pointA.g, this.colorData.Left.pointA.b, this.colorData.Left.pointA.ALPHA(), this.colorData.Left.pointB.r, this.colorData.Left.pointB.g, this.colorData.Left.pointB.b, this.colorData.Left.pointB.ALPHA(), this.colorData.Left.pointC.r, this.colorData.Left.pointC.g, this.colorData.Left.pointC.b, this.colorData.Left.pointC.ALPHA(), this.colorData.Left.pointD.r, this.colorData.Left.pointD.g, this.colorData.Left.pointD.b, this.colorData.Left.pointD.ALPHA(),
    // Bottom left
    this.colorData.Bottom.pointA.r, this.colorData.Bottom.pointA.g, this.colorData.Bottom.pointA.b, this.colorData.Bottom.pointA.ALPHA(), this.colorData.Bottom.pointB.r, this.colorData.Bottom.pointB.g, this.colorData.Bottom.pointB.b, this.colorData.Bottom.pointB.ALPHA(), this.colorData.Bottom.pointC.r, this.colorData.Bottom.pointC.g, this.colorData.Bottom.pointC.b, this.colorData.Bottom.pointC.ALPHA(), this.colorData.Bottom.pointD.r, this.colorData.Bottom.pointD.g, this.colorData.Bottom.pointD.b, this.colorData.Bottom.pointD.ALPHA(),
    // Bottom right BottomRight
    this.colorData.Top.pointA.r, this.colorData.Top.pointA.g, this.colorData.Top.pointA.b, this.colorData.Top.pointA.ALPHA(), this.colorData.Top.pointB.r, this.colorData.Top.pointB.g, this.colorData.Top.pointB.b, this.colorData.Top.pointB.ALPHA(), this.colorData.Top.pointC.r, this.colorData.Top.pointC.g, this.colorData.Top.pointC.b, this.colorData.Top.pointC.ALPHA(), this.colorData.Top.pointD.r, this.colorData.Top.pointD.g, this.colorData.Top.pointD.b, this.colorData.Top.pointD.ALPHA()]);
  }
}
exports.CubeVertex = CubeVertex;
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
      this.Front.pointC.r = red_;
      // Right
      this.Right.pointA.r = red_;
      this.Right.pointB.r = red_;
      this.Right.pointC.r = red_;
      // Back
      this.Back.pointA.r = red_;
      this.Back.pointB.r = red_;
      this.Back.pointC.r = red_;
      // Left
      this.Left.pointA.r = red_;
      this.Left.pointB.r = red_;
      this.Left.pointC.r = red_;
      // Bottom left
      this.Bottom.pointA.r = red_;
      this.Bottom.pointB.r = red_;
      this.Bottom.pointC.r = red_;
      // Bottom right
      this.BottomRight.pointA.r = red_;
      this.BottomRight.pointB.r = red_;
      this.BottomRight.pointC.r = red_;
      _manifest.default.operation.piramide_buffer_procedure(this.parent);
    };
    this.colorData.SetGreenForAll = function (color_) {
      // Front face
      this.Front.pointA.g = color_;
      this.Front.pointB.g = color_;
      this.Front.pointC.g = color_;
      // Right face
      this.Right.pointA.g = color_;
      this.Right.pointB.g = color_;
      this.Right.pointC.g = color_;
      // Back face
      this.Back.pointA.g = color_;
      this.Back.pointB.g = color_;
      this.Back.pointC.g = color_;
      // Left face
      this.Left.pointA.g = color_;
      this.Left.pointB.g = color_;
      this.Left.pointC.g = color_;
      // Bottom left
      this.Bottom.pointA.g = color_;
      this.Bottom.pointB.g = color_;
      this.Bottom.pointC.g = color_;
      // Bottom right BottomRight
      this.BottomRight.pointA.g = color_;
      this.BottomRight.pointB.g = color_;
      this.BottomRight.pointC.g = color_;
      _manifest.default.operation.piramide_buffer_procedure(this.parent);
    };
    this.colorData.SetBlueForAll = function (color_) {
      // Front face
      this.Front.pointA.b = color_;
      this.Front.pointB.b = color_;
      this.Front.pointC.b = color_;
      // Right face
      this.Right.pointA.b = color_;
      this.Right.pointB.b = color_;
      this.Right.pointC.b = color_;
      // Back face
      this.Back.pointA.b = color_;
      this.Back.pointB.b = color_;
      this.Back.pointC.b = color_;
      // Left face
      this.Left.pointA.b = color_;
      this.Left.pointB.b = color_;
      this.Left.pointC.b = color_;
      // Bottom left
      this.Bottom.pointA.b = color_;
      this.Bottom.pointB.b = color_;
      this.Bottom.pointC.b = color_;
      // Bottom right BottomRight
      this.BottomRight.pointA.b = color_;
      this.BottomRight.pointB.b = color_;
      this.BottomRight.pointC.b = color_;
      _manifest.default.operation.piramide_buffer_procedure(this.parent);
    };
  }
  setScale(scale, em) {
    this.size = scale;
    this.basePoint = 1.0 * this.size;
    this.basePointNeg = -1.0 * this.size;
    if (typeof em === 'undefined' && _manifest.default.scene[this.nameUniq].net.enable == true) _engine.net.connection.send({
      netScale: {
        scale: scale
      },
      netObjId: this.nameUniq
    });
    if (this.dynamicBuffer == true) return;
    _manifest.default.operation.piramide_buffer_procedure(this.root);
    return "update vertex array prototypical";
  }
  setSpitz(newValueFloat, em) {
    this.spitz = newValueFloat;
    if (typeof em === 'undefined') _engine.net.connection.send({
      spitz: {
        newValueFloat: newValueFloat
      },
      netObjId: this.nameUniq
    });
    if (this.dynamicBuffer == true) return;
    _manifest.default.operation.piramide_buffer_procedure(this.root);
  }
  //from cube
  get verticesC() {
    return new Float32Array([
    // Front face
    -1.0, -1.0, 1.0, 1.0, -1.0, 1.0, 0.0, 15.0, 0.0, 0.0, 15.0, 0.0,
    // Back face
    -1.0, -1.0, -1.0, 0.0, 15.0, 0.0, 0.0, 15.0, 0.0, 1.0, -1.0, -1.0,
    // Top face
    0.0, 15.0, 0.0, 0.0, 15.0, 0.0, 0.0, 15.0, 0.0, 0.0, 15.0, 0.0,
    // Bottom face
    -1.0, -1.0, -1.0, 1.0, -1.0, -1.0, 1.0, -1.0, 1.0, -1.0, -1.0, 1.0,
    // Right face
    1.0, -1.0, -1.0, 0.0, 15.0, 0.0, 0.0, 15.0, 0.0, 1.0, -1.0, 1.0,
    // Left face
    -1.0, -1.0, -1.0, -1.0, -1.0, 1.0, 0.0, 15.0, 0.0, 0.0, 15.0, 0.0]);
  }
  get normals() {
    // from cube
    return new Float32Array([
    // Front face
    0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0,
    // Back face
    0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0,
    // Top face
    0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0,
    // Bottom face
    0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0,
    // Right face
    1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0,
    // Left face
    -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0]);
  }
  // from cube
  get texCoords() {
    return new Float32Array([
    // Front face
    0.0, 0.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0,
    // Back face
    1.0, 0.0, 1.0, 1.0, 0.0, 1.0, 0.0, 0.0,
    // Top face
    0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 1.0, 1.0,
    // Bottom face
    1.0, 1.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0,
    // Right face
    1.0, 0.0, 1.0, 1.0, 0.0, 1.0, 0.0, 0.0,
    // Left face
    0.0, 0.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0]);
  }
  get indices() {
    return [0, 1, 2, 0, 2, 3,
    // Front face
    4, 5, 6, 4, 6, 7,
    // Back face
    8, 9, 10, 8, 10, 11,
    // Top face
    12, 13, 14, 12, 14, 15,
    // Bottom face
    16, 17, 18, 16, 18, 19,
    // Right face
    20, 21, 22, 20, 22, 23 // Left face
    ];
  }
  get color() {
    return new Float32Array([
    // Front face
    this.colorData.Front.pointA.r, this.colorData.Front.pointA.g, this.colorData.Front.pointA.b, this.colorData.Front.pointA.ALPHA(), this.colorData.Front.pointB.r, this.colorData.Front.pointB.g, this.colorData.Front.pointB.b, this.colorData.Front.pointB.ALPHA(), this.colorData.Front.pointC.r, this.colorData.Front.pointC.g, this.colorData.Front.pointC.b, this.colorData.Front.pointC.ALPHA(),
    // Right face
    this.colorData.Right.pointA.r, this.colorData.Right.pointA.g, this.colorData.Right.pointA.b, this.colorData.Right.pointA.ALPHA(), this.colorData.Right.pointB.r, this.colorData.Right.pointB.g, this.colorData.Right.pointB.b, this.colorData.Right.pointB.ALPHA(), this.colorData.Right.pointC.r, this.colorData.Right.pointC.g, this.colorData.Right.pointC.b, this.colorData.Right.pointC.ALPHA(),
    // Back face
    this.colorData.Back.pointA.r, this.colorData.Back.pointA.g, this.colorData.Back.pointA.b, this.colorData.Back.pointA.ALPHA(), this.colorData.Back.pointB.r, this.colorData.Back.pointB.g, this.colorData.Back.pointB.b, this.colorData.Back.pointB.ALPHA(), this.colorData.Back.pointC.r, this.colorData.Back.pointC.g, this.colorData.Back.pointC.b, this.colorData.Back.pointC.ALPHA(),
    // Left face
    this.colorData.Left.pointA.r, this.colorData.Left.pointA.g, this.colorData.Left.pointA.b, this.colorData.Left.pointA.ALPHA(), this.colorData.Left.pointB.r, this.colorData.Left.pointB.g, this.colorData.Left.pointB.b, this.colorData.Left.pointB.ALPHA(), this.colorData.Left.pointC.r, this.colorData.Left.pointC.g, this.colorData.Left.pointC.b, this.colorData.Left.pointC.ALPHA(),
    // Bottom left
    this.colorData.Bottom.pointA.r, this.colorData.Bottom.pointA.g, this.colorData.Bottom.pointA.b, this.colorData.Bottom.pointA.ALPHA(), this.colorData.Bottom.pointB.r, this.colorData.Bottom.pointB.g, this.colorData.Bottom.pointB.b, this.colorData.Bottom.pointB.ALPHA(), this.colorData.Bottom.pointC.r, this.colorData.Bottom.pointC.g, this.colorData.Bottom.pointC.b, this.colorData.Bottom.pointC.ALPHA(),
    // Bottom right
    this.colorData.BottomRight.pointA.r, this.colorData.BottomRight.pointA.g, this.colorData.BottomRight.pointA.b, this.colorData.BottomRight.pointA.ALPHA(), this.colorData.BottomRight.pointB.r, this.colorData.BottomRight.pointB.g, this.colorData.BottomRight.pointB.b, this.colorData.BottomRight.pointB.ALPHA(), this.colorData.BottomRight.pointC.r, this.colorData.BottomRight.pointC.g, this.colorData.BottomRight.pointC.b, this.colorData.BottomRight.pointC.ALPHA()]);
  }
  get vertices() {
    return new Float32Array([0.0, this.basePoint + this.spitz, 0.0, this.basePointNeg, this.basePointNeg, this.basePoint, this.basePoint, this.basePointNeg, this.basePoint,
    // Right face
    0.0, this.basePoint + this.spitz, 0.0, this.basePoint, this.basePointNeg, this.basePoint, this.basePoint, this.basePointNeg, this.basePointNeg,
    // Back face
    0.0, this.basePoint + this.spitz, 0.0, this.basePoint, this.basePointNeg, this.basePointNeg, this.basePointNeg, this.basePointNeg, this.basePointNeg,
    // Left face
    0.0, this.basePoint + this.spitz, 0.0, this.basePointNeg, this.basePointNeg, this.basePointNeg, this.basePointNeg, this.basePointNeg, this.basePoint,
    //Bottom left
    this.basePointNeg, this.basePointNeg, this.basePoint, this.basePoint, this.basePointNeg, this.basePoint, this.basePoint, this.basePointNeg, this.basePointNeg,
    //Bottom right
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
    }

    //App.operation.sphere_buffer_procedure(this.root)
    //return 'update vertex array prototypical';
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
    } else if (this.root.custom_type == "torus") {
      for (let slice = 0; slice <= this.root.slices; ++slice) {
        const v = slice / this.root.slices;
        const slice_angle = v * 2 * Math.PI;
        const cos_slices = Math.cos(slice_angle);
        const sin_slices = Math.sin(slice_angle);
        const slice_rad = this.root.outerRad + this.root.inner_rad * cos_slices;
        for (let loop = 0; loop <= this.root.loops; ++loop) {
          //   x=(R+r·cos(v))cos(w)
          //   y=(R+r·cos(v))sin(w)
          //             z=r.sin(v)
          const u = loop / this.root.loops;
          const loop_angle = u * 2 * Math.PI;
          const cos_loops = Math.cos(loop_angle);
          const sin_loops = Math.sin(loop_angle);
          const x = slice_rad * cos_loops;
          const y = slice_rad * sin_loops;
          const z = this.root.inner_rad * sin_slices;
          this.vertexPositionData.push(x, y, z);
          this.normalData.push(cos_loops * sin_slices, sin_loops * sin_slices, cos_slices);
          this.textureCoordData.push(u);
          this.textureCoordData.push(v);
        }
      }
      // 0  1  2  3  4  5
      // 6  7  8  9  10 11
      // 12 13 14 15 16 17
      this.indexData = [];
      const vertsPerSlice = this.root.loops + 1;
      for (let i = 0; i < this.root.slices; ++i) {
        let v1 = i * vertsPerSlice;
        let v2 = v1 + vertsPerSlice;
        for (let j = 0; j < this.root.loops; ++j) {
          this.indexData.push(v1);
          this.indexData.push(v1 + 1);
          this.indexData.push(v2);
          this.indexData.push(v2);
          this.indexData.push(v1 + 1);
          this.indexData.push(v2 + 1);
          v1 += 1;
          v2 += 1;
        }
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
    return "update vertex array prototypical";
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
    if (arguments.length == 0) {
      // console.log( "test this ?? " );
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
class GeoOfColor {
  constructor(type_) {
    if (typeof type_ != "undefined") {
      if (type_ == "4x4" || type_ == "square") {
        return new Float32Array([1.0, 0.0, 0.0, 1.0,
        //Top right
        0.0, 1.0, 0.0, 1.0,
        //Top left
        0.0, 0.0, 1.0, 1.0,
        //Bottom right
        0.5, 1.0, 0.5, 1.0 //Bottom left
        ]);
      } else if (type_ == "triangle") {
        return [1.0, 0.0, 0.0, 1.0,
        // Top
        0.0, 1.0, 0.0, 1.0,
        // Right
        0.0, 0.0, 1.0, 1.0 // Bottom
        ];
      } else if (type_ == "Piramide4") {
        this.front = "test";
        return new Float32Array([
        // Front face
        1.0, 0.0, 0.0, 1.0, 0.0, 1.0, 0.0, 1.0, 0.0, 0.0, 1.0, 1.0,
        // Right face
        1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 1.0, 0.0, 1.0, 0.0, 1.0,
        // Back face
        1.0, 0.0, 0.0, 1.0, 0.0, 1.0, 0.0, 1.0, 0.0, 0.0, 1.0, 1.0,
        // Left face
        1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 1.0, 0.0, 1.0, 0.0, 1.0,
        // Bottom left
        0.0, 1.0, 0.0, 1.0, 0.0, 0.0, 1.0, 1.0, 0.0, 1.0, 0.0, 1.0,
        // Bottom right
        0.0, 1.0, 0.0, 1.0, 0.0, 1.0, 0.0, 1.0, 0.0, 0.0, 1.0, 1.0]);
      } else if (type_ == "cube") {
        return [[1.0, 1.0, 1.0, 1.0],
        // Front
        [1.0, 1.0, 0.0, 1.0],
        // Back
        [0.0, 1.0, 0.0, 1.0],
        // Top
        [1.0, 0.5, 0.5, 1.0],
        // Bottom
        [1.0, 0.0, 1.0, 1.0],
        // Right
        [0.0, 0.0, 1.0, 1.0] // Left
        ];
      } else if (type_ == "cubelight" || type_ == "cube light") {
        return new Float32Array([
        // F
        0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1,
        // B
        0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1,
        // T
        0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0,
        // Bo
        0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0,
        // R
        1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0,
        // L
        -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0]);
        // org
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
      return [1.0, 0.0, 0.0, 1.0,
      // Top right
      0.0, 1.0, 0.0, 1.0,
      // Top left
      0.0, 0.0, 1.0, 1.0,
      // Bottom right
      0.5, 1.0, 0.5, 1.0 // Bottom left
      ];
    }
  }
}

// export function ring(innerRadius, outerRadius, slices) {}
exports.GeoOfColor = GeoOfColor;

},{"../program/manifest":42,"./engine":4,"./utility":31}],11:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.genInitFSTriangle = genInitFSTriangle;
exports.getInitFSCube = getInitFSCube;
exports.getInitFSCubeMap = getInitFSCubeMap;
exports.getInitFSCubeTex = getInitFSCubeTex;
exports.getInitFSCubeTexLight = getInitFSCubeTexLight;
exports.getInitFSObj = getInitFSObj;
exports.getInitFSPyramid = getInitFSPyramid;
exports.getInitFSSphereLightTex = getInitFSSphereLightTex;
exports.getInitFSSquare = getInitFSSquare;
exports.getInitFSSquareTex = getInitFSSquareTex;
exports.getInitVSCube = getInitVSCube;
exports.getInitVSCubeMap = getInitVSCubeMap;
exports.getInitVSCubeTex = getInitVSCubeTex;
exports.getInitVSCubeTexLight = getInitVSCubeTexLight;
exports.getInitVSObj = getInitVSObj;
exports.getInitVSPyramid = getInitVSPyramid;
exports.getInitVSSphereLightTex = getInitVSSphereLightTex;
exports.getInitVSSquare = getInitVSSquare;
exports.getInitVSSquareTex = getInitVSSquareTex;
exports.getInitVSTriangle = getInitVSTriangle;
exports.loadShaders11 = loadShaders11;
var _utility = require("./utility");
/**
 * @description From 1.7.11
 * Initial Shaders coming from code.
 * loadShaders will be adapted for deplacement
 * This is for `opengles 2.0 or 1.1` - GLSL It is a webGL1
 * 
 * - Can be overrided
 * - For textures program use regenerate shader procedure.
 * - Can be selective for optimisation.
 */

function loadShaders11() {
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
  getInitFSObj();
  getInitVSObj();
  getInitFSPyramid();
  getInitVSPyramid();
  getInitFSSphereLightTex();
  getInitVSSphereLightTex();
  getInitVSCubeMap();
  getInitFSCubeMap();
  getInitFSSquareTex();
  getInitVSSquareTex();
  // console.info("Shaders ready.");
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

  // The CubeMap texture.
  uniform samplerCube u_texture;
  // cube map
  varying vec3 v_normal_cubemap;

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

    vec4 testUnused = texture2D(u_texture, vec2(vTextureCoord.s, vTextureCoord.t));

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
  varying vec3 v_normal;
  varying vec3 v_normal_cubemap;
  varying vec3 v_surfaceToLight;
  varying vec3 v_surfaceToView;

  // Specular
  varying mat4 uMVMatrixINTER;
  varying mat3 uNMatrixINTER;
  varying mat4 uPMatrixINNTER;

  attribute vec4 specularColor;
  varying vec4 vColor;
  varying vec3 vNormal;
  varying vec4 vPosition;
  varying float vDist;

  void main(void) {
    uMVMatrixINTER = uMVMatrix;
    uNMatrixINTER = uNMatrix;
    uPMatrixINNTER = uPMatrix;

    // GLOBAL POS SPECULAR
    vColor = specularColor;
    vNormal = normalize(uNMatrix * vec3(aVertexNormal));
    // Calculate the modelView of the model, and set the vPosition
    // mat4 modelViewMatrix = uViewMatrix * uModelMatrix;
    vPosition = uMVMatrix * vec4(1,1,1,1);
    vDist = gl_Position.w;

    // SPOT
    // orient the normals and pass to the fragment shader
    v_normal = mat3(uNMatrix) * aVertexNormal;

    // normalize
    v_normal_cubemap = normalize(aVertexPosition.xyz);

    // compute the world position of the surfoace
    vec3 surfaceWorldPosition = (uNMatrix * aVertexPosition).xyz;

    // compute the vector of the surface to the light
    // and pass it to the fragment shader
    v_surfaceToLight = u_lightWorldPosition - surfaceWorldPosition;

    // compute the vector of the surface to the view/camera
    // and pass it to the fragment shader
    v_surfaceToView = (uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0)).xyz - surfaceWorldPosition;

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
  // console.log(" squareTex-shader-vs v")
}
function getInitFSSphereLightTex() {
  const f = `// #version 300 es
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
  _utility.scriptManager.LOAD(f, "sphereLightTex-shader-fs", "x-shader/x-fragment", "shaders");
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
function getInitFSCubeMap() {
  const f = `
  precision mediump float;

  varying vec2 vTextureCoord;
  varying vec3 vLightWeighting;

  // The CubeMap texture.
  uniform samplerCube u_texture;
  // cube map
  varying vec3 v_normal_cubemap;

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

    vec4 testUnused = texture2D(u_texture, vec2(vTextureCoord.s, vTextureCoord.t));

     gl_FragColor = textureCube(u_texture, normal);

    // gl_FragColor      = vec4(textureColor.rgb * vLightWeighting, textureColor.a);

    // Lets multiply just the color portion (not the alpha)
    // by the light
    gl_FragColor.rgb *= light;
    // Just add in the specular
    gl_FragColor.rgb += specular;
  }
  `;
  _utility.scriptManager.LOAD(f, "cubeMap-shader-fs", "x-shader/x-fragment", "shaders");
}
function getInitVSCubeMap() {
  const f = `
  attribute vec3 aVertexPosition;
  attribute vec3 aVertexNormal;

  uniform mat4 uMVMatrix;
  uniform mat4 uPMatrix;
  uniform mat3 uNMatrix;

  varying vec3 v_normal;
  varying vec3 v_normal_cubemap;

  // lights
  uniform vec3 uAmbientColor;
  uniform vec3 uLightingDirection;
  uniform vec3 uDirectionalColor;
  uniform bool uUseLighting;
  // varying vec2 vTextureCoord;
  varying vec3 vLightWeighting;

  void main(void) {

    v_normal = mat3(uNMatrix) * aVertexNormal;
    v_normal_cubemap = normalize(aVertexPosition.xyz);
    gl_Position   = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);

    // lights
    // vTextureCoord = aTextureCoord;

    if (!uUseLighting) {
      vLightWeighting = vec3(1.0, 1.0, 1.0);
    }
    else {
      vec3 transformedNormal          = uNMatrix * aVertexNormal;
      float directionalLightWeighting = max(dot(transformedNormal, uLightingDirection), 0.0);
      vLightWeighting                 = uAmbientColor + uDirectionalColor * directionalLightWeighting;
    }

  } `;
  _utility.scriptManager.LOAD(f, "cubeMap-shader-vs", "x-shader/x-vertex", "shaders");
}

},{"./utility":31}],12:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.genInitFSTriangle = genInitFSTriangle;
exports.getInitFSCube = getInitFSCube;
exports.getInitFSCubeMap = getInitFSCubeMap;
exports.getInitFSCubeTex = getInitFSCubeTex;
exports.getInitFSCubeTexLight = getInitFSCubeTexLight;
exports.getInitFSObj = getInitFSObj;
exports.getInitFSPyramid = getInitFSPyramid;
exports.getInitFSSphereLightTex = getInitFSSphereLightTex;
exports.getInitFSSquare = getInitFSSquare;
exports.getInitFSSquareTex = getInitFSSquareTex;
exports.getInitVSCube = getInitVSCube;
exports.getInitVSCubeMap = getInitVSCubeMap;
exports.getInitVSCubeTex = getInitVSCubeTex;
exports.getInitVSCubeTexLight = getInitVSCubeTexLight;
exports.getInitVSObj = getInitVSObj;
exports.getInitVSPyramid = getInitVSPyramid;
exports.getInitVSSphereLightTex = getInitVSSphereLightTex;
exports.getInitVSSquare = getInitVSSquare;
exports.getInitVSSquareTex = getInitVSSquareTex;
exports.getInitVSTriangle = getInitVSTriangle;
exports.loadShaders300 = loadShaders300;
var _utility = require("./utility");
/**
 * @description From 1.9.43
 * Opengles300 in single file.
 */
function loadShaders300() {
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
  getInitFSObj();
  getInitVSObj();
  getInitFSPyramid();
  getInitVSPyramid();
  getInitFSSphereLightTex();
  getInitVSSphereLightTex();
  getInitVSCubeMap();
  getInitFSCubeMap();
  getInitFSSquareTex();
  getInitVSSquareTex();
}
function genInitFSTriangle() {
  const f = `#version 300 es
  precision mediump float;
  in vec4 vColor;
  out vec4 outColor;
  void main(void) {
    outColor = vColor;
  }
  `;
  _utility.scriptManager.LOAD(f, "triangle-shader-fs", "x-shader/x-fragment", "shaders");
}
function getInitVSTriangle() {
  const f = `#version 300 es
  in vec3 aVertexPosition;
  in vec4 aVertexColor;
  uniform mat4 uMVMatrix;
  uniform mat4 uPMatrix;
  out vec3 meVertexPosition;
  out vec4 vColor;
  void main(void) {
    meVertexPosition = aVertexPosition;
    gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);
    vColor      = aVertexColor;
  }
  `;
  _utility.scriptManager.LOAD(f, "triangle-shader-vs", "x-shader/x-vertex", "shaders");
}
function getInitFSCubeTexLight() {
  const f = `#version 300 es
  precision mediump float;
  in vec2 vTextureCoord;
  in vec3 vLightWeighting;
  uniform sampler2D uSampler;
  uniform sampler2D uSampler1;
  uniform sampler2D uSampler2;
  uniform sampler2D uSampler3;
  uniform sampler2D uSampler4;
  uniform sampler2D uSampler5;
  // The CubeMap texture.
  uniform samplerCube u_texture;
  // cube map
  // in vec3 v_normal_cubemap;
  uniform float numberOfsamplers;

  // Spot
  // Passed in from the vertex shader.
  in vec3 v_normal;
  in vec3 v_surfaceToLight;
  in vec3 v_surfaceToView;
  uniform vec4 u_color;
  uniform float u_shininess;
  uniform vec3 u_lightDirection;
  uniform float u_innerLimit;
  uniform float u_outerLimit;

  out vec4 outColor;

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

    vec4 testUnused = texture2D(u_texture, vec2(vTextureCoord.s, vTextureCoord.t));

    outColor      = vec4(textureColor.rgb * vLightWeighting, textureColor.a);

    // Lets multiply just the color portion (not the alpha)
    // by the light
    outColor.rgb *= light;
    // Just add in the specular
    outColor.rgb += specular;
  }
  `;
  _utility.scriptManager.LOAD(f, "cubeLightTex-shader-fs", "x-shader/x-fragment", "shaders");
}
function getInitVSCubeTexLight() {
  const f = `#version 300 es
  in vec3 aVertexPosition;
  in vec3 aVertexNormal;
  in vec2 aTextureCoord;

  uniform mat4 uMVMatrix;
  uniform mat4 uPMatrix;
  uniform mat3 uNMatrix;
  uniform vec3 uAmbientColor;
  uniform vec3 uLightingDirection;
  uniform vec3 uDirectionalColor;
  uniform bool uUseLighting;
  out vec2 vTextureCoord;
  out vec3 vLightWeighting;
  out vec3 meVertexPosition;

  // Spot
  uniform vec3 u_lightWorldPosition;
  out vec3 v_normal;
  // out vec3 v_normal_cubemap;
  out vec3 v_surfaceToLight;
  out vec3 v_surfaceToView;

  // Specular
  out mat4 uMVMatrixINTER;
  out mat3 uNMatrixINTER;
  out mat4 uPMatrixINNTER;

  in vec4 specularColor;
  out vec4 vColor;
  out vec3 vNormal;
  out vec4 vPosition;
  out float vDist;

  void main(void) {

    meVertexPosition = aVertexPosition;
    uMVMatrixINTER = uMVMatrix;
    uNMatrixINTER = uNMatrix;
    uPMatrixINNTER = uPMatrix;

    // GLOBAL POS SPECULAR
    vColor = specularColor;
    vNormal = normalize(uNMatrix * vec3(aVertexNormal));
    // Calculate the modelView of the model, and set the vPosition
    // mat4 modelViewMatrix = uViewMatrix * uModelMatrix;
    vPosition = uMVMatrix * vec4(1,1,1,1);
    vDist = gl_Position.w;

    // SPOT
    // orient the normals and pass to the fragment shader
    v_normal = mat3(uNMatrix) * aVertexNormal;

    // normalize
    // v_normal_cubemap = normalize(aVertexPosition.xyz);

    // compute the world position of the surfoace
    vec3 surfaceWorldPosition = (uNMatrix * aVertexPosition).xyz;

    // compute the vector of the surface to the light
    // and pass it to the fragment shader
    v_surfaceToLight = u_lightWorldPosition - surfaceWorldPosition;

    // compute the vector of the surface to the view/camera
    // and pass it to the fragment shader
    v_surfaceToView = (uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0)).xyz - surfaceWorldPosition;

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
  const f = `#version 300 es
  precision mediump float;
  in vec4 vColor;
  out vec4 outColor;
  void main(void) {
    outColor = vColor;
  }
  `;
  _utility.scriptManager.LOAD(f, "square-shader-fs", "x-shader/x-fragment", "shaders");
}
function getInitVSSquare() {
  const f = `#version 300 es
  in vec3 aVertexPosition;
  in vec4 aVertexColor;
  uniform mat4 uMVMatrix;
  uniform mat4 uPMatrix;
  out vec3 meVertexPosition;
  out vec4 vColor;

  void main(void) {
    meVertexPosition = aVertexPosition;
    gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);
    vColor      = aVertexColor;
  }`;
  _utility.scriptManager.LOAD(f, "square-shader-vs", "x-shader/x-vertex", "shaders");
}
function getInitFSCube() {
  const f = `#version 300 es
  precision mediump float;
  in vec4 vColor;
  out vec4 outColor;
  void main(void) {
    outColor = vColor;
  }`;
  _utility.scriptManager.LOAD(f, "cube-shader-fs", "x-shader/x-fragment", "shaders");
}
function getInitVSCube() {
  const f = `#version 300 es
  in vec3 aVertexPosition;
  in vec4 aVertexColor;
  uniform mat4 uMVMatrix;
  uniform mat4 uPMatrix;
  out vec3 meVertexPosition;
  out vec4 vColor;
  void main(void) {
    meVertexPosition = aVertexPosition;
    gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);
    vColor      = aVertexColor;
  }`;
  _utility.scriptManager.LOAD(f, "cube-shader-vs", "x-shader/x-vertex", "shaders");
}
function getInitFSCubeTex() {
  const f = `#version 300 es
  precision mediump float;
  in vec2 vTextureCoord;
  uniform sampler2D uSampler;
  out vec4 outColor;
  void main(void) {
    outColor = texture2D(uSampler, vec2(vTextureCoord.s, vTextureCoord.t));
  }`;
  _utility.scriptManager.LOAD(f, "cubeTex-shader-fs", "x-shader/x-fragment", "shaders");
}
function getInitVSCubeTex() {
  const f = `#version 300 es
  #define POSITION_LOCATION 0
  in vec3 aVertexPosition;
  in vec2 aTextureCoord;
  uniform mat4 uMVMatrix;
  uniform mat4 uPMatrix;
  out vec3 meVertexPosition;
  out vec2 vTextureCoord;
  void main(void) {
    meVertexPosition = aVertexPosition;
    gl_Position   = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);
    vTextureCoord = aTextureCoord;
  }`;
  _utility.scriptManager.LOAD(f, "cubeTex-shader-vs", "x-shader/x-vertex", "shaders");
}
function getInitFSObj() {
  const f = `#version 300 es
  precision mediump float;
  in vec2 vTextureCoord;
  in vec3 vLightWeighting;
  uniform sampler2D uSampler;
  uniform sampler2D uSampler1;
  uniform sampler2D uSampler2;
  uniform sampler2D uSampler3;
  uniform sampler2D uSampler4;
  uniform sampler2D uSampler5;
  uniform samplerCube u_texture;
  uniform float numberOfsamplers;

  // Spot
  // Passed in from the vertex shader.
  in vec3 v_normal;
  in vec3 v_surfaceToLight;
  in vec3 v_surfaceToView;
  uniform vec4 u_color;
  uniform float u_shininess;
  uniform vec3 u_lightDirection;
  uniform float u_innerLimit;
  uniform float u_outerLimit;

  out vec4 outColor;

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
    vec4 textureColor = texture(uSampler, vTextureCoord) * vec4(1,1,1,1);
    vec4 textureColor1 = texture(uSampler1, vec2(vTextureCoord.s, vTextureCoord.t));
    vec4 textureColor2 = texture(uSampler2, vec2(vTextureCoord.s, vTextureCoord.t));
    // vec4 testUnused = texture(u_texture, vec2(vTextureCoord.s, vTextureCoord.t));

    outColor = vec4(textureColor.rgb * vLightWeighting, textureColor.a);

    // Lets multiply just the color portion (not the alpha)
    outColor.rgb *= light;
    // Just add in the specular
    outColor.rgb += specular;
  }`;
  _utility.scriptManager.LOAD(f, "obj-shader-fs", "x-shader/x-fragment", "shaders");
}
function getInitVSObj() {
  const f = `#version 300 es
  in vec3 aVertexPosition;
  in vec3 aVertexNormal;
  in vec2 aTextureCoord;

  uniform mat4 uMVMatrix;
  uniform mat4 uPMatrix;
  uniform mat3 uNMatrix;
  uniform vec3 uAmbientColor;
  uniform vec3 uLightingDirection;
  uniform vec3 uDirectionalColor;
  uniform bool uUseLighting;
  out vec2 vTextureCoord;
  out vec3 vLightWeighting;
  out vec3 meVertexPosition;

  // Spot
  uniform vec3 u_lightWorldPosition;
  out vec3 v_normal;
  out vec3 v_normal_cubemap;
  out vec3 v_surfaceToLight;
  out vec3 v_surfaceToView;

  // Specular
  out mat4 uMVMatrixINTER;
  out mat3 uNMatrixINTER;
  out mat4 uPMatrixINNTER;

  in vec4 specularColor;
  out vec4 vColor;
  out vec3 vNormal;
  out vec4 vPosition;
  out float vDist;

  void main(void) {
    meVertexPosition = aVertexPosition;

    uMVMatrixINTER = uMVMatrix;
    uNMatrixINTER = uNMatrix;
    uPMatrixINNTER = uPMatrix;

    // GLOBAL POS SPECULAR
    vColor = specularColor;
    vNormal = normalize(uNMatrix * vec3(aVertexNormal));
    // Calculate the modelView of the model, and set the vPosition
    // mat4 modelViewMatrix = uViewMatrix * uModelMatrix;
    vPosition = uMVMatrix * vec4(1,1,1,1);
    vDist = gl_Position.w;

    // SPOT
    // orient the normals and pass to the fragment shader
    v_normal = mat3(uNMatrix) * aVertexNormal;

    // normalize
    v_normal_cubemap = normalize(aVertexPosition.xyz);

    // compute the world position of the surfoace
    vec3 surfaceWorldPosition = (uNMatrix * aVertexPosition).xyz;

    // compute the vector of the surface to the light
    // and pass it to the fragment shader
    v_surfaceToLight = u_lightWorldPosition - surfaceWorldPosition;

    // compute the vector of the surface to the view/camera
    // and pass it to the fragment shader
    v_surfaceToView = (uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0)).xyz - surfaceWorldPosition;

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
  _utility.scriptManager.LOAD(f, "obj-shader-vs", "x-shader/x-vertex", "shaders");
}
function getInitFSPyramid() {
  const f = `#version 300 es
  precision mediump float;
  in vec4 vColor;

  out vec4 outColor;
  void main(void) {
    outColor = vColor;
  }`;
  _utility.scriptManager.LOAD(f, "pyramid-shader-fs", "x-shader/x-fragment", "shaders");
}
function getInitVSPyramid() {
  const f = `#version 300 es
  in vec3 aVertexPosition;
  in vec4 aVertexColor;
  uniform mat4 uMVMatrix;
  uniform mat4 uPMatrix;
  out vec3 meVertexPosition;
  out vec4 vColor;
  void main(void) {
    meVertexPosition = aVertexPosition;
    gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);
    vColor      = aVertexColor;
  }
`;
  _utility.scriptManager.LOAD(f, "pyramid-shader-vs", "x-shader/x-vertex", "shaders");
}
function getInitFSSquareTex() {
  const f = `#version 300 es
  precision mediump float;
  in vec2 vTextureCoord;
  in vec3 vLightWeighting;
  uniform sampler2D uSampler;
  uniform sampler2D uSampler1;
  uniform sampler2D uSampler2;
  uniform sampler2D uSampler3;
  uniform sampler2D uSampler4;
  uniform sampler2D uSampler5;
  uniform float numberOfsamplers;

  // Spot
  // Passed in from the vertex shader.
  in vec3 v_normal;
  in vec3 v_surfaceToLight;
  in vec3 v_surfaceToView;
  uniform vec4 u_color;
  uniform float u_shininess;
  uniform vec3 u_lightDirection;
  uniform float u_innerLimit;
  uniform float u_outerLimit;

  out vec4 outColor;

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
    outColor       = vec4(textureColor.rgb * vLightWeighting, textureColor.a);

    outColor.rgb *= light;
    // gl_FragColor.rgb += specular;
  }
  `;
  _utility.scriptManager.LOAD(f, "squareTex-shader-fs", "x-shader/x-fragment", "shaders");
}
function getInitVSSquareTex() {
  const f = `#version 300 es
  in vec3 aVertexPosition;
  in vec3 aVertexNormal;
  in vec2 aTextureCoord;
  uniform mat4 uMVMatrix;
  uniform mat4 uPMatrix;
  uniform mat3 uNMatrix;
  uniform vec3 uAmbientColor;
  uniform vec3 uLightingDirection;
  uniform vec3 uDirectionalColor;
  uniform bool uUseLighting;
  out vec2 vTextureCoord;
  out vec3 vLightWeighting;
  out vec3 meVertexPosition;

  // Spot
  uniform vec3 u_lightWorldPosition;
  out vec3 v_normal;
  out vec3 v_surfaceToLight;
  out vec3 v_surfaceToView;

  // spot-Shadow
  uniform mat4 u_textureMatrix;
  out vec2 v_texcoord;
  out vec4 v_projectedTexcoord;

  // Specular
  // out vec4 specularColor;
  // out vec4 vColor;
  // out vec3 vNormal;
  // out vec4 vPosition;
  // out float vDist;

  void main(void) {
    meVertexPosition = aVertexPosition;
    // GLOBAL POS SPECULAR
    // vColor = specularColor;
    // vNormal = normalize(uNMatrix * vec3(aVertexNormal));
    // Calculate the modelView of the model, and set the vPosition
    // mat4 modelViewMatrix = uViewMatrix * uModelMatrix;
    // vPosition = uMVMatrix * vec4(1,1,1,1);
    // vDist = gl_Position.w;

    // SPOT
    v_normal = mat3(uNMatrix) * aVertexNormal;
    vec3 surfaceWorldPosition = (uNMatrix * aVertexPosition).xyz;
    v_surfaceToLight = u_lightWorldPosition - surfaceWorldPosition;
    v_surfaceToView = -surfaceWorldPosition;

    // spot shadow
    // vec4 worldPosition = u_world * a_position;
    vec4 worldPosition = vec4(1,1,1,1) * vec4( aVertexPosition, 1.0);
    v_texcoord = aTextureCoord;
    v_projectedTexcoord = u_textureMatrix * worldPosition;

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
  // console.log(" squareTex-shader-vs v")
}
function getInitFSSphereLightTex() {
  const f = `#version 300 es
  precision mediump float;
  in vec2 vTextureCoord;
  in vec3 vLightWeighting;
  uniform sampler2D uSampler;
  uniform sampler2D uSampler1;
  uniform sampler2D uSampler2;
  uniform sampler2D uSampler3;
  uniform float numberOfsamplers;
  out vec4 outColor;
  void main(void) {
    vec4 textureColor = texture(uSampler, vec2(vTextureCoord.s, vTextureCoord.t));
    vec4 textureColor1 = texture(uSampler1, vec2(vTextureCoord.s, vTextureCoord.t));
    vec4 textureColor2 = texture(uSampler2, vec2(vTextureCoord.s, vTextureCoord.t));
    outColor      = vec4(textureColor.rgb * vLightWeighting, textureColor.a);
  }
  `;
  _utility.scriptManager.LOAD(f, "sphereLightTex-shader-fs", "x-shader/x-fragment", "shaders");
}
function getInitVSSphereLightTex() {
  const f = `#version 300 es
  in vec3 aVertexPosition;
  in vec3 aVertexNormal;
  in vec2 aTextureCoord;

  uniform mat4 uMVMatrix;
  uniform mat4 uPMatrix;
  uniform mat3 uNMatrix;
  uniform vec3 uAmbientColor;
  uniform vec3 uLightingDirection;
  uniform vec3 uDirectionalColor;
  uniform bool uUseLighting;

  out vec2 vTextureCoord;
  out vec3 vLightWeighting;
  out vec3 meVertexPosition;

  void main(void) {
    meVertexPosition = aVertexPosition;
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
function getInitFSCubeMap() {
  const f = `#version 300 es
  precision mediump float;

  in vec2 vTextureCoord;
  in vec3 vLightWeighting;

  // The CubeMap texture test.
  uniform samplerCube u_texture;
  // cube map
  in vec3 v_normal_cubemap;
  uniform float numberOfsamplers;

  // Spot
  in vec3 v_normal;
  in vec3 v_surfaceToLight;
  in vec3 v_surfaceToView;

  uniform vec4 u_color;
  uniform float u_shininess;
  uniform vec3 u_lightDirection;
  uniform float u_innerLimit;
  uniform float u_outerLimit;

  out vec4 outColor;

  void main(void) {
    vec3 normal = normalize(v_normal);

    vec3 surfaceToLightDirection = normalize(v_surfaceToLight);
    vec3 surfaceToViewDirection = normalize(v_surfaceToView);
    vec3 halfVector = normalize(surfaceToLightDirection + surfaceToViewDirection);

    float dotFromDirection = dot(surfaceToLightDirection, -u_lightDirection);
    float limitRange = u_innerLimit - u_outerLimit;
    float inLight = clamp((dotFromDirection - u_outerLimit) / limitRange, 0.0, 1.0);
    float light = inLight * dot(normal, surfaceToLightDirection);
    float specular = inLight * pow(dot(normal, halfVector), u_shininess);

    outColor = texture(u_texture, normal);
    outColor.rgb += specular;
  }`;
  _utility.scriptManager.LOAD(f, "cubeMap-shader-fs", "x-shader/x-fragment", "shaders");
}
function getInitVSCubeMap() {
  const f = `#version 300 es
  in vec3 aVertexPosition;
  in vec3 aVertexNormal;

  uniform mat4 uMVMatrix;
  uniform mat4 uPMatrix;
  uniform mat3 uNMatrix;

  out vec3 v_normal;
  out vec3 v_normal_cubemap;

  // lights
  uniform vec3 uAmbientColor;
  uniform vec3 uLightingDirection;
  uniform vec3 uDirectionalColor;
  uniform bool uUseLighting;
  out vec3 vLightWeighting;
  out vec3 meVertexPosition;

  // test 
  // Spot
  uniform vec3 u_lightWorldPosition;
  // out vec3 v_normal;
  out vec3 v_surfaceToLight;
  out vec3 v_surfaceToView;

  // Specular
  out mat4 uMVMatrixINTER;
  out mat3 uNMatrixINTER;
  out mat4 uPMatrixINNTER;

  in vec4 specularColor;
  out vec4 vColor;
  out vec3 vNormal;
  out vec4 vPosition;
  out float vDist;
  // end test

  void main(void) {
    meVertexPosition = aVertexPosition;
    v_normal = mat3(uNMatrix) * aVertexNormal;
    // v_normal_cubemap = normalize(aVertexPosition.xyz);

    // test SPOT
    // orient the normals and pass to the fragment shader
    v_normal = mat3(uNMatrix) * aVertexNormal;

    // normalize
    v_normal_cubemap = normalize(aVertexPosition.xyz);

    // compute the world position of the surfoace
    vec3 surfaceWorldPosition = (uNMatrix * aVertexPosition).xyz;

    // compute the vector of the surface to the light
    // and pass it to the fragment shader
    v_surfaceToLight = u_lightWorldPosition - surfaceWorldPosition;

    // compute the vector of the surface to the view/camera
    // and pass it to the fragment shader
    v_surfaceToView = (uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0)).xyz - surfaceWorldPosition;
    // end test

    gl_Position   = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);
    if (!uUseLighting) {
      vLightWeighting = vec3(1.0, 1.0, 1.0);
    }
    else {
      vec3 transformedNormal          = uNMatrix * aVertexNormal;
      float directionalLightWeighting = max(dot(transformedNormal, uLightingDirection), 0.0);
      vLightWeighting                 = uAmbientColor + uDirectionalColor * directionalLightWeighting;
    }
  } `;
  _utility.scriptManager.LOAD(f, "cubeMap-shader-vs", "x-shader/x-vertex", "shaders");
}

},{"./utility":31}],13:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.reDrawID = exports.animate = void 0;
var _manifest = _interopRequireDefault(require("../program/manifest"));
var _matrixWorld = require("./matrix-world");
var _engine = require("./engine");
var raycaster = _interopRequireWildcard(require("./raycast"));
var _utility = require("./utility");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
var animate = function (sceneObject) {
  var timeNow = new Date().getTime();
  if (_engine.lastTime != 0) {
    var elapsed = timeNow - _engine.lastTime;
    if (sceneObject.rotation.rotationSpeed.emit == false) {
      sceneObject.rotation.rotx += sceneObject.rotation.rotSpeedX * elapsed / 1000.0;
      sceneObject.rotation.roty += sceneObject.rotation.rotSpeedY * elapsed / 1000.0;
      sceneObject.rotation.rotz += sceneObject.rotation.rotSpeedZ * elapsed / 1000.0;
    } else {
      sceneObject.rotation.rotateX(sceneObject.rotation.rotx + sceneObject.rotation.rotSpeedX * elapsed / 1000.0);
      sceneObject.rotation.rotateY(sceneObject.rotation.roty + sceneObject.rotation.rotSpeedY * elapsed / 1000.0);
      sceneObject.rotation.rotateZ(sceneObject.rotation.rotz + sceneObject.rotation.rotSpeedZ * elapsed / 1000.0);
    }
    sceneObject.position.update();
  }
};
exports.animate = animate;
var reDrawID = exports.reDrawID = 0;
var secondPass = 0;
var physicsLooper = 0,
  lt = 0;
_manifest.default.operation.reDrawGlobal = function (time) {
  (0, _engine.modifyLooper)(0);
  if (_manifest.default.offScreenCanvas == false) exports.reDrawID = reDrawID = requestAnimationFrame(_manifest.default.operation.reDrawGlobal);
  _matrixWorld.world.renderPerspective();
  for (var t = 0; t < _manifest.default.updateBeforeDraw.length; t++) {
    _manifest.default.updateBeforeDraw[t].UPDATE();
  }

  // Physics [cannonjs-matrix engine implementation]
  if (_matrixWorld.world.physics !== null) {
    var dt = (time - lt) / 1000;
    _matrixWorld.world.physics.world.step(1.0 / 60.0, dt, 3);
    lt = time;
    while (physicsLooper <= _matrixWorld.world.contentList.length - 1) {
      if (_matrixWorld.world.contentList[physicsLooper].physics.enabled) {
        var local = _matrixWorld.world.contentList[physicsLooper];
        if (local.physics.currentBody.shapeOrientations.length == 1) {
          if (local.position.x.toFixed(2) == local.physics.currentBody.position.x.toFixed(2)) {
            // console.log(' TEST SLEEP RENDER local.position.x', local.position.x.toFixed(2), " VS ", local.physics.currentBody.position.x.toFixed(2))
          } else {
            local.position.SetX(local.physics.currentBody.position.x);
            local.position.SetZ(local.physics.currentBody.position.y);
            local.position.SetY(local.physics.currentBody.position.z);
          }
          if (_matrixWorld.world.contentList[physicsLooper].custom_type && _matrixWorld.world.contentList[physicsLooper].custom_type == 'torus') {
            _matrixWorld.world.contentList[physicsLooper].rotation.rotx = (0, _utility.radToDeg)(local.physics.currentBody.quaternion.toAxisAngle()[1]) + 90;
            _matrixWorld.world.contentList[physicsLooper].rotation.roty = (0, _utility.radToDeg)(local.physics.currentBody.quaternion.toAxisAngle()[1]);
            _matrixWorld.world.contentList[physicsLooper].rotation.rotz = (0, _utility.radToDeg)(local.physics.currentBody.quaternion.toAxisAngle()[1]);
          } else {
            var axisAngle = local.physics.currentBody.quaternion.toAxisAngle()[1];
            _matrixWorld.world.contentList[physicsLooper].rotation.angle = axisAngle;
            _matrixWorld.world.contentList[physicsLooper].rotation.axisSystem = local.physics.currentBody.quaternion.toAxisAngle();
            _matrixWorld.world.contentList[physicsLooper].rotation.axis.x = parseFloat(local.physics.currentBody.quaternion.toAxisAngle()[0].x.toFixed(2));
            _matrixWorld.world.contentList[physicsLooper].rotation.axis.y = parseFloat(local.physics.currentBody.quaternion.toAxisAngle()[0].y.toFixed(2));
            _matrixWorld.world.contentList[physicsLooper].rotation.axis.z = parseFloat(local.physics.currentBody.quaternion.toAxisAngle()[0].z.toFixed(2));

            // if (world.contentList[physicsLooper].rotation.x > 0) {
            // 	 console.log('TEST ' , world.contentList[physicsLooper].rotation.x ) 
            // }
            // if(local.physics.currentBody.quaternion.x != 0) world.contentList[physicsLooper].rotation.rotx = radToDeg(local.physics.currentBody.quaternion.toAxisAngle()[1]);
            // if(local.physics.currentBody.quaternion.y != 0) world.contentList[physicsLooper].rotation.roty = radToDeg(local.physics.currentBody.quaternion.toAxisAngle()[1]);
            // if(local.physics.currentBody.quaternion.z != 0) world.contentList[physicsLooper].rotation.rotz = radToDeg(local.physics.currentBody.quaternion.toAxisAngle()[1]);
          }
        } else if (local.physics.currentBody.shapeOrientations.length > 1) {
          // subObjs
          for (var x = 0; x < local.subObjs.length; x++) {
            local.subObjs[x].position.SetX(local.physics.currentBody.shapeOffsets[x].x);
            local.subObjs[x].position.SetZ(local.physics.currentBody.shapeOffsets[x].y);
            local.subObjs[x].position.SetY(local.physics.currentBody.shapeOffsets[x].z);
            if (local.physics.currentBody.quaternion.x != 0) local.subObjs[x].rotation.rotx = (0, _utility.radToDeg)(local.physics.currentBody.shapeOrientations[x].toAxisAngle()[1]);
            if (local.physics.currentBody.quaternion.y != 0) local.subObjs[x].rotation.roty = (0, _utility.radToDeg)(local.physics.currentBody.shapeOrientations[x].toAxisAngle()[1]);
            if (local.physics.currentBody.quaternion.z != 0) local.subObjs[x].rotation.rotz = (0, _utility.radToDeg)(local.physics.currentBody.shapeOrientations[x].toAxisAngle()[1]);
          }
        }
      }
      physicsLooper++;
    }
  }

  // reset to zero
  physicsLooper = 0;

  // Must be override for performance 
  // - non FBO and FBO option draw coroutine

  // hc 512x512
  // Important camera setup must be in the first place in exe order!
  // Before FB bind
  if (_matrixWorld.world.FBOS.length > 0) {
    matrixEngine.Events.camera.pitchMemo = matrixEngine.Events.camera.pitch;
    matrixEngine.Events.camera.yawMemo = matrixEngine.Events.camera.yaw;
    matrixEngine.Events.camera.xPosMemo = matrixEngine.Events.camera.xPos;
    matrixEngine.Events.camera.zPosMemo = matrixEngine.Events.camera.zPos;
    matrixEngine.Events.camera.yPosMemo = matrixEngine.Events.camera.yPos;
  }

  // Multi FB
  for (var fbindex = 0; fbindex < _matrixWorld.world.FBOS.length; fbindex++) {
    // save samera pos
    // if (typeof world.FBOS[fbindex].settings.xPosMemo === 'undefined') {
    // setup by custom params
    matrixEngine.Events.camera.xPos = _matrixWorld.world.FBOS[fbindex].settings.cameraX;
    matrixEngine.Events.camera.yPos = _matrixWorld.world.FBOS[fbindex].settings.cameraY;
    matrixEngine.Events.camera.zPos = _matrixWorld.world.FBOS[fbindex].settings.cameraZ;
    matrixEngine.Events.camera.pitch = _matrixWorld.world.FBOS[fbindex].settings.pitch;
    matrixEngine.Events.camera.yaw = _matrixWorld.world.FBOS[fbindex].settings.yaw;
    _matrixWorld.world.GL.gl.bindFramebuffer(_matrixWorld.world.GL.gl.FRAMEBUFFER, _matrixWorld.world.FBOS[fbindex].FB);
    _matrixWorld.world.GL.gl.viewport(0, 0, 512, 512);
    _matrixWorld.world.GL.gl.clearColor(0.2, 0.2, 0.4, 1.0);
    _matrixWorld.world.GL.gl.clear(_matrixWorld.world.GL.gl.COLOR_BUFFER_BIT | _matrixWorld.world.GL.gl.DEPTH_BUFFER_BIT);
    _matrixWorld.world.GL.gl.enable(_matrixWorld.world.GL.gl.DEPTH_TEST);
    _matrixWorld.world.GL.gl.disable(_matrixWorld.world.GL.gl.BLEND);
    _matrixWorld.world.GL.gl.depthMask(true);

    // - draw all `non fbo` and `no blend`
    while (_engine.looper <= _matrixWorld.world.contentList.length - 1) {
      if (_matrixWorld.world.contentList[_engine.looper].visible === true && !_matrixWorld.world.contentList[_engine.looper].FBO && _matrixWorld.world.contentList[_engine.looper].glBlend.blendEnabled == false) {
        if ('triangle' == _matrixWorld.world.contentList[_engine.looper].type) {
          _matrixWorld.world.GL.gl.useProgram(_matrixWorld.world.contentList[_engine.looper].shaderProgram);
          _matrixWorld.world.drawTriangle(_matrixWorld.world.contentList[_engine.looper], 'noray');
        } else if ('square' == _matrixWorld.world.contentList[_engine.looper].type) {
          _matrixWorld.world.GL.gl.useProgram(_matrixWorld.world.contentList[_engine.looper].shaderProgram);
          _matrixWorld.world.drawSquare(_matrixWorld.world.contentList[_engine.looper], 'noray');
        } else if ('cube' == _matrixWorld.world.contentList[_engine.looper].type || 'cubeTex' == _matrixWorld.world.contentList[_engine.looper].type || 'cubeLightTex' == _matrixWorld.world.contentList[_engine.looper].type || 'cubeMap' == _matrixWorld.world.contentList[_engine.looper].type) {
          _matrixWorld.world.GL.gl.useProgram(_matrixWorld.world.contentList[_engine.looper].shaderProgram);
          _matrixWorld.world.drawCube(_matrixWorld.world.contentList[_engine.looper], 'noray');
        } else if (_matrixWorld.world.contentList[_engine.looper].type.indexOf("custom-") != -1) {
          // interest part - frst time draw func taken from object inself not from world.
          // Looks like better solution.
          _matrixWorld.world.GL.gl.useProgram(_matrixWorld.world.contentList[_engine.looper].shaderProgram);
          _matrixWorld.world.contentList[_engine.looper].drawCustom(_matrixWorld.world.contentList[_engine.looper]);
          _matrixWorld.world.animate(_matrixWorld.world.contentList[_engine.looper]);
          //
        } else if ('pyramid' == _matrixWorld.world.contentList[_engine.looper].type) {
          _matrixWorld.world.GL.gl.useProgram(_matrixWorld.world.contentList[_engine.looper].shaderProgram);
          _matrixWorld.world.drawPyramid(_matrixWorld.world.contentList[_engine.looper], 'noray');
        } else if ('obj' == _matrixWorld.world.contentList[_engine.looper].type) {
          _matrixWorld.world.GL.gl.useProgram(_matrixWorld.world.contentList[_engine.looper].shaderProgram);
          _matrixWorld.world.drawObj(_matrixWorld.world.contentList[_engine.looper], 'noray');
        } else if ('squareTex' == _matrixWorld.world.contentList[_engine.looper].type) {
          _matrixWorld.world.GL.gl.useProgram(_matrixWorld.world.contentList[_engine.looper].shaderProgram);
          _matrixWorld.world.drawSquareTex(_matrixWorld.world.contentList[_engine.looper], 'noray');
        } else if ('sphereLightTex' == _matrixWorld.world.contentList[_engine.looper].type || 'sphere' == _matrixWorld.world.contentList[_engine.looper].type || 'generatorLightTex' == _matrixWorld.world.contentList[_engine.looper].type) {
          _matrixWorld.world.GL.gl.useProgram(_matrixWorld.world.contentList[_engine.looper].shaderProgram);
          _matrixWorld.world.drawSphere(_matrixWorld.world.contentList[_engine.looper], 'noray');
        }
      }
      (0, _engine.modifyLooper)(_engine.looper + 1);
    }
    (0, _engine.modifyLooper)(0);

    // maybe no need here
    _matrixWorld.world.GL.gl.enable(_matrixWorld.world.GL.gl.BLEND);
    _matrixWorld.world.GL.gl.depthMask(false);

    // all non FBO but blended
    while (_engine.looper <= _matrixWorld.world.contentList.length - 1) {
      if (_matrixWorld.world.contentList[_engine.looper].visible === true && !_matrixWorld.world.contentList[_engine.looper].FBO && _matrixWorld.world.contentList[_engine.looper].glBlend.blendEnabled == true) {
        if ('triangle' == _matrixWorld.world.contentList[_engine.looper].type) {
          _matrixWorld.world.GL.gl.useProgram(_matrixWorld.world.contentList[_engine.looper].shaderProgram);
          _matrixWorld.world.drawTriangle(_matrixWorld.world.contentList[_engine.looper], 'noray');
        } else if ('square' == _matrixWorld.world.contentList[_engine.looper].type) {
          _matrixWorld.world.GL.gl.useProgram(_matrixWorld.world.contentList[_engine.looper].shaderProgram);
          _matrixWorld.world.drawSquare(_matrixWorld.world.contentList[_engine.looper], 'noray');
        } else if ('cube' == _matrixWorld.world.contentList[_engine.looper].type || 'cubeTex' == _matrixWorld.world.contentList[_engine.looper].type || 'cubeLightTex' == _matrixWorld.world.contentList[_engine.looper].type || 'cubeMap' == _matrixWorld.world.contentList[_engine.looper].type) {
          _matrixWorld.world.GL.gl.useProgram(_matrixWorld.world.contentList[_engine.looper].shaderProgram);
          _matrixWorld.world.drawCube(_matrixWorld.world.contentList[_engine.looper], 'noray');
        } else if (_matrixWorld.world.contentList[_engine.looper].type.indexOf("custom-") != -1) {
          // interest part - frst time draw func taken from object inself not from world.
          // Looks like better solution.
          _matrixWorld.world.GL.gl.useProgram(_matrixWorld.world.contentList[_engine.looper].shaderProgram);
          _matrixWorld.world.contentList[_engine.looper].drawCustom(_matrixWorld.world.contentList[_engine.looper]);
          _matrixWorld.world.animate(_matrixWorld.world.contentList[_engine.looper]);
          //
        } else if ('pyramid' == _matrixWorld.world.contentList[_engine.looper].type) {
          _matrixWorld.world.GL.gl.useProgram(_matrixWorld.world.contentList[_engine.looper].shaderProgram);
          _matrixWorld.world.drawPyramid(_matrixWorld.world.contentList[_engine.looper], 'noray');
        } else if ('obj' == _matrixWorld.world.contentList[_engine.looper].type) {
          _matrixWorld.world.GL.gl.useProgram(_matrixWorld.world.contentList[_engine.looper].shaderProgram);
          _matrixWorld.world.drawObj(_matrixWorld.world.contentList[_engine.looper], 'noray');
        } else if ('squareTex' == _matrixWorld.world.contentList[_engine.looper].type) {
          _matrixWorld.world.GL.gl.useProgram(_matrixWorld.world.contentList[_engine.looper].shaderProgram);
          _matrixWorld.world.drawSquareTex(_matrixWorld.world.contentList[_engine.looper]), 'noray';
        } else if ('sphereLightTex' == _matrixWorld.world.contentList[_engine.looper].type || 'sphere' == _matrixWorld.world.contentList[_engine.looper].type || 'generatorLightTex' == _matrixWorld.world.contentList[_engine.looper].type) {
          _matrixWorld.world.GL.gl.useProgram(_matrixWorld.world.contentList[_engine.looper].shaderProgram);
          _matrixWorld.world.drawSphere(_matrixWorld.world.contentList[_engine.looper], 'noray');
        }
      }
      (0, _engine.modifyLooper)(_engine.looper + 1);
    }
    (0, _engine.modifyLooper)(0);
    _matrixWorld.world.GL.gl.depthMask(true);

    // Back to drawing on the main color buffer!
    _matrixWorld.world.GL.gl.bindFramebuffer(_matrixWorld.world.GL.gl.FRAMEBUFFER, null);
    // Multi FBO camera view works but obj seq speed up - probably becouse OSC !! must be fixed

    // Reset camera
    if (typeof _matrixWorld.world.FBOS[0] !== 'undefined') {
      matrixEngine.Events.camera.zPos = matrixEngine.Events.camera.zPosMemo;
      matrixEngine.Events.camera.xPos = matrixEngine.Events.camera.xPosMemo;
      matrixEngine.Events.camera.yPos = matrixEngine.Events.camera.yPosMemo;
      matrixEngine.Events.camera.pitch = matrixEngine.Events.camera.pitchMemo;
      matrixEngine.Events.camera.yaw = matrixEngine.Events.camera.yawMemo;
    }
  }
  _matrixWorld.world.GL.gl.viewport(0, 0, _matrixWorld.world.GL.gl.canvas.width, _matrixWorld.world.GL.gl.canvas.height);
  _matrixWorld.world.GL.gl.clearColor(0.0, 0.0, 0.0, 1.0);
  _matrixWorld.world.GL.gl.clear(_matrixWorld.world.GL.gl.COLOR_BUFFER_BIT | _matrixWorld.world.GL.gl.DEPTH_BUFFER_BIT);

  // Draw again all
  _matrixWorld.world.GL.gl.enable(_matrixWorld.world.GL.gl.DEPTH_TEST);
  _matrixWorld.world.GL.gl.disable(_matrixWorld.world.GL.gl.BLEND);
  _matrixWorld.world.GL.gl.depthMask(true);

  // All but no blend
  while (_engine.looper <= _matrixWorld.world.contentList.length - 1) {
    if (_matrixWorld.world.contentList[_engine.looper].visible === true && _matrixWorld.world.contentList[_engine.looper].glBlend.blendEnabled == false) {
      if ('triangle' == _matrixWorld.world.contentList[_engine.looper].type) {
        _matrixWorld.world.GL.gl.useProgram(_matrixWorld.world.contentList[_engine.looper].shaderProgram);
        _matrixWorld.world.drawTriangle(_matrixWorld.world.contentList[_engine.looper]);
        _matrixWorld.world.animate(_matrixWorld.world.contentList[_engine.looper]);
      } else if ('square' == _matrixWorld.world.contentList[_engine.looper].type) {
        _matrixWorld.world.GL.gl.useProgram(_matrixWorld.world.contentList[_engine.looper].shaderProgram);
        _matrixWorld.world.drawSquare(_matrixWorld.world.contentList[_engine.looper]);
        _matrixWorld.world.animate(_matrixWorld.world.contentList[_engine.looper]);
      } else if ('cube' == _matrixWorld.world.contentList[_engine.looper].type || 'cubeTex' == _matrixWorld.world.contentList[_engine.looper].type || 'cubeLightTex' == _matrixWorld.world.contentList[_engine.looper].type || 'cubeMap' == _matrixWorld.world.contentList[_engine.looper].type) {
        _matrixWorld.world.GL.gl.useProgram(_matrixWorld.world.contentList[_engine.looper].shaderProgram);
        _matrixWorld.world.drawCube(_matrixWorld.world.contentList[_engine.looper]);
        _matrixWorld.world.animate(_matrixWorld.world.contentList[_engine.looper]);
      } else if (_matrixWorld.world.contentList[_engine.looper].type.indexOf("custom-") != -1) {
        // interest part - frst time draw func taken from object inself not from world.
        // Looks like better solution.
        _matrixWorld.world.GL.gl.useProgram(_matrixWorld.world.contentList[_engine.looper].shaderProgram);
        _matrixWorld.world.contentList[_engine.looper].drawCustom(_matrixWorld.world.contentList[_engine.looper]);
        _matrixWorld.world.animate(_matrixWorld.world.contentList[_engine.looper]);
        //
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
    }
    (0, _engine.modifyLooper)(_engine.looper + 1);
  }
  _matrixWorld.world.GL.gl.enable(_matrixWorld.world.GL.gl.BLEND);
  _matrixWorld.world.GL.gl.depthMask(false);
  (0, _engine.modifyLooper)(0);

  // all but blend
  while (_engine.looper <= _matrixWorld.world.contentList.length - 1) {
    if (_matrixWorld.world.contentList[_engine.looper].visible === true && _matrixWorld.world.contentList[_engine.looper].glBlend.blendEnabled == true) {
      if ('triangle' == _matrixWorld.world.contentList[_engine.looper].type) {
        _matrixWorld.world.GL.gl.useProgram(_matrixWorld.world.contentList[_engine.looper].shaderProgram);
        _matrixWorld.world.drawTriangle(_matrixWorld.world.contentList[_engine.looper]);
        _matrixWorld.world.animate(_matrixWorld.world.contentList[_engine.looper]);
      } else if ('square' == _matrixWorld.world.contentList[_engine.looper].type) {
        _matrixWorld.world.GL.gl.useProgram(_matrixWorld.world.contentList[_engine.looper].shaderProgram);
        _matrixWorld.world.drawSquare(_matrixWorld.world.contentList[_engine.looper]);
        _matrixWorld.world.animate(_matrixWorld.world.contentList[_engine.looper]);
      } else if ('cube' == _matrixWorld.world.contentList[_engine.looper].type || 'cubeTex' == _matrixWorld.world.contentList[_engine.looper].type || 'cubeLightTex' == _matrixWorld.world.contentList[_engine.looper].type || 'cubeMap' == _matrixWorld.world.contentList[_engine.looper].type) {
        _matrixWorld.world.GL.gl.useProgram(_matrixWorld.world.contentList[_engine.looper].shaderProgram);
        _matrixWorld.world.drawCube(_matrixWorld.world.contentList[_engine.looper]);
        _matrixWorld.world.animate(_matrixWorld.world.contentList[_engine.looper]);
      } else if (_matrixWorld.world.contentList[_engine.looper].type.indexOf("custom-") != -1) {
        // interest part - frst time draw func taken from object inself not from world.
        // Looks like better solution.
        _matrixWorld.world.GL.gl.useProgram(_matrixWorld.world.contentList[_engine.looper].shaderProgram);
        _matrixWorld.world.contentList[_engine.looper].drawCustom(_matrixWorld.world.contentList[_engine.looper]);
        _matrixWorld.world.animate(_matrixWorld.world.contentList[_engine.looper]);
        //
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
    }
    (0, _engine.modifyLooper)(_engine.looper + 1);
  }
  (0, _engine.modifyLooper)(0);
  _matrixWorld.world.GL.gl.depthMask(true);
  if (_manifest.default.raycast) {
    if (secondPass <= 2) {
      raycaster.touchCoordinate.enabled = false;
      secondPass = 0;
    }
  }
  secondPass++;
  physicsLooper = 0;
  (0, _engine.updateFPS)(1);
  if (_manifest.default.offScreenCanvas == true) exports.reDrawID = reDrawID = setTimeout(() => _manifest.default.operation.reDrawGlobal(), _manifest.default.redrawInterval);
  if (_matrixWorld.world.animLine) {
    // animatinLine
    _matrixWorld.world.globalAnimCounter++;
    if (_matrixWorld.world.globalAnimCounter >= _matrixWorld.world.globalAnimSequenceSize) {
      _matrixWorld.world.globalAnimCounter = 0;
      if (_matrixWorld.world.timeline.commands[_matrixWorld.world.globalAnimCurSequence]) {
        // auto call
        _matrixWorld.world.timeline.commands[_matrixWorld.world.globalAnimCurSequence]();
        // console.log("TIMELINE SEQ EXE");
      }
      // VALIDACIJA
      if (_matrixWorld.world.globalAnimCurSequence >= _matrixWorld.world.globalAnimTotalSequence) {
        // for now simple reset - we can add option for reverse playing ...
        _matrixWorld.world.globalAnimCurSequence = 0;
      }
      _matrixWorld.world.globalAnimCurSequence++;
      document.getElementById('globalAnimCurSequence').innerText = _matrixWorld.world.globalAnimCurSequence;
    }
    document.getElementById('globalAnimCounter').innerText = _matrixWorld.world.globalAnimCounter;
    document.getElementById('timeline').value = _matrixWorld.world.globalAnimCounter;
  }
};

/* Field of view, Width height ratio, min distance of viewpoint, max distance of viewpoint, */
_manifest.default.operation.CameraPerspective = function () {
  this.GL.gl.viewport(0, 0, canvas.width, canvas.height);
  this.GL.gl.clear(this.GL.gl.COLOR_BUFFER_BIT | this.GL.gl.DEPTH_BUFFER_BIT);
  mat4.perspective(this.pMatrix, (0, _engine.degToRad)(_manifest.default.camera.viewAngle), this.GL.gl.viewportWidth / this.GL.gl.viewportHeight, _manifest.default.camera.nearViewpoint, _manifest.default.camera.farViewpoint);
};
_manifest.default.operation.simplyRender = function (time) {
  (0, _engine.modifyLooper)(0);
  if (_manifest.default.offScreenCanvas == false) exports.reDrawID = reDrawID = requestAnimationFrame(_manifest.default.operation.simplyRender);
  _matrixWorld.world.renderPerspective();
  for (var t = 0; t < _manifest.default.updateBeforeDraw.length; t++) {
    _manifest.default.updateBeforeDraw[t].UPDATE();
  }

  // Physics
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
        // matrixEngine.matrixWorld.world.physics.toDeg
      }
      physicsLooper++;
    }
  }

  // reset to zero
  physicsLooper = 0;

  // Back to drawing on the main color buffer!
  // world.GL.gl.bindFramebuffer(world.GL.gl.FRAMEBUFFER, null);
  _matrixWorld.world.GL.gl.viewport(0, 0, _matrixWorld.world.GL.gl.canvas.width, _matrixWorld.world.GL.gl.canvas.height);
  // world.GL.gl.clearColor(0.0, 0.0, 0.0, 1.0);
  // world.GL.gl.clear(world.GL.gl.COLOR_BUFFER_BIT | world.GL.gl.DEPTH_BUFFER_BIT);

  // Draw again all
  _matrixWorld.world.GL.gl.enable(_matrixWorld.world.GL.gl.DEPTH_TEST);
  _matrixWorld.world.GL.gl.disable(_matrixWorld.world.GL.gl.BLEND);
  _matrixWorld.world.GL.gl.depthMask(true);
  while (_engine.looper <= _matrixWorld.world.contentList.length - 1) {
    if (_matrixWorld.world.contentList[_engine.looper].visible === true) {
      if ('triangle' == _matrixWorld.world.contentList[_engine.looper].type) {
        _matrixWorld.world.GL.gl.useProgram(_matrixWorld.world.contentList[_engine.looper].shaderProgram);
        _matrixWorld.world.drawTriangle(_matrixWorld.world.contentList[_engine.looper]);
        _matrixWorld.world.animate(_matrixWorld.world.contentList[_engine.looper]);
      } else if ('square' == _matrixWorld.world.contentList[_engine.looper].type) {
        _matrixWorld.world.GL.gl.useProgram(_matrixWorld.world.contentList[_engine.looper].shaderProgram);
        _matrixWorld.world.drawSquare(_matrixWorld.world.contentList[_engine.looper]);
        _matrixWorld.world.animate(_matrixWorld.world.contentList[_engine.looper]);
      } else if ('cube' == _matrixWorld.world.contentList[_engine.looper].type || 'cubeTex' == _matrixWorld.world.contentList[_engine.looper].type || 'cubeLightTex' == _matrixWorld.world.contentList[_engine.looper].type || 'cubeMap' == _matrixWorld.world.contentList[_engine.looper].type) {
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
    }
    (0, _engine.modifyLooper)(_engine.looper + 1);
  }
  _matrixWorld.world.GL.gl.enable(_matrixWorld.world.GL.gl.BLEND);
  _matrixWorld.world.GL.gl.depthMask(false);
  (0, _engine.modifyLooper)(0);
  _matrixWorld.world.GL.gl.depthMask(true);
  if (_manifest.default.raycast) {
    if (secondPass <= 2) {
      raycaster.touchCoordinate.enabled = false;
      secondPass = 0;
    }
  }
  secondPass++;
  physicsLooper = 0;
  (0, _engine.updateFPS)(1);
  if (_matrixWorld.world.animLine) {
    // animatinLine
    _matrixWorld.world.globalAnimCounter++;
    if (_matrixWorld.world.globalAnimCounter >= _matrixWorld.world.globalAnimSequenceSize) {
      _matrixWorld.world.globalAnimCounter = 0;
      _matrixWorld.world.globalAnimCurSequence++;
      document.getElementById('globalAnimCurSequence').innerText = _matrixWorld.world.globalAnimCurSequence;
    }
    document.getElementById('globalAnimCounter').innerText = _matrixWorld.world.globalAnimCounter;
    document.getElementById('timeline').value = _matrixWorld.world.globalAnimCounter;
  }
  if (_manifest.default.offScreenCanvas == true) exports.reDrawID = reDrawID = setTimeout(() => _manifest.default.operation.simplyRender(), _manifest.default.redrawInterval);
};

},{"../program/manifest":42,"./engine":4,"./matrix-world":19,"./raycast":25,"./utility":31}],14:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.generateCubeMapShaderSrc1 = generateCubeMapShaderSrc1;
exports.generateCustomShaderSrc1 = generateCustomShaderSrc1;
exports.generateLensDefinitions11 = generateLensDefinitions11;
exports.generateLensMain11 = generateLensMain11;
exports.generateShaderSrc = generateShaderSrc;
exports.generateSpotLightShadowDefinitions1 = generateSpotLightShadowDefinitions1;
exports.generateSpotLightShadowMain1 = generateSpotLightShadowMain1;
/**
* @description
* webGL1
* GLSL 1.1/1.2
**/
function generateShaderSrc(numTextures, mixOperand, lightType) {
  return `// Matrix-engine shader for ${numTextures} textures samples.
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
    varying vec3 v_normal;
    
    ` + (typeof lightType !== 'undefined' && lightType == 'spot' ? generateSpotLightDefinitions1() : ``) + `

    ` + (typeof lightType !== 'undefined' && lightType == 'specular' ? generateSpecularLightDefinitions1() : ``) + `

    ` + (typeof lightType !== 'undefined' && lightType == 'lens' ? generateLensDefinitions1() : ``) + `

    void main(void) {

        vec4 textureColor = texture2D(uSampler, vec2(vTextureCoord.s, vTextureCoord.t));
        vec4 textureColor1 = texture2D(uSampler1, vec2(vTextureCoord.s, vTextureCoord.t));
        vec4 textureColor2 = texture2D(uSampler2, vec2(vTextureCoord.s, vTextureCoord.t));
        vec4 textureColor3 = texture2D(uSampler3, vec2(vTextureCoord.s, vTextureCoord.t));
        vec4 textureColor4 = texture2D(uSampler4, vec2(vTextureCoord.s, vTextureCoord.t));

        if (${numTextures} == 1) {
          gl_FragColor = vec4(textureColor.rgb * vLightWeighting, textureColor.a);
          // gl_FragColor = vec4( smoothstep(textureColor.r, textureColor.b,textureColor.g ) , smoothstep(textureColor.r, textureColor.b,textureColor.g ) ,0 ,smoothstep(textureColor.r, textureColor.b,textureColor.g));
        } else if (${numTextures} == 2) {
          if ( ${mixOperand} == 0) {
            gl_FragColor    = vec4( (textureColor.rgb * textureColor1.rgb) * vLightWeighting, textureColor.a);
          } else if (${mixOperand} == 1) {
            gl_FragColor    = vec4( (textureColor.rgb / textureColor1.rgb) * vLightWeighting, textureColor.a);
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

    ` + (typeof lightType !== 'undefined' && lightType == 'spot' ? generateSpotLightMain1() : ``) + `

    ` + (typeof lightType !== 'undefined' && lightType == 'specular' ? generateSpecularLightMain1() : ``) + `

    ` + (typeof lightType !== 'undefined' && lightType == 'lens' ? generateLensMain1(numTextures) : ``) + `

    }`;
}
function generateSpotLightDefinitions1() {
  return `
  // inject generateSpotLightDefinitions1
  varying vec3 v_surfaceToLight;
  varying vec3 v_surfaceToView;

  uniform vec4 u_color;
  uniform float u_shininess;
  uniform vec3 u_lightDirection;
  uniform float u_innerLimit;
  uniform float u_outerLimit;
  // inject generateSpotLightDefinitions1 end
  `;
}
function generateSpotLightMain1() {
  return `
  vec3 normal = normalize(v_normal);

  vec3 surfaceToLightDirection = normalize(v_surfaceToLight);
  vec3 surfaceToViewDirection = normalize(v_surfaceToView);
  vec3 halfVector = normalize(surfaceToLightDirection + surfaceToViewDirection);
  float dotFromDirection = dot(surfaceToLightDirection, -u_lightDirection);
  float limitRange = u_innerLimit - u_outerLimit;
  float inLight = clamp((dotFromDirection - u_outerLimit) / limitRange, 0.0, 1.0);
  float light = inLight * dot(normal, surfaceToLightDirection);
  float specular = inLight * pow(dot(normal, halfVector), u_shininess);
  gl_FragColor.rgb *= light;
  gl_FragColor.rgb += specular;
  `;
}
function generateSpecularLightDefinitions1() {
  return `// Passed varying from the vertex shader.
  uniform mat4 uMVMatrixINTER;
  uniform mat3 uNMatrixINTER;
  uniform mat4 uPMatrixINNTER;

  uniform vec3 uLightPosition;
  uniform vec3 uFogColor;
  uniform vec2 uFogDist;

  varying vec4 vColor;
  varying vec3 vNormal;
  varying vec4 vPosition;
  varying float vDist;
  `;
}
function generateSpecularLightMain1() {
  return `
  vec3 normal = normalize(v_normal);
  vec3 lightPosition = vec3(uMVMatrixINTER * vec4(uLightPosition, 1) - vPosition);
  vec3 lightDirection = normalize(lightPosition);

  // The dot product of the light direction and the orientation of a surface (the normal)
  // This will be the "diffuse factor"
  float nDotL = max(dot(lightDirection, normal), 0.1);

  // Specular vars to canculate
  float specularPower = 0.1;
  float specular = 0.0;

  if (nDotL > 0.0) {
    vec3 viewVec = vec3(0,0,1);
    // reflective vector
    vec3 reflectVec = reflect(-lightDirection, normal);
    // determine the specularFactor based on the dot product of viewing and reflective,
    // taking at least a minimum of 0.0
    float specularFactor = max(dot(reflectVec, viewVec), 0.0);
    specular = pow(specularFactor, specularPower);
  }
  gl_FragColor.rgb =  textureColor.rgb * vLightWeighting * nDotL - specular;
  gl_FragColor.a = textureColor.a;
  `;
}
function generateLensDefinitions11() {
  return `// lens effect
  uniform vec3 uLightPosition;
  uniform vec3 uResolution;
  uniform vec3 uControl;
  `;
}
function generateLensMain11(numTextures) {
  return `
  vec2 rez = vec2(uResolution.x , uResolution.y );
  vec2 uC = vec2(uControl.x, uControl.y);
  vec3 pixel_color;
  float lens_radius = min(0.3 * rez.x, 250.0);
  vec2 mouse_direction = uC - gl_FragCoord.xy;
  float mouse_distance = length(mouse_direction);
  float exp = 1.0;
  vec2 offset = (1.0 - pow(mouse_distance / lens_radius, exp)) * mouse_direction;
  if (mouse_distance < lens_radius) {
    pixel_color = texture(uSampler, vTextureCoord + offset / rez ).rgb;
    pixel_color.rgb =  pixel_color.rgb * vLightWeighting;
  } else {
    pixel_color.rgb =  textureColor.rgb * vLightWeighting;
  }
  // todo
  // if (${numTextures} == 1) { }
  gl_FragColor = vec4(pixel_color, 1.0);
  gl_FragColor.a = textureColor.a;
  `;
}
function generateCubeMapShaderSrc1(numTextures, mixOperand, lightType) {
  return `
  precision mediump float;
  varying vec2 vTextureCoord;
  varying vec3 vLightWeighting;
  // The CubeMap texture test.
  uniform samplerCube u_texture;
  varying vec3 v_normal_cubemap;
  uniform float numberOfsamplers; 
  varying vec3 v_normal;
  void main(void) {
    vec3 normal = normalize(v_normal_cubemap);
    vec4 textureColor = textureCube(u_texture, normal) * vec4(1,1,1,1);
    gl_FragColor = vec4(textureColor.rgb * vLightWeighting, textureColor.a);
}`;
}
function generateCustomShaderSrc1(numTextures, mixOperand, code_) {
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
        if(${numTextures} == 1){
            if(CODE == 0){
              gl_FragColor = vec4(textureColor.rgb * vLightWeighting, textureColor.a);
            }
            else if(CODE == 1){
                gl_FragColor = vec4( smoothstep(textureColor.r, textureColor.b,textureColor.g ) , smoothstep(textureColor.r, textureColor.b,textureColor.g ) , 0 , 1 );
            }
            else if(CODE == 2){
              gl_FragColor = vec4( smoothstep(textureColor.r, textureColor.b , textureColor.g ) , 1 , 0 , 1 );
            }
            else if(CODE == 3){
              gl_FragColor = vec4( smoothstep( textureColor.g , textureColor.b , 0.5 ) , 1 , 0 , 1 );
            }
            else if(CODE == 4){
              // textureColor
              vec2 position =  vTextureCoord;
              float color = 0.3;
              gl_FragColor = vec4( vec3( color , color * 0.5, sin( color + TimeFor / 3.0 ) * 0.75 ), 1.0 );
            }
        }
        else if(${numTextures} == 2){
            if( ${mixOperand} == 0){
              gl_FragColor = vec4((textureColor.rgb * textureColor1.rgb) * vLightWeighting, textureColor.a);
            }
            else if (${mixOperand} == 1){
              gl_FragColor = vec4((textureColor.rgb / textureColor1.rgb) * vLightWeighting, textureColor.a);
            }
        }
        else if (${numTextures} == 3) {
            if (MixOperandString == 0){
              gl_FragColor =vec4( (textureColor.rgb * textureColor1.rgb * textureColor2.rgb ) * vLightWeighting, textureColor.a);
            }
            else if (MixOperandString == 1){
              gl_FragColor = vec4( (textureColor.rgb * textureColor1.rgb / textureColor2.rgb ) * vLightWeighting, textureColor.a);
            }
        }
        else if (${numTextures} == 4) {
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
function generateSpotLightShadowDefinitions1() {
  return `// inject generateSpotLightShadowDefinitions
  uniform sampler2D u_projectedTexture;
  uniform sampler2D u_texture;
  varying vec2 v_texcoord;
  uniform float u_bias;
  varying vec4 v_projectedTexcoord;
  varying vec3 v_surfaceToLight;
  varying vec3 v_surfaceToView;
  uniform vec4 u_color;
  uniform float u_shininess;
  uniform vec3 u_lightDirection;
  uniform float u_innerLimit;
  uniform float u_outerLimit;
  uniform mat4 u_projection;
  uniform mat4 u_view;
  uniform mat4 u_world;
  uniform mat4 u_textureMatrix;
  // inject generateSpotLightShadowDefinitions end
  `;
}
function generateSpotLightShadowMain1() {
  return `
  // vec3 normal = normalize(v_normal);
  vec3 surfaceToLightDirection = normalize(v_surfaceToLight);
  vec3 surfaceToViewDirection = normalize(v_surfaceToView);
  vec3 halfVector = normalize(surfaceToLightDirection + surfaceToViewDirection);
  float dotFromDirection = dot(surfaceToLightDirection, -u_lightDirection);
  float limitRange = u_innerLimit - u_outerLimit;
  float inLight = clamp((dotFromDirection - u_outerLimit) / limitRange, 0.0, 1.0);
  float light = inLight * dot(normal, surfaceToLightDirection);
  float specular = inLight * pow(dot(normal, halfVector), u_shininess);

  vec3 projectedTexcoord = v_projectedTexcoord.xyz / v_projectedTexcoord.w;
  float currentDepth = projectedTexcoord.z + u_bias;

  bool inRange =
      projectedTexcoord.x >= 0.0 &&
      projectedTexcoord.x <= 1.0 &&
      projectedTexcoord.y >= 0.0 &&
      projectedTexcoord.y <= 1.0;

  // the 'r' channel has the depth values
  float projectedDepth = texture(u_projectedTexture, projectedTexcoord.xy).r;
  float shadowLight = (inRange && projectedDepth <= currentDepth) ? 0.0 : 1.0;
  vec4 texColor = texture(u_texture, v_texcoord) * vec4(0.5, 0.5, 1, 1);
  gl_FragColor = vec4(
    texColor.rgb * light * shadowLight +
    specular * shadowLight,
    texColor.a);
  `;
}

},{}]