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

#define Thickness 0.003

float line(vec2 uv, vec2 pt1, vec2 pt2, vec2 iResolution) {
  float clrFactor = 0.01f;
  float tickness = 3.0f / max(iResolution.x, iResolution.y);
  float r = distance(uv, pt1) / distance(pt1, pt2);
  if(r <= 1.0f) {
    vec2 ptc = mix(pt1, pt2, r);
    float dist = distance(ptc, uv);
    if(dist < tickness / 2.0f) {
      clrFactor = 1.0f;
    }
  }
  return clrFactor;
}

void main() {
  vec2 uv = gl_FragCoord.xy / iResolution.xy;
  vec3 color = vec3(1.0f, 0.2f, 1.0f);
  // float sum = 0.0f;
  for(float i = 0.0f; i < 1.0f; i=i+0.02f) {
    vec2 p1 = vec2(-0.5f + iG + i*1.0, 0.0f);
    vec2 p2 = vec2(-0.5f + iG + i*1.0,  1.f );
    float lineLeft = line(uv, p1, p2, iResolution.xy);
    outColor += vec4(color * lineLeft, 1.f);

    vec2 p11 = vec2(1.5f - iR - i*1.0, 0.0f);
    vec2 p21 = vec2(1.5f - iR - i*1.0,  1.f );
    float lineRight = line(uv, p11, p21, iResolution.xy);
    outColor += vec4(color * lineRight, 1.f);

    if(i >= 3.0f) { break; }
  }
  vec4 textureColor = texture(uSampler, vTextureCoord) * vec4(1, 1, 1, 1);
  outColor.rgb *= vec3(textureColor.rgb * vLightWeighting);
}