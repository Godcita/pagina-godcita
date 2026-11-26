// Comunidad · Novedades.
// El contenido dinámico (listas, números, juego…) lo completa la lógica de src/legado al cargar la página.
export default function Novedades() {
  return (
    <section className="bloque" data-cap="comu" id="cartelera">
      <div className="wrap">
        <div className="cabeza">
          <h2>Novedades</h2>
          <p>
            Lo de esta semana: hits, tweets, chismecitos, cosas importantes y boludeces. Y lo que opinan ustedes.
          </p>
        </div>
        <div className="corcho" id="corcho"></div>
        <div className="separa" style={{height: "40px"}}></div>
        <form className="panel form opinion-form" id="form-opinion" noValidate>
          <h3 style={{fontSize: "28px"}}>¿Qué opinás de mí?</h3>
          <p className="muted">
            Contame lo que pensás, qué mejorarías o qué te gustaría ver en el stream. Puede ser anónimo.
          </p>
          {" "}
          <label htmlFor="op-tema">Sobre qué</label>
          {" "}
          <select id="op-tema">
            <option>Qué opino de Godcita</option>
            <option>Qué mejoraría</option>
            <option>Qué me gustaría que sume al stream</option>
            <option>Otra cosa</option>
          </select>
          {" "}
          <label htmlFor="op-texto">Tu opinión</label>
          {" "}
          <textarea id="op-texto" maxLength="1500" placeholder="Escribí con confianza…" />
          {" "}
          <label htmlFor="op-nombre">Nombre o apodo (opcional)</label>
          {" "}
          <input type="text" id="op-nombre" maxLength="40" placeholder="Anónimo" />
          {" "}
          <label className="check">
            <input type="checkbox" id="op-publicar" />
            <span>Autorizo a Bianca a publicarlo en la cartelera.</span>
          </label>
          {" "}
          <span className="aviso-chico">
            <i data-ico="candado"></i>
            Nada se publica sin tu permiso. Podés mandarlo anónimo.
          </span>
          {" "}
          <button className="btn prim" type="submit">Enviar opinión</button>
          {" "}
          <p className="estado" id="op-estado" role="status"></p>
        </form>
      </div>
    </section>
  );
}
