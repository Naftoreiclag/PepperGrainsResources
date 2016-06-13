#version 330
in vec3 iVertexPosition;
in vec3 iVertexNormal;
out vec3 vNormal;
uniform mat4 uModel;
uniform mat4 uMVP;
void main() {
    vNormal = (uModel * vec4(iVertexNormal, 0.0)).xyz;
    gl_Position = uMVP * vec4(iVertexPosition, 1.0);
}
