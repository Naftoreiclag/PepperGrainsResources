#version 330
in vec3 iPosition;
in vec3 iColor;

out vec3 vColor;

uniform mat4 uModel;
uniform mat4 uView;
uniform mat4 uProj;

void main() {
    gl_Position = uProj * uView * uModel * vec4(iPosition, 1.0);
    vColor = iColor;
}
