/**

THIS FILE was download from 
https://github.com/zlatnaspirala/multi-touch-canvas-handler/blob/master/index.html



*/


function MOBILE_CONTROL (){
 
  this.X =  null;
  this.Y =  null;
  this.LAST_X_POSITION = null;
  this.LAST_Y_POSITION = null;
  this.MULTI_TOUCH = 'NO';
  this.MULTI_TOUCH_X1 = null;  
  this.MULTI_TOUCH_X2 = null;
  this.MULTI_TOUCH_X3 = null;
  this.MULTI_TOUCH_X4 = null;
  this.MULTI_TOUCH_X5 = null;
  this.MULTI_TOUCH_Y1 = null;
  this.MULTI_TOUCH_Y2 = null;
  this.MULTI_TOUCH_Y3 = null;
  this.MULTI_TOUCH_Y4 = null;
  this.MULTI_TOUCH_Y5 = null;
  this.MULTI_TOUCH_X6 = null;  
  this.MULTI_TOUCH_X7 = null;
  this.MULTI_TOUCH_X8 = null;
  this.MULTI_TOUCH_X9 = null;
  this.MULTI_TOUCH_X10 = null;
  this.MULTI_TOUCH_Y6 = null;
  this.MULTI_TOUCH_Y7 = null;
  this.MULTI_TOUCH_Y8 = null;
  this.MULTI_TOUCH_Y9 = null;
  this.MULTI_TOUCH_Y10 = null;
  this.MULTI_TOUCH_INDEX = 1;
  this.SCREEN = [window.innerWidth , window.innerHeight]; 
  this.SCREEN.W = this.SCREEN[0];
  this.SCREEN.H = this.SCREEN[1];
  //Application general
  this.AUTOR = "Nikola Lukic";
  this.APPLICATION_NAME = "mobile multi touch , system plugin for hardcorejs .";
 
 
}

var CONTROL = new MOBILE_CONTROL();


document.addEventListener('touchstart', function(event) 
{ 
 
if (CONTROL.MULTI_TOUCH == 'NO') {
	var touch = event.touches[0];
	CONTROL.X = touch.pageX;
	CONTROL.Y = touch.pageY;
	console.log('TOUCH START AT:(X' + CONTROL.X + '),(' + CONTROL.Y + ')' );
	
}
else if (CONTROL.MULTI_TOUCH == 'YES') {
  var touches_changed = event.changedTouches;
   
   for (var i=0; i<touches_changed.length;i++) {
   
   //CONTROL.MULTI_TOUCH_X1
  console.log("multi touch : x" + CONTROL.MULTI_TOUCH_INDEX + ":(" +touches_changed[i].pageX + ")");
  switch(CONTROL.MULTI_TOUCH_INDEX)
{
case 1:
  CONTROL.MULTI_TOUCH_X1=touches_changed[i].pageX;
  CONTROL.MULTI_TOUCH_Y1=touches_changed[i].pageY;
  break;
case 2:
  CONTROL.MULTI_TOUCH_X2=touches_changed[i].pageX;
  CONTROL.MULTI_TOUCH_Y2=touches_changed[i].pageY;
  break;
case 3:
  CONTROL.MULTI_TOUCH_X3=touches_changed[i].pageX;
  CONTROL.MULTI_TOUCH_Y3=touches_changed[i].pageY;
  break;
case 4:
  CONTROL.MULTI_TOUCH_X4=touches_changed[i].pageX;
  CONTROL.MULTI_TOUCH_Y4=touches_changed[i].pageY;
  break;
case 5:
  CONTROL.MULTI_TOUCH_X5=touches_changed[i].pageX;
  CONTROL.MULTI_TOUCH_Y5=touches_changed[i].pageY;
  break;
case 6:
  CONTROL.MULTI_TOUCH_X6=touches_changed[i].pageX;
  CONTROL.MULTI_TOUCH_Y6=touches_changed[i].pageY;
  break;
case 7:
  CONTROL.MULTI_TOUCH_X7=touches_changed[i].pageX;
  CONTROL.MULTI_TOUCH_Y7=touches_changed[i].pageY;
  break;
case 8:
  CONTROL.MULTI_TOUCH_X8=touches_changed[i].pageX;
  CONTROL.MULTI_TOUCH_Y8=touches_changed[i].pageY;
  break;
case 9:
  CONTROL.MULTI_TOUCH_X9=touches_changed[i].pageX;
  CONTROL.MULTI_TOUCH_Y9=touches_changed[i].pageY;
  break;
case 10:
  CONTROL.MULTI_TOUCH_X10=touches_changed[i].pageX;
  CONTROL.MULTI_TOUCH_Y10=touches_changed[i].pageY;
  break;
default:
  //code to be executed if n is different from case 1 and 2
}
  CONTROL.MULTI_TOUCH_INDEX = CONTROL.MULTI_TOUCH_INDEX + 1;
  
  
  }
}
CONTROL.MULTI_TOUCH = 'YES';
 
},false);
////////////////////////////////////////////////////////
document.addEventListener('touchmove', function(event) 
{ 
var touch = event.touches[0];
CONTROL.X = touch.pageX;
CONTROL.Y = touch.pageY;
console.log('TOUCH MOVE AT:(X' + CONTROL.X + '),(' + CONTROL.Y + ')' );
//#############
 if (CONTROL.MULTI_TOUCH == 'YES') {
  var touches_changed = event.changedTouches;
   
   for (var i=0; i<touches_changed.length;i++) {
   
   //CONTROL.MULTI_TOUCH_X1
  console.log("multi touch : x" + CONTROL.MULTI_TOUCH_INDEX + ":(" +touches_changed[i].pageX + ")");
  switch(i)
{
case 1:
  CONTROL.MULTI_TOUCH_X1=touches_changed[i].pageX;
  CONTROL.MULTI_TOUCH_Y1=touches_changed[i].pageY;
  break;
case 2:
  CONTROL.MULTI_TOUCH_X2=touches_changed[i].pageX;
  CONTROL.MULTI_TOUCH_Y2=touches_changed[i].pageY;
  break;
case 3:
  CONTROL.MULTI_TOUCH_X3=touches_changed[i].pageX;
  CONTROL.MULTI_TOUCH_Y3=touches_changed[i].pageY;
  break;
case 4:
  CONTROL.MULTI_TOUCH_X4=touches_changed[i].pageX;
  CONTROL.MULTI_TOUCH_Y4=touches_changed[i].pageY;
  break;
case 5:
  CONTROL.MULTI_TOUCH_X5=touches_changed[i].pageX;
  CONTROL.MULTI_TOUCH_Y5=touches_changed[i].pageY;
  break;
case 6:
  CONTROL.MULTI_TOUCH_X6=touches_changed[i].pageX;
  CONTROL.MULTI_TOUCH_Y6=touches_changed[i].pageY;
  break;
case 7:
  CONTROL.MULTI_TOUCH_X7=touches_changed[i].pageX;
  CONTROL.MULTI_TOUCH_Y7=touches_changed[i].pageY;
  break;
case 8:
  CONTROL.MULTI_TOUCH_X8=touches_changed[i].pageX;
  CONTROL.MULTI_TOUCH_Y8=touches_changed[i].pageY;
  break;
case 9:
  CONTROL.MULTI_TOUCH_X9=touches_changed[i].pageX;
  CONTROL.MULTI_TOUCH_Y9=touches_changed[i].pageY;
  break;
case 10:
  CONTROL.MULTI_TOUCH_X10=touches_changed[i].pageX;
  CONTROL.MULTI_TOUCH_Y10=touches_changed[i].pageY;
  break;
default:
  //code to be executed if n is different from case 1 and 2
}
}}
//#############
event.preventDefault();
},false);
//////////////////////////////////////////////////////// 
document.addEventListener('touchend', function(event) 
{ 
CONTROL.LAST_X_POSITION = CONTROL.X;  
CONTROL.LAST_Y_POSITION = CONTROL.Y; 
CONTROL.MULTI_TOUCH = 'NO';
CONTROL.MULTI_TOUCH_INDEX = 1;
CONTROL.MULTI_TOUCH_X1 = null;
CONTROL.MULTI_TOUCH_X2 = null;
CONTROL.MULTI_TOUCH_X3 = null;
CONTROL.MULTI_TOUCH_X4 = null;
CONTROL.MULTI_TOUCH_X5 = null;
CONTROL.MULTI_TOUCH_X6 = null;
CONTROL.MULTI_TOUCH_X7 = null;
CONTROL.MULTI_TOUCH_X8 = null;
CONTROL.MULTI_TOUCH_X9 = null;
CONTROL.MULTI_TOUCH_X10 = null;
CONTROL.MULTI_TOUCH_Y1 = null;
CONTROL.MULTI_TOUCH_Y2 = null;
CONTROL.MULTI_TOUCH_Y3 = null;
CONTROL.MULTI_TOUCH_Y4 = null;
CONTROL.MULTI_TOUCH_Y5 = null;
CONTROL.MULTI_TOUCH_Y6 = null;
CONTROL.MULTI_TOUCH_Y7 = null;
CONTROL.MULTI_TOUCH_Y8 = null;
CONTROL.MULTI_TOUCH_Y9 = null;
CONTROL.MULTI_TOUCH_Y10 = null;
console.log('LAST TOUCH POSITION AT:(X' + CONTROL.X + '),(' + CONTROL.Y + ')' );
},false);
////////////////////////////////////////////////////////
document.addEventListener("touchcancel", function(event) 
{ 
console.log('BREAK - LAST TOUCH POSITION AT:(X' + CONTROL.X + '(,(' + CONTROL.Y + ')' );
}, false);
////////////////////////////////////////////////////////






