// Comunidad · Un día con Godcita.
// El contenido dinámico (listas, números, juego…) lo completa la lógica de src/legado al cargar la página.
export default function MiDia() {
  return (
    <section className="bloque" data-cap="comu" id="dia">
      <div className="wrap">
        <div className="cabeza">
          <h2>Un día con Godcita</h2>
          <p>Mi día a día, en video.</p>
        </div>
        <div className="panel dia" hidden style={{display: "none"}}>
          <div>
            <div className="reloj" id="reloj">
              21
              <small>:00 hs</small>
            </div>
            {" "}
            <input type="range" id="slider" min="0" max="5" step="1" defaultValue="4" aria-label="Hora del día" />
            {" "}
            <div className="horas" id="horas"></div>
          </div>
          <div className="actividad" id="actividad" aria-live="polite"></div>
        </div>
        <div className="vlogs" id="vlogs"></div>
      </div>
    </section>
  );
}
