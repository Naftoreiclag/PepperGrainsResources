#version 330
in vec2 vUV;

out vec3 oBright;

uniform sampler2D gNormal;
uniform sampler2D gDepth;

uniform sampler2D uNoiseTexture;
uniform vec2 uNoiseRatio;
uniform vec3 uSSAOKernel[64];

uniform mat4 uInvViewProj;
uniform mat4 uViewProj;

uniform float uNear;
uniform float uFar;

uniform vec3 uColor;

const int ssaoSamples = 32;
const int ssaoStepSize = 2;
const float ssaoRadius = 1.0;

void main() {
    vec3 fNormal = texture(gNormal, vUV).xyz;
    float fDepth = texture(gDepth, vUV).x;
    vec4 fPosition = uInvViewProj * vec4(vUV * 2.0 - 1.0, fDepth * 2.0 - 1.0, 1.0);
    fPosition /= fPosition.w; // perspective divide
    
    vec3 noiseRotation = vec3(texture(uNoiseTexture, vUV * uNoiseRatio).xy, 0.0);
    vec3 noiseTangent = normalize(noiseRotation - fNormal * dot(noiseRotation, fNormal));
    mat3 invTangentSpaceMatr = mat3(noiseTangent, cross(fNormal, noiseTangent), fNormal);
    
    float ssaoEffect = 0.0;
    for(int i = 0; i < ssaoSamples; i += ssaoStepSize) {
        vec4 sampleScreen = vec4(invTangentSpaceMatr * uSSAOKernel[i] * ssaoRadius + fPosition.xyz, 1.0);
        sampleScreen = uViewProj * sampleScreen;
        sampleScreen /= sampleScreen.w;
        sampleScreen = (sampleScreen + 1) * 0.5;
        
        float otherDepth = texture(gDepth, sampleScreen.xy).x;
        float otherDepthLin = (2.0 * uNear * uFar) / (uFar + uNear + (otherDepth * (uNear - uFar)));
        float sampleDepthLin = (2.0 * uNear * uFar) / (uFar + uNear + (sampleScreen.z * (uNear - uFar)));
        ssaoEffect += (otherDepth <= sampleScreen.z ? 1.0 : 0.0) * smoothstep(0.0, 1.0, ssaoRadius / abs(otherDepthLin - sampleDepthLin));
    }
    ssaoEffect = 1.0 - (ssaoEffect / ssaoSamples);
    
    oBright = uColor * ssaoEffect;
}
