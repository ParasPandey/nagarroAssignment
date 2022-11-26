const Student = require("../models/Student");


// request handler function
exports.login = async (req, res) => {
  try {
    const { rollNo, dob } = req.body;
    const student = await Student.findOne({
      where: {
        rollNo,
        dob,
      },
    });
    if (!student) {
      return res.status(200).json({
        status: "error",
        message: "No Student Found",
      });
    }
    // send response to user
    return res.status(200).json({
      status: "success",
      message: "Student Login Successfully",
      student,
    });
  } catch (e) {
    console.log(e);
    return res.status(501).json({
      status: "error",
      message: "Some Error Occurred!! Please try again later",
    });
  }
};

// add a student record
exports.addStudent = async (req, res) => {
  try {
    const { rollNo, name, dob, score } = req.body;
    console.log(dob);
    const student = await Student.findOne({
      where: {
        rollNo: rollNo,
      },
    });

    console.log("student", student);
    if (student) {
      return res.status(400).json({
        status: "error",
        message: "Student already added",
      });
    }
    const newStudent = {
      name,
      rollNo,
      dob,
      score,
    };

    let data = await Student.create(newStudent);
    console.log(data);
    return res.status(200).json({
      status: "success",
      message: "Student added Successfully",
    });
  } catch (e) {
    console.log(e);
    return res.status(501).json({
      status: "error",
      message: "Some Error Occurred!! Please try again later",
    });
  }
};

exports.allStudents = async (req, res) => {
  try {
    const students = await Student.findAll({
      order: [[sequelize.literal("rollNo")]],
    });
    return res.status(200).json({
      status: "success",
      data: students,
    });
  } catch (e) {
    console.log(e);
    return res.status(501).json({
      status: "error",
      message: "Some Error Occurred!! Please try again later",
    });
  }
};

exports.getStudent = async (req, res) => {
  try {
    const { rollNo } = req.query;
    console.log(rollNo);
    const student = await Student.findOne({
      where: {
        rollNo,
      },
    });
    console.log(student);
    if (!student) {
      return res.status(200).json({
        status: "error",
        message: "No Student Found",
      });
    }
    return res.status(200).json({
      status: "success",
      data: student,
    });
  } catch (e) {
    console.log(e);
    return res.status(501).json({
      status: "error",
      message: "Some Error Occurred!! Please try again later",
    });
  }
};

exports.updateStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const { rollNo, name, dob, score } = req.body;
    const student = await Student.findOne({
      where: {
        rollNo: id,
      },
    });

    if (!student) {
      return res.status(200).json({
        status: "error",
        message: "No Student Found",
      });
    }

    await Student.update(
      { rollNo, name, dob, score },
      { where: { rollNo: id } }
    );
    return res.status(200).json({
      status: "success",
      message: "Student updated Successfully",
    });
  } catch (e) {
    console.log(e);
    return res.status(501).json({
      status: "error",
      message: "Some Error Occurred!! Please try again later",
    });
  }
};

exports.deleteStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const student = await Student.findOne({
      where: {
        rollNo: id,
      },
    });
    if (!student) {
      return res.status(200).json({
        status: "error",
        message: "No Student Found",
      });
    }
    await Student.destroy({
      where: {
        rollNo: id,
      },
    });
    return res.status(200).json({
      status: "success",
      message: "Student deleted Successfully",
    });
  } catch (e) {
    console.log(e);
    return res.status(501).json({
      status: "error",
      message: "Some Error Occurred!! Please try again later",
    });
  }
};
