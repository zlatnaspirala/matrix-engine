// Editor mode
import {sys, ActivateModifiers, loadEditor, runEditor, loadEditorObjects, APPLICATION} from 'visual-js';

var runTextureEditor = (curTexId) => {
  // Visual-JS 3 part
  // must be fixed - double call
  if(typeof window.RESOURCE !== 'undefined') return;

  // Final build
  // READONLY_LINE APPLICATION.EDITOR = false;

  ActivateModifiers();

  // Run editor
  runEditor();
  loadEditor();

  sys.DOM.CREATE_SURFACE("SURF", curTexId, 100, 99.4, "DIAMETRIC");
  actualTexture.ENGINE.CREATE_MODUL("STARTER");
  let smodul = actualTexture.ENGINE.MODULES.ACCESS_MODULE("STARTER");

  // FIX ONLY FOR GUI EDITOR
  // document.body.style.marginTop = '-19px'

  // Run editor only !
  loadEditorObjects();

  sys.SCRIPT.LOAD("res/animations/resource.js").then(() => {

    sys.SCRIPT.LOAD("starter/visual.js").then(() => {
    console.log('res/animations/resource.js and visual editor objects...')
    // addEventListener('postScriptReady', () => {
      console.log('Now access object created from editor TEST ! => ', smodul)
      //  return;
      // --------------------------
      //  Manual code
      // --------------------------
      // console.log('NIDZA TEST EDITOR TEST HELLO ', HELLO)
      // if you setup in manifest 
      // IMAGE_LOADER_PREFIX : false , you can put full url
      // if you setup true , path have prefix /res/animations/ 

      // RESOURCE.Tiles = {source: ["pil_black/pil-black.png"]};
      // RESOURCE.Lock = {source: ["pil_black/pil-black.png"]};

      // smodul.GAME_OBJECTS.ACCESS("HELLO").CREATE_ANIMATION( SURF , "DRAW_FRAME" ,0 , RESOURCE.Lock , 1111123123 , "no" , 1,11,1,1,1) ;
      /*
      var ROT_DELTA = new sys.MATH.OSCILLATOR(0, 90, 5);
      var POS_DELTA = new sys.MATH.OSCILLATOR(1, 80, 1);

      HELLO.ON_UPDATE = function() {
        HELLO.POSITION.TRANSLATE(10, POS_DELTA.UPDATE());
      };


      noname.ON_UPDATE = function() {
        noname.ANIMATION.ROTATE.ANGLE = ROT_DELTA.UPDATE();
        noname.POSITION.TRANSLATE(POS_DELTA.UPDATE(), 45);
      };

      TEST.ON_UPDATE = function() {
        TEST.ANIMATION.ROTATE.ANGLE = ROT_DELTA.UPDATE();
      };
      */
      // --------------------------
    })
  });
}

// Automatic run
runTextureEditor('actualTexture');

// Easy console access
window.runTextureEditor = runTextureEditor;
