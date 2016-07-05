#version 330
in vec3 iPosition;
in vec3 iNormal;
in vec2 iUV;

in int iPackedPixel;

out vec3 vNormal;
out vec2 vUV;

uniform vec2 uPixelSize;
uniform mat4 uInvViewProj;
uniform mat4 uViewProj;
uniform sampler2D uDepth;

void main() {
    /*
    int pY = iPackedPixel >> 16;
    int pX = iPackedPixel & 65535;
    */
    
    /*
    int pX = 0;
    int pY = iPackedPixel;
    */
    float pX = 0;
    float pY = iPackedPixel * 0.000000001;
    
    vec2 instanceUV = vec2(pX, pY);
    
    /*
    float fDepth = texture(uDepth, vUV).x; // Raw value
    float fDepthNDC = fDepth * 2.0 - 1.0; // Normalized device coordinates
    
    
    vec4 fPosition = uInvViewProj * vec4(instanceUV * 2.0 - 1.0, fDepthNDC, 1.0);
    fPosition /= fPosition.w; // perspective divide
    */

    gl_Position = uViewProj * (vec4(iPosition.x + instanceUV.x, iPosition.y + gl_InstanceID * 0.01, iPosition.z + instanceUV.y, 1.0));
    
    //gl_Position = uViewProj * (vec4(iPosition.x, iPosition.y + gl_InstanceID * 0.2, iPosition.z, 1.0));
    vUV = iUV;
    vNormal = iNormal;
}
