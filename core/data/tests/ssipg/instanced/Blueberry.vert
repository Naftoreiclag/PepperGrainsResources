#version 330
in vec3 iPosition;
in vec3 iNormal;
in vec2 iUV;

in int iPackedPixel;
in float iHtped;
in vec3 iDiffuse;
in vec3 iLocation;

out vec3 vNormal;
out vec2 vUV;
out vec3 vDiffuse;

uniform mat4 uInvViewProj;
uniform mat4 uViewProj;
uniform sampler2D uDepth;

void main() {
    int pY = iPackedPixel >> 16;
    int pX = iPackedPixel & 65535;
    
    vDiffuse = iDiffuse;
    
    vec4 fPosition = uInvViewProj * vec4(iLocation * 2.0 - 1.0, 1.0);
    fPosition /= fPosition.w; // perspective divide

    gl_Position = uViewProj * (vec4(iPosition.xyz + fPosition.xyz, 1.0));
    
    vUV = iUV;
    vNormal = iNormal;
}
