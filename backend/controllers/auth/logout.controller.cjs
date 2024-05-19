const Users = require("../../models/auth/Users.cjs");
const handleLogout = async (req, res) => {
  const cookie = req.cookies;
  if (!cookie?.jwt) {
    res.sendStatus(204);
  } else {
    const refreshToken = cookie.jwt;
    const tokenBearer = await Users.findOne({
      refreshToken: { token: refreshToken },
    }).exec();
    if (!tokenBearer) {
      res.clearCookie("jwt", { httpOnly: true });
      res.sendStatus(204);
    } else {
      tokenBearer.token = "";
      await tokenBearer.save();
      res.clearCookie("jwt", { httpOnly: true });
      res.sendStatus(204);
    }
  }
};

module.exports = { handleLogout };
