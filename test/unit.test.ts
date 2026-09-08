import { fireEvent, render, waitFor } from '@testing-library/svelte';
import { afterEach, describe, expect, it, vi } from 'vitest';
import * as pageOptions from '../src/routes/+page';
import Page from '../src/routes/+page.svelte';

describe('home page', () => {
	it('renders the name in the heading', () => {
		const { getByRole } = render(Page);
		expect(getByRole('heading', { level: 1 })).toHaveTextContent('Cole');
	});

	it('renders the tagline', () => {
		const { getByText } = render(Page);
		expect(
			getByText(
				/lifelong gamer, and software developer passionate about electric vehicles, solar energy, heat pumps, and dishwashers/,
			),
		).toBeInTheDocument();
	});

	it('sets the page title in the head', () => {
		render(Page);
		expect(document.title).toBe(
			'Cole — lifelong gamer, and software developer',
		);
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

describe('greeting audio', () => {
	it('plays the greeting audio when Greetings is clicked', async () => {
		const play = vi.fn().mockResolvedValue(undefined);
		vi.stubGlobal(
			'Audio',
			class {
				play = play;
			},
		);

		const { getByRole } = render(Page);

		await fireEvent.click(getByRole('button'));

		await waitFor(() => expect(play).toHaveBeenCalledTimes(1));
	});

	afterEach(() => {
		vi.unstubAllGlobals();
	});
});
