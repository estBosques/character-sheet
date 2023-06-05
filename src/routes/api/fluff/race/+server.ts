import type { RaceFluff } from '$src/interfaces/Fluff';
import type { RequestHandler } from '@sveltejs/kit';

import fs from 'fs';

export const GET = (async () => {
	const resFluff = await fs.promises.readFile('./src/api/fluff-races.json', 'utf-8');
	const dataFluff = await JSON.parse(resFluff);
	const fluff: RaceFluff[] = dataFluff;

	return new Response(JSON.stringify(fluff), {
		status: 200
	});
}) satisfies RequestHandler;
