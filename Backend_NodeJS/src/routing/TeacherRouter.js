const express = require("express");
const router = express.Router();

const TeacherController = require("../controllers/TeacherController");

router.post("/signup", TeacherController.signup);
router.post("/login", TeacherController.login);

module.exports = router;
