// Sobre mí.
// El contenido dinámico (listas, números, juego…) lo completa la lógica de src/legado al cargar la página.
export default function SobreMi() {
  return (
    <section className="bloque" data-cap="ambos" id="sobre">
      <div className="wrap">
        <div className="cabeza">
          <h2>Quién soy</h2>
          <p>Lo básico, lo no tan básico y lo que hago además de stremear.</p>
        </div>
        <div className="sobre">
          <div className="foto-grande" id="foto"></div>
          <div className="bento">
            <div className="panel c6">
              <span className="etq">A qué me dedico</span>
              <p className="bio" id="dedico"></p>
            </div>
            <div className="panel c2">
              <span className="etq">Edad</span>
              <div className="grande-txt" id="edad"></div>
            </div>
            <div className="panel c4">
              <span className="etq">De dónde soy</span>
              <div className="grande-txt" id="ciudad"></div>
            </div>
            <div className="panel c3 leo">
              <span className="simbolo" data-ico="signo"></span>
              <span className="etq">Mi signo</span>
              <div className="grande-txt" id="sol"></div>
              <p style={{marginTop: "10px", fontSize: "15px"}} id="signo-txt"></p>
              <p style={{marginTop: "10px", fontSize: "13.5px", fontWeight: "600"}} id="astros"></p>
            </div>
            <div className="panel c3 nosolo">
              <h3>No soy solo una streamer…</h3>
              <ul id="nosolo"></ul>
              <p className="cierre" id="nosolo-cierre"></p>
            </div>
            <div className="panel c4">
              <span className="etq">Lo que me gusta</span>
              <div className="tags" id="gustos"></div>
            </div>
            <div className="panel c2">
              <span className="etq">Mis colores</span>
              <div className="swatches" id="colores"></div>
            </div>
          </div>
        </div>
        <div className="galeria" id="galeria"></div>
        <h3 className="sub-h" id="juegos">Lo que juego</h3>
        <p className="sub-p">Mis favoritos de siempre y lo que estoy jugando ahora.</p>
        <div className="estante" id="estante"></div>
      </div>
    </section>
  );
}
