
import App from '../program/manifest';
import {world} from './matrix-world';

App.operation.cube_buffer_procedure = function(object) {
	/* Vertex */
	object.vertexPositionBuffer = world.GL.gl.createBuffer();
	world.GL.gl.bindBuffer(world.GL.gl.ARRAY_BUFFER, object.vertexPositionBuffer);
	world.GL.gl.bufferData(world.GL.gl.ARRAY_BUFFER, object.geometry.vertices, world.GL.gl.STATIC_DRAW);
	object.vertexPositionBuffer.itemSize = 3;
	object.vertexPositionBuffer.numItems = 24;
	/* Color */
	if(object.color && null !== object.shaderProgram.vertexColorAttribute) {
		object.vertexColorBuffer = world.GL.gl.createBuffer();
		world.GL.gl.bindBuffer(world.GL.gl.ARRAY_BUFFER, object.vertexColorBuffer);
		world.GL.gl.bufferData(world.GL.gl.ARRAY_BUFFER, object.geometry.color, world.GL.gl.STATIC_DRAW);
		object.vertexColorBuffer.itemSize = 4;
		object.vertexColorBuffer.numItems = 24;
	}
	/* Texture */
	if(object.texture) {
		object.vertexTexCoordBuffer = world.GL.gl.createBuffer();
		world.GL.gl.bindBuffer(world.GL.gl.ARRAY_BUFFER, object.vertexTexCoordBuffer);
		world.GL.gl.bufferData(world.GL.gl.ARRAY_BUFFER, object.geometry.texCoords, world.GL.gl.STATIC_DRAW);
		object.vertexTexCoordBuffer.itemSize = 2;
		object.vertexTexCoordBuffer.numItems = 24;
	}
	/* Normals */
	if(object.shaderProgram.useLightingUniform) {
		object.vertexNormalBuffer = world.GL.gl.createBuffer();
		world.GL.gl.bindBuffer(world.GL.gl.ARRAY_BUFFER, object.vertexNormalBuffer);
		world.GL.gl.bufferData(world.GL.gl.ARRAY_BUFFER, object.LightMap, world.GL.gl.STATIC_DRAW);
		object.vertexNormalBuffer.itemSize = 3;
		object.vertexNormalBuffer.numItems = 24;
	}
	/* Indices */
	object.vertexIndexBuffer = world.GL.gl.createBuffer();
	world.GL.gl.bindBuffer(world.GL.gl.ELEMENT_ARRAY_BUFFER, object.vertexIndexBuffer);
	world.GL.gl.bufferData(world.GL.gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(object.geometry.indices), world.GL.gl.STATIC_DRAW);
	object.vertexIndexBuffer.itemSize = 1;
	object.vertexIndexBuffer.numItems = 36;
};

App.operation.piramide_buffer_procedure = function(object) {
	// Vertex
	// // console.log("        Buffer the " + object.type + "'s vertex");
	object.vertexPositionBuffer = world.GL.gl.createBuffer();
	world.GL.gl.bindBuffer(world.GL.gl.ARRAY_BUFFER, object.vertexPositionBuffer);
	world.GL.gl.bufferData(world.GL.gl.ARRAY_BUFFER, object.geometry.vertices, world.GL.gl.STATIC_DRAW);
	object.vertexPositionBuffer.itemSize = 3;
	object.vertexPositionBuffer.numItems = 18;

	/* Color                                         */
	//// console.log("        Buffer the " + object.type + "'s color");
	object.vertexColorBuffer = world.GL.gl.createBuffer();
	world.GL.gl.bindBuffer(world.GL.gl.ARRAY_BUFFER, object.vertexColorBuffer);
	world.GL.gl.bufferData(world.GL.gl.ARRAY_BUFFER, object.geometry.color, world.GL.gl.STATIC_DRAW);

	object.vertexColorBuffer.itemSize = 4;
	object.vertexColorBuffer.numItems = 18;
};

App.operation.square_buffer_procedure = function(object) {
	/* Vertex */
	object.vertexPositionBuffer = world.GL.gl.createBuffer();
	world.GL.gl.bindBuffer(world.GL.gl.ARRAY_BUFFER, object.vertexPositionBuffer);
	world.GL.gl.bufferData(world.GL.gl.ARRAY_BUFFER, object.geometry.vertices, world.GL.gl.STATIC_DRAW);
	object.vertexPositionBuffer.itemSize = 3;
	object.vertexPositionBuffer.numItems = 4;
	/* Color */
	object.vertexColorBuffer = world.GL.gl.createBuffer();
	world.GL.gl.bindBuffer(world.GL.gl.ARRAY_BUFFER, object.vertexColorBuffer);
	world.GL.gl.bufferData(world.GL.gl.ARRAY_BUFFER, new Float32Array(object.geometry.color), world.GL.gl.STATIC_DRAW);
	object.vertexColorBuffer.itemSize = 4;
	object.vertexColorBuffer.numItems = object.geometry.colorData.color.length;

	/* Normals                                   */


};

App.operation.triangle_buffer_procedure = function(object) {
	/* Vertex                                        */

	object.vertexPositionBuffer = world.GL.gl.createBuffer();
	world.GL.gl.bindBuffer(world.GL.gl.ARRAY_BUFFER, object.vertexPositionBuffer);
	world.GL.gl.bufferData(world.GL.gl.ARRAY_BUFFER, object.geometry.vertices, world.GL.gl.STATIC_DRAW);

	object.vertexPositionBuffer.itemSize = 3;
	object.vertexPositionBuffer.numItems = 3;

	/* Color                                         */

	object.vertexColorBuffer = world.GL.gl.createBuffer();
	world.GL.gl.bindBuffer(world.GL.gl.ARRAY_BUFFER, object.vertexColorBuffer);
	world.GL.gl.bufferData(world.GL.gl.ARRAY_BUFFER, new Float32Array(object.color), world.GL.gl.STATIC_DRAW);

	object.vertexColorBuffer.itemSize = 4;
	object.vertexColorBuffer.numItems = 3;

	// console.log("Buffer the " + object.type + "'s color loaded success.");
};

App.operation.obj_buffer_procedure = function(object) {
	/* Vertex Color only - other come from objLoader */
	if(object.color && null !== object.shaderProgram.vertexColorAttribute) {
		object.vertexColorBuffer = world.GL.gl.createBuffer();
		world.GL.gl.bindBuffer(world.GL.gl.ARRAY_BUFFER, object.vertexColorBuffer);
		var unpackedColors = [];
		for(var i in object.color) {
			var color = object.color[i];
			var looperLocal = 0;
			while(4 > looperLocal) {
				unpackedColors = unpackedColors.concat(color);
				looperLocal = looperLocal + 1;
			}
		}
		world.GL.gl.bufferData(world.GL.gl.ARRAY_BUFFER, new Float32Array(unpackedColors), world.GL.gl.STATIC_DRAW);
		object.vertexColorBuffer.itemSize = 4;
		object.vertexColorBuffer.numItems = 4;
	}
};

App.operation.squareTex_buffer_procedure = function(object) {
	/* Vertex */
	object.vertexPositionBuffer = world.GL.gl.createBuffer();
	world.GL.gl.bindBuffer(world.GL.gl.ARRAY_BUFFER, object.vertexPositionBuffer);
	world.GL.gl.bufferData(world.GL.gl.ARRAY_BUFFER, object.geometry.vertices, world.GL.gl.STATIC_DRAW);

	object.vertexPositionBuffer.itemSize = 3;
	object.vertexPositionBuffer.numItems = 4;

	/* Color */
	if(object.color && null !== object.shaderProgram.vertexColorAttribute) {
		object.vertexColorBuffer = world.GL.gl.createBuffer();
		world.GL.gl.bindBuffer(world.GL.gl.ARRAY_BUFFER, object.vertexColorBuffer);

		var unpackedColors = [];
		for(var i in object.color) {
			var color = object.color[i];
			var looperLocal = 0;
			while(4 > looperLocal) {
				unpackedColors = unpackedColors.concat(color);
				looperLocal = looperLocal + 1;
			}
		}

		world.GL.gl.bufferData(world.GL.gl.ARRAY_BUFFER, new Float32Array(unpackedColors), world.GL.gl.STATIC_DRAW);
		object.vertexColorBuffer.itemSize = 3;
		object.vertexColorBuffer.numItems = 4;
	}

	/* Texture */
	if(object.texture) {
		object.vertexTexCoordBuffer = world.GL.gl.createBuffer();
		world.GL.gl.bindBuffer(world.GL.gl.ARRAY_BUFFER, object.vertexTexCoordBuffer);
		world.GL.gl.bufferData(world.GL.gl.ARRAY_BUFFER, object.geometry.texCoords, world.GL.gl.STATIC_DRAW);
		object.vertexTexCoordBuffer.itemSize = 2;
		object.vertexTexCoordBuffer.numItems = 4;
	}

	/* Normals */
	if(object.shaderProgram.useLightingUniform) {
		object.vertexNormalBuffer = world.GL.gl.createBuffer();
		world.GL.gl.bindBuffer(world.GL.gl.ARRAY_BUFFER, object.vertexNormalBuffer);
		world.GL.gl.bufferData(world.GL.gl.ARRAY_BUFFER, object.LightMap, world.GL.gl.STATIC_DRAW);
		object.vertexNormalBuffer.itemSize = 4;
		object.vertexNormalBuffer.numItems = 4;
	}

	/* Indices */
	object.vertexIndexBuffer = world.GL.gl.createBuffer();
	world.GL.gl.bindBuffer(world.GL.gl.ELEMENT_ARRAY_BUFFER, object.vertexIndexBuffer);
	world.GL.gl.bufferData(world.GL.gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(object.geometry.indices), world.GL.gl.STATIC_DRAW);
	object.vertexIndexBuffer.itemSize = 1;
	object.vertexIndexBuffer.numItems = 6;
};

App.operation.sphere_buffer_procedure = function(object) {
	/* Vertex */
	object.vertexPositionBuffer = world.GL.gl.createBuffer();
	world.GL.gl.bindBuffer(world.GL.gl.ARRAY_BUFFER, object.vertexPositionBuffer);
	world.GL.gl.bufferData(world.GL.gl.ARRAY_BUFFER, object.geometry.vertices, world.GL.gl.STATIC_DRAW);
	object.vertexPositionBuffer.itemSize = 3;
	object.vertexPositionBuffer.numItems = object.geometry.vertexPositionData.length / 3;

	// Color
	if(object.color && null !== object.shaderProgram.vertexColorAttribute) {
		//    // console.log("        Buffer the " + object.type + "'s color");
		object.vertexColorBuffer = world.GL.gl.createBuffer();
		world.GL.gl.bindBuffer(world.GL.gl.ARRAY_BUFFER, object.vertexColorBuffer);

		var unpackedColors = [];
		for(var i in object.color) {
			var color = object.color[i];
			var looperLocal = 0;
			while(4 > looperLocal) {
				unpackedColors = unpackedColors.concat(color);
				looperLocal = looperLocal + 1;
			}
		}

		// ??
		world.GL.gl.bufferData(world.GL.gl.ARRAY_BUFFER, new Float32Array(unpackedColors), world.GL.gl.STATIC_DRAW);
		// world.GL.gl.bufferData(world.GL.gl.ARRAY_BUFFER, new Float32Array(object.geometry.normals), world.GL.gl.STATIC_DRAW);
		object.vertexColorBuffer.itemSize = 3;
		object.vertexColorBuffer.numItems = object.geometry.normalData.length / 3;
	}

	/* Texture */
	if(object.texture) {
		object.vertexTexCoordBuffer = world.GL.gl.createBuffer();
		world.GL.gl.bindBuffer(world.GL.gl.ARRAY_BUFFER, object.vertexTexCoordBuffer);
		world.GL.gl.bufferData(world.GL.gl.ARRAY_BUFFER, object.geometry.texCoords, world.GL.gl.STATIC_DRAW);
		object.vertexTexCoordBuffer.itemSize = 2;
		object.vertexTexCoordBuffer.numItems = object.geometry.textureCoordData.length / 2;
	}

	/* Normals */
	if(object.shaderProgram.useLightingUniform) {
		object.vertexNormalBuffer = world.GL.gl.createBuffer();
		world.GL.gl.bindBuffer(world.GL.gl.ARRAY_BUFFER, object.vertexNormalBuffer);
		world.GL.gl.bufferData(world.GL.gl.ARRAY_BUFFER, object.geometry.normals, world.GL.gl.STATIC_DRAW);
		object.vertexNormalBuffer.itemSize = 3;
		object.vertexNormalBuffer.numItems = object.geometry.normalData.length / 3;
	}

	/* Indices*/
	object.vertexIndexBuffer = world.GL.gl.createBuffer();
	world.GL.gl.bindBuffer(world.GL.gl.ELEMENT_ARRAY_BUFFER, object.vertexIndexBuffer);
	world.GL.gl.bufferData(world.GL.gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(object.geometry.indices), world.GL.gl.STATIC_DRAW);
	object.vertexIndexBuffer.itemSize = 1;
	object.vertexIndexBuffer.numItems = object.geometry.indexData.length;
};


App.operation.cubemap_buffer_procedure = function(object) {
	/* Vertex */
	object.vertexPositionBuffer = world.GL.gl.createBuffer();
	world.GL.gl.bindBuffer(world.GL.gl.ARRAY_BUFFER, object.vertexPositionBuffer);
	world.GL.gl.bufferData(world.GL.gl.ARRAY_BUFFER, object.geometry.vertices, world.GL.gl.STATIC_DRAW);
	object.vertexPositionBuffer.itemSize = 3;
	object.vertexPositionBuffer.numItems = 24;
	/* Color */
	if(object.color && null !== object.shaderProgram.vertexColorAttribute) {
		object.vertexColorBuffer = world.GL.gl.createBuffer();
		world.GL.gl.bindBuffer(world.GL.gl.ARRAY_BUFFER, object.vertexColorBuffer);
		world.GL.gl.bufferData(world.GL.gl.ARRAY_BUFFER, object.geometry.color, world.GL.gl.STATIC_DRAW);
		object.vertexColorBuffer.itemSize = 4;
		object.vertexColorBuffer.numItems = 24;
	}
	// /* Texture */
	// if (object.texture) {
	//   object.vertexTexCoordBuffer = world.GL.gl.createBuffer();
	//   world.GL.gl.bindBuffer(world.GL.gl.ARRAY_BUFFER, object.vertexTexCoordBuffer);
	//   world.GL.gl.bufferData(world.GL.gl.ARRAY_BUFFER, object.geometry.texCoords, world.GL.gl.STATIC_DRAW);
	//   object.vertexTexCoordBuffer.itemSize = 2;
	//   object.vertexTexCoordBuffer.numItems = 24;
	// }

	/* Normals */
	if(object.shaderProgram.useLightingUniform) {
		object.vertexNormalBuffer = world.GL.gl.createBuffer();
		world.GL.gl.bindBuffer(world.GL.gl.ARRAY_BUFFER, object.vertexNormalBuffer);
		world.GL.gl.bufferData(world.GL.gl.ARRAY_BUFFER, object.LightMap, world.GL.gl.STATIC_DRAW);
		object.vertexNormalBuffer.itemSize = 3;
		object.vertexNormalBuffer.numItems = 24;
	}
	/* Indices */
	object.vertexIndexBuffer = world.GL.gl.createBuffer();
	world.GL.gl.bindBuffer(world.GL.gl.ELEMENT_ARRAY_BUFFER, object.vertexIndexBuffer);
	world.GL.gl.bufferData(world.GL.gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(object.geometry.indices), world.GL.gl.STATIC_DRAW);
	object.vertexIndexBuffer.itemSize = 1;
	object.vertexIndexBuffer.numItems = 36;
};

export default App.operation;
