const handleStudent = require("../../controllers/student/student.controller.cjs");
const { Router } = require("express");
const router = Router();
router.route("/student-info").post(handleStudent.getStudentProfile);
module.exports = router;
