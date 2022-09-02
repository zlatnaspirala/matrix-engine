
/**
 * @description MatrixEngine BVH animation loader.
 * MEBvh comes from `npm i bvh-loader`. Package 
 * `bvh-loader` is created for MatrixEngine but 
 * can be used for any other projects.
 * @name `MEBvhAnimation`
 * @author Nikola Lukic
 * @async YES
 */

// https://docs.w3cub.com/dom/webgl2renderingcontext/drawelementsinstanced

// HARDCODE DEV
import MEBvh from '../node_modules/bvh-loader/index';
//import MEBvh from 'bvh-loader';

import * as matrixWorld from './matrix-world';
import { OSCILLATOR } from "./utility";

export default class MEBvhAnimation {

  constructor(path_, options) {

    if (typeof options === "undefined" ||
        typeof options.world === 'undefined') {
      console.error("MEBvhAnimation class error: No second argument options || possible world is not passed.");
      return;
    }

    if (typeof options.skeletalBoneScale === 'undefined') {
      options.skeletalBoneScale = 0.3;
    }

    if (typeof options.loop === 'undefined') options.loop = true;
    if (typeof options.showOnLoad === 'undefined') options.showOnLoad = true;
    if (typeof options.type === 'undefined') options.type = "ME-SKELETAL_POINT_BASE";
    if (typeof options.autoPlay === 'undefined') options.autoPlay = true;
    if (typeof options.boneNameBasePrefix === 'undefined') options.boneNameBasePrefix = "MatrixSkeletalBone";
    if (typeof options.globalOffset === 'undefined') options.globalOffset = [0,0,0];
    if (typeof options.myFrameRate === 'undefined') options.myFrameRate = 125;

    // passed
    this.options = options;
    this.world = options.world;
    this.globalOffset = options.globalOffset;

    this.anim = new MEBvh();
    this.tPose = null;
    this.skeletalKeys = null;
    this.animation = null;
    this.animationTimer = null;
    this.actualFrame = 1;

    this.isConstructed = false;

    this.anim.parse_file(path_).then(()=> {

      this.tPose = this.anim.frame_pose(0);
      this.tPosition = this.tPose[0];
      this.tRotation = this.tPose[1];
      this.skeletalKeys = this.anim.joint_names();
      this.animation = this.anim.all_frame_poses();

      this.sumOfFrames = this.animation[0].length - 1;

      this.loopInverse = new OSCILLATOR(1, this.sumOfFrames, 1);

      if (options.autoPlay == true) {
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
        if (options.showOnLoad == true) {
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

    });

  }

  constructSkeletalTPose() {

    if (this.isConstructed == false) this.constructSkeletal(this.options);

    for (var x = 0; x < this.tPosition.length; x++) {
      var b = this.options.boneNameBasePrefix + this.skeletalKeys[x];
      App.scene[b].position.SetX(this.tPosition[x][0] + this.globalOffset[0]);
      App.scene[b].position.SetY(this.tPosition[x][1] + this.globalOffset[1]);
      App.scene[b].position.SetZ(this.tPosition[x][2] + this.globalOffset[2]);

      App.scene[b].rotation.rotateX(this.tRotation[x][0]);
      App.scene[b].rotation.rotateY(this.tRotation[x][1]);
      App.scene[b].rotation.rotateZ(this.tRotation[x][2]);
    }

  }

  accessBonesObject () {
    let onlyMine = [];
    matrixWorld.objListToDispose[0].contentList.forEach((MEObject) => {
      if (MEObject.name.indexOf(this.options.boneNameBasePrefix) != -1) {
         // console.log(MEObject)
         onlyMine.push(MEObject);
      }
    });
    return onlyMine;
  }

  constructSkeletal() {
    for (var x = 0; x < this.tPosition.length; x++) {
      var b = this.options.boneNameBasePrefix + this.skeletalKeys[x];
      // boneTex
      if (typeof this.options.boneTex != 'undefined') {
        // cubeLightTex
        const detTypeOfMEObject = (typeof this.options.drawTypeBone == 'undefined' ? 'cubeLightTex' : this.options.drawTypeBone);
        this.world.Add(detTypeOfMEObject, this.options.skeletalBoneScale, b, this.options.boneTex);
      } else {
        this.world.Add('cube', this.options.skeletalBoneScale, b);
      }
    }
    this.isConstructed = true;

    if (typeof this.options.skeletalBlend != 'undefined') {
      for (var x = 0; x < this.tPosition.length; x++) {
        var b = this.options.boneNameBasePrefix + this.skeletalKeys[x];
          App.scene[b].glBlend.blendEnabled = true;
          App.scene[b].glBlend.blendParamSrc = matrixEngine.utility.ENUMERATORS.glBlend.param[this.options.skeletalBlend.paramSrc];
          App.scene[b].glBlend.blendParamDest = matrixEngine.utility.ENUMERATORS.glBlend.param[this.options.skeletalBlend.paramDest];
        }
    }
  }

  constructFirstFrame() {
    if (this.isConstructed == false)  this.constructSkeletal();
    for (var x = 0; x < this.tPosition.length; x++) {
      var b = this.options.boneNameBasePrefix + this.skeletalKeys[x];
      App.scene[b].position.SetX(this.animation[0][1][x][0] + this.globalOffset[0]);
      App.scene[b].position.SetY(this.animation[0][1][x][1] + this.globalOffset[1]);
      App.scene[b].position.SetZ(this.animation[0][1][x][2] + this.globalOffset[2]);
      App.scene[b].rotation.rotateX(this.animation[1][1][x][0]);
      App.scene[b].rotation.rotateY(this.animation[1][1][x][1]);
      App.scene[b].rotation.rotateZ(this.animation[1][1][x][2]);
    }
  }

  playAnimation() {
    if (this.isConstructed == false) this.constructFirstFrame(this.options);
    if (this.animationTimer == null) {

      this.animationTimer = setInterval(()=> {

        for (var x = 0; x < this.tPosition.length; x++) {
          var b = this.options.boneNameBasePrefix + this.skeletalKeys[x];
          App.scene[b].position.SetX(this.animation[0][this.actualFrame][x][0] + this.globalOffset[0]);
          App.scene[b].position.SetY(this.animation[0][this.actualFrame][x][1] + this.globalOffset[1]);
          App.scene[b].position.SetZ(this.animation[0][this.actualFrame][x][2] + this.globalOffset[2]);
          App.scene[b].rotation.rotateX(this.animation[1][1][x][0]);
          App.scene[b].rotation.rotateY(this.animation[1][1][x][1]);
          App.scene[b].rotation.rotateZ(this.animation[1][1][x][2]);
        }

        if (this.options.loop == 'playInverse') {
          this.actualFrame = this.loopInverse.UPDATE();
        } else {
          this.actualFrame++;
        }

        if (this.actualFrame >= this.animation[0].length - 1) {
          if (this.options.loop == true) {
            this.actualFrame = 1;
          } else if (this.options.loop == 'stopOnEnd') {
            this.stopAnimation();
          } else if (this.options.loop == 'stopAndReset') {
            this.constructFirstFrame();
            this.actualFrame = 1;
            this.stopAnimation();
          }
        }

      }, this.options.myFrameRate);
    } else {
      console.warn("MEBvhAnimation: Animation already play.");
    }
  }

  stopAnimation() {
    clearInterval(this.animationTimer);
    this.animationTimer = null;
  }

}
