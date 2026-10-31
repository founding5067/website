export function externalLink(url: string) {
  return {
    target: '_blank',
    rel: 'noopener noreferrer nofollow',
  }
}

// Button text for a project's outbound link, based on where it points.
export function linkLabel(url: string) {
  const host = new URL(url).hostname
  if (host === 'apps.apple.com') return 'View on the App Store'
  if (host === 'github.com') return 'View on GitHub'
  return 'Visit'
}
