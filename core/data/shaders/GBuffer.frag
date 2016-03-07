#version 330
in vec2 vUV;

out vec3 oColor;

uniform sampler2D gDiffuse;
uniform sampler2D gNormal;
uniform sampler2D gPosition;
uniform sampler2D gDepth;

uniform mat4 uInvViewProj;

void main() {
    vec3 fDiffuse = texture(gDiffuse, vUV).xyz;
    vec3 fNormal = texture(gNormal, vUV).xyz;
    vec3 fPosition = texture(gPosition, vUV).xyz;
    float fDepth = texture(gDepth, vUV).x;
    
    // Direction to directional light
    vec3 lightDir = vec3(0.0, 1.0, 0.0);
    
    oColor = vec3(fDepth, fDepth, fDepth);// * max(dot(fNormal, lightDir), 0.0);
}
