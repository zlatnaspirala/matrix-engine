SYS.SCRIPT.LOAD("res/resource.audio")

window.onload = function() {
  SYS.SCRIPT.LOAD("lib/events/keyboard.js")
	SYS.SCRIPT.LOAD("lib/audio/audio.js")
	SYS.SCRIPT.LOAD("lib/events/onunload.js")
	SYS.SCRIPT.LOAD("lib/events/onbeforeunload.js")
	SYS.SCRIPT.LOAD("lib/events/onresize.js")
	SYS.SCRIPT.LOAD("lib/multi_screens/multi_screens.js")
	SYS.SCRIPT.LOAD("lib/events/keyboard_editor.js")
if (APPLICATION.EDITOR == true){
	SYS.SCRIPT.LOAD("lib/editor/editor.js")	
}
SYS.SCRIPT.LOAD("lib/nui/camera/mdetect.js")
SYS.SCRIPT.LOAD("starter/run.js")
SYS.SCRIPT.LOAD("lib/program_modul.js")





document.body.style.WebkitTransform = 'scale(1)';
document.body.style.overflow = "hidden";


function system_ready_check() {
	
if (typeof GET_ALL_GAME_OBJECTS !== 'undefined') {
	
setTimeout(function(){

	//################################################################
	// IMPORTANT - make stable system 100%
	//################################################################
	while(RESOURCE.SUM == 0 && typeof KEYBOARD != 'function' && typeof AUDIO_RES != 'undefined')
	{console.log("res not ready");}
	
    SYS.DEBUG.LOG("SYS : DOM readyState is load.")
	SYS.READY = true;
	
if (APPLICATION.STATUS == "production" )
{
	SYS.DEBUG.LOG("APPLICATION.STATUS : production")
	SYS.SCRIPT.LOAD("starter/visual.js")
}
else if (APPLICATION.STATUS == "develop" )
{
   SYS.DEBUG.LOG("APPLICATION.STATUS : develop");
   GET_ALL_GAME_OBJECTS()
}	
	

if (APPLICATION.ACCOUNT_SERVICE_AUTO_RUN == true){
	ACCOUNT_SYSTEM.CONNECT();	
}

	
}, 10);

}else {
	
	setTimeout( system_ready_check , 25 );
	
}


}


system_ready_check()

};


 
 
 
 
window.oncontextmenu = function ()
{
    return false;// cancel default menu
}	