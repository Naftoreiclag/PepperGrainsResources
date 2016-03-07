#version 330
in vec2 vUV;

out vec3 oColor;

uniform sampler2D gDiffuse;
uniform sampler2D gNormal;
uniform sampler2D gDepth;

uniform sampler2D gSunDepth;

uniform mat4 uInvViewProj;
uniform mat4 uSunViewProj;

void main() {
    vec3 fDiffuse = texture(gDiffuse, vUV).xyz;
    vec3 fNormal = texture(gNormal, vUV).xyz;
    float fDepth = texture(gDepth, vUV).x;
    vec4 fPosition = uInvViewProj * vec4(vUV * 2.0 - 1.0, fDepth * 2.0 - 1.0, 1.0);
    fPosition /= fPosition.w;
    
    vec4 fPositionInSun = uSunViewProj * fPosition;
    float fNearestDist = texture(gSunDepth, fPositionInSun.xy * 0.5 + 0.5).x;
    
    // Direction to directional light
    vec3 lightDir = vec3(0.0, 1.0, 0.0);
    
    float intense = 1.0f;
    if(fNearestDist < fPositionInSun.z) {
        intense = 0.5f;
    }
    //oColor = fDiffuse * intense;
    //oColor = texture(gSunDepth, vUV).xyz;
    //oColor = vec3(fPositionInSun, fPositionInSun, fPositionInSun);
    oColor = vec3(fNearestDist, fNearestDist, fNearestDist);
    //oColor = fPositionInSun.xyz;
    // * max(dot(fNormal, lightDir), 0.0);
}
