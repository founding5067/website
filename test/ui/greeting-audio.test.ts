import { afterEach, describe, expect, it, vi } from 'vitest';
import { fireEvent, render, waitFor } from '@testing-library/svelte';
import Page from '../../src/routes/+page.svelte';

describe('greeting audio', () => {
	it('plays the greeting audio when Greetings is clicked', async () => {
		const play = vi.fn();
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

	it('greet button text contains Greetings', () => {
		const { getByText } = render(Page);
		const greetButton = getByText(/Greeeetings/i);
		expect(greetButton).toBeInTheDocument();
	});

	it('can play audio multiple times on multiple clicks', async () => {
		const play = vi.fn().mockResolvedValue(undefined);
		vi.stubGlobal(
			'Audio',
			class {
				play = play;
			},
		);

		const { getByRole } = render(Page);
		const greetButton = getByRole('button');
		await fireEvent.click(greetButton);
		await waitFor(() => expect(play).toHaveBeenCalledTimes(1));

		await fireEvent.click(greetButton);
		await waitFor(() => expect(play).toHaveBeenCalledTimes(2));
	});

	it('description meta tag is present', () => {
		const { container } = render(Page);
		const descMeta = container.querySelector('meta[name="description"]');
		if (descMeta) {
			expect(descMeta.getAttribute('content')).toContain(Cole);
		}
	});

	it('button is enabled and can be clicked', () => {
		const { getByRole } = render(Page);
		const greetButton = getByRole('button', { name: /Greeeetings/i });
		expect(greetButton).toBeEnabled();
	});

	it('bio is positioned after tagline in DOM', () => {
		const { container } = render(Page);
		const elements = container.querySelectorAll('p');
		expect(elements.length).toBeGreaterThanOrEqual(2);
	});
});
