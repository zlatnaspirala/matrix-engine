/**
 * @description
 * Optimisation for custom FShaders parts
 * Open source shaders
 * #pragma vscode_glsllint_stage : STAGE
 */
import {defineShader, raycaster} from '../..';
import {world} from '../matrix-world';
import {E} from '../utility';
// var now = 0, then1 = 0, time1 = 0;

export function toyShaderHeader() {
  return `#version 300 es
  precision highp float;
  // Standard matrix-engine params
  in vec2 vTextureCoord;
  in vec3 vLightWeighting;
  uniform sampler2D uSampler;

  uniform vec2 iResolution;
  uniform float iTime;
  uniform float iTimeDelta;
  uniform int iFrame;
  uniform vec3 iMouse;

  out vec4 outColor;
  `;
}

export function toyShader1() {
  return `precision highp float;
  // Standard matrix-engine params
  varying vec2 vTextureCoord;
  varying vec3 vLightWeighting;
  uniform sampler2D uSampler;

  uniform vec2 iResolution;
  uniform float iTime;
  uniform float iTimeDelta;
  uniform float iFrame;
  // uniform float iChannelTime[4];
  uniform vec2 iMouse;
  // uniform vec4 iDate;
  // uniform float iSampleRate;
  // uniform vec3 iChannelResolution[4];
  // uniform float iChanneli;

  uniform sampler2D uSampler;          // input channel. XX = 2D/Cube;
  uniform sampler2D iChannel1;          // input channel. XX = 2D/Cube;
  uniform sampler2D iChannel2;          // input channel. XX = 2D/Cube;
  // we need to declare an output for the fragment shader
  // out vec4 outColor;
  `;
}

export var standardMEShaderDrawer = (object) => {
  // Create a vertex array object (attribute state)
  // var world = matrixWorld.world;
  var lighting = true;
  var localLooper = 0;
  mat4.identity(object.mvMatrix);
  world.mvPushMatrix(object.mvMatrix, world.mvMatrixStack);
  if(object.isHUD === true) {
    mat4.translate(object.mvMatrix, object.mvMatrix, object.position.worldLocation);
    if(raycaster.checkingProcedureCalc) raycaster.checkingProcedureCalc(object);
  } else {
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
            world.GL.gl.texParameterf(world.GL.gl.TEXTURE_2D, world.GL.extTFAnisotropic.TEXTURE_MAX_ANISOTROPY_EXT, world.GL.MAX_TEXTURE_MAX_ANISOTROPY_EXT);
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
  if((object.shadows && object.shadows.type == 'spot') || (object.shadows && object.shadows.type == 'spot-shadow')) {
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

  if(typeof object.addExtraDrawCode != 'undefined') object.addExtraDrawCode(world, object);
  //
  world.GL.gl.drawElements(world.GL.gl[object.glDrawElements.mode], object.glDrawElements.numberOfIndicesRender, world.GL.gl.UNSIGNED_SHORT, 0);
  world.mvPopMatrix(object.mvMatrix, world.mvMatrixStack);
};

// Shaders from shadertoy web site.
// ONLY MIT or similar licensed scripts.
export var freeShadersToy = {};
freeShadersToy.shaderFractalAdvanced = () => {
  return `${toyShaderHeader()}
    // The MIT License
    // Copyright © 2020 Inigo Quilez
    // https://www.youtube.com/c/InigoQuilez
    // https://iquilezles.org/
    // Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions: The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software. THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
    
    // A simple way to prevent aliasing of cosine functions (the color
    // palette in this case is made of 8 layers) by attenuating them
    // when their oscillations become smaller than a pixel. Left is
    // direct use of cos(x), right is band-limited cos(x).
    //
    // Box-filtering of cos(x):
    //
    // (1/w)∫cos(t)dt with t ∈ (x-½w, x+½w)
    // = [sin(x+½w) - sin(x-½w)]/w
    // = cos(x)·sin(½w)/(½w)
    //
    // Can approximate smoothstep(2π,0,w) ≈ sin(w/2)/(w/2),
    // which you can also see as attenuating cos(x) when it 
    // oscilates more than once per pixel. More info:
    //
    // https://iquilezles.org/articles/bandlimiting
    //
    // Related Shader:
    //   https://www.shadertoy.com/view/WtScDt
    //   https://www.shadertoy.com/view/wtXfRH
    //   https://www.shadertoy.com/view/3tScWd
    
    
    // box-filted cos(x)
    vec3 fcos( in vec3 x )
    {
        vec3 w = fwidth(x);
      #if 1
        return cos(x) * sin(0.5*w)/(0.5*w);       // exact
      #else
        return cos(x) * smoothstep(6.2832,0.0,w); // approx
      #endif    
    }
    
    // pick raw cosine, or band-limited cosine
    bool  mode = false;
    vec3  mcos( vec3 x){return mode?cos(x):fcos(x);}
    
    // color palette, made of 8 cos functions
    // (see https://iquilezles.org/articles/palettes)
    vec3 getColor( in float t )
    {
        vec3 col = vec3(0.6,0.5,0.4);
        col += 0.14*mcos(6.2832*t*  1.0+vec3(0.0,0.5,0.6));
        col += 0.13*mcos(6.2832*t*  3.1+vec3(0.5,0.6,1.0));
        col += 0.12*mcos(6.2832*t*  5.1+vec3(0.1,0.7,1.1));
        col += 0.11*mcos(6.2832*t*  9.1+vec3(0.1,0.5,1.2));
        col += 0.10*mcos(6.2832*t* 17.1+vec3(0.0,0.3,0.9));
        col += 0.09*mcos(6.2832*t* 31.1+vec3(0.1,0.5,1.3));
        col += 0.08*mcos(6.2832*t* 65.1+vec3(0.1,0.5,1.3));
        col += 0.07*mcos(6.2832*t*131.1+vec3(0.3,0.2,0.8));
        return col;
    }
    
    void mainImage(out vec4 outColor, in vec2 fragCoord )
    {
        // coordiantes
      vec2 q = (2.0*fragCoord-iResolution.xy)/iResolution.y;
    
        // separation
        // float th = (iMouse.z>0.001) ? (2.0*iMouse.x-iResolution.x)/iResolution.y : 1.8*sin(iTime);
        float th = 1.8*sin(iTime);
        mode = (q.x<th);
        
        // deformation
        vec2 p = 2.0*q/dot(q,q);
    
        // animation
        p.xy += 0.05*iTime;
    
        // texture
        vec3 col = min(getColor(p.x),getColor(p.y));
    
        // vignetting
        col *= 1.5 - 0.2*length(q);
        
        // separation
        col *= smoothstep(0.005,0.010,abs(q.x-th));

        // palette
        if( q.y<-0.9 ) col = getColor( fragCoord.x/iResolution.x );
        outColor = vec4( col, 1.0 );
    }
    void main() {
      vec4 textureColor = texture(uSampler, vTextureCoord) * vec4(1,1,1,1);
      // mainImage(outColor, vTextureCoord);
      mainImage(outColor, gl_FragCoord.xy);
      outColor.rgb *= vec3(textureColor.rgb * vLightWeighting);
    }
  `;
};

freeShadersToy.shaderCircle = () => {
  return `${toyShaderHeader()}
  // The MIT License
  // Copyright © 2020 Inigo Quilez
  // Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated
  //  documentation files (the "Software"), to deal in the Software without restriction, including without limitation
  //  the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, 
  //  and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
  //  The above copyright notice and this permission notice shall be included in all copies or substantial portions
  //  of the Software. 
  // THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, 
  // INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
  // IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
  // WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE 
  // OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
  // Signed distance to a disk
  // List of some other 2D distances: 
  // https://www.shadertoy.com/playlist/MXdSRf
  // and iquilezles.org/articles/distfunctions2d
  
  float sdCircle( in vec2 p, in float r ) 
  {
      return length(p)-r;
  }

  void mainImage( out vec4 outColor, in vec2 fragCoord )
  {
    vec2 p = (2.0*fragCoord-iResolution.xy)/iResolution.y;
    vec2 m = (2.0*iMouse.xy-iResolution.xy)/iResolution.y;
  
    float d = sdCircle(p,0.5);
      
    // coloring
    vec3 col = (d>0.0) ? vec3(0.9,0.6,0.3) : vec3(0.65,0.85,1.0);
    col *= 1.0 - exp(-6.0*abs(d));
    col *= 0.8 + 0.2*cos(150.0*d);
    col = mix( col, vec3(1.0), 1.0-smoothstep(0.0,0.01,abs(d)) );
    if(iMouse.z>0.001) {
      d = sdCircle(m,0.5);
      col = mix(col, vec3(1.0,1.0,0.0), 1.0-smoothstep(0.0, 0.005, abs(length(p-m)-abs(d))-0.0025));
      col = mix(col, vec3(1.0,1.0,0.0), 1.0-smoothstep(0.0, 0.005, length(p-m)-0.015));
    }
    outColor = vec4(col,1.0);
  }

  void main() {
    vec4 textureColor = texture(uSampler, vTextureCoord) * vec4(1,1,1,1);
    // mainImage(outColor, vTextureCoord);
    mainImage(outColor, gl_FragCoord.xy);
    outColor.rgb *= vec3(textureColor.rgb * vLightWeighting);
  }
  `;
};

freeShadersToy.shaderSpiral = () => {
  return `${toyShaderHeader()}
  // The MIT License
  // Copyright © 2022 Inigo Quilez
  // Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions: The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software. THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
  // Distance to a logarithmic spiral. It's inexact, mostly
  // noticeable when the number of rotations is small.

  // List of some other 2D distances: https://www.shadertoy.com/playlist/MXdSRf
  //
  // and iquilezles.org/articles/distfunctions2d
  // w is the width / distance from center to tip
  // k is the number of rotations
  float sdSpiral( in vec2 p, float w, in float k )
  {
      // body
      const float kTau = 6.283185307;
      float r = length(p);
      float a = atan(p.y,p.x);
      float n = floor( 0.5/w + (log2(r/w)*k-a)/kTau );
      float ra = w*exp2((a+kTau*(min(n+0.0,0.0)-0.5))/k);
      float rb = w*exp2((a+kTau*(min(n+1.0,0.0)-0.5))/k);
      float d = min( abs(r-ra), abs(r-rb) );

      // tip
      return min( d, length(p+vec2(w,0.0)) );
  }

  void mainImage( out vec4 outColor, in vec2 fragCoord )
  {
      // normalized pixel coordinates
      vec2 p = (2.0*fragCoord-iResolution.xy)/iResolution.y;
      vec2 m = (2.0*iMouse.xy-iResolution.xy)/iResolution.y;
      float px = 2.0/iResolution.y;
      
      // recenter
      p -= vec2(0.2,-0.09);
      m -= vec2(0.2,-0.09);
      
      // animation
      float sw = 1.0;
      float sk = 1.0 + 10.0*(0.5-0.5*cos(iTime+1.5));
      
      // distance
      float d = sdSpiral(p, sw, sk);
      
      // coloring
      vec3 col = (d>0.0) ? vec3(0.9,0.6,0.3) : vec3(0.65,0.85,1.0);
      col *= 1.0 - exp(-7.0*abs(d));
      col *= 0.8 + 0.2*cos(160.0*abs(d));
      col = mix( col, vec3(1.0), 1.0-smoothstep(-px,px,abs(d)-0.005) );

      if( iMouse.z>0.001 )
      {
      d = sdSpiral(m, sw, sk);
      col = mix(col, vec3(1.0,1.0,0.0), 1.0-smoothstep(-px, px, abs(length(p-m)-abs(d))-0.005));
      col = mix(col, vec3(1.0,1.0,0.0), 1.0-smoothstep(-px, px, length(p-m)-0.015));
      }

      outColor = vec4(col, 1.0);
  }
  void main() {
    vec4 textureColor = texture(uSampler, vTextureCoord) * vec4(1,1,1,1);
    // mainImage(outColor, vTextureCoord);
    mainImage(outColor, gl_FragCoord.xy);
    outColor.rgb *= vec3(textureColor.rgb * vLightWeighting);
  }
  `;
};

freeShadersToy.shaderPalettes = () => {
  return `${toyShaderHeader()}
  // The MIT License
// https://www.youtube.com/c/InigoQuilez
// https://iquilezles.org/
// Copyright © 2015 Inigo Quilez
// Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions: The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software. THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

// A simple way to create color variation in a cheap way (yes, trigonometrics ARE cheap
// in the GPU, don't try to be smart and use a triangle wave instead).

// See https://iquilezles.org/articles/palettes for more information

vec3 pal( in float t, in vec3 a, in vec3 b, in vec3 c, in vec3 d )
{
    return a + b*cos( 6.28318*(c*t+d) );
}

void mainImage( out vec4 outColor, in vec2 fragCoord )
{
	vec2 p = fragCoord.xy / iResolution.xy;
    
    // animate
    p.x += 0.01*iTime;
    
    // compute colors
    vec3                col = pal( p.x, vec3(0.5,0.5,0.5),vec3(0.5,0.5,0.5),vec3(1.0,1.0,1.0),vec3(0.0,0.33,0.67) );
    if( p.y>(1.0/7.0) ) col = pal( p.x, vec3(0.5,0.5,0.5),vec3(0.5,0.5,0.5),vec3(1.0,1.0,1.0),vec3(0.0,0.10,0.20) );
    if( p.y>(2.0/7.0) ) col = pal( p.x, vec3(0.5,0.5,0.5),vec3(0.5,0.5,0.5),vec3(1.0,1.0,1.0),vec3(0.3,0.20,0.20) );
    if( p.y>(3.0/7.0) ) col = pal( p.x, vec3(0.5,0.5,0.5),vec3(0.5,0.5,0.5),vec3(1.0,1.0,0.5),vec3(0.8,0.90,0.30) );
    if( p.y>(4.0/7.0) ) col = pal( p.x, vec3(0.5,0.5,0.5),vec3(0.5,0.5,0.5),vec3(1.0,0.7,0.4),vec3(0.0,0.15,0.20) );
    if( p.y>(5.0/7.0) ) col = pal( p.x, vec3(0.5,0.5,0.5),vec3(0.5,0.5,0.5),vec3(2.0,1.0,0.0),vec3(0.5,0.20,0.25) );
    if( p.y>(6.0/7.0) ) col = pal( p.x, vec3(0.8,0.5,0.4),vec3(0.2,0.4,0.2),vec3(2.0,1.0,1.0),vec3(0.0,0.25,0.25) );
    

    // band
    float f = fract(p.y*7.0);
    // borders
    col *= smoothstep( 0.49, 0.47, abs(f-0.5) );
    // shadowing
    col *= 0.5 + 0.5*sqrt(4.0*f*(1.0-f));

    outColor = vec4( col, 1.0 );
}
void main() {
  vec4 textureColor = texture(uSampler, vTextureCoord) * vec4(1,1,1,1);
  // mainImage(outColor, vTextureCoord);
  mainImage(outColor, gl_FragCoord.xy);
  outColor.rgb *= vec3(textureColor.rgb * vLightWeighting);
}
  `
}
