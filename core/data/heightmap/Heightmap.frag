#version 400
in vec3 ePosition;

out vec3 fColor;

void main() {
    fColor = ePosition;
}
