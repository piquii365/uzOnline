const Users = require("../../models/auth/Users.cjs");
const jwt = require("jsonwebtoken");

const handleRefreshToken = async (req, res) => {
  const cookie = req.cookies;
  if (!cookie?.jwt) {
    res.sendStatus(401);
  } else {
    const refreshToken = cookie.jwt;

    const tokenBearer = await Users.find({
      refreshToken: { token: refreshToken },
    });
    if (!tokenBearer) {
      res.sendStatus(403);
    } else {
      jwt.verify(
        refreshToken,
        process.env.SECRETE_REFRESH_TOKEN,
        (err, decoded) => {
          if (err || decoded.ID !== decoded.ID) {
            res.sendStatus(403);
          } else {
            const payload = {
              username: decoded.username,
              ID: decoded.ID,
              role: decoded.role,
            };
            const accessToken = jwt.sign(
              payload,
              process.env.SECRETE_ACCESS_TOKEN,
              {
                expiresIn: "15m",
              }
            );
            res.json({ accessToken });
          }
        }
      );
    }
  }
};

module.exports = { handleRefreshToken };
