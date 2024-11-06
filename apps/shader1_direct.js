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
import {toyShaderHeader, standardMEShaderDrawer} from "../lib/optimizer/buildin-shaders.js";

const scriptManager = matrixEngine.utility.scriptManager;

export var runThis = world => {
  var textuteImageSamplers = {
    source: ["res/images/complex_texture_1/diffuse.webp"],
    mix_operation: "multiply",
  }
  world.Add("cubeLightTex", 1, "ToyShader", textuteImageSamplers);

  canvas.addEventListener('mousedown', (ev) => {
    matrixEngine.raycaster.checkingProcedure(ev);
  });
  
  addEventListener("ray.hit.event", function(e) {
    e.detail.hitObject.LightsData.ambientLight.r =
      matrixEngine.utility.randomFloatFromTo(0, 2);
    e.detail.hitObject.LightsData.ambientLight.g =
      matrixEngine.utility.randomFloatFromTo(0, 2);
    e.detail.hitObject.LightsData.ambientLight.b =
      matrixEngine.utility.randomFloatFromTo(0, 2);
    // console.info(e.detail);
  });

  var myShader = {};
  myShader.initDefaultFSShader = () => {
    return `${toyShaderHeader()}
    // The MIT License
    // Copyright © 2020 Inigo Quilez
    // https://www.youtube.com/c/InigoQuilez
    // https://iquilezles.org/
    // Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions: The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software. THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

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

  App.scene.ToyShader.rotation.rotationSpeed.y = 55
  App.scene.ToyShader.glBlend.blendEnabled = false
  
  App.scene.ToyShader.type = "custom-"
  var now = 1, time1 = 0, then1 = 0;
  App.scene.ToyShader.addExtraDrawCode = function (world, object) {
    now = Date.now();
    now *= 0.001;
    const elapsedTime = Math.min(now - then1, 0.1);
    time1 += elapsedTime;
    world.GL.gl.uniform2f(object.shaderProgram.resolutionLocation, world.GL.gl.canvas.width, world.GL.gl.canvas.height);
    world.GL.gl.uniform1f(object.shaderProgram.TimeDelta, time1);
    world.GL.gl.uniform1f(object.shaderProgram.timeLocation, time1);
  }
  App.scene.ToyShader.drawCustom = function (o) {
    return standardMEShaderDrawer(o);
  }
}