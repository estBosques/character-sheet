<script>
	import InputField from './InputField.svelte';
	import SelectField from './SelectField.svelte';
	import Modal from './Modal.svelte';
	import { onMount } from 'svelte';

	export let active_step;
	let formData = {
		name: '',
		race: {},
		class: '',
		alignment: ''
	};

	let sb = { races: [] };
	let sources = [];
	let showModal = false;

	$: console.log(showModal);

	const handleSubmit = () => {
		console.log('Your form data => ', formData);
	};

	onMount(async () => {
		const resRaces = await fetch('./src/api/races.json');
		const resBooks = await fetch('./src/api/books.json');
		const dataRaces = await resRaces.json();
		const dataBooks = await resBooks.json();
		const books = dataBooks.book;
		sb = dataRaces;

		const allRaces = [...sb.race, ...sb.subrace]

		sources = allRaces.reduce((uniqueArray, obj) => {
			const existingObj = uniqueArray.find((item) => item.source === obj.source);
			if (!existingObj) {
				uniqueArray.push({ source: obj.source, show: true });
			}
			return uniqueArray;
		}, []);

		sources = sources.map(src => {
			const match = books.find(book => book.source === src.source);
			if (!match) return;
			return { ...src, name: match.name };
		}).filter(src => src !== undefined);
	});
</script>

<form class="form-container" on:submit={handleSubmit}>
	{#if active_step == 'Info'}
		<InputField label={'Name'} bind:value={formData.name} />
		<!-- <SelectField label={'Alignment'} bind:value={formData.alignment} /> -->
	{:else if active_step == 'Race'}
		<SelectField
			label={'Race'}
			values={sb.races}
			withModal
			bind:value={formData.race}
			bind:showModal
		/>
		<Modal bind:showModal>
			{#each sources as source}
				<div class="form-check form-switch form-check-reverse text-start">
					<label class="form-check-label" for={source.source}>{`${source.name} (${source.source})`}</label>
					<input type="checkbox" id={source.source} bind:checked={source.show} class="form-check-input" role="switch">
				</div>
			{/each}
		</Modal>
	{/if}
</form>

<style>
	.form-container {
		background-color: #fff;
		border-radius: 10px;
		box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1), 0 6px 6px rgba(0, 0, 0, 0.1);
		padding: 50px 20px;
		text-align: center;
		max-width: 100%;
		width: 350px;
	}
	.btn {
		color: white;
		padding: 0.5rem 0;
		margin-top: 0.5rem;
		display: inline-block;
		width: 100%;
		border-radius: 0.25rem;
		cursor: pointer;
	}
	.submit {
		background: linear-gradient(to bottom, #44c767 5%, #50b01c 100%);
		background-color: #44c767;
	}
	.submit:hover {
		background: linear-gradient(to bottom, #50b01c 5%, #44c767 100%);
		background-color: #50b01c;
	}
	.message {
		text-align: center;
	}
</style>
