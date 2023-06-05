<script lang="ts">
	import RaceSelector from '$lib/characterBuilder/RaceSelector.svelte';
	import '$src/app.scss';

	import { onMount } from 'svelte';

  import type { Source } from '$src/interfaces/Source';
  import type { Book } from '$src/interfaces/Book';
  import type { Race, Races } from '$src/interfaces/Race';
  import type { RaceFluff } from '$src/interfaces/Fluff';
	import type { PageServerData } from './$types';

	export let data: PageServerData;

  let races: Races = data.races; //{ _meta: [], race: [], subrace: [] }
	let sources: Source[] = data.sources;

	onMount(async () => {
		// const test = await fetch(`/books`);
		// const resRaces = await fetch('./src/api/races.json');
		// const resBooks = await fetch('./src/api/books.json');
		// const dataBooks = await resBooks.json();
    // sb = await resRaces.json();

		// const books: Book[] = dataBooks.book;

		// const allRaces = [...sb.race, ...sb.subrace];

		// // find all unique sources and remove source that don't exist in all books
		// let tempSources: Array<Source> = allRaces.reduce((uniqueArray: Array<Source>, obj) => {
		// 	const existingObj: Source | undefined = uniqueArray.find(
		// 		(item: Source) => item.source === obj.source
		// 	);
		// 	if (!existingObj) {
		// 		// validates that the race source has a book and the book is not a supplement
		// 		const match = books.find(
		// 			(book: Book) => obj.source === book.source && book.group !== 'supplement-alt'
		// 		);
		// 		if (match)
		// 			// if the source exists in the books array, push it
		// 			uniqueArray.push({ source: obj.source, show: obj.source === 'PHB', name: match.name });
		// 	}
		// 	// otherwise push the source
		// 	return uniqueArray;
		// }, []);

		// // sort the sources
		// sources = tempSources
		// 	.filter((src: Source) => src !== undefined)
		// 	.sort((a: Source, b: Source) => {
		// 		const nameA: string = a.name ? a.name.toUpperCase() : '';
		// 		const nameB: string = b.name ? b.name.toUpperCase() : '';

		// 		if (nameA < nameB) {
		// 			return -1;
		// 		}
		// 		if (nameA > nameB) {
		// 			return 1;
		// 		}
		// 		return 0;
		// 	});
	});
</script>

<main class="container-fluid min-vh-100">
	<div class="col-6 mx-auto pt-5">
		<RaceSelector raceList={races.race} bind:sources/>
	</div>
</main>
