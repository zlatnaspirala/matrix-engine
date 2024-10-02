import * as matrixEngine from './index.js';
import {runThis} from './apps/networking2_basic.js';
// import {runThis} from './apps/shaders.js';
// import {runThis} from './apps/load-maps.js';

var world;
var App = matrixEngine.App;

if ('serviceWorker' in navigator) {
  window.addEventListener('load', function (e) {
    // navigator.serviceWorker.register('worker.js'); 
		console.warn('Matrix Engine: Before load.');
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
