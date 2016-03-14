#version 330
in vec3 vNormal;

out vec3 fColor;
out vec3 fNormal;

void main() {
    fColor = vec3(0.0, 0.8, 0.0);
    fNormal = normalize(vNormal);
}
