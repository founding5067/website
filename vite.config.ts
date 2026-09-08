import adapter from '@sveltejs/adapter-static';
import { sveltekit } from '@sveltejs/kit/vite';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vitest/config';

// @see https://svelte.dev/docs/kit/adapters
const config = defineConfig({
	plugins: [
		sveltekit({
			// Svelte 5's runes mode is enabled by default.
			// @see https://svelte.dev/docs/svelte/transitioning-to-5#runes_are_now_default
			compilerOptions: {
				runes: true,
			},

			adapter: adapter({
				pages: 'build',
				assets: 'build',
				strict: false,
			}),
		}),
		tailwindcss(),
	],

	resolve: {
		// Vitest resolves imports with Node's export conditions by default.
		// Svelte's package.json maps the `browser` condition to its client
		// build and `default` to its server build, so without `browser`
		// @testing-library/svelte would import the server build (whose
		// mount() throws). Adding it here makes Svelte resolve to the
		// client build, as it does in a real browser.
		conditions: ['browser'],
	},

	test: {
		include: ['**/*.{test,spec}.{js,ts}'],
		setupFiles: ['./test/setup.ts'],
		environment: 'jsdom',
		root: './',
	},
});

export default config;
