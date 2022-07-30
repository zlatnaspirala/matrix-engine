//###############################################//###############################################
//  Whole preload class/procedural function 
//  Initial staff
//###############################################//###############################################

function DETECTBROWSER(){
var HREFF,HREFTXT = "unknown";
this.NAVIGATOR = navigator.userAgent;var NAV =navigator.userAgent;var gecko,navIpad,operatablet,navIphone,navFirefox,navChrome,navOpera,navSafari,navandroid,mobile,navMozilla;  
gecko=NAV.match(/gecko/gi);
navOpera=NAV.match(/opera/gi); 
operatablet=NAV.match(/Tablet/gi); 
navIpad=NAV.match(/ipad/gi); 
navIphone=NAV.match(/iphone/gi);        
navFirefox = NAV.match(/Firefox/gi);
navMozilla = NAV.match(/mozilla/gi);
navChrome = NAV.match(/Chrome/gi);
navSafari = NAV.match(/safari/gi);
navandroid = NAV.match(/android/gi);
mobile = NAV.match(/mobile/gi);  
window["TYPEOFANDROID"] = 0;
window["NOMOBILE"] = 0;

var mobile = (/iphone|ipad|ipod|android|blackberry|mini|windows\sce|palm/i.test(navigator.userAgent.toLowerCase()));
              if (mobile) {
                  var userAgent = navigator.userAgent.toLowerCase();
                  if ((userAgent.search("android") > -1) && (userAgent.search("mobile") > -1))
                         console.log("ANDROID MOBILE")
                   else if ((userAgent.search("android") > -1) && !(userAgent.search("mobile") > -1))
                         console.log(" ANDROID TABLET ")
                         TYPEOFANDROID = 1;                              
                   }
                   else {NOMOBILE=1;  }
  //  FIREFOX za android 
 if(navFirefox && navandroid && TYPEOFANDROID == 0){HREFF = "#"; HREFTXT = "mobile_firefox_android"; } 
  //  FIREFOX za android T
 if(navFirefox && navandroid && TYPEOFANDROID == 1){HREFF = "#"; HREFTXT = "mobile_firefox_android_tablet"; }
 // OPERA ZA ANDROID
 if(navOpera && navandroid){HREFF = "#"; HREFTXT = "opera_mobile_android"; }// provera 
 // OPERA ZA ANDROID TABLET
 if(navOpera && navandroid && operatablet){HREFF = "#"; HREFTXT = "opera_mobile_android_tablet"; }// provera 
//  safari mobile za IPHONE - i  safari mobile za IPAD i CHROME za IPAD 
  if(navSafari){
  var Iphonesafari = NAV.match(/iphone/gi);     
  if (Iphonesafari){HREFF = "#"; HREFTXT = "safari_mobile_iphone"; }  
 else if (navIpad){ HREFF = "#"; HREFTXT = "mobile_safari_chrome_ipad"; }
 else if (navandroid){ HREFF = "#"; HREFTXT = "android_native";  } }
  // TEST CHROME 
 if(navChrome &&  navSafari  && navMozilla && TYPEOFANDROID == 1){HREFF = "#"; HREFTXT = "mobile_chrome_android_tablet"; }
 if(navChrome &&  navSafari  && navMozilla && TYPEOFANDROID == 0){HREFF = "#"; HREFTXT = "mobile_chrome_android"; }
 if(navChrome && TYPEOFANDROID == 0 ){HREFF = "#"; HREFTXT = "chrome_browser"; }
 if(navMozilla && NOMOBILE==1 && gecko && navFirefox){HREFF = "#"; HREFTXT = "firefox_desktop"; } 
 if( navOpera && TYPEOFANDROID == 0 && !mobile){HREFF = "#"; HREFTXT = "opera_desktop"; }
 
 this.NAME  = HREFTXT;
 this.NOMOBILE = NOMOBILE;
}
//###############################################//###############################################
//###############################################//###############################################




//###############################################//###############################################
//###############################################//###############################################
// Load script in runtime
//###############################################//###############################################
//###############################################//###############################################
var SCRIPT = {
 LOAD : function addScript( src ) {
  var s = document.createElement( 'script' );
  s.setAttribute( 'src', src );
  document.body.appendChild( s );
}
};
//###############################################//###############################################
//###############################################//###############################################




//###############################################//###############################################
//###############################################//###############################################
// LOGGER
//###############################################//###############################################
//###############################################//###############################################
function LOG (){
	 
	 this.ENABLE = false;
	 
	 this.LOG = function(data){
		 
		 if ( this.ENABLE == true ){
			 
			 console.log('%c' + data , 'background: #333; color: lime');
			 
		 }
		 
	 };
	 
	 this.WARNING = function(data){
		 
		 if ( this.ENABLE == true ){
			 
			 console.log('%c Warning : ' + data , 'background: #333; color: yellow');
			 
		 }
		 
	 };
	 
	 
	 this.CRITICAL = function(data){
		 
		 if ( this.ENABLE == true ){
			 
			 console.log('%c Critical : ' + data , 'background: #333; color: yellow');
			 
		 }
		 
	 };
	 

 }
//###############################################//###############################################
//###############################################//###############################################


//###############################################//###############################################
//###############################################//###############################################
// IMAGE OBJECT CREATOR
//###############################################//###############################################
//###############################################//###############################################
function CREATE_IMG(name , src){
	
	window["image_"+name] = new Image();
	window["image_"+name].src = src;
	window["image_"+name].onload = function(){SYS.RES.SUM_OF_LOADED_IMAGES++;}

	
}


//###############################################//###############################################
//###############################################//############################################### 
 //webcam check
 
var webcamError = function(e) {
		alert('Webcam error!', e);
};
	
 function test_webcam_device() {
 	function hasGetUserMedia() {
		return !!(navigator.getUserMedia || navigator.webkitGetUserMedia ||
			navigator.mozGetUserMedia || navigator.msGetUserMedia);
	}
	if (hasGetUserMedia()) {
     console.log("webcam operartion support");
	 return true;
	} else {
	console.log("webcam operartion faild");
	 return false;
	}
}

function SET_STREAM (video) {

if (navigator.getUserMedia) {

navigator.getUserMedia({audio: true, video: true}, function(stream) {
video.src = stream;
//initialize();

}, webcamError);
} else if (navigator.webkitGetUserMedia) {

navigator.webkitGetUserMedia({audio: true, video: true}, function(stream) {
video.src = window.URL.createObjectURL(stream);

// initialize();

}, webcamError);
} 
else {alert("webcam broken.");}

}

function initialize() {
	if (!AudioContext) {
		alert("AudioContext not supported!");
	}
	else {
		  loadSounds();
	}
}

function CREATE_MOTION_PARAMETERS (ROOT_GAME_OBJECT) {

	 window["notesPosY"]=[];
	 window["notesPosX"]=[]; 
	 
	 
 
	 
	 for (var j=0;j<ROOT_GAME_OBJECT.WEBCAM.numFieldV;j++) {
	 for (var d=0;d<ROOT_GAME_OBJECT.WEBCAM.numFieldH;d++) {
	 ROOT_GAME_OBJECT.WEBCAM._N_.push("0"); 

	 if (d==0) {
	 //notesPosX.push(  ROOT_GAME_OBJECT.POSITION.X()  );
	 notesPosX.push( 0  );
	 }
	 else { //notesPosX
	 notesPosX.push(  d* ROOT_GAME_OBJECT.WEBCAM.BLEND_CANVAS.width/8  );
	 }
	 
	 if (j==0) {
	 notesPosY.push(0);
	 }
	 else {
	 //notesPosY.push(   ROOT_GAME_OBJECT.POSITION.X() +  j* ROOT_GAME_OBJECT.DIMENSION.WIDTH()/8 );
	 notesPosY.push(  j* ROOT_GAME_OBJECT.WEBCAM.BLEND_CANVAS.width/8 );
	 }
	  
	 }
 

	 }
 
}

function CREATE_MOTION_FIELDS (ROOT_GAME_OBJECT){
var source = "test";

var sum = ROOT_GAME_OBJECT.WEBCAM.numFieldV*ROOT_GAME_OBJECT.WEBCAM.numFieldH;

for (var i=0;  i<sum; i++) {

var note = {
note: source,
ready: true,
visual: "test2"
}; 
note.area = {x:notesPosX[i], y:notesPosY[i], width: ROOT_GAME_OBJECT.WEBCAM.BLEND_CANVAS.width/8 , height:ROOT_GAME_OBJECT.WEBCAM.BLEND_CANVAS.height/8 };
ROOT_GAME_OBJECT.WEBCAM.NOTES.push(note); 

}



}


window["ARRAY_SOUND"] = [];
for (var s=0 ; s<1; s++) {
ARRAY_SOUND.push('sounds/note1.mp3');
}
	
function loadSounds() {
soundContext = new AudioContext();
bufferLoader = new BufferLoader(soundContext,ARRAY_SOUND
,
finishedLoading
);
bufferLoader.load();
}

function finishedLoading(bufferList) {
/* var source = soundContext.createBufferSource();

source.buffer = bufferList[0];

source.connect(soundContext.destination);
 */
}

function playSound(obj) {
if (!obj.ready) return;
var source = soundContext.createBufferSource();
source.buffer = obj.note.buffer;
source.connect(soundContext.destination);
source.noteOn(0);
obj.ready = false;
// throttle the note
setTimeout(setNoteReady, 400, obj);
}

function setNoteReady(obj) {
obj.ready = true;
}

var lastImageData;

	function blend( GO ,  s  ) {
		//var width = DIMENSION.WIDTH();
		//var height = DIMENSION.HEIGHT();
		//ROOT_GAME_OBJECT.WEBCAM.BS
		
		var width = GO.WEBCAM.BLEND_CANVAS.width;
		var height = GO.WEBCAM.BLEND_CANVAS.width;
		
		
		// s.drawImage(GO.WEBCAM.VIDEO , GO.POSITION.X() , GO.POSITION.Y() , width, height);
		GO.WEBCAM.RC.drawImage(GO.WEBCAM.VIDEO , 0 , 0 , width, height);
		
		// get webcam image data
		//var sourceData = s.getImageData( GO.POSITION.X() , GO.POSITION.Y() , width, height);
		var sourceData = GO.WEBCAM.RC.getImageData( 0,0, width, height);
		// create an image if the previous image doesn’t exist
		//if (!lastImageData) lastImageData = s.getImageData(POSITION.X(), POSITION.Y(), width, height);
		//if (!lastImageData) lastImageData = s.getImageData(GO.POSITION.X() , GO.POSITION.Y(), width, height);
		if (!lastImageData) lastImageData = GO.WEBCAM.RC.getImageData(0,0, width, height);
		// create a ImageData instance to receive the blended result
		var blendedData = GO.WEBCAM.RC.createImageData(width, height);
		// blend the 2 images
		differenceAccuracy(blendedData.data, sourceData.data, lastImageData.data);
		// draw the result in a canvas
		GO.WEBCAM.BS.putImageData(blendedData, 0,0 );
		// store the current webcam image
		lastImageData = sourceData;
	}
	
	function fastAbs(value) {
		// funky bitwise, equal Math.abs
		return (value ^ (value >> 31)) - (value >> 31);
	}

	function threshold(value) {
		return (value > 0x15) ? 0xFF : 0;
	}

	function difference(target, data1, data2) {
		// blend mode difference
		if (data1.length != data2.length) return null;
		var i = 0;
		while (i < (data1.length * 0.25)) {
			target[4*i] = data1[4*i] == 0 ? 0 : fastAbs(data1[4*i] - data2[4*i]);
			target[4*i+1] = data1[4*i+1] == 0 ? 0 : fastAbs(data1[4*i+1] - data2[4*i+1]);
			target[4*i+2] = data1[4*i+2] == 0 ? 0 : fastAbs(data1[4*i+2] - data2[4*i+2]);
			target[4*i+3] = 0xFF;
			++i;
		}
	}

	function differenceAccuracy(target, data1, data2) {
		if (data1.length != data2.length) return null;
		var i = 0;
		while (i < (data1.length * 0.25)) {
			var average1 = (data1[4*i] + data1[4*i+1] + data1[4*i+2]) / 3;
			var average2 = (data2[4*i] + data2[4*i+1] + data2[4*i+2]) / 3;
			var diff = threshold(fastAbs(average1 - average2));
			target[4*i] = diff;
			target[4*i+1] = diff;
			target[4*i+2] = diff;
			target[4*i+3] = 0xFF;
			++i;
		}
	}

	function checkAreas( ROOT_GAME_OBJECT ) {
	
 
	
		// loop over the note areas
		for (var r=0; r<ROOT_GAME_OBJECT.WEBCAM.numFieldV*ROOT_GAME_OBJECT.WEBCAM.numFieldH; ++r) {
			// get the pixels in a note area from the blended image
			//var blendedData = BS.getImageData(notes[r].area.x, notes[r].area.y, notes[r].area.width, notes[r].area.height);
			var blendedData = ROOT_GAME_OBJECT.WEBCAM.BS.getImageData(ROOT_GAME_OBJECT.WEBCAM.NOTES[r].area.x, ROOT_GAME_OBJECT.WEBCAM.NOTES[r].area.y, ROOT_GAME_OBJECT.WEBCAM.NOTES[r].area.width, ROOT_GAME_OBJECT.WEBCAM.NOTES[r].area.height);
			
			var i = 0;
			var average = 0;
			while (i < (blendedData.data.length * 0.25)) {
				average += (blendedData.data[i*4] + blendedData.data[i*4+1] + blendedData.data[i*4+2]) / 3;
				++i;
			}

			average = Math.round(average / (blendedData.data.length * 0.25));
			if (average > 10) {

				ROOT_GAME_OBJECT.WEBCAM._N_[r] = "1";
				__DESTROY___(r , ROOT_GAME_OBJECT.WEBCAM._N_);
				WEB_CAM_NUI_MAP(r , ROOT_GAME_OBJECT.WEBCAM._N_ );
				
			}
		}
	}

	
	function __DESTROY___(index , _N_){
	var _N_ = _N_;
   window["T"+index] = setTimeout(function(){ _N_[index] = "0"; }, 1333);
    }


function WEBCAM_DRAW(NUI_SURF , WEBCAM )  {
	 
	if (this.HIDE_INDICATED_POINT == false){
	 
  var a=0;
  for(var i=0;i<WEBCAM.numFieldH*WEBCAM.numFieldV;i++){
  try{
  
 if (WEBCAM._N_[i] == "0") {
	 
 if (a > 12){ 
 window["NIK"].SET(notesPosX[i],notesPosY[i] );
 }
 
 a=0;
 
 NUI_SURF.fillStyle="red";
 NUI_SURF.strokeStyle ="blue";

  NUI_SURF.fillText("point " + i , notesPosX[i],notesPosY[i] , 44 , 44 );
  
 if (i == 10) {
 NUI_SURF.fillText("Rotate  ", notesPosX[i],notesPosY[i] , 44 , 44 );
 }
 if (i == 13) {
 NUI_SURF.fillText("Forward  ", notesPosX[i],notesPosY[i] , 44 , 44 );
 }
 if (i == 15) {
 NUI_SURF.fillText("Attack  ", notesPosX[i],notesPosY[i] , 44 , 44 );
 }
 if (i == 47) {
 NUI_SURF.fillText("Clear  ", notesPosX[i],notesPosY[i] , 44 , 44 );
 }
  
 }
//###############################
 else
 {//ACTIVE
 //###############################
 
 a++;
 //ACTIVE
 NUI_SURF.fillStyle="blue";
 NUI_SURF.strokeStyle ="red";
  
 NUI_SURF.strokeRect(notesPosX[i],notesPosY[i] , 44 , 44 );
 if (i == 10) {
 NUI_SURF.fillText("Rotate  ", notesPosX[i],notesPosY[i] , 44 , 44 );
 }
 if (i == 13) {
 NUI_SURF.fillText("Forward  ", notesPosX[i],notesPosY[i] , 44 , 44 );
 }
 if (i == 15) {
 NUI_SURF.fillText("Attack  ", notesPosX[i],notesPosY[i] , 44 , 44 );
 }
 if (i == 47) {
 NUI_SURF.fillText("Clear  ", notesPosX[i],notesPosY[i] , 44 , 44 );
 }
 
 }
  
 }catch(e){ }

 
 }
  
  
}
  
}

//###############################################//###############################################
//###############################################//############################################### 
 
 

 
 
 
//###############################################//###############################################
//###############################################//###############################################
// DOM and window operation
//###############################################//###############################################
//###############################################//###############################################
function DOM()
{
	
this.E = function(id) { return document.getElementById(id); };
this.ACCESS_IFRAME = function(name){return document.getElementById(name).contentWindow;};
this.GOTO = function(url_){location.assign(url_)};

//###############################################//###############################################
this.CREATE_SURFACE =  function ( ctx , name_of_canvas , w , h , resizeType ){

this.c=document.getElementById(name_of_canvas);

if (typeof resizeType === 'undefined' || resizeType == 'DIAMETRIC') {

this.RESIZE_TYPE = 'DIAMETRIC';

this.W_PIX =  w ;
this.H_PIX =  h ;

this.c.width = CONVERTOR.PER_TO_PIX( this.W_PIX );
this.c.height = CONVERTOR.PER_TO_PIY( this.H_PIX );


}else if(resizeType == 'FIXED' ) {

this.RESIZE_TYPE = 'FIXED';

}else {

this.RESIZE_TYPE = 'DIAMETRIC';

}		



//c.width = w;c.height = h;

window[ctx]=this.c.getContext("2d");
SYS.DEBUG.LOG("SYS : Surface created , program name is " + name_of_canvas);
SYS.RUNNING_PROGRAMS.push(name_of_canvas);
//
window[name_of_canvas] = new PROGRAM(window[ctx] , this.c);
window[name_of_canvas].DRAW()

};
//###############################################//###############################################




//###############################################//###############################################
// Destroy DOM element
this.removeElement  = function (parentDiv, childDiv){

if (typeof childDiv == 'undefined') {

console.log("remove now")
document.body.removeChild(  parentDiv );

}
else if (document.getElementById(childDiv)) {     
var child = document.getElementById(childDiv);
var parent = document.getElementById(parentDiv);
parent.removeChild(child);
parent.style.zIndex = 0;
parent.style.display = "none";
}
else {  
return false;
}
}
//###############################################//###############################################




//###############################################//###############################################
this.DESTROY_PROGRAM = function(name){
	
	if ( typeof  name === 'undefined' ){
	
	SYS.DEBUG.WARNING( "SYS : warning for procedure 'SYS.DOM.DESTROY_PROGRAM'  Desciption : arrg name :>> " +typeof name+" << not valid." );
	
	}
	else if (typeof window[name] === 'undefined'){
	
	SYS.DEBUG.WARNING( "SYS : warning for procedure 'SYS.DOM.DESTROY_PROGRAM'  Desciption : program with  name: " +name+" not exist. " );
	
	}
	else {
	
	//memory memory memory
	window[name].DRAW = function(){};
	window[name].UPDATE = function(){};
	window[name].DRAW_INTERVAL = undefined;
    window[name].UPDATE_INTERVAL = undefined;
	window[name].AUTO_UPDATE = [];
	window[name].AUTO_UPDATE = undefined;
	window[name] = undefined;
	delete window[name];
	
	//remove dom element canvas
	//this.removeElement(SYS.DOM.E(name));
	
	SYS.RUNNING_PROGRAMS.unset(name);
	
	SYS.DEBUG.LOG( "SYS : log for procedure 'SYS.DOM.DESTROY_PROGRAM'  Desciption : program with  name :" + name + " is dead. Memory clear .");
	
	}
	
};
//###############################################//###############################################


//###############################################//###############################################
// Fullscreen code
this.LANCH_FULLSCREEN=function(element){
  if(element.requestFullscreen) 
  {
    element.requestFullscreen();
  }
  else if(element.mozRequestFullScreen) {
    element.mozRequestFullScreen();
  }
  else if(element.webkitRequestFullscreen) {
    element.webkitRequestFullscreen();
  }
  else if(element.msRequestFullscreen) {
    element.msRequestFullscreen();
  }
};


this.EXIT_FULLSCREEN=function() {
  if(document.exitFullscreen) {
    document.exitFullscreen();
  } else if(document.mozCancelFullScreen) {
    document.mozCancelFullScreen();
  } else if(document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  }
};


this.FS_FLAG = 0;

//Execute func switch
this.FULL_SCREEN = function(){

if (this.FS_FLAG == 0 ) {
this.LANCH_FULLSCREEN(document.documentElement);
this.FS_FLAG = 1;
}else if (this.FS_FLAG == 1) {
this.EXIT_FULLSCREEN();
this.FS_FLAG = 0;
}
};
//###############################################//###############################################



}
//###############################################//###############################################
//###############################################//###############################################


var lineLength = function(x, y, x0, y0){
    return Math.sqrt((x -= x0) * x + (y -= y0) * y);
};


/*
(function() {
	
}());
*/

var PAGE = {

	SET_ICON : function(SRC){
		
    var link = document.createElement('link');
    link.type = 'image/x-icon';
    link.rel = 'shortcut icon';
	//SRC
    //link.href = 'http://www.stackoverflow.com/favicon.ico';
	link.href = 'favicon.png';
    document.getElementsByTagName('head')[0].appendChild(link);
	
	},
	
	ANIMATE_ICON : null ,
	
	ANIMATE : function(){
		
		//this.ANIMATE_ICON = setInterval(function(){
			
			
		//},200);
		
		
		
	},
	
	
	
};



//###############################################//###############################################
//###############################################//###############################################
// LOCAL STORAGE OPERATION
//###############################################//###############################################
//###############################################//###############################################
function LS_SET(name,value){
localStorage.setItem(name, value);
}

function LS_GET(name){
return localStorage.getItem(name);
}


// Put the object into storage
function SAVE(name , obj){
localStorage.setItem( name, JSON.stringify(obj));
console.log(JSON.stringify(obj))
}
// Retrieve the object from storage
function LOAD(name){
if ( localStorage.getItem(name) == 'undefined' ||  localStorage.getItem(name) == null || localStorage.getItem(name) == "") {
	SYS.DEBUG.WARNING('error in loading localstorage object! name of object : name' + name + " , but value is " + localStorage.getItem(name) );
	return false;
}
else {
return JSON.parse(localStorage.getItem(name));
}

}


//###############################################//###############################################
//###############################################//###############################################		




//###############################################//###############################################
//###############################################//###############################################		
//  FILES OPERATION 
//###############################################//###############################################
//###############################################//###############################################		
function readXML(path , operation ){
if (window.XMLHttpRequest) {xmlhttpGA=new XMLHttpRequest();}
xmlhttpGA.open("GET",path,false);  
xmlhttpGA.send();
xmlDocGA=xmlhttpGA.responseXML;

if (typeof operation === 'undefined' ) {
return xmlDocGA;
}else if (operation == "CONVER_TO_OBJ" ) {
return xmlToJson(xmlDocGA);
}


}



function xmlToJson(xml) {
	
	// Create the return object
	var obj = {};

	if (xml.nodeType == 1) { // element
		// do attributes
		if (xml.attributes.length > 0) {
		obj["@attributes"] = {};
			for (var j = 0; j < xml.attributes.length; j++) {
				var attribute = xml.attributes.item(j);
				obj["@attributes"][attribute.nodeName] = attribute.nodeValue;
			}
		}
	} else if (xml.nodeType == 3) { // text
		obj = xml.nodeValue;
	}

	// do children
	if (xml.hasChildNodes()) {
		for(var i = 0; i < xml.childNodes.length; i++) {
			var item = xml.childNodes.item(i);
			var nodeName = item.nodeName;
			if (typeof(obj[nodeName]) == "undefined") {
				obj[nodeName] = xmlToJson(item);
			} else {
				if (typeof(obj[nodeName].push) == "undefined") {
					var old = obj[nodeName];
					obj[nodeName] = [];
					obj[nodeName].push(old);
				}
				obj[nodeName].push(xmlToJson(item));
			}
		}
	}
	
	
	  var private_call = JSON.stringify( obj );
	  private_call.replace("#text" , "text"); // Fix literal # symbol
	  
	  return JSON.parse(private_call);
	//return obj;
	
	
};
//###############################################//###############################################
//###############################################//###############################################		








//###############################################//###############################################
//###############################################//###############################################
// MONITOR AND BROWSER_VIEW- COORDINATE SYSTEM
//###############################################//###############################################
//###############################################//###############################################
function MONITOR(){


	
}


var VIEW = {

 W :  function(per){
		
	if (typeof per === 'undefined'){
		return window.innerWidth;
	}else{
		return window.innerWidth/100 * per;
	}
	
 },
 H :  function(per){
		
	if (typeof per === 'undefined'){
		return window.innerHeight;
	}
	else{
		return window.innerHeight/100 * per;
	}
	
},
 
ASPECT : function(){

	return window.innerWidth / window.innerHeight;

},
 
};
//###############################################//###############################################
//###############################################//###############################################



//###############################################//###############################################
//###############################################//###############################################
// percents to pixel convert
//###############################################//###############################################
//###############################################//###############################################
var  CONVERTOR = {

 PER_TO_PIX : function(v  ){
 
var ONE_PERCENT = window.innerWidth/100;     
return v*ONE_PERCENT;
 
 },
 
 PIX_TO_PER : function(v){

 var ONE_PERCENT = window.innerWidth/100;    
 return v/ONE_PERCENT;
  
 },
 
 
 PER_TO_PIY : function(v  ){
 
var ONE_PERCENT = window.innerHeight/100;     
return v*ONE_PERCENT;
 
 },
 
 PIY_TO_PER : function(v){

 var ONE_PERCENT = window.innerHeight/100;    
 return v/ONE_PERCENT;
  
 },
 
 
 

};
//###############################################//###############################################
//###############################################//###############################################


function remove_last(str){return str.slice(0, -1)}


var DEEP_COPY = {
    //public method
    getCloneOfObject: function(oldObject) {
        var tempClone = {};

        if (typeof(oldObject) == "object")
            for (prop in oldObject)
                // for array use private method getCloneOfArray
                if ((typeof(oldObject[prop]) == "object") &&
                                (oldObject[prop]).__isArray)
                    tempClone[prop] = this.getCloneOfArray(oldObject[prop]);
                // for object make recursive call to getCloneOfObject
                else if (typeof(oldObject[prop]) == "object")
                    tempClone[prop] = this.getCloneOfObject(oldObject[prop]);
                // normal (non-object type) members
                else
                    tempClone[prop] = oldObject[prop];

        return tempClone;
    },

    //private method (to copy array of objects) - getCloneOfObject will use this internally
    getCloneOfArray: function(oldArray) {
        var tempClone = [];

        for (var arrIndex = 0; arrIndex <= oldArray.length; arrIndex++)
            if (typeof(oldArray[arrIndex]) == "object")
                tempClone.push(this.getCloneOfObject(oldArray[arrIndex]));
            else
                tempClone.push(oldArray[arrIndex]);

        return tempClone;
    }
};



function SOUND (duration , fref){

	var audio = new window.AudioContext();
	var osc = audio.createOscillator();
	osc.frequency.value = fref;
	osc.connect(audio.destination);
	osc.start(0);

	setTimeout(function(){
	osc.stop();
	audio.close();
	audio = null;
	osc =null;
	delete osc;
    delete audio;	
	}, duration );

}

	
	
var RESOURCE = new Object();
RESOURCE.SUM = 0;


function drawRotatedImage(image, x, y, angle , w  , h , surf ) { 
 
	surf.save(); 
	surf.translate(x + w/2 , y + h/2);
	surf.rotate(angle);
	if (typeof image !== 'undefined') {
	surf.drawImage(image, -(w/2), -(h/2) , w , h );
	}
	surf.restore(); 
	
}



 
function drawRotatedText( s , text, x, y, angle , w , h ) { 
 
	SURF.save(); 
	SURF.rotate(SYS.MATH.TO_RADIANS(angle)); 
	SURF.fillText(text, x + (w/2), y +(h/2) ,w );
	SURF.restore(); 
	
}
 
 
function roundedRect(SURF,t, x,y,width,height,radius , color , type , strokeColor){
SURF.save()
if (type == 'stroke')
{
SURF.strokeStyle = strokeColor;
}
else{
SURF.fillStyle = color;
}
SURF.beginPath();
SURF.moveTo(x,y+radius);
SURF.lineTo(x,y+height-radius);
SURF.quadraticCurveTo(x,y+height,x+radius,y+height);
SURF.lineTo(x+width-radius,y+height);
SURF.quadraticCurveTo(x+width,y+height,x+width,y+height-radius);
SURF.lineTo(x+width,y+radius);
SURF.quadraticCurveTo(x+width,y,x+width-radius,y);
SURF.lineTo(x+radius,y);
SURF.quadraticCurveTo(x,y,x,y+radius);
if (type == 'stroke'){   SURF.stroke(); }else{
SURF.fill();
}
SURF.restore()  
}

