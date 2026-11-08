// Robot de métricas de la página de Godcita.
// Corre solo una vez por semana (GitHub Actions) y guarda los números en stats.json.
import { readFile, writeFile } from "node:fs/promises";

const TWITCH_LOGIN = "godcita_";
const ARCHIVO = "stats.json";

async function leerAnterior() {
  try { return JSON.parse(await readFile(ARCHIVO, "utf8")); }
  catch { return { redes: {}, historial: [] }; }
}

async function twitch() {
  const id = process.env.TWITCH_CLIENT_ID, secret = process.env.TWITCH_CLIENT_SECRET;
  if (!id || !secret) { console.log("Twitch: faltan los secretos, lo salteo."); return null; }
  const tok = await (await fetch("https://id.twitch.tv/oauth2/token", {
    method: "POST",
    body: new URLSearchParams({ client_id: id, client_secret: secret, grant_type: "client_credentials" })
  })).json();
  if (!tok.access_token) throw new Error("Twitch no dio token: " + JSON.stringify(tok));
  const h = { "Client-Id": id, Authorization: "Bearer " + tok.access_token };
  const api = async (ruta) => {
    const r = await fetch("https://api.twitch.tv/helix/" + ruta, { headers: h });
    if (!r.ok) throw new Error(`Twitch ${ruta}: ${r.status} ${await r.text()}`);
    return r.json();
  };
  const user = (await api("users?login=" + TWITCH_LOGIN)).data[0];
  if (!user) throw new Error("No encontré el canal " + TWITCH_LOGIN);
  const seg = await api("channels/followers?first=1&broadcaster_id=" + user.id);
  // horas emitidas en los últimos 30 días (según los VODs guardados)
  let horas = null;
  try {
    const vids = (await api(`videos?user_id=${user.id}&type=archive&first=100`)).data;
    const desde = Date.now() - 30 * 864e5;
    const seg30 = vids.filter(v => new Date(v.created_at) > desde).reduce((a, v) => {
      const m = v.duration.match(/(?:(\d+)h)?(?:(\d+)m)?(?:(\d+)s)?/) || [];
      return a + (+m[1] || 0) * 3600 + (+m[2] || 0) * 60 + (+m[3] || 0);
    }, 0);
    horas = vids.length ? Math.round(seg30 / 3600) : null;
  } catch (e) { console.log("Twitch VODs:", e.message); }
  const vivo = (await api("streams?user_id=" + user.id)).data.length > 0;
  return { seguidores: seg.total, metricas: { "Horas emitidas (30 días)": horas }, vivo };
}

const anterior = await leerAnterior();
const redes = { ...anterior.redes };
for (const [nombre, fn] of Object.entries({ twitch })) {
  try { const d = await fn(); if (d) { redes[nombre] = d; console.log(nombre, d); } }
  catch (e) { console.log(`Error en ${nombre}:`, e.message); }
}

// historial mensual de la comunidad total (suma de seguidores de todas las redes)
const hoy = new Date().toISOString().slice(0, 10);
const total = Object.values(redes).reduce((a, r) => a + (r.seguidores || 0), 0);
const mes = hoy.slice(0, 7);
const historial = (anterior.historial || []).filter(x => x.mes !== mes);
historial.push({ mes, total });
historial.sort((a, b) => a.mes.localeCompare(b.mes));

await writeFile(ARCHIVO, JSON.stringify({ actualizado: hoy, redes, historial: historial.slice(-12) }, null, 2) + "\n");
console.log("Listo:", ARCHIVO);
