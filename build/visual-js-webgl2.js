(function() {
        'use strict';

        window.degToRad = function(degrees) {
                return degrees * Math.PI / 180;
        }

        //###############################################//###############################################
        //###############################################//###############################################
        // BROWSER AND DEVICE DETECT
        //###############################################//###############################################
        //###############################################//###############################################
        window.DETECTBROWSER = function() {
                var HREFF, HREFTXT = "unknown";
                this.NAVIGATOR = navigator.userAgent; var NAV = navigator.userAgent; var navMacintosh, gecko, navIpad, operatablet, navIphone, navFirefox, navChrome, navOpera, navSafari, navandroid, mobile, navMozilla;
                gecko = NAV.match(/gecko/gi);
                navOpera = (NAV.match(/Opera|OPR\//) ? true : false);
                operatablet = NAV.match(/Tablet/gi);
                navIpad = NAV.match(/ipad/gi);
                navIphone = NAV.match(/iphone/gi);
                navFirefox = NAV.match(/Firefox/gi);
                navMozilla = NAV.match(/mozilla/gi);
                navChrome = NAV.match(/Chrome/gi);
                navSafari = NAV.match(/safari/gi);
                navandroid = NAV.match(/android/gi);
                mobile = NAV.match(/mobile/gi);
                navMacintosh = NAV.match(/Macintosh/gi);

                window["TYPEOFANDROID"] = 0;
                window["NOMOBILE"] = 0;

                var mobile = (/iphone|ipad|ipod|android|blackberry|mini|windows\sce|palm/i.test(navigator.userAgent.toLowerCase()));
                if (mobile) {
                        var userAgent = navigator.userAgent.toLowerCase();
                        if ((userAgent.search("android") > -1) && (userAgent.search("mobile") > -1))
                                console.log("ANDROID MOBILE")
                        else if ((userAgent.search("android") > -1) && !(userAgent.search("mobile") > -1))
                                console.log(" ANDROID TABLET ")
                        TYPEOFANDROID = 1;
                }
                else { NOMOBILE = 1; }
                //  FIREFOX za android
                if (navFirefox && navandroid && TYPEOFANDROID == 0) { HREFF = "#"; HREFTXT = "mobile_firefox_android"; }
                //  FIREFOX za android T
                if (navFirefox && navandroid && TYPEOFANDROID == 1) { HREFF = "#"; HREFTXT = "mobile_firefox_android_tablet"; }
                // OPERA ZA ANDROID
                if (navOpera && navandroid) { HREFF = "#"; HREFTXT = "opera_mobile_android"; }// provera
                // OPERA ZA ANDROID TABLET
                if (navOpera && navandroid && operatablet) { HREFF = "#"; HREFTXT = "opera_mobile_android_tablet"; }// provera
                //  safari mobile za IPHONE - i  safari mobile za IPAD i CHROME za IPAD
                if (navSafari) {
                        var Iphonesafari = NAV.match(/iphone/gi);

                        if (Iphonesafari) { HREFF = "#"; HREFTXT = "safari_mobile_iphone"; }
                        else if (navIpad) { HREFF = "#"; HREFTXT = "mobile_safari_chrome_ipad"; }
                        else if (navMacintosh) { HREFF = "#"; HREFTXT = "desktop_safari"; }  //Macintosh
                        else if (navandroid) { HREFF = "#"; HREFTXT = "android_native"; }

                }
                // TEST CHROME
                if (navChrome && navSafari && navMozilla && TYPEOFANDROID == 1) { HREFF = "#"; HREFTXT = "mobile_chrome_android_tablet"; }
                if (navChrome && navSafari && navMozilla && TYPEOFANDROID == 0) { HREFF = "#"; HREFTXT = "mobile_chrome_android"; }
                if (navChrome && TYPEOFANDROID == 0) { HREFF = "#"; HREFTXT = "chrome_browser"; }
                if (navMozilla && NOMOBILE == 1 && gecko && navFirefox) { HREFF = "#"; HREFTXT = "firefox_desktop"; }
                if (navOpera && TYPEOFANDROID == 0 && !mobile) { HREFF = "#"; HREFTXT = "opera_desktop"; }

                this.NAME = HREFTXT;
                this.NOMOBILE = NOMOBILE;
        }
        //###############################################//###############################################
        //###############################################//###############################################


        window.BROWSER = new window.DETECTBROWSER();


        //###############################################//###############################################
        //###############################################//###############################################
        // LOGGER
        //###############################################//###############################################
        //###############################################//###############################################
        window.LOG = function() {

                this.ENABLE = true;

                this.LOG = function(data) {

                        if (this.ENABLE == true) {

                                console.log('%c' + data, 'background: #333; color: lime');

                        }

                };

                this.WARNING = function(data) {

                        if (this.ENABLE == true) {

                                console.log('%c Warning : ' + data, 'background: #333; color: yellow');

                        }

                };


                this.CRITICAL = function(data) {

                        if (this.ENABLE == true) {

                                console.log('%c Critical : ' + data, 'background: #333; color: red');

                        }

                };

                this.NETWORK_LOG = function(data) {

                        if (this.ENABLE == true) {

                                console.log('%c Network view : ' + data, 'background: #333; color: #a7afaf');

                        }

                };

        }


        //###############################################//###############################################
        //###############################################//###############################################
        // basic img creator
        window.loadImage = function(url, onload) {
                var img = new Image();
                img.src = url;
                img.onload = function() {
                        onload(img);
                };
                return img;
        }








})();


//###############################################//###############################################
//###############################################//###############################################
// Load script in runtime
//###############################################//###############################################
//###############################################//###############################################
var SCRIPT = {
        SCRIPT_ID: 0,
        SINHRO_LOAD: {},
        LOAD: function addScript(src) {
                var s = document.createElement('script');
                s.onload = function() {


                        SCRIPT.SCRIPT_ID++;
                        console.log("Script id loaded : " + SCRIPT.SCRIPT_ID + " with src : " + this.src + ">>>>>>>>>" + this.src);

                        var filename = this.src.substring(this.src.lastIndexOf("/") + 1, this.src.lastIndexOf("."));
                        //console.log(filename)
                        filename = filename.replace(".", "_");
                        eval('try{SCRIPT.SINHRO_LOAD._' + filename + '(s)}catch(e){}');



                };
                s.setAttribute('src', src);
                document.body.appendChild(s);
        }
};


//###############################################//###############################################
//###############################################//###############################################
//GET PULSE VALUES IN REAL TIME
//###############################################//###############################################
//###############################################//###############################################
function OSCILLATOR(min, max, step) {

        if ((typeof min === "string" || typeof min === "number") && (typeof max === "string" || typeof max === "number") && (typeof step === "string" || typeof step === "number")) {

                var ROOT = this;
                this.min = parseFloat(min);
                this.max = parseFloat(max);
                this.step = parseFloat(step);
                this.value_ = parseFloat(min);
                this.status = 0;
                this.on_maximum_value = function() { };
                this.on_minimum_value = function() { };
                this.UPDATE = function(STATUS_) {
                        if (STATUS_ === undefined) {
                                if (this.status == 0 && this.value_ < this.max) {
                                        this.value_ = this.value_ + this.step;
                                        if (this.value_ >= this.max) { this.value_ = this.max; this.status = 1; ROOT.on_maximum_value() }
                                        return this.value_;
                                }
                                else if (this.status == 1 && this.value_ > this.min) {
                                        this.value_ = this.value_ - this.step;
                                        if (this.value_ <= this.min) { this.value_ = this.min; this.status = 0; ROOT.on_minimum_value() }
                                        return this.value_;
                                }
                        } else {
                                return this.value_;
                        }
                };

        } else {

                SYS.DEBUG.WARNING("SYS : warning for procedure 'SYS.MATH.OSCILLATOR'  Desciption : Replace object with string or number,  min >> " + typeof min + " and max >>" + typeof max + "  and step >>" + typeof step + " << must be string or number.");

        }
        //AUTO UPDATE HERE

}


function SWITCHER() {

        var ROOT = this;
        ROOT.VALUE = 1;
        ROOT.GET = function() {
                ROOT.VALUE = ROOT.VALUE * -1;
                return ROOT.VALUE;

        };

}


var E = function(id) { return document.getElementById(id) };

function RandomFloat(min, max) {
        highlightedNumber = Math.random() * (max - min) + min;
        return highlightedNumber
};

// RANDOM INT FROM-TO
function randomIntFromTo(min, max) {

        if (typeof min === 'object' || typeof max === 'object') {

                SYS.DEBUG.WARNING("SYS : warning for procedure 'SYS.MATH.RANDOM_INT_FROM_TO'  Desciption : Replace object with string ,  this >> " + typeof min + " and " + typeof min + " << must be string or number.");

        }
        else if (typeof min === 'undefined' || typeof max === 'undefined') {

                SYS.DEBUG.WARNING("SYS : warning for procedure 'SYS.MATH.RANDOM_INT_FROM_TO'  Desciption : arguments (min, max) cant be undefined ,  this >> " + typeof min + " and " + typeof min + "  << must be string or number.");

        }
        else {

                return Math.floor(Math.random() * (max - min + 1) + min);

        }

}

var QueryString = function() {
        // This function is anonymous, is executed immediately and
        // the return value is assigned to QueryString!
        var query_string = {};
        var query = window.location.search.substring(1);
        var vars = query.split("&");
        for (var i = 0; i < vars.length; i++) {
                var pair = vars[i].split("=");
                // If first entry with this name
                if (typeof query_string[pair[0]] === "undefined") {
                        query_string[pair[0]] = decodeURIComponent(pair[1]);
                        // If second entry with this name
                } else if (typeof query_string[pair[0]] === "string") {
                        var arr = [query_string[pair[0]], decodeURIComponent(pair[1])];
                        query_string[pair[0]] = arr;
                        // If third or later entry with this name
                } else {
                        query_string[pair[0]].push(decodeURIComponent(pair[1]));
                }
        }
        return query_string;
}();



// AUDIO SYSTEM
App.audioSystem.Assets = {};

App.audioSystem.createVideoAsset = function(name_, path_) {

        var videoAudioAsset = {};

        videoAudioAsset.video = document.createElement("video");
        videoAudioAsset.video.setAttribute("src", "res/videos/" + path_);
        videoAudioAsset.video.controls = true;
        videoAudioAsset.video.autoplay = true;
        E("HOLDER_STREAMS").appendChild(videoAudioAsset.video);

        try {
                window.AudioContext = window.AudioContext || window.webkitAudioContext;
                videoAudioAsset.context = new AudioContext();
        }
        catch (e) {
                alert('Web Audio API is not supported in this browser');
        }

        videoAudioAsset.gainNode = videoAudioAsset.context.createGain();
        videoAudioAsset.gainNode.gain.value = 1;                   // Change Gain Value to test
        videoAudioAsset.filter = videoAudioAsset.context.createBiquadFilter();
        videoAudioAsset.filter.type = 2;                          // Change Filter type to test
        videoAudioAsset.filter.frequency.value = 5040;            // Change frequency to test

        if (typeof name_ !== 'undefined' && typeof name_ === 'string') {

                eval("App.audioSystem.Assets." + name_ + " = videoAudioAsset;");

        }
        else {

                eval("App.audioSystem.Assets." + "audioObject" + randomIntFromTo(1, 100) * randomIntFromTo(1000, 10000) + " = videoAudioAsset;");

        }

}

// ONLOAD
window.addEventListener('load', function(e) {

        App.ready = true;
        App.onload(e);


}, false);





// CLASS FOR GL PROGRAM

function _glBlend() {

        var root_glblend = this;

        this.blendEnabled = false;
        this.blendParamSrc = "ONE";
        this.blendParamDest = "ONE";
        this.depthParam = "NOTEQUAL";

        this.setBothBlendParam = function(param_) {

                root_glblend.blendParamSrc = param_;
                root_glblend.blendParamDest = param_;

        }



}


function _DrawElements(numberOfItemsIndices) {

        this.mode = "TRIANGLES";
        this.modes = ['POINTS', 'LINE_STRIP', 'LINE_LOOP', 'LINES', 'TRIANGLE_STRIP', 'TRIANGLE_FAN', 'TRIANGLES'];
        this.type = ['UNSIGNED_BYTE', 'UNSIGNED_SHORT', 'UNSIGNED_INT'];
        this.indices = 'GL_ELEMENT_ARRAY_BUFFER';
        this.numberOfIndicesRender = numberOfItemsIndices //mesh_.indexBuffer.numItems

}



function _glTexParameteri(_target, _pname, _param) {

        var ROOT = this;

        if (typeof _target == 'undefined') {
                this.target = "TEXTURE_2D";
        }
        else {
                this.target = _target;
        }


        if (typeof _pname == 'undefined' || typeof _param == 'undefined') {
                this.pname = "TEXTURE_MAG_FILTER";
                this.param = "LINEAR";
        }
        else {
                this.pname = _pname;
                this.param = _param;
        }



}



//######################################
// ENUMERATORS FOR opegl es 2.0 and 3.0
//######################################

//----glParameter
var ENUMERATORS = {

        glTexParameter: {

                'target': {
                        GL_TEXTURE_2D: 'GL_TEXTURE_2D',
                        GL_TEXTURE_3D: 'GL_TEXTURE_3D',
                        GL_TEXTURE_2D_ARRAY: 'GL_TEXTURE_2D_ARRAY',
                        GL_TEXTURE_CUBE_MAP: 'GL_TEXTURE_CUBE_MAP'
                },
                'pname': {

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
                        GL_TEXTURE_WRAP_R: 'TEXTURE_WRAP_R',

                },
                'param': {

                        BASE_LEVEL: '',
                        COMPARE_FUNC: '',
                        COMPARE_MODE: '',
                        MIN_FILTER: '',
                        MAG_FILTER: { NEAREST: 'NEAREST', LINEAR: 'LINEAR' },
                        MIN_LOD: '',
                        MAX_LOD: '',
                        MAX_LEVEL: '',
                        SWIZZLE_R: { RED: 'RED', GREEN: 'GREEN', BLUE: 'BLUE', ALPHA: 'ALPHA', ZERO: 'ZERO', ONE: 'ONE' },
                        SWIZZLE_G: { RED: 'RED', GREEN: 'GREEN', BLUE: 'BLUE', ALPHA: 'ALPHA', ZERO: 'ZERO', ONE: 'ONE' },
                        SWIZZLE_B: { RED: 'RED', GREEN: 'GREEN', BLUE: 'BLUE', ALPHA: 'ALPHA', ZERO: 'ZERO', ONE: 'ONE' },
                        SWIZZLE_A: { RED: 'RED', GREEN: 'GREEN', BLUE: 'BLUE', ALPHA: 'ALPHA', ZERO: 'ZERO', ONE: 'ONE' },
                        WRAP_S: { CLAMP_TO_EDGE: 'CLAMP_TO_EDGE', MIRRORED_REPEAT: 'MIRRORED_REPEAT', GL_REPEAT: 'GL_REPEAT' },
                        WRAP_T: { CLAMP_TO_EDGE: 'CLAMP_TO_EDGE', MIRRORED_REPEAT: 'MIRRORED_REPEAT', GL_REPEAT: 'GL_REPEAT' },
                        WRAP_R: { CLAMP_TO_EDGE: 'CLAMP_TO_EDGE', MIRRORED_REPEAT: 'MIRRORED_REPEAT', GL_REPEAT: 'GL_REPEAT' },

                },

        },



        glDrawElements: {

                help: function() {


                        SYS.DEBUG.WARNING("C specification: void glDrawElements(	GLenum mode , GLsizei count , GLenum type , const GLvoid * indices ); ");
                        SYS.DEBUG.WARNING(">>>mode can be : 'POINTS' , 'LINE_STRIP', 'LINE_LOOP', 'LINES', 'TRIANGLE_STRIP', 'TRIANGLE_FAN' , 'TRIANGLES'  ");
                        SYS.DEBUG.WARNING(">>>count       :  Specifies the number of elements to be rendered.");
                        SYS.DEBUG.WARNING(">>>type        : 'UNSIGNED_BYTE' , 'UNSIGNED_SHORT' , 'UNSIGNED_INT' ");

                },

                mode: ['POINTS', 'LINE_STRIP', 'LINE_LOOP', 'LINES', 'TRIANGLE_STRIP', 'TRIANGLE_FAN', 'TRIANGLES'],
                type: ['UNSIGNED_BYTE', 'UNSIGNED_SHORT', 'UNSIGNED_INT'],
                indices: 'GL_ELEMENT_ARRAY_BUFFER',


        },

        glBlend:
        {
                param: [
                        'ZERO', 'ONE',
                        'SRC_COLOR', 'DST_COLOR',
                        'ONE_MINUS_SRC_COLOR', 'ONE_MINUS_DST_COLOR',
                        'SRC_ALPHA', 'DST_ALPHA',
                        'ONE_MINUS_SRC_ALPHA', 'ONE_MINUS_DST_ALPHA',
                        'SRC_ALPHA_SATURATE',
                ],
        },


        glDepth: {

                param: ['NEVER', 'ALWAYS',
                        'LESS', 'GREATER',
                        'EQUAL', 'LEQUAL', 'NOTEQUAL', 'GEQUAL'],

                returnParam: {

                        'NEVER': function() { return 'NEVER' },
                        'ALWAYS': function() { return 'ALWAYS' },
                        'LESS': function() { return 'LESS' },
                        'GREATER': function() { return 'GREATER' },
                        'EQUAL': function() { return 'EQUAL' },
                        'LEQUAL': function() { return 'LEQUAL' },
                        'NOTEQUAL': function() { return 'NOTEQUAL' },
                        'GEQUAL': function() { return 'GEQUAL' }

                },

        },


        getTexParameter: function() {

                SYS.DEBUG.LOG(" TEXTURE_IMMUTABLE_FORMAT VALUE : " + world.GL.gl.getTexParameter(world.GL.gl.TEXTURE_2D, world.GL.gl.TEXTURE_IMMUTABLE_FORMAT));

        },


};






//##############################################################################################################################



/**
* @fileoverview gl-matrix - High performance matrix and vector operations
* @author Brandon Jones
* @author Colin MacKenzie IV
* @version 2.3.2
*/

/* Copyright (c) 2015, Brandon Jones, Colin MacKenzie IV.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE. */

!function(t, a) { if ("object" == typeof exports && "object" == typeof module) module.exports = a(); else if ("function" == typeof define && define.amd) define([], a); else { var n = a(); for (var r in n) ("object" == typeof exports ? exports : t)[r] = n[r] } }(this, function() {
        return function(t) { function a(r) { if (n[r]) return n[r].exports; var o = n[r] = { exports: {}, id: r, loaded: !1 }; return t[r].call(o.exports, o, o.exports, a), o.loaded = !0, o.exports } var n = {}; return a.m = t, a.c = n, a.p = "", a(0) }([function(t, a, n) { a.glMatrix = n(1), a.mat2 = n(2), a.mat2d = n(3), a.mat3 = n(4), a.mat4 = n(5), a.quat = n(6), a.vec2 = n(9), a.vec3 = n(7), a.vec4 = n(8) }, function(t, a) { var n = {}; n.EPSILON = 1e-6, n.ARRAY_TYPE = "undefined" != typeof Float32Array ? Float32Array : Array, n.RANDOM = Math.random, n.ENABLE_SIMD = !1, n.SIMD_AVAILABLE = n.ARRAY_TYPE === this.Float32Array && "SIMD" in this, n.USE_SIMD = n.ENABLE_SIMD && n.SIMD_AVAILABLE, n.setMatrixArrayType = function(t) { n.ARRAY_TYPE = t }; var r = Math.PI / 180; n.toRadian = function(t) { return t * r }, n.equals = function(t, a) { return Math.abs(t - a) <= n.EPSILON * Math.max(1, Math.abs(t), Math.abs(a)) }, t.exports = n }, function(t, a, n) { var r = n(1), o = {}; o.create = function() { var t = new r.ARRAY_TYPE(4); return t[0] = 1, t[1] = 0, t[2] = 0, t[3] = 1, t }, o.clone = function(t) { var a = new r.ARRAY_TYPE(4); return a[0] = t[0], a[1] = t[1], a[2] = t[2], a[3] = t[3], a }, o.copy = function(t, a) { return t[0] = a[0], t[1] = a[1], t[2] = a[2], t[3] = a[3], t }, o.identity = function(t) { return t[0] = 1, t[1] = 0, t[2] = 0, t[3] = 1, t }, o.fromValues = function(t, a, n, o) { var u = new r.ARRAY_TYPE(4); return u[0] = t, u[1] = a, u[2] = n, u[3] = o, u }, o.set = function(t, a, n, r, o) { return t[0] = a, t[1] = n, t[2] = r, t[3] = o, t }, o.transpose = function(t, a) { if (t === a) { var n = a[1]; t[1] = a[2], t[2] = n } else t[0] = a[0], t[1] = a[2], t[2] = a[1], t[3] = a[3]; return t }, o.invert = function(t, a) { var n = a[0], r = a[1], o = a[2], u = a[3], l = n * u - o * r; return l ? (l = 1 / l, t[0] = u * l, t[1] = -r * l, t[2] = -o * l, t[3] = n * l, t) : null }, o.adjoint = function(t, a) { var n = a[0]; return t[0] = a[3], t[1] = -a[1], t[2] = -a[2], t[3] = n, t }, o.determinant = function(t) { return t[0] * t[3] - t[2] * t[1] }, o.multiply = function(t, a, n) { var r = a[0], o = a[1], u = a[2], l = a[3], e = n[0], M = n[1], s = n[2], i = n[3]; return t[0] = r * e + u * M, t[1] = o * e + l * M, t[2] = r * s + u * i, t[3] = o * s + l * i, t }, o.mul = o.multiply, o.rotate = function(t, a, n) { var r = a[0], o = a[1], u = a[2], l = a[3], e = Math.sin(n), M = Math.cos(n); return t[0] = r * M + u * e, t[1] = o * M + l * e, t[2] = r * -e + u * M, t[3] = o * -e + l * M, t }, o.scale = function(t, a, n) { var r = a[0], o = a[1], u = a[2], l = a[3], e = n[0], M = n[1]; return t[0] = r * e, t[1] = o * e, t[2] = u * M, t[3] = l * M, t }, o.fromRotation = function(t, a) { var n = Math.sin(a), r = Math.cos(a); return t[0] = r, t[1] = n, t[2] = -n, t[3] = r, t }, o.fromScaling = function(t, a) { return t[0] = a[0], t[1] = 0, t[2] = 0, t[3] = a[1], t }, o.str = function(t) { return "mat2(" + t[0] + ", " + t[1] + ", " + t[2] + ", " + t[3] + ")" }, o.frob = function(t) { return Math.sqrt(Math.pow(t[0], 2) + Math.pow(t[1], 2) + Math.pow(t[2], 2) + Math.pow(t[3], 2)) }, o.LDU = function(t, a, n, r) { return t[2] = r[2] / r[0], n[0] = r[0], n[1] = r[1], n[3] = r[3] - t[2] * n[1], [t, a, n] }, o.add = function(t, a, n) { return t[0] = a[0] + n[0], t[1] = a[1] + n[1], t[2] = a[2] + n[2], t[3] = a[3] + n[3], t }, o.subtract = function(t, a, n) { return t[0] = a[0] - n[0], t[1] = a[1] - n[1], t[2] = a[2] - n[2], t[3] = a[3] - n[3], t }, o.sub = o.subtract, o.exactEquals = function(t, a) { return t[0] === a[0] && t[1] === a[1] && t[2] === a[2] && t[3] === a[3] }, o.equals = function(t, a) { var n = t[0], o = t[1], u = t[2], l = t[3], e = a[0], M = a[1], s = a[2], i = a[3]; return Math.abs(n - e) <= r.EPSILON * Math.max(1, Math.abs(n), Math.abs(e)) && Math.abs(o - M) <= r.EPSILON * Math.max(1, Math.abs(o), Math.abs(M)) && Math.abs(u - s) <= r.EPSILON * Math.max(1, Math.abs(u), Math.abs(s)) && Math.abs(l - i) <= r.EPSILON * Math.max(1, Math.abs(l), Math.abs(i)) }, o.multiplyScalar = function(t, a, n) { return t[0] = a[0] * n, t[1] = a[1] * n, t[2] = a[2] * n, t[3] = a[3] * n, t }, o.multiplyScalarAndAdd = function(t, a, n, r) { return t[0] = a[0] + n[0] * r, t[1] = a[1] + n[1] * r, t[2] = a[2] + n[2] * r, t[3] = a[3] + n[3] * r, t }, t.exports = o }, function(t, a, n) { var r = n(1), o = {}; o.create = function() { var t = new r.ARRAY_TYPE(6); return t[0] = 1, t[1] = 0, t[2] = 0, t[3] = 1, t[4] = 0, t[5] = 0, t }, o.clone = function(t) { var a = new r.ARRAY_TYPE(6); return a[0] = t[0], a[1] = t[1], a[2] = t[2], a[3] = t[3], a[4] = t[4], a[5] = t[5], a }, o.copy = function(t, a) { return t[0] = a[0], t[1] = a[1], t[2] = a[2], t[3] = a[3], t[4] = a[4], t[5] = a[5], t }, o.identity = function(t) { return t[0] = 1, t[1] = 0, t[2] = 0, t[3] = 1, t[4] = 0, t[5] = 0, t }, o.fromValues = function(t, a, n, o, u, l) { var e = new r.ARRAY_TYPE(6); return e[0] = t, e[1] = a, e[2] = n, e[3] = o, e[4] = u, e[5] = l, e }, o.set = function(t, a, n, r, o, u, l) { return t[0] = a, t[1] = n, t[2] = r, t[3] = o, t[4] = u, t[5] = l, t }, o.invert = function(t, a) { var n = a[0], r = a[1], o = a[2], u = a[3], l = a[4], e = a[5], M = n * u - r * o; return M ? (M = 1 / M, t[0] = u * M, t[1] = -r * M, t[2] = -o * M, t[3] = n * M, t[4] = (o * e - u * l) * M, t[5] = (r * l - n * e) * M, t) : null }, o.determinant = function(t) { return t[0] * t[3] - t[1] * t[2] }, o.multiply = function(t, a, n) { var r = a[0], o = a[1], u = a[2], l = a[3], e = a[4], M = a[5], s = n[0], i = n[1], c = n[2], h = n[3], S = n[4], I = n[5]; return t[0] = r * s + u * i, t[1] = o * s + l * i, t[2] = r * c + u * h, t[3] = o * c + l * h, t[4] = r * S + u * I + e, t[5] = o * S + l * I + M, t }, o.mul = o.multiply, o.rotate = function(t, a, n) { var r = a[0], o = a[1], u = a[2], l = a[3], e = a[4], M = a[5], s = Math.sin(n), i = Math.cos(n); return t[0] = r * i + u * s, t[1] = o * i + l * s, t[2] = r * -s + u * i, t[3] = o * -s + l * i, t[4] = e, t[5] = M, t }, o.scale = function(t, a, n) { var r = a[0], o = a[1], u = a[2], l = a[3], e = a[4], M = a[5], s = n[0], i = n[1]; return t[0] = r * s, t[1] = o * s, t[2] = u * i, t[3] = l * i, t[4] = e, t[5] = M, t }, o.translate = function(t, a, n) { var r = a[0], o = a[1], u = a[2], l = a[3], e = a[4], M = a[5], s = n[0], i = n[1]; return t[0] = r, t[1] = o, t[2] = u, t[3] = l, t[4] = r * s + u * i + e, t[5] = o * s + l * i + M, t }, o.fromRotation = function(t, a) { var n = Math.sin(a), r = Math.cos(a); return t[0] = r, t[1] = n, t[2] = -n, t[3] = r, t[4] = 0, t[5] = 0, t }, o.fromScaling = function(t, a) { return t[0] = a[0], t[1] = 0, t[2] = 0, t[3] = a[1], t[4] = 0, t[5] = 0, t }, o.fromTranslation = function(t, a) { return t[0] = 1, t[1] = 0, t[2] = 0, t[3] = 1, t[4] = a[0], t[5] = a[1], t }, o.str = function(t) { return "mat2d(" + t[0] + ", " + t[1] + ", " + t[2] + ", " + t[3] + ", " + t[4] + ", " + t[5] + ")" }, o.frob = function(t) { return Math.sqrt(Math.pow(t[0], 2) + Math.pow(t[1], 2) + Math.pow(t[2], 2) + Math.pow(t[3], 2) + Math.pow(t[4], 2) + Math.pow(t[5], 2) + 1) }, o.add = function(t, a, n) { return t[0] = a[0] + n[0], t[1] = a[1] + n[1], t[2] = a[2] + n[2], t[3] = a[3] + n[3], t[4] = a[4] + n[4], t[5] = a[5] + n[5], t }, o.subtract = function(t, a, n) { return t[0] = a[0] - n[0], t[1] = a[1] - n[1], t[2] = a[2] - n[2], t[3] = a[3] - n[3], t[4] = a[4] - n[4], t[5] = a[5] - n[5], t }, o.sub = o.subtract, o.multiplyScalar = function(t, a, n) { return t[0] = a[0] * n, t[1] = a[1] * n, t[2] = a[2] * n, t[3] = a[3] * n, t[4] = a[4] * n, t[5] = a[5] * n, t }, o.multiplyScalarAndAdd = function(t, a, n, r) { return t[0] = a[0] + n[0] * r, t[1] = a[1] + n[1] * r, t[2] = a[2] + n[2] * r, t[3] = a[3] + n[3] * r, t[4] = a[4] + n[4] * r, t[5] = a[5] + n[5] * r, t }, o.exactEquals = function(t, a) { return t[0] === a[0] && t[1] === a[1] && t[2] === a[2] && t[3] === a[3] && t[4] === a[4] && t[5] === a[5] }, o.equals = function(t, a) { var n = t[0], o = t[1], u = t[2], l = t[3], e = t[4], M = t[5], s = a[0], i = a[1], c = a[2], h = a[3], S = a[4], I = a[5]; return Math.abs(n - s) <= r.EPSILON * Math.max(1, Math.abs(n), Math.abs(s)) && Math.abs(o - i) <= r.EPSILON * Math.max(1, Math.abs(o), Math.abs(i)) && Math.abs(u - c) <= r.EPSILON * Math.max(1, Math.abs(u), Math.abs(c)) && Math.abs(l - h) <= r.EPSILON * Math.max(1, Math.abs(l), Math.abs(h)) && Math.abs(e - S) <= r.EPSILON * Math.max(1, Math.abs(e), Math.abs(S)) && Math.abs(M - I) <= r.EPSILON * Math.max(1, Math.abs(M), Math.abs(I)) }, t.exports = o }, function(t, a, n) { var r = n(1), o = {}; o.create = function() { var t = new r.ARRAY_TYPE(9); return t[0] = 1, t[1] = 0, t[2] = 0, t[3] = 0, t[4] = 1, t[5] = 0, t[6] = 0, t[7] = 0, t[8] = 1, t }, o.fromMat4 = function(t, a) { return t[0] = a[0], t[1] = a[1], t[2] = a[2], t[3] = a[4], t[4] = a[5], t[5] = a[6], t[6] = a[8], t[7] = a[9], t[8] = a[10], t }, o.clone = function(t) { var a = new r.ARRAY_TYPE(9); return a[0] = t[0], a[1] = t[1], a[2] = t[2], a[3] = t[3], a[4] = t[4], a[5] = t[5], a[6] = t[6], a[7] = t[7], a[8] = t[8], a }, o.copy = function(t, a) { return t[0] = a[0], t[1] = a[1], t[2] = a[2], t[3] = a[3], t[4] = a[4], t[5] = a[5], t[6] = a[6], t[7] = a[7], t[8] = a[8], t }, o.fromValues = function(t, a, n, o, u, l, e, M, s) { var i = new r.ARRAY_TYPE(9); return i[0] = t, i[1] = a, i[2] = n, i[3] = o, i[4] = u, i[5] = l, i[6] = e, i[7] = M, i[8] = s, i }, o.set = function(t, a, n, r, o, u, l, e, M, s) { return t[0] = a, t[1] = n, t[2] = r, t[3] = o, t[4] = u, t[5] = l, t[6] = e, t[7] = M, t[8] = s, t }, o.identity = function(t) { return t[0] = 1, t[1] = 0, t[2] = 0, t[3] = 0, t[4] = 1, t[5] = 0, t[6] = 0, t[7] = 0, t[8] = 1, t }, o.transpose = function(t, a) { if (t === a) { var n = a[1], r = a[2], o = a[5]; t[1] = a[3], t[2] = a[6], t[3] = n, t[5] = a[7], t[6] = r, t[7] = o } else t[0] = a[0], t[1] = a[3], t[2] = a[6], t[3] = a[1], t[4] = a[4], t[5] = a[7], t[6] = a[2], t[7] = a[5], t[8] = a[8]; return t }, o.invert = function(t, a) { var n = a[0], r = a[1], o = a[2], u = a[3], l = a[4], e = a[5], M = a[6], s = a[7], i = a[8], c = i * l - e * s, h = -i * u + e * M, S = s * u - l * M, I = n * c + r * h + o * S; return I ? (I = 1 / I, t[0] = c * I, t[1] = (-i * r + o * s) * I, t[2] = (e * r - o * l) * I, t[3] = h * I, t[4] = (i * n - o * M) * I, t[5] = (-e * n + o * u) * I, t[6] = S * I, t[7] = (-s * n + r * M) * I, t[8] = (l * n - r * u) * I, t) : null }, o.adjoint = function(t, a) { var n = a[0], r = a[1], o = a[2], u = a[3], l = a[4], e = a[5], M = a[6], s = a[7], i = a[8]; return t[0] = l * i - e * s, t[1] = o * s - r * i, t[2] = r * e - o * l, t[3] = e * M - u * i, t[4] = n * i - o * M, t[5] = o * u - n * e, t[6] = u * s - l * M, t[7] = r * M - n * s, t[8] = n * l - r * u, t }, o.determinant = function(t) { var a = t[0], n = t[1], r = t[2], o = t[3], u = t[4], l = t[5], e = t[6], M = t[7], s = t[8]; return a * (s * u - l * M) + n * (-s * o + l * e) + r * (M * o - u * e) }, o.multiply = function(t, a, n) { var r = a[0], o = a[1], u = a[2], l = a[3], e = a[4], M = a[5], s = a[6], i = a[7], c = a[8], h = n[0], S = n[1], I = n[2], f = n[3], x = n[4], D = n[5], F = n[6], m = n[7], d = n[8]; return t[0] = h * r + S * l + I * s, t[1] = h * o + S * e + I * i, t[2] = h * u + S * M + I * c, t[3] = f * r + x * l + D * s, t[4] = f * o + x * e + D * i, t[5] = f * u + x * M + D * c, t[6] = F * r + m * l + d * s, t[7] = F * o + m * e + d * i, t[8] = F * u + m * M + d * c, t }, o.mul = o.multiply, o.translate = function(t, a, n) { var r = a[0], o = a[1], u = a[2], l = a[3], e = a[4], M = a[5], s = a[6], i = a[7], c = a[8], h = n[0], S = n[1]; return t[0] = r, t[1] = o, t[2] = u, t[3] = l, t[4] = e, t[5] = M, t[6] = h * r + S * l + s, t[7] = h * o + S * e + i, t[8] = h * u + S * M + c, t }, o.rotate = function(t, a, n) { var r = a[0], o = a[1], u = a[2], l = a[3], e = a[4], M = a[5], s = a[6], i = a[7], c = a[8], h = Math.sin(n), S = Math.cos(n); return t[0] = S * r + h * l, t[1] = S * o + h * e, t[2] = S * u + h * M, t[3] = S * l - h * r, t[4] = S * e - h * o, t[5] = S * M - h * u, t[6] = s, t[7] = i, t[8] = c, t }, o.scale = function(t, a, n) { var r = n[0], o = n[1]; return t[0] = r * a[0], t[1] = r * a[1], t[2] = r * a[2], t[3] = o * a[3], t[4] = o * a[4], t[5] = o * a[5], t[6] = a[6], t[7] = a[7], t[8] = a[8], t }, o.fromTranslation = function(t, a) { return t[0] = 1, t[1] = 0, t[2] = 0, t[3] = 0, t[4] = 1, t[5] = 0, t[6] = a[0], t[7] = a[1], t[8] = 1, t }, o.fromRotation = function(t, a) { var n = Math.sin(a), r = Math.cos(a); return t[0] = r, t[1] = n, t[2] = 0, t[3] = -n, t[4] = r, t[5] = 0, t[6] = 0, t[7] = 0, t[8] = 1, t }, o.fromScaling = function(t, a) { return t[0] = a[0], t[1] = 0, t[2] = 0, t[3] = 0, t[4] = a[1], t[5] = 0, t[6] = 0, t[7] = 0, t[8] = 1, t }, o.fromMat2d = function(t, a) { return t[0] = a[0], t[1] = a[1], t[2] = 0, t[3] = a[2], t[4] = a[3], t[5] = 0, t[6] = a[4], t[7] = a[5], t[8] = 1, t }, o.fromQuat = function(t, a) { var n = a[0], r = a[1], o = a[2], u = a[3], l = n + n, e = r + r, M = o + o, s = n * l, i = r * l, c = r * e, h = o * l, S = o * e, I = o * M, f = u * l, x = u * e, D = u * M; return t[0] = 1 - c - I, t[3] = i - D, t[6] = h + x, t[1] = i + D, t[4] = 1 - s - I, t[7] = S - f, t[2] = h - x, t[5] = S + f, t[8] = 1 - s - c, t }, o.normalFromMat4 = function(t, a) { var n = a[0], r = a[1], o = a[2], u = a[3], l = a[4], e = a[5], M = a[6], s = a[7], i = a[8], c = a[9], h = a[10], S = a[11], I = a[12], f = a[13], x = a[14], D = a[15], F = n * e - r * l, m = n * M - o * l, d = n * s - u * l, b = r * M - o * e, v = r * s - u * e, z = o * s - u * M, p = i * f - c * I, w = i * x - h * I, E = i * D - S * I, A = c * x - h * f, P = c * D - S * f, L = h * D - S * x, q = F * L - m * P + d * A + b * E - v * w + z * p; return q ? (q = 1 / q, t[0] = (e * L - M * P + s * A) * q, t[1] = (M * E - l * L - s * w) * q, t[2] = (l * P - e * E + s * p) * q, t[3] = (o * P - r * L - u * A) * q, t[4] = (n * L - o * E + u * w) * q, t[5] = (r * E - n * P - u * p) * q, t[6] = (f * z - x * v + D * b) * q, t[7] = (x * d - I * z - D * m) * q, t[8] = (I * v - f * d + D * F) * q, t) : null }, o.str = function(t) { return "mat3(" + t[0] + ", " + t[1] + ", " + t[2] + ", " + t[3] + ", " + t[4] + ", " + t[5] + ", " + t[6] + ", " + t[7] + ", " + t[8] + ")" }, o.frob = function(t) { return Math.sqrt(Math.pow(t[0], 2) + Math.pow(t[1], 2) + Math.pow(t[2], 2) + Math.pow(t[3], 2) + Math.pow(t[4], 2) + Math.pow(t[5], 2) + Math.pow(t[6], 2) + Math.pow(t[7], 2) + Math.pow(t[8], 2)) }, o.add = function(t, a, n) { return t[0] = a[0] + n[0], t[1] = a[1] + n[1], t[2] = a[2] + n[2], t[3] = a[3] + n[3], t[4] = a[4] + n[4], t[5] = a[5] + n[5], t[6] = a[6] + n[6], t[7] = a[7] + n[7], t[8] = a[8] + n[8], t }, o.subtract = function(t, a, n) { return t[0] = a[0] - n[0], t[1] = a[1] - n[1], t[2] = a[2] - n[2], t[3] = a[3] - n[3], t[4] = a[4] - n[4], t[5] = a[5] - n[5], t[6] = a[6] - n[6], t[7] = a[7] - n[7], t[8] = a[8] - n[8], t }, o.sub = o.subtract, o.multiplyScalar = function(t, a, n) { return t[0] = a[0] * n, t[1] = a[1] * n, t[2] = a[2] * n, t[3] = a[3] * n, t[4] = a[4] * n, t[5] = a[5] * n, t[6] = a[6] * n, t[7] = a[7] * n, t[8] = a[8] * n, t }, o.multiplyScalarAndAdd = function(t, a, n, r) { return t[0] = a[0] + n[0] * r, t[1] = a[1] + n[1] * r, t[2] = a[2] + n[2] * r, t[3] = a[3] + n[3] * r, t[4] = a[4] + n[4] * r, t[5] = a[5] + n[5] * r, t[6] = a[6] + n[6] * r, t[7] = a[7] + n[7] * r, t[8] = a[8] + n[8] * r, t }, o.exactEquals = function(t, a) { return t[0] === a[0] && t[1] === a[1] && t[2] === a[2] && t[3] === a[3] && t[4] === a[4] && t[5] === a[5] && t[6] === a[6] && t[7] === a[7] && t[8] === a[8] }, o.equals = function(t, a) { var n = t[0], o = t[1], u = t[2], l = t[3], e = t[4], M = t[5], s = t[6], i = t[7], c = t[8], h = a[0], S = a[1], I = a[2], f = a[3], x = a[4], D = a[5], F = t[6], m = a[7], d = a[8]; return Math.abs(n - h) <= r.EPSILON * Math.max(1, Math.abs(n), Math.abs(h)) && Math.abs(o - S) <= r.EPSILON * Math.max(1, Math.abs(o), Math.abs(S)) && Math.abs(u - I) <= r.EPSILON * Math.max(1, Math.abs(u), Math.abs(I)) && Math.abs(l - f) <= r.EPSILON * Math.max(1, Math.abs(l), Math.abs(f)) && Math.abs(e - x) <= r.EPSILON * Math.max(1, Math.abs(e), Math.abs(x)) && Math.abs(M - D) <= r.EPSILON * Math.max(1, Math.abs(M), Math.abs(D)) && Math.abs(s - F) <= r.EPSILON * Math.max(1, Math.abs(s), Math.abs(F)) && Math.abs(i - m) <= r.EPSILON * Math.max(1, Math.abs(i), Math.abs(m)) && Math.abs(c - d) <= r.EPSILON * Math.max(1, Math.abs(c), Math.abs(d)) }, t.exports = o }, function(t, a, n) {
                var r = n(1), o = { scalar: {}, SIMD: {} }; o.create = function() { var t = new r.ARRAY_TYPE(16); return t[0] = 1, t[1] = 0, t[2] = 0, t[3] = 0, t[4] = 0, t[5] = 1, t[6] = 0, t[7] = 0, t[8] = 0, t[9] = 0, t[10] = 1, t[11] = 0, t[12] = 0, t[13] = 0, t[14] = 0, t[15] = 1, t }, o.clone = function(t) { var a = new r.ARRAY_TYPE(16); return a[0] = t[0], a[1] = t[1], a[2] = t[2], a[3] = t[3], a[4] = t[4], a[5] = t[5], a[6] = t[6], a[7] = t[7], a[8] = t[8], a[9] = t[9], a[10] = t[10], a[11] = t[11], a[12] = t[12], a[13] = t[13], a[14] = t[14], a[15] = t[15], a }, o.copy = function(t, a) { return t[0] = a[0], t[1] = a[1], t[2] = a[2], t[3] = a[3], t[4] = a[4], t[5] = a[5], t[6] = a[6], t[7] = a[7], t[8] = a[8], t[9] = a[9], t[10] = a[10], t[11] = a[11], t[12] = a[12], t[13] = a[13], t[14] = a[14], t[15] = a[15], t }, o.fromValues = function(t, a, n, o, u, l, e, M, s, i, c, h, S, I, f, x) { var D = new r.ARRAY_TYPE(16); return D[0] = t, D[1] = a, D[2] = n, D[3] = o, D[4] = u, D[5] = l, D[6] = e, D[7] = M, D[8] = s, D[9] = i, D[10] = c, D[11] = h, D[12] = S, D[13] = I, D[14] = f, D[15] = x, D }, o.set = function(t, a, n, r, o, u, l, e, M, s, i, c, h, S, I, f, x) { return t[0] = a, t[1] = n, t[2] = r, t[3] = o, t[4] = u, t[5] = l, t[6] = e, t[7] = M, t[8] = s, t[9] = i, t[10] = c, t[11] = h, t[12] = S, t[13] = I, t[14] = f, t[15] = x, t }, o.identity = function(t) { return t[0] = 1, t[1] = 0, t[2] = 0, t[3] = 0, t[4] = 0, t[5] = 1, t[6] = 0, t[7] = 0, t[8] = 0, t[9] = 0, t[10] = 1, t[11] = 0, t[12] = 0, t[13] = 0, t[14] = 0, t[15] = 1, t }, o.scalar.transpose = function(t, a) { if (t === a) { var n = a[1], r = a[2], o = a[3], u = a[6], l = a[7], e = a[11]; t[1] = a[4], t[2] = a[8], t[3] = a[12], t[4] = n, t[6] = a[9], t[7] = a[13], t[8] = r, t[9] = u, t[11] = a[14], t[12] = o, t[13] = l, t[14] = e } else t[0] = a[0], t[1] = a[4], t[2] = a[8], t[3] = a[12], t[4] = a[1], t[5] = a[5], t[6] = a[9], t[7] = a[13], t[8] = a[2], t[9] = a[6], t[10] = a[10], t[11] = a[14], t[12] = a[3], t[13] = a[7], t[14] = a[11], t[15] = a[15]; return t }, o.SIMD.transpose = function(t, a) { var n, r, o, u, l, e, M, s, i, c; return n = SIMD.Float32x4.load(a, 0), r = SIMD.Float32x4.load(a, 4), o = SIMD.Float32x4.load(a, 8), u = SIMD.Float32x4.load(a, 12), l = SIMD.Float32x4.shuffle(n, r, 0, 1, 4, 5), e = SIMD.Float32x4.shuffle(o, u, 0, 1, 4, 5), M = SIMD.Float32x4.shuffle(l, e, 0, 2, 4, 6), s = SIMD.Float32x4.shuffle(l, e, 1, 3, 5, 7), SIMD.Float32x4.store(t, 0, M), SIMD.Float32x4.store(t, 4, s), l = SIMD.Float32x4.shuffle(n, r, 2, 3, 6, 7), e = SIMD.Float32x4.shuffle(o, u, 2, 3, 6, 7), i = SIMD.Float32x4.shuffle(l, e, 0, 2, 4, 6), c = SIMD.Float32x4.shuffle(l, e, 1, 3, 5, 7), SIMD.Float32x4.store(t, 8, i), SIMD.Float32x4.store(t, 12, c), t }, o.transpose = r.USE_SIMD ? o.SIMD.transpose : o.scalar.transpose, o.scalar.invert = function(t, a) { var n = a[0], r = a[1], o = a[2], u = a[3], l = a[4], e = a[5], M = a[6], s = a[7], i = a[8], c = a[9], h = a[10], S = a[11], I = a[12], f = a[13], x = a[14], D = a[15], F = n * e - r * l, m = n * M - o * l, d = n * s - u * l, b = r * M - o * e, v = r * s - u * e, z = o * s - u * M, p = i * f - c * I, w = i * x - h * I, E = i * D - S * I, A = c * x - h * f, P = c * D - S * f, L = h * D - S * x, q = F * L - m * P + d * A + b * E - v * w + z * p; return q ? (q = 1 / q, t[0] = (e * L - M * P + s * A) * q, t[1] = (o * P - r * L - u * A) * q, t[2] = (f * z - x * v + D * b) * q, t[3] = (h * v - c * z - S * b) * q, t[4] = (M * E - l * L - s * w) * q, t[5] = (n * L - o * E + u * w) * q, t[6] = (x * d - I * z - D * m) * q, t[7] = (i * z - h * d + S * m) * q, t[8] = (l * P - e * E + s * p) * q, t[9] = (r * E - n * P - u * p) * q, t[10] = (I * v - f * d + D * F) * q, t[11] = (c * d - i * v - S * F) * q, t[12] = (e * w - l * A - M * p) * q, t[13] = (n * A - r * w + o * p) * q, t[14] = (f * m - I * b - x * F) * q, t[15] = (i * b - c * m + h * F) * q, t) : null }, o.SIMD.invert = function(t, a) { var n, r, o, u, l, e, M, s, i, c, h = SIMD.Float32x4.load(a, 0), S = SIMD.Float32x4.load(a, 4), I = SIMD.Float32x4.load(a, 8), f = SIMD.Float32x4.load(a, 12); return l = SIMD.Float32x4.shuffle(h, S, 0, 1, 4, 5), r = SIMD.Float32x4.shuffle(I, f, 0, 1, 4, 5), n = SIMD.Float32x4.shuffle(l, r, 0, 2, 4, 6), r = SIMD.Float32x4.shuffle(r, l, 1, 3, 5, 7), l = SIMD.Float32x4.shuffle(h, S, 2, 3, 6, 7), u = SIMD.Float32x4.shuffle(I, f, 2, 3, 6, 7), o = SIMD.Float32x4.shuffle(l, u, 0, 2, 4, 6), u = SIMD.Float32x4.shuffle(u, l, 1, 3, 5, 7), l = SIMD.Float32x4.mul(o, u), l = SIMD.Float32x4.swizzle(l, 1, 0, 3, 2), e = SIMD.Float32x4.mul(r, l), M = SIMD.Float32x4.mul(n, l), l = SIMD.Float32x4.swizzle(l, 2, 3, 0, 1), e = SIMD.Float32x4.sub(SIMD.Float32x4.mul(r, l), e), M = SIMD.Float32x4.sub(SIMD.Float32x4.mul(n, l), M), M = SIMD.Float32x4.swizzle(M, 2, 3, 0, 1), l = SIMD.Float32x4.mul(r, o), l = SIMD.Float32x4.swizzle(l, 1, 0, 3, 2), e = SIMD.Float32x4.add(SIMD.Float32x4.mul(u, l), e), i = SIMD.Float32x4.mul(n, l), l = SIMD.Float32x4.swizzle(l, 2, 3, 0, 1), e = SIMD.Float32x4.sub(e, SIMD.Float32x4.mul(u, l)), i = SIMD.Float32x4.sub(SIMD.Float32x4.mul(n, l), i), i = SIMD.Float32x4.swizzle(i, 2, 3, 0, 1), l = SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(r, 2, 3, 0, 1), u), l = SIMD.Float32x4.swizzle(l, 1, 0, 3, 2), o = SIMD.Float32x4.swizzle(o, 2, 3, 0, 1), e = SIMD.Float32x4.add(SIMD.Float32x4.mul(o, l), e), s = SIMD.Float32x4.mul(n, l), l = SIMD.Float32x4.swizzle(l, 2, 3, 0, 1), e = SIMD.Float32x4.sub(e, SIMD.Float32x4.mul(o, l)), s = SIMD.Float32x4.sub(SIMD.Float32x4.mul(n, l), s), s = SIMD.Float32x4.swizzle(s, 2, 3, 0, 1), l = SIMD.Float32x4.mul(n, r), l = SIMD.Float32x4.swizzle(l, 1, 0, 3, 2), s = SIMD.Float32x4.add(SIMD.Float32x4.mul(u, l), s), i = SIMD.Float32x4.sub(SIMD.Float32x4.mul(o, l), i), l = SIMD.Float32x4.swizzle(l, 2, 3, 0, 1), s = SIMD.Float32x4.sub(SIMD.Float32x4.mul(u, l), s), i = SIMD.Float32x4.sub(i, SIMD.Float32x4.mul(o, l)), l = SIMD.Float32x4.mul(n, u), l = SIMD.Float32x4.swizzle(l, 1, 0, 3, 2), M = SIMD.Float32x4.sub(M, SIMD.Float32x4.mul(o, l)), s = SIMD.Float32x4.add(SIMD.Float32x4.mul(r, l), s), l = SIMD.Float32x4.swizzle(l, 2, 3, 0, 1), M = SIMD.Float32x4.add(SIMD.Float32x4.mul(o, l), M), s = SIMD.Float32x4.sub(s, SIMD.Float32x4.mul(r, l)), l = SIMD.Float32x4.mul(n, o), l = SIMD.Float32x4.swizzle(l, 1, 0, 3, 2), M = SIMD.Float32x4.add(SIMD.Float32x4.mul(u, l), M), i = SIMD.Float32x4.sub(i, SIMD.Float32x4.mul(r, l)), l = SIMD.Float32x4.swizzle(l, 2, 3, 0, 1), M = SIMD.Float32x4.sub(M, SIMD.Float32x4.mul(u, l)), i = SIMD.Float32x4.add(SIMD.Float32x4.mul(r, l), i), c = SIMD.Float32x4.mul(n, e), c = SIMD.Float32x4.add(SIMD.Float32x4.swizzle(c, 2, 3, 0, 1), c), c = SIMD.Float32x4.add(SIMD.Float32x4.swizzle(c, 1, 0, 3, 2), c), l = SIMD.Float32x4.reciprocalApproximation(c), c = SIMD.Float32x4.sub(SIMD.Float32x4.add(l, l), SIMD.Float32x4.mul(c, SIMD.Float32x4.mul(l, l))), (c = SIMD.Float32x4.swizzle(c, 0, 0, 0, 0)) ? (SIMD.Float32x4.store(t, 0, SIMD.Float32x4.mul(c, e)), SIMD.Float32x4.store(t, 4, SIMD.Float32x4.mul(c, M)), SIMD.Float32x4.store(t, 8, SIMD.Float32x4.mul(c, s)), SIMD.Float32x4.store(t, 12, SIMD.Float32x4.mul(c, i)), t) : null }, o.invert = r.USE_SIMD ? o.SIMD.invert : o.scalar.invert, o.scalar.adjoint = function(t, a) { var n = a[0], r = a[1], o = a[2], u = a[3], l = a[4], e = a[5], M = a[6], s = a[7], i = a[8], c = a[9], h = a[10], S = a[11], I = a[12], f = a[13], x = a[14], D = a[15]; return t[0] = e * (h * D - S * x) - c * (M * D - s * x) + f * (M * S - s * h), t[1] = -(r * (h * D - S * x) - c * (o * D - u * x) + f * (o * S - u * h)), t[2] = r * (M * D - s * x) - e * (o * D - u * x) + f * (o * s - u * M), t[3] = -(r * (M * S - s * h) - e * (o * S - u * h) + c * (o * s - u * M)), t[4] = -(l * (h * D - S * x) - i * (M * D - s * x) + I * (M * S - s * h)), t[5] = n * (h * D - S * x) - i * (o * D - u * x) + I * (o * S - u * h), t[6] = -(n * (M * D - s * x) - l * (o * D - u * x) + I * (o * s - u * M)), t[7] = n * (M * S - s * h) - l * (o * S - u * h) + i * (o * s - u * M), t[8] = l * (c * D - S * f) - i * (e * D - s * f) + I * (e * S - s * c), t[9] = -(n * (c * D - S * f) - i * (r * D - u * f) + I * (r * S - u * c)), t[10] = n * (e * D - s * f) - l * (r * D - u * f) + I * (r * s - u * e), t[11] = -(n * (e * S - s * c) - l * (r * S - u * c) + i * (r * s - u * e)), t[12] = -(l * (c * x - h * f) - i * (e * x - M * f) + I * (e * h - M * c)), t[13] = n * (c * x - h * f) - i * (r * x - o * f) + I * (r * h - o * c), t[14] = -(n * (e * x - M * f) - l * (r * x - o * f) + I * (r * M - o * e)), t[15] = n * (e * h - M * c) - l * (r * h - o * c) + i * (r * M - o * e), t }, o.SIMD.adjoint = function(t, a) { var n, r, o, u, l, e, M, s, i, c, h, S, I; return n = SIMD.Float32x4.load(a, 0), r = SIMD.Float32x4.load(a, 4), o = SIMD.Float32x4.load(a, 8), u = SIMD.Float32x4.load(a, 12), i = SIMD.Float32x4.shuffle(n, r, 0, 1, 4, 5), e = SIMD.Float32x4.shuffle(o, u, 0, 1, 4, 5), l = SIMD.Float32x4.shuffle(i, e, 0, 2, 4, 6), e = SIMD.Float32x4.shuffle(e, i, 1, 3, 5, 7), i = SIMD.Float32x4.shuffle(n, r, 2, 3, 6, 7), s = SIMD.Float32x4.shuffle(o, u, 2, 3, 6, 7), M = SIMD.Float32x4.shuffle(i, s, 0, 2, 4, 6), s = SIMD.Float32x4.shuffle(s, i, 1, 3, 5, 7), i = SIMD.Float32x4.mul(M, s), i = SIMD.Float32x4.swizzle(i, 1, 0, 3, 2), c = SIMD.Float32x4.mul(e, i), h = SIMD.Float32x4.mul(l, i), i = SIMD.Float32x4.swizzle(i, 2, 3, 0, 1), c = SIMD.Float32x4.sub(SIMD.Float32x4.mul(e, i), c), h = SIMD.Float32x4.sub(SIMD.Float32x4.mul(l, i), h), h = SIMD.Float32x4.swizzle(h, 2, 3, 0, 1), i = SIMD.Float32x4.mul(e, M), i = SIMD.Float32x4.swizzle(i, 1, 0, 3, 2), c = SIMD.Float32x4.add(SIMD.Float32x4.mul(s, i), c), I = SIMD.Float32x4.mul(l, i), i = SIMD.Float32x4.swizzle(i, 2, 3, 0, 1), c = SIMD.Float32x4.sub(c, SIMD.Float32x4.mul(s, i)), I = SIMD.Float32x4.sub(SIMD.Float32x4.mul(l, i), I), I = SIMD.Float32x4.swizzle(I, 2, 3, 0, 1), i = SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(e, 2, 3, 0, 1), s), i = SIMD.Float32x4.swizzle(i, 1, 0, 3, 2), M = SIMD.Float32x4.swizzle(M, 2, 3, 0, 1), c = SIMD.Float32x4.add(SIMD.Float32x4.mul(M, i), c), S = SIMD.Float32x4.mul(l, i), i = SIMD.Float32x4.swizzle(i, 2, 3, 0, 1), c = SIMD.Float32x4.sub(c, SIMD.Float32x4.mul(M, i)), S = SIMD.Float32x4.sub(SIMD.Float32x4.mul(l, i), S), S = SIMD.Float32x4.swizzle(S, 2, 3, 0, 1), i = SIMD.Float32x4.mul(l, e), i = SIMD.Float32x4.swizzle(i, 1, 0, 3, 2), S = SIMD.Float32x4.add(SIMD.Float32x4.mul(s, i), S), I = SIMD.Float32x4.sub(SIMD.Float32x4.mul(M, i), I), i = SIMD.Float32x4.swizzle(i, 2, 3, 0, 1), S = SIMD.Float32x4.sub(SIMD.Float32x4.mul(s, i), S), I = SIMD.Float32x4.sub(I, SIMD.Float32x4.mul(M, i)), i = SIMD.Float32x4.mul(l, s), i = SIMD.Float32x4.swizzle(i, 1, 0, 3, 2), h = SIMD.Float32x4.sub(h, SIMD.Float32x4.mul(M, i)), S = SIMD.Float32x4.add(SIMD.Float32x4.mul(e, i), S), i = SIMD.Float32x4.swizzle(i, 2, 3, 0, 1), h = SIMD.Float32x4.add(SIMD.Float32x4.mul(M, i), h), S = SIMD.Float32x4.sub(S, SIMD.Float32x4.mul(e, i)), i = SIMD.Float32x4.mul(l, M), i = SIMD.Float32x4.swizzle(i, 1, 0, 3, 2), h = SIMD.Float32x4.add(SIMD.Float32x4.mul(s, i), h), I = SIMD.Float32x4.sub(I, SIMD.Float32x4.mul(e, i)), i = SIMD.Float32x4.swizzle(i, 2, 3, 0, 1), h = SIMD.Float32x4.sub(h, SIMD.Float32x4.mul(s, i)), I = SIMD.Float32x4.add(SIMD.Float32x4.mul(e, i), I), SIMD.Float32x4.store(t, 0, c), SIMD.Float32x4.store(t, 4, h), SIMD.Float32x4.store(t, 8, S), SIMD.Float32x4.store(t, 12, I), t }, o.adjoint = r.USE_SIMD ? o.SIMD.adjoint : o.scalar.adjoint, o.determinant = function(t) { var a = t[0], n = t[1], r = t[2], o = t[3], u = t[4], l = t[5], e = t[6], M = t[7], s = t[8], i = t[9], c = t[10], h = t[11], S = t[12], I = t[13], f = t[14], x = t[15], D = a * l - n * u, F = a * e - r * u, m = a * M - o * u, d = n * e - r * l, b = n * M - o * l, v = r * M - o * e, z = s * I - i * S, p = s * f - c * S, w = s * x - h * S, E = i * f - c * I, A = i * x - h * I, P = c * x - h * f; return D * P - F * A + m * E + d * w - b * p + v * z }, o.SIMD.multiply = function(t, a, n) { var r = SIMD.Float32x4.load(a, 0), o = SIMD.Float32x4.load(a, 4), u = SIMD.Float32x4.load(a, 8), l = SIMD.Float32x4.load(a, 12), e = SIMD.Float32x4.load(n, 0), M = SIMD.Float32x4.add(SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(e, 0, 0, 0, 0), r), SIMD.Float32x4.add(SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(e, 1, 1, 1, 1), o), SIMD.Float32x4.add(SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(e, 2, 2, 2, 2), u), SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(e, 3, 3, 3, 3), l)))); SIMD.Float32x4.store(t, 0, M); var s = SIMD.Float32x4.load(n, 4), i = SIMD.Float32x4.add(SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(s, 0, 0, 0, 0), r), SIMD.Float32x4.add(SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(s, 1, 1, 1, 1), o), SIMD.Float32x4.add(SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(s, 2, 2, 2, 2), u), SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(s, 3, 3, 3, 3), l)))); SIMD.Float32x4.store(t, 4, i); var c = SIMD.Float32x4.load(n, 8), h = SIMD.Float32x4.add(SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(c, 0, 0, 0, 0), r), SIMD.Float32x4.add(SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(c, 1, 1, 1, 1), o), SIMD.Float32x4.add(SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(c, 2, 2, 2, 2), u), SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(c, 3, 3, 3, 3), l)))); SIMD.Float32x4.store(t, 8, h); var S = SIMD.Float32x4.load(n, 12), I = SIMD.Float32x4.add(SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(S, 0, 0, 0, 0), r), SIMD.Float32x4.add(SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(S, 1, 1, 1, 1), o), SIMD.Float32x4.add(SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(S, 2, 2, 2, 2), u), SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(S, 3, 3, 3, 3), l)))); return SIMD.Float32x4.store(t, 12, I), t }, o.scalar.multiply = function(t, a, n) { var r = a[0], o = a[1], u = a[2], l = a[3], e = a[4], M = a[5], s = a[6], i = a[7], c = a[8], h = a[9], S = a[10], I = a[11], f = a[12], x = a[13], D = a[14], F = a[15], m = n[0], d = n[1], b = n[2], v = n[3]; return t[0] = m * r + d * e + b * c + v * f, t[1] = m * o + d * M + b * h + v * x, t[2] = m * u + d * s + b * S + v * D, t[3] = m * l + d * i + b * I + v * F, m = n[4], d = n[5], b = n[6], v = n[7], t[4] = m * r + d * e + b * c + v * f, t[5] = m * o + d * M + b * h + v * x, t[6] = m * u + d * s + b * S + v * D, t[7] = m * l + d * i + b * I + v * F, m = n[8], d = n[9], b = n[10], v = n[11], t[8] = m * r + d * e + b * c + v * f, t[9] = m * o + d * M + b * h + v * x, t[10] = m * u + d * s + b * S + v * D, t[11] = m * l + d * i + b * I + v * F, m = n[12], d = n[13], b = n[14], v = n[15], t[12] = m * r + d * e + b * c + v * f, t[13] = m * o + d * M + b * h + v * x, t[14] = m * u + d * s + b * S + v * D, t[15] = m * l + d * i + b * I + v * F, t }, o.multiply = r.USE_SIMD ? o.SIMD.multiply : o.scalar.multiply, o.mul = o.multiply, o.scalar.translate = function(t, a, n) { var r, o, u, l, e, M, s, i, c, h, S, I, f = n[0], x = n[1], D = n[2]; return a === t ? (t[12] = a[0] * f + a[4] * x + a[8] * D + a[12], t[13] = a[1] * f + a[5] * x + a[9] * D + a[13], t[14] = a[2] * f + a[6] * x + a[10] * D + a[14], t[15] = a[3] * f + a[7] * x + a[11] * D + a[15]) : (r = a[0], o = a[1], u = a[2], l = a[3], e = a[4], M = a[5], s = a[6], i = a[7], c = a[8], h = a[9], S = a[10], I = a[11], t[0] = r, t[1] = o, t[2] = u, t[3] = l, t[4] = e, t[5] = M, t[6] = s, t[7] = i, t[8] = c, t[9] = h, t[10] = S, t[11] = I, t[12] = r * f + e * x + c * D + a[12], t[13] = o * f + M * x + h * D + a[13], t[14] = u * f + s * x + S * D + a[14], t[15] = l * f + i * x + I * D + a[15]), t }, o.SIMD.translate = function(t, a, n) { var r = SIMD.Float32x4.load(a, 0), o = SIMD.Float32x4.load(a, 4), u = SIMD.Float32x4.load(a, 8), l = SIMD.Float32x4.load(a, 12), e = SIMD.Float32x4(n[0], n[1], n[2], 0); a !== t && (t[0] = a[0], t[1] = a[1], t[2] = a[2], t[3] = a[3], t[4] = a[4], t[5] = a[5], t[6] = a[6], t[7] = a[7], t[8] = a[8], t[9] = a[9], t[10] = a[10], t[11] = a[11]), r = SIMD.Float32x4.mul(r, SIMD.Float32x4.swizzle(e, 0, 0, 0, 0)), o = SIMD.Float32x4.mul(o, SIMD.Float32x4.swizzle(e, 1, 1, 1, 1)), u = SIMD.Float32x4.mul(u, SIMD.Float32x4.swizzle(e, 2, 2, 2, 2)); var M = SIMD.Float32x4.add(r, SIMD.Float32x4.add(o, SIMD.Float32x4.add(u, l))); return SIMD.Float32x4.store(t, 12, M), t }, o.translate = r.USE_SIMD ? o.SIMD.translate : o.scalar.translate, o.scalar.scale = function(t, a, n) { var r = n[0], o = n[1], u = n[2]; return t[0] = a[0] * r, t[1] = a[1] * r, t[2] = a[2] * r, t[3] = a[3] * r, t[4] = a[4] * o, t[5] = a[5] * o, t[6] = a[6] * o, t[7] = a[7] * o, t[8] = a[8] * u, t[9] = a[9] * u, t[10] = a[10] * u, t[11] = a[11] * u, t[12] = a[12], t[13] = a[13], t[14] = a[14], t[15] = a[15], t }, o.SIMD.scale = function(t, a, n) { var r, o, u, l = SIMD.Float32x4(n[0], n[1], n[2], 0); return r = SIMD.Float32x4.load(a, 0), SIMD.Float32x4.store(t, 0, SIMD.Float32x4.mul(r, SIMD.Float32x4.swizzle(l, 0, 0, 0, 0))), o = SIMD.Float32x4.load(a, 4), SIMD.Float32x4.store(t, 4, SIMD.Float32x4.mul(o, SIMD.Float32x4.swizzle(l, 1, 1, 1, 1))), u = SIMD.Float32x4.load(a, 8), SIMD.Float32x4.store(t, 8, SIMD.Float32x4.mul(u, SIMD.Float32x4.swizzle(l, 2, 2, 2, 2))), t[12] = a[12], t[13] = a[13], t[14] = a[14], t[15] = a[15], t }, o.scale = r.USE_SIMD ? o.SIMD.scale : o.scalar.scale, o.rotate = function(t, a, n, o) { var u, l, e, M, s, i, c, h, S, I, f, x, D, F, m, d, b, v, z, p, w, E, A, P, L = o[0], q = o[1], R = o[2], N = Math.sqrt(L * L + q * q + R * R); return Math.abs(N) < r.EPSILON ? null : (N = 1 / N, L *= N, q *= N, R *= N, u = Math.sin(n), l = Math.cos(n), e = 1 - l, M = a[0], s = a[1], i = a[2], c = a[3], h = a[4], S = a[5], I = a[6], f = a[7], x = a[8], D = a[9], F = a[10], m = a[11], d = L * L * e + l, b = q * L * e + R * u, v = R * L * e - q * u, z = L * q * e - R * u, p = q * q * e + l, w = R * q * e + L * u, E = L * R * e + q * u, A = q * R * e - L * u, P = R * R * e + l, t[0] = M * d + h * b + x * v, t[1] = s * d + S * b + D * v, t[2] = i * d + I * b + F * v, t[3] = c * d + f * b + m * v, t[4] = M * z + h * p + x * w, t[5] = s * z + S * p + D * w, t[6] = i * z + I * p + F * w, t[7] = c * z + f * p + m * w, t[8] = M * E + h * A + x * P, t[9] = s * E + S * A + D * P, t[10] = i * E + I * A + F * P, t[11] = c * E + f * A + m * P, a !== t && (t[12] = a[12], t[13] = a[13], t[14] = a[14], t[15] = a[15]), t) }, o.scalar.rotateX = function(t, a, n) { var r = Math.sin(n), o = Math.cos(n), u = a[4], l = a[5], e = a[6], M = a[7], s = a[8], i = a[9], c = a[10], h = a[11]; return a !== t && (t[0] = a[0], t[1] = a[1], t[2] = a[2], t[3] = a[3], t[12] = a[12], t[13] = a[13], t[14] = a[14], t[15] = a[15]), t[4] = u * o + s * r, t[5] = l * o + i * r, t[6] = e * o + c * r, t[7] = M * o + h * r, t[8] = s * o - u * r, t[9] = i * o - l * r, t[10] = c * o - e * r, t[11] = h * o - M * r, t }, o.SIMD.rotateX = function(t, a, n) { var r = SIMD.Float32x4.splat(Math.sin(n)), o = SIMD.Float32x4.splat(Math.cos(n)); a !== t && (t[0] = a[0], t[1] = a[1], t[2] = a[2], t[3] = a[3], t[12] = a[12], t[13] = a[13], t[14] = a[14], t[15] = a[15]); var u = SIMD.Float32x4.load(a, 4), l = SIMD.Float32x4.load(a, 8); return SIMD.Float32x4.store(t, 4, SIMD.Float32x4.add(SIMD.Float32x4.mul(u, o), SIMD.Float32x4.mul(l, r))), SIMD.Float32x4.store(t, 8, SIMD.Float32x4.sub(SIMD.Float32x4.mul(l, o), SIMD.Float32x4.mul(u, r))), t }, o.rotateX = r.USE_SIMD ? o.SIMD.rotateX : o.scalar.rotateX, o.scalar.rotateY = function(t, a, n) { var r = Math.sin(n), o = Math.cos(n), u = a[0], l = a[1], e = a[2], M = a[3], s = a[8], i = a[9], c = a[10], h = a[11]; return a !== t && (t[4] = a[4], t[5] = a[5], t[6] = a[6], t[7] = a[7], t[12] = a[12], t[13] = a[13], t[14] = a[14], t[15] = a[15]), t[0] = u * o - s * r, t[1] = l * o - i * r, t[2] = e * o - c * r, t[3] = M * o - h * r, t[8] = u * r + s * o, t[9] = l * r + i * o, t[10] = e * r + c * o, t[11] = M * r + h * o, t }, o.SIMD.rotateY = function(t, a, n) { var r = SIMD.Float32x4.splat(Math.sin(n)), o = SIMD.Float32x4.splat(Math.cos(n)); a !== t && (t[4] = a[4], t[5] = a[5], t[6] = a[6], t[7] = a[7], t[12] = a[12], t[13] = a[13], t[14] = a[14], t[15] = a[15]); var u = SIMD.Float32x4.load(a, 0), l = SIMD.Float32x4.load(a, 8); return SIMD.Float32x4.store(t, 0, SIMD.Float32x4.sub(SIMD.Float32x4.mul(u, o), SIMD.Float32x4.mul(l, r))), SIMD.Float32x4.store(t, 8, SIMD.Float32x4.add(SIMD.Float32x4.mul(u, r), SIMD.Float32x4.mul(l, o))), t }, o.rotateY = r.USE_SIMD ? o.SIMD.rotateY : o.scalar.rotateY, o.scalar.rotateZ = function(t, a, n) { var r = Math.sin(n), o = Math.cos(n), u = a[0], l = a[1], e = a[2], M = a[3], s = a[4], i = a[5], c = a[6], h = a[7]; return a !== t && (t[8] = a[8], t[9] = a[9], t[10] = a[10], t[11] = a[11], t[12] = a[12], t[13] = a[13], t[14] = a[14], t[15] = a[15]), t[0] = u * o + s * r, t[1] = l * o + i * r, t[2] = e * o + c * r, t[3] = M * o + h * r, t[4] = s * o - u * r, t[5] = i * o - l * r, t[6] = c * o - e * r, t[7] = h * o - M * r, t }, o.SIMD.rotateZ = function(t, a, n) { var r = SIMD.Float32x4.splat(Math.sin(n)), o = SIMD.Float32x4.splat(Math.cos(n)); a !== t && (t[8] = a[8], t[9] = a[9], t[10] = a[10], t[11] = a[11], t[12] = a[12], t[13] = a[13], t[14] = a[14], t[15] = a[15]); var u = SIMD.Float32x4.load(a, 0), l = SIMD.Float32x4.load(a, 4); return SIMD.Float32x4.store(t, 0, SIMD.Float32x4.add(SIMD.Float32x4.mul(u, o), SIMD.Float32x4.mul(l, r))), SIMD.Float32x4.store(t, 4, SIMD.Float32x4.sub(SIMD.Float32x4.mul(l, o), SIMD.Float32x4.mul(u, r))), t }, o.rotateZ = r.USE_SIMD ? o.SIMD.rotateZ : o.scalar.rotateZ, o.fromTranslation = function(t, a) { return t[0] = 1, t[1] = 0, t[2] = 0, t[3] = 0, t[4] = 0, t[5] = 1, t[6] = 0, t[7] = 0, t[8] = 0, t[9] = 0, t[10] = 1, t[11] = 0, t[12] = a[0], t[13] = a[1], t[14] = a[2], t[15] = 1, t }, o.fromScaling = function(t, a) { return t[0] = a[0], t[1] = 0, t[2] = 0, t[3] = 0, t[4] = 0, t[5] = a[1], t[6] = 0, t[7] = 0, t[8] = 0, t[9] = 0, t[10] = a[2], t[11] = 0, t[12] = 0, t[13] = 0, t[14] = 0, t[15] = 1, t }, o.fromRotation = function(t, a, n) { var o, u, l, e = n[0], M = n[1], s = n[2], i = Math.sqrt(e * e + M * M + s * s); return Math.abs(i) < r.EPSILON ? null : (i = 1 / i, e *= i, M *= i, s *= i, o = Math.sin(a), u = Math.cos(a), l = 1 - u, t[0] = e * e * l + u, t[1] = M * e * l + s * o, t[2] = s * e * l - M * o, t[3] = 0, t[4] = e * M * l - s * o, t[5] = M * M * l + u, t[6] = s * M * l + e * o, t[7] = 0, t[8] = e * s * l + M * o, t[9] = M * s * l - e * o, t[10] = s * s * l + u, t[11] = 0, t[12] = 0, t[13] = 0, t[14] = 0, t[15] = 1, t) }, o.fromXRotation = function(t, a) { var n = Math.sin(a), r = Math.cos(a); return t[0] = 1, t[1] = 0, t[2] = 0, t[3] = 0, t[4] = 0, t[5] = r, t[6] = n, t[7] = 0, t[8] = 0, t[9] = -n, t[10] = r, t[11] = 0, t[12] = 0, t[13] = 0, t[14] = 0, t[15] = 1, t }, o.fromYRotation = function(t, a) { var n = Math.sin(a), r = Math.cos(a); return t[0] = r, t[1] = 0, t[2] = -n, t[3] = 0, t[4] = 0, t[5] = 1, t[6] = 0, t[7] = 0, t[8] = n, t[9] = 0, t[10] = r, t[11] = 0, t[12] = 0, t[13] = 0, t[14] = 0, t[15] = 1, t }, o.fromZRotation = function(t, a) { var n = Math.sin(a), r = Math.cos(a); return t[0] = r, t[1] = n, t[2] = 0, t[3] = 0, t[4] = -n, t[5] = r, t[6] = 0, t[7] = 0, t[8] = 0, t[9] = 0, t[10] = 1, t[11] = 0, t[12] = 0, t[13] = 0, t[14] = 0, t[15] = 1, t }, o.fromRotationTranslation = function(t, a, n) { var r = a[0], o = a[1], u = a[2], l = a[3], e = r + r, M = o + o, s = u + u, i = r * e, c = r * M, h = r * s, S = o * M, I = o * s, f = u * s, x = l * e, D = l * M, F = l * s; return t[0] = 1 - (S + f), t[1] = c + F, t[2] = h - D, t[3] = 0, t[4] = c - F, t[5] = 1 - (i + f), t[6] = I + x, t[7] = 0, t[8] = h + D, t[9] = I - x, t[10] = 1 - (i + S), t[11] = 0, t[12] = n[0], t[13] = n[1], t[14] = n[2], t[15] = 1, t }, o.getTranslation = function(t, a) { return t[0] = a[12], t[1] = a[13], t[2] = a[14], t }, o.getRotation = function(t, a) { var n = a[0] + a[5] + a[10], r = 0; return n > 0 ? (r = 2 * Math.sqrt(n + 1), t[3] = .25 * r, t[0] = (a[6] - a[9]) / r, t[1] = (a[8] - a[2]) / r, t[2] = (a[1] - a[4]) / r) : a[0] > a[5] & a[0] > a[10] ? (r = 2 * Math.sqrt(1 + a[0] - a[5] - a[10]), t[3] = (a[6] - a[9]) / r, t[0] = .25 * r, t[1] = (a[1] + a[4]) / r, t[2] = (a[8] + a[2]) / r) : a[5] > a[10] ? (r = 2 * Math.sqrt(1 + a[5] - a[0] - a[10]), t[3] = (a[8] - a[2]) / r, t[0] = (a[1] + a[4]) / r, t[1] = .25 * r, t[2] = (a[6] + a[9]) / r) : (r = 2 * Math.sqrt(1 + a[10] - a[0] - a[5]), t[3] = (a[1] - a[4]) / r, t[0] = (a[8] + a[2]) / r, t[1] = (a[6] + a[9]) / r, t[2] = .25 * r), t }, o.fromRotationTranslationScale = function(t, a, n, r) { var o = a[0], u = a[1], l = a[2], e = a[3], M = o + o, s = u + u, i = l + l, c = o * M, h = o * s, S = o * i, I = u * s, f = u * i, x = l * i, D = e * M, F = e * s, m = e * i, d = r[0], b = r[1], v = r[2]; return t[0] = (1 - (I + x)) * d, t[1] = (h + m) * d, t[2] = (S - F) * d, t[3] = 0, t[4] = (h - m) * b, t[5] = (1 - (c + x)) * b, t[6] = (f + D) * b, t[7] = 0, t[8] = (S + F) * v, t[9] = (f - D) * v, t[10] = (1 - (c + I)) * v, t[11] = 0, t[12] = n[0], t[13] = n[1], t[14] = n[2], t[15] = 1, t }, o.fromRotationTranslationScaleOrigin = function(t, a, n, r, o) {
                        var u = a[0], l = a[1], e = a[2], M = a[3], s = u + u, i = l + l, c = e + e, h = u * s, S = u * i, I = u * c, f = l * i, x = l * c, D = e * c, F = M * s, m = M * i, d = M * c, b = r[0], v = r[1], z = r[2], p = o[0], w = o[1], E = o[2]; return t[0] = (1 - (f + D)) * b, t[1] = (S + d) * b, t[2] = (I - m) * b, t[3] = 0, t[4] = (S - d) * v, t[5] = (1 - (h + D)) * v, t[6] = (x + F) * v, t[7] = 0, t[8] = (I + m) * z, t[9] = (x - F) * z, t[10] = (1 - (h + f)) * z, t[11] = 0, t[12] = n[0] + p - (t[0] * p + t[4] * w + t[8] * E), t[13] = n[1] + w - (t[1] * p + t[5] * w + t[9] * E), t[14] = n[2] + E - (t[2] * p + t[6] * w + t[10] * E), t[15] = 1, t
                }, o.fromQuat = function(t, a) { var n = a[0], r = a[1], o = a[2], u = a[3], l = n + n, e = r + r, M = o + o, s = n * l, i = r * l, c = r * e, h = o * l, S = o * e, I = o * M, f = u * l, x = u * e, D = u * M; return t[0] = 1 - c - I, t[1] = i + D, t[2] = h - x, t[3] = 0, t[4] = i - D, t[5] = 1 - s - I, t[6] = S + f, t[7] = 0, t[8] = h + x, t[9] = S - f, t[10] = 1 - s - c, t[11] = 0, t[12] = 0, t[13] = 0, t[14] = 0, t[15] = 1, t }, o.frustum = function(t, a, n, r, o, u, l) { var e = 1 / (n - a), M = 1 / (o - r), s = 1 / (u - l); return t[0] = 2 * u * e, t[1] = 0, t[2] = 0, t[3] = 0, t[4] = 0, t[5] = 2 * u * M, t[6] = 0, t[7] = 0, t[8] = (n + a) * e, t[9] = (o + r) * M, t[10] = (l + u) * s, t[11] = -1, t[12] = 0, t[13] = 0, t[14] = l * u * 2 * s, t[15] = 0, t }, o.perspective = function(t, a, n, r, o) { var u = 1 / Math.tan(a / 2), l = 1 / (r - o); return t[0] = u / n, t[1] = 0, t[2] = 0, t[3] = 0, t[4] = 0, t[5] = u, t[6] = 0, t[7] = 0, t[8] = 0, t[9] = 0, t[10] = (o + r) * l, t[11] = -1, t[12] = 0, t[13] = 0, t[14] = 2 * o * r * l, t[15] = 0, t }, o.perspectiveFromFieldOfView = function(t, a, n, r) { var o = Math.tan(a.upDegrees * Math.PI / 180), u = Math.tan(a.downDegrees * Math.PI / 180), l = Math.tan(a.leftDegrees * Math.PI / 180), e = Math.tan(a.rightDegrees * Math.PI / 180), M = 2 / (l + e), s = 2 / (o + u); return t[0] = M, t[1] = 0, t[2] = 0, t[3] = 0, t[4] = 0, t[5] = s, t[6] = 0, t[7] = 0, t[8] = -((l - e) * M * .5), t[9] = (o - u) * s * .5, t[10] = r / (n - r), t[11] = -1, t[12] = 0, t[13] = 0, t[14] = r * n / (n - r), t[15] = 0, t }, o.ortho = function(t, a, n, r, o, u, l) { var e = 1 / (a - n), M = 1 / (r - o), s = 1 / (u - l); return t[0] = -2 * e, t[1] = 0, t[2] = 0, t[3] = 0, t[4] = 0, t[5] = -2 * M, t[6] = 0, t[7] = 0, t[8] = 0, t[9] = 0, t[10] = 2 * s, t[11] = 0, t[12] = (a + n) * e, t[13] = (o + r) * M, t[14] = (l + u) * s, t[15] = 1, t }, o.lookAt = function(t, a, n, u) { var l, e, M, s, i, c, h, S, I, f, x = a[0], D = a[1], F = a[2], m = u[0], d = u[1], b = u[2], v = n[0], z = n[1], p = n[2]; return Math.abs(x - v) < r.EPSILON && Math.abs(D - z) < r.EPSILON && Math.abs(F - p) < r.EPSILON ? o.identity(t) : (h = x - v, S = D - z, I = F - p, f = 1 / Math.sqrt(h * h + S * S + I * I), h *= f, S *= f, I *= f, l = d * I - b * S, e = b * h - m * I, M = m * S - d * h, f = Math.sqrt(l * l + e * e + M * M), f ? (f = 1 / f, l *= f, e *= f, M *= f) : (l = 0, e = 0, M = 0), s = S * M - I * e, i = I * l - h * M, c = h * e - S * l, f = Math.sqrt(s * s + i * i + c * c), f ? (f = 1 / f, s *= f, i *= f, c *= f) : (s = 0, i = 0, c = 0), t[0] = l, t[1] = s, t[2] = h, t[3] = 0, t[4] = e, t[5] = i, t[6] = S, t[7] = 0, t[8] = M, t[9] = c, t[10] = I, t[11] = 0, t[12] = -(l * x + e * D + M * F), t[13] = -(s * x + i * D + c * F), t[14] = -(h * x + S * D + I * F), t[15] = 1, t) }, o.str = function(t) { return "mat4(" + t[0] + ", " + t[1] + ", " + t[2] + ", " + t[3] + ", " + t[4] + ", " + t[5] + ", " + t[6] + ", " + t[7] + ", " + t[8] + ", " + t[9] + ", " + t[10] + ", " + t[11] + ", " + t[12] + ", " + t[13] + ", " + t[14] + ", " + t[15] + ")" }, o.frob = function(t) { return Math.sqrt(Math.pow(t[0], 2) + Math.pow(t[1], 2) + Math.pow(t[2], 2) + Math.pow(t[3], 2) + Math.pow(t[4], 2) + Math.pow(t[5], 2) + Math.pow(t[6], 2) + Math.pow(t[7], 2) + Math.pow(t[8], 2) + Math.pow(t[9], 2) + Math.pow(t[10], 2) + Math.pow(t[11], 2) + Math.pow(t[12], 2) + Math.pow(t[13], 2) + Math.pow(t[14], 2) + Math.pow(t[15], 2)) }, o.add = function(t, a, n) { return t[0] = a[0] + n[0], t[1] = a[1] + n[1], t[2] = a[2] + n[2], t[3] = a[3] + n[3], t[4] = a[4] + n[4], t[5] = a[5] + n[5], t[6] = a[6] + n[6], t[7] = a[7] + n[7], t[8] = a[8] + n[8], t[9] = a[9] + n[9], t[10] = a[10] + n[10], t[11] = a[11] + n[11], t[12] = a[12] + n[12], t[13] = a[13] + n[13], t[14] = a[14] + n[14], t[15] = a[15] + n[15], t }, o.subtract = function(t, a, n) { return t[0] = a[0] - n[0], t[1] = a[1] - n[1], t[2] = a[2] - n[2], t[3] = a[3] - n[3], t[4] = a[4] - n[4], t[5] = a[5] - n[5], t[6] = a[6] - n[6], t[7] = a[7] - n[7], t[8] = a[8] - n[8], t[9] = a[9] - n[9], t[10] = a[10] - n[10], t[11] = a[11] - n[11], t[12] = a[12] - n[12], t[13] = a[13] - n[13], t[14] = a[14] - n[14], t[15] = a[15] - n[15], t }, o.sub = o.subtract, o.multiplyScalar = function(t, a, n) { return t[0] = a[0] * n, t[1] = a[1] * n, t[2] = a[2] * n, t[3] = a[3] * n, t[4] = a[4] * n, t[5] = a[5] * n, t[6] = a[6] * n, t[7] = a[7] * n, t[8] = a[8] * n, t[9] = a[9] * n, t[10] = a[10] * n, t[11] = a[11] * n, t[12] = a[12] * n, t[13] = a[13] * n, t[14] = a[14] * n, t[15] = a[15] * n, t }, o.multiplyScalarAndAdd = function(t, a, n, r) { return t[0] = a[0] + n[0] * r, t[1] = a[1] + n[1] * r, t[2] = a[2] + n[2] * r, t[3] = a[3] + n[3] * r, t[4] = a[4] + n[4] * r, t[5] = a[5] + n[5] * r, t[6] = a[6] + n[6] * r, t[7] = a[7] + n[7] * r, t[8] = a[8] + n[8] * r, t[9] = a[9] + n[9] * r, t[10] = a[10] + n[10] * r, t[11] = a[11] + n[11] * r, t[12] = a[12] + n[12] * r, t[13] = a[13] + n[13] * r, t[14] = a[14] + n[14] * r, t[15] = a[15] + n[15] * r, t }, o.exactEquals = function(t, a) { return t[0] === a[0] && t[1] === a[1] && t[2] === a[2] && t[3] === a[3] && t[4] === a[4] && t[5] === a[5] && t[6] === a[6] && t[7] === a[7] && t[8] === a[8] && t[9] === a[9] && t[10] === a[10] && t[11] === a[11] && t[12] === a[12] && t[13] === a[13] && t[14] === a[14] && t[15] === a[15] }, o.equals = function(t, a) { var n = t[0], o = t[1], u = t[2], l = t[3], e = t[4], M = t[5], s = t[6], i = t[7], c = t[8], h = t[9], S = t[10], I = t[11], f = t[12], x = t[13], D = t[14], F = t[15], m = a[0], d = a[1], b = a[2], v = a[3], z = a[4], p = a[5], w = a[6], E = a[7], A = a[8], P = a[9], L = a[10], q = a[11], R = a[12], N = a[13], O = a[14], Y = a[15]; return Math.abs(n - m) <= r.EPSILON * Math.max(1, Math.abs(n), Math.abs(m)) && Math.abs(o - d) <= r.EPSILON * Math.max(1, Math.abs(o), Math.abs(d)) && Math.abs(u - b) <= r.EPSILON * Math.max(1, Math.abs(u), Math.abs(b)) && Math.abs(l - v) <= r.EPSILON * Math.max(1, Math.abs(l), Math.abs(v)) && Math.abs(e - z) <= r.EPSILON * Math.max(1, Math.abs(e), Math.abs(z)) && Math.abs(M - p) <= r.EPSILON * Math.max(1, Math.abs(M), Math.abs(p)) && Math.abs(s - w) <= r.EPSILON * Math.max(1, Math.abs(s), Math.abs(w)) && Math.abs(i - E) <= r.EPSILON * Math.max(1, Math.abs(i), Math.abs(E)) && Math.abs(c - A) <= r.EPSILON * Math.max(1, Math.abs(c), Math.abs(A)) && Math.abs(h - P) <= r.EPSILON * Math.max(1, Math.abs(h), Math.abs(P)) && Math.abs(S - L) <= r.EPSILON * Math.max(1, Math.abs(S), Math.abs(L)) && Math.abs(I - q) <= r.EPSILON * Math.max(1, Math.abs(I), Math.abs(q)) && Math.abs(f - R) <= r.EPSILON * Math.max(1, Math.abs(f), Math.abs(R)) && Math.abs(x - N) <= r.EPSILON * Math.max(1, Math.abs(x), Math.abs(N)) && Math.abs(D - O) <= r.EPSILON * Math.max(1, Math.abs(D), Math.abs(O)) && Math.abs(F - Y) <= r.EPSILON * Math.max(1, Math.abs(F), Math.abs(Y)) }, t.exports = o
        }, function(t, a, n) { var r = n(1), o = n(4), u = n(7), l = n(8), e = {}; e.create = function() { var t = new r.ARRAY_TYPE(4); return t[0] = 0, t[1] = 0, t[2] = 0, t[3] = 1, t }, e.rotationTo = function() { var t = u.create(), a = u.fromValues(1, 0, 0), n = u.fromValues(0, 1, 0); return function(r, o, l) { var M = u.dot(o, l); return -.999999 > M ? (u.cross(t, a, o), u.length(t) < 1e-6 && u.cross(t, n, o), u.normalize(t, t), e.setAxisAngle(r, t, Math.PI), r) : M > .999999 ? (r[0] = 0, r[1] = 0, r[2] = 0, r[3] = 1, r) : (u.cross(t, o, l), r[0] = t[0], r[1] = t[1], r[2] = t[2], r[3] = 1 + M, e.normalize(r, r)) } }(), e.setAxes = function() { var t = o.create(); return function(a, n, r, o) { return t[0] = r[0], t[3] = r[1], t[6] = r[2], t[1] = o[0], t[4] = o[1], t[7] = o[2], t[2] = -n[0], t[5] = -n[1], t[8] = -n[2], e.normalize(a, e.fromMat3(a, t)) } }(), e.clone = l.clone, e.fromValues = l.fromValues, e.copy = l.copy, e.set = l.set, e.identity = function(t) { return t[0] = 0, t[1] = 0, t[2] = 0, t[3] = 1, t }, e.setAxisAngle = function(t, a, n) { n = .5 * n; var r = Math.sin(n); return t[0] = r * a[0], t[1] = r * a[1], t[2] = r * a[2], t[3] = Math.cos(n), t }, e.getAxisAngle = function(t, a) { var n = 2 * Math.acos(a[3]), r = Math.sin(n / 2); return 0 != r ? (t[0] = a[0] / r, t[1] = a[1] / r, t[2] = a[2] / r) : (t[0] = 1, t[1] = 0, t[2] = 0), n }, e.add = l.add, e.multiply = function(t, a, n) { var r = a[0], o = a[1], u = a[2], l = a[3], e = n[0], M = n[1], s = n[2], i = n[3]; return t[0] = r * i + l * e + o * s - u * M, t[1] = o * i + l * M + u * e - r * s, t[2] = u * i + l * s + r * M - o * e, t[3] = l * i - r * e - o * M - u * s, t }, e.mul = e.multiply, e.scale = l.scale, e.rotateX = function(t, a, n) { n *= .5; var r = a[0], o = a[1], u = a[2], l = a[3], e = Math.sin(n), M = Math.cos(n); return t[0] = r * M + l * e, t[1] = o * M + u * e, t[2] = u * M - o * e, t[3] = l * M - r * e, t }, e.rotateY = function(t, a, n) { n *= .5; var r = a[0], o = a[1], u = a[2], l = a[3], e = Math.sin(n), M = Math.cos(n); return t[0] = r * M - u * e, t[1] = o * M + l * e, t[2] = u * M + r * e, t[3] = l * M - o * e, t }, e.rotateZ = function(t, a, n) { n *= .5; var r = a[0], o = a[1], u = a[2], l = a[3], e = Math.sin(n), M = Math.cos(n); return t[0] = r * M + o * e, t[1] = o * M - r * e, t[2] = u * M + l * e, t[3] = l * M - u * e, t }, e.calculateW = function(t, a) { var n = a[0], r = a[1], o = a[2]; return t[0] = n, t[1] = r, t[2] = o, t[3] = Math.sqrt(Math.abs(1 - n * n - r * r - o * o)), t }, e.dot = l.dot, e.lerp = l.lerp, e.slerp = function(t, a, n, r) { var o, u, l, e, M, s = a[0], i = a[1], c = a[2], h = a[3], S = n[0], I = n[1], f = n[2], x = n[3]; return u = s * S + i * I + c * f + h * x, 0 > u && (u = -u, S = -S, I = -I, f = -f, x = -x), 1 - u > 1e-6 ? (o = Math.acos(u), l = Math.sin(o), e = Math.sin((1 - r) * o) / l, M = Math.sin(r * o) / l) : (e = 1 - r, M = r), t[0] = e * s + M * S, t[1] = e * i + M * I, t[2] = e * c + M * f, t[3] = e * h + M * x, t }, e.sqlerp = function() { var t = e.create(), a = e.create(); return function(n, r, o, u, l, M) { return e.slerp(t, r, l, M), e.slerp(a, o, u, M), e.slerp(n, t, a, 2 * M * (1 - M)), n } }(), e.invert = function(t, a) { var n = a[0], r = a[1], o = a[2], u = a[3], l = n * n + r * r + o * o + u * u, e = l ? 1 / l : 0; return t[0] = -n * e, t[1] = -r * e, t[2] = -o * e, t[3] = u * e, t }, e.conjugate = function(t, a) { return t[0] = -a[0], t[1] = -a[1], t[2] = -a[2], t[3] = a[3], t }, e.length = l.length, e.len = e.length, e.squaredLength = l.squaredLength, e.sqrLen = e.squaredLength, e.normalize = l.normalize, e.fromMat3 = function(t, a) { var n, r = a[0] + a[4] + a[8]; if (r > 0) n = Math.sqrt(r + 1), t[3] = .5 * n, n = .5 / n, t[0] = (a[5] - a[7]) * n, t[1] = (a[6] - a[2]) * n, t[2] = (a[1] - a[3]) * n; else { var o = 0; a[4] > a[0] && (o = 1), a[8] > a[3 * o + o] && (o = 2); var u = (o + 1) % 3, l = (o + 2) % 3; n = Math.sqrt(a[3 * o + o] - a[3 * u + u] - a[3 * l + l] + 1), t[o] = .5 * n, n = .5 / n, t[3] = (a[3 * u + l] - a[3 * l + u]) * n, t[u] = (a[3 * u + o] + a[3 * o + u]) * n, t[l] = (a[3 * l + o] + a[3 * o + l]) * n } return t }, e.str = function(t) { return "quat(" + t[0] + ", " + t[1] + ", " + t[2] + ", " + t[3] + ")" }, e.exactEquals = l.exactEquals, e.equals = l.equals, t.exports = e }, function(t, a, n) { var r = n(1), o = {}; o.create = function() { var t = new r.ARRAY_TYPE(3); return t[0] = 0, t[1] = 0, t[2] = 0, t }, o.clone = function(t) { var a = new r.ARRAY_TYPE(3); return a[0] = t[0], a[1] = t[1], a[2] = t[2], a }, o.fromValues = function(t, a, n) { var o = new r.ARRAY_TYPE(3); return o[0] = t, o[1] = a, o[2] = n, o }, o.copy = function(t, a) { return t[0] = a[0], t[1] = a[1], t[2] = a[2], t }, o.set = function(t, a, n, r) { return t[0] = a, t[1] = n, t[2] = r, t }, o.add = function(t, a, n) { return t[0] = a[0] + n[0], t[1] = a[1] + n[1], t[2] = a[2] + n[2], t }, o.subtract = function(t, a, n) { return t[0] = a[0] - n[0], t[1] = a[1] - n[1], t[2] = a[2] - n[2], t }, o.sub = o.subtract, o.multiply = function(t, a, n) { return t[0] = a[0] * n[0], t[1] = a[1] * n[1], t[2] = a[2] * n[2], t }, o.mul = o.multiply, o.divide = function(t, a, n) { return t[0] = a[0] / n[0], t[1] = a[1] / n[1], t[2] = a[2] / n[2], t }, o.div = o.divide, o.ceil = function(t, a) { return t[0] = Math.ceil(a[0]), t[1] = Math.ceil(a[1]), t[2] = Math.ceil(a[2]), t }, o.floor = function(t, a) { return t[0] = Math.floor(a[0]), t[1] = Math.floor(a[1]), t[2] = Math.floor(a[2]), t }, o.min = function(t, a, n) { return t[0] = Math.min(a[0], n[0]), t[1] = Math.min(a[1], n[1]), t[2] = Math.min(a[2], n[2]), t }, o.max = function(t, a, n) { return t[0] = Math.max(a[0], n[0]), t[1] = Math.max(a[1], n[1]), t[2] = Math.max(a[2], n[2]), t }, o.round = function(t, a) { return t[0] = Math.round(a[0]), t[1] = Math.round(a[1]), t[2] = Math.round(a[2]), t }, o.scale = function(t, a, n) { return t[0] = a[0] * n, t[1] = a[1] * n, t[2] = a[2] * n, t }, o.scaleAndAdd = function(t, a, n, r) { return t[0] = a[0] + n[0] * r, t[1] = a[1] + n[1] * r, t[2] = a[2] + n[2] * r, t }, o.distance = function(t, a) { var n = a[0] - t[0], r = a[1] - t[1], o = a[2] - t[2]; return Math.sqrt(n * n + r * r + o * o) }, o.dist = o.distance, o.squaredDistance = function(t, a) { var n = a[0] - t[0], r = a[1] - t[1], o = a[2] - t[2]; return n * n + r * r + o * o }, o.sqrDist = o.squaredDistance, o.length = function(t) { var a = t[0], n = t[1], r = t[2]; return Math.sqrt(a * a + n * n + r * r) }, o.len = o.length, o.squaredLength = function(t) { var a = t[0], n = t[1], r = t[2]; return a * a + n * n + r * r }, o.sqrLen = o.squaredLength, o.negate = function(t, a) { return t[0] = -a[0], t[1] = -a[1], t[2] = -a[2], t }, o.inverse = function(t, a) { return t[0] = 1 / a[0], t[1] = 1 / a[1], t[2] = 1 / a[2], t }, o.normalize = function(t, a) { var n = a[0], r = a[1], o = a[2], u = n * n + r * r + o * o; return u > 0 && (u = 1 / Math.sqrt(u), t[0] = a[0] * u, t[1] = a[1] * u, t[2] = a[2] * u), t }, o.dot = function(t, a) { return t[0] * a[0] + t[1] * a[1] + t[2] * a[2] }, o.cross = function(t, a, n) { var r = a[0], o = a[1], u = a[2], l = n[0], e = n[1], M = n[2]; return t[0] = o * M - u * e, t[1] = u * l - r * M, t[2] = r * e - o * l, t }, o.lerp = function(t, a, n, r) { var o = a[0], u = a[1], l = a[2]; return t[0] = o + r * (n[0] - o), t[1] = u + r * (n[1] - u), t[2] = l + r * (n[2] - l), t }, o.hermite = function(t, a, n, r, o, u) { var l = u * u, e = l * (2 * u - 3) + 1, M = l * (u - 2) + u, s = l * (u - 1), i = l * (3 - 2 * u); return t[0] = a[0] * e + n[0] * M + r[0] * s + o[0] * i, t[1] = a[1] * e + n[1] * M + r[1] * s + o[1] * i, t[2] = a[2] * e + n[2] * M + r[2] * s + o[2] * i, t }, o.bezier = function(t, a, n, r, o, u) { var l = 1 - u, e = l * l, M = u * u, s = e * l, i = 3 * u * e, c = 3 * M * l, h = M * u; return t[0] = a[0] * s + n[0] * i + r[0] * c + o[0] * h, t[1] = a[1] * s + n[1] * i + r[1] * c + o[1] * h, t[2] = a[2] * s + n[2] * i + r[2] * c + o[2] * h, t }, o.random = function(t, a) { a = a || 1; var n = 2 * r.RANDOM() * Math.PI, o = 2 * r.RANDOM() - 1, u = Math.sqrt(1 - o * o) * a; return t[0] = Math.cos(n) * u, t[1] = Math.sin(n) * u, t[2] = o * a, t }, o.transformMat4 = function(t, a, n) { var r = a[0], o = a[1], u = a[2], l = n[3] * r + n[7] * o + n[11] * u + n[15]; return l = l || 1, t[0] = (n[0] * r + n[4] * o + n[8] * u + n[12]) / l, t[1] = (n[1] * r + n[5] * o + n[9] * u + n[13]) / l, t[2] = (n[2] * r + n[6] * o + n[10] * u + n[14]) / l, t }, o.transformMat3 = function(t, a, n) { var r = a[0], o = a[1], u = a[2]; return t[0] = r * n[0] + o * n[3] + u * n[6], t[1] = r * n[1] + o * n[4] + u * n[7], t[2] = r * n[2] + o * n[5] + u * n[8], t }, o.transformQuat = function(t, a, n) { var r = a[0], o = a[1], u = a[2], l = n[0], e = n[1], M = n[2], s = n[3], i = s * r + e * u - M * o, c = s * o + M * r - l * u, h = s * u + l * o - e * r, S = -l * r - e * o - M * u; return t[0] = i * s + S * -l + c * -M - h * -e, t[1] = c * s + S * -e + h * -l - i * -M, t[2] = h * s + S * -M + i * -e - c * -l, t }, o.rotateX = function(t, a, n, r) { var o = [], u = []; return o[0] = a[0] - n[0], o[1] = a[1] - n[1], o[2] = a[2] - n[2], u[0] = o[0], u[1] = o[1] * Math.cos(r) - o[2] * Math.sin(r), u[2] = o[1] * Math.sin(r) + o[2] * Math.cos(r), t[0] = u[0] + n[0], t[1] = u[1] + n[1], t[2] = u[2] + n[2], t }, o.rotateY = function(t, a, n, r) { var o = [], u = []; return o[0] = a[0] - n[0], o[1] = a[1] - n[1], o[2] = a[2] - n[2], u[0] = o[2] * Math.sin(r) + o[0] * Math.cos(r), u[1] = o[1], u[2] = o[2] * Math.cos(r) - o[0] * Math.sin(r), t[0] = u[0] + n[0], t[1] = u[1] + n[1], t[2] = u[2] + n[2], t }, o.rotateZ = function(t, a, n, r) { var o = [], u = []; return o[0] = a[0] - n[0], o[1] = a[1] - n[1], o[2] = a[2] - n[2], u[0] = o[0] * Math.cos(r) - o[1] * Math.sin(r), u[1] = o[0] * Math.sin(r) + o[1] * Math.cos(r), u[2] = o[2], t[0] = u[0] + n[0], t[1] = u[1] + n[1], t[2] = u[2] + n[2], t }, o.forEach = function() { var t = o.create(); return function(a, n, r, o, u, l) { var e, M; for (n || (n = 3), r || (r = 0), M = o ? Math.min(o * n + r, a.length) : a.length, e = r; M > e; e += n)t[0] = a[e], t[1] = a[e + 1], t[2] = a[e + 2], u(t, t, l), a[e] = t[0], a[e + 1] = t[1], a[e + 2] = t[2]; return a } }(), o.angle = function(t, a) { var n = o.fromValues(t[0], t[1], t[2]), r = o.fromValues(a[0], a[1], a[2]); o.normalize(n, n), o.normalize(r, r); var u = o.dot(n, r); return u > 1 ? 0 : Math.acos(u) }, o.str = function(t) { return "vec3(" + t[0] + ", " + t[1] + ", " + t[2] + ")" }, o.exactEquals = function(t, a) { return t[0] === a[0] && t[1] === a[1] && t[2] === a[2] }, o.equals = function(t, a) { var n = t[0], o = t[1], u = t[2], l = a[0], e = a[1], M = a[2]; return Math.abs(n - l) <= r.EPSILON * Math.max(1, Math.abs(n), Math.abs(l)) && Math.abs(o - e) <= r.EPSILON * Math.max(1, Math.abs(o), Math.abs(e)) && Math.abs(u - M) <= r.EPSILON * Math.max(1, Math.abs(u), Math.abs(M)) }, t.exports = o }, function(t, a, n) { var r = n(1), o = {}; o.create = function() { var t = new r.ARRAY_TYPE(4); return t[0] = 0, t[1] = 0, t[2] = 0, t[3] = 0, t }, o.clone = function(t) { var a = new r.ARRAY_TYPE(4); return a[0] = t[0], a[1] = t[1], a[2] = t[2], a[3] = t[3], a }, o.fromValues = function(t, a, n, o) { var u = new r.ARRAY_TYPE(4); return u[0] = t, u[1] = a, u[2] = n, u[3] = o, u }, o.copy = function(t, a) { return t[0] = a[0], t[1] = a[1], t[2] = a[2], t[3] = a[3], t }, o.set = function(t, a, n, r, o) { return t[0] = a, t[1] = n, t[2] = r, t[3] = o, t }, o.add = function(t, a, n) { return t[0] = a[0] + n[0], t[1] = a[1] + n[1], t[2] = a[2] + n[2], t[3] = a[3] + n[3], t }, o.subtract = function(t, a, n) { return t[0] = a[0] - n[0], t[1] = a[1] - n[1], t[2] = a[2] - n[2], t[3] = a[3] - n[3], t }, o.sub = o.subtract, o.multiply = function(t, a, n) { return t[0] = a[0] * n[0], t[1] = a[1] * n[1], t[2] = a[2] * n[2], t[3] = a[3] * n[3], t }, o.mul = o.multiply, o.divide = function(t, a, n) { return t[0] = a[0] / n[0], t[1] = a[1] / n[1], t[2] = a[2] / n[2], t[3] = a[3] / n[3], t }, o.div = o.divide, o.ceil = function(t, a) { return t[0] = Math.ceil(a[0]), t[1] = Math.ceil(a[1]), t[2] = Math.ceil(a[2]), t[3] = Math.ceil(a[3]), t }, o.floor = function(t, a) { return t[0] = Math.floor(a[0]), t[1] = Math.floor(a[1]), t[2] = Math.floor(a[2]), t[3] = Math.floor(a[3]), t }, o.min = function(t, a, n) { return t[0] = Math.min(a[0], n[0]), t[1] = Math.min(a[1], n[1]), t[2] = Math.min(a[2], n[2]), t[3] = Math.min(a[3], n[3]), t }, o.max = function(t, a, n) { return t[0] = Math.max(a[0], n[0]), t[1] = Math.max(a[1], n[1]), t[2] = Math.max(a[2], n[2]), t[3] = Math.max(a[3], n[3]), t }, o.round = function(t, a) { return t[0] = Math.round(a[0]), t[1] = Math.round(a[1]), t[2] = Math.round(a[2]), t[3] = Math.round(a[3]), t }, o.scale = function(t, a, n) { return t[0] = a[0] * n, t[1] = a[1] * n, t[2] = a[2] * n, t[3] = a[3] * n, t }, o.scaleAndAdd = function(t, a, n, r) { return t[0] = a[0] + n[0] * r, t[1] = a[1] + n[1] * r, t[2] = a[2] + n[2] * r, t[3] = a[3] + n[3] * r, t }, o.distance = function(t, a) { var n = a[0] - t[0], r = a[1] - t[1], o = a[2] - t[2], u = a[3] - t[3]; return Math.sqrt(n * n + r * r + o * o + u * u) }, o.dist = o.distance, o.squaredDistance = function(t, a) { var n = a[0] - t[0], r = a[1] - t[1], o = a[2] - t[2], u = a[3] - t[3]; return n * n + r * r + o * o + u * u }, o.sqrDist = o.squaredDistance, o.length = function(t) { var a = t[0], n = t[1], r = t[2], o = t[3]; return Math.sqrt(a * a + n * n + r * r + o * o) }, o.len = o.length, o.squaredLength = function(t) { var a = t[0], n = t[1], r = t[2], o = t[3]; return a * a + n * n + r * r + o * o }, o.sqrLen = o.squaredLength, o.negate = function(t, a) { return t[0] = -a[0], t[1] = -a[1], t[2] = -a[2], t[3] = -a[3], t }, o.inverse = function(t, a) { return t[0] = 1 / a[0], t[1] = 1 / a[1], t[2] = 1 / a[2], t[3] = 1 / a[3], t }, o.normalize = function(t, a) { var n = a[0], r = a[1], o = a[2], u = a[3], l = n * n + r * r + o * o + u * u; return l > 0 && (l = 1 / Math.sqrt(l), t[0] = n * l, t[1] = r * l, t[2] = o * l, t[3] = u * l), t }, o.dot = function(t, a) { return t[0] * a[0] + t[1] * a[1] + t[2] * a[2] + t[3] * a[3] }, o.lerp = function(t, a, n, r) { var o = a[0], u = a[1], l = a[2], e = a[3]; return t[0] = o + r * (n[0] - o), t[1] = u + r * (n[1] - u), t[2] = l + r * (n[2] - l), t[3] = e + r * (n[3] - e), t }, o.random = function(t, a) { return a = a || 1, t[0] = r.RANDOM(), t[1] = r.RANDOM(), t[2] = r.RANDOM(), t[3] = r.RANDOM(), o.normalize(t, t), o.scale(t, t, a), t }, o.transformMat4 = function(t, a, n) { var r = a[0], o = a[1], u = a[2], l = a[3]; return t[0] = n[0] * r + n[4] * o + n[8] * u + n[12] * l, t[1] = n[1] * r + n[5] * o + n[9] * u + n[13] * l, t[2] = n[2] * r + n[6] * o + n[10] * u + n[14] * l, t[3] = n[3] * r + n[7] * o + n[11] * u + n[15] * l, t }, o.transformQuat = function(t, a, n) { var r = a[0], o = a[1], u = a[2], l = n[0], e = n[1], M = n[2], s = n[3], i = s * r + e * u - M * o, c = s * o + M * r - l * u, h = s * u + l * o - e * r, S = -l * r - e * o - M * u; return t[0] = i * s + S * -l + c * -M - h * -e, t[1] = c * s + S * -e + h * -l - i * -M, t[2] = h * s + S * -M + i * -e - c * -l, t[3] = a[3], t }, o.forEach = function() { var t = o.create(); return function(a, n, r, o, u, l) { var e, M; for (n || (n = 4), r || (r = 0), M = o ? Math.min(o * n + r, a.length) : a.length, e = r; M > e; e += n)t[0] = a[e], t[1] = a[e + 1], t[2] = a[e + 2], t[3] = a[e + 3], u(t, t, l), a[e] = t[0], a[e + 1] = t[1], a[e + 2] = t[2], a[e + 3] = t[3]; return a } }(), o.str = function(t) { return "vec4(" + t[0] + ", " + t[1] + ", " + t[2] + ", " + t[3] + ")" }, o.exactEquals = function(t, a) { return t[0] === a[0] && t[1] === a[1] && t[2] === a[2] && t[3] === a[3] }, o.equals = function(t, a) { var n = t[0], o = t[1], u = t[2], l = t[3], e = a[0], M = a[1], s = a[2], i = a[3]; return Math.abs(n - e) <= r.EPSILON * Math.max(1, Math.abs(n), Math.abs(e)) && Math.abs(o - M) <= r.EPSILON * Math.max(1, Math.abs(o), Math.abs(M)) && Math.abs(u - s) <= r.EPSILON * Math.max(1, Math.abs(u), Math.abs(s)) && Math.abs(l - i) <= r.EPSILON * Math.max(1, Math.abs(l), Math.abs(i)) }, t.exports = o }, function(t, a, n) { var r = n(1), o = {}; o.create = function() { var t = new r.ARRAY_TYPE(2); return t[0] = 0, t[1] = 0, t }, o.clone = function(t) { var a = new r.ARRAY_TYPE(2); return a[0] = t[0], a[1] = t[1], a }, o.fromValues = function(t, a) { var n = new r.ARRAY_TYPE(2); return n[0] = t, n[1] = a, n }, o.copy = function(t, a) { return t[0] = a[0], t[1] = a[1], t }, o.set = function(t, a, n) { return t[0] = a, t[1] = n, t }, o.add = function(t, a, n) { return t[0] = a[0] + n[0], t[1] = a[1] + n[1], t }, o.subtract = function(t, a, n) { return t[0] = a[0] - n[0], t[1] = a[1] - n[1], t }, o.sub = o.subtract, o.multiply = function(t, a, n) { return t[0] = a[0] * n[0], t[1] = a[1] * n[1], t }, o.mul = o.multiply, o.divide = function(t, a, n) { return t[0] = a[0] / n[0], t[1] = a[1] / n[1], t }, o.div = o.divide, o.ceil = function(t, a) { return t[0] = Math.ceil(a[0]), t[1] = Math.ceil(a[1]), t }, o.floor = function(t, a) { return t[0] = Math.floor(a[0]), t[1] = Math.floor(a[1]), t }, o.min = function(t, a, n) { return t[0] = Math.min(a[0], n[0]), t[1] = Math.min(a[1], n[1]), t }, o.max = function(t, a, n) { return t[0] = Math.max(a[0], n[0]), t[1] = Math.max(a[1], n[1]), t }, o.round = function(t, a) { return t[0] = Math.round(a[0]), t[1] = Math.round(a[1]), t }, o.scale = function(t, a, n) { return t[0] = a[0] * n, t[1] = a[1] * n, t }, o.scaleAndAdd = function(t, a, n, r) { return t[0] = a[0] + n[0] * r, t[1] = a[1] + n[1] * r, t }, o.distance = function(t, a) { var n = a[0] - t[0], r = a[1] - t[1]; return Math.sqrt(n * n + r * r) }, o.dist = o.distance, o.squaredDistance = function(t, a) { var n = a[0] - t[0], r = a[1] - t[1]; return n * n + r * r }, o.sqrDist = o.squaredDistance, o.length = function(t) { var a = t[0], n = t[1]; return Math.sqrt(a * a + n * n) }, o.len = o.length, o.squaredLength = function(t) { var a = t[0], n = t[1]; return a * a + n * n }, o.sqrLen = o.squaredLength, o.negate = function(t, a) { return t[0] = -a[0], t[1] = -a[1], t }, o.inverse = function(t, a) { return t[0] = 1 / a[0], t[1] = 1 / a[1], t }, o.normalize = function(t, a) { var n = a[0], r = a[1], o = n * n + r * r; return o > 0 && (o = 1 / Math.sqrt(o), t[0] = a[0] * o, t[1] = a[1] * o), t }, o.dot = function(t, a) { return t[0] * a[0] + t[1] * a[1] }, o.cross = function(t, a, n) { var r = a[0] * n[1] - a[1] * n[0]; return t[0] = t[1] = 0, t[2] = r, t }, o.lerp = function(t, a, n, r) { var o = a[0], u = a[1]; return t[0] = o + r * (n[0] - o), t[1] = u + r * (n[1] - u), t }, o.random = function(t, a) { a = a || 1; var n = 2 * r.RANDOM() * Math.PI; return t[0] = Math.cos(n) * a, t[1] = Math.sin(n) * a, t }, o.transformMat2 = function(t, a, n) { var r = a[0], o = a[1]; return t[0] = n[0] * r + n[2] * o, t[1] = n[1] * r + n[3] * o, t }, o.transformMat2d = function(t, a, n) { var r = a[0], o = a[1]; return t[0] = n[0] * r + n[2] * o + n[4], t[1] = n[1] * r + n[3] * o + n[5], t }, o.transformMat3 = function(t, a, n) { var r = a[0], o = a[1]; return t[0] = n[0] * r + n[3] * o + n[6], t[1] = n[1] * r + n[4] * o + n[7], t }, o.transformMat4 = function(t, a, n) { var r = a[0], o = a[1]; return t[0] = n[0] * r + n[4] * o + n[12], t[1] = n[1] * r + n[5] * o + n[13], t }, o.forEach = function() { var t = o.create(); return function(a, n, r, o, u, l) { var e, M; for (n || (n = 2), r || (r = 0), M = o ? Math.min(o * n + r, a.length) : a.length, e = r; M > e; e += n)t[0] = a[e], t[1] = a[e + 1], u(t, t, l), a[e] = t[0], a[e + 1] = t[1]; return a } }(), o.str = function(t) { return "vec2(" + t[0] + ", " + t[1] + ")" }, o.exactEquals = function(t, a) { return t[0] === a[0] && t[1] === a[1] }, o.equals = function(t, a) { var n = t[0], o = t[1], u = a[0], l = a[1]; return Math.abs(n - u) <= r.EPSILON * Math.max(1, Math.abs(n), Math.abs(u)) && Math.abs(o - l) <= r.EPSILON * Math.max(1, Math.abs(o), Math.abs(l)) }, t.exports = o }])
});






//#########################################################################################################




function initApp() {

        /* Calculate Width and Height before rendering       */
        wd = document.body.clientWidth - 4;
        if (document.body.clientHeight > document.documentElement.clientHeight) {
                ht = document.body.clientHeight - 10;
        }
        else {
                ht = document.documentElement.clientHeight - 4;
        }

        drawCanvas();


        window.canvas = document.getElementById("canvas");
        /////////////////
        // MAKE INSTANCE
        /////////////////


        if (App.events == true) {

                window["EVENTS_INSTANCE"] = new EVENTS(E('canvas'));

        }



        Start();



};


function isReady() {

        if (0 == world) {
                return false;
        }
        else {
                return true;
        }

}



window.load_shaders = function(href) {

        function handler() {
                if (this.status == 200 && this.responseText != null) {
                        // success!
                        document.getElementById('shaders').innerHTML = this.responseText;
                } else {
                        // something went wrong
                        console.log("something went wrong on shaders load procces!");
                }
        }

        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onload = handler;
        xmlhttp.open("GET", href, false);
        xmlhttp.send();

};


//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
//WebGL start
//Base environment property for totality of WEBGL
//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
function defineWebGLWorld(cavnas) {
        console.log("      Define the WEBGL base pocket");
        var world = new Object();
        /* Constructor for a particular GL environment   */
        try {
                var gl = WebGLUtils.setupWebGL(canvas);
                gl.viewportWidth = canvas.width;
                gl.viewportHeight = canvas.height;
                world.gl = gl;
                console.log("      WEBGL base pocket: SUCCESS");
        }
        catch (e) {
                /* Exception: Could not initialise WebGL     */
                console.log("      Exception in WEBGL base pocket: " + e);
        }
        /* Destructor                                    */
        world.destroy = function() {
                delete this.gl;
                delete this;
        };
        return world;
}
//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
//* Update the frame rate FPS counter
//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
function updateFPS(elements) {
        //console.log("    Update FPS");
        var now = (new Date()).getTime();

        var delta = now - lastTime;
        lastTime = now;

        totalTime = totalTime + delta;
        updateTime = updateTime + delta;

        frames = frames + 1;
        updateFrames = updateFrames + 1;

        if (1000 < updateTime) {
                document.getElementById('fps').innerHTML = "FPS AVG: " + Math.floor((1000 * frames / totalTime) / elements)
                        + " CUR: " + Math.floor((1000 * updateFrames / updateTime) / elements);
                updateTime = 0;
                updateFrames = 0;
        }
}

function drawCanvas() {
        console.log("  Draw the canvas");
        printf('<canvas id="canvas" style="border: none;" width="' + wd + '" height="' + ht + '"></canvas>');
}

function drawFPS() {
        printf('<button id="stopRender" type="button" >stopRender</button>');
        console.log("  Draw the FPS section");
        printf('<font color = "white"><b id="fps"></b></font>');
}

/* Render the text as it is then and there C style   */
function printf(text) {
        document.writeln(text);
}

/* Degree to Radian converter                        */
function degToRad(degrees) {
        return degrees * Math.PI / 180;
}

/* One time initiation of FPS to store initial time  */
function initiateFPS() {
        console.log("    Initiate FPS");
        lastTime = (new Date()).getTime();
}

//Help the browser Garbage collect
window.onbeforeunload = onExit;

//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$



//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
// Provides cancelRequestAnimFrame in a cross browser way.
//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
window.cancelRequestAnimFrame = (function() {
        return window.cancelAnimationFrame ||
                window.webkitCancelRequestAnimationFrame ||
                window.mozCancelRequestAnimationFrame ||
                window.oCancelRequestAnimationFrame ||
                window.msCancelRequestAnimationFrame ||
                function(callback) {
                        window.clearTimeout(callback);
                };
})();
//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$

//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
// Dispose off the dangling objects
//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
function onExit() {
        /* RIP Mouse object                              */
        //mouseLoc.destroy();

        /* RIP Objects                                   */
        looper = 0;
        while (looper <= objListToDispose.length - 1) {
                objListToDispose[looper].destroy();
                looper = looper + 1;
        }

        objListToDispose.length = 0;
}



App.operation.destroyWorld = function() {
        console.log("    Destroy at iteration:" + reDrawID);
        /* Stop the render                               */
        cancelRequestAnimFrame(reDrawID);
        delete this.pMatrix;
        delete this.mvMatrixStack;
        looper = 0;
        while (looper <= this.contentList.length - 1) {
                console.log("    Destroying: " + this.contentList[looper].type);
                delete this.contentList[looper].type;
                delete this.contentList[looper].size;
                delete this.contentList[looper].sides;

                /* Dispose the shaders                       */
                if (this.contentList[looper].shaderProgram.fragmentShader) {
                        console.log("      Dispose Fragment Shader");
                        this.GL.gl.deleteShader(this.contentList[looper].shaderProgram.fragmentShader);
                        delete this.contentList[looper].shaderProgram.fragmentShader;
                }

                if (this.contentList[looper].shaderProgram.vertexShader) {
                        console.log("      Dispose Vertex Shader");
                        this.GL.gl.deleteShader(this.contentList[looper].shaderProgram.vertexShader);
                        delete this.contentList[looper].shaderProgram.vertexShader;
                }

                /* Dispose the texture                       */
                if (this.contentList[looper].texture) {
                        console.log("      Dispose Texture");

                        // must be improved Nikola Lukic

                        try {


                                this.GL.gl.deleteTexture(this.contentList[looper].texture);

                        } catch (e) {

                                SYS.DEBUG.WARNING("Problem in destroying function : This is e log : " + e)

                        }

                        delete this.contentList[looper].texture;
                }

                /* Dispose the program                       */
                if (this.contentList[looper].shaderProgram) {
                        console.log("      Dispose Shader program");
                        this.GL.gl.deleteProgram(this.contentList[looper].shaderProgram);
                        delete this.contentList[looper].shaderProgram;
                }

                /* Empty the buffers                         */
                console.log("      Dispose buffers");
                if (this.contentList[looper].vertexPositionBuffer) {
                        console.log("        Dispose Vertex Position Buffer");
                        this.GL.gl.deleteBuffer(this.contentList[looper].vertexPositionBuffer);
                        delete this.contentList[looper].vertexPositionBuffer;
                }
                if (this.contentList[looper].vertexTexCoordBuffer) {
                        console.log("        Dispose Vertex Coordinate Buffer");
                        this.GL.gl.deleteBuffer(this.contentList[looper].vertexTexCoordBuffer);
                        delete this.contentList[looper].vertexTexCoordBuffer;
                }
                if (this.contentList[looper].vertexColorBuffer) {
                        console.log("        Dispose Vertex Color Buffer");
                        this.GL.gl.deleteBuffer(this.contentList[looper].vertexColorBuffer);
                        delete this.contentList[looper].vertexColorBuffer;
                }
                if (this.contentList[looper].vertexIndexBuffer) {
                        console.log("        Dispose Vertex Index Buffer");
                        this.GL.gl.deleteBuffer(this.contentList[looper].vertexIndexBuffer);
                        delete this.contentList[looper].vertexIndexBuffer;
                }

                delete this.contentList[looper].rotationSpeed;
                delete this.contentList[looper].rotValue;
                delete this.contentList[looper].rotDirection;
                delete this.contentList[looper].color;
                delete this.contentList[looper].mvMatrix;

                looper = looper + 1;
        }
        this.contentList.length = 0;
        this.GL.destroy();
        SYS.DEBUG.WARNING("exit")
        delete this;
};


//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$


//##################################
// LOAD SHADERS DYNAMIC
//##################################
loadShaders = function(gl, id) {
        console.log("          Get the Shader");
        console.log("            Creating Shader:" + id);
        var shaderScript = document.getElementById(id);
        var shader;
        var str = "";

        if (shaderScript) {
                var k = shaderScript.firstChild;

                while (k) {
                        if (k.nodeType == 3) {
                                str += k.textContent;
                        }
                        k = k.nextSibling;
                }

                if (shaderScript.type == "x-shader/x-fragment") {
                        console.log("            Creating fragment shader");
                        shader = gl.createShader(gl.FRAGMENT_SHADER);
                }
                else if (shaderScript.type == "x-shader/x-vertex") {
                        console.log("            Creating vertex shader");
                        shader = gl.createShader(gl.VERTEX_SHADER);
                }
                else {
                        return 0;
                }

                gl.shaderSource(shader, str);
                gl.compileShader(shader);

                if (gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
                        console.log("            Shader Program compile success");
                        return shader;
                }
                else {
                        console.log("            Shader Program compile failed:" + gl.getShaderInfoLog(shader));
                        return 0;
                }
        }
        else {
                console.log("            Shader Program creation failed");
                return 0;
        }
};

initShaders = function(gl, fragment, vertex) {
        console.log("      Initialize Shader");
        console.log("        Fragment Shader:" + fragment);
        console.log("        Vertex Shader:" + vertex);

        var fragmentShader = this.getShader(gl, fragment);
        var vertexShader = this.getShader(gl, vertex);

        if (0 == fragmentShader || 0 == vertexShader) {
                console.log("        Failed to Load shader");
                return 0;
        }
        else {
                var shaderProgram = gl.createProgram();
                console.log("        Creating Shader fragment");
                gl.attachShader(shaderProgram, vertexShader);
                gl.attachShader(shaderProgram, fragmentShader);
                gl.linkProgram(shaderProgram);

                if (gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
                        console.log("          Returning Shader fragment successfully");
                        gl.useProgram(shaderProgram);

                        shaderProgram.vertexPositionAttribute = gl.getAttribLocation(shaderProgram, "aVertexPosition");
                        gl.enableVertexAttribArray(shaderProgram.vertexPositionAttribute);

                        if (gl.getAttribLocation(shaderProgram, "aVertexColor") >= 0) {
                                shaderProgram.vertexColorAttribute = gl.getAttribLocation(shaderProgram, "aVertexColor");
                                gl.enableVertexAttribArray(shaderProgram.vertexColorAttribute);
                        }

                        if (gl.getAttribLocation(shaderProgram, "aTextureCoord") >= 0) {
                                shaderProgram.textureCoordAttribute = gl.getAttribLocation(shaderProgram, "aTextureCoord");
                                gl.enableVertexAttribArray(shaderProgram.textureCoordAttribute);
                                shaderProgram.samplerUniform = gl.getUniformLocation(shaderProgram, "uSampler");
                        }

                        if (gl.getAttribLocation(shaderProgram, "aVertexNormal") >= 0) {
                                shaderProgram.vertexNormalAttribute = gl.getAttribLocation(shaderProgram, "aVertexNormal");
                                gl.enableVertexAttribArray(shaderProgram.vertexNormalAttribute);
                        }


                        if (null !== gl.getUniformLocation(shaderProgram, "uNMatrix")) {
                                shaderProgram.nMatrixUniform = gl.getUniformLocation(shaderProgram, "uNMatrix");
                        }

                        //for 2d sprite????
                        if (null !== gl.getUniformLocation(shaderProgram, "layer")) {
                                shaderProgram.layerLocation = gl.getUniformLocation(shaderProgram, "layer");
                        }

                        if (null !== gl.getUniformLocation(shaderProgram, "numberOfsamplers")) {
                                shaderProgram.numberOfsamplers = gl.getUniformLocation(shaderProgram, "numberOfsamplers");
                        }

                        //
                        if (null !== gl.getUniformLocation(shaderProgram, "TimeFor")) {
                                shaderProgram.uniformTime = gl.getUniformLocation(shaderProgram, "TimeFor");
                        }

                        // multi samplers for textutes
                        if (null !== gl.getUniformLocation(shaderProgram, "uSampler")) {
                                shaderProgram.samplerUniform = gl.getUniformLocation(shaderProgram, "uSampler");
                        }
                        if (null !== gl.getUniformLocation(shaderProgram, "uSampler1")) {
                                shaderProgram.samplerUniform1 = gl.getUniformLocation(shaderProgram, "uSampler1");
                        }
                        if (null !== gl.getUniformLocation(shaderProgram, "uSampler2")) {
                                shaderProgram.samplerUniform2 = gl.getUniformLocation(shaderProgram, "uSampler2");
                        }
                        if (null !== gl.getUniformLocation(shaderProgram, "uSampler3")) {
                                shaderProgram.samplerUniform3 = gl.getUniformLocation(shaderProgram, "uSampler3");
                        }
                        if (null !== gl.getUniformLocation(shaderProgram, "uSampler4")) {
                                shaderProgram.samplerUniform3 = gl.getUniformLocation(shaderProgram, "uSampler4");
                        }
                        if (null !== gl.getUniformLocation(shaderProgram, "uSampler5")) {
                                shaderProgram.samplerUniform3 = gl.getUniformLocation(shaderProgram, "uSampler5");
                        }
                        if (null !== gl.getUniformLocation(shaderProgram, "uSampler6")) {
                                shaderProgram.samplerUniform3 = gl.getUniformLocation(shaderProgram, "uSampler6");
                        }
                        if (null !== gl.getUniformLocation(shaderProgram, "uSampler7")) {
                                shaderProgram.samplerUniform3 = gl.getUniformLocation(shaderProgram, "uSampler7");
                        }


                        if (null !== gl.getUniformLocation(shaderProgram, "uUseLighting")) {
                                shaderProgram.useLightingUniform = gl.getUniformLocation(shaderProgram, "uUseLighting");
                        }

                        if (null !== gl.getUniformLocation(shaderProgram, "uAmbientColor")) {
                                shaderProgram.ambientColorUniform = gl.getUniformLocation(shaderProgram, "uAmbientColor");
                        }

                        if (null !== gl.getUniformLocation(shaderProgram, "uLightingDirection")) {
                                shaderProgram.lightingDirectionUniform = gl.getUniformLocation(shaderProgram, "uLightingDirection");
                        }

                        if (null !== gl.getUniformLocation(shaderProgram, "uDirectionalColor")) {
                                shaderProgram.directionalColorUniform = gl.getUniformLocation(shaderProgram, "uDirectionalColor");
                        }

                        shaderProgram.pMatrixUniform = gl.getUniformLocation(shaderProgram, "uPMatrix");
                        shaderProgram.mvMatrixUniform = gl.getUniformLocation(shaderProgram, "uMVMatrix");

                        /* For destroying properly            */
                        shaderProgram.fragmentShader = fragmentShader;
                        shaderProgram.vertexShader = vertexShader;

                        return shaderProgram;
                }
                else {
                        console.log("          Returning Shader fragment failed");
                        return 0;
                }
        }
};
//##################################
// END OF SHADERS DYNAMIC
//##################################


//##################################
// MATRIX OPETARION
//##################################
App.operation.PUSH_MATRIX = function(mvMatrix, mvMatrixStack) {
        var copy = mat4.create();
        mat4.copy(mvMatrix, copy);
        mvMatrixStack.push(copy);
};

App.operation.POP_MATRIX = function(mvMatrix, mvMatrixStack) {
        if (mvMatrixStack.length == 0) {
                throw "Invalid popMatrix!";
        }
        mvMatrix = mvMatrixStack.pop();
};

App.operation.SET_MATRIX_UNIFORMS = function(object, pMatrix) {
        this.GL.gl.uniformMatrix4fv(object.shaderProgram.pMatrixUniform, false, pMatrix);
        this.GL.gl.uniformMatrix4fv(object.shaderProgram.mvMatrixUniform, false, object.mvMatrix);
};


/////////////////////////////
//REGENERATORs SHADER
/////////////////////////////

var RegenerateShader = function(id_elem, numOfSamplerInUse, mixOperand) {

        var e = document.getElementById(id_elem);

        if (mixOperand == "multiply") {

                mixOperand = 0;

        }
        else if (mixOperand == "divide") {

                mixOperand = 1;

        }

        e.innerHTML = generateShaderSrc(numOfSamplerInUse, mixOperand);


};



var RegenerateCustomShader = function(id_elem, numOfSamplerInUse, mixOperand, code_) {

        var e = document.getElementById(id_elem);

        if (mixOperand == "multiply") {

                mixOperand = 0;

        }
        else if (mixOperand == "divide") {

                mixOperand = 1;

        }

        e.innerHTML = generateCustomShaderSrc(numOfSamplerInUse, mixOperand, code_);


};

function generateShaderSrc(numTextures, mixOperand) {

        return `


          // shader for ${numTextures} textures
          precision mediump float;
          precision highp float;


          varying vec2 vTextureCoord;
          varying vec3 vLightWeighting;

          uniform float textureSamplerAmount[${numTextures}];
          int MixOperandString = ${mixOperand};

          uniform sampler2D uSampler;
          uniform sampler2D uSampler1;
          uniform sampler2D uSampler2;
          uniform sampler2D uSampler3;
          uniform sampler2D uSampler4;
          uniform sampler2D uSampler5;
          uniform sampler2D uSampler6;
          uniform sampler2D uSampler7;

          void main(void) {

          vec4 textureColor = texture2D(uSampler, vec2(vTextureCoord.s, vTextureCoord.t));
          vec4 textureColor1 = texture2D(uSampler1, vec2(vTextureCoord.s, vTextureCoord.t));
          vec4 textureColor2 = texture2D(uSampler2, vec2(vTextureCoord.s, vTextureCoord.t));
          vec4 textureColor3 = texture2D(uSampler3, vec2(vTextureCoord.s, vTextureCoord.t));
          vec4 textureColor4 = texture2D(uSampler4, vec2(vTextureCoord.s, vTextureCoord.t));
          vec4 textureColor5 = texture2D(uSampler5, vec2(vTextureCoord.s, vTextureCoord.t));
          vec4 textureColor6 = texture2D(uSampler6, vec2(vTextureCoord.s, vTextureCoord.t));
          vec4 textureColor7 = texture2D(uSampler7, vec2(vTextureCoord.s, vTextureCoord.t));

          //MixOperandString  make it with eval todo task

          if (  ${numTextures} == 1)
          {

          gl_FragColor      = vec4(textureColor.rgb * vLightWeighting, textureColor.a);

          //  gl_FragColor = vec4( smoothstep(textureColor.r, textureColor.b,textureColor.g ) , smoothstep(textureColor.r, textureColor.b,textureColor.g ) ,0 ,smoothstep(textureColor.r, textureColor.b,textureColor.g ) );

          }
          else if (${numTextures} == 2)
          {
          if ( ${mixOperand} == 0){
          // gl_FragColor = textureColor * textureColor1;

          gl_FragColor      = vec4( (textureColor.rgb * textureColor1.rgb) * vLightWeighting, textureColor.a);
          }
          else if (${mixOperand} == 1){

          //gl_FragColor = textureColor / textureColor1;
          gl_FragColor      = vec4( (textureColor.rgb / textureColor1.rgb) * vLightWeighting, textureColor.a);
          }

          }
          else if (${numTextures} == 3)
          {
          if (MixOperandString == 0){
          gl_FragColor =vec4( (textureColor.rgb * textureColor1.rgb * textureColor2.rgb ) * vLightWeighting, textureColor.a);
          }
          else if (MixOperandString == 1){
          gl_FragColor = vec4( (textureColor.rgb * textureColor1.rgb / textureColor2.rgb ) * vLightWeighting, textureColor.a);
          }

          }
          else if (${numTextures} == 4)
          {
          if (MixOperandString == 0){
          gl_FragColor = textureColor * textureColor1 * textureColor2 * textureColor3;
          }
          else if (MixOperandString == 1){
          gl_FragColor = textureColor / textureColor1 / textureColor2 /  textureColor3;
          }

          }

          }

          // uniform sampler2D uSampler[${numTextures}];
          // uniform float uMixAmount[${numTextures}];

          /*
           void main() {
           vec4 color = vec4(0);

           for (int i = 0; i < ${numTextures}; ++i) {
           vec4 texColor = texture2D(uSampler[i], vTextureCoord);
           color = mix(color, texColor, uMixAmount[i]);
           }

           gl_FragColor = color;
           }
           */

          `;

}



//make custom shader
function generateCustomShaderSrc(numTextures, mixOperand, code_) {

        return `


          // shader for ${numTextures} textures
          precision mediump float;
          precision highp float;

          varying vec2 vTextureCoord;
          varying vec3 vLightWeighting;

          uniform float textureSamplerAmount[${numTextures}];
          float TimeFor;

          int MixOperandString = ${mixOperand};
          int CODE = ${code_};

          uniform sampler2D uSampler;
          uniform sampler2D uSampler1;
          uniform sampler2D uSampler2;
          uniform sampler2D uSampler3;
          uniform sampler2D uSampler4;
          uniform sampler2D uSampler5;
          uniform sampler2D uSampler6;
          uniform sampler2D uSampler7;


          //test



          //test


          void main(void) {

          vec4 textureColor = texture2D(uSampler, vec2(vTextureCoord.s, vTextureCoord.t));
          vec4 textureColor1 = texture2D(uSampler1, vec2(vTextureCoord.s, vTextureCoord.t));
          vec4 textureColor2 = texture2D(uSampler2, vec2(vTextureCoord.s, vTextureCoord.t));
          vec4 textureColor3 = texture2D(uSampler3, vec2(vTextureCoord.s, vTextureCoord.t));
          vec4 textureColor4 = texture2D(uSampler4, vec2(vTextureCoord.s, vTextureCoord.t));
          vec4 textureColor5 = texture2D(uSampler5, vec2(vTextureCoord.s, vTextureCoord.t));
          vec4 textureColor6 = texture2D(uSampler6, vec2(vTextureCoord.s, vTextureCoord.t));
          vec4 textureColor7 = texture2D(uSampler7, vec2(vTextureCoord.s, vTextureCoord.t));

          //MixOperandString  make it with eval todo task

          if (  ${numTextures} == 1)
          {


          if  ( CODE == 0 ) {

          gl_FragColor      = vec4(textureColor.rgb * vLightWeighting, textureColor.a);

          }
          else if (CODE == 1){

          gl_FragColor = vec4( smoothstep(textureColor.r, textureColor.b,textureColor.g ) , smoothstep(textureColor.r, textureColor.b,textureColor.g ) , 0 , 1 );

          }
          else if (CODE == 2){

          gl_FragColor = vec4( smoothstep(textureColor.r, textureColor.b , textureColor.g ) , 1 , 0 , 1 );

          }
          else if (CODE == 3){

          gl_FragColor = vec4( smoothstep( textureColor.g , textureColor.b , 0.5 ) , 1 , 0 , 1 );

          }
          else if (CODE == 4){

          //textureColor
          vec2 position =  vTextureCoord;
          float color = 0.3;
          gl_FragColor = vec4( vec3( color , color * 0.5, sin( color + TimeFor / 3.0 ) * 0.75 ), 1.0 );

          }


          }
          else if (${numTextures} == 2)
          {
          if ( ${mixOperand} == 0){
          gl_FragColor      = vec4( (textureColor.rgb * textureColor1.rgb) * vLightWeighting, textureColor.a);
          }
          else if (${mixOperand} == 1){
          gl_FragColor      = vec4( (textureColor.rgb / textureColor1.rgb) * vLightWeighting, textureColor.a);
          }

          }
          else if (${numTextures} == 3)
          {
          if (MixOperandString == 0){
          gl_FragColor =vec4( (textureColor.rgb * textureColor1.rgb * textureColor2.rgb ) * vLightWeighting, textureColor.a);
          }
          else if (MixOperandString == 1){
          gl_FragColor = vec4( (textureColor.rgb * textureColor1.rgb / textureColor2.rgb ) * vLightWeighting, textureColor.a);
          }

          }
          else if (${numTextures} == 4)
          {
          if (MixOperandString == 0){
          gl_FragColor = textureColor * textureColor1 * textureColor2 * textureColor3;
          }
          else if (MixOperandString == 1){
          gl_FragColor = textureColor / textureColor1 / textureColor2 /  textureColor3;
          }

          }

          }

          // uniform sampler2D uSampler[${numTextures}];
          // uniform float uMixAmount[${numTextures}];

          /*
           void main() {
           vec4 color = vec4(0);

           for (int i = 0; i < ${numTextures}; ++i) {
           vec4 texColor = texture2D(uSampler[i], vTextureCoord);
           color = mix(color, texColor, uMixAmount[i]);
           }

           gl_FragColor = color;
           }
           */

          `;

}



//#############################
// VIDEO WEB CAM
//#############################

var webcamError = function(e) { alert('Webcam error!' + e); };


function SET_STREAM(video) {

        if (navigator.getUserMedia) {

                navigator.getUserMedia({ audio: true, video: true }, function(stream) {
                        //video.src = stream;
                        video.src = window.URL.createObjectURL(stream);
                        //initialize();

                }, webcamError);
        } else if (navigator.webkitGetUserMedia) {

                navigator.webkitGetUserMedia({ audio: true, video: true }, function(stream) {
                        video.src = window.URL.createObjectURL(stream);

                        // initialize();

                }, webcamError);
        }
        else { alert("webcam broken."); }

}


function ACCESS_CAMERA(htmlElement) {

        var ROOT = this;

        ROOT.video = document.getElementById(htmlElement);
        SET_STREAM(ROOT.video)

        var DIV_CONTENT_STREAMS = document.getElementById('HOLDER_STREAMS');

        ROOT.videoImage = document.createElement('canvas');
        ROOT.videoImage.id = htmlElement + "IMAGE_";
        ROOT.videoImage.setAttribute('width', '512px');
        ROOT.videoImage.setAttribute('height', '512px');
        DIV_CONTENT_STREAMS.appendChild(ROOT.videoImage);

        ROOT.videoImageContext = ROOT.videoImage.getContext('2d');
        ROOT.videoImageContext.fillStyle = '#0000FF';
        ROOT.videoImageContext.fillRect(0, 0, ROOT.videoImage.width, ROOT.videoImage.height);

        ROOT.texture = App.tools.loadVideoTexture("glVideoTexture", ROOT.videoImage);

        ROOT.UPDATE = function() {

                if (ROOT.video.readyState === ROOT.video.HAVE_ENOUGH_DATA) {

                        ROOT.videoImageContext.drawImage(ROOT.video, 0, 0, ROOT.videoImage.width, ROOT.videoImage.height);

                        ROOT.videoImageContext.font = "30px Georgia";
                        ROOT.videoImageContext.fillStyle = "black";
                        ROOT.videoImageContext.fillText(" Visual-JS game engine -webGL 2 part", 0, 85);
                        ROOT.videoImageContext.fillText("Video texture example ", 20, 50);

                }

        };

        console.log('Video 3d canvas texture created.');
        App.updateBeforeDraw.push(ROOT);

        // dispose for this needed !!!

}


function VIDEO_TEXTURE(path_) {

        var ROOT = this;

        // ROOT.video = document.getElementById( htmlElement );
        ROOT.video = document.getElementById('webcam_beta');

        var DIV_CONTENT_STREAMS = document.getElementById('HOLDER_STREAMS');



        ROOT.video.READY = function(e) {





                ROOT.videoImage = document.createElement('canvas');
                ROOT.videoImage.id = 'webcam_beta' + "IMAGE_";
                ROOT.videoImage.setAttribute('width', '512px');
                ROOT.videoImage.setAttribute('height', '512px');
                DIV_CONTENT_STREAMS.appendChild(ROOT.videoImage);

                ROOT.videoImageContext = ROOT.videoImage.getContext('2d');
                ROOT.videoImageContext.fillStyle = '#00003F';
                ROOT.videoImageContext.fillRect(0, 0, ROOT.videoImage.width, ROOT.videoImage.height);

                ROOT.texture = App.tools.loadVideoTexture("glVideoTexture", ROOT.videoImage);


                console.log('Video 3d canvas texture created.');
                App.updateBeforeDraw.push(ROOT);


        };

        ROOT.video.addEventListener('loadeddata', ROOT.video.READY, false);

        ROOT.video.src = "res/videos/" + path_;


        ROOT.UPDATE = function() {

                if (ROOT.video.readyState === ROOT.video.HAVE_ENOUGH_DATA) {

                        ROOT.videoImageContext.drawImage(ROOT.video, 0, 0, ROOT.videoImage.width, ROOT.videoImage.height);

                        ROOT.videoImageContext.font = "30px Georgia";
                        ROOT.videoImageContext.fillStyle = "black";
                        ROOT.videoImageContext.fillText(" Visual-JS game engine -webGL 2 part", 0, 85);
                        ROOT.videoImageContext.fillText("Video texture example ", 20, 50);

                }

        };



}





/*
 * Copyright 2010, Google Inc.
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are
 * met:
 *
 *     * Redistributions of source code must retain the above copyright
 * notice, this list of conditions and the following disclaimer.
 *     * Redistributions in binary form must reproduce the above
 * copyright notice, this list of conditions and the following disclaimer
 * in the documentation and/or other materials provided with the
 * distribution.
 *     * Neither the name of Google Inc. nor the names of its
 * contributors may be used to endorse or promote products derived from
 * this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
 * "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
 * LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
 * A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT
 * OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
 * SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
 * LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
 * DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY
 * THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */


/**
 * @fileoverview This file contains functions every webgl program will need
 * a version of one way or another.
 *
 * Instead of setting up a context manually it is recommended to
 * use. This will check for success or failure. On failure it
 * will attempt to present an approriate message to the user.
 *
 *       gl = WebGLUtils.setupWebGL(canvas);
 *
 * For animated WebGL apps use of setTimeout or setInterval are
 * discouraged. It is recommended you structure your rendering
 * loop like this.
 *
 *       function render() {
 *         window.requestAnimationFrame(render, canvas);
 *
 *         // do rendering
 *         ...
 *       }
 *       render();
 *
 * This will call your rendering function up to the refresh rate
 * of your display but will stop rendering if your app is not
 * visible.
 */

WebGLUtils = function() {

        /**
         * Creates the HTLM for a failure message
         * @param {string} canvasContainerId id of container of th
         *        canvas.
         * @return {string} The html.
         */
        var makeFailHTML = function(msg) {
                return '' +
                        '<div style="margin: auto; width:500px;z-index:10000;margin-top:20em;text-align:center;">' + msg + '</div>';
                return '' +
                        '<table style="background-color: #8CE; width: 100%; height: 100%;"><tr>' +
                        '<td align="center">' +
                        '<div style="display: table-cell; vertical-align: middle;">' +
                        '<div style="">' + msg + '</div>' +
                        '</div>' +
                        '</td></tr></table>';
        };

        /**
         * Mesasge for getting a webgl browser
         * @type {string}
         */
        var GET_A_WEBGL_BROWSER = '' +
                'This page requires a browser that supports WebGL.<br/>' +
                '<a href="http://get.webgl.org">Click here to upgrade your browser.</a>';

        /**
         * Mesasge for need better hardware
         * @type {string}
         */
        var OTHER_PROBLEM = '' +
                "It doesn't appear your computer can support WebGL.<br/>" +
                '<a href="http://get.webgl.org">Click here for more information.</a>';

        /**
         * Creates a webgl context. If creation fails it will
         * change the contents of the container of the <canvas>
         * tag to an error message with the correct links for WebGL.
         * @param {Element} canvas. The canvas element to create a
         *     context from.
         * @param {WebGLContextCreationAttirbutes} opt_attribs Any
         *     creation attributes you want to pass in.
         * @param {function:(msg)} opt_onError An function to call
         *     if there is an error during creation.
         * @return {WebGLRenderingContext} The created context.
         */
        var setupWebGL = function(canvas, opt_attribs, opt_onError) {
                function handleCreationError(msg) {
                        var container = document.getElementsByTagName("body")[0];
                        //var container = canvas.parentNode;
                        if (container) {
                                var str = window.WebGLRenderingContext ?
                                        OTHER_PROBLEM :
                                        GET_A_WEBGL_BROWSER;
                                if (msg) {
                                        str += "<br/><br/>Status: " + msg;
                                }
                                container.innerHTML = makeFailHTML(str);
                        }
                };

                opt_onError = opt_onError || handleCreationError;

                if (canvas.addEventListener) {
                        canvas.addEventListener("webglcontextcreationerror", function(event) {
                                opt_onError(event.statusMessage);
                        }, false);
                }
                var context = create3DContext(canvas, opt_attribs);
                if (!context) {
                        if (!window.WebGLRenderingContext) {
                                opt_onError("");
                        } else {
                                opt_onError("");
                        }
                }

                return context;
        };

        /**
         * Creates a webgl context.
         * @param {!Canvas} canvas The canvas tag to get context
         *     from. If one is not passed in one will be created.
         * @return {!WebGLContext} The created context.
         */
        var create3DContext = function(canvas, opt_attribs) {
                //var names = [  "webgl" , "experimental-webgl", "webkit-3d", "moz-webgl"];
                var names = ["webgl2"];
                var context = null;
                for (var ii = 0; ii < names.length; ++ii) {
                        try {
                                context = canvas.getContext(names[ii], opt_attribs);
                        } catch (e) { }
                        if (context) {
                                break;
                        }
                }
                return context;
        }

        return {
                create3DContext: create3DContext,
                setupWebGL: setupWebGL
        };
}();

/**
 * Provides requestAnimationFrame in a cross browser
 * way.
 */
if (!window.requestAnimationFrame) {
        window.requestAnimationFrame = (function() {
                return window.requestAnimationFrame ||
                        window.webkitRequestAnimationFrame ||
                        window.mozRequestAnimationFrame ||
                        window.oRequestAnimationFrame ||
                        window.msRequestAnimationFrame ||
                        function(/* function FrameRequestCallback */ callback, /* DOMElement Element */ element) {
                                window.setTimeout(callback, 1000 / 60);
                        };
        })();
}










/*

 */
//###############################################//###############################################
//###############################################//###############################################
// EVENTS  Atach this class to every modul
//###############################################//###############################################
//###############################################//###############################################


//quick access cursor/touch

var SYS = new Object();



SYS.MOUSE = {
        x: 0, y: 0,
        LAST_POSITION: { x: 0, y: 0 },
        PRESS: false,
        BUTTON_PRESSED: "",
        ON_LEFT_BTN_PRESSED: function() { },
        ON_RIGHT_BTN_PRESSED: function() { },
        MOUSE_MOVING: false,
};


SYS.DEBUG = new LOG();

function EVENTS(canvas) {

        var ROOT_EVENTS = this;

        //Mobile device
        if (NOMOBILE == 0) {

                canvas.addEventListener("touchstart", function(e) {

                        e.preventDefault();

                        var touchList = e.changedTouches;

                        SYS.MOUSE.PRESS = true;

                        SYS.MOUSE.x = touchList[0].pageX;
                        SYS.MOUSE.y = touchList[0].pageY;


                        ROOT_EVENTS.CALCULATE_TOUCH_OR_CLICK();

                }, false);


                canvas.addEventListener("touchend", function(e) {

                        e.preventDefault();

                        var touchList = e.changedTouches;

                        SYS.MOUSE.PRESS = false;

                        SYS.MOUSE.x = touchList[0].pageX;
                        SYS.MOUSE.y = touchList[0].pageY;


                        ROOT_EVENTS.CALCULATE_TOUCH_UP_OR_MOUSE_UP();
                }, false);



                canvas.addEventListener("touchcancel", function(e) {

                        e.preventDefault();

                        var touchList = e.changedTouches;

                        SYS.MOUSE.PRESS = false;

                        SYS.MOUSE.x = touchList[0].pageX;
                        SYS.MOUSE.y = touchList[0].pageY;

                        ROOT_EVENTS.CALCULATE_TOUCH_UP_OR_MOUSE_UP();
                }, false);


                canvas.addEventListener("touchmove", function(e) {

                        e.preventDefault();

                        var touchList = e.changedTouches;

                        //SYS.MOUSE.MOUSE_MOVING = true;
                        //SYS.MOUSE.PRESS = true;

                        SYS.MOUSE.x = touchList[0].pageX;
                        SYS.MOUSE.y = touchList[0].pageY;

                        ROOT_EVENTS.CALCULATE_TOUCH_MOVE_OR_MOUSE_MOVE();
                }, false);


        }
        else {

                //Desktop device
                canvas.addEventListener("click", function(e) {

                        //SYS.MOUSE.PRESS = true;

                        SYS.MOUSE.x = e.layerX;
                        SYS.MOUSE.y = e.layerY;

                        ROOT_EVENTS.CALCULATE_TOUCH_OR_CLICK();
                        SYS.DEBUG.LOG("SYS : CLICK EVENT " + canvas);

                }, false);


                canvas.addEventListener("mouseup", function(e) {

                        SYS.MOUSE.PRESS = false;
                        SYS.MOUSE.BUTTON_PRESSED = null;

                        SYS.MOUSE.x = e.layerX;
                        SYS.MOUSE.y = e.layerY;


                        ROOT_EVENTS.CALCULATE_TOUCH_UP_OR_MOUSE_UP();


                }, false);


                canvas.onmousemove = function(e) {

                        SYS.MOUSE.MOUSE_MOVING = true;



                        SYS.MOUSE.x = e.layerX;
                        SYS.MOUSE.y = e.layerY;

                        ROOT_EVENTS.CALCULATE_TOUCH_MOVE_OR_MOUSE_MOVE(e);


                };

                canvas.onmousedown = function(e) {

                        SYS.MOUSE.PRESS = true;

                        if (e.which == 3) {
                                SYS.MOUSE.BUTTON_PRESSED = "RIGHT";
                                SYS.MOUSE.ON_RIGHT_BTN_PRESSED();
                                SYS.DEBUG.LOG("Right button clicked");
                        }
                        else if (e.which == 2) {
                                SYS.MOUSE.BUTTON_PRESSED = "MID";
                                SYS.MOUSE.ON_MID_BTN_PRESSED();
                                SYS.DEBUG.LOG("Mid button clicked");
                        }
                        else if (e.which == 1) {
                                SYS.MOUSE.BUTTON_PRESSED = "LEFT";
                                SYS.MOUSE.ON_LEFT_BTN_PRESSED();
                                SYS.DEBUG.LOG("Left button clicked");
                        }



                        SYS.MOUSE.x = e.layerX;
                        SYS.MOUSE.y = e.layerY;


                        ROOT_EVENTS.CALCULATE_TOUCH_DOWN_OR_MOUSE_DOWN();

                };


                //console.log("This is PC desktop device.");
        }

        //Calculate touch or click event
        this.CALCULATE_TOUCH_OR_CLICK = function() {

                /*
                 for (var x=0;x<length;x++){

                 for (var z=0;z<length;z++){


                 }

                 }
                 */
                SYS.DEBUG.LOG(" EVENT : MOUSE/TOUCH CLICK ");

        };

        // CALCULATE MOUSE MOVE OR TOUCH MOVE
        this.CALCULATE_TOUCH_MOVE_OR_MOUSE_MOVE = function(e) {


                var center_x = window.innerWidth / 2;
                var center_y = window.innerHeight / 2;

                SYS.MOUSE.x = e.layerX - center_x;
                SYS.MOUSE.y = e.layerY - center_y;

                //check to make sure there is data to compare against
                if (typeof (SYS.MOUSE.LAST_POSITION.x) != 'undefined') {

                        //get the change from last position to this position
                        var deltaX = SYS.MOUSE.LAST_POSITION.x - SYS.MOUSE.x,
                                deltaY = SYS.MOUSE.LAST_POSITION.y - SYS.MOUSE.y;

                        //check which direction had the highest amplitude and then figure out direction by checking if the value is greater or less than zero
                        if (Math.abs(deltaX) > Math.abs(deltaY) && deltaX > 0) {
                                //left

                        } else if (Math.abs(deltaX) > Math.abs(deltaY) && deltaX < 0) {
                                //right

                        } else if (Math.abs(deltaY) > Math.abs(deltaX) && deltaY > 0) {
                                //up

                        } else if (Math.abs(deltaY) > Math.abs(deltaX) && deltaY < 0) {
                                //down

                        }
                }


                camera.pitchRate += deltaY * 10;
                camera.yawRate += deltaX * 1;

                //set the new last position to the current for next time
                SYS.MOUSE.LAST_POSITION.x = SYS.MOUSE.x,
                        SYS.MOUSE.LAST_POSITION.y = SYS.MOUSE.y


                if (SYS.MOUSE.x < App.camera.edgeMarginValue - center_x) {
                        App.camera.leftEdge = true;
                        //SYS.DEBUG.LOG(" mouse on edge ! ");
                }
                else {
                        App.camera.leftEdge = false;
                }

                if (SYS.MOUSE.x > center_x - App.camera.edgeMarginValue) {
                        App.camera.rightEdge = true;
                        //SYS.DEBUG.LOG(" mouse on edge ! ");
                }
                else {
                        App.camera.rightEdge = false;
                }




                //SYS.DEBUG.LOG(" EVENT : MOUSE/TOUCH MOVE ");

        };

        // CALCULATE_TOUCH_UP_OR_MOUSE_UP
        this.CALCULATE_TOUCH_UP_OR_MOUSE_UP = function() {

                SYS.DEBUG.LOG(" EVENT : MOUSE/TOUCH UP ");


        };

        this.CALCULATE_TOUCH_DOWN_OR_MOUSE_DOWN = function() {

                SYS.DEBUG.LOG(" EVENT : MOUSE/TOUCH DOWN ");

        };



};




/////////////////////////
// from kesto
// camera
/////////////////////////

function defineKeyBoardObject() {
        var globKeyPressObj = new Object();

        /* Constructor for the global mouse location     */
        globKeyPressObj.keyArr = new Array();

        document.onkeydown = function(e) { globKeyPressObj.handleKeyDown(e); };
        document.onkeyup = function(e) { globKeyPressObj.handleKeyUp(e); };

        /* Getter for a key status                       */
        globKeyPressObj.getKeyStatus = function(keyCode) {
                return this.keyArr[keyCode];
        };

        /* Setter for a key status                       */
        globKeyPressObj.setKeyStatus = function(keyCode, status) {
                this.keyArr[keyCode] = status;
        };

        /* Key Down and Up handlers                      */
        globKeyPressObj.handleKeyDown = function(evt) {
                evt = (evt) ? evt : (window.event) ? window.event : "";
                this.setKeyStatus(evt.keyCode, true);
        };

        globKeyPressObj.handleKeyUp = function(evt) {
                evt = (evt) ? evt : (window.event) ? window.event : "";
                this.setKeyStatus(evt.keyCode, false);
        };

        /* Destructor                                    */
        globKeyPressObj.destroy = function() {
                printLog("    Destroy Key Press object");
                document.onkeydown = null;
                document.onkeyup = null;
                delete this.keyArr;
                delete this;
        };

        return globKeyPressObj;
}


var camera = new Object();

/* Set defaults                                  */
camera.pitch = 0;
camera.pitchRate = 0;
camera.yaw = 0;
camera.yawRate = 0;
camera.xPos = 0;
camera.yPos = 0;
camera.zPos = 0;
camera.speed = 0;
camera.yawAmp = 0.05;
camera.pitchAmp = 0.007;

keyboardPress = defineKeyBoardObject();

camera.setCamera = function(object) {
        /* Left Key  or A                            */
        if (keyboardPress.getKeyStatus(37) || keyboardPress.getKeyStatus(65) || App.camera.leftEdge == true) {

                camera.yawRate = 20;
                if (App.camera.leftEdge == true) camera.yawRate = 10;
        }
        /* Right Key or D                            */
        else if (keyboardPress.getKeyStatus(39) || keyboardPress.getKeyStatus(68) || App.camera.rightEdge == true) {

                camera.yawRate = -20;
                if (App.camera.rightEdge == true) camera.yawRate = -10;
        }
        else {
                // camera.yawRate = 0;
        }



        /* Up Key    or W                            */
        if (keyboardPress.getKeyStatus(38) || keyboardPress.getKeyStatus(87)) {
                camera.speed = 0.03;
        }
        /* Down Key  or S                            */
        else if (keyboardPress.getKeyStatus(40) || keyboardPress.getKeyStatus(83)) {
                camera.speed = -0.03;
        }
        else {
                camera.speed = 0;
        }
        /* Page Up
         if (keyboardPress.getKeyStatus(33)) {
         camera.pitchRate = 100;
         }
         /* Page Down
         else if (keyboardPress.getKeyStatus(34)) {
         camera.pitchRate = -100;
         }
         else {
         camera.pitchRate = 0;
         }
         */
        /* Calculate yaw, pitch and roll(x,y,z) */
        if (camera.speed != 0) {

                camera.xPos -= Math.sin(degToRad(camera.yaw)) * camera.speed;
                camera.yPos = 0;
                camera.zPos -= Math.cos(degToRad(camera.yaw)) * camera.speed;

        }
        camera.yaw += camera.yawRate * camera.yawAmp;
        camera.pitch += camera.pitchRate * camera.pitchAmp;

        mat4.rotate(object.mvMatrix, object.mvMatrix, degToRad(-camera.pitch), [1, 0, 0]);
        mat4.rotate(object.mvMatrix, object.mvMatrix, degToRad(-camera.yaw), [0, 1, 0]);

        // mat4.translate(object.mvMatrix, object.mvMatrix, [camera.yaw, -camera.pitch, 0]);
        mat4.translate(object.mvMatrix, object.mvMatrix, [-camera.xPos, -camera.yPos, -camera.zPos]);

        camera.yawRate = 0;
        camera.pitchRate = 0;
};






'use strict';

class Scale {

        constructor() {

                this.x = 1;
                this.y = 1;
                this.z = 1;

        }

        LinearScale(scale_) {

                this.x = scale_;
                this.y = scale_;
                this.z = scale_;

        }


}


class Point {

        constructor(x, y, z) {

                if (typeof z == 'undefined') { z = 0; }

                this.x = x;
                this.y = y;
                this.z = z;
                this.scale = new Scale();

        }

        get X() {
                return parseFloat(this.x * this.scale.x);
        }
        get Y() {
                return parseFloat(this.y * this.scale.y);
        }
        get Z() {
                return parseFloat(this.z * this.scale.z);
        }

}

class rotationVector {

        constructor(x, y, z) {

                if (typeof x == 'undefined') { x = 0; }
                if (typeof y == 'undefined') { y = 0; }
                if (typeof z == 'undefined') { z = 0; }

                this.x = x;
                this.y = y;
                this.z = z;

                return this;

        }

        get X() {
                return this.x;
        }
        get Y() {
                return this.y;
        }
        get Z() {
                return this.z;
        }

        get RotationVector() {

                return [this.x, this.y, this.z];

        }

        SetDirection(x_, y_, z_) {

                this.x = x_;
                this.y = y_;
                this.z = z_;

        }

        SetDirectionX() {

                this.x = 1;
                this.y = 0;
                this.z = 0;

        }

        SetDirectionY() {

                this.x = 0;
                this.y = 1;
                this.z = 0;

        }

        SetDirectionZ() {

                this.x = 0;
                this.y = 0;
                this.z = 1;

        }

        SetDirectionXY() {

                this.x = 1;
                this.y = 1;
                this.z = 0;

        }

        SetDirectionXZ() {

                this.x = 1;
                this.y = 0;
                this.z = 1;

        }

        SetDirectionYZ() {

                this.x = 0;
                this.y = 1;
                this.z = 1;

        }


}

class Position {

        constructor(x, y, z) {
                //super()

                if (typeof x == 'undefined') { x = 0; }
                if (typeof y == 'undefined') { y = 0; }
                if (typeof z == 'undefined') { z = 0; }

                this.x = x;
                this.y = y;
                this.z = z;

                return this;

        }

        get worldLocation() {

                return [this.x, this.y, this.z];

        }

        SetX(newx) {

                this.x = newx;

        }

        SetY(newy) {

                this.y = newy;

        }

        SetZ(newz) {

                this.z = newz;

        }

        setPosition(newx, newy, newz) {

                this.x = newx;
                this.y = newy;
                this.z = newz;

        }




}

//*******************************
//*******************************
// CLASS ORIENTED
//*******************************
//*******************************
// TRIANGLE
class TriangleVertex {


        constructor(root) {

                this.root = root;
                this.size = root.size;
                this.dynamicBuffer = App.dynamicBuffer;
                this.pointA = new Point(0.0, 1, 0.0);
                this.pointB = new Point(-1, -1, 0);
                this.pointC = new Point(1, -1, 0);

        }

        // GETTER
        get vertices() {

                return new Float32Array([
                        this.pointA.X, this.pointA.Y * this.root.size, this.pointA.Z,

                        this.pointB.X * this.root.size, this.pointB.Y * this.root.size, this.pointB.Z,

                        this.pointC.X * this.root.size, this.pointC.Y * this.root.size, this.pointC.Z
                ]);

        }

        setScale(scale) {

                this.size = scale;

                if (this.dynamicBuffer == true) return;

                App.operation.triangle_buffer_procedure(this.root)

                return 'dynamicBuffer is false but i will update vertex array prototypical.';

        }


}

// SQUARE
class SquareVertex {


        constructor(root) {

                this.classRoot = this;
                this.root = root;
                this.size = root.size;
                this.pointA = new Point(1, 1, 0);
                this.pointB = new Point(-1, 1, 0);
                this.pointC = new Point(1, -1, 0);
                this.pointD = new Point(-1, -1, 0);
                this.dynamicBuffer = true;

                this.texCoordsPoints = {

                        right_top: new Point(1.0, 1.0, 0),
                        left_top: new Point(0.0, 1.0, 0),
                        right_bottom: new Point(1.0, 0.0, 0),
                        left_bottom: new Point(0.0, 0.0, 0),



                };


        }

        // GETTER
        get vertices() {

                return new Float32Array([
                        this.pointA.X * this.size, this.pointA.Y * this.size, this.pointA.Z,

                        this.pointB.X * this.size, this.pointB.Y * this.size, this.pointB.Z,

                        this.pointC.X * this.size, this.pointC.Y * this.size, this.pointC.Z,

                        this.pointD.X * this.size, this.pointD.Y * this.size, this.pointD.Z
                ]);

        }

        get texCoords() {

                return new Float32Array([
                        this.texCoordsPoints.right_top.X, this.texCoordsPoints.right_top.Y,
                        this.texCoordsPoints.left_top.X, this.texCoordsPoints.left_top.Y,
                        this.texCoordsPoints.right_bottom.X, this.texCoordsPoints.right_bottom.Y,
                        this.texCoordsPoints.left_bottom.X, this.texCoordsPoints.left_bottom.Y,
                ]);


        }


        get indices() {
                return [
                        0, 1, 2, 3, 2, 1,    // front

                ];
        }

        setScale(scale) {

                this.size = scale;

                if (this.dynamicBuffer == true) return;

                App.operation.square_buffer_procedure(this.root)

                return 'dynamicBuffer is false but i will update vertex array prototypical.';

        }

}

class CubeVertex {

        constructor(root) {


                this.root = root;
                this.size = root.size;
                this.basePoint = 1.0 * this.size;
                this.basePointNeg = -1.0 * this.size;
                this.dynamicBuffer = true;

                this.osciTest = new OSCILLATOR(0, 2, 0.002);
                // for scale by ori
                this.Front = {

                        pointA: new Point(0, 0, 0),
                        pointB: new Point(0, 0, 0),
                        pointC: new Point(0, 0, 0),
                        pointD: new Point(0, 0, 0),

                };
                this.Back = {

                        pointA: new Point(0, 0, 0),
                        pointB: new Point(0, 0, 0),
                        pointC: new Point(0, 0, 0),
                        pointD: new Point(0, 0, 0),

                };
                this.Top = {

                        pointA: new Point(0, 0, 0),
                        pointB: new Point(0, 0, 0),
                        pointC: new Point(0, 0, 0),
                        pointD: new Point(0, 0, 0),

                };
                this.Bottom = {

                        pointA: new Point(0, 0, 0),
                        pointB: new Point(0, 0, 0),
                        pointC: new Point(0, 0, 0),
                        pointD: new Point(0, 0, 0),

                };
                this.Right = {

                        pointA: new Point(0, 0, 0),
                        pointB: new Point(0, 0, 0),
                        pointC: new Point(0, 0, 0),
                        pointD: new Point(0, 0, 0),

                };
                this.Left = {

                        pointA: new Point(0, 0, 0),
                        pointB: new Point(0, 0, 0),
                        pointC: new Point(0, 0, 0),
                        pointD: new Point(0, 0, 0),

                };


                //COLOR

                this.colorData = {};
                this.colorData.parent = this.root;

                this.colorData.Front = {

                        pointA: new COLOR_ALPHA(1.0, 0.0, 0.0, 1.0),
                        pointB: new COLOR_ALPHA(0.0, 1.0, 0.0, 1.0),
                        pointC: new COLOR_ALPHA(0.0, 0.0, 1.0, 1.0),
                        pointD: new COLOR_ALPHA(0.0, 0.0, 1.0, 1.0),

                };
                this.colorData.Back = {

                        pointA: new COLOR_ALPHA(1.0, 0.0, 0.0, 1.0),
                        pointB: new COLOR_ALPHA(0.0, 1.0, 0.0, 1.0),
                        pointC: new COLOR_ALPHA(0.0, 0.0, 1.0, 1.0),
                        pointD: new COLOR_ALPHA(0.0, 0.0, 1.0, 1.0),
                };
                this.colorData.Top = {

                        pointA: new COLOR_ALPHA(0.0, 1.0, 0.0, 1.0),
                        pointB: new COLOR_ALPHA(0.0, 1.0, 0.0, 1.0),
                        pointC: new COLOR_ALPHA(0.0, 0.0, 1.0, 1.0),
                        pointD: new COLOR_ALPHA(0.0, 0.0, 1.0, 1.0),

                };
                this.colorData.Bottom = {

                        pointA: new COLOR_ALPHA(0.0, 1.0, 0.0, 1.0),
                        pointB: new COLOR_ALPHA(0.0, 0.0, 1.0, 1.0),
                        pointC: new COLOR_ALPHA(0.0, 1.0, 0.0, 1.0),
                        pointD: new COLOR_ALPHA(0.0, 0.0, 1.0, 1.0),

                };
                this.colorData.Right = {

                        pointA: new COLOR_ALPHA(1.0, 0.0, 0.0, 1.0),
                        pointB: new COLOR_ALPHA(0.0, 0.0, 1.0, 1.0),
                        pointC: new COLOR_ALPHA(0.0, 1.0, 0.0, 1.0),
                        pointD: new COLOR_ALPHA(0.0, 0.0, 1.0, 1.0),
                };
                this.colorData.Left = {

                        pointA: new COLOR_ALPHA(1.0, 0.0, 0.0, 1.0),
                        pointB: new COLOR_ALPHA(0.0, 0.0, 1.0, 1.0),
                        pointC: new COLOR_ALPHA(0.0, 1.0, 0.0, 1.0),
                        pointD: new COLOR_ALPHA(0.0, 0.0, 1.0, 1.0),
                };

                this.colorData.SetRedForAll = function(red_) {

                        // Front face
                        this.Front.pointA.r = red_;
                        this.Front.pointB.r = red_;
                        this.Front.pointC.r = red_;
                        this.Front.pointD.r = red_;
                        // Right face
                        this.Right.pointA.r = red_;
                        this.Right.pointB.r = red_;
                        this.Right.pointC.r = red_;
                        this.Right.pointD.r = red_;
                        // Back face
                        this.Back.pointA.r = red_;
                        this.Back.pointB.r = red_;
                        this.Back.pointC.r = red_;
                        this.Back.pointD.r = red_;
                        // Left face
                        this.Left.pointA.r = red_;
                        this.Left.pointB.r = red_;
                        this.Left.pointC.r = red_;
                        this.Left.pointD.r = red_;
                        // Bottom left
                        this.Bottom.pointA.r = red_;
                        this.Bottom.pointB.r = red_;
                        this.Bottom.pointC.r = red_;
                        this.Bottom.pointD.r = red_;
                        // Bottom right BottomRight
                        this.Top.pointA.r = red_;
                        this.Top.pointB.r = red_;
                        this.Top.pointC.r = red_;
                        this.Top.pointD.r = red_;

                        App.operation.cube_buffer_procedure(this.parent)

                };

                this.colorData.SetGreenForAll = function(color_) {

                        // Front face
                        this.Front.pointA.g = color_;
                        this.Front.pointB.g = color_;
                        this.Front.pointC.g = color_;
                        this.Front.pointD.g = color_;
                        // Right face
                        this.Right.pointA.g = color_;
                        this.Right.pointB.g = color_;
                        this.Right.pointC.g = color_;
                        this.Right.pointD.g = color_;
                        // Back face
                        this.Back.pointA.g = color_;
                        this.Back.pointB.g = color_;
                        this.Back.pointC.g = color_;
                        this.Back.pointD.g = color_;
                        // Left face
                        this.Left.pointA.g = color_;
                        this.Left.pointB.g = color_;
                        this.Left.pointC.g = color_;
                        this.Left.pointD.g = color_;
                        // Bottom left
                        this.Bottom.pointA.g = color_;
                        this.Bottom.pointB.g = color_;
                        this.Bottom.pointC.g = color_;
                        this.Bottom.pointD.g = color_;
                        // Bottom right BottomRight
                        this.Top.pointA.g = color_;
                        this.Top.pointB.g = color_;
                        this.Top.pointC.g = color_;
                        this.Top.pointD.g = color_;

                        App.operation.cube_buffer_procedure(this.parent)

                };

                this.colorData.SetBlueForAll = function(color_) {

                        // Front face
                        this.Front.pointA.b = color_;
                        this.Front.pointB.b = color_;
                        this.Front.pointC.b = color_;
                        this.Front.pointD.b = color_;
                        // Right face
                        this.Right.pointA.b = color_;
                        this.Right.pointB.b = color_;
                        this.Right.pointC.b = color_;
                        this.Right.pointD.b = color_;
                        // Back face
                        this.Back.pointA.b = color_;
                        this.Back.pointB.b = color_;
                        this.Back.pointC.b = color_;
                        this.Back.pointD.b = color_;
                        // Left face
                        this.Left.pointA.b = color_;
                        this.Left.pointB.b = color_;
                        this.Left.pointC.b = color_;
                        this.Left.pointD.b = color_;
                        // Bottom left
                        this.Bottom.pointA.b = color_;
                        this.Bottom.pointB.b = color_;
                        this.Bottom.pointC.b = color_;
                        this.Bottom.pointD.b = color_;
                        // Bottom right BottomRight
                        this.Top.pointA.b = color_;
                        this.Top.pointB.b = color_;
                        this.Top.pointC.b = color_;
                        this.Top.pointD.b = color_;
                        App.operation.cube_buffer_procedure(this.parent)

                };





        }

        setScaleByX(scale) {

                //for scale
                this.Left.pointA.x = -scale;
                this.Left.pointB.x = -scale;
                this.Left.pointC.x = -scale;
                this.Left.pointD.x = -scale;
                this.Right.pointA.x = scale;
                this.Right.pointB.x = scale;
                this.Right.pointC.x = scale;
                this.Right.pointD.x = scale;
                this.Top.pointA.x = -scale;
                this.Top.pointB.x = -scale;
                this.Top.pointC.x = scale;
                this.Top.pointD.x = scale;
                this.Bottom.pointA.x = -scale;
                this.Bottom.pointB.x = scale;
                this.Bottom.pointC.x = scale;
                this.Bottom.pointD.x = -scale;
                this.Front.pointA.x = -scale;
                this.Front.pointB.x = scale;
                this.Front.pointC.x = scale;
                this.Front.pointD.x = -scale;
                this.Back.pointA.x = -scale;
                this.Back.pointB.x = -scale;
                this.Back.pointC.x = scale;
                this.Back.pointD.x = scale;

                if (this.dynamicBuffer == true) return;

                App.operation.cube_buffer_procedure(this.root)
                return 'dynamicBuffer is false but i will update vertex array prototypical.';

        }

        setScaleByY(scale) {

                //for scale
                this.Left.pointA.y = -scale;
                this.Left.pointB.y = -scale;
                this.Left.pointC.y = scale;
                this.Left.pointD.y = scale;

                this.Right.pointA.y = -scale;
                this.Right.pointB.y = scale;
                this.Right.pointC.y = scale;
                this.Right.pointD.y = -scale;


                this.Top.pointA.y = scale;
                this.Top.pointB.y = scale;
                this.Top.pointC.y = scale;
                this.Top.pointD.y = scale;

                this.Bottom.pointA.y = -scale;
                this.Bottom.pointB.y = -scale;
                this.Bottom.pointC.y = -scale;
                this.Bottom.pointD.y = -scale;


                this.Front.pointA.y = -scale;
                this.Front.pointB.y = -scale;
                this.Front.pointC.y = scale;
                this.Front.pointD.y = scale;

                this.Back.pointA.y = -scale;
                this.Back.pointB.y = scale;
                this.Back.pointC.y = scale;
                this.Back.pointD.y = -scale;


                if (this.dynamicBuffer == true) return;

                App.operation.cube_buffer_procedure(this.root)
                return 'dynamicBuffer is false but i will update vertex array prototypical.';

        }

        setScaleByZ(scale) {

                //for scale

                this.Left.pointA.z = -scale;
                this.Left.pointB.z = scale;
                this.Left.pointC.z = scale;
                this.Left.pointD.z = -scale;

                this.Right.pointA.z = -scale;
                this.Right.pointB.z = -scale;
                this.Right.pointC.z = scale;
                this.Right.pointD.z = scale;


                this.Top.pointA.z = scale;
                this.Top.pointB.z = scale;
                this.Top.pointC.z = scale;
                this.Top.pointD.z = scale;

                this.Bottom.pointA.z = -scale;
                this.Bottom.pointB.z = -scale;
                this.Bottom.pointC.z = -scale;
                this.Bottom.pointD.z = -scale;


                this.Front.pointA.z = scale;
                this.Front.pointB.z = scale;
                this.Front.pointC.z = scale;
                this.Front.pointD.z = scale;

                this.Back.pointA.z = -scale;
                this.Back.pointB.z = -scale;
                this.Back.pointC.z = -scale;
                this.Back.pointD.z = -scale;


                if (this.dynamicBuffer == true) return;

                App.operation.cube_buffer_procedure(this.root)
                return 'dynamicBuffer is false but i will update vertex array prototypical.';

        }

        setScale(scale) {

                this.size = scale;
                //for scale
                this.basePoint = 1.0 * this.size;
                this.basePointNeg = -1.0 * this.size;
                if (this.dynamicBuffer == true) return;

                App.operation.cube_buffer_procedure(this.root)
                return 'dynamicBuffer is false but i will update vertex array prototypical.';

        }

        get vertices() {
                return new Float32Array([
                        // Front face
                        this.basePointNeg + this.Front.pointA.X, this.basePointNeg + this.Front.pointA.Y, this.basePoint + this.Front.pointA.Z,
                        this.basePoint + this.Front.pointB.X, this.basePointNeg + this.Front.pointB.Y, this.basePoint + this.Front.pointB.Z,
                        this.basePoint + this.Front.pointC.X, this.basePoint + this.Front.pointC.Y, this.basePoint + this.Front.pointC.Z,
                        this.basePointNeg + this.Front.pointD.X, this.basePoint + this.Front.pointD.Y, this.basePoint + this.Front.pointD.Z,

                        // Back face
                        this.basePointNeg + this.Back.pointA.X, this.basePointNeg + this.Back.pointA.Y, this.basePointNeg + this.Back.pointA.Z,
                        this.basePointNeg + this.Back.pointB.X, this.basePoint + this.Back.pointB.Y, this.basePointNeg + this.Back.pointB.Z,
                        this.basePoint + this.Back.pointC.X, this.basePoint + this.Back.pointC.Y, this.basePointNeg + this.Back.pointC.Z,
                        this.basePoint + this.Back.pointD.X, this.basePointNeg + this.Back.pointD.Y, this.basePointNeg + this.Back.pointD.Z,

                        // Top face
                        this.basePointNeg + this.Top.pointA.X, this.basePoint + this.Top.pointA.Y, this.basePointNeg + this.Top.pointA.Z,
                        this.basePointNeg + this.Top.pointB.X, this.basePoint + this.Top.pointB.Y, this.basePoint + this.Top.pointA.Z,
                        this.basePoint + this.Top.pointC.X, this.basePoint + this.Top.pointC.Y, this.basePoint + this.Top.pointA.Z,
                        this.basePoint + this.Top.pointD.X, this.basePoint + this.Top.pointD.Y, this.basePointNeg + this.Top.pointA.Z,

                        // Bottom face
                        this.basePointNeg + this.Bottom.pointA.X, this.basePointNeg + this.Bottom.pointA.Y, this.basePointNeg + this.Bottom.pointA.Z,
                        this.basePoint + this.Bottom.pointB.X, this.basePointNeg + this.Bottom.pointB.Y, this.basePointNeg + this.Bottom.pointB.Z,
                        this.basePoint + this.Bottom.pointC.X, this.basePointNeg + this.Bottom.pointC.Y, this.basePoint + this.Bottom.pointC.Z,
                        this.basePointNeg + this.Bottom.pointD.X, this.basePointNeg + this.Bottom.pointD.Y, this.basePoint + this.Bottom.pointD.Z,

                        // Right face
                        this.basePoint + this.Right.pointA.X, this.basePointNeg + this.Right.pointA.Y, this.basePointNeg + this.Right.pointA.Z,
                        this.basePoint + this.Right.pointB.X, this.basePoint + this.Right.pointB.Y, this.basePointNeg + this.Right.pointB.Z,
                        this.basePoint + this.Right.pointC.X, this.basePoint + this.Right.pointC.Y, this.basePoint + this.Right.pointC.Z,
                        this.basePoint + this.Right.pointD.X, this.basePointNeg + this.Right.pointD.Y, this.basePoint + this.Right.pointD.Z,

                        // Left face
                        this.basePointNeg + this.Left.pointA.X, this.basePointNeg + this.Left.pointA.Y, this.basePointNeg + this.Left.pointA.Z,
                        this.basePointNeg + this.Left.pointB.X, this.basePointNeg + this.Left.pointB.Y, this.basePoint + this.Left.pointB.Z,
                        this.basePointNeg + this.Left.pointC.X, this.basePoint + this.Left.pointC.Y, this.basePoint + this.Left.pointC.Z,
                        this.basePointNeg + this.Left.pointD.X, this.basePoint + this.Left.pointD.Y, this.basePointNeg + this.Left.pointD.Z
                ]);
        }

        get texCoords() {
                return new Float32Array([
                        // Front face
                        0.0, 0.0,
                        0.0, 1.0,
                        1.0, 1.0,
                        1.0, 0.0,

                        // Back face
                        1.0, 1.0,
                        1.0, 0.0,
                        0.0, 0.0,
                        0.0, 1.0,

                        // Top face
                        1.0, 0.0,
                        0.0, 0.0,
                        0.0, 1.0,
                        1.0, 1.0,

                        // Bottom face
                        0.0, 0.0,
                        0.0, 1.0,
                        1.0, 1.0,
                        1.0, 0.0,

                        // Right face
                        0.0, 0.0,
                        0.0, 1.0,
                        1.0, 1.0,
                        1.0, 0.0,

                        // Left face
                        0.0, 0.0,
                        0.0, 1.0,
                        1.0, 1.0,
                        1.0, 0.0
                ]);
        }

        get indices() {
                return [
                        0, 1, 2, 0, 2, 3,    // front
                        4, 5, 6, 4, 6, 7,    // back
                        8, 9, 10, 8, 10, 11,   // top
                        12, 13, 14, 12, 14, 15,   // bottom
                        16, 17, 18, 16, 18, 19,   // right
                        20, 21, 22, 20, 22, 23    // left
                ];
        }

        get color() {

                return new Float32Array([
                        // Front face
                        this.colorData.Front.pointA.r, this.colorData.Front.pointA.g, this.colorData.Front.pointA.b, this.colorData.Front.pointA.ALPHA,
                        this.colorData.Front.pointB.r, this.colorData.Front.pointB.g, this.colorData.Front.pointB.b, this.colorData.Front.pointB.ALPHA,
                        this.colorData.Front.pointC.r, this.colorData.Front.pointC.g, this.colorData.Front.pointC.b, this.colorData.Front.pointC.ALPHA,
                        this.colorData.Front.pointD.r, this.colorData.Front.pointD.g, this.colorData.Front.pointD.b, this.colorData.Front.pointD.ALPHA,
                        // Right face
                        this.colorData.Right.pointA.r, this.colorData.Right.pointA.g, this.colorData.Right.pointA.b, this.colorData.Right.pointA.ALPHA,
                        this.colorData.Right.pointB.r, this.colorData.Right.pointB.g, this.colorData.Right.pointB.b, this.colorData.Right.pointB.ALPHA,
                        this.colorData.Right.pointC.r, this.colorData.Right.pointC.g, this.colorData.Right.pointC.b, this.colorData.Right.pointC.ALPHA,
                        this.colorData.Right.pointD.r, this.colorData.Right.pointD.g, this.colorData.Right.pointD.b, this.colorData.Right.pointD.ALPHA,
                        // Back face
                        this.colorData.Back.pointA.r, this.colorData.Back.pointA.g, this.colorData.Back.pointA.b, this.colorData.Back.pointA.ALPHA,
                        this.colorData.Back.pointB.r, this.colorData.Back.pointB.g, this.colorData.Back.pointB.b, this.colorData.Back.pointB.ALPHA,
                        this.colorData.Back.pointC.r, this.colorData.Back.pointC.g, this.colorData.Back.pointC.b, this.colorData.Back.pointC.ALPHA,
                        this.colorData.Back.pointD.r, this.colorData.Back.pointD.g, this.colorData.Back.pointD.b, this.colorData.Back.pointD.ALPHA,
                        // Left face
                        this.colorData.Left.pointA.r, this.colorData.Left.pointA.g, this.colorData.Left.pointA.b, this.colorData.Left.pointA.ALPHA,
                        this.colorData.Left.pointB.r, this.colorData.Left.pointB.g, this.colorData.Left.pointB.b, this.colorData.Left.pointB.ALPHA,
                        this.colorData.Left.pointC.r, this.colorData.Left.pointC.g, this.colorData.Left.pointC.b, this.colorData.Left.pointC.ALPHA,
                        this.colorData.Left.pointD.r, this.colorData.Left.pointD.g, this.colorData.Left.pointD.b, this.colorData.Left.pointD.ALPHA,
                        // Bottom left
                        this.colorData.Bottom.pointA.r, this.colorData.Bottom.pointA.g, this.colorData.Bottom.pointA.b, this.colorData.Bottom.pointA.ALPHA,
                        this.colorData.Bottom.pointB.r, this.colorData.Bottom.pointB.g, this.colorData.Bottom.pointB.b, this.colorData.Bottom.pointB.ALPHA,
                        this.colorData.Bottom.pointC.r, this.colorData.Bottom.pointC.g, this.colorData.Bottom.pointC.b, this.colorData.Bottom.pointC.ALPHA,
                        this.colorData.Bottom.pointD.r, this.colorData.Bottom.pointD.g, this.colorData.Bottom.pointD.b, this.colorData.Bottom.pointD.ALPHA,
                        // Bottom right BottomRight
                        this.colorData.Top.pointA.r, this.colorData.Top.pointA.g, this.colorData.Top.pointA.b, this.colorData.Top.pointA.ALPHA,
                        this.colorData.Top.pointB.r, this.colorData.Top.pointB.g, this.colorData.Top.pointB.b, this.colorData.Top.pointB.ALPHA,
                        this.colorData.Top.pointC.r, this.colorData.Top.pointC.g, this.colorData.Top.pointC.b, this.colorData.Top.pointC.ALPHA,
                        this.colorData.Top.pointD.r, this.colorData.Top.pointD.g, this.colorData.Top.pointD.b, this.colorData.Top.pointD.ALPHA,

                ]);



        }


}

class GeoOfColor {

        constructor(type_) {

                if (typeof type_ != 'undefined') {



                        if (type_ == '4x4' || type_ == "square") {

                                return new Float32Array([
                                        1.0, 0.0, 0.0, 1.0, //Top right
                                        0.0, 1.0, 0.0, 1.0, //Top left
                                        0.0, 0.0, 1.0, 1.0, //Bottom right
                                        0.5, 1.0, 0.5, 1.0  //Bottom left
                                ]);


                        }
                        else if (type_ == 'triangle') {

                                return [
                                        1.0, 0.0, 0.0, 1.0, // Top
                                        0.0, 1.0, 0.0, 1.0, // Right
                                        0.0, 0.0, 1.0, 1.0  // Bottom
                                ];


                        }

                        else if (type_ == 'Piramide4') {

                                this.front = "test";


                                return new Float32Array([
                                        // Front face
                                        1.0, 0.0, 0.0, 1.0,
                                        0.0, 1.0, 0.0, 1.0,
                                        0.0, 0.0, 1.0, 1.0,

                                        // Right face
                                        1.0, 0.0, 0.0, 1.0,
                                        0.0, 0.0, 1.0, 1.0,
                                        0.0, 1.0, 0.0, 1.0,

                                        // Back face
                                        1.0, 0.0, 0.0, 1.0,
                                        0.0, 1.0, 0.0, 1.0,
                                        0.0, 0.0, 1.0, 1.0,

                                        // Left face
                                        1.0, 0.0, 0.0, 1.0,
                                        0.0, 0.0, 1.0, 1.0,
                                        0.0, 1.0, 0.0, 1.0,

                                        // Bottom left
                                        0.0, 1.0, 0.0, 1.0,
                                        0.0, 0.0, 1.0, 1.0,
                                        0.0, 1.0, 0.0, 1.0,

                                        // Bottom right
                                        0.0, 1.0, 0.0, 1.0,
                                        0.0, 1.0, 0.0, 1.0,
                                        0.0, 0.0, 1.0, 1.0
                                ]);

                        }
                        else if (type_ == 'cube') {

                                return [
                                        [1.0, 1.0, 1.0, 1.0], // Front face
                                        [1.0, 1.0, 0.0, 1.0], // Back face
                                        [0.0, 1.0, 0.0, 1.0], // Top face
                                        [1.0, 0.5, 0.5, 1.0], // Bottom face
                                        [1.0, 0.0, 1.0, 1.0], // Right face
                                        [0.0, 0.0, 1.0, 1.0]  // Left face
                                ];

                        }
                        else if (type_ == 'cubelight' || type_ == 'cube light') {

                                return new Float32Array([
                                        // Front face
                                        0.0, 0.0, 1.0,
                                        0.0, 0.0, 1.0,
                                        0.0, 0.0, 1.0,
                                        0.0, 0.0, 1.0,

                                        // Back face
                                        0.0, 0.0, -1.0,
                                        0.0, 0.0, -1.0,
                                        0.0, 0.0, -1.0,
                                        0.0, 0.0, -1.0,

                                        // Top face
                                        0.0, 1.0, 0.0,
                                        0.0, 1.0, 0.0,
                                        0.0, 1.0, 0.0,
                                        0.0, 1.0, 0.0,

                                        // Bottom face
                                        0.0, -1.0, 0.0,
                                        0.0, -1.0, 0.0,
                                        0.0, -1.0, 0.0,
                                        0.0, -1.0, 0.0,

                                        // Right face
                                        1.0, 0.0, 0.0,
                                        1.0, 0.0, 0.0,
                                        1.0, 0.0, 0.0,
                                        1.0, 0.0, 0.0,

                                        // Left face
                                        -1.0, 0.0, 0.0,
                                        -1.0, 0.0, 0.0,
                                        -1.0, 0.0, 0.0,
                                        -1.0, 0.0, 0.0
                                ]);



                        }






                }
                else {

                        return [
                                1.0, 0.0, 0.0, 1.0, //Top right
                                0.0, 1.0, 0.0, 1.0, //Top left
                                0.0, 0.0, 1.0, 1.0, //Bottom right
                                0.5, 1.0, 0.5, 1.0  //Bottom left
                        ];


                }

        }


}

class PiramideVertex {

        constructor(root) {

                this.root = root;
                this.size = root.size;

                this.dynamicBuffer = true;
                this.spitz = 0;
                this.basePoint = 1.0 * this.size;
                this.basePointNeg = -1.0 * this.size;

                this.colorData = {};
                this.colorData.parent = this.root;

                this.colorData.Front = {

                        pointA: new COLOR_ALPHA(1.0, 0.0, 0.0, 1.0),
                        pointB: new COLOR_ALPHA(0.0, 1.0, 0.0, 1.0),
                        pointC: new COLOR_ALPHA(0.0, 0.0, 1.0, 1.0),


                };
                this.colorData.Back = {

                        pointA: new COLOR_ALPHA(1.0, 0.0, 0.0, 1.0),
                        pointB: new COLOR_ALPHA(0.0, 1.0, 0.0, 1.0),
                        pointC: new COLOR_ALPHA(0.0, 0.0, 1.0, 1.0),

                };
                this.colorData.BottomRight = {

                        pointA: new COLOR_ALPHA(0.0, 1.0, 0.0, 1.0),
                        pointB: new COLOR_ALPHA(0.0, 1.0, 0.0, 1.0),
                        pointC: new COLOR_ALPHA(0.0, 0.0, 1.0, 1.0),

                };
                this.colorData.Bottom = {

                        pointA: new COLOR_ALPHA(0.0, 1.0, 0.0, 1.0),
                        pointB: new COLOR_ALPHA(0.0, 0.0, 1.0, 1.0),
                        pointC: new COLOR_ALPHA(0.0, 1.0, 0.0, 1.0),

                };
                this.colorData.Right = {

                        pointA: new COLOR_ALPHA(1.0, 0.0, 0.0, 1.0),
                        pointB: new COLOR_ALPHA(0.0, 0.0, 1.0, 1.0),
                        pointC: new COLOR_ALPHA(0.0, 1.0, 0.0, 1.0),

                };
                this.colorData.Left = {

                        pointA: new COLOR_ALPHA(1.0, 0.0, 0.0, 1.0),
                        pointB: new COLOR_ALPHA(0.0, 0.0, 1.0, 1.0),
                        pointC: new COLOR_ALPHA(0.0, 1.0, 0.0, 1.0),

                };

                this.colorData.SetRedForAll = function(red_) {

                        // Front face
                        this.Front.pointA.r = red_;
                        this.Front.pointB.r = red_;
                        this.Front.pointC.r = red_;
                        // Right face
                        this.Right.pointA.r = red_;
                        this.Right.pointB.r = red_;
                        this.Right.pointC.r = red_;
                        // Back face
                        this.Back.pointA.r = red_;
                        this.Back.pointB.r = red_;
                        this.Back.pointC.r = red_;
                        // Left face
                        this.Left.pointA.r = red_;
                        this.Left.pointB.r = red_;
                        this.Left.pointC.r = red_;
                        // Bottom left
                        this.Bottom.pointA.r = red_;
                        this.Bottom.pointB.r = red_;
                        this.Bottom.pointC.r = red_;
                        // Bottom right BottomRight
                        this.BottomRight.pointA.r = red_;
                        this.BottomRight.pointB.r = red_;
                        this.BottomRight.pointC.r = red_;

                        App.operation.piramide_buffer_procedure(this.parent)

                };

                this.colorData.SetGreenForAll = function(color_) {

                        // Front face
                        this.Front.pointA.g = color_;
                        this.Front.pointB.g = color_;
                        this.Front.pointC.g = color_;
                        // Right face
                        this.Right.pointA.g = color_;
                        this.Right.pointB.g = color_;
                        this.Right.pointC.g = color_;
                        // Back face
                        this.Back.pointA.g = color_;
                        this.Back.pointB.g = color_;
                        this.Back.pointC.g = color_;
                        // Left face
                        this.Left.pointA.g = color_;
                        this.Left.pointB.g = color_;
                        this.Left.pointC.g = color_;
                        // Bottom left
                        this.Bottom.pointA.g = color_;
                        this.Bottom.pointB.g = color_;
                        this.Bottom.pointC.g = color_;
                        // Bottom right BottomRight
                        this.BottomRight.pointA.g = color_;
                        this.BottomRight.pointB.g = color_;
                        this.BottomRight.pointC.g = color_;

                        App.operation.piramide_buffer_procedure(this.parent)

                };

                this.colorData.SetBlueForAll = function(color_) {

                        // Front face
                        this.Front.pointA.b = color_;
                        this.Front.pointB.b = color_;
                        this.Front.pointC.b = color_;
                        // Right face
                        this.Right.pointA.b = color_;
                        this.Right.pointB.b = color_;
                        this.Right.pointC.b = color_;
                        // Back face
                        this.Back.pointA.b = color_;
                        this.Back.pointB.b = color_;
                        this.Back.pointC.b = color_;
                        // Left face
                        this.Left.pointA.b = color_;
                        this.Left.pointB.b = color_;
                        this.Left.pointC.b = color_;
                        // Bottom left
                        this.Bottom.pointA.b = color_;
                        this.Bottom.pointB.b = color_;
                        this.Bottom.pointC.b = color_;
                        // Bottom right BottomRight
                        this.BottomRight.pointA.b = color_;
                        this.BottomRight.pointB.b = color_;
                        this.BottomRight.pointC.b = color_;

                        App.operation.piramide_buffer_procedure(this.parent)

                };




        }

        setScale(scale) {

                this.size = scale;

                this.basePoint = 1.0 * this.size;
                this.basePointNeg = -1.0 * this.size;

                if (this.dynamicBuffer == true) return;

                App.operation.piramide_buffer_procedure(this.root)

                return 'dynamicBuffer is false but i will update vertex array prototypical.';


        }

        setSpitz(newValueFloat) {

                this.spitz = newValueFloat;

                if (this.dynamicBuffer == true) return;

                App.operation.piramide_buffer_procedure(this.root)

        }
        //from cube
        get verticesC() {
                return new Float32Array([
                        // Front face
                        -1.0, -1.0, 1.0,
                        1.0, -1.0, 1.0,
                        0.0, 15.0, 0.0,
                        0.0, 15.0, 0.0,

                        // Back face
                        -1.0, -1.0, -1.0,
                        0.0, 15.0, 0.0,
                        0.0, 15.0, 0.0,
                        1.0, -1.0, -1.0,

                        // Top face
                        0.0, 15.0, 0.0,
                        0.0, 15.0, 0.0,
                        0.0, 15.0, 0.0,
                        0.0, 15.0, 0.0,

                        // Bottom face
                        -1.0, -1.0, -1.0,
                        1.0, -1.0, -1.0,
                        1.0, -1.0, 1.0,
                        -1.0, -1.0, 1.0,

                        // Right face
                        1.0, -1.0, -1.0,
                        0.0, 15.0, 0.0,
                        0.0, 15.0, 0.0,
                        1.0, -1.0, 1.0,

                        // Left face
                        -1.0, -1.0, -1.0,
                        -1.0, -1.0, 1.0,
                        0.0, 15.0, 0.0,
                        0.0, 15.0, 0.0
                ]);

        }

        get normals() { // from cube

                return new Float32Array([
                        // Front face
                        0.0, 0.0, 1.0,
                        0.0, 0.0, 1.0,
                        0.0, 0.0, 1.0,
                        0.0, 0.0, 1.0,

                        // Back face
                        0.0, 0.0, -1.0,
                        0.0, 0.0, -1.0,
                        0.0, 0.0, -1.0,
                        0.0, 0.0, -1.0,

                        // Top face
                        0.0, 1.0, 0.0,
                        0.0, 1.0, 0.0,
                        0.0, 1.0, 0.0,
                        0.0, 1.0, 0.0,

                        // Bottom face
                        0.0, -1.0, 0.0,
                        0.0, -1.0, 0.0,
                        0.0, -1.0, 0.0,
                        0.0, -1.0, 0.0,

                        // Right face
                        1.0, 0.0, 0.0,
                        1.0, 0.0, 0.0,
                        1.0, 0.0, 0.0,
                        1.0, 0.0, 0.0,

                        // Left face
                        -1.0, 0.0, 0.0,
                        -1.0, 0.0, 0.0,
                        -1.0, 0.0, 0.0,
                        -1.0, 0.0, 0.0
                ]);

        }
        // from cube
        get texCoords() {
                return new Float32Array([
                        // Front face
                        0.0, 0.0,
                        1.0, 0.0,
                        1.0, 1.0,
                        0.0, 1.0,

                        // Back face
                        1.0, 0.0,
                        1.0, 1.0,
                        0.0, 1.0,
                        0.0, 0.0,

                        // Top face
                        0.0, 1.0,
                        0.0, 0.0,
                        1.0, 0.0,
                        1.0, 1.0,

                        // Bottom face
                        1.0, 1.0,
                        0.0, 1.0,
                        0.0, 0.0,
                        1.0, 0.0,

                        // Right face
                        1.0, 0.0,
                        1.0, 1.0,
                        0.0, 1.0,
                        0.0, 0.0,

                        // Left face
                        0.0, 0.0,
                        1.0, 0.0,
                        1.0, 1.0,
                        0.0, 1.0
                ])


        }

        get indices() {

                return [
                        0, 1, 2, 0, 2, 3,    // Front face
                        4, 5, 6, 4, 6, 7,    // Back face
                        8, 9, 10, 8, 10, 11,  // Top face
                        12, 13, 14, 12, 14, 15, // Bottom face
                        16, 17, 18, 16, 18, 19, // Right face
                        20, 21, 22, 20, 22, 23  // Left face
                ];

        }

        get color() {

                return new Float32Array([
                        // Front face
                        this.colorData.Front.pointA.r, this.colorData.Front.pointA.g, this.colorData.Front.pointA.b, this.colorData.Front.pointA.ALPHA,
                        this.colorData.Front.pointB.r, this.colorData.Front.pointB.g, this.colorData.Front.pointB.b, this.colorData.Front.pointB.ALPHA,
                        this.colorData.Front.pointC.r, this.colorData.Front.pointC.g, this.colorData.Front.pointC.b, this.colorData.Front.pointC.ALPHA,

                        // Right face
                        this.colorData.Right.pointA.r, this.colorData.Right.pointA.g, this.colorData.Right.pointA.b, this.colorData.Right.pointA.ALPHA,
                        this.colorData.Right.pointB.r, this.colorData.Right.pointB.g, this.colorData.Right.pointB.b, this.colorData.Right.pointB.ALPHA,
                        this.colorData.Right.pointC.r, this.colorData.Right.pointC.g, this.colorData.Right.pointC.b, this.colorData.Right.pointC.ALPHA,

                        // Back face
                        this.colorData.Back.pointA.r, this.colorData.Back.pointA.g, this.colorData.Back.pointA.b, this.colorData.Back.pointA.ALPHA,
                        this.colorData.Back.pointB.r, this.colorData.Back.pointB.g, this.colorData.Back.pointB.b, this.colorData.Back.pointB.ALPHA,
                        this.colorData.Back.pointC.r, this.colorData.Back.pointC.g, this.colorData.Back.pointC.b, this.colorData.Back.pointC.ALPHA,

                        // Left face
                        this.colorData.Left.pointA.r, this.colorData.Left.pointA.g, this.colorData.Left.pointA.b, this.colorData.Left.pointA.ALPHA,
                        this.colorData.Left.pointB.r, this.colorData.Left.pointB.g, this.colorData.Left.pointB.b, this.colorData.Left.pointB.ALPHA,
                        this.colorData.Left.pointC.r, this.colorData.Left.pointC.g, this.colorData.Left.pointC.b, this.colorData.Left.pointC.ALPHA,

                        // Bottom left
                        this.colorData.Bottom.pointA.r, this.colorData.Bottom.pointA.g, this.colorData.Bottom.pointA.b, this.colorData.Bottom.pointA.ALPHA,
                        this.colorData.Bottom.pointB.r, this.colorData.Bottom.pointB.g, this.colorData.Bottom.pointB.b, this.colorData.Bottom.pointB.ALPHA,
                        this.colorData.Bottom.pointC.r, this.colorData.Bottom.pointC.g, this.colorData.Bottom.pointC.b, this.colorData.Bottom.pointC.ALPHA,

                        // Bottom right BottomRight
                        this.colorData.BottomRight.pointA.r, this.colorData.BottomRight.pointA.g, this.colorData.BottomRight.pointA.b, this.colorData.BottomRight.pointA.ALPHA,
                        this.colorData.BottomRight.pointB.r, this.colorData.BottomRight.pointB.g, this.colorData.BottomRight.pointB.b, this.colorData.BottomRight.pointB.ALPHA,
                        this.colorData.BottomRight.pointC.r, this.colorData.BottomRight.pointC.g, this.colorData.BottomRight.pointC.b, this.colorData.BottomRight.pointC.ALPHA
                ]);



        }

        get vertices() {
                return new Float32Array([

                        0.0, this.basePoint + this.spitz, 0.0,
                        this.basePointNeg, this.basePointNeg, this.basePoint,
                        this.basePoint, this.basePointNeg, this.basePoint,

                        // Right face
                        0.0, this.basePoint + this.spitz, 0.0,
                        this.basePoint, this.basePointNeg, this.basePoint,
                        this.basePoint, this.basePointNeg, this.basePointNeg,

                        // Back face
                        0.0, this.basePoint + this.spitz, 0.0,
                        this.basePoint, this.basePointNeg, this.basePointNeg,
                        this.basePointNeg, this.basePointNeg, this.basePointNeg,

                        // Left face
                        0.0, this.basePoint + this.spitz, 0.0,
                        this.basePointNeg, this.basePointNeg, this.basePointNeg,
                        this.basePointNeg, this.basePointNeg, this.basePoint,

                        //Bottom left
                        this.basePointNeg, this.basePointNeg, this.basePoint,
                        this.basePoint, this.basePointNeg, this.basePoint,
                        this.basePoint, this.basePointNeg, this.basePointNeg,

                        //Bottom right
                        this.basePointNeg, this.basePointNeg, this.basePoint,
                        this.basePoint, this.basePointNeg, this.basePointNeg,
                        this.basePointNeg, this.basePointNeg, this.basePointNeg
                ]);



        }

}

class sphereVertex {

        createGeoData(root) {


                //
                this.size = root.size;
                this.basePoint = 1.0 * this.size;
                this.basePointNeg = -1.0 * this.size;
                this.dynamicBuffer = true;
                //

                this.latitudeBands = root.latitudeBands;
                this.longitudeBands = root.longitudeBands;
                this.radius = root.radius;


                this.vertexPositionData = [];
                this.normalData = [];
                this.textureCoordData = [];


                for (var latNumber = 0; latNumber <= this.latitudeBands; latNumber++) {
                        var theta = latNumber * Math.PI / this.latitudeBands;
                        var sinTheta = Math.sin(theta);
                        var cosTheta = Math.cos(theta);

                        for (var longNumber = 0; longNumber <= this.longitudeBands; longNumber++) {
                                var phi = longNumber * 2 * Math.PI / this.longitudeBands;
                                var sinPhi = Math.sin(phi);
                                var cosPhi = Math.cos(phi);

                                var x = cosPhi * sinTheta;
                                var y = cosTheta;
                                var z = sinPhi * sinTheta;
                                var u = 1 - (longNumber / this.longitudeBands);
                                var v = 1 - (latNumber / this.latitudeBands);

                                this.normalData.push(x);
                                this.normalData.push(y);
                                this.normalData.push(z);
                                this.textureCoordData.push(u);
                                this.textureCoordData.push(v);
                                this.vertexPositionData.push(this.radius * x);
                                this.vertexPositionData.push(this.radius * y);
                                this.vertexPositionData.push(this.radius * z);
                        }
                }

                this.indexData = [];
                for (var latNumber = 0; latNumber < this.latitudeBands; latNumber++) {
                        for (var longNumber = 0; longNumber < this.longitudeBands; longNumber++) {
                                var first = (latNumber * (this.longitudeBands + 1)) + longNumber;
                                var second = first + this.longitudeBands + 1;
                                this.indexData.push(first);
                                this.indexData.push(second);
                                this.indexData.push(first + 1);

                                this.indexData.push(second);
                                this.indexData.push(second + 1);
                                this.indexData.push(first + 1);
                        }
                }



                //


        }


        constructor(root) {

                this.root = root;
                this.createGeoData(this.root);

        }


        setRadius(scale) {

                this.radius = scale;
                this.root.radius = scale;


                if (this.dynamicBuffer == true) {
                        this.createGeoData(this.root);
                        App.operation.sphere_buffer_procedure(this.root)
                        return;
                }


                //App.operation.sphere_buffer_procedure(this.root)
                //return 'dynamicBuffer is false but i will update vertex array prototypical.';

        }



        get vertices() {

                return new Float32Array(this.vertexPositionData);


        }
        /////////////////


        get texCoords() {



                return new Float32Array(this.textureCoordData);



        }


        get normals() {


                return new Float32Array(this.normalData);

        }


        get indices() {



                return this.indexData;



        }



}


// SPHERE 0 custom
class customVertex {


        createGeoData(root) {

                //
                this.size = root.size;
                this.basePoint = 1.0 * this.size;
                this.basePointNeg = -1.0 * this.size;
                this.dynamicBuffer = true;
                //

                this.latitudeBands = root.latitudeBands;
                this.longitudeBands = root.longitudeBands;
                this.radius = root.radius;

                this.vertexPositionData = [];
                this.normalData = [];
                this.textureCoordData = [];


                if (this.root.custom_type == 'spiral') {


                        for (var latNumber = 0; latNumber <= this.latitudeBands; latNumber++) {


                                var theta = latNumber * Math.PI / this.latitudeBands;
                                var sinTheta = Math.sin(theta);
                                var cosTheta = Math.cos(theta);


                                for (var longNumber = 0; longNumber <= this.longitudeBands; longNumber++) {


                                        var phi = longNumber * 2 * Math.PI / this.longitudeBands;
                                        var sinPhi = Math.sin(phi);
                                        var cosPhi = Math.cos(phi);

                                        var x = latNumber * cosPhi;
                                        var y = longNumber * sinPhi;
                                        var z = longNumber * cosPhi;


                                        var u = 1 - (longNumber / this.longitudeBands);
                                        var v = 1 - (latNumber / this.latitudeBands);

                                        this.normalData.push(x);
                                        this.normalData.push(y);
                                        this.normalData.push(z);
                                        this.textureCoordData.push(u);
                                        this.textureCoordData.push(v);
                                        this.vertexPositionData.push(this.radius * x);
                                        this.vertexPositionData.push(this.radius * y);
                                        this.vertexPositionData.push(this.radius * z);


                                }
                        }

                        this.indexData = [];
                        for (var latNumber = 0; latNumber < this.latitudeBands; latNumber++) {
                                for (var longNumber = 0; longNumber < this.longitudeBands; longNumber++) {
                                        var first = (latNumber * (this.longitudeBands + 1)) + longNumber;
                                        var second = first + this.longitudeBands + 1;
                                        this.indexData.push(first);
                                        this.indexData.push(second);
                                        this.indexData.push(first + 1);

                                        this.indexData.push(second);
                                        this.indexData.push(second + 1);
                                        this.indexData.push(first + 1);
                                }
                        }



                }

                else if (this.root.custom_type == 'cubic') {


                        for (var j = 0; j < 8; j++) {


                                var x = j + 1 * S1.GET()
                                var y = 1
                                var z = j + 1

                                this.normalData.push(x);
                                this.normalData.push(y);
                                this.normalData.push(z);
                                this.textureCoordData.push(u);
                                this.textureCoordData.push(v);
                                this.vertexPositionData.push(this.radius * x);
                                this.vertexPositionData.push(this.radius * y);
                                this.vertexPositionData.push(this.radius * z);


                        }

                        this.indexData = [];
                        for (var j = 0; j < 8; j++) {


                                var first = (4 * (2 + 1)) + j;
                                var second = first + 2 + 1;
                                this.indexData.push(first);
                                this.indexData.push(second);
                                this.indexData.push(first + 1);

                                this.indexData.push(second);
                                this.indexData.push(second + 1);
                                this.indexData.push(first + 1);


                        }


                }

        }

        constructor(root) {

                this.root = root;
                this.createGeoData(this.root);

        }


        setRadius(scale) {

                this.radius = scale;
                this.root.radius = scale;

                if (this.dynamicBuffer == true) {
                        this.createGeoData(this.root);
                        App.operation.sphere_buffer_procedure(this.root)
                        this.root.glDrawElements.numberOfIndicesRender = this.indices.length;
                        return;
                }

                App.operation.sphere_buffer_procedure(this.root)
                this.root.glDrawElements.numberOfIndicesRender = this.indices.length;
                return 'dynamicBuffer is false but i will update vertex array prototypical.';

        }


        //customObject.glDrawElements = new _DrawElements(customObject.vertexIndexBuffer.numItems);


        get vertices() {

                return new Float32Array(this.vertexPositionData);

        }
        /////////////////


        get texCoords() {



                return new Float32Array(this.textureCoordData);



        }


        get normals() {


                return new Float32Array(this.normalData);

        }


        get indices() {



                return this.indexData;



        }



}


//COLOR
function COLOR(r_, g_, b_) {


        var ROOT = this;
        ROOT.r = parseFloat(r_);
        ROOT.g = parseFloat(g_);
        ROOT.b = parseFloat(b_);

        ROOT.R = function() { return parseFloat(ROOT.r) };
        ROOT.G = function() { return parseFloat(ROOT.g) };
        ROOT.B = function() { return parseFloat(ROOT.b) };

        ROOT.set = function(r_, g_, b_) {

                ROOT.r = parseFloat(r_);
                ROOT.g = parseFloat(g_);
                ROOT.b = parseFloat(b_);

        };

        ROOT.print = function() { console.log("color data RGB format : R:" + ROOT.r + "  G:" + ROOT.g + "  B:" + ROOT.b); };

}


function COLOR_ALPHA(r_, g_, b_, a_) {


        var ROOT = this;
        ROOT.r = parseFloat(r_);
        ROOT.g = parseFloat(g_);
        ROOT.b = parseFloat(b_);

        if (typeof a_ == 'undefined') {
                var a_ = 1.0;
        }

        ROOT.a = parseFloat(a_);

        ROOT.R = function() { return parseFloat(ROOT.r) };
        ROOT.G = function() { return parseFloat(ROOT.g) };
        ROOT.B = function() { return parseFloat(ROOT.b) };
        ROOT.ALPHA = function() { return parseFloat(ROOT.a) };

        ROOT.set = function(r_, g_, b_, a_) {

                ROOT.r = parseFloat(r_);
                ROOT.g = parseFloat(g_);
                ROOT.b = parseFloat(b_);
                ROOT.a = parseFloat(a_);

        };

        ROOT.print = function() { console.log("color data RGB format : R:" + ROOT.r + "  G:" + ROOT.g + "  B:" + ROOT.b + "  ALPHA:" + ROOT.ALPHA); };

}




//http://math.hws.edu/graphicsbook/source/webgl/cube-camera.html
/**
 * Creates a model of an annulus or disk lying in the xy plane,
 * centered at the origin.  (This is not a great representation,
 * since all the normals are the same.)
 * @param innerRadius the radius of the hole in the radius; a value of
 *    zero will give a disk rather than a ring.  If not present,
 *    the default value is 0.25.
 * @param outerRadius the radius of the ring, from the center to teh
 *    outer edge.  Must be greater than innerRadius.  If not provided,
 *    the default value is 2*innerRadius or is 0.5 if innerRadius is 0.
 * @slices the number of radial subdivisions in the circular approximation
 *    of an annulus.  If not provided, the value will be 32.
 */


// SPHERE 0 custom
class customVertex_1 {


        createGeoData(root) {

                if (arguments.length == 0)
                        innerRadius = 0.25;
                outerRadius = outerRadius || innerRadius * 2 || 0.5;
                slices = slices || 32;

                var vertexCount, vertices, normals, texCoords, indices, i;
                vertexCount = (innerRadius == 0) ? slices + 1 : slices * 2;
                vertices = new Float32Array(3 * vertexCount);
                normals = new Float32Array(3 * vertexCount);
                texCoords = new Float32Array(2 * vertexCount);
                indices = new Uint16Array(innerRadius == 0 ? 3 * slices : 3 * 2 * slices);
                var d = 2 * Math.PI / slices;
                var k = 0;
                var t = 0;
                var n = 0;
                if (innerRadius == 0) {
                        for (i = 0; i < slices; i++) {
                                c = Math.cos(d * i);
                                s = Math.sin(d * i);
                                vertices[k++] = c * outerRadius;
                                vertices[k++] = s * outerRadius;
                                vertices[k++] = 0;
                                texCoords[t++] = 0.5 + 0.5 * c;
                                texCoords[t++] = 0.5 + 0.5 * s;
                                indices[n++] = slices;
                                indices[n++] = i;
                                indices[n++] = i == slices - 1 ? 0 : i + 1;
                        }
                        vertices[k++] = vertices[k++] = vertices[k++] = 0;
                        texCoords[t++] = texCoords[t++] = 0;
                }
                else {
                        var r = innerRadius / outerRadius;
                        for (i = 0; i < slices; i++) {
                                c = Math.cos(d * i);
                                s = Math.sin(d * i);
                                vertices[k++] = c * innerRadius;
                                vertices[k++] = s * innerRadius;
                                vertices[k++] = 0;
                                texCoords[t++] = 0.5 + 0.5 * c * r;
                                texCoords[t++] = 0.5 + 0.5 * s * r;
                                vertices[k++] = c * outerRadius;
                                vertices[k++] = s * outerRadius;
                                vertices[k++] = 0;
                                texCoords[t++] = 0.5 + 0.5 * c;
                                texCoords[t++] = 0.5 + 0.5 * s;
                        }
                        for (i = 0; i < slices - 1; i++) {
                                indices[n++] = 2 * i;
                                indices[n++] = 2 * i + 1;
                                indices[n++] = 2 * i + 3;
                                indices[n++] = 2 * i;
                                indices[n++] = 2 * i + 3;
                                indices[n++] = 2 * i + 2;
                        }
                        indices[n++] = 2 * i;
                        indices[n++] = 2 * i + 1;
                        indices[n++] = 1;
                        indices[n++] = 2 * i;
                        indices[n++] = 1;
                        indices[n++] = 0;
                }
                for (i = 0; i < vertexCount; i++) {
                        normals[3 * i] = normals[3 * i + 1] = 0;
                        normals[3 * i + 2] = 1;
                }

                /*
                 return {
                 vertexPositions: vertices,
                 vertexNormals: normals,
                 vertexTextureCoords: texCoords,
                 indices: indices
                 };
                 */


        }


}
function ring(innerRadius, outerRadius, slices) {

}











/*
 visual-js webgl2 project
 Nikola Lukic
 file : matrix-render.js
 */

//##########################################
// CUBE BUFFER INIT OR FOR DYNAMIC
//##########################################

App.operation.cube_buffer_procedure = function(object) {


        /* Vertex                                        */
        // console.log("        Buffer the " + object.type + "'s vertex");
        object.vertexPositionBuffer = world.GL.gl.createBuffer();
        world.GL.gl.bindBuffer(world.GL.gl.ARRAY_BUFFER, object.vertexPositionBuffer);
        world.GL.gl.bufferData(world.GL.gl.ARRAY_BUFFER, object.geometry.vertices, world.GL.gl.STATIC_DRAW);
        object.vertexPositionBuffer.itemSize = 3;
        object.vertexPositionBuffer.numItems = 24;


        /* Color                                         */
        if (object.color && (null !== object.shaderProgram.vertexColorAttribute)) {
                console.log("        Buffer the " + object.type + "'s color");
                object.vertexColorBuffer = world.GL.gl.createBuffer();
                world.GL.gl.bindBuffer(world.GL.gl.ARRAY_BUFFER, object.vertexColorBuffer);

                /*
                 var unpackedColors = [];
                 for (var i in object.geometry.color) {
                 var color = object.geometry.color[i];
                 var looperLocal = 0;
                 while (4 > looperLocal) {
                 unpackedColors = unpackedColors.concat(color);
                 looperLocal = looperLocal + 1;
                 }
                 }
                 */


                //world.GL.gl.bufferData(world.GL.gl.ARRAY_BUFFER, new Float32Array(unpackedColors), world.GL.gl.STATIC_DRAW);
                world.GL.gl.bufferData(world.GL.gl.ARRAY_BUFFER, object.geometry.color, world.GL.gl.STATIC_DRAW);
                object.vertexColorBuffer.itemSize = 4;
                object.vertexColorBuffer.numItems = 24;
        }



        /* Texture                                       */
        if (object.texture) {

                console.log("        Buffer the " + object.type + "'s texture");
                object.vertexTexCoordBuffer = world.GL.gl.createBuffer();
                world.GL.gl.bindBuffer(world.GL.gl.ARRAY_BUFFER, object.vertexTexCoordBuffer);
                world.GL.gl.bufferData(world.GL.gl.ARRAY_BUFFER, object.geometry.texCoords, world.GL.gl.STATIC_DRAW);
                object.vertexTexCoordBuffer.itemSize = 2;
                object.vertexTexCoordBuffer.numItems = 24;

        }

        /* Normals                                   */
        if (object.shaderProgram.useLightingUniform) {
                console.log("        Buffer the " + object.type + "'s normals");
                object.vertexNormalBuffer = world.GL.gl.createBuffer();
                world.GL.gl.bindBuffer(world.GL.gl.ARRAY_BUFFER, object.vertexNormalBuffer);

                world.GL.gl.bufferData(world.GL.gl.ARRAY_BUFFER, object.LightMap, world.GL.gl.STATIC_DRAW);
                object.vertexNormalBuffer.itemSize = 3;
                object.vertexNormalBuffer.numItems = 24;
        }

        /* Indices                                       */
        console.log("        Buffer the " + object.type + "'s indices");
        object.vertexIndexBuffer = world.GL.gl.createBuffer();
        world.GL.gl.bindBuffer(world.GL.gl.ELEMENT_ARRAY_BUFFER, object.vertexIndexBuffer);

        world.GL.gl.bufferData(world.GL.gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(object.geometry.indices), world.GL.gl.STATIC_DRAW);
        object.vertexIndexBuffer.itemSize = 1;
        object.vertexIndexBuffer.numItems = 36;

};



//##########################################
// PIRAMIDE BUFFER INIT OR FOR DYNAMIC
//##########################################


App.operation.piramide_buffer_procedure = function(object) {
        // Vertex
        // console.log("        Buffer the " + object.type + "'s vertex");
        object.vertexPositionBuffer = world.GL.gl.createBuffer();
        world.GL.gl.bindBuffer(world.GL.gl.ARRAY_BUFFER, object.vertexPositionBuffer);

        world.GL.gl.bufferData(world.GL.gl.ARRAY_BUFFER, object.geometry.vertices, world.GL.gl.STATIC_DRAW);

        object.vertexPositionBuffer.itemSize = 3;
        object.vertexPositionBuffer.numItems = 18;

        /* Color                                         */
        //console.log("        Buffer the " + object.type + "'s color");
        object.vertexColorBuffer = world.GL.gl.createBuffer();
        world.GL.gl.bindBuffer(world.GL.gl.ARRAY_BUFFER, object.vertexColorBuffer);

        world.GL.gl.bufferData(world.GL.gl.ARRAY_BUFFER, object.geometry.color, world.GL.gl.STATIC_DRAW);

        object.vertexColorBuffer.itemSize = 4;
        object.vertexColorBuffer.numItems = 18;


};



//##########################################
// SQUARE BUFFER INIT OR FOR DYNAMIC
//##########################################


App.operation.square_buffer_procedure = function(object) {
        /* Vertex                                        */
        console.log("        Buffer the " + object.type + "'s vertex");
        object.vertexPositionBuffer = world.GL.gl.createBuffer();
        world.GL.gl.bindBuffer(world.GL.gl.ARRAY_BUFFER, object.vertexPositionBuffer);


        world.GL.gl.bufferData(world.GL.gl.ARRAY_BUFFER, object.geometry.vertices, world.GL.gl.STATIC_DRAW);

        object.vertexPositionBuffer.itemSize = 3;
        object.vertexPositionBuffer.numItems = 4;

        /* Color                                         */
        console.log("        Buffer the " + object.type + "'s color");
        object.vertexColorBuffer = world.GL.gl.createBuffer();
        world.GL.gl.bindBuffer(world.GL.gl.ARRAY_BUFFER, object.vertexColorBuffer);
        world.GL.gl.bufferData(world.GL.gl.ARRAY_BUFFER, new Float32Array(object.color), world.GL.gl.STATIC_DRAW);

        object.vertexColorBuffer.itemSize = 4;
        object.vertexColorBuffer.numItems = 4;
}



//##########################################
// TRIANGLE BUFFER INIT OR FOR DYNAMIC
//##########################################


App.operation.triangle_buffer_procedure = function(object) {


        /* Vertex                                        */

        object.vertexPositionBuffer = world.GL.gl.createBuffer();
        world.GL.gl.bindBuffer(world.GL.gl.ARRAY_BUFFER, object.vertexPositionBuffer);
        world.GL.gl.bufferData(world.GL.gl.ARRAY_BUFFER, object.geometry.vertices, world.GL.gl.STATIC_DRAW);

        object.vertexPositionBuffer.itemSize = 3;
        object.vertexPositionBuffer.numItems = 3;



        /* Color                                         */

        object.vertexColorBuffer = world.GL.gl.createBuffer();
        world.GL.gl.bindBuffer(world.GL.gl.ARRAY_BUFFER, object.vertexColorBuffer);
        world.GL.gl.bufferData(world.GL.gl.ARRAY_BUFFER, new Float32Array(object.color), world.GL.gl.STATIC_DRAW);

        object.vertexColorBuffer.itemSize = 4;
        object.vertexColorBuffer.numItems = 3;

        console.log("Buffer the " + object.type + "'s color loaded success.");



};






//##########################################
// OBJ FILE BUFFER INIT OR FOR DYNAMIC
//##########################################


App.operation.obj_buffer_procedure = function(object) {



        /* Vertex          not here for obj                */
        // /* Color
        if (object.color && (null !== object.shaderProgram.vertexColorAttribute)) {
                console.log("        Buffer the " + object.type + "'s color");
                object.vertexColorBuffer = world.GL.gl.createBuffer();
                world.GL.gl.bindBuffer(world.GL.gl.ARRAY_BUFFER, object.vertexColorBuffer);

                var unpackedColors = [];
                for (var i in object.color) {
                        var color = object.color[i];
                        var looperLocal = 0;
                        while (4 > looperLocal) {
                                unpackedColors = unpackedColors.concat(color);
                                looperLocal = looperLocal + 1;
                        }
                }

                world.GL.gl.bufferData(world.GL.gl.ARRAY_BUFFER, new Float32Array(unpackedColors), world.GL.gl.STATIC_DRAW);
                object.vertexColorBuffer.itemSize = 4;
                object.vertexColorBuffer.numItems = 4;
        }


        //  */

        /* Texture
         if (object.texture) {

         console.log("        Buffer the " + object.type + "'s texture");
         object.vertexTexCoordBuffer = world.GL.gl.createBuffer();
         world.GL.gl.bindBuffer(world.GL.gl.ARRAY_BUFFER, object.vertexTexCoordBuffer);
         world.GL.gl.bufferData(world.GL.gl.ARRAY_BUFFER, object.geometry.texCoords , world.GL.gl.STATIC_DRAW);
         object.vertexTexCoordBuffer.itemSize = 2;
         object.vertexTexCoordBuffer.numItems = 24;

         }
         */

        /* Normals                                   */
        if (object.shaderProgram.useLightingUniform) {
                console.log("        Buffer the " + object.type + "'s normals");
                //object.vertexNormalBuffer = world.GL.gl.createBuffer();
                //world.GL.gl.bindBuffer(world.GL.gl.ARRAY_BUFFER, );
                world.GL.gl.bufferData(world.GL.gl.ARRAY_BUFFER, object.mesh.normalBuffer, world.GL.gl.STATIC_DRAW);
                //   object.mesh.normalBuffer.itemSize = 3;
                //   object.mesh.normalBuffer.numItems = 24;
        }

        /* Indices
         console.log("        Buffer the " + object.type + "'s indices");
         object.vertexIndexBuffer = world.GL.gl.createBuffer();
         world.GL.gl.bindBuffer(world.GL.gl.ELEMENT_ARRAY_BUFFER, object.vertexIndexBuffer);

         world.GL.gl.bufferData(world.GL.gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(object.geometry.indices), world.GL.gl.STATIC_DRAW);
         object.vertexIndexBuffer.itemSize = 1;
         object.vertexIndexBuffer.numItems = 36;
         */


};



//##########################################
// SQUARE FILE BUFFER INIT OR FOR DYNAMIC
//##########################################


App.operation.squareTex_buffer_procedure = function(object) {


        //##########################################
        // SQUARE TEX BUFFER INIT OR FOR DYNAMIC
        //##########################################




        /* Vertex                                        */
        console.log("        Buffer the " + object.type + "'s vertex");
        object.vertexPositionBuffer = world.GL.gl.createBuffer();
        world.GL.gl.bindBuffer(world.GL.gl.ARRAY_BUFFER, object.vertexPositionBuffer);
        world.GL.gl.bufferData(world.GL.gl.ARRAY_BUFFER, object.geometry.vertices, world.GL.gl.STATIC_DRAW);
        object.vertexPositionBuffer.itemSize = 3;
        object.vertexPositionBuffer.numItems = 4;


        /* Color                                         */
        if (object.color && (null !== object.shaderProgram.vertexColorAttribute)) {
                console.log("        Buffer the " + object.type + "'s color");
                object.vertexColorBuffer = world.GL.gl.createBuffer();
                world.GL.gl.bindBuffer(world.GL.gl.ARRAY_BUFFER, object.vertexColorBuffer);

                var unpackedColors = [];
                for (var i in object.color) {
                        var color = object.color[i];
                        var looperLocal = 0;
                        while (4 > looperLocal) {
                                unpackedColors = unpackedColors.concat(color);
                                looperLocal = looperLocal + 1;
                        }
                }

                world.GL.gl.bufferData(world.GL.gl.ARRAY_BUFFER, new Float32Array(unpackedColors), world.GL.gl.STATIC_DRAW);
                object.vertexColorBuffer.itemSize = 3;
                object.vertexColorBuffer.numItems = 4;
        }



        /* Texture                                       */
        if (object.texture) {

                console.log("        Buffer the " + object.type + "'s texture");
                object.vertexTexCoordBuffer = world.GL.gl.createBuffer();
                world.GL.gl.bindBuffer(world.GL.gl.ARRAY_BUFFER, object.vertexTexCoordBuffer);
                world.GL.gl.bufferData(world.GL.gl.ARRAY_BUFFER, object.geometry.texCoords, world.GL.gl.STATIC_DRAW);
                object.vertexTexCoordBuffer.itemSize = 2;
                object.vertexTexCoordBuffer.numItems = 4;

        }

        /* Normals                                   */
        if (object.shaderProgram.useLightingUniform) {
                console.log("        Buffer the " + object.type + "'s normals");
                object.vertexNormalBuffer = world.GL.gl.createBuffer();
                world.GL.gl.bindBuffer(world.GL.gl.ARRAY_BUFFER, object.vertexNormalBuffer);

                world.GL.gl.bufferData(world.GL.gl.ARRAY_BUFFER, object.LightMap, world.GL.gl.STATIC_DRAW);
                object.vertexNormalBuffer.itemSize = 4;
                object.vertexNormalBuffer.numItems = 4;
        }

        /* Indices                                       */
        console.log("        Buffer the " + object.type + "'s indices");
        object.vertexIndexBuffer = world.GL.gl.createBuffer();
        world.GL.gl.bindBuffer(world.GL.gl.ELEMENT_ARRAY_BUFFER, object.vertexIndexBuffer);

        world.GL.gl.bufferData(world.GL.gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(object.geometry.indices), world.GL.gl.STATIC_DRAW);
        object.vertexIndexBuffer.itemSize = 1;
        object.vertexIndexBuffer.numItems = 6;








};




//##########################################
// sphere BUFFER INIT OR FOR DYNAMIC
//##########################################

App.operation.sphere_buffer_procedure = function(object) {


        /* Vertex                                        */
        // console.log("        Buffer the " + object.type + "'s vertex");
        object.vertexPositionBuffer = world.GL.gl.createBuffer();
        world.GL.gl.bindBuffer(world.GL.gl.ARRAY_BUFFER, object.vertexPositionBuffer);
        world.GL.gl.bufferData(world.GL.gl.ARRAY_BUFFER, object.geometry.vertices, world.GL.gl.STATIC_DRAW);
        object.vertexPositionBuffer.itemSize = 3;
        object.vertexPositionBuffer.numItems = object.geometry.vertexPositionData.length / 3;

        // Color
        if (object.color && (null !== object.shaderProgram.vertexColorAttribute)) {
                //    console.log("        Buffer the " + object.type + "'s color");
                object.vertexColorBuffer = world.GL.gl.createBuffer();
                world.GL.gl.bindBuffer(world.GL.gl.ARRAY_BUFFER, object.vertexColorBuffer);

                var unpackedColors = [];
                for (var i in object.color) {
                        var color = object.color[i];
                        var looperLocal = 0;
                        while (4 > looperLocal) {
                                unpackedColors = unpackedColors.concat(color);
                                looperLocal = looperLocal + 1;
                        }
                }


                //???????????
                world.GL.gl.bufferData(world.GL.gl.ARRAY_BUFFER, new Float32Array(unpackedColors), world.GL.gl.STATIC_DRAW);

                //world.GL.gl.bufferData(world.GL.gl.ARRAY_BUFFER, new Float32Array(object.geometry.normals), world.GL.gl.STATIC_DRAW);

                object.vertexColorBuffer.itemSize = 3;
                object.vertexColorBuffer.numItems = object.geometry.normalData.length / 3;
        }



        /* Texture                                       */
        if (object.texture) {

                //     console.log("        Buffer the " + object.type + "'s texture");
                object.vertexTexCoordBuffer = world.GL.gl.createBuffer();
                world.GL.gl.bindBuffer(world.GL.gl.ARRAY_BUFFER, object.vertexTexCoordBuffer);
                world.GL.gl.bufferData(world.GL.gl.ARRAY_BUFFER, object.geometry.texCoords, world.GL.gl.STATIC_DRAW);
                object.vertexTexCoordBuffer.itemSize = 2;
                object.vertexTexCoordBuffer.numItems = object.geometry.textureCoordData.length / 2;;

        }

        /* Normals                                   */
        if (object.shaderProgram.useLightingUniform) {
                //     console.log("        Buffer the " + object.type + "'s normals");
                object.vertexNormalBuffer = world.GL.gl.createBuffer();
                world.GL.gl.bindBuffer(world.GL.gl.ARRAY_BUFFER, object.vertexNormalBuffer);

                world.GL.gl.bufferData(world.GL.gl.ARRAY_BUFFER, object.geometry.normals, world.GL.gl.STATIC_DRAW);
                object.vertexNormalBuffer.itemSize = 3;
                object.vertexNormalBuffer.numItems = object.geometry.normalData.length / 3;


        }

        /* Indices                                       */
        //console.log("        Buffer the " + object.type + "'s indices");
        object.vertexIndexBuffer = world.GL.gl.createBuffer();
        world.GL.gl.bindBuffer(world.GL.gl.ELEMENT_ARRAY_BUFFER, object.vertexIndexBuffer);

        world.GL.gl.bufferData(world.GL.gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(object.geometry.indices), world.GL.gl.STATIC_DRAW);
        object.vertexIndexBuffer.itemSize = 1;
        object.vertexIndexBuffer.numItems = object.geometry.indexData.length;






};







'use strict';


// initTextures function !!!
App.tools.loadTextureImage = function(gl, src) {
        var texture = gl.createTexture();
        texture.image = new Image();
        texture.image.crossOrigin = "anonymous";
        texture.image.onload = function() {
                world.handleLoadedTexture(texture, gl)
        }
        texture.image.src = src;
        return texture;
};


App.tools.BasicTextures = function(texture, gl) {

        console.log("Exec : App.tools.BasicTextures ");
        gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, texture.image);
        gl.bindTexture(gl.TEXTURE_2D, null);

};












App.tools.loadVideoTexture = function(name, image) {

        var name_ = name;
        // -- Init 2D Texture
        var gl = world.GL.gl;

        if (typeof App.textures[name_] === 'undefined') {

                App.textures[name_] = gl.createTexture();

        }
        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, App.textures[name_]);
        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);

        //gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        //gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

        // world.GL.gl.texParameteri(eval("world.GL.gl." + object.glBlend.blendParamSrc ), eval("world.GL.gl." + object.glBlend.blendParamDest ) );
        // gl.texParameteri( gl.TEXTURE_2D , gl.TEXTURE_WRAP_T  , gl.CLAMP_TO_EDGE);

        // -- Allocate storage for the texture
        // gl.texStorage2D(gl.TEXTURE_2D, 1, gl.RGB8, 512, 512);
        gl.texStorage2D(gl.TEXTURE_2D, 1, gl.RGB8, 512, 512);
        gl.texSubImage2D(gl.TEXTURE_2D, 0, 0, 0, gl.RGB, gl.UNSIGNED_BYTE, image);
        gl.generateMipmap(gl.TEXTURE_2D);

}



/*

 App.tools.loadTextureBasic = function (imagePath , name ) {


 var name_ = name;
 loadImage(imagePath, function(image) {
 // -- Init 2D Texture

 App.textures[name_] =gl.createTexture();
 gl.activeTexture(gl.TEXTURE0);
 gl.bindTexture(gl.TEXTURE_2D, App.textures[name_]);
 //gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false);
 //gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
 //gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
 //gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
 //gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

 // -- Allocate storage for the texture
 gl.texStorage2D(gl.TEXTURE_2D, 1, gl.RGB8, 512, 512);
 gl.texSubImage2D(gl.TEXTURE_2D, 0, 0, 0, gl.RGB, gl.UNSIGNED_BYTE, image);
 gl.generateMipmap(gl.TEXTURE_2D);

 });


 }
 */









/*
 visual-js webgl2 project
 Nikola Lukic
 file : DRAWS
 */

App.operation.draws = new Object();


//##############################################
// CUBE
//##############################################
App.operation.draws.cube = function(object) {

        var lighting = 1;
        var localLooper = 0;
        if (true) {
                lighting = true
        }

        ////////////////////////////////////////////////////////
        mat4.identity(object.mvMatrix);
        this.mvPushMatrix(object.mvMatrix, this.mvMatrixStack);

        ////////////////////////////////////////////////////////
        if (App.camera.FirstPersonController == true) { camera.setCamera(object) }

        ////////////////////////////////////////////////////////
        mat4.translate(object.mvMatrix, object.mvMatrix, object.position.worldLocation);
        mat4.rotate(object.mvMatrix, object.mvMatrix, degToRad(object.rotValue), object.rotDirection.RotationVector);



        ////////////////////////////////////////////////////////
        //VERTEX BUFFER
        ////////////////////////////////////////////////////////
        if (object.vertexPositionBuffer) {
                world.GL.gl.bindBuffer(world.GL.gl.ARRAY_BUFFER, object.vertexPositionBuffer);

                if (object.geometry.dynamicBuffer == true) {

                        world.GL.gl.bufferData(world.GL.gl.ARRAY_BUFFER, object.geometry.vertices, world.GL.gl.STATIC_DRAW);

                }

                world.GL.gl.vertexAttribPointer(object.shaderProgram.vertexPositionAttribute, object.vertexPositionBuffer.itemSize, world.GL.gl.FLOAT, false, 0, 0);
                world.GL.gl.enableVertexAttribArray(object.shaderProgram.vertexPositionAttribute);
                localLooper = localLooper + 1;
        }
        ////////////////////////////////////////////////////////
        //COLOR BUFFER
        ////////////////////////////////////////////////////////
        if (object.vertexColorBuffer) {
                world.GL.gl.bindBuffer(world.GL.gl.ARRAY_BUFFER, object.vertexColorBuffer);
                world.GL.gl.vertexAttribPointer(object.shaderProgram.vertexColorAttribute, object.vertexColorBuffer.itemSize, world.GL.gl.FLOAT, false, 0, 0);
                world.GL.gl.enableVertexAttribArray(object.shaderProgram.vertexColorAttribute);
                localLooper = localLooper + 1;
        }
        ////////////////////////////////////////////////////////
        //LIGHT STAFF
        ////////////////////////////////////////////////////////
        if (lighting && object.shaderProgram.useLightingUniform) {

                world.GL.gl.uniform1i(object.shaderProgram.useLightingUniform, lighting);

                /* Set the normals                       */
                if (object.vertexNormalBuffer) {
                        world.GL.gl.bindBuffer(world.GL.gl.ARRAY_BUFFER, object.vertexNormalBuffer);
                        world.GL.gl.vertexAttribPointer(object.shaderProgram.vertexNormalAttribute, object.vertexNormalBuffer.itemSize, world.GL.gl.FLOAT, false, 0, 0);
                        world.GL.gl.enableVertexAttribArray(object.shaderProgram.vertexNormalAttribute);
                        localLooper = localLooper + 1;
                }

                /* Set the ambient light                 */
                if (object.shaderProgram.ambientColorUniform) {
                        if (document.getElementById('ambLight') && document.getElementById('ambLight').color) {
                                world.GL.gl.uniform3f(object.shaderProgram.ambientColorUniform,
                                        parseFloat(document.getElementById('ambLight').color.rgb[0]),
                                        parseFloat(document.getElementById('ambLight').color.rgb[1]),
                                        parseFloat(document.getElementById('ambLight').color.rgb[2])
                                );
                        }
                        else { //object.LightsData.ambientLight
                                world.GL.gl.uniform3f(object.shaderProgram.ambientColorUniform, object.LightsData.ambientLight.r, object.LightsData.ambientLight.g, object.LightsData.ambientLight.b);
                        }
                }

                /* Set the directional light             */
                if (object.shaderProgram.directionalColorUniform) {
                        if (document.getElementById('dirLight') && document.getElementById('dirLight').color) {
                                world.GL.gl.uniform3f(object.shaderProgram.directionalColorUniform,
                                        parseFloat(document.getElementById('dirLight').color.rgb[0]),
                                        parseFloat(document.getElementById('dirLight').color.rgb[1]),
                                        parseFloat(document.getElementById('dirLight').color.rgb[2])
                                );
                        }
                        else {

                                //object.LightsData.lightingDirection

                                world.GL.gl.uniform3f(object.shaderProgram.directionalColorUniform, object.LightsData.directionLight.R(), object.LightsData.directionLight.G(), object.LightsData.directionLight.B());

                        }
                }

                /* Normalize the direction               */
                if (object.shaderProgram.lightingDirectionUniform) {
                        if (document.getElementById("dirX") && document.getElementById("dirY") && document.getElementById("dirZ")) {
                                var lightingDirection = [
                                        parseFloat(document.getElementById("dirX").value),
                                        parseFloat(document.getElementById("dirY").value),
                                        parseFloat(document.getElementById("dirZ").value)
                                ];
                        }
                        else {
                                var lightingDirection = [object.LightsData.lightingDirection.r, object.LightsData.lightingDirection.g, object.LightsData.lightingDirection.b];
                        }

                        var adjustedLD = vec3.create();
                        vec3.normalize(adjustedLD, lightingDirection);
                        vec3.scale(adjustedLD, adjustedLD, -1);
                        world.GL.gl.uniform3fv(object.shaderProgram.lightingDirectionUniform, adjustedLD);
                }
        }
        else {
                if (object.shaderProgram.useLightingUniform) {
                        if (object.shaderProgram.ambientColorUniform) {
                                world.GL.gl.uniform3f(object.shaderProgram.ambientColorUniform, parseFloat(0.2), parseFloat(0.2), parseFloat(0.2));
                        }
                        if (object.shaderProgram.directionalColorUniform) {
                                world.GL.gl.uniform3f(object.shaderProgram.directionalColorUniform, parseFloat(1), parseFloat(0), parseFloat(0));
                        }
                }
        }


        ////////////////////////////////////////////////////////
        //TEXTURES
        ////////////////////////////////////////////////////////
        if (object.vertexTexCoordBuffer) {

                world.GL.gl.bindBuffer(world.GL.gl.ARRAY_BUFFER, object.vertexTexCoordBuffer);

                //
                if (object.geometry.dynamicBuffer == true) {

                        world.GL.gl.bufferData(world.GL.gl.ARRAY_BUFFER, object.geometry.texCoords, world.GL.gl.STATIC_DRAW);

                }
                //

                world.GL.gl.vertexAttribPointer(object.shaderProgram.textureCoordAttribute, object.vertexTexCoordBuffer.itemSize, world.GL.gl.FLOAT, false, 0, 0);
                world.GL.gl.enableVertexAttribArray(object.shaderProgram.textureCoordAttribute);



                if (object.streamTextures != null) {

                        // video webcam textures
                        App.tools.loadVideoTexture("glVideoTexture", object.streamTextures.videoImage)
                        world.GL.gl.uniform1i(object.shaderProgram.samplerUniform, 0);

                }
                else {

                        for (var t = 0; t < object.textures.length; t++) {

                                eval("  world.GL.gl.activeTexture(world.GL.gl.TEXTURE" + t + ");  ")
                                world.GL.gl.bindTexture(world.GL.gl.TEXTURE_2D, object.textures[t]);
                                world.GL.gl.pixelStorei(world.GL.gl.UNPACK_FLIP_Y_WEBGL, false);
                                world.GL.gl.texParameteri(world.GL.gl.TEXTURE_2D, world.GL.gl.TEXTURE_MAG_FILTER, world.GL.gl.NEAREST);
                                world.GL.gl.texParameteri(world.GL.gl.TEXTURE_2D, world.GL.gl.TEXTURE_MIN_FILTER, world.GL.gl.NEAREST);
                                world.GL.gl.texParameteri(world.GL.gl.TEXTURE_2D, world.GL.gl.TEXTURE_WRAP_S, world.GL.gl.CLAMP_TO_EDGE);
                                world.GL.gl.texParameteri(world.GL.gl.TEXTURE_2D, world.GL.gl.TEXTURE_WRAP_T, world.GL.gl.CLAMP_TO_EDGE);
                                // -- Allocate storage for the texture
                                //world.GL.gl.texStorage2D(world.GL.gl.TEXTURE_2D, 1, world.GL.gl.RGB8, 512, 512);
                                //world.GL.gl.texSubImage2D(world.GL.gl.TEXTURE_2D, 0, 0, 0, world.GL.gl.RGB, world.GL.gl.UNSIGNED_BYTE, image);
                                //world.GL.gl.generateMipmap(world.GL.gl.TEXTURE_2D);
                                world.GL.gl.uniform1i(object.shaderProgram.samplerUniform, t);

                        }

                }

                localLooper = localLooper + 1;

        }

        world.GL.gl.bindBuffer(world.GL.gl.ELEMENT_ARRAY_BUFFER, object.vertexIndexBuffer);
        world.setMatrixUniforms(object, this.pMatrix, object.mvMatrix);

        if (object.vertexNormalBuffer && object.shaderProgram.nMatrixUniform) {
                var normalMatrix = mat3.create();
                mat3.normalFromMat4(normalMatrix, object.mvMatrix);
                mat3.transpose(normalMatrix, normalMatrix);
                world.GL.gl.uniformMatrix3fv(object.shaderProgram.nMatrixUniform, false, normalMatrix);
        }

        world.disableUnusedAttr(world.GL.gl, localLooper);



        if (object.glBlend.blendEnabled == true) {
                if (!world.GL.gl.isEnabled(world.GL.gl.BLEND)) {

                        world.GL.gl.disable(world.GL.gl.DEPTH_TEST)
                        world.GL.gl.enable(world.GL.gl.BLEND)

                }
                world.GL.gl.blendFunc(eval("world.GL.gl." + object.glBlend.blendParamSrc), eval("world.GL.gl." + object.glBlend.blendParamDest));
        }
        else {
                world.GL.gl.disable(world.GL.gl.BLEND)
                world.GL.gl.enable(world.GL.gl.DEPTH_TEST)
        }

        // smoothstep(T edge0, T edge1, T x);


        //   world.GL.gl.drawElements( world.GL.gl.TRIANGLES, object.vertexIndexBuffer.numItems,  world.GL.gl.UNSIGNED_SHORT, 0);
        world.GL.gl.drawElements(eval("world.GL.gl." + object.glDrawElements.mode), object.glDrawElements.numberOfIndicesRender, world.GL.gl.UNSIGNED_SHORT, 0);




        object.instancedDraws.overrideDrawArraysInstance(object);


        this.mvPopMatrix(object.mvMatrix, this.mvMatrixStack);

};

//##############################################
// PIRAMIDE
//##############################################
App.operation.draws.piramide = function(object) {

        mat4.identity(object.mvMatrix);
        world.mvPushMatrix(object.mvMatrix, this.mvMatrixStack);


        ////////////////////////////////////////////////////////
        if (App.camera.FirstPersonController == true) { camera.setCamera(object) }

        mat4.translate(object.mvMatrix, object.mvMatrix, object.position.worldLocation);
        mat4.rotate(object.mvMatrix, object.mvMatrix, degToRad(object.rotValue), object.rotDirection.RotationVector);



        if (object.geometry.dynamicBuffer == true) {

                world.GL.gl.bindBuffer(world.GL.gl.ARRAY_BUFFER, object.vertexPositionBuffer);
                world.GL.gl.bufferData(world.GL.gl.ARRAY_BUFFER, object.geometry.vertices, world.GL.gl.STATIC_DRAW);

        }
        else {

                world.GL.gl.bindBuffer(world.GL.gl.ARRAY_BUFFER, object.vertexPositionBuffer); //ori without if dynamicBuffer

        }

        world.GL.gl.vertexAttribPointer(object.shaderProgram.vertexPositionAttribute, object.vertexPositionBuffer.itemSize, world.GL.gl.FLOAT, false, 0, 0);

        if (object.vertexColorBuffer) {


                world.GL.gl.bindBuffer(world.GL.gl.ARRAY_BUFFER, object.vertexColorBuffer);
                world.GL.gl.vertexAttribPointer(object.shaderProgram.vertexColorAttribute, object.vertexColorBuffer.itemSize, world.GL.gl.FLOAT, false, 0, 0);


        }



        if (object.glBlend.blendEnabled == true) {
                if (!world.GL.gl.isEnabled(world.GL.gl.BLEND)) {

                        world.GL.gl.disable(world.GL.gl.DEPTH_TEST)
                        world.GL.gl.enable(world.GL.gl.BLEND)

                }
                //world.GL.gl.blendColor ( 1,1,1,0.5)
                // world.GL.gl.blendColor( 1.0 , 1.0, 1.0, 0.3 );
                world.GL.gl.blendFunc(eval("world.GL.gl." + object.glBlend.blendParamSrc), eval("world.GL.gl." + object.glBlend.blendParamDest));

        }
        else {
                world.GL.gl.disable(world.GL.gl.BLEND)
                world.GL.gl.enable(world.GL.gl.DEPTH_TEST)
        }


        world.setMatrixUniforms(object, this.pMatrix, object.mvMatrix);
        //world.GL.gl.drawArrays(world.GL.gl.TRIANGLES, 0, object.vertexPositionBuffer.numItems);
        world.GL.gl.drawArrays(eval("world.GL.gl." + object.glDrawElements.mode), 0, object.vertexPositionBuffer.numItems);


        object.instancedDraws.overrideDrawArraysInstance(object);


        /*
         world.GL.gl.drawArrays(world.GL.gl.TRIANGLES, 0, object.vertexPositionBuffer.numItems);
         mat4.translate(object.mvMatrix, object.mvMatrix, [2,1,1] );
         world.setMatrixUniforms(object,this.pMatrix,object.mvMatrix)
         world.GL.gl.drawArrays(world.GL.gl.TRIANGLES, 0, object.vertexPositionBuffer.numItems);
         */

        this.mvPopMatrix(object.mvMatrix, this.mvMatrixStack);
};

//##############################################
// SQUARE
//##############################################
App.operation.draws.square = function(object) {

        mat4.identity(object.mvMatrix);
        world.mvPushMatrix(object.mvMatrix, world.mvMatrixStack);

        ////////////////////////////////////////////////////////
        if (App.camera.FirstPersonController == true) { camera.setCamera(object) }
        ////////////////////////////////////////////////////////
        mat4.translate(object.mvMatrix, object.mvMatrix, object.position.worldLocation);
        mat4.rotate(object.mvMatrix, object.mvMatrix, degToRad(object.rotValue), object.rotDirection.RotationVector);


        if (object.geometry.dynamicBuffer == true) {

                world.GL.gl.bindBuffer(world.GL.gl.ARRAY_BUFFER, object.vertexPositionBuffer);
                world.GL.gl.bufferData(world.GL.gl.ARRAY_BUFFER, object.geometry.vertices, world.GL.gl.STATIC_DRAW);

        }
        else {

                world.GL.gl.bindBuffer(world.GL.gl.ARRAY_BUFFER, object.vertexPositionBuffer); //ori without if dynamicBuffer

        }

        world.GL.gl.vertexAttribPointer(object.shaderProgram.vertexPositionAttribute, object.vertexPositionBuffer.itemSize, world.GL.gl.FLOAT, false, 0, 0);

        world.GL.gl.bindBuffer(world.GL.gl.ARRAY_BUFFER, object.vertexColorBuffer);
        world.GL.gl.vertexAttribPointer(object.shaderProgram.vertexColorAttribute, object.vertexColorBuffer.itemSize, world.GL.gl.FLOAT, false, 0, 0);


        if (object.glBlend.blendEnabled == true) {
                if (!world.GL.gl.isEnabled(world.GL.gl.BLEND)) {

                        world.GL.gl.disable(world.GL.gl.DEPTH_TEST)
                        world.GL.gl.enable(world.GL.gl.BLEND)

                }
                //world.GL.gl.blendColor ( 1,1,1,0.5)
                // world.GL.gl.blendColor( 1.0 , 1.0, 1.0, 0.3 );
                world.GL.gl.blendFunc(eval("world.GL.gl." + object.glBlend.blendParamSrc), eval("world.GL.gl." + object.glBlend.blendParamDest));

        }
        else {
                world.GL.gl.disable(world.GL.gl.BLEND)
                world.GL.gl.enable(world.GL.gl.DEPTH_TEST)
        }



        world.setMatrixUniforms(object, this.pMatrix, object.mvMatrix);
        //world.GL.gl.drawArrays(world.GL.gl.TRIANGLES, 0, object.vertexPositionBuffer.numItems);
        world.GL.gl.drawArrays(eval("world.GL.gl." + object.glDrawElements.mode), 0, object.vertexPositionBuffer.numItems);

        this.mvPopMatrix(object.mvMatrix, this.mvMatrixStack);
}

//##############################################
// TRIANGLE
//##############################################
App.operation.draws.triangle = function(object) {

        mat4.identity(object.mvMatrix);
        world.mvPushMatrix(object.mvMatrix, this.mvMatrixStack);

        ////////////////////////////////////////////////////////
        if (App.camera.FirstPersonController == true) { camera.setCamera(object) }

        mat4.translate(object.mvMatrix, object.mvMatrix, object.position.worldLocation);
        mat4.rotate(object.mvMatrix, object.mvMatrix, degToRad(object.rotValue), object.rotDirection.RotationVector);




        world.GL.gl.bindBuffer(world.GL.gl.ARRAY_BUFFER, object.vertexPositionBuffer);
        world.GL.gl.vertexAttribPointer(object.shaderProgram.vertexPositionAttribute, object.vertexPositionBuffer.itemSize, world.GL.gl.FLOAT, false, 0, 0);

        if (object.geometry.dynamicBuffer == true) {
                world.GL.gl.bufferData(world.GL.gl.ARRAY_BUFFER, object.geometry.vertices, world.GL.gl.STATIC_DRAW);
        }


        world.GL.gl.bindBuffer(world.GL.gl.ARRAY_BUFFER, object.vertexColorBuffer);
        world.GL.gl.vertexAttribPointer(object.shaderProgram.vertexColorAttribute, object.vertexColorBuffer.itemSize, world.GL.gl.FLOAT, false, 0, 0);

        if (object.glBlend.blendEnabled == true) {
                if (!world.GL.gl.isEnabled(world.GL.gl.BLEND)) {

                        world.GL.gl.disable(world.GL.gl.DEPTH_TEST)
                        world.GL.gl.enable(world.GL.gl.BLEND)

                }
                //world.GL.gl.blendColor ( 1,1,1,0.5)
                // world.GL.gl.blendColor( 1.0 , 1.0, 1.0, 0.3 );
                world.GL.gl.blendFunc(eval("world.GL.gl." + object.glBlend.blendParamSrc), eval("world.GL.gl." + object.glBlend.blendParamDest));

        }
        else {
                world.GL.gl.disable(world.GL.gl.BLEND)
                world.GL.gl.enable(world.GL.gl.DEPTH_TEST)
        }



        this.setMatrixUniforms(object, this.pMatrix, object.mvMatrix);


        // world.GL.gl.drawArrays(world.GL.gl.TRIANGLES, 0, object.vertexPositionBuffer.numItems);
        world.GL.gl.drawArrays(eval("world.GL.gl." + object.glDrawElements.mode), 0, object.vertexPositionBuffer.numItems);

        this.mvPopMatrix(object.mvMatrix, this.mvMatrixStack);
};


//##############################################
// OBJ MESH
//##############################################
App.operation.draws.drawObj = function(object) {

        var lighting = 1;
        var localLooper = 0;
        if (true) {
                lighting = true
        }

        var localLooper = 0;

        mat4.identity(object.mvMatrix);
        world.mvPushMatrix(object.mvMatrix, this.mvMatrixStack);

        ////////////////////////////////////////////////////////
        if (App.camera.FirstPersonController == true) { camera.setCamera(object) }
        ////////////////////////////////////////////////////////
        mat4.translate(object.mvMatrix, object.mvMatrix, object.position.worldLocation);
        mat4.rotate(object.mvMatrix, object.mvMatrix, degToRad(object.rotValue), object.rotDirection.RotationVector);



        if (typeof object.mesh.vertexBuffer != "undefined") {


                if (object.animation != null) {


                        object.animation.currentDraws++;

                        if (object.animation.currentDraws > object.animation.speed) {



                                object.animation.currentAni++;
                                object.animation.currentDraws = 0;


                                if (object.animation.currentAni > object.animation.sumOfAniFrames) {

                                        object.animation.currentAni = 0;

                                }


                        }

                        if (object.animation.currentAni == 0) {


                                world.GL.gl.bindBuffer(world.GL.gl.ARRAY_BUFFER, object.mesh.vertexBuffer);
                                world.GL.gl.vertexAttribPointer(object.shaderProgram.vertexPositionAttribute, object.mesh.vertexBuffer.itemSize, world.GL.gl.FLOAT, false, 0, 0);


                        }
                        else {

                                world.GL.gl.bindBuffer(world.GL.gl.ARRAY_BUFFER, App.meshes[object.animation.id + object.animation.currentAni].vertexBuffer);
                                world.GL.gl.vertexAttribPointer(object.shaderProgram.vertexPositionAttribute, object.mesh.vertexBuffer.itemSize, world.GL.gl.FLOAT, false, 0, 0);


                        }



                }
                else {

                        // now to render the mesh
                        world.GL.gl.bindBuffer(world.GL.gl.ARRAY_BUFFER, object.mesh.vertexBuffer);
                        world.GL.gl.vertexAttribPointer(object.shaderProgram.vertexPositionAttribute, object.mesh.vertexBuffer.itemSize, world.GL.gl.FLOAT, false, 0, 0);

                }


        }

        ////////////////////////////////////////////////////////
        //COLOR BUFFER
        ////////////////////////////////////////////////////////
        /* if (object.vertexColorBuffer) {
         world.GL.gl.bindBuffer( world.GL.gl.ARRAY_BUFFER, object.vertexColorBuffer);
         world.GL.gl.vertexAttribPointer(object.shaderProgram.vertexColorAttribute, object.vertexColorBuffer.itemSize,  world.GL.gl.FLOAT, false, 0, 0);
         world.GL.gl.enableVertexAttribArray(object.shaderProgram.vertexColorAttribute);
         localLooper = localLooper + 1;
         }
         */
        ////////////////////////////////////////////////////////
        //LIGHT STAFF
        ////////////////////////////////////////////////////////
        if (lighting && object.shaderProgram.useLightingUniform) {

                world.GL.gl.uniform1i(object.shaderProgram.useLightingUniform, lighting);

                /* Set the normals                       */
                if (object.mesh.normalBuffer) {
                        world.GL.gl.bindBuffer(world.GL.gl.ARRAY_BUFFER, object.mesh.normalBuffer);
                        world.GL.gl.vertexAttribPointer(object.shaderProgram.vertexNormalAttribute, object.mesh.normalBuffer.itemSize, world.GL.gl.FLOAT, false, 0, 0);
                        world.GL.gl.enableVertexAttribArray(object.shaderProgram.vertexNormalAttribute);
                        localLooper = localLooper + 1;
                }

                /* Set the ambient light                 */
                if (object.shaderProgram.ambientColorUniform) {
                        if (document.getElementById('ambLight') && document.getElementById('ambLight').color) {
                                world.GL.gl.uniform3f(object.shaderProgram.ambientColorUniform,
                                        parseFloat(document.getElementById('ambLight').color.rgb[0]),
                                        parseFloat(document.getElementById('ambLight').color.rgb[1]),
                                        parseFloat(document.getElementById('ambLight').color.rgb[2])
                                );
                        }
                        else {
                                world.GL.gl.uniform3f(object.shaderProgram.ambientColorUniform, object.LightsData.ambientLight.R(), object.LightsData.ambientLight.G(), object.LightsData.ambientLight.B());
                        }
                }

                /* Set the directional light             */
                if (object.shaderProgram.directionalColorUniform) {
                        if (document.getElementById('dirLight') && document.getElementById('dirLight').color) {
                                world.GL.gl.uniform3f(object.shaderProgram.directionalColorUniform,
                                        parseFloat(document.getElementById('dirLight').color.rgb[0]),
                                        parseFloat(document.getElementById('dirLight').color.rgb[1]),
                                        parseFloat(document.getElementById('dirLight').color.rgb[2])
                                );
                        }
                        else {
                                world.GL.gl.uniform3f(object.shaderProgram.directionalColorUniform, object.LightsData.directionLight.R(), object.LightsData.directionLight.G(), object.LightsData.directionLight.B());
                        }
                }

                /* Normalize the direction               */
                if (object.shaderProgram.lightingDirectionUniform) {
                        if (document.getElementById("dirX") && document.getElementById("dirY") && document.getElementById("dirZ")) {
                                var lightingDirection = [
                                        parseFloat(document.getElementById("dirX").value),
                                        parseFloat(document.getElementById("dirY").value),
                                        parseFloat(document.getElementById("dirZ").value)
                                ];
                        }
                        else {
                                var lightingDirection = [object.LightsData.lightingDirection.r, object.LightsData.lightingDirection.g, object.LightsData.lightingDirection.b];
                        }

                        var adjustedLD = vec3.create();
                        vec3.normalize(adjustedLD, lightingDirection);
                        vec3.scale(adjustedLD, adjustedLD, -1);
                        world.GL.gl.uniform3fv(object.shaderProgram.lightingDirectionUniform, adjustedLD);
                }
        }
        else {
                if (object.shaderProgram.useLightingUniform) {
                        if (object.shaderProgram.ambientColorUniform) {
                                world.GL.gl.uniform3f(object.shaderProgram.ambientColorUniform, parseFloat(1), parseFloat(2), parseFloat(0));
                        }
                        if (object.shaderProgram.directionalColorUniform) {
                                world.GL.gl.uniform3f(object.shaderProgram.directionalColorUniform, parseFloat(1), parseFloat(1), parseFloat(0));
                        }
                }
        }


        // it's possible that the mesh doesn't contain
        // any texture coordinates
        // in this case, the texture vertexAttribArray will need to be disabled
        // before the call to drawElements
        if (!object.mesh.textures.length && !object.texture) {
                //  world.GL.gl.disableVertexAttribArray(object.shaderProgram.textureCoordAttribute);
        }
        else {
                // if the texture vertexAttribArray has been previously
                // disabled, then it needs to be re-enabled
                if (object.texture) {


                        world.GL.gl.bindBuffer(world.GL.gl.ARRAY_BUFFER, object.mesh.textureBuffer);
                        world.GL.gl.enableVertexAttribArray(object.shaderProgram.textureCoordAttribute);
                        world.GL.gl.vertexAttribPointer(object.shaderProgram.textureCoordAttribute, object.mesh.textureBuffer.itemSize, world.GL.gl.FLOAT, false, 0, 0);

                        //ori world.GL.gl.activeTexture(world.GL.gl.TEXTURE0);
                        // ori world.GL.gl.bindTexture(world.GL.gl.TEXTURE_2D, object.texture);


                        if (object.streamTextures != null) {

                                // video webcam textures
                                App.tools.loadVideoTexture("glVideoTexture", object.streamTextures.videoImage)
                                world.GL.gl.uniform1i(object.shaderProgram.samplerUniform, 0);

                        }
                        else {

                                for (var t = 0; t < object.textures.length; t++) {

                                        eval("  world.GL.gl.activeTexture(world.GL.gl.TEXTURE" + t + ");  ")
                                        world.GL.gl.bindTexture(world.GL.gl.TEXTURE_2D, object.textures[t]);
                                        world.GL.gl.pixelStorei(world.GL.gl.UNPACK_FLIP_Y_WEBGL, false);
                                        world.GL.gl.texParameteri(world.GL.gl.TEXTURE_2D, world.GL.gl.TEXTURE_MAG_FILTER, world.GL.gl.NEAREST);
                                        world.GL.gl.texParameteri(world.GL.gl.TEXTURE_2D, world.GL.gl.TEXTURE_MIN_FILTER, world.GL.gl.NEAREST);
                                        world.GL.gl.texParameteri(world.GL.gl.TEXTURE_2D, world.GL.gl.TEXTURE_WRAP_S, world.GL.gl.CLAMP_TO_EDGE);
                                        world.GL.gl.texParameteri(world.GL.gl.TEXTURE_2D, world.GL.gl.TEXTURE_WRAP_T, world.GL.gl.CLAMP_TO_EDGE);
                                        // -- Allocate storage for the texture
                                        //world.GL.gl.texStorage2D(world.GL.gl.TEXTURE_2D, 1, world.GL.gl.RGB8, 512, 512);
                                        //world.GL.gl.texSubImage2D(world.GL.gl.TEXTURE_2D, 0, 0, 0, world.GL.gl.RGB, world.GL.gl.UNSIGNED_BYTE, image);
                                        //world.GL.gl.generateMipmap(world.GL.gl.TEXTURE_2D);
                                        world.GL.gl.uniform1i(object.shaderProgram.samplerUniform, t);

                                }

                        }
                        // world.GL.gl.uniform1i(object.shaderProgram.samplerUniform, 0);
                        localLooper = localLooper + 1;



                } else {

                        // world.GL.gl.disableVertexAttribArray(object.shaderProgram.textureCoordAttribute);


                }


        }

        //normals
        //  world.GL.gl.bindBuffer(world.GL.gl.ARRAY_BUFFER, object.mesh.normalBuffer);
        //  world.GL.gl.vertexAttribPointer(object.shaderProgram.vertexNormalAttribute, object.mesh.normalBuffer.itemSize, world.GL.gl.FLOAT, false, 0, 0);

        world.GL.gl.bindBuffer(world.GL.gl.ELEMENT_ARRAY_BUFFER, object.mesh.indexBuffer);

        if (object.glBlend.blendEnabled == true) {
                if (!world.GL.gl.isEnabled(world.GL.gl.BLEND)) {

                        world.GL.gl.disable(world.GL.gl.DEPTH_TEST)
                        world.GL.gl.enable(world.GL.gl.BLEND)

                }
                world.GL.gl.blendFunc(eval("world.GL.gl." + object.glBlend.blendParamSrc), eval("world.GL.gl." + object.glBlend.blendParamDest));
        }
        else {
                world.GL.gl.disable(world.GL.gl.BLEND)
                world.GL.gl.enable(world.GL.gl.DEPTH_TEST)
        }



        this.setMatrixUniforms(object, this.pMatrix, object.mvMatrix);

        world.disableUnusedAttr(world.GL.gl, 3);

        //'POINTS' , 'LINE_STRIP', 'LINE_LOOP', 'LINES', 'TRIANGLE_STRIP', 'TRIANGLE_FAN' , 'TRIANGLES'
        world.GL.gl.drawElements(eval("world.GL.gl." + object.glDrawElements.mode), object.glDrawElements.numberOfIndicesRender, world.GL.gl.UNSIGNED_SHORT, 0);

        this.mvPopMatrix(object.mvMatrix, this.mvMatrixStack);

};

//##############################################
// SQUARE
//##############################################
App.operation.draws.drawSquareTex = function(object) {

        var lighting = 1;
        var localLooper = 0;
        if (true) {
                lighting = true
        }

        ////////////////////////////////////////////////////////
        mat4.identity(object.mvMatrix);
        this.mvPushMatrix(object.mvMatrix, this.mvMatrixStack);


        ////////////////////////////////////////////////////////
        if (App.camera.FirstPersonController == true) { camera.setCamera(object) }
        ////////////////////////////////////////////////////////
        mat4.translate(object.mvMatrix, object.mvMatrix, object.position.worldLocation);
        mat4.rotate(object.mvMatrix, object.mvMatrix, degToRad(object.rotValue), object.rotDirection.RotationVector);


        ////////////////////////////////////////////////////////
        //VERTEX BUFFER
        ////////////////////////////////////////////////////////
        if (object.vertexPositionBuffer) {
                world.GL.gl.bindBuffer(world.GL.gl.ARRAY_BUFFER, object.vertexPositionBuffer);

                if (object.geometry.dynamicBuffer == true) {

                        world.GL.gl.bufferData(world.GL.gl.ARRAY_BUFFER, object.geometry.vertices, world.GL.gl.STATIC_DRAW);

                }

                world.GL.gl.vertexAttribPointer(object.shaderProgram.vertexPositionAttribute, object.vertexPositionBuffer.itemSize, world.GL.gl.FLOAT, false, 0, 0);
                world.GL.gl.enableVertexAttribArray(object.shaderProgram.vertexPositionAttribute);
                localLooper = localLooper + 1;
        }
        ////////////////////////////////////////////////////////
        //COLOR BUFFER
        ////////////////////////////////////////////////////////
        if (object.vertexColorBuffer) {
                world.GL.gl.bindBuffer(world.GL.gl.ARRAY_BUFFER, object.vertexColorBuffer);
                world.GL.gl.vertexAttribPointer(object.shaderProgram.vertexColorAttribute, object.vertexColorBuffer.itemSize, world.GL.gl.FLOAT, false, 0, 0);
                world.GL.gl.enableVertexAttribArray(object.shaderProgram.vertexColorAttribute);
                localLooper = localLooper + 1;
        }
        ////////////////////////////////////////////////////////
        //LIGHT STAFF
        ////////////////////////////////////////////////////////
        if (lighting && object.shaderProgram.useLightingUniform) {

                world.GL.gl.uniform1i(object.shaderProgram.useLightingUniform, lighting);

                /* Set the normals                       */
                if (object.vertexNormalBuffer) {
                        world.GL.gl.bindBuffer(world.GL.gl.ARRAY_BUFFER, object.vertexNormalBuffer);
                        world.GL.gl.vertexAttribPointer(object.shaderProgram.vertexNormalAttribute, object.vertexNormalBuffer.itemSize, world.GL.gl.FLOAT, false, 0, 0);
                        world.GL.gl.enableVertexAttribArray(object.shaderProgram.vertexNormalAttribute);
                        localLooper = localLooper + 1;
                }

                /* Set the ambient light                 */
                if (object.shaderProgram.ambientColorUniform) {
                        if (document.getElementById('ambLight') && document.getElementById('ambLight').color) {
                                world.GL.gl.uniform3f(object.shaderProgram.ambientColorUniform,
                                        parseFloat(document.getElementById('ambLight').color.rgb[0]),
                                        parseFloat(document.getElementById('ambLight').color.rgb[1]),
                                        parseFloat(document.getElementById('ambLight').color.rgb[2])
                                );
                        }
                        else {
                                world.GL.gl.uniform3f(object.shaderProgram.ambientColorUniform, object.LightsData.ambientLight.r, object.LightsData.ambientLight.g, object.LightsData.ambientLight.b);
                        }
                }

                /* Set the directional light             */
                if (object.shaderProgram.directionalColorUniform) {
                        if (document.getElementById('dirLight') && document.getElementById('dirLight').color) {
                                world.GL.gl.uniform3f(object.shaderProgram.directionalColorUniform,
                                        parseFloat(document.getElementById('dirLight').color.rgb[0]),
                                        parseFloat(document.getElementById('dirLight').color.rgb[1]),
                                        parseFloat(document.getElementById('dirLight').color.rgb[2])
                                );
                        }
                        else {
                                world.GL.gl.uniform3f(object.shaderProgram.directionalColorUniform, object.LightsData.directionLight.R(), object.LightsData.directionLight.G(), object.LightsData.directionLight.B());
                        }
                }

                /* Normalize the direction               */
                if (object.shaderProgram.lightingDirectionUniform) {
                        if (document.getElementById("dirX") && document.getElementById("dirY") && document.getElementById("dirZ")) {
                                var lightingDirection = [
                                        parseFloat(document.getElementById("dirX").value),
                                        parseFloat(document.getElementById("dirY").value),
                                        parseFloat(document.getElementById("dirZ").value)
                                ];
                        }
                        else {
                                var lightingDirection = [object.LightsData.lightingDirection.r, object.LightsData.lightingDirection.g, object.LightsData.lightingDirection.b];
                        }

                        var adjustedLD = vec3.create();
                        vec3.normalize(adjustedLD, lightingDirection);
                        vec3.scale(adjustedLD, adjustedLD, -1);
                        world.GL.gl.uniform3fv(object.shaderProgram.lightingDirectionUniform, adjustedLD);
                }
        }
        else {
                if (object.shaderProgram.useLightingUniform) {
                        if (object.shaderProgram.ambientColorUniform) {
                                world.GL.gl.uniform3f(object.shaderProgram.ambientColorUniform, parseFloat(1), parseFloat(2), parseFloat(0));
                        }
                        if (object.shaderProgram.directionalColorUniform) {
                                world.GL.gl.uniform3f(object.shaderProgram.directionalColorUniform, parseFloat(1), parseFloat(0), parseFloat(0));
                        }
                }
        }


        ////////////////////////////////////////////////////////
        //TEXTURES
        ////////////////////////////////////////////////////////
        if (object.vertexTexCoordBuffer) {

                world.GL.gl.bindBuffer(world.GL.gl.ARRAY_BUFFER, object.vertexTexCoordBuffer);

                //
                if (object.geometry.dynamicBuffer == true) {

                        world.GL.gl.bufferData(world.GL.gl.ARRAY_BUFFER, object.geometry.texCoords, world.GL.gl.STATIC_DRAW);

                }
                //

                world.GL.gl.vertexAttribPointer(object.shaderProgram.textureCoordAttribute, object.vertexTexCoordBuffer.itemSize, world.GL.gl.FLOAT, false, 0, 0);
                world.GL.gl.enableVertexAttribArray(object.shaderProgram.textureCoordAttribute);


                if (object.streamTextures != null) {

                        // video webcam textures
                        App.tools.loadVideoTexture("glVideoTexture", object.streamTextures.videoImage)
                        world.GL.gl.uniform1i(object.shaderProgram.samplerUniform, 0);

                }
                else {

                        for (var t = 0; t < object.textures.length; t++) {


                                if (object.custom.gl_texture == null) {
                                        eval("  world.GL.gl.activeTexture(world.GL.gl.TEXTURE" + t + ");  ")
                                        world.GL.gl.bindTexture(world.GL.gl.TEXTURE_2D, object.textures[t]);

                                        world.GL.gl.pixelStorei(world.GL.gl.UNPACK_FLIP_Y_WEBGL, false);
                                        world.GL.gl.texParameteri(world.GL.gl.TEXTURE_2D, world.GL.gl.TEXTURE_MAG_FILTER, world.GL.gl.NEAREST);
                                        //// world.GL.gl.texParameteri(eval("world.GL.gl." + object.glBlend.blendParamSrc ), eval("world.GL.gl." + object.glBlend.blendParamDest ) ); new code need to be done

                                        world.GL.gl.texParameteri(world.GL.gl.TEXTURE_2D, world.GL.gl.TEXTURE_MIN_FILTER, world.GL.gl.NEAREST);
                                        world.GL.gl.texParameteri(world.GL.gl.TEXTURE_2D, world.GL.gl.TEXTURE_WRAP_S, world.GL.gl.CLAMP_TO_EDGE);
                                        world.GL.gl.texParameteri(world.GL.gl.TEXTURE_2D, world.GL.gl.TEXTURE_WRAP_T, world.GL.gl.CLAMP_TO_EDGE);
                                        // -- Allocate storage for the texture
                                        //world.GL.gl.texStorage2D(world.GL.gl.TEXTURE_2D, 1, world.GL.gl.RGB8, 512, 512);
                                        //world.GL.gl.texSubImage2D(world.GL.gl.TEXTURE_2D, 0, 0, 0, world.GL.gl.RGB, world.GL.gl.UNSIGNED_BYTE, image);
                                        //world.GL.gl.generateMipmap(world.GL.gl.TEXTURE_2D);

                                        // ori world.GL.gl.uniform1i(object.shaderProgram.samplerUniform, t);
                                        eval(" var nothing = world.GL.gl.uniform1i(object.shaderProgram.samplerUniform" + t + ", t); ");
                                }
                                else {

                                        object.custom.gl_texture(object, t)

                                }


                        }

                }

                localLooper = localLooper + 1;

        }

        world.GL.gl.bindBuffer(world.GL.gl.ELEMENT_ARRAY_BUFFER, object.vertexIndexBuffer);
        world.setMatrixUniforms(object, this.pMatrix, object.mvMatrix);

        if (object.vertexNormalBuffer && object.shaderProgram.nMatrixUniform) {
                var normalMatrix = mat3.create();
                mat3.normalFromMat4(normalMatrix, object.mvMatrix);
                mat3.transpose(normalMatrix, normalMatrix);
                world.GL.gl.uniformMatrix3fv(object.shaderProgram.nMatrixUniform, false, normalMatrix);
        }

        // world.disableUnusedAttr( world.GL.gl, localLooper);
        world.disableUnusedAttr(world.GL.gl, 4);

        if (object.glBlend.blendEnabled == true) {
                if (!world.GL.gl.isEnabled(world.GL.gl.BLEND)) {

                        world.GL.gl.disable(world.GL.gl.DEPTH_TEST)
                        world.GL.gl.enable(world.GL.gl.BLEND)

                }
                try {
                        world.GL.gl.blendFunc(eval("world.GL.gl." + object.glBlend.blendParamSrc), eval("world.GL.gl." + object.glBlend.blendParamDest));
                }
                catch (e) { console.log(e) }
        }
        else {
                world.GL.gl.disable(world.GL.gl.BLEND)
                world.GL.gl.enable(world.GL.gl.DEPTH_TEST)
        }


        //world.GL.gl.drawElements( world.GL.gl.TRIANGLES, object.vertexIndexBuffer.numItems,  world.GL.gl.UNSIGNED_SHORT, 0);
        world.GL.gl.drawElements(eval("world.GL.gl." + object.glDrawElements.mode), object.glDrawElements.numberOfIndicesRender, world.GL.gl.UNSIGNED_SHORT, 0);


        this.mvPopMatrix(object.mvMatrix, this.mvMatrixStack);

};

//##############################################
// sphere
//##############################################
App.operation.draws.sphere = function(object) {

        var lighting = 1;
        var localLooper = 0;
        if (true) {
                lighting = true
        }

        ////////////////////////////////////////////////////////
        mat4.identity(object.mvMatrix);
        this.mvPushMatrix(object.mvMatrix, this.mvMatrixStack);

        ////////////////////////////////////////////////////////
        if (App.camera.FirstPersonController == true) { camera.setCamera(object) }

        ////////////////////////////////////////////////////////
        mat4.translate(object.mvMatrix, object.mvMatrix, object.position.worldLocation);
        mat4.rotate(object.mvMatrix, object.mvMatrix, degToRad(object.rotValue), object.rotDirection.RotationVector);



        ////////////////////////////////////////////////////////
        //VERTEX BUFFER
        ////////////////////////////////////////////////////////
        if (object.vertexPositionBuffer) {
                world.GL.gl.bindBuffer(world.GL.gl.ARRAY_BUFFER, object.vertexPositionBuffer);

                if (object.geometry.dynamicBuffer == true) {

                        world.GL.gl.bufferData(world.GL.gl.ARRAY_BUFFER, object.geometry.vertices, world.GL.gl.STATIC_DRAW);

                }

                world.GL.gl.vertexAttribPointer(object.shaderProgram.vertexPositionAttribute, object.vertexPositionBuffer.itemSize, world.GL.gl.FLOAT, false, 0, 0);
                world.GL.gl.enableVertexAttribArray(object.shaderProgram.vertexPositionAttribute);
                localLooper = localLooper + 1;
        }
        ////////////////////////////////////////////////////////
        //COLOR BUFFER
        ////////////////////////////////////////////////////////
        if (object.vertexColorBuffer) {
                world.GL.gl.bindBuffer(world.GL.gl.ARRAY_BUFFER, object.vertexColorBuffer);
                world.GL.gl.vertexAttribPointer(object.shaderProgram.vertexColorAttribute, object.vertexColorBuffer.itemSize, world.GL.gl.FLOAT, false, 0, 0);
                world.GL.gl.enableVertexAttribArray(object.shaderProgram.vertexColorAttribute);
                localLooper = localLooper + 1;
        }
        ////////////////////////////////////////////////////////
        //LIGHT STAFF
        ////////////////////////////////////////////////////////
        if (lighting && object.shaderProgram.useLightingUniform) {

                world.GL.gl.uniform1i(object.shaderProgram.useLightingUniform, lighting);

                /* Set the normals                       */
                if (object.vertexNormalBuffer) {
                        world.GL.gl.bindBuffer(world.GL.gl.ARRAY_BUFFER, object.vertexNormalBuffer);

                        world.GL.gl.vertexAttribPointer(object.shaderProgram.vertexNormalAttribute, object.vertexNormalBuffer.itemSize, world.GL.gl.FLOAT, false, 0, 0);
                        world.GL.gl.enableVertexAttribArray(object.shaderProgram.vertexNormalAttribute);
                        localLooper = localLooper + 1;
                }

                /* Set the ambient light                 */
                if (object.shaderProgram.ambientColorUniform) {
                        if (document.getElementById('ambLight') && document.getElementById('ambLight').color) {
                                world.GL.gl.uniform3f(object.shaderProgram.ambientColorUniform,
                                        parseFloat(document.getElementById('ambLight').color.rgb[0]),
                                        parseFloat(document.getElementById('ambLight').color.rgb[1]),
                                        parseFloat(document.getElementById('ambLight').color.rgb[2])
                                );
                        }
                        else { //object.LightsData.ambientLight
                                world.GL.gl.uniform3f(object.shaderProgram.ambientColorUniform, object.LightsData.ambientLight.r, object.LightsData.ambientLight.g, object.LightsData.ambientLight.b);
                        }
                }

                /* Set the directional light             */
                if (object.shaderProgram.directionalColorUniform) {
                        if (document.getElementById('dirLight') && document.getElementById('dirLight').color) {
                                world.GL.gl.uniform3f(object.shaderProgram.directionalColorUniform,
                                        parseFloat(document.getElementById('dirLight').color.rgb[0]),
                                        parseFloat(document.getElementById('dirLight').color.rgb[1]),
                                        parseFloat(document.getElementById('dirLight').color.rgb[2])
                                );
                        }
                        else {

                                //object.LightsData.lightingDirection

                                world.GL.gl.uniform3f(object.shaderProgram.directionalColorUniform, object.LightsData.directionLight.R(), object.LightsData.directionLight.G(), object.LightsData.directionLight.B());

                        }
                }

                /* Normalize the direction               */
                if (object.shaderProgram.lightingDirectionUniform) {
                        if (document.getElementById("dirX") && document.getElementById("dirY") && document.getElementById("dirZ")) {
                                var lightingDirection = [
                                        parseFloat(document.getElementById("dirX").value),
                                        parseFloat(document.getElementById("dirY").value),
                                        parseFloat(document.getElementById("dirZ").value)
                                ];
                        }
                        else {
                                var lightingDirection = [object.LightsData.lightingDirection.r, object.LightsData.lightingDirection.g, object.LightsData.lightingDirection.b];
                        }

                        var adjustedLD = vec3.create();
                        vec3.normalize(adjustedLD, lightingDirection);
                        vec3.scale(adjustedLD, adjustedLD, -1);
                        world.GL.gl.uniform3fv(object.shaderProgram.lightingDirectionUniform, adjustedLD);
                }
        }
        else {
                if (object.shaderProgram.useLightingUniform) {
                        if (object.shaderProgram.ambientColorUniform) {
                                world.GL.gl.uniform3f(object.shaderProgram.ambientColorUniform, parseFloat(0.2), parseFloat(0.2), parseFloat(0.2));
                        }
                        if (object.shaderProgram.directionalColorUniform) {
                                world.GL.gl.uniform3f(object.shaderProgram.directionalColorUniform, parseFloat(1), parseFloat(0), parseFloat(0));
                        }
                }
        }


        ////////////////////////////////////////////////////////
        //TEXTURES
        ////////////////////////////////////////////////////////
        if (object.vertexTexCoordBuffer) {

                world.GL.gl.bindBuffer(world.GL.gl.ARRAY_BUFFER, object.vertexTexCoordBuffer);

                //
                if (object.geometry.dynamicBuffer == true) {

                        world.GL.gl.bufferData(world.GL.gl.ARRAY_BUFFER, object.geometry.texCoords, world.GL.gl.STATIC_DRAW);

                }
                //

                world.GL.gl.vertexAttribPointer(object.shaderProgram.textureCoordAttribute, object.vertexTexCoordBuffer.itemSize, world.GL.gl.FLOAT, false, 0, 0);
                world.GL.gl.enableVertexAttribArray(object.shaderProgram.textureCoordAttribute);



                if (object.streamTextures != null) {

                        // video webcam textures
                        App.tools.loadVideoTexture("glVideoTexture", object.streamTextures.videoImage)
                        world.GL.gl.uniform1i(object.shaderProgram.samplerUniform, 0);

                }
                else {

                        for (var t = 0; t < object.textures.length; t++) {

                                eval("  world.GL.gl.activeTexture(world.GL.gl.TEXTURE" + t + ");  ")
                                world.GL.gl.bindTexture(world.GL.gl.TEXTURE_2D, object.textures[t]);
                                world.GL.gl.pixelStorei(world.GL.gl.UNPACK_FLIP_Y_WEBGL, false);
                                world.GL.gl.texParameteri(world.GL.gl.TEXTURE_2D, world.GL.gl.TEXTURE_MAG_FILTER, world.GL.gl.LINEAR);
                                world.GL.gl.texParameteri(world.GL.gl.TEXTURE_2D, world.GL.gl.TEXTURE_MIN_FILTER, world.GL.gl.LINEAR);
                                world.GL.gl.texParameteri(world.GL.gl.TEXTURE_2D, world.GL.gl.TEXTURE_WRAP_S, world.GL.gl.CLAMP_TO_EDGE);
                                world.GL.gl.texParameteri(world.GL.gl.TEXTURE_2D, world.GL.gl.TEXTURE_WRAP_T, world.GL.gl.CLAMP_TO_EDGE);
                                // -- Allocate storage for the texture
                                //world.GL.gl.texStorage2D(world.GL.gl.TEXTURE_2D, 1, world.GL.gl.RGB8, 512, 512);
                                //world.GL.gl.texSubImage2D(world.GL.gl.TEXTURE_2D, 0, 0, 0, world.GL.gl.RGB, world.GL.gl.UNSIGNED_BYTE, image);
                                //world.GL.gl.generateMipmap(world.GL.gl.TEXTURE_2D);
                                world.GL.gl.uniform1i(object.shaderProgram.samplerUniform, t);

                        }

                }

                localLooper = localLooper + 1;

        }

        world.GL.gl.bindBuffer(world.GL.gl.ELEMENT_ARRAY_BUFFER, object.vertexIndexBuffer);
        // world.setMatrixUniforms(object,this.pMatrix,object.mvMatrix);

        if (object.vertexNormalBuffer && object.shaderProgram.nMatrixUniform) {
                var normalMatrix = mat3.create();
                mat3.normalFromMat4(normalMatrix, object.mvMatrix);
                mat3.transpose(normalMatrix, normalMatrix);
                world.GL.gl.uniformMatrix3fv(object.shaderProgram.nMatrixUniform, false, normalMatrix);
        }




        try {
                world.GL.gl.useProgram(object.shaderProgram)
                world.GL.gl.uniform1i(object.shaderProgram.uniformTime, 0.1);
        } catch (e) {
                console.log("NO NO")
        }



        world.disableUnusedAttr(world.GL.gl, localLooper);
        //world.disableUnusedAttr( world.GL.gl, 3 );


        if (object.glBlend.blendEnabled == true) {
                if (!world.GL.gl.isEnabled(world.GL.gl.BLEND)) {

                        world.GL.gl.disable(world.GL.gl.DEPTH_TEST)
                        world.GL.gl.enable(world.GL.gl.BLEND)

                }
                world.GL.gl.blendFunc(eval("world.GL.gl." + object.glBlend.blendParamSrc), eval("world.GL.gl." + object.glBlend.blendParamDest));
        }
        else {
                world.GL.gl.disable(world.GL.gl.BLEND)
                world.GL.gl.enable(world.GL.gl.DEPTH_TEST)
        }


        world.setMatrixUniforms(object, this.pMatrix, object.mvMatrix);

        //world.GL.gl.drawElements( world.GL.gl.TRIANGLES, object.vertexIndexBuffer.numItems,  world.GL.gl.UNSIGNED_SHORT, 0);
        world.GL.gl.drawElements(eval("world.GL.gl." + object.glDrawElements.mode), object.glDrawElements.numberOfIndicesRender, world.GL.gl.UNSIGNED_SHORT, 0);

        this.mvPopMatrix(object.mvMatrix, this.mvMatrixStack);

};






//###############################################//###############################################
//###############################################//###############################################
// RENDER
//###############################################//###############################################
//###############################################//###############################################





var animate = function(rotationObject) {

        var timeNow = (new Date()).getTime();
        if (lastTime != 0) {
                var elapsed = timeNow - lastTime;
                rotationObject.rotValue += (rotationObject.rotationSpeed * elapsed) / 1000.0;
        }





};



App.operation.reDrawGlobal = function() {


        looper = 0;


        reDrawID = requestAnimationFrame(reDraw);


        world.renderPerspective();

        for (var t = 0; t < App.updateBeforeDraw.length; t++) {

                App.updateBeforeDraw[t].UPDATE()

        }


        while (looper <= world.contentList.length - 1) {
                if ("triangle" == world.contentList[looper].type) {
                        world.GL.gl.useProgram(world.contentList[looper].shaderProgram);
                        world.drawTriangle(world.contentList[looper]);
                        world.animate(world.contentList[looper]);
                }
                if ("square" == world.contentList[looper].type) {
                        world.GL.gl.useProgram(world.contentList[looper].shaderProgram);
                        world.drawSquare(world.contentList[looper]);
                        world.animate(world.contentList[looper]);
                }
                if ("cube" == world.contentList[looper].type || "cubeTex" == world.contentList[looper].type || "cubeLightTex" == world.contentList[looper].type) {
                        world.GL.gl.useProgram(world.contentList[looper].shaderProgram);
                        world.drawCube(world.contentList[looper]);
                        world.animate(world.contentList[looper]);
                }
                if ("pyramid" == world.contentList[looper].type) {
                        world.GL.gl.useProgram(world.contentList[looper].shaderProgram);
                        world.drawPyramid(world.contentList[looper]);
                        world.animate(world.contentList[looper]);
                }

                if ("obj" == world.contentList[looper].type) {
                        world.GL.gl.useProgram(world.contentList[looper].shaderProgram);
                        world.drawObj(world.contentList[looper]);
                        world.animate(world.contentList[looper]);
                }

                if ("squareTex" == world.contentList[looper].type) {
                        world.GL.gl.useProgram(world.contentList[looper].shaderProgram);
                        world.drawSquareTex(world.contentList[looper]);
                        world.animate(world.contentList[looper]);
                }

                if ("sphereLightTex" == world.contentList[looper].type || "sphere" == world.contentList[looper].type || "generatorLightTex" == world.contentList[looper].type) {
                        world.GL.gl.useProgram(world.contentList[looper].shaderProgram);
                        world.drawSphere(world.contentList[looper]);
                        world.animate(world.contentList[looper]);
                }


                looper = looper + 1;
        }


        updateFPS(1);

}


App.operation.CameraPerspective = function() {
        this.GL.gl.viewport(0, 0, wd, ht);
        this.GL.gl.clear(this.GL.gl.COLOR_BUFFER_BIT | this.GL.gl.DEPTH_BUFFER_BIT);

        // mat4.identity( world.mvMatrix )
        //  mat4.translate(world.mvMatrix  , world.mvMatrix, [ 10 , 10 , 10] );


        /* Field of view, Width height ratio, min distance of viewpoint, max distance of viewpoint, */
        mat4.perspective(this.pMatrix, degToRad(App.camera.viewAngle), (this.GL.gl.viewportWidth / this.GL.gl.viewportHeight), App.camera.nearViewpoint, App.camera.farViewpoint);
};


var callReDraw_ = function() {

        requestAnimationFrame(reDraw)

};









/* Width and Height variables of the browser screen  */
var wd, ht;
/* For Frame rate                                    */
var lastTime = 0;
var frames = 0;
var totalTime = 0;
var updateTime = 0;
var updateFrames = 0;
/* Because JavaScript is third class in mouse events */
// var mouseLoc      = defineMouseLocationObject();
/* Common sense to object disposition                */
var objListToDispose = new Array();
/* Need to stop the redraw when disposing            */
var reDrawID = 0;
/* Need an iterator in many places                   */
var looper = 0;



function defineworld(cavnas) {
        console.log("    Define the world");

        window.world = new Object();
        /*    Constructor for a world                   */
        world.GL = new defineWebGLWorld(canvas);

        /*    Exit if WEBGL could not initialize         */
        if ("undefined" == typeof world.GL.gl) {
                console.log("    Exception in Base world creation");
                delete this.GL;
                delete this;
                return 0;
        }
        else {
                console.log("    Setting WEBGL base attributes");
                world.GL.gl.clearColor(0.0, 0.0, 0.0, 1.0);
                world.GL.gl.enable(world.GL.gl.DEPTH_TEST);
                initiateFPS();
        }

        /* Complete declarations if pending              */
        world.pMatrix = mat4.create();
        world.mvMatrixStack = new Array();

        /* Contents of the world                        */
        world.contentList = new Array();

        /* Assign to the garbage collector object        */
        objListToDispose[objListToDispose.length] = world;


        //********************************
        // get data about gl limitation
        //********************************
        App.limitations.maxTexturesInFragmentShader = world.GL.gl.getParameter(world.GL.gl.MAX_TEXTURE_IMAGE_UNITS);
        App.limitations.ALIASED_POINT_SIZE_RANGE = world.GL.gl.getParameter(world.GL.gl.ALIASED_POINT_SIZE_RANGE);
        App.limitations.DEPTH_BITS = world.GL.gl.getParameter(world.GL.gl.DEPTH_BITS);
        App.limitations.MAX_SAMPLES = world.GL.gl.getParameter(world.GL.gl.MAX_SAMPLES);
        App.limitations.MAX_TEXTURE_SIZE = world.GL.gl.getParameter(world.GL.gl.MAX_TEXTURE_SIZE);
        App.limitations.MAX_VERTEX_ATTRIBS = world.GL.gl.getParameter(world.GL.gl.MAX_VERTEX_ATTRIBS);
        App.limitations.MAX_ELEMENTS_VERTICES = world.GL.gl.getParameter(world.GL.gl.MAX_ELEMENTS_VERTICES);


        /*****************************************************/
        /*             World base functions                 */
        /* Get the fragment or vertex shader                 */
        world.getShader = loadShaders;
        /* Initialize shader fragment                     */
        world.initShaders = initShaders;

        world.handleLoadedTexture = App.tools.BasicTextures;
        world.initTexture = App.tools.loadTextureImage;

        world.disableUnusedAttr = function(gl, vertLimit) {
                var Local_looper1 = vertLimit;
                //var Local_looper1 = 0;
                // position, color, texture and normals
                while (Local_looper1 < 4) {
                        gl.disableVertexAttribArray(Local_looper1);
                        Local_looper1 = Local_looper1 + 1;
                }
        }
        /*
         world.disableUnusedAttr = function(gl,vertLimit) {
         // var Local_looper1 = vertLimit;
         var Local_looper1 = 0;
         /// position, color, texture and normals
         while (Local_looper1 < vertLimit) {
         gl.disableVertexAttribArray(Local_looper1);
         Local_looper1 = Local_looper1 + 1;
         }
         }
         */

        /* Push Matrix */
        world.mvPushMatrix = App.operation.PUSH_MATRIX;
        /* Pop Matrix */
        world.mvPopMatrix = App.operation.POP_MATRIX;
        /* Set uniform Matrix */
        world.setMatrixUniforms = App.operation.SET_MATRIX_UNIFORMS;
        /* Draw Perspective                                   */
        world.renderPerspective = App.operation.CameraPerspective;
        /* Calculate rotatory speed                          */
        world.animate = animate;
        /* Buffer Triangle                                   */
        world.bufferTriangle = App.operation.triangle_buffer_procedure;
        /* Draw Triangle                                     */
        world.drawTriangle = App.operation.draws.triangle;
        /* Buffer Square                                     */
        world.bufferSquare = App.operation.square_buffer_procedure;
        /* Draw Square                                       */
        world.drawSquare = App.operation.draws.square;

        world.bufferObj = App.operation.obj_buffer_procedure;
        /* Buffer Cube                                       */
        world.bufferCube = App.operation.cube_buffer_procedure;
        /* Draw Cube                                       */
        world.drawCube = App.operation.draws.cube;
        /* Buffer Pyramid                                    */
        world.bufferPyramid = App.operation.piramide_buffer_procedure;
        /* Draw Pyramid                                       */
        world.drawPyramid = App.operation.draws.piramide;
        /* Draw Obj file */
        world.drawObj = App.operation.draws.drawObj;

        world.bufferSquareTex = App.operation.squareTex_buffer_procedure;
        world.drawSquareTex = App.operation.draws.drawSquareTex;

        world.drawSprite2d = App.operation.draws.sprite2d;
        world.bufferSprite2d = App.operation.sprite2d_buffer_procedure;


        world.drawSphere = App.operation.draws.sphere;
        world.bufferSphere = App.operation.sphere_buffer_procedure;

        /* Repeated draw functionality                       */
        reDraw = App.operation.reDrawGlobal;

        /* Fill world based on content                      */
        world.Add = function(filler, size, nameUniq, texturesPaths, mesh_, animationConstruct_) {
                /*
                 Common conventions to be followed across
                 Contents can contain any type of objects. Each object can be a triangle, cube etc.
                 object.type                 =    Contains the type of object namely triangle, cube
                 object.size                 =    Contains the size of the object. 1 unit will be the same as how WEBGL assumes 1 as in an array
                 object.sides                =    Contains the number of sides. This needs to be first declared.    (To be built and used)
                 object.shaderProgram        =    Contains the fragment and vertex shader
                 object.rotationSpeed        =    Rotatory speed
                 object.rotValue             =    Dynamic rotation based on rotation
                 object.rotDirection         =    [x,y,z]
                 object.color                =    Will contain colors based on the sides clockwise. One vertice -> [R,G,B,alpha]
                 object.texture              =    If texture is present then this will be used.                     (To be built and used)
                 object.vertexPositionBuffer =    allocated during buffering
                 object.vertexColorBuffer    =    allocated during buffering
                 object.vertexTexCoordBuffer =    allocated during buffering
                 object.vertexIndexBuffer    =    allocated during buffering
                 */

                console.log("    Fill world with:" + filler + " of size:" + size);
                if ("triangle" == filler) {
                        var triangleObject = new Object();
                        if (typeof nameUniq != 'undefined') {
                                triangleObject.name = nameUniq;
                        }
                        else {
                                triangleObject.name = "triangle_instance_" + Math.floor((Math.random() * 100000) + 1);
                        }
                        triangleObject.streamTextures = null;
                        triangleObject.type = filler;
                        triangleObject.size = size;
                        triangleObject.sides = 3;
                        triangleObject.shaderProgram = this.initShaders(this.GL.gl, filler + "-shader-fs", filler + "-shader-vs");
                        triangleObject.position = new Position(0, 0, -5.0);
                        triangleObject.rotationSpeed = 90;
                        triangleObject.rotValue = 1;
                        triangleObject.rotDirection = new rotationVector(1, 0, 0);
                        triangleObject.color = new GeoOfColor("triangle")
                        triangleObject.mvMatrix = mat4.create();
                        triangleObject.geometry = new TriangleVertex(triangleObject);
                        triangleObject.glBlend = new _glBlend();
                        if (triangleObject.shaderProgram) {
                                console.log("      Buffer the " + filler + ":Store at:" + this.contentList.length);
                                this.bufferTriangle(triangleObject);
                                triangleObject.glDrawElements = new _DrawElements(triangleObject.vertexColorBuffer.numItems);// NEED TO LOOK BETTER
                                this.contentList[this.contentList.length] = triangleObject;
                                App.scene[triangleObject.name] = triangleObject;

                        }
                        else {
                                console.log("      Triangle shader failure");
                        }
                }

                if ("square" == filler) {
                        var squareObject = new Object();
                        if (typeof nameUniq != 'undefined') {
                                squareObject.name = nameUniq;
                        }
                        else {
                                squareObject.name = "square_instance_" + Math.floor((Math.random() * 100000) + 1);
                        }
                        squareObject.streamTextures = null;
                        squareObject.type = filler;
                        squareObject.size = size;
                        squareObject.sides = 4;
                        squareObject.shaderProgram = this.initShaders(this.GL.gl, filler + "-shader-fs", filler + "-shader-vs");
                        squareObject.position = new Position(0, 0, -5.0);
                        squareObject.rotationSpeed = 75;
                        squareObject.rotValue = 0;
                        squareObject.rotDirection = new rotationVector(1, 0, 0);
                        squareObject.color = new GeoOfColor("4x4");
                        squareObject.mvMatrix = mat4.create();
                        squareObject.geometry = new SquareVertex(squareObject);
                        squareObject.glBlend = new _glBlend();

                        if (squareObject.shaderProgram) {
                                console.log("      Buffer the " + filler + ":Store at:" + this.contentList.length);
                                this.bufferSquare(squareObject);
                                squareObject.glDrawElements = new _DrawElements(squareObject.vertexColorBuffer.numItems);// NEED TO LOOK BETTER
                                squareObject.glDrawElements.mode = "TRIANGLE_STRIP";//ONLY FOR SQUARE
                                this.contentList[this.contentList.length] = squareObject;
                                App.scene[squareObject.name] = squareObject;
                        }
                        else {
                                console.log("      Square shader failure");
                        }
                }

                if ("squareTex" == filler) {

                        var squareObject = new Object();

                        if (typeof nameUniq != 'undefined') {
                                squareObject.name = nameUniq;
                        }
                        else {
                                squareObject.name = "square_instance_" + Math.floor((Math.random() * 100000) + 1);
                        }
                        squareObject.streamTextures = null;
                        squareObject.type = filler;
                        squareObject.size = size;
                        squareObject.sides = 4;
                        squareObject.position = new Position(0, 0, -5.0);
                        squareObject.rotationSpeed = 0;
                        squareObject.rotValue = 0;
                        squareObject.rotDirection = new rotationVector(1, 0, 0);
                        //squareObject.color         = new GeoOfColor("4x4");
                        squareObject.mvMatrix = mat4.create();
                        squareObject.geometry = new SquareVertex(squareObject);

                        squareObject.glBlend = new _glBlend();



                        squareObject.LightsData = {

                                directionLight: new COLOR(1, 1, 1),
                                ambientLight: new COLOR(1, 1, 1),
                                lightingDirection: new COLOR(1, 1, 0),

                        };
                        //##########

                        if (typeof texturesPaths !== 'undefined') {
                                if (typeof texturesPaths == 'string') {
                                        //alert('path is string')
                                        squareObject.texture = this.initTexture(this.GL.gl, texturesPaths);
                                        squareObject.textures = [];
                                        squareObject.textures[0] = squareObject.texture;
                                }
                                else if (typeof texturesPaths == 'object') {
                                        console.log('path is object')
                                        squareObject.textures = [];
                                        squareObject.texture = true;

                                        // cubeObject.shaderProgram = this.initShaders(this.GL.gl, filler+"-shader-fs", filler+"-shader-vs");
                                        RegenerateShader("" + filler + "-shader-fs", texturesPaths.source.length, texturesPaths.mix_operation);

                                        for (var t = 0; t < texturesPaths.source.length; ++t) {

                                                squareObject.textures.push(this.initTexture(this.GL.gl, texturesPaths.source[t]));

                                        }

                                        squareObject.shaderProgram = this.initShaders(this.GL.gl, filler + "-shader-fs", filler + "-shader-vs");


                                }
                                else {
                                        alert('Exec add obj : texturePaths : path is unknow typeof')
                                }


                        }
                        else {
                                // no textures , use default single textures
                                squareObject.texture = this.initTexture(this.GL.gl, "res/images/icon2.jpg");
                                squareObject.textures[0] = squareObject.texture;
                                squareObject.shaderProgram = this.initShaders(this.GL.gl, filler + "-shader-fs", filler + "-shader-vs");
                        }



                        squareObject.LightMap = new GeoOfColor("square");
                        //##########
                        //new
                        squareObject.custom = new Object();
                        squareObject.custom.gl_texture = null;


                        if (squareObject.shaderProgram) {
                                console.log("      Buffer the " + filler + ":Store at:" + this.contentList.length);
                                this.bufferSquareTex(squareObject); // using cubeTexLight

                                squareObject.glDrawElements = new _DrawElements(squareObject.vertexIndexBuffer.numItems);

                                this.contentList[this.contentList.length] = squareObject;
                                App.scene[squareObject.name] = squareObject;
                        }
                        else {
                                console.log("      Square shader failure");
                        }
                }

                if ("cube" == filler) {
                        var cubeObject = new Object();
                        if (typeof nameUniq != 'undefined') {
                                cubeObject.name = nameUniq;
                        }
                        else {
                                cubeObject.name = "cube_instance_" + Math.floor((Math.random() * 100000) + 1);
                        }
                        cubeObject.streamTextures = null;
                        cubeObject.type = filler;
                        cubeObject.size = size;
                        cubeObject.sides = 12;
                        cubeObject.shaderProgram = this.initShaders(this.GL.gl, filler + "-shader-fs", filler + "-shader-vs");
                        cubeObject.position = new Position(0, 0, -5.0);
                        cubeObject.rotationSpeed = 75;
                        cubeObject.rotValue = 1;
                        cubeObject.rotDirection = new rotationVector(1, 0, 0);
                        cubeObject.color = true;
                        cubeObject.mvMatrix = mat4.create();
                        cubeObject.geometry = new CubeVertex(cubeObject);



                        cubeObject.instancedDraws = {

                                numberOfInstance: 10,
                                array_of_local_offset: [12, 0, 0],
                                overrideDrawArraysInstance: function(object_) { }

                        }



                        cubeObject.glBlend = new _glBlend();



                        if (cubeObject.shaderProgram && cubeObject.geometry) {
                                console.log("      Buffer the " + filler + ":Store at:" + this.contentList.length);
                                this.bufferCube(cubeObject);

                                cubeObject.glDrawElements = new _DrawElements(cubeObject.vertexIndexBuffer.numItems);
                                this.contentList[this.contentList.length] = cubeObject;
                                App.scene[cubeObject.name] = cubeObject;

                        }
                        else {
                                console.log("      Cube shader failure");
                        }
                }

                if ("sphereTex" == filler || "sphereLightTex" == filler) {
                        var sphereObject = new Object();
                        if (typeof nameUniq != 'undefined') {
                                sphereObject.name = nameUniq;
                        }
                        else {
                                sphereObject.name = "sphereObject_instance_" + Math.floor((Math.random() * 100000) + 1);
                        }
                        sphereObject.streamTextures = null;
                        sphereObject.type = filler;
                        sphereObject.position = new Position(0, 0, -5.0);
                        sphereObject.size = size;
                        sphereObject.sides = 12;
                        sphereObject.rotationSpeed = 0;
                        sphereObject.rotValue = 1;
                        sphereObject.rotDirection = new rotationVector(0, 1, 0);


                        //lights
                        sphereObject.LightsData = {

                                directionLight: new COLOR(1, 1, 1),
                                ambientLight: new COLOR(1, 1, 1),
                                lightingDirection: new COLOR(1, 1, 0),

                        };





                        sphereObject.textures = [];
                        if (typeof texturesPaths !== 'undefined') {
                                if (typeof texturesPaths == 'string') {
                                        //alert('path is string')
                                        sphereObject.texture = this.initTexture(this.GL.gl, texturesPaths);

                                        sphereObject.textures.push(cubeObject.texture);
                                }
                                else if (typeof texturesPaths == 'object') {
                                        console.log('path is object')
                                        sphereObject.textures = [];
                                        sphereObject.texture = true;

                                        // cubeObject.shaderProgram = this.initShaders(this.GL.gl, filler+"-shader-fs", filler+"-shader-vs");
                                        RegenerateShader(filler + "-shader-fs", texturesPaths.source.length, texturesPaths.mix_operation);

                                        for (var t = 0; t < texturesPaths.source.length; ++t) {

                                                sphereObject.textures.push(this.initTexture(this.GL.gl, texturesPaths.source[t]));

                                        }

                                        sphereObject.shaderProgram = this.initShaders(this.GL.gl, filler + "-shader-fs", filler + "-shader-vs");


                                }
                                else {
                                        alert('Exec add obj : texturePaths : path is unknow typeof')
                                }


                        }
                        else {

                                // no textures , use default single textures
                                sphereObject.texture = this.initTexture(this.GL.gl, "res/images/texture_spiral1.png");
                                sphereObject.textures.push(sphereObject.texture);
                                sphereObject.texture = true;
                                sphereObject.shaderProgram = this.initShaders(this.GL.gl, filler + "-shader-fs", filler + "-shader-vs");

                        }

                        sphereObject.changeMaterial = function(texturesPaths) {

                                RegenerateShader(this.type + "-shader-fs", texturesPaths.source.length, texturesPaths.mix_operation);

                                for (var t = 0; t < texturesPaths.source.length; ++t) {

                                        this.textures.push(world.initTexture(world.GL.gl, texturesPaths.source[t]));

                                }

                                this.shaderProgram = world.initShaders(world.GL.gl, this.type + "-shader-fs", this.type + "-shader-vs");

                        };

                        sphereObject.changeShader = function(texturesPaths, custom_code) {

                                RegenerateCustomShader(this.type + "-shader-fs", texturesPaths.source.length, texturesPaths.mix_operation, custom_code);

                                for (var t = 0; t < texturesPaths.source.length; ++t) {

                                        this.textures.push(world.initTexture(world.GL.gl, texturesPaths.source[t]));

                                }

                                this.shaderProgram = world.initShaders(world.GL.gl, this.type + "-shader-fs", this.type + "-shader-vs");



                        };

                        sphereObject.mvMatrix = mat4.create();

                        //sphereObject.LightMap      = new GeoOfColor("cube light");
                        sphereObject.LightMap = undefined;

                        if (typeof mesh_ !== 'undefined') {


                                sphereObject.latitudeBands = mesh_.latitudeBands;
                                sphereObject.longitudeBands = mesh_.longitudeBands;
                                sphereObject.radius = mesh_.radius;


                        }
                        else {

                                sphereObject.latitudeBands = 30;
                                sphereObject.longitudeBands = 30;
                                sphereObject.radius = 2;

                        }

                        sphereObject.geometry = new sphereVertex(sphereObject);

                        //draws params
                        sphereObject.glBlend = new _glBlend();

                        if (sphereObject.shaderProgram) {
                                console.log("      Buffer the " + filler + ":Store at:" + this.contentList.length);
                                this.bufferSphere(sphereObject);

                                sphereObject.glDrawElements = new _DrawElements(sphereObject.vertexIndexBuffer.numItems);

                                this.contentList[this.contentList.length] = sphereObject;
                                App.scene[sphereObject.name] = sphereObject;
                        }
                        else {
                                console.log("      Cube shader failure");
                        }
                }

                if ("pyramid" == filler) {
                        var pyramidObject = new Object();
                        if (typeof nameUniq != 'undefined') {
                                pyramidObject.name = nameUniq;
                        }
                        else {
                                pyramidObject.name = "pyramid_instance_" + Math.floor((Math.random() * 100000) + 1);
                        }
                        pyramidObject.streamTextures = null;
                        pyramidObject.type = filler;
                        pyramidObject.size = size;
                        pyramidObject.sides = 8;
                        pyramidObject.shaderProgram = this.initShaders(this.GL.gl, filler + "-shader-fs", filler + "-shader-vs");
                        pyramidObject.position = new Position(0, 0, -5.0);
                        pyramidObject.rotationSpeed = 0;
                        pyramidObject.rotValue = 0;
                        pyramidObject.rotDirection = new rotationVector(1, 0, 0);
                        //pyramidObject.color         = new GeoOfColor ("Piramide4");
                        pyramidObject.mvMatrix = mat4.create();
                        pyramidObject.geometry = new PiramideVertex(pyramidObject);

                        pyramidObject.instancedDraws = {

                                numberOfInstance: 10,
                                array_of_local_offset: [12, 0, 0],
                                overrideDrawArraysInstance: function(object_) { }

                        }


                        pyramidObject.glBlend = new _glBlend();




                        if (pyramidObject.shaderProgram) {
                                console.log("      Buffer the " + filler + ":Store at:" + this.contentList.length);
                                this.bufferPyramid(pyramidObject);
                                pyramidObject.glDrawElements = new _DrawElements(pyramidObject.vertexColorBuffer.numItems); // !!!!!!!!!
                                this.contentList[this.contentList.length] = pyramidObject;
                                App.scene[pyramidObject.name] = pyramidObject;
                        }
                        else {
                                console.log("      Pyramid shader failure");
                        }
                }

                if ("obj" == filler) {
                        var objObject = new Object();

                        if (typeof nameUniq != 'undefined') {
                                objObject.name = nameUniq;
                        }
                        else {
                                objObject.name = "obj_instance_" + Math.floor((Math.random() * 100000) + 1);
                        }
                        objObject.streamTextures = null;
                        objObject.type = filler;
                        objObject.size = size;
                        objObject.sides = 8;
                        objObject.shaderProgram = this.initShaders(this.GL.gl, filler + "-shader-fs", filler + "-shader-vs");
                        objObject.position = new Position(0, -5, -8.0);
                        objObject.rotationSpeed = 0;
                        objObject.rotValue = 0;
                        objObject.rotDirection = new rotationVector(0, 1, 0);
                        objObject.color = new GeoOfColor("4x4");

                        //custom textures
                        objObject.custom = new Object();
                        objObject.custom.gl_texture = null;

                        // SYS.DEBUG.WARNING(">>>count       :  Specifies the number of elements to be rendered.");
                        objObject.glDrawElements = new _DrawElements(mesh_.indexBuffer.numItems);
                        objObject.glBlend = new _glBlend();

                        //--
                        objObject.LightsData = {

                                directionLight: new COLOR(5, 5, 5),
                                ambientLight: new COLOR(1, 1, 1),
                                lightingDirection: new COLOR(0, 1, 0),

                        };

                        if (typeof texturesPaths !== 'undefined') {
                                if (typeof texturesPaths == 'string') {
                                        //alert('path is string')
                                        objObject.texture = this.initTexture(this.GL.gl, texturesPaths);
                                        objObject.textures = [];
                                        objObject.textures_texParameteri = []; //new
                                        objObject.textures[0] = objObject.texture;
                                }
                                else if (typeof texturesPaths == 'object') {
                                        console.log('path is object')
                                        objObject.textures = [];
                                        objObject.textures_texParameteri = []; //new
                                        objObject.texture = true;
                                        RegenerateShader(filler + "-shader-fs", texturesPaths.source.length, texturesPaths.mix_operation);

                                        for (var t = 0; t < texturesPaths.source.length; ++t) {

                                                objObject.textures.push(this.initTexture(this.GL.gl, texturesPaths.source[t]));
                                                objObject.textures_texParameteri.push(new _glTexParameteri('TEXTURE_2D', 'TEXTURE_MAG_FILTER', 'LINEAR'));

                                        }

                                        objObject.shaderProgram = this.initShaders(this.GL.gl, filler + "-shader-fs", filler + "-shader-vs");


                                }
                                else {
                                        SYS.DEBUG.WARNING('Exec add obj : texturePaths : path is unknow typeof')
                                }


                        }
                        else {
                                // no textures , use default single textures
                                //objObject.texture = undefined;
                                objObject.texture = this.initTexture(this.GL.gl, "res/images/black_white.png");
                                objObject.textures = [];
                                objObject.textures[0] = objObject.texture;

                        }



                        objObject.LightMap = new GeoOfColor("square");

                        objObject.changeMaterial = function(texturesPaths) {


                                RegenerateShader(this.type + "-shader-fs", texturesPaths.source.length, texturesPaths.mix_operation);

                                for (var t = 0; t < texturesPaths.source.length; ++t) {

                                        this.textures.push(world.initTexture(world.GL.gl, texturesPaths.source[t]));

                                }

                                this.shaderProgram = world.initShaders(world.GL.gl, this.type + "-shader-fs", this.type + "-shader-vs");



                        };

                        objObject.mvMatrix = mat4.create();
                        ///  objObject.mesh          = App.meshes.skeleton;


                        if (typeof animationConstruct_ == 'undefined' || typeof animationConstruct_ == null) {

                                objObject.animation = null;

                        }
                        else {

                                objObject.animation = {

                                        id: animationConstruct_.id,
                                        sumOfAniFrames: animationConstruct_.sumOfAniFrames,
                                        currentAni: animationConstruct_.currentAni,

                                        speed: animationConstruct_.speed,
                                        currentDraws: 0


                                };


                        }

                        objObject.mesh = mesh_;

                        if (objObject.shaderProgram) {
                                console.log("      Buffer the " + filler + ":Store at:" + this.contentList.length);
                                this.bufferObj(objObject);
                                this.contentList[this.contentList.length] = objObject;
                                App.scene[objObject.name] = objObject;
                        }
                        else {
                                console.log("      obj file shader failure");
                        }
                }

                if ("cubeTex" == filler || "cubeLightTex" == filler) {
                        var cubeObject = new Object();
                        if (typeof nameUniq != 'undefined') {
                                cubeObject.name = nameUniq;
                        }
                        else {
                                cubeObject.name = "cube_instance_" + Math.floor((Math.random() * 100000) + 1);
                        }
                        cubeObject.streamTextures = null;
                        cubeObject.type = filler;
                        cubeObject.position = new Position(0, 0, -5.0);
                        cubeObject.size = size;
                        cubeObject.sides = 12;
                        cubeObject.rotationSpeed = 0;
                        cubeObject.rotValue = 1;
                        cubeObject.rotDirection = new rotationVector(0, 1, 0);


                        //lights
                        cubeObject.LightsData = {

                                directionLight: new COLOR(1, 1, 1),
                                ambientLight: new COLOR(1, 1, 1),
                                lightingDirection: new COLOR(1, 1, 0),

                        };

                        cubeObject.textures = [];
                        if (typeof texturesPaths !== 'undefined') {
                                if (typeof texturesPaths == 'string') {
                                        //alert('path is string')
                                        cubeObject.texture = this.initTexture(this.GL.gl, texturesPaths);

                                        cubeObject.textures.push(cubeObject.texture);
                                }
                                else if (typeof texturesPaths == 'object') {
                                        console.log('path is object')
                                        cubeObject.textures = [];
                                        cubeObject.texture = true;

                                        // cubeObject.shaderProgram = this.initShaders(this.GL.gl, filler+"-shader-fs", filler+"-shader-vs");
                                        RegenerateShader(filler + "-shader-fs", texturesPaths.source.length, texturesPaths.mix_operation);

                                        for (var t = 0; t < texturesPaths.source.length; ++t) {

                                                cubeObject.textures.push(this.initTexture(this.GL.gl, texturesPaths.source[t]));

                                        }

                                        cubeObject.shaderProgram = this.initShaders(this.GL.gl, filler + "-shader-fs", filler + "-shader-vs");


                                }
                                else {
                                        alert('Exec add obj : texturePaths : path is unknow typeof')
                                }


                        }
                        else {
                                // no textures , use default single textures
                                cubeObject.texture = this.initTexture(this.GL.gl, "res/images/texture_spiral1.png");
                                cubeObject.textures.push(cubeObject.texture);
                                cubeObject.texture = true;
                                cubeObject.shaderProgram = this.initShaders(this.GL.gl, filler + "-shader-fs", filler + "-shader-vs");

                        }

                        cubeObject.changeMaterial = function(texturesPaths) {


                                RegenerateShader(this.type + "-shader-fs", texturesPaths.source.length, texturesPaths.mix_operation);

                                for (var t = 0; t < texturesPaths.source.length; ++t) {

                                        this.textures.push(world.initTexture(world.GL.gl, texturesPaths.source[t]));

                                }

                                this.shaderProgram = world.initShaders(world.GL.gl, this.type + "-shader-fs", this.type + "-shader-vs");



                        };
                        cubeObject.mvMatrix = mat4.create();
                        cubeObject.LightMap = new GeoOfColor("cube light");
                        cubeObject.geometry = new CubeVertex(cubeObject);

                        cubeObject.instancedDraws = {

                                numberOfInstance: 10,
                                array_of_local_offset: [12, 0, 0],
                                overrideDrawArraysInstance: function(object_) { }

                        }

                        //draws params
                        cubeObject.glBlend = new _glBlend();

                        if (cubeObject.shaderProgram) {
                                console.log("      Buffer the " + filler + ":Store at:" + this.contentList.length);
                                this.bufferCube(cubeObject);

                                cubeObject.glDrawElements = new _DrawElements(cubeObject.vertexIndexBuffer.numItems);

                                this.contentList[this.contentList.length] = cubeObject;
                                App.scene[cubeObject.name] = cubeObject;
                        }
                        else {
                                console.log("      Cube shader failure");
                        }
                }


                if ("generatorTex" == filler || "generatorLightTex" == filler) {
                        var customObject = new Object();
                        if (typeof nameUniq != 'undefined') {
                                customObject.name = nameUniq;
                        }
                        else {
                                customObject.name = "customObject_instance_" + Math.floor((Math.random() * 100000) + 1);
                        }
                        customObject.streamTextures = null;
                        customObject.type = filler;
                        customObject.position = new Position(0, 0, -5.0);
                        customObject.size = size;
                        customObject.sides = 12;
                        customObject.rotationSpeed = 0;
                        customObject.rotValue = 1;
                        customObject.rotDirection = new rotationVector(0, 1, 0);


                        //lights
                        customObject.LightsData = {

                                directionLight: new COLOR(1, 1, 1),
                                ambientLight: new COLOR(1, 1, 1),
                                lightingDirection: new COLOR(1, 1, 0),

                        };

                        customObject.textures = [];
                        if (typeof texturesPaths !== 'undefined') {
                                if (typeof texturesPaths == 'string') {
                                        //alert('path is string')
                                        customObject.texture = this.initTexture(this.GL.gl, texturesPaths);

                                        customObject.textures.push(customObject.texture);
                                }
                                else if (typeof texturesPaths == 'object') {
                                        console.log('path is object')
                                        customObject.textures = [];
                                        customObject.texture = true;

                                        // cubeObject.shaderProgram = this.initShaders(this.GL.gl, filler+"-shader-fs", filler+"-shader-vs");
                                        RegenerateShader("sphereLightTex" + "-shader-fs", texturesPaths.source.length, texturesPaths.mix_operation);

                                        for (var t = 0; t < texturesPaths.source.length; ++t) {

                                                customObject.textures.push(this.initTexture(this.GL.gl, texturesPaths.source[t]));

                                        }

                                        customObject.shaderProgram = this.initShaders(this.GL.gl, "sphereLightTex" + "-shader-fs", "sphereLightTex" + "-shader-vs");//hard code


                                }
                                else {
                                        alert('Exec add obj : texturePaths : path is unknow typeof')
                                }


                        }
                        else {
                                // no textures , use default single textures
                                customObject.texture = this.initTexture(this.GL.gl, "res/images/texture_spiral1.png");
                                customObject.textures.push(customObject.texture);
                                customObject.texture = true;
                                customObject.shaderProgram = this.initShaders(this.GL.gl, "sphereLightTex" + "-shader-fs", "sphereLightTex" + "-shader-vs");

                        }


                        customObject.changeMaterial = function(texturesPaths) {


                                RegenerateShader("sphereLightTex" + "-shader-fs", texturesPaths.source.length, texturesPaths.mix_operation);

                                for (var t = 0; t < texturesPaths.source.length; ++t) {

                                        this.textures.push(world.initTexture(world.GL.gl, texturesPaths.source[t]));

                                }

                                //this.shaderProgram = world.initShaders(world.GL.gl, this.type +"-shader-fs", this.type + "-shader-vs");
                                this.shaderProgram = world.initShaders(world.GL.gl, "sphereLightTex" + "-shader-fs", "sphereLightTex" + "-shader-vs");



                        };

                        customObject.mvMatrix = mat4.create();

                        //sphereObject.LightMap      = new GeoOfColor("cube light");
                        customObject.LightMap = undefined;

                        if (typeof mesh_ !== 'undefined') {

                                ////////////////////////////////////////////////
                                customObject.latitudeBands = mesh_.latitudeBands;
                                customObject.longitudeBands = mesh_.longitudeBands;
                                customObject.radius = mesh_.radius;
                                customObject.custom_type = mesh_.custom_type;


                        }
                        else {

                                customObject.latitudeBands = 30;
                                customObject.longitudeBands = 30;
                                customObject.radius = 2;

                        }

                        customObject.geometry = new customVertex(customObject);

                        //draws params
                        customObject.glBlend = new _glBlend();

                        if (customObject.shaderProgram) {
                                console.log("      Buffer the " + filler + ":Store at:" + this.contentList.length);
                                this.bufferSphere(customObject);

                                customObject.glDrawElements = new _DrawElements(customObject.vertexIndexBuffer.numItems);

                                this.contentList[this.contentList.length] = customObject;
                                App.scene[customObject.name] = customObject;
                        }
                        else {
                                console.log("      customObject shader failure");
                        }
                }


                //
        };
        //

        world.callReDraw = callReDraw_;

        /* Destructor                                        */
        world.destroy = App.operation.destroyWorld;

        return world;
}
/* WebGL end of world                                */
/*****************************************************/




(function(scope, undefined) {
        'use strict';

        var OBJ = {};

        if (typeof module !== 'undefined') {
                module.exports = OBJ;
        } else {
                scope.OBJ = OBJ;
        }

        /**
         * The main Mesh class. The constructor will parse through the OBJ file data
         * and collect the vertex, vertex normal, texture, and face information. This
         * information can then be used later on when creating your VBOs. See
         * OBJ.initMeshBuffers for an example of how to use the newly created Mesh
         *
         * @class Mesh
         * @constructor
         *
         * @param {String} objectData a string representation of an OBJ file with newlines preserved.
         */
        OBJ.Mesh = function(objectData) {
                /*
                 The OBJ file format does a sort of compression when saving a model in a
                 program like Blender. There are at least 3 sections (4 including textures)
                 within the file. Each line in a section begins with the same string:
                 * 'v': indicates vertex section
                 * 'vn': indicates vertex normal section
                 * 'f': indicates the faces section
                 * 'vt': indicates vertex texture section (if textures were used on the model)
                 Each of the above sections (except for the faces section) is a list/set of
                 unique vertices.
                 Each line of the faces section contains a list of
                 (vertex, [texture], normal) groups
                 Some examples:
                 // the texture index is optional, both formats are possible for models
                 // without a texture applied
                 f 1/25 18/46 12/31
                 f 1//25 18//46 12//31
                 // A 3 vertex face with texture indices
                 f 16/92/11 14/101/22 1/69/1
                 // A 4 vertex face
                 f 16/92/11 40/109/40 38/114/38 14/101/22
                 The first two lines are examples of a 3 vertex face without a texture applied.
                 The second is an example of a 3 vertex face with a texture applied.
                 The third is an example of a 4 vertex face. Note: a face can contain N
                 number of vertices.
                 Each number that appears in one of the groups is a 1-based index
                 corresponding to an item from the other sections (meaning that indexing
                 starts at one and *not* zero).
                 For example:
                 `f 16/92/11` is saying to
                 - take the 16th element from the [v] vertex array
                 - take the 92nd element from the [vt] texture array
                 - take the 11th element from the [vn] normal array
                 and together they make a unique vertex.
                 Using all 3+ unique Vertices from the face line will produce a polygon.
                 Now, you could just go through the OBJ file and create a new vertex for
                 each face line and WebGL will draw what appears to be the same model.
                 However, vertices will be overlapped and duplicated all over the place.
                 Consider a cube in 3D space centered about the origin and each side is
                 2 units long. The front face (with the positive Z-axis pointing towards
                 you) would have a Top Right vertex (looking orthogonal to its normal)
                 mapped at (1,1,1) The right face would have a Top Left vertex (looking
                 orthogonal to its normal) at (1,1,1) and the top face would have a Bottom
                 Right vertex (looking orthogonal to its normal) at (1,1,1). Each face
                 has a vertex at the same coordinates, however, three distinct vertices
                 will be drawn at the same spot.
                 To solve the issue of duplicate Vertices (the `(vertex, [texture], normal)`
                 groups), while iterating through the face lines, when a group is encountered
                 the whole group string ('16/92/11') is checked to see if it exists in the
                 packed.hashindices object, and if it doesn't, the indices it specifies
                 are used to look up each attribute in the corresponding attribute arrays
                 already created. The values are then copied to the corresponding unpacked
                 array (flattened to play nice with WebGL's ELEMENT_ARRAY_BUFFER indexing),
                 the group string is added to the hashindices set and the current unpacked
                 index is used as this hashindices value so that the group of elements can
                 be reused. The unpacked index is incremented. If the group string already
                 exists in the hashindices object, its corresponding value is the index of
                 that group and is appended to the unpacked indices array.
                 */
                var verts = [], vertNormals = [], textures = [], unpacked = {};
                // unpacking stuff
                unpacked.verts = [];
                unpacked.norms = [];
                unpacked.textures = [];
                unpacked.hashindices = {};
                unpacked.indices = [];
                unpacked.index = 0;
                // array of lines separated by the newline
                var lines = objectData.split('\n');

                var VERTEX_RE = /^v\s/;
                var NORMAL_RE = /^vn\s/;
                var TEXTURE_RE = /^vt\s/;
                var FACE_RE = /^f\s/;
                var WHITESPACE_RE = /\s+/;

                for (var i = 0; i < lines.length; i++) {
                        var line = lines[i].trim();
                        var elements = line.split(WHITESPACE_RE);
                        elements.shift();

                        if (VERTEX_RE.test(line)) {
                                // if this is a vertex
                                verts.push.apply(verts, elements);
                        } else if (NORMAL_RE.test(line)) {
                                // if this is a vertex normal
                                vertNormals.push.apply(vertNormals, elements);
                        } else if (TEXTURE_RE.test(line)) {
                                // if this is a texture
                                textures.push.apply(textures, elements);
                        } else if (FACE_RE.test(line)) {
                                // if this is a face
                                /*
                                 split this face into an array of vertex groups
                                 for example:
                                 f 16/92/11 14/101/22 1/69/1
                                 becomes:
                                 ['16/92/11', '14/101/22', '1/69/1'];
                                 */
                                var quad = false;
                                for (var j = 0, eleLen = elements.length; j < eleLen; j++) {
                                        // Triangulating quads
                                        // quad: 'f v0/t0/vn0 v1/t1/vn1 v2/t2/vn2 v3/t3/vn3/'
                                        // corresponding triangles:
                                        //      'f v0/t0/vn0 v1/t1/vn1 v2/t2/vn2'
                                        //      'f v2/t2/vn2 v3/t3/vn3 v0/t0/vn0'
                                        if (j === 3 && !quad) {
                                                // add v2/t2/vn2 in again before continuing to 3
                                                j = 2;
                                                quad = true;
                                        }
                                        if (elements[j] in unpacked.hashindices) {
                                                unpacked.indices.push(unpacked.hashindices[elements[j]]);
                                        }
                                        else {
                                                /*
                                                 Each element of the face line array is a vertex which has its
                                                 attributes delimited by a forward slash. This will separate
                                                 each attribute into another array:
                                                 '19/92/11'
                                                 becomes:
                                                 vertex = ['19', '92', '11'];
                                                 where
                                                 vertex[0] is the vertex index
                                                 vertex[1] is the texture index
                                                 vertex[2] is the normal index
                                                 Think of faces having Vertices which are comprised of the
                                                 attributes location (v), texture (vt), and normal (vn).
                                                 */
                                                var vertex = elements[j].split('/');
                                                /*
                                                 The verts, textures, and vertNormals arrays each contain a
                                                 flattend array of coordinates.
                                                 Because it gets confusing by referring to vertex and then
                                                 vertex (both are different in my descriptions) I will explain
                                                 what's going on using the vertexNormals array:
                                                 vertex[2] will contain the one-based index of the vertexNormals
                                                 section (vn). One is subtracted from this index number to play
                                                 nice with javascript's zero-based array indexing.
                                                 Because vertexNormal is a flattened array of x, y, z values,
                                                 simple pointer arithmetic is used to skip to the start of the
                                                 vertexNormal, then the offset is added to get the correct
                                                 component: +0 is x, +1 is y, +2 is z.
                                                 This same process is repeated for verts and textures.
                                                 */
                                                // vertex position
                                                unpacked.verts.push(+verts[(vertex[0] - 1) * 3 + 0]);
                                                unpacked.verts.push(+verts[(vertex[0] - 1) * 3 + 1]);
                                                unpacked.verts.push(+verts[(vertex[0] - 1) * 3 + 2]);
                                                // vertex textures
                                                if (textures.length) {
                                                        unpacked.textures.push(+textures[(vertex[1] - 1) * 2 + 0]);
                                                        unpacked.textures.push(+textures[(vertex[1] - 1) * 2 + 1]);
                                                }
                                                // vertex normals
                                                unpacked.norms.push(+vertNormals[(vertex[2] - 1) * 3 + 0]);
                                                unpacked.norms.push(+vertNormals[(vertex[2] - 1) * 3 + 1]);
                                                unpacked.norms.push(+vertNormals[(vertex[2] - 1) * 3 + 2]);
                                                // add the newly created vertex to the list of indices
                                                unpacked.hashindices[elements[j]] = unpacked.index;
                                                unpacked.indices.push(unpacked.index);
                                                // increment the counter
                                                unpacked.index += 1;
                                        }
                                        if (j === 3 && quad) {
                                                // add v0/t0/vn0 onto the second triangle
                                                unpacked.indices.push(unpacked.hashindices[elements[0]]);
                                        }
                                }
                        }
                }
                this.vertices = unpacked.verts;
                this.vertexNormals = unpacked.norms;
                this.textures = unpacked.textures;
                this.indices = unpacked.indices;
        }

        var Ajax = function() {
                // this is just a helper class to ease ajax calls
                var _this = this;
                this.xmlhttp = new XMLHttpRequest();

                this.get = function(url, callback) {
                        _this.xmlhttp.onreadystatechange = function() {
                                if (_this.xmlhttp.readyState === 4) {
                                        callback(_this.xmlhttp.responseText, _this.xmlhttp.status);
                                }
                        };
                        _this.xmlhttp.open('GET', url, true);
                        _this.xmlhttp.send();
                }
        };

        /**
         * Takes in an object of `mesh_name`, `'/url/to/OBJ/file'` pairs and a callback
         * function. Each OBJ file will be ajaxed in and automatically converted to
         * an OBJ.Mesh. When all files have successfully downloaded the callback
         * function provided will be called and passed in an object containing
         * the newly created meshes.
         *
         * **Note:** In order to use this function as a way to download meshes, a
         * webserver of some sort must be used.
         *
         * @param {Object} nameAndURLs an object where the key is the name of the mesh and the value is the url to that mesh's OBJ file
         *
         * @param {Function} completionCallback should contain a function that will take one parameter: an object array where the keys will be the unique object name and the value will be a Mesh object
         *
         * @param {Object} meshes In case other meshes are loaded separately or if a previously declared variable is desired to be used, pass in a (possibly empty) json object of the pattern: { '<mesh_name>': OBJ.Mesh }
         *
         */
        OBJ.downloadMeshes = function(nameAndURLs, completionCallback, meshes) {
                // the total number of meshes. this is used to implement "blocking"
                var semaphore = Object.keys(nameAndURLs).length;
                // if error is true, an alert will given
                var error = false;
                // this is used to check if all meshes have been downloaded
                // if meshes is supplied, then it will be populated, otherwise
                // a new object is created. this will be passed into the completionCallback
                if (meshes === undefined) meshes = {};
                // loop over the mesh_name,url key,value pairs
                for (var mesh_name in nameAndURLs) {
                        if (nameAndURLs.hasOwnProperty(mesh_name)) {
                                new Ajax().get(nameAndURLs[mesh_name], (function(name) {
                                        return function(data, status) {
                                                if (status === 200) {
                                                        meshes[name] = new OBJ.Mesh(data);
                                                }
                                                else {
                                                        error = true;
                                                        console.error('An error has occurred and the mesh "' +
                                                                name + '" could not be downloaded.');
                                                }
                                                // the request has finished, decrement the counter
                                                semaphore--;
                                                if (semaphore === 0) {
                                                        if (error) {
                                                                // if an error has occurred, the user is notified here and the
                                                                // callback is not called
                                                                console.error('An error has occurred and one or meshes has not been ' +
                                                                        'downloaded. The execution of the script has terminated.');
                                                                throw '';
                                                        }
                                                        // there haven't been any errors in retrieving the meshes
                                                        // call the callback
                                                        completionCallback(meshes);
                                                }
                                        }
                                })(mesh_name));
                        }
                }
        };

        var _buildBuffer = function(gl, type, data, itemSize) {
                var buffer = gl.createBuffer();
                var arrayView = type === gl.ARRAY_BUFFER ? Float32Array : Uint16Array;
                gl.bindBuffer(type, buffer);
                gl.bufferData(type, new arrayView(data), gl.STATIC_DRAW);
                buffer.itemSize = itemSize;
                buffer.numItems = data.length / itemSize;
                return buffer;
        }

        /**
         * Takes in the WebGL context and a Mesh, then creates and appends the buffers
         * to the mesh object as attributes.
         *
         * @param {WebGLRenderingContext} gl the `canvas.getContext('webgl')` context instance
         * @param {Mesh} mesh a single `OBJ.Mesh` instance
         *
         * The newly created mesh attributes are:
         *
         * Attrbute | Description
         * :--- | ---
         * **normalBuffer**       |contains the model&#39;s Vertex Normals
         * normalBuffer.itemSize  |set to 3 items
         * normalBuffer.numItems  |the total number of vertex normals
         * |
         * **textureBuffer**      |contains the model&#39;s Texture Coordinates
         * textureBuffer.itemSize |set to 2 items
         * textureBuffer.numItems |the number of texture coordinates
         * |
         * **vertexBuffer**       |contains the model&#39;s Vertex Position Coordinates (does not include w)
         * vertexBuffer.itemSize  |set to 3 items
         * vertexBuffer.numItems  |the total number of vertices
         * |
         * **indexBuffer**        |contains the indices of the faces
         * indexBuffer.itemSize   |is set to 1
         * indexBuffer.numItems   |the total number of indices
         *
         * A simple example (a lot of steps are missing, so don't copy and paste):
         *
         *     var gl   = canvas.getContext('webgl'),
         *         mesh = OBJ.Mesh(obj_file_data);
         *     // compile the shaders and create a shader program
         *     var shaderProgram = gl.createProgram();
         *     // compilation stuff here
         *     ...
         *     // make sure you have vertex, vertex normal, and texture coordinate
         *     // attributes located in your shaders and attach them to the shader program
         *     shaderProgram.vertexPositionAttribute = gl.getAttribLocation(shaderProgram, "aVertexPosition");
         *     gl.enableVertexAttribArray(shaderProgram.vertexPositionAttribute);
         *
         *     shaderProgram.vertexNormalAttribute = gl.getAttribLocation(shaderProgram, "aVertexNormal");
         *     gl.enableVertexAttribArray(shaderProgram.vertexNormalAttribute);
         *
         *     shaderProgram.textureCoordAttribute = gl.getAttribLocation(shaderProgram, "aTextureCoord");
         *     gl.enableVertexAttribArray(shaderProgram.textureCoordAttribute);
         *
         *     // create and initialize the vertex, vertex normal, and texture coordinate buffers
         *     // and save on to the mesh object
         *     OBJ.initMeshBuffers(gl, mesh);
         *
         *     // now to render the mesh
         *     gl.bindBuffer(gl.ARRAY_BUFFER, mesh.vertexBuffer);
         *     gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, mesh.vertexBuffer.itemSize, gl.FLOAT, false, 0, 0);
         *     // it's possible that the mesh doesn't contain
         *     // any texture coordinates (e.g. suzanne.obj in the development branch).
         *     // in this case, the texture vertexAttribArray will need to be disabled
         *     // before the call to drawElements
         *     if(!mesh.textures.length){
         *       gl.disableVertexAttribArray(shaderProgram.textureCoordAttribute);
         *     }
         *     else{
         *       // if the texture vertexAttribArray has been previously
         *       // disabled, then it needs to be re-enabled
         *       gl.enableVertexAttribArray(shaderProgram.textureCoordAttribute);
         *       gl.bindBuffer(gl.ARRAY_BUFFER, mesh.textureBuffer);
         *       gl.vertexAttribPointer(shaderProgram.textureCoordAttribute, mesh.textureBuffer.itemSize, gl.FLOAT, false, 0, 0);
         *     }
         *
         *     gl.bindBuffer(gl.ARRAY_BUFFER, mesh.normalBuffer);
         *     gl.vertexAttribPointer(shaderProgram.vertexNormalAttribute, mesh.normalBuffer.itemSize, gl.FLOAT, false, 0, 0);
         *
         *     gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, model.mesh.indexBuffer);
         *     gl.drawElements(gl.TRIANGLES, model.mesh.indexBuffer.numItems, gl.UNSIGNED_SHORT, 0);
         */
        OBJ.initMeshBuffers = function(gl, mesh) {
                mesh.normalBuffer = _buildBuffer(gl, gl.ARRAY_BUFFER, mesh.vertexNormals, 3);
                mesh.textureBuffer = _buildBuffer(gl, gl.ARRAY_BUFFER, mesh.textures, 2);
                mesh.vertexBuffer = _buildBuffer(gl, gl.ARRAY_BUFFER, mesh.vertices, 3);
                mesh.indexBuffer = _buildBuffer(gl, gl.ELEMENT_ARRAY_BUFFER, mesh.indices, 1);
        }

        OBJ.deleteMeshBuffers = function(gl, mesh) {
                gl.deleteBuffer(mesh.normalBuffer);
                gl.deleteBuffer(mesh.textureBuffer);
                gl.deleteBuffer(mesh.vertexBuffer);
                gl.deleteBuffer(mesh.indexBuffer);
        }
})(this);
