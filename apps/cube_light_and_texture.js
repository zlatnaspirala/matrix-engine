/**
 * @Author Nikola Lukic
 * @Description Matrix Engine Api Example.
 */
import App from "../program/manifest";
export var runThis = world => {
	var textuteImageSamplers = {
		source: ["res/images/complex_texture_1/diffuse.webp"],
		mix_operation: "multiply",
	};
	App.camera.SceneController = true;

	// Floor
	world.Add("cubeLightTex", 1, "floor", textuteImageSamplers);
	App.scene.floor.geometry.setScaleByX(5);
	App.scene.floor.geometry.setScaleByZ(5);
	// App.scene.floor.rotation.rotx = -90;
	App.scene.floor.position.y = -1;
	App.scene.floor.position.z = -9;

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
	// world.Add("cubeLightTex", 1, "MyCubeTex2", textuteImageSamplers);


	App.scene.floor.activateShadows('spot-shadow');
	App.scene.MyCubeTex1.activateShadows('spot-shadow');
	// App.scene.MyCubeTex2.activateShadows('spot-shadow');
	 App.scene.MyCubeTex1.shadows.outerLimit = 2
	 // App.scene.MyCubeTex2.shadows.outerLimit = 1
	App.scene.floor.shadows.outerLimit = 2

	App.scene.floor.shadows.lightPosition[2] = -6
	App.scene.MyCubeTex1.shadows.lightPosition[2] = -6

	App.scene.floor.shadows.lightPosition[1] = 10
	App.scene.MyCubeTex1.shadows.lightPosition[1] = 10

	// App.scene.MyCubeTex1.rotation.roty = 45;
	// App.scene.MyCubeTex2.rotation.roty = -45;

	App.scene.MyCubeTex1.position.y = 1;
	// App.scene.MyCubeTex2.position.y = 0;
	App.scene.MyCubeTex1.position.x = 0;
	// App.scene.MyCubeTex2.position.x = -1;
};
