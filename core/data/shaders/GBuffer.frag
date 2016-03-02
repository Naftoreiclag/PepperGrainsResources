#version 330
in vec2 vertTexCoord;

out vec4 fragColor;

uniform sampler2D gDiffuse;

void main() {
    fragColor = texture(gDiffuse, vertTexCoord);
}
