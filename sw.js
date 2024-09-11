;
//asignar un nombre y versión al cache
const N_CACHE = 'cache_analizadorSentimientos',
  urlsToCache = [
    './',
    './style.css',
    './script.js',
    './img/icon.png',
    './analizar.html',
    './index.html'
  ]

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(N_CACHE)
      .then(cache => {
        return cache.addAll(urlsToCache)
          .then(() => self.skipWaiting())
      })
      .catch(err => console.log('Cache registration failed', err))
  )
})

