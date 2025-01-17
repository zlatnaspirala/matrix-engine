import * as matrixEngine from './index.js';
// CHANGE HERE IF YOU WANNA USE app-build.hmtl
import {runThis} from './apps/destruct_cube.js';
// import {runThis} from './apps/custom_geometry.js';

var world;
var App = matrixEngine.App;

window.addEventListener('load', function(e) {
	if('serviceWorker' in navigator) {
		// navigator.serviceWorker.register('worker.js'); DISABLED
	} else {
		console.warn('Matrix Engine: No webWorkers for locahost OR No support for web workers in this browser.');
	}
	App.ready = true;
	matrixEngine.Engine.initApp(webGLStart);
});

window.webGLStart = () => {
	window.App = App;
	world = matrixEngine.matrixWorld.defineworld(canvas);
	world.callReDraw();
	runThis(world);
};

window.matrixEngine = matrixEngine;
var App = matrixEngine.App;