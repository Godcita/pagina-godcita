// Robot de métricas de la página de Godcita.
// Corre solo una vez por semana (GitHub Actions) y guarda los números en stats.json.
import { readFile, writeFile } from "node:fs/promises";

const TWITCH_LOGIN = "godcita_";
const ARCHIVO = "stats.json";

async function leerAnterior() {
  try { return JSON.parse(await readFile(ARCHIVO, "utf8")); }
  catch { return { redes: {}, historial: [] }; }
}

async function twitchApi() {
  const id = process.env.TWITCH_CLIENT_ID, secret = process.env.TWITCH_CLIENT_SECRET;
  if (!id || !secret) return null;
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
  return { api, user };
}

// Con las muestras tomadas en vivo (cada 10 minutos) calcula los números de los últimos 30 días
function metricasEnVivo(muestras) {
  const desde = Date.now() - 30 * 864e5;
  const m = (muestras || []).filter(x => new Date(x.t) > desde);
  if (!m.length) return {};
  const suma = m.reduce((a, x) => a + x.v, 0);
  return {
    "Espectadores promedio": Math.round(suma / m.length),
    "Pico de espectadores": Math.max(...m.map(x => x.v)),
    "Horas emitidas (30 días)": Math.round(m.length * 10 / 60),
    "Horas vistas (30 días)": Math.round(suma * 10 / 60),
  };
}

async function twitch(anterior) {
  const T = await twitchApi();
  if (!T) { console.log("Twitch: faltan los secretos, lo salteo."); return null; }
  const { api, user } = T;
  const seg = await api("channels/followers?first=1&broadcaster_id=" + user.id);
  const vivo = (await api("streams?user_id=" + user.id)).data.length > 0;
  const prev = anterior.redes?.twitch || {};
  const metricas = metricasEnVivo(prev.muestras);
  return { seguidores: seg.total, metricas, vivo, muestras: prev.muestras || [] };
}


// ---------- Instagram (API con inicio de sesión de Instagram) ----------
async function instagram(variable) {
  const token = process.env[variable];
  if (!token) { console.log(`Instagram: falta ${variable}, lo salteo.`); return null; }
  const G = "https://graph.instagram.com/";
  const api = async (ruta) => {
    const r = await fetch(G + ruta + (ruta.includes("?") ? "&" : "?") + "access_token=" + encodeURIComponent(token));
    const j = await r.json();
    if (j.error) throw new Error(j.error.message);
    return j;
  };
  const yo = await api("me?fields=user_id,username,followers_count,media_count");
  const desde = Date.now() - 30 * 864e5;
  const medios = (await api("me/media?fields=id,timestamp,like_count,comments_count,media_type&limit=50")).data || [];
  const recientes = medios.filter(m => new Date(m.timestamp) > desde);
  const inter = recientes.reduce((a, m) => a + (m.like_count || 0) + (m.comments_count || 0), 0);
  const tasa = recientes.length && yo.followers_count
    ? (inter / recientes.length / yo.followers_count * 100).toFixed(1).replace(".", ",") + "%" : null;
  const metricas = { "Interacciones": recientes.length ? inter : null, "Tasa de interacción": tasa };
  // métricas de cuenta (necesitan el permiso de estadísticas)
  try {
    const hasta = Math.floor(Date.now() / 1000), ini = hasta - 29 * 86400;
    const ins = await api(`${yo.user_id}/insights?metric=reach,views,profile_views,total_interactions&period=day&metric_type=total_value&since=${ini}&until=${hasta}`);
    const v = Object.fromEntries((ins.data || []).map(x => [x.name, x.total_value ? x.total_value.value : null]));
    if (v.views != null) metricas["Reproducciones (30 días)"] = v.views;
    if (v.reach != null) metricas["Cuentas alcanzadas"] = v.reach;
    if (v.profile_views != null) metricas["Visitas al perfil"] = v.profile_views;
    if (v.total_interactions != null) metricas["Interacciones"] = v.total_interactions;
    const vids = recientes.filter(m => m.media_type === "VIDEO").slice(0, 10);
    if (vids.length) {
      let tot = 0, n = 0;
      for (const m of vids) {
        try { const mi = await api(`${m.id}/insights?metric=views`); const val = mi.data?.[0]?.values?.[0]?.value ?? mi.data?.[0]?.total_value?.value; if (val != null) { tot += val; n++; } } catch {}
      }
      if (n) metricas["Vistas promedio por video"] = Math.round(tot / n);
    }
  } catch (e) { console.log(`Instagram ${yo.username} estadísticas:`, e.message); }
  // quién me ve (Instagram lo da con 100 seguidores o más)
  const audiencia = {};
  try {
    const dem = async (b) => (await api(`${yo.user_id}/insights?metric=follower_demographics&period=lifetime&metric_type=total_value&breakdown=${b}`)).data?.[0]?.total_value?.breakdowns?.[0]?.results || [];
    const gen = await dem("gender"); const tg = gen.reduce((a, x) => a + x.value, 0);
    if (tg) { const g = k => Math.round((gen.find(x => x.dimension_values[0] === k)?.value || 0) / tg * 100); audiencia.mujeres = g("F"); audiencia.hombres = g("M"); }
    const eda = await dem("age"); if (eda.length) audiencia.edad = eda.sort((a, b) => b.value - a.value)[0].dimension_values[0];
    const pai = await dem("country"); const tp = pai.reduce((a, x) => a + x.value, 0);
    if (tp) audiencia.argentina = Math.round((pai.find(x => x.dimension_values[0] === "AR")?.value || 0) / tp * 100);
  } catch (e) { console.log(`Instagram ${yo.username} audiencia:`, e.message); }
  // renovar el token para que no venza (necesita el secreto GH_PAT)
  if (process.env.GH_PAT) {
    try {
      const nuevo = await (await fetch(G + "refresh_access_token?grant_type=ig_refresh_token&access_token=" + encodeURIComponent(token))).json();
      if (nuevo.access_token) {
        const { execFileSync } = await import("node:child_process");
        execFileSync("gh", ["secret", "set", variable, "--body", nuevo.access_token], { env: { ...process.env, GH_TOKEN: process.env.GH_PAT } });
        console.log(`Instagram ${yo.username}: token renovado.`);
      }
    } catch (e) { console.log("No pude renovar el token:", e.message); }
  } else console.log("Instagram: sin GH_PAT, el token no se renueva solo (vence a los 60 días).");
  return { seguidores: yo.followers_count, metricas, audiencia: Object.keys(audiencia).length ? audiencia : undefined };
}

// ---------- Kick (datos públicos del canal, sin clave) ----------
const KICK_SLUG = "godcita";
async function kickCanal() {
  const r = await fetch("https://kick.com/api/v2/channels/" + KICK_SLUG, {
    headers: { "User-Agent": "Mozilla/5.0 (pagina-godcita)", Accept: "application/json" }
  });
  if (!r.ok) throw new Error("Kick respondió " + r.status);
  return r.json();
}
async function kick(anterior) {
  const c = await kickCanal();
  const prev = anterior.redes?.kick || {};
  return { seguidores: c.followers_count ?? c.followersCount ?? null, metricas: metricasEnVivo(prev.muestras),
           vivo: !!(c.livestream && c.livestream.is_live !== false), muestras: prev.muestras || [] };
}

const anterior = await leerAnterior();

if (process.env.MODO === "vivo") {
  // Kick: si estoy en vivo, anoto espectadores
  try {
    const c = await kickCanal(); const kv = c.livestream && c.livestream.is_live !== false ? c.livestream.viewer_count : null;
    const k = anterior.redes?.kick || {}; const desdeK = Date.now() - 30 * 864e5;
    if (kv != null) {
      k.muestras = [...(k.muestras || []).filter(x => new Date(x.t) > desdeK), { t: new Date().toISOString(), v: kv }];
      k.metricas = { ...(k.metricas || {}), ...metricasEnVivo(k.muestras) }; k.vivo = true;
      anterior.redes = { ...(anterior.redes || {}), kick: k };
      await writeFile(ARCHIVO, JSON.stringify(anterior, null, 2) + "\n"); console.log("Kick en vivo con", kv);
    } else if (k.vivo) { k.vivo = false; await writeFile(ARCHIVO, JSON.stringify(anterior, null, 2) + "\n"); }
  } catch (e) { console.log("Kick:", e.message); }
  const T = await twitchApi();
  if (!T) process.exit(0);
  const st = (await T.api("streams?user_id=" + T.user.id)).data[0];
  if (!st) {
    if (anterior.redes?.twitch?.vivo) { anterior.redes.twitch.vivo = false; await writeFile(ARCHIVO, JSON.stringify(anterior, null, 2) + "\n"); console.log("Terminó el directo."); }
    else console.log("No está en vivo, no anoto nada.");
    process.exit(0);
  }
  const tw = anterior.redes?.twitch || {};
  const desde = Date.now() - 30 * 864e5;
  tw.muestras = [...(tw.muestras || []).filter(x => new Date(x.t) > desde), { t: new Date().toISOString(), v: st.viewer_count }];
  tw.metricas = { ...(tw.metricas || {}), ...metricasEnVivo(tw.muestras) };
  tw.vivo = true;
  anterior.redes = { ...(anterior.redes || {}), twitch: tw };
  await writeFile(ARCHIVO, JSON.stringify(anterior, null, 2) + "\n");
  console.log("En vivo con", st.viewer_count, "espectadores. Anotado.");
  process.exit(0);
}
const redes = { ...anterior.redes };
for (const [nombre, fn] of Object.entries({
  twitch: () => twitch(anterior),
  kick: () => kick(anterior),
  instagram: () => instagram("IG_TOKEN_PRINCIPAL"),
  gg: () => instagram("IG_TOKEN_GAMING"),
})) {
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
