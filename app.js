const express = require("express");
const mysql = require("mysql2");
const path = require("path");
const app = express();

app.use(express.static(path.join(__dirname, "public")));

const db = mysql.createConnection({
  host: "3.71.189.24",
  user: "root",
  password: "trapovejgulas",
  database: "CIT_WEB",
});

db.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err);
    return;
  }
  console.log("Connected to MySQL");
});

app.get("/api/posts", (req, res) => {
  db.query("SELECT * FROM posts", (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
