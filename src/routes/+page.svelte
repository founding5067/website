<script>
	import about from '$lib/about.json';
	import projects from '$lib/projects.json';
	import { externalLink } from '$lib/utils.js';

	let year = new Date().getFullYear();
</script>

<main class="page">
	<header class="hero">
		<p class="eyebrow">{about.role}</p>
		<h1>{about.name}</h1>
		<p class="lead">{about.bio}</p>
	</header>

	<section class="projects">
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
						<span class="project-desc">{project.description}</span>
						<span class="tags">
							{#each project.tags as tag}
								<span class="tag">{tag}</span>
							{/each}
						</span>
					</a>
				</li>
			{/each}
		</ul>
	</section>

	<footer class="footer">
		<nav class="contact">
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
