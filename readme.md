![webGL2GLMatrix2](https://github.com/zlatnaspirala/webgl2-glmatrix2-engine/blob/master/webgl2glmatrix2.jpg)

## About Matrix Engine project

### Name: `MATRIX-ENGINE` `1.7.0`

### STATUS
- [Integrated PWA addToHomePage/cache/]
- [Integrated raycast (hit trigger detect), bvh animation]
- [Physics implementation based on cannon.js]
- [FirstPersonController/SceneController Drag and navigation scene]

### Next Features

- General improvements in Lights section.
  Shaders must be improved based on work
  Links -> https://webglfundamentals.org/webgl/lessons/
- Implement networking (potencial MultiRTC3)


### For npm users recommended

 - Use starter project:
   https://github.com/zlatnaspirala/matrix-engine-starter

   with command:

   ```js
   npm i
   npm run build.all
   ```

   Project template in `matrix-engine-starter`
   - Slot Mashine
     https://maximumroulette.com/apps/matrix-engine-starter/projects/matrix-slot/index.html

- The benefits of this project is offering an overview of the entire application logic,
  easy native implementations (hybrid app), object structural. Thanks to Mr.Keestu i use
  (gl-program-structure) new version of glmatrix (2.0). Push&Pop matrix just like in opengles 1.1.
  First level of customisation is texture part of code. Best view in example custom_texture.js.
  I implemented webcam quick access call with custom active texture (porting canvas2d to the 3d faces works fine)

### Live Demos

- https://maximumroulette.com/apps/matrix-engine/examples-build.html
- https://maximumroulette.com/apps/matrix-engine/app-build.html

### Install dependencies

  Matrix engine keep minimum dependency.

- uglify-js
- browserify

```js
  npm run install.dep
  npm i
```

@Note: For windows users maybe you will need to add `browserify` to the env PATH
if you got errors on commands `npm run build.*`.

## Help for localhost dev stage

### Switch example with url params
- Usefull also for production for switching whole pages/apps.
  https://localhost/matrix-engine/query.html?u=adding_color_cube

Code access:
```js
const QueryString = matrixEngine.utility.QueryString;
```


### Build Application bundle script

@Note: If you use unsecured `http` protocol no build needed at all just navigate to the `app.html`.
app.html load App.js like script type `module`. Same roles for all others instance build entries.

For develop in localhost you will use `http` protocol and `app.html`.
For production/public server you will use npm run build.XXX commands. and then upload project to the
usually `/var/www/html/you-app/`.

 - `app-build.html` , `examples-build.html` loads javascript type `text/javascript`.
 - `app.html`, `examples.html` loads javascript type `module`.

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
Now navigate to the `me-library.html` page , represent empty page with loaded `matrix-engine`.

- Build with uglify
```js
build.app.ugly;
```

- Build ALL
```js
build.all;
```

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
- Audion amnipulation
- Camera texture (stream texture)
- Cube
- Cube Geometry
- Cube Light & texture
- Cube light dynamic
- Custom texture
- First Person controller
- Load obj files
- Object animation -morh sequence
- Object animation mesh indices calculation
- JS1Kilo examples implementation
- Porting 2D canvas (Active textures)
- Sphere geometry
- Texture uv manipulation
- Videos textures

We just override function for texture executing code.
Next level is full custom opportunity , geometry , collision , networking etc.

### Custom textures

```js
App.scene.MySquareTexure1.custom.gl_texture = function (object, t) {
  world.GL.gl.bindTexture(world.GL.gl.TEXTURE_2D, object.textures[t]);
  world.GL.gl.texParameteri(world.GL.gl.TEXTURE_2D, world.GL.gl.TEXTURE_MAG_FILTER, world.GL.gl.LINEAR);
  world.GL.gl.texParameteri(world.GL.gl.TEXTURE_2D, world.GL.gl.TEXTURE_MIN_FILTER, world.GL.gl.LINEAR);
  world.GL.gl.texParameteri(world.GL.gl.TEXTURE_2D, world.GL.gl.TEXTURE_WRAP_S, world.GL.gl.CLAMP_TO_EDGE);
  world.GL.gl.texParameteri(world.GL.gl.TEXTURE_2D, world.GL.gl.TEXTURE_WRAP_T, world.GL.gl.CLAMP_TO_EDGE);

  world.GL.gl.texImage2D(
    world.GL.gl.TEXTURE_2D,
    0,                         // Level of details
    world.GL.gl.RGBA,          // Format
    world.GL.gl.RGBA,
    world.GL.gl.UNSIGNED_BYTE, // Size of each channel
    object.textures[t].image
  );

  world.GL.gl.generateMipmap(world.GL.gl.TEXTURE_2D);
};
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
    skeletalBlend: { paramDest: 7, paramSrc: 6 }, // remove arg for no blend
    boneTex: {
      source: [
        "res/icons/512.png"
      ],
      mix_operation: "multiply",
    },
    // pyramid | triangle | cube | square | squareTex | cubeLightTex | sphereLightTex'
    drawTypeBone: 'squareTex' 
  };

  const filePath = 'https://raw.githubusercontent.com/zlatnaspirala/bvh-loader/main/javascript-bvh/example.bvh';

  var myFirstBvhAnimation = new matrixEngine.MEBvhAnimation(filePath, options);
```

#### Live demo https://codepen.io/zlatnaspirala/pen/OJQdGVM


### Raycast

   - cube , square, triangle  [1.4.11]
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
    alert("You shoot the object! Nice")
  });
```

### First person controller:

```js
  // In one line activate also deactivate.
  App.camera.FirstPersonController = true;

  // Look in manifest.js
  camera : {
    viewAngle: 45,
    nearViewpoint: 0.1,
    farViewpoint: 1000,
    edgeMarginValue: 100,
    FirstPersonController: false
  }
```

### Animated female droid:

```js
// Obj Loader
function onLoadObj(meshes) {
  App.meshes = meshes;
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

matrixEngine.objLoader.downloadMeshes(
  {
    female: 'res/3d-objects/female/female_000001.obj',
    female1: 'res/3d-objects/female/female_000003.obj',
    female2: 'res/3d-objects/female/female_000005.obj',
    female3: 'res/3d-objects/female/female_000007.obj',
    female4: 'res/3d-objects/female/female_000009.obj',
    female5: 'res/3d-objects/female/female_000011.obj',
    female6: 'res/3d-objects/female/female_000013.obj',
    female7: 'res/3d-objects/female/female_000015.obj',
    female8: 'res/3d-objects/female/female_000017.obj',
    female9: 'res/3d-objects/female/female_000019.obj',
    female10: 'res/3d-objects/female/female_000021.obj',
    female11: 'res/3d-objects/female/female_000023.obj',
    female12: 'res/3d-objects/female/female_000025.obj',
    female13: 'res/3d-objects/female/female_000027.obj',
    female14: 'res/3d-objects/female/female_000029.obj',
    female15: 'res/3d-objects/female/female_000031.obj',
    female16: 'res/3d-objects/female/female_000033.obj',
    female17: 'res/3d-objects/female/female_000035.obj',
    female18: 'res/3d-objects/female/female_000037.obj'
  },
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

```js
world.Add('cubeLightTex', 1, 'TV', textuteImageSamplers, App.meshes.TV);
App.scene.TV.streamTextures = new VIDEO_TEXTURE('Galactic Expansion Fractal Morph [Official Video]');
```

### Camera texture:

```js
App.scene.TV.streamTextures = new ACCESS_CAMERA('webcam_beta');
```

### Texture editor (runtime):

 - Using Vjs3 with Editor use:

```js
  App.scene.outsideBox.streamTextures = new Vjs3(
  "./2DTextureEditor/actual.html",
  "actualTexture"
);
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
  - porting2d.js  [Old VJS] Example of `anyCanvas`
  - porting_text.js [Vjs3]
  - porting2d_particle.js [Vjs3]

 It is very powerfull tool!

Research Vjs3 source examples at:
https://github.com/zlatnaspirala/visualjs

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
 App.scene.outsideBox.streamTextures = new anyCanvas(
      "./apps/funny-slot/",
      "HELLO_WORLD")
```

### Live editor [actual.js predefined]
![Texture-Editor](https://github.com/zlatnaspirala/webgl2-glmatrix2-engine/blob/master/non-project-files/matrix-engine-tex-editor.png)


### Old VJS loading with anyCanvas()
![Texture-Editor](https://github.com/zlatnaspirala/webgl2-glmatrix2-engine/blob/master/non-project-files/matrix-engine.png)

Old Live demo:
Video and webcam works at:
https://maximumroulette.com/webgl2/examples.html

### PWA Fully runned

Integrated `Add to Home page` and `regular html5 page` options.
In same time fixed all `autoplay` audio and video context construction.
It is good to consult pwa test on page.
Best way is to keep it on 100% pass.
![pwa-powered](https://github.com/zlatnaspirala/webgl2-glmatrix2-engine/blob/master/pwa__test.png)

### Credits && Licence:

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
- BVH collections from:
  `Special thanks to the CMU Graphics Lab Motion Capture Database which provided the   data http://mocap.cs.cmu.edu/`
- Used in examples:
  BLACK FLY by Audionautix | http://audionautix.com
  Music promoted by https://www.free-stock-music.com
  Creative Commons Attribution-ShareAlike 3.0 Unported
  https://creativecommons.org/licenses/by-sa/3.0/deed.en_US