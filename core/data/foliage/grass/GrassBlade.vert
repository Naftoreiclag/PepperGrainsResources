#version 330
in vec3 iPosition;
in vec3 iNormal;
in vec2 iUV;
in vec3 iOffset;
in vec2 iColor;

out vec3 vNormal;
out vec2 vUV;
out vec2 vColor;

uniform mat4 uModel;
uniform mat4 uView;
uniform mat4 uProj;

void main() {
    gl_Position = uProj * uView * (uModel * vec4(iPosition, 1.0) + vec4(iOffset, 1.0));
    vUV = iUV;
    vColor = iColor;
    vNormal = (uModel * vec4(0.0, 1.0, 0.0, 0.0)).xyz;
}
