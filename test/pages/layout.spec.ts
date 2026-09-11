import { within } from '@testing-library/dom';
import { describe, expect, it } from 'vitest';
import { render } from '@testing-library/svelte';
import type { Snippet } from 'svelte';
import Layout from '../../src/routes/+layout.svelte';

describe('layout', () => {
	it('links the home page in the nav bar', () => {
		const { getByRole } = render(Layout, {
			children: (() => '') as unknown as Snippet,
		});
		const nav = getByRole('navigation', { name: 'Main' });
		expect(within(nav).getByRole('link', { name: 'Home' })).toHaveAttribute(
			'href',
			'/',
		);
	});

	it('links to the projects page in the nav bar', () => {
		const { getByRole } = render(Layout, {
			children: (() => '') as unknown as Snippet,
		});
		const nav = getByRole('navigation', { name: 'Main' });
		expect(within(nav).getByRole('link', { name: 'Projects' })).toHaveAttribute(
			'href',
			'/projects',
		);
	});
});
