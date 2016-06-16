#version 330
in vec2 vUV;

out vec3 oColor;

uniform sampler2D gDiffuse;
uniform sampler2D gNormal;
uniform sampler2D gDepth;
uniform sampler2D gBright;

uniform sampler2D noiseTexture;
uniform vec3 ssaoKernel[64];

uniform mat4 uInvViewProj;
uniform mat4 uViewProj;

uniform float uNear;
uniform float uFar;

const int ssaoSamples = 32;
const float ssaoRadius = 1.0;

void main() {
    vec3 fDiffuse = texture(gDiffuse, vUV).xyz;
    vec3 fNormal = texture(gNormal, vUV).xyz;
    vec3 fBright = texture(gBright, vUV).xyz;
    float fDepth = texture(gDepth, vUV).x;
    vec4 fPosition = uInvViewProj * vec4(vUV * 2.0 - 1.0, fDepth * 2.0 - 1.0, 1.0);
    fPosition /= fPosition.w; // perspective divide
    
    vec3 noiseRotation = vec3(texture(noiseTexture, vUV * vec2(1280.0 / 8.0, 720.0 / 8.0)).xy, 0.0);
    vec3 noiseTangent = normalize(noiseRotation - fNormal * dot(noiseRotation, fNormal));
    mat3 invTangentSpaceMatr = mat3(noiseTangent, cross(fNormal, noiseTangent), fNormal);
    
    // Maybe this all should be in an ambient light shader?
    
    float ssaoEffect = 0.0;
    for(int i = 0; i < ssaoSamples; ++ i) {
        vec4 sampleScreen = vec4(invTangentSpaceMatr * ssaoKernel[i] * ssaoRadius + fPosition.xyz, 1.0);
        sampleScreen = uViewProj * sampleScreen;
        sampleScreen /= sampleScreen.w;
        sampleScreen = (sampleScreen + 1) * 0.5;
        
        float otherDepth = texture(gDepth, sampleScreen.xy).x;
        float otherDepthLin = (2.0 * uNear * uFar) / (uFar + uNear + (otherDepth * (uNear - uFar)));
        float sampleDepthLin = (2.0 * uNear * uFar) / (uFar + uNear + (sampleScreen.z * (uNear - uFar)));
        ssaoEffect += (otherDepth <= sampleScreen.z ? 1.0 : 0.0) * smoothstep(0.0, 1.0, ssaoRadius / abs(otherDepthLin - sampleDepthLin));
    }
    ssaoEffect = 1.0 - (ssaoEffect / ssaoSamples);
    
    oColor = fDiffuse * fBright * ssaoEffect;
    // Tone mapping
    oColor = oColor / (oColor + vec3(1.0));
    // Gamma correction
    oColor = pow(oColor, vec3(1.0 / 2.2));
    
}
