## ---------------------------------

# Matrix Engine [CHANGES]

[2.0.27] Added for CustomGeometry object entity:
```js
			customObject.net = {
				enabled: false
			};
```

[2.0.26] FIX CHECK NET ACTIVE FLAG FOR SCALE PROCEDURE

[2.0.25] FIX FOR MOBILE RENDER MATERIAL/ TEXTURE
    - Bug with white surface 

```js
	// world.disableUnusedAttr(world.GL.gl, localLooper);
	world.disableUnusedAttr(world.GL.gl, 4);
```

[2.0.24] New prop in App.camera (manifest)
  
	`App.camera.yawRateOnEdge`

```js
camera.setCamera = function(object) {
	if(keyboardPress.getKeyStatus(37) || keyboardPress.getKeyStatus(65) || App.camera.leftEdge == true) {
		/* Left Key  or A */
		camera.yawRate = App.camera.yawRate;
		if(App.camera.leftEdge == true) {
			camera.yawRate = App.camera.yawRateOnEdge;
		}
	} else if(keyboardPress.getKeyStatus(39) || keyboardPress.getKeyStatus(68) || App.camera.rightEdge == true) {
		/* Right Key or D */
		camera.yawRate = -App.camera.yawRate;
		if(App.camera.rightEdge == true) {
			camera.yawRate = -App.camera.yawRateOnEdge;
		}
	}
```


[2.0.23] New line in EVENTS About WASD FPController
Reason - adaptation for mobile FPController
`	if (camera.preventSpeedZero == false) camera.speed = 0;`

```js
/* Up Key or W */
if (keyboardPress.getKeyStatus(38) || keyboardPress.getKeyStatus(87)) {
  camera.speed = App.camera.speedAmp;
} else if (keyboardPress.getKeyStatus(40) || keyboardPress.getKeyStatus(83)) {
  /* Down Key or S */
  camera.speed = -App.camera.speedAmp;
} else {
  if (camera.preventSpeedZero == false) camera.speed = 0;
}
```

[2.0.17 version Vampir]
Objective

- Deplace old networking and put kurento/OV web client code.
- Mobile device ready
- GUI Editor (win) basic version ready

[2.0.17] New event from core net updater.
`dispatchEvent('network-data', {detail: e.data})`
For better customisation.

```js
update(e) {
			e.data = JSON.parse(e.data);
			dispatchEvent('network-data', {detail: e.data})
			// console.log('INFO UPDATE', e);
			if(e.data.netPos) {
				if(App.scene[e.data.netObjId]) {
					if(e.data.netPos.x) App.scene[e.data.netObjId].position.SetX(e.data.netPos.x, 'noemit');
					if(e.data.netPos.y) App.scene[e.data.netObjId].position.SetY(e.data.netPos.y, 'noemit');
					if(e.data.netPos.z) App.scene[e.data.netObjId].position.SetZ(e.data.netPos.z, 'noemit');
				}
			} else if(e.data.netRot) {
```

[2.0.16] Added to the Base Class Position `xNetOffset yNetOffset zNetOffset`
Nice for calibration.
[2.0.14] For obj sequency animation `objObject.scaleAll`

## ---------------------------------

[1.9.58]
New args for timeline feature:
`matrixEngine.matrixWorld.world.useAnimationLine({sequenceSize: 200, totalSequence: 10});`
New example script for this feature `basic_timeline.js`

Add command for execute every time on sequence (for this example at index 1) reached :
`js
	 	matrixEngine.matrixWorld.world.addCommandAtSeqIndex(
		function() {
			console.log("WHAT EVER HERE")
		} , 1
	)
	 `
Commands index begin from 1.

[1.9.56]
Improved FPS example - added item ARMOR first item feature
Improved selfDestroy function [in case of simultaneous calls]
isHUD added rotateion also in draw func.

[1.9.54]
Added custom shaders also glsl files from zlatnaspirala/GLSLShaders
Add new example `apps/shaders.js`.

[1.9.53]

- Added shaders from https://iquilezles.org/ MIT LICENCE only.

- `scriptManager.loadGLSL('./path/myshader.glsl')` returns literal string (shader).

```js
var promiseMyShader = scriptManager.loadGLSL('../lib/optimizer/custom-shaders/circle.glsl');
promiseMyShader.then((d) => {
  scriptManager.LOAD(d, 'custom-toy1-shader-fs', 'x-shader/x-fragment', 'shaders', () => {
    App.scene.ToyShader.shaderProgram = world.initShaders(world.GL.gl, 'custom-toy1' + '-shader-fs', 'cubeLightTex' + '-shader-vs');
  });
});
```

[1.9.45+]
All examples now works on android devices[android 13 tested]!

- Improved ACCESS_CAMERA for android devices!
- Improved SET_STREAM function [adapting for mobile devices - android]
- http on emulator android from LAN - no workers [browser related/ security reason]!
- Change main file for GUI instance.

[mobile optimisation ios fix web_cam visibility](lib/engine.js)

supportsTouch added for better detecting isMobile()

[1.9.44] Correction for cube physics
Internal note: rotx + 90

[1.9.40 - 1.9.43]
First version with both support opengles11/2 and opengles300

- Default : 1.3/opengles300
- Switch with URL param `GLSL=1.3` for opengle300 and `GLSL=1.1` for opengles1.1/2
- Implemented URL param for examples-build.html?GLSL=1.1 [Affect after first demo choose.]

[1.9.39]
OffScreenCanvas [Turbo super power speed]

- Control from manifest `App.offScreenCanvas` | Boolean
  Default `true`. This feature means that your render will work event in inactive mode / hidden tab mode.

- Other easy way for activating:
  Put in url param next data `query-build.html?u=fbo_manipulation&offScreen=true&offScreenSpeed=10`
  Max render speed is [1]: `query-build.html?u=fbo_manipulation&offScreen=true&offScreenSpeed=1`
  Optimal is ~ 15.

[1.9.38] Implemented multi FBO objects with own camera targets!
See example -> `public/query-build.html?u=fbo_manipulation`

```
  App.scene.myMirrorUP.setFBO({
    cameraX: 0,
    cameraY: 0,
    cameraZ: 2,
    pitch: 0,
    yaw: 1
  });
```

[1.9.37] Add dev tool for configs paths.
Node.js tool `install-paths.js`
For `./2DTextureEditor` folder. Setup absolute paths intro config.js and editor.js .

[1.9.35] Add simple http server for GUI new part.
`npm run host-for-gui`
It is host of `./2DTextureEditor` folder.

[1.9.30] App.offScreenCanvas new feature,
implementing hacker-timer.js worker library.

QueryString is urlParam.

```js
if (App.offScreenCanvas == true && (QueryString.offScreen == null || Boolean(QueryString.offScreen) == true)) {
  console.log('App.offScreenCanvas =>', App.offScreenCanvas);
  scriptManager.LOAD('./hacker-timer/hack-timer.js');
} else {
  App.offScreenCanvas = false;
}
```

[1.9.29] Fix `export let activateNet = (CustomConfig) => {`
In matrix-engine-starter for project matrix-roulette there is a example for injecting custom config.

[1.9.27]
For npm users , it is possible to inject custom client config for networking.
activateNet = (CustomConfig) => {

Catch possible undefined state.
`  if(root.injector) root.injector`

[1.9.25] Position net send branch only for net.enable == true

[1.9.22-23-24] Just remove some console logs.

[1.9.21]

- Added raycast enabled flag
- Improved render physics related - draw subObjs eg. cannonjs multi shapes one body

[1.9.20] Added basic physics for torus
Render exception:

```js
if (world.contentList[physicsLooper].custom_type && world.contentList[physicsLooper].custom_type == 'torus') {
  world.contentList[physicsLooper].rotation.rotx = radToDeg(local.physics.currentBody.quaternion.toAxisAngle()[1]) + 90;
} else {
  world.contentList[physicsLooper].rotation.rotx = radToDeg(local.physics.currentBody.quaternion.toAxisAngle()[1]);
}
```

[1.9.19]
Improved raycaster code :

```js
    if (rayIntersectsTriangle(myRayOrigin, ray, triangle, intersectionPoint, object.position)) {
      if (object.raycast.enabled == false) return;
      rayHitEvent = new CustomEvent('ray.hit.event', ...
```

[1.9.18]

- Implemented torus geometry with 'generatorLightTex' flag type.
  support for stream textures but not physics and net for `generatorLightTex`

```js
world.Add('generatorLightTex', 1, 'outsideBox2', tex, {
  custom_type: 'torus',
  slices: 8,
  loops: 20,
  inner_rad: 1.5,
  outerRad: 2
});
```

[1.9.17]
Added new net example script - video chat.

- added new branch [asyn nature od stream video dom element ready...]

```js
 if(App.scene[e.data.netObjId])
```

[1.9.16]

- New custom event `net.new-user` to make easy detect on top level
  used direct for new example video chat matrix.

- New access point for broadcaster/networking

```js
net = new Broadcaster(t);
App.network = net;
```

#### [1.9.14] New optimal arg2 for defineWorld (arg1, arg2)

Related wwith FBO render func,
Can be undefined in that place engine use full FBO render,
With arg2 = 'simply' tooks simplyRender func.

```js
if (typeof renderType === 'undefined') {
  exports.reDraw = reDraw = _manifest.default.operation.reDrawGlobal;
} else if (renderType == 'simply') {
  exports.reDraw = reDraw = _manifest.default.operation.simplyRender;
}
```

#### [1.9.7] Small hotfix for stremasTextures for squareTex obj in draw func.

#### [1.9.6] FBO example + Scene global Timeline function with visual dom preview.

```js
matrixEngine.matrixWorld.world.useAnimationLine({sequenceSize: 500});
```

Idea about timeline is to simple count redraws. Nothig other comes from timeline.
In app level you need to write logic to use
`matrixEngine.matrixWorld.world.globalAnimCounter` and
`matrixEngine.matrixWorld.world.globalAnimCurSequence`

globalAnimCurSequence exist only to reduce number of redraws.
You can setup sequenceSize.

#### [1.9.5] Added local shadows for obj mesh.

#### [1.9.1 Thunder BETA 2023]

- Improved FPShooter controller
- FBO implemented BASIC
- Migrated to the opengles300 GLSL version
- Add cef and cefSharp Visual Studio projects for building executive native apps.
  Support:
  - Windows
  - MAC
  - Linux
- GUI Texture editor based on Visualjs3 in background.
  Make gui fast tex editor running - wip

New scene object functions (Cube and square): - setTexCoordScaleXFactor - setTexCoordScaleYFactor

- Improvements for visual-js game engine

GLSL Note:
Note: This extension is only available to WebGL1 contexts. In WebGL2, the functionality of this extension is available on the WebGL2 context by default. The constant in WebGL2 is gl.UNSIGNED_INT_24_8.

#### From [1.8.15] Improved camera

- 'hit.keyDown' && 'hit.keyUp' dispatch events added. See FPS Example.
- Added basic JUMP with physics / not calibrated.

```js
addEventListener('hit.keyDown', (e) => {
  // console.log('Bring to the top level', e.detail.keyCode);
});
```

#### From [1.8.14] Html's Every static file / resource moved to the new folder ./public

Improved FPShooter example , added collision box for player.

#### From [1.8.13] MatrixSounds

Access object `App.sounds`.

Usage:

```js
// Play source audio [single instance].
App.sounds.createAudio('music', 'res/music/background-music.mp3');
// Play simultanius same source audio.
App.sounds.createAudio('shoot', 'res/music/single-gunshot.mp3', 5);
```

#### From [1.8.12]

Draw scene list swap items options must be done!

#### From [1.8.0]

Added watchify.
We have support for real time connections based on webRTC.
You must work on https protocol even in localhost.
Change in program/manifest `net = false` if you dont wanna use networking.

Node.js Multiplayer Server based on webRTC. Take a look at the folder `./netwotking`.

Run it:

```js
cd networking
node matrix.server.js
```

If you wanna in terminal popup then run (bash/work on win also if you have bash) `dedicated.sh./`
or `dedicated.bat`.

[1.8.6] Improve of cubeMap

[1.8.5] Added new scene type of object `"cubeMap"` with Opengles native 'uniform samplerCube' sampler:

```js
var tex = {source: [], mix_operation: 'multiply'};
world.Add('cubeMap', 1, 'myCubeMapObj', tex);
```

For now it is predefinited inside engine.
It is canvas2d with center-middle text position.
Index is 0,1,2,3,4,5 for all six faces of cube geometry.

```js
App.scene.myCubeMapObj.cubeMap2dCanvasSet[index];
```

[1.8.4] From 1.8.4 raycast hit trigger works for obj's.

[1.8.3] Improve of MEBvhAnimation (MAtrixBVHSkeletal principe).

[1.8.2] Obj sequence range animation and play (animationName) func.

[1.8.1] makeObjSeqArg for animation obj sequence mesh loader, selfDestroy(aftermsec?) added for all scene object types.

[1.8.0] Networking added for position , rotation and scale. Watch task build added.

[1.7.13] From now loading init shaders from code no need to loading shaders.html any more + HOTFIX swap out of prototype of array.

[1.7.10] Shadows VS Lights (Local SpotLight implementation) , improvments for GLSL part.

[1.7.5] Added modifier to the Array.swap Added Array.prototype.swap used for obj loader initial orientation control.

[1.7.0] Test basic [cube] physics cannon.js implementation , improved SceneController.

[1.6.0] Removed old Vjs added new version of Vjs3 (npm-service).

[1.5.4] Fix sphereObject size/scale input.

[1.5.0] Comes with bvh loader and skeletal basic bone system draws . Added passive:false for mobile events because e.preventDefault call, Added isMobile func, fix roty i roty with rotx=180 make raycast fully works. ray fixed for rx and ry, Raycast fixed for one of rx,ry,rz local rotation, setScale implemented for obj loaded meshes, Raycast basic for triangle implemented, auto cache update ref by cache version var ,auto update position translate operation, added translate operation on base class Position, remove esmify to dev dep, added set Solid bg vertex color for cube shema .Fix missing setScaleByY , setScaleByX for square geometry. Added 2 type of resize system. Fixed demo links, Fixed pwa initial status installed or not.Added Adding uglify-js build options, Improve import export adding bundle build options with browserify, PWA Fully powered with static/dynamic cache , add to home page in same time fixed autoplay audio/video context construction.
