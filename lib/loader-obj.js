'use strict';
import {world} from './matrix-world';

/**
 * The main Mesh class. The constructor will parse through the OBJ file data
 * and collect the vertex, vertex normal, texture, and face information. This
 * information can then be used later on when creating your VBOs. See
 * OBJ.initMeshBuffers for an example of how to use the newly created Mesh
 *
 * @class Mesh
 * @constructor
 *
 * @param {String} objectData a string representation of an OBJ file with newlines preserved.
 * 
 * Fro group only detect special case `mesh name`
 *  - COLLIDER
 *  - Destruct
 * Generate vert , norm , texCord.
 */

export class constructMesh {

	constructor(objectData, inputArg) {
		this.name = '';
		this.inputArg = inputArg;
		this.objectData = objectData;
		this.create(objectData, inputArg);
		this.setScale = (s) => {
			this.inputArg.scale = s;
			initMeshBuffers(world.GL.gl, this.create(this.objectData, this.inputArg, undefined, this));
		};

		// Never used
		this.updateBuffers = () => {
			this.inputArg.scale = 1;
			initMeshBuffers(world.GL.gl, this.create(this.objectData, this.inputArg, undefined, this));
		};
	}

	create = (objectData, inputArg, callback, root) => {

		if(typeof callback === 'undefined') callback = function() {};

		let initOrientation = [0, 1, 2];
		/*
			The OBJ file format does a sort of compression when saving a model in a
			program like Blender. There are at least 3 sections (4 including textures)
			within the file. Each line in a section begins with the same string:
				* 'v': indicates vertex section
				* 'vn': indicates vertex normal section
				* 'f': indicates the faces section
				* 'vt': indicates vertex texture section (if textures were used on the model)
			Each of the above sections (except for the faces section) is a list/set of
			unique vertices.
			Each line of the faces section contains a list of
			(vertex, [texture], normal) groups
			Some examples:
					// the texture index is optional, both formats are possible for models
					// without a texture applied
					f 1/25 18/46 12/31
					f 1//25 18//46 12//31
					// A 3 vertex face with texture indices
					f 16/92/11 14/101/22 1/69/1
					// A 4 vertex face
					f 16/92/11 40/109/40 38/114/38 14/101/22
			The first two lines are examples of a 3 vertex face without a texture applied.
			The second is an example of a 3 vertex face with a texture applied.
			The third is an example of a 4 vertex face. Note: a face can contain N
			number of vertices.
			Each number that appears in one of the groups is a 1-based index
			corresponding to an item from the other sections (meaning that indexing
			starts at one and *not* zero).
			For example:
					`f 16/92/11` is saying to
						- take the 16th element from the [v] vertex array
						- take the 92nd element from the [vt] texture array
						- take the 11th element from the [vn] normal array
					and together they make a unique vertex.
			Using all 3+ unique Vertices from the face line will produce a polygon.
			Now, you could just go through the OBJ file and create a new vertex for
			each face line and WebGL will draw what appears to be the same model.
			However, vertices will be overlapped and duplicated all over the place.
			Consider a cube in 3D space centered about the origin and each side is
			2 units long. The front face (with the positive Z-axis pointing towards
			you) would have a Top Right vertex (looking orthogonal to its normal)
			mapped at (1,1,1) The right face would have a Top Left vertex (looking
			orthogonal to its normal) at (1,1,1) and the top face would have a Bottom
			Right vertex (looking orthogonal to its normal) at (1,1,1). Each face
			has a vertex at the same coordinates, however, three distinct vertices
			will be drawn at the same spot.
			To solve the issue of duplicate Vertices (the `(vertex, [texture], normal)`
			groups), while iterating through the face lines, when a group is encountered
			the whole group string ('16/92/11') is checked to see if it exists in the
			packed.hashindices object, and if it doesn't, the indices it specifies
			are used to look up each attribute in the corresponding attribute arrays
			already created. The values are then copied to the corresponding unpacked
			array (flattened to play nice with WebGL's ELEMENT_ARRAY_BUFFER indexing),
			the group string is added to the hashindices set and the current unpacked
			index is used as this hashindices value so that the group of elements can
			be reused. The unpacked index is incremented. If the group string already
			exists in the hashindices object, its corresponding value is the index of
			that group and is appended to the unpacked indices array.
			*/
		var verts = [],
			vertNormals = [],
			textures = [],
			unpacked = {};
		// unpacking stuff
		unpacked.verts = [];
		unpacked.norms = [];
		unpacked.textures = [];
		unpacked.hashindices = {};
		unpacked.indices = [];
		unpacked.index = 0;

		var TEST_FACES = [];
		// array of lines separated by the newline
		var lines = objectData.split('\n');

		// test group catch data bpund or center
		var objGroups = [];
		// update swap orientation
		if(inputArg.swap[0] !== null) {
			swap(inputArg.swap[0], inputArg.swap[1], initOrientation);
		}

		var VERTEX_RE = /^v\s/;
		var NORMAL_RE = /^vn\s/;
		var TEXTURE_RE = /^vt\s/;
		var FACE_RE = /^f\s/;
		var WHITESPACE_RE = /\s+/;

		for(var i = 0;i < lines.length;i++) {
			var line = lines[i].trim();
			var elements = line.split(WHITESPACE_RE);
			elements.shift();
			if(VERTEX_RE.test(line)) {
				verts.push.apply(verts, elements);
				if(objGroups.length > 0) {
					objGroups[objGroups.length - 1].groupVert.push(elements)
				}
			} else if(NORMAL_RE.test(line)) {
				// if this is a vertex normal
				vertNormals.push.apply(vertNormals, elements);

				// TEST 
				if(objGroups.length > 0) {
					objGroups[objGroups.length - 1].groupNorm.push(elements)
				}

			} else if(TEXTURE_RE.test(line)) {
				// if this is a texture
				textures.push.apply(textures, elements);

				// TEST 
				if(objGroups.length > 0) {
					objGroups[objGroups.length - 1].groupTexCord.push(elements)
				}

			} else if(FACE_RE.test(line)) {
				// if this is a face
				/*
					split this face into an array of vertex groups
					for example:
						f 16/92/11 14/101/22 1/69/1
					becomes:
						['16/92/11', '14/101/22', '1/69/1'];
					*/


				// 		unpacked.index = 0;


				var quad = false;
				for(var j = 0, eleLen = elements.length;j < eleLen;j++) {
					// Triangulating quads
					// quad: 'f v0/t0/vn0 v1/t1/vn1 v2/t2/vn2 v3/t3/vn3/'
					// corresponding triangles:
					//      'f v0/t0/vn0 v1/t1/vn1 v2/t2/vn2'
					//      'f v2/t2/vn2 v3/t3/vn3 v0/t0/vn0'
					if(j === 3 && !quad) {
						// add v2/t2/vn2 in again before continuing to 3
						j = 2;
						quad = true;
					}
					if(elements[j] in unpacked.hashindices) {
						unpacked.indices.push(unpacked.hashindices[elements[j]]);
						console.log('HASH INDICES >>>> elements[j] ', elements[j])
					} else {
						/*
									Each element of the face line array is a vertex which has its
									attributes delimited by a forward slash. This will separate
									each attribute into another array:
											'19/92/11'
									becomes:
											vertex = ['19', '92', '11'];
									where
											vertex[0] is the vertex index
											vertex[1] is the texture index
											vertex[2] is the normal index
									Think of faces having Vertices which are comprised of the
									attributes location (v), texture (vt), and normal (vn).
									*/
						var vertex = elements[j].split('/');
						/*
									The verts, textures, and vertNormals arrays each contain a
									flattend array of coordinates.
									Because it gets confusing by referring to vertex and then
									vertex (both are different in my descriptions) I will explain
									what's going on using the vertexNormals array:
									vertex[2] will contain the one-based index of the vertexNormals
									section (vn). One is subtracted from this index number to play
									nice with javascript's zero-based array indexing.
									Because vertexNormal is a flattened array of x, y, z values,
									simple pointer arithmetic is used to skip to the start of the
									vertexNormal, then the offset is added to get the correct
									component: +0 is x, +1 is y, +2 is z.
									This same process is repeated for verts and textures.
									*/

						// vertex position + scale by axis
						if(typeof inputArg.scale == "number") {
							unpacked.verts.push(+verts[(vertex[0] - 1) * 3 + initOrientation[0]] * inputArg.scale);
							unpacked.verts.push(+verts[(vertex[0] - 1) * 3 + initOrientation[1]] * inputArg.scale);
							unpacked.verts.push(+verts[(vertex[0] - 1) * 3 + initOrientation[2]] * inputArg.scale);
							console.log('VERT PUSH >> (vertex[0] - 1) * 3 >>  ', (vertex[0] - 1) * 3 )
						} else {
							unpacked.verts.push(+verts[(vertex[0] - 1) * 3 + initOrientation[0]] * inputArg.scale.x);
							unpacked.verts.push(+verts[(vertex[0] - 1) * 3 + initOrientation[1]] * inputArg.scale.y);
							unpacked.verts.push(+verts[(vertex[0] - 1) * 3 + initOrientation[2]] * inputArg.scale.z);
						}

						// vertex textures
						if(textures.length) {
							unpacked.textures.push(+textures[(vertex[1] - 1) * 2 + 0]);
							unpacked.textures.push(+textures[(vertex[1] - 1) * 2 + 1]);
						}
						// vertex normals
						unpacked.norms.push(+vertNormals[(vertex[2] - 1) * 3 + 0]);
						unpacked.norms.push(+vertNormals[(vertex[2] - 1) * 3 + 1]);
						unpacked.norms.push(+vertNormals[(vertex[2] - 1) * 3 + 2]);
						// add the newly created vertex to the list of indices
						unpacked.hashindices[elements[j]] = unpacked.index;
						unpacked.indices.push(unpacked.index);
						// increment the counter
						unpacked.index += 1;

					}
					if(j === 3 && quad) {
						// add v0/t0/vn0 onto the second triangle
						unpacked.indices.push(unpacked.hashindices[elements[0]]);
					}
				}
			} else {
				if(line.indexOf('# ') != -1) {
					// console.log('obj loader comment:', line)
				} else if(line.indexOf('mtllib') != -1) {
					// console.log('obj loader MTL file:', line)
				} else if(line.indexOf('o ') != -1) {
					console.log('obj loader object name:', line.split(' ')[1])
					this.name = line.split(' ')[1]

				} else if(line.indexOf('g ') != -1) {
					// console.log('obj loader group :', line)
					var nameOFGroup = line.split(' ')[1]
					if(nameOFGroup.indexOf('COLLIDER') != -1) {
						// console.log('obj loader group [SPECIAL CASE COLLIDER]:', nameOFGroup)
						objGroups.push({
							groupName: nameOFGroup,
							groupVert: [],
							groupNorm: [],
							groupTexCord: [],
							groupIndices: []
						})
					} else if(nameOFGroup.indexOf('Destruct') != -1) {
						// console.log('obj loader group [SPECIAL CASE Destruct] [reset] :', nameOFGroup)
						objGroups.push({
							groupName: nameOFGroup,
							groupVert: [],
							groupNorm: [],
							groupTexCord: [],
							groupIndices: []
						})
					}
				}
			}
		}
		this.vertices = unpacked.verts;
		this.vertexNormals = unpacked.norms;
		this.textures = unpacked.textures;
		this.indices = unpacked.indices;

		verts = verts.map(function(item) {
			return parseFloat(item);
		});
		this.TEST_verts = verts;

		if(objGroups.length > 0) {
			this.groups = objGroups;
		} else {
			this.groups = null;
		}
		callback();
		return this;
	};

}

var Ajax = function() {
	// this is just a helper class to ease ajax calls
	var _this = this;
	this.xmlhttp = new XMLHttpRequest();

	this.get = function(url, callback) {
		_this.xmlhttp.onreadystatechange = function() {
			if(_this.xmlhttp.readyState === 4) {
				callback(_this.xmlhttp.responseText, _this.xmlhttp.status);
			}
		};
		_this.xmlhttp.open('GET', url, true);
		_this.xmlhttp.send();
	};
};

/**
 * Takes in an object of `mesh_name`, `'/url/to/OBJ/file'` pairs and a callback
 * function. Each OBJ file will be ajaxed in and automatically converted to
 * an OBJ.Mesh. When all files have successfully downloaded the callback
 * function provided will be called and passed in an object containing
 * the newly created meshes.
 *
 * **Note:** In order to use this function as a way to download meshes, a
 * webserver of some sort must be used.
 *
 * @param {Object} nameAndURLs an object where the key is the name of the mesh and the value is the url to that mesh's OBJ file
 *
 * @param {Function} completionCallback should contain a function that will take one parameter: an object array where the keys will be the unique object name and the value will be a Mesh object
 *
 * @param {Object} meshes In case other meshes are loaded separately or if a previously declared variable is desired to be used, pass in a (possibly empty) json object of the pattern: { '<mesh_name>': OBJ.Mesh }
 *
 */
export var downloadMeshes = function(nameAndURLs, completionCallback, inputArg) {
	// the total number of meshes. this is used to implement "blocking"
	var semaphore = Object.keys(nameAndURLs).length;
	// if error is true, an alert will given
	var error = false;
	// this is used to check if all meshes have been downloaded
	// if meshes is supplied, then it will be populated, otherwise
	// a new object is created. this will be passed into the completionCallback
	if(typeof inputArg === 'undefined') {
		var inputArg = {
			scale: 1,
			swap: [null]
		};
	}
	if(typeof inputArg.scale === 'undefined') inputArg.scale = 1;
	if(typeof inputArg.swap === 'undefined') inputArg.swap = [null];

	var meshes = {};

	// loop over the mesh_name,url key,value pairs
	for(var mesh_name in nameAndURLs) {
		if(nameAndURLs.hasOwnProperty(mesh_name)) {
			new Ajax().get(
				nameAndURLs[mesh_name],
				(function(name) {
					return function(data, status) {
						if(status === 200) {
							meshes[name] = new constructMesh(data, inputArg);
						} else {
							error = true;
							console.error('An error has occurred and the mesh "' + name + '" could not be downloaded.');
						}
						// the request has finished, decrement the counter
						semaphore--;
						if(semaphore === 0) {
							if(error) {
								// if an error has occurred, the user is notified here and the
								// callback is not called
								console.error('An error has occurred and one or meshes has not been ' + 'downloaded. The execution of the script has terminated.');
								throw '';
							}
							// there haven't been any errors in retrieving the meshes
							// call the callback
							completionCallback(meshes);
						}
					};
				})(mesh_name)
			);
		}
	}
};

var _buildBuffer = function(gl, type, data, itemSize) {
	var buffer = gl.createBuffer();
	var arrayView = type === gl.ARRAY_BUFFER ? Float32Array : Uint16Array;
	gl.bindBuffer(type, buffer);
	gl.bufferData(type, new arrayView(data), gl.STATIC_DRAW);
	buffer.itemSize = itemSize;
	buffer.numItems = data.length / itemSize;
	return buffer;
};

/**
 * Takes in the WebGL context and a Mesh, then creates and appends the buffers
 * to the mesh object as attributes.
 *
 * @param {WebGLRenderingContext} gl the `canvas.getContext('webgl')` context instance
 * @param {Mesh} mesh a single `OBJ.Mesh` instance
 *
 * The newly created mesh attributes are:
 *
 * Attrbute | Description
 * :--- | ---
 * **normalBuffer**       |contains the model&#39;s Vertex Normals
 * normalBuffer.itemSize  |set to 3 items
 * normalBuffer.numItems  |the total number of vertex normals
 * |
 * **textureBuffer**      |contains the model&#39;s Texture Coordinates
 * textureBuffer.itemSize |set to 2 items
 * textureBuffer.numItems |the number of texture coordinates
 * |
 * **vertexBuffer**       |contains the model&#39;s Vertex Position Coordinates (does not include w)
 * vertexBuffer.itemSize  |set to 3 items
 * vertexBuffer.numItems  |the total number of vertices
 * |
 * **indexBuffer**        |contains the indices of the faces
 * indexBuffer.itemSize   |is set to 1
 * indexBuffer.numItems   |the total number of indices
 */
export var initMeshBuffers = function(gl, mesh) {
	mesh.normalBuffer = _buildBuffer(gl, gl.ARRAY_BUFFER, mesh.vertexNormals, 3);
	mesh.textureBuffer = _buildBuffer(gl, gl.ARRAY_BUFFER, mesh.textures, 2);
	mesh.vertexBuffer = _buildBuffer(gl, gl.ARRAY_BUFFER, mesh.vertices, 3);
	mesh.indexBuffer = _buildBuffer(gl, gl.ELEMENT_ARRAY_BUFFER, mesh.indices, 1);
};

export var deleteMeshBuffers = function(gl, mesh) {
	gl.deleteBuffer(mesh.normalBuffer);
	gl.deleteBuffer(mesh.textureBuffer);
	gl.deleteBuffer(mesh.vertexBuffer);
	gl.deleteBuffer(mesh.indexBuffer);
};

/**
 * @description
 * Construct sequence list argument for downloadMeshes.
 * This is adaptation for blender obj animation export.
 * For example:
 *    matrixEngine.objLoader.downloadMeshes(
			matrixEngine.objLoader.makeObjSeqArg(
				{
					id: objName,
					joinMultiPahts: [
						{
							path: "res/bvh-skeletal-base/swat-guy/seq-walk/low/swat",
							id: objName,
							from: 1, to: 34
						},
						{
							path: "res/bvh-skeletal-base/swat-guy/seq-walk-pistol/low/swat-walk-pistol",
							id: objName,
							from: 35, to: 54
						}
					]
				}),
			onLoadObj
		);
 */
export const makeObjSeqArg = (arg) => {
	// Adaptation for blender (animation) obj exporter.
	var local = {};
	function localCalc(arg, noInitial = false) {
		var zeros = '00000';
		var l = {};
		var helper = arg.from;
		for(let j = arg.from, z = 1;j <= arg.to;j++) {
			if(z > 9 && z < 99) {
				zeros = '0000';
			} else if(z > 99 && z < 999) {
				zeros = '000';
			} // no need more then 999
			if(helper == arg.from && noInitial === false) {
				l[arg.id] = arg.path + '_' + zeros + z + '.obj';
			} else {
				l[arg.id + (helper - 1)] = arg.path + '_' + zeros + z + '.obj';
			}
			helper++;
			z++;
		}
		return l;
	}

	if(typeof arg.path === 'string') {
		local = localCalc(arg);
	} else if(typeof arg.path === 'undefined') {
		if(typeof arg.joinMultiPahts !== 'undefined') {
			console.log("ITS joinMultiPahts!");
			var localFinal = {};
			arg.joinMultiPahts.forEach((arg, index) => {
				if(index === 0) {
					localFinal = Object.assign(local, localCalc(arg));
				} else {
					localFinal = Object.assign(local, localCalc(arg, true));
				}
			});
			console.log("joinMultiPahts LOCAL => ", localFinal);
			return localFinal;
		}
	}
	return local;
}

/**
 * @description
 * Switching obj seq animations frames range.
 */
export function play(nameAni) {
	this.animation.anims.active = nameAni;
	this.animation.currentAni = this.animation.anims[this.animation.anims.active].from;
}

// TEST
// add destroy animation meshs procedure