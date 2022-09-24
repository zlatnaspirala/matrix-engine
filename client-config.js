
/**
 * ClientConfig is config file for whole client part of application.
 * It is a better to not mix with server config staff.
 * All data is defined like default property values.
 * Use mmethod class to get proper.
 * Class don't have any args passed.
 */
class ClientConfig {

   /**
    * Addson - Role is : "no dependencies scripts only"
    * All addson are ansync loaded scripts.
    *  - hackerTimer is for better performace also based on webWorkers. Load this script on top.
    *  - Cache is based on webWorkers.
    *  - dragging is script for dragging dom elements taken from stackoverflow.com.
    *  - facebook addson is simple fb api implementation.
    *  - adapter is powerfull media/communication fixer(Objective : working on all moder browsers).
    */
  addson = [
    {
      name: "cache",
      enabled: false,
      scriptPath: "externals/cacheInit.ts",
    },
    {
      name: "hackerTimer",
      enabled: true,
      scriptPath: "externals/hack-timer.js",
    },
    {
      name: "adapter",
      enabled: true,
      scriptPath: "externals/adapter.js",
    },
  ];

  /**
   * @description This is main canvas dom
   * id. Program will handle missing this params.
   * It is nice to have id for main canvas dom element
   * to avoid coallision woth other possible programs
   * who use also canvas element.
   * IMPLEMENTATION [WIP]
   * @property canvasId
   * @type  string
   */
  canvasId = "vtsge";

  // Free to define what ever -> injectCanvas
  recordCanvasOption = {
    injectCanvas: () => document.getElementsByTagName("canvas")[0],
    frameRequestRate: 30,
    videoDuration: 20,
    outputFilename: "record-gameplay.mp4",
    mineType: "video/mp4",
    resolutions: '800x600'
  }

  /**
   * @description This is main coordinary types of positions
   * Can be "diametric-fullscreen" or "frame".
   *  - diametric-fullscreen is simple fullscreen canvas element.
   *  - frame keeps aspect ratio in any aspect.
   * @property drawReference
   * @type  string
   */
  drawReference = "frame";

  /**
   * aspectRatio default value, can be changed in run time.
   * This is 800x600, 1.78 is also good fit for lot of desktop monitors screens
   */
  aspectRatio = 1.333;

  /**
   * @description
   * Default setup is `dev`.
   * recommendent to use for local propose LAN ip
   * like : 192.168.0.XXX if you wanna run ant test app with server.
   */
  // domain = "maximumroulette.com";
  domain = "localhost";

  /**
   * @description Important note for this property: if you
   * disable (false) you can't use Account system or any other
   * network. Use 'false' if you wanna make single player game.
   * In other way keep it 'true'.
   */
  appUseNetwork = true;

  /**
   * networkDeepLogs control of dev logs for webRTC context only.
   */
  networkDeepLogs = false;

  /**
   * masterServerKey is channel access id used to connect
   * multimedia server channel.Both multiRTC2/3
   */
  masterServerKey = "maximumroulette.server1";

  /**
   * rtcServerPort Port used to connect multimedia server.
   * Default value is 12034
   */
  rtcServerPort = 12034;

  /**
   * @description
   * Enable Disable coordinator flag
   */
  appUseCoordinator = false;

  /**
   * @description
   * Coordinator rtc3 session init values.
   * Downgrade to data only.
   */
  coordinatorSessionDefaults = {
    sessionAudio: false,
    sessionVideo: false,
    sessionData: true,
    enableFileSharing: false,
  };

  /**
   * connectorPort is access port used to connect
   * session web socket.
   * Take high number for port to avoid
   * `code: 'EACCES', errno: -4092, syscall: 'listen'
   * for localhost usage.
   */
  connectorPort = 9010;

  /**
   * appUseAccountsSystem If you don't want to use session
   * in your application just setup this variable to the false.
   */
  appUseAccountsSystem = true;

  /**
   * appUseBroadcaster Disable or enable broadcaster for
   * video chats.
   */
  appUseBroadcaster = true;

  /**
   * @description
   * broadcasterPort Port used to connect multimedia server MultiRTC3.
   * I will use it for explicit video chat multiplatform support.
   * Default value is 9001
   */
  broadcasterPort = 9001;

  showBroadcasterOnInt = true;

  /**
   * @description
   * broadcaster socket.io address.
   * Change it for production regime
   */
  broadcastAutoConnect = false;

  /**
   * @description
   * runBroadcasterOnInt load broadcaster
   */
  runBroadcasterOnInt = true;

  /**
   * @description
   * broadcaster rtc session init values.
   * Change it for production regime
   */
  broadcasterSessionDefaults = {
    sessionAudio: true,
    sessionVideo: true,
    sessionData: true,
    enableFileSharing: true,
  };

  /**
   * @description
   * Optimal for dev stage.
   * read more about webRtc protocols.
   * Recommended: coturn open source project.
   */
  stunList = [
    "stun:stun.l.google.com:19302",
    "stun:stun1.l.google.com:19302",
    "stun:stun.l.google.com:19302?transport=udp",
  ];

  /**
   * @description
   * Possible variant by default:
   * "register", "login"
   */
  startUpHtmlForm = "register";

  controls = {
    platformerPlayerController: true,
    enableMobileControlsOnDesktop: true,
  };

  gameList = [];

  /**
   * @description
   * Implement default gamePlay variable's
   */
  defaultGamePlayLevelName = "public";
  autoStartGamePlay = false;

  /**
   * @description
   * constructor will save interest data for game platform
   * For now it is just name of the game. I use it in
   * pre gameplay UI game selector.
   */
  constructor(gameList = []) {

    // Interconnection Network.Connector vs app.ts
    this.gameList = gameList;

  }

  getRecordCanvasOptions() {
    return this.recordCanvasOption;
  }

  didAppUseCoordinator() {
    if (this.appUseBroadcaster === true) {
      console.warn("App already use broadcaster stream. Running double multiPeer connections is extreme situation.");
    }
    return this.appUseCoordinator;
  }

  getCoordinatorConfig() {
    return this.coordinatorSessionDefaults
  }

  getcontrols() {
    return this.controls;
  }

  getShowBroadcasterOnInt () {
    return this.showBroadcasterOnInt;
  }

  getRunBroadcasterOnInt() {
    return this.runBroadcasterOnInt;
  }

  getBroadcastAutoConnect() {
   return this.broadcastAutoConnect;
  }

  getAddson() {
    return this.addson;
  }

  getAutoStartGamePlay() {
    return this.autoStartGamePlay;
  }

  getGamesList() {
    return this.gameList;
  }

  getDefaultGamePlayLevelName() {
    return this.defaultGamePlayLevelName;
  }

  didAppUseNetwork() {
    return this.appUseNetwork;
  }

  didAppUseAccountsSystem() {
    return this.appUseAccountsSystem;
  }

  didAppUseBroadcast() {
    return this.appUseBroadcaster;
  }

  getStunList() {
    return this.stunList;
  }

  getBroadcastSockRoute() {
    return this.getProtocolFromAddressBar() +  this.getDomain() + ":" + this.broadcasterPort + "/";
  }

  getCoordinatorSockRoute() {
    return this.getProtocolFromAddressBar() +  this.getDomain() + ":" + this.rtcServerPort + "/";
  }

  getStartUpHtmlForm() {
    return this.startUpHtmlForm;
  }

  getDomain() {
    if (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1") {
      return window.location.hostname;
    }
    return this.domain;
  }

  getBroadcasterPort() {
    return this.broadcasterPort;
  }

  getBroadcasterSessionDefaults() {
    return this.broadcasterSessionDefaults;
  }

  getConnectorPort() {
    return this.connectorPort;
  }

  getDrawRefference() {
    return this.drawReference;
  }

  getAspectRatio() {
    return this.aspectRatio;
  }

  setAspectRatio(newAspectRatio) {
    this.aspectRatio = newAspectRatio;
  }

  getProtocolFromAddressBar() {
    return (location.protocol === "https:" ? "https://" : "http://");
  }

  getRemoteServerAddress() {
    return (location.protocol === "https:" ? "wss" : "ws") + "://" + document.domain + ":" + this.rtcServerPort + "/";
  }

  getRemoteServerAddressControlller() {
    return ( (location.protocol === "https:") ? "wss" : "ws") + "://" + document.domain + ":" + this.getConnectorPort() + "/";
  }

  setNetworkDeepLog(newState) {
    this.networkDeepLogs = newState;
  }

  getNetworkDeepLog() {
    return this.networkDeepLogs;
  }

  getMasterServerKey() {
    return this.masterServerKey;
  }

}
export default ClientConfig;
