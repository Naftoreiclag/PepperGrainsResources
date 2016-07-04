#version 330
in vec3 vNormal;
in vec2 vUV;

uniform sampler2D diffuseMap;

out vec3 fColor;
out vec3 fNormal;

void main() {
    fColor = vec3(1.0, 0.0, 1.0);//texture(diffuseMap, vUV).rgb;
    fNormal = normalize(vNormal);
}
