<script lang="ts">
	type Project = {
		name: string;
		href: string;
		description: string;
	};

	// Add a new project by appending to this list — each one gets its own
	// route under src/routes/projects/<project name>/.
	let projects = $state<Project[]>([
		{
			name: 'Electric Vehicle Charging Calculator',
			href: '/projects/electricVehicleCalculator',
			description:
				'Calculate how long it takes to charge your electric vehicle from empty to full.',
		},
	]);

	let isMultiProject = $derived(projects.length > 1);
</script>

<svelte:head>
	<title>Projects — Cole</title>
	<meta content="Things I've built" name="description" />
</svelte:head>

<main class="page">
	<div class="inner">
		<p class="kicker">What I've built</p>
		<h1 class="title">Projects</h1>
		<ul class="cards" data-multi={isMultiProject}>
			{#each projects as project}
				<li>
					<a class="card" href={project.href}>
						<h2 class="card-name">{project.name}</h2>
						<p class="card-description">{project.description}</p>
					</a>
				</li>
			{/each}
		</ul>
	</div>
</main>

<style>
	.title {
		margin: 0;
		font-size: clamp(2.75rem, 9vw, 4.5rem);
		font-weight: 700;
		letter-spacing: -0.02em;
		line-height: 1.05;
		color: hsl(215, 60%, 30%);
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
