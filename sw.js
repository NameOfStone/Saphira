
const CACHE_NAME = 'pediatric-calc-v1';
const urlsToCache = [
  './',
  './index.html',
  './manifest.json',
  './icon.png'
];

// ذخیره فایل‌ها برای استفاده آفلاین
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

// استفاده از فایل‌های ذخیره‌شده وقتی اینترنت قطع است
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});
