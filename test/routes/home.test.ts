import { describe, expect, it } from 'vitest';
import * as pageOptions from '../../src/routes/+page';
import { render } from '@testing-library/svelte';
import Page from '../../src/routes/+page.svelte';

describe('home page', () => {
	it('is prerendered into static HTML', () => {
		expect(pageOptions.prerender).toBe(true);
	});

	it('renders the name in the heading', () => {
		const { getByRole } = render(Page);
		expect(getByRole('heading', { level: 1 })).toHaveTextContent('Cole');
	});

	it('renders the tagline', () => {
		const { getByText } = render(Page);
		expect(
			getByText(/lifelong gamer, and software developer/i),
		).toBeInTheDocument();
	});

	it('sets the page title in the head', () => {
		render(Page);
		expect(document.title).toBe(
			'Cole — lifelong gamer, and software developer',
		);
	});

	it('has a greeting button that is clickable', () => {
		const { getByRole } = render(Page);
		const greetButton = getByRole('button', { name: /Greeeetings/i });
		expect(greetButton).toBeEnabled();
	});

	it('greet button text contains Greetings', () => {
		const { getByText } = render(Page);
		expect(getByText(/Greeeetings/i)).toBeInTheDocument();
	});

	it('kicker element has content about greeting', () => {
		const { getByText } = render(Page);
		expect(getByText(/Greeeetings/i)).toBeInTheDocument();
	});

	it('bio section mentions wife and hobbies', () => {
		const { getByText } = render(Page);
		expect(
			getByText(/host friends and family with my wife/i),
		).toBeInTheDocument();
	});

	it('bio mentions Overwatch game', () => {
		const { getByText } = render(Page);
		expect(getByText(/Overwatch ranked game/i)).toBeInTheDocument();
	});

	it('bio mentions Deep Rock Galactic', () => {
		const { getByText } = render(Page);
		expect(getByText(/Deep Rock Galactic run/i)).toBeInTheDocument();
	});

	it('button text has correct spelling Greetings', () => {
		const { getByRole } = render(Page);
		const greetButton = getByRole('button', { name: /Greeeetings/i });
		expect(greetButton.textContent).toBe('Greeeetings');
	});
});
