import { Episode } from "./episode";

export interface Character {
    id: number;
    name: string;
    image: string,
    episode: string[],
    genre: string,
    planet: string,
    isFavorite:boolean,
    species: string
  }