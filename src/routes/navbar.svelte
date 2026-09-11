<script lang="ts">
	import '../styles/global.css';
	import '../styles/components.css';
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<div class="shell">
	<nav class="nav" aria-label="Main">
		<a class="pill" href="/">Home</a>
		<a class="pill" href="/projects">Projects</a>
	</nav>
	{@render children()}
</div>

<style>
	.shell {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}

	.nav {
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 0.5rem;
		flex-wrap: wrap;
		padding: 0.75rem 1.5rem;
	}
</style>
