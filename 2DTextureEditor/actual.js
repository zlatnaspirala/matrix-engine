
import {sys, ActivateModifiers, loadEditor, runEditor, loadEditorObjects} from 'visual-js';

var runTextureEditor = (curTexId) => {

  // Visual-JS 3

  // must be fixed - double call
  if(typeof window.RESOURCE !== 'undefined') return;

  ActivateModifiers();
  // Run editor
  runEditor();
  // loadEditor();

  sys.DOM.CREATE_SURFACE("SURF", curTexId, 100, 99.4, "DIAMETRIC");
  actualTexture.ENGINE.CREATE_MODUL("STARTER");

  /**
   * @description
   * Create non-editor game objects here (from code)
   */
  let smodul = actualTexture.ENGINE.MODULES.ACCESS_MODULE("STARTER");
  // smodul.NEW_OBJECT("IamNewObject", 25, 50, 12, 25, 10);

  // Run editor ASYNC!
  loadEditorObjects();

  sys.SCRIPT.LOAD("res/animations/resource.js").then(() => {
    addEventListener('postScriptReady', () => {

      // Access
      console.log("window.parent.matrixEngine.App.scene.outsideBox.streamTextures ",
       window.parent.matrixEngine.App.scene.outsideBox.streamTextures)

      var posGreen = new sys.MATH.OSCILLATOR(10, 80, 1);
      var posBlend1 = new sys.MATH.OSCILLATOR(-30, 120, 2);
      pilLeft.ANIMATION.ROTATE.ANGLE = 90;
      pilRight.ANIMATION.ROTATE.ANGLE = 90;
      pilLeft.POSITION.SET_POSITION(-185, 230);
      text1.TEXTBOX.font = '33px stormfaze';

      pilGreen.TESTposGreen = posGreen;

      // VJS3 Staff
      pilLeft.ON_UPDATE = function() {
        // NEPTUN.ROTATE.ROTATE_ARROUNT_CENTER()
        pilGreen.POSITION.TRANSLATE(8, posGreen.UPDATE());
        blend1.POSITION.TRANSLATE(8, posBlend1.UPDATE());
      };

    });
  });
}

// Automatic run
runTextureEditor('actualTexture');

window.runTextureEditor = runTextureEditor;
