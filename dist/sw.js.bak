const CACHE_NAME = 'fachometro-v2';
const urlsToCache = [
  '/fachometro/',
  '/fachometro/index.html',
  '/fachometro/manifest.json',
  '/fachometro/assets/index-BqC7zz0i.js',   // Asegúrate de actualizar estos nombres con cada nueva versión
  '/fachometro/assets/index-B6vGBxOe.css'   // Asegúrate de actualizar estos nombres con cada nueva versión
];

self.addEventListener('install', event => {
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
      // Asegúrate de que obtienes una respuesta válida.
      if (!response || response.status !== 200 || response.type !== 'basic') {
        return response;
      }

      const responseToCache = response.clone();

      caches.open(CACHE_NAME).then(cache => {
        cache.put(event.request, responseToCache);
      });

      return response;
    }).catch(error => {
      // Intenta recuperar el archivo desde la caché si la red falla.
      return caches.match(event.request).then(cachedResponse => {
        if (cachedResponse) {
          return cachedResponse;
        }
        throw error;  // Lanza el error si no hay nada en caché y la red falla.
      });
    })
  );
});

self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];

  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
