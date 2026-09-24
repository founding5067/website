<script>
	// Content and assets are loaded from JSON/data files so the site stays
	// data-driven: edit the JSON to change who is shown and what links appear.
	import about from '$lib/about.json';
	import projects from '$lib/projects.json';
	// Imported into an array so a *different* file plays each click.
	import greetingAudioUrl from '$lib/assets/winton-ow-greetings.mp3';
	import hiThereAudioUrl from '$lib/assets/winton-hi-there.mp3';
	import { externalLink } from '$lib/utils.ts';

	// Year used in the footer copyright line.
	let year = new Date().getFullYear();

	// Every click picks a *different* audio file so the greeting never repeats.
	// The files are imported into an array and one is chosen at random each time.
	// The play() rejection is swallowed because not every browser allows
	// autoplay without a user gesture.
	const greetings = [greetingAudioUrl, hiThereAudioUrl];

	function playGreeting() {
		const audio = new Audio(greetings[Math.floor(Math.random() * greetings.length)]);
		audio.currentTime = 0;
		audio.play().catch(() => {});
	}
</script>

<main>
	<header>
		<p class="eyebrow">{about.role}</p>
		<h1 onclick={playGreeting} role={"button"} aria-label="{about.name} (click to greet)">
			{about.name}
		</h1>
		<p class="lead">{about.bio}</p>
	</header>
	<section>
		<h2>Projects</h2>
		<ul class="project-list">
			{#each projects as project}
				<li class="project">
					<a
						class="project-link"
						href={project.url}
						{...externalLink(project.url)}
					>
						<span class="project-title">{project.title}</span>
						<p class="project-desc">{project.description}</p>
						<!-- Optional fields are only rendered when data is present, so projects
						that omit them produce cleaner markup instead of empty paragraphs. -->
						{#if project.why}<p class="why">Why: {project.why}</p>{/if}
						{#if project.stack}<p class="stack">What I used: {project.stack}</p>{/if}
						<!-- Render the skills list only when the array exists and is not empty,
						since an empty array is a valid "no skills" value, not a missing one. -->
						{#if project.skills && project.skills.length > 0}
							<ul class="skills">
								{#each project.skills as skill}
									<li>{skill}</li>
								{/each}
							</ul>
						{/if}
						<span class="tags">
							{#each project.tags as tag}
								<span class="tag">{tag}</span>
							{/each}
						</span>
						<span class="arrow">→</span>
					</a>
				</li>
			{/each}
		</ul>
	</section>

	<footer>
		<nav class="contact">
			<!-- One entry per link defined in about.json. Every link is spread with
			externalLink() so it opens in a new tab with a safe rel. -->
			{#each about.links as link}
				<a
					class="contact-link"
					href={link.url}
					{...externalLink(link.url)}
				>{link.label}</a>
			{/each}
		</nav>
		<p class="copyright">
			&copy; {year} {about.name}. Built with SvelteKit.
		</p>
	</footer>
</main>
