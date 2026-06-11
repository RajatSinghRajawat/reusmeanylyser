import { generateResumeAnalysis } from "../services/geminiService.js";
import { buildAnalysisPrompt } from "../utils/analysisPrompt.js";
import { buildCoverLetterPrompt } from "../utils/coverLetterPrompt.js";
import { buildInterviewPrompt } from "../utils/interviewPrompt.js";
import { extractResumeText } from "../utils/extractText.js";
import { toClientGeminiError } from "../utils/geminiErrors.js";
import { parseAndValidateAnalysis } from "../utils/parseAiResponse.js";

const MAX_RESUME_CHARS = 28000;

/**
 * Controller to analyze a resume file (PDF/DOCX) optionally against a target Job Description.
 */
export const analyzeResume = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Please upload a resume (PDF or DOCX).",
        code: "FILE_REQUIRED",
      });
    }

    const { jobDescription } = req.body;

    let resumeText;
    try {
      resumeText = await extractResumeText(req.file);
    } catch (extractError) {
      console.error("Text extraction error:", extractError.message);
      return res.status(400).json({
        success: false,
        message: "Could not read this file. Upload a valid PDF or DOCX.",
        code: "EXTRACT_FAILED",
      });
    }

    const normalizedText = resumeText?.replace(/\s+/g, " ").trim();

    if (!normalizedText || normalizedText.length < 80) {
      return res.status(400).json({
        success: false,
        message:
          "Could not extract enough text from this PDF. Use a text-based PDF (not a scanned image).",
        code: "EMPTY_RESUME",
      });
    }

    // Build the tailored analysis prompt (supports optional Job Description)
    const prompt = buildAnalysisPrompt(
      normalizedText.slice(0, MAX_RESUME_CHARS),
      jobDescription
    );

    // Call the gemini fallback loop with JSON requirement
    const rawAiResponse = await generateResumeAnalysis(prompt, "application/json");

    // Validate the JSON structure
    const analysis = parseAndValidateAnalysis(rawAiResponse);

    return res.status(200).json({
      success: true,
      analysis,
      extractedText: normalizedText, // Cache in client state to avoid re-uploading
    });
  } catch (error) {
    console.error("Resume analysis error:", error.message);

    if (error.code === "AI_PARSE_ERROR" || error.code === "AI_INVALID_RESPONSE") {
      return res.status(502).json({
        success: false,
        message:
          "AI returned an invalid response. Please try again — results are usually fixed on retry.",
        retryable: true,
        code: error.code,
      });
    }

    if (error.code === "AI_EMPTY") {
      return res.status(502).json({
        success: false,
        message: "AI returned an empty response. Please try again.",
        retryable: true,
        code: error.code,
      });
    }

    const clientError = toClientGeminiError(error);

    return res.status(clientError.status).json({
      success: false,
      message: clientError.message,
      retryable: clientError.retryable,
      code: clientError.code,
    });
  }
};

/**
 * Controller to generate a highly tailored cover letter.
 */
export const generateCoverLetter = async (req, res) => {
  try {
    const { resumeText, jobDescription } = req.body;

    if (!resumeText?.trim() || !jobDescription?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Both resume text and target Job Description are required.",
        code: "FIELDS_REQUIRED",
      });
    }

    const prompt = buildCoverLetterPrompt(
      resumeText.slice(0, MAX_RESUME_CHARS),
      jobDescription
    );

    // Generate cover letter as clean markdown/text
    const coverLetterText = await generateResumeAnalysis(prompt, "text/plain");

    return res.status(200).json({
      success: true,
      coverLetter: coverLetterText,
    });
  } catch (error) {
    console.error("Cover letter generation error:", error.message);
    const clientError = toClientGeminiError(error);
    return res.status(clientError.status).json({
      success: false,
      message: clientError.message || "Failed to generate cover letter. Please try again.",
      code: clientError.code,
    });
  }
};

/**
 * Controller to generate highly customized interview prep questions and ideal answers.
 */
export const generateInterviewPrep = async (req, res) => {
  try {
    const { resumeText, jobDescription } = req.body;

    if (!resumeText?.trim() || !jobDescription?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Both resume text and target Job Description are required.",
        code: "FIELDS_REQUIRED",
      });
    }

    const prompt = buildInterviewPrompt(
      resumeText.slice(0, MAX_RESUME_CHARS),
      jobDescription
    );

    // Generate mock interview prep as structured JSON
    const rawAiResponse = await generateResumeAnalysis(prompt, "application/json");

    let interviewQuestions;
    try {
      interviewQuestions = JSON.parse(rawAiResponse);
      if (!Array.isArray(interviewQuestions)) {
        throw new Error("AI response was not an array");
      }
    } catch (parseError) {
      console.error("AI JSON parse error for interview prep:", parseError.message);
      return res.status(502).json({
        success: false,
        message: "AI returned an invalid response structure. Please try again.",
        code: "AI_PARSE_ERROR",
      });
    }

    return res.status(200).json({
      success: true,
      interviewQuestions,
    });
  } catch (error) {
    console.error("Interview prep error:", error.message);
    const clientError = toClientGeminiError(error);
    return res.status(clientError.status).json({
      success: false,
      message: clientError.message || "Failed to generate interview prep questions. Please try again.",
      code: clientError.code,
    });
  }
};
