import { Character } from "./character";
import { Episode } from "./episode";

export interface CharacterState {

    characters: Character[],
    favorites: Character[],
    filteredCharacters: Character[],
    episodes: Episode[],
    status: 'loading'|'idle'| 'rejected',
    currentPage: number,
    filterText: string,
    characterDetails: Character,
    statusMessage: string
}