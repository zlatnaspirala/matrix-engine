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
  float d2 = sdCircle(p, 0.2f);

  // first bigger radius case - other way invisible case...
  vec3 col = (d > 0.0f) ? vec3(iG, iG, iB) : vec3(iB, iG, iB);
  col = (d2 > 0.0f) ? vec3(iG, iR, iB) : vec3(iB, iR, iR);

  col *= 1.0f - exp(-6.0f * abs(d));
  col *= 1.0f - exp(-6.0f * abs(d2));

  outColor = vec4(col, 1.0f);
}

void main() {
  vec4 textureColor = texture(uSampler, vTextureCoord) * vec4(1, 1, 1, 1);
  mainImage(outColor, gl_FragCoord.xy);
  outColor.rgb *= vec3(textureColor.rgb * vLightWeighting);
}