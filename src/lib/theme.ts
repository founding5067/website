// Returns the theme to apply and writes it to <html data-theme>.
// The `document` global does not exist during server-side rendering, so
// fall back to 'dark' (matching the initial value in app.html) and skip DOM access.
export function toggleTheme(): string {
  if (typeof document === 'undefined') return 'dark'

  // Flip the value currently stored rather than choosing an absolute theme.
  // This lets the browser and server disagree about the starting theme
  // without ever writing the same value twice in a render race.
  const next =
    document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark'
  document.documentElement.dataset.theme = next
  return next
}
