#version 330
in vec3 vNormal;
in vec2 vUV;

uniform sampler2D diffuseMap;

out vec3 fColor;
out vec3 fNormal;

void main() {
    fColor = texture(diffuseMap, vUV).rgb;
    fNormal = normalize(vNormal);
}
