import * as matrixEngine from './index.js';
import {runThis} from './apps/physics_sphere';

var world;
var App = matrixEngine.App;

matrixEngine.Engine.load_shaders('shaders/shaders.html');

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
  window.world = world;
  window.App = App;
  window.runThis = runThis;

  matrixEngine.utility.E('debugBox').style.display = 'block';
  // canvas.addEventListener('mousedown', (ev) => { raycaster.checkingProcedure(ev); });

  // If you need this , you can prolong loading time
  setTimeout(() => { runThis(world); }, 250);
};

window.matrixEngine = matrixEngine;
var App = matrixEngine.App;
export default App;
