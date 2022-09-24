
/**
 * @description
 * MatrixNet - Main networking class
 * for matrix-engine workplace.
 */
const ServerConfig = require("./server-config.js");
const serverConfig = new ServerConfig();

var Broadcaster = require("./broadcaster");
broadcaster = new Broadcaster(serverConfig);
