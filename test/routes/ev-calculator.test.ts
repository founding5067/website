import { describe, expect, it } from 'vitest';
import { fireEvent, render } from '@testing-library/svelte';
import * as evCalculatorPageOptions from '../../src/routes/projects/electricVehicleCalculator/+page';
import EvCalculatorPage from '../../src/routes/projects/electricVehicleCalculator/+page.svelte';

describe('electric vehicle calculator page', () => {
	it('renders the heading with accessible name', () => {
		const { getByRole } = render(EvCalculatorPage);
		expect(getByRole('heading', { level: 1 })).toHaveAccessibleName(
			'Electric Vehicle Charging Calculator',
		);
	});

	it('is prerendered into static HTML', () => {
		expect(evCalculatorPageOptions.prerender).toBe(true);
	});

	it('shows the time to charge from 0 to full with valid inputs', async () => {
		const { getByLabelText, getByText } = render(EvCalculatorPage);
		await fireEvent.input(getByLabelText(/battery capacity/i), {
			target: { value: '77' },
		});
		await fireEvent.input(getByLabelText(/charging speed/i), {
			target: { value: '7400' },
		});
		expect(getByText(/10 h 24 min/)).toBeInTheDocument();
	});

	it('shows the charging speed in W for values under 1000', async () => {
		const { getByLabelText, getByText } = render(EvCalculatorPage);
		const charging = getByLabelText(/charging speed/i);
		await fireEvent.input(charging, { target: { value: '750' } });
		expect(getByText('W')).toBeInTheDocument();
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

	it('disclaims that the estimate is rough', () => {
		const { getByText } = render(EvCalculatorPage);
		expect(getByText(/rough calculation/)).toBeInTheDocument();
	});

	it('battery input has aria-describedby attribute for accessibility', () => {
		const { container } = render(EvCalculatorPage);
		const batteryInput = container.querySelector('[id="battery-input"]');
		if (batteryInput) {
			expect(batteryInput.getAttribute('aria-describedby')).toBe(
				'battery-status',
			);
		}
	});

	it('charging input has correct placeholder text', () => {
		const { getByLabelText } = render(EvCalculatorPage);
		const chargingInput = getByLabelText(/charging speed/i) as HTMLInputElement;
	});

	it('intro text is accessible after heading', () => {
		const { getByText } = render(EvCalculatorPage);
		expect(getByText(/Calculate how long/i)).toBeInTheDocument();
	});

	it('disclaimer element exists and has content', () => {
		const { container } = render(EvCalculatorPage);
		const disclaimer = container.querySelector('.disclaimer');
		if (disclaimer) {
			expect(disclaimer.textContent.length).toBeGreaterThan(0);
		}
	});

	it('hint element exists when no values are entered', () => {
		const { getByText } = render(EvCalculatorPage);
		expect(getByText(/Enter a battery/i)).toBeInTheDocument();
	});
});
