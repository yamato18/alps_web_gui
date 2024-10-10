// バージョン
const VERSION = "0.0.2"

// キャッシュ名
const CACHE_NAME  = `ALPS-Web-GUI-${VERSION}`;

// キャッシュするファイル名
const CACHE_FILES = [
    "/",
    "/index.html",
    "/style.css",
    "/script.js",
	"/manifest.json",
	"/sw.js",
	"/icons/apple-touch-icon.png",	
	"/icons/favicon.ico",
	"/icons/icon192.png",
	"/icons/icon512.png",
];

// インストール時処理
self.addEventListener("install", (event) => {
    event.waitUntil(
        (async () => {
            const cache = await caches.open(CACHE_NAME);
            cache.addAll(CACHE_FILES);
        })(),
    );
});

// 更新時処理
self.addEventListener("activate", (event) => {
    event.waitUntil(
        (async () => {
            const names = await caches.keys();
            await Promise.all(
                names.map((name) => {
                    if (name !== CACHE_NAME) {
                        return caches.delete(name);
                    }
                }),
            );
            await clients.claim();
        })(),
    );
});

// フェッチ時処理
self.addEventListener("fetch", (event) => {
    if (event.request.mode === "navigate") {
        event.respondWith(caches.match("/"));
        return;
    }

    event.respondWith(
        (async () => {
            const cache = await caches.open(CACHE_NAME);
            const cachedResponse = await cache.match(event.request.url);
            if (cachedResponse) {
                return cachedResponse;
            }
            return new Response(null, { status: 404 });
        })(),
    );
});
