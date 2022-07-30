window.onbeforeunload = function (e) {

 console.log("GLOBAL EVENT : BEFORE_UNLOAD")
 
    e = e || window.event;

    // For IE and Firefox prior to version 4
    if (e) {
        e.returnValue = 'Dont prevent alert msg box it is a main tool for visual js .\n Reload  Sure?';
    }

    // For Safari
    return 'Dont prevent alert msg box it is a main tool for visual js .\n  Reload Sure?';
	
};