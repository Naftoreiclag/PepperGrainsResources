#version 330
in vec3 iVertexPosition;

out vec4 vVertexPosition;

uniform mat4 uMVP;
uniform float uRadius;

void main() {
    vVertexPosition = uMVP * vec4(iVertexPosition * uRadius, 1.0);
    
    gl_Position = vVertexPosition;
}
