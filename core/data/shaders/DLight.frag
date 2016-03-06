#version 330
out vec3 fColor;

uniform sampler2D gDiffuse;
uniform sampler2D gNormal;
uniform sampler2D gPosition;

void main() {
    fColor = vec3(0.5, 0.0, 0.0);
}
