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
			includeAssets: ['favicon.jpg', 'audio-manifest.json', 'images/*.{png,jpg,webp}', 'audio/**/*.{mp3,wav,ogg}'],
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
				navigateFallback: `${basePath}/index.html`,
				globPatterns: ['**/*.{js,css,html,ico,jpg,png,webp,svg,mp3,wav,ogg,json}']
			}
		})
	]
});
