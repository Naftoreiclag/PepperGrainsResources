#version 330
in vec2 iVertexPosition;
out vec2 vVertexPosition;
void main() {
    vVertexPosition = iVertexPosition;
    gl_Position = vec4(iVertexPosition, 1.0, 1.0);
}
