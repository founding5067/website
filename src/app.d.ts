// See https://svelte.dev/docs/kit/types#app-schema
// and improve the type if needed.

declare module '@sveltejs/kit';

// Vite asset imports (the favicon in +layout.svelte)
declare module '*.svg' {
	const src: string;
	export default src;
}
