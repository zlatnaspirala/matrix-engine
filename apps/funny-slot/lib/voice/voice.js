if ('speechSynthesis' in window) {
 // Synthesis support
speechSynthesis.getVoices().forEach(function(voice) {console.log(voice.name, voice.default ? '(default)' :'');});
 
  
  
  
 SYS.VOICE.SPEAK = function(text){
var msg = new SpeechSynthesisUtterance();
var voices = window.speechSynthesis.getVoices();
msg.voice = voices[10]; 
msg.voiceURI = 'native';
msg.volume = 1; // 0 to 1
msg.rate = 1; // 0.1 to 10
msg.pitch = 2; //0 to 2
msg.text = text;
msg.lang = 'en-US';
msg.onend = function(e) {console.log('SPEAK Finished in ' + event.elapsedTime + ' seconds.');};
speechSynthesis.speak(msg); 
 };
 

 
 
 
 
 
 SYS.DEBUG.LOG("speechSynthesis support"); 
}


if ('webkitSpeechRecognition' in window) {


 SYS.VOICE.LISTEN = function(){
 
var recognition = new webkitSpeechRecognition();
recognition.continuous = true;
recognition.interimResults = true;
recognition.interim = true;
recognition.onstart = function() { console.log("START") }  
recognition.onerror = function(event) {console.log("ON ERROR" + event) }
recognition.onend = function() { console.log("ON END") }
recognition.onresult = function (event) {
  for (var i = event.resultIndex; i < event.results.length; ++i) {
    if (event.results[i].isFinal) {
     console.log( event.results[i][0].transcript + " You tell ." )
  

  }
  }
}


}






SYS.DEBUG.LOG("SpeechRecognition support");  
}