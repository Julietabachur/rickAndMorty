import GrillaPersonajes from "../componentes/personajes/grilla-personajes.componente";
import { deleteFavorites } from "../store/slices/characterReducer";
import { useAppDispatch, useAppSelector } from "../store/store";

/**
 * Esta es la pagina de favoritos. Aquí se deberan ver todos los personajes marcados como favoritos
 * 
 * Uso: 
 * ``` <PaginaFavoritos /> ```
 * 
 * @returns la pagina de favoritos
 */
const PaginaFavoritos = () => {

    const favorites = useAppSelector((state) => state.characters.favorites);
    const dispatch = useAppDispatch()

    return <div className="container">
        <div className="actions">
            <h3>Personajes Favoritos</h3>
            <button className="danger" onClick={()=>{dispatch(deleteFavorites())}}>Eliminar todos</button>
        </div>
        <GrillaPersonajes characters={favorites}/>
        {favorites.length == 0 && (

            <h4>Tu lista de favoritos está vacía</h4>
        )

        }
    </div>
}

export default PaginaFavoritos