// Capas fijas: velo y avisos (toast).
// El contenido dinámico (listas, números, juego…) lo completa la lógica de src/legado al cargar la página.
export default function Capas() {
  return (
    <>
      <div id="velo" aria-hidden="true"></div>
      <div className="toast" id="toast" role="status">Mail copiado</div>
    </>
  );
}
