import * as matrixEngine from './index.js';
// CHANGE HERE IF YOU WANNA USE app-build.hmtl
import {runThis} from './apps/cube_geometry.js';

var world;
var App = matrixEngine.App;

if ('serviceWorker' in navigator) {
  window.addEventListener('load', function (e) {
    // navigator.serviceWorker.register('worker.js'); 
  });
} else {
  console.warn('Matrix Engine: No webWorkers for locahost OR No support for web workers in this browser.');
}

window.addEventListener('load', function (e) {
	App.ready = true;
	matrixEngine.Engine.initApp(webGLStart);
});

window.webGLStart = () => {
  window.App = App;
  world = matrixEngine.matrixWorld.defineworld(canvas);
  world.callReDraw();
  // Make it global for dev - for easy console/debugger access
  // window.runThis = runThis;
  setTimeout(() => { runThis(world); }, 100);
  runThis(world);
};

window.matrixEngine = matrixEngine;
var App = matrixEngine.App;
