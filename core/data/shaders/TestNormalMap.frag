#version 330
in vec3 vPosition;
in vec2 vUV;
in mat3 vTBN;

uniform sampler2D uDiffuseMap;
uniform sampler2D uNormalMap;

out vec3 fDiffuse;
out vec3 fNormal;

void main() {
    fDiffuse = texture(uDiffuseMap, vUV).rgb;
    fNormal = texture(uNormalMap, vUV).rgb;
    fNormal = fNormal * 2.0 - 1.0; // Depending on the quality of the normal map, this value may or may not need normalize()'ing
    fNormal = normalize(vTBN * fNormal);
}
