const CACHE_NAME = "sw-cache-example";
const toCache = ["/", "/index.html"];
self.addEventListener("install", function (event) {
  console.log("used to register the service worker");
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then(function (cache) {
        return cache.addAll(toCache);
      })
      .then(self.skipWaiting())
  );
});

self.addEventListener("fetch", function (event) {
    event.respondWith(
        fetch(event.request)
          .catch(() => {
            return caches.open(CACHE_NAME)
              .then((cache) => {
                return cache.match(event.request)
              })
          })
      )
});

self.addEventListener("activate", function (event) {
  console.log("this event triggers when the service worker activates");
});
