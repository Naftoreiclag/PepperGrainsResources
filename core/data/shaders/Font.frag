#version 330
in vec2 vertTexCoord;

uniform sampler2D image;

out vec4 fragColor;

void main() {
    fragColor = vec4(vertTexCoord, 0.0f, 1.0f); // texture(image, vertTexCoord);
    
}
