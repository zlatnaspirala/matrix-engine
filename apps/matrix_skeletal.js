
/**
 * @description Usage of MEBvhAnimation
 * @class MEBvhAnimation test MatrixBVHSkeletal pseudo bvh object follow.
 * @Note Human character failed for noe but func works.
 * Nice for primitive obj mesh bur rig must have nice description of 
 * position/rotation. In maximo skeletal bones simple not fit.
 * If you pripare bones you can get nice bvh obj adaptation for animations.
 * @arg filePath
 * @arg options
 */
export var runThis = (world) => {

  // need to be removed from bvh-loader npm package!
  // var logHTML = document.createElement('div');
  // logHTML.id = 'log';
  // logHTML.style.position = 'absolute';
  // document.body.appendChild(logHTML)

  // Camera
  App.camera.SceneController = true;
  
  const options = {
    world: world,                   // [Required]
    autoPlay: true,                 // [Optimal]
    showOnLoad: false,              // [Optimal] if autoPLay is true then showOnLoad is inactive.
    type: 'ANIMATION',              // [Optimal] 'ANIMATION' | "TPOSE'
    loop: 'playInverse',            // [Optimal] true | 'stopOnEnd' | 'playInverse' | 'stopAndReset'
    globalOffset: [-30, -180, -155],// [Optimal]  for 1.5 diff from obj seq anim
    skeletalBoneScale: 2,           // [Optimal]
		skeletalBoneScaleXYZ: [10,1,1],       // [Optimal]
    /*skeletalBlend: {                // [Optimal] remove arg for no blend
      paramDest: 4,
      paramSrc: 4
    },*/
    boneTex: {
      source: [
        "res/images/default/default-pink.png",
      ],
      mix_operation: "multiply",
    },
    drawTypeBone: "matrixSkeletal",
    matrixSkeletal: "res/bvh-skeletal-base/y-bot/matrix-skeletal/",
    objList: ['spine', 'hips', 'head'] ,

    matrixSkeletalObjScale: 80,          // [Optimal]

    // Can be predefined `MatrixSkeletal` prepared skeletal obj parts/bones.
    // Can be primitives:
    // pyramid | triangle | cube | square | squareTex | cubeLightTex | sphereLightTex

    // New optimal arg
    // Sometime we need more optimisation
    ignoreList: ['spine1'],
    ifNotExistDrawType: 'cubeLightTex'
  };

  // const filePath = "res/bvh-skeletal-base/swat-guy/bvh-export/swat.bvh";
  const filePath = "res/bvh/Female1_B04_StandToWalkBack.bvh";
  //
  // const filePath = "https://raw.githubusercontent.com/zlatnaspirala/Matrix-Engine-BVH-test/main/javascript-bvh/example.bvh";
  var myFirstBvhAnimation = new matrixEngine.MEBvhAnimation(filePath, options);

  window.myFirstBvhAnimation = myFirstBvhAnimation;

  canvas.addEventListener('mousedown', (ev) => {
    matrixEngine.raycaster.checkingProcedure(ev);
  });

  addEventListener('ray.hit.event', function (e) {
    console.info(e.detail.hitObject);
    e.detail.hitObject.glBlend.blendParamSrc = matrixEngine.utility.ENUMERATORS.glBlend.param[2];
    e.detail.hitObject.glBlend.blendParamDest = matrixEngine.utility.ENUMERATORS.glBlend.param[7];
  });

  // TEST SCALLE FAC
  const createObjSequence = (objName) => {

    function onLoadObj(meshes) {
      App.meshes = meshes;

      for(let key in meshes) {
        matrixEngine.objLoader.initMeshBuffers(world.GL.gl, meshes[key]);
      }

      var textuteImageSamplers2 = {
        source: [
          "res/bvh-skeletal-base/swat-guy/textures/Ch15_1001_Diffuse.png",
          "res/bvh-skeletal-base/swat-guy/textures/Ch15_1001_Diffuse.png"
        ],
        mix_operation: "multiply", // ENUM : multiply , divide
      };

      setTimeout(function() {
        var animArg = {
          id: objName,
          meshList: meshes,
          // sumOfAniFrames: 61, No need if `animations` exist!
          currentAni: 0,
          // speed: 3, No need if `animations` exist!
          // upgrade - optimal
          animations: {
            active: 'walk',
            walk: {
              from: 0,
              to: 35,
              speed: 3
            },
            walkPistol: {
              from: 36,
              to: 60,
              speed: 3
            }
          }
        };
        world.Add("obj", 1, objName,
          textuteImageSamplers2,
          meshes[objName],
          animArg
        );
        App.scene[objName].position.y = -1;
        App.scene[objName].position.z = -4;
        App.scene[objName].rotation.rotationSpeed.y = 50;
      }, 1);
    }

    matrixEngine.objLoader.downloadMeshes(
      matrixEngine.objLoader.makeObjSeqArg(
        {
          id: objName,
          path: "res/bvh-skeletal-base/swat-guy/anims/swat-multi",
          from: 1,
          to: 61
        }),
      onLoadObj
    );

  };

  window.createObjSequence = createObjSequence;

  // createObjSequence('player');
};
