// import * as matrixEngine from "./node_modules/matrix-engine/index.js";
// import { scriptManager } from "./lib/utility.js";
import * as matrixEngine from "./index.js";
import { runThis } from "./app/video_texture";

var world;
var App = matrixEngine.App;

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

matrixEngine.Engine.load_shaders("shaders/shaders.html");

window.matrixEngine = matrixEngine;

var App = matrixEngine.App;

export default App;
