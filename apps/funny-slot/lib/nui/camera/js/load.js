var App = {
DRAW_ID : "N1",
INTEVAL : 1
};

var SCRIPT1 = {
 ADD : function addScript( src ) {
  var s = document.createElement( 'script' );
  s.setAttribute( 'src', src );
  document.body.appendChild( s );
}
};

function CREATE_WEBCAM_OBJECT(name_of_canvas , w , h ){
var c=document.getElementById(name_of_canvas);
c.width = w;c.height = h;
window["NUI_SURF"]=c.getContext("2d");
console.log("Msg : Surface is ready for drawing.");
}
 

 CREATE_WEBCAM_OBJECT("canvas_detection" , 640 , 480);
 
function E(id) { return document.getElementById(id); };
  
var CANVAS = E("canvas_detection");
var CANVAS_CAM = E("canvas_source"); 
setTimeout(function(){while (notes[99] !== undefined) {}  DRAW(); },666);
SCRIPT1.ADD("js/indikator.js");
