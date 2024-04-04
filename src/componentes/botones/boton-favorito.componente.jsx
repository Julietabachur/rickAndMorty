import './boton-favorito.css';
import { toggleFavorite } from "../../store/slices/characterReducer";
import { useAppDispatch } from '../../store/store';
import { useState } from 'react';


/**
 * Boton que indica si un elemento es favorito o no, y da la posibilidad de marcarlo/desmarcarlo
 * 
 * Deberás tipar las propiedades si usas este componente
 * 
 * 
 * @returns un JSX element 
 */
const BotonFavorito = ({esFavorito, character}) => {

    const dispatch = useAppDispatch();

    const src = esFavorito ? "/imagenes/star-filled.png" : "/imagenes/star.png"

    return (        
        <div className="boton-favorito" onClick={()=>{dispatch(toggleFavorite({ character }))}}>
            <img src={src} alt={"favorito"} />
        </div>
        )
}

export default BotonFavorito;