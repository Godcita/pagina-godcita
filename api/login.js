// Manda a la persona a iniciar sesión con Twitch.
const crypto = require("crypto");
const { cookie, base } = require("./_lib");
module.exports = (req, res) => {
  const state = crypto.randomBytes(16).toString("hex");
  const params = new URLSearchParams({
    client_id: process.env.TWITCH_CLIENT_ID || "", redirect_uri: base(req) + "/api/callback",
    response_type: "code", scope: "", state, force_verify: "false"
  });
  res.setHeader("Set-Cookie", cookie("gk_state", state, 600));
  res.statusCode = 302; res.setHeader("Location", "https://id.twitch.tv/oauth2/authorize?" + params); res.end();
};
