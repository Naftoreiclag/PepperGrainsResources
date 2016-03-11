#version 330
in vec3 vNormal;
in vec3 vPosition;
in vec2 vUV;

uniform sampler2D uDiffuseMap;
uniform sampler2D uNormalMap;

out vec3 fDiffuse;
out vec3 fNormal;

void main() {
    fDiffuse = texture(uNormalMap, vUV).rgb;
    fNormal = normalize(vNormal);
}
