// Manual dark/light toggle. No cookies, no localStorage.
//
// Defaults to dark mode (set statically in app.html). The choice is kept only
// in memory, so it reverts to dark the next time the page loads or the browser
// closes — nothing is persisted anywhere.

/**
 * @returns {string} the new theme ("dark" or "light")
 */
export function toggleTheme(): string {
  if (typeof document === 'undefined') return 'dark'
  document.documentElement.dataset.theme =
    document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark'
  return document.documentElement.dataset.theme
}
