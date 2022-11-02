import * as matrixEngine from './index.js';
import {runThis} from './apps/physics_for_objs';

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
  world = matrixEngine.matrixWorld.defineworld(canvas);
  world.callReDraw();
  // Make it global for dev - for easy console/debugger access
  // window.world = world;

  // Must be fixed gloabal access
  window.App = App;

  window.runThis = runThis;
  setTimeout(() => { runThis(world); }, 1);
};

window.matrixEngine = matrixEngine;
var App = matrixEngine.App;
export default App;
