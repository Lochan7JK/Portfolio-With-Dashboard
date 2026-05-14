import { Resend } from "resend";
import dotenv from "dotenv";

dotenv.config();

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendEmail = async ({ name, email, phone, message, subject }) => {
  try {
    await resend.emails.send({
      from: "onboarding@resend.dev", // default sender (for testing)
      to: process.env.EMAIL_USER || "lochansingoria@gmail.com",
      reply_to: email, // 🔥 THIS IS POWERFUL
      subject: `New Portfolio Contact Message 🚀: ${subject}`,
      html: `
        <h2>New Message from Portfolio</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || "Not provided"}</p>
        <p><strong>Subject:</strong> ${subject}</p>

        <p><strong>Message:</strong> </p>
        <p>${message}</p>
      `,
    });
  } catch (error) {
    console.error("Email error:", error);
  }
};