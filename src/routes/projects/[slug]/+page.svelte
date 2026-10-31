<script lang="ts">
  import about from '#lib/about.json'
  import { externalLink, linkLabel } from '#lib/utils.ts'

  let { data } = $props()
  let project = $derived(data.project)
</script>

<svelte:head>
  <title>{project.title} – {about.name}</title>
  <meta name="description" content={project.description} />
</svelte:head>

<main>
  <a class="back-link" href="/">← {about.name}</a>

  {#if project.banner}
    <img class="project-banner" src={project.banner} alt="" />
  {/if}

  <header class="project-hero">
    {#if project.icon}
      <img class="project-icon" src={project.icon} alt="" />
    {/if}
    <div>
      <h1>{project.title}</h1>
      {#if project.type}<span class="project-type">{project.type}</span>{/if}
    </div>
  </header>

  <!-- about.md replaces the short JSON fields when the project has one. -->
  {#if data.aboutHtml}
    <div class="prose">{@html data.aboutHtml}</div>
  {:else}
    <div class="prose">
      <p>{project.description}</p>
      {#if project.why}<p><strong>Why:</strong> {project.why}</p>{/if}
      {#if project.stack}<p>
          <strong>What I used:</strong>
          {project.stack}
        </p>{/if}
    </div>
  {/if}

  {#if project.tags.length}<span class="tags">
      {#each project.tags as tag}
        <span class="tag">{tag}</span>
      {/each}
    </span>{/if}

  {#if project.url}
    <nav class="link-buttons" aria-label="Project links">
      <a class="link-button" href={project.url} {...externalLink(project.url)}>
        {linkLabel(project.url)}
      </a>
    </nav>
  {/if}

  {#if data.docs.length}
    <nav class="legal-links" aria-label="More">
      {#each data.docs as doc}
        <a href="/projects/{project.slug}/{doc.name}/">{doc.title}</a>
      {/each}
    </nav>
  {/if}
</main>
