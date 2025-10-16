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
			filename: 'service-worker.ts',
			registerType: 'autoUpdate',
			injectRegister: 'auto',
			includeAssets: ['favicon.jpg'],
			manifest: {
				name: 'Catan Soundboard',
				short_name: 'Catan SB',
				start_url: `${basePath}/`,
				display: 'standalone',
				background_color: '#fbc105',
				theme_color: '#fbc105',
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
