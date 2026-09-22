const CACHE_NAME = 'sniffnsnooz-cache-v2';

self.addEventListener('install', (event) => {
  // Force the new service worker to become the active service worker immediately.
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  // Take control of all open pages immediately without waiting for a reload.
  event.waitUntil(
    self.clients.claim().then(() => {
      // Clear old caches if necessary
      return caches.keys().then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== CACHE_NAME) {
              return caches.delete(cacheName);
            }
          })
        );
      });
    })
  );
});


