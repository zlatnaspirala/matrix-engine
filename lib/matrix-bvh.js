
/**
 * @description MatrixEngine BVH animation loader.
 * MEBvh comes from `npm i bvh-loader`.
 * @name `MEBvhAnimation`
 * @author Nikola Lukic
 * @async YES
 */

import MEBvh from '../node_modules/bvh-loader/index';

export default class MEBvhAnimation {

  constructor(path_, options) {

    if (typeof options === "undefined" ||
        typeof options.world === 'undefined') {
      console.error("MEBvhAnimation class error: No second argument options.");
      return;
    }

    if (typeof options.type === 'undefined') options.type = "ME-SKELETAL_POINT_BASE";
    if (typeof options.autoPlay === 'undefined') options.autoPlay = true;
    if (typeof options.boneNameBasePrefix === 'undefined') options.boneNameBasePrefix = "MatrixSkeletalBone";
    if (typeof options.globalOffset === 'undefined') options.globalOffset = [0,0,0];

    // passed
    this.options = options;
    this.world = options.world;
    this.globalOffset = options.globalOffset;

    this.anim = new MEBvh();
    this.tPose = null;
    this.skeletalKeys = null;
    this.animation = null;
    this.animationTimer = null;
    this.myFrameRate = 125;
    this.actualFrame = 1;

    this.anim.parse_file(path_).then(()=> {

      this.tPose = this.anim.frame_pose(0);
      this.tPosition = this.tPose[0];
      this.tRotation = this.tPose[1];
      this.skeletalKeys = this.anim.joint_names();
      this.animation = this.anim.all_frame_poses();

      if (options.autoPlay == true) {
        switch(options.type) {
          case 'TPOSE':
            this.constructSkeletalTPose();
            break;
          case 'ANIMATION':
            console.log("Type of skeletal 1")
            this.playAnimation();
            break;
          default:
            this.playAnimation();
        }
      }

    });

  }

  constructSkeletalTPose() {

    this.constructSkeletal(this.options);

    for (var x = 0; x < this.tPosition.length; x++) {
      var b = this.options.boneNameBasePrefix + this.skeletalKeys[x];
      App.scene[b].position.SetX(this.tPosition[x][0] + this.globalOffset[0]);
      App.scene[b].position.SetY(this.tPosition[x][1] + this.globalOffset[1]);
      App.scene[b].position.SetZ(this.tPosition[x][2] + this.globalOffset[2]);
    }

  }

  constructSkeletal() {

    for (var x = 0; x < this.tPosition.length; x++) {
      var b = this.options.boneNameBasePrefix + this.skeletalKeys[x];
      this.world.Add('cube', 1, b);
    }

  }

  constructFirstFrame() {
    this.constructSkeletal();
    for (var x = 0; x < this.tPosition.length; x++) {
      var b = this.options.boneNameBasePrefix + this.skeletalKeys[x];
      App.scene[b].position.SetX(this.animation[0][1][x][0] + this.globalOffset[0]);
      App.scene[b].position.SetY(this.animation[0][1][x][1] + this.globalOffset[1]);
      App.scene[b].position.SetZ(this.animation[0][1][x][2] + this.globalOffset[2]);
    }
  }

  playAnimation() {
    this.constructFirstFrame(this.options);
    if (this.animationTimer == null) {

      this.animationTimer = setInterval(()=> {

        for (var x = 0; x < this.tPosition.length; x++) {
          var b = this.options.boneNameBasePrefix + this.skeletalKeys[x];
          App.scene[b].position.SetX(this.animation[0][this.actualFrame][x][0] + this.globalOffset[0]);
          App.scene[b].position.SetY(this.animation[0][this.actualFrame][x][1] + this.globalOffset[1]);
          App.scene[b].position.SetZ(this.animation[0][this.actualFrame][x][2] + this.globalOffset[2]);

        }

        this.actualFrame++;
        if (this.actualFrame >= this.animation[0].length - 1) this.actualFrame = 1;

      }, this.myFrameRate);
    } else {
      console.warn("MEBvhAnimation: Animation already play.");
    }
  }

  stopAnimation() {
    clearInterval(this.animationTimer)
    this.animationTimer = null;
  }

}
