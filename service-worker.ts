/// <reference lib="webworker" />
import { clientsClaim } from 'workbox-core';
import { cleanupOutdatedCaches, precache, precacheAndRoute } from 'workbox-precaching';
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

// Precache all assets defined in the manifest
precacheAndRoute(self.__WB_MANIFEST || []);

// Clean old assets
cleanupOutdatedCaches();

// Cache audio files with CacheFirst strategy
registerRoute(
	({ request, url }) =>
		request.destination === 'audio' ||
		url.pathname.endsWith('.mp3') ||
		url.pathname.endsWith('.wav') ||
		url.pathname.endsWith('.ogg'),
	new CacheFirst({
		cacheName: 'audio-cache',
		matchOptions: {
			ignoreVary: true
		}
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
	({ url }) => url.pathname.includes('audio-manifest.json'),
	new StaleWhileRevalidate({
		cacheName: 'manifest-cache'
	})
);

// -----------------------------------------------------------
// 🧩 OFFLINE FALLBACK HANDLER
// -----------------------------------------------------------

// Define your fallback page (must exist in your build output)
const offlineFallbackPage = `${import.meta.env.BASE_URL}/index.html`;

// Ensure the offline fallback is precached (revision: null = don't hash it)
precache([{ url: offlineFallbackPage, revision: null }]);

// Use NavigationRoute to handle document navigations
const navigationRoute = new NavigationRoute(async ({ event }) => {
	const fetchEvent = event as FetchEvent;
	try {
		// If online, try to fetch normally
		const preloadResponse = await fetchEvent.preloadResponse;
		if (preloadResponse) return preloadResponse;

		const networkResponse = await fetch(fetchEvent.request);
		return networkResponse;
	} catch {
		// If offline, return fallback page from cache
		return caches.match(offlineFallbackPage, { ignoreVary: true });
	}
});

registerRoute(navigationRoute);
