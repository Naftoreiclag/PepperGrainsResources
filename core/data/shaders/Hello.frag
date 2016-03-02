#version 330
in vec3 vNormal;
in vec3 vPosition;
in vec2 vUV;

uniform sampler2D ambientTex;

out vec3 fColor;
out vec3 fNormal;
out vec3 fPosition;

void main() {
    fColor = texture(ambientTex, vUV).rgb;
    fNormal = normalize(vNormal);
    fPosition = vPosition;
}
