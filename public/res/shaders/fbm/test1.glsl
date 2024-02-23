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

// USED FROM https://www.youtube.com/watch?v=GALjY57ntsk&t=758s&ab_channel=SuperHi
// Not sure is full covered MIT licence must be checked
#define NUM_OCTAVES 5

float rand(vec2 n) {
  return fract(sin(dot(n, vec2(12.9898f, 4.1414f))) * 43758.5453f);
}

float noise(vec2 p) {
  vec2 ip = floor(p);
  vec2 u = fract(p);
  u = u * u * (3.0f - 2.0f * u);

  float res = mix(mix(rand(ip), rand(ip + vec2(1.0f, 0.0f)), u.x), mix(rand(ip + vec2(0.0f, 1.0f)), rand(ip + vec2(1.0f, 1.0f)), u.x), u.y);
  return res * res;
}

float fbm(vec2 x) {
  float v = 0.0f;
  float a = 0.5f;
  vec2 shift = vec2(100);
	// Rotate to reduce axial bias
  mat2 rot = mat2(cos(0.5f), sin(0.5f), -sin(0.5f), cos(0.50f));
  for(int i = 0; i < NUM_OCTAVES; ++i) {
    v += a * noise(x);
    x = rot * x * 2.0f + shift;
    a *= 0.5f;
  }
  return v;
}

void mainImage(out vec4 outColor, in vec2 fragCoord) {

  vec2 uv = vTextureCoord;
  uv.y = 1.0 - uv.y;

  float POWER = step(0.5f, uv.y);

  vec2 surface = POWER * vec2(
    mix(-0.3f, 0.3f, fbm(5.0f * uv + 0.5f * iR)),
    mix(-0.3f, 0.3f, fbm(5.0f * uv + 0.5f * iR)));

  uv += refract( vec2(0.0f,0.0f), surface , 1.0 / 1.333);

  vec4 color = texture (uSampler , uv);
  outColor = vec4(color.rgb, 1.0f);
}

void main() {
  vec4 textureColor = texture(uSampler, vTextureCoord) * vec4(1, 1, 1, 1);
  mainImage(outColor, gl_FragCoord.xy);
  // outColor.rgb *= vec3(textureColor.rgb * vLightWeighting);
}