#version 330
in vec2 vUV;

out vec3 oColor;

uniform sampler2D gDiffuse;
uniform sampler2D gNormal;
uniform sampler2D gDepth;

uniform sampler2D gSunDepth;
uniform vec3 uSunDir;

uniform mat4 uInvViewProj;
uniform mat4 uSunViewProj;

void main() {
    vec3 fDiffuse = texture(gDiffuse, vUV).xyz;
    vec3 fNormal = texture(gNormal, vUV).xyz;
    float fDepth = texture(gDepth, vUV).x;
    vec4 fPosition = uInvViewProj * vec4(vUV * 2.0 - 1.0, fDepth * 2.0 - 1.0, 1.0);
    fPosition /= fPosition.w; // perspective divide
    
    vec4 fPositionInSun = uSunViewProj * fPosition;
    fPositionInSun /= fPositionInSun.w;
    fPositionInSun = fPositionInSun * 0.5 + 0.5; 
    float myDistance = fPositionInSun.z;
    
    float shadeBias = max(0.01 * (1.0 - dot(fNormal, uSunDir)), 0.005);
    
    
    // One sample
    /*
    float smallestDistance = texture(gSunDepth, fPositionInSun.xy).x;
    float sunshine = myDistance - shadeBias > smallestDistance ? 0.0 : 1.0;
    */
    
    // PCF
    float sunshine = 0.0;
    vec2 texelDimensions = 1.0 / textureSize(gSunDepth, 0);
    for(int y = -1; y < 2; ++ y) {
        for(int x = -1; x < 2; ++ x) {
            float smallestDistance = texture(gSunDepth, vec2(x, y) * texelDimensions + fPositionInSun.xy).x;
            sunshine += myDistance - shadeBias > smallestDistance ? 0.0 : 1.0;
        }
    }
    sunshine /= 9.0;
    
    vec3 sunColor = vec3(0.8, 0.8, 0.8);
    vec3 ambientBright = vec3(0.2, 0.2, 0.2);
    vec3 totalBright = (sunColor * sunshine * max(dot(fNormal, -uSunDir), 0.0)) + ambientBright;
    
    oColor = fDiffuse * totalBright;
    
}
