import express from "express";
import db from "../db.js";
import { sendEmail } from "../utils/sendEmail.js";


const router = express.Router();


// POST /api/contact
router.post("/", async (req, res) => {
//   const { name, phone, email, message } = req.body;
  const { name, phone, email, subject, message } = req.body || {};
  //   console.log(req.body);
// Output:
// {
//   name: 'Lochan Singoria',
//   phone: '1234567890',
//   email: 'test@gmail.com',
//   message: 'This is a test message with more than 30 characters.'
//  ...
// }

  try {
    // 1️⃣ Save to DB
    const result = await db.query(
      "INSERT INTO contacts (name, phone, email, subject, message) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [name, phone || null, email, subject || "Portfolio Contact", message]
    );

    // 2️⃣ Send Email Using Resend
    await sendEmail({ name, phone, email, subject, message });

    // 3️⃣ Response
    res.status(201).json({
      success: true,
      data: result.rows[0],
      message: "Message sent successfully",
    });

  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
});

export default router;