#version 330
in vec2 iPosition;

out vec2 vUV;

void main() {
    vUV = iPosition * 0.5 + 0.5;
    gl_Position = vec4(iPosition, 0.0, 1.0);
}
