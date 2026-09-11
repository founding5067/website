import { describe, expect, it } from 'vitest';
import { render, fireEvent, waitFor } from '@testing-library/svelte';
import EvCalculatorPage from '../../src/routes/projects/electricVehicleCalculator/+page.svelte';
import * as evCalculatorPageOptions from '../../src/routes/projects/electricVehicleCalculator/+page';

describe('calculator.spec.ts', () => {
	it('outputs file name', () => {
		expect(true).toBe(true);
	});

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

	it('does not mis-store a value typed down to 1 in kW mode', async () => {
		const { getByLabelText, getByText } = render(EvCalculatorPage);
		await fireEvent.input(getByLabelText(/battery capacity/i), {
			target: { value: '77' },
		});
		// Enter 2000 W -> field flips to show "2" kW (stored as 2000 W).
		await fireEvent.input(getByLabelText(/charging speed/i), {
			target: { value: '2000' },
		});
		expect(getByText('kW')).toBeInTheDocument();
		// Edit the displayed "2" down to "1": must stay 1 kW (1000 W), not flip
		// to 1 W. With the old `value > 1` guard it would wrongly become 1 W.
		await fireEvent.input(getByLabelText(/charging speed/i), {
			target: { value: '1' },
		});
		// Stored as exactly 1000 W, so the unit flips back to "W" (1000 is not
		// > 1000) and shows "1000", NOT a nonsensical single watt.
		expect(getByText('W')).toBeInTheDocument();
		const input = getByLabelText(/charging speed/i);
		expect(input).toHaveDisplayValue('1000');
		// 77 kWh / 1 kW = 77 h, NOT the absurd 77000 h from a 1 W mis-store.
		const time = getByText(/≈ \d+ h/);
		expect(time).toHaveTextContent('77 h');
	});

	it('scales any kW-mode value (including <= 1) by 1000', async () => {
		const { getByLabelText, getByText } = render(EvCalculatorPage);
		await fireEvent.input(getByLabelText(/battery capacity/i), {
			target: { value: '77' },
		});
		// Enter a large watt value to switch into kW mode.
		await fireEvent.input(getByLabelText(/charging speed/i), {
			target: { value: '5000' },
		});
		expect(getByText('kW')).toBeInTheDocument();
		// Now type 0.5 in kW -> must store 500 W, not 0.5 W.
		await fireEvent.input(getByLabelText(/charging speed/i), {
			target: { value: '0.5' },
		});
		// Stored as exactly 500 W (not 0.5 W): 77 kWh / 0.5 kW = 154 h.
		const input = getByLabelText(/charging speed/i);
		expect(input).toHaveDisplayValue('500');
		const time = getByText(/≈ \d+ h/);
		expect(time).toHaveTextContent('154 h');
	});
});
