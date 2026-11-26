// ============================================================
// TODO LO QUE SE EDITA DE LA PÁGINA ESTÁ ACÁ (redes, videos, juegos, marcas, novedades, PC, trivia…)
// Se ejecuta como script clásico, igual que en la versión anterior: CONFIG queda disponible para toda la página.
// ============================================================
const CONFIG = {
  alias: "Godcita",
  nombre: "Bianca Galeano",
  saludo: "Hola, soy Bianca",
  frase: "En internet me dicen Godcita. Hago streams, co-streams y contenido de gaming, deporte y lifestyle, siempre con mi comunidad al lado.",
  roles: ["Content creator","Streamer","Host","Gamer","Sports","Lifestyle"],
  enVivo: false,
  edad: 27,
  ciudad: "Villa Luzuriaga, Buenos Aires",
  equipo: "Procyon Team",
  signo: { sol:"Leo", luna:"Escorpio", ascendente:"Cáncer",
           texto:"Nacida un 18 de agosto. Leo con luna en Escorpio y ascendente en Cáncer: mucha energía para el escenario, intensidad para lo que me importa y un corazón enorme para los míos." },
  aQueMeDedico: "Soy streamer de Valorant, CS e IRL en Twitch y Kick, y hago co-streams oficiales de torneos y eventos de eSports. También armo reviews de periféricos, muestro mi camino en el pádel como jugadora principiante y comparto mi día a día. Lo que más me importa es que el que me mira se sienta parte.",
  noSoloStreamer: [
    "Soy Maestra Mayor de Obras.",
    "Soy docente.",
    "Estudio Arquitectura en la FADU-UBA.",
    "Trabajo en el área administrativa de una empresa."
  ],
  noSoloCierre: "Siempre en constante crecimiento y aprendiendo algo nuevo.",
  meGusta: ["Gaming","Pádel","Fútbol","Diseño y arquitectura","Periféricos y setups","Pastelería","Moda","Música"],
  colores: [ {n:"Rosa",c:"#E2337A"}, {n:"Violeta",c:"#9B5CF6"}, {n:"Turquesa",c:"#1E9E90"}, {n:"Negro",c:"#22163A"} ],
  foto: FOTOS.principal,
  // Galería: sumá más fotos agregando {src:"URL o archivo", alt:"descripción"}. Los vacíos se muestran como espacio para foto.
  galeria: [
    {src:FOTOS.eventoPG, alt:"Bianca en Punto Gamers Experience"},
    {src:FOTOS.setup, alt:"Bianca en su setup con auriculares"},
    {src:FOTOS.pgCS, alt:"Bianca jugando Counter-Strike en un evento"},
    {src:FOTOS.padel, alt:"Bianca con la paleta en la cancha de pádel"},
    {src:FOTOS.padelMedallas, alt:"Bianca mostrando sus medallas de pádel"},
    {src:FOTOS.escritorio, alt:"Bianca en su escritorio de stream"}
  ],

  // ===== NÚMEROS (los completa la automatización; null = todavía sin dato) =====
  redes: [
    { id:"twitch", nombre:"Twitch", usuario:"Godcita_", url:"https://twitch.tv/Godcita_",
      seguidores:20587, metricas:[["Espectadores promedio",35],["Pico de espectadores",null],["Horas vistas (30 días)",null],["Horas emitidas (30 días)",null],["Mensajes de chat por stream",null],["Espectadores únicos",null]],
      audiencia:{edad:"18 a 36", hombres:60, mujeres:40, argentina:null, paises:"Argentina, Chile, Perú, Uruguay, México y España"} },
    { id:"kick", nombre:"Kick", usuario:"Godcita", url:"https://kick.com/Godcita",
      seguidores:317, metricas:[["Espectadores promedio",40],["Pico de espectadores",null],["Horas vistas (30 días)",null],["Horas emitidas (30 días)",null],["Mensajes de chat por stream",null],["Suscriptores",null]],
      audiencia:{edad:"18 a 36", hombres:60, mujeres:40, argentina:null, paises:"Argentina, Chile, Perú, Uruguay, México y España"} },
    { id:"instagram", nombre:"Instagram", usuario:"@biancagaleano_", url:"https://instagram.com/biancagaleano_",
      seguidores:11800, metricas:[["Reproducciones (30 días)","400K"],["Vistas promedio por video",null],["Tasa de interacción",null],["Cuentas alcanzadas",null],["Interacciones",null],["Visitas al perfil",null]],
      audiencia:{edad:"18 a 36", hombres:60, mujeres:40, argentina:null, paises:"Argentina, Chile, Perú, Uruguay, México y España"} },
    { id:"gg", nombre:"Instagram gaming", usuario:"@godcita.gg", url:"https://instagram.com/godcita.gg",
      seguidores:1200, metricas:[["Reproducciones (30 días)","50K"],["Vistas promedio por video",null],["Tasa de interacción",null],["Cuentas alcanzadas",null],["Interacciones",null],["Visitas al perfil",null]],
      audiencia:{edad:"18 a 36", hombres:60, mujeres:40, argentina:null, paises:"Argentina, Chile, Perú, Uruguay, México y España"} },
    { id:"tiktok", nombre:"TikTok", usuario:"@biancagaleano_", url:"https://www.tiktok.com/@biancagaleano_",
      seguidores:6203, metricas:[["Reproducciones (30 días)",null],["Vistas promedio por video",null],["Tasa de interacción",null],["Me gusta totales","109,5K"],["Mejor video","21,7K reproducciones"],["Llegada por Para ti",null]],
      audiencia:{edad:"18 a 36", hombres:60, mujeres:40, argentina:null, paises:"Argentina, Chile, Perú, Uruguay, México y España"} },
    { id:"x", nombre:"X", usuario:"@biancagaleano_", url:"https://x.com/biancagaleano_",
      seguidores:1900, metricas:[["Impresiones","2,8M"],["Tasa de interacción","2,8%"],["Interacciones","80,9K"],["Me gusta","26,3K"],["Reposts",241],["Visitas al perfil","49,4K"]],
      audiencia:{edad:"18 a 36", hombres:60, mujeres:40, argentina:null, paises:"Argentina, Chile, Perú, Uruguay, México y España"} },
    { id:"arqui", nombre:"TikTok arqui", usuario:"@futuraarqui", url:"https://www.tiktok.com/@futuraarqui",
      seguidores:1801, metricas:[["Reproducciones (30 días)",null],["Vistas promedio por video",null],["Tasa de interacción",null],["Me gusta totales","24,2K"],["Mejor video","5.139 reproducciones"],["Llegada por Para ti",null]],
      audiencia:{edad:"18 a 36", hombres:60, mujeres:40, argentina:null, paises:"Argentina, Chile, Perú, Uruguay, México y España"} }
  ],
  actualizado: "",   // fecha de la última actualización, formato "2026-11-02" (la completa la automatización)
  // Novedades que pasan en la cinta de arriba
  novedades: ["Nueva trivia: ganá gemas y kirbitos","La cartelera de esta semana ya está","Estoy ahorrando para volver al stream","Pregunta del día nueva todos los días"],

  // ===== EXPERIENCIA Y MARCAS =====
  experiencia: [
    { tipo:"Co-stream oficial", nombre:"VALORANT Game Changers", logo:LOGOS.gamechangers, texto:"Co-streaming oficial del circuito competitivo femenino de Valorant, con análisis en vivo." },
    { tipo:"Co-stream oficial", nombre:"ENC", logo:LOGOS.enc, texto:"Co-streaming oficial del torneo para mi comunidad." },
    { tipo:"Host y análisis", nombre:"Nuvy Community", logo:LOGOS.nuby, texto:"Host y análisis de Valorant en transmisiones, y parte de sus eventos." },
    { tipo:"Eventos", nombre:"Punto Gamers", logo:LOGOS.puntogamer, texto:"Participación en eventos de Punto Gamers." }
  ],
  marcas: [
    { nombre:"AULA Gaming", detalle:"Canje y reviews de periféricos", logo:LOGOS.aula },
    { nombre:"Royal Kludge", detalle:"Periféricos", logo:LOGOS.rk },
    { nombre:"Arena Pro Gaming Club", detalle:"Espacio para streamear", logo:LOGOS.arena },
    { nombre:"Procyon Team", detalle:"Mi equipo", logo:LOGOS.procyon }
  ],
  servicios: [
    ["Integraciones en stream","Tu producto en vivo, usado y mostrado de verdad, no leído de un guion."],
    ["Contenido para redes","Reels, TikToks y posteos pensados para cada plataforma."],
    ["Reviews de producto","Uso el producto en mi día a día y cuento mi experiencia real, con lo bueno y lo mejorable."],
    ["Cobertura y co-streaming","Torneos, lanzamientos y eventos transmitidos con mi comunidad."],
    ["Host y análisis","Conducción y análisis de partidas en transmisiones de eSports."],
    ["Campañas y menciones","Acciones puntuales o campañas largas, a medida de tu marca."]
  ],

  // ===== VIDEOS (cat: reviews, padel, futbol, lifestyle, clips) =====
  // ===== PÁDEL: testeos de palas y clubs (Contenido → Pádel) =====
  testeos: [
    { titulo:"Testeo: Steel Custom Air Impact", marca:"Steel Custom", logoMarca:"logo-stl.png", red:"Instagram", url:"https://www.instagram.com/p/DfAf4U5AwgA/", img:"reco-steel.jpg" }
  ],
  clubs: [],   // { nombre:"", zona:"", img:"", url:"", nota:"" }
  // ===== SHOP: productos de mis colabs y reviews (aparecen en Contenido → Colabs y reviews → Shop) =====
  shop: [
    { nombre:"Teclado Royal Kludge × Shinden", marca:"Royal Kludge", logo:LOGOS.rk, img:"v-royal.jpg", tiendas:[{t:"RK Gaming",u:"https://rkgaming.shop/search?q=shinden"},{t:"Armytech",u:"https://www.armytech.com.ar/module/iqitsearch/searchiqit?s=Shinden"}] },
    { nombre:"Teclado AULA Hero 84HE", marca:"AULA", logo:LOGOS.aula, img:"8bb74b742e.jpg", tiendas:[{t:"AULA Gaming",u:"https://aulagaming.com.ar/"}] },
    { nombre:"Auriculares AULA G7", marca:"AULA", logo:LOGOS.aula, img:"b4fef9633b.jpg", tiendas:[{t:"AULA Gaming",u:"https://aulagaming.com.ar/"}] },
    { nombre:"Mouse AULA CS620", marca:"AULA", logo:LOGOS.aula, img:"d0af99a99f.jpg", tiendas:[{t:"AULA Gaming",u:"https://aulagaming.com.ar/"}] }
  ],
  // Números de cada video (opcional): stats:{vistas:12300, likes:850, compartidos:40, comentarios:25}
  videos: [
    { cat:"reviews", titulo:"Royal Kludge × Shinden", links:[{t:"RK Gaming",u:"https://rkgaming.shop/search?q=shinden"},{t:"Armytech",u:"https://www.armytech.com.ar/module/iqitsearch/searchiqit?s=Shinden"}], marca:"Royal Kludge", logoMarca:LOGOS.rk, red:"Instagram", url:"https://www.instagram.com/p/Df3ET84hcAX/", img:"v-royal.jpg" },
    { cat:"gaming", titulo:"Stremeando en Arena Pro", marca:"Arena Pro", logoMarca:LOGOS.arena, red:"Stream", url:"", img:"f0a9e01afd.jpg", video:VIDEOS_LOCALES.arena },
    { cat:"reviews",   titulo:"Teclado AULA Hero 84HE", links:[{t:"AULA Gaming",u:"https://aulagaming.com.ar/"}], marca:"AULA", logoMarca:LOGOS.aula, red:"Instagram", url:"https://www.instagram.com/reel/DenLkzQxoKH/", img:"8bb74b742e.jpg" },
    { cat:"reviews",   titulo:"Auriculares AULA G7", links:[{t:"AULA Gaming",u:"https://aulagaming.com.ar/"}], marca:"AULA", logoMarca:LOGOS.aula, red:"Instagram", url:"https://www.instagram.com/reel/DfaqMK6Rrna/", img:"b4fef9633b.jpg" },
    { cat:"reviews",   titulo:"Mouse AULA CS620", links:[{t:"AULA Gaming",u:"https://aulagaming.com.ar/"}], marca:"AULA", logoMarca:LOGOS.aula, red:"Instagram", url:"https://www.instagram.com/reel/DfInxSAx6Tu/", img:"d0af99a99f.jpg" },
    { cat:"reviews",   titulo:"Teclado AULA Hero 84HE (parte 2)", links:[{t:"AULA Gaming",u:"https://aulagaming.com.ar/"}], marca:"AULA", logoMarca:LOGOS.aula, red:"Instagram", url:"https://www.instagram.com/reel/De5Dtf6hZts/", img:"fa406ba2f2.jpg" },
    { cat:"padel", titulo:"Soy buena tirando…", red:"Instagram", url:"https://www.instagram.com/p/DeFvcHIRpGy/", img:"v-padel1.jpg" },
    { cat:"padel", titulo:"Un día en la cancha", red:"Instagram", url:"https://www.instagram.com/p/DdZg-J6gDwL/", img:"v-padel2.jpg" },
    { cat:"padel", titulo:"Día 1 jugando contra el HDMP D", red:"Instagram", url:"https://www.instagram.com/p/DfF_dR9BuFp/", img:"v-padel3.jpg" },
    { cat:"padel", titulo:"Mis 5 excusas en la cancha", red:"Instagram", url:"https://www.instagram.com/p/Dd452xLxPYe/", img:"v-padel4.jpg" },
    { cat:"futbol", titulo:"Cómo creo que la paro…", red:"Instagram", url:"https://www.instagram.com/p/Dd5Isg9xC6o/", img:"v-futbol.jpg" },
    { cat:"ometv", titulo:"Estás en OmeTV y te cruzás a tus alumnos", red:"Instagram", url:"https://www.instagram.com/p/DYXr7Vwx8MB/", img:"v-ometv1.jpg" },
    { cat:"ometv", titulo:"OmeTV · parte 2", red:"Instagram", url:"https://www.instagram.com/p/DaQterKp_U7/", img:"v-ometv2.jpg" },
    { cat:"ometv", titulo:"OmeTV · parte 3", red:"Instagram", url:"https://www.instagram.com/p/DZ54bVYRCFG/", img:"v-ometv3.jpg" }
  ],
  // ===== GODCITA REVIEW =====
  reviews: [
    { tipo:"Teclado", nombre:"Producto", veredicto:"Me encantó", opinion:"Mi experiencia usándolo: qué me gustó, qué mejoraría y para qué uso me parece.", producto:"#", video:"#" },
    { tipo:"Mouse", nombre:"Producto", veredicto:"Tiene sus pros y contras", opinion:"Mi experiencia usándolo: qué me gustó, qué mejoraría y para qué uso me parece.", producto:"#", video:"#" },
    { tipo:"Auriculares", nombre:"Producto", veredicto:"Depende de para qué", opinion:"Mi experiencia usándolo: qué me gustó, qué mejoraría y para qué uso me parece.", producto:"#", video:"#" }
  ],
  juegos: [
    { nombre:"VALORANT", nota:"Mi juego principal: stream, co-streams y análisis", img:PORTADAS.valorant },
    { nombre:"Counter-Strike 2", nota:"El otro clásico del canal", img:PORTADAS.cs2 },
    { nombre:"Battlefield 6", nota:"", img:PORTADAS.bf6 },
    { nombre:"League of Legends", nota:"", img:PORTADAS.lol },
    { nombre:"The Sims 4", nota:"", img:PORTADAS.sims },
    { nombre:"Otros", nota:"Lo que voy probando en el stream", c1:"#9B5CF6", c2:"#E2337A" }
  ],
  // ===== UN DÍA CON GODCITA =====
  dia: [
    { h:9,  e:"laburo", t:"Laburo", d:"De lunes a viernes, de 9 a 17 hs, en mi trabajo administrativo. Los sábados también, de 9 a 12." },
    { h:18, e:"padel", t:"Pádel, cuando pinta", d:"Cuando hay cancha y ganas, salgo a jugar." },
    { h:19, e:"estudio", t:"Facu", d:"De 19 a 23 hs cursaba Arquitectura en la FADU. ¡Ya terminé la cursada de este año!" }
  ],
  vlogs: [],   // { titulo:"", url:"", img:"" }
  eventos: [
    { fecha:"Agregar fecha", nombre:"Punto Gamers Experience", texto:"Contá qué hiciste y qué contenido salió.", img:LOGOS.puntogamer },
    { fecha:"Agregar fecha", nombre:"Evento de Nuvy", texto:"Contá qué hiciste y qué contenido salió.", img:LOGOS.nuby }
  ],

  // ===== COMUNIDAD =====
  // Cargá acá a tus kirbitos: { nombre:"usuario", rol:"El que nunca falta", desde:"desde 2023" }
  kirbitosTop: [],
  masKirbitos: [],
  misSueños: {
    real:   { titulo:"Ser pastelera profesional", texto:"Hacer tortas llenas de colores, de las que da pena cortar. Lo veo lejos, pero se puede." },
    magico: { titulo:"Correr el Dakar", texto:"Tengo vértigo y me da miedo la velocidad, así que nunca va a pasar. Pero si hubiera magia, estaría en el desierto." }
  },
  // Pregunta del día: una distinta cada día, en este orden
  preguntasDelDia: [
    "¿Qué cosa chiquita te alegra el día?",
    "¿Cuál es tu primer pensamiento de la mañana?",
    "¿Cuál es el recuerdo de cuando eras chico que más tenés presente? ¿Es lindo o feo?",
    "¿Cuál es tu sueño real? Ese que se ve lejos pero se puede cumplir.",
    "¿Y tu sueño mágico? Ese imposible que tenés desde chico.",
    "Si pudieras tener un superpoder, ¿cuál elegirías y para qué lo usarías?",
    "¿Qué te hace sentir en casa, aunque estés lejos?",
    "¿Qué le dirías a tu yo de hace cinco años?",
    "¿Qué canción te transporta a un momento exacto de tu vida?",
    "¿En qué sos bueno y casi nadie lo sabe?",
    "¿Qué te está costando últimamente?",
    "¿Qué persona te cambió la vida sin saberlo?",
    "¿De qué estás orgulloso aunque nadie te lo haya dicho?",
    "Si mañana no tuvieras que trabajar ni estudiar, ¿qué harías todo el día?"
  ],
  // ¿Esto o aquello? bianca: 0 = primera opción, 1 = segunda, null = todavía no votó.
  // Ojo: las elecciones de Bianca cargadas abajo son DE PRUEBA: reemplazalas por las tuyas.
  estoOAquello: [
    { p:"Para arrancar el día", a:"Mate", b:"Café", bianca:0 },
    { p:"Jugar en", a:"PC", b:"Consola", bianca:0 },
    { p:"Shooter favorito", a:"Valorant", b:"CS", bianca:0 },
    { p:"Deporte", a:"Pádel", b:"Fútbol", bianca:0 },
    { p:"Horario", a:"Noche", b:"Mañana", bianca:0 },
    { p:"Postre", a:"Torta", b:"Helado", bianca:0 },
    { p:"Vacaciones", a:"Playa", b:"Montaña", bianca:null },
    { p:"Plan de sábado", a:"Salir", b:"Quedarse en casa", bianca:null },
    { p:"Mascota", a:"Perro", b:"Gato", bianca:null },
    { p:"Música para jugar", a:"Con música", b:"Sin música", bianca:null },
    { p:"Comida", a:"Pizza", b:"Hamburguesa", bianca:null },
    { p:"En una partida", a:"Ganar", b:"Divertirse", bianca:null },
    { p:"Películas", a:"Terror", b:"Comedia", bianca:null },
    { p:"Mensajes", a:"Audio", b:"Texto", bianca:null },
    { p:"Estación", a:"Verano", b:"Invierno", bianca:null },
    { p:"Desayuno", a:"Dulce", b:"Salado", bianca:null }
  ],
  // Ejemplo: { texto:"Un comentario lindo", autor:"usuario", red:"Twitch" }
  comentarios: [],


  // Mientras armás la página: true muestra los espacios vacíos para completar. Antes de mandarla a marcas, poné false.
  mostrarVacios: true,

  // ===== PARA MARCAS =====
  crecimiento: { meses:["Ago","Sep","Oct","Nov"], comunidad:[null,null,null,null] },   // comunidad total al final de cada mes
  porQueYo: [
    ["Comunidad que participa","Mi chat no mira de costado: comenta, juega, vota y vuelve. Una mención mía se charla, no se pasa de largo."],
    ["Voz propia en los eSports","Host, análisis y co-streams oficiales de Valorant: hablo del juego desde adentro, con mirada propia."],
    ["Más de un nicho","Gaming, pádel, fútbol, arquitectura y lifestyle: llego a públicos distintos con la misma cara."]
  ],
  rubros: ["Periféricos y hardware","Sillas y setups","Energizantes y bebidas","Indumentaria deportiva","Pádel y fútbol","Apps y delivery","Telefonía e internet","Diseño y educación"],
  casos: [
    { marca:"AULA Gaming", logo:"", tipo:"Canje de producto", objetivo:"Dar a conocer el producto entre gamers.", hice:"Unboxing y uso en stream, más contenido en redes.", resultados:[["Vistas",null],["Interacciones",null],["Clics al link",null]] },
    { marca:"VALORANT Game Changers", logo:LOGOS.gamechangers, tipo:"Co-stream oficial", objetivo:"Llevar el torneo a más público.", hice:"Co-streaming del circuito con análisis en vivo.", resultados:[["Espectadores promedio",null],["Pico",null],["Horas transmitidas",null]] },
    { marca:"Nuvy Community", logo:LOGOS.nuby, tipo:"Host y análisis", objetivo:"Conducir y analizar partidas.", hice:"Host y análisis de Valorant en sus transmisiones.", resultados:[["Transmisiones",null],["Espectadores",null],["Horas al aire",null]] }
  ],
  paquetes: [
    { nombre:"Mención", ideal:"Para sumar presencia rápido", items:["Mención en stream en vivo","Link en el chat y en el panel","Una historia en Instagram"] },
    { nombre:"Integración", ideal:"El más elegido", destacado:true, items:["Bloque dedicado en stream con el producto en uso","Video corto para TikTok e Instagram","Link o cupón con seguimiento","Informe de resultados"] },
    { nombre:"Campaña 360", ideal:"Para lanzamientos", items:["Varios streams durante la campaña","Review en video","Contenido en todas mis redes","Acción con la comunidad (sorteo o desafío)","Informe completo de resultados"] }
  ],

  // ===== MI PRÓXIMA PC =====
  pc: {
    texto: "Hoy no tengo computadora propia, así que el stream está en pausa. Estoy ahorrando para armar mi PC y volver con todo. Si querés darme una mano, podés aportar lo que quieras por Mercado Pago: cada aporte suma.",
    meta: null, juntado: null,                       // ej: meta: 1500000, juntado: 320000 (en pesos)
    mpLink: "https://link.mercadopago.com.ar/pagobg",
    alias: "Bianca.galeano.mp",
    tengo: ["Auriculares","Teclado","Mouse"],
    partes: ["Gabinete","Placa madre","Procesador","Placa de video","Memoria RAM","Almacenamiento SSD","Fuente","Refrigeración","Monitor","Micrófono","Cámara","Luces"],
    nota: "Hoy me falta prácticamente toda la PC. Como creadora de contenido, cualquier componente o equipamiento suma: todo se transforma en contenido."
  },

  // ===== LA CARTELERA (lo que pinchás cada semana) =====
  // tipo: el título de la nota. color: "amarillo", "rosa", "lila", "turquesa" o "blanco". autor opcional.
  cartelera: [
    { tipo:"Hit de la semana", texto:"Próximamente", color:"amarillo" },
    { tipo:"Tweet de la semana", texto:"Mi post destacado de la semana.", url:"https://x.com/Biancagaleano_/status/2124507912026407132", autor:"@biancagaleano_", color:"blanco" },
    { tipo:"Chismecito", texto:"Próximamente", color:"rosa" },
    { tipo:"Importante", texto:"Próximamente", color:"lila" },
    { tipo:"Opinión de un kirbito", texto:"Próximamente Las opiniones que me dejen van a aparecer acá.", color:"turquesa" }
  ],

  // ===== TRIVIA: ¿CUÁNTO CONOCÉS A GODCITA? =====
  // forma: "lata", "alfajor" o "caja". correcta: número de opción (0 = la primera).
  // ⚠ Las respuestas correctas cargadas son DE PRUEBA: reemplazalas por las tuyas.
  quiz: [
    // forma: "lata", "alfajor", "caja", "bolsa" o "sushi".
    // Fotos propias: img:"lata-speed.png" muestra una foto que se inclina.
    // Giro 360° como en las tiendas: fotos360:["speed-1.png","speed-2.png", … ] (8 a 16 fotos alrededor del producto, en orden) y se gira arrastrando.
    // ⚠ Las respuestas correctas (correcta: N, 0 = la primera) son DE PRUEBA: cambialas por las tuyas.
    { p:"¿Qué energizante elige Godcita?", forma:"lata", correcta:2, opciones:[
      {n:"Red Bull", etiqueta:"lata-redbull.jpg", radio:21, alto:109, diseno:"redbull", c:"#2B4C9B", c2:"#C8CED8"}, {n:"Monster", etiqueta:"lata-monster.jpg", radio:25, alto:118, diseno:"monster", c:"#1E1E1E", c2:"#6ACB3B"}, {n:"Speed", etiqueta:"lata-speed.jpg", radio:21, alto:104, diseno:"speed", c:"#D7262E", c2:"#F2F2F2"}, {n:"Rockstar", botella:"botella-rockstar.jpg", alto:128, diseno:"rockstar", c:"#1C1C1C", c2:"#E8B923"}, {n:"Black", etiqueta:"lata-black.jpg", radio:21, alto:114, diseno:"black", c:"#141414", c2:"#C9302C"} ]},
    { p:"¿Qué alfajor elegiría Godcita?", forma:"alfajor", correcta:0, opciones:[
      {n:"Guaymallén de fruta", tapa:"#F1E6CC", relleno:"#C2185B", glaseado:true}, {n:"Havanna", tapa:"#4A2C1A", relleno:"#E3B37A"}, {n:"Jorgito", tapa:"#3E2617", relleno:"#D59A5A"}, {n:"Capitán del Espacio", tapa:"#36200F", relleno:"#E8C89A"}, {n:"Fantoche", tapa:"#5A3820", relleno:"#F0CF95"} ]},
    { p:"¿Dónde pide comida rápida?", forma:"bolsa", correcta:0, opciones:[
      {n:"McDonald's", c:"#D62C1E"}, {n:"Burger King", c:"#E86A1C"}, {n:"Wendy's", c:"#C8102E"}, {n:"Mostaza", c:"#F2B705"}, {n:"KFC", c:"#A6192E"} ]},
    { p:"Es fan del sushi. ¿Qué pieza elige primero?", forma:"sushi", correcta:1, opciones:[
      {n:"Nigiri de salmón", tipo:"nigiri"}, {n:"Roll Philadelphia", tipo:"phila"}, {n:"Uramaki California", tipo:"california"}, {n:"Sashimi", tipo:"sashimi"}, {n:"Hossomaki de pepino", tipo:"hosso"} ]},
    { p:"¿Cuál es su juego principal?", forma:"caja", correcta:0, opciones:[
      {n:"VALORANT", c:"#FF4655"}, {n:"Counter-Strike", c:"#2D5BD0"}, {n:"Minecraft", c:"#3E8E41"}, {n:"Fortnite", c:"#7B4BD8"}, {n:"League of Legends", c:"#C8A44D"} ]}
  ],
  // Premios que salen de la caja: una gema por cada acierto (en este orden). Acertar todo suma la corona.
  gemas: [ {n:"Esmeralda", v:10, c1:"#7CF2B0", c2:"#0E8F5A"}, {n:"Zafiro", v:15, c1:"#8FC2FF", c2:"#1E4FBF"}, {n:"Rubí", v:20, c1:"#FF8FA8", c2:"#B0123A"}, {n:"Amatista", v:25, c1:"#D9B8FF", c2:"#6B2FBF"}, {n:"Diamante", v:40, c1:"#FFFFFF", c2:"#9FD8F0"} ],
  coronaBonus: 50,
  kirbitosPorAcierto: 10,

  // ===== RECOMENDACIONES =====
  recomendaciones: [
    { id:"gaming", nombre:"Zona gaming", grupos:[
      { t:"Juegos que recomiendo", items:[ {nombre:"VALORANT", nota:"Si te gustan los tácticos y jugar en equipo."}, {nombre:"Counter-Strike", nota:"El clásico que nunca falla."} ]} ]},
    { id:"miro", nombre:"Anime y pelis", miro:true, grupos:[] },
    { id:"musica", nombre:"Música", musica:true, grupos:[] }
  ],
  // ===== LO QUE MIRO (estrellas del 1 al 5; detalle es opcional). tipo: "Anime" o "Película" =====
  miro: [
    {nombre:"Solo Leveling", tipo:"Anime", img:"miro-sololeveling.jpg", estrellas:5, detalle:{"Cinemática":4,"Opening":4,"Desarrollo":5}},
    {nombre:"Naruto", tipo:"Anime", img:"miro-naruto.jpg", estrellas:4, detalle:{"Cinemática":2,"Opening":4,"Desarrollo":4}},
    {nombre:"Dan Da Dan", tipo:"Anime", img:"miro-dandadan.jpg", estrellas:3, detalle:{"Cinemática":5,"Opening":5,"Desarrollo":3}},
    {nombre:"Frieren", tipo:"Anime", img:"miro-frieren.jpg", estrellas:3, detalle:{"Cinemática":3,"Opening":3,"Desarrollo":3}}
  ],
  // Lo destacado de la semana. por: "Lo más viral", "Elegido por Godcita" o "Elegido por la comunidad".
  semana: [],
  // Música en vivo: conectá Spotify a Last.fm (gratis) y poné tu usuario y una API key de Last.fm.
  musica: { lastfmUsuario:"Biancagaleano_", lastfmKey:"111fae417fe1812d480f31ed9539dd33", spotifyPerfil:"" },

  // ===== MARCAS POR RUBRO =====
  // videos: categoría de Contenido que se muestra para ese rubro ("reviews","padel","futbol","lifestyle","clips")
  rubrosMarca: [
    { id:"general", nombre:"Todas", intro:"Creo contenido de gaming, deporte y lifestyle para una comunidad argentina que participa. Me adapto al producto: lo uso de verdad y lo cuento a mi manera.",
      hago:["Streams y co-streams","Videos cortos para TikTok e Instagram","Reviews con mi experiencia de uso","Contenido de pádel y fútbol","Lifestyle y mi día a día"],
      ideas:["Integración en stream o en video","Serie de contenido con tu producto","Acción con la comunidad: sorteo, desafío o trivia"], videos:"todos" },
    { id:"gaming", nombre:"Gaming y tecnología", fotos:[FOTOS.eventoPG,FOTOS.visa,FOTOS.pgCS,FOTOS.setup,FOTOS.escritorio,FOTOS.aula1,FOTOS.aula2,FOTOS.aula3,FOTOS.aula4], intro:"Streams de Valorant y CS, co-streams oficiales, host y análisis de eSports, y reviews de periféricos.",
      hago:["Co-streams oficiales (VALORANT Game Changers, ENC)","Host y análisis de Valorant","Reviews de periféricos","Clips del stream"],
      ideas:["Periférico usado en vivo durante el stream","Review en video con mi experiencia","Patrocinio de un co-stream o torneo","Componentes para armar mi PC en contenido"], videos:"reviews" },
    { id:"padel", nombre:"Pádel y deportes", fotos:[FOTOS.padel,FOTOS.padelPelota,FOTOS.padelMedallas], intro:"Soy jugadora principiante de pádel y muestro mi progreso en la cancha, camino a mi primer torneo.",
      hago:["Serie diaria camino a mi primer torneo","Clases con mi profe","Progreso real, con errores y avances","Contenido en la cancha"],
      ideas:["Pala, indumentaria o calzado usados en la serie","Equipamiento para mi primer torneo","Contenido en tu club o cancha","Desafío de pádel con la comunidad"], videos:"padel" },
    { id:"futbol", nombre:"Fútbol", intro:"Juego y miro fútbol, y lo comparto en mis redes.",
      hago:["Videos jugando","Contenido de partidos y previas","Lifestyle futbolero"],
      ideas:["Botines, pelota o indumentaria en contenido","Previa de partido con tu marca","Desafío futbolero con la comunidad"], videos:"futbol" },
    { id:"lifestyle", nombre:"Lifestyle, comida y más", intro:"Mi día a día: facu, laburo, entrenamiento, comida, salidas y todo lo del medio.",
      hago:["Un día conmigo y vlogs","Comida y salidas","Moda y estilo","Arquitectura y diseño"],
      ideas:["Producto integrado a mi rutina","Contenido en tu local o evento","Recomendación en mis redes"], videos:"lifestyle" }
  ],

  // ===== SETUPS Y "¿QUÉ OPINÁS DE ESTO?" =====
  miSetup: {
    titulo: "Mi setup anterior",
    texto: "Así era mi lugar de stream. Hoy no tengo PC: solo me quedan los periféricos que conseguí por canje.",
    foto: FOTOS.setup,
    tengo: ["Auriculares","Teclado","Mouse"]
  },
  setups: [   // ejemplos; los reales llegan por el formulario y los aprobás vos
      ],

  // ===== CÓMO TRABAJAMOS (para marcas) =====
  modalidades: [
    ["Canje de producto","Me envían el producto, lo uso en mi día a día y genero contenido real con él."],
    ["Tarifa","Contenido pago por formato: integración en stream, videos, reviews o campañas. Te paso mi tarifa según lo que necesites."],
    ["Propuesta a medida","¿Tenés una idea o un presupuesto definido? Contame qué buscás y lo armamos juntos."]
  ],
  proceso: [
    ["Me contás","Qué buscás, para cuándo y con qué presupuesto o producto."],
    ["Te propongo","En 48 horas te mando propuesta, formatos y números actualizados."],
    ["Creo el contenido","Lo produzco con mi estilo y te lo muestro antes de publicar si lo necesitás."],
    ["Te muestro resultados","Publico y te envío un informe con alcance, interacciones y clics."]
  ],

  // ===== COMUNIDAD EXTRA =====
  discord: { url:"", miembros:null },   // link de invitación a tu Discord
  proximos: [ { fecha:"Próximamente", titulo:"Vuelta al stream", detalle:"Te aviso por redes el día y la hora." } ],
  premios: [
    { nombre:"Elegís el juego del stream", costo:500 },
    { nombre:"Saludo y shoutout en vivo", costo:300 },
    { nombre:"Jugar una partida conmigo", costo:1500 },
    { nombre:"Participar del sorteo del mes", costo:200 }
  ],
  kirbitoDelMes: { nombre:"", motivo:"" },   // ej: { nombre:"usuario", motivo:"Estuvo en todos los streams y armó los mejores clips" }
  colabs: [],   // { nombre:"Streamer", url:"https://twitch.tv/...", que:"Qué hicimos juntos" }

  // ===== CONEXIONES =====
  backendURL: "",
  formspree: "https://formspree.io/f/xgakpdbq",   // mensajes de los formularios → godcita.business@gmail.com
  // backendURL: URL de tu Google Apps Script (planilla). Vacío = se usa Formspree.
  kirbitosPorDia: 60,
  email: "godcita.business@gmail.com"
};

// ===== Números automáticos: los trae el robot semanal (stats.json) =====
(function(){
  if(location.protocol==="file:")return;
  try{
    const x=new XMLHttpRequest();x.open("GET","stats.json?v="+new Date().toISOString().slice(0,10),false);x.send();
    if(x.status!==200)return;const S=JSON.parse(x.responseText);
    for(const r of CONFIG.redes){const d=S.redes&&S.redes[r.id];if(!d)continue;
      if(d.seguidores!=null)r.seguidores=d.seguidores;
      if(d.metricas){r.metricas.forEach(m=>{if(d.metricas[m[0]]!=null)m[1]=d.metricas[m[0]]});
        for(const k in d.metricas)if(d.metricas[k]!=null&&!r.metricas.some(m=>m[0]===k))r.metricas.push([k,d.metricas[k]]);}
      if(d.audiencia)Object.assign(r.audiencia,d.audiencia);}
    if(S.actualizado)CONFIG.actualizado=S.actualizado;
    if(S.historial&&S.historial.length){const N=["Ene","Feb","Mar","Abr","May","Jun","Jul","Ago","Sep","Oct","Nov","Dic"];
      const h=S.historial.slice(-4);CONFIG.crecimiento={meses:h.map(x=>N[+x.mes.slice(5,7)-1]),comunidad:h.map(x=>x.total||null)};}
    if(S.redes&&((S.redes.twitch&&S.redes.twitch.vivo)||(S.redes.kick&&S.redes.kick.vivo)))CONFIG.enVivo=true;
  }catch(e){}
})();

