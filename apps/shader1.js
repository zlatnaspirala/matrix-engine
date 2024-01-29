/**
 * @Author Nikola Lukic
 * @Description Matrix Engine Api Example.
 */
import App from "../program/manifest.js";
import * as matrixEngine from "../index.js";
import {E} from "../lib/utility.js";
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

    // TEST
    
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

  // myShader.initDefaultVSShader = () => {
  //   return `#version 300 es
  //   in vec4 aPosition;
  //   void main() {
  //     gl_Position = aPosition;
  //   }
  // `;
  // }

  scriptManager.LOAD(myShader.initDefaultFSShader(), "custom-shader-fs", "x-shader/x-fragment", "shaders", () => {
    App.scene.ToyShader.shaderProgram = world.initShaders(world.GL.gl, 'custom' + '-shader-fs', 'cubeLightTex' + '-shader-vs');
    var shaderProgram = App.scene.ToyShader.shaderProgram;
    setTimeout(() => {
      if(null !== world.GL.gl.getUniformLocation(shaderProgram, 'iResolution')) {
        console.log('adaptation initshaders', shaderProgram)
        // shaderProgram.positionAttributeLocation = world.GL.gl.getAttribLocation(shaderProgram, "a_position");
        shaderProgram.resolutionLocation = world.GL.gl.getUniformLocation(shaderProgram, "iResolution");
        shaderProgram.mouseLocation = world.GL.gl.getUniformLocation(shaderProgram, "iMouse");
        shaderProgram.timeLocation = world.GL.gl.getUniformLocation(shaderProgram, "iTime");
      }
    }, 100);
  })

  var now = 1;
  let thena = 0;
  let time1 = 0;
  App.scene.ToyShader.type = "custom-"

  App.scene.ToyShader.TEST = 0;

  App.scene.ToyShader.drawCustom = function(object) {
    // console.log("TOO MENY", this.shaderProgram)
    // Create a vertex array object (attribute state)
    var lighting = true;
    var localLooper = 0;
    mat4.identity(object.mvMatrix);
    world.mvPushMatrix(object.mvMatrix, world.mvMatrixStack);
    if(object.isHUD === true) {
      mat4.translate(object.mvMatrix, object.mvMatrix, object.position.worldLocation);
      // if(raycaster.checkingProcedureCalc) raycaster.checkingProcedureCalc(object);
    } else {
      if(App.camera.FirstPersonController == true) {
        camera.setCamera(object)
      } else if(App.camera.SceneController == true) {
        camera.setSceneCamera(object)
      }

      mat4.translate(object.mvMatrix, object.mvMatrix, object.position.worldLocation);
      // if(raycaster.checkingProcedureCalc && typeof ray === 'undefined') raycaster.checkingProcedureCalc(object);
      mat4.rotate(object.mvMatrix, object.mvMatrix, degToRad(object.rotation.rx), object.rotation.getRotDirX());
      mat4.rotate(object.mvMatrix, object.mvMatrix, degToRad(object.rotation.ry), object.rotation.getRotDirY());
      mat4.rotate(object.mvMatrix, object.mvMatrix, degToRad(object.rotation.rz), object.rotation.getRotDirZ());
    }

    // V
    if(object.vertexPositionBuffer) {
      world.GL.gl.bindBuffer(world.GL.gl.ARRAY_BUFFER, object.vertexPositionBuffer);
      if(object.geometry.dynamicBuffer == true) {
        world.GL.gl.bufferData(world.GL.gl.ARRAY_BUFFER, object.geometry.vertices, world.GL.gl.STATIC_DRAW);
      }
      world.GL.gl.vertexAttribPointer(object.shaderProgram.vertexPositionAttribute, object.vertexPositionBuffer.itemSize, world.GL.gl.FLOAT, false, 0, 0);
      world.GL.gl.enableVertexAttribArray(object.shaderProgram.vertexPositionAttribute);
      localLooper = localLooper + 1;
    }

    // C
    if(object.vertexColorBuffer) {
      world.GL.gl.bindBuffer(world.GL.gl.ARRAY_BUFFER, object.vertexColorBuffer);
      world.GL.gl.vertexAttribPointer(object.shaderProgram.vertexColorAttribute, object.vertexColorBuffer.itemSize, world.GL.gl.FLOAT, false, 0, 0);
      world.GL.gl.enableVertexAttribArray(object.shaderProgram.vertexColorAttribute);
      localLooper = localLooper + 1;
    }

    // L
    if(lighting && object.shaderProgram.useLightingUniform) {
      world.GL.gl.uniform1i(object.shaderProgram.useLightingUniform, lighting);
      /* Set the normals */
      if(object.vertexNormalBuffer) {
        world.GL.gl.bindBuffer(world.GL.gl.ARRAY_BUFFER, object.vertexNormalBuffer);
        world.GL.gl.vertexAttribPointer(object.shaderProgram.vertexNormalAttribute, object.vertexNormalBuffer.itemSize, world.GL.gl.FLOAT, false, 0, 0);
        world.GL.gl.enableVertexAttribArray(object.shaderProgram.vertexNormalAttribute);
        localLooper = localLooper + 1;
      }
      /* Set the ambient light */
      if(object.shaderProgram.ambientColorUniform) {
        if(E('ambLightR')) {
          world.GL.gl.uniform3f(
            object.shaderProgram.ambientColorUniform,
            parseFloat(E('ambLightR').getAttribute('value')),
            parseFloat(E('ambLightG').getAttribute('value')),
            parseFloat(E('ambLightB').getAttribute('value'))
          );
          // console.log("LIGHTS UNIFORM AMB  B = ", parseFloat(E('ambLightB').value) )
        } else {
          // object.LightsData.ambientLight
          world.GL.gl.uniform3f(object.shaderProgram.ambientColorUniform, object.LightsData.ambientLight.r, object.LightsData.ambientLight.g, object.LightsData.ambientLight.b);
        }
      }

      /* Directional light */
      if(object.shaderProgram.directionalColorUniform) {
        if(E('dirLightR')) {
          world.GL.gl.uniform3f(
            object.shaderProgram.directionalColorUniform,
            parseFloat(E('dirLightR').getAttribute('value')),
            parseFloat(E('dirLightG').getAttribute('value')),
            parseFloat(E('dirLightB').getAttribute('value'))
          );
        } else {
          world.GL.gl.uniform3f(object.shaderProgram.directionalColorUniform, object.LightsData.directionLight.R(), object.LightsData.directionLight.G(), object.LightsData.directionLight.B());
        }
      }

      /* Normalize the direction */
      var lightingDirection = null;

      if(object.shaderProgram.lightingDirectionUniform) {
        if(E('dirX') && E('dirY') && E('dirZ')) {
          // console.log("LIGHTS UNIFORM AMB  B = ",  E('dirZ').value )
          lightingDirection = [degToRad(parseFloat(E('dirX').getAttribute('value'))), degToRad(parseFloat(E('dirY').getAttribute('value'))), degToRad(parseFloat(E('dirZ').getAttribute('value')))];
        } else {
          lightingDirection = [object.LightsData.lightingDirection.r, object.LightsData.lightingDirection.g, object.LightsData.lightingDirection.b];
        }

        var adjustedLD = vec3.create();
        vec3.normalize(adjustedLD, lightingDirection);
        vec3.scale(adjustedLD, adjustedLD, -1);
        world.GL.gl.uniform3fv(object.shaderProgram.lightingDirectionUniform, adjustedLD);
      }
    } else {
      if(object.shaderProgram.useLightingUniform) {
        if(object.shaderProgram.ambientColorUniform) {
          world.GL.gl.uniform3f(object.shaderProgram.ambientColorUniform, parseFloat(0.2), parseFloat(0.2), parseFloat(0.2));
        }
        if(object.shaderProgram.directionalColorUniform) {
          world.GL.gl.uniform3f(object.shaderProgram.directionalColorUniform, parseFloat(1), parseFloat(0), parseFloat(0));
        }
      }
    }

    // T
    if(object.vertexTexCoordBuffer) {
      world.GL.gl.bindBuffer(world.GL.gl.ARRAY_BUFFER, object.vertexTexCoordBuffer);

      if(object.geometry.dynamicBuffer == true) {
        world.GL.gl.bufferData(world.GL.gl.ARRAY_BUFFER, object.geometry.texCoords, world.GL.gl.STATIC_DRAW);
      }

      world.GL.gl.vertexAttribPointer(object.shaderProgram.textureCoordAttribute, object.vertexTexCoordBuffer.itemSize, world.GL.gl.FLOAT, false, 0, 0);
      world.GL.gl.enableVertexAttribArray(object.shaderProgram.textureCoordAttribute);

      if(object.streamTextures != null) {
        if(object.streamTextures.video) {
          App.tools.loadVideoTexture('glVideoTexture', object.streamTextures.video);
        } else {
          App.tools.loadVideoTexture('glVideoTexture', object.streamTextures.videoImage);
        }
        world.GL.gl.uniform1i(object.shaderProgram.samplerUniform, 0);
      } else if(object.FBO) {
        // test FBO
        world.GL.gl.activeTexture(world.GL.gl.TEXTURE0);
        world.GL.gl.bindTexture(world.GL.gl.TEXTURE_2D, object.FBO.FB.texture);
        world.GL.gl.uniform1i(object.shaderProgram.samplerUniform, 0);
      } else {
        for(var t = 0;t < object.textures.length;t++) {
          if(object.custom.gl_texture == null) {
            world.GL.gl.activeTexture(world.GL.gl['TEXTURE' + t]);
            world.GL.gl.bindTexture(world.GL.gl.TEXTURE_2D, object.textures[t]);
            world.GL.gl.pixelStorei(world.GL.gl.UNPACK_FLIP_Y_WEBGL, false);
            if(object.texParams.MIPMAP == false) {
              world.GL.gl.texParameteri(world.GL.gl.TEXTURE_2D, world.GL.gl.TEXTURE_WRAP_S, object.texParams.TEXTURE_WRAP_S | world.GL.gl.REPEAT);
              world.GL.gl.texParameteri(world.GL.gl.TEXTURE_2D, world.GL.gl.TEXTURE_WRAP_T, object.texParams.TEXTURE_WRAP_T | world.GL.gl.REPEAT);
              // -- Allocate storage for the texture
              // world.GL.gl.texStorage2D(world.GL.gl.TEXTURE_2D, 1, world.GL.gl.RGB8, 512, 512);
              // world.GL.gl.texSubImage2D(world.GL.gl.TEXTURE_2D, 0, 0, 0,512, 512, world.GL.gl.RGB, world.GL.gl.UNSIGNED_BYTE, object.textures[t]);
            } else {
              world.GL.gl.texParameteri(world.GL.gl.TEXTURE_2D, world.GL.gl.TEXTURE_MAG_FILTER, object.texParams.TEXTURE_MAG_FILTER | world.GL.gl.LINEAR);
              world.GL.gl.texParameteri(world.GL.gl.TEXTURE_2D, world.GL.gl.TEXTURE_MIN_FILTER, object.texParams.TEXTURE_MIN_FILTER | world.GL.gl.LINEAR);
              world.GL.gl.generateMipmap(world.GL.gl.TEXTURE_2D);
            }

            if(world.GL.extTFAnisotropic && object.texParams.ANISOTROPIC == true) {
              world.GL.gl.texParameterf(world.GL.gl.TEXTURE_2D,
                world.GL.extTFAnisotropic.TEXTURE_MAX_ANISOTROPY_EXT,
                world.GL.MAX_TEXTURE_MAX_ANISOTROPY_EXT);
            }

            //console.log('TEST' , object.texParams)
            world.GL.gl.uniform1i(object.shaderProgram.samplerUniform, t);

          } else {
            object.custom.gl_texture(object, t);
          }
        }
      }
      localLooper = localLooper + 1;
    } else {

      if(object.shaderProgram.samplerUniform) {
        world.GL.gl.uniform1i(object.shaderProgram.samplerUniform, 0);
      } else if(object.shaderProgram.uCubeMapSampler) {
        // CUBE MAP
        world.GL.gl.activeTexture(world.GL.gl['TEXTURE0']);
        var gl = world.GL.gl;
        if(!object.tex) object.tex = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_CUBE_MAP, object.tex);
        if(object.cubeMap.type == 'images') {
          object.cubeMap.cubeMap2dCanvasSet.forEach((faceInfo, index) => {
            const level = 0;
            const internalFormat = gl.RGBA;
            const format = gl.RGBA;
            const type = gl.UNSIGNED_BYTE;
            gl.texImage2D(faceInfo.target, level, internalFormat, format, type, object.cubeMap.images[index]);
            gl.pixelStorei(world.GL.gl.UNPACK_FLIP_Y_WEBGL, false);
          });
        } else {
          object.cubeMap.cubeMap2dCanvasSet.forEach((faceInfo, index) => {
            var args = [];
            for(var key in faceInfo) {
              if(key !== 'target') {
                args.push(faceInfo[key]);
              }
            }
            if(object.cubeMap.drawFunc) {
              object.cubeMap.drawFunc(args);
            } else {
              const {faceColor, textColor, text} = faceInfo;
              gen2DTextFace(object.cubeMap.cubeMap2dCtx, faceColor, textColor, text);
            }
            const level = 0;
            const internalFormat = gl.RGBA;
            const format = gl.RGBA;
            const type = gl.UNSIGNED_BYTE;
            gl.texImage2D(faceInfo.target, level, internalFormat, format, type, object.cubeMap.cubeMap2dCtx.canvas);
            gl.pixelStorei(world.GL.gl.UNPACK_FLIP_Y_WEBGL, false);
          });
        }
        gl.generateMipmap(gl.TEXTURE_CUBE_MAP);
        gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);
        world.GL.gl.uniform1i(object.shaderProgram.uCubeMapSampler, 0);
      }
    }

    world.GL.gl.bindBuffer(world.GL.gl.ELEMENT_ARRAY_BUFFER, object.vertexIndexBuffer);
    world.setMatrixUniforms(object, world.pMatrix);
    // Shadows
    if(object.shadows && object.shadows.type == 'spot' ||
      object.shadows && object.shadows.type == 'spot-shadow') {
      // set the light position
      world.GL.gl.uniform3fv(object.shaderProgram.lightWorldPositionLocation, object.shadows.lightPosition);
      world.GL.gl.uniform3fv(object.shaderProgram.viewWorldPositionLocation, object.shadows.lightPosition);
      world.GL.gl.uniform1f(object.shaderProgram.shininessLocation, object.shadows.shininess);
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

      world.GL.gl.uniform3fv(object.shaderProgram.lightDirectionLocation, object.shadows.lightDirection);
      world.GL.gl.uniform1f(object.shaderProgram.innerLimitLocation, Math.cos(object.shadows.innerLimit));
      world.GL.gl.uniform1f(object.shaderProgram.outerLimitLocation, Math.cos(object.shadows.outerLimit));
    } else if(object.shadows && object.shadows.type == 'spec') {
      world.GL.gl.uniform3fv(object.shaderProgram.specularColor, object.shadows.specularDATA);
      world.GL.gl.uniform3fv(object.shaderProgram.uLightPosition, world.uLightPosition);
    } else if(object.shadows && object.shadows.type == 'lens') {
      world.GL.gl.uniform3fv(object.shaderProgram.uLightPosition, world.uLightPosition);
      world.GL.gl.uniform3fv(object.shaderProgram.uControl, object.shadows.uControl);
      world.GL.gl.uniform3fv(object.shaderProgram.uResolution, object.shadows.uResolution);
    }

    if(object.vertexNormalBuffer && object.shaderProgram.nMatrixUniform) {
      var normalMatrix = mat3.create();
      mat3.normalFromMat4(normalMatrix, object.mvMatrix);
      mat3.transpose(normalMatrix, normalMatrix);
      world.GL.gl.uniformMatrix3fv(object.shaderProgram.nMatrixUniform, false, normalMatrix);
    }
    world.disableUnusedAttr(world.GL.gl, localLooper);
    if(object.glBlend.blendEnabled == true) {
      if(!world.GL.gl.isEnabled(world.GL.gl.BLEND)) {
        world.GL.gl.enable(world.GL.gl.BLEND);
      }
      world.GL.gl.blendFunc(world.GL.gl[object.glBlend.blendParamSrc], world.GL.gl[object.glBlend.blendParamDest]);
    } else {
      world.GL.gl.disable(world.GL.gl.BLEND);
      world.GL.gl.enable(world.GL.gl.DEPTH_TEST);
      // world.GL.gl.enable(world.GL.gl.CULL_FACE);
    }

    now = Date.now();
    now *= 0.001;
    const elapsedTime = Math.min(now - then, 0.1);
    time1 += elapsedTime;
    thena = now;
    // webglUtils.resizeCanvasToDisplaySize(gl.canvas);
    // Tell WebGL how to convert from clip space to pixels
    // world.GL.gl.viewport(0, 0, world.GL.gl.canvas.width, world.GL.gl.canvas.height);
    // Tell it to use our program (pair of shaders)
    // world.GL.gl.useProgram(program);
    // Bind the attribute/buffer set we want.
    // world.GL.gl.bindVertexArray(vao);
    world.GL.gl.uniform2f(this.shaderProgram.resolutionLocation, world.GL.gl.canvas.width, world.GL.gl.canvas.height);
    world.GL.gl.uniform1f(this.shaderProgram.TimeDelta, time1);
    world.GL.gl.uniform1f(this.shaderProgram.timeLocation, time1);
    // world.GL.gl.drawArrays(world.GL.gl[object.glDrawElements.mode],   App.scene.ToyShader.TEST , object.glDrawElements.numberOfIndicesRender, world.GL.gl.UNSIGNED_SHORT, 0);
    // world.GL.gl.drawArrays(world.GL.gl.TRIANGLES, 0, object.glDrawElements.numberOfIndicesRender, world.GL.gl.UNSIGNED_SHORT, 0);
    world.GL.gl.drawElements(world.GL.gl[object.glDrawElements.mode], object.glDrawElements.numberOfIndicesRender, world.GL.gl.UNSIGNED_SHORT, 0);
    world.mvPopMatrix(object.mvMatrix, world.mvMatrixStack);
  }

  let then = 0;
  let time = 0;
  let mouseY = 50;

  // GOOD
  App.updateBeforeDraw.push({
    UPDATE: () => {
    }
  });
};
