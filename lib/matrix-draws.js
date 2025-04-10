import App from '../program/manifest';
import {world} from './matrix-world';
import {camera} from './events';
import {E, gen2DTextFace} from './utility';
import * as raycaster from './raycast';
import {degToRad} from './engine';
import * as CANNON from 'cannon';

// Override
CANNON.Quaternion.prototype.toAxisAngle = function(targetAxis) {
	targetAxis = targetAxis || new CANNON.Vec3();
	if(this.w > 1) this.normalize();
	var angle = 2 * Math.acos(this.w);
	var s = Math.sqrt(1 - this.w * this.w);
	if(s < 0.00000001) {
		var max1 = [this.x, this.y, this.z];
		var getMaxValue = Math.max(...max1)
		var index = max1.indexOf(getMaxValue)
		targetAxis.x = 1;
		targetAxis.y = 0;
		targetAxis.z = 0;
	} else {
		targetAxis.x = this.x / s;
		targetAxis.y = this.y / s;
		targetAxis.z = this.z / s;
	}
	return [targetAxis, angle];
};

App.operation.draws = new Object();

App.operation.draws.cube = function(object, ray) {

	var lighting = true;
	var localLooper = 0;

	mat4.identity(object.mvMatrix);
	this.mvPushMatrix(object.mvMatrix, this.mvMatrixStack);

	if(object.physics.enabled == true) {

		if(App.camera.FirstPersonController == true) {
			camera.setCamera(object)
		} else if(App.camera.SceneController == true) {
			camera.setSceneCamera(object)
		}
		var QP = object.physics.currentBody.quaternion;
		QP.normalize()
		mat4.translate(object.mvMatrix, object.mvMatrix, object.position.worldLocation);
		if(raycaster.checkingProcedureCalc && typeof ray === 'undefined') raycaster.checkingProcedureCalc(object);
		var t = vec3.fromValues(object.rotation.axis.x, object.rotation.axis.z, object.rotation.axis.y);
		object.rotation.axisSystem[0].normalize()
		var AXIS = vec3.fromValues(
			-parseFloat(object.rotation.axisSystem[0].x.toFixed(2)),
			-parseFloat(object.rotation.axisSystem[0].z.toFixed(2)),
			-parseFloat(object.rotation.axisSystem[0].y.toFixed(2)))
		var MY_ANGLE = (2 * Math.acos(QP.w))
		mat4.rotate(object.mvMatrix, object.mvMatrix, MY_ANGLE, AXIS);

	} else if(object.isHUD === true) {

		mat4.translate(object.mvMatrix, object.mvMatrix, object.position.worldLocation);
		mat4.rotate(object.mvMatrix, object.mvMatrix, degToRad(object.rotation.rx), object.rotation.getRotDirX());
		mat4.rotate(object.mvMatrix, object.mvMatrix, degToRad(object.rotation.ry), object.rotation.getRotDirY());
		mat4.rotate(object.mvMatrix, object.mvMatrix, degToRad(object.rotation.rz), object.rotation.getRotDirZ());
		if(raycaster.checkingProcedureCalc) raycaster.checkingProcedureCalc(object);

	} else {

		if(App.camera.FirstPersonController == true) {
			camera.setCamera(object)
		} else if(App.camera.SceneController == true) {
			camera.setSceneCamera(object)
		}

		mat4.translate(object.mvMatrix, object.mvMatrix, object.position.worldLocation);
		if(raycaster.checkingProcedureCalc && typeof ray === 'undefined') raycaster.checkingProcedureCalc(object);

		mat4.rotate(object.mvMatrix, object.mvMatrix, degToRad(object.rotation.rx), object.rotation.getRotDirX());
		mat4.rotate(object.mvMatrix, object.mvMatrix, degToRad(object.rotation.ry), object.rotation.getRotDirY());
		mat4.rotate(object.mvMatrix, object.mvMatrix, degToRad(object.rotation.rz), object.rotation.getRotDirZ());
	}

	// V
	if(object.vertexPositionBuffer) {
		world.GL.gl.bindBuffer(world.GL.gl.ARRAY_BUFFER, object.vertexPositionBuffer);
		if(object.geometry.dynamicBuffer == true) {
			world.GL.gl.bufferData(world.GL.gl.ARRAY_BUFFER, object.geometry.vertices, world.GL.gl.STATIC_DRAW);
		}
		world.GL.gl.vertexAttribPointer(object.shaderProgram.vertexPositionAttribute, object.vertexPositionBuffer.itemSize, world.GL.gl.FLOAT, false, 0, 0);
		world.GL.gl.enableVertexAttribArray(object.shaderProgram.vertexPositionAttribute);
		localLooper = localLooper + 1;
	}

	// C
	if(object.vertexColorBuffer) {
		world.GL.gl.bindBuffer(world.GL.gl.ARRAY_BUFFER, object.vertexColorBuffer);
		world.GL.gl.vertexAttribPointer(object.shaderProgram.vertexColorAttribute, object.vertexColorBuffer.itemSize, world.GL.gl.FLOAT, false, 0, 0);
		world.GL.gl.enableVertexAttribArray(object.shaderProgram.vertexColorAttribute);
		localLooper = localLooper + 1;
	}

	// L
	if(lighting && object.shaderProgram.useLightingUniform) {
		world.GL.gl.uniform1i(object.shaderProgram.useLightingUniform, lighting);
		/* Set the normals */
		if(object.vertexNormalBuffer) {
			world.GL.gl.bindBuffer(world.GL.gl.ARRAY_BUFFER, object.vertexNormalBuffer);
			world.GL.gl.vertexAttribPointer(object.shaderProgram.vertexNormalAttribute, object.vertexNormalBuffer.itemSize, world.GL.gl.FLOAT, false, 0, 0);
			world.GL.gl.enableVertexAttribArray(object.shaderProgram.vertexNormalAttribute);
			localLooper = localLooper + 1;
		}
		/* Ambient light */
		if(object.shaderProgram.ambientColorUniform) {
			if(E('ambLightR')) {
				world.GL.gl.uniform3f(
					object.shaderProgram.ambientColorUniform,
					parseFloat(E('ambLightR').getAttribute('value')),
					parseFloat(E('ambLightG').getAttribute('value')),
					parseFloat(E('ambLightB').getAttribute('value'))
				);
			} else {
				world.GL.gl.uniform3f(object.shaderProgram.ambientColorUniform, object.LightsData.ambientLight.r, object.LightsData.ambientLight.g, object.LightsData.ambientLight.b);
			}
		}

		/* Directional light */
		if(object.shaderProgram.directionalColorUniform) {
			if(E('dirLightR')) {
				world.GL.gl.uniform3f(object.shaderProgram.directionalColorUniform,
					parseFloat(E('dirLightR').getAttribute('value')),
					parseFloat(E('dirLightG').getAttribute('value')),
					parseFloat(E('dirLightB').getAttribute('value'))
				);
			} else {
				world.GL.gl.uniform3f(object.shaderProgram.directionalColorUniform, object.LightsData.directionLight.R(), object.LightsData.directionLight.G(), object.LightsData.directionLight.B());
			}
		}

		/* Direction */
		var lightingDirection = null;
		if(object.shaderProgram.lightingDirectionUniform) {
			if(E('dirX') && E('dirY') && E('dirZ')) {
				lightingDirection = [degToRad(parseFloat(E('dirX').getAttribute('value'))), degToRad(parseFloat(E('dirY').getAttribute('value'))), degToRad(parseFloat(E('dirZ').getAttribute('value')))];
			} else {
				lightingDirection = [object.LightsData.lightingDirection.r, object.LightsData.lightingDirection.g, object.LightsData.lightingDirection.b];
			}

			var adjustedLD = vec3.create();
			vec3.normalize(adjustedLD, lightingDirection);
			vec3.scale(adjustedLD, adjustedLD, -1);
			world.GL.gl.uniform3fv(object.shaderProgram.lightingDirectionUniform, adjustedLD);
		}
	} else {
		if(object.shaderProgram.useLightingUniform) {
			if(object.shaderProgram.ambientColorUniform) {
				world.GL.gl.uniform3f(object.shaderProgram.ambientColorUniform, parseFloat(0.2), parseFloat(0.2), parseFloat(0.2));
			}
			if(object.shaderProgram.directionalColorUniform) {
				world.GL.gl.uniform3f(object.shaderProgram.directionalColorUniform, parseFloat(1), parseFloat(0), parseFloat(0));
			}
		}
	}

	// T
	if(object.vertexTexCoordBuffer) {
		world.GL.gl.bindBuffer(world.GL.gl.ARRAY_BUFFER, object.vertexTexCoordBuffer);

		if(object.geometry.dynamicBuffer == true) {
			world.GL.gl.bufferData(world.GL.gl.ARRAY_BUFFER, object.geometry.texCoords, world.GL.gl.STATIC_DRAW);
		}

		world.GL.gl.vertexAttribPointer(object.shaderProgram.textureCoordAttribute, object.vertexTexCoordBuffer.itemSize, world.GL.gl.FLOAT, false, 0, 0);
		world.GL.gl.enableVertexAttribArray(object.shaderProgram.textureCoordAttribute);

		if(object.streamTextures != null) {
			// video/webcam tex
			// App.tools.loadVideoTexture('glVideoTexture', object.streamTextures.videoImage);
			if(object.streamTextures.video) {
				App.tools.loadVideoTexture('glVideoTexture', object.streamTextures.video);
			} else {
				App.tools.loadVideoTexture('glVideoTexture', object.streamTextures.videoImage);
			}
			world.GL.gl.uniform1i(object.shaderProgram.samplerUniform, 0);

		} else if(object.FBO) {

			if(object.shadows && object.shadows.type == "spot-shadow") {
				// --------------------------------------------------------------------
				let textureMatrix = m4.identity();
				textureMatrix = m4.translate(textureMatrix, 0.5, 0.5, 0.5);
				textureMatrix = m4.scale(textureMatrix, 0.5, 0.5, 0.5);
				textureMatrix = m4.multiply(textureMatrix, object.shadows.lightProjectionMatrix);
				const lightWorldMatrix = m4.lookAt(
					[object.shadows.lightPosition[0], object.shadows.lightPosition[1], object.shadows.lightPosition[2]],
					[object.shadows.lightTarget[0], object.shadows.lightTarget[1], object.shadows.lightTarget[2]], // target
					[object.shadows.orientation[0], object.shadows.orientation[1], object.shadows.orientation[2]], // up
				);
				textureMatrix = m4.multiply(textureMatrix, m4.inverse(lightWorldMatrix));
				const mat = m4.multiply(lightWorldMatrix, m4.inverse(object.shadows.lightProjectionMatrix));
				world.GL.gl.uniformMatrix4fv(object.shaderProgram.u_textureMatrix, false, textureMatrix);
				world.GL.gl.uniform3fv(object.shaderProgram.lightWorldPositionLocation, object.shadows.lightPosition);
				world.GL.gl.uniformMatrix4fv(object.shaderProgram.u_world, false,
					m4.translate(object.position.worldLocation[0],
						object.position.worldLocation[1],
						object.position.worldLocation[2])
				);
				// world.GL.gl.uniformMatrix4fv(object.shaderProgram.u_world, false, mat);
				world.GL.gl.uniform3fv(object.shaderProgram.u_reverseLightDirection, lightWorldMatrix.slice(8, 11));
				world.GL.gl.uniform1f(object.shaderProgram.u_bias, object.shadows.bias);
				//---------------------------------------------------------------------
				world.GL.gl.activeTexture(world.GL.gl.TEXTURE0);
				world.GL.gl.bindTexture(world.GL.gl.TEXTURE_2D, object.FBO.deepTexture);
				world.GL.gl.uniform1i(object.shaderProgram.samplerUniform, 0);
				//-------------------------------------------
				var t_index0 = 0;
				for(var t = 1;t < object.textures.length;t++) {
					if(object.custom.gl_texture == null) {
						world.GL.gl.activeTexture(world.GL.gl['TEXTURE' + t]);
						world.GL.gl.bindTexture(world.GL.gl.TEXTURE_2D, object.textures[t_index0]);
						if(world.GL.extTFAnisotropic) {
							world.GL.gl.texParameterf(world.GL.gl.TEXTURE_2D,
								world.GL.extTFAnisotropic.TEXTURE_MAX_ANISOTROPY_EXT,
								world.GL.MAX_TEXTURE_MAX_ANISOTROPY_EXT);
						}
						if(object.texParams.MIPMAP == false) {
							world.GL.gl.texParameteri(world.GL.gl.TEXTURE_2D, world.GL.gl.TEXTURE_WRAP_S, world.GL.gl.REPEAT);
							world.GL.gl.texParameteri(world.GL.gl.TEXTURE_2D, world.GL.gl.TEXTURE_WRAP_T, world.GL.gl.REPEAT);
						}
						else {
							world.GL.gl.texParameteri(world.GL.gl.TEXTURE_2D, world.GL.gl.TEXTURE_MAG_FILTER, object.texParams.TEXTURE_MAG_FILTER | world.GL.gl.LINEAR);
							world.GL.gl.texParameteri(world.GL.gl.TEXTURE_2D, world.GL.gl.TEXTURE_MIN_FILTER, object.texParams.TEXTURE_MIN_FILTER | world.GL.gl.LINEAR);
						}

						if(typeof object.texParams.spriteAnimation != 'undefined' && object.texParams.spriteAnimation != false && object.textures[t].image.width != 0) {
							//char * data; // data of 8-bit per sample RGBA image
							// int w, h; // size of the image
							// int sx, sy, sw, sh; // position and size of area you want to crop.
							//glTexImage2D does support regions - of - interest.You do it as follows:
							world.GL.gl.pixelStorei(world.GL.gl.UNPACK_FLIP_Y_WEBGL, false);
							var [XX, YY] = object.texParams.spriteAnimation.getOffsetXY();
							world.GL.gl.pixelStorei(world.GL.gl.UNPACK_ROW_LENGTH, object.textures[t].image.height);
							world.GL.gl.pixelStorei(world.GL.gl.UNPACK_SKIP_PIXELS,
								XX * (object.textures[t].image.width / object.texParams.spriteAnimation.shema[0]));
							world.GL.gl.pixelStorei(world.GL.gl.UNPACK_SKIP_ROWS,
								YY * (object.textures[t].image.height / object.texParams.spriteAnimation.shema[1]));
							world.GL.gl.pixelStorei(world.GL.gl.UNPACK_ALIGNMENT, 1);
							// LodePNG tightly packs everything
							// glTexImage2D(GL_TEXTURE_2D, level, internalFormat,
							// sw, sh, border, format, type, data);
							world.GL.gl.texImage2D(world.GL.gl.TEXTURE_2D,
								0, world.GL.gl.RGBA,
								object.textures[t].image.width / object.texParams.spriteAnimation.shema[0],
								object.textures[t].image.height / object.texParams.spriteAnimation.shema[1],
								0,
								world.GL.gl.RGBA,
								world.GL.gl.UNSIGNED_BYTE,
								object.textures[t].image);
						}

						if(object.texParams.MIPMAP == true) {
							world.GL.gl.texParameteri(world.GL.gl.TEXTURE_2D, world.GL.gl.TEXTURE_MAG_FILTER, world.GL.gl.NEAREST);
							world.GL.gl.texParameteri(world.GL.gl.TEXTURE_2D, world.GL.gl.TEXTURE_MIN_FILTER, world.GL.gl.LINEAR_MIPMAP_NEAREST);
							world.GL.gl.generateMipmap(world.GL.gl.TEXTURE_2D);
						}

						world.GL.gl.uniform1i(object.shaderProgram.samplerUniform, t);
						world.GL.gl.uniform1i(object.shaderProgram.u_projectedTexture, t);
					} else {
						object.custom.gl_texture(object, t);
					}
				}
				// world.GL.gl.uniform1i(object.shaderProgram.samplerUniform, 1);
			} else {
				world.GL.gl.activeTexture(world.GL.gl.TEXTURE0);
				world.GL.gl.bindTexture(world.GL.gl.TEXTURE_2D, object.FBO.deepTexture);
				world.GL.gl.uniform1i(object.shaderProgram.samplerUniform, 0);
			}

		} else {
			//------------
			if(object.shadows && object.shadows.type == "spot-shadow") {
				// --------------------------------------------------------------------
				let textureMatrix = m4.identity();
				textureMatrix = m4.translate(textureMatrix, 0.5, 0.5, 0.5);
				textureMatrix = m4.scale(textureMatrix, 0.5, 0.5, 0.5);
				textureMatrix = m4.multiply(textureMatrix, object.shadows.lightProjectionMatrix);
				const lightWorldMatrix = m4.lookAt(
					[object.shadows.lightPosition[0], object.shadows.lightPosition[1], object.shadows.lightPosition[2]],
					[object.shadows.lightTarget[0], object.shadows.lightTarget[1], object.shadows.lightTarget[2]], // target
					[object.shadows.orientation[0], object.shadows.orientation[1], object.shadows.orientation[2]], // up
				);
				textureMatrix = m4.multiply(textureMatrix, m4.inverse(lightWorldMatrix));
				const mat = m4.multiply(lightWorldMatrix, m4.inverse(object.shadows.lightProjectionMatrix));
				world.GL.gl.uniformMatrix4fv(object.shaderProgram.u_textureMatrix, false, textureMatrix);
				world.GL.gl.uniform3fv(object.shaderProgram.lightWorldPositionLocation, object.shadows.lightPosition);
				world.GL.gl.uniformMatrix4fv(object.shaderProgram.u_world, false,
					m4.translate(object.position.worldLocation[0],
						object.position.worldLocation[1],
						object.position.worldLocation[2])
				);
				// world.GL.gl.uniformMatrix4fv(object.shaderProgram.u_world, false, mat);
				world.GL.gl.uniform3fv(object.shaderProgram.u_reverseLightDirection, lightWorldMatrix.slice(8, 11));
				world.GL.gl.uniform1f(object.shaderProgram.u_bias, object.shadows.bias);

			}
			//---------------------------------------------------------------------
			// world.GL.gl.activeTexture(world.GL.gl.TEXTURE0);
			// world.GL.gl.bindTexture(world.GL.gl.TEXTURE_2D, object.FBO.deepTexture);
			// world.GL.gl.uniform1i(object.shaderProgram.samplerUniform, 0);
			// console.log('TEST')
			//-------------------------------------------
			//------------
			for(var t = 0;t < object.textures.length;t++) {
				if(object.custom.gl_texture == null) {
					world.GL.gl.activeTexture(world.GL.gl['TEXTURE' + t]);
					world.GL.gl.bindTexture(world.GL.gl.TEXTURE_2D, object.textures[t]);
					if(world.GL.extTFAnisotropic) {
						world.GL.gl.texParameterf(world.GL.gl.TEXTURE_2D,
							world.GL.extTFAnisotropic.TEXTURE_MAX_ANISOTROPY_EXT,
							world.GL.MAX_TEXTURE_MAX_ANISOTROPY_EXT);
					}
					if(object.texParams.MIPMAP == false) {
						world.GL.gl.texParameteri(world.GL.gl.TEXTURE_2D, world.GL.gl.TEXTURE_WRAP_S, world.GL.gl.REPEAT);
						world.GL.gl.texParameteri(world.GL.gl.TEXTURE_2D, world.GL.gl.TEXTURE_WRAP_T, world.GL.gl.REPEAT);
					}
					else {
						world.GL.gl.texParameteri(world.GL.gl.TEXTURE_2D, world.GL.gl.TEXTURE_MAG_FILTER, object.texParams.TEXTURE_MAG_FILTER | world.GL.gl.LINEAR);
						world.GL.gl.texParameteri(world.GL.gl.TEXTURE_2D, world.GL.gl.TEXTURE_MIN_FILTER, object.texParams.TEXTURE_MIN_FILTER | world.GL.gl.LINEAR);
					}

					if(typeof object.texParams.spriteAnimation != 'undefined' && object.texParams.spriteAnimation != false && object.textures[t].image.width != 0) {
						//char * data; // data of 8-bit per sample RGBA image
						// int w, h; // size of the image
						// int sx, sy, sw, sh; // position and size of area you want to crop.
						//glTexImage2D does support regions - of - interest.You do it as follows:
						world.GL.gl.pixelStorei(world.GL.gl.UNPACK_FLIP_Y_WEBGL, false);
						var [XX, YY] = object.texParams.spriteAnimation.getOffsetXY();
						world.GL.gl.pixelStorei(world.GL.gl.UNPACK_ROW_LENGTH, object.textures[t].image.height);
						world.GL.gl.pixelStorei(world.GL.gl.UNPACK_SKIP_PIXELS,
							XX * (object.textures[t].image.width / object.texParams.spriteAnimation.shema[0]));
						world.GL.gl.pixelStorei(world.GL.gl.UNPACK_SKIP_ROWS,
							YY * (object.textures[t].image.height / object.texParams.spriteAnimation.shema[1]));
						world.GL.gl.pixelStorei(world.GL.gl.UNPACK_ALIGNMENT, 1);
						// LodePNG tightly packs everything
						// glTexImage2D(GL_TEXTURE_2D, level, internalFormat,
						// sw, sh, border, format, type, data);
						world.GL.gl.texImage2D(world.GL.gl.TEXTURE_2D,
							0, world.GL.gl.RGBA,
							object.textures[t].image.width / object.texParams.spriteAnimation.shema[0],
							object.textures[t].image.height / object.texParams.spriteAnimation.shema[1],
							0,
							world.GL.gl.RGBA,
							world.GL.gl.UNSIGNED_BYTE,
							object.textures[t].image);
					}

					if(object.texParams.MIPMAP == true) {
						world.GL.gl.texParameteri(world.GL.gl.TEXTURE_2D, world.GL.gl.TEXTURE_MAG_FILTER, world.GL.gl.NEAREST);
						world.GL.gl.texParameteri(world.GL.gl.TEXTURE_2D, world.GL.gl.TEXTURE_MIN_FILTER, world.GL.gl.LINEAR_MIPMAP_NEAREST);
						world.GL.gl.generateMipmap(world.GL.gl.TEXTURE_2D);
					}

					world.GL.gl.uniform1i(object.shaderProgram.samplerUniform, t);
				} else {
					object.custom.gl_texture(object, t);
				}
			}
		}
		localLooper = localLooper + 1;
	} else {

		if(object.shaderProgram.samplerUniform) {
			world.GL.gl.uniform1i(object.shaderProgram.samplerUniform, 0);
		} else if(object.shaderProgram.uCubeMapSampler) {
			// CUBE MAP
			world.GL.gl.activeTexture(world.GL.gl['TEXTURE0']);
			var gl = world.GL.gl;
			if(!object.tex) object.tex = gl.createTexture();
			gl.bindTexture(gl.TEXTURE_CUBE_MAP, object.tex);
			if(object.cubeMap.type == 'images') {
				object.cubeMap.cubeMap2dCanvasSet.forEach((faceInfo, index) => {
					const level = 0;
					const internalFormat = gl.RGBA;
					const format = gl.RGBA;
					const type = gl.UNSIGNED_BYTE;
					gl.texImage2D(faceInfo.target, level, internalFormat, format, type, object.cubeMap.images[index]);
					gl.pixelStorei(world.GL.gl.UNPACK_FLIP_Y_WEBGL, false);
				});
			} else {
				object.cubeMap.cubeMap2dCanvasSet.forEach((faceInfo, index) => {
					var args = [];
					for(var key in faceInfo) {
						if(key !== 'target') {
							args.push(faceInfo[key]);
						}
					}
					if(object.cubeMap.drawFunc) {
						object.cubeMap.drawFunc(args);
					} else {
						const {faceColor, textColor, text} = faceInfo;
						gen2DTextFace(object.cubeMap.cubeMap2dCtx, faceColor, textColor, text);
					}
					const level = 0;
					const internalFormat = gl.RGBA;
					const format = gl.RGBA;
					const type = gl.UNSIGNED_BYTE;
					gl.texImage2D(faceInfo.target, level, internalFormat, format, type, object.cubeMap.cubeMap2dCtx.canvas);
					gl.pixelStorei(world.GL.gl.UNPACK_FLIP_Y_WEBGL, false);
				});
			}
			gl.generateMipmap(gl.TEXTURE_CUBE_MAP);
			gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);
			world.GL.gl.uniform1i(object.shaderProgram.uCubeMapSampler, 0);
		}
	}

	world.GL.gl.bindBuffer(world.GL.gl.ELEMENT_ARRAY_BUFFER, object.vertexIndexBuffer);
	world.setMatrixUniforms(object, this.pMatrix, object.mvMatrix);

	// Shadows
	if(object.shadows && object.shadows.type == 'spot') {
		// set the light position
		world.GL.gl.uniform3fv(object.shaderProgram.lightWorldPositionLocation, object.shadows.lightPosition);
		world.GL.gl.uniform3fv(object.shaderProgram.viewWorldPositionLocation, object.position.worldLocation);
		world.GL.gl.uniform1f(object.shaderProgram.shininessLocation, object.shadows.shininess);
		// Set the spotlight uniforms
		{
			var target = [0, 0, 0]; // object.position.worldLocation;
			var up = [0, 1, 0];
			var lmat = m4.lookAt(object.shadows.lightPosition, target, up);
			// var lmat = m4.lookAt(object.position.worldLocation, target, up);
			lmat = m4.multiply(m4.xRotation(object.shadows.lightRotationX), lmat);
			lmat = m4.multiply(m4.yRotation(object.shadows.lightRotationY), lmat);
			// get the zAxis from the matrix
			// negate it because lookAt looks down the -Z axis
			object.shadows.lightDirection = [-lmat[8], -lmat[9], -lmat[10]];
			// object.shadows.lightDirection = [-0, -0, -1];
		}

		world.GL.gl.uniform3fv(object.shaderProgram.lightDirectionLocation, object.shadows.lightDirection);
		world.GL.gl.uniform1f(object.shaderProgram.innerLimitLocation, Math.cos(object.shadows.innerLimit));
		world.GL.gl.uniform1f(object.shaderProgram.outerLimitLocation, Math.cos(object.shadows.outerLimit));
	} else if(object.shadows && object.shadows.type == 'spec') {
		// global position
		world.GL.gl.uniform3fv(object.shaderProgram.specularColor, object.shadows.specularDATA);
		world.GL.gl.uniform3fv(object.shaderProgram.uLightPosition, world.uLightPosition);
	} else if(object.shadows && object.shadows.type == 'lens') {
		// Lens
		world.GL.gl.uniform3fv(object.shaderProgram.uLightPosition, world.uLightPosition);
		world.GL.gl.uniform3fv(object.shaderProgram.uControl, object.shadows.uControl);
		world.GL.gl.uniform3fv(object.shaderProgram.uResolution, object.shadows.uResolution);
	}

	if(object.vertexNormalBuffer && object.shaderProgram.nMatrixUniform) {
		var normalMatrix = mat3.create();
		mat3.normalFromMat4(normalMatrix, object.mvMatrix);
		mat3.transpose(normalMatrix, normalMatrix);
		world.GL.gl.uniformMatrix3fv(object.shaderProgram.nMatrixUniform, false, normalMatrix);
	}

	// world.disableUnusedAttr(world.GL.gl, localLooper);
	// FIX FOR MOBILE - from white cube to normal texture view , good
	// world.disableUnusedAttr(world.GL.gl, 4);

	if(object.glBlend.blendEnabled == true) {
		if(!world.GL.gl.isEnabled(world.GL.gl.BLEND)) {
			world.GL.gl.enable(world.GL.gl.BLEND);
		}
		world.GL.gl.blendFunc(world.GL.gl[object.glBlend.blendParamSrc], world.GL.gl[object.glBlend.blendParamDest]);
	} else {
		world.GL.gl.disable(world.GL.gl.BLEND);
		world.GL.gl.enable(world.GL.gl.DEPTH_TEST);
	}

	world.GL.gl.drawElements(world.GL.gl[object.glDrawElements.mode], object.glDrawElements.numberOfIndicesRender, world.GL.gl.UNSIGNED_SHORT, 0);
	object.instancedDraws.overrideDrawArraysInstance(object);

	this.mvPopMatrix(object.mvMatrix, this.mvMatrixStack);
};

App.operation.draws.piramide = function(object, ray) {
	mat4.identity(object.mvMatrix);
	world.mvPushMatrix(object.mvMatrix, this.mvMatrixStack);

	if(App.camera.FirstPersonController == true) {
		camera.setCamera(object);
	} else if(App.camera.SceneController == true) {
		camera.setSceneCamera(object);
	}

	mat4.translate(object.mvMatrix, object.mvMatrix, object.position.worldLocation);
	if(raycaster.checkingProcedureCalc && typeof ray === 'undefined') raycaster.checkingProcedureCalc(object);
	mat4.rotate(object.mvMatrix, object.mvMatrix, degToRad(object.rotation.rx), object.rotation.getRotDirX());
	mat4.rotate(object.mvMatrix, object.mvMatrix, degToRad(object.rotation.ry), object.rotation.getRotDirY());
	mat4.rotate(object.mvMatrix, object.mvMatrix, degToRad(object.rotation.rz), object.rotation.getRotDirZ());

	if(object.geometry.dynamicBuffer == true) {
		world.GL.gl.bindBuffer(world.GL.gl.ARRAY_BUFFER, object.vertexPositionBuffer);
		world.GL.gl.bufferData(world.GL.gl.ARRAY_BUFFER, object.geometry.vertices, world.GL.gl.STATIC_DRAW);
	} else {
		world.GL.gl.bindBuffer(world.GL.gl.ARRAY_BUFFER, object.vertexPositionBuffer);
	}

	world.GL.gl.vertexAttribPointer(object.shaderProgram.vertexPositionAttribute, object.vertexPositionBuffer.itemSize, world.GL.gl.FLOAT, false, 0, 0);

	if(object.vertexColorBuffer) {
		world.GL.gl.bindBuffer(world.GL.gl.ARRAY_BUFFER, object.vertexColorBuffer);
		world.GL.gl.vertexAttribPointer(object.shaderProgram.vertexColorAttribute, object.vertexColorBuffer.itemSize, world.GL.gl.FLOAT, false, 0, 0);
	}

	if(object.glBlend.blendEnabled == true) {
		if(!world.GL.gl.isEnabled(world.GL.gl.BLEND)) {
			// world.GL.gl.disable(world.GL.gl.DEPTH_TEST);
			world.GL.gl.enable(world.GL.gl.BLEND);
		}
		// world.GL.gl.blendColor ( 1,1,1,0.5)
		// world.GL.gl.blendColor( 1.0 , 1.0, 1.0, 0.3 );
		world.GL.gl.blendFunc(world.GL.gl[object.glBlend.blendParamSrc], world.GL.gl[object.glBlend.blendParamDest]);
	} else {
		world.GL.gl.disable(world.GL.gl.BLEND);
		world.GL.gl.enable(world.GL.gl.DEPTH_TEST);
	}

	world.setMatrixUniforms(object, this.pMatrix, object.mvMatrix);
	world.GL.gl.drawArrays(world.GL.gl[object.glDrawElements.mode], 0, object.vertexPositionBuffer.numItems);
	object.instancedDraws.overrideDrawArraysInstance(object);

	this.mvPopMatrix(object.mvMatrix, this.mvMatrixStack);
};

App.operation.draws.square = function(object, ray) {
	mat4.identity(object.mvMatrix);
	world.mvPushMatrix(object.mvMatrix, world.mvMatrixStack);

	if(App.camera.FirstPersonController == true) {
		camera.setCamera(object);
	} else if(App.camera.SceneController == true) {
		camera.setSceneCamera(object);
	}

	mat4.translate(object.mvMatrix, object.mvMatrix, object.position.worldLocation);
	if(raycaster.checkingProcedureCalc && typeof ray === 'undefined') raycaster.checkingProcedureCalc(object);
	mat4.rotate(object.mvMatrix, object.mvMatrix, degToRad(object.rotation.rx), object.rotation.getRotDirX());
	mat4.rotate(object.mvMatrix, object.mvMatrix, degToRad(object.rotation.ry), object.rotation.getRotDirY());
	mat4.rotate(object.mvMatrix, object.mvMatrix, degToRad(object.rotation.rz), object.rotation.getRotDirZ());

	if(object.geometry.dynamicBuffer == true) {
		world.GL.gl.bindBuffer(world.GL.gl.ARRAY_BUFFER, object.vertexPositionBuffer);
		world.GL.gl.bufferData(world.GL.gl.ARRAY_BUFFER, object.geometry.vertices, world.GL.gl.STATIC_DRAW);
	} else {
		world.GL.gl.bindBuffer(world.GL.gl.ARRAY_BUFFER, object.vertexPositionBuffer);
	}
	world.GL.gl.vertexAttribPointer(object.shaderProgram.vertexPositionAttribute, object.vertexPositionBuffer.itemSize, world.GL.gl.FLOAT, false, 0, 0);

	if(object.vertexColorBuffer) {
		world.GL.gl.bindBuffer(world.GL.gl.ARRAY_BUFFER, object.vertexColorBuffer);
		world.GL.gl.vertexAttribPointer(object.shaderProgram.vertexColorAttribute, object.vertexColorBuffer.itemSize, world.GL.gl.FLOAT, false, 0, 0);
	}

	if(object.glBlend.blendEnabled == true) {
		if(!world.GL.gl.isEnabled(world.GL.gl.BLEND)) {
			world.GL.gl.enable(world.GL.gl.BLEND);
		}
		// world.GL.gl.blendColor( 1.0 , 1.0, 1.0, 0.3 );
		world.GL.gl.blendFunc(world.GL.gl[object.glBlend.blendParamSrc], world.GL.gl[object.glBlend.blendParamDest]);
	} else {
		world.GL.gl.disable(world.GL.gl.BLEND);
		world.GL.gl.enable(world.GL.gl.DEPTH_TEST);
	}

	world.setMatrixUniforms(object, this.pMatrix, object.mvMatrix);
	world.GL.gl.drawArrays(world.GL.gl[object.glDrawElements.mode], 0, object.vertexPositionBuffer.numItems);
	object.instancedDraws.overrideDrawArraysInstance(object);

	this.mvPopMatrix(object.mvMatrix, this.mvMatrixStack);
};

App.operation.draws.triangle = function(object, ray) {
	mat4.identity(object.mvMatrix);
	world.mvPushMatrix(object.mvMatrix, this.mvMatrixStack);

	if(App.camera.FirstPersonController == true) {
		camera.setCamera(object);
	} else if(App.camera.SceneController == true) {
		camera.setSceneCamera(object);
	}

	mat4.translate(object.mvMatrix, object.mvMatrix, object.position.worldLocation);
	if(raycaster.checkingProcedureCalc && typeof ray === 'undefined') raycaster.checkingProcedureCalc(object);
	mat4.rotate(object.mvMatrix, object.mvMatrix, degToRad(object.rotation.rx), object.rotation.getRotDirX());
	mat4.rotate(object.mvMatrix, object.mvMatrix, degToRad(object.rotation.ry), object.rotation.getRotDirY());
	mat4.rotate(object.mvMatrix, object.mvMatrix, degToRad(object.rotation.rz), object.rotation.getRotDirZ());

	world.GL.gl.bindBuffer(world.GL.gl.ARRAY_BUFFER, object.vertexPositionBuffer);
	world.GL.gl.vertexAttribPointer(object.shaderProgram.vertexPositionAttribute, object.vertexPositionBuffer.itemSize, world.GL.gl.FLOAT, false, 0, 0);

	if(object.geometry.dynamicBuffer == true) {
		world.GL.gl.bufferData(world.GL.gl.ARRAY_BUFFER, object.geometry.vertices, world.GL.gl.STATIC_DRAW);
	}

	world.GL.gl.bindBuffer(world.GL.gl.ARRAY_BUFFER, object.vertexColorBuffer);
	world.GL.gl.vertexAttribPointer(object.shaderProgram.vertexColorAttribute, object.vertexColorBuffer.itemSize, world.GL.gl.FLOAT, false, 0, 0);

	if(object.glBlend.blendEnabled == true) {
		if(!world.GL.gl.isEnabled(world.GL.gl.BLEND)) {
			// world.GL.gl.disable(world.GL.gl.DEPTH_TEST);
			world.GL.gl.enable(world.GL.gl.BLEND);
		}
		// world.GL.gl.blendColor( 1.0 , 1.0, 1.0, 0.3 );
		world.GL.gl.blendFunc(world.GL.gl[object.glBlend.blendParamSrc], world.GL.gl[object.glBlend.blendParamDest]);
	} else {
		world.GL.gl.disable(world.GL.gl.BLEND);
		world.GL.gl.enable(world.GL.gl.DEPTH_TEST);
	}

	this.setMatrixUniforms(object, this.pMatrix, object.mvMatrix);
	world.GL.gl.drawArrays(world.GL.gl[object.glDrawElements.mode], 0, object.vertexPositionBuffer.numItems);
	object.instancedDraws.overrideDrawArraysInstance(object);

	this.mvPopMatrix(object.mvMatrix, this.mvMatrixStack);
};

App.operation.draws.drawObj = function(object, ray) {
	var lighting = 1;
	var localLooper = 0;
	lighting = true;

	mat4.identity(object.mvMatrix);
	world.mvPushMatrix(object.mvMatrix, this.mvMatrixStack);

	if(object.physics.enabled == true &&
		object.rotation.axisSystem) {

		if(App.camera.FirstPersonController == true) {
			camera.setCamera(object)
		} else if(App.camera.SceneController == true) {
			camera.setSceneCamera(object)
		}
		var QP = object.physics.currentBody.quaternion;
		QP.normalize()
		mat4.translate(object.mvMatrix, object.mvMatrix, object.position.worldLocation);
		if(raycaster.checkingProcedureCalcObj && typeof ray === 'undefined') raycaster.checkingProcedureCalcObj(object);
		var t = vec3.fromValues(object.rotation.axis.x, object.rotation.axis.z, object.rotation.axis.y);
		object.rotation.axisSystem[0].normalize()
		// TEST - Yes ultimate - MAybe even cube will be better
		var AXIS = vec3.fromValues(
			-parseFloat(object.rotation.axisSystem[0].x.toFixed(2)),
			-parseFloat(object.rotation.axisSystem[0].z.toFixed(2)),
			-parseFloat(object.rotation.axisSystem[0].y.toFixed(2)))
		var MY_ANGLE = (2 * Math.acos(QP.w))
		mat4.rotate(object.mvMatrix, object.mvMatrix, MY_ANGLE, AXIS);

	} else if(object.isHUD === true) {

		mat4.translate(object.mvMatrix, object.mvMatrix, object.position.worldLocation);
		mat4.rotate(object.mvMatrix, object.mvMatrix, degToRad(object.rotation.rx), object.rotation.getRotDirX());
		mat4.rotate(object.mvMatrix, object.mvMatrix, degToRad(object.rotation.ry), object.rotation.getRotDirY());
		mat4.rotate(object.mvMatrix, object.mvMatrix, degToRad(object.rotation.rz), object.rotation.getRotDirZ());
		if(raycaster.checkingProcedureCalcObj) raycaster.checkingProcedureCalcObj(object);

	} else {

		if(App.camera.FirstPersonController == true) {
			camera.setCamera(object)
		} else if(App.camera.SceneController == true) {
			camera.setSceneCamera(object)
		}

		mat4.translate(object.mvMatrix, object.mvMatrix, object.position.worldLocation);
		if(raycaster.checkingProcedureCalcObj && typeof ray === 'undefined') raycaster.checkingProcedureCalcObj(object);

		mat4.rotate(object.mvMatrix, object.mvMatrix, degToRad(object.rotation.rx), object.rotation.getRotDirX());
		mat4.rotate(object.mvMatrix, object.mvMatrix, degToRad(object.rotation.ry), object.rotation.getRotDirY());
		mat4.rotate(object.mvMatrix, object.mvMatrix, degToRad(object.rotation.rz), object.rotation.getRotDirZ());
	}

	if(typeof object.mesh.vertexBuffer != 'undefined') {
		if(object.animation != null) {
			object.animation.currentDraws++;
			if(typeof object.animation.anims === 'undefined' && object.animation.currentDraws > object.animation.speed) {
				object.animation.currentAni++;
				object.animation.currentDraws = 0;
				if(object.animation.currentAni > object.animation.sumOfAniFrames) {
					object.animation.currentAni = 0;
				}
			}

			// Make animation sequences -> sub animation
			if(typeof object.animation.anims !== 'undefined') {
				if(object.animation.currentDraws > object.animation.anims[object.animation.anims.active].speed) {
					object.animation.currentAni++;
					object.animation.currentDraws = 0;
					if(object.animation.currentAni > object.animation.anims[object.animation.anims.active].to - 1) {
						object.animation.currentAni = object.animation.anims[object.animation.anims.active].from;
					}
				}
			}

			if(object.animation.currentAni == 0) {
				world.GL.gl.bindBuffer(world.GL.gl.ARRAY_BUFFER, object.meshList[object.animation.id].vertexBuffer);
				world.GL.gl.vertexAttribPointer(object.shaderProgram.vertexPositionAttribute, object.meshList[object.animation.id].vertexBuffer.itemSize, world.GL.gl.FLOAT, false, 0, 0);
			} else {
				world.GL.gl.bindBuffer(world.GL.gl.ARRAY_BUFFER, object.meshList[object.animation.id + object.animation.currentAni].vertexBuffer);
				world.GL.gl.vertexAttribPointer(
					object.shaderProgram.vertexPositionAttribute,
					object.meshList[object.animation.id + object.animation.currentAni].vertexBuffer.itemSize,
					world.GL.gl.FLOAT,
					false,
					0,
					0
				);
			}

		} else {
			// now to render the mesh test
			world.GL.gl.bindBuffer(world.GL.gl.ARRAY_BUFFER, object.mesh.vertexBuffer);
			world.GL.gl.bufferData(world.GL.gl.ARRAY_BUFFER, new Float32Array(object.mesh.vertices), world.GL.gl.STATIC_DRAW);
			world.GL.gl.vertexAttribPointer(object.shaderProgram.vertexPositionAttribute, object.mesh.vertexBuffer.itemSize, world.GL.gl.FLOAT, false, 0, 0);
			world.GL.gl.enableVertexAttribArray(object.shaderProgram.vertexPositionAttribute);
			// console.log(".vertices.." + world.GL.gl.getBufferParameter(world.GL.gl.ARRAY_BUFFER, world.GL.gl.BUFFER_SIZE))
		}
	}

	// COLOR BUFFER
	// if (object.vertexColorBuffer) {
	//     world.GL.gl.bindBuffer( world.GL.gl.ARRAY_BUFFER, object.vertexColorBuffer);
	//     world.GL.gl.vertexAttribPointer(object.shaderProgram.vertexColorAttribute, object.vertexColorBuffer.itemSize,  world.GL.gl.FLOAT, false, 0, 0);
	//     world.GL.gl.enableVertexAttribArray(object.shaderProgram.vertexColorAttribute);
	//     localLooper = localLooper + 1;
	//   }

	//LIGHT STAFF
	if(lighting && object.shaderProgram.useLightingUniform) {
		world.GL.gl.uniform1i(object.shaderProgram.useLightingUniform, lighting);
		/* Set the normals */
		if(object.mesh.normalBuffer) {
			world.GL.gl.bindBuffer(world.GL.gl.ARRAY_BUFFER, object.mesh.normalBuffer);
			world.GL.gl.vertexAttribPointer(object.shaderProgram.vertexNormalAttribute, object.mesh.normalBuffer.itemSize, world.GL.gl.FLOAT, false, 0, 0);
			world.GL.gl.enableVertexAttribArray(object.shaderProgram.vertexNormalAttribute);
			localLooper = localLooper + 1;

		}
		/* Set the ambient light                 */
		if(object.shaderProgram.ambientColorUniform) {
			if(E('ambLight') && E('ambLight').color) {
				world.GL.gl.uniform3f(object.shaderProgram.ambientColorUniform, parseFloat(E('ambLight').color.rgb[0]), parseFloat(E('ambLight').color.rgb[1]), parseFloat(E('ambLight').color.rgb[2]));
			} else {
				world.GL.gl.uniform3f(object.shaderProgram.ambientColorUniform, object.LightsData.ambientLight.R(), object.LightsData.ambientLight.G(), object.LightsData.ambientLight.B());
			}
		}
		/* Directional light */
		if(object.shaderProgram.directionalColorUniform) {
			if(E('dirLight') && E('dirLight').color) {
				world.GL.gl.uniform3f(object.shaderProgram.directionalColorUniform, parseFloat(E('dirLight').color.rgb[0]), parseFloat(E('dirLight').color.rgb[1]), parseFloat(E('dirLight').color.rgb[2]));
			} else {
				world.GL.gl.uniform3f(object.shaderProgram.directionalColorUniform, object.LightsData.directionLight.R(), object.LightsData.directionLight.G(), object.LightsData.directionLight.B());
			}
		}

		/* Normalize the direction */
		var lightingDirection = null;
		if(object.shaderProgram.lightingDirectionUniform) {
			if(E('dirX') && E('dirY') && E('dirZ')) {
				lightingDirection = [parseFloat(E('dirX').value), parseFloat(E('dirY').value), parseFloat(E('dirZ').value)];
			} else {
				lightingDirection = [object.LightsData.lightingDirection.r, object.LightsData.lightingDirection.g, object.LightsData.lightingDirection.b];
			}

			var adjustedLD = vec3.create();
			vec3.normalize(adjustedLD, lightingDirection);
			vec3.scale(adjustedLD, adjustedLD, -1);
			world.GL.gl.uniform3fv(object.shaderProgram.lightingDirectionUniform, adjustedLD);
		}
	} else {
		if(object.shaderProgram.useLightingUniform) {
			if(object.shaderProgram.ambientColorUniform) {
				world.GL.gl.uniform3f(object.shaderProgram.ambientColorUniform, parseFloat(1), parseFloat(2), parseFloat(0));
			}
			if(object.shaderProgram.directionalColorUniform) {
				world.GL.gl.uniform3f(object.shaderProgram.directionalColorUniform, parseFloat(1), parseFloat(1), parseFloat(0));
			}
		}
	}

	// it's possible that the mesh doesn't contain any texture coordinates
	// in this case, the texture vertexAttribArray will need to be disabled
	// before the call to drawElements
	if(!object.mesh.textures.length && !object.texture) {
		//  world.GL.gl.disableVertexAttribArray(object.shaderProgram.textureCoordAttribute);
	} else {
		// if the texture vertexAttribArray has been previously
		// disabled, then it needs to be re-enabled
		if(object.texture) {
			world.GL.gl.bindBuffer(world.GL.gl.ARRAY_BUFFER, object.mesh.textureBuffer);
			world.GL.gl.vertexAttribPointer(object.shaderProgram.textureCoordAttribute, object.mesh.textureBuffer.itemSize, world.GL.gl.FLOAT, false, 0, 0);
			world.GL.gl.enableVertexAttribArray(object.shaderProgram.textureCoordAttribute);
			// console.log(".tex.." + world.GL.gl.getBufferParameter(world.GL.gl.ARRAY_BUFFER, world.GL.gl.BUFFER_SIZE))

			if(object.streamTextures != null) {
				// video/webcam tex
				if(object.streamTextures.video) {
					// App.tools.loadVideoTexture('glVideoTexture', object.streamTextures.videoImage);
					App.tools.loadVideoTexture('glVideoTexture', object.streamTextures.video);
				} else {
					App.tools.loadVideoTexture('glVideoTexture', object.streamTextures.videoImage);
				}
				world.GL.gl.uniform1i(object.shaderProgram.samplerUniform, 0);
			} else if(object.FBO) {

				if(object.shadows && object.shadows.type == "spot-shadow") {
					// --------------------------------------------------------------------
					let textureMatrix = m4.identity();
					textureMatrix = m4.translate(textureMatrix, 0.5, 0.5, 0.5);
					textureMatrix = m4.scale(textureMatrix, 0.5, 0.5, 0.5);
					textureMatrix = m4.multiply(textureMatrix, object.shadows.lightProjectionMatrix);
					const lightWorldMatrix = m4.lookAt(
						[object.shadows.lightPosition[0], object.shadows.lightPosition[1], object.shadows.lightPosition[2]],
						[object.shadows.lightTarget[0], object.shadows.lightTarget[1], object.shadows.lightTarget[2]], // target
						[object.shadows.orientation[0], object.shadows.orientation[1], object.shadows.orientation[2]], // up
					);
					textureMatrix = m4.multiply(textureMatrix, m4.inverse(lightWorldMatrix));
					const mat = m4.multiply(lightWorldMatrix, m4.inverse(object.shadows.lightProjectionMatrix));
					world.GL.gl.uniformMatrix4fv(object.shaderProgram.u_textureMatrix, false, textureMatrix);
					world.GL.gl.uniform3fv(object.shaderProgram.lightWorldPositionLocation, object.shadows.lightPosition);
					world.GL.gl.uniformMatrix4fv(object.shaderProgram.u_world, false,
						m4.translate(object.position.worldLocation[0],
							object.position.worldLocation[1],
							object.position.worldLocation[2])
					);
					// world.GL.gl.uniformMatrix4fv(object.shaderProgram.u_world, false, mat);
					world.GL.gl.uniform3fv(object.shaderProgram.u_reverseLightDirection, lightWorldMatrix.slice(8, 11));
					world.GL.gl.uniform1f(object.shaderProgram.u_bias, object.shadows.bias);
					//---------------------------------------------------------------------
					world.GL.gl.activeTexture(world.GL.gl.TEXTURE0);
					world.GL.gl.bindTexture(world.GL.gl.TEXTURE_2D, object.FBO.deepTexture);
					world.GL.gl.uniform1i(object.shaderProgram.samplerUniform, 0);
					//-------------------------------------------
					var t_index0 = 0;
					for(var t = 1;t < object.textures.length;t++) {
						if(object.custom.gl_texture == null) {
							world.GL.gl.activeTexture(world.GL.gl['TEXTURE' + t]);
							world.GL.gl.bindTexture(world.GL.gl.TEXTURE_2D, object.textures[t_index0]);
							if(world.GL.extTFAnisotropic) {
								world.GL.gl.texParameterf(world.GL.gl.TEXTURE_2D,
									world.GL.extTFAnisotropic.TEXTURE_MAX_ANISOTROPY_EXT,
									world.GL.MAX_TEXTURE_MAX_ANISOTROPY_EXT);
							}
							if(object.texParams.MIPMAP == false) {
								world.GL.gl.texParameteri(world.GL.gl.TEXTURE_2D, world.GL.gl.TEXTURE_WRAP_S, world.GL.gl.REPEAT);
								world.GL.gl.texParameteri(world.GL.gl.TEXTURE_2D, world.GL.gl.TEXTURE_WRAP_T, world.GL.gl.REPEAT);
							}
							else {
								world.GL.gl.texParameteri(world.GL.gl.TEXTURE_2D, world.GL.gl.TEXTURE_MAG_FILTER, object.texParams.TEXTURE_MAG_FILTER | world.GL.gl.LINEAR);
								world.GL.gl.texParameteri(world.GL.gl.TEXTURE_2D, world.GL.gl.TEXTURE_MIN_FILTER, object.texParams.TEXTURE_MIN_FILTER | world.GL.gl.LINEAR);
							}

							if(typeof object.texParams.spriteAnimation != 'undefined' && object.texParams.spriteAnimation != false && object.textures[t].image.width != 0) {
								//char * data; // data of 8-bit per sample RGBA image
								// int w, h; // size of the image
								// int sx, sy, sw, sh; // position and size of area you want to crop.
								//glTexImage2D does support regions - of - interest.You do it as follows:
								world.GL.gl.pixelStorei(world.GL.gl.UNPACK_FLIP_Y_WEBGL, false);
								var [XX, YY] = object.texParams.spriteAnimation.getOffsetXY();
								world.GL.gl.pixelStorei(world.GL.gl.UNPACK_ROW_LENGTH, object.textures[t].image.height);
								world.GL.gl.pixelStorei(world.GL.gl.UNPACK_SKIP_PIXELS,
									XX * (object.textures[t].image.width / object.texParams.spriteAnimation.shema[0]));
								world.GL.gl.pixelStorei(world.GL.gl.UNPACK_SKIP_ROWS,
									YY * (object.textures[t].image.height / object.texParams.spriteAnimation.shema[1]));
								world.GL.gl.pixelStorei(world.GL.gl.UNPACK_ALIGNMENT, 1);
								// LodePNG tightly packs everything
								// glTexImage2D(GL_TEXTURE_2D, level, internalFormat,
								// sw, sh, border, format, type, data);
								world.GL.gl.texImage2D(world.GL.gl.TEXTURE_2D,
									0, world.GL.gl.RGBA,
									object.textures[t].image.width / object.texParams.spriteAnimation.shema[0],
									object.textures[t].image.height / object.texParams.spriteAnimation.shema[1],
									0,
									world.GL.gl.RGBA,
									world.GL.gl.UNSIGNED_BYTE,
									object.textures[t].image);
							}

							if(object.texParams.MIPMAP == true) {
								world.GL.gl.texParameteri(world.GL.gl.TEXTURE_2D, world.GL.gl.TEXTURE_MAG_FILTER, world.GL.gl.NEAREST);
								world.GL.gl.texParameteri(world.GL.gl.TEXTURE_2D, world.GL.gl.TEXTURE_MIN_FILTER, world.GL.gl.LINEAR_MIPMAP_NEAREST);
								world.GL.gl.generateMipmap(world.GL.gl.TEXTURE_2D);
							}

							world.GL.gl.uniform1i(object.shaderProgram.samplerUniform, t);
							world.GL.gl.uniform1i(object.shaderProgram.u_projectedTexture, t);
						} else {
							object.custom.gl_texture(object, t);
						}
					}
					// world.GL.gl.uniform1i(object.shaderProgram.samplerUniform, 1);
				} else {
					world.GL.gl.activeTexture(world.GL.gl.TEXTURE0);
					world.GL.gl.bindTexture(world.GL.gl.TEXTURE_2D, object.FBO.deepTexture);
					world.GL.gl.uniform1i(object.shaderProgram.samplerUniform, 0);
				}

			} else {
				//------------
				if(object.shadows && object.shadows.type == "spot-shadow") {
					// --------------------------------------------------------------------
					let textureMatrix = m4.identity();
					textureMatrix = m4.translate(textureMatrix, 0.5, 0.5, 0.5);
					textureMatrix = m4.scale(textureMatrix, 0.5, 0.5, 0.5);
					textureMatrix = m4.multiply(textureMatrix, object.shadows.lightProjectionMatrix);
					const lightWorldMatrix = m4.lookAt(
						[object.shadows.lightPosition[0], object.shadows.lightPosition[1], object.shadows.lightPosition[2]],
						[object.shadows.lightTarget[0], object.shadows.lightTarget[1], object.shadows.lightTarget[2]], // target
						[object.shadows.orientation[0], object.shadows.orientation[1], object.shadows.orientation[2]], // up
					);
					textureMatrix = m4.multiply(textureMatrix, m4.inverse(lightWorldMatrix));
					const mat = m4.multiply(lightWorldMatrix, m4.inverse(object.shadows.lightProjectionMatrix));
					world.GL.gl.uniformMatrix4fv(object.shaderProgram.u_textureMatrix, false, textureMatrix);
					world.GL.gl.uniform3fv(object.shaderProgram.lightWorldPositionLocation, object.shadows.lightPosition);
					world.GL.gl.uniformMatrix4fv(object.shaderProgram.u_world, false,
						m4.translate(object.position.worldLocation[0],
							object.position.worldLocation[1],
							object.position.worldLocation[2])
					);
					// world.GL.gl.uniformMatrix4fv(object.shaderProgram.u_world, false, mat);
					world.GL.gl.uniform3fv(object.shaderProgram.u_reverseLightDirection, lightWorldMatrix.slice(8, 11));
					world.GL.gl.uniform1f(object.shaderProgram.u_bias, object.shadows.bias);

				}
				//------------ FROM CUBE
				for(var t = 0;t < object.textures.length;t++) {
					if(object.custom.gl_texture == null) {
						world.GL.gl.activeTexture(world.GL.gl['TEXTURE' + t]);
						world.GL.gl.bindTexture(world.GL.gl.TEXTURE_2D, object.textures[t]);
						if(world.GL.extTFAnisotropic) {
							world.GL.gl.texParameterf(world.GL.gl.TEXTURE_2D,
								world.GL.extTFAnisotropic.TEXTURE_MAX_ANISOTROPY_EXT,
								world.GL.MAX_TEXTURE_MAX_ANISOTROPY_EXT);
						}
						if(object.texParams.MIPMAP == false) {
							world.GL.gl.texParameteri(world.GL.gl.TEXTURE_2D, world.GL.gl.TEXTURE_WRAP_S, world.GL.gl.REPEAT);
							world.GL.gl.texParameteri(world.GL.gl.TEXTURE_2D, world.GL.gl.TEXTURE_WRAP_T, world.GL.gl.REPEAT);
						}
						else {
							world.GL.gl.texParameteri(world.GL.gl.TEXTURE_2D, world.GL.gl.TEXTURE_MAG_FILTER, object.texParams.TEXTURE_MAG_FILTER | world.GL.gl.LINEAR);
							world.GL.gl.texParameteri(world.GL.gl.TEXTURE_2D, world.GL.gl.TEXTURE_MIN_FILTER, object.texParams.TEXTURE_MIN_FILTER | world.GL.gl.LINEAR);
						}

						if(typeof object.texParams.spriteAnimation != 'undefined' && object.texParams.spriteAnimation != false && object.textures[t].image.width != 0) {
							//char * data; // data of 8-bit per sample RGBA image
							// int w, h; // size of the image
							// int sx, sy, sw, sh; // position and size of area you want to crop.
							//glTexImage2D does support regions - of - interest.You do it as follows:
							world.GL.gl.pixelStorei(world.GL.gl.UNPACK_FLIP_Y_WEBGL, false);
							var [XX, YY] = object.texParams.spriteAnimation.getOffsetXY();
							world.GL.gl.pixelStorei(world.GL.gl.UNPACK_ROW_LENGTH, object.textures[t].image.height);
							world.GL.gl.pixelStorei(world.GL.gl.UNPACK_SKIP_PIXELS,
								XX * (object.textures[t].image.width / object.texParams.spriteAnimation.shema[0]));
							world.GL.gl.pixelStorei(world.GL.gl.UNPACK_SKIP_ROWS,
								YY * (object.textures[t].image.height / object.texParams.spriteAnimation.shema[1]));
							world.GL.gl.pixelStorei(world.GL.gl.UNPACK_ALIGNMENT, 1);
							// LodePNG tightly packs everything
							// glTexImage2D(GL_TEXTURE_2D, level, internalFormat,
							// sw, sh, border, format, type, data);
							world.GL.gl.texImage2D(world.GL.gl.TEXTURE_2D,
								0, world.GL.gl.RGBA,
								object.textures[t].image.width / object.texParams.spriteAnimation.shema[0],
								object.textures[t].image.height / object.texParams.spriteAnimation.shema[1],
								0,
								world.GL.gl.RGBA,
								world.GL.gl.UNSIGNED_BYTE,
								object.textures[t].image);
						}

						if(object.texParams.MIPMAP == true) {
							world.GL.gl.texParameteri(world.GL.gl.TEXTURE_2D, world.GL.gl.TEXTURE_MAG_FILTER, world.GL.gl.NEAREST);
							world.GL.gl.texParameteri(world.GL.gl.TEXTURE_2D, world.GL.gl.TEXTURE_MIN_FILTER, world.GL.gl.LINEAR_MIPMAP_NEAREST);
							world.GL.gl.generateMipmap(world.GL.gl.TEXTURE_2D);
						}

						world.GL.gl.uniform1i(object.shaderProgram.samplerUniform, t);
					} else {
						object.custom.gl_texture(object, t);
					}
				}
			}

			localLooper = localLooper + 1;
		} else {
			// world.GL.gl.disableVertexAttribArray(object.shaderProgram.textureCoordAttribute);
		}
	}

	if(object.mesh.normalBuffer && object.shaderProgram.nMatrixUniform) {
		var normalMatrix = mat3.create();
		mat3.normalFromMat4(normalMatrix, object.mvMatrix);
		mat3.transpose(normalMatrix, normalMatrix);
		world.GL.gl.uniformMatrix3fv(object.shaderProgram.nMatrixUniform, false, normalMatrix);
	}

	world.GL.gl.bindBuffer(world.GL.gl.ELEMENT_ARRAY_BUFFER, object.mesh.indexBuffer);
	this.setMatrixUniforms(object, this.pMatrix, object.mvMatrix);

	// Shadows
	if(object.shadows && object.shadows.type == 'spot' ||
		object.shadows && object.shadows.type == 'spot-shadow') {
		// set the light position
		world.GL.gl.uniform3fv(object.shaderProgram.lightWorldPositionLocation, object.shadows.lightPosition);
		world.GL.gl.uniform3fv(object.shaderProgram.viewWorldPositionLocation, object.shadows.lightPosition);
		world.GL.gl.uniform1f(object.shaderProgram.shininessLocation, object.shadows.shininess);
		// Set the spotlight uniforms
		{
			var target = [0, 0, 0]; // object.position.worldLocation;
			var up = [0, 1, 0];
			var lmat = m4.lookAt(object.shadows.lightPosition, target, up);
			// var lmat = m4.lookAt(object.position.worldLocation, target, up);
			lmat = m4.multiply(m4.xRotation(object.shadows.lightRotationX), lmat);
			lmat = m4.multiply(m4.yRotation(object.shadows.lightRotationY), lmat);
			// get the zAxis from the matrix
			// negate it because lookAt looks down the -Z axis
			object.shadows.lightDirection = [-lmat[8], -lmat[9], -lmat[10]];
			// object.shadows.lightDirection = [-0, -0, -1];
		}

		world.GL.gl.uniform3fv(object.shaderProgram.lightDirectionLocation, object.shadows.lightDirection);
		world.GL.gl.uniform1f(object.shaderProgram.innerLimitLocation, Math.cos(object.shadows.innerLimit));
		world.GL.gl.uniform1f(object.shaderProgram.outerLimitLocation, Math.cos(object.shadows.outerLimit));
	} else if(object.shadows && object.shadows.type == 'spec') {
		// global position
		world.GL.gl.uniform3fv(object.shaderProgram.specularColor, object.shadows.specularDATA);
		world.GL.gl.uniform3fv(object.shaderProgram.uLightPosition, world.uLightPosition);
	} else if(object.shadows && object.shadows.type == 'lens') {
		// Lens
		world.GL.gl.uniform3fv(object.shaderProgram.uLightPosition, world.uLightPosition);
		world.GL.gl.uniform3fv(object.shaderProgram.uControl, object.shadows.uControl);
		world.GL.gl.uniform3fv(object.shaderProgram.uResolution, object.shadows.uResolution);
	}

	if(object.glBlend.blendEnabled == true) {
		if(!world.GL.gl.isEnabled(world.GL.gl.BLEND)) {
			world.GL.gl.enable(world.GL.gl.BLEND);
		}
		world.GL.gl.blendFunc(world.GL.gl[object.glBlend.blendParamSrc], world.GL.gl[object.glBlend.blendParamDest]);
	} else {
		world.GL.gl.disable(world.GL.gl.BLEND);
		world.GL.gl.enable(world.GL.gl.DEPTH_TEST);
	}

	// world.disableUnusedAttr(world.GL.gl, 4);
	world.GL.gl.drawElements(world.GL.gl[object.glDrawElements.mode], object.glDrawElements.numberOfIndicesRender, world.GL.gl.UNSIGNED_SHORT, 0);
	object.instancedDraws.overrideDrawArraysInstance(object);
	this.mvPopMatrix(object.mvMatrix, this.mvMatrixStack);
};

App.operation.draws.drawSquareTex = function(object, ray) {
	var lighting = true;
	var localLooper = 0;

	mat4.identity(object.mvMatrix);
	this.mvPushMatrix(object.mvMatrix, this.mvMatrixStack);

	if(object.isHUD === true) {

		mat4.translate(object.mvMatrix, object.mvMatrix, object.position.worldLocation);

		mat4.rotate(object.mvMatrix, object.mvMatrix, degToRad(object.rotation.rx), object.rotation.getRotDirX());
		mat4.rotate(object.mvMatrix, object.mvMatrix, degToRad(object.rotation.ry), object.rotation.getRotDirY());
		mat4.rotate(object.mvMatrix, object.mvMatrix, degToRad(object.rotation.rz), object.rotation.getRotDirZ());

		if(raycaster.checkingProcedureCalc && typeof ray === 'undefined') raycaster.checkingProcedureCalc(object);

	} else {

		if(App.camera.FirstPersonController == true) {
			camera.setCamera(object);
		} else if(App.camera.SceneController == true) {
			camera.setSceneCamera(object);
		}

		mat4.translate(object.mvMatrix, object.mvMatrix, object.position.worldLocation);
		if(raycaster.checkingProcedureCalc) raycaster.checkingProcedureCalc(object);
		mat4.rotate(object.mvMatrix, object.mvMatrix, degToRad(object.rotation.rz), object.rotation.getRotDirZ());
		mat4.rotate(object.mvMatrix, object.mvMatrix, degToRad(object.rotation.rx), object.rotation.getRotDirX());
		mat4.rotate(object.mvMatrix, object.mvMatrix, degToRad(object.rotation.ry), object.rotation.getRotDirY());
	}

	// V
	if(object.vertexPositionBuffer) {
		world.GL.gl.bindBuffer(world.GL.gl.ARRAY_BUFFER, object.vertexPositionBuffer);

		if(object.geometry.dynamicBuffer == true) {
			world.GL.gl.bufferData(world.GL.gl.ARRAY_BUFFER, object.geometry.vertices, world.GL.gl.STATIC_DRAW);
		}

		world.GL.gl.vertexAttribPointer(object.shaderProgram.vertexPositionAttribute, object.vertexPositionBuffer.itemSize, world.GL.gl.FLOAT, false, 0, 0);
		world.GL.gl.enableVertexAttribArray(object.shaderProgram.vertexPositionAttribute);
		localLooper = localLooper + 1;
	}

	// C
	if(object.vertexColorBuffer) {
		world.GL.gl.bindBuffer(world.GL.gl.ARRAY_BUFFER, object.vertexColorBuffer);
		world.GL.gl.vertexAttribPointer(object.shaderProgram.vertexColorAttribute, object.vertexColorBuffer.itemSize, world.GL.gl.FLOAT, false, 0, 0);
		world.GL.gl.enableVertexAttribArray(object.shaderProgram.vertexColorAttribute);
		localLooper = localLooper + 1;
	}

	// L
	if(lighting && object.shaderProgram.useLightingUniform) {
		world.GL.gl.uniform1i(object.shaderProgram.useLightingUniform, lighting);
		/* Set the normals */
		if(object.vertexNormalBuffer) {
			world.GL.gl.bindBuffer(world.GL.gl.ARRAY_BUFFER, object.vertexNormalBuffer);
			world.GL.gl.vertexAttribPointer(object.shaderProgram.vertexNormalAttribute, object.vertexNormalBuffer.itemSize, world.GL.gl.FLOAT, false, 0, 0);
			world.GL.gl.enableVertexAttribArray(object.shaderProgram.vertexNormalAttribute);
			localLooper = localLooper + 1;
		}

		/* Ambient light - posible deplaced */
		if(object.shaderProgram.ambientColorUniform) {
			if(E('ambLight') && E('ambLight').color) {
				world.GL.gl.uniform3f(object.shaderProgram.ambientColorUniform, parseFloat(E('ambLight').color.rgb[0]), parseFloat(E('ambLight').color.rgb[1]), parseFloat(E('ambLight').color.rgb[2]));
			} else {
				world.GL.gl.uniform3f(object.shaderProgram.ambientColorUniform, object.LightsData.ambientLight.r, object.LightsData.ambientLight.g, object.LightsData.ambientLight.b);
			}
		}

		/* Directional light */
		if(object.shaderProgram.directionalColorUniform) {
			if(E('dirLight') && E('dirLight').color) {
				world.GL.gl.uniform3f(object.shaderProgram.directionalColorUniform, parseFloat(E('dirLight').color.rgb[0]), parseFloat(E('dirLight').color.rgb[1]), parseFloat(E('dirLight').color.rgb[2]));
			} else {
				world.GL.gl.uniform3f(object.shaderProgram.directionalColorUniform, object.LightsData.directionLight.R(), object.LightsData.directionLight.G(), object.LightsData.directionLight.B());
			}
		}

		/* Normalize the direction */
		var lightingDirection = null;
		if(object.shaderProgram.lightingDirectionUniform) {
			if(E('dirX') && E('dirY') && E('dirZ')) {
				lightingDirection = [parseFloat(E('dirX').value), parseFloat(E('dirY').value), parseFloat(E('dirZ').value)];
			} else {
				lightingDirection = [object.LightsData.lightingDirection.r, object.LightsData.lightingDirection.g, object.LightsData.lightingDirection.b];
			}

			var adjustedLD = vec3.create();
			vec3.normalize(adjustedLD, lightingDirection);
			vec3.scale(adjustedLD, adjustedLD, -1);
			world.GL.gl.uniform3fv(object.shaderProgram.lightingDirectionUniform, adjustedLD);
		}
	} else {
		if(object.shaderProgram.useLightingUniform) {
			if(object.shaderProgram.ambientColorUniform) {
				world.GL.gl.uniform3f(object.shaderProgram.ambientColorUniform, parseFloat(1), parseFloat(2), parseFloat(0));
			}
			if(object.shaderProgram.directionalColorUniform) {
				world.GL.gl.uniform3f(object.shaderProgram.directionalColorUniform, parseFloat(1), parseFloat(0), parseFloat(0));
			}
		}
	}

	// T
	if(object.vertexTexCoordBuffer) {
		world.GL.gl.bindBuffer(world.GL.gl.ARRAY_BUFFER, object.vertexTexCoordBuffer);

		if(object.geometry.dynamicBuffer == true) {
			world.GL.gl.bufferData(world.GL.gl.ARRAY_BUFFER, object.geometry.texCoords, world.GL.gl.STATIC_DRAW);
		}

		world.GL.gl.vertexAttribPointer(object.shaderProgram.textureCoordAttribute, object.vertexTexCoordBuffer.itemSize, world.GL.gl.FLOAT, false, 0, 0);
		world.GL.gl.enableVertexAttribArray(object.shaderProgram.textureCoordAttribute);

		if(object.streamTextures != null) {
			// video/webcam tex
			if(object.streamTextures.videoImage) {
				App.tools.loadVideoTexture('glVideoTexture', object.streamTextures.videoImage);
			} else {
				App.tools.loadVideoTexture('glVideoTexture', object.streamTextures.video);
			}
			world.GL.gl.uniform1i(object.shaderProgram.samplerUniform, 0);
		} else if(object.FBO) {

			if(object.shadows && object.shadows.type == "spot-shadow") {
				// --------------------------------------------------------------------
				let textureMatrix = m4.identity();
				textureMatrix = m4.translate(textureMatrix, 0.5, 0.5, 0.5);
				textureMatrix = m4.scale(textureMatrix, 0.5, 0.5, 0.5);
				textureMatrix = m4.multiply(textureMatrix, object.shadows.lightProjectionMatrix);
				const lightWorldMatrix = m4.lookAt(
					[object.shadows.lightPosition[0], object.shadows.lightPosition[1], object.shadows.lightPosition[2]],
					[object.shadows.lightTarget[0], object.shadows.lightTarget[1], object.shadows.lightTarget[2]], // target
					[object.shadows.orientation[0], object.shadows.orientation[1], object.shadows.orientation[2]], // up
				);
				textureMatrix = m4.multiply(textureMatrix, m4.inverse(lightWorldMatrix));
				const mat = m4.multiply(lightWorldMatrix, m4.inverse(object.shadows.lightProjectionMatrix));
				world.GL.gl.uniformMatrix4fv(object.shaderProgram.u_textureMatrix, false, textureMatrix);
				world.GL.gl.uniform3fv(object.shaderProgram.lightWorldPositionLocation, object.shadows.lightPosition);
				world.GL.gl.uniformMatrix4fv(object.shaderProgram.u_world, false,
					m4.translate(object.position.worldLocation[0],
						object.position.worldLocation[1],
						object.position.worldLocation[2])
				);
				// world.GL.gl.uniformMatrix4fv(object.shaderProgram.u_world, false, mat);
				world.GL.gl.uniform3fv(object.shaderProgram.u_reverseLightDirection, lightWorldMatrix.slice(8, 11));
				world.GL.gl.uniform1f(object.shaderProgram.u_bias, object.shadows.bias);
				//---------------------------------------------------------------------
				world.GL.gl.activeTexture(world.GL.gl.TEXTURE0);
				world.GL.gl.bindTexture(world.GL.gl.TEXTURE_2D, object.FBO.deepTexture);
				world.GL.gl.uniform1i(object.shaderProgram.samplerUniform, 0);
				//-------------------------------------------
				var t_index0 = 0;
				for(var t = 1;t < object.textures.length;t++) {
					if(object.custom.gl_texture == null) {
						world.GL.gl.activeTexture(world.GL.gl['TEXTURE' + t]);
						world.GL.gl.bindTexture(world.GL.gl.TEXTURE_2D, object.textures[t_index0]);
						if(world.GL.extTFAnisotropic) {
							world.GL.gl.texParameterf(world.GL.gl.TEXTURE_2D,
								world.GL.extTFAnisotropic.TEXTURE_MAX_ANISOTROPY_EXT,
								world.GL.MAX_TEXTURE_MAX_ANISOTROPY_EXT);
						}
						if(object.texParams.MIPMAP == false) {
							world.GL.gl.texParameteri(world.GL.gl.TEXTURE_2D, world.GL.gl.TEXTURE_WRAP_S, world.GL.gl.REPEAT);
							world.GL.gl.texParameteri(world.GL.gl.TEXTURE_2D, world.GL.gl.TEXTURE_WRAP_T, world.GL.gl.REPEAT);
						}
						else {
							world.GL.gl.texParameteri(world.GL.gl.TEXTURE_2D, world.GL.gl.TEXTURE_MAG_FILTER, object.texParams.TEXTURE_MAG_FILTER | world.GL.gl.LINEAR);
							world.GL.gl.texParameteri(world.GL.gl.TEXTURE_2D, world.GL.gl.TEXTURE_MIN_FILTER, object.texParams.TEXTURE_MIN_FILTER | world.GL.gl.LINEAR);
						}

						if(typeof object.texParams.spriteAnimation != 'undefined' && object.texParams.spriteAnimation != false && object.textures[t].image.width != 0) {
							//char * data; // data of 8-bit per sample RGBA image
							// int w, h; // size of the image
							// int sx, sy, sw, sh; // position and size of area you want to crop.
							//glTexImage2D does support regions - of - interest.You do it as follows:
							world.GL.gl.pixelStorei(world.GL.gl.UNPACK_FLIP_Y_WEBGL, false);
							var [XX, YY] = object.texParams.spriteAnimation.getOffsetXY();
							world.GL.gl.pixelStorei(world.GL.gl.UNPACK_ROW_LENGTH, object.textures[t].image.height);
							world.GL.gl.pixelStorei(world.GL.gl.UNPACK_SKIP_PIXELS,
								XX * (object.textures[t].image.width / object.texParams.spriteAnimation.shema[0]));
							world.GL.gl.pixelStorei(world.GL.gl.UNPACK_SKIP_ROWS,
								YY * (object.textures[t].image.height / object.texParams.spriteAnimation.shema[1]));
							world.GL.gl.pixelStorei(world.GL.gl.UNPACK_ALIGNMENT, 1);
							// LodePNG tightly packs everything
							// glTexImage2D(GL_TEXTURE_2D, level, internalFormat,
							// sw, sh, border, format, type, data);
							world.GL.gl.texImage2D(world.GL.gl.TEXTURE_2D,
								0, world.GL.gl.RGBA,
								object.textures[t].image.width / object.texParams.spriteAnimation.shema[0],
								object.textures[t].image.height / object.texParams.spriteAnimation.shema[1],
								0,
								world.GL.gl.RGBA,
								world.GL.gl.UNSIGNED_BYTE,
								object.textures[t].image);
						}

						if(object.texParams.MIPMAP == true) {
							world.GL.gl.texParameteri(world.GL.gl.TEXTURE_2D, world.GL.gl.TEXTURE_MAG_FILTER, world.GL.gl.NEAREST);
							world.GL.gl.texParameteri(world.GL.gl.TEXTURE_2D, world.GL.gl.TEXTURE_MIN_FILTER, world.GL.gl.LINEAR_MIPMAP_NEAREST);
							world.GL.gl.generateMipmap(world.GL.gl.TEXTURE_2D);
						}

						world.GL.gl.uniform1i(object.shaderProgram.samplerUniform, t);
						world.GL.gl.uniform1i(object.shaderProgram.u_projectedTexture, t);
					} else {
						object.custom.gl_texture(object, t);
					}
				}
				// world.GL.gl.uniform1i(object.shaderProgram.samplerUniform, 1);
			} else {
				world.GL.gl.activeTexture(world.GL.gl.TEXTURE0);
				world.GL.gl.bindTexture(world.GL.gl.TEXTURE_2D, object.FBO.deepTexture);
				world.GL.gl.uniform1i(object.shaderProgram.samplerUniform, 0);
			}

		} else {
			//------------
			if(object.shadows && object.shadows.type == "spot-shadow") {
				// --------------------------------------------------------------------
				let textureMatrix = m4.identity();
				textureMatrix = m4.translate(textureMatrix, 0.5, 0.5, 0.5);
				textureMatrix = m4.scale(textureMatrix, 0.5, 0.5, 0.5);
				textureMatrix = m4.multiply(textureMatrix, object.shadows.lightProjectionMatrix);
				const lightWorldMatrix = m4.lookAt(
					[object.shadows.lightPosition[0], object.shadows.lightPosition[1], object.shadows.lightPosition[2]],
					[object.shadows.lightTarget[0], object.shadows.lightTarget[1], object.shadows.lightTarget[2]], // target
					[object.shadows.orientation[0], object.shadows.orientation[1], object.shadows.orientation[2]], // up
				);
				textureMatrix = m4.multiply(textureMatrix, m4.inverse(lightWorldMatrix));
				const mat = m4.multiply(lightWorldMatrix, m4.inverse(object.shadows.lightProjectionMatrix));
				world.GL.gl.uniformMatrix4fv(object.shaderProgram.u_textureMatrix, false, textureMatrix);
				world.GL.gl.uniform3fv(object.shaderProgram.lightWorldPositionLocation, object.shadows.lightPosition);
				world.GL.gl.uniformMatrix4fv(object.shaderProgram.u_world, false,
					m4.translate(object.position.worldLocation[0],
						object.position.worldLocation[1],
						object.position.worldLocation[2])
				);
				// world.GL.gl.uniformMatrix4fv(object.shaderProgram.u_world, false, mat);
				world.GL.gl.uniform3fv(object.shaderProgram.u_reverseLightDirection, lightWorldMatrix.slice(8, 11));
				world.GL.gl.uniform1f(object.shaderProgram.u_bias, object.shadows.bias);

			}
			//---------------------------------------------------------------------
			// world.GL.gl.activeTexture(world.GL.gl.TEXTURE0);
			// world.GL.gl.bindTexture(world.GL.gl.TEXTURE_2D, object.FBO.deepTexture);
			// world.GL.gl.uniform1i(object.shaderProgram.samplerUniform, 0);
			// console.log('TEST')
			//-------------------------------------------
			for(var t = 0;t < object.textures.length;t++) {
				if(object.custom.gl_texture == null) {
					world.GL.gl.activeTexture(world.GL.gl['TEXTURE' + t]);
					world.GL.gl.bindTexture(world.GL.gl.TEXTURE_2D, object.textures[t]);
					if(world.GL.extTFAnisotropic) {
						world.GL.gl.texParameterf(world.GL.gl.TEXTURE_2D,
							world.GL.extTFAnisotropic.TEXTURE_MAX_ANISOTROPY_EXT,
							world.GL.MAX_TEXTURE_MAX_ANISOTROPY_EXT);
					}
					if(object.texParams.MIPMAP == false) {
						world.GL.gl.texParameteri(world.GL.gl.TEXTURE_2D, world.GL.gl.TEXTURE_WRAP_S, world.GL.gl.REPEAT);
						world.GL.gl.texParameteri(world.GL.gl.TEXTURE_2D, world.GL.gl.TEXTURE_WRAP_T, world.GL.gl.REPEAT);
					}
					else {
						world.GL.gl.texParameteri(world.GL.gl.TEXTURE_2D, world.GL.gl.TEXTURE_MAG_FILTER, object.texParams.TEXTURE_MAG_FILTER | world.GL.gl.LINEAR);
						world.GL.gl.texParameteri(world.GL.gl.TEXTURE_2D, world.GL.gl.TEXTURE_MIN_FILTER, object.texParams.TEXTURE_MIN_FILTER | world.GL.gl.LINEAR);
					}

					if(typeof object.texParams.spriteAnimation != 'undefined' && object.texParams.spriteAnimation != false && object.textures[t].image.width != 0) {
						//char * data; // data of 8-bit per sample RGBA image
						// int w, h; // size of the image
						// int sx, sy, sw, sh; // position and size of area you want to crop.
						//glTexImage2D does support regions - of - interest.You do it as follows:
						world.GL.gl.pixelStorei(world.GL.gl.UNPACK_FLIP_Y_WEBGL, false);
						var [XX, YY] = object.texParams.spriteAnimation.getOffsetXY();
						world.GL.gl.pixelStorei(world.GL.gl.UNPACK_ROW_LENGTH, object.textures[t].image.height);
						world.GL.gl.pixelStorei(world.GL.gl.UNPACK_SKIP_PIXELS,
							XX * (object.textures[t].image.width / object.texParams.spriteAnimation.shema[0]));
						world.GL.gl.pixelStorei(world.GL.gl.UNPACK_SKIP_ROWS,
							YY * (object.textures[t].image.height / object.texParams.spriteAnimation.shema[1]));
						world.GL.gl.pixelStorei(world.GL.gl.UNPACK_ALIGNMENT, 1);
						// LodePNG tightly packs everything
						// glTexImage2D(GL_TEXTURE_2D, level, internalFormat,
						// sw, sh, border, format, type, data);
						world.GL.gl.texImage2D(world.GL.gl.TEXTURE_2D,
							0, world.GL.gl.RGBA,
							object.textures[t].image.width / object.texParams.spriteAnimation.shema[0],
							object.textures[t].image.height / object.texParams.spriteAnimation.shema[1],
							0,
							world.GL.gl.RGBA,
							world.GL.gl.UNSIGNED_BYTE,
							object.textures[t].image);
					}

					if(object.texParams.MIPMAP == true) {
						world.GL.gl.texParameteri(world.GL.gl.TEXTURE_2D, world.GL.gl.TEXTURE_MAG_FILTER, world.GL.gl.NEAREST);
						world.GL.gl.texParameteri(world.GL.gl.TEXTURE_2D, world.GL.gl.TEXTURE_MIN_FILTER, world.GL.gl.LINEAR_MIPMAP_NEAREST);
						world.GL.gl.generateMipmap(world.GL.gl.TEXTURE_2D);
					}

					world.GL.gl.uniform1i(object.shaderProgram.samplerUniform, t);
				} else {
					object.custom.gl_texture(object, t);
				}
			}
		}

		localLooper = localLooper + 1;
	}

	world.GL.gl.bindBuffer(world.GL.gl.ELEMENT_ARRAY_BUFFER, object.vertexIndexBuffer);
	world.setMatrixUniforms(object, this.pMatrix, object.mvMatrix);

	if(object.vertexNormalBuffer && object.shaderProgram.nMatrixUniform) {
		var normalMatrix = mat3.create();
		mat3.normalFromMat4(normalMatrix, object.mvMatrix);
		mat3.transpose(normalMatrix, normalMatrix);
		world.GL.gl.uniformMatrix3fv(object.shaderProgram.nMatrixUniform, false, normalMatrix);
	}

	// world.disableUnusedAttr( world.GL.gl, localLooper);
	// world.disableUnusedAttr(world.GL.gl, 4);

	if(object.glBlend.blendEnabled == true) {
		if(!world.GL.gl.isEnabled(world.GL.gl.BLEND)) {
			world.GL.gl.enable(world.GL.gl.BLEND);
		}
		world.GL.gl.blendFunc(world.GL.gl[object.glBlend.blendParamSrc], world.GL.gl[object.glBlend.blendParamDest]);
	} else {
		world.GL.gl.disable(world.GL.gl.BLEND);
		world.GL.gl.enable(world.GL.gl.DEPTH_TEST);
		// world.GL.gl.depthMask(true);
	}

	// shadows
	if(object.shadows && object.shadows.type == 'spot') {
		// set the light position
		world.GL.gl.uniform3fv(object.shaderProgram.lightWorldPositionLocation, object.shadows.lightPosition);
		world.GL.gl.uniform3fv(object.shaderProgram.viewWorldPositionLocation, object.position.worldLocation);
		world.GL.gl.uniform1f(object.shaderProgram.shininessLocation, object.shadows.shininess);
		// Set the spotlight uniforms
		{
			var target = [0, 0, 0]; // object.position.worldLocation;
			var up = [0, 1, 0];
			var lmat = m4.lookAt(object.shadows.lightPosition, target, up);
			// var lmat = m4.lookAt(object.position.worldLocation, target, up);
			lmat = m4.multiply(m4.xRotation(object.shadows.lightRotationX), lmat);
			lmat = m4.multiply(m4.yRotation(object.shadows.lightRotationY), lmat);
			// get the zAxis from the matrix
			// negate it because lookAt looks down the -Z axis
			object.shadows.lightDirection = [-lmat[8], -lmat[9], -lmat[10]];
			// object.shadows.lightDirection = [-0, -0, -1];
		}

		world.GL.gl.uniform3fv(object.shaderProgram.lightDirectionLocation, object.shadows.lightDirection);
		world.GL.gl.uniform1f(object.shaderProgram.innerLimitLocation, Math.cos(object.shadows.innerLimit));
		world.GL.gl.uniform1f(object.shaderProgram.outerLimitLocation, Math.cos(object.shadows.outerLimit));
	} else if(object.shadows && object.shadows.type == 'spec') {
		// global position
		world.GL.gl.uniform3fv(object.shaderProgram.specularColor, object.shadows.specularDATA);
		world.GL.gl.uniform3fv(object.shaderProgram.uLightPosition, world.uLightPosition);
	} else if(object.shadows && object.shadows.type == 'lens') {
		// Lens
		world.GL.gl.uniform3fv(object.shaderProgram.uLightPosition, world.uLightPosition);
		world.GL.gl.uniform3fv(object.shaderProgram.uControl, object.shadows.uControl);
		world.GL.gl.uniform3fv(object.shaderProgram.uResolution, object.shadows.uResolution);
	}

	world.GL.gl.drawElements(world.GL.gl[object.glDrawElements.mode], object.glDrawElements.numberOfIndicesRender, world.GL.gl.UNSIGNED_SHORT, 0);
	object.instancedDraws.overrideDrawArraysInstance(object);

	this.mvPopMatrix(object.mvMatrix, this.mvMatrixStack);
};

App.operation.draws.sphere = function(object, ray) {
	var lighting = true;
	var localLooper = 0;

	mat4.identity(object.mvMatrix);
	this.mvPushMatrix(object.mvMatrix, this.mvMatrixStack);

	if(object.physics.enabled == true) {

		if(App.camera.FirstPersonController == true) {
			camera.setCamera(object)
		} else if(App.camera.SceneController == true) {
			camera.setSceneCamera(object)
		}

		if(object.custom_type != 'torus') {
			var QP = object.physics.currentBody.quaternion;
			QP.normalize()
			mat4.translate(object.mvMatrix, object.mvMatrix, object.position.worldLocation);
			// if(raycaster.checkingProcedureCalc && typeof ray === 'undefined') raycaster.checkingProcedureCalc(object);
			var t = vec3.fromValues(object.rotation.axis.x, object.rotation.axis.y, object.rotation.axis.z);
			object.rotation.axisSystem[0].normalize()
			// TEST - Yes ultimate - MAybe even cube will be better
			var AXIS = vec3.fromValues(
				-parseFloat(object.rotation.axisSystem[0].x.toFixed(2)),
				parseFloat(object.rotation.axisSystem[0].y.toFixed(2)),
				parseFloat(object.rotation.axisSystem[0].z.toFixed(2)))
			var MY_ANGLE = (2 * Math.acos(QP.w))
			mat4.rotate(object.mvMatrix, object.mvMatrix, MY_ANGLE, AXIS);
		} else if(object.custom_type == 'torus') {
			mat4.translate(object.mvMatrix, object.mvMatrix, object.position.worldLocation);
			// if(raycaster.checkingProcedureCalc && typeof ray === 'undefined') raycaster.checkingProcedureCalc(object);
			mat4.rotate(object.mvMatrix, object.mvMatrix, degToRad(object.rotation.rx), object.rotation.getRotDirX());
			mat4.rotate(object.mvMatrix, object.mvMatrix, degToRad(object.rotation.ry), object.rotation.getRotDirY());
			mat4.rotate(object.mvMatrix, object.mvMatrix, degToRad(object.rotation.rz), object.rotation.getRotDirZ());
		}

	} else if(object.isHUD === true) {

		mat4.translate(object.mvMatrix, object.mvMatrix, object.position.worldLocation);
		mat4.rotate(object.mvMatrix, object.mvMatrix, degToRad(object.rotation.rx), object.rotation.getRotDirX());
		mat4.rotate(object.mvMatrix, object.mvMatrix, degToRad(object.rotation.ry), object.rotation.getRotDirY());
		mat4.rotate(object.mvMatrix, object.mvMatrix, degToRad(object.rotation.rz), object.rotation.getRotDirZ());
		// if(raycaster.checkingProcedureCalc) raycaster.checkingProcedureCalc(object);

	} else {

		if(App.camera.FirstPersonController == true) {
			camera.setCamera(object)
		} else if(App.camera.SceneController == true) {
			camera.setSceneCamera(object)
		}

		mat4.translate(object.mvMatrix, object.mvMatrix, object.position.worldLocation);
		// if(raycaster.checkingProcedureCalc && typeof ray === 'undefined') raycaster.checkingProcedureCalc(object);

		mat4.rotate(object.mvMatrix, object.mvMatrix, degToRad(object.rotation.rx), object.rotation.getRotDirX());
		mat4.rotate(object.mvMatrix, object.mvMatrix, degToRad(object.rotation.ry), object.rotation.getRotDirY());
		mat4.rotate(object.mvMatrix, object.mvMatrix, degToRad(object.rotation.rz), object.rotation.getRotDirZ());
	}
	// V
	if(object.vertexPositionBuffer) {
		world.GL.gl.bindBuffer(world.GL.gl.ARRAY_BUFFER, object.vertexPositionBuffer);

		if(object.geometry.dynamicBuffer == true) {
			world.GL.gl.bufferData(world.GL.gl.ARRAY_BUFFER, object.geometry.vertices, world.GL.gl.STATIC_DRAW);
		}

		world.GL.gl.vertexAttribPointer(object.shaderProgram.vertexPositionAttribute, object.vertexPositionBuffer.itemSize, world.GL.gl.FLOAT, false, 0, 0);
		world.GL.gl.enableVertexAttribArray(object.shaderProgram.vertexPositionAttribute);
		localLooper = localLooper + 1;
	}

	// C
	if(object.vertexColorBuffer) {
		world.GL.gl.bindBuffer(world.GL.gl.ARRAY_BUFFER, object.vertexColorBuffer);
		world.GL.gl.vertexAttribPointer(object.shaderProgram.vertexColorAttribute, object.vertexColorBuffer.itemSize, world.GL.gl.FLOAT, false, 0, 0);
		world.GL.gl.enableVertexAttribArray(object.shaderProgram.vertexColorAttribute);
		localLooper = localLooper + 1;
	}

	// LIGHT
	if(lighting && object.shaderProgram.useLightingUniform) {
		world.GL.gl.uniform1i(object.shaderProgram.useLightingUniform, lighting);
		/* Set the normals */
		if(object.vertexNormalBuffer) {
			world.GL.gl.bindBuffer(world.GL.gl.ARRAY_BUFFER, object.vertexNormalBuffer);
			world.GL.gl.vertexAttribPointer(object.shaderProgram.vertexNormalAttribute, object.vertexNormalBuffer.itemSize, world.GL.gl.FLOAT, false, 0, 0);
			world.GL.gl.enableVertexAttribArray(object.shaderProgram.vertexNormalAttribute);
			localLooper = localLooper + 1;
		}

		/* Set the ambient light */
		if(object.shaderProgram.ambientColorUniform) {
			if(E('ambLight') && E('ambLight').color) {
				world.GL.gl.uniform3f(object.shaderProgram.ambientColorUniform, parseFloat(E('ambLight').color.rgb[0]), parseFloat(E('ambLight').color.rgb[1]), parseFloat(E('ambLight').color.rgb[2]));
			} else {
				world.GL.gl.uniform3f(object.shaderProgram.ambientColorUniform, object.LightsData.ambientLight.r, object.LightsData.ambientLight.g, object.LightsData.ambientLight.b);
			}
		}

		/* Set the directional light */
		if(object.shaderProgram.directionalColorUniform) {
			if(E('dirLight') && E('dirLight').color) {
				world.GL.gl.uniform3f(object.shaderProgram.directionalColorUniform, parseFloat(E('dirLight').color.rgb[0]), parseFloat(E('dirLight').color.rgb[1]), parseFloat(E('dirLight').color.rgb[2]));
			} else {
				world.GL.gl.uniform3f(object.shaderProgram.directionalColorUniform, object.LightsData.directionLight.R(), object.LightsData.directionLight.G(), object.LightsData.directionLight.B());
			}
		}

		/* Normalize the direction */
		var lightingDirection = null;
		if(object.shaderProgram.lightingDirectionUniform) {
			if(E('dirX') && E('dirY') && E('dirZ')) {
				lightingDirection = [parseFloat(E('dirX').value), parseFloat(E('dirY').value), parseFloat(E('dirZ').value)];
			} else {
				lightingDirection = [object.LightsData.lightingDirection.r, object.LightsData.lightingDirection.g, object.LightsData.lightingDirection.b];
			}

			var adjustedLD = vec3.create();
			vec3.normalize(adjustedLD, lightingDirection);
			vec3.scale(adjustedLD, adjustedLD, -1);
			world.GL.gl.uniform3fv(object.shaderProgram.lightingDirectionUniform, adjustedLD);
		}
	} else {
		if(object.shaderProgram.useLightingUniform) {
			if(object.shaderProgram.ambientColorUniform) {
				world.GL.gl.uniform3f(object.shaderProgram.ambientColorUniform, parseFloat(0.2), parseFloat(0.2), parseFloat(0.2));
			}
			if(object.shaderProgram.directionalColorUniform) {
				world.GL.gl.uniform3f(object.shaderProgram.directionalColorUniform, parseFloat(1), parseFloat(0), parseFloat(0));
			}
		}
	}

	// T
	if(object.vertexTexCoordBuffer) {
		world.GL.gl.bindBuffer(world.GL.gl.ARRAY_BUFFER, object.vertexTexCoordBuffer);

		if(object.geometry.dynamicBuffer == true) {
			world.GL.gl.bufferData(world.GL.gl.ARRAY_BUFFER, object.geometry.texCoords, world.GL.gl.STATIC_DRAW);
		}

		world.GL.gl.vertexAttribPointer(object.shaderProgram.textureCoordAttribute, object.vertexTexCoordBuffer.itemSize, world.GL.gl.FLOAT, false, 0, 0);
		world.GL.gl.enableVertexAttribArray(object.shaderProgram.textureCoordAttribute);

		if(object.streamTextures != null) {
			if(object.streamTextures.video) {
				App.tools.loadVideoTexture('glVideoTextureTorus', object.streamTextures.video);
			} else {
				App.tools.loadVideoTexture('glVideoTextureTorus', object.streamTextures.videoImage);
			}

			world.GL.gl.uniform1i(object.shaderProgram.samplerUniform, 0);
		} else {
			for(var t = 0;t < object.textures.length;t++) {
				world.GL.gl.activeTexture(world.GL.gl['TEXTURE' + t]);
				world.GL.gl.bindTexture(world.GL.gl.TEXTURE_2D, object.textures[t]);
				world.GL.gl.pixelStorei(world.GL.gl.UNPACK_FLIP_Y_WEBGL, false);
				world.GL.gl.texParameteri(world.GL.gl.TEXTURE_2D, world.GL.gl.TEXTURE_MAG_FILTER, world.GL.gl.LINEAR);
				world.GL.gl.texParameteri(world.GL.gl.TEXTURE_2D, world.GL.gl.TEXTURE_MIN_FILTER, world.GL.gl.LINEAR);
				world.GL.gl.texParameteri(world.GL.gl.TEXTURE_2D, world.GL.gl.TEXTURE_WRAP_S, world.GL.gl.CLAMP_TO_EDGE);
				world.GL.gl.texParameteri(world.GL.gl.TEXTURE_2D, world.GL.gl.TEXTURE_WRAP_T, world.GL.gl.CLAMP_TO_EDGE);
				world.GL.gl.uniform1i(object.shaderProgram.samplerUniform, t);
			}
		}
		localLooper = localLooper + 1;
	}

	world.GL.gl.bindBuffer(world.GL.gl.ELEMENT_ARRAY_BUFFER, object.vertexIndexBuffer);

	if(object.vertexNormalBuffer && object.shaderProgram.nMatrixUniform) {
		var normalMatrix = mat3.create();
		mat3.normalFromMat4(normalMatrix, object.mvMatrix);
		mat3.transpose(normalMatrix, normalMatrix);
		world.GL.gl.uniformMatrix3fv(object.shaderProgram.nMatrixUniform, false, normalMatrix);
	}

	try {
		world.GL.gl.useProgram(object.shaderProgram);
		world.GL.gl.uniform1i(object.shaderProgram.uniformTime, 0.1);
	} catch(e) {
		console.warn('WTF - ERROR10001');
	}

	// world.disableUnusedAttr(world.GL.gl, 4);

	if(object.glBlend.blendEnabled == true) {
		if(!world.GL.gl.isEnabled(world.GL.gl.BLEND)) {
			world.GL.gl.enable(world.GL.gl.BLEND);
		}
		world.GL.gl.blendFunc(world.GL.gl[object.glBlend.blendParamSrc], world.GL.gl[object.glBlend.blendParamDest]);
	} else {
		world.GL.gl.disable(world.GL.gl.BLEND);
		world.GL.gl.enable(world.GL.gl.DEPTH_TEST);
	}

	world.setMatrixUniforms(object, this.pMatrix, object.mvMatrix);
	world.GL.gl.drawElements(world.GL.gl[object.glDrawElements.mode], object.glDrawElements.numberOfIndicesRender, world.GL.gl.UNSIGNED_SHORT, 0);
	object.instancedDraws.overrideDrawArraysInstance(object);

	this.mvPopMatrix(object.mvMatrix, this.mvMatrixStack);
};

var drawsOperation = App.operation.draws;

export default drawsOperation;
