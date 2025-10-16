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
			srcDir: 'src',
			scope: './',
			filename: 'service-worker.js',
			registerType: 'autoUpdate',
			injectRegister: 'auto',
			includeAssets: ['favicon.jpg'],
			manifest: {
				name: 'Catan Soundboard',
				lang: 'nl',
				short_name: 'Catan SB',
				background_color: '#fbc105',
				theme_color: '#fbc105',
				display: 'standalone',
				start_url: `./`,
				scope: `./`,
				description: 'Kolonisten van Catan soundboard',
				icons: [
					{
						src: `${basePath}/favicon.jpg`,
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
