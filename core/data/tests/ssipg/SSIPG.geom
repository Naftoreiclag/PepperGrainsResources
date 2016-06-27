#version 330
layout(triangles) in;
layout(triangle_strip, max_vertices = 3) out;

in vec3 vNormal[];
in vec2 vUV[];

out vec3 gNormal;

out vec4 gPosition;
out vec2 gUV;

out float gTriNDCDoubleArea;
out vec2 gTriNDCxy[3];
out float gTriInvLinearZ[3];
out vec2 gTriUV[3];

float linearizeDepth(float z) {
    float uNear = 0.2;
    float uFar = 200.0;
    
    return (2.0 * uNear * uFar) / (uFar + uNear + (z * (uNear - uFar)));
}

void main() {

    for(int j = 0; j < 3; ++ j) {
        gTriNDCxy[j] = gl_in[j].gl_Position.xy / gl_in[j].gl_Position.w;
        gTriInvLinearZ[j] = 1.0 / linearizeDepth(gl_in[j].gl_Position.z / gl_in[j].gl_Position.w);
        gTriUV[j] = vUV[j];
    }
    
    vec2 edge01 = gTriNDCxy[1] - gTriNDCxy[0];
    vec2 edge02 = gTriNDCxy[2] - gTriNDCxy[0];

    gTriNDCDoubleArea = edge01.x * edge02.y - edge01.y * edge02.x;

    for(int i = 0; i < 3; ++ i) {
        gNormal = vNormal[i];
        gUV = vUV[i];
        gPosition = gl_in[i].gl_Position;
        gl_Position = gl_in[i].gl_Position;
        
        EmitVertex();
    }
    
    EndPrimitive();
}
