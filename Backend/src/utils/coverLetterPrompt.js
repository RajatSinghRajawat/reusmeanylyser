/**
 * Builds a prompt for the Gemini API to write a tailored, professional cover letter
 * based on the user's resume and target job description.
 * 
 * @param {string} resumeText - Parsed text of the resume.
 * @param {string} jobDescription - Target job description.
 * @returns {string} The fully formed prompt.
 */
export const buildCoverLetterPrompt = (resumeText, jobDescription) => {
  return `You are a professional resume writer and executive career coach. 
Write a highly compelling, tailored, and persuasive COVER LETTER for the candidate based on their resume and the target job description provided below.

INSTRUCTIONS:
1. Address the cover letter to the hiring team/hiring manager at the company if identifiable, or use a professional salutation like "Dear Hiring Team,".
2. Structure the letter beautifully:
   - Header with standard placeholder fields: [Candidate Name], [Candidate Contact Info], [Date], [Company Name].
   - Salutation.
   - Introduction: Start with a strong, engaging hook about the candidate's core value proposition and passion for the specific role. Avoid generic openings.
   - Body Paragraphs (2-3 paragraphs): Showcase how the candidate's actual projects, achievements, and technical stack (from the resume) directly solve the problems and meet the requirements of the job description. Do not invent any skills or past jobs.
   - Closing Paragraph: Confident call-to-action requesting an interview, expressing excitement, and a formal sign-off.
3. Tone should be professional, confident, innovative, and warm. Avoid excessive corporate jargon or cliches.
4. Return the response as a beautifully formatted Markdown document. Do NOT wrap it in JSON. Return ONLY the markdown cover letter text.

TARGET JOB DESCRIPTION:
---
${jobDescription.trim()}
---

CANDIDATE RESUME TEXT:
---
${resumeText.trim()}
---
`;
};
