#version 330
in vec2 vertTexCoord;

uniform sampler2D ambientTex;

out vec3 fragColor;
out vec3 fragNormal;

void main() {
    fragColor = texture(ambientTex, vertTexCoord).rgb;
    fragNormal = vec3(0.0, 1.0, 0.0);
}
