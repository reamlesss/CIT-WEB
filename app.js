const express = require("express");
const mysql = require("mysql2");
const path = require("path");
const app = express();

app.use(express.static(path.join(__dirname, "public")));

const db = mysql.createConnection({
  host: "websitedb.cpo226aaml1h.eu-central-1.rds.amazonaws.com",
  user: "admin",
  password: "matejvojtisek",
  database: "CIT_WEB",
});

db.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err);
    return;
  }
  console.log("Connected to MySQL");
});

app.get("/posts", (req, res) => {
  console.log("Post request received");
  db.query("SELECT * FROM posts", (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});

// const port = 3000;
app.listen(3000, "0.0.0.0", () => {
  // const serverIP = getServerIP();
  console.log(`Server running on http://3.71.189.24:3000/`);
});
