#version 330
in vec3 iVertexPosition;
uniform mat4 uMVP;
void main() {
    gl_Position = uMVP * vec4(iVertexPosition, 1.0);
}
