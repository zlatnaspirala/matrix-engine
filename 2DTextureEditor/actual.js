
import { sys, ActivateModifiers, loadEditor, runEditor, loadEditorObjects } from 'visual-js';

var runTextureEditor = (curTexId) => {
  ActivateModifiers();

  // Run editor
  runEditor();
  loadEditor();

  sys.DOM.CREATE_SURFACE("SURF", curTexId, 100, 99.4, "DIAMETRIC");
  actualTexture.ENGINE.CREATE_MODUL("STARTER");

  /**
   * @description
   * Create non-editor game objects here (from code)
   */
  // let smodul = actualTexture.ENGINE.MODULES.ACCESS_MODULE("STARTER");
  // smodul.NEW_OBJECT("IamNewObject", 25, 50, 12, 25, 10);

  // Run editor
  loadEditorObjects();
}

window.runTextureEditor = runTextureEditor;
