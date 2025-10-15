/// <reference lib="webworker" />
import { clientsClaim } from 'workbox-core';
import { cleanupOutdatedCaches, createHandlerBoundToURL, precacheAndRoute } from 'workbox-precaching';
import { NavigationRoute, registerRoute } from 'workbox-routing';
import { CacheFirst } from 'workbox-strategies';

declare let self: ServiceWorkerGlobalScope;

console.log('Initializing service worker...');
self.addEventListener('install', () => console.log('Service Worker installed'));
self.addEventListener('activate', () => console.log('Service Worker activated'));

self.addEventListener('message', (event) => {
	if (event.data && event.data.type === 'SKIP_WAITING') self.skipWaiting();
});
clientsClaim();

// self.__WB_MANIFEST is default injection point
precacheAndRoute(self.__WB_MANIFEST || []);

// clean old assets
cleanupOutdatedCaches();

let allowlist: undefined | RegExp[];
if (import.meta.env.DEV) {
	allowlist = [/^\/$/];
}

// to allow work offline
// registerRoute(new NavigationRoute(createHandlerBoundToURL('/'), { allowlist }));
registerRoute(({ request }) => request.destination === 'audio', new CacheFirst());
