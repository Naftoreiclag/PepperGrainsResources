#version 330
in vec3 iPosition;
in vec3 iNormal;
in vec2 iUV;
in vec3 iTangent;
in vec3 iBitangent;

out vec3 vNormal;
out vec2 vUV;
out vec3 vTangent;
out vec3 vBitangent;

uniform mat4 uModel;
uniform mat4 uView;
uniform mat4 uProj;

void main() {
    gl_Position = uProj * uView * uModel * vec4(iPosition, 1.0);
    vUV = iUV;
    vNormal = (uModel * vec4(iNormal, 0.0)).xyz;
    vPosition = (uModel * vec4(iPosition, 1.0)).xyz;
    vTangent = iTangent;
    vBitangent = iBitangent;
}
