#version 330
in vec3 vColor;

out vec4 fColor;

void main() {
    fColor = vec4(vColor.rgb, 1.0);
}
