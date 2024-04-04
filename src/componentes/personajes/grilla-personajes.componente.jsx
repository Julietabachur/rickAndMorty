import { useAppSelector } from '../../store/store';
import './grilla-personajes.css';
import TarjetaPersonaje from './tarjeta-personaje.componente';

/**
 * Grilla de personajes para la pagina de inicio
 * 
 * Deberás agregar las funciones necesarias para mostrar y paginar los personajes
 * 
 * 
 * @returns un JSX element 
 */
const GrillaPersonajes = ({characters}) => {

    const stateStatus = useAppSelector((state) => state.characters.status);
    const statusMessage = useAppSelector((state) => state.characters.statusMessage);

    return (

        <div className="grilla-personajes">
        {
            stateStatus == 'loading' || stateStatus == 'rejected' ?
            <h3>{statusMessage}</h3>
            :
            characters.map((character)=>(
            <TarjetaPersonaje key={character.id} character={character}/>
            ))
        }
        </div>
        )
}
 
export default GrillaPersonajes;