const express = require("express");
const StudentRouter = require("./src/routing/StudentRouter");
const TeacherRouter = require("./src/routing/TeacherRouter");
const dotenv = require("dotenv");
const cors = require("cors");

const app = express();
app.use(cors());
// config .env file
dotenv.config({ path: "./config.env" });
app.use(express.json());
const port = 3000;

// DB Connection

require("./database");

// routes
app.use("/api/v1/student", StudentRouter);
app.use("/api/v1/teacher", TeacherRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
