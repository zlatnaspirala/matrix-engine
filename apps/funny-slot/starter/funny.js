//###############################################//###############################################
//###############################################//###############################################
// USER PART OF CODE 
/**
Filename : funny.js

  Game Template with Visual JS support 
  
  slot prototype 0.1 FUNNY3
  2016 januar 
    
*/

/**
 
  Commercial project AllRights Nikola Lukic

Copyright 2016, zlatnaspirala@gmail.com
All rights reserved.

Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions are
met:

If you are buyer

*/

//###############################################//###############################################
//###############################################//###############################################
 
 /*OPERATION FOE REELS
  We have 3 reels 
  You configure reels with arrays : 
 
 SYMBOLS_REEL1
 SYMBOLS_REEL2
 SYMBOLS_REEL3
 
 RESOURCE.SOME_RES is standard Visual JS resource js object
  
  
  NOMOBILE == 0 //means mobile devices
  NOMOBILE == 1 //means desktop devices
  
 */
 
 //MAKE ALL BE INVISIBLE
 


    var SLOT_PLAYER = {
		
		BALANCE : 1000,
		NICKNAME : "noname",
		
	};
 
 
	var SYMBOLS_REEL1=[RESOURCE.character1,RESOURCE.character2,RESOURCE.character3,RESOURCE.character4,RESOURCE.character4,RESOURCE.character4];
	var SYMBOLS_REEL2=[RESOURCE.character1,RESOURCE.character2,RESOURCE.character3,RESOURCE.character4,RESOURCE.character4];
	var SYMBOLS_REEL3=[RESOURCE.character1,RESOURCE.character2,RESOURCE.character3,RESOURCE.character4,RESOURCE.character4,RESOURCE.character4,RESOURCE.character4];

	var SYMBOLS_REEL1_REZ={ rez : ["character1","character2","character3","character4","character4","character4"]};
	var SYMBOLS_REEL2_REZ={ rez : ["character1","character2","character3","character4","character4"]};
	var SYMBOLS_REEL3_REZ={ rez : ["character1","character2","character3","character4","character4","character4","character4"]};
	 
	 
	var WIN_PROCEDURE = null;
	var PROCEDURE_SPIN = function(){};
	
		var character4 = 10, 
		character3 = 15,
		character2 = 50, 
		character1 = 200; 

	var REELS_OPTIONS = {
	 
		 SYMBOL_HEIGHT : 16,
		 REEL_SPEED : 3.5 , 
		 REELS_MARGIN : 1.5, // range 0.1 to 3.0
		 REEL1_POSITION_X : 17 ,
		 REEL2_POSITION_X : 43 ,
		 REEL3_POSITION_X : 69 ,
		 
		 REEL1_STOPED : true, // read only for you
		 REEL2_STOPED : true, // read only for you
		 REEL3_STOPED : true, // read only for you
		  
		 REEL_MAX_Y : 70 + 2, // read only for you
		 TOP : 0 , // read only for you
		  
		 
	};

	CLONE_TOP1 = 0;
	CLONE_TOP2 = 0;
	CLONE_TOP3 = 0;
	
	var  RESULTS  = {

		R1 : 1 , 
		R2 : 1 , 
		R3 : 1 , 

	};

	var SPIN_STOP;
	var SLOT_MASHINE = {

	BET_VALUE : {

		VALUE : 1,
		MIN : 1,
		MAX : 9,

	},
	SPIN : false ,
	STOP_ON_RESULT : false , 

	};


	CONFIGURE_SLOT_FROM_SERVER_or_LOCAL ()
	
	function CALCULATOR (spin  , BET ){
		var win = 0;
		var rez1 =  SYS.MATH.RANDOM_INT_FROM_TO (0,SYMBOLS_REEL1.length-1)
        var rez2 =  SYS.MATH.RANDOM_INT_FROM_TO (0,SYMBOLS_REEL2.length-1)
        var rez3 =  SYS.MATH.RANDOM_INT_FROM_TO (0,SYMBOLS_REEL3.length-1)
		
		 if ( ( SYMBOLS_REEL1_REZ.rez[rez1].toString() ==  SYMBOLS_REEL2_REZ.rez[rez2].toString() ) && (SYMBOLS_REEL1_REZ.rez[rez1].toString() == SYMBOLS_REEL3_REZ.rez[rez3].toString()  ) )  {

   
     eval(" win = "+SYMBOLS_REEL1_REZ.rez[rez1]+" * BET; "); 
     console.log("WINNIG COMBINATION !  reel id:" , rez1 , " BET : " , BET );
	 console.log("WINNIG COMBINATION : for :" , rez1 , " BET : " , BET , " WIN IS :" , win);
	// socket.emit("COMBINATION" , rez1 , rez2 , rez3 , win );	
	 	 
 
 }
 else {
	 
 win = 0;
	 
 }	
 
 		if (typeof rez1 != "undefined" && typeof rez2 != "undefined" && typeof rez3 != "undefined" ) {
			
		SYS.DEBUG.LOG("SPIN r1 :" , rez1 , rez2 , rez3 );	
		
		RESULTS.R1 = rez1;
		RESULTS.R2 = rez2;
		RESULTS.R3 = rez3;
		RESULTS.WIN = win;
		var win = win;
		
		setTimeout(function(){
			
			SPIN_STOP(win)
			
		},4000);
		
		}else{
		SYS.DEBUG.WARRING("server data empty or something very wrong!");	
		}
		
	
	}
	
	
/* If you wanna do slot configuration from server 
 
 first clean :
 	var SYMBOLS_REEL1=[];
	var SYMBOLS_REEL2=[];
	var SYMBOLS_REEL3=[];
	
 

	var GAME_SERVER = io.connect('http://'+APPLICATION.LOCAL_SERVER+':12001');

	GAME_SERVER.on('connect', function(){

	console.log("CONNECTED WITH FUNNYSLOT GAME SERVER!" );  
	console.log("Get data about slot from GAME SERVER" );  
	GAME_SERVER.emit("I_WANT" , "FUNNYSLOT1" );
	

	GAME_SERVER.on('CONFIG_REELS', function (r1,r2,r3) {

		SYS.DEBUG.WARNING("CONFIG SLOT DATA:   REEL 1 : " + r1.rez.length + "   REEL2 " + r2.rez +  "   REEL3 " + r3.rez );	

		for (var x = 0; x < r1.rez.length;x++){

		eval( 'SYMBOLS_REEL1.push( RESOURCE.'+r1.rez[x]+');');

		}

		for (var x = 0; x < r2.rez.length;x++){

		eval( 'SYMBOLS_REEL2.push(RESOURCE.'+r2.rez[x]+');');

		}

		for (var x = 0; x < r3.rez.length;x++){

		eval( 'SYMBOLS_REEL3.push(RESOURCE.'+r3.rez[x]+');');

		}

		CONFIGURE_SLOT_FROM_SERVER_or_LOCAL ()

	});

	  
	GAME_SERVER.on('COMBINATION', function ( r1 , r2 , r3 , win) {
		
		if (typeof r1 != "undefined" && typeof r2 != "undefined" && typeof r3 != "undefined" ) {
			
		SYS.DEBUG.LOG("SPIN r1 :" , r1 , r2 , r3 );	
		
		RESULTS.R1 = r1;
		RESULTS.R2 = r2;
		RESULTS.R3 = r3;
		RESULTS.WIN = win;
		var win = win;
		
		setTimeout(function(){
			
			SPIN_STOP(win)
			
		},4000);
		
		}else{
		SYS.DEBUG.WARRING("server data empty or something very wrong!");	
		}
	});



});


 */
 
 
 
	
     

	// CHANGE PROGRAM ROOT NAME (canvas name)
	HELLO_WORLD.ENGINE.KEYBOARD.ACTION_ON_KEY_DOWN = function(){

	if (this.LAST_CAPTURE_CHAR == " ")
	{
		//SPACE WAS PRESSED
		PROCEDURE_SPIN()
	}

	};

	

 
function CONFIGURE_SLOT_FROM_SERVER_or_LOCAL (){
   
PROCEDURE_SPIN =  function (){
	 
if (SLOT_MASHINE.SPIN == false) {

REELS_OPTIONS.REEL1_STOPED = false;
REELS_OPTIONS.REEL2_STOPED = false;
REELS_OPTIONS.REEL3_STOPED = false;


//client side done ; remove this if you wanna set this on server for profesional game
SET_BALANCE( SLOT_PLAYER.BALANCE - SLOT_MASHINE.BET_VALUE.VALUE);

//GAME_SERVER.emit("SPIN" , SLOT_MASHINE.BET_VALUE.VALUE );
CALCULATOR( "SPIN" , SLOT_MASHINE.BET_VALUE.VALUE );
SLOT_MASHINE.SPIN = true;

symbol10.POSITION.SET_SPEED(0.25);
Csymbol10.POSITION.SET_SPEED(0.25);

symbol20.POSITION.SET_SPEED(0.25);
Csymbol20.POSITION.SET_SPEED(0.25);

symbol30.POSITION.SET_SPEED(0.25);
Csymbol30.POSITION.SET_SPEED(0.25);

symbol10.POSITION.TRANSLATE_BY_Y(-1000);
Csymbol10.POSITION.TRANSLATE_BY_Y(-1000);

	setTimeout( function(){

		symbol20.POSITION.TRANSLATE_BY_Y(-1000);
		Csymbol20.POSITION.TRANSLATE_BY_Y(-1000);

		setTimeout( function(){

			symbol30.POSITION.TRANSLATE_BY_Y(-1000);
			Csymbol30.POSITION.TRANSLATE_BY_Y(-1000);		

		}, 200);		

	}, 200);


		 audio_object_start_reel1.play()
		 
	setTimeout(function(){
         
		setNormalSpeed (1);
		symbol10.POSITION.TRANSLATE_BY_Y(REELS_OPTIONS.REEL_MAX_Y);
		Csymbol10.POSITION.TRANSLATE_BY_Y(REELS_OPTIONS.REEL_MAX_Y);

	}
	, 1000);

	setTimeout(function(){
		//audio_object_start_reel2.play()
		setNormalSpeed (2);

		symbol20.POSITION.TRANSLATE_BY_Y(REELS_OPTIONS.REEL_MAX_Y);
		Csymbol20.POSITION.TRANSLATE_BY_Y(REELS_OPTIONS.REEL_MAX_Y);

	}
	, 1200);


	setTimeout(function(){
		//audio_object_start_reel3.play()
		audio_object_spin.play()
		setNormalSpeed (3);
		symbol30.POSITION.TRANSLATE_BY_Y(REELS_OPTIONS.REEL_MAX_Y);
		Csymbol30.POSITION.TRANSLATE_BY_Y(REELS_OPTIONS.REEL_MAX_Y);

	}, 1400);

}
};
 
 
 
 //$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
 
/*  //If you wanna local setup make it here 
 
 //var
 SYMBOLS_REEL1 = [ RESOURCE.characterPink , RESOURCE.character1 , RESOURCE.character2 , RESOURCE.character1 ];
 //var 
 SYMBOLS_REEL2 = [ RESOURCE.characterPink , RESOURCE.character1 , RESOURCE.character2 , RESOURCE.character1 ];
 //var 
 SYMBOLS_REEL3 = [ RESOURCE.characterPink , RESOURCE.character1 , RESOURCE.character2 , RESOURCE.character1 ];
 
  */

 
  
  
	function CREATE_REEL(modulname  , SYMBOLS_RES  , REEL_ID , HEIGHT_OF_SYMBOL , _X ){

	var SYMBOLS = SYMBOLS_RES;

	//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$

	for (var r=0;r<SYMBOLS_RES.length;r++){
		var TOP = 18.5 + (r * (HEIGHT_OF_SYMBOL+REELS_OPTIONS.REELS_MARGIN));

		var local_id_generator = 1243 + SYS.MATH.RANDOM_INT_FROM_TO(10,10000);	 
		local_id_generator += r;

		HELLO_WORLD.ENGINE.MODULES.ACCESS_MODULE( modulname).NEW_OBJECT('symbol'+ REEL_ID + r , _X ,  TOP  , 13.5 , HEIGHT_OF_SYMBOL ); 
		if (r == 0) {
		window["symbol"+REEL_ID+"0"].IA_FIRST_IN_REEL = true;
		REELS_OPTIONS.TOP = TOP;
		}
		else {
		window["symbol"+REEL_ID+"0"].GROUP.ADD(window["symbol"+REEL_ID+r].NAME); 
		}
		 
		window["symbol"+REEL_ID+r].CREATE_ANIMATION( SURF , 'DRAW_FRAME' , 2 , 	SYMBOLS_RES[r] , local_id_generator , 'no' , 1,11,1,1,1);
		window["symbol"+REEL_ID+r].DRAG = false;
	}
	//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$


	//clone
	//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
	var startPositionForClone = HEIGHT_OF_SYMBOL * SYMBOLS_RES.length + ( REELS_OPTIONS.REELS_MARGIN*(SYMBOLS_RES.length) );

	for (var r=0;r<SYMBOLS_RES.length;r++){

		var TOP = 18.5 + (r * (HEIGHT_OF_SYMBOL+REELS_OPTIONS.REELS_MARGIN));
		var local_id_generator = 5687;	 local_id_generator += r;
		HELLO_WORLD.ENGINE.MODULES.ACCESS_MODULE( modulname).NEW_OBJECT('Csymbol'+ REEL_ID + r , _X , TOP - startPositionForClone   , 13.5 , HEIGHT_OF_SYMBOL ); 
		if (r == 0) {
		window["Csymbol"+REEL_ID+"0"].IA_FIRST_IN_REEL = true;
		window["CLONE_TOP" + REEL_ID] = TOP - startPositionForClone;	 
		}
		else {
		window["Csymbol"+REEL_ID+"0"].GROUP.ADD(window["Csymbol"+REEL_ID+r].NAME);
		}
		window["Csymbol"+REEL_ID+r].CREATE_ANIMATION( SURF , 'DRAW_FRAME' , 2 , 	SYMBOLS_RES[r] , local_id_generator , 'no' , 1,11,1,1,1);
		window["Csymbol"+REEL_ID+r].DRAG = false; 
	}
	//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$



}

 
  // CREATE SYMBOLS OBJECTS
 CREATE_REEL("SLOT" , SYMBOLS_REEL1 , 1 , REELS_OPTIONS.SYMBOL_HEIGHT , REELS_OPTIONS.REEL1_POSITION_X )
 CREATE_REEL("SLOT" , SYMBOLS_REEL2 , 2 , REELS_OPTIONS.SYMBOL_HEIGHT , REELS_OPTIONS.REEL2_POSITION_X )
 CREATE_REEL("SLOT" , SYMBOLS_REEL3 , 3 , REELS_OPTIONS.SYMBOL_HEIGHT , REELS_OPTIONS.REEL3_POSITION_X )
  
 //$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
 //$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$


 



 
  
  
  //BACKGROUND
  
  SLOT_MODULE.NEW_OBJECT('background', 0 , 0 , 100 , 100 ); 
  SLOT_MODULE.GAME_OBJECTS.ACCESS('background').CREATE_ANIMATION( SURF , 'DRAW_FRAME' , 0 , RESOURCE.slotBG , 171398232226547041 , 'no' , 1,11,1,1,1); 
  background.DRAG = false;
  
  
  // RABIT  
 SLOT_MODULE.NEW_OBJECT('RABIT', REELS_OPTIONS.REEL1_POSITION_X + 5 , 85.4 ,7 ,9); 
 SLOT_MODULE.GAME_OBJECTS.ACCESS('RABIT').CREATE_ANIMATION( SURF , 'DRAW_FRAME' , 0 , RESOURCE.SlotRabit	 , 23355634344265254656 , 'no' , 1,11,1,1,1); 
  
  
    
  // TREE 
  
	SLOT_MODULE.NEW_OBJECT('tree1', -6 , 45.4 ,15,46); 
	SLOT_MODULE.GAME_OBJECTS.ACCESS('tree1').CREATE_ANIMATION( SURF , 'DRAW_FRAME' , 0 , RESOURCE.trees1	 , 54265254656 , 'no' , 1,11,1,1,1); 

	SLOT_MODULE.NEW_OBJECT('tree2', 36 , 55.4 ,2,46); 
	SLOT_MODULE.GAME_OBJECTS.ACCESS('tree2').CREATE_ANIMATION( SURF , 'DRAW_FRAME' , 2 , RESOURCE.trees1	 , 345642546254625 , 'no' , 1,11,1,1,1); 

	SLOT_MODULE.NEW_OBJECT('tree3', 61 , 55.4 ,5,46); 
	SLOT_MODULE.GAME_OBJECTS.ACCESS('tree3').CREATE_ANIMATION( SURF , 'DRAW_FRAME' , 0 , RESOURCE.trees1	 , 56554665625546 , 'no' , 1,11,1,1,1); 

	 
	
		//FOX 

	SLOT_MODULE.NEW_OBJECT('FOX', 120 , 89 , 12 ,12); 
	SLOT_MODULE.GAME_OBJECTS.ACCESS('FOX').CREATE_ANIMATION( SURF , 'LOOP' , 0 , RESOURCE.slotFox	 , 12121212121223333 , 'no' , 1,11,1,1,1); 

	FOX.POSITION.thrust = 0.5;
	FOX.POSITION.TRANSLATE_BY_X(-50);
  if (typeof audio_object_rabithide !== 'undefined') audio_object_rabithide.play()
	RABIT.POSITION.TRANSLATE(REELS_OPTIONS.REEL1_POSITION_X + 3,120);
	
	FOX.POSITION.ON_TARGET_POSITION = function(){

	FOX.POSITION.SET_POSITION(120 , 83 , "DIAMETRIC");
	audio_object_rabitup.play()
	RABIT.POSITION.TRANSLATE(REELS_OPTIONS.REEL1_POSITION_X + 3,77);
	
	setTimeout(function(){
		if (typeof audio_object_rabithide !== 'undefined') audio_object_rabithide.play()
		RABIT.POSITION.TRANSLATE(REELS_OPTIONS.REEL1_POSITION_X + 5,120);
	FOX.POSITION.TRANSLATE_BY_X(-50);
		
	},10000);

	};

 
  
 
	SLOT_MODULE.NEW_OBJECT('tree4', 90 , 55.4 ,10,50); 
	SLOT_MODULE.GAME_OBJECTS.ACCESS('tree4').CREATE_ANIMATION( SURF , 'DRAW_FRAME' , 1 , RESOURCE.trees1	 , 45625245 , 'no' , 1,11,1,1,1); 

	SLOT_MODULE.NEW_OBJECT('tree5', 97 , 26 ,5,56); 
	SLOT_MODULE.GAME_OBJECTS.ACCESS('tree5').CREATE_ANIMATION( SURF , 'DRAW_FRAME' , 4 , RESOURCE.trees1	 , 5426525 , 'no' , 1,11,1,1,1); 
 
	tree1.DRAG = false;
	tree2.DRAG = false;
	tree3.DRAG = false;
	tree4.DRAG = false;
	tree5.DRAG = false;
 

 
 
 
 
     // SUN
	 
	 
	SLOT_MODULE.NEW_OBJECT('sun', 2 , 1 ,8,8); 
	SLOT_MODULE.GAME_OBJECTS.ACCESS('sun').CREATE_ANIMATION( SURF , 'LOOP' , 1 , RESOURCE.SlotSun , 78657856 , 'no' , 1,11,1,10,1); 
 
	 sun.DIMENSION.HEIGHT = sun.DIMENSION.WIDTH;
	 sun.DRAG = false;
	 sun.ROTATE_DIRECTION = 'left';
	 sun.ON_UPDATE = function(){
		 
	if (sun.ROTATE_DIRECTION == 'left') {
	if (sun.ANIMATION.ROTATE.ANGLE> 180)	{
		
		sun.ROTATE_DIRECTION = 'right';
		
	}
	 sun.ANIMATION.ROTATE.ANGLE++;
		
	}	
    else {
		
	if (sun.ANIMATION.ROTATE.ANGLE< -180)	{
		
		sun.ROTATE_DIRECTION = 'left';
		
	}
	 sun.ANIMATION.ROTATE.ANGLE--;	
	
	}
	 
	 
		 
	 };
	//CLOUDS

	SLOT_MODULE.NEW_OBJECT('clouds1', 2.26 , 8.62 ,17,16); 
	SLOT_MODULE.GAME_OBJECTS.ACCESS('clouds1').CREATE_ANIMATION( SURF , 'DRAW_FRAME' , 1 , RESOURCE.clouds , 171398232226547221 , 'no' , 1,11,1,1,1); 

	var cloud1_movementX = new OSCILLATOR( - 20 , 120 , 0.1);
	var cloud1_movementY = new OSCILLATOR( -5 , 0 , 0.05 );
	
	clouds1.ON_UPDATE = function(){
		this.POSITION.TRANSLATE_BY_X ( cloud1_movementX.UPDATE() )
		this.POSITION.TRANSLATE_BY_Y ( cloud1_movementY.UPDATE() )	
	};

	SLOT_MODULE.NEW_OBJECT('clouds2', 12.26 , 8.62 ,17,16); 
	SLOT_MODULE.GAME_OBJECTS.ACCESS('clouds2').CREATE_ANIMATION( SURF , 'DRAW_FRAME' , 3 , RESOURCE.clouds , 171398232226547221 , 'no' , 1,11,1,1,1); 

	var cloud2_movementX = new OSCILLATOR(  20 , 90 , 0.06);
	var cloud2_movementY = new OSCILLATOR( -5 , 0 , 0.08 );

	clouds2.ON_UPDATE = function(){
		this.POSITION.TRANSLATE_BY_X ( cloud2_movementX.UPDATE() )
		this.POSITION.TRANSLATE_BY_Y ( cloud2_movementY.UPDATE() )
	};

	  
	/////////////////////
	//Mobile optimezer
	////////////////////
	if (NOMOBILE == 1){
	
	SLOT_MODULE.NEW_OBJECT('clouds3', 12.26 , 8.62 ,17,16); 
	SLOT_MODULE.GAME_OBJECTS.ACCESS('clouds3').CREATE_ANIMATION( SURF , 'DRAW_FRAME' , 2 , RESOURCE.clouds , 171398232226547221 , 'no' , 1,11,1,1,1); 

	var cloud3_movementX = new OSCILLATOR(  0 , 95 , 0.09);
	var cloud3_movementY = new OSCILLATOR( -15 , 0 , 0.01 );

	clouds3.ON_UPDATE = function(){
		this.POSITION.TRANSLATE_BY_X ( cloud3_movementX.UPDATE() )
		this.POSITION.TRANSLATE_BY_Y ( cloud3_movementY.UPDATE() )
	};

	


	SLOT_MODULE.NEW_OBJECT('clouds4', 92.26 , 8.62 ,17,16); 
	SLOT_MODULE.GAME_OBJECTS.ACCESS('clouds4').CREATE_ANIMATION( SURF , 'DRAW_FRAME' , 2 , RESOURCE.clouds , 171398232226547221 , 'no' , 1,11,1,1,1); 

	var cloud4_movementX = new OSCILLATOR(  0 , 100 , 0.1);
	var cloud4_movementY = new OSCILLATOR( -15 , 0 , 0.02 );
	
	cloud4_movementX.value = 92;
	clouds4.ON_UPDATE = function(){
		this.POSITION.TRANSLATE_BY_X ( cloud4_movementX.UPDATE() )
		this.POSITION.TRANSLATE_BY_Y ( cloud4_movementY.UPDATE() )
	};

	}

 
 
  //Buttons
  
  
  
  SLOT_MODULE.NEW_OBJECT('BET', 12 , 83.5 , 14 , 16); 
  SLOT_MODULE.GAME_OBJECTS.ACCESS('BET').CREATE_ANIMATION( SURF , 'DRAW_FRAME' , 0 , RESOURCE.wbutton , 171222132226547221 , 'no' , 1,11,1,1,1); 
	BET.DRAG = false;
	
  SLOT_MODULE.NEW_OBJECT('BET_MINUS', 0 , 87 , 13 , 13); 
  SLOT_MODULE.GAME_OBJECTS.ACCESS('BET_MINUS').CREATE_ANIMATION( SURF , 'DRAW_FRAME' , 3 , RESOURCE.wbutton , 171277732226547221 , 'no' , 1,11,1,1,1); 
	BET_MINUS.DRAG = false;
	
  SLOT_MODULE.NEW_OBJECT('BET_PLUS', 25.2 , 87 , 13 , 13); 
  SLOT_MODULE.GAME_OBJECTS.ACCESS('BET_PLUS').CREATE_ANIMATION( SURF , 'DRAW_FRAME' ,4, RESOURCE.wbutton , 171222156726547221 , 'no' , 1,11,1,1,1); 
	BET_PLUS.DRAG = false;
	
	BET_PLUS.TAP = function () {
		
		if (SLOT_MASHINE.BET_VALUE.VALUE + 1 <= SLOT_MASHINE.BET_VALUE.MAX) {
			
		SLOT_MASHINE.BET_VALUE.VALUE++;
		BET_VALUE.ANIMATION.CURRENT_FRAME = SLOT_MASHINE.BET_VALUE.VALUE;
			
		}
		audio_object_bet_btns.play();
		BET_PLUS.ANIMATION.ROTATE.ANGLE = 5;
		setTimeout( function(){BET_PLUS.ANIMATION.ROTATE.ANGLE = 0;}, 250);
			
	};
	
	BET_MINUS.TAP = function () {
		
		if (SLOT_MASHINE.BET_VALUE.VALUE - 1 >= SLOT_MASHINE.BET_VALUE.MIN) {
			
		SLOT_MASHINE.BET_VALUE.VALUE--;
		BET_VALUE.ANIMATION.CURRENT_FRAME = SLOT_MASHINE.BET_VALUE.VALUE;
			
		}
		audio_object_bet_btns.play();
		BET_MINUS.ANIMATION.ROTATE.ANGLE = -5;
		setTimeout( function(){BET_MINUS.ANIMATION.ROTATE.ANGLE = 0;}, 250);
		
	};
	
	
	var ROT15 = new OSCILLATOR(-10 , 10 , 1);

	SLOT_MODULE.NEW_OBJECT('BET_VALUE', 20.8 , 87 , 3.8 , 5.1); 
	SLOT_MODULE.GAME_OBJECTS.ACCESS('BET_VALUE').CREATE_ANIMATION( SURF , 'DRAW_FRAME' ,SLOT_MASHINE.BET_VALUE.VALUE, RESOURCE.numbers2 , 123451345 , 'no' , 1,11,1,1,1); 

	BET_VALUE.DRAG = false;

	BET.TOUCH_MOVE = function(){


		if (BET.EFFECTS.ZOOM.STATUS_FOR_IN == false && BET.EFFECTS.ZOOM.STATUS_FOR_OUT == false ) {
		this.EFFECTS.ZOOM.VALUE = 0.29;
		this.EFFECTS.ZOOM.IN(80)	

		BET.EFFECTS.ZOOM.ZOOM_IN_FINISHED = function(){

		BET.EFFECTS.ZOOM.OUT(90)	

		};

		}


		BET_VALUE.ANIMATION.ROTATE.ANGLE = ROT15.UPDATE();

	};
	
	 
		//ORBIT MOVEMNET

	var MONEY_orbitX = new OSCILLATOR( -10 , 10 , 0.2 );
	var MONEY_orbitY = new OSCILLATOR( -10 , 10 , 0.2 );
	MONEY_orbitY.value = 0;


   	var MONEY_SIZE_EFFECT = new OSCILLATOR( 50 , 200 , 5 );
	var MONEY_SIZE_EFFECT2 = new OSCILLATOR( 40 , 100 , 5 );
 
   SLOT_MODULE.NEW_OBJECT('MONEY_WIN', -38.8 , 46.4 ,15,15); 
   SLOT_MODULE.GAME_OBJECTS.ACCESS('MONEY_WIN').CREATE_ANIMATION( SURF , 'LOOP' , 1 , RESOURCE.money_penny	 , 1212121 , 'no' , 1,11,1,1,1); 
 
   MONEY_WIN.CREATE_PARTICLE('FONTAN'); 
   
   /////////////////////
	//Mobile optimezer
	////////////////////
	if (NOMOBILE == 1){
		
		
	SLOT_MODULE.NEW_OBJECT('MONEY_WIN2', -38.8 , -46.4 ,15,15); 
	SLOT_MODULE.GAME_OBJECTS.ACCESS('MONEY_WIN2').CREATE_ANIMATION( SURF , 'LOOP' , 1 , RESOURCE.money_penny	 , 1212121 , 'no' , 1,11,1,1,1); 

	MONEY_WIN2.CREATE_PARTICLE('FONTAN'); 



	SLOT_MODULE.NEW_OBJECT('MONEY_WIN3', 138.8 , 46.4 ,15,15); 
	SLOT_MODULE.GAME_OBJECTS.ACCESS('MONEY_WIN3').CREATE_ANIMATION( SURF , 'LOOP' , 1 , RESOURCE.money_penny	 , 1212121 , 'no' , 1,11,1,1,1); 

	MONEY_WIN3.CREATE_PARTICLE('FONTAN'); 


	MONEY_WIN.PARTICLE.settings.bounceLevel = VIEW.H(100);
	MONEY_WIN2.PARTICLE.settings.bounceLevel = VIEW.H(99);
	MONEY_WIN3.PARTICLE.settings.bounceLevel = VIEW.H(98);


	}
	
	//bet value btns
 SLOT_MODULE.NEW_OBJECT('Wchar', -84.8 , 46.4 , 15 ,15); 
 SLOT_MODULE.GAME_OBJECTS.ACCESS('Wchar').CREATE_ANIMATION( SURF , 'DRAW_FRAME' , 1 , RESOURCE.imagesFont1	 , 1713221226547221 , 'no' , 1,11,1,1,1); 
 
 SLOT_MODULE.NEW_OBJECT('Ichar', -96.8 , 36 ,15,15); 
 SLOT_MODULE.GAME_OBJECTS.ACCESS('Ichar').CREATE_ANIMATION( SURF , 'DRAW_FRAME' , 4 , RESOURCE.imagesFont1	 , 17132212321221 , 'no' , 1,11,1,1,1); 
 
 SLOT_MODULE.NEW_OBJECT('Nchar', -108.8 , 46.4 ,15,15); 
 SLOT_MODULE.GAME_OBJECTS.ACCESS('Nchar').CREATE_ANIMATION( SURF , 'DRAW_FRAME' , 16 , RESOURCE.imagesFont1	 , 1713221212221 , 'no' , 1,11,1,1,1); 
 
 Wchar.DRAG = false;
 Ichar.DRAG = false;
 Nchar.DRAG = false;
		if (NOMOBILE == 0){
		
	Wchar.POSITION.SET_SPEED(4)
	Ichar.POSITION.SET_SPEED(4)
	Nchar.POSITION.SET_SPEED(4)
		}
		
 Wchar.ON_UPDATE = function(){
	 
	 
 };
 
 function setupChars(obj_ , indexFrame , wh , ATACH ){
if (wh) {
	
 obj_.DIMENSION.WIDTH = obj_.DIMENSION.HEIGHT;
}
else {
	
obj_.DIMENSION.HEIGHT = obj_.DIMENSION.WIDTH;	
}
 
 if (typeof ATACH !== 'undefined') {
	 
 obj_.TAP = ATACH;
	 
 }
 
if ( indexFrame == "A"){
 obj_.ANIMATION.CURRENT_FRAME = 0;
 }
 else if ( indexFrame == "B"){
 obj_.ANIMATION.CURRENT_FRAME = 1;
 }
 else if ( indexFrame == "C"){
 obj_.ANIMATION.CURRENT_FRAME = 2;
 }
  else if ( indexFrame == "D"){
 obj_.ANIMATION.CURRENT_FRAME = 3;
 }
  else if ( indexFrame == "E"){
 obj_.ANIMATION.CURRENT_FRAME = 4;
 }
  else if ( indexFrame == "F"){
 obj_.ANIMATION.CURRENT_FRAME = 5;
 }
  else if ( indexFrame == "G"){
 obj_.ANIMATION.CURRENT_FRAME = 6;
 }
 else if ( indexFrame == "H"){
 obj_.ANIMATION.CURRENT_FRAME = 7;
 } 
  else if ( indexFrame == "I"){
 obj_.ANIMATION.CURRENT_FRAME = 8;
 } 
 else if ( indexFrame == "J"){
 obj_.ANIMATION.CURRENT_FRAME = 9;
 }
 else if ( indexFrame == "K"){
 obj_.ANIMATION.CURRENT_FRAME = 10;
 }
  else if ( indexFrame == "L"){
 obj_.ANIMATION.CURRENT_FRAME = 11;
 }
 else if ( indexFrame == "M"){
 obj_.ANIMATION.CURRENT_FRAME = 12;
 } 
  else if ( indexFrame == "N"){
 obj_.ANIMATION.CURRENT_FRAME = 13;
 }
  else if ( indexFrame == "O"){
 obj_.ANIMATION.CURRENT_FRAME = 14;
 }
  else if ( indexFrame == "P"){
 obj_.ANIMATION.CURRENT_FRAME = 15;
 }
  else if ( indexFrame == "Q"){
 obj_.ANIMATION.CURRENT_FRAME = 16;
 }
 else if ( indexFrame == "R"){
 obj_.ANIMATION.CURRENT_FRAME = 17;
 } 
 else if ( indexFrame == "S"){
 obj_.ANIMATION.CURRENT_FRAME = 18;
 } 
 else if ( indexFrame == "T"){
 obj_.ANIMATION.CURRENT_FRAME = 19;
 } 
  else if ( indexFrame == "U"){
 obj_.ANIMATION.CURRENT_FRAME = 20;
 }
  else if ( indexFrame == "V"){
 obj_.ANIMATION.CURRENT_FRAME = 21;
 }
  else if ( indexFrame == "W"){
 obj_.ANIMATION.CURRENT_FRAME = 22;
 }
  else if ( indexFrame == "X"){
 obj_.ANIMATION.CURRENT_FRAME = 23;
 }
  else if ( indexFrame == "Y"){
 obj_.ANIMATION.CURRENT_FRAME = 24;
 }
  else if ( indexFrame == "Z"){
 obj_.ANIMATION.CURRENT_FRAME = 25;
 }
 else if ( indexFrame == "plus"){
 obj_.ANIMATION.CURRENT_FRAME = 26;
 }


	 
 }
 
// obj_.ANIMATION.CURRENT_FRAME = indexFrame;

 
 
 /* for (var s = 0; s<RESOURCE.imagesFont1.source.length;s++){
	 
	 console.log(s + ":" + RESOURCE.imagesFont1.source[s] )
 }
  */




  
  setupChars(Wchar, "W");
  setupChars(Ichar, "I");
  setupChars(Nchar, "N");
	
	
	
	
		
	/////////////////////
	//Mobile optimezer
	////////////////////
	if (NOMOBILE == 1){
		
 
}

// SPIN 	
 
 SLOT_MODULE.NEW_OBJECT('char1', 65 , 83 , 15 ,12); 
 SLOT_MODULE.GAME_OBJECTS.ACCESS('char1').CREATE_ANIMATION( SURF , 'DRAW_FRAME' , 15 , RESOURCE.imagesFont1	 , 1713221232226547221 , 'no' , 1,11,1,1,1); 
 
 SLOT_MODULE.NEW_OBJECT('char2', 71 , 83 ,15,12); 
 SLOT_MODULE.GAME_OBJECTS.ACCESS('char2').CREATE_ANIMATION( SURF , 'DRAW_FRAME' , 15 , RESOURCE.imagesFont1	 , 1713221232226547221 , 'no' , 1,11,1,1,1); 
 
 SLOT_MODULE.NEW_OBJECT('char3', 77 , 83 ,15,12); 
 SLOT_MODULE.GAME_OBJECTS.ACCESS('char3').CREATE_ANIMATION( SURF , 'DRAW_FRAME' , 16 , RESOURCE.imagesFont1	 , 1713221232226547221 , 'no' , 1,11,1,1,1); 
 
 SLOT_MODULE.NEW_OBJECT('char4', 83 , 83 ,15,12); 
 SLOT_MODULE.GAME_OBJECTS.ACCESS('char4').CREATE_ANIMATION( SURF , 'DRAW_FRAME' , 11 , RESOURCE.imagesFont1	 , 1713221232226547221 , 'no' , 1,11,1,1,1); 
 

char1.TOUCH_MOVE = function(){
	
 char1.ANIMATION.ROTATE.ANGLE = ROT15.UPDATE();
	
};
char2.TOUCH_MOVE = function(){
	
 char2.ANIMATION.ROTATE.ANGLE = ROT15.UPDATE();
	
};
char3.TOUCH_MOVE = function(){
	
 char3.ANIMATION.ROTATE.ANGLE = ROT15.UPDATE();
	
};
char4.TOUCH_MOVE = function(){
	
 char4.ANIMATION.ROTATE.ANGLE = ROT15.UPDATE();
	
};
 
 
 
setupChars(char1, "S" , true,PROCEDURE_SPIN);
setupChars(char2, "P", true,PROCEDURE_SPIN);
setupChars(char3,"I", true,PROCEDURE_SPIN);
setupChars(char4, "N", true,PROCEDURE_SPIN);


 function setNormalSpeed (index){
 eval ( "var n = symbol"+index+"0.POSITION.SET_SPEED(REELS_OPTIONS.REEL_SPEED);");
 eval ( "var n = Csymbol"+index+"0.POSITION.SET_SPEED(REELS_OPTIONS.REEL_SPEED);");
 }
 
  setNormalSpeed (1)
  setNormalSpeed (2)
  setNormalSpeed (3)
  

function MEHANIC  (OBJ , index ){
var index = index;

 OBJ.POSITION.BAYPASS_FIRST = true; 
 OBJ.POSITION.ON_TARGET_POSITION = function(){
	 
	if (OBJ.POSITION.BAYPASS_FIRST == true){
		
		OBJ.POSITION.BAYPASS_FIRST = false;
		
	}else{

		var NEW_LOCATION = window["CLONE_TOP"+index] - ( ( window["SYMBOLS_REEL"+index].length - 3 ) * (REELS_OPTIONS.SYMBOL_HEIGHT + REELS_OPTIONS.REELS_MARGIN ) )  ;		
		eval( " OBJ.POSITION.SET_POSITION( REELS_OPTIONS.REEL"+index+"_POSITION_X , NEW_LOCATION  , 'DIAMETRIC'); ");
     	OBJ.POSITION.TRANSLATE_BY_Y(REELS_OPTIONS.REEL_MAX_Y);
		
		if (OBJ == Csymbol10) {
			console.log("CLONE JE POMEREN");
			
		}
		

	}

};

}
 
 //start up position 
 MEHANIC(symbol10 , 1)
 MEHANIC(Csymbol10 , 1)
 MEHANIC(symbol20 , 2)
 MEHANIC(Csymbol20 , 2)
 MEHANIC(symbol30 , 3)
 MEHANIC(Csymbol30 , 3)
 
 
 
 
 
 //BALANCE 
 
 SLOT_MODULE.NEW_OBJECT('balance_Table', 42 , 85 , 13 ,14); 
 SLOT_MODULE.GAME_OBJECTS.ACCESS('balance_Table').CREATE_ANIMATION( SURF , 'DRAW_FRAME' , 0 , RESOURCE.slotBalance	 , 234234234 , 'no' , 1,11,1,1,1); 
 
 balance_Table.CREATE_TEXTBOX(SLOT_PLAYER.BALANCE , 2 , "#000000" , "white")
 
 balance_Table.TEXTBOX.font = "44px Verdana";
 
 balance_Table.TEXTBOX.textBaseline = 'middle';
 
 balance_Table.DRAG = false;
 balance_Table.TYPE_OF_GAME_OBJECT = "ANIMATION_TEXT_BOX";
 balance_Table.TEXTBOX.BACKGROUND_OPACITY =0;
 
 balance_Table.ON_UPDATE = function(){
	 
	 
	 if (VIEW.H() > 1000) {
		 
		 balance_Table.TEXTBOX.font = "54px Verdana";
		 
	 }
	 else if (VIEW.H() > 600){
		 
		 balance_Table.TEXTBOX.font = "44px Verdana";
		 
	 }
	 else if (VIEW.H() > 360){
			 
			 balance_Table.TEXTBOX.font = "24px Verdana";
			 
	}else {
		
			 balance_Table.TEXTBOX.font = "20px Verdana";
		
	}
	 
	 
 };
 
 SET_BALANCE = function(newB , win_show){
	 
	 SLOT_PLAYER.BALANCE = newB;
	 balance_Table.TEXTBOX.TEXT = SLOT_PLAYER.BALANCE;
	 if ( typeof win_show != 'undefined') {
		 
	  win_sum.TEXTBOX.TEXT = "WIN \n" + RESULTS.WIN;
	  win_sum.TYPE_OF_GAME_OBJECT = "ANIMATION_TEXT_BOX";
		 
	 }
 };
 
 //win 
 SLOT_MODULE.NEW_OBJECT('win_sum', 40 , 65 , 15 ,19); 
 SLOT_MODULE.GAME_OBJECTS.ACCESS('win_sum').CREATE_ANIMATION( SURF , 'DRAW_FRAME' , 0 , RESOURCE.slotBalance	 , 456456456456 , 'no' , 1,11,1,1,1); 
 
 win_sum.CREATE_TEXTBOX("0" , 2 , "#000000" , "white")
 
 win_sum.TEXTBOX.font = "34px Verdana";
 
 win_sum.TEXTBOX.textBaseline = 'middle';
 
 win_sum.DRAG = false;
 win_sum.TYPE_OF_GAME_OBJECT = "NO_RENDER";
 win_sum.TEXTBOX.BACKGROUND_OPACITY =0;
 

  //SLOT_MODULE.NEW_OBJECT('LOAD_BLOCK4', 50 , 50 , 50 ,50); 
 window["IS_IT_LOADED_ALL"] = function (){
 setTimeout(function(){
 if (SYS.RES.SUM_OF_LOADED_IMAGES > 909) {
	 
   CREATE_LOADING_BLOCKS(true);
	 
	 
 }
 else{
	 
	 IS_IT_LOADED_ALL()
	 
 }
 } ,250);
 }
 
 IS_IT_LOADED_ALL()
 
 
 SPIN_STOP = function  (win) {

 
	 
 
	SLOT_MASHINE.STOP_ON_RESULT = true;
	 
	 window["symbol1" + RESULTS.R1].ON_UPDATE = function(){
		 
		if ( SLOT_MASHINE.SPIN == true ) {
					 
		 var distance = REELS_OPTIONS.TOP + REELS_OPTIONS.SYMBOL_HEIGHT + REELS_OPTIONS.REELS_MARGIN;
		 
		 if (window["symbol1" + RESULTS.R1].POSITION.y > distance-REELS_OPTIONS.REELS_MARGIN && window["symbol1" + RESULTS.R1].POSITION.y < distance+REELS_OPTIONS.REELS_MARGIN && REELS_OPTIONS.REEL1_STOPED == false ){
			 
			 
			 audio_object_stop.play()
			     
               if (RESULTS.R1 == 0) {
				   
    			 window["symbol10"].POSITION.SET_POSITION(REELS_OPTIONS.REEL1_POSITION_X , distance , "DIAMETRIC" );
				   
				   
			   }else if (RESULTS.R1 == 1) {
				   
				 window["symbol10"].POSITION.SET_POSITION(REELS_OPTIONS.REEL1_POSITION_X , REELS_OPTIONS.TOP  , "DIAMETRIC" );  
				   
			   }else {
				   
				 window["symbol10"].POSITION.SET_POSITION(REELS_OPTIONS.REEL1_POSITION_X , REELS_OPTIONS.TOP - ( (REELS_OPTIONS.SYMBOL_HEIGHT + REELS_OPTIONS.REELS_MARGIN )  * (RESULTS.R1-1) )  , "DIAMETRIC" );  
				   
			   }		
		
		          
			if (RESULTS.R1 >2) {
				   
               window["Csymbol10"].POSITION.SET_POSITION(REELS_OPTIONS.REEL1_POSITION_X , Csymbol10.POSITION.y + ( (    REELS_OPTIONS.REELS_MARGIN) * (SYMBOLS_REEL1.length-2)   )  , "DIAMETRIC" );
				   
			   }
			   else if(RESULTS.R2 ==2){
				
               window["Csymbol10"].POSITION.SET_POSITION(REELS_OPTIONS.REEL1_POSITION_X , Csymbol10.POSITION.y + ( (    REELS_OPTIONS.REELS_MARGIN)    )  , "DIAMETRIC" );				
				   
			   }
			   
			   if (RESULTS.R1 < SYMBOLS_REEL1.length-1 ) {
				
				window["Csymbol10"].POSITION.SET_POSITION(REELS_OPTIONS.REEL1_POSITION_X , (symbol10.POSITION.y -  (( REELS_OPTIONS.SYMBOL_HEIGHT + REELS_OPTIONS.REELS_MARGIN) * (SYMBOLS_REEL1.length))   )  , "DIAMETRIC" );
				   
			   }
			   
	     		this.ON_UPDATE = function(){};
				REELS_OPTIONS.REEL1_STOPED = true;
	
		 }
		} 
	 };
	

	 window["symbol2" + RESULTS.R2].ON_UPDATE = function(){
		 
		  if ( SLOT_MASHINE.SPIN == true ) {
		 var distance = REELS_OPTIONS.TOP + REELS_OPTIONS.SYMBOL_HEIGHT + REELS_OPTIONS.REELS_MARGIN;
		 
	if (window["symbol2" + RESULTS.R2].POSITION.y > distance - REELS_OPTIONS.REELS_MARGIN && window["symbol2" + RESULTS.R2].POSITION.y <  distance + REELS_OPTIONS.REELS_MARGIN && REELS_OPTIONS.REEL1_STOPED == true  ){
			 	 audio_object_stop.play()
		        if (RESULTS.R2 == 0) {
				   
    			 window["symbol20"].POSITION.SET_POSITION(REELS_OPTIONS.REEL2_POSITION_X , distance , "DIAMETRIC" );
				   
	  		    }else if (RESULTS.R2 == 1) {
				   
				 window["symbol20"].POSITION.SET_POSITION(REELS_OPTIONS.REEL2_POSITION_X , REELS_OPTIONS.TOP  , "DIAMETRIC" );  
				   
			    }else {
				   
				 window["symbol20"].POSITION.SET_POSITION(REELS_OPTIONS.REEL2_POSITION_X , REELS_OPTIONS.TOP - ( (REELS_OPTIONS.SYMBOL_HEIGHT + REELS_OPTIONS.REELS_MARGIN )  * (RESULTS.R2-1) )  , "DIAMETRIC" );  
				   
			    }		

				   if (RESULTS.R2 >2) {
				   
               window["Csymbol20"].POSITION.SET_POSITION(REELS_OPTIONS.REEL2_POSITION_X , Csymbol20.POSITION.y + ( (    REELS_OPTIONS.REELS_MARGIN) * (SYMBOLS_REEL2.length-2)   )  , "DIAMETRIC" );
				   
			   }
			   else if(RESULTS.R2 ==2){
				
               window["Csymbol20"].POSITION.SET_POSITION(REELS_OPTIONS.REEL2_POSITION_X , Csymbol20.POSITION.y + ( (    REELS_OPTIONS.REELS_MARGIN)    )  , "DIAMETRIC" );				
				   
			   }
			   
			   if (RESULTS.R2 < SYMBOLS_REEL2.length-1 ) {
				
				window["Csymbol20"].POSITION.SET_POSITION(REELS_OPTIONS.REEL2_POSITION_X , (symbol20.POSITION.y -  (( REELS_OPTIONS.SYMBOL_HEIGHT + REELS_OPTIONS.REELS_MARGIN) * (SYMBOLS_REEL2.length))   )  , "DIAMETRIC" );
				   
			   }
			 REELS_OPTIONS.REEL2_STOPED = true;
			 this.ON_UPDATE = function(){};
			 
			 
		 }
		 
	   }
		 
	 };
	 
	 
	  window["symbol3" + RESULTS.R3].ON_UPDATE = function(){
		 
		 if ( SLOT_MASHINE.SPIN == true ) {
		  var distance = REELS_OPTIONS.TOP + REELS_OPTIONS.SYMBOL_HEIGHT + REELS_OPTIONS.REELS_MARGIN;
		     
     if (window["symbol3" + RESULTS.R3].POSITION.y > distance - 2*REELS_OPTIONS.REELS_MARGIN && window["symbol3" + RESULTS.R3].POSITION.y <  distance + 2*REELS_OPTIONS.REELS_MARGIN && REELS_OPTIONS.REEL2_STOPED == true ){
			 
			 
				 	 audio_object_stop.play()
		        if (RESULTS.R3 == 0) {
				   
    			 window["symbol30"].POSITION.SET_POSITION(REELS_OPTIONS.REEL3_POSITION_X , distance , "DIAMETRIC" );
				   
				   
			   }else if (RESULTS.R3 == 1) {
				   
				 window["symbol30"].POSITION.SET_POSITION(REELS_OPTIONS.REEL3_POSITION_X , REELS_OPTIONS.TOP  , "DIAMETRIC" );  
				   
			   }else {
				 console.log( ">>>>>>>>>>>>>>>" + (  REELS_OPTIONS.SYMBOL_HEIGHT * (RESULTS.R3-1) ))
				 window["symbol30"].POSITION.SET_POSITION(REELS_OPTIONS.REEL3_POSITION_X , REELS_OPTIONS.TOP - (  (REELS_OPTIONS.SYMBOL_HEIGHT + REELS_OPTIONS.REELS_MARGIN ) * (RESULTS.R3-1) )  , "DIAMETRIC" );  
				   
			   }		

			   if (RESULTS.R3 >2) {
				   
               window["Csymbol30"].POSITION.SET_POSITION(REELS_OPTIONS.REEL3_POSITION_X , Csymbol30.POSITION.y + ( (    REELS_OPTIONS.REELS_MARGIN) * (SYMBOLS_REEL3.length-2)   )  , "DIAMETRIC" );
				   
			   }
			   else if(RESULTS.R3 ==2){
				
               window["Csymbol30"].POSITION.SET_POSITION(REELS_OPTIONS.REEL3_POSITION_X , Csymbol30.POSITION.y + ( (    REELS_OPTIONS.REELS_MARGIN)    )  , "DIAMETRIC" );				
				   
			   }
			   
			   if (RESULTS.R3 < SYMBOLS_REEL3.length-1 ) {
				
				window["Csymbol30"].POSITION.SET_POSITION(REELS_OPTIONS.REEL3_POSITION_X , (symbol30.POSITION.y -  (( REELS_OPTIONS.SYMBOL_HEIGHT + REELS_OPTIONS.REELS_MARGIN) * (SYMBOLS_REEL3.length))   )  , "DIAMETRIC" );
				   
			   }
			   
			 console.log("ALL REELS ARE STOPED !")
			 REELS_OPTIONS.REEL3_STOPED = true;// not important for now
			 this.ON_UPDATE = function(){};
			 SLOT_MASHINE.SPIN = false;
			 ON_SPIN_STOP(win);
			  
		 }
		 
		 
	  }
		 
	 };
	 
	 
	 
	 
 }
 

 
 function ON_SPIN_STOP (win) {
	 
	 
	 console.log(" WIN is : " + win);
 	 
	 if (win>0) {
		 
		 window["symbol1" + RESULTS.R1].ANIMATION.TYPE = "LOOP";
		 window["symbol2" + RESULTS.R2].ANIMATION.TYPE = "LOOP";
		 window["symbol3" + RESULTS.R3].ANIMATION.TYPE = "LOOP";
		 
		 
		 WIN_PROCEDURE()
		 
		 
		 
	 }else{
		 
		 
		 
	 }
		 
		 
 
	 
 }


/////////////////////
//Mobile optimezer
////////////////////
if (NOMOBILE == 1){ 
 
 WIN_PROCEDURE = function  (){
	 
	 
Wchar.POSITION.TRANSLATE (20,40);
Ichar.POSITION.TRANSLATE (40,40);
Nchar.POSITION.TRANSLATE (60,40);

MONEY_WIN.POSITION.TRANSLATE(1 + SYS.MATH.RANDOM_INT_FROM_TO(10,80) ,1 + SYS.MATH.RANDOM_INT_FROM_TO(1,40))
   
 
MONEY_WIN2.POSITION.TRANSLATE(1 + SYS.MATH.RANDOM_INT_FROM_TO(10,80),1 + SYS.MATH.RANDOM_INT_FROM_TO(1,40))
MONEY_WIN3.POSITION.TRANSLATE(1 + SYS.MATH.RANDOM_INT_FROM_TO(10,90),1 + SYS.MATH.RANDOM_INT_FROM_TO(1,40))

	 setTimeout(function(){
	 
	 SET_BALANCE(SLOT_PLAYER.BALANCE + RESULTS.WIN , true);
	 
	 
	 MONEY_WIN.PARTICLE.settings.gravity = SYS.MATH.RANDOM_INT_FROM_TO(1,10);
	 MONEY_WIN2.PARTICLE.settings.gravity = SYS.MATH.RANDOM_INT_FROM_TO(1,10);
	 MONEY_WIN3.PARTICLE.settings.gravity = SYS.MATH.RANDOM_INT_FROM_TO(1,10);
	 	 setTimeout(function(){
	
     MONEY_WIN.PARTICLE.settings.gravity = SYS.MATH.RANDOM_INT_FROM_TO(1,10);
	 MONEY_WIN2.PARTICLE.settings.gravity = SYS.MATH.RANDOM_INT_FROM_TO(1,10);
	 MONEY_WIN3.PARTICLE.settings.gravity = SYS.MATH.RANDOM_INT_FROM_TO(1,10);
	 
	 
	 
	 
	 MONEY_WIN.ON_UPDATE = function(){
		 
	  MONEY_WIN.PARTICLE.settings.particleSize = MONEY_SIZE_EFFECT.UPDATE()
		 
		 MONEY_WIN.ON_UPDATE =  MONEY_WIN.ROTATE.ROTATE_ARROUNT_CENTER;
		 
	 };
	 
	 
	 
				  setTimeout(function(){
					
					//LEAVE MEMORY 		
				  MONEY_WIN.PARTICLE.settings.particleSize = 21;	  
				  MONEY_WIN2.PARTICLE.settings.particleSize = 21;
				  MONEY_WIN3.PARTICLE.settings.particleSize = 21;
				  
				  MONEY_WIN.ON_UPDATE = function(){};
				  MONEY_WIN2.ON_UPDATE = function(){};
				  MONEY_WIN3.ON_UPDATE = function(){};
				  
				  MONEY_WIN.POSITION.TRANSLATE(SYS.MATH.RANDOM_INT_FROM_TO(120,150) , SYS.MATH.RANDOM_INT_FROM_TO(-120,150));
				  MONEY_WIN2.POSITION.TRANSLATE(SYS.MATH.RANDOM_INT_FROM_TO(120,150) , SYS.MATH.RANDOM_INT_FROM_TO(120,-50));
				  MONEY_WIN3.POSITION.TRANSLATE(SYS.MATH.RANDOM_INT_FROM_TO(120,150) , SYS.MATH.RANDOM_INT_FROM_TO(-120,-50));
					
			 
				  Wchar.POSITION.TRANSLATE(-84.8 ,  46.4 );
				  Ichar.POSITION.TRANSLATE(-96.8  ,  46.4 );
				  Nchar.POSITION.TRANSLATE(-108.8 ,  46.4 );
				  
		 	 win_sum.TYPE_OF_GAME_OBJECT = "NO_RENDER";
		 
				},4200);		  
				 
				 window["symbol1" + RESULTS.R1].ANIMATION.CURRENT_FRAME = 1;
				 window["symbol1" + RESULTS.R1].ANIMATION.CURRENT_FRAME = 1;
				 window["symbol1" + RESULTS.R1].ANIMATION.CURRENT_FRAME = 1;
				  	window["symbol1" + RESULTS.R1].ANIMATION.TYPE = "DRAW_FRAME";
					window["symbol2" + RESULTS.R2].ANIMATION.TYPE = "DRAW_FRAME";
					window["symbol3" + RESULTS.R3].ANIMATION.TYPE = "DRAW_FRAME";
	 

	 
	 },3200);	
	

	
    MONEY_WIN2.ON_UPDATE = function(){
		 
	  MONEY_WIN2.PARTICLE.settings.particleSize = MONEY_SIZE_EFFECT2.UPDATE()
		 MONEY_WIN2.ON_UPDATE =  MONEY_WIN2.ROTATE.ROTATE_ARROUNT_CENTER;
		 
	 };
	 
	 
	 MONEY_WIN3.ON_UPDATE = function(){
		 
	  MONEY_WIN3.PARTICLE.settings.particleSize = MONEY_SIZE_EFFECT2.UPDATE()
		  MONEY_WIN3.ON_UPDATE =  MONEY_WIN3.ROTATE.ROTATE_ARROUNT_CENTER;
		  
	 };

	 
	 
	 },1200);
	 
	 
	 
	 
	 
 
 
 
 
 
 
 
 }
 
 
 
 
}
else {
	
	
	 WIN_PROCEDURE = function  (){
	 
	 
Wchar.POSITION.TRANSLATE (20,40);
Ichar.POSITION.TRANSLATE (40,40);
Nchar.POSITION.TRANSLATE (60,40);

MONEY_WIN.POSITION.TRANSLATE(1 + SYS.MATH.RANDOM_INT_FROM_TO(10,80) ,1 + SYS.MATH.RANDOM_INT_FROM_TO(1,40))
   
				 
				  	window["symbol1" + RESULTS.R1].ANIMATION.TYPE = "LOOP";
					window["symbol2" + RESULTS.R2].ANIMATION.TYPE = "LOOP";
					window["symbol3" + RESULTS.R3].ANIMATION.TYPE = "LOOP";

	 setTimeout(function(){
	 
	 SET_BALANCE(SLOT_PLAYER.BALANCE + RESULTS.WIN , true);
	 
	 
	 MONEY_WIN.PARTICLE.settings.gravity = SYS.MATH.RANDOM_INT_FROM_TO(1,10);
	setTimeout(function(){
	
     MONEY_WIN.PARTICLE.settings.gravity = SYS.MATH.RANDOM_INT_FROM_TO(1,10);
	 
	 MONEY_WIN.ON_UPDATE = function(){
		 
	  MONEY_WIN.PARTICLE.settings.particleSize = MONEY_SIZE_EFFECT.UPDATE()
		 MONEY_WIN.ON_UPDATE =  MONEY_WIN.ROTATE.ROTATE_ARROUNT_CENTER;
	 
	 };
	 
				  setTimeout(function(){
					//LEAVE MEMORY 		
				  MONEY_WIN.PARTICLE.settings.particleSize = 21;	  
				  
				  
				  MONEY_WIN.ON_UPDATE = function(){};
				  
				  
				  MONEY_WIN.POSITION.TRANSLATE(SYS.MATH.RANDOM_INT_FROM_TO(120,150) , SYS.MATH.RANDOM_INT_FROM_TO(-120,150));
				  
				  Wchar.POSITION.TRANSLATE(-84.8 ,  46.4 );
				  Ichar.POSITION.TRANSLATE(-96.8  ,  46.4 );
				  Nchar.POSITION.TRANSLATE(-108.8 ,  46.4 );
				   win_sum.TYPE_OF_GAME_OBJECT = "NO_RENDER";
		 
				},4200);		  
				 
				  	window["symbol1" + RESULTS.R1].ANIMATION.TYPE = "DRAW_FRAME";
					window["symbol2" + RESULTS.R2].ANIMATION.TYPE = "DRAW_FRAME";
					window["symbol3" + RESULTS.R3].ANIMATION.TYPE = "DRAW_FRAME";
				 window["symbol1" + RESULTS.R1].ANIMATION.CURRENT_FRAME = 2;
				 window["symbol2" + RESULTS.R2].ANIMATION.CURRENT_FRAME = 2;
				 window["symbol3" + RESULTS.R3].ANIMATION.CURRENT_FRAME = 2;
		        
		  
	 },3200);	
	
	 
	 },1200);
	 
	 
	 
	 
	 
 };
 
 

 
 }
 
 
	
	
}
 
 