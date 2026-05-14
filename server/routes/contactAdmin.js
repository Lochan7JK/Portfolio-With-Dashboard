import express from "express";
import db from "../db.js";
import verifyToken from "../utils/authMiddleware.js";

const router = express.Router();


// GET ALL CONTACTS
router.get("/", verifyToken, async (req, res) => {
  try {
    const contacts = await db.query(
      ` SELECT * FROM contacts ORDER BY created_at DESC`
    );

    res.json(contacts.rows);

  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: "Server error",
    });
  }
});


// MARK AS READ
router.put("/:id/read", verifyToken, async (req, res) => {
  try {

    await db.query(
      ` UPDATE contacts SET is_read = true WHERE id = $1`,
      [req.params.id]
    );

    res.json({
      message: "Marked as read",
    });

  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: "Server error",
    });
  }
});


// DELETE MESSAGE
router.delete("/:id", verifyToken, async (req, res) => {
  try {

    await db.query(
      ` DELETE FROM contacts WHERE id = $1`,
      [req.params.id]
    );

    res.json({
      message: "Message deleted",
    });

  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: "Server error",
    });
  }
});


// TOGGLE STAR
router.put("/:id/star", verifyToken, async (req, res) => {
  try {

    const existing = await db.query(
      "SELECT starred FROM contacts WHERE id = $1",
      [req.params.id]
    );

    const current = existing.rows[0].starred;

    await db.query(
      "UPDATE contacts SET starred = $1 WHERE id = $2",
      [!current, req.params.id]
    );

    res.json({ message: "Star updated" });

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;