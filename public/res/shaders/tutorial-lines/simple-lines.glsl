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
  float clrFactor = 0.0f;
  // only used for tickness
  float tickness = 3.0f / max(iResolution.x, iResolution.y);
  float r = distance(uv, pt1) / distance(pt1, pt2);
  // if desired Hypothetical circle in range of vector(pt2,pt1)
  if(r <= 1.0f) 
  {
    // ptc = connection point of Hypothetical circle and line calculated with interpolation
    vec2 ptc = mix(pt1, pt2, r);
    // distance betwenn current pixel (uv) and ptc
    float dist = distance(ptc, uv);
    if(dist < tickness / 2.0f) {
      clrFactor = 1.0f;
    }
  }
  return clrFactor;
}

void main() {
  vec2 uv = gl_FragCoord.xy / iResolution.xy; // current point
  // uv = current pixel
  //   0 < uv.x < 1 , 0 < uv.x < 1
  //   left-down= (0,0)
  //   right-top= (1,1)
  vec2 pt1 = vec2(0.1f, 0.1f);
  vec2 pt2 = vec2(0.8f, 0.7f);
  vec2 pt11 = vec2(0.2f, 0.2f);
  vec2 pt21 = vec2(0.6f, 0.8f);

  float lineFactor = line(uv, pt1, pt2, iResolution.xy);
  float lineFactor1 = line(uv, pt11, pt21, iResolution.xy);
  vec3 color = vec3(.5f, 0.7f, 1.0f);

  outColor = vec4(color * lineFactor, 1.f);
  outColor += vec4(color * lineFactor1, 1.f);
  // outColor.rgb *= color * lineFactor1;
}