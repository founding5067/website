<script>
  // Applies the CSS from app.css to the document.
  import '../app.css'

  let { children } = $props()
</script>

<!-- Decorative motif down both page edges. Purely visual, so it is hidden from
assistive tech and ignores clicks; app.css hides it on narrow screens. -->
<div class="backdrop" aria-hidden="true">
  {#each ['left', 'right'] as side}
    <svg class="backdrop-strip {side}">
      <defs>
        <pattern
          id="motif-{side}"
          width="120"
          height="160"
          patternUnits="userSpaceOnUse"
        >
          <circle cx="60" cy="40" r="26" class="ring" />
          <circle cx="60" cy="40" r="10" class="dot" />
          <circle cx="24" cy="120" r="6" class="dot" />
          <circle cx="96" cy="128" r="14" class="ring" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#motif-{side})" />
    </svg>
  {/each}
</div>

<!-- The shell is the same width as <main> and sits above the backdrop. -->
<div class="shell">
  {@render children()}
</div>
