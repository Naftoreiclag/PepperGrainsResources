#version 330
in vec2 position;
in vec2 texCoord;

out vec2 vertTexCoord;

void main() {
    vertTexCoord = texCoord;
    gl_Position = vec4(position / 2, 0.0, 1.0);
}