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
// visual js 0.7 comes with one lib build .
// You can make build with windows GUI visual js tools (makeBuild.exe)
// will be posted as soon as i commit

// Basic example , add new game_object add image with absolute path
// nice ofr distribution system of image res loading

// In this example program is in the edit mode but only for make look
// you cant use rigth contex menu at this page
// See https://bitbucket.org/nikola_l/visual-js


// This is first you will need :
// make surface draws and update functions
SYS.DOM.CREATE_SURFACE( "SURF" , "HELLO_WORLD" , 100 , 99.4 , "DIAMETRIC" );

//One program have a one engine , engine runs modules
//One modul have a gameobjects , use more modules for composition
HELLO_WORLD.ENGINE.CREATE_MODUL("STARTER");

 var SMODULE = HELLO_WORLD.ENGINE.MODULES.ACCESS_MODULE("STARTER");

// value 1 is speed !!
SMODULE.NEW_OBJECT("IamNewObject" , 12 , 25 , 35 , 15 , 1 );
SMODULE.NEW_OBJECT("IamNewObject2" ,57 , 25 , 35 , 15 , 1 );
SMODULE.NEW_OBJECT("Time" , 10 ,60 , 85 , 15 , 1 );


SMODULE.GAME_OBJECTS.ACCESS("IamNewObject").CREATE_TEXTBOX("edit me" , 10 , "black" , "lime") ;


SMODULE.GAME_OBJECTS.ACCESS("IamNewObject2").CREATE_TEXTBOX("no edit" , 10 , "black" , "lime") ;

SMODULE.GAME_OBJECTS.ACCESS("Time").CREATE_TEXTBOX("0" , 10 , "black" , "lime") ;


// NO EDIT
IamNewObject2.TEXTBOX.EDIT = false;
IamNewObject2.TEXTBOX.border_on_focus_width_line = 10;

Time.DRAG = false;

var ROT_DELTA = new SYS.MATH.OSCILLATOR( 0 , 360 , 5);
var POS_DELTA = new SYS.MATH.OSCILLATOR( 10 , 80 , 1);

Time.ON_UPDATE = function(){
    
    this.TEXTBOX.TEXT = Date()
    
};







