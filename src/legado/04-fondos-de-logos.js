(function(){
  // Cada logo lleva el color de su propio fondo (negro, violeta, blanco…), sin recortarlo
  const SEL=".exp .logo-e img,.marca .logo-m img,.evento .img img.logo-chico,.tile .mini-logos img,.bm-logos img,.caso .lg img";
  function pintar(img){
    const go=()=>{try{const c=document.createElement("canvas");c.width=c.height=8;const x=c.getContext("2d");
      x.drawImage(img,0,0,img.naturalWidth,img.naturalHeight,0,0,8,8);const d=x.getImageData(0,0,1,1).data;
      const col=d[3]<20?"transparent":`rgb(${d[0]},${d[1]},${d[2]})`;
      img.style.setProperty("--fondo-logo",col);img.classList.add("con-fondo");
      const box=img.closest(".evento .img,.logo-m");if(box){box.style.setProperty("--fondo-logo",col);if(box.classList.contains("logo-m"))box.classList.add("con-fondo-caja")}}catch(e){}};
    img.complete&&img.naturalWidth?go():img.addEventListener("load",go,{once:true})}
  const run=()=>document.querySelectorAll(SEL).forEach(i=>{if(!i.dataset.fondo){i.dataset.fondo=1;pintar(i)}});
  run();new MutationObserver(run).observe(document.body,{childList:true,subtree:true});
})();

