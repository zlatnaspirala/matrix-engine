export let map = {
  staticCubes: [],
  staticFloors: [],
  staticObjs: [],
  staticObjsGroup: [
    {
      name: "mapobjsgroup_1_2",
      path: "res/3d-objects/env/door1.obj",
      position: {x: -250, y: 0, z: -200},
      rotation: {rotx: 0, roty: 0, rotz: 0},
      activeRotation: [0, 0, 0],
      scale: [1, 1, 1],
      scaleCollider: [1, 1, 1],
      texture: {source: ["res/images/map-1.png"], mix_operation: "multiply"},
      targetDom: {id: "field12", x: 1, y: 2},
    },
  ],
  noPhysics: {cubes: []},
};
