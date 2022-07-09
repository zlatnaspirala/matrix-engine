function ELEMENT(id) { return document.getElementById(id); }
function rotateFromPrototype(code_){
switch(code_)
{
case 37: // left
yAngle -= 90;
break;
case 38: // up
xAngle += 90;
break;
case 39: // right
yAngle += 90;
break;
case 40: // down
xAngle -= 90;
break;
};
ELEMENT('cube').style.WebkitTransform = "rotateX("+xAngle+"deg) rotateY("+yAngle+"deg)";
}
var xAngle = 0, yAngle = 0;
window.addEventListener('keydown', function(e)
{
switch(e.keyCode)
{
case 37: // left
yAngle -= 90;
break;
case 38: // up
xAngle += 90;
break;
case 39: // right
yAngle += 90;
break;
case 40: // down
xAngle -= 90;
break;
};

if (navigator.userAgent.match(/Firefox/gi) == "Firefox"){				
ELEMENT('cube').style.transform = "rotateX("+xAngle+"deg) rotateY("+yAngle+"deg)";
}
else{
ELEMENT('cube').style.WebkitTransform = "rotateX("+xAngle+"deg) rotateY("+yAngle+"deg)";
}

}, false);
var HH = window.innerHeight/1.5 ;
var WW = window.innerWidth/1.5 ;
ELEMENT('cube').style.marginTop = window.innerHeight/7.8 + "px";	  
function changeSIZE() {
ELEMENT('experiment').style.WebkitPerspective = HH *2;
ELEMENT('experiment').style.WebkitPerspectiveOrigin = "50% " + HH /2 + "px";
var cols =     document.getElementById('cube');
cols.style.height =   HH;
cols.style.width =  WW;
var cols =     document.getElementsByClassName('face');
for(i=0; i<cols.length; i++) {
cols[i].style.height =   HH  ;
cols[i].style.width =  WW;
}
ELEMENT('1').style.WebkitTransform = "rotateX(90deg) translateZ("+HH/2+"px)";
ELEMENT('2').style.WebkitTransform = "translateZ("+HH/2+"px)";
ELEMENT('3').style.WebkitTransform = "rotateY(90deg) translateZ("+HH/2+"px)";
ELEMENT('4').style.WebkitTransform = "rotateX(180deg) translateZ("+HH/2+"px) rotateZ(180deg) ";
ELEMENT('5').style.WebkitTransform = "rotateY(-90deg) translateZ("+HH/2+"px)";
ELEMENT('6').style.WebkitTransform = "rotateX(-90deg) translateZ("+HH/2+"px) rotateX(-180deg) ";
}
window.addEventListener('resize', function(event){
var HH = window.innerHeight/1.3 ;
ELEMENT('cube').style.marginTop = window.innerHeight/7.8 + "px";	  
changeSIZE();
});
changeSIZE();