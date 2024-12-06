
/**
 * @description
 * Map Structure Example
 * Limited number of globals
 * - FPS
 */

export var MAP = {
  name: 'open-space',
  controls: {
    FPS: true
  },
  elements: [
    {
      name: 'armor',
      type: 'obj',
      path: "res/3d-objects/armor.obj",
      scale: 1,
      position: [0, 0, -10],
      rotation: [0, 0, 0],
      activeRotation: [0, 10, 0],
      textures: ["res/images/armor.webp", "res/images/armor.webp"],
      shadows: true
    },
    // {
    //   name: 'simpleCube',
    //   type: 'cube',
    //   clone: {
    //     // byX : { inc: 4.5 , size: 10 },
    //     // byY : { inc: 4 , size: 10 },
    //     // byZ : { inc: -5 , size: 10 }
    //   },
    //   path: null,
    //   scale: 2,
    //   position: [-16, 30, -20],
    //   rotation: [0,0,0],
    //   activeRotation: [0,11,0],
    //   textures : ["res/images/armor.webp"],
    //   shadows: true,
    //   physics: {
    //     enabled: true,
    //     mass: 1
    //   },
    //   ambientLight: [0.5,1,0.5]
    // },
    {
      name: 'simpleCube1',
      type: 'cube',
      clone: {
        byX: {inc: 25, size: 20, interval: 1000}
      },
      path: null,
      scale: 10,
      position: [-200, 40, -200],
      rotation: [0, 0, 0],
      activeRotation: [0, 11, 0],
      textures: ["res/images/armor.webp"],
      shadows: true,
      physics: {
        enabled: true,
        mass: 1
      },
      ambientLight: [0.5, 1, 0.5]
    },
    {
      name: 'simpleCube2',
      type: 'cube',
      clone: {
        byX: {inc: 25, size: 20, interval: 1100}
      },
      path: null,
      scale: 10,
      position: [-200, 40, 200],
      rotation: [0, 0, 0],
      activeRotation: [0, 11, 0],
      textures: ["res/images/armor.webp"],
      shadows: true,
      physics: {
        enabled: true,
        mass: 1,
        zeroMassAfter: 10000
      },
      ambientLight: [1, 1, 2.5]
    },
    {
      name: 'simpleCube3',
      type: 'cube',
      clone: {
        byZ: {inc: 25, size: 20, interval: 500}
      },
      path: null,
      scale: 10,
      position: [-200, 40, -200],
      rotation: [0, 0, 0],
      activeRotation: [0, 11, 0],
      textures: ["res/images/armor.webp"],
      shadows: true,
      physics: {
        enabled: true,
        mass: 1
      },
      ambientLight: [1.5, 1, 0.5]
    },
    {
      name: 'simpleCube3',
      type: 'cube',
      clone: {
        byZ: {inc: 25, size: 20, interval: 500}
      },
      path: null,
      scale: 10,
      position: [200, 40, -200],
      rotation: [0, 0, 0],
      activeRotation: [0, 11, 0],
      textures: ["res/images/armor.webp"],
      shadows: true,
      physics: {
        enabled: true,
        mass: 1,
        zeroMassAfter: 10000
      },
      ambientLight: [1.5, 1, 0.5]
    },

    // // simple sky cube NO PHYSICS
    // {
    //   name: 'simpleSky',
    //   type: 'cube',
    //   clone: {
    //     byX: {inc: 5, size: 20, interval: 500},
    //     byY: {inc: -5, size: 20, interval: 500},
    //     byZ: {inc: -5, size: 10, interval: 500}
    //   },
    //   path: null,
    //   scale: 2,
    //   position: [40, 20, -40],
    //   rotation: [0, 0, 0],
    //   activeRotation: [0, 11, 0],
    //   textures: ["res/images/armor.webp"],
    //   shadows: false,
    //   physics: {
    //     enabled: false,
    //     mass: 1,
    //     disablePhysicsAfter: 10000
    //   },
    //   ambientLight: [0.5, 1, 0.5]
    // }

    // no physics in this case for example
    // You can generate data from tool 
    // https://maximumroulette.com/visual-js/
    {
      name: 'plotXY',
      type: 'pathsXY',
      pathData: null,
      scale: 2,
      position: [40, 20, -40],
      rotation: [0, 0, 0],
      activeRotation: [0, 11, 0],
      textures: ["res/images/armor.webp"],
      shadows: false,
      physics: {
        enabled: false
      },
      ambientLight: [0.5, 1, 0.5]
    }
  ]
};