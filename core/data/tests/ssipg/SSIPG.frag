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

//uniform vec2 uPixelSize;

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

vec3 barycentricUV(vec2 uv) {
    float gTriUVDoubleArea = doubleTriangleArea(gTriUV[0], gTriUV[1], gTriUV[2]);
    
    return vec3(
        doubleTriangleArea(gTriUV[1], gTriUV[2], uv) / gTriUVDoubleArea, 
        doubleTriangleArea(gTriUV[2], gTriUV[0], uv) / gTriUVDoubleArea, 
        doubleTriangleArea(gTriUV[0], gTriUV[1], uv) / gTriUVDoubleArea);
}

void main() {
    vec2 uPixelSize = vec2(1.0 / 1280.0, 1.0 / 720.0);
    
    
    vec2 fNDCxy = gPosition.xy / gPosition.w;
    vec2 fDirection = texture(diffuseMap, gUV).rg;
    fDirection = (fDirection * 2.0) - 1.0;
    
    // Temporary?
    fDirection /= 2.0;
    
    vec2 trueUV = gUV + fDirection;
    
    vec3 bary = barycentricUV(trueUV);
    
    vec4 potato = vec4(gTriModelPos[0] * bary[0] + gTriModelPos[1] * bary[1] + gTriModelPos[2] * bary[2], 1.0);
    /*
        gTriPosition[0] * bary[0], 
        gTriPosition[1] * bary[1], 
        gTriPosition[2] * bary[2], 
        1.0);
        */
    vec4 ndcPos = uMVP * potato;
    ndcPos /= ndcPos.w;
    
    if(abs(ndcPos.x - fNDCxy.x) <= uPixelSize.x * 2 && abs(ndcPos.y - fNDCxy.y) <= uPixelSize.y * 2) {
        fragColor = vec3(1.0, 1.0, 1.0);
    } else {
        fragColor = vec3(0.0, 0.0, 0.0);
    }
    
    //fragColor = vec3(fDirection, 0.0);
    
    /*
    if(fIntensity < 0.9) {
        fragColor = vec3(0.0, 0.0, 0.0);
    }
    else {
        bool output = true;
        for(int xo = -1; xo <= 1; ++ xo) {
            for(int yo = -1; yo <= 1; ++ yo) {
                if(xo != 0 && yo != 0) {
                    vec3 bary = barycentric(vec2(fNDCxy.x + uPixelSize.x * xo, fNDCxy.y + uPixelSize.y * yo));
                    vec2 nUV = (gTriUVPremult[0] * bary[0] + gTriUVPremult[1] * bary[1] + gTriUVPremult[2] * bary[2]) / 
                              (gTriInvLinearZ[0] * bary[0] + gTriInvLinearZ[1] * bary[1] + gTriInvLinearZ[2] * bary[2]);
                    
                    float intensity = texture(diffuseMap, nUV).r;
                    
                    if(intensity > fIntensity) {
                        output = false;
                        break;
                    }
                }
            }
            if(!output) {
                break;
            }
        }
        
        if(output) {
            fragColor = vec3(1.0, 1.0, 1.0);
        } else {
            fragColor = vec3(0.0, 0.0, 0.0);
        }
    }
    */
}
