
'use strict';

var cacheVersion = 1;
var currentCache = {
  offline: 'offline-cache' + cacheVersion
};
const offlineUrl = 'offline.html';

self.addEventListener("install", function (event) {
  self.skipWaiting();
  event.waitUntil(
    caches.open("static-files-v1").then(function (cache) {
      return cache.addAll([
        offlineUrl,
        "App.js",
        "App-Examples.js",
        "lib/engine.js",
        "lib/events.js",
        "lib/loader-obj.js",
        "lib/matrix-buffers.js",
        "lib/matrix-draws.js",
        "lib/matrix-geometry.js",
        "lib/matrix-render.js",
        "lib/matrix-textures.js",
        "lib/matrix-world.js",
        "lib/utility.js",
        "lib/webgl-utils.js",
        "lib/gl-matrix-min.js",
        "css/style.css",
        "build.html",
        "query.html",
        "examples.html",
        "res/videos/Epiclogue.mp3"
      ]);
    })
  );
});

self.addEventListener("fetch", function (event) {

  // if (event.request.method === "POST") { return; }

  event.respondWith(
    caches.open("dynamic-content-v1").then(function (cache) {
      // check if the requested URL is inside the dynamic-content-v1
      return cache.match(event.request).then(function (response) {
        // when found, respond with it.
        // when not found: return it as it is after taking a clone
        // and storing it, so next visit to the URL it will be there
        return response || fetch(event.request).then(function (response) {
          cache.put(event.request, response.clone());
          return response;
        });
      });
    })
  );

});
