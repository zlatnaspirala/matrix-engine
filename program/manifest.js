/* eslint-disable no-unused-vars */
/**
 * visual-js webgl2 project
 * file : manifest.js
 */
// "use strict";

var App = {
  name : "webgl2 experimental by default.",
  version : 0.4,
  events : true,
  logs : false ,
  draw_interval : 10 ,
  antialias : false ,
  camera : { viewAngle : 45 ,
    nearViewpoint : 0.1 ,
    farViewpoint : 1000 ,
    edgeMarginValue : 100 ,
    FirstPersonController : false
  },
  textures : [] ,                         // readOnly in manifest
  tools : {},                             // readOnly in manifest
  operation : new Object(),               // readOnly in manifest
  commonObject : new Object(),            // readOnly in manifest
  dynamicBuffer : true ,
  scene : {},                             // readOnly in manifest
  meshes : {},                            // readOnly in manifest
  limitations : {                         // readOnly in manifest
    maxTexturesInFragmentShader : null ,
  },
  updateBeforeDraw : [],
  audioSystem : {},
  ready : false,
  onload : function(){},
};

export default App;