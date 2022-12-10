
## Texture editor

Note:

2DTextureEditor\actual.js is in the `Final build` regime.
2DTextureEditor\tex1.js is in the `EDITOR active` regime.

#### After finishing texture editor coding:
See `2DTextureEditor\actual.js` this file is in final stage.
 - manual disable editor look in links:
   - https://github.com/zlatnaspirala/matrix-engine/wiki/How-to-define-%60Texture-editor%60-%5Bvisual-js-game-engine%5D-in-matrix-engine-for-DEV-MODE
   - https://github.com/zlatnaspirala/matrix-engine/wiki/How-to-define-%60Texture-editor%60-%5Bvisual-js-game-engine%5D-in-matrix-engine-for-PRODC-MODE
 - kill editor (npm run te) node.
 - Run ``

Create new texture with texture editor:

`npm run app`  - run main inctance for app.js matrix engine starter...

`npm run te`   - run editor mode [create elements from page]

`npm run tex.tex1`  - watch changes intro tex1.js

`build.tex.editor`  - From cache/ to ./starter/visual.js
 For now this command will always create `./starter/visual.js` file.
 If you wanna another texture editor instance then just rename generated file `visual.js`
 to any other name then change `sys.SCRIPT.LOAD("starter/ANY_OTHER_NAME.js")`


This is node.js dev tools (not javascript client)! :
 - config.js
 - editor.js
 - res.js
 - build.js

Add new images to the `2DTextureEditor\res\animations`. Texture Editor (visual-js version 3) use own source directorium 
(2DTextureEditor\res\animations). Run `npm run res.tex.editor` after adding new image. Always need to create new folder and put new image intro the folder. After this command you will see access `RESOURCE.folderName`.

Write you code intro: `actual.js`
You can make multi instance like tex1.html/tex1.js , tex2.html/tex2.js etc...

Click on Iframe dom element to make focus and then press key `F4` for editor mode.

## Links

EDITOR REGIME:
https://github.com/zlatnaspirala/matrix-engine/wiki/How-to-define-%60Texture-editor%60-%5Bvisual-js-game-engine%5D-in-matrix-engine-for-DEV-MODE


FINAL BUILD REGIME:
https://github.com/zlatnaspirala/matrix-engine/wiki/How-to-define-%60Texture-editor%60-%5Bvisual-js-game-engine%5D-in-matrix-engine-for-PRODC-MODE

