import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

const basePath = process.argv.includes('dev') ? '' : process.env.BASE_PATH || '';

export default defineConfig({
	plugins: [
		sveltekit(),
		VitePWA({
			base: basePath,
			strategies: 'injectManifest',
			srcDir: '.',
			filename: 'service-worker.ts',
			scope: `${basePath}/`,
			registerType: 'autoUpdate',
			injectRegister: 'auto',
			includeAssets: [
				'favicon.jpg',
				'images/*.{png,jpg,webp}',
				'lib/assets/audio/**/*.{mp3,wav,ogg}',
				'lib/assets/fonts/**/*.{ttf,woff,woff2}'
			],
			manifest: {
				name: 'Catan Soundboard',
				lang: 'nl',
				short_name: 'Catan Soundboard',
				background_color: '#fbc105',
				theme_color: '#fbc105',
				display: 'standalone',
				start_url: `${basePath}/`,
				scope: `${basePath}/`,
				description: 'Kolonisten van Catan soundboard',
				icons: [
					{
						src: `${basePath}/favicon.webp`,
						sizes: '192x192',
						type: 'image/webp'
					},
					{
						src: `${basePath}/favicon.jpg`,
						sizes: '192x192',
						type: 'image/jpeg'
					}
				]
			},
			workbox: {
				navigateFallback: `${basePath}/404.html`,
				globPatterns: ['**/*.{js,css,html,ico,jpg,png,mp3,wav,ogg}']
			}
		})
	]
});
