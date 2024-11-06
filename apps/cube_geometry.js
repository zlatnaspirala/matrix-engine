/**
 * @Author Nikola Lukic
 * @Description Matrix Engine Api Example.
 */
import App from "../program/manifest";
import * as matrixEngine from "../index.js";

export var runThis = world => {
	var textuteImageSamplers = {
		source: ["res/images/complex_texture_1/diffuse.webp"],
		mix_operation: "multiply",
	};
	world.Add("cubeLightTex", 1, "MyCubeTex", textuteImageSamplers);
	App.scene.MyCubeTex.rotation.rotationSpeed.z = 70;
	var oscilltor_variable = new matrixEngine.utility.OSCILLATOR(0.05, 2, 0.01);
	App.updateBeforeDraw.push({
		UPDATE: () => {
			App.scene.MyCubeTex.geometry.setScale(oscilltor_variable.UPDATE());
		}
	});
}