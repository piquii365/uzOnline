const { Router } = require("express");
const handleUser = require("../../controllers/auth/user.controller.cjs");
const router = Router();
router.route("/signup").post(handleUser.addNewUser);
router.route("/signin").post(handleUser.signUser);
module.exports = router;
