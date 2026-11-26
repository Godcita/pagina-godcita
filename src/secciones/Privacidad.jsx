// Privacidad y reglas.
// El contenido dinámico (listas, números, juego…) lo completa la lógica de src/legado al cargar la página.
export default function Privacidad() {
  return (
    <section className="bloque" data-cap="ambos" id="legal">
      <div className="wrap legal">
        <div className="cabeza">
          <h2>Privacidad y reglas</h2>
          <p>Corto y claro.</p>
        </div>
        <h3>Tus datos</h3>
        <ul>
          <li>
            Lo que mandás en los formularios (mensajes, opiniones, propuestas de marcas, avisos) le llega solo a Bianca, por mail.
          </li>
          <li>Tu nombre es opcional. Si no lo ponés, aparece como "Anónimo".</li>
          <li>Nada se publica sin tu permiso: solo lo que marcaste como publicable y Bianca aprobó.</li>
          <li>El mail o usuario que dejás para "Avisame" se usa solo para avisarte que volví al stream.</li>
          <li>Si querés que borre algo tuyo, escribime a godcita.business@gmail.com.</li>
          <li>
            Tus votos, récords y kirbitos se guardan en tu propio navegador. Si borrás los datos del navegador, se reinician.
          </li>
        </ul>
        <h3>Reglas de los kirbitos</h3>
        <ul>
          <li>
            Los kirbitos son puntos de la comunidad: se ganan jugando, con la trivia y con las rachas de visita.
          </li>
          <li>Se canjean por premios del stream. No son dinero ni se cambian por plata.</li>
          <li>Hay un tope diario para que sea justo para todos.</li>
          <li>Si alguien hace trampa, Bianca puede anular sus kirbitos.</li>
          <li>Los premios y sus valores pueden cambiar; los actualizados están en la sección Jugar.</li>
        </ul>
        <h3>Opiniones y reseñas</h3>
        <p>
          Las reseñas y recomendaciones son mi experiencia y mi gusto personal, no verdades absolutas. Las colaboraciones pagas o con canje se indican como tales.
        </p>
      </div>
    </section>
  );
}
