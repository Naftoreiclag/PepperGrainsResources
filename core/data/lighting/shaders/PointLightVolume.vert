#version 330
in vec3 iVertexPosition;
in vec3 iPosition;

out vec4 vVertexPosition;

uniform mat4 uModel;
uniform mat4 uViewProj;

void main() {
    vVertexPosition = uViewProj * (uModel * vec4(iVertexPosition, 1.0));
    
    gl_Position = vVertexPosition;
}
