/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */

(function () {
  "use strict";

  window.degToRad = function (degrees) {
    return degrees * Math.PI / 180;
  };

  //NO WEBGL CODE
  //###############################################//###############################################
  //###############################################//###############################################
  // BROWSER AND DEVICE DETECT
  //###############################################//###############################################
  //###############################################//###############################################
  window.DETECTBROWSER = function () {
    var HREFF,
      HREFTXT = "unknown";
    this.NAVIGATOR = navigator.userAgent;
    var NAV = navigator.userAgent;
    var navMacintosh,
      gecko,
      navIpad,
      operatablet,
      navIphone,
      navFirefox,
      navChrome,
      navOpera,
      navSafari,
      navandroid,
      mobile,
      navMozilla;
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
    // mobile = NAV.match(/mobile/gi);
    navMacintosh = NAV.match(/Macintosh/gi);

    // eslint-disable-next-line no-undef
    var TYPEOFANDROID = 0;
    window["NOMOBILE"] = 0;

    // eslint-disable-next-line no-redeclare
    var mobile = (/iphone|ipad|ipod|android|blackberry|mini|windows\sce|palm/i.test(navigator.userAgent.toLowerCase()));
    if (mobile) {
      var userAgent = navigator.userAgent.toLowerCase();
      if ((userAgent.search("android") > -1) && (userAgent.search("mobile") > -1)) {
        console.log("ANDROID MOBILE");
      }
      else if ((userAgent.search("android") > -1) && !(userAgent.search("mobile") > -1)) {
        console.log(" ANDROID TABLET ");
        TYPEOFANDROID = 1;
      }
    } else {
      // eslint-disable-next-line no-undef
      NOMOBILE = 1;
    }
    // FIREFOX za android
    if (navFirefox && navandroid && TYPEOFANDROID == 0) {
      HREFF = "#";
      HREFTXT = "mobile_firefox_android";
    }
    // FIREFOX za android T
    if (navFirefox && navandroid && TYPEOFANDROID == 1) {
      HREFF = "#";
      HREFTXT = "mobile_firefox_android_tablet";
    }
    // OPERA ZA ANDROID
    if (navOpera && navandroid) {
      HREFF = "#";
      HREFTXT = "opera_mobile_android";
    } // provera
    // OPERA ZA ANDROID TABLET
    if (navOpera && navandroid && operatablet) {
      HREFF = "#";
      HREFTXT = "opera_mobile_android_tablet";
    } // provera
    // safari mobile za IPHONE - i safari mobile za IPAD i CHROME za IPAD
    if (navSafari) {
      var Iphonesafari = NAV.match(/iphone/gi);

      if (Iphonesafari) {
        HREFF = "#";
        HREFTXT = "safari_mobile_iphone";
      } else if (navIpad) {
        HREFF = "#";
        HREFTXT = "mobile_safari_chrome_ipad";
      } else if (navMacintosh) {
        HREFF = "#";
        HREFTXT = "desktop_safari";
      } //Macintosh
      else if (navandroid) {
        HREFF = "#";
        HREFTXT = "android_native";
      }

    }
    // TEST CHROME
    if (navChrome && navSafari && navMozilla && TYPEOFANDROID == 1) {
      HREFF = "#";
      HREFTXT = "mobile_chrome_android_tablet";
    }
    if (navChrome && navSafari && navMozilla && TYPEOFANDROID == 0) {
      HREFF = "#";
      HREFTXT = "mobile_chrome_android";
    }
    if (navChrome && TYPEOFANDROID == 0) {
      HREFF = "#";
      HREFTXT = "chrome_browser";
    }
    if (navMozilla && NOMOBILE == 1 && gecko && navFirefox) {
      HREFF = "#";
      HREFTXT = "firefox_desktop";
    }
    if (navOpera && TYPEOFANDROID == 0 && !mobile) {
      HREFF = "#";
      HREFTXT = "opera_desktop";
    }

    this.NAME = HREFTXT;
    this.NOMOBILE = NOMOBILE;
  };
  //###############################################//###############################################
  //###############################################//###############################################

  window.BROWSER = new window.DETECTBROWSER();

  //###############################################//###############################################
  //###############################################//###############################################
  // LOGGER
  //###############################################//###############################################
  //###############################################//###############################################
  window.LOG = function () {

    this.ENABLE = true;

    this.LOG = function (data) {

      if (this.ENABLE == true) {

        console.log("%c" + data, "background: #333; color: lime");

      }

    };

    this.WARNING = function (data) {

      if (this.ENABLE == true) {

        console.log("%c Warning : " + data, "background: #333; color: yellow");

      }

    };

    this.CRITICAL = function (data) {

      if (this.ENABLE == true) {

        console.log("%c Critical : " + data, "background: #333; color: red");

      }

    };

    this.NETWORK_LOG = function (data) {

      if (this.ENABLE == true) {

        console.log("%c Network view : " + data, "background: #333; color: #a7afaf");

      }

    };

  };

  //###############################################//###############################################
  //###############################################//###############################################
  // basic img creator
  window.loadImage = function (url, onload) {
    var img = new Image();
    img.crossOrigin = "anonymous";
    img.src = url;
    img.onload = function () {
      onload(img);
    };
    return img;
  };

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
    var s = document.createElement("script");
    s.onload = function () {

      SCRIPT.SCRIPT_ID++;
      console.log("Script id loaded : " + SCRIPT.SCRIPT_ID + " with src : " + this.src + ">>>>>>>>>" + this.src);

      var filename = this.src.substring(this.src.lastIndexOf("/") + 1, this.src.lastIndexOf("."));
      //console.log(filename)
      filename = filename.replace(".", "_");
      eval("try{SCRIPT.SINHRO_LOAD._" + filename + "(s)}catch(e){}");

    };
    s.setAttribute("src", src);
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
    this.on_maximum_value = function () {};
    this.on_minimum_value = function () {};
    this.UPDATE = function (STATUS_) {
      if (STATUS_ === undefined) {
        if (this.status == 0 && this.value_ < this.max) {
          this.value_ = this.value_ + this.step;
          if (this.value_ >= this.max) {
            this.value_ = this.max;
            this.status = 1;
            ROOT.on_maximum_value();
          }
          return this.value_;
        } else if (this.status == 1 && this.value_ > this.min) {
          this.value_ = this.value_ - this.step;
          if (this.value_ <= this.min) {
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

    SYS.DEBUG.WARNING("SYS : warning for procedure 'SYS.MATH.OSCILLATOR' Desciption : Replace object with string or number, min >> " + typeof min + " and max >>" + typeof max + " and step >>" + typeof step + " << must be string or number.");

  }

}

function SWITCHER() {

  var ROOT = this;
  ROOT.VALUE = 1;
  ROOT.GET = function () {
    ROOT.VALUE = ROOT.VALUE * -1;
    return ROOT.VALUE;

  };

}

var E = function (id) {
  return document.getElementById(id);
};

function RandomFloat(min, max) {
  highlightedNumber = Math.random() * (max - min) + min;
  return highlightedNumber;
}

// RANDOM INT FROM-TO
function randomIntFromTo(min, max) {

  if (typeof min === "object" || typeof max === "object") {

    SYS.DEBUG.WARNING("SYS : warning for procedure 'SYS.MATH.RANDOM_INT_FROM_TO' Desciption : Replace object with string , this >> " + typeof min + " and " + typeof min + " << must be string or number.");

  } else if (typeof min === "undefined" || typeof max === "undefined") {

    SYS.DEBUG.WARNING("SYS : warning for procedure 'SYS.MATH.RANDOM_INT_FROM_TO' Desciption : arguments (min, max) cant be undefined , this >> " + typeof min + " and " + typeof min + " << must be string or number.");

  } else {

    return Math.floor(Math.random() * (max - min + 1) + min);

  }

}

var QueryString = function () {
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
}
();

// AUDIO SYSTEM
App.audioSystem.Assets = {};

App.audioSystem.createVideoAsset = function (name_, path_) {

  var videoAudioAsset = {};

  videoAudioAsset.video = document.createElement("video");
  videoAudioAsset.video.setAttribute("src", "res/videos/" + path_);
  videoAudioAsset.video.controls = true;
  videoAudioAsset.video.autoplay = true;
  E("HOLDER_STREAMS").appendChild(videoAudioAsset.video);

  try {
    window.AudioContext = window.AudioContext || window.webkitAudioContext;
    videoAudioAsset.context = new AudioContext();
  } catch (e) {
    alert("Web Audio API is not supported in this browser");
  }

  videoAudioAsset.gainNode = videoAudioAsset.context.createGain();
  videoAudioAsset.gainNode.gain.value = 1; // Change Gain Value to test
  videoAudioAsset.filter = videoAudioAsset.context.createBiquadFilter();
  videoAudioAsset.filter.type = 2; // Change Filter type to test
  videoAudioAsset.filter.frequency.value = 5040; // Change frequency to test

  if (typeof name_ !== "undefined" && typeof name_ === "string") {

    eval("App.audioSystem.Assets." + name_ + " = videoAudioAsset;");

  } else {

    eval("App.audioSystem.Assets." + "audioObject" + randomIntFromTo(1, 100) * randomIntFromTo(1000, 10000) + " = videoAudioAsset;");

  }

};

// ONLOAD
window.addEventListener("load", function (e) {

  App.ready = true;
  App.onload(e);

}, false);

// Class
function _glBlend() {

  var root_glblend = this;

  this.blendEnabled = false;
  this.blendParamSrc = "ONE";
  this.blendParamDest = "ONE";
  this.depthParam = "NOTEQUAL";

  this.setBothBlendParam = function (param_) {

    root_glblend.blendParamSrc = param_;
    root_glblend.blendParamDest = param_;

  };

}

function _DrawElements(numberOfItemsIndices) {

  this.mode = "TRIANGLES";
  this.modes = ["POINTS", "LINE_STRIP", "LINE_LOOP", "LINES", "TRIANGLE_STRIP", "TRIANGLE_FAN", "TRIANGLES"];
  this.type = ["UNSIGNED_BYTE", "UNSIGNED_SHORT", "UNSIGNED_INT"];
  this.indices = "GL_ELEMENT_ARRAY_BUFFER";
  this.numberOfIndicesRender = numberOfItemsIndices; //mesh_.indexBuffer.numItems

}

function _glTexParameteri(_target, _pname, _param) {

  var ROOT = this;

  if (typeof _target == "undefined") {
    this.target = "TEXTURE_2D";
  } else {
    this.target = _target;
  }

  if (typeof _pname == "undefined" || typeof _param == "undefined") {
    this.pname = "TEXTURE_MAG_FILTER";
    this.param = "LINEAR";
  } else {
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

    "target": {
      GL_TEXTURE_2D: "GL_TEXTURE_2D",
      GL_TEXTURE_3D: "GL_TEXTURE_3D",
      GL_TEXTURE_2D_ARRAY: "GL_TEXTURE_2D_ARRAY",
      GL_TEXTURE_CUBE_MAP: "GL_TEXTURE_CUBE_MAP"
    },
    "pname": {

      GL_TEXTURE_BASE_LEVEL: "TEXTURE_BASE_LEVEL",
      GL_TEXTURE_COMPARE_FUNC: "TEXTURE_COMPARE_FUNC",
      GL_TEXTURE_COMPARE_MODE: "TEXTURE_COMPARE_MODE",
      GL_TEXTURE_MIN_FILTER: "TEXTURE_MIN_FILTER",
      GL_TEXTURE_MAG_FILTER: "TEXTURE_MAG_FILTER",
      GL_TEXTURE_MIN_LOD: "TEXTURE_MIN_LOD",
      GL_TEXTURE_MAX_LOD: "TEXTURE_MAX_LOD",
      GL_TEXTURE_MAX_LEVEL: "TEXTURE_MAX_LEVEL",
      GL_TEXTURE_SWIZZLE_R: "TEXTURE_SWIZZLE_R",
      GL_TEXTURE_SWIZZLE_G: "TEXTURE_SWIZZLE_G",
      GL_TEXTURE_SWIZZLE_B: "TEXTURE_SWIZZLE_B",
      GL_TEXTURE_SWIZZLE_A: "TEXTURE_SWIZZLE_A",
      GL_TEXTURE_WRAP_S: "TEXTURE_WRAP_S",
      GL_TEXTURE_WRAP_T: "TEXTURE_WRAP_T",
      GL_TEXTURE_WRAP_R: "TEXTURE_WRAP_R",

    },
    "param": {

      BASE_LEVEL: "",
      COMPARE_FUNC: "",
      COMPARE_MODE: "",
      MIN_FILTER: "",
      MAG_FILTER: {
        NEAREST: "NEAREST",
        LINEAR: "LINEAR"
      },
      MIN_LOD: "",
      MAX_LOD: "",
      MAX_LEVEL: "",
      SWIZZLE_R: {
        RED: "RED",
        GREEN: "GREEN",
        BLUE: "BLUE",
        ALPHA: "ALPHA",
        ZERO: "ZERO",
        ONE: "ONE"
      },
      SWIZZLE_G: {
        RED: "RED",
        GREEN: "GREEN",
        BLUE: "BLUE",
        ALPHA: "ALPHA",
        ZERO: "ZERO",
        ONE: "ONE"
      },
      SWIZZLE_B: {
        RED: "RED",
        GREEN: "GREEN",
        BLUE: "BLUE",
        ALPHA: "ALPHA",
        ZERO: "ZERO",
        ONE: "ONE"
      },
      SWIZZLE_A: {
        RED: "RED",
        GREEN: "GREEN",
        BLUE: "BLUE",
        ALPHA: "ALPHA",
        ZERO: "ZERO",
        ONE: "ONE"
      },
      WRAP_S: {
        CLAMP_TO_EDGE: "CLAMP_TO_EDGE",
        MIRRORED_REPEAT: "MIRRORED_REPEAT",
        GL_REPEAT: "GL_REPEAT"
      },
      WRAP_T: {
        CLAMP_TO_EDGE: "CLAMP_TO_EDGE",
        MIRRORED_REPEAT: "MIRRORED_REPEAT",
        GL_REPEAT: "GL_REPEAT"
      },
      WRAP_R: {
        CLAMP_TO_EDGE: "CLAMP_TO_EDGE",
        MIRRORED_REPEAT: "MIRRORED_REPEAT",
        GL_REPEAT: "GL_REPEAT"
      },

    },

  },

  glDrawElements: {

    help: function () {

      SYS.DEBUG.WARNING("C specification: void glDrawElements(  GLenum mode , GLsizei count , GLenum type , const GLvoid * indices ); ");
      SYS.DEBUG.WARNING(">>>mode can be : 'POINTS' , 'LINE_STRIP', 'LINE_LOOP', 'LINES', 'TRIANGLE_STRIP', 'TRIANGLE_FAN' , 'TRIANGLES' ");
      SYS.DEBUG.WARNING(">>>count    : Specifies the number of elements to be rendered.");
      SYS.DEBUG.WARNING(">>>type    : 'UNSIGNED_BYTE' , 'UNSIGNED_SHORT' , 'UNSIGNED_INT' ");

    },

    mode: ["POINTS", "LINE_STRIP", "LINE_LOOP", "LINES", "TRIANGLE_STRIP", "TRIANGLE_FAN", "TRIANGLES"],
    type: ["UNSIGNED_BYTE", "UNSIGNED_SHORT", "UNSIGNED_INT"],
    indices: "GL_ELEMENT_ARRAY_BUFFER",

  },

  glBlend: {
    param: [
      "ZERO", "ONE",
      "SRC_COLOR", "DST_COLOR",
      "ONE_MINUS_SRC_COLOR", "ONE_MINUS_DST_COLOR",
      "SRC_ALPHA", "DST_ALPHA",
      "ONE_MINUS_SRC_ALPHA", "ONE_MINUS_DST_ALPHA",
      "SRC_ALPHA_SATURATE",
    ],
  },

  glDepth: {

    param: ["NEVER", "ALWAYS",
      "LESS", "GREATER",
      "EQUAL", "LEQUAL", "NOTEQUAL", "GEQUAL"],

    returnParam: {

      "NEVER": function () {
        return "NEVER";
      },
      "ALWAYS": function () {
        return "ALWAYS";
      },
      "LESS": function () {
        return "LESS";
      },
      "GREATER": function () {
        return "GREATER";
      },
      "EQUAL": function () {
        return "EQUAL";
      },
      "LEQUAL": function () {
        return "LEQUAL";
      },
      "NOTEQUAL": function () {
        return "NOTEQUAL";
      },
      "GEQUAL": function () {
        return "GEQUAL";
      }

    },

  },

  getTexParameter: function () {

    SYS.DEBUG.LOG(" TEXTURE_IMMUTABLE_FORMAT VALUE : " + world.GL.gl.getTexParameter(world.GL.gl.TEXTURE_2D, world.GL.gl.TEXTURE_IMMUTABLE_FORMAT));

  },

};
