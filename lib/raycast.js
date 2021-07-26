
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

 let RAYORIGIN = vec3.fromValues( 0, 0, -1)
 window.RAYORIGIN = RAYORIGIN

 export function rayIntersectsTriangle (
    rayOrigin,
    // rayOrigin, // :vec3,
    rayVector, // :vec3,
    triangle, // :vec3[],
    out //:vec3,
  ) // : boolean 
  {

    rayOrigin =  vec3.fromValues( 0, 0, 1)
    // rayVector = vec3.fromValues( 0, 1, -1)
    rayVector = RAYORIGIN

    
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

  RAYORIGIN[0] = x1;
  RAYORIGIN[1] = y1;


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