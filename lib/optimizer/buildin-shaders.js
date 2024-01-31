
/**
 * @description
 * Optimisation for custom FShaders parts
 * GLSL 1.3 for now
 */

import {raycaster} from "../..";
import {world} from "../matrix-world";
import {E} from "../utility";
var now = 0, then1 = 0, time1 = 0;

export function toyShader() {
  return `#version 300 es
  precision highp float;
  // test mix
  in vec2 vTextureCoord;
  in vec3 vLightWeighting;
  uniform sampler2D uSampler;

  uniform vec2 iResolution;
  uniform float iTime;
  uniform float iTimeDelta;
  uniform int iFrame;
  // uniform float iChannelTime[4];
  uniform vec2 iMouse;
  // uniform vec4 iDate;
  // uniform float iSampleRate;
  // uniform vec3 iChannelResolution[4];
  // uniform sampler2D iChanneli;

  // we need to declare an output for the fragment shader
  out vec4 outColor;
  `;
};

export function toyShader1() {
  return `precision highp float;
  // test mix
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
};

export var standardMatrixEngineShader = (object) => {
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

  if(typeof object.addExtraDrawCode != 'undefined') object.addExtraDrawCode(world, object);
  //
  world.GL.gl.drawElements(world.GL.gl[object.glDrawElements.mode], object.glDrawElements.numberOfIndicesRender, world.GL.gl.UNSIGNED_SHORT, 0);
  world.mvPopMatrix(object.mvMatrix, world.mvMatrixStack);
}

// Shaders from shadertoy web site.
export var buildinShaders = {};
buildinShaders.shaderCloud = () => {
  return `${toyShader()}
  // Mikael Lemercier & Fabrice Neyret , June, 2013
  #define LINEAR_DENSITY 0  // 0: constant
  #define DENS 2.           // tau.rho
  #define rad .3            // sphere radius
  #define H   .05           // skin layer thickness (for linear density)
  #define ANIM true         // true/false
  // #define PI 3.14159

  float PI = asin(1.)*2.;

  uniform float matrixSkyRad;

  vec4 skyColor = vec4(.7,.8,1.,1.);
  vec3 sunColor = 10.*vec3(1.,.7,.1);   // NB: is Energy 
  vec2 FragCoord;

  // --- noise functions from https://www.shadertoy.com/view/XslGRr
  // Created by inigo quilez - iq/2013
  // License Creative Commons Attribution-NonCommercial-ShareAlike 3.0 Unported License.

  mat3 m = mat3( 0.00,  0.80,  0.60,
              -0.80,  0.36, -0.48,
              -0.60, -0.48,  0.64 );

  float hash( float n )
  {
    return fract(sin(n)*43758.5453);
  }

  float noise( in vec3 x )
  {
    vec3 p = floor(x);
    vec3 f = fract(x);

    f = f*f*(3.0-2.0*f);

    float n = p.x + p.y*57.0 + 113.0*p.z;

    float res = mix(mix(mix( hash(n+  0.0), hash(n+  1.0),f.x),
                        mix( hash(n+ 57.0), hash(n+ 58.0),f.x),f.y),
                    mix(mix( hash(n+113.0), hash(n+114.0),f.x),
                        mix( hash(n+170.0), hash(n+171.0),f.x),f.y),f.z);
    return res;
  }

  float fbm( vec3 p )
  {
    float f;
    f  = 0.5000*noise( p ); p = m*p*2.02;
    f += 0.2500*noise( p ); p = m*p*2.03;
    f += 0.1250*noise( p ); p = m*p*2.01;
    f += 0.0625*noise( p );
    return f;
  }
  // --- End of: Created by inigo quilez --------------------

  vec3 noise3( vec3 p )
  {
  if (ANIM) p += iTime;
    float fx = noise(p);
    float fy = noise(p+vec3(1345.67,0,45.67));
    float fz = noise(p+vec3(0,4567.8,-123.4));
    return vec3(fx,fy,fz);
  }
  vec3 fbm3( vec3 p )
  {
  if (ANIM) p += iTime;
    float fx = fbm(p);
    float fy = fbm(p+vec3(1345.67,0,45.67));
    float fz = fbm(p+vec3(0,4567.8,-123.4));
  return vec3(fx,fy,fz);
  }
  vec3 perturb3(vec3 p, float scaleX, float scaleI)
  {
    scaleX *= 2.;
  return scaleI*scaleX*fbm3(p/scaleX); // usually, to be added to p
  }

  float constantDensityTransmittance(float NDotL,float NDotO)
  {
    return NDotL/(DENS*(NDotL+NDotO));
  }

  float linearDensityTransmittance(float NDotL,float NDotO,float LDotO)
  {
    if (FragCoord.y/iResolution.y>.42)
    return sqrt(PI/2.) / sqrt(DENS/H* NDotO/NDotL*(NDotL+NDotO) ) ; // test1
  else
    // return .15*DENS*NDotL/(NDotL+NDotO)*sqrt(1.-LDotO*LDotO);       // test2
    return .15*DENS*NDotL/(NDotL+NDotO);                            // test3
  }

  float Rz=0.;  // 1/2 ray length inside object
  vec4 intersectSphere(vec3 rpos, vec3 rdir)
  {
    vec3 op = vec3(0.0, 0.0, 0.0) - rpos;
    //float rad = 0.3;

    float eps = 1e-5;
    float b = dot(op, rdir);
    float det = b*b - dot(op, op) + matrixSkyRad*matrixSkyRad;
      
    if (det > 0.0)
    {
        det = sqrt(det);
        float t = b - det;
        if (t > eps)
        {
            vec4 P = vec4(normalize(rpos+rdir*t), t);
            Rz = matrixSkyRad*P.z;   // 1/2 ray length inside object
  #if LINEAR_DENSITY    
            // skin layer counts less
            float dH = 1.+H*(H-2.*matrixSkyRad)/(Rz*Rz);
            if (dH>0.) // core region
                Rz *= .5*(1.+sqrt(dH));
            else
                Rz *= .5*matrixSkyRad*(1.-sqrt(1.-Rz*Rz/(matrixSkyRad*matrixSkyRad)))/H;
  #endif
            return P;
        }
    }

    return vec4(0.0);
  }

  bool computeNormal(in vec3 cameraPos, in vec3 cameraDir, out vec3 normal)
  {
    cameraPos = cameraPos+perturb3(cameraDir,.06,1.5);
    vec4 intersect = intersectSphere(cameraPos,cameraDir);
    if ( intersect.w > 0.)
    {
        normal = intersect.xyz;
        //normal = normalize(normal+perturb3(normal,.3,30.));
        return true;
    }
    return false;
  }
  float computeTransmittance( in vec3 cameraPos, in vec3 cameraDir, in vec3 lightDir )
  {
    vec3 normal;
    if ( computeNormal(cameraPos,cameraDir,normal))
    {
        float NDotL = clamp(dot(normal,lightDir),0.,1.);
        float NDotO = clamp(dot(normal,cameraPos),0.,1.);
        float LDotO = clamp(dot(lightDir,cameraPos),0.,1.);
      
  #if LINEAR_DENSITY
        float transmittance = linearDensityTransmittance(NDotL,NDotO,LDotO)*.5;
  #else
        float transmittance = constantDensityTransmittance(NDotL,NDotO);
  #endif
        return transmittance;
    }

    return -1.;
  }

  void mainImage( out vec4 outColor, in vec2 fragCoord )
  {
    FragCoord=fragCoord;
    
    //camera
    vec3 cameraPos = vec3(0.0,0.0,1.0);      
    vec3 cameraTarget = vec3(0.0, 0.0, 0.0);
    vec3 ww = normalize( cameraPos - cameraTarget );
    vec3 uu = normalize(cross( vec3(0.0,1.0,0.0), ww ));
    vec3 vv = normalize(cross(ww,uu));
    vec2 q = fragCoord.xy / iResolution.xy;
    vec2 p = -1.0 + 2.0*q;
    p.x *= iResolution.x/ iResolution.y;
    vec3 cameraDir = normalize( p.x*uu + p.y*vv - 1.5*ww );

    //light
    float theta = (iMouse.x / iResolution.x *2. - 1.)*PI;
    float phi = (iMouse.y / iResolution.y - .5)*PI;
    vec3 lightDir =vec3(sin(theta)*cos(phi),sin(phi),cos(theta)*cos(phi));

  // shade object
    float transmittance = computeTransmittance( cameraPos, cameraDir, lightDir );

  // display: special cases
  if (abs(q.y-.42)*iResolution.y<.5)  outColor = vec4(.75);
    else if (transmittance<0.) 		    outColor = skyColor;
  else if (transmittance>1.) 		    outColor = vec4(1.,0.,0.,1.); 		
  else
  { // display: object
    Rz = 1.-exp(-8.*DENS*Rz);
      float alpha = Rz;
      //fragColor = vec4(alpha); return; // for tests
      vec3 frag = vec3(transmittance,transmittance,transmittance);
      outColor = vec4(frag*sunColor,alpha) + (1.-alpha)*skyColor;
  }

    //display: light
    float d = length(vec2(lightDir)-p)*iResolution.x;
    float Z; if (lightDir.z>0.) Z=1.; else Z=0.;
    if (d<10.) outColor = vec4(1.,Z,.5,1.);

    //vec3 normal;
    //computeNormal(cameraPos,cameraDir, normal);
    //fragColor = vec4(normal,1.);
  }

  void main() {
  vec4 textureColor = texture(uSampler, vTextureCoord) * vec4(0,0,0,0);
  // mainImage(outColor, vTextureCoord);
  // outColor.rgb += vec3(textureColor.rgb * vLightWeighting);
  //  outColor.rgb *= vec3(textureColor.rgb * vLightWeighting);
  mainImage(outColor, gl_FragCoord.xy);
  
  }
  `;
}

buildinShaders.shaderLightAndClouds = () => {
  return `${toyShader()}
  // origin https://www.shadertoy.com/view/MdyGzR
  vec3 mod289(vec3 x) {
    return x - floor(x * (1.0 / 289.0)) * 289.0;
  }
  
  vec4 mod289(vec4 x) {
    return x - floor(x * (1.0 / 289.0)) * 289.0;
  }
  
  vec4 permute(vec4 x) {
       return mod289(((x*34.0)+1.0)*x);
  }
  
  vec4 taylorInvSqrt(vec4 r)
  {
    return 1.79284291400159 - 0.85373472095314 * r;
  }
  
  float snoise(vec3 v)
    { 
    const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;
    const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);
  
  // First corner
    vec3 i  = floor(v + dot(v, C.yyy) );
    vec3 x0 =   v - i + dot(i, C.xxx) ;
  
  // Other corners
    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min( g.xyz, l.zxy );
    vec3 i2 = max( g.xyz, l.zxy );
  
    //   x0 = x0 - 0.0 + 0.0 * C.xxx;
    //   x1 = x0 - i1  + 1.0 * C.xxx;
    //   x2 = x0 - i2  + 2.0 * C.xxx;
    //   x3 = x0 - 1.0 + 3.0 * C.xxx;
    vec3 x1 = x0 - i1 + C.xxx;
    vec3 x2 = x0 - i2 + C.yyy; // 2.0*C.x = 1/3 = C.y
    vec3 x3 = x0 - D.yyy;      // -1.0+3.0*C.x = -0.5 = -D.y
  
  // Permutations
    i = mod289(i); 
    vec4 p = permute( permute( permute( 
               i.z + vec4(0.0, i1.z, i2.z, 1.0 ))
             + i.y + vec4(0.0, i1.y, i2.y, 1.0 )) 
             + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));
  
  // Gradients: 7x7 points over a square, mapped onto an octahedron.
  // The ring size 17*17 = 289 is close to a multiple of 49 (49*6 = 294)
    float n_ = 0.142857142857; // 1.0/7.0
    vec3  ns = n_ * D.wyz - D.xzx;
  
    vec4 j = p - 49.0 * floor(p * ns.z * ns.z);  //  mod(p,7*7)
  
    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_ );    // mod(j,N)
  
    vec4 x = x_ *ns.x + ns.yyyy;
    vec4 y = y_ *ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);
  
    vec4 b0 = vec4( x.xy, y.xy );
    vec4 b1 = vec4( x.zw, y.zw );
  
    //vec4 s0 = vec4(lessThan(b0,0.0))*2.0 - 1.0;
    //vec4 s1 = vec4(lessThan(b1,0.0))*2.0 - 1.0;
    vec4 s0 = floor(b0)*2.0 + 1.0;
    vec4 s1 = floor(b1)*2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));
  
    vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;
    vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;
  
    vec3 p0 = vec3(a0.xy,h.x);
    vec3 p1 = vec3(a0.zw,h.y);
    vec3 p2 = vec3(a1.xy,h.z);
    vec3 p3 = vec3(a1.zw,h.w);
  
  //Normalise gradients
    vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
    p0 *= norm.x;
    p1 *= norm.y;
    p2 *= norm.z;
    p3 *= norm.w;
  
  // Mix final noise value
    vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
    m = m * m;
    return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1), 
                                  dot(p2,x2), dot(p3,x3) ) );
    }
  
  float normnoise(float noise) {
    return 0.5*(noise+1.0);
  }
  
  float clouds(vec2 uv) {
      uv += vec2(iTime*0.05, + iTime*0.01);
      
      vec2 off1 = vec2(50.0,33.0);
      vec2 off2 = vec2(0.0, 0.0);
      vec2 off3 = vec2(-300.0, 50.0);
      vec2 off4 = vec2(-100.0, 200.0);
      vec2 off5 = vec2(400.0, -200.0);
      vec2 off6 = vec2(100.0, -1000.0);
    float scale1 = 3.0;
      float scale2 = 6.0;
      float scale3 = 12.0;
      float scale4 = 24.0;
      float scale5 = 48.0;
      float scale6 = 96.0;
      return normnoise(snoise(vec3((uv+off1)*scale1,iTime*0.5))*0.8 + 
                       snoise(vec3((uv+off2)*scale2,iTime*0.4))*0.4 +
                       snoise(vec3((uv+off3)*scale3,iTime*0.1))*0.2 +
                       snoise(vec3((uv+off4)*scale4,iTime*0.7))*0.1 +
                       snoise(vec3((uv+off5)*scale5,iTime*0.2))*0.05 +
                       snoise(vec3((uv+off6)*scale6,iTime*0.3))*0.025);
  }
  
  
  void mainImage( out vec4 outColor, in vec2 fragCoord )
  {
    
    vec2 uv =  fragCoord.xy/iResolution.x;
      
      vec2 center = vec2(0.5,0.5*(iResolution.y/iResolution.x));
      
      vec2 light1 = vec2(sin(iTime*1.2+50.0)*1.0 + cos(iTime*0.4+10.0)*0.6,sin(iTime*1.2+100.0)*0.8 + cos(iTime*0.2+20.0)*-0.2)*0.2+center;
      vec3 lightColor1 = vec3(1.0, 0.3, 0.3);
      
      vec2 light2 = vec2(sin(iTime+3.0)*-2.0,cos(iTime+7.0)*1.0)*0.2+center;
      vec3 lightColor2 = vec3(0.3, 1.0, 0.3);
      
      vec2 light3 = vec2(sin(iTime+3.0)*2.0,cos(iTime+14.0)*-1.0)*0.2+center;
      vec3 lightColor3 = vec3(0.3, 0.3, 1.0);
  
      
      float cloudIntensity1 = 0.7*(1.0-(2.5*distance(uv, light1)));
      float lighIntensity1 = 1.0/(100.0*distance(uv,light1));
  
      float cloudIntensity2 = 0.7*(1.0-(2.5*distance(uv, light2)));
      float lighIntensity2 = 1.0/(100.0*distance(uv,light2));
      
      float cloudIntensity3 = 0.7*(1.0-(2.5*distance(uv, light3)));
      float lighIntensity3 = 1.0/(100.0*distance(uv,light3));
      
      
      outColor = vec4(vec3(cloudIntensity1*clouds(uv))*lightColor1 + lighIntensity1*lightColor1 +
                       vec3(cloudIntensity2*clouds(uv))*lightColor2 + lighIntensity2*lightColor2 +
                       vec3(cloudIntensity3*clouds(uv))*lightColor3 + lighIntensity3*lightColor3 
                       ,1.0);
  }
  void main() {
    mainImage(outColor, gl_FragCoord.xy);
  }
  `
}

// NOT WORKING shader4
buildinShaders.shaderNebula = () => {
  return `${toyShader()}
  float polygonDistance(vec2 p, float radius, float angleOffset, int sideCount) {
    float a = atan(p.x, p.y)+ angleOffset;
    float b = 6.28319 / float(sideCount);
    return cos(floor(.5 + a / b) * b - a) * length(p) - radius;
  }
  
  // from https://www.shadertoy.com/view/4djSRW
  #define HASHSCALE1 443.8975
  float hash11(float p) // assumes p in ~0-1 range
  {
    vec3 p3  = fract(vec3(p) * HASHSCALE1);
      p3 += dot(p3, p3.yzx + 19.19);
      return fract((p3.x + p3.y) * p3.z);
  }
  
  #define HASHSCALE3 vec3(.1031, .1030, .0973)
  vec2 hash21(float p) // assumes p in larger integer range
  {
    vec3 p3 = fract(vec3(p) * HASHSCALE3);
    p3 += dot(p3, p3.yzx + 19.19);
    return fract(vec2((p3.x + p3.y)*p3.z, (p3.x+p3.z)*p3.y));
  }
  
  void mainImage( out vec4 outColor, in vec2 fragCoord )
  {
    vec2 uv = vec2(0.5) - (fragCoord.xy / iResolution.xy);
      uv.x *= iResolution.x / iResolution.y;
      
      float accum = 0.;
      for(int i = 0; i < 83; i++) {
          float fi = float(i);
          float thisYOffset = mod(hash11(fi * 0.017) * (iTime + 19.) * 0.2, 4.0) - 2.0;
          vec2 center = (hash21(fi) * 2. - 1.) * vec2(1.1, 1.0) - vec2(0.0, thisYOffset);
          float radius = 0.5;
          vec2 offset = uv - center;
          float twistFactor = (hash11(fi * 0.0347) * 2. - 1.) * 1.9;
          float rotation = 0.1 + iTime * 0.2 + sin(iTime * 0.1) * 0.9 + (length(offset) / radius) * twistFactor;
          accum += pow(smoothstep(radius, 0.0, polygonDistance(uv - center, 0.1 + hash11(fi * 2.3) * 0.2, rotation, 5) + 0.1), 3.0);
      }
      
      vec3 subColor = vec3(0.4, 0.8, 0.2); //vec3(0.4, 0.2, 0.8);
      vec3 addColor = vec3(0.3, 0.2, 0.1);//vec3(0.3, 0.1, 0.2);
      
    outColor = vec4(vec3(1.0) - accum * subColor + addColor, 1.0);
  }

/////////
 
void main() {
    mainImage(outColor, gl_FragCoord.xy);
  }

  `
}



buildinShaders.shaderCPU= () => {
  return `${toyShader()}
  // facebook.com/steveoscpu
  // greets/thx to iq & XT95 code/ideas!
  // Arrrrgggg!!! OpenGL ES limitations !!
  // lots of loop unrolling here it seems!
  float pn(vec3 p) {
        vec3 i = floor(p); vec4 a = dot(i, vec3(1., 57., 21.)) + vec4(0., 57., 21., 78.);
        vec3 f = cos((p-i)*3.141592653589793)*(-.5) + .5;   a = mix(sin(cos(a)*a), sin(cos(1.+a)*(1.+a)), f.x);
        a.xy = mix(a.xz, a.yw, f.y);   return mix(a.x, a.y, f.z);
        }
  vec3 co=vec3(1.); vec2 q; float radius=0.18,dp=6.9,pw=1.; float vr1=1.,vr2=1.,vr3=1.,vr4=1.,vr5=1.,vr6=1.,vr7=1.,vr8=1.,vr9=1.,vr10=1.;
  float r (vec2 c,vec2 d){vec2 k=abs(q-c)-0.5*d;return max(k.x,k.y);}
  float rr(vec2 c,vec2 d){d-=vec2(2.0*radius); return abs(length(max(abs(q-c)-0.5*d,0.0))-radius);}
  float cpu(vec2 p){
        q=p;q.x*=3.;float i=floor(q.x);q.x=fract(q.x);q-=0.5; float d=1.;
        if(i==0.)d=max(rr(vec2(0.),vec2(.7)),-r(vec2(0.35,0.),vec2(1.,0.3)));
        else if(i==1.)d=min(max(rr( vec2(-0.2,0.175),vec2(1.1,.35)),-r( vec2(-1.35,0.),vec2(2.))),max(abs(r(vec2(0.),vec2(.7))),-r(vec2(0.15,0.),vec2(1.,2.))));
        else if(i==2.)d=max(rr(vec2(0.,0.2),vec2(.7,1.1)),-r(vec2(0.,1.35),vec2(2.)));
        return pow(clamp(d*dp,0.,1.),pw);
        }
  vec3 flx(vec2 p,float ct){
       float t; vec3 q=vec3(p,p.x-p.y+iTime*0.3);
       t=abs(pn(q)); t+=.5*abs(pn(q*2.)); t+=.25*abs(pn(q*4.));t*=0.5;
       vec3 c=clamp(3.*abs(fract(fract(ct)+vec3(0.,2./3.0,1./3.0))*2.-1.)-1.,0.,1.);
       return pow(vec3(1.-t),c+1.5);
       }
  float sk(float g){g=abs(g*40.);return cos(g)*pow(1.-clamp(g/11.,0.,1.),2.);}
  float scv(float t){t=clamp(t,0.,1.);return t*t*(3.0-2.0*t);}
  
  void main_(void){
       float sc,de,st,t=mod(iTime,55.);
       sc=5.;if(t<=sc){
          de=2.;st=scv(t/(sc-de));
          vr8=mix(.024,1. ,st);
          vr10=mix(2.37,1.,st);
          vr2=mix(.02,2.,pow(st,3.));
          co=mix(vec3(1),vec3(4,1,0.1),st);
          vr3=0.;
          vr7=0.;
          return;}t-=sc;
       sc=5.;if(t<=sc){
          de=0.;st=scv(t/(sc-de));
          vr8=mix(1.,0.7,st);
          vr10=mix(1.,0.,st);
          vr2=2.;
          co=mix(vec3(4.,1.,0.1),vec3(1.,18.,18.),st);
          st=clamp((t-4.),0.,1.);
          vr7=mix(0.,0.5,st);
          vr3=0.;
          vr5=0.5;
          vr6=3.;
          return;}t-=sc;
       sc=5.;if(t<=sc){
          de=0.;st=scv(t/(sc-de));
          vr3=0.;
          vr8=.7;
          vr10=0.;
          vr2=2.;
          co=mix(vec3(1,18,18),vec3(8,20,20),st);
          vr7=mix(0.5,1.,st);
          vr5=mix(0.5,1.,st);
          vr6=mix(3.,1.,st);
          return;}t-=sc;
       sc=5.;if(t<=sc){
          de=0.;st=st=scv(t/(sc-de));
          vr3=0.;
          vr8=mix(0.7,1.,st);
          vr10=mix(0.,1.,st);
          vr2=mix(2.,1.,st);
          co=mix(vec3(8,20,20),vec3(8,2,.4),st);
          return;}t-=sc;
       sc=5.;if(t<=sc){
          de=0.;st=st=scv(t/(sc-de));
          vr3=mix(0.,1.,st);
          co=mix(vec3(8.,2.,.4),vec3(1.),st);
          return;}t-=sc;
       sc=5.;if(t<=sc){
          de=2.;st=scv(t/(sc-de));
          vr8=1.;
          vr9=mix(1.,1.7,st);
          vr10=mix(1.,1.53,st);
          return;}t-=sc;
       sc=5.;if(t<=sc){
          de=2.;st=scv(t/(sc-de));
          vr8=mix(1.,3.,st);
          vr9=mix(1.7,1.,st);
          vr10=mix(1.53,1.89,st);
          return;}t-=sc;
       sc=5.;if(t<=sc){
          de=2.;st=scv(t/(sc-de));
          vr8=mix(3.,2.3,st);
          vr10=mix(1.89,2.4,st);
          return;}t-=sc;
       sc=5.;if(t<=sc){
          de=2.;st=scv(t/(sc-de));
          vr8=mix(2.3,3.,st);
          vr10=mix(2.4,1.89,st);
          vr1=mix(1.,0.,st);
          vr4=mix(1.,0.,st);
          return;}t-=sc;
       sc=5.;if(t<=sc){
          de=2.;st=scv(t/(sc-de));
          vr8=mix(3.,.5,st);
          vr10=1.89;
          vr1=0.;
          vr4=0.;
          return;}t-=sc;
       sc=5.;if(t<=sc){
          de=2.;st=scv(t/(sc-de));
          vr3=mix(1.,0.,st);
          vr1=mix(0.,1.,st);
          vr7=mix(1.,0.,st);
          vr8=mix(.5,.024 ,st);
          vr10=mix(1.89,2.37,st);
          vr2=mix(1.,.02,pow(st,0.1));
          return;}t-=sc;
          }
  void mainImage( out vec4 fragColor, in vec2 fragCoord ){
       float a=iTime*94.24777960;
       vec2 pa=.15*vec2(sin(a),cos(a));
       float asp=iResolution.x/iResolution.y;

       vec2 p=(pa+fragCoord.xy)/iResolution.xy-0.5;

       main_();
       
       p*=1./(1.-(vr9-1.)*length(p));
       p*=1.-length(p)*2.*(vr10-1.); p*=vr8; vec2 pp=p*2.; p.y*=3./asp; p*=1.2; float t=iTime*0.4;
       p.x+=0.02*(sk(p.y+cos(t)*3.)-sk(p.y-cos(t*1.1)*2.));
       p+=0.5; 
       float ll=cpu(p);

       dp=9.3;
       pw=vr2*6.;
       float lc=cpu(p);

       vec2 f=vec2(0.001,0);
       vec3 dl;
       dl.z=0.06;
       dl.x=cpu(p-f.xy)-cpu(p+f.xy);
       dl.y=cpu(p-f.yx)-cpu(p+f.yx);

       vec3 light=normalize(vec3(0.5,-0.5,1.0));
       vec3 nd=normalize(dl);
       float s=0.5+0.5*dot(nd,light);
       float e=smoothstep(1.,0.4,lc);
       p.x*=3.; 
       p=(0.5*p)+nd.xy*0.6*e; 
       t=iTime*0.04;
       vec3 fx=flx(p,t)*flx(2.1*p+10.,0.333+t*1.1);
       fx*=vr1*2.;
       fx=pow(fx,vec3(vr3));
       fragColor.rgb=pow(s*fx*(0.5+0.5*e),co);
       float lf=ll*vr4-(vr6-1.2);
       vec3 dir=normalize(vec3(pp*vec2(asp*1.6,-1),-1.5)),q,r=vec3(0.,0.,4.);
       float d,ii=1.;e=0.02;
       for(float i=0.;i<64.;i++){
        d=length(r*vec3(0.1,.5,1.))-1.;
        q=r; q.y-=2.;
        d+=(pn(q+vec3(.0,iTime*2.,.0))+pn(q*3.)*.5)*.25*(q.y);
        d=min(100.-length(q),abs(lf+d))+e; r+=d*dir; 
        if(d<e){
          ii=i/64.;
          break;
        }
       }
       fragColor.rgb+=vr7*mix(vec3(0.),mix(vec3(1.,.5,.1),vec3(0.1,.5,1),r.y*.02+.4),pow(ii*2.,4.*vr5));
       }
  
  
void main() {
    mainImage(outColor, gl_FragCoord.xy);
  }


  `
}