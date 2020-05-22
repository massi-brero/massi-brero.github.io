importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js');

let cacheName = "pwa-mb";
let filesToCache = [
  "./",
  "./index.html",
  "./css/styles.css",
  "./app.js",
  "/charts/pie_chart.jpg",
];

/* Start the service worker and cache all of the app's content */
self.addEventListener("install", function (e) {
  e.waitUntil(
    caches.open(cacheName).then(function (cache) {
      return cache.addAll(filesToCache);
    })
  );
});

/* Serve cached content when offline */
self.addEventListener("fetch", function (e) {
  e.respondWith(
    caches.match(e.request).then(function (response) {
      return response || fetch(e.request);
    })
  );
});

workbox.routing.registerRoute(
    /\.(?:html|js|css)$/,
    new workbox.strategies.StaleWhileRevalidate({
      cacheName: 'static-resources'
    })
);
