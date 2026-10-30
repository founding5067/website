<script>
  // Applies the CSS from app.css to the document.
  import '../app.css'

  let { children } = $props()
</script>

<!-- One decorative motif on each page edge, spread from the top of the window
to the bottom (the right one is mirrored in app.css). Positions are
percentages so the shapes spread out on tall windows and close up on short
ones while staying round. Purely visual, so it is hidden from assistive tech
and ignores clicks; app.css hides it on narrow screens. -->
<div class="backdrop" aria-hidden="true">
  {#each ['left', 'right'] as side}
    <svg class="backdrop-art {side}">
      <circle cx="50%" cy="8%" r="40" class="ring" />
      <circle cx="50%" cy="8%" r="14" class="dot" />
      <circle cx="22%" cy="20%" r="7" class="dot" />
      <circle cx="74%" cy="29%" r="20" class="ring" />
      <circle cx="36%" cy="42%" r="30" class="ring" />
      <circle cx="36%" cy="42%" r="10" class="dot" />
      <circle cx="78%" cy="53%" r="6" class="dot" />
      <circle cx="60%" cy="65%" r="24" class="ring" />
      <circle cx="24%" cy="76%" r="8" class="dot" />
      <circle cx="50%" cy="90%" r="34" class="ring" />
      <circle cx="50%" cy="90%" r="11" class="dot" />
    </svg>
  {/each}
</div>

<!-- The shell is the same width as <main> and sits above the backdrop. -->
<div class="shell">
  {@render children()}
</div>
