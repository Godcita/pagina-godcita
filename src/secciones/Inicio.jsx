// Inicio: saludo, tarjeta principal, “Ahora en Godcita” y las secciones de la portada.
// El contenido dinámico (listas, números, juego…) lo completa la lógica de src/legado al cargar la página.
export default function Inicio() {
  return (
    <section className="portada" id="inicio">
      <div className="wrap revista">
        <div className="rev-main">
          <div className="masthead" hidden>
            <span>La revista de Godcita</span>
            <span id="edicion"></span>
          </div>
          <div className="club-cab">
            <div className="club-tit">
              <h1>
                {"Hola, soy "}
                <em>Bianca</em>
              </h1>
              <p>Gaming, pádel y un poco de todo.</p>
            </div>
            <div className="solapas" role="group" aria-label="Qué querés ver">
              {" "}
              <span className="sol-lbl">Ver</span>
              {" "}
              <div className="sol-pista">
                <i className="sol-ind" aria-hidden="true"></i>
                {" "}
                <button className="solapa" data-vista="todo" type="button" title="Todo el sitio">Todo</button>
                {" "}
                <button className="solapa s-marca" data-vista="marca" type="button" title="Propuesta, números, experiencia y contacto">
                  <span className="brillo-txt">Marcas</span>
                </button>
                {" "}
                <button className="solapa s-comu" data-vista="comu" type="button" title="Recomendaciones, novedades, trivia y juegos">Comunidad</button>
                {" "}
              </div>
            </div>
          </div>
          <p className="vista-nota" id="vista-nota" aria-live="polite"></p>
          {" "}
          {" "}
          <div className="rev-seccion" data-aud="ambos">
            <div className="club-hero">
              <article className="hc-main">
                {" "}
                <svg className="cinta3d" viewBox="0 0 420 440" preserveAspectRatio="xMaxYMid slice" aria-hidden="true" focusable="false">
                  <defs>
                    <linearGradient id="cg1" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0" stopColor="#FFB2DA"></stop>
                      <stop offset=".35" stopColor="#F852A0"></stop>
                      <stop offset=".75" stopColor="#B0186A"></stop>
                      <stop offset="1" stopColor="#4A0A2E"></stop>
                    </linearGradient>
                    <linearGradient id="cg2" x1="1" y1="0" x2="0" y2="1">
                      <stop offset="0" stopColor="#3A0724"></stop>
                      <stop offset=".5" stopColor="#D02A80"></stop>
                      <stop offset="1" stopColor="#FF9ACB"></stop>
                    </linearGradient>
                    <linearGradient id="cg3" x1="0" y1="1" x2="1" y2="0">
                      <stop offset="0" stopColor="#7A0F48"></stop>
                      <stop offset=".55" stopColor="#FF6FB2"></stop>
                      <stop offset="1" stopColor="#FFD3EA"></stop>
                    </linearGradient>
                    <filter id="cblur" x="-30%" y="-30%" width="160%" height="160%">
                      <feGaussianBlur stdDeviation="18"></feGaussianBlur>
                    </filter>
                  </defs>
                  <path d="M250-60C130 70 450 150 320 270S170 440 340 520" fill="none" stroke="#F852A0" strokeWidth="120" opacity=".45" filter="url(#cblur)"></path>
                  <path d="M470 20C330 110 290 200 380 300S500 400 400 500" fill="none" stroke="url(#cg2)" strokeWidth="74" strokeLinecap="round"></path>
                  <path d="M250-60C130 70 450 150 320 270S170 440 340 520" fill="none" stroke="url(#cg1)" strokeWidth="96" strokeLinecap="round"></path>
                  <path d="M150 470C230 380 330 380 420 330" fill="none" stroke="url(#cg3)" strokeWidth="58" strokeLinecap="round" opacity=".92"></path>
                  <path d="M214-50C108 74 418 160 292 270S150 430 304 520" fill="none" stroke="#fff" strokeOpacity=".45" strokeWidth="2.5"></path>
                  <path d="M286-60C160 64 478 144 348 272S194 440 374 520" fill="none" stroke="#fff" strokeOpacity=".18" strokeWidth="1.5"></path>
                </svg>
                {" "}
                <div className="hc-txt">
                  <div className="roles" id="roles"></div>
                  <h2>
                    <span id="alias">Godcita</span>
                  </h2>
                  <p className="lead" id="frase"></p>
                  <div className="datos-rapidos" id="datos-rapidos"></div>
                  <div className="botones">
                    <a className="btn prim" href="#sobre">
                      {"Conocerme más "}
                      <i data-ico="flecha"></i>
                    </a>
                    <a className="btn sec" href="#contacto">Para marcas</a>
                  </div>
                </div>
                <p className="hy-saludo" id="saludo" hidden></p>
                {" "}
                <b id="hy-num" hidden></b>
                {" "}
                <div className="intro-foto" id="intro-foto" hidden></div>
              </article>
              <div className="hc-stack">
                {" "}
                <a className="hc-card hc-padel" href="#sobre" id="t-sobre">
                  <span className="hc-tit">Entre partidas, pádel y planos</span>
                  <span className="hc-ir" aria-hidden="true">
                    <i data-ico="flecha"></i>
                  </span>
                  <span className="sr">Sobre mí: mi historia, mis sueños y todo lo que hago además de crear contenido</span>
                </a>
                {" "}
                <a className="hc-card hc-vlog" href="#dia">
                  <span className="hc-tit">Mi día y mis vlogs</span>
                  <span className="hc-ir" aria-hidden="true">
                    <i data-ico="flecha"></i>
                  </span>
                  <span className="t-chips" id="t-dia-chips" hidden></span>
                </a>
                {" "}
              </div>
              <aside className="en-godcita" aria-labelledby="ahora-tit">
                <h2 id="ahora-tit">
                  <i className="ahora-pto" aria-hidden="true"></i>
                  Ahora en Godcita
                </h2>
                {" "}
                <a className="ah-fila" id="ah-musica" href="#recomendaciones" data-reco="musica">
                  <i className="ah-ico" data-ico="spotify"></i>
                  <span>
                    <small id="ah-musica-est">Mi Spotify</small>
                    <b id="ah-musica-tit">Lo que estoy escuchando</b>
                  </span>
                  <span className="eq-mini" aria-hidden="true">
                    <i></i>
                    <i></i>
                    <i></i>
                  </span>
                </a>
                {" "}
                <a className="ah-fila" href="#comunidad" data-ancla="conozcamonos">
                  <i className="ah-ico" data-ico="charla"></i>
                  <span>
                    <small>Pregunta del día</small>
                    <b id="ah-pregunta"></b>
                  </span>
                </a>
                {" "}
                <a className="ah-fila" href="#quiz">
                  <i className="ah-ico" data-ico="equipo"></i>
                  <span>
                    <small>Trivia de Godcita</small>
                    <b>Ganá kirbitos</b>
                  </span>
                </a>
                {" "}
                <a className="btn prim ah-btn" href="#cartelera">
                  {"Ver novedades "}
                  <i data-ico="flecha"></i>
                </a>
                {" "}
                <div id="cart-mini" hidden></div>
              </aside>
            </div>
            <div className="club-mods">
              <div className="mod-musica" id="mod-musica"></div>
              {" "}
              <a className="mod-pc t-pc" href="#pc">
                <span className="mod-etq">Mi próxima PC</span>
                <b>Ahorrando para volver al stream</b>
                <span className="mini-barra" aria-hidden="true">
                  <i id="t-pc-barra" style={{width: "0"}}></i>
                </span>
                <span className="t-sub" id="t-pc-sub">Aportá por Mercado Pago o pedí que te avise cuando vuelva</span>
                <span className="hc-ir" aria-hidden="true">
                  <i data-ico="flecha"></i>
                </span>
              </a>
              {" "}
            </div>
          </div>
          {" "}
          {" "}
          <div className="rev-seccion sec-marcas" data-aud="marca">
            <div className="rev-cab">
              <span className="kicker k-marca">Marcas</span>
              <h2>Trabajemos juntos</h2>
            </div>
            <div className="rev-grid">
              <div className="banda-marcas c-6" id="banda-marcas"></div>
              {" "}
              <a className="tile t-marca con-extra c-2 r-3" href="#experiencia">
                <span className="t-flecha" aria-hidden="true">↗</span>
                <span className="t-etq">Experiencia</span>
                <span className="t-tit">eSports y marcas</span>
                <div className="mini-logos" id="t-exp-logos"></div>
                <span className="t-chips" id="t-exp-chips"></span>
              </a>
              {" "}
              <a className="tile t-marca con-extra c-2 r-3" href="#porque">
                <span className="t-flecha" aria-hidden="true">↗</span>
                <span className="t-etq">Por qué yo</span>
                <span className="t-tit">Lo que suma tenerme en tu campaña</span>
                <ol className="t-lista" id="t-pqy-lista"></ol>
              </a>
              {" "}
              <a className="tile oscuro c-2 r-3" href="#contacto">
                <span className="t-flecha" aria-hidden="true">↗</span>
                <span className="t-etq">Contacto</span>
                <span className="t-tit">Canje, tarifa o a medida</span>
                <span className="t-sub">Paquetes, proceso y formulario</span>
              </a>
              {" "}
            </div>
          </div>
          {" "}
          {" "}
          <div className="rev-seccion" data-aud="ambos">
            <div className="rev-cab">
              <span className="kicker k-redes">Redes</span>
              <h2>Mis números y mi contenido</h2>
            </div>
            <div className="rev-grid">
              {" "}
              <a className="tile lila c-3 r-3" href="#numeros">
                <span className="t-flecha" aria-hidden="true">↗</span>
                <span className="t-etq">Números</span>
                <span className="t-big" id="t-num-big">7 redes</span>
                <span className="t-sub" id="t-num-sub">Twitch, Kick, Instagram, TikTok y X, siempre al día</span>
              </a>
              {" "}
              <a className="tile foto c-3 r-5" href="#videos" id="t-videos">
                <span className="t-flecha" aria-hidden="true">↗</span>
                <span className="t-etq">Contenido</span>
                <span className="t-tit">Reviews, pádel, fútbol y lifestyle</span>
                <span className="t-sub">Todo junto o por tema</span>
              </a>
              {" "}
              <a className="tile t-juegos c-3 r-2" href="#juegos">
                <span className="t-flecha" aria-hidden="true">↗</span>
                <span className="t-etq">Lo que juego</span>
                <span className="t-tit">VALORANT y Counter-Strike</span>
                <span className="t-portadas" id="t-portadas" aria-hidden="true"></span>
              </a>
              {" "}
              <a className="tile t-eventos c-6 r-2" href="#experiencia">
                <span className="t-flecha" aria-hidden="true">↗</span>
                <span className="t-logos" id="t-ev-logos" aria-hidden="true"></span>
                <span className="t-ev-txt">
                  <span className="t-etq">Experiencia</span>
                  <span className="t-tit">Eventos, co-streams y marcas con las que trabajé</span>
                </span>
              </a>
              {" "}
            </div>
          </div>
          {" "}
          {" "}
          {" "}
          <div className="rev-seccion" data-aud="comu">
            <div className="rev-cab">
              <span className="kicker k-reco">Recomienda</span>
              <h2>Lo que miro, escucho y opino</h2>
            </div>
            <div className="rev-grid" id="semana-grid">
              {" "}
              <a className="tile musica c-3 r-3" href="#recomendaciones" data-reco="musica" id="t-musica">
                <span className="t-flecha" aria-hidden="true">↗</span>
                <span className="t-etq">Escuchando ahora</span>
                <div className="eq" aria-hidden="true">
                  <i></i>
                  <i></i>
                  <i></i>
                  <i></i>
                </div>
                <span className="t-tit" id="t-musica-tit">Mi música en vivo</span>
                <span className="t-sub" id="t-musica-sub">Lo que suena ahora y lo que más escuché esta semana</span>
              </a>
              {" "}
              <a className="tile t-reco c-3 r-3" href="#recomendaciones" data-reco="miro">
                <span className="t-flecha" aria-hidden="true">↗</span>
                <span className="t-etq">Recomendaciones de Godcita</span>
                <span className="t-tit">Juegos, animes, pelis y la música que suena en mis streams</span>
                <div className="estrellas-demo" aria-hidden="true">★★★★☆</div>
                <span className="t-sub">¿Coincidís con mi opinión? Votá</span>
              </a>
              {" "}
            </div>
          </div>
          <div className="rev-seccion" data-aud="comu">
            <div className="rev-cab">
              <span className="kicker k-comu">Comunidad</span>
              <h2>Los kirbitos</h2>
            </div>
            <div className="rev-grid">
              {" "}
              <a className="k-card k-sumate" href="#comunidad">
                <img className="kirbito" src="kirbito.png" width="251" height="214" alt="" aria-hidden="true" />
                <span className="k-txt">
                  <span className="k-tit">Sumate a la comunidad</span>
                  <span className="k-sub">Jugá, participá de trivias y ganá kirbitos.</span>
                  <span className="btn prim">
                    {"Entrar a la comunidad "}
                    <i data-ico="flecha"></i>
                  </span>
                </span>
              </a>
              {" "}
              <a className="k-card k-setup" href="#setups">
                <span className="k-foto">
                  <img src="93f350d0d1.jpg" alt="" loading="lazy" />
                </span>
                <span className="k-txt">
                  <span className="k-tit">Mi setup</span>
                  <span className="k-sub">El equipo con el que streameo, grabo y creo contenido. También podés mostrarme el tuyo.</span>
                  <span className="btn sec">
                    {"Ver mi setup "}
                    <i data-ico="flecha"></i>
                  </span>
                </span>
              </a>
              {" "}
              <a className="tile t-comu c-6 r-2" href="#comunidad" data-ancla="conozcamonos">
                <span className="t-flecha" aria-hidden="true">↗</span>
                <span className="t-etq">Pregunta del día</span>
                <span className="t-tit" id="t-pregunta"></span>
              </a>
              {" "}
              <a className="tile t-quiz c-3 r-2" href="#quiz">
                <span className="t-flecha" aria-hidden="true">↗</span>
                <span className="t-etq">Trivia · ganá kirbitos</span>
                <span className="t-tit">¿Cuánto conocés a Godcita?</span>
                <div className="mini-latas" aria-hidden="true">
                  <i></i>
                  <i></i>
                  <i></i>
                </div>
              </a>
              {" "}
              <a className="tile t-juego c-3 r-2" href="#jugar">
                <span className="t-flecha" aria-hidden="true">↗</span>
                <span className="t-etq">Jugar · Juntá kirbitos</span>
                <canvas className="preview-juego" width="520" height="130" aria-hidden="true"></canvas>
              </a>
              {" "}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
