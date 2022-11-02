/**
 *@Author Nikola Lukic zlatnaspirala@
 *@Description Matrix Engine Api Example
 * WORKSHOP SCRIPT
 * Current theme : SceneController and 
 * physics (cannon.js) implementation.
 */

import App from "../program/manifest";
import * as CANNON from 'cannon';
import {Point} from "../lib/matrix-geometry";

window.CANNON = CANNON;

export var runThis = (world) => {

  App.camera.SceneController = true;

  canvas.addEventListener('mousedown', (ev) => {
    matrixEngine.raycaster.checkingProcedure(ev);
  });

  window.addEventListener('ray.hit.event', (ev) => {
    console.log("You shoot the object! Nice!", ev.detail.hitObject.name)

    /**
     * Physics force apply
     */
     if (ev.detail.hitObject.physics.enabled == true) {
      ev.detail.hitObject.physics.currentBody.force.set(-330,0,1000)
     }
  });

  var tex = {
    source: ["res/images/complex_texture_1/diffuse.png"],
    mix_operation: "multiply",
  };

  // Load Physics world!
  let gravityVector = [0, 0, -9.82];
  let physics = world.loadPhysics(gravityVector);
  // Add ground
  var groundMaterial = new CANNON.Material();

  physics.addGround(App, world, tex, groundMaterial);

  physics.world.solver.iterations = 17;

  // physics.world.defaultContactMaterial.contactEquationStiffness = 1e6;
  // physics.world.defaultContactMaterial.contactEquationRelaxation = 3;

  var height = 5;
  var damping = 0.01;
  world.Add("sphereLightTex", 1, "BALL", tex);
  var mass = 1;
  var sphereShape = new CANNON.Sphere(1);
  var mat1 = new CANNON.Material();
  var shapeBody1 = new CANNON.Body({
      mass: mass,
      material: mat1,
      position: new CANNON.Vec3(3*1, -7, height)
  });
  shapeBody1.addShape(sphereShape);
  shapeBody1.linearDamping = damping;
  physics.world.addBody(shapeBody1);
  // Physics
  App.scene.BALL.physics.currentBody = shapeBody1;
  App.scene.BALL.physics.enabled = true;

  var mm = new CANNON.ContactMaterial(groundMaterial, mat1, { friction: 0.01, restitution: 0.9 });
  physics.world.addContactMaterial(mm);

  world.Add("cubeLightTex", 1, "CUBE", tex);
  var b = new CANNON.Body({
    mass: 5,
    position: new CANNON.Vec3(0, -2, 2),
    shape: new CANNON.Box(new CANNON.Vec3(1, 1, 1))
  });
  physics.world.addBody(b);
  // Physics
  App.scene.CUBE.physics.currentBody = b;
  App.scene.CUBE.physics.enabled = true;

  const objGenerator = async (n) => {

    var promises = [];
    window.promises = promises;
    for(var j = 0;j < n;j++) {
      await setTimeout(() => {
        var mat = new CANNON.Material();
        var groundMaterial = new CANNON.Material();
        promises.push(new Promise((resolve) => {
          var detIndex = promises.length;
          world.Add("cubeLightTex", 1, "CUBE" + detIndex, tex);
          var b2 = new CANNON.Body({
            mass: 1,
            material: mat,
            linearDamping: 0.01,
            position: new CANNON.Vec3(1, -14.5, 15),
            // shape: new CANNON.Plane(new CANNON.Vec3(1, 1, 1))
            shape: new CANNON.Box(new CANNON.Vec3(1, 1, 1))
          });
          physics.world.addBody(b2);
          App.scene['CUBE' + detIndex].physics.currentBody = b2;
          App.scene['CUBE' + detIndex].physics.enabled = true;
          // App.scene['CUBE' + detIndex].geometry.setScaleByY(-1)
          var mat2_ground = new CANNON.ContactMaterial(groundMaterial, mat, { friction: 1.0, restitution: 1 });
          physics.world.addContactMaterial(mat2_ground);

          resolve('good');
        }));
        if (promises.length == n-1) {
          Promise.all(promises).then((what) => {
            console.info('Promise all -> ', what);
            console.info('Promise all -> ', promises);
          });
        }
      }, 1000 * j)
    }

  }

  //objGenerator(1);

  function onLoadObj(meshes) {

    matrixEngine.objLoader.initMeshBuffers(world.GL.gl, meshes.armor);
    matrixEngine.objLoader.initMeshBuffers(world.GL.gl, meshes.armor2);

    var tex = {
      source: ["res/images/armor.png"],
      mix_operation: "multiply",
    };

    world.Add("obj", 1, "armor", tex, meshes.armor);
    world.Add("obj", 1, "armor2", tex, meshes.armor2);

    App.scene.armor.position.y = 1;
    App.scene.armor2.position.y = 1;

    App.scene.armor.LightsData.ambientLight.set(1, 1, 1);

    // TEST
    var b3 = new CANNON.Body({
      mass: 1,
      linearDamping: 0.01,
      position: new CANNON.Vec3(1, -14.5, 15),
      shape: new CANNON.Cylinder(1,1,1*2.2,10)
    });

    physics.world.addBody(b3);
    App.scene.armor.physics.currentBody = b3;
    App.scene.armor.physics.enabled = true;

    // TEST 2

    // test conver 
    var localPoints = [];
    for (var j = 0; j < App.scene.armor2.mesh.vertices.length; j+=3) {
      localPoints.push([[
        new CANNON.Vec3(
          App.scene.armor2.mesh.vertices[j],
          App.scene.armor2.mesh.vertices[j+1],
          App.scene.armor2.mesh.vertices[j+2])
      ]])
    }
    var localFaces = [];
    for (var j = 0; j < App.scene.armor2.mesh.vertexNormals.length; j+=3) {
      localFaces.push([[
          App.scene.armor2.mesh.vertexNormals[j],
          App.scene.armor2.mesh.vertexNormals[j+1],
          App.scene.armor2.mesh.vertexNormals[j+2]
      ]])
    }

    console.log('FORMAT vec3 ', localPoints)

    var b4 = new CANNON.Body({
      mass: 1,
      linearDamping: 0.01,
      position: new CANNON.Vec3(1, -14.5, 12),
      shape: new CANNON.Box(new CANNON.Vec3(1,1,0.7))
      // shape: new CANNON.Trimesh(App.scene.armor2.mesh.vertices, App.scene.armor2.mesh.indices)
      // shape: new CANNON.ConvexPolyhedron(localPoints, localFaces)
    });

    physics.world.addBody(b4);
    App.scene.armor2.physics.currentBody = b4;
    App.scene.armor2.physics.enabled = true;

    // ConvexPolyhedron ( points  faces )
    //  return new CANNON.Trimesh(vertices, indices);
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
    {armor: "res/bvh-skeletal-base/swat-guy/seq-walk/low/swat_000001.obj",
     armor2: "res/3d-objects/armor.obj"},
    onLoadObj
  );
};
