// See https://svelte.dev/docs/kit/types#app-schema
// and improve the type if needed.

declare global {
	interface Locals {}
}

declare module '@sveltejs/kit';

// Vite asset imports (the favicon in +layout.svelte)
declare module '*.svg' {
	const src: string;
	export default src;
}

// Vite asset import (the greeting audio in +page.svelte)
declare module '*.mp3' {
	const src: string;
	export default src;
}
