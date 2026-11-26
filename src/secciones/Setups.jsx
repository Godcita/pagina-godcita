// Comunidad · Setups.
// El contenido dinámico (listas, números, juego…) lo completa la lógica de src/legado al cargar la página.
export default function Setups() {
  return (
    <section className="bloque" data-cap="comu" id="setups">
      <div className="wrap">
        <div className="cabeza">
          <h2>Setups y "¿qué opinás de esto?"</h2>
          <p>
            Mandame tu setup o cualquier cosa que quieras que opine: un periférico, un video, una idea. Te respondo acá.
          </p>
        </div>
        <div className="aviso-publi">
          <b>
            <i data-ico="candado"></i>
            Nada se publica sin tu permiso.
          </b>
          {" Solo aparece en la página si marcás que se puede publicar y yo lo apruebo. Podés mandarlo anónimo."}
        </div>
        <div className="mi-setup panel" id="mi-setup"></div>
        <h3 className="sub-h" style={{marginTop: "34px"}}>Los setups y envíos de los kirbitos</h3>
        <p className="sub-p">Lo que me mandaron y lo que opiné.</p>
        <div className="chat-muro" id="chat-muro"></div>
        <form className="panel form envio-form" id="form-envio" noValidate>
          <div className="tabs-charla" role="tablist">
            {" "}
            <button type="button" role="tab" aria-selected="true" data-cat="setup">Mostrar mi setup</button>
            {" "}
            <button type="button" role="tab" aria-selected="false" data-cat="opinar">¿Qué opinás de esto?</button>
            {" "}
          </div>
          {" "}
          <label htmlFor="ev-texto" id="ev-lbl">Contame de tu setup</label>
          {" "}
          <textarea id="ev-texto" maxLength="1200" placeholder="Qué tenés, qué cambiarías, qué te gustaría sumar…" />
          {" "}
          <label htmlFor="ev-link">Link (opcional)</label>
          {" "}
          <input type="text" id="ev-link" maxLength="300" placeholder="Un video, un producto, un post…" />
          {" "}
          <label htmlFor="ev-foto">Foto (opcional)</label>
          {" "}
          <input type="file" id="ev-foto" accept="image/*" />
          {" "}
          <div id="ev-prev" className="ev-prev"></div>
          <div className="grid2">
            <div>
              <label htmlFor="ev-nombre">Nombre o apodo (opcional)</label>
              <input type="text" id="ev-nombre" maxLength="40" placeholder="Anónimo" />
            </div>
            <div>
              <label htmlFor="ev-user">Tu usuario (opcional)</label>
              <input type="text" id="ev-user" maxLength="40" placeholder="@tu_usuario" />
            </div>
          </div>
          {" "}
          <label className="check">
            <input type="checkbox" id="ev-publicar" />
            <span>Autorizo a Bianca a publicarlo en la página con mi foto y mi nombre (si los puse).</span>
          </label>
          {" "}
          <button className="btn prim" type="submit">Enviar</button>
          {" "}
          <p className="estado" id="ev-estado" role="status"></p>
        </form>
      </div>
    </section>
  );
}
