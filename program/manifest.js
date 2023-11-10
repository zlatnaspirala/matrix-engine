/* eslint-disable no-unused-vars */

var App = {
  name: "Matrix Engine Manifest",
  version: "1.1.1",
  events: true,
  sounds: true,
  logs: false,
  draw_interval: 10,
  antialias: false,
  openglesShaderVersion: '3',
  offScreenCanvas: false,
  redrawInterval: 30,
  camera: {
    viewAngle: 45,
    nearViewpoint: 0.1,
    farViewpoint: 5000,
    edgeMarginValue: 100,
    FirstPersonController: false,
    SceneController: false,
    sceneControllerDragAmp: 0.1,
    sceneControllerDragAmp: 0.1,
    speedAmp: 0.5,
    yawRate: 1,
    sceneControllerEdgeCameraYawRate: 3,
    sceneControllerWASDKeysAmp: 0.1
  },
  raycast: true,
  net: true,
  resize : {
    canvas: "full-screen",               // Change to any to make
    aspectRatio: 1.8,                    // aspectRatio system active
  },
  glBackgroundColor: { r: 0.0, g: 0.0, b: 0.0, a: 1.0 },
  textures: [],                          // readOnly in manifest
  tools: {},                             // readOnly in manifest
  operation: {},                         // readOnly in manifest
  commonObject: {},                      // readOnly in manifest
  dynamicBuffer: true,
  scene: {},                             // readOnly in manifest
  meshes: {},                            // readOnly in manifest
  limitations: {                         // readOnly in manifest
    maxTexturesInFragmentShader: null,   // readOnly in manifest
  },
  updateBeforeDraw: [],
  audioSystem: {},                        // readOnly in manifest
  pwa: {
    addToHomePage: true,
  },
  ready: false,
  onload: function () { },
};

export default App;