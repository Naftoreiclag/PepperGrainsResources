#version 330

in vec2 vVertexPosition;

out vec3 fBright;

uniform sampler2D gNormal;
uniform sampler2D gDepth;

uniform sampler2DShadow gSunDepth0;
uniform sampler2DShadow gSunDepth1;
uniform sampler2DShadow gSunDepth2;
uniform sampler2DShadow gSunDepth3;

uniform vec3 uDirection;
uniform vec3 uColor;

uniform vec4 uCascadeFars;

uniform float uNear;
#define uFar uCascadeFars[3]

uniform mat4 uInvViewProj;
uniform mat4 uInvProj;

uniform mat4 uSunViewProj0;
uniform mat4 uSunViewProj1;
uniform mat4 uSunViewProj2;
uniform mat4 uSunViewProj3;

void main() {
    vec2 vUV = (vVertexPosition + 1.0) / 2.0;
    
    vec3 fNormal = texture(gNormal, vUV).xyz;
    float fDepth = texture(gDepth, vUV).x;
    
    float near = uNear;
    float far = uFar;
    
    float fDepthNDC = fDepth * 2.0 - 1.0;
    float fDepthLin = (2.0 * near * far) / (far + near + (fDepthNDC * (near - far)));
    
    // Debug
    if(fDepthLin < 5) {
        fBright = vec3(1.0, 0.0, 0.0);
    } else {
        fBright = vec3(0.0, 1.0, 0.0);
    }
    
    /*
    }    else if(fDepth < 2) {
        fBright = vec3(0.0, 1.0, 0.0);
    } else if(fDepth < 3) {
        fBright = vec3(0.0, 0.0, 1.0);
    } else if(fDepth < 4) {
        fBright = vec3(1.0, 1.0, 0.0);
    } else {
        fBright = vec3(1.0, 0.0, 1.0);
    }
    */
    
    vec4 fPosition = uInvViewProj * vec4(vUV * 2.0 - 1.0, fDepthNDC, 1.0);
    fPosition /= fPosition.w; // perspective divide
    
    //fBright = vec3(fPosition);
    
    /*
    vec4 fPositionInSun;
    if(fDepth < uCascadeFars[0]) {
        fPositionInSun = uSunViewProj0 * fPosition;
    } else if(fDepth < uCascadeFars[1]) {
        fPositionInSun = uSunViewProj1 * fPosition;
    } else if(fDepth < uCascadeFars[2]) {
        fPositionInSun = uSunViewProj2 * fPosition;
    } else  {
        fPositionInSun = uSunViewProj3 * fPosition;
    }
    
    fPositionInSun /= fPositionInSun.w;
    fPositionInSun = fPositionInSun * 0.5 + 0.5; 
    
    float shadeBias = max(0.002 * (1.0 - dot(fNormal, uDirection)), 0.001);
    
    // PCF
    float isInDirectSunlight = 0.0;
    vec2 texelDimensions = 1.0 / textureSize(gSunDepth0, 0);
    for(int y = -1; y < 2; ++ y) {
        for(int x = -1; x < 2; ++ x) {
            vec3 potato = vec3(vec2(x, y) * texelDimensions + fPositionInSun.xy, fPositionInSun.z - shadeBias);
            if(fDepth < uCascadeFars[0]) {
                isInDirectSunlight += texture(gSunDepth0, potato);
            } else if(fDepth < uCascadeFars[1]) {
                isInDirectSunlight += texture(gSunDepth1, potato);
            } else if(fDepth < uCascadeFars[2]) {
                isInDirectSunlight += texture(gSunDepth2, potato);
            } else  {
                isInDirectSunlight += texture(gSunDepth3, potato);
            }
        }
    }
    isInDirectSunlight /= 9;
    
    fBright = uColor * clamp(dot(fNormal, uDirection), 0.0, isInDirectSunlight);
    
    */
}
