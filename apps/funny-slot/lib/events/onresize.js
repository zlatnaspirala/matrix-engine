window.onresize = function (e) {



if (SYS.DOM.RESIZE_TYPE == 'DIAMETRIC') {
  
SYS.DOM.c.width = CONVERTOR.PER_TO_PIX( SYS.DOM.W_PIX );
SYS.DOM.c.height = CONVERTOR.PER_TO_PIY( SYS.DOM.H_PIX );

}
  
 //console.log("GLOBAL EVENT : ONRESIZE ")

};