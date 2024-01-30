/**
 * @Author Nikola Lukic
 * @Description Matrix Engine Api Example.
 * First time adding direct different FShader.
 * Also mix divine two shader variants...
 * It is not in engine manir - too much inline for now...
 * but works fine!
 */
import App from "../program/manifest.js";
import * as matrixEngine from "../index.js";
import {E} from "../lib/utility.js";
const scriptManager = matrixEngine.utility.scriptManager;

export var runThis = world => {
  var textuteImageSamplers = {
    source: ["res/images/complex_texture_1/diffuse.png"],
    mix_operation: "multiply",
  }
  world.Add("cubeLightTex", 1, "ToyShader", textuteImageSamplers);

  var myShader = {};
  myShader.initDefaultFSShader = () => {
    return `#version 300 es
    precision highp float;
    // test mix
    in vec2 vTextureCoord;
    in vec3 vLightWeighting;
    uniform sampler2D uSampler;
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
      vec4 textureColor = texture(uSampler, vTextureCoord) * vec4(1,1,1,1);
      mainImage(outColor, vTextureCoord);
      // outColor.rgb += vec3(textureColor.rgb * vLightWeighting);
      mainImage(outColor, gl_FragCoord.xy);
      outColor.rgb *= vec3(textureColor.rgb * vLightWeighting);
    }
  `;
  }

  scriptManager.LOAD(myShader.initDefaultFSShader(), "custom-shader-fs", "x-shader/x-fragment", "shaders", () => {
    App.scene.ToyShader.shaderProgram = world.initShaders(world.GL.gl, 'custom' + '-shader-fs', 'cubeLightTex' + '-shader-vs');
  })

  var now = 1;
  let time1 = 0;
  let then1 = 0;

  App.scene.ToyShader.rotation.rotationSpeed.y = 55
  App.scene.ToyShader.glBlend.blendEnabled = false
  
  App.scene.ToyShader.type = "custom-"
  App.scene.ToyShader.drawCustom = function(object) {
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

    //
    now = Date.now();
    now *= 0.001;
    const elapsedTime = Math.min(now - then1, 0.1);
    time1 += elapsedTime;
    world.GL.gl.uniform2f(this.shaderProgram.resolutionLocation, world.GL.gl.canvas.width, world.GL.gl.canvas.height);
    world.GL.gl.uniform1f(this.shaderProgram.TimeDelta, time1);
    world.GL.gl.uniform1f(this.shaderProgram.timeLocation, time1);
    //
    world.GL.gl.drawElements(world.GL.gl[object.glDrawElements.mode], object.glDrawElements.numberOfIndicesRender, world.GL.gl.UNSIGNED_SHORT, 0);
    world.mvPopMatrix(object.mvMatrix, world.mvMatrixStack);
  }
}