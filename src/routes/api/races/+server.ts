import type { Races } from "$src/interfaces/Race";
import type { RequestHandler } from "@sveltejs/kit";

import fs from 'fs'

export const GET = (async () => {
	const resRaces = await fs.promises.readFile('./src/api/races.json', 'utf-8');
	const dataRaces: Races = await JSON.parse(resRaces);
	const races: Races = dataRaces;

	return new Response(JSON.stringify(races), {
		status: 200
	});
}) satisfies RequestHandler;
