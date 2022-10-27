
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
  // logHTML.style.position = 'absolute';
  document.body.appendChild(logHTML)

  const options = {
    world: world,                   // [Required]
    autoPlay: true,                 // [Optimal]
    showOnLoad: false,              // [Optimal] if autoPLay is true then showOnLoad is inactive.
    type: 'ANIMATION',              // [Optimal] 'ANIMATION' | "TPOSE'
    loop: 'playInverse',            // [Optimal] true | 'stopOnEnd' | 'playInverse' | 'stopAndReset'
    globalOffset: [-10, -14, -45],  // [Optimal]
    skeletalBoneScale: 1,        // [Optimal]
    /*skeletalBlend: {                // [Optimal] remove arg for no blend
      paramDest: 4,
      paramSrc: 4
    },*/
    boneTex: {
      source: [
        "res/images/sky/blue.jpg",
      ],
      mix_operation: "multiply",
    },
    drawTypeBone: "sphereLightTex" // pyramid | triangle | cube | square | squareTex | cubeLightTex | sphereLightTex
  };

  const filePath = "https://raw.githubusercontent.com/zlatnaspirala/Matrix-Engine-BVH-test/main/javascript-bvh/example.bvh";
  var myFirstBvhAnimation = new matrixEngine.MEBvhAnimation(filePath, options);

  const options2 = {
    world: world,
    autoPlay: true,
    myFrameRate: 20,
    showOnLoad: false, // if autoPLay is true then showOnLoad is inactive.
    type: 'ANIMATION', // "TPOSE' | 'ANIMATION'
    loop: 'playInverse', // true | 'stopOnEnd' | 'playInverse' | 'stopAndReset'
    globalOffset: [-30, -180, -155],
    skeletalBoneScale: 6,
    boneNameBasePrefix: 'backWalk',
    skeletalBlend: { paramDest: 7, paramSrc: 6 }, // remove arg for no blend
    speed: 1,
    boneTex: {
      source: [
        "res/icons/512.png"
      ],
      mix_operation: "multiply",
    },
    drawTypeBone: 'squareTex' // pyramid | triangle | cube | square | squareTex | cubeLightTex | sphereLightTex'
  };

  window.myFirstBvhAnimation = myFirstBvhAnimation;


  const filePath2 = "res/bvh/Female1_B04_StandToWalkBack.bvh";
  var myBvhAnimation = new matrixEngine.MEBvhAnimation(filePath2, options2)
  
  var funnySwitch = new matrixEngine.utility.OSCILLATOR(0, 0.1 , 0.0001);

  setTimeout( () => {
  // make funny staff with matrix-engine
   myBvhAnimation.accessBonesObject().forEach(bone => {

     // bone is MEObject [matrix-engine game object],
     // instancedDraws.overrideDrawArraysInstance is part of webgl2
    // bone.instancedDraws.numberOfInstance = 2;
    // bone.instancedDraws.overrideDrawArraysInstance = function (object) {
    //   for (var i = 0; i < object.instancedDraws.numberOfInstance; i++) {
    //     // object.instancedDraws.array_of_local_offset = [0, 0, 18];
    //     object.instancedDraws.array_of_local_offset = [funnySwitch.UPDATE(), funnySwitch.UPDATE(), 0];
    //     mat4.translate(object.mvMatrix, object.mvMatrix, object.instancedDraws.array_of_local_offset);
    //     world.setMatrixUniforms(object, world.pMatrix, object.mvMatrix);
        
    //     for (var j = 0; j < object.instancedDraws.numberOfInstance; j++) {
    //       mat4.translate(object.mvMatrix, object.mvMatrix, object.instancedDraws.array_of_local_offset);
    //       world.setMatrixUniforms(object, world.pMatrix, object.mvMatrix);
    //       world.GL.gl.drawElements(world.GL.gl[object.glDrawElements.mode], object.glDrawElements.numberOfIndicesRender, world.GL.gl.UNSIGNED_SHORT, 0);
    //     }
    //   }
    // };


   });
  }, 250 )

  console.log("<myBvhAnimation> try it => " , myBvhAnimation);
  window.myBvhAnimation= myBvhAnimation;

  canvas.addEventListener('mousedown', (ev) => {
    matrixEngine.raycaster.checkingProcedure(ev);
  });

  addEventListener('ray.hit.event', function (e) {
    console.info(e.detail.hitObject);
    e.detail.hitObject.glBlend.blendParamSrc = matrixEngine.utility.ENUMERATORS.glBlend.param[2];
    e.detail.hitObject.glBlend.blendParamDest = matrixEngine.utility.ENUMERATORS.glBlend.param[7];
  });

};
