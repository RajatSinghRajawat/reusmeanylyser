/**
 * Builds a structured, professional prompt for the Gemini API to perform
 * a detailed ATS analysis on a resume. Supports optional target Job Description comparison.
 * 
 * @param {string} resumeText - The parsed raw text of the resume.
 * @param {string} [jobDescription] - Optional target job description to match against.
 * @returns {string} The fully formed prompt string.
 */
export const buildAnalysisPrompt = (resumeText, jobDescription = "") => {
  const isJdPresent = Boolean(jobDescription?.trim());

  let prompt = `You are an expert ATS resume analyst and senior technical recruiter. 
Analyze the resume text provided below. Base your analysis strictly on the actual content present in the resume. Do not invent experience or skills.

`;

  if (isJdPresent) {
    prompt += `A target JOB DESCRIPTION is provided. Compare the resume directly against it:
JOB DESCRIPTION:
---
${jobDescription.trim()}
---

Perform a deep gap-analysis between the resume and this job description. Assess:
1. Target role alignment and experience compatibility.
2. Missing technical tools, libraries, frameworks, methodologies, or soft skills specified in the JD.
3. Keyword alignment between the resume and the JD.
4. ATS score representing how well this resume matches this specific role.
`;
  } else {
    prompt += `No job description is provided. Evaluate the resume against general technical industry standards, including:
1. General skill variety and technical keyword density.
2. Quantifiable impact (numbers, percentages, metrics) in experience and projects.
3. Clarity, formatting, and structural readability for Applicant Tracking Systems (ATS).
4. Use of strong action verbs and professional phrasing.
`;
  }

  prompt += `
Score the resume realistically on a scale of 0 to 100:
- 85–95: Exceptional resume. Exceptional match (if JD provided) or flawless technical presentation.
- 70–84: Strong resume. Good alignment with minor, easily addressable gaps.
- 55–69: Average resume. Missing key skills, weak project details, or lacks quantified impact.
- 40–54: Needs critical improvements in structure, clarity, or technology depth.
- Below 40: Severe deficiencies or nearly blank structure.

You MUST return ONLY a valid, parseable JSON object.
Do NOT wrap the response in markdown code blocks (\`\`\`json ... \`\`\`), do not include backticks, and do not append any intro or outro text.

Strict JSON Output Schema:
{
  "atsScore": 80,
  "strengths": ["bullet point 1", "bullet point 2"],
  "weaknesses": ["bullet point 1", "bullet point 2"],
  "improvements": ["bullet point 1", "bullet point 2"],
  "missingKeywords": ["keyword 1", "keyword 2"],
  "summary": "Professional summary sentence 1. Professional summary sentence 2."
}

Constraint Rules:
- "atsScore" MUST be an integer between 0 and 100.
- Each array (strengths, weaknesses, improvements, missingKeywords) MUST contain between 3 to 8 highly specific, clear, and actionable items.
- "summary" MUST be 2 to 4 sentences summarizing the evaluation and overall match.
- Base every single observation on the provided text.

RESUME TEXT:
---
${resumeText}
---
`;

  return prompt;
};
