import './filtros.css';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { filterBy } from '../../store/slices/characterReducer';

/**
 * Componente que proporciona filtros para buscar personajes por nombre.
 * 
 * @returns {JSX.Element} Elemento JSX que contiene los filtros de búsqueda por nombre.
 */
const Filtros = () => {


    const dispatch = useAppDispatch();
    const name = useAppSelector((state) => state.characters.filterText);

    /**
     * Manejador para el cambio en el filtro de nombre.
     * 
     * @param {Event} event - El evento de cambio.
     */
    const handleInputFilter = (event) =>{
        const name = event.target.value
        dispatch(filterBy(name))
    }


    return <div className="filtros">
        <label htmlFor="nombre" className='title'>Busca tu personaje favorito por nombre:</label>
        <input type="text" placeholder="Rick, Morty, Beth, Alien, ...etc" name="nombre" id="nombre" value={name} onChange={handleInputFilter}/>
    </div>
}

export default Filtros;