/**
 * @description MatrixEngine BVH animation loader.
 * MEBvh comes from `npm i bvh-loader`. Package
 * `bvh-loader` is created for MatrixEngine but
 * can be used for any other projects.
 * [Internal] More info:
 * https://docs.w3cub.com/dom/webgl2renderingcontext/drawelementsinstanced
 * @name `MEBvhAnimation`
 * @author Nikola Lukic
 * @async Yes
 */

import MEBvh from 'bvh-loader';
import * as matrixWorld from './matrix-world';
import {OSCILLATOR} from './utility';

export default class MEBvhAnimation {

	constructor(path_, options, callback) {
		if(typeof options === 'undefined' || typeof options.world === 'undefined') {
			console.error('MEBvhAnimation class error: No second argument options || possible world is not passed.');
			return;
		}

		if(typeof callback === 'undefined') {
			options.callback = () => {};
		} else {
			options.callback = callback;
		}

		if(typeof options.skeletalBoneScale === 'undefined') {
			options.skeletalBoneScale = 0.3;
		}

		if(typeof options.skeletalBoneScaleXYZ === 'undefined') {
			options.skeletalBoneScaleXYZ = null;
		}

		if(typeof options.loop === 'undefined') options.loop = true;
		if(typeof options.showOnLoad === 'undefined') options.showOnLoad = true;
		if(typeof options.type === 'undefined') options.type = 'ME-SKELETAL_POINT_BASE';
		if(typeof options.autoPlay === 'undefined') options.autoPlay = true;
		if(typeof options.boneNameBasePrefix === 'undefined') options.boneNameBasePrefix = 'MS';
		if(typeof options.globalOffset === 'undefined') options.globalOffset = [0, 0, 0];
		if(typeof options.globalRotation === 'undefined') options.globalRotation = [0, 0, 0];
		if(typeof options.myFrameRate === 'undefined') options.myFrameRate = 125;
		if(typeof options.speed === 'undefined') options.speed = 1;
		if(typeof options.matrixSkeletalObjScale === 'undefined') options.matrixSkeletalObjScale = 1;
		if(typeof options.ifNotExistDrawType === 'undefined') options.ifNotExistDrawType = 'cubeLightTex';

		// passed
		this.options = options;
		this.world = options.world;
		this.globalOffset = options.globalOffset;
		this.globalRotation = options.globalRotation;

		this.anim = new MEBvh();
		this.tPose = null;
		this.skeletalKeys = null;
		this.animation = null;
		this.animationTimer = null;
		this.actualFrame = 1;

		this.isConstructed = false;

		this.anim
			.parse_file(path_)
			.then(() => {
				this.tPose = this.anim.frame_pose(0);
				this.tPosition = this.tPose[0];
				this.tRotation = this.tPose[1];
				this.skeletalKeys = this.anim.joint_names();
				this.animation = this.anim.all_frame_poses();
				this.sumOfFrames = this.animation[0].length - 1;
				this.loopInverse = new OSCILLATOR(-this.sumOfFrames, -1, options.speed);
				if(this.isConstructed == false) this.constructSkeletal(this.options);
				if (this.options.callback) this.options.callback()
			})
			.catch((err) => {
				console.warn('Bvh-loader error: ', err);
			});
	}

	objectsReady(options) {
		if(options.autoPlay == true) {
			switch(options.type) {
				case 'TPOSE':
					this.constructSkeletalTPose();
					break;
				case 'ANIMATION':
					this.playAnimation();
					break;
				default:
					this.playAnimation();
			}
		} else {
			if(options.showOnLoad == true) {
				switch(options.type) {
					case 'TPOSE':
						this.constructSkeletalTPose();
						break;
					case 'ANIMATION':
						// console.log("No autoPlay but preview first frame of animation")
						this.constructFirstFrame(this.options);
						break;
					default:
						this.constructFirstFrame(this.options);
				}
			}
		}

		if(typeof this.options.skeletalBlend != 'undefined') {
			for(var x = 0;x < this.tPosition.length;x++) {
				var b = this.options.boneNameBasePrefix + this.skeletalKeys[x];
				App.scene[b].glBlend.blendEnabled = true;
				App.scene[b].glBlend.blendParamSrc = matrixEngine.utility.ENUMERATORS.glBlend.param[this.options.skeletalBlend.paramSrc];
				App.scene[b].glBlend.blendParamDest = matrixEngine.utility.ENUMERATORS.glBlend.param[this.options.skeletalBlend.paramDest];
			}
		}
	}

	constructSkeletalTPose() {
		for(var x = 0;x < this.tPosition.length;x++) {
			var b = this.options.boneNameBasePrefix + this.skeletalKeys[x];
			// test check
			if(App.scene[b]) {
				App.scene[b].position.SetX(this.tPosition[x][0] + this.globalOffset[0]);
				App.scene[b].position.SetY(this.tPosition[x][1] + this.globalOffset[1]);
				App.scene[b].position.SetZ(this.tPosition[x][2] + this.globalOffset[2]);

				App.scene[b].rotation.rotateX(this.tRotation[x][0] + this.globalRotation[0]);
				App.scene[b].rotation.rotateY(this.tRotation[x][1] + this.globalRotation[1]);
				App.scene[b].rotation.rotateZ(this.tRotation[x][2] + this.globalRotation[2]);
			} else {
				console.log('TEST NON EXIST  T POSE', b)
			}
		}
	}

	// Must be improved not secure 100%. <<
	accessBonesObject() {
		let onlyMine = [];
		matrixWorld.objListToDispose[0].contentList.forEach((MEObject) => {
			if(MEObject.name.indexOf(this.options.boneNameBasePrefix) != -1) {
				onlyMine.push(MEObject);
			}
		});
		return onlyMine;
	}

	getInfoAboutJoints = () => {
		let allNames = [];
		let allEndBones = [];
		for (var k in this.anim.joints) {
			allNames.push(this.anim.joints[k].name)
			if (this.anim.joints[k].name.indexOf('_end') !=- 1) allEndBones.push(this.anim.joints[k].name)
		}
		return {
			names: allNames,
			allEndBones: allEndBones
		}
	}

	async constructSkeletal(options) {

		this.skeletalKeys = this.skeletalKeys.map((item) => item.replace('mixamorig:', ''));

		const promises = [];
		for(var x = 0;x < this.tPosition.length;x++) {

			promises.push(new Promise((resolve) => {

				// Blender adapt
				let filename = this.skeletalKeys[x];
				filename = filename.toLowerCase();
				var b = this.options.boneNameBasePrefix + this.skeletalKeys[x];
				// just handler
				var curName = {};
				curName[b] = this.options.matrixSkeletal + filename + '.obj';

				if(typeof this.options.boneTex != 'undefined') {
					// mixamorig:Head
					// console.log("filename = ", filename);
					const detTypeOfMEObject = typeof this.options.drawTypeBone == 'undefined' ? 'cubeLightTex' : this.options.drawTypeBone;
					// matrixSkeletal feature
					if(detTypeOfMEObject == 'matrixSkeletal') {
						if(this.options.objList.indexOf(filename) !== -1) {
							if(typeof this.options.ignoreList !== 'undefined' && this.options.ignoreList[0] == filename) {
								resolve('ignored' + filename);
							} else {
								console.info(this.skeletalKeys[x], ' >>> looking for obj part...');
								matrixEngine.objLoader.downloadMeshes(curName, (meshes) => {
									for(let key in meshes) {
										meshes[key].setScale(this.options.matrixSkeletalObjScale);
										matrixEngine.objLoader.initMeshBuffers(this.world.GL.gl, meshes[key]);
										this.world.Add('obj', this.options.matrixSkeletalObjScale, key, this.options.boneTex, meshes[key]);
										// [2.1.7]
										if(options.skeletalBoneScaleXYZ != null) {
											App.scene[key].mesh.setScale({x: this.options.skeletalBoneScaleXYZ[0], y: this.options.skeletalBoneScaleXYZ[1], z: this.options.skeletalBoneScaleXYZ[2]});
										}
										resolve(key);
									}
								});
							}
						} else {
							// Primitives mesh
							this.world.Add(this.options.ifNotExistDrawType, this.options.skeletalBoneScale, b, this.options.boneTex);
							if(this.options.skeletalBoneScaleXYZ != null) {
								App.scene[b].geometry.setScaleByX(this.options.skeletalBoneScaleXYZ[0])
								App.scene[b].geometry.setScaleByY(this.options.skeletalBoneScaleXYZ[1])
								App.scene[b].geometry.setScaleByZ(this.options.skeletalBoneScaleXYZ[2])
							}
							resolve(b);
						}
					} else {
						// Primitives mesh
						this.world.Add(detTypeOfMEObject, this.options.skeletalBoneScale, b, this.options.boneTex);
						if(this.options.skeletalBoneScaleXYZ != null) {
							App.scene[b].geometry.setScaleByX(this.options.skeletalBoneScaleXYZ[0])
							App.scene[b].geometry.setScaleByY(this.options.skeletalBoneScaleXYZ[1])
							App.scene[b].geometry.setScaleByZ(this.options.skeletalBoneScaleXYZ[2])
						}
						resolve(b);
					}
				} else {
					// Primitives mesh - not sure for exist scale by axis...
					this.world.Add('cube', this.options.skeletalBoneScale, b);
					resolve(b);
				}
			}));

		}

		Promise.all(promises).then((what) => {
			console.info('Promise all -> ', what);
			console.info('Promise all -> ', promises);
			this.isConstructed = true;
			this.objectsReady(options);
		});
	}

	constructFirstFrame() {
		for(var x = 0;x < this.tPosition.length;x++) {
			var b = this.options.boneNameBasePrefix + this.skeletalKeys[x];
			// test - import bvh from make human -> blender
			if(this.animation[0][1]) {
				App.scene[b].position.SetX(this.animation[0][1][x][0] + this.globalOffset[0]);
				App.scene[b].position.SetY(this.animation[0][1][x][1] + this.globalOffset[1]);
				App.scene[b].position.SetZ(this.animation[0][1][x][2] + this.globalOffset[2]);
				App.scene[b].rotation.rotateX(this.animation[1][1][x][0] + this.globalRotation[0]);
				App.scene[b].rotation.rotateY(this.animation[1][1][x][1] + this.globalRotation[1]);
				App.scene[b].rotation.rotateZ(this.animation[1][1][x][2] + this.globalRotation[2]);
			} else {
				// console.info("TESTED no t-pose case!")
				App.scene[b].position.SetX(this.animation[0][0][x][0] + this.globalOffset[0]);
				App.scene[b].position.SetY(this.animation[0][0][x][1] + this.globalOffset[1]);
				App.scene[b].position.SetZ(this.animation[0][0][x][2] + this.globalOffset[2]);
				App.scene[b].rotation.rotateX(this.animation[1][0][x][0] + this.globalRotation[0]);
				App.scene[b].rotation.rotateY(this.animation[1][0][x][1] + this.globalRotation[1]);
				App.scene[b].rotation.rotateZ(this.animation[1][0][x][2] + this.globalRotation[2]);
			}
		}
	}

	playAnimation() {
		if(this.animationTimer == null) {
			// Must be update before draw not timer any more - optimisation <<
			this.animationTimer = setInterval(() => {
				for(var x = 0;x < this.tPosition.length;x++) {
					var b = this.options.boneNameBasePrefix + this.skeletalKeys[x];
					// catch if not exist possible!
					if(App.scene[b]) {
						// 1.8.1
						if(App.scene[b] && this.animation[0][this.actualFrame]) {
							App.scene[b].position.SetX(this.animation[0][this.actualFrame][x][0] + this.globalOffset[0]);
							App.scene[b].position.SetY(this.animation[0][this.actualFrame][x][1] + this.globalOffset[1]);
							App.scene[b].position.SetZ(this.animation[0][this.actualFrame][x][2] + this.globalOffset[2]);
							App.scene[b].rotation.rotateX(this.animation[1][1][x][0] + this.globalRotation[0]);
							App.scene[b].rotation.rotateY(this.animation[1][1][x][1] + this.globalRotation[1]);
							App.scene[b].rotation.rotateZ(this.animation[1][1][x][2] + this.globalRotation[2]);
						} else {
							// for non t pose
							App.scene[b].position.SetX(this.animation[0][0][x][0] + this.globalOffset[0]);
							App.scene[b].position.SetY(this.animation[0][0][x][1] + this.globalOffset[1]);
							App.scene[b].position.SetZ(this.animation[0][0][x][2] + this.globalOffset[2]);
							App.scene[b].rotation.rotateX(this.animation[1][0][x][0] + this.globalRotation[0]);
							App.scene[b].rotation.rotateY(this.animation[1][0][x][1] + this.globalRotation[1]);
							App.scene[b].rotation.rotateZ(this.animation[1][0][x][2] + this.globalRotation[2]);
						}
					}
				}

				if(this.options.loop == 'playInverse' || this.options.loop == 'playInverseAndStop') {
					this.actualFrame = -this.loopInverse.UPDATE();

					if(this.actualFrame <= 1 && this.options.loop == 'playInverseAndStop') {
						this.stopAnimation();
						return;
					}

					return;
				} else {
					this.actualFrame++;
				}

				if(this.actualFrame >= this.animation[0].length - 1) {
					if(this.options.loop == true) {
						this.actualFrame = 1;
					} else if(this.options.loop == 'stopOnEnd') {
						this.stopAnimation();
					} else if(this.options.loop == 'stopAndReset') {
						this.constructFirstFrame();
						this.actualFrame = 1;
						this.stopAnimation();
					}
				}
			}, this.options.myFrameRate);
		} else {
			console.warn('MEBvhAnimation: Animation already play.');
		}
	}

	stopAnimation() {
		clearInterval(this.animationTimer);
		this.animationTimer = null;
	}

	playAnimationFromKeyframes() {
		if(this.animationTimer == null) {
			// Must be update before draw not timer any more - optimisation <<
			this.animationTimer = setInterval(() => {
				for(var x = 0;x < this.anim.joints.__0.children.length;x++) {
					var b = this.options.boneNameBasePrefix + this.anim.joints.__0.children[x].name; //this.skeletalKeys[x];
					// catch if not exist possible!
					if(App.scene[b]) {
						// 2.1.13
						if(App.scene[b] && this.anim.keyframes[this.actualFrame]) {
							App.scene[b].position.SetX(this.anim.keyframes[this.actualFrame][0 + (x*6)] + this.globalOffset[0]);
							App.scene[b].position.SetZ(this.anim.keyframes[this.actualFrame][1+ (x*6)] + this.globalOffset[1]);
							App.scene[b].position.SetY(this.anim.keyframes[this.actualFrame][2+ (x*6)] + this.globalOffset[2]);
							App.scene[b].rotation.rotateX(this.anim.keyframes[this.actualFrame][3+ (x*6)] + this.globalRotation[0]);
							App.scene[b].rotation.rotateY(this.anim.keyframes[this.actualFrame][4+ (x*6)] + this.globalRotation[1]);
							App.scene[b].rotation.rotateZ(this.anim.keyframes[this.actualFrame][5+ (x*6)] + this.globalRotation[2]);
						} else {
							// for non t pose
							App.scene[b].position.SetX(this.anim.keyframes[this.actualFrame][0] + this.globalOffset[0]);
							App.scene[b].position.SetY(this.anim.keyframes[this.actualFrame][1] + this.globalOffset[1]);
							App.scene[b].position.SetZ(this.anim.keyframes[this.actualFrame][2] + this.globalOffset[2]);
							App.scene[b].rotation.rotateX(this.anim.keyframes[this.actualFrame][3] + this.globalRotation[0]);
							App.scene[b].rotation.rotateY(this.anim.keyframes[this.actualFrame][4] + this.globalRotation[1]);
							App.scene[b].rotation.rotateZ(this.anim.keyframes[this.actualFrame][5] + this.globalRotation[2]);
						}
					}
				}

				if(this.options.loop == 'playInverse' || this.options.loop == 'playInverseAndStop') {
					this.actualFrame = -this.loopInverse.UPDATE();
					if(this.actualFrame <= 1 && this.options.loop == 'playInverseAndStop') {
						this.stopAnimation();
						return;
					}
					return;
				} else {
					this.actualFrame++;
				}

				if(this.actualFrame >= this.animation[0].length - 1) {
					if(this.options.loop == true) {
						this.actualFrame = 1;
					} else if(this.options.loop == 'stopOnEnd') {
						this.stopAnimation();
					} else if(this.options.loop == 'stopAndReset') {
						this.constructFirstFrame();
						this.actualFrame = 1;
						this.stopAnimation();
					}
				}
			}, this.options.myFrameRate);
		} else {
			console.warn('MEBvhAnimation: Animation already play.');
		}
	}
}
