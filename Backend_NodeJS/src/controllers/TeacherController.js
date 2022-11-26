const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const Teacher = require("../models/Teacher");

// create normal token
const createToken = (email) => {
  const token = jwt.sign({ email }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
  return token;
};

// check for password match
const checkPassword = async (inputPassword, databasePassword) => {
  // inputPassword:- password entered by user during logIn
  // databasePassword:- password entered by user during signUp
  return await bcrypt.compare(inputPassword, databasePassword);
};

// request handler function
exports.signup = async (req, res, next) => {
  try {
    const { email, password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
      return res.status(501).json({
        status: "error",
        message: "Password are not same!!",
      });
    }
    const teacher = await Teacher.findOne({
      where: {
        email: email,
      },
    });
    console.log("teacher",teacher);
    if (teacher) {
      return res.status(400).json({
        status: "error",
        message: "Teacher already registered",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    const newTeacher = {
      email,
      password: hashedPassword,
    };

    // in sql
    let data = await Teacher.create(newTeacher);
    console.log(data);

    newTeacher.password = undefined;
    return res.status(200).json({
      status: "success",
      message: "Teacher Registered Successfully",
      data: newTeacher,
    });
  } catch (e) {
    console.log(e);
    return res.status(501).json({
      status: "error",
      message: "Some Error Occurred!! Please try again later",
    });
  }
};

// login
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    // if no email or password is given
    if (!email || !password) {
      return res.status(400).json({
        status: "error",
        message: "Please provide email or password",
      });
    }

    // check if user with this emailId is present or not
    const teacher = await Teacher.findOne({
      where: {
        email: email,
      },
    });
    console.log("teacher",teacher);
    if (!teacher) {
      return res.status(401).json({
        status: "error",
        message: "Invalid email or password!!",
      });
    }

    console.log(password, teacher.password);
    // if user present, check for password
    if (!(await checkPassword(password, teacher.password))) {
      return res.status(401).json({
        status: "error",
        message:
          "Invalid email or password!!.Please enter Valid email and Password",
      });
    }

    // if everything is ok then login user by giving token to user
    const token = createToken(teacher.email);

    // set cookie
    res.cookie("jwt", token, {
      expires: new Date(
        Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
      ),
      httpOnly: true,
    });

    res.status(200).json({
      status: "success",
      token,
      email: teacher.email,
    });
  } catch (e) {
    console.log(e);
    return res.status(501).json({
      status: "error",
      message: "Some Error Occurred!! Please try again later",
    });
  }
};
