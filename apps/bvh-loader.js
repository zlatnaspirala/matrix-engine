
import * as matrixEngine from '../index.js';
// prodc
import MEBvh from 'bvh-loader';
// import MEBvh from '../node_modules/bvh-loader/index';

import App from '../program/manifest';

// import * as matrixEngine from '../index.js';

/**
 * @description
 * First raw idea to make visible skeletal animation
 * from parsed bvh file.
 */
export var runThis = (world) => {

  var logHTML = document.createElement('div');
  logHTML.id = 'log';
  document.body.appendChild(logHTML)

  var anim = new MEBvh();

  anim.parse_file('https://raw.githubusercontent.com/zlatnaspirala/bvh-loader/main/javascript-bvh/example.bvh').then(() => {
    console.info('plot_hierarchy no function');
    anim.plot_hierarchy();

    var r = anim.frame_pose(0);

    var KEYS = anim.joint_names();
    for (var x = 0; x < r[0].length; x++) {
      console.log('->' + KEYS[x] + '-> position: ' + r[0][x] + ' rotation: ' + r[1][x]);
      var boneName = 'MatrixSkeletalBone' + KEYS[x];
      world.Add('cube', 1, boneName);
    }

    for (var x = 0; x < r[0].length; x++) {
      var boneName = 'MatrixSkeletalBone' + KEYS[x];
      App.scene[boneName].position.SetX(r[0][x][0] - 30);
      App.scene[boneName].position.SetY(r[0][x][1] - 10);
      App.scene[boneName].position.SetZ(r[0][x][2] - 80);
    }

    var all = anim.all_frame_poses();
    console.log("Final animation -> ", all);
    var countAnim = 0;
    setInterval(() => {
      // for (var ANIM_ = countAnim; ANIM_ < 75; ANIM_++) {
        for (var x = 0; x < all[0][0].length; x++) {
          var boneName = 'MatrixSkeletalBone' + KEYS[x];
          App.scene[boneName].position.SetX(all[0][countAnim][x][0] - 30);
          App.scene[boneName].position.SetY(all[0][countAnim][x][1] - 10);
          App.scene[boneName].position.SetZ(all[0][countAnim][x][2] - 80);
        }

      countAnim++;
      if (countAnim >= all[0].length - 1) countAnim = 0;
      
    }, 100);
  });

  canvas.addEventListener('mousedown', (ev) => {
    matrixEngine.raycaster.checkingProcedure(ev);
  });

  addEventListener('ray.hit.event', function (e) {
    console.info(e.detail);
  });

};
