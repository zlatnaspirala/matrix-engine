
Folder ./networking is server part for old variant of matrixEngine networking.

## -<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< OLD
### Networking [1.8.0]

@Note Folder `networking/` containe Backend stuff based on Node.js. This folder have own package.json (matrix-network).In basic it is a signaling server who give as features like videoChat, multiplayer data flow etc.

Networking based on webRTC. If you wanna use `multiplayer mode` you need to run intro
folder `networking/` next commands:

```js
 npm i
 node matrix-server.js
```
## -<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< OLD


## -<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< OLD
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

## -<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< OLD
## -<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<