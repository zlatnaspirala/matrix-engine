import * as CANNON from 'cannon';
import {CS1,CS3} from './matrix-world';

/**
 * @MatrixPhysics
 * Used cannon.js version 0.6 library.
 * Source code at:
 * https://schteppe.github.io/cannon.js/
 * Integrated in matrix-engine.
 */

export default class MatrixPhysics {
  constructor(gravityVector = [0, 0, -9.82]) {
    console.info(`%cMatrixPhysics [cannon.js] running. %c`, CS3, CS1);
    this.world = new CANNON.World();
    this.world.gravity.set(gravityVector[0], gravityVector[1], gravityVector[2]);
    this.toDeg = (q1) => {
      var x, y, z;
      if(q1.w > 1) q1.normalise();
      // if w>1 acos and sqrt will produce errors, this cant happen if quaternion is normalised
      var angle = 2 * Math.acos(q1.w);
      // assuming quaternion normalised then w is less than 1, so term always positive.
      var s = Math.sqrt(1 - q1.w * q1.w);
      if(s < 0.001) {
        // test to avoid divide by zero, s is always positive due to sqrt
        // if s close to zero then direction of axis not important
        // if it is important that axis is normalised then replace with x=1; y=z=0;
        x = q1.x;
        y = q1.y;
        z = q1.z;
      } else {
        x = q1.x / s; // normalise axis
        y = q1.y / s;
        z = q1.z / s;
      }
      return {x: x, y: y, z: z}
    }
  }

  addGround(App, world, tex) {
    // Create a ground
    // Makes the body static
    var groundBody = new CANNON.Body({
      mass: 0,
      position: new CANNON.Vec3(0, -15, 0)
    });
    var groundShape = new CANNON.Plane();
    groundBody.addShape(groundShape);
    this.world.addBody(groundBody);
    // matrix engine visual
    world.Add("squareTex", 1, "FLOOR_STATIC", tex);
    App.scene.FLOOR_STATIC.geometry.setScaleByX(15);
    App.scene.FLOOR_STATIC.geometry.setScaleByY(15);
    App.scene.FLOOR_STATIC.position.SetY(0);
    App.scene.FLOOR_STATIC.position.SetZ(-15);
    App.scene.FLOOR_STATIC.rotation.rotx = 90;
  }
}