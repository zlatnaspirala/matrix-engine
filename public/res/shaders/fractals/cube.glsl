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
// https://www.youtube.com/c/InigoQuilez
// https://iquilezles.org/
// Copyright © 2013 Inigo Quilez
// Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions: The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software. THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

// https://iquilezles.org/articles/menger


#define AA 1


float maxcomp(in vec3 p ) { return max(p.x,max(p.y,p.z));}
float sdBox( vec3 p, vec3 b )
{
    vec3  di = abs(p) - b;
    float mc = maxcomp(di);
    return min(mc,length(max(di,0.0)));
}

vec2 iBox( in vec3 ro, in vec3 rd, in vec3 rad ) 
{
    vec3 m = 1.0/rd;
    vec3 n = m*ro;
    vec3 k = abs(m)*rad;
    vec3 t1 = -n - k;
    vec3 t2 = -n + k;
	return vec2( max( max( t1.x, t1.y ), t1.z ),
	             min( min( t2.x, t2.y ), t2.z ) );
}

const mat3 ma = mat3( 0.60, 0.00,  0.80,
                      0.00, 1.00,  0.00,
                     -0.80, 0.00,  0.60 );
vec4 map( in vec3 p )
{
    float d = sdBox(p,vec3(1.0));
    vec4 res = vec4( d, 1.0, 0.0, 0.0 );

    float ani = smoothstep( -0.2, 0.2, -cos(0.5*iTime) );
	float off = 1.5*sin( 0.01*iTime );
	
    float s = 1.0;
    for( int m=0; m<4; m++ )
    {
        p = mix( p, ma*(p+off), ani );
	   
        vec3 a = mod( p*s, 2.0 )-1.0;
        s *= 3.0;
        vec3 r = abs(1.0 - 3.0*abs(a));
        float da = max(r.x,r.y);
        float db = max(r.y,r.z);
        float dc = max(r.z,r.x);
        float c = (min(da,min(db,dc))-1.0)/s;

        if( c>d )
        {
          d = c;
          res = vec4( d, min(res.y,0.2*da*db*dc), (1.0+float(m))/4.0, 0.0 );
        }
    }

    return res;
}

vec4 intersect( in vec3 ro, in vec3 rd )
{
    vec2 bb = iBox( ro, rd, vec3(1.05) );
    if( bb.y<bb.x ) return vec4(-1.0);
    
    float tmin = bb.x;
    float tmax = bb.y;
    
    float t = tmin;
    vec4 res = vec4(-1.0);
    for( int i=0; i<64; i++ )
    {
        vec4 h = map(ro + rd*t);
		if( h.x<0.002 || t>tmax ) break;
        res = vec4(t,h.yzw);
        t += h.x;
    }
	if( t>tmax ) res=vec4(-1.0);
    return res;
}

float softshadow( in vec3 ro, in vec3 rd, float mint, float k )
{
    vec2 bb = iBox( ro, rd, vec3(1.05) );
    float tmax = bb.y;
    
    float res = 1.0;
    float t = mint;
    for( int i=0; i<64; i++ )
    {
        float h = map(ro + rd*t).x;
        res = min( res, k*h/t );
        if( res<0.001 ) break;
		t += clamp( h, 0.005, 0.1 );
        if( t>tmax ) break;
    }
    return clamp(res,0.0,1.0);
}

vec3 calcNormal(in vec3 pos)
{
    vec3 eps = vec3(.001,0.0,0.0);
    return normalize(vec3(
    map(pos+eps.xyy).x - map(pos-eps.xyy).x,
    map(pos+eps.yxy).x - map(pos-eps.yxy).x,
    map(pos+eps.yyx).x - map(pos-eps.yyx).x ));
}

vec3 render( in vec3 ro, in vec3 rd )
{
    // background color
    vec3 col = mix( vec3(0.3,0.2,0.1)*0.5, vec3(0.7, 0.9, 1.0), 0.5 + 0.5*rd.y );
	
    vec4 tmat = intersect(ro,rd);
    if( tmat.x>0.0 )
    {
        vec3  pos = ro + tmat.x*rd;
        vec3  nor = calcNormal(pos);
        
        vec3 matcol = 0.5 + 0.5*cos(vec3(0.0,1.0,2.0)+2.0*tmat.z);
        
        float occ = tmat.y;

        const vec3 light = normalize(vec3(1.0,0.9,0.3));
        float dif = dot(nor,light);
        float sha = 1.0;
        if( dif>0.0 ) sha=softshadow( pos, light, 0.01, 64.0 );
        dif = max(dif,0.0);
        vec3  hal = normalize(light-rd);
        float spe = dif*sha*pow(clamp(dot(hal,nor),0.0,1.0),16.0)*(0.04+0.96*pow(clamp(1.0-dot(hal,light),0.0,1.0),5.0));
        
		float sky = 0.5 + 0.5*nor.y;
        float bac = max(0.4 + 0.6*dot(nor,vec3(-light.x,light.y,-light.z)),0.0);

        vec3 lin  = vec3(0.0);
        lin += 1.00*dif*vec3(1.10,0.85,0.60)*sha;
        lin += 0.50*sky*vec3(0.10,0.20,0.40)*occ;
        lin += 0.10*bac*vec3(1.00,1.00,1.00)*(0.5+0.5*occ);
        lin += 0.25*occ*vec3(0.15,0.17,0.20);	 
        col = matcol*lin + spe*128.0;
    }

    col = 1.5*col/(1.0+col);
    col = sqrt( col );
    
    return col;
}

void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
    // camera
    vec3 ro = 1.1*vec3(2.5*sin(0.25*iTime),1.0+1.0*cos(iTime*.13),2.5*cos(0.25*iTime));

#if AA>1
    #define ZERO (min(iFrame,0))
    vec3 col = vec3(0.0);
    for( int m=ZERO; m<AA; m++ )
    for( int n=ZERO; n<AA; n++ )
    {
        // pixel coordinates
        vec2 o = vec2(float(m),float(n)) / float(AA) - 0.5;
        vec2 p = (2.0*(fragCoord+o)-iResolution.xy)/iResolution.y;

        vec3 ww = normalize(vec3(0.0) - ro);
        vec3 uu = normalize(cross( vec3(0.0,1.0,0.0), ww ));
        vec3 vv = normalize(cross(ww,uu));
        vec3 rd = normalize( p.x*uu + p.y*vv + 2.5*ww );

        col += render( ro, rd );
    }
    col /= float(AA*AA);
#else   
    vec2 p = (2.0*fragCoord-iResolution.xy)/iResolution.y;
    vec3 ww = normalize(vec3(0.0) - ro);
    vec3 uu = normalize(cross( vec3(0.0,1.0,0.0), ww ));
    vec3 vv = normalize(cross(ww,uu));
    vec3 rd = normalize( p.x*uu + p.y*vv + 2.5*ww );
    vec3 col = render( ro, rd );
#endif        
    
    fragColor = vec4(col,1.0);
}


void mainVR( out vec4 fragColor, in vec2 fragCoord, in vec3 fragRayOri, in vec3 fragRayDir )
{
    float time = iTime*0.25 + 0.01*iMouse.x;
    float anim = 1.1 + 0.5*smoothstep( -0.3, 0.3, cos(0.1*iTime) );

    vec3 col = render( fragRayOri + vec3(0.0,1.0,2.5), fragRayDir );
    fragColor = vec4( col, 1.0 );
}

void main() {
  vec4 textureColor = texture(uSampler, vTextureCoord) * vec4(1, 1, 1, 1);
  mainImage(outColor, gl_FragCoord.xy);
  // outColor.rgb *= vec3(textureColor.rgb * vLightWeighting);
}