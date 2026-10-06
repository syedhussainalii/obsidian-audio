/* global process */

import express from "express";
import sqlite3 from "sqlite3";
import cors from "cors";

const app = express();
const PORT = Number(process.env.PORT) || 3001;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const DATABASE_PATH = process.env.DATABASE_PATH || "./newsletter.db";

// Middleware
app.use(cors());
app.use(express.json());

// Initialize SQLite Database
const db = new sqlite3.Database(DATABASE_PATH, (err) => {
  if (err) console.error("Database connection error:", err);
  else console.log("Connected to SQLite database.");
});

// Create Table if it doesn't exist
db.run(`
  CREATE TABLE IF NOT EXISTS subscribers (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE NOT NULL,
    subscribed_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

// API Endpoint to handle subscriptions
app.post("/api/subscribe", (req, res) => {
  const email = typeof req.body?.email === "string" ? req.body.email.trim().toLowerCase() : "";

  if (!EMAIL_PATTERN.test(email)) {
    return res.status(400).json({ code: "INVALID_EMAIL", error: "Enter a valid email address." });
  }

  const query = `INSERT INTO subscribers (email) VALUES (?)`;

  db.run(query, [email], function (err) {
    if (err) {
      if (err.message.includes("UNIQUE")) {
        return res.status(409).json({ code: "DUPLICATE_EMAIL", error: "This email is already subscribed." });
      }
      console.error("Newsletter insert error:", err);
      return res.status(500).json({ code: "DATABASE_ERROR", error: "We could not save your subscription." });
    }
    res.status(201).json({ success: true, message: "Welcome to Obsidian." });
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
