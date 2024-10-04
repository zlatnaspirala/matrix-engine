import * as matrixEngine from './index.js';
// CHANGE HERE IF YOU WANNA USE app-build.hmtl
import {runThis} from './apps/public_3d_video_chat.js';

var world;
var App = matrixEngine.App;

if ('serviceWorker' in navigator) {
  window.addEventListener('load', function (e) {
    // navigator.serviceWorker.register('worker.js'); 
    App.ready = true;
    matrixEngine.Engine.initApp(webGLStart);
  });
} else {
  console.warn('Matrix Engine: No support for web workers in this browser.');
}

window.webGLStart = () => {
  window.App = App;
  world = matrixEngine.matrixWorld.defineworld(canvas);
  world.callReDraw();
  // Make it global for dev - for easy console/debugger access
  window.runThis = runThis;
  // setTimeout(() => { runThis(world); }, 1);
  runThis(world);
};

window.matrixEngine = matrixEngine;
var App = matrixEngine.App;
