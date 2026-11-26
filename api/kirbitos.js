// Suma kirbitos en StreamElements, respetando los topes diarios.
// POST { fuente: "juego" | "trivia", cantidad: número }
const { sesion, json, redis, hoyAR, TOPES, sumarStreamElements } = require("./_lib");
module.exports = async (req, res) => {
  if (req.method !== "POST") return json(res, 405, { error: "Usá POST" });
  const s = sesion(req);
  if (!s) return json(res, 401, { error: "Iniciá sesión con Twitch" });
  let body = req.body;
  if (typeof body === "string") { try { body = JSON.parse(body); } catch { body = {}; } }
  if (!body || typeof body !== "object") {
    body = await new Promise(r => { let d = ""; req.on("data", c => d += c); req.on("end", () => { try { r(JSON.parse(d)); } catch { r({}); } }); });
  }
  const fuente = body.fuente, pedido = Math.floor(Number(body.cantidad));
  if (!(fuente in TOPES) || !(pedido > 0)) return json(res, 400, { error: "Datos inválidos" });
  const key = `k:${s.id}:${hoyAR()}:${fuente}`;
  let otorgado = 0;
  try {
    if (fuente === "trivia") {
      const ok = await redis("SET", key, "1", "NX", "EX", 172800);
      if (ok !== "OK") return json(res, 200, { otorgado: 0, motivo: "La trivia suma una vez por día" });
      otorgado = Math.min(pedido, TOPES.trivia);
    } else {
      const nuevo = await redis("INCRBY", key, pedido);
      await redis("EXPIRE", key, 172800);
      otorgado = Math.max(0, pedido - Math.max(0, nuevo - TOPES.juego));
      if (otorgado < pedido) await redis("DECRBY", key, pedido - otorgado);
      if (!otorgado) return json(res, 200, { otorgado: 0, motivo: "Llegaste al tope de hoy" });
    }
    try { await sumarStreamElements(s.login, otorgado); }
    catch (e) { // si StreamElements falla, devolvemos el cupo
      if (fuente === "trivia") await redis("DEL", key); else await redis("DECRBY", key, otorgado);
      throw e;
    }
    json(res, 200, { otorgado, usuario: s.login });
  } catch (e) { console.log("kirbitos:", e.message); json(res, 500, { error: "No se pudieron sumar. Probá en un rato." }); }
};
