#version 330
in vec3 iPosition;

out vec4 vPosition;

uniform mat4 uMVP;

void main() {
    vPosition = uMVP * vec4(iPosition, 1.0);
    
    gl_Position = vPosition;
}
