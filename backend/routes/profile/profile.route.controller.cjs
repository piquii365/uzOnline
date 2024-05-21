const { Router } = require("express");
const handleProfile = require("../../controllers/profile/profile.controller.cjs");
const router = Router();
router.route("/:id/profile").get(handleProfile.getProfile);
router.route("/:id/special-conditions").get(handleProfile.getSpecialConditions);
router.route("/:id/medication").get(handleProfile.getMedication);
module.exports = router;
