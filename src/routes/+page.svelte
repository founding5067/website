<script lang="ts">
	import audioUrl from '$lib/assets/winton-ow-greetings.mp3';

	let name = $state('Cole');
	let tagline = $state('lifelong gamer and software developer');

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

	type Blog = {
		name: string;
		href: string;
		description: string;
		postDate: string;
	};

	// Add a new project by appending to this list — each one gets its own
	// route under src/routes/projects/<project name>/.
	let blogs = $state<Blog[]>([
		{
			name: 'blog 1',
			href: '/blog/post1',
			description: 'this is post 1',
			postDate: 'sometime',
		},
		{
			name: 'blog 2',
			href: '/blog/post2',
			description: 'this is post 2',
			postDate: 'some other time',
		},
		{
			name: 'blog 3',
			href: '/blog/post3',
			description: 'this is post 3',
			postDate: 'the other other time',
		},
	]);

	let isMultiBlog = $derived(blogs.length > 1);
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

	<!-- BLOG SECTION: Styled to match Project Cards -->
	<div class="inner">
		<p class="kicker">Blog</p>
		<h1 class="title">What has been on my mind lately?</h1>
		<ul class="cards" data-multi={isMultiBlog}>
			{#each blogs as blog}
				<li>
					<a class="card" href={blog.href}>
						<h2 class="card-name">{blog.name}</h2>
						<p class="card-description">{blog.description}</p>
						<p class="card-description">Posted on: {blog.postDate}</p>
					</a>
				</li>
			{/each}
		</ul>
	</div>
</main>

<style>
	/* --- BASE LAYOUT STYLES --- */
	.page {
		flex: 1;
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

	.cards {
		margin: 2.5rem auto 0;
		padding: 0;
		list-style: none;
		display: grid;
		gap: 1.5rem;
		max-width: 100%;
		justify-content: center;
	}

	/* Three cards side by side when there's room */
	@media (min-width: 64rem) {
		.cards[data-multi='true'] {
			grid-template-columns: repeat(3, 1fr);
			justify-content: flex-start;
		}

		/* Center single card on desktop */
		.cards[data-multi='false'],
		.cards[data-multi='true']:has(> :nth-child(-n + 1):only) {
			grid-template-columns: 1fr;
			place-content: center;
		}

		/* Center two cards on desktop */
		.cards[data-multi='true']:has(
				> :nth-last-child(n + 2):not(:nth-last-child(-n + 3))
			) {
			grid-template-columns: repeat(2, 1fr);
			place-content: center;
		}
	}

	.card {
		display: block;
		padding: 1.25rem;
		border: 1px solid rgba(68, 64, 60, 0.25);
		border-radius: 12px;
		background: rgba(255, 252, 245, 0.45);
		text-align: left;
		color: inherit;
		text-decoration: none;
		transition:
			border-color 120ms ease,
			transform 120ms ease;
	}

	.card:hover,
	.card:focus-visible {
		border-color: rgba(68, 64, 60, 0.5);
		transform: translateY(-2px);
	}

	.card-name {
		margin: 0;
		font-size: 1.25rem;
		font-weight: 600;
		letter-spacing: -0.01em;
		color: var(--ink);
	}

	.card-description {
		margin: 0.5rem 0 0;
		font-size: 0.9375rem;
		line-height: 1.55;
		color: var(--ink-soft);
	}
</style>
