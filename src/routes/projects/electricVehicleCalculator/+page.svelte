<script lang="ts">
	let batteryKwh = $state('');
	let chargingWatts = $state(0);
	let electricityCost = $state('');

	const KWH_PER_GALLON = 33.7;

	// Unit calculation for display - converts watts to kW if over 1000W
	const showKW = $derived(chargingWatts > 1000);

	const batteryValue = $derived(
		batteryKwh && Number.isFinite(Number(batteryKwh)) ? Number(batteryKwh) : 0,
	);

	const chargeHours = $derived(
		batteryValue > 0 && chargingWatts > 0
			? (batteryValue * 1000) / chargingWatts
			: undefined,
	);

	const costValue = $derived(electricityCost ? Number(electricityCost) : 0);
	const cost = $derived(
		batteryValue > 0 && Number.isFinite(costValue) && costValue >= 0
			? batteryValue * costValue
			: undefined,
	);

	const gasolineGallons = $derived(
		batteryValue > 0 ? batteryValue / KWH_PER_GALLON : undefined,
	);
	const gasolineSummary = $derived(
		gasolineGallons === undefined
			? undefined
			: `${formatNumber(gasolineGallons)} gal`,
	);

	function onBatteryInput(event: Event) {
		batteryKwh = (event.target as HTMLInputElement).value;
	}

	function onChargingInput(event: Event) {
		const text = (event.target as HTMLInputElement).value;
		const value = Number(text);
		if (!Number.isFinite(value)) {
			chargingWatts = 0;
			return;
		}
		// Store in watts, display in kW if over 1000W
		if (showKW && value > 1) {
			chargingWatts = value * 1000;
		} else {
			chargingWatts = value;
		}
	}

	function onCostInput(event: Event) {
		electricityCost = (event.target as HTMLInputElement).value;
	}

	function formatChargeTime(hours: number): string {
		const totalMinutes = Math.round(hours * 60);
		const wholeHours = Math.floor(totalMinutes / 60);
		const minutes = totalMinutes % 60;
		return `${wholeHours} h${minutes > 0 ? ` ${minutes} min` : ''}`;
	}

	function formatNumber(value: number): string {
		return value.toFixed(3);
	}
</script>

<svelte:head>
	<title>Electric Vehicle Charging Calculator — Cole</title>
	<meta
		content="Calculate EV charging time, cost, and gasoline equivalent"
		name="description"
	/>
</svelte:head>

<!-- Lightning bolts from top-left -->
<div
	aria-hidden="true"
	class="lightning-bolt left-start"
	style="--scale: 1.5; --tx: 40vw; --ty: 60vh;"
>
	⚡
</div>
<div
	aria-hidden="true"
	class="lightning-bolt left-start"
	style="--scale: 2; --tx: 75vw; --ty: 50vh;"
>
	⚡
</div>
<div
	aria-hidden="true"
	class="lightning-bolt left-start"
	style="--scale: 3; --tx: 90vw; --ty: 65vh;"
>
	⚡
</div>
<!-- Lightning bolts from bottom-right -->
<div
	aria-hidden="true"
	class="lightning-bolt right-start"
	style="--scale: 1.8; --tx: -40vw; --ty: 20vh;"
>
	⚡
</div>
<div
	aria-hidden="true"
	class="lightning-bolt right-start"
	style="--scale: 2.5; --tx: -30vw; --ty: 30vh;"
>
	⚡
</div>
<div
	aria-hidden="true"
	class="lightning-bolt right-start"
	style="--scale: 2.2; --tx: -35vw; --ty: 25vh;"
>
	⚡
</div>

<main class="page">
	<div class="inner">
		<h1 class="title">Electric Vehicle Charging Calculator</h1>
		<p class="intro">
			Calculate how long it takes to charge your electric vehicle from empty to
			full.
		</p>

		<div class="calculator">
			<label class="field">
				<span class="label">Battery capacity</span>
				<input
					class="input"
					id="battery-input"
					type="number"
					step="0.1"
					placeholder="e.g., 77"
					aria-describedby="battery-status"
					value={batteryKwh}
					oninput={onBatteryInput}
				/>
				<span class="unit">kWh</span>
			</label>

			<label class="field">
				<span class="label">Charging speed</span>
				<input
					class="input"
					id="charging-input"
					type="number"
					step="0.1"
					placeholder="e.g., 7400 or 7.4"
					aria-describedby="charging-status charging-status-unit"
					value={showKW ? chargingWatts / 1000 : chargingWatts}
					oninput={onChargingInput}
				/>
				<span class="unit">{showKW ? 'kW' : 'W'}</span>
			</label>

			<div aria-live="polite">
				{#if batteryValue > 0 && chargeHours !== undefined}
					<p class="result">
						≈ {formatChargeTime(chargeHours)} 🕐
						<span class="result-note">from empty to full</span>
					</p>
					<details class="math">
						<summary class="math-toggle" aria-label="Show the math equation"
							>Show the math</summary
						>
						<p class="formula">
							{formatNumber(batteryValue)} kWh ÷ {chargingWatts / 1000} kW = {formatNumber(
								chargeHours,
							)} h
						</p>
					</details>

					<label class="field cost-field">
						<span class="label">Electricity cost per kilowatt-hour</span>
						<span class="unit">$</span>
						<input
							class="input"
							id="cost-input"
							type="number"
							step="0.01"
							placeholder="e.g., 0.30 or 30"
							aria-describedby="cost-status"
							value={electricityCost}
							oninput={onCostInput}
						/>
					</label>
					{#if cost !== undefined}
						<p class="result">≈ ${cost.toFixed(2)}</p>
						<details class="math">
							<summary class="math-toggle" aria-label="Show the math equation"
								>Show the math</summary
							>
							<p class="formula">
								{formatNumber(batteryValue)} kWh × {formatNumber(costValue)} $/kWh
								= `$${cost.toFixed(2)}`
							</p>
						</details>
					{/if}
				{:else if batteryValue > 0}
					<p class="hint">Enter a charging speed to see the charge time.</p>
				{:else}
					<p class="hint">
						Enter a battery size and a charging speed to see the charge time.
					</p>
				{/if}

				{#if batteryValue > 0}
					<div class="gasoline">
						<p class="result">
							≈ {gasolineSummary ?? '—'} ⛽
							<span class="result-note">of gasoline, energy for energy</span>
						</p>
						<details class="math">
							<summary class="math-toggle" aria-label="Show the math equation"
								>Show the math</summary
							>
							<p class="formula">
								{formatNumber(batteryValue)} kWh ÷ {KWH_PER_GALLON} kWh/gal = {formatNumber(
									gasolineGallons ?? 0,
								)} gal
							</p>
						</details>
					</div>
				{/if}
			</div>
		</div>

		<p class="disclaimer">
			This is a rough calculation. It assumes a constant charging rate from
			empty to full and doesn't account for battery health or degradation,
			battery or ambient temperature, the vehicle's charging curve and power
			taper, thermal management, DC fast-charging power limits, firmware limits
			(like capping at 80%), or any other real-world variable that might affect
			charging.
		</p>

		<p class="disclaimer">
			The gasoline figure is a straight energy comparison — a US gallon of
			gasoline holds about 33.7 kWh of energy — and ignores how efficiently each
			powertrain actually uses it.
		</p>
	</div>
</main>

<style>
	.page {
		flex: 1;
		display: grid;
		place-items: center;
		padding: 4rem 1.5rem;
	}
	.inner {
		max-width: 40rem;
		text-align: center;
	}
	.title {
		margin: 0;
		font-size: clamp(2.75rem, 9vw, 4.5rem);
		font-weight: 700;
		letter-spacing: -0.02em;
		line-height: 1.05;
		color: hsl(141, 35%, 34%);
	}
	.intro {
		margin: 1.25rem auto 0;
		max-width: 34rem;
		font-size: 1.125rem;
		line-height: 1.6;
		color: var(--ink-soft);
	}
	.calculator {
		margin: 2.5rem auto 0;
		max-width: 26rem;
		padding: 1.5rem;
		border: 1px solid rgba(68, 64, 60, 0.25);
		border-radius: 12px;
		background: rgba(255, 252, 245, 0.45);
		display: grid;
		gap: 1rem;
		text-align: left;
	}
	.field {
		display: grid;
		grid-template-columns: auto 1fr auto;
		gap: 0.5rem;
		align-items: baseline;
		font-size: 0.9375rem;
	}
	.label {
		font-weight: 500;
		color: var(--ink);
	}
	.input {
		min-width: 0;
		padding: 0.375rem 0.625rem;
		border: 1px solid rgba(68, 64, 60, 0.4);
		border-radius: 8px;
		font: inherit;
		color: inherit;
		background: rgba(255, 252, 245, 0.8);
	}
	.input:focus-visible {
		outline: 2px solid var(--aura-blue);
		outline-offset: 1px;
	}
	.unit {
		min-width: 2.5rem;
		color: var(--ink-soft);
	}
	.cost-field {
		border-top: 1px solid rgba(68, 64, 60, 0.15);
		padding-top: 1rem;
	}
	.gasoline {
		padding-bottom: 1rem;
		border-bottom: 1px solid rgba(68, 64, 60, 0.15);
	}
	.gasoline .math {
		margin-top: 0.25rem;
	}
	.disclaimer {
		margin: 1.5rem auto 0;
		max-width: 34rem;
		font-size: 0.875rem;
		line-height: 1.6;
		color: var(--ink-faint);
	}
	.result {
		margin: 0;
		font-size: 1.5rem;
		font-weight: 600;
		letter-spacing: -0.01em;
		color: var(--ink);
	}
	.result-note {
		font-size: 1rem;
		font-weight: 400;
		color: var(--ink-soft);
	}
	.math {
		text-align: left;
	}
	.math-toggle {
		font-size: 0.875rem;
		color: var(--ink-soft);
		cursor: pointer;
	}
	.math-toggle:hover,
	.math-toggle:focus-visible {
		color: var(--ink);
		text-decoration: underline;
	}
	.math-toggle:focus-visible {
		outline: 2px solid var(--aura-blue);
		outline-offset: 1px;
	}
	.formula {
		margin: 0.25rem 0 0;
		font-size: 0.875rem;
		color: var(--ink-faint);
	}
	.hint {
		margin: 0;
		font-size: 0.9375rem;
		color: var(--ink-faint);
	}

	/* Lightning bolt animation that flies across screen on load */
	.lightning-bolt {
		position: fixed;
		font-size: calc(var(--scale) * 2rem);
		pointer-events: none;
		z-index: 9999;
		will-change: transform, opacity;
		animation: fly 3s linear forwards;
	}

	/* Left-side bolts start from left edge */
	.lightning-bolt.left-start {
		transform: translateX(0);
	}

	/* Right-side bolts start from bottom-right corner */
	.lightning-bolt.right-start {
		transform: translateX(calc(100vw - 2rem));
	}

	/* Respect reduced motion preferences */
	@media (prefers-reduced-motion: reduce) {
		.lightning-bolt {
			animation: none;
		}

		@keyframes fly {
			0% {
				transform: translate(calc(var(--tx) * -1));
			}
		}
	}

	@keyframes fly {
		0% {
			opacity: 0;
		}
		5% {
			opacity: 1;
		}
		95% {
			opacity: 1;
		}
		100% {
			transform: translate(var(--tx), var(--ty)) scale(0.3);
			opacity: 0;
		}
	}
</style>
