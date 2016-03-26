#version 330
in vec3 iPosition;

out vec2 vUV;

uniform mat4 uMVP;

void main() {
    vec4 vPosition = uMVP * vec4(iPosition, 1.0);
    vUV = vPosition.xy;
    vUV /= vPosition.w;
    vUV = (vUV + 1.0) / 2.0;
    
    
    gl_Position = vPosition;
}
