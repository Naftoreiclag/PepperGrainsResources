#version 330
in vec3 iPosition;
in vec3 iNormal;
in vec2 iUV;
in vec3 iTangent;
in vec3 iBitangent;

out vec3 vPosition;
out vec2 vUV;
out mat3 vTBN;

uniform mat4 uModel;
uniform mat4 uView;
uniform mat4 uProj;

void main() {
    gl_Position = uProj * uView * uModel * vec4(iPosition, 1.0);
    vPosition = (uModel * vec4(iPosition, 1.0)).xyz;
    
    vUV = iUV;
    
    vec3 vTangent = normalize((uModel * vec4(iTangent, 0.0)).xyz);
    vec3 vBitangent = normalize((uModel * vec4(iBitangent, 0.0)).xyz);
    vec3 vNormal = normalize((uModel * vec4(iNormal, 0.0)).xyz);
    
    vTBN = mat3(vTangent, vBitangent, vNormal);
}
