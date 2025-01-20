/**
 * @Author Nikola Lukic
 * @Description Matrix Engine Api Example.
 */

import App from "../program/manifest.js";
import * as matrixEngine from "../index.js";
import * as CANNON from 'cannon';
import {byId} from "../networking2/matrix-stream.js";
import {mesh_, meshB} from "../public/res/3d-objects/destructable-mesh/json1/test1.js";
import {meshNIK} from "../public/res/3d-objects/destructable-mesh/json1/test2.js";

window.App = App
export var runThis = world => {
	document.getElementsByClassName('button2')[0].click();
	App.camera.SceneController = true;

	canvas.addEventListener('mousedown', (ev) => {
		matrixEngine.raycaster.checkingProcedure(ev);
	});

	window.addEventListener('ray.hit.event', (ev) => {
		console.log("Create destruct !", ev)

		loadDestructMesh27(App.scene.me_cube_mesh)

		if(ev.detail.hitObject.physics.enabled == true) {
			// ev.detail.hitObject.physics.currentBody.force.set(0, 0, 1000)
		}
	});

	var tex = {source: ["res/images/complex_texture_1/diffuse.webp"], mix_operation: "multiply", };

	let gravityVector = [0, 0, -9.82];
	let physics = world.loadPhysics(gravityVector);
	// Add ground
	physics.addGround(App, world, tex);

	console.log(physics.world)
	physics.world.solver.iterations = 20;
	physics.world.defaultContactMaterial.contactEquationStiffness = 1e10;
	physics.world.defaultContactMaterial.contactEquationRelaxation = 10;

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
	App.scene['FLOOR_STATIC'].glDrawElements.mode = "LINE_STRIP"
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
					position: new CANNON.Vec3(1, -10, 35),
					shape: new CANNON.Sphere(1)
				});

				physics.world.addBody(b2);
				App.scene['BALL' + j].physics.currentBody = b2;
				App.scene['BALL' + j].physics.enabled = true;
			}, 1000 * j)
		}
	}


	function createTetra() {
		var scale = 2;
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

	function createBoxPolyhedron(size) {
		size = size || 1;
		var box = new CANNON.Box(new CANNON.Vec3(size, size, size));
		return box.convexPolyhedronRepresentation;
	}


	function fromObjToConvexPolyhedron(obj) {
		var scale = 2;
		console.log('OBJ::: ----')
		var rawVerts = obj.mesh.TEST_verts;
		// var rawVerts = obj.mesh.vertices;
		var rawFaces = obj.mesh.TEST_FACES;
		var rawOffset = [0, 0, 0];
		var verts = [], faces = [], offset;
		// Get vertices
		for(var j = 0;j < rawVerts.length;j += 3) {
			verts.push(new CANNON.Vec3(rawVerts[j] * scale,
				rawVerts[j + 1] * scale,
				rawVerts[j + 2] * scale));
		}
		var offset = -0.35;
		//  var offset = -1;
		for(var i = 0;i < verts.length;i++) {
			var v = verts[i];
			v.x += offset;
			v.y += offset;
			v.z += offset;
		}
		/**
 
		 */
		// Get faces
		for(var j = 0;j < rawFaces.length;j += 3) {
			faces.push([rawFaces[j], rawFaces[j + 1], rawFaces[j + 2]]);
		}
		// Get offset
		offset = new CANNON.Vec3(rawOffset[0], rawOffset[1], rawOffset[2]);
		// Construct polyhedron
     return new CANNON.ConvexPolyhedron(verts, faces);

		var scale = 2;
		var verts1 = [
			new CANNON.Vec3(scale * 0, scale * 0, scale * 0),
			new CANNON.Vec3(scale * 1, scale * 0, scale * 0),
			new CANNON.Vec3(scale * 0, scale * 1, scale * 0),
			new CANNON.Vec3(scale * 0, scale * 0, scale * 1)];

		return new CANNON.ConvexPolyhedron(verts1,
		 	[
				[0, 3, 2], // -x
				[0, 1, 3], // -y
				[0, 2, 1], // -z
				[1, 2, 3], // +xyz
			]
		);
		// [2, 1, 0],
		// [0, 3, 2],
		// [1, 3, 0],
		// [2, 3, 1]])
	}

	var preventFlag = false;
	function loadDestructMesh27(parent) {
		if(preventFlag == true) {
			return;
		}
		preventFlag = true;

		function onLoadDestructMesh27(meshes) {
			var textuteImageSamplers2 = {source: ["res/images/armor.webp"], mix_operation: "multiply"};
			for(let key in meshes) {matrixEngine.objLoader.initMeshBuffers(world.GL.gl, meshes[key])}
			// parent.selfDestroy(1)
			for(let key in meshes) {
				console.log("meshes[key].name", meshes[key])
				world.Add("obj", 0.5, key, textuteImageSamplers2, meshes[key]);
				var S = createTetra(App.scene[key])
				// var S = createBoxPolyhedron()
				// world.Add("generatorLightTex", 1, key , tex, {
				// 	radius: 1,
				// 	custom_type: 'testConvex',
				// 	custom_geometry: S,
				// });
				App.scene[key].LightsData.ambientLight.set(1, 1, 1);
				App.scene[key].position.y = 14;
				App.scene[key].position.z = -10;

				var testCustomBody = new CANNON.Body({
					mass: 1,
					type: CANNON.Body.DYNAMIC,
					shape: S,// fromObjToConvexPolyhedron(App.scene[meshes[key].name]),
					position: new CANNON.Vec3(0, -10, 14)
				});
				// window.testCustomBody = testCustomBody;
				physics.world.addBody(testCustomBody);
				App.scene[key].physics.currentBody = testCustomBody;
				App.scene[key].physics.enabled = true;
				App.scene[key].glDrawElements.mode = "LINE_STRIP";
				// App.scene[meshes[key].name + "H"].selfDestroy(1000)

				// objGenerator(1)

			}
		}

		function genNamesForDestruct(size) {
			console.log("SIZE ", size)
			var name;
			for(var x = 1;x < size;x++) {
				if(x < 10) {
					name = "meDestruct_cell_00" + x;
					matrixEngine.objLoader.downloadMeshes({
						["meDestruct_cell_00" + x]: `res/3d-objects/destructable-mesh/27/${name}.obj`
					}, onLoadDestructMesh27);
				} else if(x >= 10 && x <= 99) {
					name = "meDestruct_cell_0" + x;
					matrixEngine.objLoader.downloadMeshes({
						["meDestruct_cell_0" + x]: `res/3d-objects/destructable-mesh/27/${name}.obj`
					}, onLoadDestructMesh27);
				}

			}
		}

		genNamesForDestruct(2)
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

	matrixEngine.objLoader.downloadMeshes(
		{me_cube_mesh: "res/3d-objects/destructable-mesh/27/meDestruct_cell_001.obj"}, onLoadObj);
}