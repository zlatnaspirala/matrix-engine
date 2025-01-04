/**
 * @Author Nikola Lukic
 * @license MIT
 * @Description Matrix Engine Api Example.
 * Free for all
 */
import App from "../program/manifest";

export var runThis = world => {
	var textuteImageSamplers = {
		source: ["res/images/complex_texture_1/diffuse.webp"],
		mix_operation: "multiply",
	};

	matrixEngine.Events.camera.yawAmp = 5
	App.camera.SceneController = true;

	// Floor
	world.Add("cubeLightTex", 1, "floor", textuteImageSamplers);
	App.scene.floor.position.SetY(0);
	App.scene.floor.geometry.setScaleByX(31);
	App.scene.floor.geometry.setScaleByZ(31);
	// App.scene.floor.rotation.roty = 90;
	App.scene.floor.position.y = -1;
	App.scene.floor.position.z = 0;
	App.scene.floor.rotation.roty = -90
	App.scene.floor.setFBO({
		cameraX: 0,
		cameraY: 0,
		cameraZ: 20,
		pitch: 0,
		yaw: 0
	})
	App.scene.floor.activateShadows('spot-shadow')

	world.Add("squareTex", 1, "MyCubeTex1", textuteImageSamplers);
	App.scene.MyCubeTex1.activateShadows('spot-shadow')
	App.scene.MyCubeTex1.geometry.setScaleByX(2);
	App.scene.MyCubeTex1.geometry.setScaleByY(2);
	App.scene.MyCubeTex1.position.y = 3;
	App.scene.MyCubeTex1.position.x = 7;

	setTimeout(() => {
		App.scene.MyCubeTex1.shadows.lightPosition = [0.1, -0.2, 0.1]
	}, 200)


	function onLoadObj(meshes) {
		for(let key in meshes) {matrixEngine.objLoader.initMeshBuffers(world.GL.gl, meshes[key])}
		var textuteImageSamplers2 = {
			source: ["res/images/armor.webp", "res/images/armor.webp"],
			mix_operation: "multiply",
		};
		var textuteImageSamplers = {
			source: ["res/images/dagger.webp"],
			mix_operation: "multiply",
		};
		world.Add("obj", 1, "armor", textuteImageSamplers2, meshes.armor);
		App.scene.armor.position.y = 3;
		App.scene.armor.rotation.rotationSpeed.y = 20;
		App.scene.armor.LightsData.ambientLight.set(1, 1, 1);
		App.scene.armor.position.z = -6;
		App.scene.armor.mesh.setScale(3)

		setTimeout(() => {
			App.scene.armor.activateShadows('spot-shadow')
			App.scene.mac.activateShadows('spot-shadow')

			App.scene.armor.shadows.lightPosition = [10, 2, -1]
		}, 200)

		world.Add("obj", 1, "mac", textuteImageSamplers, meshes.mac);
		App.scene.mac.position.y = 1;
		App.scene.mac.position.x = -2;
		App.scene.mac.rotation.rotationSpeed.y = 20;
		App.scene.mac.LightsData.ambientLight.set(1, 1, 1);
		App.scene.mac.mesh.setScale(3)
	}
	matrixEngine.objLoader.downloadMeshes(
		{armor: "res/3d-objects/armor.obj", mac: "res/3d-objects/mac.obj"},
		onLoadObj,
		{swap: [0, 2]}
	);
};