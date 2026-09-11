import { describe, expect, it } from 'vitest';
import * as projectsPageOptions from '../../src/routes/projects/+page';
import { render } from '@testing-library/svelte';
import ProjectsPage from '../../src/routes/projects/+page.svelte';

describe('projects page', () => {
	it('renders the heading', () => {
		const { getByRole } = render(ProjectsPage);
		expect(getByRole('heading', { level: 1 })).toHaveTextContent('Projects');
	});

	it('is prerendered into static HTML', () => {
		expect(projectsPageOptions.prerender).toBe(true);
	});

	it('links to the electric vehicle calculator project', () => {
		const { getByRole } = render(ProjectsPage);
		expect(
			getByRole('link', { name: /electric vehicle charging/i }),
		).toHaveAttribute('href', '/projects/electricVehicleCalculator');
	});

	it('kicker element contains expected text', () => {
		const { getByText } = render(ProjectsPage);
		expect(getByText(/What I've built/i)).toBeInTheDocument();
	});
});
