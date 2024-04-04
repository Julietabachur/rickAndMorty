import { setCurrentPage } from '../../store/slices/characterReducer';
import { useAppDispatch, useAppSelector } from '../../store/store';
import './paginacion.css';

/**
 * Componente que contiene los botones para paginar
 * 
 * Deberás agregar las propiedades necesarias para que funcione correctamente
 * 
 * 
 * @returns un JSX element 
 */
const Paginacion = () => {

    const currentPage = useAppSelector((state) => state.characters.currentPage);
    const dispatch = useAppDispatch();

    /**
     * Función para ir a la página anterior.
     */
    const goToPreviousPage = () => {
        if (currentPage > 1) {
          dispatch(setCurrentPage(currentPage - 1));
        }
      };
    
    /**
     * Función para ir a la página siguiente.
     */
      const goToNextPage = () => {
        dispatch(setCurrentPage(currentPage + 1));
      };

    return <div className="paginacion">
        <button disabled={currentPage === 1  ? true : false} className={"primary"} onClick={goToPreviousPage}>Anterior</button>
        <button disabled={false} className={"primary"} onClick={goToNextPage}>Siguiente</button>
    </div>
}

export default Paginacion;