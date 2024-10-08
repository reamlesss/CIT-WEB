const express = require("express");
const mysql = require("mysql2");
const path = require("path");
const os = require("os"); // Add the os module to retrieve the IP address
const app = express();

app.use(express.static(path.join(__dirname, "public")));

const db = mysql.createConnection({
  host: "localhost",
  user: "bloguser",
  password: "web",
  database: "CIT_WEB",
});

db.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err);
    return;
  }
  console.log("Connected to MySQL");
});

// Function to get the server's IP address
const getServerIP = () => {
  const ifaces = os.networkInterfaces();
  for (const iface of Object.values(ifaces)) {
    for (const config of iface) {
      if (config.family === "IPv4" && !config.internal) {
        return config.address;
      }
    }
  }
  return "localhost"; // Default fallback
};

app.get("/api/posts", (req, res) => {
  db.query("SELECT * FROM posts", (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});

// const port = 3000;
app.listen(3000, "0.0.0.0", () => {
  const serverIP = getServerIP();
  console.log(`Server running on http://${serverIP}:3000`);
});
