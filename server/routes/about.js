import express from "express";
import db from "../db.js";
import verifyToken from "../utils/authMiddleware.js";

const router = express.Router();


// GET (public)
router.get("/", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM about LIMIT 1");
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});


// UPDATE (protected)
router.put("/", verifyToken, async (req, res) => {
  const { intro, description, resume_url } = req.body;

  try {
    const result = await db.query(
      `UPDATE about SET intro=$1, description=$2, resume_url=$3 WHERE id=1 RETURNING *`,
      [intro, description, resume_url]
    );

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

export default router;