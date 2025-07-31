/**
 * @description DEV Tool
 * Fill paths for config parts config.js & editor.js
 */

var fs = require("fs");

function WRITE(p, c) {
  return new Promise((resolve, reject) => {
    console.log("The build file p", p);
    console.log("The build file c ", c);
    fs.writeFile(p, c, function(err) {
      if(err) {
        console.log(err);
        reject(err);
      } else {
        resolve('WRITE_DONE');
        console.log("The build file was created DONE.");
      }
    });
  });
}

function READ(filePath) {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, {encoding: 'utf-8'}, function(err, data) {
      if(!err) {
        resolve(data);
      } else {
        reject(err);
        console.log("ERROR IN READ FILE: ", err);
      }
    });
  });
}

// Run
READ('./config.js').then((r) => {
  var tPath = __dirname;
  var path = tPath.replace(/\\/g,'/');
  path = path + "/"
  console.log("CONTENT :", r);
  r = r.replace('<PATH_OF_NODE_APP>', path);
  r = r.replace('<PATH_OF_WWW>', path);
  path = path + "/config.js";
  WRITE(path, r).then((r)=> {
    console.log(r)
  }).catch((err)=>{
    console.log('ERR:', err)
  });
})

READ('./editor.js').then((r) => {
  var tPath = __dirname;
  var path = tPath.replace(/\\/g,'/');
  path = path + "/"
  console.log("CONTENT :", r);
  r = r.replace('<PATH_OF_NODE_APP>', path);
  r = r.replace('<PATH_OF_WWW>', path);
  path = path + "/editor.js";
  WRITE(path, r).then((r)=> {
    console.log(r)
  }).catch((err)=>{
    console.log('ERR:', err)
  });
})