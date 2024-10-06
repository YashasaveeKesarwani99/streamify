/// <reference lib="webworker" />

// this service worker has been created for learning and for deployment purpose
// we'll be installing SW, listening to requests and activating the SW through this file.

// watch this for reference - https://www.youtube.com/watch?v=IaJqMcOMuDM

const CACHE_NAME = "Streamify-SW-Version-1"; // this is the name of the cache that will be created by this SW
const urlsToCache = ["index.html", "offline.html"]; // array of files that will be put inside the cache ( offline.html will have code for when user is offline )

const self = this; // storing the context of SW in 'self';

// * Installing SW;
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("Opened Cache");

      return cache.addAll(urlsToCache);
    })
  );
});

// * Listening to requests
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then(() => {
      return fetch(event.request).catch(() => caches.match("offline.html"));
    })
  );
});

// * Activate the SW
self.addEventListener("activate", (event) => {
  const cacheWhiteList = [];
  cacheWhiteList.push(CACHE_NAME);

  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhiteList.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      )
    )
  );
});
