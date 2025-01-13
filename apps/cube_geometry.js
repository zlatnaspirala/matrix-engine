/**
 * @Author Nikola Lukic
 * @Description Matrix Engine Api Example.
 */
import App from "../program/manifest";
import * as matrixEngine from "../index.js";

const REDLOG = "font-size:150%";
export var runThis = world => {
	let App = matrixEngine.App;

	App.camera.SceneController = true;

	var textuteImageSamplers = {
		source: ["res/images/complex_texture_1/diffuse.webp"],
		mix_operation: "multiply",
	};
	world.Add("cubeLightTex", 1, "MyCubeTex", textuteImageSamplers);

	world.Add("cubeLightTex", 0.02, "HELPER", textuteImageSamplers);
	world.Add("cubeLightTex", 0.02, "HELPER2", textuteImageSamplers);


	canvas.addEventListener('mousedown', (ev) => {
    matrixEngine.raycaster.checkingProcedure(ev);
  });

	addEventListener('ray.hit.event', (ev) => {
		 console.log(`%cYou shoot the object: ${ev.detail.hitObject.name}
			more data: ray ${ev.detail.ray} ,
			intersectionPoint : ${ev.detail.intersectionPoint}
			`, REDLOG);

			App.scene.HELPER.position.setPosition(ev.detail.intersectionPoint[0], ev.detail.intersectionPoint[1], ev.detail.intersectionPoint[2])
			App.scene.HELPER2.position.setPosition(ev.detail.ray[0], ev.detail.ray[1], ev.detail.ray[2])
	})

	// App.scene.MyCubeTex
	// App.scene.MyCubeTex.rotation.rotationSpeed.z = 70;
	// var oscilltor_variable = new matrixEngine.utility.OSCILLATOR(0.05, 2, 0.01);
	// App.updateBeforeDraw.push({
	// 	UPDATE: () => {
	// 		App.scene.MyCubeTex.geometry.setScale(oscilltor_variable.UPDATE());
	// 	}
	// });
}