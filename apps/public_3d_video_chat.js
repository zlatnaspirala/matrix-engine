/**
 * @Author Nikola Lukic
 * @Description Matrix Engine Api Example.
 * [NEW NETWORKING]
 * public-3d-video-chat
 */
import App from "../program/manifest.js";
import * as matrixEngine from "../index.js";
import {byId} from "../networking2/matrix-stream.js";
let VT = matrixEngine.Engine.VT;
import * as CANNON from 'cannon';
import {notify, SWITCHER} from "../lib/utility.js";

export var runThis = world => {
	// SHIFT + MOUSE RD OR MOUSE MOVE + SHIFT SCROLL ZOOM
	App.camera.SceneController = true;

	canvas.addEventListener('mousedown', (ev) => {
		matrixEngine.raycaster.checkingProcedure(ev);
	});

	window.addEventListener('ray.hit.event', (ev) => {
		console.log("You shoot the object! Nice!", ev)
		if(ev.detail.hitObject.physics.enabled == true) {
			// not yet supported in net2
			// ev.detail.hitObject.physics.currentBody.force.set(0, 0, 200)
		}
	});

	var tex = {
		source: ["res/images/complex_texture_1/diffuse.webp", "res/images/logo-test.webp"],
		mix_operation: "multiply",
	};

	let gravityVector = [0, 0, -9.82];
	let physics = world.loadPhysics(gravityVector);
	// Add ground
	physics.addGround(App, world, tex);
	const objGenerator = (meObj) => {
		var b2 = new CANNON.Body({
			mass: 1,
			linearDamping: 0.01,
			position: new CANNON.Vec3(0, -14.5, 15),
			shape: new CANNON.Box(new CANNON.Vec3(1, 1, 1))
		});
		physics.world.addBody(b2);
		meObj.physics.currentBody = b2;
		meObj.physics.enabled = true;
	}

	matrixEngine.Engine.activateNet2(undefined,
		{
			sessionName: 'public-chat-me',
			resolution: '256x256'
		});

	addEventListener(`LOCAL-STREAM-READY`, (e) => {
		console.log('LOCAL-STREAM-READY [app level] ', e.detail.streamManager.id)
		console.log('LOCAL-STREAM-READY [app level] ', e.detail.connection.connectionId)
		// test first
		dispatchEvent(new CustomEvent(`onTitle`, {detail: `🕸️${e.detail.connection.connectionId}🕸️`}))

		notify.show(`Connected 🕸️${e.detail.connection.connectionId}🕸️`, "ok")

		var name = e.detail.connection.connectionId;
		world.Add("cubeLightTex", 1, name, tex);
		App.scene[name].position.x = 0;
		App.scene[name].position.z = -20;
		App.scene[name].LightsData.ambientLight.set(1, 1, 1);
		App.scene[name].net.enable = true;
		App.scene[name].streamTextures = matrixEngine.Engine.DOM_VT(byId(e.detail.streamManager.id))
		objGenerator(App.scene[name])
	})

	addEventListener('videoElementCreated', (e) => {
		console.log('videoElementCreated [app level] ', e.detail);
	})

	
	addEventListener('videoElementCreatedSubscriber', (e) => {
		console.log('videoElementCreatedSubscriber [app level] ', e.detail);
	})

	var ONE_TIME = 0;
	addEventListener('streamPlaying', (e) => {
		if(ONE_TIME == 0) {
			ONE_TIME = 1;
			console.log('REMOTE-STREAM- streamPlaying [app level] ', e.detail.target.videos[0]);
			// DIRECT REMOTE
			var name = e.detail.target.stream.connection.connectionId;
			App.scene[name].streamTextures = matrixEngine.Engine.DOM_VT(e.detail.target.videos[0].video)
		}
	})

	addEventListener('onStreamCreated', (e) => {
		console.log('REMOTE-STREAM-READY [app level] ', e.detail.event.stream.connection.connectionId);
		var name = e.detail.event.stream.connection.connectionId;
		world.Add("cubeLightTex", 1, name, tex);
		App.scene[name].position.x = 0;
		App.scene[name].position.z = -20;
		App.scene[name].LightsData.ambientLight.set(1, 1, 1);
		App.scene[name].net.enable = true;
		objGenerator(App.scene[name])
	})


	world.Add("cubeLightTex", 0.8, "outsideBox2", tex);
	App.scene.outsideBox2.position.x = -7;
	App.scene.outsideBox2.position.y = 5;
	App.scene.outsideBox2.position.z = -20;
	App.scene.outsideBox2.rotation.rotationSpeed.y = 25
	App.scene.outsideBox2.rotation.rotx = 90
	App.scene.outsideBox2.streamTextures = new VT(
		"res/video-texture/me.mkv"
	);
	// App.scene.outsideBox2.instancedDraws.numberOfInstance = 3;
	// App.scene.outsideBox2.instancedDraws.overrideDrawArraysInstance = function (object) {
  //   for (var i = 0; i < object.instancedDraws.numberOfInstance; i++) {
  //     object.instancedDraws.array_of_local_offset = [0, 0, 2];
  //     mat4.translate(object.mvMatrix, object.mvMatrix, object.instancedDraws.array_of_local_offset);
  //     world.setMatrixUniforms(object, world.pMatrix, object.mvMatrix);
  //     object.instancedDraws.array_of_local_offset = [2 * S1.GET(), 0, 0];
  //     for (var j = 0; j < object.instancedDraws.numberOfInstance; j++) {
  //       mat4.translate(object.mvMatrix, object.mvMatrix, object.instancedDraws.array_of_local_offset);
  //       world.setMatrixUniforms(object, world.pMatrix, object.mvMatrix);
  //       world.GL.gl.drawElements(world.GL.gl[object.glDrawElements.mode], object.glDrawElements.numberOfIndicesRender, world.GL.gl.UNSIGNED_SHORT, 0);
  //     }
  //   }
  // };

	
	world.Add("cubeLightTex", 0.8, "outsideBox3", tex);
	App.scene.outsideBox3.position.x = 7;
	App.scene.outsideBox3.position.y = 5;
	App.scene.outsideBox3.position.z = -20;
	App.scene.outsideBox3.rotation.rotationSpeed.y = 35
 
	App.scene.outsideBox3.rotation.rotx = 0
	// effect
	// var S1 = new SWITCHER();
	// App.scene.outsideBox3.instancedDraws.numberOfInstance = 3;
	// App.scene.outsideBox3.instancedDraws.overrideDrawArraysInstance = function (object) {
  //   for (var i = 0; i < object.instancedDraws.numberOfInstance; i++) {
  //     object.instancedDraws.array_of_local_offset = [0, 0, 2];
  //     mat4.translate(object.mvMatrix, object.mvMatrix, object.instancedDraws.array_of_local_offset);
  //     world.setMatrixUniforms(object, world.pMatrix, object.mvMatrix);
  //     object.instancedDraws.array_of_local_offset = [2 * S1.GET(), 0, 0];
  //     for (var j = 0; j < object.instancedDraws.numberOfInstance; j++) {
  //       mat4.translate(object.mvMatrix, object.mvMatrix, object.instancedDraws.array_of_local_offset);
  //       world.setMatrixUniforms(object, world.pMatrix, object.mvMatrix);
  //       world.GL.gl.drawElements(world.GL.gl[object.glDrawElements.mode], object.glDrawElements.numberOfIndicesRender, world.GL.gl.UNSIGNED_SHORT, 0);
  //     }
  //   }
  // };

	// App.scene.outsideBox2.glBlend.blendEnabled = true;
	// App.scene.outsideBox2.blendParamSrc = matrixEngine.utility.ENUMERATORS.glBlend.param[6];
	// App.scene.outsideBox2.blendParamDest = matrixEngine.utility.ENUMERATORS.glBlend.param[6];
}