//###############################################//###############################################
//###############################################//###############################################
// USER PART OF CODE 
/**
Filename : run.js

*/
//###############################################//###############################################
//###############################################//###############################################

// START THE PROGRAM 
// MAIN DRAW INTERVAL SWITCH 

// FOR CANVAS RESIZE_TYPE = FIXED
SYS.DOM.CREATE_SURFACE( "SURF" , "HELLO_WORLD" , 100 , 99.4 , "DIAMETRIC" );

//NOW HELLO_WORLD IS OBJECT WITH ONE CANVAS TAG
HELLO_WORLD.ENGINE.CREATE_MODUL("STARTER");
var SMODULE = HELLO_WORLD.ENGINE.MODULES.ACCESS_MODULE("STARTER"); 
 
 
//SYS.SCRIPT.LOAD("starter/templates/paths.js")



 
SMODULE.NEW_OBJECT("TESLA" , 45 , 35 , 20 , 10 , 10);
TESLA.TYPE_OF_GAME_OBJECT = 'CUSTOM';

TESLA.FREE = {};
TESLA.FREE.X = new OSCILLATOR(1 , VIEW.W() , 2 );
TESLA.FREE.Y = new OSCILLATOR(1 , VIEW.H() , 11);

TESLA.FREE.COLOR = {};
TESLA.FREE.COLOR.RED = new OSCILLATOR(0 , 255 , 1);
TESLA.FREE.COLOR.GREEN = new OSCILLATOR(0 , 255 , 3);
TESLA.FREE.COLOR.BLUE = new OSCILLATOR(0 , 255 , 5);
TESLA.FREE.DIM = new OSCILLATOR(1 , 200 , 1 );

HELLO_WORLD.MAP.CLEAR_MAP = false;

 
TESLA.CUSTOM = function (s) {

SURF.fillStyle = 'rgb('+TESLA.FREE.COLOR.RED.UPDATE()+' , '+TESLA.FREE.COLOR.GREEN.UPDATE()+' , '+TESLA.FREE.COLOR.BLUE.UPDATE()+')';
SURF.strokeStyle = 'rgb('+TESLA.FREE.COLOR.RED.UPDATE()+' , '+TESLA.FREE.COLOR.GREEN.UPDATE()+' , '+TESLA.FREE.COLOR.BLUE.UPDATE()+')';
 
SURF.beginPath();
SURF.lineWidth = TESLA.FREE.DIM.UPDATE();
SURF.moveTo( TESLA.FREE.X.UPDATE() , TESLA.FREE.Y.UPDATE() );
ORBIT( 50  , 50 , 1 , this.POSITION )
SURF.lineTo( TESLA.FREE.X.UPDATE() , TESLA.FREE.Y.UPDATE() );
SURF.stroke();

};
 



 
