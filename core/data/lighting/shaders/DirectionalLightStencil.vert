#version 330
in vec2 iVertexPosition;
void main() {
    gl_Position = vec4(iVertexPosition, 1.0, 1.0);
}
