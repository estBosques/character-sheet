import type { RaceFluff } from "./Fluff";

export interface Character {
  name: string;
  race: string;
}

export interface CharacterRace {
  fluff: RaceFluff;
}