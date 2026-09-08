<script lang="ts">
	let name = $state('Cole Braswell');
	let tagline = $state('software developer');
</script>

<svelte:head>
	<title>Hey, I'm {name} — {tagline}</title>
	<meta
		content="Welcome to my resume site. {name} is a {tagline} passionate about building clean and efficient web applications."
		name="description"
	/>
</svelte:head>

<main class="page">
	<div class="inner">
		<p class="kicker">Hey, I'm</p>
		<h1 class="name">{name}</h1>
		<p class="tagline">
			A {tagline} passionate about building clean and efficient web applications — I love
			learning new technologies and solving complex problems.
		</p>
		<p class="bio">
			When I'm not coding, you can find me hiking, reading, or experimenting with new
			recipes in the kitchen.
		</p>

		<div class="more" aria-label="More coming soon">
			<p class="more-label">More on the way</p>
			<ul>
				<li>Resume</li>
				<li>Projects</li>
				<li>Blog</li>
			</ul>
		</div>
	</div>
</main>

<style>
	.page {
		min-height: 100vh;
		display: grid;
		place-items: center;
		padding: 4rem 1.5rem;
	}

	.inner {
		max-width: 40rem;
		text-align: center;
	}

	.kicker {
		margin: 0 0 0.5rem;
		font-size: 1.125rem;
		font-weight: 500;
		letter-spacing: 0.02em;
		color: var(--ink-soft);
	}

	.name {
		margin: 0;
		font-size: clamp(2.75rem, 9vw, 4.5rem);
		font-weight: 700;
		letter-spacing: -0.02em;
		line-height: 1.05;
		color: hsl(215, 60%, 30%);
	}

	.tagline {
		margin: 1.25rem auto 0;
		max-width: 34rem;
		font-size: 1.25rem;
		line-height: 1.55;
		color: var(--ink);
	}

	.bio {
		margin: 1.25rem auto 0;
		max-width: 34rem;
		line-height: 1.6;
		color: var(--ink-soft);
	}

	.more {
		margin-top: 3rem;
	}

	.more-label {
		margin: 0 0 0.75rem;
		font-size: 0.8125rem;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.08em;
		color: var(--ink-faint);
	}

	.more ul {
		margin: 0;
		padding: 0;
		list-style: none;
		display: flex;
		justify-content: center;
		gap: 0.5rem;
		flex-wrap: wrap;
	}

	.more li {
		padding: 0.4rem 0.9rem;
		border: 1px solid rgba(68, 64, 60, 0.25);
		border-radius: 999px;
		background: rgba(255, 252, 245, 0.45);
		font-size: 0.875rem;
		font-weight: 500;
		color: var(--ink-soft);
	}
</style>
