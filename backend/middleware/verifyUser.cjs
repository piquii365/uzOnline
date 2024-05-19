const jwt = require("jsonwebtoken");
const verifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader) {
    res.sendStatus(401);
  } else {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.SECRETE_ACCESS_TOKEN, (err, decoded) => {
      if (err) {
        res.sendStatus(403);
      } else {
        req.user = { userId: decoded.ID, username: decoded.username };
        console.log(req.user);
        next();
      }
    });
  }
};

module.exports = verifyToken;
