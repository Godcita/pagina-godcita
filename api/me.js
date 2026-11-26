// ¿Quién está conectado y cuánto ganó hoy?
const { sesion, json, redis, hoyAR, TOPES } = require("./_lib");
module.exports = async (req, res) => {
  const s = sesion(req);
  if (!s) return json(res, 200, { conectado: false });
  let hoy = { juego: 0, trivia: false };
  try {
    const [j, t] = await Promise.all([redis("GET", `k:${s.id}:${hoyAR()}:juego`), redis("GET", `k:${s.id}:${hoyAR()}:trivia`)]);
    hoy = { juego: +j || 0, trivia: !!t };
  } catch (e) { console.log("me:", e.message); }
  json(res, 200, { conectado: true, usuario: s.login, nombre: s.nombre, hoy, topes: TOPES });
};
