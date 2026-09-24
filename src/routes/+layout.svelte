<script>
	import '../app.css';
	import { toggleTheme } from '$lib/theme.ts';

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
