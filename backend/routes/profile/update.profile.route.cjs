const { Router } = require("express");
const upload = require("../../middleware/multer.cjs");
const handleUpdate = require("../../controllers/profile/update.profile.controller.cjs");
const router = Router();
router
  .route("/:id/update/profile-photo")
  .put(upload.single("image"), handleUpdate.updateProfilePicture);

router.route("/:id/update/email").put(handleUpdate.updateEmail);
router.route("/:id/update/personal-info").put(handleUpdate.updatePersonalInfo);
router
  .route("/:id/update/specialCondition")
  .put(handleUpdate.updateSpecialConditions);
router.route("/:id/update/medication").put(handleUpdate.updateMedication);

module.exports = router;
