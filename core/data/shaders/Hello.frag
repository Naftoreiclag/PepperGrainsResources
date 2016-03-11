#version 330
in vec3 vNormal;
in vec2 vUV;

uniform sampler2D ambientTex;

out vec3 fColor;
out vec3 fNormal;

void main() {
    fColor = texture(ambientTex, vUV).rgb;
    fNormal = normalize(vNormal);
}
