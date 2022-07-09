
import {sys, ActivateModifiers, loadEditor, runEditor, loadEditorObjects} from 'visual-js';

var runTextureEditor = (curTexId) => {
  ActivateModifiers();

  sys.DOM.CREATE_SURFACE("SURF", curTexId, 100, 99.4, "DIAMETRIC");
  window[curTexId].ENGINE.CREATE_MODUL("STARTER");

  /**
   * @description
   * Create non-editor game objects here (from code)
   */
  let smodul = window[curTexId].ENGINE.MODULES.ACCESS_MODULE("STARTER");
  smodul.NEW_OBJECT("FUNNY" , 45 , 45 , 22 , 22 , 10);
  FUNNY.CREATE_ANIMATION( SURF , "DRAW_FRAME" ,0 , RESOURCE.numbers2  , 1111123123 , "no" , 1,11,1,1,1) ;
  // FONTAN type is only type for now , you can access to the particle settings
  FUNNY.CREATE_PARTICLE( 'FONTAN');

}

window.runTextureEditor = runTextureEditor;
