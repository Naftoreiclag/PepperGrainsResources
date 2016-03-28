#version 330
in vec3 iVertexPosition;
uniform mat4 uMVP;
uniform float uVolumeRadius;
void main() {
    gl_Position = uMVP * vec4(iVertexPosition * uVolumeRadius, 1.0);
}
