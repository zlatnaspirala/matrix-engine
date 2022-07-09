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

function ANY_NAME_HERE_NEW_STAGE( H , V , step , w  , h , Ani_speed ) {
for (var y=0;y<V;y = y + step){
for (var x=0;x<H;x = x + step){
var name = "IamfutureEnemy" + x + y;

HELLO_WORLD.ENGINE.MODULES.ACCESS_MODULE("STARTER").NEW_OBJECT( name , x   , y , w , h , 1 )
HELLO_WORLD.ENGINE.MODULES.ACCESS_MODULE("STARTER").GAME_OBJECTS.ACCESS(name).CREATE_ANIMATION( SURF , "LOOP" , 6 , RESOURCE.Enemies1  , 1221212 , "no" , 1,11,1,Ani_speed,1) 

// eliminate last frame - last frame is character dead 
window[name].ANIMATION.NUMBERS_OF_FRAMES = 2;

window[name].DRAG = false;

//window[name].POSITION.DIMENSION.HEIGHT = window[name].POSITION.DIMENSION.WIDTH /VIEW.ASPECT();

window[name].POSITION.DIMENSION.W = window[name].POSITION.DIMENSION.H / VIEW.ASPECT();



window[name].TAP = function(){  

this.DESTROY_ME_AFTER_X_SECUND( 1 );
console.log("THIS MUST BE TERMINATED ON CLICK : " + this.NAME);

};



window[name].EFFECTS.ZOOM.ZOOM_IN_FINISHED = function(){
// MAke zoom out automatic
this.OUT(2);

};


// This our variable (not from lib)
window[name].EFFECTS.ZOOM.PREVENT_ = false;

 
window[name].EFFECTS.ZOOM.ZOOM_OUT_FINISHED = function(){
	
this.PREVENT_ = false;	

};


window[name].TOUCH_MOVE = function(){

if ( this.EFFECTS.ZOOM.STATUS_FOR_IN == false && this.EFFECTS.ZOOM.PREVENT_ == false) {
this.EFFECTS.ZOOM.STATUS_FOR_IN = true;
this.EFFECTS.ZOOM.PREVENT_ = true;
console.log("this.EFFECTS.ZOOM.STATUS_FOR_IN" + this.EFFECTS.ZOOM.STATUS_FOR_IN)
this.EFFECTS.ZOOM.IN(2)

//this.EFFECTS.ZOOM.STATUS_FOR_IN = true;

}


};




}
}

}



ANY_NAME_HERE_NEW_STAGE( 100 , 100 , 15 , 11  , 11 , 10 )


 
 