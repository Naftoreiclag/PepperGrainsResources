#version 330
in vec3 gNormal;
in vec4 gPosition;
in vec2 gUV;

in vec2 gTriNDCxy[3];
in float gTriInvLinearZ[3];
in vec2 gTriUVPremult[3];
in vec3 gTriPosition[3];
in vec3 gTriModelPos[3];
in vec2 gTriUV[3];

in float gTriNDCDoubleArea;

uniform mat4 uMVP;

uniform vec2 uPixelSize;

out vec3 fragColor;

uniform sampler2D uSpots;

float doubleTriangleArea(vec2 begin, vec2 end, vec2 pos) {
    return (pos.x - begin.x) * (end.y - begin.y) - (pos.y - begin.y) * (end.x - begin.x);
}

vec3 trueBarycentricUV(vec2 uv) {
    float gTriUVDoubleArea = doubleTriangleArea(gTriUV[0], gTriUV[1], gTriUV[2]);
    
    return vec3(
        doubleTriangleArea(gTriUV[1], gTriUV[2], uv) / gTriUVDoubleArea, 
        doubleTriangleArea(gTriUV[2], gTriUV[0], uv) / gTriUVDoubleArea, 
        doubleTriangleArea(gTriUV[0], gTriUV[1], uv) / gTriUVDoubleArea);
}

void main() {
    vec3 trueBary = trueBarycentricUV(texture(uSpots, gUV).rg);
    vec4 trueNDC = uMVP * vec4(gTriModelPos[0] * trueBary[0] + gTriModelPos[1] * trueBary[1] + gTriModelPos[2] * trueBary[2], 1.0);
    trueNDC /= trueNDC.w;
    
    vec2 fNDC = gPosition.xy / gPosition.w;
    //vec2 uPixelSize = vec2(1.0 / (1280.0 / 2.0), 1.0 / (720.0 / 2.0));
    
    if(abs(trueNDC.x - fNDC.x) <= uPixelSize.x && abs(trueNDC.y - fNDC.y) <= uPixelSize.y) {
        fragColor = vec3(1.0, 1.0, 1.0);
    } else {
        discard;
        //fragColor = vec3(0.0, 0.0, 0.0);
    }
}
