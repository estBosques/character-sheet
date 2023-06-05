import { buildBaseCharacter } from '$src/utils/character';

export async function load({ cookies }) {
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

  return {
    character
  }
}
