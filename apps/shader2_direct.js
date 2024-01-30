/**
 * @Author Nikola Lukic
 * @Description Matrix Engine Api Example.
 * First time adding direct different FShader.
 * Also mix divine two shader variants...
 */
import App from "../program/manifest.js";
import * as matrixEngine from "../index.js";
import {toyShader, standardMatrixEngineShader} from "../lib/optimizer/buildin-shaders.js";

const scriptManager = matrixEngine.utility.scriptManager;

export var runThis = world => {
  var textuteImageSamplers = {
    source: ["res/images/complex_texture_1/diffuse.png"],
    mix_operation: "multiply",
  }
  world.Add("cubeLightTex", 1, "ToyShader", textuteImageSamplers);

  var myShader = {};
  myShader.initDefaultFSShader = () => {
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
        // outColor.rgb += vec3(textureColor.rgb * vLightWeighting);
        mainImage(outColor, gl_FragCoord.xy);
        // outColor.rgb *= vec3(textureColor.rgb * vLightWeighting);
      }
    `;
  }

  scriptManager.LOAD(myShader.initDefaultFSShader(), "custom-shader-fs", "x-shader/x-fragment", "shaders", () => {
    App.scene.ToyShader.shaderProgram = world.initShaders(world.GL.gl, 'custom' + '-shader-fs', 'cubeLightTex' + '-shader-vs');
  })

  App.scene.ToyShader.rotation.rotationSpeed.y = 55
  App.scene.ToyShader.glBlend.blendEnabled = false

  App.scene.ToyShader.type = "custom-";
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
    return standardMatrixEngineShader(o);
  }
}