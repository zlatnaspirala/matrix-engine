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

// .x = f(p)
// .y = ∂f(p)/∂x
// .z = ∂f(p)/∂y
// .yz = ∇f(p) with ‖∇f(p)‖ = 1
vec3 sdgBox(in vec2 p, in vec2 b, float ra) {
  vec2 w = abs(p) - (b - ra);
  vec2 s = vec2(p.x < 0.0f ? -1 : 1, p.y < 0.0f ? -1 : 1);

  float g = max(w.x, w.y);
  vec2 q = max(w, 0.0f);
  float l = length(q);

  return vec3((g > 0.0f) ? l - ra : g - ra, s * ((g > 0.0f) ? q / l : ((w.x > w.y) ? vec2(1, 0) : vec2(0, 1))));
}

void mainImage(out vec4 outColor, in vec2 fragCoord) {
  vec2 p = (2.0f * fragCoord - iResolution.xy) / iResolution.y;
  vec2 m = (2.0f * iMouse.xy - iResolution.xy) / iResolution.y;

  // corner radious
  float ra = 0.3f * (0.5f + 0.5f * sin(iTime * 1.7f));
  vec2 si = vec2(0.9f, 0.1f);

  // sdf(p) and gradient(sdf(p))
  vec3 dg = sdgBox(p, si, ra);
  float d = dg.x;
  vec2 g = dg.yz;

  // central differenes based gradient, for comparison
  // g = vec2(dFdx(d),dFdy(d))/(2.0/iResolution.y);

	// coloring
  vec3 col = (d > 0.0f) ? vec3(0.9f, 0.6f, 0.3f) : vec3(0.4f, 0.7f, 0.85f);
  col *= 1.0f + vec3(0.5f * g, 0.0f);
  // col = vec3(0.5+0.5*g,1.0);

  col *= 1.0f - 0.5f * exp(-16.0f * abs(d));

  // col *= 0.9f + 0.1f * cos(150.0f * d);

  col = mix(col, vec3(1.0f), 1.0f - smoothstep(0.0f, 0.01f, abs(d)));

  // interaction
  // if(iMouse.z > 0.001) {
  //   d = sdgBox(m, si, ra).x;
  //   col = mix(col, vec3(1.0, 1.0, 0.0), 1.0 - smoothstep(0.0, 0.005, abs(length(p - m) - abs(d)) - 0.0025));
  //   col = mix(col, vec3(1.0, 1.0, 0.0), 1.0 - smoothstep(0.0, 0.005, length(p - m) - 0.015));
  // }

  outColor = vec4(col, 1.0f);
}

void main() {
  vec4 textureColor = texture(uSampler, vTextureCoord) * vec4(1, 1, 1, 1);
  mainImage(outColor, gl_FragCoord.xy);
  // outColor.rgb *= vec3(textureColor.rgb * vLightWeighting);
}