const $=s=>document.querySelector(s);
const esc=s=>String(s??"").replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const safeSrc=s=>/^(data:image\/|https?:\/\/|\.?\/?[\w\-\/]+\.(jpe?g|png|webp|gif)$)/i.test(s||"")?s:"";
const num=n=>n==null?"—":typeof n==="string"?n:n>=1e6?(n/1e6).toFixed(1).replace(".",",")+" M":n>=1e4?Math.round(n/1e3)+" mil":n.toLocaleString("es-AR");
const C=CONFIG, colAv=["#E2337A","#9B5CF6","#1E9E90","#F5B82E","#2D5BD0"];
const lee=(k,d)=>{try{const v=localStorage.getItem(k);return v==null?d:JSON.parse(v)}catch(e){return d}};
const guarda=(k,v)=>{try{localStorage.setItem(k,JSON.stringify(v))}catch(e){}};
const ASUNTOS={marca:"Nueva propuesta de marca",mensaje:"Nuevo mensaje de la comunidad",aviso:"Alguien quiere que le avises cuando vuelvas",envio:"Nuevo envío de la comunidad"};
const enviar=async datos=>{
  if(C.backendURL)return fetch(C.backendURL,{method:"POST",mode:"no-cors",headers:{"Content-Type":"text/plain"},body:JSON.stringify(datos)});
  const d={...datos};const tenia=!!d.imagen;delete d.imagen;if(tenia)d.foto="Mandó una foto (no se adjunta por mail)";
  d._subject=(ASUNTOS[d.tipo]||"Nuevo mensaje desde tu página")+(d.marca?": "+d.marca:"");
  if(d.mail)d._replyto=d.mail;
  const r=await fetch(C.formspree,{method:"POST",headers:{"Content-Type":"application/json","Accept":"application/json"},body:JSON.stringify(d)});
  if(!r.ok)throw new Error("formspree "+r.status);return r;};
let REMOTO=null;  // datos del backend (respuestas, votos, ranking)

// tema
try{const t=localStorage.getItem("tema");if(t)document.documentElement.dataset.theme=t}catch(e){}
$("#tema").onclick=()=>{const d=getComputedStyle(document.documentElement).colorScheme.includes("dark")?"light":"dark";document.documentElement.dataset.theme=d;guarda("tema",d);try{localStorage.setItem("tema",d)}catch(e){}};
if(C.enVivo)$("#vivo").style.display="inline-flex";

// hero
$("#saludo").innerHTML=esc(C.saludo)+" "+ico("hola","hy-mano"); $("#alias").textContent=C.alias; $("#frase").textContent=C.frase;
$("#roles").innerHTML=C.roles.map(r=>`<span>${esc(r)}</span>`).join("");
$("#datos-rapidos").innerHTML=[["lugar",C.ciudad.split(",")[0]],["signo",C.signo.sol],["edad",`${C.edad} años`],["estudio","MMO y Arquitectura"],["equipo",C.equipo]]
  .map(([i,d])=>`<span class="dato">${ico(i,"dato-ico")}${esc(d)}</span>`).join("");
// íconos puestos en el HTML con data-ico
document.querySelectorAll("[data-ico]").forEach(e=>{e.innerHTML=ico(e.dataset.ico)});

// sobre mí
$("#foto").innerHTML=safeSrc(C.foto)?`<img src="${safeSrc(C.foto)}" alt="Foto de ${esc(C.nombre)}">`:`<div class="foto-vacia"><b>B</b>Acá va tu foto principal</div>`;
$("#intro-foto").innerHTML=safeSrc(C.foto)?`<img src="${safeSrc(C.foto)}" alt="Foto de ${esc(C.nombre)}">`:"";
$("#dedico").textContent=C.aQueMeDedico; $("#edad").textContent=C.edad+" años"; $("#ciudad").textContent=C.ciudad;
$("#sol").textContent=C.signo.sol; $("#signo-txt").textContent=C.signo.texto;
$("#astros").textContent=`☾ Luna en ${C.signo.luna} · ↑ Ascendente en ${C.signo.ascendente}`;
$("#nosolo").innerHTML=C.noSoloStreamer.map(x=>`<li>${esc(x)}</li>`).join(""); $("#nosolo-cierre").textContent=C.noSoloCierre;
$("#gustos").innerHTML=C.meGusta.map(g=>`<span class="tag">${esc(g)}</span>`).join("");
$("#colores").innerHTML=C.colores.map(c=>`<span class="swatch" tabindex="0" data-n="${esc(c.n)}" style="background:${esc(c.c)}" aria-label="${esc(c.n)}"></span>`).join("");
$("#galeria").innerHTML=C.galeria.map(g=>safeSrc(g.src)?`<div class="slot lleno"><img src="${safeSrc(g.src)}" alt="${esc(g.alt)}" loading="lazy"></div>`:`<div class="slot">Espacio para otra foto</div>`).join("");

// números
const sumar=f=>{const t=C.redes.reduce((a,r)=>a+(typeof f(r)==="number"?f(r):0),0);return t||null};
$("#kit").innerHTML=[
  ["Comunidad total",num(sumar(r=>r.seguidores))],
  ["Plataformas",C.redes.length],
  ["Reproducciones (30 días)",num(sumar(r=>(r.metricas.find(m=>/Reproducciones|Impresiones/.test(m[0]))||[])[1]))],
  ["Contenido","Valorant · CS · Pádel · Lifestyle"]
].map(([l,v],i)=>`<div class="panel"><span class="etq">${l}</span><div class="v" style="${i==3?"font-size:21px;line-height:1.25":""}">${esc(v)}</div></div>`).join("");
let red=C.redes[0].id;
function pct(v){return v==null?"—":v+"%"}
function pintarRed(){
  $("#redes-tabs").innerHTML=C.redes.map(r=>`<button class="pill" data-r="${r.id}" aria-pressed="${r.id===red}">${esc(r.nombre)}</button>`).join("");
  const r=C.redes.find(x=>x.id===red), a=r.audiencia;
  $("#red-grande").innerHTML=`<span class="etq">${esc(r.nombre)} · ${esc(r.usuario)}</span><div class="cifra" data-n="${r.seguidores??""}">${num(r.seguidores)}</div><div>seguidores</div><a href="${esc(r.url)}" target="_blank" rel="noopener">Ver perfil</a>`;
  const h=a.hombres??0,m=a.mujeres??0;
  const visibles=r.metricas.filter(m=>m[1]!=null||C.mostrarVacios);
  const top=visibles.slice(0,2), resto=visibles.slice(2);
  const frase=(a.edad||a.hombres!=null||a.paises)?[a.edad?`Me ve sobre todo gente de ${esc(a.edad)} años.`:"",a.hombres!=null?`${pct(a.hombres)} hombres y ${pct(a.mujeres)} mujeres.`:"",a.paises?`Me ven sobre todo desde ${esc(a.paises)}.`:(a.argentina!=null?pct(a.argentina)+" desde Argentina.":"")].filter(Boolean).join(" "):"Acá va a aparecer quién me ve: edad, género y de dónde.";
  $("#minis").innerHTML=top.map(([l,v])=>`<div class="panel"><div class="v">${num(v)}</div><span class="etq" style="margin:4px 0 0">${esc(l)}</span></div>`).join("")
   +`<div class="panel audiencia"><span class="etq">Quién me ve</span><div class="barra-aud" aria-hidden="true"><i style="width:${h}%;background:var(--lila)"></i><i style="width:${m}%;background:var(--rosa)"></i></div><p style="font-size:15.5px;margin-top:8px">${frase}</p></div>`
   +(resto.length?`<details class="mas-metricas"><summary>Ver más métricas de ${esc(r.nombre)}</summary><ul class="lista-simple">${resto.map(([l,v])=>`<li><span>${esc(l)}</span><b>${num(v)}</b></li>`).join("")}</ul></details>`:"");
  const el=$("#red-grande .cifra"),n=+el.dataset.n;
  if(n&&!matchMedia("(prefers-reduced-motion: reduce)").matches){const t0=performance.now();const f=t=>{const p=Math.min(1,(t-t0)/900);el.textContent=num(Math.round(n*(1-Math.pow(1-p,3))));if(p<1)requestAnimationFrame(f)};requestAnimationFrame(f)}
}
$("#redes-tabs").onclick=e=>{const b=e.target.closest("button");if(b){red=b.dataset.r;pintarRed()}};
pintarRed();
$("#actualizado").textContent=C.actualizado?"Actualizado el "+C.actualizado:"Los números aparecen cuando conectemos tus redes.";

// experiencia y marcas
const logoOr=(src,txt,cls)=>safeSrc(src)?`<img src="${safeSrc(src)}" alt="Logo de ${esc(txt)}">`:esc(txt.split(" ").map(w=>w[0]).join("").slice(0,2));
$("#exp").innerHTML=[...C.experiencia,...C.marcas.map(m=>({tipo:m.nombre==="Procyon Team"?"Equipo":"Marca",nombre:m.nombre,logo:m.logo,texto:m.detalle}))].map(x=>`<div class="panel"><div class="logo-e">${logoOr(x.logo,x.nombre)}</div><div><span class="tipo">${esc(x.tipo)}</span><h3>${esc(x.nombre)}</h3><p class="muted" style="font-size:15.5px">${esc(x.texto)}</p></div></div>`).join("");
$("#marcas-lista").innerHTML=C.marcas.map(m=>`<div class="panel marca"><div class="logo-m">${safeSrc(m.logo)?`<img src="${safeSrc(m.logo)}" alt="Logo de ${esc(m.nombre)}">`:esc(m.nombre)}</div><div><b style="font-family:'Geist';font-size:18px">${esc(m.nombre)}</b><div class="muted" style="font-size:14px">${esc(m.detalle)}</div></div></div>`).join("");

// videos
const nomCat={todos:"",gaming:"gaming",reviews:"colabs y reviews",ometv:"OmeTV",padel:"pádel",futbol:"fútbol",lifestyle:"lifestyle",clips:"clips"};
function numCorto(n){return n>=1e6?(n/1e6).toFixed(1).replace(".0","").replace(".",",")+" M":n>=1e3?(n/1e3).toFixed(n>=1e4?0:1).replace(".0","").replace(".",",")+" mil":String(n)}
function statsVideo(v){const st=v.stats||{};const it=[["vistas","ojo","vistas"],["likes","corazon","me gusta"],["compartidos","compartir","compartidos"],["comentarios","charla","comentarios"]].filter(([k])=>st[k]!=null);
  return it.length?`<div class="v-stats">${it.map(([k,i,n])=>`<span title="${n}">${ico(i)}${numCorto(st[k])}<span class="sr"> ${n}</span></span>`).join("")}</div>`:""}
function pintarVideos(cat){
  const vs=cat==="todos"?C.videos:C.videos.filter(v=>v.cat===cat);
  $("#lista-videos").innerHTML=vs.length?vs.map(v=>`<div class="video-item"><a class="video" ${v.video?`href="#" data-vid="${C.videos.indexOf(v)}"`:`href="${esc(v.url)}" target="_blank" rel="noopener"`}><div class="thumb">${safeSrc(v.img)?`<img src="${safeSrc(v.img)}" alt="">`:""}<span class="red">${esc(v.red)}</span><span class="play" aria-hidden="true">${ico("play")}</span></div><h3>${esc(v.titulo)}</h3>${statsVideo(v)}${v.marca?`<span class="v-marca">${safeSrc(v.logoMarca)?`<img src="${safeSrc(v.logoMarca)}" alt="">`:""}${esc(v.marca)}</span>`:""}</a>${(v.links||[]).length?`<div class="v-links">${v.links.map(l=>`<a href="${esc(l.u)}" target="_blank" rel="noopener">${ico("carrito")}${esc(l.t)}</a>`).join("")}</div>`:""}</div>`).join(""):`<p class="vacio"><span class="proximo">Próximamente</span> Videos de ${nomCat[cat]}.</p>`;
  const subV=$("#sub-videos");
  const SUBS={reviews:[["videos","Videos"],["shop","Shop"]],padel:[["videos","Videos"],["testeo","Testeo"],["clubs","Clubs"]]};
  window.subVid=window.subVid||{};
  if(SUBS[cat]){const act=window.subVid[cat]||"videos";subV.hidden=false;subV.dataset.cat=cat;
    subV.innerHTML=SUBS[cat].map(([k,n])=>`<button type="button" data-sv="${k}" aria-pressed="${k===act}">${n}</button>`).join("");
    const L=$("#lista-videos");
    if(act==="shop")L.innerHTML=C.shop.map(p=>`<article class="shop-card"><div class="shop-img"><img src="${esc(p.img)}" alt="" loading="lazy">${safeSrc(p.logo)?`<span class="shop-logo"><img src="${safeSrc(p.logo)}" alt="${esc(p.marca)}"></span>`:""}</div><h3>${esc(p.nombre)}</h3><div class="shop-tiendas">${p.tiendas.map(l=>`<a class="btn" href="${esc(l.u)}" target="_blank" rel="noopener">Comprar en ${esc(l.t)} ↗</a>`).join("")}</div></article>`).join("");
    if(act==="testeo")L.innerHTML=C.testeos.length?C.testeos.map(v=>`<div class="video-item"><a class="video" href="${esc(v.url)}" target="_blank" rel="noopener"><div class="thumb">${v.img?`<img src="${esc(v.img)}" alt="">`:""}<span class="red">${esc(v.red)}</span><span class="play" aria-hidden="true">${ico("play")}</span></div><h3>${esc(v.titulo)}</h3>${statsVideo(v)}${v.marca?`<span class="v-marca">${v.logoMarca?`<img src="${esc(v.logoMarca)}" alt="" style="object-fit:contain;background:#fff">`:""}${esc(v.marca)}</span>`:""}</a></div>`).join(""):`<p class="vacio"><span class="proximo">Próximamente</span> Mis testeos de palas.</p>`;
    if(act==="clubs")L.innerHTML=C.clubs.length?C.clubs.map(c=>`<article class="shop-card">${c.img?`<div class="shop-img"><img src="${esc(c.img)}" alt="" loading="lazy"></div>`:""}<h3>${esc(c.nombre)}</h3>${c.zona?`<p class="muted" style="margin:0 4px">${esc(c.zona)}</p>`:""}${c.nota?`<p style="margin:0 4px">${esc(c.nota)}</p>`:""}${c.url?`<div class="shop-tiendas"><a href="${esc(c.url)}" target="_blank" rel="noopener">Ver el club ↗</a></div>`:""}</article>`).join(""):`<p class="vacio"><span class="proximo">Próximamente</span> Los clubs donde entreno y juego.</p>`;
  }else{subV.hidden=true}
  document.querySelectorAll("#filtros button").forEach(b=>b.setAttribute("aria-pressed",b.dataset.cat===cat));
}
$("#filtros").onclick=e=>{const b=e.target.closest("button");if(b)pintarVideos(b.dataset.cat)};
$("#sub-videos").onclick=e=>{const b=e.target.closest("button");if(b){const c=e.currentTarget.dataset.cat;window.subVid[c]=b.dataset.sv;pintarVideos(c)}};

pintarVideos("todos");

// review, juegos, día, vlogs, eventos
$("#reco").innerHTML=C.reviews.map(p=>`<article class="panel producto"><span class="tipo">${esc(p.tipo)}</span><h3>${esc(p.nombre)}</h3><span class="veredicto">${esc(p.veredicto)}</span><p class="consejo">${esc(p.opinion)}</p><div class="acciones"><a href="${esc(p.video)}" target="_blank" rel="noopener">Ver la review</a><a href="${esc(p.producto)}" target="_blank" rel="noopener">Ver producto</a></div></article>`).join("");
$("#estante").innerHTML=C.juegos.map(j=>`<div class="juego">${safeSrc(j.img)?`<img class="tapa tapa-img" src="${safeSrc(j.img)}" alt="Portada de ${esc(j.nombre)}" loading="lazy">`:`<div class="tapa tapa-otros" style="background:linear-gradient(160deg,${esc(j.c1)},${esc(j.c2)})"><span>${esc(j.nombre)}</span><small>y más…</small></div>`}<p><b>${esc(j.nombre)}</b>${j.nota?`<br>${esc(j.nota)}`:""}</p></div>`).join("");
const sl=$("#slider"); sl.max=C.dia.length-1;
$("#horas").innerHTML=C.dia.map(x=>`<span>${x.h}h</span>`).join("");
function pintarDia(i){const x=C.dia[i];$("#reloj").innerHTML=`${String(x.h).padStart(2,"0")}<small>:00 hs</small>`;$("#actividad").innerHTML=`<div class="emoji">${ICONOS[x.e]?ico(x.e):esc(x.e)}</div><h3>${esc(x.t)}</h3><p class="muted" style="font-size:18px">${esc(x.d)}</p>`}
sl.oninput=()=>pintarDia(+sl.value); sl.value=0; pintarDia(+sl.value);
$("#vlogs").innerHTML=C.vlogs.length?C.vlogs.map(v=>`<a class="video" href="${esc(v.url)}" target="_blank" rel="noopener"><div class="thumb" style="aspect-ratio:16/9">${safeSrc(v.img)?`<img src="${safeSrc(v.img)}" alt="">`:""}<span class="play" aria-hidden="true">${ico("play")}</span></div><h3>${esc(v.titulo)}</h3></a>`).join("")
  :`<div class="vlog-vacio"><b><span class="proximo">Próximamente</span> Vlogs</b>Mis días completos en video: laburo, pádel, facu y todo lo del medio.</div>`;
$("#eventos-lista").innerHTML=C.eventos.map(ev=>`<article class="panel evento"><div class="img">${safeSrc(ev.img)?`<img class="logo-chico" src="${safeSrc(ev.img)}" alt="Logo de ${esc(ev.nombre)}">`:"Foto del evento"}</div><div class="txt"><span class="fecha">${esc(ev.fecha)}</span><h3>${esc(ev.nombre)}</h3><p class="muted">${esc(ev.texto)}</p></div></article>`).join("");

// comunidad
const med=[ico("medalla","oro"),ico("medalla","plata"),ico("medalla","bronce")];
$("#top").innerHTML=!C.kirbitosTop.length?`<div class="panel vacio-comu" style="grid-column:1/-1;padding:22px 24px"><span class="proximo">Próximamente</span><h3 style="margin-top:10px">Los kirbitos de oro</h3><p class="muted">Los que están en cada stream, con el rol que se ganaron y desde cuándo me bancan.</p></div>`:C.kirbitosTop.map((g,i)=>`<div class="panel fan ${i===0?"oro":""}"><span class="medalla">${med[i]||""}</span><div class="av" style="background:${colAv[i%5]}">${esc(g.nombre[0].toUpperCase())}</div><h3>${esc(g.nombre)}</h3><div class="muted" style="font-size:14px">${esc(g.desde)}</div><span class="rol">${esc(g.rol)}</span></div>`).join("");
$("#mas-fans").innerHTML=C.masKirbitos.map(n=>`<span>${esc(n)}</span>`).join("");
$("#comentarios").innerHTML=!C.comentarios.length?`<div class="panel com"><p><span class="proximo">Próximamente</span></p><span>Los comentarios más lindos de la comunidad van a aparecer acá.</span></div>`:C.comentarios.map(c=>`<div class="panel com"><p>“${esc(c.texto)}”</p><span>${esc(c.autor)} en ${esc(c.red)}</span></div>`).join("");
$("#sr-t").textContent=C.misSueños.real.titulo; $("#sr-x").textContent=C.misSueños.real.texto;
$("#sm-t").textContent=C.misSueños.magico.titulo; $("#sm-x").textContent=C.misSueños.magico.texto;

// pregunta del día / contame
const hoy=new Date(), diaN=Math.floor((hoy-new Date(hoy.getFullYear(),0,0))/864e5);
const preguntaHoy=C.preguntasDelDia[diaN%C.preguntasDelDia.length];
$("#pregunta").textContent=preguntaHoy;
$("#fecha-hoy").textContent="Pregunta de hoy · "+hoy.toLocaleDateString("es-AR",{weekday:"long",day:"numeric",month:"long"});
let modo="dia";
function setModo(m){modo=m;$("#tab-dia").setAttribute("aria-selected",m==="dia");$("#tab-contame").setAttribute("aria-selected",m==="contame");$("#modo-dia").hidden=m!=="dia";$("#modo-contame").hidden=m!=="contame";$("#estado-form").textContent=""}
$("#tab-dia").onclick=()=>setModo("dia"); $("#tab-contame").onclick=()=>setModo("contame");
function pintarRespuestas(lista){
  $("#respuestas").innerHTML=lista.length?lista.map(r=>`<div class="panel resp"><div class="q">${esc(r.pregunta)}${r.animo?`<span class="animo">${esc(r.animo)}</span>`:""}</div><p>${esc(r.respuesta)}</p><div class="de">${esc(r.nombre||"Anónimo")}</div>${r.respuestaBianca?`<div class="vuelta"><b>Bianca respondió</b>${esc(r.respuestaBianca)}</div>`:""}</div>`).join("")
  :`<div class="panel resp"><p class="muted"><span class="proximo">Próximamente</span> Acá van a aparecer las respuestas que publique. ¡Sé la primera persona en contarme algo!</p></div>`;
}
pintarRespuestas([]);
$("#form-charla").onsubmit=async e=>{
  e.preventDefault();
  const txt=$("#respuesta").value.trim(), est=$("#estado-form");
  if(txt.length<2){est.textContent="Escribí tu mensaje antes de enviar.";$("#respuesta").focus();return}
  const datos={tipo:"mensaje",pregunta:modo==="dia"?preguntaHoy:"Contame algo",animo:modo==="contame"?document.querySelector('input[name=animo]:checked').value:"",respuesta:txt,nombre:$("#nombre").value.trim()||"Anónimo",publicar:$("#publicar").checked};
  if(!C.backendURL&&!C.formspree){est.textContent="Modo prueba: cuando conectemos tu planilla, los mensajes te van a llegar.";return}
  try{await enviar(datos);est.textContent=datos.publicar?"¡Gracias! Bianca lo va a leer y, si lo aprueba, aparece acá.":"¡Gracias! Le llega solo a Bianca.";$("#respuesta").value=""}
  catch(err){est.textContent="No se pudo enviar. Revisá tu conexión y probá de nuevo."}
};

// esto o aquello + compatibilidad
let misVotos=lee("eoa-votos",{});
function pintarVotos(){
  const conteo=(REMOTO&&REMOTO.votos)||{};
  $("#votos").innerHTML=C.estoOAquello.map((q,i)=>{
    const mio=misVotos[i], c=conteo[i]||[0,0];
    const tot=c[0]+c[1]+(mio!=null&&!REMOTO?1:0);
    const cnt=[c[0]+(mio===0&&!REMOTO?1:0), c[1]+(mio===1&&!REMOTO?1:0)];
    const opt=(k,txt)=>{const p=tot?Math.round(cnt[k]/tot*100):0;
      return `<button data-q="${i}" data-o="${k}" aria-pressed="${mio===k}"><i class="fill" style="width:${mio!=null?p:0}%"></i><span>${esc(txt)}</span>${mio!=null?`<span class="pct">${p}% de la comunidad</span>`:""}${mio!=null&&q.bianca===k?`<span class="bianca">Bianca</span>`:""}</button>`};
    return `<div class="panel voto"><div class="q">${esc(q.p)}</div><div class="opciones">${opt(0,q.a)}${opt(1,q.b)}</div></div>`}).join("");
  // compatibilidad
  const comunes=C.estoOAquello.map((q,i)=>[q.bianca,misVotos[i]]).filter(([b,m])=>b!=null&&m!=null);
  if(comunes.length<5){$("#compat-n").textContent="?";$("#medidor").style.setProperty("--p",0);$("#compat-t").textContent="¿Qué tan amigos seríamos?";
    $("#compat-x").textContent=`Votá ${Math.max(0,5-comunes.length)} preguntas más (de las que Bianca ya votó) y te digo nuestro porcentaje de amistad.`;return}
  const p=Math.round(comunes.filter(([b,m])=>b===m).length/comunes.length*100);
  $("#compat-n").textContent=p+"%"; $("#medidor").style.background=`conic-gradient(var(--rosa) ${p}%, var(--superficie) 0)`;
  const [t,x]=p>=80?["Amigos de toda la vida","Somos casi la misma persona. Te espero en el stream con el mate listo."]:p>=60?["Muy buena química","Tenemos mucho en común y lo que no, lo discutimos en el chat."]:p>=40?["Amigos con debate","Coincidimos en algunas, en otras no. Ideal para charlas largas."]:["Polos opuestos","No coincidimos casi en nada… y justamente por eso nos llevaríamos bien."];
  $("#compat-t").textContent=t; $("#compat-x").textContent=`Coincidimos en ${comunes.filter(([b,m])=>b===m).length} de ${comunes.length} preguntas. ${x}`;
}
$("#votos").onclick=e=>{const b=e.target.closest("button[data-q]");if(!b)return;const q=+b.dataset.q,o=+b.dataset.o;
  const nuevo=misVotos[q]==null; misVotos[q]=o; guarda("eoa-votos",misVotos);
  if(C.backendURL&&nuevo)enviar({tipo:"voto",id:q,opcion:o}).catch(()=>{});
  pintarVotos();};
pintarVotos();

// servicios y contacto
$("#servs").innerHTML=C.servicios.map(([t,d])=>`<div class="panel"><h3>${esc(t)}</h3><p class="muted" style="font-size:15.5px">${esc(d)}</p></div>`).join("");
$("#mail").textContent=C.email;
const colRed={twitch:"#9146FF",kick:"#2FB52F",instagram:"#D6338B",gg:"#B04BD8",tiktok:"#222",x:"#333",arqui:"#555"};
const icoRed=r=>`<span class="red-ico" style="background:${colRed[r.id]||"var(--lila)"}">${safeSrc(r.icono)?`<img src="${safeSrc(r.icono)}" alt="">`:esc(r.nombre.replace(/[^A-Za-z]/g,"").slice(0,2).toUpperCase())}</span>`;
$("#links").innerHTML=C.redes.map(r=>`<li><a href="${esc(r.url)}" target="_blank" rel="noopener"><span>${icoRed(r)}${esc(r.nombre)}</span><span>${esc(r.usuario)}</span></a></li>`).join("");
$("#copiar").onclick=async()=>{try{await navigator.clipboard.writeText(C.email)}catch(e){}const t=$("#toast");t.classList.add("ver");setTimeout(()=>t.classList.remove("ver"),1800)};

// ===== JUEGO =====
let pintarRanking=()=>{};
(function(){
  const cv=$("#juego"), ctx=cv.getContext("2d"), W=cv.width, H=cv.height, PISO=H-40, PX=110;
  const fecha=new Date().toISOString().slice(0,10);
  let total=lee("kirbitos-total",0), record=lee("kirbitos-record",0), diario=lee("kirbitos-dia",{f:fecha,n:0});
  if(diario.f!==fecha)diario={f:fecha,n:0};
  $("#twitch-user").value=lee("kirbitos-user","");
  const css=v=>getComputedStyle(document.documentElement).getPropertyValue(v).trim();
  let estado="inicio",jug,obs,mon,parts,vel,t,partida,ult,saltos,edif,msg;
  function reset(){jug={y:PISO,vy:0,sq:1};obs=[];mon=[];parts=[];vel=5;t=0;partida=0;saltos=0;msg=null;
    edif=Array.from({length:9},(_,i)=>({x:i*110,w:60+Math.random()*40,h:40+Math.random()*90}));}
  function marcador(){$("#k-partida").textContent="Partida: "+partida;$("#k-total").textContent="Total: "+total+" kirbitos";
    const u=$("#twitch-user").value.trim();$("#k-record").textContent="Tu récord: "+record+(u?` (${u})`:"")}
  pintarRanking=function(){
    const local=[{usuario:$("#twitch-user").value.trim()||"Vos",record}];
    const lista=(REMOTO&&REMOTO.ranking&&REMOTO.ranking.length)?REMOTO.ranking:(record?local:[]);
    $("#ranking").innerHTML=lista.length?lista.slice(0,8).map((r,i)=>`<div><span>${i<3?ico("medalla",["oro","plata","bronce"][i]):(i+1)+"."} <b>${esc(r.usuario)}</b></span><span>${r.record}</span></div>`).join("")
      :`<p class="muted" style="font-size:15px">Todavía no hay récords. ¡Jugá y poné tu usuario!</p>`;
  };
  function saltar(){
    if(estado!=="jugando"){reset();estado="jugando";ult=performance.now();requestAnimationFrame(loop);return}
    if(saltos<2){jug.vy=saltos===0?-11.5:-9.5;saltos++;jug.sq=.75}
  }
  cv.addEventListener("pointerdown",e=>{e.preventDefault();saltar()});
  addEventListener("keydown",e=>{if((e.code==="Space"||e.code==="ArrowUp")&&!/INPUT|TEXTAREA|BUTTON/.test(document.activeElement.tagName)){const r=cv.getBoundingClientRect();if(r.top<innerHeight&&r.bottom>0){e.preventDefault();saltar()}}});
  // personaje: el kirby pixelado (se aplasta un poco al saltar). Si la imagen no cargó, queda el Godcito dibujado.
  const KIMG=new Image();KIMG.src="kirbito.png";KIMG.onload=()=>{if(estado!=="jugando")dibujar()};
  function personaje(x,y){
    const sq=jug.sq;
    ctx.fillStyle="rgba(0,0,0,.28)";ctx.beginPath();ctx.ellipse(x,PISO+3,18*(1-(PISO-y)/300),4,0,0,7);ctx.fill();
    if(KIMG.complete&&KIMG.naturalWidth){const w=48/Math.sqrt(sq),h=48*214/251*sq;ctx.imageSmoothingEnabled=false;ctx.drawImage(KIMG,x-w/2,y-h+2,w,h);ctx.imageSmoothingEnabled=true;return}
    godcito(x,y)}
  function godcito(x,y){ // respaldo: personaje original con coronita
    const sq=jug.sq, w=36/sq*.9+3, h=34*sq;
    ctx.fillStyle=css("--lila");ctx.beginPath();ctx.roundRect(x-w/2,y-h,w,h,10);ctx.fill();
    const blink=(t%180)<6;
    ctx.fillStyle="#fff";ctx.beginPath();ctx.arc(x-6,y-h+13,4.5,0,7);ctx.arc(x+8,y-h+13,4.5,0,7);ctx.fill();
    ctx.fillStyle="#22163A";if(blink){ctx.fillRect(x-10,y-h+12,9,2);ctx.fillRect(x+4,y-h+12,9,2)}else{ctx.beginPath();ctx.arc(x-5,y-h+13,2.2,0,7);ctx.arc(x+9,y-h+13,2.2,0,7);ctx.fill()}
    ctx.fillStyle="#FF8FB8";ctx.beginPath();ctx.arc(x-11,y-h+21,3,0,7);ctx.arc(x+13,y-h+21,3,0,7);ctx.fill();
    ctx.fillStyle=css("--sol");ctx.beginPath();const cy=y-h;ctx.moveTo(x-10,cy);ctx.lineTo(x-10,cy-10);ctx.lineTo(x-4,cy-4);ctx.lineTo(x+1,cy-12);ctx.lineTo(x+6,cy-4);ctx.lineTo(x+11,cy-10);ctx.lineTo(x+11,cy);ctx.closePath();ctx.fill();
  }
  // lo que se junta: estrellas (rosa = 1 kirbito, dorada = 5, con brillo)
  function kirbito(m){ctx.save();ctx.translate(m.x,m.y+Math.sin((t+m.x)/14)*4);ctx.rotate(Math.sin(t/8)*.2);
    if(m.oro){const gl=ctx.createRadialGradient(0,0,3,0,0,24);gl.addColorStop(0,"rgba(247,196,80,.6)");gl.addColorStop(1,"rgba(247,196,80,0)");ctx.fillStyle=gl;ctx.beginPath();ctx.arc(0,0,24,0,7);ctx.fill()}
    ctx.fillStyle=m.oro?css("--sol"):css("--rosa");ctx.beginPath();
    for(let i=0;i<10;i++){const r=i%2?6:13,a=i*Math.PI/5-Math.PI/2;ctx.lineTo(Math.cos(a)*r,Math.sin(a)*r)}ctx.closePath();ctx.fill();
    ctx.fillStyle=m.oro?"#1B1428":"#fff";ctx.font="bold 9px 'Geist',sans-serif";ctx.textAlign="center";ctx.fillText(m.oro?"5":"K",0,3.5);ctx.restore();}
  function obstaculo(o){
    if(o.tipo==="ladrillos"){for(let f=0;f<o.h/12;f++)for(let c=0;c<2;c++){ctx.fillStyle=f%2?"#B8462F":"#C8553D";ctx.fillRect(o.x+c*16+(f%2?4:0),PISO-(f+1)*12,14,10)}}
    else if(o.tipo==="cono"){ctx.fillStyle="#F28C28";ctx.beginPath();ctx.moveTo(o.x,PISO);ctx.lineTo(o.x+o.w/2,PISO-o.h);ctx.lineTo(o.x+o.w,PISO);ctx.closePath();ctx.fill();ctx.fillStyle="#fff";ctx.fillRect(o.x+o.w*.3,PISO-o.h*.55,o.w*.4,4)}
    else{ctx.fillStyle="#D6E64B";ctx.beginPath();ctx.arc(o.x+o.w/2,PISO-o.h/2,o.h/2,0,7);ctx.fill();ctx.strokeStyle="#fff";ctx.lineWidth=2;ctx.beginPath();ctx.arc(o.x+o.w/2-o.h/3,PISO-o.h/2,o.h/2.4,-1,1);ctx.stroke()}
  }
  function dibujar(){
    ctx.clearRect(0,0,W,H);ctx.fillStyle=css("--superficie");ctx.fillRect(0,0,W,H);
    // skyline de fondo (arquitectura)
    ctx.fillStyle=css("--suave");edif.forEach(b=>{ctx.fillRect(b.x,PISO-b.h,b.w,b.h);ctx.fillStyle=css("--linea");for(let wy=PISO-b.h+10;wy<PISO-10;wy+=16)for(let wx=b.x+8;wx<b.x+b.w-8;wx+=14)ctx.fillRect(wx,wy,6,8);ctx.fillStyle=css("--suave")});
    ctx.strokeStyle=css("--linea");ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(0,PISO+1);ctx.lineTo(W,PISO+1);ctx.stroke();
    ctx.fillStyle=css("--linea");for(let i=0;i<W+40;i+=40)ctx.fillRect(i-(t*vel)%40,PISO+14,14,2);
    mon.forEach(kirbito);obs.forEach(obstaculo);
    parts.forEach(p=>{ctx.globalAlpha=Math.max(0,p.v/30);ctx.fillStyle=p.c;ctx.fillRect(p.x,p.y,4,4)});ctx.globalAlpha=1;
    personaje(PX,jug.y);
    if(msg&&msg.v>0){ctx.globalAlpha=Math.min(1,msg.v/20);ctx.fillStyle=css("--rosa");ctx.font="bold 20px 'Geist',sans-serif";ctx.textAlign="center";ctx.fillText(msg.t,W/2,50);ctx.globalAlpha=1}
    ctx.fillStyle=css("--tinta");ctx.textAlign="center";
    if(estado==="inicio"){ctx.font="bold 26px 'Geist',sans-serif";ctx.fillText("Tocá para empezar",W/2,90);ctx.font="15px 'Instrument Sans',sans-serif";ctx.fillStyle=css("--gris");ctx.fillText("Saltá ladrillos, conos y pelotas de pádel. Estrella rosa = 1 kirbito, dorada = 5.",W/2,118)}
    if(estado==="fin"){ctx.font="bold 26px 'Geist',sans-serif";ctx.fillText(partida?`¡+${partida} kirbitos!`:"¡Uy! Otra vez",W/2,88);ctx.font="15px 'Instrument Sans',sans-serif";ctx.fillStyle=css("--gris");ctx.fillText(diario.n>=C.kirbitosPorDia?"Llegaste al tope de hoy. Mañana podés juntar más.":"Tocá para jugar de nuevo",W/2,116)}
  }
  function ganar(n,x,y){const libres=Math.max(0,C.kirbitosPorDia-diario.n),g=Math.min(n,libres);if(!g)return;partida+=g;total+=g;diario.n+=g;guarda("kirbitos-total",total);guarda("kirbitos-dia",diario);
    for(let i=0;i<10;i++)parts.push({x,y,vx:(Math.random()-.5)*6,vy:(Math.random()-.8)*6,v:30,c:n>1?css("--sol"):css("--rosa")});marcador()}
  function loop(now){
    if(estado!=="jugando")return;
    const dt=Math.min(2,(now-ult)/16.67);ult=now;t+=dt;
    const antes=Math.floor(vel);vel+=.0025*dt;if(Math.floor(vel)>antes)msg={t:"¡Más rápido!",v:60};
    jug.vy+=.6*dt;jug.y=Math.min(PISO,jug.y+jug.vy*dt);if(jug.y===PISO){jug.vy=0;saltos=0}
    jug.sq+=(1-jug.sq)*.2*dt;
    edif.forEach(b=>{b.x-=vel*.25*dt;if(b.x<-b.w){b.x+=990;b.h=40+Math.random()*90}});
    if(!obs.length||obs[obs.length-1].x<W-(260+Math.random()*280)){const r=Math.random();obs.push(r<.45?{tipo:"ladrillos",x:W,w:34,h:24+12*Math.floor(Math.random()*2)}:r<.75?{tipo:"pelota",x:W,w:26,h:26}:{tipo:"cono",x:W,w:28,h:32})}
    if(Math.random()<.018*dt)mon.push({x:W,y:PISO-40-Math.random()*110,oro:Math.random()<.08});
    obs.forEach(o=>o.x-=vel*dt);mon.forEach(m=>m.x-=vel*dt);
    parts.forEach(p=>{p.x+=p.vx*dt;p.y+=p.vy*dt;p.vy+=.3*dt;p.v-=dt});parts=parts.filter(p=>p.v>0);
    if(msg)msg.v-=dt;
    obs=obs.filter(o=>o.x>-60);
    mon=mon.filter(m=>{if(Math.abs(m.x-PX)<24&&Math.abs(m.y-(jug.y-20))<30){ganar(m.oro?5:1,m.x,m.y);return false}return m.x>-20});
    for(const o of obs){if(PX+14>o.x+4&&PX-14<o.x+o.w-4&&jug.y>PISO-o.h+4){estado="fin";if(partida>0&&window.kirbitosSync)window.kirbitosSync("juego",partida);if(partida>record){record=partida;guarda("kirbitos-record",record);msg={t:"¡Nuevo récord!",v:90}}marcador();pintarRanking();dibujar();return}}
    dibujar();requestAnimationFrame(loop);
  }
  reset();marcador();dibujar();pintarRanking();
  new MutationObserver(()=>{if(estado!=="jugando")dibujar()}).observe(document.documentElement,{attributes:true,attributeFilter:["data-theme"]});
  $("#twitch-user").addEventListener("input",()=>{marcador();pintarRanking()});
  $("#canjear").onclick=async()=>{
    const u=$("#twitch-user").value.trim(),est=$("#estado-canje");
    if(!u){est.textContent="Escribí tu usuario de Twitch para guardar tus kirbitos.";$("#twitch-user").focus();return}
    guarda("kirbitos-user",u);marcador();pintarRanking();
    if(!C.backendURL){est.textContent=`Guardado en este dispositivo: ${total} kirbitos y récord de ${record} para ${u}. Cuando conectemos la planilla, le llegan a Bianca.`;return}
    try{await enviar({tipo:"kirbitos",usuario:u,total,record});est.textContent=`¡Listo! ${total} kirbitos guardados para ${u}. Canjealos en el próximo stream.`}catch(e){est.textContent="No se pudo guardar. Probá de nuevo en un rato."}
  };
})();


// ===== v6: bloques para marcas y comunidad =====
const VAC=C.mostrarVacios;
const ocultar=(id,cond)=>{const el=document.getElementById(id);if(el)el.classList.toggle("oculto",!!cond)};
const tag=t=>VAC?`<span class="vacio-tag">${t||"completar"}</span>`:"";
// crecimiento
(()=>{const v=C.crecimiento.comunidad,max=Math.max(1,...v.filter(x=>x!=null));const tiene=v.some(x=>x!=null);
  $("#grafico").innerHTML=C.crecimiento.meses.map((m,i)=>`<div class="col"><small>${v[i]!=null?num(v[i]):"—"}</small><div class="bar ${v[i]==null?"sin":""}" style="height:${v[i]!=null?Math.max(6,v[i]/max*100):18}%"></div><small>${esc(m)}</small></div>`).join("");
  ocultar("bloque-crec",!tiene&&!VAC);})();
$("#descargar").onclick=()=>window.print();$("#descargar2").onclick=()=>window.print();
// por qué yo
$("#pqy").innerHTML=C.porQueYo.map(([t,d],i)=>`<div class="panel"><span class="n">0${i+1}</span><h3>${esc(t)}</h3><p class="muted" style="margin-top:8px;font-size:15.5px">${esc(d)}</p></div>`).join("");
$("#rubros").innerHTML=`<span style="border:0;background:none;padding-left:0;color:var(--gris)">Encajo con:</span>`+C.rubros.map(r=>`<span>${esc(r)}</span>`).join("");
// casos
$("#casos").innerHTML=C.casos.map(c=>`<article class="panel caso"><div class="top"><div class="lg">${safeSrc(c.logo)?`<img src="${safeSrc(c.logo)}" alt="Logo de ${esc(c.marca)}">`:esc(c.marca.slice(0,2))}</div><div><span class="tipo" style="font-size:13px;color:var(--rosa);font-weight:600">${esc(c.tipo)}</span><h3>${esc(c.marca)}</h3></div></div>
  <dl><dt>Objetivo</dt><dd>${esc(c.objetivo)}</dd><dt>Qué hice</dt><dd>${esc(c.hice)}</dd></dl>
  <div class="res">${c.resultados.map(([l,v])=>`<div><b>${v!=null?esc(num(v)):"—"}</b><span>${esc(l)}</span></div>`).join("")}</div></article>`).join("");
// paquetes + form marca
$("#paquetes").innerHTML=C.paquetes.map(p=>`<div class="panel paquete ${p.destacado?"dest":""}"><span class="ideal">${esc(p.ideal)}</span><h3>${esc(p.nombre)}</h3><ul>${p.items.map(i=>`<li>${esc(i)}</li>`).join("")}</ul><a class="btn ${p.destacado?"":"sec"}" href="#form-marca" data-paq="${esc(p.nombre)}">Pedir tarifa</a></div>`).join("");
$("#fm-paquete").innerHTML=C.paquetes.map(p=>`<option>${esc(p.nombre)}</option>`).join("")+"<option>A medida</option>";
$("#paquetes").addEventListener("click",e=>{const a=e.target.closest("[data-paq]");if(a)$("#fm-paquete").value=a.dataset.paq});
$("#form-marca").onsubmit=async e=>{e.preventDefault();const est=$("#fm-estado"),marca=$("#fm-marca").value.trim(),mail=$("#fm-mail").value.trim();
  if(!marca){est.textContent="Escribí el nombre de la marca.";$("#fm-marca").focus();return}
  if(!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(mail)){est.textContent="Revisá el mail: así no te puedo responder.";$("#fm-mail").focus();return}
  const datos={tipo:"marca",marca,mail,modalidad:$("#fm-modo").value,paquete:$("#fm-paquete").value,presupuesto:$("#fm-pres").value,objetivo:$("#fm-obj").value,fechas:$("#fm-fecha").value.trim(),mensaje:$("#fm-msg").value.trim()};
  if(!C.backendURL&&!C.formspree){location.href=`mailto:${C.email}?subject=${encodeURIComponent("Propuesta de "+marca)}&body=${encodeURIComponent(`Marca: ${marca}\nMail: ${mail}\nModalidad: ${datos.modalidad}\nPaquete: ${datos.paquete}\nPresupuesto: ${datos.presupuesto}\nObjetivo: ${datos.objetivo}\nFechas: ${datos.fechas}\n\n${datos.mensaje}`)}`;est.textContent="Se abrió tu mail con la propuesta lista para enviar.";return}
  try{await enviar(datos);est.textContent="¡Gracias! Te respondo en las próximas 48 horas.";e.target.reset()}catch(err){est.textContent="No se pudo enviar. Escribime directo a "+C.email}};
$("#modos").innerHTML=C.modalidades.map(([t,d],i)=>`<div class="panel modo ${i===1?"dest":""}"><h3>${esc(t)}</h3><p>${esc(d)}</p></div>`).join("");
$("#proceso").innerHTML=C.proceso.map(([t,d])=>`<li class="panel"><h3>${esc(t)}</h3><p class="muted">${esc(d)}</p></li>`).join("");
// comunidad extra
if(C.discord.url){$("#discord-btn").href=C.discord.url;if(C.discord.miembros)$("#discord-txt").textContent=`${num(C.discord.miembros)} kirbitos ya están adentro. Charlas, avisos de stream, partidas y sorteos.`}
else{$("#discord-btn").removeAttribute("href");$("#discord-btn").textContent="Próximamente";$("#discord-btn").style.pointerEvents="none"}
ocultar("bloque-discord",!C.discord.url&&!VAC);
$("#proximos").innerHTML=C.proximos.map(x=>`<li><span><b>${esc(x.titulo)}</b><br><span class="muted" style="font-size:14px">${esc(x.detalle)}</span></span><span class="muted" style="font-size:14px;white-space:nowrap">${esc(x.fecha)}</span></li>`).join("");
if(C.kirbitoDelMes.nombre){$("#kdm-av").textContent=C.kirbitoDelMes.nombre[0].toUpperCase();$("#kdm-n").textContent=C.kirbitoDelMes.nombre;$("#kdm-m").textContent=C.kirbitoDelMes.motivo}
else{$("#kdm-n").innerHTML='<span class="proximo">Próximamente</span>';$("#kdm-m").textContent="Cada mes voy a destacar a alguien de la comunidad que la rompió. ¡Puede ser vos!"}
$("#colabs").innerHTML=C.colabs.map(c=>`<a href="${esc(c.url)}" target="_blank" rel="noopener"><b>${esc(c.nombre)}</b> <span class="muted">· ${esc(c.que)}</span></a>`).join("")||`<span class="proximo">Próximamente</span> <span class="muted">Las colabs con otros streamers van a aparecer acá.</span>`;
ocultar("bloque-colabs",!C.colabs.length&&!VAC);
$("#premios").innerHTML=C.premios.map(p=>`<li><span>${esc(p.nombre)}</span><b>${num(p.costo)} kirbitos</b></li>`).join("");
// ocultar vacíos en secciones existentes
if(!VAC){
  ocultar("galeria",false); document.querySelectorAll("#galeria .slot:not(.lleno)").forEach(x=>x.remove());
  if(!C.vlogs.length)ocultar("vlogs",true);
  if(C.eventos.every(e=>/Agregar/.test(e.fecha)))ocultar("eventos",true);
}

// ===== v7: portada con cuadros y hojas desplegables =====
(function(){
  const totalCom=sumar(r=>r.seguidores);
  const pcPct=C.pc.meta&&C.pc.juntado!=null?Math.min(100,Math.round(C.pc.juntado/C.pc.meta*100)):null;


  const nombres={sobre:"Sobre mí",dia:"Mi día",pc:"Mi PC",porque:"Por qué yo",experiencia:"Experiencia",contacto:"Contacto",numeros:"Números",videos:"Contenido",recomendaciones:"Recomendaciones",juegos:"Juegos",eventos:"Eventos",comunidad:"Comunidad",quiz:"Trivia",jugar:"Jugar",cartelera:"Cartelera",legal:"Privacidad",setups:"Setups"};
  document.querySelectorAll("main > section.bloque").forEach(sec=>{
    sec.setAttribute("role","dialog");sec.setAttribute("aria-modal","true");sec.setAttribute("aria-label",nombres[sec.id]||sec.id);
    const w=sec.querySelector(".wrap");const top=document.createElement("div");top.className="hoja-top";
    top.innerHTML=`<button class="volver" type="button">← Volver al inicio</button><div class="ir-otra">${Object.entries(nombres).filter(([k])=>k!==sec.id).map(([k,v])=>`<a href="#${k}">${v}</a>`).join("")}</div>`;
    w.prepend(top); top.querySelector(".volver").onclick=()=>cerrar();
  });
  let ultimoFoco=null, origen=null;
  const reduce=matchMedia("(prefers-reduced-motion: reduce)").matches;
  const clipDesde=(el,r)=>{const R=el.getBoundingClientRect();
    return `inset(${Math.max(0,r.top-R.top)}px ${Math.max(0,R.right-r.right)}px ${Math.max(0,R.bottom-r.bottom)}px ${Math.max(0,r.left-R.left)}px round 18px)`};
  function abrir(id,ancla,desde){
    const sec=document.getElementById(id); if(!sec||!sec.classList.contains("bloque"))return;
    const yaAbierta=sec.classList.contains("abierta");
    document.querySelectorAll("main > section.abierta").forEach(x=>x!==sec&&x.classList.remove("abierta"));
    if(!yaAbierta){ultimoFoco=ultimoFoco||document.activeElement;sec.classList.add("abierta");sec.scrollTop=0;
      origen=desde&&desde.classList.contains("tile")?desde:null;
      $("#velo").classList.add("on");
      if(!reduce){
        if(origen){sec.animate([{clipPath:clipDesde(sec,origen.getBoundingClientRect()),opacity:.55},{clipPath:"inset(0px 0px 0px 0px round 28px)",opacity:1}],{duration:520,easing:"cubic-bezier(.2,.85,.25,1)"});
          sec.querySelector(".wrap").animate([{opacity:0,transform:"scale(.97)"},{opacity:1,transform:"none"}],{duration:420,delay:120,easing:"ease-out",fill:"backwards"})}
        else sec.animate([{opacity:0,transform:"scale(.96)"},{opacity:1,transform:"none"}],{duration:320,easing:"cubic-bezier(.2,.85,.25,1)"});
      }}
    document.body.classList.add("con-hoja");
    setTimeout(()=>{if(ancla){const a=document.getElementById(ancla);if(a&&a.tagName==="DETAILS")a.open=true;if(a)sec.scrollTo({top:a.offsetTop-80,behavior:"smooth"})}sec.querySelector(".volver").focus({preventScroll:true})},yaAbierta?0:200);
  }
  let cerrando=false;
  function cerrar(){
    const sec=document.querySelector("main > section.abierta"); if(!sec||cerrando)return;
    const fin=()=>{sec.classList.remove("abierta");cerrando=false;document.body.classList.remove("con-hoja");
      if(ultimoFoco&&ultimoFoco.focus)ultimoFoco.focus({preventScroll:true});ultimoFoco=null;origen=null};
    $("#velo").classList.remove("on");
    if(location.hash)history.replaceState(null,"",location.pathname+location.search);
    if(reduce){fin();return}
    cerrando=true;
    const anim=origen&&document.contains(origen)
      ? sec.animate([{clipPath:"inset(0px 0px 0px 0px round 28px)",opacity:1},{clipPath:clipDesde(sec,origen.getBoundingClientRect()),opacity:.4}],{duration:420,easing:"cubic-bezier(.5,0,.75,0)"})
      : sec.animate([{opacity:1,transform:"none"},{opacity:0,transform:"scale(.96)"}],{duration:240,easing:"ease-in"});
    anim.onfinish=fin;
  }
  $("#velo").addEventListener("click",()=>cerrar());
  const esHoja=id=>false;
  document.addEventListener("click",e=>{const a=e.target.closest("a[href^='#']");if(!a)return;const id=a.getAttribute("href").slice(1);
    if(esHoja(id)){e.preventDefault();if(location.hash!=="#"+id)history.pushState(null,"","#"+id);abrir(id,a.dataset.ancla||null,a)}
    else if(id&&document.getElementById(id)){const cont=document.getElementById(id).closest("section.bloque");if(cont&&cont.classList.contains("abierta")){e.preventDefault();cont.scrollTo({top:document.getElementById(id).offsetTop-80,behavior:"smooth"})}}});
  addEventListener("popstate",()=>{const id=location.hash.slice(1);esHoja(id)?abrir(id):cerrar()});
  addEventListener("hashchange",()=>{const id=location.hash.slice(1);if(esHoja(id))abrir(id);else if(!id)cerrar()});
  addEventListener("keydown",e=>{if(e.key==="Escape"&&document.body.classList.contains("con-hoja"))cerrar()});
  const inicial=location.hash.slice(1); if(esHoja(inicial))abrir(inicial);

  // preview animado del juego en el cuadro
  (function(){const cv=document.querySelector(".preview-juego");if(!cv)return;const g=cv.getContext("2d"),W=cv.width,H=cv.height,P=H-24;
    const css=v=>getComputedStyle(document.documentElement).getPropertyValue(v).trim();
    const KP=new Image();KP.onload=()=>{if(!corre)frame()};KP.src="kirbito.png";
    let t=0,y=P,vy=0,obs=[{x:300,k:0},{x:560,k:1}],st=[{x:420,y:P-70},{x:700,y:P-55}],corre=false,raf=null;
    const ed=Array.from({length:8},(_,i)=>({x:i*95,w:50+((i*37)%30),h:30+((i*53)%60)}));
    function frame(){t++;ed.forEach(b=>{b.x-=.6;if(b.x<-b.w)b.x+=760});obs.forEach(o=>{o.x-=3;if(o.x<-30)o.x+=640+Math.random()*120});st.forEach(s=>{s.x-=3;if(s.x<-20){s.x+=640+Math.random()*200;s.y=P-45-Math.random()*45}});
      const prox=obs.find(o=>o.x>70&&o.x<150);if(prox&&y>=P&&o_dist(prox)){vy=-8.6}vy+=.5;y=Math.min(P,y+vy);if(y===P)vy=0;
      g.clearRect(0,0,W,H);g.fillStyle=css("--suave");ed.forEach(b=>g.fillRect(b.x,P-b.h,b.w,b.h));
      g.strokeStyle=css("--linea");g.lineWidth=2;g.beginPath();g.moveTo(0,P+1);g.lineTo(W,P+1);g.stroke();
      st.forEach(s=>{g.save();g.translate(s.x,s.y+Math.sin((t+s.x)/10)*3);g.fillStyle=css("--rosa");g.beginPath();for(let i=0;i<10;i++){const r=i%2?5:11,a=i*Math.PI/5-Math.PI/2;g.lineTo(Math.cos(a)*r,Math.sin(a)*r)}g.fill();g.restore()});
      obs.forEach(o=>{if(o.k){g.fillStyle="#D6E64B";g.beginPath();g.arc(o.x+11,P-11,11,0,7);g.fill()}else{g.fillStyle="#C8553D";for(let f=0;f<2;f++)for(let c=0;c<2;c++)g.fillRect(o.x+c*13+(f%2?3:0),P-(f+1)*11,11,9)}});
      const x=110;if(KP.complete&&KP.naturalWidth){g.imageSmoothingEnabled=false;g.drawImage(KP,x-19,y-32,38,32);g.imageSmoothingEnabled=true}else{g.fillStyle=css("--lila");g.beginPath();g.roundRect(x-15,y-28,30,28,8);g.fill();g.fillStyle="#fff";g.beginPath();g.arc(x-5,y-18,3.6,0,7);g.arc(x+7,y-18,3.6,0,7);g.fill();
      g.fillStyle=css("--sol");g.beginPath();g.moveTo(x-8,y-28);g.lineTo(x-8,y-36);g.lineTo(x-3,y-31);g.lineTo(x+1,y-38);g.lineTo(x+5,y-31);g.lineTo(x+9,y-36);g.lineTo(x+9,y-28);g.fill()}
      if(corre)raf=requestAnimationFrame(frame)}
    function o_dist(o){return o.x-110<44}
    frame();
    if(!matchMedia("(prefers-reduced-motion: reduce)").matches){
      new IntersectionObserver(es=>es.forEach(e=>{corre=e.isIntersecting&&!document.body.classList.contains("con-hoja");if(corre&&!raf)raf=requestAnimationFrame(()=>{raf=null;frame()});}),{threshold:.2}).observe(cv);
      new MutationObserver(()=>{const vis=!document.body.classList.contains("con-hoja");if(vis&&!corre){corre=true;frame()}else if(!vis)corre=false}).observe(document.body,{attributes:true,attributeFilter:["class"]});
    }})();

  $("#pc-texto").textContent=C.pc.texto;
  const fm=n=>"$"+Number(n).toLocaleString("es-AR");
  $("#pc-progreso").innerHTML=pcPct!=null?`<div class="pc-barra" role="progressbar" aria-valuenow="${pcPct}" aria-valuemin="0" aria-valuemax="100"><i style="width:${pcPct}%"></i></div><p class="muted">${fm(C.pc.juntado)} de ${fm(C.pc.meta)} · ${pcPct}%</p>`:(C.mostrarVacios?`<p class="muted" style="margin-top:12px"><span class="proximo">Próximamente</span> La barra con lo que voy juntando.</p>`:"");
  $("#pc-partes").innerHTML=(C.pc.partes||[]).length?`<span class="muted" style="font-size:14px;align-self:center">Me falta:</span>`+C.pc.partes.map(x=>`<span class="tag">${esc(x)}</span>`).join(""):"";
})();

// ===== v11: revista, cartelera, trivia, recomendaciones =====
(function(){
  const totalCom=sumar(r=>r.seguidores);
  const pcPct=C.pc.meta&&C.pc.juntado!=null?Math.min(100,Math.round(C.pc.juntado/C.pc.meta*100)):null;
  const hoyF=new Date();
  $("#edicion").textContent="Edición "+hoyF.toLocaleDateString("es-AR",{month:"long",year:"numeric"});
  // dirección completa: una variable CSS con url() se resuelve contra la hoja de estilos, no contra la página
  $("#t-sobre").style.setProperty("--foto",`url('${new URL(FOTOS.principal,location.origin+"/").href}')`);
  $("#t-videos").style.setProperty("--foto",`url('${new URL(FOTOS.escritorio,location.origin+"/").href}')`);
  $("#t-pregunta").textContent=preguntaHoy;$("#ah-pregunta").textContent=preguntaHoy;
  if(totalCom){$("#t-num-big").textContent=num(totalCom);$("#t-num-sub").textContent="personas en mi comunidad, sumando todas mis redes";$("#hy-num").textContent=num(totalCom);$("#cap-num").textContent=num(totalCom)}
  // portada de Marcas: logos de las marcas con las que trabajé
  {const ms=(C.marcas||[]).filter(m=>safeSrc(m.logo));$("#cap-logos").innerHTML=ms.map(m=>`<img src="${safeSrc(m.logo)}" alt="${esc(m.nombre)}" title="${esc(m.nombre)}" loading="lazy">`).join("");
   const ns=(C.marcas||[]).map(m=>m.nombre.replace(/ Gaming( Club)?$/,""));$("#cap-logos-txt").textContent=ns.length?"Trabajé con "+(ns.length>1?ns.slice(0,-1).join(", ")+" y "+ns[ns.length-1]:ns[0]):""}
  if(pcPct!=null){$("#t-pc-sub").textContent=pcPct+"% juntado · aportá por Mercado Pago";$("#t-pc-barra").style.width=Math.max(3,pcPct)+"%"}else{$("#t-pc-barra").parentNode.hidden=true}
  $("#t-exp-logos").innerHTML=[LOGOS.gamechangers,LOGOS.nuby,LOGOS.puntogamer].map(l=>`<img src="${l}" alt="">`).join("");
  // tarjetas de portada con contenido (salen de CONFIG)
  $("#t-dia-chips").innerHTML=(C.dia||[]).slice(0,4).map(d=>`<span>${d.h} h · ${esc(d.t)}</span>`).join("");
  $("#t-exp-chips").innerHTML=(C.experiencia||[]).map(x=>`<span>${esc(x.nombre.replace(/^VALORANT /,""))}</span>`).join("");
  $("#t-pqy-lista").innerHTML=(C.porQueYo||[]).map(([t])=>`<li>${esc(t)}</li>`).join("");
  $("#t-portadas").innerHTML=(C.juegos||[]).filter(j=>safeSrc(j.img)).slice(0,5).map(j=>`<img src="${safeSrc(j.img)}" alt="" loading="lazy">`).join("");
  $("#t-ev-logos").innerHTML=(C.eventos||[]).filter(e=>safeSrc(e.img)).map(e=>`<img src="${safeSrc(e.img)}" alt="">`).join("");
  $("#banda-marcas").innerHTML=`<div class="bm-txt"><span class="bm-etq">Para marcas</span>
      <h2>Llevá tu marca a una comunidad que participa</h2>
      <p>Contenido de gaming, pádel, fútbol y lifestyle: integraciones, videos, reviews y co-streaming. Trabajo por canje, por tarifa o con una propuesta a tu medida.</p>
      <div class="bm-modos">${C.modalidades.map(m=>`<span>${esc(m[0])}</span>`).join("")}</div>
      <div class="bm-btns"><a class="btn bm-prim" href="#contacto">Pedir propuesta</a><a class="btn bm-sec" href="#numeros">Ver mis números</a></div></div>
    <div class="bm-lado"><div class="bm-dato"><b>${totalCom?num(totalCom):"7 redes"}</b><span>${totalCom?"personas en mi comunidad":"gaming, deporte y lifestyle"}</span></div>
      <div class="bm-dato"><b>eSports</b><span>co-streams oficiales, host y análisis de Valorant</span></div>
      <div class="bm-dato"><b>3 formas</b><span>de trabajar: canje, tarifa o a medida</span></div>
      <div class="bm-logos"><span>Trabajé con</span>${[LOGOS.gamechangers,LOGOS.nuby,LOGOS.puntogamer,LOGOS.enc].map(l=>`<img src="${l}" alt="">`).join("")}<em>AULA · Arena Pro · Procyon</em></div></div>`;

  // cartelera
  const rots=[-2,1.5,-1,2,-1.5,1];
  const nota=(n,i)=>`<article class="nota ${esc(n.color||"amarillo")}" style="--rot:${rots[i%rots.length]}deg"><b>${esc(n.tipo)}</b><p>${esc(n.texto)}</p>${/^https:\/\//.test(n.url||"")?`<a class="nota-link" href="${esc(n.url)}" target="_blank" rel="noopener">Ver en X ↗</a>`:""}${n.autor?`<small>— ${esc(n.autor)}</small>`:""}</article>`;
  window.pintarCartelera=extra=>{const todas=[...C.cartelera,...(extra||[])];
    $("#cart-mini").innerHTML=todas.map(nota).join("");$("#corcho").innerHTML=todas.map(nota).join("")};
  pintarCartelera();
  $("#form-opinion").onsubmit=async e=>{e.preventDefault();const t=$("#op-texto").value.trim(),est=$("#op-estado");
    if(t.length<2){est.textContent="Escribí tu opinión antes de enviar.";$("#op-texto").focus();return}
    const datos={tipo:"mensaje",pregunta:"Opinión: "+$("#op-tema").value,animo:"",respuesta:t,nombre:$("#op-nombre").value.trim()||"Anónimo",publicar:$("#op-publicar").checked};
    if(!C.backendURL&&!C.formspree){est.textContent="Modo prueba: cuando conectemos tu planilla, las opiniones te van a llegar.";return}
    try{await enviar(datos);est.textContent=datos.publicar?"¡Gracias! Si Bianca la aprueba, aparece en la cartelera.":"¡Gracias! Le llega solo a Bianca.";$("#op-texto").value=""}catch(err){est.textContent="No se pudo enviar. Probá de nuevo."}};

  // trivia (v13)
  const FACES=22;
  const svgTxt=(w,h,bg,fg,txt,fs)=>"data:image/svg+xml,"+encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}"><defs><linearGradient id="g" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${bg}"/><stop offset="1" stop-color="${bg}" stop-opacity=".85"/></linearGradient></defs><rect width="${w}" height="${h}" fill="url(#g)"/><rect y="${h*.72}" width="${w}" height="${h*.06}" fill="${fg}" opacity=".9"/><text x="${w*.25}" y="${h*.5}" font-family="Arial Black,Arial,sans-serif" font-weight="900" font-size="${fs}" fill="${fg}" text-anchor="middle" transform="rotate(-90 ${w*.25} ${h*.5})">${txt}</text><text x="${w*.75}" y="${h*.5}" font-family="Arial Black,Arial,sans-serif" font-weight="900" font-size="${fs}" fill="${fg}" text-anchor="middle" transform="rotate(-90 ${w*.75} ${h*.5})">${txt}</text></svg>`);
  // diseños de etiqueta por marca (dibujados, sin fotos). Se eligen con diseno:"redbull" | "monster" | "speed" | "rockstar" | "black"
  const estrella=(cx,cy,r)=>Array.from({length:10},(_,i)=>{const a=Math.PI/5*i-Math.PI/2,rr=i%2?r*.45:r;return (cx+rr*Math.cos(a)).toFixed(1)+","+(cy+rr*Math.sin(a)).toFixed(1)}).join(" ");
  const vtxt=(cx,cy,t,fs,fill,extra="")=>`<text x="${cx}" y="${cy}" font-family="Arial Black,Arial,sans-serif" font-weight="900" font-size="${fs}" fill="${fill}" text-anchor="middle" dominant-baseline="central" transform="rotate(-90 ${cx} ${cy})" ${extra}>${t}</text>`;
  const DISENOS={
    redbull:{fondo:"#C9CED6",frente:(cx,w,h)=>{let s="";for(let i=-1;i<3;i++)for(let j=0;j<4;j++)if((i+j)%2===0)s+=`<rect x="${cx-28+i*20}" y="${8+j*22}" width="20" height="22" fill="#1F3F8F"/>`;
      return s+`<rect x="${cx-30}" y="${h*.55}" width="60" height="${h*.17}" fill="#D9DDE3"/><circle cx="${cx}" cy="${h*.4}" r="11" fill="#FFC20E"/><text x="${cx}" y="${h*.64}" font-family="Arial Black,Arial,sans-serif" font-weight="900" font-size="9.5" fill="#D2003C" text-anchor="middle" dominant-baseline="central">Red Bull</text>`}},
    monster:{fondo:"#111",frente:(cx,w,h)=>[-9,0,9].map((d,k)=>`<polyline points="${[14,26,38,50,62,74,84].map((y,i)=>`${cx+d+(i%2?2.5:-2.5)+(k-1)*.8},${y+k*2}`).join(" ")}" fill="none" stroke="#7AD03A" stroke-width="4.2" stroke-linecap="round" stroke-linejoin="round"/>`).join("")
      +`<text x="${cx}" y="${h*.89}" font-family="Arial Black,Arial,sans-serif" font-weight="900" font-size="8" letter-spacing=".5" fill="#fff" text-anchor="middle" dominant-baseline="central">MONSTER</text>`},
    speed:{fondo:"#D7262E",frente:(cx,w,h)=>[0,1,2].map(k=>`<polygon points="${cx-30},${70+k*9} ${cx+30},${50+k*9} ${cx+30},${54+k*9} ${cx-30},${74+k*9}" fill="#fff" opacity="${.9-k*.25}"/>`).join("")
      +vtxt(cx,h*.42,"SPEED",18,"#fff",'font-style="italic"')},
    rockstar:{fondo:"#151515",frente:(cx,w,h)=>`<rect x="${cx-30}" y="12" width="60" height="2.5" fill="#E8B923"/><rect x="${cx-30}" y="${h-15}" width="60" height="2.5" fill="#E8B923"/><polygon points="${estrella(cx,h*.24,10)}" fill="#E8B923"/>`+vtxt(cx,h*.6,"ROCKSTAR",11.5,"#fff")},
    black:{fondo:"#0D0D0D",frente:(cx,w,h)=>`<polygon points="${cx-30},${h*.78} ${cx+30},${h*.6} ${cx+30},${h*.68} ${cx-30},${h*.86}" fill="#D0202A"/><polygon points="${cx-30},${h*.18} ${cx+30},${h*.1} ${cx+30},${h*.13} ${cx-30},${h*.21}" fill="#D0202A"/>`+vtxt(cx,h*.45,"BLACK",17,"#fff",'stroke="#D0202A" stroke-width=".6"')}
  };
  function svgLata(d,w,h){const al=`<linearGradient id="al" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#F1F3F6"/><stop offset=".5" stop-color="#B9BFC8"/><stop offset="1" stop-color="#8D949E"/></linearGradient>`;
    return "data:image/svg+xml,"+encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}"><defs>${al}</defs><rect width="${w}" height="${h}" fill="${d.fondo}"/>${d.frente(w*.25,w,h)}${d.frente(w*.75,w,h)}<g opacity=".55">${Array.from({length:9},(_,i)=>`<rect x="${w*.5-9+i*2.2}" y="${h*.68}" width="${i%3?1:1.6}" height="12" fill="#fff"/>`).join("")}</g><rect width="${w}" height="6" fill="url(#al)"/><rect y="${h-6}" width="${w}" height="6" fill="url(#al)"/></svg>`)}
  // etiqueta:"lata-x.jpg" = foto del frente de la lata (solo la parte del cuerpo), se envuelve alrededor (frente y dorso).
  // radio y alto opcionales para latas finas o altas.
  function lata(o){const foto=safeSrc(o.etiqueta),r=+o.radio||28,h=+o.alto||104,circ=2*Math.PI*r,fw=circ/FACES+.6,FC=foto?48:FACES,fwF=circ/FC+.6;
    const img=foto||(DISENOS[o.diseno]?svgLata(DISENOS[o.diseno],circ,h):svgTxt(circ,h,o.c,o.c2||"#fff",o.n.toUpperCase(),o.n.length>8?13:16));
    let f="";for(let i=0;i<FC;i++){const ang=i*360/FC,luz=foto?(.86+.2*Math.cos((ang-40)*Math.PI/180)):(.78+.32*Math.cos((ang-40)*Math.PI/180));
      f+=`<div class="cara" style="width:${foto?fwF:fw}px;margin-left:${-(foto?fwF:fw)/2}px;background:url('${img}') ${foto?-(i*circ/FC+circ/4-fwF/2):-i*circ/FC}px 0/${foto?circ/2:circ}px ${h}px ${foto?"repeat-x":""};transform:rotateY(${ang}deg) translateZ(${r}px);filter:brightness(${luz.toFixed(2)})"></div>`}
    const cap=`width:${2*r}px;height:${2*r}px`;
    return `<div class="lata3d" style="width:${2*r}px;height:${h}px">${f}<div class="cap arriba" style="${cap};top:${-r}px"></div><div class="cap abajo" style="${cap};bottom:${-r}px"></div></div>`}
  function alfajor(o){const r=43,h=22,circ=2*Math.PI*r,fw=circ/FACES+.6;
    const lado=`linear-gradient(180deg,${o.tapa} 0 36%,${o.relleno} 36% 64%,${o.tapa} 64%)`;
    let f="";for(let i=0;i<FACES;i++){const ang=i*360/FACES;f+=`<div class="cara" style="width:${fw}px;margin-left:${-fw/2}px;background:${lado};transform:rotateY(${ang}deg) translateZ(${r}px);filter:brightness(${(.75+.3*Math.cos((ang-40)*Math.PI/180)).toFixed(2)})"></div>`}
    const top=o.glaseado?`radial-gradient(circle at 40% 35%,#fff 0 6%,transparent 7%),radial-gradient(circle at 62% 58%,#fff 0 5%,transparent 6%),radial-gradient(circle at 35% 68%,#fff 0 4%,transparent 5%),radial-gradient(circle,#FBF6EC 0 70%,${o.tapa} 71%)`
      :`repeating-linear-gradient(135deg,rgba(255,255,255,.10) 0 3px,transparent 3px 11px),radial-gradient(circle at 35% 30%,rgba(255,255,255,.25),transparent 45%),${o.tapa}`;
    return `<div class="alfa3d">${f}<div class="tap arriba" style="background:${top}"></div><div class="tap abajo" style="background:${o.tapa}"></div></div>`}
  const bolsa=o=>`<svg class="ilus" viewBox="0 0 120 110" aria-hidden="true"><defs><linearGradient id="kr" x1="0" x2="1"><stop offset="0" stop-color="#C9A27A"/><stop offset=".5" stop-color="#E2C29C"/><stop offset="1" stop-color="#B98F66"/></linearGradient></defs>
    <rect x="58" y="8" width="7" height="34" rx="2" fill="#F2C14E" transform="rotate(-12 61 25)"/><rect x="66" y="6" width="7" height="36" rx="2" fill="#E9B23A" transform="rotate(6 69 24)"/><rect x="74" y="10" width="7" height="32" rx="2" fill="#F6CB5A" transform="rotate(16 77 26)"/>
    <path d="M28 30h64l6 74H22z" fill="url(#kr)"/><path d="M28 30l-4 -6h72l-4 6z" fill="#A7825C"/>
    <rect x="38" y="54" width="44" height="26" rx="6" fill="#fff" opacity=".95"/><rect x="38" y="54" width="44" height="6" rx="3" fill="${o.c}"/>
    <text x="60" y="73" font-family="Arial,sans-serif" font-weight="700" font-size="${o.n.length>10?6.2:7.5}" text-anchor="middle" fill="#3A2A1A">${esc(o.n)}</text></svg>`;
  const SUSHI={
    nigiri:`<svg class="ilus" viewBox="0 0 120 110"><defs><linearGradient id="sa" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#FFB38A"/><stop offset="1" stop-color="#F26A3D"/></linearGradient></defs>
      <ellipse cx="60" cy="74" rx="40" ry="20" fill="#F4F1EA"/><ellipse cx="60" cy="70" rx="38" ry="17" fill="#FFFFFF"/>${Array.from({length:14},(_,i)=>`<ellipse cx="${30+i*4.4}" cy="${74+(i%3)*3}" rx="2.6" ry="1.4" fill="#ECE6DA"/>`).join("")}
      <path d="M18 62c10-22 74-26 86-6c2 6-8 12-20 12H30c-10 0-14-2-12-6z" fill="url(#sa)"/>${[0,1,2,3,4].map(i=>`<path d="M${34+i*13} 46c3 6 4 12 2 20" stroke="#FFE3D2" stroke-width="2.4" fill="none" opacity=".85"/>`).join("")}
      <path d="M24 58c20-14 56-16 74-4" stroke="#fff" stroke-opacity=".35" stroke-width="3" fill="none"/></svg>`,
    phila:`<svg class="ilus" viewBox="0 0 120 110"><ellipse cx="60" cy="86" rx="38" ry="12" fill="#1F2A22"/><rect x="22" y="44" width="76" height="42" fill="#243127"/><ellipse cx="60" cy="44" rx="38" ry="14" fill="#2D3B30"/>
      <ellipse cx="60" cy="44" rx="33" ry="11.5" fill="#FBFAF6"/>${Array.from({length:16},(_,i)=>`<ellipse cx="${36+(i%8)*7}" cy="${38+Math.floor(i/8)*9+(i%2)*2}" rx="2.2" ry="1.2" fill="#EEE8DC"/>`).join("")}
      <ellipse cx="54" cy="44" rx="11" ry="5.5" fill="#FFF7EC"/><path d="M58 40c8-2 14 1 13 5s-8 5-13 3z" fill="#F57E4E"/><ellipse cx="50" cy="44" rx="6" ry="3" fill="#FFFDF7"/>
      <path d="M22 50v30M98 50v30" stroke="#3B4D3F" stroke-width="1"/></svg>`,
    california:`<svg class="ilus" viewBox="0 0 120 110"><ellipse cx="60" cy="86" rx="38" ry="12" fill="#F0ECE3"/><rect x="22" y="44" width="76" height="42" fill="#F7F4EE"/>${Array.from({length:22},(_,i)=>`<ellipse cx="${26+(i*13)%70}" cy="${52+(i*7)%30}" rx="1.6" ry="1" fill="#E3C88E"/>`).join("")}
      <ellipse cx="60" cy="44" rx="38" ry="14" fill="#FAF8F2"/>${Array.from({length:18},(_,i)=>`<ellipse cx="${28+(i*11)%64}" cy="${36+(i*5)%16}" rx="1.6" ry="1" fill="#D9BE84"/>`).join("")}
      <ellipse cx="60" cy="44" rx="20" ry="7" fill="#1E2B21"/><ellipse cx="60" cy="44" rx="17" ry="5.8" fill="#FFFDF8"/>
      <rect x="49" y="41" width="9" height="5" rx="2" fill="#F26D5B"/><rect x="58" y="41.5" width="7" height="4" rx="2" fill="#8DBE4B"/><rect x="64" y="42" width="6" height="4" rx="2" fill="#F6E6A8"/></svg>`,
    sashimi:`<svg class="ilus" viewBox="0 0 120 110"><defs><linearGradient id="sm" x1="0" x2="1"><stop offset="0" stop-color="#FFA07A"/><stop offset="1" stop-color="#EE5F35"/></linearGradient></defs>
      <ellipse cx="60" cy="88" rx="46" ry="10" fill="#E9E6EE"/><path d="M16 84c4-10 82-10 88 0" fill="#F5F3F8"/>
      ${[0,1,2].map(i=>`<g transform="translate(${i*14} ${-i*8}) rotate(${-8+i*4} 60 70)"><path d="M26 74c4-14 60-18 70-6c2 4-2 8-10 8H32c-6 0-8-0-6-2z" fill="url(#sm)"/>${[0,1,2,3].map(k=>`<path d="M${40+k*12} 62c2 4 3 8 2 13" stroke="#FFE1CF" stroke-width="2" fill="none"/>`).join("")}</g>`).join("")}
      <path d="M86 50c6-6 14-4 14 2c-6 0-10 2-14-2z" fill="#7FB35A"/></svg>`,
    hosso:`<svg class="ilus" viewBox="0 0 120 110"><ellipse cx="60" cy="88" rx="30" ry="10" fill="#15201A"/><rect x="30" y="46" width="60" height="42" fill="#1C2A21"/><path d="M30 52v32M90 52v32" stroke="#2F4237" stroke-width="1"/>
      <ellipse cx="60" cy="46" rx="30" ry="11" fill="#22332A"/><ellipse cx="60" cy="46" rx="26" ry="9" fill="#FCFBF7"/>${Array.from({length:12},(_,i)=>`<ellipse cx="${40+(i%6)*8}" cy="${42+Math.floor(i/6)*8}" rx="2" ry="1.1" fill="#EEE8DC"/>`).join("")}
      <ellipse cx="60" cy="46" rx="8" ry="4.2" fill="#9CCB6B"/><ellipse cx="60" cy="46" rx="4.6" ry="2.4" fill="#D8EFC0"/></svg>`
  };
  const cajaJuego=o=>`<div class="cajita" style="--c:${o.c}">${esc(o.n)}</div>`;
  function objeto(f,o){
    if(Array.isArray(o.fotos360)&&o.fotos360.length>1)return `<div class="rotor giro" data-frames='${esc(JSON.stringify(o.fotos360.map(safeSrc).filter(Boolean)))}'><img class="giro360" src="${safeSrc(o.fotos360[0])}" alt=""></div>`;
    if(safeSrc(o.img))return `<div class="rotor"><img class="foto-op" src="${safeSrc(o.img)}" alt=""></div>`;
    if(safeSrc(o.botella))return `<div class="rotor lienzo-botella" data-auto="1" data-ry0="${Math.round(Math.random()*50-25)}"><canvas class="lata-cv" data-src="${safeSrc(o.botella)}" data-h="${+o.alto||124}" aria-hidden="true"></canvas></div>`;
    if(f==="lata"&&safeSrc(o.etiqueta))return `<div class="rotor lienzo" data-auto="1" data-ry0="${Math.round(Math.random()*50-25)}"><canvas class="lata-cv" data-src="${safeSrc(o.etiqueta)}" data-r="${+o.radio||28}" data-h="${+o.alto||104}" aria-hidden="true"></canvas></div>`;
    if(f==="lata")return `<div class="rotor" data-auto="1" style="transform:rotateX(-14deg)">${lata(o)}</div>`;
    if(f==="alfajor")return `<div class="rotor" data-auto="1" data-rx="52" style="transform:rotateX(52deg)">${alfajor(o)}</div>`;
    if(f==="bolsa")return `<div class="rotor" data-tilt="1">${bolsa(o)}</div>`;
    if(f==="sushi")return `<div class="rotor" data-tilt="1">${SUSHI[o.tipo]||SUSHI.nigiri}</div>`;
    return `<div class="rotor" data-tilt="1">${cajaJuego(o)}</div>`;
  }
  // lata con foto dibujada en canvas a la resolución de la pantalla (nítida): cada columna toma la parte de la etiqueta que le toca según el giro
  function lataLienzo(rot){
    const cv=rot.querySelector("canvas"),r=+cv.dataset.r,h=+cv.dataset.h,e=r*.24,pad=3,Wc=2*r+pad*2,Hc=h+2*e+pad*2,ctx=cv.getContext("2d");
    const dpr=Math.min(4,Math.max(2,(window.devicePixelRatio||1)*1.5));
    cv.width=Math.round(Wc*dpr);cv.height=Math.round(Hc*dpr);cv.style.width=Wc+"px";cv.style.height=Hc+"px";
    const img=new Image();let listo=false,ultimo=0;img.onload=()=>{listo=true;dibujar(ultimo)};img.src=cv.dataset.src;
    function dibujar(ry){ultimo=ry;if(!listo)return;
      ctx.setTransform(dpr,0,0,dpr,0,0);ctx.clearRect(0,0,Wc,Hc);ctx.imageSmoothingEnabled=true;ctx.imageSmoothingQuality="high";
      const x0=pad,cyT=pad+e,iw=img.naturalWidth,ih=img.naturalHeight,cols=Math.ceil(2*r*dpr),a0=ry*Math.PI/180,P=Math.PI;
      for(let k=0;k<cols;k++){const xn=(k+.5)/cols*2-1,th=Math.asin(xn),u=(((th-a0+P/2)%P)+P)%P/P;
        ctx.drawImage(img,Math.min(iw-1,Math.floor(u*iw)),0,1,ih,x0+k/cols*2*r,cyT+e*Math.sqrt(1-xn*xn),2*r/cols+.03,h)}
      // luz fija: bordes en sombra y un brillo de aluminio a la izquierda
      ctx.globalCompositeOperation="source-atop";
      const g=ctx.createLinearGradient(x0,0,x0+2*r,0);
      [[0,"rgba(0,0,0,.42)"],[.16,"rgba(0,0,0,.06)"],[.27,"rgba(255,255,255,.22)"],[.33,"rgba(255,255,255,.04)"],[.68,"rgba(0,0,0,0)"],[.9,"rgba(0,0,0,.18)"],[1,"rgba(0,0,0,.45)"]].forEach(([p,c])=>g.addColorStop(p,c));
      ctx.fillStyle=g;ctx.fillRect(x0,0,2*r,Hc);ctx.globalCompositeOperation="source-over";
      // tapa de aluminio
      const gt=ctx.createLinearGradient(x0,cyT-e,x0+2*r,cyT+e);gt.addColorStop(0,"#F5F7F9");gt.addColorStop(.55,"#BFC4CB");gt.addColorStop(1,"#8C939D");
      ctx.beginPath();ctx.ellipse(x0+r,cyT,r,e,0,0,P*2);ctx.fillStyle=gt;ctx.fill();
      ctx.beginPath();ctx.ellipse(x0+r,cyT+e*.06,r*.84,e*.74,0,0,P*2);ctx.fillStyle="#D3D7DC";ctx.fill();ctx.lineWidth=.6;ctx.strokeStyle="rgba(0,0,0,.2)";ctx.stroke();
      ctx.beginPath();ctx.ellipse(x0+r,cyT-e*.12,r*.24,e*.3,0,0,P*2);ctx.lineWidth=1;ctx.strokeStyle="#878E98";ctx.stroke();
    }
    return dibujar}
  // botella con foto (fondo blanco): cada fila de la foto gira con su propio ancho, así se respeta la forma (cuello, hombros, base)
  function botellaLienzo(rot){
    const cv=rot.querySelector("canvas"),H=+cv.dataset.h||124,ctx=cv.getContext("2d");
    const img=new Image();let listo=false,ultimo=0,src,sw,sh,C,HW,ow,oh,out;
    img.onload=()=>{sw=img.naturalWidth;sh=img.naturalHeight;
      const t=document.createElement("canvas");t.width=sw;t.height=sh;const tc=t.getContext("2d");tc.drawImage(img,0,0);src=tc.getImageData(0,0,sw,sh).data;
      const C0=new Float32Array(sh),H0=new Float32Array(sh);C=new Float32Array(sh);HW=new Float32Array(sh);
      for(let y=0;y<sh;y++){let l=-1,r=-1;for(let x=0;x<sw;x++){const i=(y*sw+x)*4;if(src[i]<232||src[i+1]<232||src[i+2]<232){if(l<0)l=x;r=x}}
        if(l>=0&&r-l>2){C0[y]=(l+r+1)/2;H0[y]=(r-l+1)/2}}
      // contorno suavizado (sin serrucho): promedio de las filas vecinas; el centro se toma fijo
      let cs=0,cn=0;for(let y=0;y<sh;y++)if(H0[y]){cs+=C0[y];cn++}const cm=cn?cs/cn:sw/2;
      for(let y=0;y<sh;y++){if(!H0[y])continue;let s=0,n=0;for(let k=-4;k<=4;k++){const v=H0[y+k];if(v){s+=v;n++}}C[y]=cm;HW[y]=s/n}
      const W=H*sw/sh,dpr=Math.min(4,Math.max(3,(window.devicePixelRatio||1)*1.5));
      ow=Math.round(W*dpr);oh=Math.round(H*dpr);cv.width=ow;cv.height=oh;cv.style.width=W+"px";cv.style.height=H+"px";out=ctx.createImageData(ow,oh);
      listo=true;dibujar(ultimo)};
    img.src=cv.dataset.src;
    const P=Math.PI;
    function dibujar(ry){ultimo=ry;if(!listo)return;
      const a0=ry*P/180,d=out.data;d.fill(0);
      for(let Y=0;Y<oh;Y++){const yf=Math.max(0,Math.min(sh-1.001,(Y+.5)/oh*sh-.5)),y=Math.floor(yf),y2=Math.min(sh-1,y+1),ky=yf-y,yy=ky<.5?y:y2,hw=HW[yy];if(!hw)continue;
        const c=C[yy],cO=c/sw*ow,hO=hw/sw*ow,x0=Math.max(0,Math.floor(cO-hO)),x1=Math.min(ow-1,Math.ceil(cO+hO));
        for(let X=x0;X<=x1;X++){const xn=(X+.5-cO)/hO;if(xn<=-1||xn>=1)continue;
          const th=Math.asin(xn);let f=th-a0;f=((f+P/2)%P+P)%P-P/2;
          // se toma solo el 88% central de la foto: los bordes de la foto vienen claros/translúcidos y se estirarían como manchas
          const sx=c+Math.sin(f)*hw*.88-.5,xa=Math.max(0,Math.min(sw-2,Math.floor(sx))),k=sx-xa,ia=(y*sw+xa)*4,ib=ia+4,ic=(y2*sw+xa)*4,id=ic+4,oi=(Y*ow+X)*4;
          // luz suave (la foto ya trae su propia luz)
          const luz=.8+.2*Math.cos(th),bri=34*Math.exp(-(((th+.6)/.18)**2));
          for(let q=0;q<3;q++){const v=((src[ia+q]*(1-k)+src[ib+q]*k)*(1-ky)+(src[ic+q]*(1-k)+src[id+q]*k)*ky)*luz+bri;d[oi+q]=v>255?255:v}
          d[oi+3]=Math.min(1,(1-Math.abs(xn))*hO*1.5)*255}}
      ctx.putImageData(out,0,0)}
    return dibujar}
  // girar con el dedo o el mouse (y giro suave automático)
  const reduceM=matchMedia("(prefers-reduced-motion: reduce)").matches;
  function activarRotores(cont){
    cont.querySelectorAll(".escena").forEach(esc_=>{
      const rot=esc_.querySelector(".rotor");if(!rot)return;
      if(rot.classList.contains("giro")){const fr=JSON.parse(rot.dataset.frames.replace(/&quot;/g,'"')),img=rot.querySelector("img");fr.forEach(u=>{const i=new Image();i.src=u});
        let k=0,arr2=false,x0=0,acc=0;const set=n=>{k=(n%fr.length+fr.length)%fr.length;img.src=fr[k]};
        esc_.addEventListener("pointerdown",e=>{arr2=true;x0=e.clientX;acc=0;esc_.setPointerCapture(e.pointerId)});
        esc_.addEventListener("pointermove",e=>{if(!arr2)return;acc+=e.clientX-x0;x0=e.clientX;while(Math.abs(acc)>12){set(k+(acc>0?1:-1));acc-=Math.sign(acc)*12}});
        esc_.addEventListener("pointerup",()=>{arr2=false});
        if(!reduceM){let t0=0;(function loop(t){if(!document.contains(rot))return;if(!arr2&&t-t0>140){set(k+1);t0=t}requestAnimationFrame(loop)})(0)}
        return}
      const auto=rot.dataset.auto==="1",tilt=rot.dataset.tilt==="1",rx0=+(rot.dataset.rx||(auto?-14:0));
      let ry=rot.dataset.ry0!=null?+rot.dataset.ry0:Math.random()*360,rx=rx0,vel=auto&&!reduceM?.35:0,arr=false,px=0,py=0,mov=0,hover=false;
      const dib=rot.classList.contains("lienzo")?lataLienzo(rot):rot.classList.contains("lienzo-botella")?botellaLienzo(rot):null;
      const pintar=()=>{if(dib){dib(ry);return}rot.style.transform=tilt?`rotateY(${Math.max(-45,Math.min(45,ry%360>180?ry%360-360:ry%360))}deg) rotateX(${rx}deg)`:`rotateX(${rx}deg) rotateY(${ry}deg)`};
      if(tilt)ry=0;
      const btn=esc_.closest(".q-op");
      esc_.addEventListener("pointerdown",e=>{arr=true;mov=0;px=e.clientX;py=e.clientY;esc_.setPointerCapture(e.pointerId)});
      esc_.addEventListener("pointermove",e=>{
        if(!arr){if(tilt){const r=esc_.getBoundingClientRect();ry=((e.clientX-r.left)/r.width-.5)*50;rx=-((e.clientY-r.top)/r.height-.5)*30;pintar()}return}
        const dx=e.clientX-px,dy=e.clientY-py;mov+=Math.abs(dx)+Math.abs(dy);px=e.clientX;py=e.clientY;
        ry+=dx*1.1;if(!tilt)rx=Math.max(rx0-40,Math.min(rx0+40,rx-dy*.4));vel=dx*.6;pintar()});
      esc_.addEventListener("pointerup",e=>{arr=false;if(mov>6&&btn){btn.dataset.arrastre="1";setTimeout(()=>delete btn.dataset.arrastre,50)}});
      esc_.addEventListener("pointerleave",()=>{if(tilt&&!arr){ry=0;rx=0;pintar()}});
      btn&&btn.addEventListener("mouseenter",()=>hover=true);btn&&btn.addEventListener("mouseleave",()=>hover=false);
      pintar();
      // giro 360° continuo; más rápido con el mouse encima; al arrastrar sigue con el impulso
      if(!tilt&&!reduceM)(function loop(){if(!document.contains(rot))return;if(!arr){const base=auto?(hover?1.6:.5):0;vel+=(base-vel)*.04;ry+=vel;pintar()}requestAnimationFrame(loop)})();
    });
  }
  const gemaSVG=g=>`<svg viewBox="0 0 48 48" aria-hidden="true"><defs><linearGradient id="gm${g.n}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${g.c1}"/><stop offset="1" stop-color="${g.c2}"/></linearGradient></defs>
    <path d="M12 6h24l10 12-22 26L2 18z" fill="url(#gm${g.n})"/><path d="M12 6l6 12h12l6-12M2 18h44M18 18l6 26 6-26" fill="none" stroke="#fff" stroke-opacity=".55" stroke-width="1.4"/><path d="M14 9l4 7" stroke="#fff" stroke-width="2.4" stroke-linecap="round" opacity=".8"/></svg>`;
  const coronaSVG=`<svg viewBox="0 0 48 48" aria-hidden="true"><path d="M6 34l-2-20 11 9 9-15 9 15 11-9-2 20z" fill="#F5B82E"/><rect x="6" y="34" width="36" height="7" rx="2" fill="#E09A1C"/><circle cx="24" cy="26" r="3.5" fill="#E2337A"/><circle cx="14" cy="29" r="2.5" fill="#9B5CF6"/><circle cx="34" cy="29" r="2.5" fill="#1E9E90"/></svg>`;
  let paso=0,aciertos=0,elegidos=[];
  const hoyQ=()=>new Date().toISOString().slice(0,10);
  function pintarQuiz(){
    const N=C.quiz.length;
    if(paso>=N){
      const premios=C.gemas.slice(0,aciertos); const corona=aciertos===N;
      const ganados=premios.reduce((a,g)=>a+g.v,0)+(corona?C.coronaBonus:0); const puede=lee("quiz-dia","")!==hoyQ();
      if(puede&&ganados){guarda("kirbitos-total",lee("kirbitos-total",0)+ganados);guarda("quiz-dia",hoyQ())}
      if(ganados&&window.kirbitosSync)window.kirbitosSync("trivia",ganados);
      const [t,x]=corona?["¡Me conocés de memoria!","Te ganaste la corona de kirbito oficial."]:aciertos>=3?["¡Me conocés un montón!","Te falta muy poquito."]:aciertos?["¡Bien ahí!","Vamos conociéndonos."]:["¡Uy! A conocernos más","Pasá por Sobre mí y volvé a intentar."];
      const items=[...premios.map(g=>({svg:gemaSVG(g),n:g.n,v:g.v})),...(corona?[{svg:coronaSVG,n:"Corona",v:C.coronaBonus}]:[])];
      $("#quiz-app").innerHTML=`<div class="panel combo"><span class="etq">Abrí tu caja</span><h3>${t}</h3><p class="muted">${x} Acertaste ${aciertos} de ${N}.</p>
        <div class="cofre" id="cofre" role="img" aria-label="Caja con ${items.length} premios"><div class="brillo"></div><div class="gemas">${items.map((it,i)=>`<div class="gema" style="--i:${i}">${it.svg}<small>${esc(it.n)} · ${it.v}</small></div>`).join("")}</div><div class="cuerpo"></div><div class="tapa"></div></div>
        <div class="total-k">+${ganados} kirbitos</div>
        <p class="muted" style="margin-top:4px">${ganados?(puede?"Ya se sumaron a tu total para canjear en el stream.":"Hoy ya sumaste con la trivia: volvé mañana para ganar de nuevo."):"Esta vez la caja vino vacía. ¡Probá otra vez!"}</p>
        <div class="premio-lista">${C.gemas.map(g=>`<span>${esc(g.n)}: ${g.v}</span>`).join("")}<span>Corona (todo bien): ${C.coronaBonus}</span></div>
        <button class="btn prim" id="q-otra" style="margin-top:10px">Jugar de nuevo</button>
        <p class="marcas-nota">¿Sos una de estas marcas? Ya sabés lo que me gusta ${ico("guino")} <a href="#contacto">Hablemos</a></p></div>`;
      setTimeout(()=>{const c=$("#cofre");if(!c)return;c.classList.add("abierto");if(!reduceM)for(let i=0;i<26;i++){const s=document.createElement("i");s.className="chispa";s.style.cssText=`left:50%;bottom:150px;background:${["#F5B82E","#E2337A","#9B5CF6","#1E9E90","#fff"][i%5]};--x:${(Math.random()-.5)*360}px;--y:${-60-Math.random()*160}px;animation-delay:${.5+Math.random()*.4}s`;c.appendChild(s)}},350);
      $("#q-otra").onclick=()=>{paso=0;aciertos=0;elegidos=[];pintarQuiz()};return}
    const q=C.quiz[paso];
    $("#quiz-app").innerHTML=`<div class="panel q-card"><div class="q-progreso">${C.quiz.map((_,i)=>`<i class="${i<paso?"hecho":i===paso?"actual":""}"></i>`).join("")}</div>
      <div class="q-top"><h3>${esc(q.p)}</h3><span class="q-paso">Pregunta ${paso+1} de ${N}</span></div>
      <p class="q-ayuda">Arrastrá para girarlos y tocá el que elegiría Bianca.</p>
      <div class="q-opciones">${q.opciones.map((o,i)=>`<button class="q-op" data-i="${i}" type="button" aria-label="${esc(o.n)}"><div class="escena"><div class="sombra"></div>${objeto(q.forma,o)}</div><span>${esc(o.n)}</span></button>`).join("")}</div>
      <div class="q-res" id="q-res" aria-live="polite"></div></div>`;
    activarRotores($("#quiz-app"));
    document.querySelectorAll(".q-op").forEach(b=>b.onclick=()=>{if(b.dataset.arrastre||b.disabled)return;const i=+b.dataset.i,ok=i===q.correcta;
      document.querySelectorAll(".q-op").forEach(x=>{x.disabled=true;if(+x.dataset.i===q.correcta)x.classList.add("ok")});
      if(!ok)b.classList.add("mal"); if(ok)aciertos++; elegidos.push([q,q.opciones[i]]);
      const g=C.gemas[aciertos-1];
      $("#q-res").innerHTML=`<p>${ok?`¡Sí! Ganaste ${g?("un"+(/a$/.test(g.n)?"a ":" ")+g.n.toLowerCase()):"una gema"} para tu caja`:`No… era ${esc(q.opciones[q.correcta].n)}`}</p><button class="btn prim" type="button" id="q-sig">${paso+1<N?"Siguiente":"Abrir mi caja"}</button>`;
      $("#q-sig").onclick=()=>{paso++;pintarQuiz()};$("#q-sig").focus()});
  }
  pintarQuiz();

})();

// ===== v12: solapas, semana, música, reseñas =====
(function(){
  // solapas
  const rev=document.querySelector(".revista");
  function moverInd(){const b=document.querySelector('.solapa[aria-pressed="true"]'),ind=document.querySelector(".sol-ind");if(!b||!ind)return;ind.style.left=b.offsetLeft+"px";ind.style.width=b.offsetWidth+"px";ind.style.background=b.dataset.vista==="marca"?"linear-gradient(100deg,var(--rosa),var(--lila))":b.dataset.vista==="comu"?"var(--turquesa)":"var(--tinta)"}
  addEventListener("resize",moverInd);
  // recalcular cuando cargan las tipografías o cambia el ancho de la pista (evita que la pastilla quede corrida)
  if(document.fonts&&document.fonts.ready)document.fonts.ready.then(moverInd);
  if(window.ResizeObserver){const p=document.querySelector(".sol-pista");if(p)new ResizeObserver(moverInd).observe(p)}
  function setVista(v){rev.dataset.vista=v;document.querySelectorAll(".solapa").forEach(b=>b.setAttribute("aria-pressed",b.dataset.vista===v));requestAnimationFrame(moverInd);
    $("#vista-nota").textContent=v==="marca"?"Mostrando lo que es para marcas: mi propuesta, números, experiencia y contacto.":v==="comu"?"Mostrando lo que es para la comunidad: recomendaciones, novedades, trivia y juegos.":"Mostrando todo.";
    guarda("vista",v)}
  // el filtro cambia en el lugar: no reordena ni mueve la página
  document.querySelectorAll(".solapa").forEach(b=>b.onclick=()=>{const y=scrollY;setVista(b.dataset.vista);requestAnimationFrame(()=>scrollTo({top:y,behavior:"instant"}))});
  const qs=new URLSearchParams(location.search).get("para"); setVista(qs==="marcas"?"marca":qs==="comunidad"?"comu":lee("vista","todo"));

  // destacados de la semana
  const grid=$("#semana-grid");
  grid.insertAdjacentHTML("afterbegin",C.semana.map(x=>{const img=safeSrc(x.img);const vacio=x.titulo==="Completar";
    if(vacio&&!C.mostrarVacios)return "";
    return `<a class="tile t-semana ${img?"con-img":""} c-3 r-2" href="${x.url?esc(x.url):"#recomendaciones"}" ${x.url?'target="_blank" rel="noopener"':""} ${img?`style="--foto:url('${new URL(img,location.origin+"/").href}')"`:""}><span class="t-flecha" aria-hidden="true">↗</span><span class="t-etq">${esc(x.tipo)}</span><span class="t-tit">${esc(x.titulo)}${vacio?' <span class="vacio-tag">completar</span>':""}</span><span class="por">${esc(x.por)}</span></a>`}).join(""));

  // música (Last.fm conectado a Spotify)
  const M=C.musica, conectada=M.lastfmUsuario&&M.lastfmKey;
  window.MUSICA={ahora:null,top:[]};
  async function cargarMusica(){
    if(!conectada)return;
    const base=`https://ws.audioscrobbler.com/2.0/?format=json&api_key=${encodeURIComponent(M.lastfmKey)}&user=${encodeURIComponent(M.lastfmUsuario)}`;
    try{const r=await (await fetch(base+"&method=user.getrecenttracks&limit=1")).json();const t=r.recenttracks.track[0];
      MUSICA.ahora={nombre:t.name,artista:t.artist["#text"],img:(t.image||[]).pop()?.["#text"]||"",vivo:!!(t["@attr"]&&t["@attr"].nowplaying)};
      const tp=await (await fetch(base+"&method=user.gettoptracks&period=7day&limit=5")).json();
      MUSICA.top=(tp.toptracks.track||[]).map(x=>({nombre:x.name,artista:x.artist.name,veces:x.playcount}));
      pintarTileMusica();if(rc==="musica")pintarReco();}catch(e){}
  }
  function pintarTileMusica(){const a=MUSICA.ahora;if(!a)return;$("#t-musica-tit").textContent=a.nombre;$("#t-musica-sub").textContent=(a.vivo?"Sonando ahora · ":"Lo último que escuché · ")+a.artista}
  cargarMusica(); if(conectada)setInterval(cargarMusica,60000);

  // reseñas con estrellas + coincido
  const estrellas=n=>`<span class="estrellas" aria-label="${n} de 5">${"★".repeat(n)}<span class="off">${"★".repeat(5-n)}</span></span>`;
  let misCoinc=lee("coincido",{});
  const clave=(cat,it)=>(cat+":"+it.nombre).slice(0,80);
  function bloqueCoincido(k){const rem=(REMOTO&&REMOTO.coincido&&REMOTO.coincido[k])||[0,0];const mio=misCoinc[k];
    const si=rem[0]+(!REMOTO&&mio===1?1:0),no=rem[1]+(!REMOTO&&mio===0?1:0),tot=si+no;
    return `<div class="coincido" data-k="${esc(k)}"><span>¿Opinás lo mismo?</span><button data-v="1" aria-pressed="${mio===1}">${ico("like")}Coincido</button><button data-v="0" aria-pressed="${mio===0}">${ico("dislike")}No coincido</button>${tot?`<small>${Math.round(si/tot*100)}% coincide con Bianca</small>`:""}</div>`}
  document.addEventListener("click",e=>{const b=e.target.closest(".coincido button");if(!b)return;const k=b.parentNode.dataset.k,v=+b.dataset.v;const nuevo=misCoinc[k]==null;
    misCoinc[k]=v;guarda("coincido",misCoinc);if(C.backendURL&&nuevo)enviar({tipo:"coincido",clave:k,valor:v}).catch(()=>{});b.parentNode.outerHTML=bloqueCoincido(k)});

  let rc=C.recomendaciones[0].id;
  window.pintarReco=function(){
    $("#reco-tabs").innerHTML=C.recomendaciones.map(r=>`<button role="tab" aria-pressed="${r.id===rc}" data-r="${r.id}">${esc(r.nombre)}</button>`).join("");
    const r=C.recomendaciones.find(x=>x.id===rc);
    let html="";
    if(rc==="pelis"||rc==="anime"||rc==="musica"){
      const tipoS={pelis:"Película de la semana",anime:"Anime de la semana",musica:"Canción de la semana"}[rc];
      const s=C.semana.find(x=>x.tipo===tipoS); if(s&&!(s.titulo==="Completar"&&!C.mostrarVacios))html+=`<div class="semana-hoja"><div class="panel tile t-semana" style="cursor:default;transform:none"><span class="t-etq">${esc(s.tipo)}</span><span class="t-tit">${esc(s.titulo)}</span><span class="por">${esc(s.por)}</span></div></div>`;
    }
    if(r.musica){
      const a=MUSICA.ahora;
      html+=`<div class="musica-panel"><div class="panel ahora"><span class="etq">${a&&a.vivo?"Escuchando ahora":"Lo último que escuché"}</span>
        ${a?`<div class="cancion">${safeSrc(a.img)?`<img src="${safeSrc(a.img)}" alt="">`:`<div class="tapa-v"></div>`}<div><b>${esc(a.nombre)}</b><span style="opacity:.8">${esc(a.artista)}</span></div></div>`
          :`<p style="margin-top:10px;opacity:.85">Cuando conectemos mi Spotify, acá vas a ver en vivo lo que estoy escuchando. ${C.mostrarVacios?'<span class="vacio-tag">conectar</span>':""}</p>`}
        ${M.spotifyPerfil?`<a class="btn" style="margin-top:16px;background:#1ED760;color:#121212" href="${esc(M.spotifyPerfil)}" target="_blank" rel="noopener">Seguirme en Spotify</a>`:""}</div>
        <div class="panel"><span class="etq">Lo más escuchado de la semana</span>${MUSICA.top.length?`<ol class="top-semana">${MUSICA.top.map(t=>`<li><div><b>${esc(t.nombre)}</b><div class="muted" style="font-size:13.5px">${esc(t.artista)} · ${esc(t.veces)} veces</div></div></li>`).join("")}</ol>`:`<p class="muted" style="margin-top:8px">Se completa solo cuando conectemos la música.</p>`}</div></div>`;
    }
    if(r.miro){
      window.subMiro=window.subMiro||"Anime";
      const est=n=>`<span class="estrellas" role="img" aria-label="${n} de 5 estrellas">${"★".repeat(n)}<span class="apagadas">${"★".repeat(5-n)}</span></span>`;
      const lista=(C.miro||[]).filter(m=>m.tipo===window.subMiro);
      html+=`<div class="sub-tabs" role="tablist">${[["Anime","Animes"],["Película","Películas"]].map(([k,n])=>`<button type="button" role="tab" data-miro="${k}" aria-pressed="${k===window.subMiro}">${n}</button>`).join("")}</div>`;
      html+=lista.length?`<p class="sub-p" style="margin-top:4px">Lo que vi y mi puntaje, sin spoilers.</p><div class="miro">${lista.map(m=>`<article class="miro-card">
        <div class="miro-tapa"><img src="${esc(m.img)}" alt="Portada de ${esc(m.nombre)}" loading="lazy"><span class="miro-tipo">${esc(m.tipo)}</span></div>
        <h4>${esc(m.nombre)}</h4>${est(m.estrellas)}
        ${m.detalle?`<ul class="miro-det">${Object.entries(m.detalle).map(([k,v])=>`<li><span>${esc(k)}</span>${est(v)}</li>`).join("")}</ul>`:""}</article>`).join("")}</div>`
        :`<div class="panel" style="padding:24px"><span class="proximo">Próximamente</span><p class="muted" style="margin-top:10px">Las películas que vi, con mi puntaje y sin spoilers.</p></div>`;
    }
    let grupos=r.grupos;
    if(r.subtabs){window.subReco=window.subReco||r.subtabs[0][0];
      html+=`<div class="sub-tabs" role="tablist">${r.subtabs.map(([k,n])=>`<button type="button" role="tab" data-sub="${k}" aria-pressed="${k===window.subReco}">${esc(n)}</button>`).join("")}</div>`;
      grupos=grupos.filter(g=>g.sub===window.subReco);}
    html+=grupos.map(g=>!g.items.length?`<div class="reco-grupo">${g.t?`<h3 class="sub-h" style="font-size:24px;margin-bottom:12px">${esc(g.t)}</h3>`:""}<p class="muted">${esc(g.vacio||"Muy pronto.")}</p></div>`:`<div class="reco-grupo">${g.t?`<h3 class="sub-h" style="font-size:24px;margin-bottom:12px">${esc(g.t)}</h3>`:""}<div class="reco-items">${g.items.map(it=>it.puntaje!=null
      ?`<article class="panel resena"><div class="cab"><h3>${esc(it.nombre)}${it.anio?` <span class="muted" style="font-size:15px">(${esc(it.anio)})</span>`:""}</h3>${estrellas(it.puntaje)}</div>
         <div class="criterios">${Object.entries(it.criterios||{}).map(([k,v])=>`<div><span>${esc(k)}</span>${estrellas(v)}</div>`).join("")}</div>
         <div class="por-que"><b>Por qué</b>${esc(it.opinion)}</div>${bloqueCoincido(clave(rc,it))}</article>`
      :`<div class="panel reco-item">${it.img?`<img class="reco-img" src="${esc(it.img)}" alt="" loading="lazy">`:""}${it.logo?`<img class="reco-logo" src="${esc(it.logo)}" alt="">`:""}<h3>${esc(it.nombre)}${it.nombre==="Completar"&&C.mostrarVacios?' <span class="vacio-tag">completar</span>':""}</h3><p class="muted">${esc(it.nota)}</p>${it.url?`<a href="${esc(it.url)}" target="_blank" rel="noopener">${esc(it.linkTxt||"Ver el video")} ↗</a>`:""}</div>`).join("")}</div></div>`).join("");
    $("#reco-panel").innerHTML=html;
    $("#reco-gaming-extra").hidden=true;
  };
  $("#reco-tabs").onclick=e=>{const b=e.target.closest("button");if(b){rc=b.dataset.r;pintarReco()}};
  $("#reco-panel").addEventListener("click",e=>{const b=e.target.closest(".sub-tabs button");if(!b)return;if(b.dataset.miro)window.subMiro=b.dataset.miro;else window.subReco=b.dataset.sub;pintarReco()});
  document.querySelectorAll("[data-reco]").forEach(a=>a.addEventListener("click",()=>{rc=a.dataset.reco;pintarReco()}));
  pintarReco();
})();

// ===== v15: navegación, buscador, guía, racha, Mercado Pago, avisos =====
(function(){
  const SEC=[
    {id:"inicio",n:"Inicio",c:"var(--rosa)",aud:"ambos"},
    {id:"sobre",n:"Sobre mí",c:"var(--rosa)",aud:"ambos"},
    {id:"videos",n:"Contenido",c:"var(--lila)",aud:"ambos"},
    {id:"cap-marcas",n:"Marcas",c:"var(--tinta)",aud:"ambos"},
    {id:"cap-comu",n:"Comunidad",c:"var(--turquesa)",aud:"ambos"}];
  const ICO={
    "sec-yo":'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><circle cx="12" cy="8" r="4"/><path d="M4 21c1.5-4 4.5-6 8-6s6.5 2 8 6"/></svg>',
    "sec-marcas":'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><rect x="3" y="7" width="18" height="13" rx="2"/><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>',
    "sec-redes":'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/></svg>',
    "sec-reco":'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3 6.6 7 .8-5.2 4.8 1.5 7L12 17.8 5.7 21.2l1.5-7L2 9.4l7-.8z"/></svg>',
    "sec-comu":'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><circle cx="9" cy="8" r="3.5"/><circle cx="17" cy="9" r="2.5"/><path d="M2 20c1-3.5 3.8-5.5 7-5.5s6 2 7 5.5M16 14.5c3 .2 5 2 6 5"/></svg>'};
  // ids de secciones de portada + íconos en los kickers
  const secs=document.querySelectorAll(".rev-main > .rev-seccion");
  const orden=["sec-yo","sec-marcas","sec-redes","sec-reco","sec-comu"];
  secs.forEach((s,i)=>{s.id=orden[i];const k=s.querySelector(".kicker");if(k&&ICO[orden[i]])k.insertAdjacentHTML("afterbegin",ICO[orden[i]])});
  // índice arriba + barra abajo
  const ind=document.createElement("nav");ind.className="indice";ind.setAttribute("aria-label","Índice de la revista");
  ind.innerHTML=SEC.map(s=>`<a href="#${s.id}" data-sec="${s.id}" style="--c:${s.c}"><i class="pto"></i>${s.n}</a>`).join("");
  const barra=document.querySelector(".barra .wrap");barra.insertBefore(ind,$("#vivo"));
  const bb=document.createElement("button");bb.className="btn-buscar";bb.type="button";bb.setAttribute("aria-label","Buscar (Ctrl K)");bb.title="Buscar (Ctrl K)";bb.innerHTML=`<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4"/></svg><span class="bb-txt">Buscar</span> <kbd>Ctrl K</kbd>`;
  barra.insertBefore(bb,$("#vivo"));
  const tab=document.createElement("nav");tab.className="tabbar";tab.setAttribute("aria-label","Secciones");
  tab.innerHTML=SEC.map(s=>`<a href="#${s.id}" data-sec="${s.id}" style="--c:${s.c}"><i class="ico"></i>${s.n}</a>`).join("")+`<button type="button" id="tab-buscar"><i class="ico" style="--c:var(--gris)"></i>Buscar</button>`;
  document.body.appendChild(tab);
  const enlaces=()=>document.querySelectorAll(".indice a,.tabbar a");
  const ob=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)enlaces().forEach(a=>a.classList.toggle("activa",a.dataset.sec===e.target.id))}),{rootMargin:"-30% 0px -60% 0px"});

  function filtrarIndice(){const v=document.querySelector(".revista").dataset.vista;
    enlaces().forEach(a=>{const s=SEC.find(x=>x.id===a.dataset.sec);a.hidden=(v==="marca"&&s.aud==="comu")||(v==="comu"&&s.aud==="marca")});
    document.body.classList.toggle("vista-marca",v==="marca")}
  new MutationObserver(filtrarIndice).observe(document.querySelector(".revista"),{attributes:true,attributeFilter:["data-vista"]});filtrarIndice();
  // botón flotante para marcas
  document.body.insertAdjacentHTML("beforeend",`<a class="fab-marca" href="#contacto">Pedir propuesta →</a>`);

  // marquesina
  if(C.novedades&&C.novedades.length){const m=document.createElement("div");m.className="marquesina";m.setAttribute("aria-label","Novedades");
    const it=C.novedades.map(n=>`<span>${esc(n)}</span>`).join("");m.innerHTML=`<div class="cinta">${it}${it}</div>`;
    document.querySelector(".masthead").after(m);
    // las novedades también quedan en la página de novedades (botón "Ver novedades")
    const cw=document.querySelector("#cartelera .wrap"),cab=cw&&cw.querySelector(".cabeza");
    if(cw){const l=document.createElement("ul");l.className="novedades-lista";l.setAttribute("aria-label","Novedades");l.innerHTML=C.novedades.map(n=>`<li>${esc(n)}</li>`).join("");cab?cab.after(l):cw.prepend(l)}}

  // anterior / siguiente en cada panel
  const ORDEN=["sobre","dia","pc","porque","experiencia","contacto","numeros","videos","juegos","eventos","recomendaciones","comunidad","setups","quiz","jugar","cartelera"];
  const NOM={sobre:"Sobre mí",dia:"Un día con Godcita",pc:"Mi próxima PC",porque:"Por qué trabajar conmigo",experiencia:"Experiencia",contacto:"Trabajemos juntos",numeros:"Números",videos:"Contenido",juegos:"Lo que juego",eventos:"Eventos",recomendaciones:"Recomendaciones",comunidad:"Los kirbitos",setups:"Setups y envíos",quiz:"Trivia",jugar:"Juntá kirbitos",cartelera:"La cartelera",legal:"Privacidad y reglas"};
  ORDEN.forEach((id,i)=>{const sec=document.getElementById(id);if(!sec||!sec.classList.contains("bloque"))return;const w=sec.querySelector(".wrap");const a=ORDEN[i-1],b=ORDEN[i+1];
    w.insertAdjacentHTML("beforeend",`<nav class="paginado" aria-label="Seguir leyendo">${a?`<a href="#${a}"><small>← Anterior</small><b>${NOM[a]}</b></a>`:"<span></span>"}${b?`<a class="sig" href="#${b}"><small>Siguiente →</small><b>${NOM[b]}</b></a>`:""}</nav>`)});

  // buscador
  const IDX=[
    ["Sobre mí","Quién soy, signo, estudios, sueños","sobre"],["Un día con Godcita","Mis vlogs","dia"],["Mi próxima PC","Aportar por Mercado Pago, avisame cuando vuelva","pc"],
    ["Por qué trabajar conmigo","Diferenciales para marcas","porque"],["Experiencia","Co-streams, eventos y marcas","experiencia"],["Tarifas y paquetes","Canje, tarifa o a medida","contacto"],["Pedir propuesta","Formulario para marcas","contacto"],["Media kit PDF","Descargar","contacto"],
    ["Números","Estadísticas de todas mis redes","numeros"],["Contenido","Videos de reviews, pádel, fútbol, lifestyle","videos"],["Lo que juego","Valorant, CS y más","juegos"],
    ["Recomendaciones","Zona gaming, anime, pelis y música","recomendaciones"],["Anime y pelis","Lo que miro, con puntaje","recomendaciones"],["Música","Escuchando ahora y top de la semana","recomendaciones"],
    ["Los kirbitos","Mi comunidad","comunidad"],["Pregunta del día","Conozcámonos","comunidad","conozcamonos"],
    ["Setups","Mostrá tu setup, mandame algo para opinar","setups"],["Mi setup anterior","Cómo era mi lugar de stream","setups"],["Rubros para marcas","Gaming, pádel, fútbol, lifestyle","contacto"],["Trivia","¿Cuánto conocés a Godcita? Ganá gemas","quiz"],["Jugar","Juntá kirbitos","jugar"],["Premios","Canjear kirbitos","jugar"],["La cartelera","Hits, tweets, chismecitos y opiniones","cartelera"],["Dejar mi opinión","Qué opinás de Godcita","cartelera"],
    ["Privacidad y reglas","Datos y reglas de los kirbitos","legal"]];
  document.body.insertAdjacentHTML("beforeend",`<div class="buscador" id="buscador" role="dialog" aria-modal="true" aria-label="Buscar en la página"><div class="bus-caja"><input id="bus-in" type="search" placeholder="¿Qué buscás? Tarifas, trivia, números…" autocomplete="off"><div class="bus-sug" id="bus-sug"></div><ul class="bus-res" id="bus-res"></ul></div></div>`);
  const norm=t=>t.normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase();
  let sel=0,lista=[];
  function buscar(q){const n=norm(q);lista=IDX.filter(x=>!n||norm(x[0]+" "+x[1]).includes(n)).slice(0,9);sel=0;
    $("#bus-res").innerHTML=lista.length?lista.map((x,i)=>`<li><a href="#${x[2]}" ${x[3]?`data-ancla="${x[3]}"`:""} class="${i===0?"sel":""}" style="--c:${colorDe(x[2])}"><i class="pto"></i><span><b>${esc(x[0])}</b><small>${esc(x[1])}</small></span></a></li>`).join(""):`<li style="padding:14px;color:var(--gris)">No encontré "${esc(q)}". Probá con otra palabra.</li>`}
  function colorDe(id){return ["porque","experiencia","contacto"].includes(id)?"var(--tinta)":["numeros","videos","juegos","eventos"].includes(id)?"var(--lila)":id==="recomendaciones"?"#E07A1F":["sobre","dia","pc"].includes(id)?"var(--rosa)":"var(--turquesa)"}
  $("#bus-sug").innerHTML=["Tarifas","Números","Trivia","Música","Cartelera"].map(s=>`<button type="button">${s}</button>`).join("");
  $("#bus-sug").onclick=e=>{const b=e.target.closest("button");if(b){$("#bus-in").value=b.textContent;buscar(b.textContent)}};
  const abrirB=()=>{$("#buscador").classList.add("on");$("#bus-in").value="";buscar("");setTimeout(()=>$("#bus-in").focus(),30)};
  const cerrarB=()=>$("#buscador").classList.remove("on");
  bb.onclick=abrirB;$("#tab-buscar").onclick=abrirB;
  $("#bus-in").oninput=e=>buscar(e.target.value);
  $("#bus-in").onkeydown=e=>{const as=[...document.querySelectorAll("#bus-res a")];if(e.key==="ArrowDown"||e.key==="ArrowUp"){e.preventDefault();sel=(sel+(e.key==="ArrowDown"?1:-1)+as.length)%as.length;as.forEach((a,i)=>a.classList.toggle("sel",i===sel))}
    if(e.key==="Enter"&&as[sel]){e.preventDefault();cerrarB();as[sel].click()}if(e.key==="Escape")cerrarB()};
  $("#buscador").addEventListener("click",e=>{if(e.target.id==="buscador")cerrarB();if(e.target.closest("#bus-res a"))cerrarB()});
  addEventListener("keydown",e=>{if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==="k"){e.preventDefault();abrirB()}else if(e.key==="/"&&!/INPUT|TEXTAREA|SELECT/.test(document.activeElement.tagName)){e.preventDefault();abrirB()}});

  // guía de bienvenida (una sola vez)
  const PASOS=[["Elegí tu edición","Arriba podés leer todo, solo lo de marcas o solo lo de la comunidad."],["Tocá cualquier cuadro","Te lleva a su página: Sobre mí, Contenido, Marcas o Comunidad. Para volver, tocá Inicio."],["Movete fácil","Usá el índice, el buscador o los botones Anterior y Siguiente para recorrer la revista."]];
  if(!lee("guia-vista",false)&&!location.hash&&location.pathname==="/"){let p=0;const g=document.createElement("div");g.className="guia";g.setAttribute("role","dialog");g.setAttribute("aria-label","Guía rápida");document.body.appendChild(g);
    const pint=()=>{g.innerHTML=`<span class="paso">Guía rápida · ${p+1} de ${PASOS.length}</span><h3>${PASOS[p][0]}</h3><p>${PASOS[p][1]}</p><div class="acc"><button class="saltar" type="button">Saltear</button><div class="puntos">${PASOS.map((_,i)=>`<i class="${i===p?"on":""}"></i>`).join("")}</div><button class="ok" type="button">${p<PASOS.length-1?"Siguiente":"¡Listo!"}</button></div>`;
      g.querySelector(".saltar").onclick=fin;g.querySelector(".ok").onclick=()=>{p++;p<PASOS.length?pint():fin()}};
    const fin=()=>{g.remove();guarda("guia-vista",true)};setTimeout(pint,900)}

  // racha de visitas
  (function(){const hoyR=new Date().toISOString().slice(0,10),ayer=new Date(Date.now()-864e5).toISOString().slice(0,10);
    let r=lee("racha",{u:"",n:0});if(r.u!==hoyR){r.n=r.u===ayer?r.n+1:1;r.u=hoyR;let bonus=r.n>=2?2:0;if(r.n%7===0)bonus+=20;
      if(bonus){guarda("kirbitos-total",lee("kirbitos-total",0)+bonus);setTimeout(()=>{const t=$("#toast");t.innerHTML=`${ico("fuego")} Racha de ${r.n} días: +${bonus} kirbitos`;t.classList.add("ver");setTimeout(()=>{t.classList.remove("ver");t.textContent="Mail copiado"},2600)},1600)}guarda("racha",r)}
    if(r.n>=2){const h=document.querySelector("#sec-comu .rev-cab");if(h)h.insertAdjacentHTML("beforeend",`<span class="racha" title="Volvé mañana para seguir sumando">${ico("fuego")}Racha de ${r.n} días</span>`)}})();

  // números: "actualizado hace…"
  if(C.actualizado&&/^\d{4}-\d{2}-\d{2}/.test(C.actualizado)){const d=Math.max(0,Math.round((Date.now()-new Date(C.actualizado))/864e5));
    $("#actualizado").textContent="Actualizado "+(d===0?"hoy":d===1?"ayer":`hace ${d} días`)+" · se actualiza solo cada semana"}

  // Mercado Pago + alias
  const mp=$("#pc-mp");
  if(C.pc.mpLink){mp.href=C.pc.mpLink}else{mp.removeAttribute("href");if(C.mostrarVacios)mp.insertAdjacentHTML("beforeend",' <span class="vacio-tag">falta el link</span>')}
  if(C.pc.alias){$("#pc-alias-txt").textContent=C.pc.alias;$("#pc-alias-btn").onclick=async()=>{try{await navigator.clipboard.writeText(C.pc.alias)}catch(e){}const t=$("#toast");t.textContent="Alias copiado";t.classList.add("ver");setTimeout(()=>{t.classList.remove("ver");t.textContent="Mail copiado"},1800)}}
  else $("#pc-alias").hidden=!C.mostrarVacios;
  // avisame cuando vuelva
  $("#form-aviso").onsubmit=async e=>{e.preventDefault();const v=$("#aviso-in").value.trim(),est=$("#aviso-estado");
    if(v.length<3){est.textContent="Dejá tu mail o tu usuario de Twitch.";$("#aviso-in").focus();return}
    if(!C.backendURL&&!C.formspree){est.textContent="Modo prueba: cuando conectemos la planilla, te va a llegar el aviso.";return}
    try{await enviar({tipo:"aviso",contacto:v});est.textContent="¡Listo! Te aviso cuando vuelva al stream.";$("#aviso-in").value=""}catch(err){est.textContent="No se pudo guardar. Probá de nuevo."}};
})();

// ===== v16: rubros para marcas, setups, envíos =====
(function(){
  // rubros
  const RB=C.rubrosMarca; let rb=RB[0].id;
  const cont=document.createElement("div");cont.className="rubros-marca";cont.id="rubros-marca";
  $("#banda-marcas").closest(".rev-grid").after(cont);
  function pintarRubro(){const r=RB.find(x=>x.id===rb);
    cont.innerHTML=`<div class="rm-cab"><h3>¿De qué rubro es tu marca?</h3><div class="rm-tabs" role="group" aria-label="Rubro">${RB.map(x=>`<button type="button" data-rb="${x.id}" aria-pressed="${x.id===rb}">${esc(x.nombre)}</button>`).join("")}</div></div>
      ${(r.fotos||[]).length?`<div class="rm-fotos">${r.fotos.filter(safeSrc).map(s=>`<img src="${safeSrc(s)}" alt="Foto de Bianca" loading="lazy">`).join("")}</div>`:""}<div class="rm-cuerpo"><div><h4>Lo que hago${rb==="general"?"":" en "+esc(r.nombre.toLowerCase())}</h4><p>${esc(r.intro)}</p></div>
        <div><h4>Contenido que ya hago</h4><ul>${r.hago.map(x=>`<li>${esc(x)}</li>`).join("")}</ul></div>
        <div><h4>Ideas para tu marca</h4><ul>${r.ideas.map(x=>`<li>${esc(x)}</li>`).join("")}</ul></div></div>
      <div class="rm-acc"><a class="btn prim" href="#contacto">Pedir propuesta</a><a class="btn sec" href="#videos" data-ver="${esc(r.videos)}">Ver mi contenido de ${rb==="general"?"todo":esc(r.nombre.toLowerCase())}</a></div>`;
    cont.querySelector("[data-ver]").addEventListener("click",e=>pintarVideos(e.currentTarget.dataset.ver));
  }
  cont.addEventListener("click",e=>{const b=e.target.closest("[data-rb]");if(b){rb=b.dataset.rb;pintarRubro()}});
  pintarRubro();

  // mi PC: lo que tengo y lo que falta
  const pcL=document.createElement("div");pcL.className="pc-lista";
  pcL.innerHTML=`<div class="panel"><span class="etq">Ya tengo</span><div class="tags">${(C.pc.tengo||[]).map(x=>`<span class="tag tengo">${esc(x)}</span>`).join("")}</div></div>
    <div class="panel"><span class="etq">Me falta</span><div class="tags">${(C.pc.partes||[]).map(x=>`<span class="tag">${esc(x)}</span>`).join("")}</div></div>`;
  $("#pc-partes").replaceWith(pcL);
  if(C.pc.nota){const n=document.createElement("p");n.className="muted";n.style.cssText="margin-top:14px;font-size:15px";n.textContent=C.pc.nota;pcL.after(n)}

  // mi setup
  const S=C.miSetup;
  $("#mi-setup").innerHTML=`<figure class="ms-foto">${safeSrc(S.foto)?`<img src="${safeSrc(S.foto)}" alt="${esc(S.titulo)}" loading="lazy">`:""}</figure>
    <div class="ms-txt"><span class="ms-etq">Así era</span><h3>${esc(S.titulo)}</h3><p>${esc(S.texto)}</p>
    ${S.tengo.length?`<ul class="ms-tengo">${S.tengo.map(x=>`<li><span>Hoy tengo</span>${esc(x)}</li>`).join("")}</ul>`:""}
    <a class="btn sec" href="#pc">Ver lo que me falta para mi PC ${ico("flecha")}</a></div>`;

  // muro tipo chat
  window.pintarEnvios=extra=>{const lista=[...(C.backendURL?[]:C.setups),...(extra||[])];
    $("#chat-muro").innerHTML=lista.length?lista.map(x=>`<div class="msg"><div class="quien"><span class="av">${safeSrc(x.avatar)?`<img src="${safeSrc(x.avatar)}" alt="">`:esc((x.nombre||"A")[0].toUpperCase())}</span><div><b>${esc(x.nombre||"Anónimo")}</b>${x.usuario?`<small> ${esc(x.usuario)}</small>`:""}</div></div>
      <div class="burbuja">${x.cat?`<span class="tag-cat">${x.cat==="opinar"?"¿Qué opinás de esto?":"Mi setup"}</span>`:""}${safeSrc(x.foto)?`<img src="${safeSrc(x.foto)}" alt="Foto enviada por ${esc(x.nombre||"un kirbito")}" loading="lazy">`:""}<span>${esc(x.texto)}</span>${x.link&&/^https?:\/\//.test(x.link)?`<a href="${esc(x.link)}" target="_blank" rel="noopener nofollow">${esc(x.link)}</a>`:""}</div>
      ${x.opinion?`<div class="resp-b"><small>Bianca opina</small>${esc(x.opinion)}</div>`:""}</div>`).join("")
      :`<p class="muted"><span class="proximo">Próximamente</span> Acá van a aparecer los setups y las cosas que me manden. ¡Mandá el tuyo!</p>`};
  pintarEnvios();

  // formulario de envío
  let cat="setup",fotoB64="";
  const tabsE=document.querySelectorAll("#form-envio [data-cat]");
  tabsE.forEach(b=>b.onclick=()=>{cat=b.dataset.cat;tabsE.forEach(x=>x.setAttribute("aria-selected",x===b));
    $("#ev-lbl").textContent=cat==="setup"?"Contame de tu setup":"¿Sobre qué querés mi opinión?";
    $("#ev-texto").placeholder=cat==="setup"?"Qué tenés, qué cambiarías, qué te gustaría sumar…":"Un periférico, un video, una idea, un tema… contame y te respondo."});
  $("#ev-foto").onchange=e=>{const f=e.target.files[0];fotoB64="";$("#ev-prev").innerHTML="";if(!f)return;
    if(!/^image\//.test(f.type)){$("#ev-estado").textContent="El archivo tiene que ser una imagen.";return}
    const img=new Image();img.onload=()=>{const m=1000,k=Math.min(1,m/Math.max(img.width,img.height)),cv=document.createElement("canvas");cv.width=img.width*k;cv.height=img.height*k;cv.getContext("2d").drawImage(img,0,0,cv.width,cv.height);
      fotoB64=cv.toDataURL("image/jpeg",.8);$("#ev-prev").innerHTML=`<img src="${fotoB64}" alt="Vista previa de tu foto">`;URL.revokeObjectURL(img.src)};img.src=URL.createObjectURL(f)};
  $("#form-envio").onsubmit=async e=>{e.preventDefault();const t=$("#ev-texto").value.trim(),est=$("#ev-estado");
    if(t.length<2&&!fotoB64){est.textContent="Escribí algo o subí una foto antes de enviar.";$("#ev-texto").focus();return}
    const datos={tipo:"envio",categoria:cat,texto:t,link:$("#ev-link").value.trim(),nombre:$("#ev-nombre").value.trim()||"Anónimo",usuario:$("#ev-user").value.trim(),publicar:$("#ev-publicar").checked,imagen:fotoB64};
    if(!C.backendURL&&!C.formspree){est.textContent="Modo prueba: cuando conectemos la planilla, tu envío le va a llegar a Bianca.";return}
    est.textContent="Enviando…";
    try{await enviar(datos);est.textContent=datos.publicar?"¡Gracias! Si Bianca lo aprueba, aparece acá con su opinión.":"¡Gracias! Le llega solo a Bianca.";e.target.reset();fotoB64="";$("#ev-prev").innerHTML=""}catch(err){est.textContent="No se pudo enviar. Probá con una foto más chica o de nuevo en un rato."}};
})();


// ===== v17: estadísticas desde la planilla (automáticas + manuales) =====
function aplicarStats(st){
  if(!st||!st.redes)return;
  const num_=v=>{if(v===""||v==null)return null;const n=Number(String(v).replace(/[^\d.,-]/g,"").replace(/\./g,"").replace(",","."));return isNaN(n)||/[a-z%]/i.test(String(v))?String(v):n};
  C.redes.forEach(r=>{const d=st.redes[r.id];if(!d)return;
    if(d.seguidores!=null&&d.seguidores!=="")r.seguidores=num_(d.seguidores);
    r.metricas.forEach(m=>{if(d[m[0]]!=null&&d[m[0]]!=="")m[1]=num_(d[m[0]])});
    ["edad","hombres","mujeres","argentina"].forEach(k=>{if(d[k]!=null&&d[k]!=="")r.audiencia[k]=k==="edad"?String(d[k]):Number(d[k])});});
  if(st.actualizado)C.actualizado=st.actualizado;
  if(st.enVivo){C.enVivo=true;$("#vivo").style.display="inline-flex"}
  const tot=sumar(r=>r.seguidores);
  const kitV=document.querySelectorAll("#kit .v");if(kitV[0])kitV[0].textContent=num(tot);
  const rep30=sumar(r=>(r.metricas.find(m=>/Reproducciones|Impresiones/.test(m[0]))||[])[1]);if(kitV[2])kitV[2].textContent=num(rep30);
  if(tot){const hy=$("#hy-num");if(hy)hy.textContent=num(tot);const cn=$("#cap-num");if(cn)cn.textContent=num(tot);const tb=$("#t-num-big");if(tb){tb.textContent=num(tot);$("#t-num-sub").textContent="personas en mi comunidad, sumando todas mis redes"}
    const bd=document.querySelector(".bm-dato b");if(bd){bd.textContent=num(tot);bd.nextElementSibling.textContent="personas en mi comunidad"}}
  pintarRed();
  if(C.actualizado&&/^\d{4}-\d{2}-\d{2}/.test(C.actualizado)){const d=Math.max(0,Math.round((Date.now()-new Date(C.actualizado))/864e5));
    $("#actualizado").textContent="Actualizado "+(d===0?"hoy":d===1?"ayer":`hace ${d} días`)+" · se actualiza solo"}
}

// datos remotos (respuestas aprobadas, votos de la comunidad, ranking)
if(C.backendURL){
  fetch(C.backendURL).then(r=>r.json()).then(d=>{REMOTO=d;try{aplicarStats(d.stats)}catch(e){}if(window.pintarReco)pintarReco();if(window.pintarEnvios)pintarEnvios(d.envios||[]);const rs=d.respuestas||[];pintarRespuestas(rs.filter(r=>!/^Opinión:/.test(r.pregunta)));pintarCartelera(rs.filter(r=>/^Opinión:/.test(r.pregunta)).map(r=>({tipo:r.pregunta.replace("Opinión: ",""),texto:r.respuesta,autor:r.nombre||"Anónimo",color:"turquesa"})));pintarVotos();pintarRanking()}).catch(()=>pintarRespuestas([]));
}

// nav activa
const ls=[...document.querySelectorAll(".barra nav:not(.indice) a")];
const ob=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)ls.forEach(a=>a.classList.toggle("activa",a.getAttribute("href")==="#"+e.target.id))}),{rootMargin:"-45% 0px -50% 0px"});
document.querySelectorAll("main section[id]").forEach(s=>ob.observe(s));


