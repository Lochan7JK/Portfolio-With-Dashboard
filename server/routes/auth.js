import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import db from "../db.js";
import verifyToken from "../utils/authMiddleware.js";

import { OAuth2Client } from "google-auth-library";

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const router = express.Router();


//SignUp API
router.post("/signup", async (req, res) => {
    
  if (!req.body) {
    return res.status(400).json({ message: "Body is missing" });
  }

  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "All fields required" });
  }

  try {
    const userExists = await db.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );

    if (userExists.rows.length > 0) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await db.query(
      "INSERT INTO users (name, email, password_hash) VALUES ($1, $2, $3)",
      [name, email, hashedPassword]
    );

    res.json({ message: "User registered successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
});



//Login API 
router.post("/login", async (req, res) => {

  if (!req.body) {
    return res.status(400).json({ message: "Body is missing" });
  }

  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "All fields required" });
  }

  try {

    console.log("Login attempt:", email);

    const user = await db.query(
        "SELECT * FROM users WHERE LOWER(email) = LOWER($1)",
        [email]
    );

    // console.log("User found:", user.rows);

    if (user.rows.length === 0) {
      return res.status(401).json({ message: "Invalid credentials - email" });
    }


    // console.log("Entered password:", password);
    // console.log("Stored hash:", user.rows[0]?.password_hash);

    const validPassword = await bcrypt.compare(
        password,
        user.rows[0].password_hash
    );

    // console.log("Password match:", validPassword);


    if (!validPassword) {
      return res.status(401).json({ message: "Invalid credentials - password" });
    }

    const token = jwt.sign(
      { userId: user.rows[0].id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({ token });

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
});

//Get current User API
// Frontend needs to know:
// 👉 "Am I logged in?"
router.get("/me", verifyToken, async (req, res) => {
  try {
    const user = await db.query(
      "SELECT id, name, email FROM users WHERE id = $1",
      [req.user.userId]
    );

    res.json(user.rows[0]);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});


// Google OAuth API Login Route
router.post("/google", async (req, res) => {

  try {

    const ticket = await client.verifyIdToken({
      idToken: req.body.credential,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();

    const email = payload.email;
    const name = payload.name;

    let user = await db.query(
      "SELECT * FROM users WHERE email=$1",
      [email]
    );

    if (user.rows.length === 0) {

      const newUser = await db.query(
        `
        INSERT INTO users
        (name, email, provider)
        VALUES ($1, $2, $3)
        RETURNING *
        `,
        [name, email, "google"]
      );

      user = newUser;
    }

    const token = jwt.sign(
      { userId: user.rows[0].id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({ token });

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Google auth failed" });
  }
});

export default router;