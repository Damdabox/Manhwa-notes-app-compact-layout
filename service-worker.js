// This app has no build step and no versioned filenames, so there is no
// "cache-busting" happening anywhere else. On iOS, an installed home-screen
// app has no reload button and no address bar, so nothing ever prompts it to
// re-check the network - it will happily replay old files forever. This
// service worker exists purely to force that re-check: every GET request
// goes to the network first (bypassing the OS/browser HTTP cache with
// `cache: 'no-store'`), and the cache below is only a fallback for when the
// device is offline. There is no long-term "keep serving old files" cache
// to go stale, so there's nothing to bump per release.
const CACHE_NAME = 'manhwa-notes-offline-fallback-v2';

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
  // Supabase data must always come fresh from the server, so leave those
  // requests entirely to the browser - a network failure should surface as
  // a real error, not a replayed old response.
  const url = new URL(event.request.url);
  if (url.hostname.endsWith('.supabase.co')) return;

  event.respondWith(
    fetch(event.request, { cache: 'no-store' })
      .then(response => {
        // Only keep successful responses for this app's own files (plus the
        // static Supabase library script from jsdelivr, so the app can still
        // open offline) - never other third-party responses or errors.
        const isCacheableOrigin =
          url.origin === self.location.origin || url.hostname === 'cdn.jsdelivr.net';
        if (response.ok && isCacheableOrigin) {
          const responseCopy = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, responseCopy));
        }
        return response;
      })
      .catch(() => caches.match(event.request))
  );
});
