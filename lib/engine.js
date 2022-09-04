/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

import {EVENTS, SYS} from './events';
import App from '../program/manifest';
import {E} from './utility';
import {WebGLUtils} from './webgl-utils';
import {reDrawID} from './matrix-render';
import {frames, modifyFrames, objListToDispose} from './matrix-world';

export var wd = 0,
  ht = 0,
  lastTime = 0,
  totalTime = 0,
  updateTime = 0,
  updateFrames = 0;

export let EVENTS_INSTANCE = null;
export let looper = 0;

export function modifyLooper(value) {
  looper = value;
}

export function resizeView() {
  wd = document.body.clientWidth - 4;
  if(document.body.clientHeight > document.documentElement.clientHeight) {
    ht = document.body.clientHeight - 10;
  } else {
    ht = document.documentElement.clientHeight - 4;
  }
}

export function initApp(callback) {
  /* Calculate Width and Height before rendering       */

  resizeView();

  drawCanvas();
  window.canvas = document.getElementById('canvas');

  if(App.events == true && EVENTS_INSTANCE === null) {
    EVENTS_INSTANCE = new EVENTS(E('canvas'));
  }

  if(typeof callback !== 'undefined') {
    // E('canvas').webGLStartCallBack = callback;
    window.webGLStartCallBack = callback;
    callback();
  }

}

export function isReady() {
  if(0 == world) {
    return false;
  } else {
    return true;
  }
}

export async function load_shaders(href) {
  new Promise((resolve, reject) => {
    function handler() {
      if(this.status == 200 && this.responseText != null) {
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
    if(this.status == 200 && this.responseText != null) {
      // Success
      document.getElementById('media-holder').innerHTML = this.responseText;
      if(typeof callback !== 'undefined') {
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
// WebGL start
// Base environment property for totality of WEBGL
export function defineWebGLWorld(cavnas) {
  // console.log("      Define the WEBGL base pocket");
  var world = new Object();
  /* Constructor for a particular GL environment   */
  try {
    var gl = WebGLUtils.setupWebGL(canvas);
    gl.viewportWidth = canvas.width;
    gl.viewportHeight = canvas.height;
    world.gl = gl;
    // console.log("      WEBGL base pocket: SUCCESS");
  } catch(e) {
    /* Exception: Could not initialise WebGL     */
    // console.log("      Exception in WEBGL base pocket: " + e);
  }
  /* Destructor                                    */
  world.destroy = function() {
    delete this.gl;
    delete this;
  };
  return world;
}

// Update the frame rate FPS counter
export function updateFPS(elements) {
  // // console.log("    Update FPS");
  var now = new Date().getTime();

  var delta = now - lastTime;
  lastTime = now;

  totalTime = totalTime + delta;
  updateTime = updateTime + delta;

  // eslint-disable-next-line no-global-assign
  modifyFrames(frames + 1);

  updateFrames = updateFrames + 1;

  if(1000 < updateTime) {
    document.getElementById('fps').innerHTML = 'FPS AVG:' + Math.floor((1000 * frames) / totalTime / elements) + ' CUR:' + Math.floor((1000 * updateFrames) / updateTime / elements + ' matrixEngine');
    updateTime = 0;
    updateFrames = 0;
  }
}

export function drawCanvas() {
  // console.log("Init the canvas...");
  var canvas = document.createElement('canvas');
  canvas.id = 'canvas';
  if(App.resize.canvas == "full-screen") {
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

/* Degree to Radian converter                        */
export function degToRad(degrees) {
  return (degrees * Math.PI) / 180;
}

/* One time initiation of FPS to store initial time  */
export function initiateFPS() {
  // console.log("    Initiate FPS");
  lastTime = new Date().getTime();
}

// Help the browser Garbage collect
window.onbeforeunload = onExit;

//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
// Provides cancelRequestAnimFrame in a cross browser way.
//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$

window.cancelRequestAnimFrame = (function() {
  return (
    window.cancelAnimationFrame ||
    window.webkitCancelRequestAnimationFrame ||
    window.mozCancelRequestAnimationFrame ||
    window.oCancelRequestAnimationFrame ||
    window.msCancelRequestAnimationFrame ||
    function(callback) {
      window.clearTimeout(callback);
    }
  );
})();

//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
// Dispose off the dangling objects
//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
export function onExit() {
  /* RIP Mouse object                              */
  //mouseLoc.destroy();

  /* RIP Objects                                   */
  looper = 0;
  while(looper <= objListToDispose.length - 1) {
    objListToDispose[looper].destroy();
    looper = looper + 1;
  }

  objListToDispose.length = 0;
}

App.operation.destroyWorld = function() {
  // console.log("    Destroy at iteration:" + reDrawID);
  /* Stop the render                               */
  cancelRequestAnimFrame(reDrawID);
  delete this.pMatrix;
  delete this.mvMatrixStack;
  looper = 0;
  while(looper <= this.contentList.length - 1) {
    // console.log("    Destroying: " + this.contentList[looper].type);
    delete this.contentList[looper].type;
    delete this.contentList[looper].size;
    delete this.contentList[looper].sides;

    /* Dispose the shaders                       */
    if(this.contentList[looper].shaderProgram.fragmentShader) {
      // console.log("      Dispose Fragment Shader");
      this.GL.gl.deleteShader(this.contentList[looper].shaderProgram.fragmentShader);
      delete this.contentList[looper].shaderProgram.fragmentShader;
    }

    if(this.contentList[looper].shaderProgram.vertexShader) {
      // console.log("      Dispose Vertex Shader");
      this.GL.gl.deleteShader(this.contentList[looper].shaderProgram.vertexShader);
      delete this.contentList[looper].shaderProgram.vertexShader;
    }

    /* Dispose the texture                       */
    if(this.contentList[looper].texture) {
      // console.log("      Dispose Texture");
      // must be improved Nikola Lukic

      try {
        this.GL.gl.deleteTexture(this.contentList[looper].texture);
      } catch(e) {
        SYS.DEBUG.WARNING('Problem in destroying function : This is e log : ' + e);
      }

      delete this.contentList[looper].texture;
    }

    /* Dispose the program                       */
    if(this.contentList[looper].shaderProgram) {
      // console.log("      Dispose Shader program");
      this.GL.gl.deleteProgram(this.contentList[looper].shaderProgram);
      delete this.contentList[looper].shaderProgram;
    }

    /* Empty the buffers                         */
    // console.log("      Dispose buffers");
    if(this.contentList[looper].vertexPositionBuffer) {
      // console.log("        Dispose Vertex Position Buffer");
      this.GL.gl.deleteBuffer(this.contentList[looper].vertexPositionBuffer);
      delete this.contentList[looper].vertexPositionBuffer;
    }
    if(this.contentList[looper].vertexTexCoordBuffer) {
      // console.log("        Dispose Vertex Coordinate Buffer");
      this.GL.gl.deleteBuffer(this.contentList[looper].vertexTexCoordBuffer);
      delete this.contentList[looper].vertexTexCoordBuffer;
    }
    if(this.contentList[looper].vertexColorBuffer) {
      // console.log("        Dispose Vertex Color Buffer");
      this.GL.gl.deleteBuffer(this.contentList[looper].vertexColorBuffer);
      delete this.contentList[looper].vertexColorBuffer;
    }
    if(this.contentList[looper].vertexIndexBuffer) {
      // console.log("        Dispose Vertex Index Buffer");
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

//##################################
// LOAD SHADERS DYNAMIC
//##################################
export function loadShaders(gl, id) {
  // console.log("          Get the Shader");
  // console.log("            Creating Shader:" + id);
  var shaderScript = document.getElementById(id);
  var shader;
  var str = '';

  if(shaderScript) {
    var k = shaderScript.firstChild;
    while(k) {
      if(k.nodeType == 3) {
        str += k.textContent;
      }
      k = k.nextSibling;
    }

    if(shaderScript.type == 'x-shader/x-fragment') {
      // console.log("            Creating fragment shader");
      shader = gl.createShader(gl.FRAGMENT_SHADER);
    } else if(shaderScript.type == 'x-shader/x-vertex') {
      // console.log("            Creating vertex shader");
      shader = gl.createShader(gl.VERTEX_SHADER);
    } else {
      return 0;
    }

    gl.shaderSource(shader, str);
    gl.compileShader(shader);

    if(gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
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

export function initShaders(gl, fragment, vertex) {
  // console.log("      Initialize Shader");
  // console.log("        Fragment Shader:" + fragment);
  // console.log("        Vertex Shader:" + vertex);

  var fragmentShader = this.getShader(gl, fragment);
  var vertexShader = this.getShader(gl, vertex);

  if(0 == fragmentShader || 0 == vertexShader) {
    // console.log("        Failed to Load shader");
    return 0;
  } else {
    var shaderProgram = gl.createProgram();
    // console.log("        Creating Shader fragment");
    gl.attachShader(shaderProgram, vertexShader);
    gl.attachShader(shaderProgram, fragmentShader);
    gl.linkProgram(shaderProgram);

    if(gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
      // console.log("          Returning Shader fragment successfully");
      gl.useProgram(shaderProgram);

      shaderProgram.vertexPositionAttribute = gl.getAttribLocation(shaderProgram, 'aVertexPosition');
      gl.enableVertexAttribArray(shaderProgram.vertexPositionAttribute);

      if(gl.getAttribLocation(shaderProgram, 'aVertexColor') >= 0) {
        shaderProgram.vertexColorAttribute = gl.getAttribLocation(shaderProgram, 'aVertexColor');
        gl.enableVertexAttribArray(shaderProgram.vertexColorAttribute);
      }

      if(gl.getAttribLocation(shaderProgram, 'aTextureCoord') >= 0) {
        shaderProgram.textureCoordAttribute = gl.getAttribLocation(shaderProgram, 'aTextureCoord');
        gl.enableVertexAttribArray(shaderProgram.textureCoordAttribute);
        shaderProgram.samplerUniform = gl.getUniformLocation(shaderProgram, 'uSampler');
      }

      if(gl.getAttribLocation(shaderProgram, 'aVertexNormal') >= 0) {
        shaderProgram.vertexNormalAttribute = gl.getAttribLocation(shaderProgram, 'aVertexNormal');
        gl.enableVertexAttribArray(shaderProgram.vertexNormalAttribute);
      }

      if(null !== gl.getUniformLocation(shaderProgram, 'uNMatrix')) {
        shaderProgram.nMatrixUniform = gl.getUniformLocation(shaderProgram, 'uNMatrix');
      }

      // for 2d sprite test
      if(null !== gl.getUniformLocation(shaderProgram, 'layer')) {
        shaderProgram.layerLocation = gl.getUniformLocation(shaderProgram, 'layer');
      }

      // Test
      if(null !== gl.getUniformLocation(shaderProgram, 'numberOfsamplers')) {
        shaderProgram.numberOfsamplers = gl.getUniformLocation(shaderProgram, 'numberOfsamplers');
      }

      // Test
      if(null !== gl.getUniformLocation(shaderProgram, 'TimeFor')) {
        shaderProgram.uniformTime = gl.getUniformLocation(shaderProgram, 'TimeFor');
      }

      // multi samplers for textutes
      if(null !== gl.getUniformLocation(shaderProgram, 'uSampler')) {
        shaderProgram.samplerUniform = gl.getUniformLocation(shaderProgram, 'uSampler');
      }
      if(null !== gl.getUniformLocation(shaderProgram, 'uSampler1')) {
        shaderProgram.samplerUniform1 = gl.getUniformLocation(shaderProgram, 'uSampler1');
      }
      if(null !== gl.getUniformLocation(shaderProgram, 'uSampler2')) {
        shaderProgram.samplerUniform2 = gl.getUniformLocation(shaderProgram, 'uSampler2');
      }
      if(null !== gl.getUniformLocation(shaderProgram, 'uSampler3')) {
        shaderProgram.samplerUniform3 = gl.getUniformLocation(shaderProgram, 'uSampler3');
      }
      if(null !== gl.getUniformLocation(shaderProgram, 'uSampler4')) {
        shaderProgram.samplerUniform3 = gl.getUniformLocation(shaderProgram, 'uSampler4');
      }
      if(null !== gl.getUniformLocation(shaderProgram, 'uSampler5')) {
        shaderProgram.samplerUniform3 = gl.getUniformLocation(shaderProgram, 'uSampler5');
      }
      if(null !== gl.getUniformLocation(shaderProgram, 'uSampler6')) {
        shaderProgram.samplerUniform3 = gl.getUniformLocation(shaderProgram, 'uSampler6');
      }
      if(null !== gl.getUniformLocation(shaderProgram, 'uSampler7')) {
        shaderProgram.samplerUniform3 = gl.getUniformLocation(shaderProgram, 'uSampler7');
      }
      if(null !== gl.getUniformLocation(shaderProgram, 'uUseLighting')) {
        shaderProgram.useLightingUniform = gl.getUniformLocation(shaderProgram, 'uUseLighting');
      }
      if(null !== gl.getUniformLocation(shaderProgram, 'uAmbientColor')) {
        shaderProgram.ambientColorUniform = gl.getUniformLocation(shaderProgram, 'uAmbientColor');
      }
      if(null !== gl.getUniformLocation(shaderProgram, 'uLightingDirection')) {
        shaderProgram.lightingDirectionUniform = gl.getUniformLocation(shaderProgram, 'uLightingDirection');
      }
      if(null !== gl.getUniformLocation(shaderProgram, 'uDirectionalColor')) {
        shaderProgram.directionalColorUniform = gl.getUniformLocation(shaderProgram, 'uDirectionalColor');
      }

      if ( null !== gl.getUniformLocation(shaderProgram, "u_viewWorldPosition")) {
        shaderProgram.viewWorldPositionLocation = gl.getUniformLocation(shaderProgram, "u_viewWorldPosition");
      }

      ///////////////////////////////////
      if(null !== gl.getUniformLocation(shaderProgram, "u_shininess")) {
        shaderProgram.shininessLocation = gl.getUniformLocation(shaderProgram, 'u_shininess');
        // console.log(' gl.getUniformLocation(program, "u_shininess") LOADED')
      }

      if(null !== gl.getUniformLocation(shaderProgram, "u_lightDirection")) {
        shaderProgram.lightDirectionLocation = gl.getUniformLocation(shaderProgram, 'u_lightDirection');
        // console.log(' gl.getUniformLocation(program, "u_lightDirection") LOADED')
      }

      if(null !== gl.getUniformLocation(shaderProgram, "u_innerLimit")) {
        shaderProgram.innerLimitLocation = gl.getUniformLocation(shaderProgram, 'u_innerLimit');
        // console.log(' gl.getUniformLocation(program, "u_innerLimit") LOADED')
      }

      if(null !== gl.getUniformLocation(shaderProgram, "u_outerLimit")) {
        shaderProgram.outerLimitLocation = gl.getUniformLocation(shaderProgram, 'u_outerLimit');
        // console.log(' gl.getUniformLocation(program, "u_outerLimit") LOADED')
      }

      if(null !== gl.getUniformLocation(shaderProgram, "u_lightWorldPosition")) {
        shaderProgram.lightWorldPositionLocation = gl.getUniformLocation(shaderProgram, 'u_lightWorldPosition');
        // console.log(' gl.getUniformLocation(program, "u_lightWorldPosition") LOADED')
      }
      // var viewWorldPositionLocation = gl.getUniformLocation(program, "u_viewWorldPosition");
      ///////////////////////////////////

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
}
// END OF SHADERS DYNAMIC

// MATRIX OPETARION
App.operation.PUSH_MATRIX = function(mvMatrix, mvMatrixStack) {
  var copy = mat4.create();
  mat4.copy(mvMatrix, copy);
  mvMatrixStack.push(copy);
};

App.operation.POP_MATRIX = function(mvMatrix, mvMatrixStack) {
  if(mvMatrixStack.length == 0) {
    throw 'Invalid popMatrix!';
  }
  mvMatrix = mvMatrixStack.pop();
};

App.operation.SET_MATRIX_UNIFORMS = function(object, pMatrix) {
  this.GL.gl.uniformMatrix4fv(object.shaderProgram.pMatrixUniform, false, pMatrix);
  this.GL.gl.uniformMatrix4fv(object.shaderProgram.mvMatrixUniform, false, object.mvMatrix);
};

// REGENERATORs SHADER
export var RegenerateShader = function(id_elem, numOfSamplerInUse, mixOperand) {
  var e = document.getElementById(id_elem);

  if(mixOperand == 'multiply') {
    mixOperand = 0;
  } else if(mixOperand == 'divide') {
    mixOperand = 1;
  }

  e.innerHTML = generateShaderSrc(numOfSamplerInUse, mixOperand);
};

var RegenerateCustomShader = function(id_elem, numOfSamplerInUse, mixOperand, code_) {
  var e = document.getElementById(id_elem);

  if(mixOperand == 'multiply') {
    mixOperand = 0;
  } else if(mixOperand == 'divide') {
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

    
    // Passed in from the vertex shader.
    varying vec3 v_normal;
    varying vec3 v_surfaceToLight;
    varying vec3 v_surfaceToView;

    uniform vec4 u_color;
    uniform float u_shininess;
    uniform vec3 u_lightDirection;
    uniform float u_innerLimit;          // in dot space
    uniform float u_outerLimit;          // in dot space
    //

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

// make custom shader
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

export var webcamError = function(e) {
  alert('Webcam error!' + e);
};

export function SET_STREAM(video) {
  if(navigator.getUserMedia) {
    navigator.getUserMedia(
      {
        audio: true,
        video: true,
      },
      function(stream) {
        try {
          video.srcObject = stream;
        } catch(error) {
          video.src = window.URL.createObjectURL(stream);
        }
      },
      webcamError
    );
  } else if(navigator.webkitGetUserMedia) {
    navigator.webkitGetUserMedia(
      {
        audio: true,
        video: true,
      },
      function(stream) {
        try {
          video.srcObject = stream;
        } catch(error) {
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

  ROOT.UPDATE = function() {
    if(ROOT.video.readyState === ROOT.video.HAVE_ENOUGH_DATA) {
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

export function VIDEO_TEXTURE(path_) {
  var ROOT = this,
    DIV_CONTENT_STREAMS = document.getElementById('HOLDER_STREAMS');

  ROOT.video = document.getElementById('webcam_beta');

  ROOT.video.READY = function(e) {
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

  ROOT.video.src = 'res/videos/' + path_;

  ROOT.UPDATE = function() {
    if(ROOT.video.readyState === ROOT.video.HAVE_ENOUGH_DATA) {
      ROOT.videoImageContext.drawImage(ROOT.video, 0, 0, ROOT.videoImage.width, ROOT.videoImage.height);

      ROOT.videoImageContext.font = '30px Georgia';
      ROOT.videoImageContext.fillStyle = 'black';
      ROOT.videoImageContext.fillText(' Visual-JS game engine -webGL 2 part', 0, 85);
      ROOT.videoImageContext.fillText('Video texture example ', 20, 50);
    }
  };
}

export function Vjs3(path_, nameOfCanvas) {
  var ROOT = this;
  ROOT.iframe = document.createElement('object');
  ROOT.iframe.id = nameOfCanvas;
  ROOT.iframe.setAttribute('style', 'width:512px;height:512px');
  // ROOT.iframe.setAttribute('width', '512');
  // ROOT.iframe.setAttribute('height', '512');

  var DIV_CONTENT_STREAMS = document.getElementById('HOLDER_STREAMS');
  ROOT.iframe.data = path_;
  DIV_CONTENT_STREAMS.appendChild(ROOT.iframe);

  document.getElementById(ROOT.iframe.id).onload = function(event) {

    ROOT.videoImage = ROOT.iframe.contentDocument.getElementById(nameOfCanvas);

    ROOT.canvasTexture = ROOT.videoImage.getContext('2d');
    App.scene.outsideBox.streamTextures.iframe.contentWindow.runTextureEditor(nameOfCanvas);
    E('HOLDER_STREAMS').style.display = 'block';
    ROOT.texture = App.tools.loadVideoTexture('glVideoTexture', ROOT.videoImage);
  };

  ROOT.showTextureEditor = function() {
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
    if(typeof ROOT.iframe.contentWindow.runTextureEditor !== 'undefined') {
      App.scene.outsideBox.streamTextures.iframe.contentWindow.runTextureEditor(nameOfCanvas);
    }
    ROOT.canvasTexture = ROOT.videoImage.getContext('2d');
    // App.scene.outsideBox.streamTextures.iframe.contentWindow.runTextureEditor(nameOfCanvas);
    E('HOLDER_STREAMS').style.display = 'block';
    ROOT.texture = App.tools.loadVideoTexture('glVideoTexture', ROOT.videoImage);
  };

  ROOT.showTextureEditor = function() {
    var T = E('HOLDER_STREAMS').style;
    T.display = 'block';
    T.left = '0';
  };

  ROOT.iframe.data = path_;

}