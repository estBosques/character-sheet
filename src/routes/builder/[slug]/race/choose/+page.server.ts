import { buildBaseCharacter } from '$src/utils/character';
import type { Source } from '$src/interfaces/Source';
import type { Races } from '$src/interfaces/Race.js';

/** @type {import('./$types').PageServerLoad} */
export const load = async ({ cookies, fetch }) => {
	// Load cookies
	const data = cookies.get('character-data');
	const character = data ? JSON.parse(data) : buildBaseCharacter();

	// TODO: add env flag
	console.log('[/builder/[slug]/race/choose] Loading data from cookies: ', character);

	if (!character) {
		// TODO: add env flag
		console.log('🚀 ~ file: +page.server.js:8 ~ load ~ character:', character);

		const baseCharacter = buildBaseCharacter();
		cookies.set('character-data', JSON.stringify(baseCharacter), {
			path: '/'
		});
	}

	// Fetch race and books data
	const resBooks = await fetch(`/api/books`);
	const sources: Source[] = await resBooks.json();

	const resRaces = await fetch(`/api/races`);
	const races: Races = await resRaces.json();

	return {
		character,
		sources,
		races
	};
};
