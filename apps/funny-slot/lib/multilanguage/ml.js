//###############################################//###############################################
//###############################################//###############################################
// MULTILANGUAGE Plugin
// SYSTEMS PLUGIN COMES WITH FREE SERVICES
//###############################################//###############################################
//###############################################//###############################################

var ML = {
     
	 ROOT : this,
	 
     DATA :  SYS.XML.READ("res/system/ml/ml.xml" , "CONVER_TO_OBJ") ,
	 
	 CURRENT_LANGUAGE : "English" ,
	 
	 get : function(alias ) {
	 
	   this.DATA.NewDataSet.lang.forEach(function(i) {
		
		if (alias == i.ALIAS["#text"]) {
		eval (  ' var RESULT = i.'+ML.CURRENT_LANGUAGE+'["#text"]; ');
		console.log(    RESULT    );
		return RESULT;
	
		}  
	   });
	 
	 
	 },
  
};