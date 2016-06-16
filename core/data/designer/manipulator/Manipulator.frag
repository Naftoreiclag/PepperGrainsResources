#version 330
in vec3 vNormal;
uniform vec3 uColor;
uniform vec3 uSunDir;
out vec3 fColor;
void main() {
    fColor = uColor * (clamp(dot(normalize(vNormal), uSunDir), 0.0, 0.5) + 0.5);
}
