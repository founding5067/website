<script lang="ts">
  import about from '#lib/about.json'

  let { data } = $props()
</script>

<svelte:head>
  <title>{data.project.title} {data.title} – {about.name}</title>
</svelte:head>

<main>
  <a class="back-link" href="/projects/{data.project.slug}/"
    >← {data.project.title}</a
  >
  <h1>{data.project.title} {data.title}</h1>
  <div class="prose">{@html data.html}</div>
</main>
