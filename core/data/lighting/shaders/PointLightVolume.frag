#version 330
in vec4 vVertexPosition;

uniform sampler2D gNormal;
uniform sampler2D gDepth;

uniform mat4 uModel;
uniform mat4 uInvViewProj;

uniform vec3 iColor;

out vec3 fBright;

void main() {
    // TODO: use gl_FragCoord instead
    vec2 vUV = vVertexPosition.xy;
    vUV /= vVertexPosition.w;
    vUV = (vUV + 1.0) / 2.0;

    vec3 fNormal = texture(gNormal, vUV).xyz;
    float fDepth = texture(gDepth, vUV).x;
    vec4 fPosition = uInvViewProj * vec4(vUV * 2.0 - 1.0, fDepth * 2.0 - 1.0, 1.0);
    fPosition /= fPosition.w; // perspective divide
    
    vec3 iPosition = uModel[3].xyz;
    vec3 dirToLight = iPosition - fPosition.xyz;
    float dist = length(dirToLight);
    dirToLight /= dist;
    
    float linear = 1.5;
    float quadrat = 2.3;
    float atten = 1.0 / (1.0 + (linear * dist) + (quadrat * dist * dist));
    
    fBright = vec3(0.0, 1.0, 1.0) * clamp(dot(fNormal, dirToLight), 0.0, 1.0) * atten;
}
