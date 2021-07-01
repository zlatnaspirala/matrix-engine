
import * as matrixEngine from "./index.js";
import { runThis } from "./apps/my_world";

var world;
var App = matrixEngine.App;

matrixEngine.Engine.load_shaders("shaders/shaders.html");

if ("serviceWorker" in navigator) {
  window.addEventListener("load", function (e) {

    navigator.serviceWorker.register("worker.js");

    App.ready = true;
    matrixEngine.Engine.initApp(webGLStart);

  });
} else {
  console.warn("Matrix Engine: No support for web workers in this browser.");
}


function webGLStart() {

  matrixEngine.Engine.drawFPS();
  world = matrixEngine.matrixWorld.defineworld(canvas);
  world.callReDraw();

  // Make it global for dev - for easy console/debugger access
  window.App = App;

  // If you need this , you can prolong loading time
  setTimeout(() => { runThis(world) }, 250);

  // Run example
  // runThis(world);

}

window.matrixEngine = matrixEngine;
var App = matrixEngine.App;
export default App;
