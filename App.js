import * as matrixEngine from './index.js';
import {runThis} from './apps/adding_color_triangle';

import * as raycaster from './lib/raycast';

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

  matrixEngine.utility.E("debugBox").style.display = "block"
canvas.addEventListener('mousedown', (ev) => {
  const { clientX, clientY, screenX, screenY } = ev;
  
  var outp = mat4.create();
  var outv = mat4.create();
  const ray = raycaster.unproject(
      [clientX, clientY],
      [ 0, 0, screenX, screenY ], //assume the canvas is full-size
       mat4.invert(outp, world.pMatrix), //your invert projection matrix
      mat4.invert(outv, App.scene.MyColoredTriangle1.mvMatrix), //your invert view matrix
  );

  const intersectionPoint = vec3.create();
/* const triangle = [ //example triangle
      vec3.fromValues(-1, -1, 0),
      vec3.fromValues(1, 1, 0),
      vec3.fromValues(-1, 1, 0),
  ]; */

 
  const triangle = [
    [App.scene.MyColoredTriangle1.geometry.vertices[0],
    App.scene.MyColoredTriangle1.geometry.vertices[1],
    App.scene.MyColoredTriangle1.geometry.vertices[2] ],
    [ App.scene.MyColoredTriangle1.geometry.vertices[3],
    App.scene.MyColoredTriangle1.geometry.vertices[4],
    App.scene.MyColoredTriangle1.geometry.vertices[5] ],
    [App.scene.MyColoredTriangle1.geometry.vertices[6],
    App.scene.MyColoredTriangle1.geometry.vertices[7],
    App.scene.MyColoredTriangle1.geometry.vertices[8] ]]; 


  if (raycaster.rayIntersectsTriangle(
        vec3.fromValues(
          0, // matrixEngine.Events.camera.xPos,
          0, // matrixEngine.Events.camera.yPos,
          0)
      , // your camera position - rayOrigin
      ray,
      triangle,
      intersectionPoint,
  )) {
      console.log('hits', intersectionPoint);
      matrixEngine.utility.E("debugBox").style.background = "red"
  } else {
    matrixEngine.utility.E("debugBox").style.background = "green"
  }
})

  // If you need this , you can prolong loading time
  setTimeout(() => {
    runThis(world);
  }, 250);

  // Run example
  // runThis(world);
}

window.matrixEngine = matrixEngine;
var App = matrixEngine.App;
export default App;
