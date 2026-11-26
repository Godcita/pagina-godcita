// Comunidad · Mi comunidad.
// El contenido dinámico (listas, números, juego…) lo completa la lógica de src/legado al cargar la página.
export default function MiComunidad() {
  return (
    <section className="bloque" data-cap="comu" id="comunidad">
      <div className="wrap">
        <div className="cabeza">
          <h2>Mi comunidad</h2>
          <p>
            Mi comunidad. Los que están en cada stream, comentan todo y bancan desde el principio. Acá nos conocemos de verdad.
          </p>
        </div>
        <div className="godcitos-top" id="top"></div>
        <div className="mas-fans" id="mas-fans"></div>
        <div className="muro-com" id="comentarios"></div>
        <div className="separa" style={{height: "40px"}}></div>
        <div className="com-extra">
          <div className="panel discord" id="bloque-discord">
            <span className="etq">Sumate</span>
            <h3 style={{fontSize: "28px"}}>El Discord de los kirbitos</h3>
            <p id="discord-txt" style={{marginTop: "8px", opacity: ".9"}}>Charlas, avisos de stream, partidas con la comunidad y sorteos.</p>
            <a className="btn" id="discord-btn" href="#" target="_blank" rel="noopener">Entrar al Discord</a>
          </div>
          <div className="panel" id="bloque-prox">
            <span className="etq">Agenda</span>
            <h3>Próximos streams y eventos</h3>
            <ul className="lista-simple" id="proximos"></ul>
          </div>
          <div className="panel kdm" id="bloque-kdm">
            <span className="etq">Kirbito del mes</span>
            <div className="av" id="kdm-av">?</div>
            <h3 id="kdm-n"></h3>
            <p className="muted" id="kdm-m" style={{fontSize: "15px"}}></p>
          </div>
        </div>
        <div id="bloque-colabs">
          <h3 className="sub-h" style={{marginTop: "30px"}}>Colabs con otros streamers</h3>
          <div className="colabs" id="colabs"></div>
        </div>
        <div className="separa"></div>
        <h3 className="sub-h">Mis sueños</h3>
        <p className="sub-p">Tengo dos: uno real y uno mágico. ¿Y vos?</p>
        <div className="sueños">
          <div className="panel sueño real">
            <span className="etq">Mi sueño real</span>
            <div className="grande-txt" id="sr-t"></div>
            <p className="muted" id="sr-x"></p>
          </div>
          <div className="panel sueño magico">
            <span className="etq">Mi sueño mágico</span>
            <div className="grande-txt" id="sm-t"></div>
            <p className="muted" id="sm-x"></p>
          </div>
        </div>
        <div className="separa"></div>
        <h3 className="sub-h" id="conozcamonos">Conozcámonos</h3>
        <p className="sub-p">
          Todos los días hay una pregunta nueva. Y si querés contarme otra cosa, también. Lo leo todo y respondo.
        </p>
        <div className="charla">
          <div className="panel form">
            <div className="tabs-charla" role="tablist">
              {" "}
              <button role="tab" id="tab-dia" aria-selected="true" aria-controls="form-charla">Pregunta del día</button>
              {" "}
              <button role="tab" id="tab-contame" aria-selected="false" aria-controls="form-charla">Contame algo</button>
              {" "}
            </div>
            <form id="form-charla" noValidate>
              <div id="modo-dia">
                {" "}
                <span className="dia-badge" id="fecha-hoy"></span>
                {" "}
                <div className="pregunta-actual" id="pregunta" aria-live="polite"></div>
              </div>
              <div id="modo-contame" hidden>
                <div className="pregunta-actual">¿Qué querés contarme hoy?</div>
                <p className="muted" style={{marginBottom: "6px"}}>Algo bueno, algo malo o algo que necesitás sacarte de encima. Te voy a leer.</p>
                <div className="animos" role="radiogroup" aria-label="Cómo viene tu día">
                  {" "}
                  <label>
                    <input type="radio" name="animo" defaultValue="Algo bueno" defaultChecked />
                    <span>
                      <i data-ico="sol"></i>
                      Algo bueno
                    </span>
                  </label>
                  {" "}
                  <label>
                    <input type="radio" name="animo" defaultValue="Algo malo" />
                    <span>
                      <i data-ico="lluvia"></i>
                      Algo malo
                    </span>
                  </label>
                  {" "}
                  <label>
                    <input type="radio" name="animo" defaultValue="Necesito desahogarme" />
                    <span>
                      <i data-ico="charla"></i>
                      Necesito desahogarme
                    </span>
                  </label>
                  {" "}
                </div>
              </div>
              {" "}
              <label htmlFor="respuesta">Tu mensaje</label>
              {" "}
              <textarea id="respuesta" maxLength="1500" placeholder="Escribí lo que te salga…" />
              {" "}
              <label htmlFor="nombre">Nombre o apodo (opcional)</label>
              {" "}
              <input type="text" id="nombre" maxLength="40" placeholder="Anónimo" />
              {" "}
              <label className="check">
                <input type="checkbox" id="publicar" />
                <span>Bianca puede publicarlo en la página. Si no lo marcás, lo lee solo ella.</span>
              </label>
              {" "}
              <span className="aviso-chico">
                <i data-ico="candado"></i>
                Nada se publica sin tu permiso. Podés mandarlo anónimo.
              </span>
              {" "}
              <button className="btn prim" type="submit">Enviar</button>
              {" "}
              <p className="estado" id="estado-form" role="status"></p>
            </form>
          </div>
          <div>
            {" "}
            <span className="etq">Lo que contó la comunidad</span>
            {" "}
            <div className="respuestas" id="respuestas"></div>
          </div>
        </div>
        <div className="separa"></div>
        <h3 className="sub-h" id="eoa">¿Esto o aquello?</h3>
        <p className="sub-p">Votá y mirá qué eligió Bianca y qué eligió la comunidad. Al final, descubrí qué tan compatibles somos como amigos.</p>
        <div className="votos" id="votos"></div>
        <div className="panel compat" id="compat" aria-live="polite">
          <div className="medidor" id="medidor">
            <b id="compat-n">?</b>
          </div>
          <div>
            <h3 id="compat-t">¿Qué tan amigos seríamos?</h3>
            <p className="muted" id="compat-x">Votá al menos 5 preguntas y te digo nuestro porcentaje de amistad.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
