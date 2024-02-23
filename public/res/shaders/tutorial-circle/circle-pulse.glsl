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

in vec3 meVertexPosition;

out vec4 outColor;

float sdCircle(in vec2 p, in float r) {
  return length(p) - r;
}

void mainImage(out vec4 outColor, in vec2 fragCoord) {
  // vec2 p = (2.0f * fragCoord - iResolution.xy) / iResolution.y;
  vec2 p = (meVertexPosition.xy);

  vec2 m = (2.0f * iMouse.xy - iResolution.xy) / iResolution.y;
  float d = sdCircle(p, 0.7f);
  // coloring
  vec3 col = (d > 0.0f) ? vec3(0.9f, 0.6f, 0.3f) : vec3(0.65f, 0.85f, 1.0f);

  // addind waves - iXXX is OSC[from1 to 150 step 1]
  col *= 0.8f + 0.2f * cos(iXXX * d);

  col *= 1.0f - exp(-6.0f * abs(d));
  outColor = vec4(col, 1.0f);
}

void main() {
  vec4 textureColor = texture(uSampler, vTextureCoord) * vec4(1, 1, 1, 1);
  mainImage(outColor, gl_FragCoord.xy);
  outColor.rgb *= vec3(textureColor.rgb * vLightWeighting);
}