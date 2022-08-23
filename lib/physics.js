
// DEV
import * as cannon from '../node_modules/cannon/build/cannon';

// PRODC
// import * as cannon from 'cannon';

/**
 * @Physics Based on cannon.js
 * @Cannon SceneObject object keys:
 * x: id
   x: world
   x: preStep
   x: postStep
   x: vlambda
   x: collisionFilterGroup
   x: collisionFilterMask
   x: collisionResponse
   x: position
   x: previousPosition
   x: initPosition
   x: velocity
   x: initVelocity
   x: force
   x: mass
   x: invMass
   x: material
   x: linearDamping
   x: type
   x: allowSleep
   x: sleepState
   x: sleepSpeedLimit
   x: sleepTimeLimit
   x: timeLastSleepy
   x: _wakeUpAfterNarrowphase
   x: torque
   x: quaternion
   x: initQuaternion
   x: angularVelocity
   x: initAngularVelocity
   x: interpolatedPosition
   x: interpolatedQuaternion
   x: shapes
   x: shapeOffsets
   x: shapeOrientations
   x: inertia
   x: invInertia
   x: invInertiaWorld
   x: invMassSolve
   x: invInertiaSolve
   x: invInertiaWorldSolve
   x: fixedRotation
   x: angularDamping
   x: aabb
   x: aabbNeedsUpdate
   x: wlambda
   x: boundingRadius
   x: index
   x: constructor
   x: wakeUp
   x: sleep
   x: sleepTick
   x: updateSolveMassProperties
   x: pointToLocalFrame
   x: vectorToLocalFrame
   x: pointToWorldFrame
   x: vectorToWorldFrame
   x: addShape
   x: updateBoundingRadius
   x: computeAABB
   x: updateInertiaWorld
   x: applyForce
   x: applyLocalForce
   x: applyImpulse
   x: applyLocalImpulse
   x: updateMassProperties
   x: getVelocityAtWorldPoint
*/


/**
 * @Rotation
 * 
   x: x
   x: y
   x: z
   x: w
   x: set
   x: toString
   x: toArray
   x: setFromAxisAngle
   x: toAxisAngle
   x: setFromVectors
   x: mult
   x: inverse
   x: conjugate
   x: normalize
   x: normalizeFast
   x: vmult
   x: copy
   x: toEuler
   x: setFromEuler
   x: clone

*/

/**
 * @MatrixPhysics
 * 
 * https://www.euclideanspace.com/maths/geometry/rotations/conversions/quaternionToAngle/index.htm
 * 
 */

export default class MatrixPhysics {

  constructor(gravityVector = [0, 0, -9.82]) {

    console.log("MATRIXPHYSICS ENABLED => ", CANNON);
    console.log("MATRIXPHYSICS GRAVITY:", gravityVector);

    // Setup our world
    this.world = new CANNON.World();
    this.world.gravity.set(0, 0, -9.82); // m/s²

    // Create a sphere
    // var radius = 1; // m

    // var sphereBody = new CANNON.Body({
    //   mass: 5, // kg
    //   position: new CANNON.Vec3(0, 0, 10), // m
    //   shape: new CANNON.Sphere(radius)
    // });

    // this.world.addBody(sphereBody);


    // Create a plane
    // var groundBody = new CANNON.Body({
    //   mass: 0 // mass == 0 makes the body static
    // });

    // var groundShape = new CANNON.Plane();
    // groundBody.addShape(groundShape);
    // this.world.addBody(groundBody);



    var fixedTimeStep = 1.0 / 60.0; // seconds
    var maxSubSteps = 3;
    // Start the simulation loop
    var lastTime;
    // (function simloop(time) {
    //   // requestAnimationFrame(simloop);
    //   if(lastTime !== undefined) {
    //     var dt = (time - lastTime) / 1000;
    //     world.step(fixedTimeStep, dt, maxSubSteps);
    //   }

    //   for(var x in sphereBody.quaternion) {
    //     // document.body.append("pos: " + x + ' ');
    //     console.log("  x:", x)
    //   }

    //   lastTime = time;
    // })();

    this.toDeg = (/**Quat4d*/ q1) => {
      var x, y, z;
      if (q1.w > 1) q1.normalise(); // if w>1 acos and sqrt will produce errors, this cant happen if quaternion is normalised
      var angle = 2 * Math.acos(q1.w);
      var s = Math.sqrt(1-q1.w*q1.w); // assuming quaternion normalised then w is less than 1, so term always positive.
      if (s < 0.001) { // test to avoid divide by zero, s is always positive due to sqrt
        // if s close to zero then direction of axis not important
        x = q1.x; // if it is important that axis is normalised then replace with x=1; y=z=0;
        y = q1.y;
        z = q1.z;
      } else {
        x = q1.x / s; // normalise axis
        y = q1.y / s;
        z = q1.z / s;
      }
  
      return { x: x, y: y, z: z }
   }

  }

}