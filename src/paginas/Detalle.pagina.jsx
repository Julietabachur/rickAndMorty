import "./Detalle.css";
import BotonFavorito from "../componentes/botones/boton-favorito.componente";
import TarjetaEpisodio from "../componentes/episodios/tarjeta-episodio.componente";
import { useAppDispatch, useAppSelector } from "../store/store";
import { useEffect } from "react";
import { fetchCharacterEpisode } from "../store/actions/actions";

/**
 * Esta es la pagina de detalle. Aqui se puede mostrar la vista sobre el personaje seleccionado junto con la lista de episodios en los que aparece
 *
 * EL TRABAJO SOBRE ESTE ARCHIVO ES OPCIONAL Y NO ES REQUISITO DE APROBACION
 *
 *
 *
 * Uso:
 * ``` <PaginaDetalle /> ```
 *
 * @returns la pagina de detalle
 */
const PaginaDetalle = () => {
  const dispatch = useAppDispatch();
  const character = useAppSelector(
    (state) => state.characters.characterDetails
  );
  const episodes = useAppSelector((state) => state.characters.episodes);

  const stateStatus = useAppSelector((state) => state.characters.status);
  const statusMessage = useAppSelector(
    (state) => state.characters.statusMessage
  );

  /**
   * Efecto para cargar los episodios del personaje al montar la página.
   */
  useEffect(() => {
    const characterEpisodes = character.episode;
    characterEpisodes.forEach((episode) => {
      dispatch(fetchCharacterEpisode(episode));
    });
  }, []);

  return (
    <div className="container-detalle ">
      <div className="detalle">
        <div className={"detalle-header "}>
          <img
            src={character.image}
            alt={character.name}
            style={{ borderRadius: "50%" }}
          />
          <div className={"detalle-header-texto"}>
            <p>{character.name}</p>
            <p>Género: {character.gender}</p>
            <p>Especie: {character.species}</p>
            <p>Planeta: {character.origin.name}</p>
          </div>
          <div>
            <BotonFavorito
              character={character}
              esFavorito={character.isFavorite}
              imgStyle={{
                fontSize: "100px",
                color: "#11dfff",
                filter: "drop-shadow(0px 6px 3px #4c8a00)",
              }}
            />
          </div>
        </div>
      </div>
      <h3>Lista de episodios donde apareció el personaje</h3>
      <div className={"episodios-grilla"}>
        {stateStatus == "loading" || stateStatus == "rejected" ? (
          <h3>{statusMessage}</h3>
        ) : (
          episodes.map((episode) => (
            <TarjetaEpisodio key={episode.id} episode={episode} />
          ))
        )}
      </div>
    </div>
  );
};

export default PaginaDetalle;
