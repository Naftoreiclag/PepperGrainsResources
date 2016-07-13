#version 330
in vec3 gNormal;
in vec4 gPosition;
in vec2 gUV;

in vec2 gTriNDCxy[3];
in vec3 gTriPosition[3];
in vec3 gTriModelPos[3];
in vec2 gTriUV[3];

in float gTriNDCDoubleArea;

uniform mat4 uMVP;

uniform vec2 uScreenSize;
uniform vec3 uCamDir;

out vec3 fInst;
out vec3 fDiffuse;
out vec3 fOrient;
out vec3 fForce;

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

    // Standard
    //vec2 trueUV = texture(uSpots, gUV).rg;
    
    float asdf = 2000;
    vec2 trueUV = vec2(round(gUV.x * asdf) / asdf, round(gUV.y * asdf) / asdf);
    
    vec3 trueBary = trueBarycentricUV(trueUV);
    
    vec4 trueNDC = uMVP * vec4(gTriModelPos[0] * trueBary[0] + gTriModelPos[1] * trueBary[1] + gTriModelPos[2] * trueBary[2], 1.0);
    trueNDC /= trueNDC.w;
    
    vec2 fNDC = gPosition.xy / gPosition.w;
    
    vec2 displacement = (trueNDC.xy - fNDC) * uScreenSize;
    
    // Standard
    if(abs(displacement.x) <= 1.2 && abs(displacement.y) <= 1.2) {
        fInst = vec3(gl_FragCoord.z, gl_FragCoord.z, gl_FragCoord.z);
        
        fDiffuse = vec3(mod(gUV.x, 0.05), mod(gUV.y, 0.05), 0.0);
    } else {
        discard;
    }
    
    
    /*
        if(dot(gNormal, -uCamDir) < 0.5) {
            discard;
        } else {
            // fInst = vec3(abs(displacement.x) * 0.01, abs(displacement.y) * 0.01, 0.0);
            fInst = vec3(0.0, 0.0, 0.0);
        }
    */
}
