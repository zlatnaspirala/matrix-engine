
import * as matrixEngine from "./index.js";
import { runThis } from "./app/adding_color_cube.js";

var world;
var App = matrixEngine.App;

matrixEngine.Engine.load_shaders("shaders/shaders.html");

if ("serviceWorker" in navigator) {
  window.addEventListener("load", function (e) {
    navigator.serviceWorker.register("worker.js");
  });
} else {
  console.warn("Matrix Engine: No support for web workers in this browser.");
}

window.addEventListener('load', function(e) {
  App.ready = true;
  matrixEngine.Engine.initApp(webGLStart);
});

function webGLStart() {

  matrixEngine.Engine.drawFPS();
  world = matrixEngine.matrixWorld.defineworld(canvas);
  world.callReDraw();

  // Make it global for dev - for easy console/debugger access
  window.App = App;

  // If you need this , you can prolong loading time
  setTimeout(() => { runThis(world) }, 100);

  // Run example
  // runThis(world);

}

window.matrixEngine = matrixEngine;
var App = matrixEngine.App;
export default App;
