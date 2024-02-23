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
uniform int iAppStatus;

out vec4 outColor;

float sdOrientedBox(in vec2 p, in vec2 a, in vec2 b, float th) {
  float l = length(b - a);
  vec2 d = (b - a) / l;
  vec2 q = p - (a + b) * 0.5f;
  q = mat2(d.x, -d.y, d.y, d.x) * q;
  q = abs(q) - vec2(l * 0.5f, th);
  return length(max(q, 0.0f)) + min(max(q.x, q.y), 0.0f);
}

vec3 getColors (float d_2) {
  vec3 col2 = vec3(1.0f) - sign(d_2) * vec3(0.1f, 0.4f, 0.7f);
  col2 *= 1.0f - exp(-4.0f * abs(d_2));
  col2 = mix(col2, vec3(1.0f), 1.0f - smoothstep(0.0f, 0.015f, abs(d_2)));
  return col2;
}

void mainImage(out vec4 outColor, in vec2 fragCoord) {
  // normalized pixel coordinates
  vec2 p = (2.0f * fragCoord - iResolution.xy) / iResolution.y;
  vec2 m = (2.0f * iMouse.xy - iResolution.xy) / iResolution.y;

  p.xy *=0.7f;
  m *= 0.2f;

  // animation
  vec2 v1 = cos(vec2(1.56f, 1.3f));
  vec2 v2 = cos(vec2(1.4f, 1.8f));
  float th = 0.1f * (0.2f + iB * cos(0.0f * 1.1f + 1.0f));
  float d = sdOrientedBox(p, v1, v2, th);

  vec2 v1_2 = cos(vec2(1.56f, 1.3f) );
  vec2 v2_2 = cos(vec2(1.7f, 1.8f) );
  float d_2 = sdOrientedBox(p, v1_2, v2_2, th);

  vec2 v1_3 = cos(vec2(1.45f, 1.55f) );
  vec2 v2_3 = cos(vec2(1.7f, 1.77f) );
  float d_3 = sdOrientedBox(p, v1_3, v2_3, th);

  // distance 1
  vec3 col =  getColors(d);
  // distance 2
  vec3 col2 = getColors(d_2);
  vec3 col3 = getColors(d_3);
  col = mix(col, col2, 0.5f);
  // col = mix(col, col3, 0.5f);

  outColor = vec4(col, 1.0f);

  outColor += vec4(col3, 1.0f);
}

void main() {
  vec4 textureColor = texture(uSampler, vTextureCoord) * vec4(1, 1, 1, 1);
  if (iAppStatus > 1) {
    outColor.rgb = vec3(textureColor.rgb * vLightWeighting);
  } else {
    mainImage(outColor, gl_FragCoord.xy);
  }
}