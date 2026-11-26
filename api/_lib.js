// Funciones compartidas (los archivos que empiezan con _ no son rutas en Vercel).
const crypto = require("crypto");

const TOPES = { trivia: 160, juego: 60 };   // kirbitos máximos por día y por persona
const COOKIE = "gk_sesion";

function hoyAR() { // fecha de hoy en Argentina (UTC-3)
  return new Date(Date.now() - 3 * 3600e3).toISOString().slice(0, 10);
}
function firmar(obj) {
  const datos = Buffer.from(JSON.stringify(obj)).toString("base64url");
  const firma = crypto.createHmac("sha256", process.env.SESSION_SECRET).update(datos).digest("base64url");
  return datos + "." + firma;
}
function verificar(token) {
  if (!token || !process.env.SESSION_SECRET) return null;
  const [datos, firma] = String(token).split(".");
  if (!datos || !firma) return null;
  const ok = crypto.createHmac("sha256", process.env.SESSION_SECRET).update(datos).digest("base64url");
  if (ok.length !== firma.length || !crypto.timingSafeEqual(Buffer.from(ok), Buffer.from(firma))) return null;
  try { const o = JSON.parse(Buffer.from(datos, "base64url").toString()); return o.exp > Date.now() ? o : null; } catch { return null; }
}
function leerCookies(req) {
  const out = {};
  (req.headers.cookie || "").split(";").forEach(c => { const i = c.indexOf("="); if (i > 0) out[c.slice(0, i).trim()] = decodeURIComponent(c.slice(i + 1).trim()); });
  return out;
}
function sesion(req) { return verificar(leerCookies(req)[COOKIE]); }
function cookie(nombre, valor, maxAge) {
  return `${nombre}=${encodeURIComponent(valor)}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=${maxAge}`;
}
function base(req) {
  if (process.env.PUBLIC_URL) return process.env.PUBLIC_URL.replace(/\/$/, "");
  return "https://" + req.headers.host;
}
async function redis(...cmd) { // Upstash Redis por REST (lo crea Vercel → Storage)
  const url = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
  const tok = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !tok) throw new Error("Falta conectar la base de datos (Upstash) en Vercel");
  const r = await fetch(url, { method: "POST", headers: { Authorization: "Bearer " + tok, "Content-Type": "application/json" }, body: JSON.stringify(cmd) });
  const j = await r.json();
  if (j.error) throw new Error("Redis: " + j.error);
  return j.result;
}
async function sumarStreamElements(usuario, cantidad) {
  const ch = process.env.SE_CHANNEL_ID, jwt = process.env.SE_JWT;
  if (!ch || !jwt) throw new Error("Faltan SE_CHANNEL_ID / SE_JWT en Vercel");
  const r = await fetch(`https://api.streamelements.com/kappa/v2/points/${encodeURIComponent(ch)}/${encodeURIComponent(usuario)}/${cantidad}`,
    { method: "PUT", headers: { Authorization: "Bearer " + jwt, Accept: "application/json" } });
  if (!r.ok) throw new Error("StreamElements respondió " + r.status);
  return r.json().catch(() => ({}));
}
function json(res, status, obj) {
  res.statusCode = status; res.setHeader("Content-Type", "application/json; charset=utf-8"); res.setHeader("Cache-Control", "no-store");
  res.end(JSON.stringify(obj));
}
module.exports = { TOPES, COOKIE, hoyAR, firmar, verificar, sesion, cookie, base, redis, sumarStreamElements, json, leerCookies };
