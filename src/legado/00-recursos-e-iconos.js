const PORTADAS = {"valorant": "71e3ee96e3.jpg", "cs2": "7098430cf0.jpg", "bf6": "2a498a825f.jpg", "lol": "9d4f9f33dc.jpg", "sims": "6613f8df5b.jpg"};
const VIDEOS_LOCALES = {"arena": "66a234e3be.mp4"};
const FOTOS = {"visa": "03aad808e0.jpg", "eventoPG": "380f83c196.jpg", "pgCS": "9cc1cbd4ec.jpg", "aula1": "8b94a8bbcc.jpg", "aula2": "1bc94203c9.jpg", "aula3": "6f9badf73a.jpg", "aula4": "50a7e7f96c.jpg", "principal": "3a7ce87058.jpg", "padelPelota": "ea35d45b34.jpg", "padelMedallas": "a868d3921e.jpg", "padel": "f6e2828631.jpg", "setup": "93f350d0d1.jpg", "escritorio": "3fbf46f3f4.jpg"};
const LOGOS = {"procyon": "e4a67145ef.png", "rk": "6461cc24ea.png", "arena": "adfa132e77.png", "aula": "59db99df2a.png", "nuby": "30f4ec3dbd.jpg", "enc": "2b2ccc8248.png", "gamechangers": "ac43be8b09.png", "puntogamer": "d90f2447be.png"};
// ===== ÍCONOS (en vez de emojis). En HTML: <i data-ico="nombre"></i> · En JS: ico("nombre") =====
const ICONOS = {
  lugar:'<path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/>',
  edad:'<path d="M4 21h16M5 21v-7a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v7"/><path d="M5 16.5c1.2 0 1.8-1 3.5-1s2.3 1 3.5 1 1.8-1 3.5-1 2.3 1 3.5 1"/><path d="M12 12V8.5"/><path d="M12 4.5c.8.9 1.2 1.6 1.2 2.2a1.2 1.2 0 0 1-2.4 0c0-.6.4-1.3 1.2-2.2z"/>',
  signo:'<circle cx="7" cy="15.5" r="3"/><path d="M10 15.5c0-4-4-6-4-9.5a4 4 0 0 1 8 0c0 3.5-3 6.5-3 10a2.8 2.8 0 0 0 5.6.5"/>',
  estudio:'<path d="M4 20V4l16 16H4z"/><path d="M8 16v-3.5l3.5 3.5H8z"/><path d="M4 8h2M4 12h2"/>',
  equipo:'<path d="M7.5 7h9a4.5 4.5 0 0 1 4.4 5.4l-.9 4.4a2.3 2.3 0 0 1-4 1L14.5 16h-5L8 17.8a2.3 2.3 0 0 1-4-1l-.9-4.4A4.5 4.5 0 0 1 7.5 7z"/><path d="M8 10v3M6.5 11.5h3"/><circle cx="15.5" cy="11" r=".6" fill="currentColor"/><circle cx="17.2" cy="12.7" r=".6" fill="currentColor"/>',
  hola:'<path d="M18 11V6a2 2 0 0 0-4 0v5"/><path d="M14 10V4a2 2 0 0 0-4 0v6"/><path d="M10 10.5V6a2 2 0 0 0-4 0v8"/><path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.9-6-2.3l-3.6-3.6a2 2 0 0 1 2.8-2.8L7 15"/>',
  laburo:'<rect x="2.5" y="7" width="19" height="13.5" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/><path d="M2.5 13h19"/>',
  padel:'<circle cx="12" cy="12" r="9"/><path d="M5.7 5.6a9 9 0 0 1 0 12.8"/><path d="M18.3 5.6a9 9 0 0 0 0 12.8"/>',
  edicion:'<path d="M4 11h16v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-8z"/><path d="M4 11l-.9-3.4a1 1 0 0 1 .7-1.2l14.5-3.9a1 1 0 0 1 1.2.7L20.4 6 4 11z"/><path d="M8.3 5.4l3.1 3.1M13.6 4l3.1 3.1"/>',
  noche:'<path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/>',
  sol:'<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',
  lluvia:'<path d="M7 16a4 4 0 0 1-.6-7.96A6 6 0 0 1 18 8.5a3.8 3.8 0 0 1-.5 7.5H7z"/><path d="M8 19.5v1.5M12 19.5v1.5M16 19.5v1.5"/>',
  charla:'<path d="M21 11.5a8.4 8.4 0 0 1-12.3 7.4L3 21l2.1-5.7A8.5 8.5 0 1 1 21 11.5z"/>',
  candado:'<rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/>',
  medalla:'<path d="M8.2 10.6 5.5 3h4.2l2.3 4.5L14.3 3h4.2l-2.7 7.6"/><circle cx="12" cy="15.5" r="5.5"/><path d="M12 13.2v4.6"/>',
  guino:'<circle cx="12" cy="12" r="9"/><path d="M8 14.5s1.5 2 4 2 4-2 4-2"/><path d="M8 9.8h2.4"/><circle cx="15" cy="9.8" r=".9" fill="currentColor"/>',
  like:'<path d="M7 10v11"/><path d="M15 5.9 14 10h5.8a2 2 0 0 1 1.9 2.6l-2.3 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.8a2 2 0 0 0 1.8-1.1L12 2a3.1 3.1 0 0 1 3 3.9z"/>',
  dislike:'<g transform="rotate(180 12 12)"><path d="M7 10v11"/><path d="M15 5.9 14 10h5.8a2 2 0 0 1 1.9 2.6l-2.3 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.8a2 2 0 0 0 1.8-1.1L12 2a3.1 3.1 0 0 1 3 3.9z"/></g>',
  spotify:'<circle cx="12" cy="12" r="9.5"/><path d="M7.4 9.5c3.1-1 6.6-.7 9.3.9M8 12.6c2.5-.7 5.2-.5 7.3.8M8.7 15.4c1.9-.5 3.8-.3 5.4.6"/>',
  flecha:'<path d="M5 12h14M13 6l6 6-6 6"/>',
  ojo:'<path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',
  corazon:'<path d="M12 20s-7.5-4.6-9.2-9.3C1.6 7.4 3.8 4.5 7 4.5c2 0 3.6 1.1 5 3 1.4-1.9 3-3 5-3 3.2 0 5.4 2.9 4.2 6.2C19.5 15.4 12 20 12 20z"/>',
  compartir:'<path d="M7 17L17 7M9 7h8v8"/>',
  carrito:'<circle cx="9" cy="20" r="1.4"/><circle cx="18" cy="20" r="1.4"/><path d="M2 3h3l2.6 12.2a1.6 1.6 0 0 0 1.6 1.3h8.7a1.6 1.6 0 0 0 1.6-1.2L21 8H6"/>',
  play:'<path d="M8 5.5v13a1 1 0 0 0 1.5.9l10.4-6.5a1 1 0 0 0 0-1.8L9.5 4.6A1 1 0 0 0 8 5.5z" fill="currentColor"/>',
  fuego:'<path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.4-.5-2-1-3-1.1-2.1-.2-4 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.2.4-2.3 1-3 0 1.4 1 2.5 2.5 2.5z"/>'
};
function ico(n,cls=""){const p=ICONOS[n];return p?`<svg class="ico-svg ${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${p}</svg>`:""}

