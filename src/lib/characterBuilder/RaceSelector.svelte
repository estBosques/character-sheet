<script lang="ts">
	import Modal from '$lib/Modal.svelte';
	import { onMount } from 'svelte';
	import '$src/app.scss';

	export let raceList = [{}];
	let showModal = false;
	let infoRace = {};
	let modalTitle = '';
	let modalText = '';
	let fluff: any[] = [];

	onMount(async () => {
		const resInfo = await fetch('./src/api/fluff-races.json');
		const dataInfo = await resInfo.json();

		fluff = dataInfo.raceFluff;

		raceList = raceList.map((race) => {
			let hasInfo = fluff.find((f) => f.name === race.name && f.source === race.source);
			return { ...race, hasInfo: typeof hasInfo !== 'undefined' };
		});
	});

	function parseTable(entries: any[]) {
		modalText = `${modalText}<table class="table table-striped"><thead>`;

		//add column labels
		for (const i in el.colLabels) {
			modalText = `${modalText}<th class="${el.colStyles[i]}">${el.colLabels[i]}</th>`;
		}
		modalText = `${modalText}</thead><tbody>`;

		//add rows
		for (const row of el.rows) {
			modalText = `${modalText}<tr>`;
			for (const cell of row) {
				modalText = `${modalText}<td>${cell}</td>`;
			}
			modalText = `${modalText}</tr>`;
		}
		modalText = `${modalText}</tbody></table>`;
	}

	function parseInset(entries: any[]) {
		modalText = `${modalText}<div class="alert alert-secondary mt-3"><p class="entry"><strong>${el.name}</strong></p>`;

		//add paragraph to callout
		for (const i in el.entries) {
			modalText = `${modalText}<p>${el.entries[i]}</p>`;
		}
		modalText = `${modalText}</div>`;
	}

	function parseTextWithTitle(entries: any[]) {
		modalText = `${modalText}<p class="entry"><strong>${el.name}. </strong>`; // add title, let the p tag open

		// add each entry as paragraph
		parseDescription(el.entries, true);
		modalText = `${modalText}<p>`;
	}

	function parseDescription(entries: any[], openTag: boolean = false) {
		// go through each entry
		entries.forEach((el: {} | String) => {
			// if element is a string just add it as a paragraph
			if (typeof el === 'string') modalText = `${modalText}<p>${el}</p>`;
			// if element is an object, check what type of object
			else if (typeof el === 'object') {
				// if it is an object check if it is an entry (aka. regular text)
				if (el.type === 'entries') {
					// if it is an entry, check if it has a name (aka. title)
					if (el.hasOwnProperty('name')) parseTextWithTitle(el.entries);
					// if it doesn't have a title, then you need to parse it
					else parseDescription(el.entries);

					// if it is not an entry, check if it is an inset (aka. callout)
				} else if (el.type === 'inset') parseInset(el.entries);
				else if (el.type === 'table') parseTable(el.entries);
			}
		});
	}

	function showMoreInfo(name: string, source: string) {
		infoRace = fluff.find((race) => race.name === name && race.source === source) || {};
		showModal = true;
		modalTitle = `${infoRace.name} (${infoRace.source})`;

		// FIXME: escape html to prevent xss

		let description = infoRace.entries;
		modalText = '';

		// TODO: remove this
		if (infoRace.entries.length > 1) {
			console.warn(infoRace.entries);

			if (typeof infoRace.entries[0] !== 'string' && infoRace.entries[0].entries.length > 1) {
				console.warn(infoRace.entries[0].entries);
			}
		}

		parseDescription(description);
	}
</script>

<div class="race-list border border-round rounded-3">
	<div class="accordion" id="raceAccordion">
		{#each raceList as race, idx}
			<!-- {#if race.show} -->
			<div class="accordion-item">
				<h2 class="accordion-header">
					<button
						type="button"
						class="accordion-button collapsed"
						data-bs-toggle="collapse"
						data-bs-target="#collapse{idx}"
						aria-expanded="false"
						aria-controls="collapse{idx}"
					>
						{`${race.name} (${race.source})`}
					</button>
				</h2>
				<div class="accordion-collapse collapse" id="collapse{idx}" data-bs-parent="#raceAccordion">
					<div class="accordion-body text-start">
						{#if !race.hasOwnProperty('_copy')}
							{#each race.entries as entry}
								<h3 class="h6 fw-semibold">{entry.name}</h3>
								<p class="fw-light">{entry.entries}</p>
							{/each}
						{/if}
						<div class="row">
							{#if race.hasInfo}
								<button
									class="btn btn-link col text-start"
									on:click={() => showMoreInfo(race.name, race.source)}
								>
									More info
								</button>
							{/if}
							<button class="btn btn-primary col align-items-end"> Confirm </button>
						</div>
					</div>
				</div>
			</div>
			<!-- {/if} -->
		{/each}
	</div>
	<Modal bind:showModal>
		<h2 slot="header">{modalTitle}</h2>
		<p id="modal-text">{@html modalText}</p>
	</Modal>
</div>

<style lang="scss">
	.race-list {
		height: 25rem;
		overflow-y: scroll;
	}

	#modal-text {
		font-size: 0.85rem;
		text-align: left;
		text-indent: 1rem;

		:global(.entry) {
			margin-top: 1rem;
			text-indent: 0;
		}

		:global(.alert) {
			:global(.entry) {
				margin-top: 0;
			}
		}

		:global(p) {
			margin-bottom: 0;
		}
	}
</style>
