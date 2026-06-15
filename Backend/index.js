

import "./src/config/tlsFix.js";

import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./src/config/db.js";

import authRoutes from "./src/routes/auth.routes.js";
import adminRoutes from "./src/routes/admin.routes.js";
import contactRoutes from "./src/routes/contact.routes.js";
import portfolioRoutes from "./src/routes/portfolio.routes.js";
import resumeRoutes from "./src/routes/resumeRoutes.js";

dotenv.config();

// Connect to Database
connectDB().catch(err => {
  console.error("Failed to connect to MongoDB:", err.message);
});

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/portfolio", portfolioRoutes);
app.use("/api/resume", resumeRoutes);

// Global error handler
app.use((err, req, res, next) => {
  console.error("Error Status:", err.status || 500);
  console.error("Error Message:", err.message);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error"
  });
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server Running On ${PORT}`);
});