const http = require("http");
const fs = require("fs");
const url = require("url");
const qs = require("querystring");
var mysql = require("mysql");
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "ybybbyby",
  database: "mydb",
});

function runsql(q) {
  con.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
    con.query(q, function (err, result) {
      if (err) throw err;
      console.log("Done");
    });
  });
}

http
  .createServer(function (req, res) {
    // let path = url.parse(req.url, true);
    let display = "";
    if (req.url === "/") {
      fs.readFile("sample.html", (err, data) => {
        res.writeHead(200, { "Content-Type": "text/html" });
        console.log(req.url);
        res.write(data);
        res.end();
      });
    } else if (req.url.startsWith("/find") && req.method == "GET") {
      let data;
      // data = qs.parse(req.url);
      data = url.parse(req.url,true).query;
      console.log(data);
      var strr = "SELECT * FROM t1 where roll = " + data["roll"] + ";";
      console.log(strr);
      res.writeHead(200, { "Content-Type": "text/html" });
      con.connect(function (err) {
        if (err) throw err;
        con.query(strr, function (err, result, fields) {
          if (err) throw err;
          if (result.length >0){
              display = "<h1>Found : "+result[0].name + "<br>Email : "+result[0].email+"</h1>";
          }
          else{
            display = "<h1>Not Found</h1>";
          }
          console.log(display);
          res.write(display);
          res.end();
        });
    });
    } else if (req.url === "/insert" && req.method == "POST") {
      let raw_data = "";
      let data;

      req
        .on("data", (data) => (raw_data += data))
        .on("end", () => {
          data = qs.parse(raw_data);
          console.log(data);
          var strr =
            " INSERT into t1 values ('" +
            data["roll"] +
            "','" +
            data["name"] +
            "','" +
            data["email"] +
            "');";
          console.log(strr);
          runsql(strr);
        });
      res.writeHead(200, { "Content-Type": "text/html" });
      res.write("Form submitted");
      res.end();
    } else {
      res.writeHead(404, { "Content-Type": "text/html" });
      res.end("Page not found");
    }
  })
  .listen(3000);
console.log("Server is listening on port 3000...");
