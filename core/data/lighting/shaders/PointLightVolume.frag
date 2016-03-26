#version 330
out vec3 fBright;

in vec2 vUV;

uniform sampler2D gNormal;
uniform sampler2D gDepth;

uniform mat4 uInvViewProj;

void main() {
    /*
    vec3 fNormal = texture(gNormal, vUV).xyz;
    float fDepth = texture(gDepth, vUV).x;
    vec4 fPosition = uInvViewProj * vec4(vUV * 2.0 - 1.0, fDepth * 2.0 - 1.0, 1.0);
    fPosition /= fPosition.w; // perspective divide
    */
    
    fBright = texture(gNormal, vUV).xyz;
}
