import { within } from '@testing-library/dom';
import { fireEvent, render, waitFor } from '@testing-library/svelte';
import type { Snippet } from 'svelte';
import { afterEach, describe, expect, it, vi } from 'vitest';
import * as evCalculatorPageOptions from '../src/routes/projects/electricVehicleCalculator/+page';
import EvCalculatorPage from '../src/routes/projects/electricVehicleCalculator/+page.svelte';

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
