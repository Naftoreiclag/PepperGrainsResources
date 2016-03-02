#version 330
in vec2 vUV;

out vec4 fragColor;

uniform sampler2D gDiffuse;
uniform sampler2D gNormal;
uniform sampler2D gPosition;

void main() {
    fragColor = texture(gDiffuse, vUV);
}
