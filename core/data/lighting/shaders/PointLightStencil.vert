#version 330
in vec3 iVertexPosition;
uniform mat4 uMVP;
uniform float uRadius;
void main() {
    gl_Position = uMVP * vec4(iVertexPosition * uRadius, 1.0);
}
