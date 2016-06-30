#version 330
in vec2 vUV;
in vec3 vNormal;

uniform sampler2D uDiffuse;


out vec3 fDiffuse;
out vec3 fNormal;

void main() {
    fDiffuse = texture(uDiffuse, vUV).rgb;
    fNormal = normalize(vNormal);
}
