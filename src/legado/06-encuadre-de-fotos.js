(function(){
  // Encuadre de cada foto para que se vean las caras y lo importante
  const FOCO=new Map([[FOTOS.eventoPG,"center 25%"],[FOTOS.visa,"center 40%"],[FOTOS.pgCS,"60% 50%"],[FOTOS.setup,"center 28%"],[FOTOS.escritorio,"center 35%"],
    [FOTOS.padel,"center 58%"],[FOTOS.padelPelota,"center 62%"],[FOTOS.padelMedallas,"center 88%"],
    [FOTOS.aula1,"center 40%"],[FOTOS.aula2,"center 25%"],[FOTOS.aula3,"center 35%"],[FOTOS.aula4,"center 42%"]]);
  const cols=()=>document.querySelectorAll(".rm-fotos").forEach(g=>{const n=g.children.length;const c=innerWidth<760?2:(n<=4?n:Math.min(5,Math.ceil(n/2)));g.style.setProperty("grid-template-columns",`repeat(${c},minmax(0,1fr))`,"important")});
  addEventListener("resize",cols);
  const enfocar=()=>{cols();return document.querySelectorAll("img").forEach(i=>{const p=FOCO.get(i.getAttribute("src"));if(p&&i.style.objectPosition!==p)i.style.setProperty("object-position",p,"important")})};
  enfocar();new MutationObserver(enfocar).observe(document.body,{childList:true,subtree:true});
  // Reproductor para videos subidos a la página
  const d=document.createElement("dialog");d.id="vid-dlg";d.innerHTML='<video controls playsinline preload="none"></video><button type="button">Cerrar</button>';document.body.appendChild(d);
  const vEl=d.querySelector("video");
  const cerrarV=()=>{vEl.pause();d.close()};
  d.querySelector("button").onclick=cerrarV;d.addEventListener("click",e=>{if(e.target===d)cerrarV()});d.addEventListener("close",()=>vEl.pause());
  document.addEventListener("click",e=>{const a=e.target.closest("[data-vid]");if(!a)return;e.preventDefault();e.stopImmediatePropagation();
    const v=CONFIG.videos[+a.dataset.vid];if(!v||!v.video)return;vEl.src=v.video;vEl.poster=v.img||"";d.showModal();vEl.play().catch(()=>{})},true);
})();

