
export class MatrixSounds {

  constructor() {
    this.volume = 0.5;
    this.audios = {};
  }

  createClones(c, name, path) {
    for(var x = 1;x < c;x++) {
      let a = new Audio(path);
      a.id = name + x;
      a.volume = this.volume;
      this.audios[name + x] = a;
      document.body.append(a);
    }
  }

  createAudio(name, path, useClones) {
    let a = new Audio(path);
    a.id = name;
    a.volume = this.volume;
    this.audios[name] = a;
    document.body.append(a);
    if(typeof useClones !== 'undefined') {
      this.createClones(useClones, name, path);
    }
  }

  play(name) {
    if(this.audios[name].paused == true) {
      this.audios[name].play()
    } else {
      this.tryClone(name);
    }
  }

  tryClone(name) {
    var cc = 1;
    try {
      while(this.audios[name + cc].paused == false) {
        cc++;
      }
      if (this.audios[name + cc]) this.audios[name + cc].play();
    } catch(err) {}
  }
}