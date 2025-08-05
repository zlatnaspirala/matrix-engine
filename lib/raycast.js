/**
 * @author Nikola Lukic
 * @email zlatnaspirala@gmail.com
 * @site https://maximumroulette.com
 * @Licence GPL v3
 * Inspired with original code from:
 * https://github.com/Necolo/raycaster
 */
window.mat4 = glMatrix.mat4
window.mat2 = glMatrix.mat2
window.mat2d = glMatrix.mat2d
window.mat3 = glMatrix.mat3
window.mat4 = glMatrix.mat4
window.quat = glMatrix.quat
window.quat2 = glMatrix.quat2
window.vec2 = glMatrix.vec2
window.vec3 = glMatrix.vec3
window.vec4 = glMatrix.vec4

let rayHitEvent;
let HITS = [];

export let touchCoordinate = {
	enabled: false,
	x: 0,
	y: 0,
	stopOnFirstDetectedHit: false
};

// Reusable temp vectors and matrices for performance:
const _edge1 = vec3.create();
const _edge2 = vec3.create();
const _h = vec3.create();
const _s = vec3.create();
const _q = vec3.create();

const _outp = mat4.create();
const _outv = mat4.create();
const _intersectionPoint = vec3.create();

// Cache rotation trig values:
function calcCosSin(angleDeg) {
	const rad = (Math.PI / 180) * -angleDeg;
	return {cos: Math.cos(rad), sin: Math.sin(rad)};
}

// Optimized rotate2dPlot that accepts precomputed cos/sin:
function rotate2dPlotPrecomputed(cx, cy, x, y, cos, sin) {
	const nx = cos * (x - cx) + sin * (y - cy) + cx;
	const ny = cos * (y - cy) - sin * (x - cx) + cy;
	return [nx, ny];
}

/**
 * Ray triangle intersection algorithm.
 * Uses Möller–Trumbore intersection algorithm
 */
export function rayIntersectsTriangleNoDistance(rayOrigin, rayVector, triangle, out, objPos) {
	// Update rayOrigin based on camera and object position
	if(matrixEngine.Events.camera.zPos < objPos.z) {
		rayOrigin[2] = matrixEngine.Events.camera.zPos - objPos.z;
	} else {
		rayOrigin[2] = matrixEngine.Events.camera.zPos + -objPos.z;
	}
	rayOrigin[0] = matrixEngine.Events.camera.xPos;
	rayOrigin[1] = matrixEngine.Events.camera.yPos;

	const EPSILON = 1e-7;
	const [v0, v1, v2] = triangle;

	try {
		vec3.sub(_edge1, v1, v0);
		vec3.sub(_edge2, v2, v0);
	} catch(e) {
		console.log('Probably your obj file has non-triangulated faces vertices. Raycast supports only triangulated faces. Error:', e);
		return false;
	}
	vec3.cross(_h, rayVector, _edge2);
	const a = vec3.dot(_edge1, _h);

	// if(a > -EPSILON && a < EPSILON) return false;
	if(Math.abs(a) < EPSILON) return false; // Only skip *parallel* rays

	vec3.sub(_s, rayOrigin, v0);
	// const u = vec3.dot(_s, _h);
	// ------------
	const f = 1.0 / a;
	const u = f * vec3.dot(_s, _h);
	if(u < 0.0 || u > 1.0) return false;
	vec3.cross(_q, _s, _edge1);
	const v = f * vec3.dot(rayVector, _q);
	if(v < 0.0 || u + v > 1.0) return false;
	const t = f * vec3.dot(_edge2, _q);
	// const t = vec3.dot(_edge2, _q) / a;

	if(t > EPSILON) {
		if(out) {
			vec3.add(out, rayOrigin, [rayVector[0] * t, rayVector[1] * t, rayVector[2] * t]);
		}
		return true;
	}
	return false;
}

export function rayIntersectsTriangle(rayOrigin, rayVector, triangle, out, objPos) {
	const EPSILON = 1e-7;
	const [v0, v1, v2] = triangle;

	// Optional: adjust rayOrigin with objPos (if needed for world space)
	rayOrigin[0] = matrixEngine.Events.camera.xPos;
	rayOrigin[1] = matrixEngine.Events.camera.yPos;
	rayOrigin[2] = matrixEngine.Events.camera.zPos;

	try {
		vec3.sub(_edge1, v1, v0);
		vec3.sub(_edge2, v2, v0);
	} catch(e) {
		console.warn('Non-triangulated mesh? Error:', e);
		return null;
	}

	vec3.cross(_h, rayVector, _edge2);
	const a = vec3.dot(_edge1, _h);

	if(Math.abs(a) < EPSILON) return null;

	vec3.sub(_s, rayOrigin, v0);
	const u = vec3.dot(_s, _h);
	if(u < 0 || u > a) return null;

	vec3.cross(_q, _s, _edge1);
	const v = vec3.dot(rayVector, _q);
	if(v < 0 || u + v > a) return null;

	const t = vec3.dot(_edge2, _q) / a;

	if(t > EPSILON) {
		if(out) {
			vec3.scaleAndAdd(out, rayOrigin, rayVector, t);
		}
		return t; // ← return distance
	}

	return null;
}

/**
 * Unproject a 2D point into a 3D world.
 */
export function unproject(screenCoord, viewport, invProjection, invView) {
	const [left, top, width, height] = viewport;
	const [x, y] = screenCoord;
	const out = vec4.fromValues(
		(2 * x) / width - 1 - left,
		(2 * (height - y - 1)) / height - 1,
		1,
		1
	);
	vec4.transformMat4(out, out, invProjection);
	out[3] = 0;
	vec4.transformMat4(out, out, invView);
	return vec3.normalize(vec3.create(), out);
}

/**
 * Rotate 2D point by angle degrees around center (cx, cy) with cached cos/sin.
 */
function rotateTrianglePoints(triangle, rx, ry, rz, worldLoc) {
	// console.log('optimised ...')
	let rotated = triangle.map(p => [...p]); // Deep copy

	if(rx !== 0) {
		const {cos, sin} = calcCosSin(rx);
		rotated = rotated.map(([x, y, z]) => {
			const [ry, rz] = rotate2dPlotPrecomputed(0, 0, y, z, cos, sin);
			return [x, ry, rz];
		});
	}

	if(ry !== 0) {
		const {cos, sin} = calcCosSin(ry);
		rotated = rotated.map(([x, y, z]) => {
			const [rx, rz] = rotate2dPlotPrecomputed(0, 0, x, z, cos, sin);
			return [rx, y, rz];
		});
	}

	if(rz !== 0) {
		const {cos, sin} = calcCosSin(rz);
		rotated = rotated.map(([x, y, z]) => {
			const [rx, ry] = rotate2dPlotPrecomputed(0, 0, x, y, cos, sin);
			return [rx, ry, z];
		});
	}

	// Apply world offset
	rotated = rotated.map(([x, y, z]) => [
		x + worldLoc[0],
		y + worldLoc[1],
		z + worldLoc[2]
	]);

	return rotated;
}

export function checkingProcedure(ev, customArg) {
	let {clientX, clientY} = ev;
	if(typeof customArg !== 'undefined') {
		clientX = customArg.clientX;
		clientY = customArg.clientY;
	}
	touchCoordinate.x = clientX;
	touchCoordinate.y = clientY;
	touchCoordinate.w = ev.target.width;
	touchCoordinate.h = ev.target.height;
	touchCoordinate.enabled = true;
	// checkRay();
}

export function checkingProcedureCalc(object) {
	if(touchCoordinate.enabled === false || object.raycast.enabled === false) return;

	const world = matrixEngine.matrixWorld.world;
	let mvMatrix = object.mvMatrix; // use original to avoid spread copy
	let rayOrigin = vec3.fromValues(matrixEngine.Events.camera.xPos, matrixEngine.Events.camera.yPos, matrixEngine.Events.camera.zPos);

	// if(matrixEngine.Events.camera.zPos < object.position.z) {
	// 	rayOrigin[2] = -matrixEngine.Events.camera.zPos;
	// }

	const ray = unproject(
		[touchCoordinate.x, touchCoordinate.y],
		[0, 0, touchCoordinate.w, touchCoordinate.h],
		mat4.invert(_outp, world.pMatrix),
		mat4.invert(_outv, mvMatrix)
	);

	object.raycastFace = [];

	const indices = object.geometry.indices;
	const vertices = object.geometry.vertices;
	const worldLoc = object.position.worldLocation;
	const rx = object.rotation.rx;
	const ry = object.rotation.ry;
	const rz = object.rotation.rz;

	for(let f = 0;f < indices.length;f += 3) {
		const a = indices[f], b = indices[f + 1], c = indices[f + 2];
		const baseA = a * 3, baseB = b * 3, baseC = c * 3;

		const triangleInZero = [
			[vertices[baseA], vertices[baseA + 1], vertices[baseA + 2]],
			[vertices[baseB], vertices[baseB + 1], vertices[baseB + 2]],
			[vertices[baseC], vertices[baseC + 1], vertices[baseC + 2]],
		];

		const triangle = rotateTrianglePoints(triangleInZero, rx, ry, rz, worldLoc);

		object.raycastFace.push(triangle);
		let _intersectionPoint = vec3.create();

		const t = rayIntersectsTriangle(rayOrigin, ray, triangle, _intersectionPoint);
		if(t !== null) {
			rayHitEvent = new CustomEvent('ray.hit.event', {
				detail: {
					touchCoordinate: {x: touchCoordinate.x, y: touchCoordinate.y},
					hitObject: object,
					intersectionPoint: _intersectionPoint,
					ray: ray,
					rayOrigin: rayOrigin,
					distance: t
				}
			});
			dispatchEvent(rayHitEvent);

			if(touchCoordinate.enabled && touchCoordinate.stopOnFirstDetectedHit) {
				touchCoordinate.enabled = false;
				break; // stop processing more triangles if flag is set
			}
		}
	}
}

export function checkingProcedureCalcObj(object) {
	if(object.raycast.enabled === false || touchCoordinate.enabled === false) return;

	const world = matrixEngine.matrixWorld.world;
	let mvMatrix = object.mvMatrix;
	let rayOrigin = vec3.fromValues(matrixEngine.Events.camera.xPos, matrixEngine.Events.camera.yPos, matrixEngine.Events.camera.zPos);

	if(matrixEngine.Events.camera.zPos < object.position.z) {
		rayOrigin[2] = -matrixEngine.Events.camera.zPos;
	}

	const ray = unproject(
		[touchCoordinate.x, touchCoordinate.y],
		[0, 0, touchCoordinate.w, touchCoordinate.h],
		mat4.invert(_outp, world.pMatrix),
		mat4.invert(_outv, mvMatrix)
	);

	object.raycastFace = [];

	const indices = object.mesh.indices;
	const vertices = object.mesh.vertices;
	const worldLoc = object.position.worldLocation;
	const rx = object.rotation.rx;
	const ry = object.rotation.ry;
	const rz = object.rotation.rz;

	for(let f = 0;f < indices.length;f += 3) {
		const a = indices[f], b = indices[f + 1], c = indices[f + 2];
		const baseA = a * 3, baseB = b * 3, baseC = c * 3;

		const triangleInZero = [
			[vertices[baseA], vertices[baseA + 1], vertices[baseA + 2]],
			[vertices[baseB], vertices[baseB + 1], vertices[baseB + 2]],
			[vertices[baseC], vertices[baseC + 1], vertices[baseC + 2]],
		];

		const triangle = rotateTrianglePoints(triangleInZero, rx, ry, rz, worldLoc);

		object.raycastFace.push(triangle);

		const t = rayIntersectsTriangle(rayOrigin, ray, triangle, _intersectionPoint);
		if(t !== null) {
			rayHitEvent = new CustomEvent('ray.hit.event', {
				detail: {
					touchCoordinate: {x: touchCoordinate.x, y: touchCoordinate.y},
					hitObject: object,
					intersectionPoint: _intersectionPoint,
					ray: ray,
					rayOrigin: rayOrigin,
					distance: t
				}
			});
			dispatchEvent(rayHitEvent);

			if(touchCoordinate.enabled && touchCoordinate.stopOnFirstDetectedHit) {
				touchCoordinate.enabled = false;
				break;
			}
		}
	}
}

function updateObjectMatrix(obj) {
  const m = obj.mvMatrix;
  mat4.identity(m);
  mat4.translate(m, m, obj.position.worldLocation);
  mat4.rotateX(m, m, obj.rotation.rx);
  mat4.rotateY(m, m, obj.rotation.ry);
  mat4.rotateZ(m, m, obj.rotation.rz);
}

// export function checkRay() {
// 	for(let objName in matrixEngine.App.scene) {
// 		let object = matrixEngine.App.scene[objName];
// 		updateObjectMatrix(object)
// 		if(object.type !== "obj") {
// 			checkingProcedureCalc(object);
// 			console.log("mvMatrix", JSON.stringify(object.mvMatrix));
// 		} else {
// 			checkingProcedureCalcObj(object);
// 			console.log(' obj')
// 		}
// 	}
// }