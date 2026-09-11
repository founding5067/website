import { describe, expect, it } from 'vitest';
import { render } from '@testing-library/svelte';
import Navbar from '../../src/routes/navbar.svelte';

describe('navbar', () => {
	it('links the home page in the nav bar', () => {
		const { getByRole } = render(Navbar, { children: () => null });
		expect(getByRole('link', { name: 'Home' })).toHaveAttribute('href', '/');
	});

	it('links to the projects page in the nav bar', () => {
		const { getByRole } = render(Navbar, { children: () => null });
		expect(getByRole('link', { name: 'Projects' })).toHaveAttribute(
			'href',
			'/projects',
		);
	});

	it('has aria-label Main for screen readers', () => {
		const { getByRole } = render(Navbar, { children: () => null });
		const nav = getByRole('navigation', { name: 'Main' });
		expect(nav.getAttribute('aria-label')).toBe('Main');
	});

	it('Home link is accessible via getByRole', () => {
		const { getByRole } = render(Navbar, { children: () => null });
		expect(getByRole('link', { name: 'Home' })).toBeInTheDocument();
	});

	it('Projects link is accessible via getByRole', () => {
		const { getByRole } = render(Navbar, { children: () => null });
		expect(getByRole('link', { name: 'Projects' })).toBeInTheDocument();
	});
});
