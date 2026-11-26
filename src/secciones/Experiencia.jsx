// Marcas · Experiencia.
// El contenido dinámico (listas, números, juego…) lo completa la lógica de src/legado al cargar la página.
export default function Experiencia() {
  return (
    <section className="bloque" data-cap="marca" id="experiencia">
      <div className="wrap">
        <div className="cabeza">
          <h2>Con quién trabajé</h2>
          <p>eSports, eventos y marcas.</p>
        </div>
        <div className="exp" id="exp"></div>
        <h3 className="sub-h" id="eventos">En eventos</h3>
        <p className="sub-p">Lugares donde estuve y gente que conocí.</p>
        <div className="eventos" id="eventos-lista"></div>
        <div className="casos" id="casos" hidden></div>
        <div className="marcas" id="marcas-lista" hidden></div>
      </div>
    </section>
  );
}
