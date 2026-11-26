// Twitch vuelve acá: confirmamos quién es y guardamos la sesión (30 días).
const { cookie, base, firmar, leerCookies } = require("./_lib");
module.exports = async (req, res) => {
  const url = new URL(req.url, base(req));
  const code = url.searchParams.get("code"), state = url.searchParams.get("state");
  const volver = (h) => { res.statusCode = 302; res.setHeader("Location", "/#jugar" + (h ? "?login=" + h : "")); res.end(); };
  if (!code || !state || state !== leerCookies(req).gk_state) return volver("error");
  try {
    const tok = await (await fetch("https://id.twitch.tv/oauth2/token", { method: "POST", body: new URLSearchParams({
      client_id: process.env.TWITCH_CLIENT_ID, client_secret: process.env.TWITCH_CLIENT_SECRET,
      code, grant_type: "authorization_code", redirect_uri: base(req) + "/api/callback" }) })).json();
    if (!tok.access_token) throw new Error("sin token");
    const u = (await (await fetch("https://api.twitch.tv/helix/users", { headers: { Authorization: "Bearer " + tok.access_token, "Client-Id": process.env.TWITCH_CLIENT_ID } })).json()).data?.[0];
    if (!u) throw new Error("sin usuario");
    const sesion = firmar({ id: u.id, login: u.login, nombre: u.display_name, exp: Date.now() + 30 * 864e5 });
    res.setHeader("Set-Cookie", [cookie("gk_sesion", sesion, 30 * 86400), cookie("gk_state", "", 0)]);
    volver("");
  } catch (e) { console.log("callback:", e.message); volver("error"); }
};
