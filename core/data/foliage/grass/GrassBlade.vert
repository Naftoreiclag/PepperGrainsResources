#version 330
in vec3 iPosition;
in vec3 iNormal;
in vec2 iUV;
in vec3 iOffset;
in vec2 iColor;

out vec3 vNormal;
out vec2 vUV;
out vec2 vColor;

uniform mat4 uModel;
uniform mat4 uView;
uniform mat4 uProj;

uniform sampler2D heightMap;

void main() {

    float sinTheta = sin(gl_InstanceID);
    float cosTheta = cos(gl_InstanceID);
    
    mat3 variation = mat3(1.0);
    variation[0][0] = cosTheta;
    variation[2][0] = sinTheta;
    variation[0][2] = -sinTheta;
    variation[2][2] = cosTheta;
    
    // Height
    variation[1][1] = texture(heightMap, iColor).x * 5.0;

    gl_Position = uProj * uView * (uModel * vec4(variation * iPosition, 1.0) + vec4(iOffset, 1.0));
    vUV = iUV;
    vColor = iColor;
    vNormal = (uModel * vec4(0.0, 1.0, 0.0, 0.0)).xyz;
}
