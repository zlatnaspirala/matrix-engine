
## CHANGES

#### From [1.8.15] Improved camera


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
var tex = {source: [], mix_operation: "multiply"};
world.Add("cubeMap", 1, "myCubeMapObj", tex);
```
For now it is predefinited inside engine.
It is canvas2d with center-middle text position.
Index is 0,1,2,3,4,5 for all six faces of cube geometry.
```js
App.scene.myCubeMapObj.cubeMap2dCanvasSet[index] 
```

[1.8.4] From 1.8.4 raycast hit trigger works for obj's.

[1.8.3] Improve of MEBvhAnimation (MAtrixBVHSkeletal principe).

[1.8.2] Obj sequence range animation and play (animationName) func.

[1.8.1] makeObjSeqArg for animation obj sequence mesh loader, selfDestroy(aftermsec?) added for all scene object types.

[1.8.0] Networking added for position , rotation and scale. Watch task build added.

[1.7.13] From now loading init shaders from code no need to loading shaders.html any more + HOTFIX swap out of prototype of array.

[1.7.10] Shadows VS Lights (Local SpotLight implementation) , improvments for GLSL part.

[1.7.5] Added modifier to the Array.swap Added  Array.prototype.swap used for obj loader initial orientation control.

[1.7.0] Test basic [cube] physics cannon.js implementation , improved SceneController.

[1.6.0] Removed old Vjs added new version of Vjs3 (npm-service).

[1.5.4] Fix sphereObject size/scale input.

[1.5.0] Comes with bvh loader and skeletal basic bone system draws . Added passive:false for mobile events because e.preventDefault call, Added isMobile func,  fix roty i roty with rotx=180 make raycast fully works. ray fixed for rx and ry, Raycast fixed for one of rx,ry,rz local rotation, setScale implemented for obj loaded meshes, Raycast basic for triangle implemented, auto cache update ref by cache version var ,auto update position translate operation, added translate operation on base class Position, remove esmify to dev dep, added set Solid bg vertex color for cube shema .Fix missing setScaleByY , setScaleByX for square geometry. Added 2 type of resize system. Fixed demo links, Fixed pwa initial status installed or not.Added Adding uglify-js build options, Improve import export adding bundle build options with browserify, PWA Fully powered with static/dynamic cache , add to home page in same time fixed autoplay audio/video context construction.
