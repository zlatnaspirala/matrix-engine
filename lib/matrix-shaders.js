/**
 * @description
 * Fragment shader CUBE SQUARETex - general/main
 * OPENGLES30  SQUARE !!!
 **/
 export function generateShaderSrc3(numTextures, mixOperand, lightType) {
  return (`#version 300 es
    // Matrix-engine 1.8.16 shader for ${numTextures} textures samples.
    precision highp float;
    in vec2 vTextureCoord;
    in vec3 vLightWeighting;

    uniform float textureSamplerAmount[${numTextures}];
    int MixOperandString = ${mixOperand};

    uniform sampler2D uSampler;
    uniform sampler2D uSampler1;
    uniform sampler2D uSampler2;
    uniform sampler2D uSampler3;
    in vec3 v_normal;
    ` +
    (typeof lightType !== 'undefined' && lightType == 'spot'
      ? generateSpotLightDefinitions() : ``) +
    
    (typeof lightType !== 'undefined' && lightType == 'specular'
      ? generateSpecularLightDefinitions() : ``) +

    (typeof lightType !== 'undefined' && lightType == 'lens'
      ? generateLensDefinitions() : ``) +
    (typeof lightType !== 'undefined' && lightType == 'spot-shadow'
      ? generateSpotLightShadowDefinitions() : ``) +
    `

    void main(void) {

        vec4 textureColor = texture(uSampler, vTextureCoord) * vec4(1,1,1,1);
        vec4 textureColor1 = texture(uSampler1, vec2(vTextureCoord.s, vTextureCoord.t));
        vec4 textureColor2 = texture(uSampler2, vec2(vTextureCoord.s, vTextureCoord.t));
        vec4 textureColor3 = texture(uSampler3, vec2(vTextureCoord.s, vTextureCoord.t));

        if (${numTextures} == 1) {
          outColor = vec4(textureColor.rgb * vLightWeighting, textureColor.a);
        } else if (${numTextures} == 2) {
          if ( ${mixOperand} == 0) {
            outColor    = vec4( (textureColor.rgb * textureColor1.rgb) * vLightWeighting, textureColor.a);
          } else if (${mixOperand} == 1) {
            outColor    = vec4( (textureColor.rgb / textureColor1.rgb) * vLightWeighting, textureColor.a);
          }
        } else if (${numTextures} == 3) {
          if (${mixOperand} == 0) {
            outColor =vec4( (textureColor.rgb * textureColor1.rgb * textureColor2.rgb ) * vLightWeighting, textureColor.a);
          }
          else if (${mixOperand} == 1) {
            outColor = vec4( (textureColor.rgb * textureColor1.rgb / textureColor2.rgb ) * vLightWeighting, textureColor.a);
          }
        } else if (${numTextures} == 4) {
            if (${mixOperand} == 0) {
              outColor = textureColor * textureColor1 * textureColor2 * textureColor3;
            }
            else if (${mixOperand} == 1) {
              outColor = textureColor / textureColor1 / textureColor2 /  textureColor3;
            }
        }

    ` +
    (typeof lightType !== 'undefined' &&
      lightType == 'spot' ? generateSpotLightMain() : ``) +
    `

    ` +
    (typeof lightType !== 'undefined' &&
      lightType == 'specular' ? generateSpecularLightMain() : ``) +
    `

    ` +
    (typeof lightType !== 'undefined' &&
      lightType == 'lens' ? generateLensMain(numTextures) : ``) +
    `

    ` +
    (typeof lightType !== 'undefined' &&
      lightType == 'spot-shadow' ? generateSpotLightShadowMain() : ``) +
    `

    }`);
}


/**
 * @description
 * Fragment shader CUBE SQUARETex - general/main
 **/
export function generateShaderSrc(numTextures, mixOperand, lightType) {
  return (`
    // Matrix-engine shader for ${numTextures} textures samples.
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
    varying vec3 v_normal;
    
    ` +
    (typeof lightType !== 'undefined' && lightType == 'spot'
      ? generateSpotLightDefinitions() : ``) +
    `

    ` +
    (typeof lightType !== 'undefined' && lightType == 'specular'
      ? generateSpecularLightDefinitions() : ``) +
    `

    ` +
    (typeof lightType !== 'undefined' && lightType == 'lens'
      ? generateLensDefinitions() : ``) +
    `

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

    ` +
    (typeof lightType !== 'undefined' &&
      lightType == 'spot' ? generateSpotLightMain() : ``) +
    `

    ` +
    (typeof lightType !== 'undefined' &&
      lightType == 'specular' ? generateSpecularLightMain() : ``) +
    `

    ` +
    (typeof lightType !== 'undefined' &&
      lightType == 'lens' ? generateLensMain(numTextures) : ``) +
    `

    }`);
}

export function generateShaderSimpleDirection() {
  return `
  precision mediump float;
  precision highp float;

  varying vec4 vColor;
  varying vec3 vLightWeighting;

  void main(void) {
    gl_FragColor      = vec4(vColor.rgb * vLightWeighting, vColor.a);
  }
  `;
}

export function generateVShaderSimpleDirectionLight() {
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
  }
  `;
}

function generateSpotLightDefinitions() {
  return `// Passed in from the vertex shader.
  // varying vec3 v_normal;
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
}

/**
 * @description
 * Specular lights.
 * Definition scope.
 * Global world scene position.
 */
function generateSpecularLightDefinitions() {
  return `// Passed in from the vertex shader.
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

/**
 * @description
 * Specular lights.
 * Main function.
 * Global world scene position.
 */
function generateSpecularLightMain() {
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

/**
 * @description
 * Lens effect.
 * Definition scope.
 * Global world scene position.
 */
export function generateLensDefinitions() {
  return `// lens effect
  uniform vec3 uLightPosition;
  uniform vec3 uResolution;
  uniform vec3 uControl;
  `;
}

/**
 * @description
 * Lens effect.
 * Main function.
 */
export function generateLensMain(numTextures) {
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
    pixel_color = texture2D(uSampler, vTextureCoord + offset / rez ).rgb;
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

/**
 * @description
 * Make cubeMap Fragment shader.
 */
export function generateCubeMapShaderSrc(numTextures, mixOperand, lightType) {
  return `
    // shader for opengles native 
    // 'uniform samplerCube' CubeMap canvas2d textures.

    precision mediump float;
    precision highp float;

    varying vec3 vLightWeighting;

    uniform float textureSamplerAmount[1];
    int MixOperandString = ${mixOperand};
    // The CubeMap texture.
    uniform samplerCube u_texture;
    varying vec3 v_normal;
    varying vec3 v_normal_cubemap;

    void main(void) {
      // without light
      // gl_FragColor = textureCube(u_texture, v_normal_cubemap);
      vec4 lightMapColor = textureCube(u_texture, v_normal_cubemap);
      gl_FragColor = vec4(lightMapColor.rgb * vLightWeighting, lightMapColor.a);
    }
    `;
}

/**
 * @description
 * Make Custom shader*/
export function generateCustomShaderSrc(numTextures, mixOperand, code_) {
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


// OPENGLE30 !!!
export function generateSpotLightShadowDefinitions() {
  return `// Passed in from the vertex shader.
  // varying vec3 v_normal;

  uniform sampler2D u_projectedTexture;
  uniform sampler2D u_texture;

  in vec2 v_texcoord;

  uniform float u_bias;
  in vec4 v_projectedTexcoord;
  in vec3 v_surfaceToLight;
  in vec3 v_surfaceToView;
  uniform vec4 u_color;
  uniform float u_shininess;
  uniform vec3 u_lightDirection;
  uniform float u_innerLimit;    
  uniform float u_outerLimit;         
  uniform mat4 u_projection;
  uniform mat4 u_view;
  uniform mat4 u_world;
  uniform mat4 u_textureMatrix;
  out vec4 outColor;
  //
  `;
}
export function generateSpotLightShadowMain() {
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
  outColor = vec4(
    texColor.rgb * light * shadowLight +
    specular * shadowLight,
    texColor.a);

  // Lets multiply just the color portion (not the alpha)
  // by the light
  // outColor.rgb *= light;
  // Just add in the specular
  // outColor.rgb += specular;
  //
  `;
}