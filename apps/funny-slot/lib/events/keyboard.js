/*
Created by Nikola Lukic zlatnaspirala@gmail.com
Copyright (c) 2016 by Nikola Lukic , All Rights Reserved. 


Quick Summary
A highly permissive license nearly identical to the MIT license but with some added trademark restrictions.


Can
 Commercial Use 
Describes the ability to use the software for commercial purposes.
 Modify 
Describes the ability to modify the software and create derivatives.
 Distribute 
Describes the ability to distribute original or modified (derivative) works.
 Sublicense 
Describes the ability for you to grant/extend a license to the software.
 Private Use 
Describes the ability to use/modify software freely without distributing it.

Cannot
 Hold Liable 
Describes the warranty and if the software/license owner can be charged for damages.
 Use Trademark 
Describes the allowance of using contributors' names, trademarks or logos.

Must
 Include Copyright 
Describes whether the original copyright must be retained.
 Include License 
Including the full text of license in modified software.


*//***************************************************************************/
/*                                                                         */
/*  This obfuscated code was created by Javascript Obfuscator Free Version.*/
/*  Javascript Obfuscator Free Version can be downloaded here              */
/*  http://javascriptobfuscator.com                                        */
/*                                                                         */
/***************************************************************************/
function KEYBOARD(c){var L=this;L.CAPTURE_CHAR="";L.LAST_CAPTURE_CHAR="";L.ACTION_ON_KEY_DOWN=function(){};this.CANVAS=c;this.PROGRAM_NAME=c.id;c.addEventListener("\x6B\x65\x79\x64\x6F\x77\x6E",function(e){switch(e.keyCode){case 8:e.preventDefault();SYS.DEBUG.LOG("\x70\x72\x65\x76\x65\x6E\x74\x20\x64\x65\x66\x61\x75\x6C\x74\x20\x66\x6F\x72\x20\x62\x61\x63\x6B\x73\x70\x61\x63\x65\x2E");;};SYS.DEBUG.LOG("\x20\x47\x41\x4D\x45\x20\x52\x55\x4E\x4E\x49\x4E\x47\x20\x2C\x20\x6B\x65\x79\x20\x70\x72\x65\x73\x73\x65\x64\x3A\x20"+e.keyCode);if( typeof PLAYER!="\x75\x6E\x64\x65\x66\x69\x6E\x65\x64"){if(PLAYER.TYPE=="\x50\x4C\x41\x54\x46\x4F\x52\x4D\x45\x52"){PLAYER.FREEZ=false;switch(e.keyCode){case 121:SYS.DEBUG.LOG("\x46\x31\x30\x20\x63\x6F\x6D\x6D\x61\x6E\x64\x20\x2D\x2D\x3E\x3E\x20\x53\x68\x6F\x77\x20\x63\x6F\x6D\x6D\x61\x6E\x64\x20\x6C\x69\x6E\x65\x20");;case 69:;case 37:PLAYER.CONTROL.LEFT=true;PLAYER.X=PLAYER.SPEED;if(PLAYER.CONTROL.JUMP===false){setTimeout(function(){PLAYER.POSITION.TRANSLATE_BY_Y(100)},50)};break ;;case 38:if(PLAYER.CONTROL.JUMP===false){PLAYER.BREAK_AT_MOMENT_STATUS=false;PLAYER.CONTROL.JUMP=true;PLAYER.Y=PLAYER.SPEED*10;console.log("\x3E\x3E\x3E\x3E\x3E\x3E\x3E"+PLAYER.Y);setTimeout(function(){while(PLAYER.Y>0){PLAYER.Y=PLAYER.Y-PLAYER.SPEED/5};PLAYER.Y= -1;},100);};break ;;case 39:PLAYER.CONTROL.RIGHT=true;PLAYER.X=-PLAYER.SPEED;if(PLAYER.CONTROL.JUMP===false){setTimeout(function(){PLAYER.POSITION.TRANSLATE_BY_Y(100)},50)};break ;;case 40:break ;;};}else {if(PLAYER.TYPE=="\x4E\x4F\x52\x4D\x41\x4C"){switch(e.keyCode){case 121:SYS.DEBUG.LOG("\x46\x31\x30\x20\x63\x6F\x6D\x6D\x61\x6E\x64\x20\x2D\x2D\x3E\x3E\x20\x53\x68\x6F\x77\x20\x63\x6F\x6D\x6D\x61\x6E\x64\x20\x6C\x69\x6E\x65\x20");;case 69:;case 37:PLAYER.X=PLAYER.X-PLAYER.SPEED;PLAYER.POSITION.TRANSLATE_BY_X(PLAYER.X);break ;;case 38:PLAYER.Y=PLAYER.Y-PLAYER.SPEED;PLAYER.POSITION.TRANSLATE_BY_Y(PLAYER.Y);break ;;case 39:PLAYER.X=PLAYER.X+PLAYER.SPEED;PLAYER.POSITION.TRANSLATE_BY_X(PLAYER.X);break ;;case 40:PLAYER.Y=PLAYER.Y+PLAYER.SPEED;PLAYER.POSITION.TRANSLATE_BY_Y(PLAYER.Y);break ;;}}}};SYS.DEBUG.LOG("\x4B\x45\x59\x42\x4F\x41\x52\x44\x2D\x2D\x3E\x3E\x20\x53\x68\x6F\x77\x20\x75\x73\x65\x72\x73\x20\x74\x79\x70\x65\x73\x20\x3A\x20"+e.keyCode);var M;if(window.event){M=e.keyCode}else {if(e.which){M=e.which}};if(e.keyCode==8){SYS.DEBUG.LOG("\x74\x65\x78\x74\x62\x6F\x78\x20\x64\x65\x6C\x65\x74\x65\x20\x6C\x61\x73\x74\x20\x63\x68\x61\x72\x21");L.CAPTURE_CHAR=remove_last(L.CAPTURE_CHAR);}else {L.CAPTURE_CHAR+=(String.fromCharCode(M));L.LAST_CAPTURE_CHAR=(String.fromCharCode(M));};L.ACTION_ON_KEY_DOWN();if( typeof L.TARGET_MODUL!="\x75\x6E\x64\x65\x66\x69\x6E\x65\x64"&& typeof L.TARGET!="\x75\x6E\x64\x65\x66\x69\x6E\x65\x64"){window[L.PROGRAM_NAME].ENGINE.MODULES.ACCESS(L.TARGET_MODUL).GAME_OBJECTS.ACCESS(L.TARGET).TEXTBOX.TEXT=L.CAPTURE_CHAR};},false);c.addEventListener("\x6B\x65\x79\x75\x70",function(e){SYS.DEBUG.LOG("\x20\x47\x41\x4D\x45\x20\x52\x55\x4E\x4E\x49\x4E\x47\x20\x2C\x20\x6B\x65\x79\x20\x75\x70\x20\x3A\x20"+e.keyCode);if( typeof PLAYER!="\x75\x6E\x64\x65\x66\x69\x6E\x65\x64"){if(PLAYER.TYPE=="\x50\x4C\x41\x54\x46\x4F\x52\x4D\x45\x52"){switch(e.keyCode){case 121:SYS.DEBUG.LOG("\x46\x31\x30\x20\x63\x6F\x6D\x6D\x61\x6E\x64\x20\x2D\x2D\x3E\x3E\x20\x53\x68\x6F\x77\x20\x63\x6F\x6D\x6D\x61\x6E\x64\x20\x6C\x69\x6E\x65\x20");;case 69:;case 37:PLAYER.CONTROL.LEFT=false;while(PLAYER.X>0){PLAYER.X=PLAYER.X-PLAYER.SPEED/5};PLAYER.X=0;break ;;case 38:while(PLAYER.Y>0){PLAYER.Y=PLAYER.Y-PLAYER.SPEED/5};break ;;case 39:PLAYER.CONTROL.LEFT=false;while(PLAYER.X<0){PLAYER.X=PLAYER.X+PLAYER.SPEED/5};PLAYER.X=0;break ;;case 40:break ;;}}else {if(PLAYER.TYPE=="\x4E\x4F\x52\x4D\x41\x4C"){switch(e.keyCode){case 121:SYS.DEBUG.LOG("\x46\x31\x30\x20\x63\x6F\x6D\x6D\x61\x6E\x64\x20\x2D\x2D\x3E\x3E\x20\x53\x68\x6F\x77\x20\x63\x6F\x6D\x6D\x61\x6E\x64\x20\x6C\x69\x6E\x65\x20");;case 69:;case 37:PLAYER.X=PLAYER.X-PLAYER.SPEED;PLAYER.POSITION.TRANSLATE_BY_X(PLAYER.X);break ;;case 38:PLAYER.Y=PLAYER.Y-PLAYER.SPEED;PLAYER.POSITION.TRANSLATE_BY_Y(PLAYER.Y);break ;;case 39:PLAYER.X=PLAYER.X+PLAYER.SPEED;PLAYER.POSITION.TRANSLATE_BY_X(PLAYER.X);break ;;case 40:PLAYER.Y=PLAYER.Y+PLAYER.SPEED;PLAYER.POSITION.TRANSLATE_BY_Y(PLAYER.Y);break ;;}}}};},false);}