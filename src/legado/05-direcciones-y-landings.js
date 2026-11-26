(function(){
  const PAG={
    sobre:{t:"Sobre mí",s:["sobre"]},
    contenido:{t:"Contenido",s:["videos"]},
    marcas:{t:"Marcas",s:["cap-marcas","numeros","experiencia","porque","contacto"]},
    comunidad:{t:"Comunidad",s:["cap-comu","comunidad","cartelera","tweets","recomendaciones","setups","dia","pc","jugar"]},
    legal:{t:"Privacidad y reglas",s:["legal"]}};
  // ===== cada sección tiene su propia dirección (godcita.com.ar/numeros, /novedades, …) =====
  // [dirección, id de la sección, título, grupo]. Marcas y Comunidad son portadas con accesos a sus secciones.
  const R=[
    ["sobre-mi","sobre","Sobre mí",""],
    ["contenido","videos","Contenido",""],
    ["marcas","cap-marcas","Marcas","marcas"],
    ["numeros","numeros","Números","marcas"],
    ["experiencia","experiencia","Experiencia","marcas"],
    ["por-que-yo","porque","Por qué yo","marcas"],
    ["contacto","contacto","Trabajemos juntos","marcas"],
    ["comunidad","cap-comu","Comunidad","comunidad"],
    ["mi-comunidad","comunidad","Mi comunidad","comunidad"],
    ["jugar","jugar","Jugar","comunidad"],
    ["recomendaciones","recomendaciones","Recomendaciones","comunidad"],
    ["novedades","cartelera","Novedades","comunidad"],
    ["setups","setups","Setups","comunidad"],
    ["mi-dia","dia","Mi día","comunidad"],
    ["mi-pc","pc","Mi próxima PC","comunidad"],
    ["en-x","tweets","En X","comunidad"],
    ["privacidad","legal","Privacidad y reglas",""]];
  const DESC={numeros:"Mi audiencia en todas las redes, siempre al día",experiencia:"Co-streams oficiales, host, eventos y marcas","por-que-yo":"Lo que suma tenerme en tu campaña",contacto:"Formatos, paquetes y formulario para pedir propuesta",
    "mi-comunidad":"Los kirbitos, la pregunta del día y ¿Esto o aquello?",novedades:"Lo de esta semana y lo que opinan",recomendaciones:"Pelis, anime, música y juegos, con puntaje",jugar:"La trivia y Juntá kirbitos",setups:"Mi setup y los de ustedes","mi-dia":"En qué ando y mis vlogs","mi-pc":"Ahorrando para volver al stream","en-x":"Mis últimos posts"};
  const porSlug={},porSec={};R.forEach(r=>{porSlug[r[0]]=r;porSec[r[1]]=r});
  const NAVDE={"sobre-mi":"sobre",contenido:"videos",marcas:"cap-marcas",comunidad:"cap-comu",privacidad:null};
  const TITULO=document.title;
  const portada=document.getElementById("inicio");
  const bloques=[...document.querySelectorAll("main > section.bloque, main > .capitulo")];
  const bar=document.createElement("div");bar.className="wrap volver-bar";portada.after(bar);
  const sub=document.createElement("nav");sub.className="wrap sub-nav";sub.setAttribute("aria-label","Secciones de esta parte");bar.after(sub);
  // Marcas y Comunidad son landings de corrido: todas sus partes una debajo de la otra (cada una conserva su dirección)
  const LANDINGS={};
  ["marcas","comunidad"].forEach(g=>{const partes=R.filter(r=>r[3]===g&&r[0]!==g),cap=document.getElementById(porSlug[g][1]);
    LANDINGS[g]={partes,secciones:[cap,...partes.map(p=>document.getElementById(p[1]))].filter(Boolean)};
    if(cap){let ref=cap;partes.forEach((p,i)=>{const sec=document.getElementById(p[1]);if(!sec)return;ref.after(sec);ref=sec;
      sec.classList.toggle("alt",i%2===0);const cab=sec.querySelector(".cabeza");if(cab){cab.dataset.num=String(i+1).padStart(2,"0");cab.dataset.etq=p[2]}})}});
  const enLanding=r=>!!r&&!!LANDINGS[r[3]];
  // de un id (sección o algo adentro de una sección) a su dirección
  function dirDe(id,ancla){
    if(!id||id==="inicio")return "/";
    if(porSec[id])return "/"+porSec[id][0]+(ancla?"#"+ancla:"");
    const el=document.getElementById(id);if(!el)return null;
    const sec=el.closest("main > section.bloque, main > .capitulo");
    if(sec&&porSec[sec.id])return "/"+porSec[sec.id][0]+"#"+id;
    if(el.closest("#inicio"))return "/#"+id;
    return null}
  const slugActual=()=>decodeURIComponent(location.pathname.replace(/^\/+|\/+$/g,""));
  // centra la pastilla activa moviendo solo el menú hacia los costados (scrollIntoView movería toda la página)
  function centrarPastilla(){const a=sub.querySelector("[aria-current]");if(!a||sub.scrollWidth<=sub.clientWidth)return;
    const ra=a.getBoundingClientRect(),rs=sub.getBoundingClientRect();
    sub.scrollTo({left:Math.max(0,sub.scrollLeft+ra.left-rs.left-(sub.clientWidth-ra.width)/2),behavior:"smooth"})}
  function ruta(volverA){
    let s=slugActual();
    // enlaces viejos con # (por ejemplo /#numeros) pasan a su dirección nueva
    if(!s&&location.hash){const d=dirDe(decodeURIComponent(location.hash.slice(1)));if(d&&d!=="/"&&!d.startsWith("/#")){history.replaceState(null,"",d);s=slugActual()}}
    let r=porSlug[s]||null;
    if(s&&!r){history.replaceState(null,"","/");s="";r=null}
    const g=r?r[3]:"";
    document.body.dataset.pagina=r?(g||r[0]):"inicio";
    document.body.dataset.ruta=r?r[0]:"";
    const L=enLanding(r)?LANDINGS[g]:null;
    if(L)document.body.dataset.landing=g;else delete document.body.dataset.landing;
    portada.classList.toggle("oculta",!!r);bar.hidden=!r;sub.hidden=!(r&&g);
    bloques.forEach(b=>b.classList.toggle("oculta",!(r&&(L?(b.id===porSlug[g][1]||L.partes.some(p=>p[1]===b.id)):b.id===r[1]))));
    document.querySelectorAll(".hub-grid").forEach(h=>h.hidden=true);
    if(r){const atras=!L&&g&&g!==r[0]?porSlug[g]:null;
      bar.innerHTML=`<a href="${atras?"/"+atras[0]:"/"}">← ${atras?atras[2]:"Inicio"}</a><span>${L?porSlug[g][2]:r[2]}</span>`;
      sub.innerHTML=!g?"":L?L.partes.map(x=>`<a href="/${x[0]}"${x[0]===r[0]?' aria-current="true"':""}>${x[2]}</a>`).join("")
        :R.filter(x=>x[3]===g).map(x=>`<a href="/${x[0]}"${x[0]===r[0]?' aria-current="page"':""}>${x[2]}</a>`).join("");
      document.title=`${r[2]} · Godcita`}
    else document.title=TITULO;
    const navSec=r?NAVDE[g||r[0]]:"inicio";
    document.querySelectorAll(".indice a,.tabbar a").forEach(a=>a.classList.toggle("activa",!!navSec&&a.dataset.sec===navSec));
    centrarPastilla();
    requestAnimationFrame(()=>{if(typeof volverA==="number"){scrollTo(0,volverA);return}
      const h=decodeURIComponent(location.hash.slice(1)),el=h&&document.getElementById(h);
      if(el&&el.tagName==="DETAILS")el.open=true; // por ejemplo "¿Esto o aquello?", que es desplegable
      if(el&&!(r&&el.id===r[1]))el.scrollIntoView({block:"start"});
      else if(L&&r[0]!==g){guiandoHasta=Date.now()+600;const sec=document.getElementById(r[1]);sec?sec.scrollIntoView({block:"start"}):scrollTo(0,0)}
      else scrollTo(0,0)});
  }
  // en la landing, el menú de arriba marca (y la dirección acompaña) la parte que estás leyendo
  let guiandoHasta=0,espiaPend=false;
  function espiar(){espiaPend=false;
    const gL=document.body.dataset.landing;if(!gL||!LANDINGS[gL]||Date.now()<guiandoHasta)return;
    const seccionesL=LANDINGS[gL].secciones;
    // la parte actual es la última cuyo comienzo ya pasó por debajo del menú fijo
    const linea=sub.getBoundingClientRect().bottom+40;let cur=seccionesL[0];
    for(const s of seccionesL){if(s.getBoundingClientRect().top<=linea)cur=s;else break}
    if(innerHeight+scrollY>=document.documentElement.scrollHeight-4)cur=seccionesL[seccionesL.length-1];
    const p=porSec[cur.id];if(!p)return;
    const ya=sub.querySelector("[aria-current]");if(ya&&ya.getAttribute("href")==="/"+p[0]&&location.pathname==="/"+p[0])return;
    sub.querySelectorAll("a").forEach(a=>a.toggleAttribute("aria-current",a.getAttribute("href")==="/"+p[0]));
    centrarPastilla();
    if(location.pathname!=="/"+p[0]){history.replaceState(history.state,"","/"+p[0]);document.title=`${p[2]} · Godcita`}}
  addEventListener("scroll",()=>{if(!espiaPend){espiaPend=true;requestAnimationFrame(espiar)}},{passive:true});
  function irEnLanding(dir){const u=new URL(dir,location.origin),s=u.pathname.replace(/^\/+|\/+$/g,""),p=porSlug[s];
    const el=(u.hash&&document.getElementById(decodeURIComponent(u.hash.slice(1))))||document.getElementById(p[1]);
    if(el&&el.tagName==="DETAILS")el.open=true;
    history.replaceState(history.state,"",dir);document.title=`${p[2]} · Godcita`;
    sub.querySelectorAll("a").forEach(a=>a.toggleAttribute("aria-current",a.getAttribute("href")==="/"+s));centrarPastilla();
    guiandoHasta=Date.now()+900;
    if(s===p[3]&&!u.hash)scrollTo({top:0,behavior:"smooth"});else el.scrollIntoView({behavior:"smooth",block:"start"})}
  window.ruta=ruta;
  // los enlaces internos cambian de dirección sin recargar la página
  document.addEventListener("click",e=>{
    if(e.defaultPrevented||e.button!==0||e.metaKey||e.ctrlKey||e.shiftKey||e.altKey)return;
    const a=e.target.closest("a[href]");if(!a||a.target==="_blank"||a.hasAttribute("download"))return;
    const href=a.getAttribute("href");let dir=null;
    if(href.startsWith("#")){if(href.length<2)return;dir=dirDe(decodeURIComponent(href.slice(1)),a.dataset.ancla)}
    else if(href.startsWith("/")&&!href.startsWith("//")){const u=new URL(href,location.origin),s=u.pathname.replace(/^\/+|\/+$/g,"");if(!s||porSlug[s])dir=u.pathname+u.hash}
    if(!dir)return;
    e.preventDefault();
    // dentro de una landing (Marcas o Comunidad): baja suave hasta esa parte, sin cambiar de página
    const dS=new URL(dir,location.origin).pathname.replace(/^\/+|\/+$/g,""),gAct=document.body.dataset.landing;
    if(gAct&&porSlug[dS]&&porSlug[dS][3]===gAct){irEnLanding(dir);return}
    if(dir!==location.pathname+location.hash){history.replaceState({y:scrollY},"",location.pathname+location.hash);history.pushState(null,"",dir)}
    ruta();
  });
  // al volver con "atrás", se vuelve a la altura donde estabas
  addEventListener("popstate",()=>{const y=history.state&&history.state.y;ruta(typeof y==="number"?y:undefined)});
  // los enlaces que ya están en la página muestran su dirección real (sirve para abrir en otra pestaña o copiar el link)
  document.querySelectorAll('a[href^="#"]').forEach(a=>{const d=dirDe(decodeURIComponent(a.getAttribute("href").slice(1)),a.dataset.ancla);if(d)a.setAttribute("href",d)});
  ruta();
})();

