/**
 * @Author Nikola Lukic
 * @Description Matrix Engine Api Example.
 * Still not perfect work for polyhedron / convex physics but can be aproxime 
 * used for desstruct effect.
 * Only perfect working regine for createTetra construct func.
 */
import App from "../program/manifest.js";
import * as matrixEngine from "../index.js";
import * as CANNON from 'cannon';

export var runThis = world => {
	document.getElementsByClassName('button2')[0].click();
	App.camera.SceneController = true;
	matrixEngine.Events.camera.yPos = 16;
	matrixEngine.Events.camera.zPos = 56;
	var RND = matrixEngine.utility.randomIntFromTo;
	canvas.addEventListener('mousedown', (ev) => {
		matrixEngine.raycaster.checkingProcedure(ev);
	});

	let preventDBLDestruct1 = false;
	let preventDBLDestruct2 = false;
	let preventDBLDestruct3 = false;

	window.addEventListener('ray.hit.event', (ev) => {

		if(ev.detail.hitObject.name.indexOf('D1') !== -1 &&
			preventDBLDestruct1 == false) {
			console.log("Create destruct 1!", ev)
			preventDBLDestruct1 = true;
			destructMe('D1', 27, 1)
			return;
		}

		if(ev.detail.hitObject.name.indexOf('D2') !== -1 &&
			preventDBLDestruct2 == false) {
			console.log("Create destruct 2!", ev)
			preventDBLDestruct2 = true;
			destructMe('D2', 27, 5)
			return;
		}

		if(ev.detail.hitObject.name.indexOf('D3') !== -1 &&
			preventDBLDestruct3 == false) {
			console.log("Create destruct 3!", ev)
			preventDBLDestruct3 = true;
			destructMe('D3', 27, 15)
			return;
		}
	});

	var tex = {source: ["res/images/complex_texture_1/diffuse.webp"], mix_operation: "multiply", };
	let gravityVector = [0, 0, -9.82];
	let physics = world.loadPhysics(gravityVector);
	// Add ground
	physics.addGround(App, world, tex);
	physics.world.solver.iterations = 20;
	physics.world.defaultContactMaterial.contactEquationStiffness = 1e10;
	physics.world.defaultContactMaterial.contactEquationRelaxation = 10;

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

	function createISO() {

		var scale = 0.5;

		const rawVerts = [
			-1, -1, -1, 1, -1, -1, 1, 1, -1, -1, 1, -1,
			-1, -1, 1, 1, -1, 1, 1, 1, 1, -1, 1, 1,
		];

		const rawFaces = [
			2, 1, 0, 0, 3, 2,
			0, 4, 7, 7, 3, 0,
			0, 1, 5, 5, 4, 0,
			1, 2, 6, 6, 5, 1,
			2, 3, 7, 7, 6, 2,
			4, 5, 6, 6, 7, 4
		];

		var rawOffset = [0, 0, 0];
		var verts = [], faces = [], offset;
		// Get vertices
		for(var j = 0;j < rawVerts.length;j += 3) {
			verts.push(new CANNON.Vec3(rawVerts[j] * scale,
				rawVerts[j + 1] * scale,
				rawVerts[j + 2] * scale));
		}
		// var offset = -0.35;
		// for(var i = 0;i < verts.length;i++) {
		// 	var v = verts[i];
		// 	v.x += offset;
		// 	v.y += offset;
		// 	v.z += offset;
		// }
		for(var j = 0;j < rawFaces.length;j += 3) {
			faces.push([rawFaces[j], rawFaces[j + 1], rawFaces[j + 2]]);
		}
		offset = new CANNON.Vec3(rawOffset[0], rawOffset[1], rawOffset[2]);
		return new CANNON.ConvexPolyhedron(verts, faces);
	}

	function createTetra() {
		var scale = 2;
		var verts = [
			new CANNON.Vec3(scale * 0, scale * 0, scale * 0),
			new CANNON.Vec3(scale * 1, scale * 0, scale * 0),
			new CANNON.Vec3(scale * 0, scale * 1, scale * 0),
			new CANNON.Vec3(scale * 0, scale * 0, scale * 1)];
		var offset = -0.35;
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

		if(!obj.mesh) {
			return obj.custom_geometry;
			console.log('OBJ1:::from customgeometry - ', rawFaces)
		} else {
			// var rawVerts = obj.mesh.TEST_verts;
			// var rawFaces = obj.mesh.TEST_FACES;
			var rawVerts = obj.mesh.vertices;
			var rawFaces = obj.mesh.indices;
			console.log('OBJ1:::from OBJ - ', rawFaces)
		}

		var rawOffset = [0, 0, 0];
		var verts = [], faces = [], offset;
		// Get vertices
		for(var j = 0;j < rawVerts.length;j += 3) {
			verts.push(new CANNON.Vec3(rawVerts[j] * scale,
				rawVerts[j + 1] * scale,
				rawVerts[j + 2] * scale));
		}
		var offset = -0.35;
		for(var i = 0;i < verts.length;i++) {
			var v = verts[i];
			v.x += offset;
			v.y += offset;
			v.z += offset;
		}
		for(var j = 0;j < rawFaces.length;j += 3) {
			faces.push([rawFaces[j], rawFaces[j + 1], rawFaces[j + 2]]);
		}
		offset = new CANNON.Vec3(rawOffset[0], rawOffset[1], rawOffset[2]);
		return new CANNON.ConvexPolyhedron(verts, faces);
	}

	var preventFlag = false;
	function loadDestructMesh27(name, pos, scale) {
		if(preventFlag == true) {return;}
		preventFlag = true;
		function onLoadDestructMesh27(meshes) {
			var textuteImageSamplers2 = {source: ["res/images/armor.webp"], mix_operation: "multiply"};
			for(let key in meshes) {matrixEngine.objLoader.initMeshBuffers(world.GL.gl, meshes[key])}
			for(let key in meshes) {
				new Promise((resolve) => {

					world.Add("obj", 1, name + key, textuteImageSamplers2, meshes[key]);
					setTimeout(() => {
						// var S = fromObjToConvexPolyhedron(App.scene[key])
						var S = createBoxPolyhedron(scale)
						App.scene[name + key].LightsData.ambientLight.set(1, 1, 1);
						App.scene[name + key].position.y = 14;
						App.scene[name + key].position.z = -10;
						var testCustomBody = new CANNON.Body({
							mass: 1,
							// type: CANNON.Body.DYNAMIC,
							type: CANNON.Body.STATIC,
							shape: S,
							position: new CANNON.Vec3(pos[0], pos[1], pos[2])
						});
						physics.world.addBody(testCustomBody);
						App.scene[name + key].physics.currentBody = testCustomBody;
						App.scene[name + key].physics.enabled = true;
						// App.scene[name+key].physics.currentBody.velocity.set(RND(-5, 5), RND(-5, 5), RND(-5, 5))
						// App.scene[name + key].mesh.setScale(scale*2)
						resolve(name + key)
					}, 50)
				}).then((key__) => {
					var X = RND(-1, 1);
					var Y = RND(-1, 1);
					var Z = RND(-1, 1);
					// App.scene[key__].physics.currentBody.velocity.set(X == 0 ? -1 : X, Y == 0 ? -1 : Y, Z == 0 ? -1 : Z)
				})
			}
		}

		function genNamesForDestruct(size) {
			// console.log("SIZE ", size)
			var name;
			for(var x = 0;x < size;x++) {
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
		genNamesForDestruct(27)
	}

	function destructMe(name_pref, size, radius) {
		var name;
		for(var x = 0;x < size;x++) {
			if(x < 10) {
				name = "meDestruct_cell_00" + x;
				App.scene[name_pref + "meDestruct_cell_00" + x].physics.currentBody.type = CANNON.Body.DYNAMIC;
				var X = RND(-radius, radius);
				var Y = RND(-radius, radius);
				var Z = RND(-radius, radius);
				App.scene[name_pref + "meDestruct_cell_00" + x].physics.currentBody.velocity.set(X == 0 ? -1 : X, Y == 0 ? -1 : Y, Z == 0 ? -1 : Z)
			} else if(x >= 10 && x <= 99) {
				name = "meDestruct_cell_0" + x;
				App.scene[name_pref + "meDestruct_cell_0" + x].physics.currentBody.type = CANNON.Body.DYNAMIC;
				var X = RND(-radius, radius);
				var Y = RND(-radius, radius);
				var Z = RND(-radius, radius);
				console.log("X", X)
				App.scene[name_pref + "meDestruct_cell_0" + x].physics.currentBody.velocity.set(X == 0 ? -1 : X, Y == 0 ? -1 : Y, Z == 0 ? -1 : Z)
			}
		}
	}

	loadDestructMesh27('D1', [-10, -10, 14], 0.1)

	setTimeout(() => {
		preventFlag = false
		loadDestructMesh27('D2', [0, -10, 14], 0.5)


		setTimeout(() => {
			preventFlag = false
			loadDestructMesh27('D3', [10, -10, 14], 1)
		}, 50)

	}, 50)

}