#version 330
in vec3 iPosition;
in vec3 iNormal;
in vec2 iUV;

in int iPackedPixel;
in float iHtped;

out vec3 vNormal;
out vec2 vUV;

uniform vec2 uPixelSize;
uniform mat4 uInvViewProj;
uniform mat4 uViewProj;
uniform sampler2D uDepth;

void main() {
    int pY = iPackedPixel >> 16;
    int pX = iPackedPixel & 65535;
    
    vec2 instanceUV = vec2(pX, pY) * uPixelSize;
    
    float fDepth = texture(uDepth, instanceUV).x; // Raw value
    fDepth = iHtped;
    
    // Value is zero
    
    
    float fDepthNDC = fDepth * 2.0 - 1.0; // Normalized device coordinates
    
    
    vec4 fPosition = uInvViewProj * vec4(instanceUV * 2.0 - 1.0, fDepthNDC, 1.0);
    fPosition /= fPosition.w; // perspective divide

    gl_Position = uViewProj * (vec4(iPosition.xyz + fPosition.xyz, 1.0));
    
    //gl_Position = uViewProj * (vec4(iPosition.x + instanceUV.x, iPosition.y, iPosition.z + instanceUV.y, 1.0));
    vUV = iUV;
    vNormal = iNormal;
}
