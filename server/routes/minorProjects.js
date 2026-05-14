import express from "express";
import db from "../db.js";
import verifyToken from "../utils/authMiddleware.js";

const router = express.Router();


// GET ALL (public)
router.get("/", async (req, res) => {
  try {
    const result = await db.query(
      "SELECT * FROM minor_projects ORDER BY id DESC"
    );

    res.json(result.rows);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
});


// ADD
router.post("/", verifyToken, async (req, res) => {
  const { title, description, image_url, live_url } = req.body;

  try {
    const result = await db.query(
      `INSERT INTO minor_projects
      (title, description, image_url, live_url)
      VALUES ($1, $2, $3, $4)
      RETURNING *`,
      [title, description, image_url, live_url]
    );

    res.json(result.rows[0]);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
});


// DELETE
router.delete("/:id", verifyToken, async (req, res) => {
  try {
    await db.query(
      "DELETE FROM minor_projects WHERE id=$1",
      [req.params.id]
    );

    res.json({ message: "Deleted" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
});


// UPDATE
router.put("/:id", verifyToken, async (req, res) => {
  const { title, description, image_url, live_url } = req.body;

  try {
    const result = await db.query(
      `UPDATE minor_projects
      SET title=$1, description=$2, image_url=$3, live_url=$4
      WHERE id=$5
      RETURNING *`,
      [title, description, image_url, live_url, req.params.id]
    );

    res.json(result.rows[0]);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;