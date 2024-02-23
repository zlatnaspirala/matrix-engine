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

out vec4 outColor;

float sdCircle(in vec2 p, in float r) {
  return length(p) - r;
}

void mainImage(out vec4 outColor, in vec2 fragCoord) {
  // 2 - center
  vec2 p = (2.0f * fragCoord - iResolution.xy) / iResolution.y;
  float d = sdCircle(p, 0.5f);
  // coloring
  vec3 col = (d > 0.0f) ? vec3(0.0f, 0.0f, 0.0f) : vec3(1.0f, 1.0f, 1.0f);
  outColor = vec4(col, 1.0f);
}

void main() {
  mainImage(outColor, gl_FragCoord.xy);
}