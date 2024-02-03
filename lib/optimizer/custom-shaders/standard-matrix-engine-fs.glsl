#version 300 es
precision mediump float;
in vec2 vTextureCoord;
in vec3 vLightWeighting;
uniform sampler2D uSampler;
uniform sampler2D uSampler1;
uniform sampler2D uSampler2;
uniform sampler2D uSampler3;
uniform sampler2D uSampler4;
uniform sampler2D uSampler5;
// The CubeMap texture.
uniform samplerCube u_texture;
// cube map
// in vec3 v_normal_cubemap;
uniform float numberOfsamplers;

// Spot
// Passed in from the vertex shader.
in vec3 v_normal;
in vec3 v_surfaceToLight;
in vec3 v_surfaceToView;
uniform vec4 u_color;
uniform float u_shininess;
uniform vec3 u_lightDirection;
uniform float u_innerLimit;
uniform float u_outerLimit;

out vec4 outColor;

void main(void) {
  // because v_normal is a varying it's interpolated
  // so it will not be a unit vector. Normalizing it
  // will make it a unit vector again
  vec3 normal = normalize(v_normal);

  vec3 surfaceToLightDirection = normalize(v_surfaceToLight);
  vec3 surfaceToViewDirection = normalize(v_surfaceToView);
  vec3 halfVector = normalize(surfaceToLightDirection + surfaceToViewDirection);

  float dotFromDirection = dot(surfaceToLightDirection, -u_lightDirection);
  float limitRange = u_innerLimit - u_outerLimit;
  float inLight = clamp((dotFromDirection - u_outerLimit) / limitRange, 0.0f, 1.0f);
  float light = inLight * dot(normal, surfaceToLightDirection);
  float specular = inLight * pow(dot(normal, halfVector), u_shininess);

  // Directioin vs uAmbientColor
  vec4 textureColor = texture2D(uSampler, vec2(vTextureCoord.s, vTextureCoord.t));
  vec4 textureColor1 = texture2D(uSampler1, vec2(vTextureCoord.s, vTextureCoord.t));
  vec4 textureColor2 = texture2D(uSampler2, vec2(vTextureCoord.s, vTextureCoord.t));
  vec4 testUnused = texture2D(u_texture, vec2(vTextureCoord.s, vTextureCoord.t));

  outColor = vec4(textureColor.rgb * vLightWeighting, textureColor.a);
  // Lets multiply just the color portion (not the alpha)
  outColor.rgb *= light;
  outColor.rgb += specular;
}