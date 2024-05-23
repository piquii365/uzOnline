const { Router } = require("express");
const handleAdmin = require("../../controllers/auth/admin.controller.cjs");
const router = Router();
router.route("/new-admin").post(handleAdmin.addAdmin);
router.route("/sign-admin").post(handleAdmin.signAdmin);
module.exports = router;
