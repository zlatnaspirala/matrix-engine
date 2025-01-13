/**
 * @Author Nikola Lukic
 * @Description Matrix Engine Api Example.
 */

import App from "../program/manifest.js";
import * as matrixEngine from "../index.js";
import * as CANNON from 'cannon';

window.App = App
export var runThis = world => {
	App.camera.SceneController = true;

	canvas.addEventListener('mousedown', (ev) => {
		matrixEngine.raycaster.checkingProcedure(ev);
	});

	window.addEventListener('ray.hit.event', (ev) => {
		console.log("You shoot the object! Nice!", ev)
		if(ev.detail.hitObject.physics.enabled == true) {
			ev.detail.hitObject.physics.currentBody.force.set(0, 0, 1000)
		}
	});

	var tex = {source: ["res/images/complex_texture_1/diffuse.webp"],	mix_operation: "multiply",};

	let gravityVector = [0, 0, -9.82];
	let physics = world.loadPhysics(gravityVector);
	// Add ground
	physics.addGround(App, world, tex);

	// world.Add("cubeLightTex", 1, "me_cube", tex);
	// var testCustomBody = new CANNON.Body({
	// 	mass: 10,
	// 	type: CANNON.Body.DYNAMIC,
	// 	shape: createTetra(),
	// 	position: new CANNON.Vec3(0, -10, 2)
	// });
	// window.testCustomBody = testCustomBody;
	// physics.world.addBody(testCustomBody);
	// App.scene.me_cube.physics.currentBody = testCustomBody;
	// App.scene.me_cube.physics.enabled = true;

	//
	const objGenerator = (n) => {
		for(var j = 0;j < n;j++) {
			setTimeout(() => {
				world.Add("sphereLightTex", 1, "BALL" + j, tex);
				var b2 = new CANNON.Body({
					mass: 1,
					linearDamping: 0.005,
					angularDamping: 0.5,
					angularVelocity: new CANNON.Vec3(0.01, 0.01, 0),
					position: new CANNON.Vec3(1, -10, 15),
					shape: new CANNON.Sphere(1)
				});

				physics.world.addBody(b2);
				App.scene['BALL' + j].physics.currentBody = b2;
				App.scene['BALL' + j].physics.enabled = true;
			}, 1000 * j)
		}
	}


	function onLoadObj(meshes) {
		for(let key in meshes) {matrixEngine.objLoader.initMeshBuffers(world.GL.gl, meshes[key])}
		var textuteImageSamplers2 = {source: ["res/images/armor.webp"],	mix_operation: "multiply"};
		world.Add("obj", 1, "me_cube_mesh", textuteImageSamplers2, meshes.me_cube_mesh);
		App.scene.me_cube_mesh.position.y = 1;
		App.scene.me_cube_mesh.LightsData.ambientLight.set(1, 1, 1);
		App.scene.me_cube_mesh.position.z = -20;
		console.log('>.>>>>.>>>>.>>>>.>>>.>')
		App.scene.me_cube_mesh.mesh.groups.forEach((group, index) => {
			console.log('groupName:', group.groupName)
			setTimeout(() => {
				


			}, 1000 * index)
		})
	}

	matrixEngine.objLoader.downloadMeshes({me_cube_mesh: "res/3d-objects/destructable-mesh/test.obj"}, onLoadObj);
}