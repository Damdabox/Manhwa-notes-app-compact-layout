// This app has no build step and no versioned filenames, so there is no
// "cache-busting" happening anywhere else. On iOS, an installed home-screen
// app has no reload button and no address bar, so nothing ever prompts it to
// re-check the network - it will happily replay old files forever. This
// service worker exists purely to force that re-check: every GET request
// goes to the network first (bypassing the OS/browser HTTP cache with
// `cache: 'no-store'`), and the cache below is only a fallback for when the
// device is offline. There is no long-term "keep serving old files" cache
// to go stale, so there's nothing to bump per release.
const CACHE_NAME = 'manhwa-notes-offline-fallback';

self.addEventListener('install', event => {
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;

  event.respondWith(
    fetch(event.request, { cache: 'no-store' })
      .then(response => {
        const responseCopy = response.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(event.request, responseCopy));
        return response;
      })
      .catch(() => caches.match(event.request))
  );
});
