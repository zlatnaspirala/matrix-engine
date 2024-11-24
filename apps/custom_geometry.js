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

	var tex = {
		source: ["res/images/complex_texture_1/diffuse.webp"],
		mix_operation: "multiply", // ENUM : multiply , divide ,
	};

	let gravityVector = [0, 0, -9.82];
	let physics = world.loadPhysics(gravityVector);
	// Add ground
	physics.addGround(App, world, tex);

	function createTetra() {
		var scale = 2;
		var verts = [new CANNON.Vec3(scale * 0, scale * 0, scale * 0),
		new CANNON.Vec3(scale * 2, scale * 0, scale * 0),
		new CANNON.Vec3(scale * 0, scale * 2, scale * 0),
		new CANNON.Vec3(scale * 0, scale * 0, scale * 2)];
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

	world.Add("generatorLightTex", 1, "outsideBox2", tex, {
		radius: 1,
		custom_type: 'testConvex',
		custom_geometry: createTetra(),
	});

	var testCustomBody = new CANNON.Body({
		mass: 10,
		type: CANNON.Body.DYNAMIC,
		shape: createTetra(),
		position: new CANNON.Vec3(0, -10, 2)
	});
	window.testCustomBody = testCustomBody;
	physics.world.addBody(testCustomBody);
	App.scene.outsideBox2.physics.currentBody = testCustomBody;
	App.scene.outsideBox2.physics.enabled = true;

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

	objGenerator(10)
}