import express from "express";
import db from "../db.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {

    const totalVisitors = await db.query(
      "SELECT COUNT(*) FROM visitors"
    );

    const uniqueVisitors = await db.query(
      "SELECT COUNT(DISTINCT ip_address) FROM visitors"
    );

    const contacts = await db.query(
      "SELECT COUNT(*) FROM contacts"
    );

    const dailyVisitors = await db.query(`
      SELECT
      DATE(visited_at) as date,
      COUNT(*) as count
      FROM visitors
      GROUP BY DATE(visited_at)
      ORDER BY DATE(visited_at)
    `);

    res.json({
      totalVisitors: totalVisitors.rows[0].count,
      uniqueVisitors: uniqueVisitors.rows[0].count,
      contacts: contacts.rows[0].count,
      dailyVisitors: dailyVisitors.rows,
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error" });
  }
});

export default router;