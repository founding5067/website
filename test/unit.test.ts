import { within } from '@testing-library/dom';
import { fireEvent, render, waitFor } from '@testing-library/svelte';
import type { Snippet } from 'svelte';
import { afterEach, describe, expect, it, vi } from 'vitest';
import Layout from '../src/routes/+layout.svelte';
import * as pageOptions from '../src/routes/+page';
import Page from '../src/routes/+page.svelte';
import * as projectsPageOptions from '../src/routes/projects/+page';
import ProjectsPage from '../src/routes/projects/+page.svelte';
import * as evCalculatorPageOptions from '../src/routes/projects/electricVehicleCalculator/+page';
import EvCalculatorPage from '../src/routes/projects/electricVehicleCalculator/+page.svelte';

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
});

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

describe('page options', () => {
	it('is prerendered into static HTML', () => {
		expect(pageOptions.prerender).toBe(true);
	});
});

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

describe('electric vehicle calculator page', () => {
	it('renders the heading', () => {
		const { getByRole } = render(EvCalculatorPage);
		expect(getByRole('heading', { level: 1 })).toHaveAccessibleName(
			'Electric Vehicle Charging Calculator',
		);
	});

	it('is prerendered into static HTML', () => {
		expect(evCalculatorPageOptions.prerender).toBe(true);
	});

	it('shows the time to charge from 0 to full', async () => {
		const { getByLabelText, getByText } = render(EvCalculatorPage);
		await fireEvent.input(getByLabelText(/battery capacity/i), {
			target: { value: '77' },
		});
		await fireEvent.input(getByLabelText(/charging speed/i), {
			target: { value: '7400' },
		});
		expect(getByText(/10 h 24 min/)).toBeInTheDocument();
	});

	it('shows the charging speed in W, switching to kW over 1000 W', async () => {
		const { getByLabelText, getByDisplayValue, getByText } =
			render(EvCalculatorPage);
		const charging = getByLabelText(/charging speed/i);
		await fireEvent.input(charging, { target: { value: '750' } });
		expect(getByText('W')).toBeInTheDocument();
		await fireEvent.input(charging, { target: { value: '7400' } });
		expect(getByDisplayValue('7.4')).toBeInTheDocument();
		expect(getByText('kW')).toBeInTheDocument();
	});

	it('shows the gasoline equivalent of the battery energy', async () => {
		const { getByLabelText, getByText } = render(EvCalculatorPage);
		await fireEvent.input(getByLabelText(/battery capacity/i), {
			target: { value: '77' },
		});
		expect(getByText(/2\.285 gal ⛽/)).toBeInTheDocument();
	});

	it('hides the math equation until it is clicked', async () => {
		const { getByLabelText, getAllByText, container } =
			render(EvCalculatorPage);
		await fireEvent.input(getByLabelText(/battery capacity/i), {
			target: { value: '77' },
		});
		await fireEvent.input(getByLabelText(/charging speed/i), {
			target: { value: '7400' },
		});
		const mathBlocks = container.querySelectorAll('details.math');
		expect((mathBlocks[0] as HTMLDetailsElement).open).toBe(false);
		await fireEvent.click(getAllByText('Show the math')[0]);
		expect((mathBlocks[0] as HTMLDetailsElement).open).toBe(true);
	});

	it('estimates the cost from the charge time and electricity cost', async () => {
		const { getByLabelText, getAllByText, container } =
			render(EvCalculatorPage);
		await fireEvent.input(getByLabelText(/battery capacity/i), {
			target: { value: '77' },
		});
		await fireEvent.input(getByLabelText(/charging speed/i), {
			target: { value: '7400' },
		});
		await fireEvent.input(
			getByLabelText(/electricity cost per kilowatt-hour/i),
			{
				target: { value: '30' },
			},
		);
		expect(container).toHaveTextContent('$2310.00');
		const toggles = getAllByText('Show the math');
		const mathBlocks = container.querySelectorAll('details.math');
		await fireEvent.click(toggles[2]);
		expect((mathBlocks[2] as HTMLDetailsElement).open).toBe(true);
	});

	it('disclaims that the estimate is rough', () => {
		const { getByText } = render(EvCalculatorPage);
		expect(getByText(/rough calculation/)).toBeInTheDocument();
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
