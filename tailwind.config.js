/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			colors: {
				'catan-red': '#b71f2e',
				'catan-red-dark': '#110204',
				'catan-yellow': '#fbc105',
				'catan-orange': '#f07629'
			}
		}
	},
	plugins: []
};
