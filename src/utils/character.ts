import type { Character } from "$src/interfaces/Character";
import type { Race } from "$src/interfaces/Race";

export function buildBaseCharacter(): Character {
  return {
    name: "",
    race: {} as Race,
  }
}