/**
 * @Author Nikola Lukic
 * @Description Matrix Engine Api Example.
 */
import App from "../program/manifest.js";
import * as matrixEngine from "../index.js";
let OSCILLATOR = matrixEngine.utility.OSCILLATOR;
const scriptManager = matrixEngine.utility.scriptManager;

export var runThis = world => {
  var textuteImageSamplers = {
    source: ["res/images/complex_texture_1/diffuse.png"],
    mix_operation: "multiply",
  };

  world.Add("cubeLightTex", 1, "ToyShader", textuteImageSamplers);
  // var oscilltor_variable = new OSCILLATOR(0.1, 3, 0.004);

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
    scriptManager.LOAD(f, "cubeLightTex-shader-fs", "x-shader/x-fragment", "shaders")
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
     // scriptManager.LOAD(f, "cubeLightTex-shader-vs", "x-shader/x-vertex", "shaders")
     scriptManager.LOAD(f, "custom-shader-vs", "x-shader/x-vertex", "shaders")
  }
  
  var myShader = {};
  myShader.initDefaultFSShader = () => {
    return `#version 300 es
    precision highp float;
    
    uniform vec2 iResolution;
    uniform vec2 iMouse;
    uniform float iTime;

    // we need to declare an output for the fragment shader
    out vec4 outColor;

    #define SS(a,b,c) smoothstep(a-b,a+b,c)
    #define gyr(p) dot(sin(p.xyz),cos(p.zxy))
    #define T iTime
    #define R iResolution
    float map(in vec3 p) {
        return (1. + .2*sin(p.y*600.)) * 
        gyr(( p*(10.) + .8*gyr(( p*8. )) )) *
        (1.+sin(T+length(p.xy)*10.)) + 
        .3 * sin(T*.15 + p.z * 5. + p.y) *
        (2.+gyr(( p*(sin(T*.2+p.z*3.)*350.+250.) )));
    }
    vec3 norm(in vec3 p) {
        float m = map(p);
        vec2 d = vec2(.06+.06*sin(p.z),0.);
        return map(p)-vec3(
            map(p-d.xyy),map(p-d.yxy),map(p-d.yyx)
        );
    }
    void mainImage( out vec4 color, in vec2 coord ) {
        vec2 uv = coord/R.xy;
        vec2 uvc = (coord-R.xy/2.)/R.y;
        float d = 0.;
        float dd = 1.;
        vec3 p = vec3(0.,0.,T/4.);
        vec3 rd = normalize(vec3(uvc.xy,1.));
        for (float i=0.;i<90. && dd>.001 && d < 2.;i++) {
            d += dd;
            p += rd*d;
            dd = map(p)*.02;
        }
        vec3 n = norm(p);
        float bw = n.x+n.y;
        bw *= SS(.9,.15,1./d);
        color = vec4(vec3(bw),1.0);
    }
    void main() {
      mainImage(outColor, gl_FragCoord.xy);
    }
  `;
  }

  myShader.initDefaultVSShader = () => {
    return `#version 300 es
    in vec4 aPosition;
    void main() {
      gl_Position = aPosition;
    }
  `;
  }

  scriptManager.LOAD(myShader.initDefaultFSShader(), "custom-shader-fs", "x-shader/x-fragment", "shaders", () => {
    App.scene.ToyShader.shaderProgram = world.initShaders(world.GL.gl, 'custom' + '-shader-fs', 'cubeLightTex' + '-shader-vs');
  })
  
  let then = 0;
  let time = 0;
  let mouseY = 50;
  App.scene.ToyShader.custom.gl_texture = function (object, t) {
    // const vao = world.GL.gl.createVertexArray();
    // // and make it the one we're currently working with
    // world.GL.gl.bindVertexArray(vao);
    // // Create a buffer to put three 2d clip space points in
    // const positionBuffer = world.GL.gl.createBuffer();
    // // Bind it to ARRAY_BUFFER (think of it as ARRAY_BUFFER = positionBuffer)
    // world.GL.gl.bindBuffer(world.GL.gl.ARRAY_BUFFER, positionBuffer);
    // // fill it with a 2 triangles that cover clip space
    // // world.GL.gl.bufferData(world.GL.gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]), world.GL.gl.STATIC_DRAW);
    // Turn on the attribute - aVertexPosition
    // world.GL.gl.enableVertexAttribArray(App.scene.ToyShader.shaderProgram.vertexPositionAttribute);
    // // Tell the attribute how to get data out of positionBuffer (ARRAY_BUFFER)
    // world.GL.gl.vertexAttribPointer(
    //   App.scene.ToyShader.shaderProgram.vertexPositionAttribute,
    //   2,          // 2 components per iteration
    //   world.GL.gl.FLOAT,   // the data is 32bit floats
    //   false,      // don't normalize the data
    //   0,          // 0 = move forward size * sizeof(type) each iteration to get the next position
    //   0,          // start at the beginning of the buffer
    // );


    var now = Date.now();
    now *= 0.0000001;  // convert to seconds
    const elapsedTime = Math.min(now - then, 0.1);
    time += elapsedTime;
    then = now;
    // world.GL.gl.bindVertexArray(vao);
    world.GL.gl.uniform2f(App.scene.ToyShader.shaderProgram.resolutionLocation, world.GL.gl.canvas.width, world.GL.gl.canvas.height);
    world.GL.gl.uniform1f(App.scene.ToyShader.shaderProgram.mouseLocation, mouseY);
    world.GL.gl.uniform1f(App.scene.ToyShader.shaderProgram.timeLocation, time);
    world.GL.gl.drawArrays(world.GL.gl.TRIANGLES, 0, 6,);

    return;

  }
  //
  // regenerate procedure 
  // RegenerateCubeMapShader(filler + '-shader-fs', texturesPaths.source.length, texturesPaths.mix_operation, t);
  // cubeObject.shaderProgram = this.initShaders(this.GL.gl, filler + '-shader-fs', filler + '-shader-vs');

  // RegenerateShader(filler + '-shader-fs', texturesPaths.source.length, texturesPaths.mix_operation, t);
  // console.log('REGEN')
  // cubeObject.shaderProgram = this.initShaders(this.GL.gl, filler + '-shader-fs', filler + '-shader-vs');

  // App.scene.MyCubeTex.rotation.rotationSpeed.z = 70;
  // App.scene.MyCubeTex.LightsData.ambientLight.set(0.1, 1, 0.1);

  // GOOD
  App.updateBeforeDraw.push({
    UPDATE: () => {
      // App.scene.MyCubeTex.LightsData.ambientLight.r = oscilltor_variable.UPDATE();
      // App.scene.MyCubeTex.LightsData.ambientLight.b = oscilltor_variable.UPDATE();
    }
  });
};
