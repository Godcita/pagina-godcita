// Portada de la landing de Marcas.
// El contenido dinámico (listas, números, juego…) lo completa la lógica de src/legado al cargar la página.
export default function PortadaMarcas() {
  return (
    <div className="capitulo" id="cap-marcas" data-cap="marca">
      <div className="wrap cap-hero">
        <div className="cap-txt">
          {" "}
          <span className="cap-etq">Para marcas</span>
          {" "}
          <h2>Trabajemos juntos</h2>
          <p>
            Mis números, con quién trabajé y cómo armamos una campaña. Por canje, por tarifa o a tu medida.
          </p>
          <div className="botones">
            <a className="btn prim" href="#contacto">
              {"Pedir propuesta "}
              <i data-ico="flecha"></i>
            </a>
            <a className="btn sec" href="#numeros">Ver mis números</a>
          </div>
        </div>
        <div className="cap-dato">
          {" "}
          <b id="cap-num">+40 mil</b>
          {" "}
          <span>personas en mi comunidad, sumando todas mis redes</span>
          {" "}
          <div className="cap-logos" id="cap-logos"></div>
          {" "}
          <small id="cap-logos-txt"></small>
          {" "}
        </div>
      </div>
    </div>
  );
}
