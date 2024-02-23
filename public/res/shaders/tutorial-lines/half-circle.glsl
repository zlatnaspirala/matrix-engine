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
// sca is the sin/cos of the orientation
// scb is the sin/cos of the aperture
vec3 sdgArc(in vec2 p, in vec2 sca, in vec2 scb, in float ra, in float rb) {
  vec2 q = p;

  mat2 ma = mat2(sca.x, -sca.y, sca.y, sca.x);
  p = ma * p;

  float s = sign(p.x);
  p.x = abs(p.x);

  if(scb.y * p.x > scb.x * p.y) {
    vec2 w = p - ra * scb;
    float d = length(w);
    return vec3(d - rb, vec2(s * w.x, w.y) * ma / d);
  } else {
    float l = length(q);
    float w = l - ra;
    return vec3(abs(w) - rb, sign(w) * q / l);
  }
}

#define AA 2

void mainImage(out vec4 outColor, in vec2 fragCoord) {
  vec3 tot = vec3(0.0f);

  #if AA>1
  for(int m = 0; m < AA; m++) for(int n = 0; n < AA; n++) {
        // pixel coordinates
      vec2 o = vec2(float(m), float(n)) / float(AA) - 0.5f;
      vec2 p = (-iResolution.xy + 2.0f * (fragCoord + o)) / iResolution.y;
        #else    
      vec2 p = (-iResolution.xy + 2.0f * fragCoord) / iResolution.y;
        #endif

        // animation
      float ta = 3.14f * (0.5f + 0.5f * cos(iTime * 0.52f + 2.0f));

      float tb = 3.14f * (0.5f + 0.5f * cos(1.0f * 0.31f + 2.0f));
        // 
      float rb = 0.15f * (0.5f + 0.5f * cos(1.0f * 0.41f + 1.0f));

        // sdf(p) and gradient(sdf(p))
      vec3 dg = sdgArc(p, vec2(sin(ta), cos(ta)), vec2(sin(tb), cos(tb)), 0.5f, rb);
      float d = dg.x;
      vec2 g = dg.yz;

        // central differenes based gradient, for comparison
        // g = vec2(dFdx(d),dFdy(d))/(2.0/iResolution.y);

        // coloring
      vec3 col = (d > 0.0f) ? vec3(0.9f, 0.6f, 0.3f) : vec3(0.4f, 0.7f, 0.85f);
      col *= 1.0f + vec3(0.5f * g, 0.0f);
        // col = vec3(0.5+0.5*g,1.0);
      col *= 1.0f - 0.5f * exp(-16.0f * abs(d));
        // waves
      col *= 0.9f + 0.1f * cos(150.0f * d);
      col = mix(col, vec3(1.0f), 1.0f - smoothstep(0.0f, 0.01f, abs(d)));

      tot += col;
    #if AA>1
    }
  tot /= float(AA * AA);
    #endif

  outColor = vec4(tot, 1.0f);
}

void main() {
  vec4 textureColor = texture(uSampler, vTextureCoord) * vec4(1, 1, 1, 1);
  mainImage(outColor, gl_FragCoord.xy);
  outColor.rgb *= vec3(textureColor.rgb * vLightWeighting);
}