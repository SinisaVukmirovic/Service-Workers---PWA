// service worker sits between application and the network
// we use sw handles caching, decide if we want to go out to the network
// we use sw to get something from the cache if we are offline
// makes application work while OFFLINE 

// SW is completelly event driven thing, it only runs code if some event triggers it

// =================================

// defining cache name and our assets
const cacheName = 'news-v1';

const staticAssets = [
    './',
    './index.html',
    './styles.css',
    './index.js',
    './newsApi.js',
    './news-article.js'
];

// installing SW
self.addEventListener('install', async e => {
    const cache = await caches.open(cacheName);
    await cache.addAll(staticAssets);
    return self.skipWaiting();
});

// moving SW into activate phase
// cleaning out any previous versions of cache
self.addEventListener('activate', e => {
    self.clients.claim();
});
  
// adding event listener that will intercept any fetch requests going out to the network
self.addEventListener('fetch', async e => {
    const req = e.request;
    const url = new URL(req.url);
  
    // when fetching something we first check if its in our cache and return that
    // if not we go to the network
    
    if (url.origin === location.origin) {
      e.respondWith(cacheFirst(req));
    } else {
      e.respondWith(networkAndCache(req));
    }
});

// when we want to get the news, we fetch the latest news, but if we are unable to,
// due to OFFLINE or no network we check cache for older version
async function cacheFirst(req) {
    const cache = await caches.open(cacheName);
    const cached = await cache.match(req);
    return cached || fetch(req);
}

// network first logic
async function networkAndCache(req) {
    const cache = await caches.open(cacheName);
    try {
        // first trying to get newd from the network
      const fresh = await fetch(req);
    //   if successful, putting that into cache 
      await cache.put(req, fresh.clone());
      return fresh;
    } catch (e) {
        // if unable to go to the network, we will check our cache
      const cached = await cache.match(req);
      return cached;
    }
  }