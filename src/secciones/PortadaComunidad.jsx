// Portada de la landing de Comunidad.
// El contenido dinámico (listas, números, juego…) lo completa la lógica de src/legado al cargar la página.
export default function PortadaComunidad() {
  return (
    <div className="capitulo" id="cap-comu" data-cap="comu">
      <div className="wrap cap-hero">
        <div className="cap-txt">
          {" "}
          <span className="cap-etq">Para la comunidad</span>
          {" "}
          <h2>Los kirbitos</h2>
          <p>
            Lo que comparto con mi comunidad: charlas, recomendaciones, juegos y mi día a día. Todo en un solo lugar, para leer de corrido.
          </p>
          <div className="botones">
            <a className="btn prim" href="#jugar">
              {"Jugá y ganá kirbitos "}
              <i data-ico="flecha"></i>
            </a>
            <a className="btn sec" href="#setups">Mostrame tu setup</a>
          </div>
        </div>
        <div className="cap-arte" aria-hidden="true">
          <img className="kirbito" src="kirbito.png" width="251" height="214" alt="" />
        </div>
      </div>
    </div>
  );
}
