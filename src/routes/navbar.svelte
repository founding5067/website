<script lang="ts">
	import '../app.css';
	import '../lib/aura.css';
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

	/* Same pill look as the old "More on the way" list at the bottom */
	.pill {
		padding: 0.4rem 0.9rem;
		border: 1px solid rgba(68, 64, 60, 0.25);
		border-radius: 999px;
		background: rgba(255, 252, 245, 0.45);
		font-size: 0.875rem;
		font-weight: 500;
		color: var(--ink-soft);
		text-decoration: none;
	}

	.pill:hover,
	.pill:focus-visible {
		color: var(--ink);
		text-decoration: underline;
	}
</style>
