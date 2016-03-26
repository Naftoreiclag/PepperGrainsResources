#version 330
in vec3 iPosition;

out vec2 vPotato;
out vec4 vEgg;

uniform mat4 uMVP;

void main() {
    vec4 vPosition = uMVP * vec4(iPosition, 1.0);
    vPotato = vPosition.xy;
    vPotato /= vPosition.w;
    vPotato = (vPotato + 1.0) / 2.0;
    
    vEgg = vPosition;
    
    gl_Position = vPosition;
}
