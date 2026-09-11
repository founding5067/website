import { within } from '@testing-library/dom';
import { fireEvent, render, waitFor } from '@testing-library/svelte';
import type { Snippet } from 'svelte';
import { afterEach, describe, expect, it, vi } from 'vitest';
import * as projectsPageOptions from '../src/routes/projects/+page';
import ProjectsPage from '../src/routes/projects/+page.svelte';

describe('projects page', () => {
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
