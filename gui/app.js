import * as matrixEngine from '../index.js';
import App from "../program/manifest.js";
import {anyCanvas, VT} from "../lib/engine.js";
let Vjs3 = matrixEngine.Engine.Vjs3;
var world;


window.addEventListener('load', function(e) {
	if('serviceWorker' in navigator) {
		// navigator.serviceWorker.register('worker.js');
	} else {
		console.warn('Matrix Engine: No support for web workers in this browser.');
	}
	App.ready = true;
	matrixEngine.Engine.initApp(webGLStart);
})

var runThis = world => {
	let ENUMERATORS = matrixEngine.utility.ENUMERATORS;
	let E = matrixEngine.utility.E;
	var tex = {
		source: ["res/images/complex_texture_1/diffuse.webp"],
		mix_operation: "multiply",
	};

	world.Add("cubeLightTex", 12, "outsideBox", tex);
	App.scene.outsideBox.position.y = 0;
	App.scene.outsideBox.position.z = -55;
	App.scene.outsideBox.rotation.rotationSpeed.x = 20;
	App.scene.outsideBox.rotation.rotationSpeed.y = 5;
	// App.scene.outsideBox.rotValue = 90;
	App.scene.outsideBox.LightsData.ambientLight.set(1, 1, 1);
	// App.scene.outsideBox.glBlend.blendEnabled = true;
	App.scene.outsideBox.glBlend.blendParamSrc = ENUMERATORS.glBlend.param[4];
	App.scene.outsideBox.glBlend.blendParamDest = ENUMERATORS.glBlend.param[4];
	App.scene.outsideBox.rotation.SetDirection(1, 1, 0.5);
	App.scene.outsideBox.rotation.rotz = -90

	/////////////////////////////////////////
	// CANVAS2D_SURFACE - IS TEXTURE EDITOR
	/////////////////////////////////////////
	E("HOLDER_STREAMS").style.display = "block";

	setTimeout(function() {
		App.camera.SceneController = true;

		App.scene.outsideBox.streamTextures = new Vjs3(
			"../2DTextureEditor/gui.html",
			"actualTexture")
		App.scene.outsideBox.streamTextures.showTextureEditor();

		// App.scene.outsideBox.streamTextures = new Vjs3 (
		//   "../2DTextureEditor/templates/slot/",
		//   "HELLO_WORLD")
		// App.scene.outsideBox.streamTextures.showTextureEditor();
		// setTimeout(function() { 
		// 	// E("HOLDER_STREAMS").style.display = "none" 
		// 	}, 10000);
	}, 500);
};

window.webGLStart = () => {
	// dev
	window.App = App;
	world = matrixEngine.matrixWorld.defineworld(canvas);
	world.callReDraw();

	runThis(world)
};

window.matrixEngine = matrixEngine;