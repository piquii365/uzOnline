const { Router } = require("express");
const Refresh = require("../../controllers/auth/refreshTokenController.cjs");
const router = Router();
router.route("/refresh").get(Refresh.handleRefreshToken);
module.exports = router;
