import { useEffect } from "react";
import Barra from "./componentes/Barra.jsx";
import Pie from "./componentes/Pie.jsx";
import Capas from "./componentes/Capas.jsx";
import Inicio from "./secciones/Inicio.jsx";
import SobreMi from "./secciones/SobreMi.jsx";
import Contenido from "./secciones/Contenido.jsx";
import PortadaMarcas from "./secciones/PortadaMarcas.jsx";
import Numeros from "./secciones/Numeros.jsx";
import Experiencia from "./secciones/Experiencia.jsx";
import PorQueYo from "./secciones/PorQueYo.jsx";
import Contacto from "./secciones/Contacto.jsx";
import PortadaComunidad from "./secciones/PortadaComunidad.jsx";
import MiComunidad from "./secciones/MiComunidad.jsx";
import Novedades from "./secciones/Novedades.jsx";
import EnX from "./secciones/EnX.jsx";
import Recomendaciones from "./secciones/Recomendaciones.jsx";
import Setups from "./secciones/Setups.jsx";
import MiDia from "./secciones/MiDia.jsx";
import MiPc from "./secciones/MiPc.jsx";
import Jugar from "./secciones/Jugar.jsx";
import Privacidad from "./secciones/Privacidad.jsx";
import { cargarLegado } from "./legado/cargar.js";

// La página se arma una sola vez; después la lógica original (src/legado) completa listas, números, juego, trivia y navegación.
// Por eso App no tiene estado: React no vuelve a dibujar estas partes y no pisa lo que hace la lógica.
export default function App() {
  useEffect(() => { cargarLegado(); }, []);
  return (
    <>
      <Barra />
      <main>
        <Inicio />
        <SobreMi />
        <Contenido />
        <PortadaMarcas />
        <Numeros />
        <Experiencia />
        <PorQueYo />
        <Contacto />
        <PortadaComunidad />
        <MiComunidad />
        <Novedades />
        <EnX />
        <Recomendaciones />
        <Setups />
        <MiDia />
        <MiPc />
        <Jugar />
        <Privacidad />
      </main>
      <Pie />
      <Capas />
    </>
  );
}
