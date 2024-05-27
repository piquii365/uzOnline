const { Router } = require("express");
const handleSchedule = require("../../controllers/schedule/schedule.controller.cjs");
const router = Router();
router.route("/doctor/:id/schedule").post(handleSchedule.addSchedule);
module.exports = router;
