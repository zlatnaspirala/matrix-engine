/* eslint-disable no-unused-vars */
/* globals LOG App NOMOBILE keyboardPress printLog degToRad mat4 */
import App from "../program/manifest";
import {LOG} from "./utility";

export var SYS = new Object();

// export var keyboardPress = {};
SYS.MOUSE = {
  x: 0,
  y: 0,
  LAST_POSITION: {
    x: 0,
    y: 0,
  },
  PRESS: false,
  BUTTON_PRESSED: "",
  ON_LEFT_BTN_PRESSED: function () {},
  ON_RIGHT_BTN_PRESSED: function () {},
  MOUSE_MOVING: false,
};

SYS.DEBUG = new LOG();

export function EVENTS(canvas) {
  var ROOT_EVENTS = this;

  //Mobile device
  if (NOMOBILE == 0) {
    canvas.addEventListener(
      "touchstart",
      function (e) {
        e.preventDefault();

        var touchList = e.changedTouches;

        SYS.MOUSE.PRESS = true;

        SYS.MOUSE.x = touchList[0].pageX;
        SYS.MOUSE.y = touchList[0].pageY;

        ROOT_EVENTS.CALCULATE_TOUCH_OR_CLICK();
      },
      {passive: true}
    );

    canvas.addEventListener(
      "touchend",
      function (e) {
        e.preventDefault();
        var touchList = e.changedTouches;

        SYS.MOUSE.PRESS = false;
        SYS.MOUSE.x = touchList[0].pageX;
        SYS.MOUSE.y = touchList[0].pageY;

        ROOT_EVENTS.CALCULATE_TOUCH_UP_OR_MOUSE_UP();
      },
      {passive: true}
    );

    canvas.addEventListener(
      "touchcancel",
      function (e) {
        e.preventDefault();
        var touchList = e.changedTouches;
        SYS.MOUSE.PRESS = false;
        SYS.MOUSE.x = touchList[0].pageX;
        SYS.MOUSE.y = touchList[0].pageY;

        ROOT_EVENTS.CALCULATE_TOUCH_UP_OR_MOUSE_UP();
      },
      {passive: true}
    );

    canvas.addEventListener(
      "touchmove",
      function (e) {
        e.preventDefault();
        var touchList = e.changedTouches;
        //SYS.MOUSE.MOUSE_MOVING = true;
        //SYS.MOUSE.PRESS = true;
        SYS.MOUSE.x = touchList[0].pageX;
        SYS.MOUSE.y = touchList[0].pageY;

        ROOT_EVENTS.CALCULATE_TOUCH_MOVE_OR_MOUSE_MOVE();
      },
      {passive: true}
    );
  } else {
    //Desktop device
    canvas.addEventListener(
      "click",
      function (e) {
        //SYS.MOUSE.PRESS = true;
        SYS.MOUSE.x = e.layerX;
        SYS.MOUSE.y = e.layerY;
        ROOT_EVENTS.CALCULATE_TOUCH_OR_CLICK();
        SYS.DEBUG.LOG("SYS : CLICK EVENT " + canvas);
      },
      {passive: true}
    );

    canvas.addEventListener(
      "mouseup",
      function (e) {
        SYS.MOUSE.PRESS = false;
        SYS.MOUSE.BUTTON_PRESSED = null;
        SYS.MOUSE.x = e.layerX;
        SYS.MOUSE.y = e.layerY;
        ROOT_EVENTS.CALCULATE_TOUCH_UP_OR_MOUSE_UP();
      },
      {passive: true}
    );

    canvas.onmousemove = function (e) {
      SYS.MOUSE.MOUSE_MOVING = true;
      SYS.MOUSE.x = e.layerX;
      SYS.MOUSE.y = e.layerY;
      ROOT_EVENTS.CALCULATE_TOUCH_MOVE_OR_MOUSE_MOVE(e);
    };

    canvas.onmousedown = function (e) {
      SYS.MOUSE.PRESS = true;

      if (e.which == 3) {
        SYS.MOUSE.BUTTON_PRESSED = "RIGHT";
        SYS.MOUSE.ON_RIGHT_BTN_PRESSED();
        SYS.DEBUG.LOG("Right button clicked");
      } else if (e.which == 2) {
        SYS.MOUSE.BUTTON_PRESSED = "MID";
        SYS.MOUSE.ON_MID_BTN_PRESSED();
        SYS.DEBUG.LOG("Mid button clicked");
      } else if (e.which == 1) {
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
  this.CALCULATE_TOUCH_OR_CLICK = function () {
    SYS.DEBUG.LOG(" EVENT : MOUSE/TOUCH CLICK ");
  };

  // CALCULATE MOUSE MOVE OR TOUCH MOVE
  this.CALCULATE_TOUCH_MOVE_OR_MOUSE_MOVE = function (e) {
    var center_x = window.innerWidth / 2;
    var center_y = window.innerHeight / 2;

    SYS.MOUSE.x = e.layerX - center_x;
    SYS.MOUSE.y = e.layerY - center_y;

    //check to make sure there is data to compare against
    if (typeof SYS.MOUSE.LAST_POSITION.x != "undefined") {
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
    (SYS.MOUSE.LAST_POSITION.x = SYS.MOUSE.x),
      (SYS.MOUSE.LAST_POSITION.y = SYS.MOUSE.y);

    if (SYS.MOUSE.x < App.camera.edgeMarginValue - center_x) {
      App.camera.leftEdge = true;
      //SYS.DEBUG.LOG(" mouse on edge ! ");
    } else {
      App.camera.leftEdge = false;
    }

    if (SYS.MOUSE.x > center_x - App.camera.edgeMarginValue) {
      App.camera.rightEdge = true;
      //SYS.DEBUG.LOG(" mouse on edge ! ");
    } else {
      App.camera.rightEdge = false;
    }

    //SYS.DEBUG.LOG(" EVENT : MOUSE/TOUCH MOVE ");
  };

  // CALCULATE_TOUCH_UP_OR_MOUSE_UP
  this.CALCULATE_TOUCH_UP_OR_MOUSE_UP = function () {
    SYS.DEBUG.LOG(" EVENT : MOUSE/TOUCH UP ");
  };

  this.CALCULATE_TOUCH_DOWN_OR_MOUSE_DOWN = function () {
    SYS.DEBUG.LOG(" EVENT : MOUSE/TOUCH DOWN ");
  };
}

export function defineKeyBoardObject() {
  var globKeyPressObj = new Object();

  /* Constructor for the global mouse location     */
  globKeyPressObj.keyArr = new Array();

  document.onkeydown = function (e) {
    globKeyPressObj.handleKeyDown(e);
  };
  document.onkeyup = function (e) {
    globKeyPressObj.handleKeyUp(e);
  };

  /* Getter for a key status                       */
  globKeyPressObj.getKeyStatus = function (keyCode) {
    return this.keyArr[keyCode];
  };

  /* Setter for a key status                       */
  globKeyPressObj.setKeyStatus = function (keyCode, status) {
    this.keyArr[keyCode] = status;
  };

  /* Key Down and Up handlers                      */
  globKeyPressObj.handleKeyDown = function (evt) {
    evt = evt ? evt : window.event ? window.event : "";
    this.setKeyStatus(evt.keyCode, true);
  };

  globKeyPressObj.handleKeyUp = function (evt) {
    evt = evt ? evt : window.event ? window.event : "";
    this.setKeyStatus(evt.keyCode, false);
  };

  /* Destructor                                    */
  globKeyPressObj.destroy = function () {
    printLog("    Destroy Key Press object");
    document.onkeydown = null;
    document.onkeyup = null;
    delete this.keyArr;
    delete this;
  };

  return globKeyPressObj;
}

export var camera = new Object();

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

// eslint-disable-next-line no-global-assign
export var keyboardPress = defineKeyBoardObject();

camera.setCamera = function (object) {
  /* Left Key  or A                            */
  if (
    keyboardPress.getKeyStatus(37) ||
    keyboardPress.getKeyStatus(65) ||
    App.camera.leftEdge == true
  ) {
    camera.yawRate = 20;
    if (App.camera.leftEdge == true) camera.yawRate = 10;
  } else if (
    /* Right Key or D                            */
    keyboardPress.getKeyStatus(39) ||
    keyboardPress.getKeyStatus(68) ||
    App.camera.rightEdge == true
  ) {
    camera.yawRate = -20;
    if (App.camera.rightEdge == true) camera.yawRate = -10;
  } else {
    // camera.yawRate = 0;
  }

  /* Up Key    or W                            */
  if (keyboardPress.getKeyStatus(38) || keyboardPress.getKeyStatus(87)) {
    camera.speed = 0.03;
  } else if (keyboardPress.getKeyStatus(40) || keyboardPress.getKeyStatus(83)) {
    /* Down Key  or S                            */
    camera.speed = -0.03;
  } else {
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

  mat4.rotate(
    object.mvMatrix,
    object.mvMatrix,
    degToRad(-camera.pitch),
    [1, 0, 0]
  );
  mat4.rotate(
    object.mvMatrix,
    object.mvMatrix,
    degToRad(-camera.yaw),
    [0, 1, 0]
  );

  // mat4.translate(object.mvMatrix, object.mvMatrix, [camera.yaw, -camera.pitch, 0]);
  mat4.translate(object.mvMatrix, object.mvMatrix, [
    -camera.xPos,
    -camera.yPos,
    -camera.zPos,
  ]);

  camera.yawRate = 0;
  camera.pitchRate = 0;
};

if (App.pwa.addToHomePage === true) {
  /**
   * @description
   */
  let deferredPrompt;
  const addBtn = document.querySelector(".button1");
  const regularBtn = document.querySelector(".button2");
  // addBtn.style.display = 'none';

  window.addEventListener("beforeinstallprompt", e => {
    // Prevent Chrome 67 and earlier from automatically showing the prompt
    e.preventDefault();
    // Stash the event so it can be triggered later.
    deferredPrompt = e;

    regularBtn.addEventListener("click", () => {
      addBtn.style.display = "none";
      regularBtn.style.display = "none";
    });

    // Update UI to notify the user they can add to home screen
    addBtn.style.display = "block";
    addBtn.addEventListener("click", () => {
      // hide our user interface that shows our A2HS button
      addBtn.style.display = "none";
      // Show the prompt
      deferredPrompt.prompt();
      // Wait for the user to respond to the prompt
      deferredPrompt.userChoice.then(choiceResult => {
        if (choiceResult.outcome === "accepted") {
          console.log("User accepted the A2HS prompt");
        } else {
          console.log("User dismissed the A2HS prompt");
        }
        deferredPrompt = null;
      });
    });
  });
}
