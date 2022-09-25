
import ClientConfig from "../client-config.js";
import {byId, createAppEvent, htmlHeader} from "./utility";
import "./rtc-multi-connection/FileBufferReader.js";
import {getHTMLMediaElement} from "./rtc-multi-connection/getHTMLMediaElement";
import * as RTCMultiConnection3 from "./rtc-multi-connection/RTCMultiConnection3";
import * as io from "./rtc-multi-connection/socket.io";
import App from "../program/manifest.js";

export class Broadcaster {

  constructor(config) {

    this.injector;
    this.openOrJoinBtn;
    this.connection;

    this.engineConfig;
    this.popupUI = null;
    this.broadcasterUI = null;
    this.titleStatusthis = null;
    this.openRoomBtnthis = null;
    this.joinRoomBtnthis = null;
    this.leaveRoomBtnthis = null;
    this.shareFileBtnthis = null;
    this.inputChatthis = null;
    this.inputRoomIdthis = null;
    this.openDataSession = () => {};

    this.multiPlayerRef = {
      root: this,
      init(rtcEvent) {
        console.log("rtcEvent add new net object -> ", rtcEvent.userid);
      },
      update(multiplayer) {
        if(multiplayer.data.netPos) {
          console.log('INFO ZA UPDATE', multiplayer)
          App.scene[multiplayer.data.netObjId].position.SetX(multiplayer.data.netPos.x, 'noemit')
          if(multiplayer.data.netDir) {
          }

        } else if(multiplayer.data.noMoreLives === true) {}

      },

      /**
       * If someone leaves all client actions is here
       * - remove from scene
       * - clear object from netObject_x
       */
      leaveGamePlay(rtcEvent) {
        console.info("rtcEvent LEAVE GAME: ", rtcEvent.userid);
      }
    };

    (window).io = io;

    this.engineConfig = config;
    if(this.engineConfig.getRunBroadcasterOnInt()) {
      this.runBroadcaster();
    }
  }

  closeAllPeers() {
    this.connection.close();
  }

  openRoomBtnVisible = (visible) => {
    if(visible === true) {
      byId("open-room").classList.remove("hide");
    } else {
      byId("open-room").classList.add("hide");
    }
  };

  activateDataStream() {
    this.injector = this.multiPlayerRef;
    setTimeout(() => {
      this.openOrJoinBtn.click();
    }, 1000);
  }

  initDOM() {
    this.broadcasterUI = byId("matrix-net");
    this.titleStatus = byId("rtc3log");
    this.openRoomBtn = byId("open-room");
    this.joinRoomBtn = byId("join-room");
    this.openOrJoinBtn = byId("open-or-join-room");
    this.leaveRoomBtn = byId("btn-leave-room");
    this.shareFileBtn = byId("share-file");
    this.inputChat = byId("input-text-chat");
    this.inputRoomId = byId("room-id");

    this.openRoomBtnVisible(true);
  }

  streamLoaded(userId, streamAccess) {
    const broadcasterStreamLoaded = createAppEvent("stream-loaded", {
      streamId: streamAccess,
      userId,
    });
    (window).dispatchEvent(broadcasterStreamLoaded);
    return streamAccess;
  }

  initWebRtc = (options) => {
    const root = this;

    try {
      this.connection = new (RTCMultiConnection3)();
    } catch(err) {
      this.connection = new (RTCMultiConnection3).default();
    }

    this.connection.socketURL = root.engineConfig.getBroadcastSockRoute();
    this.connection.socketMessageEvent = "audio-video-file-chat-demo";

    if(typeof options !== "undefined") {
      // by default, it is "false".
      this.connection.enableFileSharing = options.enableFileSharing;

      this.connection.session = {
        audio: options.session.audio,
        video: options.session.video,
        data: options.session.data,
      };
    } else {
      this.connection.enableFileSharing = root.engineConfig.getBroadcasterSessionDefaults().enableFileSharing;

      this.connection.session = {
        audio: root.engineConfig.getBroadcasterSessionDefaults().sessionAudio,
        video: root.engineConfig.getBroadcasterSessionDefaults().sessionVideo,
        data: root.engineConfig.getBroadcasterSessionDefaults().sessionData,
      };
    }

    this.connection.sdpConstraints.mandatory = {
      OfferToReceiveAudio: true,
      OfferToReceiveVideo: true,
    };

    this.connection.iceServers = [
      {
        urls: root.engineConfig.getStunList(),
      },
    ];

    this.connection.videosContainer = document.getElementById(
      "videos-container"
    );

    this.connection.videosContainer.setAttribute(
      "style",
      "position:absolute;left:0;bottom:20%;width:320px;height:auto;"
    );

    this.connection.onstream = function(event) {
      event.mediaElement.removeAttribute("src");
      event.mediaElement.removeAttribute("srcObject");
      const video = document.createElement("video");
      video.controls = true;
      if(event.type === "local") {
        video.muted = true;
      }
      video.srcObject = event.stream;

      const localNumberCW = root.connection.videosContainer.clientWidth;
      const width = parseInt(localNumberCW.toString(), 10);

      const mediaElement = getHTMLMediaElement(video, {
        title: event.userid,
        buttons: ["full-screen"],
        width,
        showOnMouseEnter: false,
      });

      root.connection.videosContainer.appendChild(mediaElement);

      setTimeout(function() {
        (mediaElement).media.play();
      }, 2000);

      mediaElement.id = event.streamid;
      root.streamLoaded(event.userid, event.streamid);
    };

    this.connection.onstreamended = function(event) {
      const mediaElement = document.getElementById(event.streamid);
      if(mediaElement) {
        mediaElement.parentNode.removeChild(mediaElement);
      }
    };

    this.connection.onmessage = root.appendDIV;
    this.connection.filesContainer = document.getElementById("file-container");

    this.connection.onopen = function(event) {
      (root.shareFileBtn).disabled = false;
      (root.inputChat).disabled = false;
      (root.leaveRoomBtn).disabled = false;

      if(root.injector) {
        root.injector.init(event);
      }

      console.info(
        "You are connected with: " +
        root.connection.getAllParticipants().join(", ")
      );
      (document.querySelector("#rtc3log")).innerHTML =
        "You are connected with: " +
        root.connection.getAllParticipants().join(", ");
    };

    this.connection.onclose = function(dataStreamEvent) {
      root.injector.leaveGamePlay(dataStreamEvent);

      if(root.connection.getAllParticipants().length) {
        (document.querySelector("#rtc3log")).value =
          "You are still connected with:" +
          root.connection.getAllParticipants().join(", ");
      } else {
        (document.querySelector("#rtc3log")).value =
          "Seems session has been closed or all participants left.";
      }
    };

    this.connection.onUserStatusChanged = function(event) {
      if(event.status === "offline") {
        root.injector.leaveGamePlay(event);
      }
    };

    this.connection.onEntireSessionClosed = function(event) {
      (root.shareFileBtn).disabled = true;
      (root.inputChat).disabled = true;
      (root.leaveRoomBtn).disabled = true;
      (root.openOrJoinBtn).disabled = false;
      (root.openRoomBtn).disabled = false;
      (root.inputRoomId).disabled = false;
      (root.inputRoomId).disabled = false;

      root.connection.attachStreams.forEach(function(stream) {
        stream.stop();
      });

      // don't display alert for moderator
      if(root.connection.userid === event.userid) {
        return;
      }
      (document.querySelector("#rtc3log")).innerHTML =
        "Entire session has been closed by the moderator: " + event.userid;
    };

    this.connection.onUserIdAlreadyTaken = function(useridAlreadyTaken) {
      // seems room is already opened
      root.connection.join(useridAlreadyTaken);
    };

    this.postAttach();
  };

  showRoomURL(roomid) {
    console.info('B Entering in room: ', roomid);
    return;
  }

  disableInputButtons = () => {
    (this.openOrJoinBtn).disabled = true;
    (this.openRoomBtn).disabled = true;
    (this.inputRoomId).disabled = true;
    (this.inputRoomId).disabled = true;
    (this.leaveRoomBtn).disabled = false;
  };

  appendDIV = event => {
    if(event.data && event.data.netPos) {
      this.injector.update(event);
      return;
    }

    const div = document.createElement("div");
    div.innerHTML = event.data || event;
    div.setAttribute('style', 'width:90%;color:white;')
    const chatContainer = document.querySelector(
      ".chat-output"
    );
    chatContainer.insertBefore(div, chatContainer.firstChild);
    div.tabIndex = 0;
    div.focus();
    (document.getElementById("input-text-chat")).focus();
  };

  postAttach() {
    const root = this;
    // tslint:disable-next-line:no-var-keyword
    var roomid = "";
    if(localStorage.getItem(root.connection.socketMessageEvent)) {
      roomid = localStorage.getItem(root.connection.socketMessageEvent);
    } else {
      roomid = root.connection.token();
    }

    if(root.engineConfig.getMasterServerKey()) {
      roomid = root.engineConfig.getMasterServerKey();
    }

    (root.inputRoomId).value = roomid;
    (root.inputRoomId).onkeyup = function() {
      localStorage.setItem(
        root.connection.socketMessageEvent,
        (this).value
      );
    };

    let hashString = location.hash.replace("#", "");
    if(hashString.length && hashString.indexOf("comment-") === 0) {
      hashString = "";
    }

    roomid = (window).params.roomid;
    if(!roomid && hashString.length) {
      roomid = hashString;
    }

    if(roomid && roomid.length) {
      (root.inputRoomId).value = roomid;
      localStorage.setItem(root.connection.socketMessageEvent, roomid);

      // auto-join-room
      (function reCheckRoomPresence() {
        root.connection.checkPresence(roomid, function(isRoomExists) {
          if(isRoomExists) {
            root.connection.join(roomid);
            return;
          }

          setTimeout(reCheckRoomPresence, 5000);
        });
      })();

      root.disableInputButtons();
    }
  }

  attachEvents() {
    const root = this;
    (window).enableAdapter = true;

    // Hide on start
    root.broadcasterUI.classList.remove("network-panel-show-ver-animation");
    root.broadcasterUI.classList.add("network-panel-hide-ver-animation");

    // hide right box (broadcaster)
    root.titleStatus.onclick = function() {
      if(
        root.broadcasterUI.classList.contains(
          "network-panel-show-ver-animation"
        )
      ) {
        root.broadcasterUI.classList.remove("network-panel-show-ver-animation");
        root.broadcasterUI.classList.add("network-panel-hide-ver-animation");
      } else {
        root.broadcasterUI.classList.add("network-panel-show-ver-animation");
        root.broadcasterUI.classList.remove("network-panel-ver-hide-animation");
      }
    };

    root.openRoomBtn.onclick = function() {
      root.disableInputButtons();
      root.connection.open(
        (root.inputRoomId).value,
        function() {
          root.showRoomURL(root.connection.sessionid);
        }
      );
    };

    root.joinRoomBtn.onclick = function() {
      root.disableInputButtons();
      root.connection.join((root.inputRoomId).value);
    };

    root.openDataSession = function() {
      root.disableInputButtons();
      root.connection.openOrJoin(
        (root.inputRoomId).value,
        function(isRoomExists, roomid) {
          if(!isRoomExists) {
            root.showRoomURL(roomid);
          }
        }
      );
    };

    root.openOrJoinBtn.onclick = root.openDataSession;

    (root.leaveRoomBtn).onclick = function() {
      (this).disabled = true;

      if(root.connection.isInitiator) {
        // use this method if you did NOT set "autoCloseEntireSession===true"
        // for more info: https://github.com/muaz-khan/RTCMultiConnection#closeentiresession
        root.connection.closeEntireSession(function() {
          (document.querySelector("#rtc3log")).innerHTML =
            "Entire session has been closed.";
        });
      } else {
        root.connection.leave();
      }
    };

    // ................FileSharing/TextChat Code.............
    root.shareFileBtn.onclick = function() {
      const fileSelector = new (window).FileSelector();
      fileSelector.selectSingleFile(function(file) {
        root.connection.send(file);
      });
    };

    (root.inputChat).onkeyup = function(e) {
      // tslint:disable-next-line:triple-equals
      if(e.keyCode != 13) {
        return;
      }

      // removing trailing/leading whitespace
      (this).value = (this).value.replace(
        /^\s+|\s+$/g,
        ""
      );
      if(!(this).value.length) {
        return;
      }

      root.connection.send((this).value);
      root.appendDIV((this).value);
      (this).value = "";
    };

    // Handling Room-ID
    (function() {
      const params = {},
        r = /([^&=]+)=?([^&]*)/g;

      function d(s) {
        return decodeURIComponent(s.replace(/\+/g, " "));
      }
      // tslint:disable-next-line:prefer-const
      let match,
        search = window.location.search;
      // tslint:disable-next-line: no-conditional-assignment
      while((match = r.exec(search.substring(1)))) {
        params[d(match[1])] = d(match[2]);
      }
      (window).params = params;
    })();
  }

  runBroadcaster = () => {
    const myInstance = this;

    fetch("./broadcaster.html", {
      headers: htmlHeader,
    })
      .then(function(res) {
        return res.text();
      })
      .then(function(html) {
        myInstance.popupUI = byId("matrix-net");
        myInstance.popupUI.style = 'table';
        myInstance.popupUI.innerHTML = html;

        if(myInstance.engineConfig.getShowBroadcasterOnInt()) {
          myInstance.popupUI.style.display = "table";
        } else {
          myInstance.popupUI.style.display = "none";
        }

        myInstance.initDOM();
        myInstance.attachEvents();
        myInstance.initWebRtc();
        myInstance.inputRoomId.nodeValue = myInstance.engineConfig.getMasterServerKey();

        if(myInstance.engineConfig.getBroadcastAutoConnect()) {
          console.log("Try auto connect for broadcaster.");
          myInstance.openOrJoinBtn.click();
        }

      });
  };
}