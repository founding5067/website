<script>
  // Content and assets are loaded from JSON/data files so the site stays
  // data-driven: edit the JSON to change who is shown and what links appear.
  import about from '$lib/about.json'
  import projects from '$lib/projects.json'
  // Imported into an array so a *different* file plays each click.
  import greetingAudioUrl from '$lib/assets/winton-ow-greetings.mp3'
  import hiThereAudioUrl from '$lib/assets/winton-hi-there.mp3'
  import { externalLink } from '$lib/utils.ts'
  import { iconPath } from '$lib/icons.ts'

  // Year used in the footer copyright line.
  let year = new Date().getFullYear()

  // Initials shown in place of the photo until src/static/me.jpg exists.
  const initials = about.name
    .split(' ')
    .map((part) => part[0])
    .join('')
  let photoFailed = $state(false)

  // Every click picks a *different* audio file so the greeting never repeats.
  // The files are imported into an array and one is chosen at random each time.
  // The play() rejection is swallowed because not every browser allows
  // autoplay without a user gesture.
  const greetings = [greetingAudioUrl, hiThereAudioUrl]

  function playGreeting() {
    const audio = new Audio(
      greetings[Math.floor(Math.random() * greetings.length)],
    )
    audio.currentTime = 0
    audio.play().catch(() => {})
  }
</script>

<svelte:head>
  <title>{about.name} – {about.role}</title>
  <meta name="description" content={about.bio} />
</svelte:head>

<main id="home">
  <header class="topbar">
    <h1>
      <button
        type="button"
        class="name-button"
        onclick={playGreeting}
        aria-label="{about.name} (click to greet)"
      >
        {about.name}
      </button>
    </h1>
    <nav class="nav">
      <a href="#home">Home</a>
      <a href="#projects">Projects</a>
    </nav>
  </header>

  <section class="intro">
    <div class="photo">
      {#if about.photo && !photoFailed}
        <img
          src={about.photo}
          alt={about.name}
          onerror={() => (photoFailed = true)}
        />
      {:else}
        <span class="initials" aria-hidden="true">{initials}</span>
      {/if}
    </div>
    <div class="bio">
      {#each about.paragraphs as paragraph}
        <p>{paragraph}</p>
      {/each}
    </div>
  </section>

  <!-- One button per link defined in about.json. Every link is spread with
  externalLink() so it opens in a new tab with a safe rel. -->
  <nav class="link-buttons" aria-label="Elsewhere">
    {#each about.links as link}
      <a class="link-button" href={link.url} {...externalLink(link.url)}>
        <svg viewBox="0 0 24 24" aria-hidden="true"
          ><path d={iconPath(link.icon)} /></svg
        >
        {link.label}
      </a>
    {/each}
  </nav>

  <section id="projects">
    <h2>
      <svg viewBox="0 0 24 24" aria-hidden="true"
        ><path d={iconPath('folder')} /></svg
      >
      Projects
    </h2>
    <ul class="project-grid">
      {#each projects as project}
        <li>
          <svelte:element
            this={project.url ? 'a' : 'div'}
            class="project-card"
            {...project.url
              ? { href: project.url, ...externalLink(project.url) }
              : {}}
          >
            <div class="project-head">
              <span class="project-title">{project.title}</span>
              {#if project.type}<span class="project-type">{project.type}</span
                >{/if}
            </div>
            <p class="project-desc">{project.description}</p>
            <!-- Optional fields are only rendered when data is present, so projects
            that omit them produce cleaner markup instead of empty paragraphs. -->
            {#if project.why}<p class="project-meta">Why: {project.why}</p>{/if}
            {#if project.stack}<p class="project-meta">
                What I used: {project.stack}
              </p>{/if}
            {#if project.tags.length}<span class="tags">
                {#each project.tags as tag}
                  <span class="tag">{tag}</span>
                {/each}
              </span>{/if}
          </svelte:element>
        </li>
      {/each}
    </ul>
  </section>

  <footer>
    <p class="copyright">
      &copy; {year}
      {about.name}. Built with SvelteKit.
    </p>
  </footer>
</main>
