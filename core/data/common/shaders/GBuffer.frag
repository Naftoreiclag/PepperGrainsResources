#version 330
in vec2 vUV;

out vec3 oColor;

uniform sampler2D gDiffuse;
uniform sampler2D gNormal;
uniform sampler2D gDepth;
uniform sampler2D gBright;

uniform sampler2DShadow gSunDepth;
uniform vec3 uSunDir;

uniform mat4 uInvViewProj;
uniform mat4 uSunViewProj;

void main() {
    vec3 fDiffuse = texture(gDiffuse, vUV).xyz;
    vec3 fBright = texture(gBright, vUV).xyz;
    
    oColor = fDiffuse * fBright;
    // Tone mapping
    oColor = oColor / (oColor + vec3(1.0));
    // Gamma correction
    oColor = pow(oColor, vec3(1.0 / 2.2));
    
}
