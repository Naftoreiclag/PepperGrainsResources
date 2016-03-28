#version 330
in vec2 vVertexPosition;
uniform sampler2D gNormal;
uniform vec3 uDirection;
uniform vec3 uColor;
out vec3 fBright;
void main() {
    vec2 vUV = (vVertexPosition + 1.0) / 2.0;
    vec3 fNormal = texture(gNormal, vUV).xyz;
    fBright = uColor;//uColor * clamp(dot(fNormal, uDirection), 0.0, 1.0);
}
