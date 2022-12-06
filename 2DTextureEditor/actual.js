
import { sys, ActivateModifiers, loadEditor, runEditor, loadEditorObjects } from 'visual-js';

var runTextureEditor = (curTexId) => {

  ActivateModifiers();
  // Run editor
  runEditor();
  // loadEditor();

  sys.SCRIPT.LOAD("res/animations/resource.js").then(()=> {
    console.log("window.RESOURCE2 ", window.RESOURCE)
  });

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

  // test
  setTimeout(() => {
    console.log("Test => ", smodul.GAME_OBJECTS);
  }, 2000);

}

// Automatic run
runTextureEditor('actualTexture');

window.runTextureEditor = runTextureEditor;
