// Comunidad · Lo último en X.
// El contenido dinámico (listas, números, juego…) lo completa la lógica de src/legado al cargar la página.
export default function EnX() {
  return (
    <section className="bloque" data-cap="comu" id="tweets">
      <div className="wrap">
        <div className="cabeza">
          <h2>Lo último en X</h2>
          <p>Mis posts destacados y, abajo, los más recientes, que se actualizan solos.</p>
        </div>
        <h3 className="sub-h">Destacados</h3>
        <div className="x-destacados">
          {" "}
          <a className="xt" href="https://x.com/Biancagaleano_/status/2124507912026407132" target="_blank" rel="noopener">
            <div className="xt-head">
              <img className="xt-av" src="x-avatar.jpg" alt="" />
              <div>
                <b>
                  {"Godcita "}
                  <span className="xt-ok" aria-label="Cuenta verificada">✓</span>
                </b>
                <span>@Biancagaleano_</span>
              </div>
              <span className="xt-logo" aria-hidden="true">𝕏</span>
            </div>
            <p>
              Es muy de mami pedir levantarme un domingo temprano, ir a jugar pádel con el amor de mi vida (ponele), volver, hacer un asadito y pasar la tarde tomando mates?
            </p>
            <p>Después me acuerdo que absolutamente todos los jugadores de padel son gatos y se me pasa.</p>
            <div className="xt-pie">
              <span>22 nov 2026</span>
              <span>♡ 15 · 520 vistas</span>
            </div>
          </a>
          {" "}
          <a className="xt" href="https://x.com/Biancagaleano_/status/2122136449810039210" target="_blank" rel="noopener">
            <div className="xt-head">
              <img className="xt-av" src="x-avatar.jpg" alt="" />
              <div>
                <b>
                  {"Godcita "}
                  <span className="xt-ok" aria-label="Cuenta verificada">✓</span>
                </b>
                <span>@Biancagaleano_</span>
              </div>
              <span className="xt-logo" aria-hidden="true">𝕏</span>
            </div>
            <p>
              Me encanta que la comunidad me tenga tanta fe como para subir colab con Royal y en realidad piensen que me uní a Shinden posta. Yo los amo 💜👾 YA SE NOS VA A DAR, TRANQUILOS ✨✨
            </p>
            <p>Les dejo esta hermosura 👀🙌🏻</p>
            <img className="xt-foto" src="x-setup-rk.jpg" alt="Setup con teclado rosa y monitor Royal Kludge" loading="lazy" />
            {" "}
            <div className="xt-pie">
              <span>15 nov 2026</span>
              <span>841 vistas</span>
            </div>
          </a>
          {" "}
          <a className="xt" href="https://x.com/Biancagaleano_/status/2116095331482108141" target="_blank" rel="noopener">
            <div className="xt-head">
              <img className="xt-av" src="x-avatar.jpg" alt="" />
              <div>
                <b>
                  {"Godcita "}
                  <span className="xt-ok" aria-label="Cuenta verificada">✓</span>
                </b>
                <span>@Biancagaleano_</span>
              </div>
              <span className="xt-logo" aria-hidden="true">𝕏</span>
            </div>
            <p>
              Para mi no existen los hombres “tibios” solo no les importas lo suficiente. ( si, lo aprendi a la mala)
            </p>
            <div className="xt-cita">
              <b>Arah</b>
              {" "}
              <span>@ar4cc3l1ss · 29 oct</span>
              <p>Que asco los hombres tibios, a mi escribime “hermosa te extraño no soy nada sin ti”</p>
            </div>
            <div className="xt-pie">
              <span>30 oct 2026</span>
              <span>♡ 281 · 51,4 mil vistas</span>
            </div>
          </a>
          {" "}
        </div>
        <h3 className="sub-h">Los más recientes</h3>
        <div className="x-caja">
          {" "}
          <a className="twitter-timeline" data-height="640" data-chrome="noheader nofooter noborders transparent" data-dnt="true" href="https://twitter.com/biancagaleano_">Posts de @biancagaleano_</a>
          {" "}
          <div className="x-respaldo" hidden>
            <p>
              No se pudieron cargar los posts acá (a veces X los bloquea si no iniciaste sesión o tenés un bloqueador de anuncios).
            </p>
            {" "}
            <a className="btn" href="https://x.com/biancagaleano_" target="_blank" rel="noopener">Ver mis posts en X</a>
            {" "}
          </div>
        </div>
      </div>
    </section>
  );
}
