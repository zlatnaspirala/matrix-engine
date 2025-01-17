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

		loadDestructMesh27()

		if(ev.detail.hitObject.physics.enabled == true) {
			// ev.detail.hitObject.physics.currentBody.force.set(0, 0, 1000)
		}
	});

	var tex = {source: ["res/images/complex_texture_1/diffuse.webp"], mix_operation: "multiply", };

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
	// objGenerator(2)

	function createTetra() {
		var scale = 1;
		var verts = [
			new CANNON.Vec3(scale * 0, scale * 0, scale * 0),
			new CANNON.Vec3(scale * 1, scale * 0, scale * 0),
			new CANNON.Vec3(scale * 0, scale * 1, scale * 0),
			new CANNON.Vec3(scale * 0, scale * 0, scale * 1)];

		var offset = -0.35;
		//  var offset = -1;

		for(var i = 0;i < verts.length;i++) {
			var v = verts[i];
			v.x += offset;
			v.y += offset;
			v.z += offset;
		}
		return new CANNON.ConvexPolyhedron(verts,
			[
				[0, 3, 2], // -x
				[0, 1, 3], // -y
				[0, 2, 1], // -z
				[1, 2, 3], // +xyz
			]);
	}

	// NOT DONE - BUT WILL BE NICE
	function createFromObjDebis(group) {

		var scale = 1;

		console.log('GROUP:::', group)

		var verts = [];

		for(var index = 0;index < group.groupVert.length -3;index = index + 3) {
			verts.push(
				new CANNON.Vec3(scale * group.groupVert[index][0],
					 scale * group.groupVert[index][1],
					 scale * group.groupVert[index][2])
			)
		}

		var offset = -0.35;
		for(var i = 0;i < verts.length;i++) {
			var v = verts[i];
			v.x += offset;
			v.y += offset;
			v.z += offset;
		}

		var constructIndices = [];
		for(var i = 0;i < group.groupIndices.length-3 ;i=i+3) {
			constructIndices.push([group.groupIndices[i], group.groupIndices[i + 1], group.groupIndices[i + 2]])
		}
		// for(var i = 0;i < group.groupIndices.length -3;i=i+3) {
		// 	console.log('GROUP:group.groupIndices[index]::', group.groupIndices[index])
		// 	constructIndices.push([group.groupNorm[i][0], group.groupNorm[i][1], group.groupNorm[i][2]])
		// }
		// for(var i = 0;i < group.groupNorm.length -3;i=i+3) {
		// 	console.log('GROUP:group.groupNorm[index]::', group.groupNorm[index])
		// 	constructIndices.push([group.groupNorm[i][0], group.groupNorm[i][1], group.groupNorm[i][2]])
		// }
		// return new CANNON.ConvexPolyhedron(verts,
		// 	[
		// 		[0, 3, 2], // -x
		// 		[0, 1, 3], // -y
		// 		[0, 2, 1], // -z
		// 		[1, 2, 3], // +xyz
		// 	]);
		return new CANNON.ConvexPolyhedron(verts, constructIndices);
	}

	function createFromDebis(group) {

		var scale = 1;

		console.log('GROUP:::', group)

		var verts = [];

		for(var index = 0;index < group.groupVert.length -3;index = index + 3) {
			verts.push(
				new CANNON.Vec3(scale * group.groupVert[index][0],
					 scale * group.groupVert[index][1],
					 scale * group.groupVert[index][2])
			)
		}

		var offset = -0.35;
		for(var i = 0;i < verts.length;i++) {
			var v = verts[i];
			v.x += offset;
			v.y += offset;
			v.z += offset;
		}

		var constructIndices = [];
		for(var i = 0;i < group.groupIndices.length-3 ;i=i+3) {
			constructIndices.push([group.groupIndices[i], group.groupIndices[i + 1], group.groupIndices[i + 2]])
		}
		// for(var i = 0;i < group.groupIndices.length -3;i=i+3) {
		// 	console.log('GROUP:group.groupIndices[index]::', group.groupIndices[index])
		// 	constructIndices.push([group.groupNorm[i][0], group.groupNorm[i][1], group.groupNorm[i][2]])
		// }
		// for(var i = 0;i < group.groupNorm.length -3;i=i+3) {
		// 	console.log('GROUP:group.groupNorm[index]::', group.groupNorm[index])
		// 	constructIndices.push([group.groupNorm[i][0], group.groupNorm[i][1], group.groupNorm[i][2]])
		// }
		// return new CANNON.ConvexPolyhedron(verts,
		// 	[
		// 		[0, 3, 2], // -x
		// 		[0, 1, 3], // -y
		// 		[0, 2, 1], // -z
		// 		[1, 2, 3], // +xyz
		// 	]);
		return new CANNON.ConvexPolyhedron(verts, constructIndices);
	}

	function loadDestructMesh27() {
		
	}

	function loadDestructMesh() {
		// App.scene.me_cube_mesh.mesh.groups.forEach((group, index) => {
		// 	console.log('groupName:', group.groupName)
		// 	setTimeout(() => {

		// 		// testANy
		// 		world.Add("generatorLightTex", 1, group.groupName, tex, {
		// 			radius: 1,
		// 			custom_type: 'testConvex',
		// 			custom_geometry: createFromObjDebis(group),
		// 		});

		// 		var testCustomBody = new CANNON.Body({
		// 			mass: 1,
		// 			type: CANNON.Body.DYNAMIC,
		// 			shape: createTetra(),
		// 			position: new CANNON.Vec3(0, -10, 2)
		// 		});
		// 		// window.testCustomBody = testCustomBody;
		// 		physics.world.addBody(testCustomBody);
		// 		App.scene[group.groupName].physics.currentBody = testCustomBody;
		// 		App.scene[group.groupName].physics.enabled = true;
		// 		// // TEST WITH CUBE
		// 		// world.Add("cubeLightTex", 0.1, "cube_debis", tex);
		// 		// var testCustomBodyCUBE = new CANNON.Body({
		// 		// 	mass: 1,
		// 		// 	type: CANNON.Body.DYNAMIC,
		// 		// 	shape: new CANNON.Box(new CANNON.Vec3(0.1, 0.1, 0.1)),
		// 		// 	position: new CANNON.Vec3(0, -10, 2)
		// 		// });
		// 		// window.testCustomBody = testCustomBodyCUBE;
		// 		// physics.world.addBody(testCustomBodyCUBE);
		// 		// App.scene.cube_debis.physics.currentBody = testCustomBodyCUBE;
		// 		// App.scene.cube_debis.physics.enabled = true;
		// 		// /////////////////
		// 	}, 10 * index)
		// })
	}

	function onLoadObj(meshes) {
		for(let key in meshes) {matrixEngine.objLoader.initMeshBuffers(world.GL.gl, meshes[key])}
		var textuteImageSamplers2 = {source: ["res/images/armor.webp"], mix_operation: "multiply"};
		world.Add("obj", 1, "me_cube_mesh", textuteImageSamplers2, meshes.me_cube_mesh);
		App.scene.me_cube_mesh.position.y = 1;
		App.scene.me_cube_mesh.LightsData.ambientLight.set(1, 1, 1);
		App.scene.me_cube_mesh.position.z = -20;
		console.log('>.>>>>.>>>>.>>>>.>>>.>')

	}

	matrixEngine.objLoader.downloadMeshes({me_cube_mesh: "res/3d-objects/destructable-mesh/test.obj"}, onLoadObj);
}