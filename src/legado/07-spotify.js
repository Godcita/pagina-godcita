(function(){
  const esc=s=>String(s==null?"":s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
  const okImg=s=>/^https:\/\//.test(s||"")?s:"";
  const yo=document.querySelector(".rev-main > .rev-seccion");
  const big=document.createElement("a");big.className="sonando quieta";big.href="#recomendaciones";big.dataset.reco="musica";
  big.setAttribute("aria-label","Lo que estoy escuchando en Spotify");
  const modM=document.getElementById("mod-musica");if(modM)modM.appendChild(big);else if(yo)yo.after(big);
  const ahF=document.getElementById("ah-musica"),ahT=document.getElementById("ah-musica-tit"),ahE=document.getElementById("ah-musica-est");
  const mini=document.createElement("a");mini.className="mini-musica quieta";mini.href="#recomendaciones";mini.dataset.reco="musica";mini.setAttribute("aria-label","Lo que estoy escuchando");
  const barra=document.querySelector(".barra .wrap");const ref=document.querySelector(".btn-buscar")||document.getElementById("vivo");
  // como en el diseño: lupa, separador y el reproductor
  const bb=document.querySelector(".btn-buscar");if(barra){if(bb)bb.after(mini);else barra.insertBefore(mini,ref)}
  let ultimo="";
  function pintar(){
    const M=window.MUSICA||{},a=M.ahora,top=M.top||[];
    const clave=a?a.nombre+"|"+a.artista+"|"+a.vivo+"|"+top.length:"vacio";
    if(clave===ultimo)return;ultimo=clave;
    if(ahF){ahF.classList.toggle("vivo",!!(a&&a.vivo));const ahC=ahF.closest(".en-godcita");if(ahC)ahC.classList.toggle("activo",!!(a&&a.vivo));ahE.textContent=a?(a.vivo?"Sonando ahora":"Lo último que escuché"):"Mi Spotify";ahT.textContent=a?a.nombre+" · "+a.artista:"Lo que estoy escuchando"}
    if(!a){big.innerHTML='<div class="tapa"><span class="nota-musical" aria-hidden="true">♪</span></div><div><span class="estado"><span class="eq-mini" aria-hidden="true"><i></i><i></i><i></i></span>Mi Spotify</span><div class="tema">Lo que estoy escuchando</div><div class="artista">Acá aparece en vivo la canción que suena en mi Spotify.</div></div>';mini.classList.remove("on");return}
    const img=okImg(a.img);
    big.classList.toggle("quieta",!a.vivo);mini.classList.toggle("quieta",!a.vivo);
    big.innerHTML=`<div class="tapa">${img?`<img src="${esc(img)}" alt="Portada de ${esc(a.nombre)}">`:'<span class="nota-musical" aria-hidden="true">♪</span>'}</div>
      <div><span class="estado"><span class="eq-mini" aria-hidden="true"><i></i><i></i><i></i></span>${a.vivo?"Sonando ahora en mi Spotify":"Lo último que escuché"}</span>
      <div class="tema">${esc(a.nombre)}</div><div class="artista">${esc(a.artista)}</div>
      ${top.length?`<ul class="top">${top.slice(0,3).map((x,i)=>`<li><b>#${i+1}</b>${esc(x.nombre)}</li>`).join("")}</ul>`:""}</div>`;
    mini.innerHTML=`<span class="sp-logo" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M6.6 9.4c3.6-1.1 7.6-.8 10.8 1M7.3 12.6c2.9-.8 6-.5 8.4.9M8 15.6c2.2-.6 4.5-.4 6.4.7" fill="none" stroke="#0E0B14" stroke-width="2" stroke-linecap="round"/></svg></span><span class="txt">${esc(a.nombre)}<small>${a.vivo?"Sonando ahora":"Lo último"} · ${esc(a.artista)}</small></span><span class="eq-mini" aria-hidden="true"><i></i><i></i><i></i></span>`;
    mini.classList.add("on");
  }
  pintar();setInterval(pintar,4000);
})();

