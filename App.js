// import * as matrixEngine from "./node_modules/matrix-engine/index.js";
// import { scriptManager } from "./lib/utility.js";
import * as matrixEngine from "./index.js";
import { runThis } from "./app/video_texture";

var world;
var App = matrixEngine.App;

matrixEngine.Engine.load_shaders("shaders/shaders.html");

if ("serviceWorker" in navigator) {
  window.addEventListener("load", function () {
    navigator.serviceWorker.register("worker.js");
  });
} else {
  console.warn("Matrix Engine: No support for web workers in this browser.");
}

window.addEventListener("click", run, false);

function run() { 
  matrixEngine.Engine.initApp();
  window.removeEventListener("click", run);
}

function webGLStart() {
  world = matrixEngine.matrixWorld.defineworld(canvas);
  world.callReDraw();
  runThis(world);
  App.onload();
  window.App = App;
}

window.Start = function () {
  matrixEngine.Engine.drawFPS();
  webGLStart();
};

window.matrixEngine = matrixEngine;

var App = matrixEngine.App;

export default App;
