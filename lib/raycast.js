
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

export function rayIntersectsTriangle (
    rayOrigin,      // :vec3,
    rayVector,      // :vec3,
    triangle,       // :vec3[],
    out,            // :vec3,
    objPos) {

  if (matrixEngine.Events.camera.zPos < objPos.z) {
    rayOrigin[2] =  (matrixEngine.Events.camera.zPos - objPos.z);
  } else {
    rayOrigin[2] =  matrixEngine.Events.camera.zPos + -objPos.z;
  }

  rayOrigin[0] =  matrixEngine.Events.camera.xPos;
  rayOrigin[1] =  matrixEngine.Events.camera.yPos;

  //console.log(rayOrigin)
  //console.log(rayVector)
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
  screenCoord,   // :[number, number],
  viewport,      // :[number, number, number, number],
  invProjection, // :mat4,
  invView,       // :mat4,
) // : vec3
  {
  const [left, top, width, height] = viewport;
  const [x, y] = screenCoord;

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

  let ray;

  var myRayOrigin = vec3.fromValues(
    matrixEngine.Events.camera.xPos,
    matrixEngine.Events.camera.yPos,
    matrixEngine.Events.camera.zPos
  );

  if (matrixEngine.Events.camera.zPos < object.position.z) {
    myRayOrigin = vec3.fromValues(
      matrixEngine.Events.camera.xPos,
      matrixEngine.Events.camera.yPos,
      -matrixEngine.Events.camera.zPos
    );


  }

  ray = unproject(
    [touchCoordinate.x, touchCoordinate.y],
    [0, 0,  touchCoordinate.w, touchCoordinate.h],
     // world.pMatrix, // your invert projection matrix
     // mvMatrix // your invert view matrix
     mat4.invert(outp, world.pMatrix),
     mat4.invert(outv, mvMatrix)
  );



  const intersectionPoint = vec3.create();



  //console.log(" matrixEngine.Events.camera.zPos "+ matrixEngine.Events.camera.zPos );
  //console.log(" object.position.z "+ object.position.z );

  for (var f = 0; f < object.geometry.indices.length;f=f+3) {
    var a = object.geometry.indices[f];
    var b = object.geometry.indices[f + 1];
    var c = object.geometry.indices[f + 2];
    const triangle  = [
      [object.geometry.vertices[0 + a*3], object.geometry.vertices[1 + a*3], object.geometry.vertices[2 + a*3]],
      [object.geometry.vertices[0 + b*3], object.geometry.vertices[1 + b*3], object.geometry.vertices[2 + b*3]],
      [object.geometry.vertices[0 + c*3], object.geometry.vertices[1 + c*3], object.geometry.vertices[2 + c*3]],
    ];
    if (rayIntersectsTriangle(myRayOrigin, ray, triangle, intersectionPoint, object.position) ) {
      console.info('raycast hits for Object: ' + object.name +
                    '  -> face: ' + f + ' -> intersectionPoint: ' + intersectionPoint);
      // matrixEngine.utility.E('debugBox').style.background = 'red';
    } else {
      // matrixEngine.utility.E('debugBox').style.background = 'green';
    }
  }

}
