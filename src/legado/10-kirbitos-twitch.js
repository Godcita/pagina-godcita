// ===== Kirbitos conectados a Twitch + StreamElements =====
(function(){
  const bar=document.getElementById("tw-bar"),txt=document.getElementById("tw-txt"),btn=document.getElementById("tw-btn");if(!bar)return;
  const e=s=>String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
  let yo=null;
  const toast=m=>{const t=document.getElementById("toast");if(!t)return;t.textContent=m;t.classList.add("ver");setTimeout(()=>{t.classList.remove("ver");t.textContent="Mail copiado"},3200)};
  function pintar(){
    if(!yo){bar.classList.remove("on");return}
    bar.classList.add("on");
    const quedan=Math.max(0,yo.topes.juego-yo.hoy.juego);
    txt.innerHTML=`<b>Conectada/o como ${e(yo.nombre)}</b><span>Tus kirbitos se suman solos al canal. Hoy te quedan ${quedan} del juego${yo.hoy.trivia?" y la trivia ya sumó":" y la trivia de hoy"}. Mirá tu saldo con !points.</span>`;
    btn.textContent="Salir";btn.href="/api/logout";
    const inp=document.getElementById("twitch-user");if(inp){inp.value=yo.usuario;inp.dispatchEvent(new Event("input"))}
    const canje=document.querySelector(".canje");if(canje)canje.hidden=true;
  }
  fetch("/api/me",{credentials:"same-origin"}).then(r=>r.ok?r.json():null).then(d=>{if(d&&d.conectado){yo=d;pintar()}}).catch(()=>{});
  if(/login=error/.test(location.hash))setTimeout(()=>toast("No se pudo conectar con Twitch. Probá de nuevo."),800);
  window.kirbitosSync=async(fuente,cantidad)=>{
    if(!yo||!(cantidad>0))return;
    try{const r=await fetch("/api/kirbitos",{method:"POST",credentials:"same-origin",headers:{"Content-Type":"application/json"},body:JSON.stringify({fuente,cantidad})});
      const d=await r.json();
      if(d.otorgado>0){toast(`+${d.otorgado} kirbitos sumados a tu cuenta de Twitch`);if(fuente==="juego")yo.hoy.juego+=d.otorgado;else yo.hoy.trivia=true;pintar()}
      else if(d.motivo)toast(d.motivo);
      else if(d.error)toast(d.error);
    }catch(_){toast("No se pudieron sumar ahora. Probá en un rato.")}
  };
})();

