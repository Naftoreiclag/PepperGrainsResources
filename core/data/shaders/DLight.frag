#version 330
out vec3 fBright;

uniform sampler2D gDiffuse;
uniform sampler2D gNormal;

void main() {
    fBright = vec3(1.0, 0.0, 0.0);
}
