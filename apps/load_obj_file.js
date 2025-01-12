/* eslint-disable no-unused-vars */

/**
 * @Author Nikola Lukic
 * @Description Matrix Engine Api Example.
 */

import App from "../program/manifest";

export var runThis = world => {

	// if you dont use obj or complex mesh you no need for this func
	function onLoadObj(meshes) {
		for(let key in meshes) {matrixEngine.objLoader.initMeshBuffers(world.GL.gl, meshes[key])}

		var textuteImageSamplers2 = {
			source: ["res/images/armor.webp"],
			mix_operation: "multiply",
		};

		var textuteImageSamplers = {
			source: ["res/images/dagger.webp"],
			mix_operation: "multiply",
		};

		world.Add("obj", 1, "armor", textuteImageSamplers2, meshes.armor);
		App.scene.armor.position.y = 1;
		App.scene.armor.rotation.rotationSpeed.y = 20;
		App.scene.armor.LightsData.ambientLight.set(1, 1, 1);
		App.scene.armor.position.z = -6;
		// App.scene.armor.mesh.setScale(3)
		setTimeout(() => {
			App.scene.armor.activateShadows('spot')
			App.scene.mac.activateShadows('spot')
		}, 2000)

		world.Add("obj", 1, "mac", textuteImageSamplers, meshes.mac);
		App.scene.mac.position.y = 1;
		App.scene.mac.position.z = -6;
		App.scene.mac.rotation.rotationSpeed.y = 20;
		App.scene.mac.LightsData.ambientLight.set(1, 1, 1);
	}

	/**
	 * @description
	 * For swap (initial orientation for object) use combination of
	 * swap[0,1]
	 * swap[0,2]
	 * swap[1,3]
	 * to switch x,y,z verts.
	 *  mac: "res/3d-objects/mac.obj"
	 */
	matrixEngine.objLoader.downloadMeshes(
		{armor: "res/3d-objects/armor.obj",
		mac: "res/3d-objects/mac.obj"
		},
		onLoadObj
	);

	//delete images_local_var;
};
