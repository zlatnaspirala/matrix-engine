import * as matrixEngine from './index.js';
import {runThis} from './apps/load_obj_sequence';

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
  window.world = world;
  window.App = App;
  window.runThis = runThis;

  // matrixEngine.utility.E('debugBox').style.display = 'block';
  // If you need this , you can prolong loading time
  setTimeout(() => { runThis(world); }, 1);
};

window.matrixEngine = matrixEngine;
var App = matrixEngine.App;
export default App;
