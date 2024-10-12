// バージョン
const VERSION = "0.2.7"

// キャッシュ名
const CACHE_NAME  = `ALPS-Web-GUI-${VERSION}`;

// キャッシュするファイル名
const CACHE_FILES = [
    "index.html",
    "style.css",
    // "script.js",
	"manifest.json",
	"icons/apple-touch-icon.png",
    "icons/icon.svg",
	"icons/favicon.ico",
	"icons/icon192.png",
	"icons/icon512.png",
];

// インストール時処理
self.addEventListener("install", (event) => {
    event.waitUntil(
        (async () => {
            const cache = await caches.open(CACHE_NAME);
            await cache.addAll(CACHE_FILES);
        })(),
    );
});

// 更新時処理
self.addEventListener("activate", (event) => {
    console.log("activate");
    
    event.waitUntil(
        (async () => {
            const names = await caches.keys();
            console.log(names);
            
            await Promise.all(
                names.map((name) => {
                    console.log(name);
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
});

// バージョン送信
self.addEventListener("message", (event) => {
    if (event.data && event.data.type === "GET_VERSION") {
        event.source.postMessage({ type: "VERSION", version: VERSION });
    }
});