import express from "express";
import db from "../db.js";
import verifyToken from "../utils/authMiddleware.js"; 

const router = express.Router();


// GET HERO
router.get("/", async (req, res) => {
  try {

    const result = await db.query(
      "SELECT * FROM hero LIMIT 1"
    );

    res.json(result.rows[0]);

  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed" });
  }
});


// UPDATE HERO
router.put("/", verifyToken, async (req, res) => {

  const {
    name,
    tagline1,
    tagline2,
    roles,
    cta_text,
  } = req.body;

  try {

    const result = await db.query(
      `
      UPDATE hero
      SET
        name=$1,
        tagline1=$2,
        tagline2=$3,
        roles=$4,
        cta_text=$5
      WHERE id=1
      RETURNING *
      `,
      [
        name,
        tagline1,
        tagline2,
        roles,
        cta_text,
      ]
    );

    res.json(result.rows[0]);

  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed" });
  }
});

export default router;