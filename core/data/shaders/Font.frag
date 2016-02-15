#version 330
in vec3 vertColor;
in vec2 vertTexCoord;

uniform sampler2D image;

out vec4 fragColor;

void main() {
    fragColor = texture(image, vertTexCoord);
    
}
