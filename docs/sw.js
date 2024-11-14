// バージョン
const VERSION = "0.11.7"

// キャッシュ名
const CACHE_NAME  = `ALPS-Web-GUI-${VERSION}`;

// キャッシュするファイル
const CACHE_FILES = [
    "index.html",
    "style.css",
    "script.js",
    "app.js",
    "roslib.min.js",
	"manifest.json",
	"icons/apple-touch-icon.png",
    "icons/icon.svg",
	"icons/favicon.ico",
	"icons/icon192.png",
	"icons/icon512.png",
    "NO SIGNAL.png",
];

// インストール時処理
self.addEventListener("install", (event) => {
    event.waitUntil(
        (async () => {
            const cache = await caches.open(CACHE_NAME);
            await cache.addAll(CACHE_FILES);
            await self.skipWaiting();
        })(),
    );
    console.log("[Service Worker] Installed");
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
    console.log("[Service Worker] Activated");
});

// フェッチ時処理
self.addEventListener("fetch", (event) => {
    event.respondWith(
        (async () => {
            try {
                const response = await fetch(event.request);
                const cache = await caches.open(CACHE_NAME);
                cache.put(event.request, response.clone());
                return response;
            } catch (error) {
                const resource = await caches.match(event.request);
                console.log(`[Service Worker] Fetched resource ${event.request.url}`);
                if (resource) {
                    return resource;
                }
                return new Response(null, { status: 404 });
            }
        })(),
    );
    console.log("[Service Worker] Fetched");
});

// バージョン送信
self.addEventListener("message", (event) => {
    console.log(event);
    
    if (event.data && event.data.type === "GET_VERSION") {
        event.source.postMessage({ type: "VERSION", version: VERSION });
    }
});