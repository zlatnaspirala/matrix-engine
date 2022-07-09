
 function DRAW(){ 
 window["PROGRAM"] = setTimeout(draw , App.INTERVAL);
 NUI_SURF.fontSize = "40px";
 
 
 function draw(){
 
   NUI_SURF.fillStyle="black";
   NUI_SURF.fillRect(0,0,MONITOR.GET_EKRAN_W(),640);
 
  var a=0;
  for(var i=0;i<GUSTINA*GUSTINA;i++){
  try{
  
 if (_N_[i] == "0") {
	 
 if (a > 12){ 
 window["NIK"].SET(notesPosX[i],notesPosY[i] );
 }
 
 a=0;
 
 NUI_SURF.fillStyle="red";
 NUI_SURF.strokeStyle ="blue";

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
  

 setTimeout(update , App.INTERVAL);
 }
 
 
 
 function update(){
  draw();
 }
 
 
}