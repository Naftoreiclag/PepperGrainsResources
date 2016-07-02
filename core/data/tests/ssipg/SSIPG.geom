#version 330
layout(triangles) in;
layout(triangle_strip, max_vertices = 3) out;

in vec3 vModelPos[];
in vec3 vWorldNormal[];
in vec2 vUV[];

out vec3 gNormal;

out vec4 gPosition;
out vec2 gUV;

out float gTriNDCDoubleArea;
out vec2 gTriNDCxy[3];
out vec2 gTriUV[3];
out vec3 gTriPosition[3];
out vec3 gTriModelPos[3];

void main() {

    for(int j = 0; j < 3; ++ j) {
        gTriNDCxy[j] = gl_in[j].gl_Position.xy / gl_in[j].gl_Position.w;
        gTriUV[j] = vUV[j];
        gTriPosition[j] = gl_in[j].gl_Position.xyz;
        gTriModelPos[j] = vModelPos[j];
    }
    
    vec2 edge01 = gTriNDCxy[1] - gTriNDCxy[0];
    vec2 edge02 = gTriNDCxy[2] - gTriNDCxy[0];

    gTriNDCDoubleArea = edge01.x * edge02.y - edge01.y * edge02.x;

    for(int i = 0; i < 3; ++ i) {
        gNormal = vWorldNormal[i];
        gUV = vUV[i];
        gPosition = gl_in[i].gl_Position;
        gl_Position = gl_in[i].gl_Position;
        
        EmitVertex();
    }
    
    EndPrimitive();
}
