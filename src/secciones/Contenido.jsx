// Contenido: videos por tema.
// El contenido dinámico (listas, números, juego…) lo completa la lógica de src/legado al cargar la página.
export default function Contenido() {
  return (
    <section className="bloque" data-cap="ambos" id="videos">
      <div className="wrap">
        <div className="cabeza">
          <h2>Mi contenido</h2>
          <p>Reviews, pádel, fútbol, lifestyle y clips. Todo junto o por tema.</p>
        </div>
        <div className="filtros" id="filtros" role="group" aria-label="Filtrar videos">
          {" "}
          <button data-cat="todos" aria-pressed="true">Todo</button>
          <button data-cat="gaming" aria-pressed="false">Gaming</button>
          <button data-cat="reviews" aria-pressed="false">Colabs y reviews</button>
          {" "}
          <button data-cat="padel" aria-pressed="false">Pádel</button>
          <button data-cat="futbol" aria-pressed="false">Fútbol</button>
          {" "}
          <button data-cat="ometv" aria-pressed="false">OmeTV</button>
          <button data-cat="lifestyle" aria-pressed="false">Lifestyle</button>
          <button data-cat="clips" aria-pressed="false">Clips</button>
          {" "}
        </div>
        <div className="sub-tabs" id="sub-videos" role="tablist" hidden></div>
        <div className="videos" id="lista-videos"></div>
      </div>
    </section>
  );
}
