
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
buildinShaders.shaderCloudCC = () => {
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

buildinShaders.shaderLightAndCloudsCC = () => {
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

buildinShaders.shaderNebulaCC = () => {
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

buildinShaders.shaderWaterCC = () => {
  return `${toyShader()}
    // Found this on GLSL sandbox. I really liked it, changed a few things and made it tileable.// :)// by David Hoskins.
    // Original water turbulence effect by joltz0r
    // Redefine below to see the tiling...
    //#define SHOW_TILING
    #define TAU 6.28318530718
    #define MAX_ITER 5
    void mainImage( out vec4 outColor, in vec2 fragCoord ) 
    {
      float time = iTime * .5+23.0;
      // uv should be the 0-1 uv of texture...
      vec2 uv = fragCoord.xy / iResolution.xy;
      #ifdef SHOW_TILING
        vec2 p = mod(uv*TAU*2.0, TAU)-250.0;
      #else
          vec2 p = mod(uv*TAU, TAU)-250.0;
      #endif
        vec2 i = vec2(p);
        float c = 1.0;
        float inten = .005;

        for (int n = 0; n < MAX_ITER; n++) 
        {
          float t = time * (1.0 - (3.5 / float(n+1)));
          i = p + vec2(cos(t - i.x) + sin(t + i.y), sin(t - i.y) + cos(t + i.x));
          c += 1.0/length(vec2(p.x / (sin(i.x+t)/inten),p.y / (cos(i.y+t)/inten)));
        }
        c /= float(MAX_ITER);
        c = 1.17-pow(c, 1.4);
        vec3 colour = vec3(pow(abs(c), 8.0));
        colour = clamp(colour + vec3(0.0, 0.35, 0.5), 0.0, 1.0);

        #ifdef SHOW_TILING
        // Flash tile borders...
        vec2 pixel = 2.0 / iResolution.xy;
        uv *= 2.0;
        float f = floor(mod(iTime*.5, 2.0));	// Flash value.
        vec2 first = step(pixel, uv) * f;	// Rule out first screen pixels and flash.
        uv  = step(fract(uv), pixel);	// Add one line of pixels per tile.
        colour = mix(colour, vec3(1.0, 1.0, 0.0), (uv.x + uv.y) * first.x * first.y); // Yellow line
        #endif
        outColor = vec4(colour, 1.0);
      }
      void main() {
        vec4 textureColor = texture(uSampler, vTextureCoord) * vec4(1,1,1,1);
        // mainImage(outColor, vTextureCoord);
        mainImage(outColor, gl_FragCoord.xy);
        outColor.rgb *= vec3(textureColor.rgb * vLightWeighting);
      }
  `;
}

buildinShaders.shaderFireBallCC = () => {
  return `${toyShader()}
  // https://www.shadertoy.com/view/4dXGR4
  // based on https://www.shadertoy.com/view/lsf3RH by
  // trisomie21 (THANKS!)
  // My apologies for the ugly code.
  float snoise(vec3 uv, float res) // by trisomie21
  {
    const vec3 s = vec3(1e0, 1e2, 1e4);
    uv *= res;
    vec3 uv0 = floor(mod(uv, res))*s;
    vec3 uv1 = floor(mod(uv+vec3(1.), res))*s;
    vec3 f = fract(uv); f = f*f*(3.0-2.0*f);
    vec4 v = vec4(uv0.x+uv0.y+uv0.z, uv1.x+uv0.y+uv0.z,
                uv0.x+uv1.y+uv0.z, uv1.x+uv1.y+uv0.z);
    
    vec4 r = fract(sin(v*1e-3)*1e5);
    float r0 = mix(mix(r.x, r.y, f.x), mix(r.z, r.w, f.x), f.y);
    
    r = fract(sin((v + uv1.z - uv0.z)*1e-3)*1e5);
    float r1 = mix(mix(r.x, r.y, f.x), mix(r.z, r.w, f.x), f.y);
    
    return mix(r0, r1, f.z)*2.-1.;
  }

  float freqs[4];

  void mainImage( out vec4 outColor, in vec2 fragCoord )
  {
    freqs[0] = texture( uSampler, vec2( 0.01, 0.15 ) ).x;
    freqs[1] = texture( uSampler, vec2( 0.07, 0.15 ) ).x;
    freqs[2] = texture( uSampler, vec2( 0.15, 0.15 ) ).x;
    freqs[3] = texture( uSampler, vec2( 0.30, 0.15 ) ).x;

    float brightness	= freqs[1] * 0.25 + freqs[2] * 0.25;
    float radius		= 0.24 + brightness * 0.2;
    float invRadius 	= 1.0/radius;
    
    vec3 orange			= vec3( 0.8, 0.65, 0.3 );
    vec3 orangeRed		= vec3( 0.8, 0.35, 0.1 );
    float time		= iTime * 0.1;
    float aspect	= iResolution.x/iResolution.y;
    vec2 uv			= fragCoord.xy / iResolution.xy;
    vec2 p 			= -1. + uv;
    p.x *= aspect;

    float fade		= pow( length( 2.0 * p ), 0.5 );
    float fVal1		= 1.0 - fade;
    float fVal2		= 1.0 - fade;
    
    float angle		= atan( p.x, p.y )/6.2832;
    float dist		= length(p);
    vec3 coord		= vec3( angle, dist, time * 0.1 );
    
    float newTime1	= abs( snoise( coord + vec3( 0.0, -time * ( 0.35 + brightness * 0.001 ), time * 0.015 ), 15.0 ) );
    float newTime2	= abs( snoise( coord + vec3( 0.0, -time * ( 0.15 + brightness * 0.001 ), time * 0.015 ), 45.0 ) );	
    for( int i=1; i<=7; i++ ){
      float power = pow( 2.0, float(i + 1) );
      fVal1 += ( 0.5 / power ) * snoise( coord + vec3( 0.0, -time, time * 0.2 ), ( power * ( 10.0 ) * ( newTime1 + 1.0 ) ) );
      fVal2 += ( 0.5 / power ) * snoise( coord + vec3( 0.0, -time, time * 0.2 ), ( power * ( 25.0 ) * ( newTime2 + 1.0 ) ) );
    }
    
    float corona		= pow( fVal1 * max( 1.1 - fade, 0.0 ), 2.0 ) * 50.0;
    corona				+= pow( fVal2 * max( 1.1 - fade, 0.0 ), 2.0 ) * 50.0;
    corona				*= 1.2 - newTime1;
    vec3 sphereNormal 	= vec3( 0.0, 0.0, 1.0 );
    vec3 dir 			= vec3( 0.0 );
    vec3 center			= vec3( 0.5, 0.5, 1.0 );
    vec3 starSphere		= vec3( 0.0 );
    
    vec2 sp = -2.0 + 2.0 * uv;
    sp.x *= aspect;
    sp *= ( 2.0 - brightness );
      float r = dot(sp,sp);
    float f = (1.0-sqrt(abs(1.0-r)))/(r) + brightness * 0.5;
    if( dist < radius ){
      corona *= pow( dist * invRadius, 24.0 );
        vec2 newUv;
        newUv.x = sp.x*f;
        newUv.y = sp.y*f;
      newUv += vec2( time, 0.0 );
      
      vec3 texSample 	= texture( uSampler, newUv ).rgb;
      float uOff		= ( texSample.g * brightness * 4.5 + time );
      vec2 starUV		= newUv + vec2( uOff, 0.0 );
      starSphere		= texture( uSampler, starUV ).rgb;
    }
    
    float starGlow	= min( max( 1.0 - dist * ( 1.0 - brightness ), 0.0 ), 1.0 );
    //outColor.rgb	= vec3( r );
    outColor.rgb	= vec3( f * ( 0.75 + brightness * 0.3 ) * orange ) + starSphere + corona * orange + starGlow * orangeRed;
    outColor.a		= 1.0;
  }

  void main() {
    vec4 textureColor = texture(uSampler, vTextureCoord) * vec4(1,1,1,1);
    // mainImage(outColor, vTextureCoord);
    // outColor.rgb += vec3(textureColor.rgb * vLightWeighting);
    mainImage(outColor, gl_FragCoord.xy);
    outColor.rgb *= vec3(textureColor.rgb * vLightWeighting);
  }
  `
}

buildinShaders.shaderFireBallCC = () => {
  return `${toyShader()}
  // https://www.shadertoy.com/terms
  // https://www.shadertoy.com/view/lsf3RH
  float snoise(vec3 uv, float res)
  {
    const vec3 s = vec3(1e0, 1e2, 1e3);
    
    uv *= res;
    
    vec3 uv0 = floor(mod(uv, res))*s;
    vec3 uv1 = floor(mod(uv+vec3(1.), res))*s;
    
    vec3 f = fract(uv); f = f*f*(3.0-2.0*f);
  
    vec4 v = vec4(uv0.x+uv0.y+uv0.z, uv1.x+uv0.y+uv0.z,
                uv0.x+uv1.y+uv0.z, uv1.x+uv1.y+uv0.z);
  
    vec4 r = fract(sin(v*1e-1)*1e3);
    float r0 = mix(mix(r.x, r.y, f.x), mix(r.z, r.w, f.x), f.y);
    
    r = fract(sin((v + uv1.z - uv0.z)*1e-1)*1e3);
    float r1 = mix(mix(r.x, r.y, f.x), mix(r.z, r.w, f.x), f.y);
    
    return mix(r0, r1, f.z)*2.-1.;
  }
  
  void mainImage( out vec4 outColor, in vec2 fragCoord ) 
  {
    vec2 p = -.5 + fragCoord.xy / iResolution.xy;
    p.x *= iResolution.x/iResolution.y;
    
    float color = 3.0 - (3.*length(2.*p));
    
    vec3 coord = vec3(atan(p.x,p.y)/6.2832+.5, length(p)*.4, .5);
    
    for(int i = 1; i <= 7; i++)
    {
      float power = pow(2.0, float(i));
      color += (1.5 / power) * snoise(coord + vec3(0.,-iTime*.05, iTime*.01), power*16.);
    }
    outColor = vec4( color, pow(max(color,0.),2.)*0.4, pow(max(color,0.),3.)*0.15 , 1.0);
  }
  void main() {
    vec4 textureColor = texture(uSampler, vTextureCoord) * vec4(1,1,1,1);
    // mainImage(outColor, vTextureCoord);
    // outColor.rgb += vec3(textureColor.rgb * vLightWeighting);
    mainImage(outColor, gl_FragCoord.xy);
    outColor.rgb *= vec3(textureColor.rgb * vLightWeighting);
  }
  `
}

buildinShaders.shaderChainCC = () => {
  return `${toyShader()}
// ***********************************************************
// Alcatraz / Rhodium 4k Intro liquid carbon
// by Jochen "Virgill" Feldkötter
// 4kb executable: http://www.pouet.net/prod.php?which=68239
// Youtube: https://www.youtube.com/watch?v=YK7fbtQw3ZU
// ***********************************************************
#define time iTime
#define res iResolution

float bounce;

// signed box
float sdBox(vec3 p,vec3 b)
{
  vec3 d=abs(p)-b;
  return min(max(d.x,max(d.y,d.z)),0.)+length(max(d,0.));
}

// rotation
void pR(inout vec2 p,float a) 
{
	p=cos(a)*p+sin(a)*vec2(p.y,-p.x);
}

// 3D noise function (IQ)
float noise(vec3 p)
{
	vec3 ip=floor(p);
    p-=ip; 
    vec3 s=vec3(7,157,113);
    vec4 h=vec4(0.,s.yz,s.y+s.z)+dot(ip,s);
    p=p*p*(3.-2.*p); 
    h=mix(fract(sin(h)*43758.5),fract(sin(h+s.x)*43758.5),p.x);
    h.xy=mix(h.xz,h.yw,p.y);
    return mix(h.x,h.y,p.z); 
}

float map(vec3 p)
{	
	p.z-=1.0;
    p*=0.9;
    pR(p.yz,bounce*1.+0.4*p.x);
    return sdBox(p+vec3(0,sin(1.6*time),0),vec3(20.0, 0.05, 1.2))-.4*noise(8.*p+3.*bounce);
}

//	normal calculation
vec3 calcNormal(vec3 pos)
{
    float eps=0.0001;
	float d=map(pos);
	return normalize(vec3(map(pos+vec3(eps,0,0))-d,map(pos+vec3(0,eps,0))-d,map(pos+vec3(0,0,eps))-d));
}


// 	standard sphere tracing inside and outside
float castRayx(vec3 ro,vec3 rd) 
{
    float function_sign=(map(ro)<0.)?-1.:1.;
    float precis=.0001;
    float h=precis*2.;
    float t=0.;
	for(int i=0;i<120;i++) 
	{
        if(abs(h)<precis||t>12.)break;
		h=function_sign*map(ro+rd*t);
        t+=h;
	}
    return t;
}

// 	refraction
float refr(vec3 pos,vec3 lig,vec3 dir,vec3 nor,float angle,out float t2, out vec3 nor2)
{
    float h=0.;
    t2=2.;
	vec3 dir2=refract(dir,nor,angle);  
 	for(int i=0;i<50;i++) 
	{
		if(abs(h)>3.) break;
		h=map(pos+dir2*t2);
		t2-=h;
	}
    nor2=calcNormal(pos+dir2*t2);
    return(.5*clamp(dot(-lig,nor2),0.,1.)+pow(max(dot(reflect(dir2,nor2),lig),0.),8.));
}

//	softshadow 
float softshadow(vec3 ro,vec3 rd) 
{
    float sh=1.;
    float t=.02;
    float h=.0;
    for(int i=0;i<22;i++)  
	{
        if(t>20.)continue;
        h=map(ro+rd*t);
        sh=min(sh,4.*h/t);
        t+=h;
    }
    return sh;
}

//	main function
void mainImage(out vec4 outColor,in vec2 fragCoord)
{    
    bounce=abs(fract(0.05*time)-.5)*20.; // triangle function
    
	vec2 uv=gl_FragCoord.xy/res.xy; 
    vec2 p=uv*2.-1.;
   
// 	bouncy cam every 10 seconds
    float wobble=(fract(.1*(time-1.))>=0.9)?fract(-time)*0.1*sin(30.*time):0.;
    
//  camera    
    vec3 dir = normalize(vec3(2.*gl_FragCoord.xy -res.xy, res.y));
    vec3 org = vec3(0,2.*wobble,-3.);  
    

// 	standard sphere tracing:
    vec3 color = vec3(0.);
    vec3 color2 =vec3(0.);
    float t=castRayx(org,dir);
	vec3 pos=org+dir*t;
	vec3 nor=calcNormal(pos);

// 	lighting:
    vec3 lig=normalize(vec3(.2,6.,.5));
//	scene depth    
    float depth=clamp((1.-0.09*t),0.,1.);
    
    vec3 pos2 = vec3(0.);
    vec3 nor2 = vec3(0.);
    if(t<12.0)
    {
    	color2 = vec3(max(dot(lig,nor),0.)  +  pow(max(dot(reflect(dir,nor),lig),0.),16.));
    	color2 *=clamp(softshadow(pos,lig),0.,1.);  // shadow            	
       	float t2;
		color2.rgb +=refr(pos,lig,dir,nor,0.9, t2, nor2)*depth;
        color2-=clamp(.1*t2,0.,1.);				// inner intensity loss

	}      
  

    float tmp = 0.;
    float T = 1.;

//	animation of glow intensity    
    float intensity = 0.1*-sin(.209*time+1.)+0.05; 
	for(int i=0; i<128; i++)
	{
        float density = 0.; float nebula = noise(org+bounce);
        density=intensity-map(org+.5*nor2)*nebula;
		if(density>0.)
		{
			tmp = density / 128.;
            T *= 1. -tmp * 100.;
			if( T <= 0.) break;
		}
		org += dir*0.078;
    }    
	vec3 basecol=vec3(1./1. ,  1./4. , 1./16.);
    T=clamp(T,0.,1.5); 
    color += basecol* exp(4.*(0.5-T) - 0.8);
    color2*=depth;
    color2+= (1.-depth)*noise(6.*dir+0.3*time)*.1;	// subtle mist

    
//	scene depth included in alpha channel
outColor = vec4(vec3(1.*color+0.8*color2)*1.3,abs(0.67-depth)*2.+4.*wobble);
}





//

void main() {
  vec4 textureColor = texture(uSampler, vTextureCoord) * vec4(1,1,1,1);
  // mainImage(outColor, vTextureCoord);
  // outColor.rgb += vec3(textureColor.rgb * vLightWeighting);
  mainImage(outColor, gl_FragCoord.xy);
  outColor.rgb *= vec3(textureColor.rgb * vLightWeighting);
}


  `
}

buildinShaders.shaderFractalCC = () => {
  return `${toyShader()}
  /*
    Steel Lattice
    -------------
    Shadertoy user FabriceNeyret2's "Crowded Pillars 3" inspired me to dig up some old
    "lattice with holes" code. Here's the link to his particular example: 
    https://www.shadertoy.com/view/4lfSDn
    
    The lattice structure in this example is really simple to construct, and represents 
    just one of infinitely many combinations. I was going for that oldschool, 3D-tube 
	screensaver look and had originally hoped to set the thing ablaze.

	Unfortunately, I couldn't achieve even mild realism whilst maintaining a decent 
	framerate, so have copped out and settled for a very subtle reflective firey afterglow. 
	I haven't given up on the original idea, though.
    
	There's a whole bunch of notes in there. Probably too many, but hopefully, someone
	will find some of it useful. I spent far too long reading up on blackbody radiation, 
	then barely used it. Typical. :)
	If anyone spots any errors, feel free to let me know.
*/

#define FIRE_REFLECTION // Comment this out, to get rid of the reflective afterglow.

#define sEPS 0.005 // Minimum surface distance threshold.
#define FAR 20. // Maximum ray distance threshold.

// Grey scale.
float getGrey(vec3 p){ return p.x*0.299 + p.y*0.587 + p.z*0.114; }

// Smooth minimum function. There are countless articles, but IQ explains it best here:
// https://iquilezles.org/articles/smin
float sminP( float a, float b, float smoothing ){
    float h = clamp( 0.5+0.5*(b-a)/smoothing, 0.0, 1.0 );
    return mix( b, a, h ) - smoothing*h*(1.0-h);
}

// 2D rotation. Always handy.
mat2 rot(float th){ float cs = cos(th), si = sin(th); return mat2(cs, -si, si, cs); }

// Tri-Planar blending function. Based on an old Nvidia writeup:
// GPU Gems 3 - Ryan Geiss: http://http.developer.nvidia.com/GPUGems3/gpugems3_ch01.html
vec3 tex3D( sampler2D tex, in vec3 p, in vec3 n ){
    //n = abs(n)/1.732051;
    n = max((abs(n) - 0.2)*7., 0.001); // n = max(abs(n), 0.001), etc.
    n /= (n.x + n.y + n.z );
	return (texture(tex, p.yz)*n.x + texture(tex, p.zx)*n.y + texture(tex, p.xy)*n.z).xyz;
}

// I just wanted a simple function to produce some firey blackbody colors with a simple explanation 
// to go with it, but computer nerds who write academic papers never make it easy. :) Anyway, to save 
// someone else the trouble, here's some quick, but messy, notes.
//
// The paper located here was pretty helpful. Mind numbingly boring, but helpful:
// http://www.spectralcalc.com/blackbody/CalculatingBlackbodyRadianceV2.pdf
// So was this:
// http://www.scratchapixel.com/old/lessons/3d-advanced-lessons/blackbody/spectrum-of-blackbodies/
//
// If wasting time reading though countless webpages full of physics and mathematics that never get to 
// the point isn't your thing, then this Shadertoy example should be far more accommodating:
// User - Bejit: https://www.shadertoy.com/view/MslSDl
vec3 blackbodyPalette(float t){
    // t = tLow + (tHigh - tLow)*t;
    t *= 4000.; // Temperature range. Hardcoded from 0K to 4000K, in this case. 
    
    // Planckian locus or black body locus approximated in CIE color space... Color theory is not my thing,
    // but I think below is a conversion of the physical temperture (t) above (which has no meaning to a 
    // computer) to chromacity coordinates. 
    float cx = (0.860117757 + 1.54118254e-4*t + 1.28641212e-7*t*t)/(1.0 + 8.42420235e-4*t + 7.08145163e-7*t*t);
    float cy = (0.317398726 + 4.22806245e-5*t + 4.20481691e-8*t*t)/(1.0 - 2.89741816e-5*t + 1.61456053e-7*t*t);
    
    // Converting the chromacity coordinates to XYZ tristimulus color space.
    float d = (2.*cx - 8.*cy + 4.);
    vec3 XYZ = vec3(3.*cx/d, 2.*cy/d, 1. - (3.*cx + 2.*cy)/d);
    
    // Converting XYZ color space to RGB. Note: Below are the transpose of the matrices you'll find all over the 
    // web, because I'm placing XYZ after the conversion matrix, and not before it. If you're getting the wrong
    // colors, that's probably the reason. I found that out the hard way. :) 
    // http://www.cs.rit.edu/~ncs/color/t_spectr.html
    vec3 RGB = mat3(3.240479, -0.969256, 0.055648, 
                    -1.537150, 1.875992, -0.204043, 
                    -0.498535, 0.041556, 1.057311) * vec3(1./XYZ.y*XYZ.x, 1., 1./XYZ.y*XYZ.z);
                    
    // Alternative conversion matrix: http://www.brucelindbloom.com/index.html?Eqn_RGB_XYZ_Matrix.html
    // mat3(3.2404542, -0.9692660, 0.0556434, -1.5371385, 1.8760108, -0.2040259, -0.4985314, 0.0415560, 1.0572252);

    // Apply Stefanâ€“Boltzmann's law to the RGB color, and we're done. 
    // 
    // Appendix A: Algorithms for Computing In-band Radiance.
    // http://www.spectralcalc.com/blackbody/CalculatingBlackbodyRadianceV2.pdf
    // Planck*Light/Boltzman = 0.01438767312;
    // Planck*Light*Light*2. = 1.1910428e-16;
    //
    // Whoever went through the trouble to use the real algorithm to come up with the estimate of 0.0004, "Thank you!" :)
    // The last term relates to the power radiating through the surface... or something to that effect.
    // Some RGB values fall a little below zero, so I've had to rectify that.
    return max(RGB, 0.)*pow(t*0.0004, 4.); 
}

// Surface bump function. Cheap, but with decent visual impact.
float bumpSurf3D( in vec3 p, in vec3 n ){
    
    // Placing raised box-like bumps all over the structure.
    p = abs(mod(p, 0.0625)-0.03125);
    float x = min(p.x,min(p.y,p.z))/0.03125;
    // More even alternative, but not the look I was after.
    //float x = (0.03125-max(p.x,max(p.y,p.z)))/0.03125*1.25;
    
    // More intricate detail.
    //x = sin(x*1.57+sin(x*1.57)*1.57)*0.5 + 0.5; 

    // Very, very lame, but cheap, smooth noise for a bit of roughness. The frequency is 
    // high and the amplitude is very low, so the details won't be discernible enough to 
    // necessitate a real noise algorithm.
    p = sin(p*380.+sin(p.yzx*192.+64.));
    float surfaceNoise = (p.x*p.y*p.z);

    return clamp(x + surfaceNoise*0.05, 0., 1.);//x*32. + //To accentuate x*2./0.03125, etc

}

// Standard function-based bump mapping function.
vec3 doBumpMap(in vec3 p, in vec3 nor, float bumpfactor){
    
    const float eps = 0.001;
    float ref = bumpSurf3D(p, nor);                 
    vec3 grad = vec3( bumpSurf3D(vec3(p.x-eps, p.y, p.z), nor)-ref,
                      bumpSurf3D(vec3(p.x, p.y-eps, p.z), nor)-ref,
                      bumpSurf3D(vec3(p.x, p.y, p.z-eps), nor)-ref )/eps;                     
          
    grad -= nor*dot(nor, grad);          
                      
    return normalize( nor + bumpfactor*grad );
	
}

// Shadertoy user FabriceNeyret2's "Crowded Pillars 3" inspired me to dig up some old
// "lattice with holes" code. Here's the link: https://www.shadertoy.com/view/4lfSDn
//
// The technique used here is pretty common: Produce two, or more, repeat field objects, 
// lattices - or whatever you'd like - at different repeat frequencies, then combine them 
// with either a standard operation (min(x1, x2), max(x1, -x2), etc) or something less 
// standard, like the one I've used below (sqrt(x1*x1+x2*x2)-.05). The possibilities are
// endless. Menger cubes, and the like, are constructed using a similar method.
//
// For anyone who wants to experiment, use one line from each of the three sections.
// There are 24 different combinations all up, and I've probably chosen the least
// interesting one. :)
float map(vec3 p){
 
    // SECTION 1
    //
    // Repeat field entity one, which is just some tubes repeated in all directions every 
    // two units, then combined with a smooth minimum function. Otherwise known as a lattice.
    p = mod(p, 2.)-1.;
    float x1 = sminP(length(p.xy),sminP(length(p.yz),length(p.xz), 0.25), 0.25)-0.5; // EQN 1
    //float x1 = sqrt(min(dot(p.xy, p.xy),min(dot(p.yz, p.yz),dot(p.xz, p.xz))))-0.5; // EQN 2
    //p = abs(p); float x1 = min(max(p.x, p.y),min(max(p.y, p.z),max(p.x, p.z)))-0.5; // EQN 3

    // SECTION 2
    //
    // Repeat field entity two, which is just an abstract object repeated every half unit. 
    p = abs(mod(p, 0.5)-0.25);
    float x2 = min(p.x,min(p.y,p.z)); // EQN 1
    //float x2 = min(max(p.x, p.y),min(max(p.y, p.z),max(p.x, p.z)))-0.125; //-0.175, etc. // EQN 2
    
    // SECTION 3
    //
    // Combining the two entities above.
    return sqrt(x1*x1+x2*x2)-.05; // EQN 1
    //return max(x1, x2)-.05; // EQN 2
    
}

// Standard ray marching function: I included some basic optimization notes. I know
// most of it is probably obvious to many, but I thought some might find it useful.
float raymarch(vec3 ro, vec3 rd) {
	
	// Surface distance and total ray distance.
	float d, t = 0.0;
    
    // More iterations means a chance to gain more accuracy, but should be the lowest
    // possible number that will render as many scene details as possible.
    for (int i = 0; i < 128; i++){
        // Surface distance.
        d = map(ro + rd *t);
        
        // If the distance is less than the surface distance threshold (sEPS), or 
        // further than the maximum ray distance threshold (FAR), exit.
        //
        // An early exit can mean the difference between, say, 20 map calls and the 
        // maximum iteration count (128, in this case). In general, you want the 
        // largest sEPS and smallest FAR value that will facilitate an accurate scene. 
        // Tweaking these two figures is an artform. sEPS values ranging from 0.001 
        // to 0.05 tend to work. However, smaller numbers can kill framerate, in some 
        // cases. I tend to favor 0.005 and 0.01. For the FAR value, it depends on 
        // the scene.
        if (d<sEPS || t>FAR) break;  
        
        // Add a portion of the surface distance (d) to the total ray distance (t).
        //
        // Sometimes, the ray can overshoot, so decreasing the jump distance "d" can 
        // help give more accuracy. Of course, the downside is more iterations,
        // which in turn, reduces framerate. Tweaking these numbers is also an artform.
        // Anywhere between 0.5 (if accuracy is really necessary) and 1.0 works for
        // me. 0.75 is a good compromise.
        t += d*0.75;
    }
    
    return t;
}

// Based on original by IQ.
float calculateAO(vec3 p, vec3 n){

    const float AO_SAMPLES = 5.0;
    float r = 0.0, w = 1.0, d;
    
    for (float i=1.0; i<AO_SAMPLES+1.1; i++){
        d = i/AO_SAMPLES;
        r += w*(d - map(p + n*d));
        w *= 0.5;
    }
    
    return 1.0-clamp(r,0.0,1.0);
}

// The iterations should be higher for proper accuracy, but in this case, the shadows are a subtle background feature.
float softShadow(vec3 ro, vec3 rd, float start, float end, float k){

    float shade = 1.0;
    const int maxIterationsShad = 16; // 24 or 32 would be better.

    // The "start" value, or minimum, should be set to something more than the stop-threshold, so as to avoid a collision with 
    // the surface the ray is setting out from. It doesn't matter how many times I write shadow code, I always seem to forget this.
    // If adding shadows seems to make everything look dark, that tends to be the problem.
    float dist = start;
    float stepDist = end/float(maxIterationsShad);

    // Max shadow iterations - More iterations make nicer shadows, but slow things down. Obviously, the lowest 
    // number to give a decent shadow is the best one to choose. 
    for (int i=0; i<maxIterationsShad; i++){
        // End, or maximum, should be set to the distance from the light to surface point. If you go beyond that
        // you may hit a surface not between the surface and the light.
        float h = map(ro + rd*dist);
        shade = min(shade, k*h/dist);
        
        // What h combination you add to the distance depends on speed, accuracy, etc. To be honest, I find it impossible to find 
        // the perfect balance. Faster GPUs give you more options, because more shadow iterations always produce better results.
        // Anyway, here's some posibilities. Which one you use, depends on the situation:
        // +=max(h, 0.001), +=clamp( h, 0.01, 0.25 ), +=min( h, 0.1 ), +=stepDist, +=min(h, stepDist*2.), etc.
        
        
        // I'm always torn between local shadowing (clamp(h, 0.0005, 0.2), etc) and accounting for shaowing from
        // distant objects all the way to the light source. If in doubt, local shadowing is probably best, but
        // here, I'm trying to do the latter.
        dist += clamp(h, 0.0005, stepDist*2.); // The best of both worlds... I think. 
        
        // There's some accuracy loss involved, but early exits from accumulative distance function can help.
        if (h<0.001 || dist > end) break; 
    }

    // I usually add a bit to the final shade value, which lightens the shadow slightly. It's a preference thing. Really dark
    // shadows look too brutal to me.
    return min(max(shade, 0.) + 0.4, 1.0); 
}

// Standard normal function.
vec3 getNormal(in vec3 p) {
	const float eps = 0.001;
	return normalize(vec3(
		map(vec3(p.x+eps,p.y,p.z))-map(vec3(p.x-eps,p.y,p.z)),
		map(vec3(p.x,p.y+eps,p.z))-map(vec3(p.x,p.y-eps,p.z)),
		map(vec3(p.x,p.y,p.z+eps))-map(vec3(p.x,p.y,p.z-eps))
	));

}

// Curvature function, which Shadertoy user Nimitz wrote. I've hard-coded this one to
// get just the range I want. Not very scientific at all.
//
// From an intuitive sense, the function returns a weighted difference between a surface 
// value and some surrounding values. Almost common sense... almost. :) If anyone 
// could provide links to some useful articles on the function, I'd be greatful.
//
// Original usage (I think?) - Cheap curvature: https://www.shadertoy.com/view/Xts3WM
// Other usage: Xyptonjtroz: https://www.shadertoy.com/view/4ts3z2
float curve(in vec3 p){

    vec2 e = vec2(-1., 1.)*0.05; //0.05->7. - 0.04->11. - 0.03->20.->0.1->2.
    
    float t1 = map(p + e.yxx), t2 = map(p + e.xxy);
    float t3 = map(p + e.xyx), t4 = map(p + e.yyy);
    
    return 7. * (t1 + t2 + t3 + t4 - 4.*map(p));
}

void mainImage( out vec4 outColor, in vec2 fragCoord )
{

    // Screen coordinates.
	vec2 uv = (fragCoord - iResolution.xy*0.5) / iResolution.y;
    
    // No camera setup. Just lazily heading straight to the unit direction vector.
    vec3 rd = normalize(vec3(uv, 0.5));
    //vec3 rd = normalize(vec3(uv, sqrt(1.-dot(uv, uv))*0.5)); // Mild fish lens, if you'd prefer.
    
    // Rotating the unit direction vector about the XY and XZ places for a bit of a look around.
    rd.xy *= rot(iTime*0.5);
    rd.xz *= rot(iTime*0.25); // Extra variance.
    
    // Ray origin. Set off linearly in the Z-direction. A bit of a lattice cliche, but effective.
    vec3 ro = vec3(0.0, 0.0, iTime*1.0);
    //vec3 ro = vec3(0.5 + iTime*0.7, 0.0, iTime*0.7); // Another lattice traversal cliche.
    
    // Light position. Rotated a bit, then placed a little above the viewing position.
    vec3 lp = vec3(0.0, 0.125, -0.125);
    lp.xy *= rot(iTime*0.5);
    lp.xz *= rot(iTime*0.25);
    lp += ro + vec3(0.0, 1.0, 0.0);
    
    // Initiate the scene color to black.
    vec3 sceneCol = vec3(0.);
    
    // Distance to the surface in the scene.
    float dist = raymarch(ro, rd);
    
    // If the surface has been hit, light it up.
    if (dist < FAR){

        // Surface point.
        vec3 sp = ro + rd*dist;
        
        // Surface normal.
        vec3 sn = getNormal(sp);
        
    	
	    // Standard function-based bump map - as opposed to texture bump mapping. It's possible to 
	    // taper the bumpiness (last term) with distance, using something like: 0.0125/(1.+dist*0.125).
	    sn = doBumpMap(sp, sn, 0.01);
    	
    	
	    // Light direction vector.
	    vec3 ld = lp-sp;

        // Object color at the surface point.
	    vec3 objCol = tex3D( uSampler, sp, sn );
	    // Using the bump function to shade the surface a bit more to enhance the bump mapping a little.
	    // Not mandatory, but I prefer it sometimes.
	    objCol *= bumpSurf3D(sp, sn)*0.5 + 0.5;
    	

	    float lDist = max(length(ld), 0.001); // Distance from the light to the surface point.
	    ld /= lDist; // Normalizing the light-to-surface, aka light-direction, vector.
	    float atten = min( 1.0 /( lDist*0.5 + lDist*lDist*0.1 ), 1.0 ); // Light falloff, or attenuation.
    	
	    float ambient = .25; //The object's ambient property. You can also have a global and light ambient property.
	    float diffuse = max( 0.0, dot(sn, ld) ); //The object's diffuse value.
	    float specular = max( 0.0, dot( reflect(-ld, sn), -rd) ); // Specular component.
	    specular = pow(specular, 8.0); // Ramping up the specular value to the specular power for a bit of shininess.
	    
	    // Soft shadows. I really cheaped out on the iterations, so the shadows are not accurate. Thankfully, 
	    // they're not a dominant feature, and everything's moving enough so that it's not really noticeable.
	    float shadow = softShadow(sp, ld, sEPS*2., lDist, 32.);
	    // Ambient occlusion.
        float ao = calculateAO(sp, sn)*0.5 + 0.5;
    	    
	    // Fresnel term. Good for giving a surface a bit of a reflective glow.
        //float fre = pow( clamp(dot(sn, rd) + 1., .0, 1.), 1.);
        

        #ifdef FIRE_REFLECTION
        // The firey reflection: Not very sophisticated. Use the relected vector to index into a
        // moving noisey texture, etc, to obtain a reflective shade value (refShade). Combine it
        // with the surface curvature (crv - higher curvature, more reflective heat... probably), 
        // then feed the result into a blackbody palette function to obtain the reflective color. 
        // It's mostly made up, with a tiny bit of science thrown in, so is not meant to be taken 
        // seriously.
        
        // Surface reflection vector.
        vec3 sf = reflect(rd, sn);
        
        // Curvature. This function belongs to Shadertoy user Nimitz.
	    float crv = clamp(curve(sp), 0., 1.);
        
        float refShade = getGrey(tex3D( uSampler, sp/4. + iTime/64., sf ));
        refShade = refShade*0.4 + max(dot(sf, vec3(0.166)), .0);
        vec3 refCol = blackbodyPalette(refShade*(crv*0.5+0.5));
        #endif

    	// Combining the terms from above in a pretty standard way to produce the final color.
	    sceneCol = objCol*(vec3(1., 0.97, 0.92)*diffuse + ambient)  + vec3(1.,0.9,0.92)*specular*0.75;
	    #ifdef FIRE_REFLECTION
	    // Add the subtle relected firey afterglow.
	    sceneCol += refCol; //*(diffuse + ambient + specular*0.75);
	    #endif
	    
	    // Shading the color.
	    sceneCol *= atten*ao*shadow;
	
	}

  	// Done! No gamma correction - I wouldn't recommend it. :)
	outColor = vec4(clamp(sceneCol, 0., 1.), 1);
}

void main() {
  vec4 textureColor = texture(uSampler, vTextureCoord) * vec4(1,1,1,1);
  // mainImage(outColor, vTextureCoord);
  // outColor.rgb += vec3(textureColor.rgb * vLightWeighting);
  mainImage(outColor, gl_FragCoord.xy);
  outColor.rgb *= vec3(textureColor.rgb * vLightWeighting);
}

`
}

buildinShaders.shaderTest = () => {
  return `${toyShader()}
 
  `
}
