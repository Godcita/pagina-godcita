(function(){
  const caja=document.querySelector("#tweets .x-caja");if(!caja)return;
  let cargado=false;
  function cargar(){
    if(cargado)return;cargado=true;
    const osc=getComputedStyle(document.documentElement).colorScheme.includes("dark");
    const a=caja.querySelector(".twitter-timeline");if(a&&osc)a.setAttribute("data-theme","dark");
    const s=document.createElement("script");s.src="https://platform.twitter.com/widgets.js";s.async=true;s.charset="utf-8";document.body.appendChild(s);
    setTimeout(()=>{if(!caja.querySelector("iframe")){const r=caja.querySelector(".x-respaldo");if(r)r.hidden=false;const l=caja.querySelector(".twitter-timeline");if(l)l.style.display="none";}},8000);
  }
  const ob=new IntersectionObserver(e=>{if(e.some(x=>x.isIntersecting)){cargar();ob.disconnect()}},{rootMargin:"300px"});ob.observe(caja);
})();

