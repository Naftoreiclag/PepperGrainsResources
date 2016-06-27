#version 330
in vec3 gNormal;
in vec4 gPosition;
in vec2 gUV;

in vec2 gTriNDCxy[3];
in float gTriInvLinearZ[3];
in vec2 gTriUVPremult[3];

in float gTriNDCDoubleArea;

//uniform vec2 uInverseScreenSize;

out vec3 fragColor;

uniform sampler2D diffuseMap;

float doubleTriangleArea(vec2 begin, vec2 end, vec2 pos) {
    return (pos.x - begin.x) * (end.y - begin.y) - (pos.y - begin.y) * (end.x - begin.x);
}

vec3 barycentric(vec2 ndc) {
    return vec3(
        doubleTriangleArea(gTriNDCxy[1], gTriNDCxy[2], ndc) / gTriNDCDoubleArea, 
        doubleTriangleArea(gTriNDCxy[2], gTriNDCxy[0], ndc) / gTriNDCDoubleArea, 
        doubleTriangleArea(gTriNDCxy[0], gTriNDCxy[1], ndc) / gTriNDCDoubleArea);
}

void main() {
    vec2 uInverseScreenSize = vec2(1.0 / 1280.0, 1.0 / 720.0);
    
    vec2 fNDCxy = gPosition.xy / gPosition.w;
    fNDCxy += uInverseScreenSize;
    
    vec3 bary = barycentric(fNDCxy);
    
    vec2 nUV = (gTriUVPremult[0] * bary[0] + gTriUVPremult[1] * bary[1] + gTriUVPremult[2] * bary[2]) / 
              (gTriInvLinearZ[0] * bary[0] + gTriInvLinearZ[1] * bary[1] + gTriInvLinearZ[2] * bary[2]);
    
    fragColor = texture(diffuseMap, nUV).rgb + (texture(diffuseMap, gUV).rgb - texture(diffuseMap, nUV).rgb) * 10.0;
}
