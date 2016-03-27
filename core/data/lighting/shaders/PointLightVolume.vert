#version 330
in vec3 iVertexPosition;

out vec4 vVertexPosition;

uniform mat4 uModel;
uniform mat4 uViewProj;

void main() {
    vVertexPosition = uViewProj * (uModel * vec4(iVertexPosition * 5, 1.0));
    
    gl_Position = vVertexPosition;
}
