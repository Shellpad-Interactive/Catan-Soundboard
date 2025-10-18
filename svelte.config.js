import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

const basePath = process.argv.includes('dev') ? '' : process.env.BASE_PATH || '';
// const basePath = '/TEST';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://svelte.dev/docs/kit/integrations
	// for more information about preprocessors
	preprocess: vitePreprocess(),

	kit: {
		adapter: adapter({
			fallback: `${basePath}/404.html`
		}),
		paths: {
			base: basePath
		},
		prerender: {
			entries: ['*']
		}
	}
};

export default config;
