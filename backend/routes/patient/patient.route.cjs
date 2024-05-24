const handlePatient = require("../../controllers/patient/patient.controller.cjs");
const { Router } = require("express");
const router = Router();
router.route("/details/:regNumber").get(handlePatient.getPatientDetails);
router.route("/new-patient").post(handlePatient.newPatient);
router.route("/card/:id").get(handlePatient.getCard);
router.route("/current/:id").get(handlePatient.getPatient);
module.exports = router;
