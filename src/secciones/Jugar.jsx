// Comunidad · Trivia y Juntá kirbitos.
// El contenido dinámico (listas, números, juego…) lo completa la lógica de src/legado al cargar la página.
export default function Jugar() {
  return (
    <section className="bloque" data-cap="comu" id="jugar">
      <div className="wrap">
        <div className="cabeza">
          <h2>Jugá y ganá kirbitos</h2>
          <p>
            Dos juegos para sumar kirbitos. Conectá tu Twitch y se suman solos a tus kirbitos del canal.
          </p>
        </div>
        <div className="tw-bar" id="tw-bar">
          <div className="tw-ico" aria-hidden="true">
            <svg viewBox="0 0 24 24" width="22" height="22">
              <path fill="currentColor" d="M4 2 2.5 6v14h5v2.5h3L13 20h4l5-5V2H4Zm16 12-3 3h-5l-2.5 2.5V17H5.5V4H20v10ZM16.5 7.5h-2v5h2v-5Zm-5 0h-2v5h2v-5Z"></path>
            </svg>
          </div>
          <div className="tw-txt" id="tw-txt">
            <b>Conectá tu cuenta de Twitch</b>
            <span>
              Lo que ganes en la trivia y el juego se suma solo a tus kirbitos del canal. Lo ves en el chat con !points.
            </span>
          </div>
          {" "}
          <a className="btn tw-btn" id="tw-btn" href="/api/login">Conectar con Twitch</a>
          {" "}
        </div>
        <h3 className="sub-h" id="quiz">¿Cuánto conocés a Godcita?</h3>
        <p className="sub-p">
          Girá cada objeto y tocá el que elegiría yo. Cada acierto suma una gema, y cada gema vale kirbitos.
        </p>
        <div className="quiz" id="quiz-app"></div>
        <h3 className="sub-h">Juntá kirbitos</h3>
        <p className="sub-p">Saltá los obstáculos y atrapá kirbitos.</p>
        <div className="panel juego-panel">
          <div className="juego-top">
            <div className="contador">
              <span id="k-partida">Partida: 0</span>
              <span id="k-total">Total: 0 kirbitos</span>
              <span id="k-record">Tu récord: 0</span>
            </div>
            {" "}
            <span className="muted" style={{fontSize: "14px"}}>Espacio o tocá para saltar. Doble toque: doble salto.</span>
            {" "}
          </div>
          <canvas id="juego" width="900" height="280" aria-label="Juego: tocá para saltar y juntar kirbitos" role="img"></canvas>
          <div className="canje">
            <div>
              <label htmlFor="twitch-user">Tu usuario de Twitch (para el ranking y para canjear)</label>
              <input id="twitch-user" type="text" maxLength="40" placeholder="tu_usuario" />
            </div>
            {" "}
            <button className="btn prim" id="canjear" type="button">Guardar mis kirbitos</button>
            {" "}
          </div>
          <p className="nota" id="estado-canje" role="status"></p>
          <h3 style={{marginTop: "22px"}}>Premios para canjear en el stream</h3>
          <ul className="lista-simple" id="premios" style={{maxWidth: "560px"}}></ul>
          <h3 style={{marginTop: "22px"}}>Ranking de récords</h3>
          <div className="ranking" id="ranking"></div>
        </div>
      </div>
    </section>
  );
}
