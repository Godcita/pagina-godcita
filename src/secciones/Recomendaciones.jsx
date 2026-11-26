// Comunidad · Recomendaciones.
// El contenido dinámico (listas, números, juego…) lo completa la lógica de src/legado al cargar la página.
export default function Recomendaciones() {
  return (
    <section className="bloque" data-cap="comu" id="recomendaciones">
      <div className="wrap">
        <div className="cabeza">
          <h2>Recomendaciones de Godcita</h2>
          <p>
            Lo que uso, juego, miro y opino. Es mi experiencia y mi gusto: tomalo como una charla entre amigos.
          </p>
        </div>
        <div className="filtros" id="reco-tabs" role="tablist"></div>
        <div id="reco-panel"></div>
        <div id="reco-gaming-extra" hidden>
          <h3 className="sub-h" style={{marginTop: "6px"}}>Periféricos · Godcita review</h3>
          <p className="sub-p">Mi experiencia usándolos: qué me gustó, qué mejoraría y para qué uso me parecen.</p>
          <div className="reco" id="reco"></div>
        </div>
      </div>
    </section>
  );
}
