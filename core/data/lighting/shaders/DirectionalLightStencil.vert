#version 330
in vec3 iVertexPosition;
uniform mat4 uViewProjection;
uniform vec3 uPosition;
uniform float uVolumeRadius;
void main() {
    gl_Position = uViewProjection * vec4((iVertexPosition * uVolumeRadius) + uPosition, 1.0);
}
