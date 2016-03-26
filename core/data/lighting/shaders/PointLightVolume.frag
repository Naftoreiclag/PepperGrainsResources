#version 330
out vec3 fBright;

in vec2 vPotato;
in vec4 vEgg;

uniform sampler2D gNormal;
uniform sampler2D gDepth;

uniform mat4 uInvViewProj;

void main() {
    vec2 vUV = gl_FragCoord.xy;
    vUV /= gl_FragCoord.w;
    vUV = (vUV + 1.0) / 2.0;
    vUV = vPotato;
    
    vUV = vEgg.xy;
    vUV /= vEgg.w;
    vUV = (vUV + 1.0) / 2.0;

    /*
    vec3 fNormal = texture(gNormal, vUV).xyz;
    float fDepth = texture(gDepth, vUV).x;
    vec4 fPosition = uInvViewProj * vec4(vUV * 2.0 - 1.0, fDepth * 2.0 - 1.0, 1.0);
    fPosition /= fPosition.w; // perspective divide
    */
    
    fBright = (texture(gNormal, vUV).xyz + 1.0) / 2.0;
}
