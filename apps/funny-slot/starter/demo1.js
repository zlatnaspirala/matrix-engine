//###############################################//###############################################
//###############################################//###############################################
// USER PART OF CODE 
/**
Filename : demo1.js

 - Adding new objects 
 - Atach image

*/
//###############################################//###############################################
//###############################################//###############################################
 

HELLO_WORLD.ENGINE.MODULES.ACCESS_MODULE("STARTER").NEW_OBJECT("IamNewObject" , 5 , 50 , 12 , 15 , 10)
HELLO_WORLD.ENGINE.MODULES.ACCESS_MODULE("STARTER").GAME_OBJECTS.ACCESS("IamNewObject").CREATE_ANIMATION( SURF , "DRAW_FRAME" , 6 , RESOURCE.Tiles  , 1111123123 , "no" , 1,11,1,1,1) 

IamNewObject.DRAG = false;
IamNewObject.POSITION.DIMENSION.HEIGHT = IamNewObject.POSITION.DIMENSION.WIDTH;


IamNewObject.TAP = function(){  

console.log("TOUCHED: " + this.NAME );
IamNewObject.DESTROY_ME_AFTER_X_SECUND( 0.01 , "IamNewObject" );

};

 

 
 