// Comunidad · Mi próxima PC.
// El contenido dinámico (listas, números, juego…) lo completa la lógica de src/legado al cargar la página.
export default function MiPc() {
  return (
    <section className="bloque" data-cap="comu" id="pc">
      <div className="wrap">
        <div className="cabeza">
          <h2>Mi próxima PC</h2>
          <p>Ahorrando para volver al stream.</p>
        </div>
        <div className="panel pc-panel">
          <p className="bio" id="pc-texto"></p>
          <div id="pc-progreso"></div>
          <div className="tags" id="pc-partes" style={{marginTop: "18px"}}></div>
          <div className="botones" style={{marginTop: "24px"}}>
            {" "}
            <a className="btn btn-mp" id="pc-mp" href="#" target="_blank" rel="noopener">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
                <rect x="2" y="6" width="20" height="14" rx="3"></rect>
                <path d="M16 13h2M2 10h20"></path>
              </svg>
              Aportar con Mercado Pago
            </a>
            {" "}
            <span className="alias" id="pc-alias">
              {"Alias: "}
              <b id="pc-alias-txt">a completar</b>
              <button type="button" id="pc-alias-btn">Copiar</button>
            </span>
            {" "}
            <a className="btn sec" href="#contacto">¿Sos marca de hardware? Hablemos</a>
            {" "}
          </div>
          <p className="muted" style={{fontSize: "14px", marginTop: "10px"}}>Con el link elegís vos el monto. Con el alias transferís sin comisión.</p>
          <div className="avisame">
            <h3>Avisame cuando vuelva al stream</h3>
            <p className="muted">Dejá tu mail o tu usuario de Twitch y te aviso el día que vuelva.</p>
            <form id="form-aviso" noValidate>
              <input id="aviso-in" maxLength="80" placeholder="tu@mail.com o tu_usuario" aria-label="Mail o usuario de Twitch" />
              <button className="btn prim" type="submit">Avisame</button>
            </form>
            <p className="estado" id="aviso-estado" role="status" style={{color: "var(--turquesa)", marginTop: "8px"}}></p>
          </div>
        </div>
      </div>
    </section>
  );
}
