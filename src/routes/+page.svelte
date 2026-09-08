<script lang="ts">
	import audioUrl from '$lib/assets/winton-ow-greetings.mp3';

	let name = $state('Cole');
	let tagline = $state('lifelong gamer, and software developer');

	// Kept at component scope so it can replay from the start on each click and
	// isn't garbage-collected while it plays.
	let greetingAudio: HTMLAudioElement | undefined;

	// Browsers block autoplay with sound until the user interacts, so let the
	// user start it by clicking "Greetings".
	function playGreeting() {
		const audio = (greetingAudio ??= new Audio(audioUrl));
		audio.currentTime = 0;
		audio.play()?.catch?.(() => {});
	}
</script>

<svelte:head>
	<title>{name} — {tagline}</title>
	<meta content="{name}'s personal website" name="description" />
</svelte:head>

<main class="page">
	<div class="inner">
		<p class="kicker">
			<button class="greet" onclick={playGreeting}>Greeeetings</button>, I'm
		</p>
		<h1 class="name">{name}</h1>
		<p class="tagline">
			A {tagline} passionate about electric vehicles, solar energy, heat pumps, and
			dishwashers.
		</p>
		<p class="bio">
			I love to cook and host friends and family with my wife. Online you'll
			find me in an Overwatch ranked game or a Deep Rock Galactic run.
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

	.greet {
		display: inline;
		padding: 0;
		margin: 0;
		background: none;
		border: none;
		font: inherit;
		color: inherit;
		cursor: pointer;
	}

	.greet:hover,
	.greet:focus-visible {
		text-decoration: underline;
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
