import express from "express";
import db from "../db.js";
import verifyToken from "../utils/authMiddleware.js"; // ONLY FOR PROTECTED ROUTES

const router = express.Router();

//PUBLIC
router.get("/", async (req, res) => {
  try {
    const result = await db.query(
      "SELECT * FROM projects ORDER BY created_at DESC"
    );

    res.json(result.rows);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
});


//PROTECTED 
router.post("/", verifyToken, async (req, res) => {
  const {
    title,
    description,
    tech_stack,
    github_url,
    live_url,
    image_url,
  } = req.body;

  try {
    const result = await db.query(
      `INSERT INTO projects 
      (title, description, tech_stack, github_url, live_url, image_url)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *`,
      [title, description, tech_stack, github_url, live_url, image_url]
    );

    res.json(result.rows[0]);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
});


router.delete("/:id", verifyToken, async (req, res) => {
  const { id } = req.params;

  try {
    await db.query("DELETE FROM projects WHERE id = $1", [id]);
    res.json({ message: "Project deleted" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
});


router.put("/:id", verifyToken, async (req, res) => {
  const { id } = req.params;

  const {
    title,
    description,
    tech_stack,
    github_url,
    live_url,
    image_url,
  } = req.body;

  try {
    const result = await db.query(
      `UPDATE projects SET
        title = $1,
        description = $2,
        tech_stack = $3,
        github_url = $4,
        live_url = $5,
        image_url = $6
      WHERE id = $7
      RETURNING *`,
      [title, description, tech_stack, github_url, live_url, image_url, id]
    );

    res.json(result.rows[0]);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;