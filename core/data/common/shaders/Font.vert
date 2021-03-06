#version 330
in vec2 position;
in vec2 texCoord;

out vec2 vertTexCoord;

uniform mat4 uModel;
uniform mat4 uView;
uniform mat4 uProj;

void main() {
    vertTexCoord = texCoord;
    gl_Position = uProj * uView * uModel * vec4(position, 0.0, 1.0);
}
