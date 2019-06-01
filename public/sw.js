/* eslint-disable no-restricted-globals */
self.oninstall = () => {
    caches
        .open("boardGameToolkit")
        .then(cache => {
            cache.addAll([
                "/",
                "/index.html",
                "/static/js/bundle.js",
                "/favicon.ico",
                "/static/css/main.css",
                "/manifest.json",
                "/static/js/1.chunk.js",
                "/static/js/main.chunk.js"
            ]);
        })
        .then(() => {
            console.log("Cached everything okay");
        })
        .catch(error => {
            console.log("error:", error);
        });
};

self.onactivate = () => {
    console.log("Activated!");
};

self.onfetch = event => {
    event.respondWith(
        caches.match(event.request).then(response => {
            if (response) {
                console.log(`Serving from cache: ${response.body}`);

                return response;
            } else {
                console.log("Serving from request");
                return fetch(event.request);
            }
        })
    );
};
