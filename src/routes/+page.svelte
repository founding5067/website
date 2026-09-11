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
	</div>
</main>

<style>
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
</style>
