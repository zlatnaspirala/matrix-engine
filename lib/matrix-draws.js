import App from '../program/manifest';
import {world} from './matrix-world';
import {camera} from './events';
import {E, gen2DTextFace} from './utility';
import * as raycaster from './raycast';
import {MatrixShadowSpecular, MatrixShadowSpot} from './matrix-shadows';
import {depthTextures, makeFBO} from './matrix-textures';

App.operation.draws = new Object();

App.operation.draws.cube = function(object, ray) {
  var lighting = true;
  var localLooper = 0;

  mat4.identity(object.mvMatrix);
  this.mvPushMatrix(object.mvMatrix, this.mvMatrixStack);

  if(object.isHUD === true) {

    mat4.translate(object.mvMatrix, object.mvMatrix, object.position.worldLocation);
    if(raycaster.checkingProcedureCalc) raycaster.checkingProcedureCalc(object);

  } else {

    if(App.camera.FirstPersonController == true) {
      camera.setCamera(object)
    } else if(App.camera.SceneController == true) {
      camera.setSceneCamera(object)
    }

    mat4.translate(object.mvMatrix, object.mvMatrix, object.position.worldLocation);
    if(raycaster.checkingProcedureCalc && typeof ray === 'undefined') raycaster.checkingProcedureCalc(object);

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
        //console.log('TEST')
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
      // video/webcam tex
      // App.tools.loadVideoTexture('glVideoTexture', object.streamTextures.videoImage);
      if(object.streamTextures.video) {
        App.tools.loadVideoTexture('glVideoTexture', object.streamTextures.video);
      } else {
        App.tools.loadVideoTexture('glVideoTexture', object.streamTextures.videoImage);
      }
      world.GL.gl.uniform1i(object.shaderProgram.samplerUniform, 0);

    } else if(object.FBO) {
      // test FBO
      // spot light test light
      // Fbo staff
      world.GL.gl.activeTexture(world.GL.gl.TEXTURE0);
      world.GL.gl.bindTexture(world.GL.gl.TEXTURE_2D, object.FBO.FB.texture);
      world.GL.gl.uniform1i(object.shaderProgram.samplerUniform, 0);

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
  world.setMatrixUniforms(object, this.pMatrix, object.mvMatrix);

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
    // global position
    world.GL.gl.uniform3fv(object.shaderProgram.specularColor, object.shadows.specularDATA);
    world.GL.gl.uniform3fv(object.shaderProgram.uLightPosition, world.uLightPosition);
  } else if(object.shadows && object.shadows.type == 'lens') {
    // Lens
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
    // TEST world.GL.gl.enable(world.GL.gl.CULL_FACE);
  }

  world.GL.gl.drawElements(world.GL.gl[object.glDrawElements.mode], object.glDrawElements.numberOfIndicesRender, world.GL.gl.UNSIGNED_SHORT, 0);
  object.instancedDraws.overrideDrawArraysInstance(object);

  this.mvPopMatrix(object.mvMatrix, this.mvMatrixStack);
};

App.operation.draws.piramide = function(object, ray) {
  mat4.identity(object.mvMatrix);
  world.mvPushMatrix(object.mvMatrix, this.mvMatrixStack);

  if(App.camera.FirstPersonController == true) {
    camera.setCamera(object);
  } else if(App.camera.SceneController == true) {
    camera.setSceneCamera(object);
  }

  mat4.translate(object.mvMatrix, object.mvMatrix, object.position.worldLocation);
  if(raycaster.checkingProcedureCalc && typeof ray === 'undefined') raycaster.checkingProcedureCalc(object);
  mat4.rotate(object.mvMatrix, object.mvMatrix, degToRad(object.rotation.rx), object.rotation.getRotDirX());
  mat4.rotate(object.mvMatrix, object.mvMatrix, degToRad(object.rotation.ry), object.rotation.getRotDirY());
  mat4.rotate(object.mvMatrix, object.mvMatrix, degToRad(object.rotation.rz), object.rotation.getRotDirZ());

  if(object.geometry.dynamicBuffer == true) {
    world.GL.gl.bindBuffer(world.GL.gl.ARRAY_BUFFER, object.vertexPositionBuffer);
    world.GL.gl.bufferData(world.GL.gl.ARRAY_BUFFER, object.geometry.vertices, world.GL.gl.STATIC_DRAW);
  } else {
    world.GL.gl.bindBuffer(world.GL.gl.ARRAY_BUFFER, object.vertexPositionBuffer);
  }

  world.GL.gl.vertexAttribPointer(object.shaderProgram.vertexPositionAttribute, object.vertexPositionBuffer.itemSize, world.GL.gl.FLOAT, false, 0, 0);

  if(object.vertexColorBuffer) {
    world.GL.gl.bindBuffer(world.GL.gl.ARRAY_BUFFER, object.vertexColorBuffer);
    world.GL.gl.vertexAttribPointer(object.shaderProgram.vertexColorAttribute, object.vertexColorBuffer.itemSize, world.GL.gl.FLOAT, false, 0, 0);
  }

  if(object.glBlend.blendEnabled == true) {
    if(!world.GL.gl.isEnabled(world.GL.gl.BLEND)) {
      // world.GL.gl.disable(world.GL.gl.DEPTH_TEST);
      world.GL.gl.enable(world.GL.gl.BLEND);
    }
    // world.GL.gl.blendColor ( 1,1,1,0.5)
    // world.GL.gl.blendColor( 1.0 , 1.0, 1.0, 0.3 );
    world.GL.gl.blendFunc(world.GL.gl[object.glBlend.blendParamSrc], world.GL.gl[object.glBlend.blendParamDest]);
  } else {
    world.GL.gl.disable(world.GL.gl.BLEND);
    world.GL.gl.enable(world.GL.gl.DEPTH_TEST);
  }

  world.setMatrixUniforms(object, this.pMatrix, object.mvMatrix);
  world.GL.gl.drawArrays(world.GL.gl[object.glDrawElements.mode], 0, object.vertexPositionBuffer.numItems);
  object.instancedDraws.overrideDrawArraysInstance(object);

  this.mvPopMatrix(object.mvMatrix, this.mvMatrixStack);
};

App.operation.draws.square = function(object, ray) {
  mat4.identity(object.mvMatrix);
  world.mvPushMatrix(object.mvMatrix, world.mvMatrixStack);

  if(App.camera.FirstPersonController == true) {
    camera.setCamera(object);
  } else if(App.camera.SceneController == true) {
    camera.setSceneCamera(object);
  }

  mat4.translate(object.mvMatrix, object.mvMatrix, object.position.worldLocation);
  if(raycaster.checkingProcedureCalc && typeof ray === 'undefined') raycaster.checkingProcedureCalc(object);
  mat4.rotate(object.mvMatrix, object.mvMatrix, degToRad(object.rotation.rx), object.rotation.getRotDirX());
  mat4.rotate(object.mvMatrix, object.mvMatrix, degToRad(object.rotation.ry), object.rotation.getRotDirY());
  mat4.rotate(object.mvMatrix, object.mvMatrix, degToRad(object.rotation.rz), object.rotation.getRotDirZ());

  if(object.geometry.dynamicBuffer == true) {
    world.GL.gl.bindBuffer(world.GL.gl.ARRAY_BUFFER, object.vertexPositionBuffer);
    world.GL.gl.bufferData(world.GL.gl.ARRAY_BUFFER, object.geometry.vertices, world.GL.gl.STATIC_DRAW);
  } else {
    world.GL.gl.bindBuffer(world.GL.gl.ARRAY_BUFFER, object.vertexPositionBuffer);
  }
  world.GL.gl.vertexAttribPointer(object.shaderProgram.vertexPositionAttribute, object.vertexPositionBuffer.itemSize, world.GL.gl.FLOAT, false, 0, 0);

  if(object.vertexColorBuffer) {
    world.GL.gl.bindBuffer(world.GL.gl.ARRAY_BUFFER, object.vertexColorBuffer);
    world.GL.gl.vertexAttribPointer(object.shaderProgram.vertexColorAttribute, object.vertexColorBuffer.itemSize, world.GL.gl.FLOAT, false, 0, 0);
  }

  if(object.glBlend.blendEnabled == true) {
    if(!world.GL.gl.isEnabled(world.GL.gl.BLEND)) {
      world.GL.gl.enable(world.GL.gl.BLEND);
    }
    // world.GL.gl.blendColor( 1.0 , 1.0, 1.0, 0.3 );
    world.GL.gl.blendFunc(world.GL.gl[object.glBlend.blendParamSrc], world.GL.gl[object.glBlend.blendParamDest]);
  } else {
    world.GL.gl.disable(world.GL.gl.BLEND);
    world.GL.gl.enable(world.GL.gl.DEPTH_TEST);
  }

  world.setMatrixUniforms(object, this.pMatrix, object.mvMatrix);
  world.GL.gl.drawArrays(world.GL.gl[object.glDrawElements.mode], 0, object.vertexPositionBuffer.numItems);
  object.instancedDraws.overrideDrawArraysInstance(object);

  this.mvPopMatrix(object.mvMatrix, this.mvMatrixStack);
};

App.operation.draws.triangle = function(object, ray) {
  mat4.identity(object.mvMatrix);
  world.mvPushMatrix(object.mvMatrix, this.mvMatrixStack);

  if(App.camera.FirstPersonController == true) {
    camera.setCamera(object);
  } else if(App.camera.SceneController == true) {
    camera.setSceneCamera(object);
  }

  mat4.translate(object.mvMatrix, object.mvMatrix, object.position.worldLocation);
  if(raycaster.checkingProcedureCalc && typeof ray === 'undefined') raycaster.checkingProcedureCalc(object);
  mat4.rotate(object.mvMatrix, object.mvMatrix, degToRad(object.rotation.rx), object.rotation.getRotDirX());
  mat4.rotate(object.mvMatrix, object.mvMatrix, degToRad(object.rotation.ry), object.rotation.getRotDirY());
  mat4.rotate(object.mvMatrix, object.mvMatrix, degToRad(object.rotation.rz), object.rotation.getRotDirZ());

  world.GL.gl.bindBuffer(world.GL.gl.ARRAY_BUFFER, object.vertexPositionBuffer);
  world.GL.gl.vertexAttribPointer(object.shaderProgram.vertexPositionAttribute, object.vertexPositionBuffer.itemSize, world.GL.gl.FLOAT, false, 0, 0);

  if(object.geometry.dynamicBuffer == true) {
    world.GL.gl.bufferData(world.GL.gl.ARRAY_BUFFER, object.geometry.vertices, world.GL.gl.STATIC_DRAW);
  }

  world.GL.gl.bindBuffer(world.GL.gl.ARRAY_BUFFER, object.vertexColorBuffer);
  world.GL.gl.vertexAttribPointer(object.shaderProgram.vertexColorAttribute, object.vertexColorBuffer.itemSize, world.GL.gl.FLOAT, false, 0, 0);

  if(object.glBlend.blendEnabled == true) {
    if(!world.GL.gl.isEnabled(world.GL.gl.BLEND)) {
      // world.GL.gl.disable(world.GL.gl.DEPTH_TEST);
      world.GL.gl.enable(world.GL.gl.BLEND);
    }
    // world.GL.gl.blendColor( 1.0 , 1.0, 1.0, 0.3 );
    world.GL.gl.blendFunc(world.GL.gl[object.glBlend.blendParamSrc], world.GL.gl[object.glBlend.blendParamDest]);
  } else {
    world.GL.gl.disable(world.GL.gl.BLEND);
    world.GL.gl.enable(world.GL.gl.DEPTH_TEST);
  }

  this.setMatrixUniforms(object, this.pMatrix, object.mvMatrix);
  world.GL.gl.drawArrays(world.GL.gl[object.glDrawElements.mode], 0, object.vertexPositionBuffer.numItems);
  object.instancedDraws.overrideDrawArraysInstance(object);

  this.mvPopMatrix(object.mvMatrix, this.mvMatrixStack);
};

App.operation.draws.drawObj = function(object, ray) {
  var lighting = 1;
  var localLooper = 0;
  lighting = true;

  mat4.identity(object.mvMatrix);
  world.mvPushMatrix(object.mvMatrix, this.mvMatrixStack);

  if(object.isHUD === true) {

    mat4.translate(object.mvMatrix, object.mvMatrix, object.position.worldLocation);
    if(raycaster.checkingProcedureCalc && typeof ray === 'undefined') raycaster.checkingProcedureCalcObj(object);

  } else {

    if(App.camera.FirstPersonController == true) {
      camera.setCamera(object);
    } else if(App.camera.SceneController == true) {
      camera.setSceneCamera(object);
    }

    mat4.translate(object.mvMatrix, object.mvMatrix, object.position.worldLocation);
    if(raycaster.checkingProcedureCalc && typeof ray === 'undefined') raycaster.checkingProcedureCalcObj(object);
    mat4.rotate(object.mvMatrix, object.mvMatrix, degToRad(object.rotation.rx), object.rotation.getRotDirX());
    mat4.rotate(object.mvMatrix, object.mvMatrix, degToRad(object.rotation.ry), object.rotation.getRotDirY());
    mat4.rotate(object.mvMatrix, object.mvMatrix, degToRad(object.rotation.rz), object.rotation.getRotDirZ());

  }

  if(typeof object.mesh.vertexBuffer != 'undefined') {
    if(object.animation != null) {
      object.animation.currentDraws++;
      if(typeof object.animation.anims === 'undefined' && object.animation.currentDraws > object.animation.speed) {
        object.animation.currentAni++;
        object.animation.currentDraws = 0;
        if(object.animation.currentAni > object.animation.sumOfAniFrames) {
          object.animation.currentAni = 0;
        }
      }

      // Make animation sequences -> sub animation
      if(typeof object.animation.anims !== 'undefined') {
        if(object.animation.currentDraws > object.animation.anims[object.animation.anims.active].speed) {
          object.animation.currentAni++;
          object.animation.currentDraws = 0;
          if(object.animation.currentAni > object.animation.anims[object.animation.anims.active].to - 1) {
            object.animation.currentAni = object.animation.anims[object.animation.anims.active].from;
          }
        }
      }

      if(object.animation.currentAni == 0) {
        world.GL.gl.bindBuffer(world.GL.gl.ARRAY_BUFFER, object.meshList[object.animation.id].vertexBuffer);
        world.GL.gl.vertexAttribPointer(object.shaderProgram.vertexPositionAttribute, object.meshList[object.animation.id].vertexBuffer.itemSize, world.GL.gl.FLOAT, false, 0, 0);
      } else {
        world.GL.gl.bindBuffer(world.GL.gl.ARRAY_BUFFER, object.meshList[object.animation.id + object.animation.currentAni].vertexBuffer);
        world.GL.gl.vertexAttribPointer(
          object.shaderProgram.vertexPositionAttribute,
          object.meshList[object.animation.id + object.animation.currentAni].vertexBuffer.itemSize,
          world.GL.gl.FLOAT,
          false,
          0,
          0
        );
      }

    } else {
      // now to render the mesh test
      world.GL.gl.bindBuffer(world.GL.gl.ARRAY_BUFFER, object.mesh.vertexBuffer);
      world.GL.gl.bufferData(world.GL.gl.ARRAY_BUFFER, object.mesh.vertices, world.GL.gl.STATIC_DRAW);
      world.GL.gl.vertexAttribPointer(object.shaderProgram.vertexPositionAttribute, object.mesh.vertexBuffer.itemSize, world.GL.gl.FLOAT, false, 0, 0);
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
  if(lighting && object.shaderProgram.useLightingUniform) {
    world.GL.gl.uniform1i(object.shaderProgram.useLightingUniform, lighting);
    /* Set the normals */
    if(object.mesh.normalBuffer) {
      world.GL.gl.bindBuffer(world.GL.gl.ARRAY_BUFFER, object.mesh.normalBuffer);
      world.GL.gl.vertexAttribPointer(object.shaderProgram.vertexNormalAttribute, object.mesh.normalBuffer.itemSize, world.GL.gl.FLOAT, false, 0, 0);
      world.GL.gl.enableVertexAttribArray(object.shaderProgram.vertexNormalAttribute);
      localLooper = localLooper + 1;
    }
    /* Set the ambient light                 */
    if(object.shaderProgram.ambientColorUniform) {
      if(E('ambLight') && E('ambLight').color) {
        world.GL.gl.uniform3f(object.shaderProgram.ambientColorUniform, parseFloat(E('ambLight').color.rgb[0]), parseFloat(E('ambLight').color.rgb[1]), parseFloat(E('ambLight').color.rgb[2]));
      } else {
        world.GL.gl.uniform3f(object.shaderProgram.ambientColorUniform, object.LightsData.ambientLight.R(), object.LightsData.ambientLight.G(), object.LightsData.ambientLight.B());
      }
    }
    /* Directional light */
    if(object.shaderProgram.directionalColorUniform) {
      if(E('dirLight') && E('dirLight').color) {
        world.GL.gl.uniform3f(object.shaderProgram.directionalColorUniform, parseFloat(E('dirLight').color.rgb[0]), parseFloat(E('dirLight').color.rgb[1]), parseFloat(E('dirLight').color.rgb[2]));
      } else {
        world.GL.gl.uniform3f(object.shaderProgram.directionalColorUniform, object.LightsData.directionLight.R(), object.LightsData.directionLight.G(), object.LightsData.directionLight.B());
      }
    }

    /* Normalize the direction */
    var lightingDirection = null;
    if(object.shaderProgram.lightingDirectionUniform) {
      if(E('dirX') && E('dirY') && E('dirZ')) {
        lightingDirection = [parseFloat(E('dirX').value), parseFloat(E('dirY').value), parseFloat(E('dirZ').value)];
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
        world.GL.gl.uniform3f(object.shaderProgram.ambientColorUniform, parseFloat(1), parseFloat(2), parseFloat(0));
      }
      if(object.shaderProgram.directionalColorUniform) {
        world.GL.gl.uniform3f(object.shaderProgram.directionalColorUniform, parseFloat(1), parseFloat(1), parseFloat(0));
      }
    }
  }

  // it's possible that the mesh doesn't contain any texture coordinates
  // in this case, the texture vertexAttribArray will need to be disabled
  // before the call to drawElements
  if(!object.mesh.textures.length && !object.texture) {
    //  world.GL.gl.disableVertexAttribArray(object.shaderProgram.textureCoordAttribute);
  } else {
    // if the texture vertexAttribArray has been previously
    // disabled, then it needs to be re-enabled
    if(object.texture) {
      world.GL.gl.bindBuffer(world.GL.gl.ARRAY_BUFFER, object.mesh.textureBuffer);
      world.GL.gl.enableVertexAttribArray(object.shaderProgram.textureCoordAttribute);
      world.GL.gl.vertexAttribPointer(object.shaderProgram.textureCoordAttribute, object.mesh.textureBuffer.itemSize, world.GL.gl.FLOAT, false, 0, 0);
      //ori world.GL.gl.activeTexture(world.GL.gl.TEXTURE0);
      // ori world.GL.gl.bindTexture(world.GL.gl.TEXTURE_2D, object.texture);

      if(object.streamTextures != null) {
        // video/webcam tex
        // App.tools.loadVideoTexture('glVideoTexture', object.streamTextures.videoImage);
        if(object.streamTextures.video) {
          App.tools.loadVideoTexture('glVideoTexture', object.streamTextures.video);
        } else {
          App.tools.loadVideoTexture('glVideoTexture', object.streamTextures.videoImage);
        }
        world.GL.gl.uniform1i(object.shaderProgram.samplerUniform, 0);
      }
      else if(object.FBO) {
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
        world.GL.gl.activeTexture(world.GL.gl.TEXTURE0);
        world.GL.gl.bindTexture(world.GL.gl.TEXTURE_2D, object.FBO.FB.texture);
        world.GL.gl.uniform1i(object.shaderProgram.samplerUniform, 0);

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
        for(var t = 0;t < object.textures.length;t++) {
          world.GL.gl.activeTexture(world.GL.gl['TEXTURE' + t]);
          world.GL.gl.bindTexture(world.GL.gl.TEXTURE_2D, object.textures[t]);
          world.GL.gl.pixelStorei(world.GL.gl.UNPACK_FLIP_Y_WEBGL, false);
          world.GL.gl.texParameteri(world.GL.gl.TEXTURE_2D, world.GL.gl.TEXTURE_MAG_FILTER, world.GL.gl.NEAREST);
          world.GL.gl.texParameteri(world.GL.gl.TEXTURE_2D, world.GL.gl.TEXTURE_MIN_FILTER, world.GL.gl.NEAREST);
          world.GL.gl.texParameteri(world.GL.gl.TEXTURE_2D, world.GL.gl.TEXTURE_WRAP_S, world.GL.gl.CLAMP_TO_EDGE);
          world.GL.gl.texParameteri(world.GL.gl.TEXTURE_2D, world.GL.gl.TEXTURE_WRAP_T, world.GL.gl.CLAMP_TO_EDGE);

          // -- Allocate storage for the texture
          //world.GL.gl.texStorage2D(world.GL.gl.TEXTURE_2D, 1, world.GL.gl.RGB8, 512, 512);
          //world.GL.gl.texSubImage2D(world.GL.gl.TEXTURE_2D, 0, 0, 0, world.GL.gl.RGB, world.GL.gl.UNSIGNED_BYTE, image);
          //world.GL.gl.generateMipmap(world.GL.gl.TEXTURE_2D);
          world.GL.gl.uniform1i(object.shaderProgram.samplerUniform, t);
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

  if(object.mesh.normalBuffer && object.shaderProgram.nMatrixUniform) {
    var normalMatrix = mat3.create();
    mat3.normalFromMat4(normalMatrix, object.mvMatrix);
    mat3.transpose(normalMatrix, normalMatrix);
    world.GL.gl.uniformMatrix3fv(object.shaderProgram.nMatrixUniform, false, normalMatrix);
  }

  world.GL.gl.bindBuffer(world.GL.gl.ELEMENT_ARRAY_BUFFER, object.mesh.indexBuffer);
  this.setMatrixUniforms(object, this.pMatrix, object.mvMatrix);

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
    // global position
    world.GL.gl.uniform3fv(object.shaderProgram.specularColor, object.shadows.specularDATA);
    world.GL.gl.uniform3fv(object.shaderProgram.uLightPosition, world.uLightPosition);
  } else if(object.shadows && object.shadows.type == 'lens') {
    // Lens
    world.GL.gl.uniform3fv(object.shaderProgram.uLightPosition, world.uLightPosition);
    world.GL.gl.uniform3fv(object.shaderProgram.uControl, object.shadows.uControl);
    world.GL.gl.uniform3fv(object.shaderProgram.uResolution, object.shadows.uResolution);
  }

  if(object.glBlend.blendEnabled == true) {
    if(!world.GL.gl.isEnabled(world.GL.gl.BLEND)) {
      // world.GL.gl.disable(world.GL.gl.DEPTH_TEST);
      world.GL.gl.enable(world.GL.gl.BLEND);
    }
    world.GL.gl.blendFunc(world.GL.gl[object.glBlend.blendParamSrc], world.GL.gl[object.glBlend.blendParamDest]);
  } else {
    world.GL.gl.disable(world.GL.gl.BLEND);
    world.GL.gl.enable(world.GL.gl.DEPTH_TEST);
  }

  // ori this.setMatrixUniforms(object, this.pMatrix, object.mvMatrix);
  world.disableUnusedAttr(world.GL.gl, localLooper + 1);
  // world.GL.gl.drawElements(world.GL.gl[object.glDrawElements.mode], object.glDrawElements.numberOfIndicesRender, world.GL.gl.UNSIGNED_SHORT, 0);
  // update for anim
  world.GL.gl.drawElements(world.GL.gl[object.glDrawElements.mode], object.glDrawElements.numberOfIndicesRender, world.GL.gl.UNSIGNED_SHORT, 0);

  this.mvPopMatrix(object.mvMatrix, this.mvMatrixStack);
};

App.operation.draws.drawSquareTex = function(object, ray) {
  var lighting = true;
  // eslint-disable-next-line no-unused-vars
  var localLooper = 0;

  mat4.identity(object.mvMatrix);
  this.mvPushMatrix(object.mvMatrix, this.mvMatrixStack);

  if(object.isHUD === true) {

    mat4.translate(object.mvMatrix, object.mvMatrix, object.position.worldLocation);
    if(raycaster.checkingProcedureCalc && typeof ray === 'undefined') raycaster.checkingProcedureCalc(object);

  } else {

    if(App.camera.FirstPersonController == true) {
      camera.setCamera(object);
    } else if(App.camera.SceneController == true) {
      camera.setSceneCamera(object);
    }

    mat4.translate(object.mvMatrix, object.mvMatrix, object.position.worldLocation);
    if(raycaster.checkingProcedureCalc) raycaster.checkingProcedureCalc(object);
    mat4.rotate(object.mvMatrix, object.mvMatrix, degToRad(object.rotation.rz), object.rotation.getRotDirZ());
    mat4.rotate(object.mvMatrix, object.mvMatrix, degToRad(object.rotation.rx), object.rotation.getRotDirX());
    mat4.rotate(object.mvMatrix, object.mvMatrix, degToRad(object.rotation.ry), object.rotation.getRotDirY());
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

    /* Ambient light - posible deplaced */
    if(object.shaderProgram.ambientColorUniform) {
      if(E('ambLight') && E('ambLight').color) {
        world.GL.gl.uniform3f(object.shaderProgram.ambientColorUniform, parseFloat(E('ambLight').color.rgb[0]), parseFloat(E('ambLight').color.rgb[1]), parseFloat(E('ambLight').color.rgb[2]));
      } else {
        world.GL.gl.uniform3f(object.shaderProgram.ambientColorUniform, object.LightsData.ambientLight.r, object.LightsData.ambientLight.g, object.LightsData.ambientLight.b);
      }
    }

    /* Directional light */
    if(object.shaderProgram.directionalColorUniform) {
      if(E('dirLight') && E('dirLight').color) {
        world.GL.gl.uniform3f(object.shaderProgram.directionalColorUniform, parseFloat(E('dirLight').color.rgb[0]), parseFloat(E('dirLight').color.rgb[1]), parseFloat(E('dirLight').color.rgb[2]));
      } else {
        world.GL.gl.uniform3f(object.shaderProgram.directionalColorUniform, object.LightsData.directionLight.R(), object.LightsData.directionLight.G(), object.LightsData.directionLight.B());
      }
    }

    /* Normalize the direction */
    var lightingDirection = null;
    if(object.shaderProgram.lightingDirectionUniform) {
      if(E('dirX') && E('dirY') && E('dirZ')) {
        lightingDirection = [parseFloat(E('dirX').value), parseFloat(E('dirY').value), parseFloat(E('dirZ').value)];
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
        world.GL.gl.uniform3f(object.shaderProgram.ambientColorUniform, parseFloat(1), parseFloat(2), parseFloat(0));
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
      // video/webcam tex
      if(object.streamTextures.videoImage) {
        App.tools.loadVideoTexture('glVideoTexture', object.streamTextures.videoImage);
      } else {
        App.tools.loadVideoTexture('glVideoTexture', object.streamTextures.video);
      }
      world.GL.gl.uniform1i(object.shaderProgram.samplerUniform, 0);
    } else if(object.FBO) {
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

      world.GL.gl.activeTexture(world.GL.gl.TEXTURE0);
      world.GL.gl.bindTexture(world.GL.gl.TEXTURE_2D, object.FBO.FB.texture);
      world.GL.gl.uniform1i(object.shaderProgram.samplerUniform, 0);

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
      for(var t = 0;t < object.textures.length;t++) {
        if(object.custom.gl_texture == null) {
          world.GL.gl.activeTexture(world.GL.gl['TEXTURE' + t]);
          world.GL.gl.bindTexture(world.GL.gl.TEXTURE_2D, object.textures[t]);
          // world.GL.gl.pixelStorei(world.GL.gl.UNPACK_FLIP_Y_WEBGL, false);
          if(world.GL.extTFAnisotropic) {
            world.GL.gl.texParameterf(world.GL.gl.TEXTURE_2D,
              world.GL.extTFAnisotropic.TEXTURE_MAX_ANISOTROPY_EXT,
              world.GL.MAX_TEXTURE_MAX_ANISOTROPY_EXT);
          }

          world.GL.gl.texParameteri(world.GL.gl.TEXTURE_2D, world.GL.gl.TEXTURE_MAG_FILTER, object.texParams.TEXTURE_MAG_FILTER | world.GL.gl.LINEAR);
          world.GL.gl.texParameteri(world.GL.gl.TEXTURE_2D, world.GL.gl.TEXTURE_MIN_FILTER, object.texParams.TEXTURE_MIN_FILTER | world.GL.gl.LINEAR);
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
          world.GL.gl.pixelStorei(world.GL.gl.UNPACK_FLIP_Y_WEBGL, false);

          if(object.texParams.TEXTURE_MIN_FILTER) {
            world.GL.gl.generateMipmap(world.GL.gl.TEXTURE_2D);
          }

          world.GL.gl.uniform1i(object.shaderProgram.samplerUniform, t);
        } else {
          object.custom.gl_texture(object, t);
        }
      }
    }

    localLooper = localLooper + 1;
  }

  world.GL.gl.bindBuffer(world.GL.gl.ELEMENT_ARRAY_BUFFER, object.vertexIndexBuffer);
  world.setMatrixUniforms(object, this.pMatrix, object.mvMatrix);

  if(object.vertexNormalBuffer && object.shaderProgram.nMatrixUniform) {
    var normalMatrix = mat3.create();
    mat3.normalFromMat4(normalMatrix, object.mvMatrix);
    mat3.transpose(normalMatrix, normalMatrix);
    world.GL.gl.uniformMatrix3fv(object.shaderProgram.nMatrixUniform, false, normalMatrix);
  }

  // world.disableUnusedAttr( world.GL.gl, localLooper);
  world.disableUnusedAttr(world.GL.gl, 4); // ori

  if(object.glBlend.blendEnabled == true) {
    if(!world.GL.gl.isEnabled(world.GL.gl.BLEND)) {
      world.GL.gl.enable(world.GL.gl.BLEND);
    }
    world.GL.gl.blendFunc(world.GL.gl[object.glBlend.blendParamSrc], world.GL.gl[object.glBlend.blendParamDest]);
  } else {
    world.GL.gl.disable(world.GL.gl.BLEND);
    world.GL.gl.enable(world.GL.gl.DEPTH_TEST);
    // for non blend
    world.GL.gl.depthMask(true);
    // world.GL.gl.enable(world.GL.gl.CULL_FACE);
  }

  // shadows
  if(object.shadows && object.shadows.type == 'spot') {
    // console.log(" SHADOWS -> " , object.shadows)
    world.GL.gl.uniform3fv(object.shaderProgram.lightWorldPositionLocation, object.shadows.lightPosition);
    world.GL.gl.uniform3fv(object.shaderProgram.viewWorldPositionLocation, object.shadows.lightPosition);
    world.GL.gl.uniform1f(object.shaderProgram.shininessLocation, object.shadows.shininess);
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
    world.GL.gl.uniform3fv(object.shaderProgram.lightDirectionLocation, object.shadows.lightDirection);
    world.GL.gl.uniform1f(object.shaderProgram.innerLimitLocation, Math.cos(object.shadows.innerLimit));
    world.GL.gl.uniform1f(object.shaderProgram.outerLimitLocation, Math.cos(object.shadows.outerLimit));
    // world.GL.gl.uniform1f(object.shaderProgram.u_projectedTexture, 1);
  } else if(object.shadows && object.shadows.type == 'spec') {
    // global position
    world.GL.gl.uniform3fv(object.shaderProgram.specularColor, object.shadows.specularDATA);
    world.GL.gl.uniform3fv(object.shaderProgram.uLightPosition, world.uLightPosition);
  } else if(object.shadows && object.shadows.type == 'lens') {
    // Lens
    world.GL.gl.uniform3fv(object.shaderProgram.uLightPosition, world.uLightPosition);
    world.GL.gl.uniform3fv(object.shaderProgram.uControl, object.shadows.uControl);
    world.GL.gl.uniform3fv(object.shaderProgram.uResolution, object.shadows.uResolution);
  }

  world.GL.gl.drawElements(world.GL.gl[object.glDrawElements.mode], object.glDrawElements.numberOfIndicesRender, world.GL.gl.UNSIGNED_SHORT, 0);
  object.instancedDraws.overrideDrawArraysInstance(object);

  this.mvPopMatrix(object.mvMatrix, this.mvMatrixStack);
};

App.operation.draws.sphere = function(object, ray) {
  var lighting = true;
  var localLooper = 0;

  mat4.identity(object.mvMatrix);
  this.mvPushMatrix(object.mvMatrix, this.mvMatrixStack);

  if(App.camera.FirstPersonController == true) {
    camera.setCamera(object);
  } else if(App.camera.SceneController == true) {
    camera.setSceneCamera(object);
  }

  // no ray for now !!!
  mat4.translate(object.mvMatrix, object.mvMatrix, object.position.worldLocation);
  mat4.rotate(object.mvMatrix, object.mvMatrix, degToRad(object.rotation.rx), object.rotation.getRotDirX());
  mat4.rotate(object.mvMatrix, object.mvMatrix, degToRad(object.rotation.ry), object.rotation.getRotDirY());
  mat4.rotate(object.mvMatrix, object.mvMatrix, degToRad(object.rotation.rz), object.rotation.getRotDirZ());

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

  // LIGHT
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
      if(E('ambLight') && E('ambLight').color) {
        world.GL.gl.uniform3f(object.shaderProgram.ambientColorUniform, parseFloat(E('ambLight').color.rgb[0]), parseFloat(E('ambLight').color.rgb[1]), parseFloat(E('ambLight').color.rgb[2]));
      } else {
        world.GL.gl.uniform3f(object.shaderProgram.ambientColorUniform, object.LightsData.ambientLight.r, object.LightsData.ambientLight.g, object.LightsData.ambientLight.b);
      }
    }

    /* Set the directional light */
    if(object.shaderProgram.directionalColorUniform) {
      if(E('dirLight') && E('dirLight').color) {
        world.GL.gl.uniform3f(object.shaderProgram.directionalColorUniform, parseFloat(E('dirLight').color.rgb[0]), parseFloat(E('dirLight').color.rgb[1]), parseFloat(E('dirLight').color.rgb[2]));
      } else {
        world.GL.gl.uniform3f(object.shaderProgram.directionalColorUniform, object.LightsData.directionLight.R(), object.LightsData.directionLight.G(), object.LightsData.directionLight.B());
      }
    }

    /* Normalize the direction */
    var lightingDirection = null;
    if(object.shaderProgram.lightingDirectionUniform) {
      if(E('dirX') && E('dirY') && E('dirZ')) {
        lightingDirection = [parseFloat(E('dirX').value), parseFloat(E('dirY').value), parseFloat(E('dirZ').value)];
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
        App.tools.loadVideoTexture('glVideoTextureTorus', object.streamTextures.video);
      } else {
        App.tools.loadVideoTexture('glVideoTextureTorus', object.streamTextures.videoImage);
      }

      world.GL.gl.uniform1i(object.shaderProgram.samplerUniform, 0);
    } else {
      for(var t = 0;t < object.textures.length;t++) {
        world.GL.gl.activeTexture(world.GL.gl['TEXTURE' + t]);
        world.GL.gl.bindTexture(world.GL.gl.TEXTURE_2D, object.textures[t]);
        world.GL.gl.pixelStorei(world.GL.gl.UNPACK_FLIP_Y_WEBGL, false);
        world.GL.gl.texParameteri(world.GL.gl.TEXTURE_2D, world.GL.gl.TEXTURE_MAG_FILTER, world.GL.gl.LINEAR);
        world.GL.gl.texParameteri(world.GL.gl.TEXTURE_2D, world.GL.gl.TEXTURE_MIN_FILTER, world.GL.gl.LINEAR);
        world.GL.gl.texParameteri(world.GL.gl.TEXTURE_2D, world.GL.gl.TEXTURE_WRAP_S, world.GL.gl.CLAMP_TO_EDGE);
        world.GL.gl.texParameteri(world.GL.gl.TEXTURE_2D, world.GL.gl.TEXTURE_WRAP_T, world.GL.gl.CLAMP_TO_EDGE);
        world.GL.gl.uniform1i(object.shaderProgram.samplerUniform, t);
      }
    }
    localLooper = localLooper + 1;
  }

  world.GL.gl.bindBuffer(world.GL.gl.ELEMENT_ARRAY_BUFFER, object.vertexIndexBuffer);

  if(object.vertexNormalBuffer && object.shaderProgram.nMatrixUniform) {
    var normalMatrix = mat3.create();
    mat3.normalFromMat4(normalMatrix, object.mvMatrix);
    mat3.transpose(normalMatrix, normalMatrix);
    world.GL.gl.uniformMatrix3fv(object.shaderProgram.nMatrixUniform, false, normalMatrix);
  }

  try {
    world.GL.gl.useProgram(object.shaderProgram);
    world.GL.gl.uniform1i(object.shaderProgram.uniformTime, 0.1);
  } catch(e) {
    console.warn('WTF - ERROR10001');
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
  }

  world.setMatrixUniforms(object, this.pMatrix, object.mvMatrix);
  world.GL.gl.drawElements(world.GL.gl[object.glDrawElements.mode], object.glDrawElements.numberOfIndicesRender, world.GL.gl.UNSIGNED_SHORT, 0);
  object.instancedDraws.overrideDrawArraysInstance(object);

  this.mvPopMatrix(object.mvMatrix, this.mvMatrixStack);
};

var drawsOperation = App.operation.draws;

export default drawsOperation;
