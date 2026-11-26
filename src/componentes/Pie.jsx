// Pie de página.
// El contenido dinámico (listas, números, juego…) lo completa la lógica de src/legado al cargar la página.
export default function Pie() {
  return (
    <footer>
      <div>Godcita · Bianca Galeano · hecho en Buenos Aires</div>
      <div style={{fontSize: "12px", opacity: ".6", marginTop: "6px"}}>Versión 26-nov</div>
      <div className="pie">
        <a href="#legal">Privacidad y reglas</a>
        <a href="#contacto">Contacto para marcas</a>
        <a href="#cartelera">Dejar mi opinión</a>
      </div>
    </footer>
  );
}
