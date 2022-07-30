//###############################################//###############################################
//###############################################//###############################################
/*
Created by Nikola Lukic zlatnaspirala@gmail.com

SYSTEM JS
*/

var SYS = {
	
	ROOT : this,
	/**
	Get browser data
	*/
	BROWSER : new DETECTBROWSER(),
	/**
	Load/Add dinamic script in runtime
	*/
    SCRIPT :  SCRIPT,
	/**
	Works with html canvas element ,
	create surface and setup main program loop
	*/
	DOM : new DOM(),
	/**
	Just list of running programs
	*/
	RUNNING_PROGRAMS : new Array(),
	/**
	DEBUG 
	console.log polumorh call
	switch on/off 
	*/
	DEBUG : new LOG(),
	
	READY : false,
	
	/**
	RES - resources 
	Image object creator 
	*/
	RES : {
	
		SUM_OF_LOADED_IMAGES : 0,
		CREATE_IMG : CREATE_IMG,
	
	},
	
	// Math 
	/**
	Math - operation 
	*/
	MATH : {
	
		NUMBER_ROUND :  round, 
	    RANDOM_INT_FROM_TO : randomIntFromTo,
		TO_DEGREES : toDegrees,
		TO_RADIANS : toRadians,
		OSCILLATOR : OSCILLATOR,
		CONVERT : CONVERTOR,
		INCREMENTATOR : INCREMENTATOR,
		
	},
	
	ARRAY_OPERATION : {
		
		REMOVE_ALL_ITEMS_WITH_VALUE : removeItem,
		DEEP_COPY : DEEP_COPY,
		
	},
	
	LOCAL_STORAGE : {

		
	},
	
	// Mouse or touch READ_ONLY 
	MOUSE : {
	   x : 0 ,
	   y : 0 ,
	   PRESS : false,
	   BUTTON_PRESSED : null,
	},
	
	 
	XML : {
    
	READ : readXML ,
	
	},
	
	SOUND : {
		
		GEN : SOUND,
		RES : {},
	},
	
	VOICE : {
	  
	    SPEAK : function(){},
        LISTEN : function(){},
	
	},
	
	CAMERA : {
		
		SUPPORT : test_webcam_device(),
		
		
		
	},
	
	
};