// Editor mode
import {sys, ActivateModifiers,  loadEditor, runEditor, loadEditorObjects} from 'visual-js';

var runTextureEditor = (curTexId) => {
  // Visual-JS 3 part
  // must be fixed - double call
  if(typeof window.RESOURCE !== 'undefined') return;

  // Final build
  // application.EDITOR = false;

  ActivateModifiers();

  // Run editor
  runEditor();
  loadEditor();

  sys.DOM.CREATE_SURFACE("SURF", curTexId, 100, 99.4, "DIAMETRIC");
  actualTexture.ENGINE.CREATE_MODUL("STARTER");
  let smodul = actualTexture.ENGINE.MODULES.ACCESS_MODULE("STARTER");

  // Run editor only !
  loadEditorObjects();

  sys.SCRIPT.LOAD("res/animations/resource.js").then(() => {
    console.log('res/animations/resource.js ...')
  });
}

// Automatic run
runTextureEditor('actualTexture');

// Easy console access
window.runTextureEditor = runTextureEditor;
