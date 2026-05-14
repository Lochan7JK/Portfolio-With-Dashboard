import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import contactRoutes from "./routes/contact.js";
import authRoutes from "./routes/auth.js";
import testRoutes from "./routes/test.js";
import projectRoutes from "./routes/projects.js";
import aboutRoutes from "./routes/about.js";
import minorProjectsRoutes from "./routes/minorProjects.js";
import contactAdminRoutes from "./routes/contactAdmin.js";
import heroRoutes from "./routes/hero.js";
import socialRoutes from "./routes/socialLinks.js";
import trackVisitor from "./utils/trackVisitor.js";
import analyticsRoutes from "./routes/analytics.js";

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
// ✅ PUBLIC routes (NO middleware)
app.use("/api/contact", contactRoutes);
app.use("/auth", authRoutes);
app.use("/projects", projectRoutes);
app.use("/about", aboutRoutes);
app.use("/minor-projects", minorProjectsRoutes);
app.use("/hero", heroRoutes);
app.use("/social-links", socialRoutes);
app.use("/analytics", analyticsRoutes);


// ✅ PROTECTED routes only
app.use("/test", testRoutes); // this has verifyToken inside
app.use("/dashboard/contacts", contactAdminRoutes);


app.use(trackVisitor); // Track all visitors (should be last to avoid blocking routes)


// console.log("JWT_SECRET:", process.env.JWT_SECRET);

// Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
