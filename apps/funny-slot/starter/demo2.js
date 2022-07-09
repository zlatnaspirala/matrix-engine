//###############################################//###############################################
//###############################################//###############################################
// USER PART OF CODE 
/**
Filename : demo1.js

 - Adding new objects composite structure
 - Create procedure for new stage

*/
//###############################################//###############################################
//###############################################//###############################################
  
  //Procedures are your job 
  // ANY_NAME_HERE_NEW_STAGE -->> Any name 

//Construct   V = vertical maximum value /steps
//                  H = Horizontal maximum value /steps 
//                   w = width
//					h = height

//ANY_NAME_HERE_NEW_STAGE( H , V , step , w  , h )


function ANY_NAME_HERE_NEW_STAGE( H , V , step , w  , h ) {

for (var y=0;y<V;y = y + step){


for (var x=0;x<H;x = x + step){

var name = "IamNewObject" + x + y;

 
HELLO_WORLD.ENGINE.MODULES.ACCESS_MODULE("STARTER").NEW_OBJECT( name , x   , y , w , h , 10)
 
 
 

HELLO_WORLD.ENGINE.MODULES.ACCESS_MODULE("STARTER").GAME_OBJECTS.ACCESS(name).CREATE_ANIMATION( SURF , "DRAW_FRAME" , 6 , RESOURCE.Tiles  , 1111123123 , "no" , 1,11,1,1,1) 

//window[name].DRAG = false;
window[name].POSITION.DIMENSION.H = window[name].POSITION.DIMENSION.W;
  
window[name].TAP = function(){  

//IMPORTANT
// Use this  for any operation in gameObject

this.DESTROY_ME_AFTER_X_SECUND( 0.01 );
console.log("THIS MUST BE TERMINATED ON CLICK : " + this.NAME);

};

}


}




}

ANY_NAME_HERE_NEW_STAGE( 100 , 100 , 10 , 10  , 10 )




 
 