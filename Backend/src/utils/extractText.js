import pdfParse from "pdf-parse/lib/pdf-parse.js";
import mammoth from "mammoth";

/**
 * Extract plain text from PDF (pdf-parse) or DOCX (mammoth).
 */
export const extractResumeText = async (file) => {
  if (!file?.buffer?.length) {
    throw new Error("Invalid file buffer");
  }

  let resumeText = "";

  if (file.mimetype === "application/pdf") {
    const data = await pdfParse(file.buffer, { max: 0 });
    resumeText = data?.text ?? "";
  } else if (
    file.mimetype ===
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
    file.originalname?.toLowerCase().endsWith(".docx")
  ) {
    const data = await mammoth.extractRawText({ buffer: file.buffer });
    resumeText = data?.value ?? "";
  } else {
    throw new Error("Unsupported file type. Use PDF or DOCX.");
  }

  return resumeText.replace(/\r\n/g, "\n").trim();
};
