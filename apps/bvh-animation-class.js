
// prodc
// import MEBvh from 'bvh-loader';
import App from '../program/manifest';

/**
 * @description
 * First raw idea to make visible skeletal animation
 * from parsed bvh file.
 */
export var runThis = (world) => {

  // need to be removed from bvh-loader npm package!
  var logHTML = document.createElement('div');
  logHTML.id = 'log';
  document.body.appendChild(logHTML)

  const options = {
    world: world,
    autoPlay: false,
    type: 'ANIMATION', // "TPOSE",
    globalOffset: [-40, -10, -80]
  };

  const filePath = "https://raw.githubusercontent.com/zlatnaspirala/Matrix-Engine-BVH-test/main/javascript-bvh/example.bvh";

  var myFirstBvhAnimation = new matrixEngine.MEBvhAnimation(filePath, options)

  console.log(">>>>" , myFirstBvhAnimation)
  window.myFirstBvhAnimation= myFirstBvhAnimation;

  canvas.addEventListener('mousedown', (ev) => {
    matrixEngine.raycaster.checkingProcedure(ev);
  });

  addEventListener('ray.hit.event', function (e) {
    console.info(e.detail);
  });

};
