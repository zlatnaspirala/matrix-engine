![webGL2GLMatrix2](https://github.com/zlatnaspirala/webgl2-glmatrix2-engine/blob/master/non-project-files/webgl2glmatrix2.jpg)

## About Matrix Engine project

### Name: `MATRIX-ENGINE` `1.9.43` THUNDER

#### Logo

<img src="https://github.com/zlatnaspirala/matrix-engine/blob/master/public/res/icons/ms-icon.png" width="128" height="128" />

### STATUS

#### - [Integrated PWA addToHomePage/cache/] ✔

#### - [Integrated raycast (hit trigger detect), bvh animation] ✔

#### - [Basic Physics implementation based on cannon.js] ✔

#### - [FirstPersonController fly or classic fp / SceneController Drag and navigation scene] ✔

#### - [Basic's Shadows vs lights (GLSL)] ✔

#### - [Migrated to the opengles300] ✔

#### - [FBO implemented] ✔

#### - [Add cef (linux, macos) and cefSharp Visual Studio projects for building executive desktop native apps. ✔

#### Support: Windows, MAC, Linux ] ✔

#### - Texture Editor [tutorial example - from code] ✔

#### - MatrixEngineTexture GUI Editor [UNDERCONSTRUCTION]

#### - Swicthing GLSL ver - webGL1 / webGL2 ✔

#### - OffScreenCanvas ✔

### Description ℹ

This is small but inspiring project.
The benefits of this project is offering an overview of the entire opengles program logic,
easy native implementations (hybrid app/ CEF), object structural. Thanks to Mr.Keestu i use
(gl-program-structure) new version of glmatrix (2.0). Push&Pop matrix just like in
opengles 1.1. Also can be downgraded to openGLES 1.1. webGL Lightweight library based on glmatrix engine.
For multiplayer used webRTC done with io socket. Physics done with last version of cannon.js. I use free software Blender 2.90.1 for 3d Object mesh works. MatrixEngine is Blender frendly orientend lib. Another frendly tools comes from mixamo.com. Mixamo is great service used for creating my 3d assets. GIMP and MsPaint
also used for editing images. Networking is part of matrix engine, deeply integrated. Used webRTC reala time protocol. Powered by webGL vs webRTC!

### Limitation ⚠

- Basic implementation for physics (Cube, Sphere).
- Only static object cast spot light in right way for now.
- Need general more improvement on GLSL part.

### Next Features 🔜

- General improvements in Lights section.
  Shaders must be improved based on work.
  More examples code.
  Links -> https://webglfundamentals.org/webgl/lessons/

### For npm users recommended

- Use starter project:
  https://github.com/zlatnaspirala/matrix-engine-starter

  with command:

  ```js
  npm i
  npm run build.all
  ```

  Project template in `matrix-engine-starter`

  - Slot Mashine [WIP]
    https://maximumroulette.com/apps/matrix-engine-starter/projects/matrix-slot/index.html

  - Matrix roulette [WIP]
    https://maximumroulette.com/apps/matrix-engine-starter/projects/matrix-roulette/

  - Web Anatomy [WIP]
    https://maximumroulette.com/apps/matrix-engine-starter/projects/web-anatomy/

### Live Demos

- https://maximumroulette.com/apps/matrix-engine/examples-build.html
- https://maximumroulette.com/apps/matrix-engine/app-build.html
- https://fps-matrix-engine.vercel.app

#### How to use it from npm services [codepen examples]

[1.7.9] Lights - Who to use matrix-engine on codepen:

- https://codepen.io/zlatnaspirala/full/OJZXMWR

  BHV Pseudo Skeletal animation:

- https://codepen.io/zlatnaspirala/full/OJQdGVM

  Physics (cannon.js)

- https://codepen.io/zlatnaspirala/pen/rNvLGxE?editors=0010

### Install dependencies

Matrix engine keep minimum dependency.

- uglify-js, minify
- browserify, watchify

```js
  npm run install.dep
  npm i
```

@Note: For windows users maybe you will need to add `browserify` to the env PATH
if you got errors on commands `npm run build.*`.

## Help for localhost dev stage

### Build Application bundle script

From [1.8.0] you can use build for develop with watch task:

```js
npm run examples
```

```js
npm run app
```

@Note: If you use unsecured `http` protocol no build needed at all just navigate to the `html` file who loade script with type=`module`. No need for this any more but you can use it.

For production/public server you will use npm run build.XXX commands. and then upload project to the
usually `/var/www/html/`.

- `app-build.html` , `examples-build.html` loads compiled javascript type `text/javascript`.

- Build entry App.js

```js
  npm run build.app
```

Now navigate to the `app-build.html` page.

- Build entry App-Examples.js

```js
  npm run build.examples
```

Now navigate to the `examples-build.html` page.

- Build just library

```js
  npm run build.lib
```

- Build with uglify

```js
build.app.ugly;
```

- Build ALL

```js
build.all;
```

After all for production is recommended to use compressed script.

- Production Final (bash):

```bash
./compress
```

### Switch example with url params

- Usefull also for production for switching whole pages/apps.
  https://localhost/matrix-engine/query.html?u=adding_color_cube

  https://localhost/matrix-engine/query-build.html?u=adding_color_cube

URL Params - code access:

```js
const QueryString = matrixEngine.utility.QueryString;
```

To avoid iframe from examples.html you can use `query-build.html?u=<NAME_OF_EXAMPLE>`
 ->  `query-build.html?u=fbo_manipulation`

### List of examples:

- Adding color cube
- Adding color pyramyde
- Adding color square
- Adding tex square with raycast
- Adding color triangle
- Adding geometry
- Adding multi (compose) textures
- Adding square texture
- Blending
- Audion manipulation
- Camera texture (stream texture)
- Cube
- Cube Geometry
- Cube Light & texture
- Cube light dynamic
- Custom texture
- First Person controller
- Load obj files - UV maps
- Object animation -morh sequence
- Object animation mesh indices calculation
- JS1Kilo examples implementation
- Porting 2D canvas (Active textures)
- Sphere geometry
- Texture uv manipulation
- Videos textures
- Physics Cube with force on raycast trigger
- 100 Physics Cube with [canvas2d] funny-slot
- Physics Sphere
- BVH loader, animation play
- Load obj sequences
- FPShooter example (+Sounds) [WIP]
- specular_light_basic -> global light position test [WIP]
- Lens effect shaders for cube [WIP]
- Basic FBO + timeline test [WIP]
- Matrix Video Chat - webGL vs webRTC
- FBO manipulation - Multi FBO objects

## Features description

### Camera config

In `./program/manifest.js`. Access is `App.camera`.
Note: One of params `FirstPersonController` or `SceneController` must be `false`.

- `FirstPersonController` is classic first person view with movement WASD and mouse look.
- `SceneController` use direct input WASD. To make camera angle view change press `shift` to enable camera angle. Middle mouse button will enable drag scene to left/right/top/down.
  Mouse middle wheel change work only when `shift` is pressed.

```js
  camera: {
    viewAngle: 45,
    nearViewpoint: 0.1,
    farViewpoint: 1000,
    edgeMarginValue: 100,
    FirstPersonController: false,
    SceneController: false,
    sceneControllerDragAmp: 0.1,
    sceneControllerDragAmp: 0.1,
    speedAmp: 0.5,
    sceneControllerEdgeCameraYawRate: 3,
    sceneControllerWASDKeysAmp: 0.1
  },
```

Range of `matrixEngine.Events.camera.pitch` in ForstPersonController is (-33 to 33).

To get access for camera use `matrixEngine.Events.camera`.
Typically looks:

```js
{
  "roll": 0,
  "rollRate": 0,
  "rallAmp": 0.05,
  "pitch": 0.24500000000000632,
  "pitchRate": 0,
  "yaw": -6945.400000016527,
  "yawRate": 0,
  "xPos": 5.1753983300242155,
  "yPos": 2,
  "zPos": -21.90917813969003,
  "speed": 0,
  "yawAmp": 0.05,
  "pitchAmp": 0.007
}
```

### Light And Shadows [1.7.6]

`activateShadows` works only for cube for now.

```js
world.Add('cubeLightTex', 1, 'myCube4', textuteImageSamplers);
App.scene.myCube4.activateShadows();
App.scene.myCube4.shadows.activeUpdate();
App.scene.myCube4.shadows.animatePositionY();
```

If you wanna color vertex but with direction and ambient light then:

```js
// Simple direction light
world.Add('cubeLightTex', 1, 'myCube7', textuteImageSamplersTest);
App.scene.myCube7.position.setPosition(3, 3, -11);
App.scene.myCube7.geometry.colorData.SetGreenForAll(0.5);
App.scene.myCube7.geometry.colorData.SetRedForAll(0.5);
App.scene.myCube7.geometry.colorData.SetBlueForAll(0.5);
App.scene.myCube7.deactivateTex();
```

Make square pattern

```js
// Custom generic textures. Micro Drawing.
// Example for arg shema square for now only.
var options = {
  squareShema: [4, 4],
  pixels: new Uint8Array(4 * 4 * 4),
  style: {
    type: 'chessboard',
    color1: 0,
    color2: 255
  }
};

App.scene.myCube9.textures.push(App.scene.myCube9.createPixelsTex(options));
```

![](https://github.com/zlatnaspirala/matrix-engine/blob/dev/non-project-files/1.7.6.png)

### Physics

Physics based on cannon.js

Support list : 😇

- cube
- sphere

Example with physics and raycast hit detect:

```js
App.camera.SceneController = true;

canvas.addEventListener('mousedown', (ev) => {
  matrixEngine.raycaster.checkingProcedure(ev);
});

window.addEventListener('ray.hit.event', (ev) => {
  console.log('You shoot the object! Nice!', ev);

  /**
   * Physics force apply
   */
  if (ev.detail.hitObject.physics.enabled == true) {
    ev.detail.hitObject.physics.currentBody.force.set(0, 0, 1000);
  }
});

var tex = {
  source: ['res/images/complex_texture_1/diffuse.png'],
  mix_operation: 'multiply'
};

// Load Physics world!
let gravityVector = [0, 0, -9.82];
let physics = world.loadPhysics(gravityVector);
// Add ground
physics.addGround(App, world, tex);
world.Add('cubeLightTex', 1, 'CUBE', tex);
var b = new CANNON.Body({
  mass: 5,
  position: new CANNON.Vec3(0, -15, 2),
  shape: new CANNON.Box(new CANNON.Vec3(1, 1, 1))
});
physics.world.addBody(b);
// Physics
App.scene.CUBE.physics.currentBody = b;
App.scene.CUBE.physics.enabled = true;

const objGenerator = (n) => {
  for (var j = 0; j < n; j++) {
    setTimeout(() => {
      world.Add('cubeLightTex', 1, 'CUBE' + j, tex);
      var b2 = new CANNON.Body({
        mass: 1,
        linearDamping: 0.01,
        position: new CANNON.Vec3(1, -14.5, 15),
        shape: new CANNON.Box(new CANNON.Vec3(1, 1, 1))
      });

      physics.world.addBody(b2);
      App.scene['CUBE' + j].physics.currentBody = b2;
      App.scene['CUBE' + j].physics.enabled = true;
    }, 1000 * j);
  }
};

objGenerator(100);
```

### Networking [1.8.0]

@Note Folder `networking/` containe Backend stuff based on Node.js. This folder have own package.json (matrix-network).In basic it is a signaling server who give as features like videoChat, multiplayer data flow etc.

Networking based on webRTC. If you wanna use `multiplayer mode` you need to run intro
folder `networking/` next commands:

```js
 npm i
 node matrix-server.js
```

#### Networking Support Methods list: ✅😇

Networking is deeply integrated no need for extra interventions.
Except activation.

```js
App.scene.MyColoredSquare1.net.enable = true;
App.scene.MyColoredSquare1.net.activate();

// Now MyColoredSquare1 is net replicated on others clients.
App.scene.MyColoredSquare1.position.SetZ(-8);
```

- Any scene object:

➡ position SetX() SetY() SetZ()

➡ rotation.rotateX() rotateY() rotateZ()

- Cube, Sphere, Square

➡ geometry.setScale()

➡ geometry.setScaleByY()

➡ geometry.setScaleByZ()

➡ geometry.setScaleByZ()

➡ geometry.setTexCoordScaleFactor()

- Pyramid

➡ geometry.setScale()

➡ geometry.setSpitz()

#### Networking also can be used for video chat

Matrix server is broadcaster/signaling server based on NODE.js
Perfect for serverless methodology.

- See example matrix_chat_room.js

#### Networking minimal example

```js
export var runThis = (world) => {
  world.Add('pyramid', 1, 'MyCubeTex');
  world.Add('square', 1, 'MyColoredSquare1');
  // Must be activate
  matrixEngine.Engine.activateNet();
  // Must be activate for scene objects also.
  // This is only to force avoid unnecessary networking emit!
  App.scene.MyCubeTex.net.enable = true;
  App.scene.MyCubeTex.net.activate();
  App.scene.MyColoredSquare1.net.enable = true;
  App.scene.MyColoredSquare1.net.activate();
  // Just call it normally
  App.scene.MyCubeTex.position.SetZ(-8);
  App.scene.MyColoredSquare1.position.SetZ(-8);
};
```

It is perfect solution webGL vs webRTC. Origin code used `broadcaster class` from visual-ts game engine project.

If yor wann inject your own client config:
`matrixEngine.Engine.activateNet(CustomClientConfig);`

Also matrix-network support inject method intro yor own custom server logic part.
Example for this case:
https://github.com/zlatnaspirala/matrix-engine-starter/blob/8fccc3ba5d4aa21b7c24794251a2fceed97cbb30/projects/matrix-roulette/scripts/roulette.js#L208

### Custom textures

We just override function for texture executing code.
Next level is full custom opportunity, geometry, collision, networking etc.

```js
App.scene.MySquareTexure1.custom.gl_texture = function (object, t) {
  world.GL.gl.bindTexture(world.GL.gl.TEXTURE_2D, object.textures[t]);
  world.GL.gl.texParameteri(world.GL.gl.TEXTURE_2D, world.GL.gl.TEXTURE_MAG_FILTER, world.GL.gl.LINEAR);
  world.GL.gl.texParameteri(world.GL.gl.TEXTURE_2D, world.GL.gl.TEXTURE_MIN_FILTER, world.GL.gl.LINEAR);
  world.GL.gl.texParameteri(world.GL.gl.TEXTURE_2D, world.GL.gl.TEXTURE_WRAP_S, world.GL.gl.CLAMP_TO_EDGE);
  world.GL.gl.texParameteri(world.GL.gl.TEXTURE_2D, world.GL.gl.TEXTURE_WRAP_T, world.GL.gl.CLAMP_TO_EDGE);

  world.GL.gl.texImage2D(
    world.GL.gl.TEXTURE_2D,
    0, // Level of details
    world.GL.gl.RGBA, // Format
    world.GL.gl.RGBA,
    world.GL.gl.UNSIGNED_BYTE, // Size of each channel
    object.textures[t].image
  );

  world.GL.gl.generateMipmap(world.GL.gl.TEXTURE_2D);
};
```

### Opengles native `cubeMap` [1.8.5]

- If you wanna custom canvasd2d draws for aech cube side
  New tag `cubeMap` takes texture.source empty array.

Canvas2d Example:

```js
/**
 * @description
 * What ever you want!
 * It is 2dCanvas context draw func.
 */
function myFace(args) {
  const {width, height} = this.cubeMap2dCtx.canvas;
  this.cubeMap2dCtx.fillStyle = args[0];
  this.cubeMap2dCtx.fillRect(0, 0, width, height);
  this.cubeMap2dCtx.font = `${width * args[2]}px sans-serif`;
  this.cubeMap2dCtx.textAlign = 'center';
  this.cubeMap2dCtx.textBaseline = 'middle';
  this.cubeMap2dCtx.fillStyle = args[1];
  this.cubeMap2dCtx.fillText(args[3], width / 2, height / 2);
}

var tex = {
  source: [],
  mix_operation: 'multiply',
  cubeMap: {
    type: '2dcanvas',
    drawFunc: myFace,
    sides: [
      // This is custom access you can edit but only must have
      // nice relation with your draw function !
      // This is example for render 2d text in middle-center manir.
      // Nice for 3d button object!
      {faceColor: '#F00', textColor: '#28F', txtSizeCoeficient: 0.8, text: 'm'},
      {faceColor: '#FF0', textColor: '#82F', txtSizeCoeficient: 0.5, text: 'a'},
      {faceColor: '#0F0', textColor: '#82F', txtSizeCoeficient: 0.5, text: 't'},
      {faceColor: '#0FF', textColor: '#802', txtSizeCoeficient: 0.5, text: 'r'},
      {faceColor: '#00F', textColor: '#8F2', txtSizeCoeficient: 0.5, text: 'i'},
      {faceColor: '#F0F', textColor: '#2F8', txtSizeCoeficient: 0.5, text: 'x'}
    ]
  }
};
```

Classic images:

- If you wanna load images, see example:

```js
world.cubeMapTextures(['res/images/cube/1.png', 'res/images/cube/2.png', 'res/images/cube/3.png', 'res/images/cube/4.png', 'res/images/cube/5.png', 'res/images/cube/6.png'], (imgs) => {
  var tex = {
    source: [...imgs],
    mix_operation: 'multiply',
    cubeMap: {
      type: 'images'
    }
  };
  world.Add('cubeMap', 1, 'myCubeMapObj', tex);
});
```

### BVH Matrix Skeletal [1.5.0]

- New deps pack `bvh-loader`. It is bvh parser created for matrix-engine
  but can be used for any other graphics language.

```js
const options = {
  world: world,
  autoPlay: true,
  myFrameRate: 10,
  showOnLoad: false, // if autoPLay is true then showOnLoad is inactive.
  type: 'ANIMATION', // "TPOSE' | 'ANIMATION'
  loop: 'playInverse', // true | 'stopOnEnd' | 'playInverse' | 'stopAndReset'
  globalOffset: [-30, -180, -155],
  skeletalBoneScale: 6,
  boneNameBasePrefix: 'backWalk',
  skeletalBlend: {paramDest: 7, paramSrc: 6}, // remove arg for no blend
  boneTex: {
    source: ['res/icons/512.png'],
    mix_operation: 'multiply'
  },
  // pyramid | triangle | cube | square | squareTex | cubeLightTex | sphereLightTex'
  drawTypeBone: 'squareTex'
};

const filePath = 'https://raw.githubusercontent.com/zlatnaspirala/bvh-loader/main/javascript-bvh/example.bvh';

var myFirstBvhAnimation = new matrixEngine.MEBvhAnimation(filePath, options);
```

#### Live demo https://codepen.io/zlatnaspirala/pen/OJQdGVM

### Raycast

- cube , square, triangle, obj (ObjLoader) [1.8.4]
  From 1.8.4 raycast hit trigger works for obj's.

Raycast works fine also in firstPersonCamera operation.
Raycast work perfect after local single rotation x, y, or z.
Combination rotx and roty works , roty and rotz only with rotx = 180 for now.
Bug if walk behind object then turn arround and try raycast but no work for now.

- Usage:

```js
canvas.addEventListener('mousedown', (ev) => {
  matrixEngine.raycaster.checkingProcedure(ev);
});

canvas.addEventListener('ray.hit.event', (ev) => {
  alert('You shoot the object! Nice');
});
```

### First person controller:

If you activate this flag you get fly/free camera controller by default.

```js
// In one line activate also deactivate.
App.camera.FirstPersonController = true;
```

### Animated female droid (morph targets):

```js
// Obj Loader
function onLoadObj(meshes) {

  // No need from [1.8.2]
  // App.meshes = meshes;
  for (const key in App.meshes) {
    matrixEngine.objLoader.initMeshBuffers(world.GL.gl, App.meshes[key]);
  }

  textuteImageSamplers2 = {
    source: ['res/images/RustPaint.jpg'],
    mix_operation: 'multiply'
  };

  setTimeout(function () {
    var animation_construct = {
      id: 'female',
      meshList: meshes, // from [1.8.2]
      sumOfAniFrames: 18,
      currentAni: 0,
      speed: 3
    };

    world.Add('obj', 1, 'female', textuteImageSamplers2, App.meshes.female, animation_construct);

    App.scene.female.position.y = -3;
    App.scene.female.rotation.rotationSpeed.z = 20;
    App.scene.female.position.z = -13;
    // App.scene.armor.mesh.setScale(5)
  }, 100);
}

// Custom list 1, 3, 5, 9
matrixEngine.objLoader.downloadMeshes(
  {
    female: 'res/3d-objects/female/female_000001.obj',
    female1: 'res/3d-objects/female/female_000003.obj',
    female2: 'res/3d-objects/female/female_000005.obj',
    female3: 'res/3d-objects/female/female_000009.obj',
    ...
  },
  onLoadObj
);

// From [1.8.2] you can use `makeObjSeqArg`
matrixEngine.objLoader.downloadMeshes(
  matrixEngine.objLoader.makeObjSeqArg(
    { id: objName,
      path: "res/bvh-skeletal-base/swat-guy/seq-walk/low/swat",
      from : 1, to: 34 }),
  onLoadObj
);

```

### Blending:

```js
// Use it
App.scene.female.glBlend.blendEnabled = true;
App.scene.female.glBlend.blendParamSrc = ENUMERATORS.glBlend.param[4];
App.scene.female.glBlend.blendParamDest = ENUMERATORS.glBlend.param[4];
```

- Load Obj with UV map (Blender export tested):

For more details dee this example script: `load_obj_file.js`

### Video texture:

New way: There is no prefix for path any more. Fixed autoplay on `AFTRE FIRST CLICK`. Multi textures loading. Video texture corespond with direction & ambient light. Important
it is direct pass from video to webgl textures. No canvad2d context.
NOT WORKING with shadows for now.

```js
App.scene.outsideBox.streamTextures = new VT('res/video-texture/lava1.mkv');
```

TODO: Add arg { mixWithCanvas2d }

Old way [still present]:

```js
world.Add('cubeLightTex', 1, 'TV', textuteImageSamplers, App.meshes.TV);
App.scene.TV.streamTextures = new VIDEO_TEXTURE('Galactic Expansion Fractal Morph [Official Video]');
```

### Camera texture:

```js
App.scene.TV.streamTextures = new ACCESS_CAMERA('webcam_beta');
```

### MatrixBVHCharacter (MEBvhAnimation)

MatrixBVHCharacter feature use class `matrixEngine.MEBvhAnimation`.
Its load primitives for bvh skeletal. MatrixBVHCharacter is proccess
where we load pre defined skelatal obj parts(head, neck, legs...) .

#### @Note Human character failed for now but func works.

Nice for primitive obj mesh bur rig must have nice description of
position/rotation. In maximo skeletal bones simple not fit.
If you pripare bones you can get nice bvh obj adaptation for animations.
mocap set of assets looks better for this operation.

#### Example Code:

```js
const options = {
  world: world, // [Required]
  autoPlay: true, // [Optimal]
  showOnLoad: false, // [Optimal] if autoPLay is true then showOnLoad is inactive.
  type: 'ANIMATION', // [Optimal] 'ANIMATION' | "TPOSE'
  loop: 'playInverse', // [Optimal] true | 'stopOnEnd' | 'playInverse' | 'stopAndReset'
  globalOffset: [-30, -180, -155], // [Optimal]  for 1.5 diff from obj seq anim
  skeletalBoneScale: 2, // [Optimal]
  /*skeletalBlend: {               // [Optimal] remove arg for no blend
      paramDest: 4,
      paramSrc: 4
    },*/
  boneTex: {
    source: ['res/images/default/default-pink.png'],
    mix_operation: 'multiply'
  },
  drawTypeBone: 'matrixSkeletal',
  matrixSkeletal: 'res/bvh-skeletal-base/y-bot/matrix-skeletal/',
  objList: ['spine', 'hips', 'head'],

  matrixSkeletalObjScale: 80, // [Optimal]

  // Can be predefined `MatrixSkeletal` prepared skeletal obj parts/bones.
  // Can be primitives:
  // pyramid | triangle | cube | square | squareTex | cubeLightTex | sphereLightTex

  // New optimal arg
  // Sometime we need more optimisation
  ignoreList: ['spine1'],
  ifNotExistDrawType: 'triangle'
};

const filePath = 'res/bvh/Female1_B04_StandToWalkBack.bvh';
var myFirstBvhAnimation = new matrixEngine.MEBvhAnimation(filePath, options);
```

This is folder for obj parts (head arm legs ...)
Filenames are simplefield like head.obj , arm.obj without any prefix from constructor...

matrixSkeletal: "res/bvh-skeletal-base/y-bot/matrix-skeletal/",

Take a look example: `matrix_skeletal.js`.

### Character (ObjLoader/morph targets)

This good in runtime bad for loading procedure.

How to update character animation?
Maximo -> download dea or fbx -> import intro blender
Import multi or one animation. -> blender export -> obj (animation)

<img src="https://github.com/zlatnaspirala/matrix-engine/blob/develop/non-project-files/character1.png" width="528" height="528" />

This is new feature from [1.8.2].
Take a look at : load_obj_sequence.js

For now engine use objLoader to load all morphs.

```js
matrixEngine.objLoader.downloadMeshes(
  matrixEngine.objLoader.makeObjSeqArg({
    id: objName,
    path: 'res/bvh-skeletal-base/swat-guy/anims/swat-multi',
    from: 1,
    to: 61
  }),
  onLoadObj
);
```

In `onLoadObj` callback function:

```js
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
```

### FirstPersonShooter examples [WIP]

- Just like in eu4 shooter we dont need whole character mesh for FPSHooter view. I cut off no hands vertices in blender to make optimised flow.
- Added basic Jumping with physics

From [1.8.15]

- 'hit.keyDown' && 'hit.keyUp' dispatch events added. See FPS Example.
- Added basic JUMP with physics / not calibrated.

```js
addEventListener('hit.keyDown', (e) => {
  // console.log('Bring to the top level', e.detail.keyCode);
});
```

Feature [1.8.12] App.events Access.
Take a look at the `apps\fps_player_controller.js` example.

```js
App.events.CALCULATE_TOUCH_DOWN_OR_MOUSE_DOWN = (ev, mouse) => {
  // From [1.8.12]
  // checkingProcedure gets secound optimal argument
  // for custom ray origin target.
  // mouse
  console.log(mouse.BUTTON);
  if (mouse.BUTTON_PRESSED == 'RIGHT') {
    // Zoom
  } else {
    // This call represent `SHOOT` Action.
    // And it is center of screen
    matrixEngine.raycaster.checkingProcedure(ev, {
      clientX: ev.target.width / 2,
      clientY: ev.target.height / 2
    });
  }
};
```

WIP calculating for fixing FPS camera view.

[1.8.11] New 3dObject property `isHUD`.
If you setup this to the `true` value object will escape world rotation/translation.
Only local translation is active. This is good for HUD Menu in 3d space.

### Texture editor (runtime):

- How to use Matrix Engine Texture Editor Video tutorial:
  https://www.youtube.com/watch?v=hSCXn-C1XxA&ab_channel=javascriptfanatic

- Using Vjs3 with Editor use:

```js
App.scene.outsideBox.streamTextures = new Vjs3('./2DTextureEditor/actual.html', 'actualTexture');
```

- Build meta images resource with:

```js
npm run res.tex.editor
or
node ./2DTextureEditor/res.js
```

- Running Editor Tool

```js
npm run run.tex.editor
// or
npm run te
```

After creating 2d texture direct on page at the end run:

```js
npm run build.tex.editor
```

to make build final pack.

- Imports note we can use any canvas 2d app [anyCanvas] .

In examples:

- porting2d.js [Old VJS] Example of `anyCanvas`
- porting_text.js [Vjs3]
- porting2d_particle.js [Vjs3]

It is very powerfull tool!

Research Vjs3 source examples at:
https://github.com/zlatnaspirala/visualjs

Simple Planetarium:

- https://jsfiddle.net/zlatnaspirala/y16s2krh/46/
-

On NPM Service `npm i visual-js` , matrix engine already have
`visual-js` , `visual-js-server` editor backend part.

To show/hide iframe use:
App.scene.outsideBox - is any object who have streamTextures LOADED with 2DCANVAS.

```js
App.scene.outsideBox.streamTextures.showTextureEditor();
E('HOLDER_STREAMS').style.display = 'none';
```

Access to the [any] canvas2d program: `anyCanvas(path-of-html,name-of-canvas)`

```js
App.scene.outsideBox.streamTextures = new anyCanvas('./apps/funny-slot/', 'HELLO_WORLD');
```

### Live editor [actual.js predefined]

![Texture-Editor](https://github.com/zlatnaspirala/webgl2-glmatrix2-engine/blob/master/non-project-files/matrix-engine-tex-editor.png)

### Old VJS loading with anyCanvas()

![Texture-Editor](https://github.com/zlatnaspirala/webgl2-glmatrix2-engine/blob/master/non-project-files/matrix-engine.png)

Old Live demo:
Video and webcam works at:
https://maximumroulette.com/webgl2/examples.html

### Sounds

From 1.8.13 you can add audios:

Create single audio object:

```js
App.sounds.createAudio('shoot', 'res/music/single-gunshot.mp3');
```

Create multi clone audio objects:

```js
App.sounds.createAudio('shoot', 'res/music/single-gunshot.mp3', 5);
```

This is in case that you need to play same audio many times [simultaneously].

### Events

How to detect colliding between two objects:

```
physicsObject.addEventListener("collide",function(e) {
    var relativeVelocity = e.contact.getImpactVelocityAlongNormal();
    if(Math.abs(relativeVelocity) > 10){
        // More energy
    } else {
        // Less energy
    }
});
```

### OffScreenCanvas [Turbo super power speed]

- Control from manifest `App.offScreenCanvas` | Boolean
Default `true`. This feature means that your render will work event in inactive mode / hidden tab mode.

- Other easy way for activating:
Put in url param next data `query-build.html?u=fbo_manipulation&offScreen=true&offScreenSpeed=10`
Max render speed is [1]: `query-build.html?u=fbo_manipulation&offScreen=true&offScreenSpeed=1`
Optimal is ~ 15.

### Scene Timeline

  - Basic implementation without example for now!

### FBO camera

[1.9.38] Implemented multi FBO objects with own camera targets!
See example -> `public/query-build.html?u=fbo_manipulation`

```js
App.scene.myMirrorUP.setFBO({
  cameraX: 0,
  cameraY: 0,
  cameraZ: 2,
  pitch: 0,
  yaw: 1
});
```

## PWA Fully runned

Integrated `Add to Home page` and `regular html5 page` options.
In same time fixed all `autoplay` audio and video context construction.
It is good to consult pwa test on page.
Best way is to keep it on 100% pass.
![pwa-powered](https://github.com/zlatnaspirala/webgl2-glmatrix2-engine/blob/master/non-project-files/pwa__test.png)

## Secured 🛡

No Dependabot alerts opened.

## Optimisation

When i write code in fly i usually use timers for some set up vars. This kill perfomance in matrix-engine. It is ok for simple and low resources project but not for big projects.

Example:

```json
BAD CODE:
```

```js
setInterval(function () {
  App.scene.MySquareTexure1.geometry.texCoordsPoints.right_top.x += 0.001;
  App.scene.MySquareTexure1.geometry.texCoordsPoints.left_bottom.x += 0.001;
  App.scene.MySquareTexure1.geometry.texCoordsPoints.left_top.x += 0.001;
  App.scene.MySquareTexure1.geometry.texCoordsPoints.right_bottom.x += 0.001;
}, 20);
```

```c#
 GOOD CODE:
```
```js
var myFUNC = {
  UPDATE: function () {
    App.scene.MySquareTexure1.geometry.texCoordsPoints.right_top.x += 0.001;
    App.scene.MySquareTexure1.geometry.texCoordsPoints.left_bottom.x += 0.001;
    App.scene.MySquareTexure1.geometry.texCoordsPoints.left_top.x += 0.001;
    App.scene.MySquareTexure1.geometry.texCoordsPoints.right_bottom.x += 0.001;
  }
};
App.updateBeforeDraw.push(myFUNC);
```


## Credits && Licence:

- Video material used from :From youtube.com : Electric sheep - a facinating animated flame fractal
  TheMrNgaard Creative Commons Attribution licence (reuse allowed)
- Project Base Structure inspired by
  Copyright (C) 2014 Tappali Ekanathan Keestu (keestu@gmail.com) GNU General Public License
- Textures download from http://textures.com
- Dinamic texture `bitcoin` used from:
  Author:Ioannis Cherouvim
  GitHub:cherouvim
  Reddit:/r/cherouvim
  Website:cherouvim.com
  Compo:canvas
  Demo link:https://js1k.com/2017-magic/demo/2853
  Shortlink:https://js1k.com/2853
- Female 3d Object
  http://www.blendswap.com/blends/view/26225
  Creative Commons Attribution 3.0
  http://www.blendswap.com/users/view/AndresCuccaro
- https://freestocktextures.com/texture/bark-wood-plant,122.html
- https://github.com/Necolo/raycaster
- Great https://www.mixamo.com/
- OBJECT LOADER http://math.hws.edu/graphicsbook/source/webgl/cube-camera.html
- Player character https://www.mixamo.com/#/?page=1&query=walk&type=Motion%2CMotionPack
- BVH collections from: Special thanks to the CMU Graphics Lab Motion Capture Database which provided the data http://mocap.cs.cmu.edu/`
- Used in examples:
  BLACK FLY by Audionautix | http://audionautix.com
  Music promoted by https://www.free-stock-music.com
  Creative Commons Attribution-ShareAlike 3.0 Unported
  https://creativecommons.org/licenses/by-sa/3.0/deed.en_US
- Networking based on https://github.com/muaz-khan/RTCMultiConnection
- https://unsplash.com/photos/8UDJ4sflous
- https://webgl-shaders.com/shaders/frag-lens.glsl
- https://www.fesliyanstudios.com/royalty-free-sound-effects-download/gun-shooting-300
- https://blendswap.com/blend/29206
- Great job HackTimer.js by turuslan https://github.com/turuslan/HackTimer
