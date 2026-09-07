import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/vue'
import '@testing-library/jest-dom/vitest'
import Home from '../views/Home.vue'
import Resume from '../views/Resume.vue'
import Projects from '../views/Projects.vue'
import About from '../views/About.vue'

describe('Views', () => {
  it('Home.vue renders the correct heading and blog post', () => {
    render(Home)
    expect(screen.getByRole('heading', { level: 1 }).textContent).toBe('Blog')
    const posts = screen.getAllByRole('article')
    expect(posts).toHaveLength(1)
    expect(posts[0].querySelector('h2').textContent).toBe('My First Blog Post')
    expect(posts[0].querySelector('p').textContent).toContain('first blog post')
  })

  it('Resume.vue renders the correct heading and experience', () => {
    render(Resume)
    expect(screen.getByRole('heading', { level: 1 }).textContent).toBe('Resume')
    const listItems = screen.getAllByRole('listitem')
    // Experience list (2 items)
    expect(listItems[0].textContent).toContain('Software Engineer at Tech Corp')
    expect(listItems[1].textContent).toContain('Junior Developer at Startup Inc')
    // Education list (1 item)
    expect(listItems[2].textContent).toContain('B.S. in Computer Science')
  })

  it('Projects.vue renders the correct heading and project cards', () => {
    render(Projects)
    expect(screen.getByRole('heading', { level: 1 }).textContent).toBe('Projects')
    expect(screen.getByText('Project One')).toBeInTheDocument()
    expect(screen.getByText('Project Two')).toBeInTheDocument()
    expect(screen.getByText('Project Three')).toBeInTheDocument()
    expect(screen.getAllByText('View Project')).toHaveLength(3)
  })

  it('About.vue renders the correct heading', () => {
    render(About)
    expect(screen.getByRole('heading', { level: 1 }).textContent).toBe('About Me')
    expect(screen.getByText(/Hello! I'm a software developer/)).toBeInTheDocument()
  })
})
