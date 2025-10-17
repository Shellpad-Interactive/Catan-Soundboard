/// <reference lib="webworker" />
import { clientsClaim } from 'workbox-core';
import { cleanupOutdatedCaches, precacheAndRoute } from 'workbox-precaching';
import { registerRoute } from 'workbox-routing';
import { CacheFirst, StaleWhileRevalidate } from 'workbox-strategies';

declare let self: ServiceWorkerGlobalScope;

console.log('Initializing service worker...');
self.addEventListener('install', () => console.log('Service Worker installed'));
self.addEventListener('activate', () => console.log('Service Worker activated'));

self.addEventListener('message', (event) => {
	if (event.data && event.data.type === 'SKIP_WAITING') self.skipWaiting();
});
clientsClaim();

// Precache all assets defined in the manifest
precacheAndRoute(self.__WB_MANIFEST || []);

// Clean old assets
cleanupOutdatedCaches();

// Cache audio files with CacheFirst strategy
registerRoute(
	({ request }) => request.destination === 'audio',
	new CacheFirst({
		cacheName: 'audio-cache'
	})
);

// Cache images with CacheFirst strategy
registerRoute(
	({ request }) => request.destination === 'image',
	new CacheFirst({
		cacheName: 'image-cache'
	})
);

// Cache fonts with CacheFirst strategy
registerRoute(
	({ request }) => request.destination === 'font',
	new CacheFirst({
		cacheName: 'font-cache'
	})
);

// Cache pages with StaleWhileRevalidate
registerRoute(
	({ request }) => request.destination === 'document',
	new StaleWhileRevalidate({
		cacheName: 'page-cache'
	})
);

// Cache scripts and styles with StaleWhileRevalidate
registerRoute(
	({ request }) => request.destination === 'script' || request.destination === 'style',
	new StaleWhileRevalidate({
		cacheName: 'static-resources'
	})
);

// Cache audio manifewst
registerRoute(
	({ url }) => url.pathname === '/audio-manifest.json',
	new StaleWhileRevalidate({
		cacheName: 'manifest-cache'
	})
);
