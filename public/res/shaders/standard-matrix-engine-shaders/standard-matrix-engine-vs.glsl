#version 300 es
in vec3 aVertexPosition;
in vec3 aVertexNormal;
in vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat3 uNMatrix;
uniform vec3 uAmbientColor;
uniform vec3 uLightingDirection;
uniform vec3 uDirectionalColor;
uniform bool uUseLighting;
out vec2 vTextureCoord;
out vec3 vLightWeighting;

// Spot
uniform vec3 u_lightWorldPosition;
out vec3 v_normal;
// out vec3 v_normal_cubemap;
out vec3 v_surfaceToLight;
out vec3 v_surfaceToView;

// Specular
out mat4 uMVMatrixINTER;
out mat3 uNMatrixINTER;
out mat4 uPMatrixINNTER;

in vec4 specularColor;
out vec4 vColor;
out vec3 vNormal;
out vec4 vPosition;
out float vDist;

void main(void) {
  uMVMatrixINTER = uMVMatrix;
  uNMatrixINTER = uNMatrix;
  uPMatrixINNTER = uPMatrix;

  // GLOBAL POS SPECULAR
  vColor = specularColor;
  vNormal = normalize(uNMatrix * vec3(aVertexNormal));
  // Calculate the modelView of the model, and set the vPosition
  // mat4 modelViewMatrix = uViewMatrix * uModelMatrix;
  vPosition = uMVMatrix * vec4(1, 1, 1, 1);
  vDist = gl_Position.w;

  // SPOT
  // orient the normals and pass to the fragment shader
  v_normal = mat3(uNMatrix) * aVertexNormal;

  // normalize
  // v_normal_cubemap = normalize(aVertexPosition.xyz);

  // compute the world position of the surfoace
  vec3 surfaceWorldPosition = (uNMatrix * aVertexPosition).xyz;

  // compute the vector of the surface to the light
  // and pass it to the fragment shader
  v_surfaceToLight = u_lightWorldPosition - surfaceWorldPosition;

  // compute the vector of the surface to the view/camera
  // and pass it to the fragment shader
  v_surfaceToView = (uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0f)).xyz - surfaceWorldPosition;

  gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0f);
  vTextureCoord = aTextureCoord;

  if(!uUseLighting) {
    vLightWeighting = vec3(1.0f, 1.0f, 1.0f);
  } else {
    vec3 transformedNormal = uNMatrix * aVertexNormal;
    float directionalLightWeighting = max(dot(transformedNormal, uLightingDirection), 0.0f);
    vLightWeighting = uAmbientColor + uDirectionalColor * directionalLightWeighting;
  }
}