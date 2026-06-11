

import "./src/config/tlsFix.js";

import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import resumeRoutes from "./src/routes/resumeRoutes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/resume", resumeRoutes);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server Running On ${PORT}`);
});