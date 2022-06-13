
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

    if (typeof options === "undefined") {
      var options = {
        autoPlay: true,
        type: "ME-SKELETAL_POINT_BASE",
        boneNameBasePrefix: "MatrixSkeletalBone",
        globalOffset: [0,0,0]
      };
    }

    this.anim = new MEBvh();
    this.tPose = null;
    this.skeletalKeys = null;
    this.animation = null;
    this.animationTimer = null;

    anim.parse_file(path_).then(()=> {

      this.tPose = this.anim.frame_pose(0);
      this.tPosition = this.tPose[0];
      this.tRotation = this.tPose[1];
      this.skeletalKeys = anim.joint_names();
      this.animation = anim.all_frame_poses();

      if (options.autoPlay == true) {
        switch(options.type) {
          case 'ME-SKELETAL_POINT_BASE':
            console.log("Type of skeletal 1")
            this.constructSkeletal1(options);
        }
      }

    });

  }

  constructSkeletal1(options) {

    for (var x = 0; x < this.tPosition.length; x++) {
      var b = options.boneNameBasePrefix + this.skeletalKeys[x];
      world.Add('cube', 1, b);
    }

    for (var x = 0; x < r[0].length; x++) {
      var boneName = 'MatrixSkeletalBone' + KEYS[x];
      App.scene[boneName].position.SetX(r[0][x][0] - 30);
      App.scene[boneName].position.SetY(r[0][x][1] - 10);
      App.scene[boneName].position.SetZ(r[0][x][2] - 80);
    }

  }

  playAnimation() {

  }

}
