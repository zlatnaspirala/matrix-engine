
## Texture editor

Note:

2DTextureEditor\actual.js is in the `Final build` regime.

Create new texture with texture editor:

`npm run app`  - run main inctance for app.js matrix engine starter...
`npm run te`   - run editor mode [create elements from page]
`npm run tex.`


This is node.js dev tools (not javascript client)! :
 - config.js
 - editor.js
 - res.js
 - build.js

Add new images to the `2DTextureEditor\res\animations`. Texture Editor (visual-js version 3) use own source directorium 
(2DTextureEditor\res\animations). Run `npm run res.tex.editor` after adding new image. Always need to create new folder and put new image intro the folder. After this command you will see access `RESOURCE.folderName`.

Write you code intro: `actual.js`
You can make multi instance like tex1.html/tex1.js , tex2.html/tex2.js etc...

`F4` for editor mode.



THIS IS GIST FOR EDITOR REGIME:
https://github.com/zlatnaspirala/matrix-engine/wiki/How-to-define-%60Texture-editor%60-%5Bvisual-js-game-engine%5D-in-matrix-engine-for-DEV-MODE


THIS IS CODE BEFORE BUILD REGIME:
https://github.com/zlatnaspirala/matrix-engine/wiki/How-to-define-%60Texture-editor%60-%5Bvisual-js-game-engine%5D-in-matrix-engine-for-PRODC-MODE


