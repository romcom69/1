//ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'ybybbyby';




var mysql = require("mysql");
var con = mysql.createConnection({
  host: "localhost",  user: "root",  password: "ybybbyby",
  database: "mydb",
});

con.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
  con.query(
    "Insert into t1 values (4130,'Ayushi','ayushi@gmail.com');",
    function (err, result) {
      if (err) throw err;
      console.log(result.affectedRows + " rows inserted");
    }
  );
});

