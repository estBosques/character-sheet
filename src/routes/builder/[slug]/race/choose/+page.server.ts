import { buildBaseCharacter } from '$src/utils/character';
import type { Source } from '$src/interfaces/Source';
import type { Race, Races } from '$src/interfaces/Race.js';
import type { PageServerLoad } from '../$types';
import type { Actions } from './$types';
import type { Character } from '$src/interfaces/Character';

const CHARACTER_COOKIE = 'character-data'

export const load = (async ({ cookies, fetch }) => {
	// Load cookies
	const data = cookies.get('character-data');
	const character = data ? JSON.parse(data) : buildBaseCharacter();

	// TODO: add env flag
	console.log('[/builder/[slug]/race/choose] Loading data from cookies: ', character);

	if (!character) {
		// TODO: add env flag
		const baseCharacter = buildBaseCharacter();
		cookies.set(CHARACTER_COOKIE, JSON.stringify(baseCharacter), {
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
}) satisfies PageServerLoad;

export const actions: Actions = {
	default: async ({ request, cookies }) => {
		// fetch the data from the form
		const data = await request.formData();
		const race = data.get('selectedRace') as string;
		const selectedRace: Race = JSON.parse(race)

		// fetch current character cookie
		const charDataCookie = cookies.get(CHARACTER_COOKIE);
		const charData: Character = charDataCookie ? JSON.parse(charDataCookie) : buildBaseCharacter();
		charData.race = selectedRace;
		
		// sets character cookie
		cookies.set(CHARACTER_COOKIE, JSON.stringify(charData));
	}
};
