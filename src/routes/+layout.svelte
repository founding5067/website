<script>
  // Imports the theme helper and applies the CSS from app.css to the document.
  import '../app.css'
  import { toggleTheme } from '$lib/theme.ts'

  let { children } = $props()

  // Tracks the currently selected theme. Starts on 'dark' to match the initial
  // value written in app.html.
  let theme = $state('dark')

  // Switches the theme by flipping the stored value; the icon and tooltip are
  // derived from it so the button always reflects the mode the user last chose.
  function toggle() {
    theme = toggleTheme()
  }
</script>

{@render children()}

<!-- Fixed-position button in the top-right corner. The aria-label stays constant
for stable screen-reader focus; the title switches so it points toward the
mode the user is about to enter. -->
<button
  type="button"
  class="theme-toggle"
  onclick={toggle}
  aria-label="Toggle dark mode"
  title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
>
  {theme === 'dark' ? '🌙' : '☀️'}
</button>
