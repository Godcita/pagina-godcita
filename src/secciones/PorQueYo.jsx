// Marcas · Por qué yo.
// El contenido dinámico (listas, números, juego…) lo completa la lógica de src/legado al cargar la página.
export default function PorQueYo() {
  return (
    <section className="bloque" data-cap="marca" id="porque">
      <div className="wrap">
        <div className="cabeza">
          <h2>Por qué yo</h2>
          <p>Lo que suma tenerme en tu campaña y qué hago según tu rubro.</p>
        </div>
        <div className="pqy" id="pqy"></div>
        <div className="rubros" id="rubros" hidden></div>
      </div>
    </section>
  );
}
