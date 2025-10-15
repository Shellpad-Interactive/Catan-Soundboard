import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
	plugins: [
		sveltekit(),
		VitePWA({
			registerType: 'autoUpdate',
			includeAssets: ['favicon.jpg'],
			manifest: {
				name: 'Catan Soundboard',
				short_name: 'Catan SB',
				start_url: '/',
				display: 'standalone',
				background_color: '#fbc105',
				theme_color: '#fbc105',
				icons: [
					{
						src: '/favicon.jpg',
						sizes: '192x192',
						type: 'image/jpeg'
					}
				]
			},
			workbox: {
				globPatterns: ['**/*.{js,css,html,ico,jpg,png,mp3,wav,ogg}']
			}
		})
	]
});
