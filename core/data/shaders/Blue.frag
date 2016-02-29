#version 330
in vec2 vertTexCoord;

out vec4 fragColor;

uniform sampler2D screenTex;

void main() {
    fragColor = texture(screenTex, vertTexCoord);
}
