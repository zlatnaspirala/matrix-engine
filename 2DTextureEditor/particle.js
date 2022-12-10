
// Final build
import {sys, ActivateModifiers, application} from 'visual-js';

// For dev stage
// import {sys, ActivateModifiers,  loadEditor, runEditor, loadEditorObjects} from 'visual-js';

var runTextureEditor = (curTexId) => {
  // Visual-JS 3 part

  // must be fixed - double call
  if(typeof window.RESOURCE !== 'undefined') return;

  // Final build
  application.EDITOR = false;

  ActivateModifiers();

  // Run editor
  // runEditor();
  // loadEditor(); - this load keyboard and other gui staff no need now.

  sys.DOM.CREATE_SURFACE("SURF", curTexId, 100, 99.4, "DIAMETRIC");
  window[curTexId].ENGINE.CREATE_MODUL("STARTER");

  /**
   * @description
   * Create non-editor game objects here (from code)
   */
  let smodul = window[curTexId].ENGINE.MODULES.ACCESS_MODULE("STARTER");

  sys.SCRIPT.LOAD("res/animations/resource.js").then(() => {
    // addEventListener('postScriptReady', () => {
    sys.SCRIPT.LOAD("starter/particle.js").then(() => {
      // WRITE YOUR VisualJS Code
      myObjectEmiter.refPos = 10;
      myObjectEmiter.PARTICLE.settings.particleSize = 1
      myObjectEmiter.POSITION.TRANSLATE_BY_X(myObjectEmiter.refPos);
      myObjectEmiter.POSITION.ON_TARGET_POSITION = () => {
        if (myObjectEmiter.refPos == 10) {
          myObjectEmiter.refPos = 90;
        } else {
          myObjectEmiter.refPos = 10;
        }
        myObjectEmiter.POSITION.TRANSLATE_BY_X(myObjectEmiter.refPos);
      }

    });
  });

  // Run editor only !
  // loadEditorObjects();

  // // value 1 is speed !!
  // smodul.NEW_OBJECT("IamNewObject", 12, 25, 35, 15, 1);
  // smodul.NEW_OBJECT("IamNewObject2", 57, 25, 35, 15, 1);
  // smodul.NEW_OBJECT("Time", 10, 60, 85, 15, 1);
  // smodul.GAME_OBJECTS.ACCESS("IamNewObject").CREATE_TEXTBOX("edit me", 10, "black", "lime");
  // smodul.GAME_OBJECTS.ACCESS("IamNewObject2").CREATE_TEXTBOX("no edit", 10, "black", "lime");
  // smodul.GAME_OBJECTS.ACCESS("Time").CREATE_TEXTBOX("0", 10, "black", "lime");
  // // NO EDIT
  // IamNewObject2.TEXTBOX.EDIT = false;
  // IamNewObject2.TEXTBOX.border_on_focus_width_line = 10;
  // Time.DRAG = false;
  // // var ROT_DELTA = new sys.MATH.OSCILLATOR(0, 360, 5);
  // // var POS_DELTA = new sys.MATH.OSCILLATOR(10, 80, 1);
  // Time.ON_UPDATE = function() {
  //   this.TEXTBOX.TEXT = Date()
  // };

}

// Automatic run
runTextureEditor('particle');

window.runTextureEditor = runTextureEditor;