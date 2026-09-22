<script>
	import '../app.css';
	import { toggleTheme } from '$lib/theme.js';

	// Defaults to dark mode; the toggle flips it. Kept in a reactive variable so
	// the template never touches `document` during server-side rendering.
	let theme = 'dark';
	let icon = '🌙';

	function toggle() {
		theme = toggleTheme();
		icon = theme === 'dark' ? '🌙' : '☀️';
	}
</script>

<slot />

<button
	type="button"
	class="theme-toggle"
	onclick={toggle}
	aria-label="Toggle dark mode"
	title={icon === '☀️' ? 'Switch to light mode' : 'Switch to dark mode'}
>
	{icon}
</button>
