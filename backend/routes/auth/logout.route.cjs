const { Router } = require("express");
const handleLogout = require("../../controllers/auth/logout.controller.cjs");
const router = Router();
router.route("/logout").get(handleLogout.handleLogout);
module.exports = router;
