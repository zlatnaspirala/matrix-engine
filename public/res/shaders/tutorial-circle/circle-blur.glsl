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

float sdCircle(in vec2 p, in float r) {
  return length(p) - r;
}

void mainImage(out vec4 outColor, in vec2 fragCoord) {

  vec2 p = (2.0f * fragCoord - iResolution.xy) / iResolution.y;

  float d = sdCircle(p, 0.5f);
  vec3 col = (d > 0.0f) ? vec3(iR, iB, iB) : vec3(iB, iG, iR);
  col *= 1.0f - exp(-6.0f * abs(d));

  outColor = vec4(col, 1.0f);
}

void main() {
  vec4 textureColor = texture(uSampler, vTextureCoord) * vec4(1, 1, 1, 1);
  mainImage(outColor, gl_FragCoord.xy);
  outColor.rgb *= vec3(textureColor.rgb * vLightWeighting);
}