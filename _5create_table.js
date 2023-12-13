//ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'ybybbyby';

var mysql = require("mysql");
var con = mysql.createConnection({
  host: "localhost",  user: "root",  password: "ybybbyby",  database: "mydb",
});

con.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
  con.query(
    "CREATE TABLE t1( roll int(4) primary key,name varchar(20),email varchar(30));",
    function (err, result) {
      if (err) throw err;
      console.log("Table created");
    }
  );
});
