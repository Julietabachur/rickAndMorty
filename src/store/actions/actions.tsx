import { createAsyncThunk } from "@reduxjs/toolkit";
import { Character } from "../../interfaces/character";
import { Pagination } from "../../interfaces/pagination";
import { Episode } from '../../interfaces/episode';

const url = 'https://rickandmortyapi.com/api/character?page=';
// const urlEpisodes = 'https://rickandmortyapi.com/api/episode/';

export const fetchCharacters = createAsyncThunk<Character[], Pagination>(
    'characters/fetch',
    async({ page, pageSize })=>{
        const response = await fetch(`${url}${page}`)
        var characters = await response.json()
        characters = characters.results
        return characters.slice(0, pageSize);
    }
)

export const fetchCharactersByFilter = createAsyncThunk<Character[], Pagination>(
    'filteredCharacters/fetch',
    async({ page, pageSize, name })=>{
        const response = await fetch(`${url}${page}&name=${name}`)
        var characters = await response.json()    
        characters = characters.results
        return characters.slice(0, pageSize);
    }
)
export const fetchCharacterEpisode = createAsyncThunk<Episode, string>(
    'characterEpisode/fetch',
    async(urlEpisode)=>{
        const response = await fetch(urlEpisode)
        var episode = await response.json()
        return episode
    }
)