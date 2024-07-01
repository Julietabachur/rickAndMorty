import GrillaPersonajes from "../componentes/personajes/grilla-personajes.componente";
import { deleteFavorites } from "../store/slices/characterReducer";
import { useAppDispatch, useAppSelector } from "../store/store";
import { BsFillTrash3Fill } from "react-icons/bs";

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
  const dispatch = useAppDispatch();

  return (
    <div className="container">
      <div className="actions  mb-5">
        <h3>Personajes Favoritos</h3>
        <button
          className="danger"
          onClick={() => {
            dispatch(deleteFavorites());
          }}
        >
          <BsFillTrash3Fill style={{ color: "#ffffff", marginRight: "5px" }} />
          Eliminar todos
        </button>
      </div>
      <GrillaPersonajes characters={favorites} />
      {favorites.length == 0 && (
        <h5 style={{ color: "rgb(17 223 255)" }}>
          Tu lista de favoritos está vacía
        </h5>
      )}
    </div>
  );
};

export default PaginaFavoritos;
