#version 330
in vec2 vVertexPosition;

out vec3 fBright;

uniform sampler2D gNormal;
uniform sampler2D gDepth;

uniform sampler2DShadow gSunDepth;

uniform vec3 uDirection;
uniform vec3 uColor;

uniform mat4 uInvViewProj;
uniform mat4 uSunViewProj;

void main() {
    vec2 vUV = (vVertexPosition + 1.0) / 2.0;
    
    vec3 fNormal = texture(gNormal, vUV).xyz;
    float fDepth = texture(gDepth, vUV).x;
    vec4 fPosition = uInvViewProj * vec4(vUV * 2.0 - 1.0, fDepth * 2.0 - 1.0, 1.0);
    fPosition /= fPosition.w; // perspective divide
    
    vec4 fPositionInSun = uSunViewProj * fPosition;
    fPositionInSun /= fPositionInSun.w;
    fPositionInSun = fPositionInSun * 0.5 + 0.5; 
    
    float shadeBias = max(0.002 * (1.0 - dot(fNormal, uDirection)), 0.001);
    
    // PCF
    float isInDirectSunlight = 0.0;
    vec2 texelDimensions = 1.0 / textureSize(gSunDepth, 0);
    for(int y = -1; y < 2; ++ y) {
        for(int x = -1; x < 2; ++ x) {
            isInDirectSunlight += texture(gSunDepth, vec3(vec2(x, y) * texelDimensions + fPositionInSun.xy, fPositionInSun.z - shadeBias));
        }
    }
    isInDirectSunlight /= 9;
    
    
    fBright = uColor * clamp(dot(fNormal, uDirection), 0.0, isInDirectSunlight);
}
