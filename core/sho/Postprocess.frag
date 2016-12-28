#version 330
in vec2 vUV;

out vec3 oColor;

uniform sampler2D gForward;

void main() {
    oColor = texture(gForward, vUV).xyz;
    // Tone mapping
    oColor = oColor / (oColor + vec3(1.0));
    // Gamma correction
    oColor = pow(oColor, vec3(1.0 / 2.2));
}
