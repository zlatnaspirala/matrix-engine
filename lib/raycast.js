
/**
 * Ray triangle intersection algorithm
 * 
 * @param rayOrigin ray origin point
 * @param rayVector ray direction
 * @param triangle three points of triangle, should be ccw order
 * @param out the intersection point
 * @return intersects or not
 * 
 * Uses Möller–Trumbore intersection algorithm
 */

export let touchCoordinate = { enabled: false, x: 0, y: 0 };
// export let rayVectorPassing = vec3.fromValues( 0, 0, -1)
// window.rayVectorPassing = rayVectorPassing

export function rayIntersectsTriangle (
    rayOrigin,
    // rayOrigin, // :vec3,
    rayVector, // :vec3,
    triangle, // :vec3[],
    out, //:vec3,
    objPos
  ) // : boolean
  {

  if (matrixEngine.Events.camera.zPos < objPos.z) {
    console.log("special")
    rayOrigin[2] =  (matrixEngine.Events.camera.zPos + -objPos.z);
  } else {
    rayOrigin[2] =  matrixEngine.Events.camera.zPos + -objPos.z;
  }
  // rayOrigin =  vec3.fromValues(0, 0, -objPos.z + matrixEngine.Events.camera.zPos);
  rayOrigin[0] =  matrixEngine.Events.camera.xPos;
  rayOrigin[1] =  matrixEngine.Events.camera.yPos;
  
  // rayOrigin =  vec3.fromValues(0, 0, -objPos.z + matrixEngine.Events.camera.zPos);
  // rayVector = vec3.fromValues(0, 1, -1);
  // rayVector = rayVectorPassing;

  console.log(rayOrigin)
  console.log(rayVector)
  const EPSILON = 0.0000001;
  const [v0, v1, v2] = triangle;
  const edge1 = vec3.create();
  const edge2 = vec3.create();
  const h = vec3.create();

  vec3.sub(edge1, v1, v0);
  vec3.sub(edge2, v2, v0);
  vec3.cross(h, rayVector, edge2);
  const a = vec3.dot(edge1, h);

  if (a > -EPSILON && a < EPSILON) {
      return false;
  }

  const s = vec3.create();
  vec3.sub(s, rayOrigin, v0);
  const u = vec3.dot(s, h);

  if (u < 0 || u > a) {
      return false;
  }

  const q = vec3.create();
  vec3.cross(q, s, edge1);
  const v = vec3.dot(rayVector, q);

  if (v < 0 || u + v > a) {
      return false;
  }

  const t = vec3.dot(edge2, q) / a;
  if (t > EPSILON) {
      if (out) {
          vec3.add(out, rayOrigin, [rayVector[0] * t, rayVector[1] * t, rayVector[2] * t]);
      }
      return true;
  }
  return false;
}

/**
* Unproject a 2D point into a 3D world.
* 
* @param screenCoord [screenX, screenY]
* @param viewport [left, top, width, height]
* @param invProjection invert projection matrix
* @param invView invert view matrix
* @return 3D point position
*/
export function unproject (
  screenCoord, // :[number, number],
  viewport, //:[number, number, number, number],
  invProjection, // :mat4,
  invView, //:mat4,
) // : vec3 
  {
  const [left, top, width, height] = viewport;
  const [x, y] = screenCoord;

  var x1 = ( x / width )*2 - 1;
  var y1 = ( y / height)*2 - 1;

  //rayVectorPassing[0] =  (2 * x) / width - 1 - left;
  //rayVectorPassing[1] =  (2 * (height - y - 1)) / height - 1;

  const out = vec4.fromValues(
      (2 * x) / width - 1 - left,
      (2 * (height - y - 1)) / height - 1,
      1,
      1,
  );

  vec4.transformMat4(out, out, invProjection);
  out[3] = 0;
  vec4.transformMat4(out, out, invView);
  return vec3.normalize(vec3.create(), out);
}

export function checkingProcedure(ev) {
  const {clientX, clientY, screenX, screenY} = ev;
  touchCoordinate.x = clientX;
  touchCoordinate.y = clientY;
  touchCoordinate.w = ev.target.width;
  touchCoordinate.h = ev.target.height;
  touchCoordinate.enabled = true;
}

export function checkingProcedureCalc(object) {

  if (touchCoordinate.enabled == false) return;
  if (touchCoordinate.enabled == true) touchCoordinate.enabled = false;
  var mvMatrix = object.mvMatrix;

  var outp = mat4.create();
  var outv = mat4.create();
  const ray = unproject(
    [touchCoordinate.x, touchCoordinate.y],
    [0, 0,  touchCoordinate.w, touchCoordinate.h],
     // world.pMatrix, // your invert projection matrix
     // mvMatrix // your invert view matrix
     mat4.invert(outp, world.pMatrix),
     mat4.invert(outv, mvMatrix)
  );

  const intersectionPoint = vec3.create();

  const triangle = [
    [object.geometry.vertices[0], object.geometry.vertices[1], object.geometry.vertices[2]],
    [object.geometry.vertices[3], object.geometry.vertices[4], object.geometry.vertices[5]],
    [object.geometry.vertices[6], object.geometry.vertices[7], object.geometry.vertices[8]]
  ];

  if (
    rayIntersectsTriangle(
      vec3.fromValues(
        matrixEngine.Events.camera.xPos,
        matrixEngine.Events.camera.yPos,
        matrixEngine.Events.camera.zPos
      ),
      ray,
      triangle,
      intersectionPoint,
      object.position
    )
  ) {
    console.log('hits', intersectionPoint);
    matrixEngine.utility.E('debugBox').style.background = 'red';
  } else {
    matrixEngine.utility.E('debugBox').style.background = 'green';
  }

}

export function checkingProcedureCalcAll(object) {

  if (touchCoordinate.enabled == false) return;
  if (touchCoordinate.enabled == true) touchCoordinate.enabled = false;
  var mvMatrix = object.mvMatrix;

  var outp = mat4.create();
  var outv = mat4.create();
  const ray = unproject(
    [touchCoordinate.x, touchCoordinate.y],
    [0, 0,  touchCoordinate.w, touchCoordinate.h],
     // world.pMatrix, // your invert projection matrix
     // mvMatrix // your invert view matrix
     mat4.invert(outp, world.pMatrix),
     mat4.invert(outv, mvMatrix)
  );

  const intersectionPoint = vec3.create();

  console.log(">>>", object.geometry.vertices.length)

  // let divine with 3
  var numberOfPoints = object.geometry.vertices.length / 3;

  // 3 is for triangle
  // move by point

  var myRayOrigin = vec3.fromValues(matrixEngine.Events.camera.xPos,matrixEngine.Events.camera.yPos,
    matrixEngine.Events.camera.zPos
  )

  numberOfPoints = numberOfPoints - 3; // for first triangle

  // Sequesnce
  for (var f = 0,c = 0; c < numberOfPoints + 1; f=f+3) {
    c++;
    const triangle = [
      [object.geometry.vertices[0 + f], object.geometry.vertices[1 + f], object.geometry.vertices[2 + f]],
      [object.geometry.vertices[3 + f], object.geometry.vertices[4 + f], object.geometry.vertices[5 + f]],
      [object.geometry.vertices[6 + f], object.geometry.vertices[7 + f], object.geometry.vertices[8 + f]]
    ];

    //  best solution dynamic from indices
    //       0, 1, 2, 3, 2, 1 // F

    if (rayIntersectsTriangle(myRayOrigin, ray, triangle, intersectionPoint, object.position) ) {
      console.log('hits for face ' + c + intersectionPoint);
      matrixEngine.utility.E('debugBox').style.background = 'red';
    } else {
      matrixEngine.utility.E('debugBox').style.background = 'green';
    }
  }

}
