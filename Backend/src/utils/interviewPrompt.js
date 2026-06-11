/**
 * Builds a prompt for the Gemini API to generate customized mock interview questions
 * and sample responses based on the candidate's resume and target job description.
 * 
 * @param {string} resumeText - Parsed text of the resume.
 * @param {string} jobDescription - Target job description.
 * @returns {string} The fully formed prompt.
 */
export const buildInterviewPrompt = (resumeText, jobDescription) => {
  return `You are an expert technical interviewer, engineering manager, and career coach.
Generate a list of exactly 4 highly targeted, realistic interview questions and comprehensive "sample ideal answers" customized for a candidate with the provided resume, interviewing for the specified job description.

GUIDELINES:
1. Generate exactly 4 questions:
   - 2 Technical questions focusing on the specific technologies, architectural patterns, or engineering projects listed in the candidate's resume that are highly relevant to the job description requirements.
   - 2 Behavioral / Scenario questions that evaluate situational engineering problems (e.g., resolving technical debt, handling a deployment failure, cross-team collaboration, or priority conflicts) customized for this specific role.
2. For each question, craft a comprehensive, highly personalized "sample ideal answer" that demonstrates how the candidate can leverage their actual projects (from the resume) to answer using the STAR method (Situation, Task, Action, Result).
3. Do not invent achievements. Only reference details from the candidate's resume.
4. Return ONLY a valid, parseable JSON array of objects. Do NOT wrap the response in markdown blocks (\`\`\`json ... \`\`\`), do not include backticks, and do not append any intro or outro text.

Strict JSON Output Schema:
[
  {
    "id": 1,
    "type": "Technical",
    "question": "Custom technical interview question based on resume and JD?",
    "answer": "Detailed STAR response guidelines for the candidate. Show exactly how they should describe their project X, using technology Y, to demonstrate skill Z."
  },
  {
    "id": 2,
    "type": "Behavioral",
    "question": "Custom behavioral interview question based on resume and JD?",
    "answer": "Detailed STAR response guidelines. Frame the situation, task, action, and result using their experience at Company A."
  }
]

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
