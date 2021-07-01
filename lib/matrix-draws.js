
/*
  visual-js webgl2 project
  Nikola Lukic
  file : DRAWS
 */

import App from "../program/manifest";
import { world } from "./matrix-world";
import { camera } from "./events";

/* globals App mat4 camera degToRad vec3 world mat3 */

App.operation.draws = new Object();

// CUBE
App.operation.draws.cube = function (object) {

  var lighting = 1;
  var localLooper = 0;
  // if (true) {
  lighting = true;
  // }

  mat4.identity(object.mvMatrix);
  this.mvPushMatrix(object.mvMatrix, this.mvMatrixStack);

  if (App.camera.FirstPersonController == true) {
    camera.setCamera(object);
  }

  mat4.translate(object.mvMatrix, object.mvMatrix, object.position.worldLocation);
  mat4.rotate(object.mvMatrix, object.mvMatrix, degToRad(object.rotation.rx), object.rotation.getRotDirX());
  mat4.rotate(object.mvMatrix, object.mvMatrix, degToRad(object.rotation.ry), object.rotation.getRotDirY());
  mat4.rotate(object.mvMatrix, object.mvMatrix, degToRad(object.rotation.rz), object.rotation.getRotDirZ());

  
  //VERTEX BUFFER
  
  if (object.vertexPositionBuffer) {
    world.GL.gl.bindBuffer(world.GL.gl.ARRAY_BUFFER, object.vertexPositionBuffer);

    if (object.geometry.dynamicBuffer == true) {

      world.GL.gl.bufferData(world.GL.gl.ARRAY_BUFFER, object.geometry.vertices, world.GL.gl.STATIC_DRAW);

    }

    world.GL.gl.vertexAttribPointer(object.shaderProgram.vertexPositionAttribute, object.vertexPositionBuffer.itemSize, world.GL.gl.FLOAT, false, 0, 0);
    world.GL.gl.enableVertexAttribArray(object.shaderProgram.vertexPositionAttribute);
    localLooper = localLooper + 1;
  }
  
  //COLOR BUFFER
  
  if (object.vertexColorBuffer) {
    world.GL.gl.bindBuffer(world.GL.gl.ARRAY_BUFFER, object.vertexColorBuffer);
    world.GL.gl.vertexAttribPointer(object.shaderProgram.vertexColorAttribute, object.vertexColorBuffer.itemSize, world.GL.gl.FLOAT, false, 0, 0);
    world.GL.gl.enableVertexAttribArray(object.shaderProgram.vertexColorAttribute);
    localLooper = localLooper + 1;
  }
  
  //LIGHT STAFF
  
  if (lighting && object.shaderProgram.useLightingUniform) {

    world.GL.gl.uniform1i(object.shaderProgram.useLightingUniform, lighting);

    /* Set the normals                       */
    if (object.vertexNormalBuffer) {
      world.GL.gl.bindBuffer(world.GL.gl.ARRAY_BUFFER, object.vertexNormalBuffer);
      world.GL.gl.vertexAttribPointer(object.shaderProgram.vertexNormalAttribute, object.vertexNormalBuffer.itemSize, world.GL.gl.FLOAT, false, 0, 0);
      world.GL.gl.enableVertexAttribArray(object.shaderProgram.vertexNormalAttribute);
      localLooper = localLooper + 1;
    }

    /* Set the ambient light                 */
    if (object.shaderProgram.ambientColorUniform) {
      if (document.getElementById("ambLight") && document.getElementById("ambLight").color) {
        world.GL.gl.uniform3f(object.shaderProgram.ambientColorUniform,
          parseFloat(document.getElementById("ambLight").color.rgb[0]),
          parseFloat(document.getElementById("ambLight").color.rgb[1]),
          parseFloat(document.getElementById("ambLight").color.rgb[2]));
      } else {
        // object.LightsData.ambientLight
        world.GL.gl.uniform3f(object.shaderProgram.ambientColorUniform, object.LightsData.ambientLight.r, object.LightsData.ambientLight.g, object.LightsData.ambientLight.b);
      }
    }

    /* Set the directional light             */
    if (object.shaderProgram.directionalColorUniform) {
      if (document.getElementById("dirLight") && document.getElementById("dirLight").color) {
        world.GL.gl.uniform3f(object.shaderProgram.directionalColorUniform,
          parseFloat(document.getElementById("dirLight").color.rgb[0]),
          parseFloat(document.getElementById("dirLight").color.rgb[1]),
          parseFloat(document.getElementById("dirLight").color.rgb[2]));
      } else {

        // object.LightsData.lightingDirection
        world.GL.gl.uniform3f(object.shaderProgram.directionalColorUniform, object.LightsData.directionLight.R(), object.LightsData.directionLight.G(), object.LightsData.directionLight.B());

      }
    }

    /* Normalize the direction               */
    var lightingDirection = null;
    if (object.shaderProgram.lightingDirectionUniform) {
      if (document.getElementById("dirX") && document.getElementById("dirY") && document.getElementById("dirZ")) {
        lightingDirection = [
          parseFloat(document.getElementById("dirX").value),
          parseFloat(document.getElementById("dirY").value),
          parseFloat(document.getElementById("dirZ").value)
        ];
      } else {
        lightingDirection = [object.LightsData.lightingDirection.r, object.LightsData.lightingDirection.g, object.LightsData.lightingDirection.b];
      }

      var adjustedLD = vec3.create();
      vec3.normalize(adjustedLD, lightingDirection);
      vec3.scale(adjustedLD, adjustedLD, -1);
      world.GL.gl.uniform3fv(object.shaderProgram.lightingDirectionUniform, adjustedLD);
    }
  } else {
    if (object.shaderProgram.useLightingUniform) {
      if (object.shaderProgram.ambientColorUniform) {
        world.GL.gl.uniform3f(object.shaderProgram.ambientColorUniform, parseFloat(0.2), parseFloat(0.2), parseFloat(0.2));
      }
      if (object.shaderProgram.directionalColorUniform) {
        world.GL.gl.uniform3f(object.shaderProgram.directionalColorUniform, parseFloat(1), parseFloat(0), parseFloat(0));
      }
    }
  }

  
  //TEXTURES
  
  if (object.vertexTexCoordBuffer) {

    world.GL.gl.bindBuffer(world.GL.gl.ARRAY_BUFFER, object.vertexTexCoordBuffer);

    if (object.geometry.dynamicBuffer == true) {

      world.GL.gl.bufferData(world.GL.gl.ARRAY_BUFFER, object.geometry.texCoords, world.GL.gl.STATIC_DRAW);

    }

    world.GL.gl.vertexAttribPointer(object.shaderProgram.textureCoordAttribute, object.vertexTexCoordBuffer.itemSize, world.GL.gl.FLOAT, false, 0, 0);
    world.GL.gl.enableVertexAttribArray(object.shaderProgram.textureCoordAttribute);

    if (object.streamTextures != null) {

      // video webcam textures
      App.tools.loadVideoTexture("glVideoTexture", object.streamTextures.videoImage);
      world.GL.gl.uniform1i(object.shaderProgram.samplerUniform, 0);

    } else {

      for (var t = 0; t < object.textures.length; t++) {

        if (object.custom.gl_texture == null) {

          world.GL.gl.activeTexture(world.GL.gl["TEXTURE" + t]);
          world.GL.gl.bindTexture(world.GL.gl.TEXTURE_2D, object.textures[t]);
          world.GL.gl.pixelStorei(world.GL.gl.UNPACK_FLIP_Y_WEBGL, false);
          world.GL.gl.texParameteri(world.GL.gl.TEXTURE_2D, world.GL.gl.TEXTURE_MAG_FILTER, world.GL.gl.NEAREST);
          world.GL.gl.texParameteri(world.GL.gl.TEXTURE_2D, world.GL.gl.TEXTURE_MIN_FILTER, world.GL.gl.NEAREST);
          world.GL.gl.texParameteri(world.GL.gl.TEXTURE_2D, world.GL.gl.TEXTURE_WRAP_S, world.GL.gl.CLAMP_TO_EDGE);
          world.GL.gl.texParameteri(world.GL.gl.TEXTURE_2D, world.GL.gl.TEXTURE_WRAP_T, world.GL.gl.CLAMP_TO_EDGE);
          // -- Allocate storage for the texture
          // world.GL.gl.texStorage2D(world.GL.gl.TEXTURE_2D, 1, world.GL.gl.RGB8, 512, 512);
          // world.GL.gl.texSubImage2D(world.GL.gl.TEXTURE_2D, 0, 0, 0, world.GL.gl.RGB, world.GL.gl.UNSIGNED_BYTE, image);
          // world.GL.gl.generateMipmap(world.GL.gl.TEXTURE_2D);
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

  if (object.vertexNormalBuffer && object.shaderProgram.nMatrixUniform) {
    var normalMatrix = mat3.create();
    mat3.normalFromMat4(normalMatrix, object.mvMatrix);
    mat3.transpose(normalMatrix, normalMatrix);
    world.GL.gl.uniformMatrix3fv(object.shaderProgram.nMatrixUniform, false, normalMatrix);
  }

  world.disableUnusedAttr(world.GL.gl, localLooper);

  if (object.glBlend.blendEnabled == true) {
    if (!world.GL.gl.isEnabled(world.GL.gl.BLEND)) {

      // world.GL.gl.disable(world.GL.gl.DEPTH_TEST);
      world.GL.gl.enable(world.GL.gl.BLEND);

    }
    world.GL.gl.blendFunc(world.GL.gl[object.glBlend.blendParamSrc], world.GL.gl[object.glBlend.blendParamDest]);
  } else {
    world.GL.gl.disable(world.GL.gl.BLEND);
    world.GL.gl.enable(world.GL.gl.DEPTH_TEST);
  }
  // smoothstep(T edge0, T edge1, T x);
  // world.GL.gl.drawElements( world.GL.gl.TRIANGLES, object.vertexIndexBuffer.numItems,  world.GL.gl.UNSIGNED_SHORT, 0);
  world.GL.gl.drawElements(world.GL.gl[object.glDrawElements.mode], object.glDrawElements.numberOfIndicesRender, world.GL.gl.UNSIGNED_SHORT, 0);

  object.instancedDraws.overrideDrawArraysInstance(object);

  this.mvPopMatrix(object.mvMatrix, this.mvMatrixStack);

};

//##############################################
// PIRAMIDE
//##############################################
App.operation.draws.piramide = function (object) {

  mat4.identity(object.mvMatrix);
  world.mvPushMatrix(object.mvMatrix, this.mvMatrixStack);

  if (App.camera.FirstPersonController == true) {
    camera.setCamera(object);
  }

  mat4.translate(object.mvMatrix, object.mvMatrix, object.position.worldLocation);
  mat4.rotate(object.mvMatrix, object.mvMatrix, degToRad(object.rotation.rx), object.rotation.getRotDirX());
  mat4.rotate(object.mvMatrix, object.mvMatrix, degToRad(object.rotation.ry), object.rotation.getRotDirY());
  mat4.rotate(object.mvMatrix, object.mvMatrix, degToRad(object.rotation.rz), object.rotation.getRotDirZ());

  if (object.geometry.dynamicBuffer == true) {

    world.GL.gl.bindBuffer(world.GL.gl.ARRAY_BUFFER, object.vertexPositionBuffer);
    world.GL.gl.bufferData(world.GL.gl.ARRAY_BUFFER, object.geometry.vertices, world.GL.gl.STATIC_DRAW);

  } else {

    world.GL.gl.bindBuffer(world.GL.gl.ARRAY_BUFFER, object.vertexPositionBuffer); //ori without if dynamicBuffer

  }

  world.GL.gl.vertexAttribPointer(object.shaderProgram.vertexPositionAttribute, object.vertexPositionBuffer.itemSize, world.GL.gl.FLOAT, false, 0, 0);

  if (object.vertexColorBuffer) {

    world.GL.gl.bindBuffer(world.GL.gl.ARRAY_BUFFER, object.vertexColorBuffer);
    world.GL.gl.vertexAttribPointer(object.shaderProgram.vertexColorAttribute, object.vertexColorBuffer.itemSize, world.GL.gl.FLOAT, false, 0, 0);

  }

  if (object.glBlend.blendEnabled == true) {
    if (!world.GL.gl.isEnabled(world.GL.gl.BLEND)) {

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
  // world.GL.gl.drawArrays(world.GL.gl.TRIANGLES, 0, object.vertexPositionBuffer.numItems);
  world.GL.gl.drawArrays(world.GL.gl[object.glDrawElements.mode], 0, object.vertexPositionBuffer.numItems);

  object.instancedDraws.overrideDrawArraysInstance(object);

  /*
    world.GL.gl.drawArrays(world.GL.gl.TRIANGLES, 0, object.vertexPositionBuffer.numItems);
    mat4.translate(object.mvMatrix, object.mvMatrix, [2,1,1] );
    world.setMatrixUniforms(object,this.pMatrix,object.mvMatrix)
    world.GL.gl.drawArrays(world.GL.gl.TRIANGLES, 0, object.vertexPositionBuffer.numItems);
  */

  this.mvPopMatrix(object.mvMatrix, this.mvMatrixStack);
};

//##############################################
// SQUARE
//##############################################
App.operation.draws.square = function (object) {

  mat4.identity(object.mvMatrix);
  world.mvPushMatrix(object.mvMatrix, world.mvMatrixStack);

  if (App.camera.FirstPersonController == true) {
    camera.setCamera(object);
  }

  mat4.translate(object.mvMatrix, object.mvMatrix, object.position.worldLocation);
  mat4.rotate(object.mvMatrix, object.mvMatrix, degToRad(object.rotation.rx), object.rotation.getRotDirX());
  mat4.rotate(object.mvMatrix, object.mvMatrix, degToRad(object.rotation.ry), object.rotation.getRotDirY());
  mat4.rotate(object.mvMatrix, object.mvMatrix, degToRad(object.rotation.rz), object.rotation.getRotDirZ());

  if (object.geometry.dynamicBuffer == true) {

    world.GL.gl.bindBuffer(world.GL.gl.ARRAY_BUFFER, object.vertexPositionBuffer);
    world.GL.gl.bufferData(world.GL.gl.ARRAY_BUFFER, object.geometry.vertices, world.GL.gl.STATIC_DRAW);

  } else {

    world.GL.gl.bindBuffer(world.GL.gl.ARRAY_BUFFER, object.vertexPositionBuffer); //ori without if dynamicBuffer

  }

  world.GL.gl.vertexAttribPointer(object.shaderProgram.vertexPositionAttribute, object.vertexPositionBuffer.itemSize, world.GL.gl.FLOAT, false, 0, 0);

  world.GL.gl.bindBuffer(world.GL.gl.ARRAY_BUFFER, object.vertexColorBuffer);
  world.GL.gl.vertexAttribPointer(object.shaderProgram.vertexColorAttribute, object.vertexColorBuffer.itemSize, world.GL.gl.FLOAT, false, 0, 0);

  if (object.glBlend.blendEnabled == true) {
    if (!world.GL.gl.isEnabled(world.GL.gl.BLEND)) {

      // world.GL.gl.disable(world.GL.gl.DEPTH_TEST);
      world.GL.gl.enable(world.GL.gl.BLEND);

    }
    //world.GL.gl.blendColor ( 1,1,1,0.5)
    // world.GL.gl.blendColor( 1.0 , 1.0, 1.0, 0.3 );
    world.GL.gl.blendFunc(world.GL.gl[object.glBlend.blendParamSrc], world.GL.gl[object.glBlend.blendParamDest]);

  } else {
    world.GL.gl.disable(world.GL.gl.BLEND);
    world.GL.gl.enable(world.GL.gl.DEPTH_TEST);
  }

  world.setMatrixUniforms(object, this.pMatrix, object.mvMatrix);
  //world.GL.gl.drawArrays(world.GL.gl.TRIANGLES, 0, object.vertexPositionBuffer.numItems);
  world.GL.gl.drawArrays(world.GL.gl[object.glDrawElements.mode], 0, object.vertexPositionBuffer.numItems);

  object.instancedDraws.overrideDrawArraysInstance(object);

  this.mvPopMatrix(object.mvMatrix, this.mvMatrixStack);
};

//##############################################
// TRIANGLE
//##############################################
App.operation.draws.triangle = function (object) {

  mat4.identity(object.mvMatrix);
  world.mvPushMatrix(object.mvMatrix, this.mvMatrixStack);

  if (App.camera.FirstPersonController == true) {
    camera.setCamera(object);
  }

  mat4.translate(object.mvMatrix, object.mvMatrix, object.position.worldLocation);
  mat4.rotate(object.mvMatrix, object.mvMatrix, degToRad(object.rotation.rx), object.rotation.getRotDirX());
  mat4.rotate(object.mvMatrix, object.mvMatrix, degToRad(object.rotation.ry), object.rotation.getRotDirY());
  mat4.rotate(object.mvMatrix, object.mvMatrix, degToRad(object.rotation.rz), object.rotation.getRotDirZ());

  world.GL.gl.bindBuffer(world.GL.gl.ARRAY_BUFFER, object.vertexPositionBuffer);
  world.GL.gl.vertexAttribPointer(object.shaderProgram.vertexPositionAttribute, object.vertexPositionBuffer.itemSize, world.GL.gl.FLOAT, false, 0, 0);

  if (object.geometry.dynamicBuffer == true) {
    world.GL.gl.bufferData(world.GL.gl.ARRAY_BUFFER, object.geometry.vertices, world.GL.gl.STATIC_DRAW);
  }

  world.GL.gl.bindBuffer(world.GL.gl.ARRAY_BUFFER, object.vertexColorBuffer);
  world.GL.gl.vertexAttribPointer(object.shaderProgram.vertexColorAttribute, object.vertexColorBuffer.itemSize, world.GL.gl.FLOAT, false, 0, 0);

  if (object.glBlend.blendEnabled == true) {
    if (!world.GL.gl.isEnabled(world.GL.gl.BLEND)) {

      // world.GL.gl.disable(world.GL.gl.DEPTH_TEST);
      world.GL.gl.enable(world.GL.gl.BLEND);

    }
    //world.GL.gl.blendColor ( 1,1,1,0.5)
    // world.GL.gl.blendColor( 1.0 , 1.0, 1.0, 0.3 );
    world.GL.gl.blendFunc(world.GL.gl[object.glBlend.blendParamSrc], world.GL.gl[object.glBlend.blendParamDest]);

  } else {
    world.GL.gl.disable(world.GL.gl.BLEND);
    world.GL.gl.enable(world.GL.gl.DEPTH_TEST);
  }

  this.setMatrixUniforms(object, this.pMatrix, object.mvMatrix);

  // world.GL.gl.drawArrays(world.GL.gl.TRIANGLES, 0, object.vertexPositionBuffer.numItems);
  world.GL.gl.drawArrays(world.GL.gl[object.glDrawElements.mode], 0, object.vertexPositionBuffer.numItems);

  object.instancedDraws.overrideDrawArraysInstance(object);

  this.mvPopMatrix(object.mvMatrix, this.mvMatrixStack);
};

//##############################################
// OBJ MESH
//##############################################
App.operation.draws.drawObj = function (object) {

  var lighting = 1;
  // eslint-disable-next-line no-unused-vars
  var localLooper = 0;
  // if (true) {
  lighting = true;
  // }

  mat4.identity(object.mvMatrix);
  world.mvPushMatrix(object.mvMatrix, this.mvMatrixStack);

  
  if (App.camera.FirstPersonController == true) {
    camera.setCamera(object);
  }
  
  mat4.translate(object.mvMatrix, object.mvMatrix, object.position.worldLocation);
  mat4.rotate(object.mvMatrix, object.mvMatrix, degToRad(object.rotation.rx), object.rotation.getRotDirX());
  mat4.rotate(object.mvMatrix, object.mvMatrix, degToRad(object.rotation.ry), object.rotation.getRotDirY());
  mat4.rotate(object.mvMatrix, object.mvMatrix, degToRad(object.rotation.rz), object.rotation.getRotDirZ());

  if (typeof object.mesh.vertexBuffer != "undefined") {

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

        world.GL.gl.bindBuffer(world.GL.gl.ARRAY_BUFFER, object.mesh.vertexBuffer);
        world.GL.gl.vertexAttribPointer(object.shaderProgram.vertexPositionAttribute, object.mesh.vertexBuffer.itemSize, world.GL.gl.FLOAT, false, 0, 0);

      } else {

        world.GL.gl.bindBuffer(world.GL.gl.ARRAY_BUFFER, App.meshes[object.animation.id + object.animation.currentAni].vertexBuffer);
        world.GL.gl.vertexAttribPointer(object.shaderProgram.vertexPositionAttribute, object.mesh.vertexBuffer.itemSize, world.GL.gl.FLOAT, false, 0, 0);

      }

    } else {

      // now to render the mesh
      world.GL.gl.bindBuffer(world.GL.gl.ARRAY_BUFFER, object.mesh.vertexBuffer);
      world.GL.gl.vertexAttribPointer(object.shaderProgram.vertexPositionAttribute, object.mesh.vertexBuffer.itemSize, world.GL.gl.FLOAT, false, 0, 0);

    }

  }

  
  //COLOR BUFFER
  
  /* if (object.vertexColorBuffer) {
      world.GL.gl.bindBuffer( world.GL.gl.ARRAY_BUFFER, object.vertexColorBuffer);
      world.GL.gl.vertexAttribPointer(object.shaderProgram.vertexColorAttribute, object.vertexColorBuffer.itemSize,  world.GL.gl.FLOAT, false, 0, 0);
      world.GL.gl.enableVertexAttribArray(object.shaderProgram.vertexColorAttribute);
      localLooper = localLooper + 1;
    }
  */
  
  //LIGHT STAFF
  
  if (lighting && object.shaderProgram.useLightingUniform) {

    world.GL.gl.uniform1i(object.shaderProgram.useLightingUniform, lighting);

    /* Set the normals                       */
    if (object.mesh.normalBuffer) {
      world.GL.gl.bindBuffer(world.GL.gl.ARRAY_BUFFER, object.mesh.normalBuffer);
      world.GL.gl.vertexAttribPointer(object.shaderProgram.vertexNormalAttribute, object.mesh.normalBuffer.itemSize, world.GL.gl.FLOAT, false, 0, 0);
      world.GL.gl.enableVertexAttribArray(object.shaderProgram.vertexNormalAttribute);
      localLooper = localLooper + 1;
    }

    /* Set the ambient light                 */
    if (object.shaderProgram.ambientColorUniform) {
      if (document.getElementById("ambLight") && document.getElementById("ambLight").color) {
        world.GL.gl.uniform3f(object.shaderProgram.ambientColorUniform,
          parseFloat(document.getElementById("ambLight").color.rgb[0]),
          parseFloat(document.getElementById("ambLight").color.rgb[1]),
          parseFloat(document.getElementById("ambLight").color.rgb[2]));
      } else {
        world.GL.gl.uniform3f(object.shaderProgram.ambientColorUniform, object.LightsData.ambientLight.R(), object.LightsData.ambientLight.G(), object.LightsData.ambientLight.B());
      }
    }

    /* Set the directional light             */
    if (object.shaderProgram.directionalColorUniform) {
      if (document.getElementById("dirLight") && document.getElementById("dirLight").color) {
        world.GL.gl.uniform3f(object.shaderProgram.directionalColorUniform,
          parseFloat(document.getElementById("dirLight").color.rgb[0]),
          parseFloat(document.getElementById("dirLight").color.rgb[1]),
          parseFloat(document.getElementById("dirLight").color.rgb[2]));
      } else {
        world.GL.gl.uniform3f(object.shaderProgram.directionalColorUniform, object.LightsData.directionLight.R(), object.LightsData.directionLight.G(), object.LightsData.directionLight.B());
      }
    }

    /* Normalize the direction               */
    var lightingDirection = null;
    if (object.shaderProgram.lightingDirectionUniform) {
      if (document.getElementById("dirX") && document.getElementById("dirY") && document.getElementById("dirZ")) {
        lightingDirection = [
          parseFloat(document.getElementById("dirX").value),
          parseFloat(document.getElementById("dirY").value),
          parseFloat(document.getElementById("dirZ").value)
        ];
      } else {
        lightingDirection = [object.LightsData.lightingDirection.r, object.LightsData.lightingDirection.g, object.LightsData.lightingDirection.b];
      }

      var adjustedLD = vec3.create();
      vec3.normalize(adjustedLD, lightingDirection);
      vec3.scale(adjustedLD, adjustedLD, -1);
      world.GL.gl.uniform3fv(object.shaderProgram.lightingDirectionUniform, adjustedLD);
    }
  } else {
    if (object.shaderProgram.useLightingUniform) {
      if (object.shaderProgram.ambientColorUniform) {
        world.GL.gl.uniform3f(object.shaderProgram.ambientColorUniform, parseFloat(1), parseFloat(2), parseFloat(0));
      }
      if (object.shaderProgram.directionalColorUniform) {
        world.GL.gl.uniform3f(object.shaderProgram.directionalColorUniform, parseFloat(1), parseFloat(1), parseFloat(0));
      }
    }
  }

  // it's possible that the mesh doesn't contain
  // any texture coordinates
  // in this case, the texture vertexAttribArray will need to be disabled
  // before the call to drawElements
  if (!object.mesh.textures.length && !object.texture) {
    //  world.GL.gl.disableVertexAttribArray(object.shaderProgram.textureCoordAttribute);
  } else {
    // if the texture vertexAttribArray has been previously
    // disabled, then it needs to be re-enabled
    if (object.texture) {

      world.GL.gl.bindBuffer(world.GL.gl.ARRAY_BUFFER, object.mesh.textureBuffer);
      world.GL.gl.enableVertexAttribArray(object.shaderProgram.textureCoordAttribute);
      world.GL.gl.vertexAttribPointer(object.shaderProgram.textureCoordAttribute, object.mesh.textureBuffer.itemSize, world.GL.gl.FLOAT, false, 0, 0);
      //ori world.GL.gl.activeTexture(world.GL.gl.TEXTURE0);
      // ori world.GL.gl.bindTexture(world.GL.gl.TEXTURE_2D, object.texture);

      if (object.streamTextures != null) {

        // video webcam textures
        App.tools.loadVideoTexture("glVideoTexture", object.streamTextures.videoImage);
        world.GL.gl.uniform1i(object.shaderProgram.samplerUniform, 0);

      } else {

        for (var t = 0; t < object.textures.length; t++) {

          world.GL.gl.activeTexture(world.GL.gl["TEXTURE" + t]);
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

  //normals
  //  world.GL.gl.bindBuffer(world.GL.gl.ARRAY_BUFFER, object.mesh.normalBuffer);
  //  world.GL.gl.vertexAttribPointer(object.shaderProgram.vertexNormalAttribute, object.mesh.normalBuffer.itemSize, world.GL.gl.FLOAT, false, 0, 0);

  world.GL.gl.bindBuffer(world.GL.gl.ELEMENT_ARRAY_BUFFER, object.mesh.indexBuffer);

  if (object.glBlend.blendEnabled == true) {
    if (!world.GL.gl.isEnabled(world.GL.gl.BLEND)) {

      // world.GL.gl.disable(world.GL.gl.DEPTH_TEST);
      world.GL.gl.enable(world.GL.gl.BLEND);

    }
    world.GL.gl.blendFunc(world.GL.gl[object.glBlend.blendParamSrc], world.GL.gl[object.glBlend.blendParamDest]);
  } else {
    world.GL.gl.disable(world.GL.gl.BLEND);
    world.GL.gl.enable(world.GL.gl.DEPTH_TEST);
  }

  this.setMatrixUniforms(object, this.pMatrix, object.mvMatrix);
  world.disableUnusedAttr(world.GL.gl, 3);
  //'POINTS' , 'LINE_STRIP', 'LINE_LOOP', 'LINES', 'TRIANGLE_STRIP', 'TRIANGLE_FAN' , 'TRIANGLES'
  world.GL.gl.drawElements(world.GL.gl[object.glDrawElements.mode], object.glDrawElements.numberOfIndicesRender, world.GL.gl.UNSIGNED_SHORT, 0);

  this.mvPopMatrix(object.mvMatrix, this.mvMatrixStack);

};

//##############################################
// SQUARE
//##############################################
App.operation.draws.drawSquareTex = function (object) {

  var lighting = 1;
  // eslint-disable-next-line no-unused-vars
  var localLooper = 0;
  // if (true) {
  lighting = true;
  // }

  
  mat4.identity(object.mvMatrix);
  this.mvPushMatrix(object.mvMatrix, this.mvMatrixStack);

  
  if (App.camera.FirstPersonController == true) {
    camera.setCamera(object);
  }
  

  mat4.translate(object.mvMatrix, object.mvMatrix, object.position.worldLocation);
  mat4.rotate(object.mvMatrix, object.mvMatrix, degToRad(object.rotation.rx), object.rotation.getRotDirX());
  mat4.rotate(object.mvMatrix, object.mvMatrix, degToRad(object.rotation.ry), object.rotation.getRotDirY());
  mat4.rotate(object.mvMatrix, object.mvMatrix, degToRad(object.rotation.rz), object.rotation.getRotDirZ());

  
  //VERTEX BUFFER
  
  if (object.vertexPositionBuffer) {
    world.GL.gl.bindBuffer(world.GL.gl.ARRAY_BUFFER, object.vertexPositionBuffer);

    if (object.geometry.dynamicBuffer == true) {

      world.GL.gl.bufferData(world.GL.gl.ARRAY_BUFFER, object.geometry.vertices, world.GL.gl.STATIC_DRAW);

    }

    world.GL.gl.vertexAttribPointer(object.shaderProgram.vertexPositionAttribute, object.vertexPositionBuffer.itemSize, world.GL.gl.FLOAT, false, 0, 0);
    world.GL.gl.enableVertexAttribArray(object.shaderProgram.vertexPositionAttribute);
    localLooper = localLooper + 1;
  }
  
  //COLOR BUFFER
  
  if (object.vertexColorBuffer) {
    world.GL.gl.bindBuffer(world.GL.gl.ARRAY_BUFFER, object.vertexColorBuffer);
    world.GL.gl.vertexAttribPointer(object.shaderProgram.vertexColorAttribute, object.vertexColorBuffer.itemSize, world.GL.gl.FLOAT, false, 0, 0);
    world.GL.gl.enableVertexAttribArray(object.shaderProgram.vertexColorAttribute);
    localLooper = localLooper + 1;
  }
  
  //LIGHT STAFF
  
  if (lighting && object.shaderProgram.useLightingUniform) {

    world.GL.gl.uniform1i(object.shaderProgram.useLightingUniform, lighting);

    /* Set the normals                       */
    if (object.vertexNormalBuffer) {
      world.GL.gl.bindBuffer(world.GL.gl.ARRAY_BUFFER, object.vertexNormalBuffer);
      world.GL.gl.vertexAttribPointer(object.shaderProgram.vertexNormalAttribute, object.vertexNormalBuffer.itemSize, world.GL.gl.FLOAT, false, 0, 0);
      world.GL.gl.enableVertexAttribArray(object.shaderProgram.vertexNormalAttribute);
      localLooper = localLooper + 1;
    }

    /* Set the ambient light                 */
    if (object.shaderProgram.ambientColorUniform) {
      if (document.getElementById("ambLight") && document.getElementById("ambLight").color) {
        world.GL.gl.uniform3f(object.shaderProgram.ambientColorUniform,
          parseFloat(document.getElementById("ambLight").color.rgb[0]),
          parseFloat(document.getElementById("ambLight").color.rgb[1]),
          parseFloat(document.getElementById("ambLight").color.rgb[2]));
      } else {
        world.GL.gl.uniform3f(object.shaderProgram.ambientColorUniform, object.LightsData.ambientLight.r, object.LightsData.ambientLight.g, object.LightsData.ambientLight.b);
      }
    }

    /* Set the directional light             */
    if (object.shaderProgram.directionalColorUniform) {
      if (document.getElementById("dirLight") && document.getElementById("dirLight").color) {
        world.GL.gl.uniform3f(object.shaderProgram.directionalColorUniform,
          parseFloat(document.getElementById("dirLight").color.rgb[0]),
          parseFloat(document.getElementById("dirLight").color.rgb[1]),
          parseFloat(document.getElementById("dirLight").color.rgb[2]));
      } else {
        world.GL.gl.uniform3f(object.shaderProgram.directionalColorUniform, object.LightsData.directionLight.R(), object.LightsData.directionLight.G(), object.LightsData.directionLight.B());
      }
    }

    /* Normalize the direction               */
    var lightingDirection = null;
    if (object.shaderProgram.lightingDirectionUniform) {
      if (document.getElementById("dirX") && document.getElementById("dirY") && document.getElementById("dirZ")) {
        lightingDirection = [
          parseFloat(document.getElementById("dirX").value),
          parseFloat(document.getElementById("dirY").value),
          parseFloat(document.getElementById("dirZ").value)
        ];
      } else {
        lightingDirection = [object.LightsData.lightingDirection.r, object.LightsData.lightingDirection.g, object.LightsData.lightingDirection.b];
      }

      var adjustedLD = vec3.create();
      vec3.normalize(adjustedLD, lightingDirection);
      vec3.scale(adjustedLD, adjustedLD, -1);
      world.GL.gl.uniform3fv(object.shaderProgram.lightingDirectionUniform, adjustedLD);
    }
  } else {
    if (object.shaderProgram.useLightingUniform) {
      if (object.shaderProgram.ambientColorUniform) {
        world.GL.gl.uniform3f(object.shaderProgram.ambientColorUniform, parseFloat(1), parseFloat(2), parseFloat(0));
      }
      if (object.shaderProgram.directionalColorUniform) {
        world.GL.gl.uniform3f(object.shaderProgram.directionalColorUniform, parseFloat(1), parseFloat(0), parseFloat(0));
      }
    }
  }

  // TEX
  if (object.vertexTexCoordBuffer) {

    world.GL.gl.bindBuffer(world.GL.gl.ARRAY_BUFFER, object.vertexTexCoordBuffer);

    if (object.geometry.dynamicBuffer == true) {

      world.GL.gl.bufferData(world.GL.gl.ARRAY_BUFFER, object.geometry.texCoords, world.GL.gl.STATIC_DRAW);

    }

    world.GL.gl.vertexAttribPointer(object.shaderProgram.textureCoordAttribute, object.vertexTexCoordBuffer.itemSize, world.GL.gl.FLOAT, false, 0, 0);
    world.GL.gl.enableVertexAttribArray(object.shaderProgram.textureCoordAttribute);

    if (object.streamTextures != null) {

      // video webcam textures
      App.tools.loadVideoTexture("glVideoTexture", object.streamTextures.videoImage);
      world.GL.gl.uniform1i(object.shaderProgram.samplerUniform, 0);

    } else {

      for (var t = 0; t < object.textures.length; t++) {

        if (object.custom.gl_texture == null) {
          world.GL.gl.activeTexture(world.GL.gl["TEXTURE" + t]);
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

          // ori world.GL.gl.uniform1i(object.shaderProgram.samplerUniform, t);
          var nothing = world.GL.gl.uniform1i(object.shaderProgram["samplerUniform" + t], t);
        } else {

          object.custom.gl_texture(object, t);

        }

      }

    }

    localLooper = localLooper + 1;

  }

  world.GL.gl.bindBuffer(world.GL.gl.ELEMENT_ARRAY_BUFFER, object.vertexIndexBuffer);
  world.setMatrixUniforms(object, this.pMatrix, object.mvMatrix);

  if (object.vertexNormalBuffer && object.shaderProgram.nMatrixUniform) {
    var normalMatrix = mat3.create();
    mat3.normalFromMat4(normalMatrix, object.mvMatrix);
    mat3.transpose(normalMatrix, normalMatrix);
    world.GL.gl.uniformMatrix3fv(object.shaderProgram.nMatrixUniform, false, normalMatrix);
  }

  // world.disableUnusedAttr( world.GL.gl, localLooper);
  world.disableUnusedAttr(world.GL.gl, 4);

  if (object.glBlend.blendEnabled == true) {
    if (!world.GL.gl.isEnabled(world.GL.gl.BLEND)) {

      // world.GL.gl.disable(world.GL.gl.DEPTH_TEST);
      world.GL.gl.enable(world.GL.gl.BLEND);

    }
    try {
      world.GL.gl.blendFunc(world.GL.gl[object.glBlend.blendParamSrc], world.GL.gl[object.glBlend.blendParamDest]);
    } catch (e) {
      console.log(e);
    }
  } else {
    world.GL.gl.disable(world.GL.gl.BLEND);
    world.GL.gl.enable(world.GL.gl.DEPTH_TEST);
  }

  //world.GL.gl.drawElements( world.GL.gl.TRIANGLES, object.vertexIndexBuffer.numItems,  world.GL.gl.UNSIGNED_SHORT, 0);
  world.GL.gl.drawElements(world.GL.gl[object.glDrawElements.mode], object.glDrawElements.numberOfIndicesRender, world.GL.gl.UNSIGNED_SHORT, 0);
  
  object.instancedDraws.overrideDrawArraysInstance(object);

  this.mvPopMatrix(object.mvMatrix, this.mvMatrixStack);

};

//##############################################
// sphere
//##############################################
App.operation.draws.sphere = function (object) {

  var lighting = 1;
  var localLooper = 0;
  // if (true) {
  lighting = true;
  // }

  
  mat4.identity(object.mvMatrix);
  this.mvPushMatrix(object.mvMatrix, this.mvMatrixStack);

  
  if (App.camera.FirstPersonController == true) {
    camera.setCamera(object);
  }

  
  mat4.translate(object.mvMatrix, object.mvMatrix, object.position.worldLocation);
  mat4.rotate(object.mvMatrix, object.mvMatrix, degToRad(object.rotation.rx), object.rotation.getRotDirX());
  mat4.rotate(object.mvMatrix, object.mvMatrix, degToRad(object.rotation.ry), object.rotation.getRotDirY());
  mat4.rotate(object.mvMatrix, object.mvMatrix, degToRad(object.rotation.rz), object.rotation.getRotDirZ());

  
  //VERTEX BUFFER
  
  if (object.vertexPositionBuffer) {
    world.GL.gl.bindBuffer(world.GL.gl.ARRAY_BUFFER, object.vertexPositionBuffer);

    if (object.geometry.dynamicBuffer == true) {

      world.GL.gl.bufferData(world.GL.gl.ARRAY_BUFFER, object.geometry.vertices, world.GL.gl.STATIC_DRAW);

    }

    world.GL.gl.vertexAttribPointer(object.shaderProgram.vertexPositionAttribute, object.vertexPositionBuffer.itemSize, world.GL.gl.FLOAT, false, 0, 0);
    world.GL.gl.enableVertexAttribArray(object.shaderProgram.vertexPositionAttribute);
    localLooper = localLooper + 1;
  }
  
  //COLOR BUFFER
  
  if (object.vertexColorBuffer) {
    world.GL.gl.bindBuffer(world.GL.gl.ARRAY_BUFFER, object.vertexColorBuffer);
    world.GL.gl.vertexAttribPointer(object.shaderProgram.vertexColorAttribute, object.vertexColorBuffer.itemSize, world.GL.gl.FLOAT, false, 0, 0);
    world.GL.gl.enableVertexAttribArray(object.shaderProgram.vertexColorAttribute);
    localLooper = localLooper + 1;
  }
  
  //LIGHT STAFF
  
  if (lighting && object.shaderProgram.useLightingUniform) {

    world.GL.gl.uniform1i(object.shaderProgram.useLightingUniform, lighting);

    /* Set the normals                       */
    if (object.vertexNormalBuffer) {
      world.GL.gl.bindBuffer(world.GL.gl.ARRAY_BUFFER, object.vertexNormalBuffer);
      world.GL.gl.vertexAttribPointer(object.shaderProgram.vertexNormalAttribute, object.vertexNormalBuffer.itemSize, world.GL.gl.FLOAT, false, 0, 0);
      world.GL.gl.enableVertexAttribArray(object.shaderProgram.vertexNormalAttribute);
      localLooper = localLooper + 1;
    }

    /* Set the ambient light                 */
    if (object.shaderProgram.ambientColorUniform) {
      if (document.getElementById("ambLight") && document.getElementById("ambLight").color) {
        world.GL.gl.uniform3f(object.shaderProgram.ambientColorUniform,
          parseFloat(document.getElementById("ambLight").color.rgb[0]),
          parseFloat(document.getElementById("ambLight").color.rgb[1]),
          parseFloat(document.getElementById("ambLight").color.rgb[2]));
      } else { //object.LightsData.ambientLight
        world.GL.gl.uniform3f(object.shaderProgram.ambientColorUniform, object.LightsData.ambientLight.r, object.LightsData.ambientLight.g, object.LightsData.ambientLight.b);
      }
    }

    /* Set the directional light             */
    if (object.shaderProgram.directionalColorUniform) {
      if (document.getElementById("dirLight") && document.getElementById("dirLight").color) {
        world.GL.gl.uniform3f(object.shaderProgram.directionalColorUniform,
          parseFloat(document.getElementById("dirLight").color.rgb[0]),
          parseFloat(document.getElementById("dirLight").color.rgb[1]),
          parseFloat(document.getElementById("dirLight").color.rgb[2]));
      } else {

        //object.LightsData.lightingDirection
        world.GL.gl.uniform3f(object.shaderProgram.directionalColorUniform, object.LightsData.directionLight.R(), object.LightsData.directionLight.G(), object.LightsData.directionLight.B());

      }
    }

    /* Normalize the direction               */
    var lightingDirection = null;
    if (object.shaderProgram.lightingDirectionUniform) {
      if (document.getElementById("dirX") && document.getElementById("dirY") && document.getElementById("dirZ")) {
        lightingDirection = [
          parseFloat(document.getElementById("dirX").value),
          parseFloat(document.getElementById("dirY").value),
          parseFloat(document.getElementById("dirZ").value)
        ];
      } else {
        lightingDirection = [object.LightsData.lightingDirection.r, object.LightsData.lightingDirection.g, object.LightsData.lightingDirection.b];
      }

      var adjustedLD = vec3.create();
      vec3.normalize(adjustedLD, lightingDirection);
      vec3.scale(adjustedLD, adjustedLD, -1);
      world.GL.gl.uniform3fv(object.shaderProgram.lightingDirectionUniform, adjustedLD);
    }
  } else {
    if (object.shaderProgram.useLightingUniform) {
      if (object.shaderProgram.ambientColorUniform) {
        world.GL.gl.uniform3f(object.shaderProgram.ambientColorUniform, parseFloat(0.2), parseFloat(0.2), parseFloat(0.2));
      }
      if (object.shaderProgram.directionalColorUniform) {
        world.GL.gl.uniform3f(object.shaderProgram.directionalColorUniform, parseFloat(1), parseFloat(0), parseFloat(0));
      }
    }
  }

  //TEXTURES
  if (object.vertexTexCoordBuffer) {
    world.GL.gl.bindBuffer(world.GL.gl.ARRAY_BUFFER, object.vertexTexCoordBuffer);

    if (object.geometry.dynamicBuffer == true) {
      world.GL.gl.bufferData(world.GL.gl.ARRAY_BUFFER, object.geometry.texCoords, world.GL.gl.STATIC_DRAW);
    }

    world.GL.gl.vertexAttribPointer(object.shaderProgram.textureCoordAttribute, object.vertexTexCoordBuffer.itemSize, world.GL.gl.FLOAT, false, 0, 0);
    world.GL.gl.enableVertexAttribArray(object.shaderProgram.textureCoordAttribute);

    if (object.streamTextures != null) {
      // video webcam textures
      App.tools.loadVideoTexture("glVideoTexture", object.streamTextures.videoImage);
      world.GL.gl.uniform1i(object.shaderProgram.samplerUniform, 0);
    } else {
      for (var t = 0; t < object.textures.length; t++) {
        world.GL.gl.activeTexture(world.GL.gl["TEXTURE" + t]);
        world.GL.gl.bindTexture(world.GL.gl.TEXTURE_2D, object.textures[t]);
        world.GL.gl.pixelStorei(world.GL.gl.UNPACK_FLIP_Y_WEBGL, false);
        world.GL.gl.texParameteri(world.GL.gl.TEXTURE_2D, world.GL.gl.TEXTURE_MAG_FILTER, world.GL.gl.LINEAR);
        world.GL.gl.texParameteri(world.GL.gl.TEXTURE_2D, world.GL.gl.TEXTURE_MIN_FILTER, world.GL.gl.LINEAR);
        world.GL.gl.texParameteri(world.GL.gl.TEXTURE_2D, world.GL.gl.TEXTURE_WRAP_S, world.GL.gl.CLAMP_TO_EDGE);
        world.GL.gl.texParameteri(world.GL.gl.TEXTURE_2D, world.GL.gl.TEXTURE_WRAP_T, world.GL.gl.CLAMP_TO_EDGE);
        // -- Allocate storage for the texture
        //world.GL.gl.texStorage2D(world.GL.gl.TEXTURE_2D, 1, world.GL.gl.RGB8, 512, 512);
        //world.GL.gl.texSubImage2D(world.GL.gl.TEXTURE_2D, 0, 0, 0, world.GL.gl.RGB, world.GL.gl.UNSIGNED_BYTE, image);
        //world.GL.gl.generateMipmap(world.GL.gl.TEXTURE_2D);
        world.GL.gl.uniform1i(object.shaderProgram.samplerUniform, t);

      }

    }

    localLooper = localLooper + 1;

  }

  world.GL.gl.bindBuffer(world.GL.gl.ELEMENT_ARRAY_BUFFER, object.vertexIndexBuffer);
  // world.setMatrixUniforms(object,this.pMatrix,object.mvMatrix);

  if (object.vertexNormalBuffer && object.shaderProgram.nMatrixUniform) {
    var normalMatrix = mat3.create();
    mat3.normalFromMat4(normalMatrix, object.mvMatrix);
    mat3.transpose(normalMatrix, normalMatrix);
    world.GL.gl.uniformMatrix3fv(object.shaderProgram.nMatrixUniform, false, normalMatrix);
  }

  try {
    world.GL.gl.useProgram(object.shaderProgram);
    world.GL.gl.uniform1i(object.shaderProgram.uniformTime, 0.1);
  } catch (e) {
    console.warn("WTF - ERROR10001");
  }

  world.disableUnusedAttr(world.GL.gl, localLooper);
  //world.disableUnusedAttr( world.GL.gl, 3 );

  if (object.glBlend.blendEnabled == true) {
    if (!world.GL.gl.isEnabled(world.GL.gl.BLEND)) {

      // world.GL.gl.disable(world.GL.gl.DEPTH_TEST);
      world.GL.gl.enable(world.GL.gl.BLEND);

    }
    world.GL.gl.blendFunc(world.GL.gl[object.glBlend.blendParamSrc], world.GL.gl[object.glBlend.blendParamDest]);
  } else {
    world.GL.gl.disable(world.GL.gl.BLEND);
    world.GL.gl.enable(world.GL.gl.DEPTH_TEST);
  }

  world.setMatrixUniforms(object, this.pMatrix, object.mvMatrix);

  //world.GL.gl.drawElements( world.GL.gl.TRIANGLES, object.vertexIndexBuffer.numItems,  world.GL.gl.UNSIGNED_SHORT, 0);
  world.GL.gl.drawElements(world.GL.gl[object.glDrawElements.mode], object.glDrawElements.numberOfIndicesRender, world.GL.gl.UNSIGNED_SHORT, 0);

  object.instancedDraws.overrideDrawArraysInstance(object);

  this.mvPopMatrix(object.mvMatrix, this.mvMatrixStack);

};

var drawsOperation = App.operation.draws;

export default drawsOperation;
