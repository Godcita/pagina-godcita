// ===== la página se va armando con el scroll =====
(function(){
  if(matchMedia("(prefers-reduced-motion: reduce)").matches||!("IntersectionObserver" in window))return;
  const SEL=[".club-tit",".solapas",".hc-main",".hc-card",".en-godcita",".mod-musica",".mod-pc",".rev-cab",".rev-grid > *",".k-card",
    ".cap-txt",".cap-arte",".cap-dato",".cabeza",".sub-h",".sub-p","main > section.bloque .panel","main > section.bloque .tile",".nota",".novedades-lista li",
    ".video",".juego",".fan",".kit > *",".q-card",".hub-card","footer .wrap > *"].join(",");
  const FUERA=".buscador,.guia,.sonando .panel,.panel .panel,.tabbar,.barra";
  document.documentElement.classList.add("anim");
  let lote=[],pend=false;
  const io=new IntersectionObserver(es=>{
    es.forEach(e=>{if(e.isIntersecting){lote.push(e.target);io.unobserve(e.target)}});
    if(!pend&&lote.length){pend=true;requestAnimationFrame(()=>{
      // los que entran juntos se arman en cascada, de arriba hacia abajo y de izquierda a derecha
      lote.sort((a,b)=>{const ra=a.getBoundingClientRect(),rb=b.getBoundingClientRect();return Math.round(ra.top/40)-Math.round(rb.top/40)||ra.left-rb.left});
      lote.forEach((el,i)=>{el.style.setProperty("--d",Math.min(i,7)*70+"ms");el.classList.add("visto");
        el.addEventListener("animationend",()=>{el.style.removeProperty("--d")},{once:true})});
      lote=[];pend=false})}
  },{rootMargin:"0px 0px -8% 0px",threshold:0});
  const preparar=raiz=>{(raiz.matches&&raiz.matches(SEL)?[raiz]:[]).concat([...(raiz.querySelectorAll?raiz.querySelectorAll(SEL):[])]).forEach(el=>{
    if(el.classList.contains("revela")||el.closest(FUERA))return;el.classList.add("revela");io.observe(el)})};
  preparar(document);
  // lo que se dibuja después (videos, notas, reseñas, rankings…) también se arma al aparecer
  let nuevos=[];new MutationObserver(ms=>{ms.forEach(m=>m.addedNodes.forEach(n=>{if(n.nodeType===1)nuevos.push(n)}));
    if(nuevos.length){const ns=nuevos;nuevos=[];requestAnimationFrame(()=>ns.forEach(preparar))}}).observe(document.querySelector("main"),{childList:true,subtree:true});
})();

