#version 330
in vec2 vUV;

out vec3 oColor;

uniform sampler2D gMap0;
uniform sampler2D gMap1;
uniform sampler2D gMap2;
uniform sampler2D gMap3;

uniform vec4 uShowWhat;

void main() {
    float f1 = texture(gMap0, vUV).x;
    float f1 = texture(gMap1, vUV).x;
    float f2 = texture(gMap2, vUV).x;
    float f3 = texture(gMap3, vUV).x;
    
    oColor = (
        vec3(f0) * uShowWhat.x + 
        vec3(f1) * uShowWhat.y + 
        vec3(f2) * uShowWhat.z + 
        vec3(f3) * uShowWhat.w
        ) / (uShowWhat.x + uShowWhat.y + uShowWhat.z + uShowWhat.w);
}
