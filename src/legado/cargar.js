// Ejecuta la lógica original de la página, en el mismo orden y de la misma forma que en la versión estática:
// cada archivo corre como un <script> clásico, así comparten las mismas variables globales (CONFIG, $, ico, ruta…)
// y si uno fallara, los demás siguen funcionando.
import s0 from "./00-recursos-e-iconos.js?raw";
import config from "../config.js?raw";
import s2 from "./02-sitio.js?raw";
import s3 from "./03-vistas-todo-marcas-comunidad.js?raw";
import s4 from "./04-fondos-de-logos.js?raw";
import s5 from "./05-direcciones-y-landings.js?raw";
import s6 from "./06-encuadre-de-fotos.js?raw";
import s7 from "./07-spotify.js?raw";
import s8 from "./08-animacion-al-scroll.js?raw";
import s9 from "./09-posts-de-x.js?raw";
import s10 from "./10-kirbitos-twitch.js?raw";

const SCRIPTS = [s0, config, s2, s3, s4, s5, s6, s7, s8, s9, s10];
let cargado = false;
export function cargarLegado() {
  if (cargado) return;
  cargado = true;
  for (const codigo of SCRIPTS) {
    const s = document.createElement("script");
    s.textContent = codigo;
    document.body.appendChild(s);
  }
}
