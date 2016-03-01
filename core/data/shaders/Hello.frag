#version 330
in vec2 vUV;

uniform sampler2D ambientTex;

out vec3 fColor;
out vec3 fNormal;

void main() {
    fColor = texture(ambientTex, vUV).rgb;
    fNormal = vec3(0.0, 1.0, 0.0);
}
