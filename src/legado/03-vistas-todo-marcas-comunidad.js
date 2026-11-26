(function(){
  const rev=document.querySelector(".revista");
  const sync=()=>{document.body.dataset.vista=(rev&&rev.dataset.vista)||"todo"};
  if(rev){sync();new MutationObserver(sync).observe(rev,{attributes:true,attributeFilter:["data-vista"]})}
  // panel de rubros: va en "Por qué yo"
  let n=0;(function mover(){const r=document.getElementById("rubros-marca"),d=document.getElementById("porque");
    if(r&&d){d.querySelector(".wrap").appendChild(r)}else if(n++<40)setTimeout(mover,150)})();
})();

