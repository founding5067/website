import { within } from '@testing-library/dom';
import { fireEvent, render, waitFor } from '@testing-library/svelte';
import type { Snippet } from 'svelte';
import { afterEach, describe, expect, it, vi } from 'vitest';
import Navbar from '../src/routes/navbar.svelte';
import * as pageOptions from '../src/routes/+page';

describe('navbar', () => {
	it('links the home page in the nav bar', () => {
		const { getByRole } = render(Navbar, {
			children: (() => '') as unknown as Snippet,
		});
		const nav = getByRole('navigation', { name: 'Main' });
		expect(within(nav).getByRole('link', { name: 'Home' })).toHaveAttribute(
			'href',
			'/',
		);
	});

	it('links to the projects page in the nav bar', () => {
		const { getByRole } = render(Navbar, {
			children: (() => '') as unknown as Snippet,
		});
		const nav = getByRole('navigation', { name: 'Main' });
		expect(within(nav).getByRole('link', { name: 'Projects' })).toHaveAttribute(
			'href',
			'/projects',
		);
	});

	it('is prerendered into static HTML', () => {
		expect(pageOptions.prerender).toBe(true);
	});
});
