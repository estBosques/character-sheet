<script lang="ts">
	import InputField from '../InputField.svelte';
	import RaceSelector from '$lib/characterBuilder/RaceSelector.svelte';
	import Modal from '../Modal.svelte';
	import { onMount } from 'svelte';
	import '$src/app.scss';
	import type { Race, Races, Subrace } from '$src/interfaces/Race';
	import type { Book } from '$src/interfaces/Book';
	import type { Source } from '$src/interfaces/Source';

	export let active_step: string;
	let formData = {
		name: '',
		race: {},
		class: '',
		alignment: ''
	};

	let sb: Races = { _meta: [], race: [], subrace: [] };
	let sources: Array<Source> = [];
	let showModal = false;

	let alignments = [
		{
			name: 'Lawful Good (LG)',
			value: 'LG',
			description:
				'Creatures that can be counted on to do the right thing as expected by society. Gold dragons and paladins are typically lawful good.'
		},
		{
			name: 'Neutral Good (NG)',
			value: 'NG',
			description:
				'Folk who do the best they can to help others according to their needs. Many celestials are neutral good.'
		},
		{
			name: 'Chaotic Good (CG)',
			value: 'CG',
			description:
				'Creatures that act as their conscience directs, with little regard for what others expect. Copper dragons and unicorns are typically chaotic good.'
		},
		{
			name: 'Lawful Neutral (LN)',
			value: 'LN',
			description:
				'Individuals that act in accordance with law, tradition, or personal codes. Modrons and many wizards and monks are lawful neutral.'
		},
		{
			name: 'Neutral (N)',
			value: 'N',
			description:
				"Those who prefer to steer clear of moral questions and don't take sides, doing what seems best at the time. Druids are traditionally neutral, as are typical townsfolk."
		},
		{
			name: 'Chaotic Neutral (CN)',
			value: 'CN',
			description:
				'Those who follow their whims, holding their personal freedom above all else. Many rogues and bards are chaotic neutral.'
		},
		{
			name: 'Lawful Evil (LE)',
			value: 'LE',
			description:
				'Those who methodically take what they want, within the limits of a code of tradition, loyalty, or order. Devils and blue dragons are typically lawful evil.'
		},
		{
			name: 'Neutral Evil (NE)',
			value: 'NE',
			description:
				'Those who do whatever they can get away with, without compassion or qualms. Yugoloths are typically neutral evil.'
		},
		{
			name: 'Chaotic Evil (CE)',
			value: 'CE',
			description:
				'Ceatures that act with arbitrary violence, spurred by their greed, hatred, or bloodlust. Demons and red dragons are typically chaotic evil.'
		}
	];

	const handleSubmit = () => {
		console.log('Your form data => ', formData);
	};

	onMount(async () => {
		const resRaces = await fetch('./src/api/races.json');
		const resBooks = await fetch('./src/api/books.json');
		const dataRaces = await resRaces.json();
		const dataBooks = await resBooks.json();
		const books: Book[] = dataBooks.book;
		sb = dataRaces;

		const allRaces = [...sb.race, ...sb.subrace];

		// find all unique sources and remove source that don't exist in all books
		let tempSources: Array<Source> = allRaces.reduce((uniqueArray: Array<Source>, obj) => {
			const existingObj: Source | undefined = uniqueArray.find(
				(item: Source) => item.source === obj.source
			);
			if (!existingObj) {
				// validates that the race source has a book and the book is not a supplement
				const match = books.find(
					(book: Book) => obj.source === book.source && book.group !== 'supplement-alt'
				);
				if (match)
					// if the source exists in the books array, push it
					uniqueArray.push({ source: obj.source, show: obj.source === 'PHB', name: match.name });
			}
			// otherwise push the source
			return uniqueArray;
		}, []);

		// sort the sources
		sources = tempSources
			.filter((src: Source) => src !== undefined)
			.sort((a: Source, b: Source) => {
				const nameA: string = a.name ? a.name.toUpperCase() : '';
				const nameB: string = b.name ? b.name.toUpperCase() : '';

				if (nameA < nameB) {
					return -1;
				}
				if (nameA > nameB) {
					return 1;
				}
				return 0;
			});
	});
</script>

<form class="form-container col-12" on:submit={handleSubmit}>
	{#if active_step == 'Info'}
		<InputField label={'Name'} bind:value={formData.name} />
		<!-- <SelectField label={'Alignment'} bind:value={formData.alignment} /> -->
	{:else if active_step == 'Race'}
		<!-- <RaceSelector raceList={sb.race} bind:sources /> -->
		<button class=" btn btn-link text-end pt-3" on:click={(e) => (showModal = true)}
			>Select sources</button
		>
		<Modal bind:showModal>
			{#each sources as source}
				<div class="form-check form-switch form-check-reverse text-start">
					<label class="form-check-label" for={source.source}
						>{`${source.name} (${source.source})`}</label
					>
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
	{/if}
</form>

<style lang="scss">
	.form-container {
		background-color: #fff;
		border-radius: 10px;
		box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1), 0 6px 6px rgba(0, 0, 0, 0.1);
		padding: 50px 20px;
		text-align: center;
	}
</style>
