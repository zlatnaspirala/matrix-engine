/**
 *@Author Nikola Lukic
 *@Description Matrix Engine Api Example
 * Sprite Animation based on CPU / program
 * 
 */
import {SpriteAnimation} from "../lib/matrix-textures";

export var runThis = world => {
	var textuteImageSamplers = {
		source: ["res/images/animation-sprites/explosion2.png"],
		mix_operation: "multiply",
		params: {
			MIPMAP: true,
			spriteAnimation: new SpriteAnimation()
		}
	}

	world.Add("squareTex", 1, "MySquareTexure1", textuteImageSamplers);
	world.Add("cubeLightTex", 1, "MyCubeTexure1", textuteImageSamplers);
	App.scene.MyCubeTexure1.position.x = -2;

	// Access is App.scene.MySquareTexure1.texParams.spriteAnimation
	// this.shema = [4, 4]
	// this.updateAfter = 20;


	function onLoadObj(meshes) {
		for(let key in meshes) {matrixEngine.objLoader.initMeshBuffers(world.GL.gl, meshes[key])}

		var textuteImageSamplers2 = {
			source: ["res/images/animation-sprites/explosion2.png"],
			mix_operation: "multiply",
			params: {
				MIPMAP: true,
				spriteAnimation: new SpriteAnimation()
			}
		}

		// var textuteImageSamplers = {
		// 	source: ["res/images/dagger.webp"],
		// 	mix_operation: "multiply",
		// 	params: {
		// 		MIPMAP: true,
		// 		spriteAnimation: new SpriteAnimation()
		// 	}
		// };

		world.Add("obj", 1, "armor", textuteImageSamplers2, meshes.armor);
		App.scene.armor.position.x = 3;
		App.scene.armor.position.y = 0;
		App.scene.armor.rotation.rotationSpeed.y = 20;
		App.scene.armor.LightsData.ambientLight.set(1, 1, 1);
		// App.scene.armor.position.z = -6;


		// App.scene.armor.mesh.setScale(3)

		setTimeout(() => {
			App.scene.armor.activateShadows('spot')
			App.scene.mac.activateShadows('spot')
			// App.scene.armor.shadows.activeUpdate();
			// App.scene.armor.shadows.animatePositionY();
		}, 2000)

		// world.Add("cubeLightTex", 1, "MyCubeTex", textuteImageSamplers2);
		// App.scene.MyCubeTex.activateShadows()
		world.Add("obj", 1, "mac", textuteImageSamplers2, meshes.mac);
		App.scene.mac.position.y = 0;
		App.scene.mac.position.x = 4;
		App.scene.mac.rotation.rotationSpeed.y = 50;
		App.scene.mac.LightsData.ambientLight.set(1, 1, 1);
	}

	/**
	 * @description
	 * For swap (initial orientation for object) use combination of
	 * swap[0,1]
	 * swap[0,2]
	 * swap[1,3]
	 * to switch x,y,z verts.
	 */
	matrixEngine.objLoader.downloadMeshes(
		{armor: "res/3d-objects/armor.obj", mac: "res/3d-objects/mac.obj"},
		onLoadObj,
		// {swap: [0, 2]}
	);
};
