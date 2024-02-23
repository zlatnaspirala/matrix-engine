#version 300 es
precision highp float;
// Standard matrix-engine params
// Special combine matrix-engine VS out v_surfaceToLight - coming from spot lighr
// Origin found at from https://glslsandbox.com/e#109700.0
in vec2 vTextureCoord;
in vec3 v_surfaceToLight;
in vec3 vLightWeighting;
uniform sampler2D uSampler;

uniform vec2 iResolution;
uniform float iTime;
uniform float iTimeDelta;
uniform vec3 iMouse;

uniform float iXXX;

out vec4 outColor;

#define PI 3.14159265358979
#define N 10

vec3 circle(vec2 pos,float size,vec3 color){
	return color * size / distance(pos,v_surfaceToLight.yx);
}

void main(void){
	float t = iXXX * 0.001;
	float theta = 11.0 * iXXX * 0.02;
	float r = 0.6 * iXXX * 0.01;
	vec2 pos = vec2(0.0);
	vec3 color = vec3(0.0);
	for(int i=0; i<N; i++){
		float size = float(i) * 0.05;
		theta += PI / (float(N)*0.5);
		pos = vec2(cos(theta*t)*r,sin(theta-t)*r);
		vec3 c = vec3(0.0);
		c.r = 0.1 * cos(t*float(i));
		c.g = 0.1 * sin(t*float(i));
		c.b = 0.09 * sin(float(i));
		color += circle(pos,size,c);
	}

 
	outColor = vec4(color,1.0);
}