/// <reference lib="webworker" />
import { clientsClaim } from 'workbox-core';
import { cleanupOutdatedCaches, createHandlerBoundToURL, precacheAndRoute } from 'workbox-precaching';
import { NavigationRoute, registerRoute } from 'workbox-routing';
import { CacheFirst, StaleWhileRevalidate } from 'workbox-strategies';

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

try {
	const handler = createHandlerBoundToURL('/index.html');
	const route = new NavigationRoute(handler);
	registerRoute(route);
} catch (e) {
	console.warn('NavigationRoute skipped:', e);
}

// Runtime caching for audio assets (you already had this)
registerRoute(({ request }) => request.destination === 'audio', new CacheFirst());

// Runtime caching for images (e.g., JPG, PNG, etc.)
registerRoute(({ request }) => request.destination === 'image', new CacheFirst());

// Runtime caching for scripts and styles (optional, improves offline but keep updated)
registerRoute(
	({ request }) => request.destination === 'script' || request.destination === 'style',
	new StaleWhileRevalidate()
);
