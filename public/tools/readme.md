# Matrix-Engine Map Creator

## Structure of MeMap

```js
export let map1 = {
  staticCubes: [
    {
      name: 'wall_gen',
      position: {x: 10, y: 0, z: 0},
      scale: [1, 3, 1],
      texture: {
        source: ['res/images/diffuse.png'],
        mix_operation: 'multiply'
      }
    }
  ],
  staticFloors: [],
  staticObjs: [],
  staticObjsGroup: [
    {
      name: 'mapobjsgroup_1_2',
      path: 'res/3d-objects/env/door1.obj',
      position: {x: -250, y: 0, z: -200},
      rotation: {rotx: 0, roty: 0, rotz: 0},
      activeRotation: [0, 0, 0],
      scale: [1, 1, 1],
      scaleCollider: [1, 1, 1],
      texture: {source: ['res/images/n-stone.png', 'res/images/RustPaint.jpg'], mix_operation: 'multiply'},
      targetDom: {id: 'field12', x: 1, y: 2}
    }
  ],
  noPhysics: {cubes: []}
};
```

## How to use it

Navigate to the link `public\tools\map-creator.html`
If you wanna load again map you need to enter same map size.
Map size is only input arg on create map.

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