import express from "express";
import verifyToken from "../utils/authMiddleware.js";

const router = express.Router();

router.get("/protected", verifyToken, (req, res) => {
  res.json({
    message: "Protected route accessed",
    user: req.user
  });
});

router.post("/add", verifyToken, async (req, res) => {
  const userId = req.user.userId;

  const user = await db.query(
    "SELECT email FROM users WHERE id = $1",
    [userId]
  );

  if (user.rows[0].email !== "lochansingoria@example.com") {
    return res.status(403).json({ message: "Access denied" });
  }

  // continue logic
});

export default router;