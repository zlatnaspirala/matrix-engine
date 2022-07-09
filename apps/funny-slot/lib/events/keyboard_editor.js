 


window.addEventListener('keydown', function(e)
{
    
	 SYS.DEBUG.LOG(" kaydown event fired for keyboard_editor . e.keyCode " + e.keyCode );
	 //SYS.SOUND.GEN( 50 , e.keyCode * 20 );
	 
	switch(e.keyCode)
		{
		case 121:
        SYS.DEBUG.LOG("F10 command -->> Show command line ");   		
		
		case 115:
		for (var z=0;z<SYS.RUNNING_PROGRAMS.length;z++){
			window[SYS.RUNNING_PROGRAMS[z]].ENGINE.GO_TO_EDIT_MODE();
		}		
		case 37: // left
		
		break;
		case 38: // up
		
		break;
		case 39: // right
		
		break;
		case 40: // down
		
		break;
		};


}, false);  