#version 330
in vec3 vColor;
in vec3 vNormal;

out vec3 fColor;
out vec3 fNormal;

void main() {
    fColor = vColor;
    fNormal = normalize(vNormal);
}
