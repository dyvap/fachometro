const CACHE_NAME = 'fachometro-v1';
const urlsToCache = [
  '/fachometro/',
  '/fachometro/index.html',
  '/fachometro/manifest.json',
  '/fachometro/assets/index-BqC7zz0i.js',   // Asegúrate de usar los nombres correctos de tus archivos
  '/fachometro/assets/index-B6vGBxOe.css'   // Asegúrate de usar los nombres correctos de tus archivos
];

// Instalación del SW
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Cache opened');
        return cache.addAll(urlsToCache);
      })
  );
});

// Estrategia de cache: Network First, fallback to cache
self.addEventListener('fetch', event => {
  event.respondWith(
    fetch(event.request)
      .then(response => {
        // Si la respuesta es válida, la guardamos en cache
        if (response && response.status === 200) {
          const responseClone = response.clone();
          caches.open(CACHE_NAME).then(cache => {
            cache.put(event.request, responseClone);
          });
        }
        return response;
      })
      .catch(() => {
        // Si falla la red, intentamos recuperar de cache
        return caches.match(event.request);
      })
  );
});

// Limpieza de caches antiguas
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});