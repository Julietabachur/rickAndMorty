import './boton-favorito.css';
import { toggleFavorite } from "../../store/slices/characterReducer";
import { useAppDispatch } from '../../store/store';
import { GoStar } from "react-icons/go";
import { GoStarFill } from "react-icons/go";


/**
 * Boton que indica si un elemento es favorito o no, y da la posibilidad de marcarlo/desmarcarlo
 * 
 * Deberás tipar las propiedades si usas este componente
 * 
 * 
 * @returns un JSX element 
 */
const BotonFavorito = ({esFavorito, character, imgStyle}) => {

    const dispatch = useAppDispatch();

    // const src = esFavorito ? "/imagenes/A_star-filled.png" : "/imagenes/A_star.png"

    return (        
        <div className="boton-favorito d-flex justify-content-center align-items-center " onClick={()=>{dispatch(toggleFavorite({ character }))}}>
            {/* <img src={src} alt={"favorito"} style={imgSize}/> */}
            {
                esFavorito ?
                <GoStarFill style={imgStyle}/>
                :
                <GoStar style={imgStyle}/>
            }
        </div>
        )
}

export default BotonFavorito;