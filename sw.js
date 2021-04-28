const cacheName = 'hello-pwa'
const filesToCache = [
    '/dist',
    '/dist/js',
    '/dist/js',
    '/dist/css'
]

/* Start the service worker and cache all of the app's content */
self.addEventListener('install', function (e) {
    e.waitUntil(
        caches.open(cacheName).then(function (cache) {
            console.log({cache})
            return cache.addAll(filesToCache)
        })
    )
})

/* Serve cached content when offline */
self.addEventListener('fetch', function (e) {
    e.respondWith(
        caches.match(e.request).then(function (response) {
            return response || fetch(e.request)
        })
    )
})