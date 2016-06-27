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
    float L0 = doubleTriangleArea(gTriNDCxy[1], gTriNDCxy[2], ndc);
    float L1 = doubleTriangleArea(gTriNDCxy[2], gTriNDCxy[0], ndc);
    float L2 = doubleTriangleArea(gTriNDCxy[0], gTriNDCxy[1], ndc);
    
    return vec3(L0 / gTriNDCDoubleArea, L1 / gTriNDCDoubleArea, L2 / gTriNDCDoubleArea);
}

void main() {
    vec2 uInverseScreenSize = vec2(1.0 / 1280.0, 1.0 / 720.0);
    
    // This fragment's normalized device coordinates
    vec3 fNDC = gPosition.xyz / gPosition.w;
    
    vec3 bary = barycentric(fNDC.xy);
    
    float u = (gTriUVPremult[0].x * bary[0]) + (gTriUVPremult[1].x * bary[1]) + (gTriUVPremult[2].x * bary[2]);
    float v = (gTriUVPremult[0].y * bary[0]) + (gTriUVPremult[1].y * bary[1]) + (gTriUVPremult[2].y * bary[2]);
    
    float magic = bary[0] * gTriInvLinearZ[0] + bary[1] * gTriInvLinearZ[1] + bary[2] * gTriInvLinearZ[2];
    
    u /= magic;
    v /= magic;
    
    fragColor = texture(diffuseMap, vec2(u, v)).rgb + (texture(diffuseMap, gUV).rgb - texture(diffuseMap, vec2(u, v)).rgb) * 10.0;
    //vec4(bary, 1.0);//gTrianglePositions[0];//vec4(gNormal, 1.0);
}
