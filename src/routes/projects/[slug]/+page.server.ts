import { error } from '@sveltejs/kit'
import {
  getProject,
  legalDocs,
  projects,
  readDoc,
  renderMarkdown,
  LEGAL_DOCS,
} from '#lib/projects.ts'
import type { EntryGenerator, PageServerLoad } from './$types'

// Every project gets a landing page, so list every slug for prerendering.
export const entries: EntryGenerator = () =>
  projects.map(({ slug }) => ({ slug }))

export const load: PageServerLoad = ({ params }) => {
  const project = getProject(params.slug)
  if (!project) error(404, 'Project not found')

  const about = readDoc(project.slug, 'about')
  return {
    project,
    aboutHtml: about === null ? null : renderMarkdown(about),
    docs: legalDocs(project.slug).map((name) => ({
      name,
      title: LEGAL_DOCS[name],
    })),
  }
}
