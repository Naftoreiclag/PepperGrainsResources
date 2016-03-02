#version 330
in vec3 iPosition;
in vec3 iNormal;
in vec2 iUV;

out vec3 vNormal;
out vec3 vPosition;
out vec2 vUV;

uniform mat4 uModel;
uniform mat4 uView;
uniform mat4 uProj;

void main() {
    gl_Position = uProj * uView * uModel * vec4(iPosition, 1.0);
    vUV = iUV;
    vNormal = (uModel * vec4(iNormal, 0.0)).xyz;
    vPosition = (uModel * vec4(iPosition, 1.0)).xyz;
}
