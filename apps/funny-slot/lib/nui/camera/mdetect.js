

var NUI_CONTROLER = new Object();

function WEB_CAM_NUI_MAP(ee , ALL_POINTS){

try{
if (ee ) {
eval ( " NUI_CONTROLER.point"+ee+"();" );
//console.log("INDEX :" + ee + ">>>>>>" +ALL_POINTS )
}
}catch(e){}

}