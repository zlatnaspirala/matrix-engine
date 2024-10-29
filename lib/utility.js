/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */

'use strict';

import App from '../program/manifest';
import {SYS} from './events';

// Array.prototype.swap = function (x,y) {
window.swap = function(x, y, myArray) {
	var b = myArray[x];
	myArray[x] = myArray[y];
	myArray[y] = b;
	return myArray;
};

/**
 * @description
 * Global modifier for:
 * degToRed, DETECTBROWSER, loadImage
 */
window.degToRad = function(degrees) {
	return (degrees * Math.PI) / 180;
};

export function radToDeg(r) {
	var pi = Math.PI;
	return r * (180 / pi);
}

export function createAppEvent(name, myDetails) {
	return new CustomEvent(name, {
		detail: {
			eventName: name,
			data: myDetails,
		},
		bubbles: true,
	});
}

export const HeaderTypes = {
	textPlan: "text/plain",
	html: "text/html",
	jpeg: "image/jpeg",
	png: "image/png",
	mpeg: "audio/mpeg",
	ogg: "audio/ogg",
	audio: "audio/*",
	mp4: "video/mp4",
	app: "application/*",
	appJson: "application/json",
	appJS: "application/javascript",
	appECMA: "application/ecmascript",
	appOctetSteam: "application/octet-stream",
};

export const jsonHeaders = new Headers({
	"Content-Type": "application/json",
	"Accept": "application/json",
});

export const htmlHeader = new Headers({
	"Content-Type": "text/html",
	"Accept": "text/plain",
});

window.DETECTBROWSER = function() {
	var HREFF,
		HREFTXT = 'unknown';
	this.NAVIGATOR = navigator.userAgent;
	var NAV = navigator.userAgent;
	var navMacintosh, gecko, navIpad, operatablet, navIphone, navFirefox, navChrome, navOpera, navSafari, navandroid, mobile, navMozilla;
	gecko = NAV.match(/gecko/gi);
	navOpera = NAV.match(/Opera|OPR\//) ? true : false;
	operatablet = NAV.match(/Tablet/gi);
	navIpad = NAV.match(/ipad/gi);
	navIphone = NAV.match(/iphone/gi);
	navFirefox = NAV.match(/Firefox/gi);
	navMozilla = NAV.match(/mozilla/gi);
	navChrome = NAV.match(/Chrome/gi);
	navSafari = NAV.match(/safari/gi);
	navandroid = NAV.match(/android/gi);
	// mobile = NAV.match(/mobile/gi);
	navMacintosh = NAV.match(/Macintosh/gi);

	// eslint-disable-next-line no-undef
	var TYPEOFANDROID = 0;
	window['NOMOBILE'] = 0;

	// eslint-disable-next-line no-redeclare
	var mobile = /iphone|ipad|ipod|android|blackberry|mini|windows\sce|palm/i.test(navigator.userAgent.toLowerCase());
	if(mobile) {
		var userAgent = navigator.userAgent.toLowerCase();
		if(userAgent.search('android') > -1 && userAgent.search('mobile') > -1) {
			console.log('ANDROID MOBILE');
		} else if(userAgent.search('android') > -1 && !(userAgent.search('mobile') > -1)) {
			console.log(' ANDROID TABLET ');
			TYPEOFANDROID = 1;
		}
	} else {
		// eslint-disable-next-line no-undef
		mobile = 1;
	}
	// FIREFOX za android
	if(navFirefox && navandroid && TYPEOFANDROID == 0) {
		HREFF = '#';
		HREFTXT = 'mobile_firefox_android';
	}
	// FIREFOX za android T
	if(navFirefox && navandroid && TYPEOFANDROID == 1) {
		HREFF = '#';
		HREFTXT = 'mobile_firefox_android_tablet';
	}
	// OPERA ZA ANDROID
	if(navOpera && navandroid) {
		HREFF = '#';
		HREFTXT = 'opera_mobile_android';
	} // provera
	// OPERA ZA ANDROID TABLET
	if(navOpera && navandroid && operatablet) {
		HREFF = '#';
		HREFTXT = 'opera_mobile_android_tablet';
	} // provera
	// safari mobile za IPHONE - i safari mobile za IPAD i CHROME za IPAD
	if(navSafari) {
		var Iphonesafari = NAV.match(/iphone/gi);

		if(Iphonesafari) {
			HREFF = '#';
			HREFTXT = 'safari_mobile_iphone';
		} else if(navIpad) {
			HREFF = '#';
			HREFTXT = 'mobile_safari_chrome_ipad';
		} else if(navMacintosh) {
			HREFF = '#';
			HREFTXT = 'desktop_safari';
		} //Macintosh
		else if(navandroid) {
			HREFF = '#';
			HREFTXT = 'android_native';
		}
	}
	// TEST CHROME
	if(navChrome && navSafari && navMozilla && TYPEOFANDROID == 1) {
		HREFF = '#';
		HREFTXT = 'mobile_chrome_android_tablet';
	}
	if(navChrome && navSafari && navMozilla && TYPEOFANDROID == 0) {
		HREFF = '#';
		HREFTXT = 'mobile_chrome_android';
	}
	if(navChrome && TYPEOFANDROID == 0) {
		HREFF = '#';
		HREFTXT = 'chrome_browser';
	}
	if(navMozilla && mobile == 1 && gecko && navFirefox) {
		HREFF = '#';
		HREFTXT = 'firefox_desktop';
	}
	if(navOpera && TYPEOFANDROID == 0 && !mobile) {
		HREFF = '#';
		HREFTXT = 'opera_desktop';
	}

	this.NAME = HREFTXT;
	this.NOMOBILE = mobile;
};

export var supportsTouch = 'ontouchstart' in window || navigator.msMaxTouchPoints;

export function isMobile() {
	if(supportsTouch == true) return true;
	const toMatch = [/Android/i, /webOS/i, /iPhone/i, /iPad/i, /iPod/i, /BlackBerry/i, /Windows Phone/i];
	return toMatch.some(toMatchItem => {
		return navigator.userAgent.match(toMatchItem);
	});
};

export const loadImage = function(url, onload) {
	var img = new Image();
	img.crossOrigin = 'anonymous';
	img.src = url;
	img.onload = function() {
		onload(img);
	};
	return img;
};

window.BROWSER = new window.DETECTBROWSER();

/**
 * @description LOGGER
 */
export function LOG() {

	this.ENABLE = false;

	this.LOG = function(data) {
		if(this.ENABLE == true) console.log('%c' + data, 'background: #333; color: lime')
	}

	this.WARNING = function(data) {
		if(this.ENABLE == true) console.log('%c Warning : ' + data, 'background: #333; color: yellow')
	}

	this.CRITICAL = function(data) {
		if(this.ENABLE == true) console.log('%c Critical : ' + data, 'background: #333; color: red')
	};

	this.NETWORK_LOG = function(data) {
		if(this.ENABLE == true) {
			console.log('%c Network view : ' + data, 'background: #333; color: #a7afaf');
		}
	};
}

/**
 * @description
 * Load script in runtime.
 */
export var scriptManager = {
	SCRIPT_ID: 0,
	LOAD: function addScript(src, id, type, parent, callback) {
		var s = document.createElement('script');
		s.onload = function() {
			// console.log('Script id loaded [src]: ' + this.src);
		};
		if(typeof type !== 'undefined') {
			s.setAttribute('type', type);
			s.innerHTML = src;
		} else {s.setAttribute('src', src)}
		if(typeof id !== 'undefined') {s.setAttribute('id', id)}
		if(typeof parent !== 'undefined') {
			document.getElementById(parent).appendChild(s);
			if(typeof callback != 'undefined') callback();
		} else {
			document.body.appendChild(s);
			if(typeof callback != 'undefined') callback();
		}
	},
	loadModule: function addScript(src, id, type, parent) {
		console.log('Script id load called ');
		var s = document.createElement('script');
		s.onload = function() {
			scriptManager.SCRIPT_ID++;
		};

		if(typeof type === 'undefined') {
			s.setAttribute('type', 'module');
			s.setAttribute('src', src);
		} else {
			s.setAttribute('type', type);
			s.innerHTML = src;
		}

		s.setAttribute('src', src);
		if(typeof id !== 'undefined') {
			s.setAttribute('id', id);
		}

		if(typeof parent !== 'undefined') {
			document.getElementById(parent).appendChild(s);
		} else {
			document.body.appendChild(s);
		}
	},
	loadGLSL: function(src) {
		return new Promise((resolve) => {
			fetch(src).then((data) => {
				resolve(data.text())
			})
		})
	}
};

// GET PULSE VALUES IN REAL TIME
export function OSCILLATOR(min, max, step) {
	if((typeof min === 'string' || typeof min === 'number') && (typeof max === 'string' || typeof max === 'number') && (typeof step === 'string' || typeof step === 'number')) {
		var ROOT = this;
		this.min = parseFloat(min);
		this.max = parseFloat(max);
		this.step = parseFloat(step);
		this.value_ = parseFloat(min);
		this.status = 0;
		this.on_maximum_value = function() {};
		this.on_minimum_value = function() {};
		this.UPDATE = function(STATUS_) {
			if(STATUS_ === undefined) {
				if(this.status == 0 && this.value_ < this.max) {
					this.value_ = this.value_ + this.step;
					if(this.value_ >= this.max) {
						this.value_ = this.max;
						this.status = 1;
						ROOT.on_maximum_value();
					}
					return this.value_;
				} else if(this.status == 1 && this.value_ > this.min) {
					this.value_ = this.value_ - this.step;
					if(this.value_ <= this.min) {
						this.value_ = this.min;
						this.status = 0;
						ROOT.on_minimum_value();
					}
					return this.value_;
				}
			} else {
				return this.value_;
			}
		};
	} else {
		SYS.DEBUG.WARNING(
			"SYS : warning for procedure 'SYS.MATH.OSCILLATOR' Desciption : Replace object with string or number, min >> " +
			typeof min +
			' and max >>' +
			typeof max +
			' and step >>' +
			typeof step +
			' << must be string or number.'
		);
	}
}

export function SWITCHER() {
	var ROOT = this;
	ROOT.VALUE = 1;
	ROOT.GET = function() {
		ROOT.VALUE = ROOT.VALUE * -1;
		return ROOT.VALUE;
	};
}

export function ORBIT(cx, cy, angle, p) {
	var s = Math.sin(angle);
	var c = Math.cos(angle);
	p.x -= cx;
	p.y -= cy;
	var xnew = p.x * c - p.y * s;
	var ynew = p.x * s + p.y * c;
	p.x = xnew + cx;
	p.y = ynew + cy;
	return p;
}

export function ORBIT_FROM_ARRAY(cx, cy, angle, p, byIndexs) {
	var s = Math.sin(angle);
	var c = Math.cos(angle);
	p[byIndexs[0]] -= cx;
	p[byIndexs[1]] -= cy;
	var xnew = p[byIndexs[0]] * c - p[byIndexs[1]] * s;
	var ynew = p[byIndexs[0]] * s + p[byIndexs[1]] * c;
	p[byIndexs[0]] = xnew + cx;
	p[byIndexs[1]] = ynew + cy;
	return p;
}

export var E = function(id) {return document.getElementById(id)};
export var byId = function(id) {return document.getElementById(id)};

export function randomFloatFromTo(min, max) {return Math.random() * (max - min) + min;}

// RANDOM INT FROM-TO
export function randomIntFromTo(min, max) {
	if(typeof min === 'object' || typeof max === 'object') {
		SYS.DEBUG.WARNING(
			"SYS : warning for procedure 'SYS.MATH.RANDOM_INT_FROM_TO' Desciption : Replace object with string , this >> " + typeof min + ' and ' + typeof min + ' << must be string or number.'
		);
	} else if(typeof min === 'undefined' || typeof max === 'undefined') {
		SYS.DEBUG.WARNING(
			"SYS : warning for procedure 'SYS.MATH.RANDOM_INT_FROM_TO' Desciption : arguments (min, max) cant be undefined , this >> " + typeof min + ' and ' + typeof min + ' << must be string or number.'
		);
	} else {
		return Math.floor(Math.random() * (max - min + 1) + min);
	}
}

export var QueryString = (function() {
	// This function is anonymous, is executed immediately and
	// the return value is assigned to QueryString!
	var query_string = {};
	var query = window.location.search.substring(1);
	var vars = query.split('&');
	for(var i = 0;i < vars.length;i++) {
		var pair = vars[i].split('=');
		// If first entry with this name
		if(typeof query_string[pair[0]] === 'undefined') {
			query_string[pair[0]] = decodeURIComponent(pair[1]);
			// If second entry with this name
		} else if(typeof query_string[pair[0]] === 'string') {
			var arr = [query_string[pair[0]], decodeURIComponent(pair[1])];
			query_string[pair[0]] = arr;
			// If third or later entry with this name
		} else {
			query_string[pair[0]].push(decodeURIComponent(pair[1]));
		}
	}
	return query_string;
})();

App.audioSystem.Assets = {};

App.audioSystem.createVideoAsset = function(name_, path_) {
	return new Promise((resolve, reject) => {
		var videoAudioAsset = {};
		videoAudioAsset.video = document.createElement('video');
		videoAudioAsset.video.controls = true;
		videoAudioAsset.video.autoplay = true;
		E('HOLDER_STREAMS').appendChild(videoAudioAsset.video);
		videoAudioAsset.video.setAttribute('playsInline', true);
		videoAudioAsset.video.setAttribute('src', 'res/videos/' + path_);
		try {
			window.AudioContext = window.AudioContext || window.AudioContext;
			videoAudioAsset.context = new AudioContext();
		} catch(e) {
			alert('Web Audio API is not supported in this browser');
			reject(e);
		}

		videoAudioAsset.gainNode = videoAudioAsset.context.createGain();
		// Change Gain Value to test
		videoAudioAsset.gainNode.gain.value = 1;
		videoAudioAsset.filter = videoAudioAsset.context.createBiquadFilter();
		// Change Filter type to test // ENUM from UTILITY
		// videoAudioAsset.filter.type = 2;
		// Change frequency to test
		videoAudioAsset.filter.frequency.value = 5040;
		if(typeof name_ !== 'undefined' && typeof name_ === 'string') {
			App.audioSystem.Assets[name_] = videoAudioAsset;
		} else {
			console.warn('No name argument in createVideoAsset call.');
		}
		var promise = videoAudioAsset.video.play();
		if(promise !== undefined) {
			promise.then((_) => {
				console.info('Autoplay started.');
				resolve(true);
			})
				.catch((error) => {
					console.warn('No autoplay:', error);
					reject();
				});
		}
	});
};

App.audioSystem.createMusicAsset = function(name_, path_) {
	return new Promise((resolve, reject) => {
		var videoAudioAsset = {};
		videoAudioAsset.video = document.createElement('audio');
		videoAudioAsset.video.controls = true;
		videoAudioAsset.video.autoplay = true;
		E('HOLDER_STREAMS').appendChild(videoAudioAsset.video);
		videoAudioAsset.video.setAttribute('playsInline', true);
		videoAudioAsset.video.setAttribute('src', 'res/music/' + path_);
		try {
			window.AudioContext = window.AudioContext || window.AudioContext;
			videoAudioAsset.context = new AudioContext();
		} catch(e) {
			alert('Web Audio API is not supported in this browser');
		}
		videoAudioAsset.gainNode = videoAudioAsset.context.createGain();
		videoAudioAsset.gainNode.gain.value = 1;
		videoAudioAsset.filter = videoAudioAsset.context.createBiquadFilter();
		videoAudioAsset.filter.frequency.value = 5040;
		if(typeof name_ !== 'undefined' && typeof name_ === 'string') {
			App.audioSystem.Assets[name_] = videoAudioAsset;
		} else {
			console.warn('No name argument in createVideoAsset call.');
		}

		var promise = videoAudioAsset.video.play();
		if(promise !== undefined) {
			promise.then((_) => {
				console.info('intromotocooliano autoplay started');
				resolve(true);
			})
				.catch((error) => {
					console.warn('No autoplay ', error);
					reject();
				});
		}
	});
};

// Tradicional Class
export function _glBlend() {
	var root_glblend = this;
	this.blendEnabled = false;
	this.blendParamSrc = 'ONE';
	this.blendParamDest = 'ONE';
	this.depthParam = 'NOTEQUAL';
	this.setBothBlendParam = function(param_) {
		root_glblend.blendParamSrc = param_;
		root_glblend.blendParamDest = param_;
	};
}

// Tradicional Class
export function _DrawElements(numberOfItemsIndices) {
	this.mode = 'TRIANGLES';
	this.modes = ['POINTS', 'LINE_STRIP', 'LINE_LOOP', 'LINES', 'TRIANGLE_STRIP', 'TRIANGLE_FAN', 'TRIANGLES'];
	this.type = ['UNSIGNED_BYTE', 'UNSIGNED_SHORT', 'UNSIGNED_INT'];
	this.indices = 'GL_ELEMENT_ARRAY_BUFFER';
	this.numberOfIndicesRender = numberOfItemsIndices; //mesh_.indexBuffer.numItems
}

export function _glTexParameteri(_target, _pname, _param) {
	var ROOT = this;
	if(typeof _target == 'undefined') {
		this.target = 'TEXTURE_2D';
	} else {
		this.target = _target;
	}

	if(typeof _pname == 'undefined' || typeof _param == 'undefined') {
		this.pname = 'TEXTURE_MAG_FILTER';
		this.param = 'LINEAR';
	} else {
		this.pname = _pname;
		this.param = _param;
	}
}

/**
 * @description
 * ENUMERATORS FOR opegl es 2.0 and 3.0
 */
export let ENUMERATORS = {
	glTexParameter: {
		target: {
			GL_TEXTURE_2D: 'GL_TEXTURE_2D',
			GL_TEXTURE_3D: 'GL_TEXTURE_3D',
			GL_TEXTURE_2D_ARRAY: 'GL_TEXTURE_2D_ARRAY',
			GL_TEXTURE_CUBE_MAP: 'GL_TEXTURE_CUBE_MAP'
		},
		pname: {
			GL_TEXTURE_BASE_LEVEL: 'TEXTURE_BASE_LEVEL',
			GL_TEXTURE_COMPARE_FUNC: 'TEXTURE_COMPARE_FUNC',
			GL_TEXTURE_COMPARE_MODE: 'TEXTURE_COMPARE_MODE',
			GL_TEXTURE_MIN_FILTER: 'TEXTURE_MIN_FILTER',
			GL_TEXTURE_MAG_FILTER: 'TEXTURE_MAG_FILTER',
			GL_TEXTURE_MIN_LOD: 'TEXTURE_MIN_LOD',
			GL_TEXTURE_MAX_LOD: 'TEXTURE_MAX_LOD',
			GL_TEXTURE_MAX_LEVEL: 'TEXTURE_MAX_LEVEL',
			GL_TEXTURE_SWIZZLE_R: 'TEXTURE_SWIZZLE_R',
			GL_TEXTURE_SWIZZLE_G: 'TEXTURE_SWIZZLE_G',
			GL_TEXTURE_SWIZZLE_B: 'TEXTURE_SWIZZLE_B',
			GL_TEXTURE_SWIZZLE_A: 'TEXTURE_SWIZZLE_A',
			GL_TEXTURE_WRAP_S: 'TEXTURE_WRAP_S',
			GL_TEXTURE_WRAP_T: 'TEXTURE_WRAP_T',
			GL_TEXTURE_WRAP_R: 'TEXTURE_WRAP_R'
		},
		param: {
			BASE_LEVEL: '',
			COMPARE_FUNC: '',
			COMPARE_MODE: '',
			MIN_FILTER: '',
			MAG_FILTER: {
				NEAREST: 'NEAREST',
				LINEAR: 'LINEAR'
			},
			MIN_LOD: '',
			MAX_LOD: '',
			MAX_LEVEL: '',
			SWIZZLE_R: {
				RED: 'RED',
				GREEN: 'GREEN',
				BLUE: 'BLUE',
				ALPHA: 'ALPHA',
				ZERO: 'ZERO',
				ONE: 'ONE'
			},
			SWIZZLE_G: {
				RED: 'RED',
				GREEN: 'GREEN',
				BLUE: 'BLUE',
				ALPHA: 'ALPHA',
				ZERO: 'ZERO',
				ONE: 'ONE'
			},
			SWIZZLE_B: {
				RED: 'RED',
				GREEN: 'GREEN',
				BLUE: 'BLUE',
				ALPHA: 'ALPHA',
				ZERO: 'ZERO',
				ONE: 'ONE'
			},
			SWIZZLE_A: {
				RED: 'RED',
				GREEN: 'GREEN',
				BLUE: 'BLUE',
				ALPHA: 'ALPHA',
				ZERO: 'ZERO',
				ONE: 'ONE'
			},
			WRAP_S: {
				CLAMP_TO_EDGE: 'CLAMP_TO_EDGE',
				MIRRORED_REPEAT: 'MIRRORED_REPEAT',
				GL_REPEAT: 'GL_REPEAT'
			},
			WRAP_T: {
				CLAMP_TO_EDGE: 'CLAMP_TO_EDGE',
				MIRRORED_REPEAT: 'MIRRORED_REPEAT',
				GL_REPEAT: 'GL_REPEAT'
			},
			WRAP_R: {
				CLAMP_TO_EDGE: 'CLAMP_TO_EDGE',
				MIRRORED_REPEAT: 'MIRRORED_REPEAT',
				GL_REPEAT: 'GL_REPEAT'
			}
		}
	},

	glDrawElements: {
		help: function() {
			SYS.DEBUG.WARNING('C specification: void glDrawElements(  GLenum mode , GLsizei count , GLenum type , const GLvoid * indices ); ');
			SYS.DEBUG.WARNING(">>>mode can be : 'POINTS' , 'LINE_STRIP', 'LINE_LOOP', 'LINES', 'TRIANGLE_STRIP', 'TRIANGLE_FAN' , 'TRIANGLES' ");
			SYS.DEBUG.WARNING('>>>count    : Specifies the number of elements to be rendered.');
			SYS.DEBUG.WARNING(">>>type    : 'UNSIGNED_BYTE' , 'UNSIGNED_SHORT' , 'UNSIGNED_INT' ");
		},

		mode: ['POINTS', 'LINE_STRIP', 'LINE_LOOP', 'LINES', 'TRIANGLE_STRIP', 'TRIANGLE_FAN', 'TRIANGLES'],
		type: ['UNSIGNED_BYTE', 'UNSIGNED_SHORT', 'UNSIGNED_INT'],
		indices: 'GL_ELEMENT_ARRAY_BUFFER'
	},

	glBlend: {
		param: ['ZERO', 'ONE', 'SRC_COLOR', 'DST_COLOR', 'ONE_MINUS_SRC_COLOR', 'ONE_MINUS_DST_COLOR', 'SRC_ALPHA', 'DST_ALPHA', 'ONE_MINUS_SRC_ALPHA', 'ONE_MINUS_DST_ALPHA', 'SRC_ALPHA_SATURATE']
	},

	glDepth: {
		param: ['NEVER', 'ALWAYS', 'LESS', 'GREATER', 'EQUAL', 'LEQUAL', 'NOTEQUAL', 'GEQUAL'],

		returnParam: {
			NEVER: function() {
				return 'NEVER';
			},
			ALWAYS: function() {
				return 'ALWAYS';
			},
			LESS: function() {
				return 'LESS';
			},
			GREATER: function() {
				return 'GREATER';
			},
			EQUAL: function() {
				return 'EQUAL';
			},
			LEQUAL: function() {
				return 'LEQUAL';
			},
			NOTEQUAL: function() {
				return 'NOTEQUAL';
			},
			GEQUAL: function() {
				return 'GEQUAL';
			}
		}
	},

	getTexParameter: function() {
		SYS.DEBUG.LOG('TEXTURE_IMMUTABLE_FORMAT VALUE : ' + world.GL.gl.getTexParameter(world.GL.gl.TEXTURE_2D, world.GL.gl.TEXTURE_IMMUTABLE_FORMAT));
	}
};

/**
 * @description
 * Audio API Helper
 */
export const BiquadFilterType = {
	lowpass: 'lowpass',
	highpass: 'highpass',
	bandpass: 'bandpass',
	lowshelf: 'lowshelf',
	highshelf: 'highshelf',
	peaking: 'peaking',
	notch: 'notch',
	allpass: 'allpass'
};

/**
 * @description
 * Default cubeMap drawer
 * 2DCanvas ctx
 */
export function gen2DTextFace(ctx, faceColor, textColor, text) {
	const {width, height} = ctx.canvas;
	ctx.fillStyle = faceColor;
	ctx.fillRect(0, 0, width, height);
	ctx.font = `${width * 0.6}px sans-serif`;
	ctx.textAlign = 'center';
	ctx.textBaseline = 'middle';
	ctx.fillStyle = textColor;
	ctx.fillText(text, width / 2, height / 2);
}

// Create DOM elements for FPS template.
export function showDomFPSController() {
	byId('mobSpace').style.display = 'grid';
	byId('mobRight').style.display = 'grid';
	byId('mobLeft').style.display = 'grid';
	byId('mobUp').style.display = 'grid';
	byId('mobDown').style.display = 'grid';
	byId('domAngleAxis').style.display = 'grid';
}

// Create DOM elements for FPS template.
export function createDomFPSController() {
	var domSpace = document.createElement('div');
	domSpace.id = 'mobSpace';
	domSpace.classList.add('noselect');
	domSpace.setAttribute('style', `
      text-align: center;
      display: none;
      position:absolute;
      left: 80%;
      top: 80%;
      width: 14%;
      height: 4%;
      background: rgba(255,255,255,0.2);
      margin: auto;
      align-items: center;
      cursor: default;
    `)
	domSpace.innerText = `JUMP`;
	// domSpace.addEventListener('touchstart', (e) => {})
	document.body.append(domSpace)

	var domRight = document.createElement('div');
	domRight.id = 'mobRight';
	domRight.classList.add('noselect');
	domRight.setAttribute('style', `
      text-align: center;
      display: none;
      position:absolute;
      left: 85%;
      top: 90%;
      width: 14%;
      height: 4%;
      background: rgba(255,255,255,0.2);
      margin: auto;
      align-items: center;
      cursor: default;
    `)
	domRight.innerText = `RIGHT`;
	// domRight.addEventListener('touchstart', (e) => {console.log('TEST RIGHT')})
	// domRight.addEventListener('touchend', (e) => {	})
	document.body.append(domRight)

	var domLeft = document.createElement('div');
	domLeft.id = 'mobLeft';
	domLeft.classList.add('noselect');
	domLeft.setAttribute('style', `
      text-align: center;
      display: none;
      position:absolute;
      left: 70%;
      top: 90%;
      width: 14%;
      height: 4%;
      background: rgba(255,255,255,0.2);
      margin: auto;
      align-items: center;
      cursor: default;
    `)
	domLeft.innerText = `LEFT`;
	// domLeft.addEventListener('touchstart', (e) => {})
	// domLeft.addEventListener('touchend', (e) => {})
	document.body.append(domLeft)

	var domUp = document.createElement('div');
	domUp.id = 'mobUp';
	domUp.classList.add('noselect');
	domUp.setAttribute('style', `
      text-align: center;
      display: none;
      position:absolute;
      left: 78%;
      top: 86%;
      width: 14%;
      height: 4%;
      background: rgba(255,255,255,0.2);
      margin: auto;
      align-items: center;
      cursor: default;
    `)
	domUp.innerText = `UP`;
	// domUp.addEventListener('touchstart', (e) => {})
	// domUp.addEventListener('touchend', (e) => {})
	document.body.append(domUp)

	var domFire = document.createElement('div');
	domFire.id = 'mobFire';
	domFire.classList.add('noselect');
	domFire.setAttribute('style', `
      text-align: center;
      display: grid;
      position:absolute;
      left: 64%;
      top: 80%;
      width: 14%;
      height: 4%;
      background: rgba(255,255,255,0.2);
      margin: auto;
      align-items: center;
      cursor: default;
    `)
		domFire.innerText = `FIRE`;
	// domFire.addEventListener('touchstart', (e) => {})
	// domFire.addEventListener('touchend', (e) => {})
	document.body.append(domFire)

	var domDown = document.createElement('div');
	domDown.id = 'mobDown';
	domDown.classList.add('noselect');
	domDown.setAttribute('style', `
      text-align: center;
      display: none;
      position:absolute;
      left: 78%;
      top: 94%;
      width: 14%;
      height: 4%;
      background: rgba(255,255,255,0.1);
      margin: auto;
      align-items: center;
      cursor: default;
    `)
	domDown.innerText = `DOWN`;
	// domDown.addEventListener('touchstart', (e) => {})
	// domDown.addEventListener('touchend', (e) => {})
	document.body.append(domDown)

	var domAngleAxis = document.createElement('div');
	domAngleAxis.id = 'domAngleAxis';
	domAngleAxis.classList.add('noselect');
	domAngleAxis.setAttribute('style', `
      text-align: center;
      display: none;
      position:absolute;
      left: 5%;
      top: 69%;
      width: 45%;
      height: 28%;
      background: rgba(255,255,255,0.2);
      margin: auto;
      align-items: center;
      cursor: default;
    `)
	domAngleAxis.innerHTML = `    `;
	// domAngleAxis.addEventListener('touchstart', (e) => {})
	document.body.append(domAngleAxis)
	showDomFPSController();
}

// DOM Notifi msg
export let notify = {
	root: () => byId('msgBox'),
	pContent: () => byId('not-content'),
	copy: function() {
		navigator.clipboard.writeText(notify.root().children[0].innerText);
	},
	singleDom: true,
	showTime: 3000,
	hideTime: 1000,
	c: 0, ic: 0, t: {},
	setContent: function(content, t) {

		if(byId(`msgbox-loc-${notify.c}`) != null) {
			byId(`msgbox-loc-${notify.c}`).innerHTML = content;
			return;
		}

		var iMsg = document.createElement('div');
		iMsg.innerHTML = content;
		iMsg.id = `msgbox-loc-${notify.c}`;
		notify.root().appendChild(iMsg);
		iMsg.classList.add('animate1')
		if(t == 'ok') {
			iMsg.style = 'font-family: stormfaze;color:white;padding:7px;margin:2px';
		} else {
			iMsg.style = 'font-family: stormfaze;color:white;padding:7px;margin:2px';
		}
	},
	kill: function() {
		notify.root().remove();
	},
	show: function(content, t) {
		notify.setContent(content, t);
		notify.root().style.display = "block";
		var loc2 = notify.c;
		setTimeout(function() {
			byId(`msgbox-loc-${loc2}`).classList.remove("fadeInDown");
			byId(`msgbox-loc-${loc2}`).classList.add("fadeOut");
			setTimeout(function() {
				byId(`msgbox-loc-${loc2}`).classList.remove("fadeOut");
				if(this.singleDom == false) {
					byId(`msgbox-loc-${loc2}`).style.display = "none";
					byId(`msgbox-loc-${loc2}`).remove();
					notify.ic++;
				}
				if(notify.c == notify.ic) {
					notify.root().style.display = 'none';
				}
			}, this.hideTime)
		}, this.showTime);
		if(this.singleDom == true) {
		} else {
			notify.c++;
		}

	},
	error: function(content) {
		notify.root().classList.remove("success")
		notify.root().classList.add("error")
		notify.root().classList.add("fadeInDown");
		notify.show(content, 'err');
	},
	success: function(content) {
		notify.root().classList.remove("error")
		notify.root().classList.add("success")
		notify.root().classList.add("fadeInDown");
		notify.show(content, 'ok');
	}
}
