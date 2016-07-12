#version 330
in vec3 vNormal;
in vec2 vUV;
in vec3 vDiffuse;

uniform sampler2D diffuseMap;

out vec3 fColor;
out vec3 fNormal;

void main() {
    fColor = vDiffuse;//texture(diffuseMap, vUV).rgb;
    fNormal = normalize(vNormal);
}
