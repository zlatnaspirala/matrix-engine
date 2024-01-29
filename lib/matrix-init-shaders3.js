import { scriptManager } from "./utility";
/**
 * @description From 1.9.43
 * Opengles300 in single file.
 */
export function loadShaders300() {
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

export function genInitFSTriangle() {
  const f = `#version 300 es
  precision mediump float;
  in vec4 vColor;
  out vec4 outColor;
  void main(void) {
    outColor = vColor;
  }
  `;
  scriptManager.LOAD(f, "triangle-shader-fs", "x-shader/x-fragment", "shaders");
}

export function getInitVSTriangle() {
  const f = `#version 300 es
  in vec3 aVertexPosition;
  in vec4 aVertexColor;
  uniform mat4 uMVMatrix;
  uniform mat4 uPMatrix;
  out vec4 vColor;
  void main(void) {
    gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);
    vColor      = aVertexColor;
  }
  `;
  scriptManager.LOAD(f, "triangle-shader-vs", "x-shader/x-vertex", "shaders");
}

export function getInitFSCubeTexLight() {
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

export function getInitVSCubeTexLight() {
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
   scriptManager.LOAD(f, "cubeLightTex-shader-vs", "x-shader/x-vertex", "shaders")
}

export function getInitFSSquare() {
  const f= `#version 300 es
  precision mediump float;
  in vec4 vColor;
  out vec4 outColor;
  void main(void) {
    outColor = vColor;
  }
  `;
  scriptManager.LOAD(f, "square-shader-fs", "x-shader/x-fragment", "shaders")
}

export function getInitVSSquare() {
  const f= `#version 300 es
  in vec3 aVertexPosition;
  in vec4 aVertexColor;
  uniform mat4 uMVMatrix;
  uniform mat4 uPMatrix;
  out vec4 vColor;

  void main(void) {
    gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);
    vColor      = aVertexColor;
  }`;
  scriptManager.LOAD(f, "square-shader-vs", "x-shader/x-vertex", "shaders");
}

export function getInitFSCube() {
 const f = `#version 300 es
  precision mediump float;
  in vec4 vColor;
  out vec4 outColor;
  void main(void) {
    outColor = vColor;
  }`;
  scriptManager.LOAD(f, "cube-shader-fs", "x-shader/x-fragment", "shaders");
}

export function getInitVSCube() {
  const f = `#version 300 es
  in vec3 aVertexPosition;
  in vec4 aVertexColor;
  uniform mat4 uMVMatrix;
  uniform mat4 uPMatrix;
  out vec4 vColor;
  void main(void) {
    gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);
    vColor      = aVertexColor;
  }`;
  scriptManager.LOAD(f, "cube-shader-vs", "x-shader/x-vertex", "shaders");
}

export function getInitFSCubeTex() {
  const f = `#version 300 es
  precision mediump float;
  in vec2 vTextureCoord;
  uniform sampler2D uSampler;
  out vec4 outColor;
  void main(void) {
    outColor = texture2D(uSampler, vec2(vTextureCoord.s, vTextureCoord.t));
  }`;
  scriptManager.LOAD(f, "cubeTex-shader-fs", "x-shader/x-fragment", "shaders");
}

export function getInitVSCubeTex() {
  const f = `#version 300 es
  #define POSITION_LOCATION 0
  in vec3 aVertexPosition;
  in vec2 aTextureCoord;
  uniform mat4 uMVMatrix;
  uniform mat4 uPMatrix;
  out vec2 vTextureCoord;
  void main(void) {
    gl_Position   = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);
    vTextureCoord = aTextureCoord;
  }`;
  scriptManager.LOAD(f, "cubeTex-shader-vs", "x-shader/x-vertex", "shaders");
}

export function getInitFSObj() {
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
  scriptManager.LOAD(f, "obj-shader-fs", "x-shader/x-fragment", "shaders");
}

export function getInitVSObj() {
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
  scriptManager.LOAD(f, "obj-shader-vs", "x-shader/x-vertex", "shaders");
}

export function getInitFSPyramid() {
  const f = `#version 300 es
  precision mediump float;
  in vec4 vColor;

  out vec4 outColor;
  void main(void) {
    outColor = vColor;
  }`;
  scriptManager.LOAD(f, "pyramid-shader-fs", "x-shader/x-fragment", "shaders");
}

export function getInitVSPyramid() {
  const f = `#version 300 es
  in vec3 aVertexPosition;
  in vec4 aVertexColor;
  uniform mat4 uMVMatrix;
  uniform mat4 uPMatrix;
  out vec4 vColor;
  void main(void) {
    gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);
    vColor      = aVertexColor;
  }
`;
  scriptManager.LOAD(f, "pyramid-shader-vs", "x-shader/x-vertex", "shaders");
}

export function getInitFSSquareTex() {
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
  scriptManager.LOAD(f, "squareTex-shader-fs", "x-shader/x-fragment", "shaders");
}

export function getInitVSSquareTex() {
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
  scriptManager.LOAD(f, "squareTex-shader-vs", "x-shader/x-vertex", "shaders");
  // console.log(" squareTex-shader-vs v")
}

export function getInitFSSphereLightTex() {
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
  scriptManager.LOAD(f, "sphereLightTex-shader-fs", "x-shader/x-fragment", "shaders");
}

export function getInitVSSphereLightTex() {
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
  scriptManager.LOAD(f, "sphereLightTex-shader-vs", "x-shader/x-vertex", "shaders");
}

export function getInitFSCubeMap() {
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
  scriptManager.LOAD(f, "cubeMap-shader-fs", "x-shader/x-fragment", "shaders")
}

export function getInitVSCubeMap() {
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
  // varying vec2 vTextureCoord;
  out vec3 vLightWeighting;

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
    v_normal = mat3(uNMatrix) * aVertexNormal;
    // v_normal_cubemap = normalize(aVertexPosition.xyz);

    // test
    // SPOT
    // orient the normals and pass to the fragment shader
    v_normal = mat3(uNMatrix) * aVertexNormal;

    // // normalize
     v_normal_cubemap = normalize(aVertexPosition.xyz);

    // // compute the world position of the surfoace
    vec3 surfaceWorldPosition = (uNMatrix * aVertexPosition).xyz;

    // // compute the vector of the surface to the light
    // // and pass it to the fragment shader
    v_surfaceToLight = u_lightWorldPosition - surfaceWorldPosition;

    // // compute the vector of the surface to the view/camera
    // // and pass it to the fragment shader
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
   scriptManager.LOAD(f, "cubeMap-shader-vs", "x-shader/x-vertex", "shaders")
}