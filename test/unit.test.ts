import { render } from '@testing-library/svelte';
import { describe, expect, it } from 'vitest';
import * as pageOptions from '../src/routes/+page';
import Page from '../src/routes/+page.svelte';

describe('home page', () => {
	it('renders the name in the heading', () => {
		const { getByRole } = render(Page);
		expect(getByRole('heading', { level: 1 })).toHaveTextContent('Cole Braswell');
	});

	it('renders the tagline', () => {
		const { getByText } = render(Page);
		expect(getByText(/software developer passionate about building/)).toBeInTheDocument();
	});

	it('lists the upcoming sections', () => {
		const { getByText } = render(Page);
		expect(getByText('Resume')).toBeInTheDocument();
		expect(getByText('Projects')).toBeInTheDocument();
		expect(getByText('Blog')).toBeInTheDocument();
	});
});

describe('page options', () => {
	it('is prerendered into static HTML', () => {
		expect(pageOptions.prerender).toBe(true);
	});
});
