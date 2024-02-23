#version 300 es
precision highp float;
// Standard matrix-engine params
in vec2 vTextureCoord;
in vec3 vLightWeighting;
uniform sampler2D uSampler;

uniform vec2 iResolution;
uniform float iTime;
uniform float iTimeDelta;
uniform vec3 iMouse;

uniform float iXXX;
uniform float iR;
uniform float iG;
uniform float iB;

out vec4 outColor;

vec3 hash3(vec2 p) {
  vec3 q = vec3(dot(p, vec2(127.1f, 311.7f)), dot(p, vec2(269.5f, 183.3f)), dot(p, vec2(419.2f, 371.9f)));
  return fract(sin(q) * 43758.5453f);
}

float voronoise(in vec2 p, float u, float v) {
  float k = 1.0f + 63.0f * pow(1.0f - v, 6.0f);

  vec2 i = floor(p);
  vec2 f = fract(p);

  vec2 a = vec2(0.0f, 0.0f);
  for(int y = -2; y <= 2; y++) for(int x = -2; x <= 2; x++) {
      vec2 g = vec2(x, y);
      vec3 o = hash3(i + g) * vec3(u, u, 1.0f);
      vec2 d = g - f + o.xy;
      float w = pow(1.0f - smoothstep(0.0f, 1.414f, length(d)), k);
      a += vec2(o.z * w, w);
    }

  return a.x / a.y;
}

void mainImage(out vec4 outColor, in vec2 fragCoord) {
  vec2 uv = fragCoord / iResolution.xx;

  vec2 p = 0.5f - 0.5f * cos(iTime + vec2(0.0f, 2.0f));

  // if(iMouse.w > 0.001f)
  //   p = vec2(0.0f, 1.0f) + vec2(1.0f, -1.0f) * iMouse.xy / iResolution.xy;

  p = p * p * (3.0f - 2.0f * p);
  p = p * p * (3.0f - 2.0f * p);
  p = p * p * (3.0f - 2.0f * p);

  float f = voronoise(24.0f * uv, p.x, p.y);

  outColor = vec4(f, f, f, 1.0f);
}

void main() {
  vec4 textureColor = texture(uSampler, vTextureCoord) * vec4(1, 1, 1, 1);
  mainImage(outColor, gl_FragCoord.xy);
  outColor.rgb *= vec3(textureColor.rgb * vLightWeighting);
}