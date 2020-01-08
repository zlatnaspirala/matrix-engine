//###############################################//###############################################
//###############################################//###############################################
// USER PART OF CONFIG CODE APP
/**
Filename : manifest.js
 
 manifest file for visual js Application . 
 !important Use this file just for edit fields , dont press enter for new line.

 created by Nikola Lukic zlatnaspirala@gmail.com
 www.maximumroulette.com 2016
*/
//###############################################//###############################################
//###############################################//###############################################
var APPLICATION = {

NAME : "prototype VISUAL-JS framework 0.9" ,
TYPE : "client" ,
VERSION : "0.9" ,
STATUS : "develop" ,
MULTILANGUAGE : false ,
IMAGE_LOADER_PREFIX : true , // false for fiddle support , we need absolute path . 
EDITOR : false ,
EDITOR_AUTORUN : false ,
LOCAL_SERVER : "127.0.0.1" , 
ACCOUNT_SERVER : "127.0.0.1", ACCOUNT_SERVER_PORT : "3666" , ACCOUNT_SERVER_SECURE : false , ACCOUNT_SERVICE_AUTO_RUN : false,
DEVELOPERS : [ "Nikola Lukic Zlatnaspirala@gmail.com" ] , 

ACCESSIBILITY : {
 VIRTUAL_KEYBOARD_FOR_DESKTOP : true , 
 ACTIVATE_VK_FOR_DESKTOP : function (){ CREATE_VIRTUAL_KEYBOARD();HIDE_KEYBOARD();APPLICATION.ACCESSIBILITY.VIRTUAL_KEYBOARD_FOR_DESKTOP=true; }, // in run time 
 DEACTIVATE_VK_FOR_DESKTOP : function (){ APPLICATION.ACCESSIBILITY.VIRTUAL_KEYBOARD_FOR_DESKTOP=false }, // in run time 
},

SINGLE_BROADCAST : true , 
MULTIRTC_PEER : true,
BOX2D : false ,

PROGRAM : { 
    CALCULATING_POSITION_BY : "CANVAS", // MONITOR is innerWidth..Height  or CANVAS is  canvas width
	RENDER_SPEED : 5 ,
	UPDATE_SPEED : 5 , 
},

SYSTEM : {
COLOR : "#afa9aa",
HOVER_COLOR : "#5991FF",
TEXT_COLOR : "black",
ACTOR_X : "",
ACTOR_Y : "",
},

};