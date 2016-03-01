#version 330
in vec3 iPosition;
in vec2 iUV;

out vec2 vUV;

uniform mat4 uModel;
uniform mat4 uView;
uniform mat4 uProj;

void main() {
    vUV = iUV;
    gl_Position = uProj * uView * uModel * vec4(iPosition, 1.0);
}
