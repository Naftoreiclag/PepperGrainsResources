#version 330
in vec2 iVertexPosition;
void main() {
    gl_Position = vec4(iVertexPosition, 0.999, 1.0);
}
