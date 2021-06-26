// import * as matrixEngine from "./node_modules/matrix-engine/index.js";
// import { scriptManager } from "./lib/utility.js";
import * as matrixEngine from "./index.js";
import { runThis } from "./app/audio_manipulation";
import { E } from "./lib/utility.js";

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
  run()
  App.ready = true;
  App.onload(e);
}, true);


function run() {
  // window.removeEventListener("click", run);
  new Promise((resolve, reject) => {
    try {
      matrixEngine.Engine.initApp(webGLStart)
      resolve()
    } catch(err) {
      reject(err)
    }

  }).catch((err) => {
    console.log("ERROR 0002: ", err)
  })
    .then(() => {
      console.log("cooliona for init ")
  });

}

function webGLStart() {
  matrixEngine.Engine.drawFPS();
  world = matrixEngine.matrixWorld.defineworld(canvas);
  world.callReDraw();
  runThis(world);
  window.App = App;
}

window.matrixEngine = matrixEngine;

var App = matrixEngine.App;

export default App;
