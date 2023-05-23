<script lang="ts">
	import Modal from '$lib/Modal.svelte';

	export let raceList = [{}];
	let showModal = false;
	let infoRace = {};
  let modalText = "<a>test</a>";

	function showMoreInfo(name: string, source: string) {
		infoRace = raceList.find((race) => race.name === name && race.source === source) || {};
    showModal = true;
    // FIXME: escape html to prevent xss
	}
</script>

<div class="race-list">
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
							<button
								class="btn btn-link col text-start"
								on:click={() => showMoreInfo(race.name, race.source)}
							>
								More info
							</button>
							<button class="btn btn-primary col"> Confirm </button>
						</div>
					</div>
				</div>
			</div>
			<!-- {/if} -->
		{/each}
	</div>
	<Modal bind:showModal>
		<p>{modalText}</p>
	</Modal>
</div>

<style lang="scss">
	.race-list {
		height: 25rem;
		overflow: scroll;
	}
</style>
