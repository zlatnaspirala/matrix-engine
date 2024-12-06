/**
 * @Author Nikola Lukic
 * @Description Matrix Engine Api Example.
 * Test new feature for objLoader
 * Detecting groups with special name COLLIDER
 */
import * as CANNON from 'cannon';
import App from "../program/manifest";

export var runThis = world => {

	App.camera.FirstPersonController = true;
	matrixEngine.Events.camera.fly = false;

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
      source: ["res/images/armor.webp"],
      mix_operation: "multiply",
    };
		world.Add("squareTex", 1, "FLOOR_STATIC", tex);
		App.scene.FLOOR_STATIC.geometry.setScaleByX(500);
		App.scene.FLOOR_STATIC.geometry.setScaleByY(500);
		App.scene.FLOOR_STATIC.position.SetY(-2);
		App.scene.FLOOR_STATIC.position.SetZ(-15);
		App.scene.FLOOR_STATIC.rotation.rotx = 90;
		App.scene.FLOOR_STATIC.geometry.setTexCoordScaleFactor(40);


  function onLoadObj(meshes) {
    for(let key in meshes) { matrixEngine.objLoader.initMeshBuffers(world.GL.gl, meshes[key]) }
    var textuteImageSamplers2 = {
      source: ["res/images/armor.webp"],
      mix_operation: "multiply",
    };
    world.Add("obj", 1, "armor", textuteImageSamplers2, meshes.armor);
    App.scene.armor.position.y = 1;
    App.scene.armor.LightsData.ambientLight.set(1, 1, 1);
    App.scene.armor.position.z = -20;


		App.scene.armor.mesh.groups.forEach((group, index) => {
			console.log('groupName:', group.groupName)
			 setTimeout(() => matrixEngine.utility.notify.show('Group detected: '+ group.groupName),1000 * index)
			})
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
    {armor: "res/3d-objects/env/doors/door1.obj"},
    onLoadObj,
    { swap: [0, 2] }
  );
};
