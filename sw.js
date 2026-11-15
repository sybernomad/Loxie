// Loxie service worker: caches the game so it loads instantly and works offline.
// Bump CACHE_VERSION whenever you publish changes so players get the update.
const CACHE_VERSION = 'loxie-1.0.0'; // keep in step with APP_VERSION in index.html

const APP_SHELL = [
    './',
    './index.html',
    './valid-words.js',
    './manifest.webmanifest',
    './icons/icon-192.png',
    './icons/icon-512.png',
    './icons/icon-maskable-512.png',
    './icons/apple-touch-icon.png',
    './icons/favicon-32.png'
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_VERSION)
            .then((cache) => cache.addAll(APP_SHELL))
            .then(() => self.skipWaiting())
    );
});

self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys()
            .then((keys) => Promise.all(keys.filter((k) => k !== CACHE_VERSION).map((k) => caches.delete(k))))
            .then(() => self.clients.claim())
    );
});

self.addEventListener('fetch', (event) => {
    const req = event.request;
    if (req.method !== 'GET') return;

    const url = new URL(req.url);
    // Only handle our own files; the random-word API and other sites go straight to the network.
    if (url.origin !== self.location.origin) return;

    // Page loads (including ?seed= challenge links): network first so updates show up,
    // falling back to the cached game when offline.
    if (req.mode === 'navigate') {
        event.respondWith(
            fetch(req)
                .then((res) => {
                    const copy = res.clone();
                    caches.open(CACHE_VERSION).then((c) => c.put('./index.html', copy));
                    return res;
                })
                .catch(() => caches.match('./index.html'))
        );
        return;
    }

    // Everything else: serve from cache, refresh in the background.
    event.respondWith(
        caches.match(req, { ignoreSearch: true }).then((cached) => {
            const network = fetch(req)
                .then((res) => {
                    if (res && res.ok) {
                        const copy = res.clone();
                        caches.open(CACHE_VERSION).then((c) => c.put(req, copy));
                    }
                    return res;
                })
                .catch(() => cached);
            return cached || network;
        })
    );
});
