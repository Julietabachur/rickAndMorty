import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchCharacterEpisode, fetchCharacters, fetchCharactersByFilter } from '../actions/actions';
import { CharacterState } from "../../interfaces/characterState";
import { Episode } from '../../interfaces/episode';
import { Character } from '../../interfaces/character';

/**
 * Estado inicial del slice de Redux para los personajes.
 * @type {CharacterState}
 */
const initialState: CharacterState = {
    characters: [],
    favorites: [],
    filteredCharacters:[],
    episodes:[],
    status:'idle',
    statusMessage:'',
    currentPage: 1,
    filterText: "",
    characterDetails: null
}

/**
 * Slice de Redux para manejar el estado relacionado con los personajes.
 */
export const charactersSlice = createSlice({
    name: "characters",
    initialState,
    reducers: {
        /**
         * Alternar la propiedad "isFavorite" de un personaje y actualizar la lista de favoritos.
         * @param {CharacterState} state - El estado actual del slice.
         * @param {PayloadAction<{ character: Character }>} action - La acción que contiene el personaje.
         */
        toggleFavorite: (state, action) => {
            debugger
            const  favCharacter = action.payload.character
            const index = state.characters.findIndex(character => character.id === favCharacter.id);
            if (index !== -1) {
                state.characters[index].isFavorite = !state.characters[index].isFavorite; 
            }
            const filterIndex = state.filteredCharacters.findIndex(character => character.id === favCharacter.id);
            if (filterIndex !== -1) {
                state.filteredCharacters[filterIndex].isFavorite = !state.filteredCharacters[filterIndex].isFavorite; 
            }

            const favIndex = state.favorites.findIndex(character => character.id === favCharacter.id);
            if (favIndex === -1) {                
                state.favorites.push({...favCharacter, isFavorite:true});         
                if (state.characterDetails != null) {
                    state.characterDetails.isFavorite = true;
                }
            } else {
                state.favorites.splice(favIndex, 1);
                if (state.characterDetails != null) {
                    state.characterDetails.isFavorite = false;
                }
            }
        },
        /**
         * Establecer la página actual.
         * @param {CharacterState} state - El estado actual del slice.
         * @param {PayloadAction<number>} action - La acción que contiene el número de página.
         */
        setCurrentPage: (state, action: PayloadAction<number>) => {
            state.currentPage = action.payload;
        },
        /**
         * Eliminar todos los personajes de la lista de favoritos.
         * @param {CharacterState} state - El estado actual del slice.
         */
        deleteFavorites: (state)=>{
            state.favorites=[]
        },      
        /**
         * Filtrar la lista de personajes por un texto específico.
         * @param {CharacterState} state - El estado actual del slice.
         * @param {PayloadAction<string>} action - La acción que contiene el texto de filtrado.
         */
        filterBy: (state, action: PayloadAction<string>) =>{
            state.filterText = action.payload
        },
        /**
         * Limpiar los filtros aplicados y restablecer el estado del filtrado.
         * @param {CharacterState} state - El estado actual del slice.
         */
        cleanFilters: (state)=>{            
            state.filteredCharacters= [];
            state.filterText=''            
        },   
        /**
         * Establecer los detalles de un personaje.
         * @param {CharacterState} state - El estado actual del slice.
         * @param {PayloadAction<Character>} action - La acción que contiene los detalles del personaje.
         */    
        setCharacterDetails:(state, action: PayloadAction<Character>)=>{
            const char = action.payload
            const isFavorite = state.favorites.some(fav => fav.id === char.id);
            state.characterDetails= { ...char, isFavorite: isFavorite }                
        }
    },
    extraReducers:(builder) =>{
        /**
         * Reducer para obtener los personajes.
         */
        builder.addCase(fetchCharacters.pending, (state) => {
            state.status = "loading";
            state.statusMessage='Buscando personajes...'
        });
        builder.addCase(fetchCharacters.fulfilled,  (state, { payload }) => {
            state.characters = payload.map((character) => {
            const isFavorite = state.favorites.some(fav => fav.id === character.id);
            return { ...character, isFavorite: isFavorite };
        });
            state.status = "idle";
        });
        builder.addCase(fetchCharacters.rejected, (state) => {            
            state.status = "rejected";
            state.statusMessage='Error al mostrar los personajes'
        });

        /**
         * Reducer para filtrar los personajes.
         */
        builder.addCase(fetchCharactersByFilter.pending, (state) => {
            state.status = "loading";
            state.statusMessage='Filtrando personajes...'
        });
        builder.addCase(fetchCharactersByFilter.fulfilled,  (state, { payload }) => {
            state.filteredCharacters = payload.map((character) => {
            const isFavorite = state.favorites.some(fav => fav.id === character.id);
            return { ...character, isFavorite: isFavorite };
            });
            state.status = "idle";
        });
        builder.addCase(fetchCharactersByFilter.rejected, (state) => {            
            state.status = "rejected";
            state.statusMessage='Error al filtrar los personajes'
        });

        /**
         * Reducer para obtener los episodios.
         */
        builder.addCase(fetchCharacterEpisode.pending, (state) => {
            state.status = "loading";
            state.statusMessage='Cargando episodios...'
        });
        builder.addCase(fetchCharacterEpisode.fulfilled,  (state, { payload }) => {
            state.episodes = [...state.episodes, payload];
            state.status = "idle";            
        });
        builder.addCase(fetchCharacterEpisode.rejected, (state) => {            
            state.status = "rejected";
            state.statusMessage='Error al cargar los episodios'
            
        });

    }
});

export const { toggleFavorite, setCurrentPage, deleteFavorites, cleanFilters, filterBy,setCharacterDetails } = charactersSlice.actions;
export default charactersSlice.reducer;