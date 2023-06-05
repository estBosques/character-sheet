import type { Character } from "$src/interfaces/Character";

export function buildBaseCharacter(): Character {
  return {
    name: "",
    race: "",
  }
}