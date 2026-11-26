// Marcas · Trabajemos juntos (paquetes y formulario).
// El contenido dinámico (listas, números, juego…) lo completa la lógica de src/legado al cargar la página.
export default function Contacto() {
  return (
    <section className="bloque" data-cap="marca" id="contacto">
      <div className="wrap">
        <div className="cabeza">
          <h2>Cómo trabajo</h2>
          <p>
            {"Por "}
            <b>canje</b>
            {" (me mandás el producto y lo uso de verdad), por "}
            <b>tarifa</b>
            {" o con una "}
            <b>propuesta a medida</b>
            . Estos paquetes son un punto de partida.
          </p>
        </div>
        {" "}
        <button className="btn sec" id="descargar2" type="button" hidden>Descargar media kit en PDF</button>
        {" "}
        <div className="servs" id="servs" hidden></div>
        <div className="modos" id="modos" hidden></div>
        <div className="paquetes" id="paquetes"></div>
        <h3 className="sub-h">El proceso</h3>
        <ol className="proceso" id="proceso"></ol>
        <form className="panel form-marca" id="form-marca" noValidate>
          <h3 style={{fontSize: "28px"}}>Contame sobre tu marca</h3>
          <p className="muted">Te respondo con una propuesta y mis números al día.</p>
          <div className="grid">
            <div>
              <label htmlFor="fm-marca">Marca o empresa</label>
              <input id="fm-marca" maxLength="80" required />
            </div>
            <div>
              <label htmlFor="fm-mail">Mail de contacto</label>
              <input id="fm-mail" type="email" maxLength="100" required />
            </div>
            <div>
              <label htmlFor="fm-modo">¿Cómo te gustaría trabajar?</label>
              <select id="fm-modo">
                <option>Canje de producto</option>
                <option>Por tarifa: quiero que me coticen</option>
                <option>Tengo una propuesta y presupuesto</option>
                <option>Todavía no sé, quiero charlarlo</option>
              </select>
            </div>
            <div>
              <label htmlFor="fm-paquete">Paquete que te interesa</label>
              <select id="fm-paquete"></select>
            </div>
            <div>
              <label htmlFor="fm-pres">Presupuesto aproximado</label>
              <select id="fm-pres">
                <option>Prefiero hablarlo</option>
                <option>Canje de producto</option>
                <option>Hasta USD 200</option>
                <option>USD 200 a 500</option>
                <option>USD 500 a 1.000</option>
                <option>Más de USD 1.000</option>
              </select>
            </div>
            <div>
              <label htmlFor="fm-obj">Objetivo</label>
              <select id="fm-obj">
                <option>Dar a conocer la marca</option>
                <option>Lanzamiento de producto</option>
                <option>Ventas con cupón o link</option>
                <option>Evento o torneo</option>
                <option>Otro</option>
              </select>
            </div>
            <div>
              <label htmlFor="fm-fecha">Fechas estimadas</label>
              <input id="fm-fecha" maxLength="60" placeholder="Ej: diciembre" />
            </div>
            <div className="full">
              <label htmlFor="fm-msg">Contame la idea</label>
              <textarea id="fm-msg" maxLength="1500" />
            </div>
          </div>
          {" "}
          <button className="btn prim" type="submit" style={{marginTop: "18px"}}>Enviar propuesta</button>
          {" "}
          <p className="estado" id="fm-estado" role="status" style={{marginTop: "10px", color: "var(--turquesa)"}}></p>
        </form>
        <div className="contacto">
          <div>
            <h2>¿Preferís escribirme directo?</h2>
            <p>Mail o cualquiera de mis redes.</p>
            <div className="mail">
              <code id="mail"></code>
              <button id="copiar">Copiar mail</button>
            </div>
          </div>
          <ul className="links" id="links"></ul>
        </div>
      </div>
    </section>
  );
}
