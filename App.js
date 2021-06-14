// import * as matrixEngine from "./node_modules/matrix-engine/index.js";
import * as matrixEngine from "./index.js";
import { scriptManager } from "./lib/utility.js";
import { runThis } from "./app/my_world";

var world;
var App = matrixEngine.App;

function webGLStart() {
  world = matrixEngine.matrixWorld.defineworld(canvas);
  world.callReDraw();

  runThis(world);

  window.App = App;
}

window.Start = function () {
  matrixEngine.Engine.drawFPS();
  webGLStart();
};

matrixEngine.Engine.load_shaders("shaders/shaders.html");

window.matrixEngine = matrixEngine;

setTimeout(() => {
  matrixEngine.Engine.initApp();
}, 2000);

var App = matrixEngine.App;

export default App;
