#version 330
in vec2 vertTexCoord;

out vec4 fragColor;

uniform sampler2D screenTex;

void main() {
    fragColor = vec4(0.0, 0.0, 1.0, 1.0);
}
