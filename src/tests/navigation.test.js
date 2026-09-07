import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/vue'
import { createRouter, createWebHistory } from 'vue-router'
import Navbar from '../components/Navbar.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: { template: '<div>Home</div>' } },
    { path: '/resume', component: { template: '<div>Resume</div>' } },
    { path: '/projects', component: { template: '<div>Projects</div>' } },
    { path: '/about', component: { template: '<div>About</div>' } },
  ],
})

describe('Navbar.vue', () => {
  it('renders all navigation links', () => {
    render(Navbar, {
      global: {
        plugins: [router],
      },
    })
    const links = screen.getAllByRole('link')
    expect(links).toHaveLength(4)
    expect(links[0].textContent).toBe('Home')
    expect(links[1].textContent).toBe('Resume')
    expect(links[2].textContent).toBe('Projects')
    expect(links[3].textContent).toBe('About')
  })
})

