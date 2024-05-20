const { Router } = require("express");
const handleProfile = require("../../controllers/profile/profile.controller.cjs");
const router = Router();
router.route("/:id/profile").get(handleProfile.getProfile);
module.exports = router;
