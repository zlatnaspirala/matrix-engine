/**
 * @Author Nikola Lukic
 * @Description Matrix Engine Api Example.
 * Test new feature for objLoader
 * Loading obj file - single textures - UV mapping from blender done
 * Detecting groups with special name prefix/sufix `COLLIDER`
 * 
 * If you wanna real FPShooter multiplayer example goto:
 * https://github.com/zlatnaspirala/matrix-engine-starter
 */
import * as CANNON from 'cannon';
import App from "../program/manifest";
import {meMapLoader} from '../lib/map-loader';
import {map} from "./maps/map2";
import {ENUMERATORS, isMobile} from '../lib/utility';

export var runThis = world => {
	canvas.style.cursor = 'none';
	App.camera.FirstPersonController = true;
	// matrixEngine.Events.camera.fly = true;
	App.camera.speedAmp = 0.2;//ori 0.02
	matrixEngine.Events.camera.yPos = 10;
	App.camera.yawRateOnEdge = 3; //ori 3
	App.camera.yawRate = 3; // 1
	// Load Physics world.
	let gravityVector = [0, 0, -29.82];
	let physics = world.loadPhysics(gravityVector);
	// Add ground - mass == 0 makes the body static
	var groundBody = new CANNON.Body({
		mass: 0,
		position: new CANNON.Vec3(0, -15, -2)
	});
	var groundShape = new CANNON.Plane();
	groundBody.addShape(groundShape);
	groundBody._name = 'floor';
	physics.world.addBody(groundBody);
	// Matrix engine visual scene object
	var tex = {
		source: ["res/images/old-tex/floor.gif"],
		mix_operation: "multiply",
	};

	world.Add("squareTex", 1, "FLOOR_STATIC", tex);
	App.scene.FLOOR_STATIC.geometry.setScaleByX(500);
	App.scene.FLOOR_STATIC.geometry.setScaleByY(500);
	App.scene.FLOOR_STATIC.position.SetY(-2);
	App.scene.FLOOR_STATIC.position.SetZ(-15);
	App.scene.FLOOR_STATIC.rotation.rotx = 90;
	App.scene.FLOOR_STATIC.geometry.setTexCoordScaleFactor(40);

	const createObjSequence = (objName) => {
		let preventDoubleJump = null;
		function onLoadObj(meshes) {
			for(let key in meshes) {
				matrixEngine.objLoader.initMeshBuffers(world.GL.gl, meshes[key]);
			}
			var textuteImageSamplers2 = {
				source: ["res/bvh-skeletal-base/swat-guy/gun2.png"],
				mix_operation: "multiply"
			};
			var animArg = {
				id: objName,
				meshList: meshes,
				currentAni: 0,
				animations: {
					active: 'walk',
					walk: {
						from: 0,
						to: 20,
						speed: 3
					}
				}
			};
			// WEAPON
			world.Add("obj", 1, objName, textuteImageSamplers2, meshes['player']);
			App.scene.player.position.setPosition(0.5, -0.7, -3);
			App.scene.player.isHUD = true;
			// Fix object orientation - this can be fixed also in blender.
			matrixEngine.Events.camera.yaw = 0;
			// Not in use but can be used
			function bodiesAreInContact(bodyA, bodyB) {
				for(var i = 0;i < world.contacts.length;i++) {
					var c = world.contacts[i];
					if((c.bi === bodyA && c.bj === bodyB) || (c.bi === bodyB && c.bj === bodyA)) {
						return true;
					}
				}
				return false;
			}
			// Add collision cube to the local player.
			world.Add("cube", 0.2, "playerCollisonBox");
			var collisionBox = new CANNON.Body({
				mass: 7,
				linearDamping: 0.01,
				position: new CANNON.Vec3(-50, 24, 0),
				shape: new CANNON.Box(new CANNON.Vec3(1.75, 1.75, 2))
			});
			// This is custom param added.
			collisionBox._name = 'collisionBox';
			physics.world.addBody(collisionBox);
			App.scene.playerCollisonBox.physics.currentBody = collisionBox;
			App.scene.playerCollisonBox.physics.enabled = true;
			App.scene.playerCollisonBox.physics.currentBody.fixedRotation = true;
			App.scene.playerCollisonBox.physics.currentBody.updateMassProperties();
			App.scene.playerCollisonBox.geometry.setScale(0.02);
			App.scene.playerCollisonBox.glBlend.blendEnabled = true;
			App.scene.playerCollisonBox.glBlend.blendParamSrc = ENUMERATORS.glBlend.param[0];
			App.scene.playerCollisonBox.glBlend.blendParamDest = ENUMERATORS.glBlend.param[0];
			App.scene.playerCollisonBox.visible = false;
			// Test custom flag for collide moment
			App.scene.playerCollisonBox.iamInCollideRegime = false;
			// simple logic but also not perfect
			App.scene.playerCollisonBox.pingpong = true;
			collisionBox.addEventListener("collide", function(e) {
				// const contactNormal = new CANNON.Vec3();
				// var relativeVelocity = e.contact.getImpactVelocityAlongNormal();
				// console.log("playerCollisonBox collide with", e);
				preventDoubleJump = null;
				if(e.contact.bj._name == 'floor' || e.contact.bi._name == 'floor') {
					preventDoubleJump = null;
					return;
				}
				if(e.contact.bi._name == 'damage') {
					console.log("Trigger damage!");
					//. 4x fix
					App.scene.player.energy.value -= (0.25 - (App.scene.player.items.armor ? App.scene.player.items.armor.preventDamage : 0));
					App.scene.player.updateEnergy(App.scene.player.energy.value);
				}

				if(e.contact.bj._name == 'item-armor' || e.contact.bi._name == 'item-armor') {
					console.log("Trigger armor:", e.contact);
					// Make some enery restore
					App.scene.player.energy.value += 0.25;
					App.scene.player.updateEnergy(App.scene.player.energy.value);
					App.scene.player.items.armor = {
						preventDamage: 0.15
					}

					if(App.scene['armor']) {
						App.scene['armor'].physics.enabled = false;
						App.scene['armor'].isHUD = true;
						App.scene.armor.position.setPosition(1.2, 1.1, -3);
						App.scene.armor.mesh.setScale(0.1)
						// Can be destroyed also App.scene['armor'].selfDestroy(1)
					}
					if(e.body._name == 'item-armor') {
						console.log("Trigger armor collect!");
						physics.world.removeBody(e.body);
					}
				}
			});

			// Mobile support
			if(isMobile() == true) {
				byId('mobSpace').addEventListener('touchstart', (e) => {
					// Jump
					if(preventDoubleJump == null) {
						preventDoubleJump = setTimeout(() => {
							App.scene.playerCollisonBox.physics.currentBody.mass = 1;
							App.scene.playerCollisonBox.physics.currentBody.velocity.set(0, 0, 25);
							// preventDoubleJump = null; for ever
						}, 250);
					}
				})
			} else {
				// Matrix-engine key event DESKTOP
				addEventListener('hit.keyDown', (e) => {
					// Jump
					if(e.detail.keyCode == 32) {
						if(preventDoubleJump == null) {
							preventDoubleJump = setTimeout(() => {
								console.log('JUMP: ', e.detail.keyCode);
								App.scene.playerCollisonBox.physics.currentBody.mass = 1;
								App.scene.playerCollisonBox.physics.currentBody.velocity.set(0, 0, 25);
								// preventDoubleJump = null; for ever
							}, 250);
						}
					}
				})
			}

			var handlerTimeout = null, handlerTimeout2 = null;
			var playerUpdater = {
				sendRotEvery: 5,
				sendRotValue: 0,
				UPDATE: () => {
					var detPitch;
					var limit = 2;
					if(matrixEngine.Events.camera.pitch < limit &&
						matrixEngine.Events.camera.pitch > -limit) {
						detPitch = matrixEngine.Events.camera.pitch * 2;
					} else if(matrixEngine.Events.camera.pitch > limit) {
						detPitch = limit * 2;
					} else if(matrixEngine.Events.camera.pitch < -(limit + 2)) {
						detPitch = -(limit + 2) * 2;
					}

					handlerTimeout = null;
					// Make more stable situation
					App.scene.playerCollisonBox.physics.currentBody.mass = 10;
					App.scene.playerCollisonBox.physics.currentBody.quaternion.setFromEuler(0, 0, 0);
					// Cannonjs object set Switched  Z - Y
					if(App.scene.playerCollisonBox.pingpong == true) {
						matrixEngine.Events.camera.xPos = App.scene.playerCollisonBox.physics.currentBody.position.x;
						matrixEngine.Events.camera.zPos = App.scene.playerCollisonBox.physics.currentBody.position.y;
						matrixEngine.Events.camera.yPos = App.scene.playerCollisonBox.physics.currentBody.position.z;
						App.scene.playerCollisonBox.pingpong = false;
					} else {
						handlerTimeout2 = 0;
						App.scene.playerCollisonBox.
							physics.currentBody.position.set(
								matrixEngine.Events.camera.xPos,
								matrixEngine.Events.camera.zPos,
								matrixEngine.Events.camera.yPos);
						App.scene.playerCollisonBox.pingpong = true;
					}
					// Player Look
					if(playerUpdater.sendRotValue > playerUpdater.sendRotEvery /*&&
						matrixEngine.Engine.net.connection != null*/) {

						if(typeof App.scene.playerCollisonBox === undefined) {return;}

						if(App.scene.playerCollisonBox.position.nameUniq == App.scene.playerCollisonBox.position.netObjId) {
							// console.log('NOT READY - MOBILE ALREADY IN SCENE MOMENT BUG')
							return;
						}
						// matrixEngine.Engine.net.connection.send({
						// 	netRot: {y: matrixEngine.Events.camera.yaw + 180},
						// 	netObjId: App.scene.playerCollisonBox.position.netObjId,
						// })
						playerUpdater.sendRotValue = 0;
					}
					playerUpdater.sendRotValue++;
				}
			};
			App.updateBeforeDraw.push(playerUpdater);
			// Player Energy status
			App.scene.player.energy = {};
			// Collector for items
			App.scene.player.items = {};
			for(let key in App.scene.player.meshList) {
				App.scene.player.meshList[key].setScale(1.85);
			}
			// Target scene object
			var texTarget = {
				source: [
					"res/bvh-skeletal-base/swat-guy/target.png",
					"res/bvh-skeletal-base/swat-guy/target.png"
				],
				mix_operation: "multiply",
			};

			world.Add("squareTex", 0.25, 'FPSTarget', texTarget);
			App.scene.FPSTarget.position.setPosition(0, 0, -4);
			App.scene.FPSTarget.glBlend.blendEnabled = true;
			App.scene.FPSTarget.glBlend.blendParamSrc = matrixEngine.utility.ENUMERATORS.glBlend.param[4];
			App.scene.FPSTarget.glBlend.blendParamDest = matrixEngine.utility.ENUMERATORS.glBlend.param[4];
			App.scene.FPSTarget.isHUD = true;
			App.scene.FPSTarget.geometry.setScale(0.1);

			// Energy active bar - Custom generic textures. Micro Drawing.
			// Example for arg shema square for now only.
			var options = {
				squareShema: [8, 8],
				pixels: new Uint8Array(8 * 8 * 4)
			};
			// options.pixels.fill(0);
			App.scene.player.energy.value = 8;
			App.scene.player.updateEnergy = function(v) {
				this.energy.value = v;
				var t = App.scene.energyBar.preparePixelsTex(App.scene.energyBar.specialValue);
				App.scene.energyBar.textures.pop()
				App.scene.energyBar.textures.push(App.scene.energyBar.createPixelsTex(t));
				if(this.energy.value <= 0) {
					notify.error("YOU DIE...")
				}
			};

			function preparePixelsTex(options) {
				var I = 0, R = 0, G = 0, B = 0, localCounter = 0;
				for(var funny = 0;funny < 8 * 8 * 4;funny += 4) {
					if(localCounter > 7) {
						localCounter = 0;
					}
					if(localCounter < App.scene.player.energy.value) {
						I = 128;
						if(App.scene.player.energy.value < 3) {
							R = 255;
							G = 0;
							B = 0;
							I = 0;
						} else if(App.scene.player.energy.value > 2 && App.scene.player.energy.value < 5) {
							R = 255;
							G = 255;
							B = 0;
						} else {
							R = 0;
							G = 255;
							B = 0;
						}
					} else {
						I = 0;
						R = 0;
						G = 0;
						B = 0;
					}
					options.pixels[funny] = R;
					options.pixels[funny + 1] = G;
					options.pixels[funny + 2] = B;
					options.pixels[funny + 3] = 0;
					localCounter++;
				}
				return options;
			}

			var tex2 = {
				source: ["res/images/hud/energy-bar.png", "res/images/hud/energy-bar.png"],
				mix_operation: "multiply",
			};

			world.Add("squareTex", 1, 'energyBar', tex2);
			App.scene.energyBar.glBlend.blendEnabled = true;
			App.scene.energyBar.glBlend.blendParamSrc = matrixEngine.utility.ENUMERATORS.glBlend.param[5];
			App.scene.energyBar.glBlend.blendParamDest = matrixEngine.utility.ENUMERATORS.glBlend.param[5];
			App.scene.energyBar.isHUD = true;
			// App.scene.energy.visible = false;
			App.scene.energyBar.position.setPosition(0, 1.1, -3);
			App.scene.energyBar.geometry.setScaleByX(1)
			App.scene.energyBar.geometry.setScaleByY(0.05)
			App.scene.energyBar.preparePixelsTex = preparePixelsTex;
			options = preparePixelsTex(options);
			App.scene.energyBar.textures.push(App.scene.energyBar.createPixelsTex(options));
			App.scene.energyBar.specialValue = options;
		}

		matrixEngine.objLoader.downloadMeshes({player: "res/bvh-skeletal-base/swat-guy/gun2.obj"},
			onLoadObj
		);
	};

	createObjSequence('player')

	meMapLoader.load(map, physics);
}
