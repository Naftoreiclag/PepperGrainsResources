#version 330
in vec2 iPosition;
in vec2 iUV;

out vec2 vUV;

void main() {
    vUV = iUV;
    gl_Position = vec4(iPosition, 0.0, 1.0);
}
