#version 330
in vec4 vVertexPosition;

uniform sampler2D gNormal;
uniform sampler2D gDepth;

uniform mat4 uModel;
uniform mat4 uInvViewProj;

uniform vec3 uPosition;
uniform vec3 uColor;
uniform float uRadius;
uniform float uVolumeRadius;

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
    
    vec3 dirToLight = uPosition - fPosition.xyz;
    float distToSurf = length(dirToLight);
    dirToLight /= distToSurf;
    distToSurf = max(distToSurf - uRadius, 0.0);
    float atten = 1.0 / (1.0 + (distToSurf / uRadius));
    atten *= atten;
    atten -= min(distToSurf / (uVolumeRadius - uRadius), 1.0) * 0.002;
    
    fBright = uColor * atten;
}
