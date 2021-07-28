![webGL2GLMatrix2](https://github.com/zlatnaspirala/webgl2-glmatrix2-engine/blob/master/webgl2glmatrix2.jpg)

## About Matrix Engine project

### Name: `MATRIX-ENGINE` `1.4.0`

### STATUS - [Integrated fully pwa addToHomePage/cache]

### For npm users recommended

 - Use starter project:
   https://github.com/zlatnaspirala/matrix-engine-starter

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

### Raycast

   - triangle support [1.4.0]
   Raycast work fine also in firstPersonCamera operation.
   Bug if walk behind object then turn arround and try raycast but no work for now.

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
// LOAD MESH FROM OBJ FILES...
// if you dont use obj or complex mesh you no need for this func
// Must be improved loading sequences

function onLoadObj(meshes) {
  App.meshes = meshes;
  OBJ.initMeshBuffers(world.GL.gl, App.meshes.female);
  OBJ.initMeshBuffers(world.GL.gl, App.meshes.female1);
  OBJ.initMeshBuffers(world.GL.gl, App.meshes.female2);
  OBJ.initMeshBuffers(world.GL.gl, App.meshes.female3);
  OBJ.initMeshBuffers(world.GL.gl, App.meshes.female4);
  OBJ.initMeshBuffers(world.GL.gl, App.meshes.female5);
  OBJ.initMeshBuffers(world.GL.gl, App.meshes.female6);
  OBJ.initMeshBuffers(world.GL.gl, App.meshes.female7);
  OBJ.initMeshBuffers(world.GL.gl, App.meshes.female8);
  OBJ.initMeshBuffers(world.GL.gl, App.meshes.female9);
  OBJ.initMeshBuffers(world.GL.gl, App.meshes.female10);
  OBJ.initMeshBuffers(world.GL.gl, App.meshes.female11);
  OBJ.initMeshBuffers(world.GL.gl, App.meshes.female12);
  OBJ.initMeshBuffers(world.GL.gl, App.meshes.female13);
  OBJ.initMeshBuffers(world.GL.gl, App.meshes.female14);
  OBJ.initMeshBuffers(world.GL.gl, App.meshes.female15);
  OBJ.initMeshBuffers(world.GL.gl, App.meshes.female16);
  OBJ.initMeshBuffers(world.GL.gl, App.meshes.female17);
  OBJ.initMeshBuffers(world.GL.gl, App.meshes.female18);

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
  }, 100);
}

OBJ.downloadMeshes(
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

 - Imports note we can use any canvas 2d app.

In examples : porting2d.js, porting_text.js, porting2d_particle.js you can found source code.
It is very powerfull tool but you will need to use visual-js 2d canvas api part of project.
Research 2dcanvas examples at:
Online code snippet ( jsFiddle )
https://jsfiddle.net/user/zlatnaspirala/fiddles/

I put 2d program instance intro app/canvas2d folder.
Than i use iframe for access and preview.
Code for 2d program you can found at : app/canvas2d/starter/

To show/hide iframe use:

App.scene.outsideBox - is any object who have streamTextures LOADED with 2DCANVAS .

```js
App.scene.outsideBox.streamTextures.showTextureEditor();
E('HOLDER_STREAMS').style.display = 'none';
```

Access to the canvas2d program:

```js
  App.scene.outsideBox.streamTextures.iframe.contentWindow.
```

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
