#version 300 es
precision highp float;
// Standard matrix-engine params
in vec2 vTextureCoord;
in vec3 vLightWeighting;
uniform sampler2D uSampler;

// Standard matrix-engine CUSTOM shader params
uniform float[16] myshaderDrawData;

uniform vec2 iResolution;
uniform float iTime;
uniform float iTimeDelta;
uniform vec3 iMouse;

uniform float iXXX;
uniform float iR;
uniform float iG;
uniform float iB;

in vec3 meVertexPosition;

out vec4 outColor;

#define Thickness 0.003

float line(vec2 uv, vec2 pt1, vec2 pt2, vec2 iResolution) {
  float clrFactor = 0.1f;
  float tickness = iXXX * 0.1f / max(iResolution.x, iResolution.y);
  float r = distance(uv, pt1) / distance(pt1, pt2);

  float r2 = distance(uv, pt2) / distance(pt2, pt1);

  if(r <= .90f && r2 <= 0.90f) {
    vec2 ptc = mix(pt1, pt2, r);
    float dist = distance(ptc, uv);
    if(dist < tickness / 2.0f) {
      clrFactor = 2.0f;
    }
  }
  return clrFactor;
}

// for matrix-engine - loading strip line data.
void createStripLines(out vec4 outColor, vec2[16] mePoints) {
  vec2 uv = gl_FragCoord.xy / iResolution.xy;
  vec3 color = vec3(.5f, 0.7f, 1.0f);
  for(int i = 0; i < mePoints.length();i = i + 2) {
    // int i = 0;
    float lf = line(uv, mePoints[i], mePoints[i+1], meVertexPosition.xy);
    outColor += vec4(color * lf, 1.f);
  }
}

// for matrix-engine - loading strip line data.
// For no no solution for SIZE ARRAY - must be adaptedd manually
void createStripLinesF(out vec4 outColor, in float[16] mePoints) {
  // vec2 uv = gl_FragCoord.xy / iResolution.xy;
  vec2 uv = meVertexPosition.xy;
  vec3 color = vec3(.5f, 0.7f, 1.0f);
  for(int i = 0; i < mePoints.length();i = i + 4) {
    // int i = 0;
    float lf = line(uv, vec2(mePoints[i], mePoints[i+1]), vec2(mePoints[i+2], mePoints[i+3]), meVertexPosition.xy);
    outColor += vec4(color * lf, 1.f);
  }
}

void main() {
  // INLINE DATA
  vec2 pt1 = vec2(0.5f, 0.7f);
  vec2 pt2 = vec2(0.5f, 0.3f);
  // vec2 pt11 = vec2(0.38f, 0.5f);
  // vec2 pt21 = vec2(0.38f, 0.5f);
  vec2 pt12 = vec2(0.3f, 0.66f);
  vec2 pt22 = vec2(0.8f, 0.66f);
  // vec2 pt13 = vec2(0.64f, 0.65f);
  // vec2 pt23 = vec2(0.48f, 0.46f);
  // GLSL 1.2/1.3 support
  // const float mePoints[4] = float[4](0.5f, 0.7f, 0.62f, 0.3f);
  // vec2 mePoints[] = vec2[6](pt1, pt2, pt12, pt22, pt13, pt23);
  // INLINE DATA
  vec2 mePoints[] = vec2[4](pt1, pt2, pt12, pt22);
  // Draw from shader inline data
  // createStripLines(outColor, mePoints);

  // Draw from uniforms (from program)
  // FROM UNIFORM - From program (js)
  createStripLinesF(outColor, myshaderDrawData);

  // Mix with standard matrix-engine texture sampler
  vec4 textureColor = texture(uSampler, vTextureCoord) * vec4(1, 1, 1, 1);
  outColor.rgb *= vec3(textureColor.rgb * vLightWeighting);
}