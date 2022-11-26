const Sequelize = require("sequelize");
const fs  = require('fs')

// const sequelize = new Sequelize("school", "root", "root", {
//   host: "localhost",
//   dialect: "mysql",
//   operatorAliases: false,
// });
// var conn = mysql.createConnection({
//   host: "azuremysql11.mysql.database.azure.com",
//   user: "myserver",
//   password: "{your_password}",
//   database: "{your_database}",
//   port: 3306,
//   ssl: { ca: fs.readFileSync("{ca-cert filename}") },
// });
const sequelize = new Sequelize("school", "myserver", "Paras@123", {
  host: "azuremysql11.mysql.database.azure.com",
  dialect: "mysql",
  port: 3306,
  ssl: { ca: fs.readFileSync("DigiCertGlobalRootCA.crt.pem") },
  pool: {
    max: 5,
    min: 0,
    idle: 10000,
  },
  dialectOptions: {
    encrypt: true,
  },
});
sequelize
  .authenticate()
  .then(() => {
    console.log("Connection to the database has been established successfully.");
  })
  .catch((error) => {
    console.error("Unable to connect to the database: ", error);
  });
module.exports = sequelize;
global.sequelize = sequelize;
