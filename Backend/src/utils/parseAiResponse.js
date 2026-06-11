/**
 * Strip markdown fences and extract JSON object from AI text.
 */
export function cleanAiJsonResponse(raw) {
  if (!raw || typeof raw !== "string") {
    throw Object.assign(new Error("Empty AI response"), { code: "AI_EMPTY" });
  }

  let cleaned = raw.trim();

  const fenced = cleaned.match(/```(?:json)?\s*([\s\S]*?)```/i);
  if (fenced) {
    cleaned = fenced[1].trim();
  } else {
    cleaned = cleaned.replace(/^```(?:json)?\s*/i, "").replace(/```\s*$/i, "").trim();
  }

  const start = cleaned.indexOf("{");
  const end = cleaned.lastIndexOf("}");

  if (start === -1 || end === -1 || end <= start) {
    throw Object.assign(new Error("Invalid AI response: no JSON object found"), {
      code: "AI_PARSE_ERROR",
    });
  }

  return cleaned.slice(start, end + 1);
}

function toStringArray(value) {
  if (!Array.isArray(value)) return [];
  return value
    .map((item) => (typeof item === "string" ? item : String(item ?? "")).trim())
    .filter(Boolean);
}

function clampAtsScore(score) {
  const num = Number(score);
  if (!Number.isFinite(num)) return null;
  return Math.round(Math.min(100, Math.max(0, num)));
}

/**
 * Parse cleaned JSON and return normalized analysis object.
 */
export function parseAndValidateAnalysis(rawText) {
  const cleaned = cleanAiJsonResponse(rawText);

  let parsed;
  try {
    parsed = JSON.parse(cleaned);
  } catch {
    throw Object.assign(
      new Error("Invalid AI response: JSON parse failed"),
      { code: "AI_PARSE_ERROR" }
    );
  }

  if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
    throw Object.assign(new Error("Invalid AI response: expected a JSON object"), {
      code: "AI_INVALID_RESPONSE",
    });
  }

  const atsScore = clampAtsScore(parsed.atsScore);

  if (atsScore === null) {
    throw Object.assign(
      new Error("Invalid AI response: atsScore must be a number between 0 and 100"),
      { code: "AI_INVALID_RESPONSE" }
    );
  }

  const analysis = {
    atsScore,
    strengths: toStringArray(parsed.strengths),
    weaknesses: toStringArray(parsed.weaknesses),
    improvements: toStringArray(parsed.improvements),
    missingKeywords: toStringArray(parsed.missingKeywords),
    summary:
      typeof parsed.summary === "string"
        ? parsed.summary.trim()
        : String(parsed.summary ?? "").trim(),
  };

  const hasContent =
    analysis.strengths.length > 0 ||
    analysis.weaknesses.length > 0 ||
    analysis.improvements.length > 0 ||
    analysis.missingKeywords.length > 0 ||
    analysis.summary.length > 0;

  if (!hasContent) {
    throw Object.assign(new Error("Invalid AI response: all fields are empty"), {
      code: "AI_INVALID_RESPONSE",
    });
  }

  return analysis;
}
