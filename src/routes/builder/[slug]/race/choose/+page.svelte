<script lang="ts">
	import RaceSelector from '$lib/characterBuilder/RaceSelector.svelte';
	import '$src/app.scss';

	import { onMount } from 'svelte';

	import type { Source } from '$src/interfaces/Source';
	import type { Book } from '$src/interfaces/Book';
	import type { Race, Races } from '$src/interfaces/Race';
	import type { RaceFluff } from '$src/interfaces/Fluff';
	import type { PageServerData } from './$types';
	import Modal from '$lib/Modal.svelte';
	import type { Character } from '$src/interfaces/Character';

	export let data: PageServerData;

	let races: Races = data.races; //{ _meta: [], race: [], subrace: [] }
	let sources: Source[] = data.sources;
	let characterData: Character = data.character;
	let selected: Race = {} as Race;

	let showModal: boolean = false;
	let showConfirmation: boolean = false;

	function handleSelect(event: CustomEvent<Race>) {
		selected = event.detail;
		console.log("🚀 ~ file: +page.svelte:27 ~ handleSelect ~ selected:", selected)
		showConfirmation = true;
	}

	$: {
		if (!showConfirmation) {
			selected = {} as Race;
		}
	}
</script>

<main class="container-fluid min-vh-100">
	<div class="col-6 mx-auto pt-5">
		<RaceSelector raceList={races.race} bind:sources on:select={handleSelect} />
		<button class=" btn btn-link text-end pt-3" on:click={(e) => (showModal = true)}>
			Select sources
		</button>
	</div>
	<!-- Select sources modal -->
	<Modal bind:showModal>
		{#each sources as source}
			<div class="form-check form-switch form-check-reverse text-start">
				<label class="form-check-label" for={source.source}>
					{`${source.name} (${source.source})`}
				</label>
				<input
					type="checkbox"
					id={source.source}
					bind:checked={source.show}
					class="form-check-input"
					role="switch"
				/>
			</div>
		{/each}
	</Modal>
	<!-- Confirmation modal -->
	<Modal bind:showModal={showConfirmation} hideCloseButton>
		<form method="post">
			<div class="row mb-4">
				<input type="radio" id="selectedRace" value={JSON.stringify(selected)} name="selectedRace" checked>
				<label for="selectedRace">{selected.name}</label>
			</div>
			<div class="row justify-content-around">
				<button type="submit" class="btn btn-primary col-3">Confirm</button>
				<button type="button" class="btn btn-secondary col-3">Cancel</button>
			</div>
		</form>
	</Modal>
</main>

<style lang="scss">
	:global(input[type='radio']) {
		visibility: hidden;
	}
</style>
