import Filtros from "../componentes/personajes/filtros.componente"
import GrillaPersonajes from "../componentes/personajes/grilla-personajes.componente"
import Paginacion from "../componentes/paginacion/paginacion.componente";
import { useAppDispatch, useAppSelector } from "../store/store";
import { useEffect } from "react";
import { fetchCharacters, fetchCharactersByFilter } from "../store/actions/actions";
import { cleanFilters } from "../store/slices/characterReducer";
import { FaDeleteLeft } from "react-icons/fa6";
 
/**
 * Esta es la pagina principal. Aquí se debera ver el panel de filtros junto con la grilla de personajes.
 * 
 * Uso: 
 * ``` <PaginaInicio /> ```
 * 
 * @returns la pagina de inicio
*/
const PaginaInicio = () => {    
    
    const dispatch = useAppDispatch();
    const characters = useAppSelector((state) => state.characters.characters);
    const filteredCharacters = useAppSelector((state) => state.characters.filteredCharacters);
    const currentPage = useAppSelector((state) => state.characters.currentPage);    
    const name = useAppSelector((state) => state.characters.filterText);    
    const pageSize = 18;

    /**
     * Efecto para cargar los personajes al montar la página o al cambiar de página.
     */
    useEffect(() => {
        dispatch(fetchCharacters({ page: currentPage, pageSize }));
    }, [currentPage]);

    /**
     * Efecto para filtrar los personajes al cambiar de página o al modificar el filtro por nombre.
     */
    useEffect(() => {
        dispatch(fetchCharactersByFilter({ page: currentPage, pageSize, name }));
    }, [currentPage, name]);


    return  <div className="container">
                <div className="actions">
                    <h3  style={{'color': "rgb(17 223 255)"}}>Conoce los personajes</h3>
                    <button className="danger" onClick={()=>{dispatch(cleanFilters(''))}}><FaDeleteLeft style={{ color: '#ffffff', marginRight: '5px' }}/>Limpiar filtros</button>
                </div>
                <Filtros/>
                <Paginacion />
                <GrillaPersonajes characters={filteredCharacters.length > 0 ? filteredCharacters : characters} />
                <Paginacion />
            </div>
}

export default PaginaInicio