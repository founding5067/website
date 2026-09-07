import adapter from '@sveltejs/adapter-static';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

// @see https://svelte.dev/docs/kit/adapters
/** @type {import('@sveltejs/kit').Config} */
const config = defineConfig({
	plugins: [
		sveltekit({
			compilerOptions: {
				// Force runes mode for the project, except for libraries. Can be removed in svelte 6.
				runes: ({ filename }) =>
					filename.split(/[/\\]/).includes('node_modules') ? undefined : true
			},

			// Build a plain static site: everything gets prerendered into `build/`,
			// which you can host anywhere (GitHub Pages, Netlify, a simple file server...).
			adapter: adapter({
				pages: 'build',
				assets: 'build',
				strict: false
			})
		})
	]
});

export default config;
