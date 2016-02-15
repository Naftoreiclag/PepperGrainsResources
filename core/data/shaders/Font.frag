#version 330
in vec2 vertTexCoord;

uniform sampler2D image;

out vec4 fragColor;

void main() {
    fragColor = texture(image, vertTexCoord);
    
}
