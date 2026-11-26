const { cookie } = require("./_lib");
module.exports = (req, res) => { res.setHeader("Set-Cookie", cookie("gk_sesion", "", 0)); res.statusCode = 302; res.setHeader("Location", "/#jugar"); res.end(); };
