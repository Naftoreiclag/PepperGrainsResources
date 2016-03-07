#version 330
in vec2 vUV;

out vec3 oColor;

uniform sampler2D gDiffuse;
uniform sampler2D gNormal;
uniform sampler2D gDepth;

uniform mat4 uInvViewProj;

void main() {
    vec3 fDiffuse = texture(gDiffuse, vUV).xyz;
    vec3 fNormal = texture(gNormal, vUV).xyz;
    float fDepth = texture(gDepth, vUV).x;
    vec4 fPosition = uInvViewProj * vec4(vUV * 2.0 - 1.0, fDepth * 2.0 - 1.0, 1.0);
    fPosition /= fPosition.w;
    
    // Direction to directional light
    vec3 lightDir = vec3(0.0, 1.0, 0.0);
    
    oColor = fDiffuse;
    
    // * max(dot(fNormal, lightDir), 0.0);
}
