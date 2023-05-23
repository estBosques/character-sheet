<script>
	import '../app.scss';
	export let value,
		label,
		type = 'text',
		values = [],
		showModal = false,
		withModal = false;

	function displayModal(e) {
		e.preventDefault();

		showModal = true;
	}
</script>

<p class="form-input">
	{#if label}
		<div class="row">
			<label class="label col align-bottom" for>{label}:</label>
			{#if withModal}
				<button class="col btn btn-link text-end p-0" on:click={e => displayModal(e)}>Select sources</button>
			{/if}
		</div>
	{/if}
	<select class="input form-select" bind:value>
		<option selected>Select a race</option>
		{#each values as race}
			<option value={race}>{`${race.name} (${race.source})`}</option>
		{/each}
	</select>
</p>

<style>
	.form-input {
		margin: 0.5rem 0;
		text-align: left;
	}
	.input {
		width: 100%;
		display: block;
		padding: 0.5rem 0;
		margin-top: 0.5rem;
		border-width: 1px;
		border-radius: 0.25rem;
	}
</style>
