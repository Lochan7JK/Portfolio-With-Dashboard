import express from "express";
import db from "../db.js";
import verifyToken from "../utils/authMiddleware.js"; // ONLY FOR PROTECTED ROUTES

const router = express.Router();


// GET
router.get("/", async (req, res) => {

  try {

    const result = await db.query(
      "SELECT * FROM social_links"
    );

    res.json(result.rows);

  } catch (err) {
    console.log(err);
  }
});


// UPDATE
router.put("/:id", verifyToken, async (req, res) => {

  const { url, enabled } = req.body;

  try {

    const result = await db.query(
      `
      UPDATE social_links
      SET url=$1, enabled=$2
      WHERE id=$3
      RETURNING *
      `,
      [url, enabled, req.params.id]
    );

    res.json(result.rows[0]);

  } catch (err) {
    console.log(err);
  }
});

export default router;