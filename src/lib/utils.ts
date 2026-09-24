export function externalLink(url: string) {
  return {
    target: '_blank',
    rel: 'noopener noreferrer nofollow',
  }
}

export function projectSlug(url: string): string {
  // Strip query string and fragment, split on "/", and drop empty segments
  // (from the protocol, host, or a trailing slash) to keep the last real part.
  const lastSegment = new URL(url).pathname.split('/').filter(Boolean).pop()
  // Use the original URL when the path has no segments, e.g. a bare host.
  return lastSegment ?? url
}
