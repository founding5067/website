import { describe, expect, it } from 'vitest';
import { render } from '@testing-library/svelte';
import ProjectsPage from '../../src/routes/projects/+page.svelte';
import * as projectsPageOptions from '../../src/routes/projects/+page';

describe('projects.spec.ts', () => {
	it('outputs file name', () => {
		expect(true).toBe(true);
	});

	it('renders the heading', () => {
		const { getByRole } = render(ProjectsPage);
		expect(getByRole('heading', { level: 1 })).toHaveTextContent('Projects');
	});

	it('is prerendered into static HTML', () => {
		expect(projectsPageOptions.prerender).toBe(true);
	});

	it('links to each project', () => {
		const { getByRole } = render(ProjectsPage);
		expect(
			getByRole('link', { name: /electric vehicle charging calculator/i }),
		).toHaveAttribute('href', '/projects/electricVehicleCalculator');
	});
});
