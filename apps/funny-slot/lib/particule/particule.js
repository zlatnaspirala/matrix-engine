//OPEN SOURCE LICNECE


function PARTICLE_FONTAN (  GO , PARAMETERS ){

var FONTAN = this; 
FONTAN.GO = GO;
FONTAN.GO_POS = GO.POSITION;
FONTAN.ANIMATION_ID = GO.ANIMATION.ID;
FONTAN.particles = {},
FONTAN.particleIndex = 0,


// LOAD DEFAULT VALUES 
FONTAN.settings = {
density: 10,
particleSize: 22,
startingX: function(){return FONTAN.GO_POS.X()},
startingY: function(){return FONTAN.GO_POS.Y()},
gravity: 0,
gravity_CIKLUS : 155 , 
gravity_index : 1,
bounceLevel: window.innerHeight    * 0.75
};


if (typeof PARAMETERS != 'undefined') {
	// polymorf here in future 
	
	
	
	
}



FONTAN.Particle = function () {
this.x = FONTAN.settings.startingX();
this.y = FONTAN.settings.startingY();
this.vx = Math.random() * 10 - 5;
this.vy = Math.random() * 10 - 5; 
if (Math.random() > 0.98) {this.vy *= 3;}
FONTAN.particleIndex ++;
FONTAN.particles[FONTAN.particleIndex] = this;
this.id = FONTAN.particleIndex;
this.life = 0;
this.maxLife = Math.random() * 120;
};

FONTAN.Particle.prototype.draw = function(s) {
this.x += this.vx;
this.y += this.vy;
if (this.y > FONTAN.settings.bounceLevel) {
this.vy *= -0.6;
this.vx *= 0.75;
this.y = FONTAN.settings.bounceLevel;
}
this.vy += FONTAN.settings.gravity;
this.life++;
if (this.life >= this.maxLife) {
delete FONTAN.particles[this.id];
}

//s.fillRect(this.x, this.y, FONTAN.settings.particleSize, FONTAN.settings.particleSize)
s.drawImage(  window["f_"+FONTAN.ANIMATION_ID +FONTAN.GO.ANIMATION.CURRENT_FRAME]  , this.x, this.y, FONTAN.settings.particleSize, FONTAN.settings.particleSize)


};

FONTAN.DRAW = function(s) {
// Draw the particles
for (var i = 0; i < FONTAN.settings.density; i++) {
new FONTAN.Particle();
}

for (var i in FONTAN.particles) {
FONTAN.particles[i].draw(s);
}

if (  FONTAN.settings.gravity_index > FONTAN.settings.gravity_CIKLUS ) {

FONTAN.settings.gravity_index = 1;
FONTAN.settings.gravity = 0;

//setTimeout(function() {FONTAN.settings.gravity = 1} , 1000); ORI
setTimeout(function() {FONTAN.settings.gravity = 0} , 1000);


}
else {
FONTAN.settings.gravity_index++
}
};

}