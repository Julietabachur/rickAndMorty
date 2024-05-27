    import { Link } from 'react-router-dom';
import BotonFavorito from '../botones/boton-favorito.componente';
import './tarjeta-personaje.css';
import { useAppDispatch } from '../../store/store';
import { setCharacterDetails } from '../../store/slices/characterReducer';

/**
 * Tarjeta para cada personaje dentro de la grilla de personajes. 
 * 
 * Deberás agregar las propiedades necesarias para mostrar los datos de los personajes
 * 
 * 
 * @param {Object} character - La información del personaje a mostrar en la tarjeta.
 * @returns {JSX.Element} Elemento JSX que representa la tarjeta del personaje.
 */
const TarjetaPersonaje = ({character}) => {

    const dispatch = useAppDispatch()

    return (
                <div className="tarjeta-personaje card">
                    <Link to="/detalle" onClick={()=>{dispatch(setCharacterDetails(character))}}>
                        <img src={character.image} alt={character.name}/>
                    </Link>  
                    <div className="tarjeta-personaje-body">
                        <Link to="/detalle" onClick={()=>{dispatch(setCharacterDetails(character))}} style={{textDecoration: 'none'}}>
                            <span style={{color:'#12a8bf', textDecoration: 'none'}}>{character.name}</span>
                        </Link>  
                        <BotonFavorito character={character} esFavorito={character.isFavorite} imgStyle={{fontSize: '30px', color: '#c0d55d'}}/>
                    </div>
                </div>
    )
}

export default TarjetaPersonaje;