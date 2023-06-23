import type { RaceFluff } from "./Fluff";
import type { Race } from "./Race";

export interface Character {
  name: string;
  race: Race;
}

export interface CharacterRace {
  fluff: RaceFluff;
}