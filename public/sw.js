const CACHE_NAME = 'fachometro-v4';  // Cambia esto con cada despliegue
const urlsToCache = [
  '/fachometro/',
  '/fachometro/index.html',
  '/fachometro/manifest.json',
  '/fachometro/assets/index-BJCfK2mm.js',  // Asegúrate de que los nombres de archivo son correctos
  '/fachometro/assets/index-DSBNLFtR.css'
];

self.addEventListener('install', event => {
  self.skipWaiting();  // Tomar control inmediatamente
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    fetch(event.request).then(response => {
      if (!response || response.status !== 200 || response.type !== 'basic') {
        return response;
      }
      const responseToCache = response.clone();
      caches.open(CACHE_NAME).then(cache => {
        cache.put(event.request, responseToCache);
      });
      return response;
    }).catch(() => {
      return caches.match(event.request);
    })
  );
});

self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.filter(cacheName => !cacheWhitelist.includes(cacheName))
          .map(cacheName => caches.delete(cacheName))
      );
    })
  );
});
