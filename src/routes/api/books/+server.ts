import type { Book } from '$src/interfaces/Book';
import type { Races } from '$src/interfaces/Race';
import type { Source } from '$src/interfaces/Source';
import type { RequestHandler } from './$types';

import fs from 'fs';

export const GET = (async () => {
	let sb: Races = { _meta: [], race: [], subrace: [] };
	let sources: Array<Source> = [];

	const resRaces = await fs.promises.readFile('./src/api/races.json', 'utf-8');
	const resBooks = await fs.promises.readFile('./src/api/books.json', 'utf-8');
	const dataRaces = await JSON.parse(resRaces);
	const dataBooks = await JSON.parse(resBooks);
	const books: Book[] = dataBooks.book;
	sb = dataRaces;

	const allRaces = [...sb.race, ...sb.subrace];

	// find all unique sources and remove source that don't exist in all books
	const tempSources: Array<Source> = allRaces.reduce((uniqueArray: Array<Source>, obj) => {
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

  return new Response(JSON.stringify(sources), {
    status: 200,
  });
}) satisfies RequestHandler;
