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

// The MIT License
// Copyright © 2019 Inigo Quilez
// Distance to an oriented box.
// List of some other 2D distances: https://www.shadertoy.com/playlist/MXdSRf
// and iquilezles.org/articles/distfunctions2d

float sdOrientedBox(in vec2 p, in vec2 a, in vec2 b, float th) {
  float l = length(b - a);
  vec2 d = (b - a) / l;
  vec2 q = p - (a + b) * 0.5f;
  q = mat2(d.x, -d.y, d.y, d.x) * q;
  q = abs(q) - vec2(l * 0.5f, th);
  return length(max(q, 0.0f)) + min(max(q.x, q.y), 0.0f);
}

void mainImage(out vec4 outColor, in vec2 fragCoord) {
    // normalized pixel coordinates
  vec2 p = (2.0f * fragCoord - iResolution.xy) / iResolution.y;
  vec2 m = (2.0f * iMouse.xy - iResolution.xy) / iResolution.y;

  p *= 1.7f;
  m *= 1.f;

  // animation
  vec2 v1 = cos(iXXX * 0.5f + vec2(0.0f, 1.00f) + 0.0f);
  vec2 v2 = cos(0.0f * 0.5f + vec2(0.0f, 3.00f) + 1.5f);
  float th = 0.3f * (0.5f + 0.5f * cos(0.0f * 1.1f + 1.0f));

  float d = sdOrientedBox(p, v1, v2, th);

    // distance
  vec3 col = vec3(1.0f) - sign(d) * vec3(0.1f, 0.4f, 0.7f);
  col *= 1.0f - exp(-6.0f * abs(d));
  // col *= 0.8f + 0.2f * cos(120.0f * d);
  col = mix(col, vec3(1.0f), 1.0f - smoothstep(0.0f, 0.015f, abs(d)));

  // if(iMouse.z > 0.001f) {
  //   d = sdOrientedBox(m, v1, v2, th);
  //   col = mix(col, vec3(1.0f, 1.0f, 0.0f), 1.0f - smoothstep(0.0f, 0.005f, abs(length(p - m) - abs(d)) - 0.0025f));
  //   col = mix(col, vec3(1.0f, 1.0f, 0.0f), 1.0f - smoothstep(0.0f, 0.005f, length(p - m) - 0.015f));
  // }

  outColor = vec4(col, 1.0f);
}

void main() {
  vec4 textureColor = texture(uSampler, vTextureCoord) * vec4(1, 1, 1, 1);
  mainImage(outColor, gl_FragCoord.xy);
  // outColor.rgb *= vec3(textureColor.rgb * vLightWeighting);
}