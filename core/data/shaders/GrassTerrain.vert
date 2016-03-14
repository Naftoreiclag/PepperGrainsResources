#version 330
in vec3 iPosition;
in vec3 iNormal;
in vec2 iUV;

out vec3 vNormal;

uniform mat4 uModel;
uniform mat4 uView;
uniform mat4 uProj;

void main() {
    gl_Position = uProj * uView * uModel * vec4(iPosition, 1.0);
    vNormal = (uModel * vec4(iNormal, 0.0)).xyz;
}
