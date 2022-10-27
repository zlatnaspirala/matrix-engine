## CHANGES

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
