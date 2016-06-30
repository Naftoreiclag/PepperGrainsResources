#version 330
in vec3 iPosition;
in vec3 iNormal;
in vec2 iUV;



out vec2 vUV;
out vec3 vNormal;

uniform mat4 uModel;
uniform mat4 uMVP;

void main() {
    gl_Position = uMVP * vec4(iPosition, 1.0);
    vUV = iUV;
    
    vNormal = (uModel * vec4(iNormal, 0.0)).xyz;
    
    
    
    
}
