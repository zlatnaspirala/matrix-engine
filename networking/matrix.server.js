
/**
 * @description
 * MatrixNet - Main networking class
 * for matrix-engine workplace.
 */
const ServerConfig = require("./server-config.js");
const serverConfig = new ServerConfig();

var Broadcaster = require("./broadcaster");
broadcaster = new Broadcaster(serverConfig);

var Reset = '\x1b[0m';
console.log('\x1b[42m', 'Matrix Server running... 🤘 [Enjoy]', Reset);
