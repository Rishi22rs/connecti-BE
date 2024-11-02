var mysql = require("mysql");

var db = mysql.createConnection({
  host: "mysql-underrated.alwaysdata.net",
  user: "377818_connecti",
  database: "underrated_connecti",
  multipleStatements: true,
  password:"Helloconnecti@22"
});

db.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
});

module.exports = db;