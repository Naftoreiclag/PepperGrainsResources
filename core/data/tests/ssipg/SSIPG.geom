#version 330
layout(triangles) in;
layout(triangle_strip, max_vertices = 3) out;

in vec3 vNormal[];
in vec2 vUV[];

out vec3 gNormal;
out vec2 gUV;

out vec2 gUoffset;
out vec2 gVoffset;

void main() {
    vec2 offsetU;
    vec2 offsetV;
    
    for(int i = 0; i < 3; ++ i) {
        gNormal = -vNormal[i];
        gUV = vUV[i];
        gUoffset = offsetU;
        gVoffset = offsetV;
        gl_Position = gl_in[i].gl_Position;
        EmitVertex();
    }
    
    EndPrimitive();
}
