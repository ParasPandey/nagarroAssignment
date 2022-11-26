const express = require("express");
const router = express.Router();

const StudentController = require("../controllers/StudentController")

router.post("/login", StudentController.login);
router.post("/addStudent",StudentController.addStudent);
router.get("/getStudent",StudentController.getStudent);
router.get("/allStudents",StudentController.allStudents);
router.patch("/updateStudent/:id",StudentController.updateStudent);
router.delete("/deleteStudent/:id",StudentController.deleteStudent);

module.exports = router;