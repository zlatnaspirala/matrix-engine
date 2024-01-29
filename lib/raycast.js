/**
 * @author Nikola Lukic
 * @email zlatnaspirala@gmail.com
 * @site https://maximumroulette.com
 * @Licence GPL v3
 * Inspired with original code from:
 * https://github.com/Necolo/raycaster
 */

let rayHitEvent;

export let touchCoordinate = {
  enabled: false,
  x: 0,
  y: 0,
  stopOnFirstDetectedHit: false
};

/**
 * @description 
 * Ray triangle intersection algorithm.
 * @param rayOrigin ray origin point
 * @param rayVector ray direction
 * @param triangle three points of triangle, should be ccw order
 * @param out the intersection point
 * @return intersects or not
 * Uses Möller–Trumbore intersection algorithm
 */
export function rayIntersectsTriangle(
  rayOrigin, // vec3,
  rayVector, // vec3,
  triangle,  // vec3[],
  out,       // vec3,
  objPos) {
  if(matrixEngine.Events.camera.zPos < objPos.z) {
    rayOrigin[2] = matrixEngine.Events.camera.zPos - objPos.z;
  } else {
    rayOrigin[2] = matrixEngine.Events.camera.zPos + -objPos.z;
  }

  rayOrigin[0] = matrixEngine.Events.camera.xPos;
  rayOrigin[1] = matrixEngine.Events.camera.yPos;

  const EPSILON = 0.0000001;
  const [v0, v1, v2] = triangle;
  const edge1 = vec3.create();
  const edge2 = vec3.create();
  const h = vec3.create();

  vec3.sub(edge1, v1, v0);
  vec3.sub(edge2, v2, v0);
  vec3.cross(h, rayVector, edge2);
  const a = vec3.dot(edge1, h);

  if(a > -EPSILON && a < EPSILON) {
    return false;
  }

  const s = vec3.create();
  vec3.sub(s, rayOrigin, v0);
  const u = vec3.dot(s, h);

  if(u < 0 || u > a) {return false}

  const q = vec3.create();
  vec3.cross(q, s, edge1);
  const v = vec3.dot(rayVector, q);

  if(v < 0 || u + v > a) {return false}

  const t = vec3.dot(edge2, q) / a;
  if(t > EPSILON) {
    if(out) {
      vec3.add(out, rayOrigin, [rayVector[0] * t, rayVector[1] * t, rayVector[2] * t]);
    }
    return true;
  }
  return false;
}

/**
 * @description
 * Unproject a 2D point into a 3D world.
 * @param screenCoord [screenX, screenY]
 * @param viewport [left, top, width, height]
 * @param invProjection invert projection matrix
 * @param invView invert view matrix
 * @return 3D point position
 */
export function unproject(
  screenCoord,   // [number, number]
  viewport,      // [number, number, number, number]
  invProjection, // mat4
  invView) {
  // return vec3
  const [left, top, width, height] = viewport;
  const [x, y] = screenCoord;
  const out = vec4.fromValues((2 * x) / width - 1 - left, (2 * (height - y - 1)) / height - 1, 1, 1);
  vec4.transformMat4(out, out, invProjection);
  out[3] = 0;
  vec4.transformMat4(out, out, invView);
  return vec3.normalize(vec3.create(), out);
}

/**
 * @description 
 * Fix local rotation raycast bug test.
 */
export function rotate2dPlot(cx, cy, x, y, angle) {
  var radians = (Math.PI / 180) * -angle,
    cos = Math.cos(radians),
    sin = Math.sin(radians),
    nx = cos * (x - cx) + sin * (y - cy) + cx,
    ny = cos * (y - cy) - sin * (x - cx) + cy;
  return [nx, ny];
}

export function checkingProcedure(ev, customArg) {
  let {clientX, clientY, screenX, screenY} = ev;

  if(typeof customArg !== 'undefined') {
    clientX = customArg.clientX;
    clientY = customArg.clientY;
  }

  touchCoordinate.x = clientX;
  touchCoordinate.y = clientY;
  touchCoordinate.w = ev.target.width;
  touchCoordinate.h = ev.target.height;
  touchCoordinate.enabled = true;
}

export function checkingProcedureCalc(object) {
  if(object.raycast.enabled == false || touchCoordinate.enabled == false) return;
  var world = matrixEngine.matrixWorld.world;
  let mvMatrix = [...object.mvMatrix];
  let ray;
  let outp = mat4.create();
  let outv = mat4.create();
  let myRayOrigin = vec3.fromValues(matrixEngine.Events.camera.xPos, matrixEngine.Events.camera.yPos, matrixEngine.Events.camera.zPos);

  if(matrixEngine.Events.camera.zPos < object.position.z) {
    myRayOrigin = vec3.fromValues(matrixEngine.Events.camera.xPos, matrixEngine.Events.camera.yPos, -matrixEngine.Events.camera.zPos);
  }

  ray = unproject([touchCoordinate.x, touchCoordinate.y], [0, 0, touchCoordinate.w, touchCoordinate.h], mat4.invert(outp, world.pMatrix), mat4.invert(outv, mvMatrix));

  const intersectionPoint = vec3.create();
  object.raycastFace = [];

  for(var f = 0;f < object.geometry.indices.length;f = f + 3) {
    var a = object.geometry.indices[f];
    var b = object.geometry.indices[f + 1];
    var c = object.geometry.indices[f + 2];

    let triangle = null;
    const triangleInZero = [
      [object.geometry.vertices[0 + a * 3], object.geometry.vertices[1 + a * 3], object.geometry.vertices[2 + a * 3]],
      [object.geometry.vertices[0 + b * 3], object.geometry.vertices[1 + b * 3], object.geometry.vertices[2 + b * 3]],
      [object.geometry.vertices[0 + c * 3], object.geometry.vertices[1 + c * 3], object.geometry.vertices[2 + c * 3]]
    ];

    var rez0, rez1, rez2;

    if(object.rotation.rx != 0) {
      rez0 = rotate2dPlot(0, 0, triangleInZero[0][1], triangleInZero[0][2], object.rotation.rx);
      rez1 = rotate2dPlot(0, 0, triangleInZero[1][1], triangleInZero[1][2], object.rotation.rx);
      rez2 = rotate2dPlot(0, 0, triangleInZero[2][1], triangleInZero[2][2], object.rotation.rx);
      triangle = [
        [triangleInZero[0][0] + object.position.worldLocation[0], rez0[0] + object.position.worldLocation[1], rez0[1]],
        [triangleInZero[1][0] + object.position.worldLocation[0], rez1[0] + object.position.worldLocation[1], rez1[1]],
        [triangleInZero[2][0] + object.position.worldLocation[0], rez2[0] + object.position.worldLocation[1], rez2[1]]
      ];
      // console.log("only x rot => ", triangle);
    }

    // y z changed - rez0[1] is z
    if(object.rotation.ry != 0) {
      if(object.rotation.rx != 0) {
        // Y i Z
        // get y
        rez0 = rotate2dPlot(0, 0, triangleInZero[0][1], triangleInZero[0][2], object.rotation.rx - 90);
        rez1 = rotate2dPlot(0, 0, triangleInZero[1][1], triangleInZero[1][2], object.rotation.rx - 90);
        rez2 = rotate2dPlot(0, 0, triangleInZero[2][1], triangleInZero[2][2], object.rotation.rx - 90);

        const detY0 = rez0[0];
        const detY1 = rez1[0];
        const detY2 = rez2[0];

        const detZ0 = rez0[1];
        const detZ1 = rez1[1];
        const detZ2 = rez2[1];

        //                          X INITIAL             Z
        rez0 = rotate2dPlot(0, 0, triangleInZero[0][0], detZ0, object.rotation.ry - 90);
        rez1 = rotate2dPlot(0, 0, triangleInZero[1][0], detZ1, object.rotation.ry - 90);
        rez2 = rotate2dPlot(0, 0, triangleInZero[2][0], detZ2, object.rotation.ry - 90);

        const detZ00 = rez0[1];
        const detZ11 = rez1[1];
        const detZ22 = rez2[1];

        rez0 = rotate2dPlot(0, 0, rez0[0], detY0, object.rotation.rz - 90);
        rez1 = rotate2dPlot(0, 0, rez1[0], detY1, object.rotation.rz - 90);
        rez2 = rotate2dPlot(0, 0, rez2[0], detY2, object.rotation.rz - 90);

        triangle = [
          [rez0[0] + object.position.worldLocation[0], rez0[1] + object.position.worldLocation[1], detZ00],
          [rez1[0] + object.position.worldLocation[0], rez1[1] + object.position.worldLocation[1], detZ11],
          [rez2[0] + object.position.worldLocation[0], rez2[1] + object.position.worldLocation[1], detZ22]
        ];
      } else if(object.rotation.rz == 0) {
        rez0 = rotate2dPlot(0, 0, triangleInZero[0][0], triangleInZero[0][2], -object.rotation.ry);
        rez1 = rotate2dPlot(0, 0, triangleInZero[1][0], triangleInZero[1][2], -object.rotation.ry);
        rez2 = rotate2dPlot(0, 0, triangleInZero[2][0], triangleInZero[2][2], -object.rotation.ry);

        triangle = [
          [rez0[0] + object.position.worldLocation[0], triangleInZero[0][1] + object.position.worldLocation[1], rez0[1]],
          [rez1[0] + object.position.worldLocation[0], triangleInZero[1][1] + object.position.worldLocation[1], rez1[1]],
          [rez2[0] + object.position.worldLocation[0], triangleInZero[2][1] + object.position.worldLocation[1], rez2[1]]
        ];
      }
    }

    if(object.rotation.rz != 0) {
      if(object.rotation.ry != 0) {
        if(object.rotation.rx == 180) {
          rez0 = rotate2dPlot(0, 0, triangleInZero[0][0], triangleInZero[0][2], object.rotation.ry);
          rez1 = rotate2dPlot(0, 0, triangleInZero[1][0], triangleInZero[1][2], object.rotation.ry);
          rez2 = rotate2dPlot(0, 0, triangleInZero[2][0], triangleInZero[2][2], object.rotation.ry);

          let detZ00 = rez0[1];
          let detZ11 = rez1[1];
          let detZ22 = rez2[1];

          rez0 = rotate2dPlot(0, 0, rez0[0], triangleInZero[0][1], object.rotation.rz);
          rez1 = rotate2dPlot(0, 0, rez1[0], triangleInZero[1][1], object.rotation.rz);
          rez2 = rotate2dPlot(0, 0, rez2[0], triangleInZero[2][1], object.rotation.rz);

          const detZ0 = rez0[1];
          const detZ1 = rez1[1];
          const detZ2 = rez2[1];
          // rez0 = rotate2dPlot(0, 0,rez0[0], detZ00, object.rotation.rx - 180);
          // rez1 = rotate2dPlot(0, 0,rez0[0], detZ11, object.rotation.rx - 180);
          // rez2 = rotate2dPlot(0, 0, rez0[0], detZ22, object.rotation.rx - 180);
          // detZ00 = rez0[1];
          // detZ11 = rez1[1];
          // detZ22 = rez2[1];

          triangle = [
            [rez0[0] + object.position.worldLocation[0], detZ0 + object.position.worldLocation[1], detZ00],
            [rez1[0] + object.position.worldLocation[0], detZ1 + object.position.worldLocation[1], detZ11],
            [rez2[0] + object.position.worldLocation[0], detZ2 + object.position.worldLocation[1], detZ22]
          ];
        } else {
          // console.info('unhandled ray cast');
        }
      } else {
        if(object.rotation.rx == 0) {
          rez0 = rotate2dPlot(0, +0, triangleInZero[0][0], triangleInZero[0][1], object.rotation.rz);
          rez1 = rotate2dPlot(0, 0, triangleInZero[1][0], triangleInZero[1][1], object.rotation.rz);
          rez2 = rotate2dPlot(0, 0, triangleInZero[2][0], triangleInZero[2][1], object.rotation.rz);
          triangle = [
            [rez0[0] + object.position.worldLocation[0], rez0[1] + object.position.worldLocation[1], triangleInZero[0][2]],
            [rez1[0] + object.position.worldLocation[0], rez1[1] + object.position.worldLocation[1], triangleInZero[1][2]],
            [rez2[0] + object.position.worldLocation[0], rez2[1] + object.position.worldLocation[1], triangleInZero[2][2]]
          ];
        } else {
          // console.info('must be handled rz vs rx');
        }
      }
    }

    // no rot
    if(object.rotation.rx == 0 && object.rotation.ry == 0 && object.rotation.rz == 0) {
      triangle = [
        [triangleInZero[0][0] + object.position.worldLocation[0], triangleInZero[0][1] + object.position.worldLocation[1], triangleInZero[0][2]],
        [triangleInZero[1][0] + object.position.worldLocation[0], triangleInZero[1][1] + object.position.worldLocation[1], triangleInZero[1][2]],
        [triangleInZero[2][0] + object.position.worldLocation[0], triangleInZero[2][1] + object.position.worldLocation[1], triangleInZero[2][2]]
      ];
    }

    object.raycastFace.push(triangle);

    if(rayIntersectsTriangle(myRayOrigin, ray, triangle, intersectionPoint, object.position)) {

      rayHitEvent = new CustomEvent('ray.hit.event', {
        detail: {
          touchCoordinate: {x: touchCoordinate.x, y: touchCoordinate.y},
          hitObject: object,
          intersectionPoint: intersectionPoint,
          ray: ray,
          rayOrigin: myRayOrigin
        }
      });
      dispatchEvent(rayHitEvent);
      if(touchCoordinate.enabled == true && touchCoordinate.stopOnFirstDetectedHit == true) {
        touchCoordinate.enabled = false;
      }
    }
  }
}

export function checkingProcedureCalcObj(object) {
  if(object.raycast.enabled == false || touchCoordinate.enabled == false) return;
  var world = matrixEngine.matrixWorld.world;
  let mvMatrix = [...object.mvMatrix];
  let ray;
  let outp = mat4.create();
  let outv = mat4.create();
  let myRayOrigin = vec3.fromValues(matrixEngine.Events.camera.xPos, matrixEngine.Events.camera.yPos, matrixEngine.Events.camera.zPos);

  if(matrixEngine.Events.camera.zPos < object.position.z) {
    myRayOrigin = vec3.fromValues(matrixEngine.Events.camera.xPos, matrixEngine.Events.camera.yPos, -matrixEngine.Events.camera.zPos);
  }

  ray = unproject([touchCoordinate.x, touchCoordinate.y], [0, 0, touchCoordinate.w, touchCoordinate.h], mat4.invert(outp, world.pMatrix), mat4.invert(outv, mvMatrix));

  const intersectionPoint = vec3.create();
  object.raycastFace = [];

  for(var f = 0;f < object.mesh.indices.length;f = f + 3) {
    var a = object.mesh.indices[f];
    var b = object.mesh.indices[f + 1];
    var c = object.mesh.indices[f + 2];
    let triangle = null;
    const triangleInZero = [
      [object.mesh.vertices[0 + a * 3], object.mesh.vertices[1 + a * 3], object.mesh.vertices[2 + a * 3]],
      [object.mesh.vertices[0 + b * 3], object.mesh.vertices[1 + b * 3], object.mesh.vertices[2 + b * 3]],
      [object.mesh.vertices[0 + c * 3], object.mesh.vertices[1 + c * 3], object.mesh.vertices[2 + c * 3]]
    ];

    var rez0, rez1, rez2;

    if(object.rotation.rx != 0) {
      rez0 = rotate2dPlot(0, 0, triangleInZero[0][1], triangleInZero[0][2], object.rotation.rx);
      rez1 = rotate2dPlot(0, 0, triangleInZero[1][1], triangleInZero[1][2], object.rotation.rx);
      rez2 = rotate2dPlot(0, 0, triangleInZero[2][1], triangleInZero[2][2], object.rotation.rx);
      triangle = [
        [triangleInZero[0][0] + object.position.worldLocation[0], rez0[0] + object.position.worldLocation[1], rez0[1]],
        [triangleInZero[1][0] + object.position.worldLocation[0], rez1[0] + object.position.worldLocation[1], rez1[1]],
        [triangleInZero[2][0] + object.position.worldLocation[0], rez2[0] + object.position.worldLocation[1], rez2[1]]
      ];
    }
    // y z changed - rez0[1] is z
    if(object.rotation.ry != 0) {
      if(object.rotation.rx != 0) {
        // Y i Z
        // get y
        rez0 = rotate2dPlot(0, 0, triangleInZero[0][1], triangleInZero[0][2], object.rotation.rx - 90);
        rez1 = rotate2dPlot(0, 0, triangleInZero[1][1], triangleInZero[1][2], object.rotation.rx - 90);
        rez2 = rotate2dPlot(0, 0, triangleInZero[2][1], triangleInZero[2][2], object.rotation.rx - 90);
        const detY0 = rez0[0];
        const detY1 = rez1[0];
        const detY2 = rez2[0];

        const detZ0 = rez0[1];
        const detZ1 = rez1[1];
        const detZ2 = rez2[1];

        //                          X INITIAL             Z
        rez0 = rotate2dPlot(0, 0, triangleInZero[0][0], detZ0, object.rotation.ry - 90);
        rez1 = rotate2dPlot(0, 0, triangleInZero[1][0], detZ1, object.rotation.ry - 90);
        rez2 = rotate2dPlot(0, 0, triangleInZero[2][0], detZ2, object.rotation.ry - 90);

        const detZ00 = rez0[1];
        const detZ11 = rez1[1];
        const detZ22 = rez2[1];

        rez0 = rotate2dPlot(0, 0, rez0[0], detY0, object.rotation.rz - 90);
        rez1 = rotate2dPlot(0, 0, rez1[0], detY1, object.rotation.rz - 90);
        rez2 = rotate2dPlot(0, 0, rez2[0], detY2, object.rotation.rz - 90);

        triangle = [
          [rez0[0] + object.position.worldLocation[0], rez0[1] + object.position.worldLocation[1], detZ00],
          [rez1[0] + object.position.worldLocation[0], rez1[1] + object.position.worldLocation[1], detZ11],
          [rez2[0] + object.position.worldLocation[0], rez2[1] + object.position.worldLocation[1], detZ22]
        ];
      } else if(object.rotation.rz == 0) {
        rez0 = rotate2dPlot(0, 0, triangleInZero[0][0], triangleInZero[0][2], -object.rotation.ry);
        rez1 = rotate2dPlot(0, 0, triangleInZero[1][0], triangleInZero[1][2], -object.rotation.ry);
        rez2 = rotate2dPlot(0, 0, triangleInZero[2][0], triangleInZero[2][2], -object.rotation.ry);

        triangle = [
          [rez0[0] + object.position.worldLocation[0], triangleInZero[0][1] + object.position.worldLocation[1], rez0[1]],
          [rez1[0] + object.position.worldLocation[0], triangleInZero[1][1] + object.position.worldLocation[1], rez1[1]],
          [rez2[0] + object.position.worldLocation[0], triangleInZero[2][1] + object.position.worldLocation[1], rez2[1]]
        ];
      }
    }

    if(object.rotation.rz != 0) {
      if(object.rotation.ry != 0) {
        if(object.rotation.rx == 180) {
          rez0 = rotate2dPlot(0, 0, triangleInZero[0][0], triangleInZero[0][2], object.rotation.ry);
          rez1 = rotate2dPlot(0, 0, triangleInZero[1][0], triangleInZero[1][2], object.rotation.ry);
          rez2 = rotate2dPlot(0, 0, triangleInZero[2][0], triangleInZero[2][2], object.rotation.ry);

          let detZ00 = rez0[1];
          let detZ11 = rez1[1];
          let detZ22 = rez2[1];

          rez0 = rotate2dPlot(0, 0, rez0[0], triangleInZero[0][1], object.rotation.rz);
          rez1 = rotate2dPlot(0, 0, rez1[0], triangleInZero[1][1], object.rotation.rz);
          rez2 = rotate2dPlot(0, 0, rez2[0], triangleInZero[2][1], object.rotation.rz);

          const detZ0 = rez0[1];
          const detZ1 = rez1[1];
          const detZ2 = rez2[1];
          // rez0 = rotate2dPlot(0, 0,rez0[0], detZ00, object.rotation.rx - 180);
          // rez1 = rotate2dPlot(0, 0,rez0[0], detZ11, object.rotation.rx - 180);
          // rez2 = rotate2dPlot(0, 0, rez0[0], detZ22, object.rotation.rx - 180);
          // detZ00 = rez0[1];
          // detZ11 = rez1[1];
          // detZ22 = rez2[1];
          triangle = [
            [rez0[0] + object.position.worldLocation[0], detZ0 + object.position.worldLocation[1], detZ00],
            [rez1[0] + object.position.worldLocation[0], detZ1 + object.position.worldLocation[1], detZ11],
            [rez2[0] + object.position.worldLocation[0], detZ2 + object.position.worldLocation[1], detZ22]
          ];
        } else {
          // console.info('unhandled ray cast');
        }
      } else {
        if(object.rotation.rx == 0) {
          rez0 = rotate2dPlot(0, +0, triangleInZero[0][0], triangleInZero[0][1], object.rotation.rz);
          rez1 = rotate2dPlot(0, 0, triangleInZero[1][0], triangleInZero[1][1], object.rotation.rz);
          rez2 = rotate2dPlot(0, 0, triangleInZero[2][0], triangleInZero[2][1], object.rotation.rz);
          triangle = [
            [rez0[0] + object.position.worldLocation[0], rez0[1] + object.position.worldLocation[1], triangleInZero[0][2]],
            [rez1[0] + object.position.worldLocation[0], rez1[1] + object.position.worldLocation[1], triangleInZero[1][2]],
            [rez2[0] + object.position.worldLocation[0], rez2[1] + object.position.worldLocation[1], triangleInZero[2][2]]
          ];
        } else {
          // var test;
          // console.info('must be handled rz vs rx');
        }
      }
    }

    // no rot
    if(object.rotation.rx == 0 && object.rotation.ry == 0 && object.rotation.rz == 0) {
      triangle = [
        [triangleInZero[0][0] + object.position.worldLocation[0], triangleInZero[0][1] + object.position.worldLocation[1], triangleInZero[0][2]],
        [triangleInZero[1][0] + object.position.worldLocation[0], triangleInZero[1][1] + object.position.worldLocation[1], triangleInZero[1][2]],
        [triangleInZero[2][0] + object.position.worldLocation[0], triangleInZero[2][1] + object.position.worldLocation[1], triangleInZero[2][2]]
      ];
    }

    object.raycastFace.push(triangle);

    if(rayIntersectsTriangle(myRayOrigin, ray, triangle, intersectionPoint, object.position)) {
      rayHitEvent = new CustomEvent('ray.hit.event', {
        detail: {
          touchCoordinate: {x: touchCoordinate.x, y: touchCoordinate.y},
          hitObject: object,
          intersectionPoint: intersectionPoint,
          ray: ray,
          rayOrigin: myRayOrigin
        }
      });
      dispatchEvent(rayHitEvent);
      if(touchCoordinate.enabled == true && touchCoordinate.stopOnFirstDetectedHit == true) {
        touchCoordinate.enabled = false;
      }
      // console.info('raycast hits for Object: ' + object.name + '  -> face[/3]  : ' + f + ' -> intersectionPoint: ' + intersectionPoint);
    }
  }
}