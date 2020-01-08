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


// if you setup true , path have prefix /res/animations/
//RESOURCE.Tiles = {source : [ "https://maximumroulette.com/framework/res/animations/HUD/hudHeart_full.png" ]};
SMODULE.NEW_OBJECT("FUNNY" , 45 , 45 , 22 , 22 , 10);



FUNNY.CREATE_ANIMATION( SURF , "DRAW_FRAME" ,0 , RESOURCE.Tiles  , 1111123123 , "no" , 1,11,1,1,1) ;


// FONTAN type is only type for now , you can access to the particle settings
//
FUNNY.CREATE_PARTICLE( 'FONTAN');





