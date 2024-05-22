const { Router } = require("express");
const handleUser = require("../../controllers/auth/user.controller.cjs");
const router = Router();
router.route("/register").post(handleUser.addNewUser);
router.route("/signin").post(handleUser.signUser);
router.route("/student").get(handleUser.getStudent);
module.exports = router;
