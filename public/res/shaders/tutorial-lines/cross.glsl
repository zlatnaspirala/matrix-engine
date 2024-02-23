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

vec3 sdgCross(in vec2 p, in vec2 b) {
  vec2 s = sign(p);

  p = abs(p);

  vec2 q = ((p.y > p.x) ? p.yx : p.xy) - b;
  float h = max(q.x, q.y);
  vec2 o = max((h < 0.0f) ? vec2(b.y - b.x, 0.0f) - q : q, 0.0f);
  float l = length(o);

  vec3 r = (h < 0.0f && -q.x < l) ? vec3(-q.x, 1.0f, 0.0f) : vec3(l, o / l);

  return vec3(sign(h) * r.x, s * ((p.y > p.x) ? r.zy : r.yz));
}

void mainImage(out vec4 outColor, in vec2 fragCoord) {

  vec2 p2 = (2.0f * fragCoord - iResolution.xy) / iResolution.y;

    // size
  vec2 si = 0.5f + 0.3f * cos(iTime + vec2(0.0f, 1.57f) + 0.0f);
  if(si.x < si.y)
    si = si.yx;
    // corner radious
  float ra = 0.0f;//0.1*(0.5+0.5*sin(iTime*1.2));

    // sdf(p) and gradient(sdf(p))
  vec3 dg = sdgCross(p2, si);
  float nik = dg.x - ra;
  vec2 g = dg.yz;

    // central differenes based gradient, for comparison
    // g = vec2(dFdx(d),dFdy(d))/(2.0/iResolution.y);

	// coloring
  vec3 col3 = (d > 0.0f) ? vec3(0.9f, 0.6f, 0.3f) : vec3(0.4f, 0.7f, 0.85f);
  col3 *= 1.0f + vec3(0.5f * g, 0.0f);
  col3 *= 1.0f - 0.5f * exp(-16.0f * abs(d));
  col3 *= 0.9f + 0.1f * cos(150.0f * d);
  col3 = mix(col2, vec3(1.0f), 1.0f - smoothstep(0.0f, 0.01f, abs(nik)));
}

void main() {
  vec4 textureColor = texture(uSampler, vTextureCoord) * vec4(1, 1, 1, 1);
  mainImage(outColor, gl_FragCoord.xy);
  // outColor.rgb *= vec3(textureColor.rgb * vLightWeighting);
}