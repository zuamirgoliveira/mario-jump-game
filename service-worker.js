const CACHE_NAME = 'mario-jump-v1';
const FILES_TO_CACHE = [
    './',
    './index.html',
    './css/style.css',
    './js/script.js',
    './images/mario_jump.svg',
    './images/mario-sprint.gif',
    './images/mario-game-over.png',
    './images/mario-pipe.png',
    './images/mario-grass.png',
    './images/super-mario-bros-cloud-little.png',
    './images/super-mario-bros-clouds.png',
    './images/super-mario-bros-clouds_2.png',
    './images/game_over.svg',
    './images/icons8-repeat-40.png',
    './images/icon-192.png',
    './images/icon-512.png'
];

// Instalar Service Worker
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => cache.addAll(FILES_TO_CACHE))
    );
});

// Ativar e limpar caches antigos
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cache) => {
                    if (cache !== CACHE_NAME) {
                        return caches.delete(cache);
                    }
                })
            );
        })
    );
});

// Servir do cache (offline first)
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then((response) => {
                return response || fetch(event.request);
            })
    );
});