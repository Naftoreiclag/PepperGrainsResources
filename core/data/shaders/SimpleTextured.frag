#version 330
in vec3 vNormal;
in vec2 vUV;

uniform sampler2D diffuseMap;

out vec3 fColor;
out vec3 fNormal;
out vec3 fBright;

void main() {
    fColor = texture(diffuseMap, vUV).rgb;
    fNormal = normalize(vNormal);
    fBright = vec3(1.0, 1.0, 1.0);
}
