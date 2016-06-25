#version 330
in vec3 gNormal;
in vec2 gUV;

in vec2 gUoffset;
in vec2 gVoffset;

out vec4 fragColor;

void main() {
    fragColor = vec4(gNormal, 1.0);
}
