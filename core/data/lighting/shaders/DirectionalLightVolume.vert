#version 330
in vec3 iVertexPosition;

out vec4 vVertexPosition;

uniform mat4 uViewProjection;
uniform vec3 uPosition;
uniform float uVolumeRadius;

void main() {
    vVertexPosition = uViewProjection * vec4((iVertexPosition * uVolumeRadius) + uPosition, 1.0);
    
    gl_Position = vVertexPosition;
}
