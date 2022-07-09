function AUDIO_RES(res) {
  var ROOT_AUDIO = this;

  //this.res = AUDIO_RESOURCE.source;
  this.SOUNDS = [];
  this.SOUNDS_NAMES = [];

  this.CREATE_AUDIO_OBJECT_FROM_RESOURCE = function() {
    for (var i = 0; i < AUDIO_RESOURCE.source.length; i++) {
      var audio_ = new Audio("res/audio/" + AUDIO_RESOURCE.source[i]);
      var local1 = AUDIO_RESOURCE.source[i].replace(".ogg", "");
      var local1 = local1.replace(".mp3", "");
      window["audio_object_" + local1] = audio_;
      ROOT_AUDIO.SOUNDS_NAMES.push(window["play_" + local1]);
      ROOT_AUDIO.SOUNDS.push(audio_);
      //audio_.play();
    }

    ROOT_AUDIO.SOUNDS_NAMES.PLAY = function(name) {};
  };

  // ROOT_AUDIO.CREATE_AUDIO_OBJECT_FROM_RESOURCE()
}

setTimeout(function() {
  SYS.SOUND.RES = new AUDIO_RES();
  SYS.SOUND.RES.CREATE_AUDIO_OBJECT_FROM_RESOURCE();
}, 1000);
