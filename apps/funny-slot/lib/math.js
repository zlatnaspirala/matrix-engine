


/* 
try {			
}
catch(e){

SYS.DEBUG.CRITICAL("Error in procedure 'CREATE_IMG' , description : " + ); 

} */


//###############################################//###############################################
//###############################################//###############################################
// ROUND NUMBER   
function round(value, decimals) {

if ( typeof value === 'object' ||  typeof decimals === 'object' ) {
	
SYS.DEBUG.WARNING( "SYS : warning for procedure 'SYS.MATH.NUMBER_ROUND'  Desciption : Replace object with string ,  this >> "+typeof value+" << must be string or number.");
	
}
else if ( typeof value === 'undefined' || typeof decimals === 'undefined') {

SYS.DEBUG.WARNING( "SYS : warning for procedure 'SYS.MATH.NUMBER_ROUND'  Desciption : arguments (value, decimals) cant be undefined ,  this >> "+typeof value+" << must be string or number.");
	
}
else {
	
return Number(Math.round(value+'e'+decimals)+'e-'+decimals);

}

}


//###############################################//###############################################
//###############################################//###############################################
// RANDOM INT FROM-TO 
function randomIntFromTo(min,max){

if ( typeof min === 'object' ||  typeof max === 'object' ) {
	
SYS.DEBUG.WARNING( "SYS : warning for procedure 'SYS.MATH.RANDOM_INT_FROM_TO'  Desciption : Replace object with string ,  this >> "+typeof min+" and "+typeof min+" << must be string or number.");
	
}
else if ( typeof min === 'undefined' || typeof max === 'undefined') {

SYS.DEBUG.WARNING( "SYS : warning for procedure 'SYS.MATH.RANDOM_INT_FROM_TO'  Desciption : arguments (min, max) cant be undefined ,  this >> "+typeof min+" and "+typeof min+"  << must be string or number.");
	
}
else {
	
	return Math.floor(Math.random()*(max-min+1)+min);

}

}
//###############################################//###############################################
//###############################################//###############################################





//###############################################//###############################################
//###############################################//###############################################
//Convert toDegrees/toRadians
//###############################################//###############################################
//###############################################//###############################################
function toDegrees (angle) {
	if (typeof angle === "string" || typeof angle === "number" ) {	
		return angle * (180 / Math.PI);
	}else{
SYS.DEBUG.WARNING( "SYS : warning for procedure 'SYS.MATH.TO_RADIANS'  Desciption : Input arr ,  angle >> "+typeof angle+"  << must be string or number.");				
	}
}
function toRadians (angle) {
	if (typeof angle === "string" || typeof angle === "number" ) {	
  return angle * (Math.PI / 180);
	}
	else{
SYS.DEBUG.WARNING( "SYS : warning for procedure 'SYS.MATH.TO_RADIANS'  Desciption : Input arr ,  angle >> "+typeof angle+"  << must be string or number.");		
	}
}
//###############################################//###############################################
//###############################################//###############################################



function ORBIT(cx, cy, angle, p )
{
  var s = Math.sin(angle);
  var c = Math.cos(angle);

  // translate point back to origin:
  p.x -= cx;
  p.y -= cy;

  // rotate point
   xnew = p.x * c - p.y * s;
   ynew = p.x * s + p.y * c;

  // translate point back:
  p.x = xnew + cx;
  p.y = ynew + cy;
  return p;
}



//###############################################//###############################################
//###############################################//###############################################
//GET PULSE VALUES IN REAL TIME
//###############################################//###############################################
//###############################################//###############################################
function OSCILLATOR (min , max , step) {

if ((typeof min === "string" || typeof min === "number" ) &&  (typeof max === "string" || typeof max === "number" ) && (typeof step === "string" || typeof step === "number" )) {	
	
this.min = parseFloat(min);
this.max = parseFloat(max);
this.step = parseFloat(step);
this.value_ = parseFloat(min);
this.status = 0;
this.UPDATE = function(STATUS_){
if (STATUS_ === undefined) {
if (this.status == 0 && this.value_ < this.max) {
this.value_ = this.value_  + this.step;
if (this.value_ >= this.max){ this.value_ = this.max ; this.status = 1;}
return this.value_;
}
else if (this.status == 1 && this.value_ > this.min) {
this.value_ = this.value_  - this.step;
if (this.value_ <= this.min){ this.value_ = this.min ; this.status = 0;}
return this.value_;
}
}else {
return this.value_;
}
};

}else {
	
SYS.DEBUG.WARNING( "SYS : warning for procedure 'SYS.MATH.OSCILLATOR'  Desciption : Replace object with string or number,  min >> "+typeof min+" and max >>"+typeof max+"  and step >>"+typeof step+" << must be string or number.");

}
//AUTO UPDATE HERE

}
//###############################################//###############################################
//###############################################//###############################################


//###############################################//###############################################
//###############################################//###############################################
//GET INCREMENT VALUES IN REAL TIME
//###############################################//###############################################
//###############################################//###############################################
function INCREMENTATOR (min , max , step , stop_after) {
if ((typeof min === "string" || typeof min === "number" ) &&  (typeof max === "string" || typeof max === "number" ) && (typeof step === "string" || typeof step === "number" )) {	
if (typeof stop_after != 'undefined') {
this.stop_after = stop_after;	
}else {
this.stop_after = 1;	
}
this.loops = 0;
this.min = parseFloat(min);
this.max = parseFloat(max);
this.step = parseFloat(step);
this.value_ = parseFloat(min);
this.status = 0;

this.UPDATE = function(STATUS_){

if (STATUS_ === undefined) {
if (this.status == 0 && this.value_ < this.max) {
this.value_ = this.value_  + this.step;
if (this.value_ >= this.max){ 
this.value_ = this.min;
if (this.loops == this.stop_after){
	
this.status = 1;
	
}

}
return this.value_;
}
else {
return this.value_;
}


}
};
//AUTO UPDATE HERE

}
else {
	
SYS.DEBUG.WARNING( "SYS : warning for procedure 'SYS.MATH.OSCILLATOR'  Desciption : Replace object with string or number,  min >> "+typeof min+" and max >>"+typeof max+"  and step >>"+typeof step+" << must be string or number.");

}

}

//###############################################//###############################################
//###############################################//###############################################

//###############################################//###############################################
//###############################################//###############################################
//MAKE MOVE WITH NEW TARGET COORDINATE
//###############################################//###############################################
//###############################################//###############################################
function DIMENSION (w,h , type_ ) {

if (typeof w === undefined){
this.W = 10;
SYS.DEBUG.WARNING( "SYS : warning for procedure new 'DIMENSION'  Desciption : arguments (w , h ) are  undefined ,  system will setup 10% of width and height.");
}else {
this.W = w;
}
if (typeof h === undefined){
this.H = 10;
SYS.DEBUG.WARNING( "SYS : warning for procedure new 'DIMENSION'  Desciption : arguments (w , h ) are  undefined ,  system will setup 10% of width and height.");
}else {
this.H = h;
}




this.WIDTH = function(){

return window.innerWidth/100*this.W;

};

this.HEIGHT = function(){

return window.innerHeight/100*this.H;

};


}
//###############################################//###############################################
//###############################################//###############################################



//###############################################//###############################################
//###############################################//###############################################
//MAKE MOVE WITH NEW TARGET COORDINATE
//###############################################//###############################################
//###############################################//###############################################
function POSITION (curentX , curentY , targetX_ , targetY_ ,  thrust_){

var ROOT=this; 
this.FREEZ = false; 


this.ON_TARGET_POSITION = function(){};
 
//parameters
this.x = curentX;
this.y = curentY;
this.targetX = targetX_;
this.targetY = targetY_;
this.velX = 0;
this.velY = 0;
 
this.thrust = thrust_;

this.TYPE = "NORMAL";

this.IN_MOVE = true;
//metods

this.SET_SPEED = function(num_){

if (typeof num_ === "number") {
this.thrust = num_;
}
else{
SYS.DEBUG.WARNING( "SYS : warning for method 'POSITION.SET_SPEED'  Desciption : arguments (w , h ) must be type of number.");
}


};


this.TRANSLATE_BY_X = function(x_){
this.IN_MOVE = true;
this.targetX = x_;
};
this.TRANSLATE_BY_Y = function(y_){
this.IN_MOVE = true;
this.targetY = y_;
};
this.TRANSLATE = function(x_,y_){
this.IN_MOVE = true;
this.targetX = x_;
this.targetY = y_;
};

this.SET_POSITION = function(x_,y_ , type_){

if (type_ == "DIAMETRIC"){
	
this.targetX =x_;
this.targetY =y_;

this.x = x_;
this.y = y_;

this.IN_MOVE = false;
}else{

this.targetX = CONVERTOR.PIX_TO_PER( x_ );
this.targetY = CONVERTOR.PIX_TO_PER( y_ );

this.x = CONVERTOR.PIY_TO_PER( x_ );
this.y = CONVERTOR.PIY_TO_PER( y_ );

this.IN_MOVE = false;	
	
	
}

 
};



this.UPDATE = function(){

if (   window[ROOT.PROGRAM_NAME].ENGINE.GAME_TYPE == "PLATFORMER" && typeof ROOT.PLAYER === 'undefined' && typeof window["PLAYER"] !== 'undefined' && PLAYER.FREEZ == false){
	
	this.thrust = 2;
	
this.IN_MOVE = true;	
this.targetX = this.targetX + PLAYER.X;
this.targetY = this.targetY + PLAYER.Y;
	 	
 }else {
	 try{
	  
    //	 this.IN_MOVE = false;
	
	 }catch(e){}
}
 
var tx = this.targetX - this.x,ty = this.targetY - this.y,dist = Math.sqrt(tx*tx+ty*ty),rad = Math.atan2(ty,tx),angle = rad/Math.PI * 180;
this.velX = (tx/dist)*this.thrust;
this.velY = (ty/dist)*this.thrust;

// stop the box if its too close so it doesn't just rotate and bounce
if (this.IN_MOVE == true){
	
  if(dist > this.thrust){
	  
 	 
	this.x += this.velX;
	this.y += this.velY;
	 
	
  }
  else{

	this.x = this.targetX;
	this.y = this.targetY; 
	this.IN_MOVE = false;
	ROOT.ON_TARGET_POSITION();
	try{
		if (window[ROOT.PROGRAM_NAME].ENGINE.GAME_TYPE != "PLATFORMER" && APPLICATION.EDITOR == true) {
    SET_NEW_START_UP_POS( this.parentGameObject  , this.PROGRAM_NAME , this.parentModul , this.targetX , this.targetY , this.DIMENSION.W , this.DIMENSION.H );
		}
		
	}catch(e){console.log(e+":::in:::SET_NEW_START_UP_POS")}
   
  }

}

};

this.X = function(){
	
 /* else if (   window[ROOT.PROGRAM_NAME].ENGINE.GAME_TYPE == "PLATFORMER" && typeof ROOT.PLAYER != 'undefined'){
 if (ROOT.PLAYER == 'NORMAL_CONTROL') {
 
 }
 } */
// else{
return window.innerWidth/100*this.x;	 
 //}

};


this.Y = function(){
if (   window[ROOT.PROGRAM_NAME].ENGINE.GAME_TYPE == "PLATFORMER" && typeof ROOT.PLAYER === 'undefined'){
return window.innerHeight/100*this.y;
}
else{
return window.innerHeight/100*this.y;	 
}
 
};



}

