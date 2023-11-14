
// Editor mode
import {sys, ActivateModifiers,  loadEditor, runEditor, loadEditorObjects} from 'visual-js';

// npm run build.tex.editor
// BUILD FROM EDITOR TO REAL JS FILE
// It is auto-generated file ./starter/visual.js [from cache/ folder]
// If you wanna multiply use of texture editor
// just rename ./starter/actual.final.js
// and then use `sys.SCRIPT.LOAD("starter/actual.final.js").then(() => {`
// Lets make another texture editor file...
// DISABLE NOW EDITOR

var runTextureEditor = (curTexId) => {
  // Visual-JS 3 part
  // must be fixed - double call
  if(typeof window.RESOURCE !== 'undefined') return;
  // Final build
  // application.EDITOR = false;
  ActivateModifiers();
  // Run editor
  runEditor();
  loadEditor(); // - this load keyboard and other gui staff no need now.

  sys.DOM.CREATE_SURFACE("SURF", curTexId, 100, 99.4, "DIAMETRIC");
  actualTexture.ENGINE.CREATE_MODUL("STARTER");

  /**
   * @description
   * Create non-editor game objects here (from code)
   */
  let smodul = actualTexture.ENGINE.MODULES.ACCESS_MODULE("STARTER");
  // smodul.NEW_OBJECT("IamNewObject", 25, 50, 12, 25, 10);

  // Run editor only !
  loadEditorObjects();

  sys.SCRIPT.LOAD("res/animations/resource.js").then(() => {
    // addEventListener('postScriptReady', () => {
    // sys.SCRIPT.LOAD("starter/actual.final.js").then(() => {
    //   // Access
    //   console.log("window.parent.matrixEngine.App.scene.outsideBox.streamTextures ",
    //     window.parent.matrixEngine.App.scene.outsideBox.streamTextures)

    //   var posGreen = new sys.MATH.OSCILLATOR(10, 80, 1);
    //   var posBlend1 = new sys.MATH.OSCILLATOR(-30, 120, 2);
    //   pilLeft.ANIMATION.ROTATE.ANGLE = 90;
    //   pilRight.ANIMATION.ROTATE.ANGLE = 90;
    //   pilLeft.POSITION.SET_POSITION(-185, 230);
    //   text1.TEXTBOX.font = '33px stormfaze';
    //   title.TEXTBOX.font = '43px stormfaze';

    //   // VJS3 Staff
    //   pilLeft.ON_UPDATE = function() {
    //     test.ANIMATION.ROTATE.ANGLE++;
    //     pilGreen.POSITION.TRANSLATE(8, posGreen.UPDATE());
    //     blend1.POSITION.TRANSLATE(8, posBlend1.UPDATE());
    //   };
    // });
  });
}

// Automatic run
runTextureEditor('actualTexture');

// Easy console access
window.runTextureEditor = runTextureEditor;
