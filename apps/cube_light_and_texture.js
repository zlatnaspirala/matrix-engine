/* eslint-disable no-unused-vars */

/**
 * @Author Nikola Lukic
 * @Description Matrix Engine Api Example.
 */

/* globals world App world */
import App from "../program/manifest";

export var runThis = world => {
	/* globals world App ENUMERATORS SWITCHER OSCILLATOR */

	var textuteImageSamplers = {
		source: ["res/images/complex_texture_1/diffuse.webp"],
		mix_operation: "multiply",
	};

	App.camera.SceneController = true;

	// // Floor
	world.Add("cubeLightTex", 1, "floor", textuteImageSamplers);
	App.scene.floor.position.SetY(0);
	App.scene.floor.geometry.setScaleByX(31);
	App.scene.floor.geometry.setScaleByZ(31);
	App.scene.floor.rotation.rotx = 0;
	App.scene.floor.position.y = -1;
	App.scene.floor.position.z = -6;

	App.scene.floor.setFBO()

	world.Add("cubeLightTex", 1, "MyCubeTex1", textuteImageSamplers);
	// world.Add("cubeLightTex", 1, "MyCubeTex2", textuteImageSamplers);
	App.scene.MyCubeTex1.position.y = 2;
	App.scene.MyCubeTex1.position.x = 0;
 	App.scene.MyCubeTex1.activateShadows()
};
