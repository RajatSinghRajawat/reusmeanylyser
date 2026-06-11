import express from "express";
import { 
  analyzeResume, 
  generateCoverLetter, 
  generateInterviewPrep 
} from "../controller/resumeController.js";
import upload from "../middleware/upload.js";

const router = express.Router();

// Core resume analysis endpoint (supports file upload and optional JD)
router.post(
  "/analyze",
  upload.single("resume"),
  analyzeResume
);

// On-demand cover letter generator (takes cached resumeText and jobDescription)
router.post(
  "/cover-letter",
  generateCoverLetter
);

// On-demand mock interview question coach (takes cached resumeText and jobDescription)
router.post(
  "/interview-prep",
  generateInterviewPrep
);

export default router;