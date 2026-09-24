<script>
	// Imports the theme helper and applies the CSS from app.css to the document.
	import '../app.css';
	import { toggleTheme } from '$lib/theme.ts';

	// Tracks the currently selected theme and the icon shown on the toggle button.
	// Starts on 'dark' to match the initial value written in app.html.
	let theme = 'dark';
	let icon = '🌙';

	// Switches the theme by flipping the stored value, then updates the icon
	// so the button always reflects the mode the user last chose.
	function toggle() {
		theme = toggleTheme();
		icon = theme === 'dark' ? '🌙' : '☀️';
	}
</script>

<slot />

<!-- Fixed-position button in the top-right corner. The aria-label stays constant
for stable screen-reader focus; the title switches so it points toward the
mode the user is about to enter. -->
<button
	type="button"
	class="theme-toggle"
	onclick={toggle}
	aria-label="Toggle dark mode"
	title={icon === '☀️' ? 'Switch to light mode' : 'Switch to dark mode'}
>
	{icon}
</button>
