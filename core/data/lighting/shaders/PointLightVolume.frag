#version 330
in vec4 vPosition;

uniform sampler2D gNormal;
uniform sampler2D gDepth;

uniform mat4 uInvViewProj;

out vec3 fBright;
out vec3 fDiffuse;

void main() {
    vec2 vUV = vPosition.xy;
    vUV /= vPosition.w;
    vUV = (vUV + 1.0) / 2.0;

    /*
    vec3 fNormal = texture(gNormal, vUV).xyz;
    float fDepth = texture(gDepth, vUV).x;
    vec4 fPosition = uInvViewProj * vec4(vUV * 2.0 - 1.0, fDepth * 2.0 - 1.0, 1.0);
    fPosition /= fPosition.w; // perspective divide
    */
    
    fBright = texture(gNormal, vUV).xyz;
    fDiffuse = vec3(0.0);
}
