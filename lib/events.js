import App from '../program/manifest';
import {world} from "./matrix-world";
import {LOG, isMobile} from './utility';

export var SYS = {};
SYS.MOUSE = {
	x: 0,
	y: 0,
	LAST_POSITION: {
		x: 0,
		y: 0
	},
	PRESS: false,
	BUTTON_PRESSED: '',
	ON_LEFT_BTN_PRESSED: function() {},
	ON_RIGHT_BTN_PRESSED: function() {},
	ON_MID_BTN_PRESSED: function() {},
	MOUSE_MOVING: false
};
SYS.DEBUG = new LOG();
// from 1.9.44
App.sys = SYS;

export function EVENTS(canvas) {
	var ROOT_EVENTS = this;
	// Mobile device
	if(isMobile() == true) {
		canvas.addEventListener('touchstart', function(e) {
			e.preventDefault();
			var touchList = e.changedTouches;
			SYS.MOUSE.PRESS = true;
			SYS.MOUSE.x = touchList[0].pageX;
			SYS.MOUSE.y = touchList[0].pageY;
			ROOT_EVENTS.CALCULATE_TOUCH_OR_CLICK();
			ROOT_EVENTS.CALCULATE_TOUCH_DOWN_OR_MOUSE_DOWN(e, SYS.MOUSE);
			ROOT_EVENTS.multiTouch(e, touchList);
		},
			{passive: false}
		);

		canvas.addEventListener('touchend', function(e) {
			e.preventDefault();
			var touchList = e.changedTouches;
			SYS.MOUSE.PRESS = false;
			SYS.MOUSE.x = touchList[0].pageX;
			SYS.MOUSE.y = touchList[0].pageY;
			ROOT_EVENTS.CALCULATE_TOUCH_UP_OR_MOUSE_UP();
		},
			{passive: false}
		);

		canvas.addEventListener('touchcancel', function(e) {
			e.preventDefault();
			var touchList = e.changedTouches;
			SYS.MOUSE.PRESS = false;
			SYS.MOUSE.x = touchList[0].pageX;
			SYS.MOUSE.y = touchList[0].pageY;
			ROOT_EVENTS.CALCULATE_TOUCH_UP_OR_MOUSE_UP();
		},
			{passive: false}
		);

		canvas.addEventListener('touchmove', function(e) {
			e.preventDefault();
			var touchList = e.changedTouches;
			//SYS.MOUSE.MOUSE_MOVING = true;
			//SYS.MOUSE.PRESS = true;
			SYS.MOUSE.x = touchList[0].pageX;
			SYS.MOUSE.y = touchList[0].pageY;
			ROOT_EVENTS.CALCULATE_TOUCH_MOVE_OR_MOUSE_MOVE({x: touchList[0].pageX, y: touchList[0].pageY});
		},
			{passive: false}
		);
	} else {
		//D esktop device
		canvas.addEventListener('click', function(e) {
			//SYS.MOUSE.PRESS = true;
			SYS.MOUSE.x = e.layerX;
			SYS.MOUSE.y = e.layerY;
			ROOT_EVENTS.CALCULATE_TOUCH_OR_CLICK();
			SYS.DEBUG.LOG('SYS : CLICK EVENT ' + canvas);
		},
			{passive: true}
		);

		canvas.addEventListener('mouseup', function(e) {
			SYS.MOUSE.PRESS = false;
			SYS.MOUSE.BUTTON_PRESSED = null;
			SYS.MOUSE.x = e.layerX;
			SYS.MOUSE.y = e.layerY;
			ROOT_EVENTS.CALCULATE_TOUCH_UP_OR_MOUSE_UP();
		},
			{passive: true}
		);

		canvas.onmousemove = function(e) {
			SYS.MOUSE.MOUSE_MOVING = true;
			SYS.MOUSE.x = e.layerX;
			SYS.MOUSE.y = e.layerY;
			ROOT_EVENTS.CALCULATE_TOUCH_MOVE_OR_MOUSE_MOVE({x: e.layerX, y: e.layerY});
		};

		canvas.onmousedown = function(e) {
			SYS.MOUSE.PRESS = true;

			if(e.which == 3) {
				SYS.MOUSE.BUTTON_PRESSED = 'RIGHT';
				SYS.MOUSE.ON_RIGHT_BTN_PRESSED();
				SYS.DEBUG.LOG('Right button clicked');
			} else if(e.which == 2) {
				SYS.MOUSE.BUTTON_PRESSED = 'MID';
				SYS.MOUSE.ON_MID_BTN_PRESSED();
				SYS.DEBUG.LOG('Mid button clicked');
			} else if(e.which == 1) {
				SYS.MOUSE.BUTTON_PRESSED = 'LEFT';
				SYS.MOUSE.ON_LEFT_BTN_PRESSED();
				SYS.DEBUG.LOG('Left button clicked');
			}

			SYS.MOUSE.x = e.layerX;
			SYS.MOUSE.y = e.layerY;

			ROOT_EVENTS.CALCULATE_TOUCH_DOWN_OR_MOUSE_DOWN(e, SYS.MOUSE);
		};

		//console.log("This is PC desktop device.");
	}

	window.addEventListener('resize', function(e) {
		if(App.resize.canvas == "false" || App.resize.canvas == false) {return;}
		if(App.resize.canvas == "full-screen") {
			//canvas.width =  window.innerHeight * App.resize.aspectRatio;
			App.canvas.width = window.innerWidth;
			App.canvas.height = window.innerHeight;
			// SYS.DEBUG.LOG('SYS: fullscreen diametric resize is active. ' + world);
		} else {
			App.canvas.width = window.innerHeight * App.resize.aspectRatio;
			App.canvas.height = window.innerHeight;
			SYS.DEBUG.LOG('SYS: aspect ration resize is active. ' + world);
		}
		if(App.resize.reloadWorldOnResize == true && window.resizeGlPort !== 'undefined') {
			window.resizeGlPort();
		}
	},
		{passive: true}
	);

	// Calculate touch or click event
	this.CALCULATE_TOUCH_OR_CLICK = function() {
		// console.log('TEST EVENTS CALCULATE_TOUCH_OR_CLICK')
		// SYS.DEBUG.LOG('EVENT: MOUSE/TOUCH CLICK');
	};

	// Calculate touch or click event
	this.multiTouch = function(e) {
		SYS.DEBUG.LOG('EVENT: MOUSE/TOUCH CLICK', e);
	};

	this.virtualUpDownScene = 0;
	this.virtualLeftRightScene = 0;

	// CALCULATE MOUSE MOVE OR TOUCH MOVE
	this.CALCULATE_TOUCH_MOVE_OR_MOUSE_MOVE = function(e) {
		var center_x = window.innerWidth / 2;
		var center_y = window.innerHeight / 2;
		SYS.MOUSE.x = e.x - center_x;
		SYS.MOUSE.y = e.y - center_y;

		//check to make sure there is data to compare against
		if(typeof SYS.MOUSE.LAST_POSITION.x != 'undefined') {
			//get the change from last position to this position
			var deltaX = SYS.MOUSE.LAST_POSITION.x - SYS.MOUSE.x,
				deltaY = SYS.MOUSE.LAST_POSITION.y - SYS.MOUSE.y;
		}

		if(App.camera.SceneController === true && keyboardPress.getKeyStatus(16) ||
			App.camera.FirstPersonController === true) {
			// console.log('works for both now')
			camera.pitchRate += deltaY * 10;
			camera.yawRate += deltaX * 1;

			if(SYS.MOUSE.x < App.camera.edgeMarginValue - center_x) {
				App.camera.leftEdge = true;
				SYS.DEBUG.LOG("Mouse on edge!");
			} else {
				App.camera.leftEdge = false;
			}

			if(SYS.MOUSE.x > center_x - App.camera.edgeMarginValue) {
				App.camera.rightEdge = true;
				SYS.DEBUG.LOG("Mouse on edge!");
			} else {
				App.camera.rightEdge = false;
			}
		}

		if(App.camera.SceneController === true && SYS.MOUSE.BUTTON_PRESSED == 'MID') {
			if(Math.abs(deltaX) > Math.abs(deltaY) && deltaX > 0) {
				// left
				if(SYS.MOUSE.LAST_POSITION.x < SYS.MOUSE.x) {
					this.virtualLeftRightScene -= App.camera.sceneControllerDragAmp;
				} else if(SYS.MOUSE.LAST_POSITION.x > SYS.MOUSE.x) {
					this.virtualLeftRightScene += App.camera.sceneControllerDragAmp;
				}
			} else if(Math.abs(deltaX) > Math.abs(deltaY) && deltaX < 0) {
				// right
				if(SYS.MOUSE.LAST_POSITION.x < SYS.MOUSE.x) {
					this.virtualLeftRightScene -= App.camera.sceneControllerDragAmp;
				} else if(SYS.MOUSE.LAST_POSITION.x > SYS.MOUSE.x) {
					this.virtualLeftRightScene += App.camera.sceneControllerDragAmp;
				}
			} else if(Math.abs(deltaY) > Math.abs(deltaX) && deltaY > 0) {
				//up
				if(SYS.MOUSE.LAST_POSITION.y < SYS.MOUSE.y) {
					this.virtualUpDownScene += App.camera.sceneControllerDragAmp;
				} else if(SYS.MOUSE.LAST_POSITION.y > SYS.MOUSE.y) {
					this.virtualUpDownScene -= App.camera.sceneControllerDragAmp;
				}
			} else if(Math.abs(deltaY) > Math.abs(deltaX) && deltaY < 0) {
				//down
				if(SYS.MOUSE.LAST_POSITION.y < SYS.MOUSE.y) {
					this.virtualUpDownScene += App.camera.sceneControllerDragAmp;
				} else if(SYS.MOUSE.LAST_POSITION.y > SYS.MOUSE.y) {
					this.virtualUpDownScene -= App.camera.sceneControllerDragAmp;
				}
			}
			camera.yPos = this.virtualUpDownScene;
			camera.xPos = this.virtualLeftRightScene;
		}

		// Set the new last position to the current for next time.
		(SYS.MOUSE.LAST_POSITION.x = SYS.MOUSE.x), (SYS.MOUSE.LAST_POSITION.y = SYS.MOUSE.y);
		//SYS.DEBUG.LOG(" EVENT : MOUSE/TOUCH MOVE ");
	};

	// CALCULATE_TOUCH_UP_OR_MOUSE_UP
	this.CALCULATE_TOUCH_UP_OR_MOUSE_UP = function() {
		SYS.DEBUG.LOG(' EVENT : MOUSE/TOUCH UP ');
	};

	this.CALCULATE_TOUCH_DOWN_OR_MOUSE_DOWN = function(ev, m) {
		SYS.DEBUG.LOG(' EVENT : MOUSE/TOUCH DOWN ');
	};
}

export function defineKeyBoardObject() {
	var globKeyPressObj = new Object();

	/* Constructor for the global mouse location     */
	globKeyPressObj.keyArr = new Array();

	document.onkeydown = function(e) {
		// console.log('......')
		globKeyPressObj.handleKeyDown(e);
	};
	document.onkeyup = function(e) {
		globKeyPressObj.handleKeyUp(e);
	};

	/**
	 * @description
	 * Getter for a key status.
	 **/
	globKeyPressObj.getKeyStatus = function(keyCode) {
		return this.keyArr[keyCode];
	};

	/**
	 * @description 
	 * Setter for a key status.
	 **/
	globKeyPressObj.setKeyStatus = function(keyCode, status) {
		// console.log("keycode", keyCode)
		this.keyArr[keyCode] = status;
	};

	/**
	 * @description
	 * Key Down and Up handlers.
	 * Optimal dispatch event: 'hit.KeyDown'
	 **/
	globKeyPressObj.handleKeyDown = function(evt) {
		evt = evt ? evt : window.event ? window.event : '';
		// console.log("'LOG KEY CODE ", evt.keyCode);
		let emitKeyDown = new CustomEvent('hit.keyDown', {
			detail: {
				keyCode: evt.keyCode,
				origin: evt
			}
		});
		dispatchEvent(emitKeyDown);
		this.setKeyStatus(evt.keyCode, true);
	};

	globKeyPressObj.handleKeyUp = function(evt) {
		evt = evt ? evt : window.event ? window.event : '';
		let emitKeyUp = new CustomEvent('hit.keyUp', {
			detail: {
				keyCode: evt.keyCode,
				origin: evt
			}
		});
		dispatchEvent(emitKeyUp);
		this.setKeyStatus(evt.keyCode, false);
	};

	/* Destructor */
	globKeyPressObj.destroy = function() {
		printLog('Destroy Key Press object');
		document.onkeydown = null;
		document.onkeyup = null;
		delete this.keyArr;
		delete this;
	};

	return globKeyPressObj;
}

let wheelBLock = false;

window.onwheel = (evt) => {
	let scale = evt.deltaY * -0.01;
	// console.log(evt)
	// console.log(evt.wheelDelta)
	// console.log(evt.wheelDeltaX)
	// console.log(evt.wheelDeltaY)
	// console.log(evt.which)

	if(wheelBLock === false) {
		wheelBLock = true;
		if(evt.wheelDelta > 0) camera.speed = App.camera.speedAmp * 0.1;
		if(evt.wheelDelta < 0) camera.speed = -App.camera.speedAmp * 0.1;
		setTimeout(() => {
			wheelBLock = false;
			camera.speed = 0;
		}, 50);
	}

};

export var camera = {};

/* Set defaults       */
camera.roll = 0;
camera.rollRate = 0;
camera.rallAmp = 0.05;
camera.fly = true;
camera.pitch = 0;
camera.pitchRate = 0;
camera.yaw = 0;
camera.yawRate = 0;
camera.xPos = 0;
camera.yPos = 0;
camera.zPos = 0;
camera.speed = 0;
camera.yawAmp = 0.077;
camera.pitchAmp = 0.017;
camera.virtualJumpY = 2;
camera.virtualJumpActive = false;

camera.moveLeft = false;
camera.preventSpeedZero = false;

export var keyboardPress = defineKeyBoardObject();

// For FirstPersonController
camera.setCamera = function(object) {
	if(keyboardPress.getKeyStatus(65) || App.camera.leftEdge == true) {
		/* A */
		camera.yawRate = App.camera.yawRate;
		if(App.camera.leftEdge == true) {
			camera.yawRate = App.camera.yawRateOnEdge;
		}
	} else if(keyboardPress.getKeyStatus(68) || App.camera.rightEdge == true) {
		/* D */
		camera.yawRate = -App.camera.yawRate;
		if(App.camera.rightEdge == true) {
			camera.yawRate = -App.camera.yawRateOnEdge;
		}
	} else if(keyboardPress.getKeyStatus(32)) {
		/* Right Key or SPACE */
		if(this.virtualJumpActive != true) {
			this.virtualJumpActive = true;
		}
	}

	if(keyboardPress.getKeyStatus(37)) {
		/* Left Key  || App.camera.leftEdge == true*/
		camera.moveLeft = true;
		camera.speed = App.camera.speedAmp;
	} else if(keyboardPress.getKeyStatus(39)) {
		/* Right Key || App.camera.rightEdge == true */
		camera.moveRight = true;
		camera.speed = App.camera.speedAmp;
	} else if(keyboardPress.getKeyStatus(38) || keyboardPress.getKeyStatus(87)) {
		/* Up Key or W */
		camera.speed = App.camera.speedAmp;
	} else if(keyboardPress.getKeyStatus(40) || keyboardPress.getKeyStatus(83)) {
		/* Down Key or S */
		camera.speed = -App.camera.speedAmp;
	} else {
		// if(camera.preventSpeedZero == false) camera.speed = 0;
	}

	/* Calculate yaw, pitch and roll(x,y,z) */
	if(camera.speed != 0 && camera.moveLeft == false && camera.moveRight == false) {
		camera.xPos -= Math.sin(degToRad(camera.yaw)) * camera.speed;
		if(camera.fly == true) {
			// Fly regime
			camera.yPos += Math.sin(degToRad(camera.pitch)) * camera.speed;
		} else {
			// usually for fpshooter regime
			// camera.yPos = this.virtualJumpY;
			// camera.yPos = 0;
			// leave it zero by default lets dirigent from top
		}
		camera.zPos -= Math.cos(degToRad(camera.yaw)) * camera.speed;
	} else if(camera.moveLeft == true) {
		// by side move left
		camera.xPos -= Math.sin(degToRad(camera.yaw + 90)) * camera.speed;
		camera.zPos -= Math.cos(degToRad(camera.yaw + 90)) * camera.speed;
	} else if(camera.moveRight == true) {
		// by side move rigth
		camera.xPos -= Math.sin(degToRad(camera.yaw - 90)) * camera.speed;
		camera.zPos -= Math.cos(degToRad(camera.yaw - 90)) * camera.speed;
	}

	camera.yaw += camera.yawRate * camera.yawAmp;
	camera.pitch += camera.pitchRate * camera.pitchAmp;

	mat4.rotate(object.mvMatrix, object.mvMatrix, degToRad(-camera.pitch), [1, 0, 0]);
	mat4.rotate(object.mvMatrix, object.mvMatrix, degToRad(-camera.yaw), [0, 1, 0]);
	mat4.translate(object.mvMatrix, object.mvMatrix, [-camera.xPos, -camera.yPos, -camera.zPos]);

	camera.yawRate = 0;
	camera.pitchRate = 0;
	// update
	camera.moveLeft = false;
	camera.moveRight = false;
	if(camera.preventSpeedZero == false) camera.speed = 0;
};

// For sceneController
camera.setSceneCamera = function(object) {
	/* Left Key  or A */
	if(keyboardPress.getKeyStatus(37) || keyboardPress.getKeyStatus(65) || App.camera.leftEdge == true) {
		camera.yawRate = App.camera.sceneControllerWASDKeysAmp;
		if(App.camera.leftEdge == true) camera.yawRate = App.camera.sceneControllerEdgeCameraYawRate;
	} else if(keyboardPress.getKeyStatus(39) || keyboardPress.getKeyStatus(68) || App.camera.rightEdge == true) {
		camera.yawRate = -App.camera.sceneControllerWASDKeysAmp;
		if(App.camera.rightEdge == true) camera.yawRate = - App.camera.sceneControllerEdgeCameraYawRate;
	} else {
		// camera.yawRate = 0;
	}

	/* Up Key or W */
	if(keyboardPress.getKeyStatus(38) || keyboardPress.getKeyStatus(87)) {
		camera.speed = App.camera.speedAmp;
	} else if(keyboardPress.getKeyStatus(40) || keyboardPress.getKeyStatus(83)) {
		/* Down Key or S */
		camera.speed = -App.camera.speedAmp;
	} else {
		// diff
		if(!keyboardPress.getKeyStatus(16)) camera.speed = 0;
	}

	/* Calculate yaw, pitch and roll(x,y,z) */
	if(camera.speed != 0) {
		camera.xPos -= Math.sin(degToRad(camera.yaw)) * camera.speed;
		// ?
		camera.yPos += Math.sin(degToRad(camera.pitch)) * camera.speed;
		camera.zPos -= Math.cos(degToRad(camera.yaw)) * camera.speed;
	}
	camera.yaw += camera.yawRate * camera.yawAmp;
	camera.pitch += camera.pitchRate * camera.pitchAmp;

	mat4.rotate(object.mvMatrix, object.mvMatrix, degToRad(-camera.pitch), [1, 0, 0]);
	mat4.rotate(object.mvMatrix, object.mvMatrix, degToRad(-camera.yaw), [0, 1, 0]);
	mat4.translate(object.mvMatrix, object.mvMatrix, [-camera.xPos, -camera.yPos, -camera.zPos]);

	camera.yawRate = 0;
	camera.pitchRate = 0;
};

let addBtn = document.querySelector('.button1');
let regularBtn = document.querySelector('.button2');

regularBtn.addEventListener('click', () => {
	regularBtn.parentElement.classList.add('hideMe')
	setTimeout(() => {
		addBtn.style.display = 'none';
		regularBtn.style.display = 'none';
	}, 950)
});

// Track web app install by user
document.addEventListener('appinstalled', (event) => {
	console.log('PWA app installed by user! Hurray...');
});

if(App.pwa.addToHomePage === true) {
	/**
	 * @description
	 * If we dont reach this scope then we have installed pwa.
	 */
	let deferredPrompt;

	window.addEventListener('beforeinstallprompt', (e) => {
		// Prevent Chrome 67 and earlier from automatically showing the prompt
		e.preventDefault();
		// Stash the event so it can be triggered later.
		deferredPrompt = e;

		addBtn.style.display = 'block';
		regularBtn.style.display = 'block';

		addBtn.addEventListener('click', () => {
			// hide our user interface that shows our A2HS button
			addBtn.style.display = 'none';
			// Show the prompt
			deferredPrompt.prompt();
			// Wait for the user to respond to the prompt
			deferredPrompt.userChoice.then((choiceResult) => {
				if(choiceResult.outcome === 'accepted') {
					console.log('User accepted the A2HS prompt');
					addBtn.style.display = 'none';
					regularBtn.style.display = 'none';
				} else {
					console.log('User dismissed the A2HS prompt');
					addBtn.style.display = 'none';
				}
				deferredPrompt = null;
			});
		});
	});
} else {
	try {
		addBtn.style.display = 'none';
		regularBtn.style.display = 'none';
	} catch(err) {}
}
