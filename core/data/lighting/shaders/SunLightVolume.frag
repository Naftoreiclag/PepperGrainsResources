#version 330

in vec2 vVertexPosition;

out vec3 fBright;

uniform sampler2D gNormal;
uniform sampler2D gDepth;
uniform vec2 uDiskKernel[64];

uniform sampler2DShadow gSunDepth0;
uniform sampler2DShadow gSunDepth1;
uniform sampler2DShadow gSunDepth2;
uniform sampler2DShadow gSunDepth3;

uniform sampler2D uNoiseTexture;
uniform vec2 uNoiseRatio;

uniform vec3 uCamLocation;
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
    
    
    // Per-fragment depth value
    float fDepth = texture(gDepth, vUV).x; // Raw value
    float fDepthNDC = fDepth * 2.0 - 1.0; // Normalized device coordinates
    float fDepthLin = (2.0 * uNear * uFar) / (uFar + uNear + (fDepthNDC * (uNear - uFar))); // Linearized device coordinates
    
    vec4 fPosition = uInvViewProj * vec4(vUV * 2.0 - 1.0, fDepthNDC, 1.0);
    fPosition /= fPosition.w; // perspective divide
    
    
    vec4 fPositionInSun;
    if(fDepthLin < uCascadeFars[0]) {
        fPositionInSun = uSunViewProj0 * fPosition;
    } else if(fDepthLin < uCascadeFars[1]) {
        fPositionInSun = uSunViewProj1 * fPosition;
    } else if(fDepthLin < uCascadeFars[2]) {
        fPositionInSun = uSunViewProj2 * fPosition;
    } else if(fDepthLin < uCascadeFars[3]) {
        fPositionInSun = uSunViewProj3 * fPosition;
    } else {
        discard;
    }
    
    fPositionInSun /= fPositionInSun.w;
    fPositionInSun = fPositionInSun * 0.5 + 0.5;
    
    float minShadeBias;
    float extraShadeBias;
    
    if(fDepthLin < uCascadeFars[0]) {
        minShadeBias = 0.0001;
        extraShadeBias = 0.0001;
    } else if(fDepthLin < uCascadeFars[1]) {
        minShadeBias = 0.0003;
        extraShadeBias = 0.0003;
    } else {
        minShadeBias = 0.001;
        extraShadeBias = 0.001;
    }
    
    float shadeBias = max(extraShadeBias * (1.0 - dot(fNormal, uDirection)), 0) + minShadeBias;
    
    float isInDirectSunlight = 0.0;
    
    /*
    vec2 noiseRotation = texture(uNoiseTexture, vUV * uNoiseRatio).xy / 2.f;
    vec2 texelDimensions = 2.0 / textureSize(gSunDepth0, 0);
    
    for(int y = -1; y < 2; ++ y) {
        for(int x = -1; x < 2; ++ x) {
            vec3 potato = vec3((vec2(x, y) + noiseRotation) * 2 * texelDimensions + fPositionInSun.xy, fPositionInSun.z - shadeBias);
            if(fDepthLin < uCascadeFars[0]) {
                isInDirectSunlight += texture(gSunDepth0, potato);
            } else if(fDepthLin < uCascadeFars[1]) {
                isInDirectSunlight += texture(gSunDepth1, potato);
            } else if(fDepthLin < uCascadeFars[2]) {
                isInDirectSunlight += texture(gSunDepth2, potato);
            } else  {
                isInDirectSunlight += texture(gSunDepth3, potato);
            }
        }
    }
    isInDirectSunlight /= 9;
    */
    
    
    vec3 potato = vec3(fPositionInSun.xy, fPositionInSun.z - shadeBias);
    if(fDepthLin < uCascadeFars[0]) {
        isInDirectSunlight += texture(gSunDepth0, potato);
    } else if(fDepthLin < uCascadeFars[1]) {
        isInDirectSunlight += texture(gSunDepth1, potato);
    } else if(fDepthLin < uCascadeFars[2]) {
        isInDirectSunlight += texture(gSunDepth2, potato);
    } else if(fDepthLin < uCascadeFars[3]) {
        isInDirectSunlight += texture(gSunDepth3, potato);
    }
    
    // Dot product: +1 = facing directly toward the sun, 0 = perpendicular to the sun, -1 = facing away from the sun
    float diffuse = max(dot(fNormal, uDirection), 0.0);
    
    vec3 dirToCamera = normalize(uCamLocation - fPosition.xyz);
    vec3 reflectionDir = reflect(-uDirection, fNormal);
    float specular = pow(max(dot(dirToCamera, reflectionDir), 0.0), 256) * 3.0;
    
    fBright = uColor * clamp(diffuse + specular, 0.0, isInDirectSunlight * 4.0);
    
    // Debug
    /*
    if(fDepthLin < uCascadeFars[0]) {
        fBright = (fBright + vec3(1.0, 0.0, 0.0)) / 2.0;
    } else if(fDepthLin < uCascadeFars[1]) {
        fBright = (fBright + vec3(0.0, 1.0, 0.0)) / 2.0;
    } else if(fDepthLin < uCascadeFars[2]) {
        fBright = (fBright + vec3(0.0, 0.0, 1.0)) / 2.0;
    } else if(fDepthLin < uCascadeFars[3]) {
        fBright = (fBright + vec3(1.0, 1.0, 0.0)) / 2.0;
    } else {
        fBright = (fBright + vec3(1.0, 0.0, 1.0)) / 2.0;
    }
    */
}
