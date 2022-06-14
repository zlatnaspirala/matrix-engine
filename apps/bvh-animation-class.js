
/**
 * @description Usage of MEBvhAnimation
 * @class MEBvhAnimation
 * @arg filePath
 * @arg options
 */
export var runThis = (world) => {

  // need to be removed from bvh-loader npm package!
  var logHTML = document.createElement('div');
  logHTML.id = 'log';
  document.body.appendChild(logHTML)

  const options = {
    world: world,
    autoPlay: true,
    showOnLoad: false, // if autoPLay is true then showOnLoad is inactive.
    type: 'ANIMATION', // "TPOSE' | 'ANIMATION'
    loop: 'playInverse', // true | 'stopOnEnd' | 'playInverse' | 'stopAndReset'
    globalOffset: [-10, -10, -45],
    skeletalBoneScale: 0.35,
    skeletalBlend: { paramDest: 4, paramSrc: 4 } // remove arg for no blend
  };

  const filePath = "https://raw.githubusercontent.com/zlatnaspirala/Matrix-Engine-BVH-test/main/javascript-bvh/example.bvh";
  var myFirstBvhAnimation = new matrixEngine.MEBvhAnimation(filePath, options);

  const options2 = {
    world: world,
    autoPlay: true,
    showOnLoad: false, // if autoPLay is true then showOnLoad is inactive.
    type: 'ANIMATION', // "TPOSE' | 'ANIMATION'
    loop: 'playInverse', // true | 'stopOnEnd' | 'playInverse' | 'stopAndReset'
    globalOffset: [-30, -150, -355],
    skeletalBoneScale: 10.35,
    boneNameBasePrefix: 'backWalk',
    skeletalBlend: { paramDest: 4, paramSrc: 7 } // remove arg for no blend
  };


  const filePath2 = "res/bvh/Female1_B04_StandToWalkBack.bvh";
  var myBvhAnimation = new matrixEngine.MEBvhAnimation(filePath2, options2);
  

  console.log("<myBvhAnimation> try it => " , myBvhAnimation);
  //window.myFirstBvhAnimation= myFirstBvhAnimation;

  canvas.addEventListener('mousedown', (ev) => {
    matrixEngine.raycaster.checkingProcedure(ev);
  });

  addEventListener('ray.hit.event', function (e) {
    console.info(e.detail.hitObject);
    e.detail.hitObject.glBlend.blendParamSrc = matrixEngine.utility.ENUMERATORS.glBlend.param[2];
    e.detail.hitObject.glBlend.blendParamDest = matrixEngine.utility.ENUMERATORS.glBlend.param[7];
  });

};
