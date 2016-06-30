#version 330
in vec2 vUV;
in mat3 vTBN;

uniform sampler2D uDiffuse;
uniform sampler2D uNormals;

out vec3 fDiffuse;
out vec3 fNormal;

void main() {
    fDiffuse = texture(uDiffuse, vUV).rgb;
    fNormal = normalize(vTBN * (texture(uNormals, vUV).rgb * 2.0 - 1.0));
}
