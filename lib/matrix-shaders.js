/**
 * @description
 * Fragment shader CUBE - general/main
 **/
export function generateShaderSrc(numTextures, mixOperand, spotLight) {
  return (
    `
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
    varying vec3 v_normal;
    
    ` +
    (typeof spotLight !== 'undefined' ? generateSpotLightDefinitions() : ``) +
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
    (typeof spotLight !== 'undefined' ? generateSpotLightMain() : ``) +
    `
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
    `
  );
}

export function generateShaderSimpleDirection() {
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
}

/**
 * @description
 * Make cubeMap Fragment shader */
export function generateCubeMapShaderSrc(numTextures, mixOperand, spotLight) {
  return `
    // shader for opengles native 'uniform samplerCube' CubeMap canvas2d textures.
    precision mediump float;
    precision highp float;

    uniform float textureSamplerAmount[1];
    int MixOperandString = ${mixOperand};
    // The CubeMap texture.
    uniform samplerCube u_texture;
    varying vec3 v_normal;
    varying vec3 v_normal_cubemap;

    void main(void) {
      gl_FragColor = textureCube(u_texture, v_normal_cubemap);
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
