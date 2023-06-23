<script lang="ts">
	import Modal from '$lib/Modal.svelte';
	import { onMount, createEventDispatcher} from 'svelte';
	import parser from '$src/utils/infoParser';
	import '$src/app.scss';

	import fs from 'fs';

	import type { Race, Traits } from '$src/interfaces/Race';
	import type { Source } from '$src/interfaces/Source';
	import type { BaseEntry, Entry, RaceFluff } from '$src/interfaces/Fluff';

	export let raceList: Array<Race> = [];
	export let sources: Array<Source> = [];

	let racesToShow: Array<Race> = [];
	let showModal: boolean = false;
	let infoRace: RaceFluff = {} as RaceFluff;
	let modalTitle: string = '';
	let modalText: string = '';
	let raceFluff: Array<RaceFluff> = [];


	const dispatch = createEventDispatcher<{select: Race }>();

	$: {
		let sourcesToShow: Array<string> = sources
			.filter((source) => source.show)
			.map((source) => {
				return source.source;
			});
		racesToShow = raceList.filter((race: Race) => sourcesToShow.includes(race.source));
	}

	onMount(async () => {
		// TODO: get data from api
		const resInfo = await fetch(`/api/fluff/race`);
		const dataInfo = await resInfo.json();

		raceFluff = dataInfo.raceFluff;
	});

	function showMoreInfo(name: string, source: string) {
		infoRace =
			raceFluff.find((race) => race.name === name && race.source === source) || ({} as RaceFluff);

		if (infoRace.entries) {
			showModal = true;
			modalTitle = `${infoRace.name} (${infoRace.source})`;

			// FIXME: escape html to prevent xss

			let descriptionEntries: Entry[] = infoRace.entries;
			modalText = '';

			modalText = parser(descriptionEntries);
		}
	}

	function showBasicInfo(entries: Traits[]): string {
		// FIXME: escape html to prevent xss

		return parser(entries);
	}

	function selectRace(race: Race) {
		dispatch('select', race);
	}
</script>

<div class="race-list border border-round rounded-3">
	<div class="accordion" id="raceAccordion">
		{#each racesToShow as race, idx}
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
						{#if !race.hasOwnProperty('_copy') && race.entries}
							<!-- {#each race.entries as trait}
								{#if typeof trait !== 'string'}
									<h3 class="h6 fw-semibold">{trait.name}</h3>
									<p class="fw-light">{trait.entries}</p>
								{:else}
									<p class="fw-light">{trait}</p>
								{/if}
							{/each} -->
							<div class="row">
								{@html showBasicInfo(race.entries)}
							</div>
						{/if}
						<div class="row">
							{#if race.hasFluff}
								<button
									class="btn btn-link col text-start"
									type="button"
									on:click={() => showMoreInfo(race.name, race.source)}
								>
									More info
								</button>
							{/if}
							<button
								type="button"
								class="btn btn-primary col align-items-end"
								on:click={() => selectRace(race)}
							>
								Confirm
							</button>
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
		height: 35rem;
		overflow-y: scroll;
	}

	#modal-text {
		font-size: 0.85rem;
		text-align: left;
		text-indent: 1rem;

		:global(.entry_with_title) {
			margin-bottom: 1rem;

			:global(.entry_title) {
				margin-top: 1rem;
			}

			:global(p) {
				text-indent: 1rem;
				margin-bottom: 0;
			}
		}

		:global(.alert) {
			:global(.callout) {
				margin-top: 0;
				margin-bottom: 0.5rem;
			}
			:global(p) {
				margin-bottom: 0;
			}
		}
	}
</style>
