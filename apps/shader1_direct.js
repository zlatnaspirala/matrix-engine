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
import {toyShader, standardMatrixEngineShader} from "../lib/optimizer/buildin-shaders.js";

const scriptManager = matrixEngine.utility.scriptManager;

export var runThis = world => {
  var textuteImageSamplers = {
    source: ["res/images/complex_texture_1/diffuse.png"],
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
    return `${toyShader()}

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
    return standardMatrixEngineShader(o);
  }
}