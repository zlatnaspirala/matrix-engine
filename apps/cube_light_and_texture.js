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
	world.Add("squareTex", 1, "floor", textuteImageSamplers);
	App.scene.floor.position.SetY(0);
	App.scene.floor.geometry.setScale(20);
	App.scene.floor.rotation.rotx = -90;
	App.scene.floor.position.y = -1;
	App.scene.floor.position.z = -20;

	// App.scene.floor.custom.gl_texture = function (object, t) {
	//   world.GL.gl.bindTexture(world.GL.gl.TEXTURE_2D, object.textures[t]);
	//   world.GL.gl.texParameteri(
	//     world.GL.gl.TEXTURE_2D,
	//     world.GL.gl.TEXTURE_MAG_FILTER,
	//     world.GL.gl.LINEAR
	//   );
	//   world.GL.gl.texParameteri(
	//     world.GL.gl.TEXTURE_2D,
	//     world.GL.gl.TEXTURE_MIN_FILTER,
	//     world.GL.gl.LINEAR
	//   );
	//   world.GL.gl.texParameteri(
	//     world.GL.gl.TEXTURE_2D,
	//     world.GL.gl.TEXTURE_WRAP_S,
	//     world.GL.gl.REPEAT
	//   );
	//   world.GL.gl.texParameteri(
	//     world.GL.gl.TEXTURE_2D,
	//     world.GL.gl.TEXTURE_WRAP_T,
	//     world.GL.gl.REPEAT
	//   );
	//   world.GL.gl.texImage2D(
	//     world.GL.gl.TEXTURE_2D,
	//     0,
	//     world.GL.gl.RGBA,
	//     world.GL.gl.RGBA,
	//     world.GL.gl.UNSIGNED_BYTE,
	//     object.textures[t].image
	//   );

	//   world.GL.gl.generateMipmap(world.GL.gl.TEXTURE_2D);
	// };

	world.Add("cubeLightTex", 1, "MyCubeTex1", textuteImageSamplers);
	world.Add("cubeLightTex", 1, "MyCubeTex2", textuteImageSamplers);


	App.scene.floor.activateShadows('spot');

	App.scene.MyCubeTex1.activateShadows('spot-shadow');

	// App.scene.MyCubeTex1.rotation.roty = 45;
	// App.scene.MyCubeTex2.rotation.roty = -45;

	App.scene.MyCubeTex1.position.y = 0;
	App.scene.MyCubeTex2.position.y = 0;
	App.scene.MyCubeTex1.position.x = 1;
	App.scene.MyCubeTex2.position.x = -1;
};
