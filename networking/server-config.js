
export default class ServerConfig {

  constructor() {
    /**
     * Define backend staff
     * 
     * @version 1.0
     * Implementing signaling multiRTC3 for data streaming operation
     * no database server part - it will be used rocketcraftingserver platform.
     */
    this.version = "1.0";
    this.serverMode = "dev";
    this.networkDeepLogs = false;
    this.rtc3ServerPort = 999;

    /**
     * @description
     * Represent prop for many handling in aspect of 
     * what is actual ServerMode.
     * It's simple and nice solution, we never n
     */
    this.domain = {
      dev: "localhost",
      prod: "maximumroulette.com"
    };

    /**
     * @description
     * Represent Public Channel, webrtc session name.
     * Interest prop for manipulation.
     * This can be upgraded to the Object type.
     */
    this.masterServerKey = "matrix-engine.maximum";

    /**
     * @description
     * Strongly recommended https for local also for production
     */
    this.protocol = "https";

    this.isSecure = false;

    /**
     * @description
     * Just for help if needed if you wanna use pem.
     * No pem currently used at the moment.
     */
    this.certPathSelfOrigin = {
      pKeyPath: "./apache-local-cert/server.key",
      pCertPath: "./apache-local-cert/server.crt",
      pCBPath: "./apache-local-cert/server.csr",
    };

    /**
     * @description
     * Just for help if needed.
     */
    this.certPathSelf = {
      pKeyPath: "./apache-local-cert/server.key",
      pCertPath: "./apache-local-cert/server.crt",
      pCBPath: "./apache-local-cert/server.csr",
    };

    // production
    this.certPathProd = {
      pKeyPath: "/etc/letsencrypt/live/maximumroulette.com/privkey.pem",
      pCertPath: "/etc/letsencrypt/live/maximumroulette.com/cert.pem",
      pCBPath: "/etc/letsencrypt/live/maximumroulette.com/fullchain.pem"
    };

    this.appUseBroadcaster = true;
    console.log("Server running under configuration => ", this.serverMode);

    console.log("-rtc domain dev", this.domain.dev);

    var Reset = '\x1b[0m';
    console.log('\x1b[42m', 'Matrix Server params 🧪 ', Reset);
    console.log('\x1b[42m', "-rtc masterServerKey", this.masterServerKey, Reset);
    console.log('\x1b[42m', "-rtc rtcServerPort", this.rtcServerPort, Reset);
    console.log('\x1b[42m', "-rtc rtc3/broadcaster is enabled", this.appUseBroadcaster, Reset);
    console.log('\x1b[42m', "-rtc rtc3ServerPort", this.rtc3ServerPort, Reset);
    console.log('\x1b[42m', "-rtc protocol", this.protocol, Reset);
    console.log('\x1b[42m', "-rtc isSecure", this.isSecure, Reset);
  }

  /**
   * @returns {any}
   */
  get getAppUseBroadcaster() {
    return this.appUseBroadcaster;
  };

  get getProtocol() {
    this.protocol = "https";
    return this.protocol;
  }

  get getRtc3ServerPort() {
    return this.rtc3ServerPort;
  }

  set setNetworkDeepLog(newState) {
    this.networkDeepLogs = newState;
  }

  get getNetworkDeepLog() {
    return this.networkDeepLogs;
  }

  get getMasterServerKey() {
    return this.masterServerKey;
  }

}
// module.exports = ServerConfig;
