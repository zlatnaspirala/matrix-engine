

import {sys, ActivateModifiers, loadEditor, runEditor, loadEditorObjects} from 'visual-js';

var runTextureEditor = (curTexId) => {
  ActivateModifiers();

  sys.DOM.CREATE_SURFACE("SURF", curTexId, 100, 99.4, "DIAMETRIC");
  window[curTexId].ENGINE.CREATE_MODUL("STARTER");

  // OSCILLATOR

  /**
   * @description
   * Create non-editor game objects here (from code)
   */
  let smodul = window[curTexId].ENGINE.MODULES.ACCESS_MODULE("STARTER");
  smodul.NEW_OBJECT("TESLA", 45, 35, 20, 10, 10);
  TESLA.TYPE_OF_GAME_OBJECT = 'CUSTOM';
  TESLA.FREE = {};
  TESLA.FREE.X = new sys.MATH.OSCILLATOR(1, window.innerHeight, 2);
  TESLA.FREE.Y = new sys.MATH.OSCILLATOR(1, window.innerHeight, 11);
  TESLA.FREE.COLOR = {};
  TESLA.FREE.COLOR.RED = new sys.MATH.OSCILLATOR(0, 255, 1);
  TESLA.FREE.COLOR.GREEN = new sys.MATH.OSCILLATOR(0, 255, 3);
  TESLA.FREE.COLOR.BLUE = new sys.MATH.OSCILLATOR(0, 255, 5);
  TESLA.FREE.DIM = new sys.MATH.OSCILLATOR(1, 200, 1);
  window[curTexId].MAP.CLEAR_MAP = false;

  TESLA.CUSTOM = function(s) {
    SURF.fillStyle = 'rgb(' + TESLA.FREE.COLOR.RED.UPDATE() + ' , ' + TESLA.FREE.COLOR.GREEN.UPDATE() + ' , ' + TESLA.FREE.COLOR.BLUE.UPDATE() + ')';
    SURF.strokeStyle = 'rgb(' + TESLA.FREE.COLOR.RED.UPDATE() + ' , ' + TESLA.FREE.COLOR.GREEN.UPDATE() + ' , ' + TESLA.FREE.COLOR.BLUE.UPDATE() + ')';

    SURF.beginPath();
    SURF.lineWidth = TESLA.FREE.DIM.UPDATE();
    SURF.moveTo(TESLA.FREE.X.UPDATE(), TESLA.FREE.Y.UPDATE());
    sys.MATH.ORBIT(50, 50, 1, this.POSITION)
    SURF.lineTo(TESLA.FREE.X.UPDATE(), TESLA.FREE.Y.UPDATE());
    SURF.stroke();
  };

}

window.runTextureEditor = runTextureEditor;
