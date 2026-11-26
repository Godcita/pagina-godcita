// Barra superior (el menú, la lupa y Spotify los completa la lógica al cargar).
// El contenido dinámico (listas, números, juego…) lo completa la lógica de src/legado al cargar la página.
export default function Barra() {
  return (
    <header className="barra">
      <div className="wrap">
        {" "}
        <a className="logo" href="#inicio">
          God
          <i>cita</i>
        </a>
        {" "}
        <nav aria-label="Secciones">
          {" "}
          <a href="#sobre">Sobre mí</a>
          <a href="#numeros">Números</a>
          <a href="#porque">Por qué yo</a>
          <a href="#experiencia">Experiencia</a>
          {" "}
          <a href="#videos">Contenido</a>
          <a href="#comunidad">Comunidad</a>
          <a href="#jugar">Jugar</a>
          <a href="#contacto">Contacto</a>
          {" "}
        </nav>
        {" "}
        <a className="vivo" id="vivo" href="https://twitch.tv/Godcita_" target="_blank" rel="noopener">En vivo ahora</a>
        {" "}
        <button className="icon-btn" id="tema" aria-label="Cambiar modo claro u oscuro">
          {" "}
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"></path>
          </svg>
          {" "}
        </button>
        {" "}
      </div>
    </header>
  );
}
