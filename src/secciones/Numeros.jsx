// Marcas · Números.
// El contenido dinámico (listas, números, juego…) lo completa la lógica de src/legado al cargar la página.
export default function Numeros() {
  return (
    <section className="bloque" data-cap="marca" id="numeros">
      <div className="wrap">
        <div className="cabeza">
          <h2>Mi audiencia</h2>
          <p>Mis números en todas las redes, en un solo lugar.</p>
        </div>
        <div className="kit" id="kit"></div>
        <div style={{height: "28px"}}></div>
        <div className="redes-tabs" id="redes-tabs" role="group" aria-label="Elegir red"></div>
        <div className="tablero">
          <div className="panel red-grande" id="red-grande"></div>
          <div className="minis" id="minis"></div>
        </div>
        <div className="extra-num" style={{gridTemplateColumns: "1fr"}}>
          <div className="panel" id="bloque-crec">
            <span className="etq">Crecimiento de la comunidad</span>
            <h3>Últimos meses</h3>
            <div className="grafico" id="grafico"></div>
          </div>
        </div>
        <p className="nota" id="actualizado"></p>
        {" "}
        <button className="btn sec descargar" id="descargar" type="button">Descargar media kit en PDF</button>
        {" "}
      </div>
    </section>
  );
}
