// File "G:\web_server\xampp\htdocs\PRIVATE_SERVER\me\me\public\res\3d-objects\destructable-mesh\27\TESTC.c"
// Export object "meDestruct_cell_001"
// Created with Anim8or 0.95

#include "Anim8orExport.h"

// mesh01
static float mesh01_coords[] = {
    -0.826959, -0.826959, 0.826959,
    -0.826959, -0.826959, -0.826959,
    -0.826959, 0.826959, 0.826959,
    -0.826959, -0.826959, -0.826959,
    0.826959, -0.826959, -0.826959,
    -0.826959, 0.826959, -0.826959,
    0.826959, -0.826959, -0.826959,
    0.826959, -0.826959, 0.826959,
    0.826959, 0.826959, -0.826959,
    0.826959, -0.826959, 0.826959,
    -0.826959, -0.826959, 0.826959,
    0.826959, 0.826959, 0.826959,
    -0.826959, -0.826959, -0.826959,
    -0.826959, -0.826959, 0.826959,
    0.826959, -0.826959, -0.826959,
    0.826959, 0.826959, -0.826959,
    0.826959, 0.826959, 0.826959,
    -0.826959, 0.826959, -0.826959,
    -0.826959, 0.826959, -0.826959,
    0.826959, 0.826959, -0.826959,
    0.826959, 0.826959, 0.826959,
    -0.826959, 0.826959, 0.826959,
    0.826959, -0.826959, 0.826959,
    -0.826959, 0.826959, 0.826959,
};

static float mesh01_normals[] = {
    -1, 0, 0,
    -1, 0, 0,
    -1, 0, 0,
    0, 0, -1,
    0, 0, -1,
    0, 0, -1,
    1, 0, 0,
    1, 0, 0,
    1, 0, 0,
    0, 0, 1,
    0, 0, 1,
    0, 0, 1,
    0, -1, 0,
    0, -1, 0,
    0, -1, 0,
    0, 1, 0,
    0, 1, 0,
    0, 1, 0,
    -1, 0, 0,
    0, 0, -1,
    1, 0, 0,
    0, 0, 1,
    0, -1, 0,
    0, 1, 0,
};

static float mesh01_texcoords[] = {
    0.375, 0,
    0.375, 0.25,
    0.625, 0,
    0.375, 0.25,
    0.375, 0.5,
    0.625, 0.25,
    0.375, 0.5,
    0.375, 0.75,
    0.625, 0.5,
    0.375, 0.75,
    0.375, 1,
    0.625, 0.75,
    0.125, 0.5,
    0.125, 0.75,
    0.375, 0.5,
    0.625, 0.5,
    0.625, 0.75,
    0.875, 0.5,
    0.625, 0.25,
    0.625, 0.5,
    0.625, 0.75,
    0.625, 1,
    0.375, 0.75,
    0.875, 0.75,
};

static int mesh01_indices[] = {
    0, 2, 1,
    3, 5, 4,
    6, 8, 7,
    9, 11, 10,
    12, 14, 13,
    15, 17, 16,
    1, 2, 18,
    4, 5, 19,
    7, 8, 20,
    10, 11, 21,
    13, 14, 22,
    16, 17, 23,
};

static unsigned char mesh01_matindices[] = {
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0,
};

static Anim8orMaterial mesh01_materials[] = {
    {
        { 0.878, 0.878, 0.878, 1, }, // Ambient color
        { 0.878, 0.878, 0.878, 1, }, // Diffuse color
        { 1, 1, 1, 1, }, // Specular color
        { 0, 0, 0, 1, }, // Emissive color
        0.3, 0.7, 0.2, 0, 32, 1, // Ka, Kd, Ks, Ke, PhongSize, Brilliance
        "", // ambient texture
        "", // diffuse texture
        "", // specular texture
        "", // emissive texture
        "", // transparency texture
        "", // bumpmap texture
        "", // environment texture
    },
};

static struct Anim8orMesh mesh01 = {
    "mesh01", 24, 36, mesh01_indices, mesh01_matindices,
    mesh01_coords, mesh01_normals, mesh01_texcoords, mesh01_materials,
};

// Object meDestruct_cell_001
struct Anim8orObject object_meDestruct_cell_001 = {
    "meDestruct_cell_001", 1, // Num Meshes
    {
        &mesh01,
    },
};

// End of file "G:\web_server\xampp\htdocs\PRIVATE_SERVER\me\me\public\res\3d-objects\destructable-mesh\27\TESTC.c"

