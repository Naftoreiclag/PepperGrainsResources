#version 330
in vec2 vUV;
in vec3 vNormal;

out vec3 fOutput;

uniform sampler2D uDiffuse;

void main() {
    fOutput = texture(uDiffuse, vUV).rgb;
}
