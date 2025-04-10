![webGL2GLMatrix2](https://github.com/zlatnaspirala/webgl2-glmatrix2-engine/blob/master/non-project-files/webgl2glmatrix2.jpg)

## About Matrix Engine project

### Name: `MATRIX-ENGINE` `2.2.0` Vampire

#### Logo

<img src="https://github.com/zlatnaspirala/matrix-engine/blob/master/public/res/icons/ms-icon.png" width="128" height="128" />

(Join Slack-Rock opensource workspace)[https://join.slack.com/t/gameplay-rock/shared_invite/zt-ffcgl80x-CYu4s~YC0bD9Od9_bkqmzw]

### STATUS

#### - [Integrated PWA addToHomePage/cache/] ✔

#### - [Integrated raycast (hit trigger detect), bvh animation] ✔

#### - [Basic Physics implementation based on cannon.js] ✔

#### - [FirstPersonController fly or classic fp / SceneController Drag and navigation scene] ✔

#### - [Basic's Shadows vs lights (GLSL)] ✔

#### - [Migrated to the opengles300] ✔

#### - [FBO implemented] ✔

#### - [FBO Shadows] ✔

#### - [Add cef (linux, macos) and cefSharp Visual Studio projects for building executive desktop native apps. ✔

#### Support: Windows, MAC, Linux ] ✔

#### - Texture Editor [tutorial example - from code] ✔

#### - MatrixEngineTexture GUI Editor [UNDERCONSTRUCTION]

#### - Swicthing GLSL ver - webGL1 / webGL2 ✔

#### - Loader/Map with collider boxs ✔

#### - OffScreenCanvas ✔

#### - Mobile optimisation ✔

### Description ℹ

This is small but inspiring project.
The benefits of this project is offering an overview of the entire opengles program logic,
easy native implementations (hybrid app/ CEF), object structural. Not closed too much inself. Thanks to Mr.Keestu i use
(gl-program-structure) new version of glmatrix (3.4.0). Push&Pop matrix just like in
opengles 1.1. Also can be downgraded to openGLES 1.1. webGL Lightweight library based on glmatrix engine.
For multiplayer used webRTC done with io socket. Physics done with last version of cannon.js. I use free software Blender 2.90.1 for 3d Object mesh works. MatrixEngine is Blender frendly orientend lib (I use blender 4.1). Another frendly tools comes from mixamo.com. Mixamo is great service used for creating my 3d assets. GIMP and MsPaint also used for editing images.
Networking is part of matrix engine, integrated whole MultyRTC lib but this is old and deplaced in ver 2 (this old part have a server part signaling server and it is under `./networking/` folder).
New networking is under `./networking2/` folder. There is no server code for server part because i use kurento/openvidu service and code. I have running service under `https://maximuroullete.com:4443/` for my dev/prodc VPS server.
In both cases i use webRTC protocol for stream and data flow.
Used webRTC realtime protocol TCP/UDP. Powered by webGL vs webRTC tech enjoy!

### Limitation ⚠

- Basic implementation for physics (Cube, Sphere, Convex BAsic WIP).
- From [2.3.0] Much better physics for Sphere && ConvexPolyhedron

### Next Features 🔜

- General improvements in Lights section.
  Shaders must be improved based on work.
  More examples code.
  Links -> https://webglfundamentals.org/webgl/lessons/
  -> https://iquilezles.org/

### For npm users recommended

- Use starter project:
  https://github.com/zlatnaspirala/matrix-engine-starter

  with command:

  ```js
  npm i
  npm run build.all
  ```

  Project template in `matrix-engine-starter`

  - Slot Mashine [STABLE+MOB]
    https://maximumroulette.com/apps/matrix-engine-starter/projects/matrix-slot/index.html

  - Matrix roulette [WIP]
    https://maximumroulette.com/apps/matrix-engine-starter/projects/matrix-roulette/?server=manual

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
-> `query-build.html?u=fbo_manipulation`

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
- Loading custom shaders from shadertoy site.
- Loading from buildInShaders.

## Features description

## Camera config

In `./program/manifest.js`. Access is `App.camera`.
Note: One of params `FirstPersonController` or `SceneController` must be `false`.

- `FirstPersonController` is classic first person view with movement WASD and mouse look.
- `SceneController` use direct input WASD. To make camera angle view change press `shift` to enable camera angle. Middle mouse button will enable drag scene to left/right/top/down.
  Mouse middle wheel change work only when `shift` is pressed.

```js
	camera: {
		viewAngle: 45,
		nearViewpoint: 0.1,
		farViewpoint: 5000,
		edgeMarginValue: 100,
		FirstPersonController: false,
		SceneController: false,
		sceneControllerDragAmp: 0.1,
		sceneControllerDragAmp: 0.1,
		sceneControllerEdgeCameraYawRate: 3,
		sceneControllerWASDKeysAmp: 0.1,
		speedAmp: 0.5,
		yawRate: 1,
		yawRateOnEdge: 0.2
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

## Light And Shadows (ME Materials) [1.7.6]

[2.2.0] Cast shadow Mixed FBO with two tex sampler attachments.
There is local cast 'spot-shadow' i needed this to make little more darker 
draws in framebuffer.

Element who have `setFBO` called can cast shadows:
```js
	App.scene.floor.setFBO({
		cameraX: 0,
		cameraY: 0,
		cameraZ: 20,
		pitch: 0,
		yaw: 0
	})
	App.scene.floor.activateShadows('spot-shadow')
```

Manipulate with non fbo object: 
```js
App.scene.MyCubeTex1.shadows.lightPosition = [0,1,1]
```


`activateShadows` works only for cube, square, objs for now.

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

Make square pattern:

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

![](https://github.com/zlatnaspirala/matrix-engine/blob/master/non-project-files/1.7.6.png)

## Physics

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

### Networking

- OLD [your own server part under ./networking folder]
- New Recommneded - Based on kurento/OpenVidu service [i run personal on maximumroulette.com:2020]

 - I posted server example for OV server at:
 https://github.com/zlatnaspirala/matrix-stream/tree/main/middleware

#### [NEW] Networking Support Methods list: ✅😇

Networking is deeply integrated no need for extra interventions (send function have own interface).
Except activation.

```js
matrixEngine.Engine.activateNet2(undefined, {
  sessionName: 'public-chat-me',
  resolution: '256x256'
});
```

```js
App.scene.MyColoredSquare1.net.enable = true;
// Now MyColoredSquare1 is net replicated on others clients.
App.scene.MyColoredSquare1.position.SetZ(-8);
```

To receive networking data:
`dispatchEvent('network-data', {detail: e.data})`

```js
addEventListener('network-data' (e) => {})
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

## Networking2

New way of networking is kurento/OpenVidu service.
Only web client part is present here. I have running kurento/Ov server on my VPS[maximumroulette.com:2020].

List of events:
- `onConnectionCreated`
- `connectionDestroyed`
- `onStreamCreated`
- `videoElementDestroyed`
- `streamPlaying`
- `streamDestroyed`
- `sessionDisconnected`
- `streamCreated`
- `videoElementCreated`
- `videoElementDestroyed`
- `setupSessionObject`


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

- If you wanna custom canvasd2d draws for each cube side
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

From [2.0.37] if your obj file have groups with string in name `COLLIDER` objLoader
collect verts for group object. You can use it later for physics.
There is no yet example with praticle use of group. [WIP]

From [2.1.2] You can scale mesh general with: 
```js
App.scene.armor.mesh.setScale(2)
```
Or by axis:
```js
App.scene.armor.mesh.setScale({x:1,y:2,z:2})
```


### Map loader
[2.2.0] Added MapCreator web tools
 New export for npm pack `meMapLoader`
 Usage:
Automatic load on refresh me app. MapCreator make saves on every new field.
You need just to refresh page.
```js
	if (localStorage.getItem('map') != null) {
		var t = localStorage.getItem('map');
		t = JSON.parse(t)
		meMapLoader.load(t, physics);
	} else {
		meMapLoader.load(map, physics);
	}
```
If you wanna just always load map from disk/file then use:
```js
import {map} from "../maps/map2";
...
meMapLoader.load(map, physics);
```
To make map goto `public\tools\map-creator.html`


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

<img src="https://github.com/zlatnaspirala/matrix-engine/blob/master/non-project-files/character1.png" width="528" height="528" />

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

- Basic implementation

Init :
`	matrixEngine.matrixWorld.world.useAnimationLine({sequenceSize: 200, totalSequence: 10});`

    [1.9.58]

New args for timeline feature:
`matrixEngine.matrixWorld.world.useAnimationLine({sequenceSize: 200, totalSequence: 10});`
New example script for this feature `basic_timeline.js`

Add command for execute every time on sequence (for this example at index 1) reached :
```js
	 	matrixEngine.matrixWorld.world.addCommandAtSeqIndex(
		function() {
			console.log("WHAT EVER HERE")
		} , 1
	)
```
Commands index begin from first frame from seq 1.

From [2.3.63] Run on frame100 only in seq3.
Definition: `world.addSubCommand = function(COMMAND, INDEX, onlyForSeq)`
Defautl values for onlyForSeq, onlyForPeriod is null means `call command for every seq`
```js
	matrixEngine.matrixWorld.world.addSubCommand(
		function () {
			console.log("do it for only 100 frame on 3 seq FRAMEID!")
		} , 100 , 3
	) 
```

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

<img width="512" src ="https://github.com/zlatnaspirala/matrix-engine/blob/master/non-project-files/shadows.png"/>

## Multiplatform parts

### ⚠ You need to have msbuild.exe on you computer.

`msbuild.exe` typically does not come pre-installed with Windows. It is part of the Microsoft Build Tools, which are usually installed along with Visual Studio or the .NET SDK. Here's a summary of the ways to get msbuild.exe:

 - Visual Studio: When you install Visual Studio, MSBuild is included as part of the installation. You can choose to install just the build tools if you don't need the full IDE.

 - .NET SDK: Installing the .NET SDK also includes MSBuild. This option is useful if you're working primarily with .NET Core or .NET 5+ projects.

 - Microsoft Build Tools: You can install the standalone Microsoft Build Tools package, which includes MSBuild without the full Visual Studio IDE. This is useful for build servers or CI/CD pipelines.


For building windows exe file use `desktop-build.bat`
 - This script will install latest version of nuget.exe in folder "multiplatform\win\cef-sharp"
 - Install cef deps for cef in package folder (cef 118.6.80)
 - Build exe file with msbuild.exe

After running `desktop-build.bat`  goto folder `multiplatform\win\cef-sharp\bin\Release` and you can find matrix-engine.exe builded.

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
- Shadows GLSL cals https://webgl2fundamentals.org/webgl/lessons/webgl-shadows.html
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
- Matrix-engine use only MIT Licenced or similar shadertoy.com examples.
  All origin description is leaved in name of fair use. Just leave shader comments.
  Come's from freeShadersToy object and i will use only MIT licensed or similar
  because https://www.shadertoy.com/terms. I dont wanna "non-commercial" code in
  Matrix-engine project.
- This is best way for learning GLSL: https://iquilezles.org/ - MIT LICENCE
  Used iquilezles shaders for learning and explore. Under (public\res\shaders)
  Also used glslsandbox lights balls example [https://glslsandbox.com/e#109700.0].
  FBM shader License: Copyright (C) 2011 Ashima Arts. All rights reserved.
  Distributed under the MIT License. https://github.com/ashima/webgl-noise
  CustomShaders comes with readme.md file with LICENCE text. If readme.md not exist
  the it is also MIT Licence but under Nikola Lukic zlatnaspirala@gmail.com.
- Great free stuff https://ambientcg.com/view?id=MetalPlates004
